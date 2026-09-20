<template>
  <div dir="rtl" class="min-h-screen overflow-x-hidden bg-background text-foreground">
    <LayoutsAppHeader />

    <main id="main-content">
      <slot />
    </main>

    <LayoutsAppFooter />
  </div>
</template>
