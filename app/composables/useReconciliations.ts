import type { BankImportResult, BankTransaction, Cutoff, CutoffRelation, PaginatedData, Reconciliation } from '~/types'

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

  async function listCutoffs(params?: {
    page?: number
    status?: string
    per_page?: number
    branch_id?: number
  }) {
    const search = new URLSearchParams()
    search.set('page', String(params?.page ?? 1))
    search.set('per_page', String(params?.per_page ?? 50))
    if (params?.status) search.set('status', params.status)
    if (params?.branch_id) search.set('branch_id', String(params.branch_id))

    const response = await $fetch<CutoffsResponse>(`${config.public.apiBase}/cutoffs?${search.toString()}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function getCutoff(cutoffId: number): Promise<Cutoff> {
    const response = await $fetch<CutoffResponse>(`${config.public.apiBase}/cutoffs/${cutoffId}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function listCutoffRelations(cutoffId: number): Promise<CutoffRelation[]> {
    const cutoff = await getCutoff(cutoffId)

    return cutoff.relations ?? []
  }

  async function generateCutoff(branchId: number, payload: { period_start: string, period_end: string }): Promise<Cutoff> {
    const response = await $fetch<CutoffResponse>(`${config.public.apiBase}/branches/${branchId}/cutoffs/generate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function reprocessCutoff(cutoffId: number): Promise<Cutoff> {
    const response = await $fetch<CutoffResponse>(`${config.public.apiBase}/cutoffs/${cutoffId}/reprocess`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function closeCutoff(cutoffId: number): Promise<Cutoff> {
    const response = await $fetch<CutoffResponse>(`${config.public.apiBase}/cutoffs/${cutoffId}/close`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function manualMatch(bankTransactionId: number, payload: ManualMatchPayload) {
    await $fetch(`${config.public.apiBase}/reconciliations/bank-transactions/${bankTransactionId}/manual-match`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })
  }

  async function listReconciliations(params?: {
    pending_verification?: boolean
    status?: string
    page?: number
  }) {
    const search = new URLSearchParams()
    if (params?.pending_verification) search.set('pending_verification', '1')
    if (params?.status) search.set('status', params.status)
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', '15')

    const response = await $fetch<{ success: boolean, message: string, data: PaginatedData<Reconciliation> }>(
      `${config.public.apiBase}/reconciliations${search.toString() ? `?${search.toString()}` : ''}`,
      { headers: { Authorization: `Bearer ${token.value}` } }
    )

    return response.data
  }

  async function verifyReconciliation(id: number) {
    await $fetch(`${config.public.apiBase}/reconciliations/${id}/verify`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` }
    })
  }

  async function rejectReconciliation(id: number, rejectionReason: string) {
    await $fetch(`${config.public.apiBase}/reconciliations/${id}/reject`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { rejection_reason: rejectionReason }
    })
  }

  async function importBankDeposits(branchId: number, file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch<{ success: boolean, message: string, data: BankImportResult }>(
      `${config.public.apiBase}/branches/${branchId}/reconciliations/import`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: formData
      }
    )

    return response.data
  }

  return {
    listBankTransactions,
    listCutoffs,
    getCutoff,
    listCutoffRelations,
    generateCutoff,
    reprocessCutoff,
    closeCutoff,
    manualMatch,
    listReconciliations,
    verifyReconciliation,
    rejectReconciliation,
    importBankDeposits
  }
}
