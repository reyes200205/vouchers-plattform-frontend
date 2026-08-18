import { ai as useAuth, $ as $fetch$2, aI as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useSettings.ts
function useSettings() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listCategories() {
		return (await $fetch$2(`${config.public.apiBase}/distributor-categories`, { headers: { Authorization: `Bearer ${token.value}` } })).data.data;
	}
	async function getBranchSettings(branchId) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/settings`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function updateBranchSettings(branchId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/settings`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function getPointSettings() {
		return (await $fetch$2(`${config.public.apiBase}/point-settings`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	async function updatePointSettings(payload) {
		return (await $fetch$2(`${config.public.apiBase}/point-settings`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	return {
		listCategories,
		getBranchSettings,
		updateBranchSettings,
		getPointSettings,
		updatePointSettings
	};
}

export { useSettings as u };
//# sourceMappingURL=useSettings-CCTMa9PO.mjs.map
