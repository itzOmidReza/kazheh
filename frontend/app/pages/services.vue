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

useHead({
  title: 'خدمات روان‌شناسی | کلینیک آرامش',
  meta: [
    {
      name: 'description',
      content:
        'آشنایی با خدمات مشاوره فردی، روابط و همراهی در مسیر تغییر در کلینیک آرامش.',
    },
  ],
})

const services = [
  {
    icon: Sparkles,
    title: 'مشاوره فردی',
    description:
      'فضایی امن برای شناخت بهتر خود، بررسی احساسات و پیدا کردن قدم‌های مناسب برای ادامه مسیر.',
    topics: ['خودشناسی', 'اضطراب و نگرانی', 'تصمیم‌گیری'],
  },
  {
    icon: HeartHandshake,
    title: 'مشاوره روابط',
    description:
      'کمک به درک بهتر الگوهای ارتباطی، نیازها و مرزها در رابطه با خود و دیگران.',
    topics: ['ارتباط مؤثر', 'مرزبندی', 'تعارض‌های رابطه'],
  },
  {
    icon: UsersRound,
    title: 'همراهی در تغییر',
    description:
      'برای زمانی که می‌خواهید الگوهای قدیمی را بهتر بشناسید و تغییر را با قدم‌های کوچک آغاز کنید.',
    topics: ['تغییر عادت‌ها', 'اعتمادبه‌نفس', 'رشد شخصی'],
  },
]

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
  <main>
    <!-- Header -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-3xl">
          <Badge variant="secondary" class="rounded-pill bg-sage-100 text-primary-800">
            خدمات کلینیک
          </Badge>

          <h1 class="mt-6 text-heading-xl text-primary-900">
            مسیری متناسب با
            <span class="text-primary-700">نیاز شما</span>
          </h1>

          <p class="mt-6 text-body-lg text-muted-foreground">
            خدمات ما بر پایه گفت‌وگو، شناخت و همراهی شکل می‌گیرند. برای شروع
            لازم نیست پاسخ همه سؤال‌ها را بدانید.
          </p>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid gap-5 lg:grid-cols-3">
          <Card v-for="(service, index) in services" :key="service.title" :class="[
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
                  : 'bg-sage-100 text-primary-700',
              ]">
                <component :is="service.icon" class="size-5" />
              </span>

              <CardTitle :class="[
                'pt-5 text-2xl',
                index === 0 ? 'text-white' : 'text-primary-900',
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
                {{ service.description }}
              </p>

              <div class="mt-6 flex flex-wrap gap-2">
                <span v-for="topic in service.topics" :key="topic" :class="[
                  'rounded-pill px-3 py-1 text-xs',
                  index === 0
                    ? 'border border-white/15 bg-white/10 text-sage-200'
                    : 'bg-sage-100 text-primary-700',
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
                  : 'text-primary hover:bg-transparent hover:text-primary-700',
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

          <h2 class="mt-4 text-heading-lg text-primary-900">
            کیفیت همراهی، فقط به عنوان خدمت وابسته نیست.
          </h2>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <div v-for="principle in principles" :key="principle.title"
            class="rounded-[1.375rem] border border-border/80 bg-card p-6">
            <span class="flex size-11 items-center justify-center rounded-2xl bg-sage-100 text-primary-700">
              <component :is="principle.icon" class="size-5" />
            </span>

            <h3 class="mt-5 text-lg font-bold text-primary-900">
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
        <div class="rounded-[1.5rem] bg-primary-900 p-8 text-center text-white sm:p-12">
          <h2 class="text-heading-lg text-white">
            نمی‌دانید کدام خدمت برای شما مناسب‌تر است؟
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-sm leading-8 text-sage-200/80">
            می‌توانید در پیام اولیه درباره شرایط خود توضیح کوتاهی بدهید تا
            درباره قدم بعدی گفت‌وگو کنیم.
          </p>

          <Button as-child class="mt-7 rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover">
            <NuxtLink to="/#contact">
              درخواست مشاوره اولیه
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </main>
</template>
