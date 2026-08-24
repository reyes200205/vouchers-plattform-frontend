import { al as useAuth, aM as useRuntimeConfig, aA as useHead$1, N as NuxtLink } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrRenderDynamicModel, ssrLooseContain } from 'vue/server-renderer';
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
		const passwordConfirmStep = ref(false);
		ref(null);
		const showChangePasswordForm = ref(false);
		const newPassword = ref("");
		const newPasswordConfirmation = ref("");
		const passwordStepLoading = ref(false);
		const passwordStepError = ref("");
		const mfaStep = ref(false);
		ref("");
		const mfaMaskedEmail = ref("");
		const otpCode = ref("");
		const otpLoading = ref(false);
		const otpError = ref("");
		const resendLoading = ref(false);
		const resendMessage = ref("");
		const siteKey = useRuntimeConfig().public.turnstileSiteKey;
		ref(null);
		ref("");
		useHead$1({ script: [{
			src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
			async: true,
			defer: true
		}] });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-db45568f><div class="login-container" data-v-db45568f><section class="brand-panel" data-v-db45568f><div class="decorative-circle circle-one" data-v-db45568f></div><div class="decorative-circle circle-two" data-v-db45568f></div><div class="brand-content" data-v-db45568f><div class="brand-logo" data-v-db45568f><div class="logo-icon" data-v-db45568f><svg width="26" height="26" viewBox="0 0 24 24" fill="none" data-v-db45568f><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="#0D2747" stroke-width="2" data-v-db45568f></path><path d="M8 10H16M8 14H13" stroke="#0D2747" stroke-width="2" stroke-linecap="round" data-v-db45568f></path></svg></div><div data-v-db45568f><h1 data-v-db45568f>MIS VALES</h1><p data-v-db45568f>Administración de vales</p></div></div><div class="brand-message" data-v-db45568f><span data-v-db45568f>PLATAFORMA EMPRESARIAL</span><h2 data-v-db45568f> Administra tus vales <strong data-v-db45568f>de forma sencilla.</strong></h2><p data-v-db45568f> Gestiona vales, usuarios, relaciones y estados de cuenta desde una plataforma centralizada, segura y fácil de utilizar. </p></div></div><div class="features" data-v-db45568f><div class="feature" data-v-db45568f><div class="feature-icon" data-v-db45568f> ✓ </div><div data-v-db45568f><h3 data-v-db45568f>Gestión centralizada</h3><p data-v-db45568f> Administra la información desde un solo lugar. </p></div></div><div class="feature" data-v-db45568f><div class="feature-icon" data-v-db45568f> ✓ </div><div data-v-db45568f><h3 data-v-db45568f>Control y seguimiento</h3><p data-v-db45568f> Consulta movimientos y estados de cuenta. </p></div></div><div class="feature" data-v-db45568f><div class="feature-icon" data-v-db45568f> ✓ </div><div data-v-db45568f><h3 data-v-db45568f>Información segura</h3><p data-v-db45568f> Protege el acceso a la información de tu empresa. </p></div></div></div></section><section class="form-panel" data-v-db45568f><div class="mobile-brand" data-v-db45568f><div class="mobile-logo" data-v-db45568f><svg width="23" height="23" viewBox="0 0 24 24" fill="none" data-v-db45568f><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="#0D2747" stroke-width="2" data-v-db45568f></path><path d="M8 10H16M8 14H13" stroke="#0D2747" stroke-width="2" stroke-linecap="round" data-v-db45568f></path></svg></div><div data-v-db45568f><h1 data-v-db45568f>MIS VALES</h1><p data-v-db45568f>Administración de vales</p></div></div><div class="form-wrapper" data-v-db45568f>`);
			if (passwordConfirmStep.value) _push(`<div class="form-header" data-v-db45568f><span data-v-db45568f>PRIMER INICIO DE SESIÓN</span><h2 data-v-db45568f>Tu contraseña</h2><p data-v-db45568f> Ingresaste con la contraseña temporal asignada al darte de alta. Puedes conservarla o cambiarla por una propia. </p></div>`);
			else if (mfaStep.value) {
				_push(`<div class="form-header" data-v-db45568f><span data-v-db45568f>VERIFICACIÓN REQUERIDA</span><h2 data-v-db45568f>Ingresa tu código</h2><p data-v-db45568f> Enviamos un código de verificación a `);
				if (mfaMaskedEmail.value) _push(`<strong data-v-db45568f>${ssrInterpolate(mfaMaskedEmail.value)}</strong>`);
				else _push(`<span data-v-db45568f>tu correo</span>`);
				_push(`. Ingresa el código para completar tu inicio de sesión. </p></div>`);
			} else _push(`<div class="form-header" data-v-db45568f><span data-v-db45568f>BIENVENIDO DE NUEVO</span><h2 data-v-db45568f>Iniciar sesión</h2><p data-v-db45568f> Ingresa tus datos para acceder a la plataforma de Mis Vales. </p></div>`);
			if (passwordConfirmStep.value) {
				_push(`<div data-v-db45568f>`);
				if (!showChangePasswordForm.value) {
					_push(`<div data-v-db45568f>`);
					if (passwordStepError.value) _push(`<p class="login-error" data-v-db45568f>${ssrInterpolate(passwordStepError.value)}</p>`);
					else _push(`<!---->`);
					_push(`<button type="button" class="login-button"${ssrIncludeBooleanAttr(passwordStepLoading.value) ? " disabled" : ""} data-v-db45568f>`);
					if (!passwordStepLoading.value) _push(`<span data-v-db45568f>Continuar con esta contraseña</span>`);
					else _push(`<span data-v-db45568f>Guardando...</span>`);
					if (!passwordStepLoading.value) _push(`<span class="arrow" data-v-db45568f>→</span>`);
					else _push(`<!---->`);
					_push(`</button><div style="${ssrRenderStyle({
						"display": "flex",
						"justify-content": "center",
						"margin-top": "16px"
					})}" data-v-db45568f><button type="button" class="forgot-password"${ssrIncludeBooleanAttr(passwordStepLoading.value) ? " disabled" : ""} data-v-db45568f> Prefiero cambiarla ahora </button></div></div>`);
				} else {
					_push(`<form data-v-db45568f><div class="form-group" data-v-db45568f><label for="new-password" data-v-db45568f>Nueva contraseña</label><div class="input-wrapper" data-v-db45568f><input id="new-password"${ssrRenderAttr("value", newPassword.value)} type="password" placeholder="Ingresa tu nueva contraseña" autocomplete="new-password" required data-v-db45568f></div></div><div class="form-group" data-v-db45568f><label for="new-password-confirmation" data-v-db45568f>Confirma tu nueva contraseña</label><div class="input-wrapper" data-v-db45568f><input id="new-password-confirmation"${ssrRenderAttr("value", newPasswordConfirmation.value)} type="password" placeholder="Repite tu nueva contraseña" autocomplete="new-password" required data-v-db45568f></div></div>`);
					if (passwordStepError.value) _push(`<p class="login-error" data-v-db45568f>${ssrInterpolate(passwordStepError.value)}</p>`);
					else _push(`<!---->`);
					_push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr(passwordStepLoading.value) ? " disabled" : ""} data-v-db45568f>`);
					if (!passwordStepLoading.value) _push(`<span data-v-db45568f>Cambiar y continuar</span>`);
					else _push(`<span data-v-db45568f>Guardando...</span>`);
					if (!passwordStepLoading.value) _push(`<span class="arrow" data-v-db45568f>→</span>`);
					else _push(`<!---->`);
					_push(`</button><div style="${ssrRenderStyle({
						"display": "flex",
						"justify-content": "center",
						"margin-top": "16px"
					})}" data-v-db45568f><button type="button" class="forgot-password"${ssrIncludeBooleanAttr(passwordStepLoading.value) ? " disabled" : ""} data-v-db45568f> Volver </button></div></form>`);
				}
				_push(`</div>`);
			} else _push(`<!---->`);
			if (mfaStep.value) {
				_push(`<form data-v-db45568f><div class="form-group" data-v-db45568f><label for="otp-code" data-v-db45568f>Código de verificación</label><div class="input-wrapper" data-v-db45568f><input id="otp-code"${ssrRenderAttr("value", otpCode.value)} type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="000000" required style="${ssrRenderStyle({
					"padding-left": "16px",
					"letter-spacing": "4px",
					"text-align": "center"
				})}" data-v-db45568f></div></div>`);
				if (otpError.value) _push(`<p class="login-error" data-v-db45568f>${ssrInterpolate(otpError.value)}</p>`);
				else _push(`<!---->`);
				if (resendMessage.value) _push(`<p class="login-error" style="${ssrRenderStyle({
					"background": "#eafaf0",
					"color": "#1e7e42"
				})}" data-v-db45568f>${ssrInterpolate(resendMessage.value)}</p>`);
				else _push(`<!---->`);
				_push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr(otpLoading.value) ? " disabled" : ""} data-v-db45568f>`);
				if (!otpLoading.value) _push(`<span data-v-db45568f>Verificar código</span>`);
				else _push(`<span data-v-db45568f>Verificando...</span>`);
				if (!otpLoading.value) _push(`<span class="arrow" data-v-db45568f>→</span>`);
				else _push(`<!---->`);
				_push(`</button><div style="${ssrRenderStyle({
					"display": "flex",
					"justify-content": "space-between",
					"margin-top": "16px"
				})}" data-v-db45568f><button type="button" class="forgot-password"${ssrIncludeBooleanAttr(resendLoading.value) ? " disabled" : ""} data-v-db45568f>${ssrInterpolate(resendLoading.value ? "Enviando..." : "Reenviar código")}</button><button type="button" class="forgot-password" data-v-db45568f> Volver al inicio de sesión </button></div></form>`);
			} else if (!passwordConfirmStep.value) {
				_push(`<form data-v-db45568f><div class="form-group" data-v-db45568f><label for="username" data-v-db45568f> Usuario </label><div class="input-wrapper" data-v-db45568f><svg class="input-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" data-v-db45568f><path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="1.8" data-v-db45568f></path><path d="M4 7L12 13L20 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-v-db45568f></path></svg><input id="username"${ssrRenderAttr("value", username.value)} type="text" placeholder="usuario" autocomplete="username" required data-v-db45568f></div></div><div class="form-group" data-v-db45568f><div class="password-header" data-v-db45568f><label for="password" data-v-db45568f> Contraseña </label>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/forgot-password",
					class: "forgot-password"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` ¿Olvidaste tu contraseña? `);
						else return [createTextVNode(" ¿Olvidaste tu contraseña? ")];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="input-wrapper" data-v-db45568f><svg class="input-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" data-v-db45568f><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.8" data-v-db45568f></rect><path d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-v-db45568f></path></svg><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} placeholder="Ingresa tu contraseña" autocomplete="current-password" required data-v-db45568f><button type="button" class="show-password" data-v-db45568f>${ssrInterpolate(showPassword.value ? "Ocultar" : "Ver")}</button></div></div><label class="remember" data-v-db45568f><input${ssrIncludeBooleanAttr(Array.isArray(rememberMe.value) ? ssrLooseContain(rememberMe.value, null) : rememberMe.value) ? " checked" : ""} type="checkbox" data-v-db45568f><span data-v-db45568f> Mantener mi sesión iniciada </span></label>`);
				if (errorMessage.value) _push(`<p class="login-error" data-v-db45568f>${ssrInterpolate(errorMessage.value)}</p>`);
				else _push(`<!---->`);
				if (unref(siteKey)) _push(`<div class="turnstile-wrapper" data-v-db45568f><div data-v-db45568f></div></div>`);
				else _push(`<!---->`);
				_push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-db45568f>`);
				if (!loading.value) _push(`<span data-v-db45568f> Iniciar sesión </span>`);
				else _push(`<span data-v-db45568f> Iniciando sesión... </span>`);
				if (!loading.value) _push(`<span class="arrow" data-v-db45568f> → </span>`);
				else _push(`<!---->`);
				_push(`</button></form>`);
			} else _push(`<!---->`);
			_push(`<div class="security" data-v-db45568f><div class="security-icon" data-v-db45568f> ✓ </div><p data-v-db45568f> Tu información está protegida mediante <strong data-v-db45568f>acceso seguro.</strong></p></div><p class="copyright" data-v-db45568f> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Mis Vales. Todos los derechos reservados. </p></div></section></div></main>`);
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
var login_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-db45568f"]]);

export { login_default as default };
//# sourceMappingURL=login-WoGepBRC.mjs.map
