import { al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main$5, k as _sfc_main$2$1, $ as $fetch$2, aM as useRuntimeConfig, ap as useComponentProps, aj as useAppConfig, ag as tv, c as Primitive } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$6 } from './Tooltip-BphbNe-4.mjs';
import { u as useDashboard } from './useDashboard-BiXofqc0.mjs';
import { a as _sfc_main$1, _ as _sfc_main$3 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$7 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { _ as _sfc_main$a } from './Table-DZoThN5y.mjs';
import { _ as _sfc_main$8 } from './PageCard-C24h5VaM.mjs';
import { _ as _sfc_main$9 } from './Card-CmMDF934.mjs';
import { defineComponent, computed, ref, withAsyncContext, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, Fragment, isRef, createCommentVNode, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { format } from 'date-fns';
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
import './Kbd-E_UYCv7U.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpage-grid.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_grid_default = { "base": "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/PageGrid.vue
var _sfc_main = {
	__name: "UPageGrid",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		}
	},
	setup(__props) {
		const props = useComponentProps("pageGrid", __props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_grid_default,
			...appConfig.ui?.pageGrid || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$4 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/PageGrid.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region app/components/home/HomeStats.vue?vue&type=script&setup=true&lang.ts
var HomeStats_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeStats",
	__ssrInlineRender: true,
	props: { stats: {} },
	setup(__props) {
		const props = __props;
		function formatCurrency(value) {
			return value.toLocaleString("es-MX", {
				style: "currency",
				currency: "MXN",
				maximumFractionDigits: 0
			});
		}
		const stats = computed(() => {
			const s = props.stats;
			if (!s) return [];
			return [
				{
					title: "Línea de crédito colocada",
					icon: "i-lucide-circle-dollar-sign",
					value: formatCurrency(s.credit_placed),
					variation: 0
				},
				{
					title: "Morosidad promedio",
					icon: "i-lucide-chart-pie",
					value: `${s.delinquency_rate.toLocaleString("es-MX")}%`,
					variation: 0
				},
				{
					title: "Cobros del día",
					icon: "i-lucide-wallet",
					value: formatCurrency(s.collections_today),
					variation: 0
				},
				{
					title: "Vales activos",
					icon: "i-lucide-file-text",
					value: s.active_vouchers.toLocaleString("es-MX"),
					variation: 0
				}
			];
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPageGrid = _sfc_main;
			const _component_UPageCard = _sfc_main$8;
			_push(ssrRenderComponent(_component_UPageGrid, mergeProps({ class: "grid-cols-4 gap-px" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(unref(stats), (stat, index) => {
							_push(ssrRenderComponent(_component_UPageCard, {
								key: index,
								icon: stat.icon,
								title: stat.title,
								variant: "subtle",
								ui: {
									container: "gap-y-1.5",
									wrapper: "items-start",
									leading: "p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col",
									title: "font-normal text-muted text-xs uppercase"
								},
								class: "rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="flex items-center gap-2"${_scopeId}><span class="text-2xl font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(stat.value)}</span></div>`);
									else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-2xl font-semibold text-highlighted" }, toDisplayString(stat.value), 1)])];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(unref(stats), (stat, index) => {
						return openBlock(), createBlock(_component_UPageCard, {
							key: index,
							icon: stat.icon,
							title: stat.title,
							variant: "subtle",
							ui: {
								container: "gap-y-1.5",
								wrapper: "items-start",
								leading: "p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col",
								title: "font-normal text-muted text-xs uppercase"
							},
							class: "rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
						}, {
							default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-2xl font-semibold text-highlighted" }, toDisplayString(stat.value), 1)])]),
							_: 2
						}, 1032, ["icon", "title"]);
					}), 128))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomeStats.vue
var _sfc_setup$3 = HomeStats_vue_vue_type_script_setup_true_lang_default.setup;
HomeStats_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeStats.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var HomeStats_default = Object.assign(HomeStats_vue_vue_type_script_setup_true_lang_default, { __name: "HomeStats" });
//#endregion
//#region app/components/home/HomeChart.server.vue?vue&type=script&setup=true&lang.ts
var HomeChart_server_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeChart.server",
	__ssrInlineRender: true,
	props: {
		points: {},
		title: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$9, mergeProps({
				class: "shrink-0",
				ui: { body: "px-0! pt-0! pb-3!" }
			}, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div${_scopeId}><p class="text-xs text-muted uppercase mb-1.5"${_scopeId}>${ssrInterpolate(__props.title)}</p><p class="text-3xl text-highlighted font-semibold"${_scopeId}> --- </p></div>`);
					else return [createVNode("div", null, [createVNode("p", { class: "text-xs text-muted uppercase mb-1.5" }, toDisplayString(__props.title), 1), createVNode("p", { class: "text-3xl text-highlighted font-semibold" }, " --- ")])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="h-96"${_scopeId}></div>`);
					else return [createVNode("div", { class: "h-96" })];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomeChart.server.vue
var _sfc_setup$2 = HomeChart_server_vue_vue_type_script_setup_true_lang_default.setup;
HomeChart_server_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeChart.server.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var HomeChart_server_default = Object.assign(HomeChart_server_vue_vue_type_script_setup_true_lang_default, { __name: "HomeChart" });
//#endregion
//#region app/components/home/HomeSales.vue?vue&type=script&setup=true&lang.ts
var HomeSales_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeSales",
	__ssrInlineRender: true,
	props: {
		points: {},
		title: {}
	},
	setup(__props) {
		const props = __props;
		const formatNumber = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 0
		}).format;
		const rows = computed(() => {
			return [...props.points || []].reverse().map((point) => ({
				month: format(/* @__PURE__ */ new Date(`${point.month}-01T00:00:00`), "MMMM yyyy"),
				amount: point.amount
			}));
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main$9;
			const _component_UTable = _sfc_main$a;
			_push(ssrRenderComponent(_component_UCard, _attrs, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<p class="text-xs text-muted uppercase mb-1.5"${_scopeId}>${ssrInterpolate(__props.title)}</p>`);
					else return [createVNode("p", { class: "text-xs text-muted uppercase mb-1.5" }, toDisplayString(__props.title), 1)];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UTable, {
						data: unref(rows),
						columns: [{
							accessorKey: "month",
							header: "Mes",
							cell: ({ row }) => row.original.month.charAt(0).toUpperCase() + row.original.month.slice(1)
						}, {
							accessorKey: "amount",
							header: () => "Monto",
							cell: ({ row }) => unref(formatNumber)(row.original.amount)
						}],
						class: "shrink-0",
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default"
						}
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UTable, {
						data: unref(rows),
						columns: [{
							accessorKey: "month",
							header: "Mes",
							cell: ({ row }) => row.original.month.charAt(0).toUpperCase() + row.original.month.slice(1)
						}, {
							accessorKey: "amount",
							header: () => "Monto",
							cell: ({ row }) => unref(formatNumber)(row.original.amount)
						}],
						class: "shrink-0",
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default"
						}
					}, null, 8, ["data", "columns"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomeSales.vue
var _sfc_setup$1 = HomeSales_vue_vue_type_script_setup_true_lang_default.setup;
HomeSales_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeSales.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var HomeSales_default = Object.assign(HomeSales_vue_vue_type_script_setup_true_lang_default, { __name: "HomeSales" });
//#endregion
//#region app/composables/useDashboardStats.ts
function useDashboardStats() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function getStats(branchId) {
		const query = branchId ? `?branch_id=${branchId}` : "";
		return (await $fetch$2(`${config.public.apiBase}/stats/dashboard${query}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	return { getStats };
}
//#endregion
//#region app/pages/general/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { getStats } = useDashboardStats();
		useBranches();
		const { user } = useAuth();
		const { isNotificationsSlideoverOpen } = useDashboard();
		const canViewStats = computed(() => user.value?.permissions?.includes("platform.view") ?? false);
		const branchId = ref(null);
		const branches = ref([]);
		const { data: stats, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("dashboard-stats", () => canViewStats.value ? getStats(branchId.value) : Promise.resolve(null), {
			watch: [branchId],
			default: () => null
		})), __temp = await __temp, __restore(), __temp);
		const firstName = computed(() => user.value?.person?.first_name ?? user.value?.username ?? "");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$3;
			const _component_UDashboardSidebarCollapse = _sfc_main$7;
			const _component_USelect = _sfc_main$4;
			const _component_UButton = _sfc_main$5;
			const _component_UTooltip = _sfc_main$6;
			const _component_UChip = _sfc_main$2$1;
			const _component_UIcon = _sfc_main$2;
			const _component_HomeStats = HomeStats_default;
			const _component_HomeChart = HomeChart_server_default;
			const _component_HomeSales = HomeSales_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "home" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, {
						title: "Panel de control",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(canViewStats)) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(branchId),
									"onUpdate:modelValue": ($event) => isRef(branchId) ? branchId.value = $event : null,
									items: [{
										label: "Todas las sucursales",
										value: null
									}, ...unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									}))],
									placeholder: "Sucursal",
									class: "w-44"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								if (unref(canViewStats)) _push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-refresh-cw",
									color: "neutral",
									variant: "ghost",
									square: "",
									loading: unref(status) === "pending",
									onClick: ($event) => unref(refresh)()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UTooltip, {
									text: "Notifications",
									shortcuts: ["N"]
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											color: "neutral",
											variant: "ghost",
											square: "",
											onClick: ($event) => isNotificationsSlideoverOpen.value = true
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UChip, {
													color: "error",
													inset: ""
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UIcon, {
															name: "i-lucide-bell",
															class: "size-5 shrink-0"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UIcon, {
															name: "i-lucide-bell",
															class: "size-5 shrink-0"
														})];
													}),
													_: 1
												}, _parent, _scopeId));
												else return [createVNode(_component_UChip, {
													color: "error",
													inset: ""
												}, {
													default: withCtx(() => [createVNode(_component_UIcon, {
														name: "i-lucide-bell",
														class: "size-5 shrink-0"
													})]),
													_: 1
												})];
											}),
											_: 1
										}, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											color: "neutral",
											variant: "ghost",
											square: "",
											onClick: ($event) => isNotificationsSlideoverOpen.value = true
										}, {
											default: withCtx(() => [createVNode(_component_UChip, {
												color: "error",
												inset: ""
											}, {
												default: withCtx(() => [createVNode(_component_UIcon, {
													name: "i-lucide-bell",
													class: "size-5 shrink-0"
												})]),
												_: 1
											})]),
											_: 1
										}, 8, ["onClick"])];
									}),
									_: 1
								}, _parent, _scopeId));
							} else return [
								unref(canViewStats) ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
									modelValue: unref(branchId),
									"onUpdate:modelValue": ($event) => isRef(branchId) ? branchId.value = $event : null,
									items: [{
										label: "Todas las sucursales",
										value: null
									}, ...unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									}))],
									placeholder: "Sucursal",
									class: "w-44"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])) : createCommentVNode("", true),
								unref(canViewStats) ? (openBlock(), createBlock(_component_UButton, {
									key: 1,
									icon: "i-lucide-refresh-cw",
									color: "neutral",
									variant: "ghost",
									square: "",
									loading: unref(status) === "pending",
									onClick: ($event) => unref(refresh)()
								}, null, 8, ["loading", "onClick"])) : createCommentVNode("", true),
								createVNode(_component_UTooltip, {
									text: "Notifications",
									shortcuts: ["N"]
								}, {
									default: withCtx(() => [createVNode(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										square: "",
										onClick: ($event) => isNotificationsSlideoverOpen.value = true
									}, {
										default: withCtx(() => [createVNode(_component_UChip, {
											color: "error",
											inset: ""
										}, {
											default: withCtx(() => [createVNode(_component_UIcon, {
												name: "i-lucide-bell",
												class: "size-5 shrink-0"
											})]),
											_: 1
										})]),
										_: 1
									}, 8, ["onClick"])]),
									_: 1
								})
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, {
						title: "Panel de control",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [
							unref(canViewStats) ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
								modelValue: unref(branchId),
								"onUpdate:modelValue": ($event) => isRef(branchId) ? branchId.value = $event : null,
								items: [{
									label: "Todas las sucursales",
									value: null
								}, ...unref(branches).map((b) => ({
									label: b.name,
									value: b.id
								}))],
								placeholder: "Sucursal",
								class: "w-44"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])) : createCommentVNode("", true),
							unref(canViewStats) ? (openBlock(), createBlock(_component_UButton, {
								key: 1,
								icon: "i-lucide-refresh-cw",
								color: "neutral",
								variant: "ghost",
								square: "",
								loading: unref(status) === "pending",
								onClick: ($event) => unref(refresh)()
							}, null, 8, ["loading", "onClick"])) : createCommentVNode("", true),
							createVNode(_component_UTooltip, {
								text: "Notifications",
								shortcuts: ["N"]
							}, {
								default: withCtx(() => [createVNode(_component_UButton, {
									color: "neutral",
									variant: "ghost",
									square: "",
									onClick: ($event) => isNotificationsSlideoverOpen.value = true
								}, {
									default: withCtx(() => [createVNode(_component_UChip, {
										color: "error",
										inset: ""
									}, {
										default: withCtx(() => [createVNode(_component_UIcon, {
											name: "i-lucide-bell",
											class: "size-5 shrink-0"
										})]),
										_: 1
									})]),
									_: 1
								}, 8, ["onClick"])]),
								_: 1
							})
						]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (!unref(canViewStats)) {
						_push(`<div class="flex flex-col items-center justify-center gap-2 py-16 text-center"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-hand",
							class: "size-10 text-dimmed"
						}, null, _parent, _scopeId));
						_push(`<p class="text-lg font-semibold text-highlighted"${_scopeId}> Hola${ssrInterpolate(unref(firstName) ? `, ${unref(firstName)}` : "")}</p><p class="text-sm text-muted"${_scopeId}> Usa el menú de la izquierda para continuar con tu trabajo del día. </p></div>`);
					} else if (unref(status) === "pending" && !unref(stats)) {
						_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-8 animate-spin text-muted"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<!--[-->`);
						_push(ssrRenderComponent(_component_HomeStats, { stats: unref(stats) }, null, _parent, _scopeId));
						_push(`<div class="grid grid-cols-2 gap-6 mt-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_HomeChart, {
							title: "Colocación mensual",
							points: unref(stats)?.monthly_placement ?? []
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_HomeSales, {
							title: "Cobranza mensual",
							points: unref(stats)?.monthly_collections ?? []
						}, null, _parent, _scopeId));
						_push(`</div><!--]-->`);
					}
					else return [!unref(canViewStats) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center gap-2 py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-hand",
							class: "size-10 text-dimmed"
						}),
						createVNode("p", { class: "text-lg font-semibold text-highlighted" }, " Hola" + toDisplayString(unref(firstName) ? `, ${unref(firstName)}` : ""), 1),
						createVNode("p", { class: "text-sm text-muted" }, " Usa el menú de la izquierda para continuar con tu trabajo del día. ")
					])) : unref(status) === "pending" && !unref(stats) ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode(_component_HomeStats, { stats: unref(stats) }, null, 8, ["stats"]), createVNode("div", { class: "grid grid-cols-2 gap-6 mt-4" }, [createVNode(_component_HomeChart, {
						title: "Colocación mensual",
						points: unref(stats)?.monthly_placement ?? []
					}, null, 8, ["points"]), createVNode(_component_HomeSales, {
						title: "Cobranza mensual",
						points: unref(stats)?.monthly_collections ?? []
					}, null, 8, ["points"])])], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var general_default = index_vue_vue_type_script_setup_true_lang_default;

export { general_default as default };
//# sourceMappingURL=general-BgF43otH.mjs.map
