import { siteConfig } from './site';

export const articlesPageContent = {
  headTitle: `مقالات و آموزش‌ها | ${siteConfig.name}`,
  headDescription:
    'یادداشت‌ها و آموزش‌های علمی و تخصصی روان‌شناسی برای بهبود کیفیت زندگی.',
  defaultCategory: 'همه دسته‌ها',
  badge: 'مقالات و آموزش‌ها',
  heroTitle: 'مقالات و آموزش‌ها',
  heroSubtitle:
    'تازه‌ترین مقالات تخصصی و عمومی روان‌شناسی برای ارتقای سلامت روان و سبک زندگی آگاهانه.',
  tabs: {
    general: 'مقالات عمومی',
    specialized: 'مقالات تخصصی',
  },
  filters: {
    allCategories: 'همه دسته‌ها',
    sortLatest: 'مرتب‌سازی (جدیدترین)',
    searchPlaceholder: 'جستجوی مقاله...',
  },
  emptyTitle: 'هنوز مقاله‌ای منتشر نشده است.',
  emptyDescription:
    'به‌زودی مقالات جدید تیم متخصصان کلینیک کاژه در این قسمت در دسترس قرار خواهد گرفت.',
};

export const articleDetailContent = {
  backButton: 'بازگشت به مقالات',
  notFoundMessage: 'مقاله مورد نظر پیدا نشد',
  defaultCategory: 'مقاله تخصصی',
  minuteReadSuffix: 'دقیقه مطالعه',
  cardReadButton: 'مشاهده مقاله',
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
