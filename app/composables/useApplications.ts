export type ApplicationStatus
  = | 'PRE'
    | 'MODIFICADA'
    | 'EN_REVISION'
    | 'VERIFICADA'
    | 'POSIBLE_DISTRIBUIDORA'
    | 'APROBADA'
    | 'RECHAZADA'

export interface ApplicationPerson {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  second_last_name: string | null
  curp: string | null
  rfc: string | null
  mobile_phone: string | null
  email: string | null
  street: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
}

export interface ApplicationBranchRef {
  id: number
  code: string
  name: string
}

export interface ApplicationUserRef {
  id: number
  username: string
}

export interface ApplicationVerificationRef {
  id: number
  result: 'PENDIENTE' | 'VERIFICADA' | 'RECHAZADA'
  notes: string | null
  visit_date: string | null
}

export interface Application {
  id: number
  branch_id: number
  status: ApplicationStatus
  coordinator_user_id: number | null
  captured_by_user_id: number | null
  assigned_verifier_id: number | null
  requested_credit_limit: string | null
  initial_category_code: string | null
  rejection_reason: string | null
  submitted_at: string | null
  reviewed_at: string | null
  decided_at: string | null
  created_at: string | null
  applicant: ApplicationPerson | null
  branch: ApplicationBranchRef | null
  assigned_verifier: ApplicationUserRef | null
  verification: ApplicationVerificationRef | null
}

export interface ApplicationPersonPayload {
  first_name: string
  middle_name?: string
  last_name: string
  second_last_name?: string
  gender?: 'M' | 'F' | 'OTHER'
  birth_date?: string
  curp?: string
  rfc?: string
  home_phone?: string
  mobile_phone?: string
  email?: string
  street?: string
  external_number?: string
  neighborhood?: string
  city?: string
  state?: string
  postal_code?: string
  notes?: string
}

export interface CreateApplicationPayload {
  branch_id: number
  person: ApplicationPersonPayload
  family_data?: Record<string, unknown> | null
  external_affiliations?: Record<string, unknown> | null
  requested_credit_limit?: number | null
  id_front_path?: string | null
  id_back_path?: string | null
  proof_of_address_path?: string | null
  credit_bureau_report_path?: string | null
}

export interface ApplicationListParams {
  branch_id?: number
  status?: ApplicationStatus
  per_page?: number
  page?: number
}

interface ApplicationListData {
  data: Application[]
  total: number
  per_page: number
  current_page: number
  last_page: number
}

interface ApplicationListResponse {
  success: boolean
  message: string
  data: ApplicationListData
}

interface ApplicationResponse {
  success: boolean
  message: string
  data: Application
}

export function useApplications() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function listApplications(params: ApplicationListParams = {}) {
    const response = await $fetch<ApplicationListResponse>(`${config.public.apiBase}/applications`, {
      headers: { Authorization: 'Bearer ' + token.value },
      query: params
    })

    return response.data
  }

  async function createApplication(payload: CreateApplicationPayload) {
    const response = await $fetch<ApplicationResponse>(`${config.public.apiBase}/applications`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token.value },
      body: payload
    })

    return response.data
  }

  async function assignVerifier(applicationId: number, verifierUserId: number) {
    const response = await $fetch<ApplicationResponse>(`${config.public.apiBase}/applications/${applicationId}/verifier`, {
      method: 'PATCH',
      headers: { Authorization: 'Bearer ' + token.value },
      body: { verifier_user_id: verifierUserId }
    })

    return response.data
  }

  return { listApplications, createApplication, assignVerifier }
}

export function applicantFullName(person: ApplicationPerson | null | undefined): string {
  if (!person) return 'Sin nombre'

  return [person.first_name, person.middle_name, person.last_name, person.second_last_name]
    .filter(Boolean)
    .join(' ') || 'Sin nombre'
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  PRE: 'Pre-registro',
  MODIFICADA: 'Modificada',
  EN_REVISION: 'En revisión',
  VERIFICADA: 'Verificada',
  POSIBLE_DISTRIBUIDORA: 'Posible distribuidora',
  APROBADA: 'Aprobada',
  RECHAZADA: 'Rechazada'
}
