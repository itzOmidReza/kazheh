<script setup lang="ts">
import { Search, RefreshCw, Plus, ChevronRight, Phone } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface UserPreviewItem {
  id: number
  name: string
  role: string
  username: string
  phone: string
  status: string
}

defineProps<{
  users: UserPreviewItem[]
}>()
</script>

<template>
  <div class="pointer-events-none select-none opacity-40 filter blur-[1.5px] space-y-6" dir="rtl">
    <!-- هدر بالای صفحه -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
      <div class="space-y-1 text-right">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span>پنل مدیریت</span>
          <ChevronRight class="size-3.5 rotate-180" />
          <span class="text-foreground font-medium">کاربران و پرسنل</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          مدیریت دسترسی‌ها و اعضای تیم کلینیک
        </h1>
        <p class="text-xs text-muted-foreground">
          تعریف مشاوران، مدیران سیستم و تعیین دسترسی بخش‌های مختلف
        </p>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 gap-1.5" tabindex="-1">
          <RefreshCw class="size-3.5" />
          <span>بروزرسانی لیست</span>
        </Button>
        <Button class="rounded-pill bg-cta text-cta-foreground text-xs gap-1.5 h-9 px-4" tabindex="-1">
          <Plus class="size-4" />
          <span>افزودن کاربر جدید</span>
        </Button>
      </div>
    </div>

    <!-- نوار جستجو و فیلتر -->
    <div
      class="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="relative w-full sm:max-w-md">
        <Input type="text" placeholder="جست‌وجوی نام، شماره تماس..."
          class="pr-10 rounded-xl bg-background/50 h-10 text-xs text-right" tabindex="-1" />
        <Search class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div class="flex items-center gap-1.5">
        <Button size="sm" variant="default" class="rounded-pill text-xs h-8.5 px-3.5" tabindex="-1">همه ({{ users.length
          }})</Button>
        <Button size="sm" variant="outline" class="rounded-pill text-xs h-8.5 px-3.5" tabindex="-1">مشاوران</Button>
        <Button size="sm" variant="outline" class="rounded-pill text-xs h-8.5 px-3.5" tabindex="-1">پذیرش</Button>
      </div>
    </div>

    <!-- کارت‌های کاربران -->
    <div class="rounded-3xl border border-border/80 bg-card p-5 space-y-3">
      <div v-for="u in users" :key="u.id"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/70 p-4">
        <div class="flex items-center gap-3.5">
          <div
            class="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-sm">
            {{ u.name.charAt(0) }}
          </div>
          <div class="space-y-1 text-right">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-foreground">{{ u.name }}</span>
              <Badge variant="outline" class="rounded-pill text-[10px]">{{ u.role }}</Badge>
            </div>
            <div class="flex items-center gap-3 text-xs text-muted-foreground">
              <span dir="ltr" class="font-mono">@{{ u.username }}</span>
              <span dir="ltr" class="flex items-center gap-1 font-mono">
                <Phone class="size-3" />
                {{ u.phone }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <Badge class="bg-emerald-500/10 text-emerald-600 border-transparent text-xs">
            {{ u.status }}
          </Badge>
        </div>
      </div>
    </div>
  </div>
</template>
