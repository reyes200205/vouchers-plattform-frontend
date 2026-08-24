import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useDistributors.ts
function distributorFullName(distributor) {
	const person = distributor.person;
	if (!person) return "Sin nombre";
	return [
		person.first_name,
		person.middle_name,
		person.last_name,
		person.second_last_name
	].filter(Boolean).join(" ") || "Sin nombre";
}
function coordinatorFullName(coordinator) {
	if (!coordinator) return "—";
	const person = coordinator.person;
	if (!person) return coordinator.username || "—";
	return [
		person.first_name,
		person.middle_name,
		person.last_name,
		person.second_last_name
	].filter(Boolean).join(" ") || coordinator.username || "—";
}
function useDistributors() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	async function listDistributors(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/distributors`, {
			headers: { Authorization: `Bearer ${token.value}` },
			query: {
				per_page: 15,
				...params
			}
		})).data;
	}
	return { listDistributors };
}

export { coordinatorFullName as c, distributorFullName as d, useDistributors as u };
//# sourceMappingURL=useDistributors-MT7zva9s.mjs.map
