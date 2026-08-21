<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { CreditIncreaseRequest } from '~/composables/useCreditIncrease'

const props = defineProps<{
  item: CreditIncreaseRequest
}>()

const emit = defineEmits<{ preAuthorized: [] }>()

const schema = z.object({
  pre_authorized_amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
  decision_notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const open = ref(false)

const state = reactive<Partial<Schema>>({
  pre_authorized_amount: undefined,
  decision_notes: undefined
})

const { preAuthorizeCreditIncrease } = useCreditIncrease()
const toast = useToast()
const submitting = ref(false)

watch(open, (isOpen) => {
  if (isOpen) {
    state.pre_authorized_amount = props.item.requested_amount
    state.decision_notes = undefined
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await preAuthorizeCreditIncrease(props.item.id, {
      pre_authorized_amount: String(event.data.pre_authorized_amount),
      decision_notes: event.data.decision_notes || undefined
    })

    toast.add({
      title: 'Pre-autorizado',
      description: `La solicitud #${props.item.id} fue pre-autorizada.`,
      color: 'success'
    })

    open.value = false
    emit('preAuthorized')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo pre-autorizar la solicitud. Intenta de nuevo.',
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
    title="Pre-autorizar incremento"
    description="Pre-autoriza el monto antes de enviarlo a decisión final del gerente"
    :ui="{ content: 'max-w-xl' }"
  >
    <UButton
      label="Pre-autorizar"
      icon="i-lucide-badge-check"
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
        <UFormField label="Monto solicitado" name="requested_amount">
          <p class="text-sm font-medium text-highlighted">
            {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(item.requested_amount)) }}
          </p>
        </UFormField>

        <UFormField label="Monto pre-autorizado (MXN)" name="pre_authorized_amount" required>
          <UInput
            v-model="state.pre_authorized_amount"
            type="number"
            step="0.01"
            min="0.01"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Notas (opcional)" name="decision_notes">
          <UTextarea v-model="state.decision_notes" class="w-full" />
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
