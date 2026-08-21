interface AuthPerson {
  id: number
  first_name: string | null
  last_name: string | null
  email: string | null
}

interface AuthRole {
  code: string
  name: string
  branch_id: number | null
  branch_name: string | null
  is_primary: boolean
}

export interface AuthDistributor {
  id: number
  distributor_number: string
  branch_id: number | null
  status: string | null
  credit_limit: string
  available_credit: string
  unlimited_credit: boolean
  current_points: string
  can_issue_vouchers: boolean
  // Monto maximo permitido para el proximo vale por la regla del pre-vale
  // (50% del credito disponible + tolerancia), calculado por el backend.
  // null significa que la regla no aplica en este momento.
  pre_vale_max_amount: number | null
  category: { id: number, code: string, name: string, commission_percentage: string } | null
}

interface AuthUser {
  id: number
  username: string
  person: AuthPerson | null
  distributor: AuthDistributor | null
  roles: AuthRole[]
  permissions: string[]
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
  'super-admin': '/general',
  general_manager: '/general',
  branch_manager: '/general',
  cashier: '/general',
  distributor: '/distributor-portal',
  coordinator: '/registro-verificacion',
  verifier: '/registro-verificacion/verificador/dashboard_verificador'
}

export function useAuth() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token', { default: () => null })
  const user = useCookie<AuthUser | null>('auth_user', { default: () => null })

  function primaryRole(candidate: AuthUser | null) {
    if (!candidate?.roles?.length) return null
    return candidate.roles.find(role => role.is_primary) ?? candidate.roles[0]
  }

  const roleCode = computed(() => primaryRole(user.value)?.code ?? null)
  const roleName = computed(() => primaryRole(user.value)?.name ?? null)
  const isLoggedIn = computed(() => Boolean(token.value))

  async function login(username: string, password: string, turnstileToken?: string) {
    const response = await $fetch<LoginResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: {
        username,
        password,
        'cf-turnstile-response': turnstileToken
      }
    })

    token.value = response.data.token
    user.value = response.data.user

    return primaryRole(response.data.user)?.code ?? null
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

  async function fetchMe() {
    if (!token.value) return null
    try {
      const response = await $fetch<{ success: boolean, data: AuthUser }>(`${config.public.apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = response.data
      return response.data
    } catch (e) {
      console.error('Failed to fetch user profile', e)
      return null
    }
  }

  function roleHome(code: string | null) {
    return code && ROLE_ROUTES[code] ? ROLE_ROUTES[code] : '/login'
  }

  return { token, user, roleCode, roleName, isLoggedIn, login, logout, roleHome, fetchMe }
}
