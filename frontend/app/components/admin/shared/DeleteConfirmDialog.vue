<script setup lang="ts">
import { AlertCircle, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { adminDashboardData } from '~/data'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    description?: string
    confirmLabel?: string
    isDeleting?: boolean
  }>(),
  {
    title: adminDashboardData.deleteConfirmModal.defaultTitle,
    description: adminDashboardData.deleteConfirmModal.description,
    confirmLabel: adminDashboardData.deleteConfirmModal.confirmButton,
    isDeleting: false,
  }
)

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="w-[min(94vw,28rem)] rounded-3xl bg-card border-border p-5 sm:p-6 text-foreground" dir="rtl">
      <DialogHeader class="text-right">
        <DialogTitle class="text-base font-bold text-destructive flex items-center gap-2">
          <AlertCircle class="size-5" />
          <span>{{ title }}</span>
        </DialogTitle>
        <DialogDescription class="text-xs text-muted-foreground pt-2">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="mt-6 flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" class="rounded-pill text-xs px-4" @click="emit('update:open', false)">
          {{ adminDashboardData.deleteConfirmModal.cancelButton }}
        </Button>

        <Button variant="destructive" size="sm" :disabled="isDeleting" class="rounded-pill text-xs px-4 gap-1.5"
          @click="emit('confirm')">
          <Loader2 v-if="isDeleting" class="size-3.5 animate-spin" />
          <template v-else>
            {{ confirmLabel }}
          </template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
