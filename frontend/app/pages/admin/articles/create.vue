<script setup lang="ts">
import { toast } from 'vue-sonner'
import { siteConfig, adminDashboardData } from '~/data'
import type { ArticleFormData } from '~/components/admin/articles/ArticleForm.vue'

definePageMeta({ layout: 'admin' })
useHead({ title: `${adminDashboardData.articlesPage.create.headTitle} | ${siteConfig.name}` })

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
    toast.error(adminDashboardData.articlesPage.create.toasts.validationError)
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.success(adminDashboardData.articlesPage.create.toasts.saveSuccess)
    router.push('/admin/articles')
  }, 350)
}
</script>

<template>
  <AdminArticlesArticleForm v-model="form" mode="create" :is-submitting="isSubmitting" @submit="handleCreate" />
</template>
