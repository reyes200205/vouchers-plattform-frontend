<script setup lang="ts">
import { formatTimeAgo } from '@vueuse/core'
import type { AppNotification } from '~/types'

const open = defineModel<boolean>('open', { default: false })

defineProps<{
  notifications: AppNotification[]
  loading?: boolean
}>()

const emit = defineEmits<{ read: [id: string] }>()

const NOTIFICATION_META: Record<string, { title: string, icon: string, color: string }> = {
  application_assigned_to_verifier: {
    title: 'Nueva solicitud asignada',
    icon: 'i-lucide-clipboard-list',
    color: 'primary'
  }
}

function metaFor(notification: AppNotification) {
  return NOTIFICATION_META[notification.data.type] ?? {
    title: 'Notificación',
    icon: 'i-lucide-bell',
    color: 'neutral'
  }
}
</script>

<template>
  <USlideover v-model:open="open" title="Notificaciones">
    <template #body>
      <div v-if="loading" class="text-sm text-center py-8 text-dimmed">
        Cargando notificaciones...
      </div>

      <div v-else-if="!notifications.length" class="text-sm text-center py-8 text-dimmed">
        No tienes notificaciones pendientes.
      </div>

      <button
        v-for="notification in notifications"
        :key="notification.id"
        type="button"
        class="w-full text-left px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
        @click="emit('read', notification.id)"
      >
        <UChip color="error" :show="!notification.read_at" inset>
          <UIcon :name="metaFor(notification).icon" :class="`size-5 shrink-0 text-${metaFor(notification).color}`" />
        </UChip>

        <div class="text-sm flex-1">
          <p class="flex items-center justify-between">
            <span class="text-highlighted font-medium">{{ metaFor(notification).title }}</span>
            <time :datetime="notification.created_at" class="text-muted text-xs" v-text="formatTimeAgo(new Date(notification.created_at))" />
          </p>
          <p class="text-dimmed">
            {{ notification.data.message }}
          </p>
        </div>
      </button>
    </template>
  </USlideover>
</template>
