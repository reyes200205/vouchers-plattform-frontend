import { _ as _sfc_main$2 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$5 } from './RadioGroup-ByiZ78dl.mjs';
import { aP as useToast, f as _sfc_main$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Modal-C3ktQuxc.mjs';
import { u as useCustomers } from './useCustomers-CQ23lYPq.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { _ as _sfc_main$4 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$3 } from './Textarea-DLoRbkWE.mjs';
import { C as ChangeCustomerRequestModal_default } from './ChangeCustomerRequestModal-DOve31JV.mjs';
import { defineComponent, ref, computed, reactive, watch, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import * as z from 'zod';

//#region app/components/vouchers/DecideVoucherRequestModal.vue?vue&type=script&setup=true&lang.ts
var DecideVoucherRequestModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideVoucherRequestModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { approveVoucherRequest, rejectVoucherRequest } = useVouchers();
		const { verifyCustomer, fieldLabels } = useCustomers();
		const toast = useToast();
		const labels = fieldLabels();
		const open = ref(false);
		const isChangeRequestOpen = ref(false);
		const needsVerification = computed(() => !!props.item.customer && !props.item.customer.verified_at);
		const step = ref("voucher");
		const decision = ref("APROBADO");
		const schema = computed(() => decision.value === "RECHAZADO" ? z.object({ rejection_reason: z.string().min(3, "Indica el motivo del rechazo") }) : z.object({ notes: z.string().optional() }));
		const state = reactive({
			rejection_reason: void 0,
			notes: void 0
		});
		const verifying = ref(false);
		const verifyNotes = ref(void 0);
		const submitting = ref(false);
		function resetWizard() {
			step.value = needsVerification.value ? "customer" : "voucher";
			decision.value = "APROBADO";
			state.rejection_reason = void 0;
			state.notes = void 0;
			verifyNotes.value = void 0;
		}
		watch(open, (isOpen) => {
			if (isOpen) resetWizard();
		});
		function present(value) {
			return value && value.trim() ? value : "—";
		}
		const person = computed(() => props.item.customer?.person ?? null);
		const IDENTITY_FIELDS = [
			"first_name",
			"middle_name",
			"last_name",
			"second_last_name",
			"curp",
			"rfc",
			"mobile_phone",
			"email"
		];
		const personDetails = computed(() => IDENTITY_FIELDS.map((field) => ({
			key: field,
			label: labels[field],
			value: present(person.value?.[field] ?? null)
		})));
		const addressLine = computed(() => {
			const p = person.value;
			if (!p) return "—";
			const parts = [
				p.street,
				p.external_number ? `#${p.external_number}` : null,
				p.neighborhood,
				p.city,
				p.state,
				p.postal_code
			].filter(Boolean);
			return parts.length ? parts.join(", ") : "—";
		});
		async function onVerifyConfirmed() {
			if (!props.item.customer) return;
			verifying.value = true;
			try {
				await verifyCustomer(props.item.customer.id, { notes: verifyNotes.value || void 0 });
				toast.add({
					title: "Cliente verificado",
					description: "Documentos validados. Continúa con los detalles del vale.",
					color: "success"
				});
				step.value = "voucher";
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo verificar al cliente. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				verifying.value = false;
			}
		}
		function onRequestChange() {
			open.value = false;
			isChangeRequestOpen.value = true;
		}
		function onChanged() {
			isChangeRequestOpen.value = false;
			toast.add({
				title: "Solicitud enviada",
				description: "Cuando el gerente apruebe el cambio, vuelve a \"Decidir\" para verificar y otorgar el vale.",
				color: "info"
			});
		}
		async function onSubmit(event) {
			submitting.value = true;
			try {
				if (decision.value === "APROBADO") await approveVoucherRequest(props.item.id, { notes: event.data.notes || void 0 });
				else await rejectVoucherRequest(props.item.id, { rejection_reason: event.data.rejection_reason ?? "" });
				toast.add({
					title: "Decisión registrada",
					description: decision.value === "APROBADO" ? "El vale fue aprobado y ya está activo -- se generaron su referencia de pago y número de autorización." : "La solicitud de vale fue rechazada.",
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
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_UFormField = _sfc_main$2;
			const _component_UTextarea = _sfc_main$3;
			const _component_UForm = _sfc_main$4;
			const _component_URadioGroup = _sfc_main$5;
			const _component_CustomersChangeCustomerRequestModal = ChangeCustomerRequestModal_default;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: unref(step) === "customer" ? "Verificar cliente (primer vale)" : "Decidir solicitud de vale",
				description: unref(step) === "customer" ? "Revisa su identificación (INE) y comprobante de domicilio en persona" : "Aprobar o rechazar la solicitud",
				ui: { content: "max-w-xl" }
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (unref(step) === "customer") {
						_push(`<div class="space-y-4"${_scopeId}><div class="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning"${_scopeId}> Es el primer vale de este cliente: valida su identidad en persona antes de continuar. </div>`);
						if (unref(person)) {
							_push(`<div class="space-y-2 text-sm"${_scopeId}><p class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(__props.item.customer_name || "Cliente")} <span class="font-normal text-muted"${_scopeId}>(${ssrInterpolate(__props.item.customer_code)})</span></p><div class="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2"${_scopeId}><!--[-->`);
							ssrRenderList(unref(personDetails), (field) => {
								_push(`<span class="text-muted"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(field.label)}:</span> ${ssrInterpolate(field.value)}</span>`);
							});
							_push(`<!--]--></div><p class="text-muted"${_scopeId}><span class="font-medium text-highlighted"${_scopeId}>Domicilio:</span> ${ssrInterpolate(unref(addressLine))}</p></div>`);
						} else _push(`<p class="text-sm text-muted"${_scopeId}> No hay datos de identidad capturados para este cliente. </p>`);
						_push(ssrRenderComponent(_component_UFormField, { label: "Notas de la verificación" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTextarea, {
									modelValue: unref(verifyNotes),
									"onUpdate:modelValue": ($event) => isRef(verifyNotes) ? verifyNotes.value = $event : null,
									placeholder: "Observaciones de la verificación (opcional)...",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UTextarea, {
									modelValue: unref(verifyNotes),
									"onUpdate:modelValue": ($event) => isRef(verifyNotes) ? verifyNotes.value = $event : null,
									placeholder: "Observaciones de la verificación (opcional)...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="flex flex-wrap justify-end gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Cancelar",
							color: "neutral",
							variant: "subtle",
							onClick: ($event) => open.value = false
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							label: "Solicitar cambio de datos",
							color: "neutral",
							variant: "subtle",
							icon: "i-lucide-file-pen-line",
							onClick: onRequestChange
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							label: "Todo correcto, verificar",
							color: "success",
							variant: "solid",
							loading: unref(verifying),
							onClick: onVerifyConfirmed
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
					} else _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="rounded-lg border border-default px-3 py-2 text-sm"${_scopeId}><p class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(__props.item.distributor_name)} `);
								if (__props.item.customer_name) _push(`<span${_scopeId}> · ${ssrInterpolate(__props.item.customer_name)}</span>`);
								else _push(`<!---->`);
								_push(`</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(__props.item.financial_product_name ?? "Producto")} · ${ssrInterpolate(unref(money).format(Number(__props.item.requested_amount)))} `);
								if (__props.item.is_pre_vale) _push(`<span${_scopeId}> · Pre-vale</span>`);
								else _push(`<!---->`);
								_push(`</p></div>`);
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
								if (unref(decision) === "APROBADO") _push(ssrRenderComponent(_component_UFormField, {
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
								else _push(ssrRenderComponent(_component_UFormField, {
									label: "Motivo del rechazo",
									name: "rejection_reason"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											placeholder: "Explica por qué se rechaza la solicitud...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											placeholder: "Explica por qué se rechaza la solicitud...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								if (unref(needsVerification)) _push(ssrRenderComponent(_component_UButton, {
									label: "Atrás",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => step.value = "customer"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
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
								createVNode("div", { class: "rounded-lg border border-default px-3 py-2 text-sm" }, [createVNode("p", { class: "font-medium text-highlighted" }, [createTextVNode(toDisplayString(__props.item.distributor_name) + " ", 1), __props.item.customer_name ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(__props.item.customer_name), 1)) : createCommentVNode("", true)]), createVNode("p", { class: "text-xs text-muted" }, [createTextVNode(toDisplayString(__props.item.financial_product_name ?? "Producto") + " · " + toDisplayString(unref(money).format(Number(__props.item.requested_amount))) + " ", 1), __props.item.is_pre_vale ? (openBlock(), createBlock("span", { key: 0 }, " · Pre-vale")) : createCommentVNode("", true)])]),
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
								unref(decision) === "APROBADO" ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
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
								})) : (openBlock(), createBlock(_component_UFormField, {
									key: 1,
									label: "Motivo del rechazo",
									name: "rejection_reason"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).rejection_reason,
										"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
										placeholder: "Explica por qué se rechaza la solicitud...",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})),
								createVNode("div", { class: "flex justify-end gap-2" }, [
									unref(needsVerification) ? (openBlock(), createBlock(_component_UButton, {
										key: 0,
										label: "Atrás",
										color: "neutral",
										variant: "ghost",
										onClick: ($event) => step.value = "customer"
									}, null, 8, ["onClick"])) : createCommentVNode("", true),
									createVNode(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										onClick: ($event) => open.value = false
									}, null, 8, ["onClick"]),
									createVNode(_component_UButton, {
										label: unref(decision) === "APROBADO" ? "Aprobar" : "Rechazar",
										color: unref(decision) === "APROBADO" ? "success" : "error",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, 8, [
										"label",
										"color",
										"loading"
									])
								])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [unref(step) === "customer" ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-4"
					}, [
						createVNode("div", { class: "rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning" }, " Es el primer vale de este cliente: valida su identidad en persona antes de continuar. "),
						unref(person) ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-2 text-sm"
						}, [
							createVNode("p", { class: "font-medium text-highlighted" }, [createTextVNode(toDisplayString(__props.item.customer_name || "Cliente") + " ", 1), createVNode("span", { class: "font-normal text-muted" }, "(" + toDisplayString(__props.item.customer_code) + ")", 1)]),
							createVNode("div", { class: "grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(personDetails), (field) => {
								return openBlock(), createBlock("span", {
									key: field.key,
									class: "text-muted"
								}, [createVNode("span", { class: "font-medium text-highlighted" }, toDisplayString(field.label) + ":", 1), createTextVNode(" " + toDisplayString(field.value), 1)]);
							}), 128))]),
							createVNode("p", { class: "text-muted" }, [createVNode("span", { class: "font-medium text-highlighted" }, "Domicilio:"), createTextVNode(" " + toDisplayString(unref(addressLine)), 1)])
						])) : (openBlock(), createBlock("p", {
							key: 1,
							class: "text-sm text-muted"
						}, " No hay datos de identidad capturados para este cliente. ")),
						createVNode(_component_UFormField, { label: "Notas de la verificación" }, {
							default: withCtx(() => [createVNode(_component_UTextarea, {
								modelValue: unref(verifyNotes),
								"onUpdate:modelValue": ($event) => isRef(verifyNotes) ? verifyNotes.value = $event : null,
								placeholder: "Observaciones de la verificación (opcional)...",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode("div", { class: "flex flex-wrap justify-end gap-2" }, [
							createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]),
							createVNode(_component_UButton, {
								label: "Solicitar cambio de datos",
								color: "neutral",
								variant: "subtle",
								icon: "i-lucide-file-pen-line",
								onClick: onRequestChange
							}),
							createVNode(_component_UButton, {
								label: "Todo correcto, verificar",
								color: "success",
								variant: "solid",
								loading: unref(verifying),
								onClick: onVerifyConfirmed
							}, null, 8, ["loading"])
						])
					])) : (openBlock(), createBlock(_component_UForm, {
						key: 1,
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode("div", { class: "rounded-lg border border-default px-3 py-2 text-sm" }, [createVNode("p", { class: "font-medium text-highlighted" }, [createTextVNode(toDisplayString(__props.item.distributor_name) + " ", 1), __props.item.customer_name ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(__props.item.customer_name), 1)) : createCommentVNode("", true)]), createVNode("p", { class: "text-xs text-muted" }, [createTextVNode(toDisplayString(__props.item.financial_product_name ?? "Producto") + " · " + toDisplayString(unref(money).format(Number(__props.item.requested_amount))) + " ", 1), __props.item.is_pre_vale ? (openBlock(), createBlock("span", { key: 0 }, " · Pre-vale")) : createCommentVNode("", true)])]),
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
							unref(decision) === "APROBADO" ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
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
							})) : (openBlock(), createBlock(_component_UFormField, {
								key: 1,
								label: "Motivo del rechazo",
								name: "rejection_reason"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).rejection_reason,
									"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
									placeholder: "Explica por qué se rechaza la solicitud...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})),
							createVNode("div", { class: "flex justify-end gap-2" }, [
								unref(needsVerification) ? (openBlock(), createBlock(_component_UButton, {
									key: 0,
									label: "Atrás",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => step.value = "customer"
								}, null, 8, ["onClick"])) : createCommentVNode("", true),
								createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]),
								createVNode(_component_UButton, {
									label: unref(decision) === "APROBADO" ? "Aprobar" : "Rechazar",
									color: unref(decision) === "APROBADO" ? "success" : "error",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, [
									"label",
									"color",
									"loading"
								])
							])
						]),
						_: 1
					}, 8, ["schema", "state"]))];
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
			if (__props.item.customer) _push(ssrRenderComponent(_component_CustomersChangeCustomerRequestModal, {
				open: unref(isChangeRequestOpen),
				"onUpdate:open": ($event) => isRef(isChangeRequestOpen) ? isChangeRequestOpen.value = $event : null,
				customer: __props.item.customer,
				onChanged
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/components/vouchers/DecideVoucherRequestModal.vue
var _sfc_setup = DecideVoucherRequestModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideVoucherRequestModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/vouchers/DecideVoucherRequestModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DecideVoucherRequestModal_default = Object.assign(DecideVoucherRequestModal_vue_vue_type_script_setup_true_lang_default, { __name: "VouchersDecideVoucherRequestModal" });

export { DecideVoucherRequestModal_default as D };
//# sourceMappingURL=DecideVoucherRequestModal-bq6A-oDw.mjs.map
