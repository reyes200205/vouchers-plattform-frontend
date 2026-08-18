import { u as useFetch } from './fetch-ToU_qul8.mjs';
import { _ as _sfc_main$3 } from './Select-CbAcVpFw.mjs';
import { _ as _sfc_main$4 } from './DropdownMenu-DlLchN8a.mjs';
import { _ as _sfc_main$1 } from './Kbd-CHYMLSD7.mjs';
import { _ as _sfc_main$a } from './Modal-blGtq3y5.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$2 } from './Pagination-Btou9NMC.mjs';
import { _ as _sfc_main$c } from './FormField-DOShaxcI.mjs';
import { aL as useToast, h as _sfc_main$7, i as _sfc_main$8$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$9 } from './Badge-B12zNpDE.mjs';
import { _ as _sfc_main } from './Input-3L6phQUN.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$8 } from './DashboardSidebarCollapse-c-FuL4zB.mjs';
import { _ as _sfc_main$b } from './Form-DpngGyYw.mjs';
import { _ as _sfc_main$5 } from './Table-BTtFuN8i.mjs';
import { defineComponent, useTemplateRef, ref, withAsyncContext, watch, computed, mergeProps, withCtx, isRef, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, h, renderSlot, reactive, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import * as z from 'zod';
import { G as upperFirst } from '../_/nitro.mjs';
import { getPaginationRowModel } from '@tanstack/table-core';
import './PopperArrow-DMsSsDHm.mjs';
import './utils-C-SN97Al.mjs';
import './useTypeahead-JOpfisYr.mjs';
import './useFormControl-BySKHRcT.mjs';
import './namespaced-Hkd_Rrez.mjs';
import './useComposing-D1bdBmsI.mjs';
import './RovingFocusGroup-Dji7OupF.mjs';
import './overlay-BtFRc-iG.mjs';
import './isValueEqualOrExist-BW-U-ShA.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-DOPBYbfB.mjs';
import './RovingFocusItem-DVFgmWh9.mjs';
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
import './DashboardSidebarToggle-BxKXl3gw.mjs';
import './esm-CcArdB_U.mjs';
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

//#region app/components/customers/AddModal.vue?vue&type=script&setup=true&lang.ts
var AddModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AddModal",
	__ssrInlineRender: true,
	setup(__props) {
		const schema = z.object({
			name: z.string().min(2, "Too short"),
			email: z.string().email("Invalid email")
		});
		const open = ref(false);
		const state = reactive({
			name: "",
			email: ""
		});
		const toast = useToast();
		async function onSubmit(event) {
			toast.add({
				title: "Success",
				description: `New customer ${event.data.name} added`,
				color: "success"
			});
			open.value = false;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$a;
			const _component_UButton = _sfc_main$7;
			const _component_UForm = _sfc_main$b;
			const _component_UFormField = _sfc_main$c;
			const _component_UInput = _sfc_main;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "New customer",
				description: "Add a new customer to the database"
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Name",
									placeholder: "John Doe",
									name: "name"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									label: "Email",
									placeholder: "john.doe@example.com",
									name: "email"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).email,
											"onUpdate:modelValue": ($event) => unref(state).email = $event,
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).email,
											"onUpdate:modelValue": ($event) => unref(state).email = $event,
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancel",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: "Create",
									color: "primary",
									variant: "solid",
									type: "submit"
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode(_component_UFormField, {
									label: "Name",
									placeholder: "John Doe",
									name: "name"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).name,
										"onUpdate:modelValue": ($event) => unref(state).name = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Email",
									placeholder: "john.doe@example.com",
									name: "email"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).email,
										"onUpdate:modelValue": ($event) => unref(state).email = $event,
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancel",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => open.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: "Create",
									color: "primary",
									variant: "solid",
									type: "submit"
								})])
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx(() => [
							createVNode(_component_UFormField, {
								label: "Name",
								placeholder: "John Doe",
								name: "name"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).name,
									"onUpdate:modelValue": ($event) => unref(state).name = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormField, {
								label: "Email",
								placeholder: "john.doe@example.com",
								name: "email"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).email,
									"onUpdate:modelValue": ($event) => unref(state).email = $event,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancel",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => open.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Create",
								color: "primary",
								variant: "solid",
								type: "submit"
							})])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "New customer",
						icon: "i-lucide-plus"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "New customer",
						icon: "i-lucide-plus"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/customers/AddModal.vue
var _sfc_setup$2 = AddModal_vue_vue_type_script_setup_true_lang_default.setup;
AddModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/AddModal.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AddModal_default = Object.assign(AddModal_vue_vue_type_script_setup_true_lang_default, { __name: "CustomersAddModal" });
//#endregion
//#region app/components/customers/DeleteModal.vue?vue&type=script&setup=true&lang.ts
var DeleteModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DeleteModal",
	__ssrInlineRender: true,
	props: { count: { default: 0 } },
	setup(__props) {
		const open = ref(false);
		async function onSubmit() {
			await new Promise((resolve) => setTimeout(resolve, 1e3));
			open.value = false;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$a;
			const _component_UButton = _sfc_main$7;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: `Delete ${__props.count} customer${__props.count > 1 ? "s" : ""}`,
				description: `Are you sure, this action cannot be undone.`
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Cancel",
							color: "neutral",
							variant: "subtle",
							onClick: ($event) => open.value = false
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							label: "Delete",
							color: "error",
							variant: "solid",
							"loading-auto": "",
							onClick: onSubmit
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
						label: "Cancel",
						color: "neutral",
						variant: "subtle",
						onClick: ($event) => open.value = false
					}, null, 8, ["onClick"]), createVNode(_component_UButton, {
						label: "Delete",
						color: "error",
						variant: "solid",
						"loading-auto": "",
						onClick: onSubmit
					})])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/customers/DeleteModal.vue
var _sfc_setup$1 = DeleteModal_vue_vue_type_script_setup_true_lang_default.setup;
DeleteModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customers/DeleteModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DeleteModal_default = Object.assign(DeleteModal_vue_vue_type_script_setup_true_lang_default, { __name: "CustomersDeleteModal" });
//#endregion
//#region app/pages/general/customers.vue?vue&type=script&setup=true&lang.ts
var customers_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "customers",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const UButton = _sfc_main$7;
		const UDropdownMenu = _sfc_main$4;
		const toast = useToast();
		const table = useTemplateRef("table");
		const columnFilters = ref([{
			id: "email",
			value: ""
		}]);
		const columnVisibility = ref();
		const rowSelection = ref({});
		const { data, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/customers", { lazy: true }, "$HN-4OC727f")), __temp = await __temp, __restore(), __temp);
		function getRowItems(row) {
			return [
				{
					type: "label",
					label: "Actions"
				},
				{
					label: "Copy customer ID",
					icon: "i-lucide-copy",
					onSelect() {
						(void 0).clipboard.writeText(row.original.id.toString());
						toast.add({
							title: "Copied to clipboard",
							description: "Customer ID copied to clipboard"
						});
					}
				},
				{ type: "separator" },
				{
					label: "View customer details",
					icon: "i-lucide-list"
				},
				{
					label: "View customer payments",
					icon: "i-lucide-wallet"
				},
				{ type: "separator" },
				{
					label: "Delete customer",
					icon: "i-lucide-trash",
					color: "error",
					onSelect() {
						toast.add({
							title: "Customer deleted",
							description: "The customer has been deleted."
						});
					}
				}
			];
		}
		const columns = [
			{
				id: "select",
				header: ({ table }) => h(_sfc_main$1$2, {
					"modelValue": table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
					"onUpdate:modelValue": (value) => table.toggleAllPageRowsSelected(!!value),
					"ariaLabel": "Select all"
				}),
				cell: ({ row }) => h(_sfc_main$1$2, {
					"modelValue": row.getIsSelected(),
					"onUpdate:modelValue": (value) => row.toggleSelected(!!value),
					"ariaLabel": "Select row"
				})
			},
			{
				accessorKey: "id",
				header: "ID"
			},
			{
				accessorKey: "name",
				header: "Name",
				cell: ({ row }) => {
					return h("div", { class: "flex items-center gap-3" }, [h(_sfc_main$8$1, {
						...row.original.avatar,
						size: "lg"
					}), h("div", void 0, [h("p", { class: "font-medium text-highlighted" }, row.original.name), h("p", { class: "" }, `@${row.original.name}`)])]);
				}
			},
			{
				accessorKey: "email",
				header: ({ column }) => {
					const isSorted = column.getIsSorted();
					return h(_sfc_main$7, {
						color: "neutral",
						variant: "ghost",
						label: "Email",
						icon: isSorted ? isSorted === "asc" ? "i-lucide-arrow-up-narrow-wide" : "i-lucide-arrow-down-wide-narrow" : "i-lucide-arrow-up-down",
						class: "-mx-2.5",
						onClick: () => column.toggleSorting(column.getIsSorted() === "asc")
					});
				}
			},
			{
				accessorKey: "location",
				header: "Location",
				cell: ({ row }) => row.original.location
			},
			{
				accessorKey: "status",
				header: "Status",
				filterFn: "equals",
				cell: ({ row }) => {
					const color = {
						subscribed: "success",
						unsubscribed: "error",
						bounced: "warning"
					}[row.original.status];
					return h(_sfc_main$9, {
						class: "capitalize",
						variant: "subtle",
						color
					}, () => row.original.status);
				}
			},
			{
				id: "actions",
				cell: ({ row }) => {
					return h("div", { class: "text-right" }, h(_sfc_main$4, {
						content: { align: "end" },
						items: getRowItems(row)
					}, () => h(_sfc_main$7, {
						icon: "i-lucide-ellipsis-vertical",
						color: "neutral",
						variant: "ghost",
						class: "ml-auto"
					})));
				}
			}
		];
		const statusFilter = ref("all");
		watch(() => statusFilter.value, (newVal) => {
			if (!table?.value?.tableApi) return;
			const statusColumn = table.value.tableApi.getColumn("status");
			if (!statusColumn) return;
			if (newVal === "all") statusColumn.setFilterValue(void 0);
			else statusColumn.setFilterValue(newVal);
		});
		const email = computed({
			get: () => {
				return table.value?.tableApi?.getColumn("email")?.getFilterValue() || "";
			},
			set: (value) => {
				table.value?.tableApi?.getColumn("email")?.setFilterValue(value || void 0);
			}
		});
		const pagination = ref({
			pageIndex: 0,
			pageSize: 10
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$8;
			const _component_CustomersAddModal = AddModal_default;
			const _component_UInput = _sfc_main;
			const _component_CustomersDeleteModal = DeleteModal_default;
			const _component_UKbd = _sfc_main$1;
			const _component_USelect = _sfc_main$3;
			const _component_UTable = _sfc_main$5;
			const _component_UPagination = _sfc_main$6;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "customers" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Customers" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_CustomersAddModal, null, null, _parent, _scopeId));
							else return [createVNode(_component_CustomersAddModal)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Customers" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_CustomersAddModal)]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-center justify-between gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(email),
							"onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
							class: "max-w-sm",
							icon: "i-lucide-search",
							placeholder: "Filter emails..."
						}, null, _parent, _scopeId));
						_push(`<div class="flex flex-wrap items-center gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_CustomersDeleteModal, { count: unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) if (unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length) _push(ssrRenderComponent(unref(UButton), {
									label: "Delete",
									color: "error",
									variant: "subtle",
									icon: "i-lucide-trash"
								}, {
									trailing: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UKbd, null, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length)}`);
												else return [createTextVNode(toDisplayString(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length), 1)];
											}),
											_: 1
										}, _parent, _scopeId));
										else return [createVNode(_component_UKbd, null, {
											default: withCtx(() => [createTextVNode(toDisplayString(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length), 1)]),
											_: 1
										})];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								else return [unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length ? (openBlock(), createBlock(unref(UButton), {
									key: 0,
									label: "Delete",
									color: "error",
									variant: "subtle",
									icon: "i-lucide-trash"
								}, {
									trailing: withCtx(() => [createVNode(_component_UKbd, null, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length), 1)]),
										_: 1
									})]),
									_: 1
								})) : createCommentVNode("", true)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: [
								{
									label: "All",
									value: "all"
								},
								{
									label: "Subscribed",
									value: "subscribed"
								},
								{
									label: "Unsubscribed",
									value: "unsubscribed"
								},
								{
									label: "Bounced",
									value: "bounced"
								}
							],
							ui: { trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200" },
							placeholder: "Filter status",
							class: "min-w-28"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(unref(UDropdownMenu), {
							items: unref(table)?.tableApi?.getAllColumns().filter((column) => column.getCanHide()).map((column) => ({
								label: unref(upperFirst)(column.id),
								type: "checkbox",
								checked: column.getIsVisible(),
								onUpdateChecked(checked) {
									unref(table)?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked);
								},
								onSelect(e) {
									e?.preventDefault();
								}
							})),
							content: { align: "end" }
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(UButton), {
									label: "Display",
									color: "neutral",
									variant: "outline",
									"trailing-icon": "i-lucide-settings-2"
								}, null, _parent, _scopeId));
								else return [createVNode(unref(UButton), {
									label: "Display",
									color: "neutral",
									variant: "outline",
									"trailing-icon": "i-lucide-settings-2"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
						_push(ssrRenderComponent(_component_UTable, {
							ref_key: "table",
							ref: table,
							"column-filters": unref(columnFilters),
							"onUpdate:columnFilters": ($event) => isRef(columnFilters) ? columnFilters.value = $event : null,
							"column-visibility": unref(columnVisibility),
							"onUpdate:columnVisibility": ($event) => isRef(columnVisibility) ? columnVisibility.value = $event : null,
							"row-selection": unref(rowSelection),
							"onUpdate:rowSelection": ($event) => isRef(rowSelection) ? rowSelection.value = $event : null,
							pagination: unref(pagination),
							"onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
							"pagination-options": { getPaginationRowModel: unref(getPaginationRowModel)() },
							class: "shrink-0",
							data: unref(data),
							columns,
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, _parent, _scopeId));
						_push(`<div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto"${_scopeId}><div class="text-sm text-muted"${_scopeId}>${ssrInterpolate(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length || 0)} of ${ssrInterpolate(unref(table)?.tableApi?.getFilteredRowModel().rows.length || 0)} row(s) selected. </div><div class="flex items-center gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UPagination, {
							"default-page": (unref(table)?.tableApi?.getState().pagination.pageIndex || 0) + 1,
							"items-per-page": unref(table)?.tableApi?.getState().pagination.pageSize,
							total: unref(table)?.tableApi?.getFilteredRowModel().rows.length,
							"onUpdate:page": (p) => unref(table)?.tableApi?.setPageIndex(p - 1)
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [
						createVNode("div", { class: "flex flex-wrap items-center justify-between gap-1.5" }, [createVNode(_component_UInput, {
							modelValue: unref(email),
							"onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
							class: "max-w-sm",
							icon: "i-lucide-search",
							placeholder: "Filter emails..."
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "flex flex-wrap items-center gap-1.5" }, [
							createVNode(_component_CustomersDeleteModal, { count: unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length }, {
								default: withCtx(() => [unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length ? (openBlock(), createBlock(unref(UButton), {
									key: 0,
									label: "Delete",
									color: "error",
									variant: "subtle",
									icon: "i-lucide-trash"
								}, {
									trailing: withCtx(() => [createVNode(_component_UKbd, null, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length), 1)]),
										_: 1
									})]),
									_: 1
								})) : createCommentVNode("", true)]),
								_: 1
							}, 8, ["count"]),
							createVNode(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "All",
										value: "all"
									},
									{
										label: "Subscribed",
										value: "subscribed"
									},
									{
										label: "Unsubscribed",
										value: "unsubscribed"
									},
									{
										label: "Bounced",
										value: "bounced"
									}
								],
								ui: { trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200" },
								placeholder: "Filter status",
								class: "min-w-28"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(unref(UDropdownMenu), {
								items: unref(table)?.tableApi?.getAllColumns().filter((column) => column.getCanHide()).map((column) => ({
									label: unref(upperFirst)(column.id),
									type: "checkbox",
									checked: column.getIsVisible(),
									onUpdateChecked(checked) {
										unref(table)?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked);
									},
									onSelect(e) {
										e?.preventDefault();
									}
								})),
								content: { align: "end" }
							}, {
								default: withCtx(() => [createVNode(unref(UButton), {
									label: "Display",
									color: "neutral",
									variant: "outline",
									"trailing-icon": "i-lucide-settings-2"
								})]),
								_: 1
							}, 8, ["items"])
						])]),
						createVNode(_component_UTable, {
							ref_key: "table",
							ref: table,
							"column-filters": unref(columnFilters),
							"onUpdate:columnFilters": ($event) => isRef(columnFilters) ? columnFilters.value = $event : null,
							"column-visibility": unref(columnVisibility),
							"onUpdate:columnVisibility": ($event) => isRef(columnVisibility) ? columnVisibility.value = $event : null,
							"row-selection": unref(rowSelection),
							"onUpdate:rowSelection": ($event) => isRef(rowSelection) ? rowSelection.value = $event : null,
							pagination: unref(pagination),
							"onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
							"pagination-options": { getPaginationRowModel: unref(getPaginationRowModel)() },
							class: "shrink-0",
							data: unref(data),
							columns,
							loading: unref(status) === "pending",
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, 8, [
							"column-filters",
							"onUpdate:columnFilters",
							"column-visibility",
							"onUpdate:columnVisibility",
							"row-selection",
							"onUpdate:rowSelection",
							"pagination",
							"onUpdate:pagination",
							"pagination-options",
							"data",
							"loading"
						]),
						createVNode("div", { class: "flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto" }, [createVNode("div", { class: "text-sm text-muted" }, toDisplayString(unref(table)?.tableApi?.getFilteredSelectedRowModel().rows.length || 0) + " of " + toDisplayString(unref(table)?.tableApi?.getFilteredRowModel().rows.length || 0) + " row(s) selected. ", 1), createVNode("div", { class: "flex items-center gap-1.5" }, [createVNode(_component_UPagination, {
							"default-page": (unref(table)?.tableApi?.getState().pagination.pageIndex || 0) + 1,
							"items-per-page": unref(table)?.tableApi?.getState().pagination.pageSize,
							total: unref(table)?.tableApi?.getFilteredRowModel().rows.length,
							"onUpdate:page": (p) => unref(table)?.tableApi?.setPageIndex(p - 1)
						}, null, 8, [
							"default-page",
							"items-per-page",
							"total",
							"onUpdate:page"
						])])])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/customers.vue
var _sfc_setup = customers_vue_vue_type_script_setup_true_lang_default.setup;
customers_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/customers.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var customers_default = customers_vue_vue_type_script_setup_true_lang_default;

export { customers_default as default };
//# sourceMappingURL=customers-CXInvOTK.mjs.map
