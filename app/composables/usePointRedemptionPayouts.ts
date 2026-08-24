import type { PaginatedData, PointRedemption } from '~/types'

interface PointRedemptionResponse {
  success: boolean
  message: string
  data: PointRedemption
}

interface PointRedemptionListResponse {
  success: boolean
  message: string
  data: PaginatedData<PointRedemption>
}

export interface PointRedemptionListParams {
  status?: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO' | 'CANCELADO'
  distributor_number?: string
  page?: number
  per_page?: number
}

export function usePointRedemptionPayouts() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function lookupByFolio(folio: string) {
    const response = await $fetch<PointRedemptionResponse>(`${config.public.apiBase}/point-redemptions/lookup/${folio}`, {
      headers: authHeaders()
    })

    return response.data
  }

  async function payout(folio: string) {
    const response = await $fetch<PointRedemptionResponse>(`${config.public.apiBase}/point-redemptions/lookup/${folio}/payout`, {
      method: 'POST',
      headers: authHeaders()
    })

    return response.data
  }

  async function listRedemptions(params: PointRedemptionListParams = {}) {
    const response = await $fetch<PointRedemptionListResponse>(`${config.public.apiBase}/point-redemptions`, {
      headers: authHeaders(),
      query: {
        status: params.status,
        distributor_number: params.distributor_number || undefined,
        page: params.page,
        per_page: params.per_page ?? 15
      }
    })

    return response.data
  }

  return { lookupByFolio, payout, listRedemptions }
}
