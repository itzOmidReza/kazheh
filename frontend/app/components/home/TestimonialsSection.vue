<script setup lang="ts">
import { testimonialsContent } from '~/data'

interface Testimonial {
  id: string
  displayName: string
  text: string
}

withDefaults(
  defineProps<{
    items?: Testimonial[]
  }>(),
  {
    items: () => [],
  },
)
</script>

<template>
  <section v-if="items.length" id="testimonials" aria-labelledby="testimonials-title" class="section-space bg-surface">
    <div class="site-container">
      <div class="max-w-2xl">
        <p class="text-sm font-medium text-primary">
          {{ testimonialsContent.badge }}
        </p>

        <h2 id="testimonials-title" class="mt-4 text-heading-xl text-foreground">
          {{ testimonialsContent.title }}
        </h2>

        <p class="mt-5 text-body-lg text-muted-foreground">
          {{ testimonialsContent.description }}
        </p>
      </div>

      <ul class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <li v-for="item in items" :key="item.id" class="rounded-lg border border-border bg-card p-6 sm:p-8">
          <figure class="flex h-full flex-col">
            <span aria-hidden="true" class="text-5xl leading-none text-primary">
              «
            </span>

            <blockquote class="mt-4 flex-1">
              <p class="whitespace-pre-line text-body text-card-foreground">
                {{ item.text }}
              </p>
            </blockquote>

            <figcaption class="mt-6 border-t border-border pt-4 text-sm font-medium text-muted-foreground">
              {{ item.displayName }}
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>
