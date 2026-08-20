<script setup lang="ts">
import { format } from 'date-fns'
import type { InboxVoucherRequest } from '~/types'

defineProps<{
  items: InboxVoucherRequest[]
}>()

const emit = defineEmits<{ decided: [] }>()

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
</script>

<template>
  <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
    <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
    <p class="mt-2 text-sm text-muted">
      No hay solicitudes de vale pendientes
    </p>
  </div>

  <div v-else class="overflow-y-auto divide-y divide-default">
    <div v-for="item in items" :key="item.id" class="px-6 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <UAvatar :alt="item.distributor_name || 'Distribuidora'" icon="i-lucide-ticket" size="lg" />

          <div class="min-w-0">
            <p class="truncate font-semibold text-highlighted">
              {{ item.distributor_name || 'Sin nombre' }}
            </p>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span>{{ item.distributor_number }}</span>
              <span>{{ item.branch_name }}</span>
              <span v-if="item.customer_name">Cliente: {{ item.customer_name }} ({{ item.customer_code }})</span>
              <span v-if="item.financial_product_name">{{ item.financial_product_name }}</span>
              <span>{{ format(new Date(item.created_at), 'dd MMM yyyy') }}</span>
              <UBadge v-if="item.is_pre_vale" color="warning" variant="subtle" label="Pre-vale" />
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <p class="text-sm font-semibold text-highlighted">
            {{ money.format(Number(item.requested_amount)) }}
          </p>

          <InboxDecideVoucherModal :item="item" @decided="emit('decided')" />
        </div>
      </div>
    </div>
  </div>
</template>
