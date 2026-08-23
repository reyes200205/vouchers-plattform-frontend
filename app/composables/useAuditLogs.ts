export interface AuditLogItem {
  id: number
  event_type: string
  level: string
  user_id: number | null
  user_name: string | null
  user_role: string | null
  branch_id: number | null
  branch?: {
    id: number
    name: string
  }
  module: string
  description: string
  extra_data: any
  old_data: Record<string, any> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface AuditLogListParams {
  page?: number
  per_page?: number
  search?: string
  event_type?: string
  level?: string
  module?: string
  branch_id?: number
  user_role?: string
  user_id?: number
}

interface AuditLogListResponse {
  success: boolean
  message: string
  data: {
    data: AuditLogItem[]
    meta: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

export function useAuditLogs() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listAuditLogs(params: AuditLogListParams = {}) {
    const response = await $fetch<AuditLogListResponse>(`${config.public.apiBase}/system/audit-logs`, {
      headers: { Authorization: `Bearer ${token.value}` },
      query: params
    })

    return response.data
  }

  return { listAuditLogs }
}
