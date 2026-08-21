<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { AuditLogItem } from '~/composables/useAuditLogs'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const { listAuditLogs } = useAuditLogs()

const search = ref('')
const level = ref('all')
const moduleFilter = ref('all')
const page = ref(1)

const isDetailOpen = ref(false)
const selectedLog = ref<AuditLogItem | null>(null)

function showDetails(log: AuditLogItem) {
  selectedLog.value = log
  isDetailOpen.value = true
}

const hasExtraData = computed(() => {
  const data = selectedLog.value?.extra_data
  if (!data) return false
  if (typeof data !== 'object') return true
  return Object.keys(data).length > 0
})

const levelItems = [
  { label: 'Todos los niveles', value: 'all' },
  { label: 'Info', value: 'INFO' },
  { label: 'Warning', value: 'WARNING' },
  { label: 'Error', value: 'ERROR' }
]

const moduleItems = [
  { label: 'Todos los módulos', value: 'all' },
  { label: 'Autenticación', value: 'auth' },
  { label: 'Vales', value: 'vouchers' },
  { label: 'Clientes', value: 'customers' },
  { label: 'Usuarios', value: 'users' },
  { label: 'Sucursales', value: 'branches' }
]

// Reset page to 1 when filters change to avoid empty pages
watch([search, level, moduleFilter], () => {
  page.value = 1
})

const { data, status, refresh } = await useAsyncData(
  'audit-logs',
  () => listAuditLogs({
    page: page.value,
    search: search.value || undefined,
    level: level.value !== 'all' ? level.value : undefined,
    module: moduleFilter.value !== 'all' ? moduleFilter.value : undefined
  }),
  {
    watch: [page, search, level, moduleFilter],
    default: () => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })
  }
)

const items = computed(() => data.value?.data ?? [])
const meta = computed(() => data.value?.meta ?? { current_page: 1, last_page: 1, per_page: 15, total: 0 })

const columns: TableColumn<AuditLogItem>[] = [
  {
    accessorKey: 'created_at',
    header: 'Fecha/Hora',
    cell: ({ row }) => {
      return new Date(row.original.created_at).toLocaleString('es-MX')
    }
  },
  {
    accessorKey: 'user_name',
    header: 'Usuario',
    cell: ({ row }) => {
      return h('div', [
        h('p', { class: 'font-medium text-highlighted' }, row.original.user_name || 'Sistema'),
        row.original.user_role ? h('p', { class: 'text-xs text-muted' }, row.original.user_role) : null
      ])
    }
  },
  {
    accessorKey: 'module',
    header: 'Módulo'
  },
  {
    accessorKey: 'event_type',
    header: 'Evento',
    cell: ({ row }) => {
      return h('code', { class: 'text-xs bg-muted px-1.5 py-0.5 rounded font-mono' }, row.original.event_type)
    }
  },
  {
    accessorKey: 'level',
    header: 'Nivel',
    cell: ({ row }) => {
      const level = row.original.level?.toLowerCase()
      const color = level === 'error' ? 'error' as const : level === 'warning' ? 'warning' as const : 'success' as const
      return h(UBadge, { variant: 'subtle', color, class: 'capitalize' }, () => level || 'info')
    }
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      return h('p', { class: 'max-w-md truncate text-xs text-dimmed', title: row.original.description }, row.original.description)
    }
  },
  {
    accessorKey: 'ip_address',
    header: 'IP'
  },
  {
    id: 'actions',
    header: 'Detalle',
    cell: ({ row }) => {
      return h(UButton, {
        icon: 'i-lucide-eye',
        color: 'neutral',
        variant: 'ghost',
        size: 'xs',
        onClick: () => showDetails(row.original)
      })
    }
  }
]
</script>

<template>
  <UDashboardPanel id="logs">
    <template #header>
      <UDashboardNavbar title="Bitácora de Auditoría">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UButton
            label="Actualizar"
            icon="i-lucide-refresh-cw"
            color="neutral"
            variant="ghost"
            :loading="status === 'pending'"
            @click="() => refresh()"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5 mb-4">
        <UInput
          v-model="search"
          class="max-w-sm w-full"
          icon="i-lucide-search"
          placeholder="Buscar registros..."
        />

        <div class="flex flex-wrap items-center gap-1.5">
          <USelect
            v-model="level"
            :items="levelItems"
            placeholder="Filtrar nivel"
            class="min-w-36"
          />
          <USelect
            v-model="moduleFilter"
            :items="moduleItems"
            placeholder="Filtrar módulo"
            class="min-w-44"
          />
        </div>
      </div>

      <div v-if="status === 'pending' && items.length === 0" class="flex items-center justify-center py-16">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-muted" />
      </div>

      <div v-else-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
        <UIcon name="i-lucide-history" class="size-12 text-dimmed" />
        <p class="mt-2 text-sm text-muted">
          No hay registros de bitácora
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

  <USlideover
    v-model:open="isDetailOpen"
    title="Detalles del Registro de Auditoría"
  >
    <template #body>
      <div v-if="selectedLog" class="space-y-4">
        <div>
          <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">Fecha / Hora</h4>
          <p class="text-sm text-highlighted mt-0.5">
            {{ selectedLog?.created_at ? new Date(selectedLog.created_at).toLocaleString('es-MX') : '' }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">Usuario</h4>
            <p class="text-sm text-highlighted mt-0.5 font-medium">{{ selectedLog?.user_name || 'Sistema' }}</p>
            <p v-if="selectedLog?.user_role" class="text-xs text-muted">{{ selectedLog.user_role }}</p>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">Módulo / Evento</h4>
            <p class="text-sm text-highlighted mt-0.5 font-medium capitalize">{{ selectedLog?.module }}</p>
            <p class="mt-0.5"><code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{{ selectedLog?.event_type }}</code></p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">Nivel</h4>
            <div class="mt-1">
              <UBadge
                variant="subtle"
                :color="selectedLog?.level?.toLowerCase() === 'error' ? 'error' : selectedLog?.level?.toLowerCase() === 'warning' ? 'warning' : 'success'"
                class="capitalize"
              >
                {{ selectedLog?.level || 'info' }}
              </UBadge>
            </div>
          </div>
          <div>
            <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">Dirección IP</h4>
            <p class="text-sm font-mono text-highlighted mt-0.5">{{ selectedLog?.ip_address || 'N/A' }}</p>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">User Agent (Navegador)</h4>
          <p class="text-xs text-dimmed mt-0.5 leading-relaxed">{{ selectedLog?.user_agent || 'N/A' }}</p>
        </div>

        <div>
          <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">Descripción</h4>
          <p class="text-sm text-highlighted mt-0.5 leading-relaxed">{{ selectedLog?.description }}</p>
        </div>

        <div v-if="hasExtraData">
          <h4 class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Datos Adicionales</h4>
          <pre class="font-mono text-[10px] bg-muted/60 dark:bg-muted/30 p-3 rounded-lg overflow-auto border border-default max-h-96 leading-tight">{{ JSON.stringify(selectedLog?.extra_data, null, 2) }}</pre>
        </div>
      </div>
    </template>
  </USlideover>
</template>
