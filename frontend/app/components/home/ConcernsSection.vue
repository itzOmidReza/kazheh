<script setup lang="ts">
import {
  Brain,
  Heart,
  MessageCircle,
  ArrowLeft,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const concerns = [
  {
    icon: Brain,
    number: '۰۱',
    title: 'ذهن‌تان مدام درگیر است',
    description:
      'فکرهایتان متوقف نمی‌شوند و حتی در زمان استراحت هم احساس آرامش ندارید.',
  },
  {
    icon: Heart,
    number: '۰۲',
    title: 'در رابطه‌ها خسته‌اید',
    description:
      'شاید گفتن نیازهایتان سخت شده یا احساس می‌کنید کسی واقعاً شما را نمی‌شنود.',
  },
  {
    icon: MessageCircle,
    number: '۰۳',
    title: 'از خودتان فاصله گرفته‌اید',
    description:
      'گاهی آن‌قدر درگیر خواسته‌ها و انتظارات دیگران می‌شویم که صدای خودمان را کمتر می‌شنویم.',
  },
]
</script>

<template>
  <section id="concerns" class="section-space overflow-hidden bg-surface">
    <div class="site-container">
      <!-- Section heading -->
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <Badge variant="secondary" class="rounded-pill bg-sage-100 text-primary-800">
            شاید این تجربه برای شما آشنا باشد
          </Badge>

          <h2 class="mt-5 text-heading-xl text-primary-900">
            اگر این روزها ذهن‌تان
            <span class="text-primary-700">شلوغ</span>
            است...
          </h2>

          <p class="mt-5 max-w-xl text-body-lg text-muted-foreground">
            لازم نیست برای شروع گفت‌وگو، مسئله‌تان را دقیق تعریف کرده باشید.
            همین که احساس می‌کنید چیزی نیاز به توجه دارد، می‌تواند نقطه شروع
            خوبی باشد.
          </p>
        </div>

        <Button as-child variant="ghost"
          class="w-fit rounded-pill px-0 text-primary hover:bg-transparent hover:text-primary-700">
          <NuxtLink to="/#contact">
            شروع یک گفت‌وگوی ساده
            <ArrowLeft class="size-4" />
          </NuxtLink>
        </Button>
      </div>

      <!-- Concern cards -->
      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <Card v-for="concern in concerns" :key="concern.number"
          class="group relative overflow-hidden rounded-[1.375rem] border-border/80 bg-card shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card">
          <CardHeader class="relative">
            <div class="flex items-center justify-between">
              <span
                class="flex size-12 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <component :is="concern.icon" class="size-5" />
              </span>

              <span class="text-sm font-semibold text-primary-500/50">
                {{ concern.number }}
              </span>
            </div>

            <CardTitle class="pt-5 text-xl leading-9 text-primary-900">
              {{ concern.title }}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p class="text-sm leading-8 text-muted-foreground">
              {{ concern.description }}
            </p>
          </CardContent>

          <div
            class="absolute -bottom-16 -left-16 size-32 rounded-full bg-sage-100/60 transition-transform duration-500 group-hover:scale-150"
            aria-hidden="true" />
        </Card>
      </div>

      <!-- Closing message -->
      <div class="mt-12 rounded-[1.375rem] border border-warm-300/40 bg-warm-300/15 px-6 py-7 text-center sm:px-10">
        <p class="text-base font-medium leading-8 text-primary-800">
          قرار نیست همه‌چیز را همین امروز حل کنید؛
          گاهی فقط باید جایی امن برای شروع داشته باشید.
        </p>
      </div>
    </div>
  </section>
</template>
