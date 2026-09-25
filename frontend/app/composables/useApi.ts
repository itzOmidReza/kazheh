import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBaseUrl as string
  const { token, logout } = useAuth()
  const route = useRoute()

  const apiFetch = async <T = any>(
    path: string,
    options: NitroFetchOptions<NitroFetchRequest> = {}
  ): Promise<T> => {
    const url = path.startsWith('http') ? path : `${apiBase}${path.startsWith('/') ? path : `/${path}`}`

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    }

    if (token.value && !headers.Authorization) {
      headers.Authorization = `Bearer ${token.value}`
    }

    try {
      return await $fetch<T>(url, {
        // Enforce 15-second request timeout to prevent hanging connections
        timeout: (options as any).timeout ?? 15000,
        ...options,
        headers,
      })
    } catch (err: any) {
      // 401 Unauthorized handling: clear expired auth state and redirect unless already on login page
      if (err?.response?.status === 401 && token.value) {
        if (route.path !== '/admin/login') {
          logout()
        }
      }
      throw err
    }
  }

  const getErrorMessage = (err: any, fallback = 'خطایی در ارتباط با سرور رخ داده است.'): string => {
    if (!err) return fallback
    if (err?.name === 'AbortError' || err?.message?.includes('timeout')) {
      return 'زمان اتصال به سرور به پایان رسید. لطفاً اتصال اینترنت خود را بررسی کنید.'
    }
    const detail = err?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail)) {
      return detail.map((d: any) => d.msg || d).join(' - ')
    }
    return err?.message || fallback
  }

  return {
    apiFetch,
    apiBase,
    getErrorMessage,
  }
}
