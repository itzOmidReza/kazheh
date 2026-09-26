<script setup lang="ts">
import { Search, RefreshCw, Plus, FileText } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { siteConfig } from '~/data'
import type { ArticleItem } from '~/components/admin/articles/ArticleCard.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `مدیریت مقالات تخصصی | ${siteConfig.name}` })

const articles = ref<ArticleItem[]>([
  {
    id: 1,
    title: 'چگونه اضطراب خود را در موقعیت‌های استرس‌زا کنترل کنیم؟',
    slug: 'understanding-anxiety',
    summary: 'راهکارهای عملی برای مهار استرس‌های روزمره و درک بهتر واکنش‌های بدن.',
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'مرزگذاری سالم در روابط فردی و خانوادگی',
    slug: 'healthy-boundaries',
    summary: 'چگونگی تعیین حد و مرزهای احترام‌آمیز بدون ایجاد احساس گناه.',
    is_published: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
])

const isLoading = ref(false)
const filterStatus = ref<'all' | 'published' | 'draft'>('all')
const searchQuery = ref('')

const publishedCount = computed(() => articles.value.filter((a) => a.is_published).length)
const draftCount = computed(() => articles.value.filter((a) => !a.is_published).length)

const filteredArticles = computed(() => {
  let list = articles.value
  if (filterStatus.value === 'published') list = list.filter((a) => a.is_published)
  else if (filterStatus.value === 'draft') list = list.filter((a) => !a.is_published)

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter((a) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q))
  }
  return list
})

// دیالوگ حذف
const articleToDelete = ref<ArticleItem | null>(null)
const isDeleteDialogOpen = ref(false)

const openDeleteModal = (item: ArticleItem) => {
  articleToDelete.value = item
  isDeleteDialogOpen.value = true
}

const handleDeleteConfirm = () => {
  if (!articleToDelete.value) return
  articles.value = articles.value.filter((a) => a.id !== articleToDelete.value!.id)
  isDeleteDialogOpen.value = false
  toast.success('مقاله با موفقیت حذف گردید.')
  articleToDelete.value = null
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- هدر صفحه -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-right">
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight text-foreground">مدیریت مقالات تخصصی</h1>
        <p class="text-xs text-muted-foreground">پایگاه دانش، مقالات علمی و مطالب کلینیک کاژه</p>
      </div>

      <div class="flex items-center gap-2.5">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5"
          @click="toast.success('لیست به‌روز شد')">
          <RefreshCw class="size-3.5" />
          <span>بروزرسانی</span>
        </Button>
        <Button class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover text-xs gap-1.5 h-9 px-4" as-child>
          <NuxtLink to="/admin/articles/create">
            <Plus class="size-4" />
            <span>نگارش مقاله جدید</span>
          </NuxtLink>
        </Button>
      </div>
    </div>

    <!-- آمارها -->
    <AdminArticlesArticleStats v-model:current-filter="filterStatus" :total-count="articles.length"
      :published-count="publishedCount" :draft-count="draftCount" />

    <!-- فیلتر و جستجو -->
    <div
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="relative w-full sm:max-w-md">
        <Input v-model="searchQuery" type="text" placeholder="جست‌وجوی عنوان یا اسلاگ..."
          class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
        <Search class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <Button size="sm" :variant="filterStatus === 'all' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterStatus = 'all'">همه</Button>
        <Button size="sm" :variant="filterStatus === 'published' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterStatus = 'published'">منتشر شده</Button>
        <Button size="sm" :variant="filterStatus === 'draft' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterStatus = 'draft'">پیش‌نویس</Button>
      </div>
    </div>

    <!-- لیست کارت‌ها -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <div v-if="filteredArticles.length === 0"
        class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
        <FileText class="size-8 mx-auto text-muted-foreground" />
        <p class="mt-3 text-xs text-muted-foreground">هیچ مقاله‌ای یافت نشد.</p>
      </div>
      <div v-else class="space-y-3">
        <AdminArticlesArticleCard v-for="item in filteredArticles" :key="item.id" :article="item"
          @delete="openDeleteModal" />
      </div>
    </div>

    <!-- دیالوگ حذف -->
    <AdminSharedDeleteConfirmDialog v-model:open="isDeleteDialogOpen" title="حذف مقاله تخصصی"
      description="آیا از پاک کردن این مقاله از پایگاه دانش اطمینان دارید؟" @confirm="handleDeleteConfirm" />
  </div>
</template>
