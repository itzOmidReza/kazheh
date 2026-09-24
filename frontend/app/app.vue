<script setup lang="ts">
import Toaster from '@/components/ui/sonner/Sonner.vue'
import { Button } from '@/components/ui/button'
import { RefreshCw } from '@lucide/vue'

const handleRecover = () => {
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <div dir="rtl" class="site-container my-16 max-w-xl rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft">
          <h2 class="text-xl font-bold text-primary-900">
            خطایی در نمایش این بخش رخ داده است
          </h2>
          <p class="mt-2 text-sm text-muted-foreground">
            {{ error?.message || 'مشکلی در بارگذاری اطلاعات پیش آمده است.' }}
          </p>
          <Button variant="outline" class="mt-6 rounded-pill" @click="handleRecover">
            <RefreshCw class="size-4 ml-2" />
            بارگذاری مجدد صفحه
          </Button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
  <Toaster position="bottom-left" dir="rtl" />
</template>
