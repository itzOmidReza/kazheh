<script setup lang="ts">
import { Phone, Mail } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'

export interface MessageDetail {
  id: number
  full_name: string
  phone: string
  email?: string
  subject?: string | null
  message: string
  is_read: boolean
  created_at: string
}

defineProps<{
  message: MessageDetail
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
  <div class="rounded-3xl border border-border/80 bg-card p-5 shadow-xs space-y-4 text-right" dir="rtl">
    <div class="flex items-center gap-3.5 border-b border-border/60 pb-4">
      <div
        class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-base">
        {{ message.full_name.charAt(0) }}
      </div>
      <div class="min-w-0">
        <h2 class="text-sm font-bold text-foreground truncate">{{ message.full_name }}</h2>
        <Badge
          class="mt-1 rounded-pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
          بررسی شده
        </Badge>
      </div>
    </div>

    <div class="space-y-3 text-xs">
      <div>
        <span class="text-muted-foreground block mb-1">شماره تماس:</span>
        <a :href="`tel:${message.phone}`" class="flex items-center gap-2 font-bold text-primary underline" dir="ltr">
          <Phone class="size-3.5" />
          <span>{{ message.phone }}</span>
        </a>
      </div>

      <div v-if="message.email">
        <span class="text-muted-foreground block mb-1">پست الکترونیکی:</span>
        <a :href="`mailto:${message.email}`"
          class="flex items-center gap-2 text-foreground hover:text-primary transition-colors" dir="ltr">
          <Mail class="size-3.5" />
          <span>{{ message.email }}</span>
        </a>
      </div>

      <div v-if="message.subject">
        <span class="text-muted-foreground block mb-1">موضوع مطرح‌شده:</span>
        <span class="font-medium text-foreground">{{ message.subject }}</span>
      </div>

      <div>
        <span class="text-muted-foreground block mb-1">زمان ارسال پیام:</span>
        <span class="text-muted-foreground">{{ formatDate(message.created_at) }}</span>
      </div>
    </div>
  </div>
</template>
