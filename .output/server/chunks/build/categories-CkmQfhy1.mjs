import { aM as useToast, aj as useAuth, ai as useAsyncData, g as _sfc_main$2$1, h as _sfc_main$7 } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Select-QzRNfVS-.mjs';
import { _ as _sfc_main$8 } from './FormField-DOShaxcI.mjs';
import { _ as _sfc_main$5 } from './Modal-C4TqBAm1.mjs';
import { _ as _sfc_main } from './Badge-B12zNpDE.mjs';
import { _ as _sfc_main$9 } from './Input-3L6phQUN.mjs';
import { b as _sfc_main$2, a as _sfc_main$1, _ as _sfc_main$4 } from './DashboardSidebarCollapse-CLHbm061.mjs';
import { _ as _sfc_main$6 } from './Form-DpngGyYw.mjs';
import { u as useBranches } from './useBranches-CPhggLZ3.mjs';
import { u as useCategories } from './useCategories-p0gLdv-B.mjs';
import { defineComponent, computed, withAsyncContext, ref, watch, reactive, resolveComponent, withCtx, unref, openBlock, createBlock, createVNode, createCommentVNode, Fragment, renderList, toDisplayString, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import * as z from 'zod';
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
import './DialogTrigger-DWu9hrsX.mjs';
import './overlay-BtFRc-iG.mjs';
import './DashboardSidebarToggle-IFhAhKZv.mjs';

//#region app/pages/general/categories.vue?vue&type=script&setup=true&lang.ts
var categories_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "categories",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const toast = useToast();
		const { user } = useAuth();
		const { listBranchCategories, createCategory, updateCategory, moveCategory } = useCategories();
		const { listBranches } = useBranches();
		const canManage = computed(() => user.value?.permissions?.includes("categories.manage") ?? false);
		const isGeneralManager = computed(() => user.value?.permissions?.includes("branches.manage") ?? false);
		const branchManagerBranchId = computed(() => {
			return user.value?.roles?.find((r) => r.code === "branch_manager" && r.branch_id !== null)?.branch_id ?? null;
		});
		const { data: branches } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("categories-branches", () => listBranches(), { default: () => [] })), __temp = await __temp, __restore(), __temp);
		const selectedBranchId = ref(branchManagerBranchId.value ?? branches.value[0]?.id ?? void 0);
		watch([branchManagerBranchId, branches], () => {
			if (!selectedBranchId.value && branchManagerBranchId.value) selectedBranchId.value = branchManagerBranchId.value;
			if (!selectedBranchId.value && !branchManagerBranchId.value && branches.value[0]) selectedBranchId.value = branches.value[0].id;
		}, { immediate: true });
		const { data: categories, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("branch-categories", () => {
			if (!selectedBranchId.value) return Promise.resolve({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 50,
					total: 0
				}
			});
			return listBranchCategories(selectedBranchId.value);
		}, {
			watch: [selectedBranchId],
			default: () => ({
				data: [],
				meta: {
					current_page: 1,
					last_page: 1,
					per_page: 50,
					total: 0
				}
			})
		})), __temp = await __temp, __restore(), __temp);
		const schema = z.object({
			code: z.string().min(2, "Muy corto").max(30, "Muy largo"),
			name: z.string().min(2, "Muy corto").max(100, "Muy largo"),
			commission_percentage: z.coerce.number().min(0, "Mínimo 0").max(100, "Máximo 100"),
			is_active: z.boolean()
		});
		const state = reactive({
			code: "",
			name: "",
			commission_percentage: "",
			is_active: true
		});
		const isEditOpen = ref(false);
		const selectedCategory = ref(null);
		const isMoveOpen = ref(false);
		const moveTarget = ref(void 0);
		const moving = ref(false);
		const categoryToMove = ref(null);
		function openMove(category) {
			categoryToMove.value = category;
			moveTarget.value = branches.value.find((b) => b.id !== selectedBranchId.value)?.id;
			isMoveOpen.value = true;
		}
		async function confirmMove() {
			if (!categoryToMove.value || !moveTarget.value) return;
			moving.value = true;
			try {
				await moveCategory(categoryToMove.value.id, moveTarget.value);
				toast.add({
					title: "Categoría movida",
					description: `${categoryToMove.value.name} fue movida a otra sucursal`,
					color: "success"
				});
				isMoveOpen.value = false;
				await refresh();
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo mover la categoría. Verifica que no exista otra con el mismo código o nombre.",
					color: "error"
				});
			} finally {
				moving.value = false;
			}
		}
		function openCreate() {
			selectedCategory.value = null;
			state.code = "";
			state.name = "";
			state.commission_percentage = "";
			state.is_active = true;
			isEditOpen.value = true;
		}
		function openEdit(category) {
			selectedCategory.value = category;
			state.code = category.code;
			state.name = category.name;
			state.commission_percentage = String(Number(category.commission_percentage));
			state.is_active = category.is_active;
			isEditOpen.value = true;
		}
		async function onSubmit(event) {
			if (!selectedBranchId.value) return;
			try {
				const payload = {
					code: event.data.code,
					name: event.data.name,
					commission_percentage: event.data.commission_percentage.toFixed(4),
					is_active: event.data.is_active
				};
				if (selectedCategory.value) {
					await updateCategory(selectedBranchId.value, selectedCategory.value.id, payload);
					toast.add({
						title: "Categoría actualizada",
						description: `${event.data.name} fue actualizada correctamente`,
						color: "success"
					});
				} else {
					await createCategory(selectedBranchId.value, payload);
					toast.add({
						title: "Categoría creada",
						description: `${event.data.name} fue creada correctamente`,
						color: "success"
					});
				}
				isEditOpen.value = false;
				await refresh();
			} catch {
				toast.add({
					title: "Error",
					description: "No se pudo guardar la categoría. Verifica que el código y nombre no existan en la sucursal.",
					color: "error"
				});
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDashboardPanel = _sfc_main$2;
			const _component_UDashboardNavbar = _sfc_main$1;
			const _component_UDashboardSidebarCollapse = _sfc_main$4;
			const _component_USelect = _sfc_main$3;
			const _component_UButton = _sfc_main$7;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UBadge = _sfc_main;
			const _component_UModal = _sfc_main$5;
			const _component_UForm = _sfc_main$6;
			const _component_UFormField = _sfc_main$8;
			const _component_UInput = _sfc_main$9;
			const _component_UToggle = resolveComponent("UToggle");
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_UDashboardPanel, { id: "categories" }, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UDashboardNavbar, { title: "Categorías de distribuidora" }, {
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
								if (unref(canManage)) _push(ssrRenderComponent(_component_UButton, {
									label: "Nueva categoría",
									icon: "i-lucide-plus",
									color: "primary",
									variant: "solid",
									onClick: ($event) => openCreate()
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
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
							])) : createCommentVNode("", true), unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
								key: 1,
								label: "Nueva categoría",
								icon: "i-lucide-plus",
								color: "primary",
								variant: "solid",
								onClick: ($event) => openCreate()
							}, null, 8, ["onClick"])) : createCommentVNode("", true)];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UDashboardNavbar, { title: "Categorías de distribuidora" }, {
						leading: withCtx(() => [createVNode(_component_UDashboardSidebarCollapse)]),
						right: withCtx(() => [unref(isGeneralManager) ? (openBlock(), createBlock(_component_USelect, {
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
						])) : createCommentVNode("", true), unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
							key: 1,
							label: "Nueva categoría",
							icon: "i-lucide-plus",
							color: "primary",
							variant: "solid",
							onClick: ($event) => openCreate()
						}, null, 8, ["onClick"])) : createCommentVNode("", true)]),
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
					} else {
						_push(`<div class="flex h-full flex-col overflow-y-auto"${_scopeId}>`);
						if (unref(categories).data.length === 0) {
							_push(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-layers",
								class: "size-12 text-dimmed"
							}, null, _parent, _scopeId));
							_push(`<p class="mt-2 text-sm text-muted"${_scopeId}> No hay categorías para esta sucursal </p>`);
							if (unref(canManage)) _push(`<p class="text-sm text-dimmed"${_scopeId}> Crea la primera con el botón &quot;Nueva categoría&quot; </p>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else {
							_push(`<div class="divide-y divide-default"${_scopeId}><!--[-->`);
							ssrRenderList(unref(categories).data, (category) => {
								_push(`<div class="flex items-center justify-between gap-3 px-6 py-4"${_scopeId}><div class="flex min-w-0 items-center gap-3"${_scopeId}><div class="flex size-10 items-center justify-center rounded-md bg-elevated"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-medal",
									class: "size-5 text-highlighted"
								}, null, _parent, _scopeId));
								_push(`</div><div class="min-w-0"${_scopeId}><p class="truncate font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(category.name)}</p><p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(category.code)}</p></div></div><div class="flex items-center gap-3 text-sm"${_scopeId}><span class="text-muted"${_scopeId}> Comisión <span class="font-semibold text-highlighted"${_scopeId}>${ssrInterpolate(category.commission_percentage)}%</span></span>`);
								if (category.is_active) _push(ssrRenderComponent(_component_UBadge, {
									color: "success",
									variant: "subtle",
									label: "Activa"
								}, null, _parent, _scopeId));
								else _push(ssrRenderComponent(_component_UBadge, {
									color: "error",
									variant: "subtle",
									label: "Inactiva"
								}, null, _parent, _scopeId));
								if (unref(canManage)) _push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-pencil",
									color: "neutral",
									variant: "ghost",
									"aria-label": "Editar",
									onClick: ($event) => openEdit(category)
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								if (unref(isGeneralManager)) _push(ssrRenderComponent(_component_UButton, {
									icon: "i-lucide-move",
									color: "neutral",
									variant: "ghost",
									"aria-label": "Mover a otra sucursal",
									onClick: ($event) => openMove(category)
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`</div></div>`);
							});
							_push(`<!--]--></div>`);
						}
						_push(`</div>`);
					}
					else return [unref(status) === "pending" ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex items-center justify-center py-16"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-loader-circle",
						class: "size-8 animate-spin text-muted"
					})])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "flex h-full flex-col overflow-y-auto"
					}, [unref(categories).data.length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "flex flex-col items-center justify-center py-16 text-center"
					}, [
						createVNode(_component_UIcon, {
							name: "i-lucide-layers",
							class: "size-12 text-dimmed"
						}),
						createVNode("p", { class: "mt-2 text-sm text-muted" }, " No hay categorías para esta sucursal "),
						unref(canManage) ? (openBlock(), createBlock("p", {
							key: 0,
							class: "text-sm text-dimmed"
						}, " Crea la primera con el botón \"Nueva categoría\" ")) : createCommentVNode("", true)
					])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "divide-y divide-default"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(unref(categories).data, (category) => {
						return openBlock(), createBlock("div", {
							key: category.id,
							class: "flex items-center justify-between gap-3 px-6 py-4"
						}, [createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [createVNode("div", { class: "flex size-10 items-center justify-center rounded-md bg-elevated" }, [createVNode(_component_UIcon, {
							name: "i-lucide-medal",
							class: "size-5 text-highlighted"
						})]), createVNode("div", { class: "min-w-0" }, [createVNode("p", { class: "truncate font-semibold text-highlighted" }, toDisplayString(category.name), 1), createVNode("p", { class: "text-xs text-muted" }, toDisplayString(category.code), 1)])]), createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
							createVNode("span", { class: "text-muted" }, [createTextVNode(" Comisión "), createVNode("span", { class: "font-semibold text-highlighted" }, toDisplayString(category.commission_percentage) + "%", 1)]),
							category.is_active ? (openBlock(), createBlock(_component_UBadge, {
								key: 0,
								color: "success",
								variant: "subtle",
								label: "Activa"
							})) : (openBlock(), createBlock(_component_UBadge, {
								key: 1,
								color: "error",
								variant: "subtle",
								label: "Inactiva"
							})),
							unref(canManage) ? (openBlock(), createBlock(_component_UButton, {
								key: 2,
								icon: "i-lucide-pencil",
								color: "neutral",
								variant: "ghost",
								"aria-label": "Editar",
								onClick: ($event) => openEdit(category)
							}, null, 8, ["onClick"])) : createCommentVNode("", true),
							unref(isGeneralManager) ? (openBlock(), createBlock(_component_UButton, {
								key: 3,
								icon: "i-lucide-move",
								color: "neutral",
								variant: "ghost",
								"aria-label": "Mover a otra sucursal",
								onClick: ($event) => openMove(category)
							}, null, 8, ["onClick"])) : createCommentVNode("", true)
						])]);
					}), 128))]))]))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(isEditOpen),
				"onUpdate:open": ($event) => isRef(isEditOpen) ? isEditOpen.value = $event : null,
				title: unref(selectedCategory) ? "Editar categoría" : "Nueva categoría",
				description: unref(selectedCategory) ? `Actualizar ${unref(selectedCategory).name}` : "Define la comisión de la categoría"
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UForm, {
						schema: unref(schema),
						state: unref(state),
						class: "space-y-4",
						onSubmit
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Código",
									name: "code"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).code,
											"onUpdate:modelValue": ($event) => unref(state).code = $event,
											class: "w-full",
											uppercase: "",
											placeholder: "Ej. COBRE"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).code,
											"onUpdate:modelValue": ($event) => unref(state).code = $event,
											class: "w-full",
											uppercase: "",
											placeholder: "Ej. COBRE"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Nombre",
									name: "name"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full",
											placeholder: "Ej. Cobre"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).name,
											"onUpdate:modelValue": ($event) => unref(state).name = $event,
											class: "w-full",
											placeholder: "Ej. Cobre"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div>`);
								_push(ssrRenderComponent(_component_UFormField, {
									required: "",
									label: "Comisión distribuidora (%)",
									name: "commission_percentage"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UInput, {
											modelValue: unref(state).commission_percentage,
											"onUpdate:modelValue": ($event) => unref(state).commission_percentage = $event,
											type: "number",
											min: "0",
											max: "100",
											step: "0.01",
											class: "w-full"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UInput, {
											modelValue: unref(state).commission_percentage,
											"onUpdate:modelValue": ($event) => unref(state).commission_percentage = $event,
											type: "number",
											min: "0",
											max: "100",
											step: "0.01",
											class: "w-full"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								if (unref(selectedCategory)) _push(ssrRenderComponent(_component_UFormField, {
									label: "Activa",
									name: "is_active"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UToggle, {
											modelValue: unref(state).is_active,
											"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
											"aria-label": "Activa"
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UToggle, {
											modelValue: unref(state).is_active,
											"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
											"aria-label": "Activa"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => isEditOpen.value = false
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									label: unref(selectedCategory) ? "Guardar" : "Crear",
									color: "primary",
									variant: "solid",
									type: "submit"
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else return [
								createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
									required: "",
									label: "Código",
									name: "code"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).code,
										"onUpdate:modelValue": ($event) => unref(state).code = $event,
										class: "w-full",
										uppercase: "",
										placeholder: "Ej. COBRE"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}), createVNode(_component_UFormField, {
									required: "",
									label: "Nombre",
									name: "name"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).name,
										"onUpdate:modelValue": ($event) => unref(state).name = $event,
										class: "w-full",
										placeholder: "Ej. Cobre"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})]),
								createVNode(_component_UFormField, {
									required: "",
									label: "Comisión distribuidora (%)",
									name: "commission_percentage"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(state).commission_percentage,
										"onUpdate:modelValue": ($event) => unref(state).commission_percentage = $event,
										type: "number",
										min: "0",
										max: "100",
										step: "0.01",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								unref(selectedCategory) ? (openBlock(), createBlock(_component_UFormField, {
									key: 0,
									label: "Activa",
									name: "is_active"
								}, {
									default: withCtx(() => [createVNode(_component_UToggle, {
										modelValue: unref(state).is_active,
										"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
										"aria-label": "Activa"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})) : createCommentVNode("", true),
								createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
									label: "Cancelar",
									color: "neutral",
									variant: "subtle",
									onClick: ($event) => isEditOpen.value = false
								}, null, 8, ["onClick"]), createVNode(_component_UButton, {
									label: unref(selectedCategory) ? "Guardar" : "Crear",
									color: "primary",
									variant: "solid",
									type: "submit"
								}, null, 8, ["label"])])
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
							createVNode("div", { class: "grid grid-cols-2 gap-4" }, [createVNode(_component_UFormField, {
								required: "",
								label: "Código",
								name: "code"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).code,
									"onUpdate:modelValue": ($event) => unref(state).code = $event,
									class: "w-full",
									uppercase: "",
									placeholder: "Ej. COBRE"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}), createVNode(_component_UFormField, {
								required: "",
								label: "Nombre",
								name: "name"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).name,
									"onUpdate:modelValue": ($event) => unref(state).name = $event,
									class: "w-full",
									placeholder: "Ej. Cobre"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})]),
							createVNode(_component_UFormField, {
								required: "",
								label: "Comisión distribuidora (%)",
								name: "commission_percentage"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(state).commission_percentage,
									"onUpdate:modelValue": ($event) => unref(state).commission_percentage = $event,
									type: "number",
									min: "0",
									max: "100",
									step: "0.01",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							unref(selectedCategory) ? (openBlock(), createBlock(_component_UFormField, {
								key: 0,
								label: "Activa",
								name: "is_active"
							}, {
								default: withCtx(() => [createVNode(_component_UToggle, {
									modelValue: unref(state).is_active,
									"onUpdate:modelValue": ($event) => unref(state).is_active = $event,
									"aria-label": "Activa"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
								label: "Cancelar",
								color: "neutral",
								variant: "subtle",
								onClick: ($event) => isEditOpen.value = false
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								label: unref(selectedCategory) ? "Guardar" : "Crear",
								color: "primary",
								variant: "solid",
								type: "submit"
							}, null, 8, ["label"])])
						]),
						_: 1
					}, 8, ["schema", "state"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_UModal, {
				open: unref(isMoveOpen),
				"onUpdate:open": ($event) => isRef(isMoveOpen) ? isMoveOpen.value = $event : null,
				title: "Mover categoría a otra sucursal",
				description: unref(categoryToMove) ? `La categoría ${unref(categoryToMove).name} (${unref(categoryToMove).code}) se moverá a la sucursal seleccionada. Las distribuidoras de la sucursal anterior conservarán la referencia.` : ""
			}, {
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormField, {
							label: "Sucursal destino",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(moveTarget),
									"onUpdate:modelValue": ($event) => isRef(moveTarget) ? moveTarget.value = $event : null,
									items: unref(branches).filter((b) => b.id !== unref(selectedBranchId)).map((b) => ({
										label: b.name,
										value: b.id
									})),
									placeholder: "Seleccionar sucursal...",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(moveTarget),
									"onUpdate:modelValue": ($event) => isRef(moveTarget) ? moveTarget.value = $event : null,
									items: unref(branches).filter((b) => b.id !== unref(selectedBranchId)).map((b) => ({
										label: b.name,
										value: b.id
									})),
									placeholder: "Seleccionar sucursal...",
									class: "w-full"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="flex justify-end gap-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							label: "Cancelar",
							color: "neutral",
							variant: "subtle",
							onClick: ($event) => isMoveOpen.value = false
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							label: "Mover",
							color: "primary",
							variant: "solid",
							loading: unref(moving),
							disabled: !unref(moveTarget),
							onClick: ($event) => confirmMove()
						}, null, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "space-y-4" }, [createVNode(_component_UFormField, {
						label: "Sucursal destino",
						required: ""
					}, {
						default: withCtx(() => [createVNode(_component_USelect, {
							modelValue: unref(moveTarget),
							"onUpdate:modelValue": ($event) => isRef(moveTarget) ? moveTarget.value = $event : null,
							items: unref(branches).filter((b) => b.id !== unref(selectedBranchId)).map((b) => ({
								label: b.name,
								value: b.id
							})),
							placeholder: "Seleccionar sucursal...",
							class: "w-full"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])]),
						_: 1
					}), createVNode("div", { class: "flex justify-end gap-2" }, [createVNode(_component_UButton, {
						label: "Cancelar",
						color: "neutral",
						variant: "subtle",
						onClick: ($event) => isMoveOpen.value = false
					}, null, 8, ["onClick"]), createVNode(_component_UButton, {
						label: "Mover",
						color: "primary",
						variant: "solid",
						loading: unref(moving),
						disabled: !unref(moveTarget),
						onClick: ($event) => confirmMove()
					}, null, 8, [
						"loading",
						"disabled",
						"onClick"
					])])])];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/general/categories.vue
var _sfc_setup = categories_vue_vue_type_script_setup_true_lang_default.setup;
categories_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/general/categories.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var categories_default = categories_vue_vue_type_script_setup_true_lang_default;

export { categories_default as default };
//# sourceMappingURL=categories-CkmQfhy1.mjs.map
