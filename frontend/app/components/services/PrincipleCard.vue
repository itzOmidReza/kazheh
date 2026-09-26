<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  text: string
  icon: Component
}>()
</script>

<template>
  <div class="rounded-[1.375rem] border border-border/80 bg-card p-6 text-right" dir="rtl">
    <span
      class="flex size-11 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300">
      <component :is="icon" class="size-5" />
    </span>

    <h3 class="mt-5 text-lg font-bold text-foreground">
      {{ title }}
    </h3>

    <p class="mt-3 text-sm leading-8 text-muted-foreground">
      {{ text }}
    </p>
  </div>
</template>
