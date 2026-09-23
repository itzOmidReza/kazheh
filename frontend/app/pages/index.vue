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
