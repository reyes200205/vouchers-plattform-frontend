import { ak as useAsyncData, j as _sfc_main$2, al as useAuth, $ as $fetch$2, aP as useToast, f as _sfc_main$9, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _sfc_main$a } from './FormField-BitybEBm.mjs';
import { _ as _sfc_main$4 } from './Pagination-t-IQpbak.mjs';
import { _ as _sfc_main$8 } from './Modal-C3ktQuxc.mjs';
import { _ as _sfc_main$7 } from './Badge-BBG1L7MO.mjs';
import { _ as _sfc_main } from './Input-BC1I0LeZ.mjs';
import { e as extractApiErrorMessage } from './utils-BYhQum64.mjs';
import { a as _sfc_main$1, _ as _sfc_main$5 } from './DashboardNavbar-BUcs0a3E.mjs';
import { _ as _sfc_main$6 } from './DashboardSidebarCollapse-Dp2MXVqm.mjs';
import { _ as _sfc_main$3 } from './Table-DZoThN5y.mjs';
import { defineComponent, ref, watch, withAsyncContext, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, createCommentVNode, h, isRef, withKeys, toDisplayString, useSSRContext } from 'vue';
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
import './overlay-C4SiqibN.mjs';
import './DashboardSidebarToggle-BIlVm3ff.mjs';
import './esm-CcArdB_U.mjs';
import '@tanstack/table-core';

//#region app/composables/usePointRedemptionPayouts.ts
function usePointRedemptionPayouts() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function lookupByFolio(folio) {
		return (await $fetch$2(`${config.public.apiBase}/point-redemptions/lookup/${folio}`, { headers: authHeaders() })).data;
	}
	async function payout(folio) {
		return (await $fetch$2(`${config.public.apiBase}/point-redemptions/lookup/${folio}/payout`, {
			method: "POST",
			headers: authHeaders()
		})).data;
	}
	async function listRedemptions(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/point-redemptions`, {
			headers: authHeaders(),
			query: {
				status: params.status,
				distributor_number: params.distributor_number || void 0,
				page: params.page,
				per_page: params.per_page ?? 15
			}
		})).data;
	}
	return {
		lookupByFolio,
		payout,
		listRedemptions
	};
}
//#endregion
//#region app/components/points/PayoutByFolioModal.vue?vue&type=script&setup=true&lang.ts
var PayoutByFolioModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PayoutByFolioModal",
	__ssrInlineRender: true,
	emits: ["paid"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { lookupByFolio, payout } = usePointRedemptionPayouts();
		const toast = useToast();
		const open = ref(false);
		const folio = ref("");
		const searching = ref(false);
		const paying = ref(false);
		const searchError = ref(null);
		const redemption = ref(null);
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		const statusColors = {
			PENDIENTE: "warning",
			APROBADO: "success",
			RECHAZADO: "error",
			CANCELADO: "neutral"
		};
		watch(open, (isOpen) => {
			if (isOpen) {
				folio.value = "";
				searchError.value = null;
				redemption.value = null;
			}
		});
		async function buscarFolio() {
			if (!folio.value.trim()) return;
			searching.value = true;
			searchError.value = null;
			redemption.value = null;
			try {
				redemption.value = await lookupByFolio(folio.value.trim());
			} catch (e) {
				searchError.value = extractApiErrorMessage(e, "No se encontró ese folio en tu sucursal.");
			} finally {
				searching.value = false;
			}
		}
		async function confirmarPago() {
			if (!redemption.value) return;
			paying.value = true;
			try {
				redemption.value = await payout(redemption.value.folio);
				toast.add({
					title: "Canje pagado",
					description: `Se entregaron ${money.format(Number(redemption.value.amount_mxn))} a la distribuidora.`,
					color: "success"
				});
				emit("paid");
				open.value = false;
			} catch (e) {
				toast.add({
					title: "Error",
					description: extractApiErrorMessage(e, "No se pudo confirmar el pago. Intenta de nuevo."),
					color: "error"
				});
			} finally {
				paying.value = false;
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UModal = _sfc_main$8;
			const _component_UButton = _sfc_main$9;
			const _component_UFormField = _sfc_main$a;
			const _component_UInput = _sfc_main;
			const _component_UBadge = _sfc_main$7;
			_push(ssrRenderComponent(_component_UModal, mergeProps({
				open: unref(open),
				"onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
				title: "Pagar canje de puntos",
				description: "Pide a la distribuidora el folio que le apareció al solicitar su canje de puntos."
			}, _attrs), {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormField, { label: "Folio" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex gap-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UInput, {
										modelValue: unref(folio),
										"onUpdate:modelValue": ($event) => isRef(folio) ? folio.value = $event : null,
										placeholder: "CANJE-00000001",
										class: "flex-1",
										onKeyup: buscarFolio
									}, null, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UButton, {
										label: "Buscar",
										icon: "i-lucide-search",
										loading: unref(searching),
										onClick: buscarFolio
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UInput, {
									modelValue: unref(folio),
									"onUpdate:modelValue": ($event) => isRef(folio) ? folio.value = $event : null,
									placeholder: "CANJE-00000001",
									class: "flex-1",
									onKeyup: withKeys(buscarFolio, ["enter"])
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UButton, {
									label: "Buscar",
									icon: "i-lucide-search",
									loading: unref(searching),
									onClick: buscarFolio
								}, null, 8, ["loading"])])];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(searchError)) _push(`<p class="text-sm text-error"${_scopeId}>${ssrInterpolate(unref(searchError))}</p>`);
						else _push(`<!---->`);
						if (unref(redemption)) {
							_push(`<div class="flex flex-col gap-3 rounded-lg border border-default p-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-sm text-muted"${_scopeId}>Distribuidora</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(redemption).distributor?.distributor_number ?? `#${unref(redemption).distributor_id}`)}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-sm text-muted"${_scopeId}>Puntos</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(redemption).points)}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-sm text-muted"${_scopeId}>Monto a entregar</span><span class="font-semibold"${_scopeId}>${ssrInterpolate(unref(money).format(Number(unref(redemption).amount_mxn)))}</span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-sm text-muted"${_scopeId}>Estado</span>`);
							_push(ssrRenderComponent(_component_UBadge, {
								color: statusColors[unref(redemption).status] ?? "neutral",
								variant: "subtle",
								label: unref(redemption).status
							}, null, _parent, _scopeId));
							_push(`</div>`);
							if (unref(redemption).status === "PENDIENTE") _push(ssrRenderComponent(_component_UButton, {
								label: "Confirmar y pagar",
								icon: "i-lucide-check",
								color: "primary",
								block: "",
								loading: unref(paying),
								onClick: confirmarPago
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col gap-4" }, [
						createVNode(_component_UFormField, { label: "Folio" }, {
							default: withCtx(() => [createVNode("div", { class: "flex gap-2" }, [createVNode(_component_UInput, {
								modelValue: unref(folio),
								"onUpdate:modelValue": ($event) => isRef(folio) ? folio.value = $event : null,
								placeholder: "CANJE-00000001",
								class: "flex-1",
								onKeyup: withKeys(buscarFolio, ["enter"])
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UButton, {
								label: "Buscar",
								icon: "i-lucide-search",
								loading: unref(searching),
								onClick: buscarFolio
							}, null, 8, ["loading"])])]),
							_: 1
						}),
						unref(searchError) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-sm text-error"
						}, toDisplayString(unref(searchError)), 1)) : createCommentVNode("", true),
						unref(redemption) ? (openBlock(), createBlock("div", {
							key: 1,
							class: "flex flex-col gap-3 rounded-lg border border-default p-4"
						}, [
							createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-sm text-muted" }, "Distribuidora"), createVNode("span", { class: "font-medium" }, toDisplayString(unref(redemption).distributor?.distributor_number ?? `#${unref(redemption).distributor_id}`), 1)]),
							createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-sm text-muted" }, "Puntos"), createVNode("span", { class: "font-medium" }, toDisplayString(unref(redemption).points), 1)]),
							createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-sm text-muted" }, "Monto a entregar"), createVNode("span", { class: "font-semibold" }, toDisplayString(unref(money).format(Number(unref(redemption).amount_mxn))), 1)]),
							createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-sm text-muted" }, "Estado"), createVNode(_component_UBadge, {
								color: statusColors[unref(redemption).status] ?? "neutral",
								variant: "subtle",
								label: unref(redemption).status
							}, null, 8, ["color", "label"])]),
							unref(redemption).status === "PENDIENTE" ? (openBlock(), createBlock(_component_UButton, {
								key: 0,
								label: "Confirmar y pagar",
								icon: "i-lucide-check",
								color: "primary",
								block: "",
								loading: unref(paying),
								onClick: confirmarPago
							}, null, 8, ["loading"])) : createCommentVNode("", true)
						])) : createCommentVNode("", true)
					])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						label: "Pagar canje por folio",
						icon: "i-lucide-ticket",
						color: "primary"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						label: "Pagar canje por folio",
						icon: "i-lucide-ticket",
						color: "primary"
					})];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region app/components/points/PayoutByFolioModal.vue
var _sfc_setup$1 = PayoutByFolioModal_vue_vue_type_script_setup_true_lang_default.setup;
PayoutByFolioModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/points/PayoutByFolioModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var PayoutByFolioModal_default = Object.assign(PayoutByFolioModal_vue_vue_type_script_setup_true_lang_default, { __name: "PointsPayoutByFolioModal" });
//#endregion
//#region app/pages/general/point-redemptions-payout.vue?vue&type=script&setup=true&lang.ts
var point_redemptions_payout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "point-redemptions-payout",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { listRedemptions } = usePointRedemptionPayouts();
		const distributorNumber = ref("");
		const page = ref(1);
		watch(distributorNumber, () => {
			page.value = 1;
		});
		const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("point-redemptions-paid", () => listRedemptions({
			status: "APROBADO",
			distributor_number: distributorNumber.value || void 0,
			page: page.value
		}), {
			watch: [distributorNumber, page],
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
		const items = computed(() => data.value?.data ?? []);
		const meta = computed(() => data.value?.meta ?? {
			current_page: 1,
			last_page: 1,
			per_page: 15,
			total: 0
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		const columns = [
			{
				accessorKey: "folio",
				header: "Folio",
				cell: ({ row }) => h("code", { class: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono" }, row.original.folio ?? "—")
			},
			{
				accessorKey: "distributor",
				header: "Distribuidora",
				cell: ({ row }) => row.original.distributor?.distributor_number ?? `#${row.original.distributor_id}`
			},
			{
				accessorKey: "points",
				header: "Puntos canjeados"
			},
			{
				accessorKey: "amount_mxn",
				header: "Monto entregado",
				cell: ({ row }) => money.format(Number(row.original.amount_mxn))
			},
			{
				accessorKey: "status",
				header: "Estado",
				cell: ({ row }) => h(_sfc_main$7, {
					variant: "subtle",
					color: "success"
				}, () => row.original.status)
			},
			{
				accessorKey: "decided_at",
				header: "Fecha de pago",
				cell: ({ row }) => row.original.decided_at ? new Date(row.original.decided_at).toLocaleString("es-MX") : "—"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$1;
			const _component_UDashboardNavbar = _sfc_main$5;
			const _component_UDashboardSidebarCollapse = _sfc_main$6;
			const _component_PointsPayoutByFolioModal = PayoutByFolioModal_default;
			const _component_UInput = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UTable = _sfc_main$3;
			const _component_UPagination = _sfc_main$4;
			_push(ssrRenderComponent(_component_UDashboardPanel, mergeProps({ id: "point-redemptions-payout" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Canje de puntos" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_PointsPayoutByFolioModal, { onPaid: ($event) => unref(refresh)() }, null, _parent, _scopeId));
							else return [createVNode(_component_PointsPayoutByFolioModal, { onPaid: ($event) => unref(refresh)() }, null, 8, ["onPaid"])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Canje de puntos" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [createVNode(_component_PointsPayoutByFolioModal, { onPaid: ($event) => unref(refresh)() }, null, 8, ["onPaid"])]),
						_: 1
					})];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mb-4 flex flex-wrap items-center justify-between gap-1.5"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: distributorNumber.value,
							"onUpdate:modelValue": ($event) => distributorNumber.value = $event,
							class: "max-w-sm w-full",
							icon: "i-lucide-search",
							placeholder: "Filtrar por número de distribuidora..."
						}, null, _parent, _scopeId));
						_push(`</div>`);
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
								name: "i-lucide-ticket",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay canjes de puntos pagados todavía </p></div>`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(_component_UTable, {
								data: items.value,
								columns,
								loading: unref(status) === "pending",
								class: "shrink-0",
								ui: {
									base: "table-fixed border-separate border-spacing-0",
									thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
									tbody: "[&>tr]:last:[&>td]:border-b-0",
									th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
									td: "border-b border-default",
									separator: "h-0"
								}
							}, null, _parent, _scopeId));
							if (meta.value.last_page > 1) {
								_push(`<div class="flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UPagination, {
									page: page.value,
									"onUpdate:page": ($event) => page.value = $event,
									total: meta.value.total,
									"items-per-page": meta.value.per_page
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`<!--]-->`);
						}
					} else return [createVNode("div", { class: "mb-4 flex flex-wrap items-center justify-between gap-1.5" }, [createVNode(_component_UInput, {
						modelValue: distributorNumber.value,
						"onUpdate:modelValue": ($event) => distributorNumber.value = $event,
						class: "max-w-sm w-full",
						icon: "i-lucide-search",
						placeholder: "Filtrar por número de distribuidora..."
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]), unref(status) === "pending" && items.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : items.value.length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-ticket",
						class: "size-12 text-dimmed"
					}), createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay canjes de puntos pagados todavía ")])) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode(_component_UTable, {
						data: items.value,
						columns,
						loading: unref(status) === "pending",
						class: "shrink-0",
						ui: {
							base: "table-fixed border-separate border-spacing-0",
							thead: "[&>tr]:bg-elevated/50 [&>tr]:after:content-none",
							tbody: "[&>tr]:last:[&>td]:border-b-0",
							th: "py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r",
							td: "border-b border-default",
							separator: "h-0"
						}
					}, null, 8, ["data", "loading"]), meta.value.last_page > 1 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-end gap-3 border-t border-default pt-4 mt-auto"
					}, [createVNode(_component_UPagination, {
						page: page.value,
						"onUpdate:page": ($event) => page.value = $event,
						total: meta.value.total,
						"items-per-page": meta.value.per_page
					}, null, 8, [
						"page",
						"onUpdate:page",
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
//#region app/pages/general/point-redemptions-payout.vue
var _sfc_setup = point_redemptions_payout_vue_vue_type_script_setup_true_lang_default.setup;
point_redemptions_payout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/point-redemptions-payout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var point_redemptions_payout_default = point_redemptions_payout_vue_vue_type_script_setup_true_lang_default;

export { point_redemptions_payout_default as default };
//# sourceMappingURL=point-redemptions-payout-BymzPegE.mjs.map
