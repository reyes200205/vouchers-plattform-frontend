<script setup lang="ts">
// Define el layout general si cuentas con uno
definePageMeta({
  layout: 'default'
})

// Datos de prueba para las tarjetas de métricas
const metrics = [
  { title: 'Vales Emitidos', value: '1,284', icon: '🎟️', change: '+12% este mes' },
  { title: 'Monto Total', value: '$450,200', icon: '💰', change: '+8% este mes' },
  { title: 'Distribuidoras', value: '48', icon: '🏢', change: '2 nuevas' },
  { title: 'Solicitudes Pendientes', value: '15', icon: '⏳', change: 'Requieren revisión' }
]

// Datos de prueba para la tabla de actividad
const recentActivities = [
  { id: 'VAL-1092', distribuidora: 'Distribuidora del Norte', monto: '$15,000', estatus: 'Aprobado', fecha: '2026-08-16' },
  { id: 'VAL-1091', distribuidora: 'Comercializadora Laguna', monto: '$8,500', estatus: 'Pendiente', fecha: '2026-08-16' },
  { id: 'VAL-1090', distribuidora: 'Vales Torreón', monto: '$22,000', estatus: 'Aprobado', fecha: '2026-08-15' },
  { id: 'VAL-1089', distribuidora: 'Distribuidora del Norte', monto: '$5,000', estatus: 'Rechazado', fecha: '2026-08-15' }
]
</script>

<template>
  <div class="admin-dashboard">
    <!-- BANNER DE BIENVENIDA -->
    <header class="dashboard-header">
      <div>
        <span class="badge">PANEL ADMINISTRATIVO</span>
        <h1>Bienvenido al Sistema</h1>
        <p>Resumen general y control de la plataforma Mis Vales.</p>
      </div>

      <div class="header-actions">
        <button class="primary-btn" @click="navigateTo('/admin/gerentes-generales')">
          <span>👤</span> Registrar Gerente General
        </button>

        <button class="primary-btn" @click="navigateTo('/admin/vales/nuevo')">
          <span>➕</span> Nuevo Vale
        </button>
      </div>
    </header>

    <!-- METRICAS / KPIS -->
    <section class="metrics-grid">
      <div v-for="(item, index) in metrics" :key="index" class="metric-card">
        <div class="card-header">
          <span class="metric-title">{{ item.title }}</span>
          <span class="metric-icon">{{ item.icon }}</span>
        </div>
        <div class="metric-value">{{ item.value }}</div>
        <div class="metric-change">{{ item.change }}</div>
      </div>
    </section>

    <!-- TABLA DE ACTIVIDAD RECIENTE -->
    <section class="table-container">
      <div class="table-header">
        <h2>Últimos Vales Registrados</h2>
        <NuxtLink to="/admin/vales" class="link-btn">Ver todos →</NuxtLink>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Distribuidora</th>
              <th>Monto</th>
              <th>Estatus</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in recentActivities" :key="row.id">
              <td class="font-bold">{{ row.id }}</td>
              <td>{{ row.distribuidora }}</td>
              <td class="font-bold">{{ row.monto }}</td>
              <td>
                <span
                  class="status-tag"
                  :class="{
                    'status-approved': row.estatus === 'Aprobado',
                    'status-pending': row.estatus === 'Pendiente',
                    'status-rejected': row.estatus === 'Rechazado'
                  }"
                >
                  {{ row.estatus }}
                </span>
              </td>
              <td class="text-subtle">{{ row.fecha }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dashboard-header {
  background: linear-gradient(135deg, #0d2747 0%, #1e3a8a 100%);
  color: #ffffff;
  padding: 28px 32px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px -5px rgba(13, 39, 71, 0.3);
}

.badge {
  background: rgba(255, 255, 255, 0.15);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}

.dashboard-header h1 {
  margin: 8px 0 4px 0;
  font-size: 26px;
  font-weight: 800;
}

.dashboard-header p {
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
}

.primary-btn {
  background: #a3e635;
  color: #0d2747;
  border: none;
  font-weight: 800;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.1s ease;
}

.primary-btn:active {
  transform: scale(0.96);
}

/* Tarjetas */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.metric-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-title {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.metric-icon {
  font-size: 20px;
}

.metric-value {
  font-size: 28px;
  font-weight: 800;
  color: #0d2747;
  margin: 10px 0 4px 0;
}

.metric-change {
  font-size: 12px;
  font-weight: 600;
  color: #16a34a;
}

/* Tabla */
.table-container {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-header h2 {
  font-size: 18px;
  font-weight: 800;
  color: #0d2747;
  margin: 0;
}

.link-btn {
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

th {
  background-color: #f8fafc;
  color: #64748b;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.font-bold {
  font-weight: 700;
  color: #0d2747;
}

.text-subtle {
  color: #94a3b8;
  font-size: 12px;
}

/* Badges de Estado */
.status-tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
}

.status-approved {
  background: #dcfce7;
  color: #166534;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-rejected {
  background: #ffe4e6;
  color: #9f1239;
}

@media (max-width: 640px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>