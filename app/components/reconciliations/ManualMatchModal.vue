<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { customerFullName } from '~/composables/useCustomers'
import type { BankTransaction, CutoffRelation } from '~/types'

const props = defineProps<{
  transaction: BankTransaction
}>()

const emit = defineEmits<{ matched: [] }>()

const schema = z.object({
  cutoff_id: z.number({ message: 'Selecciona un corte.' }),
  cutoff_relation_id: z.number({ message: 'Selecciona una relación.' }),
  amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .optional(),
  payment_method: z.enum(['TRANSFER', 'DEPOSIT', 'OTHER']).optional(),
  notes: z.string().max(255).optional()
})

type Schema = z.output<typeof schema>

const open = ref(false)
const toast = useToast()
const submitting = ref(false)

const { listCutoffs, listCutoffRelations, manualMatch } = useReconciliations()

const cutoffItems = ref<{ label: string, value: number }[]>([])
const relations = ref<CutoffRelation[]>([])
const loadingCutoffs = ref(false)
const loadingRelations = ref(false)

const state = reactive<Partial<Schema>>({
  cutoff_id: undefined,
  cutoff_relation_id: undefined,
  amount: undefined,
  payment_method: 'DEPOSIT',
  notes: undefined
})

// GENERADA/PARCIAL/VENCIDA es el flujo normal. CERRADA (su deuda ya se
// arrastro a un corte mas nuevo) y PAGADA-con-multa tambien se dejan elegir:
// puede que el deposito real si haya llegado a tiempo y la multa se haya
// aplicado solo porque nunca se registro -- el gerente decide, con la fecha
// real del deposito, si corresponde corregirla (ver RetroactiveReconciliationService
// en el backend). Una PAGADA sin multa no tiene nada que corregir.
const eligibleStatuses = ['GENERADA', 'PARCIAL', 'VENCIDA', 'CERRADA']

function requiereCorreccion(relation: CutoffRelation): boolean {
  return relation.status === 'CERRADA' || Number(relation.total_late_fees ?? 0) > 0
}

const shortDate = new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short' })

// cutoff.period_start llega como fecha pura "YYYY-MM-DD" (sin hora): hay que
// armarla con año/mes/día locales en vez de dejar que Date la interprete
// como medianoche UTC, o se corre un día para atrás en México (mismo bug ya
// corregido en RelationDetailModal/VoucherDetailModal). cutoff.scheduled_at
// (el fin del periodo) sí es un datetime ISO completo con offset, así que
// ese se puede pasar directo a Date.
function fmtPeriodStart(value: string | null | undefined): string {
  if (!value) return '?'
  const [year, month, day] = value.split('-').map(Number)
  return shortDate.format(new Date(year, month - 1, day))
}

function fmtPeriodEnd(value: string | null | undefined): string {
  if (!value) return '?'
  return shortDate.format(new Date(value))
}

const relationItems = computed(() => {
  return relations.value
    .filter(relation => eligibleStatuses.includes(relation.status ?? '') || (relation.status === 'PAGADA' && Number(relation.total_late_fees ?? 0) > 0))
    .map(relation => ({
      label: `${relation.distributor?.person ? customerFullName(relation.distributor.person) : `Distribuidor ${relation.distributor_id}`} · ${relation.relation_number} · ${relation.payment_reference} · $${relation.total_amount_due}`
        + (requiereCorreccion(relation) ? ' · ⚠ requiere corrección' : ''),
      value: relation.id
    }))
})

watch(open, async (isOpen) => {
  if (!isOpen) return

  state.cutoff_id = undefined
  state.cutoff_relation_id = undefined
  state.amount = props.transaction.amount
  state.payment_method = 'DEPOSIT'
  state.notes = undefined
  relations.value = []

  loadingCutoffs.value = true
  try {
    const page = await listCutoffs()
    cutoffItems.value = page.data
      .filter(cutoff => (cutoff.relations_count ?? 0) > 0)
      .map(cutoff => ({
        label: `Corte #${cutoff.id} · ${fmtPeriodStart(cutoff.period_start)} – ${fmtPeriodEnd(cutoff.scheduled_at)} · ${cutoff.status ?? 'SIN ESTADO'} · ${cutoff.relations_count} relaciones`,
        value: cutoff.id
      }))
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudieron cargar los cortes disponibles.',
      color: 'error'
    })
  } finally {
    loadingCutoffs.value = false
  }
})

watch(() => state.cutoff_id, async (cutoffId) => {
  state.cutoff_relation_id = undefined
  relations.value = []

  if (!cutoffId) return

  loadingRelations.value = true
  try {
    relations.value = await listCutoffRelations(cutoffId)
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudieron cargar las relaciones del corte.',
      color: 'error'
    })
  } finally {
    loadingRelations.value = false
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    await manualMatch(props.transaction.id, {
      cutoff_relation_id: event.data.cutoff_relation_id,
      amount: event.data.amount ? String(event.data.amount) : undefined,
      payment_method: event.data.payment_method,
      notes: event.data.notes
    })

    toast.add({
      title: 'Conciliación registrada',
      description: 'Quedó pendiente de la segunda autorización.',
      color: 'success'
    })

    open.value = false
    emit('matched')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo registrar la conciliación. Intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Conciliar depósito" description="Emparejar la transacción con una relación de corte" :ui="{ content: 'max-w-2xl' }">
    <UButton
      label="Conciliar"
      icon="i-lucide-hand-coins"
      color="primary"
      variant="outline"
      size="xs"
    />

    <template #body>
      <div class="mb-4 rounded-md bg-elevated p-4">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="truncate font-semibold text-highlighted">
              {{ transaction.reference }}
            </p>
            <p class="text-xs text-muted">
              {{ transaction.payer_name || 'Pago bancario' }} · {{ transaction.transaction_date }}
            </p>
          </div>
          <p class="shrink-0 text-sm font-semibold text-highlighted">
            {{ new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(transaction.amount)) }}
          </p>
        </div>
      </div>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Corte" name="cutoff_id">
          <USelect
            v-model="state.cutoff_id"
            :items="cutoffItems"
            placeholder="Seleccionar corte..."
            :loading="loadingCutoffs"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Relación de corte" name="cutoff_relation_id">
          <USelect
            v-model="state.cutoff_relation_id"
            :items="relationItems"
            placeholder="Seleccionar relación..."
            :loading="loadingRelations"
            :disabled="!state.cutoff_id"
            class="w-full"
          />
          <p class="mt-1 text-xs text-muted">
            Las marcadas "⚠ requiere corrección" ya tienen multa aplicada o ya se arrastraron a un corte más nuevo — si el depósito real llegó a tiempo según el banco, el gerente podrá quitarle la multa al aprobar.
          </p>
        </UFormField>

        <UFormField label="Monto conciliado (MXN)" name="amount">
          <UInput
            v-model="state.amount"
            type="number"
            min="0"
            step="0.01"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Método de pago" name="payment_method">
          <USelect
            v-model="state.payment_method"
            :items="[
              { label: 'Depósito', value: 'DEPOSIT' },
              { label: 'Transferencia', value: 'TRANSFER' },
              { label: 'Otro', value: 'OTHER' }
            ]"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Notas (opcional)" name="notes">
          <UTextarea v-model="state.notes" placeholder="Contexto de la conciliación..." class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Registrar conciliación"
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
