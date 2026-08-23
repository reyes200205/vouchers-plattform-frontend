<script setup lang="ts">
import type { Branch } from '~/types'

const props = defineProps<{
  branch: Branch | null
}>()

const open = defineModel<boolean>('open', { default: false })
const UBadge = resolveComponent('UBadge')
const UAvatar = resolveComponent('UAvatar')
</script>

<template>
  <UModal v-model:open="open" title="Detalles de Sucursal" description="Información completa de la sucursal seleccionada" :ui="{ content: 'max-w-md' }">
    <template #body>
      <div v-if="branch" class="space-y-4">
        <div class="grid grid-cols-2 gap-4 border-b border-default pb-3">
          <div>
            <p class="text-xs text-muted font-medium">Nombre</p>
            <p class="text-sm font-semibold text-highlighted mt-0.5">{{ branch.name }}</p>
          </div>
          <div>
            <p class="text-xs text-muted font-medium">Código</p>
            <p class="text-sm font-mono mt-0.5">{{ branch.code }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 border-b border-default pb-3">
          <div>
            <p class="text-xs text-muted font-medium">Teléfono</p>
            <p class="text-sm mt-0.5">{{ branch.phone || 'Sin teléfono' }}</p>
          </div>
          <div>
            <p class="text-xs text-muted font-medium">Estado</p>
            <div class="mt-0.5">
              <UBadge
                :color="branch.is_active ? 'success' : 'error'"
                variant="subtle"
                :label="branch.is_active ? 'Activa' : 'Inactiva'"
              />
            </div>
          </div>
        </div>

        <div class="border-b border-default pb-3">
          <p class="text-xs text-muted font-medium">Dirección</p>
          <p class="text-sm mt-0.5">{{ branch.address || 'Sin dirección' }}</p>
        </div>

        <div class="pb-1">
          <p class="text-xs text-muted font-medium">Gerente Asignado</p>
          <div v-if="branch.manager" class="mt-1 flex items-center gap-2">
            <UAvatar :src="`https://api.dicebear.com/7.x/initials/svg?seed=${branch.manager.name}`" size="sm" />
            <div>
              <p class="text-sm font-medium text-highlighted">{{ branch.manager.name }}</p>
              <p class="text-xs text-muted">@{{ branch.manager.username }}</p>
            </div>
          </div>
          <p v-else class="text-sm mt-0.5 text-muted font-normal italic">Sin gerente asignado</p>
        </div>

        <div class="flex justify-end pt-2">
          <UButton
            label="Cerrar"
            color="neutral"
            variant="solid"
            @click="open = false"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
