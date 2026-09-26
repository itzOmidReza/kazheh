<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowRight,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  FileQuestion,
  Calendar,
  PhoneCall,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'vue-sonner'
import { adminDashboardData } from '~/data/admin'
import { useMessagesStore } from '~/stores/messages'
import type { MessageItem } from '~/components/admin/messages/MessageCard.vue'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const messagesStore = useMessagesStore()
const pageData = adminDashboardData.messagesPage.detail

const messageId = Number(route.params.id)
const currentMessage = ref<MessageItem | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  if (Number.isNaN(messageId)) {
    router.push('/admin/messages')
    return
  }

  isLoading.value = true
  const msg = await messagesStore.getMessageById(messageId)
  if (!msg) {
    toast.error('پیام مورد نظر یافت نشد.')
    router.push('/admin/messages')
    return
  }

  currentMessage.value = msg

  if (!msg.is_read) {
    await messagesStore.toggleReadStatus(msg.id)
    currentMessage.value.is_read = true
  }

  isLoading.value = false
})

const handleToggleRead = async () => {
  if (!currentMessage.value) return
  await messagesStore.toggleReadStatus(currentMessage.value.id)
  currentMessage.value.is_read = !currentMessage.value.is_read
}

const handleDelete = async () => {
  if (!currentMessage.value) return
  if (confirm(pageData.deleteConfirm)) {
    const success = await messagesStore.deleteMessage(currentMessage.value.id)
    if (success) {
      router.push('/admin/messages')
    }
  }
}
</script>

<template>
  <div class="space-y-6 max-w-4xl mx-auto" dir="rtl">
    <!-- نوار دکمه‌های بالا -->
    <div class="flex items-center justify-between gap-4">
      <Button variant="ghost" size="sm" class="text-xs h-9 rounded-xl gap-2 text-muted-foreground hover:text-foreground"
        @click="router.push('/admin/messages')">
        <ArrowRight class="size-4" />
        <span>{{ pageData.backButton }}</span>
      </Button>

      <div v-if="currentMessage" class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl gap-2" @click="handleToggleRead">
          <component :is="currentMessage.is_read ? Clock : CheckCircle2" class="size-4" />
          <span v-if="currentMessage.is_read">{{ pageData.markAsUnread }}</span>
          <span v-else>{{ pageData.markAsRead }}</span>
        </Button>

        <Button variant="destructive" size="sm" class="text-xs h-9 rounded-xl gap-2" @click="handleDelete">
          <Trash2 class="size-4" />
          <span>{{ pageData.deleteButton }}</span>
        </Button>
      </div>
    </div>

    <!-- وضعیت بارگذاری -->
    <div v-if="isLoading" class="text-center py-16 text-xs text-muted-foreground">
      در حال دریافت جزئیات پیام...
    </div>

    <!-- کارت اطلاعات مراجع -->
    <div v-else-if="currentMessage" class="space-y-6">
      <div class="bg-card rounded-2xl border border-border/60 p-6 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div class="flex items-center gap-3">
            <div
              class="size-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              <User class="size-5" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-bold text-foreground">
                  {{ currentMessage.full_name }}
                </h2>
                <Badge :variant="currentMessage.is_read ? 'secondary' : 'default'"
                  class="text-[10px] px-2 py-0.5 rounded-lg">
                  {{ currentMessage.is_read ? pageData.contactInfo.badgeReviewed : 'جدید' }}
                </Badge>
              </div>
              <p class="text-xs text-muted-foreground mt-0.5">
                {{ pageData.senderPrefix }} وب‌سایت کلینیک
              </p>
            </div>
          </div>

          <a :href="`tel:${currentMessage.phone}`"
            class="inline-flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs px-4 py-2 rounded-xl transition-colors font-medium">
            <PhoneCall class="size-3.5" />
            <span>{{ pageData.conversation.callButtonPrefix }} ({{ currentMessage.phone }})</span>
          </a>
        </div>

        <!-- فیلدهای مشخصات -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40">
            <Phone class="size-4 text-muted-foreground shrink-0" />
            <span class="text-muted-foreground">{{ pageData.contactInfo.phoneLabel }}</span>
            <span class="font-medium text-foreground dir-ltr ms-auto">{{ currentMessage.phone }}</span>
          </div>

          <div class="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40">
            <Mail class="size-4 text-muted-foreground shrink-0" />
            <span class="text-muted-foreground">{{ pageData.contactInfo.emailLabel }}</span>
            <span class="font-medium text-foreground dir-ltr ms-auto truncate">
              {{ currentMessage.email || 'ثبت نشده' }}
            </span>
          </div>

          <div class="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40">
            <FileQuestion class="size-4 text-muted-foreground shrink-0" />
            <span class="text-muted-foreground">{{ pageData.contactInfo.subjectLabel }}</span>
            <span class="font-medium text-foreground ms-auto">
              {{ currentMessage.subject || 'عمومی' }}
            </span>
          </div>

          <div class="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40">
            <Calendar class="size-4 text-muted-foreground shrink-0" />
            <span class="text-muted-foreground">{{ pageData.contactInfo.dateLabel }}</span>
            <span class="font-medium text-foreground ms-auto">
              {{ currentMessage.created_at ? new Date(currentMessage.created_at).toLocaleDateString('fa-IR') : '—' }}
            </span>
          </div>
        </div>
      </div>

      <!-- متن کامل پیام -->
      <div class="bg-card rounded-2xl border border-border/60 p-6 space-y-3">
        <h3 class="text-sm font-semibold text-foreground">
          {{ pageData.conversation.title }}
        </h3>
        <div
          class="p-4 rounded-xl bg-muted/30 border border-border/40 text-xs text-foreground leading-relaxed whitespace-pre-wrap">
          {{ currentMessage.message }}
        </div>
      </div>
    </div>
  </div>
</template>
