<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Branch, StaffMember } from '~/types'

const toast = useToast()
const { listStaff, updateStaff } = useStaff()
const { listBranches } = useBranches()
const { user } = useAuth()

const canManage = computed(() => user.value?.permissions?.includes('staff.manage') ?? false)
const isBranchManager = computed(() => user.value?.roles?.some(r => r.code === 'branch_manager') ?? false)

const { data: branches } = await useAsyncData<Branch[]>('staff-branches', () => listBranches(), { default: () => [] })

const q = ref('')
const roleFilter = ref<string | undefined>(undefined)
const branchFilter = ref<string | undefined>(undefined)
const page = ref(1)

const { data: staffData, status, refresh } = await useAsyncData('staff', () => listStaff({
  page: page.value,
  role: roleFilter.value,
  branch_id: isBranchManager.value ? undefined : branchFilter.value ? Number(branchFilter.value) : undefined
}), {
  watch: [page, roleFilter, branchFilter],
  default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
})

const items = computed(() => staffData.value.data ?? [])
const meta = computed(() => staffData.value.meta)

const filteredItems = computed(() => {
  if (!q.value) return items.value
  const needle = q.value.toLowerCase()
  return items.value.filter((member) => {
    const name = `${member.person?.first_name ?? ''} ${member.person?.last_name ?? ''}`.toLowerCase()
    return name.includes(needle) || member.username.toLowerCase().includes(needle)
  })
})

const roleLabels: Record<string, string> = {
  coordinator: 'Coordinador',
  verifier: 'Verificador',
  branch_manager: 'Gerente de Sucursal',
  cashier: 'Cajera',
  administrator: 'Administrador',
  general_manager: 'Gerente General',
  distributor: 'Distribuidora'
}

function memberRole(member: StaffMember) {
  return member.roles.find(r => r.is_primary) ?? member.roles[0]
}

function branchName(branchId: number | null | undefined) {
  return branches.value.find(b => b.id === branchId)?.name ?? 'Global'
}

const isEditOpen = ref(false)
const selectedMember = ref<StaffMember | null>(null)

function openCreate() {
  selectedMember.value = null
  isEditOpen.value = true
}

function getMemberItems(member: StaffMember) {
  const items: DropdownMenuItem[] = [
    {
      type: 'label',
      label: 'Acciones'
    }
  ]

  if (canManage.value) {
    items.push({
      label: 'Editar',
      icon: 'i-lucide-pencil',
      onSelect() {
        selectedMember.value = member
        isEditOpen.value = true
      }
    })
  }

  items.push(
    {
      type: 'separator'
    },
    {
      label: member.is_active ? 'Desactivar' : 'Activar',
      icon: member.is_active ? 'i-lucide-user-x' : 'i-lucide-user-check',
      onSelect: async () => {
        try {
          await updateStaff(member.id, { is_active: !member.is_active })
          toast.add({
            title: 'Personal actualizado',
            description: `${member.username} fue ${member.is_active ? 'desactivado' : 'activado'} correctamente`,
            color: 'success'
          })
          await refresh()
        } catch {
          toast.add({ title: 'Error', description: 'No se pudo actualizar el miembro.', color: 'error' })
        }
      }
    }
  )

  return items
}

const roleItems = computed(() => [
  { label: 'Todos los roles', value: undefined },
  ...Object.entries(roleLabels)
    .filter(([code]) => !isBranchManager.value || code === 'cashier')
    .map(([code, label]) => ({ label, value: code }))
])

const branchItems = computed(() => [
  { label: 'Todas las sucursales', value: undefined },
  ...branches.value.map(b => ({ label: b.name, value: b.id.toString() }))
])
</script>

<template>
  <UDashboardPanel id="staff">
    <template #header>
      <UDashboardNavbar title="Personal">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-model="roleFilter"
            :items="roleItems"
            class="w-44"
          />
          <USelect
            v-if="!isBranchManager"
            v-model="branchFilter"
            :items="branchItems"
            class="w-44"
          />
          <UInput
            v-model="q"
            placeholder="Buscar personal..."
            icon="i-lucide-search"
            class="w-56"
          />
          <UButton
            v-if="canManage"
            label="Nuevo personal"
            icon="i-lucide-user-plus"
            color="primary"
            variant="solid"
            @click="openCreate()"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudo cargar el personal.
        </p>
        <UButton
          label="Reintentar"
          icon="i-lucide-refresh-cw"
          color="primary"
          variant="solid"
          @click="refresh()"
        />
      </div>

      <div v-else class="flex h-full flex-col overflow-y-auto">
        <div v-if="filteredItems.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-users" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay personal registrado
          </p>
        </div>

        <div v-else class="divide-y divide-default">
          <div v-for="member in filteredItems" :key="member.id" class="flex items-center justify-between gap-3 px-6 py-4">
            <div class="flex min-w-0 items-center gap-3">
              <UAvatar
                :alt="`${member.person?.first_name ?? ''} ${member.person?.last_name ?? ''}`"
                icon="i-lucide-user"
                size="lg"
              />

              <div class="min-w-0">
                <p class="truncate font-semibold text-highlighted">
                  {{ member.person?.first_name }} {{ member.person?.last_name }}
                </p>
                <p class="text-xs text-muted">
                  @{{ member.username }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <UBadge
                color="primary"
                variant="subtle"
                :label="roleLabels[memberRole(member)?.code ?? ''] ?? memberRole(member)?.code"
              />
              <span class="text-sm text-muted">{{ branchName(memberRole(member)?.branch_id) }}</span>
              <UBadge
                v-if="member.is_active"
                color="success"
                variant="subtle"
                label="Activo"
              />
              <UBadge
                v-else
                color="error"
                variant="subtle"
                label="Inactivo"
              />

              <UDropdownMenu
                v-if="canManage"
                :items="getMemberItems(member)"
              >
                <UButton
                  icon="i-lucide-ellipsis-vertical"
                  color="neutral"
                  variant="ghost"
                  aria-label="Acciones"
                />
              </UDropdownMenu>
            </div>
          </div>
        </div>

        <div v-if="meta.last_page > 1" class="flex justify-end px-6 py-3 mt-auto">
          <UPagination
            v-model:page="page"
            :total="meta.total"
            :items-per-page="meta.per_page"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <StaffMemberModal
    v-model:open="isEditOpen"
    :member="selectedMember"
    :branches="branches"
    @created="refresh()"
    @updated="refresh()"
  />
</template>
