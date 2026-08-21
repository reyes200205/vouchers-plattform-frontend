import { al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main$4, k as _sfc_main$2$1, aP as useToast } from '../virtual/entry.mjs';
import { _ as _sfc_main$a } from './FormField-CDI7tGjZ.mjs';
import { _ as _sfc_main$c } from './RadioGroup-uhRnso-5.mjs';
import { _ as _sfc_main$6 } from './Tooltip-B7FUmlPq.mjs';
import { _ as _sfc_main$8 } from './Modal-BQ_M11w-.mjs';
import { _ as _sfc_main$3 } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$b } from './Input-YDRYCqsV.mjs';
import { a as _sfc_main$1, _ as _sfc_main$5 } from './DashboardNavbar-BzzI9nrt.mjs';
import { _ as _sfc_main$7 } from './DashboardSidebarCollapse-CBDjl-2o.mjs';
import { _ as _sfc_main$9 } from './Form-j1wdqi9R.mjs';
import { _ as _sfc_main$d } from './Textarea-ChxtXYe7.mjs';
import { u as useApplications } from './useApplications-BPt9XmPq.mjs';
import { _ as _sfc_main } from './Card-DDEFuVEm.mjs';
import { u as useNotifications, N as NotificationsSlideover_default } from './useNotifications-BK6LT-cF.mjs';
import { E as EvidencePhotoCapture_default } from './EvidencePhotoCapture-qvUItMgX.mjs';
import { defineComponent, withAsyncContext, computed, ref, withCtx, unref, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, isRef, useModel, reactive, useTemplateRef, watch, mergeProps, createCommentVNode, mergeModels, useSSRContext } from 'vue';
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
import './DashboardSidebarToggle-J0oVNQdJ.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-CLtAPs7l.mjs';
import './RovingFocusGroup-BqLcWsjw.mjs';
import './RovingFocusItem-ZwMKkLfk.mjs';
import './PopperArrow-CXqc9lvy.mjs';
import './Kbd-BZbceTrO.mjs';
import './overlay-7pzjQIHW.mjs';
import './Slideover-DdqRxQKN.mjs';
import './Alert-C59La3DT.mjs';

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
			const _component_UModal = _sfc_main$8;
			const _component_UForm = _sfc_main$9;
			const _component_UFormField = _sfc_main$a;
			const _component_UInput = _sfc_main$b;
			const _component_ApplicationsEvidencePhotoCapture = EvidencePhotoCapture_default;
			const _component_URadioGroup = _sfc_main$c;
			const _component_UTextarea = _sfc_main$d;
			const _component_UButton = _sfc_main$4;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: `Verificar solicitud de ${unref(applicantName)}`,
				description: "Registra el resultado de la visita de verificación"
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
									}),
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
									}),
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
							}),
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
							}),
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
var _sfc_setup$1 = VerifyModal_vue_vue_type_script_setup_true_lang_default.setup;
VerifyModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/verificador/VerifyModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var VerifyModal_default = Object.assign(VerifyModal_vue_vue_type_script_setup_true_lang_default, { __name: "VerificadorVerifyModal" });
//#endregion
//#region app/pages/registro-verificacion/verificador/dashboard_verificador.vue?vue&type=script&setup=true&lang.ts
var dashboard_verificador_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "dashboard_verificador",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { user } = useAuth();
		const { listApplications } = useApplications();
		const { listNotifications, markNotificationAsRead } = useNotifications();
		const { data: applications, status, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("verificador-applications", async () => {
			return (await listApplications({
				status: "EN_REVISION",
				per_page: 100
			})).data;
		})), __temp = await __temp, __restore(), __temp);
		const myApplications = computed(() => {
			const uid = user.value?.id;
			return (applications.value ?? []).filter((app) => app.assigned_verifier_id === uid);
		});
		function applicantName(app) {
			const p = app.applicant;
			if (!p) return "Solicitante";
			return [p.first_name, p.last_name].filter(Boolean).join(" ");
		}
		function applicantAddress(app) {
			const p = app.applicant;
			if (!p) return "—";
			return [
				p.street,
				p.external_number,
				p.neighborhood,
				p.city
			].filter(Boolean).join(", ") || "—";
		}
		const isVerifyOpen = ref(false);
		const selectedApplication = ref(null);
		function openVerify(app) {
			selectedApplication.value = app;
			isVerifyOpen.value = true;
		}
		const isNotificationsOpen = ref(false);
		const { data: notifications, status: notificationsStatus, refresh: refreshNotifications } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("verificador-notifications", () => listNotifications({ per_page: 20 }), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const unreadCount = computed(() => (notifications.value ?? []).filter((n) => !n.read_at).length);
		async function markAsRead(id) {
			const notification = (notifications.value ?? []).find((item) => item.id === id);
			if (!notification || notification.read_at) return;
			try {
				await markNotificationAsRead(id);
				await refreshNotifications();
			} catch (e) {
				console.error(e);
			}
		}
		const stats = computed(() => {
			return {
				pending: myApplications.value.length,
				verifiedToday: myApplications.value.filter((app) => {
					return app.verification?.result === "VERIFICADA" && app.reviewed_at && new Date(app.reviewed_at).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
				}).length,
				rejectedToday: myApplications.value.filter((app) => {
					return app.verification?.result === "RECHAZADA" && app.reviewed_at && new Date(app.reviewed_at).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
				}).length
			};
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$7;
			const _component_UTooltip = _sfc_main$6;
			const _component_UButton = _sfc_main$4;
			const _component_UChip = _sfc_main$2$1;
			const _component_UIcon = _sfc_main$2;
			const _component_UCard = _sfc_main;
			const _component_UBadge = _sfc_main$3;
			const _component_VerificadorVerifyModal = VerifyModal_default;
			const _component_VerificadorNotificationsSlideover = NotificationsSlideover_default;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "verificador-dashboard" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, {
						title: "Panel Verificador",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UTooltip, { text: "Notificaciones" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										square: "",
										onClick: ($event) => isNotificationsOpen.value = true
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UChip, {
												color: "error",
												show: unref(unreadCount) > 0,
												inset: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UIcon, {
														name: "i-lucide-bell",
														class: "size-5 shrink-0"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UIcon, {
														name: "i-lucide-bell",
														class: "size-5 shrink-0"
													})];
												}),
												_: 1
											}, _parent, _scopeId));
											else return [createVNode(_component_UChip, {
												color: "error",
												show: unref(unreadCount) > 0,
												inset: ""
											}, {
												default: withCtx(() => [createVNode(_component_UIcon, {
													name: "i-lucide-bell",
													class: "size-5 shrink-0"
												})]),
												_: 1
											}, 8, ["show"])];
										}),
										_: 1
									}, _parent, _scopeId));
									else return [createVNode(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										square: "",
										onClick: ($event) => isNotificationsOpen.value = true
									}, {
										default: withCtx(() => [createVNode(_component_UChip, {
											color: "error",
											show: unref(unreadCount) > 0,
											inset: ""
										}, {
											default: withCtx(() => [createVNode(_component_UIcon, {
												name: "i-lucide-bell",
												class: "size-5 shrink-0"
											})]),
											_: 1
										}, 8, ["show"])]),
										_: 1
									}, 8, ["onClick"])];
								}),
								_: 1
							}, _parent, _scopeId));
							else return [createVNode(_component_UTooltip, { text: "Notificaciones" }, {
								default: withCtx(() => [createVNode(_component_UButton, {
									color: "neutral",
									variant: "ghost",
									square: "",
									onClick: ($event) => isNotificationsOpen.value = true
								}, {
									default: withCtx(() => [createVNode(_component_UChip, {
										color: "error",
										show: unref(unreadCount) > 0,
										inset: ""
									}, {
										default: withCtx(() => [createVNode(_component_UIcon, {
											name: "i-lucide-bell",
											class: "size-5 shrink-0"
										})]),
										_: 1
									}, 8, ["show"])]),
									_: 1
								}, 8, ["onClick"])]),
								_: 1
							})];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, {
						title: "Panel Verificador",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_UTooltip, { text: "Notificaciones" }, {
							default: withCtx(() => [createVNode(_component_UButton, {
								color: "neutral",
								variant: "ghost",
								square: "",
								onClick: ($event) => isNotificationsOpen.value = true
							}, {
								default: withCtx(() => [createVNode(_component_UChip, {
									color: "error",
									show: unref(unreadCount) > 0,
									inset: ""
								}, {
									default: withCtx(() => [createVNode(_component_UIcon, {
										name: "i-lucide-bell",
										class: "size-5 shrink-0"
									})]),
									_: 1
								}, 8, ["show"])]),
								_: 1
							}, 8, ["onClick"])]),
							_: 1
						})]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-6 space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-clock",
										class: "size-5 text-warning"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Pendientes de Verificación </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-clock",
									class: "size-5 text-warning"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Pendientes de Verificación ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(stats).pending)}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(stats).pending), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-circle-check",
										class: "size-5 text-success"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Verificadas Hoy </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-circle-check",
									class: "size-5 text-success"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Verificadas Hoy ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(stats).verifiedToday)}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(stats).verifiedToday), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-circle-x",
										class: "size-5 text-error"
									}, null, _parent, _scopeId));
									_push(`<h3 class="font-semibold text-sm text-dimmed"${_scopeId}> Rechazadas Hoy </h3></div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-circle-x",
									class: "size-5 text-error"
								}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Rechazadas Hoy ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(unref(stats).rejectedToday)}</div>`);
								else return [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(stats).rejectedToday), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Solicitudes asignadas por verificar </h3>`);
									_push(ssrRenderComponent(_component_UButton, {
										label: "Actualizar",
										icon: "i-lucide-refresh-cw",
										color: "neutral",
										variant: "subtle",
										loading: unref(status) === "pending",
										onClick: ($event) => unref(refresh)()
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes asignadas por verificar "), createVNode(_component_UButton, {
									label: "Actualizar",
									icon: "i-lucide-refresh-cw",
									color: "neutral",
									variant: "subtle",
									loading: unref(status) === "pending",
									onClick: ($event) => unref(refresh)()
								}, null, 8, ["loading", "onClick"])])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(status) === "pending") _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> Cargando solicitudes... </div>`);
								else if (!unref(myApplications).length) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No tienes solicitudes asignadas pendientes de verificación. </div>`);
								else {
									_push(`<ul class="divide-y divide-default"${_scopeId}><!--[-->`);
									ssrRenderList(unref(myApplications), (app) => {
										_push(`<li class="py-3 flex items-center justify-between gap-4"${_scopeId}><div class="min-w-0"${_scopeId}><p class="font-medium text-highlighted truncate"${_scopeId}>${ssrInterpolate(applicantName(app))}</p><p class="text-sm text-dimmed truncate"${_scopeId}>${ssrInterpolate(applicantAddress(app))}</p><p class="text-xs text-dimmed mt-1"${_scopeId}> Sucursal: ${ssrInterpolate(app.branch?.name ?? "—")}</p></div><div class="flex items-center gap-2 shrink-0"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UBadge, {
											color: "warning",
											variant: "subtle"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(` En revisión `);
												else return [createTextVNode(" En revisión ")];
											}),
											_: 2
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_UButton, {
											label: "Verificar",
											icon: "i-lucide-shield-check",
											color: "primary",
											variant: "solid",
											onClick: ($event) => openVerify(app)
										}, null, _parent, _scopeId));
										_push(`</div></li>`);
									});
									_push(`<!--]--></ul>`);
								}
								else return [unref(status) === "pending" ? (openBlock(), createBlock("div", {
									key: 0,
									class: "text-sm text-center py-8 text-dimmed"
								}, " Cargando solicitudes... ")) : !unref(myApplications).length ? (openBlock(), createBlock("div", {
									key: 1,
									class: "text-sm text-center py-8 text-dimmed"
								}, " No tienes solicitudes asignadas pendientes de verificación. ")) : (openBlock(), createBlock("ul", {
									key: 2,
									class: "divide-y divide-default"
								}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(myApplications), (app) => {
									return openBlock(), createBlock("li", {
										key: app.id,
										class: "py-3 flex items-center justify-between gap-4"
									}, [createVNode("div", { class: "min-w-0" }, [
										createVNode("p", { class: "font-medium text-highlighted truncate" }, toDisplayString(applicantName(app)), 1),
										createVNode("p", { class: "text-sm text-dimmed truncate" }, toDisplayString(applicantAddress(app)), 1),
										createVNode("p", { class: "text-xs text-dimmed mt-1" }, " Sucursal: " + toDisplayString(app.branch?.name ?? "—"), 1)
									]), createVNode("div", { class: "flex items-center gap-2 shrink-0" }, [createVNode(_component_UBadge, {
										color: "warning",
										variant: "subtle"
									}, {
										default: withCtx(() => [createTextVNode(" En revisión ")]),
										_: 1
									}), createVNode(_component_UButton, {
										label: "Verificar",
										icon: "i-lucide-shield-check",
										color: "primary",
										variant: "solid",
										onClick: ($event) => openVerify(app)
									}, null, 8, ["onClick"])])]);
								}), 128))]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "p-6 space-y-6" }, [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-clock",
								class: "size-5 text-warning"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Pendientes de Verificación ")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(stats).pending), 1)]),
							_: 1
						}),
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-circle-check",
								class: "size-5 text-success"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Verificadas Hoy ")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(stats).verifiedToday), 1)]),
							_: 1
						}),
						createVNode(_component_UCard, null, {
							header: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-circle-x",
								class: "size-5 text-error"
							}), createVNode("h3", { class: "font-semibold text-sm text-dimmed" }, " Rechazadas Hoy ")])]),
							default: withCtx(() => [createVNode("div", { class: "text-3xl font-bold mt-2" }, toDisplayString(unref(stats).rejectedToday), 1)]),
							_: 1
						})
					]), createVNode(_component_UCard, null, {
						header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes asignadas por verificar "), createVNode(_component_UButton, {
							label: "Actualizar",
							icon: "i-lucide-refresh-cw",
							color: "neutral",
							variant: "subtle",
							loading: unref(status) === "pending",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["loading", "onClick"])])]),
						default: withCtx(() => [unref(status) === "pending" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "text-sm text-center py-8 text-dimmed"
						}, " Cargando solicitudes... ")) : !unref(myApplications).length ? (openBlock(), createBlock("div", {
							key: 1,
							class: "text-sm text-center py-8 text-dimmed"
						}, " No tienes solicitudes asignadas pendientes de verificación. ")) : (openBlock(), createBlock("ul", {
							key: 2,
							class: "divide-y divide-default"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(myApplications), (app) => {
							return openBlock(), createBlock("li", {
								key: app.id,
								class: "py-3 flex items-center justify-between gap-4"
							}, [createVNode("div", { class: "min-w-0" }, [
								createVNode("p", { class: "font-medium text-highlighted truncate" }, toDisplayString(applicantName(app)), 1),
								createVNode("p", { class: "text-sm text-dimmed truncate" }, toDisplayString(applicantAddress(app)), 1),
								createVNode("p", { class: "text-xs text-dimmed mt-1" }, " Sucursal: " + toDisplayString(app.branch?.name ?? "—"), 1)
							]), createVNode("div", { class: "flex items-center gap-2 shrink-0" }, [createVNode(_component_UBadge, {
								color: "warning",
								variant: "subtle"
							}, {
								default: withCtx(() => [createTextVNode(" En revisión ")]),
								_: 1
							}), createVNode(_component_UButton, {
								label: "Verificar",
								icon: "i-lucide-shield-check",
								color: "primary",
								variant: "solid",
								onClick: ($event) => openVerify(app)
							}, null, 8, ["onClick"])])]);
						}), 128))]))]),
						_: 1
					})])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_VerificadorVerifyModal, {
				open: unref(isVerifyOpen),
				"onUpdate:open": ($event) => isRef(isVerifyOpen) ? isVerifyOpen.value = $event : null,
				application: unref(selectedApplication),
				onVerified: unref(refresh)
			}, null, _parent));
			_push(ssrRenderComponent(_component_VerificadorNotificationsSlideover, {
				open: unref(isNotificationsOpen),
				"onUpdate:open": ($event) => isRef(isNotificationsOpen) ? isNotificationsOpen.value = $event : null,
				notifications: unref(notifications) ?? [],
				loading: unref(notificationsStatus) === "pending",
				onRead: markAsRead
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/verificador/dashboard_verificador.vue
var _sfc_setup = dashboard_verificador_vue_vue_type_script_setup_true_lang_default.setup;
dashboard_verificador_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/verificador/dashboard_verificador.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_verificador_default = dashboard_verificador_vue_vue_type_script_setup_true_lang_default;

export { dashboard_verificador_default as default };
//# sourceMappingURL=dashboard_verificador-DghGkEDo.mjs.map
