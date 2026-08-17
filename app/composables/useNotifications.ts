import type { AppNotification } from '~/types'

interface NotificationsListResponse {
  success: boolean
  message: string
  data: {
    data: AppNotification[]
    meta?: { current_page: number, last_page: number, total: number }
  }
}

interface NotificationResponse {
  success: boolean
  message: string
  data: AppNotification
}

export function useNotifications() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listNotifications(params: { unread_only?: boolean, per_page?: number } = {}) {
    const response = await $fetch<NotificationsListResponse>(`${config.public.apiBase}/notifications`, {
      headers: authHeaders(),
      query: params
    })

    return response.data.data
  }

  async function markNotificationAsRead(id: string) {
    const response = await $fetch<NotificationResponse>(`${config.public.apiBase}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders()
    })

    return response.data
  }

  return { listNotifications, markNotificationAsRead }
}
