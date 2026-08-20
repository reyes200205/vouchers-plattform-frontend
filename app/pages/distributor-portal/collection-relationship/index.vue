<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: false
})

const loading = ref(false)

// Simulación de datos para la relación de cobro
// (Posteriormente puedes sustituirlo por una llamada a tu API o composable)
const cobros = ref([
  {
    id: 1,
    cliente: 'Alicia Blanco Alvarez',
    folioVale: 'V-001024',
    numQuincena: '3/8',
    montoQuincenal: 184,
    estado: 'PENDIENTE'
  },
  {
    id: 2,
    cliente: 'Carlos Mendoza Ramos',
    folioVale: 'V-000980',
    numQuincena: '5/10',
    montoQuincenal: 250,
    estado: 'PAGADO'
  },
  {
    id: 3,
    cliente: 'Sofía Torres Morales',
    folioVale: 'V-001102',
    numQuincena: '1/8',
    montoQuincenal: 310,
    estado: 'PENDIENTE'
  }
])

const totalAProcesar = computed(() => {
  return cobros.value.reduce((acc, c) => acc + c.montoQuincenal, 0)
})

const totalCobrado = computed(() => {
  return cobros.value
    .filter(c => c.estado === 'PAGADO')
    .reduce((acc, c) => acc + c.montoQuincenal, 0)
})

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
        <h1 class="nav-title">Relación de Cobro</h1>
      </header>

      <div class="content-body">

        <!-- RESUMEN DE COBRO -->
        <div class="summary-card">
          <div class="summary-item">
            <span class="summary-label">Total esperado</span>
            <span class="summary-amount">${{ totalAProcesar.toLocaleString('es-MX') }}</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-item">
            <span class="summary-label">Cobrado</span>
            <span class="summary-amount success">${{ totalCobrado.toLocaleString('es-MX') }}</span>
          </div>
        </div>

        <!-- LISTA DE COBROS -->
        <section class="cobros-section">
          <label class="section-label">Cobros de la quincena</label>

          <div v-if="loading" class="state-text">
            Cargando relación...
          </div>

          <div v-else-if="cobros.length === 0" class="state-text">
            No hay cobros registrados para esta quincena.
          </div>

          <div v-else class="cobro-list">
            <div v-for="item in cobros" :key="item.id" class="cobro-item">
              <div class="cobro-info">
                <h3 class="cliente-nombre">{{ item.cliente }}</h3>
                <p class="cobro-detail">
                  Folio: {{ item.folioVale }} · Quincena {{ item.numQuincena }}
                </p>
              </div>
              <div class="cobro-monto-col">
                <span class="monto">${{ item.montoQuincenal.toLocaleString('es-MX') }}</span>
                <span 
                  class="badge-status" 
                  :class="item.estado.toLowerCase()"
                >
                  {{ item.estado === 'PAGADO' ? 'Cobrado' : 'Pendiente' }}
                </span>
              </div>
            </div>
          </div>
        </section>

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
  gap: 20px;
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
  background-color: #fef3c7;
  color: #d97706;
}

.badge-status.pagado {
  background-color: #dcfce7;
  color: #15803d;
}

.state-text {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin-top: 20px;
}
</style>