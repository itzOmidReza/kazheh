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

// دریافت مقالات منتشرشده از Nuxt Content
const { data: articles } = await useAsyncData('articles-list', async () => {
  try {
    const list = await (queryCollection('articles') as any).all()
    return list.map((item: any) => ({
      id: item.path || item.stem,
      title: item.title,
      excerpt: item.description || item.excerpt || '',
      path: item.path || `/articles/${item.stem}`,
      slug: item.stem || item.path?.replace('/articles/', ''),
      category: item.category || 'روان‌شناسی',
      readingTime: item.readingTime || 5,
      cover: item.cover || undefined,
    }))
  } catch {
    return []
  }
})

const formatNumber = (val: number) => new Intl.NumberFormat('fa-IR').format(val)
</script>

<template>
  <div dir="rtl">
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-2xl text-right">
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
          <article v-for="article in articles" :key="article.path"
            class="flex h-full flex-col rounded-[1.5rem] border border-border bg-card p-6 transition-shadow hover:shadow-card text-right">
            <div v-if="article.cover" class="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-border bg-secondary/30">
              <img :src="article.cover" :alt="article.title" width="640" height="360" loading="lazy"
                class="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>

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

            <p class="mt-3 flex-1 text-sm leading-8 text-muted-foreground line-clamp-3">
              {{ article.excerpt }}
            </p>

            <NuxtLink :to="article.path"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
              <span>مطالعه مقاله</span>
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
