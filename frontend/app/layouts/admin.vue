<script setup lang="ts">
import {
  LayoutDashboard,
  Mail,
  FileText,
  Users,
  User,
  ExternalLink,
  LogOut,
  Sun,
  Moon,
  Menu,
  ChevronLeft,
  Home,
  ShieldCheck,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { siteConfig } from '~/data'

const route = useRoute()
const { admin, logout } = useAuth()

const isMobileSidebarOpen = ref(false)
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// ساختار منوی دسته‌بندی‌شده ناوبری
type NavigationItem = {
  label: string
  href: string
  icon: typeof LayoutDashboard
  exact?: boolean
  external?: boolean
}

type NavigationGroup = {
  title: string
  items: NavigationItem[]
}

const navigationGroups: NavigationGroup[] = [
  {
    title: 'مدیریت و محتوا',
    items: [
      {
        label: 'میز کار و داشبورد',
        href: '/admin',
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: 'صندوق پیام‌های مراجعین',
        href: '/admin/messages',
        icon: Mail,
      },
      {
        label: 'مدیریت مقالات تخصصی',
        href: '/admin/articles',
        icon: FileText,
      },
    ],
  },
  {
    title: 'سازمان و دسترسی‌ها',
    items: [
      {
        label: 'کاربران و پرسنل',
        href: '/admin/users',
        icon: Users,
      },
      {
        label: 'پروفایل و امنیت',
        href: '/admin/profile',
        icon: User,
      },
    ],
  },
  {
    title: 'دسترسی سریع',
    items: [
      {
        label: 'مشاهده وب‌سایت عمومی',
        href: '/',
        icon: ExternalLink,
        external: true,
      },
    ],
  },
]

const isItemActive = (href: string, exact = false) => {
  if (exact) {
    return route.path === href
  }
  return route.path === href || route.path.startsWith(`${href}/`)
}
</script>

<template>
  <div dir="rtl"
    class="min-h-screen bg-muted/20 text-foreground dark:bg-background/95 transition-colors duration-200 antialiased font-sans">
    <div class="flex min-h-screen">
      <!-- ========================================== -->
      <!-- DESKTOP FIXED SIDEBAR                      -->
      <!-- ========================================== -->
      <aside
        class="hidden w-72 shrink-0 border-l border-border/70 bg-card/95 backdrop-blur-md lg:flex lg:flex-col lg:justify-between sticky top-0 h-screen z-30 select-none">
        <div class="flex flex-col flex-1 overflow-y-auto px-4 py-6 scrollbar-none">
          <!-- Logo & Brand Header -->
          <div class="flex items-center gap-3.5 px-3 pb-6 border-b border-border/60">
            <div
              class="relative flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft ring-4 ring-primary/10 shrink-0">
              <span class="text-lg font-black tracking-tight">{{ siteConfig.shortName }}</span>
              <span class="absolute -bottom-0.5 -left-0.5 size-3 rounded-full border-2 border-card bg-emerald-500"
                title="سامانه فعال است" />
            </div>

            <div class="flex flex-col text-right min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="text-sm font-bold text-foreground truncate">
                  {{ siteConfig.name }}
                </span>
                <Badge variant="outline" class="px-1.5 py-0 text-[10px] font-semibold text-primary border-primary/30">
                  مدیریت
                </Badge>
              </div>
              <span class="text-xs text-muted-foreground truncate mt-0.5">
                پنل کنترل و پیام‌های کلینیک
              </span>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="mt-6 flex-1 space-y-6">
            <div v-for="group in navigationGroups" :key="group.title" class="space-y-1.5">
              <p class="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground/80">
                {{ group.title }}
              </p>

              <div class="space-y-1 pt-1">
                <template v-for="item in group.items" :key="item.href">
                  <NuxtLink :to="item.href" :target="item.external ? '_blank' : undefined" :class="[
                    'group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150',
                    isItemActive(item.href, item.exact)
                      ? 'bg-primary/10 text-primary font-bold shadow-xs'
                      : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
                  ]">
                    <div class="flex items-center gap-3 min-w-0">
                      <component :is="item.icon" :class="[
                        'size-4.5 transition-colors shrink-0',
                        isItemActive(item.href, item.exact)
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-foreground',
                      ]" />
                      <span class="truncate">{{ item.label }}</span>
                    </div>

                    <ChevronLeft v-if="!item.external" :class="[
                      'size-3.5 transition-transform duration-200 shrink-0',
                      isItemActive(item.href, item.exact)
                        ? 'text-primary translate-x-0'
                        : 'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
                    ]" />
                    <ExternalLink v-else class="size-3 text-muted-foreground/60 shrink-0" />
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Sidebar User Profile Footer -->
        <div class="border-t border-border/70 p-3.5 bg-card/60">
          <div class="flex items-center justify-between gap-3 rounded-2xl bg-secondary/40 p-2.5">
            <NuxtLink to="/admin/profile"
              class="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-85 transition-opacity"
              title="مشاهده پروفایل کاربری">
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold text-xs">
                <ShieldCheck class="size-4.5" />
              </div>
              <div class="min-w-0 text-right">
                <p class="truncate text-xs font-bold text-foreground">
                  {{ admin?.full_name || admin?.username || 'مدیر سیستم' }}
                </p>
                <p class="truncate text-[11px] text-muted-foreground font-mono" dir="ltr">
                  {{ admin?.phone || '09123456789' }}
                </p>
              </div>
            </NuxtLink>

            <Button variant="ghost" size="icon"
              class="size-8 rounded-xl text-destructive hover:bg-destructive/10 shrink-0" title="خروج از حساب"
              @click="logout">
              <LogOut class="size-4" />
            </Button>
          </div>
        </div>
      </aside>

      <!-- ========================================== -->
      <!-- MAIN CANVAS (Header + Viewport)            -->
      <!-- ========================================== -->
      <div class="flex flex-1 flex-col min-w-0">
        <!-- Top App Bar -->
        <header
          class="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/60 bg-card/85 px-4 backdrop-blur-xl sm:px-8">
          <!-- بخش راست هدر (منوی موبایل + مسیر صفحه) -->
          <div class="flex items-center gap-3">
            <!-- Mobile Menu Sheet -->
            <Sheet v-model:open="isMobileSidebarOpen">
              <SheetTrigger as-child>
                <Button variant="outline" size="icon" class="size-9 rounded-xl lg:hidden">
                  <Menu class="size-4.5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" class="w-[min(85vw,300px)] p-0 border-l-0 border-border bg-card" dir="rtl">
                <SheetHeader class="border-b border-border p-5 text-right">
                  <SheetTitle class="flex items-center gap-2.5 text-foreground">
                    <span
                      class="flex size-8 items-center justify-center rounded-xl bg-primary text-xs font-bold text-primary-foreground">
                      {{ siteConfig.shortName }}
                    </span>
                    <span class="text-sm font-bold">{{ siteConfig.name }}</span>
                  </SheetTitle>
                </SheetHeader>

                <div class="flex flex-col justify-between h-[calc(100vh-5.5rem)] p-4">
                  <div class="space-y-5 overflow-y-auto">
                    <!-- کارت هویت موبایل -->
                    <NuxtLink to="/admin/profile"
                      class="flex items-center gap-3 rounded-2xl bg-secondary/50 p-3 hover:bg-secondary transition-colors"
                      @click="isMobileSidebarOpen = false">
                      <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <User class="size-5" />
                      </div>
                      <div class="min-w-0 flex-1 text-right">
                        <p class="truncate text-sm font-bold text-foreground">
                          {{ admin?.full_name || admin?.username || 'مدیر سیستم' }}
                        </p>
                        <p class="truncate text-xs text-muted-foreground font-mono" dir="ltr">
                          {{ admin?.phone || '09123456789' }}
                        </p>
                      </div>
                    </NuxtLink>

                    <!-- لیست لینک‌های موبایل -->
                    <div v-for="group in navigationGroups" :key="group.title" class="space-y-1">
                      <p class="px-2 text-[11px] font-semibold text-muted-foreground">
                        {{ group.title }}
                      </p>
                      <SheetClose v-for="item in group.items" :key="item.href" as-child>
                        <NuxtLink :to="item.href" :target="item.external ? '_blank' : undefined" :class="[
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                          isItemActive(item.href, item.exact)
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                        ]">
                          <component :is="item.icon" class="size-4" />
                          <span>{{ item.label }}</span>
                        </NuxtLink>
                      </SheetClose>
                    </div>
                  </div>

                  <div class="border-t border-border pt-4">
                    <Button variant="destructive" class="w-full justify-center gap-2 rounded-xl text-xs h-10"
                      @click="logout">
                      <LogOut class="size-4" />
                      <span>خروج از پنل</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <!-- Breadcrumb مسیر جاری -->
            <div class="hidden sm:flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Home class="size-3.5" />
              <span>پنل مدیریت</span>
              <span class="text-border">/</span>
              <span class="text-foreground font-semibold">میز کار</span>
            </div>
          </div>

          <!-- بخش چپ هدر (تغییر تم + نمایش وب‌سایت) -->
          <div class="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="icon"
              class="size-9 rounded-xl border-border/80 text-muted-foreground hover:text-foreground"
              title="تغییر تم تاریک / روشن" @click="toggleTheme">
              <Sun v-if="isDark" class="size-4 text-amber-500" />
              <Moon v-else class="size-4" />
            </Button>

            <Button variant="outline" size="sm" as-child
              class="hidden sm:inline-flex h-9 rounded-pill gap-1.5 px-3.5 text-xs font-medium">
              <NuxtLink to="/" target="_blank">
                <span>نمایش وب‌سایت</span>
                <ExternalLink class="size-3.5" />
              </NuxtLink>
            </Button>
          </div>
        </header>

        <!-- Main Workspace Area -->
        <main class="flex-1 px-4 py-8 sm:px-8 max-w-7xl w-full mx-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
