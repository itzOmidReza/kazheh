<script setup lang="ts">
import { Search, RefreshCw, Inbox, ChevronRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { siteConfig } from '~/data'
import type { MessageItem } from '~/components/admin/messages/MessageCard.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `صندوق پیام‌ها | ${siteConfig.name}` })

const router = useRouter()

const messages = ref<MessageItem[]>([
  {
    id: 1,
    full_name: 'سارا احمدی',
    phone: '09123456789',
    subject: 'درخواست مشاوره فردی',
    message: 'سلام، می‌خواستم برای روزهای پنجشنبه وقت رزرو کنم. امکانش هست راهنمایی بفرمایید؟',
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    full_name: 'محسن کریمی',
    phone: '09351112233',
    subject: 'هماهنگی کارگاه آموزشی',
    message: 'باسلام، پیرو کارگاه کنترل اضطراب تمایل داشتم اطلاعات ثبت‌نام را دریافت کنم.',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    full_name: 'نگین شجاعی',
    phone: '09197778899',
    subject: 'مشاوره آنلاین',
    message: 'درود، من ساکن تهران نیستم. آیا جلسات شما به شکل آنلاین و تصویری هم برگزار می‌شود؟',
    is_read: false,
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
])

const filterType = ref<'all' | 'unread' | 'read'>('all')
const searchQuery = ref('')

const unreadCount = computed(() => messages.value.filter((m) => !m.is_read).length)
const readCount = computed(() => messages.value.filter((m) => m.is_read).length)

const filteredMessages = computed(() => {
  let list = messages.value
  if (filterType.value === 'unread') list = list.filter((m) => !m.is_read)
  else if (filterType.value === 'read') list = list.filter((m) => m.is_read)

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
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

const toggleReadStatus = (msg: MessageItem) => {
  msg.is_read = !msg.is_read
  toast.success(msg.is_read ? 'پیام خوانده شد' : 'به وضعیت خوانده‌نشده برگشت')
}

// دیالوگ حذف
const messageToDelete = ref<MessageItem | null>(null)
const isDeleteDialogOpen = ref(false)

const openDeleteModal = (msg: MessageItem) => {
  messageToDelete.value = msg
  isDeleteDialogOpen.value = true
}

const handleDeleteConfirm = () => {
  if (!messageToDelete.value) return
  messages.value = messages.value.filter((m) => m.id !== messageToDelete.value!.id)
  isDeleteDialogOpen.value = false
  toast.success('پیام با موفقیت حذف گردید.')
  messageToDelete.value = null
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- بالای صفحه -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-right">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <NuxtLink to="/admin" class="hover:text-primary transition-colors">پنل مدیریت</NuxtLink>
          <ChevronRight class="size-3.5 rotate-180" />
          <span class="text-foreground font-medium">صندوق پیام‌ها</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">صندوق پیام‌ها و درخواست‌های مشاوره</h1>
      </div>

      <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5"
        @click="toast.success('به‌روزرسانی انجام شد')">
        <RefreshCw class="size-3.5" />
        <span>بروزرسانی</span>
      </Button>
    </div>

    <!-- آمارها -->
    <AdminMessagesMessageStats v-model:current-filter="filterType" :total-count="messages.length"
      :unread-count="unreadCount" :read-count="readCount" />

    <!-- فیلتر و جستجو -->
    <div
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="relative w-full sm:max-w-md">
        <Input v-model="searchQuery" type="text" placeholder="جست‌وجوی نام، شماره تماس..."
          class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
        <Search class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <Button size="sm" :variant="filterType === 'all' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'all'">همه</Button>
        <Button size="sm" :variant="filterType === 'unread' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'unread'">خوانده‌نشده ({{ unreadCount
          }})</Button>
        <Button size="sm" :variant="filterType === 'read' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'read'">خوانده‌شده</Button>
      </div>
    </div>

    <!-- لیست پیام‌ها -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <div v-if="filteredMessages.length === 0"
        class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
        <Inbox class="size-6 mx-auto text-muted-foreground" />
        <p class="mt-3 text-xs text-muted-foreground">هیچ پیامی در این وضعیت یافت نشد.</p>
      </div>

      <div v-else class="space-y-3">
        <AdminMessagesMessageCard v-for="msg in filteredMessages" :key="msg.id" :message="msg"
          @select="(id) => router.push(`/admin/messages/${id}`)" @toggle-read="toggleReadStatus"
          @delete="openDeleteModal" />
      </div>
    </div>

    <!-- مودال تایید حذف عمومی -->
    <AdminSharedDeleteConfirmDialog v-model:open="isDeleteDialogOpen" title="حذف پیام مراجع"
      description="آیا از پاک کردن این پیام اطمینان دارید؟" @confirm="handleDeleteConfirm" />
  </div>
</template>
