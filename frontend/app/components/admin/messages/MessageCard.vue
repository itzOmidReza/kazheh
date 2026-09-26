<script setup lang="ts">
import { Clock, Eye, CheckCircle2, Trash2 } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface MessageItem {
  id: number
  full_name: string
  phone: string
  subject?: string | null
  message: string
  is_read: boolean
  created_at: string
}

defineProps<{
  message: MessageItem
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void
  (e: 'toggle-read', msg: MessageItem): void
  (e: 'delete', msg: MessageItem): void
}>()

const formatDate = (isoString: string) => {
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
  <div :class="[
    'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-4.5 transition-all duration-200 hover:shadow-xs text-right',
    message.is_read
      ? 'border-border/60 bg-card/60 text-muted-foreground'
      : 'border-primary/30 bg-primary/5 text-foreground shadow-xs',
  ]">
    <div class="flex-1 space-y-1.5 cursor-pointer min-w-0" @click="emit('select', message.id)">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm font-bold text-foreground">
          {{ message.full_name }}
        </span>

        <Badge v-if="!message.is_read" class="bg-amber-500 text-white text-[10px] rounded-pill px-2 py-0.5">
          جدید
        </Badge>

        <Badge v-if="message.subject" variant="outline" class="text-[11px] rounded-pill border-border/80">
          {{ message.subject }}
        </Badge>

        <span class="text-xs text-muted-foreground font-mono" dir="ltr">
          {{ message.phone }}
        </span>
      </div>

      <p class="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
        {{ message.message }}
      </p>

      <div class="flex items-center gap-2 text-[11px] text-muted-foreground/80 pt-0.5">
        <Clock class="size-3" />
        <span>{{ formatDate(message.created_at) }}</span>
      </div>
    </div>

    <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
      <Button size="sm" variant="outline" class="rounded-xl text-xs h-8.5 px-3 gap-1" as-child>
        <NuxtLink :to="`/admin/messages/${message.id}`">
          <Eye class="size-3.5" />
          <span>مشاهده و پاسخ</span>
        </NuxtLink>
      </Button>

      <Button size="icon" variant="ghost" class="size-8.5 rounded-xl"
        :title="message.is_read ? 'علامت به عنوان خوانده‌نشده' : 'علامت به عنوان خوانده شده'"
        @click="emit('toggle-read', message)">
        <CheckCircle2 :class="['size-4', message.is_read ? 'text-primary' : 'text-muted-foreground/50']" />
      </Button>

      <Button size="icon" variant="ghost" class="size-8.5 rounded-xl text-destructive hover:bg-destructive/10"
        @click="emit('delete', message)">
        <Trash2 class="size-4" />
      </Button>
    </div>
  </div>
</template>
