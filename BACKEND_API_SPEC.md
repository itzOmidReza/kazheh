# مستندات فنی و مشخصات کامل API کلینیک کاژه (Backend API Specification)

این سند مرجع فنی و رسمی معماری و ساختار API بک‌اند (FastAPI) برای تیم فرانت‌اند (Nuxt 3 / TypeScript) جهت اتصال و یکپارچه‌سازی سرویس‌ها است.

---

## ۱. معماری و پیکربندی کلی سرور

- **فریم‌ورک و ران‌تایم:** Python 3.12+ / FastAPI / SQLAlchemy 2.0 / Pydantic v2
- **فایل اصلی اجرای برنامه:** `backend/app/main.py`
  - دستور اجرای محلی:
    ```bash
    cd backend
    source venv/bin/activate
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ```
- **پیشوند پایه تمام اندپوینت‌ها (Base API Prefix):**

  ```text
  /api/v1
  ```

  - آدرس ریشه محلی برای درخواست‌های کلاینت: `http://127.0.0.1:8000/api/v1`
  - مستندات OpenAPI / Swagger UI: `http://127.0.0.1:8000/docs`
  - مستندات جایگزین Redoc: `http://127.0.0.1:8000/redoc`
  - فایل خام OpenAPI Schema: `http://127.0.0.1:8000/api/v1/openapi.json`

- **بررسی سلامت سرور (Health Check):**
  - **اندپوینت:** `GET /health`
  - **پاسخ موفق (200 OK):**
    ```json
    { "status": "ok", "database": "connected" }
    ```
  - **پاسخ خطا در اتصال به دیتابیس (503 Service Unavailable):**
    ```json
    { "status": "error", "database": "disconnected" }
    ```

### تنظیمات CORS (Cross-Origin Resource Sharing)

تنظیمات CORS در `backend/app/main.py` به صورت منعطف و امن پیاده‌سازی شده است:

- **دامنه و پورت‌های پیش‌فرض مجاز:**
  - `http://localhost:3000` و `http://127.0.0.1:3000` (پورت استاندارد سرور توسعه Nuxt)
  - `http://localhost:5173` و `http://127.0.0.1:5173` (Vite)
  - `http://localhost:4173` و `http://127.0.0.1:4173`
  - `http://localhost:8080` و `http://127.0.0.1:8080`
- **ریجکس مبدأ محلی (Local Origin Regex):**
  `^https?://(localhost|127\.0\.0\.1)(:\d+)?$` (پشتیبانی خودکار از هر پورتی روی لوکال‌هاست با پروتکل HTTP یا HTTPS)
- **تنظیمات کوکی و هدر:**
  - `allow_credentials = True`
  - `allow_methods = ["*"]`
  - `allow_headers = ["*"]`
  - `expose_headers = ["*"]`

### محدودیت حجم بدنه درخواست (Body Size Limit)

- یک میدلور اختصاصی (`RequestBodySizeLimitMiddleware`) روی تمام روت‌ها اعمال شده است.
- حداکثر حجم مجاز بدنه درخواست: **۱۰ مگابایت** (`MAX_REQUEST_BODY_BYTES = 10485760`).
- در صورت ارسال بادی با حجم بیشتر، خطای `413 Request Entity Too Large` بازگردانده می‌شود.

### سرو فایل‌های استاتیک و رسانه‌ها (Static Files & Uploads)

- فایل‌های آپلودی در پوشه فیزیکی `backend/uploads/` ذخیره می‌شوند.
- مانت شده در FastAPI:
  ```python
  app.mount("/static", StaticFiles(directory="uploads"), name="static")
  ```
- **فرمت دسترسی به تصاویر:**
  تصاویر مقالات پس از آپلود، یک مسیر نسبی مانند `/static/articles/<hash>.webp` بازمی‌گردانند.
  - آدرس مستقیم فایل در مرورگر:
    `http://127.0.0.1:8000/static/articles/<filename>.webp`
  - نکته برای فرانت‌اند: یا باید origin بک‌اند به ابتدای این مسیر اضافه شود، یا از قابلیت پروکسی روت‌های Nitro در Nuxt (`/static/** -> http://127.0.0.1:8000/static/**`) استفاده گردد.

---

## ۲. سیستم احراز هویت و توکن (Auth System)

سیستم احراز هویت از توکن‌های استاندارد **JWT (JSON Web Token)** با الگوریتم **HS256** استفاده می‌کند.

### ۲.۱. لاگین مدیر (Admin Login)

- **آدرس دقیق:** `POST /api/v1/auth/login`
- **نوع محتوا (Content-Type):**
  `application/x-www-form-urlencoded`
  _(توجه: این اندپوینت از `OAuth2PasswordRequestForm` استفاده می‌کند و نباید با `application/json` فراخوانی شود)._
- **پارامترهای ورودی (Form URL Encoded):**
  | نام فیلد | نوع | اجباری | توضیحات |
  | :--- | :--- | :---: | :--- |
  | `username` | `string` | بله | **شماره موبایل ثبت‌شده مدیر** (مانند `09121234567`) |
  | `password` | `string` | بله | کلمه عبور مدیر (حداقل ۸ و حداکثر ۷۲ بایت بر اساس محدودیت Bcrypt) |

- **محدودیت نرخ درخواست (Rate Limit):**
  حداکثر **۱۰ درخواست در هر ۶۰ ثانیه** به ازای هر کلاینت IP. در صورت فراتر رفتن، خطای `429 Too Many Requests` با هدر `Retry-After` دریافت می‌شود.

- **پاسخ موفق (200 OK):**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
  }
  ```
- **مدت اعتبار توکن:**
  ۱۴۴۰ دقیقه (معادل **۲۴ ساعت**). فیلد `sub` در پی‌لود توکن حاوی شماره موبایل مدیر است.

- **پاسخ خطای اعتبارسنجی (401 Unauthorized):**
  ```json
  {
    "detail": "Incorrect phone number or password"
  }
  ```

### ۲.۲. نحوه ارسال توکن در درخواست‌های ادمین

برای تمام اندپوینت‌های تحت حفاظت ادمین، توکن باید در هدر Authorization ارسال گردد:

```http
Authorization: Bearer <access_token>
```

اگر توکن ارسال نشود یا منقضی شده باشد: خطای `401 Unauthorized` برگردانده می‌شود.
اگر حساب کاربری مدیر غیرفعال شده باشد (`is_active=False`): خطای `403 Forbidden` با پیام `"Inactive admin account"` دریافت می‌شود.

### ۲.۳. دریافت اطلاعات مدیر لاگین‌شده (Current Admin Profile)

- **آدرس دقیق:** `GET /api/v1/auth/me`
- **احراز هویت:** الزامی (`Bearer Token`)
- **پاسخ موفق (200 OK - مدل `AdminUserResponse`):**
  ```json
  {
    "id": 1,
    "phone": "09121234567",
    "username": "admin",
    "full_name": "دکتر روان‌شناس",
    "email": "admin@kazheh.ir",
    "is_active": true,
    "is_superuser": true,
### ۲.۴. ویرایش مشخصات مدیر لاگین‌شده (Update Current Admin Profile)

- **آدرس دقیق:** `PATCH /api/v1/auth/me` و `PUT /api/v1/auth/me`
  _(هر دو متد روی همین روت پیاده‌سازی شده و رفتار یکسانی دارند: به‌روزرسانی جزئی (Partial)؛ فقط فیلدهای ارسال‌شده تغییر می‌کنند.)_
- **احراز هویت:** الزامی (`Bearer Token`)
- **نوع محتوا:** `application/json`
- **بدنه درخواست (مدل `AdminUserUpdate`):** تمامی فیلدها اختیاری هستند.
  | نام فیلد | نوع | اجباری | محدودیت‌ها |
  | :--- | :--- | :---: | :--- |
  | `full_name` | `string \| null` | خیر | ۳ تا ۱۰۰ کاراکتر (ضدعفونی امنیتی XSS) |
  | `phone` | `string \| null` | خیر | ۷ تا ۲۰ کاراکتر (همزمان شناسه ورود به سامانه) |
- **فیلدهای فقط‌خواندنی:** در صورت ارسال `username`، `email`، `is_superuser` و مشابه آن، این مقادیر **نادیده گرفته می‌شوند** (خطای 422 رخ نمی‌دهد).
- **نمونه بادی ارسالی:**
  ```json
  {
    "full_name": "دکتر روان‌شناس",
    "phone": "09121234567"
  }
  ```
- **پاسخ موفق (200 OK - مدل `AdminUserResponse`):** آبجکت کامل و به‌روزرسانی‌شده مدیر:
  ```json
  {
    "id": 1,
    "phone": "09121234567",
    "username": "admin",
    "full_name": "دکتر روان‌شناس",
    "email": "admin@kazheh.ir",
    "is_active": true,
    "is_superuser": true,
    "created_at": "2026-09-25T11:14:00Z"
  }
  ```
- **خطاهای محتمل:**
  | کد | شرط |
  | :--- | :--- |
  | `401 Unauthorized` | توکن ارسال نشده یا منقضی/نامعتبر باشد |
  | `409 Conflict` | `phone` جدید قبلاً برای مدیر دیگری ثبت شده باشد (`{"detail": "This phone number is already registered for another admin."}`) |
  | `422 Unprocessable Entity` | نقض محدودیت‌های طول (`full_name` کمتر از ۳ یا `phone` کمتر از ۷ کاراکتر) |
- **نکته مهم درباره تغییر شماره تلفن:**
  مقدار `sub` توکن JWT برابر شماره تلفن مدیر است؛ بنابراین با تغییر `phone` توکن فعلی باطل می‌شود. در این حالت علاوه بر بدنه پاسخ، یک توکن تازه امضاشده در هدر پاسخ زیر بازگردانده می‌شود:
  ```http
  X-Refreshed-Access-Token: <new_access_token>
  ```
  _پیشنهاد فرانت‌اند:_ در صورت وجود این هدر، مقدار آن را جایگزین توکن ذخیره‌شده (کوکی `kazheh_token`) کنید تا نیازی به ورود مجدد نباشد.

### ۲.۵. تغییر رمز عبور مدیر لاگین‌شده (Change Current Admin Password)

- **آدرس دقیق:** `POST /api/v1/auth/change-password`
- **احراز هویت:** الزامی (`Bearer Token`)
- **نوع محتوا:** `application/json`
- **بدنه درخواست (مدل `PasswordChangeRequest`):**
  | نام فیلد | نوع | اجباری | محدودیت‌ها |
  | :--- | :--- | :---: | :--- |
  | `current_password` | `string` | بله | رمز عبور فعلی مدیر |
  | `new_password` | `string` | بله | حداقل ۸ کاراکتر و حداکثر ۷۲ بایت (محدودیت bcrypt) |
- **نمونه بادی ارسالی:**
  ```json
  {
    "current_password": "OldPass123",
    "new_password": "NewPass123"
  }
  ```
- **پاسخ موفق (200 OK):**
  ```json
  { "message": "Password changed successfully." }
  ```
- **پاسخ خطا:**
  | کد | شرط |
  | :--- | :--- |
  | `400 Bad Request` | رمز عبور فعلی اشتباه است (`{"detail": "Current password is incorrect."}`) |
  | `422 Unprocessable Entity` | رمز جدید کمتر از ۸ کاراکتر یا بیشتر از ۷۲ بایت باشد |
- **نکته:** پس از تغییر رمز، توکن فعلی معتبر باقی می‌ماند و نیازی به ورود مجدد نیست. (کد خطای رمز اشتباه به‌عمد `400` است و نه `401` تا میان‌افزار فرانت‌اند نشست کاربر را منقضی و او را از پنل خارج نکند.)

---

## ۳. مشخصات کامل روت‌ها و اسکیماهای Pydantic

### ۳.۱. ماژول پیام‌های مراجعین و فرم تماس (`/api/v1/contact`)

#### ۱. ثبت پیام مراجع (عمومی)

- **آدرس:** `POST /api/v1/contact`
- **احراز هویت:** عمومی (بدون توکن)
- **محدودیت نرخ (Rate Limit):** ۱۰ درخواست در هر ۶۰ ثانیه به ازای هر IP.
- **فرمت ورودی (Content-Type: `application/json` - مدل `ContactMessageCreate`):**
  | فیلد | نوع | اجباری | محدودیت‌ها | توضیحات |
  | :--- | :--- | :---: | :--- | :--- |
  | `full_name` | `string` | بله | ۲ تا ۱۰۰ کاراکتر | نام و نام‌خانوادگی مراجع (ضدعفونی امنیتی XSS) |
  | `phone` | `string` | بله | ۷ تا ۲۰ کاراکتر | شماره تماس جهت هماهنگی |
  | `email` | `string` | خیر | فرمت EmailStr، حداکثر ۱۰۰ | آدرس ایمیل اختیاری مراجع |
  | `subject` | `string` | خیر | حداکثر ۲۰۰ کاراکتر | موضوع مشاوره یا درخواست (ضدعفونی XSS) |
  | `message` | `string` | بله | ۱۰ تا ۵۰۰۰ کاراکتر | متن پیام یا شرح مختصر (ضدعفونی XSS) |

- **نمونه بادی ارسالی:**

  ```json
  {
    "full_name": "سارا محمدی",
    "phone": "09129876543",
    "email": "sara@example.com",
    "subject": "درخواست مشاوره فردی",
    "message": "سلام، مایل به دریافت وقت مشاوره برای مدیریت استرس شغلی هستم."
  }
  ```

- **پاسخ موفق (201 Created - مدل `ContactMessageResponse`):**
  ```json
  {
    "id": 14,
    "full_name": "سارا محمدی",
    "phone": "09129876543",
    "email": "sara@example.com",
    "subject": "درخواست مشاوره فردی",
    "message": "سلام، مایل به دریافت وقت مشاوره برای مدیریت استرس شغلی هستم.",
    "is_read": false,
    "created_at": "2026-09-26T20:15:30.123456Z"
  }
  ```

#### ۲. لیست پیام‌های کارتابل (ادمین)

- **آدرس:** `GET /api/v1/contact`
- **احراز هویت:** الزامی (`Bearer Token`)
- **پارامترهای Query String:**
  | پارامتر | نوع | پیش‌فرض | توضیحات |
  | :--- | :--- | :---: | :--- |
  | `skip` | `integer` | `0` | آفست صفحه‌بندی (`ge=0`) |
  | `limit` | `integer` | `20` | تعداد در هر صفحه (حداقل ۱، حداکثر ۱۰۰) |
  | `unread_only` | `boolean` | `false` | در صورت `true`، فقط پیام‌های خوانده‌نشده بازگردانده می‌شوند |

- **پاسخ موفق (200 OK):** آرایه‌ای از آبجکت‌های `ContactMessageResponse`.
  ```json
  [
    {
      "id": 14,
      "full_name": "سارا محمدی",
      "phone": "09129876543",
      "email": "sara@example.com",
      "subject": "درخواست مشاوره فردی",
      "message": "...",
      "is_read": false,
      "created_at": "2026-09-26T20:15:30.123456Z"
    }
  ]
  ```

#### ۳. مشاهده تک‌پیام (ادمین)

- **آدرس:** `GET /api/v1/contact/{message_id}`
- **احراز هویت:** الزامی (`Bearer Token`)
- **پاسخ موفق (200 OK):** آبجکت `ContactMessageResponse`
- **خطا (404 Not Found):** `{"detail": "Contact message with ID {id} not found."}`

#### ۴. تغییر وضعیت خوانده‌شده/نشده (ادمین)

- **آدرس:** `PATCH /api/v1/contact/{message_id}`
- **احراز هویت:** الزامی (`Bearer Token`)
- **بدنه درخواست (Content-Type: `application/json` - مدل `ContactMessageUpdate`):**
  ```json
  {
    "is_read": true
  }
  ```
- **پاسخ موفق (200 OK):** آبجکت `ContactMessageResponse` با مقدار بروزرسانی‌شده `is_read`.

#### ۵. حذف پیام (ادمین)

- **آدرس:** `DELETE /api/v1/contact/{message_id}`
- **احراز هویت:** الزامی (`Bearer Token`)
- **پاسخ موفق (204 No Content):** بدون بادی.

---

### ۳.۲. ماژول مقالات و وبلاگ (`/api/v1/articles`)

#### ۱. لیست مقالات (عمومی + قابل استفاده برای ادمین)

- **آدرس:** `GET /api/v1/articles`
- **احراز هویت:** عمومی؛ _در صورت ارسال توکن ادمین معتبر، امکان دریافت پیش‌نویس‌ها هم فراهم است._
- **پارامترهای Query String:**
  | پارامتر | نوع | پیش‌فرض | توضیحات |
  | :--- | :--- | :---: | :--- |
  | `skip` | `integer` | `0` | آفست صفحه‌بندی (`ge=0`) |
  | `limit` | `integer` | `20` | تعداد در هر صفحه (حداقل ۱، حداکثر ۱۰۰) |
  | `published_only` | `boolean` | `true` | در حالت `true` فقط مقالات منتشرشده بازگردانده می‌شوند. برای دریافت **همه مقالات (منتشرشده + پیش‌نویس)** مقدار `false` را ارسال کنید؛ این حالت **نیازمند هدر `Authorization: Bearer <token>` ادمین** است. |
- **نکته امنیتی مهم:** اگر `published_only=false` بدون توکن معتبر ادمین ارسال شود، پاسخ زیر برگردانده می‌شود (پیش‌نویس‌ها هرگز برای کاربر عمومی افشا نمی‌شوند):
  ```json
  // HTTP 401 Unauthorized
  { "detail": "Admin authentication is required to list unpublished articles." }
  ```
- **نمونه فراخوانی پنل ادمین:**
  ```http
  GET /api/v1/articles?published_only=false&limit=50
  Authorization: Bearer <admin_token>
  ```
- **نمونه فراخوانی سایت عمومی (بدون توکن):**
  ```http
  GET /api/v1/articles?published_only=true
  ```
- **پاسخ موفق (200 OK - مدل `List[ArticleListItem]`):**
  > **نکته بهینه‌سازی پرفورمنس:** این روت فیلد سنگین `content` را برنمی‌گرداند تا رندر لیست و کارت مقالات در فرانت‌اند با حداکثر سرعت انجام شود.
  ```json
  [
    {
      "id": 1,
      "title": "راهکارهای علمی مدیریت اضطراب در زندگی روزمره",
      "slug": "راهکارهای-علمی-مدیریت-اضطراب-در-زندگی-روزمره",
      "summary": "بررسی روش‌های شناختی-رفتاری برای مواجهه با تنش‌ها و بازگرداندن آرامش ذهنی.",
      "cover_image_url": "/static/articles/fcf86fbbaaff4b28ab3dcf6339e96577.webp",
      "is_published": true,
      "author_id": 1,
      "created_at": "2026-09-25T14:50:00Z",
      "updated_at": "2026-09-25T14:50:00Z"
    }
  ]
  ```

#### ۲. دریافت متن کامل مقاله با اسلاگ SEO

- **آدرس:** `GET /api/v1/articles/{slug}`
- **احراز هویت:** عمومی. برای کاربران بدون توکن فقط مقالاتی که `is_published=True` باشند بازگردانده می‌شوند (پیش‌نویس‌ها در این حالت `404` می‌دهند). اگر توکن ادمین معتبر همراه درخواست باشد، پیش‌نویس‌ها هم با همین روت قابل مشاهده/ویرایش هستند.
- **پاسخ موفق (200 OK - مدل `ArticleResponse`):**
  ```json
  {
    "id": 1,
    "title": "راهکارهای علمی مدیریت اضطراب در زندگی روزمره",
    "slug": "راهکارهای-علمی-مدیریت-اضطراب-در-زندگی-روزمره",
    "summary": "بررسی روش‌های شناختی-رفتاری برای مواجهه با تنش‌ها و بازگرداندن آرامش ذهنی.",
    "content": "<h2>مقدمه</h2><p>متن کامل مقاله به صورت HTML یا Markdown...</p>",
    "cover_image_url": "/static/articles/fcf86fbbaaff4b28ab3dcf6339e96577.webp",
    "is_published": true,
    "author_id": 1,
    "created_at": "2026-09-25T14:50:00Z",
    "updated_at": "2026-09-25T14:50:00Z"
  }
  ```
- **خطا (404 Not Found):** `{"detail": "Article '{slug}' not found."}`

#### ۳. آپلود و بهینه‌سازی تصویر شاخص مقاله (ادمین)

- **آدرس:** `POST /api/v1/articles/upload-image`
- **احراز هویت:** الزامی (`Bearer Token`)
- **نوع محتوا:** `multipart/form-data`
- **پارامتر فرم:**
  - نام فیلد: `file`
  - فرمت‌های مجاز: `image/jpeg`، `image/png`، `image/webp`
  - حداکثر حجم مجاز: **۵ مگابایت**
- **فرآیند پردازش بک‌اند:**
  - بررسی سلامت تصویر (Pillow Verify)
  - تصحیح زاویه تصویر بر اساس متادیتای EXIF
  - تغییر ابعاد هوشمند (در صورتی که عرض بیش از ۱۶۰۰ پیکسل باشد، با حفظ نسبت تصویر کوچک می‌شود)
  - فشرده‌سازی و تبدیل خودکار به فرمت مدرن **WebP** (کیفیت ۸۲٪)
  - ذخیره در مسیر `backend/uploads/articles/{uuid4}.webp`
- **پاسخ موفق (201 Created):**
  ```json
  {
    "url": "/static/articles/fcf86fbbaaff4b28ab3dcf6339e96577.webp"
  }
  ```

#### ۴. لیست کامل مقالات شامل پیش‌نویس‌ها (ادمین)

- **آدرس:** `GET /api/v1/articles/admin/all`
- **احراز هویت:** الزامی (`Bearer Token`)
- **پارامترهای Query String:**
  - `skip`: `integer` (پیش‌فرض ۰)
  - `limit`: `integer` (پیش‌فرض ۵۰، حداکثر ۱۰۰)
  - `published_only`: `boolean` (پیش‌فرض `false`)
- **پاسخ موفق (200 OK):** `List[ArticleListItem]`

#### ۵. مشاهده تک‌مقاله بر اساس ID (ادمین)

- **آدرس:** `GET /api/v1/articles/admin/{article_id}`
- **احراز هویت:** الزامی (`Bearer Token`)
- **توضیحات:** بر خلاف روت عمومی که فقط منتشرشده‌ها را با اسلاگ می‌آورد، این روت مقالات پیش‌نویس را نیز با شناسه عددی برمی‌گرداند.
- **پاسخ موفق (200 OK):** `ArticleResponse`

#### ۶. ایجاد مقاله جدید (ادمین)

- **آدرس:** `POST /api/v1/articles`
- **احراز هویت:** الزامی (`Bearer Token`)
- **بدنه درخواست (Content-Type: `application/json` - مدل `ArticleCreate`):**
  | فیلد | نوع | اجباری | توضیحات |
  | :--- | :--- | :---: | :--- |
  | `title` | `string` | بله | عنوان مقاله (۳ تا ۲۰۰ کاراکتر) |
  | `slug` | `string` | خیر | اسلاگ سفارشی (در صورت خالی بودن، بر اساس عنوان فارسی با استاندارد SEO به همراه شمارنده تصادم به طور خودکار تولید می‌شود) |
  | `summary` | `string` | خیر | خلاصه یا بریده مقاله (حداکثر ۵۰۰ کاراکتر) |
  | `content` | `string` | بله | بدنه مقاله (حداقل ۱۰ کاراکتر - ضدعفونی امنیتی XSS روی تگ‌های مخرب) |
  | `cover_image_url` | `string` | خیر | آدرس تصویر شاخص (معمولاً خروجی اندپوینت upload-image) |
  | `is_published` | `boolean` | خیر | وضعیت انتشار (پیش‌فرض: `false` یعنی پیش‌نویس) |

- **نمونه بادی ارسالی:**
  ```json
  {
    "title": "روان‌درمانی چیست و چه کمکی به ما می‌کند؟",
    "slug": "روان‌درمانی-چیست-و-چه-کمکی-می‌کند",
    "summary": "آشنایی با فرایند روان‌درمانی و اهداف جلسات مشاوره فردی.",
    "content": "<h2>مفهوم روان‌درمانی</h2><p>متن مقاله...</p>",
    "cover_image_url": "/static/articles/fcf86fbbaaff4b28ab3dcf6339e96577.webp",
    "is_published": true
  }
  ```
- **پاسخ موفق (201 Created):** آبجکت کامل `ArticleResponse` همراه با `id`, `author_id`, `created_at`, `updated_at`.

#### ۷. ویرایش مقاله (ادمین)

- **آدرس:** `PATCH /api/v1/articles/{article_id}`
- **احراز هویت:** الزامی (`Bearer Token`)
- **بدنه درخواست (Content-Type: `application/json` - مدل `ArticleUpdate`):**
  تمامی فیلدها اختیاری (`Optional`) هستند:
  ```json
  {
    "title": "عنوان ویرایش شده",
    "is_published": false,
    "summary": "خلاصه جدید..."
  }
  ```
  _(اگر اسلاگ یا تایتل تغییر کند، یکتایی اسلاگ به صورت خودکار ارزیابی و بروزرسانی می‌شود)._
- **پاسخ موفق (200 OK):** آبجکت بروزرسانی‌شده `ArticleResponse`.

#### ۸. حذف مقاله (ادمین)

- **آدرس:** `DELETE /api/v1/articles/{article_id}`
- **احراز هویت:** الزامی (`Bearer Token`)
- **پاسخ موفق (204 No Content):** بدون بادی.

---

### ۳.۳. ماژول مدیریت کاربران و تیم کلینیک

- **وضعیت پیاده‌سازی بک‌اند:**
  در نسخه فعلی، روت‌های مدیریت چندکاربره ادمین (`/users` یا `/admin/users`) در لایه API تعریف نشده‌اند.
- **اطلاعات حساب کاربری فعال:**
  مشاهده اطلاعات مدیر واردشده از طریق روت `GET /api/v1/auth/me` پشتیبانی می‌شود.
- **ویرایش اطلاعات پروفایل:**
  از طریق `PATCH /api/v1/auth/me` و `PUT /api/v1/auth/me` (به‌روزرسانی جزئی فیلدهای `full_name` و `phone`) — جزئیات در بخش ۲.۴.
- **تغییر رمز عبور:**
  از طریق `POST /api/v1/auth/change-password` — جزئیات در بخش ۲.۵.
- **توجه درباره فیلد `username`:** این فیلد در بک‌اند فقط‌خواندنی است و از طریق روت‌های پروفایل قابل تغییر نیست؛ ورود به سامانه نیز صرفاً با `phone` و رمز عبور انجام می‌شود.

---

## ۴. پایگاه داده و وضعیت Seed Data

- **نوع پایگاه داده:** **PostgreSQL**
- **درایور و کتابخانه اتصال:** `psycopg2-binary` با `SQLAlchemy 2.0`
- **تنظیمات کانکشن‌پول (Connection Pool):**
  - `pool_size = 10`
  - `max_overflow = 20`
  - `pool_recycle = 1800` (۳۰ دقیقه)
  - `pool_timeout = 30`
  - `pool_pre_ping = True` (بررسی پایداری کانکشن قبل از اجرای کوئری)
- **سیستم مایگریشن:** **Alembic**
  - نسخه‌های فعال:
    1. `9711c6410af5`: ایجاد جدول‌های پایه `admin_user`, `contact_messages`, `article`
    2. `80530c2ac821`: اضافه شدن فیلد `subject` به پیام‌ها
    3. `29e71037b490`: اضافه شدن فیلد `cover_image_url` به مقالات

### وضعیت حساب مدیر پیش‌فرض (Super Admin Seed)

- سیستم فاقد کاربر ادمین هاردکدشده یا رمز عبور پیش‌فرض متنی درون کد است تا مسائل امنیتی ایجاد نشود.
- **روش ایجاد کاربر مدیر اولیه:**
  یک اسکریپت تعاملی CLI در مسیر `backend/app/scripts/seed_admin.py` تعبیه شده است:

  ```bash
  cd backend
  source venv/bin/activate
  python -m app.scripts.seed_admin
  ```

  هنگام اجرا، اسکریپت اطلاعات زیر را از شما درخواست می‌کند:
  1. `Enter admin phone:` -> شماره تلفن همراه (مانند `09121234567`)
  2. `Enter admin username:` -> نام کاربری یکتا (مانند `admin`)
  3. `Enter admin password:` -> کلمه عبور حداقل ۸ کاراکتر (مانند `Secret@1234`)

  پس از وارد کردن مقادیر، کاربر با نقش سوپراوزر (`is_superuser=True, is_active=True`) در جدول دیتابیس ثبت می‌شود و بلافاصله برای لاگین در فرانت‌اند آماده است.

---

## ۵. راهنمای عملی اتصال در Nuxt 3 (Frontend Integration Guide)

### ۵.۱. کانفیگ `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1',
    },
  },

  // پروکسی استاتیک برای دسترسی مستقیم به عکس‌های آپلود شده بک‌اند
  nitro: {
    routeRules: {
      '/static/**': {
        proxy:
          (process.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(
            /\/api\/v1\/?$/,
            '',
          ) + '/static/**',
      },
    },
  },
});
```

### ۵.۲. نحوه لاگین و ذخیره توکن

```typescript
const login = async (phone: string, password: string) => {
  const config = useRuntimeConfig();

  // استفاده از URLSearchParams برای فرمت x-www-form-urlencoded
  const body = new URLSearchParams();
  body.append('username', phone.trim()); // توجه: کلید username حاوی شماره تماس است
  body.append('password', password);

  const response = await $fetch<{ access_token: string; token_type: string }>(
    `${config.public.apiBaseUrl}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    },
  );

  const cookie = useCookie('admin_token', { maxAge: 86400, path: '/' });
  cookie.value = response.access_token;
};
```

### ۵.۳. ساختار خطاهای بازگشتی FastAPI

- **خطاهای منطقی سرور (HTTPException):**
  ```json
  {
    "detail": "Contact message with ID 10 not found."
  }
  ```
- **خطاهای اعتبارسنجی ورودی پایدنتیک (422 Unprocessable Entity):**
  ```json
  {
    "detail": [
      {
        "loc": ["body", "phone"],
        "msg": "String should have at least 7 characters",
        "type": "string_too_short"
      }
    ]
  }
  ```
  _کلاینت فرانت‌اند باید قابلیت نمایش پیام چه به صورت رشته و چه به صورت لیست خطاهای آرایه‌ای را داشته باشد._
