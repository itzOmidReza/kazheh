<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useArticlesStore } from '~/stores/articles'
import ArticleForm, { type ArticleFormData } from '~/components/admin/articles/ArticleForm.vue'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

const articleId = Number(route.params.id)
const formData = ref<ArticleFormData | null>(null)
const isLoading = ref(true)
const isSubmitting = ref(false)

onMounted(async () => {
  if (Number.isNaN(articleId)) {
    router.push('/admin/articles')
    return
  }

  isLoading.value = true
  const found = await articlesStore.getArticleById(articleId)
  if (!found) {
    toast.error('مقاله مورد نظر یافت نشد.')
    router.push('/admin/articles')
    return
  }

  formData.value = {
    title: found.title,
    slug: found.slug,
    summary: found.summary ?? '',
    content: found.content,
    is_published: found.is_published,
  }

  isLoading.value = false
})

const handleSubmit = async () => {
  if (!formData.value) return

  isSubmitting.value = true
  const updated = await articlesStore.updateArticle(articleId, {
    title: formData.value.title.trim(),
    slug: formData.value.slug.trim() || undefined,
    summary: formData.value.summary?.trim() || undefined,
    content: formData.value.content.trim(),
    is_published: formData.value.is_published,
  })
  isSubmitting.value = false

  if (updated) {
    router.push('/admin/articles')
  }
}

const handleDelete = async () => {
  if (confirm('آیا از حذف این مقاله اطمینان دارید؟')) {
    const success = await articlesStore.deleteArticle(articleId)
    if (success) {
      router.push('/admin/articles')
    }
  }
}
</script>

<template>
  <div dir="rtl">
    <div v-if="isLoading" class="text-center py-20 text-xs text-muted-foreground">
      در حال دریافت اطلاعات مقاله...
    </div>

    <ArticleForm v-else-if="formData" v-model="formData" mode="edit" :is-submitting="isSubmitting"
      @submit="handleSubmit" @delete="handleDelete" />
  </div>
</template>
