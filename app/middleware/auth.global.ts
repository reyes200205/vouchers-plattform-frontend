const PROTECTED_PREFIXES = [
  '/general',
  '/distributor-portal',
  '/registro-verificacion'
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
