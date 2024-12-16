<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  LucideSearch,
  LucideArrowRight,
  LucideHistory,
  LucideX,
  LucideTrendingUp
} from 'lucide-vue-next'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const router = useRouter()
const searchQuery = ref('')
const searchHistory = ref(['Vue.js', 'React', 'TailwindCSS', 'TypeScript'])
const hotSearches = ref(['GitHub', 'VS Code', 'Figma', 'ChatGPT', 'Stable Diffusion'])

// 监听弹窗状态
watch(() => props.open, (newValue) => {
  if (newValue) {
    // 弹窗打开时，聚焦搜索框
    setTimeout(() => {
      document.querySelector<HTMLInputElement>('#search-input')?.focus()
    }, 100)
  } else {
    // 弹窗关闭时，清空搜索内容
    searchQuery.value = ''
  }
})

// 执行搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  // 添加到搜索历史
  if (!searchHistory.value.includes(searchQuery.value)) {
    searchHistory.value.unshift(searchQuery.value)
    searchHistory.value = searchHistory.value.slice(0, 10) // 只保留最近10条
  }
  
  // 关闭弹窗并跳转到搜索结果页
  emit('update:open', false)
  router.push({
    path: '/search',
    query: { q: searchQuery.value }
  })
}

// 清除搜索历史
const clearHistory = () => {
  searchHistory.value = []
}

// 点击搜索历史或热门搜索
const searchFor = (keyword: string) => {
  searchQuery.value = keyword
  handleSearch()
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-2xl rounded-xl overflow-hidden">
      <DialogHeader>
        <DialogTitle>站内搜索</DialogTitle>
        <DialogDescription>
          搜索站内资源...
        </DialogDescription>
      </DialogHeader>
      <div class="py-2">
        <!-- 搜索框 -->
        <div class="flex items-center space-x-2">
          <div class="flex-1 relative">
            <input
              id="search-input"
              v-model="searchQuery"
              type="text"
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="搜索站内资源..."
              @keyup.enter="handleSearch"
            >
            <LucideSearch class="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <Button @click="handleSearch">
            <LucideArrowRight class="w-5 h-5" />
          </Button>
        </div>

        <!-- 搜索历史 -->
        <div v-if="searchHistory.length > 0" class="mt-8">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <LucideHistory class="w-4 h-4 mr-1.5" />
              搜索历史
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              class="h-7 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              @click="clearHistory"
            >
              <LucideX class="w-4 h-4 mr-1" />
              清除
            </Button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in searchHistory"
              :key="item"
              class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              @click="searchFor(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <!-- 热门搜索 -->
        <div class="mt-8">
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <LucideTrendingUp class="w-4 h-4 mr-1.5" />
            热门搜索
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(item, index) in hotSearches"
              :key="item"
              class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              @click="searchFor(item)"
            >
              <span class="mr-1 text-blue-500 dark:text-blue-400">{{ index + 1 }}</span>
              {{ item }}
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template> 