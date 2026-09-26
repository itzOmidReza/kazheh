<script setup lang="ts">
import { Send, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'

const emit = defineEmits<{
  (e: 'success'): void
}>()

const form = reactive({
  full_name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

const validatePhone = (phone: string) => {
  const iranPhoneRegex = /^(\+98|0)?9\d{9}$/
  return iranPhoneRegex.test(phone.trim())
}

const handleSubmit = async () => {
  if (!form.full_name.trim() || !form.phone.trim() || !form.message.trim()) {
    toast.error('اطلاعات ناقص است', {
      description: 'وارد کردن نام و نام خانوادگی، شماره تماس و متن پیام الزامی است.',
    })
    return
  }

  if (!validatePhone(form.phone)) {
    toast.error('شماره همراه نامعتبر است', {
      description: 'لطفاً یک شماره موبایل معتبر (مانند ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.',
    })
    return
  }

  isSubmitting.value = true

  setTimeout(() => {
    isSubmitting.value = false
    toast.success('پیام شما با موفقیت ثبت شد', {
      description: 'همکاران پذیرش در کوتاه‌ترین زمان با شما تماس خواهند گرفت.',
    })

    form.full_name = ''
    form.phone = ''
    form.email = ''
    form.subject = ''
    form.message = ''

    emit('success')
  }, 450)
}
</script>

<template>
  <form class="space-y-4 text-right" dir="rtl" @submit.prevent="handleSubmit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-2">
        <Label for="contact-name" class="text-xs font-semibold text-foreground">نام و نام خانوادگی *</Label>
        <Input id="contact-name" v-model="form.full_name" type="text" placeholder="مثلاً: سارا احمدی"
          class="h-11 rounded-xl text-xs bg-background" required />
      </div>

      <div class="space-y-2">
        <Label for="contact-phone" class="text-xs font-semibold text-foreground">شماره تماس همراه *</Label>
        <Input id="contact-phone" v-model="form.phone" type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          class="h-11 rounded-xl text-xs font-mono bg-background" required />
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-2">
        <Label for="contact-email" class="text-xs font-semibold text-foreground">پست الکترونیکی (اختیاری)</Label>
        <Input id="contact-email" v-model="form.email" type="email" dir="ltr" placeholder="sara@example.com"
          class="h-11 rounded-xl text-xs font-mono bg-background" />
      </div>

      <div class="space-y-2">
        <Label for="contact-subject" class="text-xs font-semibold text-foreground">موضوع یا خدمت مدنظر</Label>
        <Input id="contact-subject" v-model="form.subject" type="text" placeholder="مشاوره فردی، اضطراب، روابط..."
          class="h-11 rounded-xl text-xs bg-background" />
      </div>
    </div>

    <div class="space-y-2">
      <Label for="contact-message" class="text-xs font-semibold text-foreground">متن پیام یا شرح مختصر درخواست *</Label>
      <Textarea id="contact-message" v-model="form.message" placeholder="توضیحات یا پرسش خود را اینجا بنویسید..."
        class="min-h-32 resize-y rounded-2xl text-xs leading-relaxed bg-background" required />
    </div>

    <Button type="submit" size="lg" :disabled="isSubmitting"
      class="mt-2 min-h-11 w-full rounded-pill bg-cta text-xs font-semibold text-cta-foreground hover:bg-cta-hover shadow-soft gap-2">
      <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
      <template v-else>
        <span>ارسال پیام و هماهنگی</span>
        <Send class="size-3.5 rotate-180" />
      </template>
    </Button>

    <p class="pt-2 text-center text-xs leading-6 text-muted-foreground">
      اطلاعات و پیام‌های شما نزد کلینیک کاژه کاملاً محرمانه باقی خواهد ماند.
    </p>
  </form>
</template>
