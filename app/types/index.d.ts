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
  // Sucursal "base" de un gerente general: solo informativa, no limita sus
  // permisos (esos siguen siendo globales via `roles`).
  home_branch: { id: number, name: string } | null
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

// Los tipos de Application/ApplicationStatus/etc. viven en ~/composables/useApplications
// (junto con el composable que los produce) para evitar tener dos fuentes de verdad.

export interface AppNotificationData {
  type: string
  application_id?: number
  branch_id?: number
  result?: 'VERIFICADA' | 'RECHAZADA'
  message: string
}

export interface AppNotification {
  id: string
  type: string
  data: AppNotificationData
  read_at: string | null
  created_at: string
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

// Vista de un canje de puntos desde el lado de la distribuidora (espejo de
// PointRedemptionResource en el backend). Distinto de InboxRedemption, que es
// la fila que ve el staff en la bandeja de aprobaciones.
export interface PointRedemption {
  id: number
  folio: string | null
  distributor_id: number
  branch_id: number
  requested_by_user_id: number
  points: string
  point_value_snapshot: string
  amount_mxn: string
  status: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO' | 'CANCELADO'
  decided_by_user_id: number | null
  decision_notes: string | null
  decided_at: string | null
  created_at: string | null
  distributor?: {
    id: number
    distributor_number: string
    current_points: string
  }
}

export interface InboxSection<T> {
  items: T[]
  total: number
}

// Reconciliation ya trae todo lo que necesita DecideReconciliationModal.vue
// (distribuidora, relación de corte, transacción bancaria) -- se reutiliza
// tal cual en vez de duplicar un shape plano como los otros tres tipos.
export interface InboxReconciliation extends Reconciliation {
  type: 'reconciliation'
}

export interface InboxData {
  applications?: InboxSection<InboxApplication>
  credit_increases?: InboxSection<InboxCreditIncrease>
  redemptions?: InboxSection<InboxRedemption>
  reconciliations?: InboxSection<InboxReconciliation>
}

// Fila de la tabla del apartado "Solicitudes de vale" (gerentes), separado
// de la Bandeja de Aprobaciones y de "Vales emitidos" (cajera).
export interface PendingVoucherRequest {
  id: number
  status: string
  branch_id: number
  branch_name: string | null
  distributor_id: number
  distributor_name: string | null
  distributor_number: string | null
  customer_name: string | null
  customer_code: string | null
  // Objeto completo del cliente (mismo shape que usan customers.vue y sus
  // modales de verificar/detalles/solicitar cambio) para revisar sus datos
  // y, si es su primer vale, verificarlo sin salir del modal de "Decidir".
  customer: Customer | null
  financial_product_name: string | null
  requested_amount: string
  is_pre_vale: boolean
  rejection_reason: string | null
  created_at: string
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

export interface ReconciliationDistributorInfo {
  id: number
  distributor_number: string
  name: string | null
  category: { code: string, name: string } | null
}

export interface ReconciliationCutoffInfo {
  id: number
  branch_id: number | null
  branch_name: string | null
  period_start: string | null
  scheduled_at: string | null
}

export interface ReconciliationCutoffRelationInfo {
  id: number
  relation_number: string
  status: string | null
  total_payment: string
  total_commission: string
  total_late_fees: string
  total_amount_due: string
  payment_due_date: string | null
  early_payment_start_date: string | null
  early_payment_end_date: string | null
  cutoff: ReconciliationCutoffInfo | null
}

export interface ReconciliationDistributorPayment {
  id: number
  cutoff_relation_id: number
  distributor_id: number
  amount: string
  reported_reference: string | null
  status: string | null
  distributor: ReconciliationDistributorInfo | null
  cutoff_relation: ReconciliationCutoffRelationInfo | null
}

export interface ReconciliationBankTransactionInfo {
  id: number
  reference: string | null
  transaction_date: string | null
  amount: string
  raw_description: string | null
}

export interface Reconciliation {
  id: number
  distributor_payment_id: number
  bank_transaction_id: number
  original_cutoff_relation_id: number | null
  reconciled_by_user_id: number | null
  verified_by_user_id: number | null
  verified_at: string | null
  reconciled_at: string | null
  reconciled_amount: string
  amount_difference: string
  status: ReconciliationStatus
  is_retroactive_correction: boolean
  waived_late_fees_total: string | null
  notes: string | null
  distributor_payment: ReconciliationDistributorPayment | null
  bank_transaction: ReconciliationBankTransactionInfo | null
}

export interface BankImportResult {
  import: {
    id: number
    filename: string
    row_count: number
    error_count: number
    errors_json: string | null
    status: string
  }
  auto_matched: number
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
  person: Person | null
}

export interface Person {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  second_last_name: string | null
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
}

export type CustomerStatus = 'EN_VERIFICACION' | 'ACTIVO' | 'BLOQUEADO' | 'MOROSO' | 'INACTIVO'

export interface Customer {
  id: number
  customer_code: string
  status: CustomerStatus
  verified_at: string | null
  verified_by_user_id: number | null
  bank_account: string | null
  bank_clabe: string | null
  account_holder_name: string | null
  notes: string | null
  person: Person | null
  branch: Branch | null
  distributors: unknown[] | null
  created_at: string | null
  updated_at: string | null
}

export type CustomerChangeRequestStatus = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'
export type CustomerChangeType = 'IDENTITY' | 'CONTACT' | 'EVIDENCE'

export interface CustomerChangeRequest {
  id: number
  customer_id: number
  change_type: CustomerChangeType | null
  old_values: Record<string, string> | null
  new_values: Record<string, string> | null
  evidence: string[] | null
  status: CustomerChangeRequestStatus | null
  rejection_reason: string | null
  applied_at: string | null
  requested_by_user_id: number | null
  approved_by_user_id: number | null
  created_at: string | null
  updated_at: string | null
  customer: (Pick<Customer, 'id' | 'customer_code' | 'status'> & { person: Person | null }) | null
}

export type VoucherStatus = 'BORRADOR' | 'APROBADO' | 'TRANSFERIDO' | 'ACTIVO' | 'PAGO_PARCIAL' | 'PAGADO' | 'LIQUIDADO' | 'MOROSO' | 'RECLAMADO' | 'CANCELADO' | 'REVERSADO'

export interface Voucher {
  id: number
  voucher_number: string
  distributor_id: number
  customer_id: number
  financial_product_id: number
  voucher_request_id: number | null
  branch_id: number
  status: VoucherStatus
  is_pre_vale: boolean
  amount: string
  company_commission_percentage_snapshot: string
  company_commission_amount: string
  insurance_amount_snapshot: string
  interest_percentage_snapshot: string
  interest_amount: string
  distributor_profit_percentage_snapshot: string
  distributor_profit_amount: string
  late_fee_amount_snapshot: string
  total_debt_amount: string
  fortnightly_payment_amount: string
  total_fortnights: number
  payments_made: number
  current_balance: string
  transfer_reference: string | null
  authorized_number: string | null
  issued_at: string | null
  transferred_at: string | null
  payment_due_date: string | null
  is_canceled: boolean
  is_expired: boolean
  expiration_date: string | null
  canceled_at: string | null
  notes: string | null
  created_by_user_id: number | null
  approved_by_user_id: number | null
  disbursed_by_user_id: number | null
  customer: (Pick<Customer, 'id' | 'customer_code' | 'status' | 'verified_at'> & { person: Person | null }) | null
  distributor?: { id: number, distributor_number: string, person: Person | null } | null
  financial_product?: { id: number, name: string, code: string } | null
  created_at: string
}

export type PaymentMethod = 'EFECTIVO' | 'TRANSFERENCIA'

export interface CustomerPayment {
  id: number
  voucher_id: number
  customer_id: number
  distributor_id: number
  collected_by_user_id: number
  payment_date: string | null
  amount: string
  payment_method: PaymentMethod | null
  is_partial: boolean
  affects_points: boolean
  notes: string | null
  reversed_at: string | null
  reversed_by_user_id: number | null
  reversal_reason: string | null
  created_at: string
  voucher?: {
    id: number
    voucher_number: string
    status: VoucherStatus
    current_balance: string
  }
}

export type CutoffStatus = 'PROGRAMADO' | 'EJECUTADO' | 'CERRADO' | 'REPROCESADO'
export type CutoffRelationStatus = 'GENERADA' | 'PAGADA' | 'PARCIAL' | 'VENCIDA' | 'CERRADA'

export interface CutoffRelationItemCustomer {
  id: number
  customer_code: string
  person: Person | null
}

export interface CutoffRelationItem {
  id: number
  cutoff_relation_id: number
  voucher_id: number
  customer_id: number
  product_name_snapshot: string | null
  payments_made: number
  total_payments: number
  is_late_payment: boolean
  installment_number: number | null
  accumulated_late_installments: number | null
  commission_amount: string
  payment_amount: string
  late_fee_amount: string
  line_total_amount: string
  previous_paid_amount: string | null
  origin_cutoff_id: number | null
  origin_relation_id: number | null
  commission_forfeited_amount?: string | null
  customer?: CutoffRelationItemCustomer | null
}

export interface CutoffRelation {
  id: number
  cutoff_id: number
  distributor_id: number
  previous_relation_id: number | null
  relation_number: string
  payment_reference: string | null
  payment_due_date: string | null
  early_payment_start_date: string | null
  early_payment_end_date: string | null
  credit_limit_snapshot: string | null
  available_credit_snapshot: string | null
  points_snapshot: number | null
  total_commission: string | null
  total_payment: string | null
  total_late_fees: string | null
  total_carryover_received: string | null
  total_amount_due: string
  status: CutoffRelationStatus | null
  closed_by_carryover_at: string | null
  generated_at: string | null
  distributor: CutoffRelationDistributor | null
  items?: CutoffRelationItem[]
}

export interface Cutoff {
  id: number
  branch_id: number
  cutoff_type: string | null
  base_day_of_month: number | null
  period_start: string | null
  base_time: string | null
  scheduled_at: string | null
  executed_at: string | null
  status: CutoffStatus | null
  config_snapshot_json: Record<string, unknown> | null
  notes: string | null
  created_at?: string
  relations_count?: number
  total_amount_due?: number
  relations?: CutoffRelation[]
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          'sitekey': string
          'callback'?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          [key: string]: any
        }
      ) => string | number
      reset: (id?: string | number | null) => void
      remove: (id?: string | number | null) => void
    }
  }
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          'sitekey': string
          'action'?: string
          'cData'?: string
          'callback'?: (token: string) => void
          'expired-callback'?: () => void
          'timeout-callback'?: () => void
          'error-callback'?: () => void
          'unsupported-callback'?: () => void
          'theme'?: 'light' | 'dark' | 'auto'
          'size'?: 'normal' | 'flexible' | 'compact'
          'tabindex'?: number
          'response-field'?: boolean
          'response-field-name'?: string
          'retry'?: 'auto' | 'never'
          'retry-interval'?: number
          'refresh'?: 'auto' | 'manual' | 'never'
          'appearance'?: 'always' | 'execute' | 'interaction-only'
          'execution'?: 'render' | 'execute'
          [key: string]: any
        }
      ) => string | number
      reset: (widgetId?: string | number | null) => void
      remove: (widgetId?: string | number | null) => void
      getResponse: (widgetId?: string | number | null) => string | undefined
    }
  }
}
