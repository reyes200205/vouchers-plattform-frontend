<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDistributorRelations } from '~/composables/useDistributorRelations'
import { customerFullName } from '~/composables/useCustomers'
import type { CutoffRelation, CutoffRelationItem, CutoffRelationStatus } from '~/types'

definePageMeta({
  layout: false
})

const { listMyRelations } = useDistributorRelations()

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const relations = ref<CutoffRelation[]>([])
const selectedRelationId = ref<number | null>(null)

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const statusLabels: Record<CutoffRelationStatus, string> = {
  GENERADA: 'Pendiente',
  PAGADA: 'Pagada',
  PARCIAL: 'Pago parcial',
  VENCIDA: 'Vencida',
  CERRADA: 'Cerrada'
}

async function loadRelations() {
  loading.value = true
  errorMessage.value = null

  try {
    const result = await listMyRelations({ per_page: 20 })
    relations.value = result.data

    // Por default se muestra la más reciente que todavía no esté cerrada (la
    // que le corresponde revisar ahora); si todas están cerradas, la más
    // reciente de todas.
    const active = relations.value.find(r => r.status !== 'CERRADA')
    selectedRelationId.value = (active ?? relations.value[0])?.id ?? null
  } catch (e) {
    console.error(e)
    errorMessage.value = 'No se pudo cargar tu estado de cuenta.'
  } finally {
    loading.value = false
  }
}

onMounted(loadRelations)

const selectedRelation = computed(() =>
  relations.value.find(r => r.id === selectedRelationId.value) ?? null
)

const cobros = computed(() => selectedRelation.value?.items ?? [])

const totalEsperado = computed(() => Number(selectedRelation.value?.total_payment ?? 0))
const totalARemitir = computed(() => Number(selectedRelation.value?.total_amount_due ?? 0))

function itemClientName(item: CutoffRelationItem): string {
  return item.customer?.person ? customerFullName(item.customer.person) : `Cliente #${item.customer_id}`
}

// Un item con origin_relation_id viene arrastrado de una relación anterior
// que no se pagó a tiempo (la deuda vieja); uno sin origin es la quincena
// normal que le tocaba a este periodo. Antes no había forma de distinguirlos
// en la lista — se veían igual aunque fueran conceptos distintos.
function isCarryover(item: CutoffRelationItem): boolean {
  return item.origin_relation_id !== null
}

const dateFormatter = new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short' })
const dateFormatterFull = new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })

function fmtShortDate(value: string | null | undefined): string {
  if (!value) return '—'
  return dateFormatter.format(new Date(`${value}T00:00:00`))
}

function fmtFullDate(value: string | null | undefined): string {
  if (!value) return '—'
  return dateFormatterFull.format(new Date(`${value}T00:00:00`))
}

// Con qué fecha se distingue cada relación en el selector: el periodo que
// cubre (early_payment_start_date - early_payment_end_date), no solo el
// número de relación — dos relaciones consecutivas pueden verse casi
// idénticas si no se ve a qué quincena corresponde cada una.
function relationPeriodLabel(relation: CutoffRelation): string {
  return `${fmtShortDate(relation.early_payment_start_date)} – ${fmtShortDate(relation.early_payment_end_date)}`
}

const volver = () => {
  navigateTo('/distributor-portal')
}
</script>

<template>
  <main class="relacion-shell">
    <div class="relacion-wrapper">

      <!-- NAVBAR AZUL -->
      <header class="top-navbar">
        <button type="button" class="back-btn" @click="volver">←</button>
        <h1 class="nav-title">Estado de cuenta</h1>
      </header>

      <div class="content-body">

        <p v-if="loading" class="state-text">
          Cargando…
        </p>

        <p v-else-if="errorMessage" class="state-text error">
          {{ errorMessage }}
        </p>

        <p v-else-if="relations.length === 0" class="state-text">
          Todavía no tienes relaciones de cobro generadas.
        </p>

        <template v-else>
          <!-- SELECTOR DE RELACIÓN (si hay más de una) -->
          <select
            v-if="relations.length > 1"
            v-model.number="selectedRelationId"
            class="relation-select"
          >
            <option v-for="r in relations" :key="r.id" :value="r.id">
              {{ relationPeriodLabel(r) }} · {{ r.relation_number }} · {{ statusLabels[r.status ?? 'GENERADA'] }}
            </option>
          </select>

          <template v-if="selectedRelation">
            <!-- RESUMEN DE COBRO -->
            <div class="summary-card">
              <div class="summary-item">
                <span class="summary-label">Quincenas del periodo</span>
                <span class="summary-amount">${{ totalEsperado.toLocaleString('es-MX') }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-item">
                <span class="summary-label">Total a remitir</span>
                <span class="summary-amount success">${{ totalARemitir.toLocaleString('es-MX') }}</span>
              </div>
            </div>

            <p class="period-line">
              Periodo: <strong>{{ relationPeriodLabel(selectedRelation) }}</strong>
              · Vence: <strong>{{ fmtFullDate(selectedRelation.payment_due_date) }}</strong>
            </p>

            <p class="ref-line">
              Referencia: <strong>{{ selectedRelation.payment_reference ?? '—' }}</strong>
              <span class="status-chip" :class="(selectedRelation.status ?? 'GENERADA').toLowerCase()">
                {{ statusLabels[selectedRelation.status ?? 'GENERADA'] }}
              </span>
            </p>

            <!-- LISTA DE COBROS -->
            <section class="cobros-section">
              <label class="section-label">Vales incluidos</label>

              <div v-if="cobros.length === 0" class="state-text">
                Esta relación no incluye vales (solo saldo arrastrado).
              </div>

              <div v-else class="cobro-list">
                <div v-for="item in cobros" :key="item.id" class="cobro-item">
                  <div class="cobro-info">
                    <span v-if="isCarryover(item)" class="origin-tag origin-tag--carryover">
                      ⤷ Arrastre de corte anterior
                    </span>
                    <span v-else class="origin-tag origin-tag--normal">
                      Quincena de este periodo
                    </span>
                    <h3 class="cliente-nombre">{{ itemClientName(item) }}</h3>
                    <p class="cobro-detail">
                      {{ item.product_name_snapshot ?? `Vale #${item.voucher_id}` }} · Quincena {{ item.installment_number ?? '—' }}/{{ item.total_payments }}
                    </p>
                  </div>
                  <div class="cobro-monto-col">
                    <span class="monto">${{ Number(item.payment_amount).toLocaleString('es-MX') }}</span>
                    <span
                      class="badge-status"
                      :class="item.is_late_payment ? 'vencida' : 'pendiente'"
                    >
                      {{ item.is_late_payment ? 'Atrasado' : 'A tiempo' }}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </template>
        </template>

      </div>
    </div>
  </main>
</template>

<style scoped>
.relacion-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f8fafc;
  overflow-y: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.relacion-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.top-navbar {
  background-color: #002366;
  color: #ffffff;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin-right: 16px;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.relation-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  background-color: #ffffff;
}

/* TARJETA DE RESUMEN */
.summary-card {
  display: flex;
  background-color: #002366;
  color: #ffffff;
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-around;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-label {
  font-size: 12px;
  opacity: 0.8;
}

.summary-amount {
  font-size: 20px;
  font-weight: 800;
  margin-top: 4px;
}

.summary-amount.success {
  color: #a3e635;
}

.summary-divider {
  width: 1px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.2);
}

.period-line {
  font-size: 12px;
  color: #1e293b;
}

.period-line strong {
  color: #002366;
}

.ref-line {
  font-size: 12px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.status-chip {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  background-color: #f1f5f9;
  color: #475569;
}

.status-chip.pagada {
  background-color: #dcfce7;
  color: #15803d;
}

.status-chip.parcial {
  background-color: #fef3c7;
  color: #d97706;
}

.status-chip.vencida {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-chip.generada {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.status-chip.cerrada {
  background-color: #e2e8f0;
  color: #475569;
}

/* LISTA */
.section-label {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  display: block;
}

.cobro-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cobro-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
}

.origin-tag {
  display: inline-block;
  margin-bottom: 3px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.origin-tag--carryover {
  color: #b45309;
}

.origin-tag--normal {
  color: #64748b;
}

.cliente-nombre {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.cobro-detail {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #64748b;
}

.cobro-monto-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.monto {
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
}

.badge-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.badge-status.pendiente {
  background-color: #dcfce7;
  color: #15803d;
}

.badge-status.vencida {
  background-color: #fee2e2;
  color: #991b1b;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin-top: 20px;
}

.state-text.error {
  color: #dc2626;
}
</style>
