import { al as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

//#region app/pages/distributor-portal/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { user} = useAuth();
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
		const distributorName = computed(() => {
			const person = user.value?.person;
			if (!person) return user.value?.username ?? "Distribuidora";
			return [person.first_name, person.last_name].filter(Boolean).join(" ");
		});
		const availableCredit = computed(() => Number(user.value?.distributor?.available_credit ?? 0));
		const unlimitedCredit = computed(() => Boolean(user.value?.distributor?.unlimited_credit));
		const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0));
		const categoryName = computed(() => user.value?.distributor?.category?.name ?? "Sin categoría");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))} data-v-f9137473><header class="top-navbar" data-v-f9137473><div class="user-greeting" data-v-f9137473><span class="welcome-tag" data-v-f9137473>BIENVENIDO DE NUEVO</span><h1 class="nav-title" data-v-f9137473> Hola, ${ssrInterpolate(distributorName.value)}</h1></div><button class="logout-btn" data-v-f9137473><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-f9137473><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" data-v-f9137473></path><polyline points="16 17 21 12 16 7" data-v-f9137473></polyline><line x1="21" y1="12" x2="9" y2="12" data-v-f9137473></line></svg> Salir </button></header><div class="content-body" data-v-f9137473><div class="credit-card" data-v-f9137473><div class="card-glass-glow" data-v-f9137473></div><div class="credit-header" data-v-f9137473><span class="credit-label" data-v-f9137473>CRÉDITO DISPONIBLE</span><span class="badge-category" data-v-f9137473>${ssrInterpolate(categoryName.value)}</span></div><div class="credit-value" data-v-f9137473>${ssrInterpolate(unlimitedCredit.value ? "Ilimitado" : `$${availableCredit.value.toLocaleString("es-MX")}`)}</div><div class="credit-footer" data-v-f9137473><div class="points-pill" data-v-f9137473><span class="star-icon" data-v-f9137473>⭐</span><span data-v-f9137473><strong data-v-f9137473>${ssrInterpolate(currentPoints.value.toLocaleString("es-MX"))}</strong> Puntos acumulados</span></div></div></div><div class="actions-row" data-v-f9137473><button class="action-btn primary" data-v-f9137473><div class="action-icon-wrapper" data-v-f9137473><span data-v-f9137473>➕</span></div><span class="action-text" data-v-f9137473>Nuevo vale</span></button></div><section class="vouchers-section" data-v-f9137473><div class="section-header" data-v-f9137473><h2 class="section-label" data-v-f9137473> Mis Vales Emitidos </h2>`);
			if (!loading.value && rows.value.length) _push(`<span class="counter-badge" data-v-f9137473>${ssrInterpolate(rows.value.length)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (loading.value) _push(`<p class="state-text" data-v-f9137473><span class="spinner" data-v-f9137473></span> Cargando vales… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-f9137473>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (rows.value.length === 0) _push(`<div class="empty-state" data-v-f9137473><span class="empty-icon" data-v-f9137473>📄</span><p data-v-f9137473>Todavía no tienes vales emitidos.</p></div>`);
			else {
				_push(`<div class="voucher-list" data-v-f9137473><!--[-->`);
				ssrRenderList(rows.value, (row) => {
					_push(`<div class="voucher-card" data-v-f9137473><div class="voucher-avatar" data-v-f9137473> 👤 </div><div class="voucher-info" data-v-f9137473><h3 class="voucher-name" data-v-f9137473>${ssrInterpolate(row.customerName)}</h3><p class="voucher-amount" data-v-f9137473> \$${ssrInterpolate(row.amount.toLocaleString("es-MX"))} <span class="currency" data-v-f9137473>MXN</span></p></div><span class="${ssrRenderClass([row.status.toLowerCase(), "status-badge"])}" data-v-f9137473>${ssrInterpolate(statusLabels[row.status] ?? row.status)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`<div class="actions-row" data-v-f9137473><button class="action-btn primary" data-v-f9137473><span class="action-icon" data-v-f9137473>➕</span> Nuevo vale </button><button class="action-btn" data-v-f9137473><span class="action-icon" data-v-f9137473>👤</span> Nuevo cliente </button><button class="action-btn" data-v-f9137473><span class="action-icon" data-v-f9137473>📄</span> Estado de cuenta </button></div><section class="vouchers-section" data-v-f9137473><label class="section-label" data-v-f9137473>Mis vales</label>`);
			if (loading.value) _push(`<p class="state-text" data-v-f9137473> Cargando… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-f9137473>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (rows.value.length === 0) _push(`<p class="state-text" data-v-f9137473> Todavía no tienes vales emitidos. </p>`);
			else {
				_push(`<div class="voucher-list" data-v-f9137473><!--[-->`);
				ssrRenderList(rows.value, (row) => {
					_push(`<div class="voucher-item" data-v-f9137473><div class="voucher-avatar" data-v-f9137473> 👤 </div><div class="voucher-info" data-v-f9137473><h3 class="voucher-name" data-v-f9137473>${ssrInterpolate(row.customerName)}</h3><p class="voucher-detail" data-v-f9137473> \$${ssrInterpolate(row.amount.toLocaleString("es-MX"))}</p></div><span class="${ssrRenderClass([row.status.toLowerCase(), "status-badge"])}" data-v-f9137473>${ssrInterpolate(statusLabels[row.status] ?? row.status)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</section></section></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var distributor_portal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-f9137473"]]);

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-BDNafAVW.mjs.map
