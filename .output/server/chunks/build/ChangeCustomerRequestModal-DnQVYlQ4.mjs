import { _ as _sfc_main$3 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$2 } from './RadioGroup-ByiZ78dl.mjs';
import { aP as useToast, f as _sfc_main$6 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$4 } from './Input-BC1I0LeZ.mjs';
import { e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { u as useCustomers } from './useCustomers-CQ23lYPq.mjs';
import { _ as _sfc_main$1 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$5 } from './Textarea-DLoRbkWE.mjs';
import { defineComponent, ref, reactive, computed, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import * as z from 'zod';

//#region app/components/customers/ChangeCustomerRequestModal.vue?vue&type=script&setup=true&lang.ts
var ChangeCustomerRequestModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ChangeCustomerRequestModal",
	__ssrInlineRender: true,
	props: {
		customer: {},
		open: { type: Boolean }
	},
	emits: ["update:open", "changed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			change_type: z.enum(["IDENTITY", "CONTACT"]),
			notes: z.string().optional()
		});
		const submitting = ref(false);
		const state = reactive({
			change_type: "IDENTITY",
			notes: void 0
		});
		const { requestCustomerChange, fieldLabels } = useCustomers();
		const toast = useToast();
		const IDENTITY_FIELDS = [
			"first_name",
			"middle_name",
			"last_name",
			"second_last_name",
			"curp",
			"rfc"
		];
		const CONTACT_FIELDS = [
			"home_phone",
			"mobile_phone",
			"email",
			"street",
			"external_number",
			"neighborhood",
			"city",
			"state",
			"postal_code"
		];
		const newValues = reactive({});
		const labels = fieldLabels();
		const person = computed(() => props.customer.person);
		const activeFields = computed(() => {
			return state.change_type === "IDENTITY" ? IDENTITY_FIELDS : CONTACT_FIELDS;
		});
		function currentValue(field) {
			const value = person.value?.[field];
			return typeof value === "string" ? value : "";
		}
		function resetForm() {
			state.change_type = "IDENTITY";
			state.notes = void 0;
			for (const key of Object.keys(newValues)) delete newValues[key];
		}
		watch(() => props.open, (isOpen) => {
			if (isOpen) resetForm();
		});
		async function onSubmit(event) {
			submitting.value = true;
			const changedValues = {};
			for (const field of activeFields.value) {
				const value = newValues[field]?.trim();
				if (value && value !== currentValue(field)) changedValues[field] = value;
			}
			if (Object.keys(changedValues).length === 0) {
				toast.add({
					title: "Sin cambios",
					description: "Escribe al menos un dato nuevo distinto al actual.",
					color: "warning"
				});
				submitting.value = false;
				return;
			}
			try {
				await requestCustomerChange(props.customer.id, {
					change_type: event.data.change_type,
					new_values: changedValues,
					notes: event.data.notes || void 0
				});
				toast.add({
					title: "Solicitud enviada",
					description: "El gerente revisará y aprobará el cambio de datos.",
					color: "success"
				});
				emit("changed");
			} catch (e) {
				const apiError = e;
				const apiErrors = apiError?.data?.errors;
				if ((apiError?.status === 422 || apiError?.statusCode === 422) && apiErrors) {
					const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => ({
						name: field.startsWith("new_values.") ? field.slice(11) : field,
						message: messages[0] || "Dato inválido"
					}));
					formRef.value?.setErrors(formattedErrors);
				}
				toast.add({
					title: "No se pudo enviar la solicitud",
					description: extractApiErrorMessage(e, "Verifica los datos e intenta de nuevo."),
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		const formRef = ref();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main;
			const _component_UForm = _sfc_main$1;
			const _component_URadioGroup = _sfc_main$2;
			const _component_UFormField = _sfc_main$3;
			const _component_UInput = _sfc_main$4;
			const _component_UTextarea = _sfc_main$5;
			const _component_UButton = _sfc_main$6;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: __props.open,
				title: "Solicitar cambio de datos",
				description: `${__props.customer.customer_code} — la cajera solicita corrección de datos al gerente`,
				"onUpdate:open": (open) => emit("update:open", open),
				onAfterLeave: resetForm
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						ref_key: "formRef",
						ref: formRef,
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_URadioGroup, {
									modelValue: unref(state).change_type,
									"onUpdate:modelValue": ($event) => unref(state).change_type = $event,
									items: [{
										label: "Datos de identidad (nombre, CURP, RFC)",
										value: "IDENTITY"
									}, {
										label: "Datos de contacto (teléfonos, correo, domicilio)",
										value: "CONTACT"
									}]
								}, null, _parent, _scopeId));
								_push(`<div class="grid grid-cols-1 gap-3 md:grid-cols-2"${_scopeId}><!--[-->`);
								ssrRenderList(unref(activeFields), (field) => {
									_push(ssrRenderComponent(_component_UFormField, {
										key: field,
										name: field,
										label: unref(labels)[field]
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(newValues)[field],
												"onUpdate:modelValue": ($event) => unref(newValues)[field] = $event,
												placeholder: currentValue(field) || "Sin valor actual",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(newValues)[field],
												"onUpdate:modelValue": ($event) => unref(newValues)[field] = $event,
												placeholder: currentValue(field) || "Sin valor actual",
												class: "w-full"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"placeholder"
											])];
										}),
										_: 2
									}, _parent, _scopeId));
								});
								_push(`<!--]--></div>`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Notas para el gerente",
									name: "notes"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
											placeholder: "Explica qué documento no coincide (opcional)...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
											placeholder: "Explica qué documento no coincide (opcional)...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => emit("update:open", false)
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Enviar solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_URadioGroup, {
									modelValue: unref(state).change_type,
									"onUpdate:modelValue": ($event) => unref(state).change_type = $event,
									items: [{
										label: "Datos de identidad (nombre, CURP, RFC)",
										value: "IDENTITY"
									}, {
										label: "Datos de contacto (teléfonos, correo, domicilio)",
										value: "CONTACT"
									}]
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode("div", { class: "grid grid-cols-1 gap-3 md:grid-cols-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(activeFields), (field) => {
									return openBlock(), createBlock(_component_UFormField, {
										key: field,
										name: field,
										label: unref(labels)[field]
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(newValues)[field],
											"onUpdate:modelValue": ($event) => unref(newValues)[field] = $event,
											placeholder: currentValue(field) || "Sin valor actual",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"placeholder"
										])]),
										_: 2
									}, 1032, ["name", "label"]);
								}), 128))]),
								createVNode(_component_UFormField, {
									label: "Notas para el gerente",
									name: "notes"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).notes,
										"onUpdate:modelValue": ($event) => unref(state).notes = $event,
										placeholder: "Explica qué documento no coincide (opcional)...",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => emit("update:open", false)
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Enviar solicitud",
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
						ref_key: "formRef",
						ref: formRef,
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_URadioGroup, {
								modelValue: unref(state).change_type,
								"onUpdate:modelValue": ($event) => unref(state).change_type = $event,
								items: [{
									label: "Datos de identidad (nombre, CURP, RFC)",
									value: "IDENTITY"
								}, {
									label: "Datos de contacto (teléfonos, correo, domicilio)",
									value: "CONTACT"
								}]
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode("div", { class: "grid grid-cols-1 gap-3 md:grid-cols-2" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(activeFields), (field) => {
								return openBlock(), createBlock(_component_UFormField, {
									key: field,
									name: field,
									label: unref(labels)[field]
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(newValues)[field],
										"onUpdate:modelValue": ($event) => unref(newValues)[field] = $event,
										placeholder: currentValue(field) || "Sin valor actual",
										class: "w-full"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"placeholder"
									])]),
									_: 2
								}, 1032, ["name", "label"]);
							}), 128))]),
							createVNode(_component_UFormField, {
								label: "Notas para el gerente",
								name: "notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).notes,
									"onUpdate:modelValue": ($event) => unref(state).notes = $event,
									placeholder: "Explica qué documento no coincide (opcional)...",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => emit("update:open", false)
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Enviar solicitud",
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
//#region app/components/customers/ChangeCustomerRequestModal.vue
var _sfc_setup = ChangeCustomerRequestModal_vue_vue_type_script_setup_true_lang_default.setup;
ChangeCustomerRequestModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/ChangeCustomerRequestModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ChangeCustomerRequestModal_default = Object.assign(ChangeCustomerRequestModal_vue_vue_type_script_setup_true_lang_default, { __name: "CustomersChangeCustomerRequestModal" });

export { ChangeCustomerRequestModal_default as C };
//# sourceMappingURL=ChangeCustomerRequestModal-DnQVYlQ4.mjs.map
