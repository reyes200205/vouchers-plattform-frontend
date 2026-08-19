import type { PaginatedData, Voucher } from '~/types'

interface VouchersResponse {
  success: boolean
  message: string
  data: PaginatedData<Voucher>
}

interface VoucherResponse {
  success: boolean
  message: string
  data: Voucher
}

export interface DisburseVoucherPayload {
  transfer_reference: string
  authorized_number: string
  notes?: string
}

export function useVouchers() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listVouchers(params?: {
    status?: string
    page?: number
  }) {
    const search = new URLSearchParams()
    if (params?.status) search.set('status', params.status)
    if (params?.page) search.set('page', String(params.page))
    search.set('per_page', '15')

    const response = await $fetch<VouchersResponse>(`${config.public.apiBase}/vouchers${search.toString() ? `?${search.toString()}` : ''}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    return response.data
  }

  async function disburseVoucher(id: number, payload: DisburseVoucherPayload) {
    const response = await $fetch<VoucherResponse>(`${config.public.apiBase}/vouchers/${id}/disburse`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  return { listVouchers, disburseVoucher }
}