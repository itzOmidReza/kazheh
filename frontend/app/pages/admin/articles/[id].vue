<script setup lang="ts">
import { toast } from 'vue-sonner'
import {
  siteConfig,
  adminDashboardData,
  initialAdminArticles,
} from '~/data'
import type { ArticleFormData } from '~/components/admin/articles/ArticleForm.vue'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const isSubmitting = ref(false)
const isLoading = ref(true)

const articleId = computed(() => Number(route.params.id))

const form = reactive<ArticleFormData>({
  title: '',
  slug: '',
  summary: '',
  content: '',
  is_published: false,
})

useHead({
  title: computed(
    () =>
      `${adminDashboardData.articlesPage.edit.headTitlePrefix} ${form.title || adminDashboardData.articlesPage.edit.headTitleFallback
      } | ${siteConfig.name}`
  ),
})

onMounted(() => {
  setTimeout(() => {
    // بارگذاری داده اولیه ماک از لایه متمرکز بر اساس ID یا پیش‌فرض اول
    const found =
      initialAdminArticles.find((a) => a.id === articleId.value) ||
      initialAdminArticles[0]
    if (found) {
      form.title = found.title
      form.slug = found.slug
      form.summary = found.summary || ''
      form.content = found.content || ''
      form.is_published = found.is_published
    }
    isLoading.value = false
  }, 250)
})

const handleUpdate = () => {
  if (!form.title.trim() || !form.content.trim()) {
    toast.error(adminDashboardData.articlesPage.edit.toasts.validationError)
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.success(adminDashboardData.articlesPage.edit.toasts.saveSuccess)
    router.push('/admin/articles')
  }, 350)
}

const handleDelete = () => {
  if (!confirm(adminDashboardData.articlesPage.edit.deleteConfirm)) return
  toast.success(adminDashboardData.articlesPage.edit.toasts.deleteSuccess)
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
