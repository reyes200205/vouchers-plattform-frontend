import { _ as _sfc_main$2 } from './FormField-Covcs33U.mjs';
import { h as _sfc_main$7 } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Input-BNmQBFRn.mjs';
import { _ as _sfc_main$1 } from './Form-CfoysxRA.mjs';
import { _ as _sfc_main } from './PageCard-BWGd_6nQ.mjs';
import { defineComponent, reactive, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import 'tailwindcss/colors';

//#region app/pages/general/settings/security.vue?vue&type=script&setup=true&lang.ts
var security_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "security",
	__ssrInlineRender: true,
	setup(__props) {
		const passwordSchema = z.object({
			current: z.string().min(8, "Must be at least 8 characters"),
			new: z.string().min(8, "Must be at least 8 characters")
		});
		const password = reactive({
			current: "",
			new: ""
		});
		const validate = (state) => {
			const errors = [];
			if (state.current && state.new && state.current === state.new) errors.push({
				name: "new",
				message: "Passwords must be different"
			});
			return errors;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPageCard = _sfc_main;
			const _component_UForm = _sfc_main$1;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_UButton = _sfc_main$7;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UPageCard, {
				title: "Password",
				description: "Confirm your current password before setting a new one.",
				variant: "subtle"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(passwordSchema),
						state: unref(password),
						validate,
						class: "flex flex-col gap-4 max-w-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UFormField, { name: "current" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(password).current,
											"onUpdate:modelValue": ($event) => unref(password).current = $event,
											type: "password",
											placeholder: "Current password",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(password).current,
											"onUpdate:modelValue": ($event) => unref(password).current = $event,
											type: "password",
											placeholder: "Current password",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, { name: "new" }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(password).new,
											"onUpdate:modelValue": ($event) => unref(password).new = $event,
											type: "password",
											placeholder: "New password",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(password).new,
											"onUpdate:modelValue": ($event) => unref(password).new = $event,
											type: "password",
											placeholder: "New password",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Update",
									class: "w-fit",
									type: "submit"
								}, null, _parent, _scopeId));
							} else return [
								createVNode(_component_UFormField, { name: "current" }, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(password).current,
										"onUpdate:modelValue": ($event) => unref(password).current = $event,
										type: "password",
										placeholder: "Current password",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, { name: "new" }, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(password).new,
										"onUpdate:modelValue": ($event) => unref(password).new = $event,
										type: "password",
										placeholder: "New password",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UButton, {
									label: "Update",
									class: "w-fit",
									type: "submit"
								})
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UForm, {
						schema: unref(passwordSchema),
						state: unref(password),
						validate,
						class: "flex flex-col gap-4 max-w-xs"
					}, {
						default: withCtx(() => [
							createVNode(_component_UFormField, { name: "current" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(password).current,
									"onUpdate:modelValue": ($event) => unref(password).current = $event,
									type: "password",
									placeholder: "Current password",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, { name: "new" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(password).new,
									"onUpdate:modelValue": ($event) => unref(password).new = $event,
									type: "password",
									placeholder: "New password",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UButton, {
								label: "Update",
								class: "w-fit",
								type: "submit"
							})
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UPageCard, {
				title: "Account",
				description: "No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.",
				class: "bg-linear-to-tl from-error/10 from-5% to-default"
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Delete account",
						color: "error"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Delete account",
						color: "error"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/settings/security.vue
var _sfc_setup = security_vue_vue_type_script_setup_true_lang_default.setup;
security_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/settings/security.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var security_default = security_vue_vue_type_script_setup_true_lang_default;

export { security_default as default };
//# sourceMappingURL=security-BZNe1mZY.mjs.map
