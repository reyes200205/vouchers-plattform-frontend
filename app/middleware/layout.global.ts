export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/general')) {
    setPageLayout('general')
  } else if (to.path.startsWith('/registro-verificacion')) {
    setPageLayout('registro-verificacion')
  } else if (to.path.startsWith('/distributor-portal')) {
    setPageLayout('distributor-portal')
  } else if (!to.meta.layout) {
    setPageLayout('default')
  }
})
