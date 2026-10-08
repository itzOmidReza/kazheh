<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, ArrowRight, UserCheck, Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useArticlesStore, type ArticleItem } from '~/stores/articles'
import { siteConfig, articleDetailContent } from '~/data'

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

const slug = String(route.params.slug)
const article = ref<ArticleItem | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  if (!slug) {
    router.push('/articles')
    return
  }

  isLoading.value = true
  const data = await articlesStore.fetchArticleBySlug(slug)
  if (!data) {
    router.push('/articles')
    return
  }

  article.value = data
  isLoading.value = false
})
</script>

<template>
  <div class="container max-w-4xl mx-auto px-4 py-12" dir="rtl">
    <div class="mb-6">
      <Button variant="ghost" size="sm" class="text-xs h-9 rounded-xl gap-2 text-muted-foreground hover:text-foreground"
        @click="router.push('/articles')">
        <ArrowRight class="size-4" />
        <span>{{ articleDetailContent.backButton }}</span>
      </Button>
    </div>

    <div v-if="isLoading" class="text-center py-24 text-muted-foreground text-sm">
      در حال دریافت محتوای مقاله...
    </div>

    <article v-else-if="article" class="space-y-8 bg-card p-6 sm:p-10 rounded-3xl border border-border/60">
      <header class="space-y-4 border-b border-border/60 pb-6">
        <div class="flex items-center gap-3">
          <Badge variant="outline" class="text-xs">{{ siteConfig.name }}</Badge>
          <span class="text-xs text-muted-foreground flex items-center gap-1.5 font-sans">
            <Calendar class="size-3.5" />
            {{ new Date(article.created_at).toLocaleDateString('fa-IR') }}
          </span>
        </div>

        <h1 class="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
          {{ article.title }}
        </h1>

        <p v-if="article.summary"
          class="text-sm text-muted-foreground leading-relaxed bg-muted/40 p-4 rounded-2xl border-r-4 border-primary">
          {{ article.summary }}
        </p>
      </header>

      <!-- محتوای کامل مقاله -->
      <div
        class="prose prose-neutral dark:prose-invert max-w-none text-sm leading-8 text-foreground whitespace-pre-wrap">
        {{ article.content }}
      </div>

      <footer class="pt-6 border-t border-border/60 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            <UserCheck class="size-5" />
          </div>
          <div>
            <div class="text-xs font-bold text-foreground">{{ siteConfig.name }}</div>
            <div class="text-[11px] text-muted-foreground">{{ siteConfig.tagline }}</div>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>
