<script setup lang="ts">
import { Send, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'
import { contactFormData } from '~/data'

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
    toast.error(contactFormData.toasts.incompleteTitle, {
      description: contactFormData.toasts.incompleteDescription,
    })
    return
  }

  if (!validatePhone(form.phone)) {
    toast.error(contactFormData.toasts.invalidPhoneTitle, {
      description: contactFormData.toasts.invalidPhoneDescription,
    })
    return
  }

  isSubmitting.value = true

  setTimeout(() => {
    isSubmitting.value = false
    toast.success(contactFormData.toasts.successTitle, {
      description: contactFormData.toasts.successDescription,
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
        <Label for="contact-name" class="text-xs font-semibold text-foreground">{{ contactFormData.fields.name.label
          }}</Label>
        <Input id="contact-name" v-model="form.full_name" type="text"
          :placeholder="contactFormData.fields.name.placeholder" class="h-11 rounded-xl text-xs bg-background"
          required />
      </div>

      <div class="space-y-2">
        <Label for="contact-phone" class="text-xs font-semibold text-foreground">{{ contactFormData.fields.phone.label
          }}</Label>
        <Input id="contact-phone" v-model="form.phone" type="tel" dir="ltr"
          :placeholder="contactFormData.fields.phone.placeholder"
          class="h-11 rounded-xl text-xs font-mono bg-background" required />
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-2">
        <Label for="contact-email" class="text-xs font-semibold text-foreground">{{ contactFormData.fields.email.label
          }}</Label>
        <Input id="contact-email" v-model="form.email" type="email" dir="ltr"
          :placeholder="contactFormData.fields.email.placeholder"
          class="h-11 rounded-xl text-xs font-mono bg-background" />
      </div>

      <div class="space-y-2">
        <Label for="contact-subject" class="text-xs font-semibold text-foreground">{{
          contactFormData.fields.subject.label }}</Label>
        <Input id="contact-subject" v-model="form.subject" type="text"
          :placeholder="contactFormData.fields.subject.placeholder" class="h-11 rounded-xl text-xs bg-background" />
      </div>
    </div>

    <div class="space-y-2">
      <Label for="contact-message" class="text-xs font-semibold text-foreground">{{ contactFormData.fields.message.label
        }}</Label>
      <Textarea id="contact-message" v-model="form.message" :placeholder="contactFormData.fields.message.placeholder"
        class="min-h-32 resize-y rounded-2xl text-xs leading-relaxed bg-background" required />
    </div>

    <Button type="submit" size="lg" :disabled="isSubmitting"
      class="mt-2 min-h-11 w-full rounded-pill bg-cta text-xs font-semibold text-cta-foreground hover:bg-cta-hover shadow-soft gap-2">
      <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
      <template v-else>
        <span>{{ contactFormData.submitButton }}</span>
        <Send class="size-3.5 rotate-180" />
      </template>
    </Button>

    <p class="pt-2 text-center text-xs leading-6 text-muted-foreground">
      {{ contactFormData.confidentialityNotice }}
    </p>
  </form>
</template>
