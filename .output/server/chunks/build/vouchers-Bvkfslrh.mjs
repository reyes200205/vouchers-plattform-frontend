import { al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main$4, h as _sfc_main$1$1, aP as useToast } from '../virtual/entry.mjs';
import { _ as _sfc_main$6 } from './Select-Gak9P_dI.mjs';
import { _ as _sfc_main$b } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$3 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$8 } from './Modal-BYVE2UCa.mjs';
import { _ as _sfc_main } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$c } from './Input-YDRYCqsV.mjs';
import { u as useVouchers } from './useVouchers-B7NQPoX_.mjs';
import { a as _sfc_main$1, _ as _sfc_main$5 } from './DashboardNavbar-C9AMA1qv.mjs';
import { _ as _sfc_main$7 } from './DashboardSidebarCollapse-D6jKUkvL.mjs';
import { _ as _sfc_main$a } from './Form-j1wdqi9R.mjs';
import { _ as _sfc_main$d } from './Textarea-ChxtXYe7.mjs';
import { D as DecideVoucherRequestModal_default } from './DecideVoucherRequestModal-BWgoCy7d.mjs';
import { _ as _sfc_main$9 } from './Alert-C59La3DT.mjs';
import { defineComponent, computed, ref, withAsyncContext, watch, mergeProps, withCtx, unref, isRef, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, createTextVNode, toDisplayString, reactive, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
import './DashboardSidebarToggle-BSz-SOza.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './PopperArrow-_ul5NSti.mjs';
import './overlay-BwxO-keY.mjs';
import './RadioGroup-BqmbGBrT.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-CLtAPs7l.mjs';
import './RovingFocusGroup-BOkwwdaM.mjs';
import './RovingFocusItem-CN5yS-Ls.mjs';
import './useCustomers-CoaFJqja.mjs';
import './ChangeCustomerRequestModal-Kp2FY7z1.mjs';

//#region app/components/products/DisburseVoucherModal.vue?vue&type=script&setup=true&lang.ts
var DisburseVoucherModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DisburseVoucherModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["disbursed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			transfer_reference: z.string().min(3, "La referencia de transferencia es obligatoria"),
			authorized_number: z.string().min(3, "El número de autorización es obligatorio"),
			notes: z.string().optional()
		});
		const open = ref(false);
		const submitting = ref(false);
		const state = reactive({
			transfer_reference: void 0,
			authorized_number: void 0,
			notes: void 0
		});
		const { disburseVoucher } = useVouchers();
		const toast = useToast();
		const isCustomerVerified = computed(() => Boolean(props.item.customer?.verified_at));
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await disburseVoucher(props.item.id, {
					transfer_reference: event.data.transfer_reference,
					authorized_number: event.data.authorized_number,
					notes: event.data.notes || void 0
				});
				toast.add({
					title: "Vale entregado",
					description: `${props.item.voucher_number} quedó activo con el número de autorización registrado.`,
					color: "success"
				});
				open.value = false;
				emit("disbursed");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo entregar el vale. Verifica los datos.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$8;
			const _component_UButton = _sfc_main$4;
			const _component_UAlert = _sfc_main$9;
			const _component_UForm = _sfc_main$a;
			const _component_UFormField = _sfc_main$b;
			const _component_UInput = _sfc_main$c;
			const _component_UTextarea = _sfc_main$d;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Entregar vale",
				description: "Registra la transferencia y el número de autorización",
				ui: { content: "max-w-xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!unref(isCustomerVerified)) _push(ssrRenderComponent(_component_UAlert, {
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-shield-alert",
							title: "Cliente sin verificar",
							description: "Antes de entregar este vale es necesario validar la identidad del cliente con sus documentos, desde la sección Clientes.",
							class: "mb-4"
						}, {
							actions: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UButton, {
									label: "Ir a Clientes",
									icon: "i-lucide-arrow-right",
									color: "warning",
									variant: "solid",
									size: "xs",
									to: "/general/customers"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UButton, {
									label: "Ir a Clientes",
									icon: "i-lucide-arrow-right",
									color: "warning",
									variant: "solid",
									size: "xs",
									to: "/general/customers"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_component_UForm, {
							schema: unref(schema),
							state: unref(state),
							class: "space-y-4",
							onSubmit
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<p class="text-sm text-muted"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(__props.item.voucher_number)}</span>`);
									if (__props.item.customer?.person) _push(`<span${_scopeId}> · ${ssrInterpolate([__props.item.customer.person.first_name, __props.item.customer.person.last_name].filter(Boolean).join(" "))}</span>`);
									else _push(`<!---->`);
									_push(`</p>`);
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Referencia de transferencia",
										name: "transfer_reference"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).transfer_reference,
												"onUpdate:modelValue": ($event) => unref(state).transfer_reference = $event,
												placeholder: "Ej. TRANS-2026-00123",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).transfer_reference,
												"onUpdate:modelValue": ($event) => unref(state).transfer_reference = $event,
												placeholder: "Ej. TRANS-2026-00123",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Número de autorización",
										name: "authorized_number"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).authorized_number,
												"onUpdate:modelValue": ($event) => unref(state).authorized_number = $event,
												placeholder: "Ej. AUT-4001",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).authorized_number,
												"onUpdate:modelValue": ($event) => unref(state).authorized_number = $event,
												placeholder: "Ej. AUT-4001",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Notas",
										name: "notes"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(state).notes,
												"onUpdate:modelValue": ($event) => unref(state).notes = $event,
												placeholder: "Comentarios opcionales...",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(state).notes,
												"onUpdate:modelValue": ($event) => unref(state).notes = $event,
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
										label: "Confirmar entrega",
										color: "success",
										variant: "solid",
										type: "submit",
										loading: unref(submitting),
										disabled: !unref(isCustomerVerified)
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [
									createVNode("p", { class: "text-sm text-muted" }, [createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(__props.item.voucher_number), 1), __props.item.customer?.person ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString([__props.item.customer.person.first_name, __props.item.customer.person.last_name].filter(Boolean).join(" ")), 1)) : createCommentVNode("", true)]),
									createVNode(_component_UFormField, {
										label: "Referencia de transferencia",
										name: "transfer_reference"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).transfer_reference,
											"onUpdate:modelValue": ($event) => unref(state).transfer_reference = $event,
											placeholder: "Ej. TRANS-2026-00123",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Número de autorización",
										name: "authorized_number"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).authorized_number,
											"onUpdate:modelValue": ($event) => unref(state).authorized_number = $event,
											placeholder: "Ej. AUT-4001",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Notas",
										name: "notes"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
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
										label: "Confirmar entrega",
										color: "success",
										variant: "solid",
										type: "submit",
										loading: unref(submitting),
										disabled: !unref(isCustomerVerified)
									}, null, 8, ["loading", "disabled"])])
								];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [!unref(isCustomerVerified) ? (openBlock(), createBlock(_component_UAlert, {
						key: 0,
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-shield-alert",
						title: "Cliente sin verificar",
						description: "Antes de entregar este vale es necesario validar la identidad del cliente con sus documentos, desde la sección Clientes.",
						class: "mb-4"
					}, {
						actions: withCtx(() => [createVNode(_component_UButton, {
							label: "Ir a Clientes",
							icon: "i-lucide-arrow-right",
							color: "warning",
							variant: "solid",
							size: "xs",
							to: "/general/customers"
						})]),
						_: 1
					})) : createCommentVNode("", true), createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode("p", { class: "text-sm text-muted" }, [createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(__props.item.voucher_number), 1), __props.item.customer?.person ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString([__props.item.customer.person.first_name, __props.item.customer.person.last_name].filter(Boolean).join(" ")), 1)) : createCommentVNode("", true)]),
							createVNode(_component_UFormField, {
								label: "Referencia de transferencia",
								name: "transfer_reference"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).transfer_reference,
									"onUpdate:modelValue": ($event) => unref(state).transfer_reference = $event,
									placeholder: "Ej. TRANS-2026-00123",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Número de autorización",
								name: "authorized_number"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).authorized_number,
									"onUpdate:modelValue": ($event) => unref(state).authorized_number = $event,
									placeholder: "Ej. AUT-4001",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Notas",
								name: "notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).notes,
									"onUpdate:modelValue": ($event) => unref(state).notes = $event,
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
								label: "Confirmar entrega",
								color: "success",
								variant: "solid",
								type: "submit",
								loading: unref(submitting),
								disabled: !unref(isCustomerVerified)
							}, null, 8, ["loading", "disabled"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Entregar vale",
						icon: "i-lucide-handshake",
						color: "success",
						variant: "solid",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Entregar vale",
						icon: "i-lucide-handshake",
						color: "success",
						variant: "solid",
						size: "xs"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/products/DisburseVoucherModal.vue
var _sfc_setup$1 = DisburseVoucherModal_vue_vue_type_script_setup_true_lang_default.setup;
DisburseVoucherModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/products/DisburseVoucherModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DisburseVoucherModal_default = Object.assign(DisburseVoucherModal_vue_vue_type_script_setup_true_lang_default, { __name: "ProductsDisburseVoucherModal" });
//#endregion
//#region app/pages/general/vouchers.vue?vue&type=script&setup=true&lang.ts
var vouchers_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "vouchers",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { user } = useAuth();
		const { listVouchers, listPendingVoucherRequests } = useVouchers();
		const canApprove = computed(() => user.value?.permissions?.includes("vouchers.approve") ?? false);
		const canDisburse = computed(() => user.value?.permissions?.includes("vouchers.disburse") ?? false);
		const statusFilter = ref(void 0);
		const page = ref(1);
		const { data, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("vouchers", () => listVouchers({
			status: statusFilter.value,
			page: page.value
		}), {
			watch: [statusFilter, page],
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
		const requestsPage = ref(1);
		const { data: requestsData, status: requestsStatus, refresh: refreshRequests } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("pending-voucher-requests", () => {
			if (!canApprove.value) return Promise.resolve({
				data: [],
				links: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			});
			return listPendingVoucherRequests({ page: requestsPage.value });
		}, {
			watch: [requestsPage],
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
		const pendingRequests = computed(() => requestsData.value.data ?? []);
		const requestsMeta = computed(() => requestsData.value.meta);
		function onRequestPageChange(nextPage) {
			requestsPage.value = nextPage;
		}
		async function onRequestDecided() {
			await Promise.all([refreshRequests(), refresh()]);
		}
		async function onDisbursed() {
			await refresh();
		}
		watch(error, (e) => {
			if (e) console.error("[vouchers] No se pudieron cargar los vales:", e);
		}, { immediate: true });
		const errorDetail = computed(() => {
			const e = error.value;
			if (!e) return null;
			return [e.statusCode ? `HTTP ${e.statusCode}` : "Error de red", e.data?.message ?? e.statusMessage ?? ""].filter(Boolean).join(" — ");
		});
		const items = computed(() => data.value.data ?? []);
		const meta = computed(() => data.value.meta);
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		const statusColors = {
			APROBADO: "success",
			ACTIVO: "info",
			PAGADO: "success",
			LIQUIDADO: "neutral",
			MOROSO: "error",
			CANCELADO: "error",
			REVERSADO: "neutral",
			BORRADOR: "warning"
		};
		function customerName(voucher) {
			const person = voucher.customer?.person;
			return [person?.first_name, person?.last_name].filter(Boolean).join(" ") || "Cliente";
		}
		function distributorName(voucher) {
			const person = voucher.distributor?.person;
			return [person?.first_name, person?.last_name].filter(Boolean).join(" ") || null;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$7;
			const _component_USelect = _sfc_main$6;
			const _component_UBadge = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_VouchersDecideVoucherRequestModal = DecideVoucherRequestModal_default;
			const _component_UPagination = _sfc_main$3;
			const _component_UButton = _sfc_main$4;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_ProductsDisburseVoucherModal = DisburseVoucherModal_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "vouchers" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Vales emitidos" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Aprobados",
										value: "APROBADO"
									},
									{
										label: "Activos",
										value: "ACTIVO"
									},
									{
										label: "Pago parcial",
										value: "PAGO_PARCIAL"
									},
									{
										label: "Pagados",
										value: "PAGADO"
									},
									{
										label: "Liquidados",
										value: "LIQUIDADO"
									},
									{
										label: "Morosos",
										value: "MOROSO"
									},
									{
										label: "Cancelados",
										value: "CANCELADO"
									}
								],
								placeholder: "Estado",
								class: "w-40"
							}, null, _parent, _scopeId));
							else return [createVNode(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Aprobados",
										value: "APROBADO"
									},
									{
										label: "Activos",
										value: "ACTIVO"
									},
									{
										label: "Pago parcial",
										value: "PAGO_PARCIAL"
									},
									{
										label: "Pagados",
										value: "PAGADO"
									},
									{
										label: "Liquidados",
										value: "LIQUIDADO"
									},
									{
										label: "Morosos",
										value: "MOROSO"
									},
									{
										label: "Cancelados",
										value: "CANCELADO"
									}
								],
								placeholder: "Estado",
								class: "w-40"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Vales emitidos" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: [
								{
									label: "Todos los estados",
									value: void 0
								},
								{
									label: "Aprobados",
									value: "APROBADO"
								},
								{
									label: "Activos",
									value: "ACTIVO"
								},
								{
									label: "Pago parcial",
									value: "PAGO_PARCIAL"
								},
								{
									label: "Pagados",
									value: "PAGADO"
								},
								{
									label: "Liquidados",
									value: "LIQUIDADO"
								},
								{
									label: "Morosos",
									value: "MOROSO"
								},
								{
									label: "Cancelados",
									value: "CANCELADO"
								}
							],
							placeholder: "Estado",
							class: "w-40"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(canApprove)) {
							_push(`<div class="mb-6 border-b border-default pb-6"${_scopeId}><div class="mb-3 flex items-center gap-2"${_scopeId}><h3 class="text-sm font-semibold text-highlighted"${_scopeId}> Solicitudes pendientes </h3>`);
							if (unref(pendingRequests).length > 0) _push(ssrRenderComponent(_component_UBadge, {
								color: "warning",
								variant: "subtle",
								label: String(unref(requestsMeta).total)
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</div>`);
							if (unref(requestsStatus) === "pending") {
								_push(`<div class="flex items-center justify-center py-8"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-loader-circle",
									class: "size-6 animate-spin text-muted"
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else if (unref(pendingRequests).length === 0) _push(`<div class="rounded-lg border border-dashed border-default py-6 text-center text-sm text-muted"${_scopeId}> No hay solicitudes de vale pendientes </div>`);
							else {
								_push(`<div class="divide-y divide-default rounded-lg border border-default"${_scopeId}><!--[-->`);
								ssrRenderList(unref(pendingRequests), (request) => {
									_push(`<div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3"${_scopeId}><div class="min-w-0"${_scopeId}><p class="truncate text-sm font-medium text-highlighted"${_scopeId}>${ssrInterpolate(request.customer_name || "Cliente")} `);
									if (request.customer_code) _push(`<span class="text-xs font-normal text-muted"${_scopeId}>(${ssrInterpolate(request.customer_code)})</span>`);
									else _push(`<!---->`);
									_push(`</p><p class="truncate text-xs text-muted"${_scopeId}> Distribuidora: ${ssrInterpolate(request.distributor_name || `#${request.distributor_id}`)} `);
									if (request.distributor_number) _push(`<span${_scopeId}>(${ssrInterpolate(request.distributor_number)})</span>`);
									else _push(`<!---->`);
									if (request.financial_product_name) _push(`<!--[--> · ${ssrInterpolate(request.financial_product_name)}<!--]-->`);
									else _push(`<!---->`);
									_push(`</p></div><div class="flex items-center gap-3"${_scopeId}><div class="text-right"${_scopeId}><p class="text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(request.requested_amount)))}</p>`);
									if (request.is_pre_vale) _push(ssrRenderComponent(_component_UBadge, {
										color: "warning",
										variant: "subtle",
										label: "Pre-vale",
										size: "sm"
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`</div>`);
									_push(ssrRenderComponent(_component_VouchersDecideVoucherRequestModal, {
										item: request,
										onDecided: onRequestDecided
									}, null, _parent, _scopeId));
									_push(`</div></div>`);
								});
								_push(`<!--]--></div>`);
							}
							if (unref(requestsMeta).last_page > 1) {
								_push(`<div class="flex justify-end pt-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									"model-value": unref(requestsPage),
									total: unref(requestsMeta).total,
									"items-per-page": unref(requestsMeta).per_page,
									"onUpdate:modelValue": onRequestPageChange
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
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
							_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar los vales. </p>`);
							if (unref(errorDetail)) _push(`<p class="max-w-md font-mono text-xs text-dimmed"${_scopeId}>${ssrInterpolate(unref(errorDetail))}</p>`);
							else _push(`<!---->`);
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
							if (unref(canApprove)) _push(`<h3 class="mb-3 text-sm font-semibold text-highlighted"${_scopeId}> Vales emitidos </h3>`);
							else _push(`<!---->`);
							if (unref(items).length === 0) {
								_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-receipt-text",
									class: "size-12 text-dimmed"
								}, null, _parent, _scopeId));
								_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay vales con esos filtros </p></div>`);
							} else {
								_push(`<div class="h-full overflow-y-auto divide-y divide-default"${_scopeId}><!--[-->`);
								ssrRenderList(unref(items), (item) => {
									_push(`<div class="px-6 py-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UAvatar, {
										alt: customerName(item),
										icon: "i-lucide-ticket",
										size: "lg"
									}, null, _parent, _scopeId));
									_push(`<div class="min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(item.voucher_number)}</p>`);
									if (item.is_expired) _push(ssrRenderComponent(_component_UBadge, {
										color: "error",
										variant: "solid",
										label: "VENCIDO"
									}, null, _parent, _scopeId));
									else _push(ssrRenderComponent(_component_UBadge, {
										color: item.status && statusColors[item.status] || "neutral",
										variant: "subtle",
										label: item.status ?? void 0
									}, null, _parent, _scopeId));
									_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"${_scopeId}><span${_scopeId}>Cliente: ${ssrInterpolate(customerName(item))} (${ssrInterpolate(item.customer?.customer_code)})</span>`);
									if (!item.customer?.verified_at) _push(ssrRenderComponent(_component_UBadge, {
										color: "warning",
										variant: "subtle",
										label: "Cliente sin verificar"
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									if (distributorName(item)) {
										_push(`<span${_scopeId}> Distribuidora: ${ssrInterpolate(distributorName(item))} `);
										if (item.distributor?.distributor_number) _push(`<!--[--> (${ssrInterpolate(item.distributor.distributor_number)}) <!--]-->`);
										else _push(`<!---->`);
										_push(`</span>`);
									} else _push(`<!---->`);
									if (item.transferred_at) _push(`<span${_scopeId}> Entregado ${ssrInterpolate(new Date(item.transferred_at).toLocaleDateString("es-MX"))}</span>`);
									else _push(`<!---->`);
									if (item.transfer_reference) _push(`<span${_scopeId}>Ref: ${ssrInterpolate(item.transfer_reference)}</span>`);
									else _push(`<!---->`);
									if (item.status === "APROBADO" && item.expiration_date) _push(`<span class="${ssrRenderClass({ "text-error font-medium": item.is_expired })}"${_scopeId}>${ssrInterpolate(item.is_expired ? "Expiró" : "Vence")} el ${ssrInterpolate((/* @__PURE__ */ new Date(item.expiration_date + "T00:00:00")).toLocaleDateString("es-MX"))}</span>`);
									else _push(`<!---->`);
									_push(`</div></div></div><div class="flex items-center gap-3"${_scopeId}><div class="text-right"${_scopeId}><p class="text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(item.amount)))}</p>`);
									if (item.total_fortnights) _push(`<p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(item.total_fortnights)} quincenas </p>`);
									else _push(`<!---->`);
									_push(`</div>`);
									if (unref(canDisburse) && item.status === "APROBADO" && !item.is_expired) _push(ssrRenderComponent(_component_ProductsDisburseVoucherModal, {
										item,
										onDisbursed
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
					} else return [unref(canApprove) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "mb-6 border-b border-default pb-6"
					}, [
						createVNode("div", { class: "mb-3 flex items-center gap-2" }, [createVNode("h3", { class: "text-sm font-semibold text-highlighted" }, " Solicitudes pendientes "), unref(pendingRequests).length > 0 ? (openBlock(), createBlock(_component_UBadge, {
							key: 0,
							color: "warning",
							variant: "subtle",
							label: String(unref(requestsMeta).total)
						}, null, 8, ["label"])) : createCommentVNode("", true)]),
						unref(requestsStatus) === "pending" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex items-center justify-center py-8"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-6 animate-spin text-muted"
						})])) : unref(pendingRequests).length === 0 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "rounded-lg border border-dashed border-default py-6 text-center text-sm text-muted"
						}, " No hay solicitudes de vale pendientes ")) : (openBlock(), createBlock("div", {
							key: 2,
							class: "divide-y divide-default rounded-lg border border-default"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(pendingRequests), (request) => {
							return openBlock(), createBlock("div", {
								key: request.id,
								class: "flex flex-wrap items-center justify-between gap-3 px-4 py-3"
							}, [createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate text-sm font-medium text-highlighted" }, [createTextVNode(toDisplayString(request.customer_name || "Cliente") + " ", 1), request.customer_code ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-xs font-normal text-muted"
							}, "(" + toDisplayString(request.customer_code) + ")", 1)) : createCommentVNode("", true)]), createVNode("p", { class: "truncate text-xs text-muted" }, [
								createTextVNode(" Distribuidora: " + toDisplayString(request.distributor_name || `#${request.distributor_id}`) + " ", 1),
								request.distributor_number ? (openBlock(), createBlock("span", { key: 0 }, "(" + toDisplayString(request.distributor_number) + ")", 1)) : createCommentVNode("", true),
								request.financial_product_name ? (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(" · " + toDisplayString(request.financial_product_name), 1)], 64)) : createCommentVNode("", true)
							])]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("div", { class: "text-right" }, [createVNode("p", { class: "text-sm font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(request.requested_amount))), 1), request.is_pre_vale ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "warning",
								variant: "subtle",
								label: "Pre-vale",
								size: "sm"
							})) : createCommentVNode("", true)]), createVNode(_component_VouchersDecideVoucherRequestModal, {
								item: request,
								onDecided: onRequestDecided
							}, null, 8, ["item"])])]);
						}), 128))])),
						unref(requestsMeta).last_page > 1 ? (openBlock(), createBlock("div", {
							key: 3,
							class: "flex justify-end pt-3"
						}, [createVNode(_component_UPagination, {
							"model-value": unref(requestsPage),
							total: unref(requestsMeta).total,
							"items-per-page": unref(requestsMeta).per_page,
							"onUpdate:modelValue": onRequestPageChange
						}, null, 8, [
							"model-value",
							"total",
							"items-per-page"
						])])) : createCommentVNode("", true)
					])) : createCommentVNode("", true), unref(status) === "pending" ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : unref(status) === "error" ? (openBlock(), createBlock("div", {
						key: 2,
						class: "flex flex-col items-center justify-center gap-4 py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-triangle-alert",
							class: "size-12 text-error"
						}),
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar los vales. "),
						unref(errorDetail) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "max-w-md font-mono text-xs text-dimmed"
						}, toDisplayString(unref(errorDetail)), 1)) : createCommentVNode("", true),
						createVNode(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock(Fragment, { key: 3 }, [
						unref(canApprove) ? (openBlock(), createBlock("h3", {
							key: 0,
							class: "mb-3 text-sm font-semibold text-highlighted"
						}, " Vales emitidos ")) : createCommentVNode("", true),
						unref(items).length === 0 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "flex flex-col items-center justify-center py-16 text-center"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-receipt-text",
							class: "size-12 text-dimmed"
						}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay vales con esos filtros ")])) : (openBlock(), createBlock("div", {
							key: 2,
							class: "h-full overflow-y-auto divide-y divide-default"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item) => {
							return openBlock(), createBlock("div", {
								key: item.id,
								class: "px-6 py-4"
							}, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode(_component_UAvatar, {
								alt: customerName(item),
								icon: "i-lucide-ticket",
								size: "lg"
							}, null, 8, ["alt"]), createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(item.voucher_number), 1), item.is_expired ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "error",
								variant: "solid",
								label: "VENCIDO"
							})) : (openBlock(), createBlock(_component_UBadge, {
								key: 1,
								color: item.status && statusColors[item.status] || "neutral",
								variant: "subtle",
								label: item.status ?? void 0
							}, null, 8, ["color", "label"]))]), createVNode("div", { class: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted" }, [
								createVNode("span", null, "Cliente: " + toDisplayString(customerName(item)) + " (" + toDisplayString(item.customer?.customer_code) + ")", 1),
								!item.customer?.verified_at ? (openBlock(), createBlock(_component_UBadge, {
									key: 0,
									color: "warning",
									variant: "subtle",
									label: "Cliente sin verificar"
								})) : createCommentVNode("", true),
								distributorName(item) ? (openBlock(), createBlock("span", { key: 1 }, [createTextVNode(" Distribuidora: " + toDisplayString(distributorName(item)) + " ", 1), item.distributor?.distributor_number ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" (" + toDisplayString(item.distributor.distributor_number) + ") ", 1)], 64)) : createCommentVNode("", true)])) : createCommentVNode("", true),
								item.transferred_at ? (openBlock(), createBlock("span", { key: 2 }, " Entregado " + toDisplayString(new Date(item.transferred_at).toLocaleDateString("es-MX")), 1)) : createCommentVNode("", true),
								item.transfer_reference ? (openBlock(), createBlock("span", { key: 3 }, "Ref: " + toDisplayString(item.transfer_reference), 1)) : createCommentVNode("", true),
								item.status === "APROBADO" && item.expiration_date ? (openBlock(), createBlock("span", {
									key: 4,
									class: { "text-error font-medium": item.is_expired }
								}, toDisplayString(item.is_expired ? "Expiró" : "Vence") + " el " + toDisplayString((/* @__PURE__ */ new Date(item.expiration_date + "T00:00:00")).toLocaleDateString("es-MX")), 3)) : createCommentVNode("", true)
							])])]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("div", { class: "text-right" }, [createVNode("p", { class: "text-sm font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(item.amount))), 1), item.total_fortnights ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-xs text-muted"
							}, toDisplayString(item.total_fortnights) + " quincenas ", 1)) : createCommentVNode("", true)]), unref(canDisburse) && item.status === "APROBADO" && !item.is_expired ? (openBlock(), createBlock(_component_ProductsDisburseVoucherModal, {
								key: 0,
								item,
								onDisbursed
							}, null, 8, ["item"])) : createCommentVNode("", true)])])]);
						}), 128))])),
						unref(meta).last_page > 1 ? (openBlock(), createBlock("div", {
							key: 3,
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
						])])) : createCommentVNode("", true)
					], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/vouchers.vue
var _sfc_setup = vouchers_vue_vue_type_script_setup_true_lang_default.setup;
vouchers_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/vouchers.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var vouchers_default = vouchers_vue_vue_type_script_setup_true_lang_default;

export { vouchers_default as default };
//# sourceMappingURL=vouchers-Bvkfslrh.mjs.map
