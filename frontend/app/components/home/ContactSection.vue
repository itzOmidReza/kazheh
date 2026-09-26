<script setup lang="ts">
import { Mail, MapPin, Phone, ShieldCheck } from '@lucide/vue'
import { contactContent } from '~/data'
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="section-space bg-surface" dir="rtl">
    <div class="site-container">
      <div
        class="grid gap-10 overflow-hidden rounded-[2rem] bg-primary-900 p-6 text-white shadow-floating sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-12 items-start">
        <!-- ستون اطلاعات و توضیحات -->
        <div class="text-right space-y-6">
          <div>
            <p class="text-sm font-medium text-sage-300">
              {{ contactContent.badge }}
            </p>

            <h2 id="contact-title" class="mt-4 text-heading-xl text-white">
              {{ contactContent.title.regular }}
              <span class="text-sage-300">{{ contactContent.title.highlight }}</span>
            </h2>

            <p class="mt-4 text-body-lg text-sage-200/80 leading-relaxed">
              {{ contactContent.description }}
            </p>
          </div>

          <div class="space-y-4 pt-2">
            <a v-if="contactContent.contactInfo.phone" :href="contactContent.contactInfo.phoneHref"
              class="flex items-center gap-3 text-sm text-sage-200/90 transition-colors hover:text-warm-300">
              <span class="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <Phone class="size-4" />
              </span>
              <span>{{ contactContent.contactInfo.phone }}</span>
            </a>

            <a v-if="contactContent.contactInfo.email" :href="contactContent.contactInfo.emailHref"
              class="flex items-center gap-3 text-sm text-sage-200/90 transition-colors hover:text-warm-300">
              <span class="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <Mail class="size-4" />
              </span>
              <span>{{ contactContent.contactInfo.email }}</span>
            </a>

            <div v-if="contactContent.contactInfo.address" class="flex items-start gap-3 text-sm text-sage-200/90">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <MapPin class="size-4" />
              </span>
              <span>{{ contactContent.contactInfo.address }}</span>
            </div>
          </div>

          <div class="flex items-start gap-3 border-t border-white/10 pt-5">
            <ShieldCheck class="mt-0.5 size-5 shrink-0 text-sage-300" />
            <p class="text-xs leading-6 text-sage-200/70">
              {{ contactContent.privacyNote }}
            </p>
          </div>
        </div>

        <!-- ستون فرم با پس‌زمینه کارت سفید استاندارد -->
        <div class="rounded-3xl bg-card p-5 sm:p-7 text-card-foreground shadow-card">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>
