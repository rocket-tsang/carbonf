<script setup lang="ts">
const { t } = useI18n()
usePageSeo({
  title: t('site.brand') + ' — ' + t('site.tagline'),
  description: t('site.subtagline'),
})

const heroImages = [
  '/img/hero-1.jpg',
  '/img/hero-2.jpg',
  '/img/hero-3.jpg',
]

const industries = [
  { key: 'sports',     img: '/img/industry-sports.jpg' },
  { key: 'medical',    img: '/img/industry-medical.jpg' },
  { key: 'uav',        img: '/img/industry-uav.jpg' },
  { key: 'industrial', img: '/img/industry-industrial.jpg' },
] as const

const stats = ['years', 'facility', 'qc', 'preInsp'] as const
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative overflow-hidden bg-brand-cloud">
      <div class="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
            <span class="h-px w-8 bg-brand-accent" />
            {{ t('home.heroEyebrow') }}
          </p>
          <h1 class="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
            <span class="text-gradient">{{ t('home.heroTitle') }}</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg text-brand-mute leading-relaxed">
            {{ t('home.heroDesc') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/about"
              class="inline-flex h-12 items-center rounded-md border border-brand-ink px-6 text-sm font-bold uppercase tracking-wider text-brand-ink hover:bg-brand-ink hover:text-white"
            >
              {{ t('actions.learnMore') }}
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex h-12 items-center rounded-md bg-brand-accent px-6 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-accent-2"
            >
              {{ t('actions.getQuote') }}
            </NuxtLink>
          </div>
        </div>

        <div class="relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-2xl">
          <Carousel :images="heroImages" />
          <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-ink/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="bg-brand-ink text-white">
      <div class="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        <div
          v-for="s in stats"
          :key="s"
          class="border-l-2 border-brand-accent pl-4"
        >
          <div class="text-xs uppercase tracking-widest text-white/60">★</div>
          <div class="mt-1 text-sm sm:text-base font-bold leading-snug">{{ t(`home.stats.${s}`) }}</div>
        </div>
      </div>
    </section>

    <!-- APPLICATIONS -->
    <section class="container-x py-20 lg:py-24">
      <SectionTitle
        :eyebrow="t('home.applications')"
        :title="t('home.applications')"
        :subtitle="t('home.applicationsDesc')"
        align="center"
      />
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(item, idx) in industries"
          :key="item.key"
          class="group relative overflow-hidden rounded-2xl bg-brand-cloud"
        >
          <div class="aspect-[4/5] w-full">
            <SmartImage :src="item.img" :alt="t(`home.industries.${item.key}.title`)" class="h-full" />
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-transparent p-5 pt-16">
            <div class="text-xs font-bold uppercase tracking-widest text-brand-accent-2">
              0{{ idx + 1 }}
            </div>
            <h3 class="mt-1 text-xl font-bold text-white">
              {{ t(`home.industries.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm text-white/80 line-clamp-3">
              {{ t(`home.industries.${item.key}.desc`) }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-brand-cloud">
      <div class="container-x flex flex-col items-center gap-6 py-16 text-center lg:py-20">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-ink max-w-3xl">
          {{ t('site.tagline') }}
        </h2>
        <p class="max-w-2xl text-brand-mute">{{ t('site.subtagline') }}</p>
        <NuxtLink
          to="/contact"
          class="inline-flex h-12 items-center rounded-md bg-brand-accent px-8 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-accent-2"
        >
          {{ t('actions.getQuote') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
