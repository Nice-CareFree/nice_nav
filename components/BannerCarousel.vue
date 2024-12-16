<script setup lang="ts">
import { ref } from 'vue'
import {index_portal} from "~/utils/api";

interface BannerItem {
  id: number
  image_url: string
  title: string
  description: string
  link_url: string
}



const items = ref<BannerItem[]>([])

const getCarsoulList = async () => {
  const res:any = await index_portal();
  items.value = res.data;
}
await getCarsoulList();

const handleChange = (index: number) => {

}
</script>

<template>
  <a-carousel
    class="w-full h-full"
    animation-name="fade"
    :show-arrow="'hover'"
    :auto-play="true"
    @change="handleChange"
  >
    <a-carousel-item v-for="item in items" :key="item.id">
      <NuxtLink :to="item.link_url" class="relative w-full h-full" target="_blank">
        <div class="absolute inset-0  z-10"></div>
        <img
          :src="item.image_url"
          :alt="item.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-0 left-0 p-4 md:p-8 text-white z-20">
          <h3 class="text-lg md:text-2xl font-bold mb-1 md:mb-2">{{ item.title }}</h3>
          <p class="text-xs md:text-sm opacity-90">{{ item.description }}</p>
        </div>
      </NuxtLink>
    </a-carousel-item>
  </a-carousel>
</template>

<style>
.arco-carousel-arrow-left,
.arco-carousel-arrow-right {
  @apply !bg-white/20 hover:!bg-white/40 !border-0;
}

.arco-carousel-arrow-icon {
  @apply !text-white;
}

@media (max-width: 768px) {
  .arco-carousel-arrow-left,
  .arco-carousel-arrow-right {
    @apply !w-8 !h-8;
  }

  .arco-carousel-arrow-icon {
    @apply !w-4 !h-4;
  }

  .arco-carousel-indicator-dot {
    @apply !w-1.5 !h-1.5;
  }
}
</style> 