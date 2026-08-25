import { _ as _sfc_main$3 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$4 } from './RadioGroup-ByiZ78dl.mjs';
import { aP as useToast, f as _sfc_main$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Modal-C3ktQuxc.mjs';
import { c as customerFullName } from './useCustomers-CQ23lYPq.mjs';
import { u as useCustomerTransfers } from './useCustomerTransfers-CsxvIT-E.mjs';
import { _ as _sfc_main$2 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$5 } from './Textarea-DLoRbkWE.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, isRef, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import * as z from 'zod';

//#region app/components/customer-transfers/DecideModal.vue?vue&type=script&setup=true&lang.ts
var DecideModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DecideModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["decided"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			decision: z.enum(["APPROVE", "REJECT"]),
			comments: z.string().optional(),
			rejection_reason: z.string().optional()
		}).refine((data) => data.decision !== "REJECT" || !!data.rejection_reason, {
			message: "Indica el motivo del rechazo",
			path: ["rejection_reason"]
		});
		const open = ref(false);
		const state = reactive({
			decision: "APPROVE",
			comments: void 0,
			rejection_reason: void 0
		});
		const { decideTransferAsCoordinator } = useCustomerTransfers();
		const toast = useToast();
		const submitting = ref(false);
		watch(open, (isOpen) => {
			if (isOpen) {
				state.decision = "APPROVE";
				state.comments = void 0;
				state.rejection_reason = void 0;
			}
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await decideTransferAsCoordinator(props.item.id, {
					decision: event.data.decision,
					comments: event.data.comments || void 0,
					rejection_reason: event.data.rejection_reason || void 0
				});
				toast.add({
					title: event.data.decision === "APPROVE" ? "Transferencia autorizada" : "Transferencia rechazada",
					description: `La solicitud #${props.item.id} fue resuelta.`,
					color: "success"
				});
				open.value = false;
				emit("decided");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo resolver la solicitud. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_UForm = _sfc_main$2;
			const _component_UFormField = _sfc_main$3;
			const _component_URadioGroup = _sfc_main$4;
			const _component_UTextarea = _sfc_main$5;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Autorizar transferencia de cliente",
				description: "La distribuidora destino ya aceptó al cliente; falta tu autorización",
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
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Cliente",
									name: "customer"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<p class="text-sm font-medium text-highlighted"${_scopeId}>${ssrInterpolate(unref(customerFullName)(__props.item.customer?.person))}</p>`);
										else return [createVNode("p", { class: "text-sm font-medium text-highlighted" }, toDisplayString(unref(customerFullName)(__props.item.customer?.person)), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Distribuidora origen",
									name: "source"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<p class="text-sm text-muted"${_scopeId}>${ssrInterpolate(__props.item.source_distributor?.distributor_number)}</p>`);
										else return [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(__props.item.source_distributor?.distributor_number), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Distribuidora destino",
									name: "destination"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<p class="text-sm text-muted"${_scopeId}>${ssrInterpolate(__props.item.destination_distributor?.distributor_number)}</p>`);
										else return [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(__props.item.destination_distributor?.distributor_number), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Decisión",
									name: "decision",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_URadioGroup, {
											modelValue: unref(state).decision,
											"onUpdate:modelValue": ($event) => unref(state).decision = $event,
											items: [{
												label: "Autorizar",
												value: "APPROVE"
											}, {
												label: "Rechazar",
												value: "REJECT"
											}]
										}, null, _parent, _scopeId));
										else return [createVNode(_component_URadioGroup, {
											modelValue: unref(state).decision,
											"onUpdate:modelValue": ($event) => unref(state).decision = $event,
											items: [{
												label: "Autorizar",
												value: "APPROVE"
											}, {
												label: "Rechazar",
												value: "REJECT"
											}]
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								if (unref(state).decision === "REJECT") _push(ssrRenderComponent(_component_UFormField, {
									label: "Motivo del rechazo",
									name: "rejection_reason",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).rejection_reason,
											"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Comentarios (opcional)",
									name: "comments"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).comments,
											"onUpdate:modelValue": ($event) => unref(state).comments = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).comments,
											"onUpdate:modelValue": ($event) => unref(state).comments = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Confirmar",
									type: "submit",
									color: "primary",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UFormField, {
									label: "Cliente",
									name: "customer"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-sm font-medium text-highlighted" }, toDisplayString(unref(customerFullName)(__props.item.customer?.person)), 1)]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Distribuidora origen",
									name: "source"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(__props.item.source_distributor?.distributor_number), 1)]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Distribuidora destino",
									name: "destination"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(__props.item.destination_distributor?.distributor_number), 1)]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Decisión",
									name: "decision",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_URadioGroup, {
										modelValue: unref(state).decision,
										"onUpdate:modelValue": ($event) => unref(state).decision = $event,
										items: [{
											label: "Autorizar",
											value: "APPROVE"
										}, {
											label: "Rechazar",
											value: "REJECT"
										}]
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								unref(state).decision === "REJECT" ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
									label: "Motivo del rechazo",
									name: "rejection_reason",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).rejection_reason,
										"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode(_component_UFormField, {
									label: "Comentarios (opcional)",
									name: "comments"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).comments,
										"onUpdate:modelValue": ($event) => unref(state).comments = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Confirmar",
									type: "submit",
									color: "primary",
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
							createVNode(_component_UFormField, {
								label: "Cliente",
								name: "customer"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-sm font-medium text-highlighted" }, toDisplayString(unref(customerFullName)(__props.item.customer?.person)), 1)]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Distribuidora origen",
								name: "source"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(__props.item.source_distributor?.distributor_number), 1)]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Distribuidora destino",
								name: "destination"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-sm text-muted" }, toDisplayString(__props.item.destination_distributor?.distributor_number), 1)]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Decisión",
								name: "decision",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_URadioGroup, {
									modelValue: unref(state).decision,
									"onUpdate:modelValue": ($event) => unref(state).decision = $event,
									items: [{
										label: "Autorizar",
										value: "APPROVE"
									}, {
										label: "Rechazar",
										value: "REJECT"
									}]
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							unref(state).decision === "REJECT" ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
								label: "Motivo del rechazo",
								name: "rejection_reason",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).rejection_reason,
									"onUpdate:modelValue": ($event) => unref(state).rejection_reason = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode(_component_UFormField, {
								label: "Comentarios (opcional)",
								name: "comments"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).comments,
									"onUpdate:modelValue": ($event) => unref(state).comments = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "ghost",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Confirmar",
								type: "submit",
								color: "primary",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Resolver",
						icon: "i-lucide-check-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Resolver",
						icon: "i-lucide-check-check",
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
//#region app/components/customer-transfers/DecideModal.vue
var _sfc_setup = DecideModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customer-transfers/DecideModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DecideModal_default = Object.assign(DecideModal_vue_vue_type_script_setup_true_lang_default, { __name: "CustomerTransfersDecideModal" });

export { DecideModal_default as D };
//# sourceMappingURL=DecideModal-4OcubhvJ.mjs.map
