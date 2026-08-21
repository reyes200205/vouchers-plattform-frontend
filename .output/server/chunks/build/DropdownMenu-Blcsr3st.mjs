import { ap as useComponentProps, aj as useAppConfig, ay as useForwardProps, a8 as reactivePick, ag as tv, ax as useForwardExpose, P as Presence_default, T as Teleport_default, c as Primitive, aQ as useVModel, aB as useLocale, aG as usePortal, a7 as reactiveOmit, q as createReusableTemplate, Y as isArrayOfArray, j as _sfc_main$2, h as _sfc_main$1$1, K as get, F as FieldGroupReset, g as _sfc_main$5, a5 as pickLinkProps, i as _sfc_main$1$2, a2 as omit, m as createContext, az as useForwardProps$1, ac as syncRef, aH as usePrimitiveElement, as as useEmitAsProps, r as createSharedComposable, am as useCollection, L as getActiveElement } from '../virtual/entry.mjs';
import { o as useId$1, m as useDirection, D as DismissableLayer_default, u as useBodyScrollLock, n as useHideOthers, a as FocusScope_default, e as getOpenState, b as SUB_CLOSE_KEYS, g as getCheckedState, i as isIndeterminate, S as SELECTION_KEYS, c as SUB_OPEN_KEYS, j as isMouseEvent, k as isPointerInGraceArea, F as FIRST_LAST_KEYS, L as LAST_KEYS, f as focusFirst, I as ITEM_SELECT } from './DashboardSidebarToggle-J0oVNQdJ.mjs';
import { u as useComposing } from './useComposing-D1bdBmsI.mjs';
import { u as useFocusGuards, a as useTypeahead } from './useTypeahead-BHsnCgJj.mjs';
import { a as PopperArrow_default, u as useForwardPropsEmits, P as PopperAnchor_default, d as PopperRoot_default, c as PopperContent_default, b as PopperContentPropsDefaultValue } from './PopperArrow-CXqc9lvy.mjs';
import { _ as _sfc_main$3, u as useGraceArea } from './Kbd-BZbceTrO.mjs';
import { R as RovingFocusGroup_default } from './RovingFocusGroup-BqLcWsjw.mjs';
import { _ as _sfc_main$4 } from './Input-YDRYCqsV.mjs';
import { useSlots, useModel, toRef, computed, unref, mergeProps, withCtx, renderSlot, createSlots, openBlock, createBlock, createCommentVNode, renderList, createVNode, mergeModels, defineComponent, normalizeProps, guardReactiveProps, toRefs, ref, resolveDynamicComponent, isRef, withKeys, nextTick, createTextVNode, toDisplayString, Fragment, withModifiers, watchEffect, watch, watchSyncEffect, mergeDefaults, useSSRContext } from 'vue';
import { f as defu } from '../_/nitro.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useArrowNavigation.js
var ignoredElement = ["INPUT", "TEXTAREA"];
/**
* Allow arrow navigation for every html element with data-reka-collection-item tag
*
* @param e               Keyboard event
* @param currentElement  Event initiator element or any element that wants to handle the navigation
* @param parentElement   Parent element where contains all the collection items, this will collect every item to be used when nav
* @param options         further options
* @returns               the navigated html element or null if none
*/
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
	if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
	const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
	const [right, left, up, down, home, end] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	];
	const goingVertical = up || down;
	const goingHorizontal = right || left;
	if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
	const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
	if (!allCollectionItems.length) return null;
	if (preventScroll) e.preventDefault();
	let item = null;
	if (goingHorizontal || goingVertical) item = findNextFocusableElement(allCollectionItems, currentElement, {
		goForward: goingVertical ? down : dir === "ltr" ? right : left,
		loop
	});
	else if (home) item = allCollectionItems.at(0) || null;
	else if (end) item = allCollectionItems.at(-1) || null;
	if (focus) item?.focus();
	return item;
}
/**
* Recursive function to find the next focusable element to avoid disabled elements
*
* @param elements Elements to navigate
* @param currentElement Current active element
* @param options
* @returns next focusable element
*/
function findNextFocusableElement(elements, currentElement, options, iterations = !elements.includes(currentElement) ? elements.length + 1 : elements.length) {
	if (--iterations === 0) return null;
	const index = elements.indexOf(currentElement);
	let newIndex;
	if (index === -1) newIndex = options.goForward ? 0 : elements.length - 1;
	else newIndex = options.goForward ? index + 1 : index - 1;
	if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
	const candidate = elements[(newIndex + elements.length) % elements.length];
	if (!candidate) return null;
	if (candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false") return findNextFocusableElement(elements, candidate, options, iterations);
	return candidate;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFilter.js
/**
* Provides locale-aware string filtering functions.
* Uses `Intl.Collator` for comparison to ensure proper Unicode handling.
*
* @param options - Optional collator options to customize comparison behavior.
*   See [Intl.CollatorOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options) for details.
* @returns An object with methods to check if a string starts with, ends with, or contains a substring.
*
* @example
* const { startsWith, endsWith, contains } = useFilter();
*
* startsWith('hello', 'he'); // true
* endsWith('hello', 'lo'); // true
* contains('hello', 'ell'); // true
*/
function useFilter$1(options) {
	const computedOptions = computed(() => unref(options));
	const collator = computed(() => new Intl.Collator("en", {
		usage: "search",
		...computedOptions.value
	}));
	const startsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(0, substring.length), substring) === 0;
	};
	const endsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(-substring.length), substring) === 0;
	};
	const contains = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		const sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			const slice = string.slice(scan, scan + sliceLen);
			if (collator.value.compare(substring, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var MenuAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "MenuAnchor",
	props: {
		reference: {
			type: null,
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuArrow.js
var MenuArrow_default = /* @__PURE__ */ defineComponent({
	__name: "MenuArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		rounded: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function useIsUsingKeyboardImpl() {
	return ref(false);
}
var useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRoot.js
var [injectMenuContext, provideMenuContext] = /*#__PURE__*/ createContext(["MenuRoot", "MenuSub"], "MenuContext");
var [injectMenuRootContext, provideMenuRootContext] = /*#__PURE__*/ createContext("MenuRoot");
var MenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { modal, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const open = useVModel(props, "open", emits);
		const content = ref();
		const isUsingKeyboardRef = useIsUsingKeyboard();
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuRootContext({
			onClose: () => {
				open.value = false;
			},
			isUsingKeyboardRef,
			dir,
			modal
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContentImpl.js
var [injectMenuContentContext, provideMenuContentContext] = /*#__PURE__*/ createContext("MenuContent");
var MenuContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ mergeDefaults({
		loop: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		disableOutsideScroll: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	}, { ...PopperContentPropsDefaultValue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props);
		useFocusGuards();
		useBodyScrollLock(disableOutsidePointerEvents.value);
		const searchRef = ref("");
		const timerRef = ref(0);
		const pointerGraceTimerRef = ref(0);
		const pointerGraceIntentRef = ref(null);
		const pointerDirRef = ref("right");
		const lastPointerXRef = ref(0);
		const currentItemId = ref(null);
		const rovingFocusGroupRef = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { handleTypeaheadSearch } = useTypeahead();
		const highlightedElement = ref();
		function onKeydownNavigation(event) {
			const el = useArrowNavigation(event, highlightedElement.value || getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: false,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) {
				highlightedElement.value = el;
				el.scrollIntoView({ block: "nearest" });
			}
		}
		function onKeydownEnter() {
			if (highlightedElement.value) highlightedElement.value.click();
		}
		const filterElement = ref();
		const activeSubmenuContext = ref();
		watch(highlightedElement, (el) => {
			if (activeSubmenuContext.value && (el === void 0 || el !== activeSubmenuContext.value.trigger.value)) {
				if (el === void 0) return;
				activeSubmenuContext.value.onOpenChange(false);
				activeSubmenuContext.value = void 0;
			}
		});
		watch(contentElement, (el) => {
			menuContext.onContentChange(el);
		});
		function isPointerMovingToSubmenu(event) {
			return pointerDirRef.value === pointerGraceIntentRef.value?.side && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
		}
		async function handleMountAutoFocus(event) {
			emits("openAutoFocus", event);
			if (event.defaultPrevented) return;
			event.preventDefault();
			contentElement.value?.focus({ preventScroll: true });
		}
		function handleKeyDown(event) {
			if (event.defaultPrevented) return;
			const target = event.target;
			const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
			const isKeyDownInTextField = ["input", "textarea"].includes(target.tagName.toLowerCase());
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			const isCharacterKey = event.key.length === 1;
			const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: true,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) return el?.focus();
			if (event.code === "Space") return;
			const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
			if (isKeyDownInside) {
				if (event.key === "Tab" && rootContext.modal.value) event.preventDefault();
				if (!isModifierKey && isCharacterKey && !isKeyDownInTextField) handleTypeaheadSearch(event.key, collectionItems);
			}
			if (event.target !== contentElement.value) return;
			if (!FIRST_LAST_KEYS.includes(event.key)) return;
			event.preventDefault();
			const candidateNodes = [...collectionItems.map((item) => item.ref)];
			if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
			focusFirst(candidateNodes);
		}
		function handleBlur(event) {
			if (!event?.currentTarget?.contains?.(event.target)) {
				(void 0).clearTimeout(timerRef.value);
				searchRef.value = "";
			}
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			const target = event.target;
			const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
			if ((event?.currentTarget)?.contains(target) && pointerXHasChanged) {
				const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
				pointerDirRef.value = newDir;
				lastPointerXRef.value = event.clientX;
			}
		}
		function handlePointerEnter(event) {
			if (!isMouseEvent(event)) return;
			if (filterElement.value) filterElement.value.focus();
		}
		provideMenuContentContext({
			onItemEnter: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			onItemLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				if (!["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "")) contentElement.value?.focus();
				currentItemId.value = null;
				return false;
			},
			onTriggerLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			searchRef,
			highlightedElement,
			onKeydownNavigation,
			onKeydownEnter,
			filterElement,
			onFilterElementChange: (el) => {
				filterElement.value = el;
			},
			activeSubmenuContext,
			pointerGraceTimerRef,
			onPointerGraceIntentChange: (intent) => {
				pointerGraceIntentRef.value = intent;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				trapped: unref(trapFocus),
				onMountAutoFocus: handleMountAutoFocus,
				onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": unref(disableOutsidePointerEvents),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
					onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
				}, {
					default: withCtx(() => [createVNode(unref(RovingFocusGroup_default), {
						ref_key: "rovingFocusGroupRef",
						ref: rovingFocusGroupRef,
						"current-tab-stop-id": currentItemId.value,
						"onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
						"as-child": "",
						orientation: "vertical",
						dir: unref(rootContext).dir.value,
						loop: unref(loop),
						onEntryFocus: _cache[1] || (_cache[1] = (event) => {
							emits("entryFocus", event);
							if (!unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
						})
					}, {
						default: withCtx(() => [createVNode(unref(PopperContent_default), {
							ref: unref(forwardRef),
							role: "menu",
							as: _ctx.as,
							"as-child": _ctx.asChild,
							"aria-orientation": "vertical",
							"data-reka-menu-content": "",
							"data-state": unref(getOpenState)(unref(menuContext).open.value),
							dir: unref(rootContext).dir.value,
							side: _ctx.side,
							"side-offset": _ctx.sideOffset,
							align: _ctx.align,
							"align-offset": _ctx.alignOffset,
							"avoid-collisions": _ctx.avoidCollisions,
							"collision-boundary": _ctx.collisionBoundary,
							"collision-padding": _ctx.collisionPadding,
							"arrow-padding": _ctx.arrowPadding,
							"prioritize-position": _ctx.prioritizePosition,
							"position-strategy": _ctx.positionStrategy,
							"update-position-strategy": _ctx.updatePositionStrategy,
							sticky: _ctx.sticky,
							"hide-when-detached": _ctx.hideWhenDetached,
							reference: _ctx.reference,
							onKeydown: handleKeyDown,
							onBlur: handleBlur,
							onPointermove: handlePointerMove,
							onPointerenter: handlePointerEnter
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, [
							"as",
							"as-child",
							"data-state",
							"dir",
							"side",
							"side-offset",
							"align",
							"align-offset",
							"avoid-collisions",
							"collision-boundary",
							"collision-padding",
							"arrow-padding",
							"prioritize-position",
							"position-strategy",
							"update-position-strategy",
							"sticky",
							"hide-when-detached",
							"reference"
						])]),
						_: 3
					}, 8, [
						"current-tab-stop-id",
						"dir",
						"loop"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemImpl.js
var MenuItemImpl_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
		const contentContext = injectMenuContentContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isFocused = ref(false);
		const isHighlighted = computed(() => isFocused.value || currentElement.value != null && contentContext.highlightedElement.value === currentElement.value);
		async function handlePointerMove(event) {
			if (event.defaultPrevented || !isMouseEvent(event)) return;
			if (props.disabled) contentContext.onItemLeave(event);
			else if (!contentContext.onItemEnter(event)) {
				const item = event.currentTarget;
				contentContext.highlightedElement.value = item;
				if (!["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "")) item.focus({ preventScroll: true });
			}
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			if (contentContext.highlightedElement.value !== currentElement.value) return;
			if (!contentContext.onItemLeave(event) && contentContext.highlightedElement.value === currentElement.value) contentContext.highlightedElement.value = void 0;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					role: "menuitem",
					tabindex: "-1"
				}, _ctx.$attrs, {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-disabled": _ctx.disabled || void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onFocus: _cache[0] || (_cache[0] = async (event) => {
						await nextTick();
						if (event.defaultPrevented || _ctx.disabled) return;
						isFocused.value = true;
						unref(contentContext).highlightedElement.value = event.currentTarget;
					}),
					onBlur: _cache[1] || (_cache[1] = async (event) => {
						await nextTick();
						if (event.defaultPrevented) return;
						isFocused.value = false;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-disabled",
					"data-disabled",
					"data-highlighted"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItem.js
var MenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		const isPointerDownRef = ref(false);
		async function handleSelect() {
			const menuItem = currentElement.value;
			if (!props.disabled && menuItem) {
				const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
					bubbles: true,
					cancelable: true
				});
				emits("select", itemSelectEvent);
				await nextTick();
				if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
				else rootContext.onClose();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItemImpl_default, mergeProps(props, {
				ref: unref(forwardRef),
				onClick: handleSelect,
				onPointerdown: _cache[0] || (_cache[0] = () => {
					isPointerDownRef.value = true;
				}),
				onPointerup: _cache[1] || (_cache[1] = async (event) => {
					await nextTick();
					if (event.defaultPrevented) return;
					if (!isPointerDownRef.value) event.currentTarget?.click();
				}),
				onKeydown: _cache[2] || (_cache[2] = async (event) => {
					const isTypingAhead = unref(contentContext).searchRef.value !== "";
					if (_ctx.disabled || isTypingAhead && event.key === " ") return;
					if (unref(SELECTION_KEYS).includes(event.key)) {
						event.currentTarget?.click();
						/**
						* We prevent default browser behaviour for selection keys as they should trigger
						* a selection only:
						* - prevents space from scrolling the page.
						* - if keydown causes focus to move, prevents keydown from firing on the new target.
						*/
						event.preventDefault();
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemIndicator.js
var [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = /*#__PURE__*/ createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItemIndicator",
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
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const indicatorContext = injectMenuItemIndicatorContext({ modelValue: ref(false) });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate)(unref(indicatorContext).modelValue.value) || unref(indicatorContext).modelValue.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": unref(getCheckedState)(unref(indicatorContext).modelValue.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-state"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuCheckboxItem.js
var MenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, ["modelValue"]);
		const forwarded = useForwardProps$1(delegatedProps);
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemcheckbox" }, unref(forwarded), {
				"aria-checked": unref(isIndeterminate)(unref(modelValue)) ? "mixed" : unref(modelValue),
				"data-state": unref(getCheckedState)(unref(modelValue)),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					if (unref(isIndeterminate)(unref(modelValue))) modelValue.value = true;
					else modelValue.value = !unref(modelValue);
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentModal.js
var MenuRootContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(menuContext).open.value,
				"disable-outside-pointer-events": unref(menuContext).open.value,
				"disable-outside-scroll": true,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false)),
				onFocusOutside: _cache[1] || (_cache[1] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus", "disable-outside-pointer-events"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentNonModal.js
var MenuRootContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				"disable-outside-scroll": false,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContent.js
var MenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(MenuRootContentModal_default, normalizeProps(mergeProps({ key: 0 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(MenuRootContentNonModal_default, normalizeProps(mergeProps({ key: 1 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuGroup.js
var [injectMenuGroupContext, provideMenuGroupContext] = /*#__PURE__*/ createContext("MenuGroup");
var MenuGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuGroup",
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
		const id = useId$1(void 0, "reka-menu-group");
		provideMenuGroupContext({ id });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props, { "aria-labelledby": unref(id) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuLabel.js
var MenuLabel_default = /* @__PURE__ */ defineComponent({
	__name: "MenuLabel",
	props: {
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
		const groupContext = injectMenuGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id || void 0 }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuPortal.js
var MenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioGroup.js
var [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = /*#__PURE__*/ createContext("MenuRadioGroup");
var MenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioGroup",
	props: {
		modelValue: {
			type: null,
			required: false,
			default: ""
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
		const delegatedProps = reactiveOmit(props, ["modelValue"]);
		const forwarded = useForwardProps$1(delegatedProps);
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuRadioGroupContext({
			modelValue,
			onValueChange: (payload) => {
				modelValue.value = payload;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuGroup_default, normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioItem.js
var MenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, ["value"]);
		const forwarded = useForwardProps$1(delegatedProps);
		const { value } = toRefs(props);
		const radioGroupContext = injectMenuRadioGroupContext();
		const modelValue = computed(() => radioGroupContext.modelValue.value === value?.value);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemradio" }, unref(forwarded), {
				"aria-checked": modelValue.value,
				"data-state": unref(getCheckedState)(modelValue.value),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					unref(radioGroupContext).onValueChange(unref(value));
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSeparator.js
var MenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSeparator",
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				role: "separator",
				"aria-orientation": "horizontal"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSub.js
var [injectMenuSubContext, provideMenuSubContext] = /*#__PURE__*/ createContext("MenuSub");
var MenuSub_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSub",
	props: { open: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: false,
			passive: props.open === void 0
		});
		const parentMenuContext = injectMenuContext();
		const trigger = ref();
		const content = ref();
		watchEffect((cleanupFn) => {
			if (parentMenuContext?.open.value === false) open.value = false;
			cleanupFn(() => open.value = false);
		});
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuSubContext({
			triggerId: "",
			contentId: "",
			trigger,
			onTriggerChange: (element) => {
				trigger.value = element;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubContent.js
var MenuSubContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false,
			default: true
		},
		reference: {
			type: null,
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
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const menuSubContext = injectMenuSubContext();
		const parentContentContext = injectMenuContentContext();
		const { forwardRef, currentElement: subContentElement } = useForwardExpose();
		menuSubContext.contentId ||= useId$1(void 0, "reka-menu-sub-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [createVNode(MenuContentImpl_default, mergeProps(unref(forwarded), {
					id: unref(menuSubContext).contentId,
					ref: unref(forwardRef),
					"aria-labelledby": unref(menuSubContext).triggerId,
					align: "start",
					side: unref(rootContext).dir.value === "rtl" ? "left" : "right",
					"disable-outside-pointer-events": false,
					"disable-outside-scroll": false,
					"trap-focus": false,
					onOpenAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (unref(rootContext).isUsingKeyboardRef.value) unref(subContentElement)?.focus();
					}, ["prevent"])),
					onCloseAutoFocus: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"])),
					onFocusOutside: _cache[2] || (_cache[2] = (event) => {
						if (event.defaultPrevented) return;
						const isMovingToParentContent = unref(parentContentContext).filterElement.value?.contains(event.target);
						if (event.target !== unref(menuSubContext).trigger.value && !isMovingToParentContent) unref(menuContext).onOpenChange(false);
					}),
					onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
						unref(rootContext).onClose();
						event.preventDefault();
					}),
					onKeydown: _cache[4] || (_cache[4] = (event) => {
						const isKeyDownInside = event.currentTarget?.contains(event.target);
						const isCloseKey = unref(SUB_CLOSE_KEYS)[unref(rootContext).dir.value].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							unref(menuContext).onOpenChange(false);
							if (unref(parentContentContext).filterElement.value) {
								unref(parentContentContext).filterElement.value.focus();
								unref(parentContentContext).highlightedElement.value = unref(menuSubContext).trigger.value;
								unref(menuSubContext).trigger.value?.scrollIntoView({ block: "nearest" });
							} else unref(menuSubContext).trigger.value?.focus();
							event.preventDefault();
						}
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-labelledby",
					"side"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubTrigger.js
var MenuSubTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const subContext = injectMenuSubContext();
		const contentContext = injectMenuContentContext();
		watch(menuContext.open, (open) => {
			if (open) contentContext.activeSubmenuContext.value = {
				onOpenChange: menuContext.onOpenChange,
				trigger: subContext.trigger
			};
			else if (contentContext.activeSubmenuContext.value?.trigger.value === subContext.trigger.value) contentContext.activeSubmenuContext.value = void 0;
		});
		const openTimerRef = ref(null);
		subContext.triggerId ||= useId$1(void 0, "reka-menu-sub-trigger");
		function clearOpenTimer() {
			if (openTimerRef.value) (void 0).clearTimeout(openTimerRef.value);
			openTimerRef.value = null;
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			if (contentContext.onItemEnter(event)) return;
			if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
				contentContext.onPointerGraceIntentChange(null);
				openTimerRef.value = (void 0).setTimeout(() => {
					menuContext.onOpenChange(true);
					clearOpenTimer();
				}, 100);
			}
		}
		async function handlePointerLeave(event) {
			if (!isMouseEvent(event)) return;
			clearOpenTimer();
			const contentRect = menuContext.content.value?.getBoundingClientRect();
			if (contentRect?.width) {
				const side = menuContext.content.value?.dataset.side;
				const rightSide = side === "right";
				const bleed = rightSide ? -5 : 5;
				const contentNearEdge = contentRect[rightSide ? "left" : "right"];
				const contentFarEdge = contentRect[rightSide ? "right" : "left"];
				contentContext.onPointerGraceIntentChange({
					area: [
						{
							x: event.clientX + bleed,
							y: event.clientY
						},
						{
							x: contentNearEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.bottom
						},
						{
							x: contentNearEdge,
							y: contentRect.bottom
						}
					],
					side
				});
				(void 0).clearTimeout(contentContext.pointerGraceTimerRef.value);
				contentContext.pointerGraceTimerRef.value = (void 0).setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
			} else {
				if (contentContext.onTriggerLeave(event)) return;
				contentContext.onPointerGraceIntentChange(null);
			}
		}
		async function handleKeyDown(event) {
			const isTypingAhead = contentContext.searchRef.value !== "";
			if (props.disabled || isTypingAhead && event.key === " ") return;
			if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
				menuContext.onOpenChange(true);
				await nextTick();
				menuContext.content.value?.focus();
				event.preventDefault();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuAnchor_default, { "as-child": "" }, {
				default: withCtx(() => [createVNode(MenuItemImpl_default, mergeProps(props, {
					id: unref(subContext).triggerId,
					ref: (vnode) => {
						if (!vnode) return void 0;
						unref(subContext)?.onTriggerChange(vnode?.$el);
					},
					"aria-haspopup": "menu",
					"aria-expanded": unref(menuContext).open.value,
					"aria-controls": unref(subContext).contentId,
					"data-state": unref(getOpenState)(unref(menuContext).open.value),
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (props.disabled || event.defaultPrevented) return;
						/**
						* We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
						* and we rely heavily on `onFocusOutside` for submenus to close when switching
						* between separate submenus.
						*/
						event.currentTarget?.focus();
						if (!unref(menuContext).open.value) unref(menuContext).onOpenChange(true);
					}),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-expanded",
					"aria-controls",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [injectPopoverRootContext, providePopoverRootContext] = /*#__PURE__*/ createContext("PopoverRoot");
var PopoverRoot_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverRoot",
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
		modal: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { modal } = toRefs(props);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		providePopoverRootContext({
			contentId: "",
			triggerId: "",
			modal,
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerElement: ref(),
			hasCustomAnchor: ref(false)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					open: unref(open),
					close: () => open.value = false
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverAnchor.js
var PopoverAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverAnchor",
	props: {
		reference: {
			type: null,
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
		useForwardExpose();
		injectPopoverRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverArrow.js
var PopoverArrow_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverClose.js
var PopoverClose_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverClose",
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
		const rootContext = injectPopoverRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentImpl.js
var PopoverContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps$1(reactiveOmit(props, "trapFocus", "disableOutsidePointerEvents"));
		const { forwardRef } = useForwardExpose();
		const rootContext = injectPopoverRootContext();
		useFocusGuards();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: _ctx.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
					onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onDismiss: _cache[4] || (_cache[4] = ($event) => unref(rootContext).onOpenChange(false))
				}, {
					default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps(unref(forwarded), {
						id: unref(rootContext).contentId,
						ref: unref(forwardRef),
						"data-state": unref(rootContext).open.value ? "open" : "closed",
						"aria-labelledby": unref(rootContext).triggerId,
						style: {
							"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
							"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
							"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
							"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
							"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
						},
						role: "dialog"
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"aria-labelledby"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentModal.js
var PopoverContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentModal",
	props: {
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const isRightClickOutsideRef = ref(false);
		useBodyScrollLock(true);
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(rootContext).open.value,
				"disable-outside-pointer-events": "",
				onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
					emits("closeAutoFocus", event);
					if (!isRightClickOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
				}, ["prevent"])),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					emits("pointerDownOutside", event);
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					isRightClickOutsideRef.value = isRightClick;
				}),
				onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentNonModal.js
var PopoverContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentNonModal",
	props: {
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const hasInteractedOutsideRef = ref(false);
		const hasPointerDownOutsideRef = ref(false);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					emits("closeAutoFocus", event);
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
					emits("interactOutside", event);
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					if (unref(rootContext).triggerElement.value?.contains(target)) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContent.js
var PopoverContent_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		rootContext.contentId ||= useId$1(void 0, "reka-popover-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(PopoverContentModal_default, mergeProps({ key: 0 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(PopoverContentNonModal_default, mergeProps({ key: 1 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverPortal.js
var PopoverPortal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverTrigger.js
var PopoverTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverTrigger",
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
		const rootContext = injectPopoverRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.triggerId ||= useId$1(void 0, "reka-popover-trigger");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).hasCustomAnchor.value ? unref(Primitive) : unref(PopperAnchor_default)), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-haspopup": "dialog",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).contentId,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					as: _ctx.as,
					"as-child": props.asChild,
					onClick: unref(rootContext).onOpenToggle
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"aria-expanded",
					"aria-controls",
					"data-state",
					"as",
					"as-child",
					"onClick"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuArrow.js
var DropdownMenuArrow_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuCheckboxItem.js
var DropdownMenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuCheckboxItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRoot.js
var [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = /*#__PURE__*/ createContext("DropdownMenuRoot");
var DropdownMenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const { modal, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		provideDropdownMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerId: "",
			triggerElement,
			contentId: "",
			modal,
			dir
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRoot_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
				dir: unref(dir),
				modal: unref(modal)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuContent.js
var DropdownMenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectDropdownMenuRootContext();
		const hasInteractedOutsideRef = ref(false);
		function handleCloseAutoFocus(event) {
			if (event.defaultPrevented) return;
			if (!hasInteractedOutsideRef.value) setTimeout(() => {
				rootContext.triggerElement.value?.focus();
			}, 0);
			hasInteractedOutsideRef.value = false;
			event.preventDefault();
		}
		rootContext.contentId ||= useId$1(void 0, "reka-dropdown-menu-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
				id: unref(rootContext).contentId,
				"aria-labelledby": unref(rootContext)?.triggerId,
				style: {
					"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: handleCloseAutoFocus,
				onInteractOutside: _cache[0] || (_cache[0] = (event) => {
					if (event.defaultPrevented) return;
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (!unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
					if (unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id", "aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuFilter.js
var DropdownMenuFilter_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuFilter",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
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
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const modelValue = useVModel(props, "modelValue", __emit, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		injectMenuSubContext(null);
		watch(modelValue, (v) => {
			contentContext.searchRef.value = v ?? "";
		}, { immediate: true });
		const { primitiveElement} = usePrimitiveElement();
		const disabled = computed(() => props.disabled || false);
		const activedescendant = ref();
		watchSyncEffect(() => activedescendant.value = contentContext.highlightedElement.value?.id);
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing((event) => {
			const el = event.target;
			if (el) {
				modelValue.value = el.value;
				contentContext.searchRef.value = el.value;
			}
		});
		function handleInput(event) {
			if (disabled.value) return;
			if (isComposing.value) return;
			const target = event.target;
			modelValue.value = target.value;
			contentContext.searchRef.value = target.value;
		}
		function handleKeyDown(event) {
			if (disabled.value) return;
			if (isComposing.value) {
				event.stopPropagation();
				return;
			}
			if ([
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(event.key)) {
				event.preventDefault();
				contentContext.onKeydownNavigation(event);
			} else if (event.key === "Enter") {
				event.preventDefault();
				contentContext.onKeydownEnter(event);
			} else if (event.key === "Escape" && modelValue.value) {
				event.stopPropagation();
				modelValue.value = "";
				contentContext.searchRef.value = "";
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: unref(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ? true : void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				role: "searchbox",
				onInput: handleInput,
				onKeydown: handleKeyDown,
				onCompositionstart: unref(handleCompositionStart),
				onCompositionend: unref(handleCompositionEnd)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuGroup.js
var DropdownMenuGroup_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuGroup",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuGroup_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItem.js
var DropdownMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItemIndicator.js
var DropdownMenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItemIndicator",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItemIndicator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuLabel.js
var DropdownMenuLabel_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuLabel",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuLabel_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuPortal.js
var DropdownMenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioGroup.js
var DropdownMenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioGroup",
	props: {
		modelValue: {
			type: null,
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioGroup_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioItem.js
var DropdownMenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioItem_default), normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSeparator.js
var DropdownMenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSeparator",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSeparator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSub.js
var DropdownMenuSub_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSub",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			passive: props.open === void 0,
			defaultValue: props.defaultOpen ?? false
		});
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSub_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubContent.js
var DropdownMenuSubContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSubContent_default), mergeProps(unref(forwarded), { style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubTrigger.js
var DropdownMenuSubTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSubTrigger_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuTrigger.js
var DropdownMenuTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuTrigger",
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
		const rootContext = injectDropdownMenuRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.triggerId ||= useId$1(void 0, "reka-dropdown-menu-trigger");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuAnchor_default), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"as-child": props.asChild,
					as: _ctx.as,
					"aria-haspopup": "menu",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					disabled: _ctx.disabled,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
							unref(rootContext)?.onOpenToggle();
							await nextTick();
							if (unref(rootContext).open.value) event.preventDefault();
						}
					}),
					onKeydown: _cache[1] || (_cache[1] = withKeys((event) => {
						if (_ctx.disabled) return;
						if (["Enter", " "].includes(event.key)) unref(rootContext).onOpenToggle();
						if (event.key === "ArrowDown") unref(rootContext).onOpenChange(true);
						if ([
							"Enter",
							" ",
							"ArrowDown"
						].includes(event.key)) event.preventDefault();
					}, [
						"enter",
						"space",
						"arrow-down"
					]))
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as-child",
					"as",
					"aria-expanded",
					"aria-controls",
					"data-disabled",
					"disabled",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardArrow.js
var HoverCardArrow_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
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
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardRoot.js
var [injectHoverCardRootContext, provideHoverCardRootContext] = /*#__PURE__*/ createContext("HoverCardRoot");
var HoverCardRoot_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardRoot",
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
		openDelay: {
			type: Number,
			required: false,
			default: 700
		},
		closeDelay: {
			type: Number,
			required: false,
			default: 300
		},
		enableTouch: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { openDelay, closeDelay, enableTouch } = toRefs(props);
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const openTimerRef = ref(0);
		const closeTimerRef = ref(0);
		const hasSelectionRef = ref(false);
		const isPointerDownOnContentRef = ref(false);
		const isPointerInTransitRef = ref(false);
		const triggerElement = ref();
		function handleOpen() {
			clearTimeout(closeTimerRef.value);
			openTimerRef.value = (void 0).setTimeout(() => open.value = true, openDelay.value);
		}
		function handleClose() {
			clearTimeout(openTimerRef.value);
			if (!hasSelectionRef.value && !isPointerDownOnContentRef.value) closeTimerRef.value = (void 0).setTimeout(() => open.value = false, closeDelay.value);
		}
		function handleDismiss() {
			clearTimeout(openTimerRef.value);
			open.value = false;
		}
		provideHoverCardRootContext({
			open,
			onOpenChange(value) {
				open.value = value;
			},
			onOpen: handleOpen,
			onClose: handleClose,
			onDismiss: handleDismiss,
			hasSelectionRef,
			isPointerDownOnContentRef,
			isPointerInTransitRef,
			triggerElement,
			enableTouch
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/utils.js
function excludeTouch(eventHandler) {
	return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardContentImpl.js
var HoverCardContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardContentImpl",
	props: {
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
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
		const forwarded = useForwardProps$1(props);
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		const { isPointerInTransit, onPointerExit } = useGraceArea(rootContext.triggerElement, contentElement);
		syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: "rtl" });
		onPointerExit(() => {
			rootContext.onClose();
		});
		const containSelection = ref(false);
		let originalBodyUserSelect;
		watchEffect((cleanupFn) => {
			if (containSelection.value) {
				const body = (void 0).body;
				originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
				body.style.userSelect = "none";
				body.style.webkitUserSelect = "none";
				cleanupFn(() => {
					body.style.userSelect = originalBodyUserSelect;
					body.style.webkitUserSelect = originalBodyUserSelect;
				});
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DismissableLayer_default), {
				"as-child": "",
				"disable-outside-pointer-events": false,
				onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
				onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
				onFocusOutside: _cache[3] || (_cache[3] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"])),
				onDismiss: unref(rootContext).onDismiss
			}, {
				default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, {
					ref: unref(forwardRef),
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					style: {
						"userSelect": containSelection.value ? "text" : void 0,
						"WebkitUserSelect": containSelection.value ? "text" : void 0,
						"--reka-hover-card-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-hover-card-content-available-width": "var(--reka-popper-available-width)",
						"--reka-hover-card-content-available-height": "var(--reka-popper-available-height)",
						"--reka-hover-card-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-hover-card-trigger-height": "var(--reka-popper-anchor-height)"
					},
					onPointerdown: _cache[0] || (_cache[0] = (event) => {
						if (event.currentTarget.contains(event.target)) containSelection.value = true;
						unref(rootContext).hasSelectionRef.value = false;
						unref(rootContext).isPointerDownOnContentRef.value = true;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["data-state", "style"])]),
				_: 3
			}, 8, ["onDismiss"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardContent.js
var HoverCardContent_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
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
		const forwarded = useForwardPropsEmits(__props, __emit);
		const { forwardRef } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [createVNode(HoverCardContentImpl_default, mergeProps(unref(forwarded), {
					ref: unref(forwardRef),
					onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(excludeTouch)(unref(rootContext).onOpen)($event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardPortal.js
var HoverCardPortal_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardTrigger.js
var HoverCardTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardTrigger",
	props: {
		reference: {
			type: null,
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
	setup(__props) {
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		rootContext.triggerElement = currentElement;
		function handleLeave() {
			setTimeout(() => {
				if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) rootContext.onClose();
			}, 0);
		}
		function handleTouch(event) {
			if (!rootContext.enableTouch.value || event.pointerType !== "touch") return;
			if (rootContext.open.value) rootContext.onDismiss();
			else rootContext.onOpenChange(true);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					"data-grace-area-trigger": "",
					onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(excludeTouch)(unref(rootContext).onOpen)($event)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => unref(excludeTouch)(handleLeave)($event)),
					onPointerup: handleTouch,
					onFocus: _cache[2] || (_cache[2] = ($event) => unref(rootContext).onOpen()),
					onBlur: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onClose())
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"data-state"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/namespaced/index.mjs
var DropdownMenu = {
	Root: DropdownMenuRoot_default,
	Trigger: DropdownMenuTrigger_default,
	Portal: DropdownMenuPortal_default,
	Content: DropdownMenuContent_default,
	Arrow: DropdownMenuArrow_default,
	Item: DropdownMenuItem_default,
	Group: DropdownMenuGroup_default,
	Separator: DropdownMenuSeparator_default,
	CheckboxItem: DropdownMenuCheckboxItem_default,
	ItemIndicator: DropdownMenuItemIndicator_default,
	Label: DropdownMenuLabel_default,
	RadioGroup: DropdownMenuRadioGroup_default,
	RadioItem: DropdownMenuRadioItem_default,
	Sub: DropdownMenuSub_default,
	SubContent: DropdownMenuSubContent_default,
	SubTrigger: DropdownMenuSubTrigger_default,
	Filter: DropdownMenuFilter_default
};
var HoverCard = {
	Root: HoverCardRoot_default,
	Trigger: HoverCardTrigger_default,
	Portal: HoverCardPortal_default,
	Content: HoverCardContent_default,
	Arrow: HoverCardArrow_default
};
var Popover = {
	Root: PopoverRoot_default,
	Trigger: PopoverTrigger_default,
	Portal: PopoverPortal_default,
	Content: PopoverContent_default,
	Arrow: PopoverArrow_default,
	Close: PopoverClose_default,
	Anchor: PopoverAnchor_default
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/composables/useFilter.js
function useFilter() {
	const { contains, startsWith } = useFilter$1({ sensitivity: "base" });
	function score(value, searchTerm) {
		if (!contains(value, searchTerm)) return null;
		if (contains(searchTerm, value)) return 0;
		if (startsWith(value, searchTerm)) return 1;
		return 2;
	}
	function scoreItem(item, searchTerm, fields) {
		if (typeof item !== "object" || item === null) return score(String(item), searchTerm);
		let bestScore = null;
		for (const field of fields) {
			const value = get(item, field);
			if (value == null) continue;
			const values = Array.isArray(value) ? value.map(String) : [String(value)];
			for (const v of values) {
				const s = score(v, searchTerm);
				if (s !== null && (bestScore === null || s < bestScore)) bestScore = s;
				if (bestScore === 0) return 0;
			}
		}
		return bestScore;
	}
	function filter(items, searchTerm, fields) {
		if (!searchTerm) return items;
		const scored = [];
		for (const item of items) {
			const s = scoreItem(item, searchTerm, fields);
			if (s !== null) scored.push({
				item,
				score: s
			});
		}
		scored.sort((a, b) => a.score - b.score);
		return scored.map(({ item }) => item);
	}
	function filterGroups(groups, searchTerm, options) {
		if (!searchTerm) return groups;
		return groups.map((group) => {
			const result = [];
			for (const item of group) {
				if (item === void 0 || item === null) continue;
				if (options.isStructural?.(item)) {
					result.push({
						item,
						score: -1
					});
					continue;
				}
				const s = scoreItem(item, searchTerm, options.fields);
				if (s !== null) result.push({
					item,
					score: s
				});
			}
			result.sort((a, b) => a.score - b.score);
			return result.map(({ item }) => item);
		}).filter((group) => group.some((item) => !options.isStructural?.(item)));
	}
	return {
		score,
		scoreItem,
		filter,
		filterGroups
	};
}
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue
var _sfc_main$1 = {
	__name: "UDropdownMenuContent",
	__ssrInlineRender: true,
	props: {
		items: {
			type: null,
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		sub: {
			type: Boolean,
			required: false
		},
		labelKey: {
			type: null,
			required: true
		},
		descriptionKey: {
			type: null,
			required: true
		},
		checkedIcon: {
			type: null,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		size: {
			type: null,
			required: false
		},
		filter: {
			type: [Boolean, Object],
			required: false
		},
		filterFields: {
			type: Array,
			required: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false
		},
		searchTerm: {
			type: String,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: true
		},
		uiOverride: {
			type: null,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		}
	},
	emits: [
		"update:searchTerm",
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const { t, dir } = useLocale();
		const appConfig = useAppConfig();
		const { filterGroups } = useFilter();
		const _searchTerm = ref("");
		const searchTerm = computed({
			get: () => props.searchTerm ?? _searchTerm.value,
			set: (value) => {
				_searchTerm.value = value;
				emits("update:searchTerm", value);
			}
		});
		const inputProps = toRef(() => defu(props.filter, {
			placeholder: t("dropdownMenu.search"),
			variant: "none"
		}));
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "size", "filter", "filterFields", "ignoreFilter", "searchTerm", "class", "ui", "uiOverride"), emits);
		const getProxySlots = () => omit(slots, ["default"]);
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
		const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
		const groups = computed(() => {
			if (!props.items?.length) return [];
			return isArrayOfArray(props.items) ? props.items : [props.items];
		});
		const isStructuralItem = (item) => !!item.type && ["label", "separator"].includes(item.type);
		const filteredGroups = computed(() => {
			if (!props.filter || props.ignoreFilter || !searchTerm.value) return groups.value;
			const fields = Array.isArray(props.filterFields) && props.filterFields.length ? props.filterFields : [props.labelKey];
			return filterGroups(groups.value, searchTerm.value, {
				fields,
				isStructural: isStructuralItem
			});
		});
		const hasFilteredItems = computed(() => filteredGroups.value.some((group) => group.some((item) => !isStructuralItem(item))));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineItemTemplate), null, {
				default: withCtx(({ item, active, index }, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						ui: __props.ui
					}, () => {
						ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => {
							if (item.loading) _push(ssrRenderComponent(_sfc_main$2, {
								name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
								"data-slot": "itemLeadingIcon",
								class: __props.ui.itemLeadingIcon({
									class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
									color: item?.color,
									loading: true
								})
							}, null, _parent, _scopeId));
							else if (item.icon) _push(ssrRenderComponent(_sfc_main$2, {
								name: item.icon,
								"data-slot": "itemLeadingIcon",
								class: __props.ui.itemLeadingIcon({
									class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else if (item.avatar) _push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize() }, item.avatar, {
								"data-slot": "itemLeadingAvatar",
								class: __props.ui.itemLeadingAvatar({
									class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
									active
								})
							}), null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
							_push(`<span data-slot="itemWrapper" class="${ssrRenderClass(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${ssrRenderClass(__props.ui.itemLabel({
								class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel],
								active
							}))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
								item,
								active,
								index
							}, () => {
								_push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
							}, _push, _parent, _scopeId);
							if (item.target === "_blank" && __props.externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2, {
								name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
								"data-slot": "itemLabelExternalIcon",
								class: __props.ui.itemLabelExternalIcon({
									class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span>`);
							if (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
								_push(`<span data-slot="itemDescription" class="${ssrRenderClass(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
									item,
									active,
									index
								}, () => {
									_push(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(`</span>`);
						} else _push(`<!---->`);
						_push(`<span data-slot="itemTrailing" class="${ssrRenderClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => {
							if (item.children?.length) _push(ssrRenderComponent(_sfc_main$2, {
								name: childrenIcon.value,
								"data-slot": "itemTrailingIcon",
								class: __props.ui.itemTrailingIcon({
									class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else if (item.kbds?.length) {
								_push(`<span data-slot="itemTrailingKbds" class="${ssrRenderClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
								ssrRenderList(item.kbds, (kbd, kbdIndex) => {
									_push(ssrRenderComponent(_sfc_main$3, mergeProps({
										key: kbdIndex,
										size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
									}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
								});
								_push(`<!--]--></span>`);
							} else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push(ssrRenderComponent(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_sfc_main$2, {
									name: __props.checkedIcon || unref(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: __props.ui.itemTrailingIcon({
										class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
										color: item?.color
									})
								}, null, _parent, _scopeId));
								else return [createVNode(_sfc_main$2, {
									name: __props.checkedIcon || unref(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: __props.ui.itemTrailingIcon({
										class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
										color: item?.color
									})
								}, null, 8, ["name", "class"])];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(`</span>`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						ui: __props.ui
					}, () => [
						renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => [item.loading ? (openBlock(), createBlock(_sfc_main$2, {
							key: 0,
							name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
							"data-slot": "itemLeadingIcon",
							class: __props.ui.itemLeadingIcon({
								class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
								color: item?.color,
								loading: true
							})
						}, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2, {
							key: 1,
							name: item.icon,
							"data-slot": "itemLeadingIcon",
							class: __props.ui.itemLeadingIcon({
								class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
							key: 2,
							size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
						}, item.avatar, {
							"data-slot": "itemLeadingAvatar",
							class: __props.ui.itemLeadingAvatar({
								class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
								active
							})
						}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
						unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "itemWrapper",
							class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
						}, [createVNode("span", {
							"data-slot": "itemLabel",
							class: __props.ui.itemLabel({
								class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel],
								active
							})
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
							item,
							active,
							index
						}, () => [createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)]), item.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2, {
							key: 0,
							name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
							"data-slot": "itemLabelExternalIcon",
							class: __props.ui.itemLabelExternalIcon({
								class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "itemDescription",
							class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
							item,
							active,
							index
						}, () => [createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
						createVNode("span", {
							"data-slot": "itemTrailing",
							class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => [item.children?.length ? (openBlock(), createBlock(_sfc_main$2, {
							key: 0,
							name: childrenIcon.value,
							"data-slot": "itemTrailingIcon",
							class: __props.ui.itemTrailingIcon({
								class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
							key: 1,
							"data-slot": "itemTrailingKbds",
							class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
						}, [(openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
							return openBlock(), createBlock(_sfc_main$3, mergeProps({
								key: kbdIndex,
								size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
							}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
						}), 128))], 2)) : createCommentVNode("", true)]), createVNode(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
							default: withCtx(() => [createVNode(_sfc_main$2, {
								name: __props.checkedIcon || unref(appConfig).ui.icons.check,
								"data-slot": "itemTrailingIcon",
								class: __props.ui.itemTrailingIcon({
									class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
									color: item?.color
								})
							}, null, 8, ["name", "class"])]),
							_: 2
						}, 1024)], 2)
					])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DropdownMenu).Portal, unref(portalProps), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
								"data-slot": "content",
								class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
							}, unref(contentProps)), {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										if (!!__props.filter) _push(ssrRenderComponent(unref(DropdownMenu).Filter, {
											modelValue: searchTerm.value,
											"onUpdate:modelValue": ($event) => searchTerm.value = $event,
											"as-child": ""
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_sfc_main$4, mergeProps({
													autofocus: "",
													autocomplete: "off",
													size: __props.size
												}, inputProps.value, {
													"data-slot": "input",
													class: __props.ui.input({ class: __props.uiOverride?.input }),
													onChange: () => {}
												}), null, _parent, _scopeId));
												else return [createVNode(_sfc_main$4, mergeProps({
													autofocus: "",
													autocomplete: "off",
													size: __props.size
												}, inputProps.value, {
													"data-slot": "input",
													class: __props.ui.input({ class: __props.uiOverride?.input }),
													onChange: withModifiers(() => {}, ["stop"])
												}), null, 16, [
													"size",
													"class",
													"onChange"
												])];
											}),
											_: 1
										}, _parent, _scopeId));
										else _push(`<!---->`);
										ssrRenderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }, null, _push, _parent, _scopeId);
										if (!searchTerm.value || hasFilteredItems.value) {
											_push(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(__props.ui.viewport({ class: __props.uiOverride?.viewport }))}"${_scopeId}><!--[-->`);
											ssrRenderList(filteredGroups.value, (group, groupIndex) => {
												_push(ssrRenderComponent(unref(DropdownMenu).Group, {
													key: `group-${groupIndex}`,
													"data-slot": "group",
													class: __props.ui.group({ class: __props.uiOverride?.group })
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<!--[-->`);
															ssrRenderList(group, (item, index) => {
																_push(`<!--[-->`);
																if (item.type === "label") _push(ssrRenderComponent(unref(DropdownMenu).Label, {
																	"data-slot": "label",
																	class: __props.ui.label({ class: [
																		__props.uiOverride?.label,
																		item.ui?.label,
																		item.class
																	] })
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																			item,
																			index
																		}, null, _parent, _scopeId));
																		else return [createVNode(unref(ReuseItemTemplate), {
																			item,
																			index
																		}, null, 8, ["item", "index"])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else if (item.type === "separator") _push(ssrRenderComponent(unref(DropdownMenu).Separator, {
																	"data-slot": "separator",
																	class: __props.ui.separator({ class: [
																		__props.uiOverride?.separator,
																		item.ui?.separator,
																		item.class
																	] })
																}, null, _parent, _scopeId));
																else if (item?.children?.length) _push(ssrRenderComponent(unref(DropdownMenu).Sub, {
																	open: item.open,
																	"default-open": item.defaultOpen
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) {
																			_push(ssrRenderComponent(unref(DropdownMenu).SubTrigger, {
																				as: "button",
																				type: "button",
																				disabled: item.disabled,
																				"text-value": unref(get)(item, props.labelKey),
																				"data-slot": "item",
																				class: __props.ui.item({
																					class: [
																						__props.uiOverride?.item,
																						item.ui?.item,
																						item.class
																					],
																					color: item?.color
																				})
																			}, {
																				default: withCtx((_, _push, _parent, _scopeId) => {
																					if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																						item,
																						index
																					}, null, _parent, _scopeId));
																					else return [createVNode(unref(ReuseItemTemplate), {
																						item,
																						index
																					}, null, 8, ["item", "index"])];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			_push(ssrRenderComponent(_sfc_main$1, mergeProps({
																				sub: "",
																				class: item.ui?.content,
																				ui: __props.ui,
																				"ui-override": __props.uiOverride,
																				portal: __props.portal,
																				items: item.children,
																				align: "start",
																				"align-offset": -4,
																				"side-offset": 3,
																				"label-key": __props.labelKey,
																				"description-key": __props.descriptionKey,
																				"checked-icon": __props.checkedIcon,
																				"loading-icon": __props.loadingIcon,
																				"external-icon": __props.externalIcon,
																				size: __props.size,
																				filter: item.filter,
																				"filter-fields": item.filterFields || __props.filterFields,
																				"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
																			}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
																				return {
																					name,
																					fn: withCtx((slotData, _push, _parent, _scopeId) => {
																						if (_push) ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push, _parent, _scopeId);
																						else return [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))];
																					})
																				};
																			})]), _parent, _scopeId));
																		} else return [createVNode(unref(DropdownMenu).SubTrigger, {
																			as: "button",
																			type: "button",
																			disabled: item.disabled,
																			"text-value": unref(get)(item, props.labelKey),
																			"data-slot": "item",
																			class: __props.ui.item({
																				class: [
																					__props.uiOverride?.item,
																					item.ui?.item,
																					item.class
																				],
																				color: item?.color
																			})
																		}, {
																			default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																				item,
																				index
																			}, null, 8, ["item", "index"])]),
																			_: 2
																		}, 1032, [
																			"disabled",
																			"text-value",
																			"class"
																		]), createVNode(_sfc_main$1, mergeProps({
																			sub: "",
																			class: item.ui?.content,
																			ui: __props.ui,
																			"ui-override": __props.uiOverride,
																			portal: __props.portal,
																			items: item.children,
																			align: "start",
																			"align-offset": -4,
																			"side-offset": 3,
																			"label-key": __props.labelKey,
																			"description-key": __props.descriptionKey,
																			"checked-icon": __props.checkedIcon,
																			"loading-icon": __props.loadingIcon,
																			"external-icon": __props.externalIcon,
																			size: __props.size,
																			filter: item.filter,
																			"filter-fields": item.filterFields || __props.filterFields,
																			"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
																		}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
																			return {
																				name,
																				fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
																			};
																		})]), 1040, [
																			"class",
																			"ui",
																			"ui-override",
																			"portal",
																			"items",
																			"label-key",
																			"description-key",
																			"checked-icon",
																			"loading-icon",
																			"external-icon",
																			"size",
																			"filter",
																			"filter-fields",
																			"ignore-filter"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else if (item.type === "checkbox") _push(ssrRenderComponent(unref(DropdownMenu).CheckboxItem, {
																	"model-value": item.checked,
																	disabled: item.disabled,
																	"text-value": unref(get)(item, props.labelKey),
																	"data-slot": "item",
																	class: __props.ui.item({
																		class: [
																			__props.uiOverride?.item,
																			item.ui?.item,
																			item.class
																		],
																		color: item?.color
																	}),
																	"onUpdate:modelValue": item.onUpdateChecked,
																	onSelect: item.onSelect
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																			item,
																			index
																		}, null, _parent, _scopeId));
																		else return [createVNode(unref(ReuseItemTemplate), {
																			item,
																			index
																		}, null, 8, ["item", "index"])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else _push(ssrRenderComponent(_sfc_main$5, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
																	default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(unref(DropdownMenu).Item, {
																			"as-child": "",
																			disabled: item.disabled,
																			"text-value": unref(get)(item, props.labelKey),
																			onSelect: item.onSelect
																		}, {
																			default: withCtx((_, _push, _parent, _scopeId) => {
																				if (_push) _push(ssrRenderComponent(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
																					"data-slot": "item",
																					class: __props.ui.item({
																						class: [
																							__props.uiOverride?.item,
																							item.ui?.item,
																							item.class
																						],
																						color: item?.color,
																						active
																					})
																				}), {
																					default: withCtx((_, _push, _parent, _scopeId) => {
																						if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																							item,
																							active,
																							index
																						}, null, _parent, _scopeId));
																						else return [createVNode(unref(ReuseItemTemplate), {
																							item,
																							active,
																							index
																						}, null, 8, [
																							"item",
																							"active",
																							"index"
																						])];
																					}),
																					_: 2
																				}, _parent, _scopeId));
																				else return [createVNode(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
																					"data-slot": "item",
																					class: __props.ui.item({
																						class: [
																							__props.uiOverride?.item,
																							item.ui?.item,
																							item.class
																						],
																						color: item?.color,
																						active
																					})
																				}), {
																					default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																						item,
																						active,
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
																		else return [createVNode(unref(DropdownMenu).Item, {
																			"as-child": "",
																			disabled: item.disabled,
																			"text-value": unref(get)(item, props.labelKey),
																			onSelect: item.onSelect
																		}, {
																			default: withCtx(() => [createVNode(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
																				"data-slot": "item",
																				class: __props.ui.item({
																					class: [
																						__props.uiOverride?.item,
																						item.ui?.item,
																						item.class
																					],
																					color: item?.color,
																					active
																				})
																			}), {
																				default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																					item,
																					active,
																					index
																				}, null, 8, [
																					"item",
																					"active",
																					"index"
																				])]),
																				_: 2
																			}, 1040, ["class"])]),
																			_: 2
																		}, 1032, [
																			"disabled",
																			"text-value",
																			"onSelect"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`<!--]-->`);
															});
															_push(`<!--]-->`);
														} else return [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
															return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
																key: 0,
																"data-slot": "label",
																class: __props.ui.label({ class: [
																	__props.uiOverride?.label,
																	item.ui?.label,
																	item.class
																] })
															}, {
																default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																	item,
																	index
																}, null, 8, ["item", "index"])]),
																_: 2
															}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
																key: 1,
																"data-slot": "separator",
																class: __props.ui.separator({ class: [
																	__props.uiOverride?.separator,
																	item.ui?.separator,
																	item.class
																] })
															}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
																key: 2,
																open: item.open,
																"default-open": item.defaultOpen
															}, {
																default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
																	as: "button",
																	type: "button",
																	disabled: item.disabled,
																	"text-value": unref(get)(item, props.labelKey),
																	"data-slot": "item",
																	class: __props.ui.item({
																		class: [
																			__props.uiOverride?.item,
																			item.ui?.item,
																			item.class
																		],
																		color: item?.color
																	})
																}, {
																	default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																		item,
																		index
																	}, null, 8, ["item", "index"])]),
																	_: 2
																}, 1032, [
																	"disabled",
																	"text-value",
																	"class"
																]), createVNode(_sfc_main$1, mergeProps({
																	sub: "",
																	class: item.ui?.content,
																	ui: __props.ui,
																	"ui-override": __props.uiOverride,
																	portal: __props.portal,
																	items: item.children,
																	align: "start",
																	"align-offset": -4,
																	"side-offset": 3,
																	"label-key": __props.labelKey,
																	"description-key": __props.descriptionKey,
																	"checked-icon": __props.checkedIcon,
																	"loading-icon": __props.loadingIcon,
																	"external-icon": __props.externalIcon,
																	size: __props.size,
																	filter: item.filter,
																	"filter-fields": item.filterFields || __props.filterFields,
																	"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
																}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
																	return {
																		name,
																		fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
																	};
																})]), 1040, [
																	"class",
																	"ui",
																	"ui-override",
																	"portal",
																	"items",
																	"label-key",
																	"description-key",
																	"checked-icon",
																	"loading-icon",
																	"external-icon",
																	"size",
																	"filter",
																	"filter-fields",
																	"ignore-filter"
																])]),
																_: 2
															}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
																key: 3,
																"model-value": item.checked,
																disabled: item.disabled,
																"text-value": unref(get)(item, props.labelKey),
																"data-slot": "item",
																class: __props.ui.item({
																	class: [
																		__props.uiOverride?.item,
																		item.ui?.item,
																		item.class
																	],
																	color: item?.color
																}),
																"onUpdate:modelValue": item.onUpdateChecked,
																onSelect: item.onSelect
															}, {
																default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																	item,
																	index
																}, null, 8, ["item", "index"])]),
																_: 2
															}, 1032, [
																"model-value",
																"disabled",
																"text-value",
																"class",
																"onUpdate:modelValue",
																"onSelect"
															])) : (openBlock(), createBlock(_sfc_main$5, mergeProps({
																key: 4,
																ref_for: true
															}, unref(pickLinkProps)(item), { custom: "" }), {
																default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
																	"as-child": "",
																	disabled: item.disabled,
																	"text-value": unref(get)(item, props.labelKey),
																	onSelect: item.onSelect
																}, {
																	default: withCtx(() => [createVNode(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
																		"data-slot": "item",
																		class: __props.ui.item({
																			class: [
																				__props.uiOverride?.item,
																				item.ui?.item,
																				item.class
																			],
																			color: item?.color,
																			active
																		})
																	}), {
																		default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																			item,
																			active,
																			index
																		}, null, 8, [
																			"item",
																			"active",
																			"index"
																		])]),
																		_: 2
																	}, 1040, ["class"])]),
																	_: 2
																}, 1032, [
																	"disabled",
																	"text-value",
																	"onSelect"
																])]),
																_: 2
															}, 1040))], 64);
														}), 128))];
													}),
													_: 2
												}, _parent, _scopeId));
											});
											_push(`<!--]--></div>`);
										} else _push(`<!---->`);
										if (searchTerm.value && !hasFilteredItems.value) {
											_push(`<div data-slot="empty" class="${ssrRenderClass(__props.ui.empty({ class: __props.uiOverride?.empty }))}"${_scopeId}>`);
											ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
												_push(`${ssrInterpolate(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value }))}`);
											}, _push, _parent, _scopeId);
											_push(`</div>`);
										} else _push(`<!---->`);
										ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
										ssrRenderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false }, null, _push, _parent, _scopeId);
									} else return [
										!!__props.filter ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
											key: 0,
											modelValue: searchTerm.value,
											"onUpdate:modelValue": ($event) => searchTerm.value = $event,
											"as-child": ""
										}, {
											default: withCtx(() => [createVNode(_sfc_main$4, mergeProps({
												autofocus: "",
												autocomplete: "off",
												size: __props.size
											}, inputProps.value, {
												"data-slot": "input",
												class: __props.ui.input({ class: __props.uiOverride?.input }),
												onChange: withModifiers(() => {}, ["stop"])
											}), null, 16, [
												"size",
												"class",
												"onChange"
											])]),
											_: 1
										}, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
										renderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
										!searchTerm.value || hasFilteredItems.value ? (openBlock(), createBlock("div", {
											key: 1,
											role: "presentation",
											"data-slot": "viewport",
											class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
										}, [(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
											return openBlock(), createBlock(unref(DropdownMenu).Group, {
												key: `group-${groupIndex}`,
												"data-slot": "group",
												class: __props.ui.group({ class: __props.uiOverride?.group })
											}, {
												default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
													return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
														key: 0,
														"data-slot": "label",
														class: __props.ui.label({ class: [
															__props.uiOverride?.label,
															item.ui?.label,
															item.class
														] })
													}, {
														default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
														key: 1,
														"data-slot": "separator",
														class: __props.ui.separator({ class: [
															__props.uiOverride?.separator,
															item.ui?.separator,
															item.class
														] })
													}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
														key: 2,
														open: item.open,
														"default-open": item.defaultOpen
													}, {
														default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
															as: "button",
															type: "button",
															disabled: item.disabled,
															"text-value": unref(get)(item, props.labelKey),
															"data-slot": "item",
															class: __props.ui.item({
																class: [
																	__props.uiOverride?.item,
																	item.ui?.item,
																	item.class
																],
																color: item?.color
															})
														}, {
															default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																item,
																index
															}, null, 8, ["item", "index"])]),
															_: 2
														}, 1032, [
															"disabled",
															"text-value",
															"class"
														]), createVNode(_sfc_main$1, mergeProps({
															sub: "",
															class: item.ui?.content,
															ui: __props.ui,
															"ui-override": __props.uiOverride,
															portal: __props.portal,
															items: item.children,
															align: "start",
															"align-offset": -4,
															"side-offset": 3,
															"label-key": __props.labelKey,
															"description-key": __props.descriptionKey,
															"checked-icon": __props.checkedIcon,
															"loading-icon": __props.loadingIcon,
															"external-icon": __props.externalIcon,
															size: __props.size,
															filter: item.filter,
															"filter-fields": item.filterFields || __props.filterFields,
															"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
														}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
															return {
																name,
																fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
															};
														})]), 1040, [
															"class",
															"ui",
															"ui-override",
															"portal",
															"items",
															"label-key",
															"description-key",
															"checked-icon",
															"loading-icon",
															"external-icon",
															"size",
															"filter",
															"filter-fields",
															"ignore-filter"
														])]),
														_: 2
													}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
														key: 3,
														"model-value": item.checked,
														disabled: item.disabled,
														"text-value": unref(get)(item, props.labelKey),
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color
														}),
														"onUpdate:modelValue": item.onUpdateChecked,
														onSelect: item.onSelect
													}, {
														default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, [
														"model-value",
														"disabled",
														"text-value",
														"class",
														"onUpdate:modelValue",
														"onSelect"
													])) : (openBlock(), createBlock(_sfc_main$5, mergeProps({
														key: 4,
														ref_for: true
													}, unref(pickLinkProps)(item), { custom: "" }), {
														default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
															"as-child": "",
															disabled: item.disabled,
															"text-value": unref(get)(item, props.labelKey),
															onSelect: item.onSelect
														}, {
															default: withCtx(() => [createVNode(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
																"data-slot": "item",
																class: __props.ui.item({
																	class: [
																		__props.uiOverride?.item,
																		item.ui?.item,
																		item.class
																	],
																	color: item?.color,
																	active
																})
															}), {
																default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																	item,
																	active,
																	index
																}, null, 8, [
																	"item",
																	"active",
																	"index"
																])]),
																_: 2
															}, 1040, ["class"])]),
															_: 2
														}, 1032, [
															"disabled",
															"text-value",
															"onSelect"
														])]),
														_: 2
													}, 1040))], 64);
												}), 128))]),
												_: 2
											}, 1032, ["class"]);
										}), 128))], 2)) : createCommentVNode("", true),
										searchTerm.value && !hasFilteredItems.value ? (openBlock(), createBlock("div", {
											key: 2,
											"data-slot": "empty",
											class: __props.ui.empty({ class: __props.uiOverride?.empty })
										}, [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)])], 2)) : createCommentVNode("", true),
										renderSlot(_ctx.$slots, "default"),
										renderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
									];
								}),
								_: 3
							}), _parent, _scopeId);
							else return [(openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
								"data-slot": "content",
								class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
							}, unref(contentProps)), {
								default: withCtx(() => [
									!!__props.filter ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
										key: 0,
										modelValue: searchTerm.value,
										"onUpdate:modelValue": ($event) => searchTerm.value = $event,
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode(_sfc_main$4, mergeProps({
											autofocus: "",
											autocomplete: "off",
											size: __props.size
										}, inputProps.value, {
											"data-slot": "input",
											class: __props.ui.input({ class: __props.uiOverride?.input }),
											onChange: withModifiers(() => {}, ["stop"])
										}), null, 16, [
											"size",
											"class",
											"onChange"
										])]),
										_: 1
									}, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
									renderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
									!searchTerm.value || hasFilteredItems.value ? (openBlock(), createBlock("div", {
										key: 1,
										role: "presentation",
										"data-slot": "viewport",
										class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
									}, [(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
										return openBlock(), createBlock(unref(DropdownMenu).Group, {
											key: `group-${groupIndex}`,
											"data-slot": "group",
											class: __props.ui.group({ class: __props.uiOverride?.group })
										}, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
												return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
													key: 0,
													"data-slot": "label",
													class: __props.ui.label({ class: [
														__props.uiOverride?.label,
														item.ui?.label,
														item.class
													] })
												}, {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
													key: 1,
													"data-slot": "separator",
													class: __props.ui.separator({ class: [
														__props.uiOverride?.separator,
														item.ui?.separator,
														item.class
													] })
												}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
													key: 2,
													open: item.open,
													"default-open": item.defaultOpen
												}, {
													default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
														as: "button",
														type: "button",
														disabled: item.disabled,
														"text-value": unref(get)(item, props.labelKey),
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color
														})
													}, {
														default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, [
														"disabled",
														"text-value",
														"class"
													]), createVNode(_sfc_main$1, mergeProps({
														sub: "",
														class: item.ui?.content,
														ui: __props.ui,
														"ui-override": __props.uiOverride,
														portal: __props.portal,
														items: item.children,
														align: "start",
														"align-offset": -4,
														"side-offset": 3,
														"label-key": __props.labelKey,
														"description-key": __props.descriptionKey,
														"checked-icon": __props.checkedIcon,
														"loading-icon": __props.loadingIcon,
														"external-icon": __props.externalIcon,
														size: __props.size,
														filter: item.filter,
														"filter-fields": item.filterFields || __props.filterFields,
														"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
													}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
														return {
															name,
															fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
														};
													})]), 1040, [
														"class",
														"ui",
														"ui-override",
														"portal",
														"items",
														"label-key",
														"description-key",
														"checked-icon",
														"loading-icon",
														"external-icon",
														"size",
														"filter",
														"filter-fields",
														"ignore-filter"
													])]),
													_: 2
												}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
													key: 3,
													"model-value": item.checked,
													disabled: item.disabled,
													"text-value": unref(get)(item, props.labelKey),
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color
													}),
													"onUpdate:modelValue": item.onUpdateChecked,
													onSelect: item.onSelect
												}, {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, [
													"model-value",
													"disabled",
													"text-value",
													"class",
													"onUpdate:modelValue",
													"onSelect"
												])) : (openBlock(), createBlock(_sfc_main$5, mergeProps({
													key: 4,
													ref_for: true
												}, unref(pickLinkProps)(item), { custom: "" }), {
													default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
														"as-child": "",
														disabled: item.disabled,
														"text-value": unref(get)(item, props.labelKey),
														onSelect: item.onSelect
													}, {
														default: withCtx(() => [createVNode(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
															"data-slot": "item",
															class: __props.ui.item({
																class: [
																	__props.uiOverride?.item,
																	item.ui?.item,
																	item.class
																],
																color: item?.color,
																active
															})
														}), {
															default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																item,
																active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1032, [
														"disabled",
														"text-value",
														"onSelect"
													])]),
													_: 2
												}, 1040))], 64);
											}), 128))]),
											_: 2
										}, 1032, ["class"]);
									}), 128))], 2)) : createCommentVNode("", true),
									searchTerm.value && !hasFilteredItems.value ? (openBlock(), createBlock("div", {
										key: 2,
										"data-slot": "empty",
										class: __props.ui.empty({ class: __props.uiOverride?.empty })
									}, [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)])], 2)) : createCommentVNode("", true),
									renderSlot(_ctx.$slots, "default"),
									renderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
								]),
								_: 3
							}, 16, ["class"]))];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(FieldGroupReset), null, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
							"data-slot": "content",
							class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
						}, unref(contentProps)), {
							default: withCtx(() => [
								!!__props.filter ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
									key: 0,
									modelValue: searchTerm.value,
									"onUpdate:modelValue": ($event) => searchTerm.value = $event,
									"as-child": ""
								}, {
									default: withCtx(() => [createVNode(_sfc_main$4, mergeProps({
										autofocus: "",
										autocomplete: "off",
										size: __props.size
									}, inputProps.value, {
										"data-slot": "input",
										class: __props.ui.input({ class: __props.uiOverride?.input }),
										onChange: withModifiers(() => {}, ["stop"])
									}), null, 16, [
										"size",
										"class",
										"onChange"
									])]),
									_: 1
								}, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
								renderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
								!searchTerm.value || hasFilteredItems.value ? (openBlock(), createBlock("div", {
									key: 1,
									role: "presentation",
									"data-slot": "viewport",
									class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
								}, [(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
									return openBlock(), createBlock(unref(DropdownMenu).Group, {
										key: `group-${groupIndex}`,
										"data-slot": "group",
										class: __props.ui.group({ class: __props.uiOverride?.group })
									}, {
										default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
											return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
												key: 0,
												"data-slot": "label",
												class: __props.ui.label({ class: [
													__props.uiOverride?.label,
													item.ui?.label,
													item.class
												] })
											}, {
												default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
												key: 1,
												"data-slot": "separator",
												class: __props.ui.separator({ class: [
													__props.uiOverride?.separator,
													item.ui?.separator,
													item.class
												] })
											}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
												key: 2,
												open: item.open,
												"default-open": item.defaultOpen
											}, {
												default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
													as: "button",
													type: "button",
													disabled: item.disabled,
													"text-value": unref(get)(item, props.labelKey),
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color
													})
												}, {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, [
													"disabled",
													"text-value",
													"class"
												]), createVNode(_sfc_main$1, mergeProps({
													sub: "",
													class: item.ui?.content,
													ui: __props.ui,
													"ui-override": __props.uiOverride,
													portal: __props.portal,
													items: item.children,
													align: "start",
													"align-offset": -4,
													"side-offset": 3,
													"label-key": __props.labelKey,
													"description-key": __props.descriptionKey,
													"checked-icon": __props.checkedIcon,
													"loading-icon": __props.loadingIcon,
													"external-icon": __props.externalIcon,
													size: __props.size,
													filter: item.filter,
													"filter-fields": item.filterFields || __props.filterFields,
													"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
												}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
													return {
														name,
														fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
													};
												})]), 1040, [
													"class",
													"ui",
													"ui-override",
													"portal",
													"items",
													"label-key",
													"description-key",
													"checked-icon",
													"loading-icon",
													"external-icon",
													"size",
													"filter",
													"filter-fields",
													"ignore-filter"
												])]),
												_: 2
											}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
												key: 3,
												"model-value": item.checked,
												disabled: item.disabled,
												"text-value": unref(get)(item, props.labelKey),
												"data-slot": "item",
												class: __props.ui.item({
													class: [
														__props.uiOverride?.item,
														item.ui?.item,
														item.class
													],
													color: item?.color
												}),
												"onUpdate:modelValue": item.onUpdateChecked,
												onSelect: item.onSelect
											}, {
												default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, [
												"model-value",
												"disabled",
												"text-value",
												"class",
												"onUpdate:modelValue",
												"onSelect"
											])) : (openBlock(), createBlock(_sfc_main$5, mergeProps({
												key: 4,
												ref_for: true
											}, unref(pickLinkProps)(item), { custom: "" }), {
												default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
													"as-child": "",
													disabled: item.disabled,
													"text-value": unref(get)(item, props.labelKey),
													onSelect: item.onSelect
												}, {
													default: withCtx(() => [createVNode(_sfc_main$1$2, mergeProps({ ref_for: true }, slotProps, {
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color,
															active
														})
													}), {
														default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
															item,
															active,
															index
														}, null, 8, [
															"item",
															"active",
															"index"
														])]),
														_: 2
													}, 1040, ["class"])]),
													_: 2
												}, 1032, [
													"disabled",
													"text-value",
													"onSelect"
												])]),
												_: 2
											}, 1040))], 64);
										}), 128))]),
										_: 2
									}, 1032, ["class"]);
								}), 128))], 2)) : createCommentVNode("", true),
								searchTerm.value && !hasFilteredItems.value ? (openBlock(), createBlock("div", {
									key: 2,
									"data-slot": "empty",
									class: __props.ui.empty({ class: __props.uiOverride?.empty })
								}, [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)])], 2)) : createCommentVNode("", true),
								renderSlot(_ctx.$slots, "default"),
								renderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
							]),
							_: 3
						}, 16, ["class"]))]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdropdown-menu.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdropdown_menu_default = {
	"slots": {
		"content": "min-w-32 max-h-(--reka-dropdown-menu-content-available-height) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
		"input": "border-b border-default",
		"empty": "text-center text-muted",
		"viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
		"arrow": "fill-bg stroke-default",
		"group": "p-1 isolate",
		"label": "w-full flex items-center font-semibold text-highlighted",
		"separator": "-mx-1 my-1 h-px bg-border",
		"item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
		"itemLeadingIcon": "shrink-0",
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
		"itemTrailingIcon": "shrink-0",
		"itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
		"itemTrailingKbdsSize": "",
		"itemWrapper": "flex-1 flex flex-col text-start min-w-0",
		"itemLabel": "truncate",
		"itemDescription": "truncate text-muted",
		"itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
	},
	"variants": {
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"active": {
			"true": {
				"item": "text-highlighted before:bg-elevated",
				"itemLeadingIcon": "text-default"
			},
			"false": {
				"item": ["text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50", "transition-colors before:transition-colors"],
				"itemLeadingIcon": ["text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default", "transition-colors"]
			}
		},
		"loading": { "true": { "itemLeadingIcon": "animate-spin" } },
		"size": {
			"xs": {
				"label": "p-1 text-xs gap-1",
				"item": "p-1 text-xs gap-1",
				"empty": "p-2 text-xs",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemTrailingIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"sm": {
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"empty": "p-2.5 text-xs",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemTrailingIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"md": {
				"label": "p-1.5 text-sm gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"empty": "p-2.5 text-sm",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemTrailingIcon": "size-5",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "md"
			},
			"lg": {
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-sm gap-2",
				"empty": "p-3 text-sm",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemTrailingIcon": "size-5",
				"itemTrailingKbds": "gap-1",
				"itemTrailingKbdsSize": "md"
			},
			"xl": {
				"label": "p-2 text-base gap-2",
				"item": "p-2 text-base gap-2",
				"empty": "p-3 text-base",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemTrailingIcon": "size-6",
				"itemTrailingKbds": "gap-1",
				"itemTrailingKbdsSize": "lg"
			}
		}
	},
	"compoundVariants": [
		{
			"color": "primary",
			"active": false,
			"class": {
				"item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
				"itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"active": false,
			"class": {
				"item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
				"itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"active": false,
			"class": {
				"item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
				"itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"active": false,
			"class": {
				"item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
				"itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"active": false,
			"class": {
				"item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
				"itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"active": false,
			"class": {
				"item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
				"itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "primary",
			"active": true,
			"class": {
				"item": "text-primary before:bg-primary/10",
				"itemLeadingIcon": "text-primary"
			}
		},
		{
			"color": "secondary",
			"active": true,
			"class": {
				"item": "text-secondary before:bg-secondary/10",
				"itemLeadingIcon": "text-secondary"
			}
		},
		{
			"color": "success",
			"active": true,
			"class": {
				"item": "text-success before:bg-success/10",
				"itemLeadingIcon": "text-success"
			}
		},
		{
			"color": "info",
			"active": true,
			"class": {
				"item": "text-info before:bg-info/10",
				"itemLeadingIcon": "text-info"
			}
		},
		{
			"color": "warning",
			"active": true,
			"class": {
				"item": "text-warning before:bg-warning/10",
				"itemLeadingIcon": "text-warning"
			}
		},
		{
			"color": "error",
			"active": true,
			"class": {
				"item": "text-error before:bg-error/10",
				"itemLeadingIcon": "text-error"
			}
		}
	],
	"defaultVariants": { "size": "md" }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue
var _sfc_main = {
	__name: "UDropdownMenu",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		size: {
			type: null,
			required: false
		},
		items: {
			type: null,
			required: false
		},
		checkedIcon: {
			type: null,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
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
		filter: {
			type: [Boolean, Object],
			required: false,
			default: false
		},
		filterFields: {
			type: Array,
			required: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
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
			required: false,
			default: true
		}
	}, {
		"searchTerm": {
			type: String,
			default: ""
		},
		"searchTermModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["update:open"], ["update:searchTerm"]),
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const searchTerm = useModel(__props, "searchTerm", {
			type: String,
			default: ""
		});
		const props = useComponentProps("dropdownMenu", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "defaultOpen", "open", "modal"), emits);
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const getProxySlots = () => omit(slots, ["default"]);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdropdown_menu_default,
			...appConfig.ui?.dropdownMenu || {}
		})({ size: props.size }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuRoot_default), mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(DropdownMenuTrigger_default), {
							"as-child": "",
							class: unref(props).class,
							disabled: unref(props).disabled
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$1, mergeProps({
							"search-term": searchTerm.value,
							"onUpdate:searchTerm": ($event) => searchTerm.value = $event,
							class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] }),
							ui: ui.value,
							"ui-override": unref(props).ui
						}, contentProps.value, {
							items: unref(props).items,
							portal: unref(props).portal,
							"label-key": unref(props).labelKey,
							"description-key": unref(props).descriptionKey,
							"checked-icon": unref(props).checkedIcon,
							"loading-icon": unref(props).loadingIcon,
							"external-icon": unref(props).externalIcon,
							size: unref(props).size,
							filter: unref(props).filter,
							"filter-fields": unref(props).filterFields,
							"ignore-filter": unref(props).ignoreFilter
						}), createSlots({
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (!!unref(props).arrow) _push(ssrRenderComponent(unref(DropdownMenuArrow_default), mergeProps(arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: unref(props).ui?.arrow })
								}), null, _parent, _scopeId));
								else _push(`<!---->`);
								else return [!!unref(props).arrow ? (openBlock(), createBlock(unref(DropdownMenuArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: unref(props).ui?.arrow })
								}), null, 16, ["class"])) : createCommentVNode("", true)];
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
					} else return [!!slots.default ? (openBlock(), createBlock(unref(DropdownMenuTrigger_default), {
						key: 0,
						"as-child": "",
						class: unref(props).class,
						disabled: unref(props).disabled
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1032, ["class", "disabled"])) : createCommentVNode("", true), createVNode(_sfc_main$1, mergeProps({
						"search-term": searchTerm.value,
						"onUpdate:searchTerm": ($event) => searchTerm.value = $event,
						class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] }),
						ui: ui.value,
						"ui-override": unref(props).ui
					}, contentProps.value, {
						items: unref(props).items,
						portal: unref(props).portal,
						"label-key": unref(props).labelKey,
						"description-key": unref(props).descriptionKey,
						"checked-icon": unref(props).checkedIcon,
						"loading-icon": unref(props).loadingIcon,
						"external-icon": unref(props).externalIcon,
						size: unref(props).size,
						filter: unref(props).filter,
						"filter-fields": unref(props).filterFields,
						"ignore-filter": unref(props).ignoreFilter
					}), createSlots({
						default: withCtx(() => [!!unref(props).arrow ? (openBlock(), createBlock(unref(DropdownMenuArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
							"data-slot": "arrow",
							class: ui.value.arrow({ class: unref(props).ui?.arrow })
						}), null, 16, ["class"])) : createCommentVNode("", true)]),
						_: 2
					}, [renderList(getProxySlots(), (_, name) => {
						return {
							name,
							fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, slotData)])
						};
					})]), 1040, [
						"search-term",
						"onUpdate:searchTerm",
						"class",
						"ui",
						"ui-override",
						"items",
						"portal",
						"label-key",
						"description-key",
						"checked-icon",
						"loading-icon",
						"external-icon",
						"size",
						"filter",
						"filter-fields",
						"ignore-filter"
					])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { HoverCard as H, Popover as P, _sfc_main as _, useFilter as a, useFilter$1 as b, useArrowNavigation as u };
//# sourceMappingURL=DropdownMenu-Blcsr3st.mjs.map
