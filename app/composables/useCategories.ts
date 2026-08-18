import type { DistributorCategory } from '~/types'

export interface CategoryPayload {
  code?: string
  name: string
  commission_percentage: string
  points_per_1200?: number
  late_penalty_percentage?: string
  is_active?: boolean
}

interface CategoryListResponse {
  success: boolean
  message: string
  data: {
    data: DistributorCategory[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

interface CategoryResponse {
  success: boolean
  message: string
  data: DistributorCategory
}

export function useCategories() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listBranchCategories(branchId: number) {
    const response = await $fetch<CategoryListResponse>(`${config.public.apiBase}/branches/${branchId}/categories`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { per_page: 50 }
    })

    return response.data
  }

  async function createCategory(branchId: number, payload: CategoryPayload) {
    const response = await $fetch<CategoryResponse>(`${config.public.apiBase}/branches/${branchId}/categories`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function updateCategory(branchId: number, categoryId: number, payload: Partial<CategoryPayload>) {
    const response = await $fetch<CategoryResponse>(`${config.public.apiBase}/branches/${branchId}/categories/${categoryId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function moveCategory(categoryId: number, targetBranchId: number) {
    const response = await $fetch<CategoryResponse>(`${config.public.apiBase}/distributor-categories/${categoryId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { branch_id: targetBranchId }
    })

    return response.data
  }

  return { listBranchCategories, createCategory, updateCategory, moveCategory }
}