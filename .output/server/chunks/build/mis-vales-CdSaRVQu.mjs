import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { defineComponent, ref, computed, watch, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { ChevronLeft, ChevronRight, UserRound, FileClock, CircleDollarSign } from 'lucide-vue-next';
import '../virtual/entry.mjs';
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

//#region app/pages/distributor-portal/mis-vales/index.vue?vue&type=script&setup=true&lang.ts
var PAGE_SIZE = 15;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useVouchers();
		const loading = ref(true);
		const errorMessage = ref(null);
		const rows = ref([]);
		const statusLabels = {
			PENDIENTE: "Pendiente de aprobación",
			RECHAZADO: "Rechazado",
			BORRADOR: "Borrador",
			APROBADO: "Aprobado",
			TRANSFERIDO: "Transferido",
			ACTIVO: "Activo",
			PAGO_PARCIAL: "Pago parcial",
			PAGADO: "Pagado",
			LIQUIDADO: "Liquidado",
			MOROSO: "Moroso",
			RECLAMADO: "Reclamado",
			CANCELADO: "Cancelado",
			REVERSADO: "Reversado"
		};
		const statusVariants = {
			PENDIENTE: "warning",
			BORRADOR: "warning",
			TRANSFERIDO: "warning",
			PAGO_PARCIAL: "warning",
			APROBADO: "success",
			ACTIVO: "success",
			PAGADO: "success",
			LIQUIDADO: "success",
			RECHAZADO: "danger",
			MOROSO: "danger",
			RECLAMADO: "danger",
			CANCELADO: "danger",
			REVERSADO: "danger"
		};
		const searchQuery = ref("");
		const filteredRows = computed(() => {
			if (!searchQuery.value.trim()) return rows.value;
			const query = searchQuery.value.toLowerCase();
			return rows.value.filter((row) => row.customerName.toLowerCase().includes(query) || row.folio.toLowerCase().includes(query));
		});
		const currentPage = ref(1);
		const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / PAGE_SIZE)));
		const pagedRows = computed(() => {
			const start = (currentPage.value - 1) * PAGE_SIZE;
			return filteredRows.value.slice(start, start + PAGE_SIZE);
		});
		watch([searchQuery, rows], () => {
			currentPage.value = 1;
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 0
		});
		const dateFormatter = new Intl.DateTimeFormat("es-MX", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
		function iconFor(row) {
			if (row.folio.startsWith("SOL")) return UserRound;
			return statusVariants[row.status] === "warning" ? FileClock : CircleDollarSign;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "history-shell" }, _attrs))} data-v-8e9587a8><div class="history-wrapper" data-v-8e9587a8><header class="top-navbar" data-v-8e9587a8><button class="back-btn" type="button" data-v-8e9587a8> ← </button><h1 class="nav-title" data-v-8e9587a8> Mis vales </h1></header><div class="content-body" data-v-8e9587a8><div class="search-box" data-v-8e9587a8><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar por cliente o folio" class="search-input" data-v-8e9587a8><span class="search-icon" data-v-8e9587a8>🔍</span></div>`);
			if (loading.value) _push(`<p class="state-text" data-v-8e9587a8> Cargando historial… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-8e9587a8>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (filteredRows.value.length === 0) _push(`<p class="state-text" data-v-8e9587a8>${ssrInterpolate(searchQuery.value ? "No hay vales que coincidan con tu búsqueda." : "Todavía no has dado ningún vale.")}</p>`);
			else {
				_push(`<!--[--><div class="history-list" data-v-8e9587a8><!--[-->`);
				ssrRenderList(pagedRows.value, (row) => {
					_push(`<article class="history-row" data-v-8e9587a8><div class="${ssrRenderClass([statusVariants[row.status] ?? "warning", "row-icon"])}" data-v-8e9587a8>`);
					ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconFor(row)), { size: 16 }, null), _parent);
					_push(`</div><div class="row-info" data-v-8e9587a8><h3 class="cliente" data-v-8e9587a8>${ssrInterpolate(row.customerName)}</h3><p class="detail" data-v-8e9587a8>${ssrInterpolate(row.folio)} · ${ssrInterpolate(statusLabels[row.status] ?? row.status)}</p></div><div class="row-monto" data-v-8e9587a8><span class="${ssrRenderClass([statusVariants[row.status] ?? "warning", "amount"])}" data-v-8e9587a8>${ssrInterpolate(unref(money).format(row.amount))}</span><span class="fecha" data-v-8e9587a8>${ssrInterpolate(row.createdAt ? unref(dateFormatter).format(new Date(row.createdAt)) : "—")}</span></div></article>`);
				});
				_push(`<!--]--></div>`);
				if (totalPages.value > 1) {
					_push(`<div class="pager" data-v-8e9587a8><button type="button" class="pager-btn"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} aria-label="Página anterior" data-v-8e9587a8>`);
					_push(ssrRenderComponent(unref(ChevronLeft), { size: 16 }, null, _parent));
					_push(`</button><span class="pager-label" data-v-8e9587a8>Página ${ssrInterpolate(currentPage.value)} de ${ssrInterpolate(totalPages.value)}</span><button type="button" class="pager-btn"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} aria-label="Página siguiente" data-v-8e9587a8>`);
					_push(ssrRenderComponent(unref(ChevronRight), { size: 16 }, null, _parent));
					_push(`</button></div>`);
				} else _push(`<!---->`);
				_push(`<!--]-->`);
			}
			_push(`</div></div></main>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/mis-vales/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/mis-vales/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var mis_vales_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8e9587a8"]]);

export { mis_vales_default as default };
//# sourceMappingURL=mis-vales-CdSaRVQu.mjs.map
