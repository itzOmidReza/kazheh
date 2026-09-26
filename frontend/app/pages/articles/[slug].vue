<script setup lang="ts">
import { ArrowRight, Clock3, Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { siteConfig } from '~/data'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

// دریافت مقاله متناظر از کالکشن articles در Nuxt Content
const { data: article } = await useAsyncData(`article-${slug.value}`, () =>
  queryCollection('articles')
    .path(`/articles/${slug.value}`)
    .first()
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'مقاله مورد نظر پیدا نشد',
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

const shareArticle = async () => {
  if (!import.meta.client) return

  const shareData = {
    title: article.value?.title || '',
    text: article.value?.description || '',
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
    // نادیده گرفتن انصراف کاربر
  }
}
</script>

<template>
  <div v-if="article" dir="rtl">
    <article>
      <header class="section-space bg-surface">
        <div class="site-container">
          <NuxtLink to="/articles"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
            <ArrowRight class="size-4 rotate-180" />
            <span>بازگشت به مقالات</span>
          </NuxtLink>

          <div class="mt-8 max-w-3xl text-right">
            <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {{ (article as any).category || 'روان‌شناسی' }}
            </span>

            <h1 class="mt-6 text-heading-xl text-foreground leading-tight">
              {{ article.title }}
            </h1>

            <div v-if="(article as any).readingTime" class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 class="size-4" />
              <span>{{ formatNumber((article as any).readingTime) }} دقیقه مطالعه</span>
            </div>

            <p v-if="article.description" class="mt-8 text-body-lg text-muted-foreground leading-8">
              {{ article.description }}
            </p>
          </div>

          <div v-if="(article as any).cover"
            class="mt-10 max-w-4xl overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card">
            <img :src="(article as any).cover" :alt="article.title" width="1280" height="720"
              class="aspect-[16/9] w-full object-cover" loading="eager" />
          </div>
        </div>
      </header>

      <section class="section-space bg-background">
        <div class="site-container">
          <div class="max-w-3xl text-right">
            <!-- رندر استاندارد محتوای Markdown با Nuxt Content -->
            <div
              class="prose prose-neutral dark:prose-invert max-w-none leading-8 text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-heading-md [&_p]:mb-5 [&_p]:text-body-lg [&_p]:text-muted-foreground">
              <ContentRenderer :value="article" />
            </div>

            <div class="mt-12 border-t border-border pt-6">
              <Button type="button" variant="outline" class="rounded-pill" @click="shareArticle">
                <Share2 class="size-4" />
                <span>اشتراک‌گذاری مقاله</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
