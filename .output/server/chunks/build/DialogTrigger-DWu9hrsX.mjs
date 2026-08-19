import { av as useForwardExpose, b as Primitive, T as Teleport_default, aN as useVModel, aq as useEmitAsProps, P as Presence_default, k as createContext } from '../virtual/entry.mjs';
import { r as useId$1, q as useHideOthers, u as useBodyScrollLock, a as FocusScope_default, D as DismissableLayer_default, j as getOpenState } from './PopperArrow-Cwqi64q5.mjs';
import { defineComponent, openBlock, createBlock, unref, mergeProps, withCtx, renderSlot, normalizeProps, guardReactiveProps, ref, toRefs, withDirectives, vShow, createVNode, createCommentVNode, computed, watch, withModifiers } from 'vue';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [injectDialogRootContext, provideDialogRootContext] = /*#__PURE__*/ createContext("DialogRoot");
var DialogRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "DialogRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const contentElement = ref();
		const { modal, unmountOnHide } = toRefs(props);
		provideDialogRootContext({
			open,
			modal,
			unmountOnHide,
			openModal: () => {
				open.value = true;
			},
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			contentId: "",
			titleId: "",
			descriptionId: "",
			triggerElement,
			contentElement
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", {
				open: unref(open),
				close: () => open.value = false
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogClose.js
var DialogClose_default = /* @__PURE__ */ defineComponent({
	__name: "DialogClose",
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
		const rootContext = injectDialogRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				type: _ctx.as === "button" ? "button" : void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["type"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var DialogContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContentImpl",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		},
		present: {
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
		const rootContext = injectDialogRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.titleId ||= useId$1(void 0, "reka-dialog-title");
		rootContext.descriptionId ||= useId$1(void 0, "reka-dialog-description");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: props.trapFocus,
				present: props.present,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), mergeProps({
					id: unref(rootContext).contentId,
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					present: props.present,
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					role: "dialog",
					"aria-describedby": unref(rootContext).descriptionId,
					"aria-labelledby": unref(rootContext).titleId,
					"data-state": unref(getOpenState)(unref(rootContext).open.value)
				}, _ctx.$attrs, {
					onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
					onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
					onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"as",
					"as-child",
					"present",
					"disable-outside-pointer-events",
					"aria-describedby",
					"aria-labelledby",
					"data-state"
				])]),
				_: 3
			}, 8, ["trapped", "present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentModal.js
var DialogContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContentModal",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
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
		present: {
			type: Boolean,
			required: true
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
		const rootContext = injectDialogRootContext();
		const emitsAsProps = useEmitAsProps(emits);
		const { forwardRef, currentElement } = useForwardExpose();
		const ariaHiddenTarget = computed(() => props.present ? currentElement.value : void 0);
		useHideOthers(ariaHiddenTarget);
		const forwardedProps = computed(() => {
			const { present: _, ...rest } = props;
			return rest;
		});
		watch(() => props.present, (isPresent, wasPresent) => {
			if (!isPresent && wasPresent) rootContext.triggerElement.value?.focus();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
				...forwardedProps.value,
				...unref(emitsAsProps)
			}, {
				ref: unref(forwardRef),
				present: _ctx.present,
				"trap-focus": unref(rootContext).open.value,
				"disable-outside-pointer-events": props.disableOutsidePointerEvents,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented) {
						event.preventDefault();
						unref(rootContext).triggerElement.value?.focus();
					}
				}),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
				}),
				onFocusOutside: _cache[2] || (_cache[2] = (event) => {
					event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"present",
				"trap-focus",
				"disable-outside-pointer-events"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentNonModal.js
var DialogContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContentNonModal",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		},
		present: {
			type: Boolean,
			required: true
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
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		const hasInteractedOutsideRef = ref(false);
		const hasPointerDownOutsideRef = ref(false);
		const forwardedProps = computed(() => {
			const { present: _, ...rest } = props;
			return rest;
		});
		watch(() => props.present, (isPresent, wasPresent) => {
			if (!isPresent && wasPresent) {
				if (!hasInteractedOutsideRef.value) rootContext.triggerElement.value?.focus();
				hasInteractedOutsideRef.value = false;
				hasPointerDownOutsideRef.value = false;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
				...forwardedProps.value,
				...unref(emitsAsProps)
			}, {
				present: _ctx.present,
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = (event) => {
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
			}, 16, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContent.js
var DialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
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
		const rootContext = injectDialogRootContext();
		const emitsAsProps = useEmitAsProps(emits);
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				present: _ctx.forceMount || unref(rootContext).open.value,
				"force-mount": _ctx.forceMount || !unref(rootContext).unmountOnHide.value
			}, {
				default: withCtx(({ present }) => [unref(rootContext).modal.value ? withDirectives((openBlock(), createBlock(DialogContentModal_default, mergeProps({
					key: 0,
					ref: unref(forwardRef),
					present: unref(rootContext).unmountOnHide.value || present
				}, {
					...props,
					...unref(emitsAsProps),
					..._ctx.$attrs
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, ["present"])), [[vShow, unref(rootContext).unmountOnHide.value || present]]) : withDirectives((openBlock(), createBlock(DialogContentNonModal_default, mergeProps({
					key: 1,
					ref: unref(forwardRef),
					present: unref(rootContext).unmountOnHide.value || present
				}, {
					...props,
					...unref(emitsAsProps),
					..._ctx.$attrs
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, ["present"])), [[vShow, unref(rootContext).unmountOnHide.value || present]])]),
				_: 3
			}, 8, ["present", "force-mount"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogDescription.js
var DialogDescription_default = /* @__PURE__ */ defineComponent({
	__name: "DialogDescription",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "p"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).descriptionId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogOverlayImpl.js
var DialogOverlayImpl_default = /* @__PURE__ */ defineComponent({
	__name: "DialogOverlayImpl",
	props: {
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
	setup(__props) {
		const props = __props;
		const rootContext = injectDialogRootContext();
		const scrollLocked = useBodyScrollLock(props.present);
		watch(() => props.present, (val) => scrollLocked.value = val);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				style: { "pointer-events": "auto" },
				onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {}, [
					"left",
					"self",
					"prevent"
				]))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogOverlay.js
var DialogOverlay_default = /* @__PURE__ */ defineComponent({
	__name: "DialogOverlay",
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
		const rootContext = injectDialogRootContext();
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return unref(rootContext)?.modal.value ? (openBlock(), createBlock(unref(Presence_default), {
				key: 0,
				present: _ctx.forceMount || unref(rootContext).open.value,
				"force-mount": _ctx.forceMount || !unref(rootContext).unmountOnHide.value
			}, {
				default: withCtx(({ present }) => [withDirectives(createVNode(DialogOverlayImpl_default, mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					present: unref(rootContext).unmountOnHide.value || present
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, [
					"as",
					"as-child",
					"present"
				]), [[vShow, unref(rootContext).unmountOnHide.value || present]])]),
				_: 3
			}, 8, ["present", "force-mount"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogPortal.js
var DialogPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogTitle.js
var DialogTitle_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTitle",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "h2"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDialogRootContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).titleId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogTrigger.js
var DialogTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTrigger",
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
		const rootContext = injectDialogRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.contentId ||= useId$1(void 0, "reka-dialog-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref: unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": unref(rootContext).open.value || false,
				"aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				onClick: unref(rootContext).onOpenToggle
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"onClick"
			]);
		};
	}
});

export { DialogClose_default as D, DialogContent_default as a, DialogDescription_default as b, DialogOverlay_default as c, DialogPortal_default as d, DialogRoot_default as e, DialogTitle_default as f, DialogTrigger_default as g };
//# sourceMappingURL=DialogTrigger-DWu9hrsX.mjs.map
