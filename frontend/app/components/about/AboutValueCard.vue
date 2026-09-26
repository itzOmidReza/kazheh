<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  title: string
  description: string
  icon?: Component | any
}>()
</script>

<template>
  <Card class="rounded-3xl border-border/80 bg-card shadow-none text-right" dir="rtl">
    <CardHeader>
      <span
        class="flex size-12 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300">
        <component :is="icon" class="size-5" />
      </span>

      <CardTitle class="pt-4 text-xl text-foreground">
        {{ title }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <p class="text-sm leading-8 text-muted-foreground">
        {{ description }}
      </p>
    </CardContent>
  </Card>
</template>
