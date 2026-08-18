import type { BankTransaction, Cutoff, CutoffRelation, PaginatedData } from '~/types'

interface ReconciliationsResponse {
  success: boolean
  message: string
  data: PaginatedData<BankTransaction>
}

interface CutoffsResponse {
  success: boolean
  message: string
  data: PaginatedData<Cutoff>
}

interface CutoffResponse {
  success: boolean
  message: string
  data: Cutoff
}

export interface ManualMatchPayload {
  cutoff_relation_id: number
  amount?: number | string
  payment_method?: 'TRANSFER' | 'DEPOSIT' | 'OTHER'
  notes?: string
}

export function useReconciliations() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listBankTransactions(params?: {
    reconciled?: 'yes' | 'no'
    reference?: string
    page?: number
  }) {
    const search = new URLSearchParams()
    if (params?.reconciled) search.set('reconciled', params.reconciled === 'yes' ? '1' : '0')
    if (params?.reference) search.set('reference', params.reference)
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', '15')

    const query = search.toString()
    const response = await $fetch<ReconciliationsResponse>(`${config.public.apiBase}/reconciliations/bank-transactions${query ? `?${query}` : ''}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function listCutoffs(page = 1) {
    const response = await $fetch<CutoffsResponse>(`${config.public.apiBase}/cutoffs?page=${page}&per_page=50`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function listCutoffRelations(cutoffId: number): Promise<CutoffRelation[]> {
    const response = await $fetch<CutoffResponse>(`${config.public.apiBase}/cutoffs/${cutoffId}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data.relations ?? []
  }

  async function manualMatch(bankTransactionId: number, payload: ManualMatchPayload) {
    await $fetch(`${config.public.apiBase}/reconciliations/bank-transactions/${bankTransactionId}/manual-match`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })
  }

  return { listBankTransactions, listCutoffs, listCutoffRelations, manualMatch }
}
