<script setup lang="ts">
import {
  Brain,
  Heart,
  MessageCircle,
  ArrowLeft,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { concernsContent } from '~/data'

const icons = [Brain, Heart, MessageCircle]
</script>

<template>
  <section id="concerns" class="section-space overflow-hidden bg-surface">
    <div class="site-container">
      <!-- Section heading -->
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <Badge variant="secondary"
            class="rounded-pill bg-sage-100 text-primary-800 dark:bg-primary-950 dark:text-sage-300">
            {{ concernsContent.badge }}
          </Badge>

          <h2 class="mt-5 text-heading-xl text-foreground">
            {{ concernsContent.title.start }}
            <span class="text-primary-700 dark:text-primary">
              {{ concernsContent.title.highlight }}
            </span>
            {{ concernsContent.title.end }}
          </h2>

          <p class="mt-5 max-w-xl text-body-lg text-muted-foreground">
            {{ concernsContent.description }}
          </p>
        </div>

        <Button as-child variant="ghost"
          class="w-fit rounded-pill px-0 text-primary hover:bg-transparent hover:text-primary-700 dark:hover:text-primary-foreground">
          <NuxtLink :to="concernsContent.cta.href">
            {{ concernsContent.cta.label }}
            <ArrowLeft class="size-4" />
          </NuxtLink>
        </Button>
      </div>

      <!-- Concern cards -->
      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <Card v-for="(concern, index) in concernsContent.items" :key="concern.number"
          class="group relative overflow-hidden rounded-[1.375rem] border-border/80 bg-card shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card">
          <CardHeader class="relative">
            <div class="flex items-center justify-between">
              <span
                class="flex size-12 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-primary-950 dark:text-sage-300">
                <component :is="icons[index % icons.length]" class="size-5" />
              </span>

              <span class="text-sm font-semibold text-primary-500/50 dark:text-muted-foreground/60">
                {{ concern.number }}
              </span>
            </div>

            <CardTitle class="pt-5 text-xl leading-9 text-foreground">
              {{ concern.title }}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p class="text-sm leading-8 text-muted-foreground">
              {{ concern.description }}
            </p>
          </CardContent>

          <div
            class="pointer-events-none absolute -bottom-16 -left-16 size-32 rounded-full bg-sage-100/60 blur-xl transition-transform duration-500 group-hover:scale-150 dark:bg-primary-900/30"
            aria-hidden="true" />
        </Card>
      </div>

      <!-- Closing message -->
      <div
        class="mt-12 rounded-[1.375rem] border border-warm-300/40 bg-warm-300/15 px-6 py-7 text-center sm:px-10 dark:border-warm-700/30 dark:bg-warm-900/10">
        <p class="text-base font-medium leading-8 text-foreground">
          {{ concernsContent.closingMessage }}
        </p>
      </div>
    </div>
  </section>
</template>
