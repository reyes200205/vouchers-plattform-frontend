import { aM as useToast, aj as useAuth, ai as useAsyncData, g as _sfc_main$2$1, h as _sfc_main$7 } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Select-QzRNfVS-.mjs';
import { _ as _sfc_main$1 } from './DropdownMenu-pA38i_hv.mjs';
import { _ as _sfc_main$3 } from './Pagination-D8tenX5M.mjs';
import { _ as _sfc_main } from './Badge-B12zNpDE.mjs';
import { _ as _sfc_main$5 } from './Input-3L6phQUN.mjs';
import { u as useProducts } from './useProducts-Dzn1xrF-.mjs';
import { b as _sfc_main$2, a as _sfc_main$1$1, _ as _sfc_main$6 } from './DashboardSidebarCollapse-CLHbm061.mjs';
import { u as useBranches } from './useBranches-CPhggLZ3.mjs';
import { u as useSettings } from './useSettings-CCTMa9PO.mjs';
import { u as useCategories } from './useCategories-p0gLdv-B.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, resolveComponent, withCtx, unref, createVNode, isRef, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import './PopperArrow-Cwqi64q5.mjs';
import './useTypeahead-5rnQiHGw.mjs';
import './useFormControl-BySKHRcT.mjs';
import './namespaced-DaSSdVt2.mjs';
import './useComposing-D1bdBmsI.mjs';
import './Kbd-CHYMLSD7.mjs';
import './RovingFocusGroup-orB_74SG.mjs';
import './DashboardSidebarToggle-IFhAhKZv.mjs';

//#region app/pages/general/products.vue?vue&type=script&setup=true&lang.ts
var products_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "products",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const toast = useToast();
		const { listBranchProducts, updateProduct } = useProducts();
		const { listBranchCategories } = useCategories();
		const { getBranchSettings } = useSettings();
		const { listBranches } = useBranches();
		const { user } = useAuth();
		const canManage = computed(() => user.value?.permissions?.includes("products.manage") ?? false);
		const isGeneralManager = computed(() => user.value?.permissions?.includes("categories.manage") ?? false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("product-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const selectedBranchId = ref(branchManagerBranchId.value ?? branches.value[0]?.id ?? void 0);
		watch([branchManagerBranchId, branches], () => {
			if (!selectedBranchId.value && branchManagerBranchId.value) selectedBranchId.value = branchManagerBranchId.value;
			if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) selectedBranchId.value = branches.value[0].id;
		}, { immediate: true });
		const branchId = computed(() => selectedBranchId.value);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branch-product-categories", () => {
			if (!branchId.value) return Promise.resolve([]);
			return listBranchCategories(branchId.value).then((result) => result.data);
		}, {
			watch: [branchId],
			default: () => []
		})), __temp = await __temp, __restore(), __temp);
		const { data: branchSettings } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("product-branch-settings", async () => {
			if (!branchId.value) return null;
			try {
				return await getBranchSettings(branchId.value);
			} catch {
				return null;
			}
		}, {
			watch: [branchId],
			default: () => null
		})), __temp = await __temp, __restore(), __temp);
		const insuranceTiers = computed(() => branchSettings.value?.insurance_rates ?? null);
		const pointValueMxn = computed(() => branchSettings.value?.point_value_mxn ?? void 0);
		const q = ref("");
		const page = ref(1);
		const { data: productsData, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branch-products", () => {
			if (!branchId.value) return Promise.resolve({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 15,
					total: 0
				}
			});
			return listBranchProducts(branchId.value, { page: page.value });
		}, {
			watch: [page, branchId],
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
		const items = computed(() => productsData.value.data ?? []);
		const meta = computed(() => productsData.value.meta);
		const filteredItems = computed(() => {
			if (!q.value) return items.value;
			const needle = q.value.toLowerCase();
			return items.value.filter((product) => {
				return product.name.toLowerCase().includes(needle) || product.code.toLowerCase().includes(needle);
			});
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN"
		});
		function categoryName(product) {
			return product.category?.name ?? categories.value.find((c) => c.id === product.category_id)?.name ?? "Sin categoría";
		}
		const isEditOpen = ref(false);
		const selectedProduct = ref(null);
		const cloneTemplate = ref(null);
		function openCreate() {
			if (!branchId.value) {
				toast.add({
					title: "Selecciona una sucursal",
					description: "Elige la sucursal antes de crear un nuevo vale.",
					color: "warning"
				});
				return;
			}
			selectedProduct.value = null;
			cloneTemplate.value = null;
			isEditOpen.value = true;
		}
		function openClone(product) {
			selectedProduct.value = null;
			cloneTemplate.value = product;
			isEditOpen.value = true;
		}
		function getProductItems(product) {
			const items = [{
				type: "label",
				label: "Acciones"
			}];
			if (product.origin === "global") items.push({
				label: "Usar en esta sucursal",
				icon: "i-lucide-copy",
				onSelect() {
					openClone(product);
				}
			});
			else if (canManage.value) items.push({
				label: "Editar",
				icon: "i-lucide-pencil",
				onSelect() {
					selectedProduct.value = product;
					isEditOpen.value = true;
				}
			});
			items.push({ type: "separator" }, {
				label: product.is_active ? "Desactivar" : "Activar",
				icon: product.is_active ? "i-lucide-circle-slash" : "i-lucide-circle-check",
				onSelect: async () => {
					if (!branchId.value || product.origin === "global") return;
					try {
						await updateProduct(branchId.value, product.id, { is_active: !product.is_active });
						toast.add({
							title: "Vale actualizado",
							description: `${product.name} fue ${product.is_active ? "desactivado" : "activado"} correctamente`,
							color: "success"
						});
						await refresh();
					} catch {
						toast.add({
							title: "Error",
							description: "No se pudo actualizar el vale.",
							color: "error"
						});
					}
				}
			});
			return items;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$6;
			const _component_USelect = _sfc_main$4;
			const _component_UInput = _sfc_main$5;
			const _component_UButton = _sfc_main$7;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UBadge = _sfc_main;
			const _component_UDropdownMenu = _sfc_main$1;
			const _component_UPagination = _sfc_main$3;
			const _component_ProductModal = resolveComponent("ProductModal");
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "products" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Productos y Vales" }, {
						leading: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_UDashboardSidebarCollapse, null, null, _parent, _scopeId));
							else return [createVNode(_component_UDashboardSidebarCollapse)];
						}),
						right: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (unref(isGeneralManager)) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(selectedBranchId),
									"onUpdate:modelValue": ($event) => isRef(selectedBranchId) ? selectedBranchId.value = $event : null,
									items: unref(branches).map((b) => ({
										label: b.name,
										value: b.id
									})),
									placeholder: "Sucursal...",
									class: "w-64"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar vale...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, _parent, _scopeId));
								if (unref(canManage)) _push(ssrRenderComponent(_component_UButton, {
									label: "Nuevo vale",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [
								unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
									key: 0,
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
								])) : createCommentVNode("", true),
								createVNode(_component_UInput, {
									modelValue: unref(q),
									"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
									placeholder: "Buscar vale...",
									icon: "i-lucide-search",
									class: "w-56"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
									key: 1,
									label: "Nuevo vale",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, 8, ["onClick"])) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Productos y Vales" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [
							unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
								key: 0,
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
							])) : createCommentVNode("", true),
							createVNode(_component_UInput, {
								modelValue: unref(q),
								"onUpdate:modelValue": ($event) => isRef(q) ? q.value = $event : null,
								placeholder: "Buscar vale...",
								icon: "i-lucide-search",
								class: "w-56"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
								key: 1,
								label: "Nuevo vale",
								icon: "i-lucide-plus",
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
						_push(`<p class="text-sm text-muted"${_scopeId}> No se pudieron cargar los vales. </p>`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<div class="flex h-full flex-col overflow-y-auto"${_scopeId}>`);
						if (unref(filteredItems).length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-receipt",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay vales registrados </p>`);
							if (unref(canManage)) _push(`<p class="text-sm text-dimmed"${_scopeId}> Crea el primer vale con el botón &quot;Nuevo vale&quot; </p>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else {
							_push(`<div class="divide-y divide-default"${_scopeId}><!--[-->`);
							ssrRenderList(unref(filteredItems), (product) => {
								_push(`<div class="flex items-center justify-between gap-3 px-6 py-4"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}><div class="flex size-10 items-center justify-center rounded-md bg-elevated"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-ticket",
									class: "size-5 text-highlighted"
								}, null, _parent, _scopeId));
								_push(`</div><div class="min-w-0"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(product.name)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(product.code)}</p></div></div><div class="flex items-center gap-3"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UBadge, {
									variant: "subtle",
									label: categoryName(product)
								}, null, _parent, _scopeId));
								if (product.origin === "global") _push(ssrRenderComponent(_component_UBadge, {
									color: "info",
									variant: "subtle",
									label: "Catálogo general"
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(unref(money).format(Number(product.principal_amount)))}</span><span class="text-sm text-muted"${_scopeId}>${ssrInterpolate(product.number_of_fortnights)} quincenas </span><span class="text-sm text-muted"${_scopeId}> Seguro: ${ssrInterpolate(unref(money).format(Number(product.insurance_amount)))}</span>`);
								if (product.is_active) _push(ssrRenderComponent(_component_UBadge, {
									color: "success",
									variant: "subtle",
									label: "Activo"
								}, null, _parent, _scopeId));
								else _push(ssrRenderComponent(_component_UBadge, {
									color: "error",
									variant: "subtle",
									label: "Inactivo"
								}, null, _parent, _scopeId));
								if (unref(canManage) || product.origin === "global") _push(ssrRenderComponent(_component_UDropdownMenu, { items: getProductItems(product) }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost",
											"aria-label": "Acciones"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: "i-lucide-ellipsis-vertical",
											color: "neutral",
											variant: "ghost",
											"aria-label": "Acciones"
										})];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`</div></div>`);
							});
							_push(`<!--]--></div>`);
						}
						if (unref(meta).last_page > 1) {
							_push(`<div class="flex justify-end px-6 py-3 mt-auto"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UPagination, {
								page: unref(page),
								"onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
								total: unref(meta).total,
								"items-per-page": unref(meta).per_page
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
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
						createVNode("p", { class: "text-sm text-muted" }, " No se pudieron cargar los vales. "),
						createVNode(_component_UButton, {
							label: "Reintentar",
							icon: "i-lucide-refresh-cw",
							color: "primary",
							variant: "solid",
							onClick: ($event) => unref(refresh)()
						}, null, 8, ["onClick"])
					])) : (openBlock(), createBlock("div", {
						key: 2,
						class: "flex h-full flex-col overflow-y-auto"
					}, [unref(filteredItems).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-receipt",
							class: "size-12 text-dimmed"
						}),
						createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay vales registrados "),
						unref(canManage) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-sm text-dimmed"
						}, " Crea el primer vale con el botón \"Nuevo vale\" ")) : createCommentVNode("", true)
					])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(filteredItems), (product) => {
						return openBlock(), createBlock("div", {
							key: product.id,
							class: "flex items-center justify-between gap-3 px-6 py-4"
						}, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode("div", { class: "flex size-10 items-center justify-center rounded-md bg-elevated" }, [createVNode(_component_UIcon, {
							name: "i-lucide-ticket",
							class: "size-5 text-highlighted"
						})]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(product.name), 1), createVNode("p", { class: "text-xs text-muted" }, toDisplayString(product.code), 1)])]), createVNode("div", { class: "flex items-center gap-3" }, [
							createVNode(_component_UBadge, {
								variant: "subtle",
								label: categoryName(product)
							}, null, 8, ["label"]),
							product.origin === "global" ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "info",
								variant: "subtle",
								label: "Catálogo general"
							})) : createCommentVNode("", true),
							createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(unref(money).format(Number(product.principal_amount))), 1),
							createVNode("span", { class: "text-sm text-muted" }, toDisplayString(product.number_of_fortnights) + " quincenas ", 1),
							createVNode("span", { class: "text-sm text-muted" }, " Seguro: " + toDisplayString(unref(money).format(Number(product.insurance_amount))), 1),
							product.is_active ? (openBlock(), createBlock(_component_UBadge, {
								key: 1,
								color: "success",
								variant: "subtle",
								label: "Activo"
							})) : (openBlock(), createBlock(_component_UBadge, {
								key: 2,
								color: "error",
								variant: "subtle",
								label: "Inactivo"
							})),
							unref(canManage) || product.origin === "global" ? (openBlock(), createBlock(_component_UDropdownMenu, {
								key: 3,
								items: getProductItems(product)
							}, {
								default: withCtx(() => [createVNode(_component_UButton, {
									icon: "i-lucide-ellipsis-vertical",
									color: "neutral",
									variant: "ghost",
									"aria-label": "Acciones"
								})]),
								_: 1
							}, 8, ["items"])) : createCommentVNode("", true)
						])]);
					}), 128))])), unref(meta).last_page > 1 ? (openBlock(), createBlock("div", {
						key: 2,
						class: "flex justify-end px-6 py-3 mt-auto"
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
					])])) : createCommentVNode("", true)]))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_ProductModal, {
				open: unref(isEditOpen),
				"onUpdate:open": ($event) => isRef(isEditOpen) ? isEditOpen.value = $event : null,
				product: unref(selectedProduct),
				"clone-template": unref(cloneTemplate),
				categories: unref(categories),
				"branch-id": unref(branchId),
				"insurance-tiers": unref(insuranceTiers),
				"point-value-mxn": unref(pointValueMxn),
				onCreated: ($event) => unref(refresh)(),
				onUpdated: ($event) => unref(refresh)()
			}, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/products.vue
var _sfc_setup = products_vue_vue_type_script_setup_true_lang_default.setup;
products_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/products.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var products_default = products_vue_vue_type_script_setup_true_lang_default;

export { products_default as default };
//# sourceMappingURL=products-BrLFqkSv.mjs.map
