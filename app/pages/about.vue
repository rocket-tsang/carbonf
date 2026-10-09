<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ title: t('about.title') + ' — ' + t('site.brand') })

const values = ['precision', 'quality', 'innovation', 'partnership'] as const
</script>

<template>
  <div>
    <!-- BANNER -->
    <section class="bg-gradient-to-br from-brand-ink to-brand-ink-2 text-white">
      <div class="container-x py-20 lg:py-28">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-2">{{ t('about.title') }}</p>
        <h1 class="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
          {{ t('about.subtitle') }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
          {{ t('about.intro') }}
        </p>
      </div>
    </section>

    <!-- MISSION / VISION -->
    <section class="container-x grid gap-10 py-20 lg:grid-cols-2 lg:py-24">
      <div class="rounded-2xl border border-brand-line bg-white p-8 shadow-sm">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{{ t('about.mission') }}</h2>
        <p class="mt-4 text-xl leading-relaxed text-brand-ink">{{ t('about.missionText') }}</p>
      </div>
      <div class="rounded-2xl border border-brand-line bg-white p-8 shadow-sm">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">{{ t('about.vision') }}</h2>
        <p class="mt-4 text-xl leading-relaxed text-brand-ink">{{ t('about.visionText') }}</p>
      </div>
    </section>

    <!-- VALUES -->
    <section class="bg-brand-cloud">
      <div class="container-x py-20 lg:py-24">
        <SectionTitle
          :eyebrow="t('about.values')"
          :title="t('about.values')"
          align="center"
        />
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(v, i) in values"
            :key="v"
            class="rounded-xl bg-white p-6 border border-brand-line hover:border-brand-accent transition-colors"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-ink text-white font-black">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <h3 class="mt-4 text-lg font-bold text-brand-ink">{{ t(`about.valuesList.${v}`) }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- FACTORY GALLERY -->
    <section class="container-x py-20 lg:py-24">
      <SectionTitle
        :eyebrow="t('nav.capabilities')"
        :title="t('nav.capabilities')"
      />
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="aspect-[4/3]">
          <SmartImage :src="`/img/factory-${i}.jpg`" :alt="`Factory ${i}`" class="h-full" />
        </div>
      </div>
    </section>
  </div>
</template>
