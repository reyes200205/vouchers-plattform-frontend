export type ApplicationStatus
  = | 'PRE'
    | 'MODIFICADA'
    | 'EN_REVISION'
    | 'VERIFICADA'
    | 'POSIBLE_DISTRIBUIDORA'
    | 'APROBADA'
    | 'RECHAZADA'

export type VerificationResult = 'PENDIENTE' | 'VERIFICADA' | 'RECHAZADA'

export interface ApplicationPerson {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  second_last_name: string | null
  gender?: string | null
  birth_date?: string | null
  curp: string | null
  rfc: string | null
  home_phone?: string | null
  mobile_phone: string | null
  email: string | null
  street: string | null
  external_number?: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  postal_code?: string | null
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

// El backend expone la relacion de verificacion como el modelo ApplicationVerification completo
// (ver App\Http\Controllers\Checker\VerificadorController::verify y App\Models\ApplicationVerification).
export interface ApplicationVerificationRef {
  id: number
  application_id: number
  verifier_user_id: number
  result: VerificationResult
  notes: string | null
  visit_date: string | null
  distance_meters: string | null
  front_photo: string | null
  id_with_person_photo: string | null
  proof_of_address_photo: string | null
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
  // Ojo: el backend carga esta relacion como `assignedVerifier` (camelCase) via
  // Application::with(['assignedVerifier']) en CoordinadorController::index, por lo que
  // la clave en el JSON es exactamente esa, NO `assigned_verifier`.
  assignedVerifier: ApplicationUserRef | null
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
  vehicles?: Record<string, unknown>[] | null
  requested_credit_limit?: number | null
  id_front_path?: string | null
  id_back_path?: string | null
  proof_of_address_path?: string | null
}

export interface SubmitVerificationPayload {
  result: 'VERIFICADA' | 'RECHAZADA'
  notes?: string
  visit_date: string
  verification_latitude?: number
  verification_longitude?: number
  distance_meters?: number
  front_photo: string
}

export type VerificationPhotoType = 'front_photo' | 'id_with_person_photo' | 'proof_of_address_photo'

export interface VerificationPhotoUploadResult {
  type: VerificationPhotoType
  path: string
  url: string
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

interface VerificationPhotoResponse {
  success: boolean
  message: string
  data: VerificationPhotoUploadResult
}

export function useApplications() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listApplications(params: ApplicationListParams = {}) {
    const response = await $fetch<ApplicationListResponse>(`${config.public.apiBase}/applications`, {
      headers: authHeaders(),
      query: params
    })

    return response.data
  }

  async function createApplication(payload: CreateApplicationPayload) {
    const response = await $fetch<ApplicationResponse>(`${config.public.apiBase}/applications`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function assignVerifier(applicationId: number, verifierUserId: number) {
    const response = await $fetch<ApplicationResponse>(`${config.public.apiBase}/applications/${applicationId}/verifier`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: { verifier_user_id: verifierUserId }
    })

    return response.data
  }

  async function submitVerification(applicationId: number, payload: SubmitVerificationPayload) {
    const response = await $fetch<ApplicationResponse>(`${config.public.apiBase}/applications/${applicationId}/verification`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    return response.data
  }

  async function uploadVerificationPhoto(applicationId: number, file: File, type: VerificationPhotoType) {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('photo', file)

    const response = await $fetch<VerificationPhotoResponse>(`${config.public.apiBase}/applications/${applicationId}/verification-photos`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData
    })

    return response.data
  }

  return { listApplications, createApplication, assignVerifier, submitVerification, uploadVerificationPhoto }
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
