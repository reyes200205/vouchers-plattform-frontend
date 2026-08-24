<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { PointRedemption } from '~/types'

definePageMeta({
  layout: 'distributor-portal'
})

const { user, fetchMe } = useAuth()
const { redeemPoints, listMyRedemptions } = useDistributorPoints()

const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0))
const distributorId = computed(() => user.value?.distributor?.id ?? null)

const loading = ref(true)
const errorMessage = ref<string | null>(null)
const redemptions = ref<PointRedemption[]>([])

async function loadRedemptions() {
  if (!distributorId.value) return

  loading.value = true
  errorMessage.value = null

  try {
    const result = await listMyRedemptions(distributorId.value)
    redemptions.value = result.data
  } catch (e) {
    console.error(e)
    errorMessage.value = 'No se pudo cargar tu historial de canjes.'
  } finally {
    loading.value = false
  }
}

onMounted(loadRedemptions)

const showRedeemForm = ref(false)
const redeemAmount = ref<number | null>(null)
const submitting = ref(false)
const submitError = ref<string | null>(null)
const showModal = ref(false)
const confirmedRedemption = ref<PointRedemption | null>(null)

const pendingRedemption = computed(() =>
  redemptions.value.find(r => r.status === 'PENDIENTE') ?? null
)

function abrirFormularioCanje() {
  submitError.value = null
  redeemAmount.value = null
  showRedeemForm.value = true
}

async function confirmarCanje() {
  if (!distributorId.value || !redeemAmount.value) return

  submitting.value = true
  submitError.value = null

  try {
    confirmedRedemption.value = await redeemPoints(distributorId.value, redeemAmount.value)
    showRedeemForm.value = false
    showModal.value = true
    await fetchMe()
    await loadRedemptions()
  } catch (e: unknown) {
    console.error(e)
    submitError.value = extractApiErrorMessage(e, 'No se pudo enviar la solicitud de canje.')
  } finally {
    submitting.value = false
  }
}

function cerrarModal() {
  showModal.value = false
}

function statusLabel(status: PointRedemption['status']) {
  return {
    PENDIENTE: 'Esperando pago en sucursal',
    APROBADO: 'Pagado',
    RECHAZADO: 'Rechazado',
    CANCELADO: 'Cancelado'
  }[status]
}
</script>

<template>
  <div class="puntos-container">
    <header class="top-navbar">
      <h1 class="nav-title">
        Mis Puntos
      </h1>
    </header>

    <div class="content-body">
      <!-- TARJETA PUNTOS -->
      <div class="points-card">
        <div class="points-header">
          <span class="star-icon">⭐</span>
          <span class="points-label">Puntos Acumulados</span>
        </div>
        <h2 class="points-amount">
          {{ currentPoints.toLocaleString('es-MX') }}
        </h2>
        <p class="points-sub">
          Sigue emitiendo vales al corriente para acumular más puntos.
        </p>
        <button
          type="button"
          class="redeem-btn"
          :disabled="currentPoints <= 0 || !!pendingRedemption"
          @click="abrirFormularioCanje"
        >
          Canjear puntos
        </button>
        <p v-if="pendingRedemption" class="pending-hint">
          Ya tienes un canje pendiente — muéstrale el folio <strong>{{ pendingRedemption.folio }}</strong> a la cajera de tu sucursal.
        </p>
      </div>

      <!-- FORMULARIO DE CANJE -->
      <section v-if="showRedeemForm" class="redeem-form">
        <label class="section-title" for="redeem-amount">¿Cuántos puntos quieres canjear?</label>
        <input
          id="redeem-amount"
          v-model.number="redeemAmount"
          type="number"
          min="1"
          :max="currentPoints"
          class="redeem-input"
          placeholder="Ej. 200"
        >
        <p v-if="submitError" class="state-text error">
          {{ submitError }}
        </p>
        <button
          type="button"
          class="submit-btn"
          :disabled="!redeemAmount || redeemAmount <= 0 || redeemAmount > currentPoints || submitting"
          @click="confirmarCanje"
        >
          {{ submitting ? 'Enviando…' : 'Confirmar canje' }}
        </button>
      </section>

      <!-- HISTORIAL -->
      <section class="benefits-section">
        <h3 class="section-title">
          Historial de canjes
        </h3>

        <p v-if="loading" class="state-text">
          Cargando historial…
        </p>
        <p v-else-if="errorMessage" class="state-text error">
          {{ errorMessage }}
        </p>
        <p v-else-if="redemptions.length === 0" class="state-text">
          Todavía no has solicitado ningún canje.
        </p>

        <div
          v-for="redemption in redemptions"
          v-else
          :key="redemption.id"
          class="benefit-item"
        >
          <span class="benefit-icon">🎟️</span>
          <div>
            <h4 class="benefit-title">
              {{ redemption.points }} puntos · ${{ Number(redemption.amount_mxn).toLocaleString('es-MX') }}
            </h4>
            <p class="benefit-desc">
              {{ statusLabel(redemption.status) }}
              <template v-if="redemption.status === 'PENDIENTE'">
                · Folio: <strong>{{ redemption.folio }}</strong>
              </template>
            </p>
          </div>
        </div>
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
            ¡Folio generado!
          </h2>
          <p class="modal-subtitle">
            Muéstraselo a la cajera de tu sucursal para recibir tu pago de
            <strong>${{ Number(confirmedRedemption?.amount_mxn ?? 0).toLocaleString('es-MX') }}</strong>.
          </p>

          <div v-if="confirmedRedemption" class="modal-details">
            <div class="modal-row folio-row">
              <strong>{{ confirmedRedemption.folio }}</strong>
            </div>
          </div>

          <button type="button" class="modal-btn" @click="cerrarModal">
            Entendido
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.puntos-container {
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
  min-height: 100%;
}

.top-navbar {
  background: linear-gradient(135deg, #0a2472 0%, #001845 100%);
  color: #ffffff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 24px -12px rgba(0, 24, 69, 0.5);
}

.nav-title {
  font-size: clamp(16px, 4.6vw, 19px);
  font-weight: 800;
  margin: 0;
}

.content-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.points-card {
  background: linear-gradient(135deg, #0a2472 0%, #0b347f 55%, #001845 100%);
  color: #ffffff;
  border-radius: 20px;
  padding: 26px 22px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 24px -10px rgba(10, 36, 114, 0.4);
  position: relative;
  overflow: hidden;
}

.points-card::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -40px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(132, 204, 22, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.points-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.star-icon {
  font-size: 20px;
}

.points-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #cbd5e1;
}

.points-amount {
  font-size: clamp(34px, 10vw, 44px);
  font-weight: 800;
  color: #a3e635;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 1;
}

.points-sub {
  font-size: 12px;
  color: #cbd5e1;
  margin: 0 0 16px 0;
  max-width: 260px;
  position: relative;
  z-index: 1;
}

.redeem-btn {
  width: 100%;
  background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
  color: #052e16;
  border: none;
  padding: 14px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(132, 204, 22, 0.3);
  position: relative;
  z-index: 1;
  transition: transform 0.15s ease;
}

.redeem-btn:active:not(:disabled) {
  transform: scale(0.99);
}

.redeem-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.pending-hint {
  margin: 12px 0 0 0;
  font-size: 12px;
  color: #fde68a;
  position: relative;
  z-index: 1;
}

.redeem-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.redeem-input {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.redeem-input:focus {
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
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

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #0a2472 0%, #001845 100%);
  color: #ffffff;
  border: none;
  padding: 14px;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 20px -6px rgba(10, 36, 114, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.benefits-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.benefit-item {
  display: flex;
  gap: 14px;
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background-color: #ffffff;
  align-items: center;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.benefit-icon {
  font-size: 24px;
}

.benefit-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.benefit-desc {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #64748b;
}

/* MODAL Y ANIMACIONES (mismo patrón que configure_vale/index.vue) */
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
  color: #0a2472;
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
}

.modal-row.folio-row {
  justify-content: center;
  font-size: 18px;
  color: #002366;
}

.modal-btn {
  width: 100%;
  background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
  color: #052e16;
  border: none;
  padding: 13px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(132, 204, 22, 0.3);
}

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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
