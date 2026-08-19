<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch, BranchSettings, PointSettings } from '~/types'

const props = defineProps<{
  branch: Branch
}>()

const emit = defineEmits<{ updated: [] }>()

const schema = z.object({
  payment_due_days: z.union([z.number(), z.string()]).optional(),
  pre_vale_max_percentage: z.union([z.number(), z.string()]).optional(),
  pre_vale_tolerance_amount: z.union([z.number(), z.string()]).optional(),
  point_value_mxn: z.union([z.number(), z.string()]).optional(),
  point_divisor_factor: z.union([z.number(), z.string()]).optional(),
  point_multiplier: z.union([z.number(), z.string()]).optional(),
  insurance_rates: z.array(z.object({
    min_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
    max_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) > 0, 'Monto inválido'),
    insurance_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido')
  })).superRefine((tiers, ctx) => {
    tiers.forEach((tier, index) => {
      const min = Number(tier.min_amount)
      const max = Number(tier.max_amount)
      if (min >= max) {
        ctx.addIssue({ code: 'custom', path: [index, 'max_amount'], message: 'Debe ser mayor al mínimo' })
      }
      const overlapping = tiers.find((t, i) => i !== index && min < Number(t.max_amount) && max > Number(t.min_amount))
      if (overlapping) {
        ctx.addIssue({ code: 'custom', path: [index, 'min_amount'], message: 'Tramos traslapados' })
      }
    })
  }).optional()
})

type Schema = z.output<typeof schema>

interface InsuranceTierRow {
  min_amount: string
  max_amount: string
  insurance_amount: string
  _id: number
}

interface SettingsState {
  payment_due_days?: number | string
  pre_vale_max_percentage?: number | string
  pre_vale_tolerance_amount?: number | string
  point_value_mxn?: number | string
  point_divisor_factor?: number | string
  point_multiplier?: number | string
  insurance_rates?: InsuranceTierRow[]
}

const open = defineModel<boolean>('open', { default: false })
const tab = ref('branch')
const loading = ref(false)
const saving = ref(false)

const state = reactive<SettingsState>({})

let tierIdCounter = 0

const insurancePreviewInput = ref('')

const insurancePreview = computed(() => {
  const amount = Number(insurancePreviewInput.value)
  if (!amount || !state.insurance_rates?.length) return null
  const tier = state.insurance_rates.find(t => {
    const min = Number(t.min_amount)
    const max = Number(t.max_amount)
    return amount >= min && amount < max
  })
  return tier ? Number(tier.insurance_amount) : 0
})

function addTier() {
  if (!state.insurance_rates) state.insurance_rates = []
  state.insurance_rates.push({
    min_amount: '',
    max_amount: '',
    insurance_amount: '',
    _id: tierIdCounter++
  })
}

function removeTier(id: number) {
  state.insurance_rates = (state.insurance_rates ?? []).filter(t => t._id !== id)
}

const { getBranchSettings, updateBranchSettings, getPointSettings, updatePointSettings } = useSettings()
const toast = useToast()

watch(open, async (isOpen) => {
  if (!isOpen) return

  loading.value = true
  state.payment_due_days = undefined
  state.pre_vale_max_percentage = undefined
  state.pre_vale_tolerance_amount = undefined
  state.point_value_mxn = undefined
  state.point_divisor_factor = undefined
  state.point_multiplier = undefined
  state.insurance_rates = undefined

  try {
    const [branchSettings, pointSettings] = await Promise.all([
      getBranchSettings(props.branch.id),
      getPointSettings()
    ])

    state.payment_due_days = branchSettings.payment_due_days ?? undefined
    state.pre_vale_max_percentage = branchSettings.pre_vale_max_percentage ?? undefined
    state.pre_vale_tolerance_amount = branchSettings.pre_vale_tolerance_amount ?? undefined
    state.point_value_mxn = branchSettings.point_value_mxn ?? undefined
    state.point_divisor_factor = pointSettings.point_divisor_factor ?? undefined
    state.point_multiplier = pointSettings.point_multiplier ?? undefined
    state.insurance_rates = (branchSettings.insurance_rates ?? []).map(tier => ({
      min_amount: String(tier.min_amount),
      max_amount: String(tier.max_amount),
      insurance_amount: String(tier.insurance_amount),
      _id: tierIdCounter++
    }))
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
      payment_due_days: event.data.payment_due_days ? Number(event.data.payment_due_days) : undefined,
      pre_vale_max_percentage: event.data.pre_vale_max_percentage ? String(event.data.pre_vale_max_percentage) : undefined,
      pre_vale_tolerance_amount: event.data.pre_vale_tolerance_amount ? String(event.data.pre_vale_tolerance_amount) : undefined,
      point_value_mxn: event.data.point_value_mxn ? String(event.data.point_value_mxn) : undefined,
      insurance_rates: event.data.insurance_rates?.map(t => ({
        min_amount: t.min_amount,
        max_amount: t.max_amount,
        insurance_amount: t.insurance_amount
      }))
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
          :items="[{ label: 'Vale', value: 'branch' }, { label: 'Puntos', value: 'points' }, { label: 'Seguros', value: 'insurance' }]"
        />

        <div v-if="tab === 'branch'" class="space-y-4 p-4">
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

        <div v-else-if="tab === 'insurance'" class="space-y-4 p-4">
          <p class="text-sm text-muted">
            El seguro se cobra dentro del vale y se resuelve según el monto. Cada producto puede sobrescribirlo.
          </p>

          <div class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted">
            <span>Monto mínimo</span>
            <span>Monto máximo</span>
            <span>Seguro</span>
            <span />
          </div>

          <div
            v-for="tier in state.insurance_rates ?? []"
            :key="tier._id"
            class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3"
          >
            <UInput v-model="tier.min_amount" type="number" min="0" step="0.01" placeholder="0.00" />
            <UInput v-model="tier.max_amount" type="number" min="0" step="0.01" placeholder="9999.99" />
            <UInput v-model="tier.insurance_amount" type="number" min="0" step="0.01" placeholder="100.00" />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              aria-label="Eliminar tramo"
              @click="removeTier(tier._id)"
            />
          </div>

          <UButton
            label="Agregar tramo"
            icon="i-lucide-plus"
            color="neutral"
            variant="outline"
            size="sm"
            @click="addTier"
          />

          <div class="flex items-center gap-3 pt-1">
            <UInput
              v-model="insurancePreviewInput"
              type="number"
              min="0"
              step="0.01"
              placeholder="Monto del vale para probar"
              class="w-56"
            />
            <span class="text-sm text-muted">
              Seguro aplicable:
              <span class="font-semibold text-highlighted">{{ insurancePreview !== null ? `$${insurancePreview.toFixed(2)}` : '—' }}</span>
            </span>
          </div>
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
