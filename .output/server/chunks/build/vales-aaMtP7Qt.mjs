import { aj as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useCustomers, c as customerFullName } from './useCustomers-DFzHFYKe.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

//#region app/pages/distributor-portal/vales/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useAuth();
		useCustomers();
		const searchQuery = ref("");
		const loading = ref(true);
		const errorMessage = ref(null);
		const customers = ref([]);
		const statusLabels = {
			EN_VERIFICACION: "En verificación",
			ACTIVO: "Activo",
			BLOQUEADO: "Bloqueado",
			MOROSO: "Moroso",
			INACTIVO: "Inactivo"
		};
		const filteredContacts = computed(() => {
			if (!searchQuery.value.trim()) return customers.value;
			const query = searchQuery.value.toLowerCase();
			return customers.value.filter((c) => {
				const nombre = customerFullName(c.person).toLowerCase();
				const telefono = c.person?.mobile_phone ?? "";
				return nombre.includes(query) || telefono.includes(query);
			});
		});
		function isSelectable(customer) {
			return customer.status === "ACTIVO" && Boolean(customer.verified_at);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "contacts-shell" }, _attrs))} data-v-9256e37c><div class="contacts-wrapper" data-v-9256e37c><header class="top-navbar" data-v-9256e37c><button class="back-btn" data-v-9256e37c> ← </button><h1 class="nav-title" data-v-9256e37c> Seleccionar cliente </h1></header><div class="content-body" data-v-9256e37c><div class="search-box" data-v-9256e37c><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Buscar cliente" class="search-input" data-v-9256e37c><span class="search-icon" data-v-9256e37c>🔍</span></div><button class="add-contact-btn" data-v-9256e37c><div class="plus-circle" data-v-9256e37c> + </div><span class="add-text" data-v-9256e37c>Nuevo cliente</span></button>`);
			if (loading.value) _push(`<p class="state-text" data-v-9256e37c> Cargando clientes… </p>`);
			else if (errorMessage.value) _push(`<p class="state-text error" data-v-9256e37c>${ssrInterpolate(errorMessage.value)}</p>`);
			else if (filteredContacts.value.length === 0) _push(`<p class="state-text" data-v-9256e37c> No tienes clientes registrados todavía. </p>`);
			else {
				_push(`<div class="contacts-list" data-v-9256e37c><!--[-->`);
				ssrRenderList(filteredContacts.value, (item) => {
					_push(`<div class="${ssrRenderClass([{ disabled: !isSelectable(item) }, "contact-item"])}" data-v-9256e37c><div class="avatar-circle" data-v-9256e37c><span class="avatar-icon" data-v-9256e37c>👤</span></div><div class="contact-info" data-v-9256e37c><h3 class="contact-name" data-v-9256e37c>${ssrInterpolate(unref(customerFullName)(item.person))}</h3><p class="contact-phone" data-v-9256e37c> 📞 ${ssrInterpolate(item.person?.mobile_phone || "Sin teléfono")}</p></div><span class="${ssrRenderClass([item.status?.toLowerCase(), "status-badge"])}" data-v-9256e37c>${ssrInterpolate(statusLabels[item.status ?? ""] ?? item.status)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div></main>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/vales/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/vales/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var vales_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9256e37c"]]);

export { vales_default as default };
//# sourceMappingURL=vales-aaMtP7Qt.mjs.map
