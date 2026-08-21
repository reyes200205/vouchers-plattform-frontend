<script setup lang="ts">
import type { Branch, PaginatedData, Reconciliation } from '~/types'

const { listBankTransactions, listReconciliations, verifyReconciliation, importBankDeposits } = useReconciliations()
const { listBranches } = useBranches()
const { user } = useAuth()

const toast = useToast()
const page = ref(1)
const reconciled = ref<'yes' | 'no' | undefined>(undefined)
const reference = ref('')

const canImport = computed(() => user.value?.permissions?.includes('reconciliations.import') ?? false)
const canVerify = computed(() => user.value?.permissions?.includes('reconciliations.verify') ?? false)
const canManualMatch = computed(() => user.value?.permissions?.includes('reconciliations.manual') ?? false)

const selectedTab = ref('movements')

const cashierBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'cashier' && r.branch_id !== null)?.branch_id ?? null
})

const { data: branches } = await useAsyncData<Branch[]>('reconciliations-branches', () => listBranches(), { default: () => [] })

const importBranchId = computed(() => cashierBranchId.value ?? branches.value[0]?.id ?? null)

const { data, status, refresh } = await useAsyncData('bank-transactions', () => listBankTransactions({
  reconciled: reconciled.value,
  reference: reference.value || undefined,
  page: page.value
}), {
  watch: [page, reconciled],
  default: () => ({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
})

const emptyPage: PaginatedData<Reconciliation> = { data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } }

const { data: pendingData, status: pendingStatus, refresh: refreshPending } = await useAsyncData(
  'pending-reconciliations',
  () => canVerify.value
    ? listReconciliations({ pending_verification: true })
    : Promise.resolve(emptyPage),
  {
    watch: [canVerify],
    default: () => emptyPage
  }
)

const items = computed(() => data.value.data ?? [])
const meta = computed(() => data.value.meta)
const pendingItems = computed(() => pendingData.value.data ?? [])
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

let searchTimer: ReturnType<typeof setTimeout> | undefined

function onSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    refresh()
  }, 400)
}

async function onMatched() {
  await refresh()
  await refreshPending()
}

const fileInput = ref<HTMLInputElement | null>(null)
const importing = ref(false)

function pickImportFile() {
  fileInput.value?.click()
}

async function onImportFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!importBranchId.value) {
    toast.add({
      title: 'Sin sucursal',
      description: 'No se encontró la sucursal para importar.',
      color: 'error'
    })
    input.value = ''
    return
  }

  importing.value = true

  try {
    const result = await importBankDeposits(importBranchId.value, file)

    toast.add({
      title: 'Importación completada',
      description: `${result.import.row_count} filas importadas, ${result.import.error_count} con error, ${result.auto_matched} auto-conciliadas.`,
      color: 'success',
      duration: 8000
    })

    await refresh()
    await refreshPending()
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo importar el archivo. Revisa el formato.',
      color: 'error'
    })
  } finally {
    importing.value = false
    input.value = ''
  }
}

async function onVerify(item: Reconciliation) {
  try {
    await verifyReconciliation(item.id)

    toast.add({
      title: 'Conciliación verificada',
      description: item.status === 'CONCILIADA'
        ? 'La relación se marcó como pagada.'
        : 'La conciliación quedó registrada con diferencia.',
      color: 'success'
    })

    await refreshPending()
    await refresh()
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo verificar la conciliación.',
      color: 'error'
    })
  }
}
</script>

<template>
  <UDashboardPanel id="reconciliations">
    <template #header>
      <UDashboardNavbar title="Conciliaciones">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            v-if="canImport"
            label="Importar archivo"
            icon="i-lucide-upload"
            color="primary"
            variant="solid"
            :loading="importing"
            @click="pickImportFile"
          />
          <input
            ref="fileInput"
            type="file"
            accept=".csv,.txt,.xls,.xlsx"
            class="hidden"
            @change="onImportFileSelected"
          >
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <UTabs
          v-model="selectedTab"
          :items="[
            { label: 'Movimientos bancarios', value: 'movements' },
            ...(canVerify ? [{ label: `Por verificar (${pendingItems.length})`, value: 'pending' }] : [])
          ]"
          :content="false"
          class="-mx-1"
        />
      </UDashboardToolbar>
    </template>

    <template #body>
      <template v-if="selectedTab === 'movements'">
        <div class="flex flex-wrap items-center justify-between gap-1.5">
          <UInput
            v-model="reference"
            placeholder="Buscar por referencia..."
            icon="i-lucide-search"
            class="w-64"
            @update:model-value="onSearch"
          />

          <USelect
            v-model="reconciled"
            :items="[
              { label: 'Todas', value: undefined },
              { label: 'Conciliadas', value: 'yes' },
              { label: 'Sin conciliar', value: 'no' }
            ]"
            placeholder="Estado"
            class="w-40"
          />
        </div>

        <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
          <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
        </div>

        <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
          <p class="text-sm text-muted">
            No se pudieron cargar las transacciones bancarias.
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
            <UIcon name="i-lucide-landmark" class="size-12 text-dimmed" />
            <p class="mt-2 text-sm text-muted">
              No hay transacciones bancarias
            </p>
          </div>

          <div v-else class="h-full overflow-y-auto divide-y divide-default">
            <div v-for="item in items" :key="item.id" class="px-6 py-4">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex min-w-0 items-center gap-3">
                  <UAvatar
                    :alt="item.payer_name || 'Banco'"
                    icon="i-lucide-landmark"
                    size="lg"
                  />

                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="truncate font-semibold text-highlighted">
                        {{ item.reference }}
                      </p>
                      <UBadge
                        v-if="item.reconciled"
                        color="success"
                        variant="subtle"
                        :label="item.reconciliation?.status === 'PENDIENTE_VERIFICACION' ? 'Por verificar' : (item.reconciliation?.status ?? 'Conciliada')"
                      />
                      <UBadge
                        v-else
                        color="warning"
                        variant="subtle"
                        label="Sin conciliar"
                      />
                    </div>

                    <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                      <span>{{ item.payer_name || 'Pago bancario' }}</span>
                      <span>{{ item.transaction_date }}</span>
                      <span v-if="item.transaction_type">{{ item.transaction_type }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <p class="text-sm font-semibold text-highlighted">
                    {{ money.format(Number(item.amount)) }}
                  </p>

                  <ReconciliationsManualMatchModal
                    v-if="!item.reconciled && canManualMatch"
                    :transaction="item"
                    @matched="onMatched"
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

      <template v-else>
        <div v-if="pendingStatus === 'pending'" class="flex items-center justify-center py-16">
          <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
        </div>

        <div
          v-else-if="pendingItems.length === 0"
          class="flex flex-col items-center justify-center py-16 text-center"
        >
          <UIcon name="i-lucide-check-circle" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay conciliaciones pendientes de segunda autorización
          </p>
        </div>

        <div v-else class="h-full overflow-y-auto divide-y divide-default">
          <div v-for="item in pendingItems" :key="item.id" class="px-6 py-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <UAvatar icon="i-lucide-hand-coins" size="lg" />

                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="truncate font-semibold text-highlighted">
                      {{ item.distributor_payment?.reported_reference || `Conciliación #${item.id}` }}
                    </p>
                    <UBadge color="warning" variant="subtle" label="Por verificar" />
                  </div>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                    <span>
                      Registrada {{ item.reconciled_at ? new Date(item.reconciled_at).toLocaleDateString('es-MX') : '' }}
                    </span>
                    <span v-if="item.notes">{{ item.notes }}</span>
                  </div>
                  <p class="mt-1 text-xs text-dimmed">
                    Relación {{ item.distributor_payment?.cutoff_relation_id ?? '—' }} · Diferencia:
                    {{ money.format(Number(item.amount_difference)) }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="text-right">
                  <p class="text-xs text-muted">
                    Conciliado:
                  </p>
                  <p class="text-sm font-semibold text-highlighted">
                    {{ money.format(Number(item.reconciled_amount)) }}
                  </p>
                </div>

                <UButton
                  label="Verificar"
                  icon="i-lucide-badge-check"
                  color="success"
                  variant="solid"
                  size="sm"
                  @click="onVerify(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
