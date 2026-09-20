<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

interface Article {
  id: string
  title: string
  excerpt: string
  href: string
  category: string
  readingMinutes: number
  image?: {
    src: string
    alt: string
  }
}

withDefaults(
  defineProps<{
    items?: Article[]
  }>(),
  {
    items: () => [],
  },
)

const formatNumber = (value: number) =>
  new Intl.NumberFormat('fa-IR').format(value)
</script>

<template>
  <section v-if="items.length" id="articles" aria-labelledby="articles-title" class="section-space bg-background">
    <div class="site-container">
      <div class="max-w-2xl">
        <p class="text-sm font-medium text-primary">
          برای خواندن و تأمل کردن
        </p>

        <h2 id="articles-title" class="mt-4 text-heading-xl text-foreground">
          فرصتی برای شناخت بیشتر خودمان
        </h2>

        <p class="mt-5 text-body-lg text-muted-foreground">
          یادداشت‌هایی درباره احساسات، رابطه‌ها و تجربه‌های روزمره؛
          با زبانی ساده و قابل فهم.
        </p>
      </div>

      <ul class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="article in items" :key="article.id">
          <article class="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
            <img v-if="article.image" :src="article.image.src" :alt="article.image.alt" width="720" height="480"
              loading="lazy" decoding="async" class="aspect-[3/2] w-full object-cover" />

            <div class="flex flex-1 flex-col p-6">
              <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                <span class="rounded-pill bg-secondary px-3 py-1 text-secondary-foreground">
                  {{ article.category }}
                </span>

                <span class="text-muted-foreground">
                  {{ formatNumber(article.readingMinutes) }} دقیقه مطالعه
                </span>
              </div>

              <h3 :id="`article-title-${article.id}`" class="mt-5 text-xl font-bold leading-9 text-card-foreground">
                {{ article.title }}
              </h3>

              <p class="mt-3 flex-1 text-body text-muted-foreground">
                {{ article.excerpt }}
              </p>

              <NuxtLink :to="article.href" :aria-label="`مطالعه مقاله: ${article.title}`"
                class="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-sm font-semibold text-primary underline-offset-4 hover:underline">
                مطالعه مقاله
                <ArrowLeft class="size-4" aria-hidden="true" />
              </NuxtLink>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
