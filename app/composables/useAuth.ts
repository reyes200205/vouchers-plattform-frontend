interface AuthPerson {
  id: number
  first_name: string | null
  last_name: string | null
}

interface AuthRole {
  code: string
  name: string
}

interface AuthUser {
  id: number
  username: string
  person: AuthPerson | null
  role: AuthRole | null
  branch_id: number | null
}

interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: AuthUser
    token: string
  }
}

export const ROLE_ROUTES: Record<string, string> = {
  administrator: '/admin',
  general_manager: '/general',
  branch_manager: '/gerente-sucursal',
  coordinator: '/coordinador',
  verifier: '/verificador',
  cashier: '/cajera',
  distributor: '/distributor-portal'
}

export function useAuth() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token', { default: () => null })
  const user = useCookie<AuthUser | null>('auth_user', { default: () => null })

  const roleCode = computed(() => user.value?.role?.code ?? null)
  const isLoggedIn = computed(() => Boolean(token.value))

  async function login(username: string, password: string) {
    const response = await $fetch<LoginResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: { username, password }
    })

    token.value = response.data.token
    user.value = response.data.user

    return response.data.user.role?.code ?? null
  }

  async function logout() {
    if (token.value) {
      try {
        await $fetch(`${config.public.apiBase}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token.value}` }
        })
      } catch {
        // ignore network/auth errors on logout, still clear local session
      }
    }

    token.value = null
    user.value = null
  }

  function roleHome(code: string | null) {
    return code && ROLE_ROUTES[code] ? ROLE_ROUTES[code] : '/login'
  }

  return { token, user, roleCode, isLoggedIn, login, logout, roleHome }
}
