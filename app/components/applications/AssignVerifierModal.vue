<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Application } from '~/composables/useApplications'
import { applicantFullName } from '~/composables/useApplications'

const props = defineProps<{
  application: Application | null
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ assigned: [] }>()

const schema = z.object({
  verifier_user_id: z.number({ error: 'Captura el ID del verificador' }).int().positive('Captura un ID válido')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  verifier_user_id: undefined
})

watch(() => props.application, () => {
  state.verifier_user_id = undefined
}, { immediate: true })

const { assignVerifier } = useApplications()
const toast = useToast()
const submitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.application) return
  submitting.value = true

  try {
    await assignVerifier(props.application.id, event.data.verifier_user_id)

    toast.add({
      title: 'Verificador asignado',
      description: `Se asignó el verificador a la solicitud #${props.application.id}`,
      color: 'success'
    })

    open.value = false
    emit('assigned')
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: 'No se pudo asignar el verificador. Verifica el ID e intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Asignar Verificador"
    :description="application ? `Solicitud #${application.id} — ${applicantFullName(application.applicant)}` : ''"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UAlert
          color="neutral"
          variant="subtle"
          icon="i-lucide-info"
          description="Aún no existe un catálogo de verificadores disponibles en la API. Captura manualmente el ID del usuario con rol Verificador."
        />

        <UFormField label="ID del usuario verificador" name="verifier_user_id" required>
          <UInputNumber
            v-model="state.verifier_user_id"
            class="w-full"
            :min="1"
            placeholder="Ej. 15"
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
            label="Asignar"
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
