<script setup lang="ts">
import { Mail, FileText, Plus, RefreshCw, Search, Inbox, ArrowRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from 'vue-sonner'
import { siteConfig, adminDashboardData } from '~/data'
import type { MessageItem } from '~/components/admin/messages/MessageCard.vue'
import type { ArticleItem } from '~/components/admin/articles/ArticleCard.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `${adminDashboardData.header.title} | ${siteConfig.name}` })

const router = useRouter()
const activeTab = ref<'messages' | 'articles'>('messages')

// استیت ماک پیام‌ها
const messages = ref<MessageItem[]>([
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

const messageFilter = ref<'all' | 'unread'>('all')
const messageSearchQuery = ref('')
const unreadCount = computed(() => messages.value.filter((m) => !m.is_read).length)

const filteredMessages = computed(() => {
  let list = messages.value
  if (messageFilter.value === 'unread') list = list.filter((m) => !m.is_read)
  if (messageSearchQuery.value.trim()) {
    const q = messageSearchQuery.value.trim().toLowerCase()
    list = list.filter((m) => m.full_name.toLowerCase().includes(q) || m.phone.includes(q) || m.message.toLowerCase().includes(q))
  }
  return list
})

const toggleMessageRead = (msg: MessageItem) => {
  msg.is_read = !msg.is_read
  toast.success(msg.is_read ? 'پیام به وضعیت بررسی شده تغییر یافت.' : 'پیام به عنوان جدید نشانه‌گذاری شد.')
}

// استیت ماک مقالات
const articles = ref<ArticleItem[]>([
  {
    id: 1,
    title: 'چگونه اضطراب خود را در موقعیت‌های استرس‌زا کنترل کنیم؟',
    slug: 'understanding-anxiety',
    summary: 'راهکارهای عملی برای مهار استرس‌های روزمره.',
    is_published: true,
    created_at: new Date().toISOString(),
  },
])

const articleSearchQuery = ref('')
const publishedArticlesCount = computed(() => articles.value.filter((a) => a.is_published).length)

const filteredArticles = computed(() => {
  if (!articleSearchQuery.value.trim()) return articles.value
  const q = articleSearchQuery.value.trim().toLowerCase()
  return articles.value.filter((a) => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q))
})

// دیالوگ حذف یکپارچه
const itemToDelete = ref<{ type: 'message' | 'article'; id: number; title: string } | null>(null)
const isDeleteDialogOpen = ref(false)

const openDeleteModal = (type: 'message' | 'article', id: number, title: string) => {
  itemToDelete.value = { type, id, title }
  isDeleteDialogOpen.value = true
}

const handleDeleteConfirm = () => {
  if (!itemToDelete.value) return
  if (itemToDelete.value.type === 'message') {
    messages.value = messages.value.filter((m) => m.id !== itemToDelete.value!.id)
    toast.success('پیام مراجع حذف شد.')
  } else {
    articles.value = articles.value.filter((a) => a.id !== itemToDelete.value!.id)
    toast.success('مقاله مورد نظر حذف شد.')
  }
  isDeleteDialogOpen.value = false
  itemToDelete.value = null
}
</script>

<template>
  <div class="space-y-8" dir="rtl">
    <!-- هدر بالای داشبورد -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-right">
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight text-foreground">میز کار و داشبورد مدیریتی</h1>
        <p class="text-xs text-muted-foreground">گزارش و مدیریت کلیه پیام‌های دریافتی مراجعین و مقالات کلینیک کاژه</p>
      </div>

      <div class="flex items-center gap-2.5">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5"
          @click="toast.success('داده‌ها به‌روزرسانی شدند')">
          <RefreshCw class="size-3.5" />
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

    <!-- کارت‌های آمار ماژولار -->
    <AdminDashboardStats :unread-messages-count="unreadCount" :total-messages-count="messages.length"
      :total-articles-count="articles.length" :published-articles-count="publishedArticlesCount" />

    <!-- تب‌های مدیریت -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <Tabs v-model="activeTab" class="w-full">
        <div class="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <TabsList class="grid w-full grid-cols-2 rounded-2xl bg-secondary/60 p-1 sm:w-auto sm:flex h-11">
            <TabsTrigger value="messages" class="rounded-xl px-4 py-2 text-xs font-semibold gap-2">
              <Mail class="size-4 shrink-0" />
              <span>پیام‌های مراجعین</span>
              <span v-if="unreadCount > 0"
                class="inline-flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {{ unreadCount }}
              </span>
            </TabsTrigger>

            <TabsTrigger value="articles" class="rounded-xl px-4 py-2 text-xs font-semibold gap-2">
              <FileText class="size-4 shrink-0" />
              <span>مقالات تخصصی</span>
              <span class="text-[11px] text-muted-foreground">({{ articles.length }})</span>
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
              <Input v-model="messageSearchQuery" type="text" placeholder="جست‌وجوی پیام‌ها..."
                class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
              <Search
                class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div class="flex items-center gap-1.5">
              <Button size="sm" :variant="messageFilter === 'all' ? 'default' : 'outline'"
                class="rounded-pill text-xs h-8.5 px-3.5" @click="messageFilter = 'all'">همه ({{ messages.length
                }})</Button>
              <Button size="sm" :variant="messageFilter === 'unread' ? 'default' : 'outline'"
                class="rounded-pill text-xs h-8.5 px-3.5" @click="messageFilter = 'unread'">خوانده‌نشده ({{ unreadCount
                }})</Button>
            </div>
          </div>

          <div v-if="filteredMessages.length === 0"
            class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
            <Inbox class="size-6 mx-auto text-muted-foreground" />
            <p class="mt-3 text-xs text-muted-foreground">هیچ پیامی در این وضعیت یافت نشد.</p>
          </div>
          <div v-else class="space-y-3 pt-2">
            <AdminMessagesMessageCard v-for="msg in filteredMessages" :key="msg.id" :message="msg"
              @select="(id) => router.push(`/admin/messages/${id}`)" @toggle-read="toggleMessageRead"
              @delete="(item) => openDeleteModal('message', item.id, item.full_name)" />
          </div>
        </TabsContent>

        <!-- تب مقالات -->
        <TabsContent value="articles" class="mt-6 space-y-4">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="relative w-full sm:max-w-md">
              <Input v-model="articleSearchQuery" type="text" placeholder="جست‌وجوی عنوان مقاله..."
                class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
              <Search
                class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <Button
              class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs gap-1.5 h-9 px-4 shrink-0"
              as-child>
              <NuxtLink to="/admin/articles/create">
                <Plus class="size-4" />
                <span>نگارش مقاله جدید</span>
              </NuxtLink>
            </Button>
          </div>

          <div v-if="filteredArticles.length === 0"
            class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
            <FileText class="size-6 mx-auto text-muted-foreground" />
            <p class="mt-3 text-xs text-muted-foreground">هیچ مقاله‌ای یافت نشد.</p>
          </div>
          <div v-else class="space-y-3 pt-2">
            <AdminArticlesArticleCard v-for="art in filteredArticles" :key="art.id" :article="art"
              @delete="(item) => openDeleteModal('article', item.id, item.title)" />
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <!-- دیالوگ حذف عمومی -->
    <AdminSharedDeleteConfirmDialog v-model:open="isDeleteDialogOpen"
      :title="itemToDelete?.type === 'message' ? 'حذف پیام مراجع' : 'حذف مقاله'"
      :description="`آیا از حذف «${itemToDelete?.title || ''}» اطمینان دارید؟ این عمل غیرقابل بازگشت است.`"
      @confirm="handleDeleteConfirm" />
  </div>
</template>
