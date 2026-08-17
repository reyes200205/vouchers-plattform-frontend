import { ao as useComponentProps, ai as useAppConfig, a7 as reactivePick, ax as useForwardProps, aE as usePortal, af as tv, F as FieldGroupReset } from '../virtual/entry.mjs';
import { H as HoverCard, P as Popover } from './namespaced-Cysx46L3.mjs';
import { p as pointerDownOutside } from './overlay-BtFRc-iG.mjs';
import { useSlots, toRef, computed, unref, mergeProps, withCtx, renderSlot, toHandlers, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { f as defu } from '../_/nitro.mjs';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpopover.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpopover_default = { "slots": {
	"content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
	"arrow": "fill-bg stroke-default"
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Popover.vue
var _sfc_main = {
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
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Popover-BbIOdeLO.mjs.map
