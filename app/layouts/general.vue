<script setup lang="ts">
import type { CommandPaletteItem, NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

const { user } = useAuth()
const { counts } = useInbox()

const inboxCount = ref(0)

onMounted(async () => {
  try {
    const c = await counts()
    inboxCount.value = c.applications + c.credit_increases + c.redemptions
  } catch {
    inboxCount.value = 0
  }
})

const hasPermission = (permission: string) => {
  return user.value?.permissions?.includes(permission) ?? false
}

const hasAnyPermission = (permissions: string[]) => {
  return permissions.some(p => hasPermission(p))
}

const links = computed(() => {
  const items: NavigationMenuItem[] = []

  items.push({
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/general',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Bandeja de Aprobaciones',
    icon: 'i-lucide-inbox',
    to: '/general/inbox',
    badge: inboxCount.value > 0 ? String(inboxCount.value) : undefined,
    onSelect: () => {
      open.value = false
    }
  })

  if (hasPermission('customers.view')) {
    items.push({
      label: 'Clientes',
      icon: 'i-lucide-users',
      to: '/general/customers',
      onSelect: () => {
        open.value = false
      }
    })
  }

  if (hasPermission('branches.manage')) {
    items.push({
      label: 'Sucursales',
      icon: 'i-lucide-store',
      to: '/general/branches',
      onSelect: () => {
        open.value = false
      }
    })
  }

  if (hasPermission('products.view')) {
    items.push({
      label: 'Productos y Vales',
      icon: 'i-lucide-ticket',
      to: '/general/products',
      onSelect: () => {
        open.value = false
      }
    })
  }

  if (hasPermission('categories.view')) {
    items.push({
      label: 'Categorías',
      icon: 'i-lucide-medal',
      to: '/general/categories',
      onSelect: () => {
        open.value = false
      }
    })
  }

  if (hasPermission('reconciliations.view')) {
    items.push({
      label: 'Conciliaciones',
      icon: 'i-lucide-hand-coins',
      to: '/general/reconciliations',
      onSelect: () => {
        open.value = false
      }
    })
  }

  if (hasPermission('staff.view')) {
    items.push({
      label: 'Personal',
      icon: 'i-lucide-user-cog',
      to: '/general/staff',
      onSelect: () => {
        open.value = false
      }
    })
  }

  if (hasAnyPermission(['branch-settings.view', 'point-settings.view'])) {
    items.push({
      label: 'Configuración',
      to: '/general/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      type: 'trigger',
      children: [{
        label: 'General',
        to: '/general/settings',
        exact: true,
        onSelect: () => {
          open.value = false
        }
      }, {
        label: 'Notificaciones',
        to: '/general/settings/notifications',
        onSelect: () => {
          open.value = false
        }
      }, {
        label: 'Seguridad',
        to: '/general/settings/security',
        onSelect: () => {
          open.value = false
        }
      }]
    })
  }

  return [items] satisfies NavigationMenuItem[][]
})

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.value.flat() as unknown as CommandPaletteItem[]
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'border-t border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
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
