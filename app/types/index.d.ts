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

export interface StaffRole {
  code: string
  name: string
  branch_id: number | null
  is_primary: boolean
}

export interface StaffMember {
  id: number
  username: string
  is_active: boolean
  person: {
    id: number
    first_name: string | null
    middle_name: string | null
    last_name: string | null
    second_last_name: string | null
    gender: string | null
    birth_date: string | null
    curp: string | null
    rfc: string | null
    home_phone: string | null
    mobile_phone: string | null
    email: string | null
    street: string | null
    external_number: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    postal_code: string | null
  } | null
  roles: StaffRole[]
  permissions: string[]
  last_login_at: string | null
  created_at: string | null
}

export interface SystemRole {
  id: number
  code: string
  name: string
  description: string | null
  is_active: boolean
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

export interface InsuranceTier {
  min_amount: number | string
  max_amount: number | string
  insurance_amount: number | string
}

export interface DistributorCategory {
  id: number
  branch_id: number | null
  code: string
  name: string
  commission_percentage: string
  points_per_1200: number
  late_penalty_percentage: string
  is_active: boolean
}

export interface FinancialProduct {
  id: number
  branch_id: number | null
  origin?: 'global' | 'branch'
  category_id: number | null
  category: {
    id: number
    code: string
    name: string
  } | null
  code: string
  name: string
  description: string | null
  principal_amount: string
  number_of_fortnights: number
  company_commission_percentage: string
  insurance_amount: string
  fortnightly_interest_percentage: string
  late_fee_amount: string
  disbursement_method: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface BranchSettings {
  id: number
  branch_id: number
  cutoff_day: number | null
  cutoff_time: string | null
  payment_frequency_days: number | null
  payment_due_days: number | null
  insurance_rates: InsuranceTier[] | null
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

export type ReconciliationStatus = 'PENDIENTE_VERIFICACION' | 'CONCILIADA' | 'CON_DIFERENCIA' | 'RECHAZADA'

export interface BankTransactionReconciliation {
  id: number
  status: ReconciliationStatus | null
  amount_difference: string | null
}

export interface BankTransaction {
  id: number
  company_bank_account_id: number
  reference: string
  transaction_date: string | null
  transaction_time: string | null
  amount: string
  transaction_type: string | null
  transaction_number: string | null
  payer_name: string | null
  raw_description: string | null
  reconciled: boolean
  reconciliation: BankTransactionReconciliation | null
}

export interface PaginatedData<T> {
  data: T[]
  links: { url: string | null, label: string, active: boolean }[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface CutoffRelationDistributor {
  id: number
  distributor_number: string
  business_name: string
}

export interface CutoffRelation {
  id: number
  cutoff_id: number
  distributor_id: number
  relation_number: string
  payment_reference: string | null
  payment_due_date: string | null
  total_amount_due: string
  status: string | null
  distributor: CutoffRelationDistributor | null
}

export interface Cutoff {
  id: number
  branch_id: number
  cutoff_type: string | null
  base_day_of_month: number | null
  base_time: string | null
  scheduled_at: string | null
  executed_at: string | null
  status: string | null
  relations_count?: number
  total_amount_due?: number
  relations?: CutoffRelation[]
}
