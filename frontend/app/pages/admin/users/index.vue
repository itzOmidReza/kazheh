<script setup lang="ts">
import { siteConfig } from '~/data'
import type { UserPreviewItem } from '~/components/admin/users/UserPreviewList.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `مدیریت پرسنل و دسترسی‌ها | ${siteConfig.name}` })

const previewUsers: UserPreviewItem[] = [
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
    <!-- لایه بلور شیشه‌ای فاز بعدی -->
    <AdminUsersComingSoonOverlay />

    <!-- لیست کاربران پس‌زمینه -->
    <AdminUsersUserPreviewList :users="previewUsers" />
  </div>
</template>
