<script setup lang="ts">
import { toast } from 'vue-sonner'
import { siteConfig } from '~/data'
import type { ArticleFormData } from '~/components/admin/articles/ArticleForm.vue'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const isSubmitting = ref(false)
const isLoading = ref(true)

const form = reactive<ArticleFormData>({
  title: '',
  slug: '',
  summary: '',
  content: '',
  is_published: false,
})

useHead({
  title: computed(() => `ویرایش: ${form.title || 'مقاله'} | ${siteConfig.name}`),
})

onMounted(() => {
  setTimeout(() => {
    form.title = 'چگونه اضطراب خود را کنترل کنیم؟'
    form.slug = 'understanding-anxiety'
    form.summary = 'راهکارهای علمی و اثبات‌شده برای مدیریت استرس روزمره مراجعین.'
    form.content = 'متن پیش‌فرض و آزمایشی مقاله کلینیک کاژه جهت تست قالب و فرمت‌بندی.'
    form.is_published = true
    isLoading.value = false
  }, 250)
})

const handleUpdate = () => {
  if (!form.title.trim() || !form.content.trim()) {
    toast.error('وارد کردن عنوان و متن اصلی مقاله الزامی است.')
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.success('تغییرات مقاله با موفقیت ذخیره شد.')
    router.push('/admin/articles')
  }, 350)
}

const handleDelete = () => {
  if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return
  toast.success('مقاله حذف شد.')
  router.push('/admin/articles')
}
</script>

<template>
  <div v-if="isLoading" class="space-y-4" dir="rtl">
    <div class="h-24 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
    <div class="h-80 animate-pulse rounded-3xl border border-border/60 bg-muted/30" />
  </div>

  <AdminArticlesArticleForm v-else v-model="form" mode="edit" :is-submitting="isSubmitting" @submit="handleUpdate"
    @delete="handleDelete" />
</template>
