<script setup lang="ts">
import type { VoucherStatus } from '~/composables/useVouchers'
import type { PaginatedData, PendingVoucherRequest, Voucher as VoucherRecord } from '~/types'

const { user } = useAuth()
const { listVouchers, listPendingVoucherRequests } = useVouchers()

const canApprove = computed(() => user.value?.permissions?.includes('vouchers.approve') ?? false)
const canDisburse = computed(() => user.value?.permissions?.includes('vouchers.disburse') ?? false)

const statusFilter = ref<VoucherStatus | undefined>(undefined)
const page = ref(1)

const { data, status, error, refresh } = await useAsyncData<PaginatedData<VoucherRecord>>(
  'vouchers',
  () => listVouchers({
    status: statusFilter.value,
    page: page.value
  }),
  {
    watch: [statusFilter, page],
    default: () => ({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

// Solicitudes de vale pendientes (distribuidoras) que la cajera puede
// aprobar/rechazar desde esta misma pantalla. Aprobar solo crea el vale
// (estado APROBADO) y le manda un correo al cliente con los datos — la
// entrega del dinero es un segundo paso separado, cuando el cliente se
// presenta en persona con la cajera (botón "Entregar vale" más abajo).
// Tenerlo junto a "Vales emitidos" evita que la cajera tenga que buscar al
// mismo cliente/distribuidora en dos pantallas distintas.
const requestsPage = ref(1)

const {
  data: requestsData,
  status: requestsStatus,
  refresh: refreshRequests
} = await useAsyncData<PaginatedData<PendingVoucherRequest>>(
  'pending-voucher-requests',
  () => {
    if (!canApprove.value) {
      return Promise.resolve({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
    }
    return listPendingVoucherRequests({ page: requestsPage.value })
  },
  {
    watch: [requestsPage],
    default: () => ({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const pendingRequests = computed(() => requestsData.value.data ?? [])
const requestsMeta = computed(() => requestsData.value.meta)

function onRequestPageChange(nextPage: number) {
  requestsPage.value = nextPage
}

async function onRequestDecided() {
  await Promise.all([refreshRequests(), refresh()])
}

async function onDisbursed() {
  await refresh()
}

// Detalle del vale seleccionado (cajera): permite ver los datos completos,
// incluida la referencia de transferencia y el número de autorización, para
// que los pueda anotar en su Excel de conciliación bancaria sin tener que
// abrir el modal de "Entregar vale" (que solo aplica a vales por entregar).
const isDetailOpen = ref(false)
const selectedVoucher = ref<Voucher | null>(null)

function openVoucherDetail(voucher: Voucher) {
  selectedVoucher.value = voucher
  isDetailOpen.value = true
}

watch(error, (e) => {
  if (e) {
    console.error('[vouchers] No se pudieron cargar los vales:', e)
  }
}, { immediate: true })

const errorDetail = computed(() => {
  const e = error.value as { statusCode?: number, statusMessage?: string, data?: { message?: string } } | null
  if (!e) return null
  const status = e.statusCode ? `HTTP ${e.statusCode}` : 'Error de red'
  const message = e.data?.message ?? e.statusMessage ?? ''
  return [status, message].filter(Boolean).join(' — ')
})

const items = computed(() => data.value.data ?? [])
const meta = computed(() => data.value.meta)
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  APROBADO: 'success',
  ACTIVO: 'info',
  PAGADO: 'success',
  LIQUIDADO: 'neutral',
  MOROSO: 'error',
  CANCELADO: 'error',
  REVERSADO: 'neutral',
  BORRADOR: 'warning'
}

function customerName(voucher: { customer?: { person?: { first_name: string | null, last_name: string | null } | null } | null }) {
  const person = voucher.customer?.person
  return [person?.first_name, person?.last_name].filter(Boolean).join(' ') || 'Cliente'
}

function distributorName(voucher: { distributor?: { person?: { first_name: string | null, last_name: string | null } | null } | null }) {
  const person = voucher.distributor?.person
  return [person?.first_name, person?.last_name].filter(Boolean).join(' ') || null
}
</script>

<template>
  <UDashboardPanel id="vouchers">
    <template #header>
      <UDashboardNavbar title="Vales emitidos">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Todos los estados', value: undefined },
              { label: 'Aprobados', value: 'APROBADO' },
              { label: 'Activos', value: 'ACTIVO' },
              { label: 'Pago parcial', value: 'PAGO_PARCIAL' },
              { label: 'Pagados', value: 'PAGADO' },
              { label: 'Liquidados', value: 'LIQUIDADO' },
              { label: 'Morosos', value: 'MOROSO' },
              { label: 'Cancelados', value: 'CANCELADO' }
            ]"
            placeholder="Estado"
            class="w-40"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="canApprove" class="mb-6 border-b border-default pb-6">
        <div class="mb-3 flex items-center gap-2">
          <h3 class="text-sm font-semibold text-highlighted">
            Solicitudes pendientes
          </h3>
          <UBadge
            v-if="pendingRequests.length > 0"
            color="warning"
            variant="subtle"
            :label="String(requestsMeta.total)"
          />
        </div>

        <div v-if="requestsStatus === 'pending'" class="flex items-center justify-center py-8">
          <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-muted" />
        </div>

        <div v-else-if="pendingRequests.length === 0" class="rounded-lg border border-dashed border-default py-6 text-center text-sm text-muted">
          No hay solicitudes de vale pendientes
        </div>

        <div v-else class="divide-y divide-default rounded-lg border border-default">
          <div
            v-for="request in pendingRequests"
            :key="request.id"
            class="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
          >
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-highlighted">
                {{ request.customer_name || 'Cliente' }}
                <span v-if="request.customer_code" class="text-xs font-normal text-muted">({{ request.customer_code }})</span>
              </p>
              <p class="truncate text-xs text-muted">
                Distribuidora: {{ request.distributor_name || `#${request.distributor_id}` }}
                <span v-if="request.distributor_number">({{ request.distributor_number }})</span>
                <template v-if="request.financial_product_name">
                  · {{ request.financial_product_name }}
                </template>
              </p>
            </div>

            <div class="flex items-center gap-3">
              <div class="text-right">
                <p class="text-sm font-semibold text-highlighted">
                  {{ money.format(Number(request.requested_amount)) }}
                </p>
                <UBadge
                  v-if="request.is_pre_vale"
                  color="warning"
                  variant="subtle"
                  label="Pre-vale"
                  size="sm"
                />
              </div>

              <VouchersDecideVoucherRequestModal :item="request" @decided="onRequestDecided" />
            </div>
          </div>
        </div>

        <div v-if="requestsMeta.last_page > 1" class="flex justify-end pt-3">
          <UPagination
            :model-value="requestsPage"
            :total="requestsMeta.total"
            :items-per-page="requestsMeta.per_page"
            @update:model-value="onRequestPageChange"
          />
        </div>
      </div>

      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar los vales.
        </p>
        <p v-if="errorDetail" class="max-w-md font-mono text-xs text-dimmed">
          {{ errorDetail }}
        </p>
        <UButton
          label="Reintentar"
          icon="i-lucide-refresh-cw"
          color="primary"
          variant="solid"
          @click="refresh()"
        />
      </div>

      <template v-else>
        <h3 v-if="canApprove" class="mb-3 text-sm font-semibold text-highlighted">
          Vales emitidos
        </h3>

        <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-receipt-text" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay vales con esos filtros
          </p>
        </div>

        <div v-else class="h-full overflow-y-auto divide-y divide-default">
          <div
            v-for="item in items"
            :key="item.id"
            class="cursor-pointer px-6 py-4 hover:bg-elevated/50"
            @click="openVoucherDetail(item)"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <UAvatar :alt="customerName(item)" icon="i-lucide-ticket" size="lg" />

                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="truncate font-semibold text-highlighted">
                      {{ item.voucher_number }}
                    </p>
                    <UBadge
                      v-if="item.is_expired"
                      color="error"
                      variant="solid"
                      label="VENCIDO"
                    />
                    <UBadge
                      v-else
                      :color="(item.status && statusColors[item.status]) || 'neutral'"
                      variant="subtle"
                      :label="item.status ?? undefined"
                    />
                  </div>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                    <span>Cliente: {{ customerName(item) }} ({{ item.customer?.customer_code }})</span>
                    <UBadge
                      v-if="!item.customer?.verified_at"
                      color="warning"
                      variant="subtle"
                      label="Cliente sin verificar"
                    />
                    <span v-if="distributorName(item)">
                      Distribuidora: {{ distributorName(item) }}
                      <template v-if="item.distributor?.distributor_number">
                        ({{ item.distributor.distributor_number }})
                      </template>
                    </span>
                    <span v-if="item.transferred_at">
                      Entregado {{ new Date(item.transferred_at).toLocaleDateString('es-MX') }}
                    </span>
                    <span v-if="item.transfer_reference">Ref: {{ item.transfer_reference }}</span>
                    <span v-if="item.status === 'APROBADO' && item.expiration_date" :class="{ 'text-error font-medium': item.is_expired }">
                      {{ item.is_expired ? 'Expiró' : 'Vence' }} el {{ new Date(item.expiration_date + 'T00:00:00').toLocaleDateString('es-MX') }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3" @click.stop>
                <div class="text-right">
                  <p class="text-sm font-semibold text-highlighted">
                    {{ money.format(Number(item.amount)) }}
                  </p>
                  <p v-if="item.total_fortnights" class="text-xs text-muted">
                    {{ item.total_fortnights }} quincenas
                  </p>
                </div>

                <ProductsDisburseVoucherModal
                  v-if="canDisburse && item.status === 'APROBADO' && !item.is_expired"
                  :item="item"
                  @disbursed="onDisbursed"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="meta.last_page > 1" class="flex justify-end px-6 py-3">
          <UPagination
            v-model:page="page"
            :total="meta.total"
            :items-per-page="meta.per_page"
          />
        </div>
      </template>
    </template>
  </UDashboardPanel>

  <VoucherDetailModal v-model:open="isDetailOpen" :voucher="selectedVoucher" />
</template>
