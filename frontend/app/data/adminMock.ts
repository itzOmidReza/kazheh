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
    subject: 'درخواست پیش‌مشاوره رایگان',
    message:
      'سلام، برای دریافت پیش‌مشاوره رایگان و بررسی جلسات روان‌درمانی تمایل به هماهنگی نوبت دارم.',
    is_read: false,
    created_at: '2026-09-23T10:30:00.000Z',
  },
  {
    id: 2,
    full_name: 'محسن کریمی',
    phone: '09351112233',
    email: 'm.karimi@example.com',
    subject: 'کارگاه تخصصی طرحواره درمانی',
    message:
      'باسلام، پیرو کارگاه تخصصی طرحواره درمانی تمایل داشتم اطلاعات مربوط به ثبت‌نام و سرفصل‌ها را دریافت کنم.',
    is_read: true,
    created_at: '2026-09-22T14:15:00.000Z',
  },
  {
    id: 3,
    full_name: 'نگین شجاعی',
    phone: '09197778899',
    email: 'negin.sh@example.com',
    subject: 'کارگاه عمومی مدیریت استرس و اضطراب',
    message:
      'درود، شرایط شرکت در کارگاه عمومی مدیریت استرس و اضطراب به صورت آنلاین چگونه است؟',
    is_read: false,
    created_at: '2026-09-21T08:45:00.000Z',
  },
];

export const mockMessageDetail: AdminMessageItem = {
  id: 1,
  full_name: 'سارا احمدی',
  phone: '09123456789',
  email: 'sara@example.com',
  subject: 'درخواست پیش‌مشاوره رایگان',
  message:
    'سلام، برای دریافت پیش‌مشاوره رایگان و بررسی جلسات روان‌درمانی تمایل به هماهنگی نوبت دارم.',
  is_read: true,
  created_at: '2026-09-23T10:30:00.000Z',
};

export const initialAdminArticles: AdminArticleItem[] = [
  {
    id: 1,
    title: 'تأثیر ذهن‌آگاهی در کاهش اضطراب',
    slug: 'mindfulness-anxiety',
    summary:
      'بررسی نقش تمرینات ذهن‌آگاهی در تنظیم هیجان و کاهش پایدار استرس و اضطراب روزمره.',
    content:
      'متن مقاله تخصصی درباره اثرات علمی ذهن‌آگاهی در کاهش اضطراب و آرام‌سازی ذهن.',
    is_published: true,
    created_at: '2026-09-20T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'رویکرد شناختی رفتاری (CBT) و کاربردهای آن',
    slug: 'cbt-approach',
    summary:
      'آشنایی با مبانی علمی رویکرد شناختی رفتاری (CBT) و کاربرد آن در درمان اختلالات خلقی.',
    content:
      'رویکرد شناختی رفتاری یکی از معتبرترین متدهای بالینی مبتنی بر شواهد است.',
    is_published: true,
    created_at: '2026-09-18T16:20:00.000Z',
  },
  {
    id: 3,
    title: 'چگونه متوجه شویم روان‌درمانگر مناسبی انتخاب کرده‌ایم؟',
    slug: 'choosing-therapist',
    summary:
      'راهنمای مهارت انتخاب مشاور و شناسایی ویژگی‌های روان‌درمانگر متخصص و با صلاحیت.',
    content:
      'شناخت تفاوت بین روان‌درمانگران صلاحیت‌دار و افراد غیرمتخصص برای شروع درمان ضروری است.',
    is_published: true,
    created_at: '2026-09-15T10:00:00.000Z',
  },
  {
    id: 4,
    title: 'نشانه‌های افسردگی و راه‌های درمان',
    slug: 'depression-symptoms',
    summary:
      'شناخت نشانه‌های بالینی افسردگی اساسی و رویکردهای درمانی روان‌شناسی و روان‌پزشکی.',
    content:
      'علائم افسردگی و گام‌های موثر برای خروج از رخوت و بهبود کیفیت زندگی فردی.',
    is_published: false,
    created_at: '2026-09-12T09:30:00.000Z',
  },
];

export const initialAdminUsers: AdminUserPreviewItem[] = [
  {
    id: 1,
    name: 'دکتر علیرضا کاژه',
    role: 'روان‌پزشک و درمانگر ارشد',
    username: 'dr_kazheh',
    phone: '09121112233',
    status: 'فعال',
  },
  {
    id: 2,
    name: 'سارا مهام',
    role: 'روان‌شناس بالینی و مدرس کارگاه',
    username: 's_maham',
    phone: '09359876543',
    status: 'فعال',
  },
  {
    id: 3,
    name: 'پذیرش و نوبت‌دهی مرکزی',
    role: 'هماهنگی مراجعین و پیش‌مشاوره',
    username: 'reception',
    phone: '09190001122',
    status: 'فعال',
  },
];

export const initialAdminProfile: AdminProfileData = {
  full_name: 'سارا احمدی',
  phone: '09121234567',
  username: 'sara_ahmadi',
};
