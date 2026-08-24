import { al as useAuth, ak as useAsyncData, j as _sfc_main$2$1, f as _sfc_main$7, ap as useComponentProps, aj as useAppConfig, ay as useForwardProps, a8 as reactivePick, q as createReusableTemplate, ag as tv, h as _sfc_main$1$1, $ as $fetch$2, aM as useRuntimeConfig, c as Primitive } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$5 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main$9 } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$a } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$2 } from './Input-BC1I0LeZ.mjs';
import { a as _sfc_main$1, _ as _sfc_main$6 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { _ as _sfc_main$4 } from './Table-DZoThN5y.mjs';
import { u as useStaff } from './useStaff-C489DQX_.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, Fragment, createTextVNode, toDisplayString, h, useSlots, mergeProps, renderSlot, normalizeProps, guardReactiveProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
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
import './overlay-C4SiqibN.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

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
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Separator.vue
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
							else if (unref(props).avatar) _push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ size: unref(props).ui?.avatarSize || ui.value.avatarSize() }, unref(props).avatar, {
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
					}, null, 8, ["name", "class"])) : unref(props).avatar ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_a6bdf891eb6b0c16e122bd866561a18f/node_modules/@nuxt/ui/dist/runtime/components/Separator.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/composables/useAuditLogs.ts
function useAuditLogs() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listAuditLogs(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/system/audit-logs`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: params
		})).data;
	}
	return { listAuditLogs };
}
//#endregion
//#region app/pages/general/logs.vue?vue&type=script&setup=true&lang.ts
var logs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "logs",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UBadge = _sfc_main$a;
		const UButton = _sfc_main$7;
		const { listAuditLogs } = useAuditLogs();
		const { listBranches } = useBranches();
		const { listStaff } = useStaff();
		const { user } = useAuth();
		const isBranchManager = computed(() => user.value?.roles?.some((r) => r.code === "branch_manager") ?? false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("logs-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const { data: staffData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("logs-staff", () => listStaff({ per_page: 200 }), { default: () => ({ data: [] }) })), __temp = await __temp, __restore(), __temp);
		const search = ref("");
		const eventFilter = ref("all");
		const level = ref("all");
		const moduleFilter = ref("all");
		const branchFilter = ref("all");
		const userRoleFilter = ref("all");
		const userFilter = ref("all");
		const page = ref(1);
		const isDetailOpen = ref(false);
		const selectedLog = ref(null);
		function showDetails(log) {
			selectedLog.value = log;
			isDetailOpen.value = true;
		}
		const hasExtraData = computed(() => {
			const data = selectedLog.value?.extra_data;
			if (!data) return false;
			if (typeof data !== "object") return true;
			return Object.keys(data).length > 0;
		});
		const hasOldData = computed(() => {
			const data = selectedLog.value?.old_data;
			if (!data) return false;
			return Object.keys(data).length > 0;
		});
		const levelItems = [
			{
				label: "Todos los niveles",
				value: "all"
			},
			{
				label: "Info",
				value: "INFO"
			},
			{
				label: "Warning",
				value: "WARNING"
			},
			{
				label: "Error",
				value: "ERROR"
			}
		];
		const eventItems = [
			{
				label: "Todos los eventos",
				value: "all"
			},
			{
				label: "Creado",
				value: "CREATED"
			},
			{
				label: "Actualizado",
				value: "UPDATED"
			},
			{
				label: "Eliminado",
				value: "DELETED"
			},
			{
				label: "Aprobado",
				value: "APPROVED"
			},
			{
				label: "Rechazado",
				value: "REJECTED"
			},
			{
				label: "Solicitado",
				value: "REQUESTED"
			},
			{
				label: "Verificado",
				value: "VERIFIED"
			},
			{
				label: "Resuelto",
				value: "RESOLVED"
			},
			{
				label: "Asignado",
				value: "ASSIGNED"
			},
			{
				label: "Decidido",
				value: "DECIDED"
			},
			{
				label: "Cambiado",
				value: "CHANGED"
			},
			{
				label: "Emparejado",
				value: "MATCHED"
			},
			{
				label: "Cancelado",
				value: "CANCELED"
			},
			{
				label: "Confirmado",
				value: "CONFIRMED"
			},
			{
				label: "Completado",
				value: "COMPLETED"
			},
			{
				label: "Generado",
				value: "GENERATED"
			},
			{
				label: "Reprocesado",
				value: "REPROCESSED"
			},
			{
				label: "Cerrado",
				value: "CLOSED"
			},
			{
				label: "Enviado a revisión",
				value: "SUBMITTED"
			},
			{
				label: "Registrado",
				value: "RECORDED"
			},
			{
				label: "Revertido",
				value: "REVERSED"
			},
			{
				label: "Desembolsado",
				value: "DISBURSED"
			},
			{
				label: "Enviado",
				value: "SENT"
			},
			{
				label: "Reenviado",
				value: "RESENT"
			},
			{
				label: "Fallido",
				value: "FAILED"
			},
			{
				label: "Preautorizado",
				value: "PRE_AUTHORIZED"
			},
			{
				label: "Inicio de sesión",
				value: "LOGIN"
			},
			{
				label: "Cierre de sesión",
				value: "LOGOUT"
			}
		];
		const moduleItems = [
			{
				label: "Todos los módulos",
				value: "all"
			},
			{
				label: "Autenticación",
				value: "auth"
			},
			{
				label: "Vales",
				value: "vouchers"
			},
			{
				label: "Catálogo",
				value: "catalog"
			},
			{
				label: "Clientes",
				value: "customers"
			},
			{
				label: "Usuarios",
				value: "users"
			},
			{
				label: "Sucursales",
				value: "branches"
			},
			{
				label: "Personal",
				value: "staff"
			}
		];
		const branchItems = computed(() => [{
			label: "Todas las sucursales",
			value: "all"
		}, ...branches.value.map((b) => ({
			label: b.name,
			value: b.id.toString()
		}))]);
		const roleItems = [{
			label: "Todos los roles",
			value: "all"
		}, ...Object.entries({
			"super-admin": "Administrador General",
			branch_manager: "Gerente General",
			coordinator: "Coordinador",
			verifier: "Verificador"
		}).map(([code, label]) => ({
			label,
			value: code
		}))];
		const staffItems = computed(() => {
			return [{
				label: "Todos los usuarios",
				value: "all"
			}, ...(staffData.value?.data ?? []).map((s) => {
				const name = s.person ? `${s.person.first_name ?? ""} ${s.person.last_name ?? ""}`.trim() : "";
				return {
					label: name ? `${name} (${s.username})` : s.username,
					value: s.id.toString()
				};
			})];
		});
		watch([
			search,
			eventFilter,
			level,
			moduleFilter,
			branchFilter,
			userRoleFilter,
			userFilter
		], () => {
			page.value = 1;
		});
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("audit-logs", () => listAuditLogs({
			page: page.value,
			search: search.value || void 0,
			event_type: eventFilter.value !== "all" ? eventFilter.value : void 0,
			level: level.value !== "all" ? level.value : void 0,
			module: moduleFilter.value !== "all" ? moduleFilter.value : void 0,
			branch_id: isBranchManager.value ? branchManagerBranchId.value ?? void 0 : branchFilter.value !== "all" ? Number(branchFilter.value) : void 0,
			user_role: userRoleFilter.value !== "all" ? userRoleFilter.value : void 0,
			user_id: userFilter.value !== "all" ? Number(userFilter.value) : void 0
		}), {
			watch: [
				page,
				search,
				eventFilter,
				level,
				moduleFilter,
				branchFilter,
				userRoleFilter,
				userFilter
			],
			default: () => ({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const items = computed(() => data.value?.data ?? []);
		const meta = computed(() => data.value?.meta ?? {
			current_page: 1,
			last_page: 1,
			per_page: 15,
			total: 0
		});
		const columns = [
			{
				accessorKey: "created_at",
				header: "Fecha/Hora",
				cell: ({ row }) => {
					return new Date(row.original.created_at).toLocaleString("es-MX");
				}
			},
			{
				accessorKey: "user_name",
				header: "Usuario",
				cell: ({ row }) => {
					return h("div", [h("p", { class: "font-medium text-highlighted" }, row.original.user_name || "Sistema"), row.original.user_role ? h("p", { class: "text-xs text-muted" }, row.original.user_role) : null]);
				}
			},
			{
				id: "branch",
				header: "Sucursal",
				cell: ({ row }) => {
					return h("span", { class: "text-sm text-muted" }, row.original.branch?.name || "Global");
				}
			},
			{
				accessorKey: "module",
				header: "Módulo"
			},
			{
				accessorKey: "event_type",
				header: "Evento",
				cell: ({ row }) => {
					return h("code", { class: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono" }, row.original.event_type);
				}
			},
			{
				accessorKey: "level",
				header: "Nivel",
				cell: ({ row }) => {
					const level = row.original.level?.toLowerCase();
					return h(_sfc_main$a, {
						variant: "subtle",
						color: level === "error" ? "error" : level === "warning" ? "warning" : "success",
						class: "capitalize"
					}, () => level || "info");
				}
			},
			{
				accessorKey: "description",
				header: "Descripción",
				cell: ({ row }) => {
					return h("p", {
						class: "max-w-md truncate text-xs text-dimmed",
						title: row.original.description
					}, row.original.description);
				}
			},
			{
				accessorKey: "ip_address",
				header: "IP"
			},
			{
				id: "actions",
				header: "Detalle",
				cell: ({ row }) => {
					return h(_sfc_main$7, {
						icon: "i-lucide-eye",
						color: "neutral",
						variant: "ghost",
						size: "xs",
						onClick: () => showDetails(row.original)
					});
				}
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$6;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_UInput = _sfc_main$2;
			const _component_USelect = _sfc_main$3;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UTable = _sfc_main$4;
			const _component_UPagination = _sfc_main$5;
			const _component_UModal = _sfc_main$9;
			const _component_USeparator = _sfc_main;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "logs" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Bitácora de Auditoría" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(unref(UButton), {
								label: "Actualizar",
								icon: "i-lucide-refresh-cw",
								color: "neutral",
								variant: "ghost",
								loading: unref(status) === "pending",
								onClick: () => unref(refresh)()
							}, null, _parent, _scopeId));
							else return [createVNode(unref(UButton), {
								label: "Actualizar",
								icon: "i-lucide-refresh-cw",
								color: "neutral",
								variant: "ghost",
								loading: unref(status) === "pending",
								onClick: () => unref(refresh)()
							}, null, 8, ["loading", "onClick"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Bitácora de Auditoría" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(unref(UButton), {
							label: "Actualizar",
							icon: "i-lucide-refresh-cw",
							color: "neutral",
							variant: "ghost",
							loading: unref(status) === "pending",
							onClick: () => unref(refresh)()
						}, null, 8, ["loading", "onClick"])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-center justify-between gap-1.5 mb-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: search.value,
							"onUpdate:modelValue": ($event) => search.value = $event,
							class: "max-w-sm w-full",
							icon: "i-lucide-search",
							placeholder: "Buscar registros..."
						}, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap items-center gap-1.5"${_scopeId}>`);
						if (!isBranchManager.value) _push(ssrRenderComponent(_component_USelect, {
							modelValue: branchFilter.value,
							"onUpdate:modelValue": ($event) => branchFilter.value = $event,
							items: branchItems.value,
							placeholder: "Filtrar sucursal",
							class: "min-w-44"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: eventFilter.value,
							"onUpdate:modelValue": ($event) => eventFilter.value = $event,
							items: eventItems,
							placeholder: "Filtrar evento",
							class: "min-w-44"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: level.value,
							"onUpdate:modelValue": ($event) => level.value = $event,
							items: levelItems,
							placeholder: "Filtrar nivel",
							class: "min-w-36"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: moduleFilter.value,
							"onUpdate:modelValue": ($event) => moduleFilter.value = $event,
							items: moduleItems,
							placeholder: "Filtrar módulo",
							class: "min-w-44"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: userRoleFilter.value,
							"onUpdate:modelValue": ($event) => userRoleFilter.value = $event,
							items: roleItems,
							placeholder: "Filtrar rol",
							class: "min-w-44"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: userFilter.value,
							"onUpdate:modelValue": ($event) => userFilter.value = $event,
							items: staffItems.value,
							placeholder: "Filtrar usuario",
							class: "min-w-48"
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
						if (unref(status) === "pending" && items.value.length === 0) {
							_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-loader-circle",
								class: "size-8 animate-spin text-muted"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else if (items.value.length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-history",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}>No hay registros de bitácora</p></div>`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(_component_UTable, {
								data: items.value,
								columns,
								loading: unref(status) === "pending",
								class: "shrink-0",
								onSelect: (e, row) => showDetails(row.original),
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0 [&>tr]:cursor-pointer [&>tr]:hover:bg-muted/40 transition-colors",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, null, _parent, _scopeId));
							_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UPagination, {
								page: page.value,
								"onUpdate:page": ($event) => page.value = $event,
								total: meta.value.total,
								"items-per-page": meta.value.per_page
							}, null, _parent, _scopeId));
							_push(`</div><!--]-->`);
						}
					} else return [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5 mb-4" }, [createVNode(_component_UInput, {
						modelValue: search.value,
						"onUpdate:modelValue": ($event) => search.value = $event,
						class: "max-w-sm w-full",
						icon: "i-lucide-search",
						placeholder: "Buscar registros..."
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "flex flex-wrap items-center gap-1.5" }, [
						!isBranchManager.value ? (openBlock(), createBlock(_component_USelect, {
							key: 0,
							modelValue: branchFilter.value,
							"onUpdate:modelValue": ($event) => branchFilter.value = $event,
							items: branchItems.value,
							placeholder: "Filtrar sucursal",
							class: "min-w-44"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])) : createCommentVNode("", true),
						createVNode(_component_USelect, {
							modelValue: eventFilter.value,
							"onUpdate:modelValue": ($event) => eventFilter.value = $event,
							items: eventItems,
							placeholder: "Filtrar evento",
							class: "min-w-44"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						createVNode(_component_USelect, {
							modelValue: level.value,
							"onUpdate:modelValue": ($event) => level.value = $event,
							items: levelItems,
							placeholder: "Filtrar nivel",
							class: "min-w-36"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						createVNode(_component_USelect, {
							modelValue: moduleFilter.value,
							"onUpdate:modelValue": ($event) => moduleFilter.value = $event,
							items: moduleItems,
							placeholder: "Filtrar módulo",
							class: "min-w-44"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						createVNode(_component_USelect, {
							modelValue: userRoleFilter.value,
							"onUpdate:modelValue": ($event) => userRoleFilter.value = $event,
							items: roleItems,
							placeholder: "Filtrar rol",
							class: "min-w-44"
						}, null, 8, ["modelValue", "onUpdate:modelValue"]),
						createVNode(_component_USelect, {
							modelValue: userFilter.value,
							"onUpdate:modelValue": ($event) => userFilter.value = $event,
							items: staffItems.value,
							placeholder: "Filtrar usuario",
							class: "min-w-48"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])
					])]), unref(status) === "pending" && items.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : items.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-history",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, "No hay registros de bitácora")])) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode(_component_UTable, {
						data: items.value,
						columns,
						loading: unref(status) === "pending",
						class: "shrink-0",
						onSelect: (e, row) => showDetails(row.original),
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0 [&>tr]:cursor-pointer [&>tr]:hover:bg-muted/40 transition-colors",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, null, 8, [
						"data",
						"loading",
						"onSelect"
					]), createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto" }, [createVNode(_component_UPagination, {
						page: page.value,
						"onUpdate:page": ($event) => page.value = $event,
						total: meta.value.total,
						"items-per-page": meta.value.per_page
					}, null, 8, [
						"page",
						"onUpdate:page",
						"total",
						"items-per-page"
					])])], 64))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				open: isDetailOpen.value,
				"onUpdate:open": ($event) => isDetailOpen.value = $event,
				title: "Detalles del Registro de Auditoría",
				ui: { content: "max-w-4xl" },
				description: "Información completa del evento registrado"
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (selectedLog.value) {
						_push(`<div class="space-y-5"${_scopeId}><div class="grid grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Fecha / Hora</p><p class="text-sm text-highlighted"${_scopeId}>${ssrInterpolate(selectedLog.value.created_at ? new Date(selectedLog.value.created_at).toLocaleString("es-MX") : "")}</p></div><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Módulo / Evento</p><p class="text-sm text-highlighted font-medium capitalize"${_scopeId}>${ssrInterpolate(selectedLog.value.module)}</p><code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono mt-0.5 inline-block"${_scopeId}>${ssrInterpolate(selectedLog.value.event_type)}</code></div><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Nivel</p>`);
						_push(ssrRenderComponent(unref(UBadge), {
							variant: "subtle",
							color: selectedLog.value.level?.toLowerCase() === "error" ? "error" : selectedLog.value.level?.toLowerCase() === "warning" ? "warning" : "success",
							class: "capitalize"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(selectedLog.value.level || "info")}`);
								else return [createTextVNode(toDisplayString(selectedLog.value.level || "info"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
						_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
						_push(`<div class="grid grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Usuario</p><p class="text-sm text-highlighted font-medium"${_scopeId}>${ssrInterpolate(selectedLog.value.user_name || "Sistema")}</p>`);
						if (selectedLog.value.user_role) _push(`<p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(selectedLog.value.user_role)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Sucursal</p><p class="text-sm text-highlighted"${_scopeId}>${ssrInterpolate(selectedLog.value.branch?.name || "Global")}</p></div><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Dirección IP</p><p class="text-sm font-mono text-highlighted"${_scopeId}>${ssrInterpolate(selectedLog.value.ip_address || "N/A")}</p></div></div><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>Descripción</p><p class="text-sm text-highlighted leading-relaxed"${_scopeId}>${ssrInterpolate(selectedLog.value.description)}</p></div><div${_scopeId}><p class="text-xs font-semibold text-muted uppercase tracking-wider mb-1"${_scopeId}>User Agent</p><p class="text-xs text-dimmed leading-relaxed"${_scopeId}>${ssrInterpolate(selectedLog.value.user_agent || "N/A")}</p></div>`);
						if (hasOldData.value) {
							_push(`<div${_scopeId}>`);
							_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
							_push(`<p class="text-xs font-semibold text-muted uppercase tracking-wider mb-3 mt-4"${_scopeId}>Cambios realizados</p><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-xs font-medium text-error mb-1.5 flex items-center gap-1"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-circle-minus",
								class: "size-3.5"
							}, null, _parent, _scopeId));
							_push(` Antes </p><pre class="font-mono text-[11px] bg-error/5 border border-error/20 p-3 rounded-lg overflow-auto max-h-64 leading-tight text-error/80"${_scopeId}>${ssrInterpolate(JSON.stringify(selectedLog.value.old_data, null, 2))}</pre></div><div${_scopeId}><p class="text-xs font-medium text-success mb-1.5 flex items-center gap-1"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-circle-plus",
								class: "size-3.5"
							}, null, _parent, _scopeId));
							_push(` Después </p><pre class="font-mono text-[11px] bg-success/5 border border-success/20 p-3 rounded-lg overflow-auto max-h-64 leading-tight text-success/80"${_scopeId}>${ssrInterpolate(JSON.stringify(selectedLog.value.extra_data, null, 2))}</pre></div></div></div>`);
						} else if (hasExtraData.value) {
							_push(`<div${_scopeId}>`);
							_push(ssrRenderComponent(_component_USeparator, null, null, _parent, _scopeId));
							_push(`<p class="text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-4"${_scopeId}>Datos Adicionales</p><pre class="font-mono text-[11px] bg-muted/60 dark:bg-muted/30 p-3 rounded-lg overflow-auto border border-default max-h-80 leading-tight"${_scopeId}>${ssrInterpolate(JSON.stringify(selectedLog.value.extra_data, null, 2))}</pre></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else _push(`<!---->`);
					else return [selectedLog.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-5"
					}, [
						createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
							createVNode("div", null, [createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Fecha / Hora"), createVNode("p", { class: "text-sm text-highlighted" }, toDisplayString(selectedLog.value.created_at ? new Date(selectedLog.value.created_at).toLocaleString("es-MX") : ""), 1)]),
							createVNode("div", null, [
								createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Módulo / Evento"),
								createVNode("p", { class: "text-sm text-highlighted font-medium capitalize" }, toDisplayString(selectedLog.value.module), 1),
								createVNode("code", { class: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono mt-0.5 inline-block" }, toDisplayString(selectedLog.value.event_type), 1)
							]),
							createVNode("div", null, [createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Nivel"), createVNode(unref(UBadge), {
								variant: "subtle",
								color: selectedLog.value.level?.toLowerCase() === "error" ? "error" : selectedLog.value.level?.toLowerCase() === "warning" ? "warning" : "success",
								class: "capitalize"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(selectedLog.value.level || "info"), 1)]),
								_: 1
							}, 8, ["color"])])
						]),
						createVNode(_component_USeparator),
						createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
							createVNode("div", null, [
								createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Usuario"),
								createVNode("p", { class: "text-sm text-highlighted font-medium" }, toDisplayString(selectedLog.value.user_name || "Sistema"), 1),
								selectedLog.value.user_role ? (openBlock(), createBlock("p", {
									key: 0,
									class: "text-xs text-muted"
								}, toDisplayString(selectedLog.value.user_role), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", null, [createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Sucursal"), createVNode("p", { class: "text-sm text-highlighted" }, toDisplayString(selectedLog.value.branch?.name || "Global"), 1)]),
							createVNode("div", null, [createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Dirección IP"), createVNode("p", { class: "text-sm font-mono text-highlighted" }, toDisplayString(selectedLog.value.ip_address || "N/A"), 1)])
						]),
						createVNode("div", null, [createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "Descripción"), createVNode("p", { class: "text-sm text-highlighted leading-relaxed" }, toDisplayString(selectedLog.value.description), 1)]),
						createVNode("div", null, [createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-1" }, "User Agent"), createVNode("p", { class: "text-xs text-dimmed leading-relaxed" }, toDisplayString(selectedLog.value.user_agent || "N/A"), 1)]),
						hasOldData.value ? (openBlock(), createBlock("div", { key: 0 }, [
							createVNode(_component_USeparator),
							createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-3 mt-4" }, "Cambios realizados"),
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode("div", null, [createVNode("p", { class: "text-xs font-medium text-error mb-1.5 flex items-center gap-1" }, [createVNode(_component_UIcon, {
								name: "i-lucide-circle-minus",
								class: "size-3.5"
							}), createTextVNode(" Antes ")]), createVNode("pre", { class: "font-mono text-[11px] bg-error/5 border border-error/20 p-3 rounded-lg overflow-auto max-h-64 leading-tight text-error/80" }, toDisplayString(JSON.stringify(selectedLog.value.old_data, null, 2)), 1)]), createVNode("div", null, [createVNode("p", { class: "text-xs font-medium text-success mb-1.5 flex items-center gap-1" }, [createVNode(_component_UIcon, {
								name: "i-lucide-circle-plus",
								class: "size-3.5"
							}), createTextVNode(" Después ")]), createVNode("pre", { class: "font-mono text-[11px] bg-success/5 border border-success/20 p-3 rounded-lg overflow-auto max-h-64 leading-tight text-success/80" }, toDisplayString(JSON.stringify(selectedLog.value.extra_data, null, 2)), 1)])])
						])) : hasExtraData.value ? (openBlock(), createBlock("div", { key: 1 }, [
							createVNode(_component_USeparator),
							createVNode("p", { class: "text-xs font-semibold text-muted uppercase tracking-wider mb-2 mt-4" }, "Datos Adicionales"),
							createVNode("pre", { class: "font-mono text-[11px] bg-muted/60 dark:bg-muted/30 p-3 rounded-lg overflow-auto border border-default max-h-80 leading-tight" }, toDisplayString(JSON.stringify(selectedLog.value.extra_data, null, 2)), 1)
						])) : createCommentVNode("", true)
					])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/logs.vue
var _sfc_setup = logs_vue_vue_type_script_setup_true_lang_default.setup;
logs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/logs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var logs_default = logs_vue_vue_type_script_setup_true_lang_default;

export { logs_default as default };
//# sourceMappingURL=logs-P_El1qhv.mjs.map
