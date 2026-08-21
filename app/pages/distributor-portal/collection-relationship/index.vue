<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  layout: 'distributor-portal'
})

const { user } = useAuth()

const availableCredit = computed(() => Number(user.value?.distributor?.available_credit ?? 0))
</script>

<template>
  <div class="estado-cuenta-container">
    <header class="top-navbar">
      <h1 class="nav-title">Estado de Cuenta</h1>
    </header>

    <div class="content-body">
      <!-- TARJETA RESUMEN DE SALDO -->
      <div class="balance-card">
        <span class="balance-label">Saldo a pagar de la quincena</span>
        <h2 class="balance-amount">$0.00</h2>
        <p class="balance-date">Fecha límite de pago: 15 de Agosto</p>
      </div>

      <!-- BOTÓN PARA VER RELACIÓN DE COBRO -->
      <div class="action-card" @click="navigateTo('/distributor-portal/collection-relationship')">
        <div class="card-left">
          <span class="card-icon">📄</span>
          <div>
            <h3 class="card-title">Ver Estado de Cuenta / Relación</h3>
            <p class="card-subtitle">Consulta el desglose de cobros detallado</p>
          </div>
        </div>
        <span class="chevron">❯</span>
      </div>

      <!-- DETALLES ADICIONALES -->
      <div class="info-section">
        <h4 class="section-title">Resumen de crédito</h4>
        <div class="info-row">
          <span>Crédito disponible</span>
          <strong>${{ availableCredit.toLocaleString('es-MX') }}</strong>
        </div>
        <div class="info-row">
          <span>Estatus de cuenta</span>
          <span class="status-pill active">Al corriente</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.estado-cuenta-container {
  display: flex;
  flex-direction: column;
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

.balance-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
}

.balance-label {
  font-size: 13px;
  color: #64748b;
}

.balance-amount {
  font-size: 32px;
  font-weight: 800;
  color: #002366;
  margin: 8px 0 4px 0;
}

.balance-date {
  font-size: 12px;
  color: #059669;
  font-weight: 600;
  margin: 0;
}

.action-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f0f6ff;
  border: 1px solid #bfdbfe;
  border-radius: 16px;
  cursor: pointer;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  font-size: 24px;
}

.card-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #002366;
}

.card-subtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #475569;
}

.chevron {
  font-size: 16px;
  color: #002366;
  font-weight: bold;
}

.info-section {
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 16px;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px solid #f8fafc;
}

.status-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
}

.status-pill.active {
  background-color: #dcfce7;
  color: #15803d;
}
</style>