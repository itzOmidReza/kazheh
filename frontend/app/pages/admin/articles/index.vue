<script setup lang="ts">
import {
  FileText,
  Search,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Clock,
  AlertCircle,
  Loader2,
  ChevronRight,
  BookOpen,
  CheckCircle,
  FileEdit,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'vue-sonner'
import { siteConfig, adminDashboardData } from '~/data'

definePageMeta({
  layout: 'admin',
})

useHead({
  title: `مدیریت مقالات تخصصی | ${siteConfig.name}`,
})

interface ArticleListItem {
  id: number
  title: string
  slug: string
  summary?: string | null
  is_published: boolean
  created_at: string
}

// داده‌های ماک درون‌برنامه‌ای
const articles = ref<ArticleListItem[]>([
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

const fetchArticles = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    toast.success('فهرست مقالات بروزرسانی شد.')
  }, 300)
}

const publishedCount = computed(() => articles.value.filter((a) => a.is_published).length)
const draftCount = computed(() => articles.value.filter((a) => !a.is_published).length)

const filteredArticles = computed(() => {
  let list = articles.value

  if (filterStatus.value === 'published') {
    list = list.filter((a) => a.is_published)
  } else if (filterStatus.value === 'draft') {
    list = list.filter((a) => !a.is_published)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        (a.summary && a.summary.toLowerCase().includes(q))
    )
  }
  return list
})

// حذف مقاله
const articleToDelete = ref<ArticleListItem | null>(null)
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)

const confirmDelete = (item: ArticleListItem) => {
  articleToDelete.value = item
  isDeleteDialogOpen.value = true
}

const handleDelete = () => {
  if (!articleToDelete.value) return
  isDeleting.value = true
  const item = articleToDelete.value

  setTimeout(() => {
    articles.value = articles.value.filter((a) => a.id !== item.id)
    isDeleteDialogOpen.value = false
    articleToDelete.value = null
    isDeleting.value = false

    toast.success('مقاله حذف شد', {
      description: `مطلب «${item.title}» با موفقیت پاک گردید.`,
    })
  }, 300)
}

const formatDate = (isoString: string) => {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoString))
  } catch {
    return isoString
  }
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- بالای صفحه -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1 text-right">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <NuxtLink to="/admin" class="hover:text-primary transition-colors">
            پنل مدیریت
          </NuxtLink>
          <ChevronRight class="size-3.5 rotate-180" />
          <span class="text-foreground font-medium">مقالات تخصصی</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          مدیریت مقالات و پایگاه دانش کلینیک
        </h1>
      </div>

      <div class="flex items-center gap-2.5">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5" :disabled="isLoading"
          @click="fetchArticles">
          <RefreshCw :class="['size-3.5', isLoading && 'animate-spin']" />
          <span>{{ adminDashboardData.articlesSection.refreshButton }}</span>
        </Button>

        <Button class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs gap-1.5 h-9 px-4"
          as-child>
          <NuxtLink to="/admin/articles/create">
            <Plus class="size-4" />
            <span>نگارش مقاله جدید</span>
          </NuxtLink>
        </Button>
      </div>
    </div>

    <!-- نوارهای خلاصه آماری -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 text-right">
      <div
        class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-primary/40"
        @click="filterStatus = 'all'">
        <div>
          <p class="text-xs text-muted-foreground font-medium">کل مقالات ثبت‌شده</p>
          <p class="mt-1 text-2xl font-bold text-foreground">{{ articles.length }}</p>
        </div>
        <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen class="size-5" />
        </div>
      </div>

      <div
        class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-emerald-500/40"
        @click="filterStatus = 'published'">
        <div>
          <p class="text-xs text-muted-foreground font-medium">منتشر شده در وب‌سایت</p>
          <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ publishedCount }}</p>
        </div>
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle class="size-5" />
        </div>
      </div>

      <div
        class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-secondary-foreground/20"
        @click="filterStatus = 'draft'">
        <div>
          <p class="text-xs text-muted-foreground font-medium">پیش‌نویس‌ها</p>
          <p class="mt-1 text-2xl font-bold text-muted-foreground">{{ draftCount }}</p>
        </div>
        <div class="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <FileEdit class="size-5" />
        </div>
      </div>
    </div>

    <!-- جستجو و فیلتر -->
    <div
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="relative w-full sm:max-w-md">
        <Input v-model="searchQuery" type="text" :placeholder="adminDashboardData.articlesSection.searchPlaceholder"
          class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
        <Search class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <Button size="sm" :variant="filterStatus === 'all' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterStatus = 'all'">
          همه
        </Button>
        <Button size="sm" :variant="filterStatus === 'published' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterStatus = 'published'">
          منتشر شده ({{ publishedCount }})
        </Button>
        <Button size="sm" :variant="filterStatus === 'draft' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterStatus = 'draft'">
          پیش‌نویس ({{ draftCount }})
        </Button>
      </div>
    </div>

    <!-- لیست کارت‌های مقالات -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded-2xl border border-border/60 bg-muted/30 p-4" />
      </div>

      <div v-else-if="filteredArticles.length === 0"
        class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
        <div class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
          <FileText class="size-6" />
        </div>
        <h3 class="mt-4 text-sm font-bold text-foreground">
          {{ adminDashboardData.articlesSection.emptyTitle }}
        </h3>
        <p class="mt-1 text-xs text-muted-foreground">
          {{ adminDashboardData.articlesSection.emptyDescription }}
        </p>
      </div>

      <div v-else class="space-y-3">
        <div v-for="item in filteredArticles" :key="item.id"
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4.5 transition-all hover:shadow-xs">
          <div class="space-y-1.5 flex-1 min-w-0 text-right">
            <div class="flex flex-wrap items-center gap-2">
              <NuxtLink :to="`/admin/articles/${item.id}`"
                class="text-sm font-bold text-foreground hover:text-primary transition-colors">
                {{ item.title }}
              </NuxtLink>

              <Badge :class="[
                'rounded-pill text-[10px] px-2 py-0.5',
                item.is_published
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-secondary text-secondary-foreground border-transparent',
              ]">
                {{ item.is_published ? adminDashboardData.articlesSection.badgePublished :
                  adminDashboardData.articlesSection.badgeDraft }}
              </Badge>

              <span class="text-[11px] text-muted-foreground font-mono" dir="ltr">
                /articles/{{ item.slug }}
              </span>
            </div>

            <p v-if="item.summary" class="line-clamp-1 text-xs text-muted-foreground leading-relaxed text-right">
              {{ item.summary }}
            </p>

            <div class="flex items-center gap-2 text-[11px] text-muted-foreground/80 pt-0.5">
              <Clock class="size-3" />
              <span>{{ adminDashboardData.articlesSection.registeredPrefix }} {{ formatDate(item.created_at) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            <Button v-if="item.is_published" variant="outline" size="sm" as-child
              class="rounded-xl text-xs h-8.5 px-3 gap-1">
              <NuxtLink :to="`/articles/${item.slug}`" target="_blank">
                <span>نمایش</span>
                <ExternalLink class="size-3" />
              </NuxtLink>
            </Button>

            <Button variant="outline" size="sm" class="rounded-xl text-xs h-8.5 px-3 gap-1" as-child>
              <NuxtLink :to="`/admin/articles/${item.id}`">
                <Edit class="size-3" />
                <span>ویرایش</span>
              </NuxtLink>
            </Button>

            <Button size="icon" variant="ghost" class="size-8.5 rounded-xl text-destructive hover:bg-destructive/10"
              @click="confirmDelete(item)">
              <Trash2 class="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- مدال تایید حذف -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent class="w-[min(94vw,28rem)] rounded-3xl bg-card border-border p-5 sm:p-6 text-foreground" dir="rtl">
        <DialogHeader class="text-right">
          <DialogTitle class="text-base font-bold text-destructive flex items-center gap-2">
            <AlertCircle class="size-5" />
            <span>حذف مقاله تخصصی</span>
          </DialogTitle>
          <DialogDescription class="text-xs text-muted-foreground pt-2">
            آیا از حذف این مقاله اطمینان دارید؟ این عمل غیرقابل بازگشت است.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" class="rounded-pill text-xs px-4" @click="isDeleteDialogOpen = false">
            انصراف
          </Button>

          <Button variant="destructive" size="sm" :disabled="isDeleting" class="rounded-pill text-xs px-4"
            @click="handleDelete">
            <Loader2 v-if="isDeleting" class="size-3.5 animate-spin" />
            <template v-else>
              بله، حذف مقاله
            </template>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
