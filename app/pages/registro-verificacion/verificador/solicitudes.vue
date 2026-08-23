<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { applicantFullName, APPLICATION_STATUS_LABELS, type Application, type ApplicationStatus } from '~/composables/useApplications'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const { user } = useAuth()
const { listApplications } = useApplications()

const statusFilter = ref<ApplicationStatus | 'all'>('EN_REVISION')

const statusItems = [
  { label: 'Pendientes de verificación', value: 'EN_REVISION' },
  { label: 'Todas mis solicitudes', value: 'all' }
]

const { data: applications, status, refresh } = await useAsyncData<Application[]>(
  'verificador-solicitudes',
  async () => {
    const result = await listApplications({
      status: statusFilter.value === 'all' ? undefined : statusFilter.value,
      per_page: 100
    })
    return result.data
  },
  { watch: [statusFilter] }
)

const myApplications = computed(() => {
  const uid = user.value?.id
  return (applications.value ?? []).filter(app => app.assigned_verifier_id === uid)
})

const isDetailOpen = ref(false)
const selectedApplicationId = ref<number | null>(null)

function openDetail(app: Application) {
  selectedApplicationId.value = app.id
  isDetailOpen.value = true
}

const isVerifyOpen = ref(false)
const selectedApplication = ref<Application | null>(null)

function openVerify(app: Application) {
  selectedApplication.value = app
  isVerifyOpen.value = true
}

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

const columns: TableColumn<Application>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'applicant',
    header: 'Solicitante',
    cell: ({ row }) => h('div', { class: 'font-medium text-highlighted' }, applicantFullName(row.original.applicant))
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => row.original.applicant?.mobile_phone || row.original.applicant?.home_phone || '—'
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
      const color = value === 'POSIBLE_DISTRIBUIDORA'
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
    accessorKey: 'submitted_at',
    header: 'Fecha de envío',
    cell: ({ row }) => fmtDate(row.original.submitted_at)
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => h('div', { class: 'flex justify-end gap-2' }, [
      h(UButton, {
        label: 'Ver detalle',
        icon: 'i-lucide-eye',
        color: 'neutral',
        variant: 'subtle',
        size: 'xs',
        onClick: () => openDetail(row.original)
      }),
      row.original.status === 'EN_REVISION'
        ? h(UButton, {
            label: 'Verificar',
            icon: 'i-lucide-shield-check',
            color: 'primary',
            variant: 'solid',
            size: 'xs',
            onClick: () => openVerify(row.original)
          })
        : null
    ])
  }
]

async function onUpdatedOrVerified() {
  await refresh()
}
</script>

<template>
  <UDashboardPanel id="verificador-solicitudes">
    <template #header>
      <UDashboardNavbar title="Solicitudes">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-6 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-1.5">
          <h3 class="font-semibold text-base">
            Solicitudes de distribuidora
          </h3>

          <USelect
            v-model="statusFilter"
            :items="statusItems"
            class="min-w-56"
          />
        </div>

        <UTable
          :data="myApplications"
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
              No tienes solicitudes que coincidan con el filtro seleccionado.
            </div>
          </template>
        </UTable>
      </div>
    </template>
  </UDashboardPanel>

  <VerificadorApplicationDetailModal
    v-model:open="isDetailOpen"
    :application-id="selectedApplicationId"
    @updated="onUpdatedOrVerified"
  />
  <VerificadorVerifyModal
    v-model:open="isVerifyOpen"
    :application="selectedApplication"
    @verified="onUpdatedOrVerified"
  />
</template>
