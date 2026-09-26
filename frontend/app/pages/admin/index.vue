<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

import {
  Mail,
  FileText,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  AlertCircle,
  Inbox,
  Loader2,
  MessageSquare,
  Sparkles,
  TrendingUp,
  ArrowRight,
  BookOpen,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
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

useHead({
  title: `${adminDashboardData.header.title} | ${siteConfig.name}`,
})

const router = useRouter()

// تایپ‌های لوکال مستقل برای اجتناب از ارور تایپ‌اسکریپت
interface ContactMessage {
  id: number
  full_name: string
  phone: string
  subject?: string | null
  message: string
  is_read: boolean
  created_at: string
}

interface ArticleListItem {
  id: number
  title: string
  slug: string
  summary?: string | null
  is_published: boolean
  created_at: string
}

// Active Tab State
const activeTab = ref<'messages' | 'articles'>('messages')

// Messages State (داده‌های اولیه ماک)
const messages = ref<ContactMessage[]>([
  {
    id: 1,
    full_name: 'سارا احمدی',
    phone: '09123456789',
    subject: 'درخواست مشاوره فردی',
    message: 'سلام، می‌خواستم برای روزهای پنجشنبه وقت رزرو کنم.',
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    full_name: 'محسن کریمی',
    phone: '09351112233',
    subject: 'هماهنگی کارگاه',
    message: 'درود، تمایل داشتم اطلاعات مربوط به کارگاه را دریافت کنم.',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
])

const isMessagesLoading = ref(false)
const messageFilter = ref<'all' | 'unread'>('all')
const messageSearchQuery = ref('')

const fetchMessages = () => {
  isMessagesLoading.value = true
  setTimeout(() => {
    isMessagesLoading.value = false
    toast.success('پیام‌ها به‌روزرسانی شدند.')
  }, 350)
}

const unreadCount = computed(() => messages.value.filter((m) => !m.is_read).length)

const filteredMessages = computed(() => {
  let list = messages.value
  if (messageFilter.value === 'unread') {
    list = list.filter((m) => !m.is_read)
  }
  if (messageSearchQuery.value.trim()) {
    const q = messageSearchQuery.value.trim().toLowerCase()
    list = list.filter(
      (m) =>
        m.full_name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        (m.subject && m.subject.toLowerCase().includes(q)) ||
        m.message.toLowerCase().includes(q)
    )
  }
  return list
})

// تغییر وضعیت خوانده‌شده
const toggleMessageRead = (msg: ContactMessage, targetStatus: boolean) => {
  msg.is_read = targetStatus
  if (targetStatus) {
    toast.success('پیام بررسی شد', {
      description: `پیام دریافتی از ${msg.full_name} به بخش بررسی‌شده‌ها منتقل شد.`,
      action: {
        label: 'بازگردانی',
        onClick: () => toggleMessageRead(msg, false),
      },
    })
  } else {
    toast.info('بازگشت به وضعیت بررسی‌نشده', {
      description: `پیام ${msg.full_name} به عنوان نیازمند اقدام علامت‌گذاری شد.`,
      action: {
        label: 'خوانده شد',
        onClick: () => toggleMessageRead(msg, true),
      },
    })
  }
}

// وضعیت دیالوگ حذف پیام
const messageToDelete = ref<ContactMessage | null>(null)
const isDeleteMsgDialogOpen = ref(false)
const isDeletingMsg = ref(false)

const confirmDeleteMessage = (msg: ContactMessage) => {
  messageToDelete.value = msg
  isDeleteMsgDialogOpen.value = true
}

const handleDeleteMessage = () => {
  if (!messageToDelete.value) return
  isDeletingMsg.value = true
  const deleted = messageToDelete.value
  setTimeout(() => {
    messages.value = messages.value.filter((m) => m.id !== deleted.id)
    isDeleteMsgDialogOpen.value = false
    messageToDelete.value = null
    isDeletingMsg.value = false
    toast.success('پیام حذف شد', {
      description: `پیام ارسالی از ${deleted.full_name} با موفقیت پاک شد.`,
    })
  }, 300)
}

const openConversation = (msgId: number) => {
  router.push(`/admin/messages/${msgId}`)
}

// Articles State (داده‌های اولیه ماک)
const articles = ref<ArticleListItem[]>([
  {
    id: 1,
    title: 'چگونه اضطراب خود را در موقعیت‌های استرس‌زا کنترل کنیم؟',
    slug: 'understanding-anxiety',
    summary: 'راهکارهای عملی برای مهار استرس‌های روزمره.',
    is_published: true,
    created_at: new Date().toISOString(),
  },
])

const isArticlesLoading = ref(false)
const articleSearchQuery = ref('')

const fetchArticles = () => {
  isArticlesLoading.value = true
  setTimeout(() => {
    isArticlesLoading.value = false
    toast.success('لیست مقالات به‌روزرسانی شد.')
  }, 350)
}

const publishedArticlesCount = computed(
  () => articles.value.filter((a) => a.is_published).length
)

const filteredArticles = computed(() => {
  if (!articleSearchQuery.value.trim()) return articles.value
  const q = articleSearchQuery.value.trim().toLowerCase()
  return articles.value.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q) ||
      (a.summary && a.summary.toLowerCase().includes(q))
  )
})

// وضعیت دیالوگ حذف مقاله
const articleToDelete = ref<ArticleListItem | null>(null)
const isDeleteArticleDialogOpen = ref(false)
const isDeletingArticle = ref(false)

const confirmDeleteArticle = (item: ArticleListItem) => {
  articleToDelete.value = item
  isDeleteArticleDialogOpen.value = true
}

const handleDeleteArticle = () => {
  if (!articleToDelete.value) return
  isDeletingArticle.value = true
  const item = articleToDelete.value
  setTimeout(() => {
    articles.value = articles.value.filter((a) => a.id !== item.id)
    isDeleteArticleDialogOpen.value = false
    articleToDelete.value = null
    isDeletingArticle.value = false
    toast.success('مقاله حذف شد', {
      description: `مطلب «${item.title}» با موفقیت حذف گردید.`,
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
  <div class="space-y-8" dir="rtl">
    <!-- هدر بالای داشبورد -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1 text-right">
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          میز کار و داشبورد مدیریتی
        </h1>
        <p class="text-xs text-muted-foreground">
          گزارش و مدیریت کلیه پیام‌های دریافتی مراجعین و مقالات تخصصی کلینیک کاژه
        </p>
      </div>

      <div class="flex items-center gap-2.5">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5"
          :disabled="isMessagesLoading || isArticlesLoading" @click="fetchMessages(); fetchArticles()">
          <RefreshCw :class="['size-3.5', (isMessagesLoading || isArticlesLoading) && 'animate-spin']" />
          <span>بروزرسانی داده‌ها</span>
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

    <!-- کارت‌های آمار -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink to="/admin/messages"
        class="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-card text-right">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground">پیام‌های نیازمند بررسی</span>
          <div
            class="flex size-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <MessageSquare class="size-5" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline gap-2">
          <span class="text-3xl font-black text-foreground">{{ unreadCount }}</span>
          <span class="text-xs text-muted-foreground">پیام جدید</span>
        </div>
        <div class="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span class="flex items-center gap-1.5">
            <Clock class="size-3.5" />
            <span>از مجموع {{ messages.length }} پیام دریافتی</span>
          </span>
          <ArrowRight class="size-3.5 text-primary rotate-180 opacity-0 transition-all group-hover:opacity-100" />
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/articles"
        class="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-card text-right">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground">پایگاه دانش و مقالات</span>
          <div class="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen class="size-5" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline gap-2">
          <span class="text-3xl font-black text-foreground">{{ articles.length }}</span>
          <span class="text-xs text-muted-foreground">مطلب نگارش شده</span>
        </div>
        <div
          class="mt-3 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <span class="flex items-center gap-1.5">
            <TrendingUp class="size-3.5" />
            <span>{{ publishedArticlesCount }} مقاله منتشر شده در سایت</span>
          </span>
          <ArrowRight class="size-3.5 text-primary rotate-180 opacity-0 transition-all group-hover:opacity-100" />
        </div>
      </NuxtLink>

      <div
        class="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-xs sm:col-span-2 lg:col-span-1 text-right">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground">وضعیت ران‌تایم سامانه</span>
          <div
            class="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Sparkles class="size-5" />
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <span class="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-base font-bold text-foreground">آماده دریافت و توسعه</span>
        </div>
        <div class="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span>هسته فرانت‌اند Nuxt 4 با موتور Bun</span>
        </div>
      </div>
    </div>

    <!-- کانتینر اصلی تب‌های مدیریت -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <Tabs v-model="activeTab" class="w-full">
        <div class="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <TabsList class="grid w-full grid-cols-2 rounded-2xl bg-secondary/60 p-1 sm:w-auto sm:flex h-11">
            <TabsTrigger value="messages"
              class="rounded-xl px-4 py-2 text-xs font-semibold gap-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-xs">
              <Mail class="size-4 shrink-0" />
              <span>{{ adminDashboardData.tabs.messages.label }}</span>
              <span v-if="unreadCount > 0"
                class="inline-flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {{ unreadCount }}
              </span>
            </TabsTrigger>

            <TabsTrigger value="articles"
              class="rounded-xl px-4 py-2 text-xs font-semibold gap-2 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-xs">
              <FileText class="size-4 shrink-0" />
              <span>{{ adminDashboardData.tabs.articles.label }}</span>
              <span class="text-[11px] text-muted-foreground">
                ({{ articles.length }})
              </span>
            </TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5 w-full sm:w-auto" as-child>
            <NuxtLink :to="activeTab === 'messages' ? '/admin/messages' : '/admin/articles'">
              <span>{{ activeTab === 'messages' ? 'ورود به صندوق پیام‌ها' : 'مدیریت کامل مقالات' }}</span>
              <ArrowRight class="size-3.5 rotate-180" />
            </NuxtLink>
          </Button>
        </div>

        <!-- تب پیام‌ها -->
        <TabsContent value="messages" class="mt-6 space-y-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative w-full sm:max-w-md">
              <Input v-model="messageSearchQuery" type="text"
                :placeholder="adminDashboardData.messagesSection.searchPlaceholder"
                class="pr-10 pl-3 rounded-xl bg-background/50 h-10 text-xs text-right" />
              <Search
                class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <Button size="sm" :variant="messageFilter === 'all' ? 'default' : 'outline'"
                class="rounded-pill text-xs h-8.5 px-3.5" @click="messageFilter = 'all'">
                {{ adminDashboardData.messagesSection.filterAll }} ({{ messages.length }})
              </Button>
              <Button size="sm" :variant="messageFilter === 'unread' ? 'default' : 'outline'"
                class="rounded-pill text-xs h-8.5 px-3.5" @click="messageFilter = 'unread'">
                {{ adminDashboardData.messagesSection.filterUnread }} ({{ unreadCount }})
              </Button>
            </div>
          </div>

          <div v-if="isMessagesLoading" class="space-y-3 pt-2">
            <div v-for="i in 3" :key="i"
              class="h-24 animate-pulse rounded-2xl border border-border/60 bg-muted/40 p-4" />
          </div>

          <div v-else-if="filteredMessages.length === 0"
            class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
            <div class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Inbox class="size-6" />
            </div>
            <h3 class="mt-4 text-sm font-bold text-foreground">
              {{ adminDashboardData.messagesSection.emptyTitle }}
            </h3>
            <p class="mt-1 text-xs text-muted-foreground">
              {{ adminDashboardData.messagesSection.emptyDescription }}
            </p>
          </div>

          <div v-else class="space-y-3 pt-2">
            <div v-for="msg in filteredMessages" :key="msg.id" :class="[
              'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-4.5 transition-all duration-200 hover:shadow-xs',
              msg.is_read
                ? 'border-border/60 bg-card/60 text-muted-foreground'
                : 'border-primary/30 bg-primary/5 text-foreground shadow-xs',
            ]">
              <div class="flex-1 space-y-1.5 cursor-pointer min-w-0 text-right" @click="openConversation(msg.id)">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-bold text-foreground">
                    {{ msg.full_name }}
                  </span>

                  <Badge v-if="!msg.is_read" class="bg-amber-500 text-white text-[10px] rounded-pill px-2 py-0.5">
                    {{ adminDashboardData.messagesSection.badgeNew }}
                  </Badge>

                  <Badge v-if="msg.subject" variant="outline" class="text-[11px] rounded-pill border-border/80">
                    {{ msg.subject }}
                  </Badge>

                  <span class="text-xs text-muted-foreground font-mono" dir="ltr">
                    {{ msg.phone }}
                  </span>
                </div>

                <p class="line-clamp-2 text-xs text-muted-foreground leading-relaxed text-right">
                  {{ msg.message }}
                </p>

                <div class="flex items-center gap-1.5 text-[11px] text-muted-foreground/80 pt-0.5">
                  <Clock class="size-3" />
                  <span>{{ formatDate(msg.created_at) }}</span>
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <Button size="sm" variant="outline" class="rounded-xl text-xs h-8.5 px-3 gap-1.5" as-child>
                  <NuxtLink :to="`/admin/messages/${msg.id}`">
                    <Eye class="size-3.5" />
                    <span>مشاهده و پاسخ</span>
                  </NuxtLink>
                </Button>

                <Button size="icon" variant="ghost" class="size-8.5 rounded-xl"
                  :title="msg.is_read ? adminDashboardData.messagesSection.markAsUnreadTitle : adminDashboardData.messagesSection.markAsReadTitle"
                  @click="toggleMessageRead(msg, !msg.is_read)">
                  <CheckCircle2 :class="['size-4', msg.is_read ? 'text-primary' : 'text-muted-foreground/50']" />
                </Button>

                <Button size="icon" variant="ghost" class="size-8.5 rounded-xl text-destructive hover:bg-destructive/10"
                  @click="confirmDeleteMessage(msg)">
                  <Trash2 class="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <!-- تب مقالات -->
        <TabsContent value="articles" class="mt-6 space-y-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative w-full sm:max-w-md">
              <Input v-model="articleSearchQuery" type="text"
                :placeholder="adminDashboardData.articlesSection.searchPlaceholder"
                class="pr-10 pl-3 rounded-xl bg-background/50 h-10 text-xs text-right" />
              <Search
                class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <Button
              class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs gap-1.5 h-9 px-4 shrink-0"
              as-child>
              <NuxtLink to="/admin/articles/create">
                <Plus class="size-4" />
                <span>{{ adminDashboardData.articlesSection.createButton }}</span>
              </NuxtLink>
            </Button>
          </div>

          <div v-if="isArticlesLoading" class="space-y-3 pt-2">
            <div v-for="i in 3" :key="i"
              class="h-20 animate-pulse rounded-2xl border border-border/60 bg-muted/40 p-4" />
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

          <div v-else class="space-y-3 pt-2">
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
                  <span>{{ adminDashboardData.articlesSection.registeredPrefix }} {{ formatDate(item.created_at)
                    }}</span>
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <Button v-if="item.is_published" variant="outline" size="sm" as-child
                  class="rounded-xl text-xs h-8.5 px-3 gap-1.5">
                  <NuxtLink :to="`/articles/${item.slug}`" target="_blank">
                    <span>{{ adminDashboardData.articlesSection.viewButton }}</span>
                    <ExternalLink class="size-3.5" />
                  </NuxtLink>
                </Button>

                <Button variant="outline" size="sm" class="rounded-xl text-xs h-8.5 px-3 gap-1.5" as-child>
                  <NuxtLink :to="`/admin/articles/${item.id}`">
                    <Edit class="size-3.5" />
                    <span>{{ adminDashboardData.articlesSection.editButton }}</span>
                  </NuxtLink>
                </Button>

                <Button size="icon" variant="ghost" class="size-8.5 rounded-xl text-destructive hover:bg-destructive/10"
                  @click="confirmDeleteArticle(item)">
                  <Trash2 class="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <!-- مودال تایید حذف -->
    <Dialog :open="isDeleteMsgDialogOpen || isDeleteArticleDialogOpen"
      @update:open="(val) => { if (!val) { isDeleteMsgDialogOpen = false; isDeleteArticleDialogOpen = false; } }">
      <DialogContent class="w-[min(94vw,28rem)] rounded-3xl bg-card border-border p-5 sm:p-6 text-foreground" dir="rtl">
        <DialogHeader class="text-right">
          <DialogTitle class="text-base font-bold text-destructive flex items-center gap-2">
            <AlertCircle class="size-5" />
            <span>{{ adminDashboardData.deleteConfirmModal.title }}</span>
          </DialogTitle>
          <DialogDescription class="text-xs text-muted-foreground pt-2">
            {{ adminDashboardData.deleteConfirmModal.description }}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" class="rounded-pill text-xs px-4"
            @click="isDeleteMsgDialogOpen = false; isDeleteArticleDialogOpen = false;">
            {{ adminDashboardData.deleteConfirmModal.cancelButton }}
          </Button>

          <Button v-if="isDeleteMsgDialogOpen" variant="destructive" size="sm" :disabled="isDeletingMsg"
            class="rounded-pill text-xs px-4 gap-1.5" @click="handleDeleteMessage">
            <Loader2 v-if="isDeletingMsg" class="size-3.5 animate-spin" />
            <template v-else>
              <span>{{ adminDashboardData.deleteConfirmModal.confirmMessageDelete }}</span>
            </template>
          </Button>

          <Button v-else-if="isDeleteArticleDialogOpen" variant="destructive" size="sm" :disabled="isDeletingArticle"
            class="rounded-pill text-xs px-4 gap-1.5" @click="handleDeleteArticle">
            <Loader2 v-if="isDeletingArticle" class="size-3.5 animate-spin" />
            <template v-else>
              <span>{{ adminDashboardData.deleteConfirmModal.confirmArticleDelete }}</span>
            </template>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
