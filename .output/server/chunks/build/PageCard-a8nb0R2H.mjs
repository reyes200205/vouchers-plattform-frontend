import { ao as useComponentProps, a3 as pausableFilter, ai as useAppConfig, aB as useMouseInElement, af as tv, M as getSlotChildrenText, b as Primitive, g as _sfc_main$2, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { useSlots, ref, computed, watch, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, renderSlot, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/composables/usePrefix.js
function usePrefix() {
	const prefix = useAppConfig().ui?.prefix;
	return (classString) => {
		if (!prefix || !classString) return classString;
		return classString.split(/\s+/).filter(Boolean).map((cls) => `${prefix}:${cls}`).join(" ");
	};
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpage-card.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_card_default = {
	"slots": {
		"root": "relative flex rounded-lg",
		"spotlight": "absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90",
		"container": "relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6",
		"wrapper": "flex flex-col flex-1 items-start",
		"header": "mb-4",
		"body": "flex-1",
		"footer": "pt-4 mt-auto",
		"leading": "inline-flex items-center mb-2.5",
		"leadingIcon": "size-5 shrink-0 text-primary",
		"title": "text-base text-pretty font-semibold text-highlighted",
		"description": "text-[15px] text-pretty"
	},
	"variants": {
		"orientation": {
			"horizontal": { "container": "lg:grid-cols-2 lg:items-center" },
			"vertical": { "container": "" }
		},
		"reverse": { "true": { "wrapper": "order-last" } },
		"variant": {
			"solid": {
				"root": "bg-inverted text-inverted",
				"title": "text-inverted",
				"description": "text-dimmed"
			},
			"outline": {
				"root": "bg-default ring ring-default",
				"description": "text-muted"
			},
			"soft": {
				"root": "bg-elevated/50",
				"description": "text-toned"
			},
			"subtle": {
				"root": "bg-elevated/50 ring ring-default",
				"description": "text-toned"
			},
			"ghost": { "description": "text-muted" },
			"naked": {
				"container": "p-0 sm:p-0",
				"description": "text-muted"
			}
		},
		"to": { "true": { "root": ["outline-primary/25 has-[>a:focus-visible]:outline-3", "transition"] } },
		"title": { "true": { "description": "mt-1" } },
		"highlight": { "true": { "root": "ring-2" } },
		"highlightColor": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"spotlight": { "true": { "root": "[--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)]" } },
		"spotlightColor": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		}
	},
	"compoundVariants": [
		{
			"variant": "solid",
			"to": true,
			"class": { "root": "hover:bg-inverted/90" }
		},
		{
			"variant": "outline",
			"to": true,
			"class": { "root": "hover:bg-elevated/50" }
		},
		{
			"variant": "soft",
			"to": true,
			"class": { "root": "hover:bg-elevated" }
		},
		{
			"variant": "subtle",
			"to": true,
			"class": { "root": "hover:bg-elevated" }
		},
		{
			"variant": "subtle",
			"to": true,
			"highlight": false,
			"class": { "root": "hover:ring-accented" }
		},
		{
			"variant": ["outline", "subtle"],
			"to": true,
			"highlight": false,
			"class": { "root": "has-[>a:focus-visible]:ring-primary" }
		},
		{
			"variant": "ghost",
			"to": true,
			"class": { "root": "hover:bg-elevated/50" }
		},
		{
			"highlightColor": "primary",
			"highlight": true,
			"class": { "root": "ring-primary" }
		},
		{
			"highlightColor": "secondary",
			"highlight": true,
			"class": { "root": "ring-secondary" }
		},
		{
			"highlightColor": "success",
			"highlight": true,
			"class": { "root": "ring-success" }
		},
		{
			"highlightColor": "info",
			"highlight": true,
			"class": { "root": "ring-info" }
		},
		{
			"highlightColor": "warning",
			"highlight": true,
			"class": { "root": "ring-warning" }
		},
		{
			"highlightColor": "error",
			"highlight": true,
			"class": { "root": "ring-error" }
		},
		{
			"highlightColor": "neutral",
			"highlight": true,
			"class": { "root": "ring-inverted" }
		},
		{
			"spotlightColor": "primary",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-primary)]" }
		},
		{
			"spotlightColor": "secondary",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-secondary)]" }
		},
		{
			"spotlightColor": "success",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-success)]" }
		},
		{
			"spotlightColor": "info",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-info)]" }
		},
		{
			"spotlightColor": "warning",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-warning)]" }
		},
		{
			"spotlightColor": "error",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-error)]" }
		},
		{
			"spotlightColor": "neutral",
			"spotlight": true,
			"class": { "root": "[--spotlight-color:var(--ui-bg-inverted)]" }
		}
	],
	"defaultVariants": {
		"variant": "outline",
		"highlightColor": "primary",
		"spotlightColor": "primary"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/PageCard.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UPageCard",
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
		description: {
			type: String,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "vertical"
		},
		reverse: {
			type: Boolean,
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
		spotlight: {
			type: Boolean,
			required: false
		},
		spotlightColor: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		to: {
			type: null,
			required: false
		},
		target: {
			type: [
				String,
				Object,
				null
			],
			required: false
		},
		onClick: {
			type: Function,
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
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("pageCard", _props);
		const cardRef = ref();
		const motionControl = pausableFilter();
		const appConfig = useAppConfig();
		const { elementX, elementY } = useMouseInElement(cardRef, { eventFilter: motionControl.eventFilter });
		const prefix = usePrefix();
		const spotlight = computed(() => props.spotlight && (elementX.value !== 0 || elementY.value !== 0));
		watch(() => props.spotlight, (value) => {
			if (value) motionControl.resume();
			else motionControl.pause();
		}, { immediate: true });
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_card_default,
			...appConfig.ui?.pageCard || {}
		})({
			orientation: props.orientation,
			reverse: props.reverse,
			variant: props.variant,
			to: !!props.to || !!props.onClick,
			title: !!props.title || !!slots.title,
			highlight: props.highlight,
			highlightColor: props.highlightColor,
			spotlight: spotlight.value,
			spotlightColor: props.spotlightColor
		}));
		const ariaLabel = computed(() => {
			return (slots.title && getSlotChildrenText(slots.title()) || props.title || "Card link").trim();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				ref_key: "cardRef",
				ref: cardRef,
				as: unref(props).as
			}, !unref(props).to ? _ctx.$attrs : {}, {
				"data-orientation": unref(props).orientation,
				"data-slot": _ctx.$attrs["data-slot"] ?? "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
				style: spotlight.value && {
					"--spotlight-x": `${unref(elementX)}px`,
					"--spotlight-y": `${unref(elementY)}px`
				},
				onClick: unref(props).onClick
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(props).spotlight) _push(`<div data-slot="spotlight" class="${ssrRenderClass(ui.value.spotlight({ class: unref(props).ui?.spotlight }))}"${_scopeId}></div>`);
						else _push(`<!---->`);
						_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
						if (!!slots.header || unref(props).icon || !!slots.leading || !!slots.body || unref(props).title || !!slots.title || unref(props).description || !!slots.description || !!slots.footer) {
							_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId}>`);
							if (!!slots.header) {
								_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent, _scopeId);
								_push(`</div>`);
							} else _push(`<!---->`);
							if (unref(props).icon || !!slots.leading) {
								_push(`<div data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
									if (unref(props).icon) _push(ssrRenderComponent(_sfc_main$2, {
										name: unref(props).icon,
										"data-slot": "leadingIcon",
										class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								_push(`</div>`);
							} else _push(`<!---->`);
							if (!!slots.body || unref(props).title || !!slots.title || unref(props).description || !!slots.description) {
								_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "body", {}, () => {
									if (unref(props).title || !!slots.title) {
										_push(`<div data-slot="title" class="${ssrRenderClass(ui.value.title({ class: unref(props).ui?.title }))}"${_scopeId}>`);
										ssrRenderSlot(_ctx.$slots, "title", {}, () => {
											_push(`${ssrInterpolate(unref(props).title)}`);
										}, _push, _parent, _scopeId);
										_push(`</div>`);
									} else _push(`<!---->`);
									if (unref(props).description || !!slots.description) {
										_push(`<div data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))}"${_scopeId}>`);
										ssrRenderSlot(_ctx.$slots, "description", {}, () => {
											_push(`${ssrInterpolate(unref(props).description)}`);
										}, _push, _parent, _scopeId);
										_push(`</div>`);
									} else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								_push(`</div>`);
							} else _push(`<!---->`);
							if (!!slots.footer) {
								_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						_push(`</div>`);
						if (unref(props).to) _push(ssrRenderComponent(_sfc_main$1, mergeProps({ "aria-label": ariaLabel.value }, {
							"to": unref(props).to,
							"target": unref(props).target,
							..._ctx.$attrs,
							"data-slot": void 0
						}, {
							class: unref(prefix)("focus:outline-none peer"),
							raw: ""
						}), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="${ssrRenderClass(unref(prefix)("absolute inset-0"))}" aria-hidden="true"${_scopeId}></span>`);
								else return [createVNode("span", {
									class: unref(prefix)("absolute inset-0"),
									"aria-hidden": "true"
								}, null, 2)];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						unref(props).spotlight ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "spotlight",
							class: ui.value.spotlight({ class: unref(props).ui?.spotlight })
						}, null, 2)) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "container",
							class: ui.value.container({ class: unref(props).ui?.container })
						}, [!!slots.header || unref(props).icon || !!slots.leading || !!slots.body || unref(props).title || !!slots.title || unref(props).description || !!slots.description || !!slots.footer ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "wrapper",
							class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
						}, [
							!!slots.header ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "header",
								class: ui.value.header({ class: unref(props).ui?.header })
							}, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("", true),
							unref(props).icon || !!slots.leading ? (openBlock(), createBlock("div", {
								key: 1,
								"data-slot": "leading",
								class: ui.value.leading({ class: unref(props).ui?.leading })
							}, [renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [unref(props).icon ? (openBlock(), createBlock(_sfc_main$2, {
								key: 0,
								name: unref(props).icon,
								"data-slot": "leadingIcon",
								class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
							}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
							!!slots.body || unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
								key: 2,
								"data-slot": "body",
								class: ui.value.body({ class: unref(props).ui?.body })
							}, [renderSlot(_ctx.$slots, "body", {}, () => [unref(props).title || !!slots.title ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "title",
								class: ui.value.title({ class: unref(props).ui?.title })
							}, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])], 2)) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
								key: 1,
								"data-slot": "description",
								class: ui.value.description({ class: unref(props).ui?.description })
							}, [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])], 2)) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
							!!slots.footer ? (openBlock(), createBlock("div", {
								key: 3,
								"data-slot": "footer",
								class: ui.value.footer({ class: unref(props).ui?.footer })
							}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
						], 2)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default")], 2),
						unref(props).to ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
							key: 1,
							"aria-label": ariaLabel.value
						}, {
							"to": unref(props).to,
							"target": unref(props).target,
							..._ctx.$attrs,
							"data-slot": void 0
						}, {
							class: unref(prefix)("focus:outline-none peer"),
							raw: ""
						}), {
							default: withCtx(() => [createVNode("span", {
								class: unref(prefix)("absolute inset-0"),
								"aria-hidden": "true"
							}, null, 2)]),
							_: 1
						}, 16, ["aria-label", "class"])) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/PageCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PageCard-a8nb0R2H.mjs.map
