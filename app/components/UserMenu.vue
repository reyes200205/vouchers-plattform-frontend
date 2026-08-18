<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const colorMode = useColorMode()
const appConfig = useAppConfig()

const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive']

const { user: authUser, logout } = useAuth()

const isProfileOpen = ref(false)

const displayName = computed(() => {
  if (authUser.value?.person) {
    const p = authUser.value.person
    return `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() || authUser.value.username
  }
  return authUser.value?.username ?? 'Usuario'
})

const userDetails = computed(() => ({
  name: displayName.value,
  avatar: {
    src: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName.value)}`,
    alt: displayName.value
  }
}))

const primaryRole = computed(() => {
  if (!authUser.value?.roles?.length) return null
  return authUser.value.roles.find(role => role.is_primary) ?? authUser.value.roles[0]
})

const branchName = computed(() => {
  return primaryRole.value?.branch_name ?? 'Global (Sin Sucursal)'
})

const roleNameDisplay = computed(() => {
  return primaryRole.value?.name ?? 'N/A'
})

const items = computed<DropdownMenuItem[][]>(() => ([[{
  type: 'label',
  label: userDetails.value.name,
  avatar: userDetails.value.avatar
}, {
  label: 'Profile',
  icon: 'i-lucide-user',
  onSelect: () => {
    isProfileOpen.value = true
  }
}], [{
  label: 'Theme',
  icon: 'i-lucide-palette',
  children: [{
    label: 'Primary',
    slot: 'chip',
    chip: appConfig.ui.colors.primary,
    content: {
      align: 'center',
      collisionPadding: 16
    },
    children: colors.map(color => ({
      label: color,
      chip: color,
      slot: 'chip',
      checked: appConfig.ui.colors.primary === color,
      type: 'checkbox',
      onSelect: (e) => {
        e.preventDefault()

        appConfig.ui.colors.primary = color
      }
    }))
  }, {
    label: 'Neutral',
    slot: 'chip',
    chip: appConfig.ui.colors.neutral === 'neutral' ? 'old-neutral' : appConfig.ui.colors.neutral,
    content: {
      align: 'end',
      collisionPadding: 16
    },
    children: neutrals.map(color => ({
      label: color,
      chip: color === 'neutral' ? 'old-neutral' : color,
      slot: 'chip',
      type: 'checkbox',
      checked: appConfig.ui.colors.neutral === color,
      onSelect: (e) => {
        e.preventDefault()

        appConfig.ui.colors.neutral = color
      }
    }))
  }]
}, {
  label: 'Appearance',
  icon: 'i-lucide-sun-moon',
  children: [{
    label: 'Light',
    icon: 'i-lucide-sun',
    type: 'checkbox',
    checked: colorMode.value === 'light',
    onSelect(e: Event) {
      e.preventDefault()

      colorMode.preference = 'light'
    }
  }, {
    label: 'Dark',
    icon: 'i-lucide-moon',
    type: 'checkbox',
    checked: colorMode.value === 'dark',
    onUpdateChecked(checked: boolean) {
      if (checked) {
        colorMode.preference = 'dark'
      }
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  }]
}], [{
  label: 'Log out',
  icon: 'i-lucide-log-out',
  onSelect: async () => {
    await logout()
    await navigateTo('/login')
  }
}]]))
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...userDetails,
        label: collapsed ? undefined : userDetails?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />

    <template #chip-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span
          class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`
          }"
        />
      </div>
    </template>
  </UDropdownMenu>

  <UModal
    v-model:open="isProfileOpen"
    title="Mi Perfil"
    description="Información detallada de tu cuenta"
  >
    <template #body>
      <div class="flex flex-col items-center gap-4 py-4">
        <UAvatar
          :src="`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`"
          :alt="displayName"
          size="xl"
          class="ring-2 ring-primary-500 shadow-md"
        />
        <div class="text-center">
          <h3 class="text-lg font-semibold text-strong">{{ displayName }}</h3>
          <p class="text-sm text-dimmed">@{{ authUser?.username }}</p>
        </div>
      </div>

      <div class="space-y-3 mt-2">
        <div class="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-mail" class="text-dimmed size-4" />
            <span class="text-sm font-medium text-strong">Correo</span>
          </div>
          <span class="text-sm text-dimmed">{{ authUser?.person?.email ?? 'No registrado' }}</span>
        </div>

        <div class="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-shield" class="text-dimmed size-4" />
            <span class="text-sm font-medium text-strong">Rol</span>
          </div>
          <UBadge color="primary" variant="subtle" size="sm">
            {{ roleNameDisplay }}
          </UBadge>
        </div>

        <div class="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-store" class="text-dimmed size-4" />
            <span class="text-sm font-medium text-strong">Sucursal</span>
          </div>
          <span class="text-sm text-dimmed">{{ branchName }}</span>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <UButton
          label="Cerrar"
          color="neutral"
          variant="subtle"
          @click="isProfileOpen = false"
        />
      </div>
    </template>
  </UModal>
</template>
