<script setup lang="ts">
import {
  House,
  WalletCards,
  Users,
  Coins
} from 'lucide-vue-next'

const menu = [
  {
    name: 'Inicio',
    icon: House
  },
  {
    name: 'Vales',
    icon: WalletCards
  },
  {
    name: 'Contactos',
    icon: Users
  },
  {
    name: 'Mi Control',
    icon: Coins
  }
]
</script>

<template>
  <nav class="bottom-nav">

    <button
      v-for="(item, index) in menu"
      :key="item.name"
      class="nav-item"
      :class="{ active: index === 0 }"
    >

      <component
        :is="item.icon"
        class="nav-icon"
      />

      <span>
        {{ item.name }}
      </span>

    </button>

  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;

  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;

  min-height: 74px;

  padding:
    8px
    8px
    max(8px, env(safe-area-inset-bottom));

  background: #ffffff;

  border-top: 1px solid #e8edf2;

  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  z-index: 1000;
}

.nav-item {
  min-width: 0;

  border: 0;
  background: transparent;

  color: #7c858b;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 3px;

  padding: 4px;

  font-size: clamp(11px, 3.4vw, 15px);
  font-weight: 800;

  white-space: nowrap;
}

.nav-icon {
  width: clamp(23px, 7vw, 31px);
  height: clamp(23px, 7vw, 31px);
}

.nav-item.active {
  color: #5274d4;
}

@media (max-width: 340px) {

  .nav-item {
    font-size: 10px;
  }

  .nav-icon {
    width: 23px;
    height: 23px;
  }
}
</style>