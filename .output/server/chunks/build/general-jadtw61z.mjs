import { aG as useRoute, aL as useToast, ai as useAuth, g as _sfc_main$2$1 } from '../virtual/entry.mjs';
import { c as _sfc_main$5, b as _sfc_main$3, U as UserMenu_default, a as _sfc_main$2, _ as _sfc_main$1, N as NotificationsSlideover_default } from './NotificationsSlideover-D3WJoG15.mjs';
import { _ as _sfc_main } from './NavigationMenu-MW6KcwVY.mjs';
import { u as useInbox } from './useInbox-DtuZcK1c.mjs';
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

//#region app/layouts/general.vue?vue&type=script&setup=true&lang.ts
var general_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "general",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		useToast();
		const open = ref(false);
		const { user } = useAuth();
		useInbox();
		const inboxCount = ref(0);
		const hasPermission = (permission) => {
			return user.value?.permissions?.includes(permission) ?? false;
		};
		const hasAnyPermission = (permissions) => {
			return permissions.some((p) => hasPermission(p));
		};
		const links = computed(() => {
			const items = [];
			items.push({
				label: "Home",
				icon: "i-lucide-house",
				to: "/general",
				onSelect: () => {
					open.value = false;
				}
			}, {
				label: "Inbox",
				icon: "i-lucide-inbox",
				to: "/general/inbox",
				badge: inboxCount.value > 0 ? String(inboxCount.value) : void 0,
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("customers.view")) items.push({
				label: "Clientes",
				icon: "i-lucide-users",
				to: "/general/customers",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("branches.manage")) items.push({
				label: "Sucursales",
				icon: "i-lucide-store",
				to: "/general/branches",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasAnyPermission(["branch-settings.view", "point-settings.view"])) items.push({
				label: "Configuración",
				to: "/general/settings",
				icon: "i-lucide-settings",
				defaultOpen: true,
				type: "trigger",
				children: [
					{
						label: "General",
						to: "/general/settings",
						exact: true,
						onSelect: () => {
							open.value = false;
						}
					},
					{
						label: "Miembros",
						to: "/general/settings/members",
						onSelect: () => {
							open.value = false;
						}
					},
					{
						label: "Notificaciones",
						to: "/general/settings/notifications",
						onSelect: () => {
							open.value = false;
						}
					},
					{
						label: "Seguridad",
						to: "/general/settings/security",
						onSelect: () => {
							open.value = false;
						}
					}
				]
			});
			return [items];
		});
		const groups = computed(() => [{
			id: "links",
			label: "Go to",
			items: links.value.flat()
		}, {
			id: "code",
			label: "Code",
			items: [{
				id: "source",
				label: "View page source",
				icon: "i-simple-icons-github",
				to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === "/" ? "/index" : route.path}.vue`,
				target: "_blank"
			}]
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
							id: "default",
							open: unref(open),
							"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
							collapsible: "",
							resizable: "",
							class: "bg-elevated/25",
							ui: { footer: "lg:border-t lg:border-default" }
						}, {
							header: withCtx(({ collapsed }, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2.5 px-2.5 py-1.5"${_scopeId}><div class="flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-ticket",
										class: "size-4"
									}, null, _parent, _scopeId));
									_push(`</div>`);
									if (!collapsed) _push(`<span class="font-bold text-sm text-strong truncate"${_scopeId}>Mis Vales</span>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2.5 px-2.5 py-1.5" }, [createVNode("div", { class: "flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0" }, [createVNode(_component_UIcon, {
									name: "i-lucide-ticket",
									class: "size-4"
								})]), !collapsed ? (openBlock(), createBlock("span", {
									key: 0,
									class: "font-bold text-sm text-strong truncate"
								}, "Mis Vales")) : createCommentVNode("", true)])];
							}),
							default: withCtx(({ collapsed }, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UDashboardSearchButton, {
										collapsed,
										class: "bg-transparent ring-default"
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UNavigationMenu, {
										collapsed,
										items: unref(links)[0],
										orientation: "vertical",
										tooltip: "",
										popover: ""
									}, null, _parent, _scopeId));
								} else return [createVNode(_component_UDashboardSearchButton, {
									collapsed,
									class: "bg-transparent ring-default"
								}, null, 8, ["collapsed"]), createVNode(_component_UNavigationMenu, {
									collapsed,
									items: unref(links)[0],
									orientation: "vertical",
									tooltip: "",
									popover: ""
								}, null, 8, ["collapsed", "items"])];
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
							id: "default",
							open: unref(open),
							"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
							collapsible: "",
							resizable: "",
							class: "bg-elevated/25",
							ui: { footer: "lg:border-t lg:border-default" }
						}, {
							header: withCtx(({ collapsed }) => [createVNode("div", { class: "flex items-center gap-2.5 px-2.5 py-1.5" }, [createVNode("div", { class: "flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0" }, [createVNode(_component_UIcon, {
								name: "i-lucide-ticket",
								class: "size-4"
							})]), !collapsed ? (openBlock(), createBlock("span", {
								key: 0,
								class: "font-bold text-sm text-strong truncate"
							}, "Mis Vales")) : createCommentVNode("", true)])]),
							default: withCtx(({ collapsed }) => [createVNode(_component_UDashboardSearchButton, {
								collapsed,
								class: "bg-transparent ring-default"
							}, null, 8, ["collapsed"]), createVNode(_component_UNavigationMenu, {
								collapsed,
								items: unref(links)[0],
								orientation: "vertical",
								tooltip: "",
								popover: ""
							}, null, 8, ["collapsed", "items"])]),
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
//#region app/layouts/general.vue
var _sfc_setup = general_vue_vue_type_script_setup_true_lang_default.setup;
general_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/general.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var general_default = general_vue_vue_type_script_setup_true_lang_default;

export { general_default as default };
//# sourceMappingURL=general-jadtw61z.mjs.map
