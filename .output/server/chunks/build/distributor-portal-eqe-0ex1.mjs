import { al as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useVouchers } from './useVouchers-hob04OlF.mjs';
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))} data-v-9906cae1><header class="top-navbar" data-v-9906cae1><div class="user-greeting" data-v-9906cae1><span class="welcome-tag" data-v-9906cae1>BIENVENIDO DE NUEVO</span><h1 class="nav-title" data-v-9906cae1> Hola, ${ssrInterpolate(distributorName.value)}</h1></div><button class="logout-btn" data-v-9906cae1><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-9906cae1><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" data-v-9906cae1></path><polyline points="16 17 21 12 16 7" data-v-9906cae1></polyline><line x1="21" y1="12" x2="9" y2="12" data-v-9906cae1></line></svg> Salir </button></header><div class="content-body" data-v-9906cae1><div class="credit-card" data-v-9906cae1><div class="card-glass-glow" data-v-9906cae1></div><div class="credit-header" data-v-9906cae1><span class="credit-label" data-v-9906cae1>CRÉDITO DISPONIBLE</span><span class="badge-category" data-v-9906cae1>${ssrInterpolate(categoryName.value)}</span></div><div class="credit-value" data-v-9906cae1>${ssrInterpolate(unlimitedCredit.value ? "Ilimitado" : `$${availableCredit.value.toLocaleString("es-MX")}`)}</div><div class="credit-footer" data-v-9906cae1><div class="points-pill" data-v-9906cae1><span class="star-icon" data-v-9906cae1>⭐</span><span data-v-9906cae1><strong data-v-9906cae1>${ssrInterpolate(currentPoints.value.toLocaleString("es-MX"))}</strong> Puntos acumulados</span></div></div></div><div class="actions-row" data-v-9906cae1><button class="action-btn primary" data-v-9906cae1><div class="action-icon-wrapper" data-v-9906cae1><span data-v-9906cae1>➕</span></div><span class="action-text" data-v-9906cae1>Nuevo vale</span></button></div><section class="vouchers-section" data-v-9906cae1><div class="section-header" data-v-9906cae1><h2 class="section-label" data-v-9906cae1>Mis Vales Emitidos</h2>`);
			if (!loading.value && rows.value.length) _push(`<span class="counter-badge" data-v-9906cae1>${ssrInterpolate(rows.value.length)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (loading.value) _push(`<p class="state-text" data-v-9906cae1><span class="spinner" data-v-9906cae1></span> Cargando vales… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-9906cae1>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (rows.value.length === 0) _push(`<div class="empty-state" data-v-9906cae1><span class="empty-icon" data-v-9906cae1>📄</span><p data-v-9906cae1>Todavía no tienes vales emitidos.</p></div>`);
			else {
				_push(`<div class="voucher-list" data-v-9906cae1><!--[-->`);
				ssrRenderList(rows.value, (row) => {
					_push(`<div class="voucher-card" data-v-9906cae1><div class="voucher-avatar" data-v-9906cae1> 👤 </div><div class="voucher-info" data-v-9906cae1><h3 class="voucher-name" data-v-9906cae1>${ssrInterpolate(row.customerName)}</h3><p class="voucher-amount" data-v-9906cae1> \$${ssrInterpolate(row.amount.toLocaleString("es-MX"))} <span class="currency" data-v-9906cae1>MXN</span></p></div><span class="${ssrRenderClass([row.status.toLowerCase(), "status-badge"])}" data-v-9906cae1>${ssrInterpolate(statusLabels[row.status] ?? row.status)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</section></div></div>`);
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
var distributor_portal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9906cae1"]]);

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-eqe-0ex1.mjs.map
