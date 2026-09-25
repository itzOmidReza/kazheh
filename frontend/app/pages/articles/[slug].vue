<script setup lang="ts">
import { ArrowRight, Clock3, Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import { toast } from 'vue-sonner'
import type { ArticleResponse } from '~/types/api'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { apiFetch } = useApi()
const { resolveImageUrl } = useImageUrl()

const { data: article, error } = await useAsyncData<ArticleResponse>(
  `article-${slug.value}`,
  () => apiFetch(`/articles/${encodeURIComponent(slug.value)}`)
)

if (error.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'مقاله مورد نظر پیدا نشد',
    fatal: true,
  })
}

const calculateReadingTime = (text?: string | null) => {
  if (!text) return 4
  const words = text.trim().split(/\s+/).length
  return Math.max(2, Math.ceil(words / 150))
}

const readingTime = computed(() => {
  const fullText = `${article.value?.summary || ''} ${article.value?.content || ''}`
  return calculateReadingTime(fullText)
})

useHead(() => ({
  title: `${article.value?.title || 'مقاله'} | کلینیک آرامش`,
  meta: [
    {
      name: 'description',
      content: article.value?.summary || 'مطالعه مقاله تخصصی در کلینیک آرامش',
    },
    {
      property: 'og:title',
      content: `${article.value?.title || 'مقاله'} | کلینیک آرامش`,
    },
    {
      property: 'og:description',
      content: article.value?.summary || 'مطالعه مقاله تخصصی در کلینیک آرامش',
    },
    ...(article.value?.cover_image_url
      ? [{ property: 'og:image', content: resolveImageUrl(article.value.cover_image_url) }]
      : []),
    { property: 'og:type', content: 'article' },
    { property: 'og:locale', content: 'fa_IR' },
    {
      property: 'article:published_time',
      content: article.value?.created_at || '',
    },
  ],
  link: [{ rel: 'canonical', href: `/articles/${article.value?.slug || ''}` }],
}))

const shareArticle = async () => {
  if (!import.meta.client) return

  const shareData = {
    title: article.value?.title || '',
    text: article.value?.summary || '',
    url: window.location.href,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    await navigator.clipboard.writeText(window.location.href)
    toast.success('لینک مقاله در حافظه کپی شد.')
  } catch {
    toast.error('امکان اشتراک‌گذاری فراهم نشد.')
  }
}
</script>

<template>
  <main v-if="article">
    <article>
      <header class="section-space bg-surface">
        <div class="site-container">
          <NuxtLink
            to="/articles"
            class="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:text-primary-700"
          >
            <ArrowRight class="size-4" />
            بازگشت به مقالات
          </NuxtLink>

          <div class="mt-8 max-w-3xl">
            <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              روان‌شناسی
            </span>

            <h1 class="mt-6 text-heading-xl text-primary-900 leading-tight">
              {{ article.title }}
            </h1>

            <div class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 class="size-4" />
              {{ readingTime }} دقیقه مطالعه
            </div>

            <p v-if="article.summary" class="mt-8 text-body-lg text-muted-foreground leading-8">
              {{ article.summary }}
            </p>
          </div>

          <!-- Hero Cover Image -->
          <div v-if="article.cover_image_url" class="mt-10 max-w-4xl overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card">
            <img
              :src="resolveImageUrl(article.cover_image_url)"
              :alt="article.title"
              width="1280"
              height="720"
              class="aspect-[16/9] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </header>

      <section class="section-space bg-background">
        <div class="site-container">
          <div class="max-w-3xl">
            <!-- Full Rich Markdown Body -->
            <MarkdownRenderer :content="article.content" />

            <div class="mt-12 border-t border-border pt-6">
              <Button type="button" variant="outline" class="min-h-12 w-full sm:w-auto rounded-pill" @click="shareArticle">
                <Share2 class="size-4" />
                اشتراک‌گذاری مقاله
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>
