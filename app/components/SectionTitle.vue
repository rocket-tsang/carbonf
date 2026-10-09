<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <header
    class="max-w-3xl"
    :class="align === 'center' ? 'mx-auto text-center' : ''"
  >
    <div
      v-if="eyebrow"
      class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent"
    >
      <span class="h-px w-8 bg-brand-accent" />
      {{ eyebrow }}
    </div>
    <h2 class="mt-3 text-3xl sm:text-4xl font-extrabold leading-tight text-brand-ink">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p v-if="subtitle" class="mt-4 text-base sm:text-lg text-brand-mute leading-relaxed">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </header>
</template>
