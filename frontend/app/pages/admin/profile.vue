<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { siteConfig, adminDashboardData } from '~/data'
import type { ProfileData } from '~/components/admin/profile/ProfileInfoForm.vue'
import type { PasswordData } from '~/components/admin/profile/ProfilePasswordForm.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `پروفایل کاربری | ${siteConfig.name}` })

const profileForm = reactive<ProfileData>({
  full_name: 'مدیر کلینیک کاژه',
  phone: '09121234567',
  username: 'admin',
})

const isUpdatingProfile = ref(false)

const handleUpdateProfile = () => {
  if (!profileForm.full_name.trim() || !profileForm.phone.trim()) {
    toast.error(adminDashboardData.profileSection.toasts.fillRequired)
    return
  }
  isUpdatingProfile.value = true
  setTimeout(() => {
    isUpdatingProfile.value = false
    toast.success(adminDashboardData.profileSection.toasts.infoUpdated)
  }, 350)
}

const passwordForm = reactive<PasswordData>({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const isUpdatingPassword = ref(false)

const handleChangePassword = () => {
  if (!passwordForm.current_password || !passwordForm.new_password) {
    toast.error(adminDashboardData.profileSection.toasts.fillRequired)
    return
  }
  if (passwordForm.new_password !== passwordForm.confirm_password) {
    toast.error(adminDashboardData.profileSection.toasts.passwordsDoNotMatch)
    return
  }
  if (passwordForm.new_password.length < 6) {
    toast.error('رمز عبور جدید باید حداقل ۶ کاراکتر باشد.')
    return
  }

  isUpdatingPassword.value = true
  setTimeout(() => {
    passwordForm.current_password = ''
    passwordForm.new_password = ''
    passwordForm.confirm_password = ''
    isUpdatingPassword.value = false
    toast.success(adminDashboardData.profileSection.toasts.passwordUpdated)
  }, 350)
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- Breadcrumb -->
    <div class="space-y-1 text-right">
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <NuxtLink to="/admin" class="hover:text-primary transition-colors">پنل مدیریت</NuxtLink>
        <ChevronRight class="size-3.5 rotate-180" />
        <span class="text-foreground font-medium">پروفایل کاربری</span>
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        {{ adminDashboardData.profileSection.pageTitle }}
      </h1>
      <p class="text-xs text-muted-foreground">
        {{ adminDashboardData.profileSection.subtitle }}
      </p>
    </div>

    <!-- خلاصه هویت ماژولار -->
    <AdminProfileIdentityCard :full-name="profileForm.full_name" :username="profileForm.username"
      :phone="profileForm.phone" />

    <!-- کارت‌های فرم تفکیک‌شده -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 text-right">
      <AdminProfileInfoForm v-model="profileForm" :is-updating="isUpdatingProfile" @submit="handleUpdateProfile" />

      <AdminProfilePasswordForm v-model="passwordForm" :is-updating="isUpdatingPassword"
        @submit="handleChangePassword" />
    </div>
  </div>
</template>
