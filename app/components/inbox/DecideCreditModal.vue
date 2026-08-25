<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InboxCreditIncrease } from '~/types'

const props = defineProps<{
  item: InboxCreditIncrease
}>()

const emit = defineEmits<{ decided: [] }>()

const schema = z.object({
  decision: z.enum(['APROBADO', 'REDUCIDO', 'RECHAZADO']),
  approved_amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .optional(),
  decision_notes: z.string().optional()
})
const open = ref(false)
const decision = ref<'APROBADO' | 'REDUCIDO' | 'RECHAZADO'>('APROBADO')

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  decision: 'APROBADO',
  approved_amount: undefined,
  decision_notes: undefined
})

const { decideCreditIncrease } = useInbox()
const toast = useToast()
const submitting = ref(false)

watch(decision, (value) => {
  state.decision = value
  if (value === 'APROBADO') {
    state.approved_amount = props.item.pre_authorized_amount ?? props.item.requested_amount
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await decideCreditIncrease(props.item.id, {
      decision: event.data.decision,
      approved_amount: event.data.decision === 'REDUCIDO' && event.data.approved_amount
        ? String(event.data.approved_amount)
        : undefined,
      decision_notes: event.data.decision_notes || undefined
    })

    toast.add({
      title: 'Decisión registrada',
      description: `El incremento fue marcado como ${event.data.decision.toLowerCase()}.`,
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
  <UModal v-model:open="open" title="Decidir incremento" description="Aprobar, reducir o rechazar el incremento de crédito" :ui="{ content: 'max-w-xl' }">
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
            { label: 'Aprobar (pre-autorizado)', value: 'APROBADO' },
            { label: 'Reducir', value: 'REDUCIDO' },
            { label: 'Rechazar', value: 'RECHAZADO' }
          ]"
        />

        <UFormField v-if="decision === 'REDUCIDO'" label="Monto aprobado (MXN)" name="approved_amount">
          <UInput
            v-model="state.approved_amount"
            type="number"
            min="0"
            step="100"
            placeholder="20000"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Notas de decisión" name="decision_notes">
          <UTextarea v-model="state.decision_notes" placeholder="Comentarios opcionales..." class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="decision === 'RECHAZADO' ? 'Rechazar' : 'Confirmar'"
            :color="decision === 'RECHAZADO' ? 'error' : 'success'"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
