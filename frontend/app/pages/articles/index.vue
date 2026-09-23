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

// دریافت مقالات منتشرشده و مرتب‌سازی بر اساس تاریخ
const { data: articles } = await useAsyncData('articles-list', () =>
  queryCollection('articles')
    .where('draft', '<>', true)
    .order('createdAt', 'DESC')
    .all()
)

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
        <div v-if="articles && articles.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="article in articles" :key="article.path || article.slug"
            class="flex h-full flex-col rounded-[1.5rem] border border-border bg-card p-6 transition-shadow hover:shadow-card">
            <div class="flex items-center justify-between gap-3">
              <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                {{ article.category }}
              </span>

              <span v-if="article.readingTime" class="flex items-center gap-1 text-xs text-muted-foreground">
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

            <NuxtLink :to="article.path || `/articles/${article.slug}`"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
              مطالعه مقاله
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </article>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          هنوز مقاله‌ای منتشر نشده است.
        </div>
      </div>
    </section>
  </div>
</template>
