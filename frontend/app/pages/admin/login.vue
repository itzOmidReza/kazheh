<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Phone,
  ShieldCheck,
  Sparkles,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'
import { adminAuthData } from '~/data/admin'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth',
})

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const phone = ref('')
const password = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (!phone.value.trim() || !password.value.trim()) {
    toast.error(adminAuthData.messages.requiredFields)
    return
  }

  const success = await authStore.login(phone.value, password.value)

  if (success || authStore.isAuthenticated) {
    const targetUrl = (route.query.redirect as string) || '/admin'
    await router.push(targetUrl)
  }
}
</script>

<template>
  <div class="w-full max-w-[420px] mx-auto px-4" dir="rtl">
    <!-- کانتینر اصلی با استایل شیشه‌ای مدرن -->
    <div
      class="relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-7 sm:p-9 shadow-card backdrop-blur-xl transition-all duration-300 hover:shadow-floating">
      <!-- خط نورانی گرادیانت در لبه بالایی کارت -->
      <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

      <!-- بخش هدر کارت و آیکون امنیتی -->
      <div class="mb-7 flex flex-col items-center text-center">
        <div
          class="relative mb-3.5 flex size-13 items-center justify-center rounded-2xl bg-secondary text-primary shadow-xs ring-4 ring-primary/10">
          <ShieldCheck class="size-6 text-primary" />
          <span
            class="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-white">
            <Sparkles class="size-2.5" />
          </span>
        </div>

        <h1 class="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {{ adminAuthData.pageTitle }}
        </h1>
        <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-[280px]">
          {{ adminAuthData.subtitle }}
        </p>
      </div>

      <!-- فرم ورود -->
      <form class="space-y-4.5" @submit.prevent="handleLogin">
        <!-- فیلد شماره موبایل -->
        <div class="space-y-1.5 text-right">
          <Label :for="adminAuthData.fields.phone.id" class="text-xs font-semibold text-foreground/90 select-none">
            {{ adminAuthData.fields.phone.label }}
          </Label>
          <div class="relative group">
            <Input :id="adminAuthData.fields.phone.id" v-model="phone" type="tel"
              :placeholder="adminAuthData.fields.phone.placeholder"
              class="h-11 rounded-xl pe-10 font-mono text-xs transition-all duration-200 border-border/80 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20"
              dir="ltr" required :disabled="authStore.isLoading" />
            <Phone
              class="size-4.5 absolute end-3.5 top-3.5 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
          </div>
        </div>

        <!-- فیلد رمز عبور همراه با کلید نمایش / مخفی‌سازی -->
        <div class="space-y-1.5 text-right">
          <div class="flex items-center justify-between">
            <Label :for="adminAuthData.fields.password.id" class="text-xs font-semibold text-foreground/90 select-none">
              {{ adminAuthData.fields.password.label }}
            </Label>
          </div>

          <div class="relative group">
            <Input :id="adminAuthData.fields.password.id" v-model="password" :type="showPassword ? 'text' : 'password'"
              :placeholder="adminAuthData.fields.password.placeholder"
              class="h-11 rounded-xl pe-10 ps-10 font-mono text-xs transition-all duration-200 border-border/80 bg-background/50 focus:bg-background focus:ring-2 focus:ring-primary/20"
              dir="ltr" required :disabled="authStore.isLoading" />
            <Lock
              class="size-4.5 absolute end-3.5 top-3.5 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
            <button type="button"
              class="absolute start-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
              :title="showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'" tabindex="-1" @click="togglePasswordVisibility">
              <EyeOff v-if="showPassword" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
        </div>

        <!-- دکمه ورود با تم فیروزه‌ای و انیمیشن لودینگ -->
        <Button type="submit"
          class="w-full h-11 rounded-xl text-xs font-bold gap-2 mt-3 shadow-soft transition-all duration-200 active:scale-[0.98]"
          :disabled="authStore.isLoading">
          <Loader2 v-if="authStore.isLoading" class="size-4 animate-spin" />
          <span>{{ authStore.isLoading ? 'در حال بررسی...' : adminAuthData.submitButtonText }}</span>
        </Button>
      </form>

      <!-- فوتر کارت و بازگشت به وب‌سایت -->
      <div class="mt-6 pt-5 text-center border-t border-border/60">
        <NuxtLink to="/"
          class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors group">
          <ArrowRight class="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
          <span>{{ adminAuthData.backToHomeText }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
input#admin-phone {
  padding-left: 38px;
}
</style>
