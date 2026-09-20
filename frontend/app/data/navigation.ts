export interface NavigationItem {
  label: string;
  href: string;
}

export const mainNavigation: NavigationItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات', href: '/services' },
  { label: 'درباره ما', href: '/about' },
  { label: 'مقالات', href: '/articles' },
];

export const footerNavigation: NavigationItem[] = [
  ...mainNavigation,
  { label: 'روش کاری', href: '/#approach' },
];

export const supportNavigation: NavigationItem[] = [
  { label: 'سؤالات متداول', href: '/#faq' },
  { label: 'تماس با ما', href: '/#contact' },
  { label: 'حریم خصوصی', href: '/privacy' },
];
