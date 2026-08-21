import type { PaginatedData } from '~/types'

export interface DistributorPersonRef {
  first_name: string | null
  last_name: string | null
}

// Shape de App\Http\Resources\DistributorResource, consumido por
// GET /distributors (Coordinator\DistributorController::index).
export interface Distributor {
  id: number
  distributor_number: string
  status: string
  credit_limit: string
  available_credit: string
  unlimited_credit: boolean
  current_points: string
  can_issue_vouchers: boolean
  is_external: boolean
  person: DistributorPersonRef | null
}

export interface DistributorListParams {
  search?: string
  status?: string
  per_page?: number
  page?: number
}

interface DistributorListResponse {
  success: boolean
  message: string
  data: PaginatedData<Distributor>
}

export function useDistributors() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listDistributors(params: DistributorListParams = {}) {
    const response = await $fetch<DistributorListResponse>(`${config.public.apiBase}/distributors`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: { per_page: 15, ...params }
    })

    return response.data
  }

  return { listDistributors }
}
