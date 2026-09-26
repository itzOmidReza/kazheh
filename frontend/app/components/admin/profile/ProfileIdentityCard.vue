<script setup lang="ts">
import { User, ShieldCheck } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'

defineProps<{
  fullName: string
  username: string
  phone: string
}>()
</script>

<template>
  <div
    class="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card p-5 sm:flex-row sm:items-center sm:justify-between shadow-xs text-right"
    dir="rtl">
    <div class="flex items-center gap-4">
      <div
        class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold shadow-soft">
        <User class="size-7" />
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-base font-bold text-foreground">
            {{ fullName }}
          </h2>
          <Badge class="rounded-pill bg-primary/10 text-primary border-primary/20 text-[10px]">
            دسترسی مدیریت
          </Badge>
        </div>
        <p class="text-xs text-muted-foreground mt-0.5" dir="ltr">
          @{{ username }} • {{ phone }}
        </p>
      </div>
    </div>

    <div
      class="flex items-center gap-2 border-t border-border/60 pt-3 sm:border-0 sm:pt-0 text-xs text-muted-foreground">
      <ShieldCheck class="size-4 text-emerald-500" />
      <span>نشست امن و فعال در کاژه</span>
    </div>
  </div>
</template>
