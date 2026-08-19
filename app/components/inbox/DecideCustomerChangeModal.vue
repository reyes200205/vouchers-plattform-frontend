<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CustomerChangeRequest } from '~/types'

const props = defineProps<{
  item: CustomerChangeRequest
}>()

const emit = defineEmits<{ decided: [] }>()

const schema = z.object({
  decision: z.enum(['APPROVE', 'REJECT']),
  rejection_reason: z.string().optional()
})

type Schema = z.output<typeof schema>

const open = ref(false)
const decision = ref<'APPROVE' | 'REJECT'>('APPROVE')
const submitting = ref(false)

const state = reactive<Partial<Schema>>({
  decision: 'APPROVE',
  rejection_reason: undefined
})

const { decideCustomerChangeRequest } = useCustomers()
const toast = useToast()

watch(decision, (value) => {
  state.decision = value
  if (value === 'APPROVE') {
    state.rejection_reason = undefined
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await decideCustomerChangeRequest(props.item.id, {
      decision: event.data.decision,
      rejection_reason: event.data.decision === 'REJECT' && event.data.rejection_reason
        ? event.data.rejection_reason
        : undefined
    })

    toast.add({
      title: event.data.decision === 'APPROVE' ? 'Cambio aprobado' : 'Cambio rechazado',
      description: 'La decisión quedó registrada para auditoría.',
      color: event.data.decision === 'APPROVE' ? 'success' : 'warning'
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
  <UModal v-model:open="open" title="Decidir cambio de datos" description="Aprobar o rechazar la solicitud de la cajera" :ui="{ content: 'max-w-xl' }">
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
            { label: 'Aprobar el cambio', value: 'APPROVE' },
            { label: 'Rechazar', value: 'REJECT' }
          ]"
        />

        <UFormField v-if="decision === 'REJECT'" label="Motivo del rechazo" name="rejection_reason">
          <UTextarea
            v-model="state.rejection_reason"
            placeholder="Explica por qué no procede el cambio... (obligatorio)"
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
            :label="decision === 'REJECT' ? 'Rechazar' : 'Confirmar aprobación'"
            :color="decision === 'REJECT' ? 'error' : 'success'"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>