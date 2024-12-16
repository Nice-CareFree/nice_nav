<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Banner 区域 -->
    <div class="bg-white dark:bg-gray-800 w-full">
      <div class="h-[160px] sm:h-[250px] md:h-[350px] lg:h-[400px]">
        <BannerCarousel />
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="bg-white dark:bg-gray-800 border-y dark:border-gray-700">
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <!-- 搜索引擎选项 -->
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            <div v-for="(s,s_index) in searchList"
                 :key="s_index"
                 @click="searchEngine = s.title"
                 :class="searchEngine === s.title ? 'bg-blue-500 text-white' : ''"
                 class="cursor-pointer px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-700 text-sm">
              {{s.title}}
            </div>
          </div>
          <!-- 搜索框 -->
          <div class="flex-1">
            <input
              type="text" 
              class="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="请输入搜索关键词并按回车进行搜索..."
              @keydown.enter.native="search"
              v-model="searchInfo"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
      <!-- 栏目推荐 -->
      <section class="mb-4 sm:mb-6">
        <h2 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3">栏目推荐</h2>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
          <NuxtLink
              v-for="cate in hotCateList"
              :key="cate.id"
            :to="`/category/${cate.other}`"
            class="flex flex-col items-center p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
          >
            <div class="w-10 h-10 sm:w-12 sm:h-12  rounded-lg flex items-center justify-center text-blue-500 dark:text-blue-400 mb-1">
              <img :src="cate.icon" alt="" class="w-full">
            </div>
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
              {{cate.title}}
            </span>
          </NuxtLink>
        </div>
      </section>

      <!-- 推荐好站 -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <LucideGlobe class="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
            推荐好站
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <WebsiteCard
            v-for="(website,index) in hotWebList"
            :key="index"
            v-bind="website"
          />
        </div>
      </section>
      <!--多级分类网址categories-->
      <section class="my-2" v-for="(c,c_index) in categories" :key="c_index">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <img :src="c.icon" alt="" class="w-6 h-6 sm:w-5 sm:h-5 mr-1.5">
            {{ c.title }}
          </h2>
          <Button variant="ghost" size="sm" class="p-1.5" @click="$router.push(`/category/${c.other}`)">
            <LucideMoreHorizontal class="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <WebsiteCard
              v-for="(website,index) in c.sites"
              :key="index"
              v-bind="website"
          />

        </div>
        <a-empty class="bg-white dark:bg-gray-800 rounded-xl" v-if="c.sites.length === 0" />
      </section>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WebsiteCard from '@/components/ui/card/WebsiteCard.vue'
import { Button } from '@/components/ui/button'
import { 
  LucideDownload, 
  LucidePaintbrush, 
  LucideLayoutGrid, 
  LucideImage, 
  LucideCamera, 
  LucideSmartphone, 
  LucideGlobe, 
  LucideMoreHorizontal
} from 'lucide-vue-next'
import {index_portal_content} from "~/utils/api";

const searchList = ref([])
const searchEngine = ref('站内')
const searchInfo = ref('')
const hotCateList = ref([])
const hotWebList = ref([])
const page = ref(1)
const pageSize = ref(9)
const total = ref(0)
const categories = ref([])

const getIndex = async () =>{
  const res:any = await index_portal_content({
    page:page.value,
    limit:pageSize.value
  })
  searchList.value = res.data.search
  hotCateList.value = res.data.hot_cate
  hotWebList.value = res.data.hot_web
  total.value = res.data.total
  categories.value = res.data.categories
  if (searchList.value.length > 0) {
    searchEngine.value = searchList.value[0].title
  }

}
await getIndex()

const search = () => {
  const url = searchList.value.find(s => s.title === searchEngine.value)?.url
  window.open(url?.replace('${query}', searchInfo.value))
}

// 模拟网站数据

</script>

<style scoped>
/* 自定义滚动条样式 */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-200 dark:bg-gray-700;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-300 dark:bg-gray-600;
}
</style> 