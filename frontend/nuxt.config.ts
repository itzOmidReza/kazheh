// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['shadcn-nuxt', 'nuxt-lucide-icons', '@nuxt/content', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_URL || '/api/v1',
    },
  },

  nitro: {
    routeRules: {
      '/static/**': {
        proxy:
          `${process.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/static/**`.replace(
            /\/api\/v1\/static\/\*\*/,
            '/static/**',
          ),
      },
    },
  },

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
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
        },
        { name: 'theme-color', content: '#16484a' },
      ],
    },
  },
});
