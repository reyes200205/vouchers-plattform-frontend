import type { Customer, CustomerChangeRequest, PaginatedData, Person } from '~/types'

export type CustomerStatusFilter = 'PENDIENTE' | 'ACTIVO' | 'BLOQUEADO' | 'INACTIVO'

interface CustomersListResponse {
  success: boolean
  message: string
  data: PaginatedData<Customer>
}

interface CustomerResponse {
  success: boolean
  message: string
  data: Customer
}

interface ChangeRequestsResponse {
  success: boolean
  message: string
  data: PaginatedData<CustomerChangeRequest>
}

interface ChangeRequestResponse {
  success: boolean
  message: string
  data: CustomerChangeRequest
}

interface PhotoUploadResponse {
  success: boolean
  message: string
  data: {
    type: string
    url: string
  }
}

export interface VerifyCustomerPayload {
  id_front_photo?: string
  id_back_photo?: string
  id_selfie_photo?: string
  proof_of_address_photo?: string
  notes?: string
}

export type RequestedChangeFields = Partial<Pick<
  Person,
  'first_name' | 'middle_name' | 'last_name' | 'second_last_name' | 'curp' | 'rfc' |
  'home_phone' | 'mobile_phone' | 'email' | 'street' | 'external_number' | 'neighborhood' | 'city' | 'state' | 'postal_code'
>>

export interface RequestCustomerChangePayload {
  change_type: 'IDENTITY' | 'CONTACT' | 'EVIDENCE'
  new_values: RequestedChangeFields
  evidence?: string[]
  notes?: string
}

export interface DecideCustomerChangePayload {
  decision: 'APPROVE' | 'REJECT'
  rejection_reason?: string
}

const PERSON_FIELDS: (keyof Person)[] = [
  'first_name', 'middle_name', 'last_name', 'second_last_name', 'curp', 'rfc',
  'home_phone', 'mobile_phone', 'email', 'street', 'external_number', 'neighborhood', 'city', 'state', 'postal_code'
]

export function useCustomers() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listCustomers(params?: {
    status?: CustomerStatusFilter
    verified?: boolean
    branch_id?: number
    page?: number
    per_page?: number
  }) {
    const search = new URLSearchParams()
    if (params?.status) search.set('status', params.status)
    if (params?.verified !== undefined) search.set('verified', params.verified ? '1' : '0')
    if (params?.branch_id) search.set('branch_id', String(params.branch_id))
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', String(params?.per_page ?? 15))

    const response = await $fetch<CustomersListResponse>(`${config.public.apiBase}/customers?${search.toString()}`, {
      headers: authHeaders()
    })

    return response.data
  }

  async function uploadVerificationPhoto(customerId: number, type: string, file: File) {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('photo', file)

    const response = await $fetch<PhotoUploadResponse>(`${config.public.apiBase}/customers/${customerId}/verification-photos`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData
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
    const response = await $fetch<ChangeRequestResponse>(`${config.public.apiBase}/customers/${customerId}/change-requests`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function listCustomerChangeRequests(params?: {
    status?: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'
    page?: number
  }) {
    const search = new URLSearchParams()
    if (params?.status) search.set('status', params.status)
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', '15')

    const response = await $fetch<ChangeRequestsResponse>(`${config.public.apiBase}/customer-change-requests?${search.toString()}`, {
      headers: authHeaders()
    })

    return response.data
  }

  async function decideCustomerChangeRequest(id: number, payload: DecideCustomerChangePayload) {
    const response = await $fetch<ChangeRequestResponse>(`${config.public.apiBase}/customer-change-requests/${id}/decision`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  function fieldLabels() {
    const labels: Record<string, string> = {
      first_name: 'Nombre',
      middle_name: 'Segundo nombre',
      last_name: 'Apellido paterno',
      second_last_name: 'Apellido materno',
      curp: 'CURP',
      rfc: 'RFC',
      home_phone: 'Teléfono fijo',
      mobile_phone: 'Teléfono móvil',
      email: 'Correo',
      street: 'Calle',
      external_number: 'Número exterior',
      neighborhood: 'Colonia',
      city: 'Ciudad',
      state: 'Estado',
      postal_code: 'Código postal'
    }
    return labels
  }

  return {
    listCustomers,
    uploadVerificationPhoto,
    verifyCustomer,
    requestCustomerChange,
    listCustomerChangeRequests,
    decideCustomerChangeRequest,
    fieldLabels,
    PERSON_FIELDS
  }
}