<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { DistributorCategory, FinancialProduct, InsuranceTier } from '~/types'

const props = defineProps<{
  product: FinancialProduct | null
  cloneTemplate?: FinancialProduct | null
  categories: DistributorCategory[]
  branchId: number | undefined
  insuranceTiers: InsuranceTier[] | null
  pointValueMxn?: string
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ created: [], updated: [] }>()

const schema = z.object({
  code: z.string().max(30, 'Muy largo').optional(),
  name: z.string().min(2, 'Muy corto').max(150, 'Muy largo'),
  description: z.string().max(255, 'Muy largo').optional(),
  principal_amount: z.coerce.string().min(1, 'Requerido').refine(value => Number(value) > 0, 'Monto inválido'),
  number_of_fortnights: z.number().int().min(1, 'Mínimo 1 quincena'),
  category_id: z.any().optional().superRefine((value, ctx) => {
    if (!value || Number(value) < 1) {
      ctx.addIssue({ code: 'custom', message: 'Selecciona una categoría' })
    }
  }),
  insurance_amount: z.coerce.string().optional(),
  is_active: z.boolean()
})

type Schema = z.output<typeof schema>

const { createProduct, updateProduct } = useProducts()
const toast = useToast()
const submitting = ref(false)

const state = reactive<Partial<Schema>>({
  code: '',
  name: '',
  description: '',
  principal_amount: '',
  number_of_fortnights: undefined,
  category_id: undefined,
  insurance_amount: '',
  is_active: true
})

watch(open, () => {
  if (props.product) {
    state.code = props.product.code
    state.name = props.product.name
    state.description = props.product.description ?? ''
    state.principal_amount = String(Number(props.product.principal_amount))
    state.number_of_fortnights = props.product.number_of_fortnights
    state.category_id = String(props.product.category_id ?? '')
    state.insurance_amount = String(Number(props.product.insurance_amount))
    state.is_active = props.product.is_active
  } else if (props.cloneTemplate) {
    state.code = ''
    state.name = props.cloneTemplate.name
    state.description = props.cloneTemplate.description ?? ''
    state.principal_amount = String(Number(props.cloneTemplate.principal_amount))
    state.number_of_fortnights = props.cloneTemplate.number_of_fortnights
    state.category_id = String(props.cloneTemplate.category_id ?? '')
    state.insurance_amount = String(Number(props.cloneTemplate.insurance_amount))
    state.is_active = true
  } else {
    state.code = ''
    state.name = ''
    state.description = ''
    state.principal_amount = ''
    state.number_of_fortnights = undefined
    state.category_id = undefined
    state.insurance_amount = ''
    state.is_active = true
  }
}, { immediate: true })

const categoryItems = computed(() => props.categories.map(c => ({
  label: c.name,
  value: c.id.toString()
})))

const selectedCategory = computed(() => {
  if (!state.category_id) return null
  return props.categories.find(c => c.id === Number(state.category_id)) ?? null
})

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const principal = computed(() => Number(state.principal_amount) || 0)
const fortnights = computed(() => Number(state.number_of_fortnights) || 0)

const distributorMargin = computed(() => {
  if (!selectedCategory.value || !principal.value || !fortnights.value) return null
  return (principal.value * (Number(selectedCategory.value.commission_percentage) / 100)) / fortnights.value
})

const pointsPreview = computed(() => {
  if (!selectedCategory.value || !principal.value) return null
  const chunks = Math.floor(principal.value / 1200)
  return chunks * selectedCategory.value.points_per_1200
})

const pointsValueMxn = computed(() => {
  if (pointsPreview.value === null || !props.pointValueMxn) return null
  return pointsPreview.value * Number(props.pointValueMxn)
})

const autoInsurance = computed(() => {
  if (!principal.value || !props.insuranceTiers?.length) return null
  const tier = props.insuranceTiers.find(t => {
    const min = Number(t.min_amount)
    const max = Number(t.max_amount)
    return principal.value >= min && principal.value < max
  })
  return tier ? Number(tier.insurance_amount) : 0
})

const effectiveInsurance = computed(() => {
  const manual = Number(state.insurance_amount)
  if (state.insurance_amount && manual > 0) return manual
  return autoInsurance.value
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!props.branchId) {
    toast.add({
      title: 'Selecciona una sucursal',
      description: 'No se puede guardar el vale sin sucursal.',
      color: 'warning'
    })
    return
  }

  submitting.value = true

  try {
    const insuranceAmount = event.data.insurance_amount ? String(Number(event.data.insurance_amount)) : undefined

    if (props.product) {
      await updateProduct(props.branchId, props.product.id, {
        code: event.data.code || undefined,
        name: event.data.name,
        description: event.data.description || undefined,
        category_id: Number(event.data.category_id),
        principal_amount: event.data.principal_amount,
        number_of_fortnights: event.data.number_of_fortnights,
        insurance_amount: insuranceAmount,
        is_active: event.data.is_active
      })

      toast.add({
        title: 'Vale actualizado',
        description: `${event.data.name} fue actualizado correctamente`,
        color: 'success'
      })
      emit('updated')
    } else {
      await createProduct(props.branchId, {
        code: event.data.code || undefined,
        name: event.data.name,
        description: event.data.description || undefined,
        category_id: Number(event.data.category_id),
        principal_amount: event.data.principal_amount,
        number_of_fortnights: event.data.number_of_fortnights,
        insurance_amount: insuranceAmount,
        is_active: true
      })

      toast.add({
        title: 'Vale creado',
        description: `${event.data.name} fue creado correctamente`,
        color: 'success'
      })
      emit('created')
    }

    open.value = false
  } catch (e: unknown) {
    const message = e instanceof Error && 'data' in e
      ? JSON.stringify((e as { data?: { message?: string } }).data?.message ?? '')
      : ''
    toast.add({
      title: 'Error',
      description: message || 'No se pudo guardar el vale. Verifica los datos e intenta de nuevo.',
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
    :title="product ? 'Editar vale' : (cloneTemplate ? 'Usar vale del catálogo general' : 'Nuevo vale')"
    :description="product ? `Actualizar ${product.name}` : (cloneTemplate ? 'Cópialo en tu sucursal y ajústalo si es necesario' : 'Agrega un nuevo producto o vale a la sucursal')"
    class="max-w-2xl"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          v-if="!product"
          label="Código"
          name="code"
          description="Opcional: se genera automáticamente si lo dejas vacío"
        >
          <UInput
            v-model="state.code"
            class="w-full"
            uppercase
            placeholder="Ej. VALE-ZAPATERIA-8K"
          />
        </UFormField>

        <UFormField required label="Nombre" name="name">
          <UInput v-model="state.name" class="w-full" placeholder="Ej. Vale Zapatería 8K" />
        </UFormField>

        <UFormField label="Descripción" name="description">
          <UInput v-model="state.description" class="w-full" placeholder="Ej. Vale de 8,000 MXN a 2 quincenas" />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField required label="Monto" name="principal_amount">
            <UInput
              v-model="state.principal_amount"
              type="number"
              min="0"
              step="0.01"
              class="w-full"
              placeholder="8000"
            />
          </UFormField>

          <UFormField required label="Quincenas" name="number_of_fortnights">
            <UInput
              v-model.number="state.number_of_fortnights"
              type="number"
              min="1"
              step="1"
              class="w-full"
              placeholder="2"
            />
          </UFormField>
        </div>

        <UFormField required label="Categoría" name="category_id">
          <USelect
            v-model="state.category_id"
            :items="categoryItems"
            placeholder="Seleccionar categoría..."
            class="w-full"
          />
        </UFormField>

        <div
          v-if="selectedCategory"
          class="grid grid-cols-2 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"
        >
          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase text-muted">Comisión distribuidora</span>
            <span class="font-semibold text-highlighted">
              {{ Number(selectedCategory.commission_percentage) }}%
              <span class="font-normal text-muted">({{ distributorMargin !== null ? `${money.format(distributorMargin)} / quincena` : '—' }})</span>
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase text-muted">Puntos estimados</span>
            <span class="font-semibold text-highlighted">
              {{ pointsPreview ?? '—' }} pts
              <span v-if="pointsValueMxn !== null" class="font-normal text-muted">({{ money.format(pointsValueMxn) }})</span>
            </span>
          </div>
        </div>

        <UFormField
          label="Seguro (MXN)"
          name="insurance_amount"
          :description="autoInsurance !== null && !state.insurance_amount
            ? `Automático por tarifa de sucursal: ${money.format(autoInsurance)}. Déjalo vacío para usarlo.`
            : 'Déjalo vacío para usar la tarifa de seguro de la sucursal'"
        >
          <UInput
            v-model="state.insurance_amount"
            type="number"
            min="0"
            step="0.01"
            class="w-full"
            placeholder="Automático"
          />
        </UFormField>

        <div
          v-if="effectiveInsurance !== null"
          class="rounded-lg border border-default bg-elevated/50 p-3 text-sm"
        >
          <span class="text-xs uppercase text-muted">Seguro que se cobrará</span>
          <p class="font-semibold text-highlighted">
            {{ money.format(effectiveInsurance) }}
          </p>
        </div>

        <UFormField v-if="product" label="Activo" name="is_active">
          <UToggle v-model="state.is_active" aria-label="Activo" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="product ? 'Guardar' : 'Crear'"
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