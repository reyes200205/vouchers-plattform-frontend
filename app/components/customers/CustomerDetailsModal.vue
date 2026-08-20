<script setup lang="ts">
import type { Customer } from '~/types'

defineProps<{
  customer: Customer
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [boolean]
}>()

const { fieldLabels } = useCustomers()
const labels = fieldLabels()

function present(value: string | null | undefined) {
  return value && value.trim() ? value : '—'
}
</script>

<template>
  <UModal
    :open="open"
    title="Detalles del cliente"
    :description="customer.customer_code"
    @update:open="open => emit('update:open', open)"
  >
    <template #body>
      <div class="space-y-3 text-sm">
        <div v-if="customer.person" class="flex flex-wrap gap-x-6 gap-y-2">
          <span v-for="field in ['first_name', 'middle_name', 'last_name', 'second_last_name']" :key="field" class="text-muted">
            <span class="font-medium text-highlighted">{{ labels[field] }}:</span>
            {{ present(customer.person[field as keyof typeof customer.person] as string | null) }}
          </span>
          <span v-for="field in ['curp', 'rfc', 'mobile_phone', 'home_phone', 'email']" :key="field" class="w-full">
            <span class="font-medium text-highlighted">{{ labels[field] }}:</span>
            {{ present(customer.person[field as keyof typeof customer.person] as string | null) }}
          </span>
          <span class="w-full">
            <span class="font-medium text-highlighted">Domicilio:</span>
            {{ present(customer.person.external_number ? [customer.person.street, `#${customer.person.external_number}`, customer.person.neighborhood, customer.person.city, customer.person.state, customer.person.postal_code].filter(Boolean).join(', ') : customer.person.street) }}
          </span>
        </div>
        <p v-if="customer.notes" class="text-muted">
          <span class="font-medium text-highlighted">Notas:</span> {{ customer.notes }}
        </p>
      </div>
    </template>
  </UModal>
</template>