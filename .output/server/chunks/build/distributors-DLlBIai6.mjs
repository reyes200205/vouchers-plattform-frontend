import { ak as useAsyncData, j as _sfc_main$2, f as _sfc_main$3 } from '../virtual/entry.mjs';
import { _ as _sfc_main$7 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$5 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main$9 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main } from './Input-BC1I0LeZ.mjs';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { _ as _sfc_main$4 } from './Table-DZoThN5y.mjs';
import { u as useDistributors, d as distributorFullName, c as coordinatorFullName } from './useDistributors-MT7zva9s.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, isRef, unref, createVNode, openBlock, createBlock, Fragment, h, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import './DashboardSidebarToggle-BIlVm3ff.mjs';
import './useDirection-DK-ubNea.mjs';
import './useTypeahead-BWLtoev0.mjs';
import './useFormControl-BqrzxfBI.mjs';
import './PopperArrow-D4nTdxSJ.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/pages/registro-verificacion/coordinador/distributors.vue?vue&type=script&setup=true&lang.ts
var distributors_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "distributors",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { listDistributors } = useDistributors();
		const statusFilter = ref(void 0);
		const q = ref("");
		const page = ref(1);
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("coordinador-distributors", () => listDistributors({
			search: q.value.trim() || void 0,
			status: statusFilter.value,
			page: page.value,
			per_page: 15
		}), {
			watch: [statusFilter, page],
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
		const meta = computed(() => data.value?.meta);
		let searchTimeout = null;
		watch(q, () => {
			if (searchTimeout) clearTimeout(searchTimeout);
			searchTimeout = setTimeout(() => {
				page.value = 1;
				refresh();
			}, 300);
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		const statusColors = {
			ACTIVA: "success",
			CANDIDATA: "primary",
			POSIBLE: "warning",
			INACTIVA: "neutral",
			MOROSA: "error",
			BLOQUEADA: "error",
			CERRADA: "neutral"
		};
		function onPageChange(nextPage) {
			page.value = nextPage;
			refresh();
		}
		const columns = [
			{
				accessorKey: "distributor_number",
				header: "Código"
			},
			{
				accessorKey: "person",
				header: "Distribuidora",
				cell: ({ row }) => {
					const person = row.original.person;
					return h("div", { class: "min-w-0" }, [h("p", { class: "truncate font-medium text-highlighted" }, distributorFullName(row.original)), h("p", { class: "truncate text-xs text-muted" }, person?.email || "")]);
				}
			},
			{
				accessorKey: "credit_limit",
				header: "Límite Crédito",
				cell: ({ row }) => money.format(Number(row.original.credit_limit || 0))
			},
			{
				accessorKey: "used_credit",
				header: "Crédito Usado",
				cell: ({ row }) => {
					const limit = Number(row.original.credit_limit || 0);
					const available = Number(row.original.available_credit || 0);
					const used = Math.max(0, limit - available);
					return money.format(used);
				}
			},
			{
				accessorKey: "available_credit",
				header: "Crédito Disponible",
				cell: ({ row }) => money.format(Number(row.original.available_credit || 0))
			},
			{
				accessorKey: "branch",
				header: "Sucursal",
				cell: ({ row }) => row.original.branch?.name ?? "—"
			},
			{
				accessorKey: "coordinator",
				header: "Coordinador",
				cell: ({ row }) => coordinatorFullName(row.original.coordinator)
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => h(_sfc_main$9, {
					color: row.original.status ? statusColors[row.original.status] : "neutral",
					variant: "subtle",
					label: row.original.status ?? ""
				})
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$6;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_USelect = _sfc_main$7;
			const _component_UInput = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UButton = _sfc_main$3;
			const _component_UTable = _sfc_main$4;
			const _component_UPagination = _sfc_main$5;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "coordinador-distributors" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Distribuidores" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": [($event) => isRef(statusFilter) ? statusFilter.value = $event : null, ($event) => {
									page.value = 1;
									unref(refresh)();
								}],
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Activa",
										value: "ACTIVA"
									},
									{
										label: "Candidata",
										value: "CANDIDATA"
									},
									{
										label: "Posible",
										value: "POSIBLE"
									},
									{
										label: "Inactiva",
										value: "INACTIVA"
									},
									{
										label: "Morosa",
										value: "MOROSA"
									},
									{
										label: "Bloqueada",
										value: "BLOQUEADA"
									},
									{
										label: "Cerrada",
										value: "CERRADA"
									}
								],
								placeholder: "Estado",
								class: "w-48"
							}, null, _parent, _scopeId));
							else return [createVNode(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": [($event) => isRef(statusFilter) ? statusFilter.value = $event : null, ($event) => {
									page.value = 1;
									unref(refresh)();
								}],
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Activa",
										value: "ACTIVA"
									},
									{
										label: "Candidata",
										value: "CANDIDATA"
									},
									{
										label: "Posible",
										value: "POSIBLE"
									},
									{
										label: "Inactiva",
										value: "INACTIVA"
									},
									{
										label: "Morosa",
										value: "MOROSA"
									},
									{
										label: "Bloqueada",
										value: "BLOQUEADA"
									},
									{
										label: "Cerrada",
										value: "CERRADA"
									}
								],
								placeholder: "Estado",
								class: "w-48"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Distribuidores" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": [($event) => isRef(statusFilter) ? statusFilter.value = $event : null, ($event) => {
								page.value = 1;
								unref(refresh)();
							}],
							items: [
								{
									label: "Todos los estados",
									value: void 0
								},
								{
									label: "Activa",
									value: "ACTIVA"
								},
								{
									label: "Candidata",
									value: "CANDIDATA"
								},
								{
									label: "Posible",
									value: "POSIBLE"
								},
								{
									label: "Inactiva",
									value: "INACTIVA"
								},
								{
									label: "Morosa",
									value: "MOROSA"
								},
								{
									label: "Bloqueada",
									value: "BLOQUEADA"
								},
								{
									label: "Cerrada",
									value: "CERRADA"
								}
							],
							placeholder: "Estado",
							class: "w-48"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(q),
							"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
							icon: "i-lucide-search",
							placeholder: "Buscar por código o nombre...",
							class: "max-w-sm"
						}, null, _parent, _scopeId));
						_push(`</div>`);
						if (unref(status) === "pending") {
							_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-8 animate-spin text-muted"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(status) === "error") {
							_push(`<div class="flex flex-col items-center justify-center gap-4 py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-triangle-alert",
								class: "size-12 text-error"
							}, null, _parent, _scopeId));
							_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar las distribuidoras. </p>`);
							_push(ssrRenderComponent(_component_UButton, {
								label: "Reintentar",
								icon: "i-lucide-refresh-cw",
								color: "primary",
								variant: "solid",
								onClick: ($event) => unref(refresh)()
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else {
							_push(`<!--[-->`);
							if (unref(items).length === 0) {
								_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-award",
									class: "size-12 text-dimmed"
								}, null, _parent, _scopeId));
								_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay distribuidoras registradas con esos filtros </p></div>`);
							} else _push(ssrRenderComponent(_component_UTable, {
								class: "shrink-0",
								data: unref(items),
								columns,
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, null, _parent, _scopeId));
							_push(`<!--]-->`);
						}
						_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UPagination, {
							"model-value": unref(page),
							total: unref(meta)?.total ?? 0,
							"items-per-page": unref(meta)?.per_page ?? 15,
							"onUpdate:modelValue": onPageChange
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode(_component_UInput, {
							modelValue: unref(q),
							"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
							icon: "i-lucide-search",
							placeholder: "Buscar por código o nombre...",
							class: "max-w-sm"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						unref(status) === "pending" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex items-center justify-center py-16"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-8 animate-spin text-muted"
						})])) : unref(status) === "error" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "flex flex-col items-center justify-center gap-4 py-16 text-center"
						}, [
							createVNode(_component_UIcon, {
								name: "i-lucide-triangle-alert",
								class: "size-12 text-error"
							}),
							createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar las distribuidoras. "),
							createVNode(_component_UButton, {
								label: "Reintentar",
								icon: "i-lucide-refresh-cw",
								color: "primary",
								variant: "solid",
								onClick: ($event) => unref(refresh)()
							}, null, 8, ["onClick"])
						])) : (openBlock(), createBlock(Fragment, { key: 2 }, [unref(items).length === 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex flex-col items-center justify-center py-16 text-center"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-award",
							class: "size-12 text-dimmed"
						}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay distribuidoras registradas con esos filtros ")])) : (openBlock(), createBlock(_component_UTable, {
							key: 1,
							class: "shrink-0",
							data: unref(items),
							columns,
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, 8, ["data", "columns"]))], 64)),
						createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto" }, [createVNode(_component_UPagination, {
							"model-value": unref(page),
							total: unref(meta)?.total ?? 0,
							"items-per-page": unref(meta)?.per_page ?? 15,
							"onUpdate:modelValue": onPageChange
						}, null, 8, [
							"model-value",
							"total",
							"items-per-page"
						])])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/coordinador/distributors.vue
var _sfc_setup = distributors_vue_vue_type_script_setup_true_lang_default.setup;
distributors_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/coordinador/distributors.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var distributors_default = distributors_vue_vue_type_script_setup_true_lang_default;

export { distributors_default as default };
//# sourceMappingURL=distributors-DLlBIai6.mjs.map
