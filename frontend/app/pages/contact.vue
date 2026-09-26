<script setup lang="ts">
import { Phone, Mail, MapPin, Clock, MessageSquare } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '~/data'

useHead({
  title: `تماس با ما | ${siteConfig.name}`,
  meta: [
    {
      name: 'description',
      content: 'راه‌های ارتباطی، رزرو وقت مشاوره و نشانی کلینیک روان‌شناسی کاژه.',
    },
  ],
})
</script>

<template>
  <div dir="rtl">
    <!-- هدر بالای صفحه -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="max-w-2xl text-right">
          <Badge variant="secondary"
            class="rounded-pill bg-sage-100 text-primary-800 dark:bg-primary-950 dark:text-sage-300">
            ارتباط مستقیم
          </Badge>
          <h1 class="mt-4 text-heading-xl text-foreground">
            همراه شما برای برداشتن اولین قدم
          </h1>
          <p class="mt-4 text-body-lg text-muted-foreground leading-relaxed">
            برای پرسیدن هرگونه سؤال، دریافت مشاوره اولیه یا هماهنگی نوبت، می‌توانید از طریق فرم یا اطلاعات تماس زیر با
            ما در ارتباط باشید.
          </p>
        </div>
      </div>
    </section>

    <!-- بخش اصلی محتوا و فرم -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">

          <!-- ستون اطلاعات تماس (سمت راست) -->
          <div class="space-y-6 lg:col-span-5 text-right">
            <div class="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <h2 class="text-base font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
                <MessageSquare class="size-4 text-primary" />
                <span>اطلاعات تماس کلینیک</span>
              </h2>

              <div class="space-y-5 text-xs sm:text-sm">
                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">شماره تماس پذیرش:</span>
                    <a href="tel:02188888888"
                      class="font-bold text-foreground hover:text-primary transition-colors font-mono" dir="ltr">
                      ۰۲۱ - ۸۸۸۸ ۸۸۸۸
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">پست الکترونیکی:</span>
                    <a href="mailto:info@kazheh.ir"
                      class="font-medium text-foreground hover:text-primary transition-colors font-mono" dir="ltr">
                      info@kazheh.ir
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">ساعات پاسخگویی:</span>
                    <span class="font-medium text-foreground leading-relaxed">
                      شنبه تا پنج‌شنبه: ساعت ۹:۰۰ الی ۲۰:۰۰
                    </span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">نشانی کلینیک:</span>
                    <span class="font-medium text-foreground leading-relaxed">
                      تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲، طبقه ۳، واحد ۶
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ستون فرم پیام (سمت چپ) -->
          <div class="lg:col-span-7">
            <div class="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <div class="border-b border-border/60 pb-3 text-right">
                <h2 class="text-base font-bold text-foreground">
                  ارسال پیام یا درخواست تماس
                </h2>
                <p class="text-xs text-muted-foreground mt-1">
                  پیام شما مستقیماً در کارتابل پذیرش کلینیک ثبت خواهد شد.
                </p>
              </div>

              <!-- فراخوانی کامپوننت فرم -->
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
