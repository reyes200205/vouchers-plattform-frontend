<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { AuditLogItem } from "~/composables/useAuditLogs";
import type { Branch } from "~/types";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const { listAuditLogs } = useAuditLogs();
const { listBranches } = useBranches();
const { listStaff } = useStaff();
const { user } = useAuth();

const isBranchManager = computed(
  () => user.value?.roles?.some((r) => r.code === "branch_manager") ?? false,
);
const branchManagerBranchId = computed(() => {
  return (
    user.value?.roles?.find(
      (r) => r.code === "branch_manager" && r.branch_id !== null,
    )?.branch_id ?? null
  );
});

const { data: branches } = await useAsyncData<Branch[]>(
  "logs-branches",
  () => listBranches(),
  { default: () => [] },
);
const { data: staffData } = await useAsyncData(
  "logs-staff",
  () => listStaff({ per_page: 200 }),
  { default: () => ({ data: [] }) },
);

const search = ref("");
const level = ref("all");
const moduleFilter = ref("all");
const branchFilter = ref("all");
const userRoleFilter = ref("all");
const userFilter = ref("all");
const page = ref(1);

const isDetailOpen = ref(false);
const selectedLog = ref<AuditLogItem | null>(null);

function showDetails(log: AuditLogItem) {
  selectedLog.value = log;
  isDetailOpen.value = true;
}

const hasExtraData = computed(() => {
  const data = selectedLog.value?.extra_data;
  if (!data) return false;
  if (typeof data !== "object") return true;
  return Object.keys(data).length > 0;
});

const hasOldData = computed(() => {
  const data = selectedLog.value?.old_data;
  if (!data) return false;
  return Object.keys(data).length > 0;
});

const levelItems = [
  { label: "Todos los niveles", value: "all" },
  { label: "Info", value: "INFO" },
  { label: "Warning", value: "WARNING" },
  { label: "Error", value: "ERROR" },
];

const moduleItems = [
  { label: "Todos los módulos", value: "all" },
  { label: "Autenticación", value: "auth" },
  { label: "Vales", value: "vouchers" },
  { label: "Catálogo", value: "catalog" },
  { label: "Clientes", value: "customers" },
  { label: "Usuarios", value: "users" },
  { label: "Sucursales", value: "branches" },
  { label: "Personal", value: "staff" },
];

const branchItems = computed(() => [
  { label: "Todas las sucursales", value: "all" },
  ...branches.value.map((b) => ({ label: b.name, value: b.id.toString() })),
]);

const roleLabels: Record<string, string> = {
  "super-admin": "Administrador General",
  branch_manager: "Gerente General",
  coordinator: "Coordinador",
  verifier: "Verificador",
};

const roleItems = [
  { label: "Todos los roles", value: "all" },
  ...Object.entries(roleLabels).map(([code, label]) => ({
    label,
    value: code,
  })),
];

const staffItems = computed(() => {
  const list = staffData.value?.data ?? [];
  return [
    { label: "Todos los usuarios", value: "all" },
    ...list.map((s) => {
      const name = s.person
        ? `${s.person.first_name ?? ""} ${s.person.last_name ?? ""}`.trim()
        : "";
      const label = name ? `${name} (${s.username})` : s.username;
      return { label, value: s.id.toString() };
    }),
  ];
});

// Reset page to 1 when filters change to avoid empty pages
watch(
  [search, level, moduleFilter, branchFilter, userRoleFilter, userFilter],
  () => {
    page.value = 1;
  },
);

const { data, status, refresh } = await useAsyncData(
  "audit-logs",
  () =>
    listAuditLogs({
      page: page.value,
      search: search.value || undefined,
      level: level.value !== "all" ? level.value : undefined,
      module: moduleFilter.value !== "all" ? moduleFilter.value : undefined,
      branch_id: isBranchManager.value
        ? (branchManagerBranchId.value ?? undefined)
        : branchFilter.value !== "all"
          ? Number(branchFilter.value)
          : undefined,
      user_role:
        userRoleFilter.value !== "all" ? userRoleFilter.value : undefined,
      user_id:
        userFilter.value !== "all" ? Number(userFilter.value) : undefined,
    }),
  {
    watch: [
      page,
      search,
      level,
      moduleFilter,
      branchFilter,
      userRoleFilter,
      userFilter,
    ],
    default: () => ({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 },
    }),
  },
);

const items = computed(() => data.value?.data ?? []);
const meta = computed(
  () =>
    data.value?.meta ?? {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    },
);

const columns: TableColumn<AuditLogItem>[] = [
  {
    accessorKey: "created_at",
    header: "Fecha/Hora",
    cell: ({ row }) => {
      return new Date(row.original.created_at).toLocaleString("es-MX");
    },
  },
  {
    accessorKey: "user_name",
    header: "Usuario",
    cell: ({ row }) => {
      return h("div", [
        h(
          "p",
          { class: "font-medium text-highlighted" },
          row.original.user_name || "Sistema",
        ),
        row.original.user_role
          ? h("p", { class: "text-xs text-muted" }, row.original.user_role)
          : null,
      ]);
    },
  },
  {
    id: "branch",
    header: "Sucursal",
    cell: ({ row }) => {
      return h(
        "span",
        { class: "text-sm text-muted" },
        row.original.branch?.name || "Global",
      );
    },
  },
  {
    accessorKey: "module",
    header: "Módulo",
  },
  {
    accessorKey: "event_type",
    header: "Evento",
    cell: ({ row }) => {
      return h(
        "code",
        { class: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono" },
        row.original.event_type,
      );
    },
  },
  {
    accessorKey: "level",
    header: "Nivel",
    cell: ({ row }) => {
      const level = row.original.level?.toLowerCase();
      const color =
        level === "error"
          ? ("error" as const)
          : level === "warning"
            ? ("warning" as const)
            : ("success" as const);
      return h(
        UBadge,
        { variant: "subtle", color, class: "capitalize" },
        () => level || "info",
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      return h(
        "p",
        {
          class: "max-w-md truncate text-xs text-dimmed",
          title: row.original.description,
        },
        row.original.description,
      );
    },
  },
  {
    accessorKey: "ip_address",
    header: "IP",
  },
  {
    id: "actions",
    header: "Detalle",
    cell: ({ row }) => {
      return h(UButton, {
        icon: "i-lucide-eye",
        color: "neutral",
        variant: "ghost",
        size: "xs",
        onClick: () => showDetails(row.original),
      });
    },
  },
];
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
            v-if="!isBranchManager"
            v-model="branchFilter"
            :items="branchItems"
            placeholder="Filtrar sucursal"
            class="min-w-44"
          />
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
          <USelect
            v-model="userRoleFilter"
            :items="roleItems"
            placeholder="Filtrar rol"
            class="min-w-44"
          />
          <USelect
            v-model="userFilter"
            :items="staffItems"
            placeholder="Filtrar usuario"
            class="min-w-48"
          />
        </div>
      </div>

      <div
        v-if="status === 'pending' && items.length === 0"
        class="flex items-center justify-center py-16"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="size-8 animate-spin text-muted"
        />
      </div>

      <div
        v-else-if="items.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <UIcon name="i-lucide-history" class="size-12 text-dimmed" />
        <p class="mt-2 text-sm text-muted">No hay registros de bitácora</p>
      </div>

      <template v-else>
        <UTable
          :data="items"
          :columns="columns"
          :loading="status === 'pending'"
          class="shrink-0"
          @select="(e, row) => showDetails(row.original)"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody:
              '[&>tr]:last:[&>td]:border-b-0 [&>tr]:cursor-pointer [&>tr]:hover:bg-muted/40 transition-colors',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default',
            separator: 'h-0',
          }"
        />

        <div
          class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"
        >
          <UPagination
            v-model:page="page"
            :total="meta.total"
            :items-per-page="meta.per_page"
          />
        </div>
      </template>
    </template>
  </UDashboardPanel>

  <UModal
    v-model:open="isDetailOpen"
    title="Detalles del Registro de Auditoría"
    :ui="{ content: 'max-w-4xl' }"
    description="Información completa del evento registrado"
  >
    <template #body>
      <div v-if="selectedLog" class="space-y-5">

        <!-- Fila 1: Fecha | Módulo/Evento | Nivel -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Fecha / Hora</p>
            <p class="text-sm text-highlighted">
              {{ selectedLog.created_at ? new Date(selectedLog.created_at).toLocaleString('es-MX') : '' }}
            </p>
          </div>
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Módulo / Evento</p>
            <p class="text-sm text-highlighted font-medium capitalize">{{ selectedLog.module }}</p>
            <code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono mt-0.5 inline-block">{{ selectedLog.event_type }}</code>
          </div>
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Nivel</p>
            <UBadge
              variant="subtle"
              :color="selectedLog.level?.toLowerCase() === 'error' ? 'error' : selectedLog.level?.toLowerCase() === 'warning' ? 'warning' : 'success'"
              class="capitalize"
            >
              {{ selectedLog.level || 'info' }}
            </UBadge>
          </div>
        </div>

        <USeparator />

        <!-- Fila 2: Usuario | Sucursal | IP -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Usuario</p>
            <p class="text-sm text-highlighted font-medium">{{ selectedLog.user_name || 'Sistema' }}</p>
            <p v-if="selectedLog.user_role" class="text-xs text-muted">{{ selectedLog.user_role }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Sucursal</p>
            <p class="text-sm text-highlighted">{{ selectedLog.branch?.name || 'Global' }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Dirección IP</p>
            <p class="text-sm font-mono text-highlighted">{{ selectedLog.ip_address || 'N/A' }}</p>
          </div>
        </div>

        <!-- Descripción -->
        <div>
          <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Descripción</p>
          <p class="text-sm text-highlighted leading-relaxed">{{ selectedLog.description }}</p>
        </div>

        <!-- User Agent -->
        <div>
          <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1">User Agent</p>
          <p class="text-xs text-dimmed leading-relaxed">{{ selectedLog.user_agent || 'N/A' }}</p>
        </div>

        <!-- Comparación Antes / Después -->
        <div v-if="hasOldData">
          <USeparator />
          <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-3 mt-4">Cambios realizados</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium text-error mb-1.5 flex items-center gap-1">
                <UIcon name="i-lucide-circle-minus" class="size-3.5" /> Antes
              </p>
              <pre class="font-mono text-[11px] bg-error/5 border border-error/20 p-3 rounded-lg overflow-auto max-h-64 leading-tight text-error/80">{{ JSON.stringify(selectedLog.old_data, null, 2) }}</pre>
            </div>
            <div>
              <p class="text-xs font-medium text-success mb-1.5 flex items-center gap-1">
                <UIcon name="i-lucide-circle-plus" class="size-3.5" /> Después
              </p>
              <pre class="font-mono text-[11px] bg-success/5 border border-success/20 p-3 rounded-lg overflow-auto max-h-64 leading-tight text-success/80">{{ JSON.stringify(selectedLog.extra_data, null, 2) }}</pre>
            </div>
          </div>
        </div>

        <!-- Datos extra (cuando NO hay old_data, se muestra el bloque normal) -->
        <div v-else-if="hasExtraData">
          <USeparator />
          <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-4">Datos Adicionales</p>
          <pre class="font-mono text-[11px] bg-muted/60 dark:bg-muted/30 p-3 rounded-lg overflow-auto border border-default max-h-80 leading-tight">{{ JSON.stringify(selectedLog.extra_data, null, 2) }}</pre>
        </div>

      </div>
    </template>
  </UModal>
</template>

