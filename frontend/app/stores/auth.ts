import { defineStore } from 'pinia';
import { toast } from 'vue-sonner';

export interface AdminUser {
  id: number;
  phone: string;
  username: string;
  full_name: string;
  email?: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie<string | null>('kazheh_token', {
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    secure: !import.meta.dev,
  });

  const user = ref<AdminUser | null>(null);
  const isLoading = ref(false);
  const isAuthenticated = computed(() => !!token.value);

  // ورود به حساب کاربری
  // ورود به حساب کاربری
  const login = async (phone: string, pass: string) => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const body = new URLSearchParams();
      body.append('username', phone.trim());
      body.append('password', pass);

      const res = await apiFetch<{ access_token: string; token_type: string }>(
        '/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        },
      );

      // 👇 این دو خط دقیقاً اینجا بعد از دریافت پاسخ res قرار می‌گیرند:
      token.value = res.access_token;
      await fetchCurrentUser(res.access_token);

      toast.success('ورود با موفقیت انجام شد.');
      await navigateTo('/admin');
      return true;
    } catch (err: any) {
      if (err.status === 401) {
        toast.error('شماره تماس یا کلمه عبور اشتباه است.');
      } else if (err.status === 429) {
        toast.error('تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید.');
      } else {
        toast.error('خطا در ورود به سامانه.');
      }
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // دریافت اطلاعات پروفایل مدیر واردشده
  // متد fetchCurrentUser را به این شکل تغییر دهید
  const fetchCurrentUser = async (explicitToken?: string) => {
    const currentToken = explicitToken || token.value;
    if (!currentToken) return;

    const { apiFetch } = useApi();

    try {
      const profile = await apiFetch<AdminUser>('/auth/me', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      user.value = profile;
    } catch {
      user.value = null;
      token.value = null;
    }
  };
  // خروج از حساب
  const logout = () => {
    token.value = null;
    user.value = null;
    toast.info('از حساب خود خارج شدید.');
    navigateTo('/admin/login');
  };

  // دریافت مشخصات کاربر ادمین جاری
  const fetchProfile = async () => {
    const { apiFetch } = useApi();
    try {
      const data = await apiFetch<AdminUser>('/auth/me', {
        method: 'GET',
      });
      user.value = data;
      return data;
    } catch {
      return null;
    }
  };

  // تغییر کلمه عبور ادمین
  const changePassword = async (payload: {
    current_password: string;
    new_password: string;
  }) => {
    const { apiFetch } = useApi();
    try {
      await apiFetch('/auth/change-password', {
        method: 'POST',
        body: payload,
      });
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err.data?.detail || 'خطا در تغییر کلمه عبور',
      };
    }
  };
  return {
    token,
    user,
    isLoading,
    isAuthenticated,
    login,
    fetchCurrentUser,
    logout,
    fetchProfile,
    changePassword,
  };
});
