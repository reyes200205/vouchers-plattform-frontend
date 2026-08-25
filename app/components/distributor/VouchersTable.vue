<script setup lang="ts">
import { CircleDollarSign, FileClock, UserRound } from 'lucide-vue-next'

export interface VoucherRow {
  id: string
  cliente: string
  monto: string
  estatusLabel: string
  estatusVariant: 'success' | 'warning' | 'danger'
  fecha: string
}

defineProps<{
  vouchers: VoucherRow[]
}>()

function iconFor(row: VoucherRow) {
  if (row.id.startsWith('SOL')) return UserRound
  return row.estatusVariant === 'warning' ? FileClock : CircleDollarSign
}
</script>

<template>
  <div class="vouchers-container">
    <div class="vouchers-header">
      <h3>Actividad reciente</h3>
      <button class="btn-link" type="button" @click="navigateTo('/distributor-portal/mis-vales')">
        Mis vales
      </button>
    </div>

    <div class="vouchers-list">
      <article
        v-for="item in vouchers"
        :key="item.id"
        class="voucher-row"
      >
        <div class="voucher-icon" :class="item.estatusVariant">
          <component :is="iconFor(item)" :size="16" />
        </div>

        <div class="voucher-info">
          <h4 class="cliente">
            {{ item.cliente }}
          </h4>
          <p class="detail">
            {{ item.id }} · {{ item.estatusLabel }}
          </p>
        </div>

        <div class="voucher-monto">
          <span class="amount" :class="item.estatusVariant">{{ item.monto }}</span>
          <span class="fecha">{{ item.fecha }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.vouchers-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vouchers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
}

.vouchers-header h3 {
  font-size: clamp(14px, 4vw, 16px);
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.btn-link {
  background: none;
  border: none;
  color: #1d4ed8;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
}

.vouchers-list {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(2, 6, 23, 0.04);
}

.voucher-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-bottom: 1px solid #f1f5f9;
}

.voucher-row:last-child {
  border-bottom: none;
}

.voucher-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.voucher-icon.success { background: #dcfce7; color: #16a34a; }
.voucher-icon.warning { background: #dbeafe; color: #1d4ed8; }
.voucher-icon.danger { background: #ffe4e6; color: #e11d48; }

.voucher-info {
  flex: 1;
  min-width: 0;
}

.cliente {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail {
  margin: 1px 0 0 0;
  font-size: 11px;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.voucher-monto {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  gap: 1px;
}

.amount {
  font-size: 12.5px;
  font-weight: 800;
  white-space: nowrap;
}

.amount.success { color: #16a34a; }
.amount.warning { color: #1d4ed8; }
.amount.danger { color: #e11d48; }

.fecha {
  font-size: 10px;
  color: #94a3b8;
}
</style>
