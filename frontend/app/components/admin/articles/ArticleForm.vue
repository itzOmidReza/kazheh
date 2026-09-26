<script setup lang="ts">
import { Sparkles, Save, Loader2, ArrowRight, Trash2, ExternalLink } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { adminDashboardData } from '~/data'

export interface ArticleFormData {
  title: string
  slug: string
  summary: string
  content: string
  is_published: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue: ArticleFormData
    mode?: 'create' | 'edit'
    isSubmitting?: boolean
  }>(),
  {
    mode: 'create',
    isSubmitting: false,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: ArticleFormData): void
  (e: 'submit'): void
  (e: 'delete'): void
}>()

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const autoGenerateSlug = () => {
  if (props.mode !== 'create' || !form.value.title.trim() || form.value.slug.trim()) return
  form.value.slug = form.value.title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF\-]/g, '')
}
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- هدر بالای فرم -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
      <div class="space-y-1 text-right">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <NuxtLink to="/admin/articles" class="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowRight class="size-3.5 rotate-180" />
            <span>{{ adminDashboardData.articlesPage.create.headerBack }}</span>
          </NuxtLink>
          <span>/</span>
          <span class="text-foreground font-medium">
            {{ mode === 'create' ? adminDashboardData.articlesPage.create.headerCreate :
              adminDashboardData.articlesPage.edit.headerEdit }}
          </span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground truncate max-w-xl">
          {{ mode === 'create' ? adminDashboardData.articlesPage.create.headerSubtitle : (form.title ||
            adminDashboardData.articlesPage.edit.headerTitleFallback) }}
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <Button v-if="mode === 'edit' && form.is_published" variant="outline" size="sm"
          class="rounded-pill text-xs h-9 px-3 gap-1.5" as-child>
          <NuxtLink :to="`/articles/${form.slug}`" target="_blank">
            <span>{{ adminDashboardData.articlesPage.edit.viewInWebsite }}</span>
            <ExternalLink class="size-3.5" />
          </NuxtLink>
        </Button>

        <Button v-if="mode === 'edit'" variant="destructive" size="sm" class="rounded-pill text-xs h-9 px-3 gap-1.5"
          @click="emit('delete')">
          <Trash2 class="size-3.5" />
          <span>{{ adminDashboardData.articlesPage.edit.deleteButton }}</span>
        </Button>

        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 px-4" as-child>
          <NuxtLink to="/admin/articles">
            {{ adminDashboardData.articlesPage.create.cancelButton }}
          </NuxtLink>
        </Button>

        <Button :disabled="isSubmitting"
          class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5 gap-1.5"
          @click="emit('submit')">
          <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
          <template v-else>
            <Save class="size-3.5" />
            <span>{{ mode === 'create' ? adminDashboardData.articlesPage.create.submitButton :
              adminDashboardData.articlesPage.edit.submitButton }}</span>
          </template>
        </Button>
      </div>
    </div>

    <!-- بدنه فرم -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 text-right">
      <div class="space-y-6 lg:col-span-2">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-5">
          <div class="space-y-2">
            <Label for="art-title" class="text-xs font-semibold">{{
              adminDashboardData.articlesSection.formModal.titleLabel
              }}</Label>
            <Input id="art-title" v-model="form.title" type="text"
              :placeholder="adminDashboardData.articlesSection.formModal.titlePlaceholder"
              class="rounded-2xl h-11 text-sm font-medium" @blur="autoGenerateSlug" />
          </div>

          <div class="space-y-2">
            <Label for="art-summary" class="text-xs font-semibold">{{
              adminDashboardData.articlesSection.formModal.summaryLabel }}</Label>
            <Textarea id="art-summary" v-model="form.summary" rows="3"
              :placeholder="adminDashboardData.articlesSection.formModal.summaryPlaceholder"
              class="rounded-2xl text-xs leading-relaxed" />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="art-content" class="text-xs font-semibold">{{
                adminDashboardData.articlesSection.formModal.contentLabel }}</Label>
              <span class="text-[11px] text-muted-foreground">{{
                adminDashboardData.articlesSection.formModal.contentHelp
                }}</span>
            </div>
            <Textarea id="art-content" v-model="form.content" rows="16"
              :placeholder="adminDashboardData.articlesSection.formModal.contentPlaceholder"
              class="rounded-2xl text-xs leading-relaxed font-sans" />
          </div>
        </div>
      </div>

      <!-- ستون سایدبار تنظیمات انتشار -->
      <div class="space-y-6 lg:col-span-1">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-5">
          <h2 class="text-sm font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
            <Sparkles class="size-4 text-primary" />
            <span>{{ adminDashboardData.articlesSection.formModal.sidebarTitle }}</span>
          </h2>

          <div class="space-y-2">
            <Label for="art-slug" class="text-xs font-semibold">{{
              adminDashboardData.articlesSection.formModal.slugLabel
              }}</Label>
            <Input id="art-slug" v-model="form.slug" type="text" dir="ltr"
              :placeholder="adminDashboardData.articlesSection.formModal.slugPlaceholder"
              class="rounded-xl h-10 text-xs font-mono" />
            <p class="text-[11px] text-muted-foreground leading-normal">
              {{ adminDashboardData.articlesSection.formModal.slugAddressPrefix }} <code
                class="font-mono text-primary">/articles/{{ form.slug || '...' }}</code>
            </p>
          </div>

          <div class="rounded-2xl bg-secondary/40 p-4 border border-border/60 space-y-3">
            <div class="flex items-center gap-2.5">
              <input id="art-publish-status" v-model="form.is_published" type="checkbox"
                class="size-4.5 rounded-lg border-border text-primary accent-primary cursor-pointer" />
              <Label for="art-publish-status" class="text-xs font-bold text-foreground cursor-pointer">
                {{ adminDashboardData.articlesSection.formModal.publishStatusLabel }}
              </Label>
            </div>
            <p class="text-[11px] text-muted-foreground leading-relaxed">
              {{ form.is_published ? adminDashboardData.articlesSection.formModal.publishStatusActiveHelp :
                adminDashboardData.articlesSection.formModal.publishStatusDraftHelp }}
            </p>
          </div>

          <Button :disabled="isSubmitting"
            class="w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-10"
            @click="emit('submit')">
            <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
            <template v-else>
              <span>{{ mode === 'create' ? adminDashboardData.articlesSection.formModal.submitCreate :
                adminDashboardData.articlesSection.formModal.submitEdit }}</span>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
