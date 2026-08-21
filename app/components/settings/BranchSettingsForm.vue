<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { BranchSettings } from '~/types'

const props = defineProps<{
  branchId: number | undefined
  /** Envuelve el contenido en tabs (Vale / Seguros). Si es false, muestra todo en una sola columna (uso en página completa). */
  tabbed?: boolean
}>()

const emit = defineEmits<{ saved: [] }>()

const schema = z.object({
  voucher_expiration_days: z.coerce.number().int().min(1, 'Mínimo 1 día').optional().nullable(),
  voucher_amount_step: z.coerce.number().int().refine(v => v === 100 || v === 500, 'Solo 100 o 500').optional(),
  pre_vale_max_percentage: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100'),
  pre_vale_tolerance_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
  point_value_mxn: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
  opening_commission_percentage: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100'),
  biweekly_interest_percentage: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100'),
  late_payment_penalty_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
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

interface SettingsFormState {
  voucher_expiration_days?: number
  voucher_amount_step?: number
  pre_vale_max_percentage: string
  pre_vale_tolerance_amount: string
  point_value_mxn: string
  opening_commission_percentage: string
  biweekly_interest_percentage: string
  late_payment_penalty_amount: string
  insurance_rates: InsuranceTierRow[]
}

const { getBranchSettings, updateBranchSettings } = useSettings()
const toast = useToast()

const tab = ref('branch')
let tierIdCounter = 0

const state = reactive<SettingsFormState>({
  voucher_expiration_days: undefined,
  voucher_amount_step: undefined,
  pre_vale_max_percentage: '',
  pre_vale_tolerance_amount: '',
  point_value_mxn: '',
  opening_commission_percentage: '',
  biweekly_interest_percentage: '',
  late_payment_penalty_amount: '',
  insurance_rates: []
})

const insurancePreviewInput = ref('')

const insurancePreview = computed(() => {
  const amount = Number(insurancePreviewInput.value)
  if (!amount || !state.insurance_rates.length) return null
  const tier = state.insurance_rates.find((t) => {
    const min = Number(t.min_amount)
    const max = Number(t.max_amount)
    return amount >= min && amount <= max
  })
  return tier ? Number(tier.insurance_amount) : 0
})

function addTier() {
  state.insurance_rates.push({ min_amount: '', max_amount: '', insurance_amount: '', _id: tierIdCounter++ })
}

function removeTier(id: number) {
  state.insurance_rates = state.insurance_rates.filter(t => t._id !== id)
}

function applySettings(settings: BranchSettings) {
  state.voucher_expiration_days = settings.voucher_expiration_days ?? undefined
  state.voucher_amount_step = settings.voucher_amount_step ?? undefined
  state.pre_vale_max_percentage = settings.pre_vale_max_percentage ?? ''
  state.pre_vale_tolerance_amount = settings.pre_vale_tolerance_amount ?? ''
  state.point_value_mxn = settings.point_value_mxn ?? ''
  state.opening_commission_percentage = settings.opening_commission_percentage ?? ''
  state.biweekly_interest_percentage = settings.biweekly_interest_percentage ?? ''
  state.late_payment_penalty_amount = settings.late_payment_penalty_amount ?? ''
  state.insurance_rates = (settings.insurance_rates ?? []).map(tier => ({
    min_amount: String(tier.min_amount),
    max_amount: String(tier.max_amount),
    insurance_amount: String(tier.insurance_amount),
    _id: tierIdCounter++
  }))
}

// Ojo: este componente puede montarse simultáneamente en más de un lugar
// (la página de configuración y el modal de sucursales), así que la carga se
// maneja con un ref + watch propio del componente en vez de useAsyncData con
// una key compartida, que causaría que dos instancias con distinta sucursal
// pisen el mismo estado global.
const settingsLoad = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

async function loadSettings(branchId: number) {
  settingsLoad.value = 'pending'
  try {
    const settings = await getBranchSettings(branchId)
    applySettings(settings)
    settingsLoad.value = 'success'
  } catch {
    settingsLoad.value = 'error'
  }
}

function refreshSettings() {
  if (props.branchId) loadSettings(props.branchId)
}

watch(() => props.branchId, (branchId) => {
  if (branchId) loadSettings(branchId)
}, { immediate: true })

const saving = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.branchId) return

  saving.value = true

  try {
    await updateBranchSettings(props.branchId, {
      voucher_expiration_days: event.data.voucher_expiration_days || null,
      voucher_amount_step: event.data.voucher_amount_step,
      pre_vale_max_percentage: event.data.pre_vale_max_percentage,
      pre_vale_tolerance_amount: event.data.pre_vale_tolerance_amount,
      point_value_mxn: event.data.point_value_mxn,
      opening_commission_percentage: event.data.opening_commission_percentage,
      biweekly_interest_percentage: event.data.biweekly_interest_percentage,
      late_payment_penalty_amount: event.data.late_payment_penalty_amount,
      insurance_rates: event.data.insurance_rates?.map(t => ({
        min_amount: t.min_amount,
        max_amount: t.max_amount,
        insurance_amount: t.insurance_amount
      }))
    })

    toast.add({ title: 'Configuración guardada', description: 'La configuración de la sucursal fue actualizada.', color: 'success' })
    emit('saved')
  } catch {
    toast.add({ title: 'Error', description: 'No se pudo guardar la configuración. Verifica los valores.', color: 'error' })
  } finally {
    saving.value = false
  }
}

defineExpose({ refreshSettings })
</script>

<template>
  <div v-if="settingsLoad === 'pending'" class="flex items-center justify-center py-16">
    <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
  </div>

  <div v-else-if="settingsLoad === 'error'" class="flex flex-col items-center justify-center gap-3 py-16">
    <UIcon name="i-lucide-triangle-alert" class="size-8 text-error" />
    <p class="text-sm text-muted">
      No se pudo cargar la configuración de la sucursal.
    </p>
    <UButton label="Reintentar" color="neutral" variant="outline" @click="refreshSettings()" />
  </div>

  <div v-else-if="!branchId" class="flex flex-col items-center justify-center gap-3 py-16">
    <UIcon name="i-lucide-building" class="size-8 text-muted" />
    <p class="text-sm text-muted">
      Selecciona una sucursal para ver su configuración.
    </p>
  </div>

  <UForm
    v-else
    id="branch-settings-form"
    :schema="schema"
    :state="state"
    class="space-y-6"
    @submit="onSubmit"
  >
    <UTabs
      v-if="tabbed"
      v-model="tab"
      :content="false"
      :items="[{ label: 'Vale y puntos', value: 'branch' }, { label: 'Seguros', value: 'insurance' }]"
    />

    <div v-if="!tabbed || tab === 'branch'" class="space-y-6">
      <UPageCard
        title="Vales y puntos"
        description="Reglas de vales y valor del punto para esta sucursal."
      >
        <div class="grid grid-cols-2 gap-6">
          <UFormField label="Días de vencimiento del vale" name="voucher_expiration_days">
            <UInput v-model="state.voucher_expiration_days" type="number" min="1" step="1" placeholder="Sin vencimiento" class="w-full" />
          </UFormField>

          <UFormField label="Escalón de monto del vale" name="voucher_amount_step">
            <USelect
              v-model="state.voucher_amount_step"
              :items="[{ label: '$100', value: 100 as number }, { label: '$500', value: 500 as number }]"
              placeholder="Seleccionar..."
            />
          </UFormField>

          <UFormField required label="Máximo de pre-vale (% de la línea)" name="pre_vale_max_percentage">
            <UInput v-model="state.pre_vale_max_percentage" type="number" min="0" max="100" step="0.01" class="w-full" />
          </UFormField>

          <UFormField required label="Tolerancia de pre-vale (MXN)" name="pre_vale_tolerance_amount">
            <UInput v-model="state.pre_vale_tolerance_amount" type="number" min="0" step="0.01" class="w-full" />
          </UFormField>

          <UFormField required label="Valor del punto (MXN)" name="point_value_mxn">
            <UInput v-model="state.point_value_mxn" type="number" min="0" step="0.01" class="w-full" />
          </UFormField>
        </div>
      </UPageCard>

      <UPageCard
        title="Comisión, interés y recargo por defecto"
        description="Se usan al crear un vale nuevo en esta sucursal cuando no se especifica un valor manual."
      >
        <div class="grid grid-cols-3 gap-6">
          <UFormField required label="Comisión de apertura (%)" name="opening_commission_percentage">
            <UInput v-model="state.opening_commission_percentage" type="number" min="0" max="100" step="0.0001" class="w-full" />
          </UFormField>

          <UFormField required label="Interés quincenal (%)" name="biweekly_interest_percentage">
            <UInput v-model="state.biweekly_interest_percentage" type="number" min="0" max="100" step="0.0001" class="w-full" />
          </UFormField>

          <UFormField required label="Recargo por atraso (MXN)" name="late_payment_penalty_amount">
            <UInput v-model="state.late_payment_penalty_amount" type="number" min="0" step="0.01" class="w-full" />
          </UFormField>
        </div>
      </UPageCard>
    </div>

    <div v-if="!tabbed || tab === 'insurance'" class="space-y-4">
      <UPageCard
        title="Tarifas de seguro"
        description="El seguro se cobra dentro del vale y se resuelve según el monto. Cada producto puede sobrescribirlo."
      >
        <div class="space-y-4">
          <div class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted">
            <span>Monto mínimo</span>
            <span>Monto máximo</span>
            <span>Seguro</span>
            <span />
          </div>

          <div
            v-for="tier in state.insurance_rates"
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
      </UPageCard>
    </div>

    <UButton
      form="branch-settings-form"
      label="Guardar configuración"
      color="primary"
      type="submit"
      :loading="saving"
      class="w-fit"
    />
  </UForm>
</template>
