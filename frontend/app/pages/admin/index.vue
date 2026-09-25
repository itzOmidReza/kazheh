<script setup lang="ts">
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
  LogOut,
  Phone,
  User,
  RefreshCw,
  Search,
  AlertCircle,
  Inbox,
  ArrowRight,
  Loader2,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
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
import type { ContactMessage, ArticleListItem, ArticleResponse } from '~/types/api'

definePageMeta({
  middleware: 'admin-auth',
})

useHead({
  title: 'پنل مدیریت | کلینیک آرامش',
})

const { admin, logout } = useAuth()
const { apiFetch } = useApi()

// -------------------------------------------------------------
// Active Tab State
// -------------------------------------------------------------
const activeTab = ref<'messages' | 'articles'>('messages')

// -------------------------------------------------------------
// Messages Inbox
// -------------------------------------------------------------
const messages = ref<ContactMessage[]>([])
const isMessagesLoading = ref(false)
const messageFilter = ref<'all' | 'unread'>('all')
const messageSearchQuery = ref('')

const fetchMessages = async () => {
  isMessagesLoading.value = true
  try {
    const unreadOnly = messageFilter.value === 'unread'
    messages.value = await apiFetch<ContactMessage[]>(
      `/contact?limit=100&unread_only=${unreadOnly}`
    )
  } catch (err: any) {
    toast.error('خطا در بارگذاری پیام‌های ارتباطی.')
  } finally {
    isMessagesLoading.value = false
  }
}

const unreadCount = computed(() => {
  return messages.value.filter((m) => !m.is_read).length
})

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

// Message Detail Dialog
const selectedMessage = ref<ContactMessage | null>(null)
const isDetailOpen = ref(false)

const openMessageDetail = async (msg: ContactMessage) => {
  selectedMessage.value = msg
  isDetailOpen.value = true

  // Automatically mark as read if currently unread
  if (!msg.is_read) {
    await toggleMessageRead(msg, true, false)
  }
}

const toggleMessageRead = async (
  msg: ContactMessage,
  targetStatus: boolean,
  showToast = true
) => {
  try {
    const updated = await apiFetch<ContactMessage>(`/contact/${msg.id}`, {
      method: 'PATCH',
      body: { is_read: targetStatus },
    })
    msg.is_read = updated.is_read
    if (selectedMessage.value && selectedMessage.value.id === msg.id) {
      selectedMessage.value.is_read = updated.is_read
    }
    if (showToast) {
      toast.success(
        targetStatus ? 'پیام به عنوان خوانده شده علامت‌گذاری شد.' : 'پیام به وضعیت خوانده‌نشده برگشت.'
      )
    }
  } catch {
    toast.error('خطا در تغییر وضعیت پیام.')
  }
}

// Delete Message Confirmation
const messageToDelete = ref<ContactMessage | null>(null)
const isDeleteMsgDialogOpen = ref(false)
const isDeletingMsg = ref(false)

const confirmDeleteMessage = (msg: ContactMessage) => {
  messageToDelete.value = msg
  isDeleteMsgDialogOpen.value = true
}

const handleDeleteMessage = async () => {
  if (!messageToDelete.value) return
  isDeletingMsg.value = true
  try {
    await apiFetch(`/contact/${messageToDelete.value.id}`, {
      method: 'DELETE',
    })
    messages.value = messages.value.filter((m) => m.id !== messageToDelete.value!.id)
    if (selectedMessage.value?.id === messageToDelete.value.id) {
      isDetailOpen.value = false
      selectedMessage.value = null
    }
    isDeleteMsgDialogOpen.value = false
    messageToDelete.value = null
    toast.success('پیام با موفقیت حذف شد.')
  } catch {
    toast.error('خطا در حذف پیام.')
  } finally {
    isDeletingMsg.value = false
  }
}

// -------------------------------------------------------------
// Articles Management
// -------------------------------------------------------------
const articles = ref<ArticleListItem[]>([])
const isArticlesLoading = ref(false)
const articleSearchQuery = ref('')

const fetchArticles = async () => {
  isArticlesLoading.value = true
  try {
    articles.value = await apiFetch<ArticleListItem[]>(
      '/articles/admin/all?limit=100&published_only=false'
    )
  } catch {
    toast.error('خطا در دریافت لیست مقالات.')
  } finally {
    isArticlesLoading.value = false
  }
}

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

// Create / Edit Article Modal
const isArticleFormOpen = ref(false)
const isEditing = ref(false)
const currentArticleId = ref<number | null>(null)
const isSavingArticle = ref(false)

const articleForm = reactive({
  title: '',
  slug: '',
  summary: '',
  content: '',
  is_published: false,
})

const openCreateArticle = () => {
  isEditing.value = false
  currentArticleId.value = null
  articleForm.title = ''
  articleForm.slug = ''
  articleForm.summary = ''
  articleForm.content = ''
  articleForm.is_published = false
  isArticleFormOpen.value = true
}

const openEditArticle = async (item: ArticleListItem) => {
  isEditing.value = true
  currentArticleId.value = item.id
  isArticleFormOpen.value = true

  try {
    const detailed = await apiFetch<ArticleResponse>(`/articles/admin/${item.id}`)
    articleForm.title = detailed.title
    articleForm.slug = detailed.slug
    articleForm.summary = detailed.summary || ''
    articleForm.content = detailed.content
    articleForm.is_published = detailed.is_published
  } catch {
    // Fallback to item data
    articleForm.title = item.title
    articleForm.slug = item.slug
    articleForm.summary = item.summary || ''
    articleForm.content = ''
    articleForm.is_published = item.is_published
    toast.error('خطا در دریافت محتوای کامل مقاله.')
  }
}

const handleSaveArticle = async () => {
  if (!articleForm.title.trim() || !articleForm.content.trim()) {
    toast.error('عنوان و متن مقاله الزامی هستند.')
    return
  }

  isSavingArticle.value = true
  try {
    if (isEditing.value && currentArticleId.value) {
      await apiFetch<ArticleResponse>(`/articles/${currentArticleId.value}`, {
        method: 'PATCH',
        body: {
          title: articleForm.title.trim(),
          slug: articleForm.slug.trim() || null,
          summary: articleForm.summary.trim() || null,
          content: articleForm.content.trim(),
          is_published: articleForm.is_published,
        },
      })
      toast.success('مقاله با موفقیت ویرایش شد.')
    } else {
      await apiFetch<ArticleResponse>('/articles', {
        method: 'POST',
        body: {
          title: articleForm.title.trim(),
          slug: articleForm.slug.trim() || null,
          summary: articleForm.summary.trim() || null,
          content: articleForm.content.trim(),
          is_published: articleForm.is_published,
        },
      })
      toast.success('مقاله جدید با موفقیت ایجاد شد.')
    }
    isArticleFormOpen.value = false
    await fetchArticles()
  } catch (err: any) {
    const detail = err?.data?.detail
    const msg = typeof detail === 'string' ? detail : 'خطا در ذخیره مقاله.'
    toast.error(msg)
  } finally {
    isSavingArticle.value = false
  }
}

// Delete Article Confirmation
const articleToDelete = ref<ArticleListItem | null>(null)
const isDeleteArticleDialogOpen = ref(false)
const isDeletingArticle = ref(false)

const confirmDeleteArticle = (item: ArticleListItem) => {
  articleToDelete.value = item
  isDeleteArticleDialogOpen.value = true
}

const handleDeleteArticle = async () => {
  if (!articleToDelete.value) return
  isDeletingArticle.value = true
  try {
    await apiFetch(`/articles/${articleToDelete.value.id}`, {
      method: 'DELETE',
    })
    articles.value = articles.value.filter((a) => a.id !== articleToDelete.value!.id)
    isDeleteArticleDialogOpen.value = false
    articleToDelete.value = null
    toast.success('مقاله با موفقیت حذف شد.')
  } catch {
    toast.error('خطا در حذف مقاله.')
  } finally {
    isDeletingArticle.value = false
  }
}

// Format date helper (Persian Jalali / Locale)
const formatDate = (isoString: string) => {
  try {
    const d = new Date(isoString)
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(d)
  } catch {
    return isoString
  }
}

// Load data on mount
onMounted(() => {
  fetchMessages()
  fetchArticles()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Top Bar -->
    <header class="border-b border-border bg-card">
      <div class="site-container flex flex-wrap items-center justify-between gap-4 py-4">
        <div class="flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
            ک
          </div>
          <div>
            <h1 class="text-base font-bold text-primary-900">
              پنل مدیریت کلینیک آرامش
            </h1>
            <p class="text-xs text-muted-foreground">
              {{ admin?.full_name || admin?.username }} ({{ admin?.phone }})
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" as-child class="rounded-pill">
            <NuxtLink to="/">
              مشاهده وب‌سایت
              <ExternalLink class="size-3.5" />
            </NuxtLink>
          </Button>

          <Button variant="ghost" size="sm" class="rounded-pill text-destructive hover:bg-destructive/10" @click="logout">
            خروج
            <LogOut class="size-3.5" />
          </Button>
        </div>
      </div>
    </header>

    <!-- Main Content Tabs -->
    <main class="site-container py-8">
      <Tabs v-model="activeTab" class="w-full">
        <div class="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList class="grid w-full grid-cols-2 rounded-pill bg-secondary/70 p-1 sm:w-auto sm:flex">
            <TabsTrigger value="messages" class="rounded-pill px-3 py-2 text-xs font-semibold gap-1.5 sm:px-5 sm:text-sm">
              <Mail class="size-4 shrink-0" />
              <span>پیام‌ها</span>
              <span
                v-if="unreadCount > 0"
                class="inline-flex size-5 items-center justify-center rounded-full bg-cta text-[11px] font-bold text-cta-foreground"
              >
                {{ unreadCount }}
              </span>
            </TabsTrigger>

            <TabsTrigger value="articles" class="rounded-pill px-3 py-2 text-xs font-semibold gap-1.5 sm:px-5 sm:text-sm">
              <FileText class="size-4 shrink-0" />
              <span>مقالات</span>
              <span class="text-xs text-muted-foreground">
                ({{ articles.length }})
              </span>
            </TabsTrigger>
          </TabsList>

          <div class="w-full sm:w-auto">
            <Button
              v-if="activeTab === 'articles'"
              class="w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft sm:w-auto min-h-10"
              @click="openCreateArticle"
            >
              <Plus class="size-4" />
              افزودن مقاله جدید
            </Button>

            <Button
              v-else
              variant="outline"
              size="sm"
              class="w-full rounded-pill sm:w-auto min-h-10"
              :disabled="isMessagesLoading"
              @click="fetchMessages"
            >
              <RefreshCw :class="['size-3.5', isMessagesLoading && 'animate-spin']" />
              بروزرسانی پیام‌ها
            </Button>
          </div>
        </div>

        <!-- TAB 1: MESSAGES INBOX -->
        <TabsContent value="messages" class="mt-6 space-y-4">
          <!-- Search & Filter Controls -->
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative w-full sm:max-w-xs">
              <Input
                v-model="messageSearchQuery"
                type="text"
                placeholder="جست‌وجوی پیام یا فرستنده..."
                class="pl-10 rounded-pill"
              />
              <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Button
                size="sm"
                :variant="messageFilter === 'all' ? 'default' : 'outline'"
                class="rounded-pill text-xs shrink-0 min-h-9"
                @click="messageFilter = 'all'; fetchMessages()"
              >
                همه پیام‌ها ({{ messages.length }})
              </Button>
              <Button
                size="sm"
                :variant="messageFilter === 'unread' ? 'default' : 'outline'"
                class="rounded-pill text-xs shrink-0 min-h-9"
                @click="messageFilter = 'unread'; fetchMessages()"
              >
                فقط خوانده‌نشده
              </Button>
            </div>
          </div>

          <!-- Messages List -->
          <div v-if="isMessagesLoading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-24 animate-pulse rounded-2xl border border-border bg-card p-4" />
          </div>

          <div
            v-else-if="filteredMessages.length === 0"
            class="rounded-2xl border border-border bg-card p-12 text-center"
          >
            <div class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Inbox class="size-6" />
            </div>
            <h3 class="mt-4 text-base font-bold text-primary-900">
              پیامی یافت نشد
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">
              در حال حاضر پیامی با این مشخصات وجود ندارد.
            </p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="msg in filteredMessages"
              :key="msg.id"
              :class="[
                'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-4 transition-all duration-200 hover:shadow-card',
                msg.is_read ? 'border-border bg-card text-muted-foreground' : 'border-primary/40 bg-secondary/30 text-foreground font-medium',
              ]"
            >
              <div class="flex-1 space-y-1 cursor-pointer" @click="openMessageDetail(msg)">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-bold text-primary-900">
                    {{ msg.full_name }}
                  </span>

                  <Badge v-if="!msg.is_read" class="bg-cta text-cta-foreground text-[10px] rounded-pill">
                    جدید
                  </Badge>

                  <Badge v-if="msg.subject" variant="outline" class="text-[11px] rounded-pill">
                    {{ msg.subject }}
                  </Badge>

                  <span class="text-xs text-muted-foreground" dir="ltr">
                    {{ msg.phone }}
                  </span>
                </div>

                <p class="line-clamp-1 text-xs text-muted-foreground">
                  {{ msg.message }}
                </p>

                <div class="flex items-center gap-1 text-[11px] text-muted-foreground pt-1">
                  <Clock class="size-3" />
                  {{ formatDate(msg.created_at) }}
                </div>
              </div>

              <!-- Action buttons -->
              <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Button
                  size="sm"
                  variant="outline"
                  class="rounded-pill text-xs min-h-9 px-3"
                  @click="openMessageDetail(msg)"
                >
                  <Eye class="size-3.5" />
                  مشاهده
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  class="rounded-pill text-xs min-h-9 px-3"
                  :title="msg.is_read ? 'علامت به عنوان خوانده‌نشده' : 'علامت به عنوان خوانده شده'"
                  @click="toggleMessageRead(msg, !msg.is_read)"
                >
                  <CheckCircle2 :class="['size-4', msg.is_read ? 'text-success' : 'text-muted-foreground']" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  class="rounded-pill text-xs min-h-9 px-3 text-destructive hover:bg-destructive/10"
                  @click="confirmDeleteMessage(msg)"
                >
                  <Trash2 class="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <!-- TAB 2: ARTICLES MANAGEMENT -->
        <TabsContent value="articles" class="mt-6 space-y-4">
          <!-- Search Control -->
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative w-full sm:max-w-xs">
              <Input
                v-model="articleSearchQuery"
                type="text"
                placeholder="جست‌وجوی مقالات..."
                class="pl-10 rounded-pill"
              />
              <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <Button
              variant="outline"
              size="sm"
              class="w-full rounded-pill sm:w-auto min-h-9"
              :disabled="isArticlesLoading"
              @click="fetchArticles"
            >
              <RefreshCw :class="['size-3.5', isArticlesLoading && 'animate-spin']" />
              بروزرسانی مقالات
            </Button>
          </div>

          <!-- Articles Table / Cards -->
          <div v-if="isArticlesLoading" class="space-y-3">
            <div v-for="i in 3" :key="i" class="h-20 animate-pulse rounded-2xl border border-border bg-card p-4" />
          </div>

          <div
            v-else-if="filteredArticles.length === 0"
            class="rounded-2xl border border-border bg-card p-12 text-center"
          >
            <div class="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <FileText class="size-6" />
            </div>
            <h3 class="mt-4 text-base font-bold text-primary-900">
              مقاله‌ای یافت نشد
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">
              اولین مقاله وب‌سایت را با دکمه «افزودن مقاله جدید» منتشر کنید.
            </p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="item in filteredArticles"
              :key="item.id"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-card"
            >
              <div class="space-y-1 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-base font-bold text-primary-900">
                    {{ item.title }}
                  </span>

                  <Badge
                    :class="[
                      'rounded-pill text-xs',
                      item.is_published ? 'bg-success text-success-foreground' : 'bg-secondary text-secondary-foreground',
                    ]"
                  >
                    {{ item.is_published ? 'منتشر شده' : 'پیش‌نویس' }}
                  </Badge>

                  <span class="text-xs text-muted-foreground" dir="ltr">
                    /articles/{{ item.slug }}
                  </span>
                </div>

                <p v-if="item.summary" class="line-clamp-1 text-xs text-muted-foreground">
                  {{ item.summary }}
                </p>

                <div class="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                  <Clock class="size-3" />
                  <span>ثبت: {{ formatDate(item.created_at) }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Button
                  v-if="item.is_published"
                  variant="outline"
                  size="sm"
                  as-child
                  class="rounded-pill text-xs min-h-9 px-3"
                >
                  <NuxtLink :to="`/articles/${item.slug}`" target="_blank">
                    مشاهده
                    <ExternalLink class="size-3.5" />
                  </NuxtLink>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  class="rounded-pill text-xs min-h-9 px-3"
                  @click="openEditArticle(item)"
                >
                  <Edit class="size-3.5" />
                  ویرایش
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  class="rounded-pill text-xs min-h-9 px-3 text-destructive hover:bg-destructive/10"
                  @click="confirmDeleteArticle(item)"
                >
                  <Trash2 class="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>

    <!-- MESSAGE DETAIL DIALOG -->
    <Dialog v-model:open="isDetailOpen">
      <DialogContent class="w-[min(94vw,32rem)] rounded-2xl bg-card border-border p-4 sm:p-6 text-foreground">
        <DialogHeader class="text-right">
          <DialogTitle class="text-lg font-bold text-primary-900">
            جزئیات پیام ارتباطی
          </DialogTitle>
          <DialogDescription class="text-xs text-muted-foreground">
            ارسال شده در {{ selectedMessage ? formatDate(selectedMessage.created_at) : '' }}
          </DialogDescription>
        </DialogHeader>

        <div v-if="selectedMessage" class="mt-4 space-y-4 text-sm">
          <div class="grid grid-cols-2 gap-3 rounded-xl bg-secondary/40 p-3 text-xs">
            <div>
              <span class="text-muted-foreground block">فرستنده:</span>
              <span class="font-bold text-primary-900">{{ selectedMessage.full_name }}</span>
            </div>

            <div>
              <span class="text-muted-foreground block">شماره تماس:</span>
              <a :href="`tel:${selectedMessage.phone}`" class="font-bold text-primary underline" dir="ltr">
                {{ selectedMessage.phone }}
              </a>
            </div>

            <div v-if="selectedMessage.email" class="col-span-2">
              <span class="text-muted-foreground block">ایمیل:</span>
              <a :href="`mailto:${selectedMessage.email}`" class="text-primary underline">
                {{ selectedMessage.email }}
              </a>
            </div>

            <div v-if="selectedMessage.subject" class="col-span-2">
              <span class="text-muted-foreground block">موضوع:</span>
              <span class="font-medium text-foreground">{{ selectedMessage.subject }}</span>
            </div>
          </div>

          <div class="space-y-1">
            <span class="text-xs font-semibold text-muted-foreground">متن پیام:</span>
            <div class="rounded-xl border border-border bg-background p-4 text-sm leading-7 text-foreground whitespace-pre-line max-h-60 overflow-y-auto">
              {{ selectedMessage.message }}
            </div>
          </div>
        </div>

        <DialogFooter class="mt-6 flex items-center justify-between gap-2">
          <Button
            variant="destructive"
            size="sm"
            class="rounded-pill text-xs"
            @click="selectedMessage && confirmDeleteMessage(selectedMessage)"
          >
            <Trash2 class="size-3.5" />
            حذف پیام
          </Button>

          <Button
            variant="outline"
            size="sm"
            class="rounded-pill text-xs"
            @click="isDetailOpen = false"
          >
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- ARTICLE CREATE / EDIT DIALOG -->
    <Dialog v-model:open="isArticleFormOpen">
      <DialogContent class="w-[min(94vw,42rem)] max-h-[90vh] overflow-y-auto rounded-2xl bg-card border-border p-4 sm:p-6 text-foreground">
        <DialogHeader class="text-right">
          <DialogTitle class="text-lg font-bold text-primary-900">
            {{ isEditing ? 'ویرایش مقاله' : 'افزودن مقاله جدید' }}
          </DialogTitle>
          <DialogDescription class="text-xs text-muted-foreground">
            {{ isEditing ? 'اطلاعات و محتوای مقاله را بروزرسانی کنید.' : 'عنوان، خلاصه و محتوای مقاله را وارد کنید.' }}
          </DialogDescription>
        </DialogHeader>

        <form class="mt-4 space-y-4 text-sm" @submit.prevent="handleSaveArticle">
          <div class="space-y-2">
            <Label for="art-title">عنوان مقاله *</Label>
            <Input
              id="art-title"
              v-model="articleForm.title"
              type="text"
              maxlength="200"
              placeholder="مثلاً: چطور اضطراب را بهتر بشناسیم؟"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="art-slug">نامک / Slug (اختیاری - خودکار تولید می‌شود)</Label>
            <Input
              id="art-slug"
              v-model="articleForm.slug"
              type="text"
              maxlength="220"
              placeholder="understanding-anxiety یا خالی بگذارید"
              dir="ltr"
            />
            <p class="text-[11px] text-muted-foreground">
              در صورت خالی بودن، بر اساس عنوان فارسی یا انگلیسی به‌صورت سئو‌پسند تولید خواهد شد.
            </p>
          </div>

          <div class="space-y-2">
            <Label for="art-summary">خلاصه کوتاه (Excerpt)</Label>
            <Textarea
              id="art-summary"
              v-model="articleForm.summary"
              rows="2"
              maxlength="500"
              placeholder="توضیح کوتاه ۱ یا ۲ جمله‌ای برای کارت‌های لیست مقاله..."
            />
          </div>

          <div class="space-y-2">
            <Label for="art-content">متن کامل مقاله * (پشتیبانی از پاراگراف یا تیترهای Markdown مانند # یا ##)</Label>
            <Textarea
              id="art-content"
              v-model="articleForm.content"
              rows="8"
              placeholder="متن مقاله را اینجا بنویسید..."
              required
              class="leading-7"
            />
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input
              id="art-published"
              v-model="articleForm.is_published"
              type="checkbox"
              class="size-4 rounded border-border text-primary accent-primary"
            />
            <Label for="art-published" class="cursor-pointer text-sm font-medium">
              انتشار عمومی (در صورت تیک نخوردن، به عنوان پیش‌نویس ذخیره می‌شود)
            </Label>
          </div>

          <DialogFooter class="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              class="rounded-pill"
              @click="isArticleFormOpen = false"
            >
              انصراف
            </Button>

            <Button
              type="submit"
              :disabled="isSavingArticle"
              class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft"
            >
              <Loader2 v-if="isSavingArticle" class="size-4 animate-spin" />
              <template v-else>
                {{ isEditing ? 'بروزرسانی مقاله' : 'ایجاد و ذخیره' }}
              </template>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- DELETE CONFIRMATION DIALOG -->
    <Dialog :open="isDeleteMsgDialogOpen || isDeleteArticleDialogOpen" @update:open="(val) => { if (!val) { isDeleteMsgDialogOpen = false; isDeleteArticleDialogOpen = false; } }">
      <DialogContent class="w-[min(94vw,28rem)] rounded-2xl bg-card border-border p-4 sm:p-6 text-foreground">
        <DialogHeader class="text-right">
          <DialogTitle class="text-base font-bold text-destructive flex items-center gap-2">
            <AlertCircle class="size-5" />
            تأیید حذف
          </DialogTitle>
          <DialogDescription class="text-sm text-muted-foreground pt-2">
            آیا از حذف این مورد اطمینان دارید؟ این عمل غیرقابل بازگشت است.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="mt-6 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            class="rounded-pill"
            @click="isDeleteMsgDialogOpen = false; isDeleteArticleDialogOpen = false;"
          >
            انصراف
          </Button>

          <Button
            v-if="isDeleteMsgDialogOpen"
            variant="destructive"
            size="sm"
            :disabled="isDeletingMsg"
            class="rounded-pill"
            @click="handleDeleteMessage"
          >
            <Loader2 v-if="isDeletingMsg" class="size-3.5 animate-spin" />
            <template v-else>
              بله، حذف پیام
            </template>
          </Button>

          <Button
            v-else-if="isDeleteArticleDialogOpen"
            variant="destructive"
            size="sm"
            :disabled="isDeletingArticle"
            class="rounded-pill"
            @click="handleDeleteArticle"
          >
            <Loader2 v-if="isDeletingArticle" class="size-3.5 animate-spin" />
            <template v-else>
              بله، حذف مقاله
            </template>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

