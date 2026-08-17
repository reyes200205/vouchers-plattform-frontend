import type { InboxApplication, InboxCreditIncrease, InboxData, InboxRedemption } from '~/types'

export type InboxTab = 'applications' | 'credit' | 'redemptions'

interface InboxResponse {
  success: boolean
  message: string
  data: InboxData
}

interface InboxCounts {
  applications: number
  credit_increases: number
  redemptions: number
}

export function useInbox() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listInbox(tab?: InboxTab, branchId?: number | null) {
    const params = new URLSearchParams()
    if (tab) params.set('tab', tab)
    if (branchId) params.set('branch_id', String(branchId))

    const query = params.toString() ? `?${params.toString()}` : ''
    const response = await $fetch<InboxResponse>(`${config.public.apiBase}/general/inbox${query}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function counts(branchId?: number | null): Promise<InboxCounts> {
    const data = await listInbox(undefined, branchId)

    return {
      applications: data.applications?.total ?? 0,
      credit_increases: data.credit_increases?.total ?? 0,
      redemptions: data.redemptions?.total ?? 0
    }
  }

  async function decideApplication(id: number, payload: {
    decision: 'APPROVE' | 'REJECT'
    credit_limit?: string | number
    category_id?: number
    rejection_reason?: string
  }) {
    const response = await $fetch<InboxResponse>(`${config.public.apiBase}/applications/${id}/decision`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function decideCreditIncrease(id: number, payload: {
    decision: 'APROBADO' | 'RECHAZADO' | 'REDUCIDO'
    approved_amount?: string | number
    decision_notes?: string
  }) {
    const response = await $fetch<InboxResponse>(`${config.public.apiBase}/credit-increase-requests/${id}/decision`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function decideRedemption(id: number, payload: {
    decision: 'APROBADO' | 'RECHAZADO'
    decision_notes?: string
  }) {
    const response = await $fetch<InboxResponse>(`${config.public.apiBase}/point-redemptions/${id}/decision`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  return {
    listInbox,
    counts,
    decideApplication,
    decideCreditIncrease,
    decideRedemption
  }
}

export type { InboxApplication, InboxCreditIncrease, InboxRedemption }
