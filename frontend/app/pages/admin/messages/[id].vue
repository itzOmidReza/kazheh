<script setup lang="ts">
import { ArrowRight, Trash2, CheckCircle2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import {
  adminDashboardData,
  mockMessageDetail,
  type AdminMessageItem,
} from '~/data'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const messageId = computed(() => Number(route.params.id))
const isLoading = ref(true)

// بارگذاری جزئیات ماک پیام از لایه متمرکز داده
const message = ref<AdminMessageItem>({
  ...mockMessageDetail,
  id: messageId.value || mockMessageDetail.id,
})

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})

const toggleRead = () => {
  message.value.is_read = !message.value.is_read
  toast.success(
    message.value.is_read
      ? adminDashboardData.messagesPage.detail.markedReadToast
      : adminDashboardData.messagesPage.detail.markedUnreadToast
  )
}

const handleDelete = () => {
  if (!confirm(adminDashboardData.messagesPage.detail.deleteConfirm)) return
  toast.success(adminDashboardData.messagesPage.detail.deleteSuccessToast)
  router.push('/admin/messages')
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- بالای صفحه -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
      <div class="flex items-center gap-3">
        <Button variant="outline" size="sm" class="rounded-xl gap-1.5 h-9 text-xs" as-child>
          <NuxtLink to="/admin/messages">
            <ArrowRight class="size-4 rotate-180" />
            <span>{{ adminDashboardData.messagesPage.detail.backButton }}</span>
          </NuxtLink>
        </Button>
        <span class="text-xs text-muted-foreground hidden sm:inline">/</span>
        <span class="text-xs font-semibold text-foreground hidden sm:inline">
          {{ adminDashboardData.messagesPage.detail.senderPrefix }} {{ message.full_name }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="rounded-pill text-xs gap-1.5 h-9" @click="toggleRead">
          <CheckCircle2 :class="['size-3.5', message.is_read ? 'text-primary' : 'text-muted-foreground']" />
          <span>
            {{
              message.is_read
                ? adminDashboardData.messagesPage.detail.markAsUnread
                : adminDashboardData.messagesPage.detail.markAsRead
            }}
          </span>
        </Button>

        <Button variant="destructive" size="sm" class="rounded-pill text-xs gap-1.5 h-9" @click="handleDelete">
          <Trash2 class="size-3.5" />
          <span>{{ adminDashboardData.messagesPage.detail.deleteButton }}</span>
        </Button>
      </div>
    </div>

    <!-- محتوای پیام -->
    <div v-if="isLoading" class="space-y-4">
      <div class="h-28 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
      <div class="h-48 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- ستون مشخصات مراجع و اطلاعات تماس -->
      <div class="lg:col-span-1">
        <AdminMessagesMessageContactInfo :message="message" />
      </div>

      <!-- ستون متن پیام و تماس مستقیم -->
      <div class="lg:col-span-2">
        <AdminMessagesMessageConversation :sender-name="message.full_name" :phone="message.phone"
          :subject="message.subject" :message="message.message" :created-at="message.created_at" />
      </div>
    </div>
  </div>
</template>
