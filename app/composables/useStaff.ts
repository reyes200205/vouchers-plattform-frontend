import type { StaffMember, SystemRole } from '~/types'

export interface StaffListParams {
  role?: string
  branch_id?: number
  page?: number
  per_page?: number
}

interface StaffListResponse {
  success: boolean
  message: string
  data: {
    data: StaffMember[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

interface StaffResponse {
  success: boolean
  message: string
  data: StaffMember
}

interface SystemRolesResponse {
  success: boolean
  message: string
  data: { data: SystemRole[] }
}

export function useStaff() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listStaff(params: StaffListParams = {}) {
    const response = await $fetch<StaffListResponse>(`${config.public.apiBase}/staff`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params
    })

    return response.data
  }

  async function listSystemRoles() {
    const response = await $fetch<SystemRolesResponse>(`${config.public.apiBase}/system/roles`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { per_page: 50 }
    })

    return response.data.data
  }

  async function createStaff(payload: {
    first_name: string
    middle_name?: string
    last_name: string
    second_last_name?: string
    gender?: string
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
    username: string
    password: string
    role_code: string
    branch_id?: number
  }) {
    const response = await $fetch<StaffResponse>(`${config.public.apiBase}/staff`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function updateStaff(id: number, payload: {
    is_active: boolean
    role_code?: string
    branch_id?: number | null
    first_name?: string
    middle_name?: string | null
    last_name?: string
    second_last_name?: string | null
    gender?: string | null
    birth_date?: string | null
    curp?: string | null
    rfc?: string | null
    home_phone?: string | null
    mobile_phone?: string | null
    email?: string | null
    street?: string | null
    external_number?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    postal_code?: string | null
  }) {
    const response = await $fetch<StaffResponse>(`${config.public.apiBase}/staff/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function getStaff(id: number) {
    const response = await $fetch<StaffResponse>(`${config.public.apiBase}/staff/${id}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  return { listStaff, listSystemRoles, createStaff, updateStaff, getStaff }
}
