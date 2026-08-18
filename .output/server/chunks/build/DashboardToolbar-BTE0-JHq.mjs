import { al as useComponentProps, ag as useAppConfig, ad as tv, b as Primitive } from '../virtual/entry.mjs';
import { computed, unref, mergeProps, withCtx, renderSlot, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-toolbar.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_toolbar_default = { "slots": {
	"root": "shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]",
	"left": "flex items-center gap-1.5",
	"right": "flex items-center gap-1.5"
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardToolbar.vue
var _sfc_main = {
	__name: "UDashboardToolbar",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		}
	},
	setup(__props) {
		const props = useComponentProps("dashboardToolbar", __props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_toolbar_default,
			...appConfig.ui?.dashboardToolbar || {}
		})());
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push(`<div data-slot="left" class="${ssrRenderClass(ui.value.left({ class: [unref(props).ui?.left] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent, _scopeId);
						_push(`</div><div data-slot="right" class="${ssrRenderClass(ui.value.right({ class: [unref(props).ui?.right] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
						_push(`</div>`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createVNode("div", {
						"data-slot": "left",
						class: ui.value.left({ class: [unref(props).ui?.left] })
					}, [renderSlot(_ctx.$slots, "left")], 2), createVNode("div", {
						"data-slot": "right",
						class: ui.value.right({ class: [unref(props).ui?.right] })
					}, [renderSlot(_ctx.$slots, "right")], 2)])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardToolbar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DashboardToolbar-BTE0-JHq.mjs.map
