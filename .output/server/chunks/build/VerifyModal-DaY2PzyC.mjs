import { _ as _sfc_main$2 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$4 } from './RadioGroup-ByiZ78dl.mjs';
import { aP as useToast, f as _sfc_main$6 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$3 } from './Input-BC1I0LeZ.mjs';
import { _ as _sfc_main$1 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$5 } from './Textarea-DLoRbkWE.mjs';
import { u as useApplications } from './useApplications-DC2_85yO.mjs';
import { E as EvidencePhotoCapture_default } from './EvidencePhotoCapture-_HZkz42W.mjs';
import { defineComponent, useModel, reactive, ref, useTemplateRef, watch, computed, mergeProps, unref, withCtx, createVNode, isRef, openBlock, createBlock, toDisplayString, createCommentVNode, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import * as z from 'zod';

//#region app/components/verificador/VerifyModal.vue?vue&type=script&setup=true&lang.ts
var VerifyModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VerifyModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ application: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["verified"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useModel(__props, "open");
		const emit = __emit;
		const schema = z.object({
			result: z.enum(["VERIFICADA", "RECHAZADA"]),
			visit_date: z.string().min(1, "Requerido"),
			notes: z.string().optional()
		}).superRefine((data, ctx) => {
			if (data.result === "RECHAZADA" && !data.notes) ctx.addIssue({
				path: ["notes"],
				code: "custom",
				message: "Explica el motivo del rechazo"
			});
		});
		const state = reactive({
			result: void 0,
			visit_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			notes: ""
		});
		const { submitVerification, uploadVerificationPhoto } = useApplications();
		const toast = useToast();
		const submitting = ref(false);
		const frontPhotoPath = ref(null);
		const idWithPersonPhotoPath = ref(null);
		const proofOfAddressPhotoPath = ref(null);
		const frontPhotoRef = useTemplateRef("frontPhotoRef");
		const idWithPersonPhotoRef = useTemplateRef("idWithPersonPhotoRef");
		const proofOfAddressPhotoRef = useTemplateRef("proofOfAddressPhotoRef");
		watch(() => props.application, () => {
			state.result = void 0;
			state.visit_date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			state.notes = "";
			frontPhotoRef.value?.reset();
			idWithPersonPhotoRef.value?.reset();
			proofOfAddressPhotoRef.value?.reset();
		}, { immediate: true });
		const applicantName = computed(() => {
			const p = props.application?.applicant;
			if (!p) return "Solicitante";
			return [p.first_name, p.last_name].filter(Boolean).join(" ");
		});
		const missingEvidence = computed(() => {
			const missing = [];
			if (!frontPhotoPath.value) missing.push("la fotografía de fachada");
			if (!idWithPersonPhotoPath.value) missing.push("la foto del solicitante con su INE");
			if (!proofOfAddressPhotoPath.value) missing.push("la foto del comprobante de domicilio");
			return missing;
		});
		async function onSubmit(event) {
			if (!props.application) return;
			if (missingEvidence.value.length > 0) {
				toast.add({
					title: "Falta evidencia fotográfica",
					description: `Toma o sube ${missingEvidence.value.join(", ")} antes de registrar la verificación.`,
					color: "warning"
				});
				return;
			}
			submitting.value = true;
			try {
				await submitVerification(props.application.id, {
					result: event.data.result,
					visit_date: event.data.visit_date,
					notes: event.data.notes || void 0,
					front_photo: frontPhotoPath.value,
					id_with_person_photo: idWithPersonPhotoPath.value,
					proof_of_address_photo: proofOfAddressPhotoPath.value
				});
				toast.add({
					title: event.data.result === "VERIFICADA" ? "Solicitud verificada" : "Solicitud rechazada",
					description: `La visita a ${applicantName.value} fue registrada correctamente`,
					color: "success"
				});
				open.value = false;
				emit("verified");
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo registrar la verificación. Verifica los datos e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main;
			const _component_UForm = _sfc_main$1;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_ApplicationsEvidencePhotoCapture = EvidencePhotoCapture_default;
			const _component_URadioGroup = _sfc_main$4;
			const _component_UTextarea = _sfc_main$5;
			const _component_UButton = _sfc_main$6;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: `Verificar solicitud de ${unref(applicantName)}`,
				description: "Registra el resultado de la visita de verificación",
				ui: { content: "max-w-4xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (__props.application) {
						_push(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-3 text-sm"${_scopeId}><div${_scopeId}><p class="text-dimmed"${_scopeId}> Sucursal </p><p class="font-medium"${_scopeId}>${ssrInterpolate(__props.application.branch?.name ?? "—")}</p></div><div${_scopeId}><p class="text-dimmed"${_scopeId}> Teléfono </p><p class="font-medium"${_scopeId}>${ssrInterpolate(__props.application.applicant?.mobile_phone ?? "—")}</p></div><div class="col-span-2"${_scopeId}><p class="text-dimmed"${_scopeId}> Domicilio </p><p class="font-medium"${_scopeId}>${ssrInterpolate([
							__props.application.applicant?.street,
							__props.application.applicant?.external_number,
							__props.application.applicant?.neighborhood,
							__props.application.applicant?.city
						].filter(Boolean).join(", ") || "—")}</p></div></div>`);
						_push(ssrRenderComponent(_component_UForm, {
							schema: unref(schema),
							state: unref(state),
							class: "space-y-4",
							onSubmit
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UFormField, {
										required: "",
										label: "Fecha de visita",
										name: "visit_date"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(state).visit_date,
												"onUpdate:modelValue": ($event) => unref(state).visit_date = $event,
												type: "date",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(state).visit_date,
												"onUpdate:modelValue": ($event) => unref(state).visit_date = $event,
												type: "date",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Fotografía de fachada",
										required: ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "frontPhotoRef",
												ref: frontPhotoRef,
												modelValue: unref(frontPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(frontPhotoPath) ? frontPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "front_photo"),
												label: "Fotografía de fachada"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "frontPhotoRef",
												ref: frontPhotoRef,
												modelValue: unref(frontPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(frontPhotoPath) ? frontPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "front_photo"),
												label: "Fotografía de fachada"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Solicitante sosteniendo su INE",
										required: ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "idWithPersonPhotoRef",
												ref: idWithPersonPhotoRef,
												modelValue: unref(idWithPersonPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(idWithPersonPhotoPath) ? idWithPersonPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "id_with_person_photo"),
												label: "Solicitante con su INE"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "idWithPersonPhotoRef",
												ref: idWithPersonPhotoRef,
												modelValue: unref(idWithPersonPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(idWithPersonPhotoPath) ? idWithPersonPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "id_with_person_photo"),
												label: "Solicitante con su INE"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Comprobante de domicilio",
										required: ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "proofOfAddressPhotoRef",
												ref: proofOfAddressPhotoRef,
												modelValue: unref(proofOfAddressPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(proofOfAddressPhotoPath) ? proofOfAddressPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "proof_of_address_photo"),
												label: "Comprobante de domicilio"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "proofOfAddressPhotoRef",
												ref: proofOfAddressPhotoRef,
												modelValue: unref(proofOfAddressPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(proofOfAddressPhotoPath) ? proofOfAddressPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "proof_of_address_photo"),
												label: "Comprobante de domicilio"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div>`);
									_push(ssrRenderComponent(_component_UFormField, {
										label: "Resultado",
										name: "result"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_URadioGroup, {
												modelValue: unref(state).result,
												"onUpdate:modelValue": ($event) => unref(state).result = $event,
												orientation: "horizontal",
												items: [{
													label: "Verificada",
													value: "VERIFICADA"
												}, {
													label: "Rechazada",
													value: "RECHAZADA"
												}]
											}, null, _parent, _scopeId));
											else return [createVNode(_component_URadioGroup, {
												modelValue: unref(state).result,
												"onUpdate:modelValue": ($event) => unref(state).result = $event,
												orientation: "horizontal",
												items: [{
													label: "Verificada",
													value: "VERIFICADA"
												}, {
													label: "Rechazada",
													value: "RECHAZADA"
												}]
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										required: unref(state).result === "RECHAZADA",
										label: "Notas",
										name: "notes"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(state).notes,
												"onUpdate:modelValue": ($event) => unref(state).notes = $event,
												class: "w-full",
												placeholder: "Observaciones de la visita..."
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(state).notes,
												"onUpdate:modelValue": ($event) => unref(state).notes = $event,
												class: "w-full",
												placeholder: "Observaciones de la visita..."
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
										label: "Registrar verificación",
										color: "primary",
										variant: "solid",
										type: "submit",
										loading: unref(submitting)
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [
									createVNode(_component_UFormField, {
										required: "",
										label: "Fecha de visita",
										name: "visit_date"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).visit_date,
											"onUpdate:modelValue": ($event) => unref(state).visit_date = $event,
											type: "date",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Fotografía de fachada",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "frontPhotoRef",
												ref: frontPhotoRef,
												modelValue: unref(frontPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(frontPhotoPath) ? frontPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "front_photo"),
												label: "Fotografía de fachada"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Solicitante sosteniendo su INE",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "idWithPersonPhotoRef",
												ref: idWithPersonPhotoRef,
												modelValue: unref(idWithPersonPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(idWithPersonPhotoPath) ? idWithPersonPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "id_with_person_photo"),
												label: "Solicitante con su INE"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Comprobante de domicilio",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												ref_key: "proofOfAddressPhotoRef",
												ref: proofOfAddressPhotoRef,
												modelValue: unref(proofOfAddressPhotoPath),
												"onUpdate:modelValue": ($event) => isRef(proofOfAddressPhotoPath) ? proofOfAddressPhotoPath.value = $event : null,
												upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "proof_of_address_photo"),
												label: "Comprobante de domicilio"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])]),
											_: 1
										})
									]),
									createVNode(_component_UFormField, {
										label: "Resultado",
										name: "result"
									}, {
										default: withCtx(() => [createVNode(_component_URadioGroup, {
											modelValue: unref(state).result,
											"onUpdate:modelValue": ($event) => unref(state).result = $event,
											orientation: "horizontal",
											items: [{
												label: "Verificada",
												value: "VERIFICADA"
											}, {
												label: "Rechazada",
												value: "RECHAZADA"
											}]
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										required: unref(state).result === "RECHAZADA",
										label: "Notas",
										name: "notes"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).notes,
											"onUpdate:modelValue": ($event) => unref(state).notes = $event,
											class: "w-full",
											placeholder: "Observaciones de la visita..."
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}, 8, ["required"]),
									createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
										label: "Cancelar",
										color: "neutral",
										variant: "subtle",
										onClick: ($event) => open.value = false
									}, null, 8, ["onClick"]), createVNode(_component_UButton, {
										label: "Registrar verificación",
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
					} else _push(`<!---->`);
					else return [__props.application ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-4"
					}, [createVNode("div", { class: "grid grid-cols-2 gap-3 text-sm" }, [
						createVNode("div", null, [createVNode("p", { class: "text-dimmed" }, " Sucursal "), createVNode("p", { class: "font-medium" }, toDisplayString(__props.application.branch?.name ?? "—"), 1)]),
						createVNode("div", null, [createVNode("p", { class: "text-dimmed" }, " Teléfono "), createVNode("p", { class: "font-medium" }, toDisplayString(__props.application.applicant?.mobile_phone ?? "—"), 1)]),
						createVNode("div", { class: "col-span-2" }, [createVNode("p", { class: "text-dimmed" }, " Domicilio "), createVNode("p", { class: "font-medium" }, toDisplayString([
							__props.application.applicant?.street,
							__props.application.applicant?.external_number,
							__props.application.applicant?.neighborhood,
							__props.application.applicant?.city
						].filter(Boolean).join(", ") || "—"), 1)])
					]), createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UFormField, {
								required: "",
								label: "Fecha de visita",
								name: "visit_date"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).visit_date,
									"onUpdate:modelValue": ($event) => unref(state).visit_date = $event,
									type: "date",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
								createVNode(_component_UFormField, {
									label: "Fotografía de fachada",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
										ref_key: "frontPhotoRef",
										ref: frontPhotoRef,
										modelValue: unref(frontPhotoPath),
										"onUpdate:modelValue": ($event) => isRef(frontPhotoPath) ? frontPhotoPath.value = $event : null,
										upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "front_photo"),
										label: "Fotografía de fachada"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"upload"
									])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Solicitante sosteniendo su INE",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
										ref_key: "idWithPersonPhotoRef",
										ref: idWithPersonPhotoRef,
										modelValue: unref(idWithPersonPhotoPath),
										"onUpdate:modelValue": ($event) => isRef(idWithPersonPhotoPath) ? idWithPersonPhotoPath.value = $event : null,
										upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "id_with_person_photo"),
										label: "Solicitante con su INE"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"upload"
									])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Comprobante de domicilio",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
										ref_key: "proofOfAddressPhotoRef",
										ref: proofOfAddressPhotoRef,
										modelValue: unref(proofOfAddressPhotoPath),
										"onUpdate:modelValue": ($event) => isRef(proofOfAddressPhotoPath) ? proofOfAddressPhotoPath.value = $event : null,
										upload: (file) => unref(uploadVerificationPhoto)(__props.application.id, file, "proof_of_address_photo"),
										label: "Comprobante de domicilio"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"upload"
									])]),
									_: 1
								})
							]),
							createVNode(_component_UFormField, {
								label: "Resultado",
								name: "result"
							}, {
								default: withCtx(() => [createVNode(_component_URadioGroup, {
									modelValue: unref(state).result,
									"onUpdate:modelValue": ($event) => unref(state).result = $event,
									orientation: "horizontal",
									items: [{
										label: "Verificada",
										value: "VERIFICADA"
									}, {
										label: "Rechazada",
										value: "RECHAZADA"
									}]
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								required: unref(state).result === "RECHAZADA",
								label: "Notas",
								name: "notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).notes,
									"onUpdate:modelValue": ($event) => unref(state).notes = $event,
									class: "w-full",
									placeholder: "Observaciones de la visita..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}, 8, ["required"]),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Registrar verificación",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/verificador/VerifyModal.vue
var _sfc_setup = VerifyModal_vue_vue_type_script_setup_true_lang_default.setup;
VerifyModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/verificador/VerifyModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var VerifyModal_default = Object.assign(VerifyModal_vue_vue_type_script_setup_true_lang_default, { __name: "VerificadorVerifyModal" });

export { VerifyModal_default as V };
//# sourceMappingURL=VerifyModal-DaY2PzyC.mjs.map
