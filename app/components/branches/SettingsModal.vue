<script setup lang="ts">
import BranchSettingsForm from '~/components/settings/BranchSettingsForm.vue'
import GlobalPointSettingsForm from '~/components/settings/GlobalPointSettingsForm.vue'
import type { Branch } from '~/types'

const props = defineProps<{
  branch: Branch
}>()

const emit = defineEmits<{ updated: [] }>()

const open = defineModel<boolean>('open', { default: false })
const tab = ref('branch')

function onSaved() {
  emit('updated')
}
</script>

<template>
  <UModal v-model:open="open" title="Configuración de sucursal" :description="branch.name" :ui="{ content: 'max-w-3xl' }">
    <UButton
      label="Configuración"
      icon="i-lucide-settings"
      color="neutral"
      variant="outline"
      size="xs"
    />

    <template #body>
      <UTabs
        v-model="tab"
        :content="false"
        :items="[{ label: 'Sucursal', value: 'branch' }, { label: 'Puntos (global)', value: 'points' }]"
        class="mb-4"
      />

      <BranchSettingsForm v-if="tab === 'branch'" :branch-id="branch.id" :tabbed="true" @saved="onSaved" />
      <GlobalPointSettingsForm v-else @saved="onSaved" />
    </template>
  </UModal>
</template>
