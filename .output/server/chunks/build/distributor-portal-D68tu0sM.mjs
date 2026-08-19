import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderSlot } from 'vue/server-renderer';

//#region app/layouts/distributor-portal.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/distributor-portal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var distributor_portal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-23abeeb3"]]);

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-D68tu0sM.mjs.map
