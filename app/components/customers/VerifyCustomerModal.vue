<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Customer } from '~/types'

const props = defineProps<{
  customer: Customer
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [boolean]
  verified: []
}>()

const schema = z.object({
  confirmed: z.literal(true, { message: 'Debes confirmar que revisaste los documentos en persona.' }),
  notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const submitting = ref(false)
const state = reactive<Partial<Schema>>({ confirmed: false, notes: undefined })

const { verifyCustomer } = useCustomers()
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await verifyCustomer(props.customer.id, {
      notes: event.data.notes || undefined
    })

    toast.add({
      title: 'Cliente verificado',
      description: `El cliente ${props.customer.customer_code} quedó registrado como verificado.`,
      color: 'success'
    })

    emit('verified')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo verificar al cliente. Intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  state.confirmed = false
  state.notes = undefined
}

watch(() => props.open, (isOpen) => {
  if (isOpen) resetForm()
})
</script>

<template>
  <UModal
    :open="open"
    title="Verificar cliente"
    :description="`${customer.customer_code} — ${customer.person ? [customer.person.first_name, customer.person.last_name].filter(Boolean).join(' ') : 'Sin nombre'}`"
    @update:open="open => emit('update:open', open)"
    @after-leave="resetForm"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <p class="text-sm text-muted">
          La verificación es presencial: confirma que revisaste la identificación (INE) y el comprobante de
          domicilio del cliente en la sucursal antes de aprobar.
        </p>

        <UFormField name="confirmed">
          <UCheckbox
            v-model="state.confirmed"
            label="Confirmo que revisé el INE y el comprobante de domicilio del cliente en persona."
          />
        </UFormField>

        <UFormField label="Notas" name="notes">
          <UTextarea
            v-model="state.notes"
            placeholder="Observaciones de la verificación (opcional)..."
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="emit('update:open', false)"
          />
          <UButton
            label="Confirmar verificación"
            color="success"
            variant="solid"
            type="submit"
            :disabled="!state.confirmed"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
