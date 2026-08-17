<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Application } from '~/types'

const props = defineProps<{
  application: Application | null
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ verified: [] }>()

const schema = z.object({
  result: z.enum(['VERIFICADA', 'RECHAZADA']),
  visit_date: z.string().min(1, 'Requerido'),
  notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  result: undefined,
  visit_date: new Date().toISOString().slice(0, 10),
  notes: ''
})

watch(() => props.application, () => {
  state.result = undefined
  state.visit_date = new Date().toISOString().slice(0, 10)
  state.notes = ''
}, { immediate: true })

const { submitVerification } = useApplications()
const toast = useToast()
const submitting = ref(false)

const applicantName = computed(() => {
  const p = props.application?.applicant
  if (!p) return 'Solicitante'
  return [p.first_name, p.last_name].filter(Boolean).join(' ')
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.application) return
  submitting.value = true

  try {
    await submitVerification(props.application.id, {
      result: event.data.result,
      visit_date: event.data.visit_date,
      notes: event.data.notes || undefined
    })

    toast.add({
      title: event.data.result === 'VERIFICADA' ? 'Solicitud verificada' : 'Solicitud rechazada',
      description: `La visita a ${applicantName.value} fue registrada correctamente`,
      color: 'success'
    })

    open.value = false
    emit('verified')
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: 'No se pudo registrar la verificación. Verifica los datos e intenta de nuevo.',
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
    :title="`Verificar solicitud de ${applicantName}`"
    description="Registra el resultado de la visita de verificación"
  >
    <template #body>
      <div v-if="application" class="space-y-4">
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p class="text-dimmed">
              Sucursal
            </p>
            <p class="font-medium">
              {{ application.branch?.name ?? '—' }}
            </p>
          </div>
          <div>
            <p class="text-dimmed">
              Teléfono
            </p>
            <p class="font-medium">
              {{ application.applicant?.mobile_phone ?? '—' }}
            </p>
          </div>
          <div class="col-span-2">
            <p class="text-dimmed">
              Domicilio
            </p>
            <p class="font-medium">
              {{ [application.applicant?.street, application.applicant?.external_number, application.applicant?.neighborhood, application.applicant?.city].filter(Boolean).join(', ') || '—' }}
            </p>
          </div>
        </div>

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Fecha de visita" name="visit_date">
            <UInput v-model="state.visit_date" type="date" class="w-full" />
          </UFormField>

          <UFormField label="Resultado" name="result">
            <URadioGroup
              v-model="state.result"
              orientation="horizontal"
              :items="[
                { label: 'Verificada', value: 'VERIFICADA' },
                { label: 'Rechazada', value: 'RECHAZADA' }
              ]"
            />
          </UFormField>

          <UFormField label="Notas" name="notes">
            <UTextarea v-model="state.notes" class="w-full" placeholder="Observaciones de la visita..." />
          </UFormField>

          <div class="flex justify-end gap-2">
            <UButton
              label="Cancelar"
              color="neutral"
              variant="subtle"
              @click="open = false"
            />
            <UButton
              label="Registrar verificación"
              color="primary"
              variant="solid"
              type="submit"
              :loading="submitting"
            />
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
