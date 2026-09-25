export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon: 'Sparkles' | 'HeartHandshake' | 'UsersRound' | 'Compass' | 'User';
  topics: string[];
  featured?: boolean;
  // لینک اختصاصی در آینده (/services#individual یا /services/individual)
  href?: string;
}

// محتوای متنی مختص به سکشن صفحه اصلی (Home)
export const servicesHomeContent = {
  badge: 'خدمات و همراهی',
  title: {
    regular: 'هر مسیری، از یک',
    highlight: 'گفت‌وگوی امن',
    end: 'شروع می‌شود.',
  },
  description:
    'خدمات بر اساس شرایط و نیاز شما شکل می‌گیرند. لازم نیست پیش از شروع، پاسخ همه سؤال‌ها را بدانید.',
  cardCta: {
    label: 'اطلاعات بیشتر',
    href: '/#contact', // بعداً می‌تواند به `/services` تغییر کند
  },
  closingNote: {
    title: 'هنوز مطمئن نیستید کدام مسیر برای شما مناسب است؟',
    description:
      'در گفت‌وگوی اولیه می‌توانیم با آرامش درباره نیازتان صحبت کنیم.',
    cta: {
      label: 'شروع گفت‌وگو',
      href: '/#contact',
    },
  },
};

// محتوای متنی مختص به صفحه مستقل (/services) در آینده
export const servicesPageContent = {
  badge: 'زمینه‌های تخصصی همراهی',
  title: 'رویکرد ما در جلسات مشاوره و درمان',
  description:
    'هدف ما ایجاد فضایی امن و بدون قضاوت است تا بر اساس اولویت‌ها و سبک زندگی شما، مسیر تغییرات واقعی و پایدار را هموار کنیم.',
  principlesTitle: 'اصول حاکم بر تمامی جلسات',
};

// منبع واحد (Single Source of Truth) برای کل خدمات سایت
export const servicesList: ServiceItem[] = [
  {
    id: 'individual',
    slug: 'individual-counseling',
    number: '۰۱',
    title: 'مشاوره فردی',
    shortDescription:
      'فضایی امن برای شناخت بهتر خود، بررسی احساسات و پیدا کردن قدم‌های مناسب برای ادامه مسیر.',
    fullDescription:
      'در جلسات فردی، به بررسی ریشه‌ای هیجانات، مدیریت اضطراب و الگوهای تکرارشونده ذهنی پرداخته می‌شود تا زمینه خودآگاهی عمیق‌تر شکل گیرد.',
    icon: 'Sparkles',
    topics: ['خودشناسی', 'اضطراب و نگرانی', 'تصمیم‌گیری'],
    featured: true,
    href: '/#contact',
  },
  {
    id: 'relationship',
    slug: 'relationship-counseling',
    number: '۰۲',
    title: 'مشاوره روابط',
    shortDescription:
      'کمک به درک بهتر الگوهای ارتباطی، نیازها و مرزها در رابطه با خود و دیگران.',
    fullDescription:
      'تمرکز بر ارتقای مهارت‌های گفت‌وگو، بازسازی اعتماد و حل تعارض‌های عاطفی و بین‌فردی در فضایی کاملاً پذیرا.',
    icon: 'HeartHandshake',
    topics: ['ارتباط مؤثر', 'مرزبندی', 'تعارض‌های رابطه'],
    featured: false,
    href: '/#contact',
  },
  {
    id: 'change',
    slug: 'growth-and-change',
    number: '۰۳',
    title: 'همراهی در تغییر',
    shortDescription:
      'برای زمانی که می‌خواهید الگوهای قدیمی را بهتر بشناسید و تغییر را با قدم‌های کوچک آغاز کنید.',
    fullDescription:
      'شناسایی موانع درونی، غلبه بر رفتارهای بازدارنده مانند اهمال‌کاری و ترسیم گام‌های عملی متناسب با توان فردی.',
    icon: 'UsersRound',
    topics: ['تغییر عادت‌ها', 'اعتمادبه‌نفس', 'رشد شخصی'],
    featured: false,
    href: '/#contact',
  },
];
