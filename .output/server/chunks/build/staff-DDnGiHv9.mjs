import { aP as useToast, al as useAuth, ak as useAsyncData, f as _sfc_main$1, j as _sfc_main$2, a1 as navigateTo } from '../virtual/entry.mjs';
import { _ as _sfc_main$6 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main } from './DropdownMenu-BoWa7GET.mjs';
import { _ as _sfc_main$4 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main$9 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main$7 } from './Input-BC1I0LeZ.mjs';
import { a as _sfc_main$1$1, _ as _sfc_main$5 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$8 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { u as useBranches } from './useBranches-DcaZOH57.mjs';
import { _ as _sfc_main$3 } from './Table-DZoThN5y.mjs';
import { u as useStaff } from './useStaff-C489DQX_.mjs';
import { defineComponent, computed, withAsyncContext, ref, h, mergeProps, withCtx, unref, isRef, openBlock, createBlock, createVNode, Fragment, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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
import './useComposing-D1bdBmsI.mjs';
import './Kbd-E_UYCv7U.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/pages/general/staff/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UButton = _sfc_main$1;
		const toast = useToast();
		const { listStaff, updateStaff } = useStaff();
		const { listBranches } = useBranches();
		const { user } = useAuth();
		const canManage = computed(() => user.value?.permissions?.includes("staff.manage") ?? false);
		const isBranchManager = computed(() => user.value?.roles?.some((r) => r.code === "branch_manager"));
		const BRANCH_MANAGER_ROLE_CODES = [
			"cashier",
			"coordinator",
			"verifier"
		];
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("staff-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const q = ref("");
		const roleFilter = ref("all");
		const branchFilter = ref("all");
		const page = ref(1);
		const { data: staffData, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("staff", () => listStaff({
			page: page.value,
			role: roleFilter.value === "all" ? void 0 : roleFilter.value,
			branch_id: isBranchManager.value ? void 0 : branchFilter.value === "all" ? void 0 : Number(branchFilter.value)
		}), {
			watch: [
				page,
				roleFilter,
				branchFilter
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
		const items = computed(() => staffData.value.data ?? []);
		const meta = computed(() => staffData.value.meta);
		const filteredItems = computed(() => {
			if (!q.value) return items.value;
			const needle = q.value.toLowerCase();
			return items.value.filter((member) => {
				return `${member.person?.first_name ?? ""} ${member.person?.last_name ?? ""}`.toLowerCase().includes(needle) || member.username.toLowerCase().includes(needle);
			});
		});
		const roleLabels = {
			coordinator: "Coordinador",
			verifier: "Verificador",
			branch_manager: "Gerente de Sucursal",
			cashier: "Cajera",
			"super-admin": "Super Administrador",
			general_manager: "Gerente General",
			distributor: "Distribuidora"
		};
		function memberRole(member) {
			return member.roles.find((r) => r.is_primary) ?? member.roles[0];
		}
		function branchName(branchId) {
			return branches.value.find((b) => b.id === branchId)?.name ?? "Global";
		}
		function openCreate() {
			navigateTo("/general/staff/new");
		}
		function getMemberItems(member) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (canManage.value) items.push({
				label: "Editar",
				icon: "i-lucide-pencil",
				onSelect() {
					navigateTo(`/general/staff/${member.id}`);
				}
			});
			items.push({ type: "separator" }, {
				label: member.is_active ? "Desactivar" : "Activar",
				icon: member.is_active ? "i-lucide-user-x" : "i-lucide-user-check",
				onSelect: async () => {
					try {
						await updateStaff(member.id, { is_active: !member.is_active });
						toast.add({
							title: "Personal actualizado",
							description: `${member.username} fue ${member.is_active ? "desactivado" : "activado"} correctamente`,
							color: "success"
						});
						await refresh();
					} catch {
						toast.add({
							title: "Error",
							description: "No se pudo actualizar el miembro.",
							color: "error"
						});
					}
				}
			});
			return items;
		}
		const roleItems = computed(() => [{
			label: "Todos los roles",
			value: "all"
		}, ...Object.entries(roleLabels).filter(([code]) => !isBranchManager.value || BRANCH_MANAGER_ROLE_CODES.includes(code)).map(([code, label]) => ({
			label,
			value: code
		}))]);
		const branchItems = computed(() => [{
			label: "Todas las sucursales",
			value: "all"
		}, ...branches.value.map((b) => ({
			label: b.name,
			value: b.id.toString()
		}))]);
		const columns = computed(() => {
			const list = [
				{
					accessorKey: "person",
					header: "Personal",
					cell: ({ row }) => {
						const member = row.original;
						const fullName = `${member.person?.first_name ?? ""} ${member.person?.last_name ?? ""}`.trim() || "Sin nombre";
						return h("div", { class: "min-w-0 py-1" }, [h("p", { class: "truncate font-semibold text-highlighted text-sm" }, fullName)]);
					}
				},
				{
					id: "username",
					header: "Usuario",
					cell: ({ row }) => {
						const member = row.original;
						return h("span", { class: "text-sm text-muted font-normal" }, `${member.username}`);
					}
				},
				{
					id: "email",
					header: "Correo",
					cell: ({ row }) => {
						const member = row.original;
						return h("span", { class: "text-sm text-muted font-normal" }, member.person?.email ?? "Sin correo");
					}
				},
				{
					id: "role",
					header: "Rol",
					cell: ({ row }) => {
						const member = row.original;
						const code = memberRole(member)?.code ?? "";
						const label = roleLabels[code] ?? code;
						return h(_sfc_main$9, {
							color: "primary",
							variant: "subtle",
							label
						});
					}
				},
				{
					id: "branch",
					header: "Sucursal",
					cell: ({ row }) => {
						const member = row.original;
						const role = memberRole(member);
						return h("span", { class: "text-sm text-muted" }, branchName(role?.branch_id));
					}
				},
				{
					accessorKey: "is_active",
					header: "Estado",
					cell: ({ row }) => {
						const member = row.original;
						return h(_sfc_main$9, {
							color: member.is_active ? "success" : "error",
							variant: "subtle",
							label: member.is_active ? "Activo" : "Inactivo"
						});
					}
				}
			];
			if (canManage.value) list.push({
				id: "actions",
				cell: ({ row }) => {
					return h("div", { class: "text-right" }, h(_sfc_main, {
						content: { align: "end" },
						items: getMemberItems(row.original)
					}, () => h(_sfc_main$1, {
						"icon": "i-lucide-ellipsis-vertical",
						"color": "neutral",
						"variant": "ghost",
						"aria-label": "Acciones"
					})));
				}
			});
			return list;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_USelect = _sfc_main$6;
			const _component_UInput = _sfc_main$7;
			const _component_UIcon = _sfc_main$2;
			const _component_UTable = _sfc_main$3;
			const _component_UPagination = _sfc_main$4;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "staff" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Personal" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(roleFilter),
									"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
									items: unref(roleItems),
									class: "w-44"
								}, null, _parent, _scopeId));
								if (!unref(isBranchManager)) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(branchFilter),
									"onUpdate:modelValue": ($event) => isRef(branchFilter) ? branchFilter.value = $event : null,
									items: unref(branchItems),
									class: "w-44"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar personal...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, _parent, _scopeId));
								if (unref(canManage)) _push(ssrRenderComponent(unref(UButton), {
									label: "Nuevo personal",
									icon: "i-lucide-user-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [
								createVNode(_component_USelect, {
									modelValue: unref(roleFilter),
									"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
									items: unref(roleItems),
									class: "w-44"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								]),
								!unref(isBranchManager) ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
									modelValue: unref(branchFilter),
									"onUpdate:modelValue": ($event) => isRef(branchFilter) ? branchFilter.value = $event : null,
									items: unref(branchItems),
									class: "w-44"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])) : createCommentVNode("", true),
								createVNode(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar personal...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(canManage) ? (openBlock(), createBlock(unref(UButton), {
									key: 1,
									label: "Nuevo personal",
									icon: "i-lucide-user-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, 8, ["onClick"])) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Personal" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [
							createVNode(_component_USelect, {
								modelValue: unref(roleFilter),
								"onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
								items: unref(roleItems),
								class: "w-44"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							]),
							!unref(isBranchManager) ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
								modelValue: unref(branchFilter),
								"onUpdate:modelValue": ($event) => isRef(branchFilter) ? branchFilter.value = $event : null,
								items: unref(branchItems),
								class: "w-44"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items"
							])) : createCommentVNode("", true),
							createVNode(_component_UInput, {
								modelValue: unref(q),
								"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
								placeholder: "Buscar personal...",
								icon: "i-lucide-search",
								class: "w-56"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(canManage) ? (openBlock(), createBlock(unref(UButton), {
								key: 1,
								label: "Nuevo personal",
								icon: "i-lucide-user-plus",
								color: "primary",
								variant: "solid",
								onClick: ($event) => openCreate()
							}, null, 8, ["onClick"])) : createCommentVNode("", true)
						]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (unref(status) === "pending") {
						_push(`<div class="flex items-center justify-center py-16"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-8 animate-spin text-muted"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else if (unref(status) === "error") {
						_push(`<div class="flex flex-col items-center justify-center gap-4 py-16 text-center"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-triangle-alert",
							class: "size-12 text-error"
						}, null, _parent, _scopeId));
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudo cargar el personal. </p>`);
						_push(ssrRenderComponent(unref(UButton), {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<!--[-->`);
						if (unref(filteredItems).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-users",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay personal registrado </p></div>`);
						} else _push(ssrRenderComponent(_component_UTable, {
							class: "shrink-0",
							data: unref(filteredItems),
							columns: unref(columns),
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, _parent, _scopeId));
						_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UPagination, {
							page: unref(page),
							"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
							total: unref(meta)?.total ?? 0,
							"items-per-page": unref(meta)?.per_page ?? 15
						}, null, _parent, _scopeId));
						_push(`</div><!--]-->`);
					}
					else return [unref(status) === "pending" ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : unref(status) === "error" ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex flex-col items-center justify-center gap-4 py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-triangle-alert",
							class: "size-12 text-error"
						}),
						createVNode("p", { class: "text-sm text-muted" }, " No se pudo cargar el personal. "),
						createVNode(unref(UButton), {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock(Fragment, { key: 2 }, [unref(filteredItems).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-users",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay personal registrado ")])) : (openBlock(), createBlock(_component_UTable, {
						key: 1,
						class: "shrink-0",
						data: unref(filteredItems),
						columns: unref(columns),
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, null, 8, ["data", "columns"])), createVNode("div", { class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto" }, [createVNode(_component_UPagination, {
						page: unref(page),
						"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
						total: unref(meta)?.total ?? 0,
						"items-per-page": unref(meta)?.per_page ?? 15
					}, null, 8, [
						"page",
						"onUpdate:page",
						"total",
						"items-per-page"
					])])], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/staff/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/staff/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var staff_default = index_vue_vue_type_script_setup_true_lang_default;

export { staff_default as default };
//# sourceMappingURL=staff-DDnGiHv9.mjs.map
