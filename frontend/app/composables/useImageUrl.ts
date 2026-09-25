export const useImageUrl = () => {
  const config = useRuntimeConfig()
  const apiBase = (config.public.apiBaseUrl as string) || 'http://127.0.0.1:8000/api/v1'
  const backendOrigin = apiBase.replace(/\/api\/v1\/?$/, '')

  const resolveImageUrl = (path?: string | null): string => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path
    }
    return `${backendOrigin}${path.startsWith('/') ? path : `/${path}`}`
  }

  return {
    resolveImageUrl,
  }
}

