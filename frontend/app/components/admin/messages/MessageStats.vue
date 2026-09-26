<script setup lang="ts">
import { Mail, Clock, CheckCircle2 } from '@lucide/vue'
import { adminDashboardData } from '~/data'

defineProps<{
  totalCount: number
  unreadCount: number
  readCount: number
  currentFilter: 'all' | 'unread' | 'read'
}>()

const emit = defineEmits<{
  (e: 'update:currentFilter', val: 'all' | 'unread' | 'read'): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 text-right" dir="rtl">
    <div
      class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-primary/40"
      :class="{ 'border-primary shadow-xs': currentFilter === 'all' }" @click="emit('update:currentFilter', 'all')">
      <div>
        <p class="text-xs text-muted-foreground font-medium">
          {{ adminDashboardData.messagesPage.stats.total }}
        </p>
        <p class="mt-1 text-2xl font-bold text-foreground">{{ totalCount }}</p>
      </div>
      <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Mail class="size-5" />
      </div>
    </div>

    <div
      class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-amber-500/40"
      :class="{ 'border-amber-500/50 shadow-xs': currentFilter === 'unread' }"
      @click="emit('update:currentFilter', 'unread')">
      <div>
        <p class="text-xs text-muted-foreground font-medium">
          {{ adminDashboardData.messagesPage.stats.unread }}
        </p>
        <p class="mt-1 text-2xl font-bold text-amber-500">{{ unreadCount }}</p>
      </div>
      <div class="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
        <Clock class="size-5" />
      </div>
    </div>

    <div
      class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-emerald-500/40"
      :class="{ 'border-emerald-500/50 shadow-xs': currentFilter === 'read' }"
      @click="emit('update:currentFilter', 'read')">
      <div>
        <p class="text-xs text-muted-foreground font-medium">
          {{ adminDashboardData.messagesPage.stats.read }}
        </p>
        <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ readCount }}</p>
      </div>
      <div
        class="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 class="size-5" />
      </div>
    </div>
  </div>
</template>
