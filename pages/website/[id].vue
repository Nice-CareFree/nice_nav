<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { 
  LucideGlobe,
  LucideEye,
  LucideExternalLink,
  LucideBookmark,
  LucideBookmarkPlus,
  LucideShare2,
  LucideFlag,
  LucideCheckCircle2,
  LucideStar
} from 'lucide-vue-next'
import {cancel_star, get_web_detail} from "~/utils/api";
import {useCounter} from '~/store/counter'
const store = useCounter()
const route = useRoute()
const ids = route.params.id
const website = ref({})
const getWebDetail = async () => {
  const res:any = await get_web_detail({
      id: ids
  })
  website.value = res.data
}
await getWebDetail()

// 相关网站

// 收藏状态
const isFavorited = ref(false)

// 打开网站
const openWebsite = () => {
  window.open(website.value.url, '_blank')
}

const copyWeb = (url) => {
  navigator.clipboard.writeText(url)
  Message.success('复制成功')
}

const checkLoading = ref(false)
const checkWeb = async () => {
  checkLoading.value = true
  try {
    const res: any = await check_web({
      id: ids
    })
    if (res.code === 20000) {
      Message.success(res.message)
      checkLoading.value = false
      getWebDetail()
    }
  } catch (error) {
    console.error('检测失败：', error)
    checkLoading.value = false
  }
}

// 切换收藏状态
const toggleFavorite = async (item:any) => {
  if (isFavorited.value) {
    // 取消收藏
    try {
      const res: any = await cancel_star({
        id: item
      })
      if (res.code === 20000) {
        Message.success(res.message)
        isFavorited.value = false
      }
    } catch (error) {
      console.error('取消收藏失败：', error)
    }
  }else{
    // 收藏
    try {
      const res: any = await add_star({
        id: ids
      })
      if (res.code === 20000) {
        Message.success(res.message)
        isFavorited.value = true
      }
    } catch (error) {
      console.error('收藏失败：', error)
    }
  }

}

// 复制链接
const copyUrl = () => {
  navigator.clipboard.writeText(website.url)
  // TODO: 显示复制成功提示
}

// 举报网站
const reportWebsite = () => {
  // TODO: 实现举报功能
}

// 显示评分对话框
const showRatingDialog = () => {
  // TODO: 实现评分功能
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Head>
      <Title>{{ website?.title}} - {{store.setting.web_other}}</Title>
    </Head>
    <!-- 顶部封面 -->
    <div class="relative h-full pt-4 lg:h-48 md:h-64 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container mx-auto px-4 h-full flex items-end pb-6">
        <div class="relative flex flex-wrap items-center gap-3">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center p-4">
            <img :src="website.icon" :alt="website.title" class="w-full h-full object-contain" />
          </div>

          <div class="flex justify-between flex-col h-full">
            <h1 class="m-0 mb-2 text-2xl md:text-3xl font-bold text-white">
              {{ website.title }}
            </h1>
            <span class="text-white">
              {{ website.description }}
            </span>
            <div class="mt-2 flex items-center space-x-4">
              <span class="text-sm flex items-center gap-1 text-white/80">
                <LucideGlobe class="w-4 h-4 inline-block mr-1" />
                {{ website.url }}
                <icon-copy class="cursor-pointer" @click="copyWeb(website.url)" />
              </span>
              <span class="text-sm flex items-center gap-1 text-white/80">
                <LucideEye class="w-4 h-4 inline-block mr-1" />
                {{ website.views }} 次浏览
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 左侧主要信息 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- 操作按钮 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <Button variant="default" size="sm" @click="openWebsite">
                <LucideExternalLink class="w-4 h-4 mr-2" />
                访问网站
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                :class="{ 'text-red-600 dark:text-red-400': isFavorited }"
                @click="toggleFavorite(website.id)"
              >
                <LucideBookmark v-if="isFavorited" class="w-4 h-4 mr-2" />
                <LucideBookmarkPlus v-else class="w-4 h-4 mr-2" />
                {{ isFavorited ? '取消收藏' : '收藏网站' }}
              </Button>
              <!--<Button variant="outline" size="sm" @click="copyUrl">-->
              <!--  <LucideShare2 class="w-4 h-4 mr-2" />-->
              <!--  分享-->
              <!--</Button>-->
            </div>
          </div>

          <!-- 网站描述 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">网站介绍</h2>
            <div v-html="website.content"></div>
            <div class="mt-6 flex flex-wrap gap-2">
              <div 
                v-for="tag in website.tags" 
                :key="tag"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
              >
                {{ tag.title }}
              </div>
            </div>
          </div>

          <!-- 相关推荐 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">相关推荐</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NuxtLink
                v-for="item in website.related"
                :to="`/website/${item.id}`"
                :key="item.id"
                class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <img :src="item.icon" :alt="item.title" class="w-6 h-6" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ item.title }}
                  </h3>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {{ item.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 右侧信息 -->
        <div class="space-y-6">
          <!-- 基本信息 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">基本信息</h2>
            <dl class="space-y-4">
              <div>
                <dt class="text-sm text-gray-500 dark:text-gray-400">收录时间</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ website.created_at }}</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500 dark:text-gray-400">所属分类</dt>
                <dd class="mt-1">
                  <NuxtLink 
                    :to="`/category/${website.category.other}`"
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  >
                    {{ website.category.title }}
                  </NuxtLink>
                </dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500 dark:text-gray-400">收藏次数</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ website.stars_count }} 次</dd>
              </div>

            </dl>
          </div>

          <!-- 网站状态 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div class="flex justify-between">
              <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">网站状态</h2>
              <a-button status="warning" :loading="checkLoading" @click="checkWeb">
                检测响应
              </a-button>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">可访问性</span>
                <span class="flex items-center text-sm text-green-600 dark:text-green-400"
                  :class="{ 'text-red-600 dark:text-red-400': website.url_status !== 1 }"
                >
                  <LucideCheckCircle2 class="w-4 h-4 mr-1" />
                  {{ website.url_status==1 ? '正常' : '异常' }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">响应速度</span>
                <div class="flex items-center">
                  <div class="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-green-500"
                      :style="{ width: `${website.url_speed}%` }"
                    ></div>
                  </div>
                  <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">{{ website.url_speed }}ms</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">最后检测</span>
                <span class="text-sm text-gray-900 dark:text-white">{{ website.url_check_time }}</span>
              </div>
            </div>
          </div>

          <!-- 用户评分 -->
          <!--<div class="bg-white dark:bg-gray-800 rounded-lg p-6">-->
          <!--  <div class="flex items-center justify-between mb-4">-->
          <!--    <h2 class="text-lg font-medium text-gray-900 dark:text-white">用户评分</h2>-->
          <!--    <div class="flex items-center">-->
          <!--      <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ website.rating }}</span>-->
          <!--      <span class="ml-1 text-sm text-gray-500 dark:text-gray-400">/5</span>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--  <div class="space-y-2">-->
          <!--    <div -->
          <!--      v-for="n in 5" -->
          <!--      :key="n"-->
          <!--      class="flex items-center"-->
          <!--    >-->
          <!--      <span class="text-sm text-gray-500 dark:text-gray-400 w-3">{{ 6-n }}</span>-->
          <!--      <div class="ml-2 flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">-->
          <!--        <div -->
          <!--          class="h-full bg-yellow-400"-->
          <!--          :style="{ width: `${website.ratingDistribution[6-n]}%` }"-->
          <!--        ></div>-->
          <!--      </div>-->
          <!--      <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">{{ website.ratingDistribution[6-n] }}%</span>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--  <Button -->
          <!--    variant="outline" -->
          <!--    size="sm"-->
          <!--    class="w-full mt-4"-->
          <!--    @click="showRatingDialog"-->
          <!--  >-->
          <!--    <LucideStar class="w-4 h-4 mr-2" />-->
          <!--    写评价-->
          <!--  </Button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template> 