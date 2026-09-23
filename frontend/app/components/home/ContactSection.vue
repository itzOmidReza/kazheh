<script setup lang="ts">
import { Mail, MapPin, Phone, Send, ShieldCheck } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'
import { contactContent } from '~/data'

const form = reactive({
  name: '',
  phone: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const submitForm = async () => {
  if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
    toast.error(contactContent.form.validationError)
    return
  }

  isSubmitting.value = true

  // تا پیش از آماده شدن بک‌اند، داده‌ها پاک نمی‌شوند و وضعیت موقت به کاربر اعلام می‌شود
  await new Promise((resolve) => setTimeout(resolve, 600))

  toast.info(contactContent.form.offlineNotice)
  isSubmitting.value = false
}
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="section-space bg-surface">
    <div class="site-container">
      <div
        class="grid gap-10 overflow-hidden rounded-[2rem] bg-primary-900 p-6 text-white shadow-floating sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
        <!-- Intro -->
        <div>
          <p class="text-sm font-medium text-sage-300">
            {{ contactContent.badge }}
          </p>

          <h2 id="contact-title" class="mt-5 text-heading-xl text-white">
            {{ contactContent.title.regular }}
            <span class="text-sage-300">{{ contactContent.title.highlight }}</span>
          </h2>

          <p class="mt-6 text-body-lg text-sage-200/80">
            {{ contactContent.description }}
          </p>

          <div class="mt-8 space-y-5">
            <a v-if="contactContent.contactInfo.phone" :href="contactContent.contactInfo.phoneHref"
              class="flex items-center gap-3 text-sm text-sage-200/80 transition-colors hover:text-warm-300">
              <span class="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <Phone class="size-4" />
              </span>
              {{ contactContent.contactInfo.phone }}
            </a>

            <a v-if="contactContent.contactInfo.email" :href="contactContent.contactInfo.emailHref"
              class="flex items-center gap-3 text-sm text-sage-200/80 transition-colors hover:text-warm-300">
              <span class="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <Mail class="size-4" />
              </span>
              {{ contactContent.contactInfo.email }}
            </a>

            <div v-if="contactContent.contactInfo.address" class="flex items-start gap-3 text-sm text-sage-200/80">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <MapPin class="size-4" />
              </span>
              {{ contactContent.contactInfo.address }}
            </div>
          </div>

          <div class="mt-10 flex items-start gap-3 border-t border-white/10 pt-6">
            <ShieldCheck class="mt-1 size-5 shrink-0 text-sage-300" />

            <p class="text-sm leading-7 text-sage-200/70">
              {{ contactContent.privacyNote }}
            </p>
          </div>
        </div>

        <!-- Form -->
        <form class="rounded-[1.5rem] bg-card p-5 text-card-foreground sm:p-8" @submit.prevent="submitForm">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="contact-name">{{ contactContent.form.name.label }}</Label>

              <Input id="contact-name" v-model="form.name" type="text" autocomplete="name"
                :placeholder="contactContent.form.name.placeholder" required />
            </div>

            <div class="space-y-2">
              <Label for="contact-phone">{{ contactContent.form.phone.label }}</Label>

              <Input id="contact-phone" v-model="form.phone" type="tel" autocomplete="tel"
                :placeholder="contactContent.form.phone.placeholder" dir="ltr" required />
            </div>
          </div>

          <div class="mt-5 space-y-2">
            <Label for="contact-subject">{{ contactContent.form.subject.label }}</Label>

            <Input id="contact-subject" v-model="form.subject" type="text"
              :placeholder="contactContent.form.subject.placeholder" />
          </div>

          <div class="mt-5 space-y-2">
            <Label for="contact-message">{{ contactContent.form.message.label }}</Label>

            <Textarea id="contact-message" v-model="form.message" :placeholder="contactContent.form.message.placeholder"
              class="min-h-36 resize-y" required />
          </div>

          <Button type="submit" size="lg" :disabled="isSubmitting"
            class="mt-6 min-h-12 w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover">
            <Send class="size-4" />
            {{ isSubmitting ? contactContent.form.submittingButton : contactContent.form.submitButton }}
          </Button>

          <p class="mt-4 text-center text-xs leading-6 text-muted-foreground">
            {{ contactContent.form.notice }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
