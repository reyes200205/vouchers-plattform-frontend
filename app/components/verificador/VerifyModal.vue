<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Application } from '~/composables/useApplications'

const props = defineProps<{
  application: Application | null
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ verified: [] }>()

const schema = z.object({
  result: z.enum(['VERIFICADA', 'RECHAZADA']),
  visit_date: z.string().min(1, 'Requerido'),
  notes: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.result === 'RECHAZADA' && !data.notes) {
    ctx.addIssue({
      path: ['notes'],
      code: 'custom',
      message: 'Explica el motivo del rechazo'
    })
  }
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  result: undefined,
  visit_date: new Date().toISOString().slice(0, 10),
  notes: ''
})

const { submitVerification, uploadVerificationPhoto } = useApplications()
const toast = useToast()
const submitting = ref(false)

const frontPhotoPath = ref<string | null>(null)
const idWithPersonPhotoPath = ref<string | null>(null)
const proofOfAddressPhotoPath = ref<string | null>(null)

const frontPhotoRef = useTemplateRef('frontPhotoRef')
const idWithPersonPhotoRef = useTemplateRef('idWithPersonPhotoRef')
const proofOfAddressPhotoRef = useTemplateRef('proofOfAddressPhotoRef')

watch(() => props.application, () => {
  state.result = undefined
  state.visit_date = new Date().toISOString().slice(0, 10)
  state.notes = ''
  frontPhotoRef.value?.reset()
  idWithPersonPhotoRef.value?.reset()
  proofOfAddressPhotoRef.value?.reset()
}, { immediate: true })

const applicantName = computed(() => {
  const p = props.application?.applicant
  if (!p) return 'Solicitante'
  return [p.first_name, p.last_name].filter(Boolean).join(' ')
})

const missingEvidence = computed(() => {
  const missing: string[] = []
  if (!frontPhotoPath.value) missing.push('la fotografía de fachada')
  if (!idWithPersonPhotoPath.value) missing.push('la foto del solicitante con su INE')
  if (!proofOfAddressPhotoPath.value) missing.push('la foto del comprobante de domicilio')
  return missing
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.application) return

  if (missingEvidence.value.length > 0) {
    toast.add({
      title: 'Falta evidencia fotográfica',
      description: `Toma o sube ${missingEvidence.value.join(', ')} antes de registrar la verificación.`,
      color: 'warning'
    })
    return
  }

  submitting.value = true

  try {
    await submitVerification(props.application.id, {
      result: event.data.result,
      visit_date: event.data.visit_date,
      notes: event.data.notes || undefined,
      front_photo: frontPhotoPath.value!,
      id_with_person_photo: idWithPersonPhotoPath.value!,
      proof_of_address_photo: proofOfAddressPhotoPath.value!
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
          <UFormField required label="Fecha de visita" name="visit_date">
            <UInput v-model="state.visit_date" type="date" class="w-full" />
          </UFormField>

          <UFormField label="Fotografía de fachada" required>
            <ApplicationsEvidencePhotoCapture
              ref="frontPhotoRef"
              v-model="frontPhotoPath"
              :upload="file => uploadVerificationPhoto(application!.id, file, 'front_photo')"
              label="Fotografía de fachada"
            />
          </UFormField>

          <UFormField label="Solicitante sosteniendo su INE" required>
            <ApplicationsEvidencePhotoCapture
              ref="idWithPersonPhotoRef"
              v-model="idWithPersonPhotoPath"
              :upload="file => uploadVerificationPhoto(application!.id, file, 'id_with_person_photo')"
              label="Solicitante con su INE"
            />
          </UFormField>

          <UFormField label="Comprobante de domicilio" required>
            <ApplicationsEvidencePhotoCapture
              ref="proofOfAddressPhotoRef"
              v-model="proofOfAddressPhotoPath"
              :upload="file => uploadVerificationPhoto(application!.id, file, 'proof_of_address_photo')"
              label="Comprobante de domicilio"
            />
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

          <UFormField :required="state.result === 'RECHAZADA'" label="Notas" name="notes">
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
