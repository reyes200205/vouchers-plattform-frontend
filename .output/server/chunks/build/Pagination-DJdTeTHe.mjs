import { al as useComponentProps, ag as useAppConfig, au as useForwardProps, a5 as reactivePick, as as useFormField, ad as tv, b as Primitive, g as _sfc_main$2, aw as useLocale, h as _sfc_main$7, at as useForwardExpose, aL as useVModel, U as isNullish, P as Presence_default, k as createContext } from '../virtual/entry.mjs';
import { i as isValueEqualOrExist } from './isValueEqualOrExist-BW-U-ShA.mjs';
import { u as useFormControl } from './useFormControl-BySKHRcT.mjs';
import { u as useForwardScopeId } from './useForwardScopeId-BtHsXtbt.mjs';
import { V as VisuallyHiddenInput_default } from './VisuallyHiddenInput-Sg8ah3kl.mjs';
import { R as RovingFocusItem_default } from './RovingFocusItem-BqfumUK1.mjs';
import { L as Label_default } from './FormField-DOShaxcI.mjs';
import { useSlots, useId, useAttrs, computed, unref, mergeProps, withCtx, openBlock, createBlock, createVNode, resolveDynamicComponent, renderSlot, createTextVNode, toDisplayString, createCommentVNode, Fragment, renderList, defineComponent, createElementBlock, withKeys, withModifiers, toRefs, normalizeProps, guardReactiveProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { t as isEqual } from '../_/nitro.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxGroupRoot.js
var [injectCheckboxGroupRootContext] = /*#__PURE__*/ createContext("CheckboxGroupRoot");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [injectCheckboxRootContext, provideCheckboxRootContext] = /*#__PURE__*/ createContext("CheckboxRoot");
var CheckboxRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CheckboxRoot",
	props: {
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		value: {
			type: null,
			required: false,
			default: "on"
		},
		id: {
			type: String,
			required: false
		},
		trueValue: {
			type: null,
			required: false,
			default: () => true
		},
		falseValue: {
			type: null,
			required: false,
			default: () => false
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const checkboxGroupContext = injectCheckboxGroupRootContext(null);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? props.falseValue,
			passive: props.modelValue === void 0
		});
		const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);
		const isChecked = computed(() => isEqual(modelValue.value, props.trueValue));
		const checkboxState = computed(() => {
			if (!isNullish(checkboxGroupContext?.modelValue.value)) return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
			else {
				if (modelValue.value === "indeterminate") return "indeterminate";
				return isChecked.value;
			}
		});
		function handleClick() {
			if (!isNullish(checkboxGroupContext?.modelValue.value)) {
				const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
				if (isValueEqualOrExist(modelValueArray, props.value)) {
					const index = modelValueArray.findIndex((i) => isEqual(i, props.value));
					modelValueArray.splice(index, 1);
				} else modelValueArray.push(props.value);
				checkboxGroupContext.modelValue.value = modelValueArray;
			} else if (modelValue.value === "indeterminate") modelValue.value = props.trueValue;
			else modelValue.value = isChecked.value ? props.falseValue : props.trueValue;
		}
		const isFormControl = useFormControl(currentElement);
		const scopeIdAttrs = useForwardScopeId();
		const attrs = useAttrs();
		const ariaLabel = computed(() => {
			if (attrs["aria-label"]) return void 0;
			return props.id && currentElement.value ? (void 0).querySelector(`[for="${props.id}"]`)?.innerText : void 0;
		});
		provideCheckboxRootContext({
			disabled,
			state: checkboxState
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [(openBlock(), createBlock(resolveDynamicComponent(unref(checkboxGroupContext)?.rovingFocus.value ? unref(RovingFocusItem_default) : unref(Primitive)), mergeProps({
				..._ctx.$attrs,
				...unref(scopeIdAttrs)
			}, {
				id: _ctx.id,
				ref: unref(forwardRef),
				role: "checkbox",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				type: _ctx.as === "button" ? "button" : void 0,
				"aria-checked": unref(isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
				"aria-required": _ctx.required,
				"aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
				"data-state": unref(getState)(checkboxState.value),
				"data-disabled": disabled.value ? "" : void 0,
				disabled: disabled.value,
				focusable: unref(checkboxGroupContext)?.rovingFocus.value ? !disabled.value : void 0,
				onKeydown: withKeys(withModifiers(() => {}, ["prevent"]), ["enter"]),
				onClick: handleClick
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					state: checkboxState.value
				})]),
				_: 3
			}, 16, [
				"id",
				"as-child",
				"as",
				"type",
				"aria-checked",
				"aria-required",
				"aria-label",
				"data-state",
				"data-disabled",
				"disabled",
				"focusable",
				"onKeydown"
			])), unref(isFormControl) && _ctx.name && !unref(checkboxGroupContext) ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), mergeProps({
				key: 0,
				type: "checkbox",
				checked: !!checkboxState.value,
				name: _ctx.name,
				value: _ctx.value,
				disabled: disabled.value,
				required: _ctx.required
			}, unref(scopeIdAttrs)), null, 16, [
				"checked",
				"name",
				"value",
				"disabled",
				"required"
			])) : createCommentVNode("v-if", true)], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxIndicator.js
var CheckboxIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "CheckboxIndicator",
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
		const rootContext = injectCheckboxRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate)(unref(rootContext).state.value) || unref(rootContext).state.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(getState)(unref(rootContext).state.value),
					"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
					style: { pointerEvents: "none" },
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationEllipsis.js
var PaginationEllipsis_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationEllipsis",
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
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "data-type": "ellipsis" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createTextVNode("…"))])]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationRoot.js
var [injectPaginationRootContext, providePaginationRootContext] = /*#__PURE__*/ createContext("PaginationRoot");
var PaginationRoot_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationRoot",
	props: {
		page: {
			type: Number,
			required: false
		},
		defaultPage: {
			type: Number,
			required: false,
			default: 1
		},
		itemsPerPage: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: false,
			default: 0
		},
		siblingCount: {
			type: Number,
			required: false,
			default: 2
		},
		disabled: {
			type: Boolean,
			required: false
		},
		showEdges: {
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
			default: "nav"
		}
	},
	emits: ["update:page"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { siblingCount, disabled, showEdges } = toRefs(props);
		useForwardExpose();
		const page = useVModel(props, "page", emits, {
			defaultValue: props.defaultPage,
			passive: props.page === void 0
		});
		const pageCount = computed(() => Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))));
		providePaginationRootContext({
			page,
			onPageChange(value) {
				page.value = value;
			},
			pageCount,
			siblingCount,
			disabled,
			showEdges
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					page: unref(page),
					pageCount: pageCount.value
				})]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationFirst.js
var PaginationFirst_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationFirst",
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
		const rootContext = injectPaginationRootContext();
		useForwardExpose();
		const disabled = computed(() => rootContext.page.value === 1 || rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"aria-label": "First Page",
				type: _ctx.as === "button" ? "button" : void 0,
				disabled: disabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(1))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[1] || (_cache[1] = createTextVNode("First page"))])]),
				_: 3
			}, 16, ["type", "disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationLast.js
var PaginationLast_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationLast",
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
		const rootContext = injectPaginationRootContext();
		useForwardExpose();
		const disabled = computed(() => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"aria-label": "Last Page",
				type: _ctx.as === "button" ? "button" : void 0,
				disabled: disabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(unref(rootContext).pageCount.value))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[1] || (_cache[1] = createTextVNode("Last page"))])]),
				_: 3
			}, 16, ["type", "disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/utils.js
function range(start, end) {
	const length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
}
function transform(items) {
	return items.map((value) => {
		if (typeof value === "number") return {
			type: "page",
			value
		};
		return { type: "ellipsis" };
	});
}
var ELLIPSIS = "ellipsis";
function getRange(currentPage, pageCount, siblingCount, showEdges) {
	const firstPageIndex = 1;
	const lastPageIndex = pageCount;
	const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
	const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);
	if (showEdges) {
		const itemCount = Math.min(2 * siblingCount + 5, pageCount) - 2;
		const showLeftEllipsis = leftSiblingIndex > 3 && Math.abs(lastPageIndex - itemCount - firstPageIndex + 1) > 2 && Math.abs(leftSiblingIndex - firstPageIndex) > 2;
		const showRightEllipsis = rightSiblingIndex < lastPageIndex - 2 && Math.abs(lastPageIndex - itemCount) > 2 && Math.abs(lastPageIndex - rightSiblingIndex) > 2;
		if (!showLeftEllipsis && showRightEllipsis) return [
			...range(1, itemCount),
			ELLIPSIS,
			lastPageIndex
		];
		if (showLeftEllipsis && !showRightEllipsis) return [
			firstPageIndex,
			ELLIPSIS,
			...range(lastPageIndex - itemCount + 1, lastPageIndex)
		];
		if (showLeftEllipsis && showRightEllipsis) return [
			firstPageIndex,
			ELLIPSIS,
			...range(leftSiblingIndex, rightSiblingIndex),
			ELLIPSIS,
			lastPageIndex
		];
		return range(firstPageIndex, lastPageIndex);
	} else {
		const itemCount = siblingCount * 2 + 1;
		if (pageCount < itemCount) return range(1, lastPageIndex);
		else if (currentPage <= siblingCount + 1) return range(firstPageIndex, itemCount);
		else if (pageCount - currentPage <= siblingCount) return range(pageCount - itemCount + 1, lastPageIndex);
		else return range(leftSiblingIndex, rightSiblingIndex);
	}
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationList.js
var PaginationList_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationList",
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
		const rootContext = injectPaginationRootContext();
		const transformedRange = computed(() => {
			return transform(getRange(rootContext.page.value, rootContext.pageCount.value, rootContext.siblingCount.value, rootContext.showEdges.value));
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { items: transformedRange.value })]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationListItem.js
var PaginationListItem_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationListItem",
	props: {
		value: {
			type: Number,
			required: true
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
		useForwardExpose();
		const rootContext = injectPaginationRootContext();
		const isSelected = computed(() => rootContext.page.value === props.value);
		const disabled = computed(() => rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"data-type": "page",
				"aria-label": `Page ${_ctx.value}`,
				"aria-current": isSelected.value ? "page" : void 0,
				"data-selected": isSelected.value ? "true" : void 0,
				disabled: disabled.value,
				type: _ctx.as === "button" ? "button" : void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(_ctx.value))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(_ctx.value), 1)])]),
				_: 3
			}, 16, [
				"aria-label",
				"aria-current",
				"data-selected",
				"disabled",
				"type"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationNext.js
var PaginationNext_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationNext",
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
		const rootContext = injectPaginationRootContext();
		const disabled = computed(() => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"aria-label": "Next Page",
				type: _ctx.as === "button" ? "button" : void 0,
				disabled: disabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(unref(rootContext).page.value + 1))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[1] || (_cache[1] = createTextVNode("Next page"))])]),
				_: 3
			}, 16, ["type", "disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationPrev.js
var PaginationPrev_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationPrev",
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
		const rootContext = injectPaginationRootContext();
		const disabled = computed(() => rootContext.page.value === 1 || rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"aria-label": "Previous Page",
				type: _ctx.as === "button" ? "button" : void 0,
				disabled: disabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(unref(rootContext).page.value - 1))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[1] || (_cache[1] = createTextVNode("Prev page"))])]),
				_: 3
			}, 16, ["type", "disabled"]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcheckbox.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcheckbox_default = {
	"slots": {
		"root": "relative flex items-start",
		"container": "flex items-center",
		"base": "rounded-sm ring ring-inset ring-accented overflow-hidden focus-visible:outline-3",
		"indicator": "flex items-center justify-center size-full text-inverted",
		"icon": "shrink-0 size-full",
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
			"list": { "root": "" },
			"card": { "root": "border border-muted rounded-lg" }
		},
		"indicator": {
			"start": {
				"root": "flex-row",
				"wrapper": "ms-2"
			},
			"end": {
				"root": "flex-row-reverse",
				"wrapper": "me-2"
			},
			"hidden": {
				"base": "sr-only",
				"wrapper": "text-center"
			}
		},
		"size": {
			"xs": {
				"base": "size-3",
				"container": "h-4",
				"wrapper": "text-xs"
			},
			"sm": {
				"base": "size-3.5",
				"container": "h-4",
				"wrapper": "text-xs"
			},
			"md": {
				"base": "size-4",
				"container": "h-5",
				"wrapper": "text-sm"
			},
			"lg": {
				"base": "size-4.5",
				"container": "h-5",
				"wrapper": "text-sm"
			},
			"xl": {
				"base": "size-5",
				"container": "h-6",
				"wrapper": "text-base"
			}
		},
		"required": { "true": { "label": "after:content-['*'] after:ms-0.5 after:text-error" } },
		"disabled": { "true": {
			"root": "opacity-75",
			"base": "cursor-not-allowed",
			"label": "cursor-not-allowed",
			"description": "cursor-not-allowed"
		} },
		"highlight": { "true": "" },
		"checked": { "true": "" }
	},
	"compoundVariants": [
		{
			"size": "xs",
			"variant": "card",
			"class": { "root": "p-2.5" }
		},
		{
			"size": "sm",
			"variant": "card",
			"class": { "root": "p-3" }
		},
		{
			"size": "md",
			"variant": "card",
			"class": { "root": "p-3.5" }
		},
		{
			"size": "lg",
			"variant": "card",
			"class": { "root": "p-4" }
		},
		{
			"size": "xl",
			"variant": "card",
			"class": { "root": "p-4.5" }
		},
		{
			"color": "primary",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-primary" }
		},
		{
			"color": "secondary",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-secondary" }
		},
		{
			"color": "success",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-success" }
		},
		{
			"color": "info",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-info" }
		},
		{
			"color": "warning",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-warning" }
		},
		{
			"color": "error",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-error" }
		},
		{
			"color": "neutral",
			"variant": "card",
			"class": { "root": "has-data-[state=checked]:border-inverted" }
		},
		{
			"variant": "card",
			"disabled": true,
			"class": { "root": "cursor-not-allowed" }
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
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue
var _sfc_main$1 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UCheckbox",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		description: {
			type: String,
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
		size: {
			type: null,
			required: false
		},
		indicator: {
			type: null,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		indeterminateIcon: {
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
		required: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		trueValue: {
			type: null,
			required: false
		},
		falseValue: {
			type: null,
			required: false
		}
	},
	emits: ["change", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const slots = useSlots();
		const emits = __emit;
		const props = useComponentProps("checkbox", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
		const { id: _id, emitFormChange, emitFormInput, size, color, highlight, name, disabled, ariaAttrs } = useFormField(_props);
		const id = _id.value ?? useId();
		const attrs = useAttrs();
		const forwardedAttrs = computed(() => {
			const { "data-state": _, ...rest } = attrs;
			return rest;
		});
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcheckbox_default,
			...appConfig.ui?.checkbox || {}
		})({
			size: size.value ?? props.size,
			color: color.value ?? props.color,
			variant: props.variant,
			indicator: props.indicator,
			highlight: highlight.value ?? props.highlight,
			required: props.required,
			disabled: disabled.value
		}));
		function onUpdate(value) {
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: !unref(props).variant || unref(props).variant === "list" ? unref(props).as : unref(Label_default),
				"data-slot": _ctx.$attrs["data-slot"] ?? "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
						_push(ssrRenderComponent(unref(CheckboxRoot_default), mergeProps({ id: unref(id) }, {
							...unref(rootProps),
							...forwardedAttrs.value,
							...unref(ariaAttrs)
						}, {
							name: unref(name),
							disabled: unref(disabled),
							"data-slot": "base",
							class: ui.value.base({ class: unref(props).ui?.base }),
							"onUpdate:modelValue": onUpdate
						}), {
							default: withCtx(({ state }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(CheckboxIndicator_default), {
									"data-slot": "indicator",
									class: ui.value.indicator({ class: unref(props).ui?.indicator })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) if (state === "indeterminate") _push(ssrRenderComponent(_sfc_main$2, {
											name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, _parent, _scopeId));
										else _push(ssrRenderComponent(_sfc_main$2, {
											name: unref(props).icon || unref(appConfig).ui.icons.check,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, _parent, _scopeId));
										else return [state === "indeterminate" ? (openBlock(), createBlock(_sfc_main$2, {
											key: 0,
											name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$2, {
											key: 1,
											name: unref(props).icon || unref(appConfig).ui.icons.check,
											"data-slot": "icon",
											class: ui.value.icon({ class: unref(props).ui?.icon })
										}, null, 8, ["name", "class"]))];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(CheckboxIndicator_default), {
									"data-slot": "indicator",
									class: ui.value.indicator({ class: unref(props).ui?.indicator })
								}, {
									default: withCtx(() => [state === "indeterminate" ? (openBlock(), createBlock(_sfc_main$2, {
										key: 0,
										name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
										"data-slot": "icon",
										class: ui.value.icon({ class: unref(props).ui?.icon })
									}, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$2, {
										key: 1,
										name: unref(props).icon || unref(appConfig).ui.icons.check,
										"data-slot": "icon",
										class: ui.value.icon({ class: unref(props).ui?.icon })
									}, null, 8, ["name", "class"]))]),
									_: 2
								}, 1032, ["class"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						if (unref(props).label || !!slots.label || unref(props).description || !!slots.description) {
							_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(props).ui?.wrapper }))}"${_scopeId}>`);
							if (unref(props).label || !!slots.label) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
								for: unref(id),
								"data-slot": "label",
								class: ui.value.label({ class: unref(props).ui?.label })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, "label", { label: unref(props).label }, () => {
										_push(`${ssrInterpolate(unref(props).label)}`);
									}, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, "label", { label: unref(props).label }, () => [createTextVNode(toDisplayString(unref(props).label), 1)])];
								}),
								_: 3
							}), _parent, _scopeId);
							else _push(`<!---->`);
							if (unref(props).description || !!slots.description) {
								_push(`<p data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(props).ui?.description }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "description", { description: unref(props).description }, () => {
									_push(`${ssrInterpolate(unref(props).description)}`);
								}, _push, _parent, _scopeId);
								_push(`</p>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [createVNode("div", {
						"data-slot": "container",
						class: ui.value.container({ class: unref(props).ui?.container })
					}, [createVNode(unref(CheckboxRoot_default), mergeProps({ id: unref(id) }, {
						...unref(rootProps),
						...forwardedAttrs.value,
						...unref(ariaAttrs)
					}, {
						name: unref(name),
						disabled: unref(disabled),
						"data-slot": "base",
						class: ui.value.base({ class: unref(props).ui?.base }),
						"onUpdate:modelValue": onUpdate
					}), {
						default: withCtx(({ state }) => [createVNode(unref(CheckboxIndicator_default), {
							"data-slot": "indicator",
							class: ui.value.indicator({ class: unref(props).ui?.indicator })
						}, {
							default: withCtx(() => [state === "indeterminate" ? (openBlock(), createBlock(_sfc_main$2, {
								key: 0,
								name: unref(props).indeterminateIcon || unref(appConfig).ui.icons.minus,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, 8, ["name", "class"])) : (openBlock(), createBlock(_sfc_main$2, {
								key: 1,
								name: unref(props).icon || unref(appConfig).ui.icons.check,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, 8, ["name", "class"]))]),
							_: 2
						}, 1032, ["class"])]),
						_: 1
					}, 16, [
						"id",
						"name",
						"disabled",
						"class"
					])], 2), unref(props).label || !!slots.label || unref(props).description || !!slots.description ? (openBlock(), createBlock("div", {
						key: 0,
						"data-slot": "wrapper",
						class: ui.value.wrapper({ class: unref(props).ui?.wrapper })
					}, [unref(props).label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!unref(props).variant || unref(props).variant === "list" ? unref(Label_default) : "p"), {
						key: 0,
						for: unref(id),
						"data-slot": "label",
						class: ui.value.label({ class: unref(props).ui?.label })
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "label", { label: unref(props).label }, () => [createTextVNode(toDisplayString(unref(props).label), 1)])]),
						_: 3
					}, 8, ["for", "class"])) : createCommentVNode("", true), unref(props).description || !!slots.description ? (openBlock(), createBlock("p", {
						key: 1,
						"data-slot": "description",
						class: ui.value.description({ class: unref(props).ui?.description })
					}, [renderSlot(_ctx.$slots, "description", { description: unref(props).description }, () => [createTextVNode(toDisplayString(unref(props).description), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Checkbox.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpagination.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpagination_default = { "slots": {
	"root": "",
	"list": "flex items-center gap-1",
	"ellipsis": "pointer-events-none",
	"label": "min-w-5 text-center",
	"first": "",
	"prev": "",
	"item": "",
	"next": "",
	"last": ""
} };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Pagination.vue
var _sfc_main = {
	__name: "UPagination",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		firstIcon: {
			type: null,
			required: false
		},
		prevIcon: {
			type: null,
			required: false
		},
		nextIcon: {
			type: null,
			required: false
		},
		lastIcon: {
			type: null,
			required: false
		},
		ellipsisIcon: {
			type: null,
			required: false
		},
		color: {
			type: null,
			required: false,
			default: "neutral"
		},
		variant: {
			type: null,
			required: false,
			default: "outline"
		},
		activeColor: {
			type: null,
			required: false,
			default: "primary"
		},
		activeVariant: {
			type: null,
			required: false,
			default: "solid"
		},
		showControls: {
			type: Boolean,
			required: false,
			default: true
		},
		size: {
			type: null,
			required: false
		},
		to: {
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
		},
		defaultPage: {
			type: Number,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		itemsPerPage: {
			type: Number,
			required: false,
			default: 10
		},
		page: {
			type: Number,
			required: false
		},
		showEdges: {
			type: Boolean,
			required: false,
			default: false
		},
		siblingCount: {
			type: Number,
			required: false,
			default: 2
		},
		total: {
			type: Number,
			required: false,
			default: 0
		}
	},
	emits: ["update:page"],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("pagination", _props);
		const { dir } = useLocale();
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "defaultPage", "disabled", "itemsPerPage", "page", "showEdges", "siblingCount", "total"), emits);
		const firstIcon = computed(() => props.firstIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
		const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
		const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
		const lastIcon = computed(() => props.lastIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpagination_default,
			...appConfig.ui?.pagination || {}
		})());
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(PaginationRoot_default), mergeProps(unref(rootProps), {
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx(({ page, pageCount }, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(PaginationList_default), {
						"data-slot": "list",
						class: ui.value.list({ class: unref(props).ui?.list })
					}, {
						default: withCtx(({ items }, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(props).showControls || !!slots.first) _push(ssrRenderComponent(unref(PaginationFirst_default), {
									"as-child": "",
									"data-slot": "first",
									class: ui.value.first({ class: unref(props).ui?.first })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "first", {}, () => {
											_push(ssrRenderComponent(_sfc_main$7, {
												color: unref(props).color,
												variant: unref(props).variant,
												size: unref(props).size,
												icon: firstIcon.value,
												to: unref(props).to?.(1)
											}, null, _parent, _scopeId));
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "first", {}, () => [createVNode(_sfc_main$7, {
											color: unref(props).color,
											variant: unref(props).variant,
											size: unref(props).size,
											icon: firstIcon.value,
											to: unref(props).to?.(1)
										}, null, 8, [
											"color",
											"variant",
											"size",
											"icon",
											"to"
										])])];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								if (unref(props).showControls || !!slots.prev) _push(ssrRenderComponent(unref(PaginationPrev_default), {
									"as-child": "",
									"data-slot": "prev",
									class: ui.value.prev({ class: unref(props).ui?.prev })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "prev", {}, () => {
											_push(ssrRenderComponent(_sfc_main$7, {
												color: unref(props).color,
												variant: unref(props).variant,
												size: unref(props).size,
												icon: prevIcon.value,
												to: page > 1 ? unref(props).to?.(page - 1) : void 0
											}, null, _parent, _scopeId));
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "prev", {}, () => [createVNode(_sfc_main$7, {
											color: unref(props).color,
											variant: unref(props).variant,
											size: unref(props).size,
											icon: prevIcon.value,
											to: page > 1 ? unref(props).to?.(page - 1) : void 0
										}, null, 8, [
											"color",
											"variant",
											"size",
											"icon",
											"to"
										])])];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<!--[-->`);
								ssrRenderList(items, (item, index) => {
									_push(`<!--[-->`);
									if (item.type === "page") _push(ssrRenderComponent(unref(PaginationListItem_default), {
										"as-child": "",
										value: item.value,
										"data-slot": "item",
										class: ui.value.item({ class: unref(props).ui?.item })
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) ssrRenderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, {
												item,
												index,
												page,
												pageCount
											}), () => {
												_push(ssrRenderComponent(_sfc_main$7, {
													color: page === item.value ? unref(props).activeColor : unref(props).color,
													variant: page === item.value ? unref(props).activeVariant : unref(props).variant,
													size: unref(props).size,
													label: String(item.value),
													ui: { label: ui.value.label() },
													to: unref(props).to?.(item.value),
													square: ""
												}, null, _parent, _scopeId));
											}, _push, _parent, _scopeId);
											else return [renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, {
												item,
												index,
												page,
												pageCount
											}), () => [createVNode(_sfc_main$7, {
												color: page === item.value ? unref(props).activeColor : unref(props).color,
												variant: page === item.value ? unref(props).activeVariant : unref(props).variant,
												size: unref(props).size,
												label: String(item.value),
												ui: { label: ui.value.label() },
												to: unref(props).to?.(item.value),
												square: ""
											}, null, 8, [
												"color",
												"variant",
												"size",
												"label",
												"ui",
												"to"
											])])];
										}),
										_: 2
									}, _parent, _scopeId));
									else _push(ssrRenderComponent(unref(PaginationEllipsis_default), {
										"as-child": "",
										"data-slot": "ellipsis",
										class: ui.value.ellipsis({ class: unref(props).ui?.ellipsis })
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) ssrRenderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => {
												_push(ssrRenderComponent(_sfc_main$7, {
													as: "div",
													color: unref(props).color,
													variant: unref(props).variant,
													size: unref(props).size,
													icon: unref(props).ellipsisIcon || unref(appConfig).ui.icons.ellipsis
												}, null, _parent, _scopeId));
											}, _push, _parent, _scopeId);
											else return [renderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => [createVNode(_sfc_main$7, {
												as: "div",
												color: unref(props).color,
												variant: unref(props).variant,
												size: unref(props).size,
												icon: unref(props).ellipsisIcon || unref(appConfig).ui.icons.ellipsis
											}, null, 8, [
												"color",
												"variant",
												"size",
												"icon"
											])])];
										}),
										_: 2
									}, _parent, _scopeId));
									_push(`<!--]-->`);
								});
								_push(`<!--]-->`);
								if (unref(props).showControls || !!slots.next) _push(ssrRenderComponent(unref(PaginationNext_default), {
									"as-child": "",
									"data-slot": "next",
									class: ui.value.next({ class: unref(props).ui?.next })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "next", {}, () => {
											_push(ssrRenderComponent(_sfc_main$7, {
												color: unref(props).color,
												variant: unref(props).variant,
												size: unref(props).size,
												icon: nextIcon.value,
												to: page < pageCount ? unref(props).to?.(page + 1) : void 0
											}, null, _parent, _scopeId));
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "next", {}, () => [createVNode(_sfc_main$7, {
											color: unref(props).color,
											variant: unref(props).variant,
											size: unref(props).size,
											icon: nextIcon.value,
											to: page < pageCount ? unref(props).to?.(page + 1) : void 0
										}, null, 8, [
											"color",
											"variant",
											"size",
											"icon",
											"to"
										])])];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								if (unref(props).showControls || !!slots.last) _push(ssrRenderComponent(unref(PaginationLast_default), {
									"as-child": "",
									"data-slot": "last",
									class: ui.value.last({ class: unref(props).ui?.last })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) ssrRenderSlot(_ctx.$slots, "last", {}, () => {
											_push(ssrRenderComponent(_sfc_main$7, {
												color: unref(props).color,
												variant: unref(props).variant,
												size: unref(props).size,
												icon: lastIcon.value,
												to: unref(props).to?.(pageCount)
											}, null, _parent, _scopeId));
										}, _push, _parent, _scopeId);
										else return [renderSlot(_ctx.$slots, "last", {}, () => [createVNode(_sfc_main$7, {
											color: unref(props).color,
											variant: unref(props).variant,
											size: unref(props).size,
											icon: lastIcon.value,
											to: unref(props).to?.(pageCount)
										}, null, 8, [
											"color",
											"variant",
											"size",
											"icon",
											"to"
										])])];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [
								unref(props).showControls || !!slots.first ? (openBlock(), createBlock(unref(PaginationFirst_default), {
									key: 0,
									"as-child": "",
									"data-slot": "first",
									class: ui.value.first({ class: unref(props).ui?.first })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "first", {}, () => [createVNode(_sfc_main$7, {
										color: unref(props).color,
										variant: unref(props).variant,
										size: unref(props).size,
										icon: firstIcon.value,
										to: unref(props).to?.(1)
									}, null, 8, [
										"color",
										"variant",
										"size",
										"icon",
										"to"
									])])]),
									_: 3
								}, 8, ["class"])) : createCommentVNode("", true),
								unref(props).showControls || !!slots.prev ? (openBlock(), createBlock(unref(PaginationPrev_default), {
									key: 1,
									"as-child": "",
									"data-slot": "prev",
									class: ui.value.prev({ class: unref(props).ui?.prev })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "prev", {}, () => [createVNode(_sfc_main$7, {
										color: unref(props).color,
										variant: unref(props).variant,
										size: unref(props).size,
										icon: prevIcon.value,
										to: page > 1 ? unref(props).to?.(page - 1) : void 0
									}, null, 8, [
										"color",
										"variant",
										"size",
										"icon",
										"to"
									])])]),
									_: 2
								}, 1032, ["class"])) : createCommentVNode("", true),
								(openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
									return openBlock(), createBlock(Fragment, { key: index }, [item.type === "page" ? (openBlock(), createBlock(unref(PaginationListItem_default), {
										key: 0,
										"as-child": "",
										value: item.value,
										"data-slot": "item",
										class: ui.value.item({ class: unref(props).ui?.item })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, {
											item,
											index,
											page,
											pageCount
										}), () => [createVNode(_sfc_main$7, {
											color: page === item.value ? unref(props).activeColor : unref(props).color,
											variant: page === item.value ? unref(props).activeVariant : unref(props).variant,
											size: unref(props).size,
											label: String(item.value),
											ui: { label: ui.value.label() },
											to: unref(props).to?.(item.value),
											square: ""
										}, null, 8, [
											"color",
											"variant",
											"size",
											"label",
											"ui",
											"to"
										])])]),
										_: 2
									}, 1032, ["value", "class"])) : (openBlock(), createBlock(unref(PaginationEllipsis_default), {
										key: 1,
										"as-child": "",
										"data-slot": "ellipsis",
										class: ui.value.ellipsis({ class: unref(props).ui?.ellipsis })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => [createVNode(_sfc_main$7, {
											as: "div",
											color: unref(props).color,
											variant: unref(props).variant,
											size: unref(props).size,
											icon: unref(props).ellipsisIcon || unref(appConfig).ui.icons.ellipsis
										}, null, 8, [
											"color",
											"variant",
											"size",
											"icon"
										])])]),
										_: 3
									}, 8, ["class"]))], 64);
								}), 128)),
								unref(props).showControls || !!slots.next ? (openBlock(), createBlock(unref(PaginationNext_default), {
									key: 2,
									"as-child": "",
									"data-slot": "next",
									class: ui.value.next({ class: unref(props).ui?.next })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "next", {}, () => [createVNode(_sfc_main$7, {
										color: unref(props).color,
										variant: unref(props).variant,
										size: unref(props).size,
										icon: nextIcon.value,
										to: page < pageCount ? unref(props).to?.(page + 1) : void 0
									}, null, 8, [
										"color",
										"variant",
										"size",
										"icon",
										"to"
									])])]),
									_: 2
								}, 1032, ["class"])) : createCommentVNode("", true),
								unref(props).showControls || !!slots.last ? (openBlock(), createBlock(unref(PaginationLast_default), {
									key: 3,
									"as-child": "",
									"data-slot": "last",
									class: ui.value.last({ class: unref(props).ui?.last })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "last", {}, () => [createVNode(_sfc_main$7, {
										color: unref(props).color,
										variant: unref(props).variant,
										size: unref(props).size,
										icon: lastIcon.value,
										to: unref(props).to?.(pageCount)
									}, null, 8, [
										"color",
										"variant",
										"size",
										"icon",
										"to"
									])])]),
									_: 2
								}, 1032, ["class"])) : createCommentVNode("", true)
							];
						}),
						_: 2
					}, _parent, _scopeId));
					else return [createVNode(unref(PaginationList_default), {
						"data-slot": "list",
						class: ui.value.list({ class: unref(props).ui?.list })
					}, {
						default: withCtx(({ items }) => [
							unref(props).showControls || !!slots.first ? (openBlock(), createBlock(unref(PaginationFirst_default), {
								key: 0,
								"as-child": "",
								"data-slot": "first",
								class: ui.value.first({ class: unref(props).ui?.first })
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "first", {}, () => [createVNode(_sfc_main$7, {
									color: unref(props).color,
									variant: unref(props).variant,
									size: unref(props).size,
									icon: firstIcon.value,
									to: unref(props).to?.(1)
								}, null, 8, [
									"color",
									"variant",
									"size",
									"icon",
									"to"
								])])]),
								_: 3
							}, 8, ["class"])) : createCommentVNode("", true),
							unref(props).showControls || !!slots.prev ? (openBlock(), createBlock(unref(PaginationPrev_default), {
								key: 1,
								"as-child": "",
								"data-slot": "prev",
								class: ui.value.prev({ class: unref(props).ui?.prev })
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "prev", {}, () => [createVNode(_sfc_main$7, {
									color: unref(props).color,
									variant: unref(props).variant,
									size: unref(props).size,
									icon: prevIcon.value,
									to: page > 1 ? unref(props).to?.(page - 1) : void 0
								}, null, 8, [
									"color",
									"variant",
									"size",
									"icon",
									"to"
								])])]),
								_: 2
							}, 1032, ["class"])) : createCommentVNode("", true),
							(openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
								return openBlock(), createBlock(Fragment, { key: index }, [item.type === "page" ? (openBlock(), createBlock(unref(PaginationListItem_default), {
									key: 0,
									"as-child": "",
									value: item.value,
									"data-slot": "item",
									class: ui.value.item({ class: unref(props).ui?.item })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, {
										item,
										index,
										page,
										pageCount
									}), () => [createVNode(_sfc_main$7, {
										color: page === item.value ? unref(props).activeColor : unref(props).color,
										variant: page === item.value ? unref(props).activeVariant : unref(props).variant,
										size: unref(props).size,
										label: String(item.value),
										ui: { label: ui.value.label() },
										to: unref(props).to?.(item.value),
										square: ""
									}, null, 8, [
										"color",
										"variant",
										"size",
										"label",
										"ui",
										"to"
									])])]),
									_: 2
								}, 1032, ["value", "class"])) : (openBlock(), createBlock(unref(PaginationEllipsis_default), {
									key: 1,
									"as-child": "",
									"data-slot": "ellipsis",
									class: ui.value.ellipsis({ class: unref(props).ui?.ellipsis })
								}, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "ellipsis", { ui: ui.value }, () => [createVNode(_sfc_main$7, {
										as: "div",
										color: unref(props).color,
										variant: unref(props).variant,
										size: unref(props).size,
										icon: unref(props).ellipsisIcon || unref(appConfig).ui.icons.ellipsis
									}, null, 8, [
										"color",
										"variant",
										"size",
										"icon"
									])])]),
									_: 3
								}, 8, ["class"]))], 64);
							}), 128)),
							unref(props).showControls || !!slots.next ? (openBlock(), createBlock(unref(PaginationNext_default), {
								key: 2,
								"as-child": "",
								"data-slot": "next",
								class: ui.value.next({ class: unref(props).ui?.next })
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "next", {}, () => [createVNode(_sfc_main$7, {
									color: unref(props).color,
									variant: unref(props).variant,
									size: unref(props).size,
									icon: nextIcon.value,
									to: page < pageCount ? unref(props).to?.(page + 1) : void 0
								}, null, 8, [
									"color",
									"variant",
									"size",
									"icon",
									"to"
								])])]),
								_: 2
							}, 1032, ["class"])) : createCommentVNode("", true),
							unref(props).showControls || !!slots.last ? (openBlock(), createBlock(unref(PaginationLast_default), {
								key: 3,
								"as-child": "",
								"data-slot": "last",
								class: ui.value.last({ class: unref(props).ui?.last })
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "last", {}, () => [createVNode(_sfc_main$7, {
									color: unref(props).color,
									variant: unref(props).variant,
									size: unref(props).size,
									icon: lastIcon.value,
									to: unref(props).to?.(pageCount)
								}, null, 8, [
									"color",
									"variant",
									"size",
									"icon",
									"to"
								])])]),
								_: 2
							}, 1032, ["class"])) : createCommentVNode("", true)
						]),
						_: 2
					}, 1032, ["class"])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Pagination.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a };
//# sourceMappingURL=Pagination-DJdTeTHe.mjs.map
