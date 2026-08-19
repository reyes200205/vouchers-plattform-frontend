<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVouchers, type Voucher } from '~/composables/useVouchers'
import { customerFullName } from '~/composables/useCustomers'

definePageMeta({
  layout: false
})

const { user, logout } = useAuth()
const { listMyVouchers } = useVouchers()

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const vouchers = ref<Voucher[]>([])

const statusLabels: Record<string, string> = {
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
    const result = await listMyVouchers({ per_page: 20 })
    vouchers.value = result.data
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
  <main class="home-shell">
    <div class="home-wrapper">
      <!-- NAVBAR AZUL -->
      <header class="top-navbar">
        <h1 class="nav-title">
          Hola, {{ distributorName }}
        </h1>
        <button class="logout-btn" @click="cerrarSesion">
          Salir
        </button>
      </header>

      <div class="content-body">
        <!-- TARJETA DE CRÉDITO -->
        <div class="credit-card">
          <div class="credit-row">
            <span class="credit-label">Crédito disponible</span>
            <span class="credit-value">
              {{ unlimitedCredit ? 'Ilimitado' : `$${availableCredit.toLocaleString('es-MX')}` }}
            </span>
          </div>
          <div class="credit-footer">
            <span>{{ categoryName }}</span>
            <span>{{ currentPoints.toLocaleString('es-MX') }} pts</span>
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
          <p v-else-if="vouchers.length === 0" class="state-text">
            Todavía no tienes vales emitidos.
          </p>

          <div v-else class="voucher-list">
            <div v-for="voucher in vouchers" :key="voucher.id" class="voucher-item">
              <div class="voucher-avatar">
                👤
              </div>
              <div class="voucher-info">
                <h3 class="voucher-name">
                  {{ customerFullName(voucher.customer?.person) }}
                </h3>
                <p class="voucher-detail">
                  ${{ Number(voucher.amount).toLocaleString('es-MX') }} · {{ voucher.total_fortnights }} quincenas
                </p>
              </div>
              <span class="status-badge" :class="voucher.status?.toLowerCase()">
                {{ statusLabels[voucher.status ?? ''] ?? voucher.status }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-shell {
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

.home-wrapper {
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
  justify-content: space-between;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0;
}

.logout-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #ffffff;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* TARJETA DE CRÉDITO */
.credit-card {
  background: linear-gradient(135deg, #002366, #1e3a8a);
  border-radius: 16px;
  padding: 18px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.credit-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.credit-label {
  font-size: 12px;
  opacity: 0.8;
}

.credit-value {
  font-size: 26px;
  font-weight: 800;
}

.credit-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0.9;
}

/* ACCIONES */
.actions-row {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 10px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
}

.action-btn.primary {
  background-color: #002366;
  color: #ffffff;
  border-color: #002366;
}

.action-icon {
  font-size: 20px;
}

/* VALES */
.vouchers-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-label {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  padding: 20px 0;
}

.state-text.error {
  color: #dc2626;
}

.voucher-list {
  display: flex;
  flex-direction: column;
}

.voucher-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.voucher-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #002366;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
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
}

.voucher-detail {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #64748b;
}

.status-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 999px;
  white-space: nowrap;
  background-color: #f1f5f9;
  color: #475569;
}

.status-badge.activo,
.status-badge.pagado,
.status-badge.liquidado,
.status-badge.aprobado {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.moroso,
.status-badge.reclamado,
.status-badge.cancelado {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-badge.borrador,
.status-badge.transferido,
.status-badge.pago_parcial {
  background-color: #fef3c7;
  color: #92400e;
}
</style>
