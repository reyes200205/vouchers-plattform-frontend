<script setup lang="ts">
import type { PointRedemption } from '~/types'

const emit = defineEmits<{ paid: [] }>()

const { lookupByFolio, payout } = usePointRedemptionPayouts()
const toast = useToast()

const open = ref(false)
const folio = ref('')
const searching = ref(false)
const paying = ref(false)
const searchError = ref<string | null>(null)
const redemption = ref<PointRedemption | null>(null)

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  PENDIENTE: 'warning',
  APROBADO: 'success',
  RECHAZADO: 'error',
  CANCELADO: 'neutral'
}

watch(open, (isOpen) => {
  if (isOpen) {
    folio.value = ''
    searchError.value = null
    redemption.value = null
  }
})

async function buscarFolio() {
  if (!folio.value.trim()) return

  searching.value = true
  searchError.value = null
  redemption.value = null

  try {
    redemption.value = await lookupByFolio(folio.value.trim())
  } catch (e: unknown) {
    searchError.value = extractApiErrorMessage(e, 'No se encontró ese folio en tu sucursal.')
  } finally {
    searching.value = false
  }
}

async function confirmarPago() {
  if (!redemption.value) return

  paying.value = true

  try {
    redemption.value = await payout(redemption.value.folio!)
    toast.add({
      title: 'Canje pagado',
      description: `Se entregaron ${money.format(Number(redemption.value.amount_mxn))} a la distribuidora.`,
      color: 'success'
    })
    emit('paid')
    open.value = false
  } catch (e: unknown) {
    toast.add({
      title: 'Error',
      description: extractApiErrorMessage(e, 'No se pudo confirmar el pago. Intenta de nuevo.'),
      color: 'error'
    })
  } finally {
    paying.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Pagar canje de puntos"
    description="Pide a la distribuidora el folio que le apareció al solicitar su canje de puntos."
  >
    <UButton
      label="Pagar canje por folio"
      icon="i-lucide-ticket"
      color="primary"
    />

    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField label="Folio">
          <div class="flex gap-2">
            <UInput
              v-model="folio"
              placeholder="CANJE-00000001"
              class="flex-1"
              @keyup.enter="buscarFolio"
            />
            <UButton
              label="Buscar"
              icon="i-lucide-search"
              :loading="searching"
              @click="buscarFolio"
            />
          </div>
        </UFormField>

        <p v-if="searchError" class="text-sm text-error">
          {{ searchError }}
        </p>

        <div v-if="redemption" class="flex flex-col gap-3 rounded-lg border border-default p-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted">Distribuidora</span>
            <span class="font-medium">{{ redemption.distributor?.distributor_number ?? `#${redemption.distributor_id}` }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted">Puntos</span>
            <span class="font-medium">{{ redemption.points }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted">Monto a entregar</span>
            <span class="font-semibold">{{ money.format(Number(redemption.amount_mxn)) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted">Estado</span>
            <UBadge :color="statusColors[redemption.status] ?? 'neutral'" variant="subtle" :label="redemption.status" />
          </div>

          <UButton
            v-if="redemption.status === 'PENDIENTE'"
            label="Confirmar y pagar"
            icon="i-lucide-check"
            color="primary"
            block
            :loading="paying"
            @click="confirmarPago"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
