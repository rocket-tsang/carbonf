<script setup lang="ts">
defineProps<{ src: string; alt?: string }>()
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl bg-brand-cloud">
    <NuxtImg
      :src="src"
      :alt="alt"
      loading="lazy"
      class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
    />
  </div>
</template>
