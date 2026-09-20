<script setup lang="ts">
import { ArrowRight, Clock3, Share2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const route = useRoute()

const articles = {
  'understanding-anxiety': {
    category: 'اضطراب و نگرانی',
    title: 'چطور اضطراب را بهتر بشناسیم؟',
    readingTime: 6,
    intro:
      'شناخت اضطراب به معنی حذف فوری آن نیست؛ یعنی بتوانیم پیام‌های ذهن و بدن خود را با دقت بیشتری ببینیم.',
    sections: [
      {
        title: 'اضطراب همیشه دشمن ما نیست',
        paragraphs: [
          'اضطراب بخشی از واکنش طبیعی بدن در برابر موقعیت‌های مبهم یا تهدیدکننده است. مقدار کمی از آن می‌تواند ما را برای توجه و تصمیم‌گیری آماده کند.',
          'مشکل زمانی آغاز می‌شود که نگرانی از موقعیت مشخص جدا شود و بیشتر زمان و انرژی ذهنی ما را درگیر کند.',
        ],
      },
      {
        title: 'به نشانه‌ها توجه کنید',
        paragraphs: [
          'تپش قلب، بی‌قراری، دشواری تمرکز و فکرهایی که مدام تکرار می‌شوند، می‌توانند نشانه‌هایی باشند که نیاز به توجه دارند.',
          'ثبت موقعیت‌هایی که اضطراب در آن‌ها بیشتر می‌شود، به شناخت الگوهای شخصی کمک می‌کند.',
        ],
      },
      {
        title: 'از قدم‌های کوچک شروع کنید',
        paragraphs: [
          'لازم نیست برای تغییر، همه‌چیز را یک‌باره حل کنید. چند دقیقه مکث، نوشتن افکار و صحبت‌کردن با فردی متخصص می‌تواند شروع مناسبی باشد.',
        ],
      },
    ],
  },

  'healthy-boundaries': {
    category: 'روابط',
    title: 'مرزهای سالم در رابطه چه معنایی دارند؟',
    readingTime: 5,
    intro:
      'مرزبندی به معنی فاصله گرفتن از دیگران نیست؛ راهی برای شناختن نیازها و احترام متقابل است.',
    sections: [
      {
        title: 'مرز شخصی چیست؟',
        paragraphs: [
          'مرز شخصی مشخص می‌کند چه چیزی برای شما قابل قبول است و در چه شرایطی به زمان، فاصله یا گفت‌وگوی بیشتری نیاز دارید.',
          'مرز سالم با تهدید یا کنترل دیگران ساخته نمی‌شود؛ با بیان روشن و محترمانه نیازها شکل می‌گیرد.',
        ],
      },
      {
        title: 'نه گفتن بدون احساس گناه',
        paragraphs: [
          'نه گفتن به یک درخواست، به معنی رد کردن ارزش فرد مقابل نیست. شما حق دارید زمان، انرژی و ظرفیت خود را در نظر بگیرید.',
        ],
      },
    ],
  },

  'starting-therapy': {
    category: 'شروع درمان',
    title: 'اگر برای شروع مشاوره مردد هستید',
    readingTime: 4,
    intro:
      'مردد بودن پیش از اولین گفت‌وگو طبیعی است. شروع مشاوره تصمیمی شخصی است و باید با آگاهی و احساس امنیت همراه باشد.',
    sections: [
      {
        title: 'لازم نیست آماده کامل باشید',
        paragraphs: [
          'بسیاری از افراد با سؤال‌ها و تردیدهای مختلف وارد جلسه اول می‌شوند. قرار نیست از ابتدا همه‌چیز را دقیق توضیح دهید.',
        ],
      },
      {
        title: 'سؤال‌های خود را بپرسید',
        paragraphs: [
          'می‌توانید درباره روند جلسات، محرمانگی، مدت زمان گفت‌وگو و شیوه ادامه مسیر سؤال کنید.',
        ],
      },
    ],
  },
} as const

const article = computed(() => {
  const slug = String(route.params.slug)
  return articles[slug as keyof typeof articles]
})

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'مقاله پیدا نشد',
  })
}

useHead(() => ({
  title: `${article.value.title} | کلینیک آرامش`,
  meta: [
    {
      name: 'description',
      content: article.value.intro,
    },
  ],
}))

const shareArticle = async () => {
  if (!import.meta.client) return

  const shareData = {
    title: article.value.title,
    text: article.value.intro,
    url: window.location.href,
  }

  if (navigator.share) {
    await navigator.share(shareData)
    return
  }

  await navigator.clipboard.writeText(window.location.href)
}
</script>

<template>
  <main>
    <article>
      <header class="section-space bg-surface">
        <div class="site-container">
          <NuxtLink to="/articles"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700">
            <ArrowRight class="size-4" />
            بازگشت به مقالات
          </NuxtLink>

          <div class="mt-10 max-w-3xl">
            <span class="rounded-pill bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              {{ article.category }}
            </span>

            <h1 class="mt-6 text-heading-xl text-primary-900">
              {{ article.title }}
            </h1>

            <div class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 class="size-4" />
              {{ article.readingTime }} دقیقه مطالعه
            </div>

            <p class="mt-8 text-body-lg text-muted-foreground">
              {{ article.intro }}
            </p>
          </div>
        </div>
      </header>

      <section class="section-space bg-background">
        <div class="site-container">
          <div class="max-w-3xl">
            <div v-for="section in article.sections" :key="section.title" class="mb-10 last:mb-0">
              <h2 class="text-heading-md text-primary-900">
                {{ section.title }}
              </h2>

              <p v-for="paragraph in section.paragraphs" :key="paragraph"
                class="mt-5 text-body-lg text-muted-foreground">
                {{ paragraph }}
              </p>
            </div>

            <div class="mt-12 border-t border-border pt-6">
              <Button type="button" variant="outline" class="rounded-pill" @click="shareArticle">
                <Share2 class="size-4" />
                اشتراک‌گذاری مقاله
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>
