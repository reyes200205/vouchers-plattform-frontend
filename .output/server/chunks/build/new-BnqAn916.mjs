import { ai as useAuth, aL as useToast, aH as useRouter, ah as useAsyncData, h as _sfc_main$7$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$5 } from './Select-CbAcVpFw.mjs';
import { _ as _sfc_main$7 } from './InputNumber-CDbcCWSN.mjs';
import { _ as _sfc_main$4 } from './FormField-DOShaxcI.mjs';
import { _ as _sfc_main$6 } from './Input-3L6phQUN.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$8 } from './DashboardSidebarCollapse-c-FuL4zB.mjs';
import { _ as _sfc_main$3 } from './Card-qzRCEhtm.mjs';
import { _ as _sfc_main$1 } from './Form-DpngGyYw.mjs';
import { u as useBranches } from './useBranches-CH2_X1yJ.mjs';
import { _ as _sfc_main } from './Alert-BVKm-t4N.mjs';
import { u as useApplications } from './useApplications-B8UXo9S3.mjs';
import { defineComponent, computed, withAsyncContext, reactive, ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
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
import './PopperArrow-DMsSsDHm.mjs';
import './utils-C-SN97Al.mjs';
import './useTypeahead-JOpfisYr.mjs';
import './useFormControl-BySKHRcT.mjs';
import './useComposing-D1bdBmsI.mjs';
import './useKbd-rvMsbidG.mjs';
import './VisuallyHiddenInput-DOPBYbfB.mjs';
import './DashboardSidebarToggle-BxKXl3gw.mjs';

//#region app/pages/registro-verificacion/new.vue?vue&type=script&setup=true&lang.ts
var new_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { roleCode, user } = useAuth();
		const isCoordinator = computed(() => roleCode.value === "coordinator");
		const { listBranches } = useBranches();
		const { createApplication } = useApplications();
		const toast = useToast();
		const router = useRouter();
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("registro-verificacion-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const coordinatorBranchId = computed(() => {
			return (user.value?.roles?.find((r) => r.code === "coordinator"))?.branch_id ?? null;
		});
		const branchItems = computed(() => (branches.value ?? []).map((b) => ({
			label: `${b.name} (${b.code})`,
			value: b.id
		})));
		const schema = z.object({
			branch_id: z.number({ error: "Selecciona una sucursal" }),
			first_name: z.string().min(2, "Muy corto"),
			middle_name: z.string().optional(),
			last_name: z.string().min(2, "Muy corto"),
			second_last_name: z.string().optional(),
			gender: z.string().optional(),
			birth_date: z.string().optional(),
			curp: z.string().optional(),
			rfc: z.string().optional(),
			home_phone: z.string().optional(),
			mobile_phone: z.string().optional(),
			email: z.union([z.string().email("Correo inválido"), z.literal("")]).optional(),
			street: z.string().optional(),
			external_number: z.string().optional(),
			neighborhood: z.string().optional(),
			city: z.string().optional(),
			state: z.string().optional(),
			postal_code: z.string().optional(),
			notes: z.string().optional(),
			requested_credit_limit: z.number().optional(),
			housing_type: z.string().optional(),
			housing_years: z.number().optional()
		});
		const state = reactive({
			branch_id: coordinatorBranchId.value ?? void 0,
			first_name: "",
			middle_name: "",
			last_name: "",
			second_last_name: "",
			gender: void 0,
			birth_date: "",
			curp: "",
			rfc: "",
			home_phone: "",
			mobile_phone: "",
			email: "",
			street: "",
			external_number: "",
			neighborhood: "",
			city: "",
			state: "",
			postal_code: "",
			notes: "",
			requested_credit_limit: void 0,
			housing_type: void 0,
			housing_years: void 0
		});
		const familyReferences = ref([{
			name: "",
			relationship: "",
			phone: ""
		}]);
		function addFamilyReference() {
			familyReferences.value.push({
				name: "",
				relationship: "",
				phone: ""
			});
		}
		function removeFamilyReference(index) {
			familyReferences.value.splice(index, 1);
		}
		const externalAffiliations = ref([{
			organization: "",
			membershipType: ""
		}]);
		function addExternalAffiliation() {
			externalAffiliations.value.push({
				organization: "",
				membershipType: ""
			});
		}
		function removeExternalAffiliation(index) {
			externalAffiliations.value.splice(index, 1);
		}
		const documentFields = [
			{
				key: "facade",
				label: "Fotografía de fachada"
			},
			{
				key: "id_front",
				label: "INE (frontal)"
			},
			{
				key: "id_back",
				label: "INE (reverso)"
			},
			{
				key: "proof_of_address",
				label: "Comprobante de domicilio"
			},
			{
				key: "credit_bureau_report",
				label: "Reporte de buró de crédito"
			}
		];
		const submitting = ref(false);
		async function onSubmit(event) {
			submitting.value = true;
			const data = event.data;
			try {
				const application = await createApplication({
					branch_id: data.branch_id,
					person: {
						first_name: data.first_name,
						middle_name: data.middle_name || void 0,
						last_name: data.last_name,
						second_last_name: data.second_last_name || void 0,
						gender: data.gender || void 0,
						birth_date: data.birth_date || void 0,
						curp: data.curp || void 0,
						rfc: data.rfc || void 0,
						home_phone: data.home_phone || void 0,
						mobile_phone: data.mobile_phone || void 0,
						email: data.email || void 0,
						street: data.street || void 0,
						external_number: data.external_number || void 0,
						neighborhood: data.neighborhood || void 0,
						city: data.city || void 0,
						state: data.state || void 0,
						postal_code: data.postal_code || void 0,
						notes: data.notes || void 0
					},
					family_data: {
						references: familyReferences.value.filter((r) => r.name || r.relationship || r.phone),
						housing: {
							type: data.housing_type || null,
							years_at_address: data.housing_years ?? null
						}
					},
					external_affiliations: { affiliations: externalAffiliations.value.filter((a) => a.organization || a.membershipType) },
					requested_credit_limit: data.requested_credit_limit ?? null,
					id_front_path: null,
					id_back_path: null,
					proof_of_address_path: null,
					credit_bureau_report_path: null
				});
				toast.add({
					title: "Solicitud registrada",
					description: `La solicitud #${application.id} fue enviada a revisión.`,
					color: "success"
				});
				await router.push("/registro-verificacion/list");
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo registrar la solicitud. Verifica los datos e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_UAlert = _sfc_main;
			const _component_UForm = _sfc_main$1;
			const _component_UCard = _sfc_main$3;
			const _component_UFormField = _sfc_main$4;
			const _component_USelect = _sfc_main$5;
			const _component_UInput = _sfc_main$6;
			const _component_UInputNumber = _sfc_main$7;
			const _component_UButton = _sfc_main$7$1;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "register-distributors-new" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Alta de Distribuidor" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Alta de Distribuidor" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (!unref(isCoordinator)) {
						_push(`<div class="p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAlert, {
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-lock",
							title: "Acceso restringido",
							description: "Solo el rol Coordinador puede registrar nuevas solicitudes de distribuidora."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else _push(ssrRenderComponent(_component_UForm, {
						id: "new-application",
						schema: unref(schema),
						state: unref(state),
						class: "p-6 space-y-6 max-w-4xl",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Sucursal </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Sucursal ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UFormField, {
											label: "Sucursal",
											name: "branch_id",
											required: ""
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_USelect, {
													modelValue: unref(state).branch_id,
													"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
													items: unref(branchItems),
													placeholder: "Selecciona la sucursal...",
													class: "w-full max-w-sm"
												}, null, _parent, _scopeId));
												else return [createVNode(_component_USelect, {
													modelValue: unref(state).branch_id,
													"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
													items: unref(branchItems),
													placeholder: "Selecciona la sucursal...",
													class: "w-full max-w-sm"
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"items"
												])];
											}),
											_: 1
										}, _parent, _scopeId));
										else return [createVNode(_component_UFormField, {
											label: "Sucursal",
											name: "branch_id",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(state).branch_id,
												"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
												items: unref(branchItems),
												placeholder: "Selecciona la sucursal...",
												class: "w-full max-w-sm"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"items"
											])]),
											_: 1
										})];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Datos Personales del Solicitante </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Datos Personales del Solicitante ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Nombre(s)",
												name: "first_name",
												required: ""
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
												label: "Apellido paterno",
												name: "last_name",
												required: ""
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
														placeholder: "Selecciona...",
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
														placeholder: "Selecciona...",
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
												label: "CURP",
												name: "curp"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).curp,
														"onUpdate:modelValue": ($event) => unref(state).curp = $event,
														class: "w-full",
														maxlength: "18"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).curp,
														"onUpdate:modelValue": ($event) => unref(state).curp = $event,
														class: "w-full",
														maxlength: "18"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "RFC",
												name: "rfc"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).rfc,
														"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
														class: "w-full",
														maxlength: "13"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).rfc,
														"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
														class: "w-full",
														maxlength: "13"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Teléfono fijo",
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
												label: "Teléfono móvil",
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
												label: "Correo electrónico",
												name: "email"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).email,
														"onUpdate:modelValue": ($event) => unref(state).email = $event,
														type: "email",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).email,
														"onUpdate:modelValue": ($event) => unref(state).email = $event,
														type: "email",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Nombre(s)",
												name: "first_name",
												required: ""
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
												label: "Apellido paterno",
												name: "last_name",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).last_name,
													"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
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
													placeholder: "Selecciona...",
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
												label: "CURP",
												name: "curp"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).curp,
													"onUpdate:modelValue": ($event) => unref(state).curp = $event,
													class: "w-full",
													maxlength: "18"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "RFC",
												name: "rfc"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).rfc,
													"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
													class: "w-full",
													maxlength: "13"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Teléfono fijo",
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
												label: "Teléfono móvil",
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
												label: "Correo electrónico",
												name: "email"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).email,
													"onUpdate:modelValue": ($event) => unref(state).email = $event,
													type: "email",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Domicilio y Vivienda </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Domicilio y Vivienda ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
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
												label: "Código postal",
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
												label: "Tipo de vivienda",
												name: "housing_type"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_USelect, {
														modelValue: unref(state).housing_type,
														"onUpdate:modelValue": ($event) => unref(state).housing_type = $event,
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
																label: "Familiar",
																value: "familiar"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_USelect, {
														modelValue: unref(state).housing_type,
														"onUpdate:modelValue": ($event) => unref(state).housing_type = $event,
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
																label: "Familiar",
																value: "familiar"
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
											_push(`</div>`);
										} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
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
												label: "Código postal",
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
												label: "Tipo de vivienda",
												name: "housing_type"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).housing_type,
													"onUpdate:modelValue": ($event) => unref(state).housing_type = $event,
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
															label: "Familiar",
															value: "familiar"
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
											})
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Referencias Familiares </h3>`);
											_push(ssrRenderComponent(_component_UButton, {
												label: "Agregar referencia",
												icon: "i-lucide-plus",
												size: "xs",
												variant: "subtle",
												onClick: addFamilyReference
											}, null, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Referencias Familiares "), createVNode(_component_UButton, {
											label: "Agregar referencia",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addFamilyReference
										})])];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
											ssrRenderList(unref(familyReferences), (reference, index) => {
												_push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, { label: "Nombre" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: reference.name,
															"onUpdate:modelValue": ($event) => reference.name = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: reference.name,
															"onUpdate:modelValue": ($event) => reference.name = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Parentesco" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: reference.relationship,
															"onUpdate:modelValue": ($event) => reference.relationship = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: reference.relationship,
															"onUpdate:modelValue": ($event) => reference.relationship = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Teléfono" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: reference.phone,
															"onUpdate:modelValue": ($event) => reference.phone = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: reference.phone,
															"onUpdate:modelValue": ($event) => reference.phone = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(familyReferences).length === 1,
													onClick: ($event) => removeFamilyReference(index)
												}, null, _parent, _scopeId));
												_push(`</div>`);
											});
											_push(`<!--]--></div>`);
										} else return [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyReferences), (reference, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
											}, [
												createVNode(_component_UFormField, { label: "Nombre" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: reference.name,
														"onUpdate:modelValue": ($event) => reference.name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Parentesco" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: reference.relationship,
														"onUpdate:modelValue": ($event) => reference.relationship = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Teléfono" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: reference.phone,
														"onUpdate:modelValue": ($event) => reference.phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(familyReferences).length === 1,
													onClick: ($event) => removeFamilyReference(index)
												}, null, 8, ["disabled", "onClick"])
											]);
										}), 128))])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Afiliación Externa </h3>`);
											_push(ssrRenderComponent(_component_UButton, {
												label: "Agregar afiliación",
												icon: "i-lucide-plus",
												size: "xs",
												variant: "subtle",
												onClick: addExternalAffiliation
											}, null, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Afiliación Externa "), createVNode(_component_UButton, {
											label: "Agregar afiliación",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addExternalAffiliation
										})])];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
											ssrRenderList(unref(externalAffiliations), (affiliation, index) => {
												_push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, { label: "Organización / Institución" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: affiliation.organization,
															"onUpdate:modelValue": ($event) => affiliation.organization = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: affiliation.organization,
															"onUpdate:modelValue": ($event) => affiliation.organization = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Tipo de afiliación" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: affiliation.membershipType,
															"onUpdate:modelValue": ($event) => affiliation.membershipType = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: affiliation.membershipType,
															"onUpdate:modelValue": ($event) => affiliation.membershipType = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(externalAffiliations).length === 1,
													onClick: ($event) => removeExternalAffiliation(index)
												}, null, _parent, _scopeId));
												_push(`</div>`);
											});
											_push(`<!--]--></div>`);
										} else return [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(externalAffiliations), (affiliation, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
											}, [
												createVNode(_component_UFormField, { label: "Organización / Institución" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: affiliation.organization,
														"onUpdate:modelValue": ($event) => affiliation.organization = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Tipo de afiliación" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: affiliation.membershipType,
														"onUpdate:modelValue": ($event) => affiliation.membershipType = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(externalAffiliations).length === 1,
													onClick: ($event) => removeExternalAffiliation(index)
												}, null, 8, ["disabled", "onClick"])
											]);
										}), 128))])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Límite Solicitado </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Límite Solicitado ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UFormField, {
											label: "Límite de crédito solicitado",
											name: "requested_credit_limit"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													class: "w-full max-w-sm",
													min: 0
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInputNumber, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													class: "w-full max-w-sm",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										else return [createVNode(_component_UFormField, {
											label: "Límite de crédito solicitado",
											name: "requested_credit_limit"
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).requested_credit_limit,
												"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
												class: "w-full max-w-sm",
												min: 0
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Documentos Escaneados </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Documentos Escaneados ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_UAlert, {
												color: "neutral",
												variant: "subtle",
												icon: "i-lucide-info",
												title: "Subida de archivos pendiente",
												description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
												class: "mb-4"
											}, null, _parent, _scopeId));
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
											ssrRenderList(documentFields, (doc) => {
												_push(ssrRenderComponent(_component_UFormField, {
													key: doc.key,
													label: doc.label
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															type: "file",
															disabled: "",
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															type: "file",
															disabled: "",
															class: "w-full"
														})];
													}),
													_: 2
												}, _parent, _scopeId));
											});
											_push(`<!--]--></div>`);
										} else return [createVNode(_component_UAlert, {
											color: "neutral",
											variant: "subtle",
											icon: "i-lucide-info",
											title: "Subida de archivos pendiente",
											description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
											class: "mb-4"
										}), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [(openBlock(), createBlock(Fragment, null, renderList(documentFields, (doc) => {
											return createVNode(_component_UFormField, {
												key: doc.key,
												label: doc.label
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													type: "file",
													disabled: "",
													class: "w-full"
												})]),
												_: 1
											}, 8, ["label"]);
										}), 64))])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									to: "/registro-verificacion"
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Registrar Solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Sucursal ")]),
									default: withCtx(() => [createVNode(_component_UFormField, {
										label: "Sucursal",
										name: "branch_id",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).branch_id,
											"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
											items: unref(branchItems),
											placeholder: "Selecciona la sucursal...",
											class: "w-full max-w-sm"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items"
										])]),
										_: 1
									})]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Personales del Solicitante ")]),
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Nombre(s)",
											name: "first_name",
											required: ""
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
											label: "Apellido paterno",
											name: "last_name",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).last_name,
												"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
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
												placeholder: "Selecciona...",
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
											label: "CURP",
											name: "curp"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).curp,
												"onUpdate:modelValue": ($event) => unref(state).curp = $event,
												class: "w-full",
												maxlength: "18"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "RFC",
											name: "rfc"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).rfc,
												"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
												class: "w-full",
												maxlength: "13"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Teléfono fijo",
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
											label: "Teléfono móvil",
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
											label: "Correo electrónico",
											name: "email"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).email,
												"onUpdate:modelValue": ($event) => unref(state).email = $event,
												type: "email",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Domicilio y Vivienda ")]),
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
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
											label: "Código postal",
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
											label: "Tipo de vivienda",
											name: "housing_type"
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(state).housing_type,
												"onUpdate:modelValue": ($event) => unref(state).housing_type = $event,
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
														label: "Familiar",
														value: "familiar"
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
										})
									])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Referencias Familiares "), createVNode(_component_UButton, {
										label: "Agregar referencia",
										icon: "i-lucide-plus",
										size: "xs",
										variant: "subtle",
										onClick: addFamilyReference
									})])]),
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyReferences), (reference, index) => {
										return openBlock(), createBlock("div", {
											key: index,
											class: "grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
										}, [
											createVNode(_component_UFormField, { label: "Nombre" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: reference.name,
													"onUpdate:modelValue": ($event) => reference.name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Parentesco" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: reference.relationship,
													"onUpdate:modelValue": ($event) => reference.relationship = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Teléfono" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: reference.phone,
													"onUpdate:modelValue": ($event) => reference.phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UButton, {
												icon: "i-lucide-trash",
												color: "error",
												variant: "ghost",
												disabled: unref(familyReferences).length === 1,
												onClick: ($event) => removeFamilyReference(index)
											}, null, 8, ["disabled", "onClick"])
										]);
									}), 128))])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Afiliación Externa "), createVNode(_component_UButton, {
										label: "Agregar afiliación",
										icon: "i-lucide-plus",
										size: "xs",
										variant: "subtle",
										onClick: addExternalAffiliation
									})])]),
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(externalAffiliations), (affiliation, index) => {
										return openBlock(), createBlock("div", {
											key: index,
											class: "grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
										}, [
											createVNode(_component_UFormField, { label: "Organización / Institución" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: affiliation.organization,
													"onUpdate:modelValue": ($event) => affiliation.organization = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Tipo de afiliación" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: affiliation.membershipType,
													"onUpdate:modelValue": ($event) => affiliation.membershipType = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UButton, {
												icon: "i-lucide-trash",
												color: "error",
												variant: "ghost",
												disabled: unref(externalAffiliations).length === 1,
												onClick: ($event) => removeExternalAffiliation(index)
											}, null, 8, ["disabled", "onClick"])
										]);
									}), 128))])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Límite Solicitado ")]),
									default: withCtx(() => [createVNode(_component_UFormField, {
										label: "Límite de crédito solicitado",
										name: "requested_credit_limit"
									}, {
										default: withCtx(() => [createVNode(_component_UInputNumber, {
											modelValue: unref(state).requested_credit_limit,
											"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
											class: "w-full max-w-sm",
											min: 0
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Documentos Escaneados ")]),
									default: withCtx(() => [createVNode(_component_UAlert, {
										color: "neutral",
										variant: "subtle",
										icon: "i-lucide-info",
										title: "Subida de archivos pendiente",
										description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
										class: "mb-4"
									}), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [(openBlock(), createBlock(Fragment, null, renderList(documentFields, (doc) => {
										return createVNode(_component_UFormField, {
											key: doc.key,
											label: doc.label
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												type: "file",
												disabled: "",
												class: "w-full"
											})]),
											_: 1
										}, 8, ["label"]);
									}), 64))])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									to: "/registro-verificacion"
								}), createVNode(_component_UButton, {
									label: "Registrar Solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, ["loading"])])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [!unref(isCoordinator) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-lock",
						title: "Acceso restringido",
						description: "Solo el rol Coordinador puede registrar nuevas solicitudes de distribuidora."
					})])) : (openBlock(), createBlock(_component_UForm, {
						key: 1,
						id: "new-application",
						schema: unref(schema),
						state: unref(state),
						class: "p-6 space-y-6 max-w-4xl",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Sucursal ")]),
								default: withCtx(() => [createVNode(_component_UFormField, {
									label: "Sucursal",
									name: "branch_id",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(state).branch_id,
										"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
										items: unref(branchItems),
										placeholder: "Selecciona la sucursal...",
										class: "w-full max-w-sm"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items"
									])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Personales del Solicitante ")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
									createVNode(_component_UFormField, {
										label: "Nombre(s)",
										name: "first_name",
										required: ""
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
										label: "Apellido paterno",
										name: "last_name",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).last_name,
											"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
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
											placeholder: "Selecciona...",
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
										label: "CURP",
										name: "curp"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).curp,
											"onUpdate:modelValue": ($event) => unref(state).curp = $event,
											class: "w-full",
											maxlength: "18"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "RFC",
										name: "rfc"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).rfc,
											"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
											class: "w-full",
											maxlength: "13"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Teléfono fijo",
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
										label: "Teléfono móvil",
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
										label: "Correo electrónico",
										name: "email"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).email,
											"onUpdate:modelValue": ($event) => unref(state).email = $event,
											type: "email",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Domicilio y Vivienda ")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
									createVNode(_component_UFormField, {
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
										label: "Código postal",
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
										label: "Tipo de vivienda",
										name: "housing_type"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).housing_type,
											"onUpdate:modelValue": ($event) => unref(state).housing_type = $event,
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
													label: "Familiar",
													value: "familiar"
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
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Referencias Familiares "), createVNode(_component_UButton, {
									label: "Agregar referencia",
									icon: "i-lucide-plus",
									size: "xs",
									variant: "subtle",
									onClick: addFamilyReference
								})])]),
								default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyReferences), (reference, index) => {
									return openBlock(), createBlock("div", {
										key: index,
										class: "grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
									}, [
										createVNode(_component_UFormField, { label: "Nombre" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: reference.name,
												"onUpdate:modelValue": ($event) => reference.name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Parentesco" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: reference.relationship,
												"onUpdate:modelValue": ($event) => reference.relationship = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Teléfono" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: reference.phone,
												"onUpdate:modelValue": ($event) => reference.phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UButton, {
											icon: "i-lucide-trash",
											color: "error",
											variant: "ghost",
											disabled: unref(familyReferences).length === 1,
											onClick: ($event) => removeFamilyReference(index)
										}, null, 8, ["disabled", "onClick"])
									]);
								}), 128))])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Afiliación Externa "), createVNode(_component_UButton, {
									label: "Agregar afiliación",
									icon: "i-lucide-plus",
									size: "xs",
									variant: "subtle",
									onClick: addExternalAffiliation
								})])]),
								default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(externalAffiliations), (affiliation, index) => {
									return openBlock(), createBlock("div", {
										key: index,
										class: "grid grid-cols-1 md:grid-cols-3 gap-3 items-end"
									}, [
										createVNode(_component_UFormField, { label: "Organización / Institución" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: affiliation.organization,
												"onUpdate:modelValue": ($event) => affiliation.organization = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Tipo de afiliación" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: affiliation.membershipType,
												"onUpdate:modelValue": ($event) => affiliation.membershipType = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UButton, {
											icon: "i-lucide-trash",
											color: "error",
											variant: "ghost",
											disabled: unref(externalAffiliations).length === 1,
											onClick: ($event) => removeExternalAffiliation(index)
										}, null, 8, ["disabled", "onClick"])
									]);
								}), 128))])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Límite Solicitado ")]),
								default: withCtx(() => [createVNode(_component_UFormField, {
									label: "Límite de crédito solicitado",
									name: "requested_credit_limit"
								}, {
									default: withCtx(() => [createVNode(_component_UInputNumber, {
										modelValue: unref(state).requested_credit_limit,
										"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
										class: "w-full max-w-sm",
										min: 0
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Documentos Escaneados ")]),
								default: withCtx(() => [createVNode(_component_UAlert, {
									color: "neutral",
									variant: "subtle",
									icon: "i-lucide-info",
									title: "Subida de archivos pendiente",
									description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
									class: "mb-4"
								}), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [(openBlock(), createBlock(Fragment, null, renderList(documentFields, (doc) => {
									return createVNode(_component_UFormField, {
										key: doc.key,
										label: doc.label
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											type: "file",
											disabled: "",
											class: "w-full"
										})]),
										_: 1
									}, 8, ["label"]);
								}), 64))])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								to: "/registro-verificacion"
							}), createVNode(_component_UButton, {
								label: "Registrar Solicitud",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"]))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/new.vue
var _sfc_setup = new_vue_vue_type_script_setup_true_lang_default.setup;
new_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/new.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var new_default = new_vue_vue_type_script_setup_true_lang_default;

export { new_default as default };
//# sourceMappingURL=new-BnqAn916.mjs.map
