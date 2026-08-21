<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Voucher } from '~/types'

const props = defineProps<{
  item: Voucher
}>()

const emit = defineEmits<{ disbursed: [] }>()

const schema = z.object({
  transfer_reference: z.string().min(3, 'La referencia de transferencia es obligatoria'),
  authorized_number: z.string().min(3, 'El número de autorización es obligatorio'),
  notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const open = ref(false)
const submitting = ref(false)
const state = reactive<Partial<Schema>>({
  transfer_reference: undefined,
  authorized_number: undefined,
  notes: undefined
})

const { disburseVoucher } = useVouchers()
const toast = useToast()

const isCustomerVerified = computed(() => Boolean(props.item.customer?.verified_at))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await disburseVoucher(props.item.id, {
      transfer_reference: event.data.transfer_reference,
      authorized_number: event.data.authorized_number,
      notes: event.data.notes || undefined
    })

    toast.add({
      title: 'Vale entregado',
      description: `${props.item.voucher_number} quedó activo con el número de autorización registrado.`,
      color: 'success'
    })

    open.value = false
    emit('disbursed')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo entregar el vale. Verifica los datos.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Entregar vale" description="Registra la transferencia y el número de autorización" :ui="{ content: 'max-w-xl' }">
    <UButton
      label="Entregar vale"
      icon="i-lucide-handshake"
      color="success"
      variant="solid"
      size="xs"
    />

    <template #body>
      <UAlert
        v-if="!isCustomerVerified"
        color="warning"
        variant="subtle"
        icon="i-lucide-shield-alert"
        title="Cliente sin verificar"
        description="Antes de entregar este vale es necesario validar la identidad del cliente con sus documentos, desde la sección Clientes."
        class="mb-4"
      >
        <template #actions>
          <UButton
            label="Ir a Clientes"
            icon="i-lucide-arrow-right"
            color="warning"
            variant="solid"
            size="xs"
            to="/general/customers"
          />
        </template>
      </UAlert>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <p class="text-sm text-muted">
          <span class="font-medium text-highlighted">{{ item.voucher_number }}</span>
          <span v-if="item.customer?.person">
            · {{ [item.customer.person.first_name, item.customer.person.last_name].filter(Boolean).join(' ') }}
          </span>
        </p>

        <UFormField label="Referencia de transferencia" name="transfer_reference">
          <UInput
            v-model="state.transfer_reference"
            placeholder="Ej. TRANS-2026-00123"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Número de autorización" name="authorized_number">
          <UInput
            v-model="state.authorized_number"
            placeholder="Ej. AUT-4001"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Notas" name="notes">
          <UTextarea
            v-model="state.notes"
            placeholder="Comentarios opcionales..."
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Confirmar entrega"
            color="success"
            variant="solid"
            type="submit"
            :loading="submitting"
            :disabled="!isCustomerVerified"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>