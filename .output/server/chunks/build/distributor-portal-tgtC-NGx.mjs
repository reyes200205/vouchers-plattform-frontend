import { g as _sfc_main$2$1, h as _sfc_main$7, j as _sfc_main$9 } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Tooltip-t24qO-gt.mjs';
import { u as useDashboard } from './useDashboard-COqeLCZP.mjs';
import { b as _sfc_main$2, a as _sfc_main$1, _ as _sfc_main$4 } from './DashboardSidebarCollapse-cuN7rdaZ.mjs';
import { _ as _sfc_main } from './Card-mGGtjRiM.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
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
import 'tailwindcss/colors';
import './Kbd-DXBnE17j.mjs';
import './defineShortcuts-D5SVQerE.mjs';
import './DashboardSidebarToggle-mSaDDhJ_.mjs';

//#region app/pages/distributor-portal/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { isNotificationsSlideoverOpen } = useDashboard();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$4;
			const _component_UTooltip = _sfc_main$3;
			const _component_UButton = _sfc_main$7;
			const _component_UChip = _sfc_main$9;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UCard = _sfc_main;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "distributor-portal-home" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, {
						title: "Portal de Distribuidor",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UTooltip, {
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
							else return [createVNode(_component_UTooltip, {
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
							})];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, {
						title: "Portal de Distribuidor",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_UTooltip, {
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
						})]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6 space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-shopping-bag",
										class: "size-5 text-primary"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}>Pedidos Realizados</h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-shopping-bag",
									class: "size-5 text-primary"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, "Pedidos Realizados")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>24</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, "24")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-truck",
										class: "size-5 text-warning"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}>En Camino / Tránsito</h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-truck",
									class: "size-5 text-warning"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, "En Camino / Tránsito")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>2</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, "2")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-dollar-sign",
										class: "size-5 text-success"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}>Saldo Pendiente</h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-dollar-sign",
									class: "size-5 text-success"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, "Saldo Pendiente")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>\$1,240.00</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, "$1,240.00")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UCard, { class: "mt-6" }, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}>Mis Pedidos Recientes</h3>`);
									_push(ssrRenderComponent(_component_UButton, {
										label: "Nuevo Pedido",
										icon: "i-lucide-plus",
										to: "/distributor-portal/orders"
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, "Mis Pedidos Recientes"), createVNode(_component_UButton, {
									label: "Nuevo Pedido",
									icon: "i-lucide-plus",
									to: "/distributor-portal/orders"
								})])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No tienes pedidos recientes. ¡Comienza a ordenar hoy! </div>`);
								else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No tienes pedidos recientes. ¡Comienza a ordenar hoy! ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "p-6 space-y-6" }, [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-shopping-bag",
								class: "size-5 text-primary"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, "Pedidos Realizados")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, "24")]),
							_: 1
						}),
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-truck",
								class: "size-5 text-warning"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, "En Camino / Tránsito")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, "2")]),
							_: 1
						}),
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-dollar-sign",
								class: "size-5 text-success"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, "Saldo Pendiente")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, "$1,240.00")]),
							_: 1
						})
					]), createVNode(_component_UCard, { class: "mt-6" }, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, "Mis Pedidos Recientes"), createVNode(_component_UButton, {
							label: "Nuevo Pedido",
							icon: "i-lucide-plus",
							to: "/distributor-portal/orders"
						})])]),
						default: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No tienes pedidos recientes. ¡Comienza a ordenar hoy! ")]),
						_: 1
					})])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var distributor_portal_default = index_vue_vue_type_script_setup_true_lang_default;

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-tgtC-NGx.mjs.map
