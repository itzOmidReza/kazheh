<script setup lang="ts">
import { onMounted } from 'vue'
import { Plus, RefreshCw, Search } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { adminDashboardData } from '~/data/admin'
import { useArticlesStore, type ArticleItem } from '~/stores/articles'
import ArticleStats from '~/components/admin/articles/ArticleStats.vue'
import ArticleCard from '~/components/admin/articles/ArticleCard.vue'

definePageMeta({
  layout: 'admin',
})

const articlesStore = useArticlesStore()
const pageData = adminDashboardData.articlesPage

onMounted(async () => {
  await articlesStore.fetchAdminArticles()
})

const handleRefresh = async () => {
  await articlesStore.fetchAdminArticles()
}

const handleDelete = async (article: ArticleItem) => {
  if (confirm(adminDashboardData.deleteConfirmModal.articleDescription)) {
    await articlesStore.deleteArticle(article.id)
  }
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- هدر صفحه -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-foreground">
          {{ pageData.pageTitle }}
        </h1>
        <p class="text-xs text-muted-foreground mt-1">
          {{ pageData.subtitle }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl gap-2" :disabled="articlesStore.isLoading"
          @click="handleRefresh">
          <RefreshCw class="size-3.5" :class="{ 'animate-spin': articlesStore.isLoading }" />
          <span>{{ pageData.refreshButton }}</span>
        </Button>

        <NuxtLink to="/admin/articles/create">
          <Button size="sm" class="text-xs h-9 rounded-xl gap-2">
            <Plus class="size-3.5" />
            <span>{{ pageData.createButton }}</span>
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- کامپوننت آمار مقالات -->
    <ArticleStats v-model:current-filter="articlesStore.filter" :total-count="articlesStore.stats.total"
      :published-count="articlesStore.stats.published" :draft-count="articlesStore.stats.draft"
      @update:current-filter="articlesStore.fetchAdminArticles()" />

    <!-- فیلتر و جست‌وجو -->
    <div
      class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-3 rounded-2xl border border-border/60">
      <div class="relative w-full sm:w-72">
        <Input v-model="articlesStore.searchQuery" :placeholder="pageData.searchPlaceholder"
          class="h-9 text-xs rounded-xl pe-8 text-right" />
        <Search class="size-4 absolute end-2.5 top-2.5 text-muted-foreground pointer-events-none" />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
          :class="{ 'bg-primary text-primary-foreground': articlesStore.filter === 'all' }"
          @click="articlesStore.filter = 'all'; articlesStore.fetchAdminArticles()">
          {{ pageData.filters.all }}
        </Button>
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
          :class="{ 'bg-primary text-primary-foreground': articlesStore.filter === 'published' }"
          @click="articlesStore.filter = 'published'; articlesStore.fetchAdminArticles()">
          {{ pageData.filters.published }}
        </Button>
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
          :class="{ 'bg-primary text-primary-foreground': articlesStore.filter === 'draft' }"
          @click="articlesStore.filter = 'draft'; articlesStore.fetchAdminArticles()">
          {{ pageData.filters.draft }}
        </Button>
      </div>
    </div>

    <!-- وضعیت بارگذاری -->
    <div v-if="articlesStore.isLoading" class="text-center py-12 text-xs text-muted-foreground">
      در حال دریافت لیست مقالات...
    </div>

    <!-- بدون مقاله -->
    <div v-else-if="articlesStore.filteredArticles.length === 0"
      class="text-center py-12 border border-dashed rounded-2xl bg-card space-y-2">
      <p class="text-xs text-muted-foreground">
        {{ pageData.emptyTitle }}
      </p>
    </div>

    <!-- لیست رندر کارت‌ها با کامپوننت بومی -->
    <div v-else class="grid gap-3">
      <ArticleCard v-for="article in articlesStore.filteredArticles" :key="article.id" :article="article"
        @delete="handleDelete(article)" />
    </div>
  </div>
</template>
