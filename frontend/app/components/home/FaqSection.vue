<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Button } from '@/components/ui/button'
import { faqContent } from '~/data'
</script>

<template>
  <section id="faq" aria-labelledby="faq-title" class="section-space bg-surface">
    <div class="site-container">
      <div class="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <!-- Introduction -->
        <div>
          <p class="text-sm font-medium text-primary">
            {{ faqContent.badge }}
          </p>

          <h2 id="faq-title" class="mt-4 text-heading-xl text-foreground">
            {{ faqContent.title }}
          </h2>

          <p class="mt-5 text-body-lg text-muted-foreground">
            {{ faqContent.description }}
          </p>

          <div class="mt-8 border-s-2 border-warm-500 ps-5">
            <p class="text-sm leading-7 text-muted-foreground">
              {{ faqContent.notFoundText }}
            </p>

            <Button as-child variant="link" class="mt-2 min-h-11 px-0 text-primary">
              <NuxtLink :to="faqContent.askQuestionCta.href">
                {{ faqContent.askQuestionCta.label }}
                <ArrowLeft class="size-4" aria-hidden="true" />
              </NuxtLink>
            </Button>
          </div>
        </div>

        <!-- Questions -->
        <div class="min-w-0 rounded-xl border border-border bg-card px-5 sm:px-8">
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem v-for="item in faqContent.questions" :key="item.id" :value="item.id"
              class="border-border last:border-b-0">
              <AccordionTrigger
                class="gap-4 py-6 text-start text-base font-semibold leading-8 text-card-foreground hover:no-underline">
                {{ item.question }}
              </AccordionTrigger>

              <AccordionContent class="pb-6 text-body text-muted-foreground">
                <p>{{ item.answer }}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  </section>
</template>
