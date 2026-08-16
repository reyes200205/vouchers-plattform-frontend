<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const open = ref(false)

const links = [[{
  label: 'Panel Coordinador',
  icon: 'i-lucide-layout-dashboard',
  to: '/register-distributors',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Alta Distribuidor',
  icon: 'i-lucide-user-plus',
  to: '/register-distributors/new',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Distribuidores',
  icon: 'i-lucide-users',
  to: '/register-distributors/list',
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
      id="register-distributors"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2 px-3 py-2">
          <UIcon name="i-lucide-shield-check" class="size-6 text-primary" />
          <span v-if="!collapsed" class="font-semibold text-sm">Coordinador</span>
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
