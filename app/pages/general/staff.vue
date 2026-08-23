<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Branch, StaffMember } from '~/types'

const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const toast = useToast()
const { listStaff, updateStaff } = useStaff()
const { listBranches } = useBranches()
const { user } = useAuth()

const canManage = computed(() => user.value?.permissions?.includes('staff.manage') ?? false)
const isBranchManager = computed(() => user.value?.roles?.some(r => r.code === 'branch_manager') ?? false)
// Debe coincidir con ListStaffService::BRANCH_MANAGER_ROLES del backend: los
// roles que un gerente de sucursal puede crear/ver en su propia sucursal.
const BRANCH_MANAGER_ROLE_CODES = ['cashier', 'coordinator', 'verifier']

const { data: branches } = await useAsyncData<Branch[]>('staff-branches', () => listBranches(), { default: () => [] })

const q = ref('')
const roleFilter = ref('all')
const branchFilter = ref('all')
const page = ref(1)

const { data: staffData, status, refresh } = await useAsyncData('staff', () => listStaff({
  page: page.value,
  role: roleFilter.value === 'all' ? undefined : roleFilter.value,
  branch_id: isBranchManager.value ? undefined : (branchFilter.value === 'all' ? undefined : Number(branchFilter.value))
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
  'super-admin': 'Super Administrador',
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
  { label: 'Todos los roles', value: 'all' },
  ...Object.entries(roleLabels)
    .filter(([code]) => !isBranchManager.value || BRANCH_MANAGER_ROLE_CODES.includes(code))
    .map(([code, label]) => ({ label, value: code }))
])

const branchItems = computed(() => [
  { label: 'Todas las sucursales', value: 'all' },
  ...branches.value.map(b => ({ label: b.name, value: b.id.toString() }))
])

const columns = computed<TableColumn<StaffMember>[]>(() => {
  const list: TableColumn<StaffMember>[] = [
    {
      accessorKey: 'person',
      header: 'Personal',
      cell: ({ row }) => {
        const member = row.original
        const firstName = member.person?.first_name ?? ''
        const lastName = member.person?.last_name ?? ''
        const fullName = `${firstName} ${lastName}`.trim() || 'Sin nombre'

        return h('div', { class: 'min-w-0 py-1' }, [
          h('p', { class: 'truncate font-semibold text-highlighted text-sm' }, fullName)
        ])
      }
    },
    {
      id: 'username',
      header: 'Usuario',
      cell: ({ row }) => {
        const member = row.original
        return h('span', { class: 'text-sm text-muted font-normal' }, `${member.username}`)
      }
    },
    {
      id: 'email',
      header: 'Correo',
      cell: ({ row }) => {
        const member = row.original
        return h('span', { class: 'text-sm text-muted font-normal' }, member.person?.email ?? 'Sin correo')
      }
    },
    {
      id: 'role',
      header: 'Rol',
      cell: ({ row }) => {
        const member = row.original
        const role = memberRole(member)
        const code = role?.code ?? ''
        const label = roleLabels[code] ?? code
        return h(UBadge, {
          color: 'primary',
          variant: 'subtle',
          label
        })
      }
    },
    {
      id: 'branch',
      header: 'Sucursal',
      cell: ({ row }) => {
        const member = row.original
        const role = memberRole(member)
        return h('span', { class: 'text-sm text-muted' }, branchName(role?.branch_id))
      }
    },
    {
      accessorKey: 'is_active',
      header: 'Estado',
      cell: ({ row }) => {
        const member = row.original
        return h(UBadge, {
          color: member.is_active ? 'success' : 'error',
          variant: 'subtle',
          label: member.is_active ? 'Activo' : 'Inactivo'
        })
      }
    }
  ]

  if (canManage.value) {
    list.push({
      id: 'actions',
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-right' },
          h(
            UDropdownMenu,
            {
              content: { align: 'end' },
              items: getMemberItems(row.original)
            },
            () =>
              h(UButton, {
                'icon': 'i-lucide-ellipsis-vertical',
                'color': 'neutral',
                'variant': 'ghost',
                'aria-label': 'Acciones'
              })
          )
        )
      }
    })
  }

  return list
})
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

      <template v-else>
        <div v-if="filteredItems.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-users" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay personal registrado
          </p>
        </div>

        <UTable
          v-else
          class="shrink-0"
          :data="filteredItems"
          :columns="(columns as any)"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default',
            separator: 'h-0'
          }"
        />

        <div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto">
          <UPagination
            v-model:page="page"
            :total="meta?.total ?? 0"
            :items-per-page="meta?.per_page ?? 15"
          />
        </div>
      </template>
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
