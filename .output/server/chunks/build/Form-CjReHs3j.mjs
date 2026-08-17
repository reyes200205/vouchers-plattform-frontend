import { ao as useComponentProps, ai as useAppConfig, af as tv, x as formBusInjectionKey, H as formStateInjectionKey, y as formErrorsInjectionKey, B as formInputsInjectionKey, D as formLoadingInjectionKey, G as formOptionsInjectionKey, as as useEventBus } from '../virtual/entry.mjs';
import { computed, useId, useTemplateRef, inject, provide, ref, reactive, readonly, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';

//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/utils/form.js
function isSuperStructSchema(schema) {
	return "schema" in schema && typeof schema.coercer === "function" && typeof schema.validator === "function" && typeof schema.refiner === "function";
}
function isStandardSchema(schema) {
	return "~standard" in schema;
}
async function validateStandardSchema(state, schema) {
	const result = await schema["~standard"].validate(state);
	if (result.issues) return {
		errors: result.issues?.map((issue) => ({
			name: issue.path?.map((item) => typeof item === "object" ? item.key : item).join(".") || "",
			message: issue.message
		})) || [],
		result: null
	};
	return {
		errors: null,
		result: result.value
	};
}
async function validateSuperstructSchema(state, schema) {
	const [err, result] = schema.validate(state);
	if (err) return {
		errors: err.failures().map((error) => ({
			message: error.message,
			name: error.path.join(".")
		})),
		result: null
	};
	return {
		errors: null,
		result
	};
}
function validateSchema(state, schema) {
	if (isStandardSchema(schema)) return validateStandardSchema(state, schema);
	else if (isSuperStructSchema(schema)) return validateSuperstructSchema(state, schema);
	else throw new Error("Form validation failed: Unsupported form schema");
}
function getAtPath(data, path) {
	if (!path) return data;
	return path.split(".").reduce((value2, key) => value2?.[key], data);
}
function setAtPath(data, path, value) {
	if (!path) return Object.assign(data, value);
	if (!data) return data;
	const keys = path.split(".");
	let current = data;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (current[key] === void 0 || current[key] === null) if (i + 1 < keys.length && !Number.isNaN(Number(keys[i + 1]))) current[key] = [];
		else current[key] = {};
		current = current[key];
	}
	const lastKey = keys[keys.length - 1];
	current[lastKey] = value;
	return data;
}
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/types/form.js
var FormValidationException = class FormValidationException extends Error {
	formId;
	errors;
	constructor(formId, errors) {
		super("Form validation exception");
		this.formId = formId;
		this.errors = errors;
		Object.setPrototypeOf(this, FormValidationException.prototype);
	}
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fform.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_default = { "base": "" };
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Form.vue
var _sfc_main = {
	__name: "UForm",
	__ssrInlineRender: true,
	props: {
		id: {
			type: [String, Number],
			required: false
		},
		schema: {
			type: null,
			required: false
		},
		state: {
			type: null,
			required: false
		},
		validate: {
			type: Function,
			required: false
		},
		validateOn: {
			type: Array,
			required: false,
			default() {
				return [
					"input",
					"blur",
					"change"
				];
			}
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		validateOnInputDelay: {
			type: Number,
			required: false,
			default: 300
		},
		transform: {
			type: null,
			required: false,
			default: () => true
		},
		nested: {
			type: Boolean,
			required: false
		},
		loadingAuto: {
			type: Boolean,
			required: false,
			default: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		onSubmit: {
			type: Function,
			required: false
		}
	},
	emits: ["submit", "error"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const props = useComponentProps("form", _props);
		const appConfig = useAppConfig();
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_default,
			...appConfig.ui?.form || {}
		}));
		const formId = props.id ?? useId();
		const formRef = useTemplateRef("formRef");
		const bus = useEventBus(`form-${formId}`);
		const parentBus = props.nested === true && inject(formBusInjectionKey, void 0);
		const parentState = props.nested === true ? inject(formStateInjectionKey, void 0) : void 0;
		const state = computed(() => {
			if (parentState?.value) return props.name ? getAtPath(parentState.value, props.name) : parentState.value;
			return props.state;
		});
		provide(formBusInjectionKey, bus);
		provide(formStateInjectionKey, state);
		const nestedForms = ref(/* @__PURE__ */ new Map());
		const errors = ref([]);
		provide(formErrorsInjectionKey, errors);
		const inputs = ref({});
		provide(formInputsInjectionKey, inputs);
		const dirtyFields = reactive(/* @__PURE__ */ new Set());
		const touchedFields = reactive(/* @__PURE__ */ new Set());
		const blurredFields = reactive(/* @__PURE__ */ new Set());
		function resolveErrorIds(errs) {
			return errs.map((err) => ({
				...err,
				id: err?.name ? inputs.value[err.name]?.id : void 0
			}));
		}
		const transformedState = ref(null);
		async function getErrors() {
			let errs = props.validate ? await props.validate(state.value) ?? [] : [];
			if (props.schema) {
				const { errors: errors2, result } = await validateSchema(state.value, props.schema);
				if (errors2) errs = errs.concat(errors2);
				else transformedState.value = result;
			}
			return resolveErrorIds(errs);
		}
		async function _validate(opts = {
			silent: false,
			nested: false,
			transform: false
		}) {
			const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name;
			let nestedResults = [];
			let nestedErrors = [];
			if (!names && opts.nested) {
				const validations = Array.from(nestedForms.value.values()).map((form) => validateNestedForm(form, opts));
				const results = await Promise.all(validations);
				nestedErrors = results.filter((r) => r.error).flatMap((r) => r.error.errors.map((e) => addFormPath(e, r.name)));
				nestedResults = results.filter((r) => r.output !== void 0);
			}
			const allErrors = [...await getErrors(), ...nestedErrors];
			if (names) errors.value = filterErrorsByNames(allErrors, names);
			else errors.value = allErrors;
			if (errors.value?.length) {
				if (opts.silent) return false;
				throw new FormValidationException(formId, errors.value);
			}
			if (opts.transform) {
				nestedResults.forEach((result) => {
					if (result.name) setAtPath(transformedState.value, result.name, result.output);
					else Object.assign(transformedState.value, result.output);
				});
				return transformedState.value ?? state.value;
			}
			return state.value;
		}
		const loading = ref(false);
		provide(formLoadingInjectionKey, readonly(loading));
		async function onSubmitWrapper(payload) {
			loading.value = !!props.loadingAuto;
			const event = payload;
			try {
				event.data = await _validate({
					nested: true,
					transform: props.transform
				});
				await props.onSubmit?.(event);
				dirtyFields.clear();
			} catch (error) {
				if (!(error instanceof FormValidationException)) throw error;
				const errorEvent = {
					...event,
					errors: error.errors
				};
				emits("error", errorEvent);
			} finally {
				loading.value = false;
			}
		}
		const disabled = computed(() => props.disabled || loading.value);
		provide(formOptionsInjectionKey, computed(() => ({
			disabled: disabled.value,
			validateOnInputDelay: props.validateOnInputDelay
		})));
		async function validateNestedForm(form, opts) {
			try {
				const result = await form.validate({
					...opts,
					silent: false
				});
				return {
					name: form.name,
					output: result
				};
			} catch (error) {
				if (!(error instanceof FormValidationException)) throw error;
				return {
					name: form.name,
					error
				};
			}
		}
		function addFormPath(error, formPath) {
			if (!formPath || !error.name) return error;
			return {
				...error,
				name: formPath + "." + error.name
			};
		}
		function stripFormPath(error, formPath) {
			const prefix = formPath + ".";
			const name = error?.name?.startsWith(prefix) ? error.name.substring(prefix.length) : error.name;
			return {
				...error,
				name
			};
		}
		function filterFormErrors(errors2, formPath) {
			if (!formPath) return errors2;
			return errors2.filter((e) => e?.name?.startsWith(formPath + ".")).map((e) => stripFormPath(e, formPath));
		}
		function getFormErrors(form) {
			return form.api.getErrors().map((e) => form.name ? {
				...e,
				name: form.name + "." + e.name
			} : e);
		}
		function matchesTarget(target, path) {
			if (!target || !path) return true;
			if (target instanceof RegExp) return target.test(path);
			return path === target || typeof target === "string" && target.startsWith(path + ".");
		}
		function getNestedTarget(target, formPath) {
			if (!target || target instanceof RegExp) return target;
			if (formPath === target) return void 0;
			if (typeof target === "string" && target.startsWith(formPath + ".")) return target.substring(formPath.length + 1);
			return target;
		}
		function filterErrorsByNames(allErrors, names) {
			const nameSet = new Set(names);
			const patterns = names.map((name) => inputs.value?.[name]?.pattern).filter(Boolean);
			const matchesNames = (error) => {
				if (!error.name) return false;
				if (nameSet.has(error.name)) return true;
				return patterns.some((pattern) => pattern.test(error.name));
			};
			const keepErrors = errors.value.filter((error) => !matchesNames(error));
			const newErrors = allErrors.filter(matchesNames);
			return [...keepErrors, ...newErrors];
		}
		function filterErrorsByTarget(currentErrors, target) {
			return currentErrors.filter((err) => target instanceof RegExp ? !(err.name && target.test(err.name)) : !err.name || err.name !== target);
		}
		function isLocalError(error) {
			return !error.name || !!inputs.value[error.name];
		}
		__expose({
			validate: _validate,
			errors,
			setErrors(errs, name) {
				const localErrors = resolveErrorIds(errs.filter(isLocalError));
				const nestedErrors = [];
				for (const form of nestedForms.value.values()) if (matchesTarget(name, form.name)) {
					const formErrors = filterFormErrors(errs, form.name);
					form.api.setErrors(formErrors, getNestedTarget(name, form.name || ""));
					nestedErrors.push(...getFormErrors(form));
				}
				if (name) {
					const keepErrors = filterErrorsByTarget(errors.value, name);
					errors.value = [
						...keepErrors,
						...localErrors,
						...nestedErrors
					];
				} else errors.value = [...localErrors, ...nestedErrors];
			},
			async submit() {
				if (formRef.value instanceof HTMLFormElement && formRef.value.reportValidity() === false) return;
				await onSubmitWrapper(new Event("submit"));
			},
			getErrors(name) {
				if (!name) return errors.value;
				return errors.value.filter((err) => name instanceof RegExp ? err.name && name.test(err.name) : err.name === name);
			},
			clear(name) {
				const localErrors = name ? errors.value.filter((err) => isLocalError(err) && (name instanceof RegExp ? !(err.name && name.test(err.name)) : err.name !== name)) : [];
				const nestedErrors = [];
				for (const form of nestedForms.value.values()) {
					if (matchesTarget(name, form.name)) form.api.clear();
					nestedErrors.push(...getFormErrors(form));
				}
				errors.value = [...localErrors, ...nestedErrors];
			},
			disabled,
			loading,
			dirty: computed(() => !!dirtyFields.size),
			dirtyFields: readonly(dirtyFields),
			blurredFields: readonly(blurredFields),
			touchedFields: readonly(touchedFields)
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(parentBus) ? "div" : "form"), mergeProps({
				id: unref(formId),
				ref_key: "formRef",
				ref: formRef,
				name: unref(parentBus) ? void 0 : unref(props).name,
				method: "post",
				class: ui.value({ class: [unref(props).ui?.base, unref(props).class] }),
				onSubmit: onSubmitWrapper
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {
						errors: errors.value,
						loading: loading.value
					}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {
						errors: errors.value,
						loading: loading.value
					})];
				}),
				_: 3
			}), _parent);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Form.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Form-CjReHs3j.mjs.map
