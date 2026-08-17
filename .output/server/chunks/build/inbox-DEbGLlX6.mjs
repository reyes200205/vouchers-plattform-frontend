import { ak as useBreakpoints, g as _sfc_main$2$1, C as ClientOnly, j as _sfc_main$9, aN as useToast, h as _sfc_main$7, i as _sfc_main$8, k as breakpointsTailwind } from '../virtual/entry.mjs';
import { u as useFetch } from './fetch-hxcMBlxm.mjs';
import { _ as _sfc_main$6 } from './DropdownMenu-CSO5oJPB.mjs';
import { _ as _sfc_main } from './Tabs-C-vOAT3l.mjs';
import { _ as _sfc_main$5 } from './Tooltip-BlDWBU8d.mjs';
import { _ as _sfc_main$3 } from './Badge-CmUnAJCw.mjs';
import { d as defineShortcuts } from './defineShortcuts-zVsILOx1.mjs';
import { b as _sfc_main$2, a as _sfc_main$1, _ as _sfc_main$4 } from './DashboardSidebarCollapse-B125GinS.mjs';
import { _ as _sfc_main$a } from './Card-B0imoY-h.mjs';
import { _ as _sfc_main$b } from './Textarea-VnunBfXi.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, withCtx, createVNode, useModel, mergeProps, unref, mergeModels, isRef, withModifiers, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { isToday, format } from 'date-fns';
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
import './namespaced-Cysx46L3.mjs';
import './utils-D4TVPsMb.mjs';
import './Kbd-DEj9mxJN.mjs';
import '@internationalized/date';
import './Input-CsmJf5Y6.mjs';
import './RovingFocusItem-Dvw-CM1b.mjs';
import './DashboardSidebarToggle-CrE1-3MV.mjs';

//#region app/components/inbox/InboxList.vue?vue&type=script&setup=true&lang.ts
var InboxList_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InboxList",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({ mails: {} }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const mailsRefs = ref({});
		const selectedMail = useModel(__props, "modelValue");
		watch(selectedMail, () => {
			if (!selectedMail.value) return;
			const ref = mailsRefs.value[selectedMail.value.id];
			if (ref) ref.scrollIntoView({ block: "nearest" });
		});
		defineShortcuts({
			arrowdown: () => {
				const index = props.mails.findIndex((mail) => mail.id === selectedMail.value?.id);
				if (index === -1) selectedMail.value = props.mails[0];
				else if (index < props.mails.length - 1) selectedMail.value = props.mails[index + 1];
			},
			arrowup: () => {
				const index = props.mails.findIndex((mail) => mail.id === selectedMail.value?.id);
				if (index === -1) selectedMail.value = props.mails[props.mails.length - 1];
				else if (index > 0) selectedMail.value = props.mails[index - 1];
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UChip = _sfc_main$9;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-y-auto divide-y divide-default" }, _attrs))}><!--[-->`);
			ssrRenderList(__props.mails, (mail, index) => {
				_push(`<div><div class="${ssrRenderClass([[mail.unread ? "text-highlighted" : "text-toned", selectedMail.value && selectedMail.value.id === mail.id ? "border-primary bg-primary/10" : "border-bg hover:border-primary hover:bg-primary/5"], "p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"])}"><div class="${ssrRenderClass([[mail.unread && "font-semibold"], "flex items-center justify-between"])}"><div class="flex items-center gap-3">${ssrInterpolate(mail.from.name)} `);
				if (mail.unread) _push(ssrRenderComponent(_component_UChip, null, null, _parent));
				else _push(`<!---->`);
				_push(`</div><span>${ssrInterpolate(unref(isToday)(new Date(mail.date)) ? unref(format)(new Date(mail.date), "HH:mm") : unref(format)(new Date(mail.date), "dd MMM"))}</span></div><p class="${ssrRenderClass([[mail.unread && "font-semibold"], "truncate"])}">${ssrInterpolate(mail.subject)}</p><p class="text-dimmed line-clamp-1">${ssrInterpolate(mail.body)}</p></div></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region app/components/inbox/InboxList.vue
var _sfc_setup$2 = InboxList_vue_vue_type_script_setup_true_lang_default.setup;
InboxList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/InboxList.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var InboxList_default = Object.assign(InboxList_vue_vue_type_script_setup_true_lang_default, { __name: "InboxList" });
//#endregion
//#region app/components/inbox/InboxMail.vue?vue&type=script&setup=true&lang.ts
var InboxMail_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InboxMail",
	__ssrInlineRender: true,
	props: { mail: {} },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emits = __emit;
		const dropdownItems = [[{
			label: "Mark as unread",
			icon: "i-lucide-check-circle"
		}, {
			label: "Mark as important",
			icon: "i-lucide-triangle-alert"
		}], [{
			label: "Star thread",
			icon: "i-lucide-star"
		}, {
			label: "Mute thread",
			icon: "i-lucide-circle-pause"
		}]];
		const toast = useToast();
		const reply = ref("");
		const loading = ref(false);
		function onSubmit() {
			loading.value = true;
			setTimeout(() => {
				reply.value = "";
				toast.add({
					title: "Email sent",
					description: "Your email has been sent successfully",
					icon: "i-lucide-check-circle",
					color: "success"
				});
				loading.value = false;
			}, 1e3);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UButton = _sfc_main$7;
			const _component_UTooltip = _sfc_main$5;
			const _component_UDropdownMenu = _sfc_main$6;
			const _component_UAvatar = _sfc_main$8;
			const _component_UCard = _sfc_main$a;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UTextarea = _sfc_main$b;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "inbox-2" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, {
							title: __props.mail.subject,
							toggle: false
						}, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-x",
									color: "neutral",
									variant: "ghost",
									class: "-ms-1.5",
									onClick: ($event) => emits("close")
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UButton, {
									icon: "i-lucide-x",
									color: "neutral",
									variant: "ghost",
									class: "-ms-1.5",
									onClick: ($event) => emits("close")
								}, null, 8, ["onClick"])];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UTooltip, { text: "Archive" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-inbox",
												color: "neutral",
												variant: "ghost"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-inbox",
												color: "neutral",
												variant: "ghost"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UTooltip, { text: "Reply" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-reply",
												color: "neutral",
												variant: "ghost"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-reply",
												color: "neutral",
												variant: "ghost"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UDropdownMenu, { items: dropdownItems }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												icon: "i-lucide-ellipsis-vertical",
												color: "neutral",
												variant: "ghost"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												icon: "i-lucide-ellipsis-vertical",
												color: "neutral",
												variant: "ghost"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
								} else return [
									createVNode(_component_UTooltip, { text: "Archive" }, {
										default: withCtx(() => [createVNode(_component_UButton, {
											icon: "i-lucide-inbox",
											color: "neutral",
											variant: "ghost"
										})]),
										_: 1
									}),
									createVNode(_component_UTooltip, { text: "Reply" }, {
										default: withCtx(() => [createVNode(_component_UButton, {
											icon: "i-lucide-reply",
											color: "neutral",
											variant: "ghost"
										})]),
										_: 1
									}),
									createVNode(_component_UDropdownMenu, { items: dropdownItems }, {
										default: withCtx(() => [createVNode(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost"
										})]),
										_: 1
									})
								];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default"${_scopeId}><div class="flex items-start gap-4 sm:my-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UAvatar, mergeProps(__props.mail.from.avatar, {
							alt: __props.mail.from.name,
							size: "3xl"
						}), null, _parent, _scopeId));
						_push(`<div class="min-w-0"${_scopeId}><p class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(__props.mail.from.name)}</p><p class="text-muted"${_scopeId}>${ssrInterpolate(__props.mail.from.email)}</p></div></div><p class="max-sm:pl-16 text-muted text-sm sm:mt-2"${_scopeId}>${ssrInterpolate(unref(format)(new Date(__props.mail.date), "dd MMM HH:mm"))}</p></div><div class="flex-1 p-4 sm:p-6 overflow-y-auto"${_scopeId}><p class="whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(__props.mail.body)}</p></div><div class="pb-4 px-4 sm:px-6 shrink-0"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, {
							variant: "subtle",
							class: "mt-auto",
							ui: { header: "flex items-center gap-1.5 text-dimmed" }
						}, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-reply",
										class: "size-5"
									}, null, _parent, _scopeId));
									_push(`<span class="text-sm truncate"${_scopeId}> Reply to ${ssrInterpolate(__props.mail.from.name)} (${ssrInterpolate(__props.mail.from.email)}) </span>`);
								} else return [createVNode(_component_UIcon, {
									name: "i-lucide-reply",
									class: "size-5"
								}), createVNode("span", { class: "text-sm truncate" }, " Reply to " + toDisplayString(__props.mail.from.name) + " (" + toDisplayString(__props.mail.from.email) + ") ", 1)];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<form${_scopeId}>`);
									_push(ssrRenderComponent(_component_UTextarea, {
										modelValue: unref(reply),
										"onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null,
										color: "neutral",
										variant: "none",
										required: "",
										autoresize: "",
										placeholder: "Write your reply...",
										rows: 4,
										disabled: unref(loading),
										class: "w-full",
										ui: { base: "p-0 resize-none" }
									}, null, _parent, _scopeId));
									_push(`<div class="flex items-center justify-between"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UTooltip, { text: "Attach file" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UButton, {
												color: "neutral",
												variant: "ghost",
												icon: "i-lucide-paperclip"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UButton, {
												color: "neutral",
												variant: "ghost",
												icon: "i-lucide-paperclip"
											})];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`<div class="flex items-center justify-end gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										label: "Save draft"
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UButton, {
										type: "submit",
										color: "neutral",
										loading: unref(loading),
										label: "Send",
										icon: "i-lucide-send"
									}, null, _parent, _scopeId));
									_push(`</div></div></form>`);
								} else return [createVNode("form", { onSubmit: withModifiers(onSubmit, ["prevent"]) }, [createVNode(_component_UTextarea, {
									modelValue: unref(reply),
									"onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null,
									color: "neutral",
									variant: "none",
									required: "",
									autoresize: "",
									placeholder: "Write your reply...",
									rows: 4,
									disabled: unref(loading),
									class: "w-full",
									ui: { base: "p-0 resize-none" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"disabled"
								]), createVNode("div", { class: "flex items-center justify-between" }, [createVNode(_component_UTooltip, { text: "Attach file" }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										color: "neutral",
										variant: "ghost",
										icon: "i-lucide-paperclip"
									})]),
									_: 1
								}), createVNode("div", { class: "flex items-center justify-end gap-2" }, [createVNode(_component_UButton, {
									color: "neutral",
									variant: "ghost",
									label: "Save draft"
								}), createVNode(_component_UButton, {
									type: "submit",
									color: "neutral",
									loading: unref(loading),
									label: "Send",
									icon: "i-lucide-send"
								}, null, 8, ["loading"])])])], 32)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode(_component_UDashboardNavbar, {
							title: __props.mail.subject,
							toggle: false
						}, {
							leading: withCtx(() => [createVNode(_component_UButton, {
								icon: "i-lucide-x",
								color: "neutral",
								variant: "ghost",
								class: "-ms-1.5",
								onClick: ($event) => emits("close")
							}, null, 8, ["onClick"])]),
							right: withCtx(() => [
								createVNode(_component_UTooltip, { text: "Archive" }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-inbox",
										color: "neutral",
										variant: "ghost"
									})]),
									_: 1
								}),
								createVNode(_component_UTooltip, { text: "Reply" }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-reply",
										color: "neutral",
										variant: "ghost"
									})]),
									_: 1
								}),
								createVNode(_component_UDropdownMenu, { items: dropdownItems }, {
									default: withCtx(() => [createVNode(_component_UButton, {
										icon: "i-lucide-ellipsis-vertical",
										color: "neutral",
										variant: "ghost"
									})]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["title"]),
						createVNode("div", { class: "flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default" }, [createVNode("div", { class: "flex items-start gap-4 sm:my-1.5" }, [createVNode(_component_UAvatar, mergeProps(__props.mail.from.avatar, {
							alt: __props.mail.from.name,
							size: "3xl"
						}), null, 16, ["alt"]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "font-semibold text-highlighted" }, toDisplayString(__props.mail.from.name), 1), createVNode("p", { class: "text-muted" }, toDisplayString(__props.mail.from.email), 1)])]), createVNode("p", { class: "max-sm:pl-16 text-muted text-sm sm:mt-2" }, toDisplayString(unref(format)(new Date(__props.mail.date), "dd MMM HH:mm")), 1)]),
						createVNode("div", { class: "flex-1 p-4 sm:p-6 overflow-y-auto" }, [createVNode("p", { class: "whitespace-pre-wrap" }, toDisplayString(__props.mail.body), 1)]),
						createVNode("div", { class: "pb-4 px-4 sm:px-6 shrink-0" }, [createVNode(_component_UCard, {
							variant: "subtle",
							class: "mt-auto",
							ui: { header: "flex items-center gap-1.5 text-dimmed" }
						}, {
							header: withCtx(() => [createVNode(_component_UIcon, {
								name: "i-lucide-reply",
								class: "size-5"
							}), createVNode("span", { class: "text-sm truncate" }, " Reply to " + toDisplayString(__props.mail.from.name) + " (" + toDisplayString(__props.mail.from.email) + ") ", 1)]),
							default: withCtx(() => [createVNode("form", { onSubmit: withModifiers(onSubmit, ["prevent"]) }, [createVNode(_component_UTextarea, {
								modelValue: unref(reply),
								"onUpdate:modelValue": ($event) => isRef(reply) ? reply.value = $event : null,
								color: "neutral",
								variant: "none",
								required: "",
								autoresize: "",
								placeholder: "Write your reply...",
								rows: 4,
								disabled: unref(loading),
								class: "w-full",
								ui: { base: "p-0 resize-none" }
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							]), createVNode("div", { class: "flex items-center justify-between" }, [createVNode(_component_UTooltip, { text: "Attach file" }, {
								default: withCtx(() => [createVNode(_component_UButton, {
									color: "neutral",
									variant: "ghost",
									icon: "i-lucide-paperclip"
								})]),
								_: 1
							}), createVNode("div", { class: "flex items-center justify-end gap-2" }, [createVNode(_component_UButton, {
								color: "neutral",
								variant: "ghost",
								label: "Save draft"
							}), createVNode(_component_UButton, {
								type: "submit",
								color: "neutral",
								loading: unref(loading),
								label: "Send",
								icon: "i-lucide-send"
							}, null, 8, ["loading"])])])], 32)]),
							_: 1
						})])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/inbox/InboxMail.vue
var _sfc_setup$1 = InboxMail_vue_vue_type_script_setup_true_lang_default.setup;
InboxMail_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/inbox/InboxMail.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var InboxMail_default = Object.assign(InboxMail_vue_vue_type_script_setup_true_lang_default, { __name: "InboxMail" });
//#endregion
//#region app/pages/general/inbox.vue?vue&type=script&setup=true&lang.ts
var inbox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "inbox",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const tabItems = [{
			label: "All",
			value: "all"
		}, {
			label: "Unread",
			value: "unread"
		}];
		const selectedTab = ref("all");
		const { data: mails } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/mails", { default: () => [] }, "$J24Fiv3ozL")), __temp = await __temp, __restore(), __temp);
		const filteredMails = computed(() => {
			if (selectedTab.value === "unread") return mails.value.filter((mail) => !!mail.unread);
			return mails.value;
		});
		const selectedMail = ref();
		computed({
			get() {
				return !!selectedMail.value;
			},
			set(value) {
				if (!value) selectedMail.value = null;
			}
		});
		watch(filteredMails, () => {
			if (!filteredMails.value.find((mail) => mail.id === selectedMail.value?.id)) selectedMail.value = null;
		});
		useBreakpoints(breakpointsTailwind).smaller("lg");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$4;
			const _component_UBadge = _sfc_main$3;
			const _component_UTabs = _sfc_main;
			const _component_InboxList = InboxList_default;
			const _component_InboxMail = InboxMail_default;
			const _component_UIcon = _sfc_main$2$1;
			const _component_ClientOnly = ClientOnly;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, {
				id: "inbox-1",
				"default-size": 25,
				"min-size": 20,
				"max-size": 30,
				resizable: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Inbox" }, {
							leading: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
								else return [createVNode(_component_UDashboardSidebarCollapse)];
							}),
							trailing: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UBadge, {
									label: filteredMails.value.length,
									variant: "subtle"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UBadge, {
									label: filteredMails.value.length,
									variant: "subtle"
								}, null, 8, ["label"])];
							}),
							right: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UTabs, {
									modelValue: selectedTab.value,
									"onUpdate:modelValue": ($event) => selectedTab.value = $event,
									items: tabItems,
									content: false,
									size: "xs"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UTabs, {
									modelValue: selectedTab.value,
									"onUpdate:modelValue": ($event) => selectedTab.value = $event,
									items: tabItems,
									content: false,
									size: "xs"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_InboxList, {
							modelValue: selectedMail.value,
							"onUpdate:modelValue": ($event) => selectedMail.value = $event,
							mails: filteredMails.value
						}, null, _parent, _scopeId));
					} else return [createVNode(_component_UDashboardNavbar, { title: "Inbox" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						trailing: withCtx(() => [createVNode(_component_UBadge, {
							label: filteredMails.value.length,
							variant: "subtle"
						}, null, 8, ["label"])]),
						right: withCtx(() => [createVNode(_component_UTabs, {
							modelValue: selectedTab.value,
							"onUpdate:modelValue": ($event) => selectedTab.value = $event,
							items: tabItems,
							content: false,
							size: "xs"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						_: 1
					}), createVNode(_component_InboxList, {
						modelValue: selectedMail.value,
						"onUpdate:modelValue": ($event) => selectedMail.value = $event,
						mails: filteredMails.value
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"mails"
					])];
				}),
				_: 1
			}, _parent));
			if (selectedMail.value) _push(ssrRenderComponent(_component_InboxMail, {
				mail: selectedMail.value,
				onClose: ($event) => selectedMail.value = null
			}, null, _parent));
			else {
				_push(`<div class="hidden lg:flex flex-1 items-center justify-center">`);
				_push(ssrRenderComponent(_component_UIcon, {
					name: "i-lucide-inbox",
					class: "size-32 text-dimmed"
				}, null, _parent));
				_push(`</div>`);
			}
			_push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/inbox.vue
var _sfc_setup = inbox_vue_vue_type_script_setup_true_lang_default.setup;
inbox_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/inbox.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var inbox_default = inbox_vue_vue_type_script_setup_true_lang_default;

export { inbox_default as default };
//# sourceMappingURL=inbox-DEbGLlX6.mjs.map
