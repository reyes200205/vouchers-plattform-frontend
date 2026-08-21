<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({
  layout: 'distributor-portal'
})

const { user } = useAuth()

const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0))
</script>

<template>
  <div class="puntos-container">
    <header class="top-navbar">
      <h1 class="nav-title">Mis Puntos</h1>
    </header>

    <div class="content-body">
      <!-- TARJETA PUNTOS -->
      <div class="points-card">
        <div class="points-header">
          <span class="star-icon">⭐</span>
          <span class="points-label">Puntos Acumulados</span>
        </div>
        <h2 class="points-amount">{{ currentPoints.toLocaleString('es-MX') }}</h2>
        <p class="points-sub">Sigue emitiendo vales al corriente para acumular más puntos.</p>
      </div>

      <!-- HISTORIAL O BENEFICIOS -->
      <section class="benefits-section">
        <h3 class="section-title">Beneficios del programa</h3>
        
        <div class="benefit-item">
          <span class="benefit-icon">🎁</span>
          <div>
            <h4 class="benefit-title">Canje por saldo</h4>
            <p class="benefit-desc">Próximamente podrás canjear tus puntos por saldo en crédito.</p>
          </div>
        </div>

        <div class="benefit-item">
          <span class="benefit-icon">🏆</span>
          <div>
            <h4 class="benefit-title">Sube de Nivel</h4>
            <p class="benefit-desc">Suma puntos para aumentar tu categoría y límite de crédito.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.puntos-container {
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
  gap: 20px;
}

.points-card {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  color: #ffffff;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 13px;
  color: #c7d2fe;
}

.points-amount {
  font-size: 40px;
  font-weight: 800;
  color: #fbbf24;
  margin: 0 0 8px 0;
}

.points-sub {
  font-size: 12px;
  color: #e0e7ff;
  margin: 0;
  max-width: 260px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
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
</style>