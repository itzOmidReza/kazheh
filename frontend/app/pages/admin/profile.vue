<script setup lang="ts">
import {
  User,
  ShieldCheck,
  KeyRound,
  Phone,
  Lock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { toast } from 'vue-sonner'
import { siteConfig, adminDashboardData } from '~/data'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

useHead({
  title: `پروفایل کاربری | ${siteConfig.name}`,
})

const { admin } = useAuth()
const { apiFetch } = useApi()

// فرم اطلاعات هویتی
const profileForm = reactive({
  full_name: admin.value?.full_name || 'مدیر سیستم',
  phone: admin.value?.phone || '09123456789',
  username: admin.value?.username || 'admin',
})

const isUpdatingProfile = ref(false)

const handleUpdateProfile = async () => {
  if (!profileForm.full_name.trim() || !profileForm.phone.trim()) {
    toast.error(adminDashboardData.profileSection.toasts.fillRequired)
    return
  }

  isUpdatingProfile.value = true
  try {
    // شبیه‌سازی / فراخوانی API
    await new Promise((r) => setTimeout(r, 400))
    if (admin.value) {
      admin.value.full_name = profileForm.full_name
      admin.value.phone = profileForm.phone
    }
    toast.success(adminDashboardData.profileSection.toasts.infoUpdated)
  } finally {
    isUpdatingProfile.value = false
  }
}

// فرم تغییر رمز عبور
const passwordForm = reactive({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const isUpdatingPassword = ref(false)

const handleChangePassword = async () => {
  if (!passwordForm.current_password || !passwordForm.new_password) {
    toast.error(adminDashboardData.profileSection.toasts.fillRequired)
    return
  }

  if (passwordForm.new_password !== passwordForm.confirm_password) {
    toast.error(adminDashboardData.profileSection.toasts.passwordsDoNotMatch)
    return
  }

  if (passwordForm.new_password.length < 6) {
    toast.error('رمز عبور جدید باید حداقل ۶ کاراکتر باشد.')
    return
  }

  isUpdatingPassword.value = true
  try {
    await new Promise((r) => setTimeout(r, 500))
    passwordForm.current_password = ''
    passwordForm.new_password = ''
    passwordForm.confirm_password = ''
    toast.success(adminDashboardData.profileSection.toasts.passwordUpdated)
  } finally {
    isUpdatingPassword.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <div class="space-y-1">
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <NuxtLink to="/admin" class="hover:text-primary transition-colors">
          پنل مدیریت
        </NuxtLink>
        <ChevronRight class="size-3.5" />
        <span class="text-foreground font-medium">پروفایل کاربری</span>
      </div>
      <h1 class="text-2xl font-bold tracking-tight text-foreground">
        {{ adminDashboardData.profileSection.pageTitle }}
      </h1>
      <p class="text-xs text-muted-foreground">
        {{ adminDashboardData.profileSection.subtitle }}
      </p>
    </div>

    <!-- Identity Summary Card -->
    <div
      class="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card p-5 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div class="flex items-center gap-4">
        <div
          class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold shadow-soft">
          <User class="size-7" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-base font-bold text-foreground">
              {{ admin?.full_name || 'کاربر سیستم' }}
            </h2>
            <Badge class="rounded-pill bg-primary/10 text-primary border-primary/20 text-[10px]">
              دسترسی مدیریت
            </Badge>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5" dir="ltr">
            @{{ admin?.username || 'admin' }} • {{ admin?.phone }}
          </p>
        </div>
      </div>

      <div
        class="flex items-center gap-2 border-t border-border/60 pt-3 sm:border-0 sm:pt-0 text-xs text-muted-foreground">
        <ShieldCheck class="size-4 text-emerald-500" />
        <span>نشست امن و فعال در کاژه</span>
      </div>
    </div>

    <!-- Form Cards Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Card 1: Profile Information -->
      <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4">
        <div class="border-b border-border/60 pb-3">
          <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
            <User class="size-4 text-primary" />
            <span>مشخصات فردی و ارتباطی</span>
          </h3>
          <p class="text-xs text-muted-foreground mt-0.5">
            نام و شماره تماسی که به عنوان مدیر برای شما نمایش داده می‌شود.
          </p>
        </div>

        <form class="space-y-4 text-xs" @submit.prevent="handleUpdateProfile">
          <div class="space-y-1.5">
            <Label for="p-name" class="text-xs">{{ adminDashboardData.profileSection.fields.fullName }}</Label>
            <Input id="p-name" v-model="profileForm.full_name" type="text" required class="rounded-xl h-10 text-xs" />
          </div>

          <div class="space-y-1.5">
            <Label for="p-username" class="text-xs">{{ adminDashboardData.profileSection.fields.username }}</Label>
            <Input id="p-username" v-model="profileForm.username" type="text" disabled dir="ltr"
              class="rounded-xl h-10 text-xs bg-muted/40 cursor-not-allowed" />
            <p class="text-[11px] text-muted-foreground">نام کاربری سیستمی غیرقابل تغییر است.</p>
          </div>

          <div class="space-y-1.5">
            <Label for="p-phone" class="text-xs">{{ adminDashboardData.profileSection.fields.phone }}</Label>
            <Input id="p-phone" v-model="profileForm.phone" type="tel" dir="ltr" required
              class="rounded-xl h-10 text-xs" />
          </div>

          <div class="pt-2">
            <Button type="submit" :disabled="isUpdatingProfile"
              class="rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover shadow-soft text-xs h-9 px-5">
              <Loader2 v-if="isUpdatingProfile" class="size-3.5 animate-spin" />
              <template v-else>
                {{ adminDashboardData.profileSection.buttons.saveInfo }}
              </template>
            </Button>
          </div>
        </form>
      </div>

      <!-- Card 2: Security & Password -->
      <div class="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4">
        <div class="border-b border-border/60 pb-3">
          <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
            <KeyRound class="size-4 text-primary" />
            <span>تغییر کلمه عبور</span>
          </h3>
          <p class="text-xs text-muted-foreground mt-0.5">
            جهت حفظ امنیت حساب، کلمه عبور خود را به‌صورت دوره‌ای بروزرسانی کنید.
          </p>
        </div>

        <form class="space-y-4 text-xs" @submit.prevent="handleChangePassword">
          <div class="space-y-1.5">
            <Label for="pass-current" class="text-xs">{{ adminDashboardData.profileSection.fields.currentPassword
              }}</Label>
            <Input id="pass-current" v-model="passwordForm.current_password" type="password" dir="ltr"
              placeholder="••••••••" required class="rounded-xl h-10 text-xs" />
          </div>

          <div class="space-y-1.5">
            <Label for="pass-new" class="text-xs">{{ adminDashboardData.profileSection.fields.newPassword }}</Label>
            <Input id="pass-new" v-model="passwordForm.new_password" type="password" dir="ltr"
              placeholder="حداقل ۶ کاراکتر" required class="rounded-xl h-10 text-xs" />
          </div>

          <div class="space-y-1.5">
            <Label for="pass-confirm" class="text-xs">{{ adminDashboardData.profileSection.fields.confirmPassword
              }}</Label>
            <Input id="pass-confirm" v-model="passwordForm.confirm_password" type="password" dir="ltr"
              placeholder="تکرار رمز جدید" required class="rounded-xl h-10 text-xs" />
          </div>

          <div class="pt-2">
            <Button type="submit" :disabled="isUpdatingPassword" variant="outline"
              class="rounded-pill text-xs h-9 px-5 gap-1.5">
              <Loader2 v-if="isUpdatingPassword" class="size-3.5 animate-spin" />
              <template v-else>
                <Lock class="size-3.5" />
                <span>{{ adminDashboardData.profileSection.buttons.changePassword }}</span>
              </template>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
