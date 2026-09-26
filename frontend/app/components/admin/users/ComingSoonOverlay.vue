<script setup lang="ts">
import { Lock, Sparkles, ArrowRight } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div
    class="absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-md bg-background/50 transition-all rounded-3xl"
    dir="rtl">
    <div
      class="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-6 sm:p-8 text-center shadow-floating backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
      <div class="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-primary/10 blur-2xl" />
      <div class="pointer-events-none absolute -bottom-16 -left-16 size-36 rounded-full bg-cta/15 blur-2xl" />

      <div
        class="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-soft ring-8 ring-primary/5">
        <Lock class="size-8" />
        <span
          class="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white shadow-xs">
          <Sparkles class="size-3" />
        </span>
      </div>

      <div class="mt-5 space-y-2">
        <Badge variant="outline"
          class="rounded-pill border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          فاز ۲ توسعه سامانه
        </Badge>

        <h2 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          ماژول مدیریت کاربران و پرسنل
        </h2>

        <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
          این بخش شامل تعیین نقش‌های دسترسی (مدیران، مشاوران کلینیک و منشی نوبت‌دهی)، ثبت پرونده پرسنلی و تفکیک دسترسی
          صندوق پیام‌ها می‌باشد که در
          <span class="font-bold text-foreground">فاز بعدی به‌روزرسانی سامانه</span>
          فعال و در دسترس قرار خواهد گرفت.
        </p>
      </div>

      <div class="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button as-child
          class="w-full sm:w-auto rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-10 px-6 gap-2">
          <NuxtLink to="/admin">
            <span>بازگشت به میز کار</span>
            <ArrowRight class="size-4 rotate-180" />
          </NuxtLink>
        </Button>

        <Button as-child variant="outline" class="w-full sm:w-auto rounded-pill text-xs h-10 px-5 gap-1.5">
          <NuxtLink to="/admin/messages">
            <span>صندوق پیام‌ها</span>
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
