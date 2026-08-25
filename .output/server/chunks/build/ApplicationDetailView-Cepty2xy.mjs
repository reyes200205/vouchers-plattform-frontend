import { j as _sfc_main$2 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Badge-BBG1L7MO.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';

//#region app/components/applications/ApplicationDetailView.vue?vue&type=script&setup=true&lang.ts
var ApplicationDetailView_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ApplicationDetailView",
	__ssrInlineRender: true,
	props: { detail: {} },
	setup(__props) {
		const props = __props;
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function fmtDate(value) {
			if (!value) return "—";
			return new Date(value).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		}
		function fmtBirthDate(value) {
			if (!value) return "—";
			return new Date(value).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "long",
				year: "numeric",
				timeZone: "UTC"
			});
		}
		function fmtValue(value) {
			if (value === null || value === void 0 || value === "") return "—";
			return String(value);
		}
		const GENDER_LABELS = {
			M: "Masculino",
			F: "Femenino",
			OTHER: "Otro"
		};
		function fmtGender(value) {
			if (!value) return "—";
			return GENDER_LABELS[value] ?? value;
		}
		const familyMembers = computed(() => (props.detail.family_data_json?.members ?? []).filter((m) => m.name || m.relationship || m.phone || m.age));
		const occupation = computed(() => {
			const data = props.detail.family_data_json?.occupation;
			if (!data || !data.type && !data.place_name && !data.position && !data.phone && !data.years) return null;
			return data;
		});
		const housing = computed(() => {
			const data = props.detail.family_data_json?.housing;
			if (!data || !data.ownership_type && !data.dimensions && !data.years_at_address && !data.work_reference?.name) return null;
			return data;
		});
		const vehicles = computed(() => (props.detail.vehicles_json ?? []).filter((v) => v.brand || v.model || v.year || v.plates));
		const externalAffiliationsEntries = computed(() => {
			const data = props.detail.external_affiliations_json;
			if (!data) return [];
			return Object.entries(data).filter(([, value]) => value !== null && value !== void 0 && value !== "");
		});
		const corrections = computed(() => props.detail.verifier_corrections_json ?? []);
		const coordinatorPhotos = computed(() => {
			const items = [];
			if (props.detail.id_front_path) items.push({
				label: "INE (frente)",
				url: props.detail.id_front_url ?? null,
				broken: !props.detail.id_front_url
			});
			if (props.detail.id_back_path) items.push({
				label: "INE (reverso)",
				url: props.detail.id_back_url ?? null,
				broken: !props.detail.id_back_url
			});
			if (props.detail.proof_of_address_path) items.push({
				label: "Comprobante de domicilio",
				url: props.detail.proof_of_address_url ?? null,
				broken: !props.detail.proof_of_address_url
			});
			return items;
		});
		const verifierPhotos = computed(() => {
			const verification = props.detail.verification;
			const items = [];
			if (verification?.front_photo) items.push({
				label: "Foto de fachada",
				url: verification.front_photo_url ?? null,
				broken: !verification.front_photo_url
			});
			if (verification?.id_with_person_photo) items.push({
				label: "Identificación con la persona",
				url: verification.id_with_person_photo_url ?? null,
				broken: !verification.id_with_person_photo_url
			});
			if (verification?.proof_of_address_photo) items.push({
				label: "Comprobante de domicilio (visita)",
				url: verification.proof_of_address_photo_url ?? null,
				broken: !verification.proof_of_address_photo_url
			});
			return items;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UBadge = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Datos personales </p><div class="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3"><div><p class="text-xs text-muted"> CURP </p><p class="text-highlighted">${ssrInterpolate(fmtValue(__props.detail.applicant?.curp))}</p></div><div><p class="text-xs text-muted"> RFC </p><p class="text-highlighted">${ssrInterpolate(fmtValue(__props.detail.applicant?.rfc))}</p></div><div><p class="text-xs text-muted"> Género </p><p class="text-highlighted">${ssrInterpolate(fmtGender(__props.detail.applicant?.gender))}</p></div><div><p class="text-xs text-muted"> Fecha de nacimiento </p><p class="text-highlighted">${ssrInterpolate(fmtBirthDate(__props.detail.applicant?.birth_date))}</p></div><div><p class="text-xs text-muted"> Teléfono de casa </p><p class="text-highlighted">${ssrInterpolate(fmtValue(__props.detail.applicant?.home_phone))}</p></div><div><p class="text-xs text-muted"> Celular </p><p class="text-highlighted">${ssrInterpolate(fmtValue(__props.detail.applicant?.mobile_phone))}</p></div><div><p class="text-xs text-muted"> Correo </p><p class="text-highlighted">${ssrInterpolate(fmtValue(__props.detail.applicant?.email))}</p></div>`);
			if (__props.detail.applicant?.notes) _push(`<div class="sm:col-span-2 lg:col-span-3"><p class="text-xs text-muted"> Notas </p><p class="text-highlighted">${ssrInterpolate(__props.detail.applicant.notes)}</p></div>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Domicilio </p><div class="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3"><div class="sm:col-span-2 lg:col-span-3"><p class="text-xs text-muted"> Dirección </p><p class="text-highlighted">${ssrInterpolate([
				__props.detail.applicant?.street,
				__props.detail.applicant?.external_number,
				__props.detail.applicant?.neighborhood,
				__props.detail.applicant?.city,
				__props.detail.applicant?.state,
				__props.detail.applicant?.postal_code
			].filter(Boolean).join(", ") || "—")}</p></div>`);
			if (__props.detail.applicant?.street_references) _push(`<div class="sm:col-span-2 lg:col-span-3"><p class="text-xs text-muted"> Referencias del domicilio </p><p class="mt-1 rounded-lg border border-default bg-elevated/40 p-2.5 text-xs text-highlighted">${ssrInterpolate(__props.detail.applicant.street_references)}</p></div>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Solicitud de crédito </p><div class="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3"><div><p class="text-xs text-muted"> Crédito solicitado </p><p class="text-highlighted">${ssrInterpolate(unref(money).format(Number(__props.detail.requested_credit_limit || 0)))}</p></div><div><p class="text-xs text-muted"> Categoría inicial </p><p class="text-highlighted">${ssrInterpolate(fmtValue(__props.detail.initial_category_code))}</p></div><div><p class="text-xs text-muted"> Resultado buró </p><p class="text-highlighted">${ssrInterpolate(__props.detail.credit_bureau_result || "Sin dato")}</p></div><div><p class="text-xs text-muted"> Prevale </p><p class="text-highlighted">${ssrInterpolate(__props.detail.prevale_approved ? "Aprobado" : "Pendiente")}</p></div><div><p class="text-xs text-muted"> Enviada </p><p class="text-highlighted">${ssrInterpolate(fmtDate(__props.detail.submitted_at))}</p></div></div></div>`);
			if (unref(familyMembers).length) {
				_push(`<div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Familiares y cónyuge </p><div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead><tr class="text-xs text-muted"><th class="pb-1 pr-3 font-normal"> Nombre </th><th class="pb-1 pr-3 font-normal"> Parentesco </th><th class="pb-1 pr-3 font-normal"> Teléfono </th><th class="pb-1 font-normal"> Edad </th></tr></thead><tbody><!--[-->`);
				ssrRenderList(unref(familyMembers), (member, index) => {
					_push(`<tr class="border-t border-default"><td class="py-1.5 pr-3 text-highlighted">${ssrInterpolate(fmtValue(member.name))}</td><td class="py-1.5 pr-3 text-highlighted">${ssrInterpolate(fmtValue(member.relationship))}</td><td class="py-1.5 pr-3 text-highlighted">${ssrInterpolate(fmtValue(member.phone))}</td><td class="py-1.5 text-highlighted">${ssrInterpolate(member.age ?? "—")}</td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div>`);
			} else _push(`<!---->`);
			if (unref(occupation) || unref(housing)) {
				_push(`<div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Ocupación y vivienda </p>`);
				if (unref(occupation)) _push(`<div class="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3"><div><p class="text-xs text-muted"> Trabaja o estudia </p><p class="text-highlighted">${ssrInterpolate(fmtValue(unref(occupation).type))}</p></div><div><p class="text-xs text-muted"> Nombre del trabajo o escuela </p><p class="text-highlighted">${ssrInterpolate(fmtValue(unref(occupation).place_name))}</p></div><div><p class="text-xs text-muted"> Puesto o grado </p><p class="text-highlighted">${ssrInterpolate(fmtValue(unref(occupation).position))}</p></div><div><p class="text-xs text-muted"> Teléfono del trabajo o escuela </p><p class="text-highlighted">${ssrInterpolate(fmtValue(unref(occupation).phone))}</p></div><div><p class="text-xs text-muted"> Antigüedad </p><p class="text-highlighted">${ssrInterpolate(unref(occupation).years !== null ? `${unref(occupation).years} años` : "—")}</p></div><div><p class="text-xs text-muted"> Ganancia al mes </p><p class="text-highlighted">${ssrInterpolate(unref(occupation).monthly_income !== null && unref(occupation).monthly_income !== void 0 ? unref(money).format(unref(occupation).monthly_income) : "—")}</p></div></div>`);
				else _push(`<!---->`);
				if (unref(housing)) {
					_push(`<div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-default pt-3 text-sm sm:grid-cols-2 lg:grid-cols-3"><div><p class="text-xs text-muted"> Tenencia de la vivienda </p><p class="text-highlighted">${ssrInterpolate(fmtValue(unref(housing).ownership_type))}</p></div><div><p class="text-xs text-muted"> Dimensiones de la vivienda </p><p class="text-highlighted">${ssrInterpolate(fmtValue(unref(housing).dimensions))}</p></div><div><p class="text-xs text-muted"> Años viviendo en el domicilio </p><p class="text-highlighted">${ssrInterpolate(unref(housing).years_at_address !== null ? `${unref(housing).years_at_address} años` : "—")}</p></div>`);
					if (unref(housing).work_reference?.name) _push(`<div class="sm:col-span-2 lg:col-span-3"><p class="text-xs text-muted"> Referencia laboral </p><p class="text-highlighted">${ssrInterpolate(unref(housing).work_reference.name)}${ssrInterpolate(unref(housing).work_reference.phone ? ` · ${unref(housing).work_reference.phone}` : "")}</p></div>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			if (unref(vehicles).length || unref(externalAffiliationsEntries).length) {
				_push(`<div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Vehículos y afiliaciones </p>`);
				if (unref(vehicles).length) {
					_push(`<div class="flex flex-wrap gap-2"><!--[-->`);
					ssrRenderList(unref(vehicles), (vehicle, index) => {
						_push(ssrRenderComponent(_component_UBadge, {
							key: index,
							variant: "subtle",
							color: "neutral"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate([
									vehicle.brand,
									vehicle.model,
									vehicle.year,
									vehicle.plates
								].filter(Boolean).join(" · ") || `Vehículo ${index + 1}`)}`);
								else return [createTextVNode(toDisplayString([
									vehicle.brand,
									vehicle.model,
									vehicle.year,
									vehicle.plates
								].filter(Boolean).join(" · ") || `Vehículo ${index + 1}`), 1)];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				if (unref(externalAffiliationsEntries).length) {
					_push(`<div class="mt-3 border-t border-default pt-3"><p class="mb-2 text-xs text-muted"> Afiliaciones externas </p><div class="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
					ssrRenderList(unref(externalAffiliationsEntries), ([key, value]) => {
						_push(`<div><p class="text-xs capitalize text-muted">${ssrInterpolate(key.replace(/_/g, " "))}</p><p class="text-highlighted">${ssrInterpolate(fmtValue(value))}</p></div>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			if (unref(corrections).length) {
				_push(`<div class="rounded-lg border border-warning/40 bg-warning/5 p-4"><p class="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-warning">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-pencil-line",
					class: "size-3.5"
				}, null, _parent));
				_push(` Corregido por el verificador </p><div class="space-y-3"><!--[-->`);
				ssrRenderList(unref(corrections), (entry, index) => {
					_push(`<div class="text-sm"><p class="text-xs text-muted">${ssrInterpolate(entry.corrected_by_name)} · ${ssrInterpolate(fmtDate(entry.corrected_at))}</p><ul class="mt-1 space-y-1"><!--[-->`);
					ssrRenderList(entry.changes, (change) => {
						_push(`<li class="flex flex-wrap items-baseline gap-1.5"><span class="font-medium text-highlighted">${ssrInterpolate(change.label)}:</span><span class="text-muted line-through">${ssrInterpolate(fmtValue(change.old_value))}</span>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-arrow-right",
							class: "size-3 text-muted"
						}, null, _parent));
						_push(`<span class="text-highlighted">${ssrInterpolate(fmtValue(change.new_value))}</span></li>`);
					});
					_push(`<!--]--></ul></div>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			if (__props.detail.verification) {
				_push(`<div class="rounded-lg border border-default p-4"><p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted"> Verificación en sitio </p><div class="flex flex-wrap items-center gap-2 text-sm">`);
				_push(ssrRenderComponent(_component_UBadge, {
					color: __props.detail.verification.result === "VERIFICADA" ? "success" : "error",
					variant: "subtle",
					label: __props.detail.verification.result
				}, null, _parent));
				if (__props.detail.verification.visit_date) _push(`<span class="text-xs text-muted">${ssrInterpolate(fmtDate(__props.detail.verification.visit_date))}</span>`);
				else _push(`<!---->`);
				if (__props.detail.verification.distance_meters) _push(`<span class="text-xs text-muted"> · ${ssrInterpolate(__props.detail.verification.distance_meters)}m del domicilio declarado </span>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (__props.detail.verification.notes) _push(`<p class="mt-1 text-sm text-muted">${ssrInterpolate(__props.detail.verification.notes)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="rounded-lg border border-default p-4"><p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted"> Evidencia fotográfica </p>`);
			if (unref(coordinatorPhotos).length) {
				_push(`<div class="mb-4"><p class="mb-2 text-xs text-muted"> Cargada por el coordinador al capturar la solicitud </p><div class="grid grid-cols-2 gap-3 sm:grid-cols-3"><!--[-->`);
				ssrRenderList(unref(coordinatorPhotos), (photo) => {
					_push(`<a${ssrRenderAttr("href", photo.url ?? void 0)}${ssrRenderAttr("target", photo.url ? "_blank" : void 0)} rel="noopener" class="${ssrRenderClass([photo.broken ? "border-error/40 cursor-default" : "border-default", "group block overflow-hidden rounded-lg border"])}">`);
					if (photo.broken) {
						_push(`<div class="flex aspect-square w-full flex-col items-center justify-center gap-1 bg-error/5 p-2 text-center">`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-image-off",
							class: "size-5 text-error"
						}, null, _parent));
						_push(`<p class="text-[11px] text-error">No se pudo cargar</p></div>`);
					} else _push(`<img${ssrRenderAttr("src", photo.url)}${ssrRenderAttr("alt", photo.label)} class="aspect-square w-full object-cover transition group-hover:opacity-80">`);
					_push(`<p class="truncate px-2 py-1 text-xs text-muted">${ssrInterpolate(photo.label)}</p></a>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			if (unref(verifierPhotos).length) {
				_push(`<div><p class="mb-2 text-xs text-muted"> Cargada por el verificador durante la visita </p><div class="grid grid-cols-2 gap-3 sm:grid-cols-3"><!--[-->`);
				ssrRenderList(unref(verifierPhotos), (photo) => {
					_push(`<a${ssrRenderAttr("href", photo.url ?? void 0)}${ssrRenderAttr("target", photo.url ? "_blank" : void 0)} rel="noopener" class="${ssrRenderClass([photo.broken ? "border-error/40 cursor-default" : "border-default", "group block overflow-hidden rounded-lg border"])}">`);
					if (photo.broken) {
						_push(`<div class="flex aspect-square w-full flex-col items-center justify-center gap-1 bg-error/5 p-2 text-center">`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-image-off",
							class: "size-5 text-error"
						}, null, _parent));
						_push(`<p class="text-[11px] text-error">No se pudo cargar</p></div>`);
					} else _push(`<img${ssrRenderAttr("src", photo.url)}${ssrRenderAttr("alt", photo.label)} class="aspect-square w-full object-cover transition group-hover:opacity-80">`);
					_push(`<p class="truncate px-2 py-1 text-xs text-muted">${ssrInterpolate(photo.label)}</p></a>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			if (!unref(coordinatorPhotos).length && !unref(verifierPhotos).length) _push(`<p class="text-xs text-dimmed"> No hay fotos de evidencia cargadas todavía. </p>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/components/applications/ApplicationDetailView.vue
var _sfc_setup = ApplicationDetailView_vue_vue_type_script_setup_true_lang_default.setup;
ApplicationDetailView_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/applications/ApplicationDetailView.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ApplicationDetailView_default = Object.assign(ApplicationDetailView_vue_vue_type_script_setup_true_lang_default, { __name: "ApplicationsApplicationDetailView" });

export { ApplicationDetailView_default as A };
//# sourceMappingURL=ApplicationDetailView-Cepty2xy.mjs.map
