import { an as useComponentProps, ah as useAppConfig, ae as tv, o as createReusableTemplate, b as Primitive, g as _sfc_main$2$1, aw as useForwardProps, a5 as reactiveOmit, ay as useLocale, h as _sfc_main$7 } from '../virtual/entry.mjs';
import { u as useDashboard, b as useResizable, a as _sfc_main$1$1, _ as _sfc_main$3 } from './DashboardSidebarToggle-IFhAhKZv.mjs';
import { useId, toRef, computed, mergeProps, unref, useSlots, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-panel.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_panel_default = {
	"slots": {
		"root": "relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-default shrink-0",
		"body": "flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6",
		"handle": ""
	},
	"variants": { "size": {
		"true": { "root": "w-full lg:w-(--width)" },
		"false": { "root": "flex-1" }
	} }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardPanel.vue
var _sfc_main$2 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UDashboardPanel",
	__ssrInlineRender: true,
	props: {
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		minSize: {
			type: Number,
			required: false,
			default: 15
		},
		maxSize: {
			type: Number,
			required: false
		},
		defaultSize: {
			type: Number,
			required: false
		},
		resizable: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup(__props) {
		const props = useComponentProps("dashboardPanel", __props);
		const appConfig = useAppConfig();
		const dashboardContext = useDashboard({
			storageKey: "dashboard",
			unit: "%"
		});
		const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`;
		const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({
			...dashboardContext,
			...props
		})));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_panel_default,
			...appConfig.ui?.dashboardPanel || {}
		})({ size: !!size.value }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[--><div${ssrRenderAttrs(mergeProps({
				id,
				ref_key: "el",
				ref: el,
				"data-slot": "root"
			}, _ctx.$attrs, {
				"data-dragging": unref(isDragging),
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
				style: [unref(size) ? { "--width": `${unref(size)}${unref(dashboardContext).unit}` } : void 0]
			}))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, () => {
				ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
				_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}">`);
				ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent);
				_push(`</div>`);
				ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
			}, _push, _parent);
			_push(`</div>`);
			ssrRenderSlot(_ctx.$slots, "resize-handle", {
				onMouseDown: unref(onMouseDown),
				onTouchStart: unref(onTouchStart),
				onDoubleClick: unref(onDoubleClick)
			}, () => {
				if (unref(props).resizable) _push(ssrRenderComponent(_sfc_main$1$1, {
					"aria-controls": id,
					"data-slot": "handle",
					class: ui.value.handle({ class: unref(props).ui?.handle }),
					onMousedown: unref(onMouseDown),
					onTouchstart: unref(onTouchStart),
					onDblclick: unref(onDoubleClick)
				}, null, _parent));
				else _push(`<!---->`);
			}, _push, _parent);
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardPanel.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-navbar.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_navbar_default = {
	"slots": {
		"root": "h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5",
		"left": "flex items-center gap-1.5 min-w-0",
		"icon": "shrink-0 size-5 self-center me-1.5",
		"title": "flex items-center gap-1.5 font-semibold text-highlighted truncate",
		"center": "hidden lg:flex",
		"right": "flex items-center shrink-0 gap-1.5",
		"toggle": ""
	},
	"variants": { "toggleSide": {
		"left": { "toggle": "" },
		"right": { "toggle": "" }
	} }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardNavbar.vue
var _sfc_main$1 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UDashboardNavbar",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		toggle: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		toggleSide: {
			type: String,
			required: false,
			default: "left"
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
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("dashboardNavbar", _props);
		const appConfig = useAppConfig();
		const dashboardContext = useDashboard({});
		const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_navbar_default,
			...appConfig.ui?.dashboardNavbar || {}
		})());
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineToggleTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "toggle", {
						...unref(dashboardContext),
						ui: ui.value
					}, () => {
						if (unref(props).toggle) _push(ssrRenderComponent(_sfc_main$3, mergeProps(typeof unref(props).toggle === "object" ? unref(props).toggle : {}, {
							side: unref(props).toggleSide,
							"data-slot": "toggle",
							class: ui.value.toggle({
								class: unref(props).ui?.toggle,
								toggleSide: unref(props).toggleSide
							})
						}), null, _parent, _scopeId));
						else _push(`<!---->`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "toggle", {
						...unref(dashboardContext),
						ui: ui.value
					}, () => [unref(props).toggle ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 0 }, typeof unref(props).toggle === "object" ? unref(props).toggle : {}, {
						side: unref(props).toggleSide,
						"data-slot": "toggle",
						class: ui.value.toggle({
							class: unref(props).ui?.toggle,
							toggleSide: unref(props).toggleSide
						})
					}), null, 16, ["side", "class"])) : createCommentVNode("", true)])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": "root"
			}, _ctx.$attrs, { class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }) }), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="left" class="${ssrRenderClass(ui.value.left({ class: unref(props).ui?.left }))}"${_scopeId}>`);
						if (unref(props).toggleSide === "left") _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
						else _push(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "left", unref(dashboardContext), () => {
							ssrRenderSlot(_ctx.$slots, "leading", {
								...unref(dashboardContext),
								ui: ui.value
							}, () => {
								if (unref(props).icon) _push(ssrRenderComponent(_sfc_main$2$1, {
									name: unref(props).icon,
									"data-slot": "icon",
									class: ui.value.icon({ class: unref(props).ui?.icon })
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`<h1 data-slot="title" class="${ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "title", {}, () => {
								_push(`${ssrInterpolate(unref(props).title)}`);
							}, _push, _parent, _scopeId);
							_push(`</h1>`);
							ssrRenderSlot(_ctx.$slots, "trailing", {
								...unref(dashboardContext),
								ui: ui.value
							}, null, _push, _parent, _scopeId);
						}, _push, _parent, _scopeId);
						_push(`</div>`);
						if (!!slots.default) {
							_push(`<div data-slot="center" class="${ssrRenderClass(ui.value.center({ class: unref(props).ui?.center }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "default", unref(dashboardContext), null, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<div data-slot="right" class="${ssrRenderClass(ui.value.right({ class: unref(props).ui?.right }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "right", unref(dashboardContext), null, _push, _parent, _scopeId);
						if (unref(props).toggleSide === "right") _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [
						createVNode("div", {
							"data-slot": "left",
							class: ui.value.left({ class: unref(props).ui?.left })
						}, [unref(props).toggleSide === "left" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true), renderSlot(_ctx.$slots, "left", unref(dashboardContext), () => [
							renderSlot(_ctx.$slots, "leading", {
								...unref(dashboardContext),
								ui: ui.value
							}, () => [unref(props).icon ? (openBlock(), createBlock(_sfc_main$2$1, {
								key: 0,
								name: unref(props).icon,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, 8, ["name", "class"])) : createCommentVNode("", true)]),
							createVNode("h1", {
								"data-slot": "title",
								class: ui.value.title({ class: unref(props).ui?.title })
							}, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])], 2),
							renderSlot(_ctx.$slots, "trailing", {
								...unref(dashboardContext),
								ui: ui.value
							})
						])], 2),
						!!slots.default ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "center",
							class: ui.value.center({ class: unref(props).ui?.center })
						}, [renderSlot(_ctx.$slots, "default", unref(dashboardContext))], 2)) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "right",
							class: ui.value.right({ class: unref(props).ui?.right })
						}, [renderSlot(_ctx.$slots, "right", unref(dashboardContext)), unref(props).toggleSide === "right" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true)], 2)
					];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardNavbar.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-sidebar-collapse.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_collapse_default = {
	"base": "hidden lg:flex",
	"variants": { "side": {
		"left": "",
		"right": ""
	} }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarCollapse.vue
var _sfc_main = {
	__name: "UDashboardSidebarCollapse",
	__ssrInlineRender: true,
	props: {
		color: {
			type: null,
			required: false,
			default: "neutral"
		},
		variant: {
			type: null,
			required: false,
			default: "ghost"
		},
		side: {
			type: String,
			required: false,
			default: "left"
		},
		ui: {
			type: Object,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		activeColor: {
			type: null,
			required: false
		},
		activeVariant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		square: {
			type: Boolean,
			required: false
		},
		block: {
			type: Boolean,
			required: false
		},
		loadingAuto: {
			type: Boolean,
			required: false
		},
		onClick: {
			type: [Function, Array],
			required: false
		},
		class: {
			type: null,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		type: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		exactActiveClass: {
			type: String,
			required: false
		},
		viewTransition: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = useComponentProps("dashboardSidebarCollapse", __props);
		const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const { sidebarCollapsed, collapseSidebar } = useDashboard({
			sidebarCollapsed: ref(false),
			collapseSidebar: () => {}
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_collapse_default,
			...appConfig.ui?.dashboardSidebarCollapse || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$7, mergeProps({
				...unref(buttonProps),
				"icon": unref(props).icon || (unref(sidebarCollapsed) ? unref(appConfig).ui.icons.panelOpen : unref(appConfig).ui.icons.panelClose),
				"aria-label": unref(sidebarCollapsed) ? unref(t)("dashboardSidebarCollapse.expand") : unref(t)("dashboardSidebarCollapse.collapse"),
				..._ctx.$attrs
			}, {
				class: ui.value({
					class: [unref(props).ui?.base, unref(props).class],
					side: unref(props).side
				}),
				onClick: ($event) => unref(collapseSidebar)?.(!unref(sidebarCollapsed))
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarCollapse.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a, _sfc_main$2 as b };
//# sourceMappingURL=DashboardSidebarCollapse-CLHbm061.mjs.map
