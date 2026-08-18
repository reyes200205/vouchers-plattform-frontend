<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { applicantFullName, APPLICATION_STATUS_LABELS } from '~/composables/useApplications'
import type { Application } from '~/composables/useApplications'

const UBadge = resolveComponent('UBadge')

const { user, roleCode } = useAuth()
const { listApplications } = useApplications()
const { listNotifications, markNotificationAsRead } = useNotifications()

const isCoordinator = computed(() => roleCode.value === 'coordinator')
const isVerifier = computed(() => roleCode.value === 'verifier')

const { data: applications, status } = await useAsyncData<Application[]>(
  'registro-verificacion-home-applications',
  async () => {
    if (!isCoordinator.value && !isVerifier.value) return []

    const result = await listApplications({ per_page: 100 })
    return result.data
  },
  { watch: [roleCode] }
)

const list = computed(() => applications.value ?? [])

const createdByMe = computed(() =>
  list.value.filter(a => a.coordinator_user_id === user.value?.id).length
)
const pendingVerifierAssignment = computed(() =>
  list.value.filter(a => a.status === 'EN_REVISION' && !a.assigned_verifier_id).length
)
const approved = computed(() =>
  list.value.filter(a => a.status === 'APROBADA').length
)

const pendingFieldVisit = computed(() =>
  list.value.filter(a => a.assigned_verifier_id === user.value?.id && a.status === 'EN_REVISION').length
)

const recentApplications = computed(() => list.value.slice(0, 5))

const isNotificationsOpen = ref(false)

const { data: notifications, status: notificationsStatus, refresh: refreshNotifications } = await useAsyncData(
  'coordinador-notifications',
  () => listNotifications({ per_page: 20 }),
  { default: () => [] }
)

const unreadCount = computed(() => (notifications.value ?? []).filter(n => !n.read_at).length)

async function markAsRead(id: string) {
  const notification = (notifications.value ?? []).find(item => item.id === id)
  if (!notification || notification.read_at) return

  try {
    await markNotificationAsRead(id)
    await refreshNotifications()
  } catch (e) {
    console.error(e)
  }
}

const columns: TableColumn<Application>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'applicant',
    header: 'Solicitante',
    cell: ({ row }) => applicantFullName(row.original.applicant)
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
      const status = row.original.status
      const color = status === 'APROBADA'
        ? 'success'
        : status === 'RECHAZADA'
          ? 'error'
          : status === 'EN_REVISION'
            ? 'warning'
            : 'neutral'

      return h(UBadge, { variant: 'subtle', color }, () => APPLICATION_STATUS_LABELS[status] ?? status)
    }
  }
]
</script>

<template>
  <UDashboardPanel id="register-distributors-home">
    <template #header>
      <UDashboardNavbar title="Registro y Verificación" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            v-if="isCoordinator"
            label="Nueva solicitud"
            icon="i-lucide-user-plus"
            to="/registro-verificacion/new"
          />

          <UTooltip text="Notificaciones">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsOpen = true"
            >
              <UChip color="error" :show="unreadCount > 0" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="isCoordinator" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-file-plus" class="size-5 text-primary" />
                <h3 class="font-semibold text-sm text-dimmed">
                  Solicitudes Creadas por Mí
                </h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">
              {{ createdByMe }}
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-user-search" class="size-5 text-warning" />
                <h3 class="font-semibold text-sm text-dimmed">
                  Pendientes de Asignar Verificador
                </h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">
              {{ pendingVerifierAssignment }}
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-badge-check" class="size-5 text-success" />
                <h3 class="font-semibold text-sm text-dimmed">
                  Solicitudes Aprobadas
                </h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">
              {{ approved }}
            </div>
          </UCard>
        </div>

        <UCard class="mt-6">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-base">
                Últimas Solicitudes
              </h3>
              <UButton
                label="Ver bandeja completa"
                variant="subtle"
                icon="i-lucide-inbox"
                to="/registro-verificacion/list"
              />
            </div>
          </template>

          <UTable :data="recentApplications" :columns="columns" :loading="status === 'pending'">
            <template #empty>
              <div class="text-sm text-center py-8 text-dimmed">
                No hay solicitudes registradas recientemente.
              </div>
            </template>
          </UTable>
        </UCard>
      </div>

      <div v-else-if="isVerifier" class="p-6 space-y-6">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-shield-check" class="size-5 text-warning" />
              <h3 class="font-semibold text-sm text-dimmed">
                Asignadas Pendientes de Visita Física
              </h3>
            </div>
          </template>
          <div class="text-3xl font-bold mt-2">
            {{ pendingFieldVisit }}
          </div>
        </UCard>

        <UAlert
          color="neutral"
          variant="subtle"
          icon="i-lucide-hammer"
          title="Panel del Verificador en construcción"
          description="Esta sección corresponde al flujo del rol Verificador y se completará en la tarea asignada a ese rol."
        />
      </div>

      <div v-else class="p-6">
        <UAlert
          color="neutral"
          variant="subtle"
          icon="i-lucide-info"
          title="Sin métricas disponibles"
          description="Tu rol actual no tiene un panel configurado en el portal de Registro y Verificación."
        />
      </div>
    </template>
  </UDashboardPanel>

  <VerificadorNotificationsSlideover
    v-model:open="isNotificationsOpen"
    :notifications="notifications ?? []"
    :loading="notificationsStatus === 'pending'"
    @read="markAsRead"
  />
</template>
