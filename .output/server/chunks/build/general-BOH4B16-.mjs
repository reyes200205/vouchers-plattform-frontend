import { aK as useRoute, aP as useToast, al as useAuth, A as APPROVAL_RESTRICTED_ROLES, j as _sfc_main$2$1, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { d as _sfc_main$7, c as _sfc_main$5, U as UserMenu_default, b as _sfc_main$4, a as _sfc_main$2, _ as _sfc_main, N as NotificationsSlideover_default } from './NotificationsSlideover-BJHjx5iP.mjs';
import { u as useInbox } from './useInbox-CnjwXUfa.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, isRef, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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
import './virtualizer-C3C1uVYu.mjs';
import './DashboardSidebarToggle-BSz-SOza.mjs';
import './useComposing-D1bdBmsI.mjs';
import './useTypeahead-BHsnCgJj.mjs';
import './useFormControl-Ccl-YXSi.mjs';
import './useKbd-rvMsbidG.mjs';
import './VisuallyHiddenInput-CLtAPs7l.mjs';
import './RovingFocusGroup-BOkwwdaM.mjs';
import './esm-CcArdB_U.mjs';
import './isValueEqualOrExist-7w5KNovv.mjs';
import './DropdownMenu-BulCZzh5.mjs';
import './PopperArrow-_ul5NSti.mjs';
import './Kbd-BZbceTrO.mjs';
import './Input-YDRYCqsV.mjs';
import './overlay-BwxO-keY.mjs';
import './Tooltip-DDc2ujKM.mjs';
import './Slideover-BvNkJWJZ.mjs';
import './Modal-BYVE2UCa.mjs';
import './Badge-CfJUAgXt.mjs';
import './useDashboard-D80m6lut.mjs';

//#region app/layouts/general.vue?vue&type=script&setup=true&lang.ts
var general_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "general",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		useToast();
		const config = useRuntimeConfig();
		const version = config.public.version;
		const open = ref(false);
		const { user, roleCode } = useAuth();
		useInbox();
		const inboxCount = ref(0);
		const hasPermission = (permission) => {
			return user.value?.permissions?.includes(permission) ?? false;
		};
		const hasAnyPermission = (permissions) => {
			return permissions.some((p) => hasPermission(p));
		};
		const canViewApprovalsInbox = computed(() => {
			if (!hasPermission("inbox.view")) return false;
			if (config.public.channel === "vpn") return true;
			return !APPROVAL_RESTRICTED_ROLES.includes(roleCode.value ?? "");
		});
		const links = computed(() => {
			const items = [];
			items.push({
				label: "Home",
				icon: "i-lucide-house",
				to: "/general",
				onSelect: () => {
					open.value = false;
				}
			});
			if (canViewApprovalsInbox.value) items.push({
				label: "Bandeja de Aprobaciones",
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
			if (hasAnyPermission(["branches.manage", "branches.view"])) items.push({
				label: "Sucursales",
				icon: "i-lucide-store",
				to: "/general/branches",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("products.view")) items.push({
				label: "Productos y Vales",
				icon: "i-lucide-ticket",
				to: "/general/products",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("categories.view")) items.push({
				label: "Categorías",
				icon: "i-lucide-medal",
				to: "/general/categories",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("vouchers.view")) items.push({
				label: "Vales emitidos",
				icon: "i-lucide-receipt-text",
				to: "/general/vouchers",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("cutoffs.view")) items.push({
				label: "Cortes y Relaciones",
				icon: "i-lucide-scroll-text",
				to: "/general/cutoffs",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("reconciliations.view")) items.push({
				label: "Conciliaciones",
				icon: "i-lucide-hand-coins",
				to: "/general/reconciliations",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("staff.view")) items.push({
				label: "Personal",
				icon: "i-lucide-user-cog",
				to: "/general/staff",
				onSelect: () => {
					open.value = false;
				}
			});
			if (hasPermission("audit-logs.view")) items.push({
				label: "Bitácora",
				icon: "i-lucide-history",
				to: "/general/logs",
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
			const _component_UDashboardGroup = _sfc_main$7;
			const _component_UDashboardSidebar = _sfc_main$5;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UDashboardSearchButton = _sfc_main$4;
			const _component_UNavigationMenu = _sfc_main$2;
			const _component_UserMenu = UserMenu_default;
			const _component_UDashboardSearch = _sfc_main;
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
							ui: { footer: "border-t border-default" }
						}, {
							header: withCtx(({ collapsed }, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2.5 px-2.5 py-1.5"${_scopeId}><div class="flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-ticket",
										class: "size-4"
									}, null, _parent, _scopeId));
									_push(`</div>`);
									if (!collapsed) _push(`<div class="flex flex-col min-w-0"${_scopeId}><span class="font-bold text-sm text-strong truncate leading-none"${_scopeId}>Mis Vales</span><span class="text-[10px] text-dimmed mt-0.5 leading-none"${_scopeId}>v${ssrInterpolate(unref(version))}</span></div>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex items-center gap-2.5 px-2.5 py-1.5" }, [createVNode("div", { class: "flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0" }, [createVNode(_component_UIcon, {
									name: "i-lucide-ticket",
									class: "size-4"
								})]), !collapsed ? (openBlock(), createBlock("div", {
									key: 0,
									class: "flex flex-col min-w-0"
								}, [createVNode("span", { class: "font-bold text-sm text-strong truncate leading-none" }, "Mis Vales"), createVNode("span", { class: "text-[10px] text-dimmed mt-0.5 leading-none" }, "v" + toDisplayString(unref(version)), 1)])) : createCommentVNode("", true)])];
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
							ui: { footer: "border-t border-default" }
						}, {
							header: withCtx(({ collapsed }) => [createVNode("div", { class: "flex items-center gap-2.5 px-2.5 py-1.5" }, [createVNode("div", { class: "flex items-center justify-center size-7 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0" }, [createVNode(_component_UIcon, {
								name: "i-lucide-ticket",
								class: "size-4"
							})]), !collapsed ? (openBlock(), createBlock("div", {
								key: 0,
								class: "flex flex-col min-w-0"
							}, [createVNode("span", { class: "font-bold text-sm text-strong truncate leading-none" }, "Mis Vales"), createVNode("span", { class: "text-[10px] text-dimmed mt-0.5 leading-none" }, "v" + toDisplayString(unref(version)), 1)])) : createCommentVNode("", true)])]),
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
//# sourceMappingURL=general-BOH4B16-.mjs.map
