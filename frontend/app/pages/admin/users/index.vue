<script setup lang="ts">
import {
  siteConfig,
  adminDashboardData,
  initialAdminUsers,
  type AdminUserPreviewItem,
} from '~/data'

definePageMeta({ layout: 'admin' })
useHead({ title: `${adminDashboardData.usersSection.headTitle} | ${siteConfig.name}` })

const previewUsers = ref<AdminUserPreviewItem[]>([...initialAdminUsers])
</script>

<template>
  <div class="relative min-h-[calc(100vh-10rem)] w-full">
    <!-- لایه بلور شیشه‌ای فاز بعدی -->
    <AdminUsersComingSoonOverlay />

    <!-- لیست کاربران پس‌زمینه -->
    <AdminUsersUserPreviewList :users="previewUsers" />
  </div>
</template>
