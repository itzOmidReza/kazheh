# گزارش جامع تحلیل و وضعیت فرانت‌اند پروژه Kazheh

- **تاریخ تحلیل و گزارش:** ۲۳ سپتامبر ۲۰۲۶ (۲ مهر ۱۴۰۵) — نسخه به‌روزشده پس از استقرار معماری داده متمرکز
- **موضوع:** وب‌سایت فارسی روان‌شناسی و مشاوره «آرامش آگاهانه»
- **نام مخزن:** `kazheh`
- **آدرس مخزن:** `https://github.com/itzOmidReza/kazheh`
- **مسیر پروژه روی رایانه توسعه‌دهنده:** `/home/omidreza/Work/Clients/kazheh`
- **شاخه فعال گیت:** `master` (شامل ۴ کامیت لوکال جلوتر از `origin/master`)
- **حوزه تمرکز گزارش:** صرفاً فرانت‌اند (بر اساس نقش و تخصص توسعه‌دهنده)
- **وضعیت سلامت فرانت‌اند:** بیلد پروداکشن موفقیت‌آمیز، تایپ‌چک ۱۰۰٪ بدون خطا، استقرار کامل لایه داده متمرکز (`app/data`) و اتصال آن به هدر، فوتر و هر ۱۰ سکشن صفحه اصلی.

---

## ۱. خلاصه مدیریتی (آخرین وضعیت پس از مایگریشن داده)

پروژه فرانت‌اند در یک جهش معماری اساسی، چالش بزرگ «انفصال داده‌ها (Data Drift)» را به طور کامل در سطح صفحه اصلی و لایوت سراسری حل کرد. سه کامیت جدید توسعه‌دهنده (`74b12fd`، `4e5e4be` و `bad6119`) لایه محتوای متمرکز را ایجاد و کلیه کامپوننت‌های اصلی را به آن متصل کرده‌اند:

1. **استقرار کامل لایه داده متمرکز (`frontend/app/data/`):**
   - فایل‌های `site.ts`، `navigation.ts`، `services.ts`، `home.ts`، `faqs.ts` و `index.ts` ایجاد و یکپارچه شدند. تمام محتوای متنی، عناوین، برچسب‌ها، دکمه‌های فراخوان و پرسش‌های متداول از کامپوننت‌ها به این لایه منتقل شدند.
2. **اتصال هدر و فوتر به داده‌های متمرکز:**
   - کامپوننت `AppHeader.vue` اکنون تمام پیوندهای ناوبری، عنوان برند و CTA را از منبع واحد دریافت می‌کند و منطق تشخیص لینک فعال (`isActive`) برای پشتیبانی از انکرها (`/#...`) بازنویسی شد.
   - کامپوننت `AppFooter.vue` به طور کامل اصلاح شد. اطلاعات تماس فیک حذف گردید و با پراپرتی محاسباتی `hasContactInfo`، شماره تلفن، ایمیل و آدرس تنها در صورت وجود اطلاعات واقعی نمایش داده می‌شوند.
3. **مایگریشن موفق ۱۰ کامپوننت صفحه اصلی:**
   - هر ۱۰ سکشن (`Hero`، `TrustBar`، `Concerns`، `Services`، `Approach`، `Process`، `Testimonials`، `Articles`، `Faq`، `Contact`) بازنویسی شده و دیتای خود را مستقیماً از `~/data` دریافت می‌کنند.
   - در `ServicesSection.vue` نگاشت آیکون‌ها (`iconMap`) برای تبدیل رشته‌های دیتابیس به کامپوننت‌های لوسید پیاده‌سازی شد.
4. **اصلاح رفتار فرم تماس (`ContactSection.vue`):**
   - رفتار غلط «تأخیر فیک و پاک شدن متون کاربر به همراه ادعای ثبت موفقیت» حذف شد. اکنون فرم با نمایش صادقانه وضعیت موقت (`offlineNotice`)، متون تایپ‌شده کاربر را حفظ می‌کند تا دیتایی از دست نرود.
5. **تأیید سلامت کامپایل و تایپ‌ها:**
   - تست بیلد پروداکشن Nuxt 4 با خروجی پاک Nitro و Vite در ۵.۱ ثانیه با موفقیت انجام شد (کد خروج `0`).
   - کامپایلر تایپ‌اسکریپت (`tsc --noEmit`) با کد خروج `0` صحت کامل تایپ‌ها را تأیید کرد.

---

## ۲. هدف و محدوده محصول (در لایه فرانت‌اند)

### هدف طراحی

خلق رابط کاربری فارسی، راست‌به‌چپ (RTL)، انسانی، آرامش‌بخش و با پرهیز از ادعاهای اغراق‌آمیز، تبلیغات تجاری یا وعده‌های غیرواقعی در حوزه روان‌شناسی و مشاوره.

### قابلیت‌های فعال در فرانت‌اند

- **هدر واکنش‌گرا و هوشمند:** ناوبری دسکتاپ، منوی کشویی موبایل Sheet با کامپوننت‌های shadcn-vue، هایلایت دقیق بخش‌های فعال بر اساس Hash و Path.
- **۱۰ بخش مستقل صفحه اصلی (کاملاً مبتنی بر داده):**
  - `Hero`: معرفی، پیام آرامش و CTAهای هدایت‌کننده.
  - `TrustBar`: ۴ اصل اعتمادسازی و محرمانگی.
  - `ConcernsSection`: ۳ کارت دغدغه‌های آشنا با هاورهای نرم.
  - `ServicesSection`: کارت‌های ۳ گانه خدمات بر پایه `servicesList` و برچسب‌های موضوعی.
  - `ApproachSection`: رویکرد همراهی گام‌به‌گام و نقل‌قول اختصاصی.
  - `ProcessSection`: ۳ مرحله شفاف شروع ارتباط.
  - `TestimonialsSection`: کارت‌های روایت مراجعان (طراحی‌شده بر پایه داده متمرکز).
  - `ArticlesSection`: ویترین کارت‌های مقالات وبلاگ با زمان مطالعه فارسی.
  - `FaqSection`: آکاردئون پرسش‌های متداول بر پایه لیست داده متمرکز `faqsList`.
  - `ContactSection`: فرم ارسال پیام اولیه با حفظ محتوا و وضعیت موقت ارتباطی.
- **صفحات فرعی مستقل:**
  - `/about`: رویکرد، اصول ۳ گانه و داستان کلینیک.
  - `/services`: صفحه مستقل خدمات و مبانی همراهی.
  - `/privacy`: سیاست حفظ حریم خصوصی کاربران.
  - `/articles`: آرشیو مقالات آموزشی و تأملی.
  - `/articles/[slug]`: صفحه محتوای هر مقاله با امکان اشتراک‌گذاری.
- **صفحه خطای سفارشی (`error.vue`):** طراحی اختصاصی برای خطاهای ۴۰۴ و ۵۰۰ به همراه دکمه‌های بازگشت به خانه و رفرش.

### مرزهای خارج از محدوده در فرانت‌اند

- عدم وجود رزرو آنلاین تقویمی قطعی، درگاه پرداخت یا پنل کاربری درمانجو. اقدام محوری، «درخواست مشاوره اولیه» باقی مانده است.

---

## ۳. پشته فنی و وابستگی‌های تأییدشده

بررسی مستقیم فایل‌های `frontend/package.json` و `frontend/bun.lock`:

| بسته / ابزار          | نسخه دقیق نصب‌شده | نقش در پروژه                                     |
| --------------------- | ----------------- | ------------------------------------------------ |
| **Nuxt**              | `4.5.2`           | فریم‌ورک فول‌استک با ساختار مدرن `app/`          |
| **Nitro**             | `2.13.4`          | انجین قدرتمند سرور و رندرر Nuxt                  |
| **Vite**              | `8.3.0`           | باندلر سریع نسل جدید فرانت‌اند                   |
| **Vue**               | `3.5.43`          | فریم‌ورک کامپوننت‌محور واکنشی                    |
| **Vue Router**        | `5.3.1`           | سامانه مسیریابی SPA/SSR                          |
| **TypeScript**        | `5.9.0`           | بررسی نوع‌های داده و انتزاع اینترفیس‌ها          |
| **Tailwind CSS**      | `4.3.3`           | نسخه مدرن Tailwind با پردازشگر مستقیم Vite       |
| **@tailwindcss/vite** | `4.3.3`           | پلاگین ادغام رسمی Tailwind 4 با Vite             |
| **tw-animate-css**    | `1.4.0`           | انیمیشن‌های CSS روان                             |
| **shadcn-nuxt**       | `2.8.2`           | ماژول ادغام کامپوننت‌های shadcn در اکوسیستم Nuxt |
| **reka-ui**           | `2.10.4`          | لایه پریمیتیوهای دسترس‌پذیر و هدلس               |
| **@vueuse/core**      | `15.0.0`          | ابزارهای واکنشی و تنظیم پهنای SSR                |
| **vue-sonner**        | `2.0.9`           | کتابخانه سیستم نوتیفیکیشن و توست                 |
| **vee-validate**      | `4.15.1`          | مدیریت وضعیت و اعتبارسنجی فرم                    |
| **zod**               | `3.25.76`         | اعتبارسنجی داده‌ها و تعریف اسکیمای داده          |
| **@lucide/vue**       | `1.47.0`          | مجموعه آیکون‌های وکتور Lucide                    |
| **nuxt-lucide-icons** | `2.1.0`           | ماژول Nuxt برای بهینه‌سازی لود آیکون‌ها          |
| **مدیریت پکیج**       | `Bun 1.3.14`      | پکیج منیجر و ران‌تایم محلی پروژه                 |

---

## ۴. نتایج آزمون بیلد و بررسی خطاهای سیستم

در تاریخ ۲۳ سپتامبر ۲۰۲۶ تست‌های بیلد و کامپایل پس از کامیت‌های جدید مجدداً اجرا شدند:

### نتایج بیلد پروداکشن (`bun run build`)

- **وضعیت:** خروج با کد `0` (موفقیت‌آمیز).
- **زمان بیلد:** حدود ۱۰.۴ ثانیه (Nitro: ۵.۱۷ ثانیه، Vite کلاینت: ۲.۹ ثانیه).
- **حجم کل باندل:** ۶.۴۵ مگابایت (۱.۶۴ مگابایت فشرده‌شده با Gzip).
- **نتیجه:** تمام لایوت‌ها، صفحات و کامپوننت‌های متصل‌شده به لایه داده بدون کوچک‌ترین خطایی باندل شدند.

### بررسی صحت تایپ‌ها (`bunx tsc --noEmit`)

- تمام فایل‌های ایجادشده در `frontend/app/data/` و کامپوننت‌های مصرف‌کننده با موفقیت کامل ارزیابی شدند و **صفر خطای نوعی** گزارش شد.

---

## ۵. سیستم طراحی «آرامش آگاهانه» (Conscious Calm)

فایل استایل `frontend/app/assets/css/tailwind.css` همچنان به عنوان مرجع استایل و پالت عمل می‌کند:

### رنگ‌ها و هویت بصری

- **سبز نفتی پایه (Primary):** `#102F35` (تیره)، `#16484A` (اصلی)، `#1D625D`، `#3D8A7D`.
- **مریم‌گلی (Sage):** `#E8F2ED`، `#D6E9E0`، `#BCD8CC` (پس‌زمینه‌های لطیف و کارت‌های شناور).
- **هلویی / گرم (Warm / CTA):** `#F0C3A2`، `#DDA075`، `#B8754E` (دکمه‌های اقدام و نشانگرها).
- **فونت و خوانایی:** قلم وزیرمتن (Vazirmatn) با هدینگ‌های سیال و ارتفاع خطوط دو برابر (`line-height: 2`) برای حداکثر آرامش در مطالعه متن فارسی.

### بهبودهای بصری در کامیت‌های اخیر

- در کامیت‌های `4e5e4be` و `bad6119` کلاس‌های تم تیره (`dark:bg-primary-950`، `dark:text-sage-300`، `dark:text-primary`) به هدر، بج‌ها و عناوین اضافه شدند که گام مثبتی در تکمیل پشتیبانی از Dark Mode است.

---

## ۶. معماری ساختار فایل‌های فرانت‌اند (وضعیت جاری)

```text
frontend/
├── app/
│   ├── app.vue                         # ریشه برنامه با NuxtLayout و NuxtPage
│   ├── assets/
│   │   └── css/tailwind.css            # استایل‌ها، فونت وزیرمتن و توکن‌های طراحی
│   ├── components/
│   │   ├── home/                       # ۱۰ سکشن صفحه اصلی (همگی متصل به ~/data)
│   │   │   ├── Hero.vue                <-- متصل به heroContent
│   │   │   ├── TrustBar.vue            <-- متصل به trustBarContent
│   │   │   ├── ConcernsSection.vue     <-- متصل به concernsContent
│   │   │   ├── ServicesSection.vue     <-- متصل به servicesList و servicesHomeContent
│   │   │   ├── ApproachSection.vue     <-- متصل به approachContent
│   │   │   ├── ProcessSection.vue      <-- متصل به processContent
│   │   │   ├── TestimonialsSection.vue <-- متصل به testimonialsContent
│   │   │   ├── ArticlesSection.vue     <-- متصل به articlesContent
│   │   │   ├── FaqSection.vue          <-- متصل به faqContent
│   │   │   └── ContactSection.vue      <-- متصل به contactContent
│   │   ├── layouts/
│   │   │   ├── AppHeader.vue           <-- متصل به siteConfig و mainNavigation
│   │   │   └── AppFooter.vue           <-- متصل به siteConfig و لینک‌های ناوبری
│   │   └── ui/                         # ۱۷ مؤلفه shadcn-vue
│   │       ├── accordion/
│   │       ├── avatar/
│   │       ├── badge/
│   │       ├── button/
│   │       ├── calendar/
│   │       ├── card/
│   │       ├── dialog/
│   │       ├── form/
│   │       ├── input/
│   │       ├── label/
│   │       ├── native-select/
│   │       ├── popover/
│   │       ├── sheet/
│   │       ├── skeleton/
│   │       ├── sonner/
│   │       ├── tabs/
│   │       └── textarea/
│   ├── data/                           # لایه جامع محتوا و داده متمرکز (NEW)
│   │   ├── index.ts                    # Barrel Export برای ایمپورت ساده از ~/data
│   │   ├── site.ts                     # هویت سایت، اطلاعات برند و تنظیمات تماس شرطی
│   │   ├── navigation.ts               # منوهای هدر، فوتر سریع و پشتیبانی
│   │   ├── services.ts                 # دیتای جامع خدمات، آیکون‌ها و متون
│   │   ├── home.ts                     # داده‌های مستقل تمام سکشن‌های صفحه اول
│   │   └── faqs.ts                     # لیست سؤالات متداول و تنظیمات سکشن FAQ
│   ├── layouts/
│   │   └── default.vue                 # لایوت پیش‌فرض با ساختار هدر، main و فوتر
│   ├── lib/
│   │   └── utils.ts                    # متد کمکی ترکیب کلاس‌ها (cn)
│   ├── pages/
│   │   ├── index.vue                   # مونتاژ نهایی صفحه اصلی
│   │   ├── about.vue                   # درباره ما
│   │   ├── services.vue                # صفحه اختصاصی خدمات
│   │   ├── privacy.vue                 # حریم خصوصی
│   │   └── articles/
│   │       ├── index.vue               # آرشیو مقالات
│   │       └── [slug].vue              # مشاهده متن مقاله
│   └── plugins/
│       └── ssr-width.ts                # تعیین عرض پیش‌فرض SSR
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── error.vue                           # صفحه خطا (باید به app/error.vue منتقل شود)
├── components.json                     # کانفیگ shadcn
├── nuxt.config.ts                      # تنظیمات Nuxt
├── package.json
├── tsconfig.json
└── bun.lock
```

---

## ۷. بررسی تفصیلی اجزای صفحه اصلی و چیدمان (وضعیت پس از اتصال)

| نام کامپوننت                | وضعیت فنی                    | نحوه مدیریت داده فعلی                                           | پیشرفت حاصل‌شده                                                                                            |
| --------------------------- | ---------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **AppHeader.vue**           | عالی و واکنش‌گرا             | متصل به `siteConfig` و `mainNavigation`                         | رفع هاردکدهای منو، ارتقای تابع `isActive`، استفاده از نام و مونوگرام برند                                  |
| **AppFooter.vue**           | کامل و پاک‌سازی‌شده          | متصل به `siteConfig`، `footerQuickLinks` و `footerSupportLinks` | **حذف قطعی شماره‌های تستی؛** رندر کاملاً شرطی شماره، ایمیل و آدرس بر پایه `hasContactInfo`                 |
| **Hero.vue**                | کامل با تمپلیت داینامیک      | متصل به `heroContent` از `~/data`                               | تفکیک هایلایت عنوان و استخراج دکمه‌ها و ویژگی‌های اعتمادسازی به داده متمرکز                                |
| **TrustBar.vue**            | ۴ ستون بر پایه شبکه          | متصل به `trustBarContent` از `~/data`                           | خواندن آیتم‌ها و آیکون‌ها از منبع داده                                                                     |
| **ConcernsSection.vue**     | کارت‌های تجربیات             | متصل به `concernsContent` از `~/data`                           | متون و شماره‌های فارسی تماماً از دیتالایر دریافت می‌شوند                                                   |
| **ServicesSection.vue**     | کارت‌های ۳ گانه با نشان ویژه | متصل به `servicesHomeContent` و `servicesList`                  | استفاده از `iconMap` داینامیک و اتصال کامل به `data/services.ts`                                           |
| **ApproachSection.vue**     | تایم‌لاین چسبان              | متصل به `approachContent` از `~/data`                           | اصول ۳ گانه و نقل‌قول ویژه از داده متمرکز بارگذاری می‌شوند                                                 |
| **ProcessSection.vue**      | لیست مراحل ارتباط            | متصل به `processContent` از `~/data`                            | متن مراحل و یادداشت‌های فرعی به طور یکپارچه از دیتا خوانده می‌شوند                                         |
| **TestimonialsSection.vue** | کارت‌های نقل‌قول             | متصل به `testimonialsContent` از `~/data`                       | در صورت خالی بودن آرایه مخفی می‌ماند (حفظ اصل عدم انتشار نظر فیک)                                          |
| **ArticlesSection.vue**     | ویترین مقالات صفحه اول       | متصل به `articlesContent` از `~/data`                           | آماده برای بارگذاری مقالات پیشنهادی                                                                        |
| **FaqSection.vue**          | آکاردئون تعاملی              | متصل به `faqContent` از `~/data`                                | انتقال کامل سؤالات و پاسخ‌ها به `app/data/faqs.ts`                                                         |
| **ContactSection.vue**      | فرم ارسال پیام               | متصل به `contactContent` از `~/data`                            | **اصلاح اساسی:** حذف تایم‌اوت فیک و پیام ساختگی موفقیت؛ حفظ داده‌های ورودی کاربر و اعلان وضعیت آفلاین موقت |

---

## ۸. وضعیت صفحات مستقل

| صفحه / مسیر                            | وضعیت کدنویسی              | وضعیت اتصال داده                                                                | اقدامات باقی‌مانده                                                      |
| -------------------------------------- | -------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`/` (`index.vue`)**                  | سرهم‌بندی کامل ۱۰ سکشن     | متصل از طریق کامپوننت‌های فرزند                                                 | کامل و تست‌شده                                                          |
| **`/about` (`about.vue`)**             | کامل و مستقل               | داده‌های داخلی اختصاصی صفحه درباره ما                                           | تعویض تگ تودرتو `<main>` با `<div>`؛ اتصال نام برند به `siteConfig`     |
| **`/services` (`services.vue`)**       | تفکیک خدمات و اصول         | **هنوز آرایه محلی دارد؛** باید به `servicesList` در `data/services.ts` متصل شود | حذف آرایه تکراری `services` و تعویض تگ `<main>` با `<div>`              |
| **`/privacy` (`privacy.vue`)**         | ۵ بند سیاست‌نامه           | متن‌های حقوقی درون‌فایلی                                                        | تعویض تگ `<main>` با `<div>`                                            |
| **`/articles` (`articles/index.vue`)** | نمایش ۳ مقاله نمونه        | مقالات به صورت هاردکد موقت در اسکریپت                                           | تعویض تگ `<main>` با `<div>`؛ انتقال به ساختار Nuxt Content             |
| **`/articles/[slug]`**                 | صفحه جزئیات مقاله و اشتراک | دیکشنری مقالات هاردکد موقت                                                      | تعویض تگ `<main>` با `<div>`؛ هندل کردن لغو دیالوگ Share با `try/catch` |
| **صفحه خطا (`error.vue`)**             | کامل با پشتیبانی ۴۰۴ و ۵۰۰ | دکمه‌های بازگشت و متن سفارشی                                                    | **انتقال از `frontend/error.vue` به `frontend/app/error.vue`**          |

---

## ۹. تاریخچه گیت و چرخه تغییرات فرانت‌اند

آخرین وضعیت شاخه `master` شامل زنجیره کامیت‌های ثبت‌شده فرانت‌اند:

```text
bad6119 (HEAD -> master) refactor(frontend): migrate homepage sections to centralized data layer
4e5e4be refactor(frontend): connect layout header and footer to centralized data
74b12fd feat(frontend): establish centralized content layer in app/data
3ffd21e docs(frontend): update and complete project report with live frontend analysis
42d45e2 (origin/master, origin/HEAD) feat: data mdoel and db
48a3da0 fix: removed .env from .gitignore
742478d backend intial
6ece4be feat(frontend): add static data files
c5b7034 feat(frontend): add custom error page
95f1c57 feat(frontend): add privacy page
923f438 feat(frontend): add services page
55f1e81 feat(frontend): add about page
ba87cd8 feat(frontend): add articles pages
b55397e feat(frontend): add contact section to home page
6e2824e feat(frontend): add articles, faq and testimonials sections to home page
e4b26f3 feat(frontend): add process section to home page
1382d62 feat(frontend): add approach section to home page
e6b19db feat(frontend): add services section to home page
58fbf43 feat(frontend): add concerns section to home page
a8ffe4f feat(frontend): add trust bar section to home page
46bd41e feat(frontend): add hero section and rename to PascalCase
189c87d chore: move .gitignore to repository root
c8e17f0 feat(frontend): implement header and footer with lucide icons
6cd13a2 feat(frontend): scaffold app structure with layouts, pages and components
ac6b22c chore(frontend): update nuxt configuration
02a97c0 style(frontend): update tailwind css configuration
ec5748b feat(frontend): add shadcn-vue UI components
81ae9b9 docs: add psychology design system documentation
246b1ea feat(frontend): add UI components, assets, lib and plugins setup
1af9763 initial the frontend core
8f9e96a first commit
```

- **وضعیت مخزن:** ۴ کامیت اخیر (`3ffd21e`، `74b12fd`، `4e5e4be`، `bad6119`) آماده ارسال به گیت‌هاب هستند (`git push origin master`).
- **وضعیت درخت کاری:** پاک (`working tree clean`).

---

## ۱۰. وضعیت معماری داده متمرکز (`app/data/`)

ساختار ۶ فایلی مستقر در `frontend/app/data/`:

1. **`site.ts`:**
   - تعریف اینترفیس‌های `SiteConfig`، `ContactInfo` و `SocialLink`.
   - تنظیم مقادیر `name`، `shortName: 'ک'`، `tagline`، `description`، `footerNote` و تنظیمات دکمه مشاوره `contactCta`.
   - فیلدهای تماس (`phone`، `email`، `address`) به صورت پیش‌فرض `undefined` هستند تا در صورت خالی بودن، ادعای اشتباهی در سایت ثبت نشود.
2. **`navigation.ts`:**
   - منوی اصلی دسکتاپ و موبایل (`mainNavigation`).
   - لینک‌های دسترسی سریع فوتر (`footerQuickLinks`).
   - لینک‌های پشتیبانی و قوانین (`footerSupportLinks`).
3. **`services.ts`:**
   - اینترفیس `Service` و مقادیر متنی بخش خدمات صفحه اصلی (`servicesHomeContent`).
   - آرایه کامل خدمات کلینیک (`servicesList`) با تفکیک شماره‌های فارسی، آیکون، شناسه و وضعیت `featured`.
4. **`home.ts`:**
   - منبع داده جامع بخش‌های اختصاصی صفحه اول: `heroContent`، `trustBarContent`، `concernsContent`، `approachContent`، `processContent`، `testimonialsContent`، `articlesContent` و `contactContent`.
5. **`faqs.ts`:**
   - اینترفیس `FaqItem`، تنظیمات سرتیتر و توضیحات بخش سوالات متداول (`faqSectionContent`) و آرایه ۴ سؤال اساسی مراجعان (`faqsList`).
6. **`index.ts`:**
   - اکسپورت متمرکز تمام ماژول‌ها که امکان ایمپورت با سینتکس تمیز `import { ... } from '~/data'` را فراهم می‌کند.

---

## ۱۱. وضعیت بدهی‌های فنی و باگ‌های شناسایی‌شده (به‌روزشده)

### مواردی که با موفقیت حل و رفع شدند (RESOLVED)

- [x] **انفصال داده‌ها در هدر و فوتر:** با کامیت `4e5e4be` کاملاً حل شد.
- [x] **انفصال داده‌ها در ۱۰ کامپوننت صفحه اصلی:** با کامیت `bad6119` کاملاً حل شد.
- [x] **نمایش شماره تماس و ایمیل فیک در فوتر و تماس:** با تعریف مقادیر شرطی در `site.ts` و استفاده از `hasContactInfo` و `v-if` برطرف شد.
- [x] **رفتار فیک فرم تماس:** تایم‌اوت تقلبی و ادعای دروغین ثبت موفقیت حذف شد؛ متون تایپ‌شده کاربر حفظ شده و پیام صادقانه عدم اتصال آنلاین موقت نمایش داده می‌شود.

---

### موارد باقی‌مانده (اولویت بالا)

1. **انتقال فایل خطا به پوشه `app/` (`error.vue`):**
   فایل هنوز در ریشه `frontend/error.vue` قرار دارد و باید به `frontend/app/error.vue` منتقل شود تا در صورت خطای ۴۰۴ یا ۵۰۰ توسط ناکست لود گردد.
2. **مانت کردن کامپوننت `<Toaster />`:**
   کامپوننت `ContactSection.vue` از توابع `toast.info` و `toast.error` استفاده می‌کند، اما بدون مانت شدن `<Toaster position="top-center" dir="rtl" />` در `app.vue` یا `default.vue` هیچ توستی روی صفحه ظاهر نخواهد شد.
3. **تودرتو بودن تگ‌های `<main>` در صفحات مستقل:**
   لایوت اصلی `default.vue` دارای `<main id="main-content">` است. در صفحات `about.vue`، `services.vue`، `privacy.vue`، `articles/index.vue` و `articles/[slug].vue` باید تگ ریشه تمپلیت از `<main>` به `<div>` تغییر یابد تا استاندارد HTML5 و WCAG رعایت شود.
4. **همگام‌سازی صفحه `pages/services.vue` با دیتای متمرکز:**
   صفحه مستقل خدمات هنوز آرایه محلی کپی‌شده دارد و باید از `servicesList` موجود در `~/data/services` استفاده کند.

---

### موارد با اولویت متوسط

5. **استراتژی مقالات و اتصال Nuxt Content:**
   انتقال مقالات از دیکشنری محلی به فایل‌های Markdown در پوشه `content/articles/` و اتصال ویترین صفحه اصلی (`ArticlesSection`) و صفحات مقالات به این ماژول.
6. **مدیریت خطای Web Share API در صفحه جزئیات مقاله:**
   قرار دادن متد `navigator.share` در بلوک `try/catch` جهت پیشگیری از خطای کنسول هنگام بستن پنجره توسط کاربر و اضافه کردن بازخورد توست هنگام کپی شدن لینک مقاله.
7. **غیرفعال‌سازی دائمی تله‌متری ناکست:**
   افزودن `telemetry: false` به کانفیگ `nuxt.config.ts`.
8. **نصب `vue-tsc` در وابستگی‌های توسعه:**
   جهت اجرای بدون وقفه اسکریپت تایپ‌چک ناکست.

---

## ۱۲. نقشه راه گام‌به‌گام بعدی برای توسعه‌دهنده فرانت‌اند

### فاز ۱ — تکمیل زیرساخت و رفع موانع فوری (پیشنهاد گام بعدی)

- [ ] جابه‌جایی فایل خطا:
  ```bash
  mv frontend/error.vue frontend/app/error.vue
  ```
- [ ] مانت کردن توستر در `frontend/app/app.vue`:
  ```vue
  <template>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
    <Toaster position="top-center" dir="rtl" />
  </template>
  ```
- [ ] تبدیل تگ ریشه `<main>` به `<div>` در ۵ فایل:
  - `frontend/app/pages/about.vue`
  - `frontend/app/pages/services.vue`
  - `frontend/app/pages/privacy.vue`
  - `frontend/app/pages/articles/index.vue`
  - `frontend/app/pages/articles/[slug].vue`
- [ ] اتصال `pages/services.vue` به `servicesList` از `~/data/services`.

### فاز ۲ — مقالات و راه‌اندازی Nuxt Content

- [ ] نصب پکیج `@nuxt/content`.
- [ ] ایجاد پوشه `content/articles/` و تعریف مقالات با Frontmatter (عنوان، خلاصه، زمان مطالعه، دسته‌بندی و تاریخ).
- [ ] خواندن مقالات با کوئری متمرکز در `ArticlesSection.vue` و صفحات وبلاگ.
- [ ] مدیریت خطای انصراف Share و نمایش توست کپی در `articles/[slug].vue`.

### فاز ۳ — یکپارچه‌سازی نهایی و آماده‌سازی انتشار

- [ ] تکمیل اطلاعات واقعی روان‌شناس/کلینیک در `app/data/site.ts`.
- [ ] بازبینی تضاد رنگی و سایز متون در موبایل.
- [ ] پوش نهایی تمام کامیت‌ها به مخزن اصلی گیت‌هاب (`git push origin master`).

---

## ۱۳. چک‌لیست معیارهای پذیرش فرانت‌اند (DoD)

- [x] بیلد پروداکشن Nuxt 4 بدون خطا پاس می‌شود.
- [x] چک تایپ‌های TypeScript با موفقیت کامل و ۰ خطا به اتمام می‌رسد.
- [x] تمام صفحات درخواستی طراحی و پیاده‌سازی شده‌اند.
- [x] راست‌به‌چپ (RTL) و فونت وزیرمتن در سراسر برنامه پیاده‌سازی شده است.
- [x] لایه داده متمرکز (`app/data/`) ایجاد شده و به هدر، فوتر و ۱۰ سکشن صفحه اصلی متصل است.
- [x] اطلاعات تستی و فیک شماره و ایمیل از فرانت‌اند حذف شده است.
- [x] فرم تماس داده‌های کاربر را فیک پاک نمی‌کند و ادعای اشتباهی ندارد.
- [ ] کامپوننت `error.vue` در مسیر `app/error.vue` قرار دارد.
- [ ] نوتیفیکیشن‌های Sonner در صفحه دیده می‌شوند (`<Toaster />` مانت شده است).
- [ ] هیچ صفحه‌ای دارای تگ `<main>` تودرتو نیست.
- [ ] صفحه `pages/services.vue` به داده متمرکز خدمات متصل است.
- [ ] مقالات از طریق Nuxt Content لود می‌شوند.
- [ ] وب‌سایت در صفحه نمایش موبایل و دسکتاپ بدون اسکرول افقی ناخواسته نمایش داده می‌شود.

---

## ۱۴. دستورات اجرایی فرانت‌اند (تأییدشده در سیستم محلی)

```bash
cd frontend

# اجرای سرور محلی توسعه (HMR)
bun run dev

# بررسی سلامت کامل تایپ‌های پروژه
bunx tsc --noEmit

# بیلد نهایی برای محیط عملیاتی
NUXT_TELEMETRY_DISABLED=1 bun run build

# پیش‌نمایش لوکال بیلد نهایی
bun run preview
```

---

## ۱۵. جمع‌بندی

با اجرای این ۳ کامیت هوشمندانه توسط توسعه‌دهنده، فرانت‌اند Kazheh به بالاترین سطح انسجام معماری تا این لحظه رسیده است. هاردکدها از بخش اصلی برنامه حذف شده و تمایز کاملی بین لایه ارائه (Presentation) و لایه محتوا (Data Layer) ایجاد شده است. با رفع باگ‌های زیرساختی باقیمانده (مانت Toaster، جابه‌جایی error.vue و تصحیح تگ‌های main)، فرانت‌اند به محصولی بی‌نقص و کاملاً آماده بهره‌برداری ارتقا خواهد یافت.
