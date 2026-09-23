<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster position="bottom-left" dir="rtl" rich-colors />
  </NuxtLayout>
</template>
