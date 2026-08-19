import { aj as useAuth, $ as $fetch$2, aJ as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useVouchers.ts
function useVouchers() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listMyVouchers(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/distributor/vouchers`, {
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
		listMyVouchers,
		preIssueVoucher
	};
}

export { useVouchers as u };
//# sourceMappingURL=useVouchers-BbvKdRKb.mjs.map
