import { ap as useComponentProps, aj as useAppConfig, ag as tv, c as Primitive, aP as useToast, f as _sfc_main$2 } from '../virtual/entry.mjs';
import { _ as _sfc_main$5 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$4 } from './RadioGroup-ByiZ78dl.mjs';
import { _ as _sfc_main$1 } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$3 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$6 } from './Textarea-DLoRbkWE.mjs';
import { u as useReconciliations } from './useReconciliations-D-H88Ltl.mjs';
import { computed, unref, mergeProps, withCtx, renderSlot, createVNode, defineComponent, ref, reactive, watch, isRef, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import * as z from 'zod';

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
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardToolbar.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
			const _component_UModal = _sfc_main$1;
			const _component_UButton = _sfc_main$2;
			const _component_UForm = _sfc_main$3;
			const _component_URadioGroup = _sfc_main$4;
			const _component_UFormField = _sfc_main$5;
			const _component_UTextarea = _sfc_main$6;
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
var _sfc_setup = DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default.setup;
DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reconciliations/DecideReconciliationModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DecideReconciliationModal_default = Object.assign(DecideReconciliationModal_vue_vue_type_script_setup_true_lang_default, { __name: "ReconciliationsDecideReconciliationModal" });

export { DecideReconciliationModal_default as D, _sfc_main as _ };
//# sourceMappingURL=DecideReconciliationModal-Nfej1igU.mjs.map
