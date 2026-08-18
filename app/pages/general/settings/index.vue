<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Branch, BranchSettings, PointSettings } from '~/types'

const toast = useToast()
const { user } = useAuth()
const { getBranchSettings, updateBranchSettings, getPointSettings, updatePointSettings } = useSettings()
const { listBranches } = useBranches()

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})
const isGeneralManager = computed(() => user.value?.permissions?.includes('point-settings.manage') ?? false)

const { data: branches } = await useAsyncData<Branch[]>('settings-branches', () => listBranches(), { default: () => [] })

const selectedBranchId = ref<number | undefined>(branchManagerBranchId.value ?? branches.value[0]?.id ?? undefined)

watch([branchManagerBranchId, branches], () => {
  if (!selectedBranchId.value && branchManagerBranchId.value) {
    selectedBranchId.value = branchManagerBranchId.value
  }
  if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) {
    selectedBranchId.value = branches.value[0].id
  }
}, { immediate: true })

const tiersSchema = z.array(z.object({
  min_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
  max_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) > 0, 'Monto inválido'),
  insurance_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido')
})).superRefine((tiers, ctx) => {
  const sorted = [...tiers].map(t => Number(t.min_amount)).sort((a, b) => a - b)
  const prevMins = new Set(sorted.map(String))
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
})

const formSchema = z.object({
  payment_due_days: z.coerce.number().int().min(1, 'Mínimo 1 día').optional(),
  voucher_amount_step: z.coerce.number().int().refine(v => v === 100 || v === 500, 'Solo 100 o 500').optional(),
  pre_vale_max_percentage: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100'),
  pre_vale_tolerance_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
  point_value_mxn: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
  insurance_rates: tiersSchema.optional()
})

type FormSchema = z.output<typeof formSchema>

interface InsuranceTierRow {
  min_amount: string
  max_amount: string
  insurance_amount: string
  _id: number
}

interface SettingsFormState {
  payment_due_days?: number
  voucher_amount_step?: number
  pre_vale_max_percentage: string
  pre_vale_tolerance_amount: string
  point_value_mxn: string
  insurance_rates?: InsuranceTierRow[]
}

const state = reactive<SettingsFormState>({
  payment_due_days: undefined,
  voucher_amount_step: undefined,
  pre_vale_max_percentage: '',
  pre_vale_tolerance_amount: '',
  point_value_mxn: '',
  insurance_rates: undefined
})

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

async function loadSettings(branchId: number) {
  const settings = await getBranchSettings(branchId)
  state.payment_due_days = settings.payment_due_days ?? undefined
  state.voucher_amount_step = settings.voucher_amount_step ?? undefined
  state.pre_vale_max_percentage = settings.pre_vale_max_percentage ?? ''
  state.pre_vale_tolerance_amount = settings.pre_vale_tolerance_amount ?? ''
  state.point_value_mxn = settings.point_value_mxn ?? ''
  state.insurance_rates = (settings.insurance_rates ?? []).map(tier => ({
    min_amount: String(tier.min_amount),
    max_amount: String(tier.max_amount),
    insurance_amount: String(tier.insurance_amount),
    _id: tierIdCounter++
  }))
}

const settingsStatus = ref<'idle' | 'loading' | 'error'>('idle')

const { refresh: refreshSettings, status: settingsLoad } = await useAsyncData(
  'branch-settings',
  () => selectedBranchId.value ? loadSettings(selectedBranchId.value) : Promise.resolve(),
  { watch: [selectedBranchId], default: () => undefined }
)

async function saveSettings(event: FormSubmitEvent<FormSchema>) {
  if (!selectedBranchId.value) return

  try {
    await updateBranchSettings(selectedBranchId.value, {
      payment_due_days: event.data.payment_due_days,
      voucher_amount_step: event.data.voucher_amount_step,
      pre_vale_max_percentage: event.data.pre_vale_max_percentage,
      pre_vale_tolerance_amount: event.data.pre_vale_tolerance_amount,
      point_value_mxn: event.data.point_value_mxn,
      insurance_rates: event.data.insurance_rates?.map(t => ({
        min_amount: t.min_amount,
        max_amount: t.max_amount,
        insurance_amount: t.insurance_amount
      }))
    })

    toast.add({ title: 'Configuración guardada', description: 'La configuración de la sucursal fue actualizada.', color: 'success' })
  } catch {
    toast.add({ title: 'Error', description: 'No se pudo guardar la configuración.', color: 'error' })
  }
}

const pointSchema = z.object({
  point_divisor_factor: z.coerce.number().int().min(1, 'Mínimo 1'),
  point_multiplier: z.coerce.number().int().min(1, 'Mínimo 1'),
  late_penalty_percentage: z.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100')
})

type PointSchema = z.output<typeof pointSchema>

const pointState = reactive<Partial<PointSchema>>({
  point_divisor_factor: undefined,
  point_multiplier: undefined,
  late_penalty_percentage: ''
})

const { refresh: refreshPoints } = await useAsyncData(
  'point-settings',
  async () => {
    if (!isGeneralManager.value) return
    const settings: PointSettings = await getPointSettings()
    pointState.point_divisor_factor = settings.point_divisor_factor
    pointState.point_multiplier = settings.point_multiplier
    pointState.late_penalty_percentage = settings.late_penalty_percentage ?? ''
  },
  { default: () => undefined }
)

async function savePoints(event: FormSubmitEvent<PointSchema>) {
  try {
    await updatePointSettings({
      point_divisor_factor: event.data.point_divisor_factor,
      point_multiplier: event.data.point_multiplier,
      late_penalty_percentage: event.data.late_penalty_percentage
    })
    toast.add({ title: 'Puntos actualizados', description: 'La configuración global de puntos fue actualizada.', color: 'success' })
  } catch {
    toast.add({ title: 'Error', description: 'No se pudieron guardar los puntos.', color: 'error' })
  }
}

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

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
</script>

<template>
  <UPage>
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Configuración">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template v-if="isGeneralManager" #right>
            <USelect
              v-model="selectedBranchId"
              :items="branches.map(b => ({ label: b.name, value: b.id as number }))"
              placeholder="Sucursal..."
              class="w-64"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div class="flex flex-col gap-6 p-6">
          <div v-if="settingsLoad === 'pending'" class="flex items-center justify-center py-16">
            <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
          </div>

          <template v-else-if="selectedBranchId">
            <UForm
              id="branch-settings"
              :schema="formSchema"
              :state="state"
              class="space-y-6"
              @submit="saveSettings"
            >
              <UPageCard
                title="Seguros"
                description="El seguro se cobra dentro del vale y forma parte del pago de la distribuidora. Se resuelve automáticamente según el monto del vale; cada producto puede sobrescribirlo."
              >
                <div class="space-y-3">
                  <div class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted">
                    <span>Monto mínimo</span>
                    <span>Monto máximo</span>
                    <span>Seguro</span>
                    <span />
                  </div>

                  <div
                    v-for="(tier, index) in state.insurance_rates ?? []"
                    :key="tier._id"
                    class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3"
                  >
                    <UInput
                      v-model="tier.min_amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                    <UInput
                      v-model="tier.max_amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="9999.99"
                    />
                    <UInput
                      v-model="tier.insurance_amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="100.00"
                    />
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

                  <div class="flex items-center gap-3 pt-2">
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
                      <span class="font-semibold text-highlighted">{{ insurancePreview !== null ? money.format(insurancePreview) : '—' }}</span>
                    </span>
                  </div>
                </div>
              </UPageCard>

              <UPageCard
                title="Vales y puntos"
                description="Reglas de vales y valor del punto para esta sucursal."
              >
                <div class="grid grid-cols-2 gap-6">
                  <UFormField label="Días para pagar (pago puntual)" name="payment_due_days">
                    <UInput v-model="state.payment_due_days" type="number" min="1" step="1" class="w-full" />
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

              <UButton
                form="branch-settings"
                label="Guardar configuración"
                color="primary"
                type="submit"
                class="w-fit"
              />
            </UForm>

            <UForm
              v-if="isGeneralManager"
              id="point-settings"
              :schema="pointSchema"
              :state="pointState"
              class="space-y-6"
              @submit="savePoints"
            >
              <UPageCard
                title="Puntos (global)"
                description="Cálculo de puntos para todas las sucursales: productos otorgados ÷ divisor × multiplicador."
              >
                <div class="grid grid-cols-3 gap-6">
                  <UFormField required label="Divisor de puntos (1200)" name="point_divisor_factor">
                    <UInput v-model="pointState.point_divisor_factor" type="number" min="1" step="1" class="w-full" />
                  </UFormField>

                  <UFormField required label="Multiplicador de puntos" name="point_multiplier">
                    <UInput v-model="pointState.point_multiplier" type="number" min="1" step="1" class="w-full" />
                  </UFormField>

                  <UFormField required label="Penalización por pago atrasado (%)" name="late_penalty_percentage">
                    <UInput v-model="pointState.late_penalty_percentage" type="number" min="0" max="100" step="0.01" class="w-full" />
                  </UFormField>
                </div>
              </UPageCard>

              <UButton
                form="point-settings"
                label="Guardar puntos"
                color="primary"
                type="submit"
                class="w-fit"
              />
            </UForm>
          </template>
        </div>
      </template>
    </UDashboardPanel>
  </UPage>
</template>