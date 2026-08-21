import { ap as useComponentProps, aE as useNuxtApp, aj as useAppConfig, ag as tv, c as Primitive, aK as useRoute, aB as useLocale, q as createReusableTemplate, ay as useForwardProps, a7 as reactiveOmit, f as _sfc_main$b, ad as transformUI, a8 as reactivePick, Y as isArrayOfArray, h as _sfc_main$1$2, k as _sfc_main$2$1, j as _sfc_main$2$2, K as get$1, g as _sfc_main$f, a5 as pickLinkProps, i as _sfc_main$1$3, an as useColorMode, a2 as omit, aG as usePortal, F as FieldGroupReset, V as VisuallyHidden_default, al as useAuth, a1 as navigateTo, ax as useForwardExpose, am as useCollection, a9 as refAutoReset, P as Presence_default, aQ as useVModel, ar as useDebounceFn, au as useEventListener, aJ as useResizeObserver, aa as refDebounced, ab as refThrottled, N as NuxtLink, J as formatTimeAgo, m as createContext, L as getActiveElement, ah as unrefElement, t as defineKeyedFunctionFactory, s as dataDiagnostics, w as fetchDefaults, ak as useAsyncData, aI as useRequestFetch, $ as $fetch$2, _ as __commonJSMin } from '../virtual/entry.mjs';
import { g as getEstimateSize, d as ListboxItem_default, c as ListboxItemIndicator_default, e as ListboxRoot_default, a as ListboxFilter_default, L as ListboxContent_default, f as ListboxVirtualizer_default, b as ListboxGroup_default, i as injectListboxGroupContext } from './virtualizer-C3C1uVYu.mjs';
import { p as provideDashboardContext, l as useDashboard, q as useResizable, _ as _sfc_main$a, d as _sfc_main$1$1, o as useId$1, m as useDirection, D as DismissableLayer_default } from './DashboardSidebarToggle-BSz-SOza.mjs';
import { i as isValueEqualOrExist } from './isValueEqualOrExist-7w5KNovv.mjs';
import { _ as _sfc_main$g, H as HoverCard, P as Popover, u as useArrowNavigation } from './DropdownMenu-BulCZzh5.mjs';
import { u as useForwardPropsEmits } from './PopperArrow-_ul5NSti.mjs';
import { _ as _sfc_main$c } from './Kbd-BZbceTrO.mjs';
import { p as pointerDownOutside, g as DialogTrigger_default, d as DialogPortal_default, f as DialogTitle_default, b as DialogDescription_default, D as DialogClose_default, e as DialogRoot_default, c as DialogOverlay_default, a as DialogContent_default } from './overlay-BwxO-keY.mjs';
import { _ as _sfc_main$d } from './Tooltip-DDc2ujKM.mjs';
import { _ as _sfc_main$9 } from './Slideover-BvNkJWJZ.mjs';
import { _ as _sfc_main$8 } from './Modal-BYVE2UCa.mjs';
import { _ as _sfc_main$e } from './Badge-CfJUAgXt.mjs';
import { _ as _sfc_main$h } from './Input-YDRYCqsV.mjs';
import { d as defineShortcuts, u as useDashboard$1 } from './useDashboard-D80m6lut.mjs';
import { computed, ref, unref, mergeProps, withCtx, renderSlot, useSlots, useModel, useId, toRef, watch, openBlock, createBlock, createCommentVNode, createVNode, mergeModels, createSlots, Fragment, renderList, resolveDynamicComponent, createTextVNode, toDisplayString, useTemplateRef, onScopeDispose, toHandlers, defineComponent, isRef, withKeys, createElementBlock, Teleport, toRefs, watchEffect, nextTick, withAsyncContext, withModifiers, normalizeStyle, createElementVNode, shallowRef, toValue, getCurrentInstance, reactive, useSSRContext } from 'vue';
import { f as defu, t as isEqual } from '../_/nitro.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';

//#region src/index.ts
/**
* Compute the 64-bit FNV-1a hash of a string as two 32-bit lanes.
*
* This is the fast core: no BigInt, no allocations, plain `Math.imul`-free
* 32-bit arithmetic. Prefer {@link fnv1a64Hex} or {@link fnv1a64Base36} for a
* usable key; use this directly only when you want to avoid string formatting.
*
* The hash is computed over UTF-16 code units (`str.charCodeAt(i)`), not UTF-8
* bytes. For ASCII input this matches a canonical FNV-1a-64; for non-ASCII it
* does not. See the README for details.
*
* @param str - The string to hash.
* @returns The `{ high, low }` 32-bit lanes of the 64-bit hash.
*/
function fnv1a64(str) {
	const len = str.length;
	let i = 0;
	let t0 = 0;
	let v0 = 8997;
	let t1 = 0;
	let v1 = 33826;
	let t2 = 0;
	let v2 = 40164;
	let t3 = 0;
	let v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return {
		high: (v3 << 16 | v2) >>> 0,
		low: (v1 << 16 | v0) >>> 0
	};
}
/**
* Compute the 64-bit FNV-1a hash of a string as a `bigint`.
*
* Ergonomic and comparable, at the cost of composing the two lanes into a
* `bigint`. For a compact string key, prefer {@link fnv1a64Base36}.
*
* @param str - The string to hash.
* @returns The 64-bit hash as an unsigned `bigint`.
*/
function fnv1a64BigInt(str) {
	const { high, low } = fnv1a64(str);
	return BigInt(high) << 32n | BigInt(low);
}
const hexDigits = "0123456789abcdef";
/**
* Every byte value rendered as its two hex digits, so a 32-bit lane formats in
* 4 lookups instead of `toString(16)` plus a `padStart`. Leading zeros are
* intrinsic to the table, which is what makes the padding free.
*/
Array.from({ length: 256 }, (_, i) => hexDigits.charAt(i >> 4) + hexDigits.charAt(i & 15));
/**
* Compute the 64-bit FNV-1a hash of a string as a base36 string.
*
* This is the shortest textual form (up to 13 characters) and is ideal for
* cache keys. The length varies with the value; it is not zero-padded. Equal
* inputs always produce identical strings.
*
* @param str - The string to hash.
* @returns A base36 string of the 64-bit hash.
*/
function fnv1a64Base36(str) {
	return fnv1a64BigInt(str).toString(36);
}

function walk(input, seen) {
	if (input === null) return "L";
	let out, i = 0, keys = input, tmp = typeof input;
	if (tmp !== "object") {
		if (tmp === "number") return input - input === 0 ? "n" + input : "L";
		if (tmp === "string") return "s" + input;
		if (tmp === "bigint") return "n" + input;
		if (tmp === "boolean") return input ? "T" : "F";
		return;
	}
	let is_arr = Array.isArray(input);
	if (!is_arr) {
		if (input instanceof Date) return "d" + +input;
		if (input instanceof RegExp) return "r" + input.source + input.flags;
	}
	tmp = seen.indexOf(input);
	if (~tmp) return "~" + (tmp + 1);
	if (typeof input.toJSON === "function" && !ArrayBuffer.isView(input)) {
		input = input.toJSON();
		if (input === null || typeof input !== "object") return walk(input, seen);
		tmp = seen.indexOf(input);
		if (~tmp) return "~" + (tmp + 1);
		is_arr = Array.isArray(input);
	}
	seen.push(keys);
	if (is_arr) {
		for (out = "a"; i < input.length; out += (tmp = walk(input[i++], seen)) === undefined ? "L" : tmp);
	} else if (input instanceof Set) {
		out = "e";
		for (let value of input) out += (tmp = walk(value, seen)) === undefined ? "L" : tmp;
	} else if (input instanceof Map) {
		keys = [...input.keys()];
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) {
			if ((tmp = walk(input.get(keys[i]), seen)) !== undefined) out += keys[i] + tmp;
		}
	} else if (input[Symbol.toStringTag] === undefined || ArrayBuffer.isView(input)) {
		keys = Object.keys(input);
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) {
			if ((tmp = walk(input[keys[i]], seen)) !== undefined) out += keys[i] + tmp;
		}
	} else {
		throw new Error("Unsupported value");
	}
	seen.pop();
	return out;
}
/**
* Canonicalize a value into a stable identity string. Two structurally-equal
* inputs return the same id, regardless of key order.
*
* @example
* ```ts
* identify({ a: 1, b: 2 }) === identify({ b: 2, a: 1 }); // true
* ```
*/
function identify(input) {
	return walk(input, []) ?? "U";
}

//#region node_modules/.pnpm/@vue+shared@3.5.41/node_modules/@vue/shared/dist/shared.cjs.prod.js
/**
* @vue/shared v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var require_shared_cjs_prod = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var objectToString = Object.prototype.toString;
	var toTypeString = (value) => objectToString.call(value);
	var isPlainObject = (val) => toTypeString(val) === "[object Object]";
	exports.isPlainObject = isPlainObject;
}));
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Collapsible/CollapsibleRoot.js
var [injectCollapsibleRootContext, provideCollapsibleRootContext] = /*#__PURE__*/ createContext("CollapsibleRoot");
var CollapsibleRoot_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
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
	emits: ["update:open"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const { disabled, unmountOnHide } = toRefs(props);
		provideCollapsibleRootContext({
			contentId: "",
			disabled,
			open,
			unmountOnHide,
			onOpenToggle: () => {
				if (disabled.value) return;
				open.value = !open.value;
			}
		});
		__expose({ open });
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": props.asChild,
				"data-state": unref(open) ? "open" : "closed",
				"data-disabled": unref(disabled) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Collapsible/CollapsibleContent.js
var CollapsibleContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CollapsibleContent",
	props: {
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
	emits: ["contentFound"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectCollapsibleRootContext();
		rootContext.contentId ||= useId$1(void 0, "reka-collapsible-content");
		const presentRef = ref();
		const { forwardRef, currentElement } = useForwardExpose();
		const width = ref(0);
		const height = ref(0);
		const isOpen = computed(() => rootContext.open.value);
		const isMountAnimationPrevented = ref(isOpen.value);
		const currentStyle = ref();
		watch(() => [isOpen.value, presentRef.value?.present], async () => {
			await nextTick();
			const node = currentElement.value;
			if (!node) return;
			currentStyle.value = currentStyle.value || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			height.value = rect.height;
			width.value = rect.width;
			if (!isMountAnimationPrevented.value) {
				node.style.transitionDuration = currentStyle.value.transitionDuration;
				node.style.animationName = currentStyle.value.animationName;
			}
		}, { immediate: true });
		const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);
		useEventListener(currentElement, "beforematch", (ev) => {
			requestAnimationFrame(() => {
				rootContext.onOpenToggle();
				emits("contentFound");
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				ref_key: "presentRef",
				ref: presentRef,
				present: _ctx.forceMount || unref(rootContext).open.value,
				"force-mount": true
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					id: unref(rootContext).contentId,
					ref: unref(forwardRef),
					"as-child": props.asChild,
					as: _ctx.as,
					hidden: !present ? unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
					"data-state": skipAnimation.value ? void 0 : unref(rootContext).open.value ? "open" : "closed",
					"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
					style: {
						[`--reka-collapsible-content-height`]: `${height.value}px`,
						[`--reka-collapsible-content-width`]: `${width.value}px`
					}
				}), {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1040, [
					"id",
					"as-child",
					"as",
					"hidden",
					"data-state",
					"data-disabled",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Collapsible/CollapsibleTrigger.js
var CollapsibleTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleTrigger",
	props: {
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
		useForwardExpose();
		const rootContext = injectCollapsibleRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				"aria-controls": unref(rootContext).contentId,
				"aria-expanded": unref(rootContext).open.value,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
				disabled: unref(rootContext).disabled?.value,
				onClick: unref(rootContext).onOpenToggle
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child",
				"aria-controls",
				"aria-expanded",
				"data-state",
				"data-disabled",
				"disabled",
				"onClick"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSingleOrMultipleValue.js
/**
* Validates the props and it makes sure that the types are coherent with each other
*
* 1. If type, defaultValue, and modelValue are all undefined, throw an error.
* 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
* 3. If type is defined:
*    a. If type is 'single' and either modelValue or defaultValue is an array, log an error and return 'multiple'.
*    b. If type is 'multiple' and neither modelValue nor defaultValue is an array, log an error and return 'single'.
* 4. Return 'multiple' if modelValue is an array, else return 'single'.
*/
function validateProps({ type, defaultValue, modelValue }) {
	const value = modelValue || defaultValue;
	if (modelValue !== void 0 || defaultValue !== void 0) return Array.isArray(value) ? "multiple" : "single";
	else return type ?? "single";
}
function getDefaultType({ type, defaultValue, modelValue }) {
	if (type) return type;
	return validateProps({
		type,
		defaultValue,
		modelValue
	});
}
function getDefaultValue({ type, defaultValue }) {
	if (defaultValue !== void 0) return defaultValue;
	return type === "single" ? void 0 : [];
}
function useSingleOrMultipleValue(props, emits) {
	const type = computed(() => getDefaultType(props));
	const modelValue = useVModel(props, "modelValue", emits, {
		defaultValue: getDefaultValue(props),
		passive: props.modelValue === void 0,
		deep: true
	});
	function changeModelValue(value) {
		if (type.value === "single") modelValue.value = isEqual(value, modelValue.value) ? void 0 : value;
		else {
			const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
			if (isValueEqualOrExist(modelValueArray, value)) {
				const index = modelValueArray.findIndex((i) => isEqual(i, value));
				modelValueArray.splice(index, 1);
			} else modelValueArray.push(value);
			modelValue.value = modelValueArray;
		}
	}
	return {
		modelValue,
		changeModelValue,
		isSingle: computed(() => type.value === "single")
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Accordion/AccordionRoot.js
var [injectAccordionRootContext, provideAccordionRootContext] = /*#__PURE__*/ createContext("AccordionRoot");
var AccordionRoot_default = /* @__PURE__ */ defineComponent({
	__name: "AccordionRoot",
	props: {
		collapsible: {
			type: Boolean,
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "vertical"
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
		},
		type: {
			type: String,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { dir, disabled, unmountOnHide } = toRefs(props);
		const direction = useDirection(dir);
		const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
		const { forwardRef, currentElement: parentElement } = useForwardExpose();
		provideAccordionRootContext({
			disabled,
			direction,
			orientation: props.orientation,
			parentElement,
			isSingle,
			collapsible: props.collapsible,
			modelValue,
			changeModelValue,
			unmountOnHide
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Accordion/AccordionItem.js
var AccordionItemState = /* @__PURE__ */ function(AccordionItemState$1) {
	AccordionItemState$1["Open"] = "open";
	AccordionItemState$1["Closed"] = "closed";
	return AccordionItemState$1;
}(AccordionItemState || {});
var [injectAccordionItemContext, provideAccordionItemContext] = /*#__PURE__*/ createContext("AccordionItem");
var AccordionItem_default = /* @__PURE__ */ defineComponent({
	__name: "AccordionItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		value: {
			type: String,
			required: true
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: void 0
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
	setup(__props, { expose: __expose }) {
		const props = __props;
		const rootContext = injectAccordionRootContext();
		const open = computed(() => rootContext.isSingle.value ? props.value === rootContext.modelValue.value : Array.isArray(rootContext.modelValue.value) && rootContext.modelValue.value.includes(props.value));
		const disabled = computed(() => {
			return rootContext.disabled.value || props.disabled;
		});
		const dataDisabled = computed(() => disabled.value ? "" : void 0);
		const dataState = computed(() => open.value ? AccordionItemState.Open : AccordionItemState.Closed);
		__expose({
			open,
			dataDisabled
		});
		const { currentRef, currentElement } = useForwardExpose();
		provideAccordionItemContext({
			open,
			dataState,
			disabled,
			dataDisabled,
			triggerId: "",
			currentRef,
			currentElement,
			value: computed(() => props.value)
		});
		function handleArrowKey(e) {
			const target = e.target;
			if (Array.from(rootContext.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []).findIndex((item) => item === target) === -1) return null;
			useArrowNavigation(e, target, rootContext.parentElement.value, {
				arrowKeyOptions: rootContext.orientation,
				dir: rootContext.direction.value,
				focus: true
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollapsibleRoot_default), {
				"data-orientation": unref(rootContext).orientation,
				"data-disabled": dataDisabled.value,
				"data-state": dataState.value,
				disabled: disabled.value,
				open: open.value,
				as: props.as,
				"as-child": props.asChild,
				"unmount-on-hide": props.unmountOnHide ?? unref(rootContext).unmountOnHide.value,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"home",
					"end"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: open.value })]),
				_: 3
			}, 8, [
				"data-orientation",
				"data-disabled",
				"data-state",
				"disabled",
				"open",
				"as",
				"as-child",
				"unmount-on-hide"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Accordion/AccordionContent.js
var AccordionContent_default = /* @__PURE__ */ defineComponent({
	__name: "AccordionContent",
	props: {
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
		const rootContext = injectAccordionRootContext();
		const itemContext = injectAccordionItemContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollapsibleContent_default), {
				role: "region",
				"as-child": props.asChild,
				as: _ctx.as,
				"force-mount": props.forceMount,
				"aria-labelledby": unref(itemContext).triggerId,
				"data-state": unref(itemContext).dataState.value,
				"data-disabled": unref(itemContext).dataDisabled.value,
				"data-orientation": unref(rootContext).orientation,
				style: {
					"--reka-accordion-content-width": "var(--reka-collapsible-content-width)",
					"--reka-accordion-content-height": "var(--reka-collapsible-content-height)"
				},
				onContentFound: _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(unref(itemContext).value.value))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"force-mount",
				"aria-labelledby",
				"data-state",
				"data-disabled",
				"data-orientation"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Accordion/AccordionTrigger.js
var AccordionTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "AccordionTrigger",
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
	setup(__props) {
		const props = __props;
		const rootContext = injectAccordionRootContext();
		const itemContext = injectAccordionItemContext();
		itemContext.triggerId ||= useId$1(void 0, "reka-accordion-trigger");
		function changeItem() {
			const triggerDisabled = rootContext.isSingle.value && itemContext.open.value && !rootContext.collapsible;
			if (itemContext.disabled.value || triggerDisabled) return;
			rootContext.changeModelValue(itemContext.value.value);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollapsibleTrigger_default), {
				id: unref(itemContext).triggerId,
				ref: unref(itemContext).currentRef,
				"data-reka-collection-item": "",
				as: props.as,
				"as-child": props.asChild,
				"aria-disabled": unref(itemContext).disabled.value || void 0,
				"aria-expanded": unref(itemContext).open.value || false,
				"data-disabled": unref(itemContext).dataDisabled.value,
				"data-orientation": unref(rootContext).orientation,
				"data-state": unref(itemContext).dataState.value,
				disabled: unref(itemContext).disabled.value,
				onClick: changeItem
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"as",
				"as-child",
				"aria-disabled",
				"aria-expanded",
				"data-disabled",
				"data-orientation",
				"data-state",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/ListboxGroupLabel.js
var ListboxGroupLabel_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxGroupLabel",
	props: {
		for: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		const groupContext = injectListboxGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/utils.js
function getOpenState(open) {
	return open ? "open" : "closed";
}
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var LINK_SELECT = "navigationMenu.linkSelect";
var EVENT_ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss";
/**
* Returns a list of potential tabbable candidates.
*
* NOTE: This is only a close approximation. For example it doesn't take into account cases like when
* elements are not visible. This cannot be worked out easily by just reading a property, but rather
* necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
*
* See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
* Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
*/
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = (void 0).createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function focusFirst(candidates) {
	const previouslyFocusedElement = getActiveElement();
	return candidates.some((candidate) => {
		if (candidate === previouslyFocusedElement) return true;
		candidate.focus();
		return getActiveElement() !== previouslyFocusedElement;
	});
}
function removeFromTabOrder(candidates) {
	candidates.forEach((candidate) => {
		candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
		candidate.setAttribute("tabindex", "-1");
	});
	return () => {
		candidates.forEach((candidate) => {
			const prevTabIndex = candidate.dataset.tabindex;
			candidate.setAttribute("tabindex", prevTabIndex);
		});
	};
}
function whenMouse(handler) {
	return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuRoot.js
var [injectNavigationMenuContext, provideNavigationMenuContext] = /*#__PURE__*/ createContext(["NavigationMenuRoot", "NavigationMenuSub"], "NavigationMenuContext");
var NavigationMenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "NavigationMenuRoot",
	props: {
		modelValue: {
			type: String,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: String,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		delayDuration: {
			type: Number,
			required: false,
			default: 200
		},
		skipDelayDuration: {
			type: Number,
			required: false,
			default: 300
		},
		disableClickTrigger: {
			type: Boolean,
			required: false,
			default: false
		},
		disableHoverTrigger: {
			type: Boolean,
			required: false,
			default: false
		},
		disablePointerLeaveClose: {
			type: Boolean,
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
			required: false,
			default: "nav"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const modelValue = useVModel(props, "modelValue", __emit, {
			defaultValue: props.defaultValue ?? "",
			passive: props.modelValue === void 0
		});
		const previousValue = ref("");
		const { forwardRef, currentElement: rootNavigationMenu } = useForwardExpose();
		const indicatorTrack = ref();
		const viewport = ref();
		const activeTrigger = ref();
		const { getItems, CollectionSlot } = useCollection({
			key: "NavigationMenu",
			isProvider: true
		});
		const { delayDuration, skipDelayDuration, dir: propDir, disableClickTrigger, disableHoverTrigger, unmountOnHide } = toRefs(props);
		const dir = useDirection(propDir);
		const isDelaySkipped = refAutoReset(false, skipDelayDuration);
		const skipNextClose = ref(false);
		const computedDelay = computed(() => {
			if (modelValue.value !== "" || isDelaySkipped.value) return 150;
			else return delayDuration.value;
		});
		const debouncedFn = useDebounceFn((val) => {
			if (typeof val === "string") {
				if (val === "" && skipNextClose.value) {
					skipNextClose.value = false;
					return;
				}
				previousValue.value = modelValue.value;
				modelValue.value = val;
				if (val === "") isDelaySkipped.value = true;
			}
		}, computedDelay);
		watchEffect(() => {
			if (!modelValue.value) return;
			const items = getItems().map((i) => i.ref);
			activeTrigger.value = items.find((item) => item.id.includes(modelValue.value));
		});
		useEventListener(rootNavigationMenu, EVENT_ROOT_CONTENT_DISMISS, onItemDismiss);
		provideNavigationMenuContext({
			isRootMenu: true,
			modelValue,
			previousValue,
			baseId: useId$1(void 0, "reka-navigation-menu"),
			disableClickTrigger,
			disableHoverTrigger,
			dir,
			unmountOnHide,
			orientation: props.orientation,
			rootNavigationMenu,
			indicatorTrack,
			activeTrigger,
			onIndicatorTrackChange: (val) => {
				indicatorTrack.value = val;
			},
			viewport,
			onViewportChange: (val) => {
				viewport.value = val;
			},
			onTriggerEnter: (val) => {
				if (modelValue.value !== "") {
					skipNextClose.value = true;
					previousValue.value = modelValue.value;
					modelValue.value = val;
				} else debouncedFn(val);
			},
			onTriggerLeave: () => {
				skipNextClose.value = false;
				debouncedFn("");
			},
			onContentEnter: () => {
				debouncedFn();
			},
			onContentLeave: () => {
				if (!props.disablePointerLeaveClose) {
					skipNextClose.value = false;
					debouncedFn("");
				}
			},
			onItemSelect: (val) => {
				previousValue.value = modelValue.value;
				modelValue.value = val;
			},
			onItemDismiss
		});
		function onItemDismiss() {
			previousValue.value = modelValue.value;
			modelValue.value = "";
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-orientation": _ctx.orientation,
					dir: unref(dir),
					"data-reka-navigation-menu": ""
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-orientation",
					"dir"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuItem.js
var [injectNavigationMenuItemContext, provideNavigationMenuItemContext] = /*#__PURE__*/ createContext("NavigationMenuItem");
var NavigationMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "NavigationMenuItem",
	props: {
		value: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "li"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const { getItems } = useCollection({ key: "NavigationMenu" });
		const context = injectNavigationMenuContext();
		const value = useId$1(props.value);
		const triggerRef$1 = ref();
		const focusProxyRef = ref();
		const contentId = makeContentId(context.baseId, value);
		let restoreContentTabOrderRef = () => ({});
		const wasEscapeCloseRef = ref(false);
		async function handleContentEntry(side = "start") {
			const el = (void 0).getElementById(contentId);
			if (el) {
				restoreContentTabOrderRef();
				const candidates = getTabbableCandidates(el);
				if (candidates.length) focusFirst(side === "start" ? candidates : candidates.reverse());
			}
		}
		function handleContentExit() {
			const el = (void 0).getElementById(contentId);
			if (el) {
				const candidates = getTabbableCandidates(el);
				if (candidates.length) restoreContentTabOrderRef = removeFromTabOrder(candidates);
			}
		}
		provideNavigationMenuItemContext({
			value,
			contentId,
			triggerRef: triggerRef$1,
			focusProxyRef,
			wasEscapeCloseRef,
			onEntryKeyDown: handleContentEntry,
			onFocusProxyEnter: handleContentEntry,
			onContentFocusOutside: handleContentExit,
			onRootContentClose: handleContentExit
		});
		function handleClose() {
			context.onItemDismiss();
			triggerRef$1.value?.focus();
		}
		function handleKeydown(ev) {
			const currentFocus = getActiveElement();
			if (ev.keyCode === 32 || ev.key === "Enter") if (context.modelValue.value === value) {
				handleClose();
				ev.preventDefault();
				return;
			} else {
				ev.target.click();
				ev.preventDefault();
				return;
			}
			const itemsArray = getItems().filter((i) => i.ref.parentElement?.hasAttribute("data-menu-item")).map((i) => i.ref);
			if (!itemsArray.includes(currentFocus)) return;
			const newSelectedElement = useArrowNavigation(ev, currentFocus, void 0, {
				itemsArray,
				loop: false
			});
			if (newSelectedElement) newSelectedElement?.focus();
			ev.preventDefault();
			ev.stopPropagation();
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-menu-item": "",
				onKeydown: withKeys(handleKeydown, [
					"up",
					"down",
					"left",
					"right",
					"home",
					"end",
					"space"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuContentImpl.js
var NavigationMenuContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "NavigationMenuContentImpl",
	props: {
		disableOutsidePointerEvents: {
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { getItems } = useCollection({ key: "NavigationMenu" });
		const { forwardRef, currentElement } = useForwardExpose();
		const menuContext = injectNavigationMenuContext();
		const itemContext = injectNavigationMenuItemContext();
		const triggerId = makeTriggerId(menuContext.baseId, itemContext.value);
		const contentId = makeContentId(menuContext.baseId, itemContext.value);
		const prevMotionAttributeRef = ref(null);
		const motionAttribute = computed(() => {
			const values = getItems().map((i) => i.ref.id.split("trigger-")[1]);
			if (menuContext.dir.value === "rtl") values.reverse();
			const index = values.indexOf(menuContext.modelValue.value);
			const prevIndex = values.indexOf(menuContext.previousValue.value);
			const isSelected = itemContext.value === menuContext.modelValue.value;
			const wasSelected = prevIndex === values.indexOf(itemContext.value);
			if (!isSelected && !wasSelected) return prevMotionAttributeRef.value;
			const attribute = (() => {
				if (index !== prevIndex) {
					if (isSelected && prevIndex !== -1) return index > prevIndex ? "from-end" : "from-start";
					if (wasSelected && index !== -1) return index > prevIndex ? "to-start" : "to-end";
				}
				return null;
			})();
			prevMotionAttributeRef.value = attribute;
			return attribute;
		});
		function handleFocusOutside(ev) {
			emits("focusOutside", ev);
			emits("interactOutside", ev);
			if (ev.detail.originalEvent.target.hasAttribute("data-navigation-menu-trigger")) ev.preventDefault();
			if (!ev.defaultPrevented) {
				itemContext.onContentFocusOutside();
				const target$1 = ev.target;
				if (menuContext.rootNavigationMenu?.value?.contains(target$1)) ev.preventDefault();
			}
		}
		function handlePointerDownOutside(ev) {
			emits("pointerDownOutside", ev);
			if (!ev.defaultPrevented) {
				const target = ev.target;
				const isTrigger = getItems().some((i) => i.ref.contains(target));
				const isRootViewport = menuContext.isRootMenu && menuContext.viewport.value?.contains(target);
				if (isTrigger || isRootViewport || !menuContext.isRootMenu) ev.preventDefault();
			}
		}
		watchEffect((cleanupFn) => {
			const content = currentElement.value;
			if (menuContext.isRootMenu && content) {
				const handleClose = () => {
					menuContext.onItemDismiss();
					itemContext.onRootContentClose();
					if (content.contains(getActiveElement())) itemContext.triggerRef.value?.focus();
				};
				content.addEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose);
				cleanupFn(() => content.removeEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose));
			}
		});
		function handleEscapeKeyDown(ev) {
			emits("escapeKeyDown", ev);
			if (!ev.defaultPrevented) {
				menuContext.onItemDismiss();
				itemContext.triggerRef?.value?.focus();
				itemContext.wasEscapeCloseRef.value = true;
			}
		}
		function handleKeydown(ev) {
			if (ev.target.closest("[data-reka-navigation-menu]") !== menuContext.rootNavigationMenu.value) return;
			const isMetaKey = ev.altKey || ev.ctrlKey || ev.metaKey;
			const isTabKey = ev.key === "Tab" && !isMetaKey;
			const candidates = getTabbableCandidates(ev.currentTarget);
			if (isTabKey) {
				const focusedElement = getActiveElement();
				const index = candidates.findIndex((candidate) => candidate === focusedElement);
				if (focusFirst(ev.shiftKey ? candidates.slice(0, index).reverse() : candidates.slice(index + 1, candidates.length))) ev.preventDefault();
				else {
					itemContext.focusProxyRef.value?.focus();
					return;
				}
			}
			useArrowNavigation(ev, getActiveElement(), void 0, {
				itemsArray: candidates,
				loop: false,
				enableIgnoredElement: true
			})?.focus();
		}
		function handleDismiss() {
			if (menuContext.modelValue.value !== itemContext.value) return;
			const rootContentDismissEvent = new Event(EVENT_ROOT_CONTENT_DISMISS, {
				bubbles: true,
				cancelable: true
			});
			currentElement.value?.dispatchEvent(rootContentDismissEvent);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DismissableLayer_default), mergeProps({
				id: unref(contentId),
				ref: unref(forwardRef),
				"aria-labelledby": unref(triggerId),
				"data-motion": motionAttribute.value,
				"data-state": unref(getOpenState)(unref(menuContext).modelValue.value === unref(itemContext).value),
				"data-orientation": unref(menuContext).orientation
			}, props, {
				onKeydown: handleKeydown,
				onEscapeKeyDown: handleEscapeKeyDown,
				onPointerDownOutside: handlePointerDownOutside,
				onFocusOutside: handleFocusOutside,
				onDismiss: handleDismiss
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"aria-labelledby",
				"data-motion",
				"data-state",
				"data-orientation"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuContent.js
var NavigationMenuContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "forceMount"), emits);
		const { forwardRef } = useForwardExpose();
		const menuContext = injectNavigationMenuContext();
		const itemContext = injectNavigationMenuItemContext();
		const open = computed(() => itemContext.value === menuContext.modelValue.value);
		const isLastActiveValue = computed(() => {
			if (menuContext.viewport.value) {
				if (!menuContext.modelValue.value && menuContext.previousValue.value) return menuContext.previousValue.value === itemContext.value;
			}
			return false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Teleport, {
				to: unref(false) && unref(menuContext).viewport.value ? unref(menuContext).viewport.value : "body",
				disabled: unref(false) && unref(menuContext).viewport.value ? !unref(menuContext).viewport.value : true
			}, [createVNode(unref(Presence_default), {
				present: _ctx.forceMount || open.value || isLastActiveValue.value,
				"force-mount": !unref(menuContext).unmountOnHide.value
			}, {
				default: withCtx(({ present }) => [createVNode(NavigationMenuContentImpl_default, mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(getOpenState)(open.value),
					style: { pointerEvents: !open.value && unref(menuContext).isRootMenu ? "none" : void 0 }
				}, {
					..._ctx.$attrs,
					...unref(forwarded)
				}, {
					hidden: !present,
					onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onContentEnter(unref(itemContext).value)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => unref(whenMouse)(() => unref(menuContext).onContentLeave())($event)),
					onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[4] || (_cache[4] = ($event) => emits("interactOutside", $event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, [
					"data-state",
					"style",
					"hidden"
				])]),
				_: 3
			}, 8, ["present", "force-mount"])], 8, ["to", "disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuIndicator.js
var NavigationMenuIndicator_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuIndicator",
	props: {
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
		const menuContext = injectNavigationMenuContext();
		const indicatorStyle = ref();
		const isHorizontal = computed(() => menuContext.orientation === "horizontal");
		const isVisible = computed(() => !!menuContext.modelValue.value);
		const { activeTrigger } = menuContext;
		function handlePositionChange() {
			if (!activeTrigger.value) return;
			indicatorStyle.value = {
				size: isHorizontal.value ? activeTrigger.value.offsetWidth : activeTrigger.value.offsetHeight,
				position: isHorizontal.value ? activeTrigger.value.offsetLeft : activeTrigger.value.offsetTop
			};
		}
		watchEffect(() => {
			if (!menuContext.modelValue.value) return;
			handlePositionChange();
		});
		useResizeObserver(activeTrigger, handlePositionChange);
		useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
		return (_ctx, _cache) => {
			return unref(menuContext).indicatorTrack.value ? (openBlock(), createBlock(Teleport, {
				key: 0,
				to: unref(menuContext).indicatorTrack.value
			}, [createVNode(unref(Presence_default), { present: _ctx.forceMount || isVisible.value }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"aria-hidden": "true",
					"data-state": isVisible.value ? "visible" : "hidden",
					"data-orientation": unref(menuContext).orientation,
					"as-child": props.asChild,
					as: _ctx.as,
					style: { ...indicatorStyle.value ? {
						"--reka-navigation-menu-indicator-size": `${indicatorStyle.value.size}px`,
						"--reka-navigation-menu-indicator-position": `${indicatorStyle.value.position}px`
					} : {} }
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"data-state",
					"data-orientation",
					"as-child",
					"as",
					"style"
				])]),
				_: 3
			}, 8, ["present"])], 8, ["to"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuLink.js
var NavigationMenuLink_default = /* @__PURE__ */ defineComponent({
	__name: "NavigationMenuLink",
	props: {
		active: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "a"
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { CollectionItem } = useCollection({ key: "NavigationMenu" });
		useForwardExpose();
		async function handleClick(ev) {
			const linkSelectEvent = new CustomEvent(LINK_SELECT, {
				bubbles: true,
				cancelable: true,
				detail: { originalEvent: ev }
			});
			emits("select", linkSelectEvent);
			if (!linkSelectEvent.defaultPrevented && !ev.metaKey) {
				const rootContentDismissEvent = new CustomEvent(EVENT_ROOT_CONTENT_DISMISS, {
					bubbles: true,
					cancelable: true
				});
				ev.target?.dispatchEvent(rootContentDismissEvent);
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					as: _ctx.as,
					"data-active": _ctx.active ? "" : void 0,
					"aria-current": _ctx.active ? "page" : void 0,
					"as-child": props.asChild,
					onClick: handleClick
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"data-active",
					"aria-current",
					"as-child"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuList.js
var NavigationMenuList_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuList",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "ul"
		}
	},
	setup(__props) {
		const props = __props;
		const menuContext = injectNavigationMenuContext();
		const { forwardRef} = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				style: { "position": "relative" }
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					"as-child": props.asChild,
					as: _ctx.as,
					"data-orientation": unref(menuContext).orientation
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as-child",
					"as",
					"data-orientation"
				])]),
				_: 3
			}, 512);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuTrigger.js
var _hoisted_1 = ["aria-owns"];
var NavigationMenuTrigger_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
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
		const menuContext = injectNavigationMenuContext();
		const itemContext = injectNavigationMenuItemContext();
		const { CollectionItem } = useCollection({ key: "NavigationMenu" });
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const triggerId = ref("");
		const contentId = ref("");
		const hasPointerMoveOpenedRef = refAutoReset(false, 300);
		const wasClickCloseRef = ref(false);
		const open = computed(() => itemContext.value === menuContext.modelValue.value);
		function handlePointerEnter() {
			if (menuContext.disableHoverTrigger.value) return;
			wasClickCloseRef.value = false;
			itemContext.wasEscapeCloseRef.value = false;
		}
		function handlePointerMove(ev) {
			if (menuContext.disableHoverTrigger.value) return;
			if (ev.pointerType === "mouse") {
				if (props.disabled || wasClickCloseRef.value || itemContext.wasEscapeCloseRef.value || hasPointerMoveOpenedRef.value) return;
				menuContext.onTriggerEnter(itemContext.value);
				hasPointerMoveOpenedRef.value = true;
			}
		}
		function handlePointerLeave(ev) {
			if (menuContext.disableHoverTrigger.value) return;
			if (ev.pointerType === "mouse") {
				if (props.disabled) return;
				menuContext.onTriggerLeave();
				hasPointerMoveOpenedRef.value = false;
			}
		}
		function handleClick(event) {
			if ((!("pointerType" in event) || event.pointerType === "mouse") && menuContext.disableClickTrigger.value) return;
			if (hasPointerMoveOpenedRef.value) return;
			if (open.value) menuContext.onItemSelect("");
			else menuContext.onItemSelect(itemContext.value);
			wasClickCloseRef.value = open.value;
		}
		function handleKeydown(ev) {
			const entryKey = {
				horizontal: "ArrowDown",
				vertical: menuContext.dir.value === "rtl" ? "ArrowLeft" : "ArrowRight"
			}[menuContext.orientation];
			if (open.value && ev.key === entryKey) {
				itemContext.onEntryKeyDown();
				ev.preventDefault();
				ev.stopPropagation();
			}
		}
		function setFocusProxyRef(node) {
			if (!node) return void 0;
			itemContext.focusProxyRef.value = unrefElement(node);
		}
		function handleVisuallyHiddenFocus(ev) {
			const content = (void 0).getElementById(itemContext.contentId);
			const prevFocusedElement = ev.relatedTarget;
			const wasTriggerFocused = prevFocusedElement === triggerElement.value;
			const wasFocusFromContent = content?.contains(prevFocusedElement);
			if (wasTriggerFocused || !wasFocusFromContent) itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					id: triggerId.value,
					ref: unref(forwardRef),
					disabled: _ctx.disabled,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-state": unref(getOpenState)(open.value),
					"data-navigation-menu-trigger": "",
					"aria-expanded": open.value,
					"aria-controls": contentId.value,
					"as-child": props.asChild,
					as: _ctx.as
				}, _ctx.$attrs, {
					onPointerenter: handlePointerEnter,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onClick: handleClick,
					onKeydown: handleKeydown
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"disabled",
					"data-disabled",
					"data-state",
					"aria-expanded",
					"aria-controls",
					"as-child",
					"as"
				])]),
				_: 3
			}), open.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(VisuallyHidden_default), {
				ref: setFocusProxyRef,
				"aria-hidden": "true",
				tabindex: 0,
				onFocus: handleVisuallyHiddenFocus
			}), unref(menuContext).viewport ? (openBlock(), createElementBlock("span", {
				key: 0,
				"aria-owns": contentId.value
			}, null, 8, _hoisted_1)) : createCommentVNode("v-if", true)], 64)) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NavigationMenu/NavigationMenuViewport.js
var NavigationMenuViewport_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuViewport",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		align: {
			type: String,
			required: false,
			default: "center"
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
		const { forwardRef, currentElement } = useForwardExpose();
		const menuContext = injectNavigationMenuContext();
		const { activeTrigger, rootNavigationMenu, modelValue } = menuContext;
		const size = ref();
		const position = ref();
		const open = computed(() => !!menuContext.modelValue.value);
		watch(currentElement, () => {
			menuContext.onViewportChange(currentElement.value);
		});
		const content = ref();
		watch([modelValue, open], () => {
			nextTick(() => {
				if (!currentElement.value) return;
				requestAnimationFrame(() => {
					const el = currentElement.value?.querySelector("[data-state=open]");
					content.value = el;
				});
			});
		}, { immediate: true });
		function updatePosition() {
			if (content.value && activeTrigger.value && rootNavigationMenu.value) {
				const bodyWidth = (void 0).documentElement.offsetWidth;
				const bodyHeight = (void 0).documentElement.offsetHeight;
				const rootRect = rootNavigationMenu.value.getBoundingClientRect();
				const rect = activeTrigger.value.getBoundingClientRect();
				const { offsetWidth, offsetHeight } = content.value;
				const startPositionLeft = rect.left - rootRect.left;
				const startPositionTop = rect.top - rootRect.top;
				let posLeft = null;
				let posTop = null;
				switch (props.align) {
					case "start":
						posLeft = startPositionLeft;
						posTop = startPositionTop;
						break;
					case "end":
						posLeft = startPositionLeft - offsetWidth + rect.width;
						posTop = startPositionTop - offsetHeight + rect.height;
						break;
					default:
						posLeft = startPositionLeft - offsetWidth / 2 + rect.width / 2;
						posTop = startPositionTop - offsetHeight / 2 + rect.height / 2;
				}
				const screenOffset = 10;
				if (posLeft + rootRect.left < screenOffset) posLeft = screenOffset - rootRect.left;
				const rightOffset = posLeft + rootRect.left + offsetWidth;
				if (rightOffset > bodyWidth - screenOffset) {
					posLeft -= rightOffset - bodyWidth + screenOffset;
					if (posLeft < screenOffset - rootRect.left) posLeft = screenOffset - rootRect.left;
				}
				if (posTop + rootRect.top < screenOffset) posTop = screenOffset - rootRect.top;
				const bottomOffset = posTop + rootRect.top + offsetHeight;
				if (bottomOffset > bodyHeight - screenOffset) {
					posTop -= bottomOffset - bodyHeight + screenOffset;
					if (posTop < screenOffset - rootRect.top) posTop = screenOffset - rootRect.top;
				}
				posLeft = Math.round(posLeft);
				posTop = Math.round(posTop);
				position.value = {
					left: posLeft,
					top: posTop
				};
			}
		}
		useResizeObserver(content, () => {
			if (content.value) {
				size.value = {
					width: content.value.offsetWidth,
					height: content.value.offsetHeight
				};
				updatePosition();
			}
		});
		useResizeObserver([globalThis.document?.body, rootNavigationMenu], () => {
			updatePosition();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				present: _ctx.forceMount || open.value,
				"force-mount": !unref(menuContext).unmountOnHide.value,
				onAfterLeave: _cache[2] || (_cache[2] = () => {
					size.value = void 0;
					position.value = void 0;
				})
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": unref(getOpenState)(open.value),
					"data-orientation": unref(menuContext).orientation,
					style: {
						pointerEvents: !open.value && unref(menuContext).isRootMenu ? "none" : void 0,
						["--reka-navigation-menu-viewport-width"]: size.value ? `${size.value?.width}px` : void 0,
						["--reka-navigation-menu-viewport-height"]: size.value ? `${size.value?.height}px` : void 0,
						["--reka-navigation-menu-viewport-left"]: position.value ? `${position.value?.left}px` : void 0,
						["--reka-navigation-menu-viewport-top"]: position.value ? `${position.value?.top}px` : void 0
					},
					hidden: !present,
					onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onContentEnter(unref(menuContext).modelValue.value)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => unref(whenMouse)(() => unref(menuContext).onContentLeave())($event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, [
					"as",
					"as-child",
					"data-state",
					"data-orientation",
					"style",
					"hidden"
				])]),
				_: 3
			}, 8, ["present", "force-mount"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8d3ee09fd7864d66cfa01977225356c6/node_modules/nuxt/dist/app/utils/hash.js
/**
* Hash an arbitrary value into a short, stable string key.
*
* Values are serialized to a canonical, locale-independent representation
* (equal structures hash equally regardless of key order or runtime locale),
* then digested with a fast non-cryptographic hash. This is what `useFetch` and
* `useAsyncData` use internally to derive their cache keys, so it is safe to use
* for the same purpose in your own code.
*
* The digest is non-cryptographic and must not be used for integrity checks.
*
* @since 4.5.0
*/
function hashKey(value) {
	return fnv1a64Base36(identify(value));
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-group.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_group_default = { "base": "fixed inset-0 flex overflow-hidden" };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardGroup.vue
var _sfc_main$7 = {
	__name: "UDashboardGroup",
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
		},
		storage: {
			type: String,
			required: false,
			default: "cookie"
		},
		storageKey: {
			type: String,
			required: false,
			default: "dashboard"
		},
		storageOptions: {
			type: Object,
			required: false
		},
		persistent: {
			type: Boolean,
			required: false,
			default: true
		},
		unit: {
			type: String,
			required: false,
			default: "%"
		}
	},
	setup(__props) {
		const props = useComponentProps("dashboardGroup", __props);
		const nuxtApp = useNuxtApp();
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_group_default,
			...appConfig.ui?.dashboardGroup || {}
		}));
		const sidebarOpen = ref(false);
		const sidebarCollapsed = ref(false);
		provideDashboardContext({
			storage: props.storage,
			storageKey: props.storageKey,
			storageOptions: props.storageOptions,
			persistent: props.persistent,
			unit: props.unit,
			sidebarOpen,
			toggleSidebar: () => {
				nuxtApp.hooks.callHook("dashboard:sidebar:toggle");
			},
			sidebarCollapsed,
			collapseSidebar: (collapsed) => {
				nuxtApp.hooks.callHook("dashboard:sidebar:collapse", collapsed);
			},
			toggleSearch: () => {
				nuxtApp.hooks.callHook("dashboard:search:toggle");
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
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
var _sfc_setup$9 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardGroup.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8d3ee09fd7864d66cfa01977225356c6/node_modules/nuxt/dist/app/composables/runtime-hook.js
/**
* Registers a runtime hook in a Nuxt application and ensures it is properly disposed of when the scope is destroyed.
* @param name - The name of the hook to register.
* @param fn - The callback function to be executed when the hook is triggered.
* @since 3.14.0
*/
function useRuntimeHook(name, fn) {
	const unregister = useNuxtApp().hook(name, fn);
	onScopeDispose(unregister);
}
//#endregion
//#region node_modules/.pnpm/vaul-vue@0.4.1_reka-ui@2.10_d93c862fe98701c9c127446c77901366/node_modules/vaul-vue/dist/index.js
var rt = false;
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
var ut = (e) => typeof e < "u";
function st(e) {
	return JSON.parse(JSON.stringify(e));
}
function $e(e, n, s, i = {}) {
	var t, w, d;
	const { clone: v = false, passive: D = false, eventName: $, deep: T = false, defaultValue: r, shouldEmit: l } = i, h = getCurrentInstance(), m = s || (h == null ? void 0 : h.emit) || ((t = h == null ? void 0 : h.$emit) == null ? void 0 : t.bind(h)) || ((d = (w = h == null ? void 0 : h.proxy) == null ? void 0 : w.$emit) == null ? void 0 : d.bind(h == null ? void 0 : h.proxy));
	let u = $;
	n || (n = "modelValue"), u = u || `update:${n.toString()}`;
	const L = (a) => v ? typeof v == "function" ? v(a) : st(a) : a, H = () => ut(e[n]) ? L(e[n]) : r, p = (a) => {
		l ? l(a) && m(u, a) : m(u, a);
	};
	if (D) {
		const a = H(), c = ref(a);
		let f = false;
		return watch(() => e[n], (y) => {
			f || (f = true, c.value = L(y), nextTick(() => f = false));
		}), watch(c, (y) => {
			!f && (y !== e[n] || T) && p(y);
		}, { deep: T }), c;
	} else return computed({
		get() {
			return H();
		},
		set(a) {
			p(a);
		}
	});
}
var [ee, ct] = createContext("DrawerRoot"), Ee = /* @__PURE__ */ new WeakMap();
function C(e, n, s = false) {
	if (!e || !(e instanceof HTMLElement) || !n) return;
	const i = {};
	Object.entries(n).forEach(([t, w]) => {
		if (t.startsWith("--")) {
			e.style.setProperty(t, w);
			return;
		}
		i[t] = e.style[t], e.style[t] = w;
	}), !s && Ee.set(e, i);
}
function ie(e, n) {
	const s = (void 0).getComputedStyle(e), i = s.transform || s.webkitTransform || s.mozTransform;
	let t = i.match(/^matrix3d\((.+)\)$/);
	return t ? Number.parseFloat(t[1].split(", ")[_(n) ? 13 : 12]) : (t = i.match(/^matrix\((.+)\)$/), t ? Number.parseFloat(t[1].split(", ")[_(n) ? 5 : 4]) : null);
}
function vt(e) {
	return 8 * (Math.log(e + 1) - 2);
}
function _(e) {
	switch (e) {
		case "top":
		case "bottom": return true;
		case "left":
		case "right": return false;
		default: return e;
	}
}
function de(e, n) {
	if (!e) return () => {};
	const s = e.style.cssText;
	return Object.assign(e.style, n), () => {
		e.style.cssText = s;
	};
}
var O = {
	DURATION: .5,
	EASE: [
		.32,
		.72,
		0,
		1
	]
};
var _e = .4;
var pt = .25;
var gt = 100;
var Be = 8;
var re = 16;
var Ce = 26;
var Oe = "vaul-dragging";
function mt({ activeSnapPoint: e, snapPoints: n, drawerRef: s, overlayRef: i, fadeFromIndex: t, onSnapPointChange: w, direction: d }) {
	const v = ref(void 0);
	const $ = computed(() => (n.value && e.value === n.value[n.value.length - 1]) ?? null), T = computed(() => n.value && n.value.length > 0 && ((t == null ? void 0 : t.value) || (t == null ? void 0 : t.value) === 0) && !Number.isNaN(t == null ? void 0 : t.value) && n.value[(t == null ? void 0 : t.value) ?? -1] === e.value || !n.value), r = computed(() => {
		var p;
		return ((p = n.value) == null ? void 0 : p.findIndex((a) => a === e.value)) ?? null;
	}), l = computed(() => {
		var p;
		return ((p = n.value) == null ? void 0 : p.map((a) => {
			const c = typeof a == "string";
			let f = 0;
			if (c && (f = Number.parseInt(a, 10)), _(d.value)) {
				const P = c ? f : v.value ? a * v.value.innerHeight : 0;
				return v.value ? d.value === "bottom" ? v.value.innerHeight - P : -v.value.innerHeight + P : P;
			}
			const y = c ? f : v.value ? a * v.value.innerWidth : 0;
			return v.value ? d.value === "right" ? v.value.innerWidth - y : -v.value.innerWidth + y : y;
		})) ?? [];
	}), h = computed(() => {
		var p;
		return r.value !== null ? (p = l.value) == null ? void 0 : p[r.value] : null;
	}), m = (p) => {
		var c, f, y, P;
		const a = ((c = l.value) == null ? void 0 : c.findIndex((x) => x === p)) ?? null;
		nextTick(() => {
			var x;
			w(a, l.value), C((x = s.value) == null ? void 0 : x.$el, {
				transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
				transform: _(d.value) ? `translate3d(0, ${p}px, 0)` : `translate3d(${p}px, 0, 0)`
			});
		}), l.value && a !== l.value.length - 1 && a !== (t == null ? void 0 : t.value) ? C((f = i.value) == null ? void 0 : f.$el, {
			transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
			opacity: "0"
		}) : C((y = i.value) == null ? void 0 : y.$el, {
			transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
			opacity: "1"
		}), e.value = a !== null ? ((P = n.value) == null ? void 0 : P[a]) ?? null : null;
	};
	watch([
		e,
		l,
		n
	], () => {
		var p;
		if (e.value) {
			const a = ((p = n.value) == null ? void 0 : p.findIndex((c) => c === e.value)) ?? -1;
			l.value && a !== -1 && typeof l.value[a] == "number" && m(l.value[a]);
		}
	}, { immediate: true });
	function u({ draggedDistance: p, closeDrawer: a, velocity: c, dismissible: f }) {
		var j, G, z;
		if (t.value === void 0) return;
		const y = d.value === "bottom" || d.value === "right" ? (h.value ?? 0) - p : (h.value ?? 0) + p, P = r.value === t.value - 1, x = r.value === 0, W = p > 0;
		if (P && C((j = i.value) == null ? void 0 : j.$el, { transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})` }), c > 2 && !W) {
			f ? a() : m(l.value[0]);
			return;
		}
		if (c > 2 && W && l && n.value) {
			m(l.value[n.value.length - 1]);
			return;
		}
		const te = (G = l.value) == null ? void 0 : G.reduce((M, g) => typeof M != "number" || typeof g != "number" ? M : Math.abs(g - y) < Math.abs(M - y) ? g : M), V = _(d.value) ? (void 0).innerHeight : (void 0).innerWidth;
		if (c > _e && Math.abs(p) < V * .4) {
			const M = W ? 1 : -1;
			if (M > 0 && $) {
				m(l.value[(((z = n.value) == null ? void 0 : z.length) ?? 0) - 1]);
				return;
			}
			if (x && M < 0 && f && a(), r.value === null) return;
			m(l.value[r.value + M]);
			return;
		}
		m(te);
	}
	function L({ draggedDistance: p }) {
		var c;
		if (h.value === null) return;
		const a = d.value === "bottom" || d.value === "right" ? h.value - p : h.value + p;
		(d.value === "bottom" || d.value === "right") && a < l.value[l.value.length - 1] || (d.value === "top" || d.value === "left") && a > l.value[l.value.length - 1] || C((c = s.value) == null ? void 0 : c.$el, { transform: _(d.value) ? `translate3d(0, ${a}px, 0)` : `translate3d(${a}px, 0, 0)` });
	}
	function H(p, a) {
		if (!n.value || typeof r.value != "number" || !l.value || t.value === void 0) return null;
		const c = r.value === t.value - 1;
		if (r.value >= t.value && a) return 0;
		if (c && !a) return 1;
		if (!T.value && !c) return null;
		const y = c ? r.value + 1 : r.value - 1, P = c ? l.value[y] - l.value[y - 1] : l.value[y + 1] - l.value[y], x = p / Math.abs(P);
		return c ? 1 - x : x;
	}
	return {
		isLastSnapPoint: $,
		shouldFade: T,
		getPercentageDragged: H,
		activeSnapPointIndex: r,
		onRelease: u,
		onDrag: L,
		snapPointsOffset: l
	};
}
function Te() {
	return /^((?!chrome|android).)*safari/i.test((void 0).userAgent);
}
var Q = null;
function wt(e) {
	const { isOpen: n, modal: s, nested: i, hasBeenOpened: t, preventScrollRestoration: w, noBodyStyles: d } = e, v = ref(""), D = ref(0);
	function $() {
		if (Te() && Q === null && n.value && !d.value) {
			Q = {
				position: (void 0).body.style.position,
				top: (void 0).body.style.top,
				left: (void 0).body.style.left,
				height: (void 0).body.style.height
			};
			const { scrollX: r, innerHeight: l } = void 0;
			(void 0).body.style.setProperty("position", "fixed", "important"), Object.assign((void 0).body.style, {
				top: `${-D.value}px`,
				left: `${-r}px`,
				right: "0px",
				height: "auto"
			}), setTimeout(() => {
				requestAnimationFrame(() => {
					const h = l - (void 0).innerHeight;
					h && D.value >= l && ((void 0).body.style.top = `-${D.value + h}px`);
				});
			}, 300);
		}
	}
	function T() {
		if (Te() && Q !== null && !d.value) {
			const r = -Number.parseInt((void 0).body.style.top, 10), l = -Number.parseInt((void 0).body.style.left, 10);
			Object.assign((void 0).body.style, Q), (void 0).requestAnimationFrame(() => {
				if (w.value && v.value !== (void 0).location.href) {
					v.value = (void 0).location.href;
					return;
				}
				(void 0).scrollTo(l, r);
			}), Q = null;
		}
	}
	return watch([
		n,
		t,
		v
	], () => {
		i.value || !t.value || (n.value ? ((void 0).matchMedia("(display-mode: standalone)").matches || $(), s.value || setTimeout(() => {
			T();
		}, 500)) : T());
	}), { restorePositionSetting: T };
}
function ht(e, n) {
	return e && e.value ? e : n;
}
function yt(e) {
	const { emitDrag: n, emitRelease: s, emitClose: i, emitOpenChange: t, open: w, dismissible: d, nested: v, modal: D, shouldScaleBackground: $, setBackgroundColorOnScale: T, scrollLockTimeout: r, closeThreshold: l, activeSnapPoint: h, fadeFromIndex: m, direction: u, noBodyStyles: L, handleOnly: H, preventScrollRestoration: p } = e, a = ref(w.value ?? false), c = ref(false), f = ref(false), y = ref(false), P = ref(null), x = ref(null), W = ref(null), te = ref(null), V = ref(null), j = ref(false), G = ref(null), z = ref(0), M = ref(false);
	ref(0);
	const g = ref(null);
	ref(0);
	const pe = computed(() => {
		var o;
		return ((o = g.value) == null ? void 0 : o.$el.getBoundingClientRect().height) || 0;
	}), U = ht(e.snapPoints, ref(void 0)), Ne = computed(() => {
		var o;
		return U && (((o = U.value) == null ? void 0 : o.length) ?? 0) > 0;
	}), Ae = ref(null), { activeSnapPointIndex: ge, onRelease: xe, snapPointsOffset: He, onDrag: Ue, shouldFade: me, getPercentageDragged: Le } = mt({
		snapPoints: U,
		activeSnapPoint: h,
		drawerRef: g,
		fadeFromIndex: m,
		overlayRef: P,
		onSnapPointChange: Me,
		direction: u
	});
	function Me(o, R) {
		U.value && o === R.length - 1 && (x.value = /* @__PURE__ */ new Date());
	}
	wt({
		isOpen: a,
		modal: D,
		nested: v,
		hasBeenOpened: c,
		noBodyStyles: L,
		preventScrollRestoration: p
	});
	function ne() {
		return ((void 0).innerWidth - Ce) / (void 0).innerWidth;
	}
	function we(o, R) {
		var k;
		if (!o) return false;
		let b = o;
		const B = (k = (void 0).getSelection()) == null ? void 0 : k.toString(), E = g.value ? ie(g.value.$el, u.value) : null, A = /* @__PURE__ */ new Date();
		if (b.hasAttribute("data-vaul-no-drag") || b.closest("[data-vaul-no-drag]")) return false;
		if (u.value === "right" || u.value === "left") return true;
		if (x.value && A.getTime() - x.value.getTime() < 500) return false;
		if (E !== null && (u.value === "bottom" ? E > 0 : E < 0)) return true;
		if (B && B.length > 0) return false;
		if (V.value && A.getTime() - V.value.getTime() < r.value && E === 0 || R) return V.value = A, false;
		for (; b;) {
			if (b.scrollHeight > b.clientHeight) {
				if (b.scrollTop !== 0) return V.value = /* @__PURE__ */ new Date(), false;
				if (b.getAttribute("role") === "dialog") return true;
			}
			b = b.parentNode;
		}
		return true;
	}
	function ke(o) {
		!d.value && !U.value || g.value && !g.value.$el.contains(o.target) || (f.value = true, W.value = /* @__PURE__ */ new Date(), o.target.setPointerCapture(o.pointerId), z.value = _(u.value) ? o.clientY : o.clientX);
	}
	function Ie(o) {
		var R, b, B, E, A, k;
		if (g.value && f.value) {
			const X = u.value === "bottom" || u.value === "right" ? 1 : -1, ae = (z.value - (_(u.value) ? o.clientY : o.clientX)) * X, le = ae > 0, ye = U.value && !d.value && !le;
			if (ye && ge.value === 0) return;
			const ce = Math.abs(ae), Se = (void 0).querySelector("[data-vaul-drawer-wrapper]") || (void 0).querySelector("[vaul-drawer-wrapper]");
			let q = ce / pe.value;
			const De = Le(ce, le);
			if (De !== null && (q = De), ye && q >= 1 || !j.value && !we(o.target, le)) return;
			if ((R = g == null ? void 0 : g.value) == null || R.$el.classList.add(Oe), j.value = true, C((b = g.value) == null ? void 0 : b.$el, { transition: "none" }), C((B = P.value) == null ? void 0 : B.$el, { transition: "none" }), U.value && Ue({ draggedDistance: ae }), le && !U.value) {
				const Y = vt(ae), oe = Math.min(Y * -1, 0) * X;
				C((E = g.value) == null ? void 0 : E.$el, { transform: _(u.value) ? `translate3d(0, ${oe}px, 0)` : `translate3d(${oe}px, 0, 0)` });
				return;
			}
			const qe = 1 - q;
			if ((me.value || m.value && ge.value === m.value - 1) && (n(q), C((A = P.value) == null ? void 0 : A.$el, {
				opacity: `${qe}`,
				transition: "none"
			}, true)), Se && P.value && $.value) {
				const Y = Math.min(ne() + q * (1 - ne()), 1), oe = 8 - q * 8, be = Math.max(0, 14 - q * 14);
				C(Se, {
					borderRadius: `${oe}px`,
					transform: _(u.value) ? `scale(${Y}) translate3d(0, ${be}px, 0)` : `scale(${Y}) translate3d(${be}px, 0, 0)`,
					transition: "none"
				}, true);
			}
			if (!U.value) {
				const Y = ce * X;
				C((k = g.value) == null ? void 0 : k.$el, { transform: _(u.value) ? `translate3d(0, ${Y}px, 0)` : `translate3d(${Y}px, 0, 0)` });
			}
		}
	}
	function he() {
		var b;
		if (!g.value) return;
		const o = (void 0).querySelector("[data-vaul-drawer-wrapper]") || (void 0).querySelector("[vaul-drawer-wrapper]"), R = ie(g.value.$el, u.value);
		C(g.value.$el, {
			transform: "translate3d(0, 0, 0)",
			transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
		}), C((b = P.value) == null ? void 0 : b.$el, {
			transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
			opacity: "1"
		}), $.value && R && R > 0 && a.value && C(o, {
			borderRadius: `${Be}px`,
			overflow: "hidden",
			..._(u.value) ? {
				transform: `scale(${ne()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
				transformOrigin: "top"
			} : {
				transform: `scale(${ne()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
				transformOrigin: "left"
			},
			transitionProperty: "transform, border-radius",
			transitionDuration: `${O.DURATION}s`,
			transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
		}, true);
	}
	function K(o) {
		g.value && (i(), o || (a.value = false), (void 0).setTimeout(() => {
			U.value && (h.value = U.value[0]);
		}, O.DURATION * 1e3));
	}
	watchEffect(() => {
		if (!a.value && $.value && rt);
	}), watch(w, () => {
		a.value = w.value, w.value || K();
	});
	function We(o) {
		if (!f.value || !g.value) return;
		g.value.$el.classList.remove(Oe), j.value = false, f.value = false, te.value = /* @__PURE__ */ new Date();
		const R = ie(g.value.$el, u.value);
		if (!we(o.target, false) || !R || Number.isNaN(R) || W.value === null) return;
		const b = te.value.getTime() - W.value.getTime(), B = z.value - (_(u.value) ? o.clientY : o.clientX), E = Math.abs(B) / b;
		if (E > .05 && (y.value = true, (void 0).setTimeout(() => {
			y.value = false;
		}, 200)), U.value) {
			const k = u.value === "bottom" || u.value === "right" ? 1 : -1;
			xe({
				draggedDistance: B * k,
				closeDrawer: K,
				velocity: E,
				dismissible: d.value
			}), s(true);
			return;
		}
		if (u.value === "bottom" || u.value === "right" ? B > 0 : B < 0) {
			he(), s(true);
			return;
		}
		if (E > _e) {
			K(), s(false);
			return;
		}
		if (R >= Math.min(g.value.$el.getBoundingClientRect().height ?? 0, (void 0).innerHeight) * l.value) {
			K(), s(false);
			return;
		}
		s(true), he();
	}
	watch(a, (o) => {
		o && (x.value = /* @__PURE__ */ new Date()), t(o);
	}, { immediate: true });
	function Ve(o) {
		var B, E;
		const R = o ? ((void 0).innerWidth - re) / (void 0).innerWidth : 1, b = o ? -16 : 0;
		G.value && (void 0).clearTimeout(G.value), C((B = g.value) == null ? void 0 : B.$el, {
			transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
			transform: `scale(${R}) translate3d(0, ${b}px, 0)`
		}), !o && (E = g.value) != null && E.$el && (G.value = (void 0).setTimeout(() => {
			var k, X;
			const A = ie((k = g.value) == null ? void 0 : k.$el, u.value);
			C((X = g.value) == null ? void 0 : X.$el, {
				transition: "none",
				transform: _(u.value) ? `translate3d(0, ${A}px, 0)` : `translate3d(${A}px, 0, 0)`
			});
		}, 500));
	}
	function je(o) {
		var A;
		if (o < 0) return;
		const R = _(u.value) ? (void 0).innerHeight : (void 0).innerWidth, b = (R - re) / R, B = b + o * (1 - b), E = -16 + o * re;
		C((A = g.value) == null ? void 0 : A.$el, {
			transform: _(u.value) ? `scale(${B}) translate3d(0, ${E}px, 0)` : `scale(${B}) translate3d(${E}px, 0, 0)`,
			transition: "none"
		});
	}
	function ze(o) {
		var E;
		const R = _(u.value) ? (void 0).innerHeight : (void 0).innerWidth, b = o ? (R - re) / R : 1, B = o ? -16 : 0;
		o && C((E = g.value) == null ? void 0 : E.$el, {
			transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
			transform: _(u.value) ? `scale(${b}) translate3d(0, ${B}px, 0)` : `scale(${b}) translate3d(${B}px, 0, 0)`
		});
	}
	return {
		open: w,
		isOpen: a,
		modal: D,
		keyboardIsOpen: M,
		hasBeenOpened: c,
		drawerRef: g,
		drawerHeightRef: pe,
		overlayRef: P,
		handleRef: Ae,
		isDragging: f,
		dragStartTime: W,
		isAllowedToDrag: j,
		snapPoints: U,
		activeSnapPoint: h,
		hasSnapPoints: Ne,
		pointerStart: z,
		dismissible: d,
		snapPointsOffset: He,
		direction: u,
		shouldFade: me,
		fadeFromIndex: m,
		shouldScaleBackground: $,
		setBackgroundColorOnScale: T,
		onPress: ke,
		onDrag: Ie,
		onRelease: We,
		closeDrawer: K,
		onNestedDrag: je,
		onNestedRelease: ze,
		onNestedOpenChange: Ve,
		emitClose: i,
		emitDrag: n,
		emitRelease: s,
		emitOpenChange: t,
		nested: v,
		handleOnly: H,
		noBodyStyles: L
	};
}
var St = /* @__PURE__ */ defineComponent({
	__name: "DrawerRoot",
	props: {
		activeSnapPoint: { default: void 0 },
		closeThreshold: { default: pt },
		shouldScaleBackground: {
			type: Boolean,
			default: void 0
		},
		setBackgroundColorOnScale: {
			type: Boolean,
			default: true
		},
		scrollLockTimeout: { default: gt },
		fixed: {
			type: Boolean,
			default: void 0
		},
		dismissible: {
			type: Boolean,
			default: true
		},
		modal: {
			type: Boolean,
			default: true
		},
		open: {
			type: Boolean,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			default: void 0
		},
		nested: {
			type: Boolean,
			default: false
		},
		direction: { default: "bottom" },
		noBodyStyles: { type: Boolean },
		handleOnly: {
			type: Boolean,
			default: false
		},
		preventScrollRestoration: { type: Boolean },
		snapPoints: { default: void 0 },
		fadeFromIndex: { default: void 0 }
	},
	emits: [
		"drag",
		"release",
		"close",
		"update:open",
		"update:activeSnapPoint",
		"animationEnd"
	],
	setup(e, { expose: n, emit: s }) {
		const i = e, t = s;
		useSlots();
		const w = computed(() => i.fadeFromIndex ?? (i.snapPoints && i.snapPoints.length - 1)), d = $e(i, "open", t, {
			defaultValue: i.defaultOpen,
			passive: i.open === void 0
		}), v = $e(i, "activeSnapPoint", t, { passive: i.activeSnapPoint === void 0 }), D = {
			emitDrag: (m) => t("drag", m),
			emitRelease: (m) => t("release", m),
			emitClose: () => t("close"),
			emitOpenChange: (m) => {
				t("update:open", m), setTimeout(() => {
					t("animationEnd", m);
				}, O.DURATION * 1e3);
			}
		}, { closeDrawer: $, hasBeenOpened: T, modal: r, isOpen: l } = ct(yt({
			...D,
			...toRefs(i),
			activeSnapPoint: v,
			fadeFromIndex: w,
			open: d
		}));
		function h(m) {
			if (d.value !== void 0) {
				D.emitOpenChange(m);
				return;
			}
			l.value = m, m ? T.value = true : $();
		}
		return n({ open: l }), (m, u) => (openBlock(), createBlock(unref(DialogRoot_default), {
			open: unref(l),
			modal: unref(r),
			"onUpdate:open": h
		}, {
			default: withCtx(() => [renderSlot(m.$slots, "default", { open: unref(l) })]),
			_: 3
		}, 8, ["open", "modal"]));
	}
});
var _t = /* @__PURE__ */ defineComponent({
	__name: "DrawerRootNested",
	props: {
		activeSnapPoint: {},
		closeThreshold: {},
		shouldScaleBackground: { type: Boolean },
		setBackgroundColorOnScale: { type: Boolean },
		scrollLockTimeout: {},
		fixed: { type: Boolean },
		dismissible: { type: Boolean },
		modal: { type: Boolean },
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		nested: { type: Boolean },
		direction: {},
		noBodyStyles: { type: Boolean },
		handleOnly: { type: Boolean },
		preventScrollRestoration: { type: Boolean },
		snapPoints: {},
		fadeFromIndex: {}
	},
	emits: [
		"drag",
		"release",
		"close",
		"update:open",
		"update:activeSnapPoint",
		"animationEnd"
	],
	setup(e, { emit: n }) {
		const s = e, i = n, { onNestedDrag: t, onNestedOpenChange: w, onNestedRelease: d } = ee();
		function v() {
			w(false);
		}
		function D(r) {
			t(r);
		}
		function $(r) {
			r && w(r), i("update:open", r);
		}
		const T = useForwardPropsEmits(s, i);
		return (r, l) => (openBlock(), createBlock(St, mergeProps(unref(T), {
			nested: "",
			onClose: v,
			onDrag: D,
			onRelease: unref(d),
			"onUpdate:open": $
		}), {
			default: withCtx(() => [renderSlot(r.$slots, "default")]),
			_: 3
		}, 16, ["onRelease"]));
	}
});
var Bt = /* @__PURE__ */ defineComponent({
	__name: "DrawerOverlay",
	setup(e) {
		const { overlayRef: n, hasSnapPoints: s, isOpen: i, shouldFade: t } = ee();
		return (w, d) => (openBlock(), createBlock(unref(DialogOverlay_default), {
			ref_key: "overlayRef",
			ref: n,
			"data-vaul-overlay": "",
			"data-vaul-snap-points": unref(i) && unref(s) ? "true" : "false",
			"data-vaul-snap-points-overlay": unref(i) && unref(t) ? "true" : "false"
		}, null, 8, ["data-vaul-snap-points", "data-vaul-snap-points-overlay"]));
	}
});
function bt() {
	const { direction: e, isOpen: n, shouldScaleBackground: s, setBackgroundColorOnScale: i, noBodyStyles: t } = ee(), w = ref(null), d = ref((void 0).body.style.backgroundColor);
	function v() {
		return ((void 0).innerWidth - Ce) / (void 0).innerWidth;
	}
	watchEffect((D) => {
		if (n.value && s.value) {
			w.value && clearTimeout(w.value);
			const $ = (void 0).querySelector("[data-vaul-drawer-wrapper]") || (void 0).querySelector("[vaul-drawer-wrapper]");
			if (!$) return;
			i.value && !t.value && de((void 0).body, { background: "black" }), de($, {
				transformOrigin: _(e.value) ? "top" : "left",
				transitionProperty: "transform, border-radius",
				transitionDuration: `${O.DURATION}s`,
				transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
			});
			const T = de($, {
				borderRadius: `${Be}px`,
				overflow: "hidden",
				..._(e.value) ? { transform: `scale(${v()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)` } : { transform: `scale(${v()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)` }
			});
			D(() => {
				T(), w.value = (void 0).setTimeout(() => {
					d.value ? (void 0).body.style.background = d.value : (void 0).body.style.removeProperty("background");
				}, O.DURATION * 1e3);
			});
		}
	}, { flush: "pre" });
}
var Ct = /* @__PURE__ */ defineComponent({
	__name: "DrawerContent",
	setup(e) {
		const { open: n, isOpen: s, snapPointsOffset: i, hasSnapPoints: t, drawerRef: w, onPress: d, onDrag: v, onRelease: D, modal: $, emitOpenChange: T, dismissible: r, keyboardIsOpen: l, closeDrawer: h, direction: m, handleOnly: u } = ee();
		bt();
		const L = ref(false), H = computed(() => i.value && i.value.length > 0 ? `${i.value[0]}px` : "0");
		function p(f) {
			if (!$.value || f.defaultPrevented) {
				f.preventDefault();
				return;
			}
			l.value && (l.value = false), r.value ? T(false) : f.preventDefault();
		}
		function a(f) {
			u.value || d(f);
		}
		function c(f) {
			u.value || v(f);
		}
		return watchEffect(() => {
			t.value && (void 0).requestAnimationFrame(() => {
				L.value = true;
			});
		}), (f, y) => (openBlock(), createBlock(unref(DialogContent_default), {
			ref_key: "drawerRef",
			ref: w,
			"data-vaul-drawer": "",
			"data-vaul-drawer-direction": unref(m),
			"data-vaul-delayed-snap-points": L.value ? "true" : "false",
			"data-vaul-snap-points": unref(s) && unref(t) ? "true" : "false",
			style: normalizeStyle({ "--snap-point-height": H.value }),
			onPointerdown: a,
			onPointermove: c,
			onPointerup: unref(D),
			onPointerDownOutside: p,
			onOpenAutoFocus: y[0] || (y[0] = withModifiers(() => {}, ["prevent"])),
			onEscapeKeyDown: y[1] || (y[1] = (P) => {
				unref(r) || P.preventDefault();
			})
		}, {
			default: withCtx(() => [renderSlot(f.$slots, "default")]),
			_: 3
		}, 8, [
			"data-vaul-drawer-direction",
			"data-vaul-delayed-snap-points",
			"data-vaul-snap-points",
			"style",
			"onPointerup"
		]));
	}
});
var $t = ["data-vaul-drawer-visible"];
var Ot = {
	"data-vaul-handle-hitarea": "",
	"aria-hidden": "true"
};
var Tt = 250;
var Pt = 120;
var Nt = /* @__PURE__ */ defineComponent({
	__name: "DrawerHandle",
	props: { preventCycle: {
		type: Boolean,
		default: false
	} },
	setup(e) {
		const n = e, { onPress: s, onDrag: i, handleRef: t, handleOnly: w, isOpen: d, snapPoints: v, activeSnapPoint: D, isDragging: $, dismissible: T, closeDrawer: r } = ee(), l = ref(null), h = ref(false);
		function m() {
			if (h.value) {
				H();
				return;
			}
			(void 0).setTimeout(() => {
				u();
			}, Pt);
		}
		function u() {
			if ($.value || n.preventCycle || h.value) {
				H();
				return;
			}
			if (H(), !v.value || v.value.length === 0) {
				T.value || r();
				return;
			}
			const c = D.value === v.value[v.value.length - 1];
			if (c && T.value) {
				r();
				return;
			}
			const f = v.value.findIndex((P) => P === D.value);
			if (f === -1) return;
			const y = c ? 0 : f + 1;
			D.value = v.value[y];
		}
		function L() {
			l.value = (void 0).setTimeout(() => {
				h.value = true;
			}, Tt);
		}
		function H() {
			l.value && (void 0).clearTimeout(l.value), h.value = false;
		}
		function p(c) {
			w.value && s(c), L();
		}
		function a(c) {
			w.value && i(c);
		}
		return (c, f) => (openBlock(), createElementBlock("div", {
			ref_key: "handleRef",
			ref: t,
			"data-vaul-drawer-visible": unref(d) ? "true" : "false",
			"data-vaul-handle": "",
			"aria-hidden": "true",
			onClick: m,
			onPointercancel: H,
			onPointerdown: p,
			onPointermove: a
		}, [createElementVNode("span", Ot, [renderSlot(c.$slots, "default")])], 40, $t));
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdrawer.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdrawer_default = {
	"slots": {
		"overlay": "fixed inset-0 bg-elevated/75",
		"content": "fixed bg-default ring ring-default flex focus:outline-none",
		"handle": ["shrink-0 !bg-accented", "transition-opacity"],
		"container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
		"header": "flex items-center gap-1.5 min-h-8",
		"wrapper": "min-w-0 flex-1",
		"title": "text-highlighted font-semibold",
		"description": "mt-1 text-muted text-sm",
		"actions": "flex items-center gap-1.5 shrink-0 ms-auto",
		"body": "flex-1",
		"footer": "flex flex-col gap-1.5",
		"close": ""
	},
	"variants": {
		"direction": {
			"top": {
				"content": "mb-24 flex-col-reverse",
				"handle": "mb-4"
			},
			"right": {
				"content": "flex-row rtl:flex-row-reverse",
				"handle": "!ml-4"
			},
			"bottom": {
				"content": "mt-24 flex-col",
				"handle": "mt-4"
			},
			"left": {
				"content": "flex-row-reverse rtl:flex-row",
				"handle": "!mr-4"
			}
		},
		"inset": { "true": { "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]" } },
		"snapPoints": { "true": "" }
	},
	"compoundVariants": [
		{
			"direction": ["top", "bottom"],
			"class": {
				"content": "h-auto max-h-[96%]",
				"handle": "!w-12 !h-1.5 mx-auto"
			}
		},
		{
			"direction": ["top", "bottom"],
			"snapPoints": true,
			"class": { "content": "h-full" }
		},
		{
			"direction": ["right", "left"],
			"class": {
				"content": "w-auto max-w-[calc(100%-2rem)]",
				"handle": "!h-12 !w-1.5 mt-auto mb-auto"
			}
		},
		{
			"direction": ["right", "left"],
			"snapPoints": true,
			"class": { "content": "w-full" }
		},
		{
			"direction": "top",
			"inset": true,
			"class": { "content": "inset-x-4 top-4" }
		},
		{
			"direction": "top",
			"inset": false,
			"class": { "content": "inset-x-0 top-0 rounded-b-lg" }
		},
		{
			"direction": "bottom",
			"inset": true,
			"class": { "content": "inset-x-4 bottom-4" }
		},
		{
			"direction": "bottom",
			"inset": false,
			"class": { "content": "inset-x-0 bottom-0 rounded-t-lg" }
		},
		{
			"direction": "left",
			"inset": true,
			"class": { "content": "inset-y-4 left-4" }
		},
		{
			"direction": "left",
			"inset": false,
			"class": { "content": "inset-y-0 left-0 rounded-r-lg" }
		},
		{
			"direction": "right",
			"inset": true,
			"class": { "content": "inset-y-4 right-4" }
		},
		{
			"direction": "right",
			"inset": false,
			"class": { "content": "inset-y-0 right-0 rounded-l-lg" }
		}
	]
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue
var _sfc_main$6 = {
	__name: "UDrawer",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		inset: {
			type: Boolean,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		overlay: {
			type: Boolean,
			required: false,
			default: true
		},
		handle: {
			type: Boolean,
			required: false,
			default: true
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		nested: {
			type: Boolean,
			required: false
		},
		close: {
			type: [Boolean, Object],
			required: false
		},
		closeIcon: {
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
		},
		activeSnapPoint: {
			type: [
				Number,
				String,
				null
			],
			required: false
		},
		closeThreshold: {
			type: Number,
			required: false
		},
		shouldScaleBackground: {
			type: Boolean,
			required: false
		},
		setBackgroundColorOnScale: {
			type: Boolean,
			required: false
		},
		scrollLockTimeout: {
			type: Number,
			required: false
		},
		fixed: {
			type: Boolean,
			required: false
		},
		dismissible: {
			type: Boolean,
			required: false,
			default: true
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		},
		open: {
			type: Boolean,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		direction: {
			type: String,
			required: false,
			default: "bottom"
		},
		noBodyStyles: {
			type: Boolean,
			required: false
		},
		handleOnly: {
			type: Boolean,
			required: false
		},
		preventScrollRestoration: {
			type: Boolean,
			required: false
		},
		snapPoints: {
			type: Array,
			required: false
		}
	},
	emits: [
		"close:prevent",
		"drag",
		"release",
		"close",
		"update:open",
		"update:activeSnapPoint",
		"animationEnd"
	],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("drawer", _props);
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => props.content);
		const contentEvents = computed(() => {
			if (!props.dismissible) return ["interactOutside", "escapeKeyDown"].reduce((acc, curr) => {
				acc[curr] = (e) => {
					e.preventDefault();
					emits("close:prevent");
				};
				return acc;
			}, {});
			return { pointerDownOutside };
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdrawer_default,
			...appConfig.ui?.drawer || {}
		})({
			direction: props.direction,
			inset: props.inset,
			snapPoints: props.snapPoints && props.snapPoints.length > 0
		}));
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(props).nested ? unref(_t) : unref(St)), mergeProps(unref(rootProps), _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(DialogTrigger_default), {
							"as-child": "",
							class: unref(props).class
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default")];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(DialogPortal_default), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											if (unref(props).overlay) _push(ssrRenderComponent(unref(Bt), {
												"data-slot": "overlay",
												class: ui.value.overlay({ class: unref(props).ui?.overlay })
											}, null, _parent, _scopeId));
											else _push(`<!---->`);
											_push(ssrRenderComponent(unref(Ct), mergeProps({
												"data-slot": "content",
												class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
											}, contentProps.value, toHandlers(contentEvents.value)), {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														if (unref(props).handle) _push(ssrRenderComponent(unref(Nt), {
															"data-slot": "handle",
															class: ui.value.handle({ class: unref(props).ui?.handle })
														}, null, _parent, _scopeId));
														else _push(`<!---->`);
														if (!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content) _push(ssrRenderComponent(unref(VisuallyHidden_default), null, {
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) {
																	if (!unref(props).title && !slots.title) _push(ssrRenderComponent(unref(DialogTitle_default), null, null, _parent, _scopeId));
																	else if (!!slots.content) _push(ssrRenderComponent(unref(DialogTitle_default), null, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
																				_push(`${ssrInterpolate(unref(props).title)}`);
																			}, _push, _parent, _scopeId);
																			else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])];
																		}),
																		_: 3
																	}, _parent, _scopeId));
																	else _push(`<!---->`);
																	if (!unref(props).description && !slots.description) _push(ssrRenderComponent(unref(DialogDescription_default), null, null, _parent, _scopeId));
																	else if (!!slots.content) _push(ssrRenderComponent(unref(DialogDescription_default), null, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) ssrRenderSlot(_ctx.$slots, "description", {}, () => {
																				_push(`${ssrInterpolate(unref(props).description)}`);
																			}, _push, _parent, _scopeId);
																			else return [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])];
																		}),
																		_: 3
																	}, _parent, _scopeId));
																	else _push(`<!---->`);
																} else return [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
																	default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
																	_: 3
																})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
																	default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
																	_: 3
																})) : createCommentVNode("", true)];
															}),
															_: 3
														}, _parent, _scopeId));
														else _push(`<!---->`);
														ssrRenderSlot(_ctx.$slots, "content", {}, () => {
															_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
															if (!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close || !!slots.actions) {
																_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}"${_scopeId}>`);
																ssrRenderSlot(_ctx.$slots, "header", {}, () => {
																	if (unref(props).title || !!slots.title || unref(props).description || !!slots.description) {
																		_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId}>`);
																		if (unref(props).title || !!slots.title) _push(ssrRenderComponent(unref(DialogTitle_default), {
																			"data-slot": "title",
																			class: ui.value.title({ class: unref(props).ui?.title })
																		}, {
																			default: withCtx((_, _push, _parent, _scopeId) => {
																				if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
																					_push(`${ssrInterpolate(unref(props).title)}`);
																				}, _push, _parent, _scopeId);
																				else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])];
																			}),
																			_: 3
																		}, _parent, _scopeId));
																		else _push(`<!---->`);
																		if (unref(props).description || !!slots.description) _push(ssrRenderComponent(unref(DialogDescription_default), {
																			"data-slot": "description",
																			class: ui.value.description({ class: unref(props).ui?.description })
																		}, {
																			default: withCtx((_, _push, _parent, _scopeId) => {
																				if (_push) ssrRenderSlot(_ctx.$slots, "description", {}, () => {
																					_push(`${ssrInterpolate(unref(props).description)}`);
																				}, _push, _parent, _scopeId);
																				else return [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])];
																			}),
																			_: 3
																		}, _parent, _scopeId));
																		else _push(`<!---->`);
																		_push(`</div>`);
																	} else _push(`<!---->`);
																	if (!!slots.actions || unref(props).close || !!slots.close) {
																		_push(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: unref(props).ui?.actions }))}"${_scopeId}>`);
																		ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent, _scopeId);
																		if (unref(props).close || !!slots.close) _push(ssrRenderComponent(unref(DialogClose_default), { "as-child": "" }, {
																			default: withCtx((_, _push, _parent, _scopeId) => {
																				if (_push) ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
																					if (unref(props).close) _push(ssrRenderComponent(_sfc_main$b, mergeProps({
																						icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
																						color: "neutral",
																						variant: "ghost",
																						"aria-label": unref(t)("drawer.close")
																					}, typeof unref(props).close === "object" ? unref(props).close : {}, {
																						"data-slot": "close",
																						class: ui.value.close({ class: unref(props).ui?.close })
																					}), null, _parent, _scopeId));
																					else _push(`<!---->`);
																				}, _push, _parent, _scopeId);
																				else return [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
																					key: 0,
																					icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
																					color: "neutral",
																					variant: "ghost",
																					"aria-label": unref(t)("drawer.close")
																				}, typeof unref(props).close === "object" ? unref(props).close : {}, {
																					"data-slot": "close",
																					class: ui.value.close({ class: unref(props).ui?.close })
																				}), null, 16, [
																					"icon",
																					"aria-label",
																					"class"
																				])) : createCommentVNode("", true)])];
																			}),
																			_: 3
																		}, _parent, _scopeId));
																		else _push(`<!---->`);
																		_push(`</div>`);
																	} else _push(`<!---->`);
																}, _push, _parent, _scopeId);
																_push(`</div>`);
															} else _push(`<!---->`);
															if (!!slots.body) {
																_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}"${_scopeId}>`);
																ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent, _scopeId);
																_push(`</div>`);
															} else _push(`<!---->`);
															if (!!slots.footer) {
																_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}"${_scopeId}>`);
																ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
																_push(`</div>`);
															} else _push(`<!---->`);
															_push(`</div>`);
														}, _push, _parent, _scopeId);
													} else return [
														unref(props).handle ? (openBlock(), createBlock(unref(Nt), {
															key: 0,
															"data-slot": "handle",
															class: ui.value.handle({ class: unref(props).ui?.handle })
														}, null, 8, ["class"])) : createCommentVNode("", true),
														!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
															default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
																_: 3
															})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
																_: 3
															})) : createCommentVNode("", true)]),
															_: 3
														})) : createCommentVNode("", true),
														renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
															"data-slot": "container",
															class: ui.value.container({ class: unref(props).ui?.container })
														}, [
															!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close || !!slots.actions ? (openBlock(), createBlock("div", {
																key: 0,
																"data-slot": "header",
																class: ui.value.header({ class: unref(props).ui?.header })
															}, [renderSlot(_ctx.$slots, "header", {}, () => [unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
																key: 0,
																"data-slot": "wrapper",
																class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
															}, [unref(props).title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
																key: 0,
																"data-slot": "title",
																class: ui.value.title({ class: unref(props).ui?.title })
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
																_: 3
															}, 8, ["class"])) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
																key: 1,
																"data-slot": "description",
																class: ui.value.description({ class: unref(props).ui?.description })
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
																_: 3
															}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true), !!slots.actions || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
																key: 1,
																"data-slot": "actions",
																class: ui.value.actions({ class: unref(props).ui?.actions })
															}, [renderSlot(_ctx.$slots, "actions"), unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
																key: 0,
																"as-child": ""
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
																	key: 0,
																	icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
																	color: "neutral",
																	variant: "ghost",
																	"aria-label": unref(t)("drawer.close")
																}, typeof unref(props).close === "object" ? unref(props).close : {}, {
																	"data-slot": "close",
																	class: ui.value.close({ class: unref(props).ui?.close })
																}), null, 16, [
																	"icon",
																	"aria-label",
																	"class"
																])) : createCommentVNode("", true)])]),
																_: 3
															})) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
															!!slots.body ? (openBlock(), createBlock("div", {
																key: 1,
																"data-slot": "body",
																class: ui.value.body({ class: unref(props).ui?.body })
															}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
															!!slots.footer ? (openBlock(), createBlock("div", {
																key: 2,
																"data-slot": "footer",
																class: ui.value.footer({ class: unref(props).ui?.footer })
															}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
														], 2)])
													];
												}),
												_: 3
											}, _parent, _scopeId));
										} else return [unref(props).overlay ? (openBlock(), createBlock(unref(Bt), {
											key: 0,
											"data-slot": "overlay",
											class: ui.value.overlay({ class: unref(props).ui?.overlay })
										}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(Ct), mergeProps({
											"data-slot": "content",
											class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
										}, contentProps.value, toHandlers(contentEvents.value)), {
											default: withCtx(() => [
												unref(props).handle ? (openBlock(), createBlock(unref(Nt), {
													key: 0,
													"data-slot": "handle",
													class: ui.value.handle({ class: unref(props).ui?.handle })
												}, null, 8, ["class"])) : createCommentVNode("", true),
												!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
													default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
														_: 3
													})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
														_: 3
													})) : createCommentVNode("", true)]),
													_: 3
												})) : createCommentVNode("", true),
												renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
													"data-slot": "container",
													class: ui.value.container({ class: unref(props).ui?.container })
												}, [
													!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close || !!slots.actions ? (openBlock(), createBlock("div", {
														key: 0,
														"data-slot": "header",
														class: ui.value.header({ class: unref(props).ui?.header })
													}, [renderSlot(_ctx.$slots, "header", {}, () => [unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
														key: 0,
														"data-slot": "wrapper",
														class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
													}, [unref(props).title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
														key: 0,
														"data-slot": "title",
														class: ui.value.title({ class: unref(props).ui?.title })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
														_: 3
													}, 8, ["class"])) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
														key: 1,
														"data-slot": "description",
														class: ui.value.description({ class: unref(props).ui?.description })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
														_: 3
													}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true), !!slots.actions || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
														key: 1,
														"data-slot": "actions",
														class: ui.value.actions({ class: unref(props).ui?.actions })
													}, [renderSlot(_ctx.$slots, "actions"), unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
														key: 0,
														"as-child": ""
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
															key: 0,
															icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
															color: "neutral",
															variant: "ghost",
															"aria-label": unref(t)("drawer.close")
														}, typeof unref(props).close === "object" ? unref(props).close : {}, {
															"data-slot": "close",
															class: ui.value.close({ class: unref(props).ui?.close })
														}), null, 16, [
															"icon",
															"aria-label",
															"class"
														])) : createCommentVNode("", true)])]),
														_: 3
													})) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
													!!slots.body ? (openBlock(), createBlock("div", {
														key: 1,
														"data-slot": "body",
														class: ui.value.body({ class: unref(props).ui?.body })
													}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
													!!slots.footer ? (openBlock(), createBlock("div", {
														key: 2,
														"data-slot": "footer",
														class: ui.value.footer({ class: unref(props).ui?.footer })
													}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
												], 2)])
											]),
											_: 3
										}, 16, ["class"])];
									}),
									_: 3
								}, _parent, _scopeId));
								else return [createVNode(unref(FieldGroupReset), null, {
									default: withCtx(() => [unref(props).overlay ? (openBlock(), createBlock(unref(Bt), {
										key: 0,
										"data-slot": "overlay",
										class: ui.value.overlay({ class: unref(props).ui?.overlay })
									}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(Ct), mergeProps({
										"data-slot": "content",
										class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
									}, contentProps.value, toHandlers(contentEvents.value)), {
										default: withCtx(() => [
											unref(props).handle ? (openBlock(), createBlock(unref(Nt), {
												key: 0,
												"data-slot": "handle",
												class: ui.value.handle({ class: unref(props).ui?.handle })
											}, null, 8, ["class"])) : createCommentVNode("", true),
											!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
												default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
													_: 3
												})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
													_: 3
												})) : createCommentVNode("", true)]),
												_: 3
											})) : createCommentVNode("", true),
											renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
												"data-slot": "container",
												class: ui.value.container({ class: unref(props).ui?.container })
											}, [
												!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close || !!slots.actions ? (openBlock(), createBlock("div", {
													key: 0,
													"data-slot": "header",
													class: ui.value.header({ class: unref(props).ui?.header })
												}, [renderSlot(_ctx.$slots, "header", {}, () => [unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
													key: 0,
													"data-slot": "wrapper",
													class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
												}, [unref(props).title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
													key: 0,
													"data-slot": "title",
													class: ui.value.title({ class: unref(props).ui?.title })
												}, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
													_: 3
												}, 8, ["class"])) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
													key: 1,
													"data-slot": "description",
													class: ui.value.description({ class: unref(props).ui?.description })
												}, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
													_: 3
												}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true), !!slots.actions || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
													key: 1,
													"data-slot": "actions",
													class: ui.value.actions({ class: unref(props).ui?.actions })
												}, [renderSlot(_ctx.$slots, "actions"), unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
													key: 0,
													"as-child": ""
												}, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
														key: 0,
														icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
														color: "neutral",
														variant: "ghost",
														"aria-label": unref(t)("drawer.close")
													}, typeof unref(props).close === "object" ? unref(props).close : {}, {
														"data-slot": "close",
														class: ui.value.close({ class: unref(props).ui?.close })
													}), null, 16, [
														"icon",
														"aria-label",
														"class"
													])) : createCommentVNode("", true)])]),
													_: 3
												})) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
												!!slots.body ? (openBlock(), createBlock("div", {
													key: 1,
													"data-slot": "body",
													class: ui.value.body({ class: unref(props).ui?.body })
												}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
												!!slots.footer ? (openBlock(), createBlock("div", {
													key: 2,
													"data-slot": "footer",
													class: ui.value.footer({ class: unref(props).ui?.footer })
												}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
											], 2)])
										]),
										_: 3
									}, 16, ["class"])]),
									_: 3
								})];
							}),
							_: 3
						}, _parent, _scopeId));
					} else return [!!slots.default ? (openBlock(), createBlock(unref(DialogTrigger_default), {
						key: 0,
						"as-child": "",
						class: unref(props).class
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogPortal_default), unref(portalProps), {
						default: withCtx(() => [createVNode(unref(FieldGroupReset), null, {
							default: withCtx(() => [unref(props).overlay ? (openBlock(), createBlock(unref(Bt), {
								key: 0,
								"data-slot": "overlay",
								class: ui.value.overlay({ class: unref(props).ui?.overlay })
							}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(Ct), mergeProps({
								"data-slot": "content",
								class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
							}, contentProps.value, toHandlers(contentEvents.value)), {
								default: withCtx(() => [
									unref(props).handle ? (openBlock(), createBlock(unref(Nt), {
										key: 0,
										"data-slot": "handle",
										class: ui.value.handle({ class: unref(props).ui?.handle })
									}, null, 8, ["class"])) : createCommentVNode("", true),
									!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
										default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
											_: 3
										})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
											_: 3
										})) : createCommentVNode("", true)]),
										_: 3
									})) : createCommentVNode("", true),
									renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
										"data-slot": "container",
										class: ui.value.container({ class: unref(props).ui?.container })
									}, [
										!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close || !!slots.actions ? (openBlock(), createBlock("div", {
											key: 0,
											"data-slot": "header",
											class: ui.value.header({ class: unref(props).ui?.header })
										}, [renderSlot(_ctx.$slots, "header", {}, () => [unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
											key: 0,
											"data-slot": "wrapper",
											class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
										}, [unref(props).title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
											key: 0,
											"data-slot": "title",
											class: ui.value.title({ class: unref(props).ui?.title })
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
											_: 3
										}, 8, ["class"])) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
											key: 1,
											"data-slot": "description",
											class: ui.value.description({ class: unref(props).ui?.description })
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
											_: 3
										}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true), !!slots.actions || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
											key: 1,
											"data-slot": "actions",
											class: ui.value.actions({ class: unref(props).ui?.actions })
										}, [renderSlot(_ctx.$slots, "actions"), unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
											key: 0,
											"as-child": ""
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
												key: 0,
												icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
												color: "neutral",
												variant: "ghost",
												"aria-label": unref(t)("drawer.close")
											}, typeof unref(props).close === "object" ? unref(props).close : {}, {
												"data-slot": "close",
												class: ui.value.close({ class: unref(props).ui?.close })
											}), null, 16, [
												"icon",
												"aria-label",
												"class"
											])) : createCommentVNode("", true)])]),
											_: 3
										})) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
										!!slots.body ? (openBlock(), createBlock("div", {
											key: 1,
											"data-slot": "body",
											class: ui.value.body({ class: unref(props).ui?.body })
										}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
										!!slots.footer ? (openBlock(), createBlock("div", {
											key: 2,
											"data-slot": "footer",
											class: ui.value.footer({ class: unref(props).ui?.footer })
										}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
									], 2)])
								]),
								_: 3
							}, 16, ["class"])]),
							_: 3
						})]),
						_: 3
					}, 16)];
				}),
				_: 3
			}), _parent);
		};
	}
};
var _sfc_setup$8 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-sidebar.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_default = {
	"slots": {
		"root": "relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0",
		"header": "h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4",
		"body": "flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2",
		"footer": "shrink-0 flex items-center gap-1.5 px-4 py-2",
		"toggle": "",
		"handle": "",
		"content": "lg:hidden",
		"overlay": "lg:hidden"
	},
	"variants": {
		"menu": { "true": {
			"header": "sm:px-6",
			"body": "sm:px-6",
			"footer": "sm:px-6"
		} },
		"side": {
			"left": { "root": "border-e border-default" },
			"right": { "root": "" }
		},
		"toggleSide": {
			"left": { "toggle": "" },
			"right": { "toggle": "ms-auto" }
		}
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebar.vue
var _sfc_main$5 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UDashboardSidebar",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		mode: {
			type: null,
			required: false,
			default: "slideover"
		},
		menu: {
			type: null,
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
		autoClose: {
			type: Boolean,
			required: false,
			default: true
		},
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
		side: {
			type: String,
			required: false,
			default: "left"
		},
		minSize: {
			type: Number,
			required: false,
			default: 10
		},
		maxSize: {
			type: Number,
			required: false,
			default: 20
		},
		defaultSize: {
			type: Number,
			required: false,
			default: 15
		},
		resizable: {
			type: Boolean,
			required: false,
			default: false
		},
		collapsible: {
			type: Boolean,
			required: false,
			default: false
		},
		collapsedSize: {
			type: Number,
			required: false,
			default: 0
		}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {},
		"collapsed": {
			type: Boolean,
			default: false
		},
		"collapsedModifiers": {}
	}),
	emits: ["update:open", "update:collapsed"],
	setup(__props) {
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("dashboardSidebar", _props);
		const open = useModel(__props, "open", {
			type: Boolean,
			default: false
		});
		const collapsed = useModel(__props, "collapsed", {
			type: Boolean,
			default: false
		});
		const route = useRoute();
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const dashboardContext = useDashboard({
			storageKey: "dashboard",
			unit: "%",
			sidebarOpen: ref(false),
			sidebarCollapsed: ref(false)
		});
		const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`;
		const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({
			...dashboardContext,
			...props
		})), { collapsed });
		const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
		const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate();
		useRuntimeHook("dashboard:sidebar:toggle", () => {
			open.value = !open.value;
		});
		useRuntimeHook("dashboard:sidebar:collapse", (value) => {
			isCollapsed.value = value;
		});
		watch(open, () => dashboardContext.sidebarOpen.value = open.value, { immediate: true });
		watch(isCollapsed, () => dashboardContext.sidebarCollapsed.value = isCollapsed.value, { immediate: true });
		watch(() => route.fullPath, () => {
			if (!props.autoClose) return;
			open.value = false;
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_sidebar_default,
			...appConfig.ui?.dashboardSidebar || {}
		})({ side: props.side }));
		const Menu = computed(() => ({
			slideover: _sfc_main$9,
			modal: _sfc_main$8,
			drawer: _sfc_main$6
		})[props.mode]);
		const menuProps = toRef(() => defu(props.menu, {}, props.mode === "modal" ? {
			fullscreen: true,
			transition: false
		} : props.mode === "slideover" ? { side: "left" } : {}));
		function toggleOpen() {
			open.value = !open.value;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineToggleTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "toggle", {
						open: open.value,
						toggle: toggleOpen,
						ui: ui.value
					}, () => {
						if (unref(props).toggle) _push(ssrRenderComponent(_sfc_main$a, mergeProps(typeof unref(props).toggle === "object" ? unref(props).toggle : {}, {
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
						open: open.value,
						toggle: toggleOpen,
						ui: ui.value
					}, () => [unref(props).toggle ? (openBlock(), createBlock(_sfc_main$a, mergeProps({ key: 0 }, typeof unref(props).toggle === "object" ? unref(props).toggle : {}, {
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
			_push(ssrRenderComponent(unref(DefineResizeHandleTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "resize-handle", {
						onMouseDown: unref(onMouseDown),
						onTouchStart: unref(onTouchStart),
						onDoubleClick: unref(onDoubleClick),
						ui: ui.value
					}, () => {
						if (unref(props).resizable) _push(ssrRenderComponent(_sfc_main$1$1, {
							"aria-controls": id,
							"data-slot": "handle",
							class: ui.value.handle({ class: unref(props).ui?.handle }),
							onMousedown: unref(onMouseDown),
							onTouchstart: unref(onTouchStart),
							onDblclick: unref(onDoubleClick)
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "resize-handle", {
						onMouseDown: unref(onMouseDown),
						onTouchStart: unref(onTouchStart),
						onDoubleClick: unref(onDoubleClick),
						ui: ui.value
					}, () => [unref(props).resizable ? (openBlock(), createBlock(_sfc_main$1$1, {
						key: 0,
						"aria-controls": id,
						"data-slot": "handle",
						class: ui.value.handle({ class: unref(props).ui?.handle }),
						onMousedown: unref(onMouseDown),
						onTouchstart: unref(onTouchStart),
						onDblclick: unref(onDoubleClick)
					}, null, 8, [
						"class",
						"onMousedown",
						"onTouchstart",
						"onDblclick"
					])) : createCommentVNode("", true)])];
				}),
				_: 3
			}, _parent));
			if (unref(props).side === "right") _push(ssrRenderComponent(unref(ReuseResizeHandleTemplate), null, null, _parent));
			else _push(`<!---->`);
			_push(`<div${ssrRenderAttrs(mergeProps({
				id,
				ref_key: "el",
				ref: el,
				"data-slot": "root"
			}, _ctx.$attrs, {
				"data-collapsed": unref(isCollapsed),
				"data-dragging": unref(isDragging),
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
				style: { "--width": `${unref(size) || 0}${unref(dashboardContext).unit}` }
			}))}>`);
			if (!!slots.header) {
				_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}">`);
				ssrRenderSlot(_ctx.$slots, "header", {
					collapsed: unref(isCollapsed),
					collapse: unref(collapse)
				}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}">`);
			ssrRenderSlot(_ctx.$slots, "default", {
				collapsed: unref(isCollapsed),
				collapse: unref(collapse)
			}, null, _push, _parent);
			_push(`</div>`);
			if (!!slots.footer) {
				_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}">`);
				ssrRenderSlot(_ctx.$slots, "footer", {
					collapsed: unref(isCollapsed),
					collapse: unref(collapse)
				}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (unref(props).side === "left") _push(ssrRenderComponent(unref(ReuseResizeHandleTemplate), null, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(unref(Menu), mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: unref(t)("dashboardSidebar.title"),
				description: unref(t)("dashboardSidebar.description")
			}, menuProps.value, { ui: {
				overlay: ui.value.overlay({ class: unref(props).ui?.overlay }),
				content: ui.value.content({ class: unref(props).ui?.content })
			} }), {
				content: withCtx((contentData, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "content", contentData, () => {
						if (!!slots.header || unref(props).mode !== "drawer") {
							_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({
								class: unref(props).ui?.header,
								menu: true
							}))}"${_scopeId}>`);
							if (unref(props).mode !== "drawer" && unref(props).toggleSide === "left") _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
							else _push(`<!---->`);
							ssrRenderSlot(_ctx.$slots, "header", {
								collapsed: false,
								collapse: () => {}
							}, null, _push, _parent, _scopeId);
							if (unref(props).mode !== "drawer" && unref(props).toggleSide === "right") _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({
							class: unref(props).ui?.body,
							menu: true
						}))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {
							collapsed: false,
							collapse: () => {}
						}, null, _push, _parent, _scopeId);
						_push(`</div>`);
						if (!!slots.footer) {
							_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({
								class: unref(props).ui?.footer,
								menu: true
							}))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "footer", {
								collapsed: false,
								collapse: () => {}
							}, null, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "content", contentData, () => [
						!!slots.header || unref(props).mode !== "drawer" ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "header",
							class: ui.value.header({
								class: unref(props).ui?.header,
								menu: true
							})
						}, [
							unref(props).mode !== "drawer" && unref(props).toggleSide === "left" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true),
							renderSlot(_ctx.$slots, "header", {
								collapsed: false,
								collapse: () => {}
							}),
							unref(props).mode !== "drawer" && unref(props).toggleSide === "right" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 1 })) : createCommentVNode("", true)
						], 2)) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "body",
							class: ui.value.body({
								class: unref(props).ui?.body,
								menu: true
							})
						}, [renderSlot(_ctx.$slots, "default", {
							collapsed: false,
							collapse: () => {}
						})], 2),
						!!slots.footer ? (openBlock(), createBlock("div", {
							key: 1,
							"data-slot": "footer",
							class: ui.value.footer({
								class: unref(props).ui?.footer,
								menu: true
							})
						}, [renderSlot(_ctx.$slots, "footer", {
							collapsed: false,
							collapse: () => {}
						})], 2)) : createCommentVNode("", true)
					])];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$7 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebar.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-search-button.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_search_button_default = {
	"slots": {
		"base": "",
		"label": "",
		"trailing": "hidden lg:flex items-center gap-0.5 ms-auto"
	},
	"variants": { "collapsed": { "true": {
		"label": "hidden",
		"trailing": "lg:hidden"
	} } }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSearchButton.vue
var _sfc_main$4 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UDashboardSearchButton",
	__ssrInlineRender: true,
	props: {
		icon: {
			type: [String, Boolean],
			required: false,
			skipCheck: true
		},
		label: {
			type: String,
			required: false
		},
		color: {
			type: null,
			required: false,
			default: "neutral"
		},
		variant: {
			type: null,
			required: false
		},
		collapsed: {
			type: Boolean,
			required: false,
			default: false
		},
		tooltip: {
			type: [Boolean, Object],
			required: false,
			default: false
		},
		kbds: {
			type: Array,
			required: false,
			default: () => ["meta", "k"]
		},
		ui: {
			type: Object,
			required: false
		},
		class: {
			type: null,
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
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("dashboardSearchButton", _props);
		const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();
		const getProxySlots = () => omit(slots, ["trailing"]);
		const buttonProps = useForwardProps(reactiveOmit(props, "icon", "label", "variant", "collapsed", "tooltip", "kbds", "class", "ui"));
		const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, {
			delayDuration: 0,
			content: { side: "right" }
		}));
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const { toggleSearch } = useDashboard({ toggleSearch: () => {} });
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_search_button_default,
			...appConfig.ui?.dashboardSearchButton || {}
		})({ collapsed: props.collapsed }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineButtonTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_sfc_main$b, mergeProps({
						icon: unref(props).icon === false ? void 0 : unref(props).icon ?? unref(appConfig).ui.icons.search,
						label: unref(props).label || unref(t)("dashboardSearchButton.label"),
						variant: unref(props).variant || (unref(props).collapsed ? "ghost" : "outline")
					}, {
						...unref(buttonProps),
						...unref(props).collapsed ? {
							"square": true,
							"aria-label": unref(props).label || unref(t)("dashboardSearchButton.label")
						} : {},
						..._ctx.$attrs
					}, {
						class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] }),
						ui: unref(transformUI)(ui.value, unref(props).ui),
						onClick: unref(toggleSearch)
					}), createSlots({
						trailing: withCtx(({ ui: uiProxy }, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "trailing", { ui: uiProxy }, () => {
									if (unref(props).kbds?.length) {
										_push(`<!--[-->`);
										ssrRenderList(unref(props).kbds, (kbd, index) => {
											_push(ssrRenderComponent(_sfc_main$c, mergeProps({
												key: index,
												variant: "subtle"
											}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									} else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else return [createVNode("span", {
								"data-slot": "trailing",
								class: ui.value.trailing({ class: unref(props).ui?.trailing })
							}, [renderSlot(_ctx.$slots, "trailing", { ui: uiProxy }, () => [unref(props).kbds?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(props).kbds, (kbd, index) => {
								return openBlock(), createBlock(_sfc_main$c, mergeProps({
									key: index,
									variant: "subtle"
								}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16);
							}), 128)) : createCommentVNode("", true)])], 2)];
						}),
						_: 2
					}, [renderList(getProxySlots(), (_, name) => {
						return {
							name,
							fn: withCtx((slotData, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, name, slotData, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, name, slotData)];
							})
						};
					})]), _parent, _scopeId));
					else return [createVNode(_sfc_main$b, mergeProps({
						icon: unref(props).icon === false ? void 0 : unref(props).icon ?? unref(appConfig).ui.icons.search,
						label: unref(props).label || unref(t)("dashboardSearchButton.label"),
						variant: unref(props).variant || (unref(props).collapsed ? "ghost" : "outline")
					}, {
						...unref(buttonProps),
						...unref(props).collapsed ? {
							"square": true,
							"aria-label": unref(props).label || unref(t)("dashboardSearchButton.label")
						} : {},
						..._ctx.$attrs
					}, {
						class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] }),
						ui: unref(transformUI)(ui.value, unref(props).ui),
						onClick: unref(toggleSearch)
					}), createSlots({
						trailing: withCtx(({ ui: uiProxy }) => [createVNode("span", {
							"data-slot": "trailing",
							class: ui.value.trailing({ class: unref(props).ui?.trailing })
						}, [renderSlot(_ctx.$slots, "trailing", { ui: uiProxy }, () => [unref(props).kbds?.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(props).kbds, (kbd, index) => {
							return openBlock(), createBlock(_sfc_main$c, mergeProps({
								key: index,
								variant: "subtle"
							}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16);
						}), 128)) : createCommentVNode("", true)])], 2)]),
						_: 2
					}, [renderList(getProxySlots(), (_, name) => {
						return {
							name,
							fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, slotData)])
						};
					})]), 1040, [
						"icon",
						"label",
						"variant",
						"class",
						"ui",
						"onClick"
					])];
				}),
				_: 3
			}, _parent));
			if (unref(props).collapsed && unref(props).tooltip) _push(ssrRenderComponent(_sfc_main$d, mergeProps({ text: unref(props).label || unref(t)("dashboardSearchButton.label") }, tooltipProps.value), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(ReuseButtonTemplate), null, null, _parent, _scopeId));
					else return [createVNode(unref(ReuseButtonTemplate))];
				}),
				_: 1
			}, _parent));
			else _push(ssrRenderComponent(unref(ReuseButtonTemplate), null, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$6 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSearchButton.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpopover.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpopover_default = { "slots": {
	"content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
	"arrow": "fill-bg stroke-default"
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Popover.vue
var _sfc_main$3 = {
	__name: "UPopover",
	__ssrInlineRender: true,
	props: {
		mode: {
			type: null,
			required: false,
			default: "click"
		},
		content: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		reference: {
			type: null,
			required: false
		},
		dismissible: {
			type: Boolean,
			required: false,
			default: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		modal: {
			type: Boolean,
			required: false
		},
		openDelay: {
			type: Number,
			required: false,
			default: 0
		},
		closeDelay: {
			type: Number,
			required: false,
			default: 0
		},
		enableTouch: {
			type: Boolean,
			required: false
		}
	},
	emits: ["close:prevent", "update:open"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("popover", _props);
		const appConfig = useAppConfig();
		const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay", "enableTouch") : reactivePick(props, "defaultOpen", "open", "modal");
		const rootProps = useForwardProps(pick, emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const contentEvents = computed(() => {
			if (!props.dismissible) return ["interactOutside", "escapeKeyDown"].reduce((acc, curr) => {
				acc[curr] = (e) => {
					e.preventDefault();
					emits("close:prevent");
				};
				return acc;
			}, {});
			return { pointerDownOutside };
		});
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpopover_default,
			...appConfig.ui?.popover || {}
		})({ side: contentProps.value.side }));
		const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Component).Root, mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(Component).Trigger, {
							"as-child": "",
							class: unref(props).class
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						if ("Anchor" in Component.value && !!slots.anchor) _push(ssrRenderComponent(unref(Component).Anchor, { "as-child": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "anchor", close ? { close } : {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "anchor", close ? { close } : {})];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(Component).Portal, unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(unref(Component).Content, mergeProps(contentProps.value, {
											reference: unref(props).reference ?? unref(props).content?.reference,
											"data-slot": "content",
											class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
										}, toHandlers(contentEvents.value)), {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													ssrRenderSlot(_ctx.$slots, "content", close ? { close } : {}, null, _push, _parent, _scopeId);
													if (!!unref(props).arrow) _push(ssrRenderComponent(unref(Component).Arrow, mergeProps(arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: unref(props).ui?.arrow })
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												} else return [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!unref(props).arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
													"data-slot": "arrow",
													class: ui.value.arrow({ class: unref(props).ui?.arrow })
												}), null, 16, ["class"])) : createCommentVNode("", true)];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [createVNode(unref(Component).Content, mergeProps(contentProps.value, {
											reference: unref(props).reference ?? unref(props).content?.reference,
											"data-slot": "content",
											class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
										}, toHandlers(contentEvents.value)), {
											default: withCtx(() => [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!unref(props).arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: unref(props).ui?.arrow })
											}), null, 16, ["class"])) : createCommentVNode("", true)]),
											_: 2
										}, 1040, ["reference", "class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(FieldGroupReset), null, {
									default: withCtx(() => [createVNode(unref(Component).Content, mergeProps(contentProps.value, {
										reference: unref(props).reference ?? unref(props).content?.reference,
										"data-slot": "content",
										class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
									}, toHandlers(contentEvents.value)), {
										default: withCtx(() => [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!unref(props).arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
											"data-slot": "arrow",
											class: ui.value.arrow({ class: unref(props).ui?.arrow })
										}), null, 16, ["class"])) : createCommentVNode("", true)]),
										_: 2
									}, 1040, ["reference", "class"])]),
									_: 2
								}, 1024)];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [
						!!slots.default ? (openBlock(), createBlock(unref(Component).Trigger, {
							key: 0,
							"as-child": "",
							class: unref(props).class
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
							_: 2
						}, 1032, ["class"])) : createCommentVNode("", true),
						"Anchor" in Component.value && !!slots.anchor ? (openBlock(), createBlock(unref(Component).Anchor, {
							key: 1,
							"as-child": ""
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "anchor", close ? { close } : {})]),
							_: 2
						}, 1024)) : createCommentVNode("", true),
						createVNode(unref(Component).Portal, unref(portalProps), {
							default: withCtx(() => [createVNode(unref(FieldGroupReset), null, {
								default: withCtx(() => [createVNode(unref(Component).Content, mergeProps(contentProps.value, {
									reference: unref(props).reference ?? unref(props).content?.reference,
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
								}, toHandlers(contentEvents.value)), {
									default: withCtx(() => [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!unref(props).arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(props).ui?.arrow })
									}), null, 16, ["class"])) : createCommentVNode("", true)]),
									_: 2
								}, 1040, ["reference", "class"])]),
								_: 2
							}, 1024)]),
							_: 2
						}, 1040)
					];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$5 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fnavigation-menu.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fnavigation_menu_default = {
	"slots": {
		"root": "relative flex gap-1.5 [&>div]:min-w-0",
		"list": "isolate min-w-0",
		"label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5",
		"item": "min-w-0",
		"link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3",
		"linkLeadingIcon": "shrink-0 size-5",
		"linkLeadingAvatar": "shrink-0",
		"linkLeadingAvatarSize": "2xs",
		"linkLeadingChipSize": "sm",
		"linkTrailing": "group ms-auto inline-flex gap-1.5 items-center",
		"linkTrailingBadge": "shrink-0",
		"linkTrailingBadgeSize": "sm",
		"linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
		"linkLabel": "truncate",
		"linkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
		"childList": "isolate",
		"childLabel": "text-xs text-highlighted",
		"childItem": "",
		"childLink": "group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3",
		"childLinkWrapper": "min-w-0",
		"childLinkIcon": "size-5 shrink-0",
		"childLinkLabel": "truncate",
		"childLinkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
		"childLinkDescription": "text-muted",
		"separator": "px-2 h-px bg-border",
		"viewportWrapper": "absolute top-full start-0 flex w-full",
		"viewport": "relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left,right] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-1",
		"content": "",
		"indicator": "absolute left-0 data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-2 w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
		"arrow": "relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-1 rounded-xs"
	},
	"variants": {
		"color": {
			"primary": {
				"link": "before:outline-primary/25",
				"childLink": "before:outline-primary/25"
			},
			"secondary": {
				"link": "before:outline-secondary/25",
				"childLink": "before:outline-secondary/25"
			},
			"success": {
				"link": "before:outline-success/25",
				"childLink": "before:outline-success/25"
			},
			"info": {
				"link": "before:outline-info/25",
				"childLink": "before:outline-info/25"
			},
			"warning": {
				"link": "before:outline-warning/25",
				"childLink": "before:outline-warning/25"
			},
			"error": {
				"link": "before:outline-error/25",
				"childLink": "before:outline-error/25"
			},
			"neutral": {
				"link": "before:outline-inverted/25",
				"childLink": "before:outline-inverted/25"
			}
		},
		"highlightColor": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"variant": {
			"pill": "",
			"link": ""
		},
		"orientation": {
			"horizontal": {
				"root": "items-center justify-between",
				"list": "flex items-center",
				"item": "py-2",
				"link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
				"childList": "grid p-2",
				"childLink": "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
				"childLinkLabel": "font-medium",
				"content": "absolute top-0 start-0 w-full max-h-[70vh] overflow-y-auto"
			},
			"vertical": {
				"root": "flex-col",
				"link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
				"childLabel": "px-1.5 py-0.5",
				"childLink": "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0"
			}
		},
		"contentOrientation": {
			"horizontal": {
				"viewportWrapper": "justify-center",
				"content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
			},
			"vertical": { "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left) rtl:left-auto rtl:right-[calc(100%-var(--reka-navigation-menu-viewport-left)-var(--reka-navigation-menu-viewport-width))]" }
		},
		"active": {
			"true": {
				"childLink": "before:bg-elevated text-highlighted",
				"childLinkIcon": "text-default"
			},
			"false": {
				"link": "text-muted",
				"linkLeadingIcon": "text-dimmed",
				"childLink": ["hover:before:bg-elevated/50 text-default hover:text-highlighted", "transition-colors before:transition-colors"],
				"childLinkIcon": ["text-dimmed group-hover:text-default", "transition-colors"]
			}
		},
		"disabled": { "true": { "link": "cursor-not-allowed opacity-75" } },
		"highlight": { "true": "" },
		"level": { "true": "" },
		"collapsed": { "true": "" }
	},
	"compoundVariants": [
		{
			"orientation": "horizontal",
			"contentOrientation": "horizontal",
			"class": { "childList": "grid-cols-2 gap-2" }
		},
		{
			"orientation": "horizontal",
			"contentOrientation": "vertical",
			"class": {
				"childList": "gap-1",
				"content": "w-60"
			}
		},
		{
			"orientation": "vertical",
			"collapsed": false,
			"class": {
				"childList": "ms-5 border-s border-default",
				"childItem": "ps-1.5 -ms-px",
				"content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=closed]:overflow-hidden"
			}
		},
		{
			"orientation": "vertical",
			"collapsed": true,
			"class": {
				"link": "px-1.5",
				"linkLabel": "hidden",
				"linkTrailing": "hidden",
				"content": "shadow-sm rounded-sm min-h-6 p-1"
			}
		},
		{
			"orientation": "horizontal",
			"highlight": true,
			"class": { "link": ["after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full", "after:transition-colors"] }
		},
		{
			"orientation": "vertical",
			"highlight": true,
			"level": true,
			"class": { "link": ["after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full", "after:transition-colors"] }
		},
		{
			"disabled": false,
			"active": false,
			"variant": "pill",
			"class": {
				"link": ["hover:text-highlighted hover:before:bg-elevated/50", "transition-colors before:transition-colors"],
				"linkLeadingIcon": ["group-hover:text-default", "transition-colors"]
			}
		},
		{
			"disabled": false,
			"active": false,
			"variant": "pill",
			"orientation": "horizontal",
			"class": {
				"link": "data-[state=open]:text-highlighted",
				"linkLeadingIcon": "group-data-[state=open]:text-default"
			}
		},
		{
			"disabled": false,
			"variant": "pill",
			"highlight": true,
			"orientation": "horizontal",
			"class": { "link": "data-[state=open]:before:bg-elevated/50" }
		},
		{
			"disabled": false,
			"variant": "pill",
			"highlight": false,
			"active": false,
			"orientation": "horizontal",
			"class": { "link": "data-[state=open]:before:bg-elevated/50" }
		},
		{
			"color": "primary",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-primary",
				"linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-secondary",
				"linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-success",
				"linkLeadingIcon": "text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-info",
				"linkLeadingIcon": "text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-warning",
				"linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-error",
				"linkLeadingIcon": "text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "neutral",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-highlighted",
				"linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
			}
		},
		{
			"variant": "pill",
			"active": true,
			"highlight": false,
			"class": { "link": "before:bg-elevated" }
		},
		{
			"variant": "pill",
			"active": true,
			"highlight": true,
			"disabled": false,
			"class": { "link": ["hover:before:bg-elevated/50", "before:transition-colors"] }
		},
		{
			"disabled": false,
			"active": false,
			"variant": "link",
			"class": {
				"link": ["hover:text-highlighted", "transition-colors"],
				"linkLeadingIcon": ["group-hover:text-default", "transition-colors"]
			}
		},
		{
			"disabled": false,
			"active": false,
			"variant": "link",
			"orientation": "horizontal",
			"class": {
				"link": "data-[state=open]:text-highlighted",
				"linkLeadingIcon": "group-data-[state=open]:text-default"
			}
		},
		{
			"color": "primary",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-primary",
				"linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-secondary",
				"linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-success",
				"linkLeadingIcon": "text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-info",
				"linkLeadingIcon": "text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-warning",
				"linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-error",
				"linkLeadingIcon": "text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "neutral",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-highlighted",
				"linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
			}
		},
		{
			"highlightColor": "primary",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-primary" }
		},
		{
			"highlightColor": "secondary",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-secondary" }
		},
		{
			"highlightColor": "success",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-success" }
		},
		{
			"highlightColor": "info",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-info" }
		},
		{
			"highlightColor": "warning",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-warning" }
		},
		{
			"highlightColor": "error",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-error" }
		},
		{
			"highlightColor": "neutral",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-inverted" }
		}
	],
	"defaultVariants": {
		"color": "primary",
		"highlightColor": "primary",
		"variant": "pill"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue
var _sfc_main$2 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UNavigationMenu",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		type: {
			type: null,
			required: false,
			default: "multiple"
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		items: {
			type: null,
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
		orientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		collapsed: {
			type: Boolean,
			required: false
		},
		tooltip: {
			type: [Boolean, Object],
			required: false
		},
		popover: {
			type: [Boolean, Object],
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		highlightColor: {
			type: null,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		contentOrientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		arrow: {
			type: Boolean,
			required: false
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
		delayDuration: {
			type: Number,
			required: false,
			default: 0
		},
		disableClickTrigger: {
			type: Boolean,
			required: false
		},
		disableHoverTrigger: {
			type: Boolean,
			required: false
		},
		skipDelayDuration: {
			type: Number,
			required: false
		},
		disablePointerLeaveClose: {
			type: Boolean,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		collapsible: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("navigationMenu", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(computed(() => ({
			as: props.as,
			delayDuration: props.delayDuration,
			skipDelayDuration: props.skipDelayDuration,
			orientation: props.orientation,
			disableClickTrigger: props.disableClickTrigger,
			disableHoverTrigger: props.disableHoverTrigger,
			disablePointerLeaveClose: props.disablePointerLeaveClose,
			unmountOnHide: props.unmountOnHide
		})), emits);
		const accordionProps = useForwardProps(reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"), emits);
		const contentProps = toRef(() => props.content);
		const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { ...props.orientation === "vertical" && {
			delayDuration: 0,
			content: { side: "right" }
		} }));
		const popoverProps = toRef(() => defu(typeof props.popover === "boolean" ? {} : props.popover, {
			mode: "hover",
			content: {
				side: "right",
				align: "start",
				alignOffset: 2
			}
		}));
		const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({ props: {
			item: Object,
			index: Number,
			level: Number,
			listIndex: Number
		} });
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fnavigation_menu_default,
			...appConfig.ui?.navigationMenu || {}
		})({
			orientation: props.orientation,
			contentOrientation: props.orientation === "vertical" ? void 0 : props.contentOrientation,
			collapsed: props.collapsed,
			color: props.color,
			variant: props.variant,
			highlight: props.highlight,
			highlightColor: props.highlightColor || props.color
		}));
		const lists = computed(() => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []);
		function getItemValue(item, index, level, listIndex) {
			const prefix = lists.value.length > 1 ? `group-${listIndex}-` : "";
			return get$1(item, props.valueKey) ?? (level > 0 ? `${prefix}item-${level}-${index}` : `${prefix}item-${index}`);
		}
		function getAccordionDefaultValue(list, level = 0, listIndex = 0) {
			const indexes = list.reduce((acc, item, index) => {
				if (item.defaultOpen || item.open) acc.push(getItemValue(item, index, level, listIndex));
				return acc;
			}, []);
			return props.type === "single" ? indexes[0] : indexes;
		}
		function onLinkTrailingClick(e, item) {
			if (!item.children?.length) return;
			if (props.orientation === "horizontal") e.preventDefault();
			else if (props.orientation === "vertical" && !props.collapsed) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineLinkTemplate), null, {
				default: withCtx(({ item, active, index }, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						active,
						ui: ui.value
					}, () => {
						ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: ui.value
						}, () => {
							if (item.avatar) _push(ssrRenderComponent(_sfc_main$1$2, mergeProps({ size: item.ui?.linkLeadingAvatarSize || unref(props).ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize() }, item.avatar, {
								"data-slot": "linkLeadingAvatar",
								class: ui.value.linkLeadingAvatar({
									class: [unref(props).ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar],
									active,
									disabled: !!item.disabled
								})
							}), null, _parent, _scopeId));
							else if (item.icon && item.chip) _push(ssrRenderComponent(_sfc_main$2$1, mergeProps({
								size: item.ui?.linkLeadingChipSize || unref(props).ui?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
								inset: ""
							}, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_sfc_main$2$2, {
										name: item.icon,
										"data-slot": "linkLeadingIcon",
										class: ui.value.linkLeadingIcon({
											class: [unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon],
											active,
											disabled: !!item.disabled
										})
									}, null, _parent, _scopeId));
									else return [createVNode(_sfc_main$2$2, {
										name: item.icon,
										"data-slot": "linkLeadingIcon",
										class: ui.value.linkLeadingIcon({
											class: [unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon],
											active,
											disabled: !!item.disabled
										})
									}, null, 8, ["name", "class"])];
								}),
								_: 2
							}, _parent, _scopeId));
							else if (item.icon) _push(ssrRenderComponent(_sfc_main$2$2, {
								name: item.icon,
								"data-slot": "linkLeadingIcon",
								class: ui.value.linkLeadingIcon({
									class: [unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon],
									active,
									disabled: !!item.disabled
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						if (unref(get$1)(item, unref(props).labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) {
							_push(`<span data-slot="linkLabel" class="${ssrRenderClass(ui.value.linkLabel({ class: [unref(props).ui?.linkLabel, item.ui?.linkLabel] }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
								item,
								active,
								index
							}, () => {
								_push(`${ssrInterpolate(unref(get$1)(item, unref(props).labelKey))}`);
							}, _push, _parent, _scopeId);
							if (item.target === "_blank" && unref(props).externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$2, {
								name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
								"data-slot": "linkLabelExternalIcon",
								class: ui.value.linkLabelExternalIcon({
									class: [unref(props).ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon],
									active
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span>`);
						} else _push(`<!---->`);
						if (item.badge || item.badge === 0 || unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || unref(props).orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"]) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed ? unref(AccordionTrigger_default) : "span"), {
							as: unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed ? "span" : void 0,
							"data-slot": "linkTrailing",
							class: ui.value.linkTrailing({ class: [unref(props).ui?.linkTrailing, item.ui?.linkTrailing] }),
							onClick: (e) => onLinkTrailingClick(e, item)
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
									item,
									active,
									index,
									ui: ui.value
								}, () => {
									if (item.badge || item.badge === 0) _push(ssrRenderComponent(_sfc_main$e, mergeProps({
										color: "neutral",
										variant: "outline",
										size: item.ui?.linkTrailingBadgeSize || unref(props).ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
									}, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
										"data-slot": "linkTrailingBadge",
										class: ui.value.linkTrailingBadge({ class: [unref(props).ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
									}), null, _parent, _scopeId));
									else _push(`<!---->`);
									if (unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || unref(props).orientation === "vertical" && item.children?.length) _push(ssrRenderComponent(_sfc_main$2$2, {
										name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
										"data-slot": "linkTrailingIcon",
										class: ui.value.linkTrailingIcon({
											class: [unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon],
											active
										})
									}, null, _parent, _scopeId));
									else if (item.trailingIcon) _push(ssrRenderComponent(_sfc_main$2$2, {
										name: item.trailingIcon,
										"data-slot": "linkTrailingIcon",
										class: ui.value.linkTrailingIcon({
											class: [unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon],
											active
										})
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
									item,
									active,
									index,
									ui: ui.value
								}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$e, mergeProps({
									key: 0,
									color: "neutral",
									variant: "outline",
									size: item.ui?.linkTrailingBadgeSize || unref(props).ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
								}, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
									"data-slot": "linkTrailingBadge",
									class: ui.value.linkTrailingBadge({ class: [unref(props).ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
								}), null, 16, ["size", "class"])) : createCommentVNode("", true), unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || unref(props).orientation === "vertical" && item.children?.length ? (openBlock(), createBlock(_sfc_main$2$2, {
									key: 1,
									name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
									"data-slot": "linkTrailingIcon",
									class: ui.value.linkTrailingIcon({
										class: [unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon],
										active
									})
								}, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$2$2, {
									key: 2,
									name: item.trailingIcon,
									"data-slot": "linkTrailingIcon",
									class: ui.value.linkTrailingIcon({
										class: [unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon],
										active
									})
								}, null, 8, ["name", "class"])) : createCommentVNode("", true)])];
							}),
							_: 2
						}), _parent, _scopeId);
						else _push(`<!---->`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						active,
						ui: ui.value
					}, () => [
						renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: ui.value
						}, () => [item.avatar ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
							key: 0,
							size: item.ui?.linkLeadingAvatarSize || unref(props).ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
						}, item.avatar, {
							"data-slot": "linkLeadingAvatar",
							class: ui.value.linkLeadingAvatar({
								class: [unref(props).ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar],
								active,
								disabled: !!item.disabled
							})
						}), null, 16, ["size", "class"])) : item.icon && item.chip ? (openBlock(), createBlock(_sfc_main$2$1, mergeProps({
							key: 1,
							size: item.ui?.linkLeadingChipSize || unref(props).ui?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
							inset: ""
						}, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
							default: withCtx(() => [createVNode(_sfc_main$2$2, {
								name: item.icon,
								"data-slot": "linkLeadingIcon",
								class: ui.value.linkLeadingIcon({
									class: [unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon],
									active,
									disabled: !!item.disabled
								})
							}, null, 8, ["name", "class"])]),
							_: 2
						}, 1040, ["size"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
							key: 2,
							name: item.icon,
							"data-slot": "linkLeadingIcon",
							class: ui.value.linkLeadingIcon({
								class: [unref(props).ui?.linkLeadingIcon, item.ui?.linkLeadingIcon],
								active,
								disabled: !!item.disabled
							})
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)]),
						unref(get$1)(item, unref(props).labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "linkLabel",
							class: ui.value.linkLabel({ class: [unref(props).ui?.linkLabel, item.ui?.linkLabel] })
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
							item,
							active,
							index
						}, () => [createTextVNode(toDisplayString(unref(get$1)(item, unref(props).labelKey)), 1)]), item.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
							key: 0,
							name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
							"data-slot": "linkLabelExternalIcon",
							class: ui.value.linkLabelExternalIcon({
								class: [unref(props).ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon],
								active
							})
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
						item.badge || item.badge === 0 || unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || unref(props).orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"] ? (openBlock(), createBlock(resolveDynamicComponent(unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed ? unref(AccordionTrigger_default) : "span"), {
							key: 1,
							as: unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed ? "span" : void 0,
							"data-slot": "linkTrailing",
							class: ui.value.linkTrailing({ class: [unref(props).ui?.linkTrailing, item.ui?.linkTrailing] }),
							onClick: (e) => onLinkTrailingClick(e, item)
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
								item,
								active,
								index,
								ui: ui.value
							}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$e, mergeProps({
								key: 0,
								color: "neutral",
								variant: "outline",
								size: item.ui?.linkTrailingBadgeSize || unref(props).ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
							}, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
								"data-slot": "linkTrailingBadge",
								class: ui.value.linkTrailingBadge({ class: [unref(props).ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
							}), null, 16, ["size", "class"])) : createCommentVNode("", true), unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || unref(props).orientation === "vertical" && item.children?.length ? (openBlock(), createBlock(_sfc_main$2$2, {
								key: 1,
								name: item.trailingIcon || unref(props).trailingIcon || unref(appConfig).ui.icons.chevronDown,
								"data-slot": "linkTrailingIcon",
								class: ui.value.linkTrailingIcon({
									class: [unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon],
									active
								})
							}, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$2$2, {
								key: 2,
								name: item.trailingIcon,
								"data-slot": "linkTrailingIcon",
								class: ui.value.linkTrailingIcon({
									class: [unref(props).ui?.linkTrailingIcon, item.ui?.linkTrailingIcon],
									active
								})
							}, null, 8, ["name", "class"])) : createCommentVNode("", true)])]),
							_: 2
						}, 1032, [
							"as",
							"class",
							"onClick"
						])) : createCommentVNode("", true)
					])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DefineItemTemplate), null, {
				default: withCtx(({ item, index, level = 0, listIndex = 0 }, _push, _parent, _scopeId) => {
					if (_push) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(props).orientation === "vertical" && !unref(props).collapsed ? unref(AccordionItem_default) : unref(NavigationMenuItem_default)), mergeProps({ as: "li" }, unref(props).orientation === "vertical" && !unref(props).collapsed ? { disabled: !!item.disabled } : {}, { value: getItemValue(item, index, level, listIndex) }), {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(props).orientation === "vertical" && item.type === "label" && !unref(props).collapsed) {
									_push(`<div data-slot="label" class="${ssrRenderClass(ui.value.label({ class: [
										unref(props).ui?.label,
										item.ui?.label,
										item.class
									] }))}"${_scopeId}>`);
									_push(ssrRenderComponent(unref(ReuseLinkTemplate), {
										item,
										index
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else if (item.type !== "label") _push(ssrRenderComponent(_sfc_main$f, mergeProps(unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
									default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
										if (_push) {
											ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger_default) : unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && !slotProps.href ? unref(AccordionTrigger_default) : unref(NavigationMenuLink_default)), {
												"as-child": "",
												active: active || item.active,
												disabled: item.disabled,
												onSelect: item.onSelect
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) if (unref(props).orientation === "vertical" && unref(props).collapsed && item.children?.length && (!!unref(props).popover || !!item.popover)) _push(ssrRenderComponent(_sfc_main$3, mergeProps({
														...popoverProps.value,
														...typeof item.popover === "boolean" ? {} : item.popover || {}
													}, { ui: { content: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] }) } }), {
														content: withCtx(({ close }, _push, _parent, _scopeId) => {
															if (_push) ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
																item,
																active: active || item.active,
																index,
																ui: ui.value,
																close
															}, () => {
																_push(`<ul data-slot="childList" class="${ssrRenderClass(ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] }))}"${_scopeId}><li data-slot="childLabel" class="${ssrRenderClass(ui.value.childLabel({ class: [unref(props).ui?.childLabel, item.ui?.childLabel] }))}"${_scopeId}>${ssrInterpolate(unref(get$1)(item, unref(props).labelKey))}</li><!--[-->`);
																ssrRenderList(item.children, (childItem, childIndex) => {
																	_push(`<li data-slot="childItem" class="${ssrRenderClass(ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] }))}"${_scopeId}>`);
																	_push(ssrRenderComponent(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																		default: withCtx(({ active: childActive, ...childSlotProps }, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(unref(NavigationMenuLink_default), {
																				"as-child": "",
																				active: childActive,
																				onSelect: childItem.onSelect
																			}, {
																				default: withCtx((_, _push, _parent, _scopeId) => {
																					if (_push) _push(ssrRenderComponent(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																						"data-slot": "childLink",
																						class: ui.value.childLink({
																							class: [
																								unref(props).ui?.childLink,
																								item.ui?.childLink,
																								childItem.class
																							],
																							active: childActive
																						})
																					}), {
																						default: withCtx((_, _push, _parent, _scopeId) => {
																							if (_push) {
																								if (childItem.icon) _push(ssrRenderComponent(_sfc_main$2$2, {
																									name: childItem.icon,
																									"data-slot": "childLinkIcon",
																									class: ui.value.childLinkIcon({
																										class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																										active: childActive
																									})
																								}, null, _parent, _scopeId));
																								else _push(`<!---->`);
																								_push(`<span data-slot="childLinkLabel" class="${ssrRenderClass(ui.value.childLinkLabel({
																									class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																									active: childActive
																								}))}"${_scopeId}>${ssrInterpolate(unref(get$1)(childItem, unref(props).labelKey))} `);
																								if (childItem.target === "_blank" && unref(props).externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$2, {
																									name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																									"data-slot": "childLinkLabelExternalIcon",
																									class: ui.value.childLinkLabelExternalIcon({
																										class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																										active: childActive
																									})
																								}, null, _parent, _scopeId));
																								else _push(`<!---->`);
																								_push(`</span>`);
																							} else return [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																								key: 0,
																								name: childItem.icon,
																								"data-slot": "childLinkIcon",
																								class: ui.value.childLinkIcon({
																									class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																									active: childActive
																								})
																							}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																								"data-slot": "childLinkLabel",
																								class: ui.value.childLinkLabel({
																									class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																									active: childActive
																								})
																							}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																								key: 0,
																								name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																								"data-slot": "childLinkLabelExternalIcon",
																								class: ui.value.childLinkLabelExternalIcon({
																									class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																									active: childActive
																								})
																							}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)];
																						}),
																						_: 2
																					}, _parent, _scopeId));
																					else return [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																						"data-slot": "childLink",
																						class: ui.value.childLink({
																							class: [
																								unref(props).ui?.childLink,
																								item.ui?.childLink,
																								childItem.class
																							],
																							active: childActive
																						})
																					}), {
																						default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																							key: 0,
																							name: childItem.icon,
																							"data-slot": "childLinkIcon",
																							class: ui.value.childLinkIcon({
																								class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																								active: childActive
																							})
																						}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																							"data-slot": "childLinkLabel",
																							class: ui.value.childLinkLabel({
																								class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																								active: childActive
																							})
																						}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																							key: 0,
																							name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																							"data-slot": "childLinkLabelExternalIcon",
																							class: ui.value.childLinkLabelExternalIcon({
																								class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																								active: childActive
																							})
																						}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																						_: 2
																					}, 1040, ["class"])];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			else return [createVNode(unref(NavigationMenuLink_default), {
																				"as-child": "",
																				active: childActive,
																				onSelect: childItem.onSelect
																			}, {
																				default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																					"data-slot": "childLink",
																					class: ui.value.childLink({
																						class: [
																							unref(props).ui?.childLink,
																							item.ui?.childLink,
																							childItem.class
																						],
																						active: childActive
																					})
																				}), {
																					default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																						key: 0,
																						name: childItem.icon,
																						"data-slot": "childLinkIcon",
																						class: ui.value.childLinkIcon({
																							class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																							active: childActive
																						})
																					}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																						"data-slot": "childLinkLabel",
																						class: ui.value.childLinkLabel({
																							class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																							active: childActive
																						})
																					}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																						key: 0,
																						name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																						"data-slot": "childLinkLabelExternalIcon",
																						class: ui.value.childLinkLabelExternalIcon({
																							class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																							active: childActive
																						})
																					}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																					_: 2
																				}, 1040, ["class"])]),
																				_: 2
																			}, 1032, ["active", "onSelect"])];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	_push(`</li>`);
																});
																_push(`<!--]--></ul>`);
															}, _push, _parent, _scopeId);
															else return [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
																item,
																active: active || item.active,
																index,
																ui: ui.value,
																close
															}, () => [createVNode("ul", {
																"data-slot": "childList",
																class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
															}, [createVNode("li", {
																"data-slot": "childLabel",
																class: ui.value.childLabel({ class: [unref(props).ui?.childLabel, item.ui?.childLabel] })
															}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
																return openBlock(), createBlock("li", {
																	key: childIndex,
																	"data-slot": "childItem",
																	class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
																}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																	default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
																		"as-child": "",
																		active: childActive,
																		onSelect: childItem.onSelect
																	}, {
																		default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																			"data-slot": "childLink",
																			class: ui.value.childLink({
																				class: [
																					unref(props).ui?.childLink,
																					item.ui?.childLink,
																					childItem.class
																				],
																				active: childActive
																			})
																		}), {
																			default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																				key: 0,
																				name: childItem.icon,
																				"data-slot": "childLinkIcon",
																				class: ui.value.childLinkIcon({
																					class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																					active: childActive
																				})
																			}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																				"data-slot": "childLinkLabel",
																				class: ui.value.childLinkLabel({
																					class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																					active: childActive
																				})
																			}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																				key: 0,
																				name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																				"data-slot": "childLinkLabelExternalIcon",
																				class: ui.value.childLinkLabelExternalIcon({
																					class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																					active: childActive
																				})
																			}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																			_: 2
																		}, 1040, ["class"])]),
																		_: 2
																	}, 1032, ["active", "onSelect"])]),
																	_: 2
																}, 1040)], 2);
															}), 128))], 2)])];
														}),
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_sfc_main$1$3, mergeProps(slotProps, {
																"data-slot": "link",
																class: ui.value.link({
																	class: [
																		unref(props).ui?.link,
																		item.ui?.link,
																		item.class
																	],
																	active: active || item.active,
																	disabled: !!item.disabled,
																	level: level > 0
																})
															}), {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
																		item,
																		active: active || item.active,
																		index
																	}, null, _parent, _scopeId));
																	else return [createVNode(unref(ReuseLinkTemplate), {
																		item,
																		active: active || item.active,
																		index
																	}, null, 8, [
																		"item",
																		"active",
																		"index"
																	])];
																}),
																_: 2
															}, _parent, _scopeId));
															else return [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
																"data-slot": "link",
																class: ui.value.link({
																	class: [
																		unref(props).ui?.link,
																		item.ui?.link,
																		item.class
																	],
																	active: active || item.active,
																	disabled: !!item.disabled,
																	level: level > 0
																})
															}), {
																default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																	item,
																	active: active || item.active,
																	index
																}, null, 8, [
																	"item",
																	"active",
																	"index"
																])]),
																_: 2
															}, 1040, ["class"])];
														}),
														_: 2
													}, _parent, _scopeId));
													else if (unref(props).orientation === "vertical" && unref(props).collapsed && (!!unref(props).tooltip || !!item.tooltip) || unref(props).orientation === "horizontal" && !!item.tooltip) _push(ssrRenderComponent(_sfc_main$d, mergeProps({ text: unref(get$1)(item, unref(props).labelKey) }, {
														...tooltipProps.value,
														...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
													}), {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_sfc_main$1$3, mergeProps(slotProps, {
																"data-slot": "link",
																class: ui.value.link({
																	class: [
																		unref(props).ui?.link,
																		item.ui?.link,
																		item.class
																	],
																	active: active || item.active,
																	disabled: !!item.disabled,
																	level: level > 0
																})
															}), {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
																		item,
																		active: active || item.active,
																		index
																	}, null, _parent, _scopeId));
																	else return [createVNode(unref(ReuseLinkTemplate), {
																		item,
																		active: active || item.active,
																		index
																	}, null, 8, [
																		"item",
																		"active",
																		"index"
																	])];
																}),
																_: 2
															}, _parent, _scopeId));
															else return [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
																"data-slot": "link",
																class: ui.value.link({
																	class: [
																		unref(props).ui?.link,
																		item.ui?.link,
																		item.class
																	],
																	active: active || item.active,
																	disabled: !!item.disabled,
																	level: level > 0
																})
															}), {
																default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																	item,
																	active: active || item.active,
																	index
																}, null, 8, [
																	"item",
																	"active",
																	"index"
																])]),
																_: 2
															}, 1040, ["class"])];
														}),
														_: 2
													}, _parent, _scopeId));
													else _push(ssrRenderComponent(_sfc_main$1$3, mergeProps(slotProps, {
														"data-slot": "link",
														class: ui.value.link({
															class: [
																unref(props).ui?.link,
																item.ui?.link,
																item.class
															],
															active: active || item.active,
															disabled: !!item.disabled,
															level: unref(props).orientation === "horizontal" || level > 0
														})
													}), {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
																item,
																active: active || item.active,
																index
															}, null, _parent, _scopeId));
															else return [createVNode(unref(ReuseLinkTemplate), {
																item,
																active: active || item.active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])];
														}),
														_: 2
													}, _parent, _scopeId));
													else return [unref(props).orientation === "vertical" && unref(props).collapsed && item.children?.length && (!!unref(props).popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 0 }, {
														...popoverProps.value,
														...typeof item.popover === "boolean" ? {} : item.popover || {}
													}, { ui: { content: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] }) } }), {
														content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
															item,
															active: active || item.active,
															index,
															ui: ui.value,
															close
														}, () => [createVNode("ul", {
															"data-slot": "childList",
															class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
														}, [createVNode("li", {
															"data-slot": "childLabel",
															class: ui.value.childLabel({ class: [unref(props).ui?.childLabel, item.ui?.childLabel] })
														}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
															return openBlock(), createBlock("li", {
																key: childIndex,
																"data-slot": "childItem",
																class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
															}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
																	"as-child": "",
																	active: childActive,
																	onSelect: childItem.onSelect
																}, {
																	default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																		"data-slot": "childLink",
																		class: ui.value.childLink({
																			class: [
																				unref(props).ui?.childLink,
																				item.ui?.childLink,
																				childItem.class
																			],
																			active: childActive
																		})
																	}), {
																		default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																			key: 0,
																			name: childItem.icon,
																			"data-slot": "childLinkIcon",
																			class: ui.value.childLinkIcon({
																				class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																				active: childActive
																			})
																		}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																			"data-slot": "childLinkLabel",
																			class: ui.value.childLinkLabel({
																				class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																				active: childActive
																			})
																		}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																			key: 0,
																			name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																			"data-slot": "childLinkLabelExternalIcon",
																			class: ui.value.childLinkLabelExternalIcon({
																				class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																				active: childActive
																			})
																		}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																		_: 2
																	}, 1040, ["class"])]),
																	_: 2
																}, 1032, ["active", "onSelect"])]),
																_: 2
															}, 1040)], 2);
														}), 128))], 2)])]),
														default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
															"data-slot": "link",
															class: ui.value.link({
																class: [
																	unref(props).ui?.link,
																	item.ui?.link,
																	item.class
																],
																active: active || item.active,
																disabled: !!item.disabled,
																level: level > 0
															})
														}), {
															default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																item,
																active: active || item.active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1040, ["ui"])) : unref(props).orientation === "vertical" && unref(props).collapsed && (!!unref(props).tooltip || !!item.tooltip) || unref(props).orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
														key: 1,
														text: unref(get$1)(item, unref(props).labelKey)
													}, {
														...tooltipProps.value,
														...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
													}), {
														default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
															"data-slot": "link",
															class: ui.value.link({
																class: [
																	unref(props).ui?.link,
																	item.ui?.link,
																	item.class
																],
																active: active || item.active,
																disabled: !!item.disabled,
																level: level > 0
															})
														}), {
															default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																item,
																active: active || item.active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$1$3, mergeProps({ key: 2 }, slotProps, {
														"data-slot": "link",
														class: ui.value.link({
															class: [
																unref(props).ui?.link,
																item.ui?.link,
																item.class
															],
															active: active || item.active,
															disabled: !!item.disabled,
															level: unref(props).orientation === "horizontal" || level > 0
														})
													}), {
														default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
															item,
															active: active || item.active,
															index
														}, null, 8, [
															"item",
															"active",
															"index"
														])]),
														_: 2
													}, 1040, ["class"]))];
												}),
												_: 2
											}), _parent, _scopeId);
											if (unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"])) _push(ssrRenderComponent(unref(NavigationMenuContent_default), mergeProps(contentProps.value, {
												"data-slot": "content",
												class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
											}), {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
														item,
														active: active || item.active,
														index,
														ui: ui.value
													}, () => {
														_push(`<ul data-slot="childList" class="${ssrRenderClass(ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] }))}"${_scopeId}><!--[-->`);
														ssrRenderList(item.children, (childItem, childIndex) => {
															_push(`<li data-slot="childItem" class="${ssrRenderClass(ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] }))}"${_scopeId}>`);
															_push(ssrRenderComponent(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																default: withCtx(({ active: childActive, ...childSlotProps }, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(unref(NavigationMenuLink_default), {
																		"as-child": "",
																		active: childActive,
																		onSelect: childItem.onSelect
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																				"data-slot": "childLink",
																				class: ui.value.childLink({
																					class: [
																						unref(props).ui?.childLink,
																						item.ui?.childLink,
																						childItem.class
																					],
																					active: childActive
																				})
																			}), {
																				default: withCtx((_, _push, _parent, _scopeId) => {
																					if (_push) {
																						if (childItem.icon) _push(ssrRenderComponent(_sfc_main$2$2, {
																							name: childItem.icon,
																							"data-slot": "childLinkIcon",
																							class: ui.value.childLinkIcon({
																								class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																								active: childActive
																							})
																						}, null, _parent, _scopeId));
																						else _push(`<!---->`);
																						_push(`<div data-slot="childLinkWrapper" class="${ssrRenderClass(ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] }))}"${_scopeId}><p data-slot="childLinkLabel" class="${ssrRenderClass(ui.value.childLinkLabel({
																							class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																							active: childActive
																						}))}"${_scopeId}>${ssrInterpolate(unref(get$1)(childItem, unref(props).labelKey))} `);
																						if (childItem.target === "_blank" && unref(props).externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$2, {
																							name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																							"data-slot": "childLinkLabelExternalIcon",
																							class: ui.value.childLinkLabelExternalIcon({
																								class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																								active: childActive
																							})
																						}, null, _parent, _scopeId));
																						else _push(`<!---->`);
																						_push(`</p>`);
																						if (childItem.description) _push(`<p data-slot="childLinkDescription" class="${ssrRenderClass(ui.value.childLinkDescription({
																							class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
																							active: childActive
																						}))}"${_scopeId}>${ssrInterpolate(childItem.description)}</p>`);
																						else _push(`<!---->`);
																						_push(`</div>`);
																					} else return [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																						key: 0,
																						name: childItem.icon,
																						"data-slot": "childLinkIcon",
																						class: ui.value.childLinkIcon({
																							class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																							active: childActive
																						})
																					}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																						"data-slot": "childLinkWrapper",
																						class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
																					}, [createVNode("p", {
																						"data-slot": "childLinkLabel",
																						class: ui.value.childLinkLabel({
																							class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																							active: childActive
																						})
																					}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																						key: 0,
																						name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																						"data-slot": "childLinkLabelExternalIcon",
																						class: ui.value.childLinkLabelExternalIcon({
																							class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																							active: childActive
																						})
																					}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																						key: 0,
																						"data-slot": "childLinkDescription",
																						class: ui.value.childLinkDescription({
																							class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
																							active: childActive
																						})
																					}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			else return [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																				"data-slot": "childLink",
																				class: ui.value.childLink({
																					class: [
																						unref(props).ui?.childLink,
																						item.ui?.childLink,
																						childItem.class
																					],
																					active: childActive
																				})
																			}), {
																				default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																					key: 0,
																					name: childItem.icon,
																					"data-slot": "childLinkIcon",
																					class: ui.value.childLinkIcon({
																						class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																						active: childActive
																					})
																				}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																					"data-slot": "childLinkWrapper",
																					class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
																				}, [createVNode("p", {
																					"data-slot": "childLinkLabel",
																					class: ui.value.childLinkLabel({
																						class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																						active: childActive
																					})
																				}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																					key: 0,
																					name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																					"data-slot": "childLinkLabelExternalIcon",
																					class: ui.value.childLinkLabelExternalIcon({
																						class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																						active: childActive
																					})
																				}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																					key: 0,
																					"data-slot": "childLinkDescription",
																					class: ui.value.childLinkDescription({
																						class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
																						active: childActive
																					})
																				}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
																				_: 2
																			}, 1040, ["class"])];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	else return [createVNode(unref(NavigationMenuLink_default), {
																		"as-child": "",
																		active: childActive,
																		onSelect: childItem.onSelect
																	}, {
																		default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																			"data-slot": "childLink",
																			class: ui.value.childLink({
																				class: [
																					unref(props).ui?.childLink,
																					item.ui?.childLink,
																					childItem.class
																				],
																				active: childActive
																			})
																		}), {
																			default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																				key: 0,
																				name: childItem.icon,
																				"data-slot": "childLinkIcon",
																				class: ui.value.childLinkIcon({
																					class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																					active: childActive
																				})
																			}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																				"data-slot": "childLinkWrapper",
																				class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
																			}, [createVNode("p", {
																				"data-slot": "childLinkLabel",
																				class: ui.value.childLinkLabel({
																					class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																					active: childActive
																				})
																			}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																				key: 0,
																				name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																				"data-slot": "childLinkLabelExternalIcon",
																				class: ui.value.childLinkLabelExternalIcon({
																					class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																					active: childActive
																				})
																			}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																				key: 0,
																				"data-slot": "childLinkDescription",
																				class: ui.value.childLinkDescription({
																					class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
																					active: childActive
																				})
																			}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
																			_: 2
																		}, 1040, ["class"])]),
																		_: 2
																	}, 1032, ["active", "onSelect"])];
																}),
																_: 2
															}, _parent, _scopeId));
															_push(`</li>`);
														});
														_push(`<!--]--></ul>`);
													}, _push, _parent, _scopeId);
													else return [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
														item,
														active: active || item.active,
														index,
														ui: ui.value
													}, () => [createVNode("ul", {
														"data-slot": "childList",
														class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
													}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
														return openBlock(), createBlock("li", {
															key: childIndex,
															"data-slot": "childItem",
															class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
														}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
															default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
																"as-child": "",
																active: childActive,
																onSelect: childItem.onSelect
															}, {
																default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																	"data-slot": "childLink",
																	class: ui.value.childLink({
																		class: [
																			unref(props).ui?.childLink,
																			item.ui?.childLink,
																			childItem.class
																		],
																		active: childActive
																	})
																}), {
																	default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																		key: 0,
																		name: childItem.icon,
																		"data-slot": "childLinkIcon",
																		class: ui.value.childLinkIcon({
																			class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																			active: childActive
																		})
																	}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																		"data-slot": "childLinkWrapper",
																		class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
																	}, [createVNode("p", {
																		"data-slot": "childLinkLabel",
																		class: ui.value.childLinkLabel({
																			class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																			active: childActive
																		})
																	}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																		key: 0,
																		name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																		"data-slot": "childLinkLabelExternalIcon",
																		class: ui.value.childLinkLabelExternalIcon({
																			class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																			active: childActive
																		})
																	}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																		key: 0,
																		"data-slot": "childLinkDescription",
																		class: ui.value.childLinkDescription({
																			class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
																			active: childActive
																		})
																	}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
																	_: 2
																}, 1040, ["class"])]),
																_: 2
															}, 1032, ["active", "onSelect"])]),
															_: 2
														}, 1040)], 2);
													}), 128))], 2)])];
												}),
												_: 2
											}, _parent, _scopeId));
											else _push(`<!---->`);
										} else return [(openBlock(), createBlock(resolveDynamicComponent(unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger_default) : unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && !slotProps.href ? unref(AccordionTrigger_default) : unref(NavigationMenuLink_default)), {
											"as-child": "",
											active: active || item.active,
											disabled: item.disabled,
											onSelect: item.onSelect
										}, {
											default: withCtx(() => [unref(props).orientation === "vertical" && unref(props).collapsed && item.children?.length && (!!unref(props).popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 0 }, {
												...popoverProps.value,
												...typeof item.popover === "boolean" ? {} : item.popover || {}
											}, { ui: { content: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] }) } }), {
												content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
													item,
													active: active || item.active,
													index,
													ui: ui.value,
													close
												}, () => [createVNode("ul", {
													"data-slot": "childList",
													class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
												}, [createVNode("li", {
													"data-slot": "childLabel",
													class: ui.value.childLabel({ class: [unref(props).ui?.childLabel, item.ui?.childLabel] })
												}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
													return openBlock(), createBlock("li", {
														key: childIndex,
														"data-slot": "childItem",
														class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
													}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
														default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
															"as-child": "",
															active: childActive,
															onSelect: childItem.onSelect
														}, {
															default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
																"data-slot": "childLink",
																class: ui.value.childLink({
																	class: [
																		unref(props).ui?.childLink,
																		item.ui?.childLink,
																		childItem.class
																	],
																	active: childActive
																})
															}), {
																default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																	key: 0,
																	name: childItem.icon,
																	"data-slot": "childLinkIcon",
																	class: ui.value.childLinkIcon({
																		class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																		active: childActive
																	})
																}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																	"data-slot": "childLinkLabel",
																	class: ui.value.childLinkLabel({
																		class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																		active: childActive
																	})
																}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																	key: 0,
																	name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																	"data-slot": "childLinkLabelExternalIcon",
																	class: ui.value.childLinkLabelExternalIcon({
																		class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																		active: childActive
																	})
																}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																_: 2
															}, 1040, ["class"])]),
															_: 2
														}, 1032, ["active", "onSelect"])]),
														_: 2
													}, 1040)], 2);
												}), 128))], 2)])]),
												default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
													"data-slot": "link",
													class: ui.value.link({
														class: [
															unref(props).ui?.link,
															item.ui?.link,
															item.class
														],
														active: active || item.active,
														disabled: !!item.disabled,
														level: level > 0
													})
												}), {
													default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
														item,
														active: active || item.active,
														index
													}, null, 8, [
														"item",
														"active",
														"index"
													])]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1040, ["ui"])) : unref(props).orientation === "vertical" && unref(props).collapsed && (!!unref(props).tooltip || !!item.tooltip) || unref(props).orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
												key: 1,
												text: unref(get$1)(item, unref(props).labelKey)
											}, {
												...tooltipProps.value,
												...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
											}), {
												default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
													"data-slot": "link",
													class: ui.value.link({
														class: [
															unref(props).ui?.link,
															item.ui?.link,
															item.class
														],
														active: active || item.active,
														disabled: !!item.disabled,
														level: level > 0
													})
												}), {
													default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
														item,
														active: active || item.active,
														index
													}, null, 8, [
														"item",
														"active",
														"index"
													])]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$1$3, mergeProps({ key: 2 }, slotProps, {
												"data-slot": "link",
												class: ui.value.link({
													class: [
														unref(props).ui?.link,
														item.ui?.link,
														item.class
													],
													active: active || item.active,
													disabled: !!item.disabled,
													level: unref(props).orientation === "horizontal" || level > 0
												})
											}), {
												default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
													item,
													active: active || item.active,
													index
												}, null, 8, [
													"item",
													"active",
													"index"
												])]),
												_: 2
											}, 1040, ["class"]))]),
											_: 2
										}, 1064, [
											"active",
											"disabled",
											"onSelect"
										])), unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent_default), mergeProps({ key: 0 }, contentProps.value, {
											"data-slot": "content",
											class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
										}), {
											default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
												item,
												active: active || item.active,
												index,
												ui: ui.value
											}, () => [createVNode("ul", {
												"data-slot": "childList",
												class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
											}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
												return openBlock(), createBlock("li", {
													key: childIndex,
													"data-slot": "childItem",
													class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
												}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
													default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
														"as-child": "",
														active: childActive,
														onSelect: childItem.onSelect
													}, {
														default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
															"data-slot": "childLink",
															class: ui.value.childLink({
																class: [
																	unref(props).ui?.childLink,
																	item.ui?.childLink,
																	childItem.class
																],
																active: childActive
															})
														}), {
															default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
																key: 0,
																name: childItem.icon,
																"data-slot": "childLinkIcon",
																class: ui.value.childLinkIcon({
																	class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																	active: childActive
																})
															}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																"data-slot": "childLinkWrapper",
																class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
															}, [createVNode("p", {
																"data-slot": "childLinkLabel",
																class: ui.value.childLinkLabel({
																	class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																	active: childActive
																})
															}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
																key: 0,
																name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
																"data-slot": "childLinkLabelExternalIcon",
																class: ui.value.childLinkLabelExternalIcon({
																	class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																	active: childActive
																})
															}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																key: 0,
																"data-slot": "childLinkDescription",
																class: ui.value.childLinkDescription({
																	class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
																	active: childActive
																})
															}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1032, ["active", "onSelect"])]),
													_: 2
												}, 1040)], 2);
											}), 128))], 2)])]),
											_: 2
										}, 1040, ["class"])) : createCommentVNode("", true)];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								if (unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed) _push(ssrRenderComponent(unref(AccordionContent_default), {
									"data-slot": "content",
									class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(unref(AccordionRoot_default), mergeProps({
											...unref(accordionProps),
											defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
										}, {
											as: "ul",
											"data-slot": "childList",
											class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
										}), {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(`<!--[-->`);
													ssrRenderList(item.children, (childItem, childIndex) => {
														_push(ssrRenderComponent(unref(ReuseItemTemplate), {
															key: childIndex,
															item: childItem,
															index: childIndex,
															level: level + 1,
															"list-index": listIndex,
															"data-slot": "childItem",
															class: ui.value.childItem({ class: [unref(props).ui?.childItem, childItem.ui?.childItem] })
														}, null, _parent, _scopeId));
													});
													_push(`<!--]-->`);
												} else return [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
													return openBlock(), createBlock(unref(ReuseItemTemplate), {
														key: childIndex,
														item: childItem,
														index: childIndex,
														level: level + 1,
														"list-index": listIndex,
														"data-slot": "childItem",
														class: ui.value.childItem({ class: [unref(props).ui?.childItem, childItem.ui?.childItem] })
													}, null, 8, [
														"item",
														"index",
														"level",
														"list-index",
														"class"
													]);
												}), 128))];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [createVNode(unref(AccordionRoot_default), mergeProps({
											...unref(accordionProps),
											defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
										}, {
											as: "ul",
											"data-slot": "childList",
											class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
										}), {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
												return openBlock(), createBlock(unref(ReuseItemTemplate), {
													key: childIndex,
													item: childItem,
													index: childIndex,
													level: level + 1,
													"list-index": listIndex,
													"data-slot": "childItem",
													class: ui.value.childItem({ class: [unref(props).ui?.childItem, childItem.ui?.childItem] })
												}, null, 8, [
													"item",
													"index",
													"level",
													"list-index",
													"class"
												]);
											}), 128))]),
											_: 2
										}, 1040, ["class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [unref(props).orientation === "vertical" && item.type === "label" && !unref(props).collapsed ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "label",
								class: ui.value.label({ class: [
									unref(props).ui?.label,
									item.ui?.label,
									item.class
								] })
							}, [createVNode(unref(ReuseLinkTemplate), {
								item,
								index
							}, null, 8, ["item", "index"])], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$f, mergeProps({ key: 1 }, unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
								default: withCtx(({ active, ...slotProps }) => [(openBlock(), createBlock(resolveDynamicComponent(unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger_default) : unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && !slotProps.href ? unref(AccordionTrigger_default) : unref(NavigationMenuLink_default)), {
									"as-child": "",
									active: active || item.active,
									disabled: item.disabled,
									onSelect: item.onSelect
								}, {
									default: withCtx(() => [unref(props).orientation === "vertical" && unref(props).collapsed && item.children?.length && (!!unref(props).popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 0 }, {
										...popoverProps.value,
										...typeof item.popover === "boolean" ? {} : item.popover || {}
									}, { ui: { content: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] }) } }), {
										content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
											item,
											active: active || item.active,
											index,
											ui: ui.value,
											close
										}, () => [createVNode("ul", {
											"data-slot": "childList",
											class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
										}, [createVNode("li", {
											"data-slot": "childLabel",
											class: ui.value.childLabel({ class: [unref(props).ui?.childLabel, item.ui?.childLabel] })
										}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
											return openBlock(), createBlock("li", {
												key: childIndex,
												"data-slot": "childItem",
												class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
											}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
												default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
													"as-child": "",
													active: childActive,
													onSelect: childItem.onSelect
												}, {
													default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
														"data-slot": "childLink",
														class: ui.value.childLink({
															class: [
																unref(props).ui?.childLink,
																item.ui?.childLink,
																childItem.class
															],
															active: childActive
														})
													}), {
														default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
															key: 0,
															name: childItem.icon,
															"data-slot": "childLinkIcon",
															class: ui.value.childLinkIcon({
																class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
																active: childActive
															})
														}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
															"data-slot": "childLinkLabel",
															class: ui.value.childLinkLabel({
																class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
																active: childActive
															})
														}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
															key: 0,
															name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
															"data-slot": "childLinkLabelExternalIcon",
															class: ui.value.childLinkLabelExternalIcon({
																class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																active: childActive
															})
														}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
														_: 2
													}, 1040, ["class"])]),
													_: 2
												}, 1032, ["active", "onSelect"])]),
												_: 2
											}, 1040)], 2);
										}), 128))], 2)])]),
										default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
											"data-slot": "link",
											class: ui.value.link({
												class: [
													unref(props).ui?.link,
													item.ui?.link,
													item.class
												],
												active: active || item.active,
												disabled: !!item.disabled,
												level: level > 0
											})
										}), {
											default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
												item,
												active: active || item.active,
												index
											}, null, 8, [
												"item",
												"active",
												"index"
											])]),
											_: 2
										}, 1040, ["class"])]),
										_: 2
									}, 1040, ["ui"])) : unref(props).orientation === "vertical" && unref(props).collapsed && (!!unref(props).tooltip || !!item.tooltip) || unref(props).orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
										key: 1,
										text: unref(get$1)(item, unref(props).labelKey)
									}, {
										...tooltipProps.value,
										...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
									}), {
										default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
											"data-slot": "link",
											class: ui.value.link({
												class: [
													unref(props).ui?.link,
													item.ui?.link,
													item.class
												],
												active: active || item.active,
												disabled: !!item.disabled,
												level: level > 0
											})
										}), {
											default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
												item,
												active: active || item.active,
												index
											}, null, 8, [
												"item",
												"active",
												"index"
											])]),
											_: 2
										}, 1040, ["class"])]),
										_: 2
									}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$1$3, mergeProps({ key: 2 }, slotProps, {
										"data-slot": "link",
										class: ui.value.link({
											class: [
												unref(props).ui?.link,
												item.ui?.link,
												item.class
											],
											active: active || item.active,
											disabled: !!item.disabled,
											level: unref(props).orientation === "horizontal" || level > 0
										})
									}), {
										default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
											item,
											active: active || item.active,
											index
										}, null, 8, [
											"item",
											"active",
											"index"
										])]),
										_: 2
									}, 1040, ["class"]))]),
									_: 2
								}, 1064, [
									"active",
									"disabled",
									"onSelect"
								])), unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent_default), mergeProps({ key: 0 }, contentProps.value, {
									"data-slot": "content",
									class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
								}), {
									default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
										item,
										active: active || item.active,
										index,
										ui: ui.value
									}, () => [createVNode("ul", {
										"data-slot": "childList",
										class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
									}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
										return openBlock(), createBlock("li", {
											key: childIndex,
											"data-slot": "childItem",
											class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
										}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
											default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
												"as-child": "",
												active: childActive,
												onSelect: childItem.onSelect
											}, {
												default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
													"data-slot": "childLink",
													class: ui.value.childLink({
														class: [
															unref(props).ui?.childLink,
															item.ui?.childLink,
															childItem.class
														],
														active: childActive
													})
												}), {
													default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
														key: 0,
														name: childItem.icon,
														"data-slot": "childLinkIcon",
														class: ui.value.childLinkIcon({
															class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
														"data-slot": "childLinkWrapper",
														class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
													}, [createVNode("p", {
														"data-slot": "childLinkLabel",
														class: ui.value.childLinkLabel({
															class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
															active: childActive
														})
													}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
														key: 0,
														name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
														"data-slot": "childLinkLabelExternalIcon",
														class: ui.value.childLinkLabelExternalIcon({
															class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
														key: 0,
														"data-slot": "childLinkDescription",
														class: ui.value.childLinkDescription({
															class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
															active: childActive
														})
													}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1032, ["active", "onSelect"])]),
											_: 2
										}, 1040)], 2);
									}), 128))], 2)])]),
									_: 2
								}, 1040, ["class"])) : createCommentVNode("", true)]),
								_: 2
							}, 1040)) : createCommentVNode("", true), unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed ? (openBlock(), createBlock(unref(AccordionContent_default), {
								key: 2,
								"data-slot": "content",
								class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
							}, {
								default: withCtx(() => [createVNode(unref(AccordionRoot_default), mergeProps({
									...unref(accordionProps),
									defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
								}, {
									as: "ul",
									"data-slot": "childList",
									class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
								}), {
									default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
										return openBlock(), createBlock(unref(ReuseItemTemplate), {
											key: childIndex,
											item: childItem,
											index: childIndex,
											level: level + 1,
											"list-index": listIndex,
											"data-slot": "childItem",
											class: ui.value.childItem({ class: [unref(props).ui?.childItem, childItem.ui?.childItem] })
										}, null, 8, [
											"item",
											"index",
											"level",
											"list-index",
											"class"
										]);
									}), 128))]),
									_: 2
								}, 1040, ["class"])]),
								_: 2
							}, 1032, ["class"])) : createCommentVNode("", true)];
						}),
						_: 2
					}), _parent, _scopeId);
					else return [(openBlock(), createBlock(resolveDynamicComponent(unref(props).orientation === "vertical" && !unref(props).collapsed ? unref(AccordionItem_default) : unref(NavigationMenuItem_default)), mergeProps({ as: "li" }, unref(props).orientation === "vertical" && !unref(props).collapsed ? { disabled: !!item.disabled } : {}, { value: getItemValue(item, index, level, listIndex) }), {
						default: withCtx(() => [unref(props).orientation === "vertical" && item.type === "label" && !unref(props).collapsed ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "label",
							class: ui.value.label({ class: [
								unref(props).ui?.label,
								item.ui?.label,
								item.class
							] })
						}, [createVNode(unref(ReuseLinkTemplate), {
							item,
							index
						}, null, 8, ["item", "index"])], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$f, mergeProps({ key: 1 }, unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
							default: withCtx(({ active, ...slotProps }) => [(openBlock(), createBlock(resolveDynamicComponent(unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger_default) : unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed && !slotProps.href ? unref(AccordionTrigger_default) : unref(NavigationMenuLink_default)), {
								"as-child": "",
								active: active || item.active,
								disabled: item.disabled,
								onSelect: item.onSelect
							}, {
								default: withCtx(() => [unref(props).orientation === "vertical" && unref(props).collapsed && item.children?.length && (!!unref(props).popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$3, mergeProps({ key: 0 }, {
									...popoverProps.value,
									...typeof item.popover === "boolean" ? {} : item.popover || {}
								}, { ui: { content: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] }) } }), {
									content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
										item,
										active: active || item.active,
										index,
										ui: ui.value,
										close
									}, () => [createVNode("ul", {
										"data-slot": "childList",
										class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
									}, [createVNode("li", {
										"data-slot": "childLabel",
										class: ui.value.childLabel({ class: [unref(props).ui?.childLabel, item.ui?.childLabel] })
									}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
										return openBlock(), createBlock("li", {
											key: childIndex,
											"data-slot": "childItem",
											class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
										}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
											default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
												"as-child": "",
												active: childActive,
												onSelect: childItem.onSelect
											}, {
												default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
													"data-slot": "childLink",
													class: ui.value.childLink({
														class: [
															unref(props).ui?.childLink,
															item.ui?.childLink,
															childItem.class
														],
														active: childActive
													})
												}), {
													default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
														key: 0,
														name: childItem.icon,
														"data-slot": "childLinkIcon",
														class: ui.value.childLinkIcon({
															class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
														"data-slot": "childLinkLabel",
														class: ui.value.childLinkLabel({
															class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
															active: childActive
														})
													}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
														key: 0,
														name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
														"data-slot": "childLinkLabelExternalIcon",
														class: ui.value.childLinkLabelExternalIcon({
															class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1032, ["active", "onSelect"])]),
											_: 2
										}, 1040)], 2);
									}), 128))], 2)])]),
									default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
										"data-slot": "link",
										class: ui.value.link({
											class: [
												unref(props).ui?.link,
												item.ui?.link,
												item.class
											],
											active: active || item.active,
											disabled: !!item.disabled,
											level: level > 0
										})
									}), {
										default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
											item,
											active: active || item.active,
											index
										}, null, 8, [
											"item",
											"active",
											"index"
										])]),
										_: 2
									}, 1040, ["class"])]),
									_: 2
								}, 1040, ["ui"])) : unref(props).orientation === "vertical" && unref(props).collapsed && (!!unref(props).tooltip || !!item.tooltip) || unref(props).orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
									key: 1,
									text: unref(get$1)(item, unref(props).labelKey)
								}, {
									...tooltipProps.value,
									...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
								}), {
									default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
										"data-slot": "link",
										class: ui.value.link({
											class: [
												unref(props).ui?.link,
												item.ui?.link,
												item.class
											],
											active: active || item.active,
											disabled: !!item.disabled,
											level: level > 0
										})
									}), {
										default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
											item,
											active: active || item.active,
											index
										}, null, 8, [
											"item",
											"active",
											"index"
										])]),
										_: 2
									}, 1040, ["class"])]),
									_: 2
								}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$1$3, mergeProps({ key: 2 }, slotProps, {
									"data-slot": "link",
									class: ui.value.link({
										class: [
											unref(props).ui?.link,
											item.ui?.link,
											item.class
										],
										active: active || item.active,
										disabled: !!item.disabled,
										level: unref(props).orientation === "horizontal" || level > 0
									})
								}), {
									default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
										item,
										active: active || item.active,
										index
									}, null, 8, [
										"item",
										"active",
										"index"
									])]),
									_: 2
								}, 1040, ["class"]))]),
								_: 2
							}, 1064, [
								"active",
								"disabled",
								"onSelect"
							])), unref(props).orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent_default), mergeProps({ key: 0 }, contentProps.value, {
								"data-slot": "content",
								class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
							}), {
								default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
									item,
									active: active || item.active,
									index,
									ui: ui.value
								}, () => [createVNode("ul", {
									"data-slot": "childList",
									class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
								}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
									return openBlock(), createBlock("li", {
										key: childIndex,
										"data-slot": "childItem",
										class: ui.value.childItem({ class: [unref(props).ui?.childItem, item.ui?.childItem] })
									}, [createVNode(_sfc_main$f, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
										default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink_default), {
											"as-child": "",
											active: childActive,
											onSelect: childItem.onSelect
										}, {
											default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps({ ref_for: true }, childSlotProps, {
												"data-slot": "childLink",
												class: ui.value.childLink({
													class: [
														unref(props).ui?.childLink,
														item.ui?.childLink,
														childItem.class
													],
													active: childActive
												})
											}), {
												default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
													key: 0,
													name: childItem.icon,
													"data-slot": "childLinkIcon",
													class: ui.value.childLinkIcon({
														class: [unref(props).ui?.childLinkIcon, item.ui?.childLinkIcon],
														active: childActive
													})
												}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
													"data-slot": "childLinkWrapper",
													class: ui.value.childLinkWrapper({ class: [unref(props).ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
												}, [createVNode("p", {
													"data-slot": "childLinkLabel",
													class: ui.value.childLinkLabel({
														class: [unref(props).ui?.childLinkLabel, item.ui?.childLinkLabel],
														active: childActive
													})
												}, [createTextVNode(toDisplayString(unref(get$1)(childItem, unref(props).labelKey)) + " ", 1), childItem.target === "_blank" && unref(props).externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$2, {
													key: 0,
													name: typeof unref(props).externalIcon === "string" ? unref(props).externalIcon : unref(appConfig).ui.icons.external,
													"data-slot": "childLinkLabelExternalIcon",
													class: ui.value.childLinkLabelExternalIcon({
														class: [unref(props).ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
														active: childActive
													})
												}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
													key: 0,
													"data-slot": "childLinkDescription",
													class: ui.value.childLinkDescription({
														class: [unref(props).ui?.childLinkDescription, item.ui?.childLinkDescription],
														active: childActive
													})
												}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
												_: 2
											}, 1040, ["class"])]),
											_: 2
										}, 1032, ["active", "onSelect"])]),
										_: 2
									}, 1040)], 2);
								}), 128))], 2)])]),
								_: 2
							}, 1040, ["class"])) : createCommentVNode("", true)]),
							_: 2
						}, 1040)) : createCommentVNode("", true), unref(props).orientation === "vertical" && item.children?.length && !unref(props).collapsed ? (openBlock(), createBlock(unref(AccordionContent_default), {
							key: 2,
							"data-slot": "content",
							class: ui.value.content({ class: [unref(props).ui?.content, item.ui?.content] })
						}, {
							default: withCtx(() => [createVNode(unref(AccordionRoot_default), mergeProps({
								...unref(accordionProps),
								defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
							}, {
								as: "ul",
								"data-slot": "childList",
								class: ui.value.childList({ class: [unref(props).ui?.childList, item.ui?.childList] })
							}), {
								default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
									return openBlock(), createBlock(unref(ReuseItemTemplate), {
										key: childIndex,
										item: childItem,
										index: childIndex,
										level: level + 1,
										"list-index": listIndex,
										"data-slot": "childItem",
										class: ui.value.childItem({ class: [unref(props).ui?.childItem, childItem.ui?.childItem] })
									}, null, 8, [
										"item",
										"index",
										"level",
										"list-index",
										"class"
									]);
								}), 128))]),
								_: 2
							}, 1040, ["class"])]),
							_: 2
						}, 1032, ["class"])) : createCommentVNode("", true)]),
						_: 2
					}, 1040, ["value"]))];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(NavigationMenuRoot_default), mergeProps({ "data-slot": "root" }, {
				...unref(rootProps),
				...unref(props).orientation === "horizontal" ? {
					modelValue: unref(props).modelValue,
					defaultValue: unref(props).defaultValue
				} : {},
				..._ctx.$attrs
			}, {
				"data-collapsed": unref(props).collapsed,
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push, _parent, _scopeId);
						_push(`<!--[-->`);
						ssrRenderList(lists.value, (list, listIndex) => {
							_push(`<!--[-->`);
							ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(props).orientation === "vertical" ? unref(AccordionRoot_default) : unref(NavigationMenuList_default)), mergeProps({ ref_for: true }, unref(props).orientation === "vertical" && !unref(props).collapsed ? {
								...unref(accordionProps),
								modelValue: unref(props).modelValue,
								defaultValue: unref(props).defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
							} : {}, {
								as: "ul",
								"data-slot": "list",
								class: ui.value.list({ class: unref(props).ui?.list })
							}), {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<!--[-->`);
										ssrRenderList(list, (item, index) => {
											_push(ssrRenderComponent(unref(ReuseItemTemplate), {
												key: `list-${listIndex}-${index}`,
												item,
												index,
												"list-index": listIndex,
												"data-slot": "item",
												class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item] })
											}, null, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									} else return [(openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
										return openBlock(), createBlock(unref(ReuseItemTemplate), {
											key: `list-${listIndex}-${index}`,
											item,
											index,
											"list-index": listIndex,
											"data-slot": "item",
											class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item] })
										}, null, 8, [
											"item",
											"index",
											"list-index",
											"class"
										]);
									}), 128))];
								}),
								_: 2
							}), _parent, _scopeId);
							if (unref(props).orientation === "vertical" && listIndex < lists.value.length - 1) _push(`<div data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: unref(props).ui?.separator }))}"${_scopeId}></div>`);
							else _push(`<!---->`);
							_push(`<!--]-->`);
						});
						_push(`<!--]-->`);
						ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push, _parent, _scopeId);
						if (unref(props).orientation === "horizontal") {
							_push(`<div data-slot="viewportWrapper" class="${ssrRenderClass(ui.value.viewportWrapper({ class: unref(props).ui?.viewportWrapper }))}"${_scopeId}>`);
							if (unref(props).arrow) _push(ssrRenderComponent(unref(NavigationMenuIndicator_default), {
								"data-slot": "indicator",
								class: ui.value.indicator({ class: unref(props).ui?.indicator })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div data-slot="arrow" class="${ssrRenderClass(ui.value.arrow({ class: unref(props).ui?.arrow }))}"${_scopeId}></div>`);
									else return [createVNode("div", {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(props).ui?.arrow })
									}, null, 2)];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push(ssrRenderComponent(unref(NavigationMenuViewport_default), {
								"data-slot": "viewport",
								class: ui.value.viewport({ class: unref(props).ui?.viewport })
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [
						renderSlot(_ctx.$slots, "list-leading"),
						(openBlock(true), createBlock(Fragment, null, renderList(lists.value, (list, listIndex) => {
							return openBlock(), createBlock(Fragment, { key: `list-${listIndex}` }, [(openBlock(), createBlock(resolveDynamicComponent(unref(props).orientation === "vertical" ? unref(AccordionRoot_default) : unref(NavigationMenuList_default)), mergeProps({ ref_for: true }, unref(props).orientation === "vertical" && !unref(props).collapsed ? {
								...unref(accordionProps),
								modelValue: unref(props).modelValue,
								defaultValue: unref(props).defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
							} : {}, {
								as: "ul",
								"data-slot": "list",
								class: ui.value.list({ class: unref(props).ui?.list })
							}), {
								default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
									return openBlock(), createBlock(unref(ReuseItemTemplate), {
										key: `list-${listIndex}-${index}`,
										item,
										index,
										"list-index": listIndex,
										"data-slot": "item",
										class: ui.value.item({ class: [unref(props).ui?.item, item.ui?.item] })
									}, null, 8, [
										"item",
										"index",
										"list-index",
										"class"
									]);
								}), 128))]),
								_: 2
							}, 1040, ["class"])), unref(props).orientation === "vertical" && listIndex < lists.value.length - 1 ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "separator",
								class: ui.value.separator({ class: unref(props).ui?.separator })
							}, null, 2)) : createCommentVNode("", true)], 64);
						}), 128)),
						renderSlot(_ctx.$slots, "list-trailing"),
						unref(props).orientation === "horizontal" ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "viewportWrapper",
							class: ui.value.viewportWrapper({ class: unref(props).ui?.viewportWrapper })
						}, [unref(props).arrow ? (openBlock(), createBlock(unref(NavigationMenuIndicator_default), {
							key: 0,
							"data-slot": "indicator",
							class: ui.value.indicator({ class: unref(props).ui?.indicator })
						}, {
							default: withCtx(() => [createVNode("div", {
								"data-slot": "arrow",
								class: ui.value.arrow({ class: unref(props).ui?.arrow })
							}, null, 2)]),
							_: 1
						}, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(NavigationMenuViewport_default), {
							"data-slot": "viewport",
							class: ui.value.viewport({ class: unref(props).ui?.viewport })
						}, null, 8, ["class"])], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$4 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region app/components/UserMenu.vue?vue&type=script&setup=true&lang.ts
var UserMenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "UserMenu",
	__ssrInlineRender: true,
	props: { collapsed: { type: Boolean } },
	setup(__props) {
		const colorMode = useColorMode();
		const appConfig = useAppConfig();
		const colors = [
			"red",
			"orange",
			"amber",
			"yellow",
			"lime",
			"green",
			"emerald",
			"teal",
			"cyan",
			"sky",
			"blue",
			"indigo",
			"violet",
			"purple",
			"fuchsia",
			"pink",
			"rose"
		];
		const neutrals = [
			"slate",
			"gray",
			"zinc",
			"neutral",
			"stone",
			"taupe",
			"mauve",
			"mist",
			"olive"
		];
		const { user: authUser, logout, fetchMe } = useAuth();
		const isProfileOpen = ref(false);
		const isProfileLoading = ref(false);
		const displayName = computed(() => {
			if (authUser.value?.person) {
				const p = authUser.value.person;
				return `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || authUser.value.username;
			}
			return authUser.value?.username ?? "Usuario";
		});
		const userDetails = computed(() => ({
			name: displayName.value,
			avatar: {
				src: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName.value)}`,
				alt: displayName.value
			}
		}));
		const branchNames = computed(() => {
			if (!authUser.value?.roles?.length) return "Global (Sin Sucursal)";
			const names = authUser.value.roles.map((role) => role.branch_name).filter((name) => Boolean(name));
			const uniqueNames = [...new Set(names)];
			if (uniqueNames.length === 0) return "Global (Sin Sucursal)";
			return uniqueNames.join(", ");
		});
		const roleNameDisplay = computed(() => {
			if (!authUser.value?.roles?.length) return "N/A";
			const names = authUser.value.roles.map((role) => role.name);
			return [...new Set(names)].join(", ");
		});
		const openProfile = async () => {
			isProfileOpen.value = true;
			if (fetchMe) {
				isProfileLoading.value = true;
				await fetchMe();
				isProfileLoading.value = false;
			}
		};
		const items = computed(() => [
			[{
				type: "label",
				label: userDetails.value.name,
				avatar: userDetails.value.avatar
			}, {
				label: "Profile",
				icon: "i-lucide-user",
				onSelect: openProfile
			}],
			[{
				label: "Theme",
				icon: "i-lucide-palette",
				children: [{
					label: "Primary",
					slot: "chip",
					chip: appConfig.ui.colors.primary,
					content: {
						align: "center",
						collisionPadding: 16
					},
					children: colors.map((color) => ({
						label: color,
						chip: color,
						slot: "chip",
						checked: appConfig.ui.colors.primary === color,
						type: "checkbox",
						onSelect: (e) => {
							e.preventDefault();
							appConfig.ui.colors.primary = color;
						}
					}))
				}, {
					label: "Neutral",
					slot: "chip",
					chip: appConfig.ui.colors.neutral === "neutral" ? "old-neutral" : appConfig.ui.colors.neutral,
					content: {
						align: "end",
						collisionPadding: 16
					},
					children: neutrals.map((color) => ({
						label: color,
						chip: color === "neutral" ? "old-neutral" : color,
						slot: "chip",
						type: "checkbox",
						checked: appConfig.ui.colors.neutral === color,
						onSelect: (e) => {
							e.preventDefault();
							appConfig.ui.colors.neutral = color;
						}
					}))
				}]
			}, {
				label: "Appearance",
				icon: "i-lucide-sun-moon",
				children: [{
					label: "Light",
					icon: "i-lucide-sun",
					type: "checkbox",
					checked: colorMode.value === "light",
					onSelect(e) {
						e.preventDefault();
						colorMode.preference = "light";
					}
				}, {
					label: "Dark",
					icon: "i-lucide-moon",
					type: "checkbox",
					checked: colorMode.value === "dark",
					onUpdateChecked(checked) {
						if (checked) colorMode.preference = "dark";
					},
					onSelect(e) {
						e.preventDefault();
					}
				}]
			}],
			[{
				label: "Log out",
				icon: "i-lucide-log-out",
				onSelect: async () => {
					await logout();
					await navigateTo("/login");
				}
			}]
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDropdownMenu = _sfc_main$g;
			const _component_UButton = _sfc_main$b;
			const _component_UModal = _sfc_main$8;
			const _component_UIcon = _sfc_main$2$2;
			const _component_UAvatar = _sfc_main$1$2;
			const _component_UBadge = _sfc_main$e;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDropdownMenu, {
				items: unref(items),
				content: {
					align: "center",
					collisionPadding: 12
				},
				ui: { content: __props.collapsed ? "w-48" : "w-(--reka-dropdown-menu-trigger-width)" }
			}, {
				"chip-leading": withCtx(({ item }, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="inline-flex items-center justify-center shrink-0 size-5"${_scopeId}><span class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2" style="${ssrRenderStyle({
						"--chip-light": `var(--color-${item.chip}-500)`,
						"--chip-dark": `var(--color-${item.chip}-400)`
					})}"${_scopeId}></span></div>`);
					else return [createVNode("div", { class: "inline-flex items-center justify-center shrink-0 size-5" }, [createVNode("span", {
						class: "rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2",
						style: {
							"--chip-light": `var(--color-${item.chip}-500)`,
							"--chip-dark": `var(--color-${item.chip}-400)`
						}
					}, null, 4)])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, mergeProps({
						...unref(userDetails),
						label: __props.collapsed ? void 0 : unref(userDetails)?.name,
						trailingIcon: __props.collapsed ? void 0 : "i-lucide-chevrons-up-down"
					}, {
						color: "neutral",
						variant: "ghost",
						block: "",
						square: __props.collapsed,
						class: "data-[state=open]:bg-elevated",
						ui: { trailingIcon: "text-dimmed" }
					}), null, _parent, _scopeId));
					else return [createVNode(_component_UButton, mergeProps({
						...unref(userDetails),
						label: __props.collapsed ? void 0 : unref(userDetails)?.name,
						trailingIcon: __props.collapsed ? void 0 : "i-lucide-chevrons-up-down"
					}, {
						color: "neutral",
						variant: "ghost",
						block: "",
						square: __props.collapsed,
						class: "data-[state=open]:bg-elevated",
						ui: { trailingIcon: "text-dimmed" }
					}), null, 16, ["square"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(isProfileOpen),
				"onUpdate:open": ($event) => isRef(isProfileOpen) ? isProfileOpen.value = $event : null,
				title: "Mi Perfil",
				description: "Información detallada de tu cuenta",
				ui: { content: "max-w-lg" }
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (unref(isProfileLoading) && !unref(authUser)?.person?.email) {
						_push(`<div class="flex flex-col items-center justify-center py-12 gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-loader-2",
							class: "animate-spin size-8 text-primary"
						}, null, _parent, _scopeId));
						_push(`<p class="text-sm text-dimmed"${_scopeId}>Cargando perfil...</p></div>`);
					} else {
						_push(`<div${_scopeId}><div class="flex flex-col items-center gap-4 py-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAvatar, {
							src: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(unref(displayName))}`,
							alt: unref(displayName),
							size: "xl",
							class: "ring-2 ring-primary-500 shadow-md"
						}, null, _parent, _scopeId));
						_push(`<div class="text-center"${_scopeId}><h3 class="text-lg font-semibold text-strong"${_scopeId}>${ssrInterpolate(unref(displayName))}</h3><p class="text-sm text-dimmed"${_scopeId}>@${ssrInterpolate(unref(authUser)?.username)}</p></div></div><div class="space-y-3 mt-2"${_scopeId}><div class="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-mail",
							class: "text-dimmed size-4"
						}, null, _parent, _scopeId));
						_push(`<span class="text-sm font-medium text-strong"${_scopeId}>Correo</span></div><span class="text-sm text-dimmed"${_scopeId}>${ssrInterpolate(unref(authUser)?.person?.email ?? "No registrado")}</span></div><div class="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-shield",
							class: "text-dimmed size-4"
						}, null, _parent, _scopeId));
						_push(`<span class="text-sm font-medium text-strong"${_scopeId}>Rol</span></div>`);
						_push(ssrRenderComponent(_component_UBadge, {
							color: "primary",
							variant: "subtle",
							size: "sm"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(roleNameDisplay))}`);
								else return [createTextVNode(toDisplayString(unref(roleNameDisplay)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-store",
							class: "text-dimmed size-4"
						}, null, _parent, _scopeId));
						_push(`<span class="text-sm font-medium text-strong"${_scopeId}>Sucursal</span></div><span class="text-sm text-dimmed"${_scopeId}>${ssrInterpolate(unref(branchNames))}</span></div></div><div class="flex justify-end gap-2 mt-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Cerrar",
							color: "neutral",
							variant: "subtle",
							onClick: ($event) => isProfileOpen.value = false
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
					}
					else return [unref(isProfileLoading) && !unref(authUser)?.person?.email ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-12 gap-3"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-2",
						class: "animate-spin size-8 text-primary"
					}), createVNode("p", { class: "text-sm text-dimmed" }, "Cargando perfil...")])) : (openBlock(), createBlock("div", { key: 1 }, [
						createVNode("div", { class: "flex flex-col items-center gap-4 py-4" }, [createVNode(_component_UAvatar, {
							src: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(unref(displayName))}`,
							alt: unref(displayName),
							size: "xl",
							class: "ring-2 ring-primary-500 shadow-md"
						}, null, 8, ["src", "alt"]), createVNode("div", { class: "text-center" }, [createVNode("h3", { class: "text-lg font-semibold text-strong" }, toDisplayString(unref(displayName)), 1), createVNode("p", { class: "text-sm text-dimmed" }, "@" + toDisplayString(unref(authUser)?.username), 1)])]),
						createVNode("div", { class: "space-y-3 mt-2" }, [
							createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-mail",
								class: "text-dimmed size-4"
							}), createVNode("span", { class: "text-sm font-medium text-strong" }, "Correo")]), createVNode("span", { class: "text-sm text-dimmed" }, toDisplayString(unref(authUser)?.person?.email ?? "No registrado"), 1)]),
							createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-shield",
								class: "text-dimmed size-4"
							}), createVNode("span", { class: "text-sm font-medium text-strong" }, "Rol")]), createVNode(_component_UBadge, {
								color: "primary",
								variant: "subtle",
								size: "sm"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(roleNameDisplay)), 1)]),
								_: 1
							})]),
							createVNode("div", { class: "flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-store",
								class: "text-dimmed size-4"
							}), createVNode("span", { class: "text-sm font-medium text-strong" }, "Sucursal")]), createVNode("span", { class: "text-sm text-dimmed" }, toDisplayString(unref(branchNames)), 1)])
						]),
						createVNode("div", { class: "flex justify-end gap-2 mt-6" }, [createVNode(_component_UButton, {
							label: "Cerrar",
							color: "neutral",
							variant: "subtle",
							onClick: ($event) => isProfileOpen.value = false
						}, null, 8, ["onClick"])])
					]))];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/components/UserMenu.vue
var _sfc_setup$3 = UserMenu_vue_vue_type_script_setup_true_lang_default.setup;
UserMenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserMenu.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var UserMenu_default = Object.assign(UserMenu_vue_vue_type_script_setup_true_lang_default, { __name: "UserMenu" });
//#endregion
//#region node_modules/.pnpm/fuse.js@7.5.0/node_modules/fuse.js/dist/fuse.mjs
/**
* Fuse.js v7.5.0 - Lightweight fuzzy-search (http://fusejs.io)
*
* Copyright (c) 2026 Kiro Risk (http://kiro.me)
* All Rights Reserved. Apache Software License 2.0
*
* http://www.apache.org/licenses/LICENSE-2.0
*/
function isArray(value) {
	return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
function baseToString(value) {
	if (typeof value == "string") return value;
	if (typeof value === "bigint") return value.toString();
	const result = value + "";
	return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
function toString(value) {
	return value == null ? "" : baseToString(value);
}
function isString(value) {
	return typeof value === "string";
}
function isNumber(value) {
	return typeof value === "number";
}
function isBoolean(value) {
	return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
	return typeof value === "object";
}
function isObjectLike(value) {
	return isObject(value) && value !== null;
}
function isDefined(value) {
	return value !== void 0 && value !== null;
}
function isBlank(value) {
	return !value.trim().length;
}
function getTag(value) {
	return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
var INVALID_DOC_INDEX = "Invalid doc index: must be a non-negative integer within the bounds of the docs array";
var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
var FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED = "Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.";
var hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
	constructor(keys) {
		this._keys = [];
		this._keyMap = {};
		let totalWeight = 0;
		keys.forEach((key) => {
			const obj = createKey(key);
			this._keys.push(obj);
			this._keyMap[obj.id] = obj;
			totalWeight += obj.weight;
		});
		this._keys.forEach((key) => {
			key.weight /= totalWeight;
		});
	}
	get(keyId) {
		return this._keyMap[keyId];
	}
	keys() {
		return this._keys;
	}
	toJSON() {
		return JSON.stringify(this._keys);
	}
};
function createKey(key) {
	let path = null;
	let id = null;
	let src = null;
	let weight = 1;
	let getFn = null;
	if (isString(key) || isArray(key)) {
		src = key;
		path = createKeyPath(key);
		id = createKeyId(key);
	} else {
		if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
		const name = key.name;
		src = name;
		if (hasOwn.call(key, "weight") && key.weight !== void 0) {
			weight = key.weight;
			if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(createKeyId(name)));
		}
		path = createKeyPath(name);
		id = createKeyId(name);
		getFn = key.getFn ?? null;
	}
	return {
		path,
		id,
		weight,
		src,
		getFn
	};
}
function createKeyPath(key) {
	return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
	return isArray(key) ? key.join(".") : key;
}
function get(obj, path) {
	const list = [];
	let arr = false;
	const deepGet = (obj, path, index, arrayIndex) => {
		if (!isDefined(obj)) return;
		if (!path[index]) list.push(arrayIndex !== void 0 ? {
			v: obj,
			i: arrayIndex
		} : obj);
		else {
			const value = obj[path[index]];
			if (!isDefined(value)) return;
			if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value) || typeof value === "bigint")) list.push(arrayIndex !== void 0 ? {
				v: toString(value),
				i: arrayIndex
			} : toString(value));
			else if (isArray(value)) {
				arr = true;
				for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path, index + 1, i);
			} else if (path.length) deepGet(value, path, index + 1, arrayIndex);
		}
	};
	deepGet(obj, isString(path) ? path.split(".") : path, 0);
	return arr ? list : list[0];
}
var MatchOptions = {
	includeMatches: false,
	findAllMatches: false,
	minMatchCharLength: 1
};
var BasicOptions = {
	isCaseSensitive: false,
	ignoreDiacritics: false,
	includeScore: false,
	keys: [],
	shouldSort: true,
	sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
var FuzzyOptions = {
	location: 0,
	threshold: .6,
	distance: 100
};
var AdvancedOptions = {
	useExtendedSearch: false,
	useTokenSearch: false,
	tokenize: void 0,
	tokenMatch: "any",
	getFn: get,
	ignoreLocation: false,
	ignoreFieldNorm: false,
	fieldNormWeight: 1
};
var Config = Object.freeze({
	...BasicOptions,
	...MatchOptions,
	...FuzzyOptions,
	...AdvancedOptions
});
function isWordSeparator(code) {
	return code >= 9 && code <= 13 || code === 32 || code === 160;
}
function norm(weight = 1, mantissa = 3) {
	const cache = /* @__PURE__ */ new Map();
	const m = Math.pow(10, mantissa);
	return {
		get(value) {
			let numTokens = 0;
			let inWord = false;
			for (let i = 0; i < value.length; i++) if (!isWordSeparator(value.charCodeAt(i))) {
				if (!inWord) {
					numTokens++;
					inWord = true;
				}
			} else inWord = false;
			if (numTokens === 0) numTokens = 1;
			if (cache.has(numTokens)) return cache.get(numTokens);
			const n = Math.round(m / Math.pow(numTokens, .5 * weight)) / m;
			cache.set(numTokens, n);
			return n;
		},
		clear() {
			cache.clear();
		}
	};
}
var FuseIndex = class {
	constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
		this.norm = norm(fieldNormWeight, 3);
		this.getFn = getFn;
		this.isCreated = false;
		this.docs = [];
		this.keys = [];
		this._keysMap = {};
		this.setIndexRecords();
	}
	setSources(docs = []) {
		this.docs = docs;
	}
	setIndexRecords(records = []) {
		this.records = records;
	}
	setKeys(keys = []) {
		this.keys = keys;
		this._keysMap = {};
		keys.forEach((key, idx) => {
			this._keysMap[key.id] = idx;
		});
	}
	create() {
		if (this.isCreated || !this.docs.length) return;
		this.isCreated = true;
		const len = this.docs.length;
		this.records = new Array(len);
		let recordCount = 0;
		if (isString(this.docs[0])) for (let i = 0; i < len; i++) {
			const record = this._createStringRecord(this.docs[i], i);
			if (record) this.records[recordCount++] = record;
		}
		else for (let i = 0; i < len; i++) this.records[recordCount++] = this._createObjectRecord(this.docs[i], i);
		this.records.length = recordCount;
		this.norm.clear();
	}
	add(doc, docIndex) {
		if (!Number.isInteger(docIndex) || docIndex < 0) throw new Error(INVALID_DOC_INDEX);
		if (isString(doc)) {
			const record = this._createStringRecord(doc, docIndex);
			if (record) this.records.push(record);
			return record;
		}
		const record = this._createObjectRecord(doc, docIndex);
		this.records.push(record);
		return record;
	}
	removeAt(idx) {
		if (!Number.isInteger(idx) || idx < 0) throw new Error(INVALID_DOC_INDEX);
		for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i === idx) {
			this.records.splice(i, 1);
			break;
		}
		for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i > idx) this.records[i].i -= 1;
	}
	removeAll(indices) {
		const toRemove = /* @__PURE__ */ new Set();
		for (const v of indices) if (Number.isInteger(v) && v >= 0) toRemove.add(v);
		if (toRemove.size === 0) return;
		this.records = this.records.filter((r) => !toRemove.has(r.i));
		const sorted = Array.from(toRemove).sort((a, b) => a - b);
		for (const record of this.records) {
			let lo = 0;
			let hi = sorted.length;
			while (lo < hi) {
				const mid = lo + hi >>> 1;
				if (sorted[mid] < record.i) lo = mid + 1;
				else hi = mid;
			}
			record.i -= lo;
		}
	}
	getValueForItemAtKeyId(item, keyId) {
		return item[this._keysMap[keyId]];
	}
	size() {
		return this.records.length;
	}
	_createStringRecord(doc, docIndex) {
		if (!isDefined(doc) || isBlank(doc)) return null;
		return {
			v: doc,
			i: docIndex,
			n: this.norm.get(doc)
		};
	}
	_createObjectRecord(doc, docIndex) {
		const record = {
			i: docIndex,
			$: {}
		};
		for (let keyIndex = 0, keyLen = this.keys.length; keyIndex < keyLen; keyIndex++) {
			const key = this.keys[keyIndex];
			const value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
			if (!isDefined(value)) continue;
			if (isArray(value)) {
				const subRecords = [];
				for (let i = 0, len = value.length; i < len; i += 1) {
					const item = value[i];
					if (!isDefined(item)) continue;
					if (isString(item)) {
						if (!isBlank(item)) {
							const subRecord = {
								v: item,
								i,
								n: this.norm.get(item)
							};
							subRecords.push(subRecord);
						}
					} else if (isDefined(item.v)) {
						const text = isString(item.v) ? item.v : toString(item.v);
						if (!isBlank(text)) {
							const subRecord = {
								v: text,
								i: item.i,
								n: this.norm.get(text)
							};
							subRecords.push(subRecord);
						}
					}
				}
				record.$[keyIndex] = subRecords;
			} else if (isString(value) && !isBlank(value)) {
				const subRecord = {
					v: value,
					n: this.norm.get(value)
				};
				record.$[keyIndex] = subRecord;
			}
		}
		return record;
	}
	toJSON() {
		return {
			keys: this.keys.map(({ getFn, ...key }) => key),
			records: this.records
		};
	}
};
function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys.map(createKey));
	myIndex.setSources(docs);
	myIndex.create();
	return myIndex;
}
function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const { keys, records } = data;
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys);
	myIndex.setIndexRecords(records);
	return myIndex;
}
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
	const indices = [];
	let start = -1;
	let end = -1;
	let i = 0;
	for (let len = matchmask.length; i < len; i += 1) {
		const match = matchmask[i];
		if (match && start === -1) start = i;
		else if (!match && start !== -1) {
			end = i - 1;
			if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
			start = -1;
		}
	}
	if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
	return indices;
}
function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
	if (pattern.length > 32) throw new Error(PATTERN_LENGTH_TOO_LARGE(32));
	const patternLen = pattern.length;
	const textLen = text.length;
	const expectedLocation = Math.max(0, Math.min(location, textLen));
	let currentThreshold = threshold;
	let bestLocation = expectedLocation;
	const calcScore = (errors, currentLocation) => {
		const accuracy = errors / patternLen;
		if (ignoreLocation) return accuracy;
		const proximity = Math.abs(expectedLocation - currentLocation);
		if (!distance) return proximity ? 1 : accuracy;
		return accuracy + proximity / distance;
	};
	const computeMatches = minMatchCharLength > 1 || includeMatches;
	const matchMask = computeMatches ? Array(textLen) : [];
	let index;
	while ((index = text.indexOf(pattern, bestLocation)) > -1) {
		const score = calcScore(0, index);
		currentThreshold = Math.min(score, currentThreshold);
		bestLocation = index + patternLen;
		if (computeMatches) {
			let i = 0;
			while (i < patternLen) {
				matchMask[index + i] = 1;
				i += 1;
			}
		}
	}
	bestLocation = -1;
	let lastBitArr = [];
	let finalScore = 1;
	let bestErrors = 0;
	let binMax = patternLen + textLen;
	const mask = 1 << patternLen - 1;
	for (let i = 0; i < patternLen; i += 1) {
		let binMin = 0;
		let binMid = binMax;
		while (binMin < binMid) {
			if (calcScore(i, expectedLocation + binMid) <= currentThreshold) binMin = binMid;
			else binMax = binMid;
			binMid = Math.floor((binMax - binMin) / 2 + binMin);
		}
		binMax = binMid;
		let start = Math.max(1, expectedLocation - binMid + 1);
		const finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
		const bitArr = Array(finish + 2);
		bitArr[finish + 1] = (1 << i) - 1;
		for (let j = finish; j >= start; j -= 1) {
			const currentLocation = j - 1;
			const charMatch = patternAlphabet[text[currentLocation]];
			bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
			if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
			if (bitArr[j] & mask) {
				finalScore = calcScore(i, currentLocation);
				if (finalScore <= currentThreshold) {
					currentThreshold = finalScore;
					bestLocation = currentLocation;
					bestErrors = i;
					if (bestLocation <= expectedLocation) break;
					start = Math.max(1, 2 * expectedLocation - bestLocation);
				}
			}
		}
		if (calcScore(i + 1, expectedLocation) > currentThreshold) break;
		lastBitArr = bitArr;
	}
	if (computeMatches && bestLocation >= 0) {
		const matchEnd = Math.min(textLen - 1, bestLocation + patternLen - 1 + bestErrors);
		for (let k = bestLocation; k <= matchEnd; k += 1) if (patternAlphabet[text[k]]) matchMask[k] = 1;
	}
	const result = {
		isMatch: bestLocation >= 0,
		score: Math.max(.001, finalScore)
	};
	if (computeMatches) {
		const indices = convertMaskToIndices(matchMask, minMatchCharLength);
		if (!indices.length) result.isMatch = false;
		else if (includeMatches) result.indices = indices;
	}
	return result;
}
function createPatternAlphabet(pattern) {
	const mask = {};
	for (let i = 0, len = pattern.length; i < len; i += 1) {
		const char = pattern.charAt(i);
		mask[char] = (mask[char] || 0) | 1 << len - i - 1;
	}
	return mask;
}
function mergeIndices(indices) {
	if (indices.length <= 1) return indices;
	indices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	const merged = [indices[0]];
	for (let i = 1, len = indices.length; i < len; i += 1) {
		const last = merged[merged.length - 1];
		const curr = indices[i];
		if (curr[0] <= last[1] + 1) last[1] = Math.max(last[1], curr[1]);
		else merged.push(curr);
	}
	return merged;
}
var NON_DECOMPOSABLE_MAP = {
	"ł": "l",
	"Ł": "L",
	"đ": "d",
	"Đ": "D",
	"ø": "o",
	"Ø": "O",
	"ħ": "h",
	"Ħ": "H",
	"ŧ": "t",
	"Ŧ": "T",
	"ı": "i",
	"ß": "ss"
};
var NON_DECOMPOSABLE_RE = new RegExp("[" + Object.keys(NON_DECOMPOSABLE_MAP).join("") + "]", "g");
var stripDiacritics = typeof String.prototype.normalize === "function" ? (str) => str.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(NON_DECOMPOSABLE_RE, (ch) => NON_DECOMPOSABLE_MAP[ch]) : (str) => str;
var BitapSearch = class {
	constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, ignoreLocation = Config.ignoreLocation } = {}) {
		this.options = {
			location,
			threshold,
			distance,
			includeMatches,
			findAllMatches,
			minMatchCharLength,
			isCaseSensitive,
			ignoreDiacritics,
			ignoreLocation
		};
		pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
		this.pattern = pattern;
		this.chunks = [];
		if (!this.pattern.length) return;
		const addChunk = (pattern, startIndex) => {
			this.chunks.push({
				pattern,
				alphabet: createPatternAlphabet(pattern),
				startIndex
			});
		};
		const len = this.pattern.length;
		if (len > 32) {
			let i = 0;
			const remainder = len % 32;
			const end = len - remainder;
			while (i < end) {
				addChunk(this.pattern.substr(i, 32), i);
				i += 32;
			}
			if (remainder) {
				const startIndex = len - 32;
				addChunk(this.pattern.substr(startIndex), startIndex);
			}
		} else addChunk(this.pattern, 0);
	}
	searchIn(text) {
		const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		text = ignoreDiacritics ? stripDiacritics(text) : text;
		if (this.pattern === text) {
			if (text.length < this.options.minMatchCharLength) return {
				isMatch: false,
				score: 1
			};
			const result = {
				isMatch: true,
				score: 0
			};
			if (includeMatches) result.indices = [[0, text.length - 1]];
			return result;
		}
		const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
		const allIndices = [];
		let totalScore = 0;
		let hasMatches = false;
		this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
			const { isMatch, score, indices } = search(text, pattern, alphabet, {
				location: location + startIndex,
				distance,
				threshold,
				findAllMatches,
				minMatchCharLength,
				includeMatches,
				ignoreLocation
			});
			if (isMatch) hasMatches = true;
			totalScore += score;
			if (isMatch && indices) allIndices.push(...indices);
		});
		const result = {
			isMatch: hasMatches,
			score: hasMatches ? totalScore / this.chunks.length : 1
		};
		if (hasMatches && includeMatches) result.indices = mergeIndices(allIndices);
		return result;
	}
};
var MULTI_MATCH_TYPES = /* @__PURE__ */ new Set(["fuzzy", "include"]);
function isInverse(type) {
	return type.startsWith("inverse");
}
var matchers = [
	{
		type: "exact",
		multiRegex: /^="(.*)"$/,
		singleRegex: /^=(.*)$/,
		create: (pattern) => ({
			type: "exact",
			search(text) {
				const isMatch = text === pattern;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, pattern.length - 1]
				};
			}
		})
	},
	{
		type: "include",
		multiRegex: /^'"(.*)"$/,
		singleRegex: /^'(.*)$/,
		create: (pattern) => ({
			type: "include",
			search(text) {
				let location = 0;
				let index;
				const indices = [];
				const patternLen = pattern.length;
				while ((index = text.indexOf(pattern, location)) > -1) {
					location = index + patternLen;
					indices.push([index, location - 1]);
				}
				const isMatch = !!indices.length;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices
				};
			}
		})
	},
	{
		type: "prefix-exact",
		multiRegex: /^\^"(.*)"$/,
		singleRegex: /^\^(.*)$/,
		create: (pattern) => ({
			type: "prefix-exact",
			search(text) {
				const isMatch = text.startsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, pattern.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-prefix-exact",
		multiRegex: /^!\^"(.*)"$/,
		singleRegex: /^!\^(.*)$/,
		create: (pattern) => ({
			type: "inverse-prefix-exact",
			search(text) {
				const isMatch = !text.startsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-suffix-exact",
		multiRegex: /^!"(.*)"\$$/,
		singleRegex: /^!(.*)\$$/,
		create: (pattern) => ({
			type: "inverse-suffix-exact",
			search(text) {
				const isMatch = !text.endsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "suffix-exact",
		multiRegex: /^"(.*)"\$$/,
		singleRegex: /^(.*)\$$/,
		create: (pattern) => ({
			type: "suffix-exact",
			search(text) {
				const isMatch = text.endsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [text.length - pattern.length, text.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-exact",
		multiRegex: /^!"(.*)"$/,
		singleRegex: /^!(.*)$/,
		create: (pattern) => ({
			type: "inverse-exact",
			search(text) {
				const isMatch = text.indexOf(pattern) === -1;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "fuzzy",
		multiRegex: /^"(.*)"$/,
		singleRegex: /^(.*)$/,
		create: (pattern, options = {}) => {
			const bitap = new BitapSearch(pattern, {
				location: options.location ?? Config.location,
				threshold: options.threshold ?? Config.threshold,
				distance: options.distance ?? Config.distance,
				includeMatches: options.includeMatches ?? Config.includeMatches,
				findAllMatches: options.findAllMatches ?? Config.findAllMatches,
				minMatchCharLength: options.minMatchCharLength ?? Config.minMatchCharLength,
				isCaseSensitive: options.isCaseSensitive ?? Config.isCaseSensitive,
				ignoreDiacritics: options.ignoreDiacritics ?? Config.ignoreDiacritics,
				ignoreLocation: options.ignoreLocation ?? Config.ignoreLocation
			});
			return {
				type: "fuzzy",
				search(text) {
					return bitap.searchIn(text);
				}
			};
		}
	}
];
var matchersLen = matchers.length;
var ESCAPED_PIPE = "\0";
var OR_TOKEN = "|";
function tokenize(pattern) {
	const tokens = [];
	const len = pattern.length;
	let i = 0;
	while (i < len) {
		while (i < len && pattern[i] === " ") i++;
		if (i >= len) break;
		let j = i;
		while (j < len && pattern[j] !== " " && pattern[j] !== "\"") j++;
		if (j < len && pattern[j] === "\"") {
			j++;
			while (j < len) {
				if (pattern[j] === "\"") {
					const next = j + 1;
					if (next >= len || pattern[next] === " ") {
						j++;
						break;
					}
					if (pattern[next] === "$" && (next + 1 >= len || pattern[next + 1] === " ")) {
						j += 2;
						break;
					}
				}
				j++;
			}
			tokens.push(pattern.substring(i, j));
			i = j;
		} else {
			while (j < len && pattern[j] !== " ") j++;
			tokens.push(pattern.substring(i, j));
			i = j;
		}
	}
	return tokens;
}
function getMatch(pattern, exp) {
	const matches = pattern.match(exp);
	return matches ? matches[1] : null;
}
function parseQuery(pattern, options = {}) {
	return pattern.replace(/\\\|/g, ESCAPED_PIPE).split(OR_TOKEN).map((item) => {
		const query = tokenize(item.replace(/\u0000/g, "|").trim()).filter((item) => item && !!item.trim());
		const results = [];
		for (let i = 0, len = query.length; i < len; i += 1) {
			const queryItem = query[i];
			let found = false;
			let idx = -1;
			while (!found && ++idx < matchersLen) {
				const def = matchers[idx];
				const token = getMatch(queryItem, def.multiRegex);
				if (token) {
					results.push(def.create(token, options));
					found = true;
				}
			}
			if (found) continue;
			idx = -1;
			while (++idx < matchersLen) {
				const def = matchers[idx];
				const token = getMatch(queryItem, def.singleRegex);
				if (token) {
					results.push(def.create(token, options));
					break;
				}
			}
		}
		return results;
	});
}
var ExtendedSearch = class {
	constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
		this.query = null;
		this.options = {
			isCaseSensitive,
			ignoreDiacritics,
			includeMatches,
			minMatchCharLength,
			findAllMatches,
			ignoreLocation,
			location,
			threshold,
			distance
		};
		pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
		this.pattern = pattern;
		this.query = parseQuery(this.pattern, this.options);
	}
	static condition(_, options) {
		return options.useExtendedSearch;
	}
	searchIn(text) {
		const query = this.query;
		if (!query) return {
			isMatch: false,
			score: 1
		};
		const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		text = ignoreDiacritics ? stripDiacritics(text) : text;
		let numMatches = 0;
		const allIndices = [];
		let totalScore = 0;
		let hasInverse = false;
		for (let i = 0, qLen = query.length; i < qLen; i += 1) {
			const searchers = query[i];
			allIndices.length = 0;
			numMatches = 0;
			hasInverse = false;
			for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
				const matcher = searchers[j];
				const { isMatch, indices, score } = matcher.search(text);
				if (isMatch) {
					numMatches += 1;
					totalScore += score;
					if (isInverse(matcher.type)) hasInverse = true;
					if (includeMatches) if (MULTI_MATCH_TYPES.has(matcher.type)) allIndices.push(...indices);
					else allIndices.push(indices);
				} else {
					totalScore = 0;
					numMatches = 0;
					allIndices.length = 0;
					hasInverse = false;
					break;
				}
			}
			if (numMatches) {
				const result = {
					isMatch: true,
					score: totalScore / numMatches
				};
				if (hasInverse) result.hasInverse = true;
				if (includeMatches) result.indices = mergeIndices(allIndices);
				return result;
			}
		}
		return {
			isMatch: false,
			score: 1
		};
	}
};
var registeredSearchers = [];
function register(...args) {
	registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
	for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
		const searcherClass = registeredSearchers[i];
		if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
	}
	return new BitapSearch(pattern, options);
}
var LogicalOperator = {
	AND: "$and",
	OR: "$or"
};
var KeyType = {
	PATH: "$path",
	PATTERN: "$val"
};
var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
var isPath = (query) => !!query[KeyType.PATH];
var isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
var convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
function parse(query, options, { auto = true } = {}) {
	const next = (query) => {
		if (isString(query)) {
			const obj = {
				keyId: null,
				pattern: query
			};
			if (auto) obj.searcher = createSearcher(query, options);
			return obj;
		}
		const keys = Object.keys(query);
		const isQueryPath = isPath(query);
		if (!isQueryPath && keys.length > 1 && !isExpression(query)) return next(convertToExplicit(query));
		if (isLeaf(query)) {
			const key = isQueryPath ? query[KeyType.PATH] : keys[0];
			const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
			if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
			const obj = {
				keyId: createKeyId(key),
				pattern
			};
			if (auto) obj.searcher = createSearcher(pattern, options);
			return obj;
		}
		const node = {
			children: [],
			operator: keys[0]
		};
		keys.forEach((key) => {
			const value = query[key];
			if (isArray(value)) value.forEach((item) => {
				node.children.push(next(item));
			});
		});
		return node;
	};
	if (!isExpression(query)) query = convertToExplicit(query);
	return next(query);
}
function computeScoreSingle(matches, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	let totalScore = 1;
	matches.forEach(({ key, norm, score }) => {
		const weight = key ? key.weight : null;
		totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
	});
	return totalScore;
}
function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	results.forEach((result) => {
		result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
	});
}
var MaxHeap = class {
	constructor(limit, comparator) {
		this.limit = limit;
		this.heap = [];
		this.comparator = comparator;
	}
	get size() {
		return this.heap.length;
	}
	insert(item) {
		if (this.size < this.limit) {
			this.heap.push(item);
			this._bubbleUp(this.size - 1);
		} else if (this.comparator(item, this.heap[0]) < 0) {
			this.heap[0] = item;
			this._sinkDown(0);
		}
	}
	extractSorted() {
		return this.heap.sort(this.comparator);
	}
	_bubbleUp(i) {
		const heap = this.heap;
		while (i > 0) {
			const parent = i - 1 >> 1;
			if (this.comparator(heap[i], heap[parent]) <= 0) break;
			const tmp = heap[i];
			heap[i] = heap[parent];
			heap[parent] = tmp;
			i = parent;
		}
	}
	_sinkDown(i) {
		const heap = this.heap;
		const len = heap.length;
		let largest = i;
		do {
			i = largest;
			const left = 2 * i + 1;
			const right = 2 * i + 2;
			if (left < len && this.comparator(heap[left], heap[largest]) > 0) largest = left;
			if (right < len && this.comparator(heap[right], heap[largest]) > 0) largest = right;
			if (largest !== i) {
				const tmp = heap[i];
				heap[i] = heap[largest];
				heap[largest] = tmp;
			}
		} while (largest !== i);
	}
};
function formatMatches(result) {
	const matches = [];
	result.matches.forEach((match) => {
		if (!isDefined(match.indices) || !match.indices.length) return;
		const obj = {
			indices: match.indices,
			value: match.value
		};
		if (match.key) obj.key = match.key.id;
		if (match.idx > -1) obj.refIndex = match.idx;
		matches.push(obj);
	});
	return matches;
}
function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
	return results.map((result) => {
		const { idx } = result;
		const data = {
			item: docs[idx],
			refIndex: idx
		};
		if (includeMatches) data.matches = formatMatches(result);
		if (includeScore) data.score = result.score;
		return data;
	});
}
var DEFAULT_TOKEN = /[\p{L}\p{M}\p{N}_]+/gu;
var warned = /* @__PURE__ */ new WeakSet();
function warnNonGlobal(regex) {
	if (!warned.has(regex)) {
		warned.add(regex);
		console.warn(`[Fuse] tokenize regex ${regex} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`);
	}
}
function resolveTokenize(tokenize) {
	if (typeof tokenize === "function") {
		let validated = false;
		return (text) => {
			const result = tokenize(text);
			if (!validated) {
				validated = true;
				if (!Array.isArray(result) || result.some((t) => typeof t !== "string")) throw new Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(result) ? "array containing non-strings" : typeof result}.`);
			}
			return result;
		};
	}
	if (tokenize instanceof RegExp) {
		if (!tokenize.global) warnNonGlobal(tokenize);
		return (text) => text.match(tokenize) || [];
	}
	return (text) => text.match(DEFAULT_TOKEN) || [];
}
function createAnalyzer({ isCaseSensitive = false, ignoreDiacritics = false, tokenize } = {}) {
	const tokenizeFn = resolveTokenize(tokenize);
	return { tokenize(text) {
		if (!isCaseSensitive) text = text.toLowerCase();
		if (ignoreDiacritics) text = stripDiacritics(text);
		return tokenizeFn(text);
	} };
}
var TokenSearch = class {
	static condition(_, options) {
		return options.useTokenSearch;
	}
	constructor(pattern, options) {
		this.options = options;
		this.analyzer = createAnalyzer({
			isCaseSensitive: options.isCaseSensitive,
			ignoreDiacritics: options.ignoreDiacritics,
			tokenize: options.tokenize
		});
		const queryTerms = this.analyzer.tokenize(pattern);
		const { df, fieldCount } = options._invertedIndex;
		this.termSearchers = [];
		this.idfWeights = [];
		for (const term of queryTerms) {
			this.termSearchers.push(new BitapSearch(term, {
				location: options.location,
				threshold: options.threshold,
				distance: options.distance,
				includeMatches: options.includeMatches,
				findAllMatches: options.findAllMatches,
				minMatchCharLength: options.minMatchCharLength,
				isCaseSensitive: options.isCaseSensitive,
				ignoreDiacritics: options.ignoreDiacritics,
				ignoreLocation: true
			}));
			const docFreq = df.get(term) || 0;
			const idf = Math.log(1 + (fieldCount - docFreq + .5) / (docFreq + .5));
			this.idfWeights.push(idf);
		}
		this.combineAll = options.tokenMatch === "all";
		this.numTerms = this.termSearchers.length;
		this.useMask = this.numTerms <= 31;
	}
	searchIn(text) {
		if (!this.termSearchers.length) return {
			isMatch: false,
			score: 1
		};
		const allIndices = [];
		let weightedScore = 0;
		let maxPossibleScore = 0;
		let matchedCount = 0;
		let matchedMask = 0;
		const matchedTerms = this.combineAll && !this.useMask ? /* @__PURE__ */ new Set() : null;
		for (let i = 0; i < this.termSearchers.length; i++) {
			const result = this.termSearchers[i].searchIn(text);
			const idf = this.idfWeights[i];
			maxPossibleScore += idf;
			if (result.isMatch) {
				matchedCount++;
				weightedScore += idf * (1 - result.score);
				if (result.indices) allIndices.push(...result.indices);
				if (this.combineAll) if (this.useMask) matchedMask |= 1 << i;
				else matchedTerms.add(i);
			}
		}
		if (matchedCount === 0) return {
			isMatch: false,
			score: 1
		};
		const normalized = maxPossibleScore > 0 ? 1 - weightedScore / maxPossibleScore : 0;
		const searchResult = {
			isMatch: true,
			score: Math.max(.001, normalized)
		};
		if (this.options.includeMatches && allIndices.length) searchResult.indices = mergeIndices(allIndices);
		if (this.combineAll) {
			if (this.useMask) searchResult.matchedMask = matchedMask;
			else searchResult.matchedTerms = matchedTerms;
			searchResult.termCount = this.numTerms;
		}
		return searchResult;
	}
};
function addField(index, text, docIdx, analyzer) {
	const tokens = analyzer.tokenize(text);
	if (!tokens.length) return;
	index.fieldCount++;
	index.docFieldCount.set(docIdx, (index.docFieldCount.get(docIdx) || 0) + 1);
	const distinctTerms = new Set(tokens);
	let perDocTerms = index.docTermFieldHits.get(docIdx);
	if (!perDocTerms) {
		perDocTerms = /* @__PURE__ */ new Map();
		index.docTermFieldHits.set(docIdx, perDocTerms);
	}
	for (const term of distinctTerms) {
		perDocTerms.set(term, (perDocTerms.get(term) || 0) + 1);
		index.df.set(term, (index.df.get(term) || 0) + 1);
	}
}
function ingestRecord(index, record, keyCount, analyzer) {
	const { i: docIdx, v, $: fields } = record;
	if (v !== void 0) {
		addField(index, v, docIdx, analyzer);
		return;
	}
	if (!fields) return;
	for (let keyIdx = 0; keyIdx < keyCount; keyIdx++) {
		const value = fields[keyIdx];
		if (!value) continue;
		if (Array.isArray(value)) for (const sub of value) addField(index, sub.v, docIdx, analyzer);
		else addField(index, value.v, docIdx, analyzer);
	}
}
function buildInvertedIndex(records, keyCount, analyzer) {
	const index = {
		fieldCount: 0,
		df: /* @__PURE__ */ new Map(),
		docFieldCount: /* @__PURE__ */ new Map(),
		docTermFieldHits: /* @__PURE__ */ new Map()
	};
	for (const record of records) ingestRecord(index, record, keyCount, analyzer);
	return index;
}
function addToInvertedIndex(index, record, keyCount, analyzer) {
	ingestRecord(index, record, keyCount, analyzer);
}
function removeFromInvertedIndex(index, docIdx) {
	const fieldCount = index.docFieldCount.get(docIdx);
	if (fieldCount === void 0) return;
	index.fieldCount -= fieldCount;
	index.docFieldCount.delete(docIdx);
	const perDocTerms = index.docTermFieldHits.get(docIdx);
	if (!perDocTerms) return;
	for (const [term, hits] of perDocTerms) {
		const next = (index.df.get(term) || 0) - hits;
		if (next <= 0) index.df.delete(term);
		else index.df.set(term, next);
	}
	index.docTermFieldHits.delete(docIdx);
}
function removeAndShiftInvertedIndex(index, removedIndices) {
	if (removedIndices.length === 0) return;
	const sorted = Array.from(new Set(removedIndices)).sort((a, b) => a - b);
	for (const idx of sorted) removeFromInvertedIndex(index, idx);
	const shift = (oldIdx) => {
		let lo = 0;
		let hi = sorted.length;
		while (lo < hi) {
			const mid = lo + hi >>> 1;
			if (sorted[mid] < oldIdx) lo = mid + 1;
			else hi = mid;
		}
		return oldIdx - lo;
	};
	const firstRemoved = sorted[0];
	const shiftedDocFieldCount = /* @__PURE__ */ new Map();
	for (const [oldKey, count] of index.docFieldCount) shiftedDocFieldCount.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, count);
	index.docFieldCount = shiftedDocFieldCount;
	const shiftedDocTermFieldHits = /* @__PURE__ */ new Map();
	for (const [oldKey, terms] of index.docTermFieldHits) shiftedDocTermFieldHits.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, terms);
	index.docTermFieldHits = shiftedDocTermFieldHits;
}
var Fuse = class {
	constructor(docs, options, index) {
		this.options = {
			...Config,
			...options
		};
		if (this.options.useExtendedSearch && false);
		if (this.options.useTokenSearch && false);
		this._keyStore = new KeyStore(this.options.keys);
		this._docs = docs;
		this._myIndex = null;
		this._invertedIndex = null;
		this.setCollection(docs, index);
		this._lastQuery = null;
		this._lastSearcher = null;
	}
	_getSearcher(query) {
		if (this._lastQuery === query) return this._lastSearcher;
		const searcher = createSearcher(query, this._invertedIndex ? {
			...this.options,
			_invertedIndex: this._invertedIndex
		} : this.options);
		this._lastQuery = query;
		this._lastSearcher = searcher;
		return searcher;
	}
	setCollection(docs, index) {
		this._docs = docs;
		if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
		this._myIndex = index || createIndex(this.options.keys, this._docs, {
			getFn: this.options.getFn,
			fieldNormWeight: this.options.fieldNormWeight
		});
		if (this.options.useTokenSearch) {
			const analyzer = createAnalyzer({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics,
				tokenize: this.options.tokenize
			});
			this._invertedIndex = buildInvertedIndex(this._myIndex.records, this._myIndex.keys.length, analyzer);
		}
		this._invalidateSearcherCache();
	}
	add(doc) {
		if (!isDefined(doc)) return;
		this._docs.push(doc);
		const record = this._myIndex.add(doc, this._docs.length - 1);
		if (this._invertedIndex && record) {
			const analyzer = createAnalyzer({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics,
				tokenize: this.options.tokenize
			});
			addToInvertedIndex(this._invertedIndex, record, this._myIndex.keys.length, analyzer);
		}
		this._invalidateSearcherCache();
	}
	remove(predicate = () => false) {
		const results = [];
		const indicesToRemove = [];
		for (let i = 0, len = this._docs.length; i < len; i += 1) if (predicate(this._docs[i], i)) {
			results.push(this._docs[i]);
			indicesToRemove.push(i);
		}
		if (indicesToRemove.length) {
			if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, indicesToRemove);
			const toRemove = new Set(indicesToRemove);
			this._docs = this._docs.filter((_, i) => !toRemove.has(i));
			this._myIndex.removeAll(indicesToRemove);
			this._invalidateSearcherCache();
		}
		return results;
	}
	removeAt(idx) {
		if (!Number.isInteger(idx) || idx < 0 || idx >= this._docs.length) throw new Error(INVALID_DOC_INDEX);
		if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, [idx]);
		const doc = this._docs.splice(idx, 1)[0];
		this._myIndex.removeAt(idx);
		this._invalidateSearcherCache();
		return doc;
	}
	_invalidateSearcherCache() {
		this._lastQuery = null;
		this._lastSearcher = null;
	}
	getIndex() {
		return this._myIndex;
	}
	_normalizedKeys() {
		return this._myIndex.keys.map((key) => this._keyStore.get(key.id) || key);
	}
	search(query, options) {
		const { limit = -1 } = options || {};
		const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
		if (isString(query) && !query.trim()) {
			let docs = this._docs.map((item, idx) => ({
				item,
				refIndex: idx
			}));
			if (isNumber(limit) && limit > -1) docs = docs.slice(0, limit);
			return docs;
		}
		const useHeap = shouldSort && isNumber(limit) && limit > 0 && isString(query);
		const comparator = sortFn;
		const stable = (a, b) => comparator(a, b) || a.idx - b.idx;
		let results;
		if (useHeap) {
			const heap = new MaxHeap(limit, stable);
			if (isString(this._docs[0])) this._searchStringList(query, {
				heap,
				ignoreFieldNorm
			});
			else this._searchObjectList(query, {
				heap,
				ignoreFieldNorm
			});
			results = heap.extractSorted();
		} else {
			results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
			computeScore(results, { ignoreFieldNorm });
			if (shouldSort) results.sort(isString(query) ? stable : comparator);
			if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
		}
		return format(results, this._docs, {
			includeMatches,
			includeScore
		});
	}
	_searchStringList(query, { heap, ignoreFieldNorm } = {}) {
		const searcher = this._getSearcher(query);
		const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
		const { records } = this._myIndex;
		const results = heap ? null : [];
		records.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					value: text,
					norm,
					indices: searchResult.indices
				};
				if (requireAllTokens) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				const matches = [match];
				if (!requireAllTokens || this._coversAllTokens(matches)) {
					const result = {
						item: text,
						idx,
						matches
					};
					if (heap) {
						result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
						heap.insert(result);
					} else results.push(result);
				}
			}
		});
		return results;
	}
	_searchLogical(query) {
		const expression = parse(query, this.options);
		const keys = this._normalizedKeys();
		const evaluate = (node, item, idx) => {
			if (!("children" in node)) {
				const { keyId, searcher } = node;
				let matches;
				if (keyId === null) {
					matches = [];
					keys.forEach((key, keyIndex) => {
						matches.push(...this._findMatches({
							key,
							value: item[keyIndex],
							searcher
						}));
					});
				} else matches = this._findMatches({
					key: this._keyStore.get(keyId),
					value: this._myIndex.getValueForItemAtKeyId(item, keyId),
					searcher
				});
				if (matches && matches.length) return [{
					idx,
					item,
					matches
				}];
				return [];
			}
			const { children, operator } = node;
			const res = [];
			for (let i = 0, len = children.length; i < len; i += 1) {
				const child = children[i];
				const result = evaluate(child, item, idx);
				if (result.length) res.push(...result);
				else if (operator === LogicalOperator.AND) return [];
			}
			return res;
		};
		const records = this._myIndex.records;
		const resultMap = /* @__PURE__ */ new Map();
		const results = [];
		records.forEach(({ $: item, i: idx }) => {
			if (isDefined(item)) {
				const expResults = evaluate(expression, item, idx);
				if (expResults.length) {
					if (!resultMap.has(idx)) {
						resultMap.set(idx, {
							idx,
							item,
							matches: []
						});
						results.push(resultMap.get(idx));
					}
					expResults.forEach(({ matches }) => {
						resultMap.get(idx).matches.push(...matches);
					});
				}
			}
		});
		return results;
	}
	_searchObjectList(query, { heap, ignoreFieldNorm } = {}) {
		const searcher = this._getSearcher(query);
		const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
		const { records } = this._myIndex;
		const keys = this._normalizedKeys();
		const results = heap ? null : [];
		records.forEach(({ $: item, i: idx }) => {
			if (!isDefined(item)) return;
			const matches = [];
			let anyKeyFailed = false;
			let hasInverse = false;
			keys.forEach((key, keyIndex) => {
				const keyMatches = this._findMatches({
					key,
					value: item[keyIndex],
					searcher
				});
				if (keyMatches.length) {
					matches.push(...keyMatches);
					if (keyMatches[0].hasInverse) hasInverse = true;
				} else anyKeyFailed = true;
			});
			if (hasInverse && anyKeyFailed) return;
			if (matches.length && (!requireAllTokens || this._coversAllTokens(matches))) {
				const result = {
					idx,
					item,
					matches
				};
				if (heap) {
					result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
					heap.insert(result);
				} else results.push(result);
			}
		});
		return results;
	}
	_findMatches({ key, value, searcher }) {
		if (!isDefined(value)) return [];
		const matches = [];
		if (isArray(value)) value.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					key,
					value: text,
					idx,
					norm,
					indices: searchResult.indices,
					hasInverse: searchResult.hasInverse
				};
				if (searchResult.termCount !== void 0) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				matches.push(match);
			}
		});
		else {
			const { v: text, n: norm } = value;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					key,
					value: text,
					norm,
					indices: searchResult.indices,
					hasInverse: searchResult.hasInverse
				};
				if (searchResult.termCount !== void 0) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				matches.push(match);
			}
		}
		return matches;
	}
	_coversAllTokens(matches) {
		const termCount = matches.length ? matches[0].termCount : void 0;
		if (termCount === void 0) return true;
		if (termCount <= 31) {
			let coverage = 0;
			for (let i = 0; i < matches.length; i++) coverage |= matches[i].matchedMask || 0;
			return coverage === 2 ** termCount - 1;
		}
		const coverage = /* @__PURE__ */ new Set();
		for (let i = 0; i < matches.length; i++) {
			const terms = matches[i].matchedTerms;
			if (terms) for (const t of terms) coverage.add(t);
		}
		return coverage.size === termCount;
	}
};
Fuse.version = "7.5.0";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
Fuse.match = function(pattern, text, options) {
	if (options && options.useTokenSearch) throw new Error(FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED);
	return createSearcher(pattern, {
		...Config,
		...options
	}).searchIn(text);
};
Fuse.parseQuery = parse;
register(ExtendedSearch);
register(TokenSearch);
Fuse.use = function(...plugins) {
	plugins.forEach((plugin) => register(plugin));
};
var entry_default = Fuse;
//#endregion
//#region node_modules/.pnpm/@vueuse+integrations@14.3.0_1986c8467b621b7dcdd054136433bac2/node_modules/@vueuse/integrations/dist/useFuse.js
function useFuse(search, data, options) {
	const createFuse = () => {
		var _toValue, _toValue2;
		return new entry_default((_toValue = toValue(data)) !== null && _toValue !== void 0 ? _toValue : [], (_toValue2 = toValue(options)) === null || _toValue2 === void 0 ? void 0 : _toValue2.fuseOptions);
	};
	const fuse = shallowRef(createFuse());
	watch(() => {
		var _toValue3;
		return (_toValue3 = toValue(options)) === null || _toValue3 === void 0 ? void 0 : _toValue3.fuseOptions;
	}, () => {
		fuse.value = createFuse();
	}, { deep: true });
	watch(() => toValue(data), (newData) => {
		fuse.value.setCollection(newData);
	}, { deep: true });
	return {
		fuse,
		results: computed(() => {
			const resolved = toValue(options);
			if ((resolved === null || resolved === void 0 ? void 0 : resolved.matchAllWhenSearchEmpty) && !toValue(search)) return toValue(data).map((item, index) => ({
				item,
				refIndex: index
			}));
			const limit = resolved === null || resolved === void 0 ? void 0 : resolved.resultLimit;
			return fuse.value.search(toValue(search), limit ? { limit } : void 0);
		})
	};
}
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/utils/search.js
var htmlEscapes = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function escapeHTML(str) {
	return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
function isAlreadyEscaped(str) {
	return /&(?:amp|lt|gt|quot|#39);/.test(str);
}
function sanitize(str) {
	if (isAlreadyEscaped(str)) return str;
	return escapeHTML(str);
}
function truncateHTMLFromStart(html, maxLength) {
	let truncated = "";
	let totalLength = 0;
	let insideTag = false;
	for (let i = html.length - 1; i >= 0; i--) {
		if (html[i] === ">") insideTag = true;
		else if (html[i] === "<") {
			insideTag = false;
			truncated = html[i] + truncated;
			continue;
		}
		if (!insideTag) totalLength++;
		if (totalLength <= maxLength) truncated = html[i] + truncated;
		else {
			truncated = "..." + truncated;
			break;
		}
	}
	return truncated;
}
function highlight(item, searchTerm, forceKey, omitKeys, useTokenSearch) {
	const tokens = useTokenSearch ? searchTerm.match(/[\p{L}\p{M}\p{N}_]+/gu) || [] : [];
	const minTokenLength = tokens.length > 0 ? Math.min(...tokens.map((t) => t.length)) : searchTerm.length;
	function generateHighlightedText(value, indices = []) {
		value = value || "";
		let content = "";
		let nextUnhighlightedRegionStartingIndex = 0;
		indices.forEach((region) => {
			if (region.length === 2 && region[0] === region[1]) return;
			const lastIndiceNextIndex = region[1] + 1;
			const isMatched = lastIndiceNextIndex - region[0] >= minTokenLength;
			content += [
				sanitize(value.substring(nextUnhighlightedRegionStartingIndex, region[0])),
				isMatched && `<mark>`,
				sanitize(value.substring(region[0], lastIndiceNextIndex)),
				isMatched && "</mark>"
			].filter(Boolean).join("");
			nextUnhighlightedRegionStartingIndex = lastIndiceNextIndex;
		});
		content += sanitize(value.substring(nextUnhighlightedRegionStartingIndex));
		const markIndex = content.indexOf("<mark>");
		if (markIndex !== -1) content = truncateHTMLFromStart(content, content.length - markIndex);
		return content;
	}
	if (!item.matches?.length) return;
	for (const match of item.matches) {
		if (forceKey && match.key !== forceKey) continue;
		if (omitKeys?.includes(match.key)) continue;
		return generateHighlightedText(match.value, match.indices);
	}
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcommand-palette.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcommand_palette_default = {
	"slots": {
		"root": "flex flex-col min-h-0 min-w-0 divide-y divide-default",
		"input": "",
		"close": "",
		"back": "p-0",
		"content": "relative overflow-hidden flex flex-col",
		"footer": "p-1",
		"viewport": "relative scroll-py-1 overflow-y-auto flex-1 focus:outline-none",
		"group": "p-1 isolate",
		"empty": "text-center text-muted",
		"label": "font-semibold text-highlighted",
		"item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
		"itemLeadingIcon": "shrink-0",
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemLeadingChip": "shrink-0",
		"itemLeadingChipSize": "",
		"itemTrailing": "ms-auto inline-flex items-center",
		"itemTrailingIcon": "shrink-0",
		"itemTrailingHighlightedIcon": "shrink-0 text-dimmed hidden group-data-highlighted:inline-flex",
		"itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
		"itemTrailingKbdsSize": "",
		"itemWrapper": "flex-1 flex flex-col text-start min-w-0",
		"itemLabel": "truncate space-x-1 text-dimmed",
		"itemLabelBase": "text-highlighted [&>mark]:text-primary [&>mark]:bg-primary/15",
		"itemLabelPrefix": "text-default",
		"itemLabelSuffix": "text-dimmed [&>mark]:text-primary [&>mark]:bg-primary/15",
		"itemDescription": "truncate text-muted [&>mark]:text-primary [&>mark]:bg-primary/15"
	},
	"variants": {
		"virtualize": {
			"true": { "viewport": "p-1 isolate" },
			"false": { "viewport": "divide-y divide-default" }
		},
		"size": {
			"xs": {
				"input": "[&>input]:h-10",
				"empty": "py-3 text-xs",
				"label": "p-1 text-[10px]/3 gap-1",
				"item": "p-1 text-xs gap-1",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailing": "gap-1",
				"itemTrailingIcon": "size-4",
				"itemTrailingHighlightedIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"sm": {
				"input": "[&>input]:h-11",
				"empty": "py-4 text-xs",
				"label": "p-1.5 text-[10px]/3 gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailing": "gap-1.5",
				"itemTrailingIcon": "size-4",
				"itemTrailingHighlightedIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"md": {
				"input": "[&>input]:h-12",
				"empty": "py-6 text-sm",
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailing": "gap-1.5",
				"itemTrailingIcon": "size-5",
				"itemTrailingHighlightedIcon": "size-5",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "md"
			},
			"lg": {
				"input": "[&>input]:h-13",
				"empty": "py-7 text-sm",
				"label": "p-2 text-xs gap-2",
				"item": "p-2 text-sm gap-2",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailing": "gap-2",
				"itemTrailingIcon": "size-5",
				"itemTrailingHighlightedIcon": "size-5",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "md"
			},
			"xl": {
				"input": "[&>input]:h-14",
				"empty": "py-8 text-base",
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-base gap-2",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemLeadingChip": "size-6",
				"itemLeadingChipSize": "lg",
				"itemTrailing": "gap-2",
				"itemTrailingIcon": "size-6",
				"itemTrailingHighlightedIcon": "size-6",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "lg"
			}
		},
		"active": {
			"true": {
				"item": "text-highlighted before:bg-elevated",
				"itemLeadingIcon": "text-default"
			},
			"false": {
				"item": ["text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50", "transition-colors before:transition-colors"],
				"itemLeadingIcon": ["text-dimmed group-data-highlighted:not-group-data-disabled:text-default", "transition-colors"]
			}
		},
		"loading": { "true": { "itemLeadingIcon": "animate-spin" } }
	},
	"defaultVariants": { "size": "md" }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/CommandPalette.vue
var _sfc_main$1 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UCommandPalette",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		as: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		icon: {
			type: [String, Boolean],
			required: false,
			skipCheck: true
		},
		trailingIcon: {
			type: null,
			required: false
		},
		selectedIcon: {
			type: null,
			required: false
		},
		childrenIcon: {
			type: null,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false,
			default: true
		},
		close: {
			type: [Boolean, Object],
			required: false
		},
		closeIcon: {
			type: null,
			required: false
		},
		back: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		backIcon: {
			type: null,
			required: false
		},
		input: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		groups: {
			type: Array,
			required: false
		},
		fuse: {
			type: Object,
			required: false
		},
		virtualize: {
			type: [Boolean, Object],
			required: false,
			default: false
		},
		valueKey: {
			type: null,
			required: false
		},
		labelKey: {
			type: null,
			required: false,
			default: "label"
		},
		descriptionKey: {
			type: null,
			required: false,
			default: "description"
		},
		preserveGroupOrder: {
			type: Boolean,
			required: false,
			default: false
		},
		searchDelay: {
			type: Number,
			required: false,
			default: 0
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		highlightOnHover: {
			type: Boolean,
			required: false,
			default: true
		},
		selectionBehavior: {
			type: String,
			required: false
		},
		by: {
			type: [String, Function],
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	}, {
		"searchTerm": {
			type: String,
			default: ""
		},
		"searchTermModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"update:modelValue",
		"highlight",
		"entryFocus",
		"leave",
		"update:open"
	], ["update:searchTerm"]),
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("commandPalette", _props);
		const searchTerm = useModel(__props, "searchTerm", {
			type: String,
			default: ""
		});
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "disabled", "multiple", "modelValue", "defaultValue", "highlightOnHover", "by"), emits);
		const virtualizerProps = toRef(() => {
			if (!props.virtualize) return false;
			return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, { estimateSize: getEstimateSize(filteredItems.value, "md", props.descriptionKey, !!slots["item-description"]) });
		});
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({ props: {
			item: {
				type: Object,
				required: true
			},
			group: {
				type: Object,
				required: false
			},
			index: {
				type: Number,
				required: false
			}
		} });
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcommand_palette_default,
			...appConfig.ui?.commandPalette || {}
		})({
			size: props.size,
			virtualize: !!props.virtualize
		}));
		const fuse = computed(() => defu({}, props.fuse, {
			fuseOptions: {
				ignoreLocation: true,
				threshold: .1,
				keys: [
					props.labelKey,
					props.descriptionKey,
					"suffix"
				]
			},
			resultLimit: 12,
			matchAllWhenSearchEmpty: true
		}));
		const history = ref([]);
		const placeholder = computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t("commandPalette.placeholder"));
		const groups = computed(() => history.value?.length ? [history.value[history.value.length - 1]] : props.groups);
		const items = computed(() => groups.value?.filter((group) => {
			if (!group.id) {
				console.warn(`[@nuxt/ui] CommandPalette group is missing an \`id\` property`);
				return false;
			}
			if (group.ignoreFilter) return false;
			return true;
		})?.flatMap((group) => group.items?.map((item) => ({
			...item,
			group: group.id
		})) || []) || []);
		const fuseSearchTerm = refDebounced(searchTerm, () => props.searchDelay);
		const { results: fuseResults } = useFuse(fuseSearchTerm, items, fuse);
		const throttledFuseResults = refThrottled(fuseResults, 16, true);
		function processGroupItems(group, items2) {
			let processedItems = items2;
			if (group?.postFilter && typeof group.postFilter === "function") processedItems = group.postFilter(fuseSearchTerm.value, processedItems);
			return {
				...group,
				items: processedItems.slice(0, fuse.value.resultLimit).map((item) => {
					return {
						...item,
						labelHtml: item.labelHtml ?? highlight(item, fuseSearchTerm.value, props.labelKey, void 0, fuse.value.fuseOptions?.useTokenSearch),
						suffixHtml: item.suffixHtml ?? highlight(item, fuseSearchTerm.value, "suffix", [props.labelKey], fuse.value.fuseOptions?.useTokenSearch),
						descriptionHtml: item.descriptionHtml ?? highlight(item, fuseSearchTerm.value, props.descriptionKey, [props.labelKey, "suffix"], fuse.value.fuseOptions?.useTokenSearch)
					};
				})
			};
		}
		const filteredGroups = computed(() => {
			const currentGroups = groups.value;
			const groupsById = throttledFuseResults.value.reduce((acc, result2) => {
				const { item, matches } = result2;
				if (!item.group) return acc;
				acc[item.group] ||= [];
				acc[item.group]?.push({
					...item,
					matches
				});
				return acc;
			}, {});
			if (props.preserveGroupOrder) {
				const processedGroups = [];
				for (const group of currentGroups || []) {
					if (!group.items?.length) continue;
					const items2 = group.ignoreFilter ? group.items : groupsById[group.id];
					if (!items2?.length) continue;
					const processedGroup = processGroupItems(group, items2);
					if (processedGroup.items?.length) processedGroups.push(processedGroup);
				}
				return processedGroups;
			}
			const result = [...Object.entries(groupsById).map(([id, items2]) => {
				const group = currentGroups?.find((group2) => group2.id === id);
				if (!group) return;
				const processedGroup = processGroupItems(group, items2);
				return processedGroup.items?.length ? processedGroup : void 0;
			}).filter((group) => !!group)];
			for (const group of currentGroups || []) {
				if (!group.ignoreFilter || !group.items?.length) continue;
				const processedGroup = processGroupItems(group, group.items);
				if (!processedGroup.items?.length) continue;
				const originalIndex = currentGroups.indexOf(group);
				const precedingIds = /* @__PURE__ */ new Set();
				for (let i = 0; i < originalIndex; i++) precedingIds.add(currentGroups[i].id);
				let insertAfter = -1;
				for (let i = 0; i < result.length; i++) if (precedingIds.has(result[i].id)) insertAfter = i;
				result.splice(insertAfter + 1, 0, processedGroup);
			}
			return result;
		});
		const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group.items || []));
		const rootRef = useTemplateRef("rootRef");
		watch(filteredGroups, () => {
			nextTick(() => {
				const root = rootRef.value;
				if ((root?.$el)?.contains((void 0).activeElement)) root?.highlightFirstItem();
				else root?.highlightSelected(void 0, false);
			});
		});
		function navigate(item) {
			if (!item.children?.length) return;
			history.value.push({
				id: `history-${history.value.length}`,
				label: item.label,
				slot: item.slot,
				placeholder: item.placeholder,
				items: item.children
			});
			searchTerm.value = "";
			rootRef.value?.highlightFirstItem();
		}
		function navigateBack() {
			if (!history.value.length) return;
			history.value.pop();
			searchTerm.value = "";
			rootRef.value?.highlightFirstItem();
		}
		function onBackspace() {
			if (!searchTerm.value) navigateBack();
		}
		function onSelect(e, item) {
			if (item.children?.length) {
				e.preventDefault();
				navigate(item);
			} else item.onSelect?.(e);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineItemTemplate), null, {
				default: withCtx(({ item, index, group }, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_sfc_main$f, mergeProps(unref(pickLinkProps)(item), { custom: "" }), {
						default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(unref(ListboxItem_default), {
								value: unref(props).valueKey ? unref(get$1)(item, unref(props).valueKey) : unref(omit)(item, [
									"matches",
									"group",
									"onSelect",
									"labelHtml",
									"suffixHtml",
									"descriptionHtml",
									"children"
								]),
								disabled: item.disabled,
								"as-child": "",
								onSelect: ($event) => onSelect($event, item)
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_sfc_main$1$3, mergeProps(slotProps, {
										"data-slot": "item",
										class: ui.value.item({
											class: [
												unref(props).ui?.item,
												item.ui?.item,
												item.class
											],
											active: active || item.active
										})
									}), {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) ssrRenderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
												item,
												index,
												ui: ui.value
											}, () => {
												ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
													item,
													index,
													ui: ui.value
												}, () => {
													if (item.loading) _push(ssrRenderComponent(_sfc_main$2$2, {
														name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
														"data-slot": "itemLeadingIcon",
														class: ui.value.itemLeadingIcon({
															class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
															loading: true
														})
													}, null, _parent, _scopeId));
													else if (item.icon) _push(ssrRenderComponent(_sfc_main$2$2, {
														name: item.icon,
														"data-slot": "itemLeadingIcon",
														class: ui.value.itemLeadingIcon({
															class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
															active: active || item.active
														})
													}, null, _parent, _scopeId));
													else if (item.avatar) _push(ssrRenderComponent(_sfc_main$1$2, mergeProps({ size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, item.avatar, {
														"data-slot": "itemLeadingAvatar",
														class: ui.value.itemLeadingAvatar({
															class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
															active: active || item.active
														})
													}), null, _parent, _scopeId));
													else if (item.chip) _push(ssrRenderComponent(_sfc_main$2$1, mergeProps({
														size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
														inset: "",
														standalone: ""
													}, item.chip, {
														"data-slot": "itemLeadingChip",
														class: ui.value.itemLeadingChip({
															class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip],
															active: active || item.active
														})
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												}, _push, _parent, _scopeId);
												if (item.prefix || item.labelHtml || unref(get$1)(item, unref(props).labelKey) || item.suffixHtml || item.suffix || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) {
													_push(`<span data-slot="itemWrapper" class="${ssrRenderClass(ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${ssrRenderClass(ui.value.itemLabel({
														class: [unref(props).ui?.itemLabel, item.ui?.itemLabel],
														active: active || item.active
													}))}"${_scopeId}>`);
													ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
														item,
														index,
														ui: ui.value
													}, () => {
														if (item.prefix) _push(`<span data-slot="itemLabelPrefix" class="${ssrRenderClass(ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] }))}"${_scopeId}>${ssrInterpolate(item.prefix)}</span>`);
														else _push(`<!---->`);
														if (item.labelHtml) _push(`<span data-slot="itemLabelBase" class="${ssrRenderClass(ui.value.itemLabelBase({
															class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
															active: active || item.active
														}))}"${_scopeId}>${item.labelHtml ?? ""}</span>`);
														else _push(`<span data-slot="itemLabelBase" class="${ssrRenderClass(ui.value.itemLabelBase({
															class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
															active: active || item.active
														}))}"${_scopeId}>${ssrInterpolate(unref(get$1)(item, unref(props).labelKey))}</span>`);
														if (item.suffixHtml) _push(`<span data-slot="itemLabelSuffix" class="${ssrRenderClass(ui.value.itemLabelSuffix({
															class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
															active: active || item.active
														}))}"${_scopeId}>${item.suffixHtml ?? ""}</span>`);
														else if (item.suffix) _push(`<span data-slot="itemLabelSuffix" class="${ssrRenderClass(ui.value.itemLabelSuffix({
															class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
															active: active || item.active
														}))}"${_scopeId}>${ssrInterpolate(item.suffix)}</span>`);
														else _push(`<!---->`);
													}, _push, _parent, _scopeId);
													_push(`</span>`);
													if (item.descriptionHtml) _push(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>${item.descriptionHtml ?? ""}</span>`);
													else if (unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) {
														_push(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
															item,
															index,
															ui: ui.value
														}, () => {
															_push(`${ssrInterpolate(unref(get$1)(item, unref(props).descriptionKey))}`);
														}, _push, _parent, _scopeId);
														_push(`</span>`);
													} else _push(`<!---->`);
													_push(`</span>`);
												} else _push(`<!---->`);
												_push(`<span data-slot="itemTrailing" class="${ssrRenderClass(ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
												ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
													item,
													index,
													ui: ui.value
												}, () => {
													if (item.children && item.children.length > 0) _push(ssrRenderComponent(_sfc_main$2$2, {
														name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
														"data-slot": "itemTrailingIcon",
														class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
													}, null, _parent, _scopeId));
													else if (item.kbds?.length) {
														_push(`<span data-slot="itemTrailingKbds" class="${ssrRenderClass(ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
														ssrRenderList(item.kbds, (kbd, kbdIndex) => {
															_push(ssrRenderComponent(_sfc_main$c, mergeProps({
																key: kbdIndex,
																size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
															}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
														});
														_push(`<!--]--></span>`);
													} else if (group?.highlightedIcon) _push(ssrRenderComponent(_sfc_main$2$2, {
														name: group.highlightedIcon,
														"data-slot": "itemTrailingHighlightedIcon",
														class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
													}, null, _parent, _scopeId));
													else _push(`<!---->`);
												}, _push, _parent, _scopeId);
												if (!item.children?.length) _push(ssrRenderComponent(unref(ListboxItemIndicator_default), { "as-child": "" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_sfc_main$2$2, {
															name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
															"data-slot": "itemTrailingIcon",
															class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
														}, null, _parent, _scopeId));
														else return [createVNode(_sfc_main$2$2, {
															name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
															"data-slot": "itemTrailingIcon",
															class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
														}, null, 8, ["name", "class"])];
													}),
													_: 2
												}, _parent, _scopeId));
												else _push(`<!---->`);
												_push(`</span>`);
											}, _push, _parent, _scopeId);
											else return [renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
												item,
												index,
												ui: ui.value
											}, () => [
												renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
													item,
													index,
													ui: ui.value
												}, () => [item.loading ? (openBlock(), createBlock(_sfc_main$2$2, {
													key: 0,
													name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
													"data-slot": "itemLeadingIcon",
													class: ui.value.itemLeadingIcon({
														class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
														loading: true
													})
												}, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
													key: 1,
													name: item.icon,
													"data-slot": "itemLeadingIcon",
													class: ui.value.itemLeadingIcon({
														class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
														active: active || item.active
													})
												}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
													key: 2,
													size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
												}, item.avatar, {
													"data-slot": "itemLeadingAvatar",
													class: ui.value.itemLeadingAvatar({
														class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
														active: active || item.active
													})
												}), null, 16, ["size", "class"])) : item.chip ? (openBlock(), createBlock(_sfc_main$2$1, mergeProps({
													key: 3,
													size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
													inset: "",
													standalone: ""
												}, item.chip, {
													"data-slot": "itemLeadingChip",
													class: ui.value.itemLeadingChip({
														class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip],
														active: active || item.active
													})
												}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
												item.prefix || item.labelHtml || unref(get$1)(item, unref(props).labelKey) || item.suffixHtml || item.suffix || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
													key: 0,
													"data-slot": "itemWrapper",
													class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
												}, [createVNode("span", {
													"data-slot": "itemLabel",
													class: ui.value.itemLabel({
														class: [unref(props).ui?.itemLabel, item.ui?.itemLabel],
														active: active || item.active
													})
												}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
													item,
													index,
													ui: ui.value
												}, () => [
													item.prefix ? (openBlock(), createBlock("span", {
														key: 0,
														"data-slot": "itemLabelPrefix",
														class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
													}, toDisplayString(item.prefix), 3)) : createCommentVNode("", true),
													item.labelHtml ? (openBlock(), createBlock("span", {
														key: 1,
														"data-slot": "itemLabelBase",
														class: ui.value.itemLabelBase({
															class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
															active: active || item.active
														}),
														innerHTML: item.labelHtml
													}, null, 10, ["innerHTML"])) : (openBlock(), createBlock("span", {
														key: 2,
														"data-slot": "itemLabelBase",
														class: ui.value.itemLabelBase({
															class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
															active: active || item.active
														})
													}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3)),
													item.suffixHtml ? (openBlock(), createBlock("span", {
														key: 3,
														"data-slot": "itemLabelSuffix",
														class: ui.value.itemLabelSuffix({
															class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
															active: active || item.active
														}),
														innerHTML: item.suffixHtml
													}, null, 10, ["innerHTML"])) : item.suffix ? (openBlock(), createBlock("span", {
														key: 4,
														"data-slot": "itemLabelSuffix",
														class: ui.value.itemLabelSuffix({
															class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
															active: active || item.active
														})
													}, toDisplayString(item.suffix), 3)) : createCommentVNode("", true)
												])], 2), item.descriptionHtml ? (openBlock(), createBlock("span", {
													key: 0,
													"data-slot": "itemDescription",
													class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
													innerHTML: item.descriptionHtml
												}, null, 10, ["innerHTML"])) : unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
													key: 1,
													"data-slot": "itemDescription",
													class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
												}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
													item,
													index,
													ui: ui.value
												}, () => [createTextVNode(toDisplayString(unref(get$1)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
												createVNode("span", {
													"data-slot": "itemTrailing",
													class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
												}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
													item,
													index,
													ui: ui.value
												}, () => [item.children && item.children.length > 0 ? (openBlock(), createBlock(_sfc_main$2$2, {
													key: 0,
													name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
													"data-slot": "itemTrailingIcon",
													class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
												}, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
													key: 1,
													"data-slot": "itemTrailingKbds",
													class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
												}, [(openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
													return openBlock(), createBlock(_sfc_main$c, mergeProps({
														key: kbdIndex,
														size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
													}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
												}), 128))], 2)) : group?.highlightedIcon ? (openBlock(), createBlock(_sfc_main$2$2, {
													key: 2,
													name: group.highlightedIcon,
													"data-slot": "itemTrailingHighlightedIcon",
													class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
												}, null, 8, ["name", "class"])) : createCommentVNode("", true)]), !item.children?.length ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
													key: 0,
													"as-child": ""
												}, {
													default: withCtx(() => [createVNode(_sfc_main$2$2, {
														name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
														"data-slot": "itemTrailingIcon",
														class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
													}, null, 8, ["name", "class"])]),
													_: 2
												}, 1024)) : createCommentVNode("", true)], 2)
											])];
										}),
										_: 2
									}, _parent, _scopeId));
									else return [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
										"data-slot": "item",
										class: ui.value.item({
											class: [
												unref(props).ui?.item,
												item.ui?.item,
												item.class
											],
											active: active || item.active
										})
									}), {
										default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
											item,
											index,
											ui: ui.value
										}, () => [
											renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
												item,
												index,
												ui: ui.value
											}, () => [item.loading ? (openBlock(), createBlock(_sfc_main$2$2, {
												key: 0,
												name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
												"data-slot": "itemLeadingIcon",
												class: ui.value.itemLeadingIcon({
													class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
													loading: true
												})
											}, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
												key: 1,
												name: item.icon,
												"data-slot": "itemLeadingIcon",
												class: ui.value.itemLeadingIcon({
													class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
													active: active || item.active
												})
											}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
												key: 2,
												size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
											}, item.avatar, {
												"data-slot": "itemLeadingAvatar",
												class: ui.value.itemLeadingAvatar({
													class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
													active: active || item.active
												})
											}), null, 16, ["size", "class"])) : item.chip ? (openBlock(), createBlock(_sfc_main$2$1, mergeProps({
												key: 3,
												size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
												inset: "",
												standalone: ""
											}, item.chip, {
												"data-slot": "itemLeadingChip",
												class: ui.value.itemLeadingChip({
													class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip],
													active: active || item.active
												})
											}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
											item.prefix || item.labelHtml || unref(get$1)(item, unref(props).labelKey) || item.suffixHtml || item.suffix || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
												key: 0,
												"data-slot": "itemWrapper",
												class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
											}, [createVNode("span", {
												"data-slot": "itemLabel",
												class: ui.value.itemLabel({
													class: [unref(props).ui?.itemLabel, item.ui?.itemLabel],
													active: active || item.active
												})
											}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
												item,
												index,
												ui: ui.value
											}, () => [
												item.prefix ? (openBlock(), createBlock("span", {
													key: 0,
													"data-slot": "itemLabelPrefix",
													class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
												}, toDisplayString(item.prefix), 3)) : createCommentVNode("", true),
												item.labelHtml ? (openBlock(), createBlock("span", {
													key: 1,
													"data-slot": "itemLabelBase",
													class: ui.value.itemLabelBase({
														class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
														active: active || item.active
													}),
													innerHTML: item.labelHtml
												}, null, 10, ["innerHTML"])) : (openBlock(), createBlock("span", {
													key: 2,
													"data-slot": "itemLabelBase",
													class: ui.value.itemLabelBase({
														class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
														active: active || item.active
													})
												}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3)),
												item.suffixHtml ? (openBlock(), createBlock("span", {
													key: 3,
													"data-slot": "itemLabelSuffix",
													class: ui.value.itemLabelSuffix({
														class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
														active: active || item.active
													}),
													innerHTML: item.suffixHtml
												}, null, 10, ["innerHTML"])) : item.suffix ? (openBlock(), createBlock("span", {
													key: 4,
													"data-slot": "itemLabelSuffix",
													class: ui.value.itemLabelSuffix({
														class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
														active: active || item.active
													})
												}, toDisplayString(item.suffix), 3)) : createCommentVNode("", true)
											])], 2), item.descriptionHtml ? (openBlock(), createBlock("span", {
												key: 0,
												"data-slot": "itemDescription",
												class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
												innerHTML: item.descriptionHtml
											}, null, 10, ["innerHTML"])) : unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "itemDescription",
												class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
											}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
												item,
												index,
												ui: ui.value
											}, () => [createTextVNode(toDisplayString(unref(get$1)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
											createVNode("span", {
												"data-slot": "itemTrailing",
												class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
											}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
												item,
												index,
												ui: ui.value
											}, () => [item.children && item.children.length > 0 ? (openBlock(), createBlock(_sfc_main$2$2, {
												key: 0,
												name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
												"data-slot": "itemTrailingIcon",
												class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
											}, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "itemTrailingKbds",
												class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
											}, [(openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
												return openBlock(), createBlock(_sfc_main$c, mergeProps({
													key: kbdIndex,
													size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
												}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
											}), 128))], 2)) : group?.highlightedIcon ? (openBlock(), createBlock(_sfc_main$2$2, {
												key: 2,
												name: group.highlightedIcon,
												"data-slot": "itemTrailingHighlightedIcon",
												class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
											}, null, 8, ["name", "class"])) : createCommentVNode("", true)]), !item.children?.length ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
												key: 0,
												"as-child": ""
											}, {
												default: withCtx(() => [createVNode(_sfc_main$2$2, {
													name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
													"data-slot": "itemTrailingIcon",
													class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
												}, null, 8, ["name", "class"])]),
												_: 2
											}, 1024)) : createCommentVNode("", true)], 2)
										])]),
										_: 2
									}, 1040, ["class"])];
								}),
								_: 2
							}, _parent, _scopeId));
							else return [createVNode(unref(ListboxItem_default), {
								value: unref(props).valueKey ? unref(get$1)(item, unref(props).valueKey) : unref(omit)(item, [
									"matches",
									"group",
									"onSelect",
									"labelHtml",
									"suffixHtml",
									"descriptionHtml",
									"children"
								]),
								disabled: item.disabled,
								"as-child": "",
								onSelect: ($event) => onSelect($event, item)
							}, {
								default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
									"data-slot": "item",
									class: ui.value.item({
										class: [
											unref(props).ui?.item,
											item.ui?.item,
											item.class
										],
										active: active || item.active
									})
								}), {
									default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
										item,
										index,
										ui: ui.value
									}, () => [
										renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
											item,
											index,
											ui: ui.value
										}, () => [item.loading ? (openBlock(), createBlock(_sfc_main$2$2, {
											key: 0,
											name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
											"data-slot": "itemLeadingIcon",
											class: ui.value.itemLeadingIcon({
												class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
												loading: true
											})
										}, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
											key: 1,
											name: item.icon,
											"data-slot": "itemLeadingIcon",
											class: ui.value.itemLeadingIcon({
												class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
												active: active || item.active
											})
										}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
											key: 2,
											size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
										}, item.avatar, {
											"data-slot": "itemLeadingAvatar",
											class: ui.value.itemLeadingAvatar({
												class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
												active: active || item.active
											})
										}), null, 16, ["size", "class"])) : item.chip ? (openBlock(), createBlock(_sfc_main$2$1, mergeProps({
											key: 3,
											size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
											inset: "",
											standalone: ""
										}, item.chip, {
											"data-slot": "itemLeadingChip",
											class: ui.value.itemLeadingChip({
												class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip],
												active: active || item.active
											})
										}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
										item.prefix || item.labelHtml || unref(get$1)(item, unref(props).labelKey) || item.suffixHtml || item.suffix || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "itemWrapper",
											class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
										}, [createVNode("span", {
											"data-slot": "itemLabel",
											class: ui.value.itemLabel({
												class: [unref(props).ui?.itemLabel, item.ui?.itemLabel],
												active: active || item.active
											})
										}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
											item,
											index,
											ui: ui.value
										}, () => [
											item.prefix ? (openBlock(), createBlock("span", {
												key: 0,
												"data-slot": "itemLabelPrefix",
												class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
											}, toDisplayString(item.prefix), 3)) : createCommentVNode("", true),
											item.labelHtml ? (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "itemLabelBase",
												class: ui.value.itemLabelBase({
													class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
													active: active || item.active
												}),
												innerHTML: item.labelHtml
											}, null, 10, ["innerHTML"])) : (openBlock(), createBlock("span", {
												key: 2,
												"data-slot": "itemLabelBase",
												class: ui.value.itemLabelBase({
													class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
													active: active || item.active
												})
											}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3)),
											item.suffixHtml ? (openBlock(), createBlock("span", {
												key: 3,
												"data-slot": "itemLabelSuffix",
												class: ui.value.itemLabelSuffix({
													class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
													active: active || item.active
												}),
												innerHTML: item.suffixHtml
											}, null, 10, ["innerHTML"])) : item.suffix ? (openBlock(), createBlock("span", {
												key: 4,
												"data-slot": "itemLabelSuffix",
												class: ui.value.itemLabelSuffix({
													class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
													active: active || item.active
												})
											}, toDisplayString(item.suffix), 3)) : createCommentVNode("", true)
										])], 2), item.descriptionHtml ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "itemDescription",
											class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
											innerHTML: item.descriptionHtml
										}, null, 10, ["innerHTML"])) : unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "itemDescription",
											class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
										}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
											item,
											index,
											ui: ui.value
										}, () => [createTextVNode(toDisplayString(unref(get$1)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
										createVNode("span", {
											"data-slot": "itemTrailing",
											class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
										}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
											item,
											index,
											ui: ui.value
										}, () => [item.children && item.children.length > 0 ? (openBlock(), createBlock(_sfc_main$2$2, {
											key: 0,
											name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
											"data-slot": "itemTrailingIcon",
											class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
										}, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "itemTrailingKbds",
											class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
										}, [(openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
											return openBlock(), createBlock(_sfc_main$c, mergeProps({
												key: kbdIndex,
												size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
											}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
										}), 128))], 2)) : group?.highlightedIcon ? (openBlock(), createBlock(_sfc_main$2$2, {
											key: 2,
											name: group.highlightedIcon,
											"data-slot": "itemTrailingHighlightedIcon",
											class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
										}, null, 8, ["name", "class"])) : createCommentVNode("", true)]), !item.children?.length ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
											key: 0,
											"as-child": ""
										}, {
											default: withCtx(() => [createVNode(_sfc_main$2$2, {
												name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
												"data-slot": "itemTrailingIcon",
												class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
											}, null, 8, ["name", "class"])]),
											_: 2
										}, 1024)) : createCommentVNode("", true)], 2)
									])]),
									_: 2
								}, 1040, ["class"])]),
								_: 2
							}, 1032, [
								"value",
								"disabled",
								"onSelect"
							])];
						}),
						_: 2
					}, _parent, _scopeId));
					else return [createVNode(_sfc_main$f, mergeProps(unref(pickLinkProps)(item), { custom: "" }), {
						default: withCtx(({ active, ...slotProps }) => [createVNode(unref(ListboxItem_default), {
							value: unref(props).valueKey ? unref(get$1)(item, unref(props).valueKey) : unref(omit)(item, [
								"matches",
								"group",
								"onSelect",
								"labelHtml",
								"suffixHtml",
								"descriptionHtml",
								"children"
							]),
							disabled: item.disabled,
							"as-child": "",
							onSelect: ($event) => onSelect($event, item)
						}, {
							default: withCtx(() => [createVNode(_sfc_main$1$3, mergeProps(slotProps, {
								"data-slot": "item",
								class: ui.value.item({
									class: [
										unref(props).ui?.item,
										item.ui?.item,
										item.class
									],
									active: active || item.active
								})
							}), {
								default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
									item,
									index,
									ui: ui.value
								}, () => [
									renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
										item,
										index,
										ui: ui.value
									}, () => [item.loading ? (openBlock(), createBlock(_sfc_main$2$2, {
										key: 0,
										name: unref(props).loadingIcon || unref(appConfig).ui.icons.loading,
										"data-slot": "itemLeadingIcon",
										class: ui.value.itemLeadingIcon({
											class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
											loading: true
										})
									}, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$2, {
										key: 1,
										name: item.icon,
										"data-slot": "itemLeadingIcon",
										class: ui.value.itemLeadingIcon({
											class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon],
											active: active || item.active
										})
									}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
										key: 2,
										size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
									}, item.avatar, {
										"data-slot": "itemLeadingAvatar",
										class: ui.value.itemLeadingAvatar({
											class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
											active: active || item.active
										})
									}), null, 16, ["size", "class"])) : item.chip ? (openBlock(), createBlock(_sfc_main$2$1, mergeProps({
										key: 3,
										size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
										inset: "",
										standalone: ""
									}, item.chip, {
										"data-slot": "itemLeadingChip",
										class: ui.value.itemLeadingChip({
											class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip],
											active: active || item.active
										})
									}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
									item.prefix || item.labelHtml || unref(get$1)(item, unref(props).labelKey) || item.suffixHtml || item.suffix || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
										key: 0,
										"data-slot": "itemWrapper",
										class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, item.ui?.itemWrapper] })
									}, [createVNode("span", {
										"data-slot": "itemLabel",
										class: ui.value.itemLabel({
											class: [unref(props).ui?.itemLabel, item.ui?.itemLabel],
											active: active || item.active
										})
									}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
										item,
										index,
										ui: ui.value
									}, () => [
										item.prefix ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "itemLabelPrefix",
											class: ui.value.itemLabelPrefix({ class: [unref(props).ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
										}, toDisplayString(item.prefix), 3)) : createCommentVNode("", true),
										item.labelHtml ? (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "itemLabelBase",
											class: ui.value.itemLabelBase({
												class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
												active: active || item.active
											}),
											innerHTML: item.labelHtml
										}, null, 10, ["innerHTML"])) : (openBlock(), createBlock("span", {
											key: 2,
											"data-slot": "itemLabelBase",
											class: ui.value.itemLabelBase({
												class: [unref(props).ui?.itemLabelBase, item.ui?.itemLabelBase],
												active: active || item.active
											})
										}, toDisplayString(unref(get$1)(item, unref(props).labelKey)), 3)),
										item.suffixHtml ? (openBlock(), createBlock("span", {
											key: 3,
											"data-slot": "itemLabelSuffix",
											class: ui.value.itemLabelSuffix({
												class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
												active: active || item.active
											}),
											innerHTML: item.suffixHtml
										}, null, 10, ["innerHTML"])) : item.suffix ? (openBlock(), createBlock("span", {
											key: 4,
											"data-slot": "itemLabelSuffix",
											class: ui.value.itemLabelSuffix({
												class: [unref(props).ui?.itemLabelSuffix, item.ui?.itemLabelSuffix],
												active: active || item.active
											})
										}, toDisplayString(item.suffix), 3)) : createCommentVNode("", true)
									])], 2), item.descriptionHtml ? (openBlock(), createBlock("span", {
										key: 0,
										"data-slot": "itemDescription",
										class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] }),
										innerHTML: item.descriptionHtml
									}, null, 10, ["innerHTML"])) : unref(get$1)(item, unref(props).descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (openBlock(), createBlock("span", {
										key: 1,
										"data-slot": "itemDescription",
										class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, item.ui?.itemDescription] })
									}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
										item,
										index,
										ui: ui.value
									}, () => [createTextVNode(toDisplayString(unref(get$1)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
									createVNode("span", {
										"data-slot": "itemTrailing",
										class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, item.ui?.itemTrailing] })
									}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
										item,
										index,
										ui: ui.value
									}, () => [item.children && item.children.length > 0 ? (openBlock(), createBlock(_sfc_main$2$2, {
										key: 0,
										name: unref(props).childrenIcon || unref(appConfig).ui.icons.chevronRight,
										"data-slot": "itemTrailingIcon",
										class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
									}, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
										key: 1,
										"data-slot": "itemTrailingKbds",
										class: ui.value.itemTrailingKbds({ class: [unref(props).ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
									}, [(openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
										return openBlock(), createBlock(_sfc_main$c, mergeProps({
											key: kbdIndex,
											size: item.ui?.itemTrailingKbdsSize || unref(props).ui?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
										}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
									}), 128))], 2)) : group?.highlightedIcon ? (openBlock(), createBlock(_sfc_main$2$2, {
										key: 2,
										name: group.highlightedIcon,
										"data-slot": "itemTrailingHighlightedIcon",
										class: ui.value.itemTrailingHighlightedIcon({ class: [unref(props).ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
									}, null, 8, ["name", "class"])) : createCommentVNode("", true)]), !item.children?.length ? (openBlock(), createBlock(unref(ListboxItemIndicator_default), {
										key: 0,
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode(_sfc_main$2$2, {
											name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
											"data-slot": "itemTrailingIcon",
											class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
										}, null, 8, ["name", "class"])]),
										_: 2
									}, 1024)) : createCommentVNode("", true)], 2)
								])]),
								_: 2
							}, 1040, ["class"])]),
							_: 2
						}, 1032, [
							"value",
							"disabled",
							"onSelect"
						])]),
						_: 2
					}, 1040)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(ListboxRoot_default), mergeProps({
				ref_key: "rootRef",
				ref: rootRef,
				"data-slot": "root"
			}, {
				...unref(rootProps),
				..._ctx.$attrs
			}, {
				"selection-behavior": unref(props).selectionBehavior,
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(props).input) _push(ssrRenderComponent(unref(ListboxFilter_default), {
							modelValue: searchTerm.value,
							"onUpdate:modelValue": ($event) => searchTerm.value = $event,
							"as-child": ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_sfc_main$h, mergeProps({
									variant: "none",
									size: unref(props).size,
									placeholder: placeholder.value,
									autofocus: unref(props).autofocus,
									loading: unref(props).loading,
									"loading-icon": unref(props).loadingIcon,
									"trailing-icon": unref(props).trailingIcon,
									icon: unref(props).icon === false ? void 0 : unref(props).icon ?? unref(appConfig).ui.icons.search
								}, typeof unref(props).input === "object" ? unref(props).input : {}, {
									"data-slot": "input",
									class: ui.value.input({ class: unref(props).ui?.input }),
									onKeydown: onBackspace
								}), createSlots({ _: 2 }, [history.value?.length && (unref(props).back || !!slots.back) ? {
									name: "leading",
									fn: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "back", { ui: ui.value }, () => {
											_push(ssrRenderComponent(_sfc_main$b, mergeProps({
												size: unref(props).size,
												icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
												color: "neutral",
												variant: "link",
												"aria-label": unref(t)("commandPalette.back")
											}, typeof unref(props).back === "object" ? unref(props).back : {}, {
												"data-slot": "back",
												class: ui.value.back({ class: unref(props).ui?.back }),
												onClick: navigateBack
											}), null, _parent, _scopeId));
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [createVNode(_sfc_main$b, mergeProps({
											size: unref(props).size,
											icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
											color: "neutral",
											variant: "link",
											"aria-label": unref(t)("commandPalette.back")
										}, typeof unref(props).back === "object" ? unref(props).back : {}, {
											"data-slot": "back",
											class: ui.value.back({ class: unref(props).ui?.back }),
											onClick: navigateBack
										}), null, 16, [
											"size",
											"icon",
											"aria-label",
											"class"
										])])];
									}),
									key: "0"
								} : void 0, unref(props).close || !!slots.close ? {
									name: "trailing",
									fn: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
											if (unref(props).close) _push(ssrRenderComponent(_sfc_main$b, mergeProps({
												size: unref(props).size,
												icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
												color: "neutral",
												variant: "ghost",
												"aria-label": unref(t)("commandPalette.close")
											}, typeof unref(props).close === "object" ? unref(props).close : {}, {
												"data-slot": "close",
												class: ui.value.close({ class: unref(props).ui?.close }),
												onClick: ($event) => emits("update:open", false)
											}), null, _parent, _scopeId));
											else _push(`<!---->`);
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
											key: 0,
											size: unref(props).size,
											icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
											color: "neutral",
											variant: "ghost",
											"aria-label": unref(t)("commandPalette.close")
										}, typeof unref(props).close === "object" ? unref(props).close : {}, {
											"data-slot": "close",
											class: ui.value.close({ class: unref(props).ui?.close }),
											onClick: ($event) => emits("update:open", false)
										}), null, 16, [
											"size",
											"icon",
											"aria-label",
											"class",
											"onClick"
										])) : createCommentVNode("", true)])];
									}),
									key: "1"
								} : void 0]), _parent, _scopeId));
								else return [createVNode(_sfc_main$h, mergeProps({
									variant: "none",
									size: unref(props).size,
									placeholder: placeholder.value,
									autofocus: unref(props).autofocus,
									loading: unref(props).loading,
									"loading-icon": unref(props).loadingIcon,
									"trailing-icon": unref(props).trailingIcon,
									icon: unref(props).icon === false ? void 0 : unref(props).icon ?? unref(appConfig).ui.icons.search
								}, typeof unref(props).input === "object" ? unref(props).input : {}, {
									"data-slot": "input",
									class: ui.value.input({ class: unref(props).ui?.input }),
									onKeydown: withKeys(onBackspace, ["backspace"])
								}), createSlots({ _: 2 }, [history.value?.length && (unref(props).back || !!slots.back) ? {
									name: "leading",
									fn: withCtx(() => [renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [createVNode(_sfc_main$b, mergeProps({
										size: unref(props).size,
										icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
										color: "neutral",
										variant: "link",
										"aria-label": unref(t)("commandPalette.back")
									}, typeof unref(props).back === "object" ? unref(props).back : {}, {
										"data-slot": "back",
										class: ui.value.back({ class: unref(props).ui?.back }),
										onClick: navigateBack
									}), null, 16, [
										"size",
										"icon",
										"aria-label",
										"class"
									])])]),
									key: "0"
								} : void 0, unref(props).close || !!slots.close ? {
									name: "trailing",
									fn: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
										key: 0,
										size: unref(props).size,
										icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
										color: "neutral",
										variant: "ghost",
										"aria-label": unref(t)("commandPalette.close")
									}, typeof unref(props).close === "object" ? unref(props).close : {}, {
										"data-slot": "close",
										class: ui.value.close({ class: unref(props).ui?.close }),
										onClick: ($event) => emits("update:open", false)
									}), null, 16, [
										"size",
										"icon",
										"aria-label",
										"class",
										"onClick"
									])) : createCommentVNode("", true)])]),
									key: "1"
								} : void 0]), 1040, [
									"size",
									"placeholder",
									"autofocus",
									"loading",
									"loading-icon",
									"trailing-icon",
									"icon",
									"class"
								])];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(ListboxContent_default), {
							"data-slot": "content",
							class: ui.value.content({ class: unref(props).ui?.content })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (filteredGroups.value?.length) {
									_push(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: unref(props).ui?.viewport }))}"${_scopeId}>`);
									if (!!unref(props).virtualize) _push(ssrRenderComponent(unref(ListboxVirtualizer_default), mergeProps({
										options: filteredItems.value,
										"text-content": (item2) => unref(get$1)(item2, unref(props).labelKey)
									}, virtualizerProps.value), {
										default: withCtx(({ option: item, virtualItem }, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
												item,
												index: virtualItem.index
											}, null, _parent, _scopeId));
											else return [createVNode(unref(ReuseItemTemplate), {
												item,
												index: virtualItem.index
											}, null, 8, ["item", "index"])];
										}),
										_: 1
									}, _parent, _scopeId));
									else {
										_push(`<!--[-->`);
										ssrRenderList(filteredGroups.value, (group) => {
											_push(ssrRenderComponent(unref(ListboxGroup_default), {
												key: `group-${group.id}`,
												"data-slot": "group",
												class: ui.value.group({ class: unref(props).ui?.group })
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														if (unref(get$1)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : "group-label"]) _push(ssrRenderComponent(unref(ListboxGroupLabel_default), {
															"data-slot": "label",
															class: ui.value.label({ class: unref(props).ui?.label })
														}, {
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) ssrRenderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : "group-label", {
																	group,
																	label: unref(get$1)(group, unref(props).labelKey),
																	ui: ui.value
																}, () => {
																	_push(`${ssrInterpolate(unref(get$1)(group, unref(props).labelKey))}`);
																}, _push, _parent, _scopeId);
																else return [renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : "group-label", {
																	group,
																	label: unref(get$1)(group, unref(props).labelKey),
																	ui: ui.value
																}, () => [createTextVNode(toDisplayString(unref(get$1)(group, unref(props).labelKey)), 1)])];
															}),
															_: 2
														}, _parent, _scopeId));
														else _push(`<!---->`);
														_push(`<!--[-->`);
														ssrRenderList(group.items, (item, index) => {
															_push(ssrRenderComponent(unref(ReuseItemTemplate), {
																key: `group-${group.id}-${index}`,
																item,
																index,
																group
															}, null, _parent, _scopeId));
														});
														_push(`<!--]-->`);
													} else return [unref(get$1)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : "group-label"] ? (openBlock(), createBlock(unref(ListboxGroupLabel_default), {
														key: 0,
														"data-slot": "label",
														class: ui.value.label({ class: unref(props).ui?.label })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : "group-label", {
															group,
															label: unref(get$1)(group, unref(props).labelKey),
															ui: ui.value
														}, () => [createTextVNode(toDisplayString(unref(get$1)(group, unref(props).labelKey)), 1)])]),
														_: 2
													}, 1032, ["class"])) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item, index) => {
														return openBlock(), createBlock(unref(ReuseItemTemplate), {
															key: `group-${group.id}-${index}`,
															item,
															index,
															group
														}, null, 8, [
															"item",
															"index",
															"group"
														]);
													}), 128))];
												}),
												_: 2
											}, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									}
									_push(`</div>`);
								} else {
									_push(`<div data-slot="empty" class="${ssrRenderClass(ui.value.empty({ class: unref(props).ui?.empty }))}"${_scopeId}>`);
									ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
										_push(`${ssrInterpolate(searchTerm.value ? unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : unref(t)("commandPalette.noData"))}`);
									}, _push, _parent, _scopeId);
									_push(`</div>`);
								}
								else return [filteredGroups.value?.length ? (openBlock(), createBlock("div", {
									key: 0,
									role: "presentation",
									"data-slot": "viewport",
									class: ui.value.viewport({ class: unref(props).ui?.viewport })
								}, [!!unref(props).virtualize ? (openBlock(), createBlock(unref(ListboxVirtualizer_default), mergeProps({
									key: 0,
									options: filteredItems.value,
									"text-content": (item2) => unref(get$1)(item2, unref(props).labelKey)
								}, virtualizerProps.value), {
									default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
										item,
										index: virtualItem.index
									}, null, 8, ["item", "index"])]),
									_: 1
								}, 16, ["options", "text-content"])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(filteredGroups.value, (group) => {
									return openBlock(), createBlock(unref(ListboxGroup_default), {
										key: `group-${group.id}`,
										"data-slot": "group",
										class: ui.value.group({ class: unref(props).ui?.group })
									}, {
										default: withCtx(() => [unref(get$1)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : "group-label"] ? (openBlock(), createBlock(unref(ListboxGroupLabel_default), {
											key: 0,
											"data-slot": "label",
											class: ui.value.label({ class: unref(props).ui?.label })
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : "group-label", {
												group,
												label: unref(get$1)(group, unref(props).labelKey),
												ui: ui.value
											}, () => [createTextVNode(toDisplayString(unref(get$1)(group, unref(props).labelKey)), 1)])]),
											_: 2
										}, 1032, ["class"])) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item, index) => {
											return openBlock(), createBlock(unref(ReuseItemTemplate), {
												key: `group-${group.id}-${index}`,
												item,
												index,
												group
											}, null, 8, [
												"item",
												"index",
												"group"
											]);
										}), 128))]),
										_: 2
									}, 1032, ["class"]);
								}), 128))], 2)) : (openBlock(), createBlock("div", {
									key: 1,
									"data-slot": "empty",
									class: ui.value.empty({ class: unref(props).ui?.empty })
								}, [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : unref(t)("commandPalette.noData")), 1)])], 2))];
							}),
							_: 3
						}, _parent, _scopeId));
						if (!!slots.footer) {
							_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "footer", { ui: ui.value }, null, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [
						unref(props).input ? (openBlock(), createBlock(unref(ListboxFilter_default), {
							key: 0,
							modelValue: searchTerm.value,
							"onUpdate:modelValue": ($event) => searchTerm.value = $event,
							"as-child": ""
						}, {
							default: withCtx(() => [createVNode(_sfc_main$h, mergeProps({
								variant: "none",
								size: unref(props).size,
								placeholder: placeholder.value,
								autofocus: unref(props).autofocus,
								loading: unref(props).loading,
								"loading-icon": unref(props).loadingIcon,
								"trailing-icon": unref(props).trailingIcon,
								icon: unref(props).icon === false ? void 0 : unref(props).icon ?? unref(appConfig).ui.icons.search
							}, typeof unref(props).input === "object" ? unref(props).input : {}, {
								"data-slot": "input",
								class: ui.value.input({ class: unref(props).ui?.input }),
								onKeydown: withKeys(onBackspace, ["backspace"])
							}), createSlots({ _: 2 }, [history.value?.length && (unref(props).back || !!slots.back) ? {
								name: "leading",
								fn: withCtx(() => [renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [createVNode(_sfc_main$b, mergeProps({
									size: unref(props).size,
									icon: unref(props).backIcon || unref(appConfig).ui.icons.arrowLeft,
									color: "neutral",
									variant: "link",
									"aria-label": unref(t)("commandPalette.back")
								}, typeof unref(props).back === "object" ? unref(props).back : {}, {
									"data-slot": "back",
									class: ui.value.back({ class: unref(props).ui?.back }),
									onClick: navigateBack
								}), null, 16, [
									"size",
									"icon",
									"aria-label",
									"class"
								])])]),
								key: "0"
							} : void 0, unref(props).close || !!slots.close ? {
								name: "trailing",
								fn: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
									key: 0,
									size: unref(props).size,
									icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
									color: "neutral",
									variant: "ghost",
									"aria-label": unref(t)("commandPalette.close")
								}, typeof unref(props).close === "object" ? unref(props).close : {}, {
									"data-slot": "close",
									class: ui.value.close({ class: unref(props).ui?.close }),
									onClick: ($event) => emits("update:open", false)
								}), null, 16, [
									"size",
									"icon",
									"aria-label",
									"class",
									"onClick"
								])) : createCommentVNode("", true)])]),
								key: "1"
							} : void 0]), 1040, [
								"size",
								"placeholder",
								"autofocus",
								"loading",
								"loading-icon",
								"trailing-icon",
								"icon",
								"class"
							])]),
							_: 3
						}, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
						createVNode(unref(ListboxContent_default), {
							"data-slot": "content",
							class: ui.value.content({ class: unref(props).ui?.content })
						}, {
							default: withCtx(() => [filteredGroups.value?.length ? (openBlock(), createBlock("div", {
								key: 0,
								role: "presentation",
								"data-slot": "viewport",
								class: ui.value.viewport({ class: unref(props).ui?.viewport })
							}, [!!unref(props).virtualize ? (openBlock(), createBlock(unref(ListboxVirtualizer_default), mergeProps({
								key: 0,
								options: filteredItems.value,
								"text-content": (item2) => unref(get$1)(item2, unref(props).labelKey)
							}, virtualizerProps.value), {
								default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
									item,
									index: virtualItem.index
								}, null, 8, ["item", "index"])]),
								_: 1
							}, 16, ["options", "text-content"])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(filteredGroups.value, (group) => {
								return openBlock(), createBlock(unref(ListboxGroup_default), {
									key: `group-${group.id}`,
									"data-slot": "group",
									class: ui.value.group({ class: unref(props).ui?.group })
								}, {
									default: withCtx(() => [unref(get$1)(group, unref(props).labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : "group-label"] ? (openBlock(), createBlock(unref(ListboxGroupLabel_default), {
										key: 0,
										"data-slot": "label",
										class: ui.value.label({ class: unref(props).ui?.label })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, group.slot ? `${group.slot}-group-label` : "group-label", {
											group,
											label: unref(get$1)(group, unref(props).labelKey),
											ui: ui.value
										}, () => [createTextVNode(toDisplayString(unref(get$1)(group, unref(props).labelKey)), 1)])]),
										_: 2
									}, 1032, ["class"])) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(group.items, (item, index) => {
										return openBlock(), createBlock(unref(ReuseItemTemplate), {
											key: `group-${group.id}-${index}`,
											item,
											index,
											group
										}, null, 8, [
											"item",
											"index",
											"group"
										]);
									}), 128))]),
									_: 2
								}, 1032, ["class"]);
							}), 128))], 2)) : (openBlock(), createBlock("div", {
								key: 1,
								"data-slot": "empty",
								class: ui.value.empty({ class: unref(props).ui?.empty })
							}, [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : unref(t)("commandPalette.noData")), 1)])], 2))]),
							_: 3
						}, 8, ["class"]),
						!!slots.footer ? (openBlock(), createBlock("div", {
							key: 1,
							"data-slot": "footer",
							class: ui.value.footer({ class: unref(props).ui?.footer })
						}, [renderSlot(_ctx.$slots, "footer", { ui: ui.value })], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$2 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/CommandPalette.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdashboard-search.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_search_default = {
	"slots": {
		"modal": "",
		"input": ""
	},
	"variants": {
		"fullscreen": { "false": { "modal": "sm:max-w-3xl h-full sm:h-[28rem]" } },
		"size": {
			"xs": {},
			"sm": {},
			"md": {},
			"lg": {},
			"xl": {}
		}
	},
	"defaultVariants": { "size": "md" }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSearch.vue
var _sfc_main = {
	__name: "UDashboardSearch",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		size: {
			type: null,
			required: false
		},
		close: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		input: {
			type: [Boolean, Object],
			required: false
		},
		shortcut: {
			type: String,
			required: false,
			default: "meta_k"
		},
		fuse: {
			type: Object,
			required: false
		},
		searchDelay: {
			type: Number,
			required: false,
			default: 100
		},
		colorMode: {
			type: Boolean,
			required: false,
			default: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		overlay: {
			type: Boolean,
			required: false
		},
		transition: {
			type: Boolean,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		dismissible: {
			type: Boolean,
			required: false
		},
		fullscreen: {
			type: Boolean,
			required: false,
			default: false
		},
		modal: {
			type: Boolean,
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		unmountOnHide: {
			type: Boolean,
			required: false
		},
		icon: {
			type: [String, Boolean],
			required: false,
			skipCheck: true
		},
		trailingIcon: {
			type: null,
			required: false
		},
		selectedIcon: {
			type: null,
			required: false
		},
		childrenIcon: {
			type: null,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		autofocus: {
			type: Boolean,
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
		closeIcon: {
			type: null,
			required: false
		},
		back: {
			type: [Boolean, Object],
			required: false
		},
		backIcon: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		highlightOnHover: {
			type: Boolean,
			required: false
		},
		labelKey: {
			type: null,
			required: false
		},
		descriptionKey: {
			type: null,
			required: false
		},
		preserveGroupOrder: {
			type: Boolean,
			required: false
		},
		virtualize: {
			type: [Boolean, Object],
			required: false
		},
		groups: {
			type: Array,
			required: false
		}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {},
		"searchTerm": {
			type: String,
			default: ""
		},
		"searchTermModifiers": {}
	}),
	emits: ["update:open", "update:searchTerm"],
	setup(__props, { expose: __expose }) {
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("dashboardSearch", _props);
		const open = useModel(__props, "open", {
			type: Boolean,
			default: false
		});
		const searchTerm = useModel(__props, "searchTerm", {
			type: String,
			default: ""
		});
		useRuntimeHook("dashboard:search:toggle", () => {
			open.value = !open.value;
		});
		const { t } = useLocale();
		const colorMode = useColorMode();
		const appConfig = useAppConfig();
		const commandPaletteProps = useForwardProps(reactivePick(props, "size", "icon", "trailingIcon", "selectedIcon", "childrenIcon", "placeholder", "autofocus", "loading", "loadingIcon", "close", "closeIcon", "back", "backIcon", "disabled", "highlightOnHover", "labelKey", "descriptionKey", "preserveGroupOrder", "virtualize", "searchDelay"));
		const modalProps = useForwardProps(reactivePick(props, "overlay", "transition", "content", "dismissible", "fullscreen", "modal", "portal", "unmountOnHide"));
		const inputProps = computed(() => {
			if (props.input === false) return false;
			return defu(typeof props.input === "object" ? props.input : {}, { fixed: true });
		});
		const getProxySlots = () => omit(slots, ["content"]);
		const fuse = computed(() => defu({}, props.fuse, { fuseOptions: { useTokenSearch: true } }));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdashboard_search_default,
			...appConfig.ui?.dashboardSearch || {}
		})({
			size: props.size,
			fullscreen: props.fullscreen
		}));
		const groups = computed(() => {
			const groups2 = [];
			groups2.push(...props.groups || []);
			if (props.colorMode && !colorMode?.forced) groups2.push({
				id: "theme",
				label: t("dashboardSearch.theme"),
				items: [
					{
						label: t("colorMode.system"),
						icon: appConfig.ui.icons.system,
						active: colorMode.preference === "system",
						onSelect: () => {
							colorMode.preference = "system";
						}
					},
					{
						label: t("colorMode.light"),
						icon: appConfig.ui.icons.light,
						active: colorMode.preference === "light",
						onSelect: () => {
							colorMode.preference = "light";
						}
					},
					{
						label: t("colorMode.dark"),
						icon: appConfig.ui.icons.dark,
						active: colorMode.preference === "dark",
						onSelect: () => {
							colorMode.preference = "dark";
						}
					}
				]
			});
			return groups2;
		});
		const commandPaletteRef = useTemplateRef("commandPaletteRef");
		function onSelect(item) {
			if (item.disabled) return;
			open.value = false;
			searchTerm.value = "";
		}
		defineShortcuts({ [props.shortcut]: {
			usingInput: true,
			handler: () => open.value = !open.value
		} });
		__expose({ commandPaletteRef });
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$8, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: unref(props).title || unref(t)("dashboardSearch.title"),
				description: unref(props).description || unref(t)("dashboardSearch.description")
			}, unref(modalProps), {
				"data-slot": "modal",
				class: ui.value.modal({ class: [unref(props).ui?.modal, unref(props).class] })
			}, _attrs), {
				content: withCtx((contentData, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "content", contentData, () => {
						_push(ssrRenderComponent(_sfc_main$1, mergeProps({
							ref_key: "commandPaletteRef",
							ref: commandPaletteRef,
							"search-term": searchTerm.value,
							"onUpdate:searchTerm": ($event) => searchTerm.value = $event
						}, unref(commandPaletteProps), {
							groups: groups.value,
							fuse: fuse.value,
							input: inputProps.value,
							ui: unref(transformUI)(unref(omit)(ui.value, ["modal"]), unref(props).ui),
							"onUpdate:modelValue": onSelect,
							"onUpdate:open": ($event) => open.value = $event
						}), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
							return {
								name,
								fn: withCtx((slotData, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, name, slotData, null, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, name, slotData)];
								})
							};
						})]), _parent, _scopeId));
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "content", contentData, () => [createVNode(_sfc_main$1, mergeProps({
						ref_key: "commandPaletteRef",
						ref: commandPaletteRef,
						"search-term": searchTerm.value,
						"onUpdate:searchTerm": ($event) => searchTerm.value = $event
					}, unref(commandPaletteProps), {
						groups: groups.value,
						fuse: fuse.value,
						input: inputProps.value,
						ui: unref(transformUI)(unref(omit)(ui.value, ["modal"]), unref(props).ui),
						"onUpdate:modelValue": onSelect,
						"onUpdate:open": ($event) => open.value = $event
					}), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
						return {
							name,
							fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, slotData)])
						};
					})]), 1040, [
						"search-term",
						"onUpdate:searchTerm",
						"groups",
						"fuse",
						"input",
						"ui",
						"onUpdate:open"
					])])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSearch.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region node_modules/.pnpm/nuxt@4.5.2_@babel+plugin-sy_8d3ee09fd7864d66cfa01977225356c6/node_modules/nuxt/dist/app/composables/fetch.js
var import_shared_cjs_prod = require_shared_cjs_prod();
var $fetch$1 = $fetch$2;
var MAYBE_REF_OR_GETTER_OPTION_KEYS = [
	"method",
	"baseURL",
	"query",
	"params",
	"body",
	"headers"
];
function generateOptionSegments(opts) {
	const segments = [toValue(opts.method)?.toUpperCase() || "GET", toValue(opts.baseURL)];
	for (const _obj of [opts.query || opts.params]) {
		const obj = toValue(_obj);
		if (!obj) continue;
		const unwrapped = {};
		for (const [key, value] of Object.entries(obj)) unwrapped[toValue(key)] = toValue(value);
		segments.push(unwrapped);
	}
	if (opts.body) {
		const value = toValue(opts.body);
		if (!value) segments.push(hashKey(value));
		else if (value instanceof ArrayBuffer) segments.push(hashKey(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
		else if (value instanceof FormData) {
			const entries = [];
			for (const entry of value.entries()) {
				const [key, val] = entry;
				entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
			}
			segments.push(hashKey(entries));
		} else if ((0, import_shared_cjs_prod.isPlainObject)(value)) segments.push(hashKey(reactive(value)));
		else try {
			segments.push(hashKey(value));
		} catch {
			dataDiagnostics.NUXT_E3002({ cause: value });
		}
	}
	return segments;
}
/**
* A factory function to create a custom `useFetch` composable with pre-defined default options.
* @since 4.2.0
*/
var createUseFetch = defineKeyedFunctionFactory({
	name: "createUseFetch",
	factory(options = {}) {
		function useFetch(request, arg1, arg2) {
			const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
			const factoryOptions = typeof options === "function" ? options(opts) : options;
			const { server, lazy, default: defaultFn, transform, pick, watch: watchSources, immediate, getCachedData, deep, dedupe, timeout, enabled, ...fetchOptions } = {
				...typeof options === "function" ? {} : factoryOptions,
				...opts,
				...typeof options === "function" ? factoryOptions : {}
			};
			const _request = computed(() => toValue(request));
			const key = computed(() => toValue(fetchOptions.key) || "$f" + hashKey([
				autoKey,
				typeof _request.value === "string" ? _request.value : "",
				...generateOptionSegments(fetchOptions)
			]));
			if (!fetchOptions.baseURL && typeof _request.value === "string" && _request.value[0] === "/" && _request.value[1] === "/") throw dataDiagnostics.NUXT_E3001({ url: _request.value });
			const _fetchOptions = reactive({
				...fetchDefaults,
				...fetchOptions,
				cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
			});
			const _asyncDataOptions = {
				server,
				lazy,
				default: defaultFn,
				transform,
				pick,
				immediate,
				getCachedData,
				deep,
				dedupe,
				timeout,
				enabled,
				watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
			};
			if (watchSources === false) _asyncDataOptions._keyTriggersExecute = false;
			return useAsyncData(key, (_, { signal }) => {
				let _$fetch = fetchOptions.$fetch || $fetch$1;
				if (!fetchOptions.$fetch) {
					if (typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/")) _$fetch = useRequestFetch();
				}
				const resolvedOptions = {
					signal,
					..._fetchOptions
				};
				for (const key of MAYBE_REF_OR_GETTER_OPTION_KEYS) if (typeof resolvedOptions[key] === "function") resolvedOptions[key] = toValue(resolvedOptions[key]);
				return _$fetch(_request.value, resolvedOptions);
			}, _asyncDataOptions);
		}
		return useFetch;
	}
});
var useFetch = createUseFetch.__nuxt_factory();
createUseFetch.__nuxt_factory({
	lazy: true,
	_functionName: "useLazyFetch"
});
//#endregion
//#region app/components/NotificationsSlideover.vue?vue&type=script&setup=true&lang.ts
var NotificationsSlideover_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NotificationsSlideover",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { isNotificationsSlideoverOpen } = useDashboard$1();
		const { data: notifications } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/notifications", "$1YFNwKPQEX")), __temp = await __temp, __restore(), __temp);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_USlideover = _sfc_main$9;
			const _component_NuxtLink = NuxtLink;
			const _component_UChip = _sfc_main$2$1;
			const _component_UAvatar = _sfc_main$1$2;
			_push(ssrRenderComponent(_component_USlideover, mergeProps({
				open: unref(isNotificationsSlideoverOpen),
				"onUpdate:open": ($event) => isRef(isNotificationsSlideoverOpen) ? isNotificationsSlideoverOpen.value = $event : null,
				title: "Notifications"
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(unref(notifications), (notification) => {
							_push(ssrRenderComponent(_component_NuxtLink, {
								key: notification.id,
								to: `/inbox?id=${notification.id}`,
								class: "px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_UChip, {
											color: "error",
											show: !!notification.unread,
											inset: ""
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, notification.sender.avatar, {
													alt: notification.sender.name,
													size: "md"
												}), null, _parent, _scopeId));
												else return [createVNode(_component_UAvatar, mergeProps({ ref_for: true }, notification.sender.avatar, {
													alt: notification.sender.name,
													size: "md"
												}), null, 16, ["alt"])];
											}),
											_: 2
										}, _parent, _scopeId));
										_push(`<div class="text-sm flex-1"${_scopeId}><p class="flex items-center justify-between"${_scopeId}><span class="text-highlighted font-medium"${_scopeId}>${ssrInterpolate(notification.sender.name)}</span><time${ssrRenderAttr("datetime", notification.date)} class="text-muted text-xs"${_scopeId}>${ssrInterpolate(unref(formatTimeAgo)(new Date(notification.date)))}</time></p><p class="text-dimmed"${_scopeId}>${ssrInterpolate(notification.body)}</p></div>`);
									} else return [createVNode(_component_UChip, {
										color: "error",
										show: !!notification.unread,
										inset: ""
									}, {
										default: withCtx(() => [createVNode(_component_UAvatar, mergeProps({ ref_for: true }, notification.sender.avatar, {
											alt: notification.sender.name,
											size: "md"
										}), null, 16, ["alt"])]),
										_: 2
									}, 1032, ["show"]), createVNode("div", { class: "text-sm flex-1" }, [createVNode("p", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-highlighted font-medium" }, toDisplayString(notification.sender.name), 1), createVNode("time", {
										datetime: notification.date,
										class: "text-muted text-xs",
										textContent: toDisplayString(unref(formatTimeAgo)(new Date(notification.date)))
									}, null, 8, ["datetime", "textContent"])]), createVNode("p", { class: "text-dimmed" }, toDisplayString(notification.body), 1)])];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (notification) => {
						return openBlock(), createBlock(_component_NuxtLink, {
							key: notification.id,
							to: `/inbox?id=${notification.id}`,
							class: "px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
						}, {
							default: withCtx(() => [createVNode(_component_UChip, {
								color: "error",
								show: !!notification.unread,
								inset: ""
							}, {
								default: withCtx(() => [createVNode(_component_UAvatar, mergeProps({ ref_for: true }, notification.sender.avatar, {
									alt: notification.sender.name,
									size: "md"
								}), null, 16, ["alt"])]),
								_: 2
							}, 1032, ["show"]), createVNode("div", { class: "text-sm flex-1" }, [createVNode("p", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-highlighted font-medium" }, toDisplayString(notification.sender.name), 1), createVNode("time", {
								datetime: notification.date,
								class: "text-muted text-xs",
								textContent: toDisplayString(unref(formatTimeAgo)(new Date(notification.date)))
							}, null, 8, ["datetime", "textContent"])]), createVNode("p", { class: "text-dimmed" }, toDisplayString(notification.body), 1)])]),
							_: 2
						}, 1032, ["to"]);
					}), 128))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/NotificationsSlideover.vue
var _sfc_setup = NotificationsSlideover_vue_vue_type_script_setup_true_lang_default.setup;
NotificationsSlideover_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NotificationsSlideover.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var NotificationsSlideover_default = Object.assign(NotificationsSlideover_vue_vue_type_script_setup_true_lang_default, { __name: "NotificationsSlideover" });

export { NotificationsSlideover_default as N, UserMenu_default as U, _sfc_main as _, _sfc_main$2 as a, _sfc_main$4 as b, _sfc_main$5 as c, _sfc_main$7 as d };
//# sourceMappingURL=NotificationsSlideover-BJHjx5iP.mjs.map
