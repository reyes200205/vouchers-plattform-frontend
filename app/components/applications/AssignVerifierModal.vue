<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Application } from '~/composables/useApplications'
import { applicantFullName } from '~/composables/useApplications'
import type { AvailableManager } from '~/composables/useBranches'

const props = defineProps<{
  application: Application | null
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ assigned: [] }>()

const schema = z.object({
  verifier_user_id: z.number({ error: 'Selecciona un verificador' }).int().positive('Selecciona un verificador')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  verifier_user_id: undefined
})

const { assignVerifier } = useApplications()
const { listVerifiers } = useBranches()
const toast = useToast()
const submitting = ref(false)
const loadingVerifiers = ref(false)
const verifiers = ref<AvailableManager[]>([])

const verifierItems = computed(() => verifiers.value.map(v => ({
  label: `${v.name} (${v.username})`,
  value: v.id
})))

watch(() => props.application, async (application) => {
  state.verifier_user_id = undefined
  verifiers.value = []

  if (!application?.branch_id) return

  loadingVerifiers.value = true
  try {
    verifiers.value = await listVerifiers(application.branch_id)
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: 'No se pudo cargar el listado de verificadores de la sucursal.',
      color: 'error'
    })
  } finally {
    loadingVerifiers.value = false
  }
}, { immediate: true })

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
      description: 'No se pudo asignar el verificador. Intenta de nuevo.',
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
    :description="application ? `Solicitud #${application.id} — ${applicantFullName(application.applicant)} — ${application.branch?.name ?? ''}` : ''"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UAlert
          v-if="!loadingVerifiers && !verifierItems.length"
          color="warning"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          description="No hay verificadores dados de alta en esta sucursal. Solo se puede asignar un verificador que pertenezca a la misma sucursal de la solicitud."
        />

        <UFormField label="Verificador" name="verifier_user_id" required>
          <USelect
            v-model="state.verifier_user_id"
            :items="verifierItems"
            :loading="loadingVerifiers"
            :disabled="loadingVerifiers || !verifierItems.length"
            placeholder="Selecciona un verificador de la sucursal..."
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
            label="Asignar"
            color="primary"
            variant="solid"
            type="submit"
            :loading="submitting"
            :disabled="!verifierItems.length"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
