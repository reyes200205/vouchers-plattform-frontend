import { aj as useAuth, $ as $fetch$2, aJ as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useCustomers.ts
function useCustomers() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listCustomers(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/customers`, {
			headers: authHeaders(),
			query: params
		})).data;
	}
	async function createCustomer(payload) {
		return (await $fetch$2(`${config.public.apiBase}/customers`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	return {
		listCustomers,
		createCustomer
	};
}
function customerFullName(person) {
	if (!person) return "Sin nombre";
	return [
		person.first_name,
		person.middle_name,
		person.last_name,
		person.second_last_name
	].filter(Boolean).join(" ");
}

export { customerFullName as c, useCustomers as u };
//# sourceMappingURL=useCustomers-DFzHFYKe.mjs.map
