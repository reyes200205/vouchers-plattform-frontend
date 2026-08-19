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

const formSchema = z.object({
  payment_due_days: z.coerce.number().int().min(1, 'Mínimo 1 día').optional(),
  voucher_amount_step: z.coerce.number().int().refine(v => v === 100 || v === 500, 'Solo 100 o 500').optional(),
  pre_vale_max_percentage: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0 && Number(v) <= 100, 'Entre 0 y 100'),
  pre_vale_tolerance_amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido'),
  point_value_mxn: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) >= 0, 'Monto inválido')
})

type FormSchema = z.output<typeof formSchema>

interface SettingsFormState {
  payment_due_days?: number
  voucher_amount_step?: number
  pre_vale_max_percentage: string
  pre_vale_tolerance_amount: string
  point_value_mxn: string
}

const state = reactive<SettingsFormState>({
  payment_due_days: undefined,
  voucher_amount_step: undefined,
  pre_vale_max_percentage: '',
  pre_vale_tolerance_amount: '',
  point_value_mxn: ''
})

async function loadSettings(branchId: number) {
  const settings = await getBranchSettings(branchId)
  state.payment_due_days = settings.payment_due_days ?? undefined
  state.voucher_amount_step = settings.voucher_amount_step ?? undefined
  state.pre_vale_max_percentage = settings.pre_vale_max_percentage ?? ''
  state.pre_vale_tolerance_amount = settings.pre_vale_tolerance_amount ?? ''
  state.point_value_mxn = settings.point_value_mxn ?? ''
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
      point_value_mxn: event.data.point_value_mxn
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

          <div v-else-if="settingsLoad === 'error'" class="flex flex-col items-center justify-center gap-3 py-16">
            <UIcon name="i-lucide-triangle-alert" class="size-8 text-error" />
            <p class="text-sm text-muted">No se pudo cargar la configuración de la sucursal.</p>
            <UButton label="Reintentar" color="neutral" variant="outline" @click="refreshSettings()" />
          </div>

          <div v-else-if="!selectedBranchId" class="flex flex-col items-center justify-center gap-3 py-16">
            <UIcon name="i-lucide-building" class="size-8 text-muted" />
            <p class="text-sm text-muted">Selecciona una sucursal para ver su configuración.</p>
          </div>

          <template v-else>
            <UForm
              id="branch-settings"
              :schema="formSchema"
              :state="state"
              class="space-y-6"
              @submit="saveSettings"
            >
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