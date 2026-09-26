<script setup lang="ts">
import { Phone, Mail, MapPin, Clock, MessageSquare } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { siteConfig, contactPageContent } from '~/data'

useHead({
  title: contactPageContent.headTitle,
  meta: [
    {
      name: 'description',
      content: contactPageContent.metaDescription,
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
            {{ contactPageContent.badge }}
          </Badge>
          <h1 class="mt-4 text-heading-xl text-foreground">
            {{ contactPageContent.title }}
          </h1>
          <p class="mt-4 text-body-lg text-muted-foreground leading-relaxed">
            {{ contactPageContent.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- بخش اصلی محتوا و فرم -->
    <section class="section-space bg-background">
      <div class="site-container">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">

          <!-- ستون اطلاعات تماس (پویا از siteConfig) -->
          <div class="space-y-6 lg:col-span-5 text-right">
            <div class="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <h2 class="text-base font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
                <MessageSquare class="size-4 text-primary" />
                <span>{{ contactPageContent.contactInfoTitle }}</span>
              </h2>

              <div class="space-y-5 text-xs sm:text-sm">
                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">{{ contactPageContent.phoneLabel }}</span>
                    <a :href="siteConfig.contact.phoneHref"
                      class="font-bold text-foreground hover:text-primary transition-colors font-mono" dir="ltr">
                      {{ siteConfig.contact.phone }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">{{ contactPageContent.emailLabel }}</span>
                    <a :href="siteConfig.contact.emailHref"
                      class="font-medium text-foreground hover:text-primary transition-colors font-mono" dir="ltr">
                      {{ siteConfig.contact.email }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">{{ contactPageContent.workingHoursLabel
                      }}</span>
                    <span class="font-medium text-foreground leading-relaxed">
                      {{ siteConfig.contact.workingHours }}
                    </span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin class="size-4" />
                  </div>
                  <div>
                    <span class="text-xs text-muted-foreground block mb-1">{{ contactPageContent.addressLabel }}</span>
                    <span class="font-medium text-foreground leading-relaxed">
                      {{ siteConfig.contact.address }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ستون فرم پیام -->
          <div class="lg:col-span-7">
            <div class="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <div class="border-b border-border/60 pb-3 text-right">
                <h2 class="text-base font-bold text-foreground">
                  {{ contactPageContent.formTitle }}
                </h2>
                <p class="text-xs text-muted-foreground mt-1">
                  {{ contactPageContent.formSubtitle }}
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
