export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/general')) {
    setPageLayout('general')
  } else if (to.path.startsWith('/register-distributors')) {
    setPageLayout('register-distributors')
  } else if (to.path.startsWith('/distributor-portal')) {
    setPageLayout('distributor-portal')
  } else if (!to.meta.layout) {
    setPageLayout('default')
  }
})
