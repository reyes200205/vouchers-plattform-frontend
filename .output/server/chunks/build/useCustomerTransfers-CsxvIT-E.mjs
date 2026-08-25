import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useCustomerTransfers.ts
function useCustomerTransfers() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listTransferCandidates(search) {
		return (await $fetch$2(`${config.public.apiBase}/distributor/transfer-candidates`, {
			headers: authHeaders(),
			query: search ? { search } : {}
		})).data;
	}
	async function requestTransfer(customerId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/customers/${customerId}/transfer-requests`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function listDistributorTransfers(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/distributor/customer-transfer-requests`, {
			headers: authHeaders(),
			query: {
				per_page: 50,
				direction: "incoming",
				...params
			}
		})).data;
	}
	async function listCoordinatorTransfers(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/customer-transfer-requests`, {
			headers: authHeaders(),
			query: {
				per_page: 50,
				...params
			}
		})).data;
	}
	async function respondToTransfer(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/customer-transfer-requests/${id}/respond`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function decideTransferAsCoordinator(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/customer-transfer-requests/${id}/decision`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function acceptClient(id) {
		return (await $fetch$2(`${config.public.apiBase}/customer-transfer-requests/${id}/accept-client`, {
			method: "POST",
			headers: authHeaders()
		})).data;
	}
	async function cancelTransfer(id) {
		return (await $fetch$2(`${config.public.apiBase}/customer-transfer-requests/${id}/cancel`, {
			method: "POST",
			headers: authHeaders()
		})).data;
	}
	return {
		listTransferCandidates,
		requestTransfer,
		listDistributorTransfers,
		listCoordinatorTransfers,
		respondToTransfer,
		decideTransferAsCoordinator,
		acceptClient,
		cancelTransfer
	};
}
var CUSTOMER_TRANSFER_STATUS_LABELS = {
	PENDIENTE_DESTINO: "Esperando respuesta de la distribuidora destino",
	RECHAZADA_DESTINO: "Rechazada por la distribuidora destino",
	PENDIENTE_COORDINADOR: "Esperando autorización del coordinador",
	RECHAZADA_COORDINADOR: "Rechazada por el coordinador",
	AUTORIZADA: "Autorizada, esperando que la distribuidora destino acepte al cliente",
	EJECUTADA: "Completada",
	CANCELADA: "Cancelada"
};

export { CUSTOMER_TRANSFER_STATUS_LABELS as C, useCustomerTransfers as u };
//# sourceMappingURL=useCustomerTransfers-CsxvIT-E.mjs.map
