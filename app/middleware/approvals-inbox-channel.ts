// Refuerza a nivel de ruta lo que general.vue ya oculta en el menú:
// gerente general / gerente de sucursal solo pueden entrar a la Bandeja
// de Aprobaciones desde el canal VPN. Sin esto, ocultar el link del menú
// es solo cosmético — la URL directa seguiría siendo accesible.
export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig()
  if (config.public.channel === 'vpn') {
    return
  }

  const { roleCode } = useAuth()
  if (APPROVAL_RESTRICTED_ROLES.includes(roleCode.value ?? '')) {
    return navigateTo('/general')
  }
})
