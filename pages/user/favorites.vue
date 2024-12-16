<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- 页面头部 -->
    <div class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink 
              to="/user"
              class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <LucideArrowLeft class="w-5 h-5" />
            </NuxtLink>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">我的收藏</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- 收藏列表 -->
    <div class="container mx-auto px-4 py-6">
      <!-- 分类标签 -->
      <div class="mb-6 flex flex-wrap gap-2">
        <!--<button-->
        <!--  v-for="category in categories"-->
        <!--  :key="category.id"-->
        <!--  class="bg-gray-100 p-2 rounded-xl"-->

        <!--&gt;-->
        <!--  {{ category.title }}-->
        <!--</button>-->
      </div>

      <!-- 网站列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="item in favorites"
          :key="item.id" 
          class="group bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <img :src="item.web.icon" :alt="item.web.title" class="w-8 h-8" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-base font-medium text-gray-900 dark:text-white truncate">
                    {{ item.web.title }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {{ item.web.description }}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      class="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 -mr-2"
                    >
                      <LucideMoreVertical class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-[160px]">
                    <DropdownMenuItem @click="openWebsite(item.web.url)">
                      <LucideExternalLink class="w-4 h-4 mr-2" />
                      <span>访问网站</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="removeFavorite(item.id)" class="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400">
                      <LucideBookmarkMinus class="w-4 h-4 mr-2" />
                      <span>取消收藏</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div class="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                <!--<span class="flex items-center">-->
                <!--  <LucideTag class="w-4 h-4 mr-1" />-->
                <!--  {{ item.category }}-->
                <!--</span>-->
                <span class="flex items-center">
                  <LucideClock class="w-4 h-4 mr-1" />
                  {{ item.web.created_at }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-empty v-if="total === 0" />
      <a-pagination
        v-model:current="page"
        :total="total"
        :page-size="limit"
        @change="changePage"
        class="mt-6"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  LucideArrowLeft,
  LucideSearch,
  LucideFilter,
  LucideMoreVertical,
  LucideExternalLink,
  LucideBookmarkMinus,
  LucideTag,
  LucideClock
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {cancel_star, child_cate, my_star} from "~/utils/api";

definePageMeta({
  middleware: ['in-login']
})
const searchQuery = ref('')

const categories = ref([])
const getCategorys = async () => {
  const res:any = await get_all_category()
  categories.value = res.data
}
await getCategorys()
// 分类数据




// 收藏数据
const favorites = ref([])

const page = ref(1)
const limit = ref(9)
const total = ref(0)
const getStar = async () => {
  const res:any = await my_star({
    page: page.value,
    limit: limit.value
  })
  total.value = res.data.total
  favorites.value = res.data.star
  return res.data.star
}
await getStar()

// 根据搜索和分类过滤收藏列表
const filteredFavorites = computed(() => {

})

// 打开网站
const openWebsite = (url: string) => {
  window.open(url, '_blank')
}

// 取消收藏
const removeFavorite = async (item: any) => {
  try {
    const res:any = await cancel_star({
      id: item
    })
    if (res.code === 20000) {
      Message.success(res.message)
      getStar()
    }
  } catch (error) {
    console.error('取消收藏失败：', error)
  }
}

const changePage = async (pages: number) => {
  page.value = pages
  await getStar()
}
</script> 