import { m as createContext, aB as useLocale, aq as useCookie, aN as useStorage, ap as useComponentProps, ay as useForwardProps, a7 as reactiveOmit, aj as useAppConfig, ag as tv, f as _sfc_main$2, c as Primitive, U as injectConfigProviderContext, ax as useForwardExpose, a3 as onKeyStroke, Z as isNullish, ah as unrefElement, ae as tryOnBeforeUnmount, L as getActiveElement, b as AUTOFOCUS_ON_UNMOUNT, x as focus, r as createSharedComposable, a as AUTOFOCUS_ON_MOUNT, y as focusFirst$1, Q as getTabbableCandidates, E as EVENT_OPTIONS, R as getTabbableEdges, o as createGlobalState } from '../virtual/entry.mjs';
import * as vue from 'vue';
import { ref, computed, isRef, unref, watch, mergeProps, withCtx, renderSlot, defineComponent, watchEffect, openBlock, createBlock, normalizeStyle, reactive, toValue, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function handleAndDispatchCustomEvent(name, handler, detail) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	target.dispatchEvent(event);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useBodyScrollLock.js
var useBodyLockStackCount = createSharedComposable(() => {
	const map = ref(/* @__PURE__ */ new Map());
	ref();
	const locked = computed(() => {
		for (const value of map.value.values()) if (value) return true;
		return false;
	});
	injectConfigProviderContext({ scrollBody: ref(true) });
	watch(locked, (val, oldVal) => {}, {
		immediate: true,
		flush: "sync"
	});
	return map;
});
function useBodyScrollLock(initialState) {
	const id = Math.random().toString(36).substring(2, 7);
	const map = useBodyLockStackCount();
	map.value.set(id, initialState ?? false);
	const locked = computed({
		get: () => map.value.get(id) ?? false,
		set: (value) => map.value.set(id, value)
	});
	tryOnBeforeUnmount();
	return locked;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDirection.js
/**
* The `useDirection` function provides a way to access the current direction in your application.
* @param {Ref<Direction | undefined>} [dir] - An optional ref containing the direction (ltr or rtl).
* @returns  computed value that combines with the resolved direction.
*/
function useDirection(dir) {
	const context = injectConfigProviderContext({ dir: ref("ltr") });
	return computed(() => dir?.value || context.dir?.value || "ltr");
}
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @return {Undo} undo command
*/
var hideOthers = function(originalTarget, parentNode, markerName) {
	Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	return function() {
		return null;
	};
};
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
/**
* The `useHideOthers` function is a TypeScript function that takes a target element reference and
* hides all other elements in ARIA when the target element is present, and restores the visibility of the
* hidden elements when the target element is removed.
* @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want
* to hide other elements when it is clicked or focused.
*/
function useHideOthers(target) {
	let undo;
	watch(() => unrefElement(target), (el) => {
		let isInsideClosedPopover = false;
		try {
			isInsideClosedPopover = !!el?.closest("[popover]:not(:popover-open)");
		} catch {}
		if (el && !isInsideClosedPopover) undo = hideOthers(el);
		else if (undo) undo();
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var count = 0;
/**
* The `useId` function generates a unique identifier using a provided deterministic ID,
* a configured `<ConfigProvider>` ID source, Vue's native `useId`, or a fallback counter.
* @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
* optional parameter `deterministicId`, which can be a string, null, or undefined. If
* `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
* the configured ID source.
*/
function useId$1(deterministicId, prefix = "reka") {
	if (deterministicId) return deterministicId;
	let id;
	const configProviderContext = injectConfigProviderContext({ useId: void 0 });
	if (configProviderContext.useId) id = configProviderContext.useId();
	else if ("useId" in vue) id = vue.useId?.();
	else id = `${++count}`;
	return prefix ? `${prefix}-${id}` : id;
}
/**
* Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup`
* to mimic layer dismissing behaviour present in OS.
* Returns props to pass to the node we want to check for outside events.
*/
function usePointerDownOutside(onPointerDownOutside, element, enabled = true) {
	element?.value?.ownerDocument ?? globalThis?.document;
	const isPointerInsideDOMTree = ref(false);
	ref(() => {});
	watchEffect((cleanupFn) => {});
	return { onPointerDownCapture: () => {
		if (!toValue(enabled)) return;
		isPointerInsideDOMTree.value = true;
	} };
}
/**
* Listens for when focus happens outside a DOM subtree.
* Returns props to pass to the root (node) of the subtree we want to check.
*/
function useFocusOutside(onFocusOutside, element, enabled = true) {
	element?.value?.ownerDocument ?? globalThis?.document;
	const isFocusInsideDOMTree = ref(false);
	watchEffect((cleanupFn) => {});
	return {
		onFocusCapture: () => {
			if (!toValue(enabled)) return;
			isFocusInsideDOMTree.value = true;
		},
		onBlurCapture: () => {
			if (!toValue(enabled)) return;
			isFocusInsideDOMTree.value = false;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var context = /*#__PURE__*/ reactive({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
});
var DismissableLayer_default = /* @__PURE__ */ defineComponent({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
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
			required: false
		},
		present: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement: layerElement } = useForwardExpose();
		const ownerDocument = computed(() => layerElement.value?.ownerDocument ?? globalThis.document);
		const layers = computed(() => context.layersRoot);
		const index = computed(() => {
			return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
		});
		const isBodyPointerEventsDisabled = computed(() => {
			return context.layersWithOutsidePointerEventsDisabled.size > 0;
		});
		const isPointerEventsEnabled = computed(() => {
			const localLayers = Array.from(layers.value);
			const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
			const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
			return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
		});
		const pointerDownOutside = usePointerDownOutside(async (event) => {
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch?.contains(event.target));
			if (!props.present || !isPointerEventsEnabled.value || isPointerDownOnBranch) return;
			emits("pointerDownOutside", event);
			emits("interactOutside", event);
			await nextTick();
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		const focusOutside = useFocusOutside((event) => {
			const isFocusInBranch = [...context.branches].some((branch) => branch?.contains(event.target));
			if (!props.present || isFocusInBranch) return;
			emits("focusOutside", event);
			emits("interactOutside", event);
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		onKeyStroke("Escape", (event) => {
			if (!props.present) return;
			if (!(index.value === layers.value.size - 1)) return;
			emits("escapeKeyDown", event);
			if (!event.defaultPrevented) emits("dismiss");
		});
		watch([
			layerElement,
			() => props.disableOutsidePointerEvents,
			() => props.present
		], ([element, disableOutsidePointerEvents, present], _, onCleanup) => {
			if (!element || !present) return;
			if (disableOutsidePointerEvents) {
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
					context.originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
					ownerDocument.value.body.style.pointerEvents = "none";
				}
				context.layersWithOutsidePointerEventsDisabled.add(element);
				onCleanup(() => {
					context.layersWithOutsidePointerEventsDisabled.delete(element);
					if (context.layersWithOutsidePointerEventsDisabled.size === 0 && !isNullish(context.originalBodyPointerEvents)) ownerDocument.value.body.style.pointerEvents = context.originalBodyPointerEvents;
				});
			}
		}, { immediate: true });
		watch([layerElement, () => props.present], ([element, present], _, onCleanup) => {
			if (!element || !present) return;
			layers.value.add(element);
			onCleanup(() => {
				layers.value.delete(element);
			});
		}, { immediate: true });
		watchEffect((cleanupFn) => {
			cleanupFn(() => {
				if (!layerElement.value) return;
				layers.value.delete(layerElement.value);
				context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-dismissable-layer": "",
				style: normalizeStyle({ pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0 }),
				onFocusCapture: unref(focusOutside).onFocusCapture,
				onBlurCapture: unref(focusOutside).onBlurCapture,
				onPointerdownCapture: unref(pointerDownOutside).onPointerDownCapture
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"style",
				"onFocusCapture",
				"onBlurCapture",
				"onPointerdownCapture"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/stack.js
var useFocusStackState = createGlobalState(() => {
	return ref([]);
});
function createFocusScopesStack() {
	/** A stack of focus scopes, with the active one at the top */
	const stack = useFocusStackState();
	return {
		add(focusScope) {
			const activeFocusScope = stack.value[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value.unshift(focusScope);
		},
		remove(focusScope) {
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var FocusScope_default = /* @__PURE__ */ defineComponent({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		trapped: {
			type: Boolean,
			required: false,
			default: false
		},
		present: {
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
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { currentRef, currentElement } = useForwardExpose();
		ref(null);
		const focusScopesStack = createFocusScopesStack();
		const focusScope = /*#__PURE__*/ reactive({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		});
		watchEffect((cleanupFn) => {});
		function dispatchMountAutoFocus(container, previouslyFocusedElement) {
			const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
			const handleMountAutoFocus = (ev) => emits("mountAutoFocus", ev);
			container.addEventListener(AUTOFOCUS_ON_MOUNT, handleMountAutoFocus);
			container.dispatchEvent(mountEvent);
			container.removeEventListener(AUTOFOCUS_ON_MOUNT, handleMountAutoFocus);
			if (!mountEvent.defaultPrevented) {
				focusFirst$1(getTabbableCandidates(container), { select: true });
				if (getActiveElement() === previouslyFocusedElement) focus(container);
			}
		}
		watchEffect(async (cleanupFn) => {
			const container = currentElement.value;
			await nextTick();
			if (!container) return;
			if (props.present !== false) focusScopesStack.add(focusScope);
			const previouslyFocusedElement = getActiveElement();
			if (!container.contains(previouslyFocusedElement) && props.present !== false) dispatchMountAutoFocus(container, previouslyFocusedElement);
			cleanupFn(() => {
				const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
				const unmountEventHandler = (ev) => {
					emits("unmountAutoFocus", ev);
				};
				container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
				container.dispatchEvent(unmountEvent);
				container.setAttribute("data-focus-scope-unmounting", "");
				setTimeout(() => {
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? (void 0).body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
					focusScopesStack.remove(focusScope);
					container.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		});
		watch(() => props.present, async (present, prevPresent) => {});
		function handleKeyDown(event) {
			if (!props.loop && !props.trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = getActiveElement();
			if (isTabKey && focusedElement) {
				const container = event.currentTarget;
				const [first, last] = getTabbableEdges(container);
				if (!(first && last)) {
					if (focusedElement === container) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (props.loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (props.loop) focus(last, { select: true });
				}
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "currentRef",
				ref: currentRef,
				tabindex: "-1",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				onKeydown: handleKeyDown
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/utils.js
var ITEM_SELECT = "menu.itemSelect";
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS, "ArrowRight"],
	rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function isMouseEvent(event) {
	return event.pointerType === "mouse";
}
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/utils/dashboard.js
var [useDashboard, provideDashboardContext] = createContext("DashboardGroup");
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/composables/useResizable.js
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
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardResizeHandle.vue
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardResizeHandle.vue");
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
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarToggle.vue
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
			_push(ssrRenderComponent(_sfc_main$2, mergeProps({
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarToggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { DismissableLayer_default as D, FIRST_LAST_KEYS as F, ITEM_SELECT as I, LAST_KEYS as L, SELECTION_KEYS as S, _sfc_main as _, FocusScope_default as a, SUB_CLOSE_KEYS as b, SUB_OPEN_KEYS as c, _sfc_main$1 as d, getOpenState as e, focusFirst as f, getCheckedState as g, handleAndDispatchCustomEvent as h, isIndeterminate as i, isMouseEvent as j, isPointerInGraceArea as k, useDashboard as l, useDirection as m, useHideOthers as n, useId$1 as o, provideDashboardContext as p, useResizable as q, useBodyScrollLock as u };
//# sourceMappingURL=DashboardSidebarToggle-BSz-SOza.mjs.map
