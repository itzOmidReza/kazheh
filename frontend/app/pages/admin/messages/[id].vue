<script setup lang="ts">
import { ArrowRight, Trash2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import type { MessageDetail } from '~/components/admin/messages/MessageContactInfo.vue'
import type { ReplyItem } from '~/components/admin/messages/MessageConversation.vue'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const messageId = computed(() => Number(route.params.id))
const isLoading = ref(true)
const isSendingReply = ref(false)

const message = ref<MessageDetail>({
  id: messageId.value,
  full_name: 'سارا احمدی',
  phone: '09123456789',
  email: 'sara@example.com',
  subject: 'درخواست مشاوره فردی',
  message: 'سلام، می‌خواستم برای روزهای پنجشنبه وقت رزرو کنم. امکانش هست راهنمایی بفرمایید؟',
  is_read: true,
  created_at: new Date().toISOString(),
})

const messageReplies = ref<ReplyItem[]>([
  {
    id: 101,
    text: 'درود، درخواست شما دریافت گردید. همکاران پذیرش تا ساعاتی دیگر جهت هماهنگی با شما تماس خواهند گرفت.',
    sender: 'پشتیبانی کلینیک کاژه',
    created_at: new Date().toISOString(),
  },
])

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 250)
})

const handleSendReply = (text: string) => {
  isSendingReply.value = true
  setTimeout(() => {
    messageReplies.value.push({
      id: Date.now(),
      text,
      sender: 'مدیریت کلینیک کاژه',
      created_at: new Date().toISOString(),
    })
    isSendingReply.value = false
    toast.success('پاسخ شما با موفقیت ثبت و ارسال شد.')
  }, 350)
}

const handleDelete = () => {
  if (!confirm('آیا از حذف این گفتگو اطمینان دارید؟')) return
  toast.success('پیام با موفقیت حذف شد.')
  router.push('/admin/messages')
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- بالای صفحه -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
      <div class="flex items-center gap-3">
        <Button variant="outline" size="sm" class="rounded-xl gap-1.5 h-9" as-child>
          <NuxtLink to="/admin/messages">
            <ArrowRight class="size-4 rotate-180" />
            <span>بازگشت به صندوق پیام‌ها</span>
          </NuxtLink>
        </Button>
        <span class="text-xs text-muted-foreground hidden sm:inline">/</span>
        <span class="text-xs font-semibold text-foreground hidden sm:inline">
          گفتگو با {{ message.full_name }}
        </span>
      </div>

      <Button variant="destructive" size="sm" class="rounded-pill text-xs gap-1.5 h-9" @click="handleDelete">
        <Trash2 class="size-3.5" />
        <span>حذف گفتگو</span>
      </Button>
    </div>

    <!-- بدنه صفحه تفکیک‌شده -->
    <div v-if="isLoading" class="space-y-4">
      <div class="h-28 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
      <div class="h-64 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="space-y-4 lg:col-span-1">
        <AdminMessagesMessageContactInfo :message="message" />
      </div>

      <div class="space-y-6 lg:col-span-2">
        <AdminMessagesMessageConversation :sender-name="message.full_name" :initial-message="message.message"
          :created-at="message.created_at" :replies="messageReplies" :is-sending="isSendingReply"
          @send="handleSendReply" />
      </div>
    </div>
  </div>
</template>
