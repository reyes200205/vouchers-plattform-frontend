import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useCategories.ts
function useCategories() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listBranchCategories(branchId) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/categories`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: { per_page: 50 }
		})).data;
	}
	async function createCategory(branchId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/categories`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function updateCategory(branchId, categoryId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/categories/${categoryId}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function moveCategory(categoryId, targetBranchId) {
		return (await $fetch$2(`${config.public.apiBase}/distributor-categories/${categoryId}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: { branch_id: targetBranchId }
		})).data;
	}
	return {
		listBranchCategories,
		createCategory,
		updateCategory,
		moveCategory
	};
}

export { useCategories as u };
//# sourceMappingURL=useCategories-S_nahDzB.mjs.map
