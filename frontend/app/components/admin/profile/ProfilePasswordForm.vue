<script setup lang="ts">
import { KeyRound, Lock, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminDashboardData } from '~/data'

export interface PasswordData {
  current_password: string
  new_password: string
  confirm_password: string
}

const props = defineProps<{
  modelValue: PasswordData
  isUpdating?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: PasswordData): void
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
        <KeyRound class="size-4 text-primary" />
        <span>{{ adminDashboardData.profileSection.passwordForm.title }}</span>
      </h3>
      <p class="text-xs text-muted-foreground mt-0.5">
        {{ adminDashboardData.profileSection.passwordForm.subtitle }}
      </p>
    </div>

    <form class="space-y-4 text-xs" @submit.prevent="emit('submit')">
      <div class="space-y-1.5">
        <Label for="pass-current" class="text-xs">
          {{ adminDashboardData.profileSection.fields.currentPassword }}
        </Label>
        <Input id="pass-current" v-model="form.current_password" type="password" dir="ltr" placeholder="••••••••"
          required class="rounded-xl h-10 text-xs" />
      </div>

      <div class="space-y-1.5">
        <Label for="pass-new" class="text-xs">
          {{ adminDashboardData.profileSection.fields.newPassword }}
        </Label>
        <Input id="pass-new" v-model="form.new_password" type="password" dir="ltr"
          :placeholder="adminDashboardData.profileSection.passwordForm.newPasswordPlaceholder" required
          class="rounded-xl h-10 text-xs" />
      </div>

      <div class="space-y-1.5">
        <Label for="pass-confirm" class="text-xs">
          {{ adminDashboardData.profileSection.fields.confirmPassword }}
        </Label>
        <Input id="pass-confirm" v-model="form.confirm_password" type="password" dir="ltr"
          :placeholder="adminDashboardData.profileSection.passwordForm.confirmPasswordPlaceholder" required
          class="rounded-xl h-10 text-xs" />
      </div>

      <div class="pt-2">
        <Button type="submit" :disabled="isUpdating" variant="outline" class="rounded-pill text-xs h-9 px-5 gap-1.5">
          <Loader2 v-if="isUpdating" class="size-3.5 animate-spin" />
          <template v-else>
            <Lock class="size-3.5" />
            <span>{{ adminDashboardData.profileSection.buttons.changePassword }}</span>
          </template>
        </Button>
      </div>
    </form>
  </div>
</template>
