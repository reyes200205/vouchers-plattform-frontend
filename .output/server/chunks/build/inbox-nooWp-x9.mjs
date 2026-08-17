import { aj as useBreakpoints, g as _sfc_main$2$1, C as ClientOnly, an as useComponentProps, ah as useAppConfig, aw as useForwardProps, a6 as reactivePick, ae as tv, J as get, i as _sfc_main$8, av as useForwardExpose, aN as useVModel, b as Primitive, aG as useResizeObserver, P as Presence_default, j as _sfc_main$9, aM as useToast, h as _sfc_main$7, l as createContext, az as useMounted, k as breakpointsTailwind } from '../virtual/entry.mjs';
import { u as useFetch } from './fetch-hxcMBlxm.mjs';
import { u as useDirection, g as useId$1 } from './Kbd-xfdjYSZT.mjs';
import { f as RovingFocusGroup_default } from './namespaced-B-LWrTBo.mjs';
import { _ as _sfc_main$6 } from './DropdownMenu-BGkLR3t5.mjs';
import { R as RovingFocusItem_default } from './RovingFocusItem-D2qi9W1d.mjs';
import { _ as _sfc_main$5 } from './Tooltip-BI5myhCR.mjs';
import { _ as _sfc_main$3 } from './Badge-ClJo_FRE.mjs';
import { d as defineShortcuts } from './defineShortcuts-D22QZdNF.mjs';
import { b as _sfc_main$2, a as _sfc_main$1, _ as _sfc_main$4 } from './DashboardSidebarCollapse-sUUZuiM3.mjs';
import { _ as _sfc_main$a } from './Card-D9iXI0cP.mjs';
import { _ as _sfc_main$b } from './Textarea-DYd1P8s0.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, withCtx, createVNode, useSlots, unref, mergeProps, renderSlot, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList, toRefs, shallowRef, watchPostEffect, withKeys, withModifiers, normalizeStyle, useModel, mergeModels, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { isToday, format } from 'date-fns';
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
import '@internationalized/date';
import './Input-C5Kau4MB.mjs';
import './DashboardSidebarToggle-C2mEGm3P.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsRoot.js
var [injectTabsRootContext, provideTabsRootContext] = /*#__PURE__*/ createContext("TabsRoot");
var TabsRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TabsRoot",
	props: {
		defaultValue: {
			type: null,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: false
		},
		activationMode: {
			type: String,
			required: false,
			default: "automatic"
		},
		modelValue: {
			type: null,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { orientation, unmountOnHide, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		useForwardExpose();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const tabsList = ref();
		const contentIds = shallowRef(/* @__PURE__ */ new Set());
		provideTabsRootContext({
			modelValue,
			changeModelValue: (value) => {
				modelValue.value = value;
			},
			orientation,
			dir,
			unmountOnHide,
			activationMode: props.activationMode,
			baseId: useId$1(void 0, "reka-tabs"),
			tabsList,
			contentIds,
			registerContent: (value) => {
				contentIds.value = /* @__PURE__ */ new Set([...contentIds.value, value]);
			},
			unregisterContent: (value) => {
				const newSet = new Set(contentIds.value);
				newSet.delete(value);
				contentIds.value = newSet;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				dir: unref(dir),
				"data-orientation": unref(orientation),
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"dir",
				"data-orientation",
				"as-child",
				"as"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/utils.js
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var TabsContent_default = /* @__PURE__ */ defineComponent({
	__name: "TabsContent",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
		const isSelected = computed(() => props.value === rootContext.modelValue.value);
		const isMountAnimationPreventedRef = ref(isSelected.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				present: _ctx.forceMount || isSelected.value,
				"force-mount": ""
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), {
					id: contentId.value,
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					role: "tabpanel",
					"data-state": isSelected.value ? "active" : "inactive",
					"data-orientation": unref(rootContext).orientation.value,
					"aria-labelledby": triggerId.value,
					hidden: !present,
					tabindex: "0",
					style: normalizeStyle({ animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0 })
				}, {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1032, [
					"id",
					"as-child",
					"as",
					"data-state",
					"data-orientation",
					"aria-labelledby",
					"hidden",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsIndicator.js
var TabsIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "TabsIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props, { expose: __expose }) {
		const props = __props;
		const context = injectTabsRootContext();
		__expose({ updateIndicatorStyle });
		useForwardExpose();
		const isMounted = useMounted();
		const indicatorStyle = ref({
			size: null,
			thickness: null,
			position: null
		});
		const tabs = ref([]);
		watch(() => [context.modelValue.value, context?.dir.value], () => {
			updateIndicatorStyle();
		}, {
			immediate: true,
			flush: "post"
		});
		watchPostEffect(() => {
			tabs.value = Array.from(context.tabsList.value?.querySelectorAll("[role=\"tab\"]") || []);
		});
		useResizeObserver(computed(() => [context.tabsList.value, ...tabs.value]), updateIndicatorStyle);
		function updateIndicatorStyle() {
			const activeTab = context.tabsList.value?.querySelector("[role=\"tab\"][data-state=\"active\"]");
			if (!activeTab) return;
			if (context.orientation.value === "horizontal") indicatorStyle.value = {
				size: activeTab.offsetWidth,
				thickness: activeTab.offsetHeight,
				position: activeTab.offsetLeft
			};
			else indicatorStyle.value = {
				size: activeTab.offsetHeight,
				thickness: activeTab.offsetWidth,
				position: activeTab.offsetTop
			};
		}
		return (_ctx, _cache) => {
			return unref(isMounted) && typeof indicatorStyle.value.size === "number" ? (openBlock(), createBlock(unref(Primitive), mergeProps({ key: 0 }, props, { style: {
				"--reka-tabs-indicator-size": `${indicatorStyle.value.size}px`,
				"--reka-tabs-indicator-thickness": `${indicatorStyle.value.thickness}px`,
				"--reka-tabs-indicator-position": `${indicatorStyle.value.position}px`
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["style"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsList.js
var TabsList_default = /* @__PURE__ */ defineComponent({
	__name: "TabsList",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { loop } = toRefs(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const context = injectTabsRootContext();
		context.tabsList = currentElement;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				"as-child": "",
				orientation: unref(context).orientation.value,
				dir: unref(context).dir.value,
				loop: unref(loop)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "tablist",
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"aria-orientation": unref(context).orientation.value
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"aria-orientation"
				])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsTrigger.js
var TabsTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "TabsTrigger",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = computed(() => rootContext.contentIds.value.has(props.value) ? makeContentId(rootContext.baseId, props.value) : void 0);
		const isSelected = computed(() => props.value === rootContext.modelValue.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				"as-child": "",
				focusable: !_ctx.disabled,
				active: isSelected.value
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: triggerId.value,
					ref: unref(forwardRef),
					role: "tab",
					type: _ctx.as === "button" ? "button" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value ? "true" : "false",
					"aria-controls": contentId.value,
					"data-state": isSelected.value ? "active" : "inactive",
					disabled: _ctx.disabled,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-orientation": unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (!_ctx.disabled && event.ctrlKey === false) unref(rootContext).changeModelValue(_ctx.value);
						else event.preventDefault();
					}, ["left"])),
					onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
					onFocus: _cache[2] || (_cache[2] = () => {
						const isAutomaticActivation = unref(rootContext).activationMode !== "manual";
						if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) unref(rootContext).changeModelValue(_ctx.value);
					})
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as",
					"as-child",
					"aria-selected",
					"aria-controls",
					"data-state",
					"disabled",
					"data-disabled",
					"data-orientation"
				])]),
				_: 3
			}, 8, ["focusable", "active"]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Ftabs.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftabs_default = {
	"slots": {
		"root": "flex items-center gap-2",
		"list": "relative flex p-1 group",
		"indicator": "absolute transition-[translate,width] duration-200",
		"trigger": ["group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leadingIcon": "shrink-0",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"label": "truncate",
		"trailingBadge": "shrink-0",
		"trailingBadgeSize": "sm",
		"content": "w-full rounded-md focus-visible:outline-3"
	},
	"variants": {
		"color": {
			"primary": { "content": "outline-primary/25" },
			"secondary": { "content": "outline-secondary/25" },
			"success": { "content": "outline-success/25" },
			"info": { "content": "outline-info/25" },
			"warning": { "content": "outline-warning/25" },
			"error": { "content": "outline-error/25" },
			"neutral": { "content": "outline-inverted/25" }
		},
		"variant": {
			"pill": {
				"list": "bg-elevated rounded-lg",
				"trigger": ["grow", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:content-[''] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:absolute in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:inset-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:rounded-md in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:shadow-xs in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:-z-10 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:isolate"],
				"indicator": "rounded-md shadow-xs"
			},
			"link": {
				"list": "border-default",
				"indicator": "rounded-full",
				"trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:content-[''] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:absolute in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:rounded-full"
			}
		},
		"orientation": {
			"horizontal": {
				"root": "flex-col",
				"list": "w-full",
				"indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
				"trigger": "justify-center"
			},
			"vertical": {
				"list": "flex-col",
				"indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
			}
		},
		"size": {
			"xs": {
				"trigger": "px-2 py-1 text-xs gap-1",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs"
			},
			"sm": {
				"trigger": "px-2.5 py-1.5 text-xs gap-1.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs"
			},
			"md": {
				"trigger": "px-3 py-1.5 text-sm gap-1.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs"
			},
			"lg": {
				"trigger": "px-3 py-2 text-sm gap-2",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs"
			},
			"xl": {
				"trigger": "px-3 py-2 text-base gap-2",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs"
			}
		}
	},
	"compoundVariants": [
		{
			"orientation": "horizontal",
			"variant": "pill",
			"class": { "indicator": "inset-y-1" }
		},
		{
			"orientation": "horizontal",
			"variant": "link",
			"class": {
				"list": "border-b -mb-px",
				"indicator": "-bottom-px h-px",
				"trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:inset-x-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:-bottom-[calc(var(--spacing)+1px)] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:h-px"
			}
		},
		{
			"orientation": "vertical",
			"variant": "pill",
			"class": {
				"indicator": "inset-x-1",
				"list": "items-center",
				"trigger": "w-full justify-center"
			}
		},
		{
			"orientation": "vertical",
			"variant": "link",
			"class": {
				"list": "border-s -ms-px",
				"indicator": "-start-px w-px",
				"trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:inset-y-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:-start-[calc(var(--spacing)+1px)] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:w-px"
			}
		},
		{
			"color": "primary",
			"variant": "pill",
			"class": {
				"indicator": "bg-primary",
				"trigger": ["data-[state=active]:text-inverted outline-primary/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-primary"]
			}
		},
		{
			"color": "secondary",
			"variant": "pill",
			"class": {
				"indicator": "bg-secondary",
				"trigger": ["data-[state=active]:text-inverted outline-secondary/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-secondary"]
			}
		},
		{
			"color": "success",
			"variant": "pill",
			"class": {
				"indicator": "bg-success",
				"trigger": ["data-[state=active]:text-inverted outline-success/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-success"]
			}
		},
		{
			"color": "info",
			"variant": "pill",
			"class": {
				"indicator": "bg-info",
				"trigger": ["data-[state=active]:text-inverted outline-info/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-info"]
			}
		},
		{
			"color": "warning",
			"variant": "pill",
			"class": {
				"indicator": "bg-warning",
				"trigger": ["data-[state=active]:text-inverted outline-warning/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-warning"]
			}
		},
		{
			"color": "error",
			"variant": "pill",
			"class": {
				"indicator": "bg-error",
				"trigger": ["data-[state=active]:text-inverted outline-error/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-error"]
			}
		},
		{
			"color": "neutral",
			"variant": "pill",
			"class": {
				"indicator": "bg-inverted",
				"trigger": ["data-[state=active]:text-inverted outline-inverted/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-inverted"]
			}
		},
		{
			"color": "primary",
			"variant": "link",
			"class": {
				"indicator": "bg-primary",
				"trigger": ["data-[state=active]:text-primary outline-primary/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-primary"]
			}
		},
		{
			"color": "secondary",
			"variant": "link",
			"class": {
				"indicator": "bg-secondary",
				"trigger": ["data-[state=active]:text-secondary outline-secondary/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-secondary"]
			}
		},
		{
			"color": "success",
			"variant": "link",
			"class": {
				"indicator": "bg-success",
				"trigger": ["data-[state=active]:text-success outline-success/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-success"]
			}
		},
		{
			"color": "info",
			"variant": "link",
			"class": {
				"indicator": "bg-info",
				"trigger": ["data-[state=active]:text-info outline-info/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-info"]
			}
		},
		{
			"color": "warning",
			"variant": "link",
			"class": {
				"indicator": "bg-warning",
				"trigger": ["data-[state=active]:text-warning outline-warning/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-warning"]
			}
		},
		{
			"color": "error",
			"variant": "link",
			"class": {
				"indicator": "bg-error",
				"trigger": ["data-[state=active]:text-error outline-error/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-error"]
			}
		},
		{
			"color": "neutral",
			"variant": "link",
			"class": {
				"indicator": "bg-inverted",
				"trigger": ["data-[state=active]:text-highlighted outline-inverted/25 focus-visible:outline-3", "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-inverted"]
			}
		}
	],
	"defaultVariants": {
		"color": "primary",
		"variant": "pill",
		"size": "md"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue
var _sfc_main = {
	__name: "UTabs",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		content: {
			type: Boolean,
			required: false,
			default: true
		},
		valueKey: {
			type: null,
			required: false,
			default: "value"
		},
		labelKey: {
			type: null,
			required: false,
			default: "label"
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		defaultValue: {
			type: [String, Number],
			required: false,
			default: "0"
		},
		modelValue: {
			type: [String, Number],
			required: false
		},
		activationMode: {
			type: String,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("tabs", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "unmountOnHide"), emits);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftabs_default,
			...appConfig.ui?.tabs || {}
		})({
			color: props.color,
			variant: props.variant,
			size: props.size,
			orientation: props.orientation
		}));
		const triggersRef = ref([]);
		function setTriggerRef(index, el) {
			triggersRef.value[index] = el;
		}
		__expose({ triggersRef });
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TabsRoot_default), mergeProps(unref(rootProps), {
				"model-value": unref(props).modelValue,
				"default-value": unref(props).defaultValue,
				orientation: unref(props).orientation,
				"activation-mode": unref(props).activationMode,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(TabsList_default), {
							"data-slot": "list",
							class: ui.value.list({ class: unref(props).ui?.list })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(unref(TabsIndicator_default), {
										"data-slot": "indicator",
										class: ui.value.indicator({ class: unref(props).ui?.indicator })
									}, null, _parent, _scopeId));
									ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push, _parent, _scopeId);
									_push(`<!--[-->`);
									ssrRenderList(unref(props).items, (item, index) => {
										_push(ssrRenderComponent(unref(TabsTrigger_default), {
											key: unref(get)(item, unref(props).valueKey) ?? index,
											ref_for: true,
											ref: (el) => setTriggerRef(index, el),
											value: unref(get)(item, unref(props).valueKey) ?? String(index),
											disabled: item.disabled,
											"data-slot": "trigger",
											class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger] })
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													ssrRenderSlot(_ctx.$slots, "leading", {
														item,
														index,
														ui: ui.value
													}, () => {
														if (item.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
															name: item.icon,
															"data-slot": "leadingIcon",
															class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
														}, null, _parent, _scopeId));
														else if (item.avatar) _push(ssrRenderComponent(_sfc_main$8, mergeProps({ size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize() }, { ref_for: true }, item.avatar, {
															"data-slot": "leadingAvatar",
															class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
														}), null, _parent, _scopeId));
														else _push(`<!---->`);
													}, _push, _parent, _scopeId);
													if (unref(get)(item, unref(props).labelKey) || !!slots.default) {
														_push(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "default", {
															item,
															index
														}, () => {
															_push(`${ssrInterpolate(unref(get)(item, unref(props).labelKey))}`);
														}, _push, _parent, _scopeId);
														_push(`</span>`);
													} else _push(`<!---->`);
													ssrRenderSlot(_ctx.$slots, "trailing", {
														item,
														index,
														ui: ui.value
													}, () => {
														if (item.badge || item.badge === 0) _push(ssrRenderComponent(_sfc_main$3, mergeProps({
															color: "neutral",
															variant: "outline",
															size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
														}, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
															"data-slot": "trailingBadge",
															class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
														}), null, _parent, _scopeId));
														else _push(`<!---->`);
													}, _push, _parent, _scopeId);
												} else return [
													renderSlot(_ctx.$slots, "leading", {
														item,
														index,
														ui: ui.value
													}, () => [item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
														key: 0,
														name: item.icon,
														"data-slot": "leadingIcon",
														class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
													}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
														key: 1,
														size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
													}, { ref_for: true }, item.avatar, {
														"data-slot": "leadingAvatar",
														class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
													}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
													unref(get)(item, unref(props).labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
														key: 0,
														"data-slot": "label",
														class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
													}, [renderSlot(_ctx.$slots, "default", {
														item,
														index
													}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)])], 2)) : createCommentVNode("", true),
													renderSlot(_ctx.$slots, "trailing", {
														item,
														index,
														ui: ui.value
													}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
														key: 0,
														color: "neutral",
														variant: "outline",
														size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
													}, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
														"data-slot": "trailingBadge",
														class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
													}), null, 16, ["size", "class"])) : createCommentVNode("", true)])
												];
											}),
											_: 2
										}, _parent, _scopeId));
									});
									_push(`<!--]-->`);
									ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push, _parent, _scopeId);
								} else return [
									createVNode(unref(TabsIndicator_default), {
										"data-slot": "indicator",
										class: ui.value.indicator({ class: unref(props).ui?.indicator })
									}, null, 8, ["class"]),
									renderSlot(_ctx.$slots, "list-leading"),
									(openBlock(true), createBlock(Fragment, null, renderList(unref(props).items, (item, index) => {
										return openBlock(), createBlock(unref(TabsTrigger_default), {
											key: unref(get)(item, unref(props).valueKey) ?? index,
											ref_for: true,
											ref: (el) => setTriggerRef(index, el),
											value: unref(get)(item, unref(props).valueKey) ?? String(index),
											disabled: item.disabled,
											"data-slot": "trigger",
											class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger] })
										}, {
											default: withCtx(() => [
												renderSlot(_ctx.$slots, "leading", {
													item,
													index,
													ui: ui.value
												}, () => [item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
													key: 0,
													name: item.icon,
													"data-slot": "leadingIcon",
													class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
												}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
													key: 1,
													size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
												}, { ref_for: true }, item.avatar, {
													"data-slot": "leadingAvatar",
													class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
												}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
												unref(get)(item, unref(props).labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
													key: 0,
													"data-slot": "label",
													class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
												}, [renderSlot(_ctx.$slots, "default", {
													item,
													index
												}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)])], 2)) : createCommentVNode("", true),
												renderSlot(_ctx.$slots, "trailing", {
													item,
													index,
													ui: ui.value
												}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
													key: 0,
													color: "neutral",
													variant: "outline",
													size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
												}, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
													"data-slot": "trailingBadge",
													class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
												}), null, 16, ["size", "class"])) : createCommentVNode("", true)])
											]),
											_: 2
										}, 1032, [
											"value",
											"disabled",
											"class"
										]);
									}), 128)),
									renderSlot(_ctx.$slots, "list-trailing")
								];
							}),
							_: 3
						}, _parent, _scopeId));
						if (!!unref(props).content) {
							_push(`<!--[-->`);
							ssrRenderList(unref(props).items, (item, index) => {
								_push(ssrRenderComponent(unref(TabsContent_default), {
									key: unref(get)(item, unref(props).valueKey) ?? index,
									value: unref(get)(item, unref(props).valueKey) ?? String(index),
									"data-slot": "content",
									class: ui.value.content({ class: [
										unref(props).ui?.content,
										item.ui?.content,
										item.class
									] })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, item.slot || "content", {
											item,
											index,
											ui: ui.value
										}, () => {
											_push(`${ssrInterpolate(item.content)}`);
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, item.slot || "content", {
											item,
											index,
											ui: ui.value
										}, () => [createTextVNode(toDisplayString(item.content), 1)])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]-->`);
						} else _push(`<!---->`);
					} else return [createVNode(unref(TabsList_default), {
						"data-slot": "list",
						class: ui.value.list({ class: unref(props).ui?.list })
					}, {
						default: withCtx(() => [
							createVNode(unref(TabsIndicator_default), {
								"data-slot": "indicator",
								class: ui.value.indicator({ class: unref(props).ui?.indicator })
							}, null, 8, ["class"]),
							renderSlot(_ctx.$slots, "list-leading"),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(props).items, (item, index) => {
								return openBlock(), createBlock(unref(TabsTrigger_default), {
									key: unref(get)(item, unref(props).valueKey) ?? index,
									ref_for: true,
									ref: (el) => setTriggerRef(index, el),
									value: unref(get)(item, unref(props).valueKey) ?? String(index),
									disabled: item.disabled,
									"data-slot": "trigger",
									class: ui.value.trigger({ class: [unref(props).ui?.trigger, item.ui?.trigger] })
								}, {
									default: withCtx(() => [
										renderSlot(_ctx.$slots, "leading", {
											item,
											index,
											ui: ui.value
										}, () => [item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
											key: 0,
											name: item.icon,
											"data-slot": "leadingIcon",
											class: ui.value.leadingIcon({ class: [unref(props).ui?.leadingIcon, item.ui?.leadingIcon] })
										}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
											key: 1,
											size: item.ui?.leadingAvatarSize || unref(props).ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
										}, { ref_for: true }, item.avatar, {
											"data-slot": "leadingAvatar",
											class: ui.value.leadingAvatar({ class: [unref(props).ui?.leadingAvatar, item.ui?.leadingAvatar] })
										}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
										unref(get)(item, unref(props).labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "label",
											class: ui.value.label({ class: [unref(props).ui?.label, item.ui?.label] })
										}, [renderSlot(_ctx.$slots, "default", {
											item,
											index
										}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)])], 2)) : createCommentVNode("", true),
										renderSlot(_ctx.$slots, "trailing", {
											item,
											index,
											ui: ui.value
										}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$3, mergeProps({
											key: 0,
											color: "neutral",
											variant: "outline",
											size: item.ui?.trailingBadgeSize || unref(props).ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
										}, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
											"data-slot": "trailingBadge",
											class: ui.value.trailingBadge({ class: [unref(props).ui?.trailingBadge, item.ui?.trailingBadge] })
										}), null, 16, ["size", "class"])) : createCommentVNode("", true)])
									]),
									_: 2
								}, 1032, [
									"value",
									"disabled",
									"class"
								]);
							}), 128)),
							renderSlot(_ctx.$slots, "list-trailing")
						]),
						_: 3
					}, 8, ["class"]), !!unref(props).content ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(props).items, (item, index) => {
						return openBlock(), createBlock(unref(TabsContent_default), {
							key: unref(get)(item, unref(props).valueKey) ?? index,
							value: unref(get)(item, unref(props).valueKey) ?? String(index),
							"data-slot": "content",
							class: ui.value.content({ class: [
								unref(props).ui?.content,
								item.ui?.content,
								item.class
							] })
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "content", {
								item,
								index,
								ui: ui.value
							}, () => [createTextVNode(toDisplayString(item.content), 1)])]),
							_: 2
						}, 1032, ["value", "class"]);
					}), 128)) : createCommentVNode("", true)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$3 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region app/components/inbox/InboxList.vue?vue&type=script&setup=true&lang.ts
var InboxList_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InboxList",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ mails: {} }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const mailsRefs = ref({});
		const selectedMail = useModel(__props, "modelValue");
		watch(selectedMail, () => {
			if (!selectedMail.value) return;
			const ref = mailsRefs.value[selectedMail.value.id];
			if (ref) ref.scrollIntoView({ block: "nearest" });
		});
		defineShortcuts({
			arrowdown: () => {
				const index = props.mails.findIndex((mail) => mail.id === selectedMail.value?.id);
				if (index === -1) selectedMail.value = props.mails[0];
				else if (index < props.mails.length - 1) selectedMail.value = props.mails[index + 1];
			},
			arrowup: () => {
				const index = props.mails.findIndex((mail) => mail.id === selectedMail.value?.id);
				if (index === -1) selectedMail.value = props.mails[props.mails.length - 1];
				else if (index > 0) selectedMail.value = props.mails[index - 1];
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UChip = _sfc_main$9;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
			ssrRenderList(__props.mails, (mail, index) => {
				_push(`<div><div class="${ssrRenderClass([[mail.unread ? "text-highlighted" : "text-toned", selectedMail.value && selectedMail.value.id === mail.id ? "border-primary bg-primary/10" : "border-bg hover:border-primary hover:bg-primary/5"], "p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"])}"><div class="${ssrRenderClass([[mail.unread && "font-semibold"], "flex items-center justify-between"])}"><div class="flex items-center gap-3">${ssrInterpolate(mail.from.name)} `);
				if (mail.unread) _push(ssrRenderComponent(_component_UChip, null, null, _parent));
				else _push(`<!---->`);
				_push(`</div><span>${ssrInterpolate(unref(isToday)(new Date(mail.date)) ? unref(format)(new Date(mail.date), "HH:mm") : unref(format)(new Date(mail.date), "dd MMM"))}</span></div><p class="${ssrRenderClass([[mail.unread && "font-semibold"], "truncate"])}">${ssrInterpolate(mail.subject)}</p><p class="text-dimmed line-clamp-1">${ssrInterpolate(mail.body)}</p></div></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region app/components/inbox/InboxList.vue
var _sfc_setup$2 = InboxList_vue_vue_type_script_setup_true_lang_default.setup;
InboxList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/InboxList.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var InboxList_default = Object.assign(InboxList_vue_vue_type_script_setup_true_lang_default, { __name: "InboxList" });
//#endregion
//#region app/components/inbox/InboxMail.vue?vue&type=script&setup=true&lang.ts
var InboxMail_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InboxMail",
	__ssrInlineRender: true,
	props: { mail: {} },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emits = __emit;
		const dropdownItems = [[{
			label: "Mark as unread",
			icon: "i-lucide-check-circle"
		}, {
			label: "Mark as important",
			icon: "i-lucide-triangle-alert"
		}], [{
			label: "Star thread",
			icon: "i-lucide-star"
		}, {
			label: "Mute thread",
			icon: "i-lucide-circle-pause"
		}]];
		const toast = useToast();
		const reply = ref("");
		const loading = ref(false);
		function onSubmit() {
			loading.value = true;
			setTimeout(() => {
				reply.value = "";
				toast.add({
					title: "Email sent",
					description: "Your email has been sent successfully",
					icon: "i-lucide-check-circle",
					color: "success"
				});
				loading.value = false;
			}, 1e3);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UButton = _sfc_main$7;
			const _component_UTooltip = _sfc_main$5;
			const _component_UDropdownMenu = _sfc_main$6;
			const _component_UAvatar = _sfc_main$8;
			const _component_UCard = _sfc_main$a;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UTextarea = _sfc_main$b;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "inbox-2" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, {
							title: __props.mail.subject,
							toggle: false
						}, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-x",
									color: "neutral",
									variant: "ghost",
									class: "-ms-1.5",
									onClick: ($event) => emits("close")
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UButton, {
									icon: "i-lucide-x",
									color: "neutral",
									variant: "ghost",
									class: "-ms-1.5",
									onClick: ($event) => emits("close")
								}, null, 8, ["onClick"])];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UTooltip, { text: "Archive" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-inbox",
												color: "neutral",
												variant: "ghost"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-inbox",
												color: "neutral",
												variant: "ghost"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UTooltip, { text: "Reply" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-reply",
												color: "neutral",
												variant: "ghost"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-reply",
												color: "neutral",
												variant: "ghost"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UDropdownMenu, { items: dropdownItems }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-ellipsis-vertical",
												color: "neutral",
												variant: "ghost"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-ellipsis-vertical",
												color: "neutral",
												variant: "ghost"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [
									createVNode(_component_UTooltip, { text: "Archive" }, {
										default: withCtx(() => [createVNode(_component_UButton, {
											icon: "i-lucide-inbox",
											color: "neutral",
											variant: "ghost"
										})]),
										_: 1
									}),
									createVNode(_component_UTooltip, { text: "Reply" }, {
										default: withCtx(() => [createVNode(_component_UButton, {
											icon: "i-lucide-reply",
											color: "neutral",
											variant: "ghost"
										})]),
										_: 1
									}),
									createVNode(_component_UDropdownMenu, { items: dropdownItems }, {
										default: withCtx(() => [createVNode(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost"
										})]),
										_: 1
									})
								];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default"${_scopeId}><div class="flex items-start gap-4 sm:my-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAvatar, mergeProps(__props.mail.from.avatar, {
							alt: __props.mail.from.name,
							size: "3xl"
						}), null, _parent, _scopeId));
						_push(`<div class="min-w-0"${_scopeId}><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(__props.mail.from.name)}</p><p class="text-muted"${_scopeId}>${ssrInterpolate(__props.mail.from.email)}</p></div></div><p class="max-sm:pl-16 text-muted text-sm sm:mt-2"${_scopeId}>${ssrInterpolate(unref(format)(new Date(__props.mail.date), "dd MMM HH:mm"))}</p></div><div class="flex-1 p-4 sm:p-6 overflow-y-auto"${_scopeId}><p class="whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.mail.body)}</p></div><div class="pb-4 px-4 sm:px-6 shrink-0"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, {
							variant: "subtle",
							class: "mt-auto",
							ui: { header: "flex items-center gap-1.5 text-dimmed" }
						}, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-reply",
										class: "size-5"
									}, null, _parent, _scopeId));
									_push(`<span class="text-sm truncate"${_scopeId}> Reply to ${ssrInterpolate(__props.mail.from.name)} (${ssrInterpolate(__props.mail.from.email)}) </span>`);
								} else return [createVNode(_component_UIcon, {
									name: "i-lucide-reply",
									class: "size-5"
								}), createVNode("span", { class: "text-sm truncate" }, " Reply to " + toDisplayString(__props.mail.from.name) + " (" + toDisplayString(__props.mail.from.email) + ") ", 1)];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<form${_scopeId}>`);
									_push(ssrRenderComponent(_component_UTextarea, {
										modelValue: unref(reply),
										"onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null,
										color: "neutral",
										variant: "none",
										required: "",
										autoresize: "",
										placeholder: "Write your reply...",
										rows: 4,
										disabled: unref(loading),
										class: "w-full",
										ui: { base: "p-0 resize-none" }
									}, null, _parent, _scopeId));
									_push(`<div class="flex items-center justify-between"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UTooltip, { text: "Attach file" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												color: "neutral",
												variant: "ghost",
												icon: "i-lucide-paperclip"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												color: "neutral",
												variant: "ghost",
												icon: "i-lucide-paperclip"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`<div class="flex items-center justify-end gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										label: "Save draft"
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UButton, {
										type: "submit",
										color: "neutral",
										loading: unref(loading),
										label: "Send",
										icon: "i-lucide-send"
									}, null, _parent, _scopeId));
									_push(`</div></div></form>`);
								} else return [createVNode("form", { onSubmit: withModifiers(onSubmit, ["prevent"]) }, [createVNode(_component_UTextarea, {
									modelValue: unref(reply),
									"onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null,
									color: "neutral",
									variant: "none",
									required: "",
									autoresize: "",
									placeholder: "Write your reply...",
									rows: 4,
									disabled: unref(loading),
									class: "w-full",
									ui: { base: "p-0 resize-none" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"disabled"
								]), createVNode("div", { class: "flex items-center justify-between" }, [createVNode(_component_UTooltip, { text: "Attach file" }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										icon: "i-lucide-paperclip"
									})]),
									_: 1
								}), createVNode("div", { class: "flex items-center justify-end gap-2" }, [createVNode(_component_UButton, {
									color: "neutral",
									variant: "ghost",
									label: "Save draft"
								}), createVNode(_component_UButton, {
									type: "submit",
									color: "neutral",
									loading: unref(loading),
									label: "Send",
									icon: "i-lucide-send"
								}, null, 8, ["loading"])])])], 32)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode(_component_UDashboardNavbar, {
							title: __props.mail.subject,
							toggle: false
						}, {
							leading: withCtx(() => [createVNode(_component_UButton, {
								icon: "i-lucide-x",
								color: "neutral",
								variant: "ghost",
								class: "-ms-1.5",
								onClick: ($event) => emits("close")
							}, null, 8, ["onClick"])]),
							right: withCtx(() => [
								createVNode(_component_UTooltip, { text: "Archive" }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-inbox",
										color: "neutral",
										variant: "ghost"
									})]),
									_: 1
								}),
								createVNode(_component_UTooltip, { text: "Reply" }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-reply",
										color: "neutral",
										variant: "ghost"
									})]),
									_: 1
								}),
								createVNode(_component_UDropdownMenu, { items: dropdownItems }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-ellipsis-vertical",
										color: "neutral",
										variant: "ghost"
									})]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["title"]),
						createVNode("div", { class: "flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default" }, [createVNode("div", { class: "flex items-start gap-4 sm:my-1.5" }, [createVNode(_component_UAvatar, mergeProps(__props.mail.from.avatar, {
							alt: __props.mail.from.name,
							size: "3xl"
						}), null, 16, ["alt"]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(__props.mail.from.name), 1), createVNode("p", { class: "text-muted" }, toDisplayString(__props.mail.from.email), 1)])]), createVNode("p", { class: "max-sm:pl-16 text-muted text-sm sm:mt-2" }, toDisplayString(unref(format)(new Date(__props.mail.date), "dd MMM HH:mm")), 1)]),
						createVNode("div", { class: "flex-1 p-4 sm:p-6 overflow-y-auto" }, [createVNode("p", { class: "whitespace-pre-wrap" }, toDisplayString(__props.mail.body), 1)]),
						createVNode("div", { class: "pb-4 px-4 sm:px-6 shrink-0" }, [createVNode(_component_UCard, {
							variant: "subtle",
							class: "mt-auto",
							ui: { header: "flex items-center gap-1.5 text-dimmed" }
						}, {
							header: withCtx(() => [createVNode(_component_UIcon, {
								name: "i-lucide-reply",
								class: "size-5"
							}), createVNode("span", { class: "text-sm truncate" }, " Reply to " + toDisplayString(__props.mail.from.name) + " (" + toDisplayString(__props.mail.from.email) + ") ", 1)]),
							default: withCtx(() => [createVNode("form", { onSubmit: withModifiers(onSubmit, ["prevent"]) }, [createVNode(_component_UTextarea, {
								modelValue: unref(reply),
								"onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null,
								color: "neutral",
								variant: "none",
								required: "",
								autoresize: "",
								placeholder: "Write your reply...",
								rows: 4,
								disabled: unref(loading),
								class: "w-full",
								ui: { base: "p-0 resize-none" }
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							]), createVNode("div", { class: "flex items-center justify-between" }, [createVNode(_component_UTooltip, { text: "Attach file" }, {
								default: withCtx(() => [createVNode(_component_UButton, {
									color: "neutral",
									variant: "ghost",
									icon: "i-lucide-paperclip"
								})]),
								_: 1
							}), createVNode("div", { class: "flex items-center justify-end gap-2" }, [createVNode(_component_UButton, {
								color: "neutral",
								variant: "ghost",
								label: "Save draft"
							}), createVNode(_component_UButton, {
								type: "submit",
								color: "neutral",
								loading: unref(loading),
								label: "Send",
								icon: "i-lucide-send"
							}, null, 8, ["loading"])])])], 32)]),
							_: 1
						})])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/inbox/InboxMail.vue
var _sfc_setup$1 = InboxMail_vue_vue_type_script_setup_true_lang_default.setup;
InboxMail_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/InboxMail.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var InboxMail_default = Object.assign(InboxMail_vue_vue_type_script_setup_true_lang_default, { __name: "InboxMail" });
//#endregion
//#region app/pages/general/inbox.vue?vue&type=script&setup=true&lang.ts
var inbox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "inbox",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const tabItems = [{
			label: "All",
			value: "all"
		}, {
			label: "Unread",
			value: "unread"
		}];
		const selectedTab = ref("all");
		const { data: mails } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/mails", { default: () => [] }, "$J24Fiv3ozL")), __temp = await __temp, __restore(), __temp);
		const filteredMails = computed(() => {
			if (selectedTab.value === "unread") return mails.value.filter((mail) => !!mail.unread);
			return mails.value;
		});
		const selectedMail = ref();
		computed({
			get() {
				return !!selectedMail.value;
			},
			set(value) {
				if (!value) selectedMail.value = null;
			}
		});
		watch(filteredMails, () => {
			if (!filteredMails.value.find((mail) => mail.id === selectedMail.value?.id)) selectedMail.value = null;
		});
		useBreakpoints(breakpointsTailwind).smaller("lg");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$4;
			const _component_UBadge = _sfc_main$3;
			const _component_UTabs = _sfc_main;
			const _component_InboxList = InboxList_default;
			const _component_InboxMail = InboxMail_default;
			const _component_UIcon = _sfc_main$2$1;
			const _component_ClientOnly = ClientOnly;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, {
				id: "inbox-1",
				"default-size": 25,
				"min-size": 20,
				"max-size": 30,
				resizable: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Inbox" }, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
								else return [createVNode(_component_UDashboardSidebarCollapse)];
							}),
							trailing: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UBadge, {
									label: filteredMails.value.length,
									variant: "subtle"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UBadge, {
									label: filteredMails.value.length,
									variant: "subtle"
								}, null, 8, ["label"])];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTabs, {
									modelValue: selectedTab.value,
									"onUpdate:modelValue": ($event) => selectedTab.value = $event,
									items: tabItems,
									content: false,
									size: "xs"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UTabs, {
									modelValue: selectedTab.value,
									"onUpdate:modelValue": ($event) => selectedTab.value = $event,
									items: tabItems,
									content: false,
									size: "xs"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_InboxList, {
							modelValue: selectedMail.value,
							"onUpdate:modelValue": ($event) => selectedMail.value = $event,
							mails: filteredMails.value
						}, null, _parent, _scopeId));
					} else return [createVNode(_component_UDashboardNavbar, { title: "Inbox" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						trailing: withCtx(() => [createVNode(_component_UBadge, {
							label: filteredMails.value.length,
							variant: "subtle"
						}, null, 8, ["label"])]),
						right: withCtx(() => [createVNode(_component_UTabs, {
							modelValue: selectedTab.value,
							"onUpdate:modelValue": ($event) => selectedTab.value = $event,
							items: tabItems,
							content: false,
							size: "xs"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						_: 1
					}), createVNode(_component_InboxList, {
						modelValue: selectedMail.value,
						"onUpdate:modelValue": ($event) => selectedMail.value = $event,
						mails: filteredMails.value
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"mails"
					])];
				}),
				_: 1
			}, _parent));
			if (selectedMail.value) _push(ssrRenderComponent(_component_InboxMail, {
				mail: selectedMail.value,
				onClose: ($event) => selectedMail.value = null
			}, null, _parent));
			else {
				_push(`<div class="hidden lg:flex flex-1 items-center justify-center">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-32 text-dimmed"
				}, null, _parent));
				_push(`</div>`);
			}
			_push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/inbox.vue
var _sfc_setup = inbox_vue_vue_type_script_setup_true_lang_default.setup;
inbox_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/inbox.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var inbox_default = inbox_vue_vue_type_script_setup_true_lang_default;

export { inbox_default as default };
//# sourceMappingURL=inbox-nooWp-x9.mjs.map
