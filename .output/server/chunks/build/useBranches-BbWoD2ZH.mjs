import { $ as $fetch$2, aH as useRuntimeConfig } from '../virtual/entry.mjs';
import { u as useAuth } from './useAuth-B7H4jTnU.mjs';

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
		createBranch,
		updateBranch
	};
}

export { useBranches as u };
//# sourceMappingURL=useBranches-BbWoD2ZH.mjs.map
