<script setup lang="ts">
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Signpost,
} from '@lucide/vue'

import { Button } from '@/components/ui/button'

const steps = [
  {
    number: '۰۱',
    icon: MessageCircle,
    title: 'پیام بگذارید',
    description:
      'از بخش تماس، درخواست گفت‌وگو را ارسال کنید. اگر مایل بودید، چند خط درباره موضوعی که ذهن‌تان را مشغول کرده بنویسید.',
    note: 'لازم نیست همه جزئیات را همین ابتدا بیان کنید.',
  },
  {
    number: '۰۲',
    icon: Phone,
    title: 'گفت‌وگوی اولیه',
    description:
      'پس از هماهنگی، درباره نیازها و سؤال‌های شما صحبت می‌کنیم تا تصویر روشن‌تری از نحوه شروع داشته باشید.',
    note: 'فرصتی برای پرسیدن و آشنایی بیشتر.',
  },
  {
    number: '۰۳',
    icon: Signpost,
    title: 'مسیر مناسب شما',
    description:
      'درباره شیوه ادامه، زمان‌بندی و شرایط جلسات گفت‌وگو می‌کنیم تا بتوانید با آگاهی بیشتری تصمیم بگیرید.',
    note: 'ادامه مسیر با تصمیم و همراهی شماست.',
  },
]
</script>

<template>
  <section id="process" aria-labelledby="process-title" class="section-space bg-background">
    <div class="site-container">
      <!-- Introduction -->
      <div class="mx-auto max-w-2xl text-center">
        <span class="inline-flex rounded-pill bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
          از کجا شروع کنیم؟
        </span>

        <h2 id="process-title" class="mt-5 text-heading-xl text-foreground">
          اولین قدم، می‌تواند
          <span class="text-primary">ساده باشد.</span>
        </h2>

        <p class="mt-5 text-body-lg text-muted-foreground">
          برای شروع، لازم نیست از همه‌چیز مطمئن باشید.
          کافی است بدانید در هر مرحله چه چیزی در انتظار شماست.
        </p>
      </div>

      <!-- Steps -->
      <ol class="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-10">
        <li v-for="step in steps" :key="step.number" class="relative flex gap-5 lg:flex-col lg:gap-6">
          <div class="flex shrink-0 flex-col items-center">
            <span
              class="flex size-14 items-center justify-center rounded-full border border-border bg-secondary text-lg font-bold text-secondary-foreground lg:size-16"
              aria-hidden="true">
              {{ step.number }}
            </span>

            <span class="mt-4 w-px flex-1 bg-border lg:hidden" aria-hidden="true" />
          </div>

          <div class="min-w-0 flex-1 pb-4 lg:pb-0">
            <div class="flex items-center gap-3">
              <component :is="step.icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />

              <h3 class="text-xl font-bold leading-9 text-foreground">
                {{ step.title }}
              </h3>
            </div>

            <p class="mt-4 text-body text-muted-foreground">
              {{ step.description }}
            </p>

            <p class="mt-5 border-s-2 border-warm-500 ps-4 text-sm leading-7 text-foreground">
              {{ step.note }}
            </p>
          </div>
        </li>
      </ol>

      <!-- Contact invitation -->
      <div
        class="mt-12 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-surface p-6 sm:p-8 lg:mt-16 lg:flex-row lg:items-center">
        <div class="max-w-xl">
          <h3 class="text-lg font-semibold text-foreground">
            می‌توانید از همان چیزی شروع کنید که گفتنش برایتان راحت‌تر است.
          </h3>

          <p class="mt-2 text-sm leading-7 text-muted-foreground">
            در پیام اولیه، فقط اطلاعاتی را بنویسید که مایل به اشتراک‌گذاری
            آن هستید.
          </p>
        </div>

        <Button as-child size="lg"
          class="min-h-12 w-full shrink-0 rounded-pill bg-cta px-6 text-sm font-semibold text-cta-foreground hover:bg-cta-hover sm:w-auto">
          <NuxtLink to="/#contact">
            درخواست مشاوره اولیه
            <ArrowLeft class="size-4" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
