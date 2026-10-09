<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ title: t('sections.title') + ' — ' + t('site.brand') })

const cats = ['round', 'square', 'profile', 'sheet'] as const
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-brand-ink to-brand-ink-2 text-white">
      <div class="container-x py-20 lg:py-28">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-2">{{ t('sections.title') }}</p>
        <h1 class="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
          {{ t('sections.subtitle') }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
          {{ t('sections.intro') }}
        </p>
      </div>
    </section>

    <section class="container-x py-20 lg:py-24">
      <div class="grid gap-8 sm:grid-cols-2">
        <article
          v-for="(c, i) in cats"
          :key="c"
          class="group overflow-hidden rounded-2xl border border-brand-line bg-white"
        >
          <div class="aspect-[16/10] overflow-hidden bg-brand-cloud">
            <SmartImage :src="`/img/section-${i + 1}.jpg`" :alt="t(`sections.categories.${c}`)" class="h-full" />
          </div>
          <div class="p-6">
            <div class="text-xs font-bold uppercase tracking-widest text-brand-accent">0{{ i + 1 }}</div>
            <h3 class="mt-2 text-2xl font-bold text-brand-ink group-hover:text-brand-accent">
              {{ t(`sections.categories.${c}`) }}
            </h3>
            <p class="mt-3 text-brand-mute leading-relaxed">{{ t('sections.intro') }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="bg-brand-cloud">
      <div class="container-x py-20 text-center lg:py-24">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-ink">
          {{ t('sections.subtitle') }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-brand-mute">{{ t('sections.intro') }}</p>
        <NuxtLink
          to="/contact"
          class="mt-8 inline-flex h-12 items-center rounded-md bg-brand-accent px-8 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-accent-2"
        >
          {{ t('actions.sendRequest') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
