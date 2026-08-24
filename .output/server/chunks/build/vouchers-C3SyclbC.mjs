import { al as useAuth, ak as useAsyncData, j as _sfc_main$2, f as _sfc_main$4, h as _sfc_main$1$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$6 } from './Select-5EkiFePr.mjs';
import { _ as _sfc_main$3 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main } from './Badge-BBG1L7MO.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { a as _sfc_main$1, _ as _sfc_main$5 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$7 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { D as DecideVoucherRequestModal_default } from './DecideVoucherRequestModal-bq6A-oDw.mjs';
import { defineComponent, computed, ref, withAsyncContext, watch, resolveComponent, withCtx, unref, isRef, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, createTextVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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
import './RadioGroup-ByiZ78dl.mjs';
import './useForwardScopeId-BtHsXtbt.mjs';
import './VisuallyHiddenInput-qXGxQnKa.mjs';
import './RovingFocusGroup-CtGPQyDM.mjs';
import './RovingFocusItem-ludpn-tQ.mjs';
import './Modal-C3ktQuxc.mjs';
import './overlay-C4SiqibN.mjs';
import './useCustomers-CQ23lYPq.mjs';
import './Form-CCmdJDgC.mjs';
import './Textarea-DLoRbkWE.mjs';
import './ChangeCustomerRequestModal-DOve31JV.mjs';
import './Input-BC1I0LeZ.mjs';
import 'zod';

//#region app/pages/general/vouchers.vue?vue&type=script&setup=true&lang.ts
var vouchers_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "vouchers",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { user } = useAuth();
		const { listVouchers, listPendingVoucherRequests } = useVouchers();
		const canApprove = computed(() => user.value?.permissions?.includes("vouchers.approve") ?? false);
		const statusFilter = ref(void 0);
		const page = ref(1);
		const { data, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("vouchers", () => listVouchers({
			status: statusFilter.value,
			page: page.value
		}), {
			watch: [statusFilter, page],
			default: () => ({
				data: [],
				links: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const requestsPage = ref(1);
		const { data: requestsData, status: requestsStatus, refresh: refreshRequests } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("pending-voucher-requests", () => {
			if (!canApprove.value) return Promise.resolve({
				data: [],
				links: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			});
			return listPendingVoucherRequests({ page: requestsPage.value });
		}, {
			watch: [requestsPage],
			default: () => ({
				data: [],
				links: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const pendingRequests = computed(() => requestsData.value.data ?? []);
		const requestsMeta = computed(() => requestsData.value.meta);
		function onRequestPageChange(nextPage) {
			requestsPage.value = nextPage;
		}
		async function onRequestDecided() {
			await Promise.all([refreshRequests(), refresh()]);
		}
		const isDetailOpen = ref(false);
		const selectedVoucher = ref(null);
		function openVoucherDetail(voucher) {
			selectedVoucher.value = voucher;
			isDetailOpen.value = true;
		}
		watch(error, (e) => {
			if (e) console.error("[vouchers] No se pudieron cargar los vales:", e);
		}, { immediate: true });
		const errorDetail = computed(() => {
			const e = error.value;
			if (!e) return null;
			return [e.statusCode ? `HTTP ${e.statusCode}` : "Error de red", e.data?.message ?? e.statusMessage ?? ""].filter(Boolean).join(" — ");
		});
		const items = computed(() => data.value.data ?? []);
		const meta = computed(() => data.value.meta);
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		const statusColors = {
			APROBADO: "success",
			ACTIVO: "info",
			PAGADO: "success",
			LIQUIDADO: "neutral",
			MOROSO: "error",
			CANCELADO: "error",
			REVERSADO: "neutral",
			BORRADOR: "warning"
		};
		function customerName(voucher) {
			const person = voucher.customer?.person;
			return [person?.first_name, person?.last_name].filter(Boolean).join(" ") || "Cliente";
		}
		function distributorName(voucher) {
			const person = voucher.distributor?.person;
			return [person?.first_name, person?.last_name].filter(Boolean).join(" ") || null;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$7;
			const _component_USelect = _sfc_main$6;
			const _component_UBadge = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_VouchersDecideVoucherRequestModal = DecideVoucherRequestModal_default;
			const _component_UPagination = _sfc_main$3;
			const _component_UButton = _sfc_main$4;
			const _component_UAvatar = _sfc_main$1$1;
			const _component_VoucherDetailModal = resolveComponent("VoucherDetailModal");
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "vouchers" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Vales emitidos" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Activos",
										value: "ACTIVO"
									},
									{
										label: "Pago parcial",
										value: "PAGO_PARCIAL"
									},
									{
										label: "Pagados",
										value: "PAGADO"
									},
									{
										label: "Liquidados",
										value: "LIQUIDADO"
									},
									{
										label: "Morosos",
										value: "MOROSO"
									},
									{
										label: "Cancelados",
										value: "CANCELADO"
									}
								],
								placeholder: "Estado",
								class: "w-40"
							}, null, _parent, _scopeId));
							else return [createVNode(_component_USelect, {
								modelValue: unref(statusFilter),
								"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
								items: [
									{
										label: "Todos los estados",
										value: void 0
									},
									{
										label: "Activos",
										value: "ACTIVO"
									},
									{
										label: "Pago parcial",
										value: "PAGO_PARCIAL"
									},
									{
										label: "Pagados",
										value: "PAGADO"
									},
									{
										label: "Liquidados",
										value: "LIQUIDADO"
									},
									{
										label: "Morosos",
										value: "MOROSO"
									},
									{
										label: "Cancelados",
										value: "CANCELADO"
									}
								],
								placeholder: "Estado",
								class: "w-40"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Vales emitidos" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_USelect, {
							modelValue: unref(statusFilter),
							"onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
							items: [
								{
									label: "Todos los estados",
									value: void 0
								},
								{
									label: "Activos",
									value: "ACTIVO"
								},
								{
									label: "Pago parcial",
									value: "PAGO_PARCIAL"
								},
								{
									label: "Pagados",
									value: "PAGADO"
								},
								{
									label: "Liquidados",
									value: "LIQUIDADO"
								},
								{
									label: "Morosos",
									value: "MOROSO"
								},
								{
									label: "Cancelados",
									value: "CANCELADO"
								}
							],
							placeholder: "Estado",
							class: "w-40"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(canApprove)) {
							_push(`<div class="mb-6 border-b border-default pb-6"${_scopeId}><div class="mb-3 flex items-center gap-2"${_scopeId}><h3 class="text-sm font-semibold text-highlighted"${_scopeId}> Solicitudes pendientes </h3>`);
							if (unref(pendingRequests).length > 0) _push(ssrRenderComponent(_component_UBadge, {
								color: "warning",
								variant: "subtle",
								label: String(unref(requestsMeta).total)
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</div>`);
							if (unref(requestsStatus) === "pending") {
								_push(`<div class="flex items-center justify-center py-8"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-loader-circle",
									class: "size-6 animate-spin text-muted"
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else if (unref(pendingRequests).length === 0) _push(`<div class="rounded-lg border border-dashed border-default py-6 text-center text-sm text-muted"${_scopeId}> No hay solicitudes de vale pendientes </div>`);
							else {
								_push(`<div class="divide-y divide-default rounded-lg border border-default"${_scopeId}><!--[-->`);
								ssrRenderList(unref(pendingRequests), (request) => {
									_push(`<div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3"${_scopeId}><div class="min-w-0"${_scopeId}><p class="truncate text-sm font-medium text-highlighted"${_scopeId}>${ssrInterpolate(request.customer_name || "Cliente")} `);
									if (request.customer_code) _push(`<span class="text-xs font-normal text-muted"${_scopeId}>(${ssrInterpolate(request.customer_code)})</span>`);
									else _push(`<!---->`);
									_push(`</p><p class="truncate text-xs text-muted"${_scopeId}> Distribuidora: ${ssrInterpolate(request.distributor_name || `#${request.distributor_id}`)} `);
									if (request.distributor_number) _push(`<span${_scopeId}>(${ssrInterpolate(request.distributor_number)})</span>`);
									else _push(`<!---->`);
									if (request.financial_product_name) _push(`<!--[--> · ${ssrInterpolate(request.financial_product_name)}<!--]-->`);
									else _push(`<!---->`);
									_push(`</p></div><div class="flex items-center gap-3"${_scopeId}><div class="text-right"${_scopeId}><p class="text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(request.requested_amount)))}</p>`);
									if (request.is_pre_vale) _push(ssrRenderComponent(_component_UBadge, {
										color: "warning",
										variant: "subtle",
										label: "Pre-vale",
										size: "sm"
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`</div>`);
									_push(ssrRenderComponent(_component_VouchersDecideVoucherRequestModal, {
										item: request,
										onDecided: onRequestDecided
									}, null, _parent, _scopeId));
									_push(`</div></div>`);
								});
								_push(`<!--]--></div>`);
							}
							if (unref(requestsMeta).last_page > 1) {
								_push(`<div class="flex justify-end pt-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									"model-value": unref(requestsPage),
									total: unref(requestsMeta).total,
									"items-per-page": unref(requestsMeta).per_page,
									"onUpdate:modelValue": onRequestPageChange
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						if (unref(status) === "pending") {
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
							_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar los vales. </p>`);
							if (unref(errorDetail)) _push(`<p class="max-w-md font-mono text-xs text-dimmed"${_scopeId}>${ssrInterpolate(unref(errorDetail))}</p>`);
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
							if (unref(canApprove)) _push(`<h3 class="mb-3 text-sm font-semibold text-highlighted"${_scopeId}> Vales emitidos </h3>`);
							else _push(`<!---->`);
							if (unref(items).length === 0) {
								_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-receipt-text",
									class: "size-12 text-dimmed"
								}, null, _parent, _scopeId));
								_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay vales con esos filtros </p></div>`);
							} else {
								_push(`<div class="h-full overflow-y-auto divide-y divide-default"${_scopeId}><!--[-->`);
								ssrRenderList(unref(items), (item) => {
									_push(`<div class="cursor-pointer px-6 py-4 hover:bg-elevated/50"${_scopeId}><div class="flex flex-wrap items-center justify-between gap-3"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UAvatar, {
										alt: customerName(item),
										icon: "i-lucide-ticket",
										size: "lg"
									}, null, _parent, _scopeId));
									_push(`<div class="min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(item.voucher_number)}</p>`);
									if (item.is_expired) _push(ssrRenderComponent(_component_UBadge, {
										color: "error",
										variant: "solid",
										label: "VENCIDO"
									}, null, _parent, _scopeId));
									else _push(ssrRenderComponent(_component_UBadge, {
										color: item.status && statusColors[item.status] || "neutral",
										variant: "subtle",
										label: item.status ?? void 0
									}, null, _parent, _scopeId));
									_push(`</div><div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted"${_scopeId}><span${_scopeId}>Cliente: ${ssrInterpolate(customerName(item))} (${ssrInterpolate(item.customer?.customer_code)})</span>`);
									if (!item.customer?.verified_at) _push(ssrRenderComponent(_component_UBadge, {
										color: "warning",
										variant: "subtle",
										label: "Cliente sin verificar"
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									if (distributorName(item)) {
										_push(`<span${_scopeId}> Distribuidora: ${ssrInterpolate(distributorName(item))} `);
										if (item.distributor?.distributor_number) _push(`<!--[--> (${ssrInterpolate(item.distributor.distributor_number)}) <!--]-->`);
										else _push(`<!---->`);
										_push(`</span>`);
									} else _push(`<!---->`);
									if (item.transferred_at) _push(`<span${_scopeId}> Entregado ${ssrInterpolate(new Date(item.transferred_at).toLocaleDateString("es-MX"))}</span>`);
									else _push(`<!---->`);
									if (item.transfer_reference) _push(`<span${_scopeId}>Ref: ${ssrInterpolate(item.transfer_reference)}</span>`);
									else _push(`<!---->`);
									if (item.status === "APROBADO" && item.expiration_date) _push(`<span class="${ssrRenderClass({ "text-error font-medium": item.is_expired })}"${_scopeId}>${ssrInterpolate(item.is_expired ? "Expiró" : "Vence")} el ${ssrInterpolate((/* @__PURE__ */ new Date(item.expiration_date + "T00:00:00")).toLocaleDateString("es-MX"))}</span>`);
									else _push(`<!---->`);
									_push(`</div></div></div><div class="flex items-center gap-3"${_scopeId}><div class="text-right"${_scopeId}><p class="text-sm font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(item.amount)))}</p>`);
									if (item.total_fortnights) _push(`<p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(item.total_fortnights)} quincenas </p>`);
									else _push(`<!---->`);
									_push(`</div></div></div></div>`);
								});
								_push(`<!--]--></div>`);
							}
							if (unref(meta).last_page > 1) {
								_push(`<div class="flex justify-end px-6 py-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									page: unref(page),
									"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
									total: unref(meta).total,
									"items-per-page": unref(meta).per_page
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`<!--]-->`);
						}
					} else return [unref(canApprove) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "mb-6 border-b border-default pb-6"
					}, [
						createVNode("div", { class: "mb-3 flex items-center gap-2" }, [createVNode("h3", { class: "text-sm font-semibold text-highlighted" }, " Solicitudes pendientes "), unref(pendingRequests).length > 0 ? (openBlock(), createBlock(_component_UBadge, {
							key: 0,
							color: "warning",
							variant: "subtle",
							label: String(unref(requestsMeta).total)
						}, null, 8, ["label"])) : createCommentVNode("", true)]),
						unref(requestsStatus) === "pending" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex items-center justify-center py-8"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-loader-circle",
							class: "size-6 animate-spin text-muted"
						})])) : unref(pendingRequests).length === 0 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "rounded-lg border border-dashed border-default py-6 text-center text-sm text-muted"
						}, " No hay solicitudes de vale pendientes ")) : (openBlock(), createBlock("div", {
							key: 2,
							class: "divide-y divide-default rounded-lg border border-default"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(pendingRequests), (request) => {
							return openBlock(), createBlock("div", {
								key: request.id,
								class: "flex flex-wrap items-center justify-between gap-3 px-4 py-3"
							}, [createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate text-sm font-medium text-highlighted" }, [createTextVNode(toDisplayString(request.customer_name || "Cliente") + " ", 1), request.customer_code ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-xs font-normal text-muted"
							}, "(" + toDisplayString(request.customer_code) + ")", 1)) : createCommentVNode("", true)]), createVNode("p", { class: "truncate text-xs text-muted" }, [
								createTextVNode(" Distribuidora: " + toDisplayString(request.distributor_name || `#${request.distributor_id}`) + " ", 1),
								request.distributor_number ? (openBlock(), createBlock("span", { key: 0 }, "(" + toDisplayString(request.distributor_number) + ")", 1)) : createCommentVNode("", true),
								request.financial_product_name ? (openBlock(), createBlock(Fragment, { key: 1 }, [createTextVNode(" · " + toDisplayString(request.financial_product_name), 1)], 64)) : createCommentVNode("", true)
							])]), createVNode("div", { class: "flex items-center gap-3" }, [createVNode("div", { class: "text-right" }, [createVNode("p", { class: "text-sm font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(request.requested_amount))), 1), request.is_pre_vale ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "warning",
								variant: "subtle",
								label: "Pre-vale",
								size: "sm"
							})) : createCommentVNode("", true)]), createVNode(_component_VouchersDecideVoucherRequestModal, {
								item: request,
								onDecided: onRequestDecided
							}, null, 8, ["item"])])]);
						}), 128))])),
						unref(requestsMeta).last_page > 1 ? (openBlock(), createBlock("div", {
							key: 3,
							class: "flex justify-end pt-3"
						}, [createVNode(_component_UPagination, {
							"model-value": unref(requestsPage),
							total: unref(requestsMeta).total,
							"items-per-page": unref(requestsMeta).per_page,
							"onUpdate:modelValue": onRequestPageChange
						}, null, 8, [
							"model-value",
							"total",
							"items-per-page"
						])])) : createCommentVNode("", true)
					])) : createCommentVNode("", true), unref(status) === "pending" ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : unref(status) === "error" ? (openBlock(), createBlock("div", {
						key: 2,
						class: "flex flex-col items-center justify-center gap-4 py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-triangle-alert",
							class: "size-12 text-error"
						}),
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar los vales. "),
						unref(errorDetail) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "max-w-md font-mono text-xs text-dimmed"
						}, toDisplayString(unref(errorDetail)), 1)) : createCommentVNode("", true),
						createVNode(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock(Fragment, { key: 3 }, [
						unref(canApprove) ? (openBlock(), createBlock("h3", {
							key: 0,
							class: "mb-3 text-sm font-semibold text-highlighted"
						}, " Vales emitidos ")) : createCommentVNode("", true),
						unref(items).length === 0 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "flex flex-col items-center justify-center py-16 text-center"
						}, [createVNode(_component_UIcon, {
							name: "i-lucide-receipt-text",
							class: "size-12 text-dimmed"
						}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay vales con esos filtros ")])) : (openBlock(), createBlock("div", {
							key: 2,
							class: "h-full overflow-y-auto divide-y divide-default"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item) => {
							return openBlock(), createBlock("div", {
								key: item.id,
								class: "cursor-pointer px-6 py-4 hover:bg-elevated/50",
								onClick: ($event) => openVoucherDetail(item)
							}, [createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode(_component_UAvatar, {
								alt: customerName(item),
								icon: "i-lucide-ticket",
								size: "lg"
							}, null, 8, ["alt"]), createVNode("div", { class: "min-w-0" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(item.voucher_number), 1), item.is_expired ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "error",
								variant: "solid",
								label: "VENCIDO"
							})) : (openBlock(), createBlock(_component_UBadge, {
								key: 1,
								color: item.status && statusColors[item.status] || "neutral",
								variant: "subtle",
								label: item.status ?? void 0
							}, null, 8, ["color", "label"]))]), createVNode("div", { class: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted" }, [
								createVNode("span", null, "Cliente: " + toDisplayString(customerName(item)) + " (" + toDisplayString(item.customer?.customer_code) + ")", 1),
								!item.customer?.verified_at ? (openBlock(), createBlock(_component_UBadge, {
									key: 0,
									color: "warning",
									variant: "subtle",
									label: "Cliente sin verificar"
								})) : createCommentVNode("", true),
								distributorName(item) ? (openBlock(), createBlock("span", { key: 1 }, [createTextVNode(" Distribuidora: " + toDisplayString(distributorName(item)) + " ", 1), item.distributor?.distributor_number ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" (" + toDisplayString(item.distributor.distributor_number) + ") ", 1)], 64)) : createCommentVNode("", true)])) : createCommentVNode("", true),
								item.transferred_at ? (openBlock(), createBlock("span", { key: 2 }, " Entregado " + toDisplayString(new Date(item.transferred_at).toLocaleDateString("es-MX")), 1)) : createCommentVNode("", true),
								item.transfer_reference ? (openBlock(), createBlock("span", { key: 3 }, "Ref: " + toDisplayString(item.transfer_reference), 1)) : createCommentVNode("", true),
								item.status === "APROBADO" && item.expiration_date ? (openBlock(), createBlock("span", {
									key: 4,
									class: { "text-error font-medium": item.is_expired }
								}, toDisplayString(item.is_expired ? "Expiró" : "Vence") + " el " + toDisplayString((/* @__PURE__ */ new Date(item.expiration_date + "T00:00:00")).toLocaleDateString("es-MX")), 3)) : createCommentVNode("", true)
							])])]), createVNode("div", {
								class: "flex items-center gap-3",
								onClick: withModifiers(() => {}, ["stop"])
							}, [createVNode("div", { class: "text-right" }, [createVNode("p", { class: "text-sm font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(item.amount))), 1), item.total_fortnights ? (openBlock(), createBlock("p", {
								key: 0,
								class: "text-xs text-muted"
							}, toDisplayString(item.total_fortnights) + " quincenas ", 1)) : createCommentVNode("", true)])], 8, ["onClick"])])], 8, ["onClick"]);
						}), 128))])),
						unref(meta).last_page > 1 ? (openBlock(), createBlock("div", {
							key: 3,
							class: "flex justify-end px-6 py-3"
						}, [createVNode(_component_UPagination, {
							page: unref(page),
							"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
							total: unref(meta).total,
							"items-per-page": unref(meta).per_page
						}, null, 8, [
							"page",
							"onUpdate:page",
							"total",
							"items-per-page"
						])])) : createCommentVNode("", true)
					], 64))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_VoucherDetailModal, {
				open: unref(isDetailOpen),
				"onUpdate:open": ($event) => isRef(isDetailOpen) ? isDetailOpen.value = $event : null,
				voucher: unref(selectedVoucher)
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/vouchers.vue
var _sfc_setup = vouchers_vue_vue_type_script_setup_true_lang_default.setup;
vouchers_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/vouchers.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var vouchers_default = vouchers_vue_vue_type_script_setup_true_lang_default;

export { vouchers_default as default };
//# sourceMappingURL=vouchers-C3SyclbC.mjs.map
