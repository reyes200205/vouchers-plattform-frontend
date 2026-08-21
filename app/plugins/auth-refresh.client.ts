export default defineNuxtPlugin(async () => {
  const { token, fetchMe } = useAuth()

  // El usuario (incluido su arreglo de "permissions") se guarda en la cookie
  // auth_user al iniciar sesion y NUNCA se vuelve a pedir automaticamente:
  // auth.global.ts solo revisa que exista el token, no refresca el usuario.
  // Si el catalogo de abilities cambia despues de que alguien ya inicio
  // sesion (ej. se le agrega 'inbox.view' a branch_manager en
  // config/business-authorization.php), esa sesion sigue viendo los permisos
  // viejos -- y por lo tanto le sigue faltando "Bandeja de Aprobaciones" en
  // el menu -- hasta que cierra sesion y vuelve a entrar manualmente.
  //
  // Esto refresca el usuario desde /auth/me una vez por carga de la app
  // (no en cada navegacion, para no pedirlo de mas) para que los permisos
  // siempre reflejen el estado actual del backend sin depender de un logout
  // manual del usuario.
  if (token.value) {
    await fetchMe()
  }
})
