import { al as useAuth, aP as useToast, aL as useRouter, j as _sfc_main$2$1, f as _sfc_main$a } from '../virtual/entry.mjs';
import { _ as _sfc_main$7 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$9 } from './InputNumber-VA_FGM2O.mjs';
import { _ as _sfc_main$5 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$4 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$6 } from './Input-BC1I0LeZ.mjs';
import { a as isValidRfc, i as isValidCurp, e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { a as _sfc_main$1, _ as _sfc_main$b } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$c } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { _ as _sfc_main$2 } from './Form-CCmdJDgC.mjs';
import { _ as _sfc_main$8 } from './Textarea-DLoRbkWE.mjs';
import { u as useApplications } from './useApplications-DC2_85yO.mjs';
import { _ as _sfc_main$3 } from './Card-CmMDF934.mjs';
import { _ as _sfc_main } from './Alert-CSACBiI_.mjs';
import { E as EvidencePhotoCapture_default } from './EvidencePhotoCapture-_HZkz42W.mjs';
import { defineComponent, computed, reactive, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, isRef, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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

//#region app/pages/registro-verificacion/new.vue?vue&type=script&setup=true&lang.ts
var housingDimensionUnit = "m2";
var new_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new",
	__ssrInlineRender: true,
	setup(__props) {
		const { roleCode, user } = useAuth();
		const isCoordinator = computed(() => roleCode.value === "coordinator");
		const { createApplication, uploadApplicationDocument } = useApplications();
		const toast = useToast();
		const router = useRouter();
		const coordinatorRole = computed(() => user.value?.roles?.find((r) => r.code === "coordinator") ?? null);
		const coordinatorBranchId = computed(() => coordinatorRole.value?.branch_id ?? null);
		const coordinatorBranchName = computed(() => coordinatorRole.value?.branch_name ?? null);
		const schema = z.object({
			branch_id: z.number({ error: "Tu usuario no tiene una sucursal asignada" }),
			first_name: z.string().min(2, "El nombre es obligatorio y debe tener al menos 2 letras"),
			middle_name: z.string().optional(),
			last_name: z.string().min(2, "El apellido paterno es obligatorio y debe tener al menos 2 letras"),
			second_last_name: z.string().min(2, "El apellido materno es obligatorio y debe tener al menos 2 letras"),
			gender: z.string().min(1, "El género es obligatorio"),
			birth_date: z.string().min(1, "La fecha de nacimiento es obligatoria").refine((value) => {
				if (!value) return false;
				const birth = new Date(value);
				const today = /* @__PURE__ */ new Date();
				let age = today.getFullYear() - birth.getFullYear();
				const m = today.getMonth() - birth.getMonth();
				if (m < 0 || m === 0 && today.getDate() < birth.getDate()) age--;
				return age >= 18;
			}, "El solicitante debe ser mayor de 18 años"),
			curp: z.string().min(1, "La CURP es obligatoria").length(18, "La CURP debe tener exactamente 18 caracteres").refine((value) => isValidCurp(value), "CURP inválida (18 caracteres, formato oficial)"),
			rfc: z.string().min(1, "El RFC es obligatorio").length(13, "El RFC debe tener exactamente 13 caracteres (Persona Física)").refine((value) => isValidRfc(value), "RFC con formato inválido"),
			home_phone: z.string().min(1, "El otro teléfono de contacto es obligatorio").length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
			mobile_phone: z.string().min(1, "El teléfono móvil es obligatorio").length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
			email: z.string().min(1, "El correo electrónico es obligatorio").email("Correo electrónico inválido"),
			street: z.string().min(1, "La calle es obligatoria"),
			external_number: z.string().min(1, "El número exterior es obligatorio").refine((value) => /^\d+$/.test(value), "Solo se permiten dígitos, sin letras ni espacios"),
			neighborhood: z.string().min(1, "La colonia es obligatoria"),
			city: z.string().min(1, "La ciudad es obligatoria"),
			state: z.string().min(1, "El estado es obligatorio"),
			postal_code: z.string().min(1, "El código postal es obligatorio").length(5, "Debe tener exactamente 5 dígitos, sin letras"),
			notes: z.string().optional(),
			street_references: z.string().optional(),
			requested_credit_limit: z.number({ error: "Captura el límite de crédito solicitado" }).min(1e3, "El límite de crédito solicitado debe ser de al menos $1,000"),
			occupation_type: z.string().min(1, "Selecciona la ocupación"),
			occupation_monthly_income: z.number({ error: "Captura la ganancia al mes" }).min(0, "La ganancia no puede ser negativa"),
			occupation_place: z.string().min(1, "El lugar de ocupación es obligatorio"),
			occupation_position: z.string().min(1, "El puesto o grado es obligatorio"),
			occupation_phone: z.string().min(1, "El teléfono del trabajo o escuela es obligatorio").length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras"),
			occupation_years: z.number({ error: "Especifica la antigüedad" }).min(0, "La antigüedad no puede ser negativa"),
			housing_ownership_type: z.string().min(1, "Selecciona la tenencia de vivienda"),
			housing_dimensions: z.string().min(1, "Las dimensiones son obligatorias").refine((value) => /^\d+$/.test(value), "Solo se permiten números, sin letras ni espacios"),
			housing_years: z.number({ error: "Especifica los años de vivienda" }).min(0, "Los años no pueden ser negativos"),
			work_reference_name: z.string().min(1, "La referencia laboral es obligatoria"),
			work_reference_phone: z.string().min(1, "El teléfono de referencia es obligatorio").length(10, "Debe tener exactamente 10 dígitos, sin espacios ni letras")
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
			street_references: "",
			requested_credit_limit: void 0,
			occupation_type: void 0,
			occupation_place: "",
			occupation_position: "",
			occupation_phone: "",
			occupation_years: void 0,
			occupation_monthly_income: void 0,
			housing_ownership_type: void 0,
			housing_dimensions: "",
			housing_years: void 0,
			work_reference_name: "",
			work_reference_phone: ""
		});
		const familyMembers = ref([{
			name: "",
			relationship: "",
			phone: "",
			age: void 0
		}]);
		function addFamilyMember() {
			familyMembers.value.push({
				name: "",
				relationship: "",
				phone: "",
				age: void 0
			});
		}
		function removeFamilyMember(index) {
			familyMembers.value.splice(index, 1);
		}
		const vehicles = ref([]);
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
		function onlyDigits(value, maxLength) {
			return value.replace(/\D/g, "").slice(0, maxLength);
		}
		const housingDimensionUnitItems = [{
			label: "Metros cuadrados (m²)",
			value: "m2"
		}];
		const applicantAge = computed(() => {
			if (!state.birth_date) return null;
			const birth = new Date(state.birth_date);
			if (Number.isNaN(birth.getTime())) return null;
			const today = /* @__PURE__ */ new Date();
			let age = today.getFullYear() - birth.getFullYear();
			const m = today.getMonth() - birth.getMonth();
			if (m < 0 || m === 0 && today.getDate() < birth.getDate()) age--;
			return age;
		});
		const maxOccupationYears = computed(() => applicantAge.value !== null ? Math.max(0, applicantAge.value - 18) : null);
		const occupationYearsExceeded = computed(() => maxOccupationYears.value !== null && (state.occupation_years ?? 0) > maxOccupationYears.value);
		const maxHousingYears = computed(() => applicantAge.value);
		const housingYearsExceeded = computed(() => maxHousingYears.value !== null && (state.housing_years ?? 0) > maxHousingYears.value);
		const maxVehicleYear = (/* @__PURE__ */ new Date()).getFullYear() + 2;
		function vehicleYearExceeded(year) {
			return /^\d{4}$/.test(year) && Number(year) > maxVehicleYear;
		}
		function hasExtraValidationErrors() {
			return occupationYearsExceeded.value || housingYearsExceeded.value || vehicles.value.some((v) => v.year && vehicleYearExceeded(v.year));
		}
		const idFrontPath = ref(null);
		const idBackPath = ref(null);
		const proofOfAddressPath = ref(null);
		const submitting = ref(false);
		async function onSubmit(event) {
			submitting.value = true;
			if (hasExtraValidationErrors()) {
				currentStep.value = 3;
				toast.add({
					title: "Datos fuera de rango",
					description: "Revisa la antigüedad, los años viviendo en el domicilio o el año del vehículo: alguno no es congruente con la fecha de nacimiento capturada.",
					color: "error"
				});
				submitting.value = false;
				return;
			}
			if (!idFrontPath.value || !idBackPath.value || !proofOfAddressPath.value) {
				currentStep.value = 5;
				toast.add({
					title: "Faltan documentos obligatorios",
					description: "Por favor, sube todos los documentos requeridos (INE frontal, INE reverso y comprobante de domicilio).",
					color: "error"
				});
				submitting.value = false;
				return;
			}
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
						notes: data.notes || void 0,
						street_references: data.street_references || void 0
					},
					family_data: {
						members: familyMembers.value.filter((m) => m.name || m.relationship || m.phone || m.age).map((m) => ({
							name: m.name || null,
							relationship: m.relationship || null,
							phone: m.phone || null,
							age: m.age ?? null
						})),
						occupation: {
							type: data.occupation_type || null,
							place_name: data.occupation_place || null,
							position: data.occupation_position || null,
							phone: data.occupation_phone || null,
							years: data.occupation_years ?? null,
							monthly_income: data.occupation_monthly_income ?? null
						},
						housing: {
							ownership_type: data.housing_ownership_type || null,
							dimensions: data.housing_dimensions ? `${data.housing_dimensions} m2` : null,
							years_at_address: data.housing_years ?? null,
							work_reference: {
								name: data.work_reference_name || null,
								phone: data.work_reference_phone || null
							}
						}
					},
					vehicles: vehicles.value.filter((v) => v.brand || v.model || v.year || v.plates).map((v) => ({
						brand: v.brand || null,
						model: v.model || null,
						year: v.year || null,
						plates: v.plates || null
					})),
					requested_credit_limit: data.requested_credit_limit ?? null,
					id_front_path: idFrontPath.value,
					id_back_path: idBackPath.value,
					proof_of_address_path: proofOfAddressPath.value
				});
				toast.add({
					title: "Solicitud registrada",
					description: `La solicitud #${application.id} fue enviada a revisión.`,
					color: "success"
				});
				await router.push("/registro-verificacion/coordinador/list");
			} catch (e) {
				console.error(e);
				const apiErrors = e?.data?.errors;
				if ((e?.status === 422 || e?.statusCode === 422) && apiErrors) {
					const formattedErrors = Object.entries(apiErrors).map(([field, messages]) => {
						return {
							name: field.startsWith("person.") ? field.substring(7) : field,
							message: messages[0] || "Dato inválido"
						};
					});
					formRef.value?.setErrors(formattedErrors);
					if (formattedErrors.length > 0 && formattedErrors[0]) {
						const firstErrorField = formattedErrors[0].name;
						const step = getStepForFieldName(firstErrorField);
						if (step) currentStep.value = step;
					}
				}
				toast.add({
					title: "Error",
					description: extractApiErrorMessage(e, "No se pudo registrar la solicitud. Verifica los datos e intenta de nuevo."),
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		const currentStep = ref(1);
		const steps = [
			{
				number: 1,
				label: "Datos Personales",
				icon: "i-lucide-user"
			},
			{
				number: 2,
				label: "Domicilio y Familiares",
				icon: "i-lucide-home"
			},
			{
				number: 3,
				label: "Ocupación, Vivienda y Vehículos",
				icon: "i-lucide-briefcase"
			},
			{
				number: 4,
				label: "Límite Solicitado",
				icon: "i-lucide-dollar-sign"
			},
			{
				number: 5,
				label: "Documentos",
				icon: "i-lucide-file-text"
			}
		];
		function getStepForFieldName(name) {
			const step1Fields = [
				"first_name",
				"last_name",
				"gender",
				"birth_date",
				"curp",
				"rfc",
				"home_phone",
				"mobile_phone",
				"email"
			];
			const step2Fields = [
				"street",
				"external_number",
				"neighborhood",
				"city",
				"state",
				"postal_code"
			];
			const step3Fields = [
				"occupation_type",
				"occupation_place",
				"occupation_position",
				"occupation_phone",
				"occupation_years",
				"occupation_monthly_income",
				"housing_ownership_type",
				"housing_years",
				"housing_dimensions",
				"work_reference_name",
				"work_reference_phone"
			];
			const step4Fields = ["requested_credit_limit"];
			if (step1Fields.includes(name)) return 1;
			if (step2Fields.includes(name)) return 2;
			if (step3Fields.includes(name)) return 3;
			if (step4Fields.includes(name)) return 4;
			return 5;
		}
		const formRef = ref(null);
		function getFieldsForStep(step) {
			if (step === 1) return [
				"first_name",
				"last_name",
				"second_last_name",
				"gender",
				"birth_date",
				"curp",
				"rfc",
				"home_phone",
				"mobile_phone",
				"email"
			];
			if (step === 2) return [
				"street",
				"external_number",
				"neighborhood",
				"city",
				"state",
				"postal_code",
				"street_references"
			];
			if (step === 3) return [
				"occupation_type",
				"occupation_place",
				"occupation_position",
				"occupation_phone",
				"occupation_years",
				"occupation_monthly_income",
				"housing_ownership_type",
				"housing_years",
				"housing_dimensions",
				"work_reference_name",
				"work_reference_phone"
			];
			if (step === 4) return ["requested_credit_limit"];
			return [];
		}
		function validateStep(step) {
			const fields = getFieldsForStep(step);
			if (fields.length === 0) return {
				success: true,
				errors: []
			};
			const pickObject = fields.reduce((acc, field) => {
				acc[field] = true;
				return acc;
			}, {});
			const result = schema.pick(pickObject).safeParse(state);
			const formattedErrors = result.success ? [] : result.error.issues.map((err) => ({
				name: String(err.path[0]),
				message: err.message
			}));
			if (step === 3) {
				if (occupationYearsExceeded.value) formattedErrors.push({
					name: "occupation_years",
					message: `No puede ser mayor a ${maxOccupationYears.value} años: es la edad que lleva siendo mayor de edad el solicitante.`
				});
				if (housingYearsExceeded.value) formattedErrors.push({
					name: "housing_years",
					message: `No puede ser mayor a la edad del solicitante (${maxHousingYears.value} años).`
				});
			}
			return {
				success: formattedErrors.length === 0,
				errors: formattedErrors
			};
		}
		async function validateStepAndAdvance() {
			const validation = validateStep(currentStep.value);
			if (validation.success) {
				if (formRef.value) formRef.value.setErrors([]);
				currentStep.value++;
				return true;
			} else {
				if (formRef.value) formRef.value.setErrors(validation.errors);
				toast.add({
					title: "Campos requeridos pendientes",
					description: "Por favor, completa todos los campos obligatorios de esta sección antes de continuar.",
					color: "error"
				});
				return false;
			}
		}
		async function goToStep(stepNumber) {
			if (stepNumber <= currentStep.value) {
				if (formRef.value) formRef.value.setErrors([]);
				currentStep.value = stepNumber;
				return;
			}
			while (currentStep.value < stepNumber) if (!await validateStepAndAdvance()) break;
		}
		function onFormError(event) {
			const errors = event.errors || [];
			if (errors.length > 0) {
				const firstErrorName = errors[0].name;
				const step = getStepForFieldName(firstErrorName);
				if (step) currentStep.value = step;
				toast.add({
					title: "Faltan datos obligatorios",
					description: "Por favor, revisa los campos marcados en rojo en las pestañas del formulario.",
					color: "error"
				});
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$b;
			const _component_UDashboardSidebarCollapse = _sfc_main$c;
			const _component_UAlert = _sfc_main;
			const _component_UForm = _sfc_main$2;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UCard = _sfc_main$3;
			const _component_UBadge = _sfc_main$4;
			const _component_UFormField = _sfc_main$5;
			const _component_UInput = _sfc_main$6;
			const _component_USelect = _sfc_main$7;
			const _component_UTextarea = _sfc_main$8;
			const _component_UButton = _sfc_main$a;
			const _component_UInputNumber = _sfc_main$9;
			const _component_ApplicationsEvidencePhotoCapture = EvidencePhotoCapture_default;
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
					} else if (!unref(coordinatorBranchId)) {
						_push(`<div class="p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAlert, {
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-triangle-alert",
							title: "Sin sucursal asignada",
							description: "Tu usuario coordinador no tiene una sucursal asignada. Contacta a un gerente para que te asigne una antes de registrar solicitudes."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else _push(ssrRenderComponent(_component_UForm, {
						ref_key: "formRef",
						ref: formRef,
						id: "new-application",
						schema: unref(schema),
						state: unref(state),
						class: "p-6 space-y-6 w-full",
						onSubmit,
						onError: onFormError
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="mb-8 border border-default bg-elevated/40 rounded-xl p-4 sm:p-5"${_scopeId}><div class="hidden md:flex items-center justify-between gap-2"${_scopeId}><!--[-->`);
								ssrRenderList(steps, (step) => {
									_push(`<div class="flex items-center flex-1 last:flex-initial cursor-pointer"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="${ssrRenderClass([unref(currentStep) === step.number ? "bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-sm" : unref(currentStep) > step.number ? "bg-success text-white" : "bg-muted text-dimmed", "size-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300"])}"${_scopeId}>`);
									if (unref(currentStep) > step.number) _push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-check",
										class: "size-4"
									}, null, _parent, _scopeId));
									else _push(ssrRenderComponent(_component_UIcon, {
										name: step.icon,
										class: "size-4"
									}, null, _parent, _scopeId));
									_push(`</span><div class="flex flex-col text-left"${_scopeId}><span class="text-[10px] text-muted font-semibold uppercase tracking-wider"${_scopeId}>Paso ${ssrInterpolate(step.number)}</span><span class="${ssrRenderClass([unref(currentStep) === step.number ? "text-highlighted font-semibold" : "text-dimmed", "text-xs font-semibold transition-colors"])}"${_scopeId}>${ssrInterpolate(step.label)}</span></div></div>`);
									if (step.number < steps.length) _push(`<div class="${ssrRenderClass([unref(currentStep) > step.number ? "bg-success" : "bg-muted", "h-0.5 flex-1 mx-4 rounded-full transition-all duration-500"])}"${_scopeId}></div>`);
									else _push(`<!---->`);
									_push(`</div>`);
								});
								_push(`<!--]--></div><div class="md:hidden flex items-center justify-between"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="text-[10px] text-muted font-semibold uppercase tracking-wider"${_scopeId}> Paso ${ssrInterpolate(unref(currentStep))} de ${ssrInterpolate(steps.length)}</span><span class="text-sm font-bold text-highlighted"${_scopeId}>${ssrInterpolate(steps[unref(currentStep) - 1]?.label)}</span></div><div class="flex gap-1"${_scopeId}><!--[-->`);
								ssrRenderList(steps.length, (n) => {
									_push(`<span class="${ssrRenderClass([n === unref(currentStep) ? "w-6 bg-primary" : "w-2 bg-muted", "h-1.5 rounded-full transition-all duration-300"])}"${_scopeId}></span>`);
								});
								_push(`<!--]--></div></div></div><div class="space-y-6" style="${ssrRenderStyle(unref(currentStep) === 1 ? null : { display: "none" })}"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Sucursal</h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, "Sucursal")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-center gap-2 text-sm"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UIcon, {
												name: "i-lucide-building-2",
												class: "size-4 text-dimmed"
											}, null, _parent, _scopeId));
											_push(`<span class="font-medium"${_scopeId}>${ssrInterpolate(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`)}</span>`);
											_push(ssrRenderComponent(_component_UBadge, {
												color: "neutral",
												variant: "subtle",
												size: "sm"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(` Tu sucursal asignada `);
													else return [createTextVNode(" Tu sucursal asignada ")];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
											createVNode(_component_UIcon, {
												name: "i-lucide-building-2",
												class: "size-4 text-dimmed"
											}),
											createVNode("span", { class: "font-medium" }, toDisplayString(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`), 1),
											createVNode(_component_UBadge, {
												color: "neutral",
												variant: "subtle",
												size: "sm"
											}, {
												default: withCtx(() => [createTextVNode(" Tu sucursal asignada ")]),
												_: 1
											})
										])];
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
												name: "second_last_name",
												required: ""
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
												name: "gender",
												required: ""
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
												name: "birth_date",
												required: ""
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
												name: "curp",
												required: ""
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
												name: "rfc",
												required: ""
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
												label: "Teléfono móvil",
												name: "mobile_phone",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														"model-value": unref(state).mobile_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).mobile_phone = onlyDigits(String(value ?? ""), 10)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														"model-value": unref(state).mobile_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).mobile_phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Otro teléfono de contacto",
												name: "home_phone",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														"model-value": unref(state).home_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).home_phone = onlyDigits(String(value ?? ""), 10)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														"model-value": unref(state).home_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).home_phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Correo electrónico",
												name: "email",
												required: ""
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
												name: "second_last_name",
												required: ""
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
												name: "gender",
												required: ""
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
												name: "birth_date",
												required: ""
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
												name: "curp",
												required: ""
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
												name: "rfc",
												required: ""
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
												label: "Teléfono móvil",
												name: "mobile_phone",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													"model-value": unref(state).mobile_phone,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "10",
													placeholder: "10 dígitos, sin espacios",
													"onUpdate:modelValue": (value) => unref(state).mobile_phone = onlyDigits(String(value ?? ""), 10)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Otro teléfono de contacto",
												name: "home_phone",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													"model-value": unref(state).home_phone,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "10",
													placeholder: "10 dígitos, sin espacios",
													"onUpdate:modelValue": (value) => unref(state).home_phone = onlyDigits(String(value ?? ""), 10)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Correo electrónico",
												name: "email",
												required: ""
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
								_push(`</div><div class="space-y-6" style="${ssrRenderStyle(unref(currentStep) === 2 ? null : { display: "none" })}"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Domicilio</h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, "Domicilio")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Calle",
												name: "street",
												required: ""
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
												name: "external_number",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														"model-value": unref(state).external_number,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "30",
														placeholder: "Sin letras ni espacios",
														"onUpdate:modelValue": (value) => unref(state).external_number = onlyDigits(String(value ?? ""), 30)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														"model-value": unref(state).external_number,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "30",
														placeholder: "Sin letras ni espacios",
														"onUpdate:modelValue": (value) => unref(state).external_number = onlyDigits(String(value ?? ""), 30)
													}, null, 8, ["model-value", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Estado",
												name: "state",
												required: ""
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
												label: "Ciudad",
												name: "city",
												required: ""
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
												label: "Colonia",
												name: "neighborhood",
												required: ""
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
												label: "Código postal",
												name: "postal_code",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														"model-value": unref(state).postal_code,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "5",
														placeholder: "5 dígitos",
														"onUpdate:modelValue": (value) => unref(state).postal_code = onlyDigits(String(value ?? ""), 5)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														"model-value": unref(state).postal_code,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "5",
														placeholder: "5 dígitos",
														"onUpdate:modelValue": (value) => unref(state).postal_code = onlyDigits(String(value ?? ""), 5)
													}, null, 8, ["model-value", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Referencias del domicilio",
												name: "street_references",
												class: "md:col-span-2"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UTextarea, {
														modelValue: unref(state).street_references,
														"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
														class: "w-full",
														rows: 3,
														placeholder: "Entre qué calles se encuentra, color de fachada, características particulares, etc."
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UTextarea, {
														modelValue: unref(state).street_references,
														"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
														class: "w-full",
														rows: 3,
														placeholder: "Entre qué calles se encuentra, color de fachada, características particulares, etc."
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Calle",
												name: "street",
												required: ""
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
												name: "external_number",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													"model-value": unref(state).external_number,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "30",
													placeholder: "Sin letras ni espacios",
													"onUpdate:modelValue": (value) => unref(state).external_number = onlyDigits(String(value ?? ""), 30)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Estado",
												name: "state",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).state,
													"onUpdate:modelValue": ($event) => unref(state).state = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Ciudad",
												name: "city",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).city,
													"onUpdate:modelValue": ($event) => unref(state).city = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Colonia",
												name: "neighborhood",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).neighborhood,
													"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Código postal",
												name: "postal_code",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													"model-value": unref(state).postal_code,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "5",
													placeholder: "5 dígitos",
													"onUpdate:modelValue": (value) => unref(state).postal_code = onlyDigits(String(value ?? ""), 5)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Referencias del domicilio",
												name: "street_references",
												class: "md:col-span-2"
											}, {
												default: withCtx(() => [createVNode(_component_UTextarea, {
													modelValue: unref(state).street_references,
													"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
													class: "w-full",
													rows: 3,
													placeholder: "Entre qué calles se encuentra, color de fachada, características particulares, etc."
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
											_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}>Familiares y Cónyuge</h3>`);
											_push(ssrRenderComponent(_component_UButton, {
												label: "Agregar familiar",
												icon: "i-lucide-plus",
												size: "xs",
												variant: "subtle",
												onClick: addFamilyMember
											}, null, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, "Familiares y Cónyuge"), createVNode(_component_UButton, {
											label: "Agregar familiar",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addFamilyMember
										})])];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
											ssrRenderList(unref(familyMembers), (member, index) => {
												_push(`<div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, {
													label: "Nombre",
													class: "md:col-span-2"
												}, {
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
															"model-value": member.phone,
															class: "w-full",
															inputmode: "numeric",
															maxlength: "10",
															placeholder: "10 dígitos",
															"onUpdate:modelValue": (value) => member.phone = onlyDigits(String(value ?? ""), 10)
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															"model-value": member.phone,
															class: "w-full",
															inputmode: "numeric",
															maxlength: "10",
															placeholder: "10 dígitos",
															"onUpdate:modelValue": (value) => member.phone = onlyDigits(String(value ?? ""), 10)
														}, null, 8, ["model-value", "onUpdate:modelValue"])];
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
											_push(`<!--]--></div>`);
										} else return [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
											}, [
												createVNode(_component_UFormField, {
													label: "Nombre",
													class: "md:col-span-2"
												}, {
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
														"model-value": member.phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos",
														"onUpdate:modelValue": (value) => member.phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])]),
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
										}), 128))])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="space-y-6" style="${ssrRenderStyle(unref(currentStep) === 3 ? null : { display: "none" })}"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Datos Adicionales para la Distribuidora </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Datos Adicionales para la Distribuidora ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="space-y-6"${_scopeId}><div${_scopeId}><h4 class="text-sm font-semibold text-dimmed mb-3"${_scopeId}> Ocupación </h4><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Trabaja o estudia",
												name: "occupation_type",
												required: ""
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
												name: "occupation_place",
												required: ""
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
												name: "occupation_position",
												required: ""
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
												name: "occupation_phone",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														"model-value": unref(state).occupation_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).occupation_phone = onlyDigits(String(value ?? ""), 10)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														"model-value": unref(state).occupation_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).occupation_phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Antigüedad (años)",
												name: "occupation_years",
												required: "",
												hint: unref(maxOccupationYears) !== null ? `Máximo ${unref(maxOccupationYears)} años` : void 0
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														_push(ssrRenderComponent(_component_UInputNumber, {
															modelValue: unref(state).occupation_years,
															"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
															class: "w-full",
															min: 0,
															max: unref(maxOccupationYears) ?? void 0
														}, null, _parent, _scopeId));
														if (unref(occupationYearsExceeded)) _push(`<p class="text-xs text-error mt-1"${_scopeId}> No puede ser mayor a ${ssrInterpolate(unref(maxOccupationYears))} años: es la edad que lleva siendo mayor de edad el solicitante (nació hace ${ssrInterpolate(unref(applicantAge))} años y la mayoría de edad es a los 18). </p>`);
														else _push(`<!---->`);
													} else return [createVNode(_component_UInputNumber, {
														modelValue: unref(state).occupation_years,
														"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
														class: "w-full",
														min: 0,
														max: unref(maxOccupationYears) ?? void 0
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"max"
													]), unref(occupationYearsExceeded) ? (openBlock(), createBlock("p", {
														key: 0,
														class: "text-xs text-error mt-1"
													}, " No puede ser mayor a " + toDisplayString(unref(maxOccupationYears)) + " años: es la edad que lleva siendo mayor de edad el solicitante (nació hace " + toDisplayString(unref(applicantAge)) + " años y la mayoría de edad es a los 18). ", 1)) : createCommentVNode("", true)];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Ganancia al mes",
												name: "occupation_monthly_income",
												required: ""
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
											_push(`</div></div><div${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h4 class="text-sm font-semibold text-dimmed"${_scopeId}> Vehículos (si tiene) </h4>`);
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
													_push(`<div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"${_scopeId}>`);
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
															if (_push) {
																_push(ssrRenderComponent(_component_UInput, {
																	"model-value": vehicle.year,
																	class: "w-full",
																	inputmode: "numeric",
																	maxlength: "4",
																	placeholder: `Máx. ${maxVehicleYear}`,
																	"onUpdate:modelValue": (value) => vehicle.year = onlyDigits(String(value ?? ""), 4)
																}, null, _parent, _scopeId));
																if (vehicleYearExceeded(vehicle.year)) _push(`<p class="text-xs text-error mt-1"${_scopeId}> No puede ser mayor a ${ssrInterpolate(maxVehicleYear)}. </p>`);
																else _push(`<!---->`);
															} else return [createVNode(_component_UInput, {
																"model-value": vehicle.year,
																class: "w-full",
																inputmode: "numeric",
																maxlength: "4",
																placeholder: `Máx. ${maxVehicleYear}`,
																"onUpdate:modelValue": (value) => vehicle.year = onlyDigits(String(value ?? ""), 4)
															}, null, 8, [
																"model-value",
																"placeholder",
																"onUpdate:modelValue"
															]), vehicleYearExceeded(vehicle.year) ? (openBlock(), createBlock("p", {
																key: 0,
																class: "text-xs text-error mt-1"
															}, " No puede ser mayor a " + toDisplayString(maxVehicleYear) + ". ")) : createCommentVNode("", true)];
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
											_push(`</div><div${_scopeId}><h4 class="text-sm font-semibold text-dimmed mb-3"${_scopeId}>Vivienda</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Tenencia de la vivienda",
												name: "housing_ownership_type",
												required: ""
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
												name: "housing_years",
												required: "",
												hint: unref(maxHousingYears) !== null ? `Máximo ${unref(maxHousingYears)} años` : void 0
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														_push(ssrRenderComponent(_component_UInputNumber, {
															modelValue: unref(state).housing_years,
															"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
															class: "w-full",
															min: 0,
															max: unref(maxHousingYears) ?? void 0
														}, null, _parent, _scopeId));
														if (unref(housingYearsExceeded)) _push(`<p class="text-xs text-error mt-1"${_scopeId}> No puede ser mayor a la edad del solicitante (${ssrInterpolate(unref(maxHousingYears))} años): no pudo vivir ahí antes de nacer. </p>`);
														else _push(`<!---->`);
													} else return [createVNode(_component_UInputNumber, {
														modelValue: unref(state).housing_years,
														"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
														class: "w-full",
														min: 0,
														max: unref(maxHousingYears) ?? void 0
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"max"
													]), unref(housingYearsExceeded) ? (openBlock(), createBlock("p", {
														key: 0,
														class: "text-xs text-error mt-1"
													}, " No puede ser mayor a la edad del solicitante (" + toDisplayString(unref(maxHousingYears)) + " años): no pudo vivir ahí antes de nacer. ", 1)) : createCommentVNode("", true)];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Dimensiones de la vivienda",
												name: "housing_dimensions",
												required: "",
												hint: "Solo números"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														_push(`<div class="flex gap-2"${_scopeId}>`);
														_push(ssrRenderComponent(_component_UInput, {
															"model-value": unref(state).housing_dimensions,
															placeholder: "Ej. 120",
															class: "w-full",
															inputmode: "numeric",
															maxlength: "6",
															"onUpdate:modelValue": (value) => unref(state).housing_dimensions = onlyDigits(String(value ?? ""), 6)
														}, null, _parent, _scopeId));
														_push(ssrRenderComponent(_component_USelect, {
															"model-value": housingDimensionUnit,
															items: housingDimensionUnitItems,
															disabled: "",
															class: "w-40 shrink-0 opacity-70"
														}, null, _parent, _scopeId));
														_push(`</div>`);
													} else return [createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UInput, {
														"model-value": unref(state).housing_dimensions,
														placeholder: "Ej. 120",
														class: "w-full",
														inputmode: "numeric",
														maxlength: "6",
														"onUpdate:modelValue": (value) => unref(state).housing_dimensions = onlyDigits(String(value ?? ""), 6)
													}, null, 8, ["model-value", "onUpdate:modelValue"]), createVNode(_component_USelect, {
														"model-value": housingDimensionUnit,
														items: housingDimensionUnitItems,
														disabled: "",
														class: "w-40 shrink-0 opacity-70"
													})])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`<div${_scopeId}></div>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Referencia laboral — nombre",
												name: "work_reference_name",
												required: ""
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
												name: "work_reference_phone",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														"model-value": unref(state).work_reference_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).work_reference_phone = onlyDigits(String(value ?? ""), 10)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														"model-value": unref(state).work_reference_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).work_reference_phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div></div></div>`);
										} else return [createVNode("div", { class: "space-y-6" }, [
											createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
												createVNode(_component_UFormField, {
													label: "Trabaja o estudia",
													name: "occupation_type",
													required: ""
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
													name: "occupation_place",
													required: ""
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
													name: "occupation_position",
													required: ""
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
													name: "occupation_phone",
													required: ""
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														"model-value": unref(state).occupation_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).occupation_phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Antigüedad (años)",
													name: "occupation_years",
													required: "",
													hint: unref(maxOccupationYears) !== null ? `Máximo ${unref(maxOccupationYears)} años` : void 0
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: unref(state).occupation_years,
														"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
														class: "w-full",
														min: 0,
														max: unref(maxOccupationYears) ?? void 0
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"max"
													]), unref(occupationYearsExceeded) ? (openBlock(), createBlock("p", {
														key: 0,
														class: "text-xs text-error mt-1"
													}, " No puede ser mayor a " + toDisplayString(unref(maxOccupationYears)) + " años: es la edad que lleva siendo mayor de edad el solicitante (nació hace " + toDisplayString(unref(applicantAge)) + " años y la mayoría de edad es a los 18). ", 1)) : createCommentVNode("", true)]),
													_: 1
												}, 8, ["hint"]),
												createVNode(_component_UFormField, {
													label: "Ganancia al mes",
													name: "occupation_monthly_income",
													required: ""
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
											createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-dimmed" }, " Vehículos (si tiene) "), createVNode(_component_UButton, {
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
													class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
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
															"model-value": vehicle.year,
															class: "w-full",
															inputmode: "numeric",
															maxlength: "4",
															placeholder: `Máx. ${maxVehicleYear}`,
															"onUpdate:modelValue": (value) => vehicle.year = onlyDigits(String(value ?? ""), 4)
														}, null, 8, [
															"model-value",
															"placeholder",
															"onUpdate:modelValue"
														]), vehicleYearExceeded(vehicle.year) ? (openBlock(), createBlock("p", {
															key: 0,
															class: "text-xs text-error mt-1"
														}, " No puede ser mayor a " + toDisplayString(maxVehicleYear) + ". ")) : createCommentVNode("", true)]),
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
											createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, "Vivienda"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
												createVNode(_component_UFormField, {
													label: "Tenencia de la vivienda",
													name: "housing_ownership_type",
													required: ""
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
													name: "housing_years",
													required: "",
													hint: unref(maxHousingYears) !== null ? `Máximo ${unref(maxHousingYears)} años` : void 0
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: unref(state).housing_years,
														"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
														class: "w-full",
														min: 0,
														max: unref(maxHousingYears) ?? void 0
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"max"
													]), unref(housingYearsExceeded) ? (openBlock(), createBlock("p", {
														key: 0,
														class: "text-xs text-error mt-1"
													}, " No puede ser mayor a la edad del solicitante (" + toDisplayString(unref(maxHousingYears)) + " años): no pudo vivir ahí antes de nacer. ", 1)) : createCommentVNode("", true)]),
													_: 1
												}, 8, ["hint"]),
												createVNode(_component_UFormField, {
													label: "Dimensiones de la vivienda",
													name: "housing_dimensions",
													required: "",
													hint: "Solo números"
												}, {
													default: withCtx(() => [createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UInput, {
														"model-value": unref(state).housing_dimensions,
														placeholder: "Ej. 120",
														class: "w-full",
														inputmode: "numeric",
														maxlength: "6",
														"onUpdate:modelValue": (value) => unref(state).housing_dimensions = onlyDigits(String(value ?? ""), 6)
													}, null, 8, ["model-value", "onUpdate:modelValue"]), createVNode(_component_USelect, {
														"model-value": housingDimensionUnit,
														items: housingDimensionUnitItems,
														disabled: "",
														class: "w-40 shrink-0 opacity-70"
													})])]),
													_: 1
												}),
												createVNode("div"),
												createVNode(_component_UFormField, {
													label: "Referencia laboral — nombre",
													name: "work_reference_name",
													required: ""
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
													name: "work_reference_phone",
													required: ""
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														"model-value": unref(state).work_reference_phone,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "10",
														placeholder: "10 dígitos, sin espacios",
														"onUpdate:modelValue": (value) => unref(state).work_reference_phone = onlyDigits(String(value ?? ""), 10)
													}, null, 8, ["model-value", "onUpdate:modelValue"])]),
													_: 1
												})
											])])
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="space-y-6" style="${ssrRenderStyle(unref(currentStep) === 4 ? null : { display: "none" })}"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Límite Solicitado</h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, "Límite Solicitado")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UFormField, {
											label: "Límite de crédito solicitado",
											name: "requested_credit_limit",
											required: ""
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													class: "w-full max-w-sm",
													min: 1e3,
													step: 100
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInputNumber, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													class: "w-full max-w-sm",
													min: 1e3,
													step: 100
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										else return [createVNode(_component_UFormField, {
											label: "Límite de crédito solicitado",
											name: "requested_credit_limit",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).requested_credit_limit,
												"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
												class: "w-full max-w-sm",
												min: 1e3,
												step: 100
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="space-y-6" style="${ssrRenderStyle(unref(currentStep) === 5 ? null : { display: "none" })}"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}>Documentos Escaneados</h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, "Documentos Escaneados")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "INE (frontal)",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_ApplicationsEvidencePhotoCapture, {
														modelValue: unref(idFrontPath),
														"onUpdate:modelValue": ($event) => isRef(idFrontPath) ? idFrontPath.value = $event : null,
														upload: (file) => unref(uploadApplicationDocument)(file, "id_front"),
														label: "INE (frontal)"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_ApplicationsEvidencePhotoCapture, {
														modelValue: unref(idFrontPath),
														"onUpdate:modelValue": ($event) => isRef(idFrontPath) ? idFrontPath.value = $event : null,
														upload: (file) => unref(uploadApplicationDocument)(file, "id_front"),
														label: "INE (frontal)"
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"upload"
													])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "INE (reverso)",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_ApplicationsEvidencePhotoCapture, {
														modelValue: unref(idBackPath),
														"onUpdate:modelValue": ($event) => isRef(idBackPath) ? idBackPath.value = $event : null,
														upload: (file) => unref(uploadApplicationDocument)(file, "id_back"),
														label: "INE (reverso)"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_ApplicationsEvidencePhotoCapture, {
														modelValue: unref(idBackPath),
														"onUpdate:modelValue": ($event) => isRef(idBackPath) ? idBackPath.value = $event : null,
														upload: (file) => unref(uploadApplicationDocument)(file, "id_back"),
														label: "INE (reverso)"
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
														modelValue: unref(proofOfAddressPath),
														"onUpdate:modelValue": ($event) => isRef(proofOfAddressPath) ? proofOfAddressPath.value = $event : null,
														upload: (file) => unref(uploadApplicationDocument)(file, "proof_of_address"),
														label: "Comprobante de domicilio"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_ApplicationsEvidencePhotoCapture, {
														modelValue: unref(proofOfAddressPath),
														"onUpdate:modelValue": ($event) => isRef(proofOfAddressPath) ? proofOfAddressPath.value = $event : null,
														upload: (file) => unref(uploadApplicationDocument)(file, "proof_of_address"),
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
										} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "INE (frontal)",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
													modelValue: unref(idFrontPath),
													"onUpdate:modelValue": ($event) => isRef(idFrontPath) ? idFrontPath.value = $event : null,
													upload: (file) => unref(uploadApplicationDocument)(file, "id_front"),
													label: "INE (frontal)"
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"upload"
												])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "INE (reverso)",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
													modelValue: unref(idBackPath),
													"onUpdate:modelValue": ($event) => isRef(idBackPath) ? idBackPath.value = $event : null,
													upload: (file) => unref(uploadApplicationDocument)(file, "id_back"),
													label: "INE (reverso)"
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
													modelValue: unref(proofOfAddressPath),
													"onUpdate:modelValue": ($event) => isRef(proofOfAddressPath) ? proofOfAddressPath.value = $event : null,
													upload: (file) => unref(uploadApplicationDocument)(file, "proof_of_address"),
													label: "Comprobante de domicilio"
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"upload"
												])]),
												_: 1
											})
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="flex justify-between items-center pt-6 border-t border-default mt-6"${_scopeId}><div${_scopeId}>`);
								if (unref(currentStep) > 1) _push(ssrRenderComponent(_component_UButton, {
									label: "Anterior",
									color: "neutral",
									variant: "subtle",
									icon: "i-lucide-arrow-left",
									onClick: ($event) => currentStep.value--
								}, null, _parent, _scopeId));
								else _push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									to: "/registro-verificacion"
								}, null, _parent, _scopeId));
								_push(`</div><div class="flex gap-2"${_scopeId}>`);
								if (unref(currentStep) < 5) _push(ssrRenderComponent(_component_UButton, {
									label: "Siguiente",
									color: "primary",
									variant: "solid",
									"trailing-icon": "i-lucide-arrow-right",
									onClick: ($event) => goToStep(unref(currentStep) + 1)
								}, null, _parent, _scopeId));
								else _push(ssrRenderComponent(_component_UButton, {
									label: "Registrar Solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div></div>`);
							} else return [
								createVNode("div", { class: "mb-8 border border-default bg-elevated/40 rounded-xl p-4 sm:p-5" }, [createVNode("div", { class: "hidden md:flex items-center justify-between gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
									return createVNode("div", {
										key: step.number,
										class: "flex items-center flex-1 last:flex-initial cursor-pointer",
										onClick: ($event) => goToStep(step.number)
									}, [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: ["size-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300", unref(currentStep) === step.number ? "bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-sm" : unref(currentStep) > step.number ? "bg-success text-white" : "bg-muted text-dimmed"] }, [unref(currentStep) > step.number ? (openBlock(), createBlock(_component_UIcon, {
										key: 0,
										name: "i-lucide-check",
										class: "size-4"
									})) : (openBlock(), createBlock(_component_UIcon, {
										key: 1,
										name: step.icon,
										class: "size-4"
									}, null, 8, ["name"]))], 2), createVNode("div", { class: "flex flex-col text-left" }, [createVNode("span", { class: "text-[10px] text-muted font-semibold uppercase tracking-wider" }, "Paso " + toDisplayString(step.number), 1), createVNode("span", { class: ["text-xs font-semibold transition-colors", unref(currentStep) === step.number ? "text-highlighted font-semibold" : "text-dimmed"] }, toDisplayString(step.label), 3)])]), step.number < steps.length ? (openBlock(), createBlock("div", {
										key: 0,
										class: ["h-0.5 flex-1 mx-4 rounded-full transition-all duration-500", unref(currentStep) > step.number ? "bg-success" : "bg-muted"]
									}, null, 2)) : createCommentVNode("", true)], 8, ["onClick"]);
								}), 64))]), createVNode("div", { class: "md:hidden flex items-center justify-between" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-[10px] text-muted font-semibold uppercase tracking-wider" }, " Paso " + toDisplayString(unref(currentStep)) + " de " + toDisplayString(steps.length), 1), createVNode("span", { class: "text-sm font-bold text-highlighted" }, toDisplayString(steps[unref(currentStep) - 1]?.label), 1)]), createVNode("div", { class: "flex gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(steps.length, (n) => {
									return openBlock(), createBlock("span", {
										key: n,
										class: ["h-1.5 rounded-full transition-all duration-300", n === unref(currentStep) ? "w-6 bg-primary" : "w-2 bg-muted"]
									}, null, 2);
								}), 128))])])]),
								withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Sucursal")]),
									default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
										createVNode(_component_UIcon, {
											name: "i-lucide-building-2",
											class: "size-4 text-dimmed"
										}),
										createVNode("span", { class: "font-medium" }, toDisplayString(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`), 1),
										createVNode(_component_UBadge, {
											color: "neutral",
											variant: "subtle",
											size: "sm"
										}, {
											default: withCtx(() => [createTextVNode(" Tu sucursal asignada ")]),
											_: 1
										})
									])]),
									_: 1
								}), createVNode(_component_UCard, null, {
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
											name: "second_last_name",
											required: ""
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
											name: "gender",
											required: ""
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
											name: "birth_date",
											required: ""
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
											name: "curp",
											required: ""
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
											name: "rfc",
											required: ""
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
											label: "Teléfono móvil",
											name: "mobile_phone",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												"model-value": unref(state).mobile_phone,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "10",
												placeholder: "10 dígitos, sin espacios",
												"onUpdate:modelValue": (value) => unref(state).mobile_phone = onlyDigits(String(value ?? ""), 10)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Otro teléfono de contacto",
											name: "home_phone",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												"model-value": unref(state).home_phone,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "10",
												placeholder: "10 dígitos, sin espacios",
												"onUpdate:modelValue": (value) => unref(state).home_phone = onlyDigits(String(value ?? ""), 10)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Correo electrónico",
											name: "email",
											required: ""
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
								})], 512), [[vShow, unref(currentStep) === 1]]),
								withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Domicilio")]),
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Calle",
											name: "street",
											required: ""
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
											name: "external_number",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												"model-value": unref(state).external_number,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "30",
												placeholder: "Sin letras ni espacios",
												"onUpdate:modelValue": (value) => unref(state).external_number = onlyDigits(String(value ?? ""), 30)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Estado",
											name: "state",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).state,
												"onUpdate:modelValue": ($event) => unref(state).state = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Ciudad",
											name: "city",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).city,
												"onUpdate:modelValue": ($event) => unref(state).city = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Colonia",
											name: "neighborhood",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).neighborhood,
												"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Código postal",
											name: "postal_code",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												"model-value": unref(state).postal_code,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "5",
												placeholder: "5 dígitos",
												"onUpdate:modelValue": (value) => unref(state).postal_code = onlyDigits(String(value ?? ""), 5)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Referencias del domicilio",
											name: "street_references",
											class: "md:col-span-2"
										}, {
											default: withCtx(() => [createVNode(_component_UTextarea, {
												modelValue: unref(state).street_references,
												"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
												class: "w-full",
												rows: 3,
												placeholder: "Entre qué calles se encuentra, color de fachada, características particulares, etc."
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])]),
									_: 1
								}), createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, "Familiares y Cónyuge"), createVNode(_component_UButton, {
										label: "Agregar familiar",
										icon: "i-lucide-plus",
										size: "xs",
										variant: "subtle",
										onClick: addFamilyMember
									})])]),
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
										return openBlock(), createBlock("div", {
											key: index,
											class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
										}, [
											createVNode(_component_UFormField, {
												label: "Nombre",
												class: "md:col-span-2"
											}, {
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
													"model-value": member.phone,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "10",
													placeholder: "10 dígitos",
													"onUpdate:modelValue": (value) => member.phone = onlyDigits(String(value ?? ""), 10)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
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
									_: 1
								})], 512), [[vShow, unref(currentStep) === 2]]),
								withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Adicionales para la Distribuidora ")]),
									default: withCtx(() => [createVNode("div", { class: "space-y-6" }, [
										createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Trabaja o estudia",
												name: "occupation_type",
												required: ""
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
												name: "occupation_place",
												required: ""
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
												name: "occupation_position",
												required: ""
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
												name: "occupation_phone",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													"model-value": unref(state).occupation_phone,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "10",
													placeholder: "10 dígitos, sin espacios",
													"onUpdate:modelValue": (value) => unref(state).occupation_phone = onlyDigits(String(value ?? ""), 10)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Antigüedad (años)",
												name: "occupation_years",
												required: "",
												hint: unref(maxOccupationYears) !== null ? `Máximo ${unref(maxOccupationYears)} años` : void 0
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).occupation_years,
													"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
													class: "w-full",
													min: 0,
													max: unref(maxOccupationYears) ?? void 0
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"max"
												]), unref(occupationYearsExceeded) ? (openBlock(), createBlock("p", {
													key: 0,
													class: "text-xs text-error mt-1"
												}, " No puede ser mayor a " + toDisplayString(unref(maxOccupationYears)) + " años: es la edad que lleva siendo mayor de edad el solicitante (nació hace " + toDisplayString(unref(applicantAge)) + " años y la mayoría de edad es a los 18). ", 1)) : createCommentVNode("", true)]),
												_: 1
											}, 8, ["hint"]),
											createVNode(_component_UFormField, {
												label: "Ganancia al mes",
												name: "occupation_monthly_income",
												required: ""
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
										createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-dimmed" }, " Vehículos (si tiene) "), createVNode(_component_UButton, {
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
												class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
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
														"model-value": vehicle.year,
														class: "w-full",
														inputmode: "numeric",
														maxlength: "4",
														placeholder: `Máx. ${maxVehicleYear}`,
														"onUpdate:modelValue": (value) => vehicle.year = onlyDigits(String(value ?? ""), 4)
													}, null, 8, [
														"model-value",
														"placeholder",
														"onUpdate:modelValue"
													]), vehicleYearExceeded(vehicle.year) ? (openBlock(), createBlock("p", {
														key: 0,
														class: "text-xs text-error mt-1"
													}, " No puede ser mayor a " + toDisplayString(maxVehicleYear) + ". ")) : createCommentVNode("", true)]),
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
										createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, "Vivienda"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Tenencia de la vivienda",
												name: "housing_ownership_type",
												required: ""
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
												name: "housing_years",
												required: "",
												hint: unref(maxHousingYears) !== null ? `Máximo ${unref(maxHousingYears)} años` : void 0
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).housing_years,
													"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
													class: "w-full",
													min: 0,
													max: unref(maxHousingYears) ?? void 0
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"max"
												]), unref(housingYearsExceeded) ? (openBlock(), createBlock("p", {
													key: 0,
													class: "text-xs text-error mt-1"
												}, " No puede ser mayor a la edad del solicitante (" + toDisplayString(unref(maxHousingYears)) + " años): no pudo vivir ahí antes de nacer. ", 1)) : createCommentVNode("", true)]),
												_: 1
											}, 8, ["hint"]),
											createVNode(_component_UFormField, {
												label: "Dimensiones de la vivienda",
												name: "housing_dimensions",
												required: "",
												hint: "Solo números"
											}, {
												default: withCtx(() => [createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UInput, {
													"model-value": unref(state).housing_dimensions,
													placeholder: "Ej. 120",
													class: "w-full",
													inputmode: "numeric",
													maxlength: "6",
													"onUpdate:modelValue": (value) => unref(state).housing_dimensions = onlyDigits(String(value ?? ""), 6)
												}, null, 8, ["model-value", "onUpdate:modelValue"]), createVNode(_component_USelect, {
													"model-value": housingDimensionUnit,
													items: housingDimensionUnitItems,
													disabled: "",
													class: "w-40 shrink-0 opacity-70"
												})])]),
												_: 1
											}),
											createVNode("div"),
											createVNode(_component_UFormField, {
												label: "Referencia laboral — nombre",
												name: "work_reference_name",
												required: ""
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
												name: "work_reference_phone",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													"model-value": unref(state).work_reference_phone,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "10",
													placeholder: "10 dígitos, sin espacios",
													"onUpdate:modelValue": (value) => unref(state).work_reference_phone = onlyDigits(String(value ?? ""), 10)
												}, null, 8, ["model-value", "onUpdate:modelValue"])]),
												_: 1
											})
										])])
									])]),
									_: 1
								})], 512), [[vShow, unref(currentStep) === 3]]),
								withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Límite Solicitado")]),
									default: withCtx(() => [createVNode(_component_UFormField, {
										label: "Límite de crédito solicitado",
										name: "requested_credit_limit",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInputNumber, {
											modelValue: unref(state).requested_credit_limit,
											"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
											class: "w-full max-w-sm",
											min: 1e3,
											step: 100
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})]),
									_: 1
								})], 512), [[vShow, unref(currentStep) === 4]]),
								withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Documentos Escaneados")]),
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "INE (frontal)",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												modelValue: unref(idFrontPath),
												"onUpdate:modelValue": ($event) => isRef(idFrontPath) ? idFrontPath.value = $event : null,
												upload: (file) => unref(uploadApplicationDocument)(file, "id_front"),
												label: "INE (frontal)"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "INE (reverso)",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
												modelValue: unref(idBackPath),
												"onUpdate:modelValue": ($event) => isRef(idBackPath) ? idBackPath.value = $event : null,
												upload: (file) => unref(uploadApplicationDocument)(file, "id_back"),
												label: "INE (reverso)"
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
												modelValue: unref(proofOfAddressPath),
												"onUpdate:modelValue": ($event) => isRef(proofOfAddressPath) ? proofOfAddressPath.value = $event : null,
												upload: (file) => unref(uploadApplicationDocument)(file, "proof_of_address"),
												label: "Comprobante de domicilio"
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"upload"
											])]),
											_: 1
										})
									])]),
									_: 1
								})], 512), [[vShow, unref(currentStep) === 5]]),
								createVNode("div", { class: "flex justify-between items-center pt-6 border-t border-default mt-6" }, [createVNode("div", null, [unref(currentStep) > 1 ? (openBlock(), createBlock(_component_UButton, {
									key: 0,
									label: "Anterior",
									color: "neutral",
									variant: "subtle",
									icon: "i-lucide-arrow-left",
									onClick: ($event) => currentStep.value--
								}, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_UButton, {
									key: 1,
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									to: "/registro-verificacion"
								}))]), createVNode("div", { class: "flex gap-2" }, [unref(currentStep) < 5 ? (openBlock(), createBlock(_component_UButton, {
									key: 0,
									label: "Siguiente",
									color: "primary",
									variant: "solid",
									"trailing-icon": "i-lucide-arrow-right",
									onClick: ($event) => goToStep(unref(currentStep) + 1)
								}, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_UButton, {
									key: 1,
									label: "Registrar Solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, ["loading"]))])])
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
					})])) : !unref(coordinatorBranchId) ? (openBlock(), createBlock("div", {
						key: 1,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-triangle-alert",
						title: "Sin sucursal asignada",
						description: "Tu usuario coordinador no tiene una sucursal asignada. Contacta a un gerente para que te asigne una antes de registrar solicitudes."
					})])) : (openBlock(), createBlock(_component_UForm, {
						key: 2,
						ref_key: "formRef",
						ref: formRef,
						id: "new-application",
						schema: unref(schema),
						state: unref(state),
						class: "p-6 space-y-6 w-full",
						onSubmit,
						onError: onFormError
					}, {
						default: withCtx(() => [
							createVNode("div", { class: "mb-8 border border-default bg-elevated/40 rounded-xl p-4 sm:p-5" }, [createVNode("div", { class: "hidden md:flex items-center justify-between gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
								return createVNode("div", {
									key: step.number,
									class: "flex items-center flex-1 last:flex-initial cursor-pointer",
									onClick: ($event) => goToStep(step.number)
								}, [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: ["size-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300", unref(currentStep) === step.number ? "bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-sm" : unref(currentStep) > step.number ? "bg-success text-white" : "bg-muted text-dimmed"] }, [unref(currentStep) > step.number ? (openBlock(), createBlock(_component_UIcon, {
									key: 0,
									name: "i-lucide-check",
									class: "size-4"
								})) : (openBlock(), createBlock(_component_UIcon, {
									key: 1,
									name: step.icon,
									class: "size-4"
								}, null, 8, ["name"]))], 2), createVNode("div", { class: "flex flex-col text-left" }, [createVNode("span", { class: "text-[10px] text-muted font-semibold uppercase tracking-wider" }, "Paso " + toDisplayString(step.number), 1), createVNode("span", { class: ["text-xs font-semibold transition-colors", unref(currentStep) === step.number ? "text-highlighted font-semibold" : "text-dimmed"] }, toDisplayString(step.label), 3)])]), step.number < steps.length ? (openBlock(), createBlock("div", {
									key: 0,
									class: ["h-0.5 flex-1 mx-4 rounded-full transition-all duration-500", unref(currentStep) > step.number ? "bg-success" : "bg-muted"]
								}, null, 2)) : createCommentVNode("", true)], 8, ["onClick"]);
							}), 64))]), createVNode("div", { class: "md:hidden flex items-center justify-between" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "text-[10px] text-muted font-semibold uppercase tracking-wider" }, " Paso " + toDisplayString(unref(currentStep)) + " de " + toDisplayString(steps.length), 1), createVNode("span", { class: "text-sm font-bold text-highlighted" }, toDisplayString(steps[unref(currentStep) - 1]?.label), 1)]), createVNode("div", { class: "flex gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(steps.length, (n) => {
								return openBlock(), createBlock("span", {
									key: n,
									class: ["h-1.5 rounded-full transition-all duration-300", n === unref(currentStep) ? "w-6 bg-primary" : "w-2 bg-muted"]
								}, null, 2);
							}), 128))])])]),
							withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Sucursal")]),
								default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
									createVNode(_component_UIcon, {
										name: "i-lucide-building-2",
										class: "size-4 text-dimmed"
									}),
									createVNode("span", { class: "font-medium" }, toDisplayString(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`), 1),
									createVNode(_component_UBadge, {
										color: "neutral",
										variant: "subtle",
										size: "sm"
									}, {
										default: withCtx(() => [createTextVNode(" Tu sucursal asignada ")]),
										_: 1
									})
								])]),
								_: 1
							}), createVNode(_component_UCard, null, {
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
										name: "second_last_name",
										required: ""
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
										name: "gender",
										required: ""
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
										name: "birth_date",
										required: ""
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
										name: "curp",
										required: ""
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
										name: "rfc",
										required: ""
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
										label: "Teléfono móvil",
										name: "mobile_phone",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											"model-value": unref(state).mobile_phone,
											class: "w-full",
											inputmode: "numeric",
											maxlength: "10",
											placeholder: "10 dígitos, sin espacios",
											"onUpdate:modelValue": (value) => unref(state).mobile_phone = onlyDigits(String(value ?? ""), 10)
										}, null, 8, ["model-value", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Otro teléfono de contacto",
										name: "home_phone",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											"model-value": unref(state).home_phone,
											class: "w-full",
											inputmode: "numeric",
											maxlength: "10",
											placeholder: "10 dígitos, sin espacios",
											"onUpdate:modelValue": (value) => unref(state).home_phone = onlyDigits(String(value ?? ""), 10)
										}, null, 8, ["model-value", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Correo electrónico",
										name: "email",
										required: ""
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
							})], 512), [[vShow, unref(currentStep) === 1]]),
							withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Domicilio")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
									createVNode(_component_UFormField, {
										label: "Calle",
										name: "street",
										required: ""
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
										name: "external_number",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											"model-value": unref(state).external_number,
											class: "w-full",
											inputmode: "numeric",
											maxlength: "30",
											placeholder: "Sin letras ni espacios",
											"onUpdate:modelValue": (value) => unref(state).external_number = onlyDigits(String(value ?? ""), 30)
										}, null, 8, ["model-value", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Estado",
										name: "state",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).state,
											"onUpdate:modelValue": ($event) => unref(state).state = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Ciudad",
										name: "city",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).city,
											"onUpdate:modelValue": ($event) => unref(state).city = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Colonia",
										name: "neighborhood",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).neighborhood,
											"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Código postal",
										name: "postal_code",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											"model-value": unref(state).postal_code,
											class: "w-full",
											inputmode: "numeric",
											maxlength: "5",
											placeholder: "5 dígitos",
											"onUpdate:modelValue": (value) => unref(state).postal_code = onlyDigits(String(value ?? ""), 5)
										}, null, 8, ["model-value", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Referencias del domicilio",
										name: "street_references",
										class: "md:col-span-2"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(state).street_references,
											"onUpdate:modelValue": ($event) => unref(state).street_references = $event,
											class: "w-full",
											rows: 3,
											placeholder: "Entre qué calles se encuentra, color de fachada, características particulares, etc."
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								_: 1
							}), createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, "Familiares y Cónyuge"), createVNode(_component_UButton, {
									label: "Agregar familiar",
									icon: "i-lucide-plus",
									size: "xs",
									variant: "subtle",
									onClick: addFamilyMember
								})])]),
								default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
									return openBlock(), createBlock("div", {
										key: index,
										class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
									}, [
										createVNode(_component_UFormField, {
											label: "Nombre",
											class: "md:col-span-2"
										}, {
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
												"model-value": member.phone,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "10",
												placeholder: "10 dígitos",
												"onUpdate:modelValue": (value) => member.phone = onlyDigits(String(value ?? ""), 10)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
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
								_: 1
							})], 512), [[vShow, unref(currentStep) === 2]]),
							withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Adicionales para la Distribuidora ")]),
								default: withCtx(() => [createVNode("div", { class: "space-y-6" }, [
									createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Trabaja o estudia",
											name: "occupation_type",
											required: ""
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
											name: "occupation_place",
											required: ""
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
											name: "occupation_position",
											required: ""
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
											name: "occupation_phone",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												"model-value": unref(state).occupation_phone,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "10",
												placeholder: "10 dígitos, sin espacios",
												"onUpdate:modelValue": (value) => unref(state).occupation_phone = onlyDigits(String(value ?? ""), 10)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Antigüedad (años)",
											name: "occupation_years",
											required: "",
											hint: unref(maxOccupationYears) !== null ? `Máximo ${unref(maxOccupationYears)} años` : void 0
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).occupation_years,
												"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
												class: "w-full",
												min: 0,
												max: unref(maxOccupationYears) ?? void 0
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"max"
											]), unref(occupationYearsExceeded) ? (openBlock(), createBlock("p", {
												key: 0,
												class: "text-xs text-error mt-1"
											}, " No puede ser mayor a " + toDisplayString(unref(maxOccupationYears)) + " años: es la edad que lleva siendo mayor de edad el solicitante (nació hace " + toDisplayString(unref(applicantAge)) + " años y la mayoría de edad es a los 18). ", 1)) : createCommentVNode("", true)]),
											_: 1
										}, 8, ["hint"]),
										createVNode(_component_UFormField, {
											label: "Ganancia al mes",
											name: "occupation_monthly_income",
											required: ""
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
									createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-dimmed" }, " Vehículos (si tiene) "), createVNode(_component_UButton, {
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
											class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
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
													"model-value": vehicle.year,
													class: "w-full",
													inputmode: "numeric",
													maxlength: "4",
													placeholder: `Máx. ${maxVehicleYear}`,
													"onUpdate:modelValue": (value) => vehicle.year = onlyDigits(String(value ?? ""), 4)
												}, null, 8, [
													"model-value",
													"placeholder",
													"onUpdate:modelValue"
												]), vehicleYearExceeded(vehicle.year) ? (openBlock(), createBlock("p", {
													key: 0,
													class: "text-xs text-error mt-1"
												}, " No puede ser mayor a " + toDisplayString(maxVehicleYear) + ". ")) : createCommentVNode("", true)]),
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
									createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, "Vivienda"), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Tenencia de la vivienda",
											name: "housing_ownership_type",
											required: ""
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
											name: "housing_years",
											required: "",
											hint: unref(maxHousingYears) !== null ? `Máximo ${unref(maxHousingYears)} años` : void 0
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).housing_years,
												"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
												class: "w-full",
												min: 0,
												max: unref(maxHousingYears) ?? void 0
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"max"
											]), unref(housingYearsExceeded) ? (openBlock(), createBlock("p", {
												key: 0,
												class: "text-xs text-error mt-1"
											}, " No puede ser mayor a la edad del solicitante (" + toDisplayString(unref(maxHousingYears)) + " años): no pudo vivir ahí antes de nacer. ", 1)) : createCommentVNode("", true)]),
											_: 1
										}, 8, ["hint"]),
										createVNode(_component_UFormField, {
											label: "Dimensiones de la vivienda",
											name: "housing_dimensions",
											required: "",
											hint: "Solo números"
										}, {
											default: withCtx(() => [createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UInput, {
												"model-value": unref(state).housing_dimensions,
												placeholder: "Ej. 120",
												class: "w-full",
												inputmode: "numeric",
												maxlength: "6",
												"onUpdate:modelValue": (value) => unref(state).housing_dimensions = onlyDigits(String(value ?? ""), 6)
											}, null, 8, ["model-value", "onUpdate:modelValue"]), createVNode(_component_USelect, {
												"model-value": housingDimensionUnit,
												items: housingDimensionUnitItems,
												disabled: "",
												class: "w-40 shrink-0 opacity-70"
											})])]),
											_: 1
										}),
										createVNode("div"),
										createVNode(_component_UFormField, {
											label: "Referencia laboral — nombre",
											name: "work_reference_name",
											required: ""
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
											name: "work_reference_phone",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												"model-value": unref(state).work_reference_phone,
												class: "w-full",
												inputmode: "numeric",
												maxlength: "10",
												placeholder: "10 dígitos, sin espacios",
												"onUpdate:modelValue": (value) => unref(state).work_reference_phone = onlyDigits(String(value ?? ""), 10)
											}, null, 8, ["model-value", "onUpdate:modelValue"])]),
											_: 1
										})
									])])
								])]),
								_: 1
							})], 512), [[vShow, unref(currentStep) === 3]]),
							withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Límite Solicitado")]),
								default: withCtx(() => [createVNode(_component_UFormField, {
									label: "Límite de crédito solicitado",
									name: "requested_credit_limit",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInputNumber, {
										modelValue: unref(state).requested_credit_limit,
										"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
										class: "w-full max-w-sm",
										min: 1e3,
										step: 100
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								_: 1
							})], 512), [[vShow, unref(currentStep) === 4]]),
							withDirectives(createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, "Documentos Escaneados")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
									createVNode(_component_UFormField, {
										label: "INE (frontal)",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
											modelValue: unref(idFrontPath),
											"onUpdate:modelValue": ($event) => isRef(idFrontPath) ? idFrontPath.value = $event : null,
											upload: (file) => unref(uploadApplicationDocument)(file, "id_front"),
											label: "INE (frontal)"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"upload"
										])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "INE (reverso)",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_ApplicationsEvidencePhotoCapture, {
											modelValue: unref(idBackPath),
											"onUpdate:modelValue": ($event) => isRef(idBackPath) ? idBackPath.value = $event : null,
											upload: (file) => unref(uploadApplicationDocument)(file, "id_back"),
											label: "INE (reverso)"
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
											modelValue: unref(proofOfAddressPath),
											"onUpdate:modelValue": ($event) => isRef(proofOfAddressPath) ? proofOfAddressPath.value = $event : null,
											upload: (file) => unref(uploadApplicationDocument)(file, "proof_of_address"),
											label: "Comprobante de domicilio"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"upload"
										])]),
										_: 1
									})
								])]),
								_: 1
							})], 512), [[vShow, unref(currentStep) === 5]]),
							createVNode("div", { class: "flex justify-between items-center pt-6 border-t border-default mt-6" }, [createVNode("div", null, [unref(currentStep) > 1 ? (openBlock(), createBlock(_component_UButton, {
								key: 0,
								label: "Anterior",
								color: "neutral",
								variant: "subtle",
								icon: "i-lucide-arrow-left",
								onClick: ($event) => currentStep.value--
							}, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_UButton, {
								key: 1,
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								to: "/registro-verificacion"
							}))]), createVNode("div", { class: "flex gap-2" }, [unref(currentStep) < 5 ? (openBlock(), createBlock(_component_UButton, {
								key: 0,
								label: "Siguiente",
								color: "primary",
								variant: "solid",
								"trailing-icon": "i-lucide-arrow-right",
								onClick: ($event) => goToStep(unref(currentStep) + 1)
							}, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_UButton, {
								key: 1,
								label: "Registrar Solicitud",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"]))])])
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
//# sourceMappingURL=new-ByaaRhKW.mjs.map
