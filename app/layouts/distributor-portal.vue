<script setup lang="ts">
import { computed } from 'vue'
import { House, Users, FileText, Coins } from 'lucide-vue-next'

const route = useRoute()

// Verifica la ruta actual para activar el icono correspondiente
const currentRoute = computed(() => route.path)

const isInicioActive = computed(() => currentRoute.value === '/distributor-portal' || currentRoute.value === '/distributor-portal/')
const isClientesActive = computed(() => currentRoute.value.startsWith('/distributor-portal/clientes') || currentRoute.value.startsWith('/distributor-portal/vales') || currentRoute.value.startsWith('/distributor-portal/configure_vale'))
const isEstadoCuentaActive = computed(() => currentRoute.value.startsWith('/distributor-portal/estado-cuenta') || currentRoute.value.startsWith('/distributor-portal/collection-relationship'))
const isPuntosActive = computed(() => currentRoute.value.startsWith('/distributor-portal/points'))
</script>

<template>
  <div class="layout-shell">
    <div class="layout-wrapper">
      <!-- CONTENIDO DE LA PÁGINA (Slots) -->
      <div class="page-content">
        <slot />
      </div>

      <!-- BOTTOM NAVIGATION BAR -->
      <nav class="bottom-nav">
        <button
          type="button"
          class="nav-item"
          :class="{ active: isInicioActive }"
          @click="navigateTo('/distributor-portal')"
        >
          <span class="nav-icon-wrap">
            <House :size="20" />
          </span>
          <span class="nav-label">Inicio</span>
        </button>

        <button
          type="button"
          class="nav-item"
          :class="{ active: isClientesActive }"
          @click="navigateTo('/distributor-portal/vales')"
        >
          <span class="nav-icon-wrap">
            <Users :size="20" />
          </span>
          <span class="nav-label">Clientes</span>
        </button>

        <button
          type="button"
          class="nav-item"
          :class="{ active: isEstadoCuentaActive }"
          @click="navigateTo('/distributor-portal/collection-relationship')"
        >
          <span class="nav-icon-wrap">
            <FileText :size="20" />
          </span>
          <span class="nav-label">Estado Cuenta</span>
        </button>

        <button
          type="button"
          class="nav-item"
          :class="{ active: isPuntosActive }"
          @click="navigateTo('/distributor-portal/points')"
        >
          <span class="nav-icon-wrap">
            <Coins :size="20" />
          </span>
          <span class="nav-label">Puntos</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.layout-shell {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: radial-gradient(circle at 50% 0%, #0a2472 0%, #001845 55%, #000d29 100%);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.layout-wrapper {
  width: 100%;
  max-width: 480px;
  height: 100dvh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f7fc;
  position: relative;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.page-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

/* BARRA DE NAVEGACIÓN INFERIOR — siempre en el mismo lugar, mismo tamaño,
   sin importar el contenido de la página (evita que los botones "brinquen"
   entre pantallas). */
.bottom-nav {
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  height: calc(64px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: linear-gradient(180deg, #041b4d 0%, #001845 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 -8px 24px rgba(0, 12, 40, 0.25);
  z-index: 50;
}

.nav-item {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #7e93c2;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 6px 2px;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.nav-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.nav-label {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.nav-item.active {
  color: #d9f99d;
}

.nav-item.active .nav-icon-wrap {
  background-color: rgba(132, 204, 22, 0.18);
  transform: translateY(-1px);
}

@media (max-width: 340px) {
  .nav-label {
    font-size: 9.5px;
  }
}
</style>
