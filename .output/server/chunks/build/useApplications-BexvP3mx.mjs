import { al as useAuth, $ as $fetch$2, aM as useRuntimeConfig } from '../virtual/entry.mjs';

//#region app/composables/useApplications.ts
function useApplications() {
	const config = useRuntimeConfig();
	const { token } = useAuth();
	function authHeaders() {
		return { Authorization: `Bearer ${token.value}` };
	}
	async function listApplications(params = {}) {
		return (await $fetch$2(`${config.public.apiBase}/applications`, {
			headers: authHeaders(),
			query: params
		})).data;
	}
	async function getApplication(applicationId) {
		return (await $fetch$2(`${config.public.apiBase}/applications/${applicationId}`, { headers: authHeaders() })).data;
	}
	async function createApplication(payload) {
		return (await $fetch$2(`${config.public.apiBase}/applications`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function assignVerifier(applicationId, verifierUserId) {
		return (await $fetch$2(`${config.public.apiBase}/applications/${applicationId}/verifier`, {
			method: "PATCH",
			headers: authHeaders(),
			body: { verifier_user_id: verifierUserId }
		})).data;
	}
	async function submitVerification(applicationId, payload) {
		return (await $fetch$2(`${config.public.apiBase}/applications/${applicationId}/verification`, {
			method: "POST",
			headers: authHeaders(),
			body: payload
		})).data;
	}
	async function uploadVerificationPhoto(applicationId, file, type) {
		const formData = new FormData();
		formData.append("type", type);
		formData.append("photo", file);
		return (await $fetch$2(`${config.public.apiBase}/applications/${applicationId}/verification-photos`, {
			method: "POST",
			headers: authHeaders(),
			body: formData
		})).data;
	}
	async function uploadApplicationDocument(file, type) {
		const formData = new FormData();
		formData.append("type", type);
		formData.append("document", file);
		return (await $fetch$2(`${config.public.apiBase}/applications/documents`, {
			method: "POST",
			headers: authHeaders(),
			body: formData
		})).data;
	}
	return {
		listApplications,
		getApplication,
		createApplication,
		assignVerifier,
		submitVerification,
		uploadVerificationPhoto,
		uploadApplicationDocument
	};
}
function applicantFullName(person) {
	if (!person) return "Sin nombre";
	return [
		person.first_name,
		person.middle_name,
		person.last_name,
		person.second_last_name
	].filter(Boolean).join(" ") || "Sin nombre";
}
function verifierDisplayName(verifier) {
	if (!verifier) return null;
	return [verifier.person?.first_name, verifier.person?.last_name].filter(Boolean).join(" ") || verifier.username;
}
var APPLICATION_STATUS_LABELS = {
	PRE: "Pre-registro",
	MODIFICADA: "Modificada",
	EN_REVISION: "En revisión",
	VERIFICADA: "Verificada",
	POSIBLE_DISTRIBUIDORA: "Posible distribuidora",
	APROBADA: "Aprobada",
	RECHAZADA: "Rechazada"
};

export { APPLICATION_STATUS_LABELS as A, applicantFullName as a, useApplications as u, verifierDisplayName as v };
//# sourceMappingURL=useApplications-BexvP3mx.mjs.map
