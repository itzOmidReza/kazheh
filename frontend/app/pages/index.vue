<script setup lang="ts">
import { siteConfig, articlesPageContent } from '~/data'

useHead({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  meta: [
    {
      name: 'description',
      content: siteConfig.description,
    },
  ],
})

// دریافت ۳ مقاله آخر مستقیماً از محتوای لوکال Nuxt Content
// frontend/app/pages/index.vue

const { data: homeArticles } = await useAsyncData('home-articles', async () => {
  try {
    const list = await (queryCollection('articles') as any)
      .order('id', 'DESC')
      .limit(3)
      .all()

    return list.map((item: any) => ({
      id: item.path || item.stem || String(item.id || Math.random()),
      title: item.title,
      excerpt: item.description || item.summary || '',
      href: item.path || `/articles/${item.stem}`,
      category: item.category || articlesPageContent.defaultCategory,
      readingMinutes: 5,
      image: item.cover || item.cover_image_url
        ? {
          src: item.cover || item.cover_image_url,
          alt: item.title,
        }
        : undefined,
    }))
  } catch {
    return []
  }
})
</script>

<template>
  <div>
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
  </div>
</template>
