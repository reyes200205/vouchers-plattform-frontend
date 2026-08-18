import { al as useComponentProps, ag as useAppConfig, ad as tv, b as Primitive } from '../virtual/entry.mjs';
import { useSlots, computed, unref, mergeProps, withCtx, openBlock, createBlock, renderSlot, createTextVNode, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcard.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcard_default = {
	"slots": {
		"root": "rounded-lg overflow-hidden",
		"header": "p-4 sm:px-6",
		"title": "text-highlighted font-semibold",
		"description": "mt-1 text-muted text-sm",
		"body": "p-4 sm:p-6",
		"footer": "p-4 sm:px-6"
	},
	"variants": { "variant": {
		"solid": {
			"root": "bg-inverted text-inverted",
			"title": "text-inverted",
			"description": "text-dimmed"
		},
		"outline": { "root": "bg-default ring ring-default divide-y divide-default" },
		"soft": { "root": "bg-elevated/50 divide-y divide-default" },
		"subtle": { "root": "bg-elevated/50 ring ring-default divide-y divide-default" }
	} },
	"defaultVariants": { "variant": "outline" }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Card.vue
var _sfc_main = {
	__name: "UCard",
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
		variant: {
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
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("card", _props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcard_default,
			...appConfig.ui?.card || {}
		})({ variant: props.variant }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description) {
							_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(props).ui?.header }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "header", {}, () => {
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
						if (!!slots.default) {
							_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
						if (!!slots.footer) {
							_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(props).ui?.footer }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [
						!!slots.header || unref(props).title || !!slots.title || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "header",
							class: ui.value.header({ class: unref(props).ui?.header })
						}, [renderSlot(_ctx.$slots, "header", {}, () => [unref(props).title || !!slots.title ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "title",
							class: ui.value.title({ class: unref(props).ui?.title })
						}, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])], 2)) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
							key: 1,
							"data-slot": "description",
							class: ui.value.description({ class: unref(props).ui?.description })
						}, [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])], 2)) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
						!!slots.default ? (openBlock(), createBlock("div", {
							key: 1,
							"data-slot": "body",
							class: ui.value.body({ class: unref(props).ui?.body })
						}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("", true),
						!!slots.footer ? (openBlock(), createBlock("div", {
							key: 2,
							"data-slot": "footer",
							class: ui.value.footer({ class: unref(props).ui?.footer })
						}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Card-qzRCEhtm.mjs.map
