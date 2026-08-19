import { aj as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { c as customerFullName } from './useCustomers-DFzHFYKe.mjs';
import { u as useVouchers } from './useVouchers-BbvKdRKb.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
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
		const vouchers = ref([]);
		const statusLabels = {
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
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "home-shell" }, _attrs))} data-v-9518d439><div class="home-wrapper" data-v-9518d439><header class="top-navbar" data-v-9518d439><h1 class="nav-title" data-v-9518d439> Hola, ${ssrInterpolate(distributorName.value)}</h1><button class="logout-btn" data-v-9518d439> Salir </button></header><div class="content-body" data-v-9518d439><div class="credit-card" data-v-9518d439><div class="credit-row" data-v-9518d439><span class="credit-label" data-v-9518d439>Crédito disponible</span><span class="credit-value" data-v-9518d439>${ssrInterpolate(unlimitedCredit.value ? "Ilimitado" : `$${availableCredit.value.toLocaleString("es-MX")}`)}</span></div><div class="credit-footer" data-v-9518d439><span data-v-9518d439>${ssrInterpolate(categoryName.value)}</span><span data-v-9518d439>${ssrInterpolate(currentPoints.value.toLocaleString("es-MX"))} pts</span></div></div><div class="actions-row" data-v-9518d439><button class="action-btn primary" data-v-9518d439><span class="action-icon" data-v-9518d439>➕</span> Nuevo vale </button><button class="action-btn" data-v-9518d439><span class="action-icon" data-v-9518d439>👤</span> Nuevo cliente </button></div><section class="vouchers-section" data-v-9518d439><label class="section-label" data-v-9518d439>Mis vales</label>`);
			if (loading.value) _push(`<p class="state-text" data-v-9518d439> Cargando… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-9518d439>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (vouchers.value.length === 0) _push(`<p class="state-text" data-v-9518d439> Todavía no tienes vales emitidos. </p>`);
			else {
				_push(`<div class="voucher-list" data-v-9518d439><!--[-->`);
				ssrRenderList(vouchers.value, (voucher) => {
					_push(`<div class="voucher-item" data-v-9518d439><div class="voucher-avatar" data-v-9518d439> 👤 </div><div class="voucher-info" data-v-9518d439><h3 class="voucher-name" data-v-9518d439>${ssrInterpolate(unref(customerFullName)(voucher.customer?.person))}</h3><p class="voucher-detail" data-v-9518d439> \$${ssrInterpolate(Number(voucher.amount).toLocaleString("es-MX"))} · ${ssrInterpolate(voucher.total_fortnights)} quincenas </p></div><span class="${ssrRenderClass([voucher.status?.toLowerCase(), "status-badge"])}" data-v-9518d439>${ssrInterpolate(statusLabels[voucher.status ?? ""] ?? voucher.status)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</section></div></div></main>`);
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
var distributor_portal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9518d439"]]);

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-BeJhERuQ.mjs.map
