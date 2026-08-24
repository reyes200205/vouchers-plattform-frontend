import { aP as useToast, j as _sfc_main$2, f as _sfc_main, ak as useAsyncData } from '../virtual/entry.mjs';
import { _ as _sfc_main$7 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$5 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$3 } from './Tabs-FmegTH4u.mjs';
import { _ as _sfc_main$6 } from './Input-BC1I0LeZ.mjs';
import { _ as _sfc_main$1 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$4 } from './PageCard-C24h5VaM.mjs';
import { u as useSettings } from './useSettings-ChVaLn3_.mjs';
import { defineComponent, ref, reactive, computed, watch, unref, mergeProps, withCtx, isRef, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import * as z from 'zod';

//#region app/components/settings/BranchSettingsForm.vue?vue&type=script&setup=true&lang.ts
var BranchSettingsForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BranchSettingsForm",
	__ssrInlineRender: true,
	props: {
		branchId: {},
		tabbed: { type: Boolean }
	},
	emits: ["saved"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			voucher_expiration_days: z.coerce.number().int().min(1, "Mínimo 1 día").optional().nullable(),
			voucher_amount_step: z.coerce.number().int().refine((v) => v === 100 || v === 500, "Solo 100 o 500").optional(),
			pre_vale_max_percentage: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0 && Number(v) <= 100, "Entre 0 y 100"),
			pre_vale_tolerance_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
			point_value_mxn: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
			opening_commission_percentage: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0 && Number(v) <= 100, "Entre 0 y 100"),
			biweekly_interest_percentage: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0 && Number(v) <= 100, "Entre 0 y 100"),
			late_payment_penalty_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
			insurance_rates: z.array(z.object({
				min_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
				max_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) > 0, "Monto inválido"),
				insurance_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido")
			})).superRefine((tiers, ctx) => {
				tiers.forEach((tier, index) => {
					const min = Number(tier.min_amount);
					const max = Number(tier.max_amount);
					if (min >= max) ctx.addIssue({
						code: "custom",
						path: [index, "max_amount"],
						message: "Debe ser mayor al mínimo"
					});
					if (tiers.find((t, i) => i !== index && min < Number(t.max_amount) && max > Number(t.min_amount))) ctx.addIssue({
						code: "custom",
						path: [index, "min_amount"],
						message: "Tramos traslapados"
					});
				});
			}).optional()
		});
		const { getBranchSettings, updateBranchSettings } = useSettings();
		const toast = useToast();
		const tab = ref("branch");
		let tierIdCounter = 0;
		const state = reactive({
			voucher_expiration_days: void 0,
			voucher_amount_step: void 0,
			pre_vale_max_percentage: "",
			pre_vale_tolerance_amount: "",
			point_value_mxn: "",
			opening_commission_percentage: "",
			biweekly_interest_percentage: "",
			late_payment_penalty_amount: "",
			insurance_rates: []
		});
		const insurancePreviewInput = ref("");
		const insurancePreview = computed(() => {
			const amount = Number(insurancePreviewInput.value);
			if (!amount || !state.insurance_rates.length) return null;
			const tier = state.insurance_rates.find((t) => {
				const min = Number(t.min_amount);
				const max = Number(t.max_amount);
				return amount >= min && amount <= max;
			});
			return tier ? Number(tier.insurance_amount) : 0;
		});
		function addTier() {
			state.insurance_rates.push({
				min_amount: "",
				max_amount: "",
				insurance_amount: "",
				_id: tierIdCounter++
			});
		}
		function removeTier(id) {
			state.insurance_rates = state.insurance_rates.filter((t) => t._id !== id);
		}
		function applySettings(settings) {
			state.voucher_expiration_days = settings.voucher_expiration_days ?? void 0;
			state.voucher_amount_step = settings.voucher_amount_step ?? void 0;
			state.pre_vale_max_percentage = settings.pre_vale_max_percentage ?? "";
			state.pre_vale_tolerance_amount = settings.pre_vale_tolerance_amount ?? "";
			state.point_value_mxn = settings.point_value_mxn ?? "";
			state.opening_commission_percentage = settings.opening_commission_percentage ?? "";
			state.biweekly_interest_percentage = settings.biweekly_interest_percentage ?? "";
			state.late_payment_penalty_amount = settings.late_payment_penalty_amount ?? "";
			state.insurance_rates = (settings.insurance_rates ?? []).map((tier) => ({
				min_amount: String(tier.min_amount),
				max_amount: String(tier.max_amount),
				insurance_amount: String(tier.insurance_amount),
				_id: tierIdCounter++
			}));
		}
		const settingsLoad = ref("idle");
		async function loadSettings(branchId) {
			settingsLoad.value = "pending";
			try {
				applySettings(await getBranchSettings(branchId));
				settingsLoad.value = "success";
			} catch {
				settingsLoad.value = "error";
			}
		}
		function refreshSettings() {
			if (props.branchId) loadSettings(props.branchId);
		}
		watch(() => props.branchId, (branchId) => {
			if (branchId) loadSettings(branchId);
		}, { immediate: true });
		const saving = ref(false);
		async function onSubmit(event) {
			if (!props.branchId) return;
			saving.value = true;
			try {
				await updateBranchSettings(props.branchId, {
					voucher_expiration_days: event.data.voucher_expiration_days || null,
					voucher_amount_step: event.data.voucher_amount_step,
					pre_vale_max_percentage: event.data.pre_vale_max_percentage,
					pre_vale_tolerance_amount: event.data.pre_vale_tolerance_amount,
					point_value_mxn: event.data.point_value_mxn,
					opening_commission_percentage: event.data.opening_commission_percentage,
					biweekly_interest_percentage: event.data.biweekly_interest_percentage,
					late_payment_penalty_amount: event.data.late_payment_penalty_amount,
					insurance_rates: event.data.insurance_rates?.map((t) => ({
						min_amount: t.min_amount,
						max_amount: t.max_amount,
						insurance_amount: t.insurance_amount
					}))
				});
				toast.add({
					title: "Configuración guardada",
					description: "La configuración de la sucursal fue actualizada.",
					color: "success"
				});
				emit("saved");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo guardar la configuración. Verifica los valores.",
					color: "error"
				});
			} finally {
				saving.value = false;
			}
		}
		__expose({ refreshSettings });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UButton = _sfc_main;
			const _component_UForm = _sfc_main$1;
			const _component_UTabs = _sfc_main$3;
			const _component_UPageCard = _sfc_main$4;
			const _component_UFormField = _sfc_main$5;
			const _component_UInput = _sfc_main$6;
			const _component_USelect = _sfc_main$7;
			if (unref(settingsLoad) === "pending") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center py-16" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-loader-circle",
					class: "size-8 animate-spin text-muted"
				}, null, _parent));
				_push(`</div>`);
			} else if (unref(settingsLoad) === "error") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center gap-3 py-16" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-triangle-alert",
					class: "size-8 text-error"
				}, null, _parent));
				_push(`<p class="text-sm text-muted"> No se pudo cargar la configuración de la sucursal. </p>`);
				_push(ssrRenderComponent(_component_UButton, {
					label: "Reintentar",
					color: "neutral",
					variant: "outline",
					onClick: ($event) => refreshSettings()
				}, null, _parent));
				_push(`</div>`);
			} else if (!__props.branchId) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center gap-3 py-16" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-building",
					class: "size-8 text-muted"
				}, null, _parent));
				_push(`<p class="text-sm text-muted"> Selecciona una sucursal para ver su configuración. </p></div>`);
			} else _push(ssrRenderComponent(_component_UForm, mergeProps({
				id: "branch-settings-form",
				schema: unref(schema),
				state: unref(state),
				class: "space-y-6",
				onSubmit
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (__props.tabbed) _push(ssrRenderComponent(_component_UTabs, {
							modelValue: unref(tab),
							"onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
							content: false,
							items: [{
								label: "Vale y puntos",
								value: "branch"
							}, {
								label: "Seguros",
								value: "insurance"
							}]
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						if (!__props.tabbed || unref(tab) === "branch") {
							_push(`<div class="space-y-6"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UPageCard, {
								title: "Vales y puntos",
								description: "Reglas de vales y valor del punto para esta sucursal."
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="grid grid-cols-2 gap-6"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Días de vencimiento del vale",
											name: "voucher_expiration_days"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).voucher_expiration_days,
													"onUpdate:modelValue": ($event) => unref(state).voucher_expiration_days = $event,
													type: "number",
													min: "1",
													step: "1",
													placeholder: "Sin vencimiento",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).voucher_expiration_days,
													"onUpdate:modelValue": ($event) => unref(state).voucher_expiration_days = $event,
													type: "number",
													min: "1",
													step: "1",
													placeholder: "Sin vencimiento",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Escalón de monto del vale",
											name: "voucher_amount_step"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_USelect, {
													modelValue: unref(state).voucher_amount_step,
													"onUpdate:modelValue": ($event) => unref(state).voucher_amount_step = $event,
													items: [{
														label: "$100",
														value: 100
													}, {
														label: "$500",
														value: 500
													}],
													placeholder: "Seleccionar..."
												}, null, _parent, _scopeId));
												else return [createVNode(_component_USelect, {
													modelValue: unref(state).voucher_amount_step,
													"onUpdate:modelValue": ($event) => unref(state).voucher_amount_step = $event,
													items: [{
														label: "$100",
														value: 100
													}, {
														label: "$500",
														value: 500
													}],
													placeholder: "Seleccionar..."
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Máximo de pre-vale (% de la línea)",
											name: "pre_vale_max_percentage"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).pre_vale_max_percentage,
													"onUpdate:modelValue": ($event) => unref(state).pre_vale_max_percentage = $event,
													type: "number",
													min: "0",
													max: "100",
													step: "0.01",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).pre_vale_max_percentage,
													"onUpdate:modelValue": ($event) => unref(state).pre_vale_max_percentage = $event,
													type: "number",
													min: "0",
													max: "100",
													step: "0.01",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Tolerancia de pre-vale (MXN)",
											name: "pre_vale_tolerance_amount"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).pre_vale_tolerance_amount,
													"onUpdate:modelValue": ($event) => unref(state).pre_vale_tolerance_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).pre_vale_tolerance_amount,
													"onUpdate:modelValue": ($event) => unref(state).pre_vale_tolerance_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Valor del punto (MXN)",
											name: "point_value_mxn"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).point_value_mxn,
													"onUpdate:modelValue": ($event) => unref(state).point_value_mxn = $event,
													type: "number",
													min: "0",
													step: "0.01",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).point_value_mxn,
													"onUpdate:modelValue": ($event) => unref(state).point_value_mxn = $event,
													type: "number",
													min: "0",
													step: "0.01",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div>`);
									} else return [createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
										createVNode(_component_UFormField, {
											label: "Días de vencimiento del vale",
											name: "voucher_expiration_days"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).voucher_expiration_days,
												"onUpdate:modelValue": ($event) => unref(state).voucher_expiration_days = $event,
												type: "number",
												min: "1",
												step: "1",
												placeholder: "Sin vencimiento",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Escalón de monto del vale",
											name: "voucher_amount_step"
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(state).voucher_amount_step,
												"onUpdate:modelValue": ($event) => unref(state).voucher_amount_step = $event,
												items: [{
													label: "$100",
													value: 100
												}, {
													label: "$500",
													value: 500
												}],
												placeholder: "Seleccionar..."
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											required: "",
											label: "Máximo de pre-vale (% de la línea)",
											name: "pre_vale_max_percentage"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).pre_vale_max_percentage,
												"onUpdate:modelValue": ($event) => unref(state).pre_vale_max_percentage = $event,
												type: "number",
												min: "0",
												max: "100",
												step: "0.01",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											required: "",
											label: "Tolerancia de pre-vale (MXN)",
											name: "pre_vale_tolerance_amount"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).pre_vale_tolerance_amount,
												"onUpdate:modelValue": ($event) => unref(state).pre_vale_tolerance_amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											required: "",
											label: "Valor del punto (MXN)",
											name: "point_value_mxn"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).point_value_mxn,
												"onUpdate:modelValue": ($event) => unref(state).point_value_mxn = $event,
												type: "number",
												min: "0",
												step: "0.01",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_UPageCard, {
								title: "Comisión, interés y recargo por defecto",
								description: "Se usan al crear un vale nuevo en esta sucursal cuando no se especifica un valor manual."
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="grid grid-cols-3 gap-6"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Comisión de apertura (%)",
											name: "opening_commission_percentage"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).opening_commission_percentage,
													"onUpdate:modelValue": ($event) => unref(state).opening_commission_percentage = $event,
													type: "number",
													min: "0",
													max: "100",
													step: "0.0001",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).opening_commission_percentage,
													"onUpdate:modelValue": ($event) => unref(state).opening_commission_percentage = $event,
													type: "number",
													min: "0",
													max: "100",
													step: "0.0001",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Interés quincenal (%)",
											name: "biweekly_interest_percentage"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).biweekly_interest_percentage,
													"onUpdate:modelValue": ($event) => unref(state).biweekly_interest_percentage = $event,
													type: "number",
													min: "0",
													max: "100",
													step: "0.0001",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).biweekly_interest_percentage,
													"onUpdate:modelValue": ($event) => unref(state).biweekly_interest_percentage = $event,
													type: "number",
													min: "0",
													max: "100",
													step: "0.0001",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Recargo por atraso (MXN)",
											name: "late_payment_penalty_amount"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).late_payment_penalty_amount,
													"onUpdate:modelValue": ($event) => unref(state).late_payment_penalty_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).late_payment_penalty_amount,
													"onUpdate:modelValue": ($event) => unref(state).late_payment_penalty_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div>`);
									} else return [createVNode("div", { class: "grid grid-cols-3 gap-6" }, [
										createVNode(_component_UFormField, {
											required: "",
											label: "Comisión de apertura (%)",
											name: "opening_commission_percentage"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).opening_commission_percentage,
												"onUpdate:modelValue": ($event) => unref(state).opening_commission_percentage = $event,
												type: "number",
												min: "0",
												max: "100",
												step: "0.0001",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											required: "",
											label: "Interés quincenal (%)",
											name: "biweekly_interest_percentage"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).biweekly_interest_percentage,
												"onUpdate:modelValue": ($event) => unref(state).biweekly_interest_percentage = $event,
												type: "number",
												min: "0",
												max: "100",
												step: "0.0001",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											required: "",
											label: "Recargo por atraso (MXN)",
											name: "late_payment_penalty_amount"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).late_payment_penalty_amount,
												"onUpdate:modelValue": ($event) => unref(state).late_payment_penalty_amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						if (!__props.tabbed || unref(tab) === "insurance") {
							_push(`<div class="space-y-4"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UPageCard, {
								title: "Tarifas de seguro",
								description: "El seguro se cobra dentro del vale y se resuelve según el monto. Cada producto puede sobrescribirlo."
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted"${_scopeId}><span${_scopeId}>Monto mínimo</span><span${_scopeId}>Monto máximo</span><span${_scopeId}>Seguro</span><span${_scopeId}></span></div><!--[-->`);
										ssrRenderList(unref(state).insurance_rates, (tier) => {
											_push(`<div class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UInput, {
												modelValue: tier.min_amount,
												"onUpdate:modelValue": ($event) => tier.min_amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												placeholder: "0.00"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UInput, {
												modelValue: tier.max_amount,
												"onUpdate:modelValue": ($event) => tier.max_amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												placeholder: "9999.99"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UInput, {
												modelValue: tier.insurance_amount,
												"onUpdate:modelValue": ($event) => tier.insurance_amount = $event,
												type: "number",
												min: "0",
												step: "0.01",
												placeholder: "100.00"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-trash-2",
												color: "error",
												variant: "ghost",
												"aria-label": "Eliminar tramo",
												onClick: ($event) => removeTier(tier._id)
											}, null, _parent, _scopeId));
											_push(`</div>`);
										});
										_push(`<!--]-->`);
										_push(ssrRenderComponent(_component_UButton, {
											label: "Agregar tramo",
											icon: "i-lucide-plus",
											color: "neutral",
											variant: "outline",
											size: "sm",
											onClick: addTier
										}, null, _parent, _scopeId));
										_push(`<div class="flex items-center gap-3 pt-1"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(insurancePreviewInput),
											"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
											type: "number",
											min: "0",
											step: "0.01",
											placeholder: "Monto del vale para probar",
											class: "w-56"
										}, null, _parent, _scopeId));
										_push(`<span class="text-sm text-muted"${_scopeId}> Seguro aplicable: <span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(insurancePreview) !== null ? `$${unref(insurancePreview).toFixed(2)}` : "—")}</span></span></div></div>`);
									} else return [createVNode("div", { class: "space-y-4" }, [
										createVNode("div", { class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted" }, [
											createVNode("span", null, "Monto mínimo"),
											createVNode("span", null, "Monto máximo"),
											createVNode("span", null, "Seguro"),
											createVNode("span")
										]),
										(openBlock(true), createBlock(Fragment, null, renderList(unref(state).insurance_rates, (tier) => {
											return openBlock(), createBlock("div", {
												key: tier._id,
												class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3"
											}, [
												createVNode(_component_UInput, {
													modelValue: tier.min_amount,
													"onUpdate:modelValue": ($event) => tier.min_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													placeholder: "0.00"
												}, null, 8, ["modelValue", "onUpdate:modelValue"]),
												createVNode(_component_UInput, {
													modelValue: tier.max_amount,
													"onUpdate:modelValue": ($event) => tier.max_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													placeholder: "9999.99"
												}, null, 8, ["modelValue", "onUpdate:modelValue"]),
												createVNode(_component_UInput, {
													modelValue: tier.insurance_amount,
													"onUpdate:modelValue": ($event) => tier.insurance_amount = $event,
													type: "number",
													min: "0",
													step: "0.01",
													placeholder: "100.00"
												}, null, 8, ["modelValue", "onUpdate:modelValue"]),
												createVNode(_component_UButton, {
													icon: "i-lucide-trash-2",
													color: "error",
													variant: "ghost",
													"aria-label": "Eliminar tramo",
													onClick: ($event) => removeTier(tier._id)
												}, null, 8, ["onClick"])
											]);
										}), 128)),
										createVNode(_component_UButton, {
											label: "Agregar tramo",
											icon: "i-lucide-plus",
											color: "neutral",
											variant: "outline",
											size: "sm",
											onClick: addTier
										}),
										createVNode("div", { class: "flex items-center gap-3 pt-1" }, [createVNode(_component_UInput, {
											modelValue: unref(insurancePreviewInput),
											"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
											type: "number",
											min: "0",
											step: "0.01",
											placeholder: "Monto del vale para probar",
											class: "w-56"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "text-sm text-muted" }, [createTextVNode(" Seguro aplicable: "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(insurancePreview) !== null ? `$${unref(insurancePreview).toFixed(2)}` : "—"), 1)])])
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(ssrRenderComponent(_component_UButton, {
							form: "branch-settings-form",
							label: "Guardar configuración",
							color: "primary",
							type: "submit",
							loading: unref(saving),
							class: "w-fit"
						}, null, _parent, _scopeId));
					} else return [
						__props.tabbed ? (openBlock(), createBlock(_component_UTabs, {
							key: 0,
							modelValue: unref(tab),
							"onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
							content: false,
							items: [{
								label: "Vale y puntos",
								value: "branch"
							}, {
								label: "Seguros",
								value: "insurance"
							}]
						}, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
						!__props.tabbed || unref(tab) === "branch" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "space-y-6"
						}, [createVNode(_component_UPageCard, {
							title: "Vales y puntos",
							description: "Reglas de vales y valor del punto para esta sucursal."
						}, {
							default: withCtx(() => [createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
								createVNode(_component_UFormField, {
									label: "Días de vencimiento del vale",
									name: "voucher_expiration_days"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).voucher_expiration_days,
										"onUpdate:modelValue": ($event) => unref(state).voucher_expiration_days = $event,
										type: "number",
										min: "1",
										step: "1",
										placeholder: "Sin vencimiento",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Escalón de monto del vale",
									name: "voucher_amount_step"
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(state).voucher_amount_step,
										"onUpdate:modelValue": ($event) => unref(state).voucher_amount_step = $event,
										items: [{
											label: "$100",
											value: 100
										}, {
											label: "$500",
											value: 500
										}],
										placeholder: "Seleccionar..."
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									required: "",
									label: "Máximo de pre-vale (% de la línea)",
									name: "pre_vale_max_percentage"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).pre_vale_max_percentage,
										"onUpdate:modelValue": ($event) => unref(state).pre_vale_max_percentage = $event,
										type: "number",
										min: "0",
										max: "100",
										step: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									required: "",
									label: "Tolerancia de pre-vale (MXN)",
									name: "pre_vale_tolerance_amount"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).pre_vale_tolerance_amount,
										"onUpdate:modelValue": ($event) => unref(state).pre_vale_tolerance_amount = $event,
										type: "number",
										min: "0",
										step: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									required: "",
									label: "Valor del punto (MXN)",
									name: "point_value_mxn"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).point_value_mxn,
										"onUpdate:modelValue": ($event) => unref(state).point_value_mxn = $event,
										type: "number",
										min: "0",
										step: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})
							])]),
							_: 1
						}), createVNode(_component_UPageCard, {
							title: "Comisión, interés y recargo por defecto",
							description: "Se usan al crear un vale nuevo en esta sucursal cuando no se especifica un valor manual."
						}, {
							default: withCtx(() => [createVNode("div", { class: "grid grid-cols-3 gap-6" }, [
								createVNode(_component_UFormField, {
									required: "",
									label: "Comisión de apertura (%)",
									name: "opening_commission_percentage"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).opening_commission_percentage,
										"onUpdate:modelValue": ($event) => unref(state).opening_commission_percentage = $event,
										type: "number",
										min: "0",
										max: "100",
										step: "0.0001",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									required: "",
									label: "Interés quincenal (%)",
									name: "biweekly_interest_percentage"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).biweekly_interest_percentage,
										"onUpdate:modelValue": ($event) => unref(state).biweekly_interest_percentage = $event,
										type: "number",
										min: "0",
										max: "100",
										step: "0.0001",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									required: "",
									label: "Recargo por atraso (MXN)",
									name: "late_payment_penalty_amount"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).late_payment_penalty_amount,
										"onUpdate:modelValue": ($event) => unref(state).late_payment_penalty_amount = $event,
										type: "number",
										min: "0",
										step: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})
							])]),
							_: 1
						})])) : createCommentVNode("", true),
						!__props.tabbed || unref(tab) === "insurance" ? (openBlock(), createBlock("div", {
							key: 2,
							class: "space-y-4"
						}, [createVNode(_component_UPageCard, {
							title: "Tarifas de seguro",
							description: "El seguro se cobra dentro del vale y se resuelve según el monto. Cada producto puede sobrescribirlo."
						}, {
							default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
								createVNode("div", { class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted" }, [
									createVNode("span", null, "Monto mínimo"),
									createVNode("span", null, "Monto máximo"),
									createVNode("span", null, "Seguro"),
									createVNode("span")
								]),
								(openBlock(true), createBlock(Fragment, null, renderList(unref(state).insurance_rates, (tier) => {
									return openBlock(), createBlock("div", {
										key: tier._id,
										class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3"
									}, [
										createVNode(_component_UInput, {
											modelValue: tier.min_amount,
											"onUpdate:modelValue": ($event) => tier.min_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											placeholder: "0.00"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode(_component_UInput, {
											modelValue: tier.max_amount,
											"onUpdate:modelValue": ($event) => tier.max_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											placeholder: "9999.99"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode(_component_UInput, {
											modelValue: tier.insurance_amount,
											"onUpdate:modelValue": ($event) => tier.insurance_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											placeholder: "100.00"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]),
										createVNode(_component_UButton, {
											icon: "i-lucide-trash-2",
											color: "error",
											variant: "ghost",
											"aria-label": "Eliminar tramo",
											onClick: ($event) => removeTier(tier._id)
										}, null, 8, ["onClick"])
									]);
								}), 128)),
								createVNode(_component_UButton, {
									label: "Agregar tramo",
									icon: "i-lucide-plus",
									color: "neutral",
									variant: "outline",
									size: "sm",
									onClick: addTier
								}),
								createVNode("div", { class: "flex items-center gap-3 pt-1" }, [createVNode(_component_UInput, {
									modelValue: unref(insurancePreviewInput),
									"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
									type: "number",
									min: "0",
									step: "0.01",
									placeholder: "Monto del vale para probar",
									class: "w-56"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "text-sm text-muted" }, [createTextVNode(" Seguro aplicable: "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(insurancePreview) !== null ? `$${unref(insurancePreview).toFixed(2)}` : "—"), 1)])])
							])]),
							_: 1
						})])) : createCommentVNode("", true),
						createVNode(_component_UButton, {
							form: "branch-settings-form",
							label: "Guardar configuración",
							color: "primary",
							type: "submit",
							loading: unref(saving),
							class: "w-fit"
						}, null, 8, ["loading"])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/settings/BranchSettingsForm.vue
var _sfc_setup$1 = BranchSettingsForm_vue_vue_type_script_setup_true_lang_default.setup;
BranchSettingsForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/BranchSettingsForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var BranchSettingsForm_default = Object.assign(BranchSettingsForm_vue_vue_type_script_setup_true_lang_default, { __name: "SettingsBranchSettingsForm" });
//#endregion
//#region app/components/settings/GlobalPointSettingsForm.vue?vue&type=script&setup=true&lang.ts
var GlobalPointSettingsForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GlobalPointSettingsForm",
	__ssrInlineRender: true,
	emits: ["saved"],
	async setup(__props, { expose: __expose, emit: __emit }) {
		let __temp, __restore;
		const emit = __emit;
		const { getPointSettings, updatePointSettings } = useSettings();
		const toast = useToast();
		const schema = z.object({
			point_divisor_factor: z.coerce.number().int().min(1, "Mínimo 1"),
			point_multiplier: z.coerce.number().int().min(1, "Mínimo 1"),
			late_penalty_percentage: z.string().min(1, "Requerido").refine((v) => Number(v) >= 0 && Number(v) <= 100, "Entre 0 y 100")
		});
		const state = reactive({
			point_divisor_factor: void 0,
			point_multiplier: void 0,
			late_penalty_percentage: ""
		});
		const { status: loadStatus, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("global-point-settings-form", async () => {
			const settings = await getPointSettings();
			state.point_divisor_factor = settings.point_divisor_factor;
			state.point_multiplier = settings.point_multiplier;
			state.late_penalty_percentage = settings.late_penalty_percentage ?? "";
		}, { default: () => void 0 })), __temp = await __temp, __restore(), __temp);
		const saving = ref(false);
		async function onSubmit(event) {
			saving.value = true;
			try {
				await updatePointSettings({
					point_divisor_factor: event.data.point_divisor_factor,
					point_multiplier: event.data.point_multiplier,
					late_penalty_percentage: event.data.late_penalty_percentage
				});
				toast.add({
					title: "Puntos actualizados",
					description: "La configuración global de puntos fue actualizada.",
					color: "success"
				});
				emit("saved");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron guardar los puntos.",
					color: "error"
				});
			} finally {
				saving.value = false;
			}
		}
		__expose({ refresh });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2;
			const _component_UForm = _sfc_main$1;
			const _component_UPageCard = _sfc_main$4;
			const _component_UFormField = _sfc_main$5;
			const _component_UInput = _sfc_main$6;
			const _component_UButton = _sfc_main;
			if (unref(loadStatus) === "pending") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center py-12" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-loader-circle",
					class: "size-8 animate-spin text-muted"
				}, null, _parent));
				_push(`</div>`);
			} else _push(ssrRenderComponent(_component_UForm, mergeProps({
				id: "global-point-settings-form",
				schema: unref(schema),
				state: unref(state),
				class: "space-y-6",
				onSubmit
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UPageCard, {
							title: "Puntos (global)",
							description: "Cálculo de puntos para todas las sucursales: productos otorgados ÷ divisor × multiplicador."
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="grid grid-cols-3 gap-6"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UFormField, {
										required: "",
										label: "Divisor de puntos (1200)",
										name: "point_divisor_factor"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).point_divisor_factor,
												"onUpdate:modelValue": ($event) => unref(state).point_divisor_factor = $event,
												type: "number",
												min: "1",
												step: "1",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).point_divisor_factor,
												"onUpdate:modelValue": ($event) => unref(state).point_divisor_factor = $event,
												type: "number",
												min: "1",
												step: "1",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										required: "",
										label: "Multiplicador de puntos",
										name: "point_multiplier"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).point_multiplier,
												"onUpdate:modelValue": ($event) => unref(state).point_multiplier = $event,
												type: "number",
												min: "1",
												step: "1",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).point_multiplier,
												"onUpdate:modelValue": ($event) => unref(state).point_multiplier = $event,
												type: "number",
												min: "1",
												step: "1",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										required: "",
										label: "Penalización por pago atrasado (%)",
										name: "late_penalty_percentage"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).late_penalty_percentage,
												"onUpdate:modelValue": ($event) => unref(state).late_penalty_percentage = $event,
												type: "number",
												min: "0",
												max: "100",
												step: "0.01",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).late_penalty_percentage,
												"onUpdate:modelValue": ($event) => unref(state).late_penalty_percentage = $event,
												type: "number",
												min: "0",
												max: "100",
												step: "0.01",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "grid grid-cols-3 gap-6" }, [
									createVNode(_component_UFormField, {
										required: "",
										label: "Divisor de puntos (1200)",
										name: "point_divisor_factor"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).point_divisor_factor,
											"onUpdate:modelValue": ($event) => unref(state).point_divisor_factor = $event,
											type: "number",
											min: "1",
											step: "1",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Multiplicador de puntos",
										name: "point_multiplier"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).point_multiplier,
											"onUpdate:modelValue": ($event) => unref(state).point_multiplier = $event,
											type: "number",
											min: "1",
											step: "1",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Penalización por pago atrasado (%)",
										name: "late_penalty_percentage"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).late_penalty_percentage,
											"onUpdate:modelValue": ($event) => unref(state).late_penalty_percentage = $event,
											type: "number",
											min: "0",
											max: "100",
											step: "0.01",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							form: "global-point-settings-form",
							label: "Guardar puntos",
							color: "primary",
							type: "submit",
							loading: unref(saving),
							class: "w-fit"
						}, null, _parent, _scopeId));
					} else return [createVNode(_component_UPageCard, {
						title: "Puntos (global)",
						description: "Cálculo de puntos para todas las sucursales: productos otorgados ÷ divisor × multiplicador."
					}, {
						default: withCtx(() => [createVNode("div", { class: "grid grid-cols-3 gap-6" }, [
							createVNode(_component_UFormField, {
								required: "",
								label: "Divisor de puntos (1200)",
								name: "point_divisor_factor"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).point_divisor_factor,
									"onUpdate:modelValue": ($event) => unref(state).point_divisor_factor = $event,
									type: "number",
									min: "1",
									step: "1",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								required: "",
								label: "Multiplicador de puntos",
								name: "point_multiplier"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).point_multiplier,
									"onUpdate:modelValue": ($event) => unref(state).point_multiplier = $event,
									type: "number",
									min: "1",
									step: "1",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								required: "",
								label: "Penalización por pago atrasado (%)",
								name: "late_penalty_percentage"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).late_penalty_percentage,
									"onUpdate:modelValue": ($event) => unref(state).late_penalty_percentage = $event,
									type: "number",
									min: "0",
									max: "100",
									step: "0.01",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})
						])]),
						_: 1
					}), createVNode(_component_UButton, {
						form: "global-point-settings-form",
						label: "Guardar puntos",
						color: "primary",
						type: "submit",
						loading: unref(saving),
						class: "w-fit"
					}, null, 8, ["loading"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/settings/GlobalPointSettingsForm.vue
var _sfc_setup = GlobalPointSettingsForm_vue_vue_type_script_setup_true_lang_default.setup;
GlobalPointSettingsForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/GlobalPointSettingsForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var GlobalPointSettingsForm_default = Object.assign(GlobalPointSettingsForm_vue_vue_type_script_setup_true_lang_default, { __name: "SettingsGlobalPointSettingsForm" });

export { BranchSettingsForm_default as B, GlobalPointSettingsForm_default as G };
//# sourceMappingURL=GlobalPointSettingsForm-CHJZr262.mjs.map
