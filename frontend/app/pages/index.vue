<script setup lang="ts">
import { siteConfig } from '~/data'

useHead({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  meta: [
    {
      name: 'description',
      content: siteConfig.description,
    },
  ],
})
</script>

<template>
  <HomeHero />
  <HomeTrustBar />
  <HomeConcernsSection />
  <HomeServicesSection />
  <HomeApproachSection />
  <HomeProcessSection />
  <HomeTestimonialsSection />
  <HomeArticlesSection />
  <HomeFaqSection />
  <HomeContactSection />
</template>
