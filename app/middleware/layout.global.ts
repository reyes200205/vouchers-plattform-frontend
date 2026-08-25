export default defineNuxtRouteMiddleware((to) => {
  // Si la propia página ya definió su layout con definePageMeta (incluido
  // `layout: false`, para pantallas de una sola vista que arman su propio
  // shell de pantalla completa), se respeta esa decisión y no se pisa aquí
  // por coincidir con el prefijo de la URL.
  if (to.meta.layout !== undefined) {
    return
  }

  if (to.path.startsWith('/general')) {
    setPageLayout('general')
  } else if (to.path.startsWith('/registro-verificacion')) {
    setPageLayout('registro-verificacion')
  } else if (to.path.startsWith('/distributor-portal')) {
    setPageLayout('distributor-portal')
  } else {
    setPageLayout('default')
  }
})
