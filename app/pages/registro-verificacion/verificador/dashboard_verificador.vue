<script setup lang="ts">
import type { Application } from '~/types'

const { user } = useAuth()
const { listApplications } = useApplications()
const { listNotifications, markNotificationAsRead } = useNotifications()

const { data: applications, status, refresh } = await useAsyncData<Application[]>(
  'verificador-applications',
  () => listApplications({ status: 'EN_REVISION', per_page: 100 })
)

const myApplications = computed(() => {
  const uid = user.value?.id
  return (applications.value ?? []).filter(app => app.assigned_verifier_id === uid)
})

function applicantName(app: Application) {
  const p = app.applicant
  if (!p) return 'Solicitante'
  return [p.first_name, p.last_name].filter(Boolean).join(' ')
}

function applicantAddress(app: Application) {
  const p = app.applicant
  if (!p) return '—'
  return [p.street, p.external_number, p.neighborhood, p.city].filter(Boolean).join(', ') || '—'
}

const isVerifyOpen = ref(false)
const selectedApplication = ref<Application | null>(null)

function openVerify(app: Application) {
  selectedApplication.value = app
  isVerifyOpen.value = true
}

const isNotificationsOpen = ref(false)

const { data: notifications, status: notificationsStatus, refresh: refreshNotifications } = await useAsyncData(
  'verificador-notifications',
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

const stats = computed(() => {
  const pending = myApplications.value.length
  const verifiedToday = myApplications.value.filter((app) => {
    return app.verification?.result === 'VERIFICADA'
      && app.reviewed_at
      && new Date(app.reviewed_at).toDateString() === new Date().toDateString()
  }).length
  const rejectedToday = myApplications.value.filter((app) => {
    return app.verification?.result === 'RECHAZADA'
      && app.reviewed_at
      && new Date(app.reviewed_at).toDateString() === new Date().toDateString()
  }).length

  return { pending, verifiedToday, rejectedToday }
})
</script>

<template>
  <UDashboardPanel id="verificador-dashboard">
    <template #header>
      <UDashboardNavbar title="Panel Verificador" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
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
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-clock" class="size-5 text-warning" />
                <h3 class="font-semibold text-sm text-dimmed">
                  Pendientes de Verificación
                </h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">
              {{ stats.pending }}
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-circle-check" class="size-5 text-success" />
                <h3 class="font-semibold text-sm text-dimmed">
                  Verificadas Hoy
                </h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">
              {{ stats.verifiedToday }}
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-circle-x" class="size-5 text-error" />
                <h3 class="font-semibold text-sm text-dimmed">
                  Rechazadas Hoy
                </h3>
              </div>
            </template>
            <div class="text-3xl font-bold mt-2">
              {{ stats.rejectedToday }}
            </div>
          </UCard>
        </div>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-base">
                Solicitudes asignadas por verificar
              </h3>
              <UButton
                label="Actualizar"
                icon="i-lucide-refresh-cw"
                color="neutral"
                variant="subtle"
                :loading="status === 'pending'"
                @click="refresh()"
              />
            </div>
          </template>

          <div v-if="status === 'pending'" class="text-sm text-center py-8 text-dimmed">
            Cargando solicitudes...
          </div>

          <div v-else-if="!myApplications.length" class="text-sm text-center py-8 text-dimmed">
            No tienes solicitudes asignadas pendientes de verificación.
          </div>

          <ul v-else class="divide-y divide-default">
            <li
              v-for="app in myApplications"
              :key="app.id"
              class="py-3 flex items-center justify-between gap-4"
            >
              <div class="min-w-0">
                <p class="font-medium text-highlighted truncate">
                  {{ applicantName(app) }}
                </p>
                <p class="text-sm text-dimmed truncate">
                  {{ applicantAddress(app) }}
                </p>
                <p class="text-xs text-dimmed mt-1">
                  Sucursal: {{ app.branch?.name ?? '—' }}
                </p>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <UBadge color="warning" variant="subtle">
                  En revisión
                </UBadge>
                <UButton
                  label="Verificar"
                  icon="i-lucide-shield-check"
                  color="primary"
                  variant="solid"
                  @click="openVerify(app)"
                />
              </div>
            </li>
          </ul>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>

  <VerificadorVerifyModal v-model:open="isVerifyOpen" :application="selectedApplication" @verified="refresh" />
  <VerificadorNotificationsSlideover
    v-model:open="isNotificationsOpen"
    :notifications="notifications ?? []"
    :loading="notificationsStatus === 'pending'"
    @read="markAsRead"
  />
</template>
