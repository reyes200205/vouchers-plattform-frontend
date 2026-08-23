<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { Branch } from '~/types'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'code',
  value: ''
}])
const columnVisibility = ref()
const rowSelection = ref({})

const { listBranches } = useBranches()

const { data, status, refresh } = await useAsyncData<Branch[]>('branches', () => listBranches())

const isEditOpen = ref(false)
const isDetailOpen = ref(false)
const isSettingsOpen = ref(false)
const selectedBranch = ref<Branch | null>(null)

const { user } = useAuth()
const canManage = computed(() => user.value?.permissions?.includes('branches.manage') ?? false)

function getRowItems(row: Row<Branch>) {
  const items: DropdownMenuItem[] = [
    {
      type: 'label',
      label: 'Acciones'
    }
  ]

  if (canManage.value) {
    items.push({
      label: 'Editar sucursal',
      icon: 'i-lucide-pencil',
      onSelect() {
        selectedBranch.value = row.original
        isEditOpen.value = true
      }
    })
  }

  if (user.value?.permissions?.includes('branch-settings.view')) {
    items.push({
      label: 'Configuración',
      icon: 'i-lucide-settings',
      onSelect() {
        selectedBranch.value = row.original
        isSettingsOpen.value = true
      }
    })
  }

  items.push(
    {
      type: 'separator'
    },
    {
      label: 'Copiar ID de sucursal',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({
          title: 'Copiado',
          description: 'ID de sucursal copiado al portapapeles'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Ver detalles de sucursal',
      icon: 'i-lucide-list',
      onSelect() {
        selectedBranch.value = row.original
        isDetailOpen.value = true
      }
    }
  )

  return items
}

const columns = computed<TableColumn<Branch>[]>(() => {
  const list: TableColumn<Branch>[] = []

  list.push(
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => {
        return h('div', { class: 'font-medium text-highlighted' }, row.original.name)
      }
    },
    {
      accessorKey: 'address',
      header: 'Dirección'
    },
    {
      accessorKey: 'code',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()

        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Código',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      }
    },
    {
      accessorKey: 'phone',
      header: 'Teléfono'
    },
    {
      accessorKey: 'manager',
      header: 'Gerente',
      cell: ({ row }) => {
        return h('div', { class: 'text-sm font-normal text-dimmed' }, row.original.manager?.name || 'Sin asignar')
      }
    },
    {
      accessorKey: 'is_active',
      header: 'Estado',
      filterFn: 'equals',
      cell: ({ row }) => {
        const color = row.original.is_active ? ('success' as const) : ('error' as const)

        return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
          row.original.is_active ? 'Activa' : 'Inactiva'
        )
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-right' },
          h(
            UDropdownMenu,
            {
              content: {
                align: 'end'
              },
              items: getRowItems(row)
            },
            () =>
              h(UButton, {
                icon: 'i-lucide-ellipsis-vertical',
                color: 'neutral',
                variant: 'ghost',
                class: 'ml-auto'
              })
          )
        )
      }
    }
  )

  return list
})

const statusFilter = ref('all')

watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const statusColumn = table.value.tableApi.getColumn('is_active')
  if (!statusColumn) return

  if (newVal === 'all') {
    statusColumn.setFilterValue(undefined)
  } else {
    statusColumn.setFilterValue(newVal === 'active')
  }
})

const code = computed({
  get: (): string => {
    return (table.value?.tableApi?.getColumn('code')?.getFilterValue() as string) || ''
  },
  set: (value: string) => {
    table.value?.tableApi?.getColumn('code')?.setFilterValue(value || undefined)
  }
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})
</script>

<template>
  <UDashboardPanel id="branches">
    <template #header>
      <UDashboardNavbar title="Sucursales">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <BranchesAddModal v-if="canManage" @created="refresh" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="code"
          class="max-w-sm"
          icon="i-lucide-search"
          placeholder="Filtrar por código..."
        />

        <div class="flex flex-wrap items-center gap-1.5">
          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Todos', value: 'all' },
              { label: 'Activas', value: 'active' },
              { label: 'Inactivas', value: 'inactive' }
            ]"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            placeholder="Filtrar estado"
            class="min-w-28"
          />
          <UDropdownMenu
            :items="
              table?.tableApi
                ?.getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => ({
                  label: upperFirst(column.id),
                  type: 'checkbox' as const,
                  checked: column.getIsVisible(),
                  onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                  },
                  onSelect(e?: Event) {
                    e?.preventDefault()
                  }
                }))
            "
            :content="{ align: 'end' }"
          >
            <UButton
              label="Columnas"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-settings-2"
            />
          </UDropdownMenu>
        </div>
      </div>

      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        class="shrink-0"
        :data="data"
        :columns="columns"
        :loading="status === 'pending'"
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
        <div class="flex items-center gap-1.5">
          <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
      <BranchesEditModal
        v-model:open="isEditOpen"
        :branch="selectedBranch"
        @updated="refresh"
      />
      <BranchesDetailModal
        v-model:open="isDetailOpen"
        :branch="selectedBranch"
      />
      <BranchesSettingsModal
        v-if="selectedBranch"
        v-model:open="isSettingsOpen"
        :branch="selectedBranch"
        @updated="refresh"
      />
    </template>
  </UDashboardPanel>
</template>
