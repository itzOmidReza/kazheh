export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات', href: '/#services' },
  { label: 'روش کاری', href: '/#approach' },
  { label: 'مقالات', href: '/articles' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات', href: '/#services' },
  { label: 'روش کاری', href: '/#approach' },
  { label: 'مقالات', href: '/articles' },
];

export const footerSupportLinks: NavItem[] = [
  { label: 'سؤالات متداول', href: '/#faq' },
  { label: 'تماس با ما', href: '/#contact' },
  { label: 'حریم خصوصی', href: '/privacy' },
];
