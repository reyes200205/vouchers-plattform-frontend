import { ai as useAuth, aL as useToast, ah as useAsyncData, h as _sfc_main$7$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Select-CbAcVpFw.mjs';
import { _ as _sfc_main$7 } from './DropdownMenu-DlLchN8a.mjs';
import { _ as _sfc_main$b } from './InputNumber-CDbcCWSN.mjs';
import { _ as _sfc_main$8 } from './Modal-blGtq3y5.mjs';
import { _ as _sfc_main$a } from './FormField-DOShaxcI.mjs';
import { _ as _sfc_main$1 } from './Tabs-DyxQm-R7.mjs';
import { _ as _sfc_main$6 } from './Badge-B12zNpDE.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$5 } from './DashboardSidebarCollapse-c-FuL4zB.mjs';
import { _ as _sfc_main$9 } from './Form-DpngGyYw.mjs';
import { _ as _sfc_main$4 } from './Table-BTtFuN8i.mjs';
import { _ as _sfc_main } from './Alert-BVKm-t4N.mjs';
import { u as useApplications, a as applicantFullName, A as APPLICATION_STATUS_LABELS } from './useApplications-B8UXo9S3.mjs';
import { defineComponent, computed, ref, withAsyncContext, mergeProps, withCtx, unref, isRef, createVNode, openBlock, createBlock, createCommentVNode, h, useModel, reactive, watch, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import * as z from 'zod';
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
import './PopperArrow-DMsSsDHm.mjs';
import './utils-C-SN97Al.mjs';
import './useTypeahead-JOpfisYr.mjs';
import './useFormControl-BySKHRcT.mjs';
import './namespaced-Hkd_Rrez.mjs';
import './useComposing-D1bdBmsI.mjs';
import './Kbd-CHYMLSD7.mjs';
import './RovingFocusGroup-Dji7OupF.mjs';
import './Input-3L6phQUN.mjs';
import './useKbd-rvMsbidG.mjs';
import './VisuallyHiddenInput-DOPBYbfB.mjs';
import './overlay-BtFRc-iG.mjs';
import './RovingFocusItem-DVFgmWh9.mjs';
import './DashboardSidebarToggle-BxKXl3gw.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/components/applications/AssignVerifierModal.vue?vue&type=script&setup=true&lang.ts
var AssignVerifierModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AssignVerifierModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ application: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["assigned"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useModel(__props, "open");
		const emit = __emit;
		const schema = z.object({ verifier_user_id: z.number({ error: "Captura el ID del verificador" }).int().positive("Captura un ID válido") });
		const state = reactive({ verifier_user_id: void 0 });
		watch(() => props.application, () => {
			state.verifier_user_id = void 0;
		}, { immediate: true });
		const { assignVerifier } = useApplications();
		const toast = useToast();
		const submitting = ref(false);
		async function onSubmit(event) {
			if (!props.application) return;
			submitting.value = true;
			try {
				await assignVerifier(props.application.id, event.data.verifier_user_id);
				toast.add({
					title: "Verificador asignado",
					description: `Se asignó el verificador a la solicitud #${props.application.id}`,
					color: "success"
				});
				open.value = false;
				emit("assigned");
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo asignar el verificador. Verifica el ID e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$8;
			const _component_UForm = _sfc_main$9;
			const _component_UAlert = _sfc_main;
			const _component_UFormField = _sfc_main$a;
			const _component_UInputNumber = _sfc_main$b;
			const _component_UButton = _sfc_main$7$1;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Asignar Verificador",
				description: __props.application ? `Solicitud #${__props.application.id} — ${unref(applicantFullName)(__props.application.applicant)}` : ""
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UAlert, {
									color: "neutral",
									variant: "subtle",
									icon: "i-lucide-info",
									description: "Aún no existe un catálogo de verificadores disponibles en la API. Captura manualmente el ID del usuario con rol Verificador."
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "ID del usuario verificador",
									name: "verifier_user_id",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
											modelValue: unref(state).verifier_user_id,
											"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
											class: "w-full",
											min: 1,
											placeholder: "Ej. 15"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInputNumber, {
											modelValue: unref(state).verifier_user_id,
											"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
											class: "w-full",
											min: 1,
											placeholder: "Ej. 15"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Asignar",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UAlert, {
									color: "neutral",
									variant: "subtle",
									icon: "i-lucide-info",
									description: "Aún no existe un catálogo de verificadores disponibles en la API. Captura manualmente el ID del usuario con rol Verificador."
								}),
								createVNode(_component_UFormField, {
									label: "ID del usuario verificador",
									name: "verifier_user_id",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInputNumber, {
										modelValue: unref(state).verifier_user_id,
										"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
										class: "w-full",
										min: 1,
										placeholder: "Ej. 15"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Asignar",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, ["loading"])])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UAlert, {
								color: "neutral",
								variant: "subtle",
								icon: "i-lucide-info",
								description: "Aún no existe un catálogo de verificadores disponibles en la API. Captura manualmente el ID del usuario con rol Verificador."
							}),
							createVNode(_component_UFormField, {
								label: "ID del usuario verificador",
								name: "verifier_user_id",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInputNumber, {
									modelValue: unref(state).verifier_user_id,
									"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
									class: "w-full",
									min: 1,
									placeholder: "Ej. 15"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Asignar",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/applications/AssignVerifierModal.vue
var _sfc_setup$1 = AssignVerifierModal_vue_vue_type_script_setup_true_lang_default.setup;
AssignVerifierModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/applications/AssignVerifierModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AssignVerifierModal_default = Object.assign(AssignVerifierModal_vue_vue_type_script_setup_true_lang_default, { __name: "ApplicationsAssignVerifierModal" });
//#endregion
//#region app/pages/registro-verificacion/list.vue?vue&type=script&setup=true&lang.ts
var list_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "list",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { roleCode } = useAuth();
		const isCoordinator = computed(() => roleCode.value === "coordinator");
		const { listApplications } = useApplications();
		const toast = useToast();
		const statusFilter = ref("all");
		const { data: applications, status, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("registro-verificacion-list-applications", async () => {
			if (!isCoordinator.value) return [];
			return (await listApplications({
				per_page: 100,
				status: statusFilter.value === "all" ? void 0 : statusFilter.value
			})).data;
		}, { watch: [statusFilter] })), __temp = await __temp, __restore(), __temp);
		const isAssignOpen = ref(false);
		const selectedApplication = ref(null);
		function openAssignModal(application) {
			selectedApplication.value = application;
			isAssignOpen.value = true;
		}
		function getRowItems(row) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (!row.original.assigned_verifier_id && row.original.status === "EN_REVISION") items.push({
				label: "Asignar verificador",
				icon: "i-lucide-user-plus",
				onSelect: () => openAssignModal(row.original)
			});
			items.push({ type: "separator" }, {
				label: "Copiar ID de solicitud",
				icon: "i-lucide-copy",
				onSelect() {
					(void 0).clipboard.writeText(row.original.id.toString());
					toast.add({
						title: "Copiado",
						description: "ID de solicitud copiado al portapapeles"
					});
				}
			});
			return items;
		}
		const columns = [
			{
				accessorKey: "id",
				header: "ID"
			},
			{
				accessorKey: "applicant",
				header: "Solicitante",
				cell: ({ row }) => h("div", { class: "font-medium text-highlighted" }, applicantFullName(row.original.applicant))
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
					const value = row.original.status;
					return h(_sfc_main$6, {
						variant: "subtle",
						color: value === "APROBADA" ? "success" : value === "RECHAZADA" ? "error" : value === "EN_REVISION" ? "warning" : "neutral"
					}, () => APPLICATION_STATUS_LABELS[value] ?? value);
				}
			},
			{
				accessorKey: "assigned_verifier_id",
				header: "Verificador",
				cell: ({ row }) => row.original.assigned_verifier_id ? `Usuario #${row.original.assigned_verifier_id}` : h("span", { class: "text-dimmed" }, "Sin asignar")
			},
			{
				accessorKey: "submitted_at",
				header: "Fecha de envío",
				cell: ({ row }) => row.original.submitted_at ? new Date(row.original.submitted_at).toLocaleDateString("es-MX") : "—"
			},
			{
				id: "actions",
				cell: ({ row }) => h("div", { class: "text-right" }, h(_sfc_main$7, {
					content: { align: "end" },
					items: getRowItems(row)
				}, () => h(_sfc_main$7$1, {
					icon: "i-lucide-ellipsis-vertical",
					color: "neutral",
					variant: "ghost",
					class: "ml-auto"
				})))
			}
		];
		const statusItems = [
			{
				label: "Todos",
				value: "all"
			},
			{
				label: "En revisión",
				value: "EN_REVISION"
			},
			{
				label: "Posible distribuidora",
				value: "POSIBLE_DISTRIBUIDORA"
			},
			{
				label: "Aprobada",
				value: "APROBADA"
			},
			{
				label: "Rechazada",
				value: "RECHAZADA"
			}
		];
		const tabItems = [
			{
				label: "Solicitudes de Distribuidora",
				value: "applications",
				icon: "i-lucide-file-text"
			},
			{
				label: "Incrementos de Crédito",
				value: "credit-increase",
				icon: "i-lucide-trending-up"
			},
			{
				label: "Vales Digitales",
				value: "vouchers",
				icon: "i-lucide-ticket"
			}
		];
		const selectedTab = ref("applications");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$5;
			const _component_UAlert = _sfc_main;
			const _component_UTabs = _sfc_main$1;
			const _component_USelect = _sfc_main$3;
			const _component_UTable = _sfc_main$4;
			const _component_ApplicationsAssignVerifierModal = AssignVerifierModal_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "register-distributors-list" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Bandeja de Coordinación" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Bandeja de Coordinación" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (!unref(isCoordinator)) {
						_push(`<div class="p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAlert, {
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-lock",
							title: "Acceso restringido",
							description: "Solo el rol Coordinador puede acceder a la bandeja de coordinación."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<div class="p-6 space-y-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UTabs, {
							modelValue: unref(selectedTab),
							"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
							items: tabItems
						}, null, _parent, _scopeId));
						if (unref(selectedTab) === "applications") {
							_push(`<div class="space-y-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Solicitudes Activas </h3>`);
							_push(ssrRenderComponent(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: statusItems,
								placeholder: "Filtrar estado",
								class: "min-w-48"
							}, null, _parent, _scopeId));
							_push(`</div>`);
							_push(ssrRenderComponent(_component_UTable, {
								data: unref(applications) ?? [],
								columns,
								loading: unref(status) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No hay solicitudes que coincidan con el filtro seleccionado. </div>`);
									else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes que coincidan con el filtro seleccionado. ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "credit-increase") {
							_push(`<div${_scopeId}>`);
							_push(ssrRenderComponent(_component_UAlert, {
								color: "neutral",
								variant: "subtle",
								icon: "i-lucide-hammer",
								title: "Próximamente",
								description: "El backend aún no expone los endpoints de incremento de crédito (POST /credit-increase-requests y /credit-increase-requests/{id}/pre-authorize). Este panel se habilitará cuando estén disponibles."
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "vouchers") {
							_push(`<div${_scopeId}>`);
							_push(ssrRenderComponent(_component_UAlert, {
								color: "neutral",
								variant: "subtle",
								icon: "i-lucide-hammer",
								title: "Próximamente",
								description: "El backend aún no expone el endpoint de aprobación de vales (POST /voucher-requests/{voucherRequest}/approve). Esta pantalla se habilitará cuando esté disponible."
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(ssrRenderComponent(_component_ApplicationsAssignVerifierModal, {
							open: unref(isAssignOpen),
							"onUpdate:open": ($event) => isRef(isAssignOpen) ? isAssignOpen.value = $event : null,
							application: unref(selectedApplication),
							onAssigned: unref(refresh)
						}, null, _parent, _scopeId));
						_push(`</div>`);
					}
					else return [!unref(isCoordinator) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-lock",
						title: "Acceso restringido",
						description: "Solo el rol Coordinador puede acceder a la bandeja de coordinación."
					})])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "p-6 space-y-6"
					}, [
						createVNode(_component_UTabs, {
							modelValue: unref(selectedTab),
							"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
							items: tabItems
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						unref(selectedTab) === "applications" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-4"
						}, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes Activas "), createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: statusItems,
							placeholder: "Filtrar estado",
							class: "min-w-48"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode(_component_UTable, {
							data: unref(applications) ?? [],
							columns,
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, {
							empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes que coincidan con el filtro seleccionado. ")]),
							_: 1
						}, 8, ["data", "loading"])])) : unref(selectedTab) === "credit-increase" ? (openBlock(), createBlock("div", { key: 1 }, [createVNode(_component_UAlert, {
							color: "neutral",
							variant: "subtle",
							icon: "i-lucide-hammer",
							title: "Próximamente",
							description: "El backend aún no expone los endpoints de incremento de crédito (POST /credit-increase-requests y /credit-increase-requests/{id}/pre-authorize). Este panel se habilitará cuando estén disponibles."
						})])) : unref(selectedTab) === "vouchers" ? (openBlock(), createBlock("div", { key: 2 }, [createVNode(_component_UAlert, {
							color: "neutral",
							variant: "subtle",
							icon: "i-lucide-hammer",
							title: "Próximamente",
							description: "El backend aún no expone el endpoint de aprobación de vales (POST /voucher-requests/{voucherRequest}/approve). Esta pantalla se habilitará cuando esté disponible."
						})])) : createCommentVNode("", true),
						createVNode(_component_ApplicationsAssignVerifierModal, {
							open: unref(isAssignOpen),
							"onUpdate:open": ($event) => isRef(isAssignOpen) ? isAssignOpen.value = $event : null,
							application: unref(selectedApplication),
							onAssigned: unref(refresh)
						}, null, 8, [
							"open",
							"onUpdate:open",
							"application",
							"onAssigned"
						])
					]))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/list.vue
var _sfc_setup = list_vue_vue_type_script_setup_true_lang_default.setup;
list_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/list.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var list_default = list_vue_vue_type_script_setup_true_lang_default;

export { list_default as default };
//# sourceMappingURL=list-Dj8jOsR4.mjs.map
