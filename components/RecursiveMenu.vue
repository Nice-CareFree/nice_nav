<template>
  <div v-for="(item, index) in menuData" :key="index">
    <!-- 有children时显示子菜单 -->
    <a-sub-menu
        v-if="item.children && item.children.length"
        :key="item.id"
    >
      <template #icon>
        <img
            v-if="item.icon"
            :src="item.icon"
            alt=""
            class="w-4"
            @click="handleClick(item)"
        >
      </template>
      <template #title>
        <div @click="handleClick(item)">
          {{ item.title }}
        </div>
      </template>
      <!-- 递归调用自身 -->
      <recursive-menu :menu-data="item.children" />
    </a-sub-menu>

    <!-- 没有children时显示菜单项 -->
    <a-menu-item
        v-else
        :key="item.other || item.id"
        @click="handleClick(item)"
    >
      <template #icon>
        <img v-if="item.icon" :src="item.icon" alt="" class="w-4">
      </template>
      {{ item.title }}
    </a-menu-item>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
})

const handleClick = (item) => {
  if (item.other) {
    router.push(`/category/${item.other}`)
  }
}
</script>

<style scoped>
.w-4 {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}
</style>