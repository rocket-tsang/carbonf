<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ title: t('sustainability.title') + ' — ' + t('site.brand') })

const pillars = ['material', 'energy', 'waste', 'people'] as const
const icons  = ['leaf', 'zap', 'recycle', 'users'] as const
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-brand-ink to-brand-ink-2 text-white">
      <div class="container-x py-20 lg:py-28">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-2">{{ t('sustainability.title') }}</p>
        <h1 class="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
          {{ t('sustainability.subtitle') }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
          {{ t('sustainability.intro') }}
        </p>
      </div>
    </section>

    <section class="container-x py-20 lg:py-24">
      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="(p, i) in pillars"
          :key="p"
          class="rounded-2xl border border-brand-line bg-white p-8 hover:border-brand-accent transition-colors"
        >
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-success/10 text-brand-success">
            <Icon :name="`lucide:${icons[i]}`" size="22" />
          </div>
          <h3 class="mt-5 text-2xl font-bold text-brand-ink">{{ t(`sustainability.pillars.${p}.title`) }}</h3>
          <p class="mt-3 text-brand-mute leading-relaxed">{{ t(`sustainability.pillars.${p}.desc`) }}</p>
        </div>
      </div>
    </section>

    <section class="bg-brand-cloud">
      <div class="container-x grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-24">
        <SmartImage src="/img/sustain-main.jpg" alt="Sustainability" class="aspect-[4/3] w-full" />
        <div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-ink">{{ t('sustainability.subtitle') }}</h2>
          <p class="mt-4 text-brand-mute leading-relaxed">{{ t('sustainability.intro') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
