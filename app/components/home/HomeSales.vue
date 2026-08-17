<script setup lang="ts">
import { format } from 'date-fns'
import type { MonthlyPoint } from '~/types'

const props = defineProps<{
  points: MonthlyPoint[]
  title: string
}>()

const formatNumber = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format

const rows = computed(() => {
  return [...(props.points || [])].reverse().map(point => ({
    month: format(new Date(`${point.month}-01T00:00:00`), 'MMMM yyyy'),
    amount: point.amount
  }))
})
</script>

<template>
  <UCard>
    <template #header>
      <p class="text-xs text-muted uppercase mb-1.5">
        {{ title }}
      </p>
    </template>

    <UTable
      :data="rows"
      :columns="[{
        accessorKey: 'month',
        header: 'Mes',
        cell: ({ row }) => row.original.month.charAt(0).toUpperCase() + row.original.month.slice(1)
      }, {
        accessorKey: 'amount',
        header: () => 'Monto',
        cell: ({ row }) => formatNumber(row.original.amount)
      }]"
      class="shrink-0"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
        td: 'border-b border-default'
      }"
    />
  </UCard>
</template>
