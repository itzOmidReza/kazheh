<script setup lang="ts">
import { ArrowRight, Clock3, Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import type { ArticleResponse } from '~/types/api'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { apiFetch } = useApi()

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

// Parse content into sections or paragraphs for readable rendering
interface ParsedSection {
  title?: string
  paragraphs: string[]
}

const parsedSections = computed<ParsedSection[]>(() => {
  if (!article.value?.content) return []

  const raw = article.value.content
  // Check if content uses markdown headings (# or ##)
  if (raw.includes('#')) {
    const rawSections = raw.split(/(?=^#{1,3}\s)/m)
    const result: ParsedSection[] = []

    for (const sec of rawSections) {
      const trimmed = sec.trim()
      if (!trimmed) continue

      const lines = trimmed.split('\n')
      const firstLine = lines[0].trim()

      if (firstLine.startsWith('#')) {
        const title = firstLine.replace(/^#+\s*/, '')
        const bodyLines = lines.slice(1).join('\n').trim()
        const paras = bodyLines.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
        result.push({ title, paragraphs: paras })
      } else {
        const paras = trimmed.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
        result.push({ paragraphs: paras })
      }
    }

    if (result.length > 0) return result
  }

  // Fallback: split by double newlines into simple paragraphs
  const paras = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  return [{ paragraphs: paras }]
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

          <div class="mt-10 max-w-3xl">
            <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              روان‌شناسی
            </span>

            <h1 class="mt-6 text-heading-xl text-primary-900">
              {{ article.title }}
            </h1>

            <div class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 class="size-4" />
              {{ readingTime }} دقیقه مطالعه
            </div>

            <p v-if="article.summary" class="mt-8 text-body-lg text-muted-foreground">
              {{ article.summary }}
            </p>
          </div>
        </div>
      </header>

      <section class="section-space bg-background">
        <div class="site-container">
          <div class="max-w-3xl">
            <div v-for="(section, sIdx) in parsedSections" :key="sIdx" class="mb-10 last:mb-0">
              <h2 v-if="section.title" class="text-heading-md text-primary-900">
                {{ section.title }}
              </h2>

              <p
                v-for="(paragraph, pIdx) in section.paragraphs"
                :key="pIdx"
                class="mt-5 text-body-lg leading-9 text-muted-foreground whitespace-pre-line"
              >
                {{ paragraph }}
              </p>
            </div>

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
