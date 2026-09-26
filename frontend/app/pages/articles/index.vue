<script setup lang="ts">
import { siteConfig } from '~/data'
import type { PublicArticleItem } from '~/components/articles/PublicArticleCard.vue'

useHead({
  title: `مجله و مقالات | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: 'یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.',
    },
  ],
})

const { data: articles } = await useAsyncData<PublicArticleItem[]>('articles-list', async () => {
  try {
    const list = await (queryCollection('articles') as any).all()
    return (list || []).map((item: any) => ({
      id: item.path || item.stem,
      title: item.title,
      excerpt: item.description || item.excerpt || '',
      path: item.path || `/articles/${item.stem}`,
      category: item.category || 'روان‌شناسی',
      readingTime: item.readingTime || 5,
      cover: item.cover || undefined,
    }))
  } catch {
    return []
  }
})
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
          <ArticlesPublicArticleCard v-for="article in articles" :key="article.path" :article="article" />
        </div>

        <div v-else class="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          هنوز مقاله‌ای منتشر نشده است.
        </div>
      </div>
    </section>
  </div>
</template>
