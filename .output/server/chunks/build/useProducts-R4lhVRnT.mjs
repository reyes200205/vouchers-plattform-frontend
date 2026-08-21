import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useProducts.ts
function useProducts() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listBranchProducts(branchId, params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/products`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: params
		})).data;
	}
	async function createProduct(branchId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/products`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function updateProduct(branchId, productId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/branches/${branchId}/products/${productId}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function listCategories() {
		return (await $fetch$2(`${config.public.apiBase}/distributor-categories`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: {
				per_page: 50,
				is_active: true
			}
		})).data.data;
	}
	return {
		listBranchProducts,
		createProduct,
		updateProduct,
		listCategories
	};
}

export { useProducts as u };
//# sourceMappingURL=useProducts-R4lhVRnT.mjs.map
