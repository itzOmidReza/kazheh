<script setup lang="ts">
import { siteConfig } from '~/data'

useHead({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  meta: [
    {
      name: 'description',
      content: siteConfig.description,
    },
  ],
})

const { apiFetch } = useApi()
const { resolveImageUrl } = useImageUrl()
type ArticleListItem = {
  id: string | number
  title: string
  slug: string
  summary?: string | null
  cover_image_url?: string | null
}

const { data: rawArticles } = await useAsyncData<ArticleListItem[]>('home-articles', () =>
  apiFetch('/articles?limit=3')
)

const homeArticles = computed(() => {
  if (!rawArticles.value) return []
  return rawArticles.value.map((a) => ({
    id: String(a.id),
    title: a.title,
    excerpt: stripMarkdown(a.summary || ''),
    href: `/articles/${a.slug}`,
    category: 'روان‌شناسی',
    readingMinutes: Math.max(2, Math.ceil(((a.summary || '').split(/\s+/).length || 50) / 150)),
    image: a.cover_image_url
      ? {
        src: resolveImageUrl(a.cover_image_url),
        alt: a.title,
      }
      : undefined,
  }))
})
</script>

<template>
  <HomeHero />
  <HomeTrustBar />
  <HomeConcernsSection />
  <HomeServicesSection />
  <HomeApproachSection />
  <HomeProcessSection />
  <HomeTestimonialsSection />
  <HomeArticlesSection :items="homeArticles || []" />
  <HomeFaqSection />
  <HomeContactSection />
</template>
