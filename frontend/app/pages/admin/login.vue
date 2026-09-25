<script setup lang="ts">
import { Lock, Phone, ArrowLeft, ShieldCheck, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'

definePageMeta({
  middleware: 'admin-auth',
})

useHead({
  title: 'ورود به پنل مدیریت | کلینیک آرامش',
})

const { login } = useAuth()

const phone = ref('')
const password = ref('')
const isSubmitting = ref(false)

const handleLogin = async () => {
  if (!phone.value.trim() || !password.value) {
    toast.error('لطفاً شماره تماس و رمز عبور را وارد کنید.')
    return
  }

  isSubmitting.value = true
  try {
    const success = await login(phone.value.trim(), password.value)
    if (success) {
      toast.success('ورود با موفقیت انجام شد.')
      await navigateTo('/admin', { replace: true })
    } else {
      toast.error('شماره تماس یا رمز عبور اشتباه است.')
    }
  } catch (err: any) {
    const status = err?.response?.status || err?.status || err?.statusCode
    const detail = err?.data?.detail || err?.message
    let msg = 'خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.'
    if (status === 401 || (typeof detail === 'string' && (detail.includes('Incorrect') || detail.includes('credentials')))) {
      msg = 'شماره تماس یا رمز عبور اشتباه است.'
    } else if (typeof detail === 'string') {
      msg = detail
    }
    toast.error(msg)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-surface px-4 py-12">
    <div class="w-full max-w-md rounded-[2rem] border border-border bg-card p-6 shadow-floating sm:p-10">
      <div class="text-center">
        <div class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
          <ShieldCheck class="size-7" />
        </div>

        <h1 class="mt-5 text-heading-md text-primary-900">
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
            <Input
              id="admin-phone"
              v-model="phone"
              type="tel"
              placeholder="09121234567"
              autocomplete="username"
              dir="ltr"
              required
              class="pl-10"
            />
            <Phone class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="admin-password">رمز عبور</Label>
          <div class="relative">
            <Input
              id="admin-password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              dir="ltr"
              required
              class="pl-10"
            />
            <Lock class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          :disabled="isSubmitting"
          class="mt-6 min-h-12 w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft"
        >
          <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
          <template v-else>
            ورود به حساب
            <ArrowLeft class="size-4" />
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

