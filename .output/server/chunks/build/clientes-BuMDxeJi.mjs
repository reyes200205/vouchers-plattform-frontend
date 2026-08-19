import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useCustomers } from './useCustomers-DFzHFYKe.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
			apellidoPaterno: "",
			apellidoMaterno: "",
			telefono: "",
			curp: "",
			rfc: "",
			direccion: ""
		});
		const saving = ref(false);
		const errorMessage = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "form-shell" }, _attrs))} data-v-887832d9><div class="form-wrapper" data-v-887832d9><header class="top-navbar" data-v-887832d9><button class="back-btn" data-v-887832d9> ← </button><h1 class="nav-title" data-v-887832d9> Nuevo Cliente </h1></header><form class="form-body" data-v-887832d9>`);
			if (errorMessage.value) _push(`<p class="error-banner" data-v-887832d9>${ssrInterpolate(errorMessage.value)}</p>`);
			else _push(`<!---->`);
			_push(`<div class="input-group" data-v-887832d9><label data-v-887832d9>Nombre(s) *</label><input${ssrRenderAttr("value", form.value.nombre)} type="text" placeholder="Ej. María Elena" required class="app-input" data-v-887832d9></div><div class="input-row" data-v-887832d9><div class="input-group" data-v-887832d9><label data-v-887832d9>Apellido Paterno *</label><input${ssrRenderAttr("value", form.value.apellidoPaterno)} type="text" placeholder="Ej. Gómez" required class="app-input" data-v-887832d9></div><div class="input-group" data-v-887832d9><label data-v-887832d9>Apellido Materno</label><input${ssrRenderAttr("value", form.value.apellidoMaterno)} type="text" placeholder="Ej. López" class="app-input" data-v-887832d9></div></div><div class="input-group" data-v-887832d9><label data-v-887832d9>Teléfono *</label><input${ssrRenderAttr("value", form.value.telefono)} type="tel" placeholder="Ej. 8712345678" maxlength="10" required class="app-input" data-v-887832d9></div><div class="input-group" data-v-887832d9><label data-v-887832d9>CURP (Única) *</label><input${ssrRenderAttr("value", form.value.curp)} type="text" placeholder="18 caracteres" maxlength="18" required class="app-input uppercase" data-v-887832d9></div><div class="input-group" data-v-887832d9><label data-v-887832d9>RFC</label><input${ssrRenderAttr("value", form.value.rfc)} type="text" placeholder="13 caracteres" maxlength="13" class="app-input uppercase" data-v-887832d9></div><div class="input-group" data-v-887832d9><label data-v-887832d9>Dirección Completa</label><textarea placeholder="Calle, número, colonia y C.P." rows="3" class="app-input textarea" data-v-887832d9>${ssrInterpolate(form.value.direccion)}</textarea></div><button type="submit" class="submit-btn"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} data-v-887832d9>${ssrInterpolate(saving.value ? "Guardando…" : "Guardar Cliente")}</button></form></div></main>`);
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
var clientes_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-887832d9"]]);

export { clientes_default as default };
//# sourceMappingURL=clientes-BuMDxeJi.mjs.map
