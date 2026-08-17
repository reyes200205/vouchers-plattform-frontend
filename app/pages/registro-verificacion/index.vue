<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard()
</script>

<template>
  <UDashboardPanel id="register-distributors-home">
    <template #header>
      <UDashboardNavbar title="Registro de Distribuidores" :ui="{ right: 'gap-3' }">
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
                <UIcon name="i-lucide-users" class="size-5 text-primary" />
                <h3 class="font-semibold text-sm text-dimmed">Distribuidores Activos</h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">120</div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-clock" class="size-5 text-warning" />
                <h3 class="font-semibold text-sm text-dimmed">Pendientes de Registro</h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">5</div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-trending-up" class="size-5 text-success" />
                <h3 class="font-semibold text-sm text-dimmed">Nuevos Registros (Mes)</h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">12</div>
          </UCard>
        </div>

        <UCard class="mt-6">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-base">Últimos Registros</h3>
              <UButton label="Dar de alta nuevo" icon="i-lucide-user-plus" to="/registro-verificacion/new" />
            </div>
          </template>
          <div class="text-sm text-center py-8 text-dimmed">
            No hay distribuidores registrados recientemente.
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
