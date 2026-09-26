<script setup lang="ts">
import { ArrowRight, Loader2, Lock, Phone } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'
import { adminAuthData } from '~/data/admin'
import { useAuthStore } from '~/stores/auth'

// اعمال لایه‌بندی ایزوله برای لاگین
definePageMeta({
  layout: 'auth',
})

const authStore = useAuthStore()

const phone = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!phone.value.trim() || !password.value.trim()) {
    toast.error(adminAuthData.messages.requiredFields)
    return
  }

  // فراخوانی اکشن لاگین از استور Pinia که مستقیماً به بک‌اند وصل است
  await authStore.login(phone.value, password.value)
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <div class="text-right space-y-2">
      <h1 class="text-xl font-bold text-foreground">
        {{ adminAuthData.pageTitle }}
      </h1>
      <p class="text-xs text-muted-foreground leading-relaxed">
        {{ adminAuthData.subtitle }}
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <!-- فیلد شماره تماس -->
      <div class="space-y-1.5 text-right">
        <Label :for="adminAuthData.fields.phone.id" class="text-xs font-medium text-foreground">
          {{ adminAuthData.fields.phone.label }}
        </Label>
        <div class="relative">
          <Input :id="adminAuthData.fields.phone.id" v-model="phone" type="tel"
            :placeholder="adminAuthData.fields.phone.placeholder" class="h-10 text-xs rounded-xl pe-9 font-mono"
            dir="ltr" required :disabled="authStore.isLoading" />
          <Phone class="size-4 absolute end-3 top-3 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <!-- فیلد رمز عبور -->
      <div class="space-y-1.5 text-right">
        <Label :for="adminAuthData.fields.password.id" class="text-xs font-medium text-foreground">
          {{ adminAuthData.fields.password.label }}
        </Label>
        <div class="relative">
          <Input :id="adminAuthData.fields.password.id" v-model="password" type="password"
            :placeholder="adminAuthData.fields.password.placeholder" class="h-10 text-xs rounded-xl pe-9 font-mono"
            dir="ltr" required :disabled="authStore.isLoading" />
          <Lock class="size-4 absolute end-3 top-3 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <!-- دکمه ورود -->
      <Button type="submit" class="w-full h-10 rounded-xl text-xs font-semibold gap-2 mt-2"
        :disabled="authStore.isLoading">
        <Loader2 v-if="authStore.isLoading" class="size-4 animate-spin" />
        <span>{{ authStore.isLoading ? 'در حال بررسی...' : adminAuthData.submitButtonText }}</span>
      </Button>
    </form>

    <div class="text-center pt-2 border-t border-border/60">
      <NuxtLink to="/"
        class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowRight class="size-3.5 rotate-180" />
        <span>{{ adminAuthData.backToHomeText }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
