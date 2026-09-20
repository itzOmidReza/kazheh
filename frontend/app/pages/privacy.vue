<script setup lang="ts">
import { ArrowRight, LockKeyhole } from '@lucide/vue'

useHead({
  title: 'حریم خصوصی | کلینیک آرامش',
  meta: [
    {
      name: 'description',
      content:
        'سیاست حفظ حریم خصوصی و نحوه استفاده از اطلاعات کاربران در کلینیک آرامش.',
    },
  ],
})

const sections = [
  {
    title: 'چه اطلاعاتی دریافت می‌شود؟',
    paragraphs: [
      'ممکن است اطلاعاتی مانند نام، شماره تماس، موضوع درخواست و متنی را که در فرم تماس وارد می‌کنید دریافت کنیم.',
      'لطفاً در فرم اولیه فقط اطلاعاتی را وارد کنید که برای پاسخ‌گویی به درخواست شما ضروری است.',
    ],
  },
  {
    title: 'اطلاعات شما چگونه استفاده می‌شود؟',
    paragraphs: [
      'اطلاعات ارسال‌شده فقط برای بررسی درخواست، پاسخ‌گویی و هماهنگی ارتباط اولیه استفاده می‌شود.',
      'این اطلاعات برای ارسال تبلیغات ناخواسته یا فروش به اشخاص دیگر استفاده نخواهد شد.',
    ],
  },
  {
    title: 'محرمانگی اطلاعات',
    paragraphs: [
      'ما تلاش می‌کنیم اطلاعات کاربران را با دقت و سطح مناسبی از امنیت نگهداری کنیم.',
      'با این حال، هیچ روش انتقال یا ذخیره‌سازی آنلاین نمی‌تواند امنیت مطلق را تضمین کند.',
    ],
  },
  {
    title: 'کوکی‌ها و داده‌های فنی',
    paragraphs: [
      'ممکن است سایت برای عملکرد بهتر و بررسی خطاهای فنی، برخی داده‌های فنی مانند نوع مرورگر یا مسیر ورود به سایت را دریافت کند.',
      'این داده‌ها برای شناسایی هویت شما استفاده نمی‌شوند، مگر در مواردی که قانون یا فرایند فنی معتبر چنین چیزی را لازم کند.',
    ],
  },
  {
    title: 'تغییرات این سیاست',
    paragraphs: [
      'ممکن است این متن برای هماهنگی با تغییرات سایت، فرایندهای کاری یا الزامات قانونی به‌روزرسانی شود.',
      'نسخه جدید از همین صفحه در دسترس قرار خواهد گرفت.',
    ],
  },
]
</script>

<template>
  <main>
    <section class="section-space bg-surface">
      <div class="site-container">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700">
          <ArrowRight class="size-4" />
          بازگشت به صفحه اصلی
        </NuxtLink>

        <div class="mt-10 max-w-3xl">
          <div class="flex size-14 items-center justify-center rounded-2xl bg-sage-100 text-primary-700">
            <LockKeyhole class="size-6" />
          </div>

          <p class="mt-6 text-sm font-medium text-primary">
            حریم خصوصی
          </p>

          <h1 class="mt-4 text-heading-xl text-primary-900">
            اطلاعات شما با احترام و دقت نگهداری می‌شود.
          </h1>

          <p class="mt-6 text-body-lg text-muted-foreground">
            این صفحه توضیح می‌دهد که هنگام استفاده از سایت کلینیک آرامش،
            چه اطلاعاتی ممکن است دریافت شود و این اطلاعات چگونه استفاده می‌شوند.
          </p>

          <p class="mt-5 text-sm text-muted-foreground">
            آخرین به‌روزرسانی: شهریور ۱۴۰۵
          </p>
        </div>
      </div>
    </section>

    <section class="section-space bg-background">
      <div class="site-container">
        <div class="max-w-3xl">
          <div v-for="section in sections" :key="section.title"
            class="border-b border-border py-8 first:pt-0 last:border-b-0">
            <h2 class="text-heading-md text-primary-900">
              {{ section.title }}
            </h2>

            <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-4 text-body-lg text-muted-foreground">
              {{ paragraph }}
            </p>
          </div>

          <div class="mt-10 rounded-[1.5rem] border border-warm-300/50 bg-warm-300/15 p-6">
            <p class="text-sm leading-8 text-primary-800">
              این متن پیش‌نویس اولیه است و باید پیش از انتشار عمومی با فرایند
              واقعی نگهداری اطلاعات، سرویس‌های استفاده‌شده و الزامات قانونی
              پروژه تطبیق داده شود.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
