import { al as useAuth, aP as useToast, ak as useAsyncData, j as _sfc_main$2$1, f as _sfc_main$3, h as _sfc_main$1$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$2 } from './Select-CHtpM6Dc.mjs';
import { _ as _sfc_main$c } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$5 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$9 } from './Tabs-v7E64e5z.mjs';
import { _ as _sfc_main$a } from './Modal-BQ_M11w-.mjs';
import { _ as _sfc_main$4 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main } from './Input-YDRYCqsV.mjs';
import { c as customerFullName } from './useCustomers-Z8wRBFPR.mjs';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './DashboardNavbar-BzzI9nrt.mjs';
import { _ as _sfc_main$7 } from './DashboardSidebarCollapse-CBDjl-2o.mjs';
import { _ as _sfc_main$b } from './Form-j1wdqi9R.mjs';
import { u as useBranches } from './useBranches-BECDq2r0.mjs';
import { _ as _sfc_main$d } from './Textarea-ChxtXYe7.mjs';
import { u as useReconciliations } from './useReconciliations-DXy4E_V7.mjs';
import { _ as _sfc_main$8 } from './DashboardToolbar-BIyqk-SW.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, withCtx, unref, isRef, openBlock, createBlock, Fragment, createVNode, renderList, toDisplayString, createCommentVNode, reactive, watch, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import './DashboardSidebarToggle-J0oVNQdJ.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './PopperArrow-CXqc9lvy.mjs';
import './RovingFocusGroup-BqLcWsjw.mjs';
import './RovingFocusItem-ZwMKkLfk.mjs';
import './overlay-7pzjQIHW.mjs';

//#region app/components/reconciliations/ManualMatchModal.vue?vue&type=script&setup=true&lang.ts
var ManualMatchModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ManualMatchModal",
	__ssrInlineRender: true,
	props: { transaction: {} },
	emits: ["matched"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			cutoff_id: z.number({ message: "Selecciona un corte." }),
			cutoff_relation_id: z.number({ message: "Selecciona una relación." }),
			amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]).optional(),
			payment_method: z.enum([
				"TRANSFER",
				"DEPOSIT",
				"OTHER"
			]).optional(),
			notes: z.string().max(255).optional()
		});
		const open = ref(false);
		const toast = useToast();
		const submitting = ref(false);
		const { listCutoffs, listCutoffRelations, manualMatch } = useReconciliations();
		const cutoffItems = ref([]);
		const relations = ref([]);
		const loadingCutoffs = ref(false);
		const loadingRelations = ref(false);
		const state = reactive({
			cutoff_id: void 0,
			cutoff_relation_id: void 0,
			amount: void 0,
			payment_method: "DEPOSIT",
			notes: void 0
		});
		const eligibleStatuses = [
			"GENERADA",
			"PARCIAL",
			"VENCIDA"
		];
		const relationItems = computed(() => {
			return relations.value.filter((relation) => eligibleStatuses.includes(relation.status ?? "")).map((relation) => ({
				label: `${relation.distributor?.person ? customerFullName(relation.distributor.person) : `Distribuidor ${relation.distributor_id}`} · ${relation.relation_number} · $${relation.total_amount_due}`,
				value: relation.id
			}));
		});
		watch(open, async (isOpen) => {
			if (!isOpen) return;
			state.cutoff_id = void 0;
			state.cutoff_relation_id = void 0;
			state.amount = props.transaction.amount;
			state.payment_method = "DEPOSIT";
			state.notes = void 0;
			relations.value = [];
			loadingCutoffs.value = true;
			try {
				const page = await listCutoffs();
				cutoffItems.value = page.data.filter((cutoff) => (cutoff.relations_count ?? 0) > 0).map((cutoff) => ({
					label: `Corte #${cutoff.id} · ${cutoff.status ?? "SIN ESTADO"} · ${cutoff.relations_count} relaciones`,
					value: cutoff.id
				}));
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron cargar los cortes disponibles.",
					color: "error"
				});
			} finally {
				loadingCutoffs.value = false;
			}
		});
		watch(() => state.cutoff_id, async (cutoffId) => {
			state.cutoff_relation_id = void 0;
			relations.value = [];
			if (!cutoffId) return;
			loadingRelations.value = true;
			try {
				relations.value = await listCutoffRelations(cutoffId);
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron cargar las relaciones del corte.",
					color: "error"
				});
			} finally {
				loadingRelations.value = false;
			}
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await manualMatch(props.transaction.id, {
					cutoff_relation_id: event.data.cutoff_relation_id,
					amount: event.data.amount ? String(event.data.amount) : void 0,
					payment_method: event.data.payment_method,
					notes: event.data.notes
				});
				toast.add({
					title: "Conciliación registrada",
					description: "Quedó pendiente de la segunda autorización.",
					color: "success"
				});
				open.value = false;
				emit("matched");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo registrar la conciliación. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$a;
			const _component_UButton = _sfc_main$3;
			const _component_UForm = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_USelect = _sfc_main$2;
			const _component_UInput = _sfc_main;
			const _component_UTextarea = _sfc_main$d;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Conciliar depósito",
				description: "Emparejar la transacción con una relación de corte",
				ui: { content: "max-w-2xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mb-4 rounded-md bg-elevated p-4"${_scopeId}><div class="flex items-center justify-between gap-4"${_scopeId}><div class="min-w-0"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(__props.transaction.reference)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(__props.transaction.payer_name || "Pago bancario")} · ${ssrInterpolate(__props.transaction.transaction_date)}</p></div><p class="shrink-0 text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(new Intl.NumberFormat("es-MX", {
							style: "currency",
							currency: "MXN"
						}).format(Number(__props.transaction.amount)))}</p></div></div>`);
						_push(ssrRenderComponent(_component_UForm, {
							schema: unref(schema),
							state: unref(state),
							class: "space-y-4",
							onSubmit
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Corte",
										name: "cutoff_id"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_USelect, {
												modelValue: unref(state).cutoff_id,
												"onUpdate:modelValue": ($event) => unref(state).cutoff_id = $event,
												items: unref(cutoffItems),
												placeholder: "Seleccionar corte...",
												loading: unref(loadingCutoffs),
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_USelect, {
												modelValue: unref(state).cutoff_id,
												"onUpdate:modelValue": ($event) => unref(state).cutoff_id = $event,
												items: unref(cutoffItems),
												placeholder: "Seleccionar corte...",
												loading: unref(loadingCutoffs),
												class: "w-full"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"items",
												"loading"
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Relación de corte",
										name: "cutoff_relation_id"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_USelect, {
												modelValue: unref(state).cutoff_relation_id,
												"onUpdate:modelValue": ($event) => unref(state).cutoff_relation_id = $event,
												items: unref(relationItems),
												placeholder: "Seleccionar relación...",
												loading: unref(loadingRelations),
												disabled: !unref(state).cutoff_id,
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_USelect, {
												modelValue: unref(state).cutoff_relation_id,
												"onUpdate:modelValue": ($event) => unref(state).cutoff_relation_id = $event,
												items: unref(relationItems),
												placeholder: "Seleccionar relación...",
												loading: unref(loadingRelations),
												disabled: !unref(state).cutoff_id,
												class: "w-full"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"items",
												"loading",
												"disabled"
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Monto conciliado (MXN)",
										name: "amount"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).amount,
												"onUpdate:modelValue": ($event) => unref(state).amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).amount,
												"onUpdate:modelValue": ($event) => unref(state).amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Método de pago",
										name: "payment_method"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_USelect, {
												modelValue: unref(state).payment_method,
												"onUpdate:modelValue": ($event) => unref(state).payment_method = $event,
												items: [
													{
														label: "Depósito",
														value: "DEPOSIT"
													},
													{
														label: "Transferencia",
														value: "TRANSFER"
													},
													{
														label: "Otro",
														value: "OTHER"
													}
												],
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_USelect, {
												modelValue: unref(state).payment_method,
												"onUpdate:modelValue": ($event) => unref(state).payment_method = $event,
												items: [
													{
														label: "Depósito",
														value: "DEPOSIT"
													},
													{
														label: "Transferencia",
														value: "TRANSFER"
													},
													{
														label: "Otro",
														value: "OTHER"
													}
												],
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Notas (opcional)",
										name: "notes"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(state).notes,
												"onUpdate:modelValue": ($event) => unref(state).notes = $event,
												placeholder: "Contexto de la conciliación...",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(state).notes,
												"onUpdate:modelValue": ($event) => unref(state).notes = $event,
												placeholder: "Contexto de la conciliación...",
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
										label: "Registrar conciliación",
										color: "primary",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [
									createVNode(_component_UFormField, {
										label: "Corte",
										name: "cutoff_id"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).cutoff_id,
											"onUpdate:modelValue": ($event) => unref(state).cutoff_id = $event,
											items: unref(cutoffItems),
											placeholder: "Seleccionar corte...",
											loading: unref(loadingCutoffs),
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items",
											"loading"
										])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Relación de corte",
										name: "cutoff_relation_id"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).cutoff_relation_id,
											"onUpdate:modelValue": ($event) => unref(state).cutoff_relation_id = $event,
											items: unref(relationItems),
											placeholder: "Seleccionar relación...",
											loading: unref(loadingRelations),
											disabled: !unref(state).cutoff_id,
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items",
											"loading",
											"disabled"
										])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Monto conciliado (MXN)",
										name: "amount"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).amount,
											"onUpdate:modelValue": ($event) => unref(state).amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Método de pago",
										name: "payment_method"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).payment_method,
											"onUpdate:modelValue": ($event) => unref(state).payment_method = $event,
											items: [
												{
													label: "Depósito",
													value: "DEPOSIT"
												},
												{
													label: "Transferencia",
													value: "TRANSFER"
												},
												{
													label: "Otro",
													value: "OTHER"
												}
											],
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Notas (opcional)",
										name: "notes"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
											placeholder: "Contexto de la conciliación...",
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
										label: "Registrar conciliación",
										color: "primary",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, 8, ["loading"])])
								];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode("div", { class: "mb-4 rounded-md bg-elevated p-4" }, [createVNode("div", { class: "flex items-center justify-between gap-4" }, [createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(__props.transaction.reference), 1), createVNode("p", { class: "text-xs text-muted" }, toDisplayString(__props.transaction.payer_name || "Pago bancario") + " · " + toDisplayString(__props.transaction.transaction_date), 1)]), createVNode("p", { class: "shrink-0 text-sm font-semibold text-highlighted" }, toDisplayString(new Intl.NumberFormat("es-MX", {
						style: "currency",
						currency: "MXN"
					}).format(Number(__props.transaction.amount))), 1)])]), createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UFormField, {
								label: "Corte",
								name: "cutoff_id"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).cutoff_id,
									"onUpdate:modelValue": ($event) => unref(state).cutoff_id = $event,
									items: unref(cutoffItems),
									placeholder: "Seleccionar corte...",
									loading: unref(loadingCutoffs),
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items",
									"loading"
								])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Relación de corte",
								name: "cutoff_relation_id"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).cutoff_relation_id,
									"onUpdate:modelValue": ($event) => unref(state).cutoff_relation_id = $event,
									items: unref(relationItems),
									placeholder: "Seleccionar relación...",
									loading: unref(loadingRelations),
									disabled: !unref(state).cutoff_id,
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items",
									"loading",
									"disabled"
								])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Monto conciliado (MXN)",
								name: "amount"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).amount,
									"onUpdate:modelValue": ($event) => unref(state).amount = $event,
									type: "number",
									min: "0",
									step: "0.01",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Método de pago",
								name: "payment_method"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).payment_method,
									"onUpdate:modelValue": ($event) => unref(state).payment_method = $event,
									items: [
										{
											label: "Depósito",
											value: "DEPOSIT"
										},
										{
											label: "Transferencia",
											value: "TRANSFER"
										},
										{
											label: "Otro",
											value: "OTHER"
										}
									],
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Notas (opcional)",
								name: "notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).notes,
									"onUpdate:modelValue": ($event) => unref(state).notes = $event,
									placeholder: "Contexto de la conciliación...",
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
								label: "Registrar conciliación",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Conciliar",
						icon: "i-lucide-hand-coins",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Conciliar",
						icon: "i-lucide-hand-coins",
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
//#region app/components/reconciliations/ManualMatchModal.vue
var _sfc_setup$1 = ManualMatchModal_vue_vue_type_script_setup_true_lang_default.setup;
ManualMatchModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reconciliations/ManualMatchModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ManualMatchModal_default = Object.assign(ManualMatchModal_vue_vue_type_script_setup_true_lang_default, { __name: "ReconciliationsManualMatchModal" });
//#endregion
//#region app/pages/general/reconciliations.vue?vue&type=script&setup=true&lang.ts
var reconciliations_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "reconciliations",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { listBankTransactions, listReconciliations, verifyReconciliation, importBankDeposits } = useReconciliations();
		const { listBranches } = useBranches();
		const { user } = useAuth();
		const toast = useToast();
		const page = ref(1);
		const reconciled = ref(void 0);
		const reference = ref("");
		const canImport = computed(() => user.value?.permissions?.includes("reconciliations.import") ?? false);
		const canVerify = computed(() => user.value?.permissions?.includes("reconciliations.verify") ?? false);
		const canManualMatch = computed(() => user.value?.permissions?.includes("reconciliations.manual") ?? false);
		const selectedTab = ref("movements");
		const cashierBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "cashier" && r.branch_id !== null)?.branch_id ?? null;
		});
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("reconciliations-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const importBranchId = computed(() => cashierBranchId.value ?? branches.value[0]?.id ?? null);
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("bank-transactions", () => listBankTransactions({
			reconciled: reconciled.value,
			reference: reference.value || void 0,
			page: page.value
		}), {
			watch: [page, reconciled],
			default: () => ({
				data: [],
				links: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const emptyPage = {
			data: [],
			links: [],
			meta: {
				current_page: 1,
				last_page: 1,
				per_page: 15,
				total: 0
			}
		};
		const { data: pendingData, status: pendingStatus, refresh: refreshPending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("pending-reconciliations", () => canVerify.value ? listReconciliations({ pending_verification: true }) : Promise.resolve(emptyPage), {
			watch: [canVerify],
			default: () => emptyPage
		})), __temp = await __temp, __restore(), __temp);
		const items = computed(() => data.value.data ?? []);
		const meta = computed(() => data.value.meta);
		const pendingItems = computed(() => pendingData.value.data ?? []);
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		let searchTimer;
		function onSearch() {
			clearTimeout(searchTimer);
			searchTimer = setTimeout(() => {
				page.value = 1;
				refresh();
			}, 400);
		}
		async function onMatched() {
			await refresh();
			await refreshPending();
		}
		const fileInput = ref(null);
		const importing = ref(false);
		function pickImportFile() {
			fileInput.value?.click();
		}
		async function onImportFileSelected(event) {
			const input = event.target;
			const file = input.files?.[0];
			if (!file) return;
			if (!importBranchId.value) {
				toast.add({
					title: "Sin sucursal",
					description: "No se encontró la sucursal para importar.",
					color: "error"
				});
				input.value = "";
				return;
			}
			importing.value = true;
			try {
				const result = await importBankDeposits(importBranchId.value, file);
				toast.add({
					title: "Importación completada",
					description: `${result.import.row_count} filas importadas, ${result.import.error_count} con error, ${result.auto_matched} auto-conciliadas.`,
					color: "success",
					duration: 8e3
				});
				await refresh();
				await refreshPending();
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo importar el archivo. Revisa el formato.",
					color: "error"
				});
			} finally {
				importing.value = false;
				input.value = "";
			}
		}
		async function onVerify(item) {
			try {
				await verifyReconciliation(item.id);
				toast.add({
					title: "Conciliación verificada",
					description: item.status === "CONCILIADA" ? "La relación se marcó como pagada." : "La conciliación quedó registrada con diferencia.",
					color: "success"
				});
				await refreshPending();
				await refresh();
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo verificar la conciliación.",
					color: "error"
				});
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$6;
			const _component_UDashboardSidebarCollapse = _sfc_main$7;
			const _component_UButton = _sfc_main$3;
			const _component_UDashboardToolbar = _sfc_main$8;
			const _component_UTabs = _sfc_main$9;
			const _component_UInput = _sfc_main;
			const _component_USelect = _sfc_main$2;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_UBadge = _sfc_main$4;
			const _component_ReconciliationsManualMatchModal = ManualMatchModal_default;
			const _component_UPagination = _sfc_main$5;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "reconciliations" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Conciliaciones" }, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
								else return [createVNode(_component_UDashboardSidebarCollapse)];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (unref(canImport)) _push(ssrRenderComponent(_component_UButton, {
										label: "Importar archivo",
										icon: "i-lucide-upload",
										color: "primary",
										variant: "solid",
										loading: unref(importing),
										onClick: pickImportFile
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`<input type="file" accept=".csv,.txt,.xls,.xlsx" class="hidden"${_scopeId}>`);
								} else return [unref(canImport) ? (openBlock(), createBlock(_component_UButton, {
									key: 0,
									label: "Importar archivo",
									icon: "i-lucide-upload",
									color: "primary",
									variant: "solid",
									loading: unref(importing),
									onClick: pickImportFile
								}, null, 8, ["loading"])) : createCommentVNode("", true), createVNode("input", {
									ref_key: "fileInput",
									ref: fileInput,
									type: "file",
									accept: ".csv,.txt,.xls,.xlsx",
									class: "hidden",
									onChange: onImportFileSelected
								}, null, 544)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UDashboardToolbar, null, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTabs, {
									modelValue: unref(selectedTab),
									"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
									items: [{
										label: "Movimientos bancarios",
										value: "movements"
									}, ...unref(canVerify) ? [{
										label: `Por verificar (${unref(pendingItems).length})`,
										value: "pending"
									}] : []],
									content: false,
									class: "-mx-1"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UTabs, {
									modelValue: unref(selectedTab),
									"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
									items: [{
										label: "Movimientos bancarios",
										value: "movements"
									}, ...unref(canVerify) ? [{
										label: `Por verificar (${unref(pendingItems).length})`,
										value: "pending"
									}] : []],
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
					} else return [createVNode(_component_UDashboardNavbar, { title: "Conciliaciones" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [unref(canImport) ? (openBlock(), createBlock(_component_UButton, {
							key: 0,
							label: "Importar archivo",
							icon: "i-lucide-upload",
							color: "primary",
							variant: "solid",
							loading: unref(importing),
							onClick: pickImportFile
						}, null, 8, ["loading"])) : createCommentVNode("", true), createVNode("input", {
							ref_key: "fileInput",
							ref: fileInput,
							type: "file",
							accept: ".csv,.txt,.xls,.xlsx",
							class: "hidden",
							onChange: onImportFileSelected
						}, null, 544)]),
						_: 1
					}), createVNode(_component_UDashboardToolbar, null, {
						default: withCtx(() => [createVNode(_component_UTabs, {
							modelValue: unref(selectedTab),
							"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
							items: [{
								label: "Movimientos bancarios",
								value: "movements"
							}, ...unref(canVerify) ? [{
								label: `Por verificar (${unref(pendingItems).length})`,
								value: "pending"
							}] : []],
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
					if (_push) if (unref(selectedTab) === "movements") {
						_push(`<!--[--><div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(reference),
							"onUpdate:modelValue": [($event) => isRef(reference) ? reference.value = $event : null, onSearch],
							placeholder: "Buscar por referencia...",
							icon: "i-lucide-search",
							class: "w-64"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(reconciled),
							"onUpdate:modelValue": ($event) => isRef(reconciled) ? reconciled.value = $event : null,
							items: [
								{
									label: "Todas",
									value: void 0
								},
								{
									label: "Conciliadas",
									value: "yes"
								},
								{
									label: "Sin conciliar",
									value: "no"
								}
							],
							placeholder: "Estado",
							class: "w-40"
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
							_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar las transacciones bancarias. </p>`);
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
									name: "i-lucide-landmark",
									class: "size-12 text-dimmed"
								}, null, _parent, _scopeId));
								_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay transacciones bancarias </p></div>`);
							} else {
								_push(`<div class="h-full overflow-y-auto divide-y divide-default"${_scopeId}><!--[-->`);
								ssrRenderList(unref(items), (item) => {
									_push(`<div class="px-6 py-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UAvatar, {
										alt: item.payer_name || "Banco",
										icon: "i-lucide-landmark",
										size: "lg"
									}, null, _parent, _scopeId));
									_push(`<div class="min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(item.reference)}</p>`);
									if (item.reconciled) _push(ssrRenderComponent(_component_UBadge, {
										color: "success",
										variant: "subtle",
										label: item.reconciliation?.status === "PENDIENTE_VERIFICACION" ? "Por verificar" : item.reconciliation?.status ?? "Conciliada"
									}, null, _parent, _scopeId));
									else _push(ssrRenderComponent(_component_UBadge, {
										color: "warning",
										variant: "subtle",
										label: "Sin conciliar"
									}, null, _parent, _scopeId));
									_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"${_scopeId}><span${_scopeId}>${ssrInterpolate(item.payer_name || "Pago bancario")}</span><span${_scopeId}>${ssrInterpolate(item.transaction_date)}</span>`);
									if (item.transaction_type) _push(`<span${_scopeId}>${ssrInterpolate(item.transaction_type)}</span>`);
									else _push(`<!---->`);
									_push(`</div></div></div><div class="flex items-center gap-3"${_scopeId}><p class="text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(item.amount)))}</p>`);
									if (!item.reconciled && unref(canManualMatch)) _push(ssrRenderComponent(_component_ReconciliationsManualMatchModal, {
										transaction: item,
										onMatched
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`</div></div></div>`);
								});
								_push(`<!--]--></div>`);
							}
							if (unref(meta).last_page > 1) {
								_push(`<div class="flex justify-end px-6 py-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									page: unref(page),
									"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
									total: unref(meta).total,
									"items-per-page": unref(meta).per_page
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`<!--]-->`);
						}
						_push(`<!--]-->`);
					} else {
						_push(`<!--[-->`);
						if (unref(pendingStatus) === "pending") {
							_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-8 animate-spin text-muted"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(pendingItems).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-check-circle",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay conciliaciones pendientes de segunda autorización </p></div>`);
						} else {
							_push(`<div class="h-full overflow-y-auto divide-y divide-default"${_scopeId}><!--[-->`);
							ssrRenderList(unref(pendingItems), (item) => {
								_push(`<div class="px-6 py-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UAvatar, {
									icon: "i-lucide-hand-coins",
									size: "lg"
								}, null, _parent, _scopeId));
								_push(`<div class="min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(item.distributor_payment?.reported_reference || `Conciliación #${item.id}`)}</p>`);
								_push(ssrRenderComponent(_component_UBadge, {
									color: "warning",
									variant: "subtle",
									label: "Por verificar"
								}, null, _parent, _scopeId));
								_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"${_scopeId}><span${_scopeId}> Registrada ${ssrInterpolate(item.reconciled_at ? new Date(item.reconciled_at).toLocaleDateString("es-MX") : "")}</span>`);
								if (item.notes) _push(`<span${_scopeId}>${ssrInterpolate(item.notes)}</span>`);
								else _push(`<!---->`);
								_push(`</div><p class="mt-1 text-xs text-dimmed"${_scopeId}> Relación ${ssrInterpolate(item.distributor_payment?.cutoff_relation_id ?? "—")} · Diferencia: ${ssrInterpolate(unref(money).format(Number(item.amount_difference)))}</p></div></div><div class="flex items-center gap-3"${_scopeId}><div class="text-right"${_scopeId}><p class="text-xs text-muted"${_scopeId}> Conciliado: </p><p class="text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(item.reconciled_amount)))}</p></div>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Verificar",
									icon: "i-lucide-badge-check",
									color: "success",
									variant: "solid",
									size: "sm",
									onClick: ($event) => onVerify(item)
								}, null, _parent, _scopeId));
								_push(`</div></div></div>`);
							});
							_push(`<!--]--></div>`);
						}
						_push(`<!--]-->`);
					}
					else return [unref(selectedTab) === "movements" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode(_component_UInput, {
						modelValue: unref(reference),
						"onUpdate:modelValue": [($event) => isRef(reference) ? reference.value = $event : null, onSearch],
						placeholder: "Buscar por referencia...",
						icon: "i-lucide-search",
						class: "w-64"
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_USelect, {
						modelValue: unref(reconciled),
						"onUpdate:modelValue": ($event) => isRef(reconciled) ? reconciled.value = $event : null,
						items: [
							{
								label: "Todas",
								value: void 0
							},
							{
								label: "Conciliadas",
								value: "yes"
							},
							{
								label: "Sin conciliar",
								value: "no"
							}
						],
						placeholder: "Estado",
						class: "w-40"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]), unref(status) === "pending" ? (openBlock(), createBlock("div", {
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar las transacciones bancarias. "),
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
						name: "i-lucide-landmark",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay transacciones bancarias ")])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "h-full overflow-y-auto divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item) => {
						return openBlock(), createBlock("div", {
							key: item.id,
							class: "px-6 py-4"
						}, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode(_component_UAvatar, {
							alt: item.payer_name || "Banco",
							icon: "i-lucide-landmark",
							size: "lg"
						}, null, 8, ["alt"]), createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(item.reference), 1), item.reconciled ? (openBlock(), createBlock(_component_UBadge, {
							key: 0,
							color: "success",
							variant: "subtle",
							label: item.reconciliation?.status === "PENDIENTE_VERIFICACION" ? "Por verificar" : item.reconciliation?.status ?? "Conciliada"
						}, null, 8, ["label"])) : (openBlock(), createBlock(_component_UBadge, {
							key: 1,
							color: "warning",
							variant: "subtle",
							label: "Sin conciliar"
						}))]), createVNode("div", { class: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted" }, [
							createVNode("span", null, toDisplayString(item.payer_name || "Pago bancario"), 1),
							createVNode("span", null, toDisplayString(item.transaction_date), 1),
							item.transaction_type ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.transaction_type), 1)) : createCommentVNode("", true)
						])])]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("p", { class: "text-sm font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(item.amount))), 1), !item.reconciled && unref(canManualMatch) ? (openBlock(), createBlock(_component_ReconciliationsManualMatchModal, {
							key: 0,
							transaction: item,
							onMatched
						}, null, 8, ["transaction"])) : createCommentVNode("", true)])])]);
					}), 128))])), unref(meta).last_page > 1 ? (openBlock(), createBlock("div", {
						key: 2,
						class: "flex justify-end px-6 py-3"
					}, [createVNode(_component_UPagination, {
						page: unref(page),
						"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
						total: unref(meta).total,
						"items-per-page": unref(meta).per_page
					}, null, 8, [
						"page",
						"onUpdate:page",
						"total",
						"items-per-page"
					])])) : createCommentVNode("", true)], 64))], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [unref(pendingStatus) === "pending" ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : unref(pendingItems).length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-check-circle",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay conciliaciones pendientes de segunda autorización ")])) : (openBlock(), createBlock("div", {
						key: 2,
						class: "h-full overflow-y-auto divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(pendingItems), (item) => {
						return openBlock(), createBlock("div", {
							key: item.id,
							class: "px-6 py-4"
						}, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode(_component_UAvatar, {
							icon: "i-lucide-hand-coins",
							size: "lg"
						}), createVNode("div", { class: "min-w-0" }, [
							createVNode("div", { class: "flex items-center gap-2" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(item.distributor_payment?.reported_reference || `Conciliación #${item.id}`), 1), createVNode(_component_UBadge, {
								color: "warning",
								variant: "subtle",
								label: "Por verificar"
							})]),
							createVNode("div", { class: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted" }, [createVNode("span", null, " Registrada " + toDisplayString(item.reconciled_at ? new Date(item.reconciled_at).toLocaleDateString("es-MX") : ""), 1), item.notes ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.notes), 1)) : createCommentVNode("", true)]),
							createVNode("p", { class: "mt-1 text-xs text-dimmed" }, " Relación " + toDisplayString(item.distributor_payment?.cutoff_relation_id ?? "—") + " · Diferencia: " + toDisplayString(unref(money).format(Number(item.amount_difference))), 1)
						])]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("div", { class: "text-right" }, [createVNode("p", { class: "text-xs text-muted" }, " Conciliado: "), createVNode("p", { class: "text-sm font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(item.reconciled_amount))), 1)]), createVNode(_component_UButton, {
							label: "Verificar",
							icon: "i-lucide-badge-check",
							color: "success",
							variant: "solid",
							size: "sm",
							onClick: ($event) => onVerify(item)
						}, null, 8, ["onClick"])])])]);
					}), 128))]))], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/reconciliations.vue
var _sfc_setup = reconciliations_vue_vue_type_script_setup_true_lang_default.setup;
reconciliations_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/reconciliations.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var reconciliations_default = reconciliations_vue_vue_type_script_setup_true_lang_default;

export { reconciliations_default as default };
//# sourceMappingURL=reconciliations-C47H7xxB.mjs.map
