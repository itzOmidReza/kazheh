export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  displayPhone: string;
  email: string;
  emailHref: string;
  address: string;
  workingHours: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  footerNote: string;
  contactCta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  contact: ContactInfo;
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: 'کاژه (پناهگاه امن روان)',
  shortName: 'کاژه',
  tagline: 'پناهگاهی امن برای سلامت روان',
  description:
    'کاژه با همکاری روان‌درمانگران، روان‌پزشکان و متخصصان معتبر، خدمات علمی و تخصصی روان‌شناسی را برای بهبود کیفیت زندگی شما ارائه می‌دهد.',
  footerNote: 'کلیه حقوق مادی و معنوی این سایت محفوظ است | طراحی و توسعه: هلیوبمدیا',
  contactCta: {
    title: 'به مسیر بهتر زندگی فکر کن...',
    description:
      'با کمک متخصصان کاژه، می‌توانید قدم‌های مطمئنتری در مسیر سلامت روان خود بردارید.',
    buttonText: 'پیش‌مشاوره رایگان',
    buttonHref: '/contact',
  },
  contact: {
    phone: '۰۲۱-۷۷۲۲۳۳۴۴',
    phoneHref: 'tel:02177223344',
    displayPhone: '۰۲۱-۷۷۲۲۳۳۴۴',
    email: 'info@kazheh.ir',
    emailHref: 'mailto:info@kazheh.ir',
    address: 'تهران، خیابان آزادی، پلاک ۱۲',
    workingHours: 'شنبه تا پنج‌شنبه: ساعت ۹:۰۰ الی ۲۰:۰۰',
  },
  socials: [],
};
