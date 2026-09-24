<script setup lang="ts">
import {
  ArrowLeft,
  Camera,
  Mail,
  MapPin,
  Phone,
} from '@lucide/vue'
import { footerNavigation, supportNavigation } from '~/data/navigation'

const footerLinks = {
  navigation: footerNavigation,
  support: supportNavigation,
}
</script>

<template>
  <footer class="border-t border-border bg-primary-900 text-white">
    <!-- Main footer -->
    <div class="site-container py-16 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
        <!-- Brand -->
        <div class="max-w-sm">
          <NuxtLink to="/" class="inline-flex items-center gap-3" aria-label="صفحه اصلی">
            <span
              class="flex size-11 items-center justify-center rounded-2xl bg-sage-200 text-lg font-bold text-primary-900">
              ک
            </span>

            <span class="text-right">
              <span class="block text-sm font-bold">
                کلینیک آرامش
              </span>

              <span class="block text-xs text-sage-300">
                روان‌شناسی آگاهانه
              </span>
            </span>
          </NuxtLink>

          <p class="mt-6 text-sm leading-8 text-sage-200/80">
            فضایی امن برای شنیدن، شناختن و ساختن قدم‌های کوچک و ماندگار.
            لازم نیست این مسیر را تنها طی کنید.
          </p>

          <div class="mt-6 flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="اینستاگرام"
              class="flex size-10 items-center justify-center rounded-full border border-sage-300/30 text-sage-200 transition-colors hover:border-warm-300 hover:bg-warm-300 hover:text-primary-900">
              <Camera class="size-4" />
            </a>

          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h2 class="text-sm font-bold text-white">
            دسترسی سریع
          </h2>

          <nav class="mt-5 flex flex-col items-start gap-3">
            <NuxtLink v-for="link in footerLinks.navigation" :key="link.href" :to="link.href"
              class="text-sm text-sage-200/75 transition-colors hover:text-warm-300">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Support -->
        <div>
          <h2 class="text-sm font-bold text-white">
            اطلاعات بیشتر
          </h2>

          <nav class="mt-5 flex flex-col items-start gap-3">
            <NuxtLink v-for="link in footerLinks.support" :key="link.href" :to="link.href"
              class="text-sm text-sage-200/75 transition-colors hover:text-warm-300">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h2 class="text-sm font-bold text-white">
            شروع گفت‌وگو
          </h2>

          <p class="mt-5 text-sm leading-7 text-sage-200/75">
            اگر آماده‌اید درباره شرایط خود صحبت کنید، اولین قدم را با ما
            بردارید.
          </p>

          <NuxtLink to="/#contact"
            class="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-pill bg-cta px-5 py-3 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta-hover sm:w-auto sm:justify-start">
            درخواست مشاوره اولیه
            <ArrowLeft class="size-4" />
          </NuxtLink>

          <div class="mt-6 space-y-3 text-sm text-sage-200/75">
            <a href="tel:+982112345678" class="flex items-center gap-2 transition-colors hover:text-warm-300">
              <Phone class="size-4" />
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>

            <a href="mailto:hello@example.com" class="flex items-center gap-2 transition-colors hover:text-warm-300">
              <Mail class="size-4" />
              hello@example.com
            </a>

            <span class="flex items-start gap-2">
              <MapPin class="mt-1 size-4 shrink-0" />
              تهران، خیابان نمونه، ساختمان آرامش
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-white/10">
      <div
        class="site-container flex flex-col gap-3 py-5 text-center text-xs text-sage-200/60 sm:flex-row sm:items-center sm:justify-between sm:text-right">
        <p>
          © {{ new Date().getFullYear() }} کلینیک آرامش
        </p>

        <p>
          طراحی‌شده با احترام به آرامش و حریم خصوصی شما
        </p>
      </div>
    </div>
  </footer>
</template>
