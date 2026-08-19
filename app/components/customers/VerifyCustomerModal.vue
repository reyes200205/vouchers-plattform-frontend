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
  notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const submitting = ref(false)
const state = reactive<Partial<Schema>>({ notes: undefined })

const { uploadVerificationPhoto, verifyCustomer } = useCustomers()
const toast = useToast()

const photoFields = [
  { key: 'id_front_photo', label: 'INE frente', description: 'Foto clara del frente de la identificación' },
  { key: 'id_back_photo', label: 'INE reverso', description: 'Foto clara del reverso de la identificación' },
  { key: 'id_selfie_photo', label: 'Selfie con identificación', description: 'Rostro junto a la identificación' },
  { key: 'proof_of_address_photo', label: 'Comprobante de domicilio', description: 'Comprobante reciente de domicilio' }
] as const

type PhotoKey = (typeof photoFields)[number]['key']

const photos = reactive<Record<PhotoKey, { url: string | undefined, uploading: boolean, error: string | null }>>({
  id_front_photo: { url: undefined, uploading: false, error: null },
  id_back_photo: { url: undefined, uploading: false, error: null },
  id_selfie_photo: { url: undefined, uploading: false, error: null },
  proof_of_address_photo: { url: undefined, uploading: false, error: null }
})

function onFileSelected(key: PhotoKey, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  photos[key].uploading = true
  photos[key].error = null

  uploadVerificationPhoto(props.customer.id, key, file)
    .then((result) => {
      photos[key].url = result.url
      toast.add({
        title: 'Foto subida',
        description: `${photoFields.find(f => f.key === key)?.label} lista.`,
        color: 'success'
      })
    })
    .catch(() => {
      photos[key].error = 'No se pudo subir la foto. Intenta de nuevo.'
    })
    .finally(() => {
      photos[key].uploading = false
    })
}

function canSubmit() {
  return photoFields.some(f => photos[f.key].url) && !submitting.value
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await verifyCustomer(props.customer.id, {
      id_front_photo: photos.id_front_photo.url ?? undefined,
      id_back_photo: photos.id_back_photo.url ?? undefined,
      id_selfie_photo: photos.id_selfie_photo.url ?? undefined,
      proof_of_address_photo: photos.proof_of_address_photo.url ?? undefined,
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
  state.notes = undefined
  for (const field of photoFields) {
    photos[field.key].url = undefined
    photos[field.key].error = null
  }
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
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div
            v-for="field in photoFields"
            :key="field.key"
            class="rounded-lg border border-default p-3"
          >
            <p class="text-sm font-medium text-highlighted">
              {{ field.label }}
            </p>
            <p class="mb-2 text-xs text-muted">
              {{ field.description }}
            </p>

            <img
              v-if="photos[field.key].url"
              :src="photos[field.key].url"
              :alt="field.label"
              class="mb-2 max-h-28 w-full rounded-md border border-default object-cover"
            />

            <UInput
              type="file"
              accept="image/*"
              :disabled="photos[field.key].uploading"
              @change="onFileSelected(field.key, $event)"
            />

            <p v-if="photos[field.key].uploading" class="mt-1 text-xs text-muted">
              Subiendo...
            </p>
            <p v-else-if="photos[field.key].error" class="mt-1 text-xs text-error">
              {{ photos[field.key].error }}
            </p>
          </div>
        </div>

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
            :disabled="!canSubmit()"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>