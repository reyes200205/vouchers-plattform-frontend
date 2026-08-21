<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()

// Verifica la ruta actual para activar el icono correspondiente
const currentRoute = computed(() => route.path)

const isInicioActive = computed(() => currentRoute.value === '/distributor-portal' || currentRoute.value === '/distributor-portal/')
const isClientesActive = computed(() => currentRoute.value.startsWith('/distributor-portal/clientes'))
const isEstadoCuentaActive = computed(() => currentRoute.value.startsWith('/distributor-portal/estado-cuenta') || currentRoute.value.startsWith('/distributor-portal/collection-relationship'))
const isPuntosActive = computed(() => currentRoute.value.startsWith('/distributor-portal/puntos'))
</script>

<template>
  <div class="layout-shell">
    <div class="layout-wrapper">
      
      <!-- CONTENIDO DE LA PÁGINA (Slots) -->
      <div class="page-content">
        <slot />
      </div>

      <!-- BOTTOM NAVIGATION BAR (MENÚ DESPLEGABLE INFERIOR) -->
      <nav class="bottom-nav">
        <!-- INICIO -->
        <button 
          type="button" 
          class="nav-item" 
          :class="{ active: isInicioActive }"
          @click="navigateTo('/distributor-portal')"
        >
          <span class="nav-icon">🏠</span>
          <span class="nav-label">Inicio</span>
        </button>

        <!-- CLIENTES -->

        <button 
          type="button" 
          class="nav-item" 
          :class="{ active: isClientesActive }"
          @click="navigateTo('/distributor-portal/vales')"
        >
          <span class="nav-icon">👥</span>
          <span class="nav-label">Clientes</span>
        </button>

        <!-- ESTADO DE CUENTA -->
        <button 
          type="button" 
          class="nav-item" 
          :class="{ active: isEstadoCuentaActive }"
          @click="navigateTo('/distributor-portal/collection-relationship')"
        >
          <span class="nav-icon">📊</span>
          <span class="nav-label">Estado Cuenta</span>
        </button>

        <!-- PUNTOS -->
        <button 
          type="button" 
          class="nav-item" 
          :class="{ active: isPuntosActive }"
          @click="navigateTo('/distributor-portal/points')"
        >
          <span class="nav-icon">⭐</span>
          <span class="nav-label">Puntos</span>
        </button>
      </nav>

    </div>
  </div>
</template>

<style scoped>
.layout-shell {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0d1322; /* Fondo oscuro estilo app móvil */
  display: flex;
  justify-content: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.layout-wrapper {
  width: 100%;
  max-width: 440px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 50px; /* Aumentado de 70px a 110px para dar más aire sobre la barra */
}



/* BARRA DE NAVEGACIÓN INFERIOR (Estilo Imagen) */
.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #0f172a; /* Fondo oscuro tipo la captura */
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #1e293b;
  z-index: 50;
  padding: 0 8px;
}

.nav-item {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: #64748b;
  cursor: pointer;
  flex: 1;
  height: 100%;
  transition: all 0.2s ease;
}

.nav-icon {
  font-size: 18px;
  line-height: 1;
}

.nav-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.nav-item.active {
  color: #38bdf8; /* Azul cyan brillante cuando está activo */
}

.nav-item.active .nav-icon {
  transform: translateY(-2px);
}
</style>