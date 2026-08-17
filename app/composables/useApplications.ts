import type { Application } from '~/types'

export interface ListApplicationsParams {
  branch_id?: number
  status?: string
  per_page?: number
}

interface ApplicationsListResponse {
  success: boolean
  message: string
  data: {
    data: Application[]
    meta?: { current_page: number, last_page: number, total: number }
  }
}

interface ApplicationResponse {
  success: boolean
  message: string
  data: Application
}

// Nota: el backend (vouchers-platform-api) no expone GET /applications/{id};
// el detalle de una solicitud se obtiene del listado (GET /applications).

export interface SubmitVerificationPayload {
  result: 'VERIFICADA' | 'RECHAZADA'
  notes?: string
  visit_date: string
  verification_latitude?: number
  verification_longitude?: number
  distance_meters?: number
}

export function useApplications() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listApplications(params: ListApplicationsParams = {}) {
    const response = await $fetch<ApplicationsListResponse>(`${config.public.apiBase}/applications`, {
      headers: authHeaders(),
      query: params
    })

    return response.data.data
  }

  async function submitVerification(applicationId: number, payload: SubmitVerificationPayload) {
    const response = await $fetch<ApplicationResponse>(`${config.public.apiBase}/applications/${applicationId}/verification`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  return { listApplications, submitVerification }
}
