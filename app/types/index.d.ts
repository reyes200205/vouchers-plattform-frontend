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

export type ApplicationStatus = 'PRE' | 'MODIFICADA' | 'EN_REVISION' | 'VERIFICADA' | 'POSIBLE_DISTRIBUIDORA' | 'APROBADA' | 'RECHAZADA'
export type VerificationResult = 'PENDIENTE' | 'VERIFICADA' | 'RECHAZADA'

export interface ApplicationPerson {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  second_last_name: string | null
  mobile_phone: string | null
  email: string | null
  street: string | null
  external_number: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
}

export interface ApplicationBranch {
  id: number
  code: string
  name: string
}

export interface ApplicationVerifier {
  id: number
  username: string
}

export interface ApplicationVerification {
  id: number
  application_id: number
  verifier_user_id: number
  result: VerificationResult
  notes: string | null
  visit_date: string
  distance_meters: string | null
}

export interface Application {
  id: number
  branch_id: number
  assigned_verifier_id: number | null
  status: ApplicationStatus
  requested_credit_limit: string | null
  rejection_reason: string | null
  submitted_at: string | null
  reviewed_at: string | null
  applicant: ApplicationPerson | null
  branch: ApplicationBranch | null
  assignedVerifier: ApplicationVerifier | null
  verification: ApplicationVerification | null
}

export interface AppNotificationData {
  type: string
  application_id?: number
  branch_id?: number
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
