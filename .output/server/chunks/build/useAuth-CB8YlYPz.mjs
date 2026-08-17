import { ap as useCookie, $ as $fetch$2, aK as useRuntimeConfig } from '../virtual/entry.mjs';
import { computed } from 'vue';

//#region app/composables/useAuth.ts
var ROLE_ROUTES = {
	administrator: "/general",
	general_manager: "/general",
	branch_manager: "/general",
	cashier: "/general",
	distributor: "/distributor-portal",
	coordinator: "/registro-verificacion",
	verifier: "/registro-verificacion"
};
function useAuth() {
	const config = useRuntimeConfig();
	const token = useCookie("auth_token", { default: () => null });
	const user = useCookie("auth_user", { default: () => null });
	function primaryRole(candidate) {
		if (!candidate?.roles?.length) return null;
		return candidate.roles.find((role) => role.is_primary) ?? candidate.roles[0];
	}
	const roleCode = computed(() => primaryRole(user.value)?.code ?? null);
	const roleName = computed(() => primaryRole(user.value)?.name ?? null);
	const isLoggedIn = computed(() => Boolean(token.value));
	async function login(username, password) {
		const response = await $fetch$2(`${config.public.apiBase}/auth/login`, {
			method: "POST",
			body: {
				username,
				password
			}
		});
		token.value = response.data.token;
		user.value = response.data.user;
		return primaryRole(response.data.user)?.code ?? null;
	}
	async function logout() {
		if (token.value) try {
			await $fetch$2(`${config.public.apiBase}/auth/logout`, {
				method: "POST",
				headers: { Authorization: `Bearer ${token.value}` }
			});
		} catch {}
		token.value = null;
		user.value = null;
	}
	function roleHome(code) {
		return code && ROLE_ROUTES[code] ? ROLE_ROUTES[code] : "/login";
	}
	return {
		token,
		user,
		roleCode,
		roleName,
		isLoggedIn,
		login,
		logout,
		roleHome
	};
}

export { useAuth as u };
//# sourceMappingURL=useAuth-CB8YlYPz.mjs.map
