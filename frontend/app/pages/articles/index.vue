<script setup lang="ts">
import { ArrowLeft, Clock3 } from '@lucide/vue'
import { siteConfig } from '~/data'

useHead({
  title: `مجله و مقالات | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: 'یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.',
    },
  ],
})

const articles = [
  {
    slug: 'understanding-anxiety',
    category: 'اضطراب و نگرانی',
    title: 'چطور اضطراب را بهتر بشناسیم؟',
    excerpt:
      'گاهی شناختن آنچه در ذهن و بدن ما می‌گذرد، اولین قدم برای برخورد آرام‌تر با اضطراب است.',
    readingTime: 6,
  },
  {
    slug: 'healthy-boundaries',
    category: 'روابط',
    title: 'مرزهای سالم در رابطه چه معنایی دارند؟',
    excerpt:
      'مرزبندی به معنی فاصله گرفتن از دیگران نیست؛ راهی برای شناختن نیازها و احترام متقابل است.',
    readingTime: 5,
  },
  {
    slug: 'starting-therapy',
    category: 'شروع درمان',
    title: 'اگر برای شروع مشاوره مردد هستید',
    excerpt:
      'مردد بودن پیش از اولین گفت‌وگو طبیعی است. چند نکته می‌تواند تصمیم‌گیری را ساده‌تر کند.',
    readingTime: 4,
  },
]

const formatNumber = (val: number) => new Intl.NumberFormat('fa-IR').format(val)
</script>

<template>
  <div>
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-2xl">
          <p class="text-sm font-medium text-primary">
            مجله {{ siteConfig.name }}
          </p>

          <h1 class="mt-4 text-heading-xl text-foreground">
            برای شناخت بیشتر خودتان
          </h1>

          <p class="mt-5 text-body-lg text-muted-foreground">
            یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.
          </p>
        </div>
      </div>
    </section>

    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="article in articles" :key="article.slug"
            class="flex h-full flex-col rounded-[1.5rem] border border-border bg-card p-6 transition-shadow hover:shadow-card">
            <div class="flex items-center justify-between gap-3">
              <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                {{ article.category }}
              </span>

              <span class="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 class="size-3.5" />
                {{ formatNumber(article.readingTime) }} دقیقه
              </span>
            </div>

            <h2 class="mt-6 text-xl font-bold leading-9 text-foreground">
              {{ article.title }}
            </h2>

            <p class="mt-3 flex-1 text-sm leading-8 text-muted-foreground">
              {{ article.excerpt }}
            </p>

            <NuxtLink :to="`/articles/${article.slug}`"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
              مطالعه مقاله
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
