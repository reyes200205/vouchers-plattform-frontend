import type { CutoffRelation, CutoffRelationStatus, PaginatedData } from '~/types'

interface RelationsResponse {
  success: boolean
  message: string
  data: PaginatedData<CutoffRelation>
}

interface RelationResponse {
  success: boolean
  message: string
  data: CutoffRelation
}

export interface DistributorRelationListParams {
  status?: CutoffRelationStatus
  page?: number
  per_page?: number
}

/**
 * Estado de cuenta de la distribuidora autenticada: sus propias relaciones de
 * corte (lo que le toca remitirle a la sucursal cada periodo). El backend
 * (Distributor\RelationController) resuelve la distribuidora por el usuario
 * autenticado -- nunca hay forma de pedir las relaciones de otra.
 */
export function useDistributorRelations() {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  function authHeaders() {
    return { Authorization: `Bearer ${token.value}` }
  }

  async function listMyRelations(params: DistributorRelationListParams = {}) {
    const search = new URLSearchParams()
    if (params.status) search.set('status', params.status)
    search.set('page', String(params.page ?? 1))
    search.set('per_page', String(params.per_page ?? 15))

    const response = await $fetch<RelationsResponse>(
      `${config.public.apiBase}/distributor/relations?${search.toString()}`,
      { headers: authHeaders() }
    )

    return response.data
  }

  async function getMyRelation(relationId: number): Promise<CutoffRelation> {
    const response = await $fetch<RelationResponse>(
      `${config.public.apiBase}/distributor/relations/${relationId}`,
      { headers: authHeaders() }
    )

    return response.data
  }

  /**
   * El endpoint requiere el Bearer token (no es un link público), así que no
   * se puede simplemente apuntar un <a href> a la URL: se descarga como blob
   * y se dispara la descarga con un enlace temporal en memoria.
   */
  async function downloadMyRelationPdf(relationId: number, fileName: string): Promise<void> {
    const blob = await $fetch<Blob>(
      `${config.public.apiBase}/distributor/relations/${relationId}/pdf`,
      { headers: authHeaders(), responseType: 'blob' }
    )

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return {
    listMyRelations,
    getMyRelation,
    downloadMyRelationPdf
  }
}
