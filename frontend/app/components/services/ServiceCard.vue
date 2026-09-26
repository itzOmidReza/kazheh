<script setup lang="ts">
import { ArrowLeft, Sparkles, HeartHandshake, UsersRound } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const iconMap: Record<string, any> = {
  Sparkles,
  HeartHandshake,
  UsersRound,
}

defineProps<{
  service: {
    title: string
    icon: string
    shortDescription?: string
    fullDescription?: string
    topics: string[]
  }
  isFeatured?: boolean
}>()
</script>

<template>
  <Card :class="[
    'group flex h-full flex-col rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 text-right',
    isFeatured
      ? 'border-primary-700 bg-primary-900 text-white shadow-floating'
      : 'border-border/80 bg-card hover:shadow-card',
  ]" dir="rtl">
    <CardHeader>
      <span :class="[
        'flex size-12 items-center justify-center rounded-2xl',
        isFeatured
          ? 'bg-sage-200 text-primary-900'
          : 'bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300',
      ]">
        <component :is="iconMap[service.icon] || Sparkles" class="size-5" />
      </span>

      <CardTitle :class="['pt-5 text-2xl', isFeatured ? 'text-white' : 'text-foreground']">
        {{ service.title }}
      </CardTitle>
    </CardHeader>

    <CardContent class="flex-1">
      <p :class="['text-sm leading-8', isFeatured ? 'text-sage-200/80' : 'text-muted-foreground']">
        {{ service.fullDescription || service.shortDescription }}
      </p>

      <div class="mt-6 flex flex-wrap gap-2">
        <span v-for="topic in service.topics" :key="topic" :class="[
          'rounded-pill px-3 py-1 text-xs',
          isFeatured
            ? 'border border-white/15 bg-white/10 text-sage-200'
            : 'bg-sage-100 text-primary-700 dark:bg-primary-950 dark:text-sage-300',
        ]">
          {{ topic }}
        </span>
      </div>
    </CardContent>

    <CardFooter class="pt-8">
      <Button as-child variant="ghost" :class="[
        'rounded-pill px-0',
        isFeatured
          ? 'text-sage-200 hover:bg-transparent hover:text-white'
          : 'text-primary hover:bg-transparent hover:text-primary-700 dark:hover:text-primary-foreground',
      ]">
        <NuxtLink to="/#contact">
          <span>درباره شروع این مسیر</span>
          <ArrowLeft class="size-4" />
        </NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>
