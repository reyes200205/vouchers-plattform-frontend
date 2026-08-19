import { aM as useToast, aj as useAuth, ai as useAsyncData, g as _sfc_main$2$1, h as _sfc_main$7, an as useComponentProps, ah as useAppConfig, ae as tv, b as Primitive, S as Slot } from '../virtual/entry.mjs';
import { _ as _sfc_main$6 } from './Select-QzRNfVS-.mjs';
import { _ as _sfc_main$5 } from './FormField-DOShaxcI.mjs';
import { _ as _sfc_main$4 } from './Input-3L6phQUN.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$8 } from './DashboardSidebarCollapse-CLHbm061.mjs';
import { _ as _sfc_main$1 } from './Form-DpngGyYw.mjs';
import { u as useBranches } from './useBranches-CPhggLZ3.mjs';
import { u as useSettings } from './useSettings-CCTMa9PO.mjs';
import { _ as _sfc_main$3 } from './PageCard-Cxx6o4Hh.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, reactive, withCtx, unref, isRef, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, createSlots, useSlots, shallowRef, mergeProps, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
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
import './PopperArrow-Cwqi64q5.mjs';
import './useTypeahead-5rnQiHGw.mjs';
import './useFormControl-BySKHRcT.mjs';
import './DashboardSidebarToggle-IFhAhKZv.mjs';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpage.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_default = {
	"slots": {
		"root": "flex flex-col lg:grid lg:grid-cols-10 lg:gap-10",
		"left": "lg:col-span-2",
		"center": "lg:col-span-8",
		"right": "lg:col-span-2 order-first lg:order-last"
	},
	"variants": {
		"left": { "true": "" },
		"right": { "true": "" }
	},
	"compoundVariants": [{
		"left": true,
		"right": true,
		"class": { "center": "lg:col-span-6" }
	}, {
		"left": false,
		"right": false,
		"class": { "center": "lg:col-span-10" }
	}]
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Page.vue
var _sfc_main = {
	__name: "UPage",
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
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("page", _props);
		const appConfig = useAppConfig();
		const hasLeft = shallowRef(!!slots.left);
		const hasRight = shallowRef(!!slots.right);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_default,
			...appConfig.ui?.page || {}
		})({
			left: hasLeft.value,
			right: hasRight.value
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.left) _push(ssrRenderComponent(unref(Slot), {
							"data-slot": "left",
							class: ui.value.left({ class: unref(props).ui?.left })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "left")];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`<div data-slot="center" class="${ssrRenderClass(ui.value.center({ class: unref(props).ui?.center }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						_push(`</div>`);
						if (!!slots.right) _push(ssrRenderComponent(unref(Slot), {
							"data-slot": "right",
							class: ui.value.right({ class: unref(props).ui?.right })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "right")];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						!!slots.left ? (openBlock(), createBlock(unref(Slot), {
							key: 0,
							"data-slot": "left",
							class: ui.value.left({ class: unref(props).ui?.left })
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "left")]),
							_: 3
						}, 8, ["class"])) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "center",
							class: ui.value.center({ class: unref(props).ui?.center })
						}, [renderSlot(_ctx.$slots, "default")], 2),
						!!slots.right ? (openBlock(), createBlock(unref(Slot), {
							key: 1,
							"data-slot": "right",
							class: ui.value.right({ class: unref(props).ui?.right })
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "right")]),
							_: 3
						}, 8, ["class"])) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/general/settings/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const toast = useToast();
		const { user } = useAuth();
		const { getBranchSettings, updateBranchSettings, getPointSettings, updatePointSettings } = useSettings();
		const { listBranches } = useBranches();
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const isGeneralManager = computed(() => user.value?.permissions?.includes("point-settings.manage") ?? false);
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("settings-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const selectedBranchId = ref(branchManagerBranchId.value ?? branches.value[0]?.id ?? void 0);
		watch([branchManagerBranchId, branches], () => {
			if (!selectedBranchId.value && branchManagerBranchId.value) selectedBranchId.value = branchManagerBranchId.value;
			if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) selectedBranchId.value = branches.value[0].id;
		}, { immediate: true });
		const tiersSchema = z.array(z.object({
			min_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
			max_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) > 0, "Monto inválido"),
			insurance_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido")
		})).superRefine((tiers, ctx) => {
			const sorted = [...tiers].map((t) => Number(t.min_amount)).sort((a, b) => a - b);
			new Set(sorted.map(String));
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
		});
		const formSchema = z.object({
			payment_due_days: z.coerce.number().int().min(1, "Mínimo 1 día").optional(),
			voucher_amount_step: z.coerce.number().int().refine((v) => v === 100 || v === 500, "Solo 100 o 500").optional(),
			pre_vale_max_percentage: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0 && Number(v) <= 100, "Entre 0 y 100"),
			pre_vale_tolerance_amount: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
			point_value_mxn: z.coerce.string().min(1, "Requerido").refine((v) => Number(v) >= 0, "Monto inválido"),
			insurance_rates: tiersSchema.optional()
		});
		const state = reactive({
			payment_due_days: void 0,
			voucher_amount_step: void 0,
			pre_vale_max_percentage: "",
			pre_vale_tolerance_amount: "",
			point_value_mxn: "",
			insurance_rates: void 0
		});
		let tierIdCounter = 0;
		const insurancePreviewInput = ref("");
		const insurancePreview = computed(() => {
			const amount = Number(insurancePreviewInput.value);
			if (!amount || !state.insurance_rates?.length) return null;
			const tier = state.insurance_rates.find((t) => {
				const min = Number(t.min_amount);
				const max = Number(t.max_amount);
				return amount >= min && amount < max;
			});
			return tier ? Number(tier.insurance_amount) : 0;
		});
		async function loadSettings(branchId) {
			const settings = await getBranchSettings(branchId);
			state.payment_due_days = settings.payment_due_days ?? void 0;
			state.voucher_amount_step = settings.voucher_amount_step ?? void 0;
			state.pre_vale_max_percentage = settings.pre_vale_max_percentage ?? "";
			state.pre_vale_tolerance_amount = settings.pre_vale_tolerance_amount ?? "";
			state.point_value_mxn = settings.point_value_mxn ?? "";
			state.insurance_rates = (settings.insurance_rates ?? []).map((tier) => ({
				min_amount: String(tier.min_amount),
				max_amount: String(tier.max_amount),
				insurance_amount: String(tier.insurance_amount),
				_id: tierIdCounter++
			}));
		}
		ref("idle");
		const { refresh: refreshSettings, status: settingsLoad } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branch-settings", () => selectedBranchId.value ? loadSettings(selectedBranchId.value) : Promise.resolve(), {
			watch: [selectedBranchId],
			default: () => void 0
		})), __temp = await __temp, __restore(), __temp);
		async function saveSettings(event) {
			if (!selectedBranchId.value) return;
			try {
				await updateBranchSettings(selectedBranchId.value, {
					payment_due_days: event.data.payment_due_days,
					voucher_amount_step: event.data.voucher_amount_step,
					pre_vale_max_percentage: event.data.pre_vale_max_percentage,
					pre_vale_tolerance_amount: event.data.pre_vale_tolerance_amount,
					point_value_mxn: event.data.point_value_mxn,
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
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo guardar la configuración.",
					color: "error"
				});
			}
		}
		const pointSchema = z.object({
			point_divisor_factor: z.coerce.number().int().min(1, "Mínimo 1"),
			point_multiplier: z.coerce.number().int().min(1, "Mínimo 1"),
			late_penalty_percentage: z.string().min(1, "Requerido").refine((v) => Number(v) >= 0 && Number(v) <= 100, "Entre 0 y 100")
		});
		const pointState = reactive({
			point_divisor_factor: void 0,
			point_multiplier: void 0,
			late_penalty_percentage: ""
		});
		const { refresh: refreshPoints } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("point-settings", async () => {
			if (!isGeneralManager.value) return;
			const settings = await getPointSettings();
			pointState.point_divisor_factor = settings.point_divisor_factor;
			pointState.point_multiplier = settings.point_multiplier;
			pointState.late_penalty_percentage = settings.late_penalty_percentage ?? "";
		}, { default: () => void 0 })), __temp = await __temp, __restore(), __temp);
		async function savePoints(event) {
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
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron guardar los puntos.",
					color: "error"
				});
			}
		}
		function addTier() {
			if (!state.insurance_rates) state.insurance_rates = [];
			state.insurance_rates.push({
				min_amount: "",
				max_amount: "",
				insurance_amount: "",
				_id: tierIdCounter++
			});
		}
		function removeTier(id) {
			state.insurance_rates = (state.insurance_rates ?? []).filter((t) => t._id !== id);
		}
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPage = _sfc_main;
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_USelect = _sfc_main$6;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UForm = _sfc_main$1;
			const _component_UPageCard = _sfc_main$3;
			const _component_UInput = _sfc_main$4;
			const _component_UButton = _sfc_main$7;
			const _component_UFormField = _sfc_main$5;
			_push(ssrRenderComponent(_component_UPage, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardPanel, null, {
						header: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Configuración" }, createSlots({
								leading: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
									else return [createVNode(_component_UDashboardSidebarCollapse)];
								}),
								_: 2
							}, [unref(isGeneralManager) ? {
								name: "right",
								fn: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_USelect, {
										modelValue: unref(selectedBranchId),
										"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
										items: unref(branches).map((b) => ({
											label: b.name,
											value: b.id
										})),
										placeholder: "Sucursal...",
										class: "w-64"
									}, null, _parent, _scopeId));
									else return [createVNode(_component_USelect, {
										modelValue: unref(selectedBranchId),
										"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
										items: unref(branches).map((b) => ({
											label: b.name,
											value: b.id
										})),
										placeholder: "Sucursal...",
										class: "w-64"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items"
									])];
								}),
								key: "0"
							} : void 0]), _parent, _scopeId));
							else return [createVNode(_component_UDashboardNavbar, { title: "Configuración" }, createSlots({
								leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
								_: 2
							}, [unref(isGeneralManager) ? {
								name: "right",
								fn: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(selectedBranchId),
									"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
									items: unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									})),
									placeholder: "Sucursal...",
									class: "w-64"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])]),
								key: "0"
							} : void 0]), 1024)];
						}),
						body: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex flex-col gap-6 p-6"${_scopeId}>`);
								if (unref(settingsLoad) === "pending") {
									_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-loader-circle",
										class: "size-8 animate-spin text-muted"
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else if (unref(selectedBranchId)) {
									_push(`<!--[-->`);
									_push(ssrRenderComponent(_component_UForm, {
										id: "branch-settings",
										schema: unref(formSchema),
										state: unref(state),
										class: "space-y-6",
										onSubmit: saveSettings
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(ssrRenderComponent(_component_UPageCard, {
													title: "Seguros",
													description: "El seguro se cobra dentro del vale y forma parte del pago de la distribuidora. Se resuelve automáticamente según el monto del vale; cada producto puede sobrescribirlo."
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<div class="space-y-3"${_scopeId}><div class="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted"${_scopeId}><span${_scopeId}>Monto mínimo</span><span${_scopeId}>Monto máximo</span><span${_scopeId}>Seguro</span><span${_scopeId}></span></div><!--[-->`);
															ssrRenderList(unref(state).insurance_rates ?? [], (tier, index) => {
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
															_push(`<div class="flex items-center gap-3 pt-2"${_scopeId}>`);
															_push(ssrRenderComponent(_component_UInput, {
																modelValue: unref(insurancePreviewInput),
																"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
																type: "number",
																min: "0",
																step: "0.01",
																placeholder: "Monto del vale para probar",
																class: "w-56"
															}, null, _parent, _scopeId));
															_push(`<span class="text-sm text-muted"${_scopeId}> Seguro aplicable: <span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(insurancePreview) !== null ? unref(money).format(unref(insurancePreview)) : "—")}</span></span></div></div>`);
														} else return [createVNode("div", { class: "space-y-3" }, [
															createVNode("div", { class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted" }, [
																createVNode("span", null, "Monto mínimo"),
																createVNode("span", null, "Monto máximo"),
																createVNode("span", null, "Seguro"),
																createVNode("span")
															]),
															(openBlock(true), createBlock(Fragment, null, renderList(unref(state).insurance_rates ?? [], (tier, index) => {
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
															createVNode("div", { class: "flex items-center gap-3 pt-2" }, [createVNode(_component_UInput, {
																modelValue: unref(insurancePreviewInput),
																"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
																type: "number",
																min: "0",
																step: "0.01",
																placeholder: "Monto del vale para probar",
																class: "w-56"
															}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "text-sm text-muted" }, [createTextVNode(" Seguro aplicable: "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(insurancePreview) !== null ? unref(money).format(unref(insurancePreview)) : "—"), 1)])])
														])];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UPageCard, {
													title: "Vales y puntos",
													description: "Reglas de vales y valor del punto para esta sucursal."
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<div class="grid grid-cols-2 gap-6"${_scopeId}>`);
															_push(ssrRenderComponent(_component_UFormField, {
																label: "Días para pagar (pago puntual)",
																name: "payment_due_days"
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(_component_UInput, {
																		modelValue: unref(state).payment_due_days,
																		"onUpdate:modelValue": ($event) => unref(state).payment_due_days = $event,
																		type: "number",
																		min: "1",
																		step: "1",
																		class: "w-full"
																	}, null, _parent, _scopeId));
																	else return [createVNode(_component_UInput, {
																		modelValue: unref(state).payment_due_days,
																		"onUpdate:modelValue": ($event) => unref(state).payment_due_days = $event,
																		type: "number",
																		min: "1",
																		step: "1",
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
																label: "Días para pagar (pago puntual)",
																name: "payment_due_days"
															}, {
																default: withCtx(() => [createVNode(_component_UInput, {
																	modelValue: unref(state).payment_due_days,
																	"onUpdate:modelValue": ($event) => unref(state).payment_due_days = $event,
																	type: "number",
																	min: "1",
																	step: "1",
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
												_push(ssrRenderComponent(_component_UButton, {
													form: "branch-settings",
													label: "Guardar configuración",
													color: "primary",
													type: "submit",
													class: "w-fit"
												}, null, _parent, _scopeId));
											} else return [
												createVNode(_component_UPageCard, {
													title: "Seguros",
													description: "El seguro se cobra dentro del vale y forma parte del pago de la distribuidora. Se resuelve automáticamente según el monto del vale; cada producto puede sobrescribirlo."
												}, {
													default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
														createVNode("div", { class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted" }, [
															createVNode("span", null, "Monto mínimo"),
															createVNode("span", null, "Monto máximo"),
															createVNode("span", null, "Seguro"),
															createVNode("span")
														]),
														(openBlock(true), createBlock(Fragment, null, renderList(unref(state).insurance_rates ?? [], (tier, index) => {
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
														createVNode("div", { class: "flex items-center gap-3 pt-2" }, [createVNode(_component_UInput, {
															modelValue: unref(insurancePreviewInput),
															"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
															type: "number",
															min: "0",
															step: "0.01",
															placeholder: "Monto del vale para probar",
															class: "w-56"
														}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "text-sm text-muted" }, [createTextVNode(" Seguro aplicable: "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(insurancePreview) !== null ? unref(money).format(unref(insurancePreview)) : "—"), 1)])])
													])]),
													_: 1
												}),
												createVNode(_component_UPageCard, {
													title: "Vales y puntos",
													description: "Reglas de vales y valor del punto para esta sucursal."
												}, {
													default: withCtx(() => [createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
														createVNode(_component_UFormField, {
															label: "Días para pagar (pago puntual)",
															name: "payment_due_days"
														}, {
															default: withCtx(() => [createVNode(_component_UInput, {
																modelValue: unref(state).payment_due_days,
																"onUpdate:modelValue": ($event) => unref(state).payment_due_days = $event,
																type: "number",
																min: "1",
																step: "1",
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
												}),
												createVNode(_component_UButton, {
													form: "branch-settings",
													label: "Guardar configuración",
													color: "primary",
													type: "submit",
													class: "w-fit"
												})
											];
										}),
										_: 1
									}, _parent, _scopeId));
									if (unref(isGeneralManager)) _push(ssrRenderComponent(_component_UForm, {
										id: "point-settings",
										schema: unref(pointSchema),
										state: unref(pointState),
										class: "space-y-6",
										onSubmit: savePoints
									}, {
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
																		modelValue: unref(pointState).point_divisor_factor,
																		"onUpdate:modelValue": ($event) => unref(pointState).point_divisor_factor = $event,
																		type: "number",
																		min: "1",
																		step: "1",
																		class: "w-full"
																	}, null, _parent, _scopeId));
																	else return [createVNode(_component_UInput, {
																		modelValue: unref(pointState).point_divisor_factor,
																		"onUpdate:modelValue": ($event) => unref(pointState).point_divisor_factor = $event,
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
																		modelValue: unref(pointState).point_multiplier,
																		"onUpdate:modelValue": ($event) => unref(pointState).point_multiplier = $event,
																		type: "number",
																		min: "1",
																		step: "1",
																		class: "w-full"
																	}, null, _parent, _scopeId));
																	else return [createVNode(_component_UInput, {
																		modelValue: unref(pointState).point_multiplier,
																		"onUpdate:modelValue": ($event) => unref(pointState).point_multiplier = $event,
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
																		modelValue: unref(pointState).late_penalty_percentage,
																		"onUpdate:modelValue": ($event) => unref(pointState).late_penalty_percentage = $event,
																		type: "number",
																		min: "0",
																		max: "100",
																		step: "0.01",
																		class: "w-full"
																	}, null, _parent, _scopeId));
																	else return [createVNode(_component_UInput, {
																		modelValue: unref(pointState).late_penalty_percentage,
																		"onUpdate:modelValue": ($event) => unref(pointState).late_penalty_percentage = $event,
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
																	modelValue: unref(pointState).point_divisor_factor,
																	"onUpdate:modelValue": ($event) => unref(pointState).point_divisor_factor = $event,
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
																	modelValue: unref(pointState).point_multiplier,
																	"onUpdate:modelValue": ($event) => unref(pointState).point_multiplier = $event,
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
																	modelValue: unref(pointState).late_penalty_percentage,
																	"onUpdate:modelValue": ($event) => unref(pointState).late_penalty_percentage = $event,
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
													form: "point-settings",
													label: "Guardar puntos",
													color: "primary",
													type: "submit",
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
															modelValue: unref(pointState).point_divisor_factor,
															"onUpdate:modelValue": ($event) => unref(pointState).point_divisor_factor = $event,
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
															modelValue: unref(pointState).point_multiplier,
															"onUpdate:modelValue": ($event) => unref(pointState).point_multiplier = $event,
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
															modelValue: unref(pointState).late_penalty_percentage,
															"onUpdate:modelValue": ($event) => unref(pointState).late_penalty_percentage = $event,
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
												form: "point-settings",
												label: "Guardar puntos",
												color: "primary",
												type: "submit",
												class: "w-fit"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`<!--]-->`);
								} else _push(`<!---->`);
								_push(`</div>`);
							} else return [createVNode("div", { class: "flex flex-col gap-6 p-6" }, [unref(settingsLoad) === "pending" ? (openBlock(), createBlock("div", {
								key: 0,
								class: "flex items-center justify-center py-16"
							}, [createVNode(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-8 animate-spin text-muted"
							})])) : unref(selectedBranchId) ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(_component_UForm, {
								id: "branch-settings",
								schema: unref(formSchema),
								state: unref(state),
								class: "space-y-6",
								onSubmit: saveSettings
							}, {
								default: withCtx(() => [
									createVNode(_component_UPageCard, {
										title: "Seguros",
										description: "El seguro se cobra dentro del vale y forma parte del pago de la distribuidora. Se resuelve automáticamente según el monto del vale; cada producto puede sobrescribirlo."
									}, {
										default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
											createVNode("div", { class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted" }, [
												createVNode("span", null, "Monto mínimo"),
												createVNode("span", null, "Monto máximo"),
												createVNode("span", null, "Seguro"),
												createVNode("span")
											]),
											(openBlock(true), createBlock(Fragment, null, renderList(unref(state).insurance_rates ?? [], (tier, index) => {
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
											createVNode("div", { class: "flex items-center gap-3 pt-2" }, [createVNode(_component_UInput, {
												modelValue: unref(insurancePreviewInput),
												"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
												type: "number",
												min: "0",
												step: "0.01",
												placeholder: "Monto del vale para probar",
												class: "w-56"
											}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "text-sm text-muted" }, [createTextVNode(" Seguro aplicable: "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(insurancePreview) !== null ? unref(money).format(unref(insurancePreview)) : "—"), 1)])])
										])]),
										_: 1
									}),
									createVNode(_component_UPageCard, {
										title: "Vales y puntos",
										description: "Reglas de vales y valor del punto para esta sucursal."
									}, {
										default: withCtx(() => [createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
											createVNode(_component_UFormField, {
												label: "Días para pagar (pago puntual)",
												name: "payment_due_days"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).payment_due_days,
													"onUpdate:modelValue": ($event) => unref(state).payment_due_days = $event,
													type: "number",
													min: "1",
													step: "1",
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
									}),
									createVNode(_component_UButton, {
										form: "branch-settings",
										label: "Guardar configuración",
										color: "primary",
										type: "submit",
										class: "w-fit"
									})
								]),
								_: 1
							}, 8, ["schema", "state"]), unref(isGeneralManager) ? (openBlock(), createBlock(_component_UForm, {
								key: 0,
								id: "point-settings",
								schema: unref(pointSchema),
								state: unref(pointState),
								class: "space-y-6",
								onSubmit: savePoints
							}, {
								default: withCtx(() => [createVNode(_component_UPageCard, {
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
												modelValue: unref(pointState).point_divisor_factor,
												"onUpdate:modelValue": ($event) => unref(pointState).point_divisor_factor = $event,
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
												modelValue: unref(pointState).point_multiplier,
												"onUpdate:modelValue": ($event) => unref(pointState).point_multiplier = $event,
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
												modelValue: unref(pointState).late_penalty_percentage,
												"onUpdate:modelValue": ($event) => unref(pointState).late_penalty_percentage = $event,
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
									form: "point-settings",
									label: "Guardar puntos",
									color: "primary",
									type: "submit",
									class: "w-fit"
								})]),
								_: 1
							}, 8, ["schema", "state"])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardPanel, null, {
						header: withCtx(() => [createVNode(_component_UDashboardNavbar, { title: "Configuración" }, createSlots({
							leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
							_: 2
						}, [unref(isGeneralManager) ? {
							name: "right",
							fn: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(selectedBranchId),
								"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
								items: unref(branches).map((b) => ({
									label: b.name,
									value: b.id
								})),
								placeholder: "Sucursal...",
								class: "w-64"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])]),
							key: "0"
						} : void 0]), 1024)]),
						body: withCtx(() => [createVNode("div", { class: "flex flex-col gap-6 p-6" }, [unref(settingsLoad) === "pending" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex items-center justify-center py-16"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-8 animate-spin text-muted"
						})])) : unref(selectedBranchId) ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(_component_UForm, {
							id: "branch-settings",
							schema: unref(formSchema),
							state: unref(state),
							class: "space-y-6",
							onSubmit: saveSettings
						}, {
							default: withCtx(() => [
								createVNode(_component_UPageCard, {
									title: "Seguros",
									description: "El seguro se cobra dentro del vale y forma parte del pago de la distribuidora. Se resuelve automáticamente según el monto del vale; cada producto puede sobrescribirlo."
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
										createVNode("div", { class: "grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 text-xs font-semibold uppercase text-muted" }, [
											createVNode("span", null, "Monto mínimo"),
											createVNode("span", null, "Monto máximo"),
											createVNode("span", null, "Seguro"),
											createVNode("span")
										]),
										(openBlock(true), createBlock(Fragment, null, renderList(unref(state).insurance_rates ?? [], (tier, index) => {
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
										createVNode("div", { class: "flex items-center gap-3 pt-2" }, [createVNode(_component_UInput, {
											modelValue: unref(insurancePreviewInput),
											"onUpdate:modelValue": ($event) => isRef(insurancePreviewInput) ? insurancePreviewInput.value = $event : null,
											type: "number",
											min: "0",
											step: "0.01",
											placeholder: "Monto del vale para probar",
											class: "w-56"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("span", { class: "text-sm text-muted" }, [createTextVNode(" Seguro aplicable: "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(insurancePreview) !== null ? unref(money).format(unref(insurancePreview)) : "—"), 1)])])
									])]),
									_: 1
								}),
								createVNode(_component_UPageCard, {
									title: "Vales y puntos",
									description: "Reglas de vales y valor del punto para esta sucursal."
								}, {
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
										createVNode(_component_UFormField, {
											label: "Días para pagar (pago puntual)",
											name: "payment_due_days"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).payment_due_days,
												"onUpdate:modelValue": ($event) => unref(state).payment_due_days = $event,
												type: "number",
												min: "1",
												step: "1",
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
								}),
								createVNode(_component_UButton, {
									form: "branch-settings",
									label: "Guardar configuración",
									color: "primary",
									type: "submit",
									class: "w-fit"
								})
							]),
							_: 1
						}, 8, ["schema", "state"]), unref(isGeneralManager) ? (openBlock(), createBlock(_component_UForm, {
							key: 0,
							id: "point-settings",
							schema: unref(pointSchema),
							state: unref(pointState),
							class: "space-y-6",
							onSubmit: savePoints
						}, {
							default: withCtx(() => [createVNode(_component_UPageCard, {
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
											modelValue: unref(pointState).point_divisor_factor,
											"onUpdate:modelValue": ($event) => unref(pointState).point_divisor_factor = $event,
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
											modelValue: unref(pointState).point_multiplier,
											"onUpdate:modelValue": ($event) => unref(pointState).point_multiplier = $event,
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
											modelValue: unref(pointState).late_penalty_percentage,
											"onUpdate:modelValue": ($event) => unref(pointState).late_penalty_percentage = $event,
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
								form: "point-settings",
								label: "Guardar puntos",
								color: "primary",
								type: "submit",
								class: "w-fit"
							})]),
							_: 1
						}, 8, ["schema", "state"])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/settings/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/settings/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var settings_default = index_vue_vue_type_script_setup_true_lang_default;

export { settings_default as default };
//# sourceMappingURL=settings-dxG6qP5F.mjs.map
