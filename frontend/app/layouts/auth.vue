<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { siteConfig } from '~/data'
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-300">
    <!-- Ambient Background Accents -->
    <div aria-hidden="true"
      class="pointer-events-none absolute -top-40 right-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
    <div aria-hidden="true"
      class="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-secondary/60 blur-3xl dark:bg-secondary/15" />

    <!-- Header bar -->
    <header class="relative z-10 w-full border-b border-border/40 bg-background/50 backdrop-blur-md">
      <div class="site-container flex h-16 items-center justify-between">
        <NuxtLink to="/"
          class="group flex items-center gap-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
          <span>بازگشت به وب‌سایت</span>
        </NuxtLink>

        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-foreground">
          <span
            class="flex size-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            {{ siteConfig.shortName }}
          </span>
          <span class="text-sm">{{ siteConfig.name }}</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
      <slot />
    </main>

    <!-- Footer note -->
    <footer class="relative z-10 border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
      <div class="site-container">
        <span>تمامی حقوق محفوظ است © {{ new Date().getFullYear() }} {{ siteConfig.name }}</span>
      </div>
    </footer>
  </div>
</template>
