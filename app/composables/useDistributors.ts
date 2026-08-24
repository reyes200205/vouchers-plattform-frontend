import type { PaginatedData } from '~/types'

export interface DistributorPersonRef {
  first_name: string | null
  middle_name?: string | null
  last_name: string | null
  second_last_name?: string | null
  email?: string | null
}

export interface CoordinatorRef {
  id: number
  username: string
  person?: DistributorPersonRef | null
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
  branch?: {
    id: number
    name: string
  } | null
  coordinator?: CoordinatorRef | null
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

export function distributorFullName(distributor: Distributor) {
  const person = distributor.person
  if (!person) return 'Sin nombre'
  return [person.first_name, person.middle_name, person.last_name, person.second_last_name]
    .filter(Boolean)
    .join(' ') || 'Sin nombre'
}

export function coordinatorFullName(coordinator: CoordinatorRef | null | undefined) {
  if (!coordinator) return '—'
  const person = coordinator.person
  if (!person) return coordinator.username || '—'
  return [person.first_name, person.middle_name, person.last_name, person.second_last_name]
    .filter(Boolean)
    .join(' ') || coordinator.username || '—'
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
