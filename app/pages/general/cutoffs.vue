<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import GenerateCutoffModal from '~/components/cutoffs/GenerateCutoffModal.vue'
import RelationDetailModal from '~/components/cutoffs/RelationDetailModal.vue'
import { customerFullName } from '~/composables/useCustomers'
import type { Branch, Cutoff, CutoffRelation, CutoffStatus } from '~/types'

const toast = useToast()
const { user } = useAuth()
const { listBranches } = useBranches()
const { listCutoffs, getCutoff, reprocessCutoff, closeCutoff } = useReconciliations()

const canManage = computed(() => user.value?.permissions?.includes('cutoffs.manage') ?? false)
const isGeneralManager = computed(() => user.value?.permissions?.includes('branches.manage') ?? false)

const branchManagerBranchId = computed(() => {
  return user.value?.roles?.find(r => r.code === 'branch_manager' && r.branch_id !== null)?.branch_id ?? null
})

const { data: branches } = await useAsyncData<Branch[]>('cutoffs-branches', () => listBranches(), { default: () => [] })

const selectedBranchId = ref<number | undefined>(branchManagerBranchId.value ?? undefined)

watch([branchManagerBranchId, branches], () => {
  if (!selectedBranchId.value && branchManagerBranchId.value) {
    selectedBranchId.value = branchManagerBranchId.value
  }
}, { immediate: true })

function branchName(branchId: number) {
  return branches.value.find(b => b.id === branchId)?.name ?? `Sucursal ${branchId}`
}

const shortDate = new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short' })

// cutoff.period_start llega como fecha pura "YYYY-MM-DD" (sin hora): hay que
// armarla con año/mes/día locales en vez de dejar que Date la interprete
// como medianoche UTC, o se corre un día para atrás en México (mismo bug ya
// corregido en RelationDetailModal/ManualMatchModal). cutoff.scheduled_at
// (el fin del periodo) sí es un datetime ISO completo con offset, así que
// ese se puede pasar directo a Date.
function fmtPeriodStart(value: string | null | undefined): string {
  if (!value) return '?'
  const [year, month, day] = value.split('-').map(Number)
  return shortDate.format(new Date(year, month - 1, day))
}

function fmtPeriodEnd(value: string | null | undefined): string {
  if (!value) return '?'
  return shortDate.format(new Date(value))
}

const statusFilter = ref<CutoffStatus | undefined>(undefined)
const page = ref(1)

const { data: cutoffsData, status, refresh } = await useAsyncData(
  'cutoffs',
  () => listCutoffs({ page: page.value, status: statusFilter.value, branch_id: selectedBranchId.value }),
  {
    watch: [page, statusFilter, selectedBranchId],
    default: () => ({ data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 50, total: 0 } })
  }
)

// El filtro por sucursal ahora lo aplica el backend (branch_id): para un rol
// global (general_manager) ve cualquier sucursal que seleccione, no solo la
// suya -- antes esto se filtraba en cliente sobre un listado que el backend
// ya venía recortando a la sucursal del usuario sin importar su rol, así que
// elegir otra sucursal en el selector nunca mostraba nada.
watch(selectedBranchId, () => {
  page.value = 1
})

const items = computed(() => cutoffsData.value.data ?? [])
const meta = computed(() => cutoffsData.value.meta)

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

function fmtDate(value: string | null | undefined) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}

const statusColors: Record<CutoffStatus, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  PROGRAMADO: 'neutral',
  EJECUTADO: 'success',
  CERRADO: 'info',
  REPROCESADO: 'warning'
}

function statusColor(status: CutoffStatus | null | undefined) {
  return status ? (statusColors[status] ?? 'neutral') : 'neutral'
}

const isGenerateOpen = ref(false)

function openGenerate() {
  if (!selectedBranchId.value) {
    toast.add({
      title: 'Selecciona una sucursal',
      description: 'Elige la sucursal antes de generar un corte.',
      color: 'warning'
    })
    return
  }
  isGenerateOpen.value = true
}

function onGenerated() {
  page.value = 1
  refresh()
}

const isRelationsOpen = ref(false)
const relationsLoading = ref(false)
const activeCutoff = ref<Cutoff | null>(null)

async function openRelations(cutoff: Cutoff) {
  isRelationsOpen.value = true
  relationsLoading.value = true
  activeCutoff.value = null

  try {
    activeCutoff.value = await getCutoff(cutoff.id)
  } catch {
    toast.add({ title: 'Error', description: 'No se pudieron cargar las relaciones del corte.', color: 'error' })
    isRelationsOpen.value = false
  } finally {
    relationsLoading.value = false
  }
}

const isDetailOpen = ref(false)
const selectedRelation = ref<CutoffRelation | null>(null)

function openRelationDetail(relation: CutoffRelation) {
  selectedRelation.value = relation
  isDetailOpen.value = true
}

const reprocessingId = ref<number | null>(null)
const closingId = ref<number | null>(null)

async function refreshActiveCutoff(cutoffId: number) {
  if (isRelationsOpen.value && activeCutoff.value?.id === cutoffId) {
    activeCutoff.value = await getCutoff(cutoffId)
  }
}

async function onReprocess(cutoff: Cutoff) {
  reprocessingId.value = cutoff.id
  try {
    const updated = await reprocessCutoff(cutoff.id)
    const before = cutoff.relations_count ?? 0
    const after = updated.relations_count ?? updated.relations?.length ?? before
    const newCount = Math.max(0, after - before)
    toast.add({
      title: 'Corte reprocesado',
      description: newCount > 0
        ? `Se encontraron ${newCount} relación(es) nueva(s) en el corte #${cutoff.id}.`
        : `El corte #${cutoff.id} se revisó de nuevo; no hay relaciones nuevas.`,
      color: 'success'
    })
    await refresh()
    await refreshActiveCutoff(cutoff.id)
  } catch {
    toast.add({ title: 'Error', description: 'No se pudo reprocesar el corte.', color: 'error' })
  } finally {
    reprocessingId.value = null
  }
}

async function onClose(cutoff: Cutoff) {
  closingId.value = cutoff.id
  try {
    await closeCutoff(cutoff.id)
    toast.add({
      title: 'Corte cerrado',
      description: `El corte #${cutoff.id} quedó cerrado; las relaciones sin pagar quedaron vencidas.`,
      color: 'success'
    })
    await refresh()
    await refreshActiveCutoff(cutoff.id)
  } catch {
    toast.add({ title: 'Error', description: 'No se pudo cerrar el corte.', color: 'error' })
  } finally {
    closingId.value = null
  }
}

function canClose(cutoff: Cutoff | null | undefined) {
  return !!cutoff && canManage.value && cutoff.status !== 'PROGRAMADO' && cutoff.status !== 'CERRADO'
}

function getCutoffItems(cutoff: Cutoff): DropdownMenuItem[] {
  const menuItems: DropdownMenuItem[] = [
    {
      label: 'Ver relaciones',
      icon: 'i-lucide-list',
      onSelect: () => openRelations(cutoff)
    }
  ]

  if (canManage.value && cutoff.status !== 'REPROCESADO') {
    menuItems.push({
      label: 'Reprocesar',
      icon: 'i-lucide-refresh-cw',
      onSelect: () => onReprocess(cutoff)
    })
  }

  if (canClose(cutoff)) {
    menuItems.push({
      label: 'Cerrar corte',
      icon: 'i-lucide-lock',
      onSelect: () => onClose(cutoff)
    })
  }

  return menuItems
}
</script>

<template>
  <UDashboardPanel id="cutoffs">
    <template #header>
      <UDashboardNavbar title="Cortes y Relaciones">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <USelect
            v-if="isGeneralManager"
            v-model="selectedBranchId"
            :items="[{ label: 'Todas las sucursales', value: undefined }, ...branches.map(b => ({ label: b.name, value: b.id as number }))]"
            placeholder="Sucursal..."
            class="w-56"
          />
          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Todos los estados', value: undefined },
              { label: 'Programado', value: 'PROGRAMADO' },
              { label: 'Ejecutado', value: 'EJECUTADO' },
              { label: 'Cerrado', value: 'CERRADO' },
              { label: 'Reprocesado', value: 'REPROCESADO' }
            ]"
            placeholder="Estado"
            class="w-40"
          />
          <UButton
            v-if="canManage"
            label="Generar corte"
            icon="i-lucide-plus"
            color="primary"
            variant="solid"
            @click="openGenerate()"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="status === 'pending'" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="status === 'error'" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <UIcon name="i-lucide-triangle-alert" class="size-12 text-error" />
        <p class="text-sm text-muted">
          No se pudieron cargar los cortes.
        </p>
        <UButton label="Reintentar" icon="i-lucide-refresh-cw" color="primary" variant="solid" @click="refresh()" />
      </div>

      <div v-else class="flex h-full flex-col overflow-y-auto">
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
          <UIcon name="i-lucide-scroll-text" class="size-12 text-dimmed" />
          <p class="mt-2 text-sm text-muted">
            No hay cortes con esos filtros
          </p>
        </div>

        <div v-else class="divide-y divide-default">
          <div
            v-for="cutoff in items"
            :key="cutoff.id"
            class="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer hover:bg-elevated/50"
            @click="openRelations(cutoff)"
          >
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-md bg-elevated">
                <UIcon name="i-lucide-scroll-text" class="size-5 text-highlighted" />
              </div>

              <div class="min-w-0">
                <p class="truncate font-semibold text-highlighted">
                  Corte #{{ cutoff.id }} · {{ branchName(cutoff.branch_id) }} · {{ fmtPeriodStart(cutoff.period_start) }} – {{ fmtPeriodEnd(cutoff.scheduled_at) }}
                </p>
                <p class="text-xs text-muted">
                  {{ cutoff.cutoff_type ?? 'PAGOS' }} · Ejecutado {{ fmtDate(cutoff.executed_at) }}
                  <span v-if="!cutoff.executed_at"> · Programado {{ fmtDate(cutoff.scheduled_at) }}</span>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3" @click.stop>
              <span class="text-sm text-muted">
                {{ cutoff.relations_count ?? 0 }} relaciones
              </span>
              <span class="font-semibold text-highlighted">
                {{ money.format(Number(cutoff.total_amount_due ?? 0)) }}
              </span>
              <UBadge
                v-if="cutoff.status"
                :color="statusColor(cutoff.status)"
                variant="subtle"
                :label="cutoff.status"
              />

              <UDropdownMenu :items="getCutoffItems(cutoff)" :content="{ align: 'end' }">
                <UButton
                  icon="i-lucide-ellipsis-vertical"
                  color="neutral"
                  variant="ghost"
                  :loading="reprocessingId === cutoff.id || closingId === cutoff.id"
                  aria-label="Acciones"
                />
              </UDropdownMenu>
            </div>
          </div>
        </div>

        <div v-if="meta.last_page > 1" class="flex justify-end px-6 py-3 mt-auto">
          <UPagination v-model:page="page" :total="meta.total" :items-per-page="meta.per_page" />
        </div>
      </div>
    </template>
  </UDashboardPanel>

  <UModal
    v-model:open="isRelationsOpen"
    :title="activeCutoff ? `Relaciones del corte #${activeCutoff.id}` : 'Relaciones del corte'"
    :description="activeCutoff ? `${branchName(activeCutoff.branch_id)} · ${activeCutoff.status}` : undefined"
    :ui="{ content: 'max-w-3xl' }"
  >
    <template #body>
      <div v-if="relationsLoading" class="flex items-center justify-center py-12">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <template v-else>
        <div v-if="canClose(activeCutoff)" class="mb-4 flex justify-end">
          <UButton
            label="Cerrar corte"
            icon="i-lucide-lock"
            color="error"
            variant="soft"
            :loading="!!activeCutoff && closingId === activeCutoff.id"
            @click="activeCutoff && onClose(activeCutoff)"
          />
        </div>

        <div v-if="!activeCutoff?.relations?.length" class="py-12 text-center text-sm text-muted">
          Este corte no tiene relaciones generadas.
        </div>

        <div v-else class="divide-y divide-default">
          <div
            v-for="relation in activeCutoff.relations"
            :key="relation.id"
            class="flex cursor-pointer items-center justify-between gap-3 py-3 hover:bg-elevated/50"
            @click="openRelationDetail(relation)"
          >
            <div class="min-w-0">
              <p class="truncate font-medium text-highlighted">
                {{ relation.distributor?.person ? customerFullName(relation.distributor.person) : `Distribuidora #${relation.distributor_id}` }}
              </p>
              <p class="text-xs text-muted">
                {{ relation.relation_number }} · Ref: {{ relation.payment_reference ?? '—' }}
              </p>
            </div>

            <div class="flex items-center gap-3">
              <span class="font-semibold text-highlighted">
                {{ money.format(Number(relation.total_amount_due)) }}
              </span>
              <UBadge v-if="relation.status" variant="subtle" :label="relation.status" />
            </div>
          </div>
        </div>
      </template>
    </template>
  </UModal>

  <RelationDetailModal v-model:open="isDetailOpen" :relation="selectedRelation" />
  <GenerateCutoffModal
    v-model:open="isGenerateOpen"
    :branch-id="selectedBranchId"
    :branch-name="selectedBranchId ? branchName(selectedBranchId) : null"
    @generated="onGenerated"
  />
</template>
