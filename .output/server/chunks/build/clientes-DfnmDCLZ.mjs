import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useCustomers } from './useCustomers-CQ23lYPq.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import '../virtual/entry.mjs';
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

//#region app/pages/distributor-portal/clientes/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useCustomers();
		const form = ref({
			nombre: "",
			segundoNombre: "",
			apellidoPaterno: "",
			apellidoMaterno: "",
			genero: "",
			fechaNacimiento: "",
			telefono: "",
			telefonoFijo: "",
			correo: "",
			curp: "",
			rfc: "",
			calle: "",
			numeroExterior: "",
			colonia: "",
			ciudad: "",
			estado: "",
			codigoPostal: "",
			notasPersona: "",
			notasCliente: ""
		});
		const saving = ref(false);
		const errorMessage = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "form-shell" }, _attrs))} data-v-7ba80d0a><div class="form-wrapper" data-v-7ba80d0a><header class="top-navbar" data-v-7ba80d0a><button class="back-btn" data-v-7ba80d0a> ← </button><h1 class="nav-title" data-v-7ba80d0a> Nuevo Cliente </h1></header><form class="form-body" data-v-7ba80d0a>`);
			if (errorMessage.value) _push(`<p class="error-banner" data-v-7ba80d0a>${ssrInterpolate(errorMessage.value)}</p>`);
			else _push(`<!---->`);
			_push(`<p class="section-title" data-v-7ba80d0a> Datos personales </p><div class="input-row" data-v-7ba80d0a><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Nombre(s) *</label><input${ssrRenderAttr("value", form.value.nombre)} type="text" placeholder="Ej. María Elena" required class="app-input" data-v-7ba80d0a></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Segundo nombre</label><input${ssrRenderAttr("value", form.value.segundoNombre)} type="text" placeholder="Opcional" class="app-input" data-v-7ba80d0a></div></div><div class="input-row" data-v-7ba80d0a><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Apellido Paterno *</label><input${ssrRenderAttr("value", form.value.apellidoPaterno)} type="text" placeholder="Ej. Gómez" required class="app-input" data-v-7ba80d0a></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Apellido Materno</label><input${ssrRenderAttr("value", form.value.apellidoMaterno)} type="text" placeholder="Ej. López" class="app-input" data-v-7ba80d0a></div></div><div class="input-row" data-v-7ba80d0a><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Género</label><select class="app-input" data-v-7ba80d0a><option value="" data-v-7ba80d0a${ssrIncludeBooleanAttr(Array.isArray(form.value.genero) ? ssrLooseContain(form.value.genero, "") : ssrLooseEqual(form.value.genero, "")) ? " selected" : ""}> Selecciona... </option><option value="M" data-v-7ba80d0a${ssrIncludeBooleanAttr(Array.isArray(form.value.genero) ? ssrLooseContain(form.value.genero, "M") : ssrLooseEqual(form.value.genero, "M")) ? " selected" : ""}> Masculino </option><option value="F" data-v-7ba80d0a${ssrIncludeBooleanAttr(Array.isArray(form.value.genero) ? ssrLooseContain(form.value.genero, "F") : ssrLooseEqual(form.value.genero, "F")) ? " selected" : ""}> Femenino </option><option value="OTHER" data-v-7ba80d0a${ssrIncludeBooleanAttr(Array.isArray(form.value.genero) ? ssrLooseContain(form.value.genero, "OTHER") : ssrLooseEqual(form.value.genero, "OTHER")) ? " selected" : ""}> Otro </option></select></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Fecha de nacimiento</label><input${ssrRenderAttr("value", form.value.fechaNacimiento)} type="date" class="app-input" data-v-7ba80d0a></div></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>CURP (Única) *</label><input${ssrRenderAttr("value", form.value.curp)} type="text" placeholder="18 caracteres" maxlength="18" required class="app-input uppercase" data-v-7ba80d0a></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>RFC</label><input${ssrRenderAttr("value", form.value.rfc)} type="text" placeholder="13 caracteres" maxlength="13" class="app-input uppercase" data-v-7ba80d0a></div><p class="section-title" data-v-7ba80d0a> Contacto </p><div class="input-row" data-v-7ba80d0a><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Teléfono móvil *</label><input${ssrRenderAttr("value", form.value.telefono)} type="tel" placeholder="Ej. 8712345678" maxlength="10" required class="app-input" data-v-7ba80d0a></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Teléfono fijo</label><input${ssrRenderAttr("value", form.value.telefonoFijo)} type="tel" placeholder="Opcional" maxlength="10" class="app-input" data-v-7ba80d0a></div></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Correo electrónico</label><input${ssrRenderAttr("value", form.value.correo)} type="email" placeholder="correo@ejemplo.com" class="app-input" data-v-7ba80d0a></div><p class="section-title" data-v-7ba80d0a> Domicilio </p><div class="input-row" data-v-7ba80d0a><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Calle</label><input${ssrRenderAttr("value", form.value.calle)} type="text" placeholder="Ej. Av. Constitución" class="app-input" data-v-7ba80d0a></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Número exterior</label><input${ssrRenderAttr("value", form.value.numeroExterior)} type="text" placeholder="Ej. 123" class="app-input" data-v-7ba80d0a></div></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Colonia</label><input${ssrRenderAttr("value", form.value.colonia)} type="text" placeholder="Ej. Centro" class="app-input" data-v-7ba80d0a></div><div class="input-row" data-v-7ba80d0a><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Ciudad</label><input${ssrRenderAttr("value", form.value.ciudad)} type="text" placeholder="Ej. Monterrey" class="app-input" data-v-7ba80d0a></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Estado</label><input${ssrRenderAttr("value", form.value.estado)} type="text" placeholder="Ej. Nuevo León" class="app-input" data-v-7ba80d0a></div></div><div class="input-group" data-v-7ba80d0a><label data-v-7ba80d0a>Código postal</label><input${ssrRenderAttr("value", form.value.codigoPostal)} type="text" placeholder="Ej. 64000" maxlength="10" class="app-input" data-v-7ba80d0a></div><button type="submit" class="submit-btn"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} data-v-7ba80d0a>${ssrInterpolate(saving.value ? "Guardando…" : "Guardar Cliente")}</button></form></div></main>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/clientes/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/clientes/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var clientes_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7ba80d0a"]]);

export { clientes_default as default };
//# sourceMappingURL=clientes-DfnmDCLZ.mjs.map
