interface CreateGeneralManagerPayload {
  firstName: string
  lastName: string
  username: string
  password: string
}

interface GeneralManagerResponse {
  success: boolean
  message: string
  data: {
    id: number
    username: string
    person: { id: number, first_name: string | null, last_name: string | null } | null
    roles: { code: string, name: string, branch_id: number | null, is_primary: boolean }[]
  }
}

export function useGeneralManagers() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  async function createGeneralManager(payload: CreateGeneralManagerPayload) {
    const response = await $fetch<GeneralManagerResponse>(`${config.public.apiBase}/general-managers`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        first_name: payload.firstName,
        last_name: payload.lastName,
        username: payload.username,
        password: payload.password
      }
    })

    return response.data
  }

  return { createGeneralManager }
}
