<script setup lang="ts">
import BranchSettingsForm from '~/components/settings/BranchSettingsForm.vue'
import GlobalPointSettingsForm from '~/components/settings/GlobalPointSettingsForm.vue'
import type { Branch } from '~/types'

const { user, fetchMe } = useAuth()
const { listBranches } = useBranches()

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})
const isGeneralManager = computed(() => user.value?.permissions?.includes('point-settings.manage') ?? false)

// Ver la misma nota en staff/new.vue: refresca la sesión guardada por si el
// rol/sucursal del gerente cambió después de su último login.
await fetchMe()

const { data: branches } = await useAsyncData<Branch[]>('settings-branches', () => listBranches(), { default: () => [] })

const selectedBranchId = ref<number | undefined>(branchManagerBranchId.value ?? branches.value[0]?.id ?? undefined)

watch([branchManagerBranchId, branches], () => {
  if (!selectedBranchId.value && branchManagerBranchId.value) {
    selectedBranchId.value = branchManagerBranchId.value
  }
  if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) {
    selectedBranchId.value = branches.value[0].id
  }
}, { immediate: true })
</script>

<template>
  <UPage>
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Configuración">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template v-if="isGeneralManager" #right>
            <USelect
              v-model="selectedBranchId"
              :items="branches.map(b => ({ label: b.name, value: b.id as number }))"
              placeholder="Sucursal..."
              class="w-64"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div class="flex flex-col gap-6 p-6">
          <BranchSettingsForm :branch-id="selectedBranchId" :tabbed="true" />

          <GlobalPointSettingsForm v-if="isGeneralManager" />
        </div>
      </template>
    </UDashboardPanel>
  </UPage>
</template>
