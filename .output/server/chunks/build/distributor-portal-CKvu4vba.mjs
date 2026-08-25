import { al as useAuth, a1 as navigateTo } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useVouchers } from './useVouchers-BX3NXX4e.mjs';
import { defineComponent, ref, computed, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { LogOut, CircleCheck, FilePlus2, UserPlus, ReceiptText, Coins, UserRound, FileClock, CircleDollarSign } from 'lucide-vue-next';
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

//#region app/components/distributor/CreditHeader.vue?vue&type=script&setup=true&lang.ts
var CreditHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CreditHeader",
	__ssrInlineRender: true,
	props: {
		distributorName: {},
		availableCredit: {},
		creditLimit: {},
		unlimitedCredit: { type: Boolean },
		categoryName: {},
		points: {}
	},
	emits: ["logout"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const usedCredit = computed(() => Math.max(props.creditLimit - props.availableCredit, 0));
		const percentage = computed(() => {
			if (props.unlimitedCredit || props.creditLimit <= 0) return 0;
			return Math.min(usedCredit.value / props.creditLimit * 100, 100);
		});
		const money = (value, maximumFractionDigits = 0) => {
			return new Intl.NumberFormat("es-MX", {
				style: "currency",
				currency: "MXN",
				maximumFractionDigits
			}).format(value);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "credit-header" }, _attrs))} data-v-2a6245a6><div class="top-bar" data-v-2a6245a6><span class="brand-name" data-v-2a6245a6>Mis<span data-v-2a6245a6>Vales</span></span><button class="logout-btn" type="button" aria-label="Cerrar sesión" data-v-2a6245a6>`);
			_push(ssrRenderComponent(unref(LogOut), { size: 15 }, null, _parent));
			_push(`</button></div><div class="credit-card" data-v-2a6245a6><div class="credit-title-row" data-v-2a6245a6><span class="credit-label" data-v-2a6245a6>Crédito disponible</span><span class="category-chip" data-v-2a6245a6>${ssrInterpolate(__props.categoryName)}</span></div><div class="credit-value" data-v-2a6245a6>${ssrInterpolate(__props.unlimitedCredit ? "Ilimitado" : money(__props.availableCredit))}</div><p class="check-line" data-v-2a6245a6>`);
			_push(ssrRenderComponent(unref(CircleCheck), { size: 14 }, null, _parent));
			_push(`<strong data-v-2a6245a6>${ssrInterpolate(__props.points.toLocaleString("es-MX"))}</strong> puntos acumulados </p>`);
			if (!__props.unlimitedCredit) _push(`<!--[--><div class="progress-track" data-v-2a6245a6><div class="progress-value" style="${ssrRenderStyle({ width: `${unref(percentage)}%` })}" data-v-2a6245a6></div></div><div class="amounts-row" data-v-2a6245a6><span data-v-2a6245a6>Usado ${ssrInterpolate(money(unref(usedCredit)))}</span><span data-v-2a6245a6>Límite ${ssrInterpolate(money(__props.creditLimit))}</span></div><!--]-->`);
			else _push(`<!---->`);
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region app/components/distributor/CreditHeader.vue
var _sfc_setup$3 = CreditHeader_vue_vue_type_script_setup_true_lang_default.setup;
CreditHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/distributor/CreditHeader.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var CreditHeader_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CreditHeader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-2a6245a6"]]), { __name: "DistributorCreditHeader" });
//#endregion
//#region app/components/distributor/QuickActions.vue?vue&type=script&setup=true&lang.ts
var QuickActions_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "QuickActions",
	__ssrInlineRender: true,
	setup(__props) {
		const actions = [
			{
				title: "Nuevo vale",
				icon: FilePlus2,
				to: "/distributor-portal/vales",
				tint: "blue"
			},
			{
				title: "Cliente nuevo",
				icon: UserPlus,
				to: "/distributor-portal/clientes",
				tint: "lime"
			},
			{
				title: "Estado cuenta",
				icon: ReceiptText,
				to: "/distributor-portal/collection-relationship",
				tint: "peach"
			},
			{
				title: "Puntos",
				icon: Coins,
				to: "/distributor-portal/points",
				tint: "amber"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "quick-actions" }, _attrs))} data-v-d18e9018><!--[-->`);
			ssrRenderList(actions, (action) => {
				_push(`<button class="action" type="button" data-v-d18e9018><div class="${ssrRenderClass([action.tint, "action-square"])}" data-v-d18e9018>`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(action.icon), { size: 18 }, null), _parent);
				_push(`</div><span data-v-d18e9018>${ssrInterpolate(action.title)}</span></button>`);
			});
			_push(`<!--]--></section>`);
		};
	}
});
//#endregion
//#region app/components/distributor/QuickActions.vue
var _sfc_setup$2 = QuickActions_vue_vue_type_script_setup_true_lang_default.setup;
QuickActions_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/distributor/QuickActions.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var QuickActions_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(QuickActions_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d18e9018"]]), { __name: "DistributorQuickActions" });
//#endregion
//#region app/components/distributor/VouchersTable.vue?vue&type=script&setup=true&lang.ts
var VouchersTable_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VouchersTable",
	__ssrInlineRender: true,
	props: { vouchers: {} },
	setup(__props) {
		function iconFor(row) {
			if (row.id.startsWith("SOL")) return UserRound;
			return row.estatusVariant === "warning" ? FileClock : CircleDollarSign;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "vouchers-container" }, _attrs))} data-v-fb6bcfa8><div class="vouchers-header" data-v-fb6bcfa8><h3 data-v-fb6bcfa8>Actividad reciente</h3><button class="btn-link" type="button" data-v-fb6bcfa8> Mis vales </button></div><div class="vouchers-list" data-v-fb6bcfa8><!--[-->`);
			ssrRenderList(__props.vouchers, (item) => {
				_push(`<article class="voucher-row" data-v-fb6bcfa8><div class="${ssrRenderClass([item.estatusVariant, "voucher-icon"])}" data-v-fb6bcfa8>`);
				ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconFor(item)), { size: 16 }, null), _parent);
				_push(`</div><div class="voucher-info" data-v-fb6bcfa8><h4 class="cliente" data-v-fb6bcfa8>${ssrInterpolate(item.cliente)}</h4><p class="detail" data-v-fb6bcfa8>${ssrInterpolate(item.id)} · ${ssrInterpolate(item.estatusLabel)}</p></div><div class="voucher-monto" data-v-fb6bcfa8><span class="${ssrRenderClass([item.estatusVariant, "amount"])}" data-v-fb6bcfa8>${ssrInterpolate(item.monto)}</span><span class="fecha" data-v-fb6bcfa8>${ssrInterpolate(item.fecha)}</span></div></article>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
//#endregion
//#region app/components/distributor/VouchersTable.vue
var _sfc_setup$1 = VouchersTable_vue_vue_type_script_setup_true_lang_default.setup;
VouchersTable_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/distributor/VouchersTable.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var VouchersTable_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(VouchersTable_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fb6bcfa8"]]), { __name: "DistributorVouchersTable" });
//#endregion
//#region app/pages/distributor-portal/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { user, logout } = useAuth();
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
		const distributorName = computed(() => {
			const person = user.value?.person;
			if (!person) return user.value?.username ?? "Distribuidora";
			return [person.first_name, person.last_name].filter(Boolean).join(" ");
		});
		const availableCredit = computed(() => Number(user.value?.distributor?.available_credit ?? 0));
		const creditLimit = computed(() => Number(user.value?.distributor?.credit_limit ?? 0));
		const unlimitedCredit = computed(() => Boolean(user.value?.distributor?.unlimited_credit));
		const currentPoints = computed(() => Number(user.value?.distributor?.current_points ?? 0));
		const categoryName = computed(() => user.value?.distributor?.category?.name ?? "Sin categoría");
		const dateFormatter = new Intl.DateTimeFormat("es-MX", {
			day: "2-digit",
			month: "short"
		});
		const money = new Intl.NumberFormat("es-MX", {
			style: "currency",
			currency: "MXN",
			maximumFractionDigits: 0
		});
		const voucherTableRows = computed(() => rows.value.map((row) => ({
			id: row.key.startsWith("request-") ? `SOL-${row.key.split("-")[1]}` : `#${row.key.split("-")[1]}`,
			cliente: row.customerName,
			monto: money.format(row.amount),
			estatusLabel: statusLabels[row.status] ?? row.status,
			estatusVariant: statusVariants[row.status] ?? "warning",
			fecha: row.createdAt ? dateFormatter.format(new Date(row.createdAt)) : "—"
		})));
		const cerrarSesion = async () => {
			await logout();
			await navigateTo("/login");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_DistributorCreditHeader = CreditHeader_default;
			const _component_DistributorQuickActions = QuickActions_default;
			const _component_DistributorVouchersTable = VouchersTable_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))} data-v-aeb1ad93>`);
			_push(ssrRenderComponent(_component_DistributorCreditHeader, {
				"distributor-name": distributorName.value,
				"available-credit": availableCredit.value,
				"credit-limit": creditLimit.value,
				"unlimited-credit": unlimitedCredit.value,
				"category-name": categoryName.value,
				points: currentPoints.value,
				onLogout: cerrarSesion
			}, null, _parent));
			_push(ssrRenderComponent(_component_DistributorQuickActions, null, null, _parent));
			_push(`<div class="content-body" data-v-aeb1ad93>`);
			if (loading.value) _push(`<p class="state-text" data-v-aeb1ad93><span class="spinner" data-v-aeb1ad93></span> Cargando vales… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-aeb1ad93>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (rows.value.length === 0) _push(`<div class="empty-state" data-v-aeb1ad93><span class="empty-icon" data-v-aeb1ad93>📄</span><p data-v-aeb1ad93>Todavía no tienes vales emitidos.</p></div>`);
			else _push(ssrRenderComponent(_component_DistributorVouchersTable, { vouchers: voucherTableRows.value }, null, _parent));
			_push(`</div></div>`);
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
var distributor_portal_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-aeb1ad93"]]);

export { distributor_portal_default as default };
//# sourceMappingURL=distributor-portal-CKvu4vba.mjs.map
