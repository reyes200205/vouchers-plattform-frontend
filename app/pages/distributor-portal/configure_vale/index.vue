<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: false
})

const route = useRoute()

// Datos del cliente
const cliente = ref({
  nombre: (route.query.nombre as string) || 'Alicia Blanco Alvarez',
  contacto: (route.query.contacto as string) || '680172',
  calificacion: 'Sin Calificaciones'
})

// Estado de configuración del vale
const monto = ref(1000)
const disponible = ref(18000)
const quincenasOpciones = [8, 10, 12, 14, 16]
const quincenasSeleccionadas = ref(8)
const seguroMonto = 18

// Estado del Modal
const showModal = ref(false)

// Incremento / Decremento de monto
const decrementarMonto = () => {
  if (monto.value > 500) {
    monto.value -= 500
  }
}

const incrementarMonto = () => {
  if (monto.value + 500 <= disponible.value) {
    monto.value += 500
  }
}

// Cálculos dinámicos
const totalAPagar = computed(() => {
  const tasaInteres = 0.544
  return Math.round(monto.value * (1 + tasaInteres))
})

const pagoQuincenal = computed(() => {
  return Math.round(totalAPagar.value / quincenasSeleccionadas.value)
})

// Abrir el modal en lugar de navegar
const continuar = () => {
  showModal.value = true
}

const finalizarYVolver = () => {
  showModal.value = false
  navigateTo('/distributor-portal')
}

const volver = () => {
  navigateTo('/distributor-portal/clientes')
}
</script>

<template>
  <main class="config-shell">
    <div class="config-wrapper">

      <!-- NAVBAR AZUL -->
      <header class="top-navbar">
        <button type="button" class="back-btn" @click="volver">←</button>
        <h1 class="nav-title">Configurar vale</h1>
      </header>

      <div class="content-body">

        <!-- TARJETA CLIENTE SELECCIONADO -->
        <div class="client-card" @click="navigateTo('/distributor-portal/vales')">
          <div class="avatar-circle">
            <span class="avatar-icon">👤</span>
          </div>
          <div class="client-info">
            <h3 class="client-name">{{ cliente.nombre }}</h3>
            <p class="client-detail">Contacto: {{ cliente.contacto }}</p>
            <span class="client-tag">({{ cliente.calificacion }})</span>
          </div>
          <span class="chevron-icon">❯</span>
        </div>

        <!-- SECCIÓN MONTO -->
        <section class="monto-section">
          <label class="section-label">Monto del Vale Financiero</label>

          <div class="monto-selector">
            <button
              type="button"
              class="btn-monto btn-minus"
              :disabled="monto <= 500"
              @click="decrementarMonto"
            >
              −
            </button>
            <span class="monto-display">${{ monto.toLocaleString('es-MX') }}</span>
            <button
              type="button"
              class="btn-monto btn-plus"
              :disabled="monto >= disponible"
              @click="incrementarMonto"
            >
              +
            </button>
          </div>

          <div class="disponible-badge">
            Disponible <strong>${{ disponible.toLocaleString('es-MX') }}</strong>
          </div>
        </section>

        <!-- SECCIÓN QUINCENAS -->
        <section class="quincenas-section">
          <label class="section-label">Quincenas a pagar</label>
          <div class="quincenas-grid">
            <button
              v-for="opcion in quincenasOpciones"
              :key="opcion"
              type="button"
              class="quincena-pill"
              :class="{ active: quincenasSeleccionadas === opcion }"
              @click="quincenasSeleccionadas = opcion"
            >
              {{ opcion }}
            </button>
          </div>
        </section>

        <!-- DETALLES DE PAGO -->
        <div class="summary-cards">
          <div class="summary-card">
            <span class="summary-label">Seguro</span>
            <span class="summary-value bold">Básico</span>
          </div>

          <div class="summary-card">
            <div>
              <div class="summary-label">Pago quincenal</div>
              <div class="summary-subtext">Seguro incluido ${{ seguroMonto }}</div>
            </div>
            <span class="summary-value bold">${{ pagoQuincenal.toLocaleString('es-MX') }}</span>
          </div>

          <div class="summary-card">
            <div>
              <div class="summary-label">Total a pagar</div>
              <div class="summary-subtext">Con intereses</div>
            </div>
            <span class="summary-value bold">${{ totalAPagar.toLocaleString('es-MX') }}</span>
          </div>
        </div>

        <!-- BOTÓN CONTINUAR -->
        <button type="button" class="submit-btn" @click.prevent="continuar">
          Continuar
        </button>

      </div>

      <!-- MODAL DE CONFIRMACIÓN -->
      <Transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-card">
            
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
              </div>
            </div>

            <h2 class="modal-title">¡Vale Confirmado!</h2>
            <p class="modal-subtitle">
              El vale para <strong>{{ cliente.nombre }}</strong> por 
              <strong>${{ monto.toLocaleString('es-MX') }}</strong> ha sido expedido con éxito.
            </p>

            <div class="modal-details">
              <div class="modal-row">
                <span>Plazo:</span>
                <strong>{{ quincenasSeleccionadas }} quincenas</strong>
              </div>
              <div class="modal-row">
                <span>Pago quincenal:</span>
                <strong>${{ pagoQuincenal.toLocaleString('es-MX') }}</strong>
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
  cursor: pointer;
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

.client-tag {
  font-size: 11px;
  color: #64748b;
  font-style: italic;
}

.chevron-icon {
  font-size: 16px;
  color: #2563eb;
  font-weight: bold;
}

/* MONTO */
.monto-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.section-label {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}

.monto-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.btn-monto {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-minus {
  background-color: #cbd5e1;
  color: #475569;
}

.btn-plus {
  background-color: #002366;
  color: #ffffff;
}

.btn-monto:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.monto-display {
  font-size: 28px;
  font-weight: 800;
  color: #002366;
}

.disponible-badge {
  background-color: #f0f6ff;
  color: #002366;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 13px;
}

/* QUINCENAS */
.quincenas-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.quincenas-grid {
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

.quincena-pill {
  flex: 1;
  max-width: 56px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #2563eb;
  background-color: #ffffff;
  color: #2563eb;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quincena-pill.active {
  background-color: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
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

.submit-btn:active {
  opacity: 0.9;
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