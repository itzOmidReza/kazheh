<script setup lang="ts">
import { ArrowLeft, Brain, HeartHandshake, LockKeyhole } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig, aboutPageContent } from '~/data'

useHead({
  title: `درباره کلینیک | ${siteConfig.name}`,
  meta: [
    { name: 'description', content: aboutPageContent.hero.description },
  ],
})

const icons = [HeartHandshake, Brain, LockKeyhole]
</script>

<template>
  <div dir="rtl">
    <!-- Hero -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="max-w-2xl text-right">
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
                <span>{{ aboutPageContent.hero.cta.label }}</span>
                <ArrowLeft class="size-4" />
              </NuxtLink>
            </Button>
          </div>

          <AboutHeroCard :quote="aboutPageContent.hero.visualCard.quote"
            :tagline="aboutPageContent.hero.visualCard.tagline" />
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 text-right">
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
          <AboutValueCard v-for="(value, index) in aboutPageContent.values" :key="value.title" :title="value.title"
            :description="value.description" :icon="icons[index % icons.length] ?? icons[0]" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <h2 class="text-heading-lg text-foreground">
            {{ aboutPageContent.ctaSection.title }}
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-body text-muted-foreground">
            {{ aboutPageContent.ctaSection.description }}
          </p>

          <Button as-child class="mt-7 rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover">
            <NuxtLink :to="aboutPageContent.ctaSection.cta.href">
              <span>{{ aboutPageContent.ctaSection.cta.label }}</span>
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
