<script setup lang="ts">
import type { MonthlyPoint } from '~/types'

defineProps<{
  points: MonthlyPoint[]
  title: string
}>()
</script>

<template>
  <UCard class="shrink-0" :ui="{ body: 'px-0! pt-0! pb-3!' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          {{ title }}
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          ---
        </p>
      </div>
    </template>

    <div class="h-96" />
  </UCard>
</template>
