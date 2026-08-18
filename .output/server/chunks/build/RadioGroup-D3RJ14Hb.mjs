import { al as useComponentProps, ag as useAppConfig, au as useForwardProps, a5 as reactivePick, as as useFormField, ad as tv, H as get, at as useForwardExpose, aL as useVModel, b as Primitive, aq as useEventListener, P as Presence_default, k as createContext } from '../virtual/entry.mjs';
import { u as useDirection, h as handleAndDispatchCustomEvent } from './PopperArrow-DMsSsDHm.mjs';
import { u as useFormControl } from './useFormControl-BySKHRcT.mjs';
import { u as useForwardScopeId } from './useForwardScopeId-BtHsXtbt.mjs';
import { V as VisuallyHiddenInput_default } from './VisuallyHiddenInput-Sg8ah3kl.mjs';
import { R as RovingFocusGroup_default } from './RovingFocusGroup-IgFceaG8.mjs';
import { R as RovingFocusItem_default } from './RovingFocusItem-BqfumUK1.mjs';
import { L as Label_default } from './FormField-DOShaxcI.mjs';
import { useSlots, useId, computed, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, renderSlot, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, defineComponent, toRefs, ref, withKeys, withModifiers, createElementBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { t as isEqual } from '../_/nitro.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/utils.js
var RADIO_SELECT = "radio.select";
function handleSelect(event, value, callback) {
	handleAndDispatchCustomEvent(RADIO_SELECT, callback, {
		originalEvent: event,
		value
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var Radio_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "Radio",
	props: {
		id: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		checked: {
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
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:checked", "select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const checked = useVModel(props, "checked", emits, { passive: props.checked === void 0 });
		const { value } = toRefs(props);
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const isFormControl = useFormControl(triggerElement);
		const scopeIdAttrs = useForwardScopeId();
		const ariaLabel = computed(() => props.id && triggerElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText ?? props.value : void 0);
		function handleClick(event) {
			if (props.disabled) return;
			handleSelect(event, props.value, (ev) => {
				emits("select", ev);
				if (ev?.defaultPrevented) return;
				checked.value = true;
				if (isFormControl.value) ev.stopPropagation();
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
				id: _ctx.id,
				ref: unref(forwardRef),
				role: "radio",
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"aria-checked": unref(checked) ?? false,
				"aria-label": ariaLabel.value,
				"as-child": _ctx.asChild,
				disabled: _ctx.disabled ? "" : void 0,
				"data-state": unref(checked) ? "checked" : "unchecked",
				"data-disabled": _ctx.disabled ? "" : void 0,
				value: unref(value),
				required: _ctx.required,
				name: _ctx.name
			}, {
				...unref(scopeIdAttrs),
				..._ctx.$attrs
			}, { onClick: withModifiers(handleClick, ["stop"]) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { checked: unref(checked) })]),
				_: 3
			}, 16, [
				"id",
				"type",
				"as",
				"aria-checked",
				"aria-label",
				"as-child",
				"disabled",
				"data-state",
				"data-disabled",
				"value",
				"required",
				"name"
			]), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), mergeProps({
				key: 0,
				type: "radio",
				tabindex: "-1",
				value: unref(value),
				checked: !!unref(checked),
				name: _ctx.name,
				disabled: _ctx.disabled,
				required: _ctx.required
			}, unref(scopeIdAttrs)), null, 16, [
				"value",
				"checked",
				"name",
				"disabled",
				"required"
			])) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/RadioGroupRoot.js
var [injectRadioGroupRootContext, provideRadioGroupRootContext] = /*#__PURE__*/ createContext("RadioGroupRoot");
var RadioGroupRoot_default = /* @__PURE__ */ defineComponent({
	__name: "RadioGroupRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		orientation: {
			type: String,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
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
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const { disabled, loop, orientation, name, required, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(currentElement);
		provideRadioGroupRootContext({
			modelValue,
			changeModelValue: (value) => {
				modelValue.value = value;
			},
			disabled,
			loop,
			orientation,
			name: name?.value,
			required
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				"as-child": "",
				orientation: unref(orientation),
				dir: unref(dir),
				loop: unref(loop)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "radiogroup",
					"data-disabled": unref(disabled) ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"aria-orientation": unref(orientation),
					"aria-required": unref(required),
					dir: unref(dir)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && unref(name) ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
						key: 0,
						required: unref(required),
						disabled: unref(disabled),
						value: unref(modelValue),
						name: unref(name)
					}, null, 8, [
						"required",
						"disabled",
						"value",
						"name"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 8, [
					"data-disabled",
					"as-child",
					"as",
					"aria-orientation",
					"aria-required",
					"dir"
				])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/RadioGroupItem.js
var [injectRadioGroupItemContext, provideRadiogroupItemContext] = /*#__PURE__*/ createContext("RadioGroupItem");
var RadioGroupItem_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "RadioGroupItem",
	props: {
		id: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: false
		},
		disabled: {
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
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectRadioGroupRootContext();
		const disabled = computed(() => rootContext.disabled.value || props.disabled);
		const required = computed(() => rootContext.required.value || props.required);
		const checked = computed(() => isEqual(rootContext.modelValue?.value, props.value));
		provideRadiogroupItemContext({
			disabled,
			checked
		});
		const isArrowKeyPressed = ref(false);
		const ARROW_KEYS = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		useEventListener("keydown", (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressed.value = true;
		});
		useEventListener("keyup", () => {
			isArrowKeyPressed.value = false;
		});
		function handleFocus() {
			setTimeout(() => {
				/**
				* Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
				* and we need to 'check' it in that case. We click it to 'check' it (instead
				* of updating `context.value`) so that the radio change event fires.
				*/
				if (isArrowKeyPressed.value) currentElement.value?.click();
			}, 0);
		}
		const scopeIdAttrs = useForwardScopeId();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				checked: checked.value,
				disabled: disabled.value,
				"as-child": "",
				focusable: !disabled.value,
				active: checked.value
			}, {
				default: withCtx(() => [createVNode(Radio_default, mergeProps({
					...unref(scopeIdAttrs),
					..._ctx.$attrs,
					...props
				}, {
					ref: unref(forwardRef),
					checked: checked.value,
					required: required.value,
					disabled: disabled.value,
					"onUpdate:checked": _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(_ctx.value)),
					onSelect: _cache[1] || (_cache[1] = ($event) => emits("select", $event)),
					onKeydown: _cache[2] || (_cache[2] = withKeys(withModifiers(() => {}, ["prevent"]), ["enter"])),
					onFocus: handleFocus
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						checked: checked.value,
						required: required.value,
						disabled: disabled.value
					})]),
					_: 3
				}, 16, [
					"checked",
					"required",
					"disabled"
				])]),
				_: 3
			}, 8, [
				"checked",
				"disabled",
				"focusable",
				"active"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/RadioGroupIndicator.js
var RadioGroupIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "RadioGroupIndicator",
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
		const { forwardRef } = useForwardExpose();
		const itemContext = injectRadioGroupItemContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(itemContext).checked.value }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(itemContext).checked.value ? "checked" : "unchecked",
					"data-disabled": unref(itemContext).disabled.value ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"data-state",
					"data-disabled",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fradio-group.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fradio_group_default = {
	"slots": {
		"root": "relative",
		"fieldset": "flex gap-x-2",
		"legend": "mb-1 block font-medium text-default",
		"item": "flex items-start",
		"container": "flex items-center",
		"base": "rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-3",
		"indicator": "flex items-center justify-center size-full after:bg-default after:rounded-full",
		"wrapper": "w-full",
		"label": "block font-medium text-default",
		"description": "text-muted"
	},
	"variants": {
		"color": {
			"primary": {
				"base": "outline-primary/25 focus-visible:ring-primary",
				"indicator": "bg-primary"
			},
			"secondary": {
				"base": "outline-secondary/25 focus-visible:ring-secondary",
				"indicator": "bg-secondary"
			},
			"success": {
				"base": "outline-success/25 focus-visible:ring-success",
				"indicator": "bg-success"
			},
			"info": {
				"base": "outline-info/25 focus-visible:ring-info",
				"indicator": "bg-info"
			},
			"warning": {
				"base": "outline-warning/25 focus-visible:ring-warning",
				"indicator": "bg-warning"
			},
			"error": {
				"base": "outline-error/25 focus-visible:ring-error",
				"indicator": "bg-error"
			},
			"neutral": {
				"base": "outline-inverted/25 focus-visible:ring-inverted",
				"indicator": "bg-inverted"
			}
		},
		"variant": {
			"list": { "item": "" },
			"card": { "item": "border border-muted rounded-lg" },
			"table": { "item": "border border-muted" }
		},
		"orientation": {
			"horizontal": { "fieldset": "flex-row" },
			"vertical": { "fieldset": "flex-col" }
		},
		"indicator": {
			"start": {
				"item": "flex-row",
				"wrapper": "ms-2"
			},
			"end": {
				"item": "flex-row-reverse",
				"wrapper": "me-2"
			},
			"hidden": {
				"base": "sr-only",
				"wrapper": "text-center"
			}
		},
		"size": {
			"xs": {
				"fieldset": "gap-y-0.5",
				"legend": "text-xs",
				"base": "size-3",
				"item": "text-xs",
				"container": "h-4",
				"indicator": "after:size-1"
			},
			"sm": {
				"fieldset": "gap-y-0.5",
				"legend": "text-xs",
				"base": "size-3.5",
				"item": "text-xs",
				"container": "h-4",
				"indicator": "after:size-1"
			},
			"md": {
				"fieldset": "gap-y-1",
				"legend": "text-sm",
				"base": "size-4",
				"item": "text-sm",
				"container": "h-5",
				"indicator": "after:size-1.5"
			},
			"lg": {
				"fieldset": "gap-y-1",
				"legend": "text-sm",
				"base": "size-4.5",
				"item": "text-sm",
				"container": "h-5",
				"indicator": "after:size-1.5"
			},
			"xl": {
				"fieldset": "gap-y-1.5",
				"legend": "text-base",
				"base": "size-5",
				"item": "text-base",
				"container": "h-6",
				"indicator": "after:size-2"
			}
		},
		"highlight": { "true": "" },
		"disabled": { "true": {
			"item": "opacity-75",
			"base": "cursor-not-allowed",
			"label": "cursor-not-allowed",
			"description": "cursor-not-allowed"
		} },
		"required": { "true": { "legend": "after:content-['*'] after:ms-0.5 after:text-error" } }
	},
	"compoundVariants": [
		{
			"size": "xs",
			"variant": ["card", "table"],
			"class": { "item": "p-2.5" }
		},
		{
			"size": "sm",
			"variant": ["card", "table"],
			"class": { "item": "p-3" }
		},
		{
			"size": "md",
			"variant": ["card", "table"],
			"class": { "item": "p-3.5" }
		},
		{
			"size": "lg",
			"variant": ["card", "table"],
			"class": { "item": "p-4" }
		},
		{
			"size": "xl",
			"variant": ["card", "table"],
			"class": { "item": "p-4.5" }
		},
		{
			"orientation": "horizontal",
			"variant": "table",
			"class": {
				"item": "first-of-type:rounded-s-lg last-of-type:rounded-e-lg",
				"fieldset": "gap-0 -space-x-px"
			}
		},
		{
			"orientation": "vertical",
			"variant": "table",
			"class": {
				"item": "first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
				"fieldset": "gap-0 -space-y-px"
			}
		},
		{
			"color": "primary",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-primary" }
		},
		{
			"color": "secondary",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-secondary" }
		},
		{
			"color": "success",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-success" }
		},
		{
			"color": "info",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-info" }
		},
		{
			"color": "warning",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-warning" }
		},
		{
			"color": "error",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-error" }
		},
		{
			"color": "neutral",
			"variant": "card",
			"class": { "item": "has-data-[state=checked]:border-inverted" }
		},
		{
			"color": "primary",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"color": "secondary",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-secondary/10 has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"color": "success",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-success/10 has-data-[state=checked]:border-success/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"color": "info",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-info/10 has-data-[state=checked]:border-info/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"color": "warning",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-warning/10 has-data-[state=checked]:border-warning/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"color": "error",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-error/10 has-data-[state=checked]:border-error/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"color": "neutral",
			"variant": "table",
			"class": { "item": "has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]" }
		},
		{
			"variant": ["card", "table"],
			"disabled": true,
			"class": { "item": "cursor-not-allowed" }
		},
		{
			"color": "primary",
			"highlight": true,
			"class": { "base": "ring-primary" }
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": { "base": "ring-secondary" }
		},
		{
			"color": "success",
			"highlight": true,
			"class": { "base": "ring-success" }
		},
		{
			"color": "info",
			"highlight": true,
			"class": { "base": "ring-info" }
		},
		{
			"color": "warning",
			"highlight": true,
			"class": { "base": "ring-warning" }
		},
		{
			"color": "error",
			"highlight": true,
			"class": { "base": "ring-error" }
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": { "base": "ring-inverted" }
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "list",
		"indicator": "start"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/RadioGroup.vue
var _sfc_main = {
	__name: "URadioGroup",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		legend: {
			type: String,
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
		descriptionKey: {
			type: null,
			required: false,
			default: "description"
		},
		items: {
			type: null,
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
		size: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "vertical"
		},
		indicator: {
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
		disabled: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["change", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("radioGroup", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "loop", "required"), emits);
		const { emitFormChange, emitFormInput, color, name, size, highlight, id: _id, disabled, ariaAttrs } = useFormField(_props, { bind: false });
		const id = _id.value ?? useId();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fradio_group_default,
			...appConfig.ui?.radioGroup || {}
		})({
			size: size.value ?? props.size,
			color: color.value ?? props.color,
			highlight: highlight.value ?? props.highlight,
			disabled: disabled.value,
			required: props.required,
			orientation: props.orientation,
			variant: props.variant,
			indicator: props.indicator
		}));
		function normalizeItem(item) {
			if (item === null) return {
				id: `${id}:null`,
				value: void 0,
				label: void 0
			};
			if (typeof item === "string" || typeof item === "number" || typeof item === "bigint") return {
				id: `${id}:${item}`,
				value: String(item),
				label: String(item)
			};
			const value = get(item, props.valueKey);
			const label = get(item, props.labelKey);
			const description = get(item, props.descriptionKey);
			return {
				...item,
				value,
				label,
				description,
				id: `${id}:${value}`
			};
		}
		const normalizedItems = computed(() => {
			if (!props.items) return [];
			return props.items.map(normalizeItem);
		});
		function onUpdate(value) {
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(RadioGroupRoot_default), mergeProps({ id: unref(id) }, unref(rootProps), {
				"model-value": unref(props).modelValue,
				"default-value": unref(props).defaultValue,
				orientation: unref(props).orientation,
				name: unref(name),
				disabled: unref(disabled),
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
				"onUpdate:modelValue": onUpdate
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<fieldset${ssrRenderAttrs(mergeProps({
							"data-slot": "fieldset",
							class: ui.value.fieldset({ class: unref(props).ui?.fieldset })
						}, unref(ariaAttrs)))}${_scopeId}>`);
						if (unref(props).legend || !!slots.legend) {
							_push(`<legend data-slot="legend" class="${ssrRenderClass(ui.value.legend({ class: unref(props).ui?.legend }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "legend", {}, () => {
								_push(`${ssrInterpolate(unref(props).legend)}`);
							}, _push, _parent, _scopeId);
							_push(`</legend>`);
						} else _push(`<!---->`);
						_push(`<!--[-->`);
						ssrRenderList(normalizedItems.value, (item) => {
							ssrRenderVNode(_push, createVNode(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? "div" : unref(Label_default)), {
								key: item.value,
								"data-slot": "item",
								class: ui.value.item({
									class: [
										unref(props).ui?.item,
										item.ui?.item,
										item.class
									],
									disabled: item.disabled || unref(disabled)
								})
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: [unref(props).ui?.container, item.ui?.container] }))}"${_scopeId}>`);
										_push(ssrRenderComponent(unref(RadioGroupItem_default), {
											id: item.id,
											value: item.value,
											disabled: item.disabled || unref(disabled),
											"data-slot": "base",
											class: ui.value.base({
												class: [unref(props).ui?.base, item.ui?.base],
												disabled: item.disabled || unref(disabled)
											})
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(unref(RadioGroupIndicator_default), {
													"data-slot": "indicator",
													class: ui.value.indicator({ class: [unref(props).ui?.indicator, item.ui?.indicator] })
												}, null, _parent, _scopeId));
												else return [createVNode(unref(RadioGroupIndicator_default), {
													"data-slot": "indicator",
													class: ui.value.indicator({ class: [unref(props).ui?.indicator, item.ui?.indicator] })
												}, null, 8, ["class"])];
											}),
											_: 2
										}, _parent, _scopeId));
										_push(`</div>`);
										if (item.label || !!slots.label || item.description || !!slots.description) {
											_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: [unref(props).ui?.wrapper, item.ui?.wrapper] }))}"${_scopeId}>`);
											if (item.label || !!slots.label) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
												for: item.id,
												"data-slot": "label",
												class: ui.value.label({
													class: [unref(props).ui?.label, item.ui?.label],
													disabled: item.disabled || unref(disabled)
												})
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) ssrRenderSlot(_ctx.$slots, "label", {
														item,
														modelValue: unref(props).modelValue
													}, () => {
														_push(`${ssrInterpolate(item.label)}`);
													}, _push, _parent, _scopeId);
													else return [renderSlot(_ctx.$slots, "label", {
														item,
														modelValue: unref(props).modelValue
													}, () => [createTextVNode(toDisplayString(item.label), 1)])];
												}),
												_: 2
											}), _parent, _scopeId);
											else _push(`<!---->`);
											if (item.description || !!slots.description) {
												_push(`<p data-slot="description" class="${ssrRenderClass(ui.value.description({
													class: [unref(props).ui?.description, item.ui?.description],
													disabled: item.disabled || unref(disabled)
												}))}"${_scopeId}>`);
												ssrRenderSlot(_ctx.$slots, "description", {
													item,
													modelValue: unref(props).modelValue
												}, () => {
													_push(`${ssrInterpolate(item.description)}`);
												}, _push, _parent, _scopeId);
												_push(`</p>`);
											} else _push(`<!---->`);
											_push(`</div>`);
										} else _push(`<!---->`);
									} else return [createVNode("div", {
										"data-slot": "container",
										class: ui.value.container({ class: [unref(props).ui?.container, item.ui?.container] })
									}, [createVNode(unref(RadioGroupItem_default), {
										id: item.id,
										value: item.value,
										disabled: item.disabled || unref(disabled),
										"data-slot": "base",
										class: ui.value.base({
											class: [unref(props).ui?.base, item.ui?.base],
											disabled: item.disabled || unref(disabled)
										})
									}, {
										default: withCtx(() => [createVNode(unref(RadioGroupIndicator_default), {
											"data-slot": "indicator",
											class: ui.value.indicator({ class: [unref(props).ui?.indicator, item.ui?.indicator] })
										}, null, 8, ["class"])]),
										_: 2
									}, 1032, [
										"id",
										"value",
										"disabled",
										"class"
									])], 2), item.label || !!slots.label || item.description || !!slots.description ? (openBlock(), createBlock("div", {
										key: 0,
										"data-slot": "wrapper",
										class: ui.value.wrapper({ class: [unref(props).ui?.wrapper, item.ui?.wrapper] })
									}, [item.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
										key: 0,
										for: item.id,
										"data-slot": "label",
										class: ui.value.label({
											class: [unref(props).ui?.label, item.ui?.label],
											disabled: item.disabled || unref(disabled)
										})
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "label", {
											item,
											modelValue: unref(props).modelValue
										}, () => [createTextVNode(toDisplayString(item.label), 1)])]),
										_: 2
									}, 1032, ["for", "class"])) : createCommentVNode("", true), item.description || !!slots.description ? (openBlock(), createBlock("p", {
										key: 1,
										"data-slot": "description",
										class: ui.value.description({
											class: [unref(props).ui?.description, item.ui?.description],
											disabled: item.disabled || unref(disabled)
										})
									}, [renderSlot(_ctx.$slots, "description", {
										item,
										modelValue: unref(props).modelValue
									}, () => [createTextVNode(toDisplayString(item.description), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)];
								}),
								_: 2
							}), _parent, _scopeId);
						});
						_push(`<!--]--></fieldset>`);
					} else return [createVNode("fieldset", mergeProps({
						"data-slot": "fieldset",
						class: ui.value.fieldset({ class: unref(props).ui?.fieldset })
					}, unref(ariaAttrs)), [unref(props).legend || !!slots.legend ? (openBlock(), createBlock("legend", {
						key: 0,
						"data-slot": "legend",
						class: ui.value.legend({ class: unref(props).ui?.legend })
					}, [renderSlot(_ctx.$slots, "legend", {}, () => [createTextVNode(toDisplayString(unref(props).legend), 1)])], 2)) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(normalizedItems.value, (item) => {
						return openBlock(), createBlock(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? "div" : unref(Label_default)), {
							key: item.value,
							"data-slot": "item",
							class: ui.value.item({
								class: [
									unref(props).ui?.item,
									item.ui?.item,
									item.class
								],
								disabled: item.disabled || unref(disabled)
							})
						}, {
							default: withCtx(() => [createVNode("div", {
								"data-slot": "container",
								class: ui.value.container({ class: [unref(props).ui?.container, item.ui?.container] })
							}, [createVNode(unref(RadioGroupItem_default), {
								id: item.id,
								value: item.value,
								disabled: item.disabled || unref(disabled),
								"data-slot": "base",
								class: ui.value.base({
									class: [unref(props).ui?.base, item.ui?.base],
									disabled: item.disabled || unref(disabled)
								})
							}, {
								default: withCtx(() => [createVNode(unref(RadioGroupIndicator_default), {
									"data-slot": "indicator",
									class: ui.value.indicator({ class: [unref(props).ui?.indicator, item.ui?.indicator] })
								}, null, 8, ["class"])]),
								_: 2
							}, 1032, [
								"id",
								"value",
								"disabled",
								"class"
							])], 2), item.label || !!slots.label || item.description || !!slots.description ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "wrapper",
								class: ui.value.wrapper({ class: [unref(props).ui?.wrapper, item.ui?.wrapper] })
							}, [item.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
								key: 0,
								for: item.id,
								"data-slot": "label",
								class: ui.value.label({
									class: [unref(props).ui?.label, item.ui?.label],
									disabled: item.disabled || unref(disabled)
								})
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "label", {
									item,
									modelValue: unref(props).modelValue
								}, () => [createTextVNode(toDisplayString(item.label), 1)])]),
								_: 2
							}, 1032, ["for", "class"])) : createCommentVNode("", true), item.description || !!slots.description ? (openBlock(), createBlock("p", {
								key: 1,
								"data-slot": "description",
								class: ui.value.description({
									class: [unref(props).ui?.description, item.ui?.description],
									disabled: item.disabled || unref(disabled)
								})
							}, [renderSlot(_ctx.$slots, "description", {
								item,
								modelValue: unref(props).modelValue
							}, () => [createTextVNode(toDisplayString(item.description), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)]),
							_: 2
						}, 1032, ["class"]);
					}), 128))], 16)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/RadioGroup.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RadioGroup-D3RJ14Hb.mjs.map
