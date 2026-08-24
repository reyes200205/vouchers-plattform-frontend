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

const schema = z.object({
  decision: z.enum(['APPROVE', 'REJECT']),
  credit_limit: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .optional(),
  category_id: z.string().optional(),
  rejection_reason: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.decision === 'APPROVE') {
    if (!data.credit_limit) {
      ctx.addIssue({
        path: ['credit_limit'],
        code: 'custom',
        message: 'El límite de crédito es obligatorio al aprobar'
      })
    }
    if (!data.category_id) {
      ctx.addIssue({
        path: ['category_id'],
        code: 'custom',
        message: 'La categoría es obligatoria al aprobar'
      })
    }
  } else if (data.decision === 'REJECT') {
    if (!data.rejection_reason || data.rejection_reason.trim() === '') {
      ctx.addIssue({
        path: ['rejection_reason'],
        code: 'custom',
        message: 'El motivo de rechazo es obligatorio'
      })
    }
  }
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
const formRef = ref<any>(null)

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
  } catch (e: any) {
    const apiErrors = e?.data?.errors
    if ((e?.status === 422 || e?.statusCode === 422) && apiErrors) {
      const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => ({
        name: field,
        message: (messages as string[])[0] || 'Dato inválido'
      }))
      formRef.value?.setErrors(formattedErrors)
    }

    toast.add({
      title: 'Error',
      description: extractApiErrorMessage(e, 'No se pudo registrar la decisión. Intenta de nuevo.'),
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
    :ui="{ content: 'max-w-6xl' }"
  >
    <UButton
      label="Decidir"
      icon="i-lucide-clipboard-check"
      color="primary"
      variant="outline"
      size="xs"
    />

    <template #body>
      <div class="max-h-[78vh] space-y-5 overflow-y-auto pr-1">
        <div v-if="detailLoading" class="flex items-center justify-center py-10">
          <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-muted" />
        </div>

        <div v-else-if="detailError" class="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
          <UIcon name="i-lucide-triangle-alert" class="size-4 shrink-0" />
          No se pudo cargar el detalle de la solicitud.
        </div>

        <template v-else-if="detail">
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

          <ApplicationsApplicationDetailView :detail="detail" />
        </template>
      </div>

      <UForm
        ref="formRef"
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
          <UFormField required label="Límite de crédito inicial (MXN)" name="credit_limit">
            <UInput
              v-model="state.credit_limit"
              type="number"
              min="0"
              step="100"
              placeholder="50000"
              class="w-full"
            />
          </UFormField>

          <UFormField required label="Categoría de distribuidora" name="category_id">
            <USelect
              v-model="state.category_id"
              :items="categoryItems"
              placeholder="Seleccionar categoría..."
              class="w-full"
            />
          </UFormField>
        </template>

        <UFormField v-else required label="Motivo de rechazo" name="rejection_reason">
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
