<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch, BranchSettings, PointSettings } from '~/types'

const props = defineProps<{
  branch: Branch
}>()

const emit = defineEmits<{ updated: [] }>()

const schema = z.object({
  default_credit_limit: z.union([z.number(), z.string()]).optional(),
  opening_commission_percentage: z.union([z.number(), z.string()]).optional(),
  biweekly_interest_percentage: z.union([z.number(), z.string()]).optional(),
  late_payment_penalty_amount: z.union([z.number(), z.string()]).optional(),
  payment_due_days: z.union([z.number(), z.string()]).optional(),
  pre_vale_max_percentage: z.union([z.number(), z.string()]).optional(),
  pre_vale_tolerance_amount: z.union([z.number(), z.string()]).optional(),
  point_value_mxn: z.union([z.number(), z.string()]).optional(),
  point_divisor_factor: z.union([z.number(), z.string()]).optional(),
  point_multiplier: z.union([z.number(), z.string()]).optional()
})

type Schema = z.output<typeof schema>

const open = defineModel<boolean>('open', { default: false })
const tab = ref('branch')
const loading = ref(false)
const saving = ref(false)

const state = reactive<Partial<Schema>>({})

const { getBranchSettings, updateBranchSettings, getPointSettings, updatePointSettings } = useSettings()
const toast = useToast()

watch(open, async (isOpen) => {
  if (!isOpen) return

  loading.value = true
  state.default_credit_limit = undefined
  state.opening_commission_percentage = undefined
  state.biweekly_interest_percentage = undefined
  state.late_payment_penalty_amount = undefined
  state.payment_due_days = undefined
  state.pre_vale_max_percentage = undefined
  state.pre_vale_tolerance_amount = undefined
  state.point_value_mxn = undefined
  state.point_divisor_factor = undefined
  state.point_multiplier = undefined

  try {
    const [branchSettings, pointSettings] = await Promise.all([
      getBranchSettings(props.branch.id),
      getPointSettings()
    ])

    state.default_credit_limit = branchSettings.default_credit_limit ?? undefined
    state.opening_commission_percentage = branchSettings.opening_commission_percentage ?? undefined
    state.biweekly_interest_percentage = branchSettings.biweekly_interest_percentage ?? undefined
    state.late_payment_penalty_amount = branchSettings.late_payment_penalty_amount ?? undefined
    state.payment_due_days = branchSettings.payment_due_days ?? undefined
    state.pre_vale_max_percentage = branchSettings.pre_vale_max_percentage ?? undefined
    state.pre_vale_tolerance_amount = branchSettings.pre_vale_tolerance_amount ?? undefined
    state.point_value_mxn = branchSettings.point_value_mxn ?? undefined
    state.point_divisor_factor = pointSettings.point_divisor_factor ?? undefined
    state.point_multiplier = pointSettings.point_multiplier ?? undefined
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudieron cargar las configuraciones.',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  saving.value = true

  try {
    const branchPayload: Partial<BranchSettings> = {
      default_credit_limit: event.data.default_credit_limit ? String(event.data.default_credit_limit) : undefined,
      opening_commission_percentage: event.data.opening_commission_percentage ? String(event.data.opening_commission_percentage) : undefined,
      biweekly_interest_percentage: event.data.biweekly_interest_percentage ? String(event.data.biweekly_interest_percentage) : undefined,
      late_payment_penalty_amount: event.data.late_payment_penalty_amount ? String(event.data.late_payment_penalty_amount) : undefined,
      payment_due_days: event.data.payment_due_days ? Number(event.data.payment_due_days) : undefined,
      pre_vale_max_percentage: event.data.pre_vale_max_percentage ? String(event.data.pre_vale_max_percentage) : undefined,
      pre_vale_tolerance_amount: event.data.pre_vale_tolerance_amount ? String(event.data.pre_vale_tolerance_amount) : undefined,
      point_value_mxn: event.data.point_value_mxn ? String(event.data.point_value_mxn) : undefined
    }

    const pointPayload: Partial<PointSettings> = {
      point_divisor_factor: event.data.point_divisor_factor ? Number(event.data.point_divisor_factor) : undefined,
      point_multiplier: event.data.point_multiplier ? Number(event.data.point_multiplier) : undefined
    }

    await Promise.all([
      updateBranchSettings(props.branch.id, branchPayload),
      updatePointSettings(pointPayload)
    ])

    toast.add({
      title: 'Configuración guardada',
      description: `La configuración de ${props.branch.name} fue actualizada.`,
      color: 'success'
    })

    open.value = false
    emit('updated')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo guardar la configuración. Verifica los valores.',
      color: 'error'
    })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Configuración de sucursal" :description="branch.name">
    <UButton
      label="Configuración"
      icon="i-lucide-settings"
      color="neutral"
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
        <UTabs
          v-model="tab"
          :content="false"
          :items="[{ label: 'Vale', value: 'branch' }, { label: 'Puntos', value: 'points' }]"
        />

        <div v-if="tab === 'branch'" class="space-y-4 p-4">
          <UFormField label="Límite de crédito por defecto (MXN)" name="default_credit_limit">
            <UInput
              v-model="state.default_credit_limit"
              type="number"
              min="0"
              step="100"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Comisión de apertura (%)" name="opening_commission_percentage">
            <UInput
              v-model="state.opening_commission_percentage"
              type="number"
              min="0"
              step="0.01"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Interés quincenal (%)" name="biweekly_interest_percentage">
            <UInput
              v-model="state.biweekly_interest_percentage"
              type="number"
              min="0"
              step="0.01"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Penalización por atraso (MXN)" name="late_payment_penalty_amount">
            <UInput
              v-model="state.late_payment_penalty_amount"
              type="number"
              min="0"
              step="10"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Días para pago" name="payment_due_days">
            <UInput
              v-model="state.payment_due_days"
              type="number"
              min="1"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Máx. pre-vale (%)" name="pre_vale_max_percentage">
            <UInput
              v-model="state.pre_vale_max_percentage"
              type="number"
              min="0"
              step="1"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Tolerancia pre-vale (MXN)" name="pre_vale_tolerance_amount">
            <UInput
              v-model="state.pre_vale_tolerance_amount"
              type="number"
              min="0"
              step="10"
              class="w-full"
            />
          </UFormField>
        </div>

        <div v-else class="space-y-4 p-4">
          <UFormField label="Valor de punto (MXN)" name="point_value_mxn">
            <UInput
              v-model="state.point_value_mxn"
              type="number"
              min="0"
              step="0.01"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Divisor de puntos" name="point_divisor_factor">
            <UInput
              v-model="state.point_divisor_factor"
              type="number"
              min="1"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Multiplicador de puntos" name="point_multiplier">
            <UInput
              v-model="state.point_multiplier"
              type="number"
              min="0"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Guardar"
            color="primary"
            variant="solid"
            type="submit"
            :loading="saving"
            :disabled="loading"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
