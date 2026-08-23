import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useReconciliations.ts
function useReconciliations() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listBankTransactions(params) {
		const search = new URLSearchParams();
		if (params?.reconciled) search.set("reconciled", params.reconciled === "yes" ? "1" : "0");
		if (params?.reference) search.set("reference", params.reference);
		if (params?.page) search.set("page", String(params.page));
		search.set("per_page", "15");
		const query = search.toString();
		return (await $fetch$2(`${config.public.apiBase}/reconciliations/bank-transactions${query ? `?${query}` : ""}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function listCutoffs(params) {
		const search = new URLSearchParams();
		search.set("page", String(params?.page ?? 1));
		search.set("per_page", String(params?.per_page ?? 50));
		if (params?.status) search.set("status", params.status);
		return (await $fetch$2(`${config.public.apiBase}/cutoffs?${search.toString()}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function getCutoff(cutoffId) {
		return (await $fetch$2(`${config.public.apiBase}/cutoffs/${cutoffId}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function listCutoffRelations(cutoffId) {
		return (await getCutoff(cutoffId)).relations ?? [];
	}
	async function generateCutoff(branchId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/cutoffs/generate`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function reprocessCutoff(cutoffId) {
		return (await $fetch$2(`${config.public.apiBase}/cutoffs/${cutoffId}/reprocess`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` }
		})).data;
	}
	async function closeCutoff(cutoffId) {
		return (await $fetch$2(`${config.public.apiBase}/cutoffs/${cutoffId}/close`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` }
		})).data;
	}
	async function manualMatch(bankTransactionId, payload) {
		await $fetch$2(`${config.public.apiBase}/reconciliations/bank-transactions/${bankTransactionId}/manual-match`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		});
	}
	async function listReconciliations(params) {
		const search = new URLSearchParams();
		if (params?.pending_verification) search.set("pending_verification", "1");
		if (params?.status) search.set("status", params.status);
		if (params?.page) search.set("page", String(params.page));
		search.set("per_page", "15");
		return (await $fetch$2(`${config.public.apiBase}/reconciliations${search.toString() ? `?${search.toString()}` : ""}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function verifyReconciliation(id) {
		await $fetch$2(`${config.public.apiBase}/reconciliations/${id}/verify`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` }
		});
	}
	async function importBankDeposits(branchId, file) {
		const formData = new FormData();
		formData.append("file", file);
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/reconciliations/import`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: formData
		})).data;
	}
	return {
		listBankTransactions,
		listCutoffs,
		getCutoff,
		listCutoffRelations,
		generateCutoff,
		reprocessCutoff,
		closeCutoff,
		manualMatch,
		listReconciliations,
		verifyReconciliation,
		importBankDeposits
	};
}

export { useReconciliations as u };
//# sourceMappingURL=useReconciliations-CownVbwc.mjs.map
