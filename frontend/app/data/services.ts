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
  href?: string;
}

// محتوای متنی مختص به بخش خدمات در صفحه اصلی (Home)
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
    label: 'اطلاعات بیشتر و هماهنگی',
    href: '/contact',
  },
  closingNote: {
    title: 'هنوز مطمئن نیستید کدام مسیر برای شما مناسب است؟',
    description:
      'در گفت‌وگوی اولیه می‌توانیم با آرامش درباره نیازتان صحبت کنیم.',
    cta: {
      label: 'شروع گفت‌وگو',
      href: '/contact',
    },
  },
};

// ساختار اصول رویکرد درمانی
export interface ServicePrinciple {
  icon: 'Brain' | 'MessageCircle' | 'ShieldCheck';
  title: string;
  text: string;
}

// محتوای متنی مختص به صفحه مستقل خدمات (/services)
export const servicesPageContent = {
  badge: 'زمینه‌های تخصصی همراهی',
  headTitle: 'خدمات روان‌شناسی',
  title: 'رویکرد ما در جلسات مشاوره و درمان',
  description:
    'هدف ما ایجاد فضایی امن و بدون قضاوت است تا بر اساس اولویت‌ها و سبک زندگی شما، مسیر تغییرات واقعی و پایدار را هموار کنیم.',
  principlesTitle: 'اصول حاکم بر تمامی جلسات',
  principlesSubtitle: 'این خدمات چگونه پیش می‌روند؟',
  cardActionText: 'درباره شروع این مسیر',
  cta: {
    title: 'نمی‌دانید کدام خدمت برای شما مناسب‌تر است؟',
    description:
      'می‌توانید در پیام اولیه درباره شرایط خود توضیح کوتاهی بدهید تا درباره قدم بعدی گفت‌وگو کنیم.',
    buttonLabel: 'درخواست مشاوره اولیه',
    buttonHref: '/#contact',
  },
};

// اصول ارائه‌شده در صفحه خدمات
export const servicePrinciples: ServicePrinciple[] = [
  {
    icon: 'Brain',
    title: 'شناخت پیش از تغییر',
    text: 'پیش از انتخاب راه‌حل، تلاش می‌کنیم تجربه و نیاز شما را بهتر بشناسیم.',
  },
  {
    icon: 'MessageCircle',
    title: 'گفت‌وگوی روشن',
    text: 'سؤال‌ها و نگرانی‌های شما با زبانی ساده و بدون پیچیده‌گویی بررسی می‌شوند.',
  },
  {
    icon: 'ShieldCheck',
    title: 'احترام به انتخاب شما',
    text: 'ادامه مسیر با آگاهی و رضایت شما شکل می‌گیرد؛ نه با فشار یا وعده‌های قطعی.',
  },
];

// منبع واحد (Single Source of Truth) برای کل خدمات کلینیک
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
    href: '/contact',
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
    href: '/contact',
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
    href: '/contact',
  },
];
