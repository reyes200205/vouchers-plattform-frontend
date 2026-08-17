import type { BranchSettings, DistributorCategory, PointSettings } from '~/types'

interface WrappedResponse<T> {
  success: boolean
  message: string
  data: T
}

interface CategoriesResponse {
  success: boolean
  message: string
  data: {
    data: DistributorCategory[]
  }
}

export function useSettings() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listCategories() {
    const response = await $fetch<CategoriesResponse>(`${config.public.apiBase}/distributor-categories`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data.data
  }

  async function getBranchSettings(branchId: number) {
    const response = await $fetch<WrappedResponse<BranchSettings>>(`${config.public.apiBase}/branches/${branchId}/settings`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function updateBranchSettings(branchId: number, payload: Partial<BranchSettings>) {
    const response = await $fetch<WrappedResponse<BranchSettings>>(`${config.public.apiBase}/branches/${branchId}/settings`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function getPointSettings() {
    const response = await $fetch<WrappedResponse<PointSettings>>(`${config.public.apiBase}/point-settings`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function updatePointSettings(payload: Partial<PointSettings>) {
    const response = await $fetch<WrappedResponse<PointSettings>>(`${config.public.apiBase}/point-settings`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  return { listCategories, getBranchSettings, updateBranchSettings, getPointSettings, updatePointSettings }
}
