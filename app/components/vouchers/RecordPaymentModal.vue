<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Voucher } from '~/types'

const props = defineProps<{
  item: Voucher
}>()

const emit = defineEmits<{ recorded: [] }>()

const schema = z.object({
  amount: z.coerce.string().min(1, 'Requerido').refine(v => Number(v) > 0, 'El monto debe ser mayor a 0'),
  payment_date: z.string().optional(),
  payment_method: z.enum(['EFECTIVO', 'TRANSFERENCIA']),
  notes: z.string().max(255, 'Muy largo').optional()
})

type Schema = z.output<typeof schema>

const open = ref(false)
const submitting = ref(false)

// Si el vale está MOROSO, current_balance ya trae sumada la multa por atraso
// (vouchers:mark-overdue se la agrega una sola vez al vencer la quincena sin
// pago). Lo que le toca cobrar al cliente en este caso es la quincena atrasada
// + multa, MÁS APARTE la quincena normal que ya toca — no solo una quincena.
const overdueFee = computed(() => Number(props.item.late_fee_amount_snapshot) || 0)
const fortnightlyAmount = computed(() => Number(props.item.fortnightly_payment_amount) || 0)
const isOverdue = computed(() => props.item.status === 'MOROSO')
const catchUpAmount = computed(() => fortnightlyAmount.value + overdueFee.value + fortnightlyAmount.value)

function defaultAmount() {
  const balance = Number(props.item.current_balance)
  const suggested = isOverdue.value ? catchUpAmount.value : fortnightlyAmount.value
  if (!suggested) return balance ? String(balance) : ''
  return String(Math.min(suggested, balance || suggested))
}

const state = reactive<Partial<Schema>>({
  amount: defaultAmount(),
  payment_date: new Date().toISOString().slice(0, 10),
  payment_method: 'EFECTIVO',
  notes: undefined
})

watch(open, (isOpen) => {
  if (!isOpen) return
  state.amount = defaultAmount()
  state.payment_date = new Date().toISOString().slice(0, 10)
  state.payment_method = 'EFECTIVO'
  state.notes = undefined
})

const { recordPayment, reversePayment } = usePayments()
const toast = useToast()

async function undoPayment(paymentId: number) {
  try {
    await reversePayment(paymentId)
    toast.add({ title: 'Pago reversado', description: 'El pago se deshizo correctamente.', color: 'success' })
    emit('recorded')
  } catch {
    toast.add({ title: 'Error', description: 'No se pudo reversar el pago.', color: 'error' })
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    const payment = await recordPayment({
      voucher_id: props.item.id,
      amount: event.data.amount,
      payment_date: event.data.payment_date || undefined,
      payment_method: event.data.payment_method,
      notes: event.data.notes || undefined
    })

    toast.add({
      title: 'Pago registrado',
      description: `Se registró un pago de $${Number(event.data.amount).toLocaleString('es-MX')} para ${props.item.voucher_number}.`,
      color: 'success',
      actions: [{
        label: 'Deshacer',
        color: 'neutral',
        variant: 'outline',
        onClick: () => undoPayment(payment.id)
      }]
    })

    open.value = false
    emit('recorded')
  } catch (e: unknown) {
    const message = e instanceof Error && 'data' in e
      ? (e as { data?: { message?: string } }).data?.message
      : undefined
    toast.add({
      title: 'Error',
      description: message || 'No se pudo registrar el pago. Verifica el monto.',
      color: 'error'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Registrar pago" description="Captura el pago del cliente para este vale" :ui="{ content: 'max-w-xl' }">
    <UButton
      label="Registrar pago"
      icon="i-lucide-hand-coins"
      color="primary"
      variant="solid"
      size="xs"
    />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="rounded-lg border border-default bg-elevated/50 p-3 text-sm">
          <p class="font-medium text-highlighted">
            {{ item.voucher_number }}
            <span v-if="item.customer?.person">
              · {{ [item.customer.person.first_name, item.customer.person.last_name].filter(Boolean).join(' ') }}
            </span>
          </p>

          <p class="mt-1 text-xs text-muted">
            Esto queda como bitácora informativa: no actualiza el saldo del vale ni otorga puntos a la distribuidora
            directamente — eso se calcula cuando se concilia el corte de la distribuidora.
          </p>

          <p v-if="!isOverdue" class="text-xs text-muted">
            Saldo actual: ${{ Number(item.current_balance).toLocaleString('es-MX') }} · Pago quincenal sugerido:
            ${{ fortnightlyAmount.toLocaleString('es-MX') }}
          </p>

          <template v-else>
            <p class="mt-1 flex items-center gap-1.5 text-xs font-medium text-error">
              <UIcon name="i-lucide-triangle-alert" class="size-3.5" />
              Vale con quincena atrasada
            </p>
            <div class="mt-1.5 space-y-0.5 text-xs text-muted">
              <p>
                Quincena atrasada + multa: <span class="font-medium text-highlighted">${{ (fortnightlyAmount + overdueFee).toLocaleString('es-MX') }}</span>
              </p>
              <p>
                Quincena normal: <span class="font-medium text-highlighted">${{ fortnightlyAmount.toLocaleString('es-MX') }}</span>
              </p>
              <p class="pt-0.5">
                Saldo actual: <span class="font-medium text-highlighted">${{ Number(item.current_balance).toLocaleString('es-MX') }}</span>
              </p>
            </div>
          </template>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UFormField required label="Monto (MXN)" name="amount">
            <UInput v-model="state.amount" type="number" min="0.01" step="0.01" class="w-full" />
          </UFormField>

          <UFormField label="Fecha de pago" name="payment_date">
            <UInput v-model="state.payment_date" type="date" class="w-full" />
          </UFormField>
        </div>

        <UFormField label="Método de pago" name="payment_method">
          <USelect
            v-model="state.payment_method"
            :items="[
              { label: 'Efectivo', value: 'EFECTIVO' },
              { label: 'Transferencia', value: 'TRANSFERENCIA' }
            ]"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Notas" name="notes">
          <UTextarea v-model="state.notes" placeholder="Comentarios opcionales..." class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Registrar pago"
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
