<script setup lang="ts">
import { onMounted } from 'vue'
import { Search } from '@lucide/vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { adminDashboardData } from '~/data/admin'
import { useMessagesStore } from '~/stores/messages'
import MessageCard from '~/components/admin/messages/MessageCard.vue'
import MessageStats from '~/components/admin/messages/MessageStats.vue'

definePageMeta({
  layout: 'admin',
})

const messagesStore = useMessagesStore()
const pageData = adminDashboardData.messagesPage

onMounted(async () => {
  await messagesStore.fetchMessages()
})
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-foreground">
          {{ pageData.pageTitle }}
        </h1>
        <p class="text-xs text-muted-foreground mt-1">
          {{ pageData.headTitle }}
        </p>
      </div>

      <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl gap-2 w-fit" :disabled="messagesStore.isLoading"
        @click="messagesStore.fetchMessages()">
        <span>{{ pageData.refreshButton }}</span>
      </Button>
    </div>

    <!-- آمار پیام‌ها از استور پینیا -->
    <MessageStats :total-count="messagesStore.stats.total" :unread-count="messagesStore.stats.unread"
      :read-count="messagesStore.stats.read" :current-filter="messagesStore.filter"
      @update:current-filter="(val) => { messagesStore.filter = val; messagesStore.fetchMessages(); }" />

    <!-- فیلتر و جست‌وجوی متصل به دیتای متمرکز -->
    <div
      class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-3 rounded-2xl border border-border/60">
      <div class="relative w-full sm:w-72">
        <Input v-model="messagesStore.searchQuery" :placeholder="pageData.searchPlaceholder"
          class="h-9 text-xs rounded-xl pe-8 text-right" />
        <Search class="size-4 absolute end-2.5 top-2.5 text-muted-foreground pointer-events-none" />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
          :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': messagesStore.filter === 'all' }"
          @click="messagesStore.filter = 'all'; messagesStore.fetchMessages()">
          {{ pageData.filters.all }}
        </Button>
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
          :class="{ 'bg-primary text-primary-foreground hover:bg-primary/90': messagesStore.filter === 'unread' }"
          @click="messagesStore.filter = 'unread'; messagesStore.fetchMessages()">
          {{ pageData.filters.unread }}
        </Button>
      </div>
    </div>

    <!-- وضعیت لودینگ -->
    <div v-if="messagesStore.isLoading" class="text-center py-12 text-xs text-muted-foreground">
      در حال دریافت پیام‌ها از سرور...
    </div>

    <!-- وضعیت بدون پیام -->
    <div v-else-if="messagesStore.filteredMessages.length === 0"
      class="text-center py-12 border border-dashed rounded-2xl bg-card">
      <p class="text-xs text-muted-foreground">
        {{ pageData.emptyTitle }}
      </p>
    </div>

    <!-- لیست کارت‌های پیام -->
    <div v-else class="grid gap-4">
      <MessageCard v-for="msg in messagesStore.filteredMessages" :key="msg.id" :message="msg"
        @toggle-read="messagesStore.toggleReadStatus(msg.id)" @delete="messagesStore.deleteMessage(msg.id)" />
    </div>
  </div>
</template>
