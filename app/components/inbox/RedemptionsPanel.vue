<script setup lang="ts">
import { format } from 'date-fns'
import type { InboxRedemption } from '~/types'

defineProps<{
  items: InboxRedemption[]
}>()

const emit = defineEmits<{ decided: [] }>()

const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
</script>

<template>
  <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
    <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
    <p class="mt-2 text-sm text-muted">
      No hay canjes de puntos pendientes
    </p>
  </div>

  <div v-else class="overflow-y-auto divide-y divide-default">
    <div v-for="item in items" :key="item.id" class="p-4 sm:px-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <UAvatar :alt="item.distributor_name || 'Distribuidora'" size="lg" />

          <div class="min-w-0">
            <p class="truncate font-semibold text-highlighted">
              {{ item.distributor_name || 'Sin nombre' }}
            </p>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span>{{ item.distributor_number }}</span>
              <span>{{ item.branch_name }}</span>
              <span>{{ format(new Date(item.created_at), 'dd MMM yyyy') }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-sm font-semibold text-highlighted">
              {{ Number(item.points).toLocaleString('es-MX') }} pts
            </p>
            <p class="text-xs text-muted">
              Equivale a {{ currency.format(Number(item.amount_mxn)) }}
            </p>
          </div>

          <InboxDecideRedemptionModal :item="item" @decided="emit('decided')" />
        </div>
      </div>
    </div>
  </div>
</template>
