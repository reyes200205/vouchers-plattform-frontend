<script setup lang="ts">
import { CircleCheck, LogOut } from 'lucide-vue-next'

const props = defineProps<{
  distributorName: string
  availableCredit: number
  creditLimit: number
  unlimitedCredit: boolean
  categoryName: string
  points: number
}>()

const emit = defineEmits<{ logout: [] }>()

const usedCredit = computed(() => Math.max(props.creditLimit - props.availableCredit, 0))

const percentage = computed(() => {
  if (props.unlimitedCredit || props.creditLimit <= 0) return 0
  return Math.min((usedCredit.value / props.creditLimit) * 100, 100)
})

const money = (value: number, maximumFractionDigits = 0) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits
  }).format(value)
}
</script>

<template>
  <section class="credit-header">
    <div class="top-bar">
      <span class="brand-name">Mis<span>Vales</span></span>

      <button
        class="logout-btn"
        type="button"
        aria-label="Cerrar sesión"
        @click="emit('logout')"
      >
        <LogOut :size="15" />
      </button>
    </div>

    <div class="credit-card">
      <div class="credit-title-row">
        <span class="credit-label">Crédito disponible</span>
        <span class="category-chip">{{ categoryName }}</span>
      </div>

      <div class="credit-value">
        {{ unlimitedCredit ? 'Ilimitado' : money(availableCredit) }}
      </div>

      <p class="check-line">
        <CircleCheck :size="14" />
        <strong>{{ points.toLocaleString('es-MX') }}</strong> puntos acumulados
      </p>

      <template v-if="!unlimitedCredit">
        <div class="progress-track">
          <div
            class="progress-value"
            :style="{ width: `${percentage}%` }"
          />
        </div>
        <div class="amounts-row">
          <span>Usado {{ money(usedCredit) }}</span>
          <span>Límite {{ money(creditLimit) }}</span>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.credit-header {
  width: 100%;
  padding: clamp(10px, 3vw, 16px) clamp(12px, 4vw, 24px) 0;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.brand-name {
  font-size: clamp(13px, 3.6vw, 15px);
  font-weight: 800;
  color: #0a2472;
  letter-spacing: 0.2px;
}

.brand-name span {
  color: #65a30d;
}

.logout-btn {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #ffffff;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.logout-btn:active {
  background: #fee2e2;
  color: #dc2626;
}

/* TARJETA DE CRÉDITO */
.credit-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #0a2472 0%, #0b347f 55%, #001845 100%);
  color: #ffffff;
  border-radius: 20px;
  padding: clamp(16px, 4.5vw, 22px);
  box-shadow: 0 12px 26px -12px rgba(0, 24, 69, 0.55);
}

.credit-card::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -40px;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(132, 204, 22, 0.28) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.credit-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.credit-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #93c5fd;
}

.category-chip {
  flex-shrink: 0;
  background-color: rgba(132, 204, 22, 0.2);
  color: #d9f99d;
  border: 1px solid rgba(132, 204, 22, 0.4);
  font-size: 9px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.credit-value {
  margin-top: 6px;
  font-size: clamp(24px, 8vw, 32px);
  font-weight: 800;
  letter-spacing: -0.3px;
  position: relative;
  z-index: 1;
}

.check-line {
  margin: 6px 0 0;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: clamp(11px, 3.2vw, 13px);
  color: #a7f3d0;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.check-line strong {
  color: #ffffff;
  font-weight: 800;
}

.progress-track {
  margin-top: 14px;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.progress-value {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #84cc16, #a3e635);
  transition: width 0.3s ease;
}

.amounts-row {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 10.5px;
  color: #cbd5e1;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

@media (min-width: 600px) {
  .credit-header {
    padding-top: 18px;
  }
}
</style>
