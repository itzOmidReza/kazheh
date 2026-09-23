export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  phone?: string;
  displayPhone?: string;
  email?: string;
  address?: string;
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
  name: 'کلینیک آرامش',
  shortName: 'ک',
  tagline: 'روان‌شناسی آگاهانه',
  description:
    'فضایی امن برای شنیدن، شناختن و ساختن قدم‌های کوچک و ماندگار. لازم نیست این مسیر را تنها طی کنید.',
  footerNote: 'طراحی‌شده با احترام به آرامش و حریم خصوصی شما',
  contactCta: {
    title: 'شروع گفت‌وگو',
    description:
      'اگر آماده‌اید درباره شرایط خود صحبت کنید، اولین قدم را با ما بردارید.',
    buttonText: 'درخواست مشاوره اولیه',
    buttonHref: '/#contact',
  },
  contact: {
    // در صورت نبود اطلاعات واقعی، مقادیر undefined می‌مانند تا در فرانت ادعای اشتباهی نمایش داده نشود
    phone: undefined,
    displayPhone: undefined,
    email: undefined,
    address: undefined,
  },
  socials: [],
};
