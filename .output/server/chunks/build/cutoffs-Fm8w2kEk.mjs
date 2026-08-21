import { aP as useToast, al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main } from '../virtual/entry.mjs';
import { _ as _sfc_main$7 } from './Select-CHtpM6Dc.mjs';
import { _ as _sfc_main$4 } from './DropdownMenu-Blcsr3st.mjs';
import { _ as _sfc_main$b } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$5 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$9 } from './Modal-BQ_M11w-.mjs';
import { _ as _sfc_main$3 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$c } from './Input-YDRYCqsV.mjs';
import { c as customerFullName } from './useCustomers-Z8wRBFPR.mjs';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './DashboardNavbar-BzzI9nrt.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-CBDjl-2o.mjs';
import { _ as _sfc_main$a } from './Form-j1wdqi9R.mjs';
import { u as useBranches } from './useBranches-BECDq2r0.mjs';
import { u as useReconciliations } from './useReconciliations-DXy4E_V7.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, withCtx, unref, createVNode, isRef, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, createCommentVNode, withModifiers, useModel, mergeProps, mergeModels, reactive, useSSRContext } from 'vue';
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
import './useComposing-D1bdBmsI.mjs';
import './Kbd-BZbceTrO.mjs';
import './RovingFocusGroup-BqLcWsjw.mjs';
import './overlay-7pzjQIHW.mjs';

//#region app/components/cutoffs/GenerateCutoffModal.vue?vue&type=script&setup=true&lang.ts
var GenerateCutoffModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GenerateCutoffModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		branchId: {},
		branchName: {}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["generated"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useModel(__props, "open");
		const emit = __emit;
		const schema = z.object({
			period_start: z.string().min(1, "Requerido"),
			period_end: z.string().min(1, "Requerido")
		}).refine((data) => data.period_end >= data.period_start, {
			message: "El fin del periodo debe ser igual o posterior al inicio",
			path: ["period_end"]
		});
		const { generateCutoff } = useReconciliations();
		const toast = useToast();
		const submitting = ref(false);
		function defaultStart() {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - 15);
			return d.toISOString().slice(0, 10);
		}
		function defaultEnd() {
			return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		}
		const state = reactive({
			period_start: defaultStart(),
			period_end: defaultEnd()
		});
		watch(open, (isOpen) => {
			if (!isOpen) return;
			state.period_start = defaultStart();
			state.period_end = defaultEnd();
		});
		async function onSubmit(event) {
			if (!props.branchId) return;
			submitting.value = true;
			try {
				const cutoff = await generateCutoff(props.branchId, {
					period_start: event.data.period_start,
					period_end: event.data.period_end
				});
				toast.add({
					title: "Corte generado",
					description: `Se generaron ${cutoff.relations_count ?? cutoff.relations?.length ?? 0} relación(es) para el corte #${cutoff.id}.`,
					color: "success"
				});
				open.value = false;
				emit("generated");
			} catch (e) {
				const message = e instanceof Error && "data" in e ? e.data?.message : void 0;
				toast.add({
					title: "Error",
					description: message || "No se pudo generar el corte. Verifica el periodo e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UForm = _sfc_main$a;
			const _component_UFormField = _sfc_main$b;
			const _component_UInput = _sfc_main$c;
			const _component_UButton = _sfc_main;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Generar corte",
				description: __props.branchName ? `Sucursal: ${__props.branchName}` : "Selecciona el periodo a cortar",
				ui: { content: "max-w-lg" }
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
								_push(`<p class="text-sm text-muted"${_scopeId}> Se generará una relación por cada distribuidora con pagos o saldos pendientes en el periodo. Las relaciones sin liquidar del corte anterior se arrastrarán automáticamente al nuevo corte. </p><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Inicio de periodo",
									name: "period_start"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).period_start,
											"onUpdate:modelValue": ($event) => unref(state).period_start = $event,
											type: "date",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).period_start,
											"onUpdate:modelValue": ($event) => unref(state).period_start = $event,
											type: "date",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Fin de periodo",
									name: "period_end"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).period_end,
											"onUpdate:modelValue": ($event) => unref(state).period_end = $event,
											type: "date",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).period_end,
											"onUpdate:modelValue": ($event) => unref(state).period_end = $event,
											type: "date",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Generar",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode("p", { class: "text-sm text-muted" }, " Se generará una relación por cada distribuidora con pagos o saldos pendientes en el periodo. Las relaciones sin liquidar del corte anterior se arrastrarán automáticamente al nuevo corte. "),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
									required: "",
									label: "Inicio de periodo",
									name: "period_start"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).period_start,
										"onUpdate:modelValue": ($event) => unref(state).period_start = $event,
										type: "date",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}), createVNode(_component_UFormField, {
									required: "",
									label: "Fin de periodo",
									name: "period_end"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).period_end,
										"onUpdate:modelValue": ($event) => unref(state).period_end = $event,
										type: "date",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Generar",
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
							createVNode("p", { class: "text-sm text-muted" }, " Se generará una relación por cada distribuidora con pagos o saldos pendientes en el periodo. Las relaciones sin liquidar del corte anterior se arrastrarán automáticamente al nuevo corte. "),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
								required: "",
								label: "Inicio de periodo",
								name: "period_start"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).period_start,
									"onUpdate:modelValue": ($event) => unref(state).period_start = $event,
									type: "date",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}), createVNode(_component_UFormField, {
								required: "",
								label: "Fin de periodo",
								name: "period_end"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).period_end,
									"onUpdate:modelValue": ($event) => unref(state).period_end = $event,
									type: "date",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})]),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Generar",
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
//#region app/components/cutoffs/GenerateCutoffModal.vue
var _sfc_setup$2 = GenerateCutoffModal_vue_vue_type_script_setup_true_lang_default.setup;
GenerateCutoffModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cutoffs/GenerateCutoffModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var GenerateCutoffModal_default = Object.assign(GenerateCutoffModal_vue_vue_type_script_setup_true_lang_default, { __name: "CutoffsGenerateCutoffModal" });
//#endregion
//#region app/components/cutoffs/RelationDetailModal.vue?vue&type=script&setup=true&lang.ts
var RelationDetailModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RelationDetailModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ relation: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function fmtMoney(value) {
			if (value === null || value === void 0) return "—";
			return money.format(Number(value));
		}
		function fmtDate(value) {
			if (!value) return "—";
			const [year, month, day] = value.split("-").map(Number);
			return new Date(year, month - 1, day).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
		}
		const statusColors = {
			GENERADA: "info",
			PAGADA: "success",
			PARCIAL: "warning",
			VENCIDA: "error",
			CERRADA: "neutral"
		};
		function statusColor(status) {
			return status ? statusColors[status] ?? "neutral" : "neutral";
		}
		function isCarryover(item) {
			return item.origin_relation_id !== null;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UBadge = _sfc_main$3;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: __props.relation ? `Relación ${__props.relation.relation_number}` : "Relación",
				description: __props.relation?.distributor?.person ? unref(customerFullName)(__props.relation.distributor.person) : void 0,
				ui: { content: "max-w-4xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (__props.relation) {
						_push(`<div class="space-y-6"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-default bg-elevated/50 p-4"${_scopeId}><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Distribuidora </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(__props.relation.distributor?.person ? unref(customerFullName)(__props.relation.distributor.person) : `#${__props.relation.distributor_id}`)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(__props.relation.distributor?.distributor_number)}</p></div>`);
						if (__props.relation.status) _push(ssrRenderComponent(_component_UBadge, {
							color: statusColor(__props.relation.status),
							variant: "subtle",
							label: __props.relation.status,
							size: "lg"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div><div class="grid grid-cols-2 gap-4 sm:grid-cols-4"${_scopeId}><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Línea de crédito </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(__props.relation.credit_limit_snapshot))}</p></div><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Disponible </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(__props.relation.available_credit_snapshot))}</p></div><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Puntos </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(__props.relation.points_snapshot ?? 0)}</p></div><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Fecha límite de pago </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtDate(__props.relation.payment_due_date))}</p></div></div><div class="rounded-lg border border-default p-4"${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Referencia de pago </p><p class="font-mono text-lg font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(__props.relation.payment_reference ?? "—")}</p>`);
						if (__props.relation.previous_relation_id) _push(`<p class="mt-1 text-xs text-muted"${_scopeId}> Incluye saldo arrastrado de la relación #${ssrInterpolate(__props.relation.previous_relation_id)} (${ssrInterpolate(fmtMoney(__props.relation.total_carryover_received))}) </p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><p class="mb-2 text-sm font-semibold text-highlighted"${_scopeId}> Vales incluidos </p>`);
						if (!__props.relation.items?.length) _push(`<div class="py-6 text-center text-sm text-muted"${_scopeId}> Este corte no incluye vales para esta relación (solo saldo arrastrado). </div>`);
						else {
							_push(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-default text-left text-xs uppercase text-muted"${_scopeId}><th class="py-2 pr-3"${_scopeId}> Concepto </th><th class="py-2 pr-3"${_scopeId}> Cliente </th><th class="py-2 pr-3"${_scopeId}> Producto </th><th class="py-2 pr-3"${_scopeId}> Pago </th><th class="py-2 pr-3"${_scopeId}> Comisión </th><th class="py-2 pr-3"${_scopeId}> Recargo </th><th class="py-2 pr-3 text-right"${_scopeId}> Total </th></tr></thead><tbody${_scopeId}><!--[-->`);
							ssrRenderList(__props.relation.items, (item) => {
								_push(`<tr class="border-b border-default last:border-0"${_scopeId}><td class="py-2 pr-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UBadge, {
									color: isCarryover(item) ? "warning" : "neutral",
									variant: "subtle",
									size: "sm",
									label: isCarryover(item) ? `Arrastre #${item.origin_relation_id}` : `Quincena ${item.installment_number ?? "—"}`
								}, null, _parent, _scopeId));
								_push(`</td><td class="py-2 pr-3"${_scopeId}>${ssrInterpolate(item.customer?.person ? unref(customerFullName)(item.customer.person) : `Cliente #${item.customer_id}`)}</td><td class="py-2 pr-3"${_scopeId}><p class="font-medium text-highlighted"${_scopeId}>${ssrInterpolate(item.product_name_snapshot ?? `Vale #${item.voucher_id}`)}</p>`);
								if (item.is_late_payment) _push(`<p class="text-xs text-error"${_scopeId}> Pago atrasado </p>`);
								else _push(`<!---->`);
								_push(`</td><td class="py-2 pr-3"${_scopeId}>${ssrInterpolate(fmtMoney(item.payment_amount))}</td><td class="py-2 pr-3"${_scopeId}>${ssrInterpolate(fmtMoney(item.commission_amount))}</td><td class="py-2 pr-3"${_scopeId}>${ssrInterpolate(fmtMoney(item.late_fee_amount))}</td><td class="py-2 pr-3 text-right font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(item.line_total_amount))}</td></tr>`);
							});
							_push(`<!--]--></tbody></table></div>`);
						}
						_push(`</div><div class="grid grid-cols-2 gap-4 rounded-lg border border-default bg-elevated/50 p-4 sm:grid-cols-4"${_scopeId}><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Total pagos </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(__props.relation.total_payment))}</p></div><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Total comisión </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(__props.relation.total_commission))}</p></div><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Total recargos </p><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(__props.relation.total_late_fees))}</p></div><div${_scopeId}><p class="text-xs uppercase text-muted"${_scopeId}> Total a pagar </p><p class="text-lg font-bold text-highlighted"${_scopeId}>${ssrInterpolate(fmtMoney(__props.relation.total_amount_due))}</p></div></div></div>`);
					} else _push(`<!---->`);
					else return [__props.relation ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-6"
					}, [
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-default bg-elevated/50 p-4" }, [createVNode("div", null, [
							createVNode("p", { class: "text-xs uppercase text-muted" }, " Distribuidora "),
							createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(__props.relation.distributor?.person ? unref(customerFullName)(__props.relation.distributor.person) : `#${__props.relation.distributor_id}`), 1),
							createVNode("p", { class: "text-xs text-muted" }, toDisplayString(__props.relation.distributor?.distributor_number), 1)
						]), __props.relation.status ? (openBlock(), createBlock(_component_UBadge, {
							key: 0,
							color: statusColor(__props.relation.status),
							variant: "subtle",
							label: __props.relation.status,
							size: "lg"
						}, null, 8, ["color", "label"])) : createCommentVNode("", true)]),
						createVNode("div", { class: "grid grid-cols-2 gap-4 sm:grid-cols-4" }, [
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Línea de crédito "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(fmtMoney(__props.relation.credit_limit_snapshot)), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Disponible "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(fmtMoney(__props.relation.available_credit_snapshot)), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Puntos "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(__props.relation.points_snapshot ?? 0), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Fecha límite de pago "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(fmtDate(__props.relation.payment_due_date)), 1)])
						]),
						createVNode("div", { class: "rounded-lg border border-default p-4" }, [
							createVNode("p", { class: "text-xs uppercase text-muted" }, " Referencia de pago "),
							createVNode("p", { class: "font-mono text-lg font-semibold text-highlighted" }, toDisplayString(__props.relation.payment_reference ?? "—"), 1),
							__props.relation.previous_relation_id ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-1 text-xs text-muted"
							}, " Incluye saldo arrastrado de la relación #" + toDisplayString(__props.relation.previous_relation_id) + " (" + toDisplayString(fmtMoney(__props.relation.total_carryover_received)) + ") ", 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("p", { class: "mb-2 text-sm font-semibold text-highlighted" }, " Vales incluidos "), !__props.relation.items?.length ? (openBlock(), createBlock("div", {
							key: 0,
							class: "py-6 text-center text-sm text-muted"
						}, " Este corte no incluye vales para esta relación (solo saldo arrastrado). ")) : (openBlock(), createBlock("div", {
							key: 1,
							class: "overflow-x-auto"
						}, [createVNode("table", { class: "w-full text-sm" }, [createVNode("thead", null, [createVNode("tr", { class: "border-b border-default text-left text-xs uppercase text-muted" }, [
							createVNode("th", { class: "py-2 pr-3" }, " Concepto "),
							createVNode("th", { class: "py-2 pr-3" }, " Cliente "),
							createVNode("th", { class: "py-2 pr-3" }, " Producto "),
							createVNode("th", { class: "py-2 pr-3" }, " Pago "),
							createVNode("th", { class: "py-2 pr-3" }, " Comisión "),
							createVNode("th", { class: "py-2 pr-3" }, " Recargo "),
							createVNode("th", { class: "py-2 pr-3 text-right" }, " Total ")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.relation.items, (item) => {
							return openBlock(), createBlock("tr", {
								key: item.id,
								class: "border-b border-default last:border-0"
							}, [
								createVNode("td", { class: "py-2 pr-3" }, [createVNode(_component_UBadge, {
									color: isCarryover(item) ? "warning" : "neutral",
									variant: "subtle",
									size: "sm",
									label: isCarryover(item) ? `Arrastre #${item.origin_relation_id}` : `Quincena ${item.installment_number ?? "—"}`
								}, null, 8, ["color", "label"])]),
								createVNode("td", { class: "py-2 pr-3" }, toDisplayString(item.customer?.person ? unref(customerFullName)(item.customer.person) : `Cliente #${item.customer_id}`), 1),
								createVNode("td", { class: "py-2 pr-3" }, [createVNode("p", { class: "font-medium text-highlighted" }, toDisplayString(item.product_name_snapshot ?? `Vale #${item.voucher_id}`), 1), item.is_late_payment ? (openBlock(), createBlock("p", {
									key: 0,
									class: "text-xs text-error"
								}, " Pago atrasado ")) : createCommentVNode("", true)]),
								createVNode("td", { class: "py-2 pr-3" }, toDisplayString(fmtMoney(item.payment_amount)), 1),
								createVNode("td", { class: "py-2 pr-3" }, toDisplayString(fmtMoney(item.commission_amount)), 1),
								createVNode("td", { class: "py-2 pr-3" }, toDisplayString(fmtMoney(item.late_fee_amount)), 1),
								createVNode("td", { class: "py-2 pr-3 text-right font-semibold text-highlighted" }, toDisplayString(fmtMoney(item.line_total_amount)), 1)
							]);
						}), 128))])])]))]),
						createVNode("div", { class: "grid grid-cols-2 gap-4 rounded-lg border border-default bg-elevated/50 p-4 sm:grid-cols-4" }, [
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Total pagos "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(fmtMoney(__props.relation.total_payment)), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Total comisión "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(fmtMoney(__props.relation.total_commission)), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Total recargos "), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(fmtMoney(__props.relation.total_late_fees)), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs uppercase text-muted" }, " Total a pagar "), createVNode("p", { class: "text-lg font-bold text-highlighted" }, toDisplayString(fmtMoney(__props.relation.total_amount_due)), 1)])
						])
					])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/cutoffs/RelationDetailModal.vue
var _sfc_setup$1 = RelationDetailModal_vue_vue_type_script_setup_true_lang_default.setup;
RelationDetailModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cutoffs/RelationDetailModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var RelationDetailModal_default = Object.assign(RelationDetailModal_vue_vue_type_script_setup_true_lang_default, { __name: "CutoffsRelationDetailModal" });
//#endregion
//#region app/pages/general/cutoffs.vue?vue&type=script&setup=true&lang.ts
var cutoffs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "cutoffs",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const toast = useToast();
		const { user } = useAuth();
		const { listBranches } = useBranches();
		const { listCutoffs, getCutoff, reprocessCutoff, closeCutoff } = useReconciliations();
		const canManage = computed(() => user.value?.permissions?.includes("cutoffs.manage") ?? false);
		const isGeneralManager = computed(() => user.value?.permissions?.includes("branches.manage") ?? false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("cutoffs-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const selectedBranchId = ref(branchManagerBranchId.value ?? void 0);
		watch([branchManagerBranchId, branches], () => {
			if (!selectedBranchId.value && branchManagerBranchId.value) selectedBranchId.value = branchManagerBranchId.value;
		}, { immediate: true });
		function branchName(branchId) {
			return branches.value.find((b) => b.id === branchId)?.name ?? `Sucursal ${branchId}`;
		}
		const statusFilter = ref(void 0);
		const page = ref(1);
		const { data: cutoffsData, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("cutoffs", () => listCutoffs({
			page: page.value,
			status: statusFilter.value
		}), {
			watch: [page, statusFilter],
			default: () => ({
				data: [],
				links: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 50,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const items = computed(() => {
			const list = cutoffsData.value.data ?? [];
			if (selectedBranchId.value) return list.filter((c) => c.branch_id === selectedBranchId.value);
			return list;
		});
		const meta = computed(() => cutoffsData.value.meta);
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function fmtDate(value) {
			if (!value) return "—";
			return new Date(value).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
		}
		const statusColors = {
			PROGRAMADO: "neutral",
			EJECUTADO: "success",
			CERRADO: "info",
			REPROCESADO: "warning"
		};
		function statusColor(status) {
			return status ? statusColors[status] ?? "neutral" : "neutral";
		}
		const isGenerateOpen = ref(false);
		function openGenerate() {
			if (!selectedBranchId.value) {
				toast.add({
					title: "Selecciona una sucursal",
					description: "Elige la sucursal antes de generar un corte.",
					color: "warning"
				});
				return;
			}
			isGenerateOpen.value = true;
		}
		function onGenerated() {
			page.value = 1;
			refresh();
		}
		const isRelationsOpen = ref(false);
		const relationsLoading = ref(false);
		const activeCutoff = ref(null);
		async function openRelations(cutoff) {
			isRelationsOpen.value = true;
			relationsLoading.value = true;
			activeCutoff.value = null;
			try {
				activeCutoff.value = await getCutoff(cutoff.id);
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron cargar las relaciones del corte.",
					color: "error"
				});
				isRelationsOpen.value = false;
			} finally {
				relationsLoading.value = false;
			}
		}
		const isDetailOpen = ref(false);
		const selectedRelation = ref(null);
		function openRelationDetail(relation) {
			selectedRelation.value = relation;
			isDetailOpen.value = true;
		}
		const reprocessingId = ref(null);
		const closingId = ref(null);
		async function refreshActiveCutoff(cutoffId) {
			if (isRelationsOpen.value && activeCutoff.value?.id === cutoffId) activeCutoff.value = await getCutoff(cutoffId);
		}
		async function onReprocess(cutoff) {
			reprocessingId.value = cutoff.id;
			try {
				const updated = await reprocessCutoff(cutoff.id);
				const before = cutoff.relations_count ?? 0;
				const after = updated.relations_count ?? updated.relations?.length ?? before;
				const newCount = Math.max(0, after - before);
				toast.add({
					title: "Corte reprocesado",
					description: newCount > 0 ? `Se encontraron ${newCount} relación(es) nueva(s) en el corte #${cutoff.id}.` : `El corte #${cutoff.id} se revisó de nuevo; no hay relaciones nuevas.`,
					color: "success"
				});
				await refresh();
				await refreshActiveCutoff(cutoff.id);
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo reprocesar el corte.",
					color: "error"
				});
			} finally {
				reprocessingId.value = null;
			}
		}
		async function onClose(cutoff) {
			closingId.value = cutoff.id;
			try {
				await closeCutoff(cutoff.id);
				toast.add({
					title: "Corte cerrado",
					description: `El corte #${cutoff.id} quedó cerrado; las relaciones sin pagar quedaron vencidas.`,
					color: "success"
				});
				await refresh();
				await refreshActiveCutoff(cutoff.id);
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo cerrar el corte.",
					color: "error"
				});
			} finally {
				closingId.value = null;
			}
		}
		function canClose(cutoff) {
			return !!cutoff && canManage.value && cutoff.status !== "PROGRAMADO" && cutoff.status !== "CERRADO";
		}
		function getCutoffItems(cutoff) {
			const menuItems = [{
				label: "Ver relaciones",
				icon: "i-lucide-list",
				onSelect: () => openRelations(cutoff)
			}];
			if (canManage.value && cutoff.status !== "REPROCESADO") menuItems.push({
				label: "Reprocesar",
				icon: "i-lucide-refresh-cw",
				onSelect: () => onReprocess(cutoff)
			});
			if (canClose(cutoff)) menuItems.push({
				label: "Cerrar corte",
				icon: "i-lucide-lock",
				onSelect: () => onClose(cutoff)
			});
			return menuItems;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$6;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_USelect = _sfc_main$7;
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$3;
			const _component_UDropdownMenu = _sfc_main$4;
			const _component_UPagination = _sfc_main$5;
			const _component_UModal = _sfc_main$9;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "cutoffs" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Cortes y Relaciones" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(isGeneralManager)) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(selectedBranchId),
									"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
									items: [{
										label: "Todas las sucursales",
										value: void 0
									}, ...unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									}))],
									placeholder: "Sucursal...",
									class: "w-56"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(statusFilter),
									"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
									items: [
										{
											label: "Todos los estados",
											value: void 0
										},
										{
											label: "Programado",
											value: "PROGRAMADO"
										},
										{
											label: "Ejecutado",
											value: "EJECUTADO"
										},
										{
											label: "Cerrado",
											value: "CERRADO"
										},
										{
											label: "Reprocesado",
											value: "REPROCESADO"
										}
									],
									placeholder: "Estado",
									class: "w-40"
								}, null, _parent, _scopeId));
								if (unref(canManage)) _push(ssrRenderComponent(_component_UButton, {
									label: "Generar corte",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openGenerate()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [
								unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
									modelValue: unref(selectedBranchId),
									"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
									items: [{
										label: "Todas las sucursales",
										value: void 0
									}, ...unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									}))],
									placeholder: "Sucursal...",
									class: "w-56"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])) : createCommentVNode("", true),
								createVNode(_component_USelect, {
									modelValue: unref(statusFilter),
									"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
									items: [
										{
											label: "Todos los estados",
											value: void 0
										},
										{
											label: "Programado",
											value: "PROGRAMADO"
										},
										{
											label: "Ejecutado",
											value: "EJECUTADO"
										},
										{
											label: "Cerrado",
											value: "CERRADO"
										},
										{
											label: "Reprocesado",
											value: "REPROCESADO"
										}
									],
									placeholder: "Estado",
									class: "w-40"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
									key: 1,
									label: "Generar corte",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openGenerate()
								}, null, 8, ["onClick"])) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Cortes y Relaciones" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [
							unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
								modelValue: unref(selectedBranchId),
								"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
								items: [{
									label: "Todas las sucursales",
									value: void 0
								}, ...unref(branches).map((b) => ({
									label: b.name,
									value: b.id
								}))],
								placeholder: "Sucursal...",
								class: "w-56"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])) : createCommentVNode("", true),
							createVNode(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Programado",
										value: "PROGRAMADO"
									},
									{
										label: "Ejecutado",
										value: "EJECUTADO"
									},
									{
										label: "Cerrado",
										value: "CERRADO"
									},
									{
										label: "Reprocesado",
										value: "REPROCESADO"
									}
								],
								placeholder: "Estado",
								class: "w-40"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
								key: 1,
								label: "Generar corte",
								icon: "i-lucide-plus",
								color: "primary",
								variant: "solid",
								onClick: ($event) => openGenerate()
							}, null, 8, ["onClick"])) : createCommentVNode("", true)
						]),
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
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar los cortes. </p>`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<div class="flex h-full flex-col overflow-y-auto"${_scopeId}>`);
						if (unref(items).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-scroll-text",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay cortes con esos filtros </p></div>`);
						} else {
							_push(`<div class="divide-y divide-default"${_scopeId}><!--[-->`);
							ssrRenderList(unref(items), (cutoff) => {
								_push(`<div class="flex items-center justify-between gap-3 px-6 py-4 cursor-pointer hover:bg-elevated/50"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}><div class="flex size-10 items-center justify-center rounded-md bg-elevated"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-scroll-text",
									class: "size-5 text-highlighted"
								}, null, _parent, _scopeId));
								_push(`</div><div class="min-w-0"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}> Corte #${ssrInterpolate(cutoff.id)} · ${ssrInterpolate(branchName(cutoff.branch_id))}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(cutoff.cutoff_type ?? "PAGOS")} · Ejecutado ${ssrInterpolate(fmtDate(cutoff.executed_at))} `);
								if (!cutoff.executed_at) _push(`<span${_scopeId}> · Programado ${ssrInterpolate(fmtDate(cutoff.scheduled_at))}</span>`);
								else _push(`<!---->`);
								_push(`</p></div></div><div class="flex items-center gap-3"${_scopeId}><span class="text-sm text-muted"${_scopeId}>${ssrInterpolate(cutoff.relations_count ?? 0)} relaciones </span><span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(cutoff.total_amount_due ?? 0)))}</span>`);
								if (cutoff.status) _push(ssrRenderComponent(_component_UBadge, {
									color: statusColor(cutoff.status),
									variant: "subtle",
									label: cutoff.status
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UDropdownMenu, {
									items: getCutoffItems(cutoff),
									content: { align: "end" }
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost",
											loading: unref(reprocessingId) === cutoff.id || unref(closingId) === cutoff.id,
											"aria-label": "Acciones"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost",
											loading: unref(reprocessingId) === cutoff.id || unref(closingId) === cutoff.id,
											"aria-label": "Acciones"
										}, null, 8, ["loading"])];
									}),
									_: 2
								}, _parent, _scopeId));
								_push(`</div></div>`);
							});
							_push(`<!--]--></div>`);
						}
						if (unref(meta).last_page > 1) {
							_push(`<div class="flex justify-end px-6 py-3 mt-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UPagination, {
								page: unref(page),
								"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
								total: unref(meta).total,
								"items-per-page": unref(meta).per_page
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar los cortes. "),
						createVNode(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock("div", {
						key: 2,
						class: "flex h-full flex-col overflow-y-auto"
					}, [unref(items).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-scroll-text",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay cortes con esos filtros ")])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(items), (cutoff) => {
						return openBlock(), createBlock("div", {
							key: cutoff.id,
							class: "flex items-center justify-between gap-3 px-6 py-4 cursor-pointer hover:bg-elevated/50",
							onClick: ($event) => openRelations(cutoff)
						}, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode("div", { class: "flex size-10 items-center justify-center rounded-md bg-elevated" }, [createVNode(_component_UIcon, {
							name: "i-lucide-scroll-text",
							class: "size-5 text-highlighted"
						})]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, " Corte #" + toDisplayString(cutoff.id) + " · " + toDisplayString(branchName(cutoff.branch_id)), 1), createVNode("p", { class: "text-xs text-muted" }, [createTextVNode(toDisplayString(cutoff.cutoff_type ?? "PAGOS") + " · Ejecutado " + toDisplayString(fmtDate(cutoff.executed_at)) + " ", 1), !cutoff.executed_at ? (openBlock(), createBlock("span", { key: 0 }, " · Programado " + toDisplayString(fmtDate(cutoff.scheduled_at)), 1)) : createCommentVNode("", true)])])]), createVNode("div", {
							class: "flex items-center gap-3",
							onClick: withModifiers(() => {}, ["stop"])
						}, [
							createVNode("span", { class: "text-sm text-muted" }, toDisplayString(cutoff.relations_count ?? 0) + " relaciones ", 1),
							createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(cutoff.total_amount_due ?? 0))), 1),
							cutoff.status ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: statusColor(cutoff.status),
								variant: "subtle",
								label: cutoff.status
							}, null, 8, ["color", "label"])) : createCommentVNode("", true),
							createVNode(_component_UDropdownMenu, {
								items: getCutoffItems(cutoff),
								content: { align: "end" }
							}, {
								default: withCtx(() => [createVNode(_component_UButton, {
									icon: "i-lucide-ellipsis-vertical",
									color: "neutral",
									variant: "ghost",
									loading: unref(reprocessingId) === cutoff.id || unref(closingId) === cutoff.id,
									"aria-label": "Acciones"
								}, null, 8, ["loading"])]),
								_: 2
							}, 1032, ["items"])
						], 8, ["onClick"])], 8, ["onClick"]);
					}), 128))])), unref(meta).last_page > 1 ? (openBlock(), createBlock("div", {
						key: 2,
						class: "flex justify-end px-6 py-3 mt-auto"
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
					])])) : createCommentVNode("", true)]))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(isRelationsOpen),
				"onUpdate:open": ($event) => isRef(isRelationsOpen) ? isRelationsOpen.value = $event : null,
				title: unref(activeCutoff) ? `Relaciones del corte #${unref(activeCutoff).id}` : "Relaciones del corte",
				description: unref(activeCutoff) ? `${branchName(unref(activeCutoff).branch_id)} · ${unref(activeCutoff).status}` : void 0,
				ui: { content: "max-w-3xl" }
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (unref(relationsLoading)) {
						_push(`<div class="flex items-center justify-center py-12"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-8 animate-spin text-muted"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<!--[-->`);
						if (canClose(unref(activeCutoff))) {
							_push(`<div class="mb-4 flex justify-end"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UButton, {
								label: "Cerrar corte",
								icon: "i-lucide-lock",
								color: "error",
								variant: "soft",
								loading: !!unref(activeCutoff) && unref(closingId) === unref(activeCutoff).id,
								onClick: ($event) => unref(activeCutoff) && onClose(unref(activeCutoff))
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						if (!unref(activeCutoff)?.relations?.length) _push(`<div class="py-12 text-center text-sm text-muted"${_scopeId}> Este corte no tiene relaciones generadas. </div>`);
						else {
							_push(`<div class="divide-y divide-default"${_scopeId}><!--[-->`);
							ssrRenderList(unref(activeCutoff).relations, (relation) => {
								_push(`<div class="flex cursor-pointer items-center justify-between gap-3 py-3 hover:bg-elevated/50"${_scopeId}><div class="min-w-0"${_scopeId}><p class="truncate font-medium text-highlighted"${_scopeId}>${ssrInterpolate(relation.distributor?.person ? unref(customerFullName)(relation.distributor.person) : `Distribuidora #${relation.distributor_id}`)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(relation.relation_number)} · Ref: ${ssrInterpolate(relation.payment_reference ?? "—")}</p></div><div class="flex items-center gap-3"${_scopeId}><span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(relation.total_amount_due)))}</span>`);
								if (relation.status) _push(ssrRenderComponent(_component_UBadge, {
									variant: "subtle",
									label: relation.status
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`</div></div>`);
							});
							_push(`<!--]--></div>`);
						}
						_push(`<!--]-->`);
					}
					else return [unref(relationsLoading) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-12"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : (openBlock(), createBlock(Fragment, { key: 1 }, [canClose(unref(activeCutoff)) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "mb-4 flex justify-end"
					}, [createVNode(_component_UButton, {
						label: "Cerrar corte",
						icon: "i-lucide-lock",
						color: "error",
						variant: "soft",
						loading: !!unref(activeCutoff) && unref(closingId) === unref(activeCutoff).id,
						onClick: ($event) => unref(activeCutoff) && onClose(unref(activeCutoff))
					}, null, 8, ["loading", "onClick"])])) : createCommentVNode("", true), !unref(activeCutoff)?.relations?.length ? (openBlock(), createBlock("div", {
						key: 1,
						class: "py-12 text-center text-sm text-muted"
					}, " Este corte no tiene relaciones generadas. ")) : (openBlock(), createBlock("div", {
						key: 2,
						class: "divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(activeCutoff).relations, (relation) => {
						return openBlock(), createBlock("div", {
							key: relation.id,
							class: "flex cursor-pointer items-center justify-between gap-3 py-3 hover:bg-elevated/50",
							onClick: ($event) => openRelationDetail(relation)
						}, [createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate font-medium text-highlighted" }, toDisplayString(relation.distributor?.person ? unref(customerFullName)(relation.distributor.person) : `Distribuidora #${relation.distributor_id}`), 1), createVNode("p", { class: "text-xs text-muted" }, toDisplayString(relation.relation_number) + " · Ref: " + toDisplayString(relation.payment_reference ?? "—"), 1)]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(relation.total_amount_due))), 1), relation.status ? (openBlock(), createBlock(_component_UBadge, {
							key: 0,
							variant: "subtle",
							label: relation.status
						}, null, 8, ["label"])) : createCommentVNode("", true)])], 8, ["onClick"]);
					}), 128))]))], 64))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(RelationDetailModal_default, {
				open: unref(isDetailOpen),
				"onUpdate:open": ($event) => isRef(isDetailOpen) ? isDetailOpen.value = $event : null,
				relation: unref(selectedRelation)
			}, null, _parent));
			_push(ssrRenderComponent(GenerateCutoffModal_default, {
				open: unref(isGenerateOpen),
				"onUpdate:open": ($event) => isRef(isGenerateOpen) ? isGenerateOpen.value = $event : null,
				"branch-id": unref(selectedBranchId),
				"branch-name": unref(selectedBranchId) ? branchName(unref(selectedBranchId)) : null,
				onGenerated
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/cutoffs.vue
var _sfc_setup = cutoffs_vue_vue_type_script_setup_true_lang_default.setup;
cutoffs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/cutoffs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var cutoffs_default = cutoffs_vue_vue_type_script_setup_true_lang_default;

export { cutoffs_default as default };
//# sourceMappingURL=cutoffs-Fm8w2kEk.mjs.map
