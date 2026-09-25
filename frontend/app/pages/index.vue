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

<<<<<<< HEAD
const { apiFetch } = useApi()
const { resolveImageUrl } = useImageUrl()
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
=======
// دریافت ۳ مقاله آخر برای سکشن صفحه اصلی
const { data: homeArticles } = await useAsyncData('home-articles', async () => {
  const list = await queryCollection('articles')
    .where('draft', '<>', true)
    .order('createdAt', 'DESC')
    .limit(3)
    .all()

  return list.map((item) => ({
    id: item.slug || item.path,
    title: item.title,
    excerpt: item.excerpt,
    href: `/articles/${item.slug}`,
    category: item.category,
    readingMinutes: item.readingTime,
>>>>>>> 78d5ecf57b5831113f6e6919549fcbda5806b225
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
