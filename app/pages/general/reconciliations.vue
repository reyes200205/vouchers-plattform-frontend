<script setup lang="ts">
const { listBankTransactions } = useReconciliations()

const page = ref(1)
const reconciled = ref<'yes' | 'no' | undefined>(undefined)
const reference = ref('')

const { data, status, refresh } = await useAsyncData('bank-transactions', () => listBankTransactions({
  reconciled: reconciled.value,
  reference: reference.value || undefined,
  page: page.value
}), {
  watch: [page, reconciled],
  default: () => ({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
})

const items = computed(() => data.value.data ?? [])
const meta = computed(() => data.value.meta)
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
          <UInput
            v-model="reference"
            placeholder="Buscar por referencia..."
            icon="i-lucide-search"
            class="w-64"
            @update:model-value="onSearch"
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
                  v-if="!item.reconciled"
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
  </UDashboardPanel>
</template>
