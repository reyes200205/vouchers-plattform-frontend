<script setup lang="ts">
import { customerFullName } from '~/composables/useCustomers'
import type { CutoffRelation, CutoffRelationStatus } from '~/types'

const props = defineProps<{
  relation: CutoffRelation | null
}>()

const open = defineModel<boolean>('open', { default: false })

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function fmtMoney(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '—'
  return money.format(Number(value))
}

// payment_due_date llega como fecha pura "YYYY-MM-DD" (sin hora), no como
// timestamp. new Date('2026-10-30') la interpreta como medianoche UTC, y
// toLocaleDateString la vuelve a mostrar en la hora LOCAL del navegador —
// en México (UTC-6/-7) eso cae el día anterior a las 6pm, mostrando "29 oct"
// en vez de "30 oct". Por eso aquí se arma la fecha con año/mes/día locales
// en vez de dejar que Date la interprete como UTC.
function fmtDate(value: string | null | undefined): string {
  if (!value) return '—'
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusColors: Record<CutoffRelationStatus, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  GENERADA: 'info',
  PAGADA: 'success',
  PARCIAL: 'warning',
  VENCIDA: 'error',
  CERRADA: 'neutral'
}

function statusColor(status: CutoffRelationStatus | null | undefined) {
  return status ? (statusColors[status] ?? 'neutral') : 'neutral'
}

// Un item con origin_relation_id es deuda arrastrada de una relación
// anterior sin pagar; sin origin es la quincena normal que le tocaba a este
// periodo. Antes se veían igual en la tabla, sin forma de distinguir cuál
// es cuál.
function isCarryover(item: { origin_relation_id: number | null }): boolean {
  return item.origin_relation_id !== null
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="relation ? `Relación ${relation.relation_number}` : 'Relación'"
    :description="relation?.distributor?.person ? customerFullName(relation.distributor.person) : undefined"
    :ui="{ content: 'max-w-4xl' }"
  >
    <template #body>
      <div v-if="relation" class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-default bg-elevated/50 p-4">
          <div>
            <p class="text-xs uppercase text-muted">
              Distribuidora
            </p>
            <p class="font-semibold text-highlighted">
              {{ relation.distributor?.person ? customerFullName(relation.distributor.person) : `#${relation.distributor_id}` }}
            </p>
            <p class="text-xs text-muted">
              {{ relation.distributor?.distributor_number }}
            </p>
          </div>

          <UBadge
            v-if="relation.status"
            :color="statusColor(relation.status)"
            variant="subtle"
            :label="relation.status"
            size="lg"
          />
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p class="text-xs uppercase text-muted">
              Línea de crédito
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(relation.credit_limit_snapshot) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Disponible
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(relation.available_credit_snapshot) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Puntos
            </p>
            <p class="font-semibold text-highlighted">
              {{ relation.points_snapshot ?? 0 }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Fecha límite de pago
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtDate(relation.payment_due_date) }}
            </p>
          </div>
        </div>

        <div class="rounded-lg border border-default p-4">
          <p class="text-xs uppercase text-muted">
            Referencia de pago
          </p>
          <p class="font-mono text-lg font-semibold text-highlighted">
            {{ relation.payment_reference ?? '—' }}
          </p>
          <p v-if="relation.previous_relation_id" class="mt-1 text-xs text-muted">
            Incluye saldo arrastrado de la relación #{{ relation.previous_relation_id }}
            ({{ fmtMoney(relation.total_carryover_received) }})
          </p>
        </div>

        <div>
          <p class="mb-2 text-sm font-semibold text-highlighted">
            Vales incluidos
          </p>

          <div v-if="!relation.items?.length" class="py-6 text-center text-sm text-muted">
            Este corte no incluye vales para esta relación (solo saldo arrastrado).
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-default text-left text-xs uppercase text-muted">
                  <th class="py-2 pr-3">
                    Concepto
                  </th>
                  <th class="py-2 pr-3">
                    Cliente
                  </th>
                  <th class="py-2 pr-3">
                    Producto
                  </th>
                  <th class="py-2 pr-3">
                    Pago
                  </th>
                  <th class="py-2 pr-3">
                    Comisión
                  </th>
                  <th class="py-2 pr-3">
                    Recargo
                  </th>
                  <th class="py-2 pr-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in relation.items" :key="item.id" class="border-b border-default last:border-0">
                  <td class="py-2 pr-3">
                    <UBadge
                      :color="isCarryover(item) ? 'warning' : 'neutral'"
                      variant="subtle"
                      size="sm"
                      :label="isCarryover(item) ? `Arrastre #${item.origin_relation_id}` : `Quincena ${item.installment_number ?? '—'}`"
                    />
                  </td>
                  <td class="py-2 pr-3">
                    {{ item.customer?.person ? customerFullName(item.customer.person) : `Cliente #${item.customer_id}` }}
                  </td>
                  <td class="py-2 pr-3">
                    <p class="font-medium text-highlighted">
                      {{ item.product_name_snapshot ?? `Vale #${item.voucher_id}` }}
                    </p>
                    <p v-if="item.is_late_payment" class="text-xs text-error">
                      Pago atrasado
                    </p>
                  </td>
                  <td class="py-2 pr-3">
                    {{ fmtMoney(item.payment_amount) }}
                  </td>
                  <td class="py-2 pr-3">
                    {{ fmtMoney(item.commission_amount) }}
                  </td>
                  <td class="py-2 pr-3">
                    {{ fmtMoney(item.late_fee_amount) }}
                  </td>
                  <td class="py-2 pr-3 text-right font-semibold text-highlighted">
                    {{ fmtMoney(item.line_total_amount) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 rounded-lg border border-default bg-elevated/50 p-4 sm:grid-cols-4">
          <div>
            <p class="text-xs uppercase text-muted">
              Total pagos
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(relation.total_payment) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Total comisión
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(relation.total_commission) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Total recargos
            </p>
            <p class="font-semibold text-highlighted">
              {{ fmtMoney(relation.total_late_fees) }}
            </p>
          </div>
          <div>
            <p class="text-xs uppercase text-muted">
              Total a pagar
            </p>
            <p class="text-lg font-bold text-highlighted">
              {{ fmtMoney(relation.total_amount_due) }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
