import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { defineComponent, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

//#region app/composables/useDistributorPoints.ts
function useDistributorPoints() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function redeemPoints(distributorId, points) {
		return (await $fetch$2(`${config.public.apiBase}/distributors/${distributorId}/points/redeem`, {
			method: "POST",
			headers: authHeaders(),
			body: { points }
		})).data;
	}
	async function listMyRedemptions(distributorId) {
		return (await $fetch$2(`${config.public.apiBase}/distributors/${distributorId}/points/redemptions`, { headers: authHeaders() })).data;
	}
	return {
		redeemPoints,
		listMyRedemptions
	};
}
//#endregion
//#region app/pages/distributor-portal/points/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { user} = useAuth();
		useDistributorPoints();
		const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0));
		computed(() => user.value?.distributor?.id ?? null);
		const loading = ref(true);
		const errorMessage = ref(null);
		const redemptions = ref([]);
		const showRedeemForm = ref(false);
		const redeemAmount = ref(null);
		const submitting = ref(false);
		const submitError = ref(null);
		const showModal = ref(false);
		const confirmedRedemption = ref(null);
		const pendingRedemption = computed(() => redemptions.value.find((r) => r.status === "PENDIENTE") ?? null);
		function statusLabel(status) {
			return {
				PENDIENTE: "Esperando pago en sucursal",
				APROBADO: "Pagado",
				RECHAZADO: "Rechazado",
				CANCELADO: "Cancelado"
			}[status];
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "puntos-container" }, _attrs))} data-v-cebe13ec><header class="top-navbar" data-v-cebe13ec><h1 class="nav-title" data-v-cebe13ec> Mis Puntos </h1></header><div class="content-body" data-v-cebe13ec><div class="points-card" data-v-cebe13ec><div class="points-header" data-v-cebe13ec><span class="star-icon" data-v-cebe13ec>⭐</span><span class="points-label" data-v-cebe13ec>Puntos Acumulados</span></div><h2 class="points-amount" data-v-cebe13ec>${ssrInterpolate(currentPoints.value.toLocaleString("es-MX"))}</h2><p class="points-sub" data-v-cebe13ec> Sigue emitiendo vales al corriente para acumular más puntos. </p><button type="button" class="redeem-btn"${ssrIncludeBooleanAttr(currentPoints.value <= 0 || !!pendingRedemption.value) ? " disabled" : ""} data-v-cebe13ec> Canjear puntos </button>`);
			if (pendingRedemption.value) _push(`<p class="pending-hint" data-v-cebe13ec> Ya tienes un canje pendiente — muéstrale el folio <strong data-v-cebe13ec>${ssrInterpolate(pendingRedemption.value.folio)}</strong> a la cajera de tu sucursal. </p>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (showRedeemForm.value) {
				_push(`<section class="redeem-form" data-v-cebe13ec><label class="section-title" for="redeem-amount" data-v-cebe13ec>¿Cuántos puntos quieres canjear?</label><input id="redeem-amount"${ssrRenderAttr("value", redeemAmount.value)} type="number" min="1"${ssrRenderAttr("max", currentPoints.value)} class="redeem-input" placeholder="Ej. 200" data-v-cebe13ec>`);
				if (submitError.value) _push(`<p class="state-text error" data-v-cebe13ec>${ssrInterpolate(submitError.value)}</p>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="submit-btn"${ssrIncludeBooleanAttr(!redeemAmount.value || redeemAmount.value <= 0 || redeemAmount.value > currentPoints.value || submitting.value) ? " disabled" : ""} data-v-cebe13ec>${ssrInterpolate(submitting.value ? "Enviando…" : "Confirmar canje")}</button></section>`);
			} else _push(`<!---->`);
			_push(`<section class="benefits-section" data-v-cebe13ec><h3 class="section-title" data-v-cebe13ec> Historial de canjes </h3>`);
			if (loading.value) _push(`<p class="state-text" data-v-cebe13ec> Cargando historial… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-cebe13ec>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (redemptions.value.length === 0) _push(`<p class="state-text" data-v-cebe13ec> Todavía no has solicitado ningún canje. </p>`);
			else {
				_push(`<!--[-->`);
				ssrRenderList(redemptions.value, (redemption) => {
					_push(`<div class="benefit-item" data-v-cebe13ec><span class="benefit-icon" data-v-cebe13ec>🎟️</span><div data-v-cebe13ec><h4 class="benefit-title" data-v-cebe13ec>${ssrInterpolate(redemption.points)} puntos · \$${ssrInterpolate(Number(redemption.amount_mxn).toLocaleString("es-MX"))}</h4><p class="benefit-desc" data-v-cebe13ec>${ssrInterpolate(statusLabel(redemption.status))} `);
					if (redemption.status === "PENDIENTE") _push(`<!--[--> · Folio: <strong data-v-cebe13ec>${ssrInterpolate(redemption.folio)}</strong><!--]-->`);
					else _push(`<!---->`);
					_push(`</p></div></div>`);
				});
				_push(`<!--]-->`);
			}
			_push(`</section></div>`);
			if (showModal.value) {
				_push(`<div class="modal-overlay" data-v-cebe13ec><div class="modal-card" data-v-cebe13ec><div class="success-checkmark" data-v-cebe13ec><div class="check-icon" data-v-cebe13ec><span class="icon-line line-tip" data-v-cebe13ec></span><span class="icon-line line-long" data-v-cebe13ec></span><div class="icon-circle" data-v-cebe13ec></div></div></div><h2 class="modal-title" data-v-cebe13ec> ¡Folio generado! </h2><p class="modal-subtitle" data-v-cebe13ec> Muéstraselo a la cajera de tu sucursal para recibir tu pago de <strong data-v-cebe13ec>\$${ssrInterpolate(Number(confirmedRedemption.value?.amount_mxn ?? 0).toLocaleString("es-MX"))}</strong>. </p>`);
				if (confirmedRedemption.value) _push(`<div class="modal-details" data-v-cebe13ec><div class="modal-row folio-row" data-v-cebe13ec><strong data-v-cebe13ec>${ssrInterpolate(confirmedRedemption.value.folio)}</strong></div></div>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="modal-btn" data-v-cebe13ec> Entendido </button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/points/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/points/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var points_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-cebe13ec"]]);

export { points_default as default };
//# sourceMappingURL=points-Celu8ZLX.mjs.map
