<script setup lang="ts">
import { MessageSquare, BookOpen, Clock, TrendingUp, Sparkles, ArrowRight } from '@lucide/vue'

defineProps<{
  unreadMessagesCount: number
  totalMessagesCount: number
  totalArticlesCount: number
  publishedArticlesCount: number
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" dir="rtl">
    <!-- کارت وضعیت پیام‌ها -->
    <NuxtLink to="/admin/messages"
      class="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-card text-right">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-muted-foreground">پیام‌های نیازمند بررسی</span>
        <div
          class="flex size-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <MessageSquare class="size-5" />
        </div>
      </div>
      <div class="mt-4 flex items-baseline gap-2">
        <span class="text-3xl font-black text-foreground">{{ unreadMessagesCount }}</span>
        <span class="text-xs text-muted-foreground">پیام جدید</span>
      </div>
      <div class="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span class="flex items-center gap-1.5">
          <Clock class="size-3.5" />
          <span>از مجموع {{ totalMessagesCount }} پیام دریافتی</span>
        </span>
        <ArrowRight class="size-3.5 text-primary rotate-180 opacity-0 transition-all group-hover:opacity-100" />
      </div>
    </NuxtLink>

    <!-- کارت وضعیت مقالات -->
    <NuxtLink to="/admin/articles"
      class="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-card text-right">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-muted-foreground">پایگاه دانش و مقالات</span>
        <div class="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen class="size-5" />
        </div>
      </div>
      <div class="mt-4 flex items-baseline gap-2">
        <span class="text-3xl font-black text-foreground">{{ totalArticlesCount }}</span>
        <span class="text-xs text-muted-foreground">مطلب نگارش شده</span>
      </div>
      <div
        class="mt-3 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
        <span class="flex items-center gap-1.5">
          <TrendingUp class="size-3.5" />
          <span>{{ publishedArticlesCount }} مقاله منتشر شده در سایت</span>
        </span>
        <ArrowRight class="size-3.5 text-primary rotate-180 opacity-0 transition-all group-hover:opacity-100" />
      </div>
    </NuxtLink>

    <!-- وضعیت ران‌تایم سامانه -->
    <div
      class="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-xs sm:col-span-2 lg:col-span-1 text-right">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-muted-foreground">وضعیت ران‌تایم سامانه</span>
        <div
          class="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Sparkles class="size-5" />
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <span class="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span class="text-base font-bold text-foreground">آماده دریافت و توسعه</span>
      </div>
      <div class="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <span>هسته فرانت‌اند Nuxt 4 با موتور Bun</span>
      </div>
    </div>
  </div>
</template>
