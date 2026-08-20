import type { CustomerChangeRequest, PaginatedData } from '~/types'

export type CustomerStatus = 'EN_VERIFICACION' | 'ACTIVO' | 'BLOQUEADO' | 'MOROSO' | 'INACTIVO'

export interface CustomerPerson {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  second_last_name: string | null
  gender?: string | null
  birth_date?: string | null
  curp: string | null
  rfc: string | null
  home_phone?: string | null
  mobile_phone: string | null
  email: string | null
  street: string | null
  external_number?: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  postal_code?: string | null
}

export interface CustomerBranchRef {
  id: number
  name: string
}

export interface Customer {
  id: number
  customer_code: string
  status: CustomerStatus | null
  verified_at: string | null
  verified_by_user_id: number | null
  bank_account: string | null
  bank_clabe: string | null
  account_holder_name: string | null
  notes: string | null
  person: CustomerPerson | null
  branch: CustomerBranchRef | null
  created_at: string | null
  updated_at: string | null
}

export interface CreateCustomerPersonPayload {
  first_name: string
  middle_name?: string
  last_name: string
  second_last_name?: string
  gender?: 'M' | 'F' | 'OTHER'
  birth_date?: string
  curp: string
  rfc?: string
  home_phone?: string
  mobile_phone?: string
  email?: string
  street?: string
  external_number?: string
  neighborhood?: string
  city?: string
  state?: string
  postal_code?: string
  notes?: string
}

export interface CreateCustomerPayload {
  person: CreateCustomerPersonPayload
  bank_account?: string
  bank_clabe?: string
  account_holder_name?: string
  notes?: string
}

export interface CustomerListParams {
  status?: CustomerStatus
  verified?: boolean
  distributor_id?: number
  branch_id?: number
  per_page?: number
  page?: number
}

export interface VerifyCustomerPayload {
  notes?: string
}

export interface RequestCustomerChangePayload {
  change_type: 'IDENTITY' | 'CONTACT' | 'EVIDENCE'
  new_values: Record<string, string>
  evidence?: string[]
  notes?: string
}

export interface CustomerChangeRequestListParams {
  status?: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'
  page?: number
  per_page?: number
}

export interface DecideCustomerChangePayload {
  decision: 'APPROVE' | 'REJECT'
  rejection_reason?: string
}

interface CustomerListResponse {
  success: boolean
  message: string
  data: PaginatedData<Customer>
}

interface CustomerResponse {
  success: boolean
  message: string
  data: Customer
}

interface CustomerChangeRequestListResponse {
  success: boolean
  message: string
  data: PaginatedData<CustomerChangeRequest>
}

interface CustomerChangeRequestResponse {
  success: boolean
  message: string
  data: CustomerChangeRequest
}

export function useCustomers() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listCustomers(params: CustomerListParams = {}) {
    const response = await $fetch<CustomerListResponse>(`${config.public.apiBase}/customers`, {
      headers: authHeaders(),
      query: params
    })

    return response.data
  }

  async function createCustomer(payload: CreateCustomerPayload) {
    const response = await $fetch<CustomerResponse>(`${config.public.apiBase}/customers`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function verifyCustomer(customerId: number, payload: VerifyCustomerPayload) {
    const response = await $fetch<CustomerResponse>(`${config.public.apiBase}/customers/${customerId}/verify`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function requestCustomerChange(customerId: number, payload: RequestCustomerChangePayload) {
    const response = await $fetch<CustomerChangeRequestResponse>(`${config.public.apiBase}/customers/${customerId}/change-requests`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function listCustomerChangeRequests(params: CustomerChangeRequestListParams = {}) {
    const response = await $fetch<CustomerChangeRequestListResponse>(`${config.public.apiBase}/customer-change-requests`, {
      headers: authHeaders(),
      query: params
    })

    return response.data
  }

  async function decideCustomerChangeRequest(id: number, payload: DecideCustomerChangePayload) {
    const response = await $fetch<CustomerChangeRequestResponse>(`${config.public.apiBase}/customer-change-requests/${id}/decision`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  function fieldLabels(): Record<string, string> {
    return {
      first_name: 'Nombre(s)',
      middle_name: 'Segundo nombre',
      last_name: 'Apellido paterno',
      second_last_name: 'Apellido materno',
      curp: 'CURP',
      rfc: 'RFC',
      home_phone: 'Teléfono de casa',
      mobile_phone: 'Celular',
      email: 'Correo',
      street: 'Calle',
      external_number: 'Número exterior',
      neighborhood: 'Colonia',
      city: 'Ciudad',
      state: 'Estado',
      postal_code: 'C.P.'
    }
  }

  return {
    listCustomers,
    createCustomer,
    verifyCustomer,
    requestCustomerChange,
    listCustomerChangeRequests,
    decideCustomerChangeRequest,
    fieldLabels
  }
}

export function customerFullName(person: CustomerPerson | null | undefined): string {
  if (!person) return 'Sin nombre'
  return [person.first_name, person.middle_name, person.last_name, person.second_last_name]
    .filter(Boolean)
    .join(' ')
}
