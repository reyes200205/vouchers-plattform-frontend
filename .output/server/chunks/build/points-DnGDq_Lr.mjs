import { al as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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

//#region app/pages/distributor-portal/points/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { user } = useAuth();
		const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "puntos-container" }, _attrs))} data-v-a7f97f6b><header class="top-navbar" data-v-a7f97f6b><h1 class="nav-title" data-v-a7f97f6b>Mis Puntos</h1></header><div class="content-body" data-v-a7f97f6b><div class="points-card" data-v-a7f97f6b><div class="points-header" data-v-a7f97f6b><span class="star-icon" data-v-a7f97f6b>⭐</span><span class="points-label" data-v-a7f97f6b>Puntos Acumulados</span></div><h2 class="points-amount" data-v-a7f97f6b>${ssrInterpolate(currentPoints.value.toLocaleString("es-MX"))}</h2><p class="points-sub" data-v-a7f97f6b>Sigue emitiendo vales al corriente para acumular más puntos.</p></div><section class="benefits-section" data-v-a7f97f6b><h3 class="section-title" data-v-a7f97f6b>Beneficios del programa</h3><div class="benefit-item" data-v-a7f97f6b><span class="benefit-icon" data-v-a7f97f6b>🎁</span><div data-v-a7f97f6b><h4 class="benefit-title" data-v-a7f97f6b>Canje por saldo</h4><p class="benefit-desc" data-v-a7f97f6b>Próximamente podrás canjear tus puntos por saldo en crédito.</p></div></div><div class="benefit-item" data-v-a7f97f6b><span class="benefit-icon" data-v-a7f97f6b>🏆</span><div data-v-a7f97f6b><h4 class="benefit-title" data-v-a7f97f6b>Sube de Nivel</h4><p class="benefit-desc" data-v-a7f97f6b>Suma puntos para aumentar tu categoría y límite de crédito.</p></div></div></section></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/points/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/points/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var points_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a7f97f6b"]]);

export { points_default as default };
//# sourceMappingURL=points-DnGDq_Lr.mjs.map
