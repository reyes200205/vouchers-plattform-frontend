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

export function useDistributorPoints() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function redeemPoints(distributorId: number, points: number) {
    const response = await $fetch<PointRedemptionResponse>(`${config.public.apiBase}/distributors/${distributorId}/points/redeem`, {
      method: 'POST',
      headers: authHeaders(),
      body: { points }
    })

    return response.data
  }

  async function listMyRedemptions(distributorId: number) {
    const response = await $fetch<PointRedemptionListResponse>(`${config.public.apiBase}/distributors/${distributorId}/points/redemptions`, {
      headers: authHeaders()
    })

    return response.data
  }

  return { redeemPoints, listMyRedemptions }
}
