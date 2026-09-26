<script setup lang="ts">
import { MessageSquare, Clock, Phone, User } from '@lucide/vue'

defineProps<{
  senderName: string
  phone: string
  subject?: string | null
  message: string
  createdAt: string
}>()

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
  <div class="rounded-3xl border border-border/80 bg-card p-6 shadow-xs space-y-6 text-right" dir="rtl">
    <div class="flex items-center justify-between border-b border-border/60 pb-4">
      <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
        <MessageSquare class="size-4 text-primary" />
        <span>متن کامل درخواست مراجع</span>
      </h3>
      <span class="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock class="size-3.5" />
        <span>{{ formatDate(createdAt) }}</span>
      </span>
    </div>

    <!-- بدنه اصلی متن پیام -->
    <div
      class="rounded-2xl border border-border/80 bg-secondary/20 p-5 text-sm leading-8 text-foreground whitespace-pre-line shadow-2xs">
      {{ message }}
    </div>

    <!-- دکمه اقدام سریع تماس تلفنی -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 bg-muted/20 -mx-6 -mb-6 p-4 rounded-b-3xl">
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <User class="size-4" />
        <span>فرستنده: <strong class="text-foreground">{{ senderName }}</strong></span>
      </div>

      <a :href="`tel:${phone}`"
        class="inline-flex items-center gap-2 rounded-pill bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-colors"
        dir="ltr">
        <Phone class="size-3.5" />
        <span>تماس با مراجع ({{ phone }})</span>
      </a>
    </div>
  </div>
</template>
