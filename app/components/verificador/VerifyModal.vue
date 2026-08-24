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

const { submitVerification, uploadVerificationPhoto, getApplication } = useApplications()
const toast = useToast()
const submitting = ref(false)

const frontPhotoPath = ref<string | null>(null)
const frontPhotoRef = useTemplateRef('frontPhotoRef')

// La INE y el comprobante ya los subio el coordinador al capturar la
// solicitud; el verificador solo los revisa aqui para confirmar que los
// datos coinciden con la visita, no los vuelve a subir. `application` (la
// fila de la lista) no trae esas URLs firmadas, asi que se piden aparte con
// el detalle completo cada vez que se abre el modal.
const documentDetail = ref<Application | null>(null)
const documentDetailLoading = ref(false)

async function loadDocumentDetail() {
  if (!props.application) {
    documentDetail.value = null
    return
  }

  documentDetailLoading.value = true
  try {
    documentDetail.value = await getApplication(props.application.id)
  } catch (e) {
    console.error(e)
    documentDetail.value = null
  } finally {
    documentDetailLoading.value = false
  }
}

watch(() => props.application, () => {
  state.result = undefined
  state.visit_date = new Date().toISOString().slice(0, 10)
  state.notes = ''
  frontPhotoRef.value?.reset()
  loadDocumentDetail()
}, { immediate: true })

const previewImage = ref<{ url: string, label: string } | null>(null)
const isPreviewOpen = ref(false)

function openPreview(url: string, label: string) {
  previewImage.value = { url, label }
  isPreviewOpen.value = true
}

const applicantName = computed(() => {
  const p = props.application?.applicant
  if (!p) return 'Solicitante'
  return [p.first_name, p.last_name].filter(Boolean).join(' ')
})

const missingEvidence = computed(() => {
  const missing: string[] = []
  if (!frontPhotoPath.value) missing.push('la fotografía de fachada')
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
      front_photo: frontPhotoPath.value!
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
    :ui="{ content: 'max-w-4xl' }"
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

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UFormField label="Fotografía de fachada" required>
              <ApplicationsEvidencePhotoCapture
                ref="frontPhotoRef"
                v-model="frontPhotoPath"
                :upload="file => uploadVerificationPhoto(application!.id, file, 'front_photo')"
                label="Fotografía de fachada"
              />
            </UFormField>

            <UFormField label="INE cargada por el coordinador">
              <div v-if="documentDetailLoading" class="flex h-40 w-full max-w-xs items-center justify-center rounded-lg border border-default">
                <UIcon name="i-lucide-loader-circle" class="size-5 animate-spin text-muted" />
              </div>
              <button
                v-else-if="documentDetail?.id_front_url"
                type="button"
                class="block w-full max-w-xs overflow-hidden rounded-lg border border-default"
                @click="openPreview(documentDetail.id_front_url, 'INE (frente)')"
              >
                <img :src="documentDetail.id_front_url" alt="INE (frente)" class="h-40 w-full object-cover">
              </button>
              <p v-else class="text-xs text-dimmed">
                El coordinador no cargó la foto de la INE.
              </p>
            </UFormField>

            <UFormField label="Comprobante cargado por el coordinador">
              <div v-if="documentDetailLoading" class="flex h-40 w-full max-w-xs items-center justify-center rounded-lg border border-default">
                <UIcon name="i-lucide-loader-circle" class="size-5 animate-spin text-muted" />
              </div>
              <button
                v-else-if="documentDetail?.proof_of_address_url"
                type="button"
                class="block w-full max-w-xs overflow-hidden rounded-lg border border-default"
                @click="openPreview(documentDetail.proof_of_address_url, 'Comprobante de domicilio')"
              >
                <img :src="documentDetail.proof_of_address_url" alt="Comprobante de domicilio" class="h-40 w-full object-cover">
              </button>
              <p v-else class="text-xs text-dimmed">
                El coordinador no cargó el comprobante de domicilio.
              </p>
            </UFormField>
          </div>

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

  <UModal
    v-model:open="isPreviewOpen"
    :title="previewImage?.label ?? 'Vista previa'"
    :ui="{ content: 'max-w-3xl' }"
  >
    <template #body>
      <img
        v-if="previewImage"
        :src="previewImage.url"
        :alt="previewImage.label"
        class="max-h-[75vh] w-full rounded-lg object-contain"
      >
    </template>
  </UModal>
</template>
