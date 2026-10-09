<script setup lang="ts">
const { t } = useI18n()
usePageSeo({ title: t('capabilities.title') + ' — ' + t('site.brand') })

const items = ['layup', 'rtm', 'filament', 'pultrusion', 'cnc', 'metrology', 'finishing', 'assembly'] as const
const icons = ['layers', 'droplet', 'rotate-3d', 'move', 'cpu', 'scan', 'brush', 'package'] as const
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-brand-ink to-brand-ink-2 text-white">
      <div class="container-x py-20 lg:py-28">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-2">{{ t('capabilities.title') }}</p>
        <h1 class="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
          {{ t('capabilities.subtitle') }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
          {{ t('capabilities.intro') }}
        </p>
      </div>
    </section>

    <section class="container-x py-20 lg:py-24">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(it, i) in items"
          :key="it"
          class="group rounded-2xl border border-brand-line bg-white p-6 transition-all hover:border-brand-accent hover:shadow-lg"
        >
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-cloud text-brand-ink group-hover:bg-brand-accent group-hover:text-white">
            <Icon :name="`lucide:${icons[i]}`" size="22" />
          </div>
          <div class="mt-5 text-xs font-bold uppercase tracking-widest text-brand-mute">
            CAPABILITY / 0{{ i + 1 }}
          </div>
          <h3 class="mt-2 text-lg font-bold leading-snug text-brand-ink">
            {{ t(`capabilities.list.${it}`) }}
          </h3>
        </div>
      </div>
    </section>

    <section class="bg-brand-cloud">
      <div class="container-x grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-24">
        <SmartImage src="/img/capability-main.jpg" alt="Capability" class="aspect-[4/3] w-full" />
        <div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-ink">
            {{ t('capabilities.subtitle') }}
          </h2>
          <p class="mt-4 text-brand-mute leading-relaxed">{{ t('capabilities.intro') }}</p>
          <NuxtLink
            to="/contact"
            class="mt-8 inline-flex h-12 items-center rounded-md bg-brand-accent px-6 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-accent-2"
          >
            {{ t('actions.getQuote') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
