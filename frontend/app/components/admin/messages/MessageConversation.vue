<script setup lang="ts">
import { MessageSquare, Shield, Send, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export interface ReplyItem {
  id: number
  text: string
  sender: string
  created_at: string
}

defineProps<{
  senderName: string
  initialMessage: string
  createdAt: string
  replies: ReplyItem[]
  isSending?: boolean
}>()

const emit = defineEmits<{
  (e: 'send', text: string): void
}>()

const replyText = ref('')

const handleSend = () => {
  if (!replyText.value.trim()) return
  emit('send', replyText.value)
  replyText.value = ''
}

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
  <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-6 text-right" dir="rtl">
    <h3 class="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
      <MessageSquare class="size-4 text-primary" />
      <span>روند گفتگو و تاریخچه پیام‌ها</span>
    </h3>

    <!-- پیام مراجع -->
    <div class="flex gap-3 items-start">
      <div
        class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary font-bold text-xs mt-1">
        {{ senderName.charAt(0) }}
      </div>
      <div class="flex-1 space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-foreground">{{ senderName }} (مراجع)</span>
          <span class="text-[11px] text-muted-foreground">{{ formatDate(createdAt) }}</span>
        </div>
        <div
          class="rounded-2xl border border-border/80 bg-secondary/30 p-4 text-xs leading-relaxed text-foreground whitespace-pre-line shadow-2xs">
          {{ initialMessage }}
        </div>
      </div>
    </div>

    <!-- پاسخ‌های ادمین -->
    <div v-for="reply in replies" :key="reply.id" class="flex gap-3 items-start flex-row-reverse">
      <div
        class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xs mt-1">
        <Shield class="size-4" />
      </div>
      <div class="flex-1 space-y-1.5 text-left">
        <div class="flex items-center justify-between flex-row-reverse">
          <span class="text-xs font-bold text-primary">{{ reply.sender }}</span>
          <span class="text-[11px] text-muted-foreground">{{ formatDate(reply.created_at) }}</span>
        </div>
        <div
          class="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground whitespace-pre-line text-right">
          {{ reply.text }}
        </div>
      </div>
    </div>

    <!-- فرم پاسخ -->
    <div class="border-t border-border/60 pt-5 space-y-3">
      <label for="reply-box" class="block text-xs font-semibold text-foreground">
        ارسال پاسخ یا ثبت یادداشت داخلی برای مراجع:
      </label>
      <Textarea id="reply-box" v-model="replyText" rows="4" placeholder="پاسخ خود را بنویسید..."
        class="rounded-2xl text-xs leading-relaxed text-right" />

      <div class="flex justify-end">
        <Button :disabled="isSending || !replyText.trim()"
          class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5 gap-1.5"
          @click="handleSend">
          <Loader2 v-if="isSending" class="size-3.5 animate-spin" />
          <template v-else>
            <span>ارسال پاسخ</span>
            <Send class="size-3.5 rotate-180" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>
