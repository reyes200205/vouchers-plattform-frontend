<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{ saved: [] }>()

const { getPointSettings, updatePointSettings } = useSettings()
const toast = useToast()

const schema = z.object({
  point_divisor_factor: z.coerce.number().int().min(1, 'Mínimo 1'),
  point_multiplier: z.coerce.number().int().min(1, 'Mínimo 1'),
  late_penalty_percentage: z.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  point_divisor_factor: undefined,
  point_multiplier: undefined,
  late_penalty_percentage: ''
})

const { status: loadStatus, refresh } = await useAsyncData(
  'global-point-settings-form',
  async () => {
    const settings = await getPointSettings()
    state.point_divisor_factor = settings.point_divisor_factor
    state.point_multiplier = settings.point_multiplier
    state.late_penalty_percentage = settings.late_penalty_percentage ?? ''
  },
  { default: () => undefined }
)

const saving = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  saving.value = true

  try {
    await updatePointSettings({
      point_divisor_factor: event.data.point_divisor_factor,
      point_multiplier: event.data.point_multiplier,
      late_penalty_percentage: event.data.late_penalty_percentage
    })
    toast.add({ title: 'Puntos actualizados', description: 'La configuración global de puntos fue actualizada.', color: 'success' })
    emit('saved')
  } catch {
    toast.add({ title: 'Error', description: 'No se pudieron guardar los puntos.', color: 'error' })
  } finally {
    saving.value = false
  }
}

defineExpose({ refresh })
</script>

<template>
  <div v-if="loadStatus === 'pending'" class="flex items-center justify-center py-12">
    <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
  </div>

  <UForm
    v-else
    id="global-point-settings-form"
    :schema="schema"
    :state="state"
    class="space-y-6"
    @submit="onSubmit"
  >
    <UPageCard
      title="Puntos (global)"
      description="Cálculo de puntos para todas las sucursales: productos otorgados ÷ divisor × multiplicador."
    >
      <div class="grid grid-cols-3 gap-6">
        <UFormField required label="Divisor de puntos (1200)" name="point_divisor_factor">
          <UInput v-model="state.point_divisor_factor" type="number" min="1" step="1" class="w-full" />
        </UFormField>

        <UFormField required label="Multiplicador de puntos" name="point_multiplier">
          <UInput v-model="state.point_multiplier" type="number" min="1" step="1" class="w-full" />
        </UFormField>

        <UFormField required label="Penalización por pago atrasado (%)" name="late_penalty_percentage">
          <UInput v-model="state.late_penalty_percentage" type="number" min="0" max="100" step="0.01" class="w-full" />
        </UFormField>
      </div>
    </UPageCard>

    <UButton
      form="global-point-settings-form"
      label="Guardar puntos"
      color="primary"
      type="submit"
      :loading="saving"
      class="w-fit"
    />
  </UForm>
</template>
