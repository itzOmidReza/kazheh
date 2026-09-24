<script setup lang="ts">
import {
  CheckCircle2,
  HeartHandshake,
  LockKeyhole,
  UsersRound,
} from '@lucide/vue'

const trustItems = [
  {
    icon: LockKeyhole,
    title: 'محرمانگی گفتگوها',
    description: 'حریم خصوصی شما در تمام مراحل حفظ می‌شود.',
  },
  {
    icon: HeartHandshake,
    title: 'رویکرد انسانی',
    description: 'شنیدن و همراهی بدون قضاوت و فشار.',
  },
  {
    icon: UsersRound,
    title: 'تمرکز بر نیاز شما',
    description: 'مسیر گفتگو بر اساس شرایط شما شکل می‌گیرد.',
  },
  {
    icon: CheckCircle2,
    title: 'شروع ساده',
    description: 'برای آغاز مسیر لازم نیست همه پاسخ‌ها را بدانید.',
  },
]
</script>

<template>
  <section aria-label="ویژگی‌های کلینیک" class="border-y border-border/80 bg-card">
    <div class="site-container">
      <div class="grid grid-cols-1 divide-y divide-border/80 sm:grid-cols-2 sm:divide-y-0 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        <div v-for="item in trustItems" :key="item.title" class="flex items-start gap-4 py-6 sm:py-7">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-primary-700">
            <component :is="item.icon" class="size-5" />
          </span>

          <div>
            <h2 class="text-sm font-bold text-primary-900">
              {{ item.title }}
            </h2>

            <p class="mt-1 text-xs leading-6 text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
