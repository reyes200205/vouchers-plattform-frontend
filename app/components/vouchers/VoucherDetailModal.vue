<script setup lang="ts">
import type { Voucher } from '~/types'

const props = defineProps<{
  voucher: Voucher | null
}>()

const open = defineModel<boolean>('open', { default: false })

const toast = useToast()

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function fmtMoney(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return money.format(Number(value))
}

// Los timestamps completos (issued_at, transferred_at, created_at, etc.)
// vienen como ISO con offset y sí se pueden pasar directo a Date. Los campos
// de solo-fecha (payment_due_date, expiration_date) NO llevan hora, así que
// hay que armarlos con año/mes/día locales para no correrlos un día por la
// interpretación UTC de Date (mismo bug ya corregido en RelationDetailModal).
function fmtDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  return new Date(value).toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function fmtDate(value: string | null | undefined): string {
  if (!value) return '—'
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  APROBADO: 'success',
  ACTIVO: 'info',
  PAGO_PARCIAL: 'info',
  PAGADO: 'success',
  LIQUIDADO: 'neutral',
  MOROSO: 'error',
  CANCELADO: 'error',
  REVERSADO: 'neutral',
  BORRADOR: 'warning'
}

function statusColor(status: string | null | undefined) {
  return status ? (statusColors[status] ?? 'neutral') : 'neutral'
}

function customerName(voucher: Voucher) {
  const person = voucher.customer?.person
  return [person?.first_name, person?.last_name].filter(Boolean).join(' ') || 'Cliente'
}

function distributorName(voucher: Voucher) {
  const person = voucher.distributor?.person
  return [person?.first_name, person?.last_name].filter(Boolean).join(' ') || null
}

async function copyToClipboard(value: string | null | undefined, label: string) {
  if (!value) return

  try {
    await navigator.clipboard.writeText(value)
    toast.add({ title: 'Copiado', description: `${label} copiado al portapapeles.`, color: 'success' })
  } catch {
    toast.add({ title: 'No se pudo copiar', description: 'Copia el dato manualmente.', color: 'error' })
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="voucher ? `Vale ${voucher.voucher_number}` : 'Vale'"
    :description="voucher ? customerName(voucher) : undefined"
    :ui="{ content: 'max-w-2xl' }"
  >
    <template #body>
      <div v-if="voucher" class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-default bg-elevated/50 p-4">
          <div>
            <p class="text-xs uppercase text-muted">
              Cliente
            </p>
            <p class="font-semibold text-highlighted">
              {{ customerName(voucher) }}
              <span class="text-xs font-normal text-muted">({{ voucher.customer?.customer_code }})</span>
            </p>
            <p v-if="distributorName(voucher)" class="text-xs text-muted">
              Distribuidora: {{ distributorName(voucher) }}
              <template v-if="voucher.distributor?.distributor_number">
                ({{ voucher.distributor.distributor_number }})
              </template>
            </p>
          </div>

          <div class="flex items-center gap-2">
            <UBadge
              v-if="voucher.is_expired"
              color="error"
              variant="solid"
              label="VENCIDO"
              size="lg"
            />
            <UBadge
              v-else
              :color="statusColor(voucher.status)"
              variant="subtle"
              :label="voucher.status ?? undefined"
              size="lg"
            />
          </div>
        </div>

        <div class="rounded-lg border border-default p-4">
          <p class="mb-3 text-xs uppercase text-muted">
            Referencias para conciliar el pago
          </p>

          <div class="space-y-3">
            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs text-muted">
                  Referencia de transferencia
                </p>
                <p class="truncate font-mono text-lg font-semibold text-highlighted">
                  {{ voucher.transfer_reference ?? '— (aún no entregado)' }}
                </p>
              </div>
              <UButton
                v-if="voucher.transfer_reference"
                icon="i-lucide-copy"
                color="neutral"
                variant="subtle"
                size="xs"
                @click="copyToClipboard(voucher.transfer_reference, 'Referencia de transferencia')"
              />
            </div>

            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs text-muted">
                  Número de autorización
                </p>
                <p class="truncate font-mono text-lg font-semibold text-highlighted">
                  {{ voucher.authorized_number ?? '— (aún no entregado)' }}
                </p>
              </div>
              <UButton
                v-if="voucher.authorized_number"
                icon="i-lucide-copy"
                color="neutral"
                variant="subtle"
                size="xs"
                @click="copyToClipboard(voucher.authorized_number, 'Número de autorización')"
              />
            </div>

            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs text-muted">
                  Número de vale
                </p>
                <p class="truncate font-mono text-sm text-highlighted">
                  {{ voucher.voucher_number }}
                </p>
              </div>
              <UButton
                icon="i-lucide-copy"
                color="neutral"
                variant="subtle"
                size="xs"
                @click="copyToClipboard(voucher.voucher_number, 'Número de vale')"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p class="text-xs uppercase text-muted">
              Monto del vale
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(voucher.amount) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Quincenas
            </p>
            <p class="font-semibold text-highlighted">
              {{ voucher.payments_made }} / {{ voucher.total_fortnights }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Pago por quincena
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(voucher.fortnightly_payment_amount) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Saldo actual
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(voucher.current_balance) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Deuda total
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(voucher.total_debt_amount) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Recargo por atraso
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(voucher.late_fee_amount_snapshot) }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 rounded-lg border border-default p-4 sm:grid-cols-4">
          <div>
            <p class="text-xs uppercase text-muted">
              Emitido
            </p>
            <p class="text-sm font-medium text-highlighted">
              {{ fmtDateTime(voucher.issued_at) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Entregado
            </p>
            <p class="text-sm font-medium text-highlighted">
              {{ fmtDateTime(voucher.transferred_at) }}
            </p>
          </div>
          <div v-if="voucher.status === 'APROBADO'">
            <p class="text-xs uppercase text-muted">
              Vence
            </p>
            <p class="text-sm font-medium text-highlighted" :class="{ 'text-error': voucher.is_expired }">
              {{ fmtDate(voucher.expiration_date) }}
            </p>
          </div>
          <div v-else>
            <p class="text-xs uppercase text-muted">
              Fecha límite de pago
            </p>
            <p class="text-sm font-medium text-highlighted">
              {{ fmtDate(voucher.payment_due_date) }}
            </p>
          </div>
        </div>

        <div v-if="voucher.notes" class="rounded-lg border border-default p-4">
          <p class="mb-1 text-xs uppercase text-muted">
            Notas
          </p>
          <p class="text-sm text-toned">
            {{ voucher.notes }}
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>
