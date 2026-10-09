<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

withDefaults(defineProps<{
  images: string[]
  altPrefix?: string
  autoplayDelay?: number
}>(), {
  altPrefix: 'Carbon fiber',
  autoplayDelay: 4500,
})

const modules = [Autoplay]
</script>

<template>
  <Swiper
    :modules="modules"
    :slides-per-view="1"
    :loop="images.length > 1"
    :autoplay="{ delay: autoplayDelay, disableOnInteraction: false }"
    class="h-full w-full"
  >
    <SwiperSlide v-for="(src, i) in images" :key="src">
      <SmartImage :src="src" :alt="`${altPrefix} ${i + 1}`" class="h-full w-full" />
    </SwiperSlide>
  </Swiper>
</template>
