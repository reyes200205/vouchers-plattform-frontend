import { h as _sfc_main$7, j as _sfc_main$9, g as _sfc_main$2$2, aj as useAsyncData, ao as useComponentProps, ai as useAppConfig, af as tv, b as Primitive, az as useLocale, ax as useForwardProps, a6 as reactiveOmit } from '../virtual/entry.mjs';
import { _ as _sfc_main$e } from './Select-COOtR1SR.mjs';
import { g as YearRangePicker, Y as YearPicker, e as MonthRangePicker, d as MonthPicker, R as RangeCalendar, C as Calendar, j as getWeekNumber } from './namespaced-Cysx46L3.mjs';
import { _ as _sfc_main$4 } from './DropdownMenu-CSO5oJPB.mjs';
import { _ as _sfc_main$3 } from './Tooltip-BlDWBU8d.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { _ as _sfc_main$a } from './Badge-CmUnAJCw.mjs';
import { _ as _sfc_main$d } from './Popover-BbIOdeLO.mjs';
import { u as useDashboard } from './useDashboard-DM_RFO1v.mjs';
import { b as _sfc_main$2$1, a as _sfc_main$1$1, _ as _sfc_main$5 } from './DashboardSidebarCollapse-B125GinS.mjs';
import { _ as _sfc_main$b } from './Card-B0imoY-h.mjs';
import { _ as _sfc_main$c } from './Table-DRTDyHli.mjs';
import { _ as _sfc_main$6 } from './DashboardToolbar-Be7vUsPE.mjs';
import { _ as _sfc_main$8 } from './PageCard-a8nb0R2H.mjs';
import { defineComponent, shallowRef, ref, mergeProps, withCtx, unref, createVNode, isRef, withAsyncContext, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useModel, computed, watch, mergeModels, renderSlot, h, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { DateFormatter, getLocalTimeZone, CalendarDate, today } from '@internationalized/date';
import { sub, eachDayOfInterval } from 'date-fns';
import '../_/nitro.mjs';
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
import './PopperArrow-uZwABxuX.mjs';
import './utils-D4TVPsMb.mjs';
import './useFormControl-Cwxa6hMn.mjs';
import './Kbd-DEj9mxJN.mjs';
import './Input-CsmJf5Y6.mjs';
import './overlay-BtFRc-iG.mjs';
import './defineShortcuts-zVsILOx1.mjs';
import './DashboardSidebarToggle-CrE1-3MV.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcalendar.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcalendar_default = {
	"slots": {
		"root": "",
		"header": "flex items-center justify-between",
		"body": "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
		"heading": "flex-1 min-w-0 text-center",
		"headingLabel": "font-medium block truncate p-1.5",
		"grid": "w-full border-collapse select-none space-y-1 focus:outline-none",
		"gridRow": "grid",
		"gridWeekDaysRow": "mb-1 grid w-full grid-cols-7",
		"gridBody": "grid",
		"headCell": "rounded-md",
		"headCellWeek": "rounded-md text-muted",
		"cell": "relative text-center",
		"cellTrigger": ["m-0.5 relative flex items-center justify-center whitespace-nowrap focus-visible:outline-3 data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-today:font-semibold", "transition"],
		"cellWeek": "relative text-center text-muted"
	},
	"variants": {
		"color": {
			"primary": {
				"headCell": "text-primary",
				"cellTrigger": "outline-primary/25"
			},
			"secondary": {
				"headCell": "text-secondary",
				"cellTrigger": "outline-secondary/25"
			},
			"success": {
				"headCell": "text-success",
				"cellTrigger": "outline-success/25"
			},
			"info": {
				"headCell": "text-info",
				"cellTrigger": "outline-info/25"
			},
			"warning": {
				"headCell": "text-warning",
				"cellTrigger": "outline-warning/25"
			},
			"error": {
				"headCell": "text-error",
				"cellTrigger": "outline-error/25"
			},
			"neutral": {
				"headCell": "text-highlighted",
				"cellTrigger": "outline-inverted/25"
			}
		},
		"variant": {
			"solid": "",
			"outline": "",
			"soft": "",
			"subtle": ""
		},
		"size": {
			"xs": {
				"headingLabel": "text-xs",
				"cell": "text-xs",
				"cellWeek": "text-xs",
				"headCell": "text-[10px]",
				"headCellWeek": "text-[10px]",
				"body": "space-y-2 pt-2"
			},
			"sm": {
				"headingLabel": "text-xs",
				"headCell": "text-xs",
				"headCellWeek": "text-xs",
				"cellWeek": "text-xs",
				"cell": "text-xs"
			},
			"md": {
				"headingLabel": "text-sm",
				"headCell": "text-xs",
				"headCellWeek": "text-xs",
				"cellWeek": "text-xs",
				"cell": "text-sm"
			},
			"lg": {
				"headingLabel": "text-md",
				"headCell": "text-md",
				"headCellWeek": "text-md"
			},
			"xl": {
				"headingLabel": "text-lg",
				"headCell": "text-lg",
				"headCellWeek": "text-lg"
			}
		},
		"view": {
			"day": {
				"gridRow": "grid-cols-7 place-items-center",
				"cellTrigger": "rounded-full data-outside-view:text-muted"
			},
			"month": {
				"gridRow": "grid-cols-4",
				"cellTrigger": "rounded-md"
			},
			"year": {
				"gridRow": "grid-cols-4",
				"cellTrigger": "rounded-md"
			}
		},
		"weekNumbers": { "true": "" }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-primary data-selected:text-inverted data-today:not-data-selected:text-primary data-highlighted:bg-primary/20 hover:not-data-selected:bg-primary/20" }
		},
		{
			"color": "secondary",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-secondary data-selected:text-inverted data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/20 hover:not-data-selected:bg-secondary/20" }
		},
		{
			"color": "success",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-success data-selected:text-inverted data-today:not-data-selected:text-success data-highlighted:bg-success/20 hover:not-data-selected:bg-success/20" }
		},
		{
			"color": "info",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-info data-selected:text-inverted data-today:not-data-selected:text-info data-highlighted:bg-info/20 hover:not-data-selected:bg-info/20" }
		},
		{
			"color": "warning",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-warning data-selected:text-inverted data-today:not-data-selected:text-warning data-highlighted:bg-warning/20 hover:not-data-selected:bg-warning/20" }
		},
		{
			"color": "error",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-error data-selected:text-inverted data-today:not-data-selected:text-error data-highlighted:bg-error/20 hover:not-data-selected:bg-error/20" }
		},
		{
			"color": "primary",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-primary/50 data-selected:text-primary data-selected:focus-visible:ring-primary data-today:not-data-selected:text-primary data-highlighted:bg-primary/10 hover:not-data-selected:bg-primary/10" }
		},
		{
			"color": "secondary",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-secondary/50 data-selected:text-secondary data-selected:focus-visible:ring-secondary data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/10 hover:not-data-selected:bg-secondary/10" }
		},
		{
			"color": "success",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-success/50 data-selected:text-success data-selected:focus-visible:ring-success data-today:not-data-selected:text-success data-highlighted:bg-success/10 hover:not-data-selected:bg-success/10" }
		},
		{
			"color": "info",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-info/50 data-selected:text-info data-selected:focus-visible:ring-info data-today:not-data-selected:text-info data-highlighted:bg-info/10 hover:not-data-selected:bg-info/10" }
		},
		{
			"color": "warning",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-warning/50 data-selected:text-warning data-selected:focus-visible:ring-warning data-today:not-data-selected:text-warning data-highlighted:bg-warning/10 hover:not-data-selected:bg-warning/10" }
		},
		{
			"color": "error",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-error/50 data-selected:text-error data-selected:focus-visible:ring-error data-today:not-data-selected:text-error data-highlighted:bg-error/10 hover:not-data-selected:bg-error/10" }
		},
		{
			"color": "primary",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-primary/10 data-selected:text-primary data-today:not-data-selected:text-primary data-highlighted:bg-primary/20 hover:not-data-selected:bg-primary/20" }
		},
		{
			"color": "secondary",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-secondary/10 data-selected:text-secondary data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/20 hover:not-data-selected:bg-secondary/20" }
		},
		{
			"color": "success",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-success/10 data-selected:text-success data-today:not-data-selected:text-success data-highlighted:bg-success/20 hover:not-data-selected:bg-success/20" }
		},
		{
			"color": "info",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-info/10 data-selected:text-info data-today:not-data-selected:text-info data-highlighted:bg-info/20 hover:not-data-selected:bg-info/20" }
		},
		{
			"color": "warning",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-warning/10 data-selected:text-warning data-today:not-data-selected:text-warning data-highlighted:bg-warning/20 hover:not-data-selected:bg-warning/20" }
		},
		{
			"color": "error",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-error/10 data-selected:text-error data-today:not-data-selected:text-error data-highlighted:bg-error/20 hover:not-data-selected:bg-error/20" }
		},
		{
			"color": "primary",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-primary/10 data-selected:text-primary data-selected:ring data-selected:ring-inset data-selected:ring-primary/25 data-selected:focus-visible:ring-primary data-today:not-data-selected:text-primary data-highlighted:bg-primary/20 hover:not-data-selected:bg-primary/20" }
		},
		{
			"color": "secondary",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-secondary/10 data-selected:text-secondary data-selected:ring data-selected:ring-inset data-selected:ring-secondary/25 data-selected:focus-visible:ring-secondary data-today:not-data-selected:text-secondary data-highlighted:bg-secondary/20 hover:not-data-selected:bg-secondary/20" }
		},
		{
			"color": "success",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-success/10 data-selected:text-success data-selected:ring data-selected:ring-inset data-selected:ring-success/25 data-selected:focus-visible:ring-success data-today:not-data-selected:text-success data-highlighted:bg-success/20 hover:not-data-selected:bg-success/20" }
		},
		{
			"color": "info",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-info/10 data-selected:text-info data-selected:ring data-selected:ring-inset data-selected:ring-info/25 data-selected:focus-visible:ring-info data-today:not-data-selected:text-info data-highlighted:bg-info/20 hover:not-data-selected:bg-info/20" }
		},
		{
			"color": "warning",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-warning/10 data-selected:text-warning data-selected:ring data-selected:ring-inset data-selected:ring-warning/25 data-selected:focus-visible:ring-warning data-today:not-data-selected:text-warning data-highlighted:bg-warning/20 hover:not-data-selected:bg-warning/20" }
		},
		{
			"color": "error",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-error/10 data-selected:text-error data-selected:ring data-selected:ring-inset data-selected:ring-error/25 data-selected:focus-visible:ring-error data-today:not-data-selected:text-error data-highlighted:bg-error/20 hover:not-data-selected:bg-error/20" }
		},
		{
			"color": "neutral",
			"variant": "solid",
			"class": { "cellTrigger": "data-selected:bg-inverted data-selected:text-inverted data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/20 hover:not-data-selected:bg-inverted/10" }
		},
		{
			"color": "neutral",
			"variant": "outline",
			"class": { "cellTrigger": "data-selected:ring data-selected:ring-inset data-selected:ring-accented data-selected:text-default data-selected:bg-default data-selected:focus-visible:ring-inverted data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/10 hover:not-data-selected:bg-inverted/10" }
		},
		{
			"color": "neutral",
			"variant": "soft",
			"class": { "cellTrigger": "data-selected:bg-elevated data-selected:text-default data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/20 hover:not-data-selected:bg-inverted/10" }
		},
		{
			"color": "neutral",
			"variant": "subtle",
			"class": { "cellTrigger": "data-selected:bg-elevated data-selected:text-default data-selected:ring data-selected:ring-inset data-selected:ring-accented data-selected:focus-visible:ring-inverted data-today:not-data-selected:text-highlighted data-highlighted:bg-inverted/20 hover:not-data-selected:bg-inverted/10" }
		},
		{
			"size": "xs",
			"view": "day",
			"class": { "cellTrigger": "size-7" }
		},
		{
			"size": "sm",
			"view": "day",
			"class": { "cellTrigger": "size-7" }
		},
		{
			"size": "md",
			"view": "day",
			"class": { "cellTrigger": "size-8" }
		},
		{
			"size": "lg",
			"view": "day",
			"class": { "cellTrigger": "size-9 text-md" }
		},
		{
			"size": "xl",
			"view": "day",
			"class": { "cellTrigger": "size-10 text-lg" }
		},
		{
			"size": "xs",
			"view": ["month", "year"],
			"class": { "cellTrigger": "h-7 px-2" }
		},
		{
			"size": "sm",
			"view": ["month", "year"],
			"class": { "cellTrigger": "h-7 px-2" }
		},
		{
			"size": "md",
			"view": ["month", "year"],
			"class": { "cellTrigger": "h-8 px-3" }
		},
		{
			"size": "lg",
			"view": ["month", "year"],
			"class": { "cellTrigger": "h-9 px-4 text-md" }
		},
		{
			"size": "xl",
			"view": ["month", "year"],
			"class": { "cellTrigger": "h-10 px-5 text-lg" }
		},
		{
			"view": "day",
			"weekNumbers": true,
			"class": {
				"gridRow": "grid-cols-8",
				"gridWeekDaysRow": "grid-cols-8 [&>*:first-child]:col-start-2"
			}
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "solid",
		"view": "day"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Calendar.vue
var _sfc_main$2 = {
	__name: "UCalendar",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		type: {
			type: String,
			required: false,
			default: "date"
		},
		nextYearIcon: {
			type: null,
			required: false
		},
		nextYear: {
			type: Object,
			required: false
		},
		nextMonthIcon: {
			type: null,
			required: false
		},
		nextMonth: {
			type: Object,
			required: false
		},
		prevYearIcon: {
			type: null,
			required: false
		},
		prevYear: {
			type: Object,
			required: false
		},
		prevMonthIcon: {
			type: null,
			required: false
		},
		prevMonth: {
			type: Object,
			required: false
		},
		viewControl: {
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
		range: {
			type: Boolean,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		monthControls: {
			type: Boolean,
			required: false,
			default: true
		},
		yearControls: {
			type: Boolean,
			required: false,
			default: true
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		weekNumbers: {
			type: Boolean,
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
		defaultPlaceholder: {
			type: Object,
			required: false
		},
		placeholder: {
			type: Object,
			required: false
		},
		allowNonContiguousRanges: {
			type: Boolean,
			required: false
		},
		pagedNavigation: {
			type: Boolean,
			required: false
		},
		preventDeselect: {
			type: Boolean,
			required: false
		},
		maximumDays: {
			type: Number,
			required: false
		},
		weekStartsOn: {
			type: Number,
			required: false
		},
		weekdayFormat: {
			type: String,
			required: false
		},
		fixedWeeks: {
			type: Boolean,
			required: false,
			default: true
		},
		maxValue: {
			type: Object,
			required: false
		},
		minValue: {
			type: Object,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		numberOfMonths: {
			type: Number,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false
		},
		initialFocus: {
			type: Boolean,
			required: false
		},
		isDateDisabled: {
			type: Function,
			required: false
		},
		isDateUnavailable: {
			type: Function,
			required: false
		},
		isDateHighlightable: {
			type: Function,
			required: false
		},
		nextPage: {
			type: Function,
			required: false
		},
		prevPage: {
			type: Function,
			required: false
		},
		disableDaysOutsideCurrentView: {
			type: Boolean,
			required: false
		},
		fixedDate: {
			type: String,
			required: false
		},
		isMonthDisabled: {
			type: Function,
			required: false
		},
		isMonthUnavailable: {
			type: Function,
			required: false
		},
		isYearDisabled: {
			type: Function,
			required: false
		},
		isYearUnavailable: {
			type: Function,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"update:placeholder",
		"update:startValue",
		"update:validModelValue"
	],
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const props = useComponentProps("calendar", _props);
		const { dir, t, locale } = useLocale();
		const appConfig = useAppConfig();
		const VIEWS = [
			"day",
			"month",
			"year"
		];
		const minView = computed(() => props.type === "year" ? "year" : props.type === "month" ? "month" : "day");
		const maxView = "year";
		const view = ref(minView.value);
		watch(() => props.type, () => {
			view.value = minView.value;
		});
		const switchable = computed(() => minView.value !== maxView);
		const isMinView = computed(() => view.value === minView.value);
		function clampView(value) {
			const min = VIEWS.indexOf(minView.value);
			const max = VIEWS.indexOf(maxView);
			return VIEWS[Math.min(Math.max(VIEWS.indexOf(value), min), max)];
		}
		function setView(value) {
			view.value = clampView(value);
		}
		function cycleView() {
			const max = VIEWS.indexOf(maxView);
			const next = VIEWS.indexOf(view.value) >= max ? minView.value : VIEWS[VIEWS.indexOf(view.value) + 1];
			view.value = next;
		}
		function resolveDateValue(value) {
			if (Array.isArray(value)) return value[0];
			if (!value) return;
			if ("start" in value || "end" in value) {
				const range = value;
				return range.start ?? range.end ?? void 0;
			}
			return value;
		}
		const placeholder = shallowRef(props.placeholder ?? resolveDateValue(props.modelValue) ?? resolveDateValue(props.defaultValue) ?? today(getLocalTimeZone()));
		watch(() => props.placeholder, (value) => {
			if (value) placeholder.value = value;
		});
		function setPlaceholder(date) {
			placeholder.value = date;
			emits("update:placeholder", date);
		}
		function onSelect(value) {
			if (isMinView.value) {
				emits("update:modelValue", value);
				return;
			}
			const resolved = resolveDateValue(value);
			if (resolved) setPlaceholder(resolved);
			setView(VIEWS[VIEWS.indexOf(view.value) - 1]);
		}
		function paginateYear(date, sign) {
			return sign === -1 ? date.subtract({ years: 1 }) : date.add({ years: 1 });
		}
		const Picker = computed(() => {
			const range = props.range && isMinView.value;
			if (view.value === "year") return range ? YearRangePicker : YearPicker;
			if (view.value === "month") return range ? MonthRangePicker : MonthPicker;
			return props.range ? RangeCalendar : Calendar;
		});
		const omittedProps = [
			"type",
			"placeholder",
			"range",
			"modelValue",
			"defaultValue",
			"color",
			"variant",
			"size",
			"monthControls",
			"yearControls",
			"viewControl",
			"class",
			"ui"
		];
		const dayOnlyProps = [
			"pagedNavigation",
			"weekStartsOn",
			"weekdayFormat",
			"fixedWeeks",
			"numberOfMonths",
			"isDateDisabled",
			"isDateUnavailable",
			"isDateHighlightable",
			"disableDaysOutsideCurrentView",
			"maximumDays"
		];
		const monthOnlyProps = ["isMonthDisabled", "isMonthUnavailable"];
		const yearOnlyProps = ["isYearDisabled", "isYearUnavailable"];
		const rangeOnlyProps = ["allowNonContiguousRanges", "fixedDate"];
		const rootProps = useForwardProps(reactiveOmit(props, (_, key) => omittedProps.includes(key) || view.value !== "day" && dayOnlyProps.includes(key) || view.value !== "month" && monthOnlyProps.includes(key) || view.value !== "year" && yearOnlyProps.includes(key) || !isMinView.value && rangeOnlyProps.includes(key)));
		function cellProps(cellDate, monthValue) {
			if (view.value === "month") return { month: cellDate };
			if (view.value === "year") return { year: cellDate };
			return {
				day: cellDate,
				month: monthValue
			};
		}
		const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
		const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
		const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
		const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
		const prevLabel = computed(() => view.value === "day" ? t("calendar.prevMonth") : t("calendar.prevYear"));
		const nextLabel = computed(() => view.value === "day" ? t("calendar.nextMonth") : t("calendar.nextYear"));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcalendar_default,
			...appConfig.ui?.calendar || {}
		})({
			color: props.color,
			size: props.size,
			variant: props.variant,
			weekNumbers: props.weekNumbers,
			view: view.value
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Picker).Root, mergeProps(unref(rootProps), {
				"model-value": isMinView.value ? unref(props).modelValue : void 0,
				"default-value": isMinView.value ? unref(props).defaultValue : void 0,
				placeholder: placeholder.value,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
				"onUpdate:placeholder": setPlaceholder,
				"onUpdate:modelValue": onSelect,
				"onUpdate:startValue": (value) => emits("update:startValue", value),
				"onUpdate:validModelValue": (value) => emits("update:validModelValue", value)
			}, _attrs), {
				default: withCtx(({ weekDays, grid, date }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Picker).Header, {
							"data-slot": "header",
							class: ui.value.header({ class: unref(props).ui?.header })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (view.value === "day" && unref(props).yearControls) _push(ssrRenderComponent(unref(Picker).Prev, {
										"prev-page": (date) => paginateYear(date, -1),
										"aria-label": unref(t)("calendar.prevYear"),
										"as-child": ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
												icon: prevYearIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).prevYear), null, _parent, _scopeId));
											else return [createVNode(_sfc_main$7, mergeProps({
												icon: prevYearIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).prevYear), null, 16, ["icon", "size"])];
										}),
										_: 2
									}, _parent, _scopeId));
									else _push(`<!---->`);
									if (view.value !== "day" || unref(props).monthControls) _push(ssrRenderComponent(unref(Picker).Prev, {
										"aria-label": prevLabel.value,
										"as-child": ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
												icon: prevMonthIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).prevMonth), null, _parent, _scopeId));
											else return [createVNode(_sfc_main$7, mergeProps({
												icon: prevMonthIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).prevMonth), null, 16, ["icon", "size"])];
										}),
										_: 2
									}, _parent, _scopeId));
									else _push(`<!---->`);
									_push(ssrRenderComponent(unref(Picker).Heading, {
										"data-slot": "heading",
										class: ui.value.heading({ class: unref(props).ui?.heading })
									}, {
										default: withCtx(({ headingValue }, _push, _parent, _scopeId) => {
											if (_push) ssrRenderSlot(_ctx.$slots, "heading", {
												value: headingValue,
												view: view.value,
												date,
												setView,
												setPlaceholder
											}, () => {
												if (switchable.value && unref(props).viewControl) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
													label: headingValue,
													size: unref(props).size,
													color: "neutral",
													variant: "ghost",
													block: ""
												}, typeof unref(props).viewControl === "object" ? unref(props).viewControl : {}, { onClick: cycleView }), null, _parent, _scopeId));
												else _push(`<span data-slot="headingLabel" class="${ssrRenderClass(ui.value.headingLabel({ class: unref(props).ui?.headingLabel }))}"${_scopeId}>${ssrInterpolate(headingValue)}</span>`);
											}, _push, _parent, _scopeId);
											else return [renderSlot(_ctx.$slots, "heading", {
												value: headingValue,
												view: view.value,
												date,
												setView,
												setPlaceholder
											}, () => [switchable.value && unref(props).viewControl ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
												key: 0,
												label: headingValue,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost",
												block: ""
											}, typeof unref(props).viewControl === "object" ? unref(props).viewControl : {}, { onClick: cycleView }), null, 16, ["label", "size"])) : (openBlock(), createBlock("span", {
												key: 1,
												"data-slot": "headingLabel",
												class: ui.value.headingLabel({ class: unref(props).ui?.headingLabel })
											}, toDisplayString(headingValue), 3))])];
										}),
										_: 2
									}, _parent, _scopeId));
									if (view.value !== "day" || unref(props).monthControls) _push(ssrRenderComponent(unref(Picker).Next, {
										"aria-label": nextLabel.value,
										"as-child": ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
												icon: nextMonthIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).nextMonth), null, _parent, _scopeId));
											else return [createVNode(_sfc_main$7, mergeProps({
												icon: nextMonthIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).nextMonth), null, 16, ["icon", "size"])];
										}),
										_: 2
									}, _parent, _scopeId));
									else _push(`<!---->`);
									if (view.value === "day" && unref(props).yearControls) _push(ssrRenderComponent(unref(Picker).Next, {
										"next-page": (date) => paginateYear(date, 1),
										"aria-label": unref(t)("calendar.nextYear"),
										"as-child": ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_sfc_main$7, mergeProps({
												icon: nextYearIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).nextYear), null, _parent, _scopeId));
											else return [createVNode(_sfc_main$7, mergeProps({
												icon: nextYearIcon.value,
												size: unref(props).size,
												color: "neutral",
												variant: "ghost"
											}, unref(props).nextYear), null, 16, ["icon", "size"])];
										}),
										_: 2
									}, _parent, _scopeId));
									else _push(`<!---->`);
								} else return [
									view.value === "day" && unref(props).yearControls ? (openBlock(), createBlock(unref(Picker).Prev, {
										key: 0,
										"prev-page": (date) => paginateYear(date, -1),
										"aria-label": unref(t)("calendar.prevYear"),
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
											icon: prevYearIcon.value,
											size: unref(props).size,
											color: "neutral",
											variant: "ghost"
										}, unref(props).prevYear), null, 16, ["icon", "size"])]),
										_: 1
									}, 8, ["prev-page", "aria-label"])) : createCommentVNode("", true),
									view.value !== "day" || unref(props).monthControls ? (openBlock(), createBlock(unref(Picker).Prev, {
										key: 1,
										"aria-label": prevLabel.value,
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
											icon: prevMonthIcon.value,
											size: unref(props).size,
											color: "neutral",
											variant: "ghost"
										}, unref(props).prevMonth), null, 16, ["icon", "size"])]),
										_: 1
									}, 8, ["aria-label"])) : createCommentVNode("", true),
									createVNode(unref(Picker).Heading, {
										"data-slot": "heading",
										class: ui.value.heading({ class: unref(props).ui?.heading })
									}, {
										default: withCtx(({ headingValue }) => [renderSlot(_ctx.$slots, "heading", {
											value: headingValue,
											view: view.value,
											date,
											setView,
											setPlaceholder
										}, () => [switchable.value && unref(props).viewControl ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
											key: 0,
											label: headingValue,
											size: unref(props).size,
											color: "neutral",
											variant: "ghost",
											block: ""
										}, typeof unref(props).viewControl === "object" ? unref(props).viewControl : {}, { onClick: cycleView }), null, 16, ["label", "size"])) : (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "headingLabel",
											class: ui.value.headingLabel({ class: unref(props).ui?.headingLabel })
										}, toDisplayString(headingValue), 3))])]),
										_: 2
									}, 1032, ["class"]),
									view.value !== "day" || unref(props).monthControls ? (openBlock(), createBlock(unref(Picker).Next, {
										key: 2,
										"aria-label": nextLabel.value,
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
											icon: nextMonthIcon.value,
											size: unref(props).size,
											color: "neutral",
											variant: "ghost"
										}, unref(props).nextMonth), null, 16, ["icon", "size"])]),
										_: 1
									}, 8, ["aria-label"])) : createCommentVNode("", true),
									view.value === "day" && unref(props).yearControls ? (openBlock(), createBlock(unref(Picker).Next, {
										key: 3,
										"next-page": (date) => paginateYear(date, 1),
										"aria-label": unref(t)("calendar.nextYear"),
										"as-child": ""
									}, {
										default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
											icon: nextYearIcon.value,
											size: unref(props).size,
											color: "neutral",
											variant: "ghost"
										}, unref(props).nextYear), null, 16, ["icon", "size"])]),
										_: 1
									}, 8, ["next-page", "aria-label"])) : createCommentVNode("", true)
								];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(props).ui?.body }))}"${_scopeId}><!--[-->`);
						ssrRenderList(Array.isArray(grid) ? grid : [grid], (month) => {
							_push(ssrRenderComponent(unref(Picker).Grid, {
								key: month.value.toString(),
								"data-slot": "grid",
								class: ui.value.grid({ class: unref(props).ui?.grid })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										if ("GridHead" in Picker.value) _push(ssrRenderComponent(unref(Picker).GridHead, null, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(unref(Picker).GridRow, {
													"data-slot": "gridWeekDaysRow",
													class: ui.value.gridWeekDaysRow({ class: unref(props).ui?.gridWeekDaysRow })
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<!--[-->`);
															ssrRenderList(weekDays, (day) => {
																_push(ssrRenderComponent(unref(Picker).HeadCell, {
																	key: day,
																	"data-slot": "headCell",
																	class: ui.value.headCell({ class: unref(props).ui?.headCell })
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) ssrRenderSlot(_ctx.$slots, "week-day", { day }, () => {
																			_push(`${ssrInterpolate(day)}`);
																		}, _push, _parent, _scopeId);
																		else return [renderSlot(_ctx.$slots, "week-day", { day }, () => [createTextVNode(toDisplayString(day), 1)])];
																	}),
																	_: 2
																}, _parent, _scopeId));
															});
															_push(`<!--]-->`);
														} else return [(openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
															return openBlock(), createBlock(unref(Picker).HeadCell, {
																key: day,
																"data-slot": "headCell",
																class: ui.value.headCell({ class: unref(props).ui?.headCell })
															}, {
																default: withCtx(() => [renderSlot(_ctx.$slots, "week-day", { day }, () => [createTextVNode(toDisplayString(day), 1)])]),
																_: 2
															}, 1032, ["class"]);
														}), 128))];
													}),
													_: 2
												}, _parent, _scopeId));
												else return [createVNode(unref(Picker).GridRow, {
													"data-slot": "gridWeekDaysRow",
													class: ui.value.gridWeekDaysRow({ class: unref(props).ui?.gridWeekDaysRow })
												}, {
													default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
														return openBlock(), createBlock(unref(Picker).HeadCell, {
															key: day,
															"data-slot": "headCell",
															class: ui.value.headCell({ class: unref(props).ui?.headCell })
														}, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "week-day", { day }, () => [createTextVNode(toDisplayString(day), 1)])]),
															_: 2
														}, 1032, ["class"]);
													}), 128))]),
													_: 2
												}, 1032, ["class"])];
											}),
											_: 2
										}, _parent, _scopeId));
										else _push(`<!---->`);
										_push(ssrRenderComponent(unref(Picker).GridBody, {
											"data-slot": "gridBody",
											class: ui.value.gridBody({ class: unref(props).ui?.gridBody })
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(`<!--[-->`);
													ssrRenderList(month.rows, (row, index) => {
														_push(ssrRenderComponent(unref(Picker).GridRow, {
															key: `row-${index}`,
															"data-slot": "gridRow",
															class: ui.value.gridRow({ class: unref(props).ui?.gridRow })
														}, {
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) {
																	if (view.value === "day" && unref(props).weekNumbers && row[0]) _push(`<td role="gridcell" data-slot="cellWeek" class="${ssrRenderClass(ui.value.cellWeek({ class: unref(props).ui?.cellWeek }))}"${_scopeId}>${ssrInterpolate(unref(getWeekNumber)(row[0], unref(props).locale ?? unref(locale).code))}</td>`);
																	else _push(`<!---->`);
																	_push(`<!--[-->`);
																	ssrRenderList(row, (cellDate) => {
																		_push(ssrRenderComponent(unref(Picker).Cell, {
																			key: cellDate.toString(),
																			date: cellDate,
																			"data-slot": "cell",
																			class: ui.value.cell({ class: unref(props).ui?.cell })
																		}, {
																			default: withCtx((_, _push, _parent, _scopeId) => {
																				if (_push) _push(ssrRenderComponent(unref(Picker).CellTrigger, mergeProps({ ref_for: true }, cellProps(cellDate, month.value), {
																					"data-slot": "cellTrigger",
																					class: ui.value.cellTrigger({ class: unref(props).ui?.cellTrigger })
																				}), {
																					default: withCtx((cell, _push, _parent, _scopeId) => {
																						if (_push) if (view.value === "day") ssrRenderSlot(_ctx.$slots, "day", { day: cellDate }, () => {
																							_push(`${ssrInterpolate(cellDate.day)}`);
																						}, _push, _parent, _scopeId);
																						else if (view.value === "month") ssrRenderSlot(_ctx.$slots, "month-cell", {
																							month: cellDate,
																							selected: cell.selected,
																							disabled: cell.disabled
																						}, () => {
																							_push(`${ssrInterpolate(cell.monthValue)}`);
																						}, _push, _parent, _scopeId);
																						else ssrRenderSlot(_ctx.$slots, "year-cell", {
																							year: cellDate,
																							selected: cell.selected,
																							disabled: cell.disabled
																						}, () => {
																							_push(`${ssrInterpolate(cell.yearValue)}`);
																						}, _push, _parent, _scopeId);
																						else return [view.value === "day" ? renderSlot(_ctx.$slots, "day", { day: cellDate }, () => [createTextVNode(toDisplayString(cellDate.day), 1)], void 0, 0) : view.value === "month" ? renderSlot(_ctx.$slots, "month-cell", {
																							month: cellDate,
																							selected: cell.selected,
																							disabled: cell.disabled
																						}, () => [createTextVNode(toDisplayString(cell.monthValue), 1)], void 0, 1) : renderSlot(_ctx.$slots, "year-cell", {
																							year: cellDate,
																							selected: cell.selected,
																							disabled: cell.disabled
																						}, () => [createTextVNode(toDisplayString(cell.yearValue), 1)], void 0, 2)];
																					}),
																					_: 2
																				}, _parent, _scopeId));
																				else return [createVNode(unref(Picker).CellTrigger, mergeProps({ ref_for: true }, cellProps(cellDate, month.value), {
																					"data-slot": "cellTrigger",
																					class: ui.value.cellTrigger({ class: unref(props).ui?.cellTrigger })
																				}), {
																					default: withCtx((cell) => [view.value === "day" ? renderSlot(_ctx.$slots, "day", { day: cellDate }, () => [createTextVNode(toDisplayString(cellDate.day), 1)], void 0, 0) : view.value === "month" ? renderSlot(_ctx.$slots, "month-cell", {
																						month: cellDate,
																						selected: cell.selected,
																						disabled: cell.disabled
																					}, () => [createTextVNode(toDisplayString(cell.monthValue), 1)], void 0, 1) : renderSlot(_ctx.$slots, "year-cell", {
																						year: cellDate,
																						selected: cell.selected,
																						disabled: cell.disabled
																					}, () => [createTextVNode(toDisplayString(cell.yearValue), 1)], void 0, 2)]),
																					_: 2
																				}, 1040, ["class"])];
																			}),
																			_: 2
																		}, _parent, _scopeId));
																	});
																	_push(`<!--]-->`);
																} else return [view.value === "day" && unref(props).weekNumbers && row[0] ? (openBlock(), createBlock("td", {
																	key: 0,
																	role: "gridcell",
																	"data-slot": "cellWeek",
																	class: ui.value.cellWeek({ class: unref(props).ui?.cellWeek })
																}, toDisplayString(unref(getWeekNumber)(row[0], unref(props).locale ?? unref(locale).code)), 3)) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(row, (cellDate) => {
																	return openBlock(), createBlock(unref(Picker).Cell, {
																		key: cellDate.toString(),
																		date: cellDate,
																		"data-slot": "cell",
																		class: ui.value.cell({ class: unref(props).ui?.cell })
																	}, {
																		default: withCtx(() => [createVNode(unref(Picker).CellTrigger, mergeProps({ ref_for: true }, cellProps(cellDate, month.value), {
																			"data-slot": "cellTrigger",
																			class: ui.value.cellTrigger({ class: unref(props).ui?.cellTrigger })
																		}), {
																			default: withCtx((cell) => [view.value === "day" ? renderSlot(_ctx.$slots, "day", { day: cellDate }, () => [createTextVNode(toDisplayString(cellDate.day), 1)], void 0, 0) : view.value === "month" ? renderSlot(_ctx.$slots, "month-cell", {
																				month: cellDate,
																				selected: cell.selected,
																				disabled: cell.disabled
																			}, () => [createTextVNode(toDisplayString(cell.monthValue), 1)], void 0, 1) : renderSlot(_ctx.$slots, "year-cell", {
																				year: cellDate,
																				selected: cell.selected,
																				disabled: cell.disabled
																			}, () => [createTextVNode(toDisplayString(cell.yearValue), 1)], void 0, 2)]),
																			_: 2
																		}, 1040, ["class"])]),
																		_: 2
																	}, 1032, ["date", "class"]);
																}), 128))];
															}),
															_: 2
														}, _parent, _scopeId));
													});
													_push(`<!--]-->`);
												} else return [(openBlock(true), createBlock(Fragment, null, renderList(month.rows, (row, index) => {
													return openBlock(), createBlock(unref(Picker).GridRow, {
														key: `row-${index}`,
														"data-slot": "gridRow",
														class: ui.value.gridRow({ class: unref(props).ui?.gridRow })
													}, {
														default: withCtx(() => [view.value === "day" && unref(props).weekNumbers && row[0] ? (openBlock(), createBlock("td", {
															key: 0,
															role: "gridcell",
															"data-slot": "cellWeek",
															class: ui.value.cellWeek({ class: unref(props).ui?.cellWeek })
														}, toDisplayString(unref(getWeekNumber)(row[0], unref(props).locale ?? unref(locale).code)), 3)) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(row, (cellDate) => {
															return openBlock(), createBlock(unref(Picker).Cell, {
																key: cellDate.toString(),
																date: cellDate,
																"data-slot": "cell",
																class: ui.value.cell({ class: unref(props).ui?.cell })
															}, {
																default: withCtx(() => [createVNode(unref(Picker).CellTrigger, mergeProps({ ref_for: true }, cellProps(cellDate, month.value), {
																	"data-slot": "cellTrigger",
																	class: ui.value.cellTrigger({ class: unref(props).ui?.cellTrigger })
																}), {
																	default: withCtx((cell) => [view.value === "day" ? renderSlot(_ctx.$slots, "day", { day: cellDate }, () => [createTextVNode(toDisplayString(cellDate.day), 1)], void 0, 0) : view.value === "month" ? renderSlot(_ctx.$slots, "month-cell", {
																		month: cellDate,
																		selected: cell.selected,
																		disabled: cell.disabled
																	}, () => [createTextVNode(toDisplayString(cell.monthValue), 1)], void 0, 1) : renderSlot(_ctx.$slots, "year-cell", {
																		year: cellDate,
																		selected: cell.selected,
																		disabled: cell.disabled
																	}, () => [createTextVNode(toDisplayString(cell.yearValue), 1)], void 0, 2)]),
																	_: 2
																}, 1040, ["class"])]),
																_: 2
															}, 1032, ["date", "class"]);
														}), 128))]),
														_: 2
													}, 1032, ["class"]);
												}), 128))];
											}),
											_: 2
										}, _parent, _scopeId));
									} else return ["GridHead" in Picker.value ? (openBlock(), createBlock(unref(Picker).GridHead, { key: 0 }, {
										default: withCtx(() => [createVNode(unref(Picker).GridRow, {
											"data-slot": "gridWeekDaysRow",
											class: ui.value.gridWeekDaysRow({ class: unref(props).ui?.gridWeekDaysRow })
										}, {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
												return openBlock(), createBlock(unref(Picker).HeadCell, {
													key: day,
													"data-slot": "headCell",
													class: ui.value.headCell({ class: unref(props).ui?.headCell })
												}, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "week-day", { day }, () => [createTextVNode(toDisplayString(day), 1)])]),
													_: 2
												}, 1032, ["class"]);
											}), 128))]),
											_: 2
										}, 1032, ["class"])]),
										_: 2
									}, 1024)) : createCommentVNode("", true), createVNode(unref(Picker).GridBody, {
										"data-slot": "gridBody",
										class: ui.value.gridBody({ class: unref(props).ui?.gridBody })
									}, {
										default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(month.rows, (row, index) => {
											return openBlock(), createBlock(unref(Picker).GridRow, {
												key: `row-${index}`,
												"data-slot": "gridRow",
												class: ui.value.gridRow({ class: unref(props).ui?.gridRow })
											}, {
												default: withCtx(() => [view.value === "day" && unref(props).weekNumbers && row[0] ? (openBlock(), createBlock("td", {
													key: 0,
													role: "gridcell",
													"data-slot": "cellWeek",
													class: ui.value.cellWeek({ class: unref(props).ui?.cellWeek })
												}, toDisplayString(unref(getWeekNumber)(row[0], unref(props).locale ?? unref(locale).code)), 3)) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(row, (cellDate) => {
													return openBlock(), createBlock(unref(Picker).Cell, {
														key: cellDate.toString(),
														date: cellDate,
														"data-slot": "cell",
														class: ui.value.cell({ class: unref(props).ui?.cell })
													}, {
														default: withCtx(() => [createVNode(unref(Picker).CellTrigger, mergeProps({ ref_for: true }, cellProps(cellDate, month.value), {
															"data-slot": "cellTrigger",
															class: ui.value.cellTrigger({ class: unref(props).ui?.cellTrigger })
														}), {
															default: withCtx((cell) => [view.value === "day" ? renderSlot(_ctx.$slots, "day", { day: cellDate }, () => [createTextVNode(toDisplayString(cellDate.day), 1)], void 0, 0) : view.value === "month" ? renderSlot(_ctx.$slots, "month-cell", {
																month: cellDate,
																selected: cell.selected,
																disabled: cell.disabled
															}, () => [createTextVNode(toDisplayString(cell.monthValue), 1)], void 0, 1) : renderSlot(_ctx.$slots, "year-cell", {
																year: cellDate,
																selected: cell.selected,
																disabled: cell.disabled
															}, () => [createTextVNode(toDisplayString(cell.yearValue), 1)], void 0, 2)]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1032, ["date", "class"]);
												}), 128))]),
												_: 2
											}, 1032, ["class"]);
										}), 128))]),
										_: 2
									}, 1032, ["class"])];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
					} else return [createVNode(unref(Picker).Header, {
						"data-slot": "header",
						class: ui.value.header({ class: unref(props).ui?.header })
					}, {
						default: withCtx(() => [
							view.value === "day" && unref(props).yearControls ? (openBlock(), createBlock(unref(Picker).Prev, {
								key: 0,
								"prev-page": (date) => paginateYear(date, -1),
								"aria-label": unref(t)("calendar.prevYear"),
								"as-child": ""
							}, {
								default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
									icon: prevYearIcon.value,
									size: unref(props).size,
									color: "neutral",
									variant: "ghost"
								}, unref(props).prevYear), null, 16, ["icon", "size"])]),
								_: 1
							}, 8, ["prev-page", "aria-label"])) : createCommentVNode("", true),
							view.value !== "day" || unref(props).monthControls ? (openBlock(), createBlock(unref(Picker).Prev, {
								key: 1,
								"aria-label": prevLabel.value,
								"as-child": ""
							}, {
								default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
									icon: prevMonthIcon.value,
									size: unref(props).size,
									color: "neutral",
									variant: "ghost"
								}, unref(props).prevMonth), null, 16, ["icon", "size"])]),
								_: 1
							}, 8, ["aria-label"])) : createCommentVNode("", true),
							createVNode(unref(Picker).Heading, {
								"data-slot": "heading",
								class: ui.value.heading({ class: unref(props).ui?.heading })
							}, {
								default: withCtx(({ headingValue }) => [renderSlot(_ctx.$slots, "heading", {
									value: headingValue,
									view: view.value,
									date,
									setView,
									setPlaceholder
								}, () => [switchable.value && unref(props).viewControl ? (openBlock(), createBlock(_sfc_main$7, mergeProps({
									key: 0,
									label: headingValue,
									size: unref(props).size,
									color: "neutral",
									variant: "ghost",
									block: ""
								}, typeof unref(props).viewControl === "object" ? unref(props).viewControl : {}, { onClick: cycleView }), null, 16, ["label", "size"])) : (openBlock(), createBlock("span", {
									key: 1,
									"data-slot": "headingLabel",
									class: ui.value.headingLabel({ class: unref(props).ui?.headingLabel })
								}, toDisplayString(headingValue), 3))])]),
								_: 2
							}, 1032, ["class"]),
							view.value !== "day" || unref(props).monthControls ? (openBlock(), createBlock(unref(Picker).Next, {
								key: 2,
								"aria-label": nextLabel.value,
								"as-child": ""
							}, {
								default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
									icon: nextMonthIcon.value,
									size: unref(props).size,
									color: "neutral",
									variant: "ghost"
								}, unref(props).nextMonth), null, 16, ["icon", "size"])]),
								_: 1
							}, 8, ["aria-label"])) : createCommentVNode("", true),
							view.value === "day" && unref(props).yearControls ? (openBlock(), createBlock(unref(Picker).Next, {
								key: 3,
								"next-page": (date) => paginateYear(date, 1),
								"aria-label": unref(t)("calendar.nextYear"),
								"as-child": ""
							}, {
								default: withCtx(() => [createVNode(_sfc_main$7, mergeProps({
									icon: nextYearIcon.value,
									size: unref(props).size,
									color: "neutral",
									variant: "ghost"
								}, unref(props).nextYear), null, 16, ["icon", "size"])]),
								_: 1
							}, 8, ["next-page", "aria-label"])) : createCommentVNode("", true)
						]),
						_: 2
					}, 1032, ["class"]), createVNode("div", {
						"data-slot": "body",
						class: ui.value.body({ class: unref(props).ui?.body })
					}, [(openBlock(true), createBlock(Fragment, null, renderList(Array.isArray(grid) ? grid : [grid], (month) => {
						return openBlock(), createBlock(unref(Picker).Grid, {
							key: month.value.toString(),
							"data-slot": "grid",
							class: ui.value.grid({ class: unref(props).ui?.grid })
						}, {
							default: withCtx(() => ["GridHead" in Picker.value ? (openBlock(), createBlock(unref(Picker).GridHead, { key: 0 }, {
								default: withCtx(() => [createVNode(unref(Picker).GridRow, {
									"data-slot": "gridWeekDaysRow",
									class: ui.value.gridWeekDaysRow({ class: unref(props).ui?.gridWeekDaysRow })
								}, {
									default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
										return openBlock(), createBlock(unref(Picker).HeadCell, {
											key: day,
											"data-slot": "headCell",
											class: ui.value.headCell({ class: unref(props).ui?.headCell })
										}, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "week-day", { day }, () => [createTextVNode(toDisplayString(day), 1)])]),
											_: 2
										}, 1032, ["class"]);
									}), 128))]),
									_: 2
								}, 1032, ["class"])]),
								_: 2
							}, 1024)) : createCommentVNode("", true), createVNode(unref(Picker).GridBody, {
								"data-slot": "gridBody",
								class: ui.value.gridBody({ class: unref(props).ui?.gridBody })
							}, {
								default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(month.rows, (row, index) => {
									return openBlock(), createBlock(unref(Picker).GridRow, {
										key: `row-${index}`,
										"data-slot": "gridRow",
										class: ui.value.gridRow({ class: unref(props).ui?.gridRow })
									}, {
										default: withCtx(() => [view.value === "day" && unref(props).weekNumbers && row[0] ? (openBlock(), createBlock("td", {
											key: 0,
											role: "gridcell",
											"data-slot": "cellWeek",
											class: ui.value.cellWeek({ class: unref(props).ui?.cellWeek })
										}, toDisplayString(unref(getWeekNumber)(row[0], unref(props).locale ?? unref(locale).code)), 3)) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList(row, (cellDate) => {
											return openBlock(), createBlock(unref(Picker).Cell, {
												key: cellDate.toString(),
												date: cellDate,
												"data-slot": "cell",
												class: ui.value.cell({ class: unref(props).ui?.cell })
											}, {
												default: withCtx(() => [createVNode(unref(Picker).CellTrigger, mergeProps({ ref_for: true }, cellProps(cellDate, month.value), {
													"data-slot": "cellTrigger",
													class: ui.value.cellTrigger({ class: unref(props).ui?.cellTrigger })
												}), {
													default: withCtx((cell) => [view.value === "day" ? renderSlot(_ctx.$slots, "day", { day: cellDate }, () => [createTextVNode(toDisplayString(cellDate.day), 1)], void 0, 0) : view.value === "month" ? renderSlot(_ctx.$slots, "month-cell", {
														month: cellDate,
														selected: cell.selected,
														disabled: cell.disabled
													}, () => [createTextVNode(toDisplayString(cell.monthValue), 1)], void 0, 1) : renderSlot(_ctx.$slots, "year-cell", {
														year: cellDate,
														selected: cell.selected,
														disabled: cell.disabled
													}, () => [createTextVNode(toDisplayString(cell.yearValue), 1)], void 0, 2)]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1032, ["date", "class"]);
										}), 128))]),
										_: 2
									}, 1032, ["class"]);
								}), 128))]),
								_: 2
							}, 1032, ["class"])]),
							_: 2
						}, 1032, ["class"]);
					}), 128))], 2)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$7 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Calendar.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region app/components/home/HomeDateRangePicker.vue?vue&type=script&setup=true&lang.ts
var HomeDateRangePicker_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeDateRangePicker",
	__ssrInlineRender: true,
	props: {
		"modelValue": { required: true },
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const df = new DateFormatter("en-US", { dateStyle: "medium" });
		const selected = useModel(__props, "modelValue");
		const ranges = [
			{
				label: "Last 7 days",
				days: 7
			},
			{
				label: "Last 14 days",
				days: 14
			},
			{
				label: "Last 30 days",
				days: 30
			},
			{
				label: "Last 3 months",
				months: 3
			},
			{
				label: "Last 6 months",
				months: 6
			},
			{
				label: "Last year",
				years: 1
			}
		];
		const toCalendarDate = (date) => {
			return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
		};
		const calendarRange = computed({
			get: () => ({
				start: selected.value.start ? toCalendarDate(selected.value.start) : void 0,
				end: selected.value.end ? toCalendarDate(selected.value.end) : void 0
			}),
			set: (newValue) => {
				selected.value = {
					start: newValue.start ? newValue.start.toDate(getLocalTimeZone()) : /* @__PURE__ */ new Date(),
					end: newValue.end ? newValue.end.toDate(getLocalTimeZone()) : /* @__PURE__ */ new Date()
				};
			}
		});
		const isRangeSelected = (range) => {
			if (!selected.value.start || !selected.value.end) return false;
			const currentDate = today(getLocalTimeZone());
			let startDate = currentDate.copy();
			if (range.days) startDate = startDate.subtract({ days: range.days });
			else if (range.months) startDate = startDate.subtract({ months: range.months });
			else if (range.years) startDate = startDate.subtract({ years: range.years });
			const selectedStart = toCalendarDate(selected.value.start);
			const selectedEnd = toCalendarDate(selected.value.end);
			return selectedStart.compare(startDate) === 0 && selectedEnd.compare(currentDate) === 0;
		};
		const selectRange = (range) => {
			const endDate = today(getLocalTimeZone());
			let startDate = endDate.copy();
			if (range.days) startDate = startDate.subtract({ days: range.days });
			else if (range.months) startDate = startDate.subtract({ months: range.months });
			else if (range.years) startDate = startDate.subtract({ years: range.years });
			selected.value = {
				start: startDate.toDate(getLocalTimeZone()),
				end: endDate.toDate(getLocalTimeZone())
			};
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPopover = _sfc_main$d;
			const _component_UButton = _sfc_main$7;
			const _component_UIcon = _sfc_main$2$2;
			const _component_UCalendar = _sfc_main$2;
			_push(ssrRenderComponent(_component_UPopover, mergeProps({
				content: { align: "start" },
				modal: true
			}, _attrs), {
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-stretch sm:divide-x divide-default"${_scopeId}><div class="hidden sm:flex flex-col justify-center"${_scopeId}><!--[-->`);
						ssrRenderList(ranges, (range, index) => {
							_push(ssrRenderComponent(_component_UButton, {
								key: index,
								label: range.label,
								color: "neutral",
								variant: "ghost",
								class: ["rounded-none px-4", [isRangeSelected(range) ? "bg-elevated" : "hover:bg-elevated/50"]],
								truncate: "",
								onClick: ($event) => selectRange(range)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
						_push(ssrRenderComponent(_component_UCalendar, {
							modelValue: unref(calendarRange),
							"onUpdate:modelValue": ($event) => isRef(calendarRange) ? calendarRange.value = $event : null,
							class: "p-2",
							"number-of-months": 2,
							range: ""
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex items-stretch sm:divide-x divide-default" }, [createVNode("div", { class: "hidden sm:flex flex-col justify-center" }, [(openBlock(), createBlock(Fragment, null, renderList(ranges, (range, index) => {
						return createVNode(_component_UButton, {
							key: index,
							label: range.label,
							color: "neutral",
							variant: "ghost",
							class: ["rounded-none px-4", [isRangeSelected(range) ? "bg-elevated" : "hover:bg-elevated/50"]],
							truncate: "",
							onClick: ($event) => selectRange(range)
						}, null, 8, [
							"label",
							"class",
							"onClick"
						]);
					}), 64))]), createVNode(_component_UCalendar, {
						modelValue: unref(calendarRange),
						"onUpdate:modelValue": ($event) => isRef(calendarRange) ? calendarRange.value = $event : null,
						class: "p-2",
						"number-of-months": 2,
						range: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						color: "neutral",
						variant: "ghost",
						icon: "i-lucide-calendar",
						class: "data-[state=open]:bg-elevated group"
					}, {
						trailing: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-chevron-down",
								class: "shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
							}, null, _parent, _scopeId));
							else return [createVNode(_component_UIcon, {
								name: "i-lucide-chevron-down",
								class: "shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
							})];
						}),
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span class="truncate"${_scopeId}>`);
								if (selected.value.start) {
									_push(`<!--[-->`);
									if (selected.value.end) _push(`<!--[-->${ssrInterpolate(unref(df).format(selected.value.start))} - ${ssrInterpolate(unref(df).format(selected.value.end))}<!--]-->`);
									else _push(`<!--[-->${ssrInterpolate(unref(df).format(selected.value.start))}<!--]-->`);
									_push(`<!--]-->`);
								} else _push(`<!--[--> Pick a date <!--]-->`);
								_push(`</span>`);
							} else return [createVNode("span", { class: "truncate" }, [selected.value.start ? (openBlock(), createBlock(Fragment, { key: 0 }, [selected.value.end ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(unref(df).format(selected.value.start)) + " - " + toDisplayString(unref(df).format(selected.value.end)), 1)], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(unref(df).format(selected.value.start)), 1)], 64))], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(" Pick a date ")], 64))])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						color: "neutral",
						variant: "ghost",
						icon: "i-lucide-calendar",
						class: "data-[state=open]:bg-elevated group"
					}, {
						trailing: withCtx(() => [createVNode(_component_UIcon, {
							name: "i-lucide-chevron-down",
							class: "shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
						})]),
						default: withCtx(() => [createVNode("span", { class: "truncate" }, [selected.value.start ? (openBlock(), createBlock(Fragment, { key: 0 }, [selected.value.end ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(unref(df).format(selected.value.start)) + " - " + toDisplayString(unref(df).format(selected.value.end)), 1)], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(unref(df).format(selected.value.start)), 1)], 64))], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(" Pick a date ")], 64))])]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomeDateRangePicker.vue
var _sfc_setup$6 = HomeDateRangePicker_vue_vue_type_script_setup_true_lang_default.setup;
HomeDateRangePicker_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeDateRangePicker.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var HomeDateRangePicker_default = Object.assign(HomeDateRangePicker_vue_vue_type_script_setup_true_lang_default, { __name: "HomeDateRangePicker" });
//#endregion
//#region app/components/home/HomePeriodSelect.vue?vue&type=script&setup=true&lang.ts
var HomePeriodSelect_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomePeriodSelect",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ range: {} }, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const days = computed(() => eachDayOfInterval(props.range));
		const periods = computed(() => {
			if (days.value.length <= 8) return ["daily"];
			if (days.value.length <= 31) return ["daily", "weekly"];
			return ["weekly", "monthly"];
		});
		watch(periods, () => {
			if (!periods.value.includes(model.value)) model.value = periods.value[0];
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$e, mergeProps({
				modelValue: model.value,
				"onUpdate:modelValue": ($event) => model.value = $event,
				items: unref(periods),
				variant: "ghost",
				class: "data-[state=open]:bg-elevated",
				ui: {
					value: "capitalize",
					itemLabel: "capitalize",
					trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
				}
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomePeriodSelect.vue
var _sfc_setup$5 = HomePeriodSelect_vue_vue_type_script_setup_true_lang_default.setup;
HomePeriodSelect_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomePeriodSelect.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var HomePeriodSelect_default = Object.assign(HomePeriodSelect_vue_vue_type_script_setup_true_lang_default, { __name: "HomePeriodSelect" });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpage-grid.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_grid_default = { "base": "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/PageGrid.vue
var _sfc_main$1 = {
	__name: "UPageGrid",
	__ssrInlineRender: true,
	props: {
		as: {
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
		const props = useComponentProps("pageGrid", __props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_grid_default,
			...appConfig.ui?.pageGrid || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				class: ui.value({ class: [unref(props).ui?.base, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$4 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/PageGrid.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region app/utils/index.ts
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFrom(array) {
	return array[Math.floor(Math.random() * array.length)];
}
//#endregion
//#region app/components/home/HomeStats.vue?vue&type=script&setup=true&lang.ts
var HomeStats_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeStats",
	__ssrInlineRender: true,
	props: {
		period: {},
		range: {}
	},
	async setup(__props) {
		let __temp, __restore;
		const props = __props;
		function formatCurrency(value) {
			return value.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
				maximumFractionDigits: 0
			});
		}
		const baseStats = [
			{
				title: "Customers",
				icon: "i-lucide-users",
				minValue: 400,
				maxValue: 1e3,
				minVariation: -15,
				maxVariation: 25
			},
			{
				title: "Conversions",
				icon: "i-lucide-chart-pie",
				minValue: 1e3,
				maxValue: 2e3,
				minVariation: -10,
				maxVariation: 20
			},
			{
				title: "Revenue",
				icon: "i-lucide-circle-dollar-sign",
				minValue: 2e5,
				maxValue: 5e5,
				minVariation: -20,
				maxVariation: 30,
				formatter: formatCurrency
			},
			{
				title: "Orders",
				icon: "i-lucide-shopping-cart",
				minValue: 100,
				maxValue: 300,
				minVariation: -5,
				maxVariation: 15
			}
		];
		const { data: stats } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("stats", async () => {
			return baseStats.map((stat) => {
				const value = randomInt(stat.minValue, stat.maxValue);
				const variation = randomInt(stat.minVariation, stat.maxVariation);
				return {
					title: stat.title,
					icon: stat.icon,
					value: stat.formatter ? stat.formatter(value) : value,
					variation
				};
			});
		}, {
			watch: [() => props.period, () => props.range],
			default: () => []
		})), __temp = await __temp, __restore(), __temp);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPageGrid = _sfc_main$1;
			const _component_UPageCard = _sfc_main$8;
			const _component_UBadge = _sfc_main$a;
			_push(ssrRenderComponent(_component_UPageGrid, mergeProps({ class: "lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(unref(stats), (stat, index) => {
							_push(ssrRenderComponent(_component_UPageCard, {
								key: index,
								icon: stat.icon,
								title: stat.title,
								to: "/customers",
								variant: "subtle",
								ui: {
									container: "gap-y-1.5",
									wrapper: "items-start",
									leading: "p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col",
									title: "font-normal text-muted text-xs uppercase"
								},
								class: "lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="flex items-center gap-2"${_scopeId}><span class="text-2xl font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(stat.value)}</span>`);
										_push(ssrRenderComponent(_component_UBadge, {
											color: stat.variation > 0 ? "success" : "error",
											variant: "subtle",
											class: "text-xs"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(stat.variation > 0 ? "+" : "")}${ssrInterpolate(stat.variation)}% `);
												else return [createTextVNode(toDisplayString(stat.variation > 0 ? "+" : "") + toDisplayString(stat.variation) + "% ", 1)];
											}),
											_: 2
										}, _parent, _scopeId));
										_push(`</div>`);
									} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-2xl font-semibold text-highlighted" }, toDisplayString(stat.value), 1), createVNode(_component_UBadge, {
										color: stat.variation > 0 ? "success" : "error",
										variant: "subtle",
										class: "text-xs"
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(stat.variation > 0 ? "+" : "") + toDisplayString(stat.variation) + "% ", 1)]),
										_: 2
									}, 1032, ["color"])])];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(unref(stats), (stat, index) => {
						return openBlock(), createBlock(_component_UPageCard, {
							key: index,
							icon: stat.icon,
							title: stat.title,
							to: "/customers",
							variant: "subtle",
							ui: {
								container: "gap-y-1.5",
								wrapper: "items-start",
								leading: "p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col",
								title: "font-normal text-muted text-xs uppercase"
							},
							class: "lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
						}, {
							default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("span", { class: "text-2xl font-semibold text-highlighted" }, toDisplayString(stat.value), 1), createVNode(_component_UBadge, {
								color: stat.variation > 0 ? "success" : "error",
								variant: "subtle",
								class: "text-xs"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(stat.variation > 0 ? "+" : "") + toDisplayString(stat.variation) + "% ", 1)]),
								_: 2
							}, 1032, ["color"])])]),
							_: 2
						}, 1032, ["icon", "title"]);
					}), 128))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomeStats.vue
var _sfc_setup$3 = HomeStats_vue_vue_type_script_setup_true_lang_default.setup;
HomeStats_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeStats.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var HomeStats_default = Object.assign(HomeStats_vue_vue_type_script_setup_true_lang_default, { __name: "HomeStats" });
//#endregion
//#region app/components/home/HomeChart.server.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(ssrRenderComponent(_sfc_main$b, mergeProps({
		class: "shrink-0",
		ui: { body: "px-0! pt-0! pb-3!" }
	}, _attrs), {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`<div${_scopeId}><p class="text-xs text-muted uppercase mb-1.5"${_scopeId}> Revenue </p><p class="text-3xl text-highlighted font-semibold"${_scopeId}> --- </p></div>`);
			else return [createVNode("div", null, [createVNode("p", { class: "text-xs text-muted uppercase mb-1.5" }, " Revenue "), createVNode("p", { class: "text-3xl text-highlighted font-semibold" }, " --- ")])];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`<div class="h-96"${_scopeId}></div>`);
			else return [createVNode("div", { class: "h-96" })];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup$2 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeChart.server.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var HomeChart_server_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "HomeChart" });
//#endregion
//#region app/components/home/HomeSales.vue?vue&type=script&setup=true&lang.ts
var HomeSales_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HomeSales",
	__ssrInlineRender: true,
	props: {
		period: {},
		range: {}
	},
	async setup(__props) {
		let __temp, __restore;
		const props = __props;
		const sampleEmails = [
			"james.anderson@example.com",
			"mia.white@example.com",
			"william.brown@example.com",
			"emma.davis@example.com",
			"ethan.harris@example.com"
		];
		const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("sales", async () => {
			const sales = [];
			const currentDate = /* @__PURE__ */ new Date();
			for (let i = 0; i < 5; i++) {
				const hoursAgo = randomInt(0, 48);
				const date = /* @__PURE__ */ new Date(currentDate.getTime() - hoursAgo * 36e5);
				sales.push({
					id: (4600 - i).toString(),
					date: date.toISOString(),
					status: randomFrom([
						"paid",
						"failed",
						"refunded"
					]),
					email: randomFrom(sampleEmails),
					amount: randomInt(100, 1e3)
				});
			}
			return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		}, {
			watch: [() => props.period, () => props.range],
			default: () => []
		})), __temp = await __temp, __restore(), __temp);
		const columns = [
			{
				accessorKey: "id",
				header: "ID",
				cell: ({ row }) => `#${row.getValue("id")}`
			},
			{
				accessorKey: "date",
				header: "Date",
				cell: ({ row }) => {
					return new Date(row.getValue("date")).toLocaleString("en-US", {
						day: "numeric",
						month: "short",
						hour: "2-digit",
						minute: "2-digit",
						hour12: false
					});
				}
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: ({ row }) => {
					const color = {
						paid: "success",
						failed: "error",
						refunded: "neutral"
					}[row.getValue("status")];
					return h(_sfc_main$a, {
						class: "capitalize",
						variant: "subtle",
						color
					}, () => row.getValue("status"));
				}
			},
			{
				accessorKey: "email",
				header: "Email"
			},
			{
				accessorKey: "amount",
				header: () => h("div", { class: "text-right" }, "Amount"),
				cell: ({ row }) => {
					const amount = Number.parseFloat(row.getValue("amount"));
					const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "EUR"
					}).format(amount);
					return h("div", { class: "text-right font-medium" }, formatted);
				}
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$c, mergeProps({
				data: unref(data),
				columns,
				class: "shrink-0",
				ui: {
					base: "table-fixed border-separate border-spacing-0",
					thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
					tbody: "[&>tr]:last:[&>td]:border-b-0",
					th: "first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
					td: "border-b border-default"
				}
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region app/components/home/HomeSales.vue
var _sfc_setup$1 = HomeSales_vue_vue_type_script_setup_true_lang_default.setup;
HomeSales_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeSales.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var HomeSales_default = Object.assign(HomeSales_vue_vue_type_script_setup_true_lang_default, { __name: "HomeSales" });
//#endregion
//#region app/pages/general/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { isNotificationsSlideoverOpen } = useDashboard();
		const items = [[{
			label: "New mail",
			icon: "i-lucide-send",
			to: "/general/inbox"
		}, {
			label: "New customer",
			icon: "i-lucide-user-plus",
			to: "/general/customers"
		}]];
		const range = shallowRef({
			start: sub(/* @__PURE__ */ new Date(), { days: 14 }),
			end: /* @__PURE__ */ new Date()
		});
		const period = ref("daily");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2$1;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$5;
			const _component_UTooltip = _sfc_main$3;
			const _component_UButton = _sfc_main$7;
			const _component_UChip = _sfc_main$9;
			const _component_UIcon = _sfc_main$2$2;
			const _component_UDropdownMenu = _sfc_main$4;
			const _component_UDashboardToolbar = _sfc_main$6;
			const _component_HomeDateRangePicker = HomeDateRangePicker_default;
			const _component_HomePeriodSelect = HomePeriodSelect_default;
			const _component_HomeStats = HomeStats_default;
			const _component_HomeChart = HomeChart_server_default;
			const _component_HomeSales = HomeSales_default;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "home" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, {
							title: "Home",
							ui: { right: "gap-3" }
						}, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
								else return [createVNode(_component_UDashboardSidebarCollapse)];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UTooltip, {
										text: "Notifications",
										shortcuts: ["N"]
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												color: "neutral",
												variant: "ghost",
												square: "",
												onClick: ($event) => isNotificationsSlideoverOpen.value = true
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UChip, {
														color: "error",
														inset: ""
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_component_UIcon, {
																name: "i-lucide-bell",
																class: "size-5 shrink-0"
															}, null, _parent, _scopeId));
															else return [createVNode(_component_UIcon, {
																name: "i-lucide-bell",
																class: "size-5 shrink-0"
															})];
														}),
														_: 1
													}, _parent, _scopeId));
													else return [createVNode(_component_UChip, {
														color: "error",
														inset: ""
													}, {
														default: withCtx(() => [createVNode(_component_UIcon, {
															name: "i-lucide-bell",
															class: "size-5 shrink-0"
														})]),
														_: 1
													})];
												}),
												_: 1
											}, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												color: "neutral",
												variant: "ghost",
												square: "",
												onClick: ($event) => isNotificationsSlideoverOpen.value = true
											}, {
												default: withCtx(() => [createVNode(_component_UChip, {
													color: "error",
													inset: ""
												}, {
													default: withCtx(() => [createVNode(_component_UIcon, {
														name: "i-lucide-bell",
														class: "size-5 shrink-0"
													})]),
													_: 1
												})]),
												_: 1
											}, 8, ["onClick"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UDropdownMenu, { items }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-plus",
												size: "md",
												class: "rounded-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-plus",
												size: "md",
												class: "rounded-full"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [createVNode(_component_UTooltip, {
									text: "Notifications",
									shortcuts: ["N"]
								}, {
									default: withCtx(() => [createVNode(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										square: "",
										onClick: ($event) => isNotificationsSlideoverOpen.value = true
									}, {
										default: withCtx(() => [createVNode(_component_UChip, {
											color: "error",
											inset: ""
										}, {
											default: withCtx(() => [createVNode(_component_UIcon, {
												name: "i-lucide-bell",
												class: "size-5 shrink-0"
											})]),
											_: 1
										})]),
										_: 1
									}, 8, ["onClick"])]),
									_: 1
								}), createVNode(_component_UDropdownMenu, { items }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-plus",
										size: "md",
										class: "rounded-full"
									})]),
									_: 1
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UDashboardToolbar, null, {
							left: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_HomeDateRangePicker, {
										modelValue: unref(range),
										"onUpdate:modelValue": ($event) => isRef(range) ? range.value = $event : null,
										class: "-ms-1"
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_HomePeriodSelect, {
										modelValue: unref(period),
										"onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null,
										range: unref(range)
									}, null, _parent, _scopeId));
								} else return [createVNode(_component_HomeDateRangePicker, {
									modelValue: unref(range),
									"onUpdate:modelValue": ($event) => isRef(range) ? range.value = $event : null,
									class: "-ms-1"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_HomePeriodSelect, {
									modelValue: unref(period),
									"onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null,
									range: unref(range)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"range"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UDashboardNavbar, {
						title: "Home",
						ui: { right: "gap-3" }
					}, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_UTooltip, {
							text: "Notifications",
							shortcuts: ["N"]
						}, {
							default: withCtx(() => [createVNode(_component_UButton, {
								color: "neutral",
								variant: "ghost",
								square: "",
								onClick: ($event) => isNotificationsSlideoverOpen.value = true
							}, {
								default: withCtx(() => [createVNode(_component_UChip, {
									color: "error",
									inset: ""
								}, {
									default: withCtx(() => [createVNode(_component_UIcon, {
										name: "i-lucide-bell",
										class: "size-5 shrink-0"
									})]),
									_: 1
								})]),
								_: 1
							}, 8, ["onClick"])]),
							_: 1
						}), createVNode(_component_UDropdownMenu, { items }, {
							default: withCtx(() => [createVNode(_component_UButton, {
								icon: "i-lucide-plus",
								size: "md",
								class: "rounded-full"
							})]),
							_: 1
						})]),
						_: 1
					}), createVNode(_component_UDashboardToolbar, null, {
						left: withCtx(() => [createVNode(_component_HomeDateRangePicker, {
							modelValue: unref(range),
							"onUpdate:modelValue": ($event) => isRef(range) ? range.value = $event : null,
							class: "-ms-1"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_HomePeriodSelect, {
							modelValue: unref(period),
							"onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null,
							range: unref(range)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"range"
						])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_HomeStats, {
							period: unref(period),
							range: unref(range)
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_HomeChart, {
							period: unref(period),
							range: unref(range)
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_HomeSales, {
							period: unref(period),
							range: unref(range)
						}, null, _parent, _scopeId));
					} else return [
						createVNode(_component_HomeStats, {
							period: unref(period),
							range: unref(range)
						}, null, 8, ["period", "range"]),
						createVNode(_component_HomeChart, {
							period: unref(period),
							range: unref(range)
						}, null, 8, ["period", "range"]),
						createVNode(_component_HomeSales, {
							period: unref(period),
							range: unref(range)
						}, null, 8, ["period", "range"])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var general_default = index_vue_vue_type_script_setup_true_lang_default;

export { general_default as default };
//# sourceMappingURL=general-CVyPjw99.mjs.map
