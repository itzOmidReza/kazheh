<script setup lang="ts">
import {
  ArrowLeft,
  Brain,
  HeartHandshake,
  Sprout,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { approachContent } from '~/data'

const icons = [HeartHandshake, Brain, Sprout]
</script>

<template>
  <section id="approach" class="section-space overflow-hidden bg-primary-900 text-white">
    <div class="site-container">
      <div class="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <!-- Intro -->
        <div class="lg:sticky lg:top-28">
          <Badge variant="secondary" class="rounded-pill border border-white/10 bg-white/10 text-sage-200">
            {{ approachContent.badge }}
          </Badge>

          <h2 class="mt-5 text-heading-xl text-white">
            {{ approachContent.title.regular }}
            <span class="text-sage-300">
              {{ approachContent.title.highlight }}
            </span>
          </h2>

          <p class="mt-6 text-body-lg text-sage-200/75">
            {{ approachContent.description }}
          </p>

          <Button as-child variant="outline"
            class="mt-8 rounded-pill border-white/20 bg-transparent px-5 text-sage-200 hover:bg-white/10 hover:text-white">
            <NuxtLink :to="approachContent.cta.href">
              {{ approachContent.cta.label }}
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>

        <!-- Principles -->
        <div class="relative">
          <div class="absolute right-6 top-8 h-[calc(100%-4rem)] w-px bg-white/15" aria-hidden="true" />

          <div class="space-y-10">
            <article v-for="(principle, index) in approachContent.principles" :key="principle.number"
              class="group relative flex gap-6">
              <div class="relative z-10 shrink-0">
                <span
                  class="flex size-14 items-center justify-center rounded-2xl border border-sage-300/30 bg-primary-800 text-sage-200 transition-colors duration-300 group-hover:border-warm-300 group-hover:bg-warm-300 group-hover:text-primary-900">
                  <component :is="icons[index % icons.length]" class="size-6" />
                </span>
              </div>

              <div class="pb-2">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-semibold text-warm-300">
                    {{ principle.number }}
                  </span>

                  <h3 class="text-xl font-bold text-white">
                    {{ principle.title }}
                  </h3>
                </div>

                <p class="mt-3 max-w-xl text-sm leading-8 text-sage-200/75">
                  {{ principle.description }}
                </p>
              </div>
            </article>
          </div>

          <div class="mt-12 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <p class="text-lg font-semibold leading-9 text-sage-100">
              {{ approachContent.quote }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
