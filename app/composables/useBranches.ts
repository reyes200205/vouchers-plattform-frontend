import type { Branch } from '~/types'

export interface AvailableManager {
  id: number
  username: string
  name: string
}

interface CreateBranchPayload {
  code?: string
  name: string
  address?: string
  phone?: string
  manager_user_id?: number
}

interface UpdateBranchPayload {
  name?: string
  address?: string
  phone?: string
  manager_user_id?: number
  is_active?: boolean
}

interface BranchListResponse {
  success: boolean
  message: string
  data: { data: Branch[] }
}

interface BranchResponse {
  success: boolean
  message: string
  data: Branch
}

interface AvailableManagersResponse {
  success: boolean
  message: string
  data: AvailableManager[]
}

export function useBranches() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listBranches() {
    const response = await $fetch<BranchListResponse>(`${config.public.apiBase}/branches`, {
      params: { per_page: -1 },
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data.data
  }

  async function listAvailableManagers() {
    const response = await $fetch<AvailableManagersResponse>(`${config.public.apiBase}/branches/available-managers`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function listVerifiers(branchId: number) {
    const response = await $fetch<AvailableManagersResponse>(`${config.public.apiBase}/branches/${branchId}/verifiers`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function createBranch(payload: CreateBranchPayload) {
    const response = await $fetch<BranchResponse>(`${config.public.apiBase}/branches`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function updateBranch(id: number, payload: UpdateBranchPayload) {
    const response = await $fetch<BranchResponse>(`${config.public.apiBase}/branches/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  return { listBranches, listAvailableManagers, listVerifiers, createBranch, updateBranch }
}
