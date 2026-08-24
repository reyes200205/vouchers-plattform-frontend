import { _ as _sfc_main$1 } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$2 } from './Switch-BVVTXEME.mjs';
import { _ as _sfc_main } from './PageCard-C24h5VaM.mjs';
import { defineComponent, reactive, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import '../virtual/entry.mjs';
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
import './useFormControl-BqrzxfBI.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-qXGxQnKa.mjs';

//#region app/pages/general/settings/notifications.vue?vue&type=script&setup=true&lang.ts
var notifications_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "notifications",
	__ssrInlineRender: true,
	setup(__props) {
		const state = reactive({
			email: true,
			desktop: false,
			product_updates: true,
			weekly_digest: false,
			important_updates: true
		});
		const sections = [{
			title: "Notification channels",
			description: "Where can we notify you?",
			fields: [{
				name: "email",
				label: "Email",
				description: "Receive a daily email digest."
			}, {
				name: "desktop",
				label: "Desktop",
				description: "Receive desktop notifications."
			}]
		}, {
			title: "Account updates",
			description: "Receive updates about Nuxt UI.",
			fields: [
				{
					name: "weekly_digest",
					label: "Weekly digest",
					description: "Receive a weekly digest of news."
				},
				{
					name: "product_updates",
					label: "Product updates",
					description: "Receive a monthly email with all new features and updates."
				},
				{
					name: "important_updates",
					label: "Important updates",
					description: "Receive emails about important updates like security fixes, maintenance, etc."
				}
			]
		}];
		async function onChange() {
			console.log(state);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPageCard = _sfc_main;
			const _component_UFormField = _sfc_main$1;
			const _component_USwitch = _sfc_main$2;
			_push(`<!--[-->`);
			ssrRenderList(sections, (section, index) => {
				_push(`<div>`);
				_push(ssrRenderComponent(_component_UPageCard, {
					title: section.title,
					description: section.description,
					variant: "naked",
					class: "mb-4"
				}, null, _parent));
				_push(ssrRenderComponent(_component_UPageCard, {
					variant: "subtle",
					ui: { container: "divide-y divide-default" }
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<!--[-->`);
							ssrRenderList(section.fields, (field) => {
								_push(ssrRenderComponent(_component_UFormField, {
									key: field.name,
									name: field.name,
									label: field.label,
									description: field.description,
									class: "flex items-center justify-between not-last:pb-4 gap-2"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_USwitch, {
											modelValue: unref(state)[field.name],
											"onUpdate:modelValue": [($event) => unref(state)[field.name] = $event, onChange]
										}, null, _parent, _scopeId));
										else return [createVNode(_component_USwitch, {
											modelValue: unref(state)[field.name],
											"onUpdate:modelValue": [($event) => unref(state)[field.name] = $event, onChange]
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]-->`);
						} else return [(openBlock(true), createBlock(Fragment, null, renderList(section.fields, (field) => {
							return openBlock(), createBlock(_component_UFormField, {
								key: field.name,
								name: field.name,
								label: field.label,
								description: field.description,
								class: "flex items-center justify-between not-last:pb-4 gap-2"
							}, {
								default: withCtx(() => [createVNode(_component_USwitch, {
									modelValue: unref(state)[field.name],
									"onUpdate:modelValue": [($event) => unref(state)[field.name] = $event, onChange]
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 2
							}, 1032, [
								"name",
								"label",
								"description"
							]);
						}), 128))];
					}),
					_: 2
				}, _parent));
				_push(`</div>`);
			});
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/settings/notifications.vue
var _sfc_setup = notifications_vue_vue_type_script_setup_true_lang_default.setup;
notifications_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/settings/notifications.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var notifications_default = notifications_vue_vue_type_script_setup_true_lang_default;

export { notifications_default as default };
//# sourceMappingURL=notifications-D8evSaaF.mjs.map
