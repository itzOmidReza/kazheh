export type ServiceIcon = 'individual' | 'relationships' | 'growth';

export interface Service {
  id: string;
  number: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  topics: string[];
  featured: boolean;
}

export const services: Service[] = [
  {
    id: 'individual',
    number: '۰۱',
    icon: 'individual',
    title: 'مشاوره فردی',
    description:
      'فضایی برای شناخت بهتر خود، بررسی احساسات و پیدا کردن قدم‌های مناسب برای ادامه مسیر.',
    topics: ['خودشناسی', 'اضطراب و نگرانی', 'تصمیم‌گیری'],
    featured: true,
  },
  {
    id: 'relationships',
    number: '۰۲',
    icon: 'relationships',
    title: 'مشاوره روابط',
    description:
      'کمک به درک بهتر الگوهای ارتباطی، نیازها و مرزها در رابطه با خود و دیگران.',
    topics: ['ارتباط مؤثر', 'مرزبندی', 'تعارض‌های رابطه'],
    featured: false,
  },
  {
    id: 'growth',
    number: '۰۳',
    icon: 'growth',
    title: 'همراهی در تغییر',
    description:
      'برای زمانی که می‌خواهید الگوهای قدیمی را بهتر بشناسید و تغییر را با قدم‌های کوچک آغاز کنید.',
    topics: ['تغییر عادت‌ها', 'اعتمادبه‌نفس', 'رشد شخصی'],
    featured: false,
  },
];
