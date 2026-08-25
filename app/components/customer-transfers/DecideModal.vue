<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CustomerTransferRequest } from '~/composables/useCustomerTransfers'
import { customerFullName } from '~/composables/useCustomers'

const props = defineProps<{
  item: CustomerTransferRequest
}>()

const emit = defineEmits<{ decided: [] }>()

const schema = z.object({
  decision: z.enum(['APPROVE', 'REJECT']),
  comments: z.string().optional(),
  rejection_reason: z.string().optional()
}).refine(data => data.decision !== 'REJECT' || !!data.rejection_reason, {
  message: 'Indica el motivo del rechazo',
  path: ['rejection_reason']
})

type Schema = z.output<typeof schema>

const open = ref(false)

const state = reactive<Partial<Schema>>({
  decision: 'APPROVE',
  comments: undefined,
  rejection_reason: undefined
})

const { decideTransferAsCoordinator } = useCustomerTransfers()
const toast = useToast()
const submitting = ref(false)

watch(open, (isOpen) => {
  if (isOpen) {
    state.decision = 'APPROVE'
    state.comments = undefined
    state.rejection_reason = undefined
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await decideTransferAsCoordinator(props.item.id, {
      decision: event.data.decision,
      comments: event.data.comments || undefined,
      rejection_reason: event.data.rejection_reason || undefined
    })

    toast.add({
      title: event.data.decision === 'APPROVE' ? 'Transferencia autorizada' : 'Transferencia rechazada',
      description: `La solicitud #${props.item.id} fue resuelta.`,
      color: 'success'
    })

    open.value = false
    emit('decided')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo resolver la solicitud. Intenta de nuevo.',
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
    title="Autorizar transferencia de cliente"
    description="La distribuidora destino ya aceptó al cliente; falta tu autorización"
    :ui="{ content: 'max-w-xl' }"
  >
    <UButton
      label="Resolver"
      icon="i-lucide-check-check"
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
        <UFormField label="Cliente" name="customer">
          <p class="text-sm font-medium text-highlighted">
            {{ customerFullName(item.customer?.person) }}
          </p>
        </UFormField>

        <UFormField label="Distribuidora origen" name="source">
          <p class="text-sm text-muted">
            {{ item.source_distributor?.distributor_number }}
          </p>
        </UFormField>

        <UFormField label="Distribuidora destino" name="destination">
          <p class="text-sm text-muted">
            {{ item.destination_distributor?.distributor_number }}
          </p>
        </UFormField>

        <UFormField label="Decisión" name="decision" required>
          <URadioGroup
            v-model="state.decision"
            :items="[
              { label: 'Autorizar', value: 'APPROVE' },
              { label: 'Rechazar', value: 'REJECT' }
            ]"
          />
        </UFormField>

        <UFormField
          v-if="state.decision === 'REJECT'"
          label="Motivo del rechazo"
          name="rejection_reason"
          required
        >
          <UTextarea v-model="state.rejection_reason" class="w-full" />
        </UFormField>

        <UFormField label="Comentarios (opcional)" name="comments">
          <UTextarea v-model="state.comments" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="ghost"
            @click="open = false"
          />
          <UButton
            label="Confirmar"
            type="submit"
            color="primary"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
