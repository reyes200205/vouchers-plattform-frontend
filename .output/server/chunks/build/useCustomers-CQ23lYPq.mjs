import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

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
	async function verifyCustomer(customerId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/customers/${customerId}/verify`, {
			method: "PATCH",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function requestCustomerChange(customerId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/customers/${customerId}/change-requests`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function listCustomerChangeRequests(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/customer-change-requests`, {
			headers: authHeaders(),
			query: params
		})).data;
	}
	async function decideCustomerChangeRequest(id, payload) {
		return (await $fetch$2(`${config.public.apiBase}/customer-change-requests/${id}/decision`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	function fieldLabels() {
		return {
			first_name: "Nombre(s)",
			middle_name: "Segundo nombre",
			last_name: "Apellido paterno",
			second_last_name: "Apellido materno",
			curp: "CURP",
			rfc: "RFC",
			home_phone: "Teléfono de casa",
			mobile_phone: "Celular",
			email: "Correo",
			street: "Calle",
			external_number: "Número exterior",
			neighborhood: "Colonia",
			city: "Ciudad",
			state: "Estado",
			postal_code: "C.P."
		};
	}
	return {
		listCustomers,
		createCustomer,
		verifyCustomer,
		requestCustomerChange,
		listCustomerChangeRequests,
		decideCustomerChangeRequest,
		fieldLabels
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
//# sourceMappingURL=useCustomers-CQ23lYPq.mjs.map
