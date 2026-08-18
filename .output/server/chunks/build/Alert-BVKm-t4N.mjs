import { am as useComponentProps, ax as useLocale, ag as useAppConfig, ad as tv, b as Primitive, i as _sfc_main$8, g as _sfc_main$2, h as _sfc_main$7 } from '../virtual/entry.mjs';
import { useSlots, computed, unref, mergeProps, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Falert.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Falert_default = {
	"slots": {
		"root": "relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5",
		"wrapper": "min-w-0 flex-1 flex flex-col",
		"title": "text-sm font-medium",
		"description": "text-sm opacity-90",
		"icon": "shrink-0 size-5",
		"avatar": "shrink-0",
		"avatarSize": "2xl",
		"actions": "flex flex-wrap gap-1.5 shrink-0",
		"close": "p-0"
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
		"variant": {
			"solid": "",
			"outline": "",
			"soft": "",
			"subtle": ""
		},
		"orientation": {
			"horizontal": {
				"root": "items-center",
				"actions": "items-center"
			},
			"vertical": {
				"root": "items-start",
				"actions": "items-start mt-2.5"
			}
		},
		"title": { "true": { "description": "mt-1" } }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": "solid",
			"class": { "root": "bg-primary text-inverted" }
		},
		{
			"color": "secondary",
			"variant": "solid",
			"class": { "root": "bg-secondary text-inverted" }
		},
		{
			"color": "success",
			"variant": "solid",
			"class": { "root": "bg-success text-inverted" }
		},
		{
			"color": "info",
			"variant": "solid",
			"class": { "root": "bg-info text-inverted" }
		},
		{
			"color": "warning",
			"variant": "solid",
			"class": { "root": "bg-warning text-inverted" }
		},
		{
			"color": "error",
			"variant": "solid",
			"class": { "root": "bg-error text-inverted" }
		},
		{
			"color": "primary",
			"variant": "outline",
			"class": { "root": "text-primary ring ring-inset ring-primary/25" }
		},
		{
			"color": "secondary",
			"variant": "outline",
			"class": { "root": "text-secondary ring ring-inset ring-secondary/25" }
		},
		{
			"color": "success",
			"variant": "outline",
			"class": { "root": "text-success ring ring-inset ring-success/25" }
		},
		{
			"color": "info",
			"variant": "outline",
			"class": { "root": "text-info ring ring-inset ring-info/25" }
		},
		{
			"color": "warning",
			"variant": "outline",
			"class": { "root": "text-warning ring ring-inset ring-warning/25" }
		},
		{
			"color": "error",
			"variant": "outline",
			"class": { "root": "text-error ring ring-inset ring-error/25" }
		},
		{
			"color": "primary",
			"variant": "soft",
			"class": { "root": "bg-primary/10 text-primary" }
		},
		{
			"color": "secondary",
			"variant": "soft",
			"class": { "root": "bg-secondary/10 text-secondary" }
		},
		{
			"color": "success",
			"variant": "soft",
			"class": { "root": "bg-success/10 text-success" }
		},
		{
			"color": "info",
			"variant": "soft",
			"class": { "root": "bg-info/10 text-info" }
		},
		{
			"color": "warning",
			"variant": "soft",
			"class": { "root": "bg-warning/10 text-warning" }
		},
		{
			"color": "error",
			"variant": "soft",
			"class": { "root": "bg-error/10 text-error" }
		},
		{
			"color": "primary",
			"variant": "subtle",
			"class": { "root": "bg-primary/10 text-primary ring ring-inset ring-primary/25" }
		},
		{
			"color": "secondary",
			"variant": "subtle",
			"class": { "root": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25" }
		},
		{
			"color": "success",
			"variant": "subtle",
			"class": { "root": "bg-success/10 text-success ring ring-inset ring-success/25" }
		},
		{
			"color": "info",
			"variant": "subtle",
			"class": { "root": "bg-info/10 text-info ring ring-inset ring-info/25" }
		},
		{
			"color": "warning",
			"variant": "subtle",
			"class": { "root": "bg-warning/10 text-warning ring ring-inset ring-warning/25" }
		},
		{
			"color": "error",
			"variant": "subtle",
			"class": { "root": "bg-error/10 text-error ring ring-inset ring-error/25" }
		},
		{
			"color": "neutral",
			"variant": "solid",
			"class": { "root": "text-inverted bg-inverted" }
		},
		{
			"color": "neutral",
			"variant": "outline",
			"class": { "root": "text-highlighted bg-default ring ring-inset ring-default" }
		},
		{
			"color": "neutral",
			"variant": "soft",
			"class": { "root": "text-highlighted bg-elevated/50" }
		},
		{
			"color": "neutral",
			"variant": "subtle",
			"class": { "root": "text-highlighted bg-elevated/50 ring ring-inset ring-accented" }
		}
	],
	"defaultVariants": {
		"color": "primary",
		"variant": "solid"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Alert.vue
var _sfc_main = {
	__name: "UAlert",
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
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
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
			default: "vertical"
		},
		actions: {
			type: Array,
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
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("alert", _props);
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Falert_default,
			...appConfig.ui?.alert || {}
		})({
			color: props.color,
			variant: props.variant,
			orientation: props.orientation,
			title: !!props.title || !!slots.title
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-orientation": unref(props).orientation,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
							if (unref(props).avatar) _push(ssrRenderComponent(_sfc_main$8, mergeProps({ size: unref(props).ui?.avatarSize || ui.value.avatarSize() }, unref(props).avatar, {
								"data-slot": "avatar",
								class: ui.value.avatar({ class: unref(props).ui?.avatar })
							}), null, _parent, _scopeId));
							else if (unref(props).icon) _push(ssrRenderComponent(_sfc_main$2, {
								name: unref(props).icon,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId}>`);
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
						if (unref(props).orientation === "vertical" && (unref(props).actions?.length || !!slots.actions)) {
							_push(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({ class: unref(props).ui?.actions }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
								_push(`<!--[-->`);
								ssrRenderList(unref(props).actions, (action, index) => {
									_push(ssrRenderComponent(_sfc_main$7, mergeProps({
										key: index,
										size: "xs"
									}, { ref_for: true }, action), null, _parent, _scopeId));
								});
								_push(`<!--]-->`);
							}, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
						if (unref(props).orientation === "horizontal" && (unref(props).actions?.length || !!slots.actions) || unref(props).close) {
							_push(`<div data-slot="actions" class="${ssrRenderClass(ui.value.actions({
								class: unref(props).ui?.actions,
								orientation: "horizontal"
							}))}"${_scopeId}>`);
							if (unref(props).orientation === "horizontal" && (unref(props).actions?.length || !!slots.actions)) ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
								_push(`<!--[-->`);
								ssrRenderList(unref(props).actions, (action, index) => {
									_push(ssrRenderComponent(_sfc_main$7, mergeProps({
										key: index,
										size: "xs"
									}, { ref_for: true }, action), null, _parent, _scopeId));
								});
								_push(`<!--]-->`);
							}, _push, _parent, _scopeId);
							else _push(`<!---->`);
							ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
								if (unref(props).close) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
									icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
									color: "neutral",
									variant: "link",
									"aria-label": unref(t)("alert.close")
								}, typeof unref(props).close === "object" ? unref(props).close : {}, {
									"data-slot": "close",
									class: ui.value.close({ class: unref(props).ui?.close }),
									onClick: ($event) => emits("update:open", false)
								}), null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [
						renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [unref(props).avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
							key: 0,
							size: unref(props).ui?.avatarSize || ui.value.avatarSize()
						}, unref(props).avatar, {
							"data-slot": "avatar",
							class: ui.value.avatar({ class: unref(props).ui?.avatar })
						}), null, 16, ["size", "class"])) : unref(props).icon ? (openBlock(), createBlock(_sfc_main$2, {
							key: 1,
							name: unref(props).icon,
							"data-slot": "icon",
							class: ui.value.icon({ class: unref(props).ui?.icon })
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)]),
						createVNode("div", {
							"data-slot": "wrapper",
							class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
						}, [
							unref(props).title || !!slots.title ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "title",
								class: ui.value.title({ class: unref(props).ui?.title })
							}, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(unref(props).title), 1)])], 2)) : createCommentVNode("", true),
							unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
								key: 1,
								"data-slot": "description",
								class: ui.value.description({ class: unref(props).ui?.description })
							}, [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(unref(props).description), 1)])], 2)) : createCommentVNode("", true),
							unref(props).orientation === "vertical" && (unref(props).actions?.length || !!slots.actions) ? (openBlock(), createBlock("div", {
								key: 2,
								"data-slot": "actions",
								class: ui.value.actions({ class: unref(props).ui?.actions })
							}, [renderSlot(_ctx.$slots, "actions", {}, () => [(openBlock(true), createBlock(Fragment, null, renderList(unref(props).actions, (action, index) => {
								return openBlock(), createBlock(_sfc_main$7, mergeProps({
									key: index,
									size: "xs"
								}, { ref_for: true }, action), null, 16);
							}), 128))])], 2)) : createCommentVNode("", true)
						], 2),
						unref(props).orientation === "horizontal" && (unref(props).actions?.length || !!slots.actions) || unref(props).close ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "actions",
							class: ui.value.actions({
								class: unref(props).ui?.actions,
								orientation: "horizontal"
							})
						}, [unref(props).orientation === "horizontal" && (unref(props).actions?.length || !!slots.actions) ? renderSlot(_ctx.$slots, "actions", {}, () => [(openBlock(true), createBlock(Fragment, null, renderList(unref(props).actions, (action, index) => {
							return openBlock(), createBlock(_sfc_main$7, mergeProps({
								key: index,
								size: "xs"
							}, { ref_for: true }, action), null, 16);
						}), 128))], void 0, 0) : createCommentVNode("", true), renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [unref(props).close ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
							key: 0,
							icon: unref(props).closeIcon || unref(appConfig).ui.icons.close,
							color: "neutral",
							variant: "link",
							"aria-label": unref(t)("alert.close")
						}, typeof unref(props).close === "object" ? unref(props).close : {}, {
							"data-slot": "close",
							class: ui.value.close({ class: unref(props).ui?.close }),
							onClick: ($event) => emits("update:open", false)
						}), null, 16, [
							"icon",
							"aria-label",
							"class",
							"onClick"
						])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Alert.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Alert-BVKm-t4N.mjs.map
