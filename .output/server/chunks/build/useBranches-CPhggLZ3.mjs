import { aj as useAuth, $ as $fetch$2, aJ as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useBranches.ts
function useBranches() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listBranches() {
		return (await $fetch$2(`${config.public.apiBase}/branches`, { headers: { Authorization: `Bearer ${token.value}` } })).data.data;
	}
	async function listAvailableManagers() {
		return (await $fetch$2(`${config.public.apiBase}/branches/available-managers`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function listVerifiers(branchId) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/verifiers`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function createBranch(payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function updateBranch(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${id}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	return {
		listBranches,
		listAvailableManagers,
		listVerifiers,
		createBranch,
		updateBranch
	};
}

export { useBranches as u };
//# sourceMappingURL=useBranches-CPhggLZ3.mjs.map
