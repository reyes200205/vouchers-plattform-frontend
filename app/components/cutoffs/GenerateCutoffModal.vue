<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  branchId: number | undefined
  branchName?: string | null
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ generated: [] }>()

const schema = z.object({
  period_start: z.string().min(1, 'Requerido'),
  period_end: z.string().min(1, 'Requerido')
}).refine(data => data.period_end >= data.period_start, {
  message: 'El fin del periodo debe ser igual o posterior al inicio',
  path: ['period_end']
})

type Schema = z.output<typeof schema>

const { generateCutoff } = useReconciliations()
const toast = useToast()
const submitting = ref(false)

function defaultStart(): string {
  const d = new Date()
  d.setDate(d.getDate() - 15)
  return d.toISOString().slice(0, 10)
}

function defaultEnd(): string {
  return new Date().toISOString().slice(0, 10)
}

const state = reactive<Partial<Schema>>({
  period_start: defaultStart(),
  period_end: defaultEnd()
})

watch(open, (isOpen) => {
  if (!isOpen) return
  state.period_start = defaultStart()
  state.period_end = defaultEnd()
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.branchId) return

  submitting.value = true

  try {
    const cutoff = await generateCutoff(props.branchId, {
      period_start: event.data.period_start,
      period_end: event.data.period_end
    })

    toast.add({
      title: 'Corte generado',
      description: `Se generaron ${cutoff.relations_count ?? cutoff.relations?.length ?? 0} relación(es) para el corte #${cutoff.id}.`,
      color: 'success'
    })

    open.value = false
    emit('generated')
  } catch (e: unknown) {
    const message = e instanceof Error && 'data' in e
      ? (e as { data?: { message?: string } }).data?.message
      : undefined
    toast.add({
      title: 'Error',
      description: message || 'No se pudo generar el corte. Verifica el periodo e intenta de nuevo.',
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
    title="Generar corte"
    :description="branchName ? `Sucursal: ${branchName}` : 'Selecciona el periodo a cortar'"
    :ui="{ content: 'max-w-lg' }"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <p class="text-sm text-muted">
          Se generará una relación por cada distribuidora con pagos o saldos pendientes en el periodo. Las relaciones
          sin liquidar del corte anterior se arrastrarán automáticamente al nuevo corte.
        </p>

        <div class="grid grid-cols-2 gap-4">
          <UFormField required label="Inicio de periodo" name="period_start">
            <UInput v-model="state.period_start" type="date" class="w-full" />
          </UFormField>

          <UFormField required label="Fin de periodo" name="period_end">
            <UInput v-model="state.period_end" type="date" class="w-full" />
          </UFormField>
        </div>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Generar"
            color="primary"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
