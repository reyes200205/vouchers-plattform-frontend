<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/table-core'
import { applicantFullName, verifierDisplayName, APPLICATION_STATUS_LABELS } from '~/composables/useApplications'
import type { Application, ApplicationStatus } from '~/composables/useApplications'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { roleCode } = useAuth()
const isCoordinator = computed(() => roleCode.value === 'coordinator')

const { listApplications } = useApplications()
const toast = useToast()

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

        <div v-else-if="selectedTab === 'credit-increase'">
          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-hammer"
            title="Próximamente"
            description="El backend aún no expone los endpoints de incremento de crédito (POST /credit-increase-requests y /credit-increase-requests/{id}/pre-authorize). Este panel se habilitará cuando estén disponibles."
          />
        </div>

        <div v-else-if="selectedTab === 'vouchers'">
          <UAlert
            color="neutral"
            variant="subtle"
            icon="i-lucide-hammer"
            title="Próximamente"
            description="El backend aún no expone el endpoint de aprobación de vales (POST /voucher-requests/{voucherRequest}/approve). Esta pantalla se habilitará cuando esté disponible."
          />
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
