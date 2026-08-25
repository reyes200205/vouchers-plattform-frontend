import { aK as useRoute } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { House, Users, FileText, Coins } from 'lucide-vue-next';
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

//#region app/layouts/distributor-portal.vue?vue&type=script&setup=true&lang.ts
var distributor_portal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "distributor-portal",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const currentRoute = computed(() => route.path);
		const isInicioActive = computed(() => currentRoute.value === "/distributor-portal" || currentRoute.value === "/distributor-portal/");
		const isClientesActive = computed(() => currentRoute.value.startsWith("/distributor-portal/clientes") || currentRoute.value.startsWith("/distributor-portal/vales") || currentRoute.value.startsWith("/distributor-portal/configure_vale"));
		const isEstadoCuentaActive = computed(() => currentRoute.value.startsWith("/distributor-portal/estado-cuenta") || currentRoute.value.startsWith("/distributor-portal/collection-relationship"));
		const isPuntosActive = computed(() => currentRoute.value.startsWith("/distributor-portal/points"));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "layout-shell" }, _attrs))} data-v-46b88581><div class="layout-wrapper" data-v-46b88581><div class="page-content" data-v-46b88581>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div><nav class="bottom-nav" data-v-46b88581><button type="button" class="${ssrRenderClass([{ active: isInicioActive.value }, "nav-item"])}" data-v-46b88581><span class="nav-icon-wrap" data-v-46b88581>`);
			_push(ssrRenderComponent(unref(House), { size: 20 }, null, _parent));
			_push(`</span><span class="nav-label" data-v-46b88581>Inicio</span></button><button type="button" class="${ssrRenderClass([{ active: isClientesActive.value }, "nav-item"])}" data-v-46b88581><span class="nav-icon-wrap" data-v-46b88581>`);
			_push(ssrRenderComponent(unref(Users), { size: 20 }, null, _parent));
			_push(`</span><span class="nav-label" data-v-46b88581>Clientes</span></button><button type="button" class="${ssrRenderClass([{ active: isEstadoCuentaActive.value }, "nav-item"])}" data-v-46b88581><span class="nav-icon-wrap" data-v-46b88581>`);
			_push(ssrRenderComponent(unref(FileText), { size: 20 }, null, _parent));
			_push(`</span><span class="nav-label" data-v-46b88581>Estado Cuenta</span></button><button type="button" class="${ssrRenderClass([{ active: isPuntosActive.value }, "nav-item"])}" data-v-46b88581><span class="nav-icon-wrap" data-v-46b88581>`);
			_push(ssrRenderComponent(unref(Coins), { size: 20 }, null, _parent));
			_push(`</span><span class="nav-label" data-v-46b88581>Puntos</span></button></nav></div></div>`);
		};
	}
});
//#endregion
//#region app/layouts/distributor-portal.vue
var _sfc_setup = distributor_portal_vue_vue_type_script_setup_true_lang_default.setup;
distributor_portal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/distributor-portal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var distributor_portal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(distributor_portal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-46b88581"]]);

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-B1qg40ik.mjs.map
