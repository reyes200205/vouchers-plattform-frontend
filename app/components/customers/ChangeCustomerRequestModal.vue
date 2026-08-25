<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Customer, Person } from '~/types'

const props = defineProps<{
  customer: Customer
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [boolean]
  'changed': []
}>()

const schema = z.object({
  change_type: z.enum(['IDENTITY', 'CONTACT']),
  notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const submitting = ref(false)
const state = reactive<Partial<Schema>>({
  change_type: 'IDENTITY',
  notes: undefined
})

const { requestCustomerChange, fieldLabels } = useCustomers()
const toast = useToast()

const IDENTITY_FIELDS = ['first_name', 'middle_name', 'last_name', 'second_last_name', 'curp', 'rfc'] as const
const CONTACT_FIELDS = ['home_phone', 'mobile_phone', 'email', 'street', 'external_number', 'neighborhood', 'city', 'state', 'postal_code'] as const

const newValues = reactive<Record<string, string>>({})

const labels = fieldLabels()
const person = computed(() => props.customer.person as Person | null)

const activeFields = computed(() => {
  return state.change_type === 'IDENTITY' ? IDENTITY_FIELDS : CONTACT_FIELDS
})

function currentValue(field: string) {
  const value = person.value?.[field as keyof Person]
  return typeof value === 'string' ? value : ''
}

function resetForm() {
  state.change_type = 'IDENTITY'
  state.notes = undefined
  for (const key of Object.keys(newValues)) {
    delete newValues[key]
  }
}

watch(() => props.open, (isOpen) => {
  if (isOpen) resetForm()
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  const changedValues: Record<string, string> = {}
  for (const field of activeFields.value) {
    const value = newValues[field]?.trim()
    if (value && value !== currentValue(field)) {
      changedValues[field] = value
    }
  }

  if (Object.keys(changedValues).length === 0) {
    toast.add({
      title: 'Sin cambios',
      description: 'Escribe al menos un dato nuevo distinto al actual.',
      color: 'warning'
    })
    submitting.value = false
    return
  }

  try {
    await requestCustomerChange(props.customer.id, {
      change_type: event.data.change_type,
      new_values: changedValues,
      notes: event.data.notes || undefined
    })

    toast.add({
      title: 'Solicitud enviada',
      description: 'El gerente revisará y aprobará el cambio de datos.',
      color: 'success'
    })

    emit('changed')
  } catch (e: unknown) {
    const apiError = e as { status?: number, statusCode?: number, data?: { errors?: Record<string, string[]> } }
    const apiErrors = apiError?.data?.errors
    if ((apiError?.status === 422 || apiError?.statusCode === 422) && apiErrors) {
      const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => ({
        // El backend valida bajo "new_values.curp" / "new_values.rfc"; el
        // formulario solo conoce el campo por su nombre corto ("curp"),
        // asi que se recorta el prefijo para que el error sí se marque en
        // el input correcto en vez de perderse.
        name: field.startsWith('new_values.') ? field.slice('new_values.'.length) : field,
        message: messages[0] || 'Dato inválido'
      }))
      formRef.value?.setErrors(formattedErrors)
    }

    toast.add({
      title: 'No se pudo enviar la solicitud',
      description: extractApiErrorMessage(e, 'Verifica los datos e intenta de nuevo.'),
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}

const formRef = ref()
</script>

<template>
  <UModal
    :open="open"
    title="Solicitar cambio de datos"
    :description="`${customer.customer_code} — la cajera solicita corrección de datos al gerente`"
    @update:open="open => emit('update:open', open)"
    @after-leave="resetForm"
  >
    <template #body>
      <UForm
        ref="formRef"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <URadioGroup
          v-model="state.change_type"
          :items="[
            { label: 'Datos de identidad (nombre, CURP, RFC)', value: 'IDENTITY' },
            { label: 'Datos de contacto (teléfonos, correo, domicilio)', value: 'CONTACT' }
          ]"
        />

        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <UFormField
            v-for="field in activeFields"
            :key="field"
            :name="field"
            :label="labels[field]"
          >
            <UInput
              v-model="newValues[field]"
              :placeholder="currentValue(field) || 'Sin valor actual'"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField label="Notas para el gerente" name="notes">
          <UTextarea
            v-model="state.notes"
            placeholder="Explica qué documento no coincide (opcional)..."
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
            label="Enviar solicitud"
            color="primary"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
