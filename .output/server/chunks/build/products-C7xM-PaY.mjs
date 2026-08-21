import { aP as useToast, al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main } from '../virtual/entry.mjs';
import { _ as _sfc_main$7 } from './Select-CHtpM6Dc.mjs';
import { _ as _sfc_main$4 } from './DropdownMenu-Blcsr3st.mjs';
import { _ as _sfc_main$c } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$5 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$a } from './Modal-BQ_M11w-.mjs';
import { _ as _sfc_main$3 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$8 } from './Input-YDRYCqsV.mjs';
import { u as useProducts } from './useProducts-R4lhVRnT.mjs';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './DashboardNavbar-BzzI9nrt.mjs';
import { _ as _sfc_main$9 } from './DashboardSidebarCollapse-CBDjl-2o.mjs';
import { _ as _sfc_main$b } from './Form-j1wdqi9R.mjs';
import { u as useBranches } from './useBranches-BECDq2r0.mjs';
import { u as useSettings } from './useSettings-D0a4-zZG.mjs';
import { u as useCategories } from './useCategories-S_nahDzB.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, withCtx, unref, createVNode, isRef, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useModel, reactive, resolveComponent, mergeProps, createTextVNode, mergeModels, useSSRContext } from 'vue';
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

//#region app/components/products/ProductModal.vue?vue&type=script&setup=true&lang.ts
var ProductModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		product: {},
		cloneTemplate: {},
		categories: {},
		branchId: {},
		insuranceTiers: {},
		pointValueMxn: {},
		defaultInterestPercentage: {},
		defaultLateFeeAmount: {},
		defaultCommissionPercentage: {}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["created", "updated"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useModel(__props, "open");
		const emit = __emit;
		const schema = z.object({
			code: z.string().max(30, "Muy largo").optional(),
			name: z.string().min(2, "Muy corto").max(150, "Muy largo"),
			description: z.string().max(255, "Muy largo").optional(),
			principal_amount: z.coerce.string().min(1, "Requerido").refine((value) => Number(value) > 0, "Monto inválido"),
			number_of_fortnights: z.number().int().min(1, "Mínimo 1 quincena"),
			category_id: z.any().optional().superRefine((value, ctx) => {
				if (!value || Number(value) < 1) ctx.addIssue({
					code: "custom",
					message: "Selecciona una categoría"
				});
			}),
			insurance_amount: z.coerce.string().optional(),
			company_commission_percentage: z.coerce.string().optional(),
			fortnightly_interest_percentage: z.coerce.string().optional(),
			late_fee_amount: z.coerce.string().optional(),
			is_active: z.boolean()
		});
		const { createProduct, updateProduct } = useProducts();
		const toast = useToast();
		const submitting = ref(false);
		const state = reactive({
			code: "",
			name: "",
			description: "",
			principal_amount: "",
			number_of_fortnights: void 0,
			category_id: void 0,
			insurance_amount: "",
			company_commission_percentage: "",
			fortnightly_interest_percentage: "",
			late_fee_amount: "",
			is_active: true
		});
		watch(open, () => {
			if (props.product) {
				state.code = props.product.code;
				state.name = props.product.name;
				state.description = props.product.description ?? "";
				state.principal_amount = String(Number(props.product.principal_amount));
				state.number_of_fortnights = props.product.number_of_fortnights;
				state.category_id = String(props.product.category_id ?? "");
				state.insurance_amount = String(Number(props.product.insurance_amount));
				state.company_commission_percentage = String(Number(props.product.company_commission_percentage));
				state.fortnightly_interest_percentage = String(Number(props.product.fortnightly_interest_percentage));
				state.late_fee_amount = String(Number(props.product.late_fee_amount));
				state.is_active = props.product.is_active;
			} else if (props.cloneTemplate) {
				state.code = "";
				state.name = props.cloneTemplate.name;
				state.description = props.cloneTemplate.description ?? "";
				state.principal_amount = String(Number(props.cloneTemplate.principal_amount));
				state.number_of_fortnights = props.cloneTemplate.number_of_fortnights;
				state.category_id = String(props.cloneTemplate.category_id ?? "");
				state.insurance_amount = String(Number(props.cloneTemplate.insurance_amount));
				state.company_commission_percentage = String(Number(props.cloneTemplate.company_commission_percentage));
				state.fortnightly_interest_percentage = String(Number(props.cloneTemplate.fortnightly_interest_percentage));
				state.late_fee_amount = String(Number(props.cloneTemplate.late_fee_amount));
				state.is_active = true;
			} else {
				state.code = "";
				state.name = "";
				state.description = "";
				state.principal_amount = "";
				state.number_of_fortnights = void 0;
				state.category_id = void 0;
				state.insurance_amount = "";
				state.company_commission_percentage = "";
				state.fortnightly_interest_percentage = "";
				state.late_fee_amount = "";
				state.is_active = true;
			}
		}, { immediate: true });
		const categoryItems = computed(() => props.categories.map((c) => ({
			label: c.name,
			value: c.id.toString()
		})));
		const selectedCategory = computed(() => {
			if (!state.category_id) return null;
			return props.categories.find((c) => c.id === Number(state.category_id)) ?? null;
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		const principal = computed(() => Number(state.principal_amount) || 0);
		const fortnights = computed(() => Number(state.number_of_fortnights) || 0);
		const distributorMargin = computed(() => {
			if (!selectedCategory.value || !principal.value || !fortnights.value) return null;
			return principal.value * (Number(selectedCategory.value.commission_percentage) / 100) / fortnights.value;
		});
		const pointsPreview = computed(() => {
			if (!selectedCategory.value || !principal.value) return null;
			return Math.floor(principal.value / 1200) * selectedCategory.value.points_per_1200;
		});
		const pointsValueMxn = computed(() => {
			if (pointsPreview.value === null || !props.pointValueMxn) return null;
			return pointsPreview.value * Number(props.pointValueMxn);
		});
		const autoInsurance = computed(() => {
			if (!principal.value || !props.insuranceTiers?.length) return null;
			const tier = props.insuranceTiers.find((t) => {
				const min = Number(t.min_amount);
				const max = Number(t.max_amount);
				return principal.value >= min && principal.value <= max;
			});
			return tier ? Number(tier.insurance_amount) : 0;
		});
		const effectiveInsurance = computed(() => {
			const manual = Number(state.insurance_amount);
			if (state.insurance_amount && manual > 0) return manual;
			return autoInsurance.value;
		});
		const autoCommission = computed(() => props.defaultCommissionPercentage !== void 0 ? Number(props.defaultCommissionPercentage) : null);
		const effectiveCommission = computed(() => {
			const manual = Number(state.company_commission_percentage);
			if (state.company_commission_percentage && manual > 0) return manual;
			return autoCommission.value;
		});
		const autoInterest = computed(() => props.defaultInterestPercentage !== void 0 ? Number(props.defaultInterestPercentage) : null);
		const effectiveInterest = computed(() => {
			const manual = Number(state.fortnightly_interest_percentage);
			if (state.fortnightly_interest_percentage && manual > 0) return manual;
			return autoInterest.value;
		});
		const autoLateFee = computed(() => props.defaultLateFeeAmount !== void 0 ? Number(props.defaultLateFeeAmount) : null);
		const effectiveLateFee = computed(() => {
			const manual = Number(state.late_fee_amount);
			if (state.late_fee_amount && manual > 0) return manual;
			return autoLateFee.value;
		});
		async function onSubmit(event) {
			if (!props.branchId) {
				toast.add({
					title: "Selecciona una sucursal",
					description: "No se puede guardar el vale sin sucursal.",
					color: "warning"
				});
				return;
			}
			submitting.value = true;
			try {
				const insuranceAmount = event.data.insurance_amount ? String(Number(event.data.insurance_amount)) : void 0;
				const commissionPercentage = event.data.company_commission_percentage ? String(Number(event.data.company_commission_percentage)) : void 0;
				const interestPercentage = event.data.fortnightly_interest_percentage ? String(Number(event.data.fortnightly_interest_percentage)) : void 0;
				const lateFeeAmount = event.data.late_fee_amount ? String(Number(event.data.late_fee_amount)) : void 0;
				if (props.product) {
					await updateProduct(props.branchId, props.product.id, {
						code: event.data.code || void 0,
						name: event.data.name,
						description: event.data.description || void 0,
						category_id: Number(event.data.category_id),
						principal_amount: event.data.principal_amount,
						number_of_fortnights: event.data.number_of_fortnights,
						insurance_amount: insuranceAmount,
						company_commission_percentage: commissionPercentage,
						fortnightly_interest_percentage: interestPercentage,
						late_fee_amount: lateFeeAmount,
						is_active: event.data.is_active
					});
					toast.add({
						title: "Vale actualizado",
						description: `${event.data.name} fue actualizado correctamente`,
						color: "success"
					});
					emit("updated");
				} else {
					await createProduct(props.branchId, {
						code: event.data.code || void 0,
						name: event.data.name,
						description: event.data.description || void 0,
						category_id: Number(event.data.category_id),
						principal_amount: event.data.principal_amount,
						number_of_fortnights: event.data.number_of_fortnights,
						insurance_amount: insuranceAmount,
						company_commission_percentage: commissionPercentage,
						fortnightly_interest_percentage: interestPercentage,
						late_fee_amount: lateFeeAmount,
						is_active: true
					});
					toast.add({
						title: "Vale creado",
						description: `${event.data.name} fue creado correctamente`,
						color: "success"
					});
					emit("created");
				}
				open.value = false;
			} catch (e) {
				const message = e instanceof Error && "data" in e ? JSON.stringify(e.data?.message ?? "") : "";
				toast.add({
					title: "Error",
					description: message || "No se pudo guardar el vale. Verifica los datos e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$a;
			const _component_UForm = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UInput = _sfc_main$8;
			const _component_USelect = _sfc_main$7;
			const _component_UToggle = resolveComponent("UToggle");
			const _component_UButton = _sfc_main;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: __props.product ? "Editar vale" : __props.cloneTemplate ? "Usar vale del catálogo general" : "Nuevo vale",
				description: __props.product ? `Actualizar ${__props.product.name}` : __props.cloneTemplate ? "Cópialo en tu sucursal y ajústalo si es necesario" : "Agrega un nuevo producto o vale a la sucursal",
				ui: { content: "max-w-3xl" }
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
								if (!__props.product) _push(ssrRenderComponent(_component_UFormField, {
									label: "Código",
									name: "code",
									description: "Opcional: se genera automáticamente si lo dejas vacío"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).code,
											"onUpdate:modelValue": ($event) => unref(state).code = $event,
											class: "w-full",
											uppercase: "",
											placeholder: "Ej. VALE-ZAPATERIA-8K"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).code,
											"onUpdate:modelValue": ($event) => unref(state).code = $event,
											class: "w-full",
											uppercase: "",
											placeholder: "Ej. VALE-ZAPATERIA-8K"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Nombre",
									name: "name"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full",
											placeholder: "Ej. Vale Zapatería 8K"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full",
											placeholder: "Ej. Vale Zapatería 8K"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Descripción",
									name: "description"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).description,
											"onUpdate:modelValue": ($event) => unref(state).description = $event,
											class: "w-full",
											placeholder: "Ej. Vale de 8,000 MXN a 2 quincenas"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).description,
											"onUpdate:modelValue": ($event) => unref(state).description = $event,
											class: "w-full",
											placeholder: "Ej. Vale de 8,000 MXN a 2 quincenas"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Monto",
									name: "principal_amount"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).principal_amount,
											"onUpdate:modelValue": ($event) => unref(state).principal_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full",
											placeholder: "8000"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).principal_amount,
											"onUpdate:modelValue": ($event) => unref(state).principal_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full",
											placeholder: "8000"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Quincenas",
									name: "number_of_fortnights"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).number_of_fortnights,
											"onUpdate:modelValue": ($event) => unref(state).number_of_fortnights = $event,
											modelModifiers: { number: true },
											type: "number",
											min: "1",
											step: "1",
											class: "w-full",
											placeholder: "2"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).number_of_fortnights,
											"onUpdate:modelValue": ($event) => unref(state).number_of_fortnights = $event,
											modelModifiers: { number: true },
											type: "number",
											min: "1",
											step: "1",
											class: "w-full",
											placeholder: "2"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div>`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Categoría",
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
								if (unref(selectedCategory)) {
									_push(`<div class="grid grid-cols-2 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"${_scopeId}><div class="flex flex-col gap-1"${_scopeId}><span class="text-xs uppercase text-muted"${_scopeId}>Comisión distribuidora</span><span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(Number(unref(selectedCategory).commission_percentage))}% <span class="font-normal text-muted"${_scopeId}>(${ssrInterpolate(unref(distributorMargin) !== null ? `${unref(money).format(unref(distributorMargin))} / quincena` : "—")})</span></span></div><div class="flex flex-col gap-1"${_scopeId}><span class="text-xs uppercase text-muted"${_scopeId}>Puntos estimados</span><span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(pointsPreview) ?? "—")} pts `);
									if (unref(pointsValueMxn) !== null) _push(`<span class="font-normal text-muted"${_scopeId}>(${ssrInterpolate(unref(money).format(unref(pointsValueMxn)))})</span>`);
									else _push(`<!---->`);
									_push(`</span></div></div>`);
								} else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Seguro (MXN)",
									name: "insurance_amount",
									description: unref(autoInsurance) !== null && !unref(state).insurance_amount ? `Automático por tarifa de sucursal: ${unref(money).format(unref(autoInsurance))}. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la tarifa de seguro de la sucursal"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).insurance_amount,
											"onUpdate:modelValue": ($event) => unref(state).insurance_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full",
											placeholder: "Automático"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).insurance_amount,
											"onUpdate:modelValue": ($event) => unref(state).insurance_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full",
											placeholder: "Automático"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								if (unref(effectiveInsurance) !== null) _push(`<div class="rounded-lg border border-default bg-elevated/50 p-3 text-sm"${_scopeId}><span class="text-xs uppercase text-muted"${_scopeId}>Seguro que se cobrará</span><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(unref(effectiveInsurance)))}</p></div>`);
								else _push(`<!---->`);
								_push(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Comisión empresa (%)",
									name: "company_commission_percentage",
									description: unref(autoCommission) !== null && !unref(state).company_commission_percentage ? `Automático por defecto de sucursal: ${unref(autoCommission)}%. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la comisión por defecto de la sucursal"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).company_commission_percentage,
											"onUpdate:modelValue": ($event) => unref(state).company_commission_percentage = $event,
											type: "number",
											min: "0",
											step: "0.0001",
											class: "w-full",
											placeholder: "Automático"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).company_commission_percentage,
											"onUpdate:modelValue": ($event) => unref(state).company_commission_percentage = $event,
											type: "number",
											min: "0",
											step: "0.0001",
											class: "w-full",
											placeholder: "Automático"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Interés quincenal (%)",
									name: "fortnightly_interest_percentage",
									description: unref(autoInterest) !== null && !unref(state).fortnightly_interest_percentage ? `Automático por defecto de sucursal: ${unref(autoInterest)}%. Déjalo vacío para usarlo.` : "Déjalo vacío para usar el interés por defecto de la sucursal"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).fortnightly_interest_percentage,
											"onUpdate:modelValue": ($event) => unref(state).fortnightly_interest_percentage = $event,
											type: "number",
											min: "0",
											step: "0.0001",
											class: "w-full",
											placeholder: "Automático"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).fortnightly_interest_percentage,
											"onUpdate:modelValue": ($event) => unref(state).fortnightly_interest_percentage = $event,
											type: "number",
											min: "0",
											step: "0.0001",
											class: "w-full",
											placeholder: "Automático"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div>`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Multa por atraso (MXN)",
									name: "late_fee_amount",
									description: unref(autoLateFee) !== null && !unref(state).late_fee_amount ? `Automático por defecto de sucursal: ${unref(money).format(unref(autoLateFee))}. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la multa por defecto de la sucursal"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).late_fee_amount,
											"onUpdate:modelValue": ($event) => unref(state).late_fee_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full",
											placeholder: "Automático"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).late_fee_amount,
											"onUpdate:modelValue": ($event) => unref(state).late_fee_amount = $event,
											type: "number",
											min: "0",
											step: "0.01",
											class: "w-full",
											placeholder: "Automático"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								if (unref(effectiveCommission) !== null || unref(effectiveInterest) !== null || unref(effectiveLateFee) !== null) {
									_push(`<div class="grid grid-cols-3 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"${_scopeId}>`);
									if (unref(effectiveCommission) !== null) _push(`<div class="flex flex-col gap-1"${_scopeId}><span class="text-xs uppercase text-muted"${_scopeId}>Comisión que se cobrará</span><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(effectiveCommission))}% </p></div>`);
									else _push(`<!---->`);
									if (unref(effectiveInterest) !== null) _push(`<div class="flex flex-col gap-1"${_scopeId}><span class="text-xs uppercase text-muted"${_scopeId}>Interés que se cobrará</span><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(effectiveInterest))}% </p></div>`);
									else _push(`<!---->`);
									if (unref(effectiveLateFee) !== null) _push(`<div class="flex flex-col gap-1"${_scopeId}><span class="text-xs uppercase text-muted"${_scopeId}>Multa que se cobrará</span><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(unref(effectiveLateFee)))}</p></div>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else _push(`<!---->`);
								if (__props.product) _push(ssrRenderComponent(_component_UFormField, {
									label: "Activo",
									name: "is_active"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UToggle, {
											modelValue: unref(state).is_active,
											"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
											"aria-label": "Activo"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UToggle, {
											modelValue: unref(state).is_active,
											"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
											"aria-label": "Activo"
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
									label: __props.product ? "Guardar" : "Crear",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								!__props.product ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
									label: "Código",
									name: "code",
									description: "Opcional: se genera automáticamente si lo dejas vacío"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).code,
										"onUpdate:modelValue": ($event) => unref(state).code = $event,
										class: "w-full",
										uppercase: "",
										placeholder: "Ej. VALE-ZAPATERIA-8K"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode(_component_UFormField, {
									required: "",
									label: "Nombre",
									name: "name"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).name,
										"onUpdate:modelValue": ($event) => unref(state).name = $event,
										class: "w-full",
										placeholder: "Ej. Vale Zapatería 8K"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Descripción",
									name: "description"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).description,
										"onUpdate:modelValue": ($event) => unref(state).description = $event,
										class: "w-full",
										placeholder: "Ej. Vale de 8,000 MXN a 2 quincenas"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
									required: "",
									label: "Monto",
									name: "principal_amount"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).principal_amount,
										"onUpdate:modelValue": ($event) => unref(state).principal_amount = $event,
										type: "number",
										min: "0",
										step: "0.01",
										class: "w-full",
										placeholder: "8000"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}), createVNode(_component_UFormField, {
									required: "",
									label: "Quincenas",
									name: "number_of_fortnights"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).number_of_fortnights,
										"onUpdate:modelValue": ($event) => unref(state).number_of_fortnights = $event,
										modelModifiers: { number: true },
										type: "number",
										min: "1",
										step: "1",
										class: "w-full",
										placeholder: "2"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								createVNode(_component_UFormField, {
									required: "",
									label: "Categoría",
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
								}),
								unref(selectedCategory) ? (openBlock(), createBlock("div", {
									key: 1,
									class: "grid grid-cols-2 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"
								}, [createVNode("div", { class: "flex flex-col gap-1" }, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Comisión distribuidora"), createVNode("span", { class: "font-semibold text-highlighted" }, [createTextVNode(toDisplayString(Number(unref(selectedCategory).commission_percentage)) + "% ", 1), createVNode("span", { class: "font-normal text-muted" }, "(" + toDisplayString(unref(distributorMargin) !== null ? `${unref(money).format(unref(distributorMargin))} / quincena` : "—") + ")", 1)])]), createVNode("div", { class: "flex flex-col gap-1" }, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Puntos estimados"), createVNode("span", { class: "font-semibold text-highlighted" }, [createTextVNode(toDisplayString(unref(pointsPreview) ?? "—") + " pts ", 1), unref(pointsValueMxn) !== null ? (openBlock(), createBlock("span", {
									key: 0,
									class: "font-normal text-muted"
								}, "(" + toDisplayString(unref(money).format(unref(pointsValueMxn))) + ")", 1)) : createCommentVNode("", true)])])])) : createCommentVNode("", true),
								createVNode(_component_UFormField, {
									label: "Seguro (MXN)",
									name: "insurance_amount",
									description: unref(autoInsurance) !== null && !unref(state).insurance_amount ? `Automático por tarifa de sucursal: ${unref(money).format(unref(autoInsurance))}. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la tarifa de seguro de la sucursal"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).insurance_amount,
										"onUpdate:modelValue": ($event) => unref(state).insurance_amount = $event,
										type: "number",
										min: "0",
										step: "0.01",
										class: "w-full",
										placeholder: "Automático"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["description"]),
								unref(effectiveInsurance) !== null ? (openBlock(), createBlock("div", {
									key: 2,
									class: "rounded-lg border border-default bg-elevated/50 p-3 text-sm"
								}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Seguro que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(unref(effectiveInsurance))), 1)])) : createCommentVNode("", true),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
									label: "Comisión empresa (%)",
									name: "company_commission_percentage",
									description: unref(autoCommission) !== null && !unref(state).company_commission_percentage ? `Automático por defecto de sucursal: ${unref(autoCommission)}%. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la comisión por defecto de la sucursal"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).company_commission_percentage,
										"onUpdate:modelValue": ($event) => unref(state).company_commission_percentage = $event,
										type: "number",
										min: "0",
										step: "0.0001",
										class: "w-full",
										placeholder: "Automático"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["description"]), createVNode(_component_UFormField, {
									label: "Interés quincenal (%)",
									name: "fortnightly_interest_percentage",
									description: unref(autoInterest) !== null && !unref(state).fortnightly_interest_percentage ? `Automático por defecto de sucursal: ${unref(autoInterest)}%. Déjalo vacío para usarlo.` : "Déjalo vacío para usar el interés por defecto de la sucursal"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).fortnightly_interest_percentage,
										"onUpdate:modelValue": ($event) => unref(state).fortnightly_interest_percentage = $event,
										type: "number",
										min: "0",
										step: "0.0001",
										class: "w-full",
										placeholder: "Automático"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["description"])]),
								createVNode(_component_UFormField, {
									label: "Multa por atraso (MXN)",
									name: "late_fee_amount",
									description: unref(autoLateFee) !== null && !unref(state).late_fee_amount ? `Automático por defecto de sucursal: ${unref(money).format(unref(autoLateFee))}. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la multa por defecto de la sucursal"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).late_fee_amount,
										"onUpdate:modelValue": ($event) => unref(state).late_fee_amount = $event,
										type: "number",
										min: "0",
										step: "0.01",
										class: "w-full",
										placeholder: "Automático"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["description"]),
								unref(effectiveCommission) !== null || unref(effectiveInterest) !== null || unref(effectiveLateFee) !== null ? (openBlock(), createBlock("div", {
									key: 3,
									class: "grid grid-cols-3 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"
								}, [
									unref(effectiveCommission) !== null ? (openBlock(), createBlock("div", {
										key: 0,
										class: "flex flex-col gap-1"
									}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Comisión que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(effectiveCommission)) + "% ", 1)])) : createCommentVNode("", true),
									unref(effectiveInterest) !== null ? (openBlock(), createBlock("div", {
										key: 1,
										class: "flex flex-col gap-1"
									}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Interés que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(effectiveInterest)) + "% ", 1)])) : createCommentVNode("", true),
									unref(effectiveLateFee) !== null ? (openBlock(), createBlock("div", {
										key: 2,
										class: "flex flex-col gap-1"
									}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Multa que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(unref(effectiveLateFee))), 1)])) : createCommentVNode("", true)
								])) : createCommentVNode("", true),
								__props.product ? (openBlock(), createBlock(_component_UFormField, {
									key: 4,
									label: "Activo",
									name: "is_active"
								}, {
									default: withCtx(() => [createVNode(_component_UToggle, {
										modelValue: unref(state).is_active,
										"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
										"aria-label": "Activo"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: __props.product ? "Guardar" : "Crear",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, ["label", "loading"])])
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
							!__props.product ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
								label: "Código",
								name: "code",
								description: "Opcional: se genera automáticamente si lo dejas vacío"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).code,
									"onUpdate:modelValue": ($event) => unref(state).code = $event,
									class: "w-full",
									uppercase: "",
									placeholder: "Ej. VALE-ZAPATERIA-8K"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode(_component_UFormField, {
								required: "",
								label: "Nombre",
								name: "name"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).name,
									"onUpdate:modelValue": ($event) => unref(state).name = $event,
									class: "w-full",
									placeholder: "Ej. Vale Zapatería 8K"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Descripción",
								name: "description"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).description,
									"onUpdate:modelValue": ($event) => unref(state).description = $event,
									class: "w-full",
									placeholder: "Ej. Vale de 8,000 MXN a 2 quincenas"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
								required: "",
								label: "Monto",
								name: "principal_amount"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).principal_amount,
									"onUpdate:modelValue": ($event) => unref(state).principal_amount = $event,
									type: "number",
									min: "0",
									step: "0.01",
									class: "w-full",
									placeholder: "8000"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}), createVNode(_component_UFormField, {
								required: "",
								label: "Quincenas",
								name: "number_of_fortnights"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).number_of_fortnights,
									"onUpdate:modelValue": ($event) => unref(state).number_of_fortnights = $event,
									modelModifiers: { number: true },
									type: "number",
									min: "1",
									step: "1",
									class: "w-full",
									placeholder: "2"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})]),
							createVNode(_component_UFormField, {
								required: "",
								label: "Categoría",
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
							}),
							unref(selectedCategory) ? (openBlock(), createBlock("div", {
								key: 1,
								class: "grid grid-cols-2 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"
							}, [createVNode("div", { class: "flex flex-col gap-1" }, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Comisión distribuidora"), createVNode("span", { class: "font-semibold text-highlighted" }, [createTextVNode(toDisplayString(Number(unref(selectedCategory).commission_percentage)) + "% ", 1), createVNode("span", { class: "font-normal text-muted" }, "(" + toDisplayString(unref(distributorMargin) !== null ? `${unref(money).format(unref(distributorMargin))} / quincena` : "—") + ")", 1)])]), createVNode("div", { class: "flex flex-col gap-1" }, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Puntos estimados"), createVNode("span", { class: "font-semibold text-highlighted" }, [createTextVNode(toDisplayString(unref(pointsPreview) ?? "—") + " pts ", 1), unref(pointsValueMxn) !== null ? (openBlock(), createBlock("span", {
								key: 0,
								class: "font-normal text-muted"
							}, "(" + toDisplayString(unref(money).format(unref(pointsValueMxn))) + ")", 1)) : createCommentVNode("", true)])])])) : createCommentVNode("", true),
							createVNode(_component_UFormField, {
								label: "Seguro (MXN)",
								name: "insurance_amount",
								description: unref(autoInsurance) !== null && !unref(state).insurance_amount ? `Automático por tarifa de sucursal: ${unref(money).format(unref(autoInsurance))}. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la tarifa de seguro de la sucursal"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).insurance_amount,
									"onUpdate:modelValue": ($event) => unref(state).insurance_amount = $event,
									type: "number",
									min: "0",
									step: "0.01",
									class: "w-full",
									placeholder: "Automático"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}, 8, ["description"]),
							unref(effectiveInsurance) !== null ? (openBlock(), createBlock("div", {
								key: 2,
								class: "rounded-lg border border-default bg-elevated/50 p-3 text-sm"
							}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Seguro que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(unref(effectiveInsurance))), 1)])) : createCommentVNode("", true),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
								label: "Comisión empresa (%)",
								name: "company_commission_percentage",
								description: unref(autoCommission) !== null && !unref(state).company_commission_percentage ? `Automático por defecto de sucursal: ${unref(autoCommission)}%. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la comisión por defecto de la sucursal"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).company_commission_percentage,
									"onUpdate:modelValue": ($event) => unref(state).company_commission_percentage = $event,
									type: "number",
									min: "0",
									step: "0.0001",
									class: "w-full",
									placeholder: "Automático"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}, 8, ["description"]), createVNode(_component_UFormField, {
								label: "Interés quincenal (%)",
								name: "fortnightly_interest_percentage",
								description: unref(autoInterest) !== null && !unref(state).fortnightly_interest_percentage ? `Automático por defecto de sucursal: ${unref(autoInterest)}%. Déjalo vacío para usarlo.` : "Déjalo vacío para usar el interés por defecto de la sucursal"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).fortnightly_interest_percentage,
									"onUpdate:modelValue": ($event) => unref(state).fortnightly_interest_percentage = $event,
									type: "number",
									min: "0",
									step: "0.0001",
									class: "w-full",
									placeholder: "Automático"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}, 8, ["description"])]),
							createVNode(_component_UFormField, {
								label: "Multa por atraso (MXN)",
								name: "late_fee_amount",
								description: unref(autoLateFee) !== null && !unref(state).late_fee_amount ? `Automático por defecto de sucursal: ${unref(money).format(unref(autoLateFee))}. Déjalo vacío para usarlo.` : "Déjalo vacío para usar la multa por defecto de la sucursal"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).late_fee_amount,
									"onUpdate:modelValue": ($event) => unref(state).late_fee_amount = $event,
									type: "number",
									min: "0",
									step: "0.01",
									class: "w-full",
									placeholder: "Automático"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}, 8, ["description"]),
							unref(effectiveCommission) !== null || unref(effectiveInterest) !== null || unref(effectiveLateFee) !== null ? (openBlock(), createBlock("div", {
								key: 3,
								class: "grid grid-cols-3 gap-3 rounded-lg border border-default bg-elevated/50 p-3 text-sm"
							}, [
								unref(effectiveCommission) !== null ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex flex-col gap-1"
								}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Comisión que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(effectiveCommission)) + "% ", 1)])) : createCommentVNode("", true),
								unref(effectiveInterest) !== null ? (openBlock(), createBlock("div", {
									key: 1,
									class: "flex flex-col gap-1"
								}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Interés que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(effectiveInterest)) + "% ", 1)])) : createCommentVNode("", true),
								unref(effectiveLateFee) !== null ? (openBlock(), createBlock("div", {
									key: 2,
									class: "flex flex-col gap-1"
								}, [createVNode("span", { class: "text-xs uppercase text-muted" }, "Multa que se cobrará"), createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(unref(effectiveLateFee))), 1)])) : createCommentVNode("", true)
							])) : createCommentVNode("", true),
							__props.product ? (openBlock(), createBlock(_component_UFormField, {
								key: 4,
								label: "Activo",
								name: "is_active"
							}, {
								default: withCtx(() => [createVNode(_component_UToggle, {
									modelValue: unref(state).is_active,
									"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
									"aria-label": "Activo"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: __props.product ? "Guardar" : "Crear",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["label", "loading"])])
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
//#region app/components/products/ProductModal.vue
var _sfc_setup$1 = ProductModal_vue_vue_type_script_setup_true_lang_default.setup;
ProductModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/products/ProductModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ProductModal_default = Object.assign(ProductModal_vue_vue_type_script_setup_true_lang_default, { __name: "ProductsProductModal" });
//#endregion
//#region app/pages/general/products.vue?vue&type=script&setup=true&lang.ts
var products_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "products",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const toast = useToast();
		const { listBranchProducts, updateProduct } = useProducts();
		const { listBranchCategories } = useCategories();
		const { getBranchSettings } = useSettings();
		const { listBranches } = useBranches();
		const { user } = useAuth();
		const canManage = computed(() => user.value?.permissions?.includes("products.manage") ?? false);
		const isGeneralManager = computed(() => user.value?.permissions?.includes("categories.manage") ?? false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("product-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const selectedBranchId = ref(branchManagerBranchId.value ?? branches.value[0]?.id ?? void 0);
		watch([branchManagerBranchId, branches], () => {
			if (!selectedBranchId.value && branchManagerBranchId.value) selectedBranchId.value = branchManagerBranchId.value;
			if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) selectedBranchId.value = branches.value[0].id;
		}, { immediate: true });
		const branchId = computed(() => selectedBranchId.value);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branch-product-categories", () => {
			if (!branchId.value) return Promise.resolve([]);
			return listBranchCategories(branchId.value).then((result) => result.data);
		}, {
			watch: [branchId],
			default: () => []
		})), __temp = await __temp, __restore(), __temp);
		const { data: branchSettings } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("product-branch-settings", async () => {
			if (!branchId.value) return null;
			try {
				return await getBranchSettings(branchId.value);
			} catch {
				return null;
			}
		}, {
			watch: [branchId],
			default: () => null
		})), __temp = await __temp, __restore(), __temp);
		const insuranceTiers = computed(() => branchSettings.value?.insurance_rates ?? null);
		const pointValueMxn = computed(() => branchSettings.value?.point_value_mxn ?? void 0);
		const defaultInterestPercentage = computed(() => branchSettings.value?.biweekly_interest_percentage ?? void 0);
		const defaultLateFeeAmount = computed(() => branchSettings.value?.late_payment_penalty_amount ?? void 0);
		const defaultCommissionPercentage = computed(() => branchSettings.value?.opening_commission_percentage ?? void 0);
		const q = ref("");
		const page = ref(1);
		const { data: productsData, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branch-products", () => {
			if (!branchId.value) return Promise.resolve({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			});
			return listBranchProducts(branchId.value, { page: page.value });
		}, {
			watch: [page, branchId],
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
		const items = computed(() => productsData.value.data ?? []);
		const meta = computed(() => productsData.value.meta);
		const filteredItems = computed(() => {
			if (!q.value) return items.value;
			const needle = q.value.toLowerCase();
			return items.value.filter((product) => {
				return product.name.toLowerCase().includes(needle) || product.code.toLowerCase().includes(needle);
			});
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function categoryName(product) {
			return product.category?.name ?? categories.value.find((c) => c.id === product.category_id)?.name ?? "Sin categoría";
		}
		const isEditOpen = ref(false);
		const selectedProduct = ref(null);
		const cloneTemplate = ref(null);
		function openCreate() {
			if (!branchId.value) {
				toast.add({
					title: "Selecciona una sucursal",
					description: "Elige la sucursal antes de crear un nuevo vale.",
					color: "warning"
				});
				return;
			}
			selectedProduct.value = null;
			cloneTemplate.value = null;
			isEditOpen.value = true;
		}
		function openClone(product) {
			selectedProduct.value = null;
			cloneTemplate.value = product;
			isEditOpen.value = true;
		}
		function getProductItems(product) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (product.origin === "global") items.push({
				label: "Usar en esta sucursal",
				icon: "i-lucide-copy",
				onSelect() {
					openClone(product);
				}
			});
			else if (canManage.value) items.push({
				label: "Editar",
				icon: "i-lucide-pencil",
				onSelect() {
					selectedProduct.value = product;
					isEditOpen.value = true;
				}
			});
			items.push({ type: "separator" }, {
				label: product.is_active ? "Desactivar" : "Activar",
				icon: product.is_active ? "i-lucide-circle-slash" : "i-lucide-circle-check",
				onSelect: async () => {
					if (!branchId.value || product.origin === "global") return;
					try {
						await updateProduct(branchId.value, product.id, { is_active: !product.is_active });
						toast.add({
							title: "Vale actualizado",
							description: `${product.name} fue ${product.is_active ? "desactivado" : "activado"} correctamente`,
							color: "success"
						});
						await refresh();
					} catch {
						toast.add({
							title: "Error",
							description: "No se pudo actualizar el vale.",
							color: "error"
						});
					}
				}
			});
			return items;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$6;
			const _component_UDashboardSidebarCollapse = _sfc_main$9;
			const _component_USelect = _sfc_main$7;
			const _component_UInput = _sfc_main$8;
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$3;
			const _component_UDropdownMenu = _sfc_main$4;
			const _component_UPagination = _sfc_main$5;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "products" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Productos y Vales" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(isGeneralManager)) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(selectedBranchId),
									"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
									items: unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									})),
									placeholder: "Sucursal...",
									class: "w-64"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar vale...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, _parent, _scopeId));
								if (unref(canManage)) _push(ssrRenderComponent(_component_UButton, {
									label: "Nuevo vale",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [
								unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
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
								])) : createCommentVNode("", true),
								createVNode(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar vale...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
									key: 1,
									label: "Nuevo vale",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, 8, ["onClick"])) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Productos y Vales" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [
							unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
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
							])) : createCommentVNode("", true),
							createVNode(_component_UInput, {
								modelValue: unref(q),
								"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
								placeholder: "Buscar vale...",
								icon: "i-lucide-search",
								class: "w-56"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
								key: 1,
								label: "Nuevo vale",
								icon: "i-lucide-plus",
								color: "primary",
								variant: "solid",
								onClick: ($event) => openCreate()
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
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar los vales. </p>`);
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
						if (unref(filteredItems).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-receipt",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay vales registrados </p>`);
							if (unref(canManage)) _push(`<p class="text-sm text-dimmed"${_scopeId}> Crea el primer vale con el botón &quot;Nuevo vale&quot; </p>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else {
							_push(`<div class="divide-y divide-default"${_scopeId}><!--[-->`);
							ssrRenderList(unref(filteredItems), (product) => {
								_push(`<div class="flex items-center justify-between gap-3 px-6 py-4"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}><div class="flex size-10 items-center justify-center rounded-md bg-elevated"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-ticket",
									class: "size-5 text-highlighted"
								}, null, _parent, _scopeId));
								_push(`</div><div class="min-w-0"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(product.name)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(product.code)}</p></div></div><div class="flex items-center gap-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UBadge, {
									variant: "subtle",
									label: categoryName(product)
								}, null, _parent, _scopeId));
								if (product.origin === "global") _push(ssrRenderComponent(_component_UBadge, {
									color: "info",
									variant: "subtle",
									label: "Catálogo general"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(product.principal_amount)))}</span><span class="text-sm text-muted"${_scopeId}>${ssrInterpolate(product.number_of_fortnights)} quincenas </span><span class="text-sm text-muted"${_scopeId}> Comisión: ${ssrInterpolate(Number(product.company_commission_percentage))}% </span><span class="text-sm text-muted"${_scopeId}> Seguro: ${ssrInterpolate(unref(money).format(Number(product.insurance_amount)))}</span><span class="text-sm text-muted"${_scopeId}> Interés: ${ssrInterpolate(Number(product.fortnightly_interest_percentage))}% </span><span class="text-sm text-muted"${_scopeId}> Multa: ${ssrInterpolate(unref(money).format(Number(product.late_fee_amount)))}</span>`);
								if (product.is_active) _push(ssrRenderComponent(_component_UBadge, {
									color: "success",
									variant: "subtle",
									label: "Activo"
								}, null, _parent, _scopeId));
								else _push(ssrRenderComponent(_component_UBadge, {
									color: "error",
									variant: "subtle",
									label: "Inactivo"
								}, null, _parent, _scopeId));
								if (unref(canManage) || product.origin === "global") _push(ssrRenderComponent(_component_UDropdownMenu, { items: getProductItems(product) }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost",
											"aria-label": "Acciones"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost",
											"aria-label": "Acciones"
										})];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar los vales. "),
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
					}, [unref(filteredItems).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-receipt",
							class: "size-12 text-dimmed"
						}),
						createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay vales registrados "),
						unref(canManage) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-sm text-dimmed"
						}, " Crea el primer vale con el botón \"Nuevo vale\" ")) : createCommentVNode("", true)
					])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (product) => {
						return openBlock(), createBlock("div", {
							key: product.id,
							class: "flex items-center justify-between gap-3 px-6 py-4"
						}, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode("div", { class: "flex size-10 items-center justify-center rounded-md bg-elevated" }, [createVNode(_component_UIcon, {
							name: "i-lucide-ticket",
							class: "size-5 text-highlighted"
						})]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(product.name), 1), createVNode("p", { class: "text-xs text-muted" }, toDisplayString(product.code), 1)])]), createVNode("div", { class: "flex items-center gap-3" }, [
							createVNode(_component_UBadge, {
								variant: "subtle",
								label: categoryName(product)
							}, null, 8, ["label"]),
							product.origin === "global" ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "info",
								variant: "subtle",
								label: "Catálogo general"
							})) : createCommentVNode("", true),
							createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(product.principal_amount))), 1),
							createVNode("span", { class: "text-sm text-muted" }, toDisplayString(product.number_of_fortnights) + " quincenas ", 1),
							createVNode("span", { class: "text-sm text-muted" }, " Comisión: " + toDisplayString(Number(product.company_commission_percentage)) + "% ", 1),
							createVNode("span", { class: "text-sm text-muted" }, " Seguro: " + toDisplayString(unref(money).format(Number(product.insurance_amount))), 1),
							createVNode("span", { class: "text-sm text-muted" }, " Interés: " + toDisplayString(Number(product.fortnightly_interest_percentage)) + "% ", 1),
							createVNode("span", { class: "text-sm text-muted" }, " Multa: " + toDisplayString(unref(money).format(Number(product.late_fee_amount))), 1),
							product.is_active ? (openBlock(), createBlock(_component_UBadge, {
								key: 1,
								color: "success",
								variant: "subtle",
								label: "Activo"
							})) : (openBlock(), createBlock(_component_UBadge, {
								key: 2,
								color: "error",
								variant: "subtle",
								label: "Inactivo"
							})),
							unref(canManage) || product.origin === "global" ? (openBlock(), createBlock(_component_UDropdownMenu, {
								key: 3,
								items: getProductItems(product)
							}, {
								default: withCtx(() => [createVNode(_component_UButton, {
									icon: "i-lucide-ellipsis-vertical",
									color: "neutral",
									variant: "ghost",
									"aria-label": "Acciones"
								})]),
								_: 1
							}, 8, ["items"])) : createCommentVNode("", true)
						])]);
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
			_push(ssrRenderComponent(ProductModal_default, {
				open: unref(isEditOpen),
				"onUpdate:open": ($event) => isRef(isEditOpen) ? isEditOpen.value = $event : null,
				product: unref(selectedProduct),
				"clone-template": unref(cloneTemplate),
				categories: unref(categories),
				"branch-id": unref(branchId),
				"insurance-tiers": unref(insuranceTiers),
				"point-value-mxn": unref(pointValueMxn),
				"default-interest-percentage": unref(defaultInterestPercentage),
				"default-late-fee-amount": unref(defaultLateFeeAmount),
				"default-commission-percentage": unref(defaultCommissionPercentage),
				onCreated: ($event) => unref(refresh)(),
				onUpdated: ($event) => unref(refresh)()
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/products.vue
var _sfc_setup = products_vue_vue_type_script_setup_true_lang_default.setup;
products_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/products.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var products_default = products_vue_vue_type_script_setup_true_lang_default;

export { products_default as default };
//# sourceMappingURL=products-C7xM-PaY.mjs.map
