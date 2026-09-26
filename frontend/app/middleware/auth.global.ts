import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const isAdminRoute = to.path.startsWith('/admin');
  const isLoginPage = to.path === '/admin/login';

  // اگر کاربر قصد ورود به مسیرهای ادمین را دارد ولی وارد سیستم نشده است
  if (isAdminRoute && !isLoginPage && !authStore.isAuthenticated) {
    return navigateTo({
      path: '/admin/login',
      query: { redirect: to.fullPath },
    });
  }

  // اگر کاربر قبلاً لاگین کرده و می‌خواهد دوباره صفحه لاگین را باز کند
  if (isLoginPage && authStore.isAuthenticated) {
    return navigateTo('/admin');
  }
});
