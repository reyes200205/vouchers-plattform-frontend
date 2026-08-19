import { aj as useAuth, aM as useToast, aI as useRouter, g as _sfc_main$2$1, h as _sfc_main$7$1, an as useComponentProps, aN as useVModel, ay as useLocale$1, ah as useAppConfig, aw as useForwardProps, a6 as reactivePick, au as useFormField, at as useFieldGroup, ae as tv, aE as usePrimitiveElement, W as isNullish, b as Primitive, O as injectConfigProviderContext, a4 as reactiveComputed, k as createContext, I as getActiveElement, af as unrefElement, l as createEventHook } from '../virtual/entry.mjs';
import { _ as _sfc_main$8, s as snapValueToStep, c as clamp } from './Select-QzRNfVS-.mjs';
import { u as useComposing } from './useComposing-D1bdBmsI.mjs';
import { u as useFormControl } from './useFormControl-BySKHRcT.mjs';
import { u as useKbd } from './useKbd-rvMsbidG.mjs';
import { V as VisuallyHiddenInput_default } from './VisuallyHiddenInput-Ci3tBhR9.mjs';
import { _ as _sfc_main$6 } from './FormField-DOShaxcI.mjs';
import { _ as _sfc_main$5 } from './Badge-B12zNpDE.mjs';
import { _ as _sfc_main$7 } from './Input-3L6phQUN.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$9 } from './DashboardSidebarCollapse-CLHbm061.mjs';
import { _ as _sfc_main$3 } from './Form-DpngGyYw.mjs';
import { _ as _sfc_main$4 } from './Card-qzRCEhtm.mjs';
import { u as useApplications, _ as _sfc_main$1 } from './useApplications-CQjbJLSd.mjs';
import { defineComponent, computed, reactive, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useTemplateRef, toRef, renderSlot, createCommentVNode, toRefs, watch, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import * as z from 'zod';
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
import './PopperArrow-Cwqi64q5.mjs';
import './useTypeahead-5rnQiHGw.mjs';
import './DashboardSidebarToggle-IFhAhKZv.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useLocale.js
/**
* The `useLocale` function provides a way to access the current locale in your application.
* @param {Ref<string | undefined>} [locale] - An optional ref containing the locale.
* @returns A computed ref holding the resolved locale.
*/
function useLocale(locale) {
	const context = injectConfigProviderContext({ locale: ref("en") });
	return computed(() => locale?.value || context.locale?.value || "en");
}
//#endregion
//#region node_modules/.pnpm/@internationalized+number@3.6.6/node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var $1dfb119a85e764e5$var$formatterCache = /* @__PURE__ */ new Map();
var $1dfb119a85e764e5$var$supportsSignDisplay = false;
try {
	$1dfb119a85e764e5$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var $1dfb119a85e764e5$var$supportsUnit = false;
try {
	$1dfb119a85e764e5$var$supportsUnit = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var $1dfb119a85e764e5$var$UNITS = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } };
var $1dfb119a85e764e5$export$cc77c4ff7e8673c5 = class {
	constructor(locale, options = {}) {
		this.numberFormatter = $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options);
		this.options = options;
	}
	/** Formats a number value as a string, according to the locale and options provided to the constructor. */ format(value) {
		let res = "";
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) res = $1dfb119a85e764e5$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
		else res = this.numberFormatter.format(value);
		if (this.options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
			let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
			if (!unit) return res;
			let values = $1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay];
			res += values[locale] || values.default;
		}
		return res;
	}
	/** Formats a number to an array of parts such as separators, digits, punctuation, and more. */ formatToParts(value) {
		return this.numberFormatter.formatToParts(value);
	}
	/** Formats a number range as a string. */ formatRange(start, end) {
		if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		return `${this.format(start)} \u{2013} ${this.format(end)}`;
	}
	/** Formats a number range as an array of parts. */ formatRangeToParts(start, end) {
		if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		let startParts = this.numberFormatter.formatToParts(start);
		let endParts = this.numberFormatter.formatToParts(end);
		return [
			...startParts.map((p) => ({
				...p,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...endParts.map((p) => ({
				...p,
				source: "endRange"
			}))
		];
	}
	/** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
		let options = this.numberFormatter.resolvedOptions();
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) options = {
			...options,
			signDisplay: this.options.signDisplay
		};
		if (!$1dfb119a85e764e5$var$supportsUnit && this.options.style === "unit") options = {
			...options,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		};
		return options;
	}
};
function $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options = {}) {
	let { numberingSystem } = options;
	if (numberingSystem && locale.includes("-nu-")) {
		if (!locale.includes("-u-")) locale += "-u-";
		locale += `-nu-${numberingSystem}`;
	}
	if (options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
		let { unit, unitDisplay = "short" } = options;
		if (!unit) throw new Error("unit option must be provided with style: \"unit\"");
		if (!$1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay]) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
		options = {
			...options,
			style: "decimal"
		};
	}
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($1dfb119a85e764e5$var$formatterCache.has(cacheKey)) return $1dfb119a85e764e5$var$formatterCache.get(cacheKey);
	let numberFormatter = new Intl.NumberFormat(locale, options);
	$1dfb119a85e764e5$var$formatterCache.set(cacheKey, numberFormatter);
	return numberFormatter;
}
function $1dfb119a85e764e5$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
	if (signDisplay === "auto") return numberFormat.format(num);
	else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
	else {
		let needsPositiveSign = false;
		if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
		else if (signDisplay === "exceptZero") if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
		else needsPositiveSign = num > 0;
		if (needsPositiveSign) {
			let negative = numberFormat.format(-num);
			let noSign = numberFormat.format(num);
			let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
			if ([...minus].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
			return negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
		} else return numberFormat.format(num);
	}
}
//#endregion
//#region node_modules/.pnpm/@internationalized+number@3.6.6/node_modules/@internationalized/number/dist/private/NumberParser.mjs
var $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX = /* @__PURE__ */ new RegExp("^.*\\(.*\\).*$");
var $eb76cf4feb040f77$var$NUMBERING_SYSTEMS = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
];
var $eb76cf4feb040f77$export$cd11ab140839f11d = class {
	constructor(locale, options = {}) {
		this.locale = locale;
		this.options = options;
	}
	/**
	* Parses the given string to a number. Returns NaN if a valid number could not be parsed.
	*/ parse(value) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
	}
	/**
	* Returns whether the given string could potentially be a valid number. This should be used to
	* validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
	* of the minus/plus sign characters can be checked.
	*/ isValidPartialNumber(value, minValue, maxValue) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
	}
	/**
	* Returns a numbering system for which the given string is valid in the current locale.
	* If no numbering system could be detected, the default numbering system for the current
	* locale is returned.
	*/ getNumberingSystem(value) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
	}
};
var $eb76cf4feb040f77$var$numberParserCache = /* @__PURE__ */ new Map();
function $eb76cf4feb040f77$var$getNumberParserImpl(locale, options, value) {
	let defaultParser = $eb76cf4feb040f77$var$getCachedNumberParser(locale, options);
	if (!locale.includes("-nu-") && !defaultParser.isValidPartialNumber(value)) {
		for (let numberingSystem of $eb76cf4feb040f77$var$NUMBERING_SYSTEMS) if (numberingSystem !== defaultParser.options.numberingSystem) {
			let parser = $eb76cf4feb040f77$var$getCachedNumberParser(locale + (locale.includes("-u-") ? "-nu-" : "-u-nu-") + numberingSystem, options);
			if (parser.isValidPartialNumber(value)) return parser;
		}
	}
	return defaultParser;
}
function $eb76cf4feb040f77$var$getCachedNumberParser(locale, options) {
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	let parser = $eb76cf4feb040f77$var$numberParserCache.get(cacheKey);
	if (!parser) {
		parser = new $eb76cf4feb040f77$var$NumberParserImpl(locale, options);
		$eb76cf4feb040f77$var$numberParserCache.set(cacheKey, parser);
	}
	return parser;
}
var $eb76cf4feb040f77$var$NumberParserImpl = class {
	constructor(locale, options = {}) {
		this.locale = locale;
		if (options.roundingIncrement !== 1 && options.roundingIncrement != null) {
			if (options.maximumFractionDigits == null && options.minimumFractionDigits == null) {
				options.maximumFractionDigits = 0;
				options.minimumFractionDigits = 0;
			} else if (options.maximumFractionDigits == null) options.maximumFractionDigits = options.minimumFractionDigits;
			else if (options.minimumFractionDigits == null) options.minimumFractionDigits = options.maximumFractionDigits;
		}
		this.formatter = new Intl.NumberFormat(locale, options);
		this.options = this.formatter.resolvedOptions();
		this.symbols = $eb76cf4feb040f77$var$getSymbols(locale, this.formatter, this.options, options);
		if (this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18)) console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
	}
	parse(value) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		let fullySanitizedValue = this.sanitize(value);
		if (!isGroupSymbolAllowed && this.symbols.group && fullySanitizedValue.includes(this.symbols.group)) return NaN;
		else if (this.symbols.group) fullySanitizedValue = fullySanitizedValue.replaceAll(this.symbols.group, "");
		if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, ".");
		if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, "-");
		fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
		if (this.options.style === "percent") {
			let isNegative = fullySanitizedValue.indexOf("-");
			fullySanitizedValue = fullySanitizedValue.replace("-", "");
			fullySanitizedValue = fullySanitizedValue.replace("+", "");
			let index = fullySanitizedValue.indexOf(".");
			if (index === -1) index = fullySanitizedValue.length;
			fullySanitizedValue = fullySanitizedValue.replace(".", "");
			if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
			else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
			else if (index - 2 === -2) fullySanitizedValue = "0.00";
			else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
			if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
		}
		let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
		if (isNaN(newValue)) return NaN;
		if (this.options.style === "percent") {
			let options = {
				...this.options,
				style: "decimal",
				minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
				maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
			};
			return new $eb76cf4feb040f77$export$cd11ab140839f11d(this.locale, options).parse(new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(this.locale, options).format(newValue));
		}
		if (this.options.currencySign === "accounting" && $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
		return newValue;
	}
	sanitize(value) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		if (this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((obj) => obj.unit === value)) return this.symbols.noNumeralUnits.find((obj) => obj.unit === value).value.toString();
		value = value.replace(this.symbols.literals, "");
		if (this.symbols.minusSign) value = value.replace("-", this.symbols.minusSign);
		if (this.options.numberingSystem === "arab") {
			if (this.symbols.decimal) {
				value = $eb76cf4feb040f77$var$replaceAll(value, ",", this.symbols.decimal);
				value = $eb76cf4feb040f77$var$replaceAll(value, String.fromCharCode(1548), this.symbols.decimal);
			}
			if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, ".", this.symbols.group);
		}
		if (this.symbols.group === "’" && value.includes("'") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "'", this.symbols.group);
		if (this.options.locale === "fr-FR" && this.symbols.group && isGroupSymbolAllowed) {
			value = $eb76cf4feb040f77$var$replaceAll(value, " ", this.symbols.group);
			value = $eb76cf4feb040f77$var$replaceAll(value, /\u00A0/g, this.symbols.group);
		}
		return value;
	}
	isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		value = this.sanitize(value);
		if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
		else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
		if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
		if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, this.symbols.group, "");
		value = value.replace(this.symbols.numeral, "");
		if (this.symbols.decimal) value = value.replace(this.symbols.decimal, "");
		return value.length === 0;
	}
};
var $eb76cf4feb040f77$var$nonLiteralParts = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]);
var $eb76cf4feb040f77$var$pluralNumbers = [
	0,
	4,
	2,
	1,
	11,
	20,
	3,
	7,
	100,
	21,
	.1,
	1.1
];
function $eb76cf4feb040f77$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
	let symbolFormatter = new Intl.NumberFormat(locale, {
		...intlOptions,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: true
	});
	let allParts = symbolFormatter.formatToParts(-10000.111);
	let posAllParts = symbolFormatter.formatToParts(10000.111);
	let pluralParts = $eb76cf4feb040f77$var$pluralNumbers.map((n) => symbolFormatter.formatToParts(n));
	let noNumeralUnits = pluralParts.map((p, i) => {
		let unit = p.find((p) => p.type === "unit");
		if (unit && !p.some((p) => p.type === "integer" || p.type === "fraction")) return {
			unit: unit.value,
			value: $eb76cf4feb040f77$var$pluralNumbers[i]
		};
		return null;
	}).filter((p) => !!p);
	let minusSign = allParts.find((p) => p.type === "minusSign")?.value ?? "-";
	let plusSign = posAllParts.find((p) => p.type === "plusSign")?.value;
	if (!plusSign && (originalOptions?.signDisplay === "exceptZero" || originalOptions?.signDisplay === "always")) plusSign = "+";
	let decimal = new Intl.NumberFormat(locale, {
		...intlOptions,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((p) => p.type === "decimal")?.value;
	let group = allParts.find((p) => p.type === "group")?.value;
	let allPartsLiterals = allParts.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value));
	let pluralPartsLiterals = pluralParts.flatMap((p) => p.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value)));
	let sortedLiterals = [.../* @__PURE__ */ new Set([...allPartsLiterals, ...pluralPartsLiterals])].sort((a, b) => b.length - a.length);
	let literals = sortedLiterals.length === 0 ? /* @__PURE__ */ new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${sortedLiterals.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu");
	let numerals = [...new Intl.NumberFormat(intlOptions.locale, { useGrouping: false }).format(9876543210)].reverse();
	let indexes = new Map(numerals.map((d, i) => [d, i]));
	let numeral = new RegExp(`[${numerals.join("")}]`, "g");
	let index = (d) => String(indexes.get(d));
	return {
		minusSign,
		plusSign,
		decimal,
		group,
		literals,
		numeral,
		numerals,
		index,
		noNumeralUnits
	};
}
function $eb76cf4feb040f77$var$replaceAll(str, find, replace) {
	if (str.replaceAll) return str.replaceAll(find, replace);
	return str.split(find).join(replace);
}
function $eb76cf4feb040f77$var$escapeRegex(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function usePressedHold(options) {
	const { disabled } = options;
	ref();
	const triggerHook = createEventHook();
	const isPressed = ref(false);
	computed(() => unrefElement(options.target));
	return {
		isPressed,
		onTrigger: triggerHook.on
	};
}
function useNumberFormatter(locale, options = ref({})) {
	return reactiveComputed(() => new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(locale.value, options.value));
}
function useNumberParser(locale, options = ref({})) {
	return reactiveComputed(() => new $eb76cf4feb040f77$export$cd11ab140839f11d(locale.value, options.value));
}
function handleDecimalOperation(operator, value1, value2) {
	let result = operator === "+" ? value1 + value2 : value1 - value2;
	if (value1 % 1 !== 0 || value2 % 1 !== 0) {
		const value1Decimal = value1.toString().split(".");
		const value2Decimal = value2.toString().split(".");
		const value1DecimalLength = value1Decimal[1] && value1Decimal[1].length || 0;
		const value2DecimalLength = value2Decimal[1] && value2Decimal[1].length || 0;
		const multiplier = 10 ** Math.max(value1DecimalLength, value2DecimalLength);
		value1 = Math.round(value1 * multiplier);
		value2 = Math.round(value2 * multiplier);
		result = operator === "+" ? value1 + value2 : value1 - value2;
		result /= multiplier;
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldRoot.js
var [injectNumberFieldRootContext, provideNumberFieldRootContext] = /*#__PURE__*/ createContext("NumberFieldRoot");
var NumberFieldRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NumberFieldRoot",
	props: {
		defaultValue: {
			type: Number,
			required: false,
			default: void 0
		},
		modelValue: {
			type: [Number, null],
			required: false
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		step: {
			type: Number,
			required: false,
			default: 1
		},
		stepSnapping: {
			type: Boolean,
			required: false,
			default: true
		},
		focusOnChange: {
			type: Boolean,
			required: false,
			default: true
		},
		formatOptions: {
			type: null,
			required: false
		},
		locale: {
			type: String,
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
		disableWheelChange: {
			type: Boolean,
			required: false
		},
		invertWheelChange: {
			type: Boolean,
			required: false
		},
		id: {
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
		const { disabled, readonly, disableWheelChange, invertWheelChange, min, max, step, stepSnapping, formatOptions, id, locale: propLocale } = toRefs(props);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const locale = useLocale(propLocale);
		const isFormControl = useFormControl(currentElement);
		const inputEl = ref();
		const isDecreaseDisabled = computed(() => {
			if (isNullish(modelValue.value) || isNaN(modelValue.value)) return false;
			return getNextValue("decrease", modelValue.value) >= modelValue.value;
		});
		const isIncreaseDisabled = computed(() => {
			if (isNullish(modelValue.value) || isNaN(modelValue.value)) return false;
			return getNextValue("increase", modelValue.value) <= modelValue.value;
		});
		function getNextValue(type, from, multiplier = 1) {
			const stepValue = step.value ?? 1;
			const operator = type === "increase" ? "+" : "-";
			let nextValue;
			if (stepSnapping.value && !isNaN(stepValue)) {
				const snapped = snapValueToStep(from, min.value, max.value, stepValue);
				if (snapped === from) nextValue = handleDecimalOperation(operator, from, stepValue * multiplier);
				else {
					const aligned = type === "increase" ? snapped > from ? snapped : handleDecimalOperation("+", snapped, stepValue) : snapped < from ? snapped : handleDecimalOperation("-", snapped, stepValue);
					nextValue = multiplier > 1 ? handleDecimalOperation(operator, aligned, stepValue * (multiplier - 1)) : aligned;
				}
			} else nextValue = handleDecimalOperation(operator, from, stepValue * multiplier);
			return clampInputValue(nextValue);
		}
		function handleChangingValue(type, multiplier = 1) {
			if (props.focusOnChange) inputEl.value?.focus();
			if (props.disabled || props.readonly) return;
			const currentInputValue = numberParser.parse(inputEl.value?.value ?? "");
			if (isNaN(currentInputValue)) {
				modelValue.value = clampInputValue(min.value ?? 0);
				return;
			}
			modelValue.value = getNextValue(type, currentInputValue, multiplier);
		}
		function handleIncrease(multiplier = 1) {
			handleChangingValue("increase", multiplier);
		}
		function handleDecrease(multiplier = 1) {
			handleChangingValue("decrease", multiplier);
		}
		function handleMinMaxValue(type) {
			if (type === "min" && min.value !== void 0) modelValue.value = clampInputValue(min.value);
			else if (type === "max" && max.value !== void 0) modelValue.value = clampInputValue(max.value);
		}
		const numberFormatter = useNumberFormatter(locale, formatOptions);
		const numberParser = useNumberParser(locale, formatOptions);
		const inputMode = computed(() => {
			return numberFormatter.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric";
		});
		const textValueFormatter = useNumberFormatter(locale, formatOptions);
		const textValue = computed(() => isNullish(modelValue.value) || isNaN(modelValue.value) ? "" : textValueFormatter.format(modelValue.value));
		function validate(val) {
			return numberParser.isValidPartialNumber(val, min.value, max.value);
		}
		function setInputValue(val) {
			if (inputEl.value) inputEl.value.value = val;
		}
		function clampInputValue(val) {
			let clampedValue;
			if (step.value === void 0 || isNaN(step.value) || !stepSnapping.value) clampedValue = clamp(val, min.value, max.value);
			else clampedValue = snapValueToStep(val, min.value, max.value, step.value);
			clampedValue = numberParser.parse(numberFormatter.format(clampedValue));
			return clampedValue;
		}
		function applyInputValue(val) {
			const parsedValue = numberParser.parse(val);
			modelValue.value = isNaN(parsedValue) ? void 0 : clampInputValue(parsedValue);
			if (!val.length) return setInputValue(val);
			if (isNaN(parsedValue)) return setInputValue(textValue.value);
			return setInputValue(textValue.value);
		}
		provideNumberFieldRootContext({
			modelValue,
			handleDecrease,
			handleIncrease,
			handleMinMaxValue,
			inputMode,
			inputEl,
			onInputElement: (el) => inputEl.value = el,
			textValue,
			readonly,
			validate,
			applyInputValue,
			disabled,
			disableWheelChange,
			invertWheelChange,
			max,
			min,
			isDecreaseDisabled,
			isIncreaseDisabled,
			id
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				role: "group",
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-readonly": unref(readonly) ? "" : void 0
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					textValue: textValue.value,
					readonly: unref(readonly)
				}), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					type: "text",
					value: unref(modelValue),
					name: _ctx.name,
					disabled: unref(disabled),
					readonly: unref(readonly),
					required: _ctx.required
				}, null, 8, [
					"value",
					"name",
					"disabled",
					"readonly",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-disabled",
				"data-readonly"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldDecrement.js
var NumberFieldDecrement_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldDecrement",
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
		const rootContext = injectNumberFieldRootContext();
		const isDisabled = computed(() => rootContext.disabled?.value || rootContext.readonly.value || props.disabled || rootContext.isDecreaseDisabled.value);
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const { isPressed, onTrigger } = usePressedHold({
			target: currentElement,
			disabled: isDisabled
		});
		onTrigger(() => {
			rootContext.handleDecrease();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				tabindex: "-1",
				"aria-label": "Decrease",
				type: _ctx.as === "button" ? "button" : void 0,
				style: { userSelect: unref(isPressed) ? "none" : void 0 },
				disabled: isDisabled.value ? "" : void 0,
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-pressed": unref(isPressed) ? "true" : void 0,
				onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"style",
				"disabled",
				"data-disabled",
				"data-pressed"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldIncrement.js
var NumberFieldIncrement_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldIncrement",
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
		const rootContext = injectNumberFieldRootContext();
		const isDisabled = computed(() => rootContext.disabled?.value || rootContext.readonly.value || props.disabled || rootContext.isIncreaseDisabled.value);
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const { isPressed, onTrigger } = usePressedHold({
			target: currentElement,
			disabled: isDisabled
		});
		onTrigger(() => {
			rootContext.handleIncrease();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				tabindex: "-1",
				"aria-label": "Increase",
				type: _ctx.as === "button" ? "button" : void 0,
				style: { userSelect: unref(isPressed) ? "none" : void 0 },
				disabled: isDisabled.value ? "" : void 0,
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-pressed": unref(isPressed) ? "true" : void 0,
				onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"style",
				"disabled",
				"data-disabled",
				"data-pressed"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldInput.js
var NumberFieldInput_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldInput",
	props: {
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
	setup(__props) {
		const props = __props;
		const { primitiveElement} = usePrimitiveElement();
		const rootContext = injectNumberFieldRootContext();
		const kbd = useKbd();
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing();
		function handleKeydown(event) {
			if (isComposing.value || event.isComposing) return;
			switch (event.key) {
				case kbd.ARROW_UP:
					event.preventDefault();
					rootContext.handleIncrease();
					break;
				case kbd.ARROW_DOWN:
					event.preventDefault();
					rootContext.handleDecrease();
					break;
				case kbd.PAGE_UP:
					event.preventDefault();
					rootContext.handleIncrease(10);
					break;
				case kbd.PAGE_DOWN:
					event.preventDefault();
					rootContext.handleDecrease(10);
					break;
				case kbd.HOME:
					event.preventDefault();
					rootContext.handleMinMaxValue("min");
					break;
				case kbd.END:
					event.preventDefault();
					rootContext.handleMinMaxValue("max");
					break;
				case kbd.ENTER: rootContext.applyInputValue(event.target?.value);
			}
		}
		function handleWheelEvent(event) {
			if (rootContext.disableWheelChange.value) return;
			if (event.target !== getActiveElement()) return;
			if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			event.preventDefault();
			if (event.deltaY > 0) rootContext.invertWheelChange.value ? rootContext.handleDecrease() : rootContext.handleIncrease();
			else if (event.deltaY < 0) rootContext.invertWheelChange.value ? rootContext.handleIncrease() : rootContext.handleDecrease();
		}
		const inputValue = ref(rootContext.textValue.value);
		watch(() => rootContext.textValue.value, () => {
			inputValue.value = rootContext.textValue.value;
		}, {
			immediate: true,
			deep: true
		});
		function handleChange() {
			requestAnimationFrame(() => {
				inputValue.value = rootContext.textValue.value;
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).id.value,
				ref_key: "primitiveElement",
				ref: primitiveElement,
				value: inputValue.value,
				role: "spinbutton",
				type: "text",
				tabindex: "0",
				inputmode: unref(rootContext).inputMode.value,
				disabled: unref(rootContext).disabled.value ? "" : void 0,
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				readonly: unref(rootContext).readonly.value ? "" : void 0,
				"data-readonly": unref(rootContext).readonly.value ? "" : void 0,
				autocomplete: "off",
				autocorrect: "off",
				spellcheck: "false",
				"aria-roledescription": "Number field",
				"aria-valuenow": unref(rootContext).modelValue.value,
				"aria-valuemin": unref(rootContext).min.value,
				"aria-valuemax": unref(rootContext).max.value,
				onKeydown: handleKeydown,
				onWheel: handleWheelEvent,
				onBeforeinput: _cache[0] || (_cache[0] = (event) => {
					if (event.isComposing) return;
					const target = event.target;
					let nextValue = target.value.slice(0, target.selectionStart ?? void 0) + (event.data ?? "") + target.value.slice(target.selectionEnd ?? void 0);
					if (!unref(rootContext).validate(nextValue)) event.preventDefault();
				}),
				onInput: _cache[1] || (_cache[1] = (event) => {
					const target = event.target;
					inputValue.value = target.value;
				}),
				onChange: handleChange,
				onBlur: _cache[2] || (_cache[2] = ($event) => unref(rootContext).applyInputValue($event.target?.value)),
				onCompositionstart: unref(handleCompositionStart),
				onCompositionend: unref(handleCompositionEnd)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"value",
				"inputmode",
				"disabled",
				"data-disabled",
				"readonly",
				"data-readonly",
				"aria-valuenow",
				"aria-valuemin",
				"aria-valuemax",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Finput-number.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Finput_number_default = {
	"slots": {
		"root": "relative inline-flex items-center",
		"base": ["w-full rounded-md border-0 placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"increment": "absolute flex items-center",
		"decrement": "absolute flex items-center"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
			},
			"vertical": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
			}
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
		"size": {
			"xs": "px-2 py-1 text-sm/4 gap-1",
			"sm": "px-2.5 py-1.5 text-sm/4 gap-1.5",
			"md": "px-2.5 py-1.5 text-base/5 gap-1.5",
			"lg": "px-3 py-2 text-base/5 gap-2",
			"xl": "px-3 py-2 text-base gap-2"
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent focus:outline-none"
		},
		"disabled": { "true": {
			"increment": "opacity-75 cursor-not-allowed",
			"decrement": "opacity-75 cursor-not-allowed"
		} },
		"orientation": {
			"horizontal": {
				"base": "text-center",
				"increment": "inset-y-0 end-0 pe-1",
				"decrement": "inset-y-0 start-0 ps-1"
			},
			"vertical": {
				"increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
				"decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
			}
		},
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"increment": { "false": "" },
		"decrement": { "false": "" }
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
			"orientation": "horizontal",
			"decrement": false,
			"class": "text-start"
		},
		{
			"decrement": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"decrement": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"decrement": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"decrement": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"decrement": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"increment": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"increment": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"increment": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"increment": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"increment": true,
			"size": "xl",
			"class": "pe-11"
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
		"variant": "outline"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/InputNumber.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UInputNumber",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		placeholder: {
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
		highlight: {
			type: Boolean,
			required: false
		},
		fixed: {
			type: Boolean,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		increment: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		incrementIcon: {
			type: null,
			required: false
		},
		incrementDisabled: {
			type: Boolean,
			required: false
		},
		decrement: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		decrementIcon: {
			type: null,
			required: false
		},
		decrementDisabled: {
			type: Boolean,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
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
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		step: {
			type: Number,
			required: false
		},
		stepSnapping: {
			type: Boolean,
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
		id: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		formatOptions: {
			type: null,
			required: false
		},
		disableWheelChange: {
			type: Boolean,
			required: false
		},
		invertWheelChange: {
			type: Boolean,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false
		},
		focusOnChange: {
			type: Boolean,
			required: false
		},
		locale: {
			type: String,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"blur",
		"change"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const props = useComponentProps("inputNumber", _props);
		const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
		const { t } = useLocale$1();
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "stepSnapping", "formatOptions", "disableWheelChange", "invertWheelChange", "required", "readonly", "focusOnChange", "locale"), emits);
		const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formFieldSize, name, highlight, disabled, ariaAttrs } = useFormField(_props);
		const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
		const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Finput_number_default,
			...appConfig.ui?.inputNumber || {}
		})({
			color: color.value ?? props.color,
			variant: props.variant,
			size: inputSize.value ?? props.size,
			highlight: highlight.value ?? props.highlight,
			fixed: props.fixed,
			orientation: props.orientation,
			fieldGroup: orientation.value,
			increment: props.orientation === "vertical" ? !!props.increment || !!props.decrement : !!props.increment,
			decrement: props.orientation === "vertical" ? false : !!props.decrement
		}));
		const incrementIcon = computed(() => props.incrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp));
		const decrementIcon = computed(() => props.decrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown));
		const inputRef = useTemplateRef("inputRef");
		function onUpdate(value) {
			if (props.modelModifiers?.optional) modelValue.value = value = value ?? void 0;
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
		}
		function onBlur(event) {
			emitFormBlur();
			emits("blur", event);
		}
		__expose({ inputRef: toRef(() => inputRef.value?.$el) });
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(NumberFieldRoot_default), mergeProps(unref(rootProps), {
				id: unref(id),
				"default-value": unref(props).defaultValue,
				"model-value": unref(modelValue),
				min: unref(props).min,
				max: unref(props).max,
				step: unref(props).step,
				"data-slot": _ctx.$attrs["data-slot"] ?? "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }),
				name: unref(name),
				disabled: unref(disabled),
				"onUpdate:modelValue": (val) => onUpdate(val)
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(NumberFieldInput_default), mergeProps({
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, {
							ref_key: "inputRef",
							ref: inputRef,
							placeholder: unref(props).placeholder,
							required: unref(props).required,
							"data-slot": "base",
							class: ui.value.base({ class: unref(props).ui?.base }),
							onBlur,
							onFocus: unref(emitFormFocus)
						}), null, _parent, _scopeId));
						if (!!unref(props).increment) {
							_push(`<div data-slot="increment" class="${ssrRenderClass(ui.value.increment({ class: unref(props).ui?.increment }))}"${_scopeId}>`);
							_push(ssrRenderComponent(unref(NumberFieldIncrement_default), {
								"as-child": "",
								disabled: unref(disabled) || unref(props).incrementDisabled
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, "increment", {}, () => {
										_push(ssrRenderComponent(_sfc_main$7$1, mergeProps({
											icon: incrementIcon.value,
											color: unref(color),
											size: inputSize.value,
											variant: "link",
											"aria-label": unref(t)("inputNumber.increment")
										}, typeof unref(props).increment === "object" ? unref(props).increment : void 0), null, _parent, _scopeId));
									}, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, "increment", {}, () => [createVNode(_sfc_main$7$1, mergeProps({
										icon: incrementIcon.value,
										color: unref(color),
										size: inputSize.value,
										variant: "link",
										"aria-label": unref(t)("inputNumber.increment")
									}, typeof unref(props).increment === "object" ? unref(props).increment : void 0), null, 16, [
										"icon",
										"color",
										"size",
										"aria-label"
									])])];
								}),
								_: 3
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						if (!!unref(props).decrement) {
							_push(`<div data-slot="decrement" class="${ssrRenderClass(ui.value.decrement({ class: unref(props).ui?.decrement }))}"${_scopeId}>`);
							_push(ssrRenderComponent(unref(NumberFieldDecrement_default), {
								"as-child": "",
								disabled: unref(disabled) || unref(props).decrementDisabled
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, "decrement", {}, () => {
										_push(ssrRenderComponent(_sfc_main$7$1, mergeProps({
											icon: decrementIcon.value,
											color: unref(color),
											size: inputSize.value,
											variant: "link",
											"aria-label": unref(t)("inputNumber.decrement")
										}, typeof unref(props).decrement === "object" ? unref(props).decrement : void 0), null, _parent, _scopeId));
									}, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, "decrement", {}, () => [createVNode(_sfc_main$7$1, mergeProps({
										icon: decrementIcon.value,
										color: unref(color),
										size: inputSize.value,
										variant: "link",
										"aria-label": unref(t)("inputNumber.decrement")
									}, typeof unref(props).decrement === "object" ? unref(props).decrement : void 0), null, 16, [
										"icon",
										"color",
										"size",
										"aria-label"
									])])];
								}),
								_: 3
							}, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [
						createVNode(unref(NumberFieldInput_default), mergeProps({
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, {
							ref_key: "inputRef",
							ref: inputRef,
							placeholder: unref(props).placeholder,
							required: unref(props).required,
							"data-slot": "base",
							class: ui.value.base({ class: unref(props).ui?.base }),
							onBlur,
							onFocus: unref(emitFormFocus)
						}), null, 16, [
							"placeholder",
							"required",
							"class",
							"onFocus"
						]),
						!!unref(props).increment ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "increment",
							class: ui.value.increment({ class: unref(props).ui?.increment })
						}, [createVNode(unref(NumberFieldIncrement_default), {
							"as-child": "",
							disabled: unref(disabled) || unref(props).incrementDisabled
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "increment", {}, () => [createVNode(_sfc_main$7$1, mergeProps({
								icon: incrementIcon.value,
								color: unref(color),
								size: inputSize.value,
								variant: "link",
								"aria-label": unref(t)("inputNumber.increment")
							}, typeof unref(props).increment === "object" ? unref(props).increment : void 0), null, 16, [
								"icon",
								"color",
								"size",
								"aria-label"
							])])]),
							_: 3
						}, 8, ["disabled"])], 2)) : createCommentVNode("", true),
						!!unref(props).decrement ? (openBlock(), createBlock("div", {
							key: 1,
							"data-slot": "decrement",
							class: ui.value.decrement({ class: unref(props).ui?.decrement })
						}, [createVNode(unref(NumberFieldDecrement_default), {
							"as-child": "",
							disabled: unref(disabled) || unref(props).decrementDisabled
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "decrement", {}, () => [createVNode(_sfc_main$7$1, mergeProps({
								icon: decrementIcon.value,
								color: unref(color),
								size: inputSize.value,
								variant: "link",
								"aria-label": unref(t)("inputNumber.decrement")
							}, typeof unref(props).decrement === "object" ? unref(props).decrement : void 0), null, 16, [
								"icon",
								"color",
								"size",
								"aria-label"
							])])]),
							_: 3
						}, 8, ["disabled"])], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/InputNumber.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/registro-verificacion/new.vue?vue&type=script&setup=true&lang.ts
var new_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new",
	__ssrInlineRender: true,
	setup(__props) {
		const { roleCode, user } = useAuth();
		const isCoordinator = computed(() => roleCode.value === "coordinator");
		const { createApplication } = useApplications();
		const toast = useToast();
		const router = useRouter();
		const coordinatorRole = computed(() => user.value?.roles?.find((r) => r.code === "coordinator") ?? null);
		const coordinatorBranchId = computed(() => coordinatorRole.value?.branch_id ?? null);
		const coordinatorBranchName = computed(() => coordinatorRole.value?.branch_name ?? null);
		const schema = z.object({
			branch_id: z.number({ error: "Tu usuario no tiene una sucursal asignada" }),
			first_name: z.string().min(2, "Muy corto"),
			middle_name: z.string().optional(),
			last_name: z.string().min(2, "Muy corto"),
			second_last_name: z.string().optional(),
			gender: z.string().optional(),
			birth_date: z.string().optional(),
			curp: z.string().optional(),
			rfc: z.string().optional(),
			home_phone: z.string().optional(),
			mobile_phone: z.string().optional(),
			email: z.union([z.string().email("Correo inválido"), z.literal("")]).optional(),
			street: z.string().optional(),
			external_number: z.string().optional(),
			neighborhood: z.string().optional(),
			city: z.string().optional(),
			state: z.string().optional(),
			postal_code: z.string().optional(),
			notes: z.string().optional(),
			requested_credit_limit: z.number({ error: "Captura el límite de crédito solicitado" }).min(1e3, "El límite de crédito solicitado debe ser de al menos $1,000"),
			applicant_age: z.number({ error: "Captura la edad del solicitante" }).min(18, "El solicitante debe ser mayor de edad (18 años o más)"),
			occupation_type: z.string().optional(),
			occupation_place: z.string().optional(),
			occupation_position: z.string().optional(),
			occupation_phone: z.string().optional(),
			occupation_years: z.number().optional(),
			housing_ownership_type: z.string().optional(),
			housing_dimensions: z.string().optional(),
			housing_years: z.number().optional(),
			work_reference_name: z.string().optional(),
			work_reference_phone: z.string().optional()
		});
		const state = reactive({
			branch_id: coordinatorBranchId.value ?? void 0,
			first_name: "",
			middle_name: "",
			last_name: "",
			second_last_name: "",
			gender: void 0,
			birth_date: "",
			curp: "",
			rfc: "",
			home_phone: "",
			mobile_phone: "",
			email: "",
			street: "",
			external_number: "",
			neighborhood: "",
			city: "",
			state: "",
			postal_code: "",
			notes: "",
			requested_credit_limit: void 0,
			applicant_age: void 0,
			occupation_type: void 0,
			occupation_place: "",
			occupation_position: "",
			occupation_phone: "",
			occupation_years: void 0,
			housing_ownership_type: void 0,
			housing_dimensions: "",
			housing_years: void 0,
			work_reference_name: "",
			work_reference_phone: ""
		});
		const familyMembers = ref([{
			name: "",
			relationship: "",
			phone: "",
			age: void 0
		}]);
		function addFamilyMember() {
			familyMembers.value.push({
				name: "",
				relationship: "",
				phone: "",
				age: void 0
			});
		}
		function removeFamilyMember(index) {
			familyMembers.value.splice(index, 1);
		}
		const vehicles = ref([]);
		function addVehicle() {
			vehicles.value.push({
				brand: "",
				model: "",
				year: "",
				plates: ""
			});
		}
		function removeVehicle(index) {
			vehicles.value.splice(index, 1);
		}
		const documentFields = [
			{
				key: "id_front",
				label: "INE (frontal)"
			},
			{
				key: "id_back",
				label: "INE (reverso)"
			},
			{
				key: "proof_of_address",
				label: "Comprobante de domicilio"
			}
		];
		const submitting = ref(false);
		async function onSubmit(event) {
			submitting.value = true;
			const data = event.data;
			try {
				const application = await createApplication({
					branch_id: data.branch_id,
					person: {
						first_name: data.first_name,
						middle_name: data.middle_name || void 0,
						last_name: data.last_name,
						second_last_name: data.second_last_name || void 0,
						gender: data.gender || void 0,
						birth_date: data.birth_date || void 0,
						curp: data.curp || void 0,
						rfc: data.rfc || void 0,
						home_phone: data.home_phone || void 0,
						mobile_phone: data.mobile_phone || void 0,
						email: data.email || void 0,
						street: data.street || void 0,
						external_number: data.external_number || void 0,
						neighborhood: data.neighborhood || void 0,
						city: data.city || void 0,
						state: data.state || void 0,
						postal_code: data.postal_code || void 0,
						notes: data.notes || void 0
					},
					family_data: {
						members: familyMembers.value.filter((m) => m.name || m.relationship || m.phone || m.age).map((m) => ({
							name: m.name || null,
							relationship: m.relationship || null,
							phone: m.phone || null,
							age: m.age ?? null
						})),
						applicant_age: data.applicant_age ?? null,
						occupation: {
							type: data.occupation_type || null,
							place_name: data.occupation_place || null,
							position: data.occupation_position || null,
							phone: data.occupation_phone || null,
							years: data.occupation_years ?? null
						},
						housing: {
							ownership_type: data.housing_ownership_type || null,
							dimensions: data.housing_dimensions || null,
							years_at_address: data.housing_years ?? null,
							work_reference: {
								name: data.work_reference_name || null,
								phone: data.work_reference_phone || null
							}
						}
					},
					vehicles: vehicles.value.filter((v) => v.brand || v.model || v.year || v.plates).map((v) => ({
						brand: v.brand || null,
						model: v.model || null,
						year: v.year || null,
						plates: v.plates || null
					})),
					requested_credit_limit: data.requested_credit_limit ?? null,
					id_front_path: null,
					id_back_path: null,
					proof_of_address_path: null
				});
				toast.add({
					title: "Solicitud registrada",
					description: `La solicitud #${application.id} fue enviada a revisión.`,
					color: "success"
				});
				await router.push("/registro-verificacion/list");
			} catch (e) {
				console.error(e);
				toast.add({
					title: "Error",
					description: "No se pudo registrar la solicitud. Verifica los datos e intenta de nuevo.",
					color: "error"
				});
			} finally {
				submitting.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$9;
			const _component_UAlert = _sfc_main$1;
			const _component_UForm = _sfc_main$3;
			const _component_UCard = _sfc_main$4;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UBadge = _sfc_main$5;
			const _component_UFormField = _sfc_main$6;
			const _component_UInput = _sfc_main$7;
			const _component_USelect = _sfc_main$8;
			const _component_UButton = _sfc_main$7$1;
			const _component_UInputNumber = _sfc_main;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "register-distributors-new" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Alta de Distribuidor" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Alta de Distribuidor" }, {
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
							description: "Solo el rol Coordinador puede registrar nuevas solicitudes de distribuidora."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else if (!unref(coordinatorBranchId)) {
						_push(`<div class="p-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAlert, {
							color: "warning",
							variant: "subtle",
							icon: "i-lucide-triangle-alert",
							title: "Sin sucursal asignada",
							description: "Tu usuario coordinador no tiene una sucursal asignada. Contacta a un gerente para que te asigne una antes de registrar solicitudes."
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else _push(ssrRenderComponent(_component_UForm, {
						id: "new-application",
						schema: unref(schema),
						state: unref(state),
						class: "p-6 space-y-6 max-w-4xl",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Sucursal </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Sucursal ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-center gap-2 text-sm"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UIcon, {
												name: "i-lucide-building-2",
												class: "size-4 text-dimmed"
											}, null, _parent, _scopeId));
											_push(`<span class="font-medium"${_scopeId}>${ssrInterpolate(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`)}</span>`);
											_push(ssrRenderComponent(_component_UBadge, {
												color: "neutral",
												variant: "subtle",
												size: "sm"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(` Tu sucursal asignada `);
													else return [createTextVNode(" Tu sucursal asignada ")];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
											createVNode(_component_UIcon, {
												name: "i-lucide-building-2",
												class: "size-4 text-dimmed"
											}),
											createVNode("span", { class: "font-medium" }, toDisplayString(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`), 1),
											createVNode(_component_UBadge, {
												color: "neutral",
												variant: "subtle",
												size: "sm"
											}, {
												default: withCtx(() => [createTextVNode(" Tu sucursal asignada ")]),
												_: 1
											})
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Datos Personales del Solicitante </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Datos Personales del Solicitante ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Nombre(s)",
												name: "first_name",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).first_name,
														"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).first_name,
														"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Segundo nombre",
												name: "middle_name"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).middle_name,
														"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).middle_name,
														"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Apellido paterno",
												name: "last_name",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).last_name,
														"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).last_name,
														"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Apellido materno",
												name: "second_last_name"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).second_last_name,
														"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).second_last_name,
														"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Género",
												name: "gender"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_USelect, {
														modelValue: unref(state).gender,
														"onUpdate:modelValue": ($event) => unref(state).gender = $event,
														items: [
															{
																label: "Masculino",
																value: "M"
															},
															{
																label: "Femenino",
																value: "F"
															},
															{
																label: "Otro",
																value: "OTHER"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_USelect, {
														modelValue: unref(state).gender,
														"onUpdate:modelValue": ($event) => unref(state).gender = $event,
														items: [
															{
																label: "Masculino",
																value: "M"
															},
															{
																label: "Femenino",
																value: "F"
															},
															{
																label: "Otro",
																value: "OTHER"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Fecha de nacimiento",
												name: "birth_date"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).birth_date,
														"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
														type: "date",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).birth_date,
														"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
														type: "date",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "CURP",
												name: "curp"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).curp,
														"onUpdate:modelValue": ($event) => unref(state).curp = $event,
														class: "w-full",
														maxlength: "18"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).curp,
														"onUpdate:modelValue": ($event) => unref(state).curp = $event,
														class: "w-full",
														maxlength: "18"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "RFC",
												name: "rfc"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).rfc,
														"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
														class: "w-full",
														maxlength: "13"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).rfc,
														"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
														class: "w-full",
														maxlength: "13"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Teléfono fijo",
												name: "home_phone"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).home_phone,
														"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).home_phone,
														"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Teléfono móvil",
												name: "mobile_phone"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).mobile_phone,
														"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).mobile_phone,
														"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Correo electrónico",
												name: "email"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).email,
														"onUpdate:modelValue": ($event) => unref(state).email = $event,
														type: "email",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).email,
														"onUpdate:modelValue": ($event) => unref(state).email = $event,
														type: "email",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Nombre(s)",
												name: "first_name",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).first_name,
													"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Segundo nombre",
												name: "middle_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).middle_name,
													"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Apellido paterno",
												name: "last_name",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).last_name,
													"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Apellido materno",
												name: "second_last_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).second_last_name,
													"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Género",
												name: "gender"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).gender,
													"onUpdate:modelValue": ($event) => unref(state).gender = $event,
													items: [
														{
															label: "Masculino",
															value: "M"
														},
														{
															label: "Femenino",
															value: "F"
														},
														{
															label: "Otro",
															value: "OTHER"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Fecha de nacimiento",
												name: "birth_date"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).birth_date,
													"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
													type: "date",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "CURP",
												name: "curp"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).curp,
													"onUpdate:modelValue": ($event) => unref(state).curp = $event,
													class: "w-full",
													maxlength: "18"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "RFC",
												name: "rfc"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).rfc,
													"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
													class: "w-full",
													maxlength: "13"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Teléfono fijo",
												name: "home_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).home_phone,
													"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Teléfono móvil",
												name: "mobile_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).mobile_phone,
													"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Correo electrónico",
												name: "email"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).email,
													"onUpdate:modelValue": ($event) => unref(state).email = $event,
													type: "email",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Domicilio </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Domicilio ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Calle",
												name: "street"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).street,
														"onUpdate:modelValue": ($event) => unref(state).street = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).street,
														"onUpdate:modelValue": ($event) => unref(state).street = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Número exterior",
												name: "external_number"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).external_number,
														"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).external_number,
														"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Colonia",
												name: "neighborhood"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).neighborhood,
														"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).neighborhood,
														"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Ciudad",
												name: "city"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).city,
														"onUpdate:modelValue": ($event) => unref(state).city = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).city,
														"onUpdate:modelValue": ($event) => unref(state).city = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Estado",
												name: "state"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).state,
														"onUpdate:modelValue": ($event) => unref(state).state = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).state,
														"onUpdate:modelValue": ($event) => unref(state).state = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Código postal",
												name: "postal_code"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).postal_code,
														"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).postal_code,
														"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Calle",
												name: "street"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).street,
													"onUpdate:modelValue": ($event) => unref(state).street = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Número exterior",
												name: "external_number"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).external_number,
													"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Colonia",
												name: "neighborhood"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).neighborhood,
													"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Ciudad",
												name: "city"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).city,
													"onUpdate:modelValue": ($event) => unref(state).city = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Estado",
												name: "state"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).state,
													"onUpdate:modelValue": ($event) => unref(state).state = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Código postal",
												name: "postal_code"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).postal_code,
													"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-base"${_scopeId}> Familiares y Cónyuge </h3>`);
											_push(ssrRenderComponent(_component_UButton, {
												label: "Agregar familiar",
												icon: "i-lucide-plus",
												size: "xs",
												variant: "subtle",
												onClick: addFamilyMember
											}, null, _parent, _scopeId));
											_push(`</div>`);
										} else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Familiares y Cónyuge "), createVNode(_component_UButton, {
											label: "Agregar familiar",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addFamilyMember
										})])];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
											ssrRenderList(unref(familyMembers), (member, index) => {
												_push(`<div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, {
													label: "Nombre",
													class: "md:col-span-2"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: member.name,
															"onUpdate:modelValue": ($event) => member.name = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: member.name,
															"onUpdate:modelValue": ($event) => member.name = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Parentesco" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: member.relationship,
															"onUpdate:modelValue": ($event) => member.relationship = $event,
															placeholder: "Esposo(a), padre, hijo(a)...",
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: member.relationship,
															"onUpdate:modelValue": ($event) => member.relationship = $event,
															placeholder: "Esposo(a), padre, hijo(a)...",
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UFormField, { label: "Teléfono" }, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															modelValue: member.phone,
															"onUpdate:modelValue": ($event) => member.phone = $event,
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															modelValue: member.phone,
															"onUpdate:modelValue": ($event) => member.phone = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(`<div class="flex items-end gap-2"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UFormField, {
													label: "Edad",
													class: "flex-1"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
															modelValue: member.age,
															"onUpdate:modelValue": ($event) => member.age = $event,
															class: "w-full",
															min: 0
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInputNumber, {
															modelValue: member.age,
															"onUpdate:modelValue": ($event) => member.age = $event,
															class: "w-full",
															min: 0
														}, null, 8, ["modelValue", "onUpdate:modelValue"])];
													}),
													_: 2
												}, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(familyMembers).length === 1,
													onClick: ($event) => removeFamilyMember(index)
												}, null, _parent, _scopeId));
												_push(`</div></div>`);
											});
											_push(`<!--]--></div>`);
										} else return [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
											}, [
												createVNode(_component_UFormField, {
													label: "Nombre",
													class: "md:col-span-2"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: member.name,
														"onUpdate:modelValue": ($event) => member.name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Parentesco" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: member.relationship,
														"onUpdate:modelValue": ($event) => member.relationship = $event,
														placeholder: "Esposo(a), padre, hijo(a)...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Teléfono" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: member.phone,
														"onUpdate:modelValue": ($event) => member.phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode("div", { class: "flex items-end gap-2" }, [createVNode(_component_UFormField, {
													label: "Edad",
													class: "flex-1"
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: member.age,
														"onUpdate:modelValue": ($event) => member.age = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024), createVNode(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													disabled: unref(familyMembers).length === 1,
													onClick: ($event) => removeFamilyMember(index)
												}, null, 8, ["disabled", "onClick"])])
											]);
										}), 128))])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Datos Adicionales para la Distribuidora </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Datos Adicionales para la Distribuidora ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(`<div class="space-y-6"${_scopeId}><div${_scopeId}><h4 class="text-sm font-semibold text-dimmed mb-3"${_scopeId}> Ocupación </h4><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Edad del solicitante",
												name: "applicant_age",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
														modelValue: unref(state).applicant_age,
														"onUpdate:modelValue": ($event) => unref(state).applicant_age = $event,
														class: "w-full",
														min: 0
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInputNumber, {
														modelValue: unref(state).applicant_age,
														"onUpdate:modelValue": ($event) => unref(state).applicant_age = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Trabaja o estudia",
												name: "occupation_type"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_USelect, {
														modelValue: unref(state).occupation_type,
														"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
														items: [
															{
																label: "Trabaja",
																value: "trabaja"
															},
															{
																label: "Estudia",
																value: "estudia"
															},
															{
																label: "Otro",
																value: "otro"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_USelect, {
														modelValue: unref(state).occupation_type,
														"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
														items: [
															{
																label: "Trabaja",
																value: "trabaja"
															},
															{
																label: "Estudia",
																value: "estudia"
															},
															{
																label: "Otro",
																value: "otro"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Nombre del trabajo o escuela",
												name: "occupation_place"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).occupation_place,
														"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).occupation_place,
														"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Puesto o grado",
												name: "occupation_position"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).occupation_position,
														"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).occupation_position,
														"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Teléfono del trabajo o escuela",
												name: "occupation_phone"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).occupation_phone,
														"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).occupation_phone,
														"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Antigüedad (años)",
												name: "occupation_years"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
														modelValue: unref(state).occupation_years,
														"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
														class: "w-full",
														min: 0
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInputNumber, {
														modelValue: unref(state).occupation_years,
														"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div></div><div${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h4 class="text-sm font-semibold text-dimmed"${_scopeId}> Vehículos (si tiene) </h4>`);
											_push(ssrRenderComponent(_component_UButton, {
												label: "Agregar vehículo",
												icon: "i-lucide-plus",
												size: "xs",
												variant: "subtle",
												onClick: addVehicle
											}, null, _parent, _scopeId));
											_push(`</div>`);
											if (!unref(vehicles).length) _push(`<div class="text-sm text-dimmed"${_scopeId}> El solicitante no tiene vehículos registrados. </div>`);
											else {
												_push(`<div class="space-y-3"${_scopeId}><!--[-->`);
												ssrRenderList(unref(vehicles), (vehicle, index) => {
													_push(`<div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"${_scopeId}>`);
													_push(ssrRenderComponent(_component_UFormField, { label: "Marca" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_component_UInput, {
																modelValue: vehicle.brand,
																"onUpdate:modelValue": ($event) => vehicle.brand = $event,
																class: "w-full"
															}, null, _parent, _scopeId));
															else return [createVNode(_component_UInput, {
																modelValue: vehicle.brand,
																"onUpdate:modelValue": ($event) => vehicle.brand = $event,
																class: "w-full"
															}, null, 8, ["modelValue", "onUpdate:modelValue"])];
														}),
														_: 2
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_UFormField, { label: "Modelo" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_component_UInput, {
																modelValue: vehicle.model,
																"onUpdate:modelValue": ($event) => vehicle.model = $event,
																class: "w-full"
															}, null, _parent, _scopeId));
															else return [createVNode(_component_UInput, {
																modelValue: vehicle.model,
																"onUpdate:modelValue": ($event) => vehicle.model = $event,
																class: "w-full"
															}, null, 8, ["modelValue", "onUpdate:modelValue"])];
														}),
														_: 2
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_UFormField, { label: "Año" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_component_UInput, {
																modelValue: vehicle.year,
																"onUpdate:modelValue": ($event) => vehicle.year = $event,
																class: "w-full"
															}, null, _parent, _scopeId));
															else return [createVNode(_component_UInput, {
																modelValue: vehicle.year,
																"onUpdate:modelValue": ($event) => vehicle.year = $event,
																class: "w-full"
															}, null, 8, ["modelValue", "onUpdate:modelValue"])];
														}),
														_: 2
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_UFormField, { label: "Placas" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(_component_UInput, {
																modelValue: vehicle.plates,
																"onUpdate:modelValue": ($event) => vehicle.plates = $event,
																class: "w-full"
															}, null, _parent, _scopeId));
															else return [createVNode(_component_UInput, {
																modelValue: vehicle.plates,
																"onUpdate:modelValue": ($event) => vehicle.plates = $event,
																class: "w-full"
															}, null, 8, ["modelValue", "onUpdate:modelValue"])];
														}),
														_: 2
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_UButton, {
														icon: "i-lucide-trash",
														color: "error",
														variant: "ghost",
														onClick: ($event) => removeVehicle(index)
													}, null, _parent, _scopeId));
													_push(`</div>`);
												});
												_push(`<!--]--></div>`);
											}
											_push(`</div><div${_scopeId}><h4 class="text-sm font-semibold text-dimmed mb-3"${_scopeId}> Vivienda </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Tenencia de la vivienda",
												name: "housing_ownership_type"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_USelect, {
														modelValue: unref(state).housing_ownership_type,
														"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
														items: [
															{
																label: "Propia",
																value: "propia"
															},
															{
																label: "Rentada",
																value: "rentada"
															},
															{
																label: "Propia (en proceso de liquidar)",
																value: "liquidandola"
															},
															{
																label: "Infonavit",
																value: "infonavit"
															},
															{
																label: "Crédito bancario",
																value: "credito_bancario"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_USelect, {
														modelValue: unref(state).housing_ownership_type,
														"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
														items: [
															{
																label: "Propia",
																value: "propia"
															},
															{
																label: "Rentada",
																value: "rentada"
															},
															{
																label: "Propia (en proceso de liquidar)",
																value: "liquidandola"
															},
															{
																label: "Infonavit",
																value: "infonavit"
															},
															{
																label: "Crédito bancario",
																value: "credito_bancario"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Años viviendo en el domicilio",
												name: "housing_years"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
														modelValue: unref(state).housing_years,
														"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
														class: "w-full",
														min: 0
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInputNumber, {
														modelValue: unref(state).housing_years,
														"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Dimensiones de la vivienda",
												name: "housing_dimensions"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).housing_dimensions,
														"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
														placeholder: "Ej. 120 m²",
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).housing_dimensions,
														"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
														placeholder: "Ej. 120 m²",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`<div${_scopeId}></div>`);
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Referencia laboral — nombre",
												name: "work_reference_name"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).work_reference_name,
														"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).work_reference_name,
														"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Referencia laboral — teléfono",
												name: "work_reference_phone"
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: unref(state).work_reference_phone,
														"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
														class: "w-full"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: unref(state).work_reference_phone,
														"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(`</div></div></div>`);
										} else return [createVNode("div", { class: "space-y-6" }, [
											createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
												createVNode(_component_UFormField, {
													label: "Edad del solicitante",
													name: "applicant_age",
													required: ""
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: unref(state).applicant_age,
														"onUpdate:modelValue": ($event) => unref(state).applicant_age = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Trabaja o estudia",
													name: "occupation_type"
												}, {
													default: withCtx(() => [createVNode(_component_USelect, {
														modelValue: unref(state).occupation_type,
														"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
														items: [
															{
																label: "Trabaja",
																value: "trabaja"
															},
															{
																label: "Estudia",
																value: "estudia"
															},
															{
																label: "Otro",
																value: "otro"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Nombre del trabajo o escuela",
													name: "occupation_place"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).occupation_place,
														"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Puesto o grado",
													name: "occupation_position"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).occupation_position,
														"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Teléfono del trabajo o escuela",
													name: "occupation_phone"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).occupation_phone,
														"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Antigüedad (años)",
													name: "occupation_years"
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: unref(state).occupation_years,
														"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												})
											])]),
											createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-dimmed" }, " Vehículos (si tiene) "), createVNode(_component_UButton, {
												label: "Agregar vehículo",
												icon: "i-lucide-plus",
												size: "xs",
												variant: "subtle",
												onClick: addVehicle
											})]), !unref(vehicles).length ? (openBlock(), createBlock("div", {
												key: 0,
												class: "text-sm text-dimmed"
											}, " El solicitante no tiene vehículos registrados. ")) : (openBlock(), createBlock("div", {
												key: 1,
												class: "space-y-3"
											}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(vehicles), (vehicle, index) => {
												return openBlock(), createBlock("div", {
													key: index,
													class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
												}, [
													createVNode(_component_UFormField, { label: "Marca" }, {
														default: withCtx(() => [createVNode(_component_UInput, {
															modelValue: vehicle.brand,
															"onUpdate:modelValue": ($event) => vehicle.brand = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
														_: 2
													}, 1024),
													createVNode(_component_UFormField, { label: "Modelo" }, {
														default: withCtx(() => [createVNode(_component_UInput, {
															modelValue: vehicle.model,
															"onUpdate:modelValue": ($event) => vehicle.model = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
														_: 2
													}, 1024),
													createVNode(_component_UFormField, { label: "Año" }, {
														default: withCtx(() => [createVNode(_component_UInput, {
															modelValue: vehicle.year,
															"onUpdate:modelValue": ($event) => vehicle.year = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
														_: 2
													}, 1024),
													createVNode(_component_UFormField, { label: "Placas" }, {
														default: withCtx(() => [createVNode(_component_UInput, {
															modelValue: vehicle.plates,
															"onUpdate:modelValue": ($event) => vehicle.plates = $event,
															class: "w-full"
														}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
														_: 2
													}, 1024),
													createVNode(_component_UButton, {
														icon: "i-lucide-trash",
														color: "error",
														variant: "ghost",
														onClick: ($event) => removeVehicle(index)
													}, null, 8, ["onClick"])
												]);
											}), 128))]))]),
											createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Vivienda "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
												createVNode(_component_UFormField, {
													label: "Tenencia de la vivienda",
													name: "housing_ownership_type"
												}, {
													default: withCtx(() => [createVNode(_component_USelect, {
														modelValue: unref(state).housing_ownership_type,
														"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
														items: [
															{
																label: "Propia",
																value: "propia"
															},
															{
																label: "Rentada",
																value: "rentada"
															},
															{
																label: "Propia (en proceso de liquidar)",
																value: "liquidandola"
															},
															{
																label: "Infonavit",
																value: "infonavit"
															},
															{
																label: "Crédito bancario",
																value: "credito_bancario"
															}
														],
														placeholder: "Selecciona...",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Años viviendo en el domicilio",
													name: "housing_years"
												}, {
													default: withCtx(() => [createVNode(_component_UInputNumber, {
														modelValue: unref(state).housing_years,
														"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
														class: "w-full",
														min: 0
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Dimensiones de la vivienda",
													name: "housing_dimensions"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).housing_dimensions,
														"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
														placeholder: "Ej. 120 m²",
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode("div"),
												createVNode(_component_UFormField, {
													label: "Referencia laboral — nombre",
													name: "work_reference_name"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).work_reference_name,
														"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												}),
												createVNode(_component_UFormField, {
													label: "Referencia laboral — teléfono",
													name: "work_reference_phone"
												}, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: unref(state).work_reference_phone,
														"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 1
												})
											])])
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Límite Solicitado </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Límite Solicitado ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UFormField, {
											label: "Límite de crédito solicitado",
											name: "requested_credit_limit",
											required: ""
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_UInputNumber, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													class: "w-full max-w-sm",
													min: 1e3,
													step: 100
												}, null, _parent, _scopeId));
												else return [createVNode(_component_UInputNumber, {
													modelValue: unref(state).requested_credit_limit,
													"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
													class: "w-full max-w-sm",
													min: 1e3,
													step: 100
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										else return [createVNode(_component_UFormField, {
											label: "Límite de crédito solicitado",
											name: "requested_credit_limit",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).requested_credit_limit,
												"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
												class: "w-full max-w-sm",
												min: 1e3,
												step: 100
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UCard, null, {
									header: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<h3 class="font-semibold text-base"${_scopeId}> Documentos Escaneados </h3>`);
										else return [createVNode("h3", { class: "font-semibold text-base" }, " Documentos Escaneados ")];
									}),
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_UAlert, {
												color: "neutral",
												variant: "subtle",
												icon: "i-lucide-info",
												title: "Subida de archivos pendiente",
												description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
												class: "mb-4"
											}, null, _parent, _scopeId));
											_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
											ssrRenderList(documentFields, (doc) => {
												_push(ssrRenderComponent(_component_UFormField, {
													key: doc.key,
													label: doc.label
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) _push(ssrRenderComponent(_component_UInput, {
															type: "file",
															disabled: "",
															class: "w-full"
														}, null, _parent, _scopeId));
														else return [createVNode(_component_UInput, {
															type: "file",
															disabled: "",
															class: "w-full"
														})];
													}),
													_: 2
												}, _parent, _scopeId));
											});
											_push(`<!--]--></div>`);
										} else return [createVNode(_component_UAlert, {
											color: "neutral",
											variant: "subtle",
											icon: "i-lucide-info",
											title: "Subida de archivos pendiente",
											description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
											class: "mb-4"
										}), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [(openBlock(), createBlock(Fragment, null, renderList(documentFields, (doc) => {
											return createVNode(_component_UFormField, {
												key: doc.key,
												label: doc.label
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													type: "file",
													disabled: "",
													class: "w-full"
												})]),
												_: 1
											}, 8, ["label"]);
										}), 64))])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									to: "/registro-verificacion"
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Registrar Solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Sucursal ")]),
									default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
										createVNode(_component_UIcon, {
											name: "i-lucide-building-2",
											class: "size-4 text-dimmed"
										}),
										createVNode("span", { class: "font-medium" }, toDisplayString(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`), 1),
										createVNode(_component_UBadge, {
											color: "neutral",
											variant: "subtle",
											size: "sm"
										}, {
											default: withCtx(() => [createTextVNode(" Tu sucursal asignada ")]),
											_: 1
										})
									])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Personales del Solicitante ")]),
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Nombre(s)",
											name: "first_name",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).first_name,
												"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Segundo nombre",
											name: "middle_name"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).middle_name,
												"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Apellido paterno",
											name: "last_name",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).last_name,
												"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Apellido materno",
											name: "second_last_name"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).second_last_name,
												"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Género",
											name: "gender"
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(state).gender,
												"onUpdate:modelValue": ($event) => unref(state).gender = $event,
												items: [
													{
														label: "Masculino",
														value: "M"
													},
													{
														label: "Femenino",
														value: "F"
													},
													{
														label: "Otro",
														value: "OTHER"
													}
												],
												placeholder: "Selecciona...",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Fecha de nacimiento",
											name: "birth_date"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).birth_date,
												"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
												type: "date",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "CURP",
											name: "curp"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).curp,
												"onUpdate:modelValue": ($event) => unref(state).curp = $event,
												class: "w-full",
												maxlength: "18"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "RFC",
											name: "rfc"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).rfc,
												"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
												class: "w-full",
												maxlength: "13"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Teléfono fijo",
											name: "home_phone"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).home_phone,
												"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Teléfono móvil",
											name: "mobile_phone"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).mobile_phone,
												"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Correo electrónico",
											name: "email"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).email,
												"onUpdate:modelValue": ($event) => unref(state).email = $event,
												type: "email",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Domicilio ")]),
									default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Calle",
											name: "street"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).street,
												"onUpdate:modelValue": ($event) => unref(state).street = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Número exterior",
											name: "external_number"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).external_number,
												"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Colonia",
											name: "neighborhood"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).neighborhood,
												"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Ciudad",
											name: "city"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).city,
												"onUpdate:modelValue": ($event) => unref(state).city = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Estado",
											name: "state"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).state,
												"onUpdate:modelValue": ($event) => unref(state).state = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Código postal",
											name: "postal_code"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).postal_code,
												"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Familiares y Cónyuge "), createVNode(_component_UButton, {
										label: "Agregar familiar",
										icon: "i-lucide-plus",
										size: "xs",
										variant: "subtle",
										onClick: addFamilyMember
									})])]),
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
										return openBlock(), createBlock("div", {
											key: index,
											class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
										}, [
											createVNode(_component_UFormField, {
												label: "Nombre",
												class: "md:col-span-2"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: member.name,
													"onUpdate:modelValue": ($event) => member.name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Parentesco" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: member.relationship,
													"onUpdate:modelValue": ($event) => member.relationship = $event,
													placeholder: "Esposo(a), padre, hijo(a)...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Teléfono" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: member.phone,
													"onUpdate:modelValue": ($event) => member.phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode("div", { class: "flex items-end gap-2" }, [createVNode(_component_UFormField, {
												label: "Edad",
												class: "flex-1"
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: member.age,
													"onUpdate:modelValue": ($event) => member.age = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024), createVNode(_component_UButton, {
												icon: "i-lucide-trash",
												color: "error",
												variant: "ghost",
												disabled: unref(familyMembers).length === 1,
												onClick: ($event) => removeFamilyMember(index)
											}, null, 8, ["disabled", "onClick"])])
										]);
									}), 128))])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Adicionales para la Distribuidora ")]),
									default: withCtx(() => [createVNode("div", { class: "space-y-6" }, [
										createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Edad del solicitante",
												name: "applicant_age",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).applicant_age,
													"onUpdate:modelValue": ($event) => unref(state).applicant_age = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Trabaja o estudia",
												name: "occupation_type"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).occupation_type,
													"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
													items: [
														{
															label: "Trabaja",
															value: "trabaja"
														},
														{
															label: "Estudia",
															value: "estudia"
														},
														{
															label: "Otro",
															value: "otro"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Nombre del trabajo o escuela",
												name: "occupation_place"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_place,
													"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Puesto o grado",
												name: "occupation_position"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_position,
													"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Teléfono del trabajo o escuela",
												name: "occupation_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).occupation_phone,
													"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Antigüedad (años)",
												name: "occupation_years"
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).occupation_years,
													"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])]),
										createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-dimmed" }, " Vehículos (si tiene) "), createVNode(_component_UButton, {
											label: "Agregar vehículo",
											icon: "i-lucide-plus",
											size: "xs",
											variant: "subtle",
											onClick: addVehicle
										})]), !unref(vehicles).length ? (openBlock(), createBlock("div", {
											key: 0,
											class: "text-sm text-dimmed"
										}, " El solicitante no tiene vehículos registrados. ")) : (openBlock(), createBlock("div", {
											key: 1,
											class: "space-y-3"
										}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(vehicles), (vehicle, index) => {
											return openBlock(), createBlock("div", {
												key: index,
												class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
											}, [
												createVNode(_component_UFormField, { label: "Marca" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.brand,
														"onUpdate:modelValue": ($event) => vehicle.brand = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Modelo" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.model,
														"onUpdate:modelValue": ($event) => vehicle.model = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Año" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.year,
														"onUpdate:modelValue": ($event) => vehicle.year = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UFormField, { label: "Placas" }, {
													default: withCtx(() => [createVNode(_component_UInput, {
														modelValue: vehicle.plates,
														"onUpdate:modelValue": ($event) => vehicle.plates = $event,
														class: "w-full"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
													_: 2
												}, 1024),
												createVNode(_component_UButton, {
													icon: "i-lucide-trash",
													color: "error",
													variant: "ghost",
													onClick: ($event) => removeVehicle(index)
												}, null, 8, ["onClick"])
											]);
										}), 128))]))]),
										createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Vivienda "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
											createVNode(_component_UFormField, {
												label: "Tenencia de la vivienda",
												name: "housing_ownership_type"
											}, {
												default: withCtx(() => [createVNode(_component_USelect, {
													modelValue: unref(state).housing_ownership_type,
													"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
													items: [
														{
															label: "Propia",
															value: "propia"
														},
														{
															label: "Rentada",
															value: "rentada"
														},
														{
															label: "Propia (en proceso de liquidar)",
															value: "liquidandola"
														},
														{
															label: "Infonavit",
															value: "infonavit"
														},
														{
															label: "Crédito bancario",
															value: "credito_bancario"
														}
													],
													placeholder: "Selecciona...",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Años viviendo en el domicilio",
												name: "housing_years"
											}, {
												default: withCtx(() => [createVNode(_component_UInputNumber, {
													modelValue: unref(state).housing_years,
													"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
													class: "w-full",
													min: 0
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Dimensiones de la vivienda",
												name: "housing_dimensions"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).housing_dimensions,
													"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
													placeholder: "Ej. 120 m²",
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode("div"),
											createVNode(_component_UFormField, {
												label: "Referencia laboral — nombre",
												name: "work_reference_name"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).work_reference_name,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Referencia laboral — teléfono",
												name: "work_reference_phone"
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: unref(state).work_reference_phone,
													"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											})
										])])
									])]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Límite Solicitado ")]),
									default: withCtx(() => [createVNode(_component_UFormField, {
										label: "Límite de crédito solicitado",
										name: "requested_credit_limit",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInputNumber, {
											modelValue: unref(state).requested_credit_limit,
											"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
											class: "w-full max-w-sm",
											min: 1e3,
											step: 100
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})]),
									_: 1
								}),
								createVNode(_component_UCard, null, {
									header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Documentos Escaneados ")]),
									default: withCtx(() => [createVNode(_component_UAlert, {
										color: "neutral",
										variant: "subtle",
										icon: "i-lucide-info",
										title: "Subida de archivos pendiente",
										description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
										class: "mb-4"
									}), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [(openBlock(), createBlock(Fragment, null, renderList(documentFields, (doc) => {
										return createVNode(_component_UFormField, {
											key: doc.key,
											label: doc.label
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												type: "file",
												disabled: "",
												class: "w-full"
											})]),
											_: 1
										}, 8, ["label"]);
									}), 64))])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									to: "/registro-verificacion"
								}), createVNode(_component_UButton, {
									label: "Registrar Solicitud",
									color: "primary",
									variant: "solid",
									type: "submit",
									loading: unref(submitting)
								}, null, 8, ["loading"])])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [!unref(isCoordinator) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-lock",
						title: "Acceso restringido",
						description: "Solo el rol Coordinador puede registrar nuevas solicitudes de distribuidora."
					})])) : !unref(coordinatorBranchId) ? (openBlock(), createBlock("div", {
						key: 1,
						class: "p-6"
					}, [createVNode(_component_UAlert, {
						color: "warning",
						variant: "subtle",
						icon: "i-lucide-triangle-alert",
						title: "Sin sucursal asignada",
						description: "Tu usuario coordinador no tiene una sucursal asignada. Contacta a un gerente para que te asigne una antes de registrar solicitudes."
					})])) : (openBlock(), createBlock(_component_UForm, {
						key: 2,
						id: "new-application",
						schema: unref(schema),
						state: unref(state),
						class: "p-6 space-y-6 max-w-4xl",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Sucursal ")]),
								default: withCtx(() => [createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
									createVNode(_component_UIcon, {
										name: "i-lucide-building-2",
										class: "size-4 text-dimmed"
									}),
									createVNode("span", { class: "font-medium" }, toDisplayString(unref(coordinatorBranchName) ?? `Sucursal #${unref(coordinatorBranchId)}`), 1),
									createVNode(_component_UBadge, {
										color: "neutral",
										variant: "subtle",
										size: "sm"
									}, {
										default: withCtx(() => [createTextVNode(" Tu sucursal asignada ")]),
										_: 1
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Personales del Solicitante ")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
									createVNode(_component_UFormField, {
										label: "Nombre(s)",
										name: "first_name",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).first_name,
											"onUpdate:modelValue": ($event) => unref(state).first_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Segundo nombre",
										name: "middle_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).middle_name,
											"onUpdate:modelValue": ($event) => unref(state).middle_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Apellido paterno",
										name: "last_name",
										required: ""
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).last_name,
											"onUpdate:modelValue": ($event) => unref(state).last_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Apellido materno",
										name: "second_last_name"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).second_last_name,
											"onUpdate:modelValue": ($event) => unref(state).second_last_name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Género",
										name: "gender"
									}, {
										default: withCtx(() => [createVNode(_component_USelect, {
											modelValue: unref(state).gender,
											"onUpdate:modelValue": ($event) => unref(state).gender = $event,
											items: [
												{
													label: "Masculino",
													value: "M"
												},
												{
													label: "Femenino",
													value: "F"
												},
												{
													label: "Otro",
													value: "OTHER"
												}
											],
											placeholder: "Selecciona...",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Fecha de nacimiento",
										name: "birth_date"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).birth_date,
											"onUpdate:modelValue": ($event) => unref(state).birth_date = $event,
											type: "date",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "CURP",
										name: "curp"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).curp,
											"onUpdate:modelValue": ($event) => unref(state).curp = $event,
											class: "w-full",
											maxlength: "18"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "RFC",
										name: "rfc"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).rfc,
											"onUpdate:modelValue": ($event) => unref(state).rfc = $event,
											class: "w-full",
											maxlength: "13"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Teléfono fijo",
										name: "home_phone"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).home_phone,
											"onUpdate:modelValue": ($event) => unref(state).home_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Teléfono móvil",
										name: "mobile_phone"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).mobile_phone,
											"onUpdate:modelValue": ($event) => unref(state).mobile_phone = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Correo electrónico",
										name: "email"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).email,
											"onUpdate:modelValue": ($event) => unref(state).email = $event,
											type: "email",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Domicilio ")]),
								default: withCtx(() => [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
									createVNode(_component_UFormField, {
										label: "Calle",
										name: "street"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).street,
											"onUpdate:modelValue": ($event) => unref(state).street = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Número exterior",
										name: "external_number"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).external_number,
											"onUpdate:modelValue": ($event) => unref(state).external_number = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Colonia",
										name: "neighborhood"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).neighborhood,
											"onUpdate:modelValue": ($event) => unref(state).neighborhood = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Ciudad",
										name: "city"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).city,
											"onUpdate:modelValue": ($event) => unref(state).city = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Estado",
										name: "state"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).state,
											"onUpdate:modelValue": ($event) => unref(state).state = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_UFormField, {
										label: "Código postal",
										name: "postal_code"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(state).postal_code,
											"onUpdate:modelValue": ($event) => unref(state).postal_code = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("h3", { class: "font-semibold text-base" }, " Familiares y Cónyuge "), createVNode(_component_UButton, {
									label: "Agregar familiar",
									icon: "i-lucide-plus",
									size: "xs",
									variant: "subtle",
									onClick: addFamilyMember
								})])]),
								default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [(openBlock(true), createBlock(Fragment, null, renderList(unref(familyMembers), (member, index) => {
									return openBlock(), createBlock("div", {
										key: index,
										class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
									}, [
										createVNode(_component_UFormField, {
											label: "Nombre",
											class: "md:col-span-2"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: member.name,
												"onUpdate:modelValue": ($event) => member.name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Parentesco" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: member.relationship,
												"onUpdate:modelValue": ($event) => member.relationship = $event,
												placeholder: "Esposo(a), padre, hijo(a)...",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode(_component_UFormField, { label: "Teléfono" }, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: member.phone,
												"onUpdate:modelValue": ($event) => member.phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024),
										createVNode("div", { class: "flex items-end gap-2" }, [createVNode(_component_UFormField, {
											label: "Edad",
											class: "flex-1"
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: member.age,
												"onUpdate:modelValue": ($event) => member.age = $event,
												class: "w-full",
												min: 0
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 2
										}, 1024), createVNode(_component_UButton, {
											icon: "i-lucide-trash",
											color: "error",
											variant: "ghost",
											disabled: unref(familyMembers).length === 1,
											onClick: ($event) => removeFamilyMember(index)
										}, null, 8, ["disabled", "onClick"])])
									]);
								}), 128))])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Datos Adicionales para la Distribuidora ")]),
								default: withCtx(() => [createVNode("div", { class: "space-y-6" }, [
									createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Ocupación "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Edad del solicitante",
											name: "applicant_age",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).applicant_age,
												"onUpdate:modelValue": ($event) => unref(state).applicant_age = $event,
												class: "w-full",
												min: 0
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Trabaja o estudia",
											name: "occupation_type"
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(state).occupation_type,
												"onUpdate:modelValue": ($event) => unref(state).occupation_type = $event,
												items: [
													{
														label: "Trabaja",
														value: "trabaja"
													},
													{
														label: "Estudia",
														value: "estudia"
													},
													{
														label: "Otro",
														value: "otro"
													}
												],
												placeholder: "Selecciona...",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Nombre del trabajo o escuela",
											name: "occupation_place"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).occupation_place,
												"onUpdate:modelValue": ($event) => unref(state).occupation_place = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Puesto o grado",
											name: "occupation_position"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).occupation_position,
												"onUpdate:modelValue": ($event) => unref(state).occupation_position = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Teléfono del trabajo o escuela",
											name: "occupation_phone"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).occupation_phone,
												"onUpdate:modelValue": ($event) => unref(state).occupation_phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Antigüedad (años)",
											name: "occupation_years"
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).occupation_years,
												"onUpdate:modelValue": ($event) => unref(state).occupation_years = $event,
												class: "w-full",
												min: 0
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])]),
									createVNode("div", null, [createVNode("div", { class: "flex items-center justify-between mb-3" }, [createVNode("h4", { class: "text-sm font-semibold text-dimmed" }, " Vehículos (si tiene) "), createVNode(_component_UButton, {
										label: "Agregar vehículo",
										icon: "i-lucide-plus",
										size: "xs",
										variant: "subtle",
										onClick: addVehicle
									})]), !unref(vehicles).length ? (openBlock(), createBlock("div", {
										key: 0,
										class: "text-sm text-dimmed"
									}, " El solicitante no tiene vehículos registrados. ")) : (openBlock(), createBlock("div", {
										key: 1,
										class: "space-y-3"
									}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(vehicles), (vehicle, index) => {
										return openBlock(), createBlock("div", {
											key: index,
											class: "grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
										}, [
											createVNode(_component_UFormField, { label: "Marca" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: vehicle.brand,
													"onUpdate:modelValue": ($event) => vehicle.brand = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Modelo" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: vehicle.model,
													"onUpdate:modelValue": ($event) => vehicle.model = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Año" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: vehicle.year,
													"onUpdate:modelValue": ($event) => vehicle.year = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UFormField, { label: "Placas" }, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: vehicle.plates,
													"onUpdate:modelValue": ($event) => vehicle.plates = $event,
													class: "w-full"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 2
											}, 1024),
											createVNode(_component_UButton, {
												icon: "i-lucide-trash",
												color: "error",
												variant: "ghost",
												onClick: ($event) => removeVehicle(index)
											}, null, 8, ["onClick"])
										]);
									}), 128))]))]),
									createVNode("div", null, [createVNode("h4", { class: "text-sm font-semibold text-dimmed mb-3" }, " Vivienda "), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
										createVNode(_component_UFormField, {
											label: "Tenencia de la vivienda",
											name: "housing_ownership_type"
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(state).housing_ownership_type,
												"onUpdate:modelValue": ($event) => unref(state).housing_ownership_type = $event,
												items: [
													{
														label: "Propia",
														value: "propia"
													},
													{
														label: "Rentada",
														value: "rentada"
													},
													{
														label: "Propia (en proceso de liquidar)",
														value: "liquidandola"
													},
													{
														label: "Infonavit",
														value: "infonavit"
													},
													{
														label: "Crédito bancario",
														value: "credito_bancario"
													}
												],
												placeholder: "Selecciona...",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Años viviendo en el domicilio",
											name: "housing_years"
										}, {
											default: withCtx(() => [createVNode(_component_UInputNumber, {
												modelValue: unref(state).housing_years,
												"onUpdate:modelValue": ($event) => unref(state).housing_years = $event,
												class: "w-full",
												min: 0
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Dimensiones de la vivienda",
											name: "housing_dimensions"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).housing_dimensions,
												"onUpdate:modelValue": ($event) => unref(state).housing_dimensions = $event,
												placeholder: "Ej. 120 m²",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode("div"),
										createVNode(_component_UFormField, {
											label: "Referencia laboral — nombre",
											name: "work_reference_name"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).work_reference_name,
												"onUpdate:modelValue": ($event) => unref(state).work_reference_name = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Referencia laboral — teléfono",
											name: "work_reference_phone"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(state).work_reference_phone,
												"onUpdate:modelValue": ($event) => unref(state).work_reference_phone = $event,
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									])])
								])]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Límite Solicitado ")]),
								default: withCtx(() => [createVNode(_component_UFormField, {
									label: "Límite de crédito solicitado",
									name: "requested_credit_limit",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInputNumber, {
										modelValue: unref(state).requested_credit_limit,
										"onUpdate:modelValue": ($event) => unref(state).requested_credit_limit = $event,
										class: "w-full max-w-sm",
										min: 1e3,
										step: 100
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								_: 1
							}),
							createVNode(_component_UCard, null, {
								header: withCtx(() => [createVNode("h3", { class: "font-semibold text-base" }, " Documentos Escaneados ")]),
								default: withCtx(() => [createVNode(_component_UAlert, {
									color: "neutral",
									variant: "subtle",
									icon: "i-lucide-info",
									title: "Subida de archivos pendiente",
									description: "El backend aún no expone un endpoint para subir archivos. Estos campos se habilitarán cuando esté disponible; por ahora la solicitud se envía sin documentos adjuntos.",
									class: "mb-4"
								}), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [(openBlock(), createBlock(Fragment, null, renderList(documentFields, (doc) => {
									return createVNode(_component_UFormField, {
										key: doc.key,
										label: doc.label
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											type: "file",
											disabled: "",
											class: "w-full"
										})]),
										_: 1
									}, 8, ["label"]);
								}), 64))])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								to: "/registro-verificacion"
							}), createVNode(_component_UButton, {
								label: "Registrar Solicitud",
								color: "primary",
								variant: "solid",
								type: "submit",
								loading: unref(submitting)
							}, null, 8, ["loading"])])
						]),
						_: 1
					}, 8, ["schema", "state"]))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/registro-verificacion/new.vue
var _sfc_setup = new_vue_vue_type_script_setup_true_lang_default.setup;
new_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/registro-verificacion/new.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var new_default = new_vue_vue_type_script_setup_true_lang_default;

export { new_default as default };
//# sourceMappingURL=new-BGfYQ16p.mjs.map
