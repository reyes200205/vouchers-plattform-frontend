import { al as useAuth, ak as useAsyncData, f as _sfc_main$6, aP as useToast, j as _sfc_main$2$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$d } from './InputNumber-VA_FGM2O.mjs';
import { _ as _sfc_main$a } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$7 } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$5 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$b } from './Input-BC1I0LeZ.mjs';
import { a as isValidRfc, i as isValidCurp, e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { a as _sfc_main$1, _ as _sfc_main$3 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$4 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { _ as _sfc_main$9 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$2 } from './Table-DZoThN5y.mjs';
import { _ as _sfc_main$c } from './Textarea-DLoRbkWE.mjs';
import { A as ApplicationDetailView_default } from './ApplicationDetailView-Bofp-NXu.mjs';
import { u as useApplications, a as applicantFullName, A as APPLICATION_STATUS_LABELS } from './useApplications-DC2_85yO.mjs';
import { _ as _sfc_main$8 } from './Alert-CSACBiI_.mjs';
import { V as VerifyModal_default } from './VerifyModal-DaY2PzyC.mjs';
import { defineComponent, ref, withAsyncContext, computed, withCtx, isRef, unref, createVNode, h, useModel, watch, reactive, mergeProps, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import './DashboardSidebarToggle-BIlVm3ff.mjs';
import './useDirection-DK-ubNea.mjs';
import './useTypeahead-BWLtoev0.mjs';
import './useFormControl-BqrzxfBI.mjs';
import './PopperArrow-D4nTdxSJ.mjs';
import './useComposing-D1bdBmsI.mjs';
import './useKbd-rvMsbidG.mjs';
import './VisuallyHiddenInput-qXGxQnKa.mjs';
import './overlay-C4SiqibN.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';
import './RadioGroup-ByiZ78dl.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './RovingFocusItem-ludpn-tQ.mjs';
import './EvidencePhotoCapture-_HZkz42W.mjs';

//#region app/components/verificador/ApplicationDetailModal.vue?vue&type=script&setup=true&lang.ts
var ApplicationDetailModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ApplicationDetailModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ applicationId: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["updated"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const open = useModel(__props, "open");
		const { user } = useAuth();
		const { getApplication, updateApplication } = useApplications();
		const toast = useToast();
		const detail = ref(null);
		const detailLoading = ref(false);
		const detailError = ref(false);
		const editing = ref(false);
		const submitting = ref(false);
		async function loadDetail() {
			if (!props.applicationId) return;
			detailLoading.value = true;
			detailError.value = false;
			editing.value = false;
			try {
				detail.value = await getApplication(props.applicationId);
			} catch {
				detailError.value = true;
			} finally {
				detailLoading.value = false;
			}
		}
		watch(open, (isOpen) => {
			if (isOpen) loadDetail();
		});
		const canEdit = computed(() => {
			return !!detail.value && detail.value.status === "EN_REVISION" && detail.value.assigned_verifier?.id === user.value?.id;
		});
		const schema = z.object({
			first_name: z.string().min(2, "Muy corto").max(100, "Muy largo"),
			middle_name: z.string().max(100, "Muy largo").optional(),
			last_name: z.string().min(2, "Muy corto").max(100, "Muy largo"),
			second_last_name: z.string().max(100, "Muy largo").optional(),
			gender: z.enum([
				"M",
				"F",
				"OTHER"
			]).optional(),
			birth_date: z.string().min(1, "La fecha de nacimiento es obligatoria").superRefine((value, ctx) => {
				const birthDate = new Date(value);
				const today = /* @__PURE__ */ new Date();
				let age = today.getFullYear() - birthDate.getFullYear();
				const monthDiff = today.getMonth() - birthDate.getMonth();
				if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) age--;
				if (age < 18) ctx.addIssue({
					code: "custom",
					message: "El solicitante debe ser mayor de 18 años"
				});
			}),
			curp: z.string().length(18, "CURP inválida (18 caracteres)").superRefine((value, ctx) => {
				if (!isValidCurp(value)) ctx.addIssue({
					code: "custom",
					message: "CURP con formato inválido"
				});
			}),
			rfc: z.string().length(13, "RFC inválido (13 caracteres)").superRefine((value, ctx) => {
				if (!isValidRfc(value)) ctx.addIssue({
					code: "custom",
					message: "RFC con formato inválido"
				});
			}),
			home_phone: z.string().max(30, "Muy largo").optional(),
			mobile_phone: z.string().max(30, "Muy largo").optional(),
			email: z.string().email("Correo inválido"),
			street: z.string().max(150, "Muy largo"),
			external_number: z.string().max(30, "Muy largo"),
			neighborhood: z.string().max(120, "Muy largo"),
			city: z.string().max(120, "Muy largo"),
			state: z.string().max(120, "Muy largo"),
			postal_code: z.string().max(10, "Muy largo"),
			street_references: z.string().optional(),
			notes: z.string().optional(),
			requested_credit_limit: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
			occupation_type: z.string().optional(),
			occupation_monthly_income: z.number().min(0).optional(),
			occupation_place: z.string().optional(),
			occupation_position: z.string().optional(),
			occupation_phone: z.string().optional(),
			occupation_years: z.number().min(0).optional(),
			housing_ownership_type: z.string().optional(),
			housing_dimensions: z.string().optional(),
			housing_years: z.number().min(0).optional(),
			work_reference_name: z.string().optional(),
			work_reference_phone: z.string().optional()
		});
		const state = reactive({});
		const familyMembers = ref([]);
		const vehicles = ref([]);
		function addFamilyMember() {
			familyMembers.value.push({
				name: "",
				relationship: "",
				phone: "",
				age: null
			});
		}
		function removeFamilyMember(index) {
			familyMembers.value.splice(index, 1);
		}
		function addVehicle() {
			vehicles.value.push({
				brand: "",
				model: "",
				year: "",
				plates: ""
			});
		}
		function removeVehicle(index) {
			vehicles.value.splice(index, 1);
		}
		function startEditing() {
			if (!detail.value) return;
			const p = detail.value.applicant;
			state.first_name = p?.first_name ?? "";
			state.middle_name = p?.middle_name ?? "";
			state.last_name = p?.last_name ?? "";
			state.second_last_name = p?.second_last_name ?? "";
			state.gender = p?.gender ?? void 0;
			state.birth_date = p?.birth_date ?? "";
			state.curp = p?.curp ?? "";
			state.rfc = p?.rfc ?? "";
			state.home_phone = p?.home_phone ?? "";
			state.mobile_phone = p?.mobile_phone ?? "";
			state.email = p?.email ?? "";
			state.street = p?.street ?? "";
			state.external_number = p?.external_number ?? "";
			state.neighborhood = p?.neighborhood ?? "";
			state.city = p?.city ?? "";
			state.state = p?.state ?? "";
			state.postal_code = p?.postal_code ?? "";
			state.street_references = p?.street_references ?? "";
			state.notes = p?.notes ?? "";
			state.requested_credit_limit = detail.value.requested_credit_limit ?? void 0;
			const familyData = detail.value.family_data_json;
			state.occupation_type = familyData?.occupation?.type ?? "";
			state.occupation_place = familyData?.occupation?.place_name ?? "";
			state.occupation_position = familyData?.occupation?.position ?? "";
			state.occupation_phone = familyData?.occupation?.phone ?? "";
			state.occupation_years = familyData?.occupation?.years ?? void 0;
			state.occupation_monthly_income = familyData?.occupation?.monthly_income ?? void 0;
			state.housing_ownership_type = familyData?.housing?.ownership_type ?? "";
			state.housing_dimensions = familyData?.housing?.dimensions ?? "";
			state.housing_years = familyData?.housing?.years_at_address ?? void 0;
			state.work_reference_name = familyData?.housing?.work_reference?.name ?? "";
			state.work_reference_phone = familyData?.housing?.work_reference?.phone ?? "";
			familyMembers.value = (familyData?.members ?? []).map((m) => ({
				name: m.name ?? "",
				relationship: m.relationship ?? "",
				phone: m.phone ?? "",
				age: m.age ?? null
			}));
			if (familyMembers.value.length === 0) familyMembers.value.push({
				name: "",
				relationship: "",
				phone: "",
				age: null
			});
			vehicles.value = (detail.value.vehicles_json ?? []).map((v) => ({
				brand: v.brand ?? "",
				model: v.model ?? "",
				year: v.year ?? "",
				plates: v.plates ?? ""
			}));
			editing.value = true;
		}
		async function onSubmit(event) {
			if (!props.applicationId) return;
			submitting.value = true;
			try {
				detail.value = await updateApplication(props.applicationId, {
					person: {
						first_name: event.data.first_name,
						middle_name: event.data.middle_name || null,
						last_name: event.data.last_name,
						second_last_name: event.data.second_last_name,
						gender: event.data.gender,
						birth_date: event.data.birth_date || void 0,
						curp: event.data.curp,
						rfc: event.data.rfc,
						home_phone: event.data.home_phone,
						mobile_phone: event.data.mobile_phone,
						email: event.data.email,
						street: event.data.street,
						external_number: event.data.external_number,
						neighborhood: event.data.neighborhood,
						city: event.data.city,
						state: event.data.state,
						postal_code: event.data.postal_code,
						street_references: event.data.street_references || null,
						notes: event.data.notes || null
					},
					family_data: {
						members: familyMembers.value.filter((m) => m.name || m.relationship || m.phone || m.age).map((m) => ({
							name: m.name || null,
							relationship: m.relationship || null,
							phone: m.phone || null,
							age: m.age ?? null
						})),
						occupation: {
							type: event.data.occupation_type || null,
							place_name: event.data.occupation_place || null,
							position: event.data.occupation_position || null,
							phone: event.data.occupation_phone || null,
							years: event.data.occupation_years ?? null,
							monthly_income: event.data.occupation_monthly_income ?? null
						},
						housing: {
							ownership_type: event.data.housing_ownership_type || null,
							dimensions: event.data.housing_dimensions || null,
							years_at_address: event.data.housing_years ?? null,
							work_reference: {
								name: event.data.work_reference_name || null,
								phone: event.data.work_reference_phone || null
							}
						}
					},
					vehicles: vehicles.value.filter((v) => v.brand || v.model || v.year || v.plates).map((v) => ({
						brand: v.brand || null,
						model: v.model || null,
						year: v.year || null,
						plates: v.plates || null
					})),
					requested_credit_limit: event.data.requested_credit_limit
				});
				toast.add({
					title: "Solicitud actualizada",
					description: "Los datos se corrigieron correctamente.",
					color: "success"
				});
				editing.value = false;
				emit("updated");
			} catch (e) {
				toast.add({
					title: "Error",
					description: extractApiErrorMessage(e, "No se pudo actualizar la solicitud. Verifica los datos e intenta de nuevo."),
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$7;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UBadge = _sfc_main$5;
			const _component_UButton = _sfc_main$6;
			const _component_UAlert = _sfc_main$8;
			const _component_UForm = _sfc_main$9;
			const _component_UFormField = _sfc_main$a;
			const _component_UInput = _sfc_main$b;
			const _component_USelect = _sfc_main;
			const _component_UTextarea = _sfc_main$c;
			const _component_UInputNumber = _sfc_main$d;
			const _component_ApplicationsApplicationDetailView = ApplicationDetailView_default;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Detalle de la solicitud",
				description: "Información completa capturada por el coordinador",
				ui: { content: "max-w-6xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="max-h-[78vh] space-y-5 overflow-y-auto pr-1"${_scopeId}>`);
						if (unref(detailLoading)) {
							_push(`<div class="flex items-center justify-center py-10"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-6 animate-spin text-muted"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(detailError)) {
							_push(`<div class="flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-triangle-alert",
								class: "size-4 shrink-0"
							}, null, _parent, _scopeId));
							_push(` No se pudo cargar el detalle de la solicitud. </div>`);
						} else if (unref(detail)) {
							_push(`<!--[--><div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><p class="text-lg font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(applicantFullName)(unref(detail).applicant))}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(unref(detail).branch?.name)} `);
							if (unref(detail).coordinator?.person) _push(`<span${_scopeId}> · Coordinador: ${ssrInterpolate(unref(applicantFullName)(unref(detail).coordinator.person))}</span>`);
							else _push(`<!---->`);
							_push(`</p></div><div class="flex items-center gap-2"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UBadge, {
								variant: "subtle",
								color: "warning"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(APPLICATION_STATUS_LABELS)[unref(detail).status] ?? unref(detail).status)}`);
									else return [createTextVNode(toDisplayString(unref(APPLICATION_STATUS_LABELS)[unref(detail).status] ?? unref(detail).status), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							if (unref(canEdit) && !unref(editing)) _push(ssrRenderComponent(_component_UButton, {
								label: "Corregir datos",
								icon: "i-lucide-pencil",
								color: "neutral",
								variant: "subtle",
								size: "xs",
								onClick: startEditing
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</div></div>`);
							if (!unref(canEdit) && !unref(editing)) _push(ssrRenderComponent(_component_UAlert, {
								color: "neutral",
								variant: "subtle",
								icon: "i-lucide-info",
								title: "Solo lectura",
								description: "Solo el verificador asignado puede corregir esta solicitud, y únicamente mientras siga pendiente de verificación."
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							if (unref(editing)) _push(ssrRenderComponent(_component_UForm, {
								schema: unref(schema),
								state: unref(state),
								class: "space-y-5",
								onSubmit
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="rounded-lg border border-default p-4"${_scopeId}><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Datos personales </p><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Nombre",
											name: "first_name"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).first_name,
													"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).first_name,
													"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Segundo nombre",
											name: "middle_name"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).middle_name,
													"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).middle_name,
													"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Apellido paterno",
											name: "last_name"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).last_name,
													"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).last_name,
													"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Apellido materno",
											name: "second_last_name"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).second_last_name,
													"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).second_last_name,
													"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Género",
											name: "gender"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_USelect, {
													modelValue: unref(state).gender,
													"onUpdate:modelValue": ($event) => unref(state).gender = $event,
													items: [
														{
															label: "Masculino",
															value: "M"
														},
														{
															label: "Femenino",
															value: "F"
														},
														{
															label: "Otro",
															value: "OTHER"
														}
													],
													placeholder: "Seleccionar...",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_USelect, {
													modelValue: unref(state).gender,
													"onUpdate:modelValue": ($event) => unref(state).gender = $event,
													items: [
														{
															label: "Masculino",
															value: "M"
														},
														{
															label: "Femenino",
															value: "F"
														},
														{
															label: "Otro",
															value: "OTHER"
														}
													],
													placeholder: "Seleccionar...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Fecha de nacimiento",
											name: "birth_date"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).birth_date,
													"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
													type: "date",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).birth_date,
													"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
													type: "date",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "CURP",
											name: "curp"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).curp,
													"onUpdate:modelValue": ($event) => unref(state).curp = $event,
													class: "w-full uppercase"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).curp,
													"onUpdate:modelValue": ($event) => unref(state).curp = $event,
													class: "w-full uppercase"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "RFC",
											name: "rfc"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).rfc,
													"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
													class: "w-full uppercase"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).rfc,
													"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
													class: "w-full uppercase"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Teléfono de casa",
											name: "home_phone"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).home_phone,
													"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).home_phone,
													"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Celular",
											name: "mobile_phone"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).mobile_phone,
													"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).mobile_phone,
													"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Correo",
											name: "email"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).email,
													"onUpdate:modelValue": ($event) => unref(state).email = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).email,
													"onUpdate:modelValue": ($event) => unref(state).email = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Notas",
											name: "notes",
											class: "sm:col-span-2 lg:col-span-3"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UTextarea, {
													modelValue: unref(state).notes,
													"onUpdate:modelValue": ($event) => unref(state).notes = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UTextarea, {
													modelValue: unref(state).notes,
													"onUpdate:modelValue": ($event) => unref(state).notes = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div><div class="rounded-lg border border-default p-4"${_scopeId}><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Domicilio </p><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Calle",
											name: "street"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).street,
													"onUpdate:modelValue": ($event) => unref(state).street = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).street,
													"onUpdate:modelValue": ($event) => unref(state).street = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Número exterior",
											name: "external_number"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).external_number,
													"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).external_number,
													"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Colonia",
											name: "neighborhood"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).neighborhood,
													"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).neighborhood,
													"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Ciudad",
											name: "city"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).city,
													"onUpdate:modelValue": ($event) => unref(state).city = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).city,
													"onUpdate:modelValue": ($event) => unref(state).city = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Estado",
											name: "state"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).state,
													"onUpdate:modelValue": ($event) => unref(state).state = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).state,
													"onUpdate:modelValue": ($event) => unref(state).state = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "C.P.",
											name: "postal_code"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).postal_code,
													"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).postal_code,
													"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Referencias del domicilio",
											name: "street_references",
											class: "sm:col-span-2 lg:col-span-3"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UTextarea, {
													modelValue: unref(state).street_references,
													"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UTextarea, {
													modelValue: unref(state).street_references,
													"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div><div class="rounded-lg border border-default p-4"${_scopeId}><div class="mb-3 flex items-center justify-between"${_scopeId}><p class="text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Familiares y cónyuge </p>`);
										_push(ssrRenderComponent(_component_UButton, {
											label: "Agregar familiar",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addFamilyMember
										}, null, _parent, _scopeId));
										_push(`</div><div class="space-y-3"${_scopeId}><!--[-->`);
										ssrRenderList(unref(familyMembers), (member, index) => {
											_push(`<div class="grid grid-cols-1 items-end gap-3 sm:grid-cols-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, { label: "Nombre" }, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: member.name,
														"onUpdate:modelValue": ($event) => member.name = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: member.name,
														"onUpdate:modelValue": ($event) => member.name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 2
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, { label: "Parentesco" }, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_USelect, {
														modelValue: member.relationship,
														"onUpdate:modelValue": ($event) => member.relationship = $event,
														items: [
															{
																label: "Esposo(a) / Cónyuge",
																value: "Esposo(a)"
															},
															{
																label: "Padre / Madre",
																value: "Padre/Madre"
															},
															{
																label: "Hijo(a)",
																value: "Hijo(a)"
															},
															{
																label: "Hermano(a)",
																value: "Hermano(a)"
															},
															{
																label: "Otro",
																value: "Otro"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_USelect, {
														modelValue: member.relationship,
														"onUpdate:modelValue": ($event) => member.relationship = $event,
														items: [
															{
																label: "Esposo(a) / Cónyuge",
																value: "Esposo(a)"
															},
															{
																label: "Padre / Madre",
																value: "Padre/Madre"
															},
															{
																label: "Hijo(a)",
																value: "Hijo(a)"
															},
															{
																label: "Hermano(a)",
																value: "Hermano(a)"
															},
															{
																label: "Otro",
																value: "Otro"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 2
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, { label: "Teléfono" }, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: member.phone,
														"onUpdate:modelValue": ($event) => member.phone = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: member.phone,
														"onUpdate:modelValue": ($event) => member.phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 2
											}, _parent, _scopeId));
											_push(`<div class="flex items-end gap-2"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Edad",
												class: "flex-1"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
														modelValue: member.age,
														"onUpdate:modelValue": ($event) => member.age = $event,
														class: "w-full",
														min: 0
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInputNumber, {
														modelValue: member.age,
														"onUpdate:modelValue": ($event) => member.age = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 2
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-trash",
												color: "error",
												variant: "ghost",
												disabled: unref(familyMembers).length === 1,
												onClick: ($event) => removeFamilyMember(index)
											}, null, _parent, _scopeId));
											_push(`</div></div>`);
										});
										_push(`<!--]--></div></div><div class="rounded-lg border border-default p-4"${_scopeId}><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Ocupación </p><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Trabaja o estudia",
											name: "occupation_type"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_USelect, {
													modelValue: unref(state).occupation_type,
													"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
													items: [
														{
															label: "Trabaja",
															value: "trabaja"
														},
														{
															label: "Estudia",
															value: "estudia"
														},
														{
															label: "Otro",
															value: "otro"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_USelect, {
													modelValue: unref(state).occupation_type,
													"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
													items: [
														{
															label: "Trabaja",
															value: "trabaja"
														},
														{
															label: "Estudia",
															value: "estudia"
														},
														{
															label: "Otro",
															value: "otro"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Nombre del trabajo o escuela",
											name: "occupation_place"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).occupation_place,
													"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_place,
													"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Puesto o grado",
											name: "occupation_position"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).occupation_position,
													"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_position,
													"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Teléfono del trabajo o escuela",
											name: "occupation_phone"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).occupation_phone,
													"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_phone,
													"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Antigüedad (años)",
											name: "occupation_years"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
													modelValue: unref(state).occupation_years,
													"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
													class: "w-full",
													min: 0
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInputNumber, {
													modelValue: unref(state).occupation_years,
													"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Ganancia al mes",
											name: "occupation_monthly_income"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
													modelValue: unref(state).occupation_monthly_income,
													"onUpdate:modelValue": ($event) => unref(state).occupation_monthly_income = $event,
													class: "w-full",
													min: 0
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInputNumber, {
													modelValue: unref(state).occupation_monthly_income,
													"onUpdate:modelValue": ($event) => unref(state).occupation_monthly_income = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div><div class="rounded-lg border border-default p-4"${_scopeId}><div class="mb-3 flex items-center justify-between"${_scopeId}><p class="text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Vehículos </p>`);
										_push(ssrRenderComponent(_component_UButton, {
											label: "Agregar vehículo",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addVehicle
										}, null, _parent, _scopeId));
										_push(`</div>`);
										if (!unref(vehicles).length) _push(`<div class="text-sm text-dimmed"${_scopeId}> El solicitante no tiene vehículos registrados. </div>`);
										else {
											_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
											ssrRenderList(unref(vehicles), (vehicle, index) => {
												_push(`<div class="grid grid-cols-1 items-end gap-3 md:grid-cols-5"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, { label: "Marca" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: vehicle.brand,
															"onUpdate:modelValue": ($event) => vehicle.brand = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: vehicle.brand,
															"onUpdate:modelValue": ($event) => vehicle.brand = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Modelo" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: vehicle.model,
															"onUpdate:modelValue": ($event) => vehicle.model = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: vehicle.model,
															"onUpdate:modelValue": ($event) => vehicle.model = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Año" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: vehicle.year,
															"onUpdate:modelValue": ($event) => vehicle.year = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: vehicle.year,
															"onUpdate:modelValue": ($event) => vehicle.year = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Placas" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: vehicle.plates,
															"onUpdate:modelValue": ($event) => vehicle.plates = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: vehicle.plates,
															"onUpdate:modelValue": ($event) => vehicle.plates = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													onClick: ($event) => removeVehicle(index)
												}, null, _parent, _scopeId));
												_push(`</div>`);
											});
											_push(`<!--]--></div>`);
										}
										_push(`</div><div class="rounded-lg border border-default p-4"${_scopeId}><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Vivienda </p><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Tenencia de la vivienda",
											name: "housing_ownership_type"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_USelect, {
													modelValue: unref(state).housing_ownership_type,
													"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
													items: [
														{
															label: "Propia",
															value: "propia"
														},
														{
															label: "Rentada",
															value: "rentada"
														},
														{
															label: "Propia (en proceso de liquidar)",
															value: "liquidandola"
														},
														{
															label: "Infonavit",
															value: "infonavit"
														},
														{
															label: "Crédito bancario",
															value: "credito_bancario"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_USelect, {
													modelValue: unref(state).housing_ownership_type,
													"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
													items: [
														{
															label: "Propia",
															value: "propia"
														},
														{
															label: "Rentada",
															value: "rentada"
														},
														{
															label: "Propia (en proceso de liquidar)",
															value: "liquidandola"
														},
														{
															label: "Infonavit",
															value: "infonavit"
														},
														{
															label: "Crédito bancario",
															value: "credito_bancario"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Años viviendo en el domicilio",
											name: "housing_years"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
													modelValue: unref(state).housing_years,
													"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
													class: "w-full",
													min: 0
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInputNumber, {
													modelValue: unref(state).housing_years,
													"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Dimensiones de la vivienda",
											name: "housing_dimensions"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).housing_dimensions,
													"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
													placeholder: "Ej. 120 m²",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).housing_dimensions,
													"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
													placeholder: "Ej. 120 m²",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Referencia laboral — nombre",
											name: "work_reference_name"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).work_reference_name,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).work_reference_name,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UFormField, {
											label: "Referencia laboral — teléfono",
											name: "work_reference_phone"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).work_reference_phone,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).work_reference_phone,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div><div class="rounded-lg border border-default p-4"${_scopeId}><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"${_scopeId}> Solicitud de crédito </p>`);
										_push(ssrRenderComponent(_component_UFormField, {
											required: "",
											label: "Crédito solicitado",
											name: "requested_credit_limit",
											class: "max-w-xs"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInput, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													type: "number",
													min: "0",
													step: "100",
													class: "w-full"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInput, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													type: "number",
													min: "0",
													step: "100",
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
											disabled: unref(submitting),
											onClick: ($event) => editing.value = false
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UButton, {
											label: "Guardar corrección",
											color: "primary",
											variant: "solid",
											type: "submit",
											loading: unref(submitting)
										}, null, _parent, _scopeId));
										_push(`</div>`);
									} else return [
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Datos personales "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
											createVNode(_component_UFormField, {
												required: "",
												label: "Nombre",
												name: "first_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).first_name,
													"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Segundo nombre",
												name: "middle_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).middle_name,
													"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Apellido paterno",
												name: "last_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).last_name,
													"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Apellido materno",
												name: "second_last_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).second_last_name,
													"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Género",
												name: "gender"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).gender,
													"onUpdate:modelValue": ($event) => unref(state).gender = $event,
													items: [
														{
															label: "Masculino",
															value: "M"
														},
														{
															label: "Femenino",
															value: "F"
														},
														{
															label: "Otro",
															value: "OTHER"
														}
													],
													placeholder: "Seleccionar...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Fecha de nacimiento",
												name: "birth_date"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).birth_date,
													"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
													type: "date",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "CURP",
												name: "curp"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).curp,
													"onUpdate:modelValue": ($event) => unref(state).curp = $event,
													class: "w-full uppercase"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "RFC",
												name: "rfc"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).rfc,
													"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
													class: "w-full uppercase"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Teléfono de casa",
												name: "home_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).home_phone,
													"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Celular",
												name: "mobile_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).mobile_phone,
													"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Correo",
												name: "email"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).email,
													"onUpdate:modelValue": ($event) => unref(state).email = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Notas",
												name: "notes",
												class: "sm:col-span-2 lg:col-span-3"
											}, {
												default: withCtx(() => [createVNode(_component_UTextarea, {
													modelValue: unref(state).notes,
													"onUpdate:modelValue": ($event) => unref(state).notes = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])]),
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Domicilio "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
											createVNode(_component_UFormField, {
												required: "",
												label: "Calle",
												name: "street"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).street,
													"onUpdate:modelValue": ($event) => unref(state).street = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Número exterior",
												name: "external_number"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).external_number,
													"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Colonia",
												name: "neighborhood"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).neighborhood,
													"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Ciudad",
												name: "city"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).city,
													"onUpdate:modelValue": ($event) => unref(state).city = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Estado",
												name: "state"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).state,
													"onUpdate:modelValue": ($event) => unref(state).state = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "C.P.",
												name: "postal_code"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).postal_code,
													"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Referencias del domicilio",
												name: "street_references",
												class: "sm:col-span-2 lg:col-span-3"
											}, {
												default: withCtx(() => [createVNode(_component_UTextarea, {
													modelValue: unref(state).street_references,
													"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])]),
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("div", { class: "mb-3 flex items-center justify-between" }, [createVNode("p", { class: "text-xs font-medium uppercase tracking-wide text-muted" }, " Familiares y cónyuge "), createVNode(_component_UButton, {
											label: "Agregar familiar",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addFamilyMember
										})]), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 items-end gap-3 sm:grid-cols-4"
											}, [
												createVNode(_component_UFormField, { label: "Nombre" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: member.name,
														"onUpdate:modelValue": ($event) => member.name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Parentesco" }, {
													default: withCtx(() => [createVNode(_component_USelect, {
														modelValue: member.relationship,
														"onUpdate:modelValue": ($event) => member.relationship = $event,
														items: [
															{
																label: "Esposo(a) / Cónyuge",
																value: "Esposo(a)"
															},
															{
																label: "Padre / Madre",
																value: "Padre/Madre"
															},
															{
																label: "Hijo(a)",
																value: "Hijo(a)"
															},
															{
																label: "Hermano(a)",
																value: "Hermano(a)"
															},
															{
																label: "Otro",
																value: "Otro"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Teléfono" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: member.phone,
														"onUpdate:modelValue": ($event) => member.phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode("div", { class: "flex items-end gap-2" }, [createVNode(_component_UFormField, {
													label: "Edad",
													class: "flex-1"
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: member.age,
														"onUpdate:modelValue": ($event) => member.age = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024), createVNode(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(familyMembers).length === 1,
													onClick: ($event) => removeFamilyMember(index)
												}, null, 8, ["disabled", "onClick"])])
											]);
										}), 128))])]),
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
											createVNode(_component_UFormField, {
												label: "Trabaja o estudia",
												name: "occupation_type"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).occupation_type,
													"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
													items: [
														{
															label: "Trabaja",
															value: "trabaja"
														},
														{
															label: "Estudia",
															value: "estudia"
														},
														{
															label: "Otro",
															value: "otro"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Nombre del trabajo o escuela",
												name: "occupation_place"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_place,
													"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Puesto o grado",
												name: "occupation_position"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_position,
													"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Teléfono del trabajo o escuela",
												name: "occupation_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_phone,
													"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Antigüedad (años)",
												name: "occupation_years"
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).occupation_years,
													"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Ganancia al mes",
												name: "occupation_monthly_income"
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).occupation_monthly_income,
													"onUpdate:modelValue": ($event) => unref(state).occupation_monthly_income = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])]),
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("div", { class: "mb-3 flex items-center justify-between" }, [createVNode("p", { class: "text-xs font-medium uppercase tracking-wide text-muted" }, " Vehículos "), createVNode(_component_UButton, {
											label: "Agregar vehículo",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addVehicle
										})]), !unref(vehicles).length ? (openBlock(), createBlock("div", {
											key: 0,
											class: "text-sm text-dimmed"
										}, " El solicitante no tiene vehículos registrados. ")) : (openBlock(), createBlock("div", {
											key: 1,
											class: "space-y-3"
										}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(vehicles), (vehicle, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 items-end gap-3 md:grid-cols-5"
											}, [
												createVNode(_component_UFormField, { label: "Marca" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.brand,
														"onUpdate:modelValue": ($event) => vehicle.brand = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Modelo" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.model,
														"onUpdate:modelValue": ($event) => vehicle.model = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Año" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.year,
														"onUpdate:modelValue": ($event) => vehicle.year = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Placas" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.plates,
														"onUpdate:modelValue": ($event) => vehicle.plates = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													onClick: ($event) => removeVehicle(index)
												}, null, 8, ["onClick"])
											]);
										}), 128))]))]),
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Vivienda "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
											createVNode(_component_UFormField, {
												label: "Tenencia de la vivienda",
												name: "housing_ownership_type"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).housing_ownership_type,
													"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
													items: [
														{
															label: "Propia",
															value: "propia"
														},
														{
															label: "Rentada",
															value: "rentada"
														},
														{
															label: "Propia (en proceso de liquidar)",
															value: "liquidandola"
														},
														{
															label: "Infonavit",
															value: "infonavit"
														},
														{
															label: "Crédito bancario",
															value: "credito_bancario"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Años viviendo en el domicilio",
												name: "housing_years"
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).housing_years,
													"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Dimensiones de la vivienda",
												name: "housing_dimensions"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).housing_dimensions,
													"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
													placeholder: "Ej. 120 m²",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Referencia laboral — nombre",
												name: "work_reference_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).work_reference_name,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Referencia laboral — teléfono",
												name: "work_reference_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).work_reference_phone,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])]),
										createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Solicitud de crédito "), createVNode(_component_UFormField, {
											required: "",
											label: "Crédito solicitado",
											name: "requested_credit_limit",
											class: "max-w-xs"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).requested_credit_limit,
												"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
												type: "number",
												min: "0",
												step: "100",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})]),
										createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
											label: "Cancelar",
											color: "neutral",
											variant: "subtle",
											disabled: unref(submitting),
											onClick: ($event) => editing.value = false
										}, null, 8, ["disabled", "onClick"]), createVNode(_component_UButton, {
											label: "Guardar corrección",
											color: "primary",
											variant: "solid",
											type: "submit",
											loading: unref(submitting)
										}, null, 8, ["loading"])])
									];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(ssrRenderComponent(_component_ApplicationsApplicationDetailView, { detail: unref(detail) }, null, _parent, _scopeId));
							_push(`<!--]-->`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "max-h-[78vh] space-y-5 overflow-y-auto pr-1" }, [unref(detailLoading) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-10"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-6 animate-spin text-muted"
					})])) : unref(detailError) ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex items-center gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-triangle-alert",
						class: "size-4 shrink-0"
					}), createTextVNode(" No se pudo cargar el detalle de la solicitud. ")])) : unref(detail) ? (openBlock(), createBlock(Fragment, { key: 2 }, [
						createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "text-lg font-semibold text-highlighted" }, toDisplayString(unref(applicantFullName)(unref(detail).applicant)), 1), createVNode("p", { class: "text-xs text-muted" }, [createTextVNode(toDisplayString(unref(detail).branch?.name) + " ", 1), unref(detail).coordinator?.person ? (openBlock(), createBlock("span", { key: 0 }, " · Coordinador: " + toDisplayString(unref(applicantFullName)(unref(detail).coordinator.person)), 1)) : createCommentVNode("", true)])]), createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UBadge, {
							variant: "subtle",
							color: "warning"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(APPLICATION_STATUS_LABELS)[unref(detail).status] ?? unref(detail).status), 1)]),
							_: 1
						}), unref(canEdit) && !unref(editing) ? (openBlock(), createBlock(_component_UButton, {
							key: 0,
							label: "Corregir datos",
							icon: "i-lucide-pencil",
							color: "neutral",
							variant: "subtle",
							size: "xs",
							onClick: startEditing
						})) : createCommentVNode("", true)])]),
						!unref(canEdit) && !unref(editing) ? (openBlock(), createBlock(_component_UAlert, {
							key: 0,
							color: "neutral",
							variant: "subtle",
							icon: "i-lucide-info",
							title: "Solo lectura",
							description: "Solo el verificador asignado puede corregir esta solicitud, y únicamente mientras siga pendiente de verificación."
						})) : createCommentVNode("", true),
						unref(editing) ? (openBlock(), createBlock(_component_UForm, {
							key: 1,
							schema: unref(schema),
							state: unref(state),
							class: "space-y-5",
							onSubmit
						}, {
							default: withCtx(() => [
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Datos personales "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
									createVNode(_component_UFormField, {
										required: "",
										label: "Nombre",
										name: "first_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).first_name,
											"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Segundo nombre",
										name: "middle_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).middle_name,
											"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Apellido paterno",
										name: "last_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).last_name,
											"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Apellido materno",
										name: "second_last_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).second_last_name,
											"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Género",
										name: "gender"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).gender,
											"onUpdate:modelValue": ($event) => unref(state).gender = $event,
											items: [
												{
													label: "Masculino",
													value: "M"
												},
												{
													label: "Femenino",
													value: "F"
												},
												{
													label: "Otro",
													value: "OTHER"
												}
											],
											placeholder: "Seleccionar...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Fecha de nacimiento",
										name: "birth_date"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).birth_date,
											"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
											type: "date",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "CURP",
										name: "curp"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).curp,
											"onUpdate:modelValue": ($event) => unref(state).curp = $event,
											class: "w-full uppercase"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "RFC",
										name: "rfc"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).rfc,
											"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
											class: "w-full uppercase"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Teléfono de casa",
										name: "home_phone"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).home_phone,
											"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Celular",
										name: "mobile_phone"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).mobile_phone,
											"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Correo",
										name: "email"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).email,
											"onUpdate:modelValue": ($event) => unref(state).email = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Notas",
										name: "notes",
										class: "sm:col-span-2 lg:col-span-3"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Domicilio "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
									createVNode(_component_UFormField, {
										required: "",
										label: "Calle",
										name: "street"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).street,
											"onUpdate:modelValue": ($event) => unref(state).street = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Número exterior",
										name: "external_number"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).external_number,
											"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Colonia",
										name: "neighborhood"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).neighborhood,
											"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Ciudad",
										name: "city"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).city,
											"onUpdate:modelValue": ($event) => unref(state).city = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Estado",
										name: "state"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).state,
											"onUpdate:modelValue": ($event) => unref(state).state = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "C.P.",
										name: "postal_code"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).postal_code,
											"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Referencias del domicilio",
										name: "street_references",
										class: "sm:col-span-2 lg:col-span-3"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).street_references,
											"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("div", { class: "mb-3 flex items-center justify-between" }, [createVNode("p", { class: "text-xs font-medium uppercase tracking-wide text-muted" }, " Familiares y cónyuge "), createVNode(_component_UButton, {
									label: "Agregar familiar",
									icon: "i-lucide-plus",
									size: "xs",
									variant: "subtle",
									onClick: addFamilyMember
								})]), createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
									return openBlock(), createBlock("div", {
										key: index,
										class: "grid grid-cols-1 items-end gap-3 sm:grid-cols-4"
									}, [
										createVNode(_component_UFormField, { label: "Nombre" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: member.name,
												"onUpdate:modelValue": ($event) => member.name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Parentesco" }, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: member.relationship,
												"onUpdate:modelValue": ($event) => member.relationship = $event,
												items: [
													{
														label: "Esposo(a) / Cónyuge",
														value: "Esposo(a)"
													},
													{
														label: "Padre / Madre",
														value: "Padre/Madre"
													},
													{
														label: "Hijo(a)",
														value: "Hijo(a)"
													},
													{
														label: "Hermano(a)",
														value: "Hermano(a)"
													},
													{
														label: "Otro",
														value: "Otro"
													}
												],
												placeholder: "Selecciona...",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Teléfono" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: member.phone,
												"onUpdate:modelValue": ($event) => member.phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode("div", { class: "flex items-end gap-2" }, [createVNode(_component_UFormField, {
											label: "Edad",
											class: "flex-1"
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: member.age,
												"onUpdate:modelValue": ($event) => member.age = $event,
												class: "w-full",
												min: 0
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024), createVNode(_component_UButton, {
											icon: "i-lucide-trash",
											color: "error",
											variant: "ghost",
											disabled: unref(familyMembers).length === 1,
											onClick: ($event) => removeFamilyMember(index)
										}, null, 8, ["disabled", "onClick"])])
									]);
								}), 128))])]),
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
									createVNode(_component_UFormField, {
										label: "Trabaja o estudia",
										name: "occupation_type"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).occupation_type,
											"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
											items: [
												{
													label: "Trabaja",
													value: "trabaja"
												},
												{
													label: "Estudia",
													value: "estudia"
												},
												{
													label: "Otro",
													value: "otro"
												}
											],
											placeholder: "Selecciona...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Nombre del trabajo o escuela",
										name: "occupation_place"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).occupation_place,
											"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Puesto o grado",
										name: "occupation_position"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).occupation_position,
											"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Teléfono del trabajo o escuela",
										name: "occupation_phone"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).occupation_phone,
											"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Antigüedad (años)",
										name: "occupation_years"
									}, {
										default: withCtx(() => [createVNode(_component_UInputNumber, {
											modelValue: unref(state).occupation_years,
											"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
											class: "w-full",
											min: 0
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Ganancia al mes",
										name: "occupation_monthly_income"
									}, {
										default: withCtx(() => [createVNode(_component_UInputNumber, {
											modelValue: unref(state).occupation_monthly_income,
											"onUpdate:modelValue": ($event) => unref(state).occupation_monthly_income = $event,
											class: "w-full",
											min: 0
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("div", { class: "mb-3 flex items-center justify-between" }, [createVNode("p", { class: "text-xs font-medium uppercase tracking-wide text-muted" }, " Vehículos "), createVNode(_component_UButton, {
									label: "Agregar vehículo",
									icon: "i-lucide-plus",
									size: "xs",
									variant: "subtle",
									onClick: addVehicle
								})]), !unref(vehicles).length ? (openBlock(), createBlock("div", {
									key: 0,
									class: "text-sm text-dimmed"
								}, " El solicitante no tiene vehículos registrados. ")) : (openBlock(), createBlock("div", {
									key: 1,
									class: "space-y-3"
								}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(vehicles), (vehicle, index) => {
									return openBlock(), createBlock("div", {
										key: index,
										class: "grid grid-cols-1 items-end gap-3 md:grid-cols-5"
									}, [
										createVNode(_component_UFormField, { label: "Marca" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: vehicle.brand,
												"onUpdate:modelValue": ($event) => vehicle.brand = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Modelo" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: vehicle.model,
												"onUpdate:modelValue": ($event) => vehicle.model = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Año" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: vehicle.year,
												"onUpdate:modelValue": ($event) => vehicle.year = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Placas" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: vehicle.plates,
												"onUpdate:modelValue": ($event) => vehicle.plates = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UButton, {
											icon: "i-lucide-trash",
											color: "error",
											variant: "ghost",
											onClick: ($event) => removeVehicle(index)
										}, null, 8, ["onClick"])
									]);
								}), 128))]))]),
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Vivienda "), createVNode("div", { class: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
									createVNode(_component_UFormField, {
										label: "Tenencia de la vivienda",
										name: "housing_ownership_type"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).housing_ownership_type,
											"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
											items: [
												{
													label: "Propia",
													value: "propia"
												},
												{
													label: "Rentada",
													value: "rentada"
												},
												{
													label: "Propia (en proceso de liquidar)",
													value: "liquidandola"
												},
												{
													label: "Infonavit",
													value: "infonavit"
												},
												{
													label: "Crédito bancario",
													value: "credito_bancario"
												}
											],
											placeholder: "Selecciona...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Años viviendo en el domicilio",
										name: "housing_years"
									}, {
										default: withCtx(() => [createVNode(_component_UInputNumber, {
											modelValue: unref(state).housing_years,
											"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
											class: "w-full",
											min: 0
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Dimensiones de la vivienda",
										name: "housing_dimensions"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).housing_dimensions,
											"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
											placeholder: "Ej. 120 m²",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Referencia laboral — nombre",
										name: "work_reference_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).work_reference_name,
											"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Referencia laboral — teléfono",
										name: "work_reference_phone"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).work_reference_phone,
											"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								createVNode("div", { class: "rounded-lg border border-default p-4" }, [createVNode("p", { class: "mb-3 text-xs font-medium uppercase tracking-wide text-muted" }, " Solicitud de crédito "), createVNode(_component_UFormField, {
									required: "",
									label: "Crédito solicitado",
									name: "requested_credit_limit",
									class: "max-w-xs"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).requested_credit_limit,
										"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
										type: "number",
										min: "0",
										step: "100",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									disabled: unref(submitting),
									onClick: ($event) => editing.value = false
								}, null, 8, ["disabled", "onClick"]), createVNode(_component_UButton, {
									label: "Guardar corrección",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, ["loading"])])
							]),
							_: 1
						}, 8, ["schema", "state"])) : (openBlock(), createBlock(_component_ApplicationsApplicationDetailView, {
							key: 2,
							detail: unref(detail)
						}, null, 8, ["detail"]))
					], 64)) : createCommentVNode("", true)])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/verificador/ApplicationDetailModal.vue
var _sfc_setup$1 = ApplicationDetailModal_vue_vue_type_script_setup_true_lang_default.setup;
ApplicationDetailModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/verificador/ApplicationDetailModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ApplicationDetailModal_default = Object.assign(ApplicationDetailModal_vue_vue_type_script_setup_true_lang_default, { __name: "VerificadorApplicationDetailModal" });
//#endregion
//#region app/pages/registro-verificacion/verificador/solicitudes.vue?vue&type=script&setup=true&lang.ts
var solicitudes_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "solicitudes",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { user } = useAuth();
		const { listApplications } = useApplications();
		const statusFilter = ref("EN_REVISION");
		const statusItems = [{
			label: "Pendientes de verificación",
			value: "EN_REVISION"
		}, {
			label: "Todas mis solicitudes",
			value: "all"
		}];
		const { data: applications, status, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("verificador-solicitudes", async () => {
			return (await listApplications({
				status: statusFilter.value === "all" ? void 0 : statusFilter.value,
				per_page: 100
			})).data;
		}, { watch: [statusFilter] })), __temp = await __temp, __restore(), __temp);
		const myApplications = computed(() => {
			const uid = user.value?.id;
			return (applications.value ?? []).filter((app) => app.assigned_verifier_id === uid);
		});
		const isDetailOpen = ref(false);
		const selectedApplicationId = ref(null);
		function openDetail(app) {
			selectedApplicationId.value = app.id;
			isDetailOpen.value = true;
		}
		const isVerifyOpen = ref(false);
		const selectedApplication = ref(null);
		function openVerify(app) {
			selectedApplication.value = app;
			isVerifyOpen.value = true;
		}
		function fmtDate(value) {
			if (!value) return "—";
			return new Date(value).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
		}
		const columns = [
			{
				accessorKey: "id",
				header: "ID"
			},
			{
				accessorKey: "applicant",
				header: "Solicitante",
				cell: ({ row }) => h("div", { class: "font-medium text-highlighted" }, applicantFullName(row.original.applicant))
			},
			{
				accessorKey: "phone",
				header: "Teléfono",
				cell: ({ row }) => row.original.applicant?.mobile_phone || row.original.applicant?.home_phone || "—"
			},
			{
				accessorKey: "branch",
				header: "Sucursal",
				cell: ({ row }) => row.original.branch?.name ?? "—"
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => {
					const value = row.original.status;
					return h(_sfc_main$5, {
						variant: "subtle",
						color: value === "POSIBLE_DISTRIBUIDORA" ? "success" : value === "RECHAZADA" ? "error" : value === "EN_REVISION" ? "warning" : "neutral"
					}, () => APPLICATION_STATUS_LABELS[value] ?? value);
				}
			},
			{
				accessorKey: "submitted_at",
				header: "Fecha de envío",
				cell: ({ row }) => fmtDate(row.original.submitted_at)
			},
			{
				id: "actions",
				header: "",
				cell: ({ row }) => h("div", { class: "flex justify-end gap-2" }, [h(_sfc_main$6, {
					label: "Ver detalle",
					icon: "i-lucide-eye",
					color: "neutral",
					variant: "subtle",
					size: "xs",
					onClick: () => openDetail(row.original)
				}), row.original.status === "EN_REVISION" ? h(_sfc_main$6, {
					label: "Verificar",
					icon: "i-lucide-shield-check",
					color: "primary",
					variant: "solid",
					size: "xs",
					onClick: () => openVerify(row.original)
				}) : null])
			}
		];
		async function onUpdatedOrVerified() {
			await refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$3;
			const _component_UDashboardSidebarCollapse = _sfc_main$4;
			const _component_USelect = _sfc_main;
			const _component_UTable = _sfc_main$2;
			const _component_VerificadorApplicationDetailModal = ApplicationDetailModal_default;
			const _component_VerificadorVerifyModal = VerifyModal_default;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "verificador-solicitudes" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Solicitudes" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Solicitudes" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6 space-y-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Solicitudes de distribuidora </h3>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: statusItems,
							class: "min-w-56"
						}, null, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UTable, {
							data: unref(myApplications),
							columns,
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, {
							empty: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No tienes solicitudes que coincidan con el filtro seleccionado. </div>`);
								else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No tienes solicitudes que coincidan con el filtro seleccionado. ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "p-6 space-y-4" }, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes de distribuidora "), createVNode(_component_USelect, {
						modelValue: unref(statusFilter),
						"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
						items: statusItems,
						class: "min-w-56"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode(_component_UTable, {
						data: unref(myApplications),
						columns,
						loading: unref(status) === "pending",
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, {
						empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No tienes solicitudes que coincidan con el filtro seleccionado. ")]),
						_: 1
					}, 8, ["data", "loading"])])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_VerificadorApplicationDetailModal, {
				open: unref(isDetailOpen),
				"onUpdate:open": ($event) => isRef(isDetailOpen) ? isDetailOpen.value = $event : null,
				"application-id": unref(selectedApplicationId),
				onUpdated: onUpdatedOrVerified
			}, null, _parent));
			_push(ssrRenderComponent(_component_VerificadorVerifyModal, {
				open: unref(isVerifyOpen),
				"onUpdate:open": ($event) => isRef(isVerifyOpen) ? isVerifyOpen.value = $event : null,
				application: unref(selectedApplication),
				onVerified: onUpdatedOrVerified
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/verificador/solicitudes.vue
var _sfc_setup = solicitudes_vue_vue_type_script_setup_true_lang_default.setup;
solicitudes_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/verificador/solicitudes.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var solicitudes_default = solicitudes_vue_vue_type_script_setup_true_lang_default;

export { solicitudes_default as default };
//# sourceMappingURL=solicitudes-B9kp15OX.mjs.map
