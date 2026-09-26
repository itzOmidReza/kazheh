export interface AdminMessageItem {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  subject?: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminArticleItem {
  id: number;
  title: string;
  slug: string;
  summary?: string | null;
  content?: string;
  is_published: boolean;
  created_at: string;
}

export interface AdminUserPreviewItem {
  id: number;
  name: string;
  role: string;
  username: string;
  phone: string;
  status: string;
}

export interface AdminProfileData {
  full_name: string;
  username: string;
  phone: string;
}

export const initialAdminMessages: AdminMessageItem[] = [
  {
    id: 1,
    full_name: 'سارا احمدی',
    phone: '09123456789',
    email: 'sara@example.com',
    subject: 'درخواست مشاوره فردی',
    message:
      'سلام، می‌خواستم برای روزهای پنجشنبه وقت رزرو کنم. امکانش هست راهنمایی بفرمایید که چه ساعاتی خالی هست؟ ممنون.',
    is_read: false,
    created_at: '2026-09-23T10:30:00.000Z',
  },
  {
    id: 2,
    full_name: 'محسن کریمی',
    phone: '09351112233',
    email: 'm.karimi@example.com',
    subject: 'هماهنگی کارگاه آموزشی',
    message:
      'باسلام، پیرو کارگاه کنترل اضطراب تمایل داشتم اطلاعات مربوط به ثبت‌نام و سرفصل‌ها را دریافت کنم.',
    is_read: true,
    created_at: '2026-09-22T14:15:00.000Z',
  },
  {
    id: 3,
    full_name: 'نگین شجاعی',
    phone: '09197778899',
    email: 'negin.sh@example.com',
    subject: 'مشاوره آنلاین',
    message:
      'درود، من ساکن تهران نیستم. آیا جلسات شما به شکل آنلاین و تصویری هم برگزار می‌شود؟',
    is_read: false,
    created_at: '2026-09-21T08:45:00.000Z',
  },
];

export const mockMessageDetail: AdminMessageItem = {
  id: 1,
  full_name: 'سارا احمدی',
  phone: '09123456789',
  email: 'sara@example.com',
  subject: 'درخواست مشاوره فردی',
  message:
    'سلام، می‌خواستم برای روزهای پنجشنبه وقت رزرو کنم. امکانش هست راهنمایی بفرمایید که چه ساعاتی خالی هست؟ ممنون.',
  is_read: true,
  created_at: '2026-09-23T10:30:00.000Z',
};

export const initialAdminArticles: AdminArticleItem[] = [
  {
    id: 1,
    title: 'چگونه اضطراب خود را در موقعیت‌های استرس‌زا کنترل کنیم؟',
    slug: 'understanding-anxiety',
    summary:
      'راهکارهای عملی برای مهار استرس‌های روزمره و درک بهتر واکنش‌های بدن.',
    content:
      'متن پیش‌فرض و آزمایشی مقاله کلینیک کاژه جهت تست قالب و فرمت‌بندی.',
    is_published: true,
    created_at: '2026-09-20T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'مرزگذاری سالم در روابط فردی و خانوادگی',
    slug: 'healthy-boundaries',
    summary: 'چگونگی تعیین حد و مرزهای احترام‌آمیز بدون ایجاد احساس گناه.',
    content:
      'مرزبندی سالم به معنای فاصله گرفتن از دیگران نیست، بلکه شفاف‌سازی نیازها و حریم روانی است.',
    is_published: false,
    created_at: '2026-09-18T16:20:00.000Z',
  },
];

export const initialAdminUsers: AdminUserPreviewItem[] = [
  {
    id: 1,
    name: 'دکتر علیرضا کاژه',
    role: 'مدیر ارشد و روان‌پزشک',
    username: 'dr_kazheh',
    phone: '09121112233',
    status: 'فعال',
  },
  {
    id: 2,
    name: 'سارا مهام',
    role: 'روان‌شناس بالینی و مشاور',
    username: 's_maham',
    phone: '09359876543',
    status: 'فعال',
  },
  {
    id: 3,
    name: 'پذیرش و نوبت‌دهی مرکزی',
    role: 'منشی و هماهنگی مراجعین',
    username: 'reception',
    phone: '09190001122',
    status: 'غیرفعال',
  },
];

export const initialAdminProfile: AdminProfileData = {
  full_name: 'مدیر کلینیک کاژه',
  phone: '09121234567',
  username: 'admin',
};
