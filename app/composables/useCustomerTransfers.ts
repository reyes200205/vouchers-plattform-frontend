import type { PaginatedData } from '~/types'
import type { CustomerBranchRef, CustomerPerson } from '~/composables/useCustomers'

export type CustomerTransferStatus
  = | 'PENDIENTE_DESTINO'
    | 'RECHAZADA_DESTINO'
    | 'PENDIENTE_COORDINADOR'
    | 'RECHAZADA_COORDINADOR'
    | 'AUTORIZADA'
    | 'EJECUTADA'
    | 'CANCELADA'

export interface CustomerTransferCustomerRef {
  id: number
  customer_code: string
  status: string | null
  person: CustomerPerson | null
  branch: CustomerBranchRef | null
}

export interface CustomerTransferDistributorRef {
  id: number
  distributor_number: string
  person: { first_name: string | null, last_name: string | null } | null
}

// Shape de App\Http\Resources\CustomerTransferRequestResource, consumido por
// GET /distributor/customer-transfer-requests (distribuidora) y
// GET /customer-transfer-requests (coordinador/gerente).
export interface CustomerTransferRequest {
  id: number
  customer_id: number
  source_distributor_id: number
  destination_distributor_id: number
  requested_by_user_id: number
  destination_decided_by_user_id: number | null
  destination_decided_at: string | null
  coordinator_user_id: number | null
  coordinator_decided_at: string | null
  finalized_by_user_id: number | null
  status: CustomerTransferStatus
  request_reason: string | null
  rejection_reason: string | null
  comments: string | null
  executed_at: string | null
  created_at: string | null
  updated_at: string | null
  customer: CustomerTransferCustomerRef | null
  source_distributor: CustomerTransferDistributorRef | null
  destination_distributor: CustomerTransferDistributorRef | null
}

export interface TransferCandidateDistributor {
  id: number
  distributor_number: string
  name: string | null
  branch_id: number | null
}

export interface TransferListParams {
  direction?: 'incoming' | 'outgoing'
  status?: CustomerTransferStatus
  per_page?: number
  page?: number
}

export interface RequestTransferPayload {
  destination_distributor_id: number
  request_reason?: string
}

export interface RespondTransferPayload {
  decision: 'ACCEPT' | 'REJECT'
  rejection_reason?: string
}

export interface DecideTransferPayload {
  decision: 'APPROVE' | 'REJECT'
  comments?: string
  rejection_reason?: string
}

interface TransferListResponse {
  success: boolean
  message: string
  data: PaginatedData<CustomerTransferRequest>
}

interface TransferResponse {
  success: boolean
  message: string
  data: CustomerTransferRequest
}

interface TransferCandidatesResponse {
  success: boolean
  message: string
  data: TransferCandidateDistributor[]
}

export function useCustomerTransfers() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listTransferCandidates(search?: string) {
    const response = await $fetch<TransferCandidatesResponse>(`${config.public.apiBase}/distributor/transfer-candidates`, {
      headers: authHeaders(),
      query: search ? { search } : {}
    })

    return response.data
  }

  async function requestTransfer(customerId: number, payload: RequestTransferPayload) {
    const response = await $fetch<TransferResponse>(`${config.public.apiBase}/customers/${customerId}/transfer-requests`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  // Listado para la distribuidora: direction 'incoming' = solicitudes donde
  // soy la destino (para aceptar/rechazar o aceptar cliente), 'outgoing' =
  // solicitudes que yo inicié como origen (para dar seguimiento/cancelar).
  async function listDistributorTransfers(params: TransferListParams = {}) {
    const response = await $fetch<TransferListResponse>(`${config.public.apiBase}/distributor/customer-transfer-requests`, {
      headers: authHeaders(),
      query: { per_page: 50, direction: 'incoming', ...params }
    })

    return response.data
  }

  // Listado para coordinador/gerente: ya filtrado por sucursal en backend.
  async function listCoordinatorTransfers(params: TransferListParams = {}) {
    const response = await $fetch<TransferListResponse>(`${config.public.apiBase}/customer-transfer-requests`, {
      headers: authHeaders(),
      query: { per_page: 50, ...params }
    })

    return response.data
  }

  async function respondToTransfer(id: number, payload: RespondTransferPayload) {
    const response = await $fetch<TransferResponse>(`${config.public.apiBase}/customer-transfer-requests/${id}/respond`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function decideTransferAsCoordinator(id: number, payload: DecideTransferPayload) {
    const response = await $fetch<TransferResponse>(`${config.public.apiBase}/customer-transfer-requests/${id}/decision`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function acceptClient(id: number) {
    const response = await $fetch<TransferResponse>(`${config.public.apiBase}/customer-transfer-requests/${id}/accept-client`, {
      method: 'POST',
      headers: authHeaders()
    })

    return response.data
  }

  async function cancelTransfer(id: number) {
    const response = await $fetch<TransferResponse>(`${config.public.apiBase}/customer-transfer-requests/${id}/cancel`, {
      method: 'POST',
      headers: authHeaders()
    })

    return response.data
  }

  return {
    listTransferCandidates,
    requestTransfer,
    listDistributorTransfers,
    listCoordinatorTransfers,
    respondToTransfer,
    decideTransferAsCoordinator,
    acceptClient,
    cancelTransfer
  }
}

export const CUSTOMER_TRANSFER_STATUS_LABELS: Record<CustomerTransferStatus, string> = {
  PENDIENTE_DESTINO: 'Esperando respuesta de la distribuidora destino',
  RECHAZADA_DESTINO: 'Rechazada por la distribuidora destino',
  PENDIENTE_COORDINADOR: 'Esperando autorización del coordinador',
  RECHAZADA_COORDINADOR: 'Rechazada por el coordinador',
  AUTORIZADA: 'Autorizada, esperando que la distribuidora destino acepte al cliente',
  EJECUTADA: 'Completada',
  CANCELADA: 'Cancelada'
}
