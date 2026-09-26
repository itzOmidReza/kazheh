<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ChevronRight } from '@lucide/vue'
import { toast } from 'vue-sonner'
import { siteConfig, adminDashboardData, initialAdminProfile, type AdminProfileData } from '~/data'
import { useAuthStore } from '~/stores/auth'
import type { PasswordData } from '~/components/admin/profile/ProfilePasswordForm.vue'
import AdminProfileIdentityCard from '~/components/admin/profile/ProfileIdentityCard.vue'
import AdminProfileInfoForm from '~/components/admin/profile/ProfileInfoForm.vue'
import AdminProfilePasswordForm from '~/components/admin/profile/ProfilePasswordForm.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `${adminDashboardData.profileSection.headTitle} | ${siteConfig.name}` })

const authStore = useAuthStore()

const profileForm = reactive<AdminProfileData>({ ...initialAdminProfile })

const isUpdatingProfile = ref(false)
const isUpdatingPassword = ref(false)

const passwordForm = reactive<PasswordData>({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

// بارگذاری اطلاعات کاربر لاگین شده
onMounted(async () => {
  if (authStore.user) {
    profileForm.full_name = authStore.user.full_name || ''
    profileForm.username = authStore.user.username || ''
    profileForm.phone = authStore.user.phone || ''
  } else {
    const data = await authStore.fetchProfile()
    if (data) {
      profileForm.full_name = data.full_name || ''
      profileForm.username = data.username || ''
      profileForm.phone = data.phone || ''
    }
  }
})

// ذخیره اطلاعات فردی در استیت فرانت‌اند بدون ارسال ریکوئست نامعتبر
const handleUpdateProfile = () => {
  if (!profileForm.full_name.trim() || !profileForm.phone.trim()) {
    toast.error(adminDashboardData.profileSection.toasts.fillRequired)
    return
  }

  isUpdatingProfile.value = true
  setTimeout(() => {
    if (authStore.user) {
      authStore.user.full_name = profileForm.full_name.trim()
      authStore.user.phone = profileForm.phone.trim()
    }
    isUpdatingProfile.value = false
    toast.success(adminDashboardData.profileSection.toasts.infoUpdated)
  }, 300)
}

// تغییر کلمه عبور از طریق اندپوینت بک‌اند
const handleChangePassword = async () => {
  if (!passwordForm.current_password || !passwordForm.new_password) {
    toast.error(adminDashboardData.profileSection.toasts.fillRequired)
    return
  }
  if (passwordForm.new_password !== passwordForm.confirm_password) {
    toast.error(adminDashboardData.profileSection.toasts.passwordsDoNotMatch)
    return
  }
  if (passwordForm.new_password.length < 6) {
    toast.error(adminDashboardData.profileSection.toasts.passwordMinLength)
    return
  }

  isUpdatingPassword.value = true
  const res = await authStore.changePassword({
    current_password: passwordForm.current_password,
    new_password: passwordForm.new_password,
  })
  isUpdatingPassword.value = false

  if (res.success) {
    passwordForm.current_password = ''
    passwordForm.new_password = ''
    passwordForm.confirm_password = ''
    toast.success(adminDashboardData.profileSection.toasts.passwordUpdated)
  } else {
    toast.error(res.message)
  }
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- مسیر راهنما (Breadcrumb) -->
    <div class="space-y-1 text-right">
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <NuxtLink to="/admin" class="hover:text-primary transition-colors">
          {{ adminDashboardData.profileSection.breadcrumbParent }}
        </NuxtLink>
        <ChevronRight class="size-3.5 rotate-180" />
        <span class="text-foreground font-medium">
          {{ adminDashboardData.profileSection.breadcrumbCurrent }}
        </span>
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        {{ adminDashboardData.profileSection.pageTitle }}
      </h1>
      <p class="text-xs text-muted-foreground">
        {{ adminDashboardData.profileSection.subtitle }}
      </p>
    </div>

    <!-- کارت هویت ادمین -->
    <AdminProfileIdentityCard :full-name="profileForm.full_name || 'مدیر سامانه'" :username="profileForm.username"
      :phone="profileForm.phone" />

    <!-- فرم‌های تفکیک‌شده مشخصات و امنیت -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 text-right">
      <AdminProfileInfoForm v-model="profileForm" :is-updating="isUpdatingProfile" @submit="handleUpdateProfile" />

      <AdminProfilePasswordForm v-model="passwordForm" :is-updating="isUpdatingPassword"
        @submit="handleChangePassword" />
    </div>
  </div>
</template>
