<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useVouchers } from '~/composables/useVouchers'
import { customerFullName } from '~/composables/useCustomers'
import { ChevronLeft, ChevronRight, CircleDollarSign, FileClock, UserRound } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const { listMyVouchers, listMyVoucherRequests } = useVouchers()

const loading = ref(true)
const errorMessage = ref<string | null>(null)

interface HistoryRow {
  key: string
  folio: string
  customerName: string
  amount: number
  status: string
  createdAt: string | null
}

const rows = ref<HistoryRow[]>([])

const statusLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente de aprobación',
  RECHAZADO: 'Rechazado',
  BORRADOR: 'Borrador',
  APROBADO: 'Aprobado',
  TRANSFERIDO: 'Transferido',
  ACTIVO: 'Activo',
  PAGO_PARCIAL: 'Pago parcial',
  PAGADO: 'Pagado',
  LIQUIDADO: 'Liquidado',
  MOROSO: 'Moroso',
  RECLAMADO: 'Reclamado',
  CANCELADO: 'Cancelado',
  REVERSADO: 'Reversado'
}

const statusVariants: Record<string, 'success' | 'warning' | 'danger'> = {
  PENDIENTE: 'warning',
  BORRADOR: 'warning',
  TRANSFERIDO: 'warning',
  PAGO_PARCIAL: 'warning',
  APROBADO: 'success',
  ACTIVO: 'success',
  PAGADO: 'success',
  LIQUIDADO: 'success',
  RECHAZADO: 'danger',
  MOROSO: 'danger',
  RECLAMADO: 'danger',
  CANCELADO: 'danger',
  REVERSADO: 'danger'
}

async function loadHistory() {
  loading.value = true
  errorMessage.value = null

  try {
    const [vouchersResult, requestsResult] = await Promise.all([
      listMyVouchers({ per_page: 100 }),
      listMyVoucherRequests({ per_page: 100 })
    ])

    const voucherRows: HistoryRow[] = vouchersResult.data.map(v => ({
      key: `voucher-${v.id}`,
      folio: v.voucher_number ?? `#${v.id}`,
      customerName: customerFullName(v.customer?.person),
      amount: Number(v.amount),
      status: v.status ?? 'BORRADOR',
      createdAt: v.created_at
    }))

    const requestRows: HistoryRow[] = requestsResult.data.map(r => ({
      key: `request-${r.id}`,
      folio: `SOL-${r.id}`,
      customerName: customerFullName(r.customer?.person),
      amount: Number(r.requested_amount),
      status: r.status,
      createdAt: r.created_at
    }))

    rows.value = [...voucherRows, ...requestRows].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })
  } catch (e) {
    console.error(e)
    errorMessage.value = 'No se pudo cargar tu historial de vales.'
  } finally {
    loading.value = false
  }
}

onMounted(loadHistory)

const searchQuery = ref('')

const filteredRows = computed(() => {
  if (!searchQuery.value.trim()) return rows.value
  const query = searchQuery.value.toLowerCase()
  return rows.value.filter(row =>
    row.customerName.toLowerCase().includes(query) || row.folio.toLowerCase().includes(query)
  )
})

// Paginación en el cliente: ya se trae todo el historial reciente de una vez
// (hasta 100 vales + 100 solicitudes), así que no hace falta pedirle más
// páginas al backend — solo se corta la lista combinada para no aventarle al
// usuario cientos de filas de un jalón si acumula muchos registros.
const PAGE_SIZE = 15
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / PAGE_SIZE)))

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredRows.value.slice(start, start + PAGE_SIZE)
})

watch([searchQuery, rows], () => {
  currentPage.value = 1
})

function goToPage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
const dateFormatter = new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })

function iconFor(row: HistoryRow) {
  if (row.folio.startsWith('SOL')) return UserRound
  return statusVariants[row.status] === 'warning' ? FileClock : CircleDollarSign
}

const volver = () => {
  navigateTo('/distributor-portal')
}
</script>

<template>
  <main class="history-shell">
    <div class="history-wrapper">
      <header class="top-navbar">
        <button class="back-btn" type="button" @click="volver">
          ←
        </button>
        <h1 class="nav-title">
          Mis vales
        </h1>
      </header>

      <div class="content-body">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por cliente o folio"
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>

        <p v-if="loading" class="state-text">
          Cargando historial…
        </p>
        <p v-else-if="errorMessage" class="state-text error">
          {{ errorMessage }}
        </p>
        <p v-else-if="filteredRows.length === 0" class="state-text">
          {{ searchQuery ? 'No hay vales que coincidan con tu búsqueda.' : 'Todavía no has dado ningún vale.' }}
        </p>

        <template v-else>
          <div class="history-list">
            <article
              v-for="row in pagedRows"
              :key="row.key"
              class="history-row"
            >
              <div class="row-icon" :class="statusVariants[row.status] ?? 'warning'">
                <component :is="iconFor(row)" :size="16" />
              </div>

              <div class="row-info">
                <h3 class="cliente">
                  {{ row.customerName }}
                </h3>
                <p class="detail">
                  {{ row.folio }} · {{ statusLabels[row.status] ?? row.status }}
                </p>
              </div>

              <div class="row-monto">
                <span class="amount" :class="statusVariants[row.status] ?? 'warning'">{{ money.format(row.amount) }}</span>
                <span class="fecha">{{ row.createdAt ? dateFormatter.format(new Date(row.createdAt)) : '—' }}</span>
              </div>
            </article>
          </div>

          <div v-if="totalPages > 1" class="pager">
            <button
              type="button"
              class="pager-btn"
              :disabled="currentPage === 1"
              aria-label="Página anterior"
              @click="goToPage(currentPage - 1)"
            >
              <ChevronLeft :size="16" />
            </button>

            <span class="pager-label">Página {{ currentPage }} de {{ totalPages }}</span>

            <button
              type="button"
              class="pager-btn"
              :disabled="currentPage === totalPages"
              aria-label="Página siguiente"
              @click="goToPage(currentPage + 1)"
            >
              <ChevronRight :size="16" />
            </button>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
.history-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: #f1f5f9;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.history-wrapper {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
}

.top-navbar {
  background: linear-gradient(135deg, #0a2472 0%, #001845 100%);
  color: #ffffff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 24px -12px rgba(0, 24, 69, 0.5);
}

.back-btn {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: clamp(16px, 4.6vw, 19px);
  font-weight: 800;
  margin: 0;
}

.content-body {
  padding: 16px 16px calc(20px + env(safe-area-inset-bottom)) 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 13px 44px 13px 18px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 15px;
  color: #1e293b;
  box-sizing: border-box;
  outline: none;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
  transition: border-color 0.15s ease;
}

.search-input:focus {
  border-color: #1d4ed8;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 600;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #64748b;
  pointer-events: none;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  padding: 24px 0;
}

.state-text.error {
  color: #dc2626;
}

.history-list {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.history-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.history-row:last-child {
  border-bottom: none;
}

.row-icon {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row-icon.success { background: #dcfce7; color: #16a34a; }
.row-icon.warning { background: #dbeafe; color: #1d4ed8; }
.row-icon.danger { background: #ffe4e6; color: #e11d48; }

.row-info {
  flex: 1;
  min-width: 0;
}

.cliente {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail {
  margin: 1px 0 0 0;
  font-size: 11.5px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-monto {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  gap: 1px;
}

.amount {
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
}

.amount.success { color: #16a34a; }
.amount.warning { color: #1d4ed8; }
.amount.danger { color: #e11d48; }

.fecha {
  font-size: 10px;
  color: #94a3b8;
}

.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 4px 0 8px;
}

.pager-btn {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
  color: #0a2472;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
  transition: background-color 0.15s ease, opacity 0.15s ease;
}

.pager-btn:active:not(:disabled) {
  background-color: #eff4ff;
}

.pager-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pager-label {
  font-size: 12.5px;
  font-weight: 700;
  color: #334155;
  white-space: nowrap;
}

@media (max-width: 360px) {
  .top-navbar {
    padding: 14px 14px;
  }

  .content-body {
    padding: 12px;
    gap: 12px;
  }
}
</style>
