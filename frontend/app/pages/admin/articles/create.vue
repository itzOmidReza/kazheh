<script setup lang="ts">
import { toast } from 'vue-sonner'
import { siteConfig } from '~/data'
import type { ArticleFormData } from '~/components/admin/articles/ArticleForm.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `نگارش مقاله جدید | ${siteConfig.name}` })

const router = useRouter()
const isSubmitting = ref(false)

const form = reactive<ArticleFormData>({
  title: '',
  slug: '',
  summary: '',
  content: '',
  is_published: true,
})

const handleCreate = () => {
  if (!form.title.trim() || !form.content.trim()) {
    toast.error('وارد کردن عنوان و متن مقاله الزامی است.')
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.success('مقاله جدید با موفقیت ذخیره شد.')
    router.push('/admin/articles')
  }, 350)
}
</script>

<template>
  <AdminArticlesArticleForm v-model="form" mode="create" :is-submitting="isSubmitting" @submit="handleCreate" />
</template>
