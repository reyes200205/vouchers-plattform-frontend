<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)
const config = useRuntimeConfig()
const version = config.public.version

const links = [[{
  label: 'Portal Distribuidor',
  icon: 'i-lucide-layout-dashboard',
  to: '/distributor-portal',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Mis Pedidos',
  icon: 'i-lucide-shopping-bag',
  to: '/distributor-portal/orders',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Catálogo',
  icon: 'i-lucide-book-open',
  to: '/distributor-portal/products',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Mis Clientes',
  icon: 'i-lucide-users',
  to: '/distributor-portal/clients',
  onSelect: () => {
    open.value = false
  }
}], [{
  label: 'Volver a General',
  icon: 'i-lucide-arrow-left',
  to: '/'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="distributor-portal"
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
            <span class="text-[10px] text-dimmed mt-0.5 leading-none">v{{ version }} • Distribuidor</span>
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
