<script setup lang="ts">
import {
  CheckCircle2,
  HeartHandshake,
  LockKeyhole,
  UsersRound,
} from '@lucide/vue'
import { trustBarContent } from '~/data'

const iconMap: Record<string, any> = {
  LockKeyhole,
  HeartHandshake,
  UsersRound,
  CheckCircle2,
}
</script>

<template>
  <section :aria-label="trustBarContent.ariaLabel" class="border-y border-border/80 bg-card">
    <div class="site-container">
      <div class="grid divide-y divide-border/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        <div v-for="item in trustBarContent.items" :key="item.title"
          class="flex items-start gap-4 px-0 py-7 sm:px-6 lg:px-7">
          <span
            class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300">
            <component :is="iconMap[item.icon]" class="size-5" />
          </span>

          <div>
            <h2 class="text-sm font-bold text-foreground">
              {{ item.title }}
            </h2>

            <p class="mt-1 text-xs leading-6 text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
