import { siteConfig } from './site';

export const homeData = {
  // ۱. بخش Hero
  hero: {
    badge: 'فضایی برای آرام‌تر دیدن',
    title: {
      beforeHighlight: 'لازم نیست این مسیر را',
      highlight: 'تنها',
      afterHighlight: 'طی کنید.',
    },
    description:
      'اگر هنوز نمی‌دانید دقیقاً چه چیزی آزارتان می‌دهد، گفت‌وگو می‌تواند نقطه شروع خوبی برای شناختن خود و ساختن قدم‌های بعدی باشد.',
    primaryCta: {
      label: 'درخواست مشاوره اولیه',
      href: '/contact',
    },
    secondaryCta: {
      label: 'آشنایی با روش کاری',
      href: '/#approach',
    },
    trustPoints: [
      { icon: 'Check', label: 'شنیدن بدون قضاوت' },
      { icon: 'LockKeyhole', label: 'حفظ محرمانگی' },
      { icon: 'MessageCircle', label: 'گفت‌وگوی انسانی' },
    ],
    visualPanel: {
      badge: 'فضای امن و محرمانه',
      preTitle: 'یک مکث کوتاه',
      quote: 'گاهی شروع تغییر، فقط با یک گفت‌وگوی صادقانه آغاز می‌شود.',
      clinicName: siteConfig.name,
      clinicTagline: siteConfig.tagline,
      floatingCard: {
        title: 'حریم خصوصی شما مهم است',
        description: 'گفت‌وگوها با احترام و محرمانگی همراه هستند.',
      },
    },
  },

  // ۲. بخش اعتمادسازی (TrustBar)
  trustBar: {
    ariaLabel: 'ویژگی‌های کلینیک',
    items: [
      {
        icon: 'LockKeyhole',
        title: 'محرمانگی گفتگوها',
        description: 'حریم خصوصی شما در تمام مراحل حفظ می‌شود.',
      },
      {
        icon: 'HeartHandshake',
        title: 'رویکرد انسانی',
        description: 'شنیدن و همراهی بدون قضاوت و فشار.',
      },
      {
        icon: 'UsersRound',
        title: 'تمرکز بر نیاز شما',
        description: 'مسیر گفتگو بر اساس شرایط شما شکل می‌گیرد.',
      },
      {
        icon: 'CheckCircle2',
        title: 'شروع ساده',
        description: 'برای آغاز مسیر لازم نیست همه پاسخ‌ها را بدانید.',
      },
    ],
  },

  // ۳. بخش دغدغه‌ها (ConcernsSection)
  concerns: {
    badge: 'شاید این تجربه برای شما آشنا باشد',
    title: {
      start: 'اگر این روزها ذهن‌تان',
      highlight: 'شلوغ',
      end: 'است...',
    },
    description:
      'لازم نیست برای شروع گفت‌وگو، مسئله‌تان را دقیق تعریف کرده باشید. همین که احساس می‌کنید چیزی نیاز به توجه دارد، می‌تواند نقطه شروع خوبی باشد.',
    cta: {
      label: 'شروع یک گفت‌وگوی ساده',
      href: '/contact',
    },
    items: [
      {
        icon: 'Brain',
        number: '۰۱',
        title: 'ذهن‌تان مدام درگیر است',
        description:
          'فکرهایتان متوقف نمی‌شوند و حتی در زمان استراحت هم احساس آرامش ندارید.',
      },
      {
        icon: 'Heart',
        number: '۰۲',
        title: 'در رابطه‌ها خسته‌اید',
        description:
          'شاید گفتن نیازهایتان سخت شده یا احساس می‌کنید کسی واقعاً شما را نمی‌شنود.',
      },
      {
        icon: 'MessageCircle',
        number: '۰۳',
        title: 'از خودتان فاصله گرفته‌اید',
        description:
          'گاهی آن‌قدر درگیر خواسته‌ها و انتظارات دیگران می‌شویم که صدای خودمان را کمتر می‌شنویم.',
      },
    ],
    closingMessage:
      'قرار نیست همه‌چیز را همین امروز حل کنید؛ گاهی فقط باید جایی امن برای شروع داشته باشید.',
  },

  // ۴. بخش رویکرد کاری (ApproachSection)
  approach: {
    badge: 'رویکرد ما',
    title: {
      regular: 'درمان فقط پیدا کردن پاسخ نیست؛',
      highlight: 'ساختن فضای درست برای دیدن است.',
    },
    description:
      'هر فرد مسیر متفاوتی دارد. هدف این است که در فضایی امن و محترمانه، امکان دیدن، فهمیدن و انتخاب کردن دوباره فراهم شود.',
    cta: {
      label: 'درباره شروع مسیر بدانید',
      href: '/contact',
    },
    principles: [
      {
        icon: 'HeartHandshake',
        number: '۰۱',
        title: 'شنیدن بدون قضاوت',
        description:
          'اینجا قرار نیست برای احساسات یا تجربه‌های شما برچسبی زده شود. ابتدا می‌شنویم و بعد با هم نگاه می‌کنیم.',
      },
      {
        icon: 'Brain',
        number: '۰۲',
        title: 'تکیه بر دانش روز',
        description:
          'گفت‌وگوها بر پایه رویکردهای علمی و در عین حال با زبانی ساده و قابل فهم پیش می‌روند.',
      },
      {
        icon: 'Sprout',
        number: '۰۳',
        title: 'قدم‌های کوچک و ماندگار',
        description:
          'تغییر همیشه ناگهانی اتفاق نمی‌افتد. مسیر را به قدم‌هایی قابل‌فهم، قابل‌اجرا و متناسب با شما تقسیم می‌کنیم.',
      },
    ],
    quote:
      '«قرار نیست برای بهتر شدن، شبیه شخص دیگری شوید؛ قرار است خودتان را با وضوح و مهربانی بیشتری ببینید.»',
  },

  // ۵. بخش مراحل (ProcessSection)
  process: {
    badge: 'از کجا شروع کنیم؟',
    title: {
      regular: 'اولین قدم، می‌تواند',
      highlight: 'ساده باشد.',
    },
    description:
      'برای شروع، لازم نیست از همه‌چیز مطمئن باشید. کافی است بدانید در هر مرحله چه چیزی در انتظار شماست.',
    steps: [
      {
        number: '۰۱',
        icon: 'MessageCircle',
        title: 'پیام بگذارید',
        description:
          'از بخش تماس، درخواست گفت‌وگو را ارسال کنید. اگر مایل بودید، چند خط درباره موضوعی که ذهن‌تان را مشغول کرده بنویسید.',
        note: 'لازم نیست همه جزئیات را همین ابتدا بیان کنید.',
      },
      {
        number: '۰۲',
        icon: 'Phone',
        title: 'گفت‌وگوی اولیه',
        description:
          'پس از هماهنگی، درباره نیازها و سؤال‌های شما صحبت می‌کنیم تا تصویر روشن‌تری از نحوه شروع داشته باشید.',
        note: 'فرصتی برای پرسیدن و آشنایی بیشتر.',
      },
      {
        number: '۰۳',
        icon: 'Signpost',
        title: 'مسیر مناسب شما',
        description:
          'درباره شیوه ادامه، زمان‌بندی و شرایط جلسات گفت‌وگو می‌کنیم تا بتوانید با آگاهی بیشتری تصمیم بگیرید.',
        note: 'ادامه مسیر با تصمیم و همراهی شماست.',
      },
    ],
    invitation: {
      title: 'می‌توانید از همان چیزی شروع کنید که گفتنش برایتان راحت‌تر است.',
      description:
        'در پیام اولیه، فقط اطلاعاتی را بنویسید که مایل به اشتراک‌گذاری آن هستید.',
      cta: {
        label: 'درخواست مشاوره اولیه',
        href: '/contact',
      },
    },
  },

  // ۶. بخش مقالات (ArticlesSection)
  articles: {
    badge: 'برای خواندن و تأمل کردن',
    title: 'فرصتی برای شناخت بیشتر خودمان',
    description:
      'یادداشت‌هایی درباره احساسات، رابطه‌ها و تجربه‌های روزمره؛ با زبانی ساده و قابل فهم.',
    readTimeSuffix: 'دقیقه مطالعه',
    readArticleLabel: 'مطالعه مقاله',
  },

  // ۷. بخش نظرات مراجعان (TestimonialsSection)
  testimonials: {
    badge: 'تجربه‌های به‌اشتراک‌گذاشته‌شده',
    title: 'هر کسی، روایت خودش را دارد.',
    description:
      'این روایت‌ها تجربه شخصی افراد هستند؛ مسیر و نتیجه جلسات برای هر فرد می‌تواند متفاوت باشد.',
  },

  // ۸. بخش پرسش‌های متداول (FaqSection)
  faq: {
    badge: 'پیش از شروع',
    title: 'شاید سؤال شما هم همین باشد.',
    description:
      'آشنایی با مسیر پیش رو، تصمیم‌گیری را آسان‌تر می‌کند. اینجا به چند سؤال درباره شروع ارتباط پاسخ داده‌ایم.',
    notFoundText: 'پاسخ سؤال‌تان را پیدا نکردید؟',
    askQuestionCta: {
      label: 'سؤال خود را مطرح کنید',
      href: '/contact',
    },
    questions: [
      {
        id: 'getting-started',
        question: 'برای شروع باید دقیقاً بدانم چه مشکلی دارم؟',
        answer:
          'نه. می‌توانید از چیزی شروع کنید که این روزها ذهن‌تان را مشغول کرده است. لازم نیست از اصطلاحات تخصصی استفاده کنید یا از قبل توضیح کاملی آماده داشته باشید.',
      },
      {
        id: 'first-message',
        question: 'در پیام اولیه چه چیزی بنویسم؟',
        answer:
          'یک توضیح کوتاه درباره موضوع گفت‌وگو و راه ارتباطی موردنظرتان کافی است. نیازی نیست در فرم سایت جزئیات حساس یا شرح کامل تجربه‌هایتان را وارد کنید.',
      },
      {
        id: 'uncertainty',
        question: 'اگر هنوز برای شروع مطمئن نباشم چه؟',
        answer:
          'می‌توانید ابتدا سؤال‌هایتان را درباره شیوه جلسات و شرایط همکاری مطرح کنید. برای تصمیم‌گیری درباره ادامه مسیر، فرصت داشته باشید و اطلاعات موردنیازتان را دریافت کنید.',
      },
      {
        id: 'session-details',
        question: 'چطور از هزینه و شرایط جلسات مطلع شوم؟',
        answer:
          'از بخش تماس درباره تعرفه، مدت جلسه، شیوه برگزاری و شرایط لغو یا تغییر زمان سؤال کنید. بهتر است پیش از هماهنگی جلسه، این موارد برایتان روشن باشند.',
      },
      {
        id: 'request',
        question: 'ارسال درخواست به معنی رزرو قطعی جلسه است؟',
        answer:
          'خیر. فرم سایت برای درخواست ارتباط اولیه است. زمان و شرایط جلسه پس از هماهنگی و تأیید دو طرف مشخص می‌شود.',
      },
    ],
  },

  // ۹. بخش تماس و فرم (ContactSection)
  contact: {
    badge: 'شروع گفت‌وگو',
    title: {
      regular: 'از همین‌جا می‌توانید',
      highlight: 'شروع کنید.',
    },
    description:
      'اگر آماده‌اید درباره شرایط خود صحبت کنید، چند خط برای ما بنویسید. لازم نیست همه جزئیات را در پیام اول توضیح دهید.',
    contactInfo: {
      phone: siteConfig.contact.phone,
      phoneHref: siteConfig.contact.phoneHref,
      email: siteConfig.contact.email,
      emailHref: siteConfig.contact.emailHref,
      address: siteConfig.contact.address,
      workingHours: siteConfig.contact.workingHours,
    },
    privacyNote:
      'اطلاعاتی که در این فرم وارد می‌کنید فقط برای پاسخ‌گویی به درخواست شما استفاده می‌شود.',
    form: {
      name: {
        label: 'نام و نام خانوادگی',
        placeholder: 'نام شما',
      },
      phone: {
        label: 'شماره تماس',
        placeholder: '۰۹۱۲۱۲۳۴۵۶۷',
      },
      subject: {
        label: 'موضوع گفت‌وگو',
        placeholder: 'مثلاً مشاوره فردی یا روابط',
      },
      message: {
        label: 'پیام شما',
        placeholder: 'هر مقدار که مایل هستید درباره شرایط خود بنویسید...',
      },
      submitButton: 'ارسال درخواست',
      submittingButton: 'در حال ارسال...',
      notice: 'ارسال فرم به معنی رزرو قطعی جلسه نیست.',
      validationError: 'لطفاً نام، شماره تماس و پیام خود را وارد کنید.',
    },
  },
};

export const heroContent = homeData.hero;
export const trustBarContent = homeData.trustBar;
export const concernsContent = homeData.concerns;
export const approachContent = homeData.approach;
export const processContent = homeData.process;
export const articlesContent = homeData.articles;
export const testimonialsContent = homeData.testimonials;
export const faqContent = homeData.faq;
export const contactContent = homeData.contact;
