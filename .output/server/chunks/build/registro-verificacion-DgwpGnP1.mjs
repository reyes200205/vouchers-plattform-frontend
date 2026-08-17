import { aj as useAsyncData, g as _sfc_main$2$1, h as _sfc_main$7, j as _sfc_main$9 } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Tooltip-BlDWBU8d.mjs';
import { _ as _sfc_main$6 } from './Badge-CmUnAJCw.mjs';
import { u as useAuth } from './useAuth-CB8YlYPz.mjs';
import { u as useDashboard } from './useDashboard-DM_RFO1v.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$5 } from './DashboardSidebarCollapse-B125GinS.mjs';
import { _ as _sfc_main } from './Card-B0imoY-h.mjs';
import { _ as _sfc_main$1 } from './Table-DRTDyHli.mjs';
import { u as useApplications, _ as _sfc_main$3, a as applicantFullName, A as APPLICATION_STATUS_LABELS } from './useApplications-Da8X0u-A.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, h, useSSRContext } from 'vue';
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
import './PopperArrow-uZwABxuX.mjs';
import './Kbd-DEj9mxJN.mjs';
import './defineShortcuts-zVsILOx1.mjs';
import './DashboardSidebarToggle-CrE1-3MV.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/pages/registro-verificacion/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { isNotificationsSlideoverOpen } = useDashboard();
		const { user, roleCode } = useAuth();
		const { listApplications } = useApplications();
		const isCoordinator = computed(() => roleCode.value === "coordinator");
		const isVerifier = computed(() => roleCode.value === "verifier");
		const { data: applications, status } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("registro-verificacion-home-applications", async () => {
			if (!isCoordinator.value && !isVerifier.value) return [];
			return (await listApplications({ per_page: 100 })).data;
		}, { watch: [roleCode] })), __temp = await __temp, __restore(), __temp);
		const list = computed(() => applications.value ?? []);
		const createdByMe = computed(() => list.value.filter((a) => a.coordinator_user_id === user.value?.id).length);
		const pendingVerifierAssignment = computed(() => list.value.filter((a) => a.status === "EN_REVISION" && !a.assigned_verifier_id).length);
		const approved = computed(() => list.value.filter((a) => a.status === "APROBADA").length);
		const pendingFieldVisit = computed(() => list.value.filter((a) => a.assigned_verifier_id === user.value?.id && a.status === "EN_REVISION").length);
		const recentApplications = computed(() => list.value.slice(0, 5));
		const columns = [
			{
				accessorKey: "id",
				header: "ID"
			},
			{
				accessorKey: "applicant",
				header: "Solicitante",
				cell: ({ row }) => applicantFullName(row.original.applicant)
			},
			{
				accessorKey: "branch",
				header: "Sucursal",
				cell: ({ row }) => row.original.branch?.name ?? "—"
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => {
					const status = row.original.status;
					return h(_sfc_main$6, {
						variant: "subtle",
						color: status === "APROBADA" ? "success" : status === "RECHAZADA" ? "error" : status === "EN_REVISION" ? "warning" : "neutral"
					}, () => APPLICATION_STATUS_LABELS[status] ?? status);
				}
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$5;
			const _component_UButton = _sfc_main$7;
			const _component_UTooltip = _sfc_main$4;
			const _component_UChip = _sfc_main$9;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UCard = _sfc_main;
			const _component_UTable = _sfc_main$1;
			const _component_UAlert = _sfc_main$3;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "register-distributors-home" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, {
						title: "Registro y Verificación",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(isCoordinator)) _push(ssrRenderComponent(_component_UButton, {
									label: "Nueva solicitud",
									icon: "i-lucide-user-plus",
									to: "/registro-verificacion/new"
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
							} else return [unref(isCoordinator) ? (openBlock(), createBlock(_component_UButton, {
								key: 0,
								label: "Nueva solicitud",
								icon: "i-lucide-user-plus",
								to: "/registro-verificacion/new"
							})) : createCommentVNode("", true), createVNode(_component_UTooltip, {
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
						title: "Registro y Verificación",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [unref(isCoordinator) ? (openBlock(), createBlock(_component_UButton, {
							key: 0,
							label: "Nueva solicitud",
							icon: "i-lucide-user-plus",
							to: "/registro-verificacion/new"
						})) : createCommentVNode("", true), createVNode(_component_UTooltip, {
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
					if (_push) if (unref(isCoordinator)) {
						_push(`<div class="p-6 space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-file-plus",
										class: "size-5 text-primary"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Solicitudes Creadas por Mí </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-file-plus",
									class: "size-5 text-primary"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Solicitudes Creadas por Mí ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(createdByMe))}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(createdByMe)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-user-search",
										class: "size-5 text-warning"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Pendientes de Asignar Verificador </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-user-search",
									class: "size-5 text-warning"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Pendientes de Asignar Verificador ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(pendingVerifierAssignment))}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(pendingVerifierAssignment)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-badge-check",
										class: "size-5 text-success"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Solicitudes Aprobadas </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-badge-check",
									class: "size-5 text-success"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Solicitudes Aprobadas ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(approved))}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(approved)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UCard, { class: "mt-6" }, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Últimas Solicitudes </h3>`);
									_push(ssrRenderComponent(_component_UButton, {
										label: "Ver bandeja completa",
										variant: "subtle",
										icon: "i-lucide-inbox",
										to: "/registro-verificacion/list"
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Últimas Solicitudes "), createVNode(_component_UButton, {
									label: "Ver bandeja completa",
									variant: "subtle",
									icon: "i-lucide-inbox",
									to: "/registro-verificacion/list"
								})])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTable, {
									data: unref(recentApplications),
									columns,
									loading: unref(status) === "pending"
								}, {
									empty: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No hay solicitudes registradas recientemente. </div>`);
										else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes registradas recientemente. ")];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UTable, {
									data: unref(recentApplications),
									columns,
									loading: unref(status) === "pending"
								}, {
									empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes registradas recientemente. ")]),
									_: 1
								}, 8, ["data", "loading"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else if (unref(isVerifier)) {
						_push(`<div class="p-6 space-y-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-shield-check",
										class: "size-5 text-warning"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Asignadas Pendientes de Visita Física </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-shield-check",
									class: "size-5 text-warning"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Asignadas Pendientes de Visita Física ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(pendingFieldVisit))}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(pendingFieldVisit)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UAlert, {
							color: "neutral",
							variant: "subtle",
							icon: "i-lucide-hammer",
							title: "Panel del Verificador en construcción",
							description: "Esta sección corresponde al flujo del rol Verificador y se completará en la tarea asignada a ese rol."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<div class="p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAlert, {
							color: "neutral",
							variant: "subtle",
							icon: "i-lucide-info",
							title: "Sin métricas disponibles",
							description: "Tu rol actual no tiene un panel configurado en el portal de Registro y Verificación."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					}
					else return [unref(isCoordinator) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "p-6 space-y-6"
					}, [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-file-plus",
								class: "size-5 text-primary"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Solicitudes Creadas por Mí ")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(createdByMe)), 1)]),
							_: 1
						}),
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-user-search",
								class: "size-5 text-warning"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Pendientes de Asignar Verificador ")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(pendingVerifierAssignment)), 1)]),
							_: 1
						}),
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-badge-check",
								class: "size-5 text-success"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Solicitudes Aprobadas ")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(approved)), 1)]),
							_: 1
						})
					]), createVNode(_component_UCard, { class: "mt-6" }, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Últimas Solicitudes "), createVNode(_component_UButton, {
							label: "Ver bandeja completa",
							variant: "subtle",
							icon: "i-lucide-inbox",
							to: "/registro-verificacion/list"
						})])]),
						default: withCtx(() => [createVNode(_component_UTable, {
							data: unref(recentApplications),
							columns,
							loading: unref(status) === "pending"
						}, {
							empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes registradas recientemente. ")]),
							_: 1
						}, 8, ["data", "loading"])]),
						_: 1
					})])) : unref(isVerifier) ? (openBlock(), createBlock("div", {
						key: 1,
						class: "p-6 space-y-6"
					}, [createVNode(_component_UCard, null, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
							name: "i-lucide-shield-check",
							class: "size-5 text-warning"
						}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Asignadas Pendientes de Visita Física ")])]),
						default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(pendingFieldVisit)), 1)]),
						_: 1
					}), createVNode(_component_UAlert, {
						color: "neutral",
						variant: "subtle",
						icon: "i-lucide-hammer",
						title: "Panel del Verificador en construcción",
						description: "Esta sección corresponde al flujo del rol Verificador y se completará en la tarea asignada a ese rol."
					})])) : (openBlock(), createBlock("div", {
						key: 2,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "neutral",
						variant: "subtle",
						icon: "i-lucide-info",
						title: "Sin métricas disponibles",
						description: "Tu rol actual no tiene un panel configurado en el portal de Registro y Verificación."
					})]))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var registro_verificacion_default = index_vue_vue_type_script_setup_true_lang_default;

export { registro_verificacion_default as default };
//# sourceMappingURL=registro-verificacion-DgwpGnP1.mjs.map
