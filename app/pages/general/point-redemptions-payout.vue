<script setup lang="ts">
import { computed, h, ref, watch } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { PointRedemption } from '~/types'

const UBadge = resolveComponent('UBadge')

const { listRedemptions } = usePointRedemptionPayouts()

const distributorNumber = ref('')
const page = ref(1)

watch(distributorNumber, () => {
  page.value = 1
})

const { data, status, refresh } = await useAsyncData(
  'point-redemptions-paid',
  () => listRedemptions({
    status: 'APROBADO',
    distributor_number: distributorNumber.value || undefined,
    page: page.value
  }),
  {
    watch: [distributorNumber, page],
    default: () => ({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const items = computed(() => data.value?.data ?? [])
const meta = computed(() => data.value?.meta ?? { current_page: 1, last_page: 1, per_page: 15, total: 0 })

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

const columns: TableColumn<PointRedemption>[] = [
  {
    accessorKey: 'folio',
    header: 'Folio',
    cell: ({ row }) => h('code', { class: 'text-xs bg-muted px-1.5 py-0.5 rounded font-mono' }, row.original.folio ?? '—')
  },
  {
    accessorKey: 'distributor',
    header: 'Distribuidora',
    cell: ({ row }) => row.original.distributor?.distributor_number ?? `#${row.original.distributor_id}`
  },
  {
    accessorKey: 'points',
    header: 'Puntos canjeados'
  },
  {
    accessorKey: 'amount_mxn',
    header: 'Monto entregado',
    cell: ({ row }) => money.format(Number(row.original.amount_mxn))
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => h(UBadge, { variant: 'subtle', color: 'success' }, () => row.original.status)
  },
  {
    accessorKey: 'decided_at',
    header: 'Fecha de pago',
    cell: ({ row }) => row.original.decided_at ? new Date(row.original.decided_at).toLocaleString('es-MX') : '—'
  }
]
</script>

<template>
  <UDashboardPanel id="point-redemptions-payout">
    <template #header>
      <UDashboardNavbar title="Canje de puntos">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <PointsPayoutByFolioModal @paid="refresh()" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="mb-4 flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="distributorNumber"
          class="max-w-sm w-full"
          icon="i-lucide-search"
          placeholder="Filtrar por número de distribuidora..."
        />
      </div>

      <div v-if="status === 'pending' && items.length === 0" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
        <UIcon name="i-lucide-ticket" class="size-12 text-dimmed" />
        <p class="mt-2 text-sm text-muted">
          No hay canjes de puntos pagados todavía
        </p>
      </div>

      <template v-else>
        <UTable
          :data="items"
          :columns="columns"
          :loading="status === 'pending'"
          class="shrink-0"
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
            v-model:page="page"
            :total="meta.total"
            :items-per-page="meta.per_page"
          />
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
