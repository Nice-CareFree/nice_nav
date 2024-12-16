<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Tooltip } from '@/components/ui/tooltip'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  title: string
  description: string
  icon?: string
  url: string
  id: number
}

const props = defineProps<Props>()

// 右键菜单状态
const showMenu = ref(false)
const menuPosition = ref({ x: 0, y: 0 })

// 处理右键点击
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  showMenu.value = true
  menuPosition.value = {
    x: e.clientX,
    y: e.clientY
  }
}

// 处理普通点击
const handleClick = () => {
  navigateTo(`/website/${props.id}`)
}

// 关闭右键菜单
const closeMenu = () => {
  showMenu.value = false
}

// 直接访问网站
const visitWebsite = () => {
  window.open(props.url, '_blank')
  closeMenu()
}

// 点击其他地方关闭菜单
onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<template>
  <div>
    <Tooltip :text="description">
      <Card 
        class="hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
        @click="handleClick"
        @contextmenu="handleContextMenu"
      >
        <CardContent class="p-4">
          <div class="flex items-center space-x-3 mb-2">
            <div 
              class="w-8 h-8 rounded flex items-center justify-center text-lg"
            >
              <img v-if="icon" :src="icon" alt="" class="w-full">
              <span v-else>
              {{  title[0] }}
              </span>
            </div>
            <div class="font-medium text-gray-900 dark:text-white">{{ title }}</div>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
        </CardContent>
      </Card>
    </Tooltip>

    <!-- 右键菜单 -->
    <div 
      v-if="showMenu"
      class="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 min-w-[120px] border border-gray-200 dark:border-gray-700"
      :style="{
        left: menuPosition.x + 'px',
        top: menuPosition.y + 'px'
      }"
      @click.stop
    >
      <button 
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center"
        @click="visitWebsite"
      >
        <span class="i-carbon-arrow-up-right mr-2"></span>
        直达网站
      </button>
      <button 
        class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center"
        @click="handleClick"
      >
        <span class="i-carbon-information mr-2"></span>
        查看详情
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 防止文本被选中 */
.cursor-pointer {
  user-select: none;
  -webkit-user-select: none;
}
</style> 