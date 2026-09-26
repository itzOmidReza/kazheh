<script setup lang="ts">
import { Sparkles } from '@lucide/vue'

defineProps<{
  quote: string
  tagline: string
}>()
</script>

<template>
  <div class="relative min-h-88 overflow-hidden rounded-[2rem] bg-primary-900 p-8 shadow-floating text-right"
    dir="rtl">
    <div class="absolute -left-16 -top-16 size-56 rounded-full bg-warm-500/30 blur-3xl" aria-hidden="true" />
    <div class="absolute -bottom-20 -right-16 size-64 rounded-full bg-primary-700 blur-3xl" aria-hidden="true" />

    <div class="relative flex h-full flex-col justify-between">
      <Sparkles class="size-8 text-sage-300" />

      <p class="max-w-sm text-2xl font-bold leading-[1.9] text-white">
        {{ quote }}
      </p>

      <p class="text-sm text-sage-200/70">
        {{ tagline }}
      </p>
    </div>
  </div>
</template>
