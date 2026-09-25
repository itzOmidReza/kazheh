export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات', href: '/services' },
  { label: 'مقالات', href: '/articles' },
  { label: 'درباره ما', href: '/about' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'خدمات تخصصی', href: '/services' },
  { label: 'مجله و مقالات', href: '/articles' },
  { label: 'درباره کلینیک', href: '/about' },
];

export const footerSupportLinks: NavItem[] = [
  { label: 'سؤالات متداول', href: '/#faq' },
  { label: 'شروع گفتگو', href: '/#contact' },
  { label: 'حریم خصوصی', href: '/privacy' },
];
