<script setup lang="ts">
import type { VerificationPhotoType } from '~/composables/useApplications'

const props = defineProps<{
  applicationId: number
  type: VerificationPhotoType
  label: string
}>()

const path = defineModel<string | null>({ default: null })

const { uploadVerificationPhoto } = useApplications()
const toast = useToast()

const previewUrl = ref<string | null>(null)
const uploading = ref(false)
const cameraActive = ref(false)
const cameraError = ref<string | null>(null)
const videoEl = useTemplateRef('videoEl')
const fileInputEl = useTemplateRef('fileInputEl')
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

async function uploadPhoto(file: File) {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(file)
  path.value = null
  uploading.value = true

  try {
    const result = await uploadVerificationPhoto(props.applicationId, file, props.type)
    path.value = result.path
  } catch (e) {
    console.error(e)
    toast.add({
      title: 'Error',
      description: `No se pudo subir "${props.label}". Intenta de nuevo.`,
      color: 'error'
    })
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  } finally {
    uploading.value = false
  }
}

function capturePhoto() {
  if (!videoEl.value) return

  const video = videoEl.value
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  stopCamera()

  canvas.toBlob((blob) => {
    if (!blob) return
    const file = new File([blob], `${props.type}-${Date.now()}.jpg`, { type: 'image/jpeg' })
    uploadPhoto(file)
  }, 'image/jpeg', 0.9)
}

function triggerFileInput() {
  fileInputEl.value?.click()
}

function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (file) uploadPhoto(file)
}

function reset() {
  stopCamera()
  cameraError.value = null
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = null
  path.value = null
  uploading.value = false
}

defineExpose({ reset })

onBeforeUnmount(() => {
  stopCamera()
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})
</script>

<template>
  <div class="space-y-2">
    <input
      ref="fileInputEl"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onFileSelected"
    >

    <!-- Cámara en vivo con getUserMedia -->
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
        v-if="previewUrl"
        class="relative w-full max-w-xs overflow-hidden rounded-lg border border-default"
      >
        <img :src="previewUrl" :alt="`Vista previa: ${label}`" class="w-full h-40 object-cover">
        <div v-if="uploading" class="absolute inset-0 flex items-center justify-center bg-black/40">
          <UIcon name="i-lucide-loader-circle" class="size-6 text-white animate-spin" />
        </div>
        <UBadge
          v-else-if="path"
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

      <div class="flex gap-2">
        <UButton
          :label="previewUrl ? 'Volver a tomar' : 'Tomar foto'"
          icon="i-lucide-camera"
          color="neutral"
          variant="subtle"
          :loading="uploading"
          @click="openCamera"
        />
        <UButton
          :label="previewUrl ? 'Subir otra' : 'Subir foto'"
          icon="i-lucide-upload"
          color="neutral"
          variant="subtle"
          :loading="uploading"
          @click="triggerFileInput"
        />
      </div>
    </template>
  </div>
</template>
