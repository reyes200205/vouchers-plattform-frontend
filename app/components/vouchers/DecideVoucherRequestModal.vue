<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { PendingVoucherRequest } from '~/types'

const props = defineProps<{
  item: PendingVoucherRequest
}>()

const emit = defineEmits<{ decided: [] }>()

const { approveVoucherRequest, rejectVoucherRequest } = useVouchers()
const { verifyCustomer, fieldLabels } = useCustomers()
const toast = useToast()
const labels = fieldLabels()

const open = ref(false)
const isChangeRequestOpen = ref(false)

// Si el cliente ya fue verificado antes (no es su primer vale), la cajera no
// necesita revisar documentos: pasa directo a los detalles del vale ("vale
// digital"). Si nunca se ha verificado, primero hay que checar en persona
// su identidad antes de poder aprobar la solicitud.
const needsVerification = computed(() => !!props.item.customer && !props.item.customer.verified_at)

type Step = 'customer' | 'voucher'
const step = ref<Step>('voucher')

const decision = ref<'APROBADO' | 'RECHAZADO'>('APROBADO')

const schema = computed(() => decision.value === 'RECHAZADO'
  ? z.object({ rejection_reason: z.string().min(3, 'Indica el motivo del rechazo') })
  : z.object({ notes: z.string().optional() }))

type Schema = { rejection_reason?: string, notes?: string }

const state = reactive<Schema>({
  rejection_reason: undefined,
  notes: undefined
})

const verifying = ref(false)
const verifyNotes = ref<string | undefined>(undefined)
const submitting = ref(false)

function resetWizard() {
  step.value = needsVerification.value ? 'customer' : 'voucher'
  decision.value = 'APROBADO'
  state.rejection_reason = undefined
  state.notes = undefined
  verifyNotes.value = undefined
}

watch(open, (isOpen) => {
  if (isOpen) resetWizard()
})

function present(value: string | null | undefined) {
  return value && value.trim() ? value : '—'
}

const person = computed(() => props.item.customer?.person ?? null)

const IDENTITY_FIELDS = ['first_name', 'middle_name', 'last_name', 'second_last_name', 'curp', 'rfc', 'mobile_phone', 'email'] as const

const personDetails = computed(() => IDENTITY_FIELDS.map(field => ({
  key: field,
  label: labels[field],
  value: present(person.value?.[field] ?? null)
})))

const addressLine = computed(() => {
  const p = person.value
  if (!p) return '—'
  const parts = [p.street, p.external_number ? `#${p.external_number}` : null, p.neighborhood, p.city, p.state, p.postal_code].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
})

async function onVerifyConfirmed() {
  if (!props.item.customer) return

  verifying.value = true

  try {
    await verifyCustomer(props.item.customer.id, { notes: verifyNotes.value || undefined })

    toast.add({
      title: 'Cliente verificado',
      description: 'Documentos validados. Continúa con los detalles del vale.',
      color: 'success'
    })

    step.value = 'voucher'
  } catch {
    toast.add({
      title: 'Error',
      description: 'No se pudo verificar al cliente. Intenta de nuevo.',
      color: 'error'
    })
  } finally {
    verifying.value = false
  }
}

function onRequestChange() {
  open.value = false
  isChangeRequestOpen.value = true
}

function onChanged() {
  isChangeRequestOpen.value = false
  toast.add({
    title: 'Solicitud enviada',
    description: 'Cuando el gerente apruebe el cambio, vuelve a "Decidir" para verificar y otorgar el vale.',
    color: 'info'
  })
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitting.value = true

  try {
    if (decision.value === 'APROBADO') {
      await approveVoucherRequest(props.item.id, { notes: event.data.notes || undefined })
    } else {
      await rejectVoucherRequest(props.item.id, { rejection_reason: event.data.rejection_reason ?? '' })
    }

    toast.add({
      title: 'Decisión registrada',
      description: decision.value === 'APROBADO'
        ? 'El vale fue aprobado. Cuando el cliente se presente con el correo que ya recibió, entrégale el vale desde "Vales emitidos".'
        : 'La solicitud de vale fue rechazada.',
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

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
</script>

<template>
  <UModal
    v-model:open="open"
    :title="step === 'customer' ? 'Verificar cliente (primer vale)' : 'Decidir solicitud de vale'"
    :description="step === 'customer' ? 'Revisa su identificación (INE) y comprobante de domicilio en persona' : 'Aprobar o rechazar la solicitud'"
    :ui="{ content: 'max-w-xl' }"
  >
    <UButton
      label="Decidir"
      icon="i-lucide-clipboard-check"
      color="primary"
      variant="outline"
      size="xs"
    />

    <template #body>
      <div v-if="step === 'customer'" class="space-y-4">
        <div class="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning">
          Es el primer vale de este cliente: valida su identidad en persona antes de continuar.
        </div>

        <div v-if="person" class="space-y-2 text-sm">
          <p class="font-medium text-highlighted">
            {{ item.customer_name || 'Cliente' }} <span class="font-normal text-muted">({{ item.customer_code }})</span>
          </p>
          <div class="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
            <span v-for="field in personDetails" :key="field.key" class="text-muted">
              <span class="font-medium text-highlighted">{{ field.label }}:</span> {{ field.value }}
            </span>
          </div>
          <p class="text-muted">
            <span class="font-medium text-highlighted">Domicilio:</span> {{ addressLine }}
          </p>
        </div>
        <p v-else class="text-sm text-muted">
          No hay datos de identidad capturados para este cliente.
        </p>

        <UFormField label="Notas de la verificación">
          <UTextarea
            v-model="verifyNotes"
            placeholder="Observaciones de la verificación (opcional)..."
            class="w-full"
          />
        </UFormField>

        <div class="flex flex-wrap justify-end gap-2">
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="Solicitar cambio de datos"
            color="neutral"
            variant="subtle"
            icon="i-lucide-file-pen-line"
            @click="onRequestChange"
          />
          <UButton
            label="Todo correcto, verificar"
            color="success"
            variant="solid"
            :loading="verifying"
            @click="onVerifyConfirmed"
          />
        </div>
      </div>

      <UForm
        v-else
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="rounded-lg border border-default px-3 py-2 text-sm">
          <p class="font-medium text-highlighted">
            {{ item.distributor_name }}
            <span v-if="item.customer_name"> · {{ item.customer_name }}</span>
          </p>
          <p class="text-xs text-muted">
            {{ item.financial_product_name ?? 'Producto' }} · {{ money.format(Number(item.requested_amount)) }}
            <span v-if="item.is_pre_vale"> · Pre-vale</span>
          </p>
        </div>

        <URadioGroup
          v-model="decision"
          :items="[
            { label: 'Aprobar', value: 'APROBADO' },
            { label: 'Rechazar', value: 'RECHAZADO' }
          ]"
        />

        <UFormField v-if="decision === 'APROBADO'" label="Notas" name="notes">
          <UTextarea v-model="state.notes" placeholder="Comentarios opcionales..." class="w-full" />
        </UFormField>

        <UFormField v-else label="Motivo del rechazo" name="rejection_reason">
          <UTextarea v-model="state.rejection_reason" placeholder="Explica por qué se rechaza la solicitud..." class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton
            v-if="needsVerification"
            label="Atrás"
            color="neutral"
            variant="ghost"
            @click="step = 'customer'"
          />
          <UButton
            label="Cancelar"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="decision === 'APROBADO' ? 'Aprobar' : 'Rechazar'"
            :color="decision === 'APROBADO' ? 'success' : 'error'"
            variant="solid"
            type="submit"
            :loading="submitting"
          />
        </div>
      </UForm>
    </template>
  </UModal>

  <CustomersChangeCustomerRequestModal
    v-if="item.customer"
    v-model:open="isChangeRequestOpen"
    :customer="item.customer"
    @changed="onChanged"
  />
</template>
