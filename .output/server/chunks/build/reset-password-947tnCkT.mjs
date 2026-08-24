import { al as useAuth, aK as useRoute, N as NuxtLink } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region app/pages/reset-password/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useAuth();
		const route = useRoute();
		const email = ref(typeof route.query.email === "string" ? route.query.email : "");
		const token = ref(typeof route.query.token === "string" ? route.query.token : "");
		const linkInvalid = !email.value || !token.value;
		const password = ref("");
		const passwordConfirmation = ref("");
		const loading = ref(false);
		const errorMessage = ref("");
		const success = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "reset-page" }, _attrs))} data-v-f8d8f968><div class="reset-card" data-v-f8d8f968><div class="brand-logo" data-v-f8d8f968><div class="logo-icon" data-v-f8d8f968><svg width="22" height="22" viewBox="0 0 24 24" fill="none" data-v-f8d8f968><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="#0D2747" stroke-width="2" data-v-f8d8f968></path><path d="M8 10H16M8 14H13" stroke="#0D2747" stroke-width="2" stroke-linecap="round" data-v-f8d8f968></path></svg></div><span data-v-f8d8f968>MIS VALES</span></div>`);
			if (unref(linkInvalid)) {
				_push(`<!--[--><div class="form-header" data-v-f8d8f968><h2 data-v-f8d8f968>Enlace inválido</h2><p data-v-f8d8f968>Este enlace de recuperación no es válido. Solicita uno nuevo desde la pantalla de inicio de sesión.</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/login",
					class: "login-button"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span data-v-f8d8f968${_scopeId}>Ir a iniciar sesión</span><span class="arrow" data-v-f8d8f968${_scopeId}>→</span>`);
						else return [createVNode("span", null, "Ir a iniciar sesión"), createVNode("span", { class: "arrow" }, "→")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			} else if (unref(success)) {
				_push(`<!--[--><div class="form-header" data-v-f8d8f968><h2 data-v-f8d8f968>Contraseña actualizada</h2><p data-v-f8d8f968>Ya puedes iniciar sesión con tu nueva contraseña.</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/login",
					class: "login-button"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span data-v-f8d8f968${_scopeId}>Ir a iniciar sesión</span><span class="arrow" data-v-f8d8f968${_scopeId}>→</span>`);
						else return [createVNode("span", null, "Ir a iniciar sesión"), createVNode("span", { class: "arrow" }, "→")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			} else {
				_push(`<!--[--><div class="form-header" data-v-f8d8f968><h2 data-v-f8d8f968>Restablece tu contraseña</h2><p data-v-f8d8f968>Elige una nueva contraseña para tu cuenta.</p></div><form data-v-f8d8f968><div class="form-group" data-v-f8d8f968><label for="new-password" data-v-f8d8f968>Nueva contraseña</label><div class="input-wrapper" data-v-f8d8f968><input id="new-password"${ssrRenderAttr("value", unref(password))} type="password" placeholder="Mínimo 8 caracteres" autocomplete="new-password" minlength="8" required data-v-f8d8f968></div></div><div class="form-group" data-v-f8d8f968><label for="new-password-confirmation" data-v-f8d8f968>Confirma tu nueva contraseña</label><div class="input-wrapper" data-v-f8d8f968><input id="new-password-confirmation"${ssrRenderAttr("value", unref(passwordConfirmation))} type="password" placeholder="Repite tu nueva contraseña" autocomplete="new-password" minlength="8" required data-v-f8d8f968></div></div>`);
				if (unref(errorMessage)) _push(`<p class="reset-error" data-v-f8d8f968>${ssrInterpolate(unref(errorMessage))}</p>`);
				else _push(`<!---->`);
				_push(`<button type="submit" class="login-button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-f8d8f968>`);
				if (!unref(loading)) _push(`<span data-v-f8d8f968>Restablecer contraseña</span>`);
				else _push(`<span data-v-f8d8f968>Guardando...</span>`);
				if (!unref(loading)) _push(`<span class="arrow" data-v-f8d8f968>→</span>`);
				else _push(`<!---->`);
				_push(`</button></form><!--]-->`);
			}
			_push(`</div></main>`);
		};
	}
});
//#endregion
//#region app/pages/reset-password/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var reset_password_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f8d8f968"]]);

export { reset_password_default as default };
//# sourceMappingURL=reset-password-947tnCkT.mjs.map
