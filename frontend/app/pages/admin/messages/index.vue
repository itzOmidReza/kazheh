<script setup lang="ts">
import { Search, RefreshCw, Inbox, ChevronRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import {
  siteConfig,
  adminDashboardData,
  initialAdminMessages,
  type AdminMessageItem,
} from '~/data'

definePageMeta({ layout: 'admin' })
useHead({ title: `${adminDashboardData.messagesPage.headTitle} | ${siteConfig.name}` })

const router = useRouter()

const messages = ref<AdminMessageItem[]>([...initialAdminMessages])

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

const toggleReadStatus = (msg: AdminMessageItem) => {
  msg.is_read = !msg.is_read
  toast.success(
    msg.is_read
      ? adminDashboardData.messagesPage.toasts.markedRead
      : adminDashboardData.messagesPage.toasts.markedUnread
  )
}

// دیالوگ حذف
const messageToDelete = ref<AdminMessageItem | null>(null)
const isDeleteDialogOpen = ref(false)

const openDeleteModal = (msg: AdminMessageItem) => {
  messageToDelete.value = msg
  isDeleteDialogOpen.value = true
}

const handleDeleteConfirm = () => {
  if (!messageToDelete.value) return
  messages.value = messages.value.filter((m) => m.id !== messageToDelete.value!.id)
  isDeleteDialogOpen.value = false
  toast.success(adminDashboardData.messagesPage.toasts.deleteSuccess)
  messageToDelete.value = null
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- بالای صفحه -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-right">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <NuxtLink to="/admin" class="hover:text-primary transition-colors">
            {{ adminDashboardData.messagesPage.breadcrumbParent }}
          </NuxtLink>
          <ChevronRight class="size-3.5 rotate-180" />
          <span class="text-foreground font-medium">
            {{ adminDashboardData.messagesPage.breadcrumbCurrent }}
          </span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          {{ adminDashboardData.messagesPage.pageTitle }}
        </h1>
      </div>

      <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5"
        @click="toast.success(adminDashboardData.messagesPage.toasts.refreshed)">
        <RefreshCw class="size-3.5" />
        <span>{{ adminDashboardData.messagesPage.refreshButton }}</span>
      </Button>
    </div>

    <!-- آمارها -->
    <AdminMessagesMessageStats v-model:current-filter="filterType" :total-count="messages.length"
      :unread-count="unreadCount" :read-count="readCount" />

    <!-- فیلتر و جستجو -->
    <div
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="relative w-full sm:max-w-md">
        <Input v-model="searchQuery" type="text" :placeholder="adminDashboardData.messagesPage.searchPlaceholder"
          class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" />
        <Search class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <Button size="sm" :variant="filterType === 'all' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'all'">
          {{ adminDashboardData.messagesPage.filters.all }}
        </Button>
        <Button size="sm" :variant="filterType === 'unread' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'unread'">
          {{ adminDashboardData.messagesPage.filters.unread }} ({{ unreadCount }})
        </Button>
        <Button size="sm" :variant="filterType === 'read' ? 'default' : 'outline'"
          class="rounded-pill text-xs h-8.5 px-3.5" @click="filterType = 'read'">
          {{ adminDashboardData.messagesPage.filters.read }}
        </Button>
      </div>
    </div>

    <!-- لیست پیام‌ها -->
    <div class="rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
      <div v-if="filteredMessages.length === 0"
        class="rounded-2xl border border-dashed border-border/80 bg-muted/10 p-12 text-center">
        <Inbox class="size-6 mx-auto text-muted-foreground" />
        <p class="mt-3 text-xs text-muted-foreground">
          {{ adminDashboardData.messagesPage.emptyTitle }}
        </p>
      </div>

      <div v-else class="space-y-3">
        <AdminMessagesMessageCard v-for="msg in filteredMessages" :key="msg.id" :message="msg"
          @select="(id) => router.push(`/admin/messages/${id}`)" @toggle-read="toggleReadStatus"
          @delete="openDeleteModal" />
      </div>
    </div>

    <!-- مودال تایید حذف عمومی -->
    <AdminSharedDeleteConfirmDialog v-model:open="isDeleteDialogOpen"
      :title="adminDashboardData.deleteConfirmModal.messageTitle"
      :description="adminDashboardData.deleteConfirmModal.messageDescription" @confirm="handleDeleteConfirm" />
  </div>
</template>
