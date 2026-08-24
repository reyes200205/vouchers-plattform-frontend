<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { InboxVoucherRequest } from '~/types'

const props = defineProps<{
  item: InboxVoucherRequest
}>()

const emit = defineEmits<{ decided: [] }>()

const decision = ref<'APROBADO' | 'RECHAZADO'>('APROBADO')

const schema = computed(() => decision.value === 'RECHAZADO'
  ? z.object({ rejection_reason: z.string().min(3, 'Indica el motivo del rechazo') })
  : z.object({ notes: z.string().optional() }))

type Schema = { rejection_reason?: string, notes?: string }

const open = ref(false)
const state = reactive<Schema>({
  rejection_reason: undefined,
  notes: undefined
})

const { approveVoucherRequest, rejectVoucherRequest } = useInbox()
const toast = useToast()
const submitting = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    if (decision.value === 'APROBADO') {
      await approveVoucherRequest(props.item.id, { notes: event.data.notes || undefined })
    } else {
      await rejectVoucherRequest(props.item.id, { rejection_reason: event.data.rejection_reason ?? '' })
    }

    toast.add({
      title: 'Decisión registrada',
      description: decision.value === 'APROBADO'
        ? 'El vale fue aprobado y ya está activo -- se generaron su referencia de pago y número de autorización.'
        : 'La solicitud de vale fue rechazada.',
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
  <UModal v-model:open="open" title="Decidir solicitud de vale" description="Aprobar o rechazar la solicitud" :ui="{ content: 'max-w-xl' }">
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
        <p class="text-sm text-muted">
          <span class="font-medium text-highlighted">{{ item.distributor_name }}</span>
          <span v-if="item.customer_name"> · {{ item.customer_name }}</span>
        </p>

        <URadioGroup
          v-model="decision"
          :items="[
            { label: 'Aprobar', value: 'APROBADO' },
            { label: 'Rechazar', value: 'RECHAZADO' }
          ]"
        />

        <UFormField v-if="decision === 'APROBADO'" label="Notas" name="notes">
          <UTextarea v-model="state.notes" placeholder="Comentarios opcionales..." class="w-full" />
        </UFormField>

        <UFormField v-else label="Motivo del rechazo" name="rejection_reason">
          <UTextarea v-model="state.rejection_reason" placeholder="Explica por qué se rechaza la solicitud..." class="w-full" />
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
