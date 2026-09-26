<script setup lang="ts">
import { ArrowLeft, Clock3 } from '@lucide/vue'

export interface PublicArticleItem {
  id: string | number
  title: string
  excerpt: string
  path: string
  category: string
  readingTime?: number
  cover?: string
}

defineProps<{
  article: PublicArticleItem
}>()

const formatNumber = (val: number) => new Intl.NumberFormat('fa-IR').format(val)
</script>

<template>
  <article
    class="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-card text-right"
    dir="rtl">
    <div v-if="article.cover" class="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-border bg-secondary/30">
      <img :src="article.cover" :alt="article.title" width="640" height="360" loading="lazy"
        class="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105" />
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
</template>
