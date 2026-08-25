import { al as useAuth } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import { u as useCustomers, c as customerFullName } from './useCustomers-CQ23lYPq.mjs';
import { u as useCustomerTransfers, C as CUSTOMER_TRANSFER_STATUS_LABELS } from './useCustomerTransfers-CsxvIT-E.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region app/pages/distributor-portal/transferencias/index.vue?vue&type=script&setup=true&lang.ts
var TRANSFERS_PER_PAGE = 5;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useAuth();
		useCustomers();
		const { listTransferCandidates, listDistributorTransfers} = useCustomerTransfers();
		const activeTab = ref("solicitudes");
		const customerSearch = ref("");
		const customersLoading = ref(true);
		const customers = ref([]);
		const selectedCustomer = ref(null);
		const candidateSearch = ref("");
		const candidates = ref([]);
		const candidatesLoading = ref(false);
		const selectedDestination = ref(null);
		const requestReason = ref("");
		const submitting = ref(false);
		const formError = ref(null);
		function extractErrorMessage(e, fallback) {
			if (e && typeof e === "object" && "data" in e) {
				const data = e.data;
				if (data?.message) return data.message;
			}
			return fallback;
		}
		const filteredCustomers = computed(() => {
			if (!customerSearch.value.trim()) return customers.value;
			const query = customerSearch.value.toLowerCase();
			return customers.value.filter((c) => customerFullName(c.person).toLowerCase().includes(query));
		});
		async function searchCandidates() {
			candidatesLoading.value = true;
			try {
				candidates.value = await listTransferCandidates(candidateSearch.value || void 0);
			} catch (e) {
				console.error(e);
			} finally {
				candidatesLoading.value = false;
			}
		}
		watch(candidateSearch, () => {
			searchCandidates();
		});
		const transferFilter = ref("incoming");
		const emptyTransfersPage = {
			data: [],
			links: [],
			meta: {
				current_page: 1,
				last_page: 1,
				per_page: TRANSFERS_PER_PAGE,
				total: 0
			}
		};
		const incomingPage = ref(1);
		const outgoingPage = ref(1);
		const incomingData = ref(emptyTransfersPage);
		const outgoingData = ref(emptyTransfersPage);
		const incoming = computed(() => incomingData.value.data);
		const outgoing = computed(() => outgoingData.value.data);
		const transfersLoading = ref(true);
		const actionError = ref(null);
		const actingId = ref(null);
		async function loadTransfers() {
			transfersLoading.value = true;
			actionError.value = null;
			try {
				const [outgoingResult, incomingResult] = await Promise.all([listDistributorTransfers({
					direction: "outgoing",
					page: outgoingPage.value,
					per_page: TRANSFERS_PER_PAGE
				}), listDistributorTransfers({
					direction: "incoming",
					page: incomingPage.value,
					per_page: TRANSFERS_PER_PAGE
				})]);
				outgoingData.value = outgoingResult;
				incomingData.value = incomingResult;
			} catch (e) {
				console.error(e);
				actionError.value = extractErrorMessage(e, "No se pudieron cargar tus solicitudes de transferencia.");
			} finally {
				transfersLoading.value = false;
			}
		}
		watch(incomingPage, () => loadTransfers());
		watch(outgoingPage, () => loadTransfers());
		const rejectModalOpen = ref(false);
		const rejectingItem = ref(null);
		const rejectReason = ref("");
		const rejectSubmitting = ref(false);
		function statusBadgeClass(status) {
			if (status === "EJECUTADA") return "success";
			if (status.startsWith("RECHAZADA") || status === "CANCELADA") return "error";
			return "pending";
		}
		const INCOMING_STATUS_LABELS = {
			PENDIENTE_DESTINO: "Pendiente de tu respuesta",
			RECHAZADA_DESTINO: "Rechazaste esta solicitud",
			PENDIENTE_COORDINADOR: "Esperando autorización del coordinador",
			RECHAZADA_COORDINADOR: "Rechazada por el coordinador",
			AUTORIZADA: "Autorizada — puedes aceptar al cliente",
			EJECUTADA: "Completada",
			CANCELADA: "Cancelada por la distribuidora origen"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "contacts-shell" }, _attrs))} data-v-9f3086be><div class="contacts-wrapper" data-v-9f3086be><header class="top-navbar" data-v-9f3086be><button class="back-btn" data-v-9f3086be> ← </button><h1 class="nav-title" data-v-9f3086be> Transferencias de cliente </h1></header><div class="content-body" data-v-9f3086be><div class="tab-switch" data-v-9f3086be><button class="${ssrRenderClass([{ active: activeTab.value === "solicitudes" }, "tab-btn"])}" data-v-9f3086be> Mis solicitudes </button><button class="${ssrRenderClass([{ active: activeTab.value === "nueva" }, "tab-btn"])}" data-v-9f3086be> Nueva transferencia </button></div>`);
			if (activeTab.value === "nueva") {
				_push(`<div class="section" data-v-9f3086be>`);
				if (formError.value) _push(`<p class="state-text error" data-v-9f3086be>${ssrInterpolate(formError.value)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="field-block" data-v-9f3086be><label class="field-label" data-v-9f3086be>Cliente</label><div class="search-box" data-v-9f3086be><input${ssrRenderAttr("value", customerSearch.value)} type="text" placeholder="Buscar cliente" class="search-input" data-v-9f3086be><span class="search-icon" data-v-9f3086be>🔍</span></div>`);
				if (selectedCustomer.value) _push(`<p class="selected-pill" data-v-9f3086be>${ssrInterpolate(unref(customerFullName)(selectedCustomer.value.person))} <button class="clear-btn" data-v-9f3086be> ✕ </button></p>`);
				else {
					_push(`<div class="pick-list" data-v-9f3086be>`);
					if (customersLoading.value) _push(`<p class="state-text" data-v-9f3086be> Cargando clientes… </p>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList(filteredCustomers.value, (c) => {
						_push(`<button class="pick-item" data-v-9f3086be>${ssrInterpolate(unref(customerFullName)(c.person))}</button>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</div><div class="field-block" data-v-9f3086be><label class="field-label" data-v-9f3086be>Distribuidora destino</label><div class="search-box" data-v-9f3086be><input${ssrRenderAttr("value", candidateSearch.value)} type="text" placeholder="Buscar distribuidora" class="search-input" data-v-9f3086be><span class="search-icon" data-v-9f3086be>🔍</span></div>`);
				if (selectedDestination.value) _push(`<p class="selected-pill" data-v-9f3086be>${ssrInterpolate(selectedDestination.value.name || selectedDestination.value.distributor_number)} <button class="clear-btn" data-v-9f3086be> ✕ </button></p>`);
				else {
					_push(`<div class="pick-list" data-v-9f3086be>`);
					if (candidatesLoading.value) _push(`<p class="state-text" data-v-9f3086be> Buscando… </p>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList(candidates.value, (d) => {
						_push(`<button class="pick-item" data-v-9f3086be>${ssrInterpolate(d.name || d.distributor_number)}</button>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</div><div class="field-block" data-v-9f3086be><label class="field-label" data-v-9f3086be>Motivo (opcional)</label><textarea class="textarea-input" rows="3" placeholder="¿Por qué se transfiere el cliente?" data-v-9f3086be>${ssrInterpolate(requestReason.value)}</textarea></div><button class="submit-btn"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-9f3086be>${ssrInterpolate(submitting.value ? "Enviando…" : "Enviar solicitud")}</button></div>`);
			} else {
				_push(`<div class="section" data-v-9f3086be>`);
				if (actionError.value) _push(`<p class="state-text error" data-v-9f3086be>${ssrInterpolate(actionError.value)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="filter-switch" data-v-9f3086be><button class="${ssrRenderClass([{ active: transferFilter.value === "incoming" }, "filter-btn"])}" data-v-9f3086be> Clientes que quieren venir conmigo `);
				if (incomingData.value.meta.total) _push(`<span class="filter-count" data-v-9f3086be>${ssrInterpolate(incomingData.value.meta.total)}</span>`);
				else _push(`<!---->`);
				_push(`</button><button class="${ssrRenderClass([{ active: transferFilter.value === "outgoing" }, "filter-btn"])}" data-v-9f3086be> Clientes que envié a otra distribuidora `);
				if (outgoingData.value.meta.total) _push(`<span class="filter-count" data-v-9f3086be>${ssrInterpolate(outgoingData.value.meta.total)}</span>`);
				else _push(`<!---->`);
				_push(`</button></div>`);
				if (transferFilter.value === "incoming") {
					_push(`<!--[-->`);
					if (!transfersLoading.value && incoming.value.length === 0) _push(`<p class="state-text" data-v-9f3086be> No tienes solicitudes de transferencia pendientes. </p>`);
					else {
						_push(`<div class="transfer-list" data-v-9f3086be><!--[-->`);
						ssrRenderList(incoming.value, (item) => {
							_push(`<div class="transfer-card" data-v-9f3086be><div class="transfer-card-header" data-v-9f3086be><span class="transfer-customer" data-v-9f3086be>${ssrInterpolate(unref(customerFullName)(item.customer?.person))}</span><span class="${ssrRenderClass([statusBadgeClass(item.status), "status-badge"])}" data-v-9f3086be>${ssrInterpolate(INCOMING_STATUS_LABELS[item.status])}</span></div><p class="transfer-meta" data-v-9f3086be> Origen: ${ssrInterpolate(item.source_distributor?.distributor_number ?? `#${item.source_distributor_id}`)}</p>`);
							if (item.status === "PENDIENTE_DESTINO") _push(`<div class="transfer-actions" data-v-9f3086be><button class="action-btn accept"${ssrIncludeBooleanAttr(actingId.value === item.id) ? " disabled" : ""} data-v-9f3086be> Aceptar </button><button class="action-btn reject"${ssrIncludeBooleanAttr(actingId.value === item.id) ? " disabled" : ""} data-v-9f3086be> Rechazar </button></div>`);
							else if (item.status === "AUTORIZADA") _push(`<div class="transfer-actions" data-v-9f3086be><button class="action-btn accept"${ssrIncludeBooleanAttr(actingId.value === item.id) ? " disabled" : ""} data-v-9f3086be> Aceptar cliente </button></div>`);
							else _push(`<!---->`);
							_push(`</div>`);
						});
						_push(`<!--]--></div>`);
					}
					if (incomingData.value.meta.last_page > 1) _push(`<div class="paginator" data-v-9f3086be><button class="page-btn"${ssrIncludeBooleanAttr(incomingPage.value <= 1) ? " disabled" : ""} data-v-9f3086be> ← Anterior </button><span class="page-label" data-v-9f3086be>Página ${ssrInterpolate(incomingData.value.meta.current_page)} de ${ssrInterpolate(incomingData.value.meta.last_page)}</span><button class="page-btn"${ssrIncludeBooleanAttr(incomingPage.value >= incomingData.value.meta.last_page) ? " disabled" : ""} data-v-9f3086be> Siguiente → </button></div>`);
					else _push(`<!---->`);
					_push(`<!--]-->`);
				} else {
					_push(`<!--[-->`);
					if (!transfersLoading.value && outgoing.value.length === 0) _push(`<p class="state-text" data-v-9f3086be> No has solicitado transferir clientes. </p>`);
					else {
						_push(`<div class="transfer-list" data-v-9f3086be><!--[-->`);
						ssrRenderList(outgoing.value, (item) => {
							_push(`<div class="transfer-card" data-v-9f3086be><div class="transfer-card-header" data-v-9f3086be><span class="transfer-customer" data-v-9f3086be>${ssrInterpolate(unref(customerFullName)(item.customer?.person))}</span><span class="${ssrRenderClass([statusBadgeClass(item.status), "status-badge"])}" data-v-9f3086be>${ssrInterpolate(unref(CUSTOMER_TRANSFER_STATUS_LABELS)[item.status])}</span></div><p class="transfer-meta" data-v-9f3086be> Destino: ${ssrInterpolate(item.destination_distributor?.distributor_number ?? `#${item.destination_distributor_id}`)}</p>`);
							if (item.rejection_reason) _push(`<p class="transfer-meta reason" data-v-9f3086be> Motivo del rechazo: ${ssrInterpolate(item.rejection_reason)}</p>`);
							else _push(`<!---->`);
							if (["PENDIENTE_DESTINO", "PENDIENTE_COORDINADOR"].includes(item.status)) _push(`<div class="transfer-actions" data-v-9f3086be><button class="action-btn reject"${ssrIncludeBooleanAttr(actingId.value === item.id) ? " disabled" : ""} data-v-9f3086be> Cancelar solicitud </button></div>`);
							else _push(`<!---->`);
							_push(`</div>`);
						});
						_push(`<!--]--></div>`);
					}
					if (outgoingData.value.meta.last_page > 1) _push(`<div class="paginator" data-v-9f3086be><button class="page-btn"${ssrIncludeBooleanAttr(outgoingPage.value <= 1) ? " disabled" : ""} data-v-9f3086be> ← Anterior </button><span class="page-label" data-v-9f3086be>Página ${ssrInterpolate(outgoingData.value.meta.current_page)} de ${ssrInterpolate(outgoingData.value.meta.last_page)}</span><button class="page-btn"${ssrIncludeBooleanAttr(outgoingPage.value >= outgoingData.value.meta.last_page) ? " disabled" : ""} data-v-9f3086be> Siguiente → </button></div>`);
					else _push(`<!---->`);
					_push(`<!--]-->`);
				}
				_push(`</div>`);
			}
			_push(`</div></div>`);
			if (rejectModalOpen.value) _push(`<div class="modal-backdrop" data-v-9f3086be><div class="modal-card" data-v-9f3086be><div class="modal-header" data-v-9f3086be><h2 class="modal-title" data-v-9f3086be> Rechazar transferencia </h2><button class="modal-close" data-v-9f3086be> ✕ </button></div><p class="modal-subtitle" data-v-9f3086be> Cuéntale a la distribuidora origen por qué rechazas a <strong data-v-9f3086be>${ssrInterpolate(unref(customerFullName)(rejectingItem.value?.customer?.person))}</strong>. </p><label class="field-label" data-v-9f3086be>Motivo del rechazo</label><textarea class="textarea-input" rows="4" placeholder="Escribe el motivo…" autofocus data-v-9f3086be>${ssrInterpolate(rejectReason.value)}</textarea><div class="modal-actions" data-v-9f3086be><button class="modal-btn ghost"${ssrIncludeBooleanAttr(rejectSubmitting.value) ? " disabled" : ""} data-v-9f3086be> Cancelar </button><button class="modal-btn danger"${ssrIncludeBooleanAttr(rejectSubmitting.value || !rejectReason.value.trim()) ? " disabled" : ""} data-v-9f3086be>${ssrInterpolate(rejectSubmitting.value ? "Rechazando…" : "Rechazar solicitud")}</button></div></div></div>`);
			else _push(`<!---->`);
			_push(`</main>`);
		};
	}
});
//#endregion
//#region app/pages/distributor-portal/transferencias/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor-portal/transferencias/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var transferencias_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-9f3086be"]]);

export { transferencias_default as default };
//# sourceMappingURL=transferencias-DUW_FHb8.mjs.map
