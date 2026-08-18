import { g as _sfc_main$2$1 } from '../virtual/entry.mjs';
import { c as _sfc_main$5, b as _sfc_main$3, U as UserMenu_default, a as _sfc_main$2, _ as _sfc_main$1, N as NotificationsSlideover_default } from './NotificationsSlideover-D3WJoG15.mjs';
import { _ as _sfc_main } from './NavigationMenu-MW6KcwVY.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, isRef, unref, createVNode, openBlock, createBlock, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
import './fetch-ToU_qul8.mjs';
import './PopperArrow-DMsSsDHm.mjs';
import './useComposing-D1bdBmsI.mjs';
import './DropdownMenu-DlLchN8a.mjs';
import './namespaced-Hkd_Rrez.mjs';
import './utils-C-SN97Al.mjs';
import './useTypeahead-JOpfisYr.mjs';
import './Kbd-CHYMLSD7.mjs';
import './RovingFocusGroup-Dji7OupF.mjs';
import './Input-3L6phQUN.mjs';
import './useFormControl-BySKHRcT.mjs';
import './useKbd-rvMsbidG.mjs';
import './Modal-blGtq3y5.mjs';
import './overlay-BtFRc-iG.mjs';
import './VisuallyHiddenInput-DOPBYbfB.mjs';
import './esm-CcArdB_U.mjs';
import './Tooltip-C_1kPD8x.mjs';
import './DashboardSidebarToggle-BxKXl3gw.mjs';
import './Slideover-w8Wvorju.mjs';
import './Badge-B12zNpDE.mjs';
import './useDashboard-D4HEKIwL.mjs';
import './isValueEqualOrExist-BW-U-ShA.mjs';

//#region app/layouts/distributor-portal.vue?vue&type=script&setup=true&lang.ts
var distributor_portal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "distributor-portal",
	__ssrInlineRender: true,
	setup(__props) {
		const open = ref(false);
		const links = [[
			{
				label: "Portal Distribuidor",
				icon: "i-lucide-layout-dashboard",
				to: "/distributor-portal",
				onSelect: () => {
					open.value = false;
				}
			},
			{
				label: "Mis Pedidos",
				icon: "i-lucide-shopping-bag",
				to: "/distributor-portal/orders",
				onSelect: () => {
					open.value = false;
				}
			},
			{
				label: "Catálogo",
				icon: "i-lucide-book-open",
				to: "/distributor-portal/products",
				onSelect: () => {
					open.value = false;
				}
			},
			{
				label: "Mis Clientes",
				icon: "i-lucide-users",
				to: "/distributor-portal/clients",
				onSelect: () => {
					open.value = false;
				}
			}
		], [{
			label: "Volver a General",
			icon: "i-lucide-arrow-left",
			to: "/"
		}]];
		const groups = computed(() => [{
			id: "links",
			label: "Go to",
			items: links.flat()
		}]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardGroup = _sfc_main$5;
			const _component_UDashboardSidebar = _sfc_main$3;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UDashboardSearchButton = _sfc_main$2;
			const _component_UNavigationMenu = _sfc_main;
			const _component_UserMenu = UserMenu_default;
			const _component_UDashboardSearch = _sfc_main$1;
			const _component_NotificationsSlideover = NotificationsSlideover_default;
			_push(ssrRenderComponent(_component_UDashboardGroup, mergeProps({ unit: "rem" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardSidebar, {
							id: "distributor-portal",
							open: unref(open),
							"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
							collapsible: "",
							resizable: "",
							class: "bg-elevated/25",
							ui: { footer: "lg:border-t lg:border-default" }
						}, {
							header: withCtx(({ collapsed }, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2 px-3 py-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-store",
										class: "size-6 text-primary"
									}, null, _parent, _scopeId));
									if (!collapsed) _push(`<span class="font-semibold text-sm"${_scopeId}>Distribuidor</span>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2 px-3 py-2" }, [createVNode(_component_UIcon, {
									name: "i-lucide-store",
									class: "size-6 text-primary"
								}), !collapsed ? (openBlock(), createBlock("span", {
									key: 0,
									class: "font-semibold text-sm"
								}, "Distribuidor")) : createCommentVNode("", true)])];
							}),
							default: withCtx(({ collapsed }, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UDashboardSearchButton, {
										collapsed,
										class: "bg-transparent ring-default"
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UNavigationMenu, {
										collapsed,
										items: links[0],
										orientation: "vertical",
										tooltip: "",
										popover: ""
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UNavigationMenu, {
										collapsed,
										items: links[1],
										orientation: "vertical",
										tooltip: "",
										class: "mt-auto"
									}, null, _parent, _scopeId));
								} else return [
									createVNode(_component_UDashboardSearchButton, {
										collapsed,
										class: "bg-transparent ring-default"
									}, null, 8, ["collapsed"]),
									createVNode(_component_UNavigationMenu, {
										collapsed,
										items: links[0],
										orientation: "vertical",
										tooltip: "",
										popover: ""
									}, null, 8, ["collapsed", "items"]),
									createVNode(_component_UNavigationMenu, {
										collapsed,
										items: links[1],
										orientation: "vertical",
										tooltip: "",
										class: "mt-auto"
									}, null, 8, ["collapsed", "items"])
								];
							}),
							footer: withCtx(({ collapsed }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UserMenu, { collapsed }, null, _parent, _scopeId));
								else return [createVNode(_component_UserMenu, { collapsed }, null, 8, ["collapsed"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UDashboardSearch, { groups: unref(groups) }, null, _parent, _scopeId));
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						_push(ssrRenderComponent(_component_NotificationsSlideover, null, null, _parent, _scopeId));
					} else return [
						createVNode(_component_UDashboardSidebar, {
							id: "distributor-portal",
							open: unref(open),
							"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
							collapsible: "",
							resizable: "",
							class: "bg-elevated/25",
							ui: { footer: "lg:border-t lg:border-default" }
						}, {
							header: withCtx(({ collapsed }) => [createVNode("div", { class: "flex items-center gap-2 px-3 py-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-store",
								class: "size-6 text-primary"
							}), !collapsed ? (openBlock(), createBlock("span", {
								key: 0,
								class: "font-semibold text-sm"
							}, "Distribuidor")) : createCommentVNode("", true)])]),
							default: withCtx(({ collapsed }) => [
								createVNode(_component_UDashboardSearchButton, {
									collapsed,
									class: "bg-transparent ring-default"
								}, null, 8, ["collapsed"]),
								createVNode(_component_UNavigationMenu, {
									collapsed,
									items: links[0],
									orientation: "vertical",
									tooltip: "",
									popover: ""
								}, null, 8, ["collapsed", "items"]),
								createVNode(_component_UNavigationMenu, {
									collapsed,
									items: links[1],
									orientation: "vertical",
									tooltip: "",
									class: "mt-auto"
								}, null, 8, ["collapsed", "items"])
							]),
							footer: withCtx(({ collapsed }) => [createVNode(_component_UserMenu, { collapsed }, null, 8, ["collapsed"])]),
							_: 1
						}, 8, ["open", "onUpdate:open"]),
						createVNode(_component_UDashboardSearch, { groups: unref(groups) }, null, 8, ["groups"]),
						renderSlot(_ctx.$slots, "default"),
						createVNode(_component_NotificationsSlideover)
					];
				}),
				_: 3
			}, _parent));
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
var distributor_portal_default = distributor_portal_vue_vue_type_script_setup_true_lang_default;

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-CEQtaQKW.mjs.map
