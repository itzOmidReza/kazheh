<script setup lang="ts">
import { Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'

const props = defineProps<{
  title?: string
  text?: string
}>()

const shareArticle = async () => {
  if (!import.meta.client) return

  const shareData = {
    title: props.title || '',
    text: props.text || '',
    url: window.location.href,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('پیوند مقاله در کلیپ‌بورد کپی شد.')
    }
  } catch {
    // صرف‌نظر از انصراف کاربر
  }
}
</script>

<template>
  <Button type="button" variant="outline" class="rounded-pill gap-2 text-xs" @click="shareArticle">
    <Share2 class="size-4" />
    <span>اشتراک‌گذاری مقاله</span>
  </Button>
</template>
