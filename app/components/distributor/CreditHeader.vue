<script setup lang="ts">
import { Bell, ChevronDown, UserRound } from 'lucide-vue-next'

const credit = {
  used: 397199,
  limit: 457000,
  available: 59801,
  notifications: 5
}

const percentage = computed(() => {
  return Math.min((credit.used / credit.limit) * 100, 100)
})

const money = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<template>
  <section class="credit-header">

    <div class="top-bar">

      <button class="profile-btn" aria-label="Perfil">
        <UserRound />
      </button>

      <div class="brand">

        <div class="brand-icon">
          $
        </div>

        <div class="brand-info">
          <div class="brand-name">
            Mis<span>Vales</span>
          </div>

          <div class="brand-line"></div>
        </div>

      </div>

      <button
        class="notification-btn"
        aria-label="Notificaciones"
      >
        <Bell />

        <span class="notification-badge">
          {{ credit.notifications }}
        </span>
      </button>

    </div>

    <div class="credit-content">

      <h1>
        Mi Línea de crédito
      </h1>

      <p class="used-text">
        Utilizado:
        <strong>{{ money(credit.used) }}</strong>
      </p>

      <div class="progress-track">
        <div
          class="progress-value"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>

      <div class="credit-info">

        <div class="amounts">

          <p class="limit">
            Límite de crédito:
            <strong>{{ money(credit.limit) }}</strong>
          </p>

          <p class="available">
            Disponible:
            <strong>{{ money(credit.available) }}</strong>
          </p>

        </div>

        <button
          class="expand-btn"
          aria-label="Ver detalle"
        >
          <ChevronDown />
        </button>

      </div>

    </div>

    <button class="request-btn" @click="navigateTo('/distributor-portal/vales')">
      Solicitar
    </button>

  </section>
</template>

<style scoped>
.credit-header {
  width: 100%;
  background: #0b347f;
  color: #ffffff;

  padding:
    14px
    clamp(14px, 4vw, 32px)
    0;

  border-radius: 0 0 20px 20px;
}

/* =========================
   BARRA SUPERIOR
   ========================= */

.top-bar {
  width: 100%;

  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 38px;

  align-items: center;
  gap: 8px;
}

/* PERFIL */

.profile-btn {
  width: 40px;
  height: 40px;

  border: 2px solid #ffffff;
  border-radius: 50%;

  background: transparent;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
}

.profile-btn svg {
  width: 58%;
  height: 58%;
}

/* =========================
   LOGO
   ========================= */

.brand {
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 6px;
}

.brand-icon {
  flex: 0 0 auto;

  width: 28px;
  height: 36px;

  background: #dfe8f6;
  color: #0b347f;

  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 17px;
  font-weight: 900;
}

.brand-info {
  min-width: 0;
}

.brand-name {
  font-size: clamp(19px, 5.5vw, 31px);
  line-height: 1;

  white-space: nowrap;
}

.brand-name span {
  color: #83d500;
  font-weight: 800;
}

.brand-line {
  width: 58px;
  height: 2px;

  background: #80d400;

  margin-top: 4px;
}

/* =========================
   NOTIFICACIONES
   ========================= */

.notification-btn {
  width: 38px;
  height: 38px;

  border: 0;
  background: transparent;

  color: #ffffff;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
}

.notification-btn svg {
  width: 25px;
  height: 25px;
}

.notification-badge {
  position: absolute;

  top: -3px;
  right: -2px;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background: #f35a5a;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  font-weight: 800;
}

/* =========================
   CRÉDITO
   ========================= */

.credit-content {
  margin-top: 18px;
}

.credit-content h1 {
  margin: 0;

  font-size: clamp(21px, 6.5vw, 31px);
  line-height: 1.15;

  font-weight: 800;
}

.used-text {
  margin:
    6px
    0
    14px;

  font-size: clamp(14px, 4vw, 21px);
}

.used-text strong {
  font-weight: 800;
}

/* =========================
   BARRA
   ========================= */

.progress-track {
  width: 100%;
  height: clamp(20px, 6vw, 42px);

  background: #607aa8;

  border-radius: 100px;

  overflow: hidden;
}

.progress-value {
  height: 100%;

  border-radius: inherit;

  background:
    linear-gradient(
      90deg,
      #1686ee,
      #0ecce9,
      #17ddd1
    );
}

/* =========================
   INFORMACIÓN
   ========================= */

.credit-info {
  margin-top: 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 8px;
}

.amounts {
  min-width: 0;
}

.amounts p {
  margin: 0 0 5px;

  font-size: clamp(12px, 3.5vw, 19px);

  line-height: 1.25;
}

.amounts strong {
  font-weight: 800;
}

.available {
  font-size: clamp(13px, 3.8vw, 21px) !important;
}

.available strong {
  font-size: clamp(19px, 5.5vw, 31px);
}

/* =========================
   FLECHA
   ========================= */

.expand-btn {
  flex: 0 0 auto;

  width: clamp(42px, 12vw, 76px);
  height: clamp(42px, 12vw, 76px);

  border: 0;
  border-radius: 50%;

  background: #ffffff;
  color: #0b347f;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;
}

.expand-btn svg {
  width: 52%;
  height: 52%;
}

/* =========================
   SOLICITAR
   ========================= */

.request-btn {
  display: block;

  width: min(82%, 590px);

  /*
   * Mucho más compacto en celular
   */
  height: clamp(46px, 13vw, 82px);

  margin:
    clamp(22px, 5vw, 42px)
    auto
    -22px;

  border: 0;
  border-radius: 100px;

  background: #7ed000;
  color: #ffffff;

  font-size: clamp(15px, 4.5vw, 29px);
  font-weight: 800;

  position: relative;
  z-index: 5;

  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.12);

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;
}

.request-btn:active {
  transform: scale(0.98);
}


/* =========================
   CELULARES PEQUEÑOS
   320px - 360px
   ========================= */

@media (max-width: 360px) {

  .credit-header {
    padding-left: 12px;
    padding-right: 12px;

    border-radius: 0 0 18px 18px;
  }

  .top-bar {
    grid-template-columns: 38px minmax(0, 1fr) 36px;
  }

  .profile-btn {
    width: 36px;
    height: 36px;
  }

  .notification-btn {
    width: 34px;
    height: 34px;
  }

  .notification-btn svg {
    width: 22px;
    height: 22px;
  }

  .notification-badge {
    width: 18px;
    height: 18px;

    font-size: 9px;
  }

  .brand-icon {
    width: 25px;
    height: 32px;

    font-size: 15px;
  }

  .brand-name {
    font-size: 18px;
  }

  .brand-line {
    width: 50px;
  }

  .credit-content {
    margin-top: 15px;
  }

  .credit-content h1 {
    font-size: 20px;
  }

  .used-text {
    font-size: 13px;
    margin-bottom: 11px;
  }

  .progress-track {
    height: 18px;
  }

  .credit-info {
    margin-top: 11px;
  }

  .amounts p {
    font-size: 11px;
  }

  .available {
    font-size: 12px !important;
  }

  .available strong {
    font-size: 18px;
  }

  .expand-btn {
    width: 40px;
    height: 40px;
  }

  .request-btn {
    width: 78%;
    height: 44px;

    margin-top: 20px;
    margin-bottom: -20px;

    font-size: 14px;
  }
}


/* =========================
   TABLET
   ========================= */

@media (min-width: 600px) {

  .credit-header {
    padding-top: 20px;
  }

  .top-bar {
    grid-template-columns: 52px minmax(0, 1fr) 44px;
  }

  .profile-btn {
    width: 48px;
    height: 48px;
  }

  .notification-btn {
    width: 44px;
    height: 44px;
  }

  .brand-icon {
    width: 34px;
    height: 42px;
  }

  .credit-content {
    margin-top: 25px;
  }

  .request-btn {
    width: min(70%, 500px);
  }
}


/* =========================
   COMPUTADORA
   ========================= */

@media (min-width: 1024px) {

  .credit-header {
    padding-top: 24px;
  }

  .credit-content {
    margin-top: 30px;
  }

  .request-btn {
    height: 68px;
    font-size: 24px;

    margin-top: 34px;
    margin-bottom: -34px;
  }
}
</style>