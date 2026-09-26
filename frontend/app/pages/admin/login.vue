<script setup lang="ts">
import { Lock, Phone, ArrowLeft, ShieldCheck, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'

useHead({
  title: 'ورود به پنل مدیریت | کلینیک کاژه',
})

const phone = ref('')
const password = ref('')
const isSubmitting = ref(false)

const handleLogin = async () => {
  if (!phone.value.trim() || !password.value) {
    toast.error('لطفاً شماره تماس و رمز عبور را وارد کنید.')
    return
  }

  isSubmitting.value = true
  setTimeout(async () => {
    isSubmitting.value = false
    toast.success('ورود با موفقیت انجام شد.')
    await navigateTo('/admin', { replace: true })
  }, 500)
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background px-4 py-12" dir="rtl">
    <div class="w-full max-w-md rounded-[2rem] border border-border bg-card p-6 shadow-floating sm:p-10 text-right">
      <div class="text-center">
        <div
          class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
          <ShieldCheck class="size-7" />
        </div>

        <h1 class="mt-5 text-2xl font-bold text-foreground">
          ورود به پنل مدیریت
        </h1>

        <p class="mt-2 text-sm text-muted-foreground">
          برای دسترسی به پیام‌ها و مقالات وارد شوید.
        </p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleLogin">
        <div class="space-y-2">
          <Label for="admin-phone">شماره تماس ادمین</Label>
          <div class="relative">
            <Input id="admin-phone" v-model="phone" type="tel" placeholder="09121234567" autocomplete="username"
              dir="ltr" required class="pl-10" />
            <Phone class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="admin-password">رمز عبور</Label>
          <div class="relative">
            <Input id="admin-password" v-model="password" type="password" placeholder="••••••••"
              autocomplete="current-password" dir="ltr" required class="pl-10" />
            <Lock class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <Button type="submit" size="lg" :disabled="isSubmitting"
          class="mt-6 min-h-12 w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft font-semibold gap-2">
          <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
          <template v-else>
            <span>ورود به حساب</span>
            <ArrowLeft class="size-4 rotate-180" />
          </template>
        </Button>

        <div class="pt-2 text-center">
          <NuxtLink to="/" class="text-xs text-muted-foreground hover:text-primary transition-colors">
            بازگشت به صفحه اصلی
          </NuxtLink>
        </div>
      </form>
    </div>
  </main>
</template>
