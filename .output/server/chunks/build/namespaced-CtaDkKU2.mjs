import { av as useForwardExpose, P as Presence_default, T as Teleport_default, b as Primitive, aN as useVModel, l as createContext, ax as useForwardProps$1, aa as syncRef, a7 as refAutoReset, af as unrefElement, ac as tryOnBeforeUnmount, aE as usePrimitiveElement, aq as useEmitAsProps, a5 as reactiveOmit, K as getActiveElement, a as AUTOFOCUS_ON_UNMOUNT, v as focus, q as createSharedComposable, R as injectConfigProviderContext, A as AUTOFOCUS_ON_MOUNT, w as focusFirst$2, O as getTabbableCandidates, E as EVENT_OPTIONS$1, Q as getTabbableEdges, ak as useCollection, n as createGlobalState, as as useEventListener } from '../virtual/entry.mjs';
import { a as PopperArrow_default, e as useForwardPropsEmits, P as PopperAnchor_default, d as PopperRoot_default, g as useId$1, u as useDirection, f as useGraceArea, D as DismissableLayer_default, c as PopperContent_default, b as PopperContentPropsDefaultValue } from './Kbd-DXBnE17j.mjs';
import { defineComponent, openBlock, createBlock, unref, normalizeProps, guardReactiveProps, withCtx, renderSlot, createVNode, mergeProps, toRefs, ref, resolveDynamicComponent, isRef, withKeys, nextTick, watchEffect, withModifiers, watch, computed, watchSyncEffect, reactive, mergeDefaults, createTextVNode, toDisplayString, createElementVNode } from 'vue';
import { toCalendar, today, getLocalTimeZone, isToday, isSameMonth, isSameDay, isEqualDay, CalendarDate, getDayOfWeek, startOfWeek, endOfYear, startOfYear, DateFormatter, createCalendar, CalendarDateTime, endOfMonth, isEqualMonth, ZonedDateTime, startOfMonth } from '@internationalized/date';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useArrowNavigation.js
var ignoredElement = ["INPUT", "TEXTAREA"];
/**
* Allow arrow navigation for every html element with data-reka-collection-item tag
*
* @param e               Keyboard event
* @param currentElement  Event initiator element or any element that wants to handle the navigation
* @param parentElement   Parent element where contains all the collection items, this will collect every item to be used when nav
* @param options         further options
* @returns               the navigated html element or null if none
*/
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
	if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
	const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
	const [right, left, up, down, home, end] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	];
	const goingVertical = up || down;
	const goingHorizontal = right || left;
	if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
	const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
	if (!allCollectionItems.length) return null;
	if (preventScroll) e.preventDefault();
	let item = null;
	if (goingHorizontal || goingVertical) item = findNextFocusableElement(allCollectionItems, currentElement, {
		goForward: goingVertical ? down : dir === "ltr" ? right : left,
		loop
	});
	else if (home) item = allCollectionItems.at(0) || null;
	else if (end) item = allCollectionItems.at(-1) || null;
	if (focus) item?.focus();
	return item;
}
/**
* Recursive function to find the next focusable element to avoid disabled elements
*
* @param elements Elements to navigate
* @param currentElement Current active element
* @param options
* @returns next focusable element
*/
function findNextFocusableElement(elements, currentElement, options, iterations = !elements.includes(currentElement) ? elements.length + 1 : elements.length) {
	if (--iterations === 0) return null;
	const index = elements.indexOf(currentElement);
	let newIndex;
	if (index === -1) newIndex = options.goForward ? 0 : elements.length - 1;
	else newIndex = options.goForward ? index + 1 : index - 1;
	if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
	const candidate = elements[(newIndex + elements.length) % elements.length];
	if (!candidate) return null;
	if (candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false") return findNextFocusableElement(elements, candidate, options, iterations);
	return candidate;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useBodyScrollLock.js
var useBodyLockStackCount = createSharedComposable(() => {
	const map = ref(/* @__PURE__ */ new Map());
	ref();
	const locked = computed(() => {
		for (const value of map.value.values()) if (value) return true;
		return false;
	});
	injectConfigProviderContext({ scrollBody: ref(true) });
	watch(locked, (val, oldVal) => {}, {
		immediate: true,
		flush: "sync"
	});
	return map;
});
function useBodyScrollLock(initialState) {
	const id = Math.random().toString(36).substring(2, 7);
	const map = useBodyLockStackCount();
	map.value.set(id, initialState ?? false);
	const locked = computed({
		get: () => map.value.get(id) ?? false,
		set: (value) => map.value.set(id, value)
	});
	tryOnBeforeUnmount();
	return locked;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function useComposing(onEnd) {
	const isComposing = ref(false);
	function handleCompositionStart() {
		isComposing.value = true;
	}
	function handleCompositionEnd(event) {
		nextTick(() => {
			isComposing.value = false;
			onEnd?.(event);
		});
	}
	return {
		isComposing,
		handleCompositionStart,
		handleCompositionEnd
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/date/comparators.js
/**
* Given a `DateValue` object, convert it to a native `Date` object.
* If a timezone is provided, the date will be converted to that timezone.
* If no timezone is provided, the date will be converted to the local timezone.
*/
function toDate(dateValue, tz = getLocalTimeZone()) {
	if (isZonedDateTime(dateValue)) return dateValue.toDate();
	else return dateValue.toDate(tz);
}
function isCalendarDateTime(dateValue) {
	return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
	return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
	return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
/**
* Given a date, return the number of days in the month.
*/
function getDaysInMonth(date) {
	if (date instanceof Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		/**
		* By using zero as the day, we get the
		* last day of the previous month, which
		* is the month we originally passed in.
		*/
		return new Date(year, month, 0).getDate();
	} else return date.set({ day: 100 }).day;
}
/**
* Determine if a date is before the reference date.
* @param dateToCompare - is this date before the `referenceDate`
* @param referenceDate - is the `dateToCompare` before this date
*
* @see {@link isBeforeOrSame} for inclusive
*/
function isBefore(dateToCompare, referenceDate) {
	return dateToCompare.compare(referenceDate) < 0;
}
/**
* Determine if a date is after the reference date.
* @param dateToCompare - is this date after the `referenceDate`
* @param referenceDate - is the `dateToCompare` after this date
*
* @see {@link isAfterOrSame} for inclusive
*/
function isAfter(dateToCompare, referenceDate) {
	return dateToCompare.compare(referenceDate) > 0;
}
/**
* Determine if a date is before or the same as the reference date.
*
* @param dateToCompare - the date to compare
* @param referenceDate - the reference date to make the comparison against
*
* @see {@link isBefore} for non-inclusive
*/
function isBeforeOrSame(dateToCompare, referenceDate) {
	return dateToCompare.compare(referenceDate) <= 0;
}
/**
* Determine if a date is after or the same as the reference date.
*
* @param dateToCompare - is this date after or the same as the `referenceDate`
* @param referenceDate - is the `dateToCompare` after or the same as this date
*
* @see {@link isAfter} for non-inclusive
*/
function isAfterOrSame(dateToCompare, referenceDate) {
	return dateToCompare.compare(referenceDate) >= 0;
}
/**
* Determine if a date is inclusively between a start and end reference date.
*
* @param date - is this date inclusively between the `start` and `end` dates
* @param start - the start reference date to make the comparison against
* @param end - the end reference date to make the comparison against
*
* @see {@link isBetween} for non-inclusive
*/
function isBetweenInclusive(date, start, end) {
	return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}
/**
* Determine if a date is between a start and end reference date.
*
* @param date - is this date between the `start` and `end` dates
* @param start - the start reference date to make the comparison against
* @param end - the end reference date to make the comparison against
*
* @see {@link isBetweenInclusive} for inclusive
*/
function isBetween(date, start, end) {
	return isAfter(date, start) && isBefore(date, end);
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
	/**
	* "firstDayOfWeek" is fixed to 0(Sunday) to avoid confusion regarding locales.
	* This also aligns with other date libraries, e.g., date-fns.
	*
	* #see https://github.com/unovue/reka-ui/issues/2157
	*/
	const day = getDayOfWeek(date, locale, "sun");
	if (firstDayOfWeek > day) return date.subtract({ days: day + 7 - firstDayOfWeek });
	if (firstDayOfWeek === day) return date;
	return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
	/**
	* "firstDayOfWeek" is fixed to 0(Sunday) to avoid confusion regarding locales.
	* This also aligns with other date libraries, e.g., date-fns.
	*
	* #see https://github.com/unovue/reka-ui/issues/2157
	*/
	const day = getDayOfWeek(date, locale, "sun");
	const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
	if (day === lastDayOfWeek) return date;
	if (day > lastDayOfWeek) return date.add({ days: 7 - day + lastDayOfWeek });
	return date.add({ days: lastDayOfWeek - day });
}
/**
* Check if two dates are in the same year and month.
*/
function isSameYearMonth(a, b) {
	return a.year === b.year && a.month === b.month;
}
/**
* Check if two dates are in the same year.
*/
function isSameYear(a, b) {
	return a.year === b.year;
}
function areAllDaysBetweenValid(start, end, isUnavailable, isDisabled, isHighlightable) {
	if (isUnavailable === void 0 && isDisabled === void 0 && isHighlightable === void 0) return true;
	let dCurrent = start.add({ days: 1 });
	if ((isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) && !isHighlightable?.(dCurrent)) return false;
	const dEnd = end;
	while (dCurrent.compare(dEnd) < 0) {
		dCurrent = dCurrent.add({ days: 1 });
		if ((isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) && !isHighlightable?.(dCurrent)) return false;
	}
	return true;
}
/**
* Compare two dates by year and month only (ignoring day).
*/
function compareYearMonth(a, b) {
	if (a.year !== b.year) return a.year - b.year;
	return a.month - b.month;
}
/**
* Check if a date's month is between start and end (inclusive), comparing year+month only.
*/
function isMonthBetweenInclusive(date, start, end) {
	return compareYearMonth(date, start) >= 0 && compareYearMonth(date, end) <= 0;
}
/**
* Check if a date's year is between start and end (inclusive), comparing year only.
*/
function isYearBetweenInclusive(date, start, end) {
	return date.year >= start.year && date.year <= end.year;
}
/**
* Get the number of months between two dates (inclusive).
*/
function getMonthsBetween(start, end) {
	return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}
/**
* Get the number of years between two dates (inclusive).
*/
function getYearsBetween(start, end) {
	return end.year - start.year + 1;
}
/**
* Check if all months between start and end are valid (not unavailable/disabled).
*/
function areAllMonthsBetweenValid(start, end, isUnavailable, isDisabled) {
	if (isUnavailable === void 0 && isDisabled === void 0) return true;
	let current = start.set({ day: 1 });
	const endMonth = end.set({ day: 1 });
	while (compareYearMonth(current, endMonth) <= 0) {
		if (isDisabled?.(current) || isUnavailable?.(current)) return false;
		current = current.add({ months: 1 });
	}
	return true;
}
/**
* Check if all years between start and end are valid (not unavailable/disabled).
*/
function areAllYearsBetweenValid(start, end, isUnavailable, isDisabled) {
	if (isUnavailable === void 0 && isDisabled === void 0) return true;
	let current = start.set({
		day: 1,
		month: 1
	});
	const endYear = end.set({
		day: 1,
		month: 1
	});
	while (current.year <= endYear.year) {
		if (isDisabled?.(current) || isUnavailable?.(current)) return false;
		current = current.add({ years: 1 });
	}
	return true;
}
/**
* A helper function used throughout the various date builders
* to generate a default `DateValue` using the `defaultValue`,
* `defaultPlaceholder`, and `granularity` props.
*
* It's important to match the `DateValue` type being used
* elsewhere in the builder, so they behave according to the
* behavior the user expects based on the props they've provided.
*
*/
function getDefaultDate(props) {
	const { defaultValue, defaultPlaceholder, granularity = "day", locale = "en" } = props;
	if (Array.isArray(defaultValue) && defaultValue.length) return defaultValue.at(-1).copy();
	if (defaultValue && !Array.isArray(defaultValue)) return defaultValue.copy();
	if (defaultPlaceholder) return defaultPlaceholder.copy();
	const date = /* @__PURE__ */ new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const calendarDateTimeGranularities = [
		"hour",
		"minute",
		"second"
	];
	const defaultFormatter = new DateFormatter(locale);
	const calendar = createCalendar(defaultFormatter.resolvedOptions().calendar);
	if (calendarDateTimeGranularities.includes(granularity ?? "day")) return toCalendar(new CalendarDateTime(year, month, day, 0, 0, 0), calendar);
	return toCalendar(new CalendarDate(year, month, day), calendar);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/date/utils.js
/**
* Splits an array into chunks of a given size.
* @param arr The array to split.
* @param size The size of each chunk.
* @returns An array of arrays, where each sub-array has `size` elements from the original array.
* @example ```ts
* const arr = [1, 2, 3, 4, 5, 6, 7, 8];
* const chunks = chunk(arr, 3);
* // chunks = [[1, 2, 3], [4, 5, 6], [7, 8]]
* ```
*/
function chunk(arr, size) {
	const result = [];
	for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
	return result;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/date/calendar.js
/**
* Retrieves an array of date values representing the days between
* the provided start and end dates.
*/
function getDaysBetween(start, end) {
	const days = [];
	let dCurrent = start.add({ days: 1 });
	const dEnd = end;
	while (dCurrent.compare(dEnd) < 0) {
		days.push(dCurrent);
		dCurrent = dCurrent.add({ days: 1 });
	}
	return days;
}
function createMonth(props) {
	const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
	const daysInMonth = getDaysInMonth(dateObj);
	const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
	const firstDayOfMonth = startOfMonth(dateObj);
	const lastDayOfMonth = endOfMonth(dateObj);
	const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
	const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
	const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
	const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
	const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
	if (fixedWeeks && totalDays < 42) {
		const extraDays = 42 - totalDays;
		let startFrom = nextMonthDays.at(-1);
		if (!startFrom) startFrom = endOfMonth(dateObj);
		const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
			const incr = i + 1;
			return startFrom.add({ days: incr });
		});
		nextMonthDays.push(...extraDaysArray);
	}
	const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
	return {
		value: dateObj,
		cells: allDays,
		rows: chunk(allDays, 7)
	};
}
function startOfDecade(dateObj) {
	return startOfYear(dateObj.subtract({ years: dateObj.year - Math.floor(dateObj.year / 10) * 10 }).set({
		day: 1,
		month: 1
	}));
}
function createYear(props) {
	const { dateObj, numberOfMonths = 1, pagedNavigation = false } = props;
	if (numberOfMonths && pagedNavigation) return Array.from({ length: Math.floor(12 / numberOfMonths) }, (_, i) => startOfMonth(dateObj.set({ month: i * numberOfMonths + 1 })));
	return Array.from({ length: 12 }, (_, i) => startOfMonth(dateObj.set({ month: i + 1 })));
}
function createMonths(props) {
	const { numberOfMonths, dateObj, ...monthProps } = props;
	const months = [];
	if (!numberOfMonths || numberOfMonths === 1) {
		months.push(createMonth({
			...monthProps,
			dateObj
		}));
		return months;
	}
	months.push(createMonth({
		...monthProps,
		dateObj
	}));
	for (let i = 1; i < numberOfMonths; i++) {
		const nextMonth = dateObj.add({ months: i });
		months.push(createMonth({
			...monthProps,
			dateObj: nextMonth
		}));
	}
	return months;
}
/**
* Creates a 3x4 grid of months for a given year.
*/
function createMonthGrid(props) {
	const { dateObj } = props;
	const months = createYear({ dateObj });
	return {
		value: dateObj,
		cells: months,
		rows: chunk(months, 4)
	};
}
/**
* Creates a 3x4 grid of years (decade-aligned).
* The grid starts from the decade that contains the given date.
*/
function createYearGrid(props) {
	const { dateObj, yearsPerPage = 12, decadeAligned = true } = props;
	let startYear;
	if (decadeAligned) startYear = startOfDecade(dateObj).year;
	else startYear = dateObj.year;
	const years = Array.from({ length: yearsPerPage }, (_, i) => startOfYear(dateObj.set({ year: startYear + i })));
	return {
		value: years[0],
		cells: years,
		rows: chunk(years, 4)
	};
}
/**
* It's better to use `getWeekStart` from `@internationalized/date`,
* but sadly it is not yet exported from the package.
* And the `Intl.Locale` API is not supported well enough yet.
*/
function getWeekStartsOn(locale) {
	const monday = new CalendarDate(2025, 1, 6);
	return (1 - getDayOfWeek(monday, locale) + 7) % 7;
}
/**
* Returns the locale-specific week number
*/
function getWeekNumber(date, locale = "en-US", firstDayOfWeek) {
	const jan1 = new CalendarDate(date.year, 1, 1);
	const usesISOWeek = jan1.toDate("UTC").getUTCDay() !== getDayOfWeek(jan1, locale);
	const weekStartsOn = firstDayOfWeek ?? (usesISOWeek ? "mon" : "sun");
	const firstWeekContainsDate = usesISOWeek ? 4 : 1;
	const dayOfWeek = getDayOfWeek(date, locale, weekStartsOn);
	const weekYear = date.add({ days: 7 - firstWeekContainsDate - dayOfWeek }).year;
	const week1Ref = new CalendarDate(weekYear, 1, firstWeekContainsDate);
	const week1Start = startOfWeek(week1Ref, locale, weekStartsOn);
	const currentWeekStart = startOfWeek(date, locale, weekStartsOn);
	return Math.round((currentWeekStart.toDate("UTC").getTime() - week1Start.toDate("UTC").getTime()) / 6048e5) + 1;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDateFormatter.js
/**
* Creates a wrapper around the `DateFormatter`, which is
* an improved version of the {@link Intl.DateTimeFormat} API,
* that is used internally by the various date builders to
* easily format dates in a consistent way.
*
* @see [DateFormatter](https://react-spectrum.adobe.com/internationalized/date/DateFormatter.html)
*/
function useDateFormatter(initialLocale, opts = {}) {
	const locale = ref(initialLocale);
	function getLocale() {
		return locale.value;
	}
	function setLocale(newLocale) {
		locale.value = newLocale;
	}
	function custom(date, options) {
		return new DateFormatter(locale.value, {
			...opts,
			...options
		}).format(date);
	}
	function selectedDate(date, includeTime = true) {
		if (hasTime(date) && includeTime) return custom(toDate(date), {
			dateStyle: "long",
			timeStyle: "long"
		});
		else return custom(toDate(date), { dateStyle: "long" });
	}
	function fullMonthAndYear(date, options = {}) {
		return new DateFormatter(locale.value, {
			...opts,
			month: "long",
			year: "numeric",
			...options
		}).format(date);
	}
	function fullMonth(date, options = {}) {
		return new DateFormatter(locale.value, {
			...opts,
			month: "long",
			...options
		}).format(date);
	}
	function getMonths() {
		const defaultDate = today(getLocalTimeZone());
		return [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12
		].map((item) => ({
			label: fullMonth(toDate(defaultDate.set({ month: item }))),
			value: item
		}));
	}
	function fullYear(date, options = {}) {
		return new DateFormatter(locale.value, {
			...opts,
			year: "numeric",
			...options
		}).format(date);
	}
	function toParts(date, options) {
		if (isZonedDateTime(date)) return new DateFormatter(locale.value, {
			...opts,
			...options,
			timeZone: date.timeZone
		}).formatToParts(toDate(date));
		else return new DateFormatter(locale.value, {
			...opts,
			...options
		}).formatToParts(toDate(date));
	}
	function dayOfWeek(date, length = "narrow") {
		return new DateFormatter(locale.value, {
			...opts,
			weekday: length
		}).format(date);
	}
	function dayPeriod(date) {
		const value = new DateFormatter(locale.value, {
			...opts,
			hour: "numeric",
			minute: "numeric"
		}).formatToParts(date).find((p) => p.type === "dayPeriod")?.value;
		if (value === "PM" || value === "pm" || value === "p.m.") return "PM";
		return "AM";
	}
	const defaultPartOptions = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	function part(dateObj, type, options = {}) {
		const part$1 = toParts(dateObj, {
			...defaultPartOptions,
			...options
		}).find((p) => p.type === type);
		return part$1 ? part$1.value : "";
	}
	return {
		setLocale,
		getLocale,
		fullMonth,
		fullYear,
		fullMonthAndYear,
		toParts,
		custom,
		part,
		dayPeriod,
		selectedDate,
		dayOfWeek,
		getMonths
	};
}
/**
* Injects a pair of focus guards at the edges of the whole DOM tree
* to ensure `focusin` & `focusout` events can be caught consistently.
*/
function useFocusGuards() {
	watchEffect((cleanupFn) => {});
}
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @return {Undo} undo command
*/
var hideOthers = function(originalTarget, parentNode, markerName) {
	Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	return function() {
		return null;
	};
};
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
/**
* The `useHideOthers` function is a TypeScript function that takes a target element reference and
* hides all other elements in ARIA when the target element is present, and restores the visibility of the
* hidden elements when the target element is removed.
* @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want
* to hide other elements when it is clicked or focused.
*/
function useHideOthers(target) {
	let undo;
	watch(() => unrefElement(target), (el) => {
		let isInsideClosedPopover = false;
		try {
			isInsideClosedPopover = !!el?.closest("[popover]:not(:popover-open)");
		} catch {}
		if (el && !isInsideClosedPopover) undo = hideOthers(el);
		else if (undo) undo();
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useKbd.js
function useKbd() {
	return {
		ALT: "Alt",
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		BACKSPACE: "Backspace",
		CAPS_LOCK: "CapsLock",
		CONTROL: "Control",
		DELETE: "Delete",
		END: "End",
		ENTER: "Enter",
		ESCAPE: "Escape",
		F1: "F1",
		F10: "F10",
		F11: "F11",
		F12: "F12",
		F2: "F2",
		F3: "F3",
		F4: "F4",
		F5: "F5",
		F6: "F6",
		F7: "F7",
		F8: "F8",
		F9: "F9",
		HOME: "Home",
		META: "Meta",
		PAGE_DOWN: "PageDown",
		PAGE_UP: "PageUp",
		SHIFT: "Shift",
		SPACE: " ",
		TAB: "Tab",
		CTRL: "Control",
		ASTERISK: "*",
		SPACE_CODE: "Space"
	};
}
//#endregion
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function useTypeahead(callback) {
	const search = refAutoReset("", 1e3);
	const handleTypeaheadSearch = (key, items) => {
		search.value = search.value + key;
		{
			const currentItem = getActiveElement();
			const itemsWithTextValue = items.map((item) => ({
				...item,
				textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
			}));
			const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
			const nextMatch = getNextMatch(itemsWithTextValue.map((item) => item.textValue), search.value, currentMatch?.textValue);
			const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
			if (newItem) newItem.ref.focus();
			return newItem?.ref;
		}
	};
	const resetTypeahead = () => {
		search.value = "";
	};
	return {
		search,
		handleTypeaheadSearch,
		resetTypeahead
	};
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray$1(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
/**
* This is the "meat" of the typeahead matching logic. It takes in all the values,
* the search and the current match, and returns the next match (or `undefined`).
*
* We normalize the search because if a user has repeatedly pressed a character,
* we want the exact same behavior as if we only had that one character
* (ie. cycle through options starting with that character)
*
* We also reorder the values by wrapping the array around the current match.
* This is so we always look forward from the current match, and picking the first
* match will always be the correct one.
*
* Finally, if the normalized search is exactly one character, we exclude the
* current match from the values because otherwise it would be the first to match always
* and focus would never move. This is as opposed to the regular case, where we
* don't want focus to move if the current match still matches.
*/
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray$1(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/stack.js
var useFocusStackState = createGlobalState(() => {
	return ref([]);
});
function createFocusScopesStack() {
	/** A stack of focus scopes, with the active one at the top */
	const stack = useFocusStackState();
	return {
		add(focusScope) {
			const activeFocusScope = stack.value[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value.unshift(focusScope);
		},
		remove(focusScope) {
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var FocusScope_default = /* @__PURE__ */ defineComponent({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		trapped: {
			type: Boolean,
			required: false,
			default: false
		},
		present: {
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
		}
	},
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { currentRef, currentElement } = useForwardExpose();
		ref(null);
		const focusScopesStack = createFocusScopesStack();
		const focusScope = /*#__PURE__*/ reactive({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		});
		watchEffect((cleanupFn) => {});
		function dispatchMountAutoFocus(container, previouslyFocusedElement) {
			const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
			const handleMountAutoFocus = (ev) => emits("mountAutoFocus", ev);
			container.addEventListener(AUTOFOCUS_ON_MOUNT, handleMountAutoFocus);
			container.dispatchEvent(mountEvent);
			container.removeEventListener(AUTOFOCUS_ON_MOUNT, handleMountAutoFocus);
			if (!mountEvent.defaultPrevented) {
				focusFirst$2(getTabbableCandidates(container), { select: true });
				if (getActiveElement() === previouslyFocusedElement) focus(container);
			}
		}
		watchEffect(async (cleanupFn) => {
			const container = currentElement.value;
			await nextTick();
			if (!container) return;
			if (props.present !== false) focusScopesStack.add(focusScope);
			const previouslyFocusedElement = getActiveElement();
			if (!container.contains(previouslyFocusedElement) && props.present !== false) dispatchMountAutoFocus(container, previouslyFocusedElement);
			cleanupFn(() => {
				const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
				const unmountEventHandler = (ev) => {
					emits("unmountAutoFocus", ev);
				};
				container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
				container.dispatchEvent(unmountEvent);
				container.setAttribute("data-focus-scope-unmounting", "");
				setTimeout(() => {
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? (void 0).body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
					focusScopesStack.remove(focusScope);
					container.removeAttribute("data-focus-scope-unmounting");
				}, 0);
			});
		});
		watch(() => props.present, async (present, prevPresent) => {});
		function handleKeyDown(event) {
			if (!props.loop && !props.trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = getActiveElement();
			if (isTabKey && focusedElement) {
				const container = event.currentTarget;
				const [first, last] = getTabbableEdges(container);
				if (!(first && last)) {
					if (focusedElement === container) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (props.loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (props.loop) focus(last, { select: true });
				}
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "currentRef",
				ref: currentRef,
				tabindex: "-1",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				onKeydown: handleKeyDown
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/utils.js
var ITEM_SELECT = "menu.itemSelect";
var SELECTION_KEYS = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS, "ArrowRight"],
	rtl: [...SELECTION_KEYS, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getCheckedState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst$1(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function isMouseEvent(event) {
	return event.pointerType === "mouse";
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/useCalendar.js
function useCalendarState(props) {
	function isDateSelected(dateObj) {
		if (Array.isArray(props.date.value)) return props.date.value.some((d) => isSameDay(d, dateObj));
		else if (!props.date.value) return false;
		else return isSameDay(props.date.value, dateObj);
	}
	return {
		isDateSelected,
		isInvalid: computed(() => {
			if (Array.isArray(props.date.value)) {
				if (!props.date.value.length) return false;
				for (const dateObj of props.date.value) {
					if (props.isDateDisabled?.(dateObj)) return true;
					if (props.isDateUnavailable?.(dateObj)) return true;
				}
			} else {
				if (!props.date.value) return false;
				if (props.isDateDisabled?.(props.date.value)) return true;
				if (props.isDateUnavailable?.(props.date.value)) return true;
			}
			return false;
		}),
		hasSelectedDate: computed(() => {
			return Array.isArray(props.date.value) ? props.date.value.length > 0 : !!props.date.value;
		}),
		isSelectedDateDisabled: computed(() => {
			if (Array.isArray(props.date.value)) {
				if (!props.date.value.length) return false;
				return props.date.value.some((dateObj) => props.isDateDisabled?.(dateObj));
			}
			if (!props.date.value) return false;
			return !!props.isDateDisabled?.(props.date.value);
		})
	};
}
function handleNextDisabled(lastPeriodInView, nextPageFunc) {
	const firstPeriodOfNextPage = nextPageFunc(lastPeriodInView);
	const diff = firstPeriodOfNextPage.compare(lastPeriodInView);
	const duration = {};
	if (diff >= 7) duration.day = 1;
	if (diff >= getDaysInMonth(lastPeriodInView)) duration.month = 1;
	return firstPeriodOfNextPage.set({ ...duration });
}
function handlePrevDisabled(firstPeriodInView, prevPageFunc) {
	const lastPeriodOfPrevPage = prevPageFunc(firstPeriodInView);
	const diff = firstPeriodInView.compare(lastPeriodOfPrevPage);
	const duration = {};
	if (diff >= 7) duration.day = 35;
	if (diff >= getDaysInMonth(firstPeriodInView)) duration.month = 13;
	return lastPeriodOfPrevPage.set({ ...duration });
}
function handleNextPage(date, nextPageFunc) {
	return nextPageFunc(date);
}
function handlePrevPage(date, prevPageFunc) {
	return prevPageFunc(date);
}
function useCalendar(props) {
	const formatter = useDateFormatter(props.locale.value);
	const headingFormatOptions = computed(() => {
		const options = { calendar: props.placeholder.value.calendar.identifier };
		if (props.placeholder.value.calendar.identifier === "gregory" && props.placeholder.value.era === "BC") options.era = "short";
		return options;
	});
	const grid = ref(createMonths({
		dateObj: props.placeholder.value,
		weekStartsOn: props.weekStartsOn.value,
		locale: props.locale.value,
		fixedWeeks: props.fixedWeeks.value,
		numberOfMonths: props.numberOfMonths.value
	}));
	const visibleView = computed(() => {
		return grid.value.map((month) => month.value);
	});
	function isOutsideVisibleView(date) {
		return !visibleView.value.some((month) => isEqualMonth(date, month));
	}
	const isNextButtonDisabled = (nextPageFunc) => {
		if (!props.maxValue.value || !grid.value.length) return false;
		if (props.disabled.value) return true;
		const lastPeriodInView = grid.value.at(-1).value;
		if (!nextPageFunc && !props.nextPage.value) return isAfter(lastPeriodInView.add({ months: 1 }).set({ day: 1 }), props.maxValue.value);
		return isAfter(handleNextDisabled(lastPeriodInView, nextPageFunc || props.nextPage.value), props.maxValue.value);
	};
	const isPrevButtonDisabled = (prevPageFunc) => {
		if (!props.minValue.value || !grid.value.length) return false;
		if (props.disabled.value) return true;
		const firstPeriodInView = grid.value[0].value;
		if (!prevPageFunc && !props.prevPage.value) return isBefore(firstPeriodInView.subtract({ months: 1 }).set({ day: 35 }), props.minValue.value);
		return isBefore(handlePrevDisabled(firstPeriodInView, prevPageFunc || props.prevPage.value), props.minValue.value);
	};
	function isDateDisabled(dateObj) {
		if (props.isDateDisabled?.(dateObj) || props.disabled.value) return true;
		if (props.maxValue.value && isAfter(dateObj, props.maxValue.value)) return true;
		if (props.minValue.value && isBefore(dateObj, props.minValue.value)) return true;
		return false;
	}
	const isDateUnavailable = (date) => {
		if (props.isDateUnavailable?.(date)) return true;
		return false;
	};
	const weekdays = computed(() => {
		if (!grid.value.length) return [];
		return grid.value[0].rows[0].map((date) => {
			return formatter.dayOfWeek(toDate(date), props.weekdayFormat.value);
		});
	});
	const nextPage = (nextPageFunc) => {
		const firstDate = grid.value[0].value;
		if (!nextPageFunc && !props.nextPage.value) {
			const newGrid$1 = createMonths({
				dateObj: firstDate.add({ months: props.pagedNavigation.value ? props.numberOfMonths.value : 1 }),
				weekStartsOn: props.weekStartsOn.value,
				locale: props.locale.value,
				fixedWeeks: props.fixedWeeks.value,
				numberOfMonths: props.numberOfMonths.value
			});
			grid.value = newGrid$1;
			props.placeholder.value = newGrid$1[0].value.set({ day: 1 });
			return;
		}
		const newGrid = createMonths({
			dateObj: handleNextPage(firstDate, nextPageFunc || props.nextPage.value),
			weekStartsOn: props.weekStartsOn.value,
			locale: props.locale.value,
			fixedWeeks: props.fixedWeeks.value,
			numberOfMonths: props.numberOfMonths.value
		});
		grid.value = newGrid;
		const duration = {};
		if (!nextPageFunc) {
			const diff = newGrid[0].value.compare(firstDate);
			if (diff >= getDaysInMonth(firstDate)) duration.day = 1;
			if (diff >= 365) duration.month = 1;
		}
		props.placeholder.value = newGrid[0].value.set({ ...duration });
	};
	const prevPage = (prevPageFunc) => {
		const firstDate = grid.value[0].value;
		if (!prevPageFunc && !props.prevPage.value) {
			const newGrid$1 = createMonths({
				dateObj: firstDate.subtract({ months: props.pagedNavigation.value ? props.numberOfMonths.value : 1 }),
				weekStartsOn: props.weekStartsOn.value,
				locale: props.locale.value,
				fixedWeeks: props.fixedWeeks.value,
				numberOfMonths: props.numberOfMonths.value
			});
			grid.value = newGrid$1;
			props.placeholder.value = newGrid$1[0].value.set({ day: 1 });
			return;
		}
		const newGrid = createMonths({
			dateObj: handlePrevPage(firstDate, prevPageFunc || props.prevPage.value),
			weekStartsOn: props.weekStartsOn.value,
			locale: props.locale.value,
			fixedWeeks: props.fixedWeeks.value,
			numberOfMonths: props.numberOfMonths.value
		});
		grid.value = newGrid;
		const duration = {};
		if (!prevPageFunc) {
			const diff = firstDate.compare(newGrid[0].value);
			if (diff >= getDaysInMonth(firstDate)) duration.day = 1;
			if (diff >= 365) duration.month = 1;
		}
		props.placeholder.value = newGrid[0].value.set({ ...duration });
	};
	watch(props.placeholder, (value) => {
		if (visibleView.value.some((month) => isEqualMonth(month, value))) return;
		grid.value = createMonths({
			dateObj: value,
			weekStartsOn: props.weekStartsOn.value,
			locale: props.locale.value,
			fixedWeeks: props.fixedWeeks.value,
			numberOfMonths: props.numberOfMonths.value
		});
	});
	watch([
		props.locale,
		props.weekStartsOn,
		props.fixedWeeks,
		props.numberOfMonths
	], () => {
		grid.value = createMonths({
			dateObj: props.placeholder.value,
			weekStartsOn: props.weekStartsOn.value,
			locale: props.locale.value,
			fixedWeeks: props.fixedWeeks.value,
			numberOfMonths: props.numberOfMonths.value
		});
	});
	const headingValue = computed(() => {
		if (!grid.value.length) return "";
		if (props.locale.value !== formatter.getLocale()) formatter.setLocale(props.locale.value);
		if (grid.value.length === 1) {
			const month = grid.value[0].value;
			return `${formatter.fullMonthAndYear(toDate(month), headingFormatOptions.value)}`;
		}
		const startMonth = toDate(grid.value[0].value);
		const endMonth = toDate(grid.value.at(-1).value);
		const startMonthName = formatter.fullMonth(startMonth, headingFormatOptions.value);
		const endMonthName = formatter.fullMonth(endMonth, headingFormatOptions.value);
		const startMonthYear = formatter.fullYear(startMonth, headingFormatOptions.value);
		const endMonthYear = formatter.fullYear(endMonth, headingFormatOptions.value);
		return startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
	});
	return {
		isDateDisabled,
		isDateUnavailable,
		isNextButtonDisabled,
		isPrevButtonDisabled,
		grid,
		weekdays,
		visibleView,
		isOutsideVisibleView,
		formatter,
		nextPage,
		prevPage,
		headingValue,
		fullCalendarLabel: computed(() => `${props.calendarLabel.value ?? "Event Date"}, ${headingValue.value}`),
		isPlaceholderFocusable: computed(() => {
			return !(isDateDisabled(props.placeholder.value) || isDateUnavailable(props.placeholder.value) || isOutsideVisibleView(props.placeholder.value));
		}),
		firstFocusableDate: computed(() => {
			for (const month of grid.value) {
				if (props.minValue.value && isBefore(month.value, props.minValue.value)) continue;
				const daysInMonth = getDaysInMonth(month.value);
				const startDay = props.minValue.value && isSameMonth(props.minValue.value, month.value) ? props.minValue.value.day : 1;
				for (let day = startDay; day <= daysInMonth; day++) {
					const date = month.value.set({ day });
					if (isDateDisabled(date) || isDateUnavailable(date)) continue;
					return date;
				}
			}
		})
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarRoot.js
var _hoisted_1$5 = { style: {
	"border": "0px",
	"clip": "rect(0px, 0px, 0px, 0px)",
	"clip-path": "inset(50%)",
	"height": "1px",
	"margin": "-1px",
	"overflow": "hidden",
	"padding": "0px",
	"position": "absolute",
	"white-space": "nowrap",
	"width": "1px"
} };
var _hoisted_2$5 = {
	role: "heading",
	"aria-level": "2"
};
var [injectCalendarRootContext, provideCalendarRootContext] = /*#__PURE__*/ createContext("CalendarRoot");
var CalendarRoot_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarRoot",
	props: {
		defaultValue: {
			type: null,
			required: false,
			default: void 0
		},
		defaultPlaceholder: {
			type: null,
			required: false
		},
		placeholder: {
			type: null,
			required: false,
			default: void 0
		},
		pagedNavigation: {
			type: Boolean,
			required: false,
			default: false
		},
		preventDeselect: {
			type: Boolean,
			required: false,
			default: false
		},
		weekStartsOn: {
			type: Number,
			required: false
		},
		weekdayFormat: {
			type: String,
			required: false,
			default: "narrow"
		},
		calendarLabel: {
			type: String,
			required: false
		},
		fixedWeeks: {
			type: Boolean,
			required: false,
			default: false
		},
		maxValue: {
			type: null,
			required: false
		},
		minValue: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		numberOfMonths: {
			type: Number,
			required: false,
			default: 1
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		initialFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		isDateDisabled: {
			type: Function,
			required: false,
			default: void 0
		},
		isDateUnavailable: {
			type: Function,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
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
		modelValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false,
			default: false
		},
		disableDaysOutsideCurrentView: {
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
			default: "div"
		}
	},
	emits: ["update:modelValue", "update:placeholder"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, initialFocus, pagedNavigation, weekdayFormat, fixedWeeks, multiple, minValue, maxValue, numberOfMonths, preventDeselect, isDateDisabled: propsIsDateDisabled, isDateUnavailable: propsIsDateUnavailable, calendarLabel, defaultValue, nextPage: propsNextPage, prevPage: propsPrevPage, dir: propDir, locale: propLocale, disableDaysOutsideCurrentView } = toRefs(props);
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const locale = useLocale(propLocale);
		const dir = useDirection(propDir);
		const weekStartsOn = computed(() => props.weekStartsOn ?? getWeekStartsOn(locale.value));
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: defaultValue.value,
			passive: props.modelValue === void 0
		});
		const defaultDate = getDefaultDate({
			defaultPlaceholder: props.placeholder,
			defaultValue: modelValue.value,
			locale: props.locale
		});
		const placeholder = useVModel(props, "placeholder", emits, {
			defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
			passive: props.placeholder === void 0
		});
		function onPlaceholderChange(value) {
			placeholder.value = value.copy();
		}
		const { fullCalendarLabel, headingValue, isDateDisabled, isDateUnavailable, isNextButtonDisabled, isPrevButtonDisabled, weekdays, isOutsideVisibleView, nextPage, prevPage, formatter, grid, isPlaceholderFocusable, firstFocusableDate } = useCalendar({
			locale,
			placeholder,
			weekStartsOn,
			fixedWeeks,
			numberOfMonths,
			minValue,
			maxValue,
			disabled,
			weekdayFormat,
			pagedNavigation,
			isDateDisabled: propsIsDateDisabled.value,
			isDateUnavailable: propsIsDateUnavailable.value,
			calendarLabel,
			nextPage: propsNextPage,
			prevPage: propsPrevPage
		});
		const { isInvalid, isDateSelected, hasSelectedDate, isSelectedDateDisabled } = useCalendarState({
			date: modelValue,
			isDateDisabled,
			isDateUnavailable
		});
		watch(modelValue, (_modelValue) => {
			if (Array.isArray(_modelValue) && _modelValue.length) {
				const lastValue = _modelValue.at(-1);
				if (lastValue && !isEqualDay(placeholder.value, lastValue)) onPlaceholderChange(lastValue);
			} else if (!Array.isArray(_modelValue) && _modelValue && !isEqualDay(placeholder.value, _modelValue)) onPlaceholderChange(_modelValue);
		});
		function onDateChange(value) {
			if (!multiple.value) {
				if (!modelValue.value) {
					modelValue.value = value.copy();
					return;
				}
				if (!preventDeselect.value && isEqualDay(modelValue.value, value)) {
					placeholder.value = value.copy();
					modelValue.value = void 0;
				} else modelValue.value = value.copy();
			} else if (!modelValue.value) modelValue.value = [value.copy()];
			else if (Array.isArray(modelValue.value)) {
				if (modelValue.value.findIndex((date) => isSameDay(date, value)) === -1) modelValue.value = [...modelValue.value, value];
				else if (!preventDeselect.value) {
					const next = modelValue.value.filter((date) => !isSameDay(date, value));
					if (!next.length) {
						placeholder.value = value.copy();
						modelValue.value = void 0;
						return;
					}
					modelValue.value = next.map((date) => date.copy());
				}
			}
		}
		provideCalendarRootContext({
			isDateUnavailable,
			dir,
			isDateDisabled,
			locale,
			formatter,
			modelValue,
			placeholder,
			disabled,
			initialFocus,
			pagedNavigation,
			grid,
			weekDays: weekdays,
			weekStartsOn,
			weekdayFormat,
			fixedWeeks,
			multiple,
			numberOfMonths,
			readonly,
			preventDeselect,
			fullCalendarLabel,
			headingValue,
			isInvalid,
			isDateSelected,
			isNextButtonDisabled,
			isPrevButtonDisabled,
			isOutsideVisibleView,
			nextPage,
			prevPage,
			parentElement,
			onPlaceholderChange,
			onDateChange,
			disableDaysOutsideCurrentView,
			minValue,
			maxValue,
			isPlaceholderFocusable,
			firstFocusableDate,
			hasSelectedDate,
			isSelectedDateDisabled
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-label": unref(fullCalendarLabel),
				"data-readonly": unref(readonly) ? "" : void 0,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-invalid": unref(isInvalid) ? "" : void 0,
				dir: unref(dir)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					date: unref(placeholder),
					grid: unref(grid),
					weekDays: unref(weekdays),
					weekStartsOn: weekStartsOn.value,
					locale: unref(locale),
					fixedWeeks: unref(fixedWeeks),
					modelValue: unref(modelValue)
				}), createElementVNode("div", _hoisted_1$5, [createElementVNode("div", _hoisted_2$5, toDisplayString(unref(fullCalendarLabel)), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"data-readonly",
				"data-disabled",
				"data-invalid",
				"dir"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarCell.js
var CalendarCell_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarCell",
	props: {
		date: {
			type: null,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "td"
		}
	},
	setup(__props) {
		const rootContext = injectCalendarRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "gridcell",
				"aria-selected": unref(rootContext).isDateSelected(_ctx.date) ? true : void 0,
				"aria-disabled": unref(rootContext).isDateDisabled(_ctx.date) || unref(rootContext).isDateUnavailable?.(_ctx.date) || unref(rootContext).disableDaysOutsideCurrentView.value,
				"data-disabled": unref(rootContext).isDateDisabled(_ctx.date) || unref(rootContext).disableDaysOutsideCurrentView.value ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-selected",
				"aria-disabled",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarCellTrigger.js
var CalendarCellTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarCellTrigger",
	props: {
		day: {
			type: null,
			required: true
		},
		month: {
			type: null,
			required: true
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
		const kbd = useKbd();
		const rootContext = injectCalendarRootContext();
		const { primitiveElement} = usePrimitiveElement();
		const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));
		const labelText = computed(() => {
			return rootContext.formatter.custom(toDate(props.day), {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric"
			});
		});
		const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day) ?? false);
		const isDateToday = computed(() => {
			return isToday(props.day, getLocalTimeZone());
		});
		const isOutsideView = computed(() => {
			return !isSameMonth(props.day, props.month);
		});
		const isOutsideVisibleView = computed(() => rootContext.isOutsideVisibleView(props.day));
		const isDisabled = computed(() => rootContext.isDateDisabled(props.day) || rootContext.disableDaysOutsideCurrentView.value && isOutsideView.value);
		const isFocusedDate = computed(() => {
			if (isOutsideView.value || isDisabled.value) return false;
			if (!rootContext.disabled.value && rootContext.isPlaceholderFocusable.value && isSameDay(props.day, rootContext.placeholder.value)) return true;
			if ((!rootContext.hasSelectedDate.value || rootContext.isSelectedDateDisabled.value) && !rootContext.isPlaceholderFocusable.value) return rootContext.firstFocusableDate.value && isSameDay(props.day, rootContext.firstFocusableDate.value);
			return false;
		});
		const isSelectedDate = computed(() => rootContext.isDateSelected(props.day));
		function changeDate(date) {
			if (rootContext.readonly.value) return;
			if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) return;
			rootContext.onDateChange(date);
		}
		function handleClick() {
			if (isDisabled.value) return;
			changeDate(props.day);
		}
		function handleArrowKey(e) {
			if (isDisabled.value) return;
			if ((e.code === kbd.ENTER || e.code === kbd.SPACE_CODE) && (e.ctrlKey || e.metaKey || e.altKey)) return;
			e.preventDefault();
			e.stopPropagation();
			const parentElement = rootContext.parentElement.value;
			const indexIncrementation = 7;
			const sign = rootContext.dir.value === "rtl" ? -1 : 1;
			switch (e.code) {
				case kbd.ARROW_RIGHT:
					shiftFocus(props.day, sign);
					break;
				case kbd.ARROW_LEFT:
					shiftFocus(props.day, -sign);
					break;
				case kbd.ARROW_UP:
					shiftFocus(props.day, -7);
					break;
				case kbd.ARROW_DOWN:
					shiftFocus(props.day, indexIncrementation);
					break;
				case kbd.ENTER:
				case kbd.SPACE_CODE: changeDate(props.day);
			}
			function shiftFocus(day, add) {
				const candidateDayValue = day.add({ days: add });
				if (rootContext.minValue.value && candidateDayValue.compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && candidateDayValue.compare(rootContext.maxValue.value) > 0) return;
				const candidateDay = parentElement.querySelector(`[data-value='${candidateDayValue.toString()}']:not([data-outside-view])`);
				if (!candidateDay) {
					if (add > 0) {
						if (rootContext.isNextButtonDisabled()) return;
						rootContext.nextPage();
					} else {
						if (rootContext.isPrevButtonDisabled()) return;
						rootContext.prevPage();
					}
					nextTick(() => {
						shiftFocus(day, add);
					});
					return;
				}
				if (candidateDay && candidateDay.hasAttribute("data-disabled")) return shiftFocus(candidateDayValue, add);
				rootContext.onPlaceholderChange(candidateDayValue);
				candidateDay?.focus();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: props.as,
				"as-child": props.asChild,
				role: "button",
				"aria-label": labelText.value,
				"data-reka-calendar-cell-trigger": "",
				"aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
				"data-selected": isSelectedDate.value ? true : void 0,
				"data-value": _ctx.day.toString(),
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-unavailable": isUnavailable.value ? "" : void 0,
				"data-today": isDateToday.value ? "" : void 0,
				"data-outside-view": isOutsideView.value ? "" : void 0,
				"data-outside-visible-view": isOutsideVisibleView.value ? "" : void 0,
				"data-focused": isFocusedDate.value ? "" : void 0,
				tabindex: isFocusedDate.value ? 0 : isOutsideView.value || isDisabled.value ? void 0 : -1,
				onClick: handleClick,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"space",
					"enter"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					dayValue: dayValue.value,
					disabled: isDisabled.value,
					today: isDateToday.value,
					selected: isSelectedDate.value,
					outsideView: isOutsideView.value,
					outsideVisibleView: isOutsideVisibleView.value,
					unavailable: isUnavailable.value
				}, () => [createTextVNode(toDisplayString(dayValue.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"aria-disabled",
				"data-selected",
				"data-value",
				"data-disabled",
				"data-unavailable",
				"data-today",
				"data-outside-view",
				"data-outside-visible-view",
				"data-focused",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarGrid.js
var CalendarGrid_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarGrid",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "table"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectCalendarRootContext();
		const disabled = computed(() => rootContext.disabled.value ? true : void 0);
		const readonly = computed(() => rootContext.readonly.value ? true : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				tabindex: "-1",
				role: "application",
				"aria-readonly": readonly.value,
				"aria-disabled": disabled.value,
				"data-readonly": readonly.value && "",
				"data-disabled": disabled.value && ""
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-readonly",
				"aria-disabled",
				"data-readonly",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarGridBody.js
var CalendarGridBody_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarGridBody",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tbody"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarGridHead.js
var CalendarGridHead_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarGridHead",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "thead"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "aria-hidden": "true" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarGridRow.js
var CalendarGridRow_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarGridRow",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tr"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarHeadCell.js
var CalendarHeadCell_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarHeadCell",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "th"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarHeader.js
var CalendarHeader_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarHeader",
	props: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarHeading.js
var CalendarHeading_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarHeading",
	props: {
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
		const rootContext = injectCalendarRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "data-disabled": unref(rootContext).disabled.value ? "" : void 0 }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { headingValue: unref(rootContext).headingValue.value }, () => [createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)])]),
				_: 3
			}, 16, ["data-disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarNext.js
var CalendarNext_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarNext",
	props: {
		nextPage: {
			type: Function,
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
		const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
		const rootContext = injectCalendarRootContext();
		function handleClick() {
			if (disabled.value) return;
			rootContext.nextPage(props.nextPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Next page",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Next page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Calendar/CalendarPrev.js
var CalendarPrev_default = /* @__PURE__ */ defineComponent({
	__name: "CalendarPrev",
	props: {
		prevPage: {
			type: Function,
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
		const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
		const rootContext = injectCalendarRootContext();
		function handleClick() {
			if (disabled.value) return;
			rootContext.prevPage(props.prevPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-label": "Previous page",
				as: props.as,
				"as-child": props.asChild,
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Prev page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = /*#__PURE__*/ createContext("RovingFocusGroup");
var RovingFocusGroup_default = /* @__PURE__ */ defineComponent({
	__name: "RovingFocusGroup",
	props: {
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
			default: false
		},
		currentTabStopId: {
			type: [String, null],
			required: false
		},
		defaultCurrentTabStopId: {
			type: String,
			required: false
		},
		preventScrollOnEntryFocus: {
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
			required: false
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { loop, orientation, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const currentTabStopId = useVModel(props, "currentTabStopId", emits, {
			defaultValue: props.defaultCurrentTabStopId,
			passive: props.currentTabStopId === void 0
		});
		const isTabbingBackOut = ref(false);
		const isClickFocus = ref(false);
		const focusableItemsCount = ref(0);
		const { getItems, CollectionSlot } = useCollection({ isProvider: true });
		function handleFocus(event) {
			const isKeyboardFocus = !isClickFocus.value;
			if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
				const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
				event.currentTarget.dispatchEvent(entryFocusEvent);
				emits("entryFocus", entryFocusEvent);
				if (!entryFocusEvent.defaultPrevented) {
					const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
					focusFirst([
						items.find((item) => item.getAttribute("data-active") === ""),
						items.find((item) => item.getAttribute("data-highlighted") === ""),
						items.find((item) => item.id === currentTabStopId.value),
						...items
					].filter(Boolean), props.preventScrollOnEntryFocus);
				}
			}
			isClickFocus.value = false;
		}
		function handleMouseUp() {
			setTimeout(() => {
				isClickFocus.value = false;
			}, 1);
		}
		__expose({ getItems });
		provideRovingFocusGroupContext({
			loop,
			dir,
			orientation,
			currentTabStopId,
			onItemFocus: (tabStopId) => {
				currentTabStopId.value = tabStopId;
			},
			onItemShiftTab: () => {
				isTabbingBackOut.value = true;
			},
			onFocusableItemAdd: () => {
				focusableItemsCount.value++;
			},
			onFocusableItemRemove: () => {
				focusableItemsCount.value--;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
					"data-orientation": unref(orientation),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: unref(dir),
					style: { "outline": "none" },
					onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
					onMouseup: handleMouseUp,
					onFocus: handleFocus,
					onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"as",
					"as-child",
					"dir"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var MenuAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "MenuAnchor",
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
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuArrow.js
var MenuArrow_default = /* @__PURE__ */ defineComponent({
	__name: "MenuArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
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
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function useIsUsingKeyboardImpl() {
	return ref(false);
}
var useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRoot.js
var [injectMenuContext, provideMenuContext] = /*#__PURE__*/ createContext(["MenuRoot", "MenuSub"], "MenuContext");
var [injectMenuRootContext, provideMenuRootContext] = /*#__PURE__*/ createContext("MenuRoot");
var MenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { modal, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const open = useVModel(props, "open", emits);
		const content = ref();
		const isUsingKeyboardRef = useIsUsingKeyboard();
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuRootContext({
			onClose: () => {
				open.value = false;
			},
			isUsingKeyboardRef,
			dir,
			modal
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContentImpl.js
var [injectMenuContentContext, provideMenuContentContext] = /*#__PURE__*/ createContext("MenuContent");
var MenuContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ mergeDefaults({
		loop: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		disableOutsideScroll: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props);
		useFocusGuards();
		useBodyScrollLock(disableOutsidePointerEvents.value);
		const searchRef = ref("");
		const timerRef = ref(0);
		const pointerGraceTimerRef = ref(0);
		const pointerGraceIntentRef = ref(null);
		const pointerDirRef = ref("right");
		const lastPointerXRef = ref(0);
		const currentItemId = ref(null);
		const rovingFocusGroupRef = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { handleTypeaheadSearch } = useTypeahead();
		const highlightedElement = ref();
		function onKeydownNavigation(event) {
			const el = useArrowNavigation(event, highlightedElement.value || getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: false,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) {
				highlightedElement.value = el;
				el.scrollIntoView({ block: "nearest" });
			}
		}
		function onKeydownEnter() {
			if (highlightedElement.value) highlightedElement.value.click();
		}
		const filterElement = ref();
		const activeSubmenuContext = ref();
		watch(highlightedElement, (el) => {
			if (activeSubmenuContext.value && (el === void 0 || el !== activeSubmenuContext.value.trigger.value)) {
				if (el === void 0) return;
				activeSubmenuContext.value.onOpenChange(false);
				activeSubmenuContext.value = void 0;
			}
		});
		watch(contentElement, (el) => {
			menuContext.onContentChange(el);
		});
		function isPointerMovingToSubmenu(event) {
			return pointerDirRef.value === pointerGraceIntentRef.value?.side && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
		}
		async function handleMountAutoFocus(event) {
			emits("openAutoFocus", event);
			if (event.defaultPrevented) return;
			event.preventDefault();
			contentElement.value?.focus({ preventScroll: true });
		}
		function handleKeyDown(event) {
			if (event.defaultPrevented) return;
			const target = event.target;
			const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
			const isKeyDownInTextField = ["input", "textarea"].includes(target.tagName.toLowerCase());
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			const isCharacterKey = event.key.length === 1;
			const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: true,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) return el?.focus();
			if (event.code === "Space") return;
			const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
			if (isKeyDownInside) {
				if (event.key === "Tab" && rootContext.modal.value) event.preventDefault();
				if (!isModifierKey && isCharacterKey && !isKeyDownInTextField) handleTypeaheadSearch(event.key, collectionItems);
			}
			if (event.target !== contentElement.value) return;
			if (!FIRST_LAST_KEYS.includes(event.key)) return;
			event.preventDefault();
			const candidateNodes = [...collectionItems.map((item) => item.ref)];
			if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
			focusFirst$1(candidateNodes);
		}
		function handleBlur(event) {
			if (!event?.currentTarget?.contains?.(event.target)) {
				(void 0).clearTimeout(timerRef.value);
				searchRef.value = "";
			}
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			const target = event.target;
			const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
			if ((event?.currentTarget)?.contains(target) && pointerXHasChanged) {
				const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
				pointerDirRef.value = newDir;
				lastPointerXRef.value = event.clientX;
			}
		}
		function handlePointerEnter(event) {
			if (!isMouseEvent(event)) return;
			if (filterElement.value) filterElement.value.focus();
		}
		provideMenuContentContext({
			onItemEnter: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			onItemLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				if (!["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "")) contentElement.value?.focus();
				currentItemId.value = null;
				return false;
			},
			onTriggerLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			searchRef,
			highlightedElement,
			onKeydownNavigation,
			onKeydownEnter,
			filterElement,
			onFilterElementChange: (el) => {
				filterElement.value = el;
			},
			activeSubmenuContext,
			pointerGraceTimerRef,
			onPointerGraceIntentChange: (intent) => {
				pointerGraceIntentRef.value = intent;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				trapped: unref(trapFocus),
				onMountAutoFocus: handleMountAutoFocus,
				onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": unref(disableOutsidePointerEvents),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
					onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
				}, {
					default: withCtx(() => [createVNode(unref(RovingFocusGroup_default), {
						ref_key: "rovingFocusGroupRef",
						ref: rovingFocusGroupRef,
						"current-tab-stop-id": currentItemId.value,
						"onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
						"as-child": "",
						orientation: "vertical",
						dir: unref(rootContext).dir.value,
						loop: unref(loop),
						onEntryFocus: _cache[1] || (_cache[1] = (event) => {
							emits("entryFocus", event);
							if (!unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
						})
					}, {
						default: withCtx(() => [createVNode(unref(PopperContent_default), {
							ref: unref(forwardRef),
							role: "menu",
							as: _ctx.as,
							"as-child": _ctx.asChild,
							"aria-orientation": "vertical",
							"data-reka-menu-content": "",
							"data-state": unref(getOpenState)(unref(menuContext).open.value),
							dir: unref(rootContext).dir.value,
							side: _ctx.side,
							"side-offset": _ctx.sideOffset,
							align: _ctx.align,
							"align-offset": _ctx.alignOffset,
							"avoid-collisions": _ctx.avoidCollisions,
							"collision-boundary": _ctx.collisionBoundary,
							"collision-padding": _ctx.collisionPadding,
							"arrow-padding": _ctx.arrowPadding,
							"prioritize-position": _ctx.prioritizePosition,
							"position-strategy": _ctx.positionStrategy,
							"update-position-strategy": _ctx.updatePositionStrategy,
							sticky: _ctx.sticky,
							"hide-when-detached": _ctx.hideWhenDetached,
							reference: _ctx.reference,
							onKeydown: handleKeyDown,
							onBlur: handleBlur,
							onPointermove: handlePointerMove,
							onPointerenter: handlePointerEnter
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, [
							"as",
							"as-child",
							"data-state",
							"dir",
							"side",
							"side-offset",
							"align",
							"align-offset",
							"avoid-collisions",
							"collision-boundary",
							"collision-padding",
							"arrow-padding",
							"prioritize-position",
							"position-strategy",
							"update-position-strategy",
							"sticky",
							"hide-when-detached",
							"reference"
						])]),
						_: 3
					}, 8, [
						"current-tab-stop-id",
						"dir",
						"loop"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemImpl.js
var MenuItemImpl_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	setup(__props) {
		const props = __props;
		const contentContext = injectMenuContentContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isFocused = ref(false);
		const isHighlighted = computed(() => isFocused.value || currentElement.value != null && contentContext.highlightedElement.value === currentElement.value);
		async function handlePointerMove(event) {
			if (event.defaultPrevented || !isMouseEvent(event)) return;
			if (props.disabled) contentContext.onItemLeave(event);
			else if (!contentContext.onItemEnter(event)) {
				const item = event.currentTarget;
				contentContext.highlightedElement.value = item;
				if (!["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "")) item.focus({ preventScroll: true });
			}
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			if (contentContext.highlightedElement.value !== currentElement.value) return;
			if (!contentContext.onItemLeave(event) && contentContext.highlightedElement.value === currentElement.value) contentContext.highlightedElement.value = void 0;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					role: "menuitem",
					tabindex: "-1"
				}, _ctx.$attrs, {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-disabled": _ctx.disabled || void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onFocus: _cache[0] || (_cache[0] = async (event) => {
						await nextTick();
						if (event.defaultPrevented || _ctx.disabled) return;
						isFocused.value = true;
						unref(contentContext).highlightedElement.value = event.currentTarget;
					}),
					onBlur: _cache[1] || (_cache[1] = async (event) => {
						await nextTick();
						if (event.defaultPrevented) return;
						isFocused.value = false;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-disabled",
					"data-disabled",
					"data-highlighted"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItem.js
var MenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		const isPointerDownRef = ref(false);
		async function handleSelect() {
			const menuItem = currentElement.value;
			if (!props.disabled && menuItem) {
				const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
					bubbles: true,
					cancelable: true
				});
				emits("select", itemSelectEvent);
				await nextTick();
				if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
				else rootContext.onClose();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItemImpl_default, mergeProps(props, {
				ref: unref(forwardRef),
				onClick: handleSelect,
				onPointerdown: _cache[0] || (_cache[0] = () => {
					isPointerDownRef.value = true;
				}),
				onPointerup: _cache[1] || (_cache[1] = async (event) => {
					await nextTick();
					if (event.defaultPrevented) return;
					if (!isPointerDownRef.value) event.currentTarget?.click();
				}),
				onKeydown: _cache[2] || (_cache[2] = async (event) => {
					const isTypingAhead = unref(contentContext).searchRef.value !== "";
					if (_ctx.disabled || isTypingAhead && event.key === " ") return;
					if (unref(SELECTION_KEYS).includes(event.key)) {
						event.currentTarget?.click();
						/**
						* We prevent default browser behaviour for selection keys as they should trigger
						* a selection only:
						* - prevents space from scrolling the page.
						* - if keydown causes focus to move, prevents keydown from firing on the new target.
						*/
						event.preventDefault();
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemIndicator.js
var [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = /*#__PURE__*/ createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItemIndicator",
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
		const indicatorContext = injectMenuItemIndicatorContext({ modelValue: ref(false) });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate)(unref(indicatorContext).modelValue.value) || unref(indicatorContext).modelValue.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": unref(getCheckedState)(unref(indicatorContext).modelValue.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-state"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuCheckboxItem.js
var MenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, ["modelValue"]);
		const forwarded = useForwardProps$1(delegatedProps);
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemcheckbox" }, unref(forwarded), {
				"aria-checked": unref(isIndeterminate)(unref(modelValue)) ? "mixed" : unref(modelValue),
				"data-state": unref(getCheckedState)(unref(modelValue)),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					if (unref(isIndeterminate)(unref(modelValue))) modelValue.value = true;
					else modelValue.value = !unref(modelValue);
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentModal.js
var MenuRootContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentModal",
	props: {
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(menuContext).open.value,
				"disable-outside-pointer-events": unref(menuContext).open.value,
				"disable-outside-scroll": true,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false)),
				onFocusOutside: _cache[1] || (_cache[1] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus", "disable-outside-pointer-events"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentNonModal.js
var MenuRootContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				"disable-outside-scroll": false,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContent.js
var MenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(MenuRootContentModal_default, normalizeProps(mergeProps({ key: 0 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(MenuRootContentNonModal_default, normalizeProps(mergeProps({ key: 1 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuGroup.js
var [injectMenuGroupContext, provideMenuGroupContext] = /*#__PURE__*/ createContext("MenuGroup");
var MenuGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuGroup",
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
		const id = useId$1(void 0, "reka-menu-group");
		provideMenuGroupContext({ id });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props, { "aria-labelledby": unref(id) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuLabel.js
var MenuLabel_default = /* @__PURE__ */ defineComponent({
	__name: "MenuLabel",
	props: {
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
		const groupContext = injectMenuGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id || void 0 }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuPortal.js
var MenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioGroup.js
var [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = /*#__PURE__*/ createContext("MenuRadioGroup");
var MenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioGroup",
	props: {
		modelValue: {
			type: null,
			required: false,
			default: ""
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, ["modelValue"]);
		const forwarded = useForwardProps$1(delegatedProps);
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuRadioGroupContext({
			modelValue,
			onValueChange: (payload) => {
				modelValue.value = payload;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuGroup_default, normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioItem.js
var MenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, ["value"]);
		const forwarded = useForwardProps$1(delegatedProps);
		const { value } = toRefs(props);
		const radioGroupContext = injectMenuRadioGroupContext();
		const modelValue = computed(() => radioGroupContext.modelValue.value === value?.value);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemradio" }, unref(forwarded), {
				"aria-checked": modelValue.value,
				"data-state": unref(getCheckedState)(modelValue.value),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					unref(radioGroupContext).onValueChange(unref(value));
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSeparator.js
var MenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSeparator",
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				role: "separator",
				"aria-orientation": "horizontal"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSub.js
var [injectMenuSubContext, provideMenuSubContext] = /*#__PURE__*/ createContext("MenuSub");
var MenuSub_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSub",
	props: { open: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: false,
			passive: props.open === void 0
		});
		const parentMenuContext = injectMenuContext();
		const trigger = ref();
		const content = ref();
		watchEffect((cleanupFn) => {
			if (parentMenuContext?.open.value === false) open.value = false;
			cleanupFn(() => open.value = false);
		});
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuSubContext({
			triggerId: "",
			contentId: "",
			trigger,
			onTriggerChange: (element) => {
				trigger.value = element;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubContent.js
var MenuSubContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
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
			required: false,
			default: true
		},
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const menuSubContext = injectMenuSubContext();
		const parentContentContext = injectMenuContentContext();
		const { forwardRef, currentElement: subContentElement } = useForwardExpose();
		menuSubContext.contentId ||= useId$1(void 0, "reka-menu-sub-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [createVNode(MenuContentImpl_default, mergeProps(unref(forwarded), {
					id: unref(menuSubContext).contentId,
					ref: unref(forwardRef),
					"aria-labelledby": unref(menuSubContext).triggerId,
					align: "start",
					side: unref(rootContext).dir.value === "rtl" ? "left" : "right",
					"disable-outside-pointer-events": false,
					"disable-outside-scroll": false,
					"trap-focus": false,
					onOpenAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (unref(rootContext).isUsingKeyboardRef.value) unref(subContentElement)?.focus();
					}, ["prevent"])),
					onCloseAutoFocus: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"])),
					onFocusOutside: _cache[2] || (_cache[2] = (event) => {
						if (event.defaultPrevented) return;
						const isMovingToParentContent = unref(parentContentContext).filterElement.value?.contains(event.target);
						if (event.target !== unref(menuSubContext).trigger.value && !isMovingToParentContent) unref(menuContext).onOpenChange(false);
					}),
					onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
						unref(rootContext).onClose();
						event.preventDefault();
					}),
					onKeydown: _cache[4] || (_cache[4] = (event) => {
						const isKeyDownInside = event.currentTarget?.contains(event.target);
						const isCloseKey = unref(SUB_CLOSE_KEYS)[unref(rootContext).dir.value].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							unref(menuContext).onOpenChange(false);
							if (unref(parentContentContext).filterElement.value) {
								unref(parentContentContext).filterElement.value.focus();
								unref(parentContentContext).highlightedElement.value = unref(menuSubContext).trigger.value;
								unref(menuSubContext).trigger.value?.scrollIntoView({ block: "nearest" });
							} else unref(menuSubContext).trigger.value?.focus();
							event.preventDefault();
						}
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-labelledby",
					"side"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubTrigger.js
var MenuSubTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	setup(__props) {
		const props = __props;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const subContext = injectMenuSubContext();
		const contentContext = injectMenuContentContext();
		watch(menuContext.open, (open) => {
			if (open) contentContext.activeSubmenuContext.value = {
				onOpenChange: menuContext.onOpenChange,
				trigger: subContext.trigger
			};
			else if (contentContext.activeSubmenuContext.value?.trigger.value === subContext.trigger.value) contentContext.activeSubmenuContext.value = void 0;
		});
		const openTimerRef = ref(null);
		subContext.triggerId ||= useId$1(void 0, "reka-menu-sub-trigger");
		function clearOpenTimer() {
			if (openTimerRef.value) (void 0).clearTimeout(openTimerRef.value);
			openTimerRef.value = null;
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			if (contentContext.onItemEnter(event)) return;
			if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
				contentContext.onPointerGraceIntentChange(null);
				openTimerRef.value = (void 0).setTimeout(() => {
					menuContext.onOpenChange(true);
					clearOpenTimer();
				}, 100);
			}
		}
		async function handlePointerLeave(event) {
			if (!isMouseEvent(event)) return;
			clearOpenTimer();
			const contentRect = menuContext.content.value?.getBoundingClientRect();
			if (contentRect?.width) {
				const side = menuContext.content.value?.dataset.side;
				const rightSide = side === "right";
				const bleed = rightSide ? -5 : 5;
				const contentNearEdge = contentRect[rightSide ? "left" : "right"];
				const contentFarEdge = contentRect[rightSide ? "right" : "left"];
				contentContext.onPointerGraceIntentChange({
					area: [
						{
							x: event.clientX + bleed,
							y: event.clientY
						},
						{
							x: contentNearEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.bottom
						},
						{
							x: contentNearEdge,
							y: contentRect.bottom
						}
					],
					side
				});
				(void 0).clearTimeout(contentContext.pointerGraceTimerRef.value);
				contentContext.pointerGraceTimerRef.value = (void 0).setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
			} else {
				if (contentContext.onTriggerLeave(event)) return;
				contentContext.onPointerGraceIntentChange(null);
			}
		}
		async function handleKeyDown(event) {
			const isTypingAhead = contentContext.searchRef.value !== "";
			if (props.disabled || isTypingAhead && event.key === " ") return;
			if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
				menuContext.onOpenChange(true);
				await nextTick();
				menuContext.content.value?.focus();
				event.preventDefault();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuAnchor_default, { "as-child": "" }, {
				default: withCtx(() => [createVNode(MenuItemImpl_default, mergeProps(props, {
					id: unref(subContext).triggerId,
					ref: (vnode) => {
						if (!vnode) return void 0;
						unref(subContext)?.onTriggerChange(vnode?.$el);
					},
					"aria-haspopup": "menu",
					"aria-expanded": unref(menuContext).open.value,
					"aria-controls": unref(subContext).contentId,
					"data-state": unref(getOpenState)(unref(menuContext).open.value),
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (props.disabled || event.defaultPrevented) return;
						/**
						* We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
						* and we rely heavily on `onFocusOutside` for submenus to close when switching
						* between separate submenus.
						*/
						event.currentTarget?.focus();
						if (!unref(menuContext).open.value) unref(menuContext).onOpenChange(true);
					}),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-expanded",
					"aria-controls",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [injectPopoverRootContext, providePopoverRootContext] = /*#__PURE__*/ createContext("PopoverRoot");
var PopoverRoot_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { modal } = toRefs(props);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		providePopoverRootContext({
			contentId: "",
			triggerId: "",
			modal,
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerElement: ref(),
			hasCustomAnchor: ref(false)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					open: unref(open),
					close: () => open.value = false
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverAnchor.js
var PopoverAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverAnchor",
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
		const props = __props;
		useForwardExpose();
		injectPopoverRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverArrow.js
var PopoverArrow_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverArrow",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverClose.js
var PopoverClose_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverClose",
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
		const rootContext = injectPopoverRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentImpl.js
var PopoverContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps$1(reactiveOmit(props, "trapFocus", "disableOutsidePointerEvents"));
		const { forwardRef } = useForwardExpose();
		const rootContext = injectPopoverRootContext();
		useFocusGuards();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: _ctx.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
					onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onDismiss: _cache[4] || (_cache[4] = ($event) => unref(rootContext).onOpenChange(false))
				}, {
					default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps(unref(forwarded), {
						id: unref(rootContext).contentId,
						ref: unref(forwardRef),
						"data-state": unref(rootContext).open.value ? "open" : "closed",
						"aria-labelledby": unref(rootContext).triggerId,
						style: {
							"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
							"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
							"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
							"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
							"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
						},
						role: "dialog"
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"aria-labelledby"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentModal.js
var PopoverContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentModal",
	props: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const isRightClickOutsideRef = ref(false);
		useBodyScrollLock(true);
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(rootContext).open.value,
				"disable-outside-pointer-events": "",
				onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
					emits("closeAutoFocus", event);
					if (!isRightClickOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
				}, ["prevent"])),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					emits("pointerDownOutside", event);
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					isRightClickOutsideRef.value = isRightClick;
				}),
				onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentNonModal.js
var PopoverContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentNonModal",
	props: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const hasInteractedOutsideRef = ref(false);
		const hasPointerDownOutsideRef = ref(false);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					emits("closeAutoFocus", event);
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
					emits("interactOutside", event);
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					if (unref(rootContext).triggerElement.value?.contains(target)) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContent.js
var PopoverContent_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContent",
	props: {
		forceMount: {
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
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		rootContext.contentId ||= useId$1(void 0, "reka-popover-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(PopoverContentModal_default, mergeProps({ key: 0 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(PopoverContentNonModal_default, mergeProps({ key: 1 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverPortal.js
var PopoverPortal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverTrigger.js
var PopoverTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverTrigger",
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
		const rootContext = injectPopoverRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.triggerId ||= useId$1(void 0, "reka-popover-trigger");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).hasCustomAnchor.value ? unref(Primitive) : unref(PopperAnchor_default)), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-haspopup": "dialog",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).contentId,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					as: _ctx.as,
					"as-child": props.asChild,
					onClick: unref(rootContext).onOpenToggle
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"aria-expanded",
					"aria-controls",
					"data-state",
					"as",
					"as-child",
					"onClick"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/useRangeCalendar.js
function useRangeCalendarState(props) {
	const isStartInvalid = computed(() => {
		if (!props.start.value) return false;
		if (props.isDateDisabled(props.start.value)) return true;
		return false;
	});
	const isEndInvalid = computed(() => {
		if (!props.end.value) return false;
		if (props.isDateDisabled(props.end.value)) return true;
		return false;
	});
	const isInvalid = computed(() => {
		if (isStartInvalid.value || isEndInvalid.value) return true;
		if (props.start.value && props.end.value && isBefore(props.end.value, props.start.value)) return true;
		return false;
	});
	const isSelectionStart = (date) => {
		if (!props.start.value) return false;
		return isSameDay(props.start.value, date);
	};
	const isSelectionEnd = (date) => {
		if (!props.end.value) return false;
		return isSameDay(props.end.value, date);
	};
	const isSelected = (date) => {
		if (props.start.value && isSameDay(props.start.value, date)) return true;
		if (props.end.value && isSameDay(props.end.value, date)) return true;
		if (props.end.value && props.start.value) return isBetween(date, props.start.value, props.end.value);
		return false;
	};
	const rangeIsDateDisabled = (date) => {
		if (props.isDateDisabled(date)) return true;
		if (props.maximumDays?.value) {
			if (props.start.value && props.end.value) {
				if (props.fixedDate.value) {
					const diff = getDaysBetween(props.start.value, props.end.value).length;
					if (diff <= props.maximumDays.value) {
						const daysLeft = props.maximumDays.value - diff - 1;
						return !isBetween(date, props.start.value.subtract({ days: daysLeft }), props.end.value.add({ days: daysLeft }));
					}
				}
				return false;
			}
			if (props.start.value) {
				const maxDate = props.start.value.add({ days: props.maximumDays.value });
				return !isBetween(date, props.start.value.subtract({ days: props.maximumDays.value }), maxDate);
			}
		}
		return false;
	};
	const isDateHighlightable = (date) => {
		if (props.isDateHighlightable?.(date)) return true;
		return false;
	};
	const highlightedRange = computed(() => {
		if (props.start.value && props.end.value && !props.fixedDate.value) return null;
		if (!props.start.value || !props.focusedValue.value) return null;
		const isStartBeforeFocused = isBefore(props.start.value, props.focusedValue.value);
		const start = isStartBeforeFocused ? props.start.value : props.focusedValue.value;
		const end = isStartBeforeFocused ? props.focusedValue.value : props.start.value;
		if (isSameDay(start, end)) return {
			start,
			end
		};
		if (props.maximumDays?.value && !props.end.value) {
			const maximumDays = props.maximumDays.value;
			const anchor = props.start.value;
			const focused = props.focusedValue.value;
			if (!isBefore(focused, anchor)) return {
				start: anchor,
				end: anchor.add({ days: maximumDays - 1 })
			};
			return {
				start: anchor.subtract({ days: maximumDays - 1 }),
				end: anchor
			};
		}
		if (areAllDaysBetweenValid(start, end, props.allowNonContiguousRanges.value ? () => false : props.isDateUnavailable, rangeIsDateDisabled, props.isDateHighlightable)) return {
			start,
			end
		};
		return null;
	});
	const isHighlightedStart = (date) => {
		if (!highlightedRange.value || !highlightedRange.value.start) return false;
		return isSameDay(highlightedRange.value.start, date);
	};
	const isHighlightedEnd = (date) => {
		if (!highlightedRange.value || !highlightedRange.value.end) return false;
		return isSameDay(highlightedRange.value.end, date);
	};
	const hasSelectedDate = computed(() => {
		return !!(props.start.value || props.end.value);
	});
	const isStartDateDisabled = computed(() => {
		return !!(props.start.value && props.isDateDisabled(props.start.value));
	});
	const isEndDateDisabled = computed(() => {
		return !!(props.end.value && props.isDateDisabled(props.end.value));
	});
	return {
		isInvalid,
		isSelected,
		isDateHighlightable,
		highlightedRange,
		isSelectionStart,
		isSelectionEnd,
		isHighlightedStart,
		isHighlightedEnd,
		isDateDisabled: rangeIsDateDisabled,
		hasSelectedDate,
		isSelectedDisabled: computed(() => {
			const hasStart = !!props.start.value;
			const hasEnd = !!props.end.value;
			if (!hasStart && !hasEnd) return false;
			if (hasStart && hasEnd) return isStartDateDisabled.value && isEndDateDisabled.value;
			return hasStart && isStartDateDisabled.value || hasEnd && isEndDateDisabled.value;
		}),
		selectedFocusableDate: computed(() => {
			if (props.start.value && !isStartDateDisabled.value) return props.start.value;
			if (props.end.value && !isEndDateDisabled.value) return props.end.value;
		})
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarRoot.js
var _hoisted_1$4 = { style: {
	"border": "0px",
	"clip": "rect(0px, 0px, 0px, 0px)",
	"clip-path": "inset(50%)",
	"height": "1px",
	"margin": "-1px",
	"overflow": "hidden",
	"padding": "0px",
	"position": "absolute",
	"white-space": "nowrap",
	"width": "1px"
} };
var _hoisted_2$4 = {
	role: "heading",
	"aria-level": "2"
};
var [injectRangeCalendarRootContext, provideRangeCalendarRootContext] = /*#__PURE__*/ createContext("RangeCalendarRoot");
var RangeCalendarRoot_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarRoot",
	props: {
		defaultPlaceholder: {
			type: null,
			required: false
		},
		defaultValue: {
			type: Object,
			required: false,
			default: () => ({
				start: void 0,
				end: void 0
			})
		},
		modelValue: {
			type: [Object, null],
			required: false
		},
		placeholder: {
			type: null,
			required: false,
			default: void 0
		},
		allowNonContiguousRanges: {
			type: Boolean,
			required: false,
			default: false
		},
		pagedNavigation: {
			type: Boolean,
			required: false,
			default: false
		},
		preventDeselect: {
			type: Boolean,
			required: false,
			default: false
		},
		maximumDays: {
			type: Number,
			required: false,
			default: void 0
		},
		weekStartsOn: {
			type: Number,
			required: false
		},
		weekdayFormat: {
			type: String,
			required: false,
			default: "narrow"
		},
		calendarLabel: {
			type: String,
			required: false
		},
		fixedWeeks: {
			type: Boolean,
			required: false,
			default: false
		},
		maxValue: {
			type: null,
			required: false
		},
		minValue: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		numberOfMonths: {
			type: Number,
			required: false,
			default: 1
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		initialFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		isDateDisabled: {
			type: Function,
			required: false,
			default: void 0
		},
		isDateUnavailable: {
			type: Function,
			required: false,
			default: void 0
		},
		isDateHighlightable: {
			type: Function,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
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
			required: false,
			default: false
		},
		fixedDate: {
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
	emits: [
		"update:modelValue",
		"update:validModelValue",
		"update:placeholder",
		"update:startValue"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, initialFocus, pagedNavigation, weekdayFormat, fixedWeeks, numberOfMonths, preventDeselect, isDateUnavailable: propsIsDateUnavailable, isDateHighlightable: propsIsDateHighlightable, isDateDisabled: propsIsDateDisabled, calendarLabel, maxValue, minValue, dir: propDir, locale: propLocale, nextPage: propsNextPage, prevPage: propsPrevPage, allowNonContiguousRanges, disableDaysOutsideCurrentView, fixedDate, maximumDays } = toRefs(props);
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const dir = useDirection(propDir);
		const locale = useLocale(propLocale);
		const weekStartsOn = computed(() => props.weekStartsOn ?? getWeekStartsOn(locale.value));
		const lastPressedDateValue = ref();
		const focusedValue = ref();
		const isEditing = ref(false);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? {
				start: void 0,
				end: void 0
			},
			passive: props.modelValue === void 0
		});
		const normalizeRange = (value) => value ?? {
			start: void 0,
			end: void 0
		};
		const normalizedModelValue = computed(() => normalizeRange(modelValue.value));
		const validModelValue = ref(normalizeRange(modelValue.value));
		watch(validModelValue, (value) => {
			emits("update:validModelValue", value);
		});
		const defaultDate = getDefaultDate({
			defaultPlaceholder: props.placeholder,
			defaultValue: normalizeRange(modelValue.value).start,
			locale: props.locale
		});
		const startValue = ref(normalizeRange(modelValue.value).start);
		const endValue = ref(normalizeRange(modelValue.value).end);
		const placeholder = useVModel(props, "placeholder", emits, {
			defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
			passive: props.placeholder === void 0
		});
		function onPlaceholderChange(value) {
			placeholder.value = value.copy();
		}
		const { fullCalendarLabel, headingValue, isDateDisabled, isDateUnavailable, isNextButtonDisabled, isPrevButtonDisabled, grid, weekdays, isOutsideVisibleView, nextPage, prevPage, formatter, isPlaceholderFocusable, firstFocusableDate } = useCalendar({
			locale,
			placeholder,
			weekStartsOn,
			fixedWeeks,
			numberOfMonths,
			minValue,
			maxValue,
			disabled,
			weekdayFormat,
			pagedNavigation,
			isDateDisabled: propsIsDateDisabled.value,
			isDateUnavailable: propsIsDateUnavailable.value,
			calendarLabel,
			nextPage: propsNextPage,
			prevPage: propsPrevPage
		});
		const { isInvalid, isSelected, isDateHighlightable, highlightedRange, isSelectionStart, isSelectionEnd, isHighlightedStart, isHighlightedEnd, isDateDisabled: rangeIsDateDisabled, hasSelectedDate, isSelectedDisabled, selectedFocusableDate } = useRangeCalendarState({
			start: startValue,
			end: endValue,
			isDateDisabled,
			isDateUnavailable,
			isDateHighlightable: propsIsDateHighlightable.value,
			focusedValue,
			allowNonContiguousRanges,
			fixedDate,
			maximumDays
		});
		watch(modelValue, (_modelValue) => {
			const next = normalizeRange(_modelValue);
			if (!(!next.start && !startValue.value || !!next.start && !!startValue.value && isEqualDay(next.start, startValue.value))) startValue.value = next.start?.copy?.();
			if (!(!next.end && !endValue.value || !!next.end && !!endValue.value && isEqualDay(next.end, endValue.value))) endValue.value = next.end?.copy?.();
		});
		watch(startValue, (_startValue) => {
			if (_startValue && !isEqualDay(_startValue, placeholder.value)) onPlaceholderChange(_startValue);
			emits("update:startValue", _startValue);
		});
		watch([startValue, endValue], ([_startValue, _endValue]) => {
			const value = modelValue.value;
			if (value && value.start && value.end && _startValue && _endValue && isEqualDay(value.start, _startValue) && isEqualDay(value.end, _endValue)) return;
			isEditing.value = true;
			if (_endValue && _startValue) {
				const nextValue = isBefore(_endValue, _startValue) ? {
					start: _endValue.copy(),
					end: _startValue.copy()
				} : {
					start: _startValue.copy(),
					end: _endValue.copy()
				};
				modelValue.value = {
					start: nextValue.start,
					end: nextValue.end
				};
				isEditing.value = false;
				validModelValue.value = {
					start: nextValue.start.copy(),
					end: nextValue.end.copy()
				};
			} else modelValue.value = _startValue ? {
				start: _startValue.copy(),
				end: void 0
			} : {
				start: _endValue?.copy(),
				end: void 0
			};
		});
		const kbd = useKbd();
		useEventListener(parentElement, "keydown", (ev) => {
			if (ev.key === kbd.ESCAPE && isEditing.value) {
				startValue.value = validModelValue.value.start?.copy();
				endValue.value = validModelValue.value.end?.copy();
			}
		});
		provideRangeCalendarRootContext({
			isDateUnavailable,
			isDateHighlightable,
			startValue,
			endValue,
			formatter,
			modelValue: normalizedModelValue,
			placeholder,
			disabled,
			initialFocus,
			pagedNavigation,
			grid,
			weekDays: weekdays,
			weekStartsOn,
			weekdayFormat,
			fixedWeeks,
			numberOfMonths,
			readonly,
			preventDeselect,
			fullCalendarLabel,
			headingValue,
			isInvalid,
			isDateDisabled: rangeIsDateDisabled,
			allowNonContiguousRanges,
			highlightedRange,
			focusedValue,
			lastPressedDateValue,
			isSelected,
			isSelectionEnd,
			isSelectionStart,
			isNextButtonDisabled,
			isPrevButtonDisabled,
			isOutsideVisibleView,
			nextPage,
			prevPage,
			parentElement,
			onPlaceholderChange,
			locale,
			dir,
			isHighlightedStart,
			isHighlightedEnd,
			disableDaysOutsideCurrentView,
			fixedDate,
			maximumDays,
			minValue,
			maxValue,
			isPlaceholderFocusable,
			firstFocusableDate,
			hasSelectedDate,
			isSelectedDisabled,
			selectedFocusableDate
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-label": unref(fullCalendarLabel),
				"data-readonly": unref(readonly) ? "" : void 0,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-invalid": unref(isInvalid) ? "" : void 0,
				dir: unref(dir)
			}, {
				default: withCtx(() => [createElementVNode("div", _hoisted_1$4, [createElementVNode("div", _hoisted_2$4, toDisplayString(unref(fullCalendarLabel)), 1)]), renderSlot(_ctx.$slots, "default", {
					date: unref(placeholder),
					grid: unref(grid),
					weekDays: unref(weekdays),
					weekStartsOn: weekStartsOn.value,
					locale: unref(locale),
					fixedWeeks: unref(fixedWeeks),
					modelValue: normalizedModelValue.value
				})]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"data-readonly",
				"data-disabled",
				"data-invalid",
				"dir"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarCell.js
var RangeCalendarCell_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarCell",
	props: {
		date: {
			type: null,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "td"
		}
	},
	setup(__props) {
		const rootContext = injectRangeCalendarRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "gridcell",
				"aria-selected": unref(rootContext).isSelected(_ctx.date) ? true : void 0,
				"aria-disabled": unref(rootContext).isDateDisabled(_ctx.date) || unref(rootContext).isDateUnavailable?.(_ctx.date) || unref(rootContext).disableDaysOutsideCurrentView.value,
				"data-disabled": unref(rootContext).isDateDisabled(_ctx.date) || unref(rootContext).disableDaysOutsideCurrentView.value ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-selected",
				"aria-disabled",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarCellTrigger.js
var RangeCalendarCellTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarCellTrigger",
	props: {
		day: {
			type: null,
			required: true
		},
		month: {
			type: null,
			required: true
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
		const rootContext = injectRangeCalendarRootContext();
		const kbd = useKbd();
		const { primitiveElement} = usePrimitiveElement();
		const labelText = computed(() => rootContext.formatter.custom(toDate(props.day), {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric"
		}));
		const isUnavailable = computed(() => rootContext.isDateUnavailable?.(props.day) ?? false);
		const isSelectedDate = computed(() => rootContext.isSelected(props.day));
		const isSelectionStart = computed(() => rootContext.isSelectionStart(props.day));
		const isSelectionEnd = computed(() => rootContext.isSelectionEnd(props.day));
		const isHighlightStart = computed(() => rootContext.isHighlightedStart(props.day));
		const isHighlightEnd = computed(() => rootContext.isHighlightedEnd(props.day));
		const isHighlighted = computed(() => rootContext.highlightedRange.value ? isBetweenInclusive(props.day, rootContext.highlightedRange.value.start, rootContext.highlightedRange.value.end) : false);
		const allowNonContiguousRanges = computed(() => rootContext.allowNonContiguousRanges.value);
		const isDateToday = computed(() => {
			return isToday(props.day, getLocalTimeZone());
		});
		const isOutsideView = computed(() => {
			return !isSameMonth(props.day, props.month);
		});
		const isOutsideVisibleView = computed(() => rootContext.isOutsideVisibleView(props.day));
		const isDisabled = computed(() => rootContext.isDateDisabled(props.day) || rootContext.disableDaysOutsideCurrentView.value && isOutsideView.value);
		const dayValue = computed(() => props.day.day.toLocaleString(rootContext.locale.value));
		const isFocusedDate = computed(() => {
			if (isOutsideView.value || isDisabled.value) return false;
			if (!rootContext.disabled.value && rootContext.isPlaceholderFocusable.value && isSameDay(props.day, rootContext.placeholder.value)) return true;
			if (!rootContext.disabled.value && rootContext.selectedFocusableDate.value && !rootContext.isPlaceholderFocusable.value) return isSameDay(props.day, rootContext.selectedFocusableDate.value);
			if (!rootContext.disabled.value && (!rootContext.hasSelectedDate.value || rootContext.isSelectedDisabled.value) && !rootContext.isPlaceholderFocusable.value) return rootContext.firstFocusableDate.value && isSameDay(props.day, rootContext.firstFocusableDate.value);
			return false;
		});
		function changeDate(e, date) {
			if (rootContext.readonly.value) return;
			if (rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)) return;
			if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
				if (isSameDay(date, rootContext.startValue.value) && !rootContext.preventDeselect.value && !rootContext.endValue.value) {
					rootContext.startValue.value = void 0;
					rootContext.onPlaceholderChange(date);
					rootContext.lastPressedDateValue.value = date.copy();
					return;
				} else if (!rootContext.endValue.value) {
					e.preventDefault();
					if (rootContext.lastPressedDateValue.value && isSameDay(rootContext.lastPressedDateValue.value, date)) rootContext.startValue.value = date.copy();
					rootContext.lastPressedDateValue.value = date.copy();
					return;
				}
			}
			rootContext.lastPressedDateValue.value = date.copy();
			if (rootContext.startValue.value && rootContext.endValue.value && isSameDay(rootContext.startValue.value, rootContext.endValue.value) && isSameDay(rootContext.startValue.value, date) && !rootContext.preventDeselect.value) {
				rootContext.startValue.value = void 0;
				rootContext.endValue.value = void 0;
				rootContext.onPlaceholderChange(date);
				return;
			}
			if (!rootContext.startValue.value) rootContext.startValue.value = date.copy();
			else if (!rootContext.endValue.value) rootContext.endValue.value = date.copy();
			else if (rootContext.endValue.value && rootContext.startValue.value) {
				if (!rootContext.fixedDate.value) {
					rootContext.endValue.value = void 0;
					rootContext.startValue.value = date.copy();
				} else if (rootContext.fixedDate.value === "start") if (date.compare(rootContext.startValue.value) < 0) rootContext.startValue.value = date.copy();
				else rootContext.endValue.value = date.copy();
				else if (rootContext.fixedDate.value === "end") if (date.compare(rootContext.endValue.value) > 0) rootContext.endValue.value = date.copy();
				else rootContext.startValue.value = date.copy();
			}
		}
		function handleClick(e) {
			if (isDisabled.value) return;
			changeDate(e, props.day);
		}
		function handleFocus() {
			if (isDisabled.value || rootContext.isDateUnavailable?.(props.day)) return;
			rootContext.focusedValue.value = props.day.copy();
		}
		function handleArrowKey(e) {
			if (isDisabled.value) return;
			if ((e.code === kbd.ENTER || e.code === kbd.SPACE_CODE) && (e.ctrlKey || e.metaKey || e.altKey)) return;
			e.preventDefault();
			e.stopPropagation();
			const parentElement = rootContext.parentElement.value;
			const indexIncrementation = 7;
			const sign = rootContext.dir.value === "rtl" ? -1 : 1;
			switch (e.code) {
				case kbd.ARROW_RIGHT:
					shiftFocus(props.day, sign);
					break;
				case kbd.ARROW_LEFT:
					shiftFocus(props.day, -sign);
					break;
				case kbd.ARROW_UP:
					shiftFocus(props.day, -7);
					break;
				case kbd.ARROW_DOWN:
					shiftFocus(props.day, indexIncrementation);
					break;
				case kbd.ENTER:
				case kbd.SPACE_CODE: changeDate(e, props.day);
			}
			function shiftFocus(day, add) {
				const candidateDayValue = day.add({ days: add });
				if (rootContext.minValue.value && candidateDayValue.compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && candidateDayValue.compare(rootContext.maxValue.value) > 0) return;
				const candidateDay = parentElement.querySelector(`[data-value='${candidateDayValue.toString()}']:not([data-outside-view])`);
				if (!candidateDay) {
					if (add > 0) {
						if (rootContext.isNextButtonDisabled()) return;
						rootContext.nextPage();
					} else {
						if (rootContext.isPrevButtonDisabled()) return;
						rootContext.prevPage();
					}
					nextTick(() => {
						shiftFocus(day, add);
					});
					return;
				}
				if (candidateDay && candidateDay.hasAttribute("data-disabled")) return shiftFocus(candidateDayValue, add);
				rootContext.onPlaceholderChange(candidateDayValue);
				candidateDay?.focus();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "button",
				"aria-label": labelText.value,
				"data-reka-calendar-cell-trigger": "",
				"aria-pressed": isSelectedDate.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? true : void 0,
				"aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
				"data-highlighted": isHighlighted.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? "" : void 0,
				"data-selection-start": isSelectionStart.value ? true : void 0,
				"data-selection-end": isSelectionEnd.value ? true : void 0,
				"data-highlighted-start": isHighlightStart.value ? true : void 0,
				"data-highlighted-end": isHighlightEnd.value ? true : void 0,
				"data-selected": isSelectedDate.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? true : void 0,
				"data-outside-visible-view": isOutsideVisibleView.value ? "" : void 0,
				"data-value": _ctx.day.toString(),
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-unavailable": isUnavailable.value ? "" : void 0,
				"data-today": isDateToday.value ? "" : void 0,
				"data-outside-view": isOutsideView.value ? "" : void 0,
				"data-focused": isFocusedDate.value ? "" : void 0,
				tabindex: isFocusedDate.value ? 0 : isOutsideView.value || isDisabled.value ? void 0 : -1,
				onClick: handleClick,
				onFocusin: handleFocus,
				onMouseenter: handleFocus,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"enter",
					"space"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					dayValue: dayValue.value,
					disabled: isDisabled.value,
					today: isDateToday.value,
					selected: isSelectedDate.value,
					outsideView: isOutsideView.value,
					outsideVisibleView: isOutsideVisibleView.value,
					unavailable: isUnavailable.value,
					highlighted: isHighlighted.value && (allowNonContiguousRanges.value || !isUnavailable.value),
					highlightedStart: isHighlightStart.value,
					highlightedEnd: isHighlightEnd.value,
					selectionStart: isSelectionStart.value,
					selectionEnd: isSelectionEnd.value
				}, () => [createTextVNode(toDisplayString(dayValue.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"aria-pressed",
				"aria-disabled",
				"data-highlighted",
				"data-selection-start",
				"data-selection-end",
				"data-highlighted-start",
				"data-highlighted-end",
				"data-selected",
				"data-outside-visible-view",
				"data-value",
				"data-disabled",
				"data-unavailable",
				"data-today",
				"data-outside-view",
				"data-focused",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarGrid.js
var RangeCalendarGrid_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarGrid",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "table"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectRangeCalendarRootContext();
		const disabled = computed(() => rootContext.disabled.value ? true : void 0);
		const readonly = computed(() => rootContext.readonly.value ? true : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				tabindex: "-1",
				role: "application",
				"aria-readonly": readonly.value,
				"aria-disabled": disabled.value,
				"data-readonly": readonly.value && "",
				"data-disabled": disabled.value && "",
				onMouseleave: _cache[0] || (_cache[0] = ($event) => unref(rootContext).focusedValue.value = void 0)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-readonly",
				"aria-disabled",
				"data-readonly",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarGridBody.js
var RangeCalendarGridBody_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarGridBody",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tbody"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarGridHead.js
var RangeCalendarGridHead_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarGridHead",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "thead"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "aria-hidden": "true" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarGridRow.js
var RangeCalendarGridRow_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarGridRow",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tr"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarHeadCell.js
var RangeCalendarHeadCell_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarHeadCell",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "th"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarHeader.js
var RangeCalendarHeader_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarHeader",
	props: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarHeading.js
var RangeCalendarHeading_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarHeading",
	props: {
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
		const rootContext = injectRangeCalendarRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "data-disabled": unref(rootContext).disabled.value ? "" : void 0 }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { headingValue: unref(rootContext).headingValue.value }, () => [createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)])]),
				_: 3
			}, 16, ["data-disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarNext.js
var RangeCalendarNext_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarNext",
	props: {
		nextPage: {
			type: Function,
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
		const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
		const rootContext = injectRangeCalendarRootContext();
		function handleClick() {
			if (disabled.value) return;
			rootContext.nextPage(props.nextPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Next page",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Next page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/RangeCalendar/RangeCalendarPrev.js
var RangeCalendarPrev_default = /* @__PURE__ */ defineComponent({
	__name: "RangeCalendarPrev",
	props: {
		prevPage: {
			type: Function,
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
		const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
		const rootContext = injectRangeCalendarRootContext();
		function handleClick() {
			if (disabled.value) return;
			rootContext.prevPage(props.prevPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Previous page",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Prev page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuArrow.js
var DropdownMenuArrow_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuArrow",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuCheckboxItem.js
var DropdownMenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuCheckboxItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRoot.js
var [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = /*#__PURE__*/ createContext("DropdownMenuRoot");
var DropdownMenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const { modal, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		provideDropdownMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerId: "",
			triggerElement,
			contentId: "",
			modal,
			dir
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRoot_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
				dir: unref(dir),
				modal: unref(modal)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuContent.js
var DropdownMenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectDropdownMenuRootContext();
		const hasInteractedOutsideRef = ref(false);
		function handleCloseAutoFocus(event) {
			if (event.defaultPrevented) return;
			if (!hasInteractedOutsideRef.value) setTimeout(() => {
				rootContext.triggerElement.value?.focus();
			}, 0);
			hasInteractedOutsideRef.value = false;
			event.preventDefault();
		}
		rootContext.contentId ||= useId$1(void 0, "reka-dropdown-menu-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
				id: unref(rootContext).contentId,
				"aria-labelledby": unref(rootContext)?.triggerId,
				style: {
					"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: handleCloseAutoFocus,
				onInteractOutside: _cache[0] || (_cache[0] = (event) => {
					if (event.defaultPrevented) return;
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (!unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
					if (unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id", "aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuFilter.js
var DropdownMenuFilter_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuFilter",
	props: {
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
		const modelValue = useVModel(props, "modelValue", __emit, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		injectMenuSubContext(null);
		watch(modelValue, (v) => {
			contentContext.searchRef.value = v ?? "";
		}, { immediate: true });
		const { primitiveElement} = usePrimitiveElement();
		const disabled = computed(() => props.disabled || false);
		const activedescendant = ref();
		watchSyncEffect(() => activedescendant.value = contentContext.highlightedElement.value?.id);
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing((event) => {
			const el = event.target;
			if (el) {
				modelValue.value = el.value;
				contentContext.searchRef.value = el.value;
			}
		});
		function handleInput(event) {
			if (disabled.value) return;
			if (isComposing.value) return;
			const target = event.target;
			modelValue.value = target.value;
			contentContext.searchRef.value = target.value;
		}
		function handleKeyDown(event) {
			if (disabled.value) return;
			if (isComposing.value) {
				event.stopPropagation();
				return;
			}
			if ([
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(event.key)) {
				event.preventDefault();
				contentContext.onKeydownNavigation(event);
			} else if (event.key === "Enter") {
				event.preventDefault();
				contentContext.onKeydownEnter(event);
			} else if (event.key === "Escape" && modelValue.value) {
				event.stopPropagation();
				modelValue.value = "";
				contentContext.searchRef.value = "";
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: unref(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ? true : void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				role: "searchbox",
				onInput: handleInput,
				onKeydown: handleKeyDown,
				onCompositionstart: unref(handleCompositionStart),
				onCompositionend: unref(handleCompositionEnd)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuGroup.js
var DropdownMenuGroup_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuGroup",
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
			return openBlock(), createBlock(unref(MenuGroup_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItem.js
var DropdownMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItemIndicator.js
var DropdownMenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItemIndicator",
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
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItemIndicator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuLabel.js
var DropdownMenuLabel_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuLabel",
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
			return openBlock(), createBlock(unref(MenuLabel_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuPortal.js
var DropdownMenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuPortal",
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
			return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioGroup.js
var DropdownMenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioGroup",
	props: {
		modelValue: {
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioGroup_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioItem.js
var DropdownMenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioItem_default), normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSeparator.js
var DropdownMenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSeparator",
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
			return openBlock(), createBlock(unref(MenuSeparator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSub.js
var DropdownMenuSub_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSub",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			passive: props.open === void 0,
			defaultValue: props.defaultOpen ?? false
		});
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSub_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubContent.js
var DropdownMenuSubContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSubContent_default), mergeProps(unref(forwarded), { style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubTrigger.js
var DropdownMenuSubTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
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
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSubTrigger_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuTrigger.js
var DropdownMenuTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuTrigger",
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
		const rootContext = injectDropdownMenuRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.triggerId ||= useId$1(void 0, "reka-dropdown-menu-trigger");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuAnchor_default), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"as-child": props.asChild,
					as: _ctx.as,
					"aria-haspopup": "menu",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					disabled: _ctx.disabled,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
							unref(rootContext)?.onOpenToggle();
							await nextTick();
							if (unref(rootContext).open.value) event.preventDefault();
						}
					}),
					onKeydown: _cache[1] || (_cache[1] = withKeys((event) => {
						if (_ctx.disabled) return;
						if (["Enter", " "].includes(event.key)) unref(rootContext).onOpenToggle();
						if (event.key === "ArrowDown") unref(rootContext).onOpenChange(true);
						if ([
							"Enter",
							" ",
							"ArrowDown"
						].includes(event.key)) event.preventDefault();
					}, [
						"enter",
						"space",
						"arrow-down"
					]))
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as-child",
					"as",
					"aria-expanded",
					"aria-controls",
					"data-disabled",
					"disabled",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardArrow.js
var HoverCardArrow_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardArrow",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardRoot.js
var [injectHoverCardRootContext, provideHoverCardRootContext] = /*#__PURE__*/ createContext("HoverCardRoot");
var HoverCardRoot_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		openDelay: {
			type: Number,
			required: false,
			default: 700
		},
		closeDelay: {
			type: Number,
			required: false,
			default: 300
		},
		enableTouch: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { openDelay, closeDelay, enableTouch } = toRefs(props);
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const openTimerRef = ref(0);
		const closeTimerRef = ref(0);
		const hasSelectionRef = ref(false);
		const isPointerDownOnContentRef = ref(false);
		const isPointerInTransitRef = ref(false);
		const triggerElement = ref();
		function handleOpen() {
			clearTimeout(closeTimerRef.value);
			openTimerRef.value = (void 0).setTimeout(() => open.value = true, openDelay.value);
		}
		function handleClose() {
			clearTimeout(openTimerRef.value);
			if (!hasSelectionRef.value && !isPointerDownOnContentRef.value) closeTimerRef.value = (void 0).setTimeout(() => open.value = false, closeDelay.value);
		}
		function handleDismiss() {
			clearTimeout(openTimerRef.value);
			open.value = false;
		}
		provideHoverCardRootContext({
			open,
			onOpenChange(value) {
				open.value = value;
			},
			onOpen: handleOpen,
			onClose: handleClose,
			onDismiss: handleDismiss,
			hasSelectionRef,
			isPointerDownOnContentRef,
			isPointerInTransitRef,
			triggerElement,
			enableTouch
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/utils.js
function excludeTouch(eventHandler) {
	return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardContentImpl.js
var HoverCardContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardContentImpl",
	props: {
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
		const forwarded = useForwardProps$1(props);
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		const { isPointerInTransit, onPointerExit } = useGraceArea(rootContext.triggerElement, contentElement);
		syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: "rtl" });
		onPointerExit(() => {
			rootContext.onClose();
		});
		const containSelection = ref(false);
		let originalBodyUserSelect;
		watchEffect((cleanupFn) => {
			if (containSelection.value) {
				const body = (void 0).body;
				originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
				body.style.userSelect = "none";
				body.style.webkitUserSelect = "none";
				cleanupFn(() => {
					body.style.userSelect = originalBodyUserSelect;
					body.style.webkitUserSelect = originalBodyUserSelect;
				});
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DismissableLayer_default), {
				"as-child": "",
				"disable-outside-pointer-events": false,
				onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
				onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
				onFocusOutside: _cache[3] || (_cache[3] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"])),
				onDismiss: unref(rootContext).onDismiss
			}, {
				default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, {
					ref: unref(forwardRef),
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					style: {
						"userSelect": containSelection.value ? "text" : void 0,
						"WebkitUserSelect": containSelection.value ? "text" : void 0,
						"--reka-hover-card-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-hover-card-content-available-width": "var(--reka-popper-available-width)",
						"--reka-hover-card-content-available-height": "var(--reka-popper-available-height)",
						"--reka-hover-card-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-hover-card-trigger-height": "var(--reka-popper-anchor-height)"
					},
					onPointerdown: _cache[0] || (_cache[0] = (event) => {
						if (event.currentTarget.contains(event.target)) containSelection.value = true;
						unref(rootContext).hasSelectionRef.value = false;
						unref(rootContext).isPointerDownOnContentRef.value = true;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["data-state", "style"])]),
				_: 3
			}, 8, ["onDismiss"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardContent.js
var HoverCardContent_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardContent",
	props: {
		forceMount: {
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
		const rootContext = injectHoverCardRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [createVNode(HoverCardContentImpl_default, mergeProps(unref(forwarded), {
					ref: unref(forwardRef),
					onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(excludeTouch)(unref(rootContext).onOpen)($event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardPortal.js
var HoverCardPortal_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/HoverCard/HoverCardTrigger.js
var HoverCardTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "HoverCardTrigger",
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
			required: false,
			default: "a"
		}
	},
	setup(__props) {
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		rootContext.triggerElement = currentElement;
		function handleLeave() {
			setTimeout(() => {
				if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) rootContext.onClose();
			}, 0);
		}
		function handleTouch(event) {
			if (!rootContext.enableTouch.value || event.pointerType !== "touch") return;
			if (rootContext.open.value) rootContext.onDismiss();
			else rootContext.onOpenChange(true);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					"data-grace-area-trigger": "",
					onPointerenter: _cache[0] || (_cache[0] = ($event) => unref(excludeTouch)(unref(rootContext).onOpen)($event)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => unref(excludeTouch)(handleLeave)($event)),
					onPointerup: handleTouch,
					onFocus: _cache[2] || (_cache[2] = ($event) => unref(rootContext).onOpen()),
					onBlur: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onClose())
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"data-state"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/useMonthPicker.js
function useMonthPickerState(props) {
	function isMonthSelected(dateObj) {
		if (Array.isArray(props.date.value)) return props.date.value.some((d) => isSameYearMonth(d, dateObj));
		else if (!props.date.value) return false;
		else return isSameYearMonth(props.date.value, dateObj);
	}
	return {
		isMonthSelected,
		isInvalid: computed(() => {
			if (Array.isArray(props.date.value)) {
				if (!props.date.value.length) return false;
				for (const dateObj of props.date.value) {
					if (props.isMonthDisabled?.(dateObj)) return true;
					if (props.isMonthUnavailable?.(dateObj)) return true;
				}
			} else {
				if (!props.date.value) return false;
				if (props.isMonthDisabled?.(props.date.value)) return true;
				if (props.isMonthUnavailable?.(props.date.value)) return true;
			}
			return false;
		})
	};
}
function useMonthPicker(props) {
	const formatter = useDateFormatter(props.locale.value);
	const resolveMatcher = (matcher) => typeof matcher === "function" ? matcher : matcher?.value;
	const headingFormatOptions = computed(() => {
		const options = { calendar: props.placeholder.value.calendar.identifier };
		if (props.placeholder.value.calendar.identifier === "gregory" && props.placeholder.value.era === "BC") options.era = "short";
		return options;
	});
	const grid = ref(createMonthGrid({ dateObj: props.placeholder.value }));
	function isMonthDisabled(dateObj) {
		if (resolveMatcher(props.isMonthDisabled)?.(dateObj) || props.disabled.value) return true;
		if (props.maxValue.value && isAfter(dateObj.set({ day: 1 }), props.maxValue.value)) return true;
		if (props.minValue.value && isBefore(endOfMonth(dateObj), props.minValue.value)) return true;
		return false;
	}
	const isMonthUnavailable = (date) => {
		if (resolveMatcher(props.isMonthUnavailable)?.(date)) return true;
		return false;
	};
	const isNextButtonDisabled = (nextPageFunc) => {
		if (!props.maxValue.value) return false;
		if (props.disabled.value) return true;
		const currentDate = grid.value.value;
		if (nextPageFunc || props.nextPage.value) return isAfter((nextPageFunc || props.nextPage.value)(currentDate).set({
			month: 1,
			day: 1
		}), props.maxValue.value);
		return isAfter(currentDate.add({ years: 1 }).set({
			month: 1,
			day: 1
		}), props.maxValue.value);
	};
	const isPrevButtonDisabled = (prevPageFunc) => {
		if (!props.minValue.value) return false;
		if (props.disabled.value) return true;
		const currentDate = grid.value.value;
		if (prevPageFunc || props.prevPage.value) {
			const prevDate = (prevPageFunc || props.prevPage.value)(currentDate);
			return isBefore(endOfMonth(prevDate.set({ month: 12 })), props.minValue.value);
		}
		return isBefore(currentDate.subtract({ years: 1 }).set({
			month: 12,
			day: 31
		}), props.minValue.value);
	};
	const nextPage = (nextPageFunc) => {
		const currentDate = grid.value.value;
		if (nextPageFunc || props.nextPage.value) {
			const newDate$1 = (nextPageFunc || props.nextPage.value)(currentDate);
			grid.value = createMonthGrid({ dateObj: newDate$1 });
			props.placeholder.value = newDate$1.set({
				month: props.placeholder.value.month,
				day: props.placeholder.value.day
			});
			return;
		}
		const newDate = currentDate.add({ years: 1 });
		grid.value = createMonthGrid({ dateObj: newDate });
		props.placeholder.value = newDate.set({
			month: props.placeholder.value.month,
			day: props.placeholder.value.day
		});
	};
	const prevPage = (prevPageFunc) => {
		const currentDate = grid.value.value;
		if (prevPageFunc || props.prevPage.value) {
			const newDate$1 = (prevPageFunc || props.prevPage.value)(currentDate);
			grid.value = createMonthGrid({ dateObj: newDate$1 });
			props.placeholder.value = newDate$1.set({
				month: props.placeholder.value.month,
				day: props.placeholder.value.day
			});
			return;
		}
		const newDate = currentDate.subtract({ years: 1 });
		grid.value = createMonthGrid({ dateObj: newDate });
		props.placeholder.value = newDate.set({
			month: props.placeholder.value.month,
			day: props.placeholder.value.day
		});
	};
	watch(props.placeholder, (value) => {
		if (value.year === grid.value.value.year) return;
		grid.value = createMonthGrid({ dateObj: value });
	});
	watch(props.locale, () => {
		formatter.setLocale(props.locale.value);
		grid.value = createMonthGrid({ dateObj: props.placeholder.value });
	});
	const headingValue = computed(() => {
		if (props.locale.value !== formatter.getLocale()) formatter.setLocale(props.locale.value);
		return formatter.fullYear(toDate(grid.value.value), headingFormatOptions.value);
	});
	return {
		isMonthDisabled,
		isMonthUnavailable,
		isNextButtonDisabled,
		isPrevButtonDisabled,
		grid,
		formatter,
		nextPage,
		prevPage,
		headingValue,
		fullCalendarLabel: computed(() => `${props.calendarLabel.value ?? "Month Picker"}, ${headingValue.value}`)
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerRoot.js
var _hoisted_1$3 = { style: {
	"border": "0px",
	"clip": "rect(0px, 0px, 0px, 0px)",
	"clip-path": "inset(50%)",
	"height": "1px",
	"margin": "-1px",
	"overflow": "hidden",
	"padding": "0px",
	"position": "absolute",
	"white-space": "nowrap",
	"width": "1px"
} };
var _hoisted_2$3 = {
	role: "heading",
	"aria-level": "2"
};
var [injectMonthPickerRootContext, provideMonthPickerRootContext] = /*#__PURE__*/ createContext("MonthPickerRoot");
var MonthPickerRoot_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerRoot",
	props: {
		defaultValue: {
			type: null,
			required: false,
			default: void 0
		},
		defaultPlaceholder: {
			type: null,
			required: false
		},
		placeholder: {
			type: null,
			required: false,
			default: void 0
		},
		preventDeselect: {
			type: Boolean,
			required: false,
			default: false
		},
		calendarLabel: {
			type: String,
			required: false
		},
		maxValue: {
			type: null,
			required: false
		},
		minValue: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		initialFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		isMonthDisabled: {
			type: Function,
			required: false,
			default: void 0
		},
		isMonthUnavailable: {
			type: Function,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
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
		modelValue: {
			type: null,
			required: false
		},
		multiple: {
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
			default: "div"
		}
	},
	emits: ["update:modelValue", "update:placeholder"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, initialFocus, multiple, minValue, maxValue, preventDeselect, isMonthDisabled: propsIsMonthDisabled, isMonthUnavailable: propsIsMonthUnavailable, calendarLabel, defaultValue, nextPage: propsNextPage, prevPage: propsPrevPage, dir: propDir, locale: propLocale } = toRefs(props);
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const locale = useLocale(propLocale);
		const dir = useDirection(propDir);
		const headingId = useId$1(void 0, "reka-month-picker-heading");
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: defaultValue.value,
			passive: props.modelValue === void 0
		});
		const defaultDate = getDefaultDate({
			defaultPlaceholder: props.placeholder,
			defaultValue: modelValue.value,
			locale: props.locale
		});
		const placeholder = useVModel(props, "placeholder", emits, {
			defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
			passive: props.placeholder === void 0
		});
		function onPlaceholderChange(value) {
			placeholder.value = value.copy();
		}
		const { fullCalendarLabel, headingValue, isMonthDisabled, isMonthUnavailable, isNextButtonDisabled, isPrevButtonDisabled, nextPage, prevPage, formatter, grid } = useMonthPicker({
			locale,
			placeholder,
			minValue,
			maxValue,
			disabled,
			isMonthDisabled: propsIsMonthDisabled,
			isMonthUnavailable: propsIsMonthUnavailable,
			calendarLabel,
			nextPage: propsNextPage,
			prevPage: propsPrevPage
		});
		const { isInvalid, isMonthSelected } = useMonthPickerState({
			date: modelValue,
			isMonthDisabled,
			isMonthUnavailable
		});
		watch(modelValue, (_modelValue) => {
			if (Array.isArray(_modelValue) && _modelValue.length) {
				const lastValue = _modelValue.at(-1);
				if (lastValue && !isSameYearMonth(placeholder.value, lastValue)) onPlaceholderChange(lastValue);
			} else if (!Array.isArray(_modelValue) && _modelValue && !isSameYearMonth(placeholder.value, _modelValue)) onPlaceholderChange(_modelValue);
		});
		function resolveMonthValue(value, reference) {
			if (!reference) return value.copy();
			return value.copy().set({ day: reference.day });
		}
		function onMonthChange(value) {
			if (!multiple.value) {
				if (!modelValue.value) {
					modelValue.value = resolveMonthValue(value, placeholder.value);
					return;
				}
				if (!preventDeselect.value && isSameYearMonth(modelValue.value, value)) {
					placeholder.value = resolveMonthValue(value, modelValue.value);
					modelValue.value = void 0;
				} else modelValue.value = resolveMonthValue(value, modelValue.value);
			} else if (!modelValue.value) modelValue.value = [resolveMonthValue(value, placeholder.value)];
			else {
				const modelValueArray = Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value];
				const index = modelValueArray.findIndex((date) => isSameYearMonth(date, value));
				if (index === -1) modelValue.value = [...modelValueArray, resolveMonthValue(value, placeholder.value)];
				else if (!preventDeselect.value) {
					const next = modelValueArray.filter((date) => !isSameYearMonth(date, value));
					if (!next.length) {
						placeholder.value = resolveMonthValue(value, modelValueArray[index]);
						modelValue.value = void 0;
						return;
					}
					modelValue.value = next.map((date) => date.copy());
				}
			}
		}
		provideMonthPickerRootContext({
			isMonthUnavailable,
			dir,
			isMonthDisabled,
			locale,
			formatter,
			modelValue,
			placeholder,
			disabled,
			initialFocus,
			grid,
			multiple,
			readonly,
			preventDeselect,
			fullCalendarLabel,
			headingValue,
			headingId,
			isInvalid,
			isMonthSelected,
			isNextButtonDisabled,
			isPrevButtonDisabled,
			nextPage,
			prevPage,
			parentElement,
			onPlaceholderChange,
			onMonthChange,
			minValue,
			maxValue
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-label": unref(fullCalendarLabel),
				"data-readonly": unref(readonly) ? "" : void 0,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-invalid": unref(isInvalid) ? "" : void 0,
				dir: unref(dir)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					date: unref(placeholder),
					grid: unref(grid),
					locale: unref(locale),
					modelValue: unref(modelValue)
				}), createElementVNode("div", _hoisted_1$3, [createElementVNode("div", _hoisted_2$3, toDisplayString(unref(fullCalendarLabel)), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"data-readonly",
				"data-disabled",
				"data-invalid",
				"dir"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerCell.js
var MonthPickerCell_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerCell",
	props: {
		date: {
			type: null,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "td"
		}
	},
	setup(__props) {
		const rootContext = injectMonthPickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "gridcell",
				"aria-selected": unref(rootContext).isMonthSelected(_ctx.date) ? true : void 0,
				"aria-disabled": unref(rootContext).isMonthDisabled(_ctx.date) || unref(rootContext).isMonthUnavailable?.(_ctx.date),
				"data-disabled": unref(rootContext).isMonthDisabled(_ctx.date) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-selected",
				"aria-disabled",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerCellTrigger.js
var MonthPickerCellTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerCellTrigger",
	props: {
		month: {
			type: null,
			required: true
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
		const kbd = useKbd();
		const rootContext = injectMonthPickerRootContext();
		const { primitiveElement } = usePrimitiveElement();
		const shortMonthValue = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.custom(toDate(props.month), { month: "short" });
		});
		const labelText = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.custom(toDate(props.month), {
				month: "long",
				year: "numeric"
			});
		});
		const isUnavailable = computed(() => rootContext.isMonthUnavailable?.(props.month) ?? false);
		const isCurrentMonth = computed(() => {
			const todayDate = toCalendar(today(getLocalTimeZone()), props.month.calendar);
			return isSameYearMonth(props.month, todayDate);
		});
		const isDisabled = computed(() => rootContext.isMonthDisabled(props.month));
		const isFocusedMonth = computed(() => {
			return !rootContext.disabled.value && isSameYearMonth(props.month, rootContext.placeholder.value);
		});
		const isSelectedMonth = computed(() => rootContext.isMonthSelected(props.month));
		function changeMonth(date) {
			if (rootContext.readonly.value) return;
			if (rootContext.isMonthDisabled(date) || rootContext.isMonthUnavailable?.(date)) return;
			rootContext.onMonthChange(date);
		}
		function handleClick() {
			if (isDisabled.value) return;
			changeMonth(props.month);
		}
		function handleArrowKey(e) {
			if (isDisabled.value) return;
			if ((e.code === kbd.ENTER || e.code === kbd.SPACE_CODE) && (e.ctrlKey || e.metaKey || e.altKey)) return;
			e.preventDefault();
			e.stopPropagation();
			const parentElement = rootContext.parentElement.value;
			const sign = rootContext.dir.value === "rtl" ? -1 : 1;
			switch (e.code) {
				case kbd.ARROW_RIGHT:
					shiftFocus(props.month, sign);
					break;
				case kbd.ARROW_LEFT:
					shiftFocus(props.month, -sign);
					break;
				case kbd.ARROW_UP:
					shiftFocus(props.month, -4);
					break;
				case kbd.ARROW_DOWN:
					shiftFocus(props.month, 4);
					break;
				case kbd.PAGE_UP:
					shiftFocusYear(-1);
					break;
				case kbd.PAGE_DOWN:
					shiftFocusYear(1);
					break;
				case kbd.ENTER:
				case kbd.SPACE_CODE: changeMonth(props.month);
			}
			function shiftFocus(currentMonth, add, depth = 0) {
				if (depth > 48) return;
				const candidateMonthValue = currentMonth.add({ months: add });
				if (rootContext.minValue.value && endOfMonth(candidateMonthValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && candidateMonthValue.set({ day: 1 }).compare(rootContext.maxValue.value) > 0) return;
				const candidateMonth = parentElement.querySelector(`[data-value='${candidateMonthValue.toString()}']`);
				if (!candidateMonth) {
					if (add > 0) {
						if (rootContext.isNextButtonDisabled()) return;
						rootContext.nextPage();
					} else {
						if (rootContext.isPrevButtonDisabled()) return;
						rootContext.prevPage();
					}
					nextTick(() => {
						shiftFocus(currentMonth, add, depth + 1);
					});
					return;
				}
				if (candidateMonth && candidateMonth.hasAttribute("data-disabled")) return shiftFocus(candidateMonthValue, add, depth + 1);
				rootContext.onPlaceholderChange(candidateMonthValue);
				candidateMonth?.focus();
			}
			function shiftFocusYear(years) {
				const candidateMonthValue = props.month.add({ years });
				if (rootContext.minValue.value && endOfMonth(candidateMonthValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && candidateMonthValue.set({ day: 1 }).compare(rootContext.maxValue.value) > 0) return;
				if (years > 0) {
					if (rootContext.isNextButtonDisabled()) return;
					rootContext.nextPage();
				} else {
					if (rootContext.isPrevButtonDisabled()) return;
					rootContext.prevPage();
				}
				nextTick(() => {
					const candidateMonth = parentElement.querySelector(`[data-value='${candidateMonthValue.toString()}']`);
					if (candidateMonth && !candidateMonth.hasAttribute("data-disabled")) {
						rootContext.onPlaceholderChange(candidateMonthValue);
						candidateMonth?.focus();
					}
				});
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: props.as,
				"as-child": props.asChild,
				role: "button",
				"aria-label": labelText.value,
				"data-reka-month-picker-cell-trigger": "",
				"aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
				"data-selected": isSelectedMonth.value ? true : void 0,
				"data-value": _ctx.month.toString(),
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-unavailable": isUnavailable.value ? "" : void 0,
				"data-today": isCurrentMonth.value ? "" : void 0,
				"data-focused": isFocusedMonth.value ? "" : void 0,
				tabindex: isFocusedMonth.value ? 0 : isDisabled.value ? void 0 : -1,
				onClick: handleClick,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"space",
					"enter",
					"page-up",
					"page-down"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					monthValue: shortMonthValue.value,
					disabled: isDisabled.value,
					today: isCurrentMonth.value,
					selected: isSelectedMonth.value,
					unavailable: isUnavailable.value
				}, () => [createTextVNode(toDisplayString(shortMonthValue.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"aria-disabled",
				"data-selected",
				"data-value",
				"data-disabled",
				"data-unavailable",
				"data-today",
				"data-focused",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerGrid.js
var MonthPickerGrid_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerGrid",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "table"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectMonthPickerRootContext();
		const disabled = computed(() => rootContext.disabled.value ? true : void 0);
		const readonly = computed(() => rootContext.readonly.value ? true : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				tabindex: "-1",
				role: "application",
				"aria-labelledby": unref(rootContext).headingId,
				"aria-readonly": readonly.value,
				"aria-disabled": disabled.value,
				"data-readonly": readonly.value && "",
				"data-disabled": disabled.value && ""
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-labelledby",
				"aria-readonly",
				"aria-disabled",
				"data-readonly",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerGridBody.js
var MonthPickerGridBody_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerGridBody",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tbody"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerGridRow.js
var MonthPickerGridRow_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerGridRow",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tr"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { role: "row" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerHeader.js
var MonthPickerHeader_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerHeader",
	props: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerHeading.js
var MonthPickerHeading_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerHeading",
	props: {
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
		const rootContext = injectMonthPickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).headingId,
				role: "heading",
				"aria-level": "2",
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { headingValue: unref(rootContext).headingValue.value }, () => [createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)])]),
				_: 3
			}, 16, ["id", "data-disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerNext.js
var MonthPickerNext_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerNext",
	props: {
		nextPage: {
			type: Function,
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
		const rootContext = injectMonthPickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.nextPage(props.nextPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Next year",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Next year "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthPicker/MonthPickerPrev.js
var MonthPickerPrev_default = /* @__PURE__ */ defineComponent({
	__name: "MonthPickerPrev",
	props: {
		prevPage: {
			type: Function,
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
		const rootContext = injectMonthPickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.prevPage(props.prevPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-label": "Previous year",
				as: props.as,
				"as-child": props.asChild,
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Prev year "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/useRangeMonthPicker.js
function useRangeMonthPickerState(props) {
	const isStartInvalid = computed(() => {
		if (!props.start.value) return false;
		if (props.isMonthDisabled(props.start.value)) return true;
		return false;
	});
	const isEndInvalid = computed(() => {
		if (!props.end.value) return false;
		if (props.isMonthDisabled(props.end.value)) return true;
		return false;
	});
	const isInvalid = computed(() => {
		if (isStartInvalid.value || isEndInvalid.value) return true;
		if (props.start.value && props.end.value && compareYearMonth(props.end.value, props.start.value) < 0) return true;
		return false;
	});
	const isSelectionStart = (date) => {
		if (!props.start.value) return false;
		return isSameYearMonth(props.start.value, date);
	};
	const isSelectionEnd = (date) => {
		if (!props.end.value) return false;
		return isSameYearMonth(props.end.value, date);
	};
	const isSelected = (date) => {
		if (props.start.value && isSameYearMonth(props.start.value, date)) return true;
		if (props.end.value && isSameYearMonth(props.end.value, date)) return true;
		if (props.end.value && props.start.value) return compareYearMonth(date, props.start.value) > 0 && compareYearMonth(date, props.end.value) < 0;
		return false;
	};
	const rangeIsMonthDisabled = (date) => {
		if (props.isMonthDisabled(date)) return true;
		if (props.maximumMonths?.value) {
			const maximumMonths = props.maximumMonths.value;
			if (props.start.value && props.end.value) {
				if (props.fixedDate.value) {
					const diff = getMonthsBetween(props.start.value, props.end.value);
					if (diff <= maximumMonths) {
						const monthsLeft = maximumMonths - diff;
						const startLimit = props.start.value.subtract({ months: monthsLeft });
						const endLimit = props.end.value.add({ months: monthsLeft });
						return compareYearMonth(date, startLimit) < 0 || compareYearMonth(date, endLimit) > 0;
					}
					const fixedValue = props.fixedDate.value === "start" ? props.start.value : props.end.value;
					const maxDate = fixedValue.add({ months: maximumMonths - 1 });
					return compareYearMonth(date, fixedValue.subtract({ months: maximumMonths - 1 })) < 0 || compareYearMonth(date, maxDate) > 0;
				}
				return false;
			}
			if (props.start.value) {
				const maxDate = props.start.value.add({ months: maximumMonths - 1 });
				return compareYearMonth(date, props.start.value.subtract({ months: maximumMonths - 1 })) < 0 || compareYearMonth(date, maxDate) > 0;
			}
		}
		return false;
	};
	const highlightedRange = computed(() => {
		if (props.start.value && props.end.value && !props.fixedDate.value) return null;
		if (!props.start.value || !props.focusedValue.value) return null;
		const isStartBeforeFocused = compareYearMonth(props.start.value, props.focusedValue.value) < 0;
		const start = isStartBeforeFocused ? props.start.value : props.focusedValue.value;
		const end = isStartBeforeFocused ? props.focusedValue.value : props.start.value;
		if (isSameYearMonth(start, end)) return {
			start,
			end
		};
		if (props.maximumMonths?.value && !props.end.value) {
			const maximumMonths = props.maximumMonths.value;
			const anchor = props.start.value;
			const focused = props.focusedValue.value;
			if (compareYearMonth(focused, anchor) >= 0) {
				const maxEnd = anchor.add({ months: maximumMonths - 1 });
				return {
					start: anchor,
					end: compareYearMonth(focused, maxEnd) > 0 ? maxEnd : focused
				};
			} else {
				const minStart = anchor.subtract({ months: maximumMonths - 1 });
				return {
					start: compareYearMonth(focused, minStart) < 0 ? minStart : focused,
					end: anchor
				};
			}
		}
		if (areAllMonthsBetweenValid(start, end, props.allowNonContiguousRanges.value ? () => false : props.isMonthUnavailable, rangeIsMonthDisabled)) return {
			start,
			end
		};
		return null;
	});
	const isHighlightedStart = (date) => {
		if (!highlightedRange.value?.start) return false;
		return isSameYearMonth(highlightedRange.value.start, date);
	};
	const isHighlightedEnd = (date) => {
		if (!highlightedRange.value?.end) return false;
		return isSameYearMonth(highlightedRange.value.end, date);
	};
	return {
		isInvalid,
		isSelected,
		highlightedRange,
		isSelectionStart,
		isSelectionEnd,
		isHighlightedStart,
		isHighlightedEnd,
		isMonthDisabled: rangeIsMonthDisabled
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerRoot.js
var _hoisted_1$2 = { style: {
	"border": "0px",
	"clip": "rect(0px, 0px, 0px, 0px)",
	"clip-path": "inset(50%)",
	"height": "1px",
	"margin": "-1px",
	"overflow": "hidden",
	"padding": "0px",
	"position": "absolute",
	"white-space": "nowrap",
	"width": "1px"
} };
var _hoisted_2$2 = {
	role: "heading",
	"aria-level": "2"
};
var [injectMonthRangePickerRootContext, provideMonthRangePickerRootContext] = /*#__PURE__*/ createContext("MonthRangePickerRoot");
var MonthRangePickerRoot_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerRoot",
	props: {
		defaultPlaceholder: {
			type: null,
			required: false
		},
		defaultValue: {
			type: Object,
			required: false,
			default: () => ({
				start: void 0,
				end: void 0
			})
		},
		modelValue: {
			type: [Object, null],
			required: false
		},
		placeholder: {
			type: null,
			required: false,
			default: void 0
		},
		allowNonContiguousRanges: {
			type: Boolean,
			required: false,
			default: false
		},
		preventDeselect: {
			type: Boolean,
			required: false,
			default: false
		},
		maximumMonths: {
			type: Number,
			required: false,
			default: void 0
		},
		calendarLabel: {
			type: String,
			required: false
		},
		maxValue: {
			type: null,
			required: false
		},
		minValue: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		initialFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		isMonthDisabled: {
			type: Function,
			required: false,
			default: void 0
		},
		isMonthUnavailable: {
			type: Function,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
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
		fixedDate: {
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
	emits: [
		"update:modelValue",
		"update:placeholder",
		"update:startValue"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, initialFocus, preventDeselect, isMonthUnavailable: propsIsMonthUnavailable, isMonthDisabled: propsIsMonthDisabled, calendarLabel, maxValue, minValue, dir: propDir, locale: propLocale, nextPage: propsNextPage, prevPage: propsPrevPage, allowNonContiguousRanges, fixedDate, maximumMonths } = toRefs(props);
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const dir = useDirection(propDir);
		const locale = useLocale(propLocale);
		const headingId = useId$1(void 0, "reka-month-range-picker-heading");
		const lastPressedDateValue = ref();
		const focusedValue = ref();
		const isEditing = ref(false);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? {
				start: void 0,
				end: void 0
			},
			passive: props.modelValue === void 0
		});
		const normalizeRange = (value) => value ?? {
			start: void 0,
			end: void 0
		};
		const normalizedModelValue = computed(() => normalizeRange(modelValue.value));
		const validModelValue = ref(normalizeRange(modelValue.value));
		const defaultDate = getDefaultDate({
			defaultPlaceholder: props.placeholder,
			defaultValue: normalizeRange(modelValue.value).start,
			locale: props.locale
		});
		const startValue = ref(normalizeRange(modelValue.value).start);
		const endValue = ref(normalizeRange(modelValue.value).end);
		const placeholder = useVModel(props, "placeholder", emits, {
			defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
			passive: props.placeholder === void 0
		});
		function onPlaceholderChange(value) {
			placeholder.value = value.copy();
		}
		const { fullCalendarLabel, headingValue, isMonthDisabled, isMonthUnavailable, isNextButtonDisabled, isPrevButtonDisabled, grid, nextPage, prevPage, formatter } = useMonthPicker({
			locale,
			placeholder,
			minValue,
			maxValue,
			disabled,
			isMonthDisabled: propsIsMonthDisabled,
			isMonthUnavailable: propsIsMonthUnavailable,
			calendarLabel,
			nextPage: propsNextPage,
			prevPage: propsPrevPage
		});
		const { isInvalid, isSelected, highlightedRange, isSelectionStart, isSelectionEnd, isHighlightedStart, isHighlightedEnd, isMonthDisabled: rangeIsMonthDisabled } = useRangeMonthPickerState({
			start: startValue,
			end: endValue,
			isMonthDisabled,
			isMonthUnavailable,
			focusedValue,
			allowNonContiguousRanges,
			fixedDate,
			maximumMonths
		});
		watch(modelValue, (_modelValue) => {
			const next = normalizeRange(_modelValue);
			if (!(!next.start && !startValue.value || !!next.start && !!startValue.value && isSameYearMonth(next.start, startValue.value))) startValue.value = next.start?.copy?.();
			if (!(!next.end && !endValue.value || !!next.end && !!endValue.value && isSameYearMonth(next.end, endValue.value))) endValue.value = next.end?.copy?.();
			if (next.start && next.end) validModelValue.value = {
				start: next.start.copy(),
				end: next.end.copy()
			};
		});
		watch(startValue, (_startValue) => {
			if (_startValue && !isSameYearMonth(_startValue, placeholder.value)) onPlaceholderChange(_startValue);
			emits("update:startValue", _startValue);
		});
		watch([startValue, endValue], ([_startValue, _endValue]) => {
			const value = modelValue.value;
			if (value && value.start && value.end && _startValue && _endValue && isSameYearMonth(value.start, _startValue) && isSameYearMonth(value.end, _endValue)) return;
			isEditing.value = true;
			if (_endValue && _startValue) {
				const nextValue = compareYearMonth(_endValue, _startValue) < 0 ? {
					start: _endValue.copy(),
					end: _startValue.copy()
				} : {
					start: _startValue.copy(),
					end: _endValue.copy()
				};
				modelValue.value = {
					start: nextValue.start,
					end: nextValue.end
				};
				isEditing.value = false;
				validModelValue.value = {
					start: nextValue.start.copy(),
					end: nextValue.end.copy()
				};
			} else modelValue.value = _startValue ? {
				start: _startValue.copy(),
				end: void 0
			} : {
				start: _endValue?.copy(),
				end: void 0
			};
		});
		const kbd = useKbd();
		useEventListener(parentElement, "keydown", (ev) => {
			if (ev.key === kbd.ESCAPE && isEditing.value) {
				startValue.value = validModelValue.value.start?.copy();
				endValue.value = validModelValue.value.end?.copy();
			}
		});
		provideMonthRangePickerRootContext({
			isMonthUnavailable,
			startValue,
			endValue,
			formatter,
			modelValue: normalizedModelValue,
			placeholder,
			disabled,
			initialFocus,
			grid,
			readonly,
			preventDeselect,
			fullCalendarLabel,
			headingValue,
			headingId,
			isInvalid,
			isMonthDisabled: rangeIsMonthDisabled,
			allowNonContiguousRanges,
			highlightedRange,
			focusedValue,
			lastPressedDateValue,
			isSelected,
			isSelectionEnd,
			isSelectionStart,
			isNextButtonDisabled,
			isPrevButtonDisabled,
			nextPage,
			prevPage,
			parentElement,
			onPlaceholderChange,
			locale,
			dir,
			isHighlightedStart,
			isHighlightedEnd,
			fixedDate,
			maximumMonths,
			minValue,
			maxValue
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-label": unref(fullCalendarLabel),
				"data-readonly": unref(readonly) ? "" : void 0,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-invalid": unref(isInvalid) ? "" : void 0,
				dir: unref(dir)
			}, {
				default: withCtx(() => [createElementVNode("div", _hoisted_1$2, [createElementVNode("div", _hoisted_2$2, toDisplayString(unref(fullCalendarLabel)), 1)]), renderSlot(_ctx.$slots, "default", {
					date: unref(placeholder),
					grid: unref(grid),
					locale: unref(locale),
					modelValue: normalizedModelValue.value
				})]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"data-readonly",
				"data-disabled",
				"data-invalid",
				"dir"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerCell.js
var MonthRangePickerCell_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerCell",
	props: {
		date: {
			type: null,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "td"
		}
	},
	setup(__props) {
		const rootContext = injectMonthRangePickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "gridcell",
				"aria-selected": unref(rootContext).isSelected(_ctx.date) ? true : void 0,
				"aria-disabled": unref(rootContext).isMonthDisabled(_ctx.date) || unref(rootContext).isMonthUnavailable?.(_ctx.date),
				"data-disabled": unref(rootContext).isMonthDisabled(_ctx.date) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-selected",
				"aria-disabled",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerCellTrigger.js
var MonthRangePickerCellTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerCellTrigger",
	props: {
		month: {
			type: null,
			required: true
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
		const kbd = useKbd();
		const rootContext = injectMonthRangePickerRootContext();
		const { primitiveElement } = usePrimitiveElement();
		const shortMonthValue = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.custom(toDate(props.month), { month: "short" });
		});
		const labelText = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.custom(toDate(props.month), {
				month: "long",
				year: "numeric"
			});
		});
		const isUnavailable = computed(() => rootContext.isMonthUnavailable?.(props.month) ?? false);
		const isCurrentMonth = computed(() => {
			const todayDate = toCalendar(today(getLocalTimeZone()), props.month.calendar);
			return isSameYearMonth(props.month, todayDate);
		});
		const isDisabled = computed(() => rootContext.isMonthDisabled(props.month));
		const isFocusedMonth = computed(() => {
			return !rootContext.disabled.value && isSameYearMonth(props.month, rootContext.placeholder.value);
		});
		const isSelectedMonth = computed(() => rootContext.isSelected(props.month));
		const isSelectionStart = computed(() => rootContext.isSelectionStart(props.month));
		const isSelectionEnd = computed(() => rootContext.isSelectionEnd(props.month));
		const isHighlightStart = computed(() => rootContext.isHighlightedStart(props.month));
		const isHighlightEnd = computed(() => rootContext.isHighlightedEnd(props.month));
		const isHighlighted = computed(() => rootContext.highlightedRange.value ? isMonthBetweenInclusive(props.month, rootContext.highlightedRange.value.start, rootContext.highlightedRange.value.end) : false);
		const allowNonContiguousRanges = computed(() => rootContext.allowNonContiguousRanges.value);
		function changeMonth(e, date) {
			if (rootContext.readonly.value) return;
			if (rootContext.isMonthDisabled(date) || rootContext.isMonthUnavailable?.(date)) return;
			if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
				if (isSameYearMonth(date, rootContext.startValue.value) && !rootContext.preventDeselect.value && !rootContext.endValue.value) {
					rootContext.startValue.value = void 0;
					rootContext.onPlaceholderChange(date);
					rootContext.lastPressedDateValue.value = date.copy();
					return;
				} else if (!rootContext.endValue.value) {
					e.preventDefault();
					if (rootContext.lastPressedDateValue.value && isSameYearMonth(rootContext.lastPressedDateValue.value, date)) rootContext.startValue.value = date.copy();
					rootContext.lastPressedDateValue.value = date.copy();
					return;
				}
			}
			rootContext.lastPressedDateValue.value = date.copy();
			if (rootContext.startValue.value && rootContext.endValue.value && isSameYearMonth(rootContext.startValue.value, rootContext.endValue.value) && isSameYearMonth(rootContext.startValue.value, date) && !rootContext.preventDeselect.value) {
				rootContext.startValue.value = void 0;
				rootContext.endValue.value = void 0;
				rootContext.onPlaceholderChange(date);
				return;
			}
			if (!rootContext.startValue.value) rootContext.startValue.value = date.copy();
			else if (!rootContext.endValue.value) rootContext.endValue.value = date.copy();
			else if (rootContext.endValue.value && rootContext.startValue.value) {
				if (!rootContext.fixedDate.value) {
					rootContext.endValue.value = void 0;
					rootContext.startValue.value = date.copy();
				} else if (rootContext.fixedDate.value === "start") if (date.compare(rootContext.startValue.value) < 0) rootContext.startValue.value = date.copy();
				else rootContext.endValue.value = date.copy();
				else if (rootContext.fixedDate.value === "end") if (date.compare(rootContext.endValue.value) > 0) rootContext.endValue.value = date.copy();
				else rootContext.startValue.value = date.copy();
			}
		}
		function handleClick(e) {
			if (isDisabled.value) return;
			changeMonth(e, props.month);
		}
		function handleFocus() {
			if (isDisabled.value || rootContext.isMonthUnavailable?.(props.month)) return;
			rootContext.focusedValue.value = props.month.copy();
		}
		function handleArrowKey(e) {
			if (isDisabled.value) return;
			if ((e.code === kbd.ENTER || e.code === kbd.SPACE_CODE) && (e.ctrlKey || e.metaKey || e.altKey)) return;
			e.preventDefault();
			e.stopPropagation();
			const parentElement = rootContext.parentElement.value;
			const sign = rootContext.dir.value === "rtl" ? -1 : 1;
			switch (e.code) {
				case kbd.ARROW_RIGHT:
					shiftFocus(props.month, sign);
					break;
				case kbd.ARROW_LEFT:
					shiftFocus(props.month, -sign);
					break;
				case kbd.ARROW_UP:
					shiftFocus(props.month, -4);
					break;
				case kbd.ARROW_DOWN:
					shiftFocus(props.month, 4);
					break;
				case kbd.PAGE_UP:
					shiftFocusYear(-1);
					break;
				case kbd.PAGE_DOWN:
					shiftFocusYear(1);
					break;
				case kbd.ENTER:
				case kbd.SPACE_CODE: changeMonth(e, props.month);
			}
			function shiftFocus(currentMonth, add, depth = 0) {
				if (depth > 48) return;
				const candidateMonthValue = currentMonth.add({ months: add });
				if (rootContext.minValue.value && endOfMonth(candidateMonthValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && candidateMonthValue.set({ day: 1 }).compare(rootContext.maxValue.value) > 0) return;
				const candidateMonth = parentElement.querySelector(`[data-value='${candidateMonthValue.toString()}']`);
				if (!candidateMonth) {
					if (add > 0) {
						if (rootContext.isNextButtonDisabled()) return;
						rootContext.nextPage();
					} else {
						if (rootContext.isPrevButtonDisabled()) return;
						rootContext.prevPage();
					}
					nextTick(() => {
						shiftFocus(currentMonth, add, depth + 1);
					});
					return;
				}
				if (candidateMonth && candidateMonth.hasAttribute("data-disabled")) return shiftFocus(candidateMonthValue, add, depth + 1);
				rootContext.onPlaceholderChange(candidateMonthValue);
				candidateMonth?.focus();
			}
			function shiftFocusYear(years) {
				const candidateMonthValue = props.month.add({ years });
				if (rootContext.minValue.value && endOfMonth(candidateMonthValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && candidateMonthValue.set({ day: 1 }).compare(rootContext.maxValue.value) > 0) return;
				if (years > 0) {
					if (rootContext.isNextButtonDisabled()) return;
					rootContext.nextPage();
				} else {
					if (rootContext.isPrevButtonDisabled()) return;
					rootContext.prevPage();
				}
				nextTick(() => {
					const candidateMonth = parentElement.querySelector(`[data-value='${candidateMonthValue.toString()}']`);
					if (candidateMonth && !candidateMonth.hasAttribute("data-disabled")) {
						rootContext.onPlaceholderChange(candidateMonthValue);
						candidateMonth?.focus();
						return;
					}
					shiftFocus(candidateMonthValue, years > 0 ? 1 : -1, 1);
				});
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: props.as,
				"as-child": props.asChild,
				role: "button",
				"aria-label": labelText.value,
				"data-reka-month-range-picker-cell-trigger": "",
				"aria-pressed": isSelectedMonth.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? true : void 0,
				"aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
				"data-highlighted": isHighlighted.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? "" : void 0,
				"data-selection-start": isSelectionStart.value ? true : void 0,
				"data-selection-end": isSelectionEnd.value ? true : void 0,
				"data-highlighted-start": isHighlightStart.value ? true : void 0,
				"data-highlighted-end": isHighlightEnd.value ? true : void 0,
				"data-selected": isSelectedMonth.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? true : void 0,
				"data-value": _ctx.month.toString(),
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-unavailable": isUnavailable.value ? "" : void 0,
				"data-today": isCurrentMonth.value ? "" : void 0,
				"data-focused": isFocusedMonth.value ? "" : void 0,
				tabindex: isFocusedMonth.value ? 0 : isDisabled.value ? void 0 : -1,
				onClick: handleClick,
				onFocusin: handleFocus,
				onMouseenter: handleFocus,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"space",
					"enter",
					"page-up",
					"page-down"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					monthValue: shortMonthValue.value,
					disabled: isDisabled.value,
					today: isCurrentMonth.value,
					selected: isSelectedMonth.value,
					unavailable: isUnavailable.value,
					highlighted: isHighlighted.value && (allowNonContiguousRanges.value || !isUnavailable.value),
					highlightedStart: isHighlightStart.value,
					highlightedEnd: isHighlightEnd.value,
					selectionStart: isSelectionStart.value,
					selectionEnd: isSelectionEnd.value
				}, () => [createTextVNode(toDisplayString(shortMonthValue.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"aria-pressed",
				"aria-disabled",
				"data-highlighted",
				"data-selection-start",
				"data-selection-end",
				"data-highlighted-start",
				"data-highlighted-end",
				"data-selected",
				"data-value",
				"data-disabled",
				"data-unavailable",
				"data-today",
				"data-focused",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerGrid.js
var MonthRangePickerGrid_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerGrid",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "table"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectMonthRangePickerRootContext();
		const disabled = computed(() => rootContext.disabled.value ? true : void 0);
		const readonly = computed(() => rootContext.readonly.value ? true : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				tabindex: "-1",
				role: "application",
				"aria-labelledby": unref(rootContext).headingId,
				"aria-readonly": readonly.value,
				"aria-disabled": disabled.value,
				"data-readonly": readonly.value && "",
				"data-disabled": disabled.value && ""
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-labelledby",
				"aria-readonly",
				"aria-disabled",
				"data-readonly",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerGridBody.js
var MonthRangePickerGridBody_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerGridBody",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tbody"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerGridRow.js
var MonthRangePickerGridRow_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerGridRow",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tr"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { role: "row" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerHeader.js
var MonthRangePickerHeader_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerHeader",
	props: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerHeading.js
var MonthRangePickerHeading_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerHeading",
	props: {
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
		const rootContext = injectMonthRangePickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).headingId,
				role: "heading",
				"aria-level": "2",
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { headingValue: unref(rootContext).headingValue.value }, () => [createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)])]),
				_: 3
			}, 16, ["id", "data-disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerNext.js
var MonthRangePickerNext_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerNext",
	props: {
		nextPage: {
			type: Function,
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
		const rootContext = injectMonthRangePickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.nextPage(props.nextPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Next year",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Next year "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/MonthRangePicker/MonthRangePickerPrev.js
var MonthRangePickerPrev_default = /* @__PURE__ */ defineComponent({
	__name: "MonthRangePickerPrev",
	props: {
		prevPage: {
			type: Function,
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
		const rootContext = injectMonthRangePickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.prevPage(props.prevPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-label": "Previous year",
				as: props.as,
				"as-child": props.asChild,
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Prev year "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/useYearPicker.js
function useYearPickerState(props) {
	function isYearSelected(dateObj) {
		if (Array.isArray(props.date.value)) return props.date.value.some((d) => isSameYear(d, dateObj));
		else if (!props.date.value) return false;
		else return isSameYear(props.date.value, dateObj);
	}
	return {
		isYearSelected,
		isInvalid: computed(() => {
			if (Array.isArray(props.date.value)) {
				if (!props.date.value.length) return false;
				for (const dateObj of props.date.value) {
					if (props.isYearDisabled?.(dateObj)) return true;
					if (props.isYearUnavailable?.(dateObj)) return true;
				}
			} else {
				if (!props.date.value) return false;
				if (props.isYearDisabled?.(props.date.value)) return true;
				if (props.isYearUnavailable?.(props.date.value)) return true;
			}
			return false;
		})
	};
}
function useYearPicker(props) {
	const formatter = useDateFormatter(props.locale.value);
	const resolveMatcher = (matcher) => typeof matcher === "function" ? matcher : matcher?.value;
	const headingFormatOptions = computed(() => {
		const options = { calendar: props.placeholder.value.calendar.identifier };
		if (props.placeholder.value.calendar.identifier === "gregory" && props.placeholder.value.era === "BC") options.era = "short";
		return options;
	});
	const grid = ref(createYearGrid({
		dateObj: props.placeholder.value,
		yearsPerPage: props.yearsPerPage.value
	}));
	function isYearDisabled(dateObj) {
		if (resolveMatcher(props.isYearDisabled)?.(dateObj) || props.disabled.value) return true;
		if (props.maxValue.value && isAfter(startOfYear(dateObj), props.maxValue.value)) return true;
		if (props.minValue.value && isBefore(endOfYear(dateObj), props.minValue.value)) return true;
		return false;
	}
	const isYearUnavailable = (date) => {
		if (resolveMatcher(props.isYearUnavailable)?.(date)) return true;
		return false;
	};
	const isNextButtonDisabled = (nextPageFunc) => {
		if (!props.maxValue.value) return false;
		if (props.disabled.value) return true;
		const lastYearInView = grid.value.cells.at(-1);
		if (nextPageFunc || props.nextPage.value) {
			const nextDate = (nextPageFunc || props.nextPage.value)(lastYearInView);
			return isAfter(startOfYear(nextDate), props.maxValue.value);
		}
		return isAfter(startOfYear(lastYearInView.add({ years: 1 })), props.maxValue.value);
	};
	const isPrevButtonDisabled = (prevPageFunc) => {
		if (!props.minValue.value) return false;
		if (props.disabled.value) return true;
		const firstYearInView = grid.value.value;
		if (prevPageFunc || props.prevPage.value) {
			const prevDate = (prevPageFunc || props.prevPage.value)(firstYearInView);
			return isBefore(endOfYear(prevDate), props.minValue.value);
		}
		return isBefore(endOfYear(firstYearInView.subtract({ years: 1 })), props.minValue.value);
	};
	const nextPage = (nextPageFunc) => {
		const firstYearInGrid = grid.value.value;
		if (nextPageFunc || props.nextPage.value) {
			const newDate$1 = (nextPageFunc || props.nextPage.value)(firstYearInGrid);
			grid.value = createYearGrid({
				dateObj: newDate$1,
				yearsPerPage: props.yearsPerPage.value,
				decadeAligned: false
			});
			props.placeholder.value = newDate$1.set({
				month: props.placeholder.value.month,
				day: props.placeholder.value.day
			});
			return;
		}
		const newDate = firstYearInGrid.add({ years: props.yearsPerPage.value });
		grid.value = createYearGrid({
			dateObj: newDate,
			yearsPerPage: props.yearsPerPage.value,
			decadeAligned: false
		});
		props.placeholder.value = newDate.set({
			month: props.placeholder.value.month,
			day: props.placeholder.value.day
		});
	};
	const prevPage = (prevPageFunc) => {
		const firstYearInGrid = grid.value.value;
		if (prevPageFunc || props.prevPage.value) {
			const newDate$1 = (prevPageFunc || props.prevPage.value)(firstYearInGrid);
			grid.value = createYearGrid({
				dateObj: newDate$1,
				yearsPerPage: props.yearsPerPage.value,
				decadeAligned: false
			});
			props.placeholder.value = newDate$1.set({
				month: props.placeholder.value.month,
				day: props.placeholder.value.day
			});
			return;
		}
		const newDate = firstYearInGrid.subtract({ years: props.yearsPerPage.value });
		grid.value = createYearGrid({
			dateObj: newDate,
			yearsPerPage: props.yearsPerPage.value,
			decadeAligned: false
		});
		props.placeholder.value = newDate.set({
			month: props.placeholder.value.month,
			day: props.placeholder.value.day
		});
	};
	watch(props.placeholder, (value) => {
		const firstYearInGrid = grid.value.value;
		const lastYearInGrid = grid.value.cells.at(-1);
		if (value.year >= firstYearInGrid.year && value.year <= lastYearInGrid.year) return;
		grid.value = createYearGrid({
			dateObj: value,
			yearsPerPage: props.yearsPerPage.value
		});
	});
	watch([props.locale, props.yearsPerPage], () => {
		formatter.setLocale(props.locale.value);
		grid.value = createYearGrid({
			dateObj: props.placeholder.value,
			yearsPerPage: props.yearsPerPage.value
		});
	});
	const headingValue = computed(() => {
		if (props.locale.value !== formatter.getLocale()) formatter.setLocale(props.locale.value);
		const firstYear = grid.value.cells[0];
		const lastYear = grid.value.cells.at(-1);
		return `${formatter.fullYear(toDate(firstYear), headingFormatOptions.value)} - ${formatter.fullYear(toDate(lastYear), headingFormatOptions.value)}`;
	});
	return {
		isYearDisabled,
		isYearUnavailable,
		isNextButtonDisabled,
		isPrevButtonDisabled,
		grid,
		formatter,
		nextPage,
		prevPage,
		headingValue,
		fullCalendarLabel: computed(() => `${props.calendarLabel.value ?? "Year Picker"}, ${headingValue.value}`)
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerRoot.js
var _hoisted_1$1 = { style: {
	"border": "0px",
	"clip": "rect(0px, 0px, 0px, 0px)",
	"clip-path": "inset(50%)",
	"height": "1px",
	"margin": "-1px",
	"overflow": "hidden",
	"padding": "0px",
	"position": "absolute",
	"white-space": "nowrap",
	"width": "1px"
} };
var _hoisted_2$1 = {
	role: "heading",
	"aria-level": "2"
};
var [injectYearPickerRootContext, provideYearPickerRootContext] = /*#__PURE__*/ createContext("YearPickerRoot");
var YearPickerRoot_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerRoot",
	props: {
		defaultValue: {
			type: null,
			required: false,
			default: void 0
		},
		defaultPlaceholder: {
			type: null,
			required: false
		},
		placeholder: {
			type: null,
			required: false,
			default: void 0
		},
		preventDeselect: {
			type: Boolean,
			required: false,
			default: false
		},
		calendarLabel: {
			type: String,
			required: false
		},
		maxValue: {
			type: null,
			required: false
		},
		minValue: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		initialFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		isYearDisabled: {
			type: Function,
			required: false,
			default: void 0
		},
		isYearUnavailable: {
			type: Function,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
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
		modelValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false,
			default: false
		},
		yearsPerPage: {
			type: Number,
			required: false,
			default: 12
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
	emits: ["update:modelValue", "update:placeholder"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, initialFocus, multiple, minValue, maxValue, preventDeselect, isYearDisabled: propsIsYearDisabled, isYearUnavailable: propsIsYearUnavailable, calendarLabel, defaultValue, nextPage: propsNextPage, prevPage: propsPrevPage, dir: propDir, locale: propLocale, yearsPerPage } = toRefs(props);
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const locale = useLocale(propLocale);
		const dir = useDirection(propDir);
		const headingId = useId$1(void 0, "reka-year-picker-heading");
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: defaultValue.value,
			passive: props.modelValue === void 0
		});
		const defaultDate = getDefaultDate({
			defaultPlaceholder: props.placeholder,
			defaultValue: modelValue.value,
			locale: props.locale
		});
		const placeholder = useVModel(props, "placeholder", emits, {
			defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
			passive: props.placeholder === void 0
		});
		function onPlaceholderChange(value) {
			placeholder.value = value.copy();
		}
		const { fullCalendarLabel, headingValue, isYearDisabled, isYearUnavailable, isNextButtonDisabled, isPrevButtonDisabled, nextPage, prevPage, formatter, grid } = useYearPicker({
			locale,
			placeholder,
			minValue,
			maxValue,
			disabled,
			yearsPerPage,
			isYearDisabled: propsIsYearDisabled,
			isYearUnavailable: propsIsYearUnavailable,
			calendarLabel,
			nextPage: propsNextPage,
			prevPage: propsPrevPage
		});
		const { isInvalid, isYearSelected } = useYearPickerState({
			date: modelValue,
			isYearDisabled,
			isYearUnavailable
		});
		watch(modelValue, (_modelValue) => {
			if (Array.isArray(_modelValue) && _modelValue.length) {
				const lastValue = _modelValue.at(-1);
				if (lastValue && !isSameYear(placeholder.value, lastValue)) onPlaceholderChange(lastValue);
			} else if (!Array.isArray(_modelValue) && _modelValue && !isSameYear(placeholder.value, _modelValue)) onPlaceholderChange(_modelValue);
		});
		function resolveYearValue(value, reference) {
			if (!reference) return value.copy();
			return value.copy().set({
				month: reference.month,
				day: reference.day
			});
		}
		function onYearChange(value) {
			if (!multiple.value) {
				if (!modelValue.value) {
					modelValue.value = resolveYearValue(value, placeholder.value);
					return;
				}
				if (!preventDeselect.value && isSameYear(modelValue.value, value)) {
					placeholder.value = resolveYearValue(value, modelValue.value);
					modelValue.value = void 0;
				} else modelValue.value = resolveYearValue(value, modelValue.value);
			} else if (!modelValue.value) modelValue.value = [resolveYearValue(value, placeholder.value)];
			else if (Array.isArray(modelValue.value)) {
				const index = modelValue.value.findIndex((date) => isSameYear(date, value));
				if (index === -1) modelValue.value = [...modelValue.value, resolveYearValue(value, placeholder.value)];
				else if (!preventDeselect.value) {
					const next = modelValue.value.filter((date) => !isSameYear(date, value));
					if (!next.length) {
						placeholder.value = resolveYearValue(value, modelValue.value[index]);
						modelValue.value = void 0;
						return;
					}
					modelValue.value = next.map((date) => date.copy());
				}
			}
		}
		provideYearPickerRootContext({
			isYearUnavailable,
			dir,
			isYearDisabled,
			locale,
			formatter,
			modelValue,
			placeholder,
			disabled,
			initialFocus,
			grid,
			multiple,
			readonly,
			preventDeselect,
			fullCalendarLabel,
			headingValue,
			headingId,
			isInvalid,
			isYearSelected,
			isNextButtonDisabled,
			isPrevButtonDisabled,
			nextPage,
			prevPage,
			parentElement,
			onPlaceholderChange,
			onYearChange,
			minValue,
			maxValue,
			yearsPerPage
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-label": unref(fullCalendarLabel),
				"data-readonly": unref(readonly) ? "" : void 0,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-invalid": unref(isInvalid) ? "" : void 0,
				dir: unref(dir)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					date: unref(placeholder),
					grid: unref(grid),
					locale: unref(locale),
					modelValue: unref(modelValue)
				}), createElementVNode("div", _hoisted_1$1, [createElementVNode("div", _hoisted_2$1, toDisplayString(unref(fullCalendarLabel)), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"data-readonly",
				"data-disabled",
				"data-invalid",
				"dir"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerCell.js
var YearPickerCell_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerCell",
	props: {
		date: {
			type: null,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "td"
		}
	},
	setup(__props) {
		const rootContext = injectYearPickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "gridcell",
				"aria-selected": unref(rootContext).isYearSelected(_ctx.date) ? true : void 0,
				"aria-disabled": unref(rootContext).isYearDisabled(_ctx.date) || unref(rootContext).isYearUnavailable?.(_ctx.date),
				"data-disabled": unref(rootContext).isYearDisabled(_ctx.date) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-selected",
				"aria-disabled",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerCellTrigger.js
var YearPickerCellTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerCellTrigger",
	props: {
		year: {
			type: null,
			required: true
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
		const kbd = useKbd();
		const rootContext = injectYearPickerRootContext();
		const { primitiveElement } = usePrimitiveElement();
		const yearValue = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.fullYear(toDate(props.year));
		});
		const labelText = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.custom(toDate(props.year), { year: "numeric" });
		});
		const isUnavailable = computed(() => rootContext.isYearUnavailable?.(props.year) ?? false);
		const isCurrentYear = computed(() => {
			const todayDate = toCalendar(today(getLocalTimeZone()), props.year.calendar);
			return isSameYear(props.year, todayDate);
		});
		const isDisabled = computed(() => rootContext.isYearDisabled(props.year));
		const isFocusedYear = computed(() => {
			return !rootContext.disabled.value && isSameYear(props.year, rootContext.placeholder.value);
		});
		const isSelectedYear = computed(() => rootContext.isYearSelected(props.year));
		function changeYear(date) {
			if (rootContext.readonly.value) return;
			if (rootContext.isYearDisabled(date) || rootContext.isYearUnavailable?.(date)) return;
			rootContext.onYearChange(date);
		}
		function handleClick() {
			if (isDisabled.value) return;
			changeYear(props.year);
		}
		function handleArrowKey(e) {
			if (isDisabled.value) return;
			if ((e.code === kbd.ENTER || e.code === kbd.SPACE_CODE) && (e.ctrlKey || e.metaKey || e.altKey)) return;
			e.preventDefault();
			e.stopPropagation();
			const parentElement = rootContext.parentElement.value;
			const sign = rootContext.dir.value === "rtl" ? -1 : 1;
			switch (e.code) {
				case kbd.ARROW_RIGHT:
					shiftFocus(props.year, sign);
					break;
				case kbd.ARROW_LEFT:
					shiftFocus(props.year, -sign);
					break;
				case kbd.ARROW_UP:
					shiftFocus(props.year, -4);
					break;
				case kbd.ARROW_DOWN:
					shiftFocus(props.year, 4);
					break;
				case kbd.PAGE_UP:
					shiftFocusPage(-1);
					break;
				case kbd.PAGE_DOWN:
					shiftFocusPage(1);
					break;
				case kbd.ENTER:
				case kbd.SPACE_CODE: changeYear(props.year);
			}
			function shiftFocus(currentYear, add, depth = 0) {
				if (depth > 48) return;
				const candidateYearValue = currentYear.add({ years: add });
				if (rootContext.minValue.value && endOfYear(candidateYearValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && startOfYear(candidateYearValue).compare(rootContext.maxValue.value) > 0) return;
				const candidateYear = parentElement.querySelector(`[data-value='${candidateYearValue.toString()}']`);
				if (!candidateYear) {
					if (add > 0) {
						if (rootContext.isNextButtonDisabled()) return;
						rootContext.nextPage();
					} else {
						if (rootContext.isPrevButtonDisabled()) return;
						rootContext.prevPage();
					}
					nextTick(() => {
						shiftFocus(currentYear, add, depth + 1);
					});
					return;
				}
				if (candidateYear && candidateYear.hasAttribute("data-disabled")) return shiftFocus(candidateYearValue, add, depth + 1);
				rootContext.onPlaceholderChange(candidateYearValue);
				candidateYear?.focus();
			}
			function shiftFocusPage(direction) {
				const yearsPerPage = rootContext.yearsPerPage.value;
				const candidateYearValue = props.year.add({ years: direction * yearsPerPage });
				if (rootContext.minValue.value && endOfYear(candidateYearValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && startOfYear(candidateYearValue).compare(rootContext.maxValue.value) > 0) return;
				if (direction > 0) {
					if (rootContext.isNextButtonDisabled()) return;
					rootContext.nextPage();
				} else {
					if (rootContext.isPrevButtonDisabled()) return;
					rootContext.prevPage();
				}
				nextTick(() => {
					const candidateYear = parentElement.querySelector(`[data-value='${candidateYearValue.toString()}']`);
					if (candidateYear && !candidateYear.hasAttribute("data-disabled")) {
						rootContext.onPlaceholderChange(candidateYearValue);
						candidateYear?.focus();
						return;
					}
					if (!candidateYear || candidateYear.hasAttribute("data-disabled")) shiftFocus(candidateYearValue, direction > 0 ? 1 : -1, 1);
				});
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: props.as,
				"as-child": props.asChild,
				role: "button",
				"aria-label": labelText.value,
				"data-reka-year-picker-cell-trigger": "",
				"aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
				"data-selected": isSelectedYear.value ? "" : void 0,
				"data-value": _ctx.year.toString(),
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-unavailable": isUnavailable.value ? "" : void 0,
				"data-today": isCurrentYear.value ? "" : void 0,
				"data-focused": isFocusedYear.value ? "" : void 0,
				tabindex: isFocusedYear.value ? 0 : isDisabled.value ? void 0 : -1,
				onClick: handleClick,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"space",
					"enter",
					"page-up",
					"page-down"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					yearValue: yearValue.value,
					disabled: isDisabled.value,
					today: isCurrentYear.value,
					selected: isSelectedYear.value,
					unavailable: isUnavailable.value
				}, () => [createTextVNode(toDisplayString(yearValue.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"aria-disabled",
				"data-selected",
				"data-value",
				"data-disabled",
				"data-unavailable",
				"data-today",
				"data-focused",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerGrid.js
var YearPickerGrid_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerGrid",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "table"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectYearPickerRootContext();
		const disabled = computed(() => rootContext.disabled.value ? true : void 0);
		const readonly = computed(() => rootContext.readonly.value ? true : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				tabindex: "-1",
				role: "application",
				"aria-labelledby": unref(rootContext).headingId,
				"aria-readonly": readonly.value,
				"aria-disabled": disabled.value,
				"data-readonly": readonly.value && "",
				"data-disabled": disabled.value && ""
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-labelledby",
				"aria-readonly",
				"aria-disabled",
				"data-readonly",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerGridBody.js
var YearPickerGridBody_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerGridBody",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tbody"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerGridRow.js
var YearPickerGridRow_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerGridRow",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tr"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { role: "row" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerHeader.js
var YearPickerHeader_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerHeader",
	props: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerHeading.js
var YearPickerHeading_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerHeading",
	props: {
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
		const rootContext = injectYearPickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).headingId,
				role: "heading",
				"aria-level": "2",
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { headingValue: unref(rootContext).headingValue.value }, () => [createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)])]),
				_: 3
			}, 16, ["id", "data-disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerNext.js
var YearPickerNext_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerNext",
	props: {
		nextPage: {
			type: Function,
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
		const rootContext = injectYearPickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.nextPage(props.nextPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Next page",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Next page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearPicker/YearPickerPrev.js
var YearPickerPrev_default = /* @__PURE__ */ defineComponent({
	__name: "YearPickerPrev",
	props: {
		prevPage: {
			type: Function,
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
		const rootContext = injectYearPickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.prevPage(props.prevPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-label": "Previous page",
				as: props.as,
				"as-child": props.asChild,
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Prev page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/useRangeYearPicker.js
function useRangeYearPickerState(props) {
	const isStartInvalid = computed(() => {
		if (!props.start.value) return false;
		if (props.isYearDisabled(props.start.value)) return true;
		return false;
	});
	const isEndInvalid = computed(() => {
		if (!props.end.value) return false;
		if (props.isYearDisabled(props.end.value)) return true;
		return false;
	});
	const isInvalid = computed(() => {
		if (isStartInvalid.value || isEndInvalid.value) return true;
		if (props.start.value && props.end.value && props.end.value.year < props.start.value.year) return true;
		return false;
	});
	const isSelectionStart = (date) => {
		if (!props.start.value) return false;
		return isSameYear(props.start.value, date);
	};
	const isSelectionEnd = (date) => {
		if (!props.end.value) return false;
		return isSameYear(props.end.value, date);
	};
	const isSelected = (date) => {
		if (props.start.value && isSameYear(props.start.value, date)) return true;
		if (props.end.value && isSameYear(props.end.value, date)) return true;
		if (props.end.value && props.start.value) return date.year > props.start.value.year && date.year < props.end.value.year;
		return false;
	};
	const rangeIsYearDisabled = (date) => {
		if (props.isYearDisabled(date)) return true;
		if (props.maximumYears?.value) {
			const maximumYears = props.maximumYears.value;
			if (props.start.value && props.end.value) {
				if (props.fixedDate.value) {
					const diff = getYearsBetween(props.start.value, props.end.value);
					if (diff <= maximumYears) {
						const yearsLeft = maximumYears - diff;
						const startLimit = props.start.value.subtract({ years: yearsLeft });
						const endLimit = props.end.value.add({ years: yearsLeft });
						return date.year < startLimit.year || date.year > endLimit.year;
					}
					const fixedValue = props.fixedDate.value === "start" ? props.start.value : props.end.value;
					const maxDate = fixedValue.add({ years: maximumYears - 1 });
					const minDate = fixedValue.subtract({ years: maximumYears - 1 });
					return date.year < minDate.year || date.year > maxDate.year;
				}
				return false;
			}
			if (props.start.value) {
				const maxDate = props.start.value.add({ years: maximumYears - 1 });
				const minDate = props.start.value.subtract({ years: maximumYears - 1 });
				return date.year < minDate.year || date.year > maxDate.year;
			}
		}
		return false;
	};
	const highlightedRange = computed(() => {
		if (props.start.value && props.end.value && !props.fixedDate.value) return null;
		if (!props.start.value || !props.focusedValue.value) return null;
		const isStartBeforeFocused = props.start.value.year < props.focusedValue.value.year;
		const start = isStartBeforeFocused ? props.start.value : props.focusedValue.value;
		const end = isStartBeforeFocused ? props.focusedValue.value : props.start.value;
		if (isSameYear(start, end)) return {
			start,
			end
		};
		if (props.maximumYears?.value && !props.end.value) {
			const maximumYears = props.maximumYears.value;
			const anchor = props.start.value;
			const focused = props.focusedValue.value;
			if (focused.year >= anchor.year) {
				const maxEnd = anchor.add({ years: maximumYears - 1 });
				return {
					start: anchor,
					end: focused.year > maxEnd.year ? maxEnd : focused
				};
			} else {
				const minStart = anchor.subtract({ years: maximumYears - 1 });
				return {
					start: focused.year < minStart.year ? minStart : focused,
					end: anchor
				};
			}
		}
		if (areAllYearsBetweenValid(start, end, props.allowNonContiguousRanges.value ? () => false : props.isYearUnavailable, rangeIsYearDisabled)) return {
			start,
			end
		};
		return null;
	});
	const isHighlightedStart = (date) => {
		if (!highlightedRange.value?.start) return false;
		return isSameYear(highlightedRange.value.start, date);
	};
	const isHighlightedEnd = (date) => {
		if (!highlightedRange.value?.end) return false;
		return isSameYear(highlightedRange.value.end, date);
	};
	return {
		isInvalid,
		isSelected,
		highlightedRange,
		isSelectionStart,
		isSelectionEnd,
		isHighlightedStart,
		isHighlightedEnd,
		isYearDisabled: rangeIsYearDisabled
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerRoot.js
var _hoisted_1 = { style: {
	"border": "0px",
	"clip": "rect(0px, 0px, 0px, 0px)",
	"clip-path": "inset(50%)",
	"height": "1px",
	"margin": "-1px",
	"overflow": "hidden",
	"padding": "0px",
	"position": "absolute",
	"white-space": "nowrap",
	"width": "1px"
} };
var _hoisted_2 = {
	role: "heading",
	"aria-level": "2"
};
var [injectYearRangePickerRootContext, provideYearRangePickerRootContext] = /*#__PURE__*/ createContext("YearRangePickerRoot");
var YearRangePickerRoot_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerRoot",
	props: {
		defaultPlaceholder: {
			type: null,
			required: false
		},
		defaultValue: {
			type: Object,
			required: false,
			default: () => ({
				start: void 0,
				end: void 0
			})
		},
		modelValue: {
			type: [Object, null],
			required: false
		},
		placeholder: {
			type: null,
			required: false,
			default: void 0
		},
		allowNonContiguousRanges: {
			type: Boolean,
			required: false,
			default: false
		},
		preventDeselect: {
			type: Boolean,
			required: false,
			default: false
		},
		maximumYears: {
			type: Number,
			required: false,
			default: void 0
		},
		calendarLabel: {
			type: String,
			required: false
		},
		maxValue: {
			type: null,
			required: false
		},
		minValue: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: false
		},
		initialFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		isYearDisabled: {
			type: Function,
			required: false,
			default: void 0
		},
		isYearUnavailable: {
			type: Function,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
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
		fixedDate: {
			type: String,
			required: false
		},
		yearsPerPage: {
			type: Number,
			required: false,
			default: 12
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
	emits: [
		"update:modelValue",
		"update:placeholder",
		"update:startValue"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, initialFocus, preventDeselect, isYearUnavailable: propsIsYearUnavailable, isYearDisabled: propsIsYearDisabled, calendarLabel, maxValue, minValue, dir: propDir, locale: propLocale, nextPage: propsNextPage, prevPage: propsPrevPage, allowNonContiguousRanges, fixedDate, maximumYears, yearsPerPage } = toRefs(props);
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const dir = useDirection(propDir);
		const locale = useLocale(propLocale);
		const headingId = useId$1(void 0, "reka-year-range-picker-heading");
		const lastPressedDateValue = ref();
		const focusedValue = ref();
		const isEditing = ref(false);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? {
				start: void 0,
				end: void 0
			},
			passive: props.modelValue === void 0
		});
		const normalizeRange = (value) => value ?? {
			start: void 0,
			end: void 0
		};
		const normalizedModelValue = computed(() => normalizeRange(modelValue.value));
		const validModelValue = ref(normalizeRange(modelValue.value));
		const defaultDate = getDefaultDate({
			defaultPlaceholder: props.placeholder,
			defaultValue: normalizeRange(modelValue.value).start,
			locale: props.locale
		});
		const startValue = ref(normalizeRange(modelValue.value).start);
		const endValue = ref(normalizeRange(modelValue.value).end);
		const placeholder = useVModel(props, "placeholder", emits, {
			defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
			passive: props.placeholder === void 0
		});
		function onPlaceholderChange(value) {
			placeholder.value = value.copy();
		}
		const { fullCalendarLabel, headingValue, isYearDisabled, isYearUnavailable, isNextButtonDisabled, isPrevButtonDisabled, grid, nextPage, prevPage, formatter } = useYearPicker({
			locale,
			placeholder,
			minValue,
			maxValue,
			disabled,
			yearsPerPage,
			isYearDisabled: propsIsYearDisabled,
			isYearUnavailable: propsIsYearUnavailable,
			calendarLabel,
			nextPage: propsNextPage,
			prevPage: propsPrevPage
		});
		const { isInvalid, isSelected, highlightedRange, isSelectionStart, isSelectionEnd, isHighlightedStart, isHighlightedEnd, isYearDisabled: rangeIsYearDisabled } = useRangeYearPickerState({
			start: startValue,
			end: endValue,
			isYearDisabled,
			isYearUnavailable,
			focusedValue,
			allowNonContiguousRanges,
			fixedDate,
			maximumYears
		});
		watch(modelValue, (_modelValue) => {
			const next = normalizeRange(_modelValue);
			if (!(!next.start && !startValue.value || !!next.start && !!startValue.value && isSameYear(next.start, startValue.value))) startValue.value = next.start?.copy?.();
			if (!(!next.end && !endValue.value || !!next.end && !!endValue.value && isSameYear(next.end, endValue.value))) endValue.value = next.end?.copy?.();
		});
		watch(startValue, (_startValue) => {
			if (_startValue && !isSameYear(_startValue, placeholder.value)) onPlaceholderChange(_startValue);
			emits("update:startValue", _startValue);
		});
		watch([startValue, endValue], ([_startValue, _endValue]) => {
			const value = modelValue.value;
			if (value && value.start && value.end && _startValue && _endValue && isSameYear(value.start, _startValue) && isSameYear(value.end, _endValue)) return;
			isEditing.value = true;
			if (_endValue && _startValue) {
				const nextValue = _endValue.year < _startValue.year ? {
					start: _endValue.copy(),
					end: _startValue.copy()
				} : {
					start: _startValue.copy(),
					end: _endValue.copy()
				};
				modelValue.value = {
					start: nextValue.start,
					end: nextValue.end
				};
				isEditing.value = false;
				validModelValue.value = {
					start: nextValue.start.copy(),
					end: nextValue.end.copy()
				};
			} else modelValue.value = _startValue ? {
				start: _startValue.copy(),
				end: void 0
			} : {
				start: _endValue?.copy(),
				end: void 0
			};
		});
		const kbd = useKbd();
		useEventListener(parentElement, "keydown", (ev) => {
			if (ev.key === kbd.ESCAPE && isEditing.value) {
				startValue.value = validModelValue.value.start?.copy();
				endValue.value = validModelValue.value.end?.copy();
			}
		});
		provideYearRangePickerRootContext({
			isYearUnavailable,
			startValue,
			endValue,
			formatter,
			modelValue: normalizedModelValue,
			placeholder,
			disabled,
			initialFocus,
			grid,
			readonly,
			preventDeselect,
			fullCalendarLabel,
			headingValue,
			headingId,
			isInvalid,
			isYearDisabled: rangeIsYearDisabled,
			allowNonContiguousRanges,
			highlightedRange,
			focusedValue,
			lastPressedDateValue,
			isSelected,
			isSelectionEnd,
			isSelectionStart,
			isNextButtonDisabled,
			isPrevButtonDisabled,
			nextPage,
			prevPage,
			parentElement,
			onPlaceholderChange,
			locale,
			dir,
			isHighlightedStart,
			isHighlightedEnd,
			fixedDate,
			maximumYears,
			minValue,
			maxValue,
			yearsPerPage
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-label": unref(fullCalendarLabel),
				"data-readonly": unref(readonly) ? "" : void 0,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-invalid": unref(isInvalid) ? "" : void 0,
				dir: unref(dir)
			}, {
				default: withCtx(() => [createElementVNode("div", _hoisted_1, [createElementVNode("div", _hoisted_2, toDisplayString(unref(fullCalendarLabel)), 1)]), renderSlot(_ctx.$slots, "default", {
					date: unref(placeholder),
					grid: unref(grid),
					locale: unref(locale),
					modelValue: normalizedModelValue.value
				})]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"data-readonly",
				"data-disabled",
				"data-invalid",
				"dir"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerCell.js
var YearRangePickerCell_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerCell",
	props: {
		date: {
			type: null,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "td"
		}
	},
	setup(__props) {
		const rootContext = injectYearRangePickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "gridcell",
				"aria-selected": unref(rootContext).isSelected(_ctx.date) ? true : void 0,
				"aria-disabled": unref(rootContext).isYearDisabled(_ctx.date) || unref(rootContext).isYearUnavailable?.(_ctx.date),
				"data-disabled": unref(rootContext).isYearDisabled(_ctx.date) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-selected",
				"aria-disabled",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerCellTrigger.js
var YearRangePickerCellTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerCellTrigger",
	props: {
		year: {
			type: null,
			required: true
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
		const kbd = useKbd();
		const rootContext = injectYearRangePickerRootContext();
		const { primitiveElement } = usePrimitiveElement();
		const yearValue = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.fullYear(toDate(props.year));
		});
		const labelText = computed(() => {
			rootContext.locale.value;
			return rootContext.formatter.custom(toDate(props.year), { year: "numeric" });
		});
		const isUnavailable = computed(() => rootContext.isYearUnavailable?.(props.year) ?? false);
		const isCurrentYear = computed(() => {
			const todayDate = toCalendar(today(getLocalTimeZone()), props.year.calendar);
			return isSameYear(props.year, todayDate);
		});
		const isDisabled = computed(() => rootContext.isYearDisabled(props.year));
		const isFocusedYear = computed(() => {
			return !rootContext.disabled.value && isSameYear(props.year, rootContext.placeholder.value);
		});
		const isSelectedYear = computed(() => rootContext.isSelected(props.year));
		const isSelectionStart = computed(() => rootContext.isSelectionStart(props.year));
		const isSelectionEnd = computed(() => rootContext.isSelectionEnd(props.year));
		const isHighlightStart = computed(() => rootContext.isHighlightedStart(props.year));
		const isHighlightEnd = computed(() => rootContext.isHighlightedEnd(props.year));
		const isHighlighted = computed(() => rootContext.highlightedRange.value ? isYearBetweenInclusive(props.year, rootContext.highlightedRange.value.start, rootContext.highlightedRange.value.end) : false);
		const allowNonContiguousRanges = computed(() => rootContext.allowNonContiguousRanges.value);
		function changeYear(e, date) {
			if (rootContext.readonly.value) return;
			if (rootContext.isYearDisabled(date) || rootContext.isYearUnavailable?.(date)) return;
			if (rootContext.startValue.value && rootContext.highlightedRange.value === null) {
				if (isSameYear(date, rootContext.startValue.value) && !rootContext.preventDeselect.value && !rootContext.endValue.value) {
					rootContext.startValue.value = void 0;
					rootContext.onPlaceholderChange(date);
					rootContext.lastPressedDateValue.value = date.copy();
					return;
				} else if (!rootContext.endValue.value) {
					e.preventDefault();
					if (rootContext.lastPressedDateValue.value && isSameYear(rootContext.lastPressedDateValue.value, date)) rootContext.startValue.value = date.copy();
					rootContext.lastPressedDateValue.value = date.copy();
					return;
				}
			}
			rootContext.lastPressedDateValue.value = date.copy();
			if (rootContext.startValue.value && rootContext.endValue.value && isSameYear(rootContext.startValue.value, rootContext.endValue.value) && isSameYear(rootContext.startValue.value, date) && !rootContext.preventDeselect.value) {
				rootContext.startValue.value = void 0;
				rootContext.endValue.value = void 0;
				rootContext.onPlaceholderChange(date);
				return;
			}
			if (!rootContext.startValue.value) rootContext.startValue.value = date.copy();
			else if (!rootContext.endValue.value) rootContext.endValue.value = date.copy();
			else if (rootContext.endValue.value && rootContext.startValue.value) {
				if (!rootContext.fixedDate.value) {
					rootContext.endValue.value = void 0;
					rootContext.startValue.value = date.copy();
				} else if (rootContext.fixedDate.value === "start") if (date.compare(rootContext.startValue.value) < 0) rootContext.startValue.value = date.copy();
				else rootContext.endValue.value = date.copy();
				else if (rootContext.fixedDate.value === "end") if (date.compare(rootContext.endValue.value) > 0) rootContext.endValue.value = date.copy();
				else rootContext.startValue.value = date.copy();
			}
		}
		function handleClick(e) {
			if (isDisabled.value) return;
			changeYear(e, props.year);
		}
		function handleFocus() {
			if (isDisabled.value || rootContext.isYearUnavailable?.(props.year)) return;
			rootContext.focusedValue.value = props.year.copy();
		}
		function handleArrowKey(e) {
			if (isDisabled.value) return;
			if ((e.code === kbd.ENTER || e.code === kbd.SPACE_CODE) && (e.ctrlKey || e.metaKey || e.altKey)) return;
			e.preventDefault();
			e.stopPropagation();
			const parentElement = rootContext.parentElement.value;
			const sign = rootContext.dir.value === "rtl" ? -1 : 1;
			switch (e.code) {
				case kbd.ARROW_RIGHT:
					shiftFocus(props.year, sign);
					break;
				case kbd.ARROW_LEFT:
					shiftFocus(props.year, -sign);
					break;
				case kbd.ARROW_UP:
					shiftFocus(props.year, -4);
					break;
				case kbd.ARROW_DOWN:
					shiftFocus(props.year, 4);
					break;
				case kbd.PAGE_UP:
					shiftFocusPage(-1);
					break;
				case kbd.PAGE_DOWN:
					shiftFocusPage(1);
					break;
				case kbd.ENTER:
				case kbd.SPACE_CODE: changeYear(e, props.year);
			}
			function shiftFocus(currentYear, add, depth = 0) {
				if (depth > 48) return;
				const candidateYearValue = currentYear.add({ years: add });
				if (rootContext.minValue.value && endOfYear(candidateYearValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && startOfYear(candidateYearValue).compare(rootContext.maxValue.value) > 0) return;
				const candidateYear = parentElement.querySelector(`[data-value='${candidateYearValue.toString()}']`);
				if (!candidateYear) {
					if (add > 0) {
						if (rootContext.isNextButtonDisabled()) return;
						rootContext.nextPage();
					} else {
						if (rootContext.isPrevButtonDisabled()) return;
						rootContext.prevPage();
					}
					nextTick(() => {
						shiftFocus(currentYear, add, depth + 1);
					});
					return;
				}
				if (candidateYear && candidateYear.hasAttribute("data-disabled")) return shiftFocus(candidateYearValue, add, depth + 1);
				rootContext.onPlaceholderChange(candidateYearValue);
				candidateYear?.focus();
			}
			function shiftFocusPage(direction) {
				const yearsPerPage = rootContext.yearsPerPage.value;
				const candidateYearValue = props.year.add({ years: direction * yearsPerPage });
				if (rootContext.minValue.value && endOfYear(candidateYearValue).compare(rootContext.minValue.value) < 0 || rootContext.maxValue.value && startOfYear(candidateYearValue).compare(rootContext.maxValue.value) > 0) return;
				if (direction > 0) {
					if (rootContext.isNextButtonDisabled()) return;
					rootContext.nextPage();
				} else {
					if (rootContext.isPrevButtonDisabled()) return;
					rootContext.prevPage();
				}
				nextTick(() => {
					const candidateYear = parentElement.querySelector(`[data-value='${candidateYearValue.toString()}']`);
					if (candidateYear && !candidateYear.hasAttribute("data-disabled")) {
						rootContext.onPlaceholderChange(candidateYearValue);
						candidateYear?.focus();
						return;
					}
					if (!candidateYear || candidateYear.hasAttribute("data-disabled")) shiftFocus(candidateYearValue, direction > 0 ? 1 : -1, 1);
				});
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: props.as,
				"as-child": props.asChild,
				role: "button",
				"aria-label": labelText.value,
				"data-reka-year-range-picker-cell-trigger": "",
				"aria-pressed": isSelectedYear.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? true : void 0,
				"aria-disabled": isDisabled.value || isUnavailable.value ? true : void 0,
				"data-highlighted": isHighlighted.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? "" : void 0,
				"data-selection-start": isSelectionStart.value ? true : void 0,
				"data-selection-end": isSelectionEnd.value ? true : void 0,
				"data-highlighted-start": isHighlightStart.value ? true : void 0,
				"data-highlighted-end": isHighlightEnd.value ? true : void 0,
				"data-selected": isSelectedYear.value && (allowNonContiguousRanges.value || !isUnavailable.value) ? true : void 0,
				"data-value": _ctx.year.toString(),
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-unavailable": isUnavailable.value ? "" : void 0,
				"data-today": isCurrentYear.value ? "" : void 0,
				"data-focused": isFocusedYear.value ? "" : void 0,
				tabindex: isFocusedYear.value ? 0 : isDisabled.value ? void 0 : -1,
				onClick: handleClick,
				onFocusin: handleFocus,
				onMouseenter: handleFocus,
				onKeydown: withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"space",
					"enter",
					"page-up",
					"page-down"
				])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					yearValue: yearValue.value,
					disabled: isDisabled.value,
					today: isCurrentYear.value,
					selected: isSelectedYear.value,
					unavailable: isUnavailable.value,
					highlighted: isHighlighted.value && (allowNonContiguousRanges.value || !isUnavailable.value),
					highlightedStart: isHighlightStart.value,
					highlightedEnd: isHighlightEnd.value,
					selectionStart: isSelectionStart.value,
					selectionEnd: isSelectionEnd.value
				}, () => [createTextVNode(toDisplayString(yearValue.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-label",
				"aria-pressed",
				"aria-disabled",
				"data-highlighted",
				"data-selection-start",
				"data-selection-end",
				"data-highlighted-start",
				"data-highlighted-end",
				"data-selected",
				"data-value",
				"data-disabled",
				"data-unavailable",
				"data-today",
				"data-focused",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerGrid.js
var YearRangePickerGrid_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerGrid",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "table"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectYearRangePickerRootContext();
		const disabled = computed(() => rootContext.disabled.value ? true : void 0);
		const readonly = computed(() => rootContext.readonly.value ? true : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				tabindex: "-1",
				role: "application",
				"aria-labelledby": unref(rootContext).headingId,
				"aria-readonly": readonly.value,
				"aria-disabled": disabled.value,
				"data-readonly": readonly.value && "",
				"data-disabled": disabled.value && ""
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-labelledby",
				"aria-readonly",
				"aria-disabled",
				"data-readonly",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerGridBody.js
var YearRangePickerGridBody_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerGridBody",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tbody"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerGridRow.js
var YearRangePickerGridRow_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerGridRow",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "tr"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { role: "row" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerHeader.js
var YearRangePickerHeader_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerHeader",
	props: {
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
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerHeading.js
var YearRangePickerHeading_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerHeading",
	props: {
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
		const rootContext = injectYearRangePickerRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).headingId,
				role: "heading",
				"aria-level": "2",
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { headingValue: unref(rootContext).headingValue.value }, () => [createTextVNode(toDisplayString(unref(rootContext).headingValue.value), 1)])]),
				_: 3
			}, 16, ["id", "data-disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerNext.js
var YearRangePickerNext_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerNext",
	props: {
		nextPage: {
			type: Function,
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
		const rootContext = injectYearRangePickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.nextPage(props.nextPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: props.as,
				"as-child": props.asChild,
				"aria-label": "Next page",
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Next page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/YearRangePicker/YearRangePickerPrev.js
var YearRangePickerPrev_default = /* @__PURE__ */ defineComponent({
	__name: "YearRangePickerPrev",
	props: {
		prevPage: {
			type: Function,
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
		const rootContext = injectYearRangePickerRootContext();
		const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
		function handleClick() {
			if (disabled.value) return;
			rootContext.prevPage(props.prevPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-label": "Previous page",
				as: props.as,
				"as-child": props.asChild,
				type: props.as === "button" ? "button" : void 0,
				"aria-disabled": disabled.value || void 0,
				"data-disabled": disabled.value || void 0,
				disabled: disabled.value,
				onClick: handleClick
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { disabled: disabled.value }, () => [_cache[0] || (_cache[0] = createTextVNode(" Prev page "))])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"type",
				"aria-disabled",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/namespaced/index.mjs
var Calendar = {
	Root: CalendarRoot_default,
	Header: CalendarHeader_default,
	Heading: CalendarHeading_default,
	Grid: CalendarGrid_default,
	Cell: CalendarCell_default,
	HeadCell: CalendarHeadCell_default,
	Next: CalendarNext_default,
	Prev: CalendarPrev_default,
	GridHead: CalendarGridHead_default,
	GridBody: CalendarGridBody_default,
	GridRow: CalendarGridRow_default,
	CellTrigger: CalendarCellTrigger_default
};
var DropdownMenu = {
	Root: DropdownMenuRoot_default,
	Trigger: DropdownMenuTrigger_default,
	Portal: DropdownMenuPortal_default,
	Content: DropdownMenuContent_default,
	Arrow: DropdownMenuArrow_default,
	Item: DropdownMenuItem_default,
	Group: DropdownMenuGroup_default,
	Separator: DropdownMenuSeparator_default,
	CheckboxItem: DropdownMenuCheckboxItem_default,
	ItemIndicator: DropdownMenuItemIndicator_default,
	Label: DropdownMenuLabel_default,
	RadioGroup: DropdownMenuRadioGroup_default,
	RadioItem: DropdownMenuRadioItem_default,
	Sub: DropdownMenuSub_default,
	SubContent: DropdownMenuSubContent_default,
	SubTrigger: DropdownMenuSubTrigger_default,
	Filter: DropdownMenuFilter_default
};
var HoverCard = {
	Root: HoverCardRoot_default,
	Trigger: HoverCardTrigger_default,
	Portal: HoverCardPortal_default,
	Content: HoverCardContent_default,
	Arrow: HoverCardArrow_default
};
var MonthPicker = {
	Root: MonthPickerRoot_default,
	Header: MonthPickerHeader_default,
	Heading: MonthPickerHeading_default,
	Grid: MonthPickerGrid_default,
	Cell: MonthPickerCell_default,
	Next: MonthPickerNext_default,
	Prev: MonthPickerPrev_default,
	GridBody: MonthPickerGridBody_default,
	GridRow: MonthPickerGridRow_default,
	CellTrigger: MonthPickerCellTrigger_default
};
var MonthRangePicker = {
	Root: MonthRangePickerRoot_default,
	Header: MonthRangePickerHeader_default,
	Heading: MonthRangePickerHeading_default,
	Grid: MonthRangePickerGrid_default,
	Cell: MonthRangePickerCell_default,
	Next: MonthRangePickerNext_default,
	Prev: MonthRangePickerPrev_default,
	GridBody: MonthRangePickerGridBody_default,
	GridRow: MonthRangePickerGridRow_default,
	CellTrigger: MonthRangePickerCellTrigger_default
};
var Popover = {
	Root: PopoverRoot_default,
	Trigger: PopoverTrigger_default,
	Portal: PopoverPortal_default,
	Content: PopoverContent_default,
	Arrow: PopoverArrow_default,
	Close: PopoverClose_default,
	Anchor: PopoverAnchor_default
};
var RangeCalendar = {
	Root: RangeCalendarRoot_default,
	Header: RangeCalendarHeader_default,
	Heading: RangeCalendarHeading_default,
	Grid: RangeCalendarGrid_default,
	Cell: RangeCalendarCell_default,
	HeadCell: RangeCalendarHeadCell_default,
	Next: RangeCalendarNext_default,
	Prev: RangeCalendarPrev_default,
	GridHead: RangeCalendarGridHead_default,
	GridBody: RangeCalendarGridBody_default,
	GridRow: RangeCalendarGridRow_default,
	CellTrigger: RangeCalendarCellTrigger_default
};
var YearPicker = {
	Root: YearPickerRoot_default,
	Header: YearPickerHeader_default,
	Heading: YearPickerHeading_default,
	Grid: YearPickerGrid_default,
	Cell: YearPickerCell_default,
	Next: YearPickerNext_default,
	Prev: YearPickerPrev_default,
	GridBody: YearPickerGridBody_default,
	GridRow: YearPickerGridRow_default,
	CellTrigger: YearPickerCellTrigger_default
};
var YearRangePicker = {
	Root: YearRangePickerRoot_default,
	Header: YearRangePickerHeader_default,
	Heading: YearRangePickerHeading_default,
	Grid: YearRangePickerGrid_default,
	Cell: YearRangePickerCell_default,
	Next: YearRangePickerNext_default,
	Prev: YearRangePickerPrev_default,
	GridBody: YearRangePickerGridBody_default,
	GridRow: YearRangePickerGridRow_default,
	CellTrigger: YearRangePickerCellTrigger_default
};

export { Calendar as C, DropdownMenu as D, FocusScope_default as F, HoverCard as H, MAP_KEY_TO_FOCUS_INTENT as M, Popover as P, RangeCalendar as R, YearPicker as Y, DropdownMenuArrow_default as a, DropdownMenuRoot_default as b, DropdownMenuTrigger_default as c, MonthPicker as d, MonthRangePicker as e, RovingFocusGroup_default as f, YearRangePicker as g, focusFirst as h, focusFirst$1 as i, getFocusIntent as j, getNextMatch as k, getOpenState as l, getWeekNumber as m, injectRovingFocusGroupContext as n, useBodyScrollLock as o, useComposing as p, useFocusGuards as q, useHideOthers as r, useKbd as s, useTypeahead as t, useArrowNavigation as u, wrapArray as w };
//# sourceMappingURL=namespaced-CtaDkKU2.mjs.map
