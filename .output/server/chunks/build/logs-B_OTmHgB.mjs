import { ak as useAsyncData, j as _sfc_main$2$1, f as _sfc_main$6, al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _sfc_main$2 } from './Select-Gak9P_dI.mjs';
import { _ as _sfc_main$4 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$8 } from './Slideover-BvNkJWJZ.mjs';
import { _ as _sfc_main$9 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main } from './Input-YDRYCqsV.mjs';
import { a as _sfc_main$1, _ as _sfc_main$5 } from './DashboardNavbar-C9AMA1qv.mjs';
import { _ as _sfc_main$7 } from './DashboardSidebarCollapse-D6jKUkvL.mjs';
import { _ as _sfc_main$3 } from './Table-OSD_tKHH.mjs';
import { defineComponent, ref, computed, watch, withAsyncContext, withCtx, unref, createVNode, openBlock, createBlock, Fragment, createCommentVNode, createTextVNode, toDisplayString, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@iconify/utils/lib/css/icon';
import 'tailwindcss/colors';
import './DashboardSidebarToggle-BSz-SOza.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './PopperArrow-_ul5NSti.mjs';
import './overlay-BwxO-keY.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/composables/useAuditLogs.ts
function useAuditLogs() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listAuditLogs(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/system/audit-logs`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: params
		})).data;
	}
	return { listAuditLogs };
}
//#endregion
//#region app/pages/general/logs.vue?vue&type=script&setup=true&lang.ts
var logs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "logs",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UBadge = _sfc_main$9;
		const UButton = _sfc_main$6;
		const { listAuditLogs } = useAuditLogs();
		const search = ref("");
		const level = ref("all");
		const moduleFilter = ref("all");
		const page = ref(1);
		const isDetailOpen = ref(false);
		const selectedLog = ref(null);
		function showDetails(log) {
			selectedLog.value = log;
			isDetailOpen.value = true;
		}
		const hasExtraData = computed(() => {
			const data = selectedLog.value?.extra_data;
			if (!data) return false;
			if (typeof data !== "object") return true;
			return Object.keys(data).length > 0;
		});
		const levelItems = [
			{
				label: "Todos los niveles",
				value: "all"
			},
			{
				label: "Info",
				value: "INFO"
			},
			{
				label: "Warning",
				value: "WARNING"
			},
			{
				label: "Error",
				value: "ERROR"
			}
		];
		const moduleItems = [
			{
				label: "Todos los módulos",
				value: "all"
			},
			{
				label: "Autenticación",
				value: "auth"
			},
			{
				label: "Vales",
				value: "vouchers"
			},
			{
				label: "Clientes",
				value: "customers"
			},
			{
				label: "Usuarios",
				value: "users"
			},
			{
				label: "Sucursales",
				value: "branches"
			}
		];
		watch([
			search,
			level,
			moduleFilter
		], () => {
			page.value = 1;
		});
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("audit-logs", () => listAuditLogs({
			page: page.value,
			search: search.value || void 0,
			level: level.value !== "all" ? level.value : void 0,
			module: moduleFilter.value !== "all" ? moduleFilter.value : void 0
		}), {
			watch: [
				page,
				search,
				level,
				moduleFilter
			],
			default: () => ({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const items = computed(() => data.value?.data ?? []);
		const meta = computed(() => data.value?.meta ?? {
			current_page: 1,
			last_page: 1,
			per_page: 15,
			total: 0
		});
		const columns = [
			{
				accessorKey: "created_at",
				header: "Fecha/Hora",
				cell: ({ row }) => {
					return new Date(row.original.created_at).toLocaleString("es-MX");
				}
			},
			{
				accessorKey: "user_name",
				header: "Usuario",
				cell: ({ row }) => {
					return h("div", [h("p", { class: "font-medium text-highlighted" }, row.original.user_name || "Sistema"), row.original.user_role ? h("p", { class: "text-xs text-muted" }, row.original.user_role) : null]);
				}
			},
			{
				accessorKey: "module",
				header: "Módulo"
			},
			{
				accessorKey: "event_type",
				header: "Evento",
				cell: ({ row }) => {
					return h("code", { class: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono" }, row.original.event_type);
				}
			},
			{
				accessorKey: "level",
				header: "Nivel",
				cell: ({ row }) => {
					const level = row.original.level?.toLowerCase();
					return h(_sfc_main$9, {
						variant: "subtle",
						color: level === "error" ? "error" : level === "warning" ? "warning" : "success",
						class: "capitalize"
					}, () => level || "info");
				}
			},
			{
				accessorKey: "description",
				header: "Descripción",
				cell: ({ row }) => {
					return h("p", {
						class: "max-w-md truncate text-xs text-dimmed",
						title: row.original.description
					}, row.original.description);
				}
			},
			{
				accessorKey: "ip_address",
				header: "IP"
			},
			{
				id: "actions",
				header: "Detalle",
				cell: ({ row }) => {
					return h(_sfc_main$6, {
						icon: "i-lucide-eye",
						color: "neutral",
						variant: "ghost",
						size: "xs",
						onClick: () => showDetails(row.original)
					});
				}
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$7;
			const _component_UInput = _sfc_main;
			const _component_USelect = _sfc_main$2;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UTable = _sfc_main$3;
			const _component_UPagination = _sfc_main$4;
			const _component_USlideover = _sfc_main$8;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "logs" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Bitácora de Auditoría" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(unref(UButton), {
								label: "Actualizar",
								icon: "i-lucide-refresh-cw",
								color: "neutral",
								variant: "ghost",
								loading: unref(status) === "pending",
								onClick: () => unref(refresh)()
							}, null, _parent, _scopeId));
							else return [createVNode(unref(UButton), {
								label: "Actualizar",
								icon: "i-lucide-refresh-cw",
								color: "neutral",
								variant: "ghost",
								loading: unref(status) === "pending",
								onClick: () => unref(refresh)()
							}, null, 8, ["loading", "onClick"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Bitácora de Auditoría" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(unref(UButton), {
							label: "Actualizar",
							icon: "i-lucide-refresh-cw",
							color: "neutral",
							variant: "ghost",
							loading: unref(status) === "pending",
							onClick: () => unref(refresh)()
						}, null, 8, ["loading", "onClick"])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-center justify-between gap-1.5 mb-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: search.value,
							"onUpdate:modelValue": ($event) => search.value = $event,
							class: "max-w-sm w-full",
							icon: "i-lucide-search",
							placeholder: "Buscar registros..."
						}, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap items-center gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: level.value,
							"onUpdate:modelValue": ($event) => level.value = $event,
							items: levelItems,
							placeholder: "Filtrar nivel",
							class: "min-w-36"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: moduleFilter.value,
							"onUpdate:modelValue": ($event) => moduleFilter.value = $event,
							items: moduleItems,
							placeholder: "Filtrar módulo",
							class: "min-w-44"
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
						if (unref(status) === "pending" && items.value.length === 0) {
							_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-8 animate-spin text-muted"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (items.value.length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-history",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay registros de bitácora </p></div>`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(_component_UTable, {
								data: items.value,
								columns,
								loading: unref(status) === "pending",
								class: "shrink-0",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, null, _parent, _scopeId));
							if (meta.value.last_page > 1) {
								_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									page: page.value,
									"onUpdate:page": ($event) => page.value = $event,
									total: meta.value.total,
									"items-per-page": meta.value.per_page
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`<!--]-->`);
						}
					} else return [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5 mb-4" }, [createVNode(_component_UInput, {
						modelValue: search.value,
						"onUpdate:modelValue": ($event) => search.value = $event,
						class: "max-w-sm w-full",
						icon: "i-lucide-search",
						placeholder: "Buscar registros..."
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "flex flex-wrap items-center gap-1.5" }, [createVNode(_component_USelect, {
						modelValue: level.value,
						"onUpdate:modelValue": ($event) => level.value = $event,
						items: levelItems,
						placeholder: "Filtrar nivel",
						class: "min-w-36"
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_USelect, {
						modelValue: moduleFilter.value,
						"onUpdate:modelValue": ($event) => moduleFilter.value = $event,
						items: moduleItems,
						placeholder: "Filtrar módulo",
						class: "min-w-44"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])])]), unref(status) === "pending" && items.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : items.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-history",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay registros de bitácora ")])) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode(_component_UTable, {
						data: items.value,
						columns,
						loading: unref(status) === "pending",
						class: "shrink-0",
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, null, 8, ["data", "loading"]), meta.value.last_page > 1 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"
					}, [createVNode(_component_UPagination, {
						page: page.value,
						"onUpdate:page": ($event) => page.value = $event,
						total: meta.value.total,
						"items-per-page": meta.value.per_page
					}, null, 8, [
						"page",
						"onUpdate:page",
						"total",
						"items-per-page"
					])])) : createCommentVNode("", true)], 64))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_USlideover, {
				open: isDetailOpen.value,
				"onUpdate:open": ($event) => isDetailOpen.value = $event,
				title: "Detalles del Registro de Auditoría"
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (selectedLog.value) {
						_push(`<div class="space-y-4"${_scopeId}><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>Fecha / Hora</h4><p class="text-sm text-highlighted mt-0.5"${_scopeId}>${ssrInterpolate(selectedLog.value?.created_at ? new Date(selectedLog.value.created_at).toLocaleString("es-MX") : "")}</p></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>Usuario</h4><p class="text-sm text-highlighted mt-0.5 font-medium"${_scopeId}>${ssrInterpolate(selectedLog.value?.user_name || "Sistema")}</p>`);
						if (selectedLog.value?.user_role) _push(`<p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(selectedLog.value.user_role)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>Módulo / Evento</h4><p class="text-sm text-highlighted mt-0.5 font-medium capitalize"${_scopeId}>${ssrInterpolate(selectedLog.value?.module)}</p><p class="mt-0.5"${_scopeId}><code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono"${_scopeId}>${ssrInterpolate(selectedLog.value?.event_type)}</code></p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>Nivel</h4><div class="mt-1"${_scopeId}>`);
						_push(ssrRenderComponent(unref(UBadge), {
							variant: "subtle",
							color: selectedLog.value?.level?.toLowerCase() === "error" ? "error" : selectedLog.value?.level?.toLowerCase() === "warning" ? "warning" : "success",
							class: "capitalize"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(selectedLog.value?.level || "info")}`);
								else return [createTextVNode(toDisplayString(selectedLog.value?.level || "info"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>Dirección IP</h4><p class="text-sm font-mono text-highlighted mt-0.5"${_scopeId}>${ssrInterpolate(selectedLog.value?.ip_address || "N/A")}</p></div></div><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>User Agent (Navegador)</h4><p class="text-xs text-dimmed mt-0.5 leading-relaxed"${_scopeId}>${ssrInterpolate(selectedLog.value?.user_agent || "N/A")}</p></div><div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider"${_scopeId}>Descripción</h4><p class="text-sm text-highlighted mt-0.5 leading-relaxed"${_scopeId}>${ssrInterpolate(selectedLog.value?.description)}</p></div>`);
						if (hasExtraData.value) _push(`<div${_scopeId}><h4 class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Datos Adicionales</h4><pre class="font-mono text-[10px] bg-muted/60 dark:bg-muted/30 p-3 rounded-lg overflow-auto border border-default max-h-96 leading-tight"${_scopeId}>${ssrInterpolate(JSON.stringify(selectedLog.value?.extra_data, null, 2))}</pre></div>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else _push(`<!---->`);
					else return [selectedLog.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-4"
					}, [
						createVNode("div", null, [createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "Fecha / Hora"), createVNode("p", { class: "text-sm text-highlighted mt-0.5" }, toDisplayString(selectedLog.value?.created_at ? new Date(selectedLog.value.created_at).toLocaleString("es-MX") : ""), 1)]),
						createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", null, [
							createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "Usuario"),
							createVNode("p", { class: "text-sm text-highlighted mt-0.5 font-medium" }, toDisplayString(selectedLog.value?.user_name || "Sistema"), 1),
							selectedLog.value?.user_role ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-xs text-muted"
							}, toDisplayString(selectedLog.value.user_role), 1)) : createCommentVNode("", true)
						]), createVNode("div", null, [
							createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "Módulo / Evento"),
							createVNode("p", { class: "text-sm text-highlighted mt-0.5 font-medium capitalize" }, toDisplayString(selectedLog.value?.module), 1),
							createVNode("p", { class: "mt-0.5" }, [createVNode("code", { class: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono" }, toDisplayString(selectedLog.value?.event_type), 1)])
						])]),
						createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", null, [createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "Nivel"), createVNode("div", { class: "mt-1" }, [createVNode(unref(UBadge), {
							variant: "subtle",
							color: selectedLog.value?.level?.toLowerCase() === "error" ? "error" : selectedLog.value?.level?.toLowerCase() === "warning" ? "warning" : "success",
							class: "capitalize"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(selectedLog.value?.level || "info"), 1)]),
							_: 1
						}, 8, ["color"])])]), createVNode("div", null, [createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "Dirección IP"), createVNode("p", { class: "text-sm font-mono text-highlighted mt-0.5" }, toDisplayString(selectedLog.value?.ip_address || "N/A"), 1)])]),
						createVNode("div", null, [createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "User Agent (Navegador)"), createVNode("p", { class: "text-xs text-dimmed mt-0.5 leading-relaxed" }, toDisplayString(selectedLog.value?.user_agent || "N/A"), 1)]),
						createVNode("div", null, [createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider" }, "Descripción"), createVNode("p", { class: "text-sm text-highlighted mt-0.5 leading-relaxed" }, toDisplayString(selectedLog.value?.description), 1)]),
						hasExtraData.value ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("h4", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Datos Adicionales"), createVNode("pre", { class: "font-mono text-[10px] bg-muted/60 dark:bg-muted/30 p-3 rounded-lg overflow-auto border border-default max-h-96 leading-tight" }, toDisplayString(JSON.stringify(selectedLog.value?.extra_data, null, 2)), 1)])) : createCommentVNode("", true)
					])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/logs.vue
var _sfc_setup = logs_vue_vue_type_script_setup_true_lang_default.setup;
logs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/logs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var logs_default = logs_vue_vue_type_script_setup_true_lang_default;

export { logs_default as default };
//# sourceMappingURL=logs-B_OTmHgB.mjs.map
