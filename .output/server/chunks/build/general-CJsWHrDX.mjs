import { aH as useRoute, aM as useToast, h as _sfc_main$7 } from '../virtual/entry.mjs';
import { c as _sfc_main$6, b as _sfc_main$3, U as UserMenu_default, a as _sfc_main$2, _ as _sfc_main$1, N as NotificationsSlideover_default } from './NotificationsSlideover-BPXFFYC1.mjs';
import { _ as _sfc_main$4 } from './DropdownMenu-CcppHibn.mjs';
import { _ as _sfc_main } from './NavigationMenu-BSafFtBL.mjs';
import { u as useAuth } from './useAuth-CB8YlYPz.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, isRef, unref, createVNode, renderSlot, useSSRContext } from 'vue';
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
import 'tailwindcss/colors';
import './fetch-DWk2z6mY.mjs';
import './Kbd-DXBnE17j.mjs';
import './namespaced-CtaDkKU2.mjs';
import '@internationalized/date';
import './useFormControl-qw3ifpFn.mjs';
import './Modal-L6hqfbwX.mjs';
import './overlay-BtFRc-iG.mjs';
import './VisuallyHiddenInput-Sg8ah3kl.mjs';
import './esm-CcArdB_U.mjs';
import './Tooltip-t24qO-gt.mjs';
import './DashboardSidebarToggle-mSaDDhJ_.mjs';
import './Input-BNmQBFRn.mjs';
import './defineShortcuts-D5SVQerE.mjs';
import './useDashboard-COqeLCZP.mjs';
import './isValueEqualOrExist-DzHRXt8V.mjs';
import './Badge-CjbxMF64.mjs';
import './Popover-DXRvsHRP.mjs';

//#region app/components/TeamsMenu.vue?vue&type=script&setup=true&lang.ts
var TeamsMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TeamsMenu",
	__ssrInlineRender: true,
	props: { collapsed: { type: Boolean } },
	setup(__props) {
		const teams = ref([
			{
				label: "Nuxt",
				avatar: {
					src: "https://github.com/nuxt.png",
					alt: "Nuxt"
				}
			},
			{
				label: "NuxtHub",
				avatar: {
					src: "https://github.com/nuxt-hub.png",
					alt: "NuxtHub"
				}
			},
			{
				label: "NuxtLabs",
				avatar: {
					src: "https://github.com/nuxtlabs.png",
					alt: "NuxtLabs"
				}
			}
		]);
		const selectedTeam = ref(teams.value[0]);
		const items = computed(() => {
			return [teams.value.map((team) => ({
				...team,
				onSelect() {
					selectedTeam.value = team;
				}
			})), [{
				label: "Create team",
				icon: "i-lucide-circle-plus"
			}, {
				label: "Manage teams",
				icon: "i-lucide-cog"
			}]];
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDropdownMenu = _sfc_main$4;
			const _component_UButton = _sfc_main$7;
			_push(ssrRenderComponent(_component_UDropdownMenu, mergeProps({
				items: unref(items),
				content: {
					align: "center",
					collisionPadding: 12
				},
				ui: { content: __props.collapsed ? "w-40" : "w-(--reka-dropdown-menu-trigger-width)" }
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, mergeProps({
						...unref(selectedTeam),
						label: __props.collapsed ? void 0 : unref(selectedTeam)?.label,
						trailingIcon: __props.collapsed ? void 0 : "i-lucide-chevrons-up-down"
					}, {
						color: "neutral",
						variant: "ghost",
						block: "",
						square: __props.collapsed,
						class: ["data-[state=open]:bg-elevated", [!__props.collapsed && "py-2"]],
						ui: { trailingIcon: "text-dimmed" }
					}), null, _parent, _scopeId));
					else return [createVNode(_component_UButton, mergeProps({
						...unref(selectedTeam),
						label: __props.collapsed ? void 0 : unref(selectedTeam)?.label,
						trailingIcon: __props.collapsed ? void 0 : "i-lucide-chevrons-up-down"
					}, {
						color: "neutral",
						variant: "ghost",
						block: "",
						square: __props.collapsed,
						class: ["data-[state=open]:bg-elevated", [!__props.collapsed && "py-2"]],
						ui: { trailingIcon: "text-dimmed" }
					}), null, 16, ["square", "class"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/TeamsMenu.vue
var _sfc_setup$1 = TeamsMenu_vue_vue_type_script_setup_true_lang_default.setup;
TeamsMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TeamsMenu.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var TeamsMenu_default = Object.assign(TeamsMenu_vue_vue_type_script_setup_true_lang_default, { __name: "TeamsMenu" });
//#endregion
//#region app/layouts/general.vue?vue&type=script&setup=true&lang.ts
var general_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "general",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		useToast();
		const open = ref(false);
		const { user } = useAuth();
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
				badge: "4",
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
			const _component_UDashboardGroup = _sfc_main$6;
			const _component_UDashboardSidebar = _sfc_main$3;
			const _component_TeamsMenu = TeamsMenu_default;
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
								if (_push) _push(ssrRenderComponent(_component_TeamsMenu, { collapsed }, null, _parent, _scopeId));
								else return [createVNode(_component_TeamsMenu, { collapsed }, null, 8, ["collapsed"])];
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
							header: withCtx(({ collapsed }) => [createVNode(_component_TeamsMenu, { collapsed }, null, 8, ["collapsed"])]),
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
//# sourceMappingURL=general-CJsWHrDX.mjs.map
