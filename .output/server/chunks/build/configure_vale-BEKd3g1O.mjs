import { aK as useRoute, al as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useProducts } from './useProducts-D-_KJN0B.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { defineComponent, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region app/pages/distributor-portal/configure_vale/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { user} = useAuth();
		useProducts();
		useVouchers();
		computed(() => {
			const raw = route.query.customerId;
			return raw ? Number(raw) : null;
		});
		const cliente = ref({
			nombre: route.query.nombre || "",
			contacto: route.query.contacto || ""
		});
		const availableCredit = computed(() => Number(user.value?.distributor?.available_credit ?? 0));
		const unlimitedCredit = computed(() => Boolean(user.value?.distributor?.unlimited_credit));
		const preValeMaxAmount = computed(() => {
			const raw = user.value?.distributor?.pre_vale_max_amount;
			return raw === null || raw === void 0 ? null : Number(raw);
		});
		const loading = ref(true);
		const errorMessage = ref(null);
		const products = ref([]);
		const selectedProductId = ref(null);
		const submitting = ref(false);
		const submitError = ref(null);
		const showModal = ref(false);
		const confirmedVoucher = ref(null);
		const selectedProduct = computed(() => products.value.find((p) => p.id === selectedProductId.value) ?? null);
		function previewSnapshot(product) {
			const principal = Number(product.principal_amount);
			const commission = Math.round(principal * Number(product.company_commission_percentage) / 100 * 100) / 100;
			const interestPerFortnight = Math.round(principal * Number(product.fortnightly_interest_percentage) / 100 * 100) / 100;
			const interestTotal = Math.round(interestPerFortnight * product.number_of_fortnights * 100) / 100;
			const totalDebt = Math.round((principal + commission + Number(product.insurance_amount) + interestTotal) * 100) / 100;
			return {
				totalDebt,
				fortnightlyPayment: Math.floor(totalDebt / product.number_of_fortnights)
			};
		}
		function previewFortnightlyPayment(product) {
			return previewSnapshot(product).fortnightlyPayment;
		}
		function previewTotalDebt(product) {
			return previewSnapshot(product).totalDebt;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "config-shell" }, _attrs))} data-v-2a6aeb15><div class="config-wrapper" data-v-2a6aeb15><header class="top-navbar" data-v-2a6aeb15><button type="button" class="back-btn" data-v-2a6aeb15> ← </button><h1 class="nav-title" data-v-2a6aeb15> Configurar vale </h1></header><div class="content-body" data-v-2a6aeb15><div class="client-card" data-v-2a6aeb15><div class="avatar-circle" data-v-2a6aeb15><span class="avatar-icon" data-v-2a6aeb15>👤</span></div><div class="client-info" data-v-2a6aeb15><h3 class="client-name" data-v-2a6aeb15>${ssrInterpolate(cliente.value.nombre)}</h3><p class="client-detail" data-v-2a6aeb15> Contacto: ${ssrInterpolate(cliente.value.contacto || "Sin teléfono")}</p></div></div><div class="disponible-badge" data-v-2a6aeb15> Crédito disponible <strong data-v-2a6aeb15>${ssrInterpolate(unlimitedCredit.value ? "Ilimitado" : `$${availableCredit.value.toLocaleString("es-MX")}`)}</strong></div>`);
			if (preValeMaxAmount.value !== null) _push(`<p class="state-text" data-v-2a6aeb15> Por ser tu primer vale (o por un aumento de crédito reciente), solo puedes pedir hasta <strong data-v-2a6aeb15>\$${ssrInterpolate(preValeMaxAmount.value.toLocaleString("es-MX"))}</strong>. </p>`);
			else _push(`<!---->`);
			if (loading.value) _push(`<p class="state-text" data-v-2a6aeb15> Cargando productos disponibles… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-2a6aeb15>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (products.value.length === 0) _push(`<p class="state-text" data-v-2a6aeb15> No hay productos financieros disponibles para tu crédito actual. </p>`);
			else {
				_push(`<section class="product-section" data-v-2a6aeb15><label class="section-label" data-v-2a6aeb15>Elige el vale a expedir</label><div class="product-list" data-v-2a6aeb15><!--[-->`);
				ssrRenderList(products.value, (product) => {
					_push(`<button type="button" class="${ssrRenderClass([{ active: selectedProductId.value === product.id }, "product-card"])}" data-v-2a6aeb15><div class="product-head" data-v-2a6aeb15><span class="product-name" data-v-2a6aeb15>${ssrInterpolate(product.name)}</span><span class="product-amount" data-v-2a6aeb15>\$${ssrInterpolate(Number(product.principal_amount).toLocaleString("es-MX"))}</span></div><div class="product-detail" data-v-2a6aeb15>${ssrInterpolate(product.number_of_fortnights)} quincenas · Seguro \$${ssrInterpolate(Number(product.insurance_amount).toLocaleString("es-MX"))}</div><div class="product-detail bold" data-v-2a6aeb15> Pago quincenal \$${ssrInterpolate(previewFortnightlyPayment(product).toLocaleString("es-MX"))}</div></button>`);
				});
				_push(`<!--]--></div>`);
				if (selectedProduct.value) _push(`<div class="summary-cards" data-v-2a6aeb15><div class="summary-card" data-v-2a6aeb15><span class="summary-label" data-v-2a6aeb15>Seguro</span><span class="summary-value bold" data-v-2a6aeb15>\$${ssrInterpolate(Number(selectedProduct.value.insurance_amount).toLocaleString("es-MX"))}</span></div><div class="summary-card" data-v-2a6aeb15><div data-v-2a6aeb15><div class="summary-label" data-v-2a6aeb15> Pago quincenal </div><div class="summary-subtext" data-v-2a6aeb15>${ssrInterpolate(selectedProduct.value.number_of_fortnights)} quincenas </div></div><span class="summary-value bold" data-v-2a6aeb15>\$${ssrInterpolate(previewFortnightlyPayment(selectedProduct.value).toLocaleString("es-MX"))}</span></div><div class="summary-card" data-v-2a6aeb15><div data-v-2a6aeb15><div class="summary-label" data-v-2a6aeb15> Total a pagar </div><div class="summary-subtext" data-v-2a6aeb15> Con intereses y comisión </div></div><span class="summary-value bold" data-v-2a6aeb15>\$${ssrInterpolate(previewTotalDebt(selectedProduct.value).toLocaleString("es-MX"))}</span></div></div>`);
				else _push(`<!---->`);
				if (submitError.value) _push(`<p class="state-text error" data-v-2a6aeb15>${ssrInterpolate(submitError.value)}</p>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="submit-btn"${ssrIncludeBooleanAttr(!selectedProduct.value || submitting.value) ? " disabled" : ""} data-v-2a6aeb15>${ssrInterpolate(submitting.value ? "Enviando…" : "Solicitar vale")}</button></section>`);
			}
			_push(`</div>`);
			if (showModal.value) {
				_push(`<div class="modal-overlay" data-v-2a6aeb15><div class="modal-card" data-v-2a6aeb15><div class="success-checkmark" data-v-2a6aeb15><div class="check-icon" data-v-2a6aeb15><span class="icon-line line-tip" data-v-2a6aeb15></span><span class="icon-line line-long" data-v-2a6aeb15></span><div class="icon-circle" data-v-2a6aeb15></div></div></div><h2 class="modal-title" data-v-2a6aeb15> ¡Solicitud enviada! </h2><p class="modal-subtitle" data-v-2a6aeb15> La solicitud de vale para <strong data-v-2a6aeb15>${ssrInterpolate(cliente.value.nombre)}</strong> por <strong data-v-2a6aeb15>\$${ssrInterpolate(Number(confirmedVoucher.value?.requested_amount ?? 0).toLocaleString("es-MX"))}</strong> quedó registrada, se envio la información al cliente y asegurece de mostrarla al ferear el vale. </p>`);
				if (confirmedVoucher.value) _push(`<div class="modal-details" data-v-2a6aeb15><div class="modal-row" data-v-2a6aeb15><span data-v-2a6aeb15>Plazo:</span><strong data-v-2a6aeb15>${ssrInterpolate(confirmedVoucher.value.snapshot.total_fortnights)} quincenas</strong></div><div class="modal-row" data-v-2a6aeb15><span data-v-2a6aeb15>Pago quincenal:</span><strong data-v-2a6aeb15>\$${ssrInterpolate(confirmedVoucher.value.snapshot.fortnightly_payment_amount.toLocaleString("es-MX"))}</strong></div></div>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="modal-btn" data-v-2a6aeb15> Volver al inicio </button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></main>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/configure_vale/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/configure_vale/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var configure_vale_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2a6aeb15"]]);

export { configure_vale_default as default };
//# sourceMappingURL=configure_vale-BEKd3g1O.mjs.map
