<script setup lang="ts">
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Signpost,
} from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { processContent } from '~/data'

const icons = [MessageCircle, Phone, Signpost]
</script>

<template>
  <section id="process" aria-labelledby="process-title" class="section-space bg-background">
    <div class="site-container">
      <!-- Introduction -->
      <div class="mx-auto max-w-2xl text-center">
        <span class="inline-flex rounded-pill bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
          {{ processContent.badge }}
        </span>

        <h2 id="process-title" class="mt-5 text-heading-xl text-foreground">
          {{ processContent.title.regular }}
          <span class="text-primary">{{ processContent.title.highlight }}</span>
        </h2>

        <p class="mt-5 text-body-lg text-muted-foreground">
          {{ processContent.description }}
        </p>
      </div>

      <!-- Steps -->
      <ol class="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3 lg:gap-10">
        <li v-for="(step, index) in processContent.steps" :key="step.number"
          class="relative flex gap-5 lg:flex-col lg:gap-6">
          <div class="flex shrink-0 flex-col items-center">
            <span
              class="flex size-14 items-center justify-center rounded-full border border-border bg-secondary text-lg font-bold text-secondary-foreground lg:size-16"
              aria-hidden="true">
              {{ step.number }}
            </span>

            <span class="mt-4 w-px flex-1 bg-border lg:hidden" aria-hidden="true" />
          </div>

          <div class="min-w-0 flex-1 pb-4 lg:pb-0">
            <div class="flex items-center gap-3">
              <component :is="icons[index % icons.length]" class="size-5 shrink-0 text-primary" aria-hidden="true" />

              <h3 class="text-xl font-bold leading-9 text-foreground">
                {{ step.title }}
              </h3>
            </div>

            <p class="mt-4 text-body text-muted-foreground">
              {{ step.description }}
            </p>

            <p class="mt-5 border-s-2 border-warm-500 ps-4 text-sm leading-7 text-foreground">
              {{ step.note }}
            </p>
          </div>
        </li>
      </ol>

      <!-- Contact invitation -->
      <div
        class="mt-12 flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-surface p-6 sm:p-8 lg:mt-16 lg:flex-row lg:items-center">
        <div class="max-w-xl">
          <h3 class="text-lg font-semibold text-foreground">
            {{ processContent.invitation.title }}
          </h3>

          <p class="mt-2 text-sm leading-7 text-muted-foreground">
            {{ processContent.invitation.description }}
          </p>
        </div>

        <Button as-child size="lg"
          class="min-h-12 w-full shrink-0 rounded-pill bg-cta px-6 text-sm font-semibold text-cta-foreground hover:bg-cta-hover sm:w-auto">
          <NuxtLink :to="processContent.invitation.cta.href">
            {{ processContent.invitation.cta.label }}
            <ArrowLeft class="size-4" aria-hidden="true" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
