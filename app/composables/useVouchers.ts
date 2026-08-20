import type { CustomerPerson } from '~/composables/useCustomers'
import type { PaginatedData, PendingVoucherRequest, Voucher as VoucherRecord } from '~/types'

export type VoucherStatus
  = | 'BORRADOR'
    | 'APROBADO'
    | 'TRANSFERIDO'
    | 'ACTIVO'
    | 'PAGO_PARCIAL'
    | 'PAGADO'
    | 'LIQUIDADO'
    | 'MOROSO'
    | 'RECLAMADO'
    | 'CANCELADO'
    | 'REVERSADO'

export type VoucherRequestStatus = 'PENDIENTE' | 'APROBADO' | 'RECHAZADO' | 'CANCELADO'

export interface VoucherCustomerRef {
  id: number
  customer_code: string
  person: CustomerPerson | null
}

export interface Voucher {
  id: number
  voucher_number: string | null
  distributor_id: number
  customer_id: number
  financial_product_id: number
  voucher_request_id: number | null
  branch_id: number
  status: VoucherStatus | null
  is_pre_vale: boolean
  amount: string
  total_debt_amount: string
  fortnightly_payment_amount: string
  total_fortnights: number
  payments_made: number
  current_balance: string
  issued_at: string | null
  payment_due_date: string | null
  is_canceled: boolean
  notes: string | null
  created_at: string | null
  customer: VoucherCustomerRef | null
}

export interface VoucherSnapshot {
  principal: number
  company_commission_percentage_snapshot: number
  company_commission_amount: number
  insurance_amount_snapshot: number
  interest_percentage_snapshot: number
  interest_amount: number
  late_fee_amount_snapshot: number
  distributor_profit_percentage_snapshot: number
  distributor_profit_amount: number
  total_debt_amount: number
  fortnightly_payment_amount: number
  total_fortnights: number
}

export interface VoucherRequest {
  id: number
  distributor_id: number
  customer_id: number
  financial_product_id: number
  branch_id: number
  requested_amount: string
  is_pre_vale: boolean
  status: VoucherRequestStatus
  rejection_reason: string | null
  snapshot: VoucherSnapshot
  created_at: string | null
  customer: VoucherCustomerRef | null
  financial_product: {
    id: number
    code: string
    name: string
    principal_amount: string
  } | null
}

export interface VoucherListParams {
  status?: VoucherStatus
  per_page?: number
  page?: number
}

interface VoucherListResponse {
  success: boolean
  message: string
  data: {
    data: Voucher[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

interface VoucherRequestResponse {
  success: boolean
  message: string
  data: VoucherRequest
}

export interface VoucherRequestListParams {
  status?: VoucherRequestStatus
  per_page?: number
  page?: number
}

interface VoucherRequestListResponse {
  success: boolean
  message: string
  data: {
    data: VoucherRequest[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

export interface PreIssueVoucherPayload {
  customer_id: number
  financial_product_id: number
  notes?: string
}

// Listado general de vales emitidos (cajera/coordinador/gerente, vía GET
// /vouchers) y entrega del vale por la cajera (POST /vouchers/{id}/disburse).
// Usa el tipo Voucher "completo" de ~/types (incluye distribuidora y estado
// de verificación del cliente), a diferencia del Voucher local de este
// archivo que es el que consume el portal de la distribuidora.
interface VouchersListResponse {
  success: boolean
  message: string
  data: PaginatedData<VoucherRecord>
}

interface VoucherRecordResponse {
  success: boolean
  message: string
  data: VoucherRecord
}

export interface DisburseVoucherPayload {
  transfer_reference: string
  authorized_number: string
  notes?: string
}

// Apartado "Solicitudes de vale" (gerentes): listado y decision de las
// solicitudes que las distribuidoras mandan desde "Configurar vale", antes
// de que se conviertan en un Voucher real (ver PendingVoucherRequestResource
// / CoordinatorVoucherController::pendingRequests en el backend).
interface PendingVoucherRequestsResponse {
  success: boolean
  message: string
  data: PaginatedData<PendingVoucherRequest>
}

interface DecisionResponse {
  success: boolean
  message: string
  data: unknown
}

export function useVouchers() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listVouchers(params?: { status?: string, page?: number }) {
    const search = new URLSearchParams()
    if (params?.status) search.set('status', params.status)
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', '15')

    const response = await $fetch<VouchersListResponse>(`${config.public.apiBase}/vouchers?${search.toString()}`, {
      headers: authHeaders()
    })

    return response.data
  }

  async function disburseVoucher(id: number, payload: DisburseVoucherPayload) {
    const response = await $fetch<VoucherRecordResponse>(`${config.public.apiBase}/vouchers/${id}/disburse`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function listPendingVoucherRequests(params?: { page?: number }) {
    const search = new URLSearchParams()
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', '15')

    const response = await $fetch<PendingVoucherRequestsResponse>(`${config.public.apiBase}/voucher-requests?${search.toString()}`, {
      headers: authHeaders()
    })

    return response.data
  }

  async function approveVoucherRequest(id: number, payload: { notes?: string } = {}) {
    const response = await $fetch<DecisionResponse>(`${config.public.apiBase}/voucher-requests/${id}/approve`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function rejectVoucherRequest(id: number, payload: { rejection_reason: string }) {
    const response = await $fetch<DecisionResponse>(`${config.public.apiBase}/voucher-requests/${id}/reject`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function listMyVouchers(params: VoucherListParams = {}) {
    const response = await $fetch<VoucherListResponse>(`${config.public.apiBase}/distributor/vouchers`, {
      headers: authHeaders(),
      query: params
    })

    return response.data
  }

  async function listMyVoucherRequests(params: VoucherRequestListParams = {}) {
    const response = await $fetch<VoucherRequestListResponse>(`${config.public.apiBase}/distributor/voucher-requests`, {
      headers: authHeaders(),
      query: params
    })

    return response.data
  }

  async function preIssueVoucher(payload: PreIssueVoucherPayload) {
    const response = await $fetch<VoucherRequestResponse>(`${config.public.apiBase}/vouchers`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  return {
    listMyVouchers,
    listMyVoucherRequests,
    preIssueVoucher,
    listVouchers,
    disburseVoucher,
    listPendingVoucherRequests,
    approveVoucherRequest,
    rejectVoucherRequest
  }
}
