<script setup lang="ts">
import {
  ArrowRight,
  FileText,
  Save,
  Loader2,
  Sparkles,
  Eye,
  CheckCircle2,
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

useHead({
  title: `نگارش مقاله جدید | ${siteConfig.name}`,
})

const router = useRouter()
const { apiFetch } = useApi()

const isSubmitting = ref(false)

const form = reactive({
  title: '',
  slug: '',
  summary: '',
  content: '',
  is_published: true,
})

// تولید خودکار Slug بر اساس عنوان
const generateSlug = () => {
  if (!form.title.trim() || form.slug.trim()) return
  form.slug = form.title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF\-]/g, '')
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

    await apiFetch<ArticleResponse>('/articles', {
      method: 'POST',
      body: payload,
    })

    toast.success('مقاله منتشر شد', {
      description: `مقاله «${form.title}» با موفقیت ذخیره گردید.`,
    })

    router.push('/admin/articles')
  } catch (err: any) {
    const detail = err?.data?.detail
    const msg = typeof detail === 'string' ? detail : 'خطا در ثبت مقاله.'
    toast.error('خطای ذخیره‌سازی', {
      description: msg,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- هدر و دکمه بازگشت -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <NuxtLink to="/admin/articles" class="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowRight class="size-3.5" />
            <span>مدیریت مقالات</span>
          </NuxtLink>
          <span>/</span>
          <span class="text-foreground font-medium">نگارش مقاله جدید</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-foreground">
          انتشار مطلب تخصصی در پایگاه دانش
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="rounded-pill text-xs h-9 px-4" as-child>
          <NuxtLink to="/admin/articles">
            انصراف
          </NuxtLink>
        </Button>

        <Button :disabled="isSubmitting"
          class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5 gap-1.5"
          @click="handleSubmit">
          <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
          <template v-else>
            <Save class="size-3.5" />
            <span>ذخیره و انتشار</span>
          </template>
        </Button>
      </div>
    </div>

    <!-- فرم ایجاد مقاله -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- ستون اصلی فرم (عنوان، محتوا و خلاصه) -->
      <div class="space-y-6 lg:col-span-2">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs space-y-5">
          <div class="space-y-2">
            <Label for="art-title" class="text-xs font-semibold">عنوان اصلی مقاله *</Label>
            <Input id="art-title" v-model="form.title" type="text"
              placeholder="مثلاً: راهکارهای نوین کنترل نشخوار فکری و اضطراب"
              class="rounded-2xl h-11 text-sm font-medium" @blur="generateSlug" />
          </div>

          <div class="space-y-2">
            <Label for="art-summary" class="text-xs font-semibold">چکیده / خلاصه کوتاه</Label>
            <Textarea id="art-summary" v-model="form.summary" rows="3"
              placeholder="یک یا دو جمله برای معرفی کلی در کارت‌های صفحه اصلی و نتایج جستجوی گوگل..."
              class="rounded-2xl text-xs leading-relaxed" />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="art-content" class="text-xs font-semibold">متن کامل مقاله (پشتیبانی از Markdown) *</Label>
              <span class="text-[11px] text-muted-foreground">می‌توانید از تیترهای # و ## و لیست‌ها استفاده کنید</span>
            </div>
            <Textarea id="art-content" v-model="form.content" rows="16"
              placeholder="متن مقاله را به همراه پاراگراف‌بندی دقیق در اینجا بنویسید..."
              class="rounded-2xl text-xs leading-relaxed font-sans" />
          </div>
        </div>
      </div>

      <!-- ستون کناری تنظیمات و سئو -->
      <div class="space-y-6 lg:col-span-1">
        <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-5">
          <h2 class="text-sm font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
            <Sparkles class="size-4 text-primary" />
            <span>تنظیمات انتشار و آدرس</span>
          </h2>

          <div class="space-y-2">
            <Label for="art-slug" class="text-xs font-semibold">نامک یکتا (Slug در آدرس اینترنتی)</Label>
            <Input id="art-slug" v-model="form.slug" type="text" dir="ltr" placeholder="anxiety-management"
              class="rounded-xl h-10 text-xs font-mono" />
            <p class="text-[11px] text-muted-foreground leading-normal">
              آدرس دسترسی: <code class="font-mono text-primary">/articles/{{ form.slug || '...' }}</code>
            </p>
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
              {{ form.is_published ? 'این مطلب بلافاصله در وب‌سایت عمومی برای مراجعین نمایش داده خواهد شد.' : 'این مقاله به عنوان پیش‌نویس ذخیره می‌شود و فقط ادمین به آن دسترسی دارد.' }}
            </p>
          </div>

          <Button :disabled="isSubmitting"
            class="w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-10"
            @click="handleSubmit">
            <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
            <template v-else>
              <span>ثبت و ذخیره مقاله</span>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
