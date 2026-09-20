<script setup lang="ts">
import {
  ArrowLeft,
  Check,
  LockKeyhole,
  MessageCircle,
  Sparkles,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <section id="hero" class="relative isolate overflow-hidden bg-background">
    <!-- Decorative background -->
    <div class="pointer-events-none absolute -right-40 -top-40 -z-10 size-[28rem] rounded-full bg-sage-200/60 blur-3xl"
      aria-hidden="true" />

    <div
      class="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[30rem] rounded-full bg-warm-300/20 blur-3xl"
      aria-hidden="true" />

    <div class="site-container">
      <div
        class="grid min-h-[calc(100svh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
        <!-- Content -->
        <div class="max-w-2xl">
          <Badge variant="secondary"
            class="mb-6 rounded-pill border border-sage-300/70 bg-sage-100 px-4 py-2 text-xs font-medium text-primary-800">
            <Sparkles class="ml-2 size-3.5" />
            فضایی برای آرام‌تر دیدن
          </Badge>

          <h1 class="max-w-xl text-display font-extrabold tracking-tight text-primary-900">
            لازم نیست این مسیر را
            <span class="relative inline-block text-primary-700">
              تنها
              <span class="absolute -bottom-1 right-0 h-2 w-full rounded-full bg-warm-300/60" aria-hidden="true" />
            </span>
            طی کنید.
          </h1>

          <p class="mt-7 max-w-xl text-body-lg text-muted-foreground">
            اگر هنوز نمی‌دانید دقیقاً چه چیزی آزارتان می‌دهد، گفت‌وگو
            می‌تواند نقطه شروع خوبی برای شناختن خود و ساختن قدم‌های بعدی
            باشد.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button as-child size="lg"
              class="h-13 rounded-pill bg-cta px-7 text-base font-bold text-cta-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-card">
              <NuxtLink to="/#contact">
                درخواست مشاوره اولیه
                <ArrowLeft class="size-5" />
              </NuxtLink>
            </Button>

            <Button as-child variant="outline" size="lg"
              class="h-13 rounded-pill border-primary/20 bg-background/70 px-7 text-base text-primary hover:bg-secondary">
              <NuxtLink to="/#approach">
                آشنایی با روش کاری
              </NuxtLink>
            </Button>
          </div>

          <!-- Trust points -->
          <div class="mt-10 grid max-w-lg gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div class="flex items-start gap-3">
              <span
                class="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-primary-700">
                <Check class="size-4" />
              </span>

              <span class="text-sm leading-7 text-muted-foreground">
                شنیدن بدون قضاوت
              </span>
            </div>

            <div class="flex items-start gap-3">
              <span
                class="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-primary-700">
                <LockKeyhole class="size-4" />
              </span>

              <span class="text-sm leading-7 text-muted-foreground">
                حفظ محرمانگی
              </span>
            </div>

            <div class="flex items-start gap-3">
              <span
                class="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-primary-700">
                <MessageCircle class="size-4" />
              </span>

              <span class="text-sm leading-7 text-muted-foreground">
                گفت‌وگوی انسانی
              </span>
            </div>
          </div>
        </div>

        <!-- Visual panel -->
        <div class="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div class="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-primary-900 p-5 shadow-floating sm:p-7">
            <!-- Soft shapes -->
            <div class="absolute -right-20 -top-20 size-64 rounded-full bg-primary-700/70 blur-2xl"
              aria-hidden="true" />

            <div class="absolute -bottom-20 -left-16 size-64 rounded-full bg-warm-500/30 blur-3xl" aria-hidden="true" />

            <!-- Inner card -->
            <div
              class="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <div class="flex items-start justify-between gap-4">
                <span class="flex size-12 items-center justify-center rounded-2xl bg-sage-200 text-primary-900">
                  <MessageCircle class="size-6" />
                </span>

                <span class="rounded-pill border border-white/20 px-3 py-1 text-xs text-sage-200">
                  فضای امن و محرمانه
                </span>
              </div>

              <div class="py-12">
                <p class="text-sm text-sage-200/80">
                  یک مکث کوتاه
                </p>

                <p class="mt-4 max-w-sm text-3xl font-bold leading-[1.8] text-white sm:text-4xl">
                  گاهی شروع تغییر،
                  فقط با یک گفت‌وگوی صادقانه آغاز می‌شود.
                </p>
              </div>

              <div class="flex items-center justify-between gap-4 border-t border-white/15 pt-5">
                <div>
                  <p class="text-sm font-semibold text-white">
                    کلینیک آرامش
                  </p>

                  <p class="mt-1 text-xs text-sage-200/70">
                    روان‌شناسی آگاهانه و انسانی
                  </p>
                </div>

                <div class="flex size-11 items-center justify-center rounded-full bg-warm-300 text-primary-900">
                  <ArrowLeft class="size-5" />
                </div>
              </div>
            </div>
          </div>

          <!-- Floating note -->
          <div
            class="absolute -bottom-5 -right-4 max-w-[15rem] rounded-2xl border border-border/80 bg-card p-4 shadow-card sm:-right-8">
            <div class="flex items-start gap-3">
              <span class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-primary-700">
                <LockKeyhole class="size-4" />
              </span>

              <div>
                <p class="text-sm font-semibold text-card-foreground">
                  حریم خصوصی شما مهم است
                </p>

                <p class="mt-1 text-xs leading-6 text-muted-foreground">
                  گفت‌وگوها با احترام و محرمانگی همراه هستند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
