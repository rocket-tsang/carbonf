// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },

  future: { compatibilityVersion: 4 },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/i18n',
  ],

  vite: {
    plugins: [tailwindcss()],
    // Vite 8（rolldown）的依赖预扫描不会跑 Nuxt 的 unimport 转换，遇到
    // @nuxtjs/i18n 运行时里的 `#components` 虚拟导入就会整段扫描失败并报
    // "Failed to run dependency scan"；关掉自动发现，改由 Nuxt/Vite 按需处理。
    optimizeDeps: {
      noDiscovery: true,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'zh', language: 'zh-CN', name: '中文' },
    ],
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://web.carbonfibercy.com/prod-api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.carbonfibercy.com',
    },
  },

  nitro: {
    routeRules: {
      '/prod-api/**': {
        proxy: (process.env.NUXT_PUBLIC_API_BASE || 'https://web.carbonfibercy.com/prod-api') + '/**',
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'HAPPYCOMPOSITE — Carbon Fiber Manufacturer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '15+ years of excellence in high-performance CFRP engineering. 8,000㎡+ facility. Trusted OEM for global Tier-1 brands.' },
        { name: 'keywords', content: 'carbon fiber, CFRP, OEM, sports, medical, UAV, drone, industrial' },
        { property: 'og:title', content: 'HAPPYCOMPOSITE' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/img/brand/happycomposite-favicon.svg' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/img/brand/happycomposite-favicon.svg' },
      ],
    },
  },
})
