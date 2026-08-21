import { aP as useToast, al as useAuth, ak as useAsyncData, f as _sfc_main$1, j as _sfc_main$2, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _sfc_main$6 } from './Select-CHtpM6Dc.mjs';
import { _ as _sfc_main } from './DropdownMenu-Blcsr3st.mjs';
import { _ as _sfc_main$c } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$4 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$a } from './Modal-BQ_M11w-.mjs';
import { _ as _sfc_main$9 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$7 } from './Input-YDRYCqsV.mjs';
import { a as isValidRfc, i as isValidCurp, e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { a as _sfc_main$1$1, _ as _sfc_main$5 } from './DashboardNavbar-BzzI9nrt.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-CBDjl-2o.mjs';
import { _ as _sfc_main$b } from './Form-j1wdqi9R.mjs';
import { u as useBranches } from './useBranches-BECDq2r0.mjs';
import { _ as _sfc_main$3 } from './Table-OSD_tKHH.mjs';
import { defineComponent, computed, withAsyncContext, ref, h, withCtx, unref, isRef, openBlock, createBlock, createVNode, Fragment, createCommentVNode, useModel, reactive, watch, resolveComponent, mergeProps, mergeModels, useSSRContext } from 'vue';
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
import './DashboardSidebarToggle-J0oVNQdJ.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './PopperArrow-CXqc9lvy.mjs';
import './useComposing-D1bdBmsI.mjs';
import './Kbd-BZbceTrO.mjs';
import './RovingFocusGroup-BqLcWsjw.mjs';
import './overlay-7pzjQIHW.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/composables/useStaff.ts
function useStaff() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listStaff(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/staff`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: params
		})).data;
	}
	async function listSystemRoles() {
		return (await $fetch$2(`${config.public.apiBase}/system/roles`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: { per_page: 50 }
		})).data.data;
	}
	async function createStaff(payload) {
		return (await $fetch$2(`${config.public.apiBase}/staff`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function updateStaff(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/staff/${id}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	return {
		listStaff,
		listSystemRoles,
		createStaff,
		updateStaff
	};
}
//#endregion
//#region app/components/staff/MemberModal.vue?vue&type=script&setup=true&lang.ts
var MemberModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MemberModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		member: {},
		branches: {},
		allRoles: { type: Boolean }
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
			second_last_name: z.string().max(100, "Muy largo").optional(),
			gender: z.string().optional(),
			birth_date: z.string().optional(),
			curp: z.string().max(18, "CURP inválida").optional().superRefine((value, ctx) => {
				if (!props.member && (!value || value.length !== 18)) {
					ctx.addIssue({
						code: "custom",
						message: "CURP inválida (18 caracteres)"
					});
					return;
				}
				if (value && !isValidCurp(value)) ctx.addIssue({
					code: "custom",
					message: "CURP con formato inválido"
				});
			}),
			rfc: z.string().max(13, "RFC inválido").optional().superRefine((value, ctx) => {
				if (value && !isValidRfc(value)) ctx.addIssue({
					code: "custom",
					message: "RFC con formato inválido"
				});
			}),
			home_phone: z.string().max(20, "Muy largo").optional(),
			mobile_phone: z.string().max(20, "Muy largo").optional(),
			email: z.string().email("Correo inválido").max(150, "Muy largo").optional(),
			street: z.string().max(150, "Muy largo").optional(),
			external_number: z.string().max(30, "Muy largo").optional(),
			neighborhood: z.string().max(120, "Muy largo").optional(),
			city: z.string().max(120, "Muy largo").optional(),
			state: z.string().max(120, "Muy largo").optional(),
			postal_code: z.string().max(10, "Muy largo").optional(),
			username: z.string().email("Correo inválido").max(80, "Muy largo"),
			password: z.string().optional().superRefine((value, ctx) => {
				if (!props.member && (!value || value.length < 8)) ctx.addIssue({
					code: "custom",
					message: "Mínimo 8 caracteres"
				});
			}),
			role_code: z.string().min(1, "Selecciona un rol"),
			branch_id: z.any().optional().superRefine((value, ctx) => {
				if (!value || Number(value) < 1) ctx.addIssue({
					code: "custom",
					message: "Selecciona una sucursal"
				});
			}),
			is_active: z.boolean()
		});
		const { user } = useAuth();
		const { listSystemRoles, createStaff, updateStaff } = useStaff();
		const toast = useToast();
		const submitting = ref(false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const isBranchManager = computed(() => user.value?.roles?.some((r) => r.code === "branch_manager") ?? false);
		const roles = ref([]);
		const roleItems = computed(() => {
			return (isBranchManager.value ? roles.value.filter((r) => BRANCH_MANAGER_ROLE_CODES.includes(r.code)) : roles.value.filter((r) => STAFF_ROLE_CODES.includes(r.code))).map((r) => ({
				label: r.description || r.code,
				value: r.code
			}));
		});
		const branchItems = computed(() => {
			return (isBranchManager.value ? props.branches.filter((b) => b.id === branchManagerBranchId.value) : props.branches).map((b) => ({
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
			home_phone: "",
			mobile_phone: "",
			email: "",
			street: "",
			external_number: "",
			neighborhood: "",
			city: "",
			state: "",
			postal_code: "",
			username: "",
			password: "",
			role_code: isBranchManager.value ? "cashier" : void 0,
			branch_id: isBranchManager.value && branchManagerBranchId.value ? String(branchManagerBranchId.value) : void 0,
			is_active: true
		});
		watch(() => props.member, (member) => {
			if (member) {
				state.first_name = member.person?.first_name || "";
				state.middle_name = member.person?.middle_name || "";
				state.last_name = member.person?.last_name || "";
				state.second_last_name = member.person?.second_last_name || "";
				state.gender = member.person?.gender ?? void 0;
				state.birth_date = member.person?.birth_date || "";
				state.curp = member.person?.curp || "";
				state.rfc = member.person?.rfc || "";
				state.home_phone = member.person?.home_phone || "";
				state.mobile_phone = member.person?.mobile_phone || "";
				state.email = member.person?.email || "";
				state.street = member.person?.street || "";
				state.external_number = member.person?.external_number || "";
				state.neighborhood = member.person?.neighborhood || "";
				state.city = member.person?.city || "";
				state.state = member.person?.state || "";
				state.postal_code = member.person?.postal_code || "";
				state.username = member.username;
				state.password = "";
				state.role_code = member.roles.find((r) => r.is_primary)?.code ?? member.roles[0]?.code;
				state.branch_id = String(member.roles.find((r) => r.is_primary)?.branch_id ?? member.roles[0]?.branch_id ?? "");
				state.is_active = member.is_active;
			} else {
				state.first_name = "";
				state.middle_name = "";
				state.last_name = "";
				state.second_last_name = "";
				state.gender = void 0;
				state.birth_date = "";
				state.curp = "";
				state.rfc = "";
				state.home_phone = "";
				state.mobile_phone = "";
				state.email = "";
				state.street = "";
				state.external_number = "";
				state.neighborhood = "";
				state.city = "";
				state.state = "";
				state.postal_code = "";
				state.username = "";
				state.password = "";
				state.role_code = isBranchManager.value ? "cashier" : void 0;
				state.branch_id = isBranchManager.value && branchManagerBranchId.value ? String(branchManagerBranchId.value) : void 0;
				state.is_active = true;
			}
		}, { immediate: true });
		watch(open, async (isOpen) => {
			if (isOpen && roles.value.length === 0) try {
				roles.value = await listSystemRoles();
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron cargar los roles.",
					color: "error"
				});
			}
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				if (props.member) {
					await updateStaff(props.member.id, {
						is_active: event.data.is_active,
						role_code: event.data.role_code,
						branch_id: Number(event.data.branch_id),
						first_name: event.data.first_name,
						middle_name: event.data.middle_name || null,
						last_name: event.data.last_name,
						second_last_name: event.data.second_last_name || null,
						gender: event.data.gender || null,
						birth_date: event.data.birth_date || null,
						curp: event.data.curp || null,
						rfc: event.data.rfc || null,
						home_phone: event.data.home_phone || null,
						mobile_phone: event.data.mobile_phone || null,
						email: event.data.email || null,
						street: event.data.street || null,
						external_number: event.data.external_number || null,
						neighborhood: event.data.neighborhood || null,
						city: event.data.city || null,
						state: event.data.state || null,
						postal_code: event.data.postal_code || null
					});
					toast.add({
						title: "Personal actualizado",
						description: `${event.data.first_name} ${event.data.last_name} fue actualizado correctamente`,
						color: "success"
					});
					emit("updated");
				} else {
					await createStaff({
						first_name: event.data.first_name,
						middle_name: event.data.middle_name || void 0,
						last_name: event.data.last_name,
						second_last_name: event.data.second_last_name || void 0,
						gender: event.data.gender || void 0,
						birth_date: event.data.birth_date || void 0,
						curp: event.data.curp || "",
						rfc: event.data.rfc || void 0,
						home_phone: event.data.home_phone || void 0,
						mobile_phone: event.data.mobile_phone || void 0,
						email: event.data.email || void 0,
						street: event.data.street || void 0,
						external_number: event.data.external_number || void 0,
						neighborhood: event.data.neighborhood || void 0,
						city: event.data.city || void 0,
						state: event.data.state || void 0,
						postal_code: event.data.postal_code || void 0,
						username: event.data.username,
						password: event.data.password || "",
						role_code: event.data.role_code,
						branch_id: Number(event.data.branch_id)
					});
					toast.add({
						title: "Personal creado",
						description: `${event.data.first_name} ${event.data.last_name} fue creado correctamente`,
						color: "success"
					});
					state.first_name = "";
					state.middle_name = "";
					state.last_name = "";
					state.second_last_name = "";
					state.birth_date = "";
					state.curp = "";
					state.rfc = "";
					state.username = "";
					state.password = "";
					state.role_code = isBranchManager.value ? "cashier" : void 0;
					state.branch_id = isBranchManager.value ? branchManagerBranchId.value ?? void 0 : void 0;
					emit("created");
				}
				open.value = false;
			} catch (e) {
				toast.add({
					title: "Error",
					description: extractApiErrorMessage(e, "No se pudo guardar el personal. Verifica los datos e intenta de nuevo."),
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
			const _component_UInput = _sfc_main$7;
			const _component_USelect = _sfc_main$6;
			const _component_UToggle = resolveComponent("UToggle");
			const _component_UButton = _sfc_main$1;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: __props.member ? "Editar personal" : "Nuevo miembro",
				description: __props.member ? `Actualizar a ${__props.member.username}` : "Agrega un nuevo miembro al personal",
				ui: { content: "max-w-4xl" }
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
								_push(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
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
								_push(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
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
								if (!__props.member) _push(ssrRenderComponent(_component_UFormField, {
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
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "RFC",
									name: "rfc"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).rfc,
											"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
											class: "w-full",
											uppercase: ""
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).rfc,
											"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
											class: "w-full",
											uppercase: ""
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
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
									label: "Correo",
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
								_push(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
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
								_push(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Nombre de usuario",
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
								if (!__props.member) _push(ssrRenderComponent(_component_UFormField, {
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
								else _push(`<!---->`);
								_push(`</div>`);
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
									required: "",
									label: "Sucursal",
									name: "branch_id"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_USelect, {
											modelValue: unref(state).branch_id,
											"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
											items: unref(branchItems),
											disabled: unref(isBranchManager),
											placeholder: "Seleccionar sucursal...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_USelect, {
											modelValue: unref(state).branch_id,
											"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
											items: unref(branchItems),
											disabled: unref(isBranchManager),
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
								if (__props.member) _push(ssrRenderComponent(_component_UFormField, {
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
									label: __props.member ? "Guardar" : "Crear",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
										label: "Apellido materno",
										name: "second_last_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).second_last_name,
											"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								]),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
									!__props.member ? (openBlock(), createBlock(_component_UFormField, {
										key: 0,
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
									})) : createCommentVNode("", true),
									createVNode(_component_UFormField, {
										label: "RFC",
										name: "rfc"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).rfc,
											"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
											class: "w-full",
											uppercase: ""
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								]),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
										label: "Correo",
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
								]),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
									})
								]),
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
									required: "",
									label: "Nombre de usuario",
									name: "username"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).username,
										"onUpdate:modelValue": ($event) => unref(state).username = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}), !__props.member ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
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
								})) : createCommentVNode("", true)]),
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
									required: "",
									label: "Sucursal",
									name: "branch_id"
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(state).branch_id,
										"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
										items: unref(branchItems),
										disabled: unref(isBranchManager),
										placeholder: "Seleccionar sucursal...",
										class: "w-full"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items",
										"disabled"
									])]),
									_: 1
								}),
								__props.member ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
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
									label: __props.member ? "Guardar" : "Crear",
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
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
									label: "Apellido materno",
									name: "second_last_name"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).second_last_name,
										"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})
							]),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
								!__props.member ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
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
								})) : createCommentVNode("", true),
								createVNode(_component_UFormField, {
									label: "RFC",
									name: "rfc"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).rfc,
										"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
										class: "w-full",
										uppercase: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})
							]),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
									label: "Correo",
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
							]),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
								})
							]),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
								required: "",
								label: "Nombre de usuario",
								name: "username"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).username,
									"onUpdate:modelValue": ($event) => unref(state).username = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}), !__props.member ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
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
							})) : createCommentVNode("", true)]),
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
								required: "",
								label: "Sucursal",
								name: "branch_id"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).branch_id,
									"onUpdate:modelValue": ($event) => unref(state).branch_id = $event,
									items: unref(branchItems),
									disabled: unref(isBranchManager),
									placeholder: "Seleccionar sucursal...",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items",
									"disabled"
								])]),
								_: 1
							}),
							__props.member ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
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
								label: __props.member ? "Guardar" : "Crear",
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
//#region app/components/staff/MemberModal.vue
var _sfc_setup$1 = MemberModal_vue_vue_type_script_setup_true_lang_default.setup;
MemberModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/staff/MemberModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var MemberModal_default = Object.assign(MemberModal_vue_vue_type_script_setup_true_lang_default, { __name: "StaffMemberModal" });
//#endregion
//#region app/pages/general/staff.vue?vue&type=script&setup=true&lang.ts
var staff_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "staff",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UButton = _sfc_main$1;
		const toast = useToast();
		const { listStaff, updateStaff } = useStaff();
		const { listBranches } = useBranches();
		const { user } = useAuth();
		const canManage = computed(() => user.value?.permissions?.includes("staff.manage") ?? false);
		const isBranchManager = computed(() => user.value?.roles?.some((r) => r.code === "branch_manager") ?? false);
		const BRANCH_MANAGER_ROLE_CODES = [
			"cashier",
			"coordinator",
			"verifier"
		];
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("staff-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const q = ref("");
		const roleFilter = ref(void 0);
		const branchFilter = ref(void 0);
		const page = ref(1);
		const { data: staffData, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("staff", () => listStaff({
			page: page.value,
			role: roleFilter.value,
			branch_id: isBranchManager.value ? void 0 : branchFilter.value ? Number(branchFilter.value) : void 0
		}), {
			watch: [
				page,
				roleFilter,
				branchFilter
			],
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
		const items = computed(() => staffData.value.data ?? []);
		const meta = computed(() => staffData.value.meta);
		const filteredItems = computed(() => {
			if (!q.value) return items.value;
			const needle = q.value.toLowerCase();
			return items.value.filter((member) => {
				return `${member.person?.first_name ?? ""} ${member.person?.last_name ?? ""}`.toLowerCase().includes(needle) || member.username.toLowerCase().includes(needle);
			});
		});
		const roleLabels = {
			coordinator: "Coordinador",
			verifier: "Verificador",
			branch_manager: "Gerente de Sucursal",
			cashier: "Cajera",
			"super-admin": "Super Administrador",
			general_manager: "Gerente General",
			distributor: "Distribuidora"
		};
		function memberRole(member) {
			return member.roles.find((r) => r.is_primary) ?? member.roles[0];
		}
		function branchName(branchId) {
			return branches.value.find((b) => b.id === branchId)?.name ?? "Global";
		}
		const isEditOpen = ref(false);
		const selectedMember = ref(null);
		function openCreate() {
			selectedMember.value = null;
			isEditOpen.value = true;
		}
		function getMemberItems(member) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (canManage.value) items.push({
				label: "Editar",
				icon: "i-lucide-pencil",
				onSelect() {
					selectedMember.value = member;
					isEditOpen.value = true;
				}
			});
			items.push({ type: "separator" }, {
				label: member.is_active ? "Desactivar" : "Activar",
				icon: member.is_active ? "i-lucide-user-x" : "i-lucide-user-check",
				onSelect: async () => {
					try {
						await updateStaff(member.id, { is_active: !member.is_active });
						toast.add({
							title: "Personal actualizado",
							description: `${member.username} fue ${member.is_active ? "desactivado" : "activado"} correctamente`,
							color: "success"
						});
						await refresh();
					} catch {
						toast.add({
							title: "Error",
							description: "No se pudo actualizar el miembro.",
							color: "error"
						});
					}
				}
			});
			return items;
		}
		const roleItems = computed(() => [{
			label: "Todos los roles",
			value: void 0
		}, ...Object.entries(roleLabels).filter(([code]) => !isBranchManager.value || BRANCH_MANAGER_ROLE_CODES.includes(code)).map(([code, label]) => ({
			label,
			value: code
		}))]);
		const branchItems = computed(() => [{
			label: "Todas las sucursales",
			value: void 0
		}, ...branches.value.map((b) => ({
			label: b.name,
			value: b.id.toString()
		}))]);
		const columns = computed(() => {
			const list = [
				{
					accessorKey: "person",
					header: "Personal",
					cell: ({ row }) => {
						const member = row.original;
						const fullName = `${member.person?.first_name ?? ""} ${member.person?.last_name ?? ""}`.trim() || "Sin nombre";
						return h("div", { class: "min-w-0 py-1" }, [h("p", { class: "truncate font-semibold text-highlighted text-sm" }, fullName), h("p", { class: "truncate text-xs text-muted font-normal" }, `@${member.username}`)]);
					}
				},
				{
					id: "role",
					header: "Rol",
					cell: ({ row }) => {
						const member = row.original;
						const code = memberRole(member)?.code ?? "";
						const label = roleLabels[code] ?? code;
						return h(_sfc_main$9, {
							color: "primary",
							variant: "subtle",
							label
						});
					}
				},
				{
					id: "branch",
					header: "Sucursal",
					cell: ({ row }) => {
						const member = row.original;
						const role = memberRole(member);
						return h("span", { class: "text-sm text-muted" }, branchName(role?.branch_id));
					}
				},
				{
					accessorKey: "is_active",
					header: "Estado",
					cell: ({ row }) => {
						const member = row.original;
						return h(_sfc_main$9, {
							color: member.is_active ? "success" : "error",
							variant: "subtle",
							label: member.is_active ? "Activo" : "Inactivo"
						});
					}
				}
			];
			if (canManage.value) list.push({
				id: "actions",
				cell: ({ row }) => {
					return h("div", { class: "text-right" }, h(_sfc_main, {
						content: { align: "end" },
						items: getMemberItems(row.original)
					}, () => h(_sfc_main$1, {
						"icon": "i-lucide-ellipsis-vertical",
						"color": "neutral",
						"variant": "ghost",
						"aria-label": "Acciones"
					})));
				}
			});
			return list;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_USelect = _sfc_main$6;
			const _component_UInput = _sfc_main$7;
			const _component_UIcon = _sfc_main$2;
			const _component_UTable = _sfc_main$3;
			const _component_UPagination = _sfc_main$4;
			const _component_StaffMemberModal = MemberModal_default;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "staff" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Personal" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(roleFilter),
									"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
									items: unref(roleItems),
									class: "w-44"
								}, null, _parent, _scopeId));
								if (!unref(isBranchManager)) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(branchFilter),
									"onUpdate:modelValue": ($event) => isRef(branchFilter) ? branchFilter.value = $event : null,
									items: unref(branchItems),
									class: "w-44"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar personal...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, _parent, _scopeId));
								if (unref(canManage)) _push(ssrRenderComponent(unref(UButton), {
									label: "Nuevo personal",
									icon: "i-lucide-user-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [
								createVNode(_component_USelect, {
									modelValue: unref(roleFilter),
									"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
									items: unref(roleItems),
									class: "w-44"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								]),
								!unref(isBranchManager) ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
									modelValue: unref(branchFilter),
									"onUpdate:modelValue": ($event) => isRef(branchFilter) ? branchFilter.value = $event : null,
									items: unref(branchItems),
									class: "w-44"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])) : createCommentVNode("", true),
								createVNode(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar personal...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(canManage) ? (openBlock(), createBlock(unref(UButton), {
									key: 1,
									label: "Nuevo personal",
									icon: "i-lucide-user-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, 8, ["onClick"])) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Personal" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [
							createVNode(_component_USelect, {
								modelValue: unref(roleFilter),
								"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
								items: unref(roleItems),
								class: "w-44"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							]),
							!unref(isBranchManager) ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
								modelValue: unref(branchFilter),
								"onUpdate:modelValue": ($event) => isRef(branchFilter) ? branchFilter.value = $event : null,
								items: unref(branchItems),
								class: "w-44"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])) : createCommentVNode("", true),
							createVNode(_component_UInput, {
								modelValue: unref(q),
								"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
								placeholder: "Buscar personal...",
								icon: "i-lucide-search",
								class: "w-56"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(canManage) ? (openBlock(), createBlock(unref(UButton), {
								key: 1,
								label: "Nuevo personal",
								icon: "i-lucide-user-plus",
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
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudo cargar el personal. </p>`);
						_push(ssrRenderComponent(unref(UButton), {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<!--[-->`);
						if (unref(filteredItems).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-users",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay personal registrado </p></div>`);
						} else _push(ssrRenderComponent(_component_UTable, {
							class: "shrink-0",
							data: unref(filteredItems),
							columns: unref(columns),
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, _parent, _scopeId));
						_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UPagination, {
							page: unref(page),
							"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
							total: unref(meta)?.total ?? 0,
							"items-per-page": unref(meta)?.per_page ?? 15
						}, null, _parent, _scopeId));
						_push(`</div><!--]-->`);
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudo cargar el personal. "),
						createVNode(unref(UButton), {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock(Fragment, { key: 2 }, [unref(filteredItems).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-users",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay personal registrado ")])) : (openBlock(), createBlock(_component_UTable, {
						key: 1,
						class: "shrink-0",
						data: unref(filteredItems),
						columns: unref(columns),
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, null, 8, ["data", "columns"])), createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto" }, [createVNode(_component_UPagination, {
						page: unref(page),
						"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
						total: unref(meta)?.total ?? 0,
						"items-per-page": unref(meta)?.per_page ?? 15
					}, null, 8, [
						"page",
						"onUpdate:page",
						"total",
						"items-per-page"
					])])], 64))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_StaffMemberModal, {
				open: unref(isEditOpen),
				"onUpdate:open": ($event) => isRef(isEditOpen) ? isEditOpen.value = $event : null,
				member: unref(selectedMember),
				branches: unref(branches),
				onCreated: ($event) => unref(refresh)(),
				onUpdated: ($event) => unref(refresh)()
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/staff.vue
var _sfc_setup = staff_vue_vue_type_script_setup_true_lang_default.setup;
staff_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/staff.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var staff_default = staff_vue_vue_type_script_setup_true_lang_default;

export { staff_default as default };
//# sourceMappingURL=staff-CDLz2_MM.mjs.map
