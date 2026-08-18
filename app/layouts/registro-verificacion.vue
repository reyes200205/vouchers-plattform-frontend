<script setup lang="ts">
import type { CommandPaletteItem, NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)
const { roleCode, roleName, logout } = useAuth()
const config = useRuntimeConfig()
const version = config.public.version

const links = computed(() => {
  const isCoordinator = roleCode.value === 'coordinator'
  const isVerifier = roleCode.value === 'verifier'

  const items: NavigationMenuItem[] = []

  if (isCoordinator) {
    items.push({
      label: 'Panel Coordinador',
      icon: 'i-lucide-layout-dashboard',
      to: '/registro-verificacion',
      onSelect: () => { open.value = false }
    }, {
      label: 'Alta Distribuidor',
      icon: 'i-lucide-user-plus',
      to: '/registro-verificacion/new',
      onSelect: () => { open.value = false }
    }, {
      label: 'Distribuidores',
      icon: 'i-lucide-users',
      to: '/registro-verificacion/list',
      onSelect: () => { open.value = false }
    })
  } else if (isVerifier) {
    items.push({
      label: 'Panel Verificador',
      icon: 'i-lucide-layout-dashboard',
      to: '/registro-verificacion/verificador/dashboard_verificador',
      onSelect: () => { open.value = false }
    })
  } else {
    items.push({
      label: 'Panel Control',
      icon: 'i-lucide-layout-dashboard',
      to: '/registro-verificacion',
      onSelect: () => { open.value = false }
    })
  }

  return [items, [{
    label: 'Cerrar Sesión',
    icon: 'i-lucide-log-out',
    onSelect: async () => {
      await logout()
      await navigateTo('/login')
    }
  }]] satisfies NavigationMenuItem[][]
})

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.value.flat() as unknown as CommandPaletteItem[]
}])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="register-distributors"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2.5 px-2.5 py-1.5">
          <div class="flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0">
            <UIcon name="i-lucide-ticket" class="size-4" />
          </div>
          <div v-if="!collapsed" class="flex flex-col min-w-0">
            <span class="font-bold text-sm text-strong truncate leading-none">Mis Vales</span>
            <span class="text-[10px] text-dimmed mt-0.5 leading-none">v{{ version }} • {{ roleName ?? 'Registro' }}</span>
          </div>
        </div>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>
