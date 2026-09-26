import { siteConfig } from './site';

export const articlesPageContent = {
  headTitle: `مجله و مقالات | ${siteConfig.name}`,
  headDescription:
    'یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.',
  defaultCategory: 'همه موضوعات',
  badge: `مجله ${siteConfig.name}`,
  heroTitle: 'برای شناخت بیشتر خودتان',
  heroSubtitle:
    'یادداشت‌هایی ساده و قابل فهم درباره احساسات، رابطه‌ها و تجربه‌های روزمره.',
  emptyTitle: 'هنوز مقاله‌ای منتشر نشده است.',
  emptyDescription:
    'به‌زودی یادداشت‌ها و مقالات تخصصی جدید در این بخش قرار خواهند گرفت.',
};

export const articleDetailContent = {
  backButton: 'بازگشت به مقالات',
  notFoundMessage: 'مقاله مورد نظر پیدا نشد',
  defaultCategory: 'روان‌شناسی',
  minuteReadSuffix: 'دقیقه مطالعه',
  cardReadButton: 'مطالعه مقاله',
  share: {
    buttonLabel: 'اشتراک‌گذاری مقاله',
    successToast: 'پیوند مقاله در کلیپ‌بورد کپی شد.',
    errorToast: 'خطا در کپی کردن پیوند مقاله',
  },
  relatedArticles: {
    badge: 'پیشنهاد مطالعه',
    title: 'مقالات مرتبط',
    subtitle: 'یادداشت‌های دیگری که ممکن است برای شما مفید باشند',
  },
};
