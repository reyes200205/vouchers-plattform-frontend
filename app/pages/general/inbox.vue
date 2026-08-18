<script setup lang="ts">
import type { InboxData } from '~/types'

const { listInbox } = useInbox()
const { listBranches } = useBranches()

const toast = useToast()
const branchId = ref<number | null>(null)
const branches = ref<{ id: number, name: string }[]>([])
const tabItems = computed(() => {
  const totals = data.value

  return [{
    label: `Distribuidoras (${totals?.applications?.total ?? 0})`,
    value: 'applications'
  }, {
    label: `Crédito (${totals?.credit_increases?.total ?? 0})`,
    value: 'credit'
  }, {
    label: `Puntos (${totals?.redemptions?.total ?? 0})`,
    value: 'redemptions'
  }]
})

const selectedTab = ref('applications')

const { data, status, error, refresh } = await useAsyncData<InboxData>('inbox', () => listInbox(undefined, branchId.value), {
  watch: [branchId],
  default: () => ({})
})

onMounted(async () => {
  try {
    const all = await listBranches()
    branches.value = all.map(b => ({ id: b.id, name: b.name }))
  } catch {
    // ignore
  }
})

watch(error, async (e) => {
  if (!e) return

  const statusCode = (e as { statusCode?: number }).statusCode

  if (statusCode === 401) {
    const { logout } = useAuth()
    await logout()
    await navigateTo('/login')
    return
  }

  toast.add({
    title: 'No se pudo cargar la bandeja',
    description: statusCode
      ? `El servidor respondió con el código ${statusCode}.`
      : 'Revisa tu conexión con el servidor.',
    color: 'error',
    duration: 8000
  })
})

async function onDecided() {
  await refresh()

  toast.add({
    title: 'Lista actualizada',
    description: 'La decisión se registró correctamente.',
    color: 'success'
  })
}
</script>

<template>
  <UDashboardPanel id="inbox">
    <template #header>
      <UDashboardNavbar title="Bandeja de aprobaciones">
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
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          class="-mx-1"
        />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudo cargar la bandeja de aprobaciones.
        </p>
        <UButton
          label="Reintentar"
          icon="i-lucide-refresh-cw"
          color="primary"
          variant="solid"
          @click="refresh()"
        />
      </div>

      <template v-else>
        <div v-if="selectedTab === 'applications'" class="h-full overflow-y-auto">
          <InboxApplicationsPanel :items="data.applications?.items ?? []" @decided="onDecided" />
        </div>

        <div v-else-if="selectedTab === 'credit'" class="h-full overflow-y-auto">
          <InboxCreditPanel :items="data.credit_increases?.items ?? []" @decided="onDecided" />
        </div>

        <div v-else class="h-full overflow-y-auto">
          <InboxRedemptionsPanel :items="data.redemptions?.items ?? []" @decided="onDecided" />
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
