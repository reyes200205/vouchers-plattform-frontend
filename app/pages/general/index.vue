<script setup lang="ts">
import type { DashboardStats } from '~/types'

const { getStats } = useDashboardStats()
const { listBranches } = useBranches()

const { isNotificationsSlideoverOpen } = useDashboard()

const branchId = ref<number | null>(null)
const branches = ref<{ id: number, name: string }[]>([])

const { data: stats, status, refresh } = await useAsyncData<DashboardStats | null>('dashboard-stats', () => getStats(branchId.value), {
  watch: [branchId],
  default: () => null
})

onMounted(async () => {
  try {
    const all = await listBranches()
    branches.value = all.map(b => ({ id: b.id, name: b.name }))
  } catch {
    // ignore
  }
})
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Panel de control" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-model="branchId"
            :items="[{ label: 'Todas las sucursales', value: null }, ...branches.map(b => ({ label: b.name, value: b.id }))]"
            placeholder="Sucursal"
            class="w-44"
          />

          <UButton
            icon="i-lucide-refresh-cw"
            color="neutral"
            variant="ghost"
            square
            :loading="status === 'pending'"
            @click="refresh()"
          />

          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="status === 'pending' && !stats" class="flex items-center justify-center py-16">
        <ULoadingIcon />
      </div>

      <template v-else>
        <HomeStats :stats="stats" />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
          <HomeChart title="Colocación mensual" :points="stats?.monthly_placement ?? []" />
          <HomeSales title="Cobranza mensual" :points="stats?.monthly_collections ?? []" />
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
