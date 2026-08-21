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

interface LoginSuccessData {
  user: AuthUser
  token: string
  requires_otp?: false
}

interface LoginOtpChallengeData {
  requires_otp: true
  challenge_id: string
  masked_email: string | null
}

interface LoginResponse {
  success: boolean
  message: string
  data: LoginSuccessData | LoginOtpChallengeData
}

interface MfaVerifyResponse {
  success: boolean
  message: string
  data: {
    user: AuthUser
    token: string
  }
}

interface MfaResendResponse {
  success: boolean
  message: string
  data: {
    masked_email: string | null
  }
}

export type LoginResult
  = | { requiresOtp: false, roleCode: string | null }
    | { requiresOtp: true, challengeId: string, maskedEmail: string | null }

export const ROLE_ROUTES: Record<string, string> = {
  'super-admin': '/general',
  'general_manager': '/general',
  'branch_manager': '/general',
  'cashier': '/general',
  'distributor': '/distributor-portal',
  'coordinator': '/registro-verificacion',
  'verifier': '/registro-verificacion/verificador/dashboard_verificador'
}

// Roles que deciden aprobaciones (Bandeja de Aprobaciones). En el canal
// 'public' (fuera de VPN) se les oculta esa sección aunque tengan el
// permiso inbox.view — deben entrar por la VPN para aprobar.
export const APPROVAL_RESTRICTED_ROLES = ['general_manager', 'branch_manager']

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

  async function login(username: string, password: string, turnstileToken?: string): Promise<LoginResult> {
    const response = await $fetch<LoginResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: {
        username,
        password,
        'cf-turnstile-response': turnstileToken
      }
    })

    if (response.data.requires_otp) {
      return {
        requiresOtp: true,
        challengeId: response.data.challenge_id,
        maskedEmail: response.data.masked_email
      }
    }

    token.value = response.data.token
    user.value = response.data.user

    return { requiresOtp: false, roleCode: primaryRole(response.data.user)?.code ?? null }
  }

  async function verifyMfa(challengeId: string, code: string) {
    const response = await $fetch<MfaVerifyResponse>(`${config.public.apiBase}/auth/mfa/verify`, {
      method: 'POST',
      body: { challenge_id: challengeId, code }
    })

    token.value = response.data.token
    user.value = response.data.user

    return primaryRole(response.data.user)?.code ?? null
  }

  async function resendMfa(challengeId: string) {
    const response = await $fetch<MfaResendResponse>(`${config.public.apiBase}/auth/mfa/resend`, {
      method: 'POST',
      body: { challenge_id: challengeId }
    })

    return response.data.masked_email
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

  return { token, user, roleCode, roleName, isLoggedIn, login, verifyMfa, resendMfa, logout, roleHome, fetchMe }
}
