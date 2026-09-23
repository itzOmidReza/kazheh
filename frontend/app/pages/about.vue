<script setup lang="ts">
import {
  ArrowLeft,
  Brain,
  HeartHandshake,
  LockKeyhole,
  Sparkles,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfig, aboutPageContent } from '~/data'

useHead({
  title: `درباره کلینیک | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: aboutPageContent.hero.description,
    },
  ],
})

const icons = [HeartHandshake, Brain, LockKeyhole]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="max-w-2xl">
            <Badge variant="secondary"
              class="rounded-pill bg-sage-100 text-primary-800 dark:bg-primary-950 dark:text-sage-300">
              {{ aboutPageContent.badge }}
            </Badge>

            <h1 class="mt-6 text-heading-xl text-foreground">
              {{ aboutPageContent.hero.title.regular }}
              <span class="text-primary-700 dark:text-primary">
                {{ aboutPageContent.hero.title.highlight }}
              </span>
            </h1>

            <p class="mt-6 text-body-lg text-muted-foreground">
              {{ aboutPageContent.hero.description }}
            </p>

            <Button as-child class="mt-8 rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover">
              <NuxtLink :to="aboutPageContent.hero.cta.href">
                {{ aboutPageContent.hero.cta.label }}
                <ArrowLeft class="size-4" />
              </NuxtLink>
            </Button>
          </div>

          <div class="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-primary-900 p-8 shadow-floating">
            <div class="absolute -left-16 -top-16 size-56 rounded-full bg-warm-500/30 blur-3xl" aria-hidden="true" />
            <div class="absolute -bottom-20 -right-16 size-64 rounded-full bg-primary-700 blur-3xl"
              aria-hidden="true" />

            <div class="relative flex h-full flex-col justify-between">
              <Sparkles class="size-8 text-sage-300" />

              <p class="max-w-sm text-2xl font-bold leading-[1.9] text-white">
                {{ aboutPageContent.hero.visualCard.quote }}
              </p>

              <p class="text-sm text-sage-200/70">
                {{ aboutPageContent.hero.visualCard.tagline }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p class="text-sm font-medium text-primary">
              {{ aboutPageContent.story.badge }}
            </p>

            <h2 class="mt-4 text-heading-lg text-foreground">
              {{ aboutPageContent.story.title }}
            </h2>
          </div>

          <div class="space-y-5 text-body-lg text-muted-foreground">
            <p v-for="paragraph in aboutPageContent.story.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-medium text-primary">
            {{ aboutPageContent.valuesBadge }}
          </p>

          <h2 class="mt-4 text-heading-xl text-foreground">
            {{ aboutPageContent.valuesTitle }}
          </h2>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <Card v-for="(value, index) in aboutPageContent.values" :key="value.title"
            class="rounded-[1.5rem] border-border/80 bg-card shadow-none">
            <CardHeader>
              <span
                class="flex size-12 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300">
                <component :is="icons[index % icons.length]" class="size-5" />
              </span>

              <CardTitle class="pt-4 text-xl text-foreground">
                {{ value.title }}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p class="text-sm leading-8 text-muted-foreground">
                {{ value.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="rounded-[1.5rem] border border-border bg-card p-8 text-center sm:p-12">
          <h2 class="text-heading-lg text-foreground">
            {{ aboutPageContent.ctaSection.title }}
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-body text-muted-foreground">
            {{ aboutPageContent.ctaSection.description }}
          </p>

          <Button as-child class="mt-7 rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover">
            <NuxtLink :to="aboutPageContent.ctaSection.cta.href">
              {{ aboutPageContent.ctaSection.cta.label }}
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
