<script setup lang="ts">
import { BookOpen, CheckCircle, FileEdit } from '@lucide/vue'

defineProps<{
  totalCount: number
  publishedCount: number
  draftCount: number
  currentFilter: 'all' | 'published' | 'draft'
}>()

const emit = defineEmits<{
  (e: 'update:currentFilter', val: 'all' | 'published' | 'draft'): void
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 text-right">
    <div
      class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-primary/40"
      :class="{ 'border-primary shadow-xs': currentFilter === 'all' }" @click="emit('update:currentFilter', 'all')">
      <div>
        <p class="text-xs text-muted-foreground font-medium">کل مقالات ثبت‌شده</p>
        <p class="mt-1 text-2xl font-bold text-foreground">{{ totalCount }}</p>
      </div>
      <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <BookOpen class="size-5" />
      </div>
    </div>

    <div
      class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-emerald-500/40"
      :class="{ 'border-emerald-500/50 shadow-xs': currentFilter === 'published' }"
      @click="emit('update:currentFilter', 'published')">
      <div>
        <p class="text-xs text-muted-foreground font-medium">منتشر شده در وب‌سایت</p>
        <p class="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ publishedCount }}</p>
      </div>
      <div
        class="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckCircle class="size-5" />
      </div>
    </div>

    <div
      class="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-4 transition-colors cursor-pointer hover:border-secondary-foreground/20"
      :class="{ 'border-muted-foreground/40 shadow-xs': currentFilter === 'draft' }"
      @click="emit('update:currentFilter', 'draft')">
      <div>
        <p class="text-xs text-muted-foreground font-medium">پیش‌نویس‌ها</p>
        <p class="mt-1 text-2xl font-bold text-muted-foreground">{{ draftCount }}</p>
      </div>
      <div class="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <FileEdit class="size-5" />
      </div>
    </div>
  </div>
</template>
