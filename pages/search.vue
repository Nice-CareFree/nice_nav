<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 搜索结果页头部 -->
    <div class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div class="container mx-auto px-4">
        <div class="h-20 flex items-center">
          <!-- 搜索框 -->
          <div class="flex-1 max-w-2xl relative">
            <input
              v-model="searchQuery"
              type="text"
              class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              placeholder="搜索站内资源..."
              @keyup.enter="handleSearch"
            >
            <LucideSearch class="absolute left-3 top-1.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索结果内容 -->
    <div class="container mx-auto px-4 py-6">
      <!-- 搜索结果统计 -->
      <div class="mb-6">
        <h1 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ searchQuery }} 的搜索结果
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          共找到 {{ searchResults.length }} 个相关结果
        </p>
      </div>

      <!-- 筛选选项 -->
      <div class="flex items-center space-x-4 mb-6">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">分类：</span>
          <div class="flex flex-wrap gap-2">
            <!--全部-->
            <button
              :class="[
                'px-3 py-1.5 text-sm rounded-full transition-colors',
                selectedCategory === 'all'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
              @click="selectedCategory = 'all'"
            >
              全部
            </button>
            <button
              v-for="category in categories"
              :key="category.id"
              :class="[
                'px-3 py-1.5 text-sm rounded-full transition-colors',
                selectedCategory === category.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              ]"
              @click="selectedCategory = category.id"
            >
              {{ category.title }}
            </button>
          </div>
        </div>
      </div>

      <!-- 搜索结果列表 -->
      <div class="space-y-4">
        <div 
          v-for="result in searchResults"
          :key="result.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="navigateToDetail(result.id)"
        >
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <img :src="result.icon" :alt="result.title" class="w-full" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-medium text-gray-900 dark:text-white mb-1">
                {{ result.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {{ result.description }}
              </p>
              <div class="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                <div class="flex items-center">
                  <LucideEye class="w-4 h-4 mr-1 " />
                  {{ result.views }}
                </div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="tag in result.tags"
                    :key="tag"
                    class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                  >
                    {{ tag.title }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div v-if="hasMore && total>0" class="mt-8 text-center">
        <Button 
          variant="outline"
          size="lg"
          class="w-full max-w-xs"
          :loading="isLoading"
          @click="loadMore"
        >
          {{ isLoading ? '加载中...' : '加载更多' }}
        </Button>
      </div>

      <!-- 没有更多 -->
      <div class="text-center" v-if="total==0">
        <a-empty class="bg-white dark:bg-gray-800 rounded-xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  LucideSearch,
  LucideStar,
  LucideBookmark, LucideEye
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.query.q || '')
const selectedCategory = ref('all')
const isLoading = ref(false)
const hasMore = ref(true)


// 分类选项
const categories = ref([])

// 模拟搜索结果数据
const searchResults = ref([])

// 过滤后的搜索结果
const page = ref(1)
const pageSize = ref(9)
const total = ref(0)

// 处理搜索
const handleSearch = async () => {
  router.push({
    name: 'search',
    query: { q: searchQuery.value }
  })
  try{
    const res:any = await get_web_search({
      search:searchQuery.value,
      page:page.value,
      limit:pageSize.value,
      cate_id:selectedCategory.value
    })
    searchResults.value = res.data.web
    total.value = res.data.total
  }catch (e){
    console.log(e)
  }
}
await handleSearch()

const getCategorys = async () => {
  const res:any = await get_all_category()
  categories.value = res.data
}
await getCategorys()

// 跳转到详情页
const navigateToDetail = (id: number) => {
  router.push(`/website/${id}`)
}

// 加载更多
const loadMore = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    // TODO: 实现加载更多逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    hasMore.value = false
  } finally {
    isLoading.value = false
  }
}

// 初始化
onMounted(() => {
  // 从 URL 获取搜索关键词
  const query = route.query.q
  if (query && typeof query === 'string') {
    searchQuery.value = query
    handleSearch()
  }
})

watch(() => searchQuery.value, (newValue) => {
  // 搜索关键词变化时，
  // 重置分类选项为全部
  selectedCategory.value = 'all'
})

watch(() => selectedCategory.value, (newValue) => {
  // 分类选项变化时，
  // 重新搜索
  handleSearch()
})

watch(() => route.query.q, (newValue) => {
  // URL 中搜索关键词变化时，
  // 更新搜索关键词
  searchQuery.value = newValue
  handleSearch()
})

</script> 