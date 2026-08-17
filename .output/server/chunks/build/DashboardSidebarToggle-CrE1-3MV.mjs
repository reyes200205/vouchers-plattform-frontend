import { l as createContext, az as useLocale, ap as useCookie, aL as useStorage, ao as useComponentProps, ax as useForwardProps, a6 as reactiveOmit, ai as useAppConfig, af as tv, h as _sfc_main$7, b as Primitive } from '../virtual/entry.mjs';
import { ref, computed, isRef, unref, watch, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/utils/dashboard.js
var [useDashboard, provideDashboardContext] = createContext("DashboardGroup");
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/composables/useResizable.js
function useResizable(key, options = {}, { collapsed = ref(false) } = {}) {
	const el = ref(null);
	const opts = computed(() => ({
		side: "left",
		minSize: 0,
		maxSize: 100,
		defaultSize: 0,
		storage: "cookie",
		persistent: true,
		collapsible: false,
		collapsedSize: 0,
		resizable: true,
		unit: "%",
		...isRef(options) ? options.value : options
	}));
	const { dir } = useLocale();
	const defaultStorageValue = {
		size: opts.value.defaultSize,
		collapsed: unref(collapsed) ?? false
	};
	const storageData = opts.value.persistent && (opts.value.resizable || opts.value.collapsible) ? opts.value.storage === "cookie" ? useCookie(key, {
		...opts.value.storageOptions,
		default: () => defaultStorageValue
	}) : useStorage(key, defaultStorageValue, void 0, opts.value.storageOptions) : ref(defaultStorageValue);
	const writeStorage = (patch) => {
		if (storageData.value) Object.assign(storageData.value, patch);
		else storageData.value = {
			...defaultStorageValue,
			...patch
		};
	};
	const isCollapsed = computed({
		get: () => storageData.value?.collapsed ?? defaultStorageValue.collapsed,
		set: (value) => {
			if (!opts.value.collapsible) return;
			if (isRef(collapsed)) collapsed.value = value;
			writeStorage({ collapsed: value });
		}
	});
	const previousSize = ref(opts.value.defaultSize);
	const size = computed({
		get: () => storageData.value?.size ?? opts.value.defaultSize,
		set: (value) => {
			writeStorage({ size: value });
		}
	});
	const currentSize = computed(() => isCollapsed.value ? opts.value.collapsedSize : size.value);
	const isDragging = ref(false);
	const getRootFontSize = () => opts.value.unit === "rem" ? Number.parseFloat(getComputedStyle((void 0).documentElement).fontSize) : 1;
	const resize = (clientX, initialPos, initialSize, rootFontSize) => {
		if (!el.value || !opts.value.resizable) return;
		const parentSize = el.value.parentElement?.offsetWidth || 1;
		const isRtl = dir.value === "rtl";
		let delta;
		if (isRtl) delta = opts.value.side === "left" ? initialPos - clientX : clientX - initialPos;
		else delta = opts.value.side === "left" ? clientX - initialPos : initialPos - clientX;
		const newSize = initialSize + delta;
		let newValue;
		if (opts.value.unit === "rem") newValue = newSize / rootFontSize;
		else if (opts.value.unit === "px") newValue = newSize;
		else newValue = newSize / parentSize * 100;
		if (opts.value.collapsible && newValue < opts.value.collapsedSize + 4) {
			collapse(true);
			return;
		} else if (isCollapsed.value) collapse(false);
		size.value = Math.min(opts.value.maxSize, Math.max(opts.value.minSize, newValue));
	};
	const onMouseDown = (e) => {
		if (!el.value || !opts.value.resizable) return;
		e.preventDefault();
		e.stopPropagation();
		const elWidth = el.value.getBoundingClientRect().width;
		if (!elWidth) return;
		const initialX = e.clientX;
		const initialWidth = elWidth;
		const rootFontSize = getRootFontSize();
		isDragging.value = true;
		const handleMouseMove = (e2) => {
			resize(e2.clientX, initialX, initialWidth, rootFontSize);
		};
		const handleMouseUp = () => {
			isDragging.value = false;
			(void 0).removeEventListener("mousemove", handleMouseMove);
			(void 0).removeEventListener("mouseup", handleMouseUp);
		};
		(void 0).addEventListener("mousemove", handleMouseMove);
		(void 0).addEventListener("mouseup", handleMouseUp);
	};
	const onTouchStart = (e) => {
		if (!el.value || !opts.value.resizable || !e.touches[0]) return;
		e.preventDefault();
		e.stopPropagation();
		const elWidth = el.value.getBoundingClientRect().width;
		if (!elWidth) return;
		const initialX = e.touches[0].clientX;
		const initialWidth = elWidth;
		const rootFontSize = getRootFontSize();
		isDragging.value = true;
		const handleTouchMove = (e2) => {
			if (e2.touches[0]) resize(e2.touches[0].clientX, initialX, initialWidth, rootFontSize);
		};
		const handleTouchEnd = () => {
			isDragging.value = false;
			(void 0).removeEventListener("touchmove", handleTouchMove);
			(void 0).removeEventListener("touchend", handleTouchEnd);
			(void 0).removeEventListener("touchcancel", handleTouchEnd);
		};
		(void 0).addEventListener("touchmove", handleTouchMove, { passive: false });
		(void 0).addEventListener("touchend", handleTouchEnd);
		(void 0).addEventListener("touchcancel", handleTouchEnd);
	};
	const onDoubleClick = (e) => {
		if (!el.value || !opts.value.resizable) return;
		e.preventDefault();
		e.stopPropagation();
		if (isCollapsed.value) collapse(false);
		size.value = opts.value.defaultSize;
	};
	const collapse = (value) => {
		if (!opts.value.collapsible) return;
		const newCollapsed = value ?? !isCollapsed.value;
		if (newCollapsed && !isCollapsed.value) previousSize.value = size.value;
		else if (!newCollapsed && isCollapsed.value) size.value = previousSize.value;
		isCollapsed.value = newCollapsed;
	};
	if (isRef(collapsed) && storageData.value?.collapsed) collapsed.value = storageData.value.collapsed;
	if (isRef(collapsed)) watch(collapsed, (value) => {
		if (!opts.value.collapsible) return;
		if (storageData.value?.collapsed !== value) isCollapsed.value = value;
	});
	return {
		el,
		size: currentSize,
		isDragging,
		isCollapsed,
		onMouseDown,
		onTouchStart,
		onDoubleClick,
		collapse
	};
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-resize-handle.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_resize_handle_default = { "base": "hidden lg:block touch-none select-none cursor-ew-resize relative before:absolute before:inset-y-0 before:-left-1.5 before:-right-1.5 before:z-1" };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardResizeHandle.vue
var _sfc_main$1 = {
	__name: "UDashboardResizeHandle",
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
		const props = useComponentProps("dashboardResizeHandle", __props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_resize_handle_default,
			...appConfig.ui?.dashboardResizeHandle || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				role: "separator",
				class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardResizeHandle.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-sidebar-toggle.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_toggle_default = {
	"base": "lg:hidden",
	"variants": { "side": {
		"left": "",
		"right": ""
	} }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarToggle.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UDashboardSidebarToggle",
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
		const props = useComponentProps("dashboardSidebarToggle", __props);
		const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const { sidebarOpen, toggleSidebar } = useDashboard({
			sidebarOpen: ref(false),
			toggleSidebar: () => {}
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_toggle_default,
			...appConfig.ui?.dashboardSidebarToggle || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$7, mergeProps({
				...unref(buttonProps),
				"icon": unref(props).icon || (unref(sidebarOpen) ? unref(appConfig).ui.icons.close : unref(appConfig).ui.icons.menu),
				"aria-label": unref(sidebarOpen) ? unref(t)("dashboardSidebarToggle.close") : unref(t)("dashboardSidebarToggle.open"),
				..._ctx.$attrs
			}, {
				class: ui.value({
					class: [unref(props).ui?.base, unref(props).class],
					side: unref(props).side
				}),
				onClick: unref(toggleSidebar)
			}, _attrs), null, _parent));
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarToggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a, useResizable as b, provideDashboardContext as p, useDashboard as u };
//# sourceMappingURL=DashboardSidebarToggle-CrE1-3MV.mjs.map
