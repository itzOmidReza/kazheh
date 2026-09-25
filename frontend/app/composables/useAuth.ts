import type { AdminUser, Token } from '~/types/api'

export const useAuth = () => {
  const tokenCookie = useCookie<string | null>('admin_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: false, // Ensure cookies function across standalone HTTP/HTTPS deployments
    path: '/',
  })

  const tokenState = useState<string | null>('admin_token_state', () => tokenCookie.value)
  const admin = useState<AdminUser | null>('admin_user', () => null)
  const isLoading = useState<boolean>('admin_auth_loading', () => false)

  // Initialize from localStorage on client-side if cookie is not yet loaded
  if (import.meta.client && !tokenState.value) {
    try {
      const localToken = localStorage.getItem('admin_token') || localStorage.getItem('access_token')
      if (localToken) {
        tokenState.value = localToken
        tokenCookie.value = localToken
      }
    } catch {
      // Ignore storage restrictions
    }
  }

  // Unified reactive token getter/setter syncing Cookie, useState, and localStorage
  const token = computed<string | null>({
    get: () => {
      if (tokenState.value) return tokenState.value
      if (tokenCookie.value) return tokenCookie.value
      if (import.meta.client) {
        try {
          return localStorage.getItem('admin_token') || localStorage.getItem('access_token') || null
        } catch {
          return null
        }
      }
      return null
    },
    set: (val: string | null) => {
      tokenState.value = val
      tokenCookie.value = val
      if (import.meta.client) {
        try {
          if (val) {
            localStorage.setItem('admin_token', val)
            localStorage.setItem('access_token', val)
          } else {
            localStorage.removeItem('admin_token')
            localStorage.removeItem('access_token')
          }
        } catch {
          // Ignore storage restrictions
        }
      }
    },
  })

  const isAuthenticated = computed(() => Boolean(token.value))

  const config = useRuntimeConfig()
  const apiBase = config.public.apiBaseUrl as string

  const login = async (phone: string, password: string): Promise<boolean> => {
    isLoading.value = true
    try {
      const body = new URLSearchParams()
      body.append('username', phone.trim())
      body.append('password', password)

      const response = await $fetch<any>(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
        timeout: 10000,
      })

      // Extract access token regardless of wrapper format (direct or wrapped in data)
      const accessToken =
        response?.access_token ||
        response?.data?.access_token ||
        response?.data?.token ||
        response?.token

      if (accessToken) {
        token.value = accessToken
        // Eagerly initiate profile fetch in the background without blocking login completion
        fetchProfile().catch(() => {})
        return true
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const fetchProfile = async (): Promise<AdminUser | null> => {
    const currentToken = token.value
    if (!currentToken) {
      admin.value = null
      return null
    }

    try {
      const user = await $fetch<AdminUser>(`${apiBase}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        timeout: 10000,
      })
      admin.value = user
      return user
    } catch (err: any) {
      const status = err?.response?.status || err?.status || err?.statusCode
      // Only wipe session if the server explicitly responded with 401 Unauthorized
      if (status === 401) {
        token.value = null
        admin.value = null
      }
      return null
    }
  }

  const logout = () => {
    token.value = null
    admin.value = null
    navigateTo('/admin/login', { replace: true })
  }

  return {
    token,
    admin,
    isLoading,
    isAuthenticated,
    login,
    logout,
    fetchProfile,
  }
}

