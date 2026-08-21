import { ap as useComponentProps, aB as useLocale, aj as useAppConfig, p as createRef, ag as tv, q as createReusableTemplate, ay as useForwardProps, a8 as reactivePick, c as Primitive, d as __exportAll, e as __reExport } from '../virtual/entry.mjs';
import { u as useVirtualizer } from './esm-CcArdB_U.mjs';
import { useSlots, computed, useModel, useTemplateRef, toRef, watch, unref, withCtx, mergeProps, createVNode, openBlock, createBlock, Fragment, renderList, renderSlot, createCommentVNode, createTextVNode, toDisplayString, mergeModels, isRef, shallowRef, ref, watchEffect, defineComponent, h, useSSRContext } from 'vue';
import { G as upperFirst, f as defu } from '../_/nitro.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import * as import__tanstack_table_core from '@tanstack/table-core';
import { createTable } from '@tanstack/table-core';

//#region node_modules/.pnpm/@tanstack+vue-table@8.21.3_vue@3.5.41_typescript@6.0.3_/node_modules/@tanstack/vue-table/build/lib/index.mjs
/**
* vue-table
*
* Copyright (c) TanStack
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
var lib_exports = /* @__PURE__ */ __exportAll({
	FlexRender: () => FlexRender,
	useVueTable: () => useVueTable
});
__reExport(lib_exports, import__tanstack_table_core);
function trueFn() {
	return true;
}
var $PROXY = Symbol("merge-proxy");
var propTraps = {
	get(_, property, receiver) {
		if (property === $PROXY) return receiver;
		return _.get(property);
	},
	has(_, property) {
		return _.has(property);
	},
	set: trueFn,
	deleteProperty: trueFn,
	getOwnPropertyDescriptor(_, property) {
		return {
			configurable: true,
			enumerable: true,
			get() {
				return _.get(property);
			},
			set: trueFn,
			deleteProperty: trueFn
		};
	},
	ownKeys(_) {
		return _.keys();
	}
};
function resolveSource(s) {
	return "value" in s ? s.value : s;
}
function mergeProxy() {
	for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) sources[_key] = arguments[_key];
	return new Proxy({
		get(property) {
			for (let i = sources.length - 1; i >= 0; i--) {
				const v = resolveSource(sources[i])[property];
				if (v !== void 0) return v;
			}
		},
		has(property) {
			for (let i = sources.length - 1; i >= 0; i--) if (property in resolveSource(sources[i])) return true;
			return false;
		},
		keys() {
			const keys = [];
			for (let i = 0; i < sources.length; i++) keys.push(...Object.keys(resolveSource(sources[i])));
			return [...Array.from(new Set(keys))];
		}
	}, propTraps);
}
var FlexRender = defineComponent({
	props: ["render", "props"],
	setup: (props) => {
		return () => {
			if (typeof props.render === "function" || typeof props.render === "object") return h(props.render, props.props);
			return props.render;
		};
	}
});
function getOptionsWithReactiveData(options) {
	return mergeProxy(options, { data: unref(options.data) });
}
function useVueTable(initialOptions) {
	const IS_REACTIVE = isRef(initialOptions.data);
	const resolvedOptions = mergeProxy({
		state: {},
		onStateChange: () => {},
		renderFallbackValue: null,
		mergeOptions(defaultOptions, options) {
			return IS_REACTIVE ? {
				...defaultOptions,
				...options
			} : mergeProxy(defaultOptions, options);
		}
	}, IS_REACTIVE ? getOptionsWithReactiveData(initialOptions) : initialOptions);
	const table = createTable(resolvedOptions);
	if (IS_REACTIVE) {
		const dataRef = shallowRef(initialOptions.data);
		watch(dataRef, () => {
			table.setState((prev) => ({
				...prev,
				data: dataRef.value
			}));
		}, { immediate: true });
	}
	const state = ref(table.initialState);
	watchEffect(() => {
		table.setOptions((prev) => {
			var _initialOptions$state;
			const stateProxy = new Proxy({}, { get: (_, prop) => state.value[prop] });
			return mergeProxy(prev, IS_REACTIVE ? getOptionsWithReactiveData(initialOptions) : initialOptions, {
				state: mergeProxy(stateProxy, (_initialOptions$state = initialOptions.state) != null ? _initialOptions$state : {}),
				onStateChange: (updater) => {
					if (updater instanceof Function) state.value = updater(state.value);
					else state.value = updater;
					initialOptions.onStateChange == null || initialOptions.onStateChange(updater);
				}
			});
		});
	});
	return table;
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Ftable.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftable_default = {
	"slots": {
		"root": "relative overflow-auto outline-primary/25 focus-visible:outline-3",
		"base": "min-w-full overflow-clip",
		"caption": "sr-only",
		"thead": "relative",
		"tbody": "isolate [&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:outline-primary/25 [&>tr]:data-[selectable=true]:focus-visible:outline-3 divide-y divide-default",
		"tfoot": "relative",
		"tr": "data-[selected=true]:bg-elevated/50",
		"th": "px-4 py-3.5 text-sm text-highlighted text-start font-semibold [&:has([role=checkbox])]:pe-0",
		"td": "p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0",
		"separator": "absolute z-1 start-0 w-full h-px bg-(--ui-border-accented)",
		"empty": "py-6 text-center text-sm text-muted",
		"loading": "py-6 text-center"
	},
	"variants": {
		"pinned": { "true": {
			"th": "sticky bg-default/75 z-1",
			"td": "sticky bg-default/75 z-1"
		} },
		"sticky": {
			"true": {
				"thead": "sticky top-0 inset-x-0 bg-default/75 backdrop-blur z-1",
				"tfoot": "sticky bottom-0 inset-x-0 bg-default/75 backdrop-blur z-1"
			},
			"header": { "thead": "sticky top-0 inset-x-0 bg-default/75 backdrop-blur z-1" },
			"footer": { "tfoot": "sticky bottom-0 inset-x-0 bg-default/75 backdrop-blur z-1" }
		},
		"loading": { "true": { "thead": "after:absolute after:z-1 after:h-px motion-reduce:after:inset-x-0 motion-reduce:after:animate-pulse" } },
		"externalScroll": { "true": { "root": "overflow-visible" } },
		"loadingAnimation": {
			"carousel": "",
			"carousel-inverse": "",
			"swing": "",
			"elastic": ""
		},
		"loadingColor": {
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
			"loading": true,
			"loadingColor": "primary",
			"class": { "thead": "after:bg-primary" }
		},
		{
			"loading": true,
			"loadingColor": "secondary",
			"class": { "thead": "after:bg-secondary" }
		},
		{
			"loading": true,
			"loadingColor": "success",
			"class": { "thead": "after:bg-success" }
		},
		{
			"loading": true,
			"loadingColor": "info",
			"class": { "thead": "after:bg-info" }
		},
		{
			"loading": true,
			"loadingColor": "warning",
			"class": { "thead": "after:bg-warning" }
		},
		{
			"loading": true,
			"loadingColor": "error",
			"class": { "thead": "after:bg-error" }
		},
		{
			"loading": true,
			"loadingColor": "neutral",
			"class": { "thead": "after:bg-inverted" }
		},
		{
			"loading": true,
			"loadingAnimation": "carousel",
			"class": { "thead": "motion-safe:after:animate-[carousel_2s_ease-in-out_infinite] motion-safe:rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]" }
		},
		{
			"loading": true,
			"loadingAnimation": "carousel-inverse",
			"class": { "thead": "motion-safe:after:animate-[carousel-inverse_2s_ease-in-out_infinite] motion-safe:rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]" }
		},
		{
			"loading": true,
			"loadingAnimation": "swing",
			"class": { "thead": "motion-safe:after:animate-[swing_2s_ease-in-out_infinite]" }
		},
		{
			"loading": true,
			"loadingAnimation": "elastic",
			"class": { "thead": "motion-safe:after:animate-[elastic_2s_ease-in-out_infinite]" }
		}
	],
	"defaultVariants": {
		"loadingColor": "primary",
		"loadingAnimation": "carousel"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Table.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UTable",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		as: {
			type: null,
			required: false
		},
		data: {
			type: Array,
			required: false
		},
		columns: {
			type: Array,
			required: false
		},
		caption: {
			type: String,
			required: false
		},
		meta: {
			type: Object,
			required: false
		},
		virtualize: {
			type: [Boolean, Object],
			required: false,
			default: false
		},
		empty: {
			type: String,
			required: false
		},
		sticky: {
			type: [Boolean, String],
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingColor: {
			type: null,
			required: false
		},
		loadingAnimation: {
			type: null,
			required: false
		},
		watchOptions: {
			type: Object,
			required: false,
			default: () => ({ deep: true })
		},
		globalFilterOptions: {
			type: Object,
			required: false
		},
		columnFiltersOptions: {
			type: Object,
			required: false
		},
		columnPinningOptions: {
			type: Object,
			required: false
		},
		columnSizingOptions: {
			type: Object,
			required: false
		},
		visibilityOptions: {
			type: Object,
			required: false
		},
		sortingOptions: {
			type: Object,
			required: false
		},
		groupingOptions: {
			type: Object,
			required: false
		},
		expandedOptions: {
			type: Object,
			required: false
		},
		rowSelectionOptions: {
			type: Object,
			required: false
		},
		rowPinningOptions: {
			type: Object,
			required: false
		},
		paginationOptions: {
			type: Object,
			required: false
		},
		facetedOptions: {
			type: Object,
			required: false
		},
		onSelect: {
			type: Function,
			required: false
		},
		onHover: {
			type: Function,
			required: false
		},
		onContextmenu: {
			type: [Function, Array],
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
		state: {
			type: Object,
			required: false
		},
		onStateChange: {
			type: Function,
			required: false
		},
		renderFallbackValue: {
			type: null,
			required: false
		},
		_features: {
			type: Array,
			required: false
		},
		autoResetAll: {
			type: Boolean,
			required: false
		},
		debugAll: {
			type: Boolean,
			required: false
		},
		debugCells: {
			type: Boolean,
			required: false
		},
		debugColumns: {
			type: Boolean,
			required: false
		},
		debugHeaders: {
			type: Boolean,
			required: false
		},
		debugRows: {
			type: Boolean,
			required: false
		},
		debugTable: {
			type: Boolean,
			required: false
		},
		defaultColumn: {
			type: Object,
			required: false
		},
		getRowId: {
			type: Function,
			required: false
		},
		getSubRows: {
			type: Function,
			required: false
		},
		initialState: {
			type: Object,
			required: false
		},
		mergeOptions: {
			type: Function,
			required: false
		}
	}, {
		"globalFilter": { type: String },
		"globalFilterModifiers": {},
		"columnFilters": { type: Array },
		"columnFiltersModifiers": {},
		"columnOrder": { type: Array },
		"columnOrderModifiers": {},
		"columnVisibility": { type: Object },
		"columnVisibilityModifiers": {},
		"columnPinning": { type: Object },
		"columnPinningModifiers": {},
		"columnSizing": { type: Object },
		"columnSizingModifiers": {},
		"columnSizingInfo": { type: Object },
		"columnSizingInfoModifiers": {},
		"rowSelection": { type: Object },
		"rowSelectionModifiers": {},
		"rowPinning": { type: Object },
		"rowPinningModifiers": {},
		"sorting": { type: Array },
		"sortingModifiers": {},
		"grouping": { type: Array },
		"groupingModifiers": {},
		"expanded": { type: [Boolean, Object] },
		"expandedModifiers": {},
		"pagination": { type: Object },
		"paginationModifiers": {}
	}),
	emits: [
		"update:globalFilter",
		"update:columnFilters",
		"update:columnOrder",
		"update:columnVisibility",
		"update:columnPinning",
		"update:columnSizing",
		"update:columnSizingInfo",
		"update:rowSelection",
		"update:rowPinning",
		"update:sorting",
		"update:grouping",
		"update:expanded",
		"update:pagination"
	],
	setup(__props, { expose: __expose }) {
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("table", _props);
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const data = createRef(props.data ?? [], props.watchOptions?.deep !== false);
		const meta = computed(() => props.meta ?? {});
		const columns = computed(() => processColumns(props.columns ?? Object.keys(data.value[0] ?? {}).map((accessorKey) => ({
			accessorKey,
			header: upperFirst(accessorKey)
		}))));
		function processColumns(columns2) {
			return columns2.map((column) => {
				const col = { ...column };
				if ("columns" in col && col.columns) col.columns = processColumns(col.columns);
				if (!col.cell) col.cell = ({ getValue }) => {
					const value = getValue();
					if (value === "" || value === null || value === void 0) return "\xA0";
					return String(value);
				};
				return col;
			});
		}
		const isExternalScroll = computed(() => typeof props.virtualize === "object" && !!props.virtualize.getScrollElement);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftable_default,
			...appConfig.ui?.table || {}
		})({
			sticky: props.sticky,
			loading: props.loading,
			loadingColor: props.loadingColor,
			loadingAnimation: props.loadingAnimation,
			externalScroll: isExternalScroll.value
		}));
		const [DefineTableTemplate, ReuseTableTemplate] = createReusableTemplate();
		const [DefineRowTemplate, ReuseRowTemplate] = createReusableTemplate({ props: {
			row: {
				type: Object,
				required: true
			},
			style: {
				type: Object,
				required: false
			}
		} });
		const hasFooter = computed(() => {
			function hasFooterRecursive(columns2) {
				for (const column of columns2) {
					if ("footer" in column) return true;
					if ("columns" in column && hasFooterRecursive(column.columns)) return true;
				}
				return false;
			}
			return hasFooterRecursive(columns.value);
		});
		const globalFilterState = useModel(__props, "globalFilter");
		const columnFiltersState = useModel(__props, "columnFilters");
		const columnOrderState = useModel(__props, "columnOrder");
		const columnVisibilityState = useModel(__props, "columnVisibility");
		const columnPinningState = useModel(__props, "columnPinning");
		const columnSizingState = useModel(__props, "columnSizing");
		const columnSizingInfoState = useModel(__props, "columnSizingInfo");
		const rowSelectionState = useModel(__props, "rowSelection");
		const rowPinningState = useModel(__props, "rowPinning");
		const sortingState = useModel(__props, "sorting");
		const groupingState = useModel(__props, "grouping");
		const expandedState = useModel(__props, "expanded");
		const paginationState = useModel(__props, "pagination");
		const rootRef = useTemplateRef("rootRef");
		const tableRef = useTemplateRef("tableRef");
		const tableApi = useVueTable({
			...useForwardProps(reactivePick(props, "_features", "autoResetAll", "debugAll", "debugCells", "debugColumns", "debugHeaders", "debugRows", "debugTable", "defaultColumn", "getRowId", "getSubRows", "initialState", "mergeOptions", "renderFallbackValue")).value,
			get data() {
				return data.value;
			},
			get columns() {
				return columns.value;
			},
			meta: meta.value,
			getCoreRowModel: (0, lib_exports.getCoreRowModel)(),
			...props.globalFilterOptions || {},
			...globalFilterState.value !== void 0 && { onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilterState) },
			...props.columnFiltersOptions || {},
			getFilteredRowModel: (0, lib_exports.getFilteredRowModel)(),
			...columnFiltersState.value !== void 0 && { onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFiltersState) },
			...columnOrderState.value !== void 0 && { onColumnOrderChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnOrderState) },
			...props.visibilityOptions || {},
			...columnVisibilityState.value !== void 0 && { onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibilityState) },
			...props.columnPinningOptions || {},
			...columnPinningState.value !== void 0 && { onColumnPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnPinningState) },
			...props.columnSizingOptions || {},
			...columnSizingState.value !== void 0 && { onColumnSizingChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingState) },
			...columnSizingInfoState.value !== void 0 && { onColumnSizingInfoChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingInfoState) },
			...props.rowSelectionOptions || {},
			...rowSelectionState.value !== void 0 && { onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelectionState) },
			...props.rowPinningOptions || {},
			...rowPinningState.value !== void 0 && { onRowPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowPinningState) },
			...props.sortingOptions || {},
			getSortedRowModel: (0, lib_exports.getSortedRowModel)(),
			...sortingState.value !== void 0 && { onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sortingState) },
			...props.groupingOptions || {},
			...groupingState.value !== void 0 && { onGroupingChange: (updaterOrValue) => valueUpdater(updaterOrValue, groupingState) },
			...props.expandedOptions || {},
			getExpandedRowModel: (0, lib_exports.getExpandedRowModel)(),
			...expandedState.value !== void 0 && { onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expandedState) },
			...props.paginationOptions || {},
			...paginationState.value !== void 0 && { onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, paginationState) },
			...props.facetedOptions || {},
			state: {
				get globalFilter() {
					return globalFilterState.value;
				},
				get columnFilters() {
					return columnFiltersState.value;
				},
				get columnOrder() {
					return columnOrderState.value;
				},
				get columnVisibility() {
					return columnVisibilityState.value;
				},
				get columnPinning() {
					return columnPinningState.value;
				},
				get expanded() {
					return expandedState.value;
				},
				get rowSelection() {
					return rowSelectionState.value;
				},
				get sorting() {
					return sortingState.value;
				},
				get grouping() {
					return groupingState.value;
				},
				get rowPinning() {
					return rowPinningState.value;
				},
				get columnSizing() {
					return columnSizingState.value;
				},
				get columnSizingInfo() {
					return columnSizingInfoState.value;
				},
				get pagination() {
					return paginationState.value;
				}
			}
		});
		const rows = computed(() => tableApi.getRowModel().rows);
		const topRows = computed(() => props.virtualize ? [] : tableApi.getTopRows());
		const bottomRows = computed(() => props.virtualize ? [] : tableApi.getBottomRows());
		const centerRows = computed(() => topRows.value.length || bottomRows.value.length ? tableApi.getCenterRows() : rows.value);
		const virtualizerProps = toRef(() => defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
			estimateSize: 65,
			overscan: 12
		}));
		const getScrollElement = () => (isExternalScroll.value ? virtualizerProps.value.getScrollElement?.() : rootRef.value?.$el) ?? null;
		const scrollMargin = computed(() => virtualizerProps.value.scrollMargin ?? 0);
		const virtualizer = !!props.virtualize && useVirtualizer({
			...virtualizerProps.value,
			get count() {
				return centerRows.value.length;
			},
			get scrollMargin() {
				return scrollMargin.value;
			},
			getScrollElement,
			estimateSize: (index) => {
				const estimate = virtualizerProps.value.estimateSize;
				return typeof estimate === "function" ? estimate(index) : estimate;
			}
		});
		const virtualItems = computed(() => virtualizer ? virtualizer.value.getVirtualItems() : []);
		const virtualPaddingTop = computed(() => (virtualItems.value[0]?.start ?? 0) - scrollMargin.value);
		const virtualPaddingBottom = computed(() => {
			if (!virtualizer || !virtualItems.value.length) return 0;
			return virtualizer.value.getTotalSize() - (virtualItems.value[virtualItems.value.length - 1]?.end ?? 0) + scrollMargin.value;
		});
		function valueUpdater(updaterOrValue, ref) {
			ref.value = typeof updaterOrValue === "function" ? updaterOrValue(ref.value) : updaterOrValue;
		}
		function onRowSelect(e, row) {
			if (!props.onSelect) return;
			const target = e.target;
			if (target.closest("button") || target.closest("a")) return;
			e.preventDefault();
			e.stopPropagation();
			props.onSelect(e, row);
		}
		function onRowHover(e, row) {
			if (!props.onHover) return;
			props.onHover(e, row);
		}
		function onRowContextmenu(e, row) {
			if (!props.onContextmenu) return;
			if (Array.isArray(props.onContextmenu)) props.onContextmenu.forEach((fn) => fn(e, row));
			else props.onContextmenu(e, row);
		}
		function resolveValue(prop, arg) {
			if (typeof prop === "function") return prop(arg);
			return prop;
		}
		function getColumnStyles(column) {
			const styles = {};
			const pinned = column.getIsPinned();
			if (pinned === "left") styles.left = `${column.getStart("left")}px`;
			else if (pinned === "right") styles.right = `${column.getAfter("right")}px`;
			return styles;
		}
		watch(() => props.data, () => {
			data.value = props.data ? [...props.data] : [];
		}, props.watchOptions);
		__expose({
			get $el() {
				return rootRef.value?.$el;
			},
			tableRef,
			tableApi
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineRowTemplate), null, {
				default: withCtx(({ row, style }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<tr${ssrRenderAttr("data-selected", row.getIsSelected())}${ssrRenderAttr("data-selectable", !!unref(props).onSelect || !!unref(props).onHover || !!unref(props).onContextmenu)}${ssrRenderAttr("data-expanded", row.getIsExpanded())}${ssrRenderAttr("data-pinned", row.getIsPinned() || void 0)}${ssrRenderAttr("role", unref(props).onSelect ? "button" : void 0)}${ssrRenderAttr("tabindex", unref(props).onSelect ? 0 : void 0)} data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [unref(props).ui?.tr, resolveValue(unref(tableApi).options.meta?.class?.tr, row)] }))}" style="${ssrRenderStyle([resolveValue(unref(tableApi).options.meta?.style?.tr, row), style])}"${_scopeId}><!--[-->`);
						ssrRenderList(row.getVisibleCells(), (cell) => {
							_push(`<td${ssrRenderAttr("data-pinned", cell.column.getIsPinned())}${ssrRenderAttr("colspan", resolveValue(cell.column.columnDef.meta?.colspan?.td, cell))}${ssrRenderAttr("rowspan", resolveValue(cell.column.columnDef.meta?.rowspan?.td, cell))} data-slot="td" class="${ssrRenderClass(ui.value.td({
								class: [unref(props).ui?.td, resolveValue(cell.column.columnDef.meta?.class?.td, cell)],
								pinned: !!cell.column.getIsPinned()
							}))}" style="${ssrRenderStyle([getColumnStyles(cell.column), resolveValue(cell.column.columnDef.meta?.style?.td, cell)])}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, `${cell.column.id}-cell`, mergeProps({ ref_for: true }, cell.getContext()), () => {
								_push(ssrRenderComponent(unref(FlexRender), {
									render: cell.column.columnDef.cell,
									props: cell.getContext()
								}, null, _parent, _scopeId));
							}, _push, _parent, _scopeId);
							_push(`</td>`);
						});
						_push(`<!--]--></tr>`);
						if (row.getIsExpanded()) {
							_push(`<tr data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [unref(props).ui?.tr] }))}"${_scopeId}><td${ssrRenderAttr("colspan", row.getAllCells().length)} data-slot="td" class="${ssrRenderClass(ui.value.td({ class: [unref(props).ui?.td] }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "expanded", { row }, null, _push, _parent, _scopeId);
							_push(`</td></tr>`);
						} else _push(`<!---->`);
					} else return [createVNode("tr", {
						"data-selected": row.getIsSelected(),
						"data-selectable": !!unref(props).onSelect || !!unref(props).onHover || !!unref(props).onContextmenu,
						"data-expanded": row.getIsExpanded(),
						"data-pinned": row.getIsPinned() || void 0,
						role: unref(props).onSelect ? "button" : void 0,
						tabindex: unref(props).onSelect ? 0 : void 0,
						"data-slot": "tr",
						class: ui.value.tr({ class: [unref(props).ui?.tr, resolveValue(unref(tableApi).options.meta?.class?.tr, row)] }),
						style: [resolveValue(unref(tableApi).options.meta?.style?.tr, row), style],
						onClick: ($event) => onRowSelect($event, row),
						onPointerenter: ($event) => onRowHover($event, row),
						onPointerleave: ($event) => onRowHover($event, null),
						onContextmenu: ($event) => onRowContextmenu($event, row)
					}, [(openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
						return openBlock(), createBlock("td", {
							key: cell.id,
							"data-pinned": cell.column.getIsPinned(),
							colspan: resolveValue(cell.column.columnDef.meta?.colspan?.td, cell),
							rowspan: resolveValue(cell.column.columnDef.meta?.rowspan?.td, cell),
							"data-slot": "td",
							class: ui.value.td({
								class: [unref(props).ui?.td, resolveValue(cell.column.columnDef.meta?.class?.td, cell)],
								pinned: !!cell.column.getIsPinned()
							}),
							style: [getColumnStyles(cell.column), resolveValue(cell.column.columnDef.meta?.style?.td, cell)]
						}, [renderSlot(_ctx.$slots, `${cell.column.id}-cell`, mergeProps({ ref_for: true }, cell.getContext()), () => [createVNode(unref(FlexRender), {
							render: cell.column.columnDef.cell,
							props: cell.getContext()
						}, null, 8, ["render", "props"])])], 14, [
							"data-pinned",
							"colspan",
							"rowspan"
						]);
					}), 128))], 46, [
						"data-selected",
						"data-selectable",
						"data-expanded",
						"data-pinned",
						"role",
						"tabindex",
						"onClick",
						"onPointerenter",
						"onPointerleave",
						"onContextmenu"
					]), row.getIsExpanded() ? (openBlock(), createBlock("tr", {
						key: 0,
						"data-slot": "tr",
						class: ui.value.tr({ class: [unref(props).ui?.tr] })
					}, [createVNode("td", {
						colspan: row.getAllCells().length,
						"data-slot": "td",
						class: ui.value.td({ class: [unref(props).ui?.td] })
					}, [renderSlot(_ctx.$slots, "expanded", { row })], 10, ["colspan"])], 2)) : createCommentVNode("", true)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DefineTableTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<table data-slot="base" class="${ssrRenderClass(ui.value.base({ class: [unref(props).ui?.base] }))}"${_scopeId}>`);
						if (unref(props).caption || !!slots.caption) {
							_push(`<caption data-slot="caption" class="${ssrRenderClass(ui.value.caption({ class: [unref(props).ui?.caption] }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "caption", {}, () => {
								_push(`${ssrInterpolate(unref(props).caption)}`);
							}, _push, _parent, _scopeId);
							_push(`</caption>`);
						} else _push(`<!---->`);
						_push(`<thead data-slot="thead" class="${ssrRenderClass(ui.value.thead({ class: [unref(props).ui?.thead] }))}"${_scopeId}><!--[-->`);
						ssrRenderList(unref(tableApi).getHeaderGroups(), (headerGroup) => {
							_push(`<tr data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [unref(props).ui?.tr] }))}"${_scopeId}><!--[-->`);
							ssrRenderList(headerGroup.headers, (header) => {
								_push(`<th${ssrRenderAttr("data-pinned", header.column.getIsPinned())}${ssrRenderAttr("scope", header.colSpan > 1 ? "colgroup" : "col")}${ssrRenderAttr("colspan", header.colSpan > 1 ? header.colSpan : void 0)}${ssrRenderAttr("rowspan", header.rowSpan > 1 ? header.rowSpan : void 0)} data-slot="th" class="${ssrRenderClass(ui.value.th({
									class: [unref(props).ui?.th, resolveValue(header.column.columnDef.meta?.class?.th, header)],
									pinned: !!header.column.getIsPinned()
								}))}" style="${ssrRenderStyle([getColumnStyles(header.column), resolveValue(header.column.columnDef.meta?.style?.th, header)])}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, `${header.id}-header`, mergeProps({ ref_for: true }, header.getContext()), () => {
									if (!header.isPlaceholder) _push(ssrRenderComponent(unref(FlexRender), {
										render: header.column.columnDef.header,
										props: header.getContext()
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								_push(`</th>`);
							});
							_push(`<!--]--></tr>`);
						});
						_push(`<!--]--><tr data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: [unref(props).ui?.separator] }))}"${_scopeId}></tr></thead><tbody data-slot="tbody" class="${ssrRenderClass(ui.value.tbody({ class: [unref(props).ui?.tbody] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "body-top", {}, null, _push, _parent, _scopeId);
						if (rows.value.length) {
							_push(`<!--[--><!--[-->`);
							ssrRenderList(topRows.value, (row) => {
								_push(ssrRenderComponent(unref(ReuseRowTemplate), {
									key: row.id,
									row
								}, null, _parent, _scopeId));
							});
							_push(`<!--]-->`);
							if (unref(virtualizer)) {
								_push(`<!--[-->`);
								if (virtualPaddingTop.value > 0) _push(`<tr style="${ssrRenderStyle({ height: `${virtualPaddingTop.value}px` })}" aria-hidden="true"${_scopeId}><td${ssrRenderAttr("colspan", unref(tableApi).getAllLeafColumns().length)}${_scopeId}></td></tr>`);
								else _push(`<!---->`);
								_push(`<!--[-->`);
								ssrRenderList(virtualItems.value, (virtualRow) => {
									_push(`<!--[-->`);
									if (centerRows.value[virtualRow.index]) _push(ssrRenderComponent(unref(ReuseRowTemplate), {
										row: centerRows.value[virtualRow.index],
										style: { height: `${virtualRow.size}px` }
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`<!--]-->`);
								});
								_push(`<!--]-->`);
								if (virtualPaddingBottom.value > 0) _push(`<tr style="${ssrRenderStyle({ height: `${virtualPaddingBottom.value}px` })}" aria-hidden="true"${_scopeId}><td${ssrRenderAttr("colspan", unref(tableApi).getAllLeafColumns().length)}${_scopeId}></td></tr>`);
								else _push(`<!---->`);
								_push(`<!--]-->`);
							} else {
								_push(`<!--[-->`);
								ssrRenderList(centerRows.value, (row) => {
									_push(ssrRenderComponent(unref(ReuseRowTemplate), {
										key: row.id,
										row
									}, null, _parent, _scopeId));
								});
								_push(`<!--]-->`);
							}
							_push(`<!--[-->`);
							ssrRenderList(bottomRows.value, (row) => {
								_push(ssrRenderComponent(unref(ReuseRowTemplate), {
									key: row.id,
									row
								}, null, _parent, _scopeId));
							});
							_push(`<!--]--><!--]-->`);
						} else if (unref(props).loading && !!slots["loading"]) {
							_push(`<tr${_scopeId}><td${ssrRenderAttr("colspan", unref(tableApi).getAllLeafColumns().length)} data-slot="loading" class="${ssrRenderClass(ui.value.loading({ class: unref(props).ui?.loading }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push, _parent, _scopeId);
							_push(`</td></tr>`);
						} else {
							_push(`<tr${_scopeId}><td${ssrRenderAttr("colspan", unref(tableApi).getAllLeafColumns().length)} data-slot="empty" class="${ssrRenderClass(ui.value.empty({ class: unref(props).ui?.empty }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
								_push(`${ssrInterpolate(unref(props).empty || unref(t)("table.noData"))}`);
							}, _push, _parent, _scopeId);
							_push(`</td></tr>`);
						}
						ssrRenderSlot(_ctx.$slots, "body-bottom", {}, null, _push, _parent, _scopeId);
						_push(`</tbody>`);
						if (hasFooter.value) {
							_push(`<tfoot data-slot="tfoot" class="${ssrRenderClass(ui.value.tfoot({ class: [unref(props).ui?.tfoot] }))}"${_scopeId}><tr data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: [unref(props).ui?.separator] }))}"${_scopeId}></tr><!--[-->`);
							ssrRenderList(unref(tableApi).getFooterGroups(), (footerGroup) => {
								_push(`<tr data-slot="tr" class="${ssrRenderClass(ui.value.tr({ class: [unref(props).ui?.tr] }))}"${_scopeId}><!--[-->`);
								ssrRenderList(footerGroup.headers, (header) => {
									_push(`<th${ssrRenderAttr("data-pinned", header.column.getIsPinned())}${ssrRenderAttr("colspan", header.colSpan > 1 ? header.colSpan : void 0)}${ssrRenderAttr("rowspan", header.rowSpan > 1 ? header.rowSpan : void 0)} data-slot="th" class="${ssrRenderClass(ui.value.th({
										class: [unref(props).ui?.th, resolveValue(header.column.columnDef.meta?.class?.th, header)],
										pinned: !!header.column.getIsPinned()
									}))}" style="${ssrRenderStyle([getColumnStyles(header.column), resolveValue(header.column.columnDef.meta?.style?.th, header)])}"${_scopeId}>`);
									ssrRenderSlot(_ctx.$slots, `${header.id}-footer`, mergeProps({ ref_for: true }, header.getContext()), () => {
										if (!header.isPlaceholder) _push(ssrRenderComponent(unref(FlexRender), {
											render: header.column.columnDef.footer,
											props: header.getContext()
										}, null, _parent, _scopeId));
										else _push(`<!---->`);
									}, _push, _parent, _scopeId);
									_push(`</th>`);
								});
								_push(`<!--]--></tr>`);
							});
							_push(`<!--]--></tfoot>`);
						} else _push(`<!---->`);
						_push(`</table>`);
					} else return [createVNode("table", {
						ref_key: "tableRef",
						ref: tableRef,
						"data-slot": "base",
						class: ui.value.base({ class: [unref(props).ui?.base] })
					}, [
						unref(props).caption || !!slots.caption ? (openBlock(), createBlock("caption", {
							key: 0,
							"data-slot": "caption",
							class: ui.value.caption({ class: [unref(props).ui?.caption] })
						}, [renderSlot(_ctx.$slots, "caption", {}, () => [createTextVNode(toDisplayString(unref(props).caption), 1)])], 2)) : createCommentVNode("", true),
						createVNode("thead", {
							"data-slot": "thead",
							class: ui.value.thead({ class: [unref(props).ui?.thead] })
						}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(tableApi).getHeaderGroups(), (headerGroup) => {
							return openBlock(), createBlock("tr", {
								key: headerGroup.id,
								"data-slot": "tr",
								class: ui.value.tr({ class: [unref(props).ui?.tr] })
							}, [(openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
								return openBlock(), createBlock("th", {
									key: header.id,
									"data-pinned": header.column.getIsPinned(),
									scope: header.colSpan > 1 ? "colgroup" : "col",
									colspan: header.colSpan > 1 ? header.colSpan : void 0,
									rowspan: header.rowSpan > 1 ? header.rowSpan : void 0,
									"data-slot": "th",
									class: ui.value.th({
										class: [unref(props).ui?.th, resolveValue(header.column.columnDef.meta?.class?.th, header)],
										pinned: !!header.column.getIsPinned()
									}),
									style: [getColumnStyles(header.column), resolveValue(header.column.columnDef.meta?.style?.th, header)]
								}, [renderSlot(_ctx.$slots, `${header.id}-header`, mergeProps({ ref_for: true }, header.getContext()), () => [!header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
									key: 0,
									render: header.column.columnDef.header,
									props: header.getContext()
								}, null, 8, ["render", "props"])) : createCommentVNode("", true)])], 14, [
									"data-pinned",
									"scope",
									"colspan",
									"rowspan"
								]);
							}), 128))], 2);
						}), 128)), createVNode("tr", {
							"data-slot": "separator",
							class: ui.value.separator({ class: [unref(props).ui?.separator] })
						}, null, 2)], 2),
						createVNode("tbody", {
							"data-slot": "tbody",
							class: ui.value.tbody({ class: [unref(props).ui?.tbody] })
						}, [
							renderSlot(_ctx.$slots, "body-top"),
							rows.value.length ? (openBlock(), createBlock(Fragment, { key: 0 }, [
								(openBlock(true), createBlock(Fragment, null, renderList(topRows.value, (row) => {
									return openBlock(), createBlock(unref(ReuseRowTemplate), {
										key: row.id,
										row
									}, null, 8, ["row"]);
								}), 128)),
								unref(virtualizer) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
									virtualPaddingTop.value > 0 ? (openBlock(), createBlock("tr", {
										key: 0,
										style: { height: `${virtualPaddingTop.value}px` },
										"aria-hidden": "true"
									}, [createVNode("td", { colspan: unref(tableApi).getAllLeafColumns().length }, null, 8, ["colspan"])], 4)) : createCommentVNode("", true),
									(openBlock(true), createBlock(Fragment, null, renderList(virtualItems.value, (virtualRow) => {
										return openBlock(), createBlock(Fragment, { key: centerRows.value[virtualRow.index]?.id ?? `virtual-${virtualRow.index}` }, [centerRows.value[virtualRow.index] ? (openBlock(), createBlock(unref(ReuseRowTemplate), {
											key: 0,
											row: centerRows.value[virtualRow.index],
											style: { height: `${virtualRow.size}px` }
										}, null, 8, ["row", "style"])) : createCommentVNode("", true)], 64);
									}), 128)),
									virtualPaddingBottom.value > 0 ? (openBlock(), createBlock("tr", {
										key: 1,
										style: { height: `${virtualPaddingBottom.value}px` },
										"aria-hidden": "true"
									}, [createVNode("td", { colspan: unref(tableApi).getAllLeafColumns().length }, null, 8, ["colspan"])], 4)) : createCommentVNode("", true)
								], 64)) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(centerRows.value, (row) => {
									return openBlock(), createBlock(unref(ReuseRowTemplate), {
										key: row.id,
										row
									}, null, 8, ["row"]);
								}), 128)),
								(openBlock(true), createBlock(Fragment, null, renderList(bottomRows.value, (row) => {
									return openBlock(), createBlock(unref(ReuseRowTemplate), {
										key: row.id,
										row
									}, null, 8, ["row"]);
								}), 128))
							], 64)) : unref(props).loading && !!slots["loading"] ? (openBlock(), createBlock("tr", { key: 1 }, [createVNode("td", {
								colspan: unref(tableApi).getAllLeafColumns().length,
								"data-slot": "loading",
								class: ui.value.loading({ class: unref(props).ui?.loading })
							}, [renderSlot(_ctx.$slots, "loading")], 10, ["colspan"])])) : (openBlock(), createBlock("tr", { key: 2 }, [createVNode("td", {
								colspan: unref(tableApi).getAllLeafColumns().length,
								"data-slot": "empty",
								class: ui.value.empty({ class: unref(props).ui?.empty })
							}, [renderSlot(_ctx.$slots, "empty", {}, () => [createTextVNode(toDisplayString(unref(props).empty || unref(t)("table.noData")), 1)])], 10, ["colspan"])])),
							renderSlot(_ctx.$slots, "body-bottom")
						], 2),
						hasFooter.value ? (openBlock(), createBlock("tfoot", {
							key: 1,
							"data-slot": "tfoot",
							class: ui.value.tfoot({ class: [unref(props).ui?.tfoot] })
						}, [createVNode("tr", {
							"data-slot": "separator",
							class: ui.value.separator({ class: [unref(props).ui?.separator] })
						}, null, 2), (openBlock(true), createBlock(Fragment, null, renderList(unref(tableApi).getFooterGroups(), (footerGroup) => {
							return openBlock(), createBlock("tr", {
								key: footerGroup.id,
								"data-slot": "tr",
								class: ui.value.tr({ class: [unref(props).ui?.tr] })
							}, [(openBlock(true), createBlock(Fragment, null, renderList(footerGroup.headers, (header) => {
								return openBlock(), createBlock("th", {
									key: header.id,
									"data-pinned": header.column.getIsPinned(),
									colspan: header.colSpan > 1 ? header.colSpan : void 0,
									rowspan: header.rowSpan > 1 ? header.rowSpan : void 0,
									"data-slot": "th",
									class: ui.value.th({
										class: [unref(props).ui?.th, resolveValue(header.column.columnDef.meta?.class?.th, header)],
										pinned: !!header.column.getIsPinned()
									}),
									style: [getColumnStyles(header.column), resolveValue(header.column.columnDef.meta?.style?.th, header)]
								}, [renderSlot(_ctx.$slots, `${header.id}-footer`, mergeProps({ ref_for: true }, header.getContext()), () => [!header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
									key: 0,
									render: header.column.columnDef.footer,
									props: header.getContext()
								}, null, 8, ["render", "props"])) : createCommentVNode("", true)])], 14, [
									"data-pinned",
									"colspan",
									"rowspan"
								]);
							}), 128))], 2);
						}), 128))], 2)) : createCommentVNode("", true)
					], 2)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				ref_key: "rootRef",
				ref: rootRef,
				as: unref(props).as,
				"data-slot": "root"
			}, _ctx.$attrs, { class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }) }), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(ReuseTableTemplate), null, null, _parent, _scopeId));
					else return [createVNode(unref(ReuseTableTemplate))];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Table.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Table-OSD_tKHH.mjs.map
