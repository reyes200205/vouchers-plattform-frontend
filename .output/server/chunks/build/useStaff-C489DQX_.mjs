import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useStaff.ts
function useStaff() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listStaff(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/staff`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: params
		})).data;
	}
	async function listSystemRoles() {
		return (await $fetch$2(`${config.public.apiBase}/system/roles`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: { per_page: 50 }
		})).data.data;
	}
	async function createStaff(payload) {
		return (await $fetch$2(`${config.public.apiBase}/staff`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function updateStaff(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/staff/${id}`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${token.value}` },
			body: payload
		})).data;
	}
	async function getStaff(id) {
		return (await $fetch$2(`${config.public.apiBase}/staff/${id}`, { headers: { Authorization: `Bearer ${token.value}` } })).data;
	}
	return {
		listStaff,
		listSystemRoles,
		createStaff,
		updateStaff,
		getStaff
	};
}

export { useStaff as u };
//# sourceMappingURL=useStaff-C489DQX_.mjs.map
