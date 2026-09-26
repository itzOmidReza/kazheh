import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';

export interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  summary?: string | null;
  content: string;
  is_published: boolean;
  created_at: string;
  updated_at?: string | null;
}

export interface ArticlePayload {
  title: string;
  slug?: string;
  summary?: string;
  content: string;
  is_published?: boolean;
}

export const useArticlesStore = defineStore('articles', () => {
  // تمام مقالات دریافت شده از سرور
  const allArticles = ref<ArticleItem[]>([]);
  const currentArticle = ref<ArticleItem | null>(null);
  const isLoading = ref(false);
  const searchQuery = ref('');
  const filter = ref<'all' | 'published' | 'draft'>('all');

  // واکشی لیست برای ادمین (ارسال صریح published_only=false به عنوان رشته)
  const fetchAdminArticles = async () => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const data = await apiFetch<ArticleItem[]>(
        '/articles?published_only=false',
        {
          method: 'GET',
        },
      );
      allArticles.value = data;
    } catch {
      toast.error('خطا در دریافت لیست مقالات.');
    } finally {
      isLoading.value = false;
    }
  };

  // واکشی مقالات عمومی فقط منتشر شده
  const fetchPublicArticles = async () => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const data = await apiFetch<ArticleItem[]>(
        '/articles?published_only=true',
        {
          method: 'GET',
        },
      );
      allArticles.value = data;
      return data;
    } catch {
      toast.error('خطا در دریافت مقالات وب‌سایت.');
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  // دریافت یک مقاله با اسلاگ
  const fetchArticleBySlug = async (slug: string) => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const data = await apiFetch<ArticleItem>(
        `/articles/${encodeURIComponent(slug)}`,
        {
          method: 'GET',
        },
      );
      currentArticle.value = data;
      return data;
    } catch {
      toast.error('مقاله مورد نظر یافت نشد.');
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // دریافت اطلاعات کامل مقاله بر اساس ID عددی
  const getArticleById = async (id: number): Promise<ArticleItem | null> => {
    let target = allArticles.value.find((a) => a.id === id);
    if (!target) {
      await fetchAdminArticles();
      target = allArticles.value.find((a) => a.id === id);
    }

    if (!target) return null;

    try {
      const fullArticle = await fetchArticleBySlug(target.slug);
      return fullArticle || target;
    } catch {
      return target;
    }
  };

  // ایجاد مقاله
  const createArticle = async (payload: ArticlePayload) => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const created = await apiFetch<ArticleItem>('/articles', {
        method: 'POST',
        body: payload,
      });
      allArticles.value.unshift(created);
      toast.success('مقاله با موفقیت ایجاد شد.');
      return created;
    } catch (err: any) {
      toast.error(err.data?.detail || 'خطا در ایجاد مقاله جدید.');
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // ویرایش مقاله
  const updateArticle = async (
    id: number,
    payload: Partial<ArticlePayload>,
  ) => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const updated = await apiFetch<ArticleItem>(`/articles/${id}`, {
        method: 'PATCH',
        body: payload,
      });

      const index = allArticles.value.findIndex((a) => a.id === id);
      if (index !== -1) {
        allArticles.value[index] = updated;
      }
      if (currentArticle.value?.id === id) {
        currentArticle.value = updated;
      }

      toast.success('تغییرات مقاله با موفقیت ذخیره شد.');
      return updated;
    } catch (err: any) {
      toast.error(err.data?.detail || 'خطا در به‌روزرسانی مقاله.');
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // حذف مقاله
  const deleteArticle = async (id: number) => {
    const { apiFetch } = useApi();

    try {
      await apiFetch(`/articles/${id}`, {
        method: 'DELETE',
      });
      allArticles.value = allArticles.value.filter((a) => a.id !== id);
      toast.success('مقاله با موفقیت حذف شد.');
      return true;
    } catch {
      toast.error('خطا در حذف مقاله.');
      return false;
    }
  };

  // لیست مقالات فیلتر شده (هم بر اساس وضعیت تب و هم جستجو)
  const filteredArticles = computed(() => {
    let list = allArticles.value;

    if (filter.value === 'published') {
      list = list.filter((a) => a.is_published);
    } else if (filter.value === 'draft') {
      list = list.filter((a) => !a.is_published);
    }

    if (!searchQuery.value.trim()) return list;
    const q = searchQuery.value.toLowerCase();

    return list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        (a.summary && a.summary.toLowerCase().includes(q)),
    );
  });

  // آمار کلی مقالات
  const stats = computed(() => ({
    total: allArticles.value.length,
    published: allArticles.value.filter((a) => a.is_published).length,
    draft: allArticles.value.filter((a) => !a.is_published).length,
  }));

  return {
    items: allArticles,
    currentArticle,
    isLoading,
    searchQuery,
    filter,
    filteredArticles,
    stats,
    fetchAdminArticles,
    fetchPublicArticles,
    fetchArticleBySlug,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
  };
});
