<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '~/composables/useProducts'
import { useVouchers, type VoucherRequest } from '~/composables/useVouchers'
import type { FinancialProduct } from '~/types'

definePageMeta({
  layout: false
})

const route = useRoute()
const { user, fetchMe } = useAuth()
const { listBranchProducts } = useProducts()
const { preIssueVoucher } = useVouchers()

const customerId = computed(() => {
  const raw = route.query.customerId as string | undefined
  return raw ? Number(raw) : null
})

const cliente = ref({
  nombre: (route.query.nombre as string) || '',
  contacto: (route.query.contacto as string) || ''
})

const availableCredit = computed(() => Number(user.value?.distributor?.available_credit ?? 0))
const unlimitedCredit = computed(() => Boolean(user.value?.distributor?.unlimited_credit))
// Regla del pre-vale: cuando la distribuidora tiene el 100% de su credito
// disponible (o le acaban de aumentar la linea), el primer vale no puede
// superar el 50% del disponible + tolerancia. El backend ya calcula este
// tope (AuthController::attachPreValeMaxAmount) para que aqui solo se
// filtre con el mismo numero, sin reimplementar la regla en el frontend.
const preValeMaxAmount = computed(() => {
  const raw = user.value?.distributor?.pre_vale_max_amount
  return raw === null || raw === undefined ? null : Number(raw)
})

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const products = ref<FinancialProduct[]>([])
const selectedProductId = ref<number | null>(null)

const submitting = ref(false)
const submitError = ref<string | null>(null)
const showModal = ref(false)
const confirmedVoucher = ref<VoucherRequest | null>(null)

async function loadProducts() {
  loading.value = true
  errorMessage.value = null

  const branchId = user.value?.distributor?.branch_id
  if (!branchId) {
    errorMessage.value = 'No se encontró la sucursal de la distribuidora.'
    loading.value = false
    return
  }

  if (!customerId.value) {
    errorMessage.value = 'No se encontró el cliente seleccionado.'
    loading.value = false
    return
  }

  try {
    const distributorCategoryId = user.value?.distributor?.category?.id ?? null
    const result = await listBranchProducts(branchId, { per_page: 50 })
    products.value = result.data.filter(p =>
      p.is_active
      && (unlimitedCredit.value || Number(p.principal_amount) <= availableCredit.value)
      // Un producto con categoria asignada solo lo puede pedir una distribuidora
      // de esa misma categoria (igual que valida el backend en
      // RequestVoucherService::assertProductMatchesCategory). Un producto sin
      // categoria (category_id null) es generico y lo puede pedir cualquiera.
      && (p.category_id === null || p.category_id === distributorCategoryId)
      // Regla del pre-vale: si aplica, solo deben aparecer como elegibles los
      // vales que no la violen (ver RequestVoucherService::execute, que
      // rechaza la solicitud si el monto supera este tope).
      && (preValeMaxAmount.value === null || Number(p.principal_amount) <= preValeMaxAmount.value)
    )
    selectedProductId.value = products.value[0]?.id ?? null
  } catch (e) {
    console.error(e)
    errorMessage.value = 'No se pudieron cargar los productos financieros disponibles.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!customerId.value) {
    navigateTo('/distributor-portal/vales')
    return
  }
  // El usuario guardado en la cookie (comisión de categoría, crédito disponible)
  // puede estar desactualizado si un administrador cambió esos valores después
  // del último login. Se refresca aquí para que la vista previa del cálculo no
  // se quede con datos viejos.
  await fetchMe()
  loadProducts()
})

const selectedProduct = computed(() =>
  products.value.find(p => p.id === selectedProductId.value) ?? null
)

// Replica el calculo del backend (FinancialCalculationService::calculateVoucherSnapshot)
// solo para mostrar una vista previa; el monto final y oficial lo calcula y
// persiste el servidor. La comisión de categoría de la distribuidora (su
// utilidad) NO se resta aquí: el cliente paga la quincena COMPLETA (con esa
// comisión incluida) para que la distribuidora se la gane al cobrarle — solo
// se le descuenta más adelante, a la distribuidora, en el corte de relación
// (GenerateCutoffService), nunca en lo que se le muestra o cobra al cliente.
// El pago quincenal se redondea siempre al piso, al peso entero (nunca a los
// centavos ni al más cercano).
function previewSnapshot(product: FinancialProduct) {
  const principal = Number(product.principal_amount)
  const commission = Math.round(principal * Number(product.company_commission_percentage) / 100 * 100) / 100
  const interestPerFortnight = Math.round(principal * Number(product.fortnightly_interest_percentage) / 100 * 100) / 100
  const interestTotal = Math.round(interestPerFortnight * product.number_of_fortnights * 100) / 100
  const totalDebt = Math.round((principal + commission + Number(product.insurance_amount) + interestTotal) * 100) / 100
  const fortnightlyPayment = Math.floor(totalDebt / product.number_of_fortnights)

  return { totalDebt, fortnightlyPayment }
}

function previewFortnightlyPayment(product: FinancialProduct) {
  return previewSnapshot(product).fortnightlyPayment
}

function previewTotalDebt(product: FinancialProduct) {
  return previewSnapshot(product).totalDebt
}

const continuar = async () => {
  if (!selectedProduct.value || !customerId.value) return

  submitting.value = true
  submitError.value = null

  try {
    confirmedVoucher.value = await preIssueVoucher({
      customer_id: customerId.value,
      financial_product_id: selectedProduct.value.id
    })
    showModal.value = true
  } catch (e: unknown) {
    console.error(e)
    const fetchError = e as { data?: { message?: string } }
    submitError.value = fetchError?.data?.message || 'No se pudo enviar la solicitud de vale.'
  } finally {
    submitting.value = false
  }
}

const finalizarYVolver = () => {
  showModal.value = false
  navigateTo('/distributor-portal')
}

const volver = () => {
  navigateTo('/distributor-portal/vales')
}
</script>

<template>
  <main class="config-shell">
    <div class="config-wrapper">
      <!-- NAVBAR AZUL -->
      <header class="top-navbar">
        <button type="button" class="back-btn" @click="volver">
          ←
        </button>
        <h1 class="nav-title">
          Configurar vale
        </h1>
      </header>

      <div class="content-body">
        <!-- TARJETA CLIENTE SELECCIONADO -->
        <div class="client-card">
          <div class="avatar-circle">
            <span class="avatar-icon">👤</span>
          </div>
          <div class="client-info">
            <h3 class="client-name">
              {{ cliente.nombre }}
            </h3>
            <p class="client-detail">
              Contacto: {{ cliente.contacto || 'Sin teléfono' }}
            </p>
          </div>
        </div>

        <div class="disponible-badge">
          Crédito disponible
          <strong>{{ unlimitedCredit ? 'Ilimitado' : `$${availableCredit.toLocaleString('es-MX')}` }}</strong>
        </div>

        <p v-if="preValeMaxAmount !== null" class="state-text">
          Por ser tu primer vale (o por un aumento de crédito reciente), solo puedes pedir hasta
          <strong>${{ preValeMaxAmount.toLocaleString('es-MX') }}</strong>.
        </p>

        <p v-if="loading" class="state-text">
          Cargando productos disponibles…
        </p>
        <p v-else-if="errorMessage" class="state-text error">
          {{ errorMessage }}
        </p>
        <p v-else-if="products.length === 0" class="state-text">
          No hay productos financieros disponibles para tu crédito actual.
        </p>

        <!-- SELECCIÓN DE PRODUCTO -->
        <section v-else class="product-section">
          <label class="section-label">Elige el vale a expedir</label>

          <div class="product-list">
            <button
              v-for="product in products"
              :key="product.id"
              type="button"
              class="product-card"
              :class="{ active: selectedProductId === product.id }"
              @click="selectedProductId = product.id"
            >
              <div class="product-head">
                <span class="product-name">{{ product.name }}</span>
                <span class="product-amount">${{ Number(product.principal_amount).toLocaleString('es-MX') }}</span>
              </div>
              <div class="product-detail">
                {{ product.number_of_fortnights }} quincenas · Seguro ${{ Number(product.insurance_amount).toLocaleString('es-MX') }}
              </div>
              <div class="product-detail bold">
                Pago quincenal ${{ previewFortnightlyPayment(product).toLocaleString('es-MX') }}
              </div>
            </button>
          </div>

          <!-- DETALLES DE PAGO -->
          <div v-if="selectedProduct" class="summary-cards">
            <div class="summary-card">
              <span class="summary-label">Seguro</span>
              <span class="summary-value bold">${{ Number(selectedProduct.insurance_amount).toLocaleString('es-MX') }}</span>
            </div>

            <div class="summary-card">
              <div>
                <div class="summary-label">
                  Pago quincenal
                </div>
                <div class="summary-subtext">
                  {{ selectedProduct.number_of_fortnights }} quincenas
                </div>
              </div>
              <span class="summary-value bold">${{ previewFortnightlyPayment(selectedProduct).toLocaleString('es-MX') }}</span>
            </div>

            <div class="summary-card">
              <div>
                <div class="summary-label">
                  Total a pagar
                </div>
                <div class="summary-subtext">
                  Con intereses y comisión
                </div>
              </div>
              <span class="summary-value bold">${{ previewTotalDebt(selectedProduct).toLocaleString('es-MX') }}</span>
            </div>
          </div>

          <p v-if="submitError" class="state-text error">
            {{ submitError }}
          </p>

          <!-- BOTÓN CONTINUAR -->
          <button
            type="button"
            class="submit-btn"
            :disabled="!selectedProduct || submitting"
            @click="continuar"
          >
            {{ submitting ? 'Enviando…' : 'Solicitar vale' }}
          </button>
        </section>
      </div>

      <!-- MODAL DE CONFIRMACIÓN -->
      <Transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-card">
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip" />
                <span class="icon-line line-long" />
                <div class="icon-circle" />
              </div>
            </div>

            <h2 class="modal-title">
              ¡Solicitud enviada!
            </h2>
            <p class="modal-subtitle">
              La solicitud de vale para <strong>{{ cliente.nombre }}</strong> por
              <strong>${{ Number(confirmedVoucher?.requested_amount ?? 0).toLocaleString('es-MX') }}</strong>
              quedó registrada y está pendiente de aprobación del coordinador.
            </p>

            <div v-if="confirmedVoucher" class="modal-details">
              <div class="modal-row">
                <span>Plazo:</span>
                <strong>{{ confirmedVoucher.snapshot.total_fortnights }} quincenas</strong>
              </div>
              <div class="modal-row">
                <span>Pago quincenal:</span>
                <strong>${{ confirmedVoucher.snapshot.fortnightly_payment_amount.toLocaleString('es-MX') }}</strong>
              </div>
            </div>

            <button type="button" class="modal-btn" @click="finalizarYVolver">
              Volver al inicio
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<style scoped>
.config-shell {
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

.config-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
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
  gap: 20px;
}

/* CLIENTE SELECCIONADO */
.client-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #ffffff;
}

.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #002366;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 24px;
  color: #ffffff;
}

.client-info {
  flex: 1;
  min-width: 0;
}

.client-name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.client-detail {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #475569;
}

.disponible-badge {
  background-color: #f0f6ff;
  color: #002366;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  text-align: center;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  padding: 12px 0;
}

.state-text.error {
  color: #dc2626;
}

/* PRODUCTOS */
.product-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-label {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-card {
  text-align: left;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-card.active {
  border-color: #4f46e5;
  background-color: #eef2ff;
}

.product-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.product-amount {
  font-size: 16px;
  font-weight: 800;
  color: #002366;
}

.product-detail {
  font-size: 12px;
  color: #64748b;
}

.product-detail.bold {
  font-weight: 700;
  color: #1e293b;
}

/* RESUMEN */
.summary-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-card {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-label {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.summary-subtext {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}

.summary-value {
  font-size: 15px;
  color: #0f172a;
}

.summary-value.bold {
  font-weight: 800;
}

/* BOTÓN PRINCIPAL */
.submit-btn {
  width: 100%;
  background-color: #002366;
  color: #ffffff;
  border: none;
  padding: 14px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* MODAL Y ANIMACIONES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-card {
  background-color: #ffffff;
  border-radius: 24px;
  padding: 28px 20px;
  width: 100%;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-title {
  margin: 16px 0 8px 0;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.modal-subtitle {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #475569;
  line-height: 1.4;
}

.modal-details {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #334155;
}

.modal-btn {
  width: 100%;
  background-color: #84cc16;
  color: #0d2747;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
}

/* ANIMACIÓN CHECKMARK */
.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid #84cc16;
}

.icon-line {
  height: 5px;
  background-color: #84cc16;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

.line-tip {
  top: 44px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
}

.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
}

.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: border-box;
  border: 4px solid rgba(132, 204, 22, 0.2);
}

/* TRANSICIONES */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
