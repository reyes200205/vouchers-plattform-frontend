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
  per_page?: number
  page?: number
}

interface CustomerListResponse {
  success: boolean
  message: string
  data: {
    data: Customer[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

interface CustomerResponse {
  success: boolean
  message: string
  data: Customer
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

  return { listCustomers, createCustomer }
}

export function customerFullName(person: CustomerPerson | null | undefined): string {
  if (!person) return 'Sin nombre'
  return [person.first_name, person.middle_name, person.last_name, person.second_last_name]
    .filter(Boolean)
    .join(' ')
}
