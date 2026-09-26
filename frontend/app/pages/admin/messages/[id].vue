<script setup lang="ts">
import {
  ArrowRight,
  Phone,
  Mail,
  Send,
  Trash2,
  MessageSquare,
  Loader2,
  Shield,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()

interface ContactMessage {
  id: number
  full_name: string
  phone: string
  email?: string
  subject?: string | null
  message: string
  is_read: boolean
  created_at: string
}

const messageId = computed(() => Number(route.params.id))
const isLoading = ref(true)

// داده‌های ماک
const mockMessages: ContactMessage[] = [
  {
    id: 1,
    full_name: 'سارا احمدی',
    phone: '09123456789',
    email: 'sara@example.com',
    subject: 'درخواست مشاوره فردی',
    message: 'سلام، می‌خواستم برای روزهای پنجشنبه وقت رزرو کنم. امکانش هست راهنمایی بفرمایید؟',
    is_read: true,
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
]

const message = ref<ContactMessage | null>(null)
const replyText = ref('')
const isSendingReply = ref(false)

const messageReplies = ref<Array<{ id: number; text: string; sender: string; created_at: string }>>([
  {
    id: 101,
    text: 'درود، درخواست شما دریافت گردید. همکاران پذیرش تا ساعاتی دیگر جهت هماهنگی با شما تماس خواهند گرفت.',
    sender: 'پشتیبانی کلینیک کاژه',
    created_at: new Date().toISOString(),
  },
])

onMounted(() => {
  setTimeout(() => {
    const found = mockMessages.find((m) => m.id === messageId.value)
    if (found) {
      message.value = found
    } else {
      // فال‌بک پیش‌فرض در صورت نبود آیدی
      message.value = {
        id: messageId.value || 1,
        full_name: 'مراجع کاژه',
        phone: '09120000000',
        subject: 'درخواست مشاوره',
        message: 'متن پیام ثبت‌شده مراجع در سامانه.',
        is_read: true,
        created_at: new Date().toISOString(),
      }
    }
    isLoading.value = false
  }, 300)
})

const handleSendReply = async () => {
  if (!replyText.value.trim()) {
    toast.error('لطفاً متن پاسخ را بنویسید.')
    return
  }

  isSendingReply.value = true
  setTimeout(() => {
    messageReplies.value.push({
      id: Date.now(),
      text: replyText.value.trim(),
      sender: 'مدیریت کلینیک کاژه',
      created_at: new Date().toISOString(),
    })
    replyText.value = ''
    isSendingReply.value = false
    toast.success('پاسخ شما با موفقیت ثبت و ارسال شد.')
  }, 400)
}

const handleDelete = () => {
  if (!confirm('آیا از حذف این پیام اطمینان دارید؟')) return
  toast.success('پیام با موفقیت حذف شد.')
  router.push('/admin/messages')
}

const formatDate = (isoString?: string) => {
  if (!isoString) return ''
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
    <!-- هدر بالای صفحه -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
      <div class="flex items-center gap-3">
        <Button variant="outline" size="sm" class="rounded-xl gap-1.5 h-9" as-child>
          <NuxtLink to="/admin/messages">
            <ArrowRight class="size-4" />
            <span>بازگشت به صندوق پیام‌ها</span>
          </NuxtLink>
        </Button>

        <span class="text-xs text-muted-foreground hidden sm:inline">/</span>
        <span class="text-xs font-semibold text-foreground hidden sm:inline">
          گفتگو با {{ message?.full_name || 'مراجع' }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="destructive" size="sm" class="rounded-pill text-xs gap-1.5 h-9" :disabled="isLoading"
          @click="handleDelete">
          <Trash2 class="size-3.5" />
          <span>حذف گفتگو</span>
        </Button>
      </div>
    </div>

    <!-- اسکلتون لودینگ -->
    <div v-if="isLoading" class="space-y-4">
      <div class="h-28 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
      <div class="h-64 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
    </div>

    <div v-else-if="message" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- ستون اطلاعات مراجع -->
      <div class="space-y-4 lg:col-span-1 text-right">
        <div class="rounded-3xl border border-border/80 bg-card p-5 shadow-xs space-y-4">
          <div class="flex items-center gap-3.5 border-b border-border/60 pb-4">
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-base">
              {{ message.full_name.charAt(0) }}
            </div>
            <div class="min-w-0">
              <h2 class="text-sm font-bold text-foreground truncate">{{ message.full_name }}</h2>
              <Badge
                class="mt-1 rounded-pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                بررسی شده
              </Badge>
            </div>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <span class="text-muted-foreground block mb-1">شماره تماس:</span>
              <a :href="`tel:${message.phone}`" class="flex items-center gap-2 font-bold text-primary underline"
                dir="ltr">
                <Phone class="size-3.5" />
                <span>{{ message.phone }}</span>
              </a>
            </div>

            <div v-if="message.email">
              <span class="text-muted-foreground block mb-1">پست الکترونیکی:</span>
              <a :href="`mailto:${message.email}`"
                class="flex items-center gap-2 text-foreground hover:text-primary transition-colors" dir="ltr">
                <Mail class="size-3.5" />
                <span>{{ message.email }}</span>
              </a>
            </div>

            <div v-if="message.subject">
              <span class="text-muted-foreground block mb-1">موضوع مطرح‌شده:</span>
              <span class="font-medium text-foreground">{{ message.subject }}</span>
            </div>

            <div>
              <span class="text-muted-foreground block mb-1">زمان ارسال پیام:</span>
              <span class="text-muted-foreground">{{ formatDate(message.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ستون متن پیام و پاسخ -->
      <div class="space-y-6 lg:col-span-2 text-right">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-6">
          <h3 class="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
            <MessageSquare class="size-4 text-primary" />
            <span>روند گفتگو و تاریخچه پیام‌ها</span>
          </h3>

          <!-- پیام اصلی -->
          <div class="flex gap-3 items-start">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary font-bold text-xs mt-1">
              {{ message.full_name.charAt(0) }}
            </div>
            <div class="flex-1 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-foreground">{{ message.full_name }} (مراجع)</span>
                <span class="text-[11px] text-muted-foreground">{{ formatDate(message.created_at) }}</span>
              </div>
              <div
                class="rounded-2xl border border-border/80 bg-secondary/30 p-4 text-xs leading-relaxed text-foreground whitespace-pre-line shadow-2xs text-right">
                {{ message.message }}
              </div>
            </div>
          </div>

          <!-- پاسخ‌های ادمین -->
          <div v-for="reply in messageReplies" :key="reply.id" class="flex gap-3 items-start flex-row-reverse">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xs mt-1">
              <Shield class="size-4" />
            </div>
            <div class="flex-1 space-y-1.5 text-left">
              <div class="flex items-center justify-between flex-row-reverse">
                <span class="text-xs font-bold text-primary">{{ reply.sender }}</span>
                <span class="text-[11px] text-muted-foreground">{{ formatDate(reply.created_at) }}</span>
              </div>
              <div
                class="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground whitespace-pre-line text-right">
                {{ reply.text }}
              </div>
            </div>
          </div>

          <!-- فرم ارسال پاسخ جدید -->
          <div class="border-t border-border/60 pt-5 space-y-3">
            <label for="reply-box" class="block text-xs font-semibold text-foreground">
              ارسال پاسخ یا ثبت یادداشت داخلی برای مراجع:
            </label>
            <Textarea id="reply-box" v-model="replyText" rows="4" placeholder="پاسخ خود را بنویسید..."
              class="rounded-2xl text-xs leading-relaxed text-right" />

            <div class="flex justify-end">
              <Button :disabled="isSendingReply"
                class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5 gap-1.5"
                @click="handleSendReply">
                <Loader2 v-if="isSendingReply" class="size-3.5 animate-spin" />
                <template v-else>
                  <span>ارسال پاسخ</span>
                  <Send class="size-3.5 rotate-180" />
                </template>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
