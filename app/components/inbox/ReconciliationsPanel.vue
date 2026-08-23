<script setup lang="ts">
import type { InboxReconciliation } from '~/types'

defineProps<{
  items: InboxReconciliation[]
}>()

const emit = defineEmits<{ decided: [] }>()

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
</script>

<template>
  <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
    <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
    <p class="mt-2 text-sm text-muted">
      No hay conciliaciones pendientes de segunda autorización
    </p>
  </div>

  <div v-else class="overflow-y-auto divide-y divide-default">
    <div v-for="item in items" :key="item.id" class="px-6 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <UAvatar icon="i-lucide-hand-coins" size="lg" />

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <p class="truncate font-semibold text-highlighted">
                {{ item.distributor_payment?.distributor?.name || item.distributor_payment?.reported_reference || `Conciliación #${item.id}` }}
              </p>
              <UBadge v-if="item.is_retroactive_correction" color="warning" variant="subtle" label="Corrección retroactiva" />
            </div>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span v-if="item.distributor_payment?.distributor?.distributor_number">{{ item.distributor_payment.distributor.distributor_number }}</span>
              <span v-if="item.distributor_payment?.cutoff_relation?.cutoff?.branch_name">{{ item.distributor_payment.cutoff_relation.cutoff.branch_name }}</span>
              <span>
                Registrada {{ item.reconciled_at ? new Date(item.reconciled_at).toLocaleDateString('es-MX') : '' }}
              </span>
            </div>
            <p class="mt-1 text-xs text-dimmed">
              Relación {{ item.distributor_payment?.cutoff_relation?.relation_number ?? `#${item.distributor_payment?.cutoff_relation_id ?? '—'}` }} · Diferencia:
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

          <ReconciliationsDecideReconciliationModal :item="item" @decided="emit('decided')" />
        </div>
      </div>
    </div>
  </div>
</template>
