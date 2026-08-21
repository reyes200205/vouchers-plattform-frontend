<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { PendingVoucherRequest } from '~/types'

const UBadge = resolveComponent('UBadge')

const { listPendingVoucherRequests } = useVouchers()

const page = ref(1)

const { data, status, error, refresh } = await useAsyncData(
  'voucher-requests',
  () => listPendingVoucherRequests({ page: page.value }),
  {
    watch: [page],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const items = computed(() => data.value.data ?? [])
const meta = computed(() => data.value.meta)
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

function onPageChange(nextPage: number) {
  page.value = nextPage
}

async function onDecided() {
  await refresh()
}

const columns: TableColumn<PendingVoucherRequest>[] = [
  {
    accessorKey: 'distributor',
    header: 'Distribuidora',
    cell: ({ row }) => h('div', { class: 'min-w-0' }, [
      h('p', { class: 'truncate font-medium text-highlighted' }, row.original.distributor_name || `#${row.original.distributor_id}`),
      h('p', { class: 'truncate text-xs text-muted' }, [row.original.distributor_number, row.original.branch_name].filter(Boolean).join(' · '))
    ])
  },
  {
    accessorKey: 'customer',
    header: 'Cliente',
    cell: ({ row }) => h('div', { class: 'min-w-0' }, [
      h('p', { class: 'truncate font-medium text-highlighted' }, row.original.customer_name || 'Cliente'),
      h('p', { class: 'truncate text-xs text-muted' }, row.original.customer_code || '')
    ])
  },
  {
    accessorKey: 'financial_product_name',
    header: 'Producto',
    cell: ({ row }) => row.original.financial_product_name ?? '—'
  },
  {
    accessorKey: 'requested_amount',
    header: 'Monto solicitado',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-2' }, [
      h('span', { class: 'font-semibold text-highlighted' }, money.format(Number(row.original.requested_amount))),
      row.original.is_pre_vale
        ? h(UBadge, { color: 'warning', variant: 'subtle', label: 'Pre-vale', size: 'sm' })
        : null
    ])
  },
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) => fmtDate(row.original.created_at)
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, [
      h(resolveComponent('VouchersDecideVoucherRequestModal'), { item: row.original, onDecided })
    ])
  }
]
</script>

<template>
  <UDashboardPanel id="voucher-requests">
    <template #header>
      <UDashboardNavbar title="Solicitudes de vale" />
    </template>

    <template #body>
      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar las solicitudes de vale.
        </p>
        <p v-if="error" class="max-w-md font-mono text-xs text-dimmed">
          {{ (error as any)?.statusCode ? `HTTP ${(error as any).statusCode}` : '' }} {{ (error as any)?.data?.message ?? '' }}
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
          <UIcon name="i-lucide-clipboard-list" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay solicitudes de vale pendientes
          </p>
        </div>

        <UTable
          v-else
          class="shrink-0"
          :data="items"
          :columns="columns"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default',
            separator: 'h-0'
          }"
        />

        <div v-if="meta.last_page > 1" class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto">
          <UPagination
            :model-value="page"
            :total="meta.total"
            :items-per-page="meta.per_page"
            @update:model-value="onPageChange"
          />
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
