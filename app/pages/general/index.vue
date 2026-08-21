<script setup lang="ts">
import type { DashboardStats } from '~/types'

const { getStats } = useDashboardStats()
const { listBranches } = useBranches()
const { user } = useAuth()

const { isNotificationsSlideoverOpen } = useDashboard()

// El endpoint de estadísticas (platform.view) solo lo tienen super-admin y
// general_manager. branch_manager, coordinator y cashier también aterrizan en
// /general al entrar (ver ROLE_ROUTES en useAuth.ts), así que sin este check
// disparaban un 403 en cada login y veían el panel de estadísticas vacío.
const canViewStats = computed(() => user.value?.permissions?.includes('platform.view') ?? false)

const branchId = ref<number | null>(null)
const branches = ref<{ id: number, name: string }[]>([])

const { data: stats, status, refresh } = await useAsyncData<DashboardStats | null>(
  'dashboard-stats',
  () => canViewStats.value ? getStats(branchId.value) : Promise.resolve(null),
  {
    watch: [branchId],
    default: () => null
  }
)

onMounted(async () => {
  if (!canViewStats.value) return

  try {
    const all = await listBranches()
    branches.value = all.map(b => ({ id: b.id, name: b.name }))
  } catch {
    // ignore
  }
})

const firstName = computed(() => user.value?.person?.first_name ?? user.value?.username ?? '')
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
            v-if="canViewStats"
            v-model="branchId"
            :items="[{ label: 'Todas las sucursales', value: null }, ...branches.map(b => ({ label: b.name, value: b.id }))]"
            placeholder="Sucursal"
            class="w-44"
          />

          <UButton
            v-if="canViewStats"
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
      <div v-if="!canViewStats" class="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <UIcon name="i-lucide-hand" class="size-10 text-dimmed" />
        <p class="text-lg font-semibold text-highlighted">
          Hola{{ firstName ? `, ${firstName}` : '' }}
        </p>
        <p class="text-sm text-muted">
          Usa el menú de la izquierda para continuar con tu trabajo del día.
        </p>
      </div>

      <div v-else-if="status === 'pending' && !stats" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <template v-else>
        <HomeStats :stats="stats" />
        <div class="grid grid-cols-2 gap-6 mt-4">
          <HomeChart title="Colocación mensual" :points="stats?.monthly_placement ?? []" />
          <HomeSales title="Cobranza mensual" :points="stats?.monthly_collections ?? []" />
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
