<script setup lang="ts">
import {
  ArrowRight,
  Save,
  Loader2,
  Trash2,
  ExternalLink,
  Sparkles,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'
import type { ArticleResponse } from '~/types/api'
import { siteConfig } from '~/data'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const route = useRoute()
const router = useRouter()
const { apiFetch } = useApi()

const articleId = computed(() => route.params.id as string)

const isLoading = ref(true)
const isSubmitting = ref(false)

const form = reactive({
  title: '',
  slug: '',
  summary: '',
  content: '',
  is_published: false,
})

useHead({
  title: computed(() => `ویرایش: ${form.title || 'مقاله'} | ${siteConfig.name}`),
})

const fetchArticle = async () => {
  isLoading.value = true
  try {
    const data = await apiFetch<ArticleResponse>(`/articles/admin/${articleId.value}`)
    if (data) {
      form.title = data.title
      form.slug = data.slug
      form.summary = data.summary || ''
      form.content = data.content
      form.is_published = data.is_published
    }
  } catch {
    toast.error('خطا در بارگذاری', {
      description: 'امکان بارگذاری محتوای مقاله وجود ندارد.',
    })
    router.push('/admin/articles')
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  if (!form.title.trim() || !form.content.trim()) {
    toast.error('اطلاعات ناقص است', {
      description: 'وارد کردن عنوان و متن اصلی مقاله الزامی است.',
    })
    return
  }

  isSubmitting.value = true
  try {
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || null,
      summary: form.summary.trim() || null,
      content: form.content.trim(),
      is_published: form.is_published,
    }

    await apiFetch<ArticleResponse>(`/articles/${articleId.value}`, {
      method: 'PATCH',
      body: payload,
    })

    toast.success('مقاله بروزرسانی شد', {
      description: `تغییرات مقاله «${form.title}» با موفقیت ذخیره گردید.`,
    })

    router.push('/admin/articles')
  } catch (err: any) {
    toast.error('خطا در ذخیره‌سازی')
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return

  try {
    await apiFetch(`/articles/${articleId.value}`, { method: 'DELETE' })
    toast.success('مقاله حذف شد')
    router.push('/admin/articles')
  } catch {
    toast.error('خطا در حذف مقاله')
  }
}

onMounted(() => {
  fetchArticle()
})
</script>

<template>
  <div class="space-y-6">
    <!-- هدر بالا -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <NuxtLink to="/admin/articles" class="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowRight class="size-3.5" />
            <span>مدیریت مقالات</span>
          </NuxtLink>
          <span>/</span>
          <span class="text-foreground font-medium">ویرایش مقاله</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground truncate max-w-xl">
          {{ form.title || 'درحال بارگذاری...' }}
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <Button v-if="form.is_published" variant="outline" size="sm" class="rounded-pill text-xs h-9 px-3 gap-1.5"
          as-child>
          <NuxtLink :to="`/articles/${form.slug}`" target="_blank">
            <span>مشاهده در سایت</span>
            <ExternalLink class="size-3.5" />
          </NuxtLink>
        </Button>

        <Button variant="destructive" size="sm" class="rounded-pill text-xs h-9 px-3 gap-1.5" @click="handleDelete">
          <Trash2 class="size-3.5" />
          <span>حذف مقاله</span>
        </Button>

        <Button :disabled="isSubmitting"
          class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5 gap-1.5"
          @click="handleSubmit">
          <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
          <template v-else>
            <Save class="size-3.5" />
            <span>بروزرسانی تغییرات</span>
          </template>
        </Button>
      </div>
    </div>

    <!-- فرم ویرایش -->
    <div v-if="isLoading" class="space-y-4">
      <div class="h-28 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
      <div class="h-80 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="space-y-6 lg:col-span-2">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-5">
          <div class="space-y-2">
            <Label for="art-title" class="text-xs font-semibold">عنوان اصلی مقاله *</Label>
            <Input id="art-title" v-model="form.title" type="text" class="rounded-2xl h-11 text-sm font-medium" />
          </div>

          <div class="space-y-2">
            <Label for="art-summary" class="text-xs font-semibold">چکیده / خلاصه کوتاه</Label>
            <Textarea id="art-summary" v-model="form.summary" rows="3" class="rounded-2xl text-xs leading-relaxed" />
          </div>

          <div class="space-y-2">
            <Label for="art-content" class="text-xs font-semibold">متن کامل مقاله (Markdown) *</Label>
            <Textarea id="art-content" v-model="form.content" rows="16"
              class="rounded-2xl text-xs leading-relaxed font-sans" />
          </div>
        </div>
      </div>

      <div class="space-y-6 lg:col-span-1">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-5">
          <h2 class="text-sm font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
            <Sparkles class="size-4 text-primary" />
            <span>تنظیمات انتشار و آدرس</span>
          </h2>

          <div class="space-y-2">
            <Label for="art-slug" class="text-xs font-semibold">نامک یکتا (Slug)</Label>
            <Input id="art-slug" v-model="form.slug" type="text" dir="ltr" class="rounded-xl h-10 text-xs font-mono" />
          </div>

          <div class="rounded-2xl bg-secondary/40 p-4 border border-border/60 space-y-3">
            <div class="flex items-center gap-2.5">
              <input id="art-publish-status" v-model="form.is_published" type="checkbox"
                class="size-4.5 rounded-lg border-border text-primary accent-primary cursor-pointer" />
              <Label for="art-publish-status" class="text-xs font-bold text-foreground cursor-pointer">
                وضعیت انتشار عمومی
              </Label>
            </div>
            <p class="text-[11px] text-muted-foreground leading-relaxed">
              {{ form.is_published ? 'مقاله در حال حاضر در سایت فعال و قابل مشاهده است.' : 'مقاله به صورت پیش‌نویس ذخیره است.' }}
            </p>
          </div>

          <Button :disabled="isSubmitting"
            class="w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-10"
            @click="handleSubmit">
            <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
            <template v-else>
              <span>ذخیره تغییرات</span>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
