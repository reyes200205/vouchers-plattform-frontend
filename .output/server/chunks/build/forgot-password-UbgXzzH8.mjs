import { al as useAuth, aM as useRuntimeConfig, aA as useHead$1, N as NuxtLink } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
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

//#region app/pages/forgot-password/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useAuth();
		const username = ref("");
		const loading = ref(false);
		const errorMessage = ref("");
		const success = ref(false);
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
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "forgot-page" }, _attrs))} data-v-d25a93ff><div class="forgot-card" data-v-d25a93ff><div class="brand-logo" data-v-d25a93ff><div class="logo-icon" data-v-d25a93ff><svg width="22" height="22" viewBox="0 0 24 24" fill="none" data-v-d25a93ff><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="#0D2747" stroke-width="2" data-v-d25a93ff></path><path d="M8 10H16M8 14H13" stroke="#0D2747" stroke-width="2" stroke-linecap="round" data-v-d25a93ff></path></svg></div><span data-v-d25a93ff>MIS VALES</span></div>`);
			if (success.value) {
				_push(`<!--[--><div class="form-header" data-v-d25a93ff><h2 data-v-d25a93ff>Revisa tu correo</h2><p data-v-d25a93ff> Si el usuario existe, enviamos un enlace de recuperación a su correo registrado. Revisa tu bandeja de entrada (y spam); el enlace expira en un rato. </p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/login",
					class: "login-button"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span data-v-d25a93ff${_scopeId}>Volver al inicio de sesión</span><span class="arrow" data-v-d25a93ff${_scopeId}>→</span>`);
						else return [createVNode("span", null, "Volver al inicio de sesión"), createVNode("span", { class: "arrow" }, "→")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			} else {
				_push(`<!--[--><div class="form-header" data-v-d25a93ff><h2 data-v-d25a93ff>¿Olvidaste tu contraseña?</h2><p data-v-d25a93ff> Ingresa tu usuario o correo registrado y te enviaremos un enlace para restablecerla. </p></div><form data-v-d25a93ff><div class="form-group" data-v-d25a93ff><label for="forgot-username" data-v-d25a93ff>Usuario o correo</label><div class="input-wrapper" data-v-d25a93ff><input id="forgot-username"${ssrRenderAttr("value", username.value)} type="text" placeholder="usuario o correo" autocomplete="username" required data-v-d25a93ff></div></div>`);
				if (errorMessage.value) _push(`<p class="forgot-error" data-v-d25a93ff>${ssrInterpolate(errorMessage.value)}</p>`);
				else _push(`<!---->`);
				if (unref(siteKey)) _push(`<div class="turnstile-wrapper" data-v-d25a93ff><div data-v-d25a93ff></div></div>`);
				else _push(`<!---->`);
				_push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-d25a93ff>`);
				if (!loading.value) _push(`<span data-v-d25a93ff>Enviar enlace de recuperación</span>`);
				else _push(`<span data-v-d25a93ff>Enviando...</span>`);
				if (!loading.value) _push(`<span class="arrow" data-v-d25a93ff>→</span>`);
				else _push(`<!---->`);
				_push(`</button><div style="${ssrRenderStyle({
					"display": "flex",
					"justify-content": "center",
					"margin-top": "16px"
				})}" data-v-d25a93ff>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/login",
					class: "back-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Volver al inicio de sesión `);
						else return [createTextVNode(" Volver al inicio de sesión ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></form><!--]-->`);
			}
			_push(`</div></main>`);
		};
	}
});
//#endregion
//#region app/pages/forgot-password/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var forgot_password_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d25a93ff"]]);

export { forgot_password_default as default };
//# sourceMappingURL=forgot-password-UbgXzzH8.mjs.map
