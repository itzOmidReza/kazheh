<script setup lang="ts">
import { ArrowRight, Clock3 } from '@lucide/vue'
import { siteConfig, articleDetailContent } from '~/data'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: article } = await useAsyncData(`article-${slug.value}`, () =>
  queryCollection('articles')
    .path(`/articles/${slug.value}`)
    .first()
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: articleDetailContent.notFoundMessage,
    fatal: true,
  })
}

useHead(() => ({
  title: `${article.value?.title} | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: article.value?.description || article.value?.excerpt || '',
    },
    {
      property: 'og:title',
      content: `${article.value?.title} | ${siteConfig.name}`,
    },
    {
      property: 'og:description',
      content: article.value?.description || article.value?.excerpt || '',
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:locale', content: 'fa_IR' },
  ],
}))

const formatNumber = (val: number) => new Intl.NumberFormat('fa-IR').format(val)
</script>

<template>
  <div v-if="article" dir="rtl">
    <article>
      <header class="section-space bg-surface">
        <div class="site-container">
          <NuxtLink to="/articles"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
            <ArrowRight class="size-4 rotate-180" />
            <span>{{ articleDetailContent.backButton }}</span>
          </NuxtLink>

          <div class="mt-8 max-w-3xl text-right">
            <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {{ (article as any).category || articleDetailContent.defaultCategory }}
            </span>

            <h1 class="mt-6 text-heading-xl text-foreground leading-tight">
              {{ article.title }}
            </h1>

            <div v-if="(article as any).readingTime" class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 class="size-4" />
              <span>{{ formatNumber((article as any).readingTime) }} {{ articleDetailContent.minuteReadSuffix }}</span>
            </div>

            <p v-if="article.description" class="mt-8 text-body-lg text-muted-foreground leading-8">
              {{ article.description }}
            </p>
          </div>

          <div v-if="(article as any).cover"
            class="mt-10 max-w-4xl overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card">
            <img :src="(article as any).cover" :alt="article.title" width="1280" height="720"
              class="aspect-video w-full object-cover" loading="eager" />
          </div>
        </div>
      </header>

      <section class="section-space bg-background">
        <div class="site-container">
          <div class="max-w-3xl text-right">
            <div
              class="prose prose-neutral dark:prose-invert max-w-none leading-8 text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-heading-md [&_p]:mb-5 [&_p]:text-body-lg [&_p]:text-muted-foreground">
              <ContentRenderer :value="article" />
            </div>

            <div class="mt-12 border-t border-border pt-6">
              <ArticlesArticleShareButton :title="article.title" :text="article.description || ''" />
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
