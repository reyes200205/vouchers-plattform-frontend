import { aP as useToast, al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { c as customerFullName } from './useCustomers-CQ23lYPq.mjs';
import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
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

//#region app/composables/useDistributorRelations.ts
/**
* Estado de cuenta de la distribuidora autenticada: sus propias relaciones de
* corte (lo que le toca remitirle a la sucursal cada periodo). El backend
* (Distributor\RelationController) resuelve la distribuidora por el usuario
* autenticado -- nunca hay forma de pedir las relaciones de otra.
*/
function useDistributorRelations() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listMyRelations(params = {}) {
		const search = new URLSearchParams();
		if (params.status) search.set("status", params.status);
		search.set("page", String(params.page ?? 1));
		search.set("per_page", String(params.per_page ?? 15));
		return (await $fetch$2(`${config.public.apiBase}/distributor/relations?${search.toString()}`, { headers: authHeaders() })).data;
	}
	async function getMyRelation(relationId) {
		return (await $fetch$2(`${config.public.apiBase}/distributor/relations/${relationId}`, { headers: authHeaders() })).data;
	}
	/**
	* El endpoint requiere el Bearer token (no es un link público), así que no
	* se puede simplemente apuntar un <a href> a la URL: se descarga como blob
	* y se dispara la descarga con un enlace temporal en memoria.
	*/
	async function downloadMyRelationPdf(relationId, fileName) {
		const blob = await $fetch$2(`${config.public.apiBase}/distributor/relations/${relationId}/pdf`, {
			headers: authHeaders(),
			responseType: "blob"
		});
		const url = URL.createObjectURL(blob);
		const link = (void 0).createElement("a");
		link.href = url;
		link.download = fileName;
		(void 0).body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
	}
	return {
		listMyRelations,
		getMyRelation,
		downloadMyRelationPdf
	};
}
//#endregion
//#region app/pages/distributor-portal/collection-relationship/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useDistributorRelations();
		useToast();
		const loading = ref(true);
		const errorMessage = ref(null);
		const relations = ref([]);
		const selectedRelationId = ref(null);
		const downloadingPdf = ref(false);
		const statusLabels = {
			GENERADA: "Pendiente",
			PAGADA: "Pagada",
			PARCIAL: "Pago parcial",
			VENCIDA: "Vencida",
			CERRADA: "Cerrada"
		};
		const selectedRelation = computed(() => relations.value.find((r) => r.id === selectedRelationId.value) ?? null);
		const cobros = computed(() => selectedRelation.value?.items ?? []);
		const totalEsperado = computed(() => Number(selectedRelation.value?.total_payment ?? 0));
		const totalARemitir = computed(() => Number(selectedRelation.value?.total_amount_due ?? 0));
		function itemClientName(item) {
			return item.customer?.person ? customerFullName(item.customer.person) : `Cliente #${item.customer_id}`;
		}
		function isCarryover(item) {
			return item.origin_relation_id !== null;
		}
		const dateFormatter = new Intl.DateTimeFormat("es-MX", {
			day: "2-digit",
			month: "short"
		});
		const dateFormatterFull = new Intl.DateTimeFormat("es-MX", {
			day: "2-digit",
			month: "short",
			year: "numeric"
		});
		function fmtShortDate(value) {
			if (!value) return "—";
			return dateFormatter.format(/* @__PURE__ */ new Date(`${value}T00:00:00`));
		}
		function fmtFullDate(value) {
			if (!value) return "—";
			return dateFormatterFull.format(/* @__PURE__ */ new Date(`${value}T00:00:00`));
		}
		function relationPeriodLabel(relation) {
			return `${fmtShortDate(relation.early_payment_start_date)} – ${fmtShortDate(relation.early_payment_end_date)}`;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "estado-cuenta-container" }, _attrs))} data-v-c5d68dcc><header class="top-navbar" data-v-c5d68dcc><button type="button" class="back-btn" data-v-c5d68dcc> ← </button><h1 class="nav-title" data-v-c5d68dcc> Estado de cuenta </h1>`);
			if (selectedRelation.value) {
				_push(`<button type="button" class="download-icon-btn"${ssrIncludeBooleanAttr(downloadingPdf.value) ? " disabled" : ""} title="Descargar PDF" data-v-c5d68dcc>`);
				if (downloadingPdf.value) _push(`<span class="spinner-icon" data-v-c5d68dcc></span>`);
				else _push(`<span data-v-c5d68dcc>⬇</span>`);
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`</header><div class="content-body" data-v-c5d68dcc>`);
			if (loading.value) _push(`<p class="state-text" data-v-c5d68dcc> Cargando… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-c5d68dcc>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (relations.value.length === 0) _push(`<p class="state-text" data-v-c5d68dcc> Todavía no tienes relaciones de cobro generadas. </p>`);
			else {
				_push(`<!--[-->`);
				if (relations.value.length > 1) {
					_push(`<select class="relation-select" data-v-c5d68dcc><!--[-->`);
					ssrRenderList(relations.value, (r) => {
						_push(`<option${ssrRenderAttr("value", r.id)} data-v-c5d68dcc${ssrIncludeBooleanAttr(Array.isArray(selectedRelationId.value) ? ssrLooseContain(selectedRelationId.value, r.id) : ssrLooseEqual(selectedRelationId.value, r.id)) ? " selected" : ""}>${ssrInterpolate(relationPeriodLabel(r))} · ${ssrInterpolate(r.relation_number)} · ${ssrInterpolate(statusLabels[r.status ?? "GENERADA"])}</option>`);
					});
					_push(`<!--]--></select>`);
				} else _push(`<!---->`);
				if (selectedRelation.value) {
					_push(`<!--[--><div class="summary-card" data-v-c5d68dcc><div class="summary-item" data-v-c5d68dcc><span class="summary-label" data-v-c5d68dcc>Quincenas del periodo</span><span class="summary-amount" data-v-c5d68dcc>\$${ssrInterpolate(totalEsperado.value.toLocaleString("es-MX"))}</span></div><div class="summary-divider" data-v-c5d68dcc></div><div class="summary-item" data-v-c5d68dcc><span class="summary-label" data-v-c5d68dcc>Total a remitir</span><span class="summary-amount success" data-v-c5d68dcc>\$${ssrInterpolate(totalARemitir.value.toLocaleString("es-MX"))}</span></div></div><p class="period-line" data-v-c5d68dcc> Periodo: <strong data-v-c5d68dcc>${ssrInterpolate(relationPeriodLabel(selectedRelation.value))}</strong> · Vence: <strong data-v-c5d68dcc>${ssrInterpolate(fmtFullDate(selectedRelation.value.payment_due_date))}</strong></p><p class="ref-line" data-v-c5d68dcc> Referencia: <strong data-v-c5d68dcc>${ssrInterpolate(selectedRelation.value.payment_reference ?? "—")}</strong><span class="${ssrRenderClass([(selectedRelation.value.status ?? "GENERADA").toLowerCase(), "status-chip"])}" data-v-c5d68dcc>${ssrInterpolate(statusLabels[selectedRelation.value.status ?? "GENERADA"])}</span></p><section class="cobros-section" data-v-c5d68dcc><label class="section-label" data-v-c5d68dcc>Vales incluidos</label>`);
					if (cobros.value.length === 0) _push(`<div class="state-text" data-v-c5d68dcc> Esta relación no incluye vales (solo saldo arrastrado). </div>`);
					else {
						_push(`<div class="cobro-list" data-v-c5d68dcc><!--[-->`);
						ssrRenderList(cobros.value, (item) => {
							_push(`<div class="cobro-item" data-v-c5d68dcc><div class="cobro-info" data-v-c5d68dcc>`);
							if (isCarryover(item)) _push(`<span class="origin-tag origin-tag--carryover" data-v-c5d68dcc> ⤷ Arrastre de corte anterior </span>`);
							else _push(`<span class="origin-tag origin-tag--normal" data-v-c5d68dcc> Quincena de este periodo </span>`);
							_push(`<h3 class="cliente-nombre" data-v-c5d68dcc>${ssrInterpolate(itemClientName(item))}</h3><p class="cobro-detail" data-v-c5d68dcc>${ssrInterpolate(item.product_name_snapshot ?? `Vale #${item.voucher_id}`)} · Quincena ${ssrInterpolate(item.installment_number ?? "—")}/${ssrInterpolate(item.total_payments)}</p></div><div class="cobro-monto-col" data-v-c5d68dcc><span class="monto" data-v-c5d68dcc>\$${ssrInterpolate(Number(item.payment_amount).toLocaleString("es-MX"))}</span><span class="${ssrRenderClass([item.is_late_payment ? "vencida" : "pendiente", "badge-status"])}" data-v-c5d68dcc>${ssrInterpolate(item.is_late_payment ? "Atrasado" : "A tiempo")}</span></div></div>`);
						});
						_push(`<!--]--></div>`);
					}
					_push(`</section><!--]-->`);
				} else _push(`<!---->`);
				_push(`<!--]-->`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/collection-relationship/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/collection-relationship/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var collection_relationship_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c5d68dcc"]]);

export { collection_relationship_default as default };
//# sourceMappingURL=collection-relationship-Cb_58c22.mjs.map
