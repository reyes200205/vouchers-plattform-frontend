const PROTECTED_PREFIXES = [
  '/general',
  '/distributor-portal',
  '/registro-verificacion'
]

export default defineNuxtRouteMiddleware(async (to) => {
  const isProtected = PROTECTED_PREFIXES.some(prefix => to.path.startsWith(prefix))

  if (!isProtected) {
    return
  }

  const { token, fetchMe, logout } = useAuth()

  if (!token.value) {
    return navigateTo('/login')
  }

  const profile = await fetchMe()
  if (!profile) {
    await logout()
    return navigateTo('/login')
  }
})
