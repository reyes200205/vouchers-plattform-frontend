import type { Branch } from '~/types'

interface CreateBranchPayload {
  code: string
  name: string
  address?: string
  phone?: string
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

export function useBranches() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listBranches() {
    const response = await $fetch<BranchListResponse>(`${config.public.apiBase}/branches`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data.data
  }

  async function createBranch(payload: CreateBranchPayload) {
    const response = await $fetch<BranchResponse>(`${config.public.apiBase}/branches`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  return { listBranches, createBranch }
}
