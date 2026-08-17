<script setup lang="ts">
import { format } from 'date-fns'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { MonthlyPoint } from '~/types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

const props = defineProps<{
  points: MonthlyPoint[]
  title: string
}>()

type DataRecord = {
  month: Date
  amount: number
}

const { width } = useElementSize(cardRef)

const data = computed<DataRecord[]>(() => {
  return (props.points || []).map(point => ({
    month: new Date(`${point.month}-01T00:00:00`),
    amount: point.amount
  }))
})

const x = (_: DataRecord, i: number) => i
const y = (d: DataRecord) => d.amount

const total = computed(() => data.value.reduce((acc: number, { amount }) => acc + amount, 0))

const formatNumber = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format

const formatDate = (date: Date): string => {
  return format(date, 'MMM yyyy')
}

const xTicks = (i: number) => {
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }

  return formatDate(data.value[i].month)
}

const template = (d: DataRecord) => `${formatDate(d.month)}: ${formatNumber(d.amount)}`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: 'px-0! pt-0! pb-3!' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          {{ title }}
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formatNumber(total) }}
        </p>
      </div>
    </template>

    <ClientOnly>
      <VisXYContainer
        :data="data"
        :padding="{ top: 40 }"
        :margin="{ left: -5, right: -5 }"
        class="h-96"
        :width="width"
      >
        <VisLine
          :x="x"
          :y="y"
          color="var(--ui-primary)"
        />
        <VisArea
          :x="x"
          :y="y"
          color="var(--ui-primary)"
          :opacity="0.1"
        />

        <VisAxis
          type="x"
          :x="x"
          :tick-format="xTicks"
        />

        <VisCrosshair
          color="var(--ui-primary)"
          :template="template"
        />

        <VisTooltip />
      </VisXYContainer>
      <template #fallback>
        <div class="h-96" />
      </template>
    </ClientOnly>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
