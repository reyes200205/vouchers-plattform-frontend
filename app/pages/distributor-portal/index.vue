<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVouchers } from '~/composables/useVouchers'
import { customerFullName } from '~/composables/useCustomers'

definePageMeta({
  layout: 'distributor-portal'
})

const { user, logout } = useAuth()
const { listMyVouchers, listMyVoucherRequests } = useVouchers()

const loading = ref(true)
const errorMessage = ref<string | null>(null)

interface VoucherRow {
  key: string
  customerName: string
  amount: number
  status: string
  createdAt: string | null
}

const rows = ref<VoucherRow[]>([])

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

async function loadVouchers() {
  loading.value = true
  errorMessage.value = null

  try {
    const [vouchersResult, requestsResult] = await Promise.all([
      listMyVouchers({ per_page: 20 }),
      listMyVoucherRequests({ per_page: 20 })
    ])

    const voucherRows: VoucherRow[] = vouchersResult.data.map(v => ({
      key: `voucher-${v.id}`,
      customerName: customerFullName(v.customer?.person),
      amount: Number(v.amount),
      status: v.status ?? 'BORRADOR',
      createdAt: v.created_at
    }))

    const requestRows: VoucherRow[] = requestsResult.data
      .filter(r => r.status === 'PENDIENTE' || r.status === 'RECHAZADO')
      .map(r => ({
        key: `request-${r.id}`,
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
    errorMessage.value = 'No se pudieron cargar tus vales.'
  } finally {
    loading.value = false
  }
}

onMounted(loadVouchers)

const distributorName = computed(() => {
  const person = user.value?.person
  if (!person) return user.value?.username ?? 'Distribuidora'
  return [person.first_name, person.last_name].filter(Boolean).join(' ')
})

const availableCredit = computed(() => Number(user.value?.distributor?.available_credit ?? 0))
const unlimitedCredit = computed(() => Boolean(user.value?.distributor?.unlimited_credit))
const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0))
const categoryName = computed(() => user.value?.distributor?.category?.name ?? 'Sin categoría')

const cerrarSesion = async () => {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="home-container">
    <!-- NAVBAR AZUL CON DETALLES LUMINOSOS -->
    <header class="top-navbar">
      <div class="user-greeting">
        <span class="welcome-tag">BIENVENIDO DE NUEVO</span>
        <h1 class="nav-title">
          Hola, {{ distributorName }}
        </h1>
      </div>
      <button class="logout-btn" @click="cerrarSesion">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line
          x1="21"
          y1="12"
          x2="9"
          y2="12"
        /></svg>
        Salir
      </button>
    </header>

    <div class="content-body">
      <!-- TARJETA DE CRÉDITO PRINCIPAL -->
      <div class="credit-card">
        <div class="card-glass-glow" />
        <div class="credit-header">
          <span class="credit-label">CRÉDITO DISPONIBLE</span>
          <span class="badge-category">{{ categoryName }}</span>
        </div>

        <div class="credit-value">
          {{ unlimitedCredit ? 'Ilimitado' : `$${availableCredit.toLocaleString('es-MX')}` }}
        </div>

        <div class="credit-footer">
          <div class="points-pill">
            <span class="star-icon">⭐</span>
            <span><strong>{{ currentPoints.toLocaleString('es-MX') }}</strong> Puntos acumulados</span>
          </div>
        </div>
      </div>

      <!-- ACCIONES PRINCIPALES -->
      <div class="actions-row">
        <button class="action-btn primary" @click="navigateTo('/distributor-portal/vales')">
          <div class="action-icon-wrapper">
            <span>➕</span>
          </div>
          <span class="action-text">Nuevo vale</span>
        </button>
      </div>

      <!-- LISTA DE VALES -->
      <section class="vouchers-section">
        <div class="section-header">
          <h2 class="section-label">
            Mis Vales Emitidos
          </h2>
          <span v-if="!loading && rows.length" class="counter-badge">{{ rows.length }}</span>
        </div>

        <p v-if="loading" class="state-text">
          <span class="spinner" /> Cargando vales…
        </p>
        <p v-else-if="errorMessage" class="state-text error">
          {{ errorMessage }}
        </p>
        <div v-else-if="rows.length === 0" class="empty-state">
          <span class="empty-icon">📄</span>
          <p>Todavía no tienes vales emitidos.</p>
        </div>

        <div v-else class="voucher-list">
          <div v-for="row in rows" :key="row.key" class="voucher-card">
            <div class="voucher-avatar">
              👤
            </div>
            <div class="voucher-info">
              <h3 class="voucher-name">
                {{ row.customerName }}
              </h3>
              <p class="voucher-amount">
                ${{ row.amount.toLocaleString('es-MX') }} <span class="currency">MXN</span>
              </p>
            </div>
            <span class="status-badge" :class="row.status.toLowerCase()">
              {{ statusLabels[row.status] ?? row.status }}
            </span>
          </div>
        </div>

        <!-- ACCIONES -->
        <div class="actions-row">
          <button class="action-btn primary" @click="navigateTo('/distributor-portal/vales')">
            <span class="action-icon">➕</span>
            Nuevo vale
          </button>
          <button class="action-btn" @click="navigateTo('/distributor-portal/clientes')">
            <span class="action-icon">👤</span>
            Nuevo cliente
          </button>
          <button class="action-btn" @click="navigateTo('/distributor-portal/collection-relationship')">
            <span class="action-icon">📄</span>
            Estado de cuenta
          </button>
        </div>

        <!-- LISTA DE VALES -->
        <section class="vouchers-section">
          <label class="section-label">Mis vales</label>

          <p v-if="loading" class="state-text">
            Cargando…
          </p>
          <p v-else-if="errorMessage" class="state-text error">
            {{ errorMessage }}
          </p>
          <p v-else-if="rows.length === 0" class="state-text">
            Todavía no tienes vales emitidos.
          </p>

          <div v-else class="voucher-list">
            <div v-for="row in rows" :key="row.key" class="voucher-item">
              <div class="voucher-avatar">
                👤
              </div>
              <div class="voucher-info">
                <h3 class="voucher-name">
                  {{ row.customerName }}
                </h3>
                <p class="voucher-detail">
                  ${{ row.amount.toLocaleString('es-MX') }}
                </p>
              </div>
              <span class="status-badge" :class="row.status.toLowerCase()">
                {{ statusLabels[row.status] ?? row.status }}
              </span>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f1f5f9;
  min-height: 100vh;
}

/* NAVBAR AZUL NOCTURNO CON ACENTOS VERDES */
.top-navbar {
  background: linear-gradient(135deg, #021536 0%, #002366 100%);
  color: #ffffff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 4px 20px rgba(0, 35, 102, 0.15);
}

.user-greeting {
  display: flex;
  flex-direction: column;
}

.welcome-tag {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #84cc16; /* Verde Lima */
  margin-bottom: 2px;
}

.nav-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.logout-btn:active {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
}

/* CONTENIDO Y TARJETAS */
.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 80px; /* Margen para librar el menú inferior */
}

/* TARJETA DE CRÉDITO LUMINOSA */
.credit-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #002366 0%, #0f3885 50%, #021536 100%);
  border-radius: 20px;
  padding: 22px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 35, 102, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-glass-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 130px;
  height: 130px;
  background: radial-gradient(circle, rgba(132, 204, 22, 0.35) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.credit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.credit-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #93c5fd;
}

.badge-category {
  background-color: rgba(132, 204, 22, 0.2);
  color: #bef264;
  border: 1px solid rgba(132, 204, 22, 0.4);
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}

.credit-value {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #ffffff;
  margin: 4px 0;
}

.credit-footer {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 12px;
}

.points-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #e2e8f0;
}

.star-icon {
  font-size: 14px;
}

/* ACCIONES (BOTÓN VERDE DESTACADO) */
.actions-row {
  display: flex;
  gap: 12px;
}

.action-btn.primary {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
  color: #021536;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(132, 204, 22, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.action-btn.primary:active {
  transform: scale(0.98);
  box-shadow: 0 4px 10px rgba(132, 204, 22, 0.2);
}

.action-icon-wrapper {
  background-color: rgba(2, 21, 54, 0.15);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* SECCIÓN DE VALES Y TARJETAS */
.vouchers-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-label {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.counter-badge {
  background-color: #e2e8f0;
  color: #334155;
  font-size: 12px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 12px;
}

.voucher-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.voucher-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  transition: transform 0.15s ease;
}

.voucher-card:active {
  transform: scale(0.99);
}

.voucher-avatar {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background-color: #eff6ff;
  color: #002366;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
  border: 1px solid #dbeafe;
}

.voucher-info {
  flex: 1;
  min-width: 0;
}

.voucher-name {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.voucher-amount {
  margin: 2px 0 0 0;
  font-size: 15px;
  font-weight: 800;
  color: #002366;
}

.currency {
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
}

/* BADGES DE ESTADO CON ESTILOS MEJORADOS */
.status-badge {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 6px 10px;
  border-radius: 8px;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.status-badge.activo,
.status-badge.pagado,
.status-badge.liquidado,
.status-badge.aprobado {
  background-color: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.status-badge.moroso,
.status-badge.reclamado,
.status-badge.cancelado,
.status-badge.rechazado {
  background-color: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.status-badge.borrador,
.status-badge.transferido,
.status-badge.pago_parcial,
.status-badge.pendiente {
  background-color: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
}

/* ESTADOS DE CARGA Y VACÍO */
.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.state-text.error {
  color: #dc2626;
}

.empty-state {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.empty-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}
</style>
