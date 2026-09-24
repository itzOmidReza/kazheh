import type { AdminUser, Token } from '~/types/api'

export const useAuth = () => {
  const token = useCookie<string | null>('admin_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  const admin = useState<AdminUser | null>('admin_user', () => null)
  const isLoading = useState<boolean>('admin_auth_loading', () => false)

  const isAuthenticated = computed(() => Boolean(token.value))

  const config = useRuntimeConfig()
  const apiBase = config.public.apiBaseUrl as string

  const login = async (phone: string, password: string): Promise<boolean> => {
    isLoading.value = true
    try {
      const body = new URLSearchParams()
      body.append('username', phone.trim())
      body.append('password', password)

      const response = await $fetch<Token>(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      })

      if (response && response.access_token) {
        token.value = response.access_token
        await fetchProfile()
        return true
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const fetchProfile = async (): Promise<AdminUser | null> => {
    if (!token.value) {
      admin.value = null
      return null
    }

    try {
      const user = await $fetch<AdminUser>(`${apiBase}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      admin.value = user
      return user
    } catch {
      token.value = null
      admin.value = null
      return null
    }
  }

  const logout = () => {
    token.value = null
    admin.value = null
    navigateTo('/admin/login')
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

