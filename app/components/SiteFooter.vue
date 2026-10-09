<script setup lang="ts">
const { t, locale } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-brand-ink text-white">
    <div class="container-x grid gap-10 py-14 lg:grid-cols-4">
      <div>
        <div class="flex items-center gap-3">
          <span class="inline-flex h-10 w-10 items-center justify-center">
            <NuxtImg src="/img/brand/happycomposite-badge-flat.svg" alt="HAPPYCOMPOSITE" width="40" height="40" class="h-full w-full" />
          </span>
          <div class="leading-tight">
            <div class="text-[15px] font-bold tracking-[0.12em]">HAPPYCOMPOSITE</div>
            <div class="text-[10px] tracking-[0.18em] text-white/60 uppercase">Carbon Fiber</div>
          </div>
        </div>
        <p class="mt-4 text-sm text-white/70 leading-relaxed">
          {{ t('site.tagline') }}
        </p>
      </div>

      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-white/80">{{ t('footer.company') }}</h4>
        <ul class="mt-4 space-y-2 text-sm text-white/70">
          <li><NuxtLink to="/about"         class="hover:text-brand-accent">{{ t('footer.about') }}</NuxtLink></li>
          <li><NuxtLink to="/capabilities" class="hover:text-brand-accent">{{ t('nav.capabilities') }}</NuxtLink></li>
          <li><NuxtLink to="/sections"     class="hover:text-brand-accent">{{ t('nav.sections') }}</NuxtLink></li>
          <li><NuxtLink to="/sustainability" class="hover:text-brand-accent">{{ t('nav.sustainability') }}</NuxtLink></li>
          <li><NuxtLink to="/contact"      class="hover:text-brand-accent">{{ t('footer.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-white/80">{{ t('footer.contact') }}</h4>
        <ul class="mt-4 space-y-2 text-sm text-white/70">
          <li><span class="text-white/50">{{ t('footer.address') }} </span>{{ t('footer.addressValue') }}</li>
          <li><span class="text-white/50">{{ t('footer.mob') }} </span>{{ t('footer.mobValue') }}</li>
          <li><span class="text-white/50">{{ t('footer.tel') }} </span>{{ t('footer.telValue') }}</li>
          <li>
            <span class="text-white/50">{{ t('footer.email') }} </span>
            <a class="hover:text-brand-accent" :href="`mailto:${t('footer.emailValue')}`">{{ t('footer.emailValue') }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-white/80">Stay in touch</h4>
        <p class="mt-4 text-sm text-white/70">
          {{ locale === 'zh' ? '订阅我们，获取最新产品与制造能力更新。' : 'Subscribe for product updates and manufacturing insights.' }}
        </p>
        <form class="mt-4 flex gap-2" @submit.prevent>
          <input
            type="email"
            required
            :placeholder="locale === 'zh' ? '您的邮箱' : 'your@email.com'"
            class="flex-1 rounded-md bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <button
            type="submit"
            class="rounded-md bg-brand-accent px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-brand-accent-2"
          >
            OK
          </button>
        </form>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="container-x flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-white/50">
        <div>{{ t('footer.copyright', { year }) }}</div>
        <div class="flex items-center gap-3">
          <a class="hover:text-white" href="#"><Icon name="lucide:linkedin" size="16" /></a>
          <a class="hover:text-white" href="#"><Icon name="lucide:facebook" size="16" /></a>
          <a class="hover:text-white" href="#"><Icon name="lucide:youtube" size="16" /></a>
          <a class="hover:text-white" href="#"><Icon name="lucide:instagram" size="16" /></a>
        </div>
      </div>
    </div>
  </footer>
</template>
