<script setup lang="ts">
import {
  ChevronRight,
  FileText,
  ArrowRight
} from 'lucide-vue-next'

const cut = {
  paymentDate: '03/ago/2026',
  daysRemaining: 0,
  total: 72705,
  discount: 15927
}

const money = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<template>
  <section class="last-cut">

    <div class="section-header">

      <h2>
        Mi último corte
      </h2>

      <button class="previous">
        <span>Cortes anteriores</span>

        <ArrowRight />
      </button>

    </div>

    <p class="payment-date">
      Fecha de pago
      <strong>{{ cut.paymentDate }}</strong>

      <span>
        (Faltan {{ cut.daysRemaining }} días)
      </span>
    </p>

    <button class="payment-card">

      <span class="label">
        Total a pagar
      </span>

      <strong class="amount">
        {{ money(cut.total) }}
      </strong>

      <ChevronRight class="arrow" />

    </button>

    <button class="payment-card">

      <span class="label">
        Descuento
      </span>

      <strong class="amount">
        {{ money(cut.discount) }}
      </strong>

      <ChevronRight class="arrow" />

    </button>

    <button class="collection-btn">

      <FileText />

      <span>
        Ver relación de cobro
      </span>

    </button>

  </section>
</template>

<style scoped>
.last-cut {
  width: 100%;

  padding:
    18px
    clamp(14px, 5vw, 38px)
    35px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
}

.section-header h2 {
  min-width: 0;

  margin: 0;

  color: #063878;

  font-size: clamp(21px, 6.8vw, 29px);
  line-height: 1.15;

  font-weight: 800;
}

.previous {
  flex: 0 0 auto;

  display: flex;
  align-items: center;

  gap: 4px;

  border: 0;
  background: transparent;

  color: #063878;

  font-size: clamp(12px, 3.8vw, 19px);

  font-weight: 800;

  padding: 0;
}

.previous svg {
  width: clamp(22px, 7vw, 28px);
  height: clamp(22px, 7vw, 28px);
}

/* FECHA */

.payment-date {
  margin:
    clamp(20px, 6vw, 28px)
    0;

  color: #41494e;

  font-size: clamp(14px, 4.4vw, 18px);

  line-height: 1.45;
}

.payment-date strong {
  font-weight: 800;
}

.payment-date span {
  color: #60902a;
  font-weight: 700;
}

/* TARJETAS */

.payment-card {
  width: 100%;
  min-width: 0;

  min-height: clamp(82px, 25vw, 120px);

  margin-bottom: 16px;

  padding:
    clamp(15px, 4vw, 24px)
    clamp(14px, 5vw, 30px);

  border: 0;
  border-radius: 18px;

  background: #edf6ff;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto
    auto;

  align-items: center;

  gap: clamp(7px, 2vw, 15px);

  text-align: left;

  color: #073978;
}

.label {
  min-width: 0;

  font-size: clamp(15px, 4.4vw, 21px);
  line-height: 1.2;

  font-weight: 800;
}

.amount {
  font-size: clamp(21px, 7vw, 35px);
  line-height: 1;

  font-weight: 500;

  color: #29343c;

  white-space: nowrap;
}

.arrow {
  width: clamp(25px, 8vw, 40px);
  height: clamp(25px, 8vw, 40px);

  color: #5274d3;

  flex-shrink: 0;
}

/* BOTÓN COBRO */

.collection-btn {
  width: min(90%, 480px);
  min-height: clamp(58px, 18vw, 75px);

  margin: 22px auto 0;

  border: 0;
  border-radius: 100px;

  background: #06439d;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  padding: 10px 18px;

  font-size: clamp(14px, 4.2vw, 19px);
  font-weight: 800;

  text-align: center;
}

.collection-btn svg {
  width: clamp(21px, 7vw, 28px);
  height: clamp(21px, 7vw, 28px);

  flex-shrink: 0;
}

/* TELÉFONOS PEQUEÑOS */

@media (max-width: 360px) {

  .section-header h2 {
    font-size: 20px;
  }

  .previous span {
    display: none;
  }

  .payment-card {
    grid-template-columns:
      minmax(0, 1fr)
      auto
      auto;

    padding-left: 13px;
    padding-right: 13px;
  }

  .label {
    font-size: 14px;
  }

  .amount {
    font-size: 21px;
  }

  .collection-btn {
    width: 96%;
  }
}

/* TABLET */

@media (min-width: 600px) {

  .payment-card {
    min-height: 105px;
  }

  .collection-btn {
    width: 60%;
  }
}
</style>