<script setup lang="ts">
import {
  ArrowLeft,
  Brain,
  HeartHandshake,
  Sprout,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const principles = [
  {
    icon: HeartHandshake,
    number: '۰۱',
    title: 'شنیدن بدون قضاوت',
    description:
      'اینجا قرار نیست برای احساسات یا تجربه‌های شما برچسبی زده شود. ابتدا می‌شنویم و بعد با هم نگاه می‌کنیم.',
  },
  {
    icon: Brain,
    number: '۰۲',
    title: 'تکیه بر دانش روز',
    description:
      'گفت‌وگوها بر پایه رویکردهای علمی و در عین حال با زبانی ساده و قابل فهم پیش می‌روند.',
  },
  {
    icon: Sprout,
    number: '۰۳',
    title: 'قدم‌های کوچک و ماندگار',
    description:
      'تغییر همیشه ناگهانی اتفاق نمی‌افتد. مسیر را به قدم‌هایی قابل‌فهم، قابل‌اجرا و متناسب با شما تقسیم می‌کنیم.',
  },
]
</script>

<template>
  <section id="approach" class="section-space overflow-hidden bg-primary-900 text-white">
    <div class="site-container">
      <div class="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <!-- Intro -->
        <div class="lg:sticky lg:top-28">
          <Badge variant="secondary" class="rounded-pill border border-white/10 bg-white/10 text-sage-200">
            رویکرد ما
          </Badge>

          <h2 class="mt-5 text-heading-xl text-white">
            درمان فقط پیدا کردن پاسخ نیست؛
            <span class="text-sage-300">
              ساختن فضای درست برای دیدن است.
            </span>
          </h2>

          <p class="mt-6 text-body-lg text-sage-200/75">
            هر فرد مسیر متفاوتی دارد. هدف این است که در فضایی امن و
            محترمانه، امکان دیدن، فهمیدن و انتخاب کردن دوباره فراهم شود.
          </p>

          <Button as-child variant="outline"
            class="mt-8 rounded-pill border-white/20 bg-transparent px-5 text-sage-200 hover:bg-white/10 hover:text-white">
            <NuxtLink to="/#contact">
              درباره شروع مسیر بدانید
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>

        <!-- Principles -->
        <div class="relative">
          <div class="absolute right-6 top-8 h-[calc(100%-4rem)] w-px bg-white/15" aria-hidden="true" />

          <div class="space-y-10">
            <article v-for="principle in principles" :key="principle.number" class="group relative flex gap-6">
              <div class="relative z-10 shrink-0">
                <span
                  class="flex size-14 items-center justify-center rounded-2xl border border-sage-300/30 bg-primary-800 text-sage-200 transition-colors duration-300 group-hover:border-warm-300 group-hover:bg-warm-300 group-hover:text-primary-900">
                  <component :is="principle.icon" class="size-6" />
                </span>
              </div>

              <div class="pb-2">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-semibold text-warm-300">
                    {{ principle.number }}
                  </span>

                  <h3 class="text-xl font-bold text-white">
                    {{ principle.title }}
                  </h3>
                </div>

                <p class="mt-3 max-w-xl text-sm leading-8 text-sage-200/75">
                  {{ principle.description }}
                </p>
              </div>
            </article>
          </div>

          <div class="mt-12 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <p class="text-lg font-semibold leading-9 text-sage-100">
              «قرار نیست برای بهتر شدن، شبیه شخص دیگری شوید؛
              قرار است خودتان را با وضوح و مهربانی بیشتری ببینید.»
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
