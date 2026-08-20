<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/table-core'
import type { Customer, CustomerStatus } from '~/types'

const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

const toast = useToast()
const { user } = useAuth()
const { listCustomers } = useCustomers()

const canVerify = computed(() => user.value?.permissions?.includes('customers.verify') ?? false)
const canRequestChange = computed(() => user.value?.permissions?.includes('customers.update.request') ?? false)

const statusFilter = ref<CustomerStatus | undefined>(undefined)
const verifiedFilter = ref<'all' | 'yes' | 'no'>('all')
const q = ref('')
const page = ref(1)

const { data, status, refresh } = await useAsyncData(
  'customers',
  () => listCustomers({
    status: statusFilter.value,
    verified: verifiedFilter.value === 'all' ? undefined : verifiedFilter.value === 'yes',
    page: page.value,
    per_page: 15
  }),
  {
    watch: [statusFilter, verifiedFilter, page],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const items = computed(() => data.value?.data ?? [])
const meta = computed(() => data.value?.meta)

const filteredItems = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return items.value

  return items.value.filter((customer) => {
    const person = customer.person
    const fullName = [person?.first_name, person?.middle_name, person?.last_name, person?.second_last_name].filter(Boolean).join(' ').toLowerCase()
    return fullName.includes(query)
      || customer.customer_code.toLowerCase().includes(query)
      || (person?.curp ?? '').toLowerCase().includes(query)
      || (person?.mobile_phone ?? '').toLowerCase().includes(query)
  })
})

function fullName(customer: Customer) {
  const person = customer.person
  return [person?.first_name, person?.middle_name, person?.last_name, person?.second_last_name].filter(Boolean).join(' ') || 'Sin nombre'
}

const statusColors: Record<CustomerStatus, 'success' | 'warning' | 'error' | 'neutral'> = {
  ACTIVO: 'success',
  EN_VERIFICACION: 'warning',
  BLOQUEADO: 'error',
  MOROSO: 'error',
  INACTIVO: 'neutral'
}

function onPageChange(nextPage: number) {
  page.value = nextPage
}

function refreshList() {
  refresh()
}

const columns: TableColumn<Customer>[] = [
  {
    accessorKey: 'customer_code',
    header: 'Código'
  },
  {
    accessorKey: 'person',
    header: 'Cliente',
    cell: ({ row }) => {
      const person = row.original.person
      return h('div', { class: 'min-w-0' }, [
        h('p', { class: 'truncate font-medium text-highlighted' }, fullName(row.original)),
        h('p', { class: 'truncate text-xs text-muted' }, person?.curp || person?.mobile_phone || '')
      ])
    }
  },
  {
    accessorKey: 'branch',
    header: 'Sucursal',
    cell: ({ row }) => row.original.branch?.name ?? '—'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => h(UBadge, {
      color: statusColors[row.original.status],
      variant: 'subtle',
      label: row.original.status
    })
  },
  {
    accessorKey: 'verified_at',
    header: 'Verificado',
    cell: ({ row }) => {
      if (!row.original.verified_at) {
        return h(UBadge, { color: 'warning', variant: 'subtle', label: 'Sin verificar' })
      }
      const date = new Date(row.original.verified_at)
      return h(UBadge, {
        color: 'success',
        variant: 'subtle',
        label: date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
      })
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const rowCustomer = row.original
      const actionItems = []

      if (canVerify.value && !rowCustomer.verified_at) {
        actionItems.push({
          key: 'verify',
          label: 'Verificar',
          icon: 'i-lucide-badge-check',
          onSelect() {
            selectedVerification.value = rowCustomer
          }
        })
      }

      if (canRequestChange.value) {
        actionItems.push({
          key: 'change',
          label: 'Solicitar cambio de datos',
          icon: 'i-lucide-file-pen-line',
          onSelect() {
            selectedChangeRequest.value = rowCustomer
          }
        })
      }

      actionItems.push({
        key: 'details',
        label: 'Detalles',
        icon: 'i-lucide-eye',
        onSelect() {
          selectedDetails.value = rowCustomer
        }
      })

      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items: actionItems
          },
          () => h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            class: 'ml-auto'
          })
        )
      )
    }
  }
]

const selectedVerification = ref<Customer | null>(null)
const selectedChangeRequest = ref<Customer | null>(null)
const selectedDetails = ref<Customer | null>(null)
</script>

<template>
  <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Clientes">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-model="verifiedFilter"
            :items="[
              { label: 'Todas', value: 'all' },
              { label: 'Verificadas', value: 'yes' },
              { label: 'Sin verificar', value: 'no' }
            ]"
            placeholder="Verificación"
            class="w-40"
          />
          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Todos los estados', value: undefined },
              { label: 'Activo', value: 'ACTIVO' },
              { label: 'En verificación', value: 'EN_VERIFICACION' },
              { label: 'Bloqueado', value: 'BLOQUEADO' },
              { label: 'Moroso', value: 'MOROSO' },
              { label: 'Inactivo', value: 'INACTIVO' }
            ]"
            placeholder="Estado"
            class="w-40"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="q"
          icon="i-lucide-search"
          placeholder="Buscar por nombre, código, CURP o teléfono..."
          class="max-w-sm"
        />
      </div>

      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar los clientes.
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
            No hay clientes con esos filtros
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
      </template>

      <div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto">
        <UPagination
          :model-value="page"
          :total="meta?.total ?? 0"
          :items-per-page="meta?.per_page ?? 15"
          @update:model-value="onPageChange"
        />
      </div>

      <CustomersCustomerDetailsModal
        v-if="selectedDetails"
        :customer="selectedDetails"
        :open="true"
        @update:open="(open: boolean) => { if (!open) selectedDetails = null }"
      />

      <CustomersVerifyCustomerModal
        v-if="selectedVerification"
        :customer="selectedVerification"
        :open="true"
        @update:open="(open: boolean) => { if (!open) selectedVerification = null }"
        @verified="refreshList(); selectedVerification = null"
      />

      <CustomersChangeCustomerRequestModal
        v-if="selectedChangeRequest"
        :customer="selectedChangeRequest"
        :open="true"
        @update:open="(open: boolean) => { if (!open) selectedChangeRequest = null }"
        @changed="selectedChangeRequest = null"
      />
    </template>
  </UDashboardPanel>
</template>