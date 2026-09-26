<script setup lang="ts">
import { ArrowRight, Home, RefreshCw } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { siteConfig, errorPageContent } from '~/data'

const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const statusCode = computed(() => props.error?.statusCode || 500)

const isNotFound = computed(() => statusCode.value === 404)

const title = computed(() =>
  isNotFound.value
    ? errorPageContent.notFoundTitle
    : errorPageContent.serverErrorTitle,
)

const description = computed(() =>
  isNotFound.value
    ? errorPageContent.notFoundDescription
    : errorPageContent.serverErrorDescription,
)

const clearErrorAndGoHome = async () => {
  await clearError({ redirect: '/' })
}

const reloadPage = () => {
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>

<template>
  <main dir="rtl" class="flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
    <div class="relative w-full max-w-2xl text-center">
      <div class="pointer-events-none absolute -right-32 -top-32 size-72 rounded-full bg-sage-200/60 blur-3xl"
        aria-hidden="true" />

      <div class="pointer-events-none absolute -bottom-32 -left-32 size-72 rounded-full bg-warm-300/20 blur-3xl"
        aria-hidden="true" />

      <div class="relative">
        <div
          class="mx-auto flex size-20 items-center justify-center rounded-3xl bg-primary-900 text-3xl font-bold text-white shadow-floating">
          {{ statusCode }}
        </div>

        <p class="mt-8 text-sm font-medium text-primary">
          {{ siteConfig.name }}
        </p>

        <h1 class="mt-4 text-heading-xl text-primary-900">
          {{ title }}
        </h1>

        <p class="mx-auto mt-5 max-w-xl text-body-lg text-muted-foreground">
          {{ description }}
        </p>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button class="rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover" @click="clearErrorAndGoHome">
            <Home class="size-4" />
            {{ errorPageContent.backHomeButton }}
          </Button>

          <Button variant="outline" class="rounded-pill px-6" @click="reloadPage">
            <RefreshCw class="size-4" />
            {{ errorPageContent.retryButton }}
          </Button>
        </div>

        <NuxtLink to="/" class="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:text-primary-700"
          @click="clearErrorAndGoHome">
          <ArrowRight class="size-4" />
          {{ errorPageContent.goHomeLink }}
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
