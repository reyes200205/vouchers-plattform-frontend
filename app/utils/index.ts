export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]!
}

// Deben reflejar exactamente App\Rules\ValidCurp y App\Rules\ValidRfc del backend.
export const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/
export const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/

export function isValidCurp(value: string): boolean {
  return CURP_REGEX.test(value.trim().toUpperCase())
}

export function isValidRfc(value: string): boolean {
  return RFC_REGEX.test(value.trim().toUpperCase())
}

// Extrae el primer mensaje de validacion de una respuesta 422 de Laravel
// ({ message, errors: { field: string[] } }), con fallback al mensaje general.
export function extractApiErrorMessage(error: unknown, fallback: string): string {
  const data = (error as { data?: { message?: string, errors?: Record<string, string[]> } } | undefined)?.data

  const firstFieldError = data?.errors ? Object.values(data.errors)[0]?.[0] : undefined

  return firstFieldError || data?.message || fallback
}
