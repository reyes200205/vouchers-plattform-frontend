import { al as useComponentProps, ag as useAppConfig, Q as injectTooltipProviderContext, au as useForwardProps, a5 as reactivePick, aB as usePortal, ad as tv, F as FieldGroupReset, at as useForwardExpose, aL as useVModel, aJ as useTimeoutFn, b as Primitive, T as Teleport_default, P as Presence_default, k as createContext, V as VisuallyHidden_default, av as useForwardProps$1 } from '../virtual/entry.mjs';
import { d as PopperRoot_default, f as useId$1, P as PopperAnchor_default, e as useForwardPropsEmits, a as PopperArrow_default, D as DismissableLayer_default, c as PopperContent_default } from './PopperArrow-DMsSsDHm.mjs';
import { _ as _sfc_main$1, u as useGraceArea } from './Kbd-CHYMLSD7.mjs';
import { useSlots, toRef, computed, unref, mergeProps, withCtx, renderSlot, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, createVNode, defineComponent, watch, ref, toHandlers, normalizeProps, guardReactiveProps, resolveDynamicComponent, withModifiers, createTextVNode, useSSRContext } from 'vue';
import { f as defu } from '../_/nitro.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipArrow.js
var TooltipArrow_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipArrow",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/utils.js
var TOOLTIP_OPEN = "tooltip.open";
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipRoot.js
var [injectTooltipRootContext, provideTooltipRootContext] = /*#__PURE__*/ createContext("TooltipRoot");
var TooltipRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipRoot",
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
		delayDuration: {
			type: Number,
			required: false,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const providerContext = injectTooltipProviderContext();
		const disableHoverableContent = computed(() => props.disableHoverableContent ?? providerContext.disableHoverableContent.value);
		const disableClosingTrigger = computed(() => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value);
		const disableTooltip = computed(() => props.disabled ?? providerContext.disabled.value);
		const delayDuration = computed(() => props.delayDuration ?? providerContext.delayDuration.value);
		const ignoreNonKeyboardFocus = computed(() => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		watch(open, (isOpen) => {
			if (!providerContext.onClose) return;
			if (isOpen) {
				providerContext.onOpen();
				(void 0).dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
			} else providerContext.onClose();
		});
		const wasOpenDelayedRef = ref(false);
		const trigger = ref();
		const stateAttribute = computed(() => {
			if (!open.value) return "closed";
			return wasOpenDelayedRef.value ? "delayed-open" : "instant-open";
		});
		const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
			wasOpenDelayedRef.value = true;
			open.value = true;
		}, delayDuration, { immediate: false });
		function handleOpen() {
			clearTimer();
			wasOpenDelayedRef.value = false;
			open.value = true;
		}
		function handleClose() {
			clearTimer();
			open.value = false;
		}
		function handleDelayedOpen() {
			startTimer();
		}
		provideTooltipRootContext({
			contentId: "",
			open,
			stateAttribute,
			trigger,
			onTriggerChange(el) {
				trigger.value = el;
			},
			onTriggerEnter() {
				if (providerContext.isOpenDelayed.value) handleDelayedOpen();
				else handleOpen();
			},
			onTriggerLeave() {
				if (disableHoverableContent.value) handleClose();
				else clearTimer();
			},
			onOpen: handleOpen,
			onClose: handleClose,
			disableHoverableContent,
			disableClosingTrigger,
			disabled: disableTooltip,
			ignoreNonKeyboardFocus
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipContentImpl.js
var TooltipContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false,
			default: void 0
		},
		as: {
			type: null,
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
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false,
			default: void 0
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
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false,
			default: void 0
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent);
		const popperContentProps = computed(() => {
			const { ariaLabel: _, ...restProps } = props;
			return defu(restProps, providerContext.content.value ?? {}, {
				side: "top",
				sideOffset: 0,
				align: "center",
				avoidCollisions: true,
				collisionBoundary: [],
				collisionPadding: 0,
				arrowPadding: 0,
				sticky: "partial",
				hideWhenDetached: false
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DismissableLayer_default), {
				"as-child": "",
				"disable-outside-pointer-events": false,
				onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => emits("escapeKeyDown", $event)),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					if (unref(rootContext).disableClosingTrigger.value && unref(rootContext).trigger.value?.contains(event.target)) event.preventDefault();
					emits("pointerDownOutside", event);
				}),
				onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
				onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onClose())
			}, {
				default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(rootContext).stateAttribute.value
				}, {
					..._ctx.$attrs,
					...popperContentProps.value
				}, { style: {
					"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
					"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
					"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
				} }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(VisuallyHidden_default), {
						id: unref(rootContext).contentId,
						role: "tooltip"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(ariaLabel.value), 1)]),
						_: 1
					}, 8, ["id"])]),
					_: 3
				}, 16, ["data-state"])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipContentHoverable.js
var TooltipContentHoverable_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
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
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
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
		}
	},
	setup(__props) {
		const forwardedProps = useForwardProps$1(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const { trigger, onClose } = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		const { isPointerInTransit, onPointerExit } = useGraceArea(trigger, currentElement);
		providerContext.isPointerInTransitRef = isPointerInTransit;
		onPointerExit(() => {
			onClose();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(TooltipContentImpl_default, mergeProps({ ref: unref(forwardRef) }, unref(forwardedProps)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipContent.js
var TooltipContent_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		ariaLabel: {
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
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
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
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTooltipRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).disableHoverableContent.value ? TooltipContentImpl_default : TooltipContentHoverable_default), mergeProps({ ref: unref(forwardRef) }, unref(forwarded)), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipPortal.js
var TooltipPortal_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js
var TooltipTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipTrigger",
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
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		rootContext.contentId ||= useId$1(void 0, "reka-tooltip-content");
		const { forwardRef} = useForwardExpose();
		const isPointerDown = ref(false);
		const hasPointerMoveOpened = ref(false);
		const tooltipListeners = computed(() => {
			if (rootContext.disabled.value) return {};
			return {
				click: handleClick,
				focus: handleFocus,
				pointermove: handlePointerMove,
				pointerleave: handlePointerLeave,
				pointerdown: handlePointerDown,
				blur: handleBlur
			};
		});
		function handlePointerUp() {
			setTimeout(() => {
				isPointerDown.value = false;
			}, 1);
		}
		function handlePointerDown() {
			if (rootContext.open && !rootContext.disableClosingTrigger.value) rootContext.onClose();
			isPointerDown.value = true;
			(void 0).addEventListener("pointerup", handlePointerUp, { once: true });
		}
		function handlePointerMove(event) {
			if (event.pointerType === "touch") return;
			if (!hasPointerMoveOpened.value && !providerContext.isPointerInTransitRef.value) {
				rootContext.onTriggerEnter();
				hasPointerMoveOpened.value = true;
			}
		}
		function handlePointerLeave() {
			rootContext.onTriggerLeave();
			hasPointerMoveOpened.value = false;
		}
		function handleFocus(event) {
			if (isPointerDown.value) return;
			if (rootContext.ignoreNonKeyboardFocus.value && !event.target.matches?.(":focus-visible")) return;
			rootContext.onOpen();
		}
		function handleBlur() {
			rootContext.onClose();
		}
		function handleClick() {
			if (!rootContext.disableClosingTrigger.value) rootContext.onClose();
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"aria-describedby": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
					"data-state": unref(rootContext).stateAttribute.value,
					as: _ctx.as,
					"as-child": props.asChild,
					"data-grace-area-trigger": ""
				}, toHandlers(tooltipListeners.value)), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"aria-describedby",
					"data-state",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Ftooltip.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftooltip_default = { "slots": {
	"content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
	"arrow": "fill-bg stroke-default",
	"text": "truncate",
	"kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
	"kbdsSize": "sm"
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue
var _sfc_main = {
	__name: "UTooltip",
	__ssrInlineRender: true,
	props: {
		text: {
			type: String,
			required: false
		},
		kbds: {
			type: Array,
			required: false
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
		delayDuration: {
			type: Number,
			required: false
		},
		disableHoverableContent: {
			type: Boolean,
			required: false
		},
		disableClosingTrigger: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("tooltip", _props);
		const appConfig = useAppConfig();
		const providerContext = injectTooltipProviderContext();
		const rootProps = useForwardProps(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => defu(props.content, providerContext.content.value, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftooltip_default,
			...appConfig.ui?.tooltip || {}
		})({ side: contentProps.value.side }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipRoot_default), mergeProps(unref(rootProps), { disabled: !(unref(props).text || unref(props).kbds?.length || !!slots.content) || unref(props).disabled }, _attrs), {
				default: withCtx(({ open }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default || !!unref(props).reference) _push(ssrRenderComponent(unref(TooltipTrigger_default), mergeProps(_ctx.$attrs, {
							"as-child": "",
							reference: unref(props).reference,
							class: unref(props).class
						}), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(TooltipPortal_default), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(unref(TooltipContent_default), mergeProps(contentProps.value, {
											"data-slot": "content",
											class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
										}), {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													ssrRenderSlot(_ctx.$slots, "content", { ui: ui.value }, () => {
														if (unref(props).text) _push(`<span data-slot="text" class="${ssrRenderClass(ui.value.text({ class: unref(props).ui?.text }))}"${_scopeId}>${ssrInterpolate(unref(props).text)}</span>`);
														else _push(`<!---->`);
														if (unref(props).kbds?.length) {
															_push(`<span data-slot="kbds" class="${ssrRenderClass(ui.value.kbds({ class: unref(props).ui?.kbds }))}"${_scopeId}><!--[-->`);
															ssrRenderList(unref(props).kbds, (kbd, index) => {
																_push(ssrRenderComponent(_sfc_main$1, mergeProps({
																	key: index,
																	size: unref(props).ui?.kbdsSize || ui.value.kbdsSize()
																}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
															});
															_push(`<!--]--></span>`);
														} else _push(`<!---->`);
													}, _push, _parent, _scopeId);
													if (!!unref(props).arrow) _push(ssrRenderComponent(unref(TooltipArrow_default), mergeProps(arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: unref(props).ui?.arrow })
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												} else return [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [unref(props).text ? (openBlock(), createBlock("span", {
													key: 0,
													"data-slot": "text",
													class: ui.value.text({ class: unref(props).ui?.text })
												}, toDisplayString(unref(props).text), 3)) : createCommentVNode("", true), unref(props).kbds?.length ? (openBlock(), createBlock("span", {
													key: 1,
													"data-slot": "kbds",
													class: ui.value.kbds({ class: unref(props).ui?.kbds })
												}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(props).kbds, (kbd, index) => {
													return openBlock(), createBlock(_sfc_main$1, mergeProps({
														key: index,
														size: unref(props).ui?.kbdsSize || ui.value.kbdsSize()
													}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
												}), 128))], 2)) : createCommentVNode("", true)]), !!unref(props).arrow ? (openBlock(), createBlock(unref(TooltipArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
													"data-slot": "arrow",
													class: ui.value.arrow({ class: unref(props).ui?.arrow })
												}), null, 16, ["class"])) : createCommentVNode("", true)];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [createVNode(unref(TooltipContent_default), mergeProps(contentProps.value, {
											"data-slot": "content",
											class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
										}), {
											default: withCtx(() => [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [unref(props).text ? (openBlock(), createBlock("span", {
												key: 0,
												"data-slot": "text",
												class: ui.value.text({ class: unref(props).ui?.text })
											}, toDisplayString(unref(props).text), 3)) : createCommentVNode("", true), unref(props).kbds?.length ? (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "kbds",
												class: ui.value.kbds({ class: unref(props).ui?.kbds })
											}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(props).kbds, (kbd, index) => {
												return openBlock(), createBlock(_sfc_main$1, mergeProps({
													key: index,
													size: unref(props).ui?.kbdsSize || ui.value.kbdsSize()
												}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
											}), 128))], 2)) : createCommentVNode("", true)]), !!unref(props).arrow ? (openBlock(), createBlock(unref(TooltipArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: unref(props).ui?.arrow })
											}), null, 16, ["class"])) : createCommentVNode("", true)]),
											_: 3
										}, 16, ["class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(FieldGroupReset), null, {
									default: withCtx(() => [createVNode(unref(TooltipContent_default), mergeProps(contentProps.value, {
										"data-slot": "content",
										class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
									}), {
										default: withCtx(() => [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [unref(props).text ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "text",
											class: ui.value.text({ class: unref(props).ui?.text })
										}, toDisplayString(unref(props).text), 3)) : createCommentVNode("", true), unref(props).kbds?.length ? (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "kbds",
											class: ui.value.kbds({ class: unref(props).ui?.kbds })
										}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(props).kbds, (kbd, index) => {
											return openBlock(), createBlock(_sfc_main$1, mergeProps({
												key: index,
												size: unref(props).ui?.kbdsSize || ui.value.kbdsSize()
											}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
										}), 128))], 2)) : createCommentVNode("", true)]), !!unref(props).arrow ? (openBlock(), createBlock(unref(TooltipArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
											"data-slot": "arrow",
											class: ui.value.arrow({ class: unref(props).ui?.arrow })
										}), null, 16, ["class"])) : createCommentVNode("", true)]),
										_: 3
									}, 16, ["class"])]),
									_: 3
								})];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [!!slots.default || !!unref(props).reference ? (openBlock(), createBlock(unref(TooltipTrigger_default), mergeProps({ key: 0 }, _ctx.$attrs, {
						"as-child": "",
						reference: unref(props).reference,
						class: unref(props).class
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1040, ["reference", "class"])) : createCommentVNode("", true), createVNode(unref(TooltipPortal_default), unref(portalProps), {
						default: withCtx(() => [createVNode(unref(FieldGroupReset), null, {
							default: withCtx(() => [createVNode(unref(TooltipContent_default), mergeProps(contentProps.value, {
								"data-slot": "content",
								class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
							}), {
								default: withCtx(() => [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [unref(props).text ? (openBlock(), createBlock("span", {
									key: 0,
									"data-slot": "text",
									class: ui.value.text({ class: unref(props).ui?.text })
								}, toDisplayString(unref(props).text), 3)) : createCommentVNode("", true), unref(props).kbds?.length ? (openBlock(), createBlock("span", {
									key: 1,
									"data-slot": "kbds",
									class: ui.value.kbds({ class: unref(props).ui?.kbds })
								}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(props).kbds, (kbd, index) => {
									return openBlock(), createBlock(_sfc_main$1, mergeProps({
										key: index,
										size: unref(props).ui?.kbdsSize || ui.value.kbdsSize()
									}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
								}), 128))], 2)) : createCommentVNode("", true)]), !!unref(props).arrow ? (openBlock(), createBlock(unref(TooltipArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: unref(props).ui?.arrow })
								}), null, 16, ["class"])) : createCommentVNode("", true)]),
								_: 3
							}, 16, ["class"])]),
							_: 3
						})]),
						_: 3
					}, 16)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Tooltip-AZF1_z2s.mjs.map
