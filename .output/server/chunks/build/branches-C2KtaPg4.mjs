import { aP as useToast, ak as useAsyncData, al as useAuth, f as _sfc_main } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Select-Gak9P_dI.mjs';
import { _ as _sfc_main$2 } from './DropdownMenu-BulCZzh5.mjs';
import { _ as _sfc_main$c } from './Checkbox-CxYkdtZ9.mjs';
import { _ as _sfc_main$b } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$6 } from './Pagination-DNIq1JMg.mjs';
import { _ as _sfc_main$d } from './Tabs-Bq2h278F.mjs';
import { _ as _sfc_main$9 } from './Modal-BYVE2UCa.mjs';
import { _ as _sfc_main$1 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$3 } from './Input-YDRYCqsV.mjs';
import { a as _sfc_main$1$1, _ as _sfc_main$7 } from './DashboardNavbar-C9AMA1qv.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-D6jKUkvL.mjs';
import { _ as _sfc_main$a } from './Form-j1wdqi9R.mjs';
import { u as useBranches } from './useBranches-Crw07pg7.mjs';
import { _ as _sfc_main$5 } from './Table-OSD_tKHH.mjs';
import { B as BranchSettingsForm_default, G as GlobalPointSettingsForm_default } from './GlobalPointSettingsForm-TniBWhjt.mjs';
import { defineComponent, useTemplateRef, ref, withAsyncContext, computed, h, watch, mergeProps, withCtx, isRef, unref, createVNode, openBlock, createBlock, createCommentVNode, useModel, reactive, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import * as z from 'zod';
import { G as upperFirst } from '../_/nitro.mjs';
import { getPaginationRowModel } from '@tanstack/table-core';
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
import './DashboardSidebarToggle-BSz-SOza.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './PopperArrow-_ul5NSti.mjs';
import './useComposing-D1bdBmsI.mjs';
import './Kbd-BZbceTrO.mjs';
import './RovingFocusGroup-BOkwwdaM.mjs';
import './isValueEqualOrExist-7w5KNovv.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-CLtAPs7l.mjs';
import './RovingFocusItem-CN5yS-Ls.mjs';
import './overlay-BwxO-keY.mjs';
import './esm-CcArdB_U.mjs';
import './PageCard-N_-ETShd.mjs';
import './useSettings-CKSSI-OD.mjs';
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

//#region app/components/branches/AddModal.vue?vue&type=script&setup=true&lang.ts
var AddModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AddModal",
	__ssrInlineRender: true,
	emits: ["created"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const schema = z.object({
			name: z.string().min(2, "Too short"),
			address: z.string().optional(),
			phone: z.string().optional(),
			manager_user_id: z.any().optional()
		});
		const open = ref(false);
		const state = reactive({
			name: "",
			address: "",
			phone: "",
			manager_user_id: void 0
		});
		const { createBranch} = useBranches();
		const toast = useToast();
		const submitting = ref(false);
		const managers = ref([]);
		const managerItems = computed(() => {
			return (managers.value || []).map((m) => ({
				label: `${m.name} (${m.username})`,
				value: m.id.toString()
			}));
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await createBranch({
					name: event.data.name,
					address: event.data.address || void 0,
					phone: event.data.phone || void 0,
					manager_user_id: event.data.manager_user_id ? Number(event.data.manager_user_id) : void 0
				});
				toast.add({
					title: "Sucursal creada",
					description: `La sucursal ${event.data.name} fue creada correctamente`,
					color: "success"
				});
				state.name = "";
				state.address = "";
				state.phone = "";
				state.manager_user_id = void 0;
				open.value = false;
				emit("created");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo crear la sucursal. Verifica los datos e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main;
			const _component_UForm = _sfc_main$a;
			const _component_UFormField = _sfc_main$b;
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Nueva Sucursal",
				description: "Agrega una nueva sucursal a la base de datos",
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
									label: "Nombre",
									placeholder: "Sucursal Centro",
									name: "name"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Dirección",
									placeholder: "Calle 123, Ciudad",
									name: "address"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).address,
											"onUpdate:modelValue": ($event) => unref(state).address = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).address,
											"onUpdate:modelValue": ($event) => unref(state).address = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Teléfono",
									placeholder: "555-0101",
									name: "phone"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).phone,
											"onUpdate:modelValue": ($event) => unref(state).phone = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).phone,
											"onUpdate:modelValue": ($event) => unref(state).phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Gerente",
									name: "manager_user_id"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_USelect, {
											modelValue: unref(state).manager_user_id,
											"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
											items: unref(managerItems),
											placeholder: "Seleccionar gerente...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_USelect, {
											modelValue: unref(state).manager_user_id,
											"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
											items: unref(managerItems),
											placeholder: "Seleccionar gerente...",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Crear",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UFormField, {
									label: "Nombre",
									placeholder: "Sucursal Centro",
									name: "name"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).name,
										"onUpdate:modelValue": ($event) => unref(state).name = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Dirección",
									placeholder: "Calle 123, Ciudad",
									name: "address"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).address,
										"onUpdate:modelValue": ($event) => unref(state).address = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Teléfono",
									placeholder: "555-0101",
									name: "phone"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).phone,
										"onUpdate:modelValue": ($event) => unref(state).phone = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Gerente",
									name: "manager_user_id"
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(state).manager_user_id,
										"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
										items: unref(managerItems),
										placeholder: "Seleccionar gerente...",
										class: "w-full"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items"
									])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Crear",
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
							createVNode(_component_UFormField, {
								label: "Nombre",
								placeholder: "Sucursal Centro",
								name: "name"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).name,
									"onUpdate:modelValue": ($event) => unref(state).name = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Dirección",
								placeholder: "Calle 123, Ciudad",
								name: "address"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).address,
									"onUpdate:modelValue": ($event) => unref(state).address = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Teléfono",
								placeholder: "555-0101",
								name: "phone"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).phone,
									"onUpdate:modelValue": ($event) => unref(state).phone = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Gerente",
								name: "manager_user_id"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).manager_user_id,
									"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
									items: unref(managerItems),
									placeholder: "Seleccionar gerente...",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Crear",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Nueva sucursal",
						icon: "i-lucide-plus"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Nueva sucursal",
						icon: "i-lucide-plus"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/branches/AddModal.vue
var _sfc_setup$3 = AddModal_vue_vue_type_script_setup_true_lang_default.setup;
AddModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/branches/AddModal.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AddModal_default = Object.assign(AddModal_vue_vue_type_script_setup_true_lang_default, { __name: "BranchesAddModal" });
//#endregion
//#region app/components/branches/EditModal.vue?vue&type=script&setup=true&lang.ts
var EditModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EditModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ branch: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["updated"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useModel(__props, "open");
		const emit = __emit;
		const schema = z.object({
			name: z.string().min(2, "Too short"),
			address: z.string().optional(),
			phone: z.string().optional(),
			manager_user_id: z.any().optional(),
			is_active: z.boolean().optional()
		});
		const state = reactive({
			name: "",
			address: "",
			phone: "",
			manager_user_id: void 0,
			is_active: true
		});
		watch(() => props.branch, (newBranch) => {
			if (newBranch) {
				state.name = newBranch.name;
				state.address = newBranch.address || "";
				state.phone = newBranch.phone || "";
				state.manager_user_id = newBranch.manager?.id?.toString() || void 0;
				state.is_active = newBranch.is_active;
			}
		}, { immediate: true });
		const { updateBranch} = useBranches();
		const toast = useToast();
		const submitting = ref(false);
		const managers = ref([]);
		const managerItems = computed(() => {
			return (managers.value || []).map((m) => ({
				label: `${m.name} (${m.username})`,
				value: m.id.toString()
			}));
		});
		async function onSubmit(event) {
			if (!props.branch) return;
			submitting.value = true;
			try {
				await updateBranch(props.branch.id, {
					name: event.data.name,
					address: event.data.address || void 0,
					phone: event.data.phone || void 0,
					manager_user_id: event.data.manager_user_id ? Number(event.data.manager_user_id) : void 0,
					is_active: event.data.is_active
				});
				toast.add({
					title: "Sucursal actualizada",
					description: `La sucursal ${event.data.name} fue actualizada correctamente`,
					color: "success"
				});
				open.value = false;
				emit("updated");
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo actualizar la sucursal. Verifica los datos e intenta de nuevo.",
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
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			const _component_UCheckbox = _sfc_main$c;
			const _component_UButton = _sfc_main;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Editar Sucursal",
				description: "Modifica los datos de la sucursal seleccionada",
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
									label: "Nombre",
									name: "name"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Dirección",
									name: "address"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).address,
											"onUpdate:modelValue": ($event) => unref(state).address = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).address,
											"onUpdate:modelValue": ($event) => unref(state).address = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Teléfono",
									name: "phone"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).phone,
											"onUpdate:modelValue": ($event) => unref(state).phone = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).phone,
											"onUpdate:modelValue": ($event) => unref(state).phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Gerente",
									name: "manager_user_id"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_USelect, {
											modelValue: unref(state).manager_user_id,
											"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
											items: unref(managerItems),
											placeholder: "Seleccionar gerente...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_USelect, {
											modelValue: unref(state).manager_user_id,
											"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
											items: unref(managerItems),
											placeholder: "Seleccionar gerente...",
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
									label: "Estado",
									name: "is_active"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UCheckbox, {
											modelValue: unref(state).is_active,
											"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
											label: "Activa"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UCheckbox, {
											modelValue: unref(state).is_active,
											"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
											label: "Activa"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Guardar Cambios",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UFormField, {
									label: "Nombre",
									name: "name"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).name,
										"onUpdate:modelValue": ($event) => unref(state).name = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Dirección",
									name: "address"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).address,
										"onUpdate:modelValue": ($event) => unref(state).address = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Teléfono",
									name: "phone"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).phone,
										"onUpdate:modelValue": ($event) => unref(state).phone = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Gerente",
									name: "manager_user_id"
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(state).manager_user_id,
										"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
										items: unref(managerItems),
										placeholder: "Seleccionar gerente...",
										class: "w-full"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items"
									])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Estado",
									name: "is_active"
								}, {
									default: withCtx(() => [createVNode(_component_UCheckbox, {
										modelValue: unref(state).is_active,
										"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
										label: "Activa"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Guardar Cambios",
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
							createVNode(_component_UFormField, {
								label: "Nombre",
								name: "name"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).name,
									"onUpdate:modelValue": ($event) => unref(state).name = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Dirección",
								name: "address"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).address,
									"onUpdate:modelValue": ($event) => unref(state).address = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Teléfono",
								name: "phone"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).phone,
									"onUpdate:modelValue": ($event) => unref(state).phone = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Gerente",
								name: "manager_user_id"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).manager_user_id,
									"onUpdate:modelValue": ($event) => unref(state).manager_user_id = $event,
									items: unref(managerItems),
									placeholder: "Seleccionar gerente...",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Estado",
								name: "is_active"
							}, {
								default: withCtx(() => [createVNode(_component_UCheckbox, {
									modelValue: unref(state).is_active,
									"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
									label: "Activa"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Guardar Cambios",
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
//#region app/components/branches/EditModal.vue
var _sfc_setup$2 = EditModal_vue_vue_type_script_setup_true_lang_default.setup;
EditModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/branches/EditModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var EditModal_default = Object.assign(EditModal_vue_vue_type_script_setup_true_lang_default, { __name: "BranchesEditModal" });
//#endregion
//#region app/components/branches/SettingsModal.vue?vue&type=script&setup=true&lang.ts
var SettingsModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SettingsModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ branch: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["updated"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const open = useModel(__props, "open");
		const tab = ref("branch");
		function onSaved() {
			emit("updated");
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$9;
			const _component_UButton = _sfc_main;
			const _component_UTabs = _sfc_main$d;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Configuración de sucursal",
				description: __props.branch.name,
				ui: { content: "max-w-3xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UTabs, {
							modelValue: unref(tab),
							"onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
							content: false,
							items: [{
								label: "Sucursal",
								value: "branch"
							}, {
								label: "Puntos (global)",
								value: "points"
							}],
							class: "mb-4"
						}, null, _parent, _scopeId));
						if (unref(tab) === "branch") _push(ssrRenderComponent(BranchSettingsForm_default, {
							"branch-id": __props.branch.id,
							tabbed: true,
							onSaved
						}, null, _parent, _scopeId));
						else _push(ssrRenderComponent(GlobalPointSettingsForm_default, { onSaved }, null, _parent, _scopeId));
					} else return [createVNode(_component_UTabs, {
						modelValue: unref(tab),
						"onUpdate:modelValue": ($event) => isRef(tab) ? tab.value = $event : null,
						content: false,
						items: [{
							label: "Sucursal",
							value: "branch"
						}, {
							label: "Puntos (global)",
							value: "points"
						}],
						class: "mb-4"
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), unref(tab) === "branch" ? (openBlock(), createBlock(BranchSettingsForm_default, {
						key: 0,
						"branch-id": __props.branch.id,
						tabbed: true,
						onSaved
					}, null, 8, ["branch-id"])) : (openBlock(), createBlock(GlobalPointSettingsForm_default, {
						key: 1,
						onSaved
					}))];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Configuración",
						icon: "i-lucide-settings",
						color: "neutral",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Configuración",
						icon: "i-lucide-settings",
						color: "neutral",
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
//#region app/components/branches/SettingsModal.vue
var _sfc_setup$1 = SettingsModal_vue_vue_type_script_setup_true_lang_default.setup;
SettingsModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/branches/SettingsModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SettingsModal_default = Object.assign(SettingsModal_vue_vue_type_script_setup_true_lang_default, { __name: "BranchesSettingsModal" });
//#endregion
//#region app/pages/general/branches.vue?vue&type=script&setup=true&lang.ts
var branches_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "branches",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UButton = _sfc_main;
		const UDropdownMenu = _sfc_main$2;
		const toast = useToast();
		const table = useTemplateRef("table");
		const columnFilters = ref([{
			id: "code",
			value: ""
		}]);
		const columnVisibility = ref();
		const rowSelection = ref({});
		const { listBranches } = useBranches();
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branches", () => listBranches())), __temp = await __temp, __restore(), __temp);
		const isEditOpen = ref(false);
		const isSettingsOpen = ref(false);
		const selectedBranch = ref(null);
		const { user } = useAuth();
		const canManage = computed(() => user.value?.permissions?.includes("branches.manage") ?? false);
		function getRowItems(row) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (canManage.value) items.push({
				label: "Editar sucursal",
				icon: "i-lucide-pencil",
				onSelect() {
					selectedBranch.value = row.original;
					isEditOpen.value = true;
				}
			});
			if (user.value?.permissions?.includes("branch-settings.view")) items.push({
				label: "Configuración",
				icon: "i-lucide-settings",
				onSelect() {
					selectedBranch.value = row.original;
					isSettingsOpen.value = true;
				}
			});
			items.push({ type: "separator" }, {
				label: "Copiar ID de sucursal",
				icon: "i-lucide-copy",
				onSelect() {
					(void 0).clipboard.writeText(row.original.id.toString());
					toast.add({
						title: "Copiado",
						description: "ID de sucursal copiado al portapapeles"
					});
				}
			}, { type: "separator" }, {
				label: "Ver detalles de sucursal",
				icon: "i-lucide-list"
			});
			return items;
		}
		const columns = computed(() => {
			const list = [];
			list.push({
				accessorKey: "id",
				header: "ID"
			}, {
				accessorKey: "name",
				header: "Nombre",
				cell: ({ row }) => {
					return h("div", { class: "font-medium text-highlighted" }, row.original.name);
				}
			}, {
				accessorKey: "address",
				header: "Dirección"
			}, {
				accessorKey: "code",
				header: ({ column }) => {
					const isSorted = column.getIsSorted();
					return h(_sfc_main, {
						color: "neutral",
						variant: "ghost",
						label: "Código",
						icon: isSorted ? isSorted === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow" : "i-lucide-arrow-up-down",
						class: "-mx-2.5",
						onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
					});
				}
			}, {
				accessorKey: "phone",
				header: "Teléfono"
			}, {
				accessorKey: "manager",
				header: "Gerente",
				cell: ({ row }) => {
					return h("div", { class: "text-sm font-normal text-dimmed" }, row.original.manager?.name || "Sin asignar");
				}
			}, {
				accessorKey: "is_active",
				header: "Estado",
				filterFn: "equals",
				cell: ({ row }) => {
					const color = row.original.is_active ? "success" : "error";
					return h(_sfc_main$1, {
						class: "capitalize",
						variant: "subtle",
						color
					}, () => row.original.is_active ? "Activa" : "Inactiva");
				}
			}, {
				id: "actions",
				cell: ({ row }) => {
					return h("div", { class: "text-right" }, h(_sfc_main$2, {
						content: { align: "end" },
						items: getRowItems(row)
					}, () => h(_sfc_main, {
						icon: "i-lucide-ellipsis-vertical",
						color: "neutral",
						variant: "ghost",
						class: "ml-auto"
					})));
				}
			});
			return list;
		});
		const statusFilter = ref("all");
		watch(() => statusFilter.value, (newVal) => {
			if (!table?.value?.tableApi) return;
			const statusColumn = table.value.tableApi.getColumn("is_active");
			if (!statusColumn) return;
			if (newVal === "all") statusColumn.setFilterValue(void 0);
			else statusColumn.setFilterValue(newVal === "active");
		});
		const code = computed({
			get: () => {
				return table.value?.tableApi?.getColumn("code")?.getFilterValue() || "";
			},
			set: (value) => {
				table.value?.tableApi?.getColumn("code")?.setFilterValue(value || void 0);
			}
		});
		const pagination = ref({
			pageIndex: 0,
			pageSize: 10
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1$1;
			const _component_UDashboardNavbar = _sfc_main$7;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_BranchesAddModal = AddModal_default;
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			const _component_UTable = _sfc_main$5;
			const _component_UPagination = _sfc_main$6;
			const _component_BranchesEditModal = EditModal_default;
			const _component_BranchesSettingsModal = SettingsModal_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "branches" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Sucursales" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) if (unref(canManage)) _push(ssrRenderComponent(_component_BranchesAddModal, { onCreated: unref(refresh) }, null, _parent, _scopeId));
							else _push(`<!---->`);
							else return [unref(canManage) ? (openBlock(), createBlock(_component_BranchesAddModal, {
								key: 0,
								onCreated: unref(refresh)
							}, null, 8, ["onCreated"])) : createCommentVNode("", true)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Sucursales" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [unref(canManage) ? (openBlock(), createBlock(_component_BranchesAddModal, {
							key: 0,
							onCreated: unref(refresh)
						}, null, 8, ["onCreated"])) : createCommentVNode("", true)]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(code),
							"onUpdate:modelValue": ($event) => isRef(code) ? code.value = $event : null,
							class: "max-w-sm",
							icon: "i-lucide-search",
							placeholder: "Filtrar por código..."
						}, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap items-center gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: [
								{
									label: "Todos",
									value: "all"
								},
								{
									label: "Activas",
									value: "active"
								},
								{
									label: "Inactivas",
									value: "inactive"
								}
							],
							ui: { trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200" },
							placeholder: "Filtrar estado",
							class: "min-w-28"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(unref(UDropdownMenu), {
							items: unref(table)?.tableApi?.getAllColumns().filter((column) => column.getCanHide()).map((column) => ({
								label: unref(upperFirst)(column.id),
								type: "checkbox",
								checked: column.getIsVisible(),
								onUpdateChecked(checked) {
									unref(table)?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked);
								},
								onSelect(e) {
									e?.preventDefault();
								}
							})),
							content: { align: "end" }
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(UButton), {
									label: "Columnas",
									color: "neutral",
									variant: "outline",
									"trailing-icon": "i-lucide-settings-2"
								}, null, _parent, _scopeId));
								else return [createVNode(unref(UButton), {
									label: "Columnas",
									color: "neutral",
									variant: "outline",
									"trailing-icon": "i-lucide-settings-2"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
						_push(ssrRenderComponent(_component_UTable, {
							ref_key: "table",
							ref: table,
							"column-filters": unref(columnFilters),
							"onUpdate:columnFilters": ($event) => isRef(columnFilters) ? columnFilters.value = $event : null,
							"column-visibility": unref(columnVisibility),
							"onUpdate:columnVisibility": ($event) => isRef(columnVisibility) ? columnVisibility.value = $event : null,
							"row-selection": unref(rowSelection),
							"onUpdate:rowSelection": ($event) => isRef(rowSelection) ? rowSelection.value = $event : null,
							pagination: unref(pagination),
							"onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
							"pagination-options": { getPaginationRowModel: unref(getPaginationRowModel)() },
							class: "shrink-0",
							data: unref(data),
							columns: unref(columns),
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, _parent, _scopeId));
						_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}><div class="flex items-center gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UPagination, {
							"default-page": (unref(table)?.tableApi?.getState().pagination.pageIndex || 0) + 1,
							"items-per-page": unref(table)?.tableApi?.getState().pagination.pageSize,
							total: unref(table)?.tableApi?.getFilteredRowModel().rows.length,
							"onUpdate:page": (p) => unref(table)?.tableApi?.setPageIndex(p - 1)
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
						_push(ssrRenderComponent(_component_BranchesEditModal, {
							open: unref(isEditOpen),
							"onUpdate:open": ($event) => isRef(isEditOpen) ? isEditOpen.value = $event : null,
							branch: unref(selectedBranch),
							onUpdated: unref(refresh)
						}, null, _parent, _scopeId));
						if (unref(selectedBranch)) _push(ssrRenderComponent(_component_BranchesSettingsModal, {
							open: unref(isSettingsOpen),
							"onUpdate:open": ($event) => isRef(isSettingsOpen) ? isSettingsOpen.value = $event : null,
							branch: unref(selectedBranch),
							onUpdated: unref(refresh)
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode(_component_UInput, {
							modelValue: unref(code),
							"onUpdate:modelValue": ($event) => isRef(code) ? code.value = $event : null,
							class: "max-w-sm",
							icon: "i-lucide-search",
							placeholder: "Filtrar por código..."
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "flex flex-wrap items-center gap-1.5" }, [createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: [
								{
									label: "Todos",
									value: "all"
								},
								{
									label: "Activas",
									value: "active"
								},
								{
									label: "Inactivas",
									value: "inactive"
								}
							],
							ui: { trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200" },
							placeholder: "Filtrar estado",
							class: "min-w-28"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(unref(UDropdownMenu), {
							items: unref(table)?.tableApi?.getAllColumns().filter((column) => column.getCanHide()).map((column) => ({
								label: unref(upperFirst)(column.id),
								type: "checkbox",
								checked: column.getIsVisible(),
								onUpdateChecked(checked) {
									unref(table)?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked);
								},
								onSelect(e) {
									e?.preventDefault();
								}
							})),
							content: { align: "end" }
						}, {
							default: withCtx(() => [createVNode(unref(UButton), {
								label: "Columnas",
								color: "neutral",
								variant: "outline",
								"trailing-icon": "i-lucide-settings-2"
							})]),
							_: 1
						}, 8, ["items"])])]),
						createVNode(_component_UTable, {
							ref_key: "table",
							ref: table,
							"column-filters": unref(columnFilters),
							"onUpdate:columnFilters": ($event) => isRef(columnFilters) ? columnFilters.value = $event : null,
							"column-visibility": unref(columnVisibility),
							"onUpdate:columnVisibility": ($event) => isRef(columnVisibility) ? columnVisibility.value = $event : null,
							"row-selection": unref(rowSelection),
							"onUpdate:rowSelection": ($event) => isRef(rowSelection) ? rowSelection.value = $event : null,
							pagination: unref(pagination),
							"onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
							"pagination-options": { getPaginationRowModel: unref(getPaginationRowModel)() },
							class: "shrink-0",
							data: unref(data),
							columns: unref(columns),
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, 8, [
							"column-filters",
							"onUpdate:columnFilters",
							"column-visibility",
							"onUpdate:columnVisibility",
							"row-selection",
							"onUpdate:rowSelection",
							"pagination",
							"onUpdate:pagination",
							"pagination-options",
							"data",
							"columns",
							"loading"
						]),
						createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto" }, [createVNode("div", { class: "flex items-center gap-1.5" }, [createVNode(_component_UPagination, {
							"default-page": (unref(table)?.tableApi?.getState().pagination.pageIndex || 0) + 1,
							"items-per-page": unref(table)?.tableApi?.getState().pagination.pageSize,
							total: unref(table)?.tableApi?.getFilteredRowModel().rows.length,
							"onUpdate:page": (p) => unref(table)?.tableApi?.setPageIndex(p - 1)
						}, null, 8, [
							"default-page",
							"items-per-page",
							"total",
							"onUpdate:page"
						])])]),
						createVNode(_component_BranchesEditModal, {
							open: unref(isEditOpen),
							"onUpdate:open": ($event) => isRef(isEditOpen) ? isEditOpen.value = $event : null,
							branch: unref(selectedBranch),
							onUpdated: unref(refresh)
						}, null, 8, [
							"open",
							"onUpdate:open",
							"branch",
							"onUpdated"
						]),
						unref(selectedBranch) ? (openBlock(), createBlock(_component_BranchesSettingsModal, {
							key: 0,
							open: unref(isSettingsOpen),
							"onUpdate:open": ($event) => isRef(isSettingsOpen) ? isSettingsOpen.value = $event : null,
							branch: unref(selectedBranch),
							onUpdated: unref(refresh)
						}, null, 8, [
							"open",
							"onUpdate:open",
							"branch",
							"onUpdated"
						])) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/branches.vue
var _sfc_setup = branches_vue_vue_type_script_setup_true_lang_default.setup;
branches_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/branches.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var branches_default = branches_vue_vue_type_script_setup_true_lang_default;

export { branches_default as default };
//# sourceMappingURL=branches-C2KtaPg4.mjs.map
