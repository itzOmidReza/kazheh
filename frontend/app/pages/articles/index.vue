<script setup lang="ts">
import { onMounted } from 'vue'
import { Calendar, ArrowLeft, BookOpen, Clock } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useArticlesStore } from '~/stores/articles'
import { articlesPageContent, articleDetailContent } from '~/data'

const articlesStore = useArticlesStore()

onMounted(async () => {
  await articlesStore.fetchPublicArticles()
})
</script>

<template>
  <div class="container max-w-6xl mx-auto px-4 py-12 space-y-10" dir="rtl">
    <!-- هدر صفحه عمومی مقالات -->
    <div class="text-center max-w-2xl mx-auto space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
        <BookOpen class="size-3.5" />
        <span>{{ articlesPageContent.badge }}</span>
      </div>
      <h1 class="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
        {{ articlesPageContent.heroTitle }}
      </h1>
      <p class="text-sm text-muted-foreground leading-relaxed">
        {{ articlesPageContent.heroSubtitle }}
      </p>
    </div>

    <!-- حالت در حال بارگذاری -->
    <div v-if="articlesStore.isLoading" class="text-center py-20 text-muted-foreground text-sm">
      در حال دریافت مقالات...
    </div>

    <!-- حالت بدون مقاله -->
    <div v-else-if="articlesStore.items.length === 0"
      class="text-center py-20 border border-dashed rounded-3xl bg-card/50 space-y-3">
      <BookOpen class="size-10 mx-auto text-muted-foreground/50" />
      <h3 class="text-base font-semibold text-foreground">{{ articlesPageContent.emptyTitle }}</h3>
      <p class="text-xs text-muted-foreground max-w-sm mx-auto">
        {{ articlesPageContent.emptyDescription }}
      </p>
    </div>

    <!-- گرید کارت‌های مقالات -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article v-for="article in articlesStore.items" :key="article.id"
        class="group bg-card rounded-2xl border border-border/60 hover:border-border hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-5">
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span class="inline-flex items-center gap-1.5 font-sans">
              <Calendar class="size-3.5" />
              {{ new Date(article.created_at).toLocaleDateString('fa-IR') }}
            </span>
            <Badge variant="outline" class="text-[10px] rounded-lg">مقاله تخصصی</Badge>
          </div>

          <h2
            class="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {{ article.title }}
          </h2>

          <p v-if="article.summary" class="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {{ article.summary }}
          </p>
        </div>

        <div class="pt-5 mt-4 border-t border-border/40 flex items-center justify-between">
          <NuxtLink :to="`/articles/${article.slug}`" class="w-full">
            <Button variant="ghost" size="sm"
              class="w-full justify-between text-xs h-9 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <span>{{ articleDetailContent.cardReadButton }}</span>
              <ArrowLeft class="size-3.5 transition-transform group-hover:-translate-x-1" />
            </Button>
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>
