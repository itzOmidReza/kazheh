<script setup lang="ts">
import { Mail, MapPin, Phone, Send, ShieldCheck } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'

const form = reactive({
  name: '',
  phone: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const submitForm = async () => {
  if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
    toast.error('لطفاً نام، شماره تماس و پیام خود را وارد کنید.')
    return
  }

  isSubmitting.value = true

  // اتصال API در مرحله بک‌اند اضافه می‌شود.
  await new Promise((resolve) => setTimeout(resolve, 700))

  toast.success('درخواست شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم.')

  form.name = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
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
            شروع گفت‌وگو
          </p>

          <h2 id="contact-title" class="mt-5 text-heading-xl text-white">
            از همین‌جا می‌توانید
            <span class="text-sage-300">شروع کنید.</span>
          </h2>

          <p class="mt-6 text-body-lg text-sage-200/80">
            اگر آماده‌اید درباره شرایط خود صحبت کنید، چند خط برای ما
            بنویسید. لازم نیست همه جزئیات را در پیام اول توضیح دهید.
          </p>

          <div class="mt-8 space-y-5">
            <a href="tel:+982112345678"
              class="flex items-center gap-3 text-sm text-sage-200/80 transition-colors hover:text-warm-300">
              <span class="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <Phone class="size-4" />
              </span>
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>

            <a href="mailto:hello@example.com"
              class="flex items-center gap-3 text-sm text-sage-200/80 transition-colors hover:text-warm-300">
              <span class="flex size-10 items-center justify-center rounded-xl bg-white/10">
                <Mail class="size-4" />
              </span>
              hello@example.com
            </a>

            <div class="flex items-start gap-3 text-sm text-sage-200/80">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <MapPin class="size-4" />
              </span>
              تهران، خیابان نمونه، ساختمان آرامش
            </div>
          </div>

          <div class="mt-10 flex items-start gap-3 border-t border-white/10 pt-6">
            <ShieldCheck class="mt-1 size-5 shrink-0 text-sage-300" />

            <p class="text-sm leading-7 text-sage-200/70">
              اطلاعاتی که در این فرم وارد می‌کنید فقط برای پاسخ‌گویی به
              درخواست شما استفاده می‌شود.
            </p>
          </div>
        </div>

        <!-- Form -->
        <form class="rounded-[1.5rem] bg-white p-5 text-foreground sm:p-8" @submit.prevent="submitForm">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="contact-name">نام و نام خانوادگی</Label>

              <Input id="contact-name" v-model="form.name" type="text" autocomplete="name" placeholder="نام شما"
                required />
            </div>

            <div class="space-y-2">
              <Label for="contact-phone">شماره تماس</Label>

              <Input id="contact-phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                dir="ltr" required />
            </div>
          </div>

          <div class="mt-5 space-y-2">
            <Label for="contact-subject">موضوع گفت‌وگو</Label>

            <Input id="contact-subject" v-model="form.subject" type="text" placeholder="مثلاً مشاوره فردی یا روابط" />
          </div>

          <div class="mt-5 space-y-2">
            <Label for="contact-message">پیام شما</Label>

            <Textarea id="contact-message" v-model="form.message"
              placeholder="هر مقدار که مایل هستید درباره شرایط خود بنویسید..." class="min-h-36 resize-y" required />
          </div>

          <Button type="submit" size="lg" :disabled="isSubmitting"
            class="mt-6 min-h-12 w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover">
            <Send class="size-4" />
            {{ isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست' }}
          </Button>

          <p class="mt-4 text-center text-xs leading-6 text-muted-foreground">
            ارسال فرم به معنی رزرو قطعی جلسه نیست.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
