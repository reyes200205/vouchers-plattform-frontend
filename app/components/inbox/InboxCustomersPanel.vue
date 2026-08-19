<script setup lang="ts">
import { format } from 'date-fns'
import type { CustomerChangeRequest } from '~/types'

defineProps<{
  items: CustomerChangeRequest[]
}>()

const emit = defineEmits<{ decided: [] }>()

const { fieldLabels } = useCustomers()
const labels = fieldLabels()

const typeLabels: Record<string, string> = {
  IDENTITY: 'Identidad',
  CONTACT: 'Contacto',
  EVIDENCE: 'Evidencia'
}

function customerName(item: CustomerChangeRequest) {
  const person = item.customer?.person
  return [person?.first_name, person?.last_name].filter(Boolean).join(' ') || 'Cliente'
}

function changeSummary(item: CustomerChangeRequest) {
  const newValues = item.new_values ?? {}
  return Object.entries(newValues)
    .map(([field, value]) => `${labels[field] ?? field}: ${value}`)
    .join(' · ')
}
</script>

<template>
  <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
    <UIcon name="i-lucide-inbox" class="size-12 text-dimmed" />
    <p class="mt-2 text-sm text-muted">
      No hay solicitudes de cambio de clientes pendientes
    </p>
  </div>

  <div v-else class="overflow-y-auto divide-y divide-default">
    <div v-for="item in items" :key="item.id" class="px-6 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <UAvatar :alt="customerName(item)" size="lg" />

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <p class="truncate font-semibold text-highlighted">
                {{ customerName(item) }}
              </p>
              <UBadge color="info" variant="subtle" :label="typeLabels[item.change_type ?? ''] ?? item.change_type ?? '—'" />
            </div>
            <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
              <span>{{ item.customer?.customer_code }}</span>
              <span>{{ format(new Date(item.created_at ?? ''), 'dd MMM yyyy HH:mm') }}</span>
            </div>
            <p v-if="changeSummary(item)" class="mt-1 text-xs text-dimmed line-clamp-2">
              {{ changeSummary(item) }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <InboxDecideCustomerChangeModal :item="item" @decided="emit('decided')" />
        </div>
      </div>
    </div>
  </div>
</template>