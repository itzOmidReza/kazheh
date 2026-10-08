export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات ما', href: '/services' },
  { label: 'مقالات', href: '/articles' },
  { label: 'کارگاه‌ها', href: '/#workshops' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات ما', href: '/services' },
  { label: 'مقالات', href: '/articles' },
  { label: 'کارگاه‌ها', href: '/#workshops' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export const footerSupportLinks: NavItem[] = [
  { label: 'جلسات روان‌درمانی', href: '/services' },
  { label: 'روان‌پزشکی', href: '/services' },
  { label: 'کتابخوانی', href: '/services' },
  { label: 'دورهمی روان‌شناسی', href: '/services' },
  { label: 'تورهای روان‌شناسی', href: '/services' },
  { label: 'تحلیل یا اکران فیلم', href: '/services' },
];

export const headerContent = {
  homeAriaLabel: 'کاژه (پناهگاه امن روان)',
  navAriaLabel: 'منوی اصلی',
  contactText: 'پروفایل کاربری / ورود',
  searchLabel: 'جستجو',
  openMenuAriaLabel: 'باز کردن منو',
  mobileNavAriaLabel: 'منوی موبایل',
};

export const footerContent = {
  homeAriaLabel: 'کاژه (پناهگاه امن روان)',
  quickLinksTitle: 'دسترسی سریع',
  moreInfoTitle: 'خدمات ما',
};
