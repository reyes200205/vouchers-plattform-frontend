import type { CustomerPayment, PaymentMethod } from '~/types'

interface CustomerPaymentResponse {
  success: boolean
  message: string
  data: CustomerPayment
}

export interface RecordPaymentPayload {
  voucher_id: number
  amount: string
  payment_date?: string
  payment_method?: PaymentMethod
  notes?: string
}

export interface ReversePaymentPayload {
  reason?: string
}

export function usePayments() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function recordPayment(payload: RecordPaymentPayload): Promise<CustomerPayment> {
    const response = await $fetch<CustomerPaymentResponse>(`${config.public.apiBase}/customer-payments`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  async function reversePayment(paymentId: number, payload: ReversePaymentPayload = {}): Promise<CustomerPayment> {
    const response = await $fetch<CustomerPaymentResponse>(`${config.public.apiBase}/customer-payments/${paymentId}/reverse`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload
    })

    return response.data
  }

  return { recordPayment, reversePayment }
}
