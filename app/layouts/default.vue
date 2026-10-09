<script setup lang="ts">
const { t, locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('site.brand') + ' — Carbon Fiber Manufacturer',
  meta: [
    { name: 'description', content: t('site.tagline') + ' ' + t('site.subtagline') },
  ],
}))
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-white text-brand-ink">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
