import { aj as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderDynamicModel, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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

//#region app/pages/login/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useAuth();
		const username = ref("");
		const password = ref("");
		const showPassword = ref(false);
		const rememberMe = ref(false);
		const loading = ref(false);
		const errorMessage = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-6b7a8111><div class="login-container" data-v-6b7a8111><section class="brand-panel" data-v-6b7a8111><div class="decorative-circle circle-one" data-v-6b7a8111></div><div class="decorative-circle circle-two" data-v-6b7a8111></div><div class="brand-content" data-v-6b7a8111><div class="brand-logo" data-v-6b7a8111><div class="logo-icon" data-v-6b7a8111><svg width="26" height="26" viewBox="0 0 24 24" fill="none" data-v-6b7a8111><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="#0D2747" stroke-width="2" data-v-6b7a8111></path><path d="M8 10H16M8 14H13" stroke="#0D2747" stroke-width="2" stroke-linecap="round" data-v-6b7a8111></path></svg></div><div data-v-6b7a8111><h1 data-v-6b7a8111>MIS VALES</h1><p data-v-6b7a8111>Administración de vales</p></div></div><div class="brand-message" data-v-6b7a8111><span data-v-6b7a8111>PLATAFORMA EMPRESARIAL</span><h2 data-v-6b7a8111> Administra tus vales <strong data-v-6b7a8111>de forma sencilla.</strong></h2><p data-v-6b7a8111> Gestiona vales, usuarios, relaciones y estados de cuenta desde una plataforma centralizada, segura y fácil de utilizar. </p></div></div><div class="features" data-v-6b7a8111><div class="feature" data-v-6b7a8111><div class="feature-icon" data-v-6b7a8111> ✓ </div><div data-v-6b7a8111><h3 data-v-6b7a8111>Gestión centralizada</h3><p data-v-6b7a8111> Administra la información desde un solo lugar. </p></div></div><div class="feature" data-v-6b7a8111><div class="feature-icon" data-v-6b7a8111> ✓ </div><div data-v-6b7a8111><h3 data-v-6b7a8111>Control y seguimiento</h3><p data-v-6b7a8111> Consulta movimientos y estados de cuenta. </p></div></div><div class="feature" data-v-6b7a8111><div class="feature-icon" data-v-6b7a8111> ✓ </div><div data-v-6b7a8111><h3 data-v-6b7a8111>Información segura</h3><p data-v-6b7a8111> Protege el acceso a la información de tu empresa. </p></div></div></div></section><section class="form-panel" data-v-6b7a8111><div class="mobile-brand" data-v-6b7a8111><div class="mobile-logo" data-v-6b7a8111><svg width="23" height="23" viewBox="0 0 24 24" fill="none" data-v-6b7a8111><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="#0D2747" stroke-width="2" data-v-6b7a8111></path><path d="M8 10H16M8 14H13" stroke="#0D2747" stroke-width="2" stroke-linecap="round" data-v-6b7a8111></path></svg></div><div data-v-6b7a8111><h1 data-v-6b7a8111>MIS VALES</h1><p data-v-6b7a8111>Administración de vales</p></div></div><div class="form-wrapper" data-v-6b7a8111><div class="form-header" data-v-6b7a8111><span data-v-6b7a8111>BIENVENIDO DE NUEVO</span><h2 data-v-6b7a8111>Iniciar sesión</h2><p data-v-6b7a8111> Ingresa tus datos para acceder a la plataforma de Mis Vales. </p></div><form data-v-6b7a8111><div class="form-group" data-v-6b7a8111><label for="username" data-v-6b7a8111> Usuario </label><div class="input-wrapper" data-v-6b7a8111><svg class="input-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" data-v-6b7a8111><path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="1.8" data-v-6b7a8111></path><path d="M4 7L12 13L20 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-v-6b7a8111></path></svg><input id="username"${ssrRenderAttr("value", username.value)} type="text" placeholder="usuario" autocomplete="username" required data-v-6b7a8111></div></div><div class="form-group" data-v-6b7a8111><div class="password-header" data-v-6b7a8111><label for="password" data-v-6b7a8111> Contraseña </label><button type="button" class="forgot-password" data-v-6b7a8111> ¿Olvidaste tu contraseña? </button></div><div class="input-wrapper" data-v-6b7a8111><svg class="input-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" data-v-6b7a8111><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.8" data-v-6b7a8111></rect><path d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-v-6b7a8111></path></svg><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} placeholder="Ingresa tu contraseña" autocomplete="current-password" required data-v-6b7a8111><button type="button" class="show-password" data-v-6b7a8111>${ssrInterpolate(showPassword.value ? "Ocultar" : "Ver")}</button></div></div><label class="remember" data-v-6b7a8111><input${ssrIncludeBooleanAttr(Array.isArray(rememberMe.value) ? ssrLooseContain(rememberMe.value, null) : rememberMe.value) ? " checked" : ""} type="checkbox" data-v-6b7a8111><span data-v-6b7a8111> Mantener mi sesión iniciada </span></label>`);
			if (errorMessage.value) _push(`<p class="login-error" data-v-6b7a8111>${ssrInterpolate(errorMessage.value)}</p>`);
			else _push(`<!---->`);
			_push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-6b7a8111>`);
			if (!loading.value) _push(`<span data-v-6b7a8111> Iniciar sesión </span>`);
			else _push(`<span data-v-6b7a8111> Iniciando sesión... </span>`);
			if (!loading.value) _push(`<span class="arrow" data-v-6b7a8111> → </span>`);
			else _push(`<!---->`);
			_push(`</button></form><div class="security" data-v-6b7a8111><div class="security-icon" data-v-6b7a8111> ✓ </div><p data-v-6b7a8111> Tu información está protegida mediante <strong data-v-6b7a8111>acceso seguro.</strong></p></div><p class="copyright" data-v-6b7a8111> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Mis Vales. Todos los derechos reservados. </p></div></section></div></main>`);
		};
	}
});
//#endregion
//#region app/pages/login/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-6b7a8111"]]);

export { login_default as default };
//# sourceMappingURL=login-rpmbnwyX.mjs.map
