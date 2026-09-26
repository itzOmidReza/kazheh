export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات', href: '/services' },
  { label: 'مقالات', href: '/articles' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات تخصصی', href: '/services' },
  { label: 'مجله و مقالات', href: '/articles' },
  { label: 'درباره کلینیک', href: '/about' },
  { label: 'ارتباط مستقیم', href: '/contact' },
];

export const footerSupportLinks: NavItem[] = [
  { label: 'سؤالات متداول', href: '/#faq' },
  { label: 'شروع گفتگو', href: '/#contact' },
  { label: 'ارتباط با ما', href: '/contact' },
  { label: 'حریم خصوصی', href: '/privacy' },
];

export const headerContent = {
  homeAriaLabel: 'صفحه اصلی',
  navAriaLabel: 'منوی اصلی',
  contactText: 'تماس با ما',
  openMenuAriaLabel: 'باز کردن منو',
  mobileNavAriaLabel: 'منوی موبایل',
};

export const footerContent = {
  homeAriaLabel: 'صفحه اصلی',
  quickLinksTitle: 'دسترسی سریع',
  moreInfoTitle: 'اطلاعات بیشتر',
};
