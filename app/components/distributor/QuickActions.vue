<script setup lang="ts">
import {
  ArrowDownUp,
  CircleDollarSign
} from 'lucide-vue-next'

const actions = [
  {
    title: 'Movimientos',
    icon: 'movements'
  },
  {
    title: 'Mis préstamos',
    icon: 'loans'
  }
]
</script>

<template>
  <section class="quick-actions">
    <button
      v-for="action in actions"
      :key="action.title"
      class="action"
      type="button"
    >
      <div class="action-circle">
        <ArrowDownUp
          v-if="action.icon === 'movements'"
        />

        <CircleDollarSign
          v-else
        />
      </div>

      <span>
        {{ action.title }}
      </span>
    </button>
  </section>
</template>

<style scoped>
.quick-actions {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: clamp(12px, 4vw, 26px);

  padding:
    clamp(28px, 7vw, 60px)
    clamp(12px, 5vw, 38px)
    clamp(20px, 5vw, 35px);
}

.action {
  min-width: 0;

  border: 0;
  background: transparent;

  color: #5273b8;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 7px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.action-circle {
  width: clamp(58px, 18vw, 100px);
  height: clamp(58px, 18vw, 100px);

  border-radius: 50%;

  background: #e4edfc;
  color: #5274d3;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.2s ease;
}

.action-circle svg {
  width: 45%;
  height: 45%;
}

.action span {
  font-size: clamp(12px, 3.5vw, 17px);
  line-height: 1.15;

  font-weight: 700;
  text-align: center;

  white-space: nowrap;
}

.action:active .action-circle {
  transform: scale(0.94);
}


/* =========================
   CELULARES PEQUEÑOS
   ========================= */

@media (max-width: 360px) {

  .quick-actions {
    gap: 10px;

    padding:
      22px
      8px
      20px;
  }

  .action {
    gap: 5px;
  }

  .action-circle {
    width: 54px;
    height: 54px;
  }

  .action span {
    font-size: 11px;
    font-weight: 700;
  }
}


/* =========================
   CELULARES NORMALES
   ========================= */

@media (min-width: 361px) and (max-width: 599px) {

  .quick-actions {
    gap: 14px;

    padding:
      26px
      12px
      22px;
  }

  .action-circle {
    width: 62px;
    height: 62px;
  }

  .action span {
    font-size: 13px;
  }
}


/* =========================
   TABLET
   ========================= */

@media (min-width: 600px) and (max-width: 1023px) {

  .quick-actions {
    justify-content: center;

    gap: 24px;

    padding:
      40px
      24px
      30px;
  }

  .action {
    max-width: 150px;
  }

  .action-circle {
    width: 80px;
    height: 80px;
  }

  .action span {
    font-size: 15px;
  }
}


/* =========================
   COMPUTADORA
   ========================= */

@media (min-width: 1024px) {

  .quick-actions {
    justify-content: center;

    gap: 30px;

    padding:
      45px
      30px
      35px;
  }

  .action {
    max-width: 180px;
  }

  .action-circle {
    width: 95px;
    height: 95px;
  }

  .action span {
    font-size: 17px;
  }
}
</style>