<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { useDistributors, distributorFullName, coordinatorFullName, type Distributor } from '~/composables/useDistributors'

const UBadge = resolveComponent('UBadge')

const { listDistributors } = useDistributors()

const statusFilter = ref<string | undefined>(undefined)
const q = ref('')
const page = ref(1)

const { data, status, refresh } = await useAsyncData(
  'coordinador-distributors',
  () => listDistributors({
    search: q.value.trim() || undefined,
    status: statusFilter.value,
    page: page.value,
    per_page: 15
  }),
  {
    watch: [statusFilter, page],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const items = computed<Distributor[]>(() => (data.value?.data as Distributor[]) ?? [])
const meta = computed(() => data.value?.meta)

let searchTimeout: ReturnType<typeof setTimeout> | null = null
watch(q, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    refresh()
  }, 300)
})

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const statusColors: Record<string, 'success' | 'warning' | 'error' | 'neutral' | 'primary'> = {
  ACTIVA: 'success',
  CANDIDATA: 'primary',
  POSIBLE: 'warning',
  INACTIVA: 'neutral',
  MOROSA: 'error',
  BLOQUEADA: 'error',
  CERRADA: 'neutral'
}

function onPageChange(nextPage: number) {
  page.value = nextPage
  refresh()
}

const columns: TableColumn<Distributor>[] = [
  {
    accessorKey: 'distributor_number',
    header: 'Código'
  },
  {
    accessorKey: 'person',
    header: 'Distribuidora',
    cell: ({ row }) => {
      const person = row.original.person
      return h('div', { class: 'min-w-0' }, [
        h('p', { class: 'truncate font-medium text-highlighted' }, distributorFullName(row.original)),
        h('p', { class: 'truncate text-xs text-muted' }, person?.email || '')
      ])
    }
  },
  {
    accessorKey: 'credit_limit',
    header: 'Límite Crédito',
    cell: ({ row }) => money.format(Number(row.original.credit_limit || 0))
  },
  {
    accessorKey: 'used_credit',
    header: 'Crédito Usado',
    cell: ({ row }) => {
      const limit = Number(row.original.credit_limit || 0)
      const available = Number(row.original.available_credit || 0)
      const used = Math.max(0, limit - available)
      return money.format(used)
    }
  },
  {
    accessorKey: 'available_credit',
    header: 'Crédito Disponible',
    cell: ({ row }) => money.format(Number(row.original.available_credit || 0))
  },
  {
    accessorKey: 'branch',
    header: 'Sucursal',
    cell: ({ row }) => row.original.branch?.name ?? '—'
  },
  {
    accessorKey: 'coordinator',
    header: 'Coordinador',
    cell: ({ row }) => coordinatorFullName(row.original.coordinator)
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => h(UBadge, {
      color: row.original.status ? statusColors[row.original.status] : 'neutral',
      variant: 'subtle',
      label: row.original.status ?? ''
    })
  }
]
</script>

<template>
  <UDashboardPanel id="coordinador-distributors">
    <template #header>
      <UDashboardNavbar title="Distribuidores">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Todos los estados', value: undefined },
              { label: 'Activa', value: 'ACTIVA' },
              { label: 'Candidata', value: 'CANDIDATA' },
              { label: 'Posible', value: 'POSIBLE' },
              { label: 'Inactiva', value: 'INACTIVA' },
              { label: 'Morosa', value: 'MOROSA' },
              { label: 'Bloqueada', value: 'BLOQUEADA' },
              { label: 'Cerrada', value: 'CERRADA' }
            ]"
            placeholder="Estado"
            class="w-48"
            @update:model-value="page = 1; refresh()"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Buscar por código o nombre..."
          class="max-w-sm"
        />
      </div>

      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar las distribuidoras.
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
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-award" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay distribuidoras registradas con esos filtros
          </p>
        </div>

        <UTable
          v-else
          class="shrink-0"
          :data="items"
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
      </template>

      <div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto">
        <UPagination
          :model-value="page"
          :total="meta?.total ?? 0"
          :items-per-page="meta?.per_page ?? 15"
          @update:model-value="onPageChange"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
