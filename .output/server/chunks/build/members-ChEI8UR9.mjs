import { u as useFetch } from './fetch-ToU_qul8.mjs';
import { _ as _sfc_main$2 } from './Select-CbAcVpFw.mjs';
import { _ as _sfc_main$3 } from './DropdownMenu-DlLchN8a.mjs';
import { h as _sfc_main$7, i as _sfc_main$8 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1 } from './Input-3L6phQUN.mjs';
import { _ as _sfc_main } from './PageCard-Cxx6o4Hh.mjs';
import { defineComponent, withAsyncContext, ref, computed, withCtx, createVNode, unref, isRef, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import './PopperArrow-DMsSsDHm.mjs';
import './utils-C-SN97Al.mjs';
import './useTypeahead-JOpfisYr.mjs';
import './useFormControl-BySKHRcT.mjs';
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
import './namespaced-Hkd_Rrez.mjs';
import './useComposing-D1bdBmsI.mjs';
import './Kbd-CHYMLSD7.mjs';
import './RovingFocusGroup-Dji7OupF.mjs';
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

//#region app/components/settings/MembersList.vue?vue&type=script&setup=true&lang.ts
var MembersList_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MembersList",
	__ssrInlineRender: true,
	props: { members: {} },
	setup(__props) {
		const items = [{
			label: "Edit member",
			onSelect: () => console.log("Edit member")
		}, {
			label: "Remove member",
			color: "error",
			onSelect: () => console.log("Remove member")
		}];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UAvatar = _sfc_main$8;
			const _component_USelect = _sfc_main$2;
			const _component_UDropdownMenu = _sfc_main$3;
			const _component_UButton = _sfc_main$7;
			_push(`<ul${ssrRenderAttrs(mergeProps({
				role: "list",
				class: "divide-y divide-default"
			}, _attrs))}><!--[-->`);
			ssrRenderList(__props.members, (member, index) => {
				_push(`<li class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"><div class="flex items-center gap-3 min-w-0">`);
				_push(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, member.avatar, { size: "md" }), null, _parent));
				_push(`<div class="text-sm min-w-0"><p class="text-highlighted font-medium truncate">${ssrInterpolate(member.name)}</p><p class="text-muted truncate">${ssrInterpolate(member.username)}</p></div></div><div class="flex items-center gap-3">`);
				_push(ssrRenderComponent(_component_USelect, {
					"model-value": member.role,
					items: ["member", "owner"],
					color: "neutral",
					ui: {
						value: "capitalize",
						item: "capitalize"
					}
				}, null, _parent));
				_push(ssrRenderComponent(_component_UDropdownMenu, {
					items,
					content: { align: "end" }
				}, {
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
					_: 2
				}, _parent));
				_push(`</div></li>`);
			});
			_push(`<!--]--></ul>`);
		};
	}
});
//#endregion
//#region app/components/settings/MembersList.vue
var _sfc_setup$1 = MembersList_vue_vue_type_script_setup_true_lang_default.setup;
MembersList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/settings/MembersList.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var MembersList_default = Object.assign(MembersList_vue_vue_type_script_setup_true_lang_default, { __name: "SettingsMembersList" });
//#endregion
//#region app/pages/general/settings/members.vue?vue&type=script&setup=true&lang.ts
var members_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "members",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: members } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/members", { default: () => [] }, "$IcvMk_y4ZZ")), __temp = await __temp, __restore(), __temp);
		const q = ref("");
		const filteredMembers = computed(() => {
			return members.value.filter((member) => {
				return member.name.search(new RegExp(q.value, "i")) !== -1 || member.username.search(new RegExp(q.value, "i")) !== -1;
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPageCard = _sfc_main;
			const _component_UButton = _sfc_main$7;
			const _component_UInput = _sfc_main$1;
			const _component_SettingsMembersList = MembersList_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_UPageCard, {
				title: "Members",
				description: "Invite new members by email address.",
				variant: "naked",
				orientation: "horizontal",
				class: "mb-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Invite people",
						color: "neutral",
						class: "w-fit lg:ms-auto"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Invite people",
						color: "neutral",
						class: "w-fit lg:ms-auto"
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UPageCard, {
				variant: "subtle",
				ui: {
					container: "p-0 sm:p-0 gap-y-0",
					wrapper: "items-stretch",
					header: "p-4 mb-0 border-b border-default"
				}
			}, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UInput, {
						modelValue: unref(q),
						"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
						icon: "i-lucide-search",
						placeholder: "Search members",
						autofocus: "",
						class: "w-full"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UInput, {
						modelValue: unref(q),
						"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
						icon: "i-lucide-search",
						placeholder: "Search members",
						autofocus: "",
						class: "w-full"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_SettingsMembersList, { members: unref(filteredMembers) }, null, _parent, _scopeId));
					else return [createVNode(_component_SettingsMembersList, { members: unref(filteredMembers) }, null, 8, ["members"])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/general/settings/members.vue
var _sfc_setup = members_vue_vue_type_script_setup_true_lang_default.setup;
members_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/settings/members.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var members_default = members_vue_vue_type_script_setup_true_lang_default;

export { members_default as default };
//# sourceMappingURL=members-ChEI8UR9.mjs.map
