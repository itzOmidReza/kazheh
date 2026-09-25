<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

import {
  Users,
  Search,
  RefreshCw,
  Plus,
  ShieldAlert,
  Sparkles,
  Lock,
  ArrowRight,
  ChevronRight,
  Phone,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '~/data'

useHead({
  title: `مدیریت پرسنل و دسترسی‌ها | ${siteConfig.name}`,
})

// داده‌های پیش‌نمایش پس‌زمینه (Mocked)
const previewUsers = [
  {
    id: 1,
    name: 'دکتر علیرضا کاژه',
    role: 'مدیر ارشد و روان‌پزشک',
    username: 'dr_kazheh',
    phone: '09121112233',
    status: 'فعال',
  },
  {
    id: 2,
    name: 'سارا مهام',
    role: 'روان‌شناس بالینی و مشاور',
    username: 's_maham',
    phone: '09359876543',
    status: 'فعال',
  },
  {
    id: 3,
    name: 'پذیرش و نوبت‌دهی مرکزی',
    role: 'منشی و هماهنگی مراجعین',
    username: 'reception',
    phone: '09190001122',
    status: 'غیرفعال',
  },
]
</script>

<template>
  <div class="relative min-h-[calc(100vh-10rem)] w-full">
    <!-- ============================================== -->
    <!-- لایه بلور شیشه‌ای و کارت پیام فاز بعدی           -->
    <!-- ============================================== -->
    <div
      class="absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-md bg-background/50 transition-all rounded-3xl">
      <div
        class="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-6 sm:p-8 text-center shadow-floating backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
        <!-- افکت نوری پس‌زمینه کارت -->
        <div class="pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-primary/10 blur-2xl" />
        <div class="pointer-events-none absolute -bottom-16 -left-16 size-36 rounded-full bg-cta/15 blur-2xl" />

        <!-- آیکون نشانگر فاز بعد -->
        <div
          class="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-soft ring-8 ring-primary/5">
          <Lock class="size-8" />
          <span
            class="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white shadow-xs">
            <Sparkles class="size-3" />
          </span>
        </div>

        <!-- عناوین و توضیحات -->
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

        <!-- دکمه بازگشت به داشبورد اصلی -->
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

    <!-- ============================================== -->
    <!-- محتوای پس‌زمینه (غیرفعال و مات‌شده)            -->
    <!-- ============================================== -->
    <div class="pointer-events-none select-none opacity-40 filter blur-[1.5px] space-y-6">
      <!-- هدر بالای صفحه -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
        <div class="space-y-1 text-right">
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>پنل مدیریت</span>
            <ChevronRight class="size-3.5" />
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
          <Button size="sm" variant="default" class="rounded-pill text-xs h-8.5 px-3.5" tabindex="-1">همه (۳)</Button>
          <Button size="sm" variant="outline" class="rounded-pill text-xs h-8.5 px-3.5" tabindex="-1">مشاوران</Button>
          <Button size="sm" variant="outline" class="rounded-pill text-xs h-8.5 px-3.5" tabindex="-1">پذیرش</Button>
        </div>
      </div>

      <!-- کارت‌های کاربران در پس‌زمینه -->
      <div class="rounded-3xl border border-border/80 bg-card p-5 space-y-3">
        <div v-for="u in previewUsers" :key="u.id"
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
  </div>
</template>
