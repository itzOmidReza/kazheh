<script setup lang="ts">
import {
  ArrowLeft,
  Camera,
  Mail,
  MapPin,
  Phone,
} from '@lucide/vue'
import {
  siteConfig,
  footerQuickLinks,
  footerSupportLinks,
} from '~/data'

const currentYear = new Date().getFullYear()

const hasContactInfo = computed(() => {
  const { phone, email, address } = siteConfig.contact
  return Boolean(phone || email || address)
})
</script>

<template>
  <footer class="border-t border-border bg-primary-900 text-white">
    <!-- Main Footer Container -->
    <div class="site-container py-16 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
        <!-- Brand & Description -->
        <div class="max-w-sm">
          <NuxtLink to="/" class="inline-flex items-center gap-3" aria-label="صفحه اصلی">
            <span
              class="flex size-11 items-center justify-center rounded-2xl bg-sage-200 text-lg font-bold text-primary-900"
            >
              {{ siteConfig.shortName }}
            </span>

            <span class="text-right">
              <span class="block text-sm font-bold text-white">
                {{ siteConfig.name }}
              </span>

              <span class="block text-xs text-sage-300">
                {{ siteConfig.tagline }}
              </span>
            </span>
          </NuxtLink>

          <p class="mt-6 text-sm leading-8 text-sage-200/80">
            {{ siteConfig.description }}
          </p>

          <!-- Social Links (Conditional) -->
          <div v-if="siteConfig.socials && siteConfig.socials.length > 0" class="mt-6 flex items-center gap-3">
            <a
              v-for="social in siteConfig.socials"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noreferrer"
              :aria-label="social.name"
              class="flex size-10 items-center justify-center rounded-full border border-sage-300/30 text-sage-200 transition-colors hover:border-warm-300 hover:bg-warm-300 hover:text-primary-900"
            >
              <Camera v-if="social.icon === 'camera'" class="size-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h2 class="text-sm font-bold text-white">
            دسترسی سریع
          </h2>

          <nav class="mt-5 flex flex-col items-start gap-3">
            <NuxtLink
              v-for="link in footerQuickLinks"
              :key="link.href"
              :to="link.href"
              class="text-sm text-sage-200/75 transition-colors hover:text-warm-300"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Support / More Info Links -->
        <div>
          <h2 class="text-sm font-bold text-white">
            اطلاعات بیشتر
          </h2>

          <nav class="mt-5 flex flex-col items-start gap-3">
            <NuxtLink
              v-for="link in footerSupportLinks"
              :key="link.href"
              :to="link.href"
              class="text-sm text-sage-200/75 transition-colors hover:text-warm-300"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact CTA & Info -->
        <div>
          <h2 class="text-sm font-bold text-white">
            {{ siteConfig.contactCta.title }}
          </h2>

          <p class="mt-5 text-sm leading-7 text-sage-200/75">
            {{ siteConfig.contactCta.description }}
          </p>

          <NuxtLink
            :to="siteConfig.contactCta.buttonHref"
            class="mt-5 inline-flex items-center gap-2 rounded-pill bg-cta px-5 py-3 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            {{ siteConfig.contactCta.buttonText }}
            <ArrowLeft class="size-4" />
          </NuxtLink>

          <!-- Contact items (Only rendered if actual values are present) -->
          <div v-if="hasContactInfo" class="mt-6 space-y-3 text-sm text-sage-200/75">
            <a
              v-if="siteConfig.contact.phone"
              :href="`tel:${siteConfig.contact.phone}`"
              class="flex items-center gap-2 transition-colors hover:text-warm-300"
            >
              <Phone class="size-4" />
              <span>{{ siteConfig.contact.displayPhone || siteConfig.contact.phone }}</span>
            </a>

            <a
              v-if="siteConfig.contact.email"
              :href="`mailto:${siteConfig.contact.email}`"
              class="flex items-center gap-2 transition-colors hover:text-warm-300"
            >
              <Mail class="size-4" />
              <span>{{ siteConfig.contact.email }}</span>
            </a>

            <span v-if="siteConfig.contact.address" class="flex items-start gap-2">
              <MapPin class="mt-1 size-4 shrink-0" />
              <span>{{ siteConfig.contact.address }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="border-t border-white/10">
      <div
        class="site-container flex flex-col gap-3 py-5 text-center text-xs text-sage-200/60 sm:flex-row sm:items-center sm:justify-between sm:text-right"
      >
        <p>
          © {{ currentYear }} {{ siteConfig.name }}
        </p>

        <p>
          {{ siteConfig.footerNote }}
        </p>
      </div>
    </div>
  </footer>
</template>
