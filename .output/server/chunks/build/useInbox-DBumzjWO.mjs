import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useInbox.ts
function useInbox() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listInbox(tab, branchId) {
		const params = new URLSearchParams();
		if (tab) params.set("tab", tab);
		if (branchId) params.set("branch_id", String(branchId));
		const query = params.toString() ? `?${params.toString()}` : "";
		return (await $fetch$2(`${config.public.apiBase}/general/inbox${query}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function counts(branchId) {
		const data = await listInbox(void 0, branchId);
		return {
			applications: data.applications?.total ?? 0,
			credit_increases: data.credit_increases?.total ?? 0,
			redemptions: data.redemptions?.total ?? 0
		};
	}
	async function decideApplication(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/applications/${id}/decision`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function decideCreditIncrease(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/credit-increase-requests/${id}/decision`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function decideRedemption(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/point-redemptions/${id}/decision`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	return {
		listInbox,
		counts,
		decideApplication,
		decideCreditIncrease,
		decideRedemption
	};
}

export { useInbox as u };
//# sourceMappingURL=useInbox-DBumzjWO.mjs.map
