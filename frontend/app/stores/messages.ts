import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';
import type { MessageItem } from '~/components/admin/messages/MessageCard.vue';

export const useMessagesStore = defineStore('messages', () => {
  const items = ref<MessageItem[]>([]);
  const isLoading = ref(false);
  const searchQuery = ref('');
  const filter = ref<'all' | 'unread' | 'read'>('all');

  // واکشی لیست پیام‌ها از بک‌اند FastAPI
  const fetchMessages = async () => {
    isLoading.value = true;
    const { apiFetch } = useApi();

    try {
      const data = await apiFetch<any[]>('/contact', {
        method: 'GET',
        query: {
          unread_only: filter.value === 'unread' ? true : undefined,
        },
      });

      // مپ کردن داده‌ها و تبدیل مقادیر null به undefined برای تطابق کامل با تایپ MessageItem
      const mappedData: MessageItem[] = data.map((item) => ({
        id: item.id,
        full_name: item.full_name,
        phone: item.phone,
        email: item.email ?? undefined,
        subject: item.subject ?? undefined,
        message: item.message,
        is_read: item.is_read,
        created_at: item.created_at,
      }));

      if (filter.value === 'read') {
        items.value = mappedData.filter((m) => m.is_read);
      } else {
        items.value = mappedData;
      }
    } catch {
      toast.error('خطا در دریافت لیست پیام‌های مراجعین.');
    } finally {
      isLoading.value = false;
    }
  };

  // تغییر وضعیت خوانده‌شده / خوانده‌نشده
  const toggleReadStatus = async (id: number) => {
    const target = items.value.find((m) => m.id === id);
    if (!target) return;

    const newStatus = !target.is_read;
    const { apiFetch } = useApi();

    try {
      await apiFetch(`/contact/${id}`, {
        method: 'PATCH',
        body: {
          is_read: newStatus,
        },
      });
      target.is_read = newStatus;
      toast.success(
        newStatus
          ? 'پیام به عنوان بررسی‌شده علامت خورد.'
          : 'پیام به وضعیت جدید تغییر یافت.',
      );
    } catch {
      toast.error('خطا در تغییر وضعیت پیام.');
    }
  };

  // حذف پیام مراجع
  const deleteMessage = async (id: number) => {
    const { apiFetch } = useApi();

    try {
      await apiFetch(`/contact/${id}`, {
        method: 'DELETE',
      });
      items.value = items.value.filter((m) => m.id !== id);
      toast.success('پیام با موفقیت حذف شد.');
      return true;
    } catch {
      toast.error('خطا در حذف پیام.');
      return false;
    }
  };

  // فیلتر جست‌وجو در سمت کلاینت
  const filteredMessages = computed(() => {
    if (!searchQuery.value.trim()) return items.value;
    const q = searchQuery.value.toLowerCase();

    return items.value.filter(
      (m) =>
        m.full_name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        (m.subject && m.subject.toLowerCase().includes(q)) ||
        m.message.toLowerCase().includes(q),
    );
  });

  // آمار پیام‌ها جهت اتصال به MessageStats
  const stats = computed(() => ({
    total: items.value.length,
    unread: items.value.filter((m) => !m.is_read).length,
    read: items.value.filter((m) => m.is_read).length,
  }));

  // دریافت جزئیات یک پیام بر اساس شناسه
  const getMessageById = async (id: number): Promise<MessageItem | null> => {
    // اگر در لیست پیام‌ها وجود داشت، مستقیماً از همان استفاده کن
    const existing = items.value.find((m) => m.id === id);
    if (existing) return existing;

    // در غیر این صورت لیست را از سرور مجدداً واکشی کن
    await fetchMessages();
    return items.value.find((m) => m.id === id) || null;
  };

  return {
    items,
    isLoading,
    searchQuery,
    filter,
    filteredMessages,
    stats,
    fetchMessages,
    toggleReadStatus,
    deleteMessage,
    getMessageById,
  };
});
