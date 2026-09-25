export default defineNuxtRouteMiddleware((to) => {
  const { token } = useAuth()

  // If trying to access login page while already authenticated
  if (to.path === '/admin/login') {
    if (token.value) {
      return navigateTo('/admin', { replace: true })
    }
    return
  }

  // If trying to access protected admin routes
  if (to.path.startsWith('/admin')) {
    if (!token.value) {
      return navigateTo('/admin/login', { replace: true })
    }
  }
})
