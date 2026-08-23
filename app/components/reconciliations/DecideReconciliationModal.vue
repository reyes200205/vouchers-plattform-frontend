<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Reconciliation } from '~/types'

const props = defineProps<{
  item: Reconciliation
}>()

const emit = defineEmits<{ decided: [] }>()

const { verifyReconciliation, rejectReconciliation } = useReconciliations()
const toast = useToast()

const open = ref(false)
const submitting = ref(false)
const decision = ref<'APROBAR' | 'RECHAZAR'>('APROBAR')

const schema = computed(() => decision.value === 'RECHAZAR'
  ? z.object({ rejection_reason: z.string().min(3, 'Indica el motivo del rechazo') })
  : z.object({}))

type Schema = { rejection_reason?: string }

const state = reactive<Schema>({
  rejection_reason: undefined
})

watch(open, (isOpen) => {
  if (!isOpen) return
  decision.value = 'APROBAR'
  state.rejection_reason = undefined
})

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    if (decision.value === 'APROBAR') {
      await verifyReconciliation(props.item.id)
    } else {
      await rejectReconciliation(props.item.id, event.data.rejection_reason ?? '')
    }

    toast.add({
      title: 'Decisión registrada',
      description: decision.value === 'APROBAR'
        ? 'La conciliación quedó aprobada.'
        : 'La conciliación fue rechazada; la transacción bancaria vuelve a estar disponible para que la cajera la concilie de nuevo.',
      color: 'success'
    })

    open.value = false
    emit('decided')
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo registrar la decisión. Intenta de nuevo.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Decidir conciliación" description="Revisa los datos que envió la cajera y aprueba o rechaza el emparejamiento" :ui="{ content: 'max-w-xl' }">
    <UButton
      label="Decidir"
      icon="i-lucide-badge-check"
      color="primary"
      variant="solid"
      size="sm"
    />

    <template #body>
      <div class="mb-4 space-y-1 rounded-lg border border-default p-4 text-sm">
        <p class="font-medium text-highlighted">
          {{ item.distributor_payment?.reported_reference || `Conciliación #${item.id}` }}
        </p>
        <p v-if="item.distributor_payment?.distributor" class="text-muted">
          Distribuidora: <span class="font-medium text-highlighted">{{ item.distributor_payment.distributor.name || '—' }}</span>
          ({{ item.distributor_payment.distributor.distributor_number }})
          <span v-if="item.distributor_payment.distributor.category"> · Categoría {{ item.distributor_payment.distributor.category.name }}</span>
        </p>
        <p class="text-muted">
          Relación de corte:
          <span class="font-medium text-highlighted">
            {{ item.distributor_payment?.cutoff_relation?.relation_number ?? `#${item.distributor_payment?.cutoff_relation_id ?? '—'}` }}
          </span>
          <span v-if="item.distributor_payment?.cutoff_relation?.status"> · {{ item.distributor_payment.cutoff_relation.status }}</span>
          <span v-if="item.distributor_payment?.cutoff_relation?.cutoff?.branch_name"> · {{ item.distributor_payment.cutoff_relation.cutoff.branch_name }}</span>
        </p>
        <p v-if="item.distributor_payment?.cutoff_relation" class="text-muted">
          Lo que debía la relación: <span class="font-medium text-highlighted">{{ money.format(Number(item.distributor_payment.cutoff_relation.total_amount_due)) }}</span>
          <span v-if="item.distributor_payment.cutoff_relation.payment_due_date"> · Fecha límite de pago: {{ item.distributor_payment.cutoff_relation.payment_due_date }}</span>
        </p>
        <p class="text-muted">
          Monto conciliado: <span class="font-medium text-highlighted">{{ money.format(Number(item.reconciled_amount)) }}</span>
          <span v-if="item.bank_transaction?.transaction_date"> · Fecha del depósito bancario: {{ item.bank_transaction.transaction_date }}</span>
        </p>
        <p class="text-muted">
          Diferencia contra lo que debía la relación:
          <span class="font-medium" :class="Number(item.amount_difference) === 0 ? 'text-highlighted' : 'text-error'">
            {{ money.format(Number(item.amount_difference)) }}
          </span>
        </p>
        <p v-if="item.notes" class="text-muted">
          Notas de la cajera: {{ item.notes }}
        </p>
      </div>

      <div v-if="item.is_retroactive_correction" class="mb-4 space-y-1 rounded-lg border border-warning bg-warning/10 p-4 text-sm">
        <p class="font-medium text-warning">
          ⚠ Corrección retroactiva
        </p>
        <p class="text-muted">
          Esta relación ya tiene multa aplicada (o ya se arrastró a un corte más nuevo). Si apruebas, el sistema revisa si la fecha real del depósito bancario cae dentro del rango "a tiempo" de la relación original:
        </p>
        <ul class="list-disc space-y-0.5 pl-5 text-muted">
          <li>Si coincide: se le quita la multa y se le regresa la comisión en toda la cadena de corte que arrastró esta deuda, se registra el pago real y se otorgan los puntos completos (sin la penalización del 20%).</li>
          <li>Si no coincide: la multa se conserva y solo se registra el pago sobre la relación vigente.</li>
        </ul>
      </div>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <URadioGroup
          v-model="decision"
          :items="[
            { label: 'Aprobar', value: 'APROBAR' },
            { label: 'Rechazar', value: 'RECHAZAR' }
          ]"
        />

        <UFormField v-if="decision === 'RECHAZAR'" label="Motivo del rechazo" name="rejection_reason">
          <UTextarea
            v-model="state.rejection_reason"
            placeholder="Explica por qué se rechaza el emparejamiento (relación equivocada, monto no corresponde, etc.)..."
            class="w-full"
          />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="decision === 'APROBAR' ? 'Aprobar' : 'Rechazar'"
            :color="decision === 'APROBAR' ? 'success' : 'error'"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
