<script setup lang="ts">
import { Clock, Edit, ExternalLink, Trash2 } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AdminArticleItem } from '~/data'
import { adminDashboardData } from '~/data'

export type ArticleItem = AdminArticleItem

defineProps<{
  article: ArticleItem
}>()

const emit = defineEmits<{
  (e: 'delete', item: ArticleItem): void
}>()

const formatDate = (isoString: string) => {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoString))
  } catch {
    return isoString
  }
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-4.5 transition-all hover:shadow-xs">
    <div class="space-y-1.5 flex-1 min-w-0 text-right">
      <div class="flex flex-wrap items-center gap-2">
        <NuxtLink :to="`/admin/articles/${article.id}`"
          class="text-sm font-bold text-foreground hover:text-primary transition-colors">
          {{ article.title }}
        </NuxtLink>

        <Badge :class="[
          'rounded-pill text-[10px] px-2 py-0.5',
          article.is_published
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
            : 'bg-secondary text-secondary-foreground border-transparent',
        ]">
          {{ article.is_published ? adminDashboardData.articlesSection.badgePublished :
            adminDashboardData.articlesSection.badgeDraft }}
        </Badge>

        <span class="text-[11px] text-muted-foreground font-mono" dir="ltr">
          /articles/{{ article.slug }}
        </span>
      </div>

      <p v-if="article.summary" class="line-clamp-1 text-xs text-muted-foreground leading-relaxed text-right">
        {{ article.summary }}
      </p>

      <div class="flex items-center gap-2 text-[11px] text-muted-foreground/80 pt-0.5">
        <Clock class="size-3" />
        <span>{{ adminDashboardData.articlesSection.registeredPrefix }} {{ formatDate(article.created_at) }}</span>
      </div>
    </div>

    <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
      <Button v-if="article.is_published" variant="outline" size="sm" as-child
        class="rounded-xl text-xs h-8.5 px-3 gap-1">
        <NuxtLink :to="`/articles/${article.slug}`" target="_blank">
          <span>{{ adminDashboardData.articlesSection.viewButton }}</span>
          <ExternalLink class="size-3" />
        </NuxtLink>
      </Button>

      <Button variant="outline" size="sm" class="rounded-xl text-xs h-8.5 px-3 gap-1" as-child>
        <NuxtLink :to="`/admin/articles/${article.id}`">
          <Edit class="size-3" />
          <span>{{ adminDashboardData.articlesSection.editButton }}</span>
        </NuxtLink>
      </Button>

      <Button size="icon" variant="ghost" class="size-8.5 rounded-xl text-destructive hover:bg-destructive/10"
        @click="emit('delete', article)">
        <Trash2 class="size-4" />
      </Button>
    </div>
  </div>
</template>
