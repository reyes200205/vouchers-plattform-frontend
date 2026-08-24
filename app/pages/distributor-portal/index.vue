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
const creditLimit = computed(() => Number(user.value?.distributor?.credit_limit ?? 0))
const unlimitedCredit = computed(() => Boolean(user.value?.distributor?.unlimited_credit))
const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0))
const categoryName = computed(() => user.value?.distributor?.category?.name ?? 'Sin categoría')

const dateFormatter = new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short' })
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

const voucherTableRows = computed(() => rows.value.map(row => ({
  id: row.key.startsWith('request-') ? `SOL-${row.key.split('-')[1]}` : `#${row.key.split('-')[1]}`,
  cliente: row.customerName,
  monto: money.format(row.amount),
  estatusLabel: statusLabels[row.status] ?? row.status,
  estatusVariant: statusVariants[row.status] ?? 'warning',
  fecha: row.createdAt ? dateFormatter.format(new Date(row.createdAt)) : '—'
})))

const cerrarSesion = async () => {
  await logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="home-container">
    <DistributorCreditHeader
      :distributor-name="distributorName"
      :available-credit="availableCredit"
      :credit-limit="creditLimit"
      :unlimited-credit="unlimitedCredit"
      :category-name="categoryName"
      :points="currentPoints"
      @logout="cerrarSesion"
    />

    <DistributorQuickActions />

    <div class="content-body">
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

      <DistributorVouchersTable v-else :vouchers="voucherTableRows" />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f1f5f9;
  min-height: 100%;
}

.content-body {
  padding: 4px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #cbd5e1;
  border-top-color: #0a2472;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
