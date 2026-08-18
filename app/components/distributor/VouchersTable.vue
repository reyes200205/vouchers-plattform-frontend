<script setup lang="ts">
export interface Voucher {
  id: string
  cliente: string
  monto: string
  estatus: 'Activo' | 'Surtido' | 'Cancelado'
  fecha: string
}

defineProps<{
  vouchers: Voucher[]
}>()

const emit = defineEmits<{
  (e: 'viewDetail', id: string): void
}>()
</script>

<template>
  <div class="vouchers-container">
    <div class="vouchers-header">
      <div>
        <h3>Vales Recientes</h3>
        <p>Listado de folios activos</p>
      </div>
      <button class="btn-link" @click="navigateTo('/distributor-portal/vales')">
        Ver todos ➔
      </button>
    </div>

    <div class="vouchers-list">
      <article
        v-for="item in vouchers"
        :key="item.id"
        class="voucher-card"
        @click="emit('viewDetail', item.id)"
      >
        <div class="voucher-top">
          <div class="voucher-info">
            <span class="folio">{{ item.id }}</span>
            <h4 class="cliente">{{ item.cliente }}</h4>
          </div>
          <div class="voucher-monto">
            <span class="amount">{{ item.monto }}</span>
            <span class="fecha">{{ item.fecha }}</span>
          </div>
        </div>

        <div class="voucher-bottom">
          <span
            class="status-pill"
            :class="{
              'status-active': item.estatus === 'Activo',
              'status-filled': item.estatus === 'Surtido',
              'status-cancelled': item.estatus === 'Cancelado'
            }"
          >
            {{ item.estatus }}
          </span>
          <span class="arrow-icon">❯</span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.vouchers-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vouchers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
}

.vouchers-header h3 {
  font-size: 16px;
  font-weight: 800;
  color: #002b66;
  margin: 0;
}

.vouchers-header p {
  font-size: 11px;
  color: #94a3b8;
  margin: 2px 0 0 0;
}

.btn-link {
  background: none;
  border: none;
  color: #002b66;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
}

.vouchers-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.voucher-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.voucher-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.voucher-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.folio {
  font-size: 10px;
  font-weight: 800;
  color: #64748b;
}

.cliente {
  margin: 2px 0 0 0;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.voucher-monto {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.amount {
  font-size: 13px;
  font-weight: 800;
  color: #002b66;
}

.fecha {
  font-size: 10px;
  color: #94a3b8;
}

.voucher-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;
  padding-top: 6px;
}

.status-pill {
  font-size: 9px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}

.status-active { background: #dcfce7; color: #15803d; }
.status-filled { background: #e0f2fe; color: #0369a1; }
.status-cancelled { background: #ffe4e6; color: #be123c; }

.arrow-icon {
  font-size: 12px;
  color: #2563eb;
}
</style>