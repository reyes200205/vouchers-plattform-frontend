import type { DashboardStats } from '~/types'

interface DashboardStatsResponse {
  success: boolean
  message: string
  data: DashboardStats
}

export function useDashboardStats() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function getStats(branchId?: number | null) {
    const query = branchId ? `?branch_id=${branchId}` : ''
    const response = await $fetch<DashboardStatsResponse>(`${config.public.apiBase}/stats/dashboard${query}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  return { getStats }
}
