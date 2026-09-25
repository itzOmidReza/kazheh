// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL || process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['shadcn-nuxt', 'nuxt-lucide-icons', '@nuxt/content'],

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover' },
        { name: 'theme-color', content: '#16484a' },
      ],
    },
  },
});
