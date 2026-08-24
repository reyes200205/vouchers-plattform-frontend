<script setup lang="ts">
import { Coins, FilePlus2, ReceiptText, UserPlus } from 'lucide-vue-next'

const actions = [
  { title: 'Nuevo vale', icon: FilePlus2, to: '/distributor-portal/vales', tint: 'blue' },
  { title: 'Cliente nuevo', icon: UserPlus, to: '/distributor-portal/clientes', tint: 'lime' },
  { title: 'Estado cuenta', icon: ReceiptText, to: '/distributor-portal/collection-relationship', tint: 'peach' },
  { title: 'Puntos', icon: Coins, to: '/distributor-portal/points', tint: 'amber' }
]
</script>

<template>
  <section class="quick-actions">
    <button
      v-for="action in actions"
      :key="action.title"
      class="action"
      type="button"
      @click="navigateTo(action.to)"
    >
      <div class="action-square" :class="action.tint">
        <component :is="action.icon" :size="18" />
      </div>

      <span>{{ action.title }}</span>
    </button>
  </section>
</template>

<style scoped>
.quick-actions {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(6px, 2vw, 12px);
  padding: 14px clamp(12px, 4vw, 24px) 6px;
}

.action {
  min-width: 0;
  border: 0;
  background: transparent;
  color: #334155;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.action-square {
  width: clamp(40px, 11vw, 48px);
  height: clamp(40px, 11vw, 48px);
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}

.action-square.blue { background: #e0ecff; color: #1d4ed8; }
.action-square.lime { background: #e2fce4; color: #16a34a; }
.action-square.peach { background: #ffe9dd; color: #ea580c; }
.action-square.amber { background: #fef3c7; color: #b45309; }

.action span {
  font-size: clamp(9.5px, 2.7vw, 11.5px);
  line-height: 1.15;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.action:active .action-square {
  transform: scale(0.92);
}

@media (max-width: 340px) {
  .quick-actions {
    gap: 4px;
    padding: 12px 8px 4px;
  }

  .action-square {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }

  .action span {
    font-size: 9px;
  }
}

@media (min-width: 600px) {
  .quick-actions {
    max-width: 420px;
    margin: 0 auto;
    gap: 20px;
    padding: 22px 24px 8px;
  }

  .action-square {
    width: 54px;
    height: 54px;
  }
}
</style>
