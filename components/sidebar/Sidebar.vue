<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  LucideHome,
  LucideLayoutGrid,
  LucideBookmark,
  LucideHeart,
  LucideHistory,
  LucideSettings2,
  LucideChevronsLeft
} from 'lucide-vue-next'

const props = defineProps<{
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  'update:isCollapsed': [value: boolean]
}>()

const route = useRoute()

// 菜单项
const menuItems = [
  { id: 1, name: '首页', path: '/', icon: LucideHome },
  { id: 2, name: '分类', path: '/category', icon: LucideLayoutGrid },
  { id: 3, name: '收藏', path: '/favorites', icon: LucideBookmark },
  { id: 4, name: '喜欢', path: '/likes', icon: LucideHeart },
  { id: 5, name: '历史', path: '/history', icon: LucideHistory },
  { id: 6, name: '设置', path: '/settings', icon: LucideSettings2 }
]

// 切换收缩状态
const toggleCollapse = () => {
  emit('update:isCollapsed', !props.isCollapsed)
}
</script>

<template>
  <div
    class="hidden md:block fixed top-0 bottom-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ease-in-out z-30"
    :class="[
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- 侧边栏头部 -->
    <div class="flex items-center h-14 px-4 border-b dark:border-gray-700">
      <div class="flex items-center">
        <img src="/logo.png" alt="Logo" class="w-8 h-8 rounded-lg" />
        <span 
          class="ml-3 text-lg font-medium whitespace-nowrap transition-all duration-300 origin-left"
          :class="[
            isCollapsed ? 'w-0 opacity-0 scale-x-0' : 'w-auto opacity-100 scale-x-100'
          ]"
        >
          奈斯导航
        </span>
      </div>
    </div>

    <!-- 侧边栏内容 -->
    <div class="flex flex-col h-[calc(100%-3.5rem)]">
      <div class="flex-1 overflow-y-auto p-3">
        <div class="space-y-1">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.id"
            :to="item.path"
            class="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-gray-100 dark:bg-gray-700': route.path === item.path }"
          >
            <component 
              :is="item.icon" 
              class="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
              :class="isCollapsed ? '' : 'mr-3'"
            />
            <span 
              class="whitespace-nowrap transition-all duration-300 origin-left"
              :class="[
                isCollapsed ? 'w-0 opacity-0 scale-x-0' : 'w-auto opacity-100 scale-x-100'
              ]"
            >
              {{ item.name }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- 收缩按钮 -->
      <div class="p-3 bg-gray-50 dark:bg-gray-900/50">
        <Button 
          variant="ghost" 
          size="icon"
          class="w-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
          @click="toggleCollapse"
        >
          <LucideChevronsLeft 
            class="w-5 h-5 transition-transform duration-300"
            :class="{ 'rotate-180': isCollapsed }"
          />
        </Button>
      </div>
    </div>
  </div>
</template> 