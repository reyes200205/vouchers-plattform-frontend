import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useVouchers.ts
function useVouchers() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listVouchers(params) {
		const search = new URLSearchParams();
		if (params?.status) search.set("status", params.status);
		if (params?.page) search.set("page", String(params.page));
		search.set("per_page", "15");
		return (await $fetch$2(`${config.public.apiBase}/vouchers?${search.toString()}`, { headers: authHeaders() })).data;
	}
	async function disburseVoucher(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/vouchers/${id}/disburse`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function listPendingVoucherRequests(params) {
		const search = new URLSearchParams();
		if (params?.page) search.set("page", String(params.page));
		search.set("per_page", "15");
		return (await $fetch$2(`${config.public.apiBase}/voucher-requests?${search.toString()}`, { headers: authHeaders() })).data;
	}
	async function approveVoucherRequest(id, payload = {}) {
		return (await $fetch$2(`${config.public.apiBase}/voucher-requests/${id}/approve`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function rejectVoucherRequest(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/voucher-requests/${id}/reject`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function listMyVouchers(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/distributor/vouchers`, {
			headers: authHeaders(),
			query: params
		})).data;
	}
	async function listMyVoucherRequests(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/distributor/voucher-requests`, {
			headers: authHeaders(),
			query: params
		})).data;
	}
	async function preIssueVoucher(payload) {
		return (await $fetch$2(`${config.public.apiBase}/vouchers`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	return {
		listVouchers,
		disburseVoucher,
		listPendingVoucherRequests,
		approveVoucherRequest,
		rejectVoucherRequest,
		listMyVouchers,
		listMyVoucherRequests,
		preIssueVoucher
	};
}

export { useVouchers as u };
//# sourceMappingURL=useVouchers-hob04OlF.mjs.map
