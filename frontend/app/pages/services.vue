<script setup lang="ts">
import {
  ArrowLeft,
  Brain,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfig } from '~/data/site'
import { servicesList, servicesPageContent } from '~/data/services'

useHead({
  title: `خدمات روان‌شناسی | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: servicesPageContent.description,
    },
    { property: 'og:title', content: 'خدمات روان‌شناسی | کلینیک آرامش' },
    { property: 'og:description', content: 'آشنایی با خدمات مشاوره فردی، روابط و همراهی در مسیر تغییر در کلینیک آرامش.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fa_IR' },
  ],
  link: [{ rel: 'canonical', href: '/services' }],
})

const iconMap: Record<string, any> = {
  Sparkles,
  HeartHandshake,
  UsersRound,
}

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
  <div>
    <!-- Header -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-3xl">
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
          <Card v-for="(service, index) in servicesList" :key="service.title" :class="[
            'group flex h-full flex-col rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1',
            index === 0
              ? 'border-primary-700 bg-primary-900 text-white shadow-floating'
              : 'border-border/80 bg-card hover:shadow-card',
          ]">
            <CardHeader>
              <span :class="[
                'flex size-12 items-center justify-center rounded-2xl',
                index === 0
                  ? 'bg-sage-200 text-primary-900'
                  : 'bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300',
              ]">
                <component :is="iconMap[service.icon] || Sparkles" class="size-5" />
              </span>

              <CardTitle :class="[
                'pt-5 text-2xl',
                index === 0 ? 'text-white' : 'text-foreground',
              ]">
                {{ service.title }}
              </CardTitle>
            </CardHeader>

            <CardContent class="flex-1">
              <p :class="[
                'text-sm leading-8',
                index === 0
                  ? 'text-sage-200/80'
                  : 'text-muted-foreground',
              ]">
                {{ service.fullDescription || service.shortDescription }}
              </p>

              <div class="mt-6 flex flex-wrap gap-2">
                <span v-for="topic in service.topics" :key="topic" :class="[
                  'rounded-pill px-3 py-1 text-xs',
                  index === 0
                    ? 'border border-white/15 bg-white/10 text-sage-200'
                    : 'bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300',
                ]">
                  {{ topic }}
                </span>
              </div>
            </CardContent>

            <CardFooter class="pt-8">
              <Button as-child variant="ghost" :class="[
                'rounded-pill px-0',
                index === 0
                  ? 'text-sage-200 hover:bg-transparent hover:text-white'
                  : 'text-primary hover:bg-transparent hover:text-primary-700 dark:hover:text-primary-foreground',
              ]">
                <NuxtLink to="/#contact">
                  درباره شروع این مسیر
                  <ArrowLeft class="size-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Principles -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-2xl">
          <p class="text-sm font-medium text-primary">
            این خدمات چگونه پیش می‌روند؟
          </p>

          <h2 class="mt-4 text-heading-lg text-foreground">
            {{ servicesPageContent.principlesTitle }}
          </h2>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div v-for="principle in principles" :key="principle.title"
            class="rounded-[1.375rem] border border-border/80 bg-card p-6">
            <span
              class="flex size-11 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300">
              <component :is="principle.icon" class="size-5" />
            </span>

            <h3 class="mt-5 text-lg font-bold text-foreground">
              {{ principle.title }}
            </h3>

            <p class="mt-3 text-sm leading-8 text-muted-foreground">
              {{ principle.text }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="rounded-[1.5rem] bg-primary-900 p-6 text-center text-white sm:p-12">
          <h2 class="text-heading-lg text-white">
            نمی‌دانید کدام خدمت برای شما مناسب‌تر است؟
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-sm leading-8 text-sage-200/80">
            می‌توانید در پیام اولیه درباره شرایط خود توضیح کوتاهی بدهید تا درباره قدم بعدی گفت‌وگو کنیم.
          </p>

          <Button as-child class="mt-7 min-h-12 w-full rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover sm:w-auto">
            <NuxtLink to="/#contact">
              درخواست مشاوره اولیه
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
