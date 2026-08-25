import { ak as useAsyncData, j as _sfc_main$2, f as _sfc_main } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main$6 } from './Badge-BBG1L7MO.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { a as _sfc_main$1, _ as _sfc_main$5 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$3 } from './Table-DZoThN5y.mjs';
import { D as DecideVoucherRequestModal_default } from './DecideVoucherRequestModal-Ouxhs2hH.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, unref, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, Fragment, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';
import './FormField-BitybEBm.mjs';
import './RadioGroup-ByiZ78dl.mjs';
import './useDirection-DK-ubNea.mjs';
import './useFormControl-BqrzxfBI.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-qXGxQnKa.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './RovingFocusItem-ludpn-tQ.mjs';
import './Modal-C3ktQuxc.mjs';
import './overlay-C4SiqibN.mjs';
import './useCustomers-CQ23lYPq.mjs';
import './Form-CCmdJDgC.mjs';
import './Textarea-DLoRbkWE.mjs';
import './ChangeCustomerRequestModal-DnQVYlQ4.mjs';
import './Input-BC1I0LeZ.mjs';
import './utils-BYhQum64.mjs';
import 'zod';

//#region app/pages/general/voucher-requests.vue?vue&type=script&setup=true&lang.ts
var voucher_requests_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "voucher-requests",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { listPendingVoucherRequests } = useVouchers();
		const page = ref(1);
		const { data, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("voucher-requests", () => listPendingVoucherRequests({ page: page.value }), {
			watch: [page],
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
		const items = computed(() => data.value.data ?? []);
		const meta = computed(() => data.value.meta);
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function fmtDate(value) {
			if (!value) return "—";
			return new Date(value).toLocaleDateString("es-MX", {
				day: "2-digit",
				month: "short",
				year: "numeric"
			});
		}
		function onPageChange(nextPage) {
			page.value = nextPage;
		}
		async function onDecided() {
			await refresh();
		}
		const columns = [
			{
				accessorKey: "distributor",
				header: "Distribuidora",
				cell: ({ row }) => h("div", { class: "min-w-0" }, [h("p", { class: "truncate font-medium text-highlighted" }, row.original.distributor_name || `#${row.original.distributor_id}`), h("p", { class: "truncate text-xs text-muted" }, [row.original.distributor_number, row.original.branch_name].filter(Boolean).join(" · "))])
			},
			{
				accessorKey: "customer",
				header: "Cliente",
				cell: ({ row }) => h("div", { class: "min-w-0" }, [h("p", { class: "truncate font-medium text-highlighted" }, row.original.customer_name || "Cliente"), h("p", { class: "truncate text-xs text-muted" }, row.original.customer_code || "")])
			},
			{
				accessorKey: "financial_product_name",
				header: "Producto",
				cell: ({ row }) => row.original.financial_product_name ?? "—"
			},
			{
				accessorKey: "requested_amount",
				header: "Monto solicitado",
				cell: ({ row }) => h("div", { class: "flex items-center gap-2" }, [h("span", { class: "font-semibold text-highlighted" }, money.format(Number(row.original.requested_amount))), row.original.is_pre_vale ? h(_sfc_main$6, {
					color: "warning",
					variant: "subtle",
					label: "Pre-vale",
					size: "sm"
				}) : null])
			},
			{
				accessorKey: "created_at",
				header: "Fecha",
				cell: ({ row }) => fmtDate(row.original.created_at)
			},
			{
				id: "actions",
				cell: ({ row }) => h("div", { class: "text-right" }, [h(DecideVoucherRequestModal_default, {
					item: row.original,
					onDecided
				})])
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UIcon = _sfc_main$2;
			const _component_UButton = _sfc_main;
			const _component_UTable = _sfc_main$3;
			const _component_UPagination = _sfc_main$4;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "voucher-requests" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Solicitudes de vale" }, null, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Solicitudes de vale" })];
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
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar las solicitudes de vale. </p>`);
						if (unref(error)) _push(`<p class="max-w-md font-mono text-xs text-dimmed"${_scopeId}>${ssrInterpolate(unref(error)?.statusCode ? `HTTP ${unref(error).statusCode}` : "")} ${ssrInterpolate(unref(error)?.data?.message ?? "")}</p>`);
						else _push(`<!---->`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<!--[-->`);
						if (unref(items).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-clipboard-list",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay solicitudes de vale pendientes </p></div>`);
						} else _push(ssrRenderComponent(_component_UTable, {
							class: "shrink-0",
							data: unref(items),
							columns,
							ui: {
								base: "table-fixed border-separate border-spacing-0",
								thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
								tbody: "[&>tr]:last:[&>td]:border-b-0",
								th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
								td: "border-b border-default",
								separator: "h-0"
							}
						}, null, _parent, _scopeId));
						if (unref(meta).last_page > 1) {
							_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UPagination, {
								"model-value": unref(page),
								total: unref(meta).total,
								"items-per-page": unref(meta).per_page,
								"onUpdate:modelValue": onPageChange
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<!--]-->`);
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar las solicitudes de vale. "),
						unref(error) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "max-w-md font-mono text-xs text-dimmed"
						}, toDisplayString(unref(error)?.statusCode ? `HTTP ${unref(error).statusCode}` : "") + " " + toDisplayString(unref(error)?.data?.message ?? ""), 1)) : createCommentVNode("", true),
						createVNode(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock(Fragment, { key: 2 }, [unref(items).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-clipboard-list",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay solicitudes de vale pendientes ")])) : (openBlock(), createBlock(_component_UTable, {
						key: 1,
						class: "shrink-0",
						data: unref(items),
						columns,
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, null, 8, ["data"])), unref(meta).last_page > 1 ? (openBlock(), createBlock("div", {
						key: 2,
						class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"
					}, [createVNode(_component_UPagination, {
						"model-value": unref(page),
						total: unref(meta).total,
						"items-per-page": unref(meta).per_page,
						"onUpdate:modelValue": onPageChange
					}, null, 8, [
						"model-value",
						"total",
						"items-per-page"
					])])) : createCommentVNode("", true)], 64))];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/pages/general/voucher-requests.vue
var _sfc_setup = voucher_requests_vue_vue_type_script_setup_true_lang_default.setup;
voucher_requests_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/voucher-requests.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var voucher_requests_default = voucher_requests_vue_vue_type_script_setup_true_lang_default;

export { voucher_requests_default as default };
//# sourceMappingURL=voucher-requests-ByNmntZC.mjs.map
