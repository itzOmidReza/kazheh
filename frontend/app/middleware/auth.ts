export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  // پاس دادن nuxtApp.$pinia مانع از خطای getActivePinia می‌شود
  const authStore = useAuthStore(nuxtApp.$pinia);

  // اگر توکن کوکی وجود دارد ولی مشخصات ادمین هنوز لود نشده
  if (authStore.token && !authStore.user) {
    await authStore.fetchCurrentUser();
  }

  // اگر کاربر لاگین نکرده و می‌خواهد وارد پنل ادمین شود
  if (
    !authStore.isAuthenticated &&
    to.path.startsWith('/admin') &&
    to.path !== '/admin/login'
  ) {
    return navigateTo('/admin/login');
  }

  // اگر کاربر از قبل لاگین است و صفحه لاگین را باز کرده
  if (authStore.isAuthenticated && to.path === '/admin/login') {
    return navigateTo('/admin');
  }
});
