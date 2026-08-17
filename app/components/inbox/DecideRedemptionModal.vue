<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InboxRedemption } from '~/types'

const props = defineProps<{
  item: InboxRedemption
}>()

const emit = defineEmits<{ decided: [] }>()

const schema = z.object({
  decision: z.enum(['APROBADO', 'RECHAZADO']),
  decision_notes: z.string().optional()
})
const open = ref(false)
const decision = ref<'APROBADO' | 'RECHAZADO'>('APROBADO')

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  decision: 'APROBADO',
  decision_notes: undefined
})

const { decideRedemption } = useInbox()
const toast = useToast()
const submitting = ref(false)

watch(decision, (value) => {
  state.decision = value
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await decideRedemption(props.item.id, {
      decision: event.data.decision,
      decision_notes: event.data.decision_notes || undefined
    })

    toast.add({
      title: 'Decisión registrada',
      description: `El canje fue ${event.data.decision === 'APROBADO' ? 'aprobado' : 'rechazado'}.`,
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
  <UModal v-model:open="open" title="Decidir canje" description="Aprobar o rechazar el canje de puntos">
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
            { label: 'Aprobar', value: 'APROBADO' },
            { label: 'Rechazar', value: 'RECHAZADO' }
          ]"
        />

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
            :label="decision === 'APROBADO' ? 'Aprobar' : 'Rechazar'"
            :color="decision === 'APROBADO' ? 'success' : 'error'"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
