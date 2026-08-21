<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Distributor } from '~/composables/useDistributors'

const emit = defineEmits<{ requested: [] }>()

const schema = z.object({
  distributor_id: z.number({ error: 'Selecciona una distribuidora' }),
  requested_amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
  reason: z.string().max(255).optional()
})

type Schema = z.output<typeof schema>

const open = ref(false)

const state = reactive<Partial<Schema>>({
  distributor_id: undefined,
  requested_amount: undefined,
  reason: undefined
})

const { listDistributors } = useDistributors()
const { requestCreditIncrease } = useCreditIncrease()
const toast = useToast()

const distributors = ref<Distributor[]>([])
const loadingDistributors = ref(false)
const submitting = ref(false)

function distributorLabel(distributor: Distributor) {
  const name = [distributor.person?.first_name, distributor.person?.last_name].filter(Boolean).join(' ')
  return [`#${distributor.distributor_number}`, name].filter(Boolean).join(' · ')
}

const distributorItems = computed(() => distributors.value.map(distributor => ({
  label: distributorLabel(distributor),
  value: distributor.id
})))

async function loadDistributors() {
  loadingDistributors.value = true

  try {
    const result = await listDistributors({ per_page: 100 })
    distributors.value = result.data
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudieron cargar las distribuidoras.',
      color: 'error'
    })
  } finally {
    loadingDistributors.value = false
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    state.distributor_id = undefined
    state.requested_amount = undefined
    state.reason = undefined
    void loadDistributors()
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await requestCreditIncrease({
      distributor_id: event.data.distributor_id,
      requested_amount: String(event.data.requested_amount),
      reason: event.data.reason || undefined
    })

    toast.add({
      title: 'Solicitud enviada',
      description: 'La solicitud de aumento de línea fue registrada.',
      color: 'success'
    })

    open.value = false
    emit('requested')
  } catch (e) {
    const message = (e as { data?: { message?: string } })?.data?.message
    toast.add({
      title: 'Error',
      description: message || 'No se pudo enviar la solicitud. Intenta de nuevo.',
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
    title="Nueva solicitud de incremento"
    description="Solicita un aumento de línea de crédito para una distribuidora"
    :ui="{ content: 'max-w-xl' }"
  >
    <UButton
      label="Nueva solicitud"
      icon="i-lucide-plus"
      color="primary"
    />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Distribuidora" name="distributor_id" required>
          <USelectMenu
            v-model="state.distributor_id"
            value-key="value"
            :items="distributorItems"
            :loading="loadingDistributors"
            placeholder="Buscar distribuidora"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Monto solicitado (MXN)" name="requested_amount" required>
          <UInput
            v-model="state.requested_amount"
            type="number"
            step="0.01"
            min="0.01"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Motivo (opcional)" name="reason">
          <UTextarea v-model="state.reason" class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="ghost"
            @click="open = false"
          />
          <UButton
            label="Enviar solicitud"
            type="submit"
            color="primary"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
