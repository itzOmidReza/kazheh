<script setup lang="ts">
import type { ArticleListItem } from '~/types/api'

useHead({
  title: 'کلینیک آرامش | روان‌شناسی آگاهانه و مشاوره تخصصی',
  meta: [
    {
      name: 'description',
      content:
        'فضایی امن، انسانی و محرمانه برای شروع گفت‌وگو، مشاوره فردی و روابط، و شناختن قدم‌های بعدی.',
    },
    { property: 'og:title', content: 'کلینیک آرامش | روان‌شناسی آگاهانه و مشاوره تخصصی' },
    { property: 'og:description', content: 'فضایی امن، انسانی و محرمانه برای شروع گفت‌وگو، مشاوره فردی و روابط، و شناختن قدم‌های بعدی.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fa_IR' },
  ],
  link: [{ rel: 'canonical', href: '/' }],
})

const { apiFetch } = useApi()
const { data: rawArticles } = await useAsyncData<ArticleListItem[]>('home-articles', () =>
  apiFetch('/articles?limit=3')
)

const homeArticles = computed(() => {
  if (!rawArticles.value) return []
  return rawArticles.value.map((a) => ({
    id: String(a.id),
    title: a.title,
    excerpt: a.summary || '',
    href: `/articles/${a.slug}`,
    category: 'روان‌شناسی',
    readingMinutes: Math.max(2, Math.ceil((a.summary?.split(/\s+/).length || 50) / 150)),
  }))
})

const homeTestimonials = [
  {
    id: '1',
    displayName: 'م. ر. (مراجع مشاوره فردی)',
    text: 'فضای جلسات به من کمک کرد بدون احساس قضاوت شدن، احساساتم را بیان کنم و زاویه دید روشن‌تری نسبت به چالش‌هایم پیدا کنم.',
  },
  {
    id: '2',
    displayName: 'س. ت. (مراجع مشاوره روابط)',
    text: 'یاد گرفتم چطور مرزهای ارتباطی‌ام را بهتر بشناسم و با اطرافیانم شفاف‌تر و آرام‌تر گفت‌وگو کنم.',
  },
  {
    id: '3',
    displayName: 'الف. ن. (مراجع همراهی در تغییر)',
    text: 'قدم‌های کوچک و واقعی که در جلسات طراحی کردیم، تغییراتی پایدار و بدون اضطراب در زندگی روزمره‌ام به وجود آورد.',
  },
]
</script>

<template>
  <HomeHero />
  <HomeTrustBar />
  <HomeConcernsSection />
  <HomeServicesSection />
  <HomeApproachSection />
  <HomeProcessSection />
  <HomeTestimonialsSection :items="homeTestimonials" />
  <HomeArticlesSection :items="homeArticles" />
  <HomeFaqSection />
  <HomeContactSection />
</template>
