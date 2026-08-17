import type { AvatarProps } from '@nuxt/ui'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export interface Branch {
  id: number
  code: string
  name: string
  address: string | null
  phone: string | null
  is_active: boolean
  manager: {
    id: number
    username: string
    name: string
  } | null
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

export interface MonthlyPoint {
  month: string
  amount: number
}

export interface DashboardStats {
  credit_placed: number
  delinquency_rate: number
  collections_today: number
  active_vouchers: number
  monthly_placement: MonthlyPoint[]
  monthly_collections: MonthlyPoint[]
}

export interface InboxApplication {
  id: number
  type: 'application'
  status: string
  branch_id: number
  branch_name: string | null
  applicant_name: string | null
  requested_credit_limit: string | null
  initial_category_code: string
  house_photos_complete: boolean
  prevale_approved: boolean
  credit_bureau_result: string | null
  coordinator_name: string | null
  verifier_name: string | null
  verification: {
    result: string
    visit_date: string | null
  } | null
  created_at: string
}

export interface InboxCreditIncrease {
  id: number
  type: 'credit_increase'
  status: string
  branch_id: number
  branch_name: string | null
  distributor_id: number
  distributor_name: string | null
  distributor_number: string | null
  requested_amount: string
  pre_authorized_amount: string | null
  reason: string | null
  requested_by_name: string | null
  created_at: string
}

export interface InboxRedemption {
  id: number
  type: 'redemption'
  status: string
  branch_id: number
  branch_name: string | null
  distributor_id: number
  distributor_name: string | null
  distributor_number: string | null
  points: string
  point_value_snapshot: string
  amount_mxn: string
  requested_by_name: string | null
  created_at: string
}

export interface InboxSection<T> {
  items: T[]
  total: number
}

export interface InboxData {
  applications?: InboxSection<InboxApplication>
  credit_increases?: InboxSection<InboxCreditIncrease>
  redemptions?: InboxSection<InboxRedemption>
}

export interface DistributorCategory {
  id: number
  code: string
  name: string
  commission_percentage: string
  points_per_1200: number
  late_penalty_percentage: string
  is_active: boolean
}

export interface BranchSettings {
  id: number
  branch_id: number
  cutoff_day: number | null
  cutoff_time: string | null
  payment_frequency_days: number | null
  payment_due_days: number | null
  default_credit_limit: string | null
  insurance_rates: Record<string, unknown> | null
  opening_commission_percentage: string | null
  biweekly_interest_percentage: string | null
  late_payment_penalty_amount: string | null
  auto_increase_threshold: string | null
  minimum_score_increase_percentage: string | null
  category_settings: Record<string, unknown> | null
  financial_product_settings: Record<string, unknown> | null
  voucher_amount_step: number | null
  pre_vale_max_percentage: string | null
  pre_vale_tolerance_amount: string | null
  point_value_mxn: string | null
}

export interface PointSettings {
  id: number
  point_divisor_factor: number
  point_multiplier: number
  late_penalty_percentage: string | null
}
