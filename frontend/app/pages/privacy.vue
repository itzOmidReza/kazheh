<script setup lang="ts">
import { ArrowRight, LockKeyhole } from '@lucide/vue'
import { siteConfig, privacyPageContent } from '~/data'

useHead({
  title: `حریم خصوصی | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: privacyPageContent.description,
    },
  ],
})
</script>

<template>
  <div>
    <section class="section-space bg-surface">
      <div class="site-container">
        <NuxtLink to="/"
          class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700 dark:hover:text-primary-foreground">
          <ArrowRight class="size-4" />
          بازگشت به صفحه اصلی
        </NuxtLink>

        <div class="mt-10 max-w-3xl">
          <div
            class="flex size-14 items-center justify-center rounded-2xl bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300">
            <LockKeyhole class="size-6" />
          </div>

          <p class="mt-6 text-sm font-medium text-primary">
            {{ privacyPageContent.badge }}
          </p>

          <h1 class="mt-4 text-heading-xl text-foreground">
            {{ privacyPageContent.title }}
          </h1>

          <p class="mt-6 text-body-lg text-muted-foreground">
            {{ privacyPageContent.description }}
          </p>

          <p class="mt-5 text-sm text-muted-foreground">
            {{ privacyPageContent.lastUpdated }}
          </p>
        </div>
      </div>
    </section>

    <section class="section-space bg-background">
      <div class="site-container">
        <div class="max-w-3xl">
          <div v-for="section in privacyPageContent.sections" :key="section.title"
            class="border-b border-border py-8 first:pt-0 last:border-b-0">
            <h2 class="text-heading-md text-foreground">
              {{ section.title }}
            </h2>

            <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-4 text-body-lg text-muted-foreground">
              {{ paragraph }}
            </p>
          </div>

          <div
            class="mt-10 rounded-[1.5rem] border border-warm-300/50 bg-warm-300/15 p-6 dark:border-warm-700/30 dark:bg-warm-900/10">
            <p class="text-sm leading-8 text-foreground">
              {{ privacyPageContent.disclaimer }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
