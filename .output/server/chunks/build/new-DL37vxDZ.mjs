import { al as useAuth, aP as useToast, aL as useRouter, ak as useAsyncData, f as _sfc_main$6 } from '../virtual/entry.mjs';
import { _ as _sfc_main$5 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$3 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$4 } from './Input-BC1I0LeZ.mjs';
import { a as isValidRfc, i as isValidCurp, e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { a as _sfc_main$1, _ as _sfc_main$7 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main } from './Form-CCmdJDgC.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { _ as _sfc_main$2 } from './Card-CmMDF934.mjs';
import { u as useStaff } from './useStaff-C489DQX_.mjs';
import { defineComponent, ref, computed, withAsyncContext, reactive, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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

//#region app/pages/general/staff/new.vue?vue&type=script&setup=true&lang.ts
var new_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const STAFF_ROLE_CODES = [
			"coordinator",
			"verifier",
			"branch_manager",
			"cashier"
		];
		const BRANCH_MANAGER_ROLE_CODES = [
			"cashier",
			"coordinator",
			"verifier"
		];
		const schema = z.object({
			first_name: z.string().min(2, "Muy corto").max(100, "Muy largo"),
			middle_name: z.string().max(100, "Muy largo").optional(),
			last_name: z.string().min(2, "Muy corto").max(100, "Muy largo"),
			second_last_name: z.string().min(2, "Muy corto").max(100, "Muy largo"),
			gender: z.string().min(1, "Selecciona el género"),
			birth_date: z.string().min(1, "La fecha de nacimiento es obligatoria").superRefine((val, ctx) => {
				const birthDate = new Date(val);
				const today = /* @__PURE__ */ new Date();
				let age = today.getFullYear() - birthDate.getFullYear();
				const monthDiff = today.getMonth() - birthDate.getMonth();
				if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) age--;
				if (age < 18) ctx.addIssue({
					code: "custom",
					message: "El miembro de personal debe ser mayor de 18 años"
				});
			}),
			curp: z.string().superRefine((value, ctx) => {
				if (!value || value.length !== 18) {
					ctx.addIssue({
						code: "custom",
						message: "CURP inválida (18 caracteres)"
					});
					return;
				}
				if (!isValidCurp(value)) ctx.addIssue({
					code: "custom",
					message: "CURP con formato inválido"
				});
			}),
			rfc: z.string().superRefine((value, ctx) => {
				if (!value || value.length < 10 || value.length > 13) {
					ctx.addIssue({
						code: "custom",
						message: "RFC es obligatorio (10 a 13 caracteres)"
					});
					return;
				}
				if (!isValidRfc(value)) ctx.addIssue({
					code: "custom",
					message: "RFC con formato inválido"
				});
			}),
			mobile_phone: z.string().min(10, "Mínimo 10 dígitos").max(20, "Muy largo"),
			street: z.string().min(1, "La calle es obligatoria").max(150, "Muy largo"),
			external_number: z.string().min(1, "El número exterior es obligatorio").max(30, "Muy largo"),
			neighborhood: z.string().min(1, "La colonia es obligatoria").max(120, "Muy largo"),
			city: z.string().min(1, "La ciudad es obligatoria").max(120, "Muy largo"),
			state: z.string().min(1, "El estado es obligatorio").max(120, "Muy largo"),
			postal_code: z.string().min(5, "Código postal inválido").max(10, "Muy largo"),
			username: z.string().email("Correo inválido").max(80, "Muy largo"),
			password: z.string().min(8, "Mínimo 8 caracteres"),
			role_code: z.string().min(1, "Selecciona un rol"),
			branch_id: z.any().optional()
		}).superRefine((data, ctx) => {
			if (data.role_code !== "general_manager") {
				if (!data.branch_id || Number(data.branch_id) < 1) ctx.addIssue({
					path: ["branch_id"],
					code: "custom",
					message: "Selecciona una sucursal"
				});
			}
		});
		const { user } = useAuth();
		const { createStaff } = useStaff();
		const { listBranches } = useBranches();
		const toast = useToast();
		const router = useRouter();
		const submitting = ref(false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const isBranchManager = computed(() => user.value?.roles?.some((r) => r.code === "branch_manager") ?? false);
		const isSuperAdmin = computed(() => user.value?.roles?.some((r) => r.code === "super-admin") ?? false);
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("staff-new-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const roles = ref([]);
		const roleItems = computed(() => {
			const allowedRoles = [...STAFF_ROLE_CODES];
			if (isSuperAdmin.value) allowedRoles.push("general_manager");
			return (isBranchManager.value ? roles.value.filter((r) => BRANCH_MANAGER_ROLE_CODES.includes(r.code)) : roles.value.filter((r) => allowedRoles.includes(r.code))).map((r) => ({
				label: r.description || r.code,
				value: r.code
			}));
		});
		const branchItems = computed(() => {
			return (isBranchManager.value ? branches.value.filter((b) => b.id === branchManagerBranchId.value) : branches.value).map((b) => ({
				label: b.name,
				value: b.id.toString()
			}));
		});
		const state = reactive({
			first_name: "",
			middle_name: "",
			last_name: "",
			second_last_name: "",
			gender: void 0,
			birth_date: "",
			curp: "",
			rfc: "",
			mobile_phone: "",
			street: "",
			external_number: "",
			neighborhood: "",
			city: "",
			state: "",
			postal_code: "",
			username: "",
			password: "",
			role_code: isBranchManager.value ? "cashier" : void 0,
			branch_id: isBranchManager.value && branchManagerBranchId.value ? String(branchManagerBranchId.value) : void 0
		});
		watch(() => state.role_code, (newRole) => {
			if (newRole === "general_manager") state.branch_id = void 0;
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await createStaff({
					first_name: event.data.first_name,
					middle_name: event.data.middle_name || void 0,
					last_name: event.data.last_name,
					second_last_name: event.data.second_last_name,
					gender: event.data.gender,
					birth_date: event.data.birth_date,
					curp: event.data.curp,
					rfc: event.data.rfc,
					mobile_phone: event.data.mobile_phone,
					email: event.data.username,
					street: event.data.street,
					external_number: event.data.external_number,
					neighborhood: event.data.neighborhood,
					city: event.data.city,
					state: event.data.state,
					postal_code: event.data.postal_code,
					username: event.data.username,
					password: event.data.password,
					role_code: event.data.role_code,
					branch_id: Number(event.data.branch_id)
				});
				toast.add({
					title: "Personal creado",
					description: `${event.data.first_name} ${event.data.last_name} fue creado correctamente`,
					color: "success"
				});
				router.push("/general/staff");
			} catch (e) {
				const apiErrors = e?.data?.errors;
				if ((e?.status === 422 || e?.statusCode === 422) && apiErrors) {
					const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => ({
						name: field,
						message: messages[0] || "Dato inválido"
					}));
					formRef.value?.setErrors(formattedErrors);
				}
				toast.add({
					title: "Error",
					description: extractApiErrorMessage(e, "No se pudo crear el personal. Verifica los datos e intenta de nuevo."),
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		const formRef = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$7;
			const _component_UButton = _sfc_main$6;
			const _component_UForm = _sfc_main;
			const _component_UCard = _sfc_main$2;
			const _component_UFormField = _sfc_main$3;
			const _component_UInput = _sfc_main$4;
			const _component_USelect = _sfc_main$5;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "staff-new" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Nuevo Miembro del Personal" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-arrow-left",
								color: "neutral",
								variant: "ghost",
								to: "/general/staff"
							}, null, _parent, _scopeId));
							else return [createVNode(_component_UButton, {
								icon: "i-lucide-arrow-left",
								color: "neutral",
								variant: "ghost",
								to: "/general/staff"
							})];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Nuevo Miembro del Personal" }, {
						leading: withCtx(() => [createVNode(_component_UButton, {
							icon: "i-lucide-arrow-left",
							color: "neutral",
							variant: "ghost",
							to: "/general/staff"
						})]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="w-full p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UForm, {
							ref_key: "formRef",
							ref: formRef,
							schema: unref(schema),
							state: unref(state),
							class: "space-y-6",
							onSubmit
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UCard, null, {
										header: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Datos Personales</h3>`);
											else return [createVNode("h3", { class: "font-semibold text-base" }, "Datos Personales")];
										}),
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"${_scopeId}>`);
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
													required: "",
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
													required: "",
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
															class: "w-full uppercase",
															placeholder: "18 caracteres"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: unref(state).curp,
															"onUpdate:modelValue": ($event) => unref(state).curp = $event,
															class: "w-full uppercase",
															placeholder: "18 caracteres"
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
													required: "",
													label: "Celular",
													name: "mobile_phone",
													class: "md:col-span-1 lg:col-span-1"
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
												_push(`</div>`);
											} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
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
													required: "",
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
													required: "",
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
														class: "w-full uppercase",
														placeholder: "18 caracteres"
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
													required: "",
													label: "Celular",
													name: "mobile_phone",
													class: "md:col-span-1 lg:col-span-1"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).mobile_phone,
														"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
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
											if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Domicilio</h3>`);
											else return [createVNode("h3", { class: "font-semibold text-base" }, "Domicilio")];
										}),
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}>`);
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
												_push(`</div>`);
											} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
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
												})
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UCard, null, {
										header: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Datos de Acceso y Permisos</h3>`);
											else return [createVNode("h3", { class: "font-semibold text-base" }, "Datos de Acceso y Permisos")];
										}),
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, {
													required: "",
													label: "Nombre de usuario (Email)",
													name: "username"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: unref(state).username,
															"onUpdate:modelValue": ($event) => unref(state).username = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: unref(state).username,
															"onUpdate:modelValue": ($event) => unref(state).username = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, {
													required: "",
													label: "Contraseña",
													name: "password"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: unref(state).password,
															"onUpdate:modelValue": ($event) => unref(state).password = $event,
															type: "password",
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: unref(state).password,
															"onUpdate:modelValue": ($event) => unref(state).password = $event,
															type: "password",
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, {
													required: "",
													label: "Rol",
													name: "role_code"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_USelect, {
															modelValue: unref(state).role_code,
															"onUpdate:modelValue": ($event) => unref(state).role_code = $event,
															items: unref(roleItems),
															placeholder: "Seleccionar rol...",
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_USelect, {
															modelValue: unref(state).role_code,
															"onUpdate:modelValue": ($event) => unref(state).role_code = $event,
															items: unref(roleItems),
															placeholder: "Seleccionar rol...",
															class: "w-full"
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"items"
														])];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, {
													required: unref(state).role_code !== "general_manager",
													label: "Sucursal",
													name: "branch_id"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_USelect, {
															modelValue: unref(state).branch_id,
															"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
															items: unref(branchItems),
															disabled: unref(isBranchManager) || unref(state).role_code === "general_manager",
															placeholder: "Seleccionar sucursal...",
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_USelect, {
															modelValue: unref(state).branch_id,
															"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
															items: unref(branchItems),
															disabled: unref(isBranchManager) || unref(state).role_code === "general_manager",
															placeholder: "Seleccionar sucursal...",
															class: "w-full"
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"items",
															"disabled"
														])];
													}),
													_: 1
												}, _parent, _scopeId));
												_push(`</div>`);
											} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
												createVNode(_component_UFormField, {
													required: "",
													label: "Nombre de usuario (Email)",
													name: "username"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).username,
														"onUpdate:modelValue": ($event) => unref(state).username = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													required: "",
													label: "Contraseña",
													name: "password"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).password,
														"onUpdate:modelValue": ($event) => unref(state).password = $event,
														type: "password",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													required: "",
													label: "Rol",
													name: "role_code"
												}, {
													default: withCtx(() => [createVNode(_component_USelect, {
														modelValue: unref(state).role_code,
														"onUpdate:modelValue": ($event) => unref(state).role_code = $event,
														items: unref(roleItems),
														placeholder: "Seleccionar rol...",
														class: "w-full"
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"items"
													])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													required: unref(state).role_code !== "general_manager",
													label: "Sucursal",
													name: "branch_id"
												}, {
													default: withCtx(() => [createVNode(_component_USelect, {
														modelValue: unref(state).branch_id,
														"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
														items: unref(branchItems),
														disabled: unref(isBranchManager) || unref(state).role_code === "general_manager",
														placeholder: "Seleccionar sucursal...",
														class: "w-full"
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"items",
														"disabled"
													])]),
													_: 1
												}, 8, ["required"])
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`<div class="flex justify-end gap-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										to: "/general/staff"
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UButton, {
										label: "Crear Miembro",
										color: "primary",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [
									createVNode(_component_UCard, null, {
										header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Datos Personales")]),
										default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
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
												required: "",
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
												required: "",
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
													class: "w-full uppercase",
													placeholder: "18 caracteres"
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
												required: "",
												label: "Celular",
												name: "mobile_phone",
												class: "md:col-span-1 lg:col-span-1"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).mobile_phone,
													"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])]),
										_: 1
									}),
									createVNode(_component_UCard, null, {
										header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Domicilio")]),
										default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
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
											})
										])]),
										_: 1
									}),
									createVNode(_component_UCard, null, {
										header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Datos de Acceso y Permisos")]),
										default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
											createVNode(_component_UFormField, {
												required: "",
												label: "Nombre de usuario (Email)",
												name: "username"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).username,
													"onUpdate:modelValue": ($event) => unref(state).username = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Contraseña",
												name: "password"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).password,
													"onUpdate:modelValue": ($event) => unref(state).password = $event,
													type: "password",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: "",
												label: "Rol",
												name: "role_code"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).role_code,
													"onUpdate:modelValue": ($event) => unref(state).role_code = $event,
													items: unref(roleItems),
													placeholder: "Seleccionar rol...",
													class: "w-full"
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"items"
												])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												required: unref(state).role_code !== "general_manager",
												label: "Sucursal",
												name: "branch_id"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).branch_id,
													"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
													items: unref(branchItems),
													disabled: unref(isBranchManager) || unref(state).role_code === "general_manager",
													placeholder: "Seleccionar sucursal...",
													class: "w-full"
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"items",
													"disabled"
												])]),
												_: 1
											}, 8, ["required"])
										])]),
										_: 1
									}),
									createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										to: "/general/staff"
									}), createVNode(_component_UButton, {
										label: "Crear Miembro",
										color: "primary",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, 8, ["loading"])])
								];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "w-full p-6" }, [createVNode(_component_UForm, {
						ref_key: "formRef",
						ref: formRef,
						schema: unref(schema),
						state: unref(state),
						class: "space-y-6",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Datos Personales")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
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
										required: "",
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
										required: "",
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
											class: "w-full uppercase",
											placeholder: "18 caracteres"
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
										required: "",
										label: "Celular",
										name: "mobile_phone",
										class: "md:col-span-1 lg:col-span-1"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).mobile_phone,
											"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Domicilio")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
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
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Datos de Acceso y Permisos")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
									createVNode(_component_UFormField, {
										required: "",
										label: "Nombre de usuario (Email)",
										name: "username"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).username,
											"onUpdate:modelValue": ($event) => unref(state).username = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Contraseña",
										name: "password"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).password,
											"onUpdate:modelValue": ($event) => unref(state).password = $event,
											type: "password",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: "",
										label: "Rol",
										name: "role_code"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).role_code,
											"onUpdate:modelValue": ($event) => unref(state).role_code = $event,
											items: unref(roleItems),
											placeholder: "Seleccionar rol...",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items"
										])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: unref(state).role_code !== "general_manager",
										label: "Sucursal",
										name: "branch_id"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).branch_id,
											"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
											items: unref(branchItems),
											disabled: unref(isBranchManager) || unref(state).role_code === "general_manager",
											placeholder: "Seleccionar sucursal...",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items",
											"disabled"
										])]),
										_: 1
									}, 8, ["required"])
								])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								to: "/general/staff"
							}), createVNode(_component_UButton, {
								label: "Crear Miembro",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/staff/new.vue
var _sfc_setup = new_vue_vue_type_script_setup_true_lang_default.setup;
new_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/staff/new.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var new_default = new_vue_vue_type_script_setup_true_lang_default;

export { new_default as default };
//# sourceMappingURL=new-DL37vxDZ.mjs.map
