<script setup lang="ts">
import type { VoucherStatus } from '~/types'

const toast = useToast()
const { user } = useAuth()
const { listVouchers } = useVouchers()

const canDisburse = computed(() => user.value?.permissions?.includes('vouchers.disburse') ?? false)

const statusFilter = ref<string | undefined>(undefined)
const page = ref(1)

const { data, status, refresh } = await useAsyncData(
  'vouchers',
  () => listVouchers({
    status: statusFilter.value,
    page: page.value
  }),
  {
    watch: [statusFilter, page],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

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

function onDisbursed() {
  refresh()
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
      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar los vales.
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
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-receipt-text" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay vales con esos filtros
          </p>
        </div>

        <div v-else class="h-full overflow-y-auto divide-y divide-default">
          <div v-for="item in items" :key="item.id" class="px-6 py-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <UAvatar :alt="customerName(item)" icon="i-lucide-ticket" size="lg" />

                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="truncate font-semibold text-highlighted">
                      {{ item.voucher_number }}
                    </p>
                    <UBadge
                      :color="statusColors[item.status] ?? 'neutral'"
                      variant="subtle"
                      :label="item.status"
                    />
                  </div>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                    <span>{{ customerName(item) }}</span>
                    <span>{{ item.customer?.customer_code }}</span>
                    <span v-if="item.transferred_at">
                      Entregado {{ new Date(item.transferred_at).toLocaleDateString('es-MX') }}
                    </span>
                    <span v-if="item.transfer_reference">Ref: {{ item.transfer_reference }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="text-right">
                  <p class="text-sm font-semibold text-highlighted">
                    {{ money.format(Number(item.amount)) }}
                  </p>
                  <p v-if="item.total_fortnights" class="text-xs text-muted">
                    {{ item.total_fortnights }} quincenas
                  </p>
                </div>

                <DisburseVoucherModal
                  v-if="canDisburse && item.status === 'APROBADO'"
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
</template>