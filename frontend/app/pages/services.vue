<script setup lang="ts">
import { ArrowLeft, Brain, MessageCircle, ShieldCheck } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '~/data/site'
import { servicesList, servicesPageContent } from '~/data/services'

useHead({
  title: `خدمات روان‌شناسی | ${siteConfig.name}`,
  meta: [
    { name: 'description', content: servicesPageContent.description },
    { property: 'og:title', content: `خدمات روان‌شناسی | ${siteConfig.name}` },
    { property: 'og:description', content: servicesPageContent.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fa_IR' },
  ],
  link: [{ rel: 'canonical', href: '/services' }],
})

const principles = [
  {
    icon: Brain,
    title: 'شناخت پیش از تغییر',
    text: 'پیش از انتخاب راه‌حل، تلاش می‌کنیم تجربه و نیاز شما را بهتر بشناسیم.',
  },
  {
    icon: MessageCircle,
    title: 'گفت‌وگوی روشن',
    text: 'سؤال‌ها و نگرانی‌های شما با زبانی ساده و بدون پیچیده‌گویی بررسی می‌شوند.',
  },
  {
    icon: ShieldCheck,
    title: 'احترام به انتخاب شما',
    text: 'ادامه مسیر با آگاهی و رضایت شما شکل می‌گیرد؛ نه با فشار یا وعده‌های قطعی.',
  },
]
</script>

<template>
  <div dir="rtl">
    <!-- Header -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-3xl text-right">
          <Badge variant="secondary"
            class="rounded-pill bg-sage-100 text-primary-800 dark:bg-primary-950 dark:text-sage-300">
            {{ servicesPageContent.badge }}
          </Badge>

          <h1 class="mt-6 text-heading-xl text-foreground">
            {{ servicesPageContent.title }}
          </h1>

          <p class="mt-6 text-body-lg text-muted-foreground">
            {{ servicesPageContent.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid gap-5 lg:grid-cols-3">
          <ServicesServiceCard v-for="(service, index) in servicesList" :key="service.title" :service="service"
            :is-featured="index === 0" />
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-2xl text-right">
          <p class="text-sm font-medium text-primary">
            این خدمات چگونه پیش می‌روند؟
          </p>

          <h2 class="mt-4 text-heading-lg text-foreground">
            {{ servicesPageContent.principlesTitle }}
          </h2>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <ServicesPrincipleCard v-for="principle in principles" :key="principle.title" :title="principle.title"
            :text="principle.text" :icon="principle.icon" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="rounded-3xl bg-primary-900 p-6 text-center text-white sm:p-12">
          <h2 class="text-heading-lg text-white">
            نمی‌دانید کدام خدمت برای شما مناسب‌تر است؟
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-sm leading-8 text-sage-200/80">
            می‌توانید در پیام اولیه درباره شرایط خود توضیح کوتاهی بدهید تا درباره قدم بعدی گفت‌وگو کنیم.
          </p>

          <Button as-child
            class="mt-7 min-h-12 w-full rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover sm:w-auto">
            <NuxtLink to="/#contact">
              <span>درخواست مشاوره اولیه</span>
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
