<script setup lang="ts">
import { ArrowLeft, Menu } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { siteConfig, mainNavigation } from '~/data'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const isActive = (href: string): boolean => {
  if (href === '/') {
    return route.path === '/' && !route.hash
  }

  if (href.startsWith('/#')) {
    const hash = href.replace('/', '')
    return route.path === '/' && route.hash === hash
  }

  return route.path === href || route.path.startsWith(`${href}/`)
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
    <div class="site-container">
      <div class="flex h-20 items-center justify-between gap-6">
        <!-- Brand -->
        <NuxtLink to="/" class="group flex shrink-0 items-center gap-3" aria-label="صفحه اصلی">
          <span
            class="flex size-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-soft transition-transform duration-200 group-hover:-rotate-3">
            {{ siteConfig.shortName }}
          </span>

          <span class="hidden text-right sm:block">
            <span class="block text-sm font-bold text-foreground">
              {{ siteConfig.name }}
            </span>

            <span class="block text-xs text-muted-foreground">
              {{ siteConfig.tagline }}
            </span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          <NuxtLink v-for="item in mainNavigation" :key="item.href" :to="item.href" :class="[
            'rounded-pill px-4 py-2 text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-secondary font-bold text-primary dark:text-foreground'
              : 'text-muted-foreground hover:bg-secondary/70 hover:text-primary dark:hover:text-foreground',
          ]">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden items-center gap-3 lg:flex">
          <NuxtLink :to="siteConfig.contactCta.buttonHref"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary dark:hover:text-foreground">
            تماس با ما
          </NuxtLink>

          <Button as-child class="rounded-pill bg-cta px-5 text-cta-foreground shadow-soft hover:bg-cta-hover">
            <NuxtLink :to="siteConfig.contactCta.buttonHref">
              {{ siteConfig.contactCta.buttonText || siteConfig.contactCta.title }}
              <ArrowLeft class="size-4" />
            </NuxtLink>
          </Button>
        </div>

        <!-- Mobile Menu Trigger & Sheet -->
        <Sheet v-model:open="isMobileMenuOpen">
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="rounded-xl lg:hidden" aria-label="باز کردن منو">
              <Menu class="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" class="w-[min(88vw,380px)] border-l-0 border-border bg-background">
            <SheetHeader class="border-b border-border pb-5 text-right">
              <SheetTitle class="text-foreground">
                {{ siteConfig.name }}
              </SheetTitle>
            </SheetHeader>

            <nav class="mt-8 flex flex-col gap-2" aria-label="منوی موبایل">
              <SheetClose v-for="item in mainNavigation" :key="item.href" as-child>
                <NuxtLink :to="item.href" :class="[
                  'rounded-xl px-4 py-3 text-right text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-secondary font-bold text-primary dark:text-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-primary dark:hover:text-foreground',
                ]" @click="closeMobileMenu">
                  {{ item.label }}
                </NuxtLink>
              </SheetClose>
            </nav>

            <div class="mt-8">
              <SheetClose as-child>
                <Button as-child class="w-full rounded-pill bg-cta text-cta-foreground hover:bg-cta-hover"
                  @click="closeMobileMenu">
                  <NuxtLink :to="siteConfig.contactCta.buttonHref">
                    {{ siteConfig.contactCta.buttonText || siteConfig.contactCta.title }}
                    <ArrowLeft class="size-4" />
                  </NuxtLink>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
