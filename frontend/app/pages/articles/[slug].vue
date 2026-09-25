<script setup lang="ts">
import { ArrowRight, Clock3, Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import { toast } from 'vue-sonner'
import { siteConfig } from '~/data'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
<<<<<<< HEAD
const { apiFetch } = useApi()
const { resolveImageUrl } = useImageUrl()
=======
// کوئری برای پیدا کردن مقاله بر اساس slug
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225

const { data: article } = await useAsyncData(`article-${slug.value}`, () =>
  queryCollection('articles')
    .where('slug', '=', slug.value)
    .first()
)
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'مقاله مورد نظر پیدا نشد',
    fatal: true,
  })
}

<<<<<<< HEAD
const calculateReadingTime = (text?: string | null) => {
  if (!text) return 4
  const words = text.trim().split(/\s+/).length
  return Math.max(2, Math.ceil(words / 150))
}

const readingTime = computed(() => {
  const fullText = `${article.value?.summary || ''} ${article.value?.content || ''}`
  return calculateReadingTime(fullText)
})

=======
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225
useHead(() => ({
  title: `${article.value?.title} | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
<<<<<<< HEAD
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
=======
      content: article.value?.excerpt,
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225
    },
  ],
}))

const formatNumber = (val: number) => new Intl.NumberFormat('fa-IR').format(val)

const shareArticle = async () => {
  if (!import.meta.client) return

  const shareData = {
    title: article.value?.title || '',
    text: article.value?.excerpt || '',
    url: window.location.href,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('پیوند مقاله در کلیپ‌بورد کپی شد.')
    }
  } catch {
    // نادیده گرفتن لغو کاربر
  }
}
</script>

<template>
  <div v-if="article">
    <article>
      <header class="section-space bg-surface">
        <div class="site-container">
          <NuxtLink to="/articles"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
            <ArrowRight class="size-4" />
            بازگشت به مقالات
          </NuxtLink>

          <div class="mt-8 max-w-3xl">
            <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {{ article.category }}
            </span>

<<<<<<< HEAD
            <h1 class="mt-6 text-heading-xl text-primary-900 leading-tight">
=======
            <h1 class="mt-6 text-heading-xl text-foreground">
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225
              {{ article.title }}
            </h1>

            <div v-if="article.readingTime" class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 class="size-4" />
              {{ formatNumber(article.readingTime) }} دقیقه مطالعه
            </div>

<<<<<<< HEAD
            <p v-if="article.summary" class="mt-8 text-body-lg text-muted-foreground leading-8">
              {{ article.summary }}
=======
            <p class="mt-8 text-body-lg text-muted-foreground">
              {{ article.excerpt }}
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225
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
<<<<<<< HEAD
            <!-- Full Rich Markdown Body -->
            <MarkdownRenderer :content="article.content" />
=======
            <!-- رندر محتوای Markdown با استایل متناسب -->
            <div
              class="prose prose-neutral dark:prose-invert max-w-none leading-8 text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-heading-md [&_p]:mb-5 [&_p]:text-body-lg [&_p]:text-muted-foreground">
              <ContentRenderer :value="article" />
            </div>
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225

            <div class="mt-12 border-t border-border pt-6">
              <Button type="button" variant="outline" class="rounded-pill" @click="shareArticle">
                <Share2 class="size-4" />
                اشتراک‌گذاری مقاله
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
