<script setup lang="ts">
import { User, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminDashboardData } from '~/data'

export interface ProfileData {
  full_name: string
  username: string
  phone: string
}

const props = defineProps<{
  modelValue: ProfileData
  isUpdating?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: ProfileData): void
  (e: 'submit'): void
}>()

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4 text-right" dir="rtl">
    <div class="border-b border-border/60 pb-3">
      <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
        <User class="size-4 text-primary" />
        <span>مشخصات فردی و ارتباطی</span>
      </h3>
      <p class="text-xs text-muted-foreground mt-0.5">
        نام و شماره تماسی که به عنوان مدیر برای شما نمایش داده می‌شود.
      </p>
    </div>

    <form class="space-y-4 text-xs" @submit.prevent="emit('submit')">
      <div class="space-y-1.5">
        <Label for="p-name" class="text-xs">{{ adminDashboardData.profileSection.fields.fullName }}</Label>
        <Input id="p-name" v-model="form.full_name" type="text" required class="rounded-xl h-10 text-xs" />
      </div>

      <div class="space-y-1.5">
        <Label for="p-username" class="text-xs">{{ adminDashboardData.profileSection.fields.username }}</Label>
        <Input id="p-username" v-model="form.username" type="text" disabled dir="ltr"
          class="rounded-xl h-10 text-xs bg-muted/40 cursor-not-allowed" />
        <p class="text-[11px] text-muted-foreground">نام کاربری سیستمی غیرقابل تغییر است.</p>
      </div>

      <div class="space-y-1.5">
        <Label for="p-phone" class="text-xs">{{ adminDashboardData.profileSection.fields.phone }}</Label>
        <Input id="p-phone" v-model="form.phone" type="tel" dir="ltr" required class="rounded-xl h-10 text-xs" />
      </div>

      <div class="pt-2">
        <Button type="submit" :disabled="isUpdating"
          class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5">
          <Loader2 v-if="isUpdating" class="size-3.5 animate-spin" />
          <template v-else>
            {{ adminDashboardData.profileSection.buttons.saveInfo }}
          </template>
        </Button>
      </div>
    </form>
  </div>
</template>
