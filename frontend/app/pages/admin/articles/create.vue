<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Save, Eye } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { adminDashboardData } from '~/data/admin'
import { useArticlesStore } from '~/stores/articles'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const articlesStore = useArticlesStore()
const formData = adminDashboardData.articlesSection.formModal
const pageData = adminDashboardData.articlesPage.create

const title = ref('')
const slug = ref('')
const summary = ref('')
const content = ref('')
const isPublished = ref(true)
const isSubmitting = ref(false)

// تبدیل خودکار عنوان به اسلاگ سئو‌پسند
const handleTitleBlur = () => {
  if (!slug.value.trim() && title.value.trim()) {
    slug.value = title.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0600-\u06FF-]+/g, '')
  }
}

const handleSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    return
  }

  isSubmitting.value = true
  const created = await articlesStore.createArticle({
    title: title.value.trim(),
    slug: slug.value.trim() || undefined,
    summary: summary.value.trim() || undefined,
    content: content.value.trim(),
    is_published: isPublished.value,
  })

  isSubmitting.value = false

  if (created) {
    router.push('/admin/articles')
  }
}
</script>

<template>
  <div class="space-y-6 max-w-4xl mx-auto" dir="rtl">
    <!-- هدر فرم -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <Button variant="ghost" size="sm" class="size-9 p-0 rounded-xl" @click="router.push('/admin/articles')">
          <ArrowRight class="size-4" />
        </Button>
        <div>
          <h1 class="text-lg font-bold text-foreground">
            {{ pageData.headerTitle }}
          </h1>
          <p class="text-xs text-muted-foreground mt-0.5">
            {{ pageData.headerSubtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="text-xs h-9 rounded-xl" @click="router.push('/admin/articles')">
          {{ formData.cancelButton }}
        </Button>

        <Button size="sm" class="text-xs h-9 rounded-xl gap-2"
          :disabled="isSubmitting || !title.trim() || !content.trim()" @click="handleSubmit">
          <Save class="size-4" />
          <span>{{ pageData.submitButton }}</span>
        </Button>
      </div>
    </div>

    <!-- بدنه فرم -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- ستون اصلی ورودی محتوا -->
      <div class="lg:col-span-2 space-y-5 bg-card p-6 rounded-2xl border border-border/60">
        <div class="space-y-2">
          <label class="text-xs font-semibold text-foreground">
            {{ formData.titleLabel }}
          </label>
          <Input v-model="title" :placeholder="formData.titlePlaceholder" class="text-xs rounded-xl"
            @blur="handleTitleBlur" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold text-foreground">
            {{ formData.slugLabel }}
          </label>
          <Input v-model="slug" :placeholder="formData.slugPlaceholder"
            class="text-xs rounded-xl font-mono text-left dir-ltr" />
          <p class="text-[11px] text-muted-foreground">
            {{ formData.slugHelp }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold text-foreground">
            {{ formData.summaryLabel }}
          </label>
          <Textarea v-model="summary" :placeholder="formData.summaryPlaceholder" rows="3"
            class="text-xs rounded-xl resize-none" />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground">
              {{ formData.contentLabel }}
            </label>
            <span class="text-[11px] text-muted-foreground">
              {{ formData.contentHelp }}
            </span>
          </div>
          <Textarea v-model="content" :placeholder="formData.contentPlaceholder" rows="14"
            class="text-xs rounded-xl font-mono leading-relaxed" />
        </div>
      </div>

      <!-- ستون کناری تنظیمات وضعیت انتشار -->
      <div class="space-y-5">
        <div class="bg-card p-5 rounded-2xl border border-border/60 space-y-4">
          <h3 class="text-xs font-bold text-foreground">
            {{ formData.sidebarTitle }}
          </h3>

          <div class="flex items-center justify-between p-3 rounded-xl bg-muted/40">
            <div class="space-y-0.5">
              <span class="text-xs font-medium text-foreground block">
                {{ formData.publishStatusLabel }}
              </span>
              <span class="text-[10px] text-muted-foreground block">
                {{ isPublished ? formData.publishStatusActiveHelp : formData.publishStatusDraftHelp }}
              </span>
            </div>

            <input v-model="isPublished" type="checkbox" class="size-4 accent-primary rounded cursor-pointer" />
          </div>

          <div class="pt-2 text-[11px] text-muted-foreground space-y-1">
            <div class="flex items-center gap-1.5">
              <Eye class="size-3.5" />
              <span>وضعیت:</span>
              <strong :class="isPublished ? 'text-emerald-600' : 'text-amber-600'">
                {{ isPublished ? 'انتشار عمومی' : 'پیش‌نویس' }}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
