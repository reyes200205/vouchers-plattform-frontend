<script setup lang="ts">
import type { DashboardStats, Stat } from '~/types'

const props = defineProps<{
  stats: DashboardStats | null
}>()

function formatCurrency(value: number): string {
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  })
}

const stats = computed<Stat[]>(() => {
  const s = props.stats

  if (!s) return []

  return [{
    title: 'Línea de crédito colocada',
    icon: 'i-lucide-circle-dollar-sign',
    value: formatCurrency(s.credit_placed),
    variation: 0
  }, {
    title: 'Morosidad promedio',
    icon: 'i-lucide-chart-pie',
    value: `${s.delinquency_rate.toLocaleString('es-MX')}%`,
    variation: 0
  }, {
    title: 'Cobros del día',
    icon: 'i-lucide-wallet',
    value: formatCurrency(s.collections_today),
    variation: 0
  }, {
    title: 'Vales activos',
    icon: 'i-lucide-file-text',
    value: s.active_vouchers.toLocaleString('es-MX'),
    variation: 0
  }]
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
