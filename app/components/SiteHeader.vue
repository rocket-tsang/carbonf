<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const scrolled = ref(false)
const open = ref(false)
const route = useRoute()

const links = [
  { to: '/',              key: 'home' },
  { to: '/about',         key: 'about' },
  { to: '/capabilities',  key: 'capabilities' },
  { to: '/sections',      key: 'sections' },
  { to: '/sustainability', key: 'sustainability' },
  { to: '/contact',       key: 'contact' },
] as const

const onScroll = () => { scrolled.value = window.scrollY > 8 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const toggleLocale = () => { locale.value = locale.value === 'en' ? 'zh' : 'en' }
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur transition-all duration-300 border-b"
    :class="scrolled
      ? 'bg-white/90 border-brand-line/70 shadow-[0_2px_20px_rgba(10,37,64,0.06)]'
      : 'bg-white/60 border-transparent'"
  >
    <div class="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0" @click="open = false">
        <span class="inline-flex h-9 w-9 items-center justify-center lg:h-10 lg:w-10">
          <NuxtImg src="/img/brand/happycomposite-badge.svg" alt="HAPPYCOMPOSITE" width="40" height="40" class="h-full w-full" />
        </span>
        <span class="hidden sm:flex flex-col leading-tight">
          <span class="text-[13px] font-bold tracking-[0.12em] text-brand-ink whitespace-nowrap">HAPPYCOMPOSITE</span>
          <span class="text-[10px] tracking-[0.18em] text-brand-mute uppercase">Carbon Fiber</span>
        </span>
      </NuxtLink>

      <nav class="hidden xl:flex items-center gap-1">
        <NuxtLink
          v-for="l in links"
          :key="l.key"
          :to="l.to"
          class="relative px-3 py-2 text-sm font-semibold tracking-wide uppercase transition-colors"
          :class="route.path === l.to
            ? 'text-brand-accent'
            : 'text-brand-ink/80 hover:text-brand-accent'"
        >
          {{ t(`nav.${l.key}`) }}
          <span
            class="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-brand-accent transition-transform origin-center"
            :class="route.path === l.to ? 'scale-x-100' : 'scale-x-0'"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden sm:inline-flex h-9 items-center rounded-md border border-brand-line px-3 text-xs font-semibold text-brand-ink hover:bg-brand-cloud"
          @click="toggleLocale"
        >
          {{ locale === 'en' ? 'EN' : '中文' }}
        </button>
        <NuxtLink
          to="/contact"
          class="hidden md:inline-flex h-10 items-center rounded-md bg-brand-accent px-4 text-sm font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-accent-2"
        >
          {{ t('actions.getQuote') }}
        </NuxtLink>
        <button
          type="button"
          class="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-line"
          :aria-expanded="open"
          @click="open = !open"
        >
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" size="20" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="xl:hidden border-t border-brand-line bg-white">
        <nav class="container-x flex flex-col py-2">
          <NuxtLink
            v-for="l in links"
            :key="l.key"
            :to="l.to"
            class="py-3 text-sm font-semibold uppercase tracking-wider border-b border-brand-line/50 last:border-b-0"
            :class="route.path === l.to ? 'text-brand-accent' : 'text-brand-ink'"
            @click="open = false"
          >
            {{ t(`nav.${l.key}`) }}
          </NuxtLink>
          <button
            type="button"
            class="mt-3 self-start inline-flex h-9 items-center rounded-md border border-brand-line px-3 text-xs font-semibold"
            @click="toggleLocale"
          >
            {{ locale === 'en' ? 'EN' : '中文' }}
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>
