<script setup lang="ts">
import { ArrowLeft, Clock3 } from '@lucide/vue'
import { Skeleton } from '@/components/ui/skeleton'
import { stripMarkdown } from '~/utils/markdown'
import type { ArticleListItem } from '~/types/api'

useHead({
  title: 'مجله و مقالات تخصصی روان‌شناسی | کلینیک آرامش',
  meta: [
    {
      name: 'description',
      content: 'یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.',
    },
    { property: 'og:title', content: 'مجله و مقالات تخصصی روان‌شناسی | کلینیک آرامش' },
    { property: 'og:description', content: 'یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fa_IR' },
  ],
  link: [{ rel: 'canonical', href: '/articles' }],
})

const { apiFetch } = useApi()
const { resolveImageUrl } = useImageUrl()

const { data: articles, status } = await useAsyncData<ArticleListItem[]>('public-articles', () =>
  apiFetch('/articles?limit=50')
)

const calculateReadingTime = (text?: string | null) => {
  if (!text) return 4
  const words = text.trim().split(/\s+/).length
  return Math.max(2, Math.ceil(words / 150))
}
</script>

<template>
  <main>
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-2xl">
          <p class="text-sm font-medium text-primary">
            مجله کلینیک آرامش
          </p>

          <h1 class="mt-4 text-heading-xl text-primary-900">
            برای شناخت بیشتر خودتان
          </h1>

          <p class="mt-5 text-body-lg text-muted-foreground">
            یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های
            روزمره.
          </p>
        </div>
      </div>
    </section>

    <section class="section-space bg-background">
      <div class="site-container">
        <!-- Loading state -->
        <div v-if="status === 'pending'" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 3" :key="i" class="flex h-72 flex-col rounded-[1.5rem] border border-border bg-card p-6">
            <div class="flex items-center justify-between">
              <Skeleton class="h-6 w-20 rounded-pill" />
              <Skeleton class="h-4 w-16" />
            </div>
            <Skeleton class="mt-6 h-6 w-3/4" />
            <Skeleton class="mt-4 h-4 w-full" />
            <Skeleton class="mt-2 h-4 w-2/3" />
            <Skeleton class="mt-auto h-4 w-24" />
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!articles || articles.length === 0" class="rounded-[1.5rem] border border-border bg-card p-12 text-center">
          <p class="text-lg font-medium text-primary-900">
            هنوز مقاله‌ای منتشر نشده است.
          </p>
          <p class="mt-2 text-sm text-muted-foreground">
            به‌زودی مقالات جدید در این بخش قرار خواهند گرفت.
          </p>
        </div>

        <!-- Articles grid -->
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="article in articles"
            :key="article.slug"
            class="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card p-6 transition-shadow hover:shadow-card"
          >
            <!-- Thumbnail cover image if present -->
            <div v-if="article.cover_image_url" class="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-border bg-secondary/30">
              <img
                :src="resolveImageUrl(article.cover_image_url)"
                :alt="article.title"
                width="640"
                height="360"
                loading="lazy"
                class="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div class="flex items-center justify-between gap-3">
              <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                روان‌شناسی
              </span>

              <span class="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 class="size-3.5" />
                {{ calculateReadingTime(article.summary) }} دقیقه
              </span>
            </div>

            <h2 class="mt-5 text-xl font-bold leading-9 text-primary-900">
              {{ article.title }}
            </h2>

            <p class="mt-3 flex-1 text-sm leading-8 text-muted-foreground line-clamp-3">
              {{ stripMarkdown(article.summary) }}
            </p>

            <NuxtLink
              :to="`/articles/${article.slug}`"
              class="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700"
            >
              مطالعه مقاله
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
