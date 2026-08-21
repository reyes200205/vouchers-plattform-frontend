import type { PaginatedData } from '~/types'

export type CreditIncreaseRequestStatus
  = | 'PENDIENTE'
    | 'PRE_AUTORIZADO'
    | 'APROBADO'
    | 'REDUCIDO'
    | 'RECHAZADO'
    | 'CANCELADO'

export interface CreditIncreaseDistributorRef {
  id: number
  distributor_number: string
  credit_limit: string
  available_credit: string
}

// Shape de App\Http\Resources\CreditIncreaseRequestResource, consumido por
// GET /credit-increase-requests (Coordinator\CreditIncreaseController::store
// y GeneralManager\CreditIncreaseController::index comparten el mismo listado,
// ya filtrado por sucursal del usuario autenticado).
export interface CreditIncreaseRequest {
  id: number
  distributor_id: number
  branch_id: number
  requested_by_user_id: number
  requested_amount: string
  reason: string | null
  status: CreditIncreaseRequestStatus
  pre_authorized_amount: string | null
  pre_authorized_by_user_id: number | null
  pre_authorized_at: string | null
  approved_amount: string | null
  decided_by_user_id: number | null
  decision_notes: string | null
  decided_at: string | null
  created_at: string | null
  distributor: CreditIncreaseDistributorRef | null
}

export interface CreditIncreaseListParams {
  status?: CreditIncreaseRequestStatus
  per_page?: number
  page?: number
}

interface CreditIncreaseListResponse {
  success: boolean
  message: string
  data: PaginatedData<CreditIncreaseRequest>
}

interface CreditIncreaseResponse {
  success: boolean
  message: string
  data: CreditIncreaseRequest
}

export interface PreAuthorizeCreditIncreasePayload {
  pre_authorized_amount: string | number
  decision_notes?: string
}

export interface RequestCreditIncreasePayload {
  distributor_id: number
  requested_amount: string | number
  reason?: string
}

export function useCreditIncrease() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listCreditIncreaseRequests(params: CreditIncreaseListParams = {}) {
    const response = await $fetch<CreditIncreaseListResponse>(`${config.public.apiBase}/credit-increase-requests`, {
      headers: authHeaders(),
      query: { per_page: 15, ...params }
    })

    return response.data
  }

  async function preAuthorizeCreditIncrease(id: number, payload: PreAuthorizeCreditIncreasePayload) {
    const response = await $fetch<CreditIncreaseResponse>(`${config.public.apiBase}/credit-increase-requests/${id}/pre-authorize`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function requestCreditIncrease(payload: RequestCreditIncreasePayload) {
    const response = await $fetch<CreditIncreaseResponse>(`${config.public.apiBase}/credit-increase-requests`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  return { listCreditIncreaseRequests, preAuthorizeCreditIncrease, requestCreditIncrease }
}
