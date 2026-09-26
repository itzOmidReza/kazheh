<script setup lang="ts">
import {
  Mail,
  Search,
  RefreshCw,
  Eye,
  CheckCircle2,
  Trash2,
  Inbox,
  Clock,
  ChevronRight,
  AlertCircle,
  Loader2,
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
  title: `صندوق پیام‌ها | ${siteConfig.name}`,
})

const router = useRouter()

interface ContactMessage {
  id: number
  full_name: string
  phone: string
  subject?: string | null
  message: string
  is_read: boolean
  created_at: string
}

// داده‌های اولیه ماک
const messages = ref<ContactMessage[]>([
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

const isLoading = ref(false)
const filterType = ref<'all' | 'unread' | 'read'>('all')
const searchQuery = ref('')

const fetchMessages = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    toast.success('پیام‌ها به‌روزرسانی شدند.')
  }, 300)
}

// محاسبات و فیلترها
const unreadCount = computed(() => messages.value.filter((m) => !m.is_read).length)
const readCount = computed(() => messages.value.filter((m) => m.is_read).length)

const filteredMessages = computed(() => {
  let list = messages.value

  if (filterType.value === 'unread') {
    list = list.filter((m) => !m.is_read)
  } else if (filterType.value === 'read') {
    list = list.filter((m) => m.is_read)
  }

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

const openConversation = (msgId: number) => {
  router.push(`/admin/messages/${msgId}`)
}

// تغییر وضعیت خوانده‌شده
const toggleReadStatus = (msg: ContactMessage, targetStatus: boolean) => {
  msg.is_read = targetStatus

  if (targetStatus) {
    toast.success('پیام خوانده شد', {
      description: `پیام ${msg.full_name} به بخش بررسی‌شده‌ها منتقل گردید.`,
      action: {
        label: 'بازگردانی',
        onClick: () => toggleReadStatus(msg, false),
      },
    })
  } else {
    toast.info('بازگشت به وضعیت بررسی نشده', {
      description: `پیام ${msg.full_name} به عنوان جدید نشانه‌گذاری شد.`,
      action: {
        label: 'خوانده شد',
        onClick: () => toggleReadStatus(msg, true),
      },
    })
  }
}

// حذف پیام
const messageToDelete = ref<ContactMessage | null>(null)
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)

const confirmDelete = (msg: ContactMessage) => {
  messageToDelete.value = msg
  isDeleteDialogOpen.value = true
}

const handleDelete = () => {
  if (!messageToDelete.value) return
  isDeleting.value = true
  const deletedItem = messageToDelete.value

  setTimeout(() => {
    messages.value = messages.value.filter((m) => m.id !== deletedItem.id)
    isDeleteDialogOpen.value = false
    messageToDelete.value = null
    isDeleting.value = false

    toast.success('پیام حذف شد', {
      description: `پیام ارسالی از طرف ${deletedItem.full_name} با موفقیت پاک شد.`,
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
          <span class="text-foreground font-medium">صندوق پیام‌ها</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          صندوق پیام‌ها و درخواست‌های مشاوره
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5" :disabled="isLoading"
          @click="fetchMessages">
          <RefreshCw :class="['size-3.5', isLoading && 'animate-spin']" />
          <span>{{ adminDashboardData.messagesSection.refreshButton }}</span>
        </Button>
      </div>
    </div>

    <!-- نوارهای خلاصه آماری -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 text-right">
      <div
        class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-primary/40"
        @click="filterType = 'all'">
        <div>
          <p class="text-xs text-muted-foreground font-medium">کل پیام‌ها</p>
          <p class="mt-1 text-2xl font-bold text-foreground">{{ messages.length }}</p>
        </div>
        <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mail class="size-5" />
        </div>
      </div>

      <div
        class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-amber-500/40"
        @click="filterType = 'unread'">
        <div>
          <p class="text-xs text-muted-foreground font-medium">خوانده‌نشده (اقدام فوری)</p>
          <p class="mt-1 text-2xl font-bold text-amber-500">{{ unreadCount }}</p>
        </div>
        <div class="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <Clock class="size-5" />
        </div>
      </div>

      <div
        class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-emerald-500/40"
        @click="filterType = 'read'">
        <div>
          <p class="text-xs text-muted-foreground font-medium">بررسی شده</p>
          <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ readCount }}</p>
        </div>
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="size-5" />
        </div>
      </div>
    </div>

    <!-- نوار جستجو و فیلتر -->
    <div
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="relative w-full sm:max-w-md">
        <Input v-model="searchQuery" type="text" :placeholder="adminDashboardData.messagesSection.searchPlaceholder"
          class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
        <Search class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <Button size="sm" :variant="filterType === 'all' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'all'">
          همه
        </Button>
        <Button size="sm" :variant="filterType === 'unread' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'unread'">
          خوانده‌نشده ({{ unreadCount }})
        </Button>
        <Button size="sm" :variant="filterType === 'read' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'read'">
          خوانده‌شده
        </Button>
      </div>
    </div>

    <!-- کانتینر لیست پیام‌ها -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <div v-if="isLoading" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-24 animate-pulse rounded-2xl border border-border/60 bg-muted/30 p-4" />
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

      <div v-else class="space-y-3">
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

            <div class="flex items-center gap-2 text-[11px] text-muted-foreground/80 pt-0.5">
              <Clock class="size-3" />
              <span>{{ formatDate(msg.created_at) }}</span>
            </div>
          </div>

          <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            <Button size="sm" variant="outline" class="rounded-xl text-xs h-8.5 px-3 gap-1" as-child>
              <NuxtLink :to="`/admin/messages/${msg.id}`">
                <Eye class="size-3.5" />
                <span>مشاهده و پاسخ</span>
              </NuxtLink>
            </Button>

            <Button size="icon" variant="ghost" class="size-8.5 rounded-xl"
              :title="msg.is_read ? 'علامت به عنوان خوانده‌نشده' : 'علامت به عنوان خوانده شده'"
              @click="toggleReadStatus(msg, !msg.is_read)">
              <CheckCircle2 :class="['size-4', msg.is_read ? 'text-primary' : 'text-muted-foreground/50']" />
            </Button>

            <Button size="icon" variant="ghost" class="size-8.5 rounded-xl text-destructive hover:bg-destructive/10"
              @click="confirmDelete(msg)">
              <Trash2 class="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- مودال تایید حذف -->
    <Dialog v-model:open="isDeleteDialogOpen">
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
          <Button variant="outline" size="sm" class="rounded-pill text-xs px-4" @click="isDeleteDialogOpen = false">
            {{ adminDashboardData.deleteConfirmModal.cancelButton }}
          </Button>

          <Button variant="destructive" size="sm" :disabled="isDeleting" class="rounded-pill text-xs px-4"
            @click="handleDelete">
            <Loader2 v-if="isDeleting" class="size-3.5 animate-spin" />
            <template v-else>
              {{ adminDashboardData.deleteConfirmModal.confirmMessageDelete }}
            </template>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
