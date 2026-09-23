<script setup lang="ts">
import {
  ArrowLeft,
  HeartHandshake,
  Sparkles,
  UsersRound,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { servicesHomeContent, servicesList } from '~/data/services'

const iconMap: Record<string, any> = {
  Sparkles,
  HeartHandshake,
  UsersRound,
}
</script>

<template>
  <section id="services" class="section-space bg-background">
    <div class="site-container">
      <!-- Section heading -->
      <div class="max-w-2xl">
        <Badge variant="secondary"
          class="rounded-pill bg-sage-100 text-primary-800 dark:bg-primary-950 dark:text-sage-300">
          {{ servicesHomeContent.badge }}
        </Badge>

        <h2 class="mt-5 text-heading-xl text-foreground">
          {{ servicesHomeContent.title.regular }}
          <span class="text-primary-700 dark:text-primary">
            {{ servicesHomeContent.title.highlight }}
          </span>
          {{ servicesHomeContent.title.end }}
        </h2>

        <p class="mt-5 text-body-lg text-muted-foreground">
          {{ servicesHomeContent.description }}
        </p>
      </div>

      <!-- Services -->
      <div class="mt-12 grid gap-5 lg:grid-cols-3">
        <Card v-for="service in servicesList" :key="service.id" :class="[
          'group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1',
          service.featured
            ? 'border-primary-700 bg-primary-900 text-white shadow-floating'
            : 'border-border/80 bg-card shadow-none hover:border-primary/20 hover:shadow-card',
        ]">
          <CardHeader class="relative z-10">
            <div class="flex items-center justify-between">
              <span :class="[
                'flex size-12 items-center justify-center rounded-2xl',
                service.featured
                  ? 'bg-sage-200 text-primary-900'
                  : 'bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300',
              ]">
                <component :is="iconMap[service.icon]" class="size-5" />
              </span>

              <span :class="[
                'text-sm font-semibold',
                service.featured
                  ? 'text-sage-200/60'
                  : 'text-primary-500/50 dark:text-muted-foreground/60',
              ]">
                {{ service.number }}
              </span>
            </div>

            <CardTitle :class="[
              'pt-6 text-2xl leading-10',
              service.featured ? 'text-white' : 'text-foreground',
            ]">
              {{ service.title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="relative z-10 flex-1">
            <p :class="[
              'text-sm leading-8',
              service.featured
                ? 'text-sage-200/80'
                : 'text-muted-foreground',
            ]">
              {{ service.shortDescription }}
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="topic in service.topics" :key="topic" :class="[
                'rounded-pill px-3 py-1 text-xs',
                service.featured
                  ? 'border border-white/15 bg-white/10 text-sage-200'
                  : 'bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300',
              ]">
                {{ topic }}
              </span>
            </div>
          </CardContent>

          <CardFooter class="relative z-10 pt-8">
            <Button as-child variant="ghost" :class="[
              'w-fit rounded-pill px-0',
              service.featured
                ? 'text-sage-200 hover:bg-transparent hover:text-white'
                : 'text-primary hover:bg-transparent hover:text-primary-700 dark:hover:text-primary-foreground',
            ]">
              <NuxtLink :to="service.href || servicesHomeContent.cardCta.href">
                {{ servicesHomeContent.cardCta.label }}
                <ArrowLeft class="size-4" />
              </NuxtLink>
            </Button>
          </CardFooter>

          <div :class="[
            'pointer-events-none absolute -bottom-20 -left-20 size-52 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125',
            service.featured
              ? 'bg-primary-700/60'
              : 'bg-sage-100/70 dark:bg-primary-900/30',
          ]" aria-hidden="true" />
        </Card>
      </div>

      <!-- Closing note -->
      <div
        class="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.375rem] border border-border/80 bg-surface px-6 py-6 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p class="font-semibold text-foreground">
            {{ servicesHomeContent.closingNote.title }}
          </p>

          <p class="mt-1 text-sm text-muted-foreground">
            {{ servicesHomeContent.closingNote.description }}
          </p>
        </div>

        <Button as-child class="shrink-0 rounded-pill bg-primary px-5 text-primary-foreground hover:bg-primary-700">
          <NuxtLink :to="servicesHomeContent.closingNote.cta.href">
            {{ servicesHomeContent.closingNote.cta.label }}
            <ArrowLeft class="size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>
