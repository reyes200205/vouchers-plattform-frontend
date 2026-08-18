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

// Foto de fachada: la toma el verificador durante la visita, con la cámara del
// dispositivo (nunca la galería) usando getUserMedia. Al capturar se muestra una vista
// previa local de inmediato (sin esperar la red) y en paralelo se sube al backend para
// obtener la ruta que se enviará junto con el resultado de la verificación.
const frontPhotoPreviewUrl = ref<string | null>(null)
const frontPhotoPath = ref<string | null>(null)
const uploadingPhoto = ref(false)
const cameraActive = ref(false)
const cameraError = ref<string | null>(null)
const videoEl = useTemplateRef('videoEl')
let mediaStream: MediaStream | null = null

function stopCamera() {
  mediaStream?.getTracks().forEach(track => track.stop())
  mediaStream = null
  cameraActive.value = false
  if (videoEl.value) videoEl.value.srcObject = null
}

async function openCamera() {
  cameraError.value = null

  // navigator.mediaDevices solo existe en contextos seguros (https:// o localhost/127.0.0.1).
  // Si falta, el navegador ni siquiera llega a mostrar el diálogo de permisos.
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    cameraError.value = 'Este sitio no está en un contexto seguro (HTTPS o localhost), así que el navegador bloquea el acceso a la cámara sin siquiera pedir permiso. Abre la app por HTTPS o desde localhost para poder tomar la foto.'
    return
  }

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    })
    cameraActive.value = true

    await nextTick()
    if (videoEl.value) {
      videoEl.value.srcObject = mediaStream
      await videoEl.value.play()
    }
  } catch (e) {
    console.error(e)
    cameraActive.value = false

    const name = e instanceof DOMException ? e.name : null
    if (name === 'NotAllowedError') {
      cameraError.value = 'El navegador ya tiene bloqueado el permiso de cámara para este sitio (no te va a volver a preguntar). Entra a la configuración del sitio en tu navegador, permite "Cámara" manualmente y recarga la página.'
    } else if (name === 'NotFoundError' || name === 'OverconstrainedError') {
      cameraError.value = 'No se encontró ninguna cámara disponible en este dispositivo.'
    } else if (name === 'NotReadableError') {
      cameraError.value = 'La cámara ya está siendo usada por otra aplicación o pestaña. Ciérrala e intenta de nuevo.'
    } else {
      cameraError.value = 'No se pudo acceder a la cámara. Revisa los permisos del navegador e intenta de nuevo.'
    }
  }
}

function capturePhoto() {
  if (!videoEl.value || !props.application) return

  const video = videoEl.value
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  stopCamera()

  canvas.toBlob(async (blob) => {
    if (!blob || !props.application) return

    if (frontPhotoPreviewUrl.value) URL.revokeObjectURL(frontPhotoPreviewUrl.value)
    frontPhotoPreviewUrl.value = URL.createObjectURL(blob)
    frontPhotoPath.value = null
    uploadingPhoto.value = true

    try {
      const file = new File([blob], `fachada-${Date.now()}.jpg`, { type: 'image/jpeg' })
      const result = await uploadVerificationPhoto(props.application.id, file, 'front_photo')
      frontPhotoPath.value = result.path
    } catch (e) {
      console.error(e)
      toast.add({
        title: 'Error',
        description: 'No se pudo subir la fotografía de fachada. Intenta tomarla de nuevo.',
        color: 'error'
      })
      if (frontPhotoPreviewUrl.value) URL.revokeObjectURL(frontPhotoPreviewUrl.value)
      frontPhotoPreviewUrl.value = null
    } finally {
      uploadingPhoto.value = false
    }
  }, 'image/jpeg', 0.9)
}

function resetPhotoState() {
  stopCamera()
  cameraError.value = null
  if (frontPhotoPreviewUrl.value) URL.revokeObjectURL(frontPhotoPreviewUrl.value)
  frontPhotoPreviewUrl.value = null
  frontPhotoPath.value = null
  uploadingPhoto.value = false
}

watch(() => props.application, () => {
  state.result = undefined
  state.visit_date = new Date().toISOString().slice(0, 10)
  state.notes = ''
  resetPhotoState()
}, { immediate: true })

watch(open, (isOpen) => {
  if (!isOpen) stopCamera()
})

onBeforeUnmount(() => {
  stopCamera()
  if (frontPhotoPreviewUrl.value) URL.revokeObjectURL(frontPhotoPreviewUrl.value)
})

const applicantName = computed(() => {
  const p = props.application?.applicant
  if (!p) return 'Solicitante'
  return [p.first_name, p.last_name].filter(Boolean).join(' ')
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.application) return
  if (!frontPhotoPath.value) {
    toast.add({
      title: 'Falta la fotografía de fachada',
      description: 'Toma la foto de la fachada antes de registrar la verificación.',
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
      front_photo: frontPhotoPath.value
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

          <UFormField label="Fotografía de fachada" required>
            <div class="space-y-2">
              <!-- Cámara en vivo: se usa getUserMedia directamente, nunca un selector de archivos,
                   para garantizar que la foto se toma en el momento y no se sube desde la galería. -->
              <div v-if="cameraActive" class="space-y-2">
                <video
                  ref="videoEl"
                  autoplay
                  playsinline
                  muted
                  class="w-full max-w-xs rounded-lg border border-default bg-black aspect-video object-cover"
                />
                <div class="flex gap-2">
                  <UButton
                    label="Capturar"
                    icon="i-lucide-camera"
                    color="primary"
                    variant="solid"
                    @click="capturePhoto"
                  />
                  <UButton
                    label="Cancelar"
                    color="neutral"
                    variant="subtle"
                    @click="stopCamera"
                  />
                </div>
              </div>

              <template v-else>
                <div
                  v-if="frontPhotoPreviewUrl"
                  class="relative w-full max-w-xs overflow-hidden rounded-lg border border-default"
                >
                  <img :src="frontPhotoPreviewUrl" alt="Vista previa de la fachada" class="w-full h-40 object-cover">
                  <div v-if="uploadingPhoto" class="absolute inset-0 flex items-center justify-center bg-black/40">
                    <UIcon name="i-lucide-loader-circle" class="size-6 text-white animate-spin" />
                  </div>
                  <UBadge
                    v-else-if="frontPhotoPath"
                    color="success"
                    variant="solid"
                    size="sm"
                    class="absolute bottom-2 right-2"
                  >
                    Subida
                  </UBadge>
                </div>

                <UAlert
                  v-if="cameraError"
                  color="error"
                  variant="subtle"
                  icon="i-lucide-triangle-alert"
                  :description="cameraError"
                />

                <UButton
                  :label="frontPhotoPreviewUrl ? 'Volver a tomar' : 'Abrir cámara'"
                  icon="i-lucide-camera"
                  color="neutral"
                  variant="subtle"
                  :loading="uploadingPhoto"
                  @click="openCamera"
                />
              </template>
            </div>
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
