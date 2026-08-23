<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { DistributorCategory, InboxApplication } from '~/types'
import { applicantFullName, type Application } from '~/composables/useApplications'

const props = defineProps<{
  application: InboxApplication
}>()

const emit = defineEmits<{ decided: [] }>()

const { getApplication } = useApplications()
const detail = ref<Application | null>(null)
const detailLoading = ref(false)
const detailError = ref(false)

async function loadDetail() {
  detailLoading.value = true
  detailError.value = false
  try {
    detail.value = await getApplication(props.application.id)
  } catch {
    detailError.value = true
  } finally {
    detailLoading.value = false
  }
}

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const familyDataEntries = computed(() => {
  const data = detail.value?.family_data_json
  if (!data) return []
  return Object.entries(data).filter(([, value]) => value !== null && value !== undefined && value !== '')
})

const evidencePhotos = computed(() => {
  if (!detail.value) return []

  const items: { label: string, url: string }[] = []
  if (detail.value.id_front_url) items.push({ label: 'INE (frente)', url: detail.value.id_front_url })
  if (detail.value.id_back_url) items.push({ label: 'INE (reverso)', url: detail.value.id_back_url })
  if (detail.value.proof_of_address_url) items.push({ label: 'Comprobante de domicilio', url: detail.value.proof_of_address_url })

  const verification = detail.value.verification
  if (verification?.front_photo_url) items.push({ label: 'Foto de fachada', url: verification.front_photo_url })
  if (verification?.id_with_person_photo_url) items.push({ label: 'Identificación con la persona', url: verification.id_with_person_photo_url })
  if (verification?.proof_of_address_photo_url) items.push({ label: 'Comprobante de domicilio (visita)', url: verification.proof_of_address_photo_url })

  return items
})

const schema = z.object({
  decision: z.enum(['APPROVE', 'REJECT']),
  credit_limit: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .optional(),
  category_id: z.string().optional(),
  rejection_reason: z.string().min(1, 'El motivo es obligatorio').optional()
})
const open = ref(false)
const decision = ref<'APPROVE' | 'REJECT'>('APPROVE')

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  decision: 'APPROVE',
  credit_limit: undefined,
  category_id: undefined,
  rejection_reason: undefined
})

const { decideApplication } = useInbox()
const { listBranchCategories } = useCategories()
const toast = useToast()
const submitting = ref(false)

const categories = ref<DistributorCategory[]>([])
const categoryItems = computed(() => {
  return categories.value.map(c => ({
    label: `${c.name} (${c.code})`,
    value: c.id.toString()
  }))
})

onMounted(async () => {
  // Las categorias son por sucursal (cada sucursal configura su propia
  // comision), asi que solo deben listarse las de la sucursal de ESTA
  // solicitud. Traer el catalogo global permitia elegir por error una
  // categoria de otra sucursal, dejando a la distribuidora con una
  // comision que no le corresponde.
  try {
    const result = await listBranchCategories(props.application.branch_id)
    categories.value = result.data.filter(c => c.is_active)
  } catch {
    // ignore, categories are optional for the form
  }
})

watch(decision, (value) => {
  state.decision = value
})

watch(open, (isOpen) => {
  if (isOpen && !detail.value) {
    loadDetail()
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await decideApplication(props.application.id, {
      decision: event.data.decision,
      credit_limit: event.data.decision === 'APPROVE' && event.data.credit_limit
        ? String(event.data.credit_limit)
        : undefined,
      category_id: event.data.decision === 'APPROVE' && event.data.category_id
        ? Number(event.data.category_id)
        : undefined,
      rejection_reason: event.data.decision === 'REJECT' ? event.data.rejection_reason : undefined
    })

    toast.add({
      title: event.data.decision === 'APPROVE' ? 'Solicitud aprobada' : 'Solicitud rechazada',
      description: event.data.decision === 'APPROVE'
        ? 'La distribuidora fue creada y el crédito asignado.'
        : 'La solicitud fue rechazada correctamente.',
      color: 'success'
    })

    open.value = false
    emit('decided')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo registrar la decisión. Intenta de nuevo.',
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
    title="Decidir solicitud"
    description="Aprobar o rechazar la solicitud de distribuidora"
    :ui="{ content: 'max-w-5xl' }"
  >
    <UButton
      label="Decidir"
      icon="i-lucide-clipboard-check"
      color="primary"
      variant="outline"
      size="xs"
    />

    <template #body>
      <div class="max-h-[75vh] space-y-6 overflow-y-auto pr-1">
        <div v-if="detailLoading" class="flex items-center justify-center py-10">
          <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-muted" />
        </div>

        <div v-else-if="detailError" class="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
          <UIcon name="i-lucide-triangle-alert" class="size-4 shrink-0" />
          No se pudo cargar el detalle de la solicitud.
        </div>

        <template v-else-if="detail">
          <div class="space-y-4 rounded-lg border border-default p-4">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p class="font-semibold text-highlighted">
                  {{ applicantFullName(detail.applicant) }}
                </p>
                <p class="text-xs text-muted">
                  {{ detail.branch?.name }}
                  <span v-if="detail.coordinator?.person"> · Coordinador: {{ applicantFullName(detail.coordinator.person) }}</span>
                  <span v-if="detail.assigned_verifier?.username"> · Verificador: {{ detail.assigned_verifier.username }}</span>
                </p>
              </div>
              <UBadge color="warning" variant="subtle" class="capitalize">
                {{ detail.initial_category_code }}
              </UBadge>
            </div>

            <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
              <div>
                <p class="text-xs text-muted">CURP</p>
                <p class="text-highlighted">{{ detail.applicant?.curp || '—' }}</p>
              </div>
              <div>
                <p class="text-xs text-muted">RFC</p>
                <p class="text-highlighted">{{ detail.applicant?.rfc || '—' }}</p>
              </div>
              <div>
                <p class="text-xs text-muted">Teléfono</p>
                <p class="text-highlighted">{{ detail.applicant?.mobile_phone || detail.applicant?.home_phone || '—' }}</p>
              </div>
              <div class="col-span-2 sm:col-span-3">
                <p class="text-xs text-muted">Domicilio</p>
                <p class="text-highlighted">
                  {{ [detail.applicant?.street, detail.applicant?.external_number, detail.applicant?.neighborhood, detail.applicant?.city, detail.applicant?.state, detail.applicant?.postal_code].filter(Boolean).join(', ') || '—' }}
                </p>
              </div>
              <div v-if="detail.applicant?.street_references" class="col-span-2 sm:col-span-3">
                <p class="text-xs text-muted">Referencias del domicilio</p>
                <p class="text-highlighted bg-elevated/40 border border-default rounded-lg p-2.5 mt-1 text-xs">
                  {{ detail.applicant.street_references }}
                </p>
              </div>
              <div>
                <p class="text-xs text-muted">Crédito solicitado</p>
                <p class="text-highlighted">{{ money.format(Number(detail.requested_credit_limit || 0)) }}</p>
              </div>
              <div>
                <p class="text-xs text-muted">Resultado buró</p>
                <p class="text-highlighted">{{ detail.credit_bureau_result || 'Sin dato' }}</p>
              </div>
              <div>
                <p class="text-xs text-muted">Prevale</p>
                <p class="text-highlighted">{{ detail.prevale_approved ? 'Aprobado' : 'Pendiente' }}</p>
              </div>
            </div>

            <div v-if="familyDataEntries.length" class="border-t border-default pt-3">
              <p class="mb-1 text-xs text-muted">Datos familiares / vivienda</p>
              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3">
                <div v-for="[key, value] in familyDataEntries" :key="key">
                  <p class="text-xs text-muted capitalize">{{ key.replace(/_/g, ' ') }}</p>
                  <p class="text-highlighted">{{ value }}</p>
                </div>
              </div>
            </div>

            <div v-if="detail.verification" class="border-t border-default pt-3">
              <p class="mb-1 text-xs text-muted">Verificación en sitio</p>
              <div class="flex flex-wrap items-center gap-2 text-sm">
                <UBadge
                  :color="detail.verification.result === 'VERIFICADA' ? 'success' : 'error'"
                  variant="subtle"
                  :label="detail.verification.result"
                />
                <span v-if="detail.verification.visit_date" class="text-xs text-muted">
                  {{ new Date(detail.verification.visit_date).toLocaleDateString('es-MX') }}
                </span>
                <span v-if="detail.verification.distance_meters" class="text-xs text-muted">
                  · {{ detail.verification.distance_meters }}m del domicilio declarado
                </span>
              </div>
              <p v-if="detail.verification.notes" class="mt-1 text-sm text-muted">
                {{ detail.verification.notes }}
              </p>
            </div>

            <div v-if="evidencePhotos.length" class="border-t border-default pt-3">
              <p class="mb-2 text-xs text-muted">Evidencia fotográfica</p>
              <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <a
                  v-for="photo in evidencePhotos"
                  :key="photo.url"
                  :href="photo.url"
                  target="_blank"
                  rel="noopener"
                  class="group block overflow-hidden rounded-lg border border-default"
                >
                  <img :src="photo.url" :alt="photo.label" class="h-24 w-full object-cover transition group-hover:opacity-80">
                  <p class="truncate px-2 py-1 text-xs text-muted">{{ photo.label }}</p>
                </a>
              </div>
            </div>
            <p v-else class="text-xs text-dimmed">
              No hay fotos de evidencia cargadas todavía.
            </p>
          </div>
        </template>
      </div>

      <UForm
        :schema="schema"
        :state="state"
        class="mt-6 space-y-4"
        @submit="onSubmit"
      >
        <URadioGroup
          v-model="decision"
          :items="[
            { label: 'Aprobar', value: 'APPROVE' },
            { label: 'Rechazar', value: 'REJECT' }
          ]"
        />

        <template v-if="decision === 'APPROVE'">
          <UFormField label="Límite de crédito inicial (MXN)" name="credit_limit">
            <UInput
              v-model="state.credit_limit"
              type="number"
              min="0"
              step="100"
              placeholder="50000"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Categoría de distribuidora" name="category_id">
            <USelect
              v-model="state.category_id"
              :items="categoryItems"
              placeholder="Seleccionar categoría..."
              class="w-full"
            />
          </UFormField>
        </template>

        <UFormField v-else label="Motivo de rechazo" name="rejection_reason">
          <UTextarea v-model="state.rejection_reason" placeholder="El motivo por el cual se rechaza..." class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="decision === 'APPROVE' ? 'Aprobar' : 'Rechazar'"
            :color="decision === 'APPROVE' ? 'success' : 'error'"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
