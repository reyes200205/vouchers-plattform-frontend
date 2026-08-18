<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)

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
        <div class="flex items-center gap-2 px-3 py-2">
          <UIcon name="i-lucide-store" class="size-6 text-primary" />
          <span v-if="!collapsed" class="font-semibold text-sm">Distribuidor</span>
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
