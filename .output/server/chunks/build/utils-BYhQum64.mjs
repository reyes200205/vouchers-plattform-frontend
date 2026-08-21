//#region app/utils/index.ts
var CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
var RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
function isValidCurp(value) {
	return CURP_REGEX.test(value.trim().toUpperCase());
}
function isValidRfc(value) {
	return RFC_REGEX.test(value.trim().toUpperCase());
}
function extractApiErrorMessage(error, fallback) {
	const data = error?.data;
	return (data?.errors ? Object.values(data.errors)[0]?.[0] : void 0) || data?.message || fallback;
}

export { isValidRfc as a, extractApiErrorMessage as e, isValidCurp as i };
//# sourceMappingURL=utils-BYhQum64.mjs.map
