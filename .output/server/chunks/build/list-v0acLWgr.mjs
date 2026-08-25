import { al as useAuth, aP as useToast, ak as useAsyncData, f as _sfc_main$b, $ as $fetch$2, aM as useRuntimeConfig, ap as useComponentProps, aB as useLocale, aj as useAppConfig, ay as useForwardProps, a8 as reactivePick, aG as usePortal, aw as useFormField, av as useFieldGroup, ao as useComponentIcons, q as createReusableTemplate, ag as tv, Y as isArrayOfArray, l as compare, K as get, j as _sfc_main$2$1, h as _sfc_main$1$1, k as _sfc_main$2$2, F as FieldGroupReset, aH as usePrimitiveElement, ax as useForwardExpose, c as Primitive, aQ as useVModel, a0 as looseToNumber, M as getDisplayValue, T as Teleport_default, P as Presence_default, m as createContext, n as createEventHook, az as useForwardProps$1 } from '../virtual/entry.mjs';
import { g as getEstimateSize, d as ListboxItem_default, c as ListboxItemIndicator_default, e as ListboxRoot_default, h as injectListboxRootContext, a as ListboxFilter_default, f as ListboxVirtualizer_default, b as ListboxGroup_default, L as ListboxContent_default } from './virtualizer-BXaFupVX.mjs';
import { _ as _sfc_main$4 } from './Select-5EkiFePr.mjs';
import { a as FocusScope_default, n as useId$1, u as useBodyScrollLock, m as useHideOthers, D as DismissableLayer_default } from './DashboardSidebarToggle-BIlVm3ff.mjs';
import { _ as _sfc_main$a, a as useFilter, b as useFilter$1 } from './DropdownMenu-BoWa7GET.mjs';
import { u as useComposing } from './useComposing-D1bdBmsI.mjs';
import { u as useDirection } from './useDirection-DK-ubNea.mjs';
import { u as useFocusGuards } from './useTypeahead-BWLtoev0.mjs';
import { d as PopperRoot_default, P as PopperAnchor_default, u as useForwardPropsEmits, a as PopperArrow_default, c as PopperContent_default } from './PopperArrow-D4nTdxSJ.mjs';
import { _ as _sfc_main$e } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$6 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main$3 } from './Tabs-FmegTH4u.mjs';
import { _ as _sfc_main$c } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$9 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$f } from './Input-BC1I0LeZ.mjs';
import { c as customerFullName } from './useCustomers-CQ23lYPq.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { u as useCustomerTransfers, C as CUSTOMER_TRANSFER_STATUS_LABELS } from './useCustomerTransfers-CsxvIT-E.mjs';
import { a as _sfc_main$1, _ as _sfc_main$7 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { _ as _sfc_main$d } from './Form-CCmdJDgC.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { _ as _sfc_main$5 } from './Table-DZoThN5y.mjs';
import { _ as _sfc_main$g } from './Textarea-DLoRbkWE.mjs';
import { u as useDistributors } from './useDistributors-MT7zva9s.mjs';
import { u as useApplications, a as applicantFullName, A as APPLICATION_STATUS_LABELS, v as verifierDisplayName } from './useApplications-DC2_85yO.mjs';
import { D as DecideModal_default } from './DecideModal-4OcubhvJ.mjs';
import { _ as _sfc_main$2 } from './Alert-CSACBiI_.mjs';
import { D as DecideVoucherRequestModal_default } from './DecideVoucherRequestModal-Ouxhs2hH.mjs';
import { defineComponent, computed, ref, withAsyncContext, mergeProps, withCtx, unref, isRef, createVNode, openBlock, createBlock, createCommentVNode, h, reactive, watch, useModel, mergeModels, useSlots, toRef, useTemplateRef, nextTick, renderSlot, createTextVNode, toDisplayString, withModifiers, Fragment, renderList, withMemo, normalizeProps, guardReactiveProps, toRefs, getCurrentInstance, toRaw, withKeys, resolveDynamicComponent, useSSRContext } from 'vue';
import { f as defu } from '../_/nitro.mjs';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import * as z from 'zod';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@iconify/utils/lib/css/icon';
import 'tailwindcss/colors';
import './useFormControl-BqrzxfBI.mjs';
import './useKbd-rvMsbidG.mjs';
import './VisuallyHiddenInput-qXGxQnKa.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './esm-CcArdB_U.mjs';
import './Kbd-E_UYCv7U.mjs';
import './RovingFocusItem-ludpn-tQ.mjs';
import './overlay-C4SiqibN.mjs';
import '@tanstack/table-core';
import './RadioGroup-ByiZ78dl.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './ChangeCustomerRequestModal-DnQVYlQ4.mjs';
import './utils-BYhQum64.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxRoot.js
var [injectComboboxRootContext, provideComboboxRootContext] = /*#__PURE__*/ createContext("ComboboxRoot");
var ComboboxRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		resetSearchTermOnBlur: {
			type: Boolean,
			required: false,
			default: true
		},
		resetSearchTermOnSelect: {
			type: Boolean,
			required: false,
			default: true
		},
		openOnFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		openOnClick: {
			type: Boolean,
			required: false,
			default: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false
		},
		resetModelValueOnClear: {
			type: Boolean,
			required: false,
			default: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		highlightOnHover: {
			type: Boolean,
			required: false,
			default: true
		},
		by: {
			type: [String, Function],
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
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"update:open"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, openOnFocus, openOnClick, dir: propDir, resetModelValueOnClear, highlightOnHover } = toRefs(props);
		const dir = useDirection(propDir);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		async function onOpenChange(val) {
			open.value = val;
			filterSearch.value = "";
			if (val) {
				await nextTick();
				primitiveElement.value?.highlightSelected();
				isUserInputted.value = true;
				inputElement.value?.focus();
			} else {
				isUserInputted.value = false;
				setTimeout(() => {
					if (!val && props.resetSearchTermOnBlur) resetSearchTerm.trigger();
				}, 1);
			}
		}
		const resetSearchTerm = createEventHook();
		const isUserInputted = ref(false);
		const isVirtual = ref(false);
		const inputElement = ref();
		const triggerElement = ref();
		const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? void 0);
		const allItems = ref(/* @__PURE__ */ new Map());
		const allGroups = ref(/* @__PURE__ */ new Map());
		const { contains } = useFilter$1({ sensitivity: "base" });
		const filterSearch = ref("");
		const filterState = computed((oldValue) => {
			if (!filterSearch.value || props.ignoreFilter || isVirtual.value) return {
				count: allItems.value.size,
				items: oldValue?.items ?? /* @__PURE__ */ new Map(),
				groups: oldValue?.groups ?? new Set(allGroups.value.keys())
			};
			let itemCount = 0;
			const filteredItems = /* @__PURE__ */ new Map();
			const filteredGroups = /* @__PURE__ */ new Set();
			for (const [id, value] of allItems.value) {
				const score = contains(value, filterSearch.value);
				filteredItems.set(id, score ? 1 : 0);
				if (score) itemCount++;
			}
			for (const [groupId, group] of allGroups.value) for (const itemId of group) if (filteredItems.get(itemId) > 0) {
				filteredGroups.add(groupId);
				break;
			}
			return {
				count: itemCount,
				items: filteredItems,
				groups: filteredGroups
			};
		});
		getCurrentInstance();
		__expose({
			filtered: filterState,
			highlightedElement,
			highlightItem: primitiveElement.value?.highlightItem,
			highlightFirstItem: primitiveElement.value?.highlightFirstItem,
			highlightSelected: primitiveElement.value?.highlightSelected
		});
		provideComboboxRootContext({
			modelValue,
			multiple,
			disabled,
			open,
			onOpenChange,
			contentId: "",
			isUserInputted,
			isVirtual,
			inputElement,
			highlightedElement,
			onInputElementChange: (val) => inputElement.value = val,
			triggerElement,
			onTriggerElementChange: (val) => triggerElement.value = val,
			parentElement,
			resetSearchTermOnSelect,
			onResetSearchTerm: resetSearchTerm.on,
			allItems,
			allGroups,
			filterSearch,
			filterState,
			ignoreFilter,
			openOnFocus,
			openOnClick,
			resetModelValueOnClear
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [createVNode(unref(ListboxRoot_default), mergeProps({
					ref_key: "primitiveElement",
					ref: primitiveElement
				}, _ctx.$attrs, {
					modelValue: unref(modelValue),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
					style: { pointerEvents: unref(open) ? "auto" : void 0 },
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: unref(dir),
					multiple: unref(multiple),
					name: _ctx.name,
					required: _ctx.required,
					disabled: unref(disabled),
					"highlight-on-hover": unref(highlightOnHover),
					by: props.by,
					onHighlight: _cache[1] || (_cache[1] = ($event) => emits("highlight", $event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						open: unref(open),
						modelValue: unref(modelValue)
					})]),
					_: 3
				}, 16, [
					"modelValue",
					"style",
					"as",
					"as-child",
					"dir",
					"multiple",
					"name",
					"required",
					"disabled",
					"highlight-on-hover",
					"by"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxAnchor.js
var ComboboxAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxAnchor",
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
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["as-child", "as"])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxContentImpl.js
var [injectComboboxContentContext, provideComboboxContentContext] = /*#__PURE__*/ createContext("ComboboxContent");
var ComboboxContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "inline"
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		hideWhenEmpty: {
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
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { position } = toRefs(props);
		const rootContext = injectComboboxRootContext();
		const isEmpty = computed(() => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : rootContext.filterState.value.count === 0);
		const { forwardRef} = useForwardExpose();
		useBodyScrollLock(props.bodyLock);
		useFocusGuards();
		useHideOthers(rootContext.parentElement);
		const pickedProps = computed(() => {
			if (props.position === "popper") return props;
			else return {};
		});
		const forwardedProps = useForwardProps$1(pickedProps.value);
		const popperStyle = {
			"boxSizing": "border-box",
			"--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
			"--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
			"--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
		};
		provideComboboxContentContext({ position });
		ref(false);
		function isEventTargetWithinCombobox(target) {
			if (rootContext.parentElement.value?.contains(target)) return true;
			const control = (target instanceof Element ? target.closest("label") : null)?.control;
			return !!control && !!rootContext.parentElement.value?.contains(control);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxContent_default), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(FocusScope_default), {
					"as-child": "",
					onMountAutoFocus: _cache[5] || (_cache[5] = withModifiers(() => {}, ["prevent"])),
					onUnmountAutoFocus: _cache[6] || (_cache[6] = withModifiers(() => {}, ["prevent"]))
				}, {
					default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
						"as-child": "",
						"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
						onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
						onFocusOutside: _cache[1] || (_cache[1] = (ev) => {
							if (isEventTargetWithinCombobox(ev.target)) ev.preventDefault();
							emits("focusOutside", ev);
						}),
						onInteractOutside: _cache[2] || (_cache[2] = ($event) => emits("interactOutside", $event)),
						onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
						onPointerDownOutside: _cache[4] || (_cache[4] = (ev) => {
							if (isEventTargetWithinCombobox(ev.target)) ev.preventDefault();
							emits("pointerDownOutside", ev);
						})
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(position) === "popper" ? unref(PopperContent_default) : unref(Primitive)), mergeProps({
							..._ctx.$attrs,
							...unref(forwardedProps)
						}, {
							id: unref(rootContext).contentId,
							ref: unref(forwardRef),
							"memo-dependencies": unref(position) === "popper" ? [unref(rootContext).filterSearch.value, unref(rootContext).filterState.value] : void 0,
							"data-state": unref(rootContext).open.value ? "open" : "closed",
							"data-empty": isEmpty.value ? "" : void 0,
							style: {
								display: props.hideWhenEmpty && isEmpty.value ? "none" : "flex",
								flexDirection: "column",
								outline: "none",
								...unref(position) === "popper" ? popperStyle : {}
							}
						}), {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 16, [
							"id",
							"memo-dependencies",
							"data-state",
							"data-empty",
							"style"
						]))]),
						_: 3
					}, 8, ["disable-outside-pointer-events"])]),
					_: 3
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxArrow.js
var ComboboxArrow_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxArrow",
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
		const rootContext = injectComboboxRootContext();
		const contentContext = injectComboboxContentContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return unref(rootContext).open.value && unref(contentContext).position.value === "popper" ? (openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(mergeProps({ key: 0 }, props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxCancel.js
var ComboboxCancel_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxCancel",
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
		const rootContext = injectComboboxRootContext();
		function handleClick() {
			rootContext.filterSearch.value = "";
			if (rootContext.inputElement.value) {
				rootContext.inputElement.value.value = "";
				rootContext.inputElement.value.focus();
			}
			if (rootContext.resetModelValueOnClear?.value) rootContext.modelValue.value = rootContext.multiple.value ? [] : null;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ type: _ctx.as === "button" ? "button" : void 0 }, props, {
				tabindex: "-1",
				onClick: handleClick
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["type"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxContent.js
var ComboboxContent_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		hideWhenEmpty: {
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
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const { forwardRef } = useForwardExpose();
		const rootContext = injectComboboxRootContext();
		rootContext.contentId ||= useId$1(void 0, "reka-combobox-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [createVNode(ComboboxContentImpl_default, mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxEmpty.js
var ComboboxEmpty_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxEmpty",
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
		const rootContext = injectComboboxRootContext();
		const isRender = computed(() => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : rootContext.filterState.value.count === 0);
		return (_ctx, _cache) => {
			return isRender.value ? (openBlock(), createBlock(unref(Primitive), normalizeProps(mergeProps({ key: 0 }, props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createTextVNode("No options"))])]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxGroup.js
var [injectComboboxGroupContext, provideComboboxGroupContext] = /*#__PURE__*/ createContext("ComboboxGroup");
var ComboboxGroup_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxGroup",
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
		const id = useId$1(void 0, "reka-combobox-group");
		const rootContext = injectComboboxRootContext();
		const isRender = computed(() => rootContext.ignoreFilter.value ? true : !rootContext.filterSearch.value ? true : rootContext.filterState.value.groups.has(id));
		const context = provideComboboxGroupContext({
			id,
			labelId: ""
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxGroup_default), mergeProps({
				id: unref(id),
				"aria-labelledby": unref(context).labelId
			}, props, { hidden: isRender.value ? void 0 : true }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"aria-labelledby",
				"hidden"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxInput.js
var ComboboxInput_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxInput",
	props: {
		displayValue: {
			type: Function,
			required: false
		},
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
		const emits = __emit;
		const rootContext = injectComboboxRootContext();
		const listboxContext = injectListboxRootContext();
		const { primitiveElement} = usePrimitiveElement();
		const modelValue = useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 });
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing((event) => {
			const el = event.target;
			if (el) processInputValue(el.value);
		});
		function handleKeyDown(ev) {
			if (isComposing.value) return;
			ev.preventDefault();
			if (!rootContext.open.value) rootContext.onOpenChange(true);
		}
		function processInputValue(value) {
			if (!rootContext.open.value) {
				rootContext.onOpenChange(true);
				nextTick(() => {
					if (value) {
						rootContext.filterSearch.value = value;
						listboxContext.highlightFirstItem();
					}
				});
			} else rootContext.filterSearch.value = value;
		}
		function handleInput(event) {
			if (isComposing.value) return;
			processInputValue(event.target.value);
		}
		function handleFocus() {
			if (rootContext.openOnFocus.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleBlur(ev) {
			if (!rootContext.open.value) return;
			const nextFocus = ev.relatedTarget;
			if (!nextFocus) return;
			const isInsideRoot = rootContext.parentElement.value?.contains(nextFocus);
			const isInsideContent = (void 0).getElementById(rootContext.contentId)?.contains(nextFocus);
			if (!isInsideRoot && !isInsideContent) requestAnimationFrame(() => {
				if (!rootContext.open.value) return;
				const active = (void 0).activeElement;
				if (!rootContext.parentElement.value?.contains(active) && !(void 0).getElementById(rootContext.contentId)?.contains(active)) rootContext.onOpenChange(false);
			});
		}
		function handleClick() {
			if (rootContext.openOnClick.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function resetSearchTerm() {
			const rootModelValue = rootContext.modelValue.value;
			if (props.displayValue) modelValue.value = props.displayValue(rootModelValue);
			else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) if (typeof rootModelValue !== "object") modelValue.value = rootModelValue.toString();
			else modelValue.value = "";
			else modelValue.value = "";
			nextTick(() => {
				modelValue.value = modelValue.value;
			});
		}
		rootContext.onResetSearchTerm(() => {
			resetSearchTerm();
		});
		watch(rootContext.modelValue, async () => {
			if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) resetSearchTerm();
		}, {
			immediate: true,
			deep: true
		});
		watch(rootContext.filterState, (_newValue, oldValue) => {
			if (!rootContext.isVirtual.value && oldValue.count === 0) listboxContext.highlightFirstItem();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxFilter_default), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				modelValue: unref(modelValue),
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"auto-focus": _ctx.autoFocus,
				disabled: _ctx.disabled,
				"aria-expanded": unref(rootContext).open.value,
				"aria-controls": unref(rootContext).contentId,
				"aria-autocomplete": "list",
				role: "combobox",
				autocomplete: "off",
				onClick: handleClick,
				onInput: handleInput,
				onKeydown: withKeys(handleKeyDown, ["down", "up"]),
				onFocus: handleFocus,
				onBlur: handleBlur,
				onCompositionstart: unref(handleCompositionStart),
				onCompositionend: unref(handleCompositionEnd)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"as",
				"as-child",
				"auto-focus",
				"disabled",
				"aria-expanded",
				"aria-controls",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxItem.js
var ComboboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxItem",
	props: {
		textValue: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: true
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
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId$1(void 0, "reka-combobox-item");
		const rootContext = injectComboboxRootContext();
		injectComboboxGroupContext(null);
		const { primitiveElement} = usePrimitiveElement();
		if (props.value === "") throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
		const isRender = computed(() => {
			if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterSearch.value) return true;
			else {
				const filteredCurrentItem = rootContext.filterState.value.items.get(id);
				if (filteredCurrentItem === void 0) return true;
				return filteredCurrentItem > 0;
			}
		});
		return (_ctx, _cache) => {
			return isRender.value ? withMemo([
				isRender.value,
				unref(rootContext).filterSearch.value,
				unref(rootContext).disabled.value,
				_ctx.disabled,
				props.value,
				props.as,
				props.asChild,
				...Object.values(_ctx.$attrs)
			], () => (openBlock(), createBlock(unref(ListboxItem_default), mergeProps({ key: 0 }, props, {
				id: unref(id),
				ref_key: "primitiveElement",
				ref: primitiveElement,
				disabled: unref(rootContext).disabled.value || _ctx.disabled,
				onSelect: _cache[0] || (_cache[0] = (event) => {
					emits("select", event);
					if (event.defaultPrevented) return;
					if (!unref(rootContext).multiple.value && !_ctx.disabled && !unref(rootContext).disabled.value) {
						event.preventDefault();
						unref(rootContext).onOpenChange(false);
						unref(rootContext).modelValue.value = props.value;
					} else if (unref(rootContext).multiple.value) unref(rootContext).inputElement.value?.focus();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(_ctx.value), 1)])]),
				_: 3
			}, 16, ["id", "disabled"])), _cache, 1) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxItemIndicator.js
var ComboboxItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxItemIndicator",
	props: {
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
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxItemIndicator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxLabel.js
var ComboboxLabel_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxLabel",
	props: {
		for: {
			type: String,
			required: false
		},
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
		useForwardExpose();
		const groupContext = injectComboboxGroupContext({
			id: "",
			labelId: ""
		});
		groupContext.labelId ||= useId$1(void 0, "reka-combobox-group-label");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).labelId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxPortal.js
var ComboboxPortal_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxSeparator.js
var ComboboxSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxSeparator",
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
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "aria-hidden": "true" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxTrigger.js
var ComboboxTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxTrigger",
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
		const { forwardRef} = useForwardExpose();
		const rootContext = injectComboboxRootContext();
		const disabled = computed(() => props.disabled || rootContext.disabled.value || false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref: unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				tabindex: "-1",
				"aria-label": "Show popup",
				"aria-haspopup": "listbox",
				"aria-expanded": unref(rootContext).open.value,
				"aria-controls": unref(rootContext).contentId,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				disabled: disabled.value,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(!unref(rootContext).open.value))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"disabled",
				"data-disabled",
				"aria-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxVirtualizer.js
var ComboboxVirtualizer_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxVirtualizer",
	props: {
		options: {
			type: Array,
			required: true
		},
		overscan: {
			type: Number,
			required: false
		},
		estimateSize: {
			type: [Number, Function],
			required: false
		},
		textContent: {
			type: Function,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectComboboxRootContext();
		rootContext.isVirtual.value = true;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(ListboxVirtualizer_default, normalizeProps(guardReactiveProps(props)), {
				default: withCtx((slotProps) => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region app/composables/useCreditIncrease.ts
function useCreditIncrease() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listCreditIncreaseRequests(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/credit-increase-requests`, {
			headers: authHeaders(),
			query: {
				per_page: 15,
				...params
			}
		})).data;
	}
	async function preAuthorizeCreditIncrease(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/credit-increase-requests/${id}/pre-authorize`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function requestCreditIncrease(payload) {
		return (await $fetch$2(`${config.public.apiBase}/credit-increase-requests`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	return {
		listCreditIncreaseRequests,
		preAuthorizeCreditIncrease,
		requestCreditIncrease
	};
}
//#endregion
//#region app/components/credit-increase/PreAuthorizeModal.vue?vue&type=script&setup=true&lang.ts
var PreAuthorizeModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PreAuthorizeModal",
	__ssrInlineRender: true,
	props: { item: {} },
	emits: ["preAuthorized"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const schema = z.object({
			pre_authorized_amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
			decision_notes: z.string().optional()
		});
		const open = ref(false);
		const state = reactive({
			pre_authorized_amount: void 0,
			decision_notes: void 0
		});
		const { preAuthorizeCreditIncrease } = useCreditIncrease();
		const toast = useToast();
		const submitting = ref(false);
		watch(open, (isOpen) => {
			if (isOpen) {
				state.pre_authorized_amount = props.item.requested_amount;
				state.decision_notes = void 0;
			}
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await preAuthorizeCreditIncrease(props.item.id, {
					pre_authorized_amount: String(event.data.pre_authorized_amount),
					decision_notes: event.data.decision_notes || void 0
				});
				toast.add({
					title: "Pre-autorizado",
					description: `La solicitud #${props.item.id} fue pre-autorizada.`,
					color: "success"
				});
				open.value = false;
				emit("preAuthorized");
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo pre-autorizar la solicitud. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$c;
			const _component_UButton = _sfc_main$b;
			const _component_UForm = _sfc_main$d;
			const _component_UFormField = _sfc_main$e;
			const _component_UInput = _sfc_main$f;
			const _component_UTextarea = _sfc_main$g;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Pre-autorizar incremento",
				description: "Pre-autoriza el monto antes de enviarlo a decisión final del gerente",
				ui: { content: "max-w-xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Monto solicitado",
									name: "requested_amount"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<p class="text-sm font-medium text-highlighted"${_scopeId}>${ssrInterpolate(new Intl.NumberFormat("es-MX", {
											style: "currency",
											currency: "MXN"
										}).format(Number(__props.item.requested_amount)))}</p>`);
										else return [createVNode("p", { class: "text-sm font-medium text-highlighted" }, toDisplayString(new Intl.NumberFormat("es-MX", {
											style: "currency",
											currency: "MXN"
										}).format(Number(__props.item.requested_amount))), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Monto pre-autorizado (MXN)",
									name: "pre_authorized_amount",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).pre_authorized_amount,
											"onUpdate:modelValue": ($event) => unref(state).pre_authorized_amount = $event,
											type: "number",
											step: "0.01",
											min: "0.01",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).pre_authorized_amount,
											"onUpdate:modelValue": ($event) => unref(state).pre_authorized_amount = $event,
											type: "number",
											step: "0.01",
											min: "0.01",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Notas (opcional)",
									name: "decision_notes"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).decision_notes,
											"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).decision_notes,
											"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Confirmar",
									type: "submit",
									color: "primary",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UFormField, {
									label: "Monto solicitado",
									name: "requested_amount"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-sm font-medium text-highlighted" }, toDisplayString(new Intl.NumberFormat("es-MX", {
										style: "currency",
										currency: "MXN"
									}).format(Number(__props.item.requested_amount))), 1)]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Monto pre-autorizado (MXN)",
									name: "pre_authorized_amount",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).pre_authorized_amount,
										"onUpdate:modelValue": ($event) => unref(state).pre_authorized_amount = $event,
										type: "number",
										step: "0.01",
										min: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Notas (opcional)",
									name: "decision_notes"
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).decision_notes,
										"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Confirmar",
									type: "submit",
									color: "primary",
									loading: unref(submitting)
								}, null, 8, ["loading"])])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UFormField, {
								label: "Monto solicitado",
								name: "requested_amount"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-sm font-medium text-highlighted" }, toDisplayString(new Intl.NumberFormat("es-MX", {
									style: "currency",
									currency: "MXN"
								}).format(Number(__props.item.requested_amount))), 1)]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Monto pre-autorizado (MXN)",
								name: "pre_authorized_amount",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).pre_authorized_amount,
									"onUpdate:modelValue": ($event) => unref(state).pre_authorized_amount = $event,
									type: "number",
									step: "0.01",
									min: "0.01",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Notas (opcional)",
								name: "decision_notes"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).decision_notes,
									"onUpdate:modelValue": ($event) => unref(state).decision_notes = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "ghost",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Confirmar",
								type: "submit",
								color: "primary",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Pre-autorizar",
						icon: "i-lucide-badge-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Pre-autorizar",
						icon: "i-lucide-badge-check",
						color: "primary",
						variant: "outline",
						size: "xs"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/credit-increase/PreAuthorizeModal.vue
var _sfc_setup$4 = PreAuthorizeModal_vue_vue_type_script_setup_true_lang_default.setup;
PreAuthorizeModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/credit-increase/PreAuthorizeModal.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var PreAuthorizeModal_default = Object.assign(PreAuthorizeModal_vue_vue_type_script_setup_true_lang_default, { __name: "CreditIncreasePreAuthorizeModal" });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fselect-menu.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_menu_default = {
	"slots": {
		"base": ["relative group rounded-md inline-flex items-center disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leading": "absolute inset-y-0 start-0 flex items-center",
		"leadingIcon": "shrink-0 text-dimmed",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"trailing": "absolute inset-y-0 end-0 flex items-center",
		"trailingIcon": "shrink-0 text-dimmed",
		"value": "truncate pointer-events-none",
		"placeholder": "truncate text-dimmed",
		"arrow": "fill-bg stroke-default",
		"content": ["max-h-[min(15rem,var(--reka-select-content-available-height,15rem))] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col", "max-h-[min(15rem,var(--reka-combobox-content-available-height,15rem))] origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"],
		"viewport": "relative scroll-py-1 overflow-y-auto flex-1",
		"group": "p-1 isolate",
		"empty": "text-center text-muted",
		"label": "font-semibold text-highlighted",
		"separator": "-mx-1 my-1 h-px bg-border",
		"item": ["group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50", "transition-colors before:transition-colors"],
		"itemLeadingIcon": ["shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default", "transition-colors"],
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemLeadingChip": "shrink-0",
		"itemLeadingChipSize": "",
		"itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
		"itemTrailingIcon": "shrink-0",
		"itemWrapper": "flex-1 flex flex-col min-w-0",
		"itemLabel": "truncate",
		"itemDescription": "truncate text-muted",
		"input": "border-b border-default",
		"focusScope": "flex flex-col min-h-0",
		"trailingClear": "p-0"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
			"vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
		},
		"size": {
			"xs": {
				"base": "px-2 py-1 text-xs gap-1",
				"leading": "ps-2",
				"trailing": "pe-2",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4",
				"label": "p-1 text-[10px]/3 gap-1",
				"item": "p-1 text-xs gap-1",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailingIcon": "size-4",
				"empty": "p-2 text-xs"
			},
			"sm": {
				"base": "px-2.5 py-1.5 text-xs gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4",
				"label": "p-1.5 text-[10px]/3 gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailingIcon": "size-4",
				"empty": "p-2.5 text-xs"
			},
			"md": {
				"base": "px-2.5 py-1.5 text-sm gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5",
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailingIcon": "size-5",
				"empty": "p-2.5 text-sm"
			},
			"lg": {
				"base": "px-3 py-2 text-sm gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5",
				"label": "p-2 text-xs gap-2",
				"item": "p-2 text-sm gap-2",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailingIcon": "size-5",
				"empty": "p-3 text-sm"
			},
			"xl": {
				"base": "px-3 py-2 text-base gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs",
				"trailingIcon": "size-6",
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-base gap-2",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemLeadingChip": "size-6",
				"itemLeadingChipSize": "lg",
				"itemTrailingIcon": "size-6",
				"empty": "p-3 text-base"
			}
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent focus:outline-none"
		},
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"leading": { "true": "" },
		"trailing": { "true": "" },
		"loading": { "true": "" },
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"type": { "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none" },
		"position": {
			"popper": { "content": "data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]" },
			"item-aligned": { "content": "" }
		},
		"multiple": { "true": "" },
		"virtualize": {
			"true": { "viewport": "p-1 isolate" },
			"false": { "viewport": "divide-y divide-default" }
		}
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": ["outline", "subtle"],
			"class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
		},
		{
			"color": "secondary",
			"variant": ["outline", "subtle"],
			"class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
		},
		{
			"color": "success",
			"variant": ["outline", "subtle"],
			"class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
		},
		{
			"color": "info",
			"variant": ["outline", "subtle"],
			"class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
		},
		{
			"color": "warning",
			"variant": ["outline", "subtle"],
			"class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
		},
		{
			"color": "error",
			"variant": ["outline", "subtle"],
			"class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
		},
		{
			"color": "primary",
			"variant": ["soft", "ghost"],
			"class": "outline-primary/25 focus-visible:outline-3"
		},
		{
			"color": "secondary",
			"variant": ["soft", "ghost"],
			"class": "outline-secondary/25 focus-visible:outline-3"
		},
		{
			"color": "success",
			"variant": ["soft", "ghost"],
			"class": "outline-success/25 focus-visible:outline-3"
		},
		{
			"color": "info",
			"variant": ["soft", "ghost"],
			"class": "outline-info/25 focus-visible:outline-3"
		},
		{
			"color": "warning",
			"variant": ["soft", "ghost"],
			"class": "outline-warning/25 focus-visible:outline-3"
		},
		{
			"color": "error",
			"variant": ["soft", "ghost"],
			"class": "outline-error/25 focus-visible:outline-3"
		},
		{
			"color": "primary",
			"highlight": true,
			"class": "ring ring-inset ring-primary"
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": "ring ring-inset ring-secondary"
		},
		{
			"color": "success",
			"highlight": true,
			"class": "ring ring-inset ring-success"
		},
		{
			"color": "info",
			"highlight": true,
			"class": "ring ring-inset ring-info"
		},
		{
			"color": "warning",
			"highlight": true,
			"class": "ring ring-inset ring-warning"
		},
		{
			"color": "error",
			"highlight": true,
			"class": "ring ring-inset ring-error"
		},
		{
			"color": "neutral",
			"variant": ["outline", "subtle"],
			"class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
		},
		{
			"color": "neutral",
			"variant": ["soft", "ghost"],
			"class": "outline-inverted/25 focus-visible:outline-3"
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": "ring ring-inset ring-inverted"
		},
		{
			"leading": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"leading": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"leading": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"leading": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"leading": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"trailing": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"trailing": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"trailing": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"trailing": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"trailing": true,
			"size": "xl",
			"class": "pe-11"
		},
		{
			"loading": true,
			"leading": true,
			"class": { "leadingIcon": "animate-spin" }
		},
		{
			"loading": true,
			"leading": false,
			"trailing": true,
			"class": { "trailingIcon": "animate-spin" }
		},
		{
			"fixed": false,
			"size": "xs",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "sm",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "md",
			"class": "md:text-sm"
		},
		{
			"fixed": false,
			"size": "lg",
			"class": "md:text-sm"
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "outline",
		"position": "popper"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "USelectMenu",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		id: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		searchInput: {
			type: [Boolean, Object],
			required: false,
			default: true
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
		required: {
			type: Boolean,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		selectedIcon: {
			type: null,
			required: false
		},
		clear: {
			type: [Boolean, Object],
			required: false
		},
		clearIcon: {
			type: null,
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
		virtualize: {
			type: [Boolean, Object],
			required: false,
			default: false
		},
		valueKey: {
			type: null,
			required: false
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
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		modelModifiers: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		createItem: {
			type: [
				Boolean,
				String,
				Object
			],
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
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
			required: false,
			default: 0
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
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		resetSearchTermOnBlur: {
			type: Boolean,
			required: false,
			default: true
		},
		resetSearchTermOnSelect: {
			type: Boolean,
			required: false,
			default: true
		},
		resetModelValueOnClear: {
			type: Boolean,
			required: false,
			default: true
		},
		highlightOnHover: {
			type: Boolean,
			required: false
		},
		by: {
			type: [String, Function],
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
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	}, {
		"searchTerm": {
			type: String,
			default: ""
		},
		"searchTermModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"change",
		"blur",
		"focus",
		"create",
		"clear",
		"highlight",
		"update:modelValue",
		"update:open"
	], ["update:searchTerm"]),
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = useSlots();
		const props = useComponentProps("selectMenu", _props);
		const searchTerm = useModel(__props, "searchTerm", {
			type: String,
			default: ""
		});
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const { filterGroups } = useFilter();
		const rootProps = useForwardProps(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "resetModelValueOnClear", "highlightOnHover", "by"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8,
			position: "popper"
		}));
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const clearProps = computed(() => typeof props.clear === "object" ? props.clear : {});
		const virtualizerProps = toRef(() => {
			if (!props.virtualize) return false;
			return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, { estimateSize: getEstimateSize(filteredItems.value, selectSize.value || "md", props.descriptionKey, !!slots["item-description"]) });
		});
		const searchInputProps = toRef(() => defu(props.searchInput, {
			placeholder: t("selectMenu.search"),
			variant: "none"
		}));
		const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props);
		const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
		const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
		const selectSize = computed(() => fieldGroupSize.value || formFieldSize.value);
		const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({ props: {
			item: {
				type: [
					Object,
					String,
					Number,
					Boolean
				],
				required: true
			},
			index: {
				type: Number,
				required: false
			}
		} });
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_menu_default,
			...appConfig.ui?.selectMenu || {}
		})({
			color: color.value ?? props.color,
			variant: props.variant,
			size: selectSize?.value ?? props.size,
			loading: props.loading,
			highlight: highlight.value ?? props.highlight,
			leading: isLeading.value || !!props.avatar || !!slots.leading,
			trailing: isTrailing.value || !!slots.trailing,
			fieldGroup: orientation.value,
			virtualize: !!props.virtualize,
			multiple: props.multiple
		}));
		function displayValue(value) {
			if (props.multiple && Array.isArray(value)) {
				const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
					labelKey: props.labelKey,
					valueKey: props.valueKey,
					by: props.by
				})).filter((v) => v != null && v !== "");
				return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
			}
			return getDisplayValue(items.value, value, {
				labelKey: props.labelKey,
				valueKey: props.valueKey,
				by: props.by
			});
		}
		const groups = computed(() => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []);
		const items = computed(() => groups.value.flatMap((group) => group));
		const filteredGroups = computed(() => {
			if (props.ignoreFilter || !searchTerm.value) return groups.value;
			const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
			return filterGroups(groups.value, searchTerm.value, {
				fields,
				isStructural: (item) => isSelectItem(item) && !!item.type && ["label", "separator"].includes(item.type)
			});
		});
		const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
		const createItem = computed(() => {
			if (!props.createItem || !searchTerm.value) return false;
			const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
			if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") return !filteredItems.value.find((item) => compare(item, newItem, props.by ?? props.valueKey));
			return !filteredItems.value.length;
		});
		const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
		const triggerRef = useTemplateRef("triggerRef");
		function onUpdate(value) {
			if (toRaw(props.modelValue) === value) return;
			if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) value = value?.trim() ?? null;
			if (props.modelModifiers?.number) value = looseToNumber(value);
			if (props.modelModifiers?.nullable) value ??= null;
			if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) value ??= void 0;
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
			if (props.resetSearchTermOnSelect) searchTerm.value = "";
		}
		const isOpen = ref(false);
		function onUpdateOpen(value) {
			isOpen.value = value;
			let timeoutId;
			if (!value) {
				const event = new FocusEvent("blur");
				emits("blur", event);
				emitFormBlur();
				if (props.resetSearchTermOnBlur) timeoutId = setTimeout(() => {
					searchTerm.value = "";
				}, 100);
			} else {
				const event = new FocusEvent("focus");
				emits("focus", event);
				emitFormFocus();
				clearTimeout(timeoutId);
			}
		}
		function onCreate(e) {
			e.preventDefault();
			e.stopPropagation();
			emits("create", searchTerm.value);
		}
		function onSelect(e, item) {
			if (!isSelectItem(item)) return;
			if (item.disabled) {
				e.preventDefault();
				return;
			}
			item.onSelect?.(e);
		}
		function isSelectItem(item) {
			return typeof item === "object" && item !== null;
		}
		function isModelValueEmpty(modelValue) {
			if (props.multiple && Array.isArray(modelValue)) return modelValue.length === 0;
			return modelValue === void 0 || modelValue === null || modelValue === "";
		}
		function onClear() {
			emits("clear");
		}
		const viewportRef = useTemplateRef("viewportRef");
		const comboboxRootRef = useTemplateRef("comboboxRootRef");
		watch(() => props.items, async () => {
			if (!isOpen.value || !props.createItem) return;
			await nextTick();
			comboboxRootRef.value?.highlightFirstItem?.();
		}, { flush: "post" });
		__expose({
			triggerRef: toRef(() => triggerRef.value?.$el),
			viewportRef: toRef(() => viewportRef.value)
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineCreateItemTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(ComboboxItem_default), {
						"data-slot": "item",
						class: ui.value.item({ class: unref(props).ui?.item }),
						value: searchTerm.value,
						onSelect: onCreate
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span data-slot="itemLabel" class="${ssrRenderClass(ui.value.itemLabel({ class: unref(props).ui?.itemLabel }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
									_push(`${ssrInterpolate(unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else return [createVNode("span", {
								"data-slot": "itemLabel",
								class: ui.value.itemLabel({ class: unref(props).ui?.itemLabel })
							}, [renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)])], 2)];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [createVNode(unref(ComboboxItem_default), {
						"data-slot": "item",
						class: ui.value.item({ class: unref(props).ui?.item }),
						value: searchTerm.value,
						onSelect: onCreate
					}, {
						default: withCtx(() => [createVNode("span", {
							"data-slot": "itemLabel",
							class: ui.value.itemLabel({ class: unref(props).ui?.itemLabel })
						}, [renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)])], 2)]),
						_: 3
					}, 8, ["class", "value"])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DefineItemTemplate), null, {
				default: withCtx(({ item, index }, _push, _parent, _scopeId) => {
					if (_push) if (isSelectItem(item) && item.type === "label") _push(ssrRenderComponent(unref(ComboboxLabel_default), {
						"data-slot": "label",
						class: ui.value.label({ class: [
							unref(props).ui?.label,
							item.ui?.label,
							item.class
						] })
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(get)(item, unref(props).labelKey))}`);
							else return [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)];
						}),
						_: 2
					}, _parent, _scopeId));
					else if (isSelectItem(item) && item.type === "separator") _push(ssrRenderComponent(unref(ComboboxSeparator_default), {
						"data-slot": "separator",
						class: ui.value.separator({ class: [
							unref(props).ui?.separator,
							item.ui?.separator,
							item.class
						] })
					}, null, _parent, _scopeId));
					else _push(ssrRenderComponent(unref(ComboboxItem_default), {
						"data-slot": "item",
						class: ui.value.item({ class: [
							unref(props).ui?.item,
							isSelectItem(item) && item.ui?.item,
							isSelectItem(item) && item.class
						] }),
						disabled: isSelectItem(item) && item.disabled,
						value: unref(props).valueKey && isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
						onSelect: ($event) => onSelect($event, item)
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) ssrRenderSlot(_ctx.$slots, "item", {
								item,
								index,
								ui: ui.value
							}, () => {
								ssrRenderSlot(_ctx.$slots, "item-leading", {
									item,
									index,
									ui: ui.value
								}, () => {
									if (isSelectItem(item) && item.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
										name: item.icon,
										"data-slot": "itemLeadingIcon",
										class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
									}, null, _parent, _scopeId));
									else if (isSelectItem(item) && item.avatar) _push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, item.avatar, {
										"data-slot": "itemLeadingAvatar",
										class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
									}), null, _parent, _scopeId));
									else if (isSelectItem(item) && item.chip) _push(ssrRenderComponent(_sfc_main$2$2, mergeProps({
										size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
										inset: "",
										standalone: ""
									}, item.chip, {
										"data-slot": "itemLeadingChip",
										class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
									}), null, _parent, _scopeId));
									else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								_push(`<span data-slot="itemWrapper" class="${ssrRenderClass(ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${ssrRenderClass(ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "item-label", {
									item,
									index
								}, () => {
									_push(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item)}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
								if (isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"])) {
									_push(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId}>`);
									ssrRenderSlot(_ctx.$slots, "item-description", {
										item,
										index
									}, () => {
										_push(`${ssrInterpolate(unref(get)(item, unref(props).descriptionKey))}`);
									}, _push, _parent, _scopeId);
									_push(`</span>`);
								} else _push(`<!---->`);
								_push(`</span><span data-slot="itemTrailing" class="${ssrRenderClass(ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "item-trailing", {
									item,
									index,
									ui: ui.value
								}, null, _push, _parent, _scopeId);
								_push(ssrRenderComponent(unref(ComboboxItemIndicator_default), { "as-child": "" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_sfc_main$2$1, {
											name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
											"data-slot": "itemTrailingIcon",
											class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
										}, null, _parent, _scopeId));
										else return [createVNode(_sfc_main$2$1, {
											name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
											"data-slot": "itemTrailingIcon",
											class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
										}, null, 8, ["name", "class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								_push(`</span>`);
							}, _push, _parent, _scopeId);
							else return [renderSlot(_ctx.$slots, "item", {
								item,
								index,
								ui: ui.value
							}, () => [
								renderSlot(_ctx.$slots, "item-leading", {
									item,
									index,
									ui: ui.value
								}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
									key: 0,
									name: item.icon,
									"data-slot": "itemLeadingIcon",
									class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
								}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
									key: 1,
									size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
								}, item.avatar, {
									"data-slot": "itemLeadingAvatar",
									class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
								}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2$2, mergeProps({
									key: 2,
									size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
									inset: "",
									standalone: ""
								}, item.chip, {
									"data-slot": "itemLeadingChip",
									class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
								}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
								createVNode("span", {
									"data-slot": "itemWrapper",
									class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
								}, [createVNode("span", {
									"data-slot": "itemLabel",
									class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
								}, [renderSlot(_ctx.$slots, "item-label", {
									item,
									index
								}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])], 2), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
									key: 0,
									"data-slot": "itemDescription",
									class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
								}, [renderSlot(_ctx.$slots, "item-description", {
									item,
									index
								}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
								createVNode("span", {
									"data-slot": "itemTrailing",
									class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
								}, [renderSlot(_ctx.$slots, "item-trailing", {
									item,
									index,
									ui: ui.value
								}), createVNode(unref(ComboboxItemIndicator_default), { "as-child": "" }, {
									default: withCtx(() => [createVNode(_sfc_main$2$1, {
										name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
										"data-slot": "itemTrailingIcon",
										class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
									}, null, 8, ["name", "class"])]),
									_: 2
								}, 1024)], 2)
							])];
						}),
						_: 2
					}, _parent, _scopeId));
					else return [isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel_default), {
						key: 0,
						"data-slot": "label",
						class: ui.value.label({ class: [
							unref(props).ui?.label,
							item.ui?.label,
							item.class
						] })
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)]),
						_: 2
					}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator_default), {
						key: 1,
						"data-slot": "separator",
						class: ui.value.separator({ class: [
							unref(props).ui?.separator,
							item.ui?.separator,
							item.class
						] })
					}, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem_default), {
						key: 2,
						"data-slot": "item",
						class: ui.value.item({ class: [
							unref(props).ui?.item,
							isSelectItem(item) && item.ui?.item,
							isSelectItem(item) && item.class
						] }),
						disabled: isSelectItem(item) && item.disabled,
						value: unref(props).valueKey && isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
						onSelect: ($event) => onSelect($event, item)
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "item", {
							item,
							index,
							ui: ui.value
						}, () => [
							renderSlot(_ctx.$slots, "item-leading", {
								item,
								index,
								ui: ui.value
							}, () => [isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
								key: 0,
								name: item.icon,
								"data-slot": "itemLeadingIcon",
								class: ui.value.itemLeadingIcon({ class: [unref(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
							}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
								key: 1,
								size: item.ui?.itemLeadingAvatarSize || unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
							}, item.avatar, {
								"data-slot": "itemLeadingAvatar",
								class: ui.value.itemLeadingAvatar({ class: [unref(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
							}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$2$2, mergeProps({
								key: 2,
								size: item.ui?.itemLeadingChipSize || unref(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
								inset: "",
								standalone: ""
							}, item.chip, {
								"data-slot": "itemLeadingChip",
								class: ui.value.itemLeadingChip({ class: [unref(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
							}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
							createVNode("span", {
								"data-slot": "itemWrapper",
								class: ui.value.itemWrapper({ class: [unref(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
							}, [createVNode("span", {
								"data-slot": "itemLabel",
								class: ui.value.itemLabel({ class: [unref(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
							}, [renderSlot(_ctx.$slots, "item-label", {
								item,
								index
							}, () => [createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)])], 2), isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
								key: 0,
								"data-slot": "itemDescription",
								class: ui.value.itemDescription({ class: [unref(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
							}, [renderSlot(_ctx.$slots, "item-description", {
								item,
								index
							}, () => [createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2),
							createVNode("span", {
								"data-slot": "itemTrailing",
								class: ui.value.itemTrailing({ class: [unref(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
							}, [renderSlot(_ctx.$slots, "item-trailing", {
								item,
								index,
								ui: ui.value
							}), createVNode(unref(ComboboxItemIndicator_default), { "as-child": "" }, {
								default: withCtx(() => [createVNode(_sfc_main$2$1, {
									name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: ui.value.itemTrailingIcon({ class: [unref(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
								}, null, 8, ["name", "class"])]),
								_: 2
							}, 1024)], 2)
						])]),
						_: 2
					}, 1032, [
						"class",
						"disabled",
						"value",
						"onSelect"
					]))];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(ComboboxRoot_default), mergeProps({
				ref_key: "comboboxRootRef",
				ref: comboboxRootRef
			}, unref(rootProps), {
				"ignore-filter": "",
				"as-child": "",
				name: unref(name),
				disabled: unref(disabled),
				"onUpdate:modelValue": onUpdate,
				"onUpdate:open": onUpdateOpen
			}), {
				default: withCtx(({ modelValue, open }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(ComboboxAnchor_default), { "as-child": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(ComboboxTrigger_default), mergeProps({
									id: unref(id),
									ref_key: "triggerRef",
									ref: triggerRef,
									"data-slot": "base",
									class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] }),
									tabindex: "0"
								}, {
									..._ctx.$attrs,
									...unref(ariaAttrs)
								}), {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
												_push(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(props).ui?.leading }))}"${_scopeId}>`);
												ssrRenderSlot(_ctx.$slots, "leading", {
													modelValue,
													open,
													ui: ui.value
												}, () => {
													if (unref(isLeading) && unref(leadingIconName)) _push(ssrRenderComponent(_sfc_main$2$1, {
														name: unref(leadingIconName),
														"data-slot": "leadingIcon",
														class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
													}, null, _parent, _scopeId));
													else if (!!unref(props).avatar) _push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, unref(props).avatar, {
														"data-slot": "itemLeadingAvatar",
														class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												}, _push, _parent, _scopeId);
												_push(`</span>`);
											} else _push(`<!---->`);
											ssrRenderSlot(_ctx.$slots, "default", {
												modelValue,
												open,
												ui: ui.value
											}, () => {
												_push(`<!--[-->`);
												ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
													_push(`<!--[-->`);
													if (displayedModelValue !== void 0 && displayedModelValue !== null) _push(`<span data-slot="value" class="${ssrRenderClass(ui.value.value({ class: unref(props).ui?.value }))}"${_scopeId}>${ssrInterpolate(displayedModelValue)}</span>`);
													else _push(`<span data-slot="placeholder" class="${ssrRenderClass(ui.value.placeholder({ class: unref(props).ui?.placeholder }))}"${_scopeId}>${ssrInterpolate(unref(props).placeholder ?? "\xA0")}</span>`);
													_push(`<!--]-->`);
												});
												_push(`<!--]-->`);
											}, _push, _parent, _scopeId);
											if (unref(isTrailing) || !!slots.trailing || !!unref(props).clear) {
												_push(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(props).ui?.trailing }))}"${_scopeId}>`);
												ssrRenderSlot(_ctx.$slots, "trailing", {
													modelValue,
													open,
													ui: ui.value
												}, () => {
													if (!!unref(props).clear && !isModelValueEmpty(modelValue)) _push(ssrRenderComponent(unref(ComboboxCancel_default), { "as-child": "" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_sfc_main$b, mergeProps({
																as: "span",
																icon: unref(props).clearIcon || unref(appConfig).ui.icons.close,
																size: selectSize.value,
																variant: "link",
																color: "neutral",
																tabindex: "-1"
															}, clearProps.value, {
																"data-slot": "trailingClear",
																class: ui.value.trailingClear({ class: unref(props).ui?.trailingClear }),
																onClick: onClear
															}), null, _parent, _scopeId));
															else return [createVNode(_sfc_main$b, mergeProps({
																as: "span",
																icon: unref(props).clearIcon || unref(appConfig).ui.icons.close,
																size: selectSize.value,
																variant: "link",
																color: "neutral",
																tabindex: "-1"
															}, clearProps.value, {
																"data-slot": "trailingClear",
																class: ui.value.trailingClear({ class: unref(props).ui?.trailingClear }),
																onClick: withModifiers(onClear, ["stop"])
															}), null, 16, [
																"icon",
																"size",
																"class"
															])];
														}),
														_: 2
													}, _parent, _scopeId));
													else if (unref(trailingIconName)) _push(ssrRenderComponent(_sfc_main$2$1, {
														name: unref(trailingIconName),
														"data-slot": "trailingIcon",
														class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
													}, null, _parent, _scopeId));
													else _push(`<!---->`);
												}, _push, _parent, _scopeId);
												_push(`</span>`);
											} else _push(`<!---->`);
										} else return [
											unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
												key: 0,
												"data-slot": "leading",
												class: ui.value.leading({ class: unref(props).ui?.leading })
											}, [renderSlot(_ctx.$slots, "leading", {
												modelValue,
												open,
												ui: ui.value
											}, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
												key: 0,
												name: unref(leadingIconName),
												"data-slot": "leadingIcon",
												class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
											}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
												key: 1,
												size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
											}, unref(props).avatar, {
												"data-slot": "itemLeadingAvatar",
												class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
											}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
											renderSlot(_ctx.$slots, "default", {
												modelValue,
												open,
												ui: ui.value
											}, () => [(openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
												return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
													key: 0,
													"data-slot": "value",
													class: ui.value.value({ class: unref(props).ui?.value })
												}, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
													key: 1,
													"data-slot": "placeholder",
													class: ui.value.placeholder({ class: unref(props).ui?.placeholder })
												}, toDisplayString(unref(props).placeholder ?? "\xA0"), 3))], 64);
											}), 128))]),
											unref(isTrailing) || !!slots.trailing || !!unref(props).clear ? (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "trailing",
												class: ui.value.trailing({ class: unref(props).ui?.trailing })
											}, [renderSlot(_ctx.$slots, "trailing", {
												modelValue,
												open,
												ui: ui.value
											}, () => [!!unref(props).clear && !isModelValueEmpty(modelValue) ? (openBlock(), createBlock(unref(ComboboxCancel_default), {
												key: 0,
												"as-child": ""
											}, {
												default: withCtx(() => [createVNode(_sfc_main$b, mergeProps({
													as: "span",
													icon: unref(props).clearIcon || unref(appConfig).ui.icons.close,
													size: selectSize.value,
													variant: "link",
													color: "neutral",
													tabindex: "-1"
												}, clearProps.value, {
													"data-slot": "trailingClear",
													class: ui.value.trailingClear({ class: unref(props).ui?.trailingClear }),
													onClick: withModifiers(onClear, ["stop"])
												}), null, 16, [
													"icon",
													"size",
													"class"
												])]),
												_: 1
											})) : unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
												key: 1,
												name: unref(trailingIconName),
												"data-slot": "trailingIcon",
												class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
											}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
										];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(ComboboxTrigger_default), mergeProps({
									id: unref(id),
									ref_key: "triggerRef",
									ref: triggerRef,
									"data-slot": "base",
									class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] }),
									tabindex: "0"
								}, {
									..._ctx.$attrs,
									...unref(ariaAttrs)
								}), {
									default: withCtx(() => [
										unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "leading",
											class: ui.value.leading({ class: unref(props).ui?.leading })
										}, [renderSlot(_ctx.$slots, "leading", {
											modelValue,
											open,
											ui: ui.value
										}, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
											key: 0,
											name: unref(leadingIconName),
											"data-slot": "leadingIcon",
											class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
										}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
											key: 1,
											size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
										}, unref(props).avatar, {
											"data-slot": "itemLeadingAvatar",
											class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
										}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
										renderSlot(_ctx.$slots, "default", {
											modelValue,
											open,
											ui: ui.value
										}, () => [(openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
											return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
												key: 0,
												"data-slot": "value",
												class: ui.value.value({ class: unref(props).ui?.value })
											}, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "placeholder",
												class: ui.value.placeholder({ class: unref(props).ui?.placeholder })
											}, toDisplayString(unref(props).placeholder ?? "\xA0"), 3))], 64);
										}), 128))]),
										unref(isTrailing) || !!slots.trailing || !!unref(props).clear ? (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "trailing",
											class: ui.value.trailing({ class: unref(props).ui?.trailing })
										}, [renderSlot(_ctx.$slots, "trailing", {
											modelValue,
											open,
											ui: ui.value
										}, () => [!!unref(props).clear && !isModelValueEmpty(modelValue) ? (openBlock(), createBlock(unref(ComboboxCancel_default), {
											key: 0,
											"as-child": ""
										}, {
											default: withCtx(() => [createVNode(_sfc_main$b, mergeProps({
												as: "span",
												icon: unref(props).clearIcon || unref(appConfig).ui.icons.close,
												size: selectSize.value,
												variant: "link",
												color: "neutral",
												tabindex: "-1"
											}, clearProps.value, {
												"data-slot": "trailingClear",
												class: ui.value.trailingClear({ class: unref(props).ui?.trailingClear }),
												onClick: withModifiers(onClear, ["stop"])
											}), null, 16, [
												"icon",
												"size",
												"class"
											])]),
											_: 1
										})) : unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
											key: 1,
											name: unref(trailingIconName),
											"data-slot": "trailingIcon",
											class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
										}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
									]),
									_: 2
								}, 1040, ["id", "class"])];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(ComboboxPortal_default), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(FieldGroupReset), null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(unref(ComboboxContent_default), mergeProps({
											"data-slot": "content",
											class: ui.value.content({ class: unref(props).ui?.content })
										}, contentProps.value), {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(ssrRenderComponent(unref(FocusScope_default), {
														trapped: "",
														"data-slot": "focusScope",
														class: ui.value.focusScope({ class: unref(props).ui?.focusScope })
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push, _parent, _scopeId);
																if (!!unref(props).searchInput) _push(ssrRenderComponent(unref(ComboboxInput_default), {
																	modelValue: searchTerm.value,
																	"onUpdate:modelValue": ($event) => searchTerm.value = $event,
																	"display-value": () => searchTerm.value,
																	"as-child": ""
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(_sfc_main$f, mergeProps({
																			autofocus: "",
																			autocomplete: "off",
																			size: selectSize.value
																		}, searchInputProps.value, {
																			"model-modifiers": { trim: unref(props).modelModifiers?.trim },
																			"data-slot": "input",
																			class: ui.value.input({ class: unref(props).ui?.input }),
																			onChange: () => {}
																		}), null, _parent, _scopeId));
																		else return [createVNode(_sfc_main$f, mergeProps({
																			autofocus: "",
																			autocomplete: "off",
																			size: selectSize.value
																		}, searchInputProps.value, {
																			"model-modifiers": { trim: unref(props).modelModifiers?.trim },
																			"data-slot": "input",
																			class: ui.value.input({ class: unref(props).ui?.input }),
																			onChange: withModifiers(() => {}, ["stop"])
																		}), null, 16, [
																			"size",
																			"model-modifiers",
																			"class",
																			"onChange"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else _push(`<!---->`);
																_push(ssrRenderComponent(unref(ComboboxEmpty_default), {
																	"data-slot": "empty",
																	class: ui.value.empty({ class: unref(props).ui?.empty })
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
																			_push(`${ssrInterpolate(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData"))}`);
																		}, _push, _parent, _scopeId);
																		else return [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(ui.value.viewport({ class: unref(props).ui?.viewport }))}"${_scopeId}>`);
																if (!!unref(props).virtualize) {
																	_push(`<!--[-->`);
																	if (createItem.value && createItemPosition.value === "top") _push(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent, _scopeId));
																	else _push(`<!---->`);
																	_push(ssrRenderComponent(unref(ComboboxVirtualizer_default), mergeProps({
																		options: filteredItems.value,
																		"text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, unref(props).labelKey) : String(item2)
																	}, virtualizerProps.value), {
																		default: withCtx(({ option: item, virtualItem }, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																				item,
																				index: virtualItem.index
																			}, null, _parent, _scopeId));
																			else return [createVNode(unref(ReuseItemTemplate), {
																				item,
																				index: virtualItem.index
																			}, null, 8, ["item", "index"])];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	if (createItem.value && createItemPosition.value === "bottom") _push(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent, _scopeId));
																	else _push(`<!---->`);
																	_push(`<!--]-->`);
																} else {
																	_push(`<!--[-->`);
																	if (createItem.value && createItemPosition.value === "top") _push(ssrRenderComponent(unref(ComboboxGroup_default), {
																		"data-slot": "group",
																		class: ui.value.group({ class: unref(props).ui?.group })
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent, _scopeId));
																			else return [createVNode(unref(ReuseCreateItemTemplate))];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	else _push(`<!---->`);
																	_push(`<!--[-->`);
																	ssrRenderList(filteredGroups.value, (group, groupIndex) => {
																		_push(ssrRenderComponent(unref(ComboboxGroup_default), {
																			key: `group-${groupIndex}`,
																			"data-slot": "group",
																			class: ui.value.group({ class: unref(props).ui?.group })
																		}, {
																			default: withCtx((_, _push, _parent, _scopeId) => {
																				if (_push) {
																					_push(`<!--[-->`);
																					ssrRenderList(group, (item, index) => {
																						_push(ssrRenderComponent(unref(ReuseItemTemplate), {
																							key: `group-${groupIndex}-${index}`,
																							item,
																							index
																						}, null, _parent, _scopeId));
																					});
																					_push(`<!--]-->`);
																				} else return [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																					return openBlock(), createBlock(unref(ReuseItemTemplate), {
																						key: `group-${groupIndex}-${index}`,
																						item,
																						index
																					}, null, 8, ["item", "index"]);
																				}), 128))];
																			}),
																			_: 2
																		}, _parent, _scopeId));
																	});
																	_push(`<!--]-->`);
																	if (createItem.value && createItemPosition.value === "bottom") _push(ssrRenderComponent(unref(ComboboxGroup_default), {
																		"data-slot": "group",
																		class: ui.value.group({ class: unref(props).ui?.group })
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent, _scopeId));
																			else return [createVNode(unref(ReuseCreateItemTemplate))];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	else _push(`<!---->`);
																	_push(`<!--]-->`);
																}
																_push(`</div>`);
																ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push, _parent, _scopeId);
															} else return [
																renderSlot(_ctx.$slots, "content-top"),
																!!unref(props).searchInput ? (openBlock(), createBlock(unref(ComboboxInput_default), {
																	key: 0,
																	modelValue: searchTerm.value,
																	"onUpdate:modelValue": ($event) => searchTerm.value = $event,
																	"display-value": () => searchTerm.value,
																	"as-child": ""
																}, {
																	default: withCtx(() => [createVNode(_sfc_main$f, mergeProps({
																		autofocus: "",
																		autocomplete: "off",
																		size: selectSize.value
																	}, searchInputProps.value, {
																		"model-modifiers": { trim: unref(props).modelModifiers?.trim },
																		"data-slot": "input",
																		class: ui.value.input({ class: unref(props).ui?.input }),
																		onChange: withModifiers(() => {}, ["stop"])
																	}), null, 16, [
																		"size",
																		"model-modifiers",
																		"class",
																		"onChange"
																	])]),
																	_: 1
																}, 8, [
																	"modelValue",
																	"onUpdate:modelValue",
																	"display-value"
																])) : createCommentVNode("", true),
																createVNode(unref(ComboboxEmpty_default), {
																	"data-slot": "empty",
																	class: ui.value.empty({ class: unref(props).ui?.empty })
																}, {
																	default: withCtx(() => [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)])]),
																	_: 3
																}, 8, ["class"]),
																createVNode("div", {
																	ref_key: "viewportRef",
																	ref: viewportRef,
																	role: "presentation",
																	"data-slot": "viewport",
																	class: ui.value.viewport({ class: unref(props).ui?.viewport })
																}, [!!unref(props).virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
																	createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
																	createVNode(unref(ComboboxVirtualizer_default), mergeProps({
																		options: filteredItems.value,
																		"text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, unref(props).labelKey) : String(item2)
																	}, virtualizerProps.value), {
																		default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
																			item,
																			index: virtualItem.index
																		}, null, 8, ["item", "index"])]),
																		_: 1
																	}, 16, ["options", "text-content"]),
																	createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
																], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
																	createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
																		key: 0,
																		"data-slot": "group",
																		class: ui.value.group({ class: unref(props).ui?.group })
																	}, {
																		default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
																		_: 1
																	}, 8, ["class"])) : createCommentVNode("", true),
																	(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
																		return openBlock(), createBlock(unref(ComboboxGroup_default), {
																			key: `group-${groupIndex}`,
																			"data-slot": "group",
																			class: ui.value.group({ class: unref(props).ui?.group })
																		}, {
																			default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																				return openBlock(), createBlock(unref(ReuseItemTemplate), {
																					key: `group-${groupIndex}-${index}`,
																					item,
																					index
																				}, null, 8, ["item", "index"]);
																			}), 128))]),
																			_: 2
																		}, 1032, ["class"]);
																	}), 128)),
																	createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
																		key: 1,
																		"data-slot": "group",
																		class: ui.value.group({ class: unref(props).ui?.group })
																	}, {
																		default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
																		_: 1
																	}, 8, ["class"])) : createCommentVNode("", true)
																], 64))], 2),
																renderSlot(_ctx.$slots, "content-bottom")
															];
														}),
														_: 2
													}, _parent, _scopeId));
													if (!!unref(props).arrow) _push(ssrRenderComponent(unref(ComboboxArrow_default), mergeProps(arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: unref(props).ui?.arrow })
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												} else return [createVNode(unref(FocusScope_default), {
													trapped: "",
													"data-slot": "focusScope",
													class: ui.value.focusScope({ class: unref(props).ui?.focusScope })
												}, {
													default: withCtx(() => [
														renderSlot(_ctx.$slots, "content-top"),
														!!unref(props).searchInput ? (openBlock(), createBlock(unref(ComboboxInput_default), {
															key: 0,
															modelValue: searchTerm.value,
															"onUpdate:modelValue": ($event) => searchTerm.value = $event,
															"display-value": () => searchTerm.value,
															"as-child": ""
														}, {
															default: withCtx(() => [createVNode(_sfc_main$f, mergeProps({
																autofocus: "",
																autocomplete: "off",
																size: selectSize.value
															}, searchInputProps.value, {
																"model-modifiers": { trim: unref(props).modelModifiers?.trim },
																"data-slot": "input",
																class: ui.value.input({ class: unref(props).ui?.input }),
																onChange: withModifiers(() => {}, ["stop"])
															}), null, 16, [
																"size",
																"model-modifiers",
																"class",
																"onChange"
															])]),
															_: 1
														}, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"display-value"
														])) : createCommentVNode("", true),
														createVNode(unref(ComboboxEmpty_default), {
															"data-slot": "empty",
															class: ui.value.empty({ class: unref(props).ui?.empty })
														}, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)])]),
															_: 3
														}, 8, ["class"]),
														createVNode("div", {
															ref_key: "viewportRef",
															ref: viewportRef,
															role: "presentation",
															"data-slot": "viewport",
															class: ui.value.viewport({ class: unref(props).ui?.viewport })
														}, [!!unref(props).virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
															createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
															createVNode(unref(ComboboxVirtualizer_default), mergeProps({
																options: filteredItems.value,
																"text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, unref(props).labelKey) : String(item2)
															}, virtualizerProps.value), {
																default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
																	item,
																	index: virtualItem.index
																}, null, 8, ["item", "index"])]),
																_: 1
															}, 16, ["options", "text-content"]),
															createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
														], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
															createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
																key: 0,
																"data-slot": "group",
																class: ui.value.group({ class: unref(props).ui?.group })
															}, {
																default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
																_: 1
															}, 8, ["class"])) : createCommentVNode("", true),
															(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
																return openBlock(), createBlock(unref(ComboboxGroup_default), {
																	key: `group-${groupIndex}`,
																	"data-slot": "group",
																	class: ui.value.group({ class: unref(props).ui?.group })
																}, {
																	default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																		return openBlock(), createBlock(unref(ReuseItemTemplate), {
																			key: `group-${groupIndex}-${index}`,
																			item,
																			index
																		}, null, 8, ["item", "index"]);
																	}), 128))]),
																	_: 2
																}, 1032, ["class"]);
															}), 128)),
															createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
																key: 1,
																"data-slot": "group",
																class: ui.value.group({ class: unref(props).ui?.group })
															}, {
																default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
																_: 1
															}, 8, ["class"])) : createCommentVNode("", true)
														], 64))], 2),
														renderSlot(_ctx.$slots, "content-bottom")
													]),
													_: 3
												}, 8, ["class"]), !!unref(props).arrow ? (openBlock(), createBlock(unref(ComboboxArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
													"data-slot": "arrow",
													class: ui.value.arrow({ class: unref(props).ui?.arrow })
												}), null, 16, ["class"])) : createCommentVNode("", true)];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [createVNode(unref(ComboboxContent_default), mergeProps({
											"data-slot": "content",
											class: ui.value.content({ class: unref(props).ui?.content })
										}, contentProps.value), {
											default: withCtx(() => [createVNode(unref(FocusScope_default), {
												trapped: "",
												"data-slot": "focusScope",
												class: ui.value.focusScope({ class: unref(props).ui?.focusScope })
											}, {
												default: withCtx(() => [
													renderSlot(_ctx.$slots, "content-top"),
													!!unref(props).searchInput ? (openBlock(), createBlock(unref(ComboboxInput_default), {
														key: 0,
														modelValue: searchTerm.value,
														"onUpdate:modelValue": ($event) => searchTerm.value = $event,
														"display-value": () => searchTerm.value,
														"as-child": ""
													}, {
														default: withCtx(() => [createVNode(_sfc_main$f, mergeProps({
															autofocus: "",
															autocomplete: "off",
															size: selectSize.value
														}, searchInputProps.value, {
															"model-modifiers": { trim: unref(props).modelModifiers?.trim },
															"data-slot": "input",
															class: ui.value.input({ class: unref(props).ui?.input }),
															onChange: withModifiers(() => {}, ["stop"])
														}), null, 16, [
															"size",
															"model-modifiers",
															"class",
															"onChange"
														])]),
														_: 1
													}, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"display-value"
													])) : createCommentVNode("", true),
													createVNode(unref(ComboboxEmpty_default), {
														"data-slot": "empty",
														class: ui.value.empty({ class: unref(props).ui?.empty })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)])]),
														_: 3
													}, 8, ["class"]),
													createVNode("div", {
														ref_key: "viewportRef",
														ref: viewportRef,
														role: "presentation",
														"data-slot": "viewport",
														class: ui.value.viewport({ class: unref(props).ui?.viewport })
													}, [!!unref(props).virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
														createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
														createVNode(unref(ComboboxVirtualizer_default), mergeProps({
															options: filteredItems.value,
															"text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, unref(props).labelKey) : String(item2)
														}, virtualizerProps.value), {
															default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
																item,
																index: virtualItem.index
															}, null, 8, ["item", "index"])]),
															_: 1
														}, 16, ["options", "text-content"]),
														createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
													], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
														createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
															key: 0,
															"data-slot": "group",
															class: ui.value.group({ class: unref(props).ui?.group })
														}, {
															default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
															_: 1
														}, 8, ["class"])) : createCommentVNode("", true),
														(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
															return openBlock(), createBlock(unref(ComboboxGroup_default), {
																key: `group-${groupIndex}`,
																"data-slot": "group",
																class: ui.value.group({ class: unref(props).ui?.group })
															}, {
																default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																	return openBlock(), createBlock(unref(ReuseItemTemplate), {
																		key: `group-${groupIndex}-${index}`,
																		item,
																		index
																	}, null, 8, ["item", "index"]);
																}), 128))]),
																_: 2
															}, 1032, ["class"]);
														}), 128)),
														createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
															key: 1,
															"data-slot": "group",
															class: ui.value.group({ class: unref(props).ui?.group })
														}, {
															default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
															_: 1
														}, 8, ["class"])) : createCommentVNode("", true)
													], 64))], 2),
													renderSlot(_ctx.$slots, "content-bottom")
												]),
												_: 3
											}, 8, ["class"]), !!unref(props).arrow ? (openBlock(), createBlock(unref(ComboboxArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: unref(props).ui?.arrow })
											}), null, 16, ["class"])) : createCommentVNode("", true)]),
											_: 3
										}, 16, ["class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(FieldGroupReset), null, {
									default: withCtx(() => [createVNode(unref(ComboboxContent_default), mergeProps({
										"data-slot": "content",
										class: ui.value.content({ class: unref(props).ui?.content })
									}, contentProps.value), {
										default: withCtx(() => [createVNode(unref(FocusScope_default), {
											trapped: "",
											"data-slot": "focusScope",
											class: ui.value.focusScope({ class: unref(props).ui?.focusScope })
										}, {
											default: withCtx(() => [
												renderSlot(_ctx.$slots, "content-top"),
												!!unref(props).searchInput ? (openBlock(), createBlock(unref(ComboboxInput_default), {
													key: 0,
													modelValue: searchTerm.value,
													"onUpdate:modelValue": ($event) => searchTerm.value = $event,
													"display-value": () => searchTerm.value,
													"as-child": ""
												}, {
													default: withCtx(() => [createVNode(_sfc_main$f, mergeProps({
														autofocus: "",
														autocomplete: "off",
														size: selectSize.value
													}, searchInputProps.value, {
														"model-modifiers": { trim: unref(props).modelModifiers?.trim },
														"data-slot": "input",
														class: ui.value.input({ class: unref(props).ui?.input }),
														onChange: withModifiers(() => {}, ["stop"])
													}), null, 16, [
														"size",
														"model-modifiers",
														"class",
														"onChange"
													])]),
													_: 1
												}, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"display-value"
												])) : createCommentVNode("", true),
												createVNode(unref(ComboboxEmpty_default), {
													"data-slot": "empty",
													class: ui.value.empty({ class: unref(props).ui?.empty })
												}, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)])]),
													_: 3
												}, 8, ["class"]),
												createVNode("div", {
													ref_key: "viewportRef",
													ref: viewportRef,
													role: "presentation",
													"data-slot": "viewport",
													class: ui.value.viewport({ class: unref(props).ui?.viewport })
												}, [!!unref(props).virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
													createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
													createVNode(unref(ComboboxVirtualizer_default), mergeProps({
														options: filteredItems.value,
														"text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, unref(props).labelKey) : String(item2)
													}, virtualizerProps.value), {
														default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
															item,
															index: virtualItem.index
														}, null, 8, ["item", "index"])]),
														_: 1
													}, 16, ["options", "text-content"]),
													createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
												], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
													createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
														key: 0,
														"data-slot": "group",
														class: ui.value.group({ class: unref(props).ui?.group })
													}, {
														default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
														_: 1
													}, 8, ["class"])) : createCommentVNode("", true),
													(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
														return openBlock(), createBlock(unref(ComboboxGroup_default), {
															key: `group-${groupIndex}`,
															"data-slot": "group",
															class: ui.value.group({ class: unref(props).ui?.group })
														}, {
															default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
																return openBlock(), createBlock(unref(ReuseItemTemplate), {
																	key: `group-${groupIndex}-${index}`,
																	item,
																	index
																}, null, 8, ["item", "index"]);
															}), 128))]),
															_: 2
														}, 1032, ["class"]);
													}), 128)),
													createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
														key: 1,
														"data-slot": "group",
														class: ui.value.group({ class: unref(props).ui?.group })
													}, {
														default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
														_: 1
													}, 8, ["class"])) : createCommentVNode("", true)
												], 64))], 2),
												renderSlot(_ctx.$slots, "content-bottom")
											]),
											_: 3
										}, 8, ["class"]), !!unref(props).arrow ? (openBlock(), createBlock(unref(ComboboxArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
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
					} else return [createVNode(unref(ComboboxAnchor_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(unref(ComboboxTrigger_default), mergeProps({
							id: unref(id),
							ref_key: "triggerRef",
							ref: triggerRef,
							"data-slot": "base",
							class: ui.value.base({ class: [unref(props).ui?.base, unref(props).class] }),
							tabindex: "0"
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}), {
							default: withCtx(() => [
								unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
									key: 0,
									"data-slot": "leading",
									class: ui.value.leading({ class: unref(props).ui?.leading })
								}, [renderSlot(_ctx.$slots, "leading", {
									modelValue,
									open,
									ui: ui.value
								}, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
									key: 0,
									name: unref(leadingIconName),
									"data-slot": "leadingIcon",
									class: ui.value.leadingIcon({ class: unref(props).ui?.leadingIcon })
								}, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
									key: 1,
									size: unref(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
								}, unref(props).avatar, {
									"data-slot": "itemLeadingAvatar",
									class: ui.value.itemLeadingAvatar({ class: unref(props).ui?.itemLeadingAvatar })
								}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
								renderSlot(_ctx.$slots, "default", {
									modelValue,
									open,
									ui: ui.value
								}, () => [(openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
									return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
										key: 0,
										"data-slot": "value",
										class: ui.value.value({ class: unref(props).ui?.value })
									}, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
										key: 1,
										"data-slot": "placeholder",
										class: ui.value.placeholder({ class: unref(props).ui?.placeholder })
									}, toDisplayString(unref(props).placeholder ?? "\xA0"), 3))], 64);
								}), 128))]),
								unref(isTrailing) || !!slots.trailing || !!unref(props).clear ? (openBlock(), createBlock("span", {
									key: 1,
									"data-slot": "trailing",
									class: ui.value.trailing({ class: unref(props).ui?.trailing })
								}, [renderSlot(_ctx.$slots, "trailing", {
									modelValue,
									open,
									ui: ui.value
								}, () => [!!unref(props).clear && !isModelValueEmpty(modelValue) ? (openBlock(), createBlock(unref(ComboboxCancel_default), {
									key: 0,
									"as-child": ""
								}, {
									default: withCtx(() => [createVNode(_sfc_main$b, mergeProps({
										as: "span",
										icon: unref(props).clearIcon || unref(appConfig).ui.icons.close,
										size: selectSize.value,
										variant: "link",
										color: "neutral",
										tabindex: "-1"
									}, clearProps.value, {
										"data-slot": "trailingClear",
										class: ui.value.trailingClear({ class: unref(props).ui?.trailingClear }),
										onClick: withModifiers(onClear, ["stop"])
									}), null, 16, [
										"icon",
										"size",
										"class"
									])]),
									_: 1
								})) : unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$2$1, {
									key: 1,
									name: unref(trailingIconName),
									"data-slot": "trailingIcon",
									class: ui.value.trailingIcon({ class: unref(props).ui?.trailingIcon })
								}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
							]),
							_: 2
						}, 1040, ["id", "class"])]),
						_: 2
					}, 1024), createVNode(unref(ComboboxPortal_default), unref(portalProps), {
						default: withCtx(() => [createVNode(unref(FieldGroupReset), null, {
							default: withCtx(() => [createVNode(unref(ComboboxContent_default), mergeProps({
								"data-slot": "content",
								class: ui.value.content({ class: unref(props).ui?.content })
							}, contentProps.value), {
								default: withCtx(() => [createVNode(unref(FocusScope_default), {
									trapped: "",
									"data-slot": "focusScope",
									class: ui.value.focusScope({ class: unref(props).ui?.focusScope })
								}, {
									default: withCtx(() => [
										renderSlot(_ctx.$slots, "content-top"),
										!!unref(props).searchInput ? (openBlock(), createBlock(unref(ComboboxInput_default), {
											key: 0,
											modelValue: searchTerm.value,
											"onUpdate:modelValue": ($event) => searchTerm.value = $event,
											"display-value": () => searchTerm.value,
											"as-child": ""
										}, {
											default: withCtx(() => [createVNode(_sfc_main$f, mergeProps({
												autofocus: "",
												autocomplete: "off",
												size: selectSize.value
											}, searchInputProps.value, {
												"model-modifiers": { trim: unref(props).modelModifiers?.trim },
												"data-slot": "input",
												class: ui.value.input({ class: unref(props).ui?.input }),
												onChange: withModifiers(() => {}, ["stop"])
											}), null, 16, [
												"size",
												"model-modifiers",
												"class",
												"onChange"
											])]),
											_: 1
										}, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"display-value"
										])) : createCommentVNode("", true),
										createVNode(unref(ComboboxEmpty_default), {
											"data-slot": "empty",
											class: ui.value.empty({ class: unref(props).ui?.empty })
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)])]),
											_: 3
										}, 8, ["class"]),
										createVNode("div", {
											ref_key: "viewportRef",
											ref: viewportRef,
											role: "presentation",
											"data-slot": "viewport",
											class: ui.value.viewport({ class: unref(props).ui?.viewport })
										}, [!!unref(props).virtualize ? (openBlock(), createBlock(Fragment, { key: 0 }, [
											createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
											createVNode(unref(ComboboxVirtualizer_default), mergeProps({
												options: filteredItems.value,
												"text-content": (item2) => isSelectItem(item2) ? unref(get)(item2, unref(props).labelKey) : String(item2)
											}, virtualizerProps.value), {
												default: withCtx(({ option: item, virtualItem }) => [createVNode(unref(ReuseItemTemplate), {
													item,
													index: virtualItem.index
												}, null, 8, ["item", "index"])]),
												_: 1
											}, 16, ["options", "text-content"]),
											createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
										], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
											createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
												key: 0,
												"data-slot": "group",
												class: ui.value.group({ class: unref(props).ui?.group })
											}, {
												default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
												_: 1
											}, 8, ["class"])) : createCommentVNode("", true),
											(openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
												return openBlock(), createBlock(unref(ComboboxGroup_default), {
													key: `group-${groupIndex}`,
													"data-slot": "group",
													class: ui.value.group({ class: unref(props).ui?.group })
												}, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
														return openBlock(), createBlock(unref(ReuseItemTemplate), {
															key: `group-${groupIndex}-${index}`,
															item,
															index
														}, null, 8, ["item", "index"]);
													}), 128))]),
													_: 2
												}, 1032, ["class"]);
											}), 128)),
											createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ComboboxGroup_default), {
												key: 1,
												"data-slot": "group",
												class: ui.value.group({ class: unref(props).ui?.group })
											}, {
												default: withCtx(() => [createVNode(unref(ReuseCreateItemTemplate))]),
												_: 1
											}, 8, ["class"])) : createCommentVNode("", true)
										], 64))], 2),
										renderSlot(_ctx.$slots, "content-bottom")
									]),
									_: 3
								}, 8, ["class"]), !!unref(props).arrow ? (openBlock(), createBlock(unref(ComboboxArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
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
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$3 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region app/components/credit-increase/RequestModal.vue?vue&type=script&setup=true&lang.ts
var RequestModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RequestModal",
	__ssrInlineRender: true,
	emits: ["requested"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const schema = z.object({
			distributor_id: z.number({ error: "Selecciona una distribuidora" }),
			requested_amount: z.union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/)]),
			reason: z.string().min(1, "Requerido").max(255)
		});
		const open = ref(false);
		const state = reactive({
			distributor_id: void 0,
			requested_amount: void 0,
			reason: void 0
		});
		const { listDistributors } = useDistributors();
		const { requestCreditIncrease } = useCreditIncrease();
		const toast = useToast();
		const distributors = ref([]);
		const loadingDistributors = ref(false);
		const submitting = ref(false);
		function distributorLabel(distributor) {
			const name = [distributor.person?.first_name, distributor.person?.last_name].filter(Boolean).join(" ");
			return [`#${distributor.distributor_number}`, name].filter(Boolean).join(" · ");
		}
		const distributorItems = computed(() => distributors.value.map((distributor) => ({
			label: distributorLabel(distributor),
			value: distributor.id
		})));
		async function loadDistributors() {
			loadingDistributors.value = true;
			try {
				const result = await listDistributors({ per_page: 100 });
				distributors.value = result.data;
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudieron cargar las distribuidoras.",
					color: "error"
				});
			} finally {
				loadingDistributors.value = false;
			}
		}
		watch(open, (isOpen) => {
			if (isOpen) {
				state.distributor_id = void 0;
				state.requested_amount = void 0;
				state.reason = void 0;
				loadDistributors();
			}
		});
		async function onSubmit(event) {
			submitting.value = true;
			try {
				await requestCreditIncrease({
					distributor_id: event.data.distributor_id,
					requested_amount: String(event.data.requested_amount),
					reason: event.data.reason
				});
				toast.add({
					title: "Solicitud enviada",
					description: "La solicitud de aumento de línea fue registrada.",
					color: "success"
				});
				open.value = false;
				emit("requested");
			} catch (e) {
				const message = e?.data?.message;
				toast.add({
					title: "Error",
					description: message || "No se pudo enviar la solicitud. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$c;
			const _component_UButton = _sfc_main$b;
			const _component_UForm = _sfc_main$d;
			const _component_UFormField = _sfc_main$e;
			const _component_USelectMenu = _sfc_main;
			const _component_UInput = _sfc_main$f;
			const _component_UTextarea = _sfc_main$g;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Nueva solicitud de incremento",
				description: "Solicita un aumento de línea de crédito para una distribuidora",
				ui: { content: "max-w-xl" }
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Distribuidora",
									name: "distributor_id",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_USelectMenu, {
											modelValue: unref(state).distributor_id,
											"onUpdate:modelValue": ($event) => unref(state).distributor_id = $event,
											"value-key": "value",
											items: unref(distributorItems),
											loading: unref(loadingDistributors),
											placeholder: "Buscar distribuidora",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_USelectMenu, {
											modelValue: unref(state).distributor_id,
											"onUpdate:modelValue": ($event) => unref(state).distributor_id = $event,
											"value-key": "value",
											items: unref(distributorItems),
											loading: unref(loadingDistributors),
											placeholder: "Buscar distribuidora",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items",
											"loading"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Monto solicitado (MXN)",
									name: "requested_amount",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).requested_amount,
											"onUpdate:modelValue": ($event) => unref(state).requested_amount = $event,
											type: "number",
											step: "0.01",
											min: "0.01",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).requested_amount,
											"onUpdate:modelValue": ($event) => unref(state).requested_amount = $event,
											type: "number",
											step: "0.01",
											min: "0.01",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Motivo",
									name: "reason",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UTextarea, {
											modelValue: unref(state).reason,
											"onUpdate:modelValue": ($event) => unref(state).reason = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UTextarea, {
											modelValue: unref(state).reason,
											"onUpdate:modelValue": ($event) => unref(state).reason = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Enviar solicitud",
									type: "submit",
									color: "primary",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UFormField, {
									label: "Distribuidora",
									name: "distributor_id",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_USelectMenu, {
										modelValue: unref(state).distributor_id,
										"onUpdate:modelValue": ($event) => unref(state).distributor_id = $event,
										"value-key": "value",
										items: unref(distributorItems),
										loading: unref(loadingDistributors),
										placeholder: "Buscar distribuidora",
										class: "w-full"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items",
										"loading"
									])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Monto solicitado (MXN)",
									name: "requested_amount",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).requested_amount,
										"onUpdate:modelValue": ($event) => unref(state).requested_amount = $event,
										type: "number",
										step: "0.01",
										min: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Motivo",
									name: "reason",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UTextarea, {
										modelValue: unref(state).reason,
										"onUpdate:modelValue": ($event) => unref(state).reason = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "ghost",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Enviar solicitud",
									type: "submit",
									color: "primary",
									loading: unref(submitting)
								}, null, 8, ["loading"])])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UFormField, {
								label: "Distribuidora",
								name: "distributor_id",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_USelectMenu, {
									modelValue: unref(state).distributor_id,
									"onUpdate:modelValue": ($event) => unref(state).distributor_id = $event,
									"value-key": "value",
									items: unref(distributorItems),
									loading: unref(loadingDistributors),
									placeholder: "Buscar distribuidora",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items",
									"loading"
								])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Monto solicitado (MXN)",
								name: "requested_amount",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).requested_amount,
									"onUpdate:modelValue": ($event) => unref(state).requested_amount = $event,
									type: "number",
									step: "0.01",
									min: "0.01",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Motivo",
								name: "reason",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(state).reason,
									"onUpdate:modelValue": ($event) => unref(state).reason = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "ghost",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Enviar solicitud",
								type: "submit",
								color: "primary",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Nueva solicitud",
						icon: "i-lucide-plus",
						color: "primary"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Nueva solicitud",
						icon: "i-lucide-plus",
						color: "primary"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/credit-increase/RequestModal.vue
var _sfc_setup$2 = RequestModal_vue_vue_type_script_setup_true_lang_default.setup;
RequestModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/credit-increase/RequestModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var RequestModal_default = Object.assign(RequestModal_vue_vue_type_script_setup_true_lang_default, { __name: "CreditIncreaseRequestModal" });
//#endregion
//#region app/components/applications/AssignVerifierModal.vue?vue&type=script&setup=true&lang.ts
var AssignVerifierModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AssignVerifierModal",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ application: {} }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["assigned"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useModel(__props, "open");
		const emit = __emit;
		const schema = z.object({ verifier_user_id: z.number({ error: "Selecciona un verificador" }).int().positive("Selecciona un verificador") });
		const state = reactive({ verifier_user_id: void 0 });
		const { assignVerifier } = useApplications();
		const { listVerifiers } = useBranches();
		const toast = useToast();
		const submitting = ref(false);
		const loadingVerifiers = ref(false);
		const verifiers = ref([]);
		const verifierItems = computed(() => verifiers.value.map((v) => ({
			label: `${v.name} (${v.username})`,
			value: v.id
		})));
		watch(() => props.application, async (application) => {
			state.verifier_user_id = void 0;
			verifiers.value = [];
			if (!application?.branch_id) return;
			loadingVerifiers.value = true;
			try {
				verifiers.value = await listVerifiers(application.branch_id);
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo cargar el listado de verificadores de la sucursal.",
					color: "error"
				});
			} finally {
				loadingVerifiers.value = false;
			}
		}, { immediate: true });
		async function onSubmit(event) {
			if (!props.application) return;
			submitting.value = true;
			try {
				await assignVerifier(props.application.id, event.data.verifier_user_id);
				toast.add({
					title: "Verificador asignado",
					description: `Se asignó el verificador a la solicitud #${props.application.id}`,
					color: "success"
				});
				open.value = false;
				emit("assigned");
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo asignar el verificador. Intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$c;
			const _component_UForm = _sfc_main$d;
			const _component_UAlert = _sfc_main$2;
			const _component_UFormField = _sfc_main$e;
			const _component_USelect = _sfc_main$4;
			const _component_UButton = _sfc_main$b;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: "Asignar Verificador",
				description: __props.application ? `Solicitud #${__props.application.id} — ${unref(applicantFullName)(__props.application.applicant)} — ${__props.application.branch?.name ?? ""}` : ""
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (!unref(loadingVerifiers) && !unref(verifierItems).length) _push(ssrRenderComponent(_component_UAlert, {
									color: "warning",
									variant: "subtle",
									icon: "i-lucide-triangle-alert",
									description: "No hay verificadores dados de alta en esta sucursal. Solo se puede asignar un verificador que pertenezca a la misma sucursal de la solicitud."
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Verificador",
									name: "verifier_user_id",
									required: ""
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_USelect, {
											modelValue: unref(state).verifier_user_id,
											"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
											items: unref(verifierItems),
											loading: unref(loadingVerifiers),
											disabled: unref(loadingVerifiers) || !unref(verifierItems).length,
											placeholder: "Selecciona un verificador de la sucursal...",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_USelect, {
											modelValue: unref(state).verifier_user_id,
											"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
											items: unref(verifierItems),
											loading: unref(loadingVerifiers),
											disabled: unref(loadingVerifiers) || !unref(verifierItems).length,
											placeholder: "Selecciona un verificador de la sucursal...",
											class: "w-full"
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"items",
											"loading",
											"disabled"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Asignar",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting),
									disabled: !unref(verifierItems).length
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								!unref(loadingVerifiers) && !unref(verifierItems).length ? (openBlock(), createBlock(_component_UAlert, {
									key: 0,
									color: "warning",
									variant: "subtle",
									icon: "i-lucide-triangle-alert",
									description: "No hay verificadores dados de alta en esta sucursal. Solo se puede asignar un verificador que pertenezca a la misma sucursal de la solicitud."
								})) : createCommentVNode("", true),
								createVNode(_component_UFormField, {
									label: "Verificador",
									name: "verifier_user_id",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(state).verifier_user_id,
										"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
										items: unref(verifierItems),
										loading: unref(loadingVerifiers),
										disabled: unref(loadingVerifiers) || !unref(verifierItems).length,
										placeholder: "Selecciona un verificador de la sucursal...",
										class: "w-full"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items",
										"loading",
										"disabled"
									])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Asignar",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting),
									disabled: !unref(verifierItems).length
								}, null, 8, ["loading", "disabled"])])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							!unref(loadingVerifiers) && !unref(verifierItems).length ? (openBlock(), createBlock(_component_UAlert, {
								key: 0,
								color: "warning",
								variant: "subtle",
								icon: "i-lucide-triangle-alert",
								description: "No hay verificadores dados de alta en esta sucursal. Solo se puede asignar un verificador que pertenezca a la misma sucursal de la solicitud."
							})) : createCommentVNode("", true),
							createVNode(_component_UFormField, {
								label: "Verificador",
								name: "verifier_user_id",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(state).verifier_user_id,
									"onUpdate:modelValue": ($event) => unref(state).verifier_user_id = $event,
									items: unref(verifierItems),
									loading: unref(loadingVerifiers),
									disabled: unref(loadingVerifiers) || !unref(verifierItems).length,
									placeholder: "Selecciona un verificador de la sucursal...",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items",
									"loading",
									"disabled"
								])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Asignar",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting),
								disabled: !unref(verifierItems).length
							}, null, 8, ["loading", "disabled"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/applications/AssignVerifierModal.vue
var _sfc_setup$1 = AssignVerifierModal_vue_vue_type_script_setup_true_lang_default.setup;
AssignVerifierModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/applications/AssignVerifierModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AssignVerifierModal_default = Object.assign(AssignVerifierModal_vue_vue_type_script_setup_true_lang_default, { __name: "ApplicationsAssignVerifierModal" });
//#endregion
//#region app/pages/registro-verificacion/coordinador/list.vue?vue&type=script&setup=true&lang.ts
var list_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "list",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { roleCode, user } = useAuth();
		const isCoordinator = computed(() => roleCode.value === "coordinator");
		const canApproveVouchers = computed(() => user.value?.permissions?.includes("vouchers.approve") ?? false);
		const canPreAuthorizeCredit = computed(() => user.value?.permissions?.includes("credit-increase.pre-authorize") ?? false);
		const canDecideTransfers = computed(() => user.value?.permissions?.includes("customers.transfer.decide") ?? false);
		const { listApplications } = useApplications();
		const { listPendingVoucherRequests } = useVouchers();
		const { listCreditIncreaseRequests } = useCreditIncrease();
		const toast = useToast();
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function fmtDate(value) {
			if (!value) return "—";
			return new Date(value).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
		}
		const statusFilter = ref("all");
		const { data: applications, status, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("registro-verificacion-list-applications", async () => {
			if (!isCoordinator.value) return [];
			return (await listApplications({
				per_page: 100,
				status: statusFilter.value === "all" ? void 0 : statusFilter.value
			})).data;
		}, { watch: [statusFilter] })), __temp = await __temp, __restore(), __temp);
		const isAssignOpen = ref(false);
		const selectedApplication = ref(null);
		function openAssignModal(application) {
			selectedApplication.value = application;
			isAssignOpen.value = true;
		}
		function getRowItems(row) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (!row.original.assigned_verifier_id && row.original.status === "EN_REVISION") items.push({
				label: "Asignar verificador",
				icon: "i-lucide-user-plus",
				onSelect: () => openAssignModal(row.original)
			});
			items.push({ type: "separator" }, {
				label: "Copiar ID de solicitud",
				icon: "i-lucide-copy",
				onSelect() {
					(void 0).clipboard.writeText(row.original.id.toString());
					toast.add({
						title: "Copiado",
						description: "ID de solicitud copiado al portapapeles"
					});
				}
			});
			return items;
		}
		const columns = [
			{
				accessorKey: "id",
				header: "ID"
			},
			{
				accessorKey: "applicant",
				header: "Solicitante",
				cell: ({ row }) => h("div", { class: "font-medium text-highlighted" }, applicantFullName(row.original.applicant))
			},
			{
				accessorKey: "branch",
				header: "Sucursal",
				cell: ({ row }) => row.original.branch?.name ?? "—"
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => {
					const value = row.original.status;
					return h(_sfc_main$9, {
						variant: "subtle",
						color: value === "APROBADA" ? "success" : value === "RECHAZADA" ? "error" : value === "EN_REVISION" ? "warning" : "neutral"
					}, () => APPLICATION_STATUS_LABELS[value] ?? value);
				}
			},
			{
				accessorKey: "assigned_verifier",
				header: "Verificador",
				cell: ({ row }) => {
					const name = verifierDisplayName(row.original.assigned_verifier);
					return name ? name : h("span", { class: "text-dimmed" }, "Sin asignar");
				}
			},
			{
				accessorKey: "submitted_at",
				header: "Fecha de envío",
				cell: ({ row }) => row.original.submitted_at ? new Date(row.original.submitted_at).toLocaleDateString("es-MX") : "—"
			},
			{
				id: "actions",
				cell: ({ row }) => h("div", { class: "text-right" }, h(_sfc_main$a, {
					content: { align: "end" },
					items: getRowItems(row)
				}, () => h(_sfc_main$b, {
					icon: "i-lucide-ellipsis-vertical",
					color: "neutral",
					variant: "ghost",
					class: "ml-auto"
				})))
			}
		];
		const statusItems = [
			{
				label: "Todos",
				value: "all"
			},
			{
				label: "En revisión",
				value: "EN_REVISION"
			},
			{
				label: "Posible distribuidora",
				value: "POSIBLE_DISTRIBUIDORA"
			},
			{
				label: "Aprobada",
				value: "APROBADA"
			},
			{
				label: "Rechazada",
				value: "RECHAZADA"
			}
		];
		const tabItems = computed(() => {
			const items = [{
				label: "Solicitudes de Distribuidora",
				value: "applications",
				icon: "i-lucide-file-text"
			}, {
				label: "Incrementos de Crédito",
				value: "credit-increase",
				icon: "i-lucide-trending-up"
			}];
			if (canApproveVouchers.value) items.push({
				label: "Vales Digitales",
				value: "vouchers",
				icon: "i-lucide-ticket"
			});
			if (canDecideTransfers.value) items.push({
				label: "Transferencias de Cliente",
				value: "transfers",
				icon: "i-lucide-repeat"
			});
			return items;
		});
		const selectedTab = ref("applications");
		const voucherRequestsPage = ref(1);
		const { data: voucherRequestsData, status: voucherRequestsStatus, refresh: refreshVoucherRequests } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("registro-verificacion-coordinador-voucher-requests", async () => {
			if (!isCoordinator.value || !canApproveVouchers.value) return {
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			};
			return listPendingVoucherRequests({ page: voucherRequestsPage.value });
		}, {
			watch: [voucherRequestsPage],
			default: () => ({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const voucherRequests = computed(() => voucherRequestsData.value.data ?? []);
		const voucherRequestsMeta = computed(() => voucherRequestsData.value.meta);
		async function onVoucherRequestDecided() {
			await refreshVoucherRequests();
		}
		const voucherRequestColumns = [
			{
				accessorKey: "distributor",
				header: "Distribuidora",
				cell: ({ row }) => h("div", { class: "min-w-0" }, [h("p", { class: "truncate font-medium text-highlighted" }, row.original.distributor_name || `#${row.original.distributor_id}`), h("p", { class: "truncate text-xs text-muted" }, row.original.distributor_number || "")])
			},
			{
				accessorKey: "customer",
				header: "Cliente",
				cell: ({ row }) => h("div", { class: "min-w-0" }, [h("p", { class: "truncate font-medium text-highlighted" }, row.original.customer_name || "Cliente"), h("p", { class: "truncate text-xs text-muted" }, row.original.customer_code || "")])
			},
			{
				accessorKey: "financial_product_name",
				header: "Producto",
				cell: ({ row }) => row.original.financial_product_name ?? "—"
			},
			{
				accessorKey: "requested_amount",
				header: "Monto solicitado",
				cell: ({ row }) => h("div", { class: "flex items-center gap-2" }, [h("span", { class: "font-semibold text-highlighted" }, money.format(Number(row.original.requested_amount))), row.original.is_pre_vale ? h(_sfc_main$9, {
					color: "warning",
					variant: "subtle",
					label: "Pre-vale",
					size: "sm"
				}) : null])
			},
			{
				accessorKey: "created_at",
				header: "Fecha",
				cell: ({ row }) => fmtDate(row.original.created_at)
			},
			{
				id: "actions",
				cell: ({ row }) => h("div", { class: "text-right" }, [h(DecideVoucherRequestModal_default, {
					item: row.original,
					onDecided: onVoucherRequestDecided
				})])
			}
		];
		const creditIncreaseStatusFilter = ref("all");
		const creditIncreasePage = ref(1);
		const { data: creditIncreaseData, status: creditIncreaseStatus, refresh: refreshCreditIncrease } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("registro-verificacion-coordinador-credit-increase", async () => {
			if (!isCoordinator.value) return {
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			};
			return listCreditIncreaseRequests({
				page: creditIncreasePage.value,
				status: creditIncreaseStatusFilter.value === "all" ? void 0 : creditIncreaseStatusFilter.value
			});
		}, {
			watch: [creditIncreaseStatusFilter, creditIncreasePage],
			default: () => ({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const creditIncreaseRequests = computed(() => creditIncreaseData.value.data ?? []);
		const creditIncreaseMeta = computed(() => creditIncreaseData.value.meta);
		async function onCreditIncreasePreAuthorized() {
			await refreshCreditIncrease();
		}
		const creditIncreaseStatusColors = {
			PENDIENTE: "warning",
			PRE_AUTORIZADO: "info",
			APROBADO: "success",
			REDUCIDO: "success",
			RECHAZADO: "error",
			CANCELADO: "neutral"
		};
		const creditIncreaseStatusItems = [
			{
				label: "Todos",
				value: "all"
			},
			{
				label: "Pendiente",
				value: "PENDIENTE"
			},
			{
				label: "Pre-autorizado",
				value: "PRE_AUTORIZADO"
			},
			{
				label: "Aprobado",
				value: "APROBADO"
			},
			{
				label: "Reducido",
				value: "REDUCIDO"
			},
			{
				label: "Rechazado",
				value: "RECHAZADO"
			},
			{
				label: "Cancelado",
				value: "CANCELADO"
			}
		];
		const creditIncreaseColumns = [
			{
				accessorKey: "distributor",
				header: "Distribuidora",
				cell: ({ row }) => row.original.distributor ? `#${row.original.distributor.distributor_number}` : `#${row.original.distributor_id}`
			},
			{
				accessorKey: "requested_amount",
				header: "Monto solicitado",
				cell: ({ row }) => money.format(Number(row.original.requested_amount))
			},
			{
				accessorKey: "pre_authorized_amount",
				header: "Monto pre-autorizado",
				cell: ({ row }) => row.original.pre_authorized_amount ? money.format(Number(row.original.pre_authorized_amount)) : "—"
			},
			{
				accessorKey: "reason",
				header: "Motivo",
				cell: ({ row }) => row.original.reason ?? "—"
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => h(_sfc_main$9, {
					variant: "subtle",
					color: creditIncreaseStatusColors[row.original.status] ?? "neutral"
				}, () => row.original.status)
			},
			{
				accessorKey: "created_at",
				header: "Fecha",
				cell: ({ row }) => fmtDate(row.original.created_at)
			},
			{
				id: "actions",
				cell: ({ row }) => h("div", { class: "text-right" }, [row.original.status === "PENDIENTE" && canPreAuthorizeCredit.value ? h(PreAuthorizeModal_default, {
					item: row.original,
					onPreAuthorized: onCreditIncreasePreAuthorized
				}) : null])
			}
		];
		const { listCoordinatorTransfers } = useCustomerTransfers();
		const { data: transferRequestsData, status: transferRequestsStatus, refresh: refreshTransferRequests } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("registro-verificacion-coordinador-transfers", async () => {
			if (!isCoordinator.value || !canDecideTransfers.value) return {
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			};
			return listCoordinatorTransfers({ status: "PENDIENTE_COORDINADOR" });
		}, { default: () => ({
			data: [],
			meta: {
				current_page: 1,
				last_page: 1,
				per_page: 15,
				total: 0
			}
		}) })), __temp = await __temp, __restore(), __temp);
		const transferRequests = computed(() => transferRequestsData.value.data ?? []);
		async function onTransferDecided() {
			await refreshTransferRequests();
		}
		const transferColumns = [
			{
				accessorKey: "customer",
				header: "Cliente",
				cell: ({ row }) => customerFullName(row.original.customer?.person)
			},
			{
				accessorKey: "source_distributor",
				header: "Distribuidora origen",
				cell: ({ row }) => row.original.source_distributor?.distributor_number ?? `#${row.original.source_distributor_id}`
			},
			{
				accessorKey: "destination_distributor",
				header: "Distribuidora destino",
				cell: ({ row }) => row.original.destination_distributor?.distributor_number ?? `#${row.original.destination_distributor_id}`
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => h(_sfc_main$9, {
					variant: "subtle",
					color: "warning"
				}, () => CUSTOMER_TRANSFER_STATUS_LABELS[row.original.status])
			},
			{
				accessorKey: "created_at",
				header: "Fecha",
				cell: ({ row }) => fmtDate(row.original.created_at)
			},
			{
				id: "actions",
				cell: ({ row }) => h("div", { class: "text-right" }, [h(DecideModal_default, {
					item: row.original,
					onDecided: onTransferDecided
				})])
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$7;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_UAlert = _sfc_main$2;
			const _component_UTabs = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			const _component_UTable = _sfc_main$5;
			const _component_CreditIncreaseRequestModal = RequestModal_default;
			const _component_UPagination = _sfc_main$6;
			const _component_ApplicationsAssignVerifierModal = AssignVerifierModal_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "register-distributors-list" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Bandeja de Coordinación" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Bandeja de Coordinación" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (!unref(isCoordinator)) {
						_push(`<div class="p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAlert, {
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-lock",
							title: "Acceso restringido",
							description: "Solo el rol Coordinador puede acceder a la bandeja de coordinación."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<div class="p-6 space-y-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UTabs, {
							modelValue: unref(selectedTab),
							"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
							items: unref(tabItems)
						}, null, _parent, _scopeId));
						if (unref(selectedTab) === "applications") {
							_push(`<div class="space-y-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Solicitudes Activas </h3>`);
							_push(ssrRenderComponent(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: statusItems,
								placeholder: "Filtrar estado",
								class: "min-w-48"
							}, null, _parent, _scopeId));
							_push(`</div>`);
							_push(ssrRenderComponent(_component_UTable, {
								data: unref(applications) ?? [],
								columns,
								loading: unref(status) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No hay solicitudes que coincidan con el filtro seleccionado. </div>`);
									else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes que coincidan con el filtro seleccionado. ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else if (unref(selectedTab) === "credit-increase") {
							_push(`<div class="space-y-4"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Solicitudes de Incremento de Crédito </h3><div class="flex items-center gap-2"${_scopeId}>`);
							_push(ssrRenderComponent(_component_USelect, {
								modelValue: unref(creditIncreaseStatusFilter),
								"onUpdate:modelValue": ($event) => isRef(creditIncreaseStatusFilter) ? creditIncreaseStatusFilter.value = $event : null,
								items: creditIncreaseStatusItems,
								placeholder: "Filtrar estado",
								class: "min-w-48"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_CreditIncreaseRequestModal, { onRequested: unref(refreshCreditIncrease) }, null, _parent, _scopeId));
							_push(`</div></div>`);
							_push(ssrRenderComponent(_component_UTable, {
								data: unref(creditIncreaseRequests),
								columns: creditIncreaseColumns,
								loading: unref(creditIncreaseStatus) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No hay solicitudes de incremento de crédito que coincidan con el filtro seleccionado. </div>`);
									else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes de incremento de crédito que coincidan con el filtro seleccionado. ")];
								}),
								_: 1
							}, _parent, _scopeId));
							if (unref(creditIncreaseMeta).last_page > 1) {
								_push(`<div class="flex items-center justify-end gap-3 pt-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									page: unref(creditIncreasePage),
									"onUpdate:page": ($event) => isRef(creditIncreasePage) ? creditIncreasePage.value = $event : null,
									total: unref(creditIncreaseMeta).total,
									"items-per-page": unref(creditIncreaseMeta).per_page
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else if (unref(selectedTab) === "vouchers") {
							_push(`<div class="space-y-4"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Solicitudes de Vale Pendientes </h3>`);
							if (!unref(canApproveVouchers)) _push(ssrRenderComponent(_component_UAlert, {
								color: "warning",
								variant: "subtle",
								icon: "i-lucide-lock",
								title: "Sin permiso",
								description: "Tu usuario no tiene la habilidad vouchers.approve necesaria para ver estas solicitudes."
							}, null, _parent, _scopeId));
							else _push(ssrRenderComponent(_component_UTable, {
								data: unref(voucherRequests),
								columns: voucherRequestColumns,
								loading: unref(voucherRequestsStatus) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No hay solicitudes de vale pendientes. </div>`);
									else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes de vale pendientes. ")];
								}),
								_: 1
							}, _parent, _scopeId));
							if (unref(canApproveVouchers) && unref(voucherRequestsMeta).last_page > 1) {
								_push(`<div class="flex items-center justify-end gap-3 pt-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									page: unref(voucherRequestsPage),
									"onUpdate:page": ($event) => isRef(voucherRequestsPage) ? voucherRequestsPage.value = $event : null,
									total: unref(voucherRequestsMeta).total,
									"items-per-page": unref(voucherRequestsMeta).per_page
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else if (unref(selectedTab) === "transfers") {
							_push(`<div class="space-y-4"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Transferencias de Cliente Pendientes de Autorización </h3>`);
							if (!unref(canDecideTransfers)) _push(ssrRenderComponent(_component_UAlert, {
								color: "warning",
								variant: "subtle",
								icon: "i-lucide-lock",
								title: "Sin permiso",
								description: "Tu usuario no tiene la habilidad customers.transfer.decide necesaria para ver estas solicitudes."
							}, null, _parent, _scopeId));
							else _push(ssrRenderComponent(_component_UTable, {
								data: unref(transferRequests),
								columns: transferColumns,
								loading: unref(transferRequestsStatus) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="text-sm text-center py-8 text-dimmed"${_scopeId}> No hay transferencias de cliente pendientes de autorización. </div>`);
									else return [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay transferencias de cliente pendientes de autorización. ")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(ssrRenderComponent(_component_ApplicationsAssignVerifierModal, {
							open: unref(isAssignOpen),
							"onUpdate:open": ($event) => isRef(isAssignOpen) ? isAssignOpen.value = $event : null,
							application: unref(selectedApplication),
							onAssigned: unref(refresh)
						}, null, _parent, _scopeId));
						_push(`</div>`);
					}
					else return [!unref(isCoordinator) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-lock",
						title: "Acceso restringido",
						description: "Solo el rol Coordinador puede acceder a la bandeja de coordinación."
					})])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "p-6 space-y-6"
					}, [
						createVNode(_component_UTabs, {
							modelValue: unref(selectedTab),
							"onUpdate:modelValue": ($event) => isRef(selectedTab) ? selectedTab.value = $event : null,
							items: unref(tabItems)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						]),
						unref(selectedTab) === "applications" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-4"
						}, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes Activas "), createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: statusItems,
							placeholder: "Filtrar estado",
							class: "min-w-48"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode(_component_UTable, {
							data: unref(applications) ?? [],
							columns,
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, {
							empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes que coincidan con el filtro seleccionado. ")]),
							_: 1
						}, 8, ["data", "loading"])])) : unref(selectedTab) === "credit-increase" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "space-y-4"
						}, [
							createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes de Incremento de Crédito "), createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_USelect, {
								modelValue: unref(creditIncreaseStatusFilter),
								"onUpdate:modelValue": ($event) => isRef(creditIncreaseStatusFilter) ? creditIncreaseStatusFilter.value = $event : null,
								items: creditIncreaseStatusItems,
								placeholder: "Filtrar estado",
								class: "min-w-48"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_CreditIncreaseRequestModal, { onRequested: unref(refreshCreditIncrease) }, null, 8, ["onRequested"])])]),
							createVNode(_component_UTable, {
								data: unref(creditIncreaseRequests),
								columns: creditIncreaseColumns,
								loading: unref(creditIncreaseStatus) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes de incremento de crédito que coincidan con el filtro seleccionado. ")]),
								_: 1
							}, 8, ["data", "loading"]),
							unref(creditIncreaseMeta).last_page > 1 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "flex items-center justify-end gap-3 pt-2"
							}, [createVNode(_component_UPagination, {
								page: unref(creditIncreasePage),
								"onUpdate:page": ($event) => isRef(creditIncreasePage) ? creditIncreasePage.value = $event : null,
								total: unref(creditIncreaseMeta).total,
								"items-per-page": unref(creditIncreaseMeta).per_page
							}, null, 8, [
								"page",
								"onUpdate:page",
								"total",
								"items-per-page"
							])])) : createCommentVNode("", true)
						])) : unref(selectedTab) === "vouchers" ? (openBlock(), createBlock("div", {
							key: 2,
							class: "space-y-4"
						}, [
							createVNode("h3", { class: "font-semibold text-base" }, " Solicitudes de Vale Pendientes "),
							!unref(canApproveVouchers) ? (openBlock(), createBlock(_component_UAlert, {
								key: 0,
								color: "warning",
								variant: "subtle",
								icon: "i-lucide-lock",
								title: "Sin permiso",
								description: "Tu usuario no tiene la habilidad vouchers.approve necesaria para ver estas solicitudes."
							})) : (openBlock(), createBlock(_component_UTable, {
								key: 1,
								data: unref(voucherRequests),
								columns: voucherRequestColumns,
								loading: unref(voucherRequestsStatus) === "pending",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, {
								empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay solicitudes de vale pendientes. ")]),
								_: 1
							}, 8, ["data", "loading"])),
							unref(canApproveVouchers) && unref(voucherRequestsMeta).last_page > 1 ? (openBlock(), createBlock("div", {
								key: 2,
								class: "flex items-center justify-end gap-3 pt-2"
							}, [createVNode(_component_UPagination, {
								page: unref(voucherRequestsPage),
								"onUpdate:page": ($event) => isRef(voucherRequestsPage) ? voucherRequestsPage.value = $event : null,
								total: unref(voucherRequestsMeta).total,
								"items-per-page": unref(voucherRequestsMeta).per_page
							}, null, 8, [
								"page",
								"onUpdate:page",
								"total",
								"items-per-page"
							])])) : createCommentVNode("", true)
						])) : unref(selectedTab) === "transfers" ? (openBlock(), createBlock("div", {
							key: 3,
							class: "space-y-4"
						}, [createVNode("h3", { class: "font-semibold text-base" }, " Transferencias de Cliente Pendientes de Autorización "), !unref(canDecideTransfers) ? (openBlock(), createBlock(_component_UAlert, {
							key: 0,
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-lock",
							title: "Sin permiso",
							description: "Tu usuario no tiene la habilidad customers.transfer.decide necesaria para ver estas solicitudes."
						})) : (openBlock(), createBlock(_component_UTable, {
							key: 1,
							data: unref(transferRequests),
							columns: transferColumns,
							loading: unref(transferRequestsStatus) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, {
							empty: withCtx(() => [createVNode("div", { class: "text-sm text-center py-8 text-dimmed" }, " No hay transferencias de cliente pendientes de autorización. ")]),
							_: 1
						}, 8, ["data", "loading"]))])) : createCommentVNode("", true),
						createVNode(_component_ApplicationsAssignVerifierModal, {
							open: unref(isAssignOpen),
							"onUpdate:open": ($event) => isRef(isAssignOpen) ? isAssignOpen.value = $event : null,
							application: unref(selectedApplication),
							onAssigned: unref(refresh)
						}, null, 8, [
							"open",
							"onUpdate:open",
							"application",
							"onAssigned"
						])
					]))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/coordinador/list.vue
var _sfc_setup = list_vue_vue_type_script_setup_true_lang_default.setup;
list_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/coordinador/list.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var list_default = list_vue_vue_type_script_setup_true_lang_default;

export { list_default as default };
//# sourceMappingURL=list-v0acLWgr.mjs.map
