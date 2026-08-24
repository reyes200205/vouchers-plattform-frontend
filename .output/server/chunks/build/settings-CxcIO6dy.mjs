import { al as useAuth, ak as useAsyncData, ap as useComponentProps, aj as useAppConfig, ag as tv, c as Primitive, S as Slot } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Select-5EkiFePr.mjs';
import { a as _sfc_main$1, _ as _sfc_main$2 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$3 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { B as BranchSettingsForm_default, G as GlobalPointSettingsForm_default } from './GlobalPointSettingsForm-CHJZr262.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, createSlots, isRef, useSlots, shallowRef, mergeProps, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
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
import './DashboardSidebarToggle-BIlVm3ff.mjs';
import './useDirection-DK-ubNea.mjs';
import './useTypeahead-BWLtoev0.mjs';
import './useFormControl-BqrzxfBI.mjs';
import './PopperArrow-D4nTdxSJ.mjs';
import './FormField-BitybEBm.mjs';
import './Tabs-FmegTH4u.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './RovingFocusItem-ludpn-tQ.mjs';
import './Badge-BBG1L7MO.mjs';
import './Input-BC1I0LeZ.mjs';
import './Form-CCmdJDgC.mjs';
import './PageCard-C24h5VaM.mjs';
import './useSettings-ChVaLn3_.mjs';
import 'zod';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpage.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_default = {
	"slots": {
		"root": "flex flex-col lg:grid lg:grid-cols-10 lg:gap-10",
		"left": "lg:col-span-2",
		"center": "lg:col-span-8",
		"right": "lg:col-span-2 order-first lg:order-last"
	},
	"variants": {
		"left": { "true": "" },
		"right": { "true": "" }
	},
	"compoundVariants": [{
		"left": true,
		"right": true,
		"class": { "center": "lg:col-span-6" }
	}, {
		"left": false,
		"right": false,
		"class": { "center": "lg:col-span-10" }
	}]
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Page.vue
var _sfc_main = {
	__name: "UPage",
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
		const _props = __props;
		const slots = useSlots();
		const props = useComponentProps("page", _props);
		const appConfig = useAppConfig();
		const hasLeft = shallowRef(!!slots.left);
		const hasRight = shallowRef(!!slots.right);
		const ui = computed(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpage_default,
			...appConfig.ui?.page || {}
		})({
			left: hasLeft.value,
			right: hasRight.value
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: unref(props).as,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(props).ui?.root, unref(props).class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.left) _push(ssrRenderComponent(unref(Slot), {
							"data-slot": "left",
							class: ui.value.left({ class: unref(props).ui?.left })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "left", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "left")];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`<div data-slot="center" class="${ssrRenderClass(ui.value.center({ class: unref(props).ui?.center }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						_push(`</div>`);
						if (!!slots.right) _push(ssrRenderComponent(unref(Slot), {
							"data-slot": "right",
							class: ui.value.right({ class: unref(props).ui?.right })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "right")];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						!!slots.left ? (openBlock(), createBlock(unref(Slot), {
							key: 0,
							"data-slot": "left",
							class: ui.value.left({ class: unref(props).ui?.left })
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "left")]),
							_: 3
						}, 8, ["class"])) : createCommentVNode("", true),
						createVNode("div", {
							"data-slot": "center",
							class: ui.value.center({ class: unref(props).ui?.center })
						}, [renderSlot(_ctx.$slots, "default")], 2),
						!!slots.right ? (openBlock(), createBlock(unref(Slot), {
							key: 1,
							"data-slot": "right",
							class: ui.value.right({ class: unref(props).ui?.right })
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "right")]),
							_: 3
						}, 8, ["class"])) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/general/settings/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { user } = useAuth();
		const { listBranches } = useBranches();
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const isGeneralManager = computed(() => user.value?.permissions?.includes("point-settings.manage") ?? false);
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("settings-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const selectedBranchId = ref(branchManagerBranchId.value ?? branches.value[0]?.id ?? void 0);
		watch([branchManagerBranchId, branches], () => {
			if (!selectedBranchId.value && branchManagerBranchId.value) selectedBranchId.value = branchManagerBranchId.value;
			if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) selectedBranchId.value = branches.value[0].id;
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UPage = _sfc_main;
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$2;
			const _component_UDashboardSidebarCollapse = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			_push(ssrRenderComponent(_component_UPage, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardPanel, null, {
						header: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Configuración" }, createSlots({
								leading: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
									else return [createVNode(_component_UDashboardSidebarCollapse)];
								}),
								_: 2
							}, [unref(isGeneralManager) ? {
								name: "right",
								fn: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_USelect, {
										modelValue: unref(selectedBranchId),
										"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
										items: unref(branches).map((b) => ({
											label: b.name,
											value: b.id
										})),
										placeholder: "Sucursal...",
										class: "w-64"
									}, null, _parent, _scopeId));
									else return [createVNode(_component_USelect, {
										modelValue: unref(selectedBranchId),
										"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
										items: unref(branches).map((b) => ({
											label: b.name,
											value: b.id
										})),
										placeholder: "Sucursal...",
										class: "w-64"
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"items"
									])];
								}),
								key: "0"
							} : void 0]), _parent, _scopeId));
							else return [createVNode(_component_UDashboardNavbar, { title: "Configuración" }, createSlots({
								leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
								_: 2
							}, [unref(isGeneralManager) ? {
								name: "right",
								fn: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(selectedBranchId),
									"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
									items: unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									})),
									placeholder: "Sucursal...",
									class: "w-64"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])]),
								key: "0"
							} : void 0]), 1024)];
						}),
						body: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex flex-col gap-6 p-6"${_scopeId}>`);
								_push(ssrRenderComponent(BranchSettingsForm_default, {
									"branch-id": unref(selectedBranchId),
									tabbed: true
								}, null, _parent, _scopeId));
								if (unref(isGeneralManager)) _push(ssrRenderComponent(GlobalPointSettingsForm_default, null, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`</div>`);
							} else return [createVNode("div", { class: "flex flex-col gap-6 p-6" }, [createVNode(BranchSettingsForm_default, {
								"branch-id": unref(selectedBranchId),
								tabbed: true
							}, null, 8, ["branch-id"]), unref(isGeneralManager) ? (openBlock(), createBlock(GlobalPointSettingsForm_default, { key: 0 })) : createCommentVNode("", true)])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardPanel, null, {
						header: withCtx(() => [createVNode(_component_UDashboardNavbar, { title: "Configuración" }, createSlots({
							leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
							_: 2
						}, [unref(isGeneralManager) ? {
							name: "right",
							fn: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(selectedBranchId),
								"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
								items: unref(branches).map((b) => ({
									label: b.name,
									value: b.id
								})),
								placeholder: "Sucursal...",
								class: "w-64"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])]),
							key: "0"
						} : void 0]), 1024)]),
						body: withCtx(() => [createVNode("div", { class: "flex flex-col gap-6 p-6" }, [createVNode(BranchSettingsForm_default, {
							"branch-id": unref(selectedBranchId),
							tabbed: true
						}, null, 8, ["branch-id"]), unref(isGeneralManager) ? (openBlock(), createBlock(GlobalPointSettingsForm_default, { key: 0 })) : createCommentVNode("", true)])]),
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
//# sourceMappingURL=settings-CxcIO6dy.mjs.map
