export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon: 'Sparkles' | 'HeartHandshake' | 'UsersRound' | 'Compass' | 'User' | 'BookOpen' | 'Video';
  topics: string[];
  featured?: boolean;
  href?: string;
}

// محتوای متنی مختص به بخش خدمات در صفحه اصلی (Home)
export const servicesHomeContent = {
  badge: 'حوزه‌های خدمات کاژه',
  title: {
    regular: 'خدمات تخصصی و علمی ',
    highlight: 'کاژه',
    end: ' برای سلامت روان',
  },
  description:
    'کاژه با همکاری روان‌درمانگران، روان‌پزشکان و متخصصان معتبر، خدمات علمی و تخصصی روان‌شناسی را برای بهبود کیفیت زندگی شما ارائه می‌دهد.',
  cardCta: {
    label: 'مشاهده جزئیات >',
    href: '/contact',
  },
  closingNote: {
    title: 'مهارت انتخاب مشاور',
    description:
      'با شناخت رویکردهای درمانی و آشنایی با ویژگیهای مشاوران متخصص، میتوانید تفاوت بین مشاوران صلاحیتدار و افراد کمتجربه یا زرد را تشخیص دهید.',
    cta: {
      label: 'بیشتر بخوانید >',
      href: '/articles',
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
  badge: 'حوزه‌های خدمات کاژه',
  headTitle: 'خدمات ما',
  title: 'حوزه‌های خدمات تخصصی کاژه',
  description:
    'کاژه با همکاری روان‌درمانگران، روان‌پزشکان و متخصصان معتبر، خدمات علمی و تخصصی روان‌شناسی را برای بهبود کیفیت زندگی شما ارائه می‌دهد.',
  principlesTitle: 'اصول حاکم بر خدمات کاژه',
  principlesSubtitle: 'چرا کاژه؟',
  cardActionText: 'مشاهده جزئیات >',
  cta: {
    title: 'به مسیر بهتر زندگی فکر کن...',
    description:
      'با کمک متخصصان کاژه، می‌توانید قدم‌های مطمئنتری در مسیر سلامت روان خود بردارید.',
    buttonLabel: 'رزرو نوبت',
    buttonHref: '/contact',
  },
};

// اصول ارائه‌شده در صفحه خدمات
export const servicePrinciples: ServicePrinciple[] = [
  {
    icon: 'Brain',
    title: 'رویکرد علمی و انسانی',
    text: 'بر پایه‌ی شواهد پژوهشی و بهره‌گیری از استانداردهای درمانی روز دنیا.',
  },
  {
    icon: 'MessageCircle',
    title: 'محیط امن و محرمانه',
    text: 'رعایت کامل حریم خصوصی و اصل رازداری در تمام مراحل جلسات.',
  },
  {
    icon: 'ShieldCheck',
    title: 'همراهی بلندمدت و شفافیت',
    text: 'در مسیر رشد فردی همراه شما با اطلاعات دقیق، شفاف و هزینه‌های منصفانه.',
  },
];

// منبع واحد (Single Source of Truth) برای کل خدمات کاژه
export const servicesList: ServiceItem[] = [
  {
    id: 'psychotherapy',
    slug: 'psychotherapy',
    number: '۰۱',
    title: 'جلسات روان‌درمانی',
    shortDescription:
      'جلسات تخصصی روان‌درمانی فردی با رویکردهای علمی برای بهبود کیفیت زندگی و درمان اضطراب و افسردگی.',
    fullDescription:
      'در جلسات روان‌درمانی کاژه، با تکیه بر متدهای استاندارد شناختی رفتاری (CBT) و طرحواره درمانی، به شناخت الگوهای ذهنی و درمان هیجانات پرداخته می‌شود.',
    icon: 'Sparkles',
    topics: ['مشاوره فردی', 'طرحواره درمانی', 'رویکرد CBT'],
    featured: true,
    href: '/contact',
  },
  {
    id: 'psychiatry',
    slug: 'psychiatry',
    number: '۰۲',
    title: 'روان‌پزشکی',
    shortDescription:
      'ارزیابی و تشخیص تخصصی بالینی و درمان دارویی توسط روان‌پزشکان معتبر و هیئت علمی دانشگاه.',
    fullDescription:
      'خدمات روان‌پزشکی کاژه شامل ارزیابی دقیق بیولوژیک و تشخیصی، کنترل روند درمان دارویی و هماهنگی کامل با روان‌درمانگر مراجع است.',
    icon: 'Compass',
    topics: ['ارزیابی بالینی', 'دارودرمانی', 'مشاوره تخصصی'],
    featured: false,
    href: '/contact',
  },
  {
    id: 'workshops-gatherings',
    slug: 'workshops-gatherings',
    number: '۰۳',
    title: 'دورهمی‌ها و کارگاه‌های روان‌شناسی',
    shortDescription:
      'برگزاری دورهمی‌های روان‌شناسی، تورهای روان‌شناسی، کارگاه‌های تخصصی و عمومی، کتابخوانی و تحلیل و اکران فیلم.',
    fullDescription:
      'فضایی تعاملی و جمعی برای آموزش، خودآگاهی و ارتقای مهارت‌های فردی و ارتباطی در کنار سایر علاقه‌مندان و متخصصان.',
    icon: 'UsersRound',
    topics: [
      'کارگاه‌های روان‌شناسی',
      'تورهای روان‌شناسی',
      'کتابخوانی',
      'تحلیل و اکران فیلم',
    ],
    featured: false,
    href: '/contact',
  },
];
