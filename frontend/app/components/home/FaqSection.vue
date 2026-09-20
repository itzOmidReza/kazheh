<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Button } from '@/components/ui/button'

const questions = [
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
]
</script>

<template>
  <section id="faq" aria-labelledby="faq-title" class="section-space bg-surface">
    <div class="site-container">
      <div class="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <!-- Introduction -->
        <div>
          <p class="text-sm font-medium text-primary">
            پیش از شروع
          </p>

          <h2 id="faq-title" class="mt-4 text-heading-xl text-foreground">
            شاید سؤال شما هم همین باشد.
          </h2>

          <p class="mt-5 text-body-lg text-muted-foreground">
            آشنایی با مسیر پیش رو، تصمیم‌گیری را آسان‌تر می‌کند.
            اینجا به چند سؤال درباره شروع ارتباط پاسخ داده‌ایم.
          </p>

          <div class="mt-8 border-s-2 border-warm-500 ps-5">
            <p class="text-sm leading-7 text-muted-foreground">
              پاسخ سؤال‌تان را پیدا نکردید؟
            </p>

            <Button as-child variant="link" class="mt-2 min-h-11 px-0 text-primary">
              <NuxtLink to="/#contact">
                سؤال خود را مطرح کنید
                <ArrowLeft class="size-4" aria-hidden="true" />
              </NuxtLink>
            </Button>
          </div>
        </div>

        <!-- Questions -->
        <div class="min-w-0 rounded-xl border border-border bg-card px-5 sm:px-8">
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem v-for="item in questions" :key="item.id" :value="item.id"
              class="border-border last:border-b-0">
              <AccordionTrigger
                class="gap-4 py-6 text-start text-base font-semibold leading-8 text-card-foreground hover:no-underline">
                {{ item.question }}
              </AccordionTrigger>

              <AccordionContent class="pb-6 text-body text-muted-foreground">
                <p>{{ item.answer }}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  </section>
</template>
