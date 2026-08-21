<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/table-core'
import { applicantFullName, verifierDisplayName, APPLICATION_STATUS_LABELS } from '~/composables/useApplications'
import type { Application, ApplicationStatus } from '~/composables/useApplications'
import type { PendingVoucherRequest } from '~/types'
import type { CreditIncreaseRequest, CreditIncreaseRequestStatus } from '~/composables/useCreditIncrease'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { roleCode, user } = useAuth()
const isCoordinator = computed(() => roleCode.value === 'coordinator')
const canApproveVouchers = computed(() => user.value?.permissions?.includes('vouchers.approve') ?? false)
const canPreAuthorizeCredit = computed(() => user.value?.permissions?.includes('credit-increase.pre-authorize') ?? false)

const { listApplications } = useApplications()
const { listPendingVoucherRequests } = useVouchers()
const { listCreditIncreaseRequests } = useCreditIncrease()
const toast = useToast()
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusFilter = ref<ApplicationStatus | 'all'>('all')

const { data: applications, status, refresh } = await useAsyncData<Application[]>(
  'registro-verificacion-list-applications',
  async () => {
    if (!isCoordinator.value) return []

    const result = await listApplications({
      per_page: 100,
      status: statusFilter.value === 'all' ? undefined : statusFilter.value
    })
    return result.data
  },
  { watch: [statusFilter] }
)

const isAssignOpen = ref(false)
const selectedApplication = ref<Application | null>(null)

function openAssignModal(application: Application) {
  selectedApplication.value = application
  isAssignOpen.value = true
}

function getRowItems(row: Row<Application>): DropdownMenuItem[] {
  const items: DropdownMenuItem[] = [{ type: 'label', label: 'Acciones' }]

  if (!row.original.assigned_verifier_id && row.original.status === 'EN_REVISION') {
    items.push({
      label: 'Asignar verificador',
      icon: 'i-lucide-user-plus',
      onSelect: () => openAssignModal(row.original)
    })
  }

  items.push({
    type: 'separator'
  }, {
    label: 'Copiar ID de solicitud',
    icon: 'i-lucide-copy',
    onSelect() {
      navigator.clipboard.writeText(row.original.id.toString())
      toast.add({ title: 'Copiado', description: 'ID de solicitud copiado al portapapeles' })
    }
  })

  return items
}

const columns: TableColumn<Application>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'applicant',
    header: 'Solicitante',
    cell: ({ row }) => h('div', { class: 'font-medium text-highlighted' }, applicantFullName(row.original.applicant))
  },
  {
    accessorKey: 'branch',
    header: 'Sucursal',
    cell: ({ row }) => row.original.branch?.name ?? '—'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const value = row.original.status
      const color = value === 'APROBADA'
        ? 'success'
        : value === 'RECHAZADA'
          ? 'error'
          : value === 'EN_REVISION'
            ? 'warning'
            : 'neutral'

      return h(UBadge, { variant: 'subtle', color }, () => APPLICATION_STATUS_LABELS[value] ?? value)
    }
  },
  {
    accessorKey: 'assigned_verifier',
    header: 'Verificador',
    cell: ({ row }) => {
      const name = verifierDisplayName(row.original.assigned_verifier)
      return name ? name : h('span', { class: 'text-dimmed' }, 'Sin asignar')
    }
  },
  {
    accessorKey: 'submitted_at',
    header: 'Fecha de envío',
    cell: ({ row }) => row.original.submitted_at ? new Date(row.original.submitted_at).toLocaleDateString('es-MX') : '—'
  },
  {
    id: 'actions',
    cell: ({ row }) => h(
      'div',
      { class: 'text-right' },
      h(UDropdownMenu, { content: { align: 'end' }, items: getRowItems(row) }, () =>
        h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', class: 'ml-auto' })
      )
    )
  }
]

const statusItems = [
  { label: 'Todos', value: 'all' },
  { label: 'En revisión', value: 'EN_REVISION' },
  { label: 'Posible distribuidora', value: 'POSIBLE_DISTRIBUIDORA' },
  { label: 'Aprobada', value: 'APROBADA' },
  { label: 'Rechazada', value: 'RECHAZADA' }
]

const tabItems = [
  { label: 'Solicitudes de Distribuidora', value: 'applications', icon: 'i-lucide-file-text' },
  { label: 'Incrementos de Crédito', value: 'credit-increase', icon: 'i-lucide-trending-up' },
  { label: 'Vales Digitales', value: 'vouchers', icon: 'i-lucide-ticket' }
]
const selectedTab = ref('applications')

// Tab "Vales Digitales": solicitudes de vale (pre-issue) pendientes de
// aprobar/rechazar (GET /voucher-requests, ya filtrado por sucursal del
// coordinador en el backend). Usa el mismo modal que la pantalla equivalente
// del gerente general (general/voucher-requests.vue).
const voucherRequestsPage = ref(1)

const { data: voucherRequestsData, status: voucherRequestsStatus, refresh: refreshVoucherRequests } = await useAsyncData(
  'registro-verificacion-coordinador-voucher-requests',
  async () => {
    if (!isCoordinator.value || !canApproveVouchers.value) {
      return { data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } }
    }
    return listPendingVoucherRequests({ page: voucherRequestsPage.value })
  },
  { watch: [voucherRequestsPage], default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } }) }
)

const voucherRequests = computed(() => voucherRequestsData.value.data ?? [])
const voucherRequestsMeta = computed(() => voucherRequestsData.value.meta)

async function onVoucherRequestDecided() {
  await refreshVoucherRequests()
}

const voucherRequestColumns: TableColumn<PendingVoucherRequest>[] = [
  {
    accessorKey: 'distributor',
    header: 'Distribuidora',
    cell: ({ row }) => h('div', { class: 'min-w-0' }, [
      h('p', { class: 'truncate font-medium text-highlighted' }, row.original.distributor_name || `#${row.original.distributor_id}`),
      h('p', { class: 'truncate text-xs text-muted' }, row.original.distributor_number || '')
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
      h(resolveComponent('VouchersDecideVoucherRequestModal'), { item: row.original, onDecided: onVoucherRequestDecided })
    ])
  }
]

// Tab "Incrementos de Crédito": listado real de solicitudes (GET
// /credit-increase-requests, misma habilidad "credit-increase.view" que
// tiene el coordinador) con pre-autorización (POST
// /credit-increase-requests/{id}/pre-authorize). Crear una solicitud nueva
// (POST /credit-increase-requests) requiere elegir una distribuidora, pero
// el backend todavia no expone un endpoint para listar/buscar distribuidoras
// desde este rol, asi que esa accion se deja pendiente.
const creditIncreaseStatusFilter = ref<CreditIncreaseRequestStatus | 'all'>('all')
const creditIncreasePage = ref(1)

const { data: creditIncreaseData, status: creditIncreaseStatus, refresh: refreshCreditIncrease } = await useAsyncData(
  'registro-verificacion-coordinador-credit-increase',
  async () => {
    if (!isCoordinator.value) {
      return { data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } }
    }
    return listCreditIncreaseRequests({
      page: creditIncreasePage.value,
      status: creditIncreaseStatusFilter.value === 'all' ? undefined : creditIncreaseStatusFilter.value
    })
  },
  { watch: [creditIncreaseStatusFilter, creditIncreasePage], default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } }) }
)

const creditIncreaseRequests = computed(() => creditIncreaseData.value.data ?? [])
const creditIncreaseMeta = computed(() => creditIncreaseData.value.meta)

async function onCreditIncreasePreAuthorized() {
  await refreshCreditIncrease()
}

const creditIncreaseStatusColors: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  PENDIENTE: 'warning',
  PRE_AUTORIZADO: 'info',
  APROBADO: 'success',
  REDUCIDO: 'success',
  RECHAZADO: 'error',
  CANCELADO: 'neutral'
}

const creditIncreaseStatusItems = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendiente', value: 'PENDIENTE' },
  { label: 'Pre-autorizado', value: 'PRE_AUTORIZADO' },
  { label: 'Aprobado', value: 'APROBADO' },
  { label: 'Reducido', value: 'REDUCIDO' },
  { label: 'Rechazado', value: 'RECHAZADO' },
  { label: 'Cancelado', value: 'CANCELADO' }
]

const creditIncreaseColumns: TableColumn<CreditIncreaseRequest>[] = [
  {
    accessorKey: 'distributor',
    header: 'Distribuidora',
    cell: ({ row }) => row.original.distributor ? `#${row.original.distributor.distributor_number}` : `#${row.original.distributor_id}`
  },
  {
    accessorKey: 'requested_amount',
    header: 'Monto solicitado',
    cell: ({ row }) => money.format(Number(row.original.requested_amount))
  },
  {
    accessorKey: 'pre_authorized_amount',
    header: 'Monto pre-autorizado',
    cell: ({ row }) => row.original.pre_authorized_amount ? money.format(Number(row.original.pre_authorized_amount)) : '—'
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
    cell: ({ row }) => row.original.reason ?? '—'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => h(UBadge, { variant: 'subtle', color: creditIncreaseStatusColors[row.original.status] ?? 'neutral' }, () => row.original.status)
  },
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row }) => fmtDate(row.original.created_at)
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, [
      row.original.status === 'PENDIENTE' && canPreAuthorizeCredit.value
        ? h(resolveComponent('CreditIncreasePreAuthorizeModal'), { item: row.original, onPreAuthorized: onCreditIncreasePreAuthorized })
        : null
    ])
  }
]
</script>

<template>
  <UDashboardPanel id="register-distributors-list">
    <template #header>
      <UDashboardNavbar title="Bandeja de Coordinación">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="!isCoordinator" class="p-6">
        <UAlert
          color="warning"
          variant="subtle"
          icon="i-lucide-lock"
          title="Acceso restringido"
          description="Solo el rol Coordinador puede acceder a la bandeja de coordinación."
        />
      </div>

      <div v-else class="p-6 space-y-6">
        <UTabs v-model="selectedTab" :items="tabItems" />

        <div v-if="selectedTab === 'applications'" class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-1.5">
            <h3 class="font-semibold text-base">
              Solicitudes Activas
            </h3>

            <USelect
              v-model="statusFilter"
              :items="statusItems"
              placeholder="Filtrar estado"
              class="min-w-48"
            />
          </div>

          <UTable
            :data="applications ?? []"
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
          >
            <template #empty>
              <div class="text-sm text-center py-8 text-dimmed">
                No hay solicitudes que coincidan con el filtro seleccionado.
              </div>
            </template>
          </UTable>
        </div>

        <div v-else-if="selectedTab === 'credit-increase'" class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-1.5">
            <h3 class="font-semibold text-base">
              Solicitudes de Incremento de Crédito
            </h3>

            <div class="flex items-center gap-2">
              <USelect
                v-model="creditIncreaseStatusFilter"
                :items="creditIncreaseStatusItems"
                placeholder="Filtrar estado"
                class="min-w-48"
              />

              <CreditIncreaseRequestModal @requested="refreshCreditIncrease" />
            </div>
          </div>

          <UTable
            :data="creditIncreaseRequests"
            :columns="creditIncreaseColumns"
            :loading="creditIncreaseStatus === 'pending'"
            :ui="{
              base: 'table-fixed border-separate border-spacing-0',
              thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
              tbody: '[&>tr]:last:[&>td]:border-b-0',
              th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
              td: 'border-b border-default',
              separator: 'h-0'
            }"
          >
            <template #empty>
              <div class="text-sm text-center py-8 text-dimmed">
                No hay solicitudes de incremento de crédito que coincidan con el filtro seleccionado.
              </div>
            </template>
          </UTable>

          <div v-if="creditIncreaseMeta.last_page > 1" class="flex items-center justify-end gap-3 pt-2">
            <UPagination
              v-model:page="creditIncreasePage"
              :total="creditIncreaseMeta.total"
              :items-per-page="creditIncreaseMeta.per_page"
            />
          </div>
        </div>

        <div v-else-if="selectedTab === 'vouchers'" class="space-y-4">
          <h3 class="font-semibold text-base">
            Solicitudes de Vale Pendientes
          </h3>

          <UAlert
            v-if="!canApproveVouchers"
            color="warning"
            variant="subtle"
            icon="i-lucide-lock"
            title="Sin permiso"
            description="Tu usuario no tiene la habilidad vouchers.approve necesaria para ver estas solicitudes."
          />

          <UTable
            v-else
            :data="voucherRequests"
            :columns="voucherRequestColumns"
            :loading="voucherRequestsStatus === 'pending'"
            :ui="{
              base: 'table-fixed border-separate border-spacing-0',
              thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
              tbody: '[&>tr]:last:[&>td]:border-b-0',
              th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
              td: 'border-b border-default',
              separator: 'h-0'
            }"
          >
            <template #empty>
              <div class="text-sm text-center py-8 text-dimmed">
                No hay solicitudes de vale pendientes.
              </div>
            </template>
          </UTable>

          <div v-if="canApproveVouchers && voucherRequestsMeta.last_page > 1" class="flex items-center justify-end gap-3 pt-2">
            <UPagination
              v-model:page="voucherRequestsPage"
              :total="voucherRequestsMeta.total"
              :items-per-page="voucherRequestsMeta.per_page"
            />
          </div>
        </div>

        <ApplicationsAssignVerifierModal
          v-model:open="isAssignOpen"
          :application="selectedApplication"
          @assigned="refresh"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
