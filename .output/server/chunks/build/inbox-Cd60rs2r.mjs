import { al as useAuth, aP as useToast, ak as useAsyncData, a1 as navigateTo, j as _sfc_main$2, f as _sfc_main$3, ap as useComponentProps, aj as useAppConfig, ag as tv, c as Primitive, h as _sfc_main$1$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$5 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$c } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$b } from './RadioGroup-ByiZ78dl.mjs';
import { _ as _sfc_main$7 } from './Tabs-FmegTH4u.mjs';
import { _ as _sfc_main$9 } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$8 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$d } from './Input-BC1I0LeZ.mjs';
import { u as useInbox } from './useInbox-ozvGAzf8.mjs';
import { e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { u as useCustomers, c as customerFullName } from './useCustomers-CQ23lYPq.mjs';
import { u as useCustomerTransfers } from './useCustomerTransfers-CsxvIT-E.mjs';
import { a as _sfc_main$1, _ as _sfc_main$4 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$6 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { _ as _sfc_main$a } from './Form-CCmdJDgC.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { u as useCategories } from './useCategories-C8YyM5gr.mjs';
import { _ as _sfc_main$e } from './Textarea-DLoRbkWE.mjs';
import { u as useReconciliations } from './useReconciliations-D-H88Ltl.mjs';
import { A as ApplicationDetailView_default } from './ApplicationDetailView-Bofp-NXu.mjs';
import { u as useApplications, a as applicantFullName } from './useApplications-DC2_85yO.mjs';
import { D as DecideModal_default } from './DecideModal-4OcubhvJ.mjs';
import { defineComponent, ref, computed, withAsyncContext, watch, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, Fragment, isRef, renderSlot, createTextVNode, toDisplayString, reactive, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import * as z from 'zod';
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
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-qXGxQnKa.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './RovingFocusItem-ludpn-tQ.mjs';
import './overlay-C4SiqibN.mjs';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-toolbar.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_toolbar_default = { "slots": {
	"root": "shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]",
	"left": "flex items-center gap-1.5",
	"right": "flex items-center gap-1.5"
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardToolbar.vue
var _sfc_main = {
	__name: "UDashboardToolbar",
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
		const props = useComponentProps("dashboardToolbar", __props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_toolbar_default,
			...appConfig.ui?.dashboardToolbar || {}
		})());
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push(`<div data-slot="left" class="${ssrRenderClass(ui.value.left({ class: [unref(props).ui?.left] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent, _scopeId);
						_push(`</div><div data-slot="right" class="${ssrRenderClass(ui.value.right({ class: [unref(props).ui?.right] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
						_push(`</div>`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createVNode("div", {
						"data-slot": "left",
						class: ui.value.left({ class: [unref(props).ui?.left] })
					}, [renderSlot(_ctx.$slots, "left")], 2), createVNode("div", {
						"data-slot": "right",
						class: ui.value.right({ class: [unref(props).ui?.right] })
					}, [renderSlot(_ctx.$slots, "right")], 2)])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$12 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardToolbar.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
//#endregion
//#region app/components/inbox/DecideApplicationModal.vue?vue&type=script&setup=true&lang.ts
var DecideApplicationModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideApplicationModal",
	__ssrInlineRender: true,
	props: { application: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { getApplication } = useApplications();
		const detail = ref(null);
		const detailLoading = ref(false);
		const detailError = ref(false);
		async function loadDetail() {
			detailLoading.value = true;
			detailError.value = false;
			try {
				detail.value = await getApplication(props.application.id);
			} catch {
				detailError.value = true;
			} finally {
				detailLoading.value = false;
			}
		}
		const schema = z.object({
			decision: z.enum(["APPROVE", "REJECT"]),
			credit_limit: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]).optional(),
			category_id: z.string().optional(),
			rejection_reason: z.string().optional()
		}).superRefine((data, ctx) => {
			if (data.decision === "APPROVE") {
				if (!data.credit_limit) ctx.addIssue({
					path: ["credit_limit"],
					code: "custom",
					message: "El límite de crédito es obligatorio al aprobar"
				});
				if (!data.category_id) ctx.addIssue({
					path: ["category_id"],
					code: "custom",
					message: "La categoría es obligatoria al aprobar"
				});
			} else if (data.decision === "REJECT") {
				if (!data.rejection_reason || data.rejection_reason.trim() === "") ctx.addIssue({
					path: ["rejection_reason"],
					code: "custom",
					message: "El motivo de rechazo es obligatorio"
				});
			}
		});
		const open = ref(false);
		const decision = ref("APPROVE");
		const state = reactive({
			decision: "APPROVE",
			credit_limit: void 0,
			category_id: void 0,
			rejection_reason: void 0
		});
		const { decideApplication } = useInbox();
		useCategories();
		const toast = useToast();
		const submitting = ref(false);
		const formRef = ref(null);
		const categories = ref([]);
		const categoryItems = computed(() => {
			return categories.value.map((c) => ({
				label: `${c.name} (${c.code})`,
				value: c.id.toString()
			}));
		});
		watch(decision, (value) => {
			state.decision = value;
		});
		watch(open, (isOpen) => {
			if (isOpen && !detail.value) loadDetail();
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await decideApplication(props.application.id, {
					decision: event.data.decision,
					credit_limit: event.data.decision === "APPROVE" && event.data.credit_limit ? String(event.data.credit_limit) : void 0,
					category_id: event.data.decision === "APPROVE" && event.data.category_id ? Number(event.data.category_id) : void 0,
					rejection_reason: event.data.decision === "REJECT" ? event.data.rejection_reason : void 0
				});
				toast.add({
					title: event.data.decision === "APPROVE" ? "Solicitud aprobada" : "Solicitud rechazada",
					description: event.data.decision === "APPROVE" ? "La distribuidora fue creada y el crédito asignado." : "La solicitud fue rechazada correctamente.",
					color: "success"
				});
				open.value = false;
				emit("decided");
			} catch (e) {
				const apiErrors = e?.data?.errors;
				if ((e?.status === 422 || e?.statusCode === 422) && apiErrors) {
					const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => ({
						name: field,
						message: messages[0] || "Dato inválido"
					}));
					formRef.value?.setErrors(formattedErrors);
				}
				toast.add({
					title: "Error",
					description: extractApiErrorMessage(e, "No se pudo registrar la decisión. Intenta de nuevo."),
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main$3;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$8;
			const _component_ApplicationsApplicationDetailView = ApplicationDetailView_default;
			const _component_UForm = _sfc_main$a;
			const _component_URadioGroup = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UInput = _sfc_main$d;
			const _component_USelect = _sfc_main$5;
			const _component_UTextarea = _sfc_main$e;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Decidir solicitud",
				description: "Aprobar o rechazar la solicitud de distribuidora",
				ui: { content: "max-w-6xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="max-h-[78vh] space-y-5 overflow-y-auto pr-1"${_scopeId}>`);
						if (unref(detailLoading)) {
							_push(`<div class="flex items-center justify-center py-10"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-6 animate-spin text-muted"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(detailError)) {
							_push(`<div class="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-triangle-alert",
								class: "size-4 shrink-0"
							}, null, _parent, _scopeId));
							_push(` No se pudo cargar el detalle de la solicitud. </div>`);
						} else if (unref(detail)) {
							_push(`<!--[--><div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(applicantFullName)(unref(detail).applicant))}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(unref(detail).branch?.name)} `);
							if (unref(detail).coordinator?.person) _push(`<span${_scopeId}> · Coordinador: ${ssrInterpolate(unref(applicantFullName)(unref(detail).coordinator.person))}</span>`);
							else _push(`<!---->`);
							if (unref(detail).assigned_verifier?.username) _push(`<span${_scopeId}> · Verificador: ${ssrInterpolate(unref(detail).assigned_verifier.username)}</span>`);
							else _push(`<!---->`);
							_push(`</p></div>`);
							_push(ssrRenderComponent(_component_UBadge, {
								color: "warning",
								variant: "subtle",
								class: "capitalize"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(detail).initial_category_code)}`);
									else return [createTextVNode(toDisplayString(unref(detail).initial_category_code), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
							_push(ssrRenderComponent(_component_ApplicationsApplicationDetailView, { detail: unref(detail) }, null, _parent, _scopeId));
							_push(`<!--]-->`);
						} else _push(`<!---->`);
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UForm, {
							ref_key: "formRef",
							ref: formRef,
							schema: unref(schema),
							state: unref(state),
							class: "mt-6 space-y-4",
							onSubmit
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_URadioGroup, {
										modelValue: unref(decision),
										"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
										items: [{
											label: "Aprobar",
											value: "APPROVE"
										}, {
											label: "Rechazar",
											value: "REJECT"
										}]
									}, null, _parent, _scopeId));
									if (unref(decision) === "APPROVE") {
										_push(`<!--[-->`);
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Límite de crédito inicial (MXN)",
											name: "credit_limit"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).credit_limit = $event,
													type: "number",
													min: "0",
													step: "100",
													placeholder: "50000",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).credit_limit = $event,
													type: "number",
													min: "0",
													step: "100",
													placeholder: "50000",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Categoría de distribuidora",
											name: "category_id"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_USelect, {
													modelValue: unref(state).category_id,
													"onUpdate:modelValue": ($event) => unref(state).category_id = $event,
													items: unref(categoryItems),
													placeholder: "Seleccionar categoría...",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_USelect, {
													modelValue: unref(state).category_id,
													"onUpdate:modelValue": ($event) => unref(state).category_id = $event,
													items: unref(categoryItems),
													placeholder: "Seleccionar categoría...",
													class: "w-full"
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"items"
												])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`<!--]-->`);
									} else _push(ssrRenderComponent(_component_UFormField, {
										required: "",
										label: "Motivo de rechazo",
										name: "rejection_reason"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(state).rejection_reason,
												"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
												placeholder: "El motivo por el cual se rechaza...",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(state).rejection_reason,
												"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
												placeholder: "El motivo por el cual se rechaza...",
												class: "w-full"
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
										label: unref(decision) === "APPROVE" ? "Aprobar" : "Rechazar",
										color: unref(decision) === "APPROVE" ? "success" : "error",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [
									createVNode(_component_URadioGroup, {
										modelValue: unref(decision),
										"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
										items: [{
											label: "Aprobar",
											value: "APPROVE"
										}, {
											label: "Rechazar",
											value: "REJECT"
										}]
									}, null, 8, ["modelValue", "onUpdate:modelValue"]),
									unref(decision) === "APPROVE" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode(_component_UFormField, {
										required: "",
										label: "Límite de crédito inicial (MXN)",
										name: "credit_limit"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).credit_limit,
											"onUpdate:modelValue": ($event) => unref(state).credit_limit = $event,
											type: "number",
											min: "0",
											step: "100",
											placeholder: "50000",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}), createVNode(_component_UFormField, {
										required: "",
										label: "Categoría de distribuidora",
										name: "category_id"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).category_id,
											"onUpdate:modelValue": ($event) => unref(state).category_id = $event,
											items: unref(categoryItems),
											placeholder: "Seleccionar categoría...",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items"
										])]),
										_: 1
									})], 64)) : (openBlock(), createBlock(_component_UFormField, {
										key: 1,
										required: "",
										label: "Motivo de rechazo",
										name: "rejection_reason"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											placeholder: "El motivo por el cual se rechaza...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})),
									createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										onClick: ($event) => open.value = false
									}, null, 8, ["onClick"]), createVNode(_component_UButton, {
										label: unref(decision) === "APPROVE" ? "Aprobar" : "Rechazar",
										color: unref(decision) === "APPROVE" ? "success" : "error",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, 8, [
										"label",
										"color",
										"loading"
									])])
								];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode("div", { class: "max-h-[78vh] space-y-5 overflow-y-auto pr-1" }, [unref(detailLoading) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-10"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-6 animate-spin text-muted"
					})])) : unref(detailError) ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-triangle-alert",
						class: "size-4 shrink-0"
					}), createTextVNode(" No se pudo cargar el detalle de la solicitud. ")])) : unref(detail) ? (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(applicantFullName)(unref(detail).applicant)), 1), createVNode("p", { class: "text-xs text-muted" }, [
						createTextVNode(toDisplayString(unref(detail).branch?.name) + " ", 1),
						unref(detail).coordinator?.person ? (openBlock(), createBlock("span", { key: 0 }, " · Coordinador: " + toDisplayString(unref(applicantFullName)(unref(detail).coordinator.person)), 1)) : createCommentVNode("", true),
						unref(detail).assigned_verifier?.username ? (openBlock(), createBlock("span", { key: 1 }, " · Verificador: " + toDisplayString(unref(detail).assigned_verifier.username), 1)) : createCommentVNode("", true)
					])]), createVNode(_component_UBadge, {
						color: "warning",
						variant: "subtle",
						class: "capitalize"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(detail).initial_category_code), 1)]),
						_: 1
					})]), createVNode(_component_ApplicationsApplicationDetailView, { detail: unref(detail) }, null, 8, ["detail"])], 64)) : createCommentVNode("", true)]), createVNode(_component_UForm, {
						ref_key: "formRef",
						ref: formRef,
						schema: unref(schema),
						state: unref(state),
						class: "mt-6 space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_URadioGroup, {
								modelValue: unref(decision),
								"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
								items: [{
									label: "Aprobar",
									value: "APPROVE"
								}, {
									label: "Rechazar",
									value: "REJECT"
								}]
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(decision) === "APPROVE" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode(_component_UFormField, {
								required: "",
								label: "Límite de crédito inicial (MXN)",
								name: "credit_limit"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).credit_limit,
									"onUpdate:modelValue": ($event) => unref(state).credit_limit = $event,
									type: "number",
									min: "0",
									step: "100",
									placeholder: "50000",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}), createVNode(_component_UFormField, {
								required: "",
								label: "Categoría de distribuidora",
								name: "category_id"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).category_id,
									"onUpdate:modelValue": ($event) => unref(state).category_id = $event,
									items: unref(categoryItems),
									placeholder: "Seleccionar categoría...",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])]),
								_: 1
							})], 64)) : (openBlock(), createBlock(_component_UFormField, {
								key: 1,
								required: "",
								label: "Motivo de rechazo",
								name: "rejection_reason"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).rejection_reason,
									"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
									placeholder: "El motivo por el cual se rechaza...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: unref(decision) === "APPROVE" ? "Aprobar" : "Rechazar",
								color: unref(decision) === "APPROVE" ? "success" : "error",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, [
								"label",
								"color",
								"loading"
							])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/inbox/DecideApplicationModal.vue
var _sfc_setup$11 = DecideApplicationModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideApplicationModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/DecideApplicationModal.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var DecideApplicationModal_default = Object.assign(DecideApplicationModal_vue_vue_type_script_setup_true_lang_default, { __name: "InboxDecideApplicationModal" });
//#endregion
//#region app/components/inbox/ApplicationsPanel.vue?vue&type=script&setup=true&lang.ts
var ApplicationsPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ApplicationsPanel",
	__ssrInlineRender: true,
	props: { items: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_UBadge = _sfc_main$8;
			const _component_InboxDecideApplicationModal = DecideApplicationModal_default;
			if (__props.items.length === 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-12 text-dimmed"
				}, null, _parent));
				_push(`<p class="mt-2 text-sm text-muted"> No hay solicitudes de distribuidora pendientes </p></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<div class="px-6 py-4"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3">`);
					_push(ssrRenderComponent(_component_UAvatar, {
						alt: item.applicant_name || "Solicitante",
						size: "lg"
					}, null, _parent));
					_push(`<div class="min-w-0"><div class="flex items-center gap-2"><p class="truncate font-semibold text-highlighted">${ssrInterpolate(item.applicant_name || "Sin nombre")}</p>`);
					_push(ssrRenderComponent(_component_UBadge, {
						color: "warning",
						variant: "subtle",
						class: "capitalize"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(item.initial_category_code)}`);
							else return [createTextVNode(toDisplayString(item.initial_category_code), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"><span>${ssrInterpolate(item.branch_name)}</span>`);
					if (item.coordinator_name) _push(`<span>Coordinador: ${ssrInterpolate(item.coordinator_name)}</span>`);
					else _push(`<!---->`);
					if (item.verifier_name) _push(`<span>Verificador: ${ssrInterpolate(item.verifier_name)}</span>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(unref(format)(new Date(item.created_at), "dd MMM yyyy"))}</span></div></div></div><div class="flex items-center gap-3"><div class="text-right"><p class="text-sm font-semibold text-highlighted">${ssrInterpolate(new Intl.NumberFormat("es-MX", {
						style: "currency",
						currency: "MXN",
						maximumFractionDigits: 0
					}).format(Number(item.requested_credit_limit || 0)))}</p><div class="flex items-center justify-end gap-1">`);
					if (item.prevale_approved) _push(ssrRenderComponent(_component_UBadge, {
						color: "success",
						variant: "subtle",
						size: "xs",
						label: "Prevale OK"
					}, null, _parent));
					else _push(`<!---->`);
					if (item.house_photos_complete) _push(ssrRenderComponent(_component_UBadge, {
						color: "success",
						variant: "subtle",
						size: "xs",
						label: "Fotos OK"
					}, null, _parent));
					else _push(`<!---->`);
					if (item.verification) _push(ssrRenderComponent(_component_UBadge, {
						color: "info",
						variant: "subtle",
						size: "xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Verificación: ${ssrInterpolate(item.verification.result)}`);
							else return [createTextVNode(" Verificación: " + toDisplayString(item.verification.result), 1)];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					_push(`</div></div>`);
					_push(ssrRenderComponent(_component_InboxDecideApplicationModal, {
						application: item,
						onDecided: ($event) => emit("decided")
					}, null, _parent));
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
//#endregion
//#region app/components/inbox/ApplicationsPanel.vue
var _sfc_setup$10 = ApplicationsPanel_vue_vue_type_script_setup_true_lang_default.setup;
ApplicationsPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/ApplicationsPanel.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var ApplicationsPanel_default = Object.assign(ApplicationsPanel_vue_vue_type_script_setup_true_lang_default, { __name: "InboxApplicationsPanel" });
//#endregion
//#region app/components/inbox/DecideCreditModal.vue?vue&type=script&setup=true&lang.ts
var DecideCreditModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideCreditModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			decision: z.enum([
				"APROBADO",
				"REDUCIDO",
				"RECHAZADO"
			]),
			approved_amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]).optional(),
			decision_notes: z.string().optional()
		});
		const open = ref(false);
		const decision = ref("APROBADO");
		const state = reactive({
			decision: "APROBADO",
			approved_amount: void 0,
			decision_notes: void 0
		});
		const { decideCreditIncrease } = useInbox();
		const toast = useToast();
		const submitting = ref(false);
		watch(decision, (value) => {
			state.decision = value;
			if (value === "APROBADO") state.approved_amount = props.item.pre_authorized_amount ?? props.item.requested_amount;
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await decideCreditIncrease(props.item.id, {
					decision: event.data.decision,
					approved_amount: event.data.decision === "REDUCIDO" && event.data.approved_amount ? String(event.data.approved_amount) : void 0,
					decision_notes: event.data.decision_notes || void 0
				});
				toast.add({
					title: "Decisión registrada",
					description: `El incremento fue marcado como ${event.data.decision.toLowerCase()}.`,
					color: "success"
				});
				open.value = false;
				emit("decided");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo registrar la decisión. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main$3;
			const _component_UForm = _sfc_main$a;
			const _component_URadioGroup = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UInput = _sfc_main$d;
			const _component_UTextarea = _sfc_main$e;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Decidir incremento",
				description: "Aprobar, reducir o rechazar el incremento de crédito",
				ui: { content: "max-w-xl" }
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
								_push(ssrRenderComponent(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [
										{
											label: "Aprobar (pre-autorizado)",
											value: "APROBADO"
										},
										{
											label: "Reducir",
											value: "REDUCIDO"
										},
										{
											label: "Rechazar",
											value: "RECHAZADO"
										}
									]
								}, null, _parent, _scopeId));
								if (unref(decision) === "REDUCIDO") _push(ssrRenderComponent(_component_UFormField, {
									label: "Monto aprobado (MXN)",
									name: "approved_amount"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).approved_amount,
											"onUpdate:modelValue": ($event) => unref(state).approved_amount = $event,
											type: "number",
											min: "0",
											step: "100",
											placeholder: "20000",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).approved_amount,
											"onUpdate:modelValue": ($event) => unref(state).approved_amount = $event,
											type: "number",
											min: "0",
											step: "100",
											placeholder: "20000",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Notas de decisión",
									name: "decision_notes"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).decision_notes,
											"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
											placeholder: "Comentarios opcionales...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).decision_notes,
											"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
											placeholder: "Comentarios opcionales...",
											class: "w-full"
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
									label: unref(decision) === "RECHAZADO" ? "Rechazar" : "Confirmar",
									color: unref(decision) === "RECHAZADO" ? "error" : "success",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [
										{
											label: "Aprobar (pre-autorizado)",
											value: "APROBADO"
										},
										{
											label: "Reducir",
											value: "REDUCIDO"
										},
										{
											label: "Rechazar",
											value: "RECHAZADO"
										}
									]
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(decision) === "REDUCIDO" ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
									label: "Monto aprobado (MXN)",
									name: "approved_amount"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).approved_amount,
										"onUpdate:modelValue": ($event) => unref(state).approved_amount = $event,
										type: "number",
										min: "0",
										step: "100",
										placeholder: "20000",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode(_component_UFormField, {
									label: "Notas de decisión",
									name: "decision_notes"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).decision_notes,
										"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
										placeholder: "Comentarios opcionales...",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: unref(decision) === "RECHAZADO" ? "Rechazar" : "Confirmar",
									color: unref(decision) === "RECHAZADO" ? "error" : "success",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, [
									"label",
									"color",
									"loading"
								])])
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
							createVNode(_component_URadioGroup, {
								modelValue: unref(decision),
								"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
								items: [
									{
										label: "Aprobar (pre-autorizado)",
										value: "APROBADO"
									},
									{
										label: "Reducir",
										value: "REDUCIDO"
									},
									{
										label: "Rechazar",
										value: "RECHAZADO"
									}
								]
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(decision) === "REDUCIDO" ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
								label: "Monto aprobado (MXN)",
								name: "approved_amount"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).approved_amount,
									"onUpdate:modelValue": ($event) => unref(state).approved_amount = $event,
									type: "number",
									min: "0",
									step: "100",
									placeholder: "20000",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode(_component_UFormField, {
								label: "Notas de decisión",
								name: "decision_notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).decision_notes,
									"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
									placeholder: "Comentarios opcionales...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: unref(decision) === "RECHAZADO" ? "Rechazar" : "Confirmar",
								color: unref(decision) === "RECHAZADO" ? "error" : "success",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, [
								"label",
								"color",
								"loading"
							])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/inbox/DecideCreditModal.vue
var _sfc_setup$9 = DecideCreditModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideCreditModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/DecideCreditModal.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var DecideCreditModal_default = Object.assign(DecideCreditModal_vue_vue_type_script_setup_true_lang_default, { __name: "InboxDecideCreditModal" });
//#endregion
//#region app/components/inbox/CreditPanel.vue?vue&type=script&setup=true&lang.ts
var CreditPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CreditPanel",
	__ssrInlineRender: true,
	props: { items: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const currency = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 0
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_InboxDecideCreditModal = DecideCreditModal_default;
			if (__props.items.length === 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-12 text-dimmed"
				}, null, _parent));
				_push(`<p class="mt-2 text-sm text-muted"> No hay incrementos de crédito pendientes </p></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<div class="px-6 py-4"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3">`);
					_push(ssrRenderComponent(_component_UAvatar, {
						alt: item.distributor_name || "Distribuidora",
						size: "lg"
					}, null, _parent));
					_push(`<div class="min-w-0"><p class="truncate font-semibold text-highlighted">${ssrInterpolate(item.distributor_name || "Sin nombre")}</p><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"><span>${ssrInterpolate(item.distributor_number)}</span><span>${ssrInterpolate(item.branch_name)}</span><span>${ssrInterpolate(unref(format)(new Date(item.created_at), "dd MMM yyyy"))}</span></div>`);
					if (item.reason) _push(`<p class="text-xs text-dimmed line-clamp-1">${ssrInterpolate(item.reason)}</p>`);
					else _push(`<!---->`);
					_push(`</div></div><div class="flex items-center gap-3"><div class="text-right"><p class="text-xs text-muted"> Solicitado: <span class="font-medium text-highlighted">${ssrInterpolate(unref(currency).format(Number(item.requested_amount)))}</span></p><p class="text-sm font-semibold text-highlighted"> Pre-autorizado: ${ssrInterpolate(unref(currency).format(Number(item.pre_authorized_amount || 0)))}</p></div>`);
					_push(ssrRenderComponent(_component_InboxDecideCreditModal, {
						item,
						onDecided: ($event) => emit("decided")
					}, null, _parent));
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
//#endregion
//#region app/components/inbox/CreditPanel.vue
var _sfc_setup$8 = CreditPanel_vue_vue_type_script_setup_true_lang_default.setup;
CreditPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/CreditPanel.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var CreditPanel_default = Object.assign(CreditPanel_vue_vue_type_script_setup_true_lang_default, { __name: "InboxCreditPanel" });
//#endregion
//#region app/components/inbox/DecideCustomerChangeModal.vue?vue&type=script&setup=true&lang.ts
var DecideCustomerChangeModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideCustomerChangeModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			decision: z.enum(["APPROVE", "REJECT"]),
			rejection_reason: z.string().optional()
		});
		const open = ref(false);
		const decision = ref("APPROVE");
		const submitting = ref(false);
		const state = reactive({
			decision: "APPROVE",
			rejection_reason: void 0
		});
		const { decideCustomerChangeRequest } = useCustomers();
		const toast = useToast();
		watch(decision, (value) => {
			state.decision = value;
			if (value === "APPROVE") state.rejection_reason = void 0;
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await decideCustomerChangeRequest(props.item.id, {
					decision: event.data.decision,
					rejection_reason: event.data.decision === "REJECT" && event.data.rejection_reason ? event.data.rejection_reason : void 0
				});
				toast.add({
					title: event.data.decision === "APPROVE" ? "Cambio aprobado" : "Cambio rechazado",
					description: "La decisión quedó registrada para auditoría.",
					color: event.data.decision === "APPROVE" ? "success" : "warning"
				});
				open.value = false;
				emit("decided");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo registrar la decisión. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main$3;
			const _component_UForm = _sfc_main$a;
			const _component_URadioGroup = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UTextarea = _sfc_main$e;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Decidir cambio de datos",
				description: "Aprobar o rechazar la solicitud de la cajera",
				ui: { content: "max-w-xl" }
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
								_push(ssrRenderComponent(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [{
										label: "Aprobar el cambio",
										value: "APPROVE"
									}, {
										label: "Rechazar",
										value: "REJECT"
									}]
								}, null, _parent, _scopeId));
								if (unref(decision) === "REJECT") _push(ssrRenderComponent(_component_UFormField, {
									label: "Motivo del rechazo",
									name: "rejection_reason"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											placeholder: "Explica por qué no procede el cambio... (obligatorio)",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											placeholder: "Explica por qué no procede el cambio... (obligatorio)",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: unref(decision) === "REJECT" ? "Rechazar" : "Confirmar aprobación",
									color: unref(decision) === "REJECT" ? "error" : "success",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [{
										label: "Aprobar el cambio",
										value: "APPROVE"
									}, {
										label: "Rechazar",
										value: "REJECT"
									}]
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(decision) === "REJECT" ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
									label: "Motivo del rechazo",
									name: "rejection_reason"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).rejection_reason,
										"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
										placeholder: "Explica por qué no procede el cambio... (obligatorio)",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: unref(decision) === "REJECT" ? "Rechazar" : "Confirmar aprobación",
									color: unref(decision) === "REJECT" ? "error" : "success",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, [
									"label",
									"color",
									"loading"
								])])
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
							createVNode(_component_URadioGroup, {
								modelValue: unref(decision),
								"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
								items: [{
									label: "Aprobar el cambio",
									value: "APPROVE"
								}, {
									label: "Rechazar",
									value: "REJECT"
								}]
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(decision) === "REJECT" ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
								label: "Motivo del rechazo",
								name: "rejection_reason"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).rejection_reason,
									"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
									placeholder: "Explica por qué no procede el cambio... (obligatorio)",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: unref(decision) === "REJECT" ? "Rechazar" : "Confirmar aprobación",
								color: unref(decision) === "REJECT" ? "error" : "success",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, [
								"label",
								"color",
								"loading"
							])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/inbox/DecideCustomerChangeModal.vue
var _sfc_setup$7 = DecideCustomerChangeModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideCustomerChangeModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/DecideCustomerChangeModal.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var DecideCustomerChangeModal_default = Object.assign(DecideCustomerChangeModal_vue_vue_type_script_setup_true_lang_default, { __name: "InboxDecideCustomerChangeModal" });
//#endregion
//#region app/components/inbox/InboxCustomersPanel.vue?vue&type=script&setup=true&lang.ts
var InboxCustomersPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InboxCustomersPanel",
	__ssrInlineRender: true,
	props: { items: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { fieldLabels } = useCustomers();
		const labels = fieldLabels();
		const typeLabels = {
			IDENTITY: "Identidad",
			CONTACT: "Contacto",
			EVIDENCE: "Evidencia"
		};
		function customerName(item) {
			const person = item.customer?.person;
			return [person?.first_name, person?.last_name].filter(Boolean).join(" ") || "Cliente";
		}
		function changeSummary(item) {
			const newValues = item.new_values ?? {};
			return Object.entries(newValues).map(([field, value]) => `${labels[field] ?? field}: ${value}`).join(" · ");
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_UBadge = _sfc_main$8;
			const _component_InboxDecideCustomerChangeModal = DecideCustomerChangeModal_default;
			if (__props.items.length === 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-12 text-dimmed"
				}, null, _parent));
				_push(`<p class="mt-2 text-sm text-muted"> No hay solicitudes de cambio de clientes pendientes </p></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<div class="px-6 py-4"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3">`);
					_push(ssrRenderComponent(_component_UAvatar, {
						alt: customerName(item),
						size: "lg"
					}, null, _parent));
					_push(`<div class="min-w-0"><div class="flex items-center gap-2"><p class="truncate font-semibold text-highlighted">${ssrInterpolate(customerName(item))}</p>`);
					_push(ssrRenderComponent(_component_UBadge, {
						color: "info",
						variant: "subtle",
						label: typeLabels[item.change_type ?? ""] ?? item.change_type ?? "—"
					}, null, _parent));
					_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"><span>${ssrInterpolate(item.customer?.customer_code)}</span><span>${ssrInterpolate(unref(format)(new Date(item.created_at ?? ""), "dd MMM yyyy HH:mm"))}</span></div>`);
					if (changeSummary(item)) _push(`<p class="mt-1 text-xs text-dimmed line-clamp-2">${ssrInterpolate(changeSummary(item))}</p>`);
					else _push(`<!---->`);
					_push(`</div></div><div class="flex items-center gap-3">`);
					_push(ssrRenderComponent(_component_InboxDecideCustomerChangeModal, {
						item,
						onDecided: ($event) => emit("decided")
					}, null, _parent));
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
//#endregion
//#region app/components/inbox/InboxCustomersPanel.vue
var _sfc_setup$6 = InboxCustomersPanel_vue_vue_type_script_setup_true_lang_default.setup;
InboxCustomersPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/InboxCustomersPanel.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var InboxCustomersPanel_default = Object.assign(InboxCustomersPanel_vue_vue_type_script_setup_true_lang_default, { __name: "InboxCustomersPanel" });
//#endregion
//#region app/components/inbox/CustomerTransfersPanel.vue?vue&type=script&setup=true&lang.ts
var CustomerTransfersPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CustomerTransfersPanel",
	__ssrInlineRender: true,
	props: { items: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_CustomerTransfersDecideModal = DecideModal_default;
			if (__props.items.length === 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-12 text-dimmed"
				}, null, _parent));
				_push(`<p class="mt-2 text-sm text-muted"> No hay transferencias de cliente pendientes de autorización </p></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<div class="px-6 py-4"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3">`);
					_push(ssrRenderComponent(_component_UAvatar, {
						alt: unref(customerFullName)(item.customer?.person),
						size: "lg"
					}, null, _parent));
					_push(`<div class="min-w-0"><p class="truncate font-semibold text-highlighted">${ssrInterpolate(unref(customerFullName)(item.customer?.person))}</p><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"><span>De ${ssrInterpolate(item.source_distributor?.distributor_number ?? `#${item.source_distributor_id}`)}</span><span>a ${ssrInterpolate(item.destination_distributor?.distributor_number ?? `#${item.destination_distributor_id}`)}</span>`);
					if (item.created_at) _push(`<span>${ssrInterpolate(unref(format)(new Date(item.created_at), "dd MMM yyyy HH:mm"))}</span>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (item.request_reason) _push(`<p class="mt-1 text-xs text-dimmed line-clamp-2">${ssrInterpolate(item.request_reason)}</p>`);
					else _push(`<!---->`);
					_push(`</div></div><div class="flex items-center gap-3">`);
					_push(ssrRenderComponent(_component_CustomerTransfersDecideModal, {
						item,
						onDecided: ($event) => emit("decided")
					}, null, _parent));
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
//#endregion
//#region app/components/inbox/CustomerTransfersPanel.vue
var _sfc_setup$5 = CustomerTransfersPanel_vue_vue_type_script_setup_true_lang_default.setup;
CustomerTransfersPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/CustomerTransfersPanel.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var CustomerTransfersPanel_default = Object.assign(CustomerTransfersPanel_vue_vue_type_script_setup_true_lang_default, { __name: "InboxCustomerTransfersPanel" });
//#endregion
//#region app/components/reconciliations/DecideReconciliationModal.vue?vue&type=script&setup=true&lang.ts
var DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideReconciliationModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { verifyReconciliation, rejectReconciliation } = useReconciliations();
		const toast = useToast();
		const open = ref(false);
		const submitting = ref(false);
		const decision = ref("APROBAR");
		const schema = computed(() => decision.value === "RECHAZAR" ? z.object({ rejection_reason: z.string().min(3, "Indica el motivo del rechazo") }) : z.object({}));
		const state = reactive({ rejection_reason: void 0 });
		watch(open, (isOpen) => {
			if (!isOpen) return;
			decision.value = "APROBAR";
			state.rejection_reason = void 0;
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				if (decision.value === "APROBAR") await verifyReconciliation(props.item.id);
				else await rejectReconciliation(props.item.id, event.data.rejection_reason ?? "");
				toast.add({
					title: "Decisión registrada",
					description: decision.value === "APROBAR" ? "La conciliación quedó aprobada." : "La conciliación fue rechazada; la transacción bancaria vuelve a estar disponible para que la cajera la concilie de nuevo.",
					color: "success"
				});
				open.value = false;
				emit("decided");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo registrar la decisión. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main$3;
			const _component_UForm = _sfc_main$a;
			const _component_URadioGroup = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UTextarea = _sfc_main$e;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Decidir conciliación",
				description: "Revisa los datos que envió la cajera y aprueba o rechaza el emparejamiento",
				ui: { content: "max-w-xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mb-4 space-y-1 rounded-lg border border-default p-4 text-sm"${_scopeId}><p class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(__props.item.distributor_payment?.reported_reference || `Conciliación #${__props.item.id}`)}</p>`);
						if (__props.item.distributor_payment?.distributor) {
							_push(`<p class="text-muted"${_scopeId}> Distribuidora: <span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(__props.item.distributor_payment.distributor.name || "—")}</span> (${ssrInterpolate(__props.item.distributor_payment.distributor.distributor_number)}) `);
							if (__props.item.distributor_payment.distributor.category) _push(`<span${_scopeId}> · Categoría ${ssrInterpolate(__props.item.distributor_payment.distributor.category.name)}</span>`);
							else _push(`<!---->`);
							_push(`</p>`);
						} else _push(`<!---->`);
						_push(`<p class="text-muted"${_scopeId}> Relación de corte: <span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(__props.item.distributor_payment?.cutoff_relation?.relation_number ?? `#${__props.item.distributor_payment?.cutoff_relation_id ?? "—"}`)}</span>`);
						if (__props.item.distributor_payment?.cutoff_relation?.status) _push(`<span${_scopeId}> · ${ssrInterpolate(__props.item.distributor_payment.cutoff_relation.status)}</span>`);
						else _push(`<!---->`);
						if (__props.item.distributor_payment?.cutoff_relation?.cutoff?.branch_name) _push(`<span${_scopeId}> · ${ssrInterpolate(__props.item.distributor_payment.cutoff_relation.cutoff.branch_name)}</span>`);
						else _push(`<!---->`);
						_push(`</p>`);
						if (__props.item.distributor_payment?.cutoff_relation) {
							_push(`<p class="text-muted"${_scopeId}> Lo que debía la relación: <span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(__props.item.distributor_payment.cutoff_relation.total_amount_due)))}</span>`);
							if (__props.item.distributor_payment.cutoff_relation.payment_due_date) _push(`<span${_scopeId}> · Fecha límite de pago: ${ssrInterpolate(__props.item.distributor_payment.cutoff_relation.payment_due_date)}</span>`);
							else _push(`<!---->`);
							_push(`</p>`);
						} else _push(`<!---->`);
						_push(`<p class="text-muted"${_scopeId}> Monto conciliado: <span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(__props.item.reconciled_amount)))}</span>`);
						if (__props.item.bank_transaction?.transaction_date) _push(`<span${_scopeId}> · Fecha del depósito bancario: ${ssrInterpolate(__props.item.bank_transaction.transaction_date)}</span>`);
						else _push(`<!---->`);
						_push(`</p><p class="text-muted"${_scopeId}> Diferencia contra lo que debía la relación: <span class="${ssrRenderClass([Number(__props.item.amount_difference) === 0 ? "text-highlighted" : "text-error", "font-medium"])}"${_scopeId}>${ssrInterpolate(unref(money).format(Number(__props.item.amount_difference)))}</span></p>`);
						if (__props.item.notes) _push(`<p class="text-muted"${_scopeId}> Notas de la cajera: ${ssrInterpolate(__props.item.notes)}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (__props.item.is_retroactive_correction) _push(`<div class="mb-4 space-y-1 rounded-lg border border-warning bg-warning/10 p-4 text-sm"${_scopeId}><p class="font-medium text-warning"${_scopeId}> ⚠ Corrección retroactiva </p><p class="text-muted"${_scopeId}> Esta relación ya tiene multa aplicada (o ya se arrastró a un corte más nuevo). Si apruebas, el sistema revisa si la fecha real del depósito bancario cae dentro del rango &quot;a tiempo&quot; de la relación original: </p><ul class="list-disc space-y-0.5 pl-5 text-muted"${_scopeId}><li${_scopeId}>Si coincide: se le quita la multa y se le regresa la comisión en toda la cadena de corte que arrastró esta deuda, se registra el pago real y se otorgan los puntos completos (sin la penalización del 20%).</li><li${_scopeId}>Si no coincide: la multa se conserva y solo se registra el pago sobre la relación vigente.</li></ul></div>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_component_UForm, {
							schema: unref(schema),
							state: unref(state),
							class: "space-y-4",
							onSubmit
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_URadioGroup, {
										modelValue: unref(decision),
										"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
										items: [{
											label: "Aprobar",
											value: "APROBAR"
										}, {
											label: "Rechazar",
											value: "RECHAZAR"
										}]
									}, null, _parent, _scopeId));
									if (unref(decision) === "RECHAZAR") _push(ssrRenderComponent(_component_UFormField, {
										label: "Motivo del rechazo",
										name: "rejection_reason"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(state).rejection_reason,
												"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
												placeholder: "Explica por qué se rechaza el emparejamiento (relación equivocada, monto no corresponde, etc.)...",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(state).rejection_reason,
												"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
												placeholder: "Explica por qué se rechaza el emparejamiento (relación equivocada, monto no corresponde, etc.)...",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										onClick: ($event) => open.value = false
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UButton, {
										label: unref(decision) === "APROBAR" ? "Aprobar" : "Rechazar",
										color: unref(decision) === "APROBAR" ? "success" : "error",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [
									createVNode(_component_URadioGroup, {
										modelValue: unref(decision),
										"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
										items: [{
											label: "Aprobar",
											value: "APROBAR"
										}, {
											label: "Rechazar",
											value: "RECHAZAR"
										}]
									}, null, 8, ["modelValue", "onUpdate:modelValue"]),
									unref(decision) === "RECHAZAR" ? (openBlock(), createBlock(_component_UFormField, {
										key: 0,
										label: "Motivo del rechazo",
										name: "rejection_reason"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											placeholder: "Explica por qué se rechaza el emparejamiento (relación equivocada, monto no corresponde, etc.)...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})) : createCommentVNode("", true),
									createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										onClick: ($event) => open.value = false
									}, null, 8, ["onClick"]), createVNode(_component_UButton, {
										label: unref(decision) === "APROBAR" ? "Aprobar" : "Rechazar",
										color: unref(decision) === "APROBAR" ? "success" : "error",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, 8, [
										"label",
										"color",
										"loading"
									])])
								];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode("div", { class: "mb-4 space-y-1 rounded-lg border border-default p-4 text-sm" }, [
							createVNode("p", { class: "font-medium text-highlighted" }, toDisplayString(__props.item.distributor_payment?.reported_reference || `Conciliación #${__props.item.id}`), 1),
							__props.item.distributor_payment?.distributor ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-muted"
							}, [
								createTextVNode(" Distribuidora: "),
								createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(__props.item.distributor_payment.distributor.name || "—"), 1),
								createTextVNode(" (" + toDisplayString(__props.item.distributor_payment.distributor.distributor_number) + ") ", 1),
								__props.item.distributor_payment.distributor.category ? (openBlock(), createBlock("span", { key: 0 }, " · Categoría " + toDisplayString(__props.item.distributor_payment.distributor.category.name), 1)) : createCommentVNode("", true)
							])) : createCommentVNode("", true),
							createVNode("p", { class: "text-muted" }, [
								createTextVNode(" Relación de corte: "),
								createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(__props.item.distributor_payment?.cutoff_relation?.relation_number ?? `#${__props.item.distributor_payment?.cutoff_relation_id ?? "—"}`), 1),
								__props.item.distributor_payment?.cutoff_relation?.status ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(__props.item.distributor_payment.cutoff_relation.status), 1)) : createCommentVNode("", true),
								__props.item.distributor_payment?.cutoff_relation?.cutoff?.branch_name ? (openBlock(), createBlock("span", { key: 1 }, " · " + toDisplayString(__props.item.distributor_payment.cutoff_relation.cutoff.branch_name), 1)) : createCommentVNode("", true)
							]),
							__props.item.distributor_payment?.cutoff_relation ? (openBlock(), createBlock("p", {
								key: 1,
								class: "text-muted"
							}, [
								createTextVNode(" Lo que debía la relación: "),
								createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(unref(money).format(Number(__props.item.distributor_payment.cutoff_relation.total_amount_due))), 1),
								__props.item.distributor_payment.cutoff_relation.payment_due_date ? (openBlock(), createBlock("span", { key: 0 }, " · Fecha límite de pago: " + toDisplayString(__props.item.distributor_payment.cutoff_relation.payment_due_date), 1)) : createCommentVNode("", true)
							])) : createCommentVNode("", true),
							createVNode("p", { class: "text-muted" }, [
								createTextVNode(" Monto conciliado: "),
								createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(unref(money).format(Number(__props.item.reconciled_amount))), 1),
								__props.item.bank_transaction?.transaction_date ? (openBlock(), createBlock("span", { key: 0 }, " · Fecha del depósito bancario: " + toDisplayString(__props.item.bank_transaction.transaction_date), 1)) : createCommentVNode("", true)
							]),
							createVNode("p", { class: "text-muted" }, [createTextVNode(" Diferencia contra lo que debía la relación: "), createVNode("span", { class: ["font-medium", Number(__props.item.amount_difference) === 0 ? "text-highlighted" : "text-error"] }, toDisplayString(unref(money).format(Number(__props.item.amount_difference))), 3)]),
							__props.item.notes ? (openBlock(), createBlock("p", {
								key: 2,
								class: "text-muted"
							}, " Notas de la cajera: " + toDisplayString(__props.item.notes), 1)) : createCommentVNode("", true)
						]),
						__props.item.is_retroactive_correction ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-4 space-y-1 rounded-lg border border-warning bg-warning/10 p-4 text-sm"
						}, [
							createVNode("p", { class: "font-medium text-warning" }, " ⚠ Corrección retroactiva "),
							createVNode("p", { class: "text-muted" }, " Esta relación ya tiene multa aplicada (o ya se arrastró a un corte más nuevo). Si apruebas, el sistema revisa si la fecha real del depósito bancario cae dentro del rango \"a tiempo\" de la relación original: "),
							createVNode("ul", { class: "list-disc space-y-0.5 pl-5 text-muted" }, [createVNode("li", null, "Si coincide: se le quita la multa y se le regresa la comisión en toda la cadena de corte que arrastró esta deuda, se registra el pago real y se otorgan los puntos completos (sin la penalización del 20%)."), createVNode("li", null, "Si no coincide: la multa se conserva y solo se registra el pago sobre la relación vigente.")])
						])) : createCommentVNode("", true),
						createVNode(_component_UForm, {
							schema: unref(schema),
							state: unref(state),
							class: "space-y-4",
							onSubmit
						}, {
							default: withCtx(() => [
								createVNode(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [{
										label: "Aprobar",
										value: "APROBAR"
									}, {
										label: "Rechazar",
										value: "RECHAZAR"
									}]
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(decision) === "RECHAZAR" ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
									label: "Motivo del rechazo",
									name: "rejection_reason"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).rejection_reason,
										"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
										placeholder: "Explica por qué se rechaza el emparejamiento (relación equivocada, monto no corresponde, etc.)...",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: unref(decision) === "APROBAR" ? "Aprobar" : "Rechazar",
									color: unref(decision) === "APROBAR" ? "success" : "error",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, [
									"label",
									"color",
									"loading"
								])])
							]),
							_: 1
						}, 8, ["schema", "state"])
					];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-badge-check",
						color: "primary",
						variant: "solid",
						size: "sm"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-badge-check",
						color: "primary",
						variant: "solid",
						size: "sm"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/reconciliations/DecideReconciliationModal.vue
var _sfc_setup$4 = DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reconciliations/DecideReconciliationModal.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var DecideReconciliationModal_default = Object.assign(DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default, { __name: "ReconciliationsDecideReconciliationModal" });
//#endregion
//#region app/components/inbox/ReconciliationsPanel.vue?vue&type=script&setup=true&lang.ts
var ReconciliationsPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ReconciliationsPanel",
	__ssrInlineRender: true,
	props: { items: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_UBadge = _sfc_main$8;
			const _component_ReconciliationsDecideReconciliationModal = DecideReconciliationModal_default;
			if (__props.items.length === 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-12 text-dimmed"
				}, null, _parent));
				_push(`<p class="mt-2 text-sm text-muted"> No hay conciliaciones pendientes de segunda autorización </p></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<div class="px-6 py-4"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3">`);
					_push(ssrRenderComponent(_component_UAvatar, {
						icon: "i-lucide-hand-coins",
						size: "lg"
					}, null, _parent));
					_push(`<div class="min-w-0"><div class="flex items-center gap-2"><p class="truncate font-semibold text-highlighted">${ssrInterpolate(item.distributor_payment?.distributor?.name || item.distributor_payment?.reported_reference || `Conciliación #${item.id}`)}</p>`);
					if (item.is_retroactive_correction) _push(ssrRenderComponent(_component_UBadge, {
						color: "warning",
						variant: "subtle",
						label: "Corrección retroactiva"
					}, null, _parent));
					else _push(`<!---->`);
					_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">`);
					if (item.distributor_payment?.distributor?.distributor_number) _push(`<span>${ssrInterpolate(item.distributor_payment.distributor.distributor_number)}</span>`);
					else _push(`<!---->`);
					if (item.distributor_payment?.cutoff_relation?.cutoff?.branch_name) _push(`<span>${ssrInterpolate(item.distributor_payment.cutoff_relation.cutoff.branch_name)}</span>`);
					else _push(`<!---->`);
					_push(`<span> Registrada ${ssrInterpolate(item.reconciled_at ? new Date(item.reconciled_at).toLocaleDateString("es-MX") : "")}</span></div><p class="mt-1 text-xs text-dimmed"> Relación ${ssrInterpolate(item.distributor_payment?.cutoff_relation?.relation_number ?? `#${item.distributor_payment?.cutoff_relation_id ?? "—"}`)} · Diferencia: ${ssrInterpolate(unref(money).format(Number(item.amount_difference)))}</p></div></div><div class="flex items-center gap-3"><div class="text-right"><p class="text-xs text-muted"> Conciliado: </p><p class="text-sm font-semibold text-highlighted">${ssrInterpolate(unref(money).format(Number(item.reconciled_amount)))}</p></div>`);
					_push(ssrRenderComponent(_component_ReconciliationsDecideReconciliationModal, {
						item,
						onDecided: ($event) => emit("decided")
					}, null, _parent));
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
//#endregion
//#region app/components/inbox/ReconciliationsPanel.vue
var _sfc_setup$3 = ReconciliationsPanel_vue_vue_type_script_setup_true_lang_default.setup;
ReconciliationsPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/ReconciliationsPanel.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ReconciliationsPanel_default = Object.assign(ReconciliationsPanel_vue_vue_type_script_setup_true_lang_default, { __name: "InboxReconciliationsPanel" });
//#endregion
//#region app/components/inbox/DecideRedemptionModal.vue?vue&type=script&setup=true&lang.ts
var DecideRedemptionModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideRedemptionModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			decision: z.enum(["APROBADO", "RECHAZADO"]),
			decision_notes: z.string().optional()
		});
		const open = ref(false);
		const decision = ref("APROBADO");
		const state = reactive({
			decision: "APROBADO",
			decision_notes: void 0
		});
		const { decideRedemption } = useInbox();
		const toast = useToast();
		const submitting = ref(false);
		watch(decision, (value) => {
			state.decision = value;
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await decideRedemption(props.item.id, {
					decision: event.data.decision,
					decision_notes: event.data.decision_notes || void 0
				});
				toast.add({
					title: "Decisión registrada",
					description: `El canje fue ${event.data.decision === "APROBADO" ? "aprobado" : "rechazado"}.`,
					color: "success"
				});
				open.value = false;
				emit("decided");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo registrar la decisión. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main$3;
			const _component_UForm = _sfc_main$a;
			const _component_URadioGroup = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UTextarea = _sfc_main$e;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Decidir canje",
				description: "Aprobar o rechazar el canje de puntos",
				ui: { content: "max-w-xl" }
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
								_push(ssrRenderComponent(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [{
										label: "Aprobar",
										value: "APROBADO"
									}, {
										label: "Rechazar",
										value: "RECHAZADO"
									}]
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Notas de decisión",
									name: "decision_notes"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).decision_notes,
											"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
											placeholder: "Comentarios opcionales...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).decision_notes,
											"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
											placeholder: "Comentarios opcionales...",
											class: "w-full"
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
									label: unref(decision) === "APROBADO" ? "Aprobar" : "Rechazar",
									color: unref(decision) === "APROBADO" ? "success" : "error",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_URadioGroup, {
									modelValue: unref(decision),
									"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
									items: [{
										label: "Aprobar",
										value: "APROBADO"
									}, {
										label: "Rechazar",
										value: "RECHAZADO"
									}]
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_component_UFormField, {
									label: "Notas de decisión",
									name: "decision_notes"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).decision_notes,
										"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
										placeholder: "Comentarios opcionales...",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: unref(decision) === "APROBADO" ? "Aprobar" : "Rechazar",
									color: unref(decision) === "APROBADO" ? "success" : "error",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, [
									"label",
									"color",
									"loading"
								])])
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
							createVNode(_component_URadioGroup, {
								modelValue: unref(decision),
								"onUpdate:modelValue": ($event) => isRef(decision) ? decision.value = $event : null,
								items: [{
									label: "Aprobar",
									value: "APROBADO"
								}, {
									label: "Rechazar",
									value: "RECHAZADO"
								}]
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(_component_UFormField, {
								label: "Notas de decisión",
								name: "decision_notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).decision_notes,
									"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
									placeholder: "Comentarios opcionales...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: unref(decision) === "APROBADO" ? "Aprobar" : "Rechazar",
								color: unref(decision) === "APROBADO" ? "success" : "error",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, [
								"label",
								"color",
								"loading"
							])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Decidir",
						icon: "i-lucide-clipboard-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/inbox/DecideRedemptionModal.vue
var _sfc_setup$2 = DecideRedemptionModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideRedemptionModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/DecideRedemptionModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var DecideRedemptionModal_default = Object.assign(DecideRedemptionModal_vue_vue_type_script_setup_true_lang_default, { __name: "InboxDecideRedemptionModal" });
//#endregion
//#region app/components/inbox/RedemptionsPanel.vue?vue&type=script&setup=true&lang.ts
var RedemptionsPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RedemptionsPanel",
	__ssrInlineRender: true,
	props: { items: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const currency = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 0
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_InboxDecideRedemptionModal = DecideRedemptionModal_default;
			if (__props.items.length === 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-12 text-dimmed"
				}, null, _parent));
				_push(`<p class="mt-2 text-sm text-muted"> No hay canjes de puntos pendientes </p></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.items, (item) => {
					_push(`<div class="px-6 py-4"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex min-w-0 items-center gap-3">`);
					_push(ssrRenderComponent(_component_UAvatar, {
						alt: item.distributor_name || "Distribuidora",
						size: "lg"
					}, null, _parent));
					_push(`<div class="min-w-0"><p class="truncate font-semibold text-highlighted">${ssrInterpolate(item.distributor_name || "Sin nombre")}</p><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"><span>${ssrInterpolate(item.distributor_number)}</span><span>${ssrInterpolate(item.branch_name)}</span><span>${ssrInterpolate(unref(format)(new Date(item.created_at), "dd MMM yyyy"))}</span></div></div></div><div class="flex items-center gap-3"><div class="text-right"><p class="text-sm font-semibold text-highlighted">${ssrInterpolate(Number(item.points).toLocaleString("es-MX"))} pts </p><p class="text-xs text-muted"> Equivale a ${ssrInterpolate(unref(currency).format(Number(item.amount_mxn)))}</p></div>`);
					_push(ssrRenderComponent(_component_InboxDecideRedemptionModal, {
						item,
						onDecided: ($event) => emit("decided")
					}, null, _parent));
					_push(`</div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
//#endregion
//#region app/components/inbox/RedemptionsPanel.vue
var _sfc_setup$1 = RedemptionsPanel_vue_vue_type_script_setup_true_lang_default.setup;
RedemptionsPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/RedemptionsPanel.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var RedemptionsPanel_default = Object.assign(RedemptionsPanel_vue_vue_type_script_setup_true_lang_default, { __name: "InboxRedemptionsPanel" });
//#endregion
//#region app/pages/general/inbox.vue?vue&type=script&setup=true&lang.ts
var inbox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "inbox",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { listInbox } = useInbox();
		useBranches();
		const { listCustomerChangeRequests } = useCustomers();
		const { listCoordinatorTransfers } = useCustomerTransfers();
		const { user } = useAuth();
		const toast = useToast();
		const branchId = ref(null);
		const branches = ref([]);
		const canApproveCustomers = computed(() => user.value?.permissions?.includes("customers.update.approve") ?? false);
		const canDecideTransfers = computed(() => user.value?.permissions?.includes("customers.transfer.decide") ?? false);
		const emptyChangeRequestsPage = {
			data: [],
			links: [],
			meta: {
				current_page: 1,
				last_page: 1,
				per_page: 15,
				total: 0
			}
		};
		const { data: customerRequests, refresh: refreshCustomerRequests } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("inbox-customer-requests", () => {
			if (!canApproveCustomers.value) return Promise.resolve(emptyChangeRequestsPage);
			return listCustomerChangeRequests({
				status: "PENDIENTE",
				page: 1
			});
		}, { default: () => emptyChangeRequestsPage })), __temp = await __temp, __restore(), __temp);
		const pendingCustomerRequests = computed(() => customerRequests.value.data ?? []);
		const emptyTransfersPage = {
			data: [],
			links: [],
			meta: {
				current_page: 1,
				last_page: 1,
				per_page: 15,
				total: 0
			}
		};
		const { data: transferRequests, refresh: refreshTransferRequests } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("inbox-customer-transfers", () => {
			if (!canDecideTransfers.value) return Promise.resolve(emptyTransfersPage);
			return listCoordinatorTransfers({ status: "PENDIENTE_COORDINADOR" });
		}, { default: () => emptyTransfersPage })), __temp = await __temp, __restore(), __temp);
		const pendingTransferRequests = computed(() => transferRequests.value.data ?? []);
		const tabItems = computed(() => {
			const totals = data.value;
			const items = [
				{
					label: `Distribuidoras (${totals?.applications?.total ?? 0})`,
					value: "applications"
				},
				{
					label: `Crédito (${totals?.credit_increases?.total ?? 0})`,
					value: "credit"
				},
				{
					label: `Puntos (${totals?.redemptions?.total ?? 0})`,
					value: "redemptions"
				},
				{
					label: `Conciliaciones (${totals?.reconciliations?.total ?? 0})`,
					value: "reconciliations"
				}
			];
			if (canApproveCustomers.value) items.push({
				label: `Clientes (${pendingCustomerRequests.value.length})`,
				value: "customers"
			});
			if (canDecideTransfers.value) items.push({
				label: `Transferencias (${pendingTransferRequests.value.length})`,
				value: "transfers"
			});
			return items;
		});
		const selectedTab = ref("applications");
		const { data, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("inbox", () => listInbox(void 0, branchId.value), {
			watch: [branchId],
			default: () => ({})
		})), __temp = await __temp, __restore(), __temp);
		watch(error, async (e) => {
			if (!e) return;
			const statusCode = e.statusCode;
			if (statusCode === 401) {
				const { logout } = useAuth();
				await logout();
				await navigateTo("/login");
				return;
			}
			toast.add({
				title: "No se pudo cargar la bandeja",
				description: statusCode ? `El servidor respondió con el código ${statusCode}.` : "Revisa tu conexión con el servidor.",
				color: "error",
				duration: 8e3
			});
		});
		async function onDecided() {
			await refresh();
			await refreshCustomerRequests();
			await refreshTransferRequests();
			toast.add({
				title: "Lista actualizada",
				description: "La decisión se registró correctamente.",
				color: "success"
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$4;
			const _component_UDashboardSidebarCollapse = _sfc_main$6;
			const _component_USelect = _sfc_main$5;
			const _component_UDashboardToolbar = _sfc_main;
			const _component_UTabs = _sfc_main$7;
			const _component_UIcon = _sfc_main$2;
			const _component_UButton = _sfc_main$3;
			const _component_InboxApplicationsPanel = ApplicationsPanel_default;
			const _component_InboxCreditPanel = CreditPanel_default;
			const _component_InboxCustomersPanel = InboxCustomersPanel_default;
			const _component_InboxCustomerTransfersPanel = CustomerTransfersPanel_default;
			const _component_InboxReconciliationsPanel = ReconciliationsPanel_default;
			const _component_InboxRedemptionsPanel = RedemptionsPanel_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "inbox" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Bandeja de aprobaciones" }, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
								else return [createVNode(_component_UDashboardSidebarCollapse)];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
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
								else return [createVNode(_component_USelect, {
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
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UDashboardToolbar, null, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTabs, {
									modelValue: unref(selectedTab),
									"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
									items: unref(tabItems),
									content: false,
									class: "-mx-1"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UTabs, {
									modelValue: unref(selectedTab),
									"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
									items: unref(tabItems),
									content: false,
									class: "-mx-1"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UDashboardNavbar, { title: "Bandeja de aprobaciones" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_USelect, {
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
						])]),
						_: 1
					}), createVNode(_component_UDashboardToolbar, null, {
						default: withCtx(() => [createVNode(_component_UTabs, {
							modelValue: unref(selectedTab),
							"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
							items: unref(tabItems),
							content: false,
							class: "-mx-1"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (unref(status) === "pending") {
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
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudo cargar la bandeja de aprobaciones. </p>`);
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
						if (unref(selectedTab) === "applications") {
							_push(`<div class="h-full overflow-y-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InboxApplicationsPanel, {
								items: unref(data).applications?.items ?? [],
								onDecided
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "credit") {
							_push(`<div class="h-full overflow-y-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InboxCreditPanel, {
								items: unref(data).credit_increases?.items ?? [],
								onDecided
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "customers") {
							_push(`<div class="h-full overflow-y-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InboxCustomersPanel, {
								items: unref(pendingCustomerRequests),
								onDecided
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "transfers") {
							_push(`<div class="h-full overflow-y-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InboxCustomerTransfersPanel, {
								items: unref(pendingTransferRequests),
								onDecided
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "reconciliations") {
							_push(`<div class="h-full overflow-y-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InboxReconciliationsPanel, {
								items: unref(data).reconciliations?.items ?? [],
								onDecided
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else {
							_push(`<div class="h-full overflow-y-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InboxRedemptionsPanel, {
								items: unref(data).redemptions?.items ?? [],
								onDecided
							}, null, _parent, _scopeId));
							_push(`</div>`);
						}
						_push(`<!--]-->`);
					}
					else return [unref(status) === "pending" ? (openBlock(), createBlock("div", {
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudo cargar la bandeja de aprobaciones. "),
						createVNode(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock(Fragment, { key: 2 }, [unref(selectedTab) === "applications" ? (openBlock(), createBlock("div", {
						key: 0,
						class: "h-full overflow-y-auto"
					}, [createVNode(_component_InboxApplicationsPanel, {
						items: unref(data).applications?.items ?? [],
						onDecided
					}, null, 8, ["items"])])) : unref(selectedTab) === "credit" ? (openBlock(), createBlock("div", {
						key: 1,
						class: "h-full overflow-y-auto"
					}, [createVNode(_component_InboxCreditPanel, {
						items: unref(data).credit_increases?.items ?? [],
						onDecided
					}, null, 8, ["items"])])) : unref(selectedTab) === "customers" ? (openBlock(), createBlock("div", {
						key: 2,
						class: "h-full overflow-y-auto"
					}, [createVNode(_component_InboxCustomersPanel, {
						items: unref(pendingCustomerRequests),
						onDecided
					}, null, 8, ["items"])])) : unref(selectedTab) === "transfers" ? (openBlock(), createBlock("div", {
						key: 3,
						class: "h-full overflow-y-auto"
					}, [createVNode(_component_InboxCustomerTransfersPanel, {
						items: unref(pendingTransferRequests),
						onDecided
					}, null, 8, ["items"])])) : unref(selectedTab) === "reconciliations" ? (openBlock(), createBlock("div", {
						key: 4,
						class: "h-full overflow-y-auto"
					}, [createVNode(_component_InboxReconciliationsPanel, {
						items: unref(data).reconciliations?.items ?? [],
						onDecided
					}, null, 8, ["items"])])) : (openBlock(), createBlock("div", {
						key: 5,
						class: "h-full overflow-y-auto"
					}, [createVNode(_component_InboxRedemptionsPanel, {
						items: unref(data).redemptions?.items ?? [],
						onDecided
					}, null, 8, ["items"])]))], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/inbox.vue
var _sfc_setup = inbox_vue_vue_type_script_setup_true_lang_default.setup;
inbox_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/inbox.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var inbox_default = inbox_vue_vue_type_script_setup_true_lang_default;

export { inbox_default as default };
//# sourceMappingURL=inbox-Cd60rs2r.mjs.map
