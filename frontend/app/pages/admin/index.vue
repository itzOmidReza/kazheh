<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Mail,
  FileText,
  Activity,
  Plus,
  RefreshCw,
  Search,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { adminDashboardData } from '~/data/admin'
import { useMessagesStore } from '~/stores/messages'
import { useArticlesStore, type ArticleItem } from '~/stores/articles'
import MessageCard from '~/components/admin/messages/MessageCard.vue'
import ArticleCard from '~/components/admin/articles/ArticleCard.vue'

definePageMeta({
  layout: 'admin',
})

const messagesStore = useMessagesStore()
const articlesStore = useArticlesStore()
const activeTab = ref<'messages' | 'articles'>('messages')
const data = adminDashboardData

onMounted(async () => {
  await Promise.all([
    messagesStore.fetchMessages(),
    articlesStore.fetchAdminArticles(),
  ])
})

const handleRefresh = async () => {
  if (activeTab.value === 'messages') {
    await messagesStore.fetchMessages()
  } else {
    await articlesStore.fetchAdminArticles()
  }
}

const handleDeleteArticle = async (article: ArticleItem) => {
  if (confirm(data.deleteConfirmModal.articleDescription)) {
    await articlesStore.deleteArticle(article.id)
  }
}
</script>

<template>
  <div class="space-y-8" dir="rtl">
    <!-- هدر داشبورد -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-foreground">
          {{ data.header.title }}
        </h1>
        <p class="text-xs text-muted-foreground mt-1">
          {{ data.header.subtitle }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl gap-2"
          :disabled="messagesStore.isLoading || articlesStore.isLoading" @click="handleRefresh">
          <RefreshCw class="size-3.5" :class="{ 'animate-spin': messagesStore.isLoading || articlesStore.isLoading }" />
          <span>{{ data.header.refreshButton }}</span>
        </Button>

        <NuxtLink to="/admin/articles/create">
          <Button size="sm" class="text-xs h-9 rounded-xl gap-2">
            <Plus class="size-3.5" />
            <span>{{ data.header.newArticleButton }}</span>
          </Button>
        </NuxtLink>
      </div>
    </div>

    <!-- کارت‌های آمار زنده -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- پیام‌های بررسی‌نشده -->
      <div class="bg-card p-5 rounded-2xl border border-border/60 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted-foreground font-medium">
            {{ data.stats.unreadMessagesLabel }}
          </span>
          <div class="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Mail class="size-4" />
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-bold text-foreground">
            {{ messagesStore.stats.unread }}
          </span>
          <span class="text-xs text-muted-foreground">
            {{ data.stats.newMessagesSuffix }}
          </span>
        </div>
        <p class="text-[11px] text-muted-foreground">
          {{ data.stats.totalMessagesPrefix }} {{ messagesStore.stats.total }} {{ data.stats.totalMessagesSuffix }}
        </p>
      </div>

      <!-- مقالات ثبت‌شده در سیستم -->
      <div class="bg-card p-5 rounded-2xl border border-border/60 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted-foreground font-medium">
            {{ data.stats.articlesLabel }}
          </span>
          <div class="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <FileText class="size-4" />
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-bold text-foreground">
            {{ articlesStore.stats.total }}
          </span>
          <span class="text-xs text-muted-foreground">
            {{ data.stats.articlesSuffix }}
          </span>
        </div>
        <p class="text-[11px] text-muted-foreground">
          {{ articlesStore.stats.published }} {{ data.stats.publishedArticlesSuffix }}
        </p>
      </div>

      <!-- وضعیت سرویس -->
      <div class="bg-card p-5 rounded-2xl border border-border/60 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted-foreground font-medium">
            {{ data.stats.runtimeStatusLabel }}
          </span>
          <div class="size-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Activity class="size-4" />
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-sm font-bold text-emerald-500">
            {{ data.stats.runtimeStatusActive }}
          </span>
        </div>
        <p class="text-[11px] text-muted-foreground">
          {{ data.stats.runtimeFramework }}
        </p>
      </div>
    </div>

    <!-- تب‌های ناوبری محتوا -->
    <div class="space-y-4">
      <div class="flex items-center gap-2 border-b border-border/60 pb-3">
        <Button variant="ghost" size="sm" class="text-xs rounded-xl relative"
          :class="activeTab === 'messages' ? 'text-primary font-bold' : 'text-muted-foreground'"
          @click="activeTab = 'messages'">
          {{ data.tabs.messages.label }}
          <span v-if="messagesStore.stats.unread > 0"
            class="ms-2 px-1.5 py-0.5 text-[10px] rounded-full bg-primary text-primary-foreground font-normal">
            {{ messagesStore.stats.unread }}
          </span>
        </Button>

        <Button variant="ghost" size="sm" class="text-xs rounded-xl"
          :class="activeTab === 'articles' ? 'text-primary font-bold' : 'text-muted-foreground'"
          @click="activeTab = 'articles'">
          {{ data.tabs.articles.label }}
          <span v-if="articlesStore.stats.total > 0"
            class="ms-2 px-1.5 py-0.5 text-[10px] rounded-full bg-muted text-muted-foreground font-normal">
            {{ articlesStore.stats.total }}
          </span>
        </Button>
      </div>

      <!-- بخش کارتابل پیام‌ها -->
      <div v-if="activeTab === 'messages'" class="space-y-4">
        <div
          class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-3 rounded-2xl border border-border/60">
          <div class="relative w-full sm:w-72">
            <Input v-model="messagesStore.searchQuery" :placeholder="data.messagesSection.searchPlaceholder"
              class="h-9 text-xs rounded-xl pe-8 text-right" />
            <Search class="size-4 absolute end-2.5 top-2.5 text-muted-foreground pointer-events-none" />
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
              :class="{ 'bg-primary text-primary-foreground': messagesStore.filter === 'all' }"
              @click="messagesStore.filter = 'all'; messagesStore.fetchMessages()">
              {{ data.messagesSection.filterAll }}
            </Button>
            <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
              :class="{ 'bg-primary text-primary-foreground': messagesStore.filter === 'unread' }"
              @click="messagesStore.filter = 'unread'; messagesStore.fetchMessages()">
              {{ data.messagesSection.filterUnread }}
            </Button>
            <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl flex-1 sm:flex-initial"
              :class="{ 'bg-primary text-primary-foreground': messagesStore.filter === 'read' }"
              @click="messagesStore.filter = 'read'; messagesStore.fetchMessages()">
              {{ data.messagesSection.filterRead }}
            </Button>
          </div>
        </div>

        <div v-if="messagesStore.isLoading" class="text-center py-12 text-xs text-muted-foreground">
          در حال بارگذاری پیام‌ها...
        </div>

        <div v-else-if="messagesStore.filteredMessages.length === 0"
          class="text-center py-12 border border-dashed rounded-2xl bg-card space-y-1">
          <p class="text-sm font-medium text-foreground">
            {{ data.messagesSection.emptyTitle }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ data.messagesSection.emptyDescription }}
          </p>
        </div>

        <div v-else class="grid gap-3">
          <MessageCard v-for="msg in messagesStore.filteredMessages" :key="msg.id" :message="msg"
            @toggle-read="messagesStore.toggleReadStatus(msg.id)" @delete="messagesStore.deleteMessage(msg.id)" />
        </div>
      </div>

      <!-- بخش مقالات در داشبورد -->
      <div v-else-if="activeTab === 'articles'" class="space-y-4">
        <div
          class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-3 rounded-2xl border border-border/60">
          <div class="relative w-full sm:w-72">
            <Input v-model="articlesStore.searchQuery" :placeholder="data.articlesPage.searchPlaceholder"
              class="h-9 text-xs rounded-xl pe-8 text-right" />
            <Search class="size-4 absolute end-2.5 top-2.5 text-muted-foreground pointer-events-none" />
          </div>

          <NuxtLink to="/admin/articles/create">
            <Button size="sm" class="text-xs h-9 rounded-xl gap-2">
              <Plus class="size-3.5" />
              <span>{{ data.articlesPage.createButton }}</span>
            </Button>
          </NuxtLink>
        </div>

        <div v-if="articlesStore.isLoading" class="text-center py-12 text-xs text-muted-foreground">
          در حال بارگذاری مقالات...
        </div>

        <div v-else-if="articlesStore.filteredArticles.length === 0"
          class="text-center py-12 border border-dashed rounded-2xl bg-card space-y-2">
          <p class="text-sm font-medium text-foreground">
            {{ data.articlesSection.emptyTitle }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ data.articlesSection.emptyDescription }}
          </p>
          <NuxtLink to="/admin/articles/create">
            <Button size="sm" class="text-xs h-9 rounded-xl mt-2 gap-2">
              <Plus class="size-3.5" />
              <span>{{ data.articlesSection.newArticleButton }}</span>
            </Button>
          </NuxtLink>
        </div>

        <div v-else class="grid gap-3">
          <ArticleCard v-for="article in articlesStore.filteredArticles" :key="article.id" :article="article"
            @delete="handleDeleteArticle(article)" />
        </div>
      </div>
    </div>
  </div>
</template>
