<script setup lang="ts">
import { format } from 'date-fns'
import type { CustomerTransferRequest } from '~/composables/useCustomerTransfers'
import { customerFullName } from '~/composables/useCustomers'

defineProps<{
  items: CustomerTransferRequest[]
}>()

const emit = defineEmits<{ decided: [] }>()
</script>

<template>
  <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
    <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
    <p class="mt-2 text-sm text-muted">
      No hay transferencias de cliente pendientes de autorización
    </p>
  </div>

  <div v-else class="overflow-y-auto divide-y divide-default">
    <div v-for="item in items" :key="item.id" class="px-6 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <UAvatar :alt="customerFullName(item.customer?.person)" size="lg" />

          <div class="min-w-0">
            <p class="truncate font-semibold text-highlighted">
              {{ customerFullName(item.customer?.person) }}
            </p>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span>De {{ item.source_distributor?.distributor_number ?? `#${item.source_distributor_id}` }}</span>
              <span>a {{ item.destination_distributor?.distributor_number ?? `#${item.destination_distributor_id}` }}</span>
              <span v-if="item.created_at">{{ format(new Date(item.created_at), 'dd MMM yyyy HH:mm') }}</span>
            </div>
            <p v-if="item.request_reason" class="mt-1 text-xs text-dimmed line-clamp-2">
              {{ item.request_reason }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <CustomerTransfersDecideModal :item="item" @decided="emit('decided')" />
        </div>
      </div>
    </div>
  </div>
</template>
