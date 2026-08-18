import { aL as useToast, h as _sfc_main$7, i as _sfc_main$8, am as useComponentProps, ag as useAppConfig, av as useForwardProps, a5 as reactivePick, o as createReusableTemplate, ad as tv, g as _sfc_main$2$1, b as Primitive } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './FormField-DOShaxcI.mjs';
import { _ as _sfc_main$4 } from './Input-3L6phQUN.mjs';
import { _ as _sfc_main$1 } from './Form-DpngGyYw.mjs';
import { _ as _sfc_main$5 } from './Textarea-CPf4yHZZ.mjs';
import { _ as _sfc_main$2 } from './PageCard-Cxx6o4Hh.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createVNode, useSlots, computed, renderSlot, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, normalizeProps, guardReactiveProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/component/BaseSeparator.js
var BaseSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "BaseSeparator",
	props: {
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		decorative: {
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
		const ORIENTATIONS = ["horizontal", "vertical"];
		function isValidOrientation(orientation) {
			return ORIENTATIONS.includes(orientation);
		}
		const computedOrientation = computed(() => isValidOrientation(props.orientation) ? props.orientation : "horizontal");
		const ariaOrientation = computed(() => computedOrientation.value === "vertical" ? props.orientation : void 0);
		const semanticProps = computed(() => props.decorative ? { role: "none" } : {
			"aria-orientation": ariaOrientation.value,
			"role": "separator"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-orientation": computedOrientation.value
			}, semanticProps.value), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-orientation"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.41_typescript@6.0.3_/node_modules/reka-ui/dist/Separator/Separator.js
var Separator_default = /* @__PURE__ */ defineComponent({
	__name: "Separator",
	props: {
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		decorative: {
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
			return openBlock(), createBlock(BaseSeparator_default, normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fseparator.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fseparator_default = {
	"slots": {
		"root": "flex items-center align-center text-center",
		"border": "",
		"container": "font-medium text-default flex",
		"icon": "shrink-0 size-5",
		"avatar": "shrink-0",
		"avatarSize": "2xs",
		"label": "text-sm"
	},
	"variants": {
		"color": {
			"primary": { "border": "border-primary" },
			"secondary": { "border": "border-secondary" },
			"success": { "border": "border-success" },
			"info": { "border": "border-info" },
			"warning": { "border": "border-warning" },
			"error": { "border": "border-error" },
			"neutral": { "border": "border-default" }
		},
		"orientation": {
			"horizontal": {
				"root": "w-full flex-row",
				"border": "w-full",
				"container": "whitespace-nowrap"
			},
			"vertical": {
				"root": "h-full flex-col",
				"border": "h-full",
				"container": ""
			}
		},
		"size": {
			"xs": "",
			"sm": "",
			"md": "",
			"lg": "",
			"xl": ""
		},
		"position": {
			"start": "",
			"center": "",
			"end": ""
		},
		"type": {
			"solid": { "border": "border-solid" },
			"dashed": { "border": "border-dashed" },
			"dotted": { "border": "border-dotted" }
		}
	},
	"compoundVariants": [
		{
			"orientation": "horizontal",
			"position": "start",
			"class": { "container": "me-3" }
		},
		{
			"orientation": "horizontal",
			"position": "center",
			"class": { "container": "mx-3" }
		},
		{
			"orientation": "horizontal",
			"position": "end",
			"class": { "container": "ms-3" }
		},
		{
			"orientation": "vertical",
			"position": "start",
			"class": { "container": "mb-2" }
		},
		{
			"orientation": "vertical",
			"position": "center",
			"class": { "container": "my-2" }
		},
		{
			"orientation": "vertical",
			"position": "end",
			"class": { "container": "mt-2" }
		},
		{
			"orientation": "horizontal",
			"size": "xs",
			"class": { "border": "border-t" }
		},
		{
			"orientation": "horizontal",
			"size": "sm",
			"class": { "border": "border-t-[2px]" }
		},
		{
			"orientation": "horizontal",
			"size": "md",
			"class": { "border": "border-t-[3px]" }
		},
		{
			"orientation": "horizontal",
			"size": "lg",
			"class": { "border": "border-t-[4px]" }
		},
		{
			"orientation": "horizontal",
			"size": "xl",
			"class": { "border": "border-t-[5px]" }
		},
		{
			"orientation": "vertical",
			"size": "xs",
			"class": { "border": "border-s" }
		},
		{
			"orientation": "vertical",
			"size": "sm",
			"class": { "border": "border-s-[2px]" }
		},
		{
			"orientation": "vertical",
			"size": "md",
			"class": { "border": "border-s-[3px]" }
		},
		{
			"orientation": "vertical",
			"size": "lg",
			"class": { "border": "border-s-[4px]" }
		},
		{
			"orientation": "vertical",
			"size": "xl",
			"class": { "border": "border-s-[5px]" }
		}
	],
	"defaultVariants": {
		"color": "neutral",
		"size": "xs",
		"type": "solid"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Separator.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "USeparator",
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
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		type: {
			type: null,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		position: {
			type: null,
			required: false,
			default: "center"
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: false
		},
		decorative: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("separator", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "as", "decorative", "orientation"));
		const [DefineContainer, ReuseContainer] = createReusableTemplate();
		const hasContent = computed(() => !!(props.label || props.icon || props.avatar || slots.default));
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fseparator_default,
			...appConfig.ui?.separator || {}
		})({
			color: props.color,
			orientation: props.orientation,
			size: props.size,
			position: props.position,
			type: props.type
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineContainer), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(props).ui?.container }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, () => {
							if (unref(props).label) _push(`<span data-slot="label" class="${ssrRenderClass(ui.value.label({ class: unref(props).ui?.label }))}"${_scopeId}>${ssrInterpolate(unref(props).label)}</span>`);
							else if (unref(props).icon) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: unref(props).icon,
								"data-slot": "icon",
								class: ui.value.icon({ class: unref(props).ui?.icon })
							}, null, _parent, _scopeId));
							else if (unref(props).avatar) _push(ssrRenderComponent(_sfc_main$8, mergeProps({ size: unref(props).ui?.avatarSize || ui.value.avatarSize() }, unref(props).avatar, {
								"data-slot": "avatar",
								class: ui.value.avatar({ class: unref(props).ui?.avatar })
							}), null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push(`</div>`);
					} else return [createVNode("div", {
						"data-slot": "container",
						class: ui.value.container({ class: unref(props).ui?.container })
					}, [renderSlot(_ctx.$slots, "default", { ui: ui.value }, () => [unref(props).label ? (openBlock(), createBlock("span", {
						key: 0,
						"data-slot": "label",
						class: ui.value.label({ class: unref(props).ui?.label })
					}, toDisplayString(unref(props).label), 3)) : unref(props).icon ? (openBlock(), createBlock(_sfc_main$2$1, {
						key: 1,
						name: unref(props).icon,
						"data-slot": "icon",
						class: ui.value.icon({ class: unref(props).ui?.icon })
					}, null, 8, ["name", "class"])) : unref(props).avatar ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
						key: 2,
						size: unref(props).ui?.avatarSize || ui.value.avatarSize()
					}, unref(props).avatar, {
						"data-slot": "avatar",
						class: ui.value.avatar({ class: unref(props).ui?.avatar })
					}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(Separator_default), mergeProps({ "data-slot": "root" }, {
				...unref(rootProps),
				..._ctx.$attrs
			}, { class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] }) }), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (hasContent.value && unref(props).position === "start") _push(ssrRenderComponent(unref(ReuseContainer), null, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`<div data-slot="border" class="${ssrRenderClass(ui.value.border({ class: unref(props).ui?.border }))}"${_scopeId}></div>`);
						if (hasContent.value && unref(props).position === "center") {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(unref(ReuseContainer), null, null, _parent, _scopeId));
							_push(`<div data-slot="border" class="${ssrRenderClass(ui.value.border({ class: unref(props).ui?.border }))}"${_scopeId}></div><!--]-->`);
						} else _push(`<!---->`);
						if (hasContent.value && unref(props).position === "end") _push(ssrRenderComponent(unref(ReuseContainer), null, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						hasContent.value && unref(props).position === "start" ? (openBlock(), createBlock(unref(ReuseContainer), { key: 0 })) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "border",
							class: ui.value.border({ class: unref(props).ui?.border })
						}, null, 2),
						hasContent.value && unref(props).position === "center" ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(unref(ReuseContainer)), createVNode("div", {
							"data-slot": "border",
							class: ui.value.border({ class: unref(props).ui?.border })
						}, null, 2)], 64)) : createCommentVNode("", true),
						hasContent.value && unref(props).position === "end" ? (openBlock(), createBlock(unref(ReuseContainer), { key: 2 })) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_4f9d36d94af007356e774edcf25eb409/node_modules/@nuxt/ui/dist/runtime/components/Separator.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/general/settings/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const fileRef = ref();
		const profileSchema = z.object({
			name: z.string().min(2, "Too short"),
			email: z.string().email("Invalid email"),
			username: z.string().min(2, "Too short"),
			avatar: z.string().optional(),
			bio: z.string().optional()
		});
		const profile = reactive({
			name: "Benjamin Canac",
			email: "ben@nuxtlabs.com",
			username: "benjamincanac",
			avatar: void 0,
			bio: void 0
		});
		const toast = useToast();
		async function onSubmit(event) {
			toast.add({
				title: "Success",
				description: "Your settings have been updated.",
				icon: "i-lucide-check",
				color: "success"
			});
			console.log(event.data);
		}
		function onFileChange(e) {
			const input = e.target;
			if (!input.files?.length) return;
			profile.avatar = URL.createObjectURL(input.files[0]);
		}
		function onFileClick() {
			fileRef.value?.click();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UForm = _sfc_main$1;
			const _component_UPageCard = _sfc_main$2;
			const _component_UButton = _sfc_main$7;
			const _component_UFormField = _sfc_main$3;
			const _component_UInput = _sfc_main$4;
			const _component_USeparator = _sfc_main;
			const _component_UAvatar = _sfc_main$8;
			const _component_UTextarea = _sfc_main$5;
			_push(ssrRenderComponent(_component_UForm, mergeProps({
				id: "settings",
				schema: unref(profileSchema),
				state: unref(profile),
				onSubmit
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UPageCard, {
							title: "Profile",
							description: "These informations will be displayed publicly.",
							variant: "naked",
							orientation: "horizontal",
							class: "mb-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UButton, {
									form: "settings",
									label: "Save changes",
									color: "neutral",
									type: "submit",
									class: "w-fit lg:ms-auto"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UButton, {
									form: "settings",
									label: "Save changes",
									color: "neutral",
									type: "submit",
									class: "w-fit lg:ms-auto"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UPageCard, { variant: "subtle" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UFormField, {
										name: "name",
										label: "Name",
										description: "Will appear on receipts, invoices, and other communication.",
										required: "",
										class: "flex max-sm:flex-col justify-between items-start gap-4"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(profile).name,
												"onUpdate:modelValue": ($event) => unref(profile).name = $event,
												autocomplete: "off"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(profile).name,
												"onUpdate:modelValue": ($event) => unref(profile).name = $event,
												autocomplete: "off"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										name: "email",
										label: "Email",
										description: "Used to sign in, for email receipts and product updates.",
										required: "",
										class: "flex max-sm:flex-col justify-between items-start gap-4"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(profile).email,
												"onUpdate:modelValue": ($event) => unref(profile).email = $event,
												type: "email",
												autocomplete: "off"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(profile).email,
												"onUpdate:modelValue": ($event) => unref(profile).email = $event,
												type: "email",
												autocomplete: "off"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										name: "username",
										label: "Username",
										description: "Your unique username for logging in and your profile URL.",
										required: "",
										class: "flex max-sm:flex-col justify-between items-start gap-4"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(profile).username,
												"onUpdate:modelValue": ($event) => unref(profile).username = $event,
												type: "username",
												autocomplete: "off"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(profile).username,
												"onUpdate:modelValue": ($event) => unref(profile).username = $event,
												type: "username",
												autocomplete: "off"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										name: "avatar",
										label: "Avatar",
										description: "JPG, GIF or PNG. 1MB Max.",
										class: "flex max-sm:flex-col justify-between sm:items-center gap-4"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<div class="flex flex-wrap items-center gap-3"${_scopeId}>`);
												_push(ssrRenderComponent(_component_UAvatar, {
													src: unref(profile).avatar,
													alt: unref(profile).name,
													size: "lg"
												}, null, _parent, _scopeId));
												_push(ssrRenderComponent(_component_UButton, {
													label: "Choose",
													color: "neutral",
													onClick: onFileClick
												}, null, _parent, _scopeId));
												_push(`<input type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif"${_scopeId}></div>`);
											} else return [createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
												createVNode(_component_UAvatar, {
													src: unref(profile).avatar,
													alt: unref(profile).name,
													size: "lg"
												}, null, 8, ["src", "alt"]),
												createVNode(_component_UButton, {
													label: "Choose",
													color: "neutral",
													onClick: onFileClick
												}),
												createVNode("input", {
													ref_key: "fileRef",
													ref: fileRef,
													type: "file",
													class: "hidden",
													accept: ".jpg, .jpeg, .png, .gif",
													onChange: onFileChange
												}, null, 544)
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormField, {
										name: "bio",
										label: "Bio",
										description: "Brief description for your profile. URLs are hyperlinked.",
										class: "flex max-sm:flex-col justify-between items-start gap-4",
										ui: { container: "w-full" }
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(profile).bio,
												"onUpdate:modelValue": ($event) => unref(profile).bio = $event,
												rows: 5,
												autoresize: "",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(profile).bio,
												"onUpdate:modelValue": ($event) => unref(profile).bio = $event,
												rows: 5,
												autoresize: "",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [
									createVNode(_component_UFormField, {
										name: "name",
										label: "Name",
										description: "Will appear on receipts, invoices, and other communication.",
										required: "",
										class: "flex max-sm:flex-col justify-between items-start gap-4"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(profile).name,
											"onUpdate:modelValue": ($event) => unref(profile).name = $event,
											autocomplete: "off"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_USeparator),
									createVNode(_component_UFormField, {
										name: "email",
										label: "Email",
										description: "Used to sign in, for email receipts and product updates.",
										required: "",
										class: "flex max-sm:flex-col justify-between items-start gap-4"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(profile).email,
											"onUpdate:modelValue": ($event) => unref(profile).email = $event,
											type: "email",
											autocomplete: "off"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_USeparator),
									createVNode(_component_UFormField, {
										name: "username",
										label: "Username",
										description: "Your unique username for logging in and your profile URL.",
										required: "",
										class: "flex max-sm:flex-col justify-between items-start gap-4"
									}, {
										default: withCtx(() => [createVNode(_component_UInput, {
											modelValue: unref(profile).username,
											"onUpdate:modelValue": ($event) => unref(profile).username = $event,
											type: "username",
											autocomplete: "off"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									}),
									createVNode(_component_USeparator),
									createVNode(_component_UFormField, {
										name: "avatar",
										label: "Avatar",
										description: "JPG, GIF or PNG. 1MB Max.",
										class: "flex max-sm:flex-col justify-between sm:items-center gap-4"
									}, {
										default: withCtx(() => [createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
											createVNode(_component_UAvatar, {
												src: unref(profile).avatar,
												alt: unref(profile).name,
												size: "lg"
											}, null, 8, ["src", "alt"]),
											createVNode(_component_UButton, {
												label: "Choose",
												color: "neutral",
												onClick: onFileClick
											}),
											createVNode("input", {
												ref_key: "fileRef",
												ref: fileRef,
												type: "file",
												class: "hidden",
												accept: ".jpg, .jpeg, .png, .gif",
												onChange: onFileChange
											}, null, 544)
										])]),
										_: 1
									}),
									createVNode(_component_USeparator),
									createVNode(_component_UFormField, {
										name: "bio",
										label: "Bio",
										description: "Brief description for your profile. URLs are hyperlinked.",
										class: "flex max-sm:flex-col justify-between items-start gap-4",
										ui: { container: "w-full" }
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(profile).bio,
											"onUpdate:modelValue": ($event) => unref(profile).bio = $event,
											rows: 5,
											autoresize: "",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})
								];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UPageCard, {
						title: "Profile",
						description: "These informations will be displayed publicly.",
						variant: "naked",
						orientation: "horizontal",
						class: "mb-4"
					}, {
						default: withCtx(() => [createVNode(_component_UButton, {
							form: "settings",
							label: "Save changes",
							color: "neutral",
							type: "submit",
							class: "w-fit lg:ms-auto"
						})]),
						_: 1
					}), createVNode(_component_UPageCard, { variant: "subtle" }, {
						default: withCtx(() => [
							createVNode(_component_UFormField, {
								name: "name",
								label: "Name",
								description: "Will appear on receipts, invoices, and other communication.",
								required: "",
								class: "flex max-sm:flex-col justify-between items-start gap-4"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profile).name,
									"onUpdate:modelValue": ($event) => unref(profile).name = $event,
									autocomplete: "off"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_USeparator),
							createVNode(_component_UFormField, {
								name: "email",
								label: "Email",
								description: "Used to sign in, for email receipts and product updates.",
								required: "",
								class: "flex max-sm:flex-col justify-between items-start gap-4"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profile).email,
									"onUpdate:modelValue": ($event) => unref(profile).email = $event,
									type: "email",
									autocomplete: "off"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_USeparator),
							createVNode(_component_UFormField, {
								name: "username",
								label: "Username",
								description: "Your unique username for logging in and your profile URL.",
								required: "",
								class: "flex max-sm:flex-col justify-between items-start gap-4"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profile).username,
									"onUpdate:modelValue": ($event) => unref(profile).username = $event,
									type: "username",
									autocomplete: "off"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_USeparator),
							createVNode(_component_UFormField, {
								name: "avatar",
								label: "Avatar",
								description: "JPG, GIF or PNG. 1MB Max.",
								class: "flex max-sm:flex-col justify-between sm:items-center gap-4"
							}, {
								default: withCtx(() => [createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
									createVNode(_component_UAvatar, {
										src: unref(profile).avatar,
										alt: unref(profile).name,
										size: "lg"
									}, null, 8, ["src", "alt"]),
									createVNode(_component_UButton, {
										label: "Choose",
										color: "neutral",
										onClick: onFileClick
									}),
									createVNode("input", {
										ref_key: "fileRef",
										ref: fileRef,
										type: "file",
										class: "hidden",
										accept: ".jpg, .jpeg, .png, .gif",
										onChange: onFileChange
									}, null, 544)
								])]),
								_: 1
							}),
							createVNode(_component_USeparator),
							createVNode(_component_UFormField, {
								name: "bio",
								label: "Bio",
								description: "Brief description for your profile. URLs are hyperlinked.",
								class: "flex max-sm:flex-col justify-between items-start gap-4",
								ui: { container: "w-full" }
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(profile).bio,
									"onUpdate:modelValue": ($event) => unref(profile).bio = $event,
									rows: 5,
									autoresize: "",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})
						]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/settings/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/settings/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var settings_default = index_vue_vue_type_script_setup_true_lang_default;

export { settings_default as default };
//# sourceMappingURL=settings-Cl_IlDnl.mjs.map
