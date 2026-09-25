export default defineNuxtRouteMiddleware(async (to) => {
  const { token, admin, fetchProfile } = useAuth()

  // If trying to access login page while already authenticated
  if (to.path === '/admin/login') {
    if (token.value) {
      if (!admin.value) {
        await fetchProfile()
      }
      if (admin.value) {
        return navigateTo('/admin')
      }
    }
    return
  }

  // If trying to access protected admin routes
  if (to.path.startsWith('/admin')) {
    if (!token.value) {
      return navigateTo('/admin/login')
    }

    if (!admin.value) {
      const user = await fetchProfile()
      if (!user) {
        return navigateTo('/admin/login')
      }
    }
  }
})

