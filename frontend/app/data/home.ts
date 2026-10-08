import { siteConfig } from './site';

export const homeData = {
  // ۱. بخش Hero
  hero: {
    badge: 'کاژه؛ پناهگاهی امن برای سلامت روان',
    title: {
      beforeHighlight: 'کاژه؛ ',
      highlight: 'پناهگاهی امن',
      afterHighlight: ' برای سلامت روان',
    },
    description:
      'کاژه با همکاری روان‌درمانگران، روان‌پزشکان و متخصصان معتبر، خدمات علمی و تخصصی روان‌شناسی را برای بهبود کیفیت زندگی شما ارائه می‌دهد.',
    descriptionDesktop:
      'کاژه با همکاری روان‌درمانگران، روان‌پزشکان و متخصصان معتبر، خدمات علمی و تخصصی روان‌شناسی را برای بهبود کیفیت زندگی شما ارائه می‌دهد.',
    descriptionMobile:
      'اینجا کسی قضاوت نمی‌کند. ما با شما گوش می‌دهیم، همراهی می‌کنیم و بر پایه‌ی علم، به بهبود حالتان کمک می‌کنیم.',
    primaryCta: {
      label: 'پیش‌مشاوره رایگان',
      href: '/contact',
    },
    secondaryCta: {
      label: 'مشاوره متنی رایگان',
      href: '/contact',
    },
    trustPoints: [
      { icon: 'Check', label: 'تخصص علمی: بر پایه‌ی شواهد و استانداردها' },
      { icon: 'LockKeyhole', label: 'محرمانگی: حفظ کامل اطلاعات شما' },
      { icon: 'MessageCircle', label: 'انتخاب آگاهانه: با اطلاعات دقیق و شفاف' },
    ],
    visualPanel: {
      badge: 'محیط امن و محرمانه',
      preTitle: 'یک مکث کوتاه',
      quote: 'همیشه کنار شما هستیم - در هر مرحله از مسیر سلامت روان',
      clinicName: siteConfig.shortName,
      clinicTagline: siteConfig.tagline,
      floatingCard: {
        title: 'محرمانگی',
        description: 'حفظ کامل اطلاعات شما',
      },
    },
  },

  // ۲. بخش اعتمادسازی (TrustBar)
  trustBar: {
    ariaLabel: 'ارزش‌های کلیدی کاژه',
    items: [
      {
        icon: 'CheckCircle2',
        title: 'تخصص علمی',
        description: 'بر پایه‌ی شواهد و استانداردها',
      },
      {
        icon: 'LockKeyhole',
        title: 'محرمانگی',
        description: 'حفظ کامل اطلاعات شما',
      },
      {
        icon: 'HeartHandshake',
        title: 'انتخاب آگاهانه',
        description: 'با اطلاعات دقیق و شفاف',
      },
    ],
  },

  // ۳. بخش دغدغه‌ها (ConcernsSection)
  concerns: {
    badge: 'شاید این تجربه برای شما آشنا باشد',
    title: {
      start: 'اگر این روزها ذهن‌تان ',
      highlight: 'شلوغ',
      end: ' است...',
    },
    description:
      'لازم نیست برای شروع گفت‌وگو، مسئله‌تان را دقیق تعریف کرده باشید. همین که احساس می‌کنید چیزی نیاز به توجه دارد، می‌تواند نقطه شروع خوبی باشد.',
    cta: {
      label: 'پیش‌مشاوره رایگان',
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

  // ۴. بخش رویکرد کاری (ApproachSection - چرا کاژه؟)
  approach: {
    badge: 'چرا کاژه؟',
    title: {
      regular: 'فضایی امن و علمی برای ',
      highlight: 'رشد و سلامت روان شما',
    },
    description:
      'کاژه بر پایه‌ی شواهد پژوهشی، رعایت کامل حریم خصوصی و تیم متخصص و مجرب همراه شماست.',
    cta: {
      label: 'پیش‌مشاوره رایگان',
      href: '/contact',
    },
    principles: [
      {
        icon: 'Brain',
        number: '۰۱',
        title: 'رویکرد علمی و انسانی',
        description:
          'بر پایه‌ی شواهد پژوهشی و بهره‌گیری از رویکردهای درمانی استاندارد و اثبات‌شده.',
      },
      {
        icon: 'LockKeyhole',
        number: '۰۲',
        title: 'محیط امن و محرمانه',
        description:
          'رعایت کامل حریم خصوصی و حفظ کامل اطلاعات و محرمانگی جلسات شما.',
      },
      {
        icon: 'UsersRound',
        number: '۰۳',
        title: 'تیم متخصص و مجرب',
        description:
          'با مدارک معتبر از روان‌درمانگران، روان‌پزشکان و اساتید برجسته دانشگاه.',
      },
      {
        icon: 'HeartHandshake',
        number: '۰۴',
        title: 'همراهی بلندمدت / شفافیت و اعتماد',
        description:
          'در مسیر رشد فردی همراه با اطلاعات دقیق و شفاف و هزینه‌های منصفانه.',
      },
    ],
    quote:
      '«اینجا کسی قضاوت نمی‌کند. ما با شما گوش می‌دهیم، همراهی می‌کنیم و بر پایه‌ی علم، به بهبود حالتان کمک می‌کنیم.»',
  },

  // ۵. بخش مراحل (ProcessSection)
  process: {
    badge: 'از کجا شروع کنیم؟',
    title: {
      regular: 'اولین قدم، می‌تواند ',
      highlight: 'ساده باشد.',
    },
    description:
      'برای شروع، لازم نیست از همه‌چیز مطمئن باشید. کافی است بدانید در هر مرحله چه چیزی در انتظار شماست.',
    steps: [
      {
        number: '۰۱',
        icon: 'MessageCircle',
        title: 'ارزیابی اولیه',
        description:
          'پاسخ به چند سوال یا ارسال پیام کوتاه و دریافت توصیه تخصصی.',
        note: 'لازم نیست همه جزئیات را همین ابتدا بیان کنید.',
      },
      {
        number: '۰۲',
        icon: 'Phone',
        title: 'پیش‌مشاوره رایگان',
        description:
          'گفتگوی کوتاه تلفنی با متخصص برای شناخت نیاز و انتخاب مشاور مناسب.',
        note: 'فرصتی برای پرسیدن و دریافت راهنمایی شفاف.',
      },
      {
        number: '۰۳',
        icon: 'Signpost',
        title: 'شروع جلسات و همراهی',
        description:
          'شروع جلسات حضوری یا آنلاین بر اساس انتخاب آگاهانه و شرایط شما.',
        note: 'ادامه مسیر با تصمیم و همراهی آگاهانه شماست.',
      },
    ],
    invitation: {
      title: 'به مسیر بهتر زندگی فکر کن...',
      description:
        'با کمک متخصصان کاژه، می‌توانید قدم‌های مطمئنتری در مسیر سلامت روان خود بردارید.',
      sideBadge: 'همیشه کنار شما هستیم - در هر مرحله از مسیر سلامت روان',
      cta: {
        label: 'رزرو نوبت',
        href: '/contact',
      },
    },
  },

  // ۶. بخش مقالات (ArticlesSection)
  articles: {
    badge: 'مقالات و آموزش‌ها',
    title: 'مقالات و آموزش‌ها',
    description:
      'یادداشت‌ها و آموزش‌های علمی و تخصصی روان‌شناسی برای بهبود کیفیت زندگی.',
    readTimeSuffix: 'دقیقه مطالعه',
    readArticleLabel: 'مشاهده مقاله',
    viewAllLabel: 'مشاهده همه >',
    tabs: {
      specialized: 'مقالات تخصصی',
      general: 'مقالات عمومی',
    },
  },

  // ۷. کارگاه‌ها و دوره‌ها
  workshops: {
    badge: 'کارگاه‌ها و دوره‌ها',
    title: 'کارگاه‌ها و دوره‌ها',
    description:
      'دوره‌ها و کارگاه‌های آموزشی تخصصی و عمومی زیر نظر اساتید و متخصصان برجسته.',
    tabs: {
      specialized: 'کارگاه‌های تخصصی (روانشناسان و متخصصان)',
      general: 'کارگاه‌های عمومی (عموم مردم)',
    },
    sampleCourses: [
      'کارگاه تخصصی طرحواره درمانی',
      'کارگاه عمومی مدیریت استرس و اضطراب',
      'کارگاه تخصصی مصاحبه انگیزشی',
      'کارگاه عمومی ارتباط مؤثر در روابط',
    ],
  },

  // ۸. بخش نظرات مراجعان (TestimonialsSection)
  testimonials: {
    badge: 'تجربه‌های به‌اشتراک‌گذاشته‌شده',
    title: 'هر کسی، روایت خودش را دارد.',
    description:
      'این روایت‌ها تجربه شخصی افراد هستند؛ مسیر و نتیجه جلسات برای هر فرد می‌تواند متفاوت باشد.',
  },

  // ۹. بخش پرسش‌های متداول (FaqSection)
  faq: {
    badge: 'پیش از شروع',
    title: 'پرسش‌های متداول',
    description:
      'پاسخ به سوالات متداول درباره نحوه رزرو نوبت، هزینه‌ها، پرداخت آنلاین و کارگاه‌ها.',
    notFoundText: 'پاسخ سؤال‌تان را پیدا نکردید؟',
    askQuestionCta: {
      label: 'مشاوره متنی رایگان',
      href: '/contact',
    },
    categories: ['عمومی', 'نوبت‌دهی', 'کارگاه‌ها'],
    questions: [
      {
        id: 'faq-appointment',
        category: 'نوبت‌دهی',
        question: 'چگونه می‌توانم نوبت مشاوره رزرو کنم؟',
        answer:
          'شما می‌توانید از طریق دکمه «رزرو نوبت» در سایت، ارسال پیام در فرم تماس یا تماس مستقیم با شماره ۰۲۱-۷۷۲۲۳۳۴۴ اقدام به رزرو نوبت و دریافت پیش‌مشاوره رایگان فرمایید.',
      },
      {
        id: 'faq-cost',
        category: 'عمومی',
        question: 'هزینه جلسات روان‌درمانی چقدر است؟',
        answer:
          'هزینه‌های جلسات روان‌درمانی بر اساس تعرفه مصوب سازمان نظام روان‌شناسی و به صورت منصفانه و شفاف تعیین شده و در جلسه پیش‌مشاوره به اطلاع شما می‌رسد.',
      },
      {
        id: 'faq-payment',
        category: 'عمومی',
        question: 'آیا امکان پرداخت آنلاین وجود دارد؟',
        answer:
          'بله، امکان پرداخت آنلاین و امن برای کلیه جلسات، کارگاه‌ها و دوره‌ها از طریق درگاه‌های بانکی معتبر در وب‌سایت کاژه فراهم است.',
      },
      {
        id: 'faq-specialized-workshops',
        category: 'کارگاه‌ها',
        question: 'کارگاه‌های تخصصی برای چه کسانی مناسب است؟',
        answer:
          'کارگاه‌های تخصصی ویژه دانشجویان رشته‌های روان‌شناسی و مشاوره، روان‌درمانگران و متخصصان سلامت روان طراحی شده‌اند و سرفصل‌های علمی و کاربردی را پوشش می‌دهند.',
      },
      {
        id: 'faq-dissatisfaction',
        category: 'عمومی',
        question: 'در صورت نارضایتی از مشاور چه کار کنیم؟',
        answer:
          'رضایت و آرامش شما اولویت کاژه است. در صورت تمایل مراجع یا عدم تطابق رویکرد، امکان تعویض روان‌درمانگر و معرفی متخصص دیگری متناسب با نیاز شما فراهم می‌باشد.',
      },
    ],
  },

  // ۱۰. بخش تماس و فرم (ContactSection)
  contact: {
    badge: 'شروع گفت‌وگو',
    title: {
      regular: 'ارتباط با ',
      highlight: 'کاژه',
    },
    description:
      'اگر آماده‌اید درباره شرایط خود صحبت کنید، چند خط برای ما بنویسید یا جهت دریافت پیش‌مشاوره رایگان با ما در ارتباط باشید.',
    contactInfo: {
      phone: siteConfig.contact.phone,
      phoneHref: siteConfig.contact.phoneHref,
      email: siteConfig.contact.email,
      emailHref: siteConfig.contact.emailHref,
      address: siteConfig.contact.address,
      workingHours: siteConfig.contact.workingHours,
    },
    privacyNote:
      'محرمانگی: حفظ کامل اطلاعات شما و حریم خصوصی، تعهد بنیادین کاژه است.',
    form: {
      name: {
        label: 'نام و نام خانوادگی',
        placeholder: 'سارا احمدی',
      },
      phone: {
        label: 'شماره موبایل',
        placeholder: '۰۹۱۲۱۲۳۴۵۶۷',
      },
      subject: {
        label: 'موضوع گفت‌وگو',
        placeholder: 'جلسات روان‌درمانی، روان‌پزشکی یا کارگاه‌ها',
      },
      message: {
        label: 'پیام شما',
        placeholder: 'توضیحات یا پرسش خود را اینجا بنویسید...',
      },
      submitButton: 'پیش‌مشاوره رایگان',
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
export const workshopsContent = homeData.workshops;
export const testimonialsContent = homeData.testimonials;
export const faqContent = homeData.faq;
export const contactContent = homeData.contact;
