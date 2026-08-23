import { al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main$3, aP as useToast } from '../virtual/entry.mjs';
import { _ as _sfc_main$7 } from './Select-Gak9P_dI.mjs';
import { _ as _sfc_main$a } from './DropdownMenu-BulCZzh5.mjs';
import { _ as _sfc_main$e } from './Checkbox-CxYkdtZ9.mjs';
import { _ as _sfc_main$d } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$5 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$b } from './Modal-BYVE2UCa.mjs';
import { _ as _sfc_main$9 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main } from './Input-YDRYCqsV.mjs';
import { u as useCustomers } from './useCustomers-CoaFJqja.mjs';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './DashboardNavbar-C9AMA1qv.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-D6jKUkvL.mjs';
import { _ as _sfc_main$c } from './Form-j1wdqi9R.mjs';
import { _ as _sfc_main$4 } from './Table-OSD_tKHH.mjs';
import { _ as _sfc_main$f } from './Textarea-ChxtXYe7.mjs';
import { C as ChangeCustomerRequestModal_default } from './ChangeCustomerRequestModal-Kp2FY7z1.mjs';
import { defineComponent, computed, ref, withAsyncContext, mergeProps, withCtx, isRef, unref, createVNode, openBlock, createBlock, Fragment, createCommentVNode, h, renderList, toDisplayString, createTextVNode, reactive, watch, useSSRContext } from 'vue';
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
import './DashboardSidebarToggle-BSz-SOza.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './PopperArrow-_ul5NSti.mjs';
import './useComposing-D1bdBmsI.mjs';
import './Kbd-BZbceTrO.mjs';
import './RovingFocusGroup-BOkwwdaM.mjs';
import './isValueEqualOrExist-7w5KNovv.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-CLtAPs7l.mjs';
import './RovingFocusItem-CN5yS-Ls.mjs';
import './overlay-BwxO-keY.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';
import './RadioGroup-BqmbGBrT.mjs';

//#region app/components/customers/CustomerDetailsModal.vue?vue&type=script&setup=true&lang.ts
var CustomerDetailsModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CustomerDetailsModal",
	__ssrInlineRender: true,
	props: {
		customer: {},
		open: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { fieldLabels } = useCustomers();
		const labels = fieldLabels();
		function present(value) {
			return value && value.trim() ? value : "—";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$b, mergeProps({
				open: __props.open,
				title: "Detalles del cliente",
				description: __props.customer.customer_code,
				"onUpdate:open": (open) => emit("update:open", open)
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-3 text-sm"${_scopeId}>`);
						if (__props.customer.person) {
							_push(`<div class="flex flex-wrap gap-x-6 gap-y-2"${_scopeId}><!--[-->`);
							ssrRenderList([
								"first_name",
								"middle_name",
								"last_name",
								"second_last_name"
							], (field) => {
								_push(`<span class="text-muted"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(unref(labels)[field])}:</span> ${ssrInterpolate(present(__props.customer.person[field]))}</span>`);
							});
							_push(`<!--]--><!--[-->`);
							ssrRenderList([
								"curp",
								"rfc",
								"mobile_phone",
								"home_phone",
								"email"
							], (field) => {
								_push(`<span class="w-full"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(unref(labels)[field])}:</span> ${ssrInterpolate(present(__props.customer.person[field]))}</span>`);
							});
							_push(`<!--]--><span class="w-full"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>Domicilio:</span> ${ssrInterpolate(present(__props.customer.person.external_number ? [
								__props.customer.person.street,
								`#${__props.customer.person.external_number}`,
								__props.customer.person.neighborhood,
								__props.customer.person.city,
								__props.customer.person.state,
								__props.customer.person.postal_code
							].filter(Boolean).join(", ") : __props.customer.person.street))}</span></div>`);
						} else _push(`<!---->`);
						if (__props.customer.notes) _push(`<p class="text-muted"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>Notas:</span> ${ssrInterpolate(__props.customer.notes)}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "space-y-3 text-sm" }, [__props.customer.person ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-wrap gap-x-6 gap-y-2"
					}, [
						(openBlock(), createBlock(Fragment, null, renderList([
							"first_name",
							"middle_name",
							"last_name",
							"second_last_name"
						], (field) => {
							return createVNode("span", {
								key: field,
								class: "text-muted"
							}, [createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(unref(labels)[field]) + ":", 1), createTextVNode(" " + toDisplayString(present(__props.customer.person[field])), 1)]);
						}), 64)),
						(openBlock(), createBlock(Fragment, null, renderList([
							"curp",
							"rfc",
							"mobile_phone",
							"home_phone",
							"email"
						], (field) => {
							return createVNode("span", {
								key: field,
								class: "w-full"
							}, [createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(unref(labels)[field]) + ":", 1), createTextVNode(" " + toDisplayString(present(__props.customer.person[field])), 1)]);
						}), 64)),
						createVNode("span", { class: "w-full" }, [createVNode("span", { class: "font-medium text-highlighted" }, "Domicilio:"), createTextVNode(" " + toDisplayString(present(__props.customer.person.external_number ? [
							__props.customer.person.street,
							`#${__props.customer.person.external_number}`,
							__props.customer.person.neighborhood,
							__props.customer.person.city,
							__props.customer.person.state,
							__props.customer.person.postal_code
						].filter(Boolean).join(", ") : __props.customer.person.street)), 1)])
					])) : createCommentVNode("", true), __props.customer.notes ? (openBlock(), createBlock("p", {
						key: 1,
						class: "text-muted"
					}, [createVNode("span", { class: "font-medium text-highlighted" }, "Notas:"), createTextVNode(" " + toDisplayString(__props.customer.notes), 1)])) : createCommentVNode("", true)])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/customers/CustomerDetailsModal.vue
var _sfc_setup$2 = CustomerDetailsModal_vue_vue_type_script_setup_true_lang_default.setup;
CustomerDetailsModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/CustomerDetailsModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var CustomerDetailsModal_default = Object.assign(CustomerDetailsModal_vue_vue_type_script_setup_true_lang_default, { __name: "CustomersCustomerDetailsModal" });
//#endregion
//#region app/components/customers/VerifyCustomerModal.vue?vue&type=script&setup=true&lang.ts
var VerifyCustomerModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VerifyCustomerModal",
	__ssrInlineRender: true,
	props: {
		customer: {},
		open: { type: Boolean }
	},
	emits: ["update:open", "verified"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			confirmed: z.boolean().refine((val) => val === true, { message: "Debes confirmar que revisaste los documentos en persona." }),
			notes: z.string().optional()
		});
		const submitting = ref(false);
		const state = reactive({
			confirmed: false,
			notes: void 0
		});
		const { verifyCustomer } = useCustomers();
		const toast = useToast();
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await verifyCustomer(props.customer.id, { notes: event.data.notes || void 0 });
				toast.add({
					title: "Cliente verificado",
					description: `El cliente ${props.customer.customer_code} quedó registrado como verificado.`,
					color: "success"
				});
				emit("verified");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo verificar al cliente. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		function resetForm() {
			state.confirmed = false;
			state.notes = void 0;
		}
		watch(() => props.open, (isOpen) => {
			if (isOpen) resetForm();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$b;
			const _component_UForm = _sfc_main$c;
			const _component_UFormField = _sfc_main$d;
			const _component_UCheckbox = _sfc_main$e;
			const _component_UTextarea = _sfc_main$f;
			const _component_UButton = _sfc_main$3;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: __props.open,
				title: "Verificar cliente",
				description: `${__props.customer.customer_code} — ${__props.customer.person ? [__props.customer.person.first_name, __props.customer.person.last_name].filter(Boolean).join(" ") : "Sin nombre"}`,
				"onUpdate:open": (open) => emit("update:open", open),
				onAfterLeave: resetForm
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
								_push(`<p class="text-sm text-muted"${_scopeId}> La verificación es presencial: confirma que revisaste la identificación (INE) y el comprobante de domicilio del cliente en la sucursal antes de aprobar. </p>`);
								_push(ssrRenderComponent(_component_UFormField, { name: "confirmed" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UCheckbox, {
											modelValue: unref(state).confirmed,
											"onUpdate:modelValue": ($event) => unref(state).confirmed = $event,
											label: "Confirmo que revisé el INE y el comprobante de domicilio del cliente en persona."
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UCheckbox, {
											modelValue: unref(state).confirmed,
											"onUpdate:modelValue": ($event) => unref(state).confirmed = $event,
											label: "Confirmo que revisé el INE y el comprobante de domicilio del cliente en persona."
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
											placeholder: "Observaciones de la verificación (opcional)...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
											placeholder: "Observaciones de la verificación (opcional)...",
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
									onClick: ($event) => emit("update:open", false)
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Confirmar verificación",
									color: "success",
									variant: "solid",
									type: "submit",
									disabled: !unref(state).confirmed,
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode("p", { class: "text-sm text-muted" }, " La verificación es presencial: confirma que revisaste la identificación (INE) y el comprobante de domicilio del cliente en la sucursal antes de aprobar. "),
								createVNode(_component_UFormField, { name: "confirmed" }, {
									default: withCtx(() => [createVNode(_component_UCheckbox, {
										modelValue: unref(state).confirmed,
										"onUpdate:modelValue": ($event) => unref(state).confirmed = $event,
										label: "Confirmo que revisé el INE y el comprobante de domicilio del cliente en persona."
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
										placeholder: "Observaciones de la verificación (opcional)...",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => emit("update:open", false)
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Confirmar verificación",
									color: "success",
									variant: "solid",
									type: "submit",
									disabled: !unref(state).confirmed,
									loading: unref(submitting)
								}, null, 8, ["disabled", "loading"])])
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
							createVNode("p", { class: "text-sm text-muted" }, " La verificación es presencial: confirma que revisaste la identificación (INE) y el comprobante de domicilio del cliente en la sucursal antes de aprobar. "),
							createVNode(_component_UFormField, { name: "confirmed" }, {
								default: withCtx(() => [createVNode(_component_UCheckbox, {
									modelValue: unref(state).confirmed,
									"onUpdate:modelValue": ($event) => unref(state).confirmed = $event,
									label: "Confirmo que revisé el INE y el comprobante de domicilio del cliente en persona."
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
									placeholder: "Observaciones de la verificación (opcional)...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => emit("update:open", false)
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Confirmar verificación",
								color: "success",
								variant: "solid",
								type: "submit",
								disabled: !unref(state).confirmed,
								loading: unref(submitting)
							}, null, 8, ["disabled", "loading"])])
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
//#region app/components/customers/VerifyCustomerModal.vue
var _sfc_setup$1 = VerifyCustomerModal_vue_vue_type_script_setup_true_lang_default.setup;
VerifyCustomerModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/VerifyCustomerModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var VerifyCustomerModal_default = Object.assign(VerifyCustomerModal_vue_vue_type_script_setup_true_lang_default, { __name: "CustomersVerifyCustomerModal" });
//#endregion
//#region app/pages/general/customers.vue?vue&type=script&setup=true&lang.ts
var customers_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "customers",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UButton = _sfc_main$3;
		const { user } = useAuth();
		const { listCustomers } = useCustomers();
		const canVerify = computed(() => user.value?.permissions?.includes("customers.verify") ?? false);
		const canRequestChange = computed(() => user.value?.permissions?.includes("customers.update.request") ?? false);
		const statusFilter = ref(void 0);
		const verifiedFilter = ref("all");
		const q = ref("");
		const page = ref(1);
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("customers", () => listCustomers({
			status: statusFilter.value,
			verified: verifiedFilter.value === "all" ? void 0 : verifiedFilter.value === "yes",
			page: page.value,
			per_page: 15
		}), {
			watch: [
				statusFilter,
				verifiedFilter,
				page
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
		const meta = computed(() => data.value?.meta);
		const filteredItems = computed(() => {
			const query = q.value.trim().toLowerCase();
			if (!query) return items.value;
			return items.value.filter((customer) => {
				const person = customer.person;
				return [
					person?.first_name,
					person?.middle_name,
					person?.last_name,
					person?.second_last_name
				].filter(Boolean).join(" ").toLowerCase().includes(query) || customer.customer_code.toLowerCase().includes(query) || (person?.curp ?? "").toLowerCase().includes(query) || (person?.mobile_phone ?? "").toLowerCase().includes(query);
			});
		});
		function fullName(customer) {
			const person = customer.person;
			return [
				person?.first_name,
				person?.middle_name,
				person?.last_name,
				person?.second_last_name
			].filter(Boolean).join(" ") || "Sin nombre";
		}
		const statusColors = {
			ACTIVO: "success",
			EN_VERIFICACION: "warning",
			BLOQUEADO: "error",
			MOROSO: "error",
			INACTIVO: "neutral"
		};
		function onPageChange(nextPage) {
			page.value = nextPage;
		}
		function refreshList() {
			refresh();
		}
		const columns = [
			{
				accessorKey: "customer_code",
				header: "Código"
			},
			{
				accessorKey: "person",
				header: "Cliente",
				cell: ({ row }) => {
					const person = row.original.person;
					return h("div", { class: "min-w-0" }, [h("p", { class: "truncate font-medium text-highlighted" }, fullName(row.original)), h("p", { class: "truncate text-xs text-muted" }, person?.curp || person?.mobile_phone || "")]);
				}
			},
			{
				accessorKey: "branch",
				header: "Sucursal",
				cell: ({ row }) => row.original.branch?.name ?? "—"
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => h(_sfc_main$9, {
					color: row.original.status ? statusColors[row.original.status] : "neutral",
					variant: "subtle",
					label: row.original.status ?? ""
				})
			},
			{
				accessorKey: "verified_at",
				header: "Verificado",
				cell: ({ row }) => {
					if (!row.original.verified_at) return h(_sfc_main$9, {
						color: "warning",
						variant: "subtle",
						label: "Sin verificar"
					});
					const date = new Date(row.original.verified_at);
					return h(_sfc_main$9, {
						color: "success",
						variant: "subtle",
						label: date.toLocaleDateString("es-MX", {
							day: "2-digit",
							month: "short",
							year: "numeric"
						})
					});
				}
			},
			{
				id: "actions",
				cell: ({ row }) => {
					const rowCustomer = row.original;
					const actionItems = [];
					if (canVerify.value && !rowCustomer.verified_at) actionItems.push({
						key: "verify",
						label: "Verificar",
						icon: "i-lucide-badge-check",
						onSelect() {
							selectedVerification.value = rowCustomer;
						}
					});
					if (canRequestChange.value) actionItems.push({
						key: "change",
						label: "Solicitar cambio de datos",
						icon: "i-lucide-file-pen-line",
						onSelect() {
							selectedChangeRequest.value = rowCustomer;
						}
					});
					actionItems.push({
						key: "details",
						label: "Detalles",
						icon: "i-lucide-eye",
						onSelect() {
							selectedDetails.value = rowCustomer;
						}
					});
					return h("div", { class: "text-right" }, h(_sfc_main$a, {
						content: { align: "end" },
						items: actionItems
					}, () => h(_sfc_main$3, {
						icon: "i-lucide-ellipsis-vertical",
						color: "neutral",
						variant: "ghost",
						class: "ml-auto"
					})));
				}
			}
		];
		const selectedVerification = ref(null);
		const selectedChangeRequest = ref(null);
		const selectedDetails = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$6;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_USelect = _sfc_main$7;
			const _component_UInput = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UTable = _sfc_main$4;
			const _component_UPagination = _sfc_main$5;
			const _component_CustomersCustomerDetailsModal = CustomerDetailsModal_default;
			const _component_CustomersVerifyCustomerModal = VerifyCustomerModal_default;
			const _component_CustomersChangeCustomerRequestModal = ChangeCustomerRequestModal_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "customers" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Clientes" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(verifiedFilter),
									"onUpdate:modelValue": ($event) => isRef(verifiedFilter) ? verifiedFilter.value = $event : null,
									items: [
										{
											label: "Todas",
											value: "all"
										},
										{
											label: "Verificadas",
											value: "yes"
										},
										{
											label: "Sin verificar",
											value: "no"
										}
									],
									placeholder: "Verificación",
									class: "w-40"
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(statusFilter),
									"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
									items: [
										{
											label: "Todos los estados",
											value: void 0
										},
										{
											label: "Activo",
											value: "ACTIVO"
										},
										{
											label: "En verificación",
											value: "EN_VERIFICACION"
										},
										{
											label: "Bloqueado",
											value: "BLOQUEADO"
										},
										{
											label: "Moroso",
											value: "MOROSO"
										},
										{
											label: "Inactivo",
											value: "INACTIVO"
										}
									],
									placeholder: "Estado",
									class: "w-40"
								}, null, _parent, _scopeId));
							} else return [createVNode(_component_USelect, {
								modelValue: unref(verifiedFilter),
								"onUpdate:modelValue": ($event) => isRef(verifiedFilter) ? verifiedFilter.value = $event : null,
								items: [
									{
										label: "Todas",
										value: "all"
									},
									{
										label: "Verificadas",
										value: "yes"
									},
									{
										label: "Sin verificar",
										value: "no"
									}
								],
								placeholder: "Verificación",
								class: "w-40"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Activo",
										value: "ACTIVO"
									},
									{
										label: "En verificación",
										value: "EN_VERIFICACION"
									},
									{
										label: "Bloqueado",
										value: "BLOQUEADO"
									},
									{
										label: "Moroso",
										value: "MOROSO"
									},
									{
										label: "Inactivo",
										value: "INACTIVO"
									}
								],
								placeholder: "Estado",
								class: "w-40"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Clientes" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_USelect, {
							modelValue: unref(verifiedFilter),
							"onUpdate:modelValue": ($event) => isRef(verifiedFilter) ? verifiedFilter.value = $event : null,
							items: [
								{
									label: "Todas",
									value: "all"
								},
								{
									label: "Verificadas",
									value: "yes"
								},
								{
									label: "Sin verificar",
									value: "no"
								}
							],
							placeholder: "Verificación",
							class: "w-40"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: [
								{
									label: "Todos los estados",
									value: void 0
								},
								{
									label: "Activo",
									value: "ACTIVO"
								},
								{
									label: "En verificación",
									value: "EN_VERIFICACION"
								},
								{
									label: "Bloqueado",
									value: "BLOQUEADO"
								},
								{
									label: "Moroso",
									value: "MOROSO"
								},
								{
									label: "Inactivo",
									value: "INACTIVO"
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
						_push(`<div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(q),
							"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
							icon: "i-lucide-search",
							placeholder: "Buscar por nombre, código, CURP o teléfono...",
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
							_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar los clientes. </p>`);
							_push(ssrRenderComponent(unref(UButton), {
								label: "Reintentar",
								icon: "i-lucide-refresh-cw",
								color: "primary",
								variant: "solid",
								onClick: ($event) => unref(refresh)()
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else {
							_push(`<!--[-->`);
							if (unref(filteredItems).length === 0) {
								_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-users",
									class: "size-12 text-dimmed"
								}, null, _parent, _scopeId));
								_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay clientes con esos filtros </p></div>`);
							} else _push(ssrRenderComponent(_component_UTable, {
								class: "shrink-0",
								data: unref(filteredItems),
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
						if (unref(selectedDetails)) _push(ssrRenderComponent(_component_CustomersCustomerDetailsModal, {
							customer: unref(selectedDetails),
							open: true,
							"onUpdate:open": (open) => {
								if (!open) selectedDetails.value = null;
							}
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						if (unref(selectedVerification)) _push(ssrRenderComponent(_component_CustomersVerifyCustomerModal, {
							customer: unref(selectedVerification),
							open: true,
							"onUpdate:open": (open) => {
								if (!open) selectedVerification.value = null;
							},
							onVerified: ($event) => {
								refreshList();
								selectedVerification.value = null;
							}
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						if (unref(selectedChangeRequest)) _push(ssrRenderComponent(_component_CustomersChangeCustomerRequestModal, {
							customer: unref(selectedChangeRequest),
							open: true,
							"onUpdate:open": (open) => {
								if (!open) selectedChangeRequest.value = null;
							},
							onChanged: ($event) => selectedChangeRequest.value = null
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode(_component_UInput, {
							modelValue: unref(q),
							"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
							icon: "i-lucide-search",
							placeholder: "Buscar por nombre, código, CURP o teléfono...",
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
							createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar los clientes. "),
							createVNode(unref(UButton), {
								label: "Reintentar",
								icon: "i-lucide-refresh-cw",
								color: "primary",
								variant: "solid",
								onClick: ($event) => unref(refresh)()
							}, null, 8, ["onClick"])
						])) : (openBlock(), createBlock(Fragment, { key: 2 }, [unref(filteredItems).length === 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex flex-col items-center justify-center py-16 text-center"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-users",
							class: "size-12 text-dimmed"
						}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay clientes con esos filtros ")])) : (openBlock(), createBlock(_component_UTable, {
							key: 1,
							class: "shrink-0",
							data: unref(filteredItems),
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
						])]),
						unref(selectedDetails) ? (openBlock(), createBlock(_component_CustomersCustomerDetailsModal, {
							key: 3,
							customer: unref(selectedDetails),
							open: true,
							"onUpdate:open": (open) => {
								if (!open) selectedDetails.value = null;
							}
						}, null, 8, ["customer", "onUpdate:open"])) : createCommentVNode("", true),
						unref(selectedVerification) ? (openBlock(), createBlock(_component_CustomersVerifyCustomerModal, {
							key: 4,
							customer: unref(selectedVerification),
							open: true,
							"onUpdate:open": (open) => {
								if (!open) selectedVerification.value = null;
							},
							onVerified: ($event) => {
								refreshList();
								selectedVerification.value = null;
							}
						}, null, 8, [
							"customer",
							"onUpdate:open",
							"onVerified"
						])) : createCommentVNode("", true),
						unref(selectedChangeRequest) ? (openBlock(), createBlock(_component_CustomersChangeCustomerRequestModal, {
							key: 5,
							customer: unref(selectedChangeRequest),
							open: true,
							"onUpdate:open": (open) => {
								if (!open) selectedChangeRequest.value = null;
							},
							onChanged: ($event) => selectedChangeRequest.value = null
						}, null, 8, [
							"customer",
							"onUpdate:open",
							"onChanged"
						])) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/customers.vue
var _sfc_setup = customers_vue_vue_type_script_setup_true_lang_default.setup;
customers_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/customers.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var customers_default = customers_vue_vue_type_script_setup_true_lang_default;

export { customers_default as default };
//# sourceMappingURL=customers-CwYimctM.mjs.map
