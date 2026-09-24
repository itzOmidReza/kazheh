<script setup lang="ts">
import {
  ArrowLeft,
  Brain,
  HeartHandshake,
  LockKeyhole,
  Sparkles,
} from '@lucide/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

useHead({
  title: 'درباره کلینیک | کلینیک آرامش',
  meta: [
    {
      name: 'description',
      content:
        'آشنایی با رویکرد کلینیک آرامش و اصولی که مسیر گفت‌وگو و همراهی را شکل می‌دهند.',
    },
    { property: 'og:title', content: 'درباره کلینیک | کلینیک آرامش' },
    { property: 'og:description', content: 'آشنایی با رویکرد کلینیک آرامش و اصولی که مسیر گفت‌وگو و همراهی را شکل می‌دهند.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fa_IR' },
  ],
  link: [{ rel: 'canonical', href: '/about' }],
})

const values = [
  {
    icon: HeartHandshake,
    title: 'همراهی بدون قضاوت',
    description:
      'هر تجربه‌ای زمینه و معنای خودش را دارد. با احترام به روایت شما، ابتدا می‌شنویم و سپس مسیر مناسب را بررسی می‌کنیم.',
  },
  {
    icon: Brain,
    title: 'رویکرد علمی و قابل فهم',
    description:
      'دانش تخصصی باید به زبانی روشن و کاربردی در اختیار شما قرار بگیرد؛ بدون پیچیده‌گویی و فاصله گرفتن از تجربه واقعی.',
  },
  {
    icon: LockKeyhole,
    title: 'احترام به حریم خصوصی',
    description:
      'اعتماد و محرمانگی بخش جدایی‌ناپذیر از شکل‌گیری یک گفت‌وگوی امن هستند.',
  },
]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="max-w-2xl">
            <Badge variant="secondary" class="rounded-pill bg-sage-100 text-primary-800">
              درباره کلینیک آرامش
            </Badge>

            <h1 class="mt-6 text-heading-xl text-primary-900">
              جایی برای دیدن خود،
              <span class="text-primary-700">
                با آرامش و مهربانی بیشتر.
              </span>
            </h1>

            <p class="mt-6 text-body-lg text-muted-foreground">
              کلینیک آرامش با هدف ایجاد فضایی امن، انسانی و حرفه‌ای برای
              گفت‌وگو شکل گرفته است؛ فضایی که در آن می‌توانید بدون فشار،
              تجربه‌ها و دغدغه‌های خود را بررسی کنید.
            </p>

            <Button as-child class="mt-8 min-h-12 w-full rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover sm:w-auto">
              <NuxtLink to="/#contact">
                شروع گفت‌وگو
                <ArrowLeft class="size-4" />
              </NuxtLink>
            </Button>
          </div>

          <div class="relative min-h-[20rem] overflow-hidden rounded-[2rem] bg-primary-900 p-6 shadow-floating sm:p-8">
            <div class="absolute -left-16 -top-16 size-56 rounded-full bg-warm-500/30 blur-3xl" aria-hidden="true" />

            <div class="absolute -bottom-20 -right-16 size-64 rounded-full bg-primary-700 blur-3xl"
              aria-hidden="true" />

            <div class="relative flex h-full flex-col justify-between">
              <Sparkles class="size-8 text-sage-300" />

              <p class="max-w-sm text-2xl font-bold leading-[1.9] text-white">
                گفت‌وگو فرصتی است برای مکث کردن، فهمیدن و انتخاب کردن.
              </p>

              <p class="text-sm text-sage-200/70">
                روان‌شناسی آگاهانه و انسانی
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p class="text-sm font-medium text-primary">
              نگاه ما به همراهی
            </p>

            <h2 class="mt-4 text-heading-lg text-primary-900">
              قرار نیست برای بهتر شدن، شبیه شخص دیگری شوید.
            </h2>
          </div>

          <div class="space-y-5 text-body-lg text-muted-foreground">
            <p>
              هر فرد با داستان، تجربه و ظرفیت متفاوتی وارد مسیر مشاوره می‌شود.
              به همین دلیل، یک نسخه واحد برای همه وجود ندارد.
            </p>

            <p>
              هدف گفت‌وگو این است که با شناخت بهتر احساسات، افکار و الگوهای
              رفتاری، امکان انتخاب‌های آگاهانه‌تر فراهم شود.
            </p>

            <p>
              این مسیر می‌تواند از یک سؤال ساده آغاز شود؛ سؤالی درباره چیزی
              که مدت‌هاست ذهن شما را درگیر کرده است.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-space bg-surface">
      <div class="site-container">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-medium text-primary">
            اصول همراهی
          </p>

          <h2 class="mt-4 text-heading-xl text-primary-900">
            سه اصل که مسیر ما را شکل می‌دهند.
          </h2>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <Card v-for="value in values" :key="value.title"
            class="rounded-[1.5rem] border-border/80 bg-card shadow-none">
            <CardHeader>
              <span class="flex size-12 items-center justify-center rounded-2xl bg-sage-100 text-primary-700">
                <component :is="value.icon" class="size-5" />
              </span>

              <CardTitle class="pt-4 text-xl text-primary-900">
                {{ value.title }}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p class="text-sm leading-8 text-muted-foreground">
                {{ value.description }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="rounded-[1.5rem] border border-border bg-card p-6 text-center sm:p-12">
          <h2 class="text-heading-lg text-primary-900">
            اگر می‌خواهید بیشتر بدانید، می‌توانیم از یک گفت‌وگوی ساده شروع کنیم.
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-body text-muted-foreground">
            پیش از تصمیم‌گیری، می‌توانید سؤال‌های خود را درباره روند جلسات و
            شرایط همراهی مطرح کنید.
          </p>

          <Button as-child class="mt-7 min-h-12 w-full rounded-pill bg-cta px-6 text-cta-foreground hover:bg-cta-hover sm:w-auto">
            <NuxtLink to="/#contact">
              درخواست مشاوره اولیه
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </main>
</template>
