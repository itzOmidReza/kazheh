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
  name: 'کلینیک روان‌شناسی کاژه',
  shortName: 'کاژه',
  tagline: 'روان‌شناسی آگاهانه و انسانی',
  description:
    'فضایی امن برای شنیدن، شناختن و ساختن قدم‌های کوچک و ماندگار. لازم نیست این مسیر را تنها طی کنید.',
  footerNote: 'طراحی‌شده با احترام به آرامش و حریم خصوصی شما',
  contactCta: {
    title: 'شروع گفت‌وگو',
    description:
      'اگر آماده‌اید درباره شرایط خود صحبت کنید، اولین قدم را با ما بردارید.',
    buttonText: 'درخواست مشاوره اولیه',
    buttonHref: '/contact',
  },
  contact: {
    phone: '۰۲۱ - ۸۸۸۸ ۸۸۸۸',
    phoneHref: 'tel:02188888888',
    displayPhone: '۰۲۱ - ۸۸۸۸ ۸۸۸۸',
    email: 'info@kazheh.ir',
    emailHref: 'mailto:info@kazheh.ir',
    address:
      'تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲، طبقه ۳، واحد ۶',
    workingHours: 'شنبه تا پنج‌شنبه: ساعت ۹:۰۰ الی ۲۰:۰۰',
  },
  socials: [],
};
