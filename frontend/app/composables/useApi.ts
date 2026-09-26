import { toast } from 'vue-sonner';

export function useApi() {
  const config = useRuntimeConfig();
  const token = useCookie<string | null>('kazheh_token');

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      // ایجاد یک نمونه استاندارد Headers برای رفع خطای تایپ‌اسکریپت
      const headers = new Headers(options.headers);

      if (token.value) {
        headers.set('Authorization', `Bearer ${token.value}`);
      }

      options.headers = headers;
    },
    onResponseError({ response }) {
      const status = response.status;
      const data = response._data;

      // مدیریت خطای انقضا یا عدم دسترسی
      if (status === 401) {
        token.value = null;
        if (
          import.meta.client &&
          !window.location.pathname.startsWith('/admin/login')
        ) {
          navigateTo('/admin/login');
          toast.error('نشست شما منقضی شده است. لطفاً مجدداً وارد شوید.');
        }
        return;
      }

      // استخراج و تبدیل پیام خطای Pydantic 422
      if (status === 422 && Array.isArray(data?.detail)) {
        const errorMsg = data.detail.map((err: any) => err.msg).join(' - ');
        toast.error(`خطای اعتبارسنجی: ${errorMsg}`);
        return;
      }

      // خطاهای عمومی با متن detail
      if (data?.detail && typeof data.detail === 'string') {
        toast.error(data.detail);
      }
    },
  });

  return {
    apiFetch,
  };
}
