<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard()
</script>

<template>
  <UDashboardPanel id="distributor-portal-home">
    <template #header>
      <UDashboardNavbar title="Portal de Distribuidor" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
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
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-shopping-bag" class="size-5 text-primary" />
                <h3 class="font-semibold text-sm text-dimmed">Pedidos Realizados</h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">24</div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-truck" class="size-5 text-warning" />
                <h3 class="font-semibold text-sm text-dimmed">En Camino / Tránsito</h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">2</div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-dollar-sign" class="size-5 text-success" />
                <h3 class="font-semibold text-sm text-dimmed">Saldo Pendiente</h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">$1,240.00</div>
          </UCard>
        </div>

        <UCard class="mt-6">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-base">Mis Pedidos Recientes</h3>
              <UButton label="Nuevo Pedido" icon="i-lucide-plus" to="/distributor-portal/orders" />
            </div>
          </template>
          <div class="text-sm text-center py-8 text-dimmed">
            No tienes pedidos recientes. ¡Comienza a ordenar hoy!
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
