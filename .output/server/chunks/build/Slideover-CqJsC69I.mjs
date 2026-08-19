import { an as useComponentProps, ay as useLocale, ah as useAppConfig, aw as useForwardProps, a6 as reactivePick, aD as usePortal, ae as tv, F as FieldGroupReset, V as VisuallyHidden_default, h as _sfc_main$7 } from '../virtual/entry.mjs';
import { e as DialogRoot_default, g as DialogTrigger_default, d as DialogPortal_default, c as DialogOverlay_default, a as DialogContent_default, f as DialogTitle_default, b as DialogDescription_default, D as DialogClose_default } from './DialogTrigger-DWu9hrsX.mjs';
import { p as pointerDownOutside } from './overlay-BtFRc-iG.mjs';
import { useSlots, toRef, computed, unref, mergeProps, withCtx, renderSlot, toHandlers, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fslideover.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fslideover_default = {
	"slots": {
		"overlay": "fixed inset-0 bg-elevated/75",
		"content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
		"header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)",
		"wrapper": "",
		"body": "flex-1 overflow-y-auto p-4 sm:p-6",
		"footer": "flex items-center gap-1.5 p-4 sm:px-6",
		"title": "text-highlighted font-semibold",
		"description": "mt-1 text-muted text-sm",
		"close": "absolute top-4 end-4"
	},
	"variants": {
		"side": {
			"top": { "content": "" },
			"right": { "content": "max-w-md" },
			"bottom": { "content": "" },
			"left": { "content": "max-w-md" }
		},
		"inset": { "true": { "content": "rounded-lg" } },
		"transition": { "true": { "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]" } }
	},
	"compoundVariants": [
		{
			"side": "top",
			"inset": true,
			"class": { "content": "max-h-[calc(100%-2rem)] inset-x-4 top-4" }
		},
		{
			"side": "top",
			"inset": false,
			"class": { "content": "max-h-full inset-x-0 top-0" }
		},
		{
			"side": "right",
			"inset": true,
			"class": { "content": "w-[calc(100%-2rem)] inset-y-4 right-4" }
		},
		{
			"side": "right",
			"inset": false,
			"class": { "content": "w-full inset-y-0 right-0" }
		},
		{
			"side": "bottom",
			"inset": true,
			"class": { "content": "max-h-[calc(100%-2rem)] inset-x-4 bottom-4" }
		},
		{
			"side": "bottom",
			"inset": false,
			"class": { "content": "max-h-full inset-x-0 bottom-0" }
		},
		{
			"side": "left",
			"inset": true,
			"class": { "content": "w-[calc(100%-2rem)] inset-y-4 left-4" }
		},
		{
			"side": "left",
			"inset": false,
			"class": { "content": "w-full inset-y-0 left-0" }
		},
		{
			"transition": true,
			"side": "top",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]" }
		},
		{
			"transition": true,
			"side": "right",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]" }
		},
		{
			"transition": true,
			"side": "bottom",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]" }
		},
		{
			"transition": true,
			"side": "left",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]" }
		}
	]
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue
var _sfc_main = {
	__name: "USlideover",
	__ssrInlineRender: true,
	props: {
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
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
		transition: {
			type: Boolean,
			required: false,
			default: true
		},
		side: {
			type: null,
			required: false,
			default: "right"
		},
		inset: {
			type: Boolean,
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		close: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		closeIcon: {
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
			type: Object,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		},
		unmountOnHide: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"leave",
		"after:leave",
		"enter",
		"after:enter",
		"close:prevent",
		"update:open"
	],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("slideover", _props);
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "modal", "unmountOnHide"), emits);
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
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fslideover_default,
			...appConfig.ui?.slideover || {}
		})({
			transition: props.transition,
			side: props.side,
			inset: props.inset
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogRoot_default), mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(DialogTrigger_default), {
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
						_push(ssrRenderComponent(unref(DialogPortal_default), mergeProps(unref(portalProps), { "force-mount": unref(portalProps).disabled && unref(props).unmountOnHide === false || void 0 }), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											if (unref(props).overlay) _push(ssrRenderComponent(unref(DialogOverlay_default), {
												"data-slot": "overlay",
												class: ui.value.overlay({ class: unref(props).ui?.overlay })
											}, null, _parent, _scopeId));
											else _push(`<!---->`);
											_push(ssrRenderComponent(unref(DialogContent_default), mergeProps({
												"data-side": unref(props).side,
												"data-slot": "content",
												class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
											}, contentProps.value, {
												onEnter: ($event) => emits("enter"),
												onAfterEnter: ($event) => emits("after:enter"),
												onLeave: ($event) => emits("leave"),
												onAfterLeave: ($event) => emits("after:leave")
											}, toHandlers(contentEvents.value)), {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
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
																		_: 2
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
																		_: 2
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
															_: 2
														}, _parent, _scopeId));
														else _push(`<!---->`);
														ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
															if (!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close) {
																_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}"${_scopeId}>`);
																ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
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
																			_: 2
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
																			_: 2
																		}, _parent, _scopeId));
																		else _push(`<!---->`);
																		_push(`</div>`);
																	} else _push(`<!---->`);
																	ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent, _scopeId);
																	if (unref(props).close || !!slots.close) _push(ssrRenderComponent(unref(DialogClose_default), { "as-child": "" }, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
																				if (unref(props).close) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
																					icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
																					color: "neutral",
																					variant: "ghost",
																					"aria-label": unref(t)("slideover.close")
																				}, typeof unref(props).close === "object" ? unref(props).close : {}, {
																					"data-slot": "close",
																					class: ui.value.close({ class: unref(props).ui?.close })
																				}), null, _parent, _scopeId));
																				else _push(`<!---->`);
																			}, _push, _parent, _scopeId);
																			else return [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
																				key: 0,
																				icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
																				color: "neutral",
																				variant: "ghost",
																				"aria-label": unref(t)("slideover.close")
																			}, typeof unref(props).close === "object" ? unref(props).close : {}, {
																				"data-slot": "close",
																				class: ui.value.close({ class: unref(props).ui?.close })
																			}), null, 16, [
																				"icon",
																				"aria-label",
																				"class"
																			])) : createCommentVNode("", true)])];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	else _push(`<!---->`);
																}, _push, _parent, _scopeId);
																_push(`</div>`);
															} else _push(`<!---->`);
															_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}"${_scopeId}>`);
															ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push, _parent, _scopeId);
															_push(`</div>`);
															if (!!slots.footer) {
																_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}"${_scopeId}>`);
																ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push, _parent, _scopeId);
																_push(`</div>`);
															} else _push(`<!---->`);
														}, _push, _parent, _scopeId);
													} else return [!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
														default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
															_: 3
														})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
															_: 3
														})) : createCommentVNode("", true)]),
														_: 3
													})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
														!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
															key: 0,
															"data-slot": "header",
															class: ui.value.header({ class: unref(props).ui?.header })
														}, [renderSlot(_ctx.$slots, "header", { close }, () => [
															unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
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
															}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
															renderSlot(_ctx.$slots, "actions"),
															unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
																key: 1,
																"as-child": ""
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
																	key: 0,
																	icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
																	color: "neutral",
																	variant: "ghost",
																	"aria-label": unref(t)("slideover.close")
																}, typeof unref(props).close === "object" ? unref(props).close : {}, {
																	"data-slot": "close",
																	class: ui.value.close({ class: unref(props).ui?.close })
																}), null, 16, [
																	"icon",
																	"aria-label",
																	"class"
																])) : createCommentVNode("", true)])]),
																_: 2
															}, 1024)) : createCommentVNode("", true)
														])], 2)) : createCommentVNode("", true),
														createVNode("div", {
															"data-slot": "body",
															class: ui.value.body({ class: unref(props).ui?.body })
														}, [renderSlot(_ctx.$slots, "body", { close })], 2),
														!!slots.footer ? (openBlock(), createBlock("div", {
															key: 1,
															"data-slot": "footer",
															class: ui.value.footer({ class: unref(props).ui?.footer })
														}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
													])];
												}),
												_: 2
											}, _parent, _scopeId));
										} else return [unref(props).overlay ? (openBlock(), createBlock(unref(DialogOverlay_default), {
											key: 0,
											"data-slot": "overlay",
											class: ui.value.overlay({ class: unref(props).ui?.overlay })
										}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogContent_default), mergeProps({
											"data-side": unref(props).side,
											"data-slot": "content",
											class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
										}, contentProps.value, {
											onEnter: ($event) => emits("enter"),
											onAfterEnter: ($event) => emits("after:enter"),
											onLeave: ($event) => emits("leave"),
											onAfterLeave: ($event) => emits("after:leave")
										}, toHandlers(contentEvents.value)), {
											default: withCtx(() => [!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
												default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
													_: 3
												})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
													_: 3
												})) : createCommentVNode("", true)]),
												_: 3
											})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
												!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
													key: 0,
													"data-slot": "header",
													class: ui.value.header({ class: unref(props).ui?.header })
												}, [renderSlot(_ctx.$slots, "header", { close }, () => [
													unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
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
													}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
													renderSlot(_ctx.$slots, "actions"),
													unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
														key: 1,
														"as-child": ""
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
															key: 0,
															icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
															color: "neutral",
															variant: "ghost",
															"aria-label": unref(t)("slideover.close")
														}, typeof unref(props).close === "object" ? unref(props).close : {}, {
															"data-slot": "close",
															class: ui.value.close({ class: unref(props).ui?.close })
														}), null, 16, [
															"icon",
															"aria-label",
															"class"
														])) : createCommentVNode("", true)])]),
														_: 2
													}, 1024)) : createCommentVNode("", true)
												])], 2)) : createCommentVNode("", true),
												createVNode("div", {
													"data-slot": "body",
													class: ui.value.body({ class: unref(props).ui?.body })
												}, [renderSlot(_ctx.$slots, "body", { close })], 2),
												!!slots.footer ? (openBlock(), createBlock("div", {
													key: 1,
													"data-slot": "footer",
													class: ui.value.footer({ class: unref(props).ui?.footer })
												}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
											])]),
											_: 2
										}, 1040, [
											"data-side",
											"class",
											"onEnter",
											"onAfterEnter",
											"onLeave",
											"onAfterLeave"
										])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(FieldGroupReset), null, {
									default: withCtx(() => [unref(props).overlay ? (openBlock(), createBlock(unref(DialogOverlay_default), {
										key: 0,
										"data-slot": "overlay",
										class: ui.value.overlay({ class: unref(props).ui?.overlay })
									}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogContent_default), mergeProps({
										"data-side": unref(props).side,
										"data-slot": "content",
										class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
									}, contentProps.value, {
										onEnter: ($event) => emits("enter"),
										onAfterEnter: ($event) => emits("after:enter"),
										onLeave: ($event) => emits("leave"),
										onAfterLeave: ($event) => emits("after:leave")
									}, toHandlers(contentEvents.value)), {
										default: withCtx(() => [!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
											default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
												_: 3
											})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
												_: 3
											})) : createCommentVNode("", true)]),
											_: 3
										})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
											!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
												key: 0,
												"data-slot": "header",
												class: ui.value.header({ class: unref(props).ui?.header })
											}, [renderSlot(_ctx.$slots, "header", { close }, () => [
												unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
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
												}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
												renderSlot(_ctx.$slots, "actions"),
												unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
													key: 1,
													"as-child": ""
												}, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
														key: 0,
														icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
														color: "neutral",
														variant: "ghost",
														"aria-label": unref(t)("slideover.close")
													}, typeof unref(props).close === "object" ? unref(props).close : {}, {
														"data-slot": "close",
														class: ui.value.close({ class: unref(props).ui?.close })
													}), null, 16, [
														"icon",
														"aria-label",
														"class"
													])) : createCommentVNode("", true)])]),
													_: 2
												}, 1024)) : createCommentVNode("", true)
											])], 2)) : createCommentVNode("", true),
											createVNode("div", {
												"data-slot": "body",
												class: ui.value.body({ class: unref(props).ui?.body })
											}, [renderSlot(_ctx.$slots, "body", { close })], 2),
											!!slots.footer ? (openBlock(), createBlock("div", {
												key: 1,
												"data-slot": "footer",
												class: ui.value.footer({ class: unref(props).ui?.footer })
											}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
										])]),
										_: 2
									}, 1040, [
										"data-side",
										"class",
										"onEnter",
										"onAfterEnter",
										"onLeave",
										"onAfterLeave"
									])]),
									_: 2
								}, 1024)];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [!!slots.default ? (openBlock(), createBlock(unref(DialogTrigger_default), {
						key: 0,
						"as-child": "",
						class: unref(props).class
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1032, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogPortal_default), mergeProps(unref(portalProps), { "force-mount": unref(portalProps).disabled && unref(props).unmountOnHide === false || void 0 }), {
						default: withCtx(() => [createVNode(unref(FieldGroupReset), null, {
							default: withCtx(() => [unref(props).overlay ? (openBlock(), createBlock(unref(DialogOverlay_default), {
								key: 0,
								"data-slot": "overlay",
								class: ui.value.overlay({ class: unref(props).ui?.overlay })
							}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogContent_default), mergeProps({
								"data-side": unref(props).side,
								"data-slot": "content",
								class: ui.value.content({ class: [!slots.default && unref(props).class, unref(props).ui?.content] })
							}, contentProps.value, {
								onEnter: ($event) => emits("enter"),
								onAfterEnter: ($event) => emits("after:enter"),
								onLeave: ($event) => emits("leave"),
								onAfterLeave: ($event) => emits("after:leave")
							}, toHandlers(contentEvents.value)), {
								default: withCtx(() => [!unref(props).title && !slots.title || !unref(props).description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
									default: withCtx(() => [!unref(props).title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])]),
										_: 3
									})) : createCommentVNode("", true), !unref(props).description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])]),
										_: 3
									})) : createCommentVNode("", true)]),
									_: 3
								})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
									!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description || unref(props).close || !!slots.close ? (openBlock(), createBlock("div", {
										key: 0,
										"data-slot": "header",
										class: ui.value.header({ class: unref(props).ui?.header })
									}, [renderSlot(_ctx.$slots, "header", { close }, () => [
										unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
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
										}, 8, ["class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
										renderSlot(_ctx.$slots, "actions"),
										unref(props).close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
											key: 1,
											"as-child": ""
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
												key: 0,
												icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
												color: "neutral",
												variant: "ghost",
												"aria-label": unref(t)("slideover.close")
											}, typeof unref(props).close === "object" ? unref(props).close : {}, {
												"data-slot": "close",
												class: ui.value.close({ class: unref(props).ui?.close })
											}), null, 16, [
												"icon",
												"aria-label",
												"class"
											])) : createCommentVNode("", true)])]),
											_: 2
										}, 1024)) : createCommentVNode("", true)
									])], 2)) : createCommentVNode("", true),
									createVNode("div", {
										"data-slot": "body",
										class: ui.value.body({ class: unref(props).ui?.body })
									}, [renderSlot(_ctx.$slots, "body", { close })], 2),
									!!slots.footer ? (openBlock(), createBlock("div", {
										key: 1,
										"data-slot": "footer",
										class: ui.value.footer({ class: unref(props).ui?.footer })
									}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
								])]),
								_: 2
							}, 1040, [
								"data-side",
								"class",
								"onEnter",
								"onAfterEnter",
								"onLeave",
								"onAfterLeave"
							])]),
							_: 2
						}, 1024)]),
						_: 2
					}, 1040, ["force-mount"])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Slideover-CqJsC69I.mjs.map
