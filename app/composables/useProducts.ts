import type { DistributorCategory, FinancialProduct } from '~/types'

export interface ProductListParams {
  page?: number
  per_page?: number
}

interface ProductListResponse {
  success: boolean
  message: string
  data: {
    data: FinancialProduct[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

interface ProductResponse {
  success: boolean
  message: string
  data: FinancialProduct
}

interface CategoriesResponse {
  success: boolean
  message: string
  data: {
    data: DistributorCategory[]
  }
}

export interface ProductPayload {
  code?: string
  name: string
  description?: string
  category_id?: number
  principal_amount: string
  number_of_fortnights: number
  insurance_amount?: string
  company_commission_percentage?: string
  fortnightly_interest_percentage?: string
  late_fee_amount?: string
  is_active?: boolean
}

export function useProducts() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listBranchProducts(branchId: number, params: ProductListParams = {}) {
    const response = await $fetch<ProductListResponse>(`${config.public.apiBase}/branches/${branchId}/products`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params
    })

    return response.data
  }

  async function createProduct(branchId: number, payload: ProductPayload) {
    const response = await $fetch<ProductResponse>(`${config.public.apiBase}/branches/${branchId}/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function updateProduct(branchId: number, productId: number, payload: Partial<ProductPayload>) {
    const response = await $fetch<ProductResponse>(`${config.public.apiBase}/branches/${branchId}/products/${productId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function listCategories() {
    const response = await $fetch<CategoriesResponse>(`${config.public.apiBase}/distributor-categories`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { per_page: 50, is_active: true }
    })

    return response.data.data
  }

  return { listBranchProducts, createProduct, updateProduct, listCategories }
}
