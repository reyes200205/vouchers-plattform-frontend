const PROTECTED_PREFIXES = [
  '/admin',
  '/general',
  '/distributor-portal',
  '/cajera',
  '/verificador',
  '/coordinador',
  '/gerente-sucursal'
]

export default defineNuxtRouteMiddleware((to) => {
  const isProtected = PROTECTED_PREFIXES.some(prefix => to.path.startsWith(prefix))

  if (!isProtected) {
    return
  }

  const token = useCookie<string | null>('auth_token', { default: () => null })

  if (!token.value) {
    return navigateTo('/login')
  }
})
