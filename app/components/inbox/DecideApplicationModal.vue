<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { DistributorCategory, InboxApplication } from '~/types'

const props = defineProps<{
  application: InboxApplication
}>()

const emit = defineEmits<{ decided: [] }>()

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
const { listCategories } = useSettings()
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
  try {
    categories.value = await listCategories()
  } catch {
    // ignore, categories are optional for the form
  }
})

watch(decision, (value) => {
  state.decision = value
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
  <UModal v-model:open="open" title="Decidir solicitud" description="Aprobar o rechazar la solicitud de distribuidora">
    <UButton
      label="Decidir"
      icon="i-lucide-clipboard-check"
      color="primary"
      variant="outline"
      size="xs"
    />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
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
