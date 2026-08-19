import { _ as _sfc_main$4 } from './NavigationMenu-D1sIOeTf.mjs';
import { a1 as page_default } from '../virtual/entry.mjs';
import { b as _sfc_main$2, a as _sfc_main$1, _ as _sfc_main } from './DashboardSidebarCollapse-CLHbm061.mjs';
import { _ as _sfc_main$3 } from './DashboardToolbar-BTE0-JHq.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import './PopperArrow-Cwqi64q5.mjs';
import './isValueEqualOrExist-B3YcscFO.mjs';
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
import './namespaced-DaSSdVt2.mjs';
import './useComposing-D1bdBmsI.mjs';
import './useTypeahead-5rnQiHGw.mjs';
import './Kbd-CHYMLSD7.mjs';
import './RovingFocusGroup-orB_74SG.mjs';
import './Tooltip-h5hgSInC.mjs';
import './overlay-BtFRc-iG.mjs';
import './Badge-B12zNpDE.mjs';
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
import './DashboardSidebarToggle-IFhAhKZv.mjs';

//#region app/pages/general/settings.vue?vue&type=script&setup=true&lang.ts
var settings_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "settings",
	__ssrInlineRender: true,
	setup(__props) {
		const links = [[
			{
				label: "General",
				icon: "i-lucide-user",
				to: "/general/settings",
				exact: true
			},
			{
				label: "Notifications",
				icon: "i-lucide-bell",
				to: "/general/settings/notifications"
			},
			{
				label: "Security",
				icon: "i-lucide-shield",
				to: "/general/settings/security"
			}
		], [{
			label: "Documentation",
			icon: "i-lucide-book-open",
			to: "https://ui.nuxt.com/docs/getting-started/installation/nuxt",
			target: "_blank"
		}]];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UDashboardSidebarCollapse = _sfc_main;
			const _component_UDashboardToolbar = _sfc_main$3;
			const _component_UNavigationMenu = _sfc_main$4;
			const _component_NuxtPage = page_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({
				id: "settings",
				ui: { body: "py-12" }
			}, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Settings" }, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
								else return [createVNode(_component_UDashboardSidebarCollapse)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UDashboardToolbar, null, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UNavigationMenu, {
									items: links,
									highlight: "",
									class: "-mx-1 flex-1"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UNavigationMenu, {
									items: links,
									highlight: "",
									class: "-mx-1 flex-1"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UDashboardNavbar, { title: "Settings" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						_: 1
					}), createVNode(_component_UDashboardToolbar, null, {
						default: withCtx(() => [createVNode(_component_UNavigationMenu, {
							items: links,
							highlight: "",
							class: "-mx-1 flex-1"
						})]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col gap-12 w-full max-w-2xl mx-auto"${_scopeId}>`);
						_push(ssrRenderComponent(_component_NuxtPage, null, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col gap-12 w-full max-w-2xl mx-auto" }, [createVNode(_component_NuxtPage)])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/settings.vue
var _sfc_setup = settings_vue_vue_type_script_setup_true_lang_default.setup;
settings_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/settings.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var settings_default = settings_vue_vue_type_script_setup_true_lang_default;

export { settings_default as default };
//# sourceMappingURL=settings-X6GFzzST.mjs.map
