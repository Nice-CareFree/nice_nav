<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Head>
      <Title>{{ categoryDetail?.title}} - {{store.setting.web_other}}</Title>
    </Head>
    <!-- 分类头部 -->
    <div class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div class="container mx-auto px-4">
        <div class="py-8">
          <!-- 分类信息 -->
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-xl  flex items-center justify-center">
              <img :src="categoryDetail.icon" :alt="categoryDetail.title" />
            </div>
            <div>
              <h1 class="m-0 text-2xl font-bold text-gray-900 dark:text-white">{{ categoryDetail.title }}</h1>
              <p class="mt-1 text-gray-500 dark:text-gray-400">{{ categoryDetail.description }}</p>
            </div>
          </div>

          <!-- 分类统计 -->
          <div class="mt-6 flex items-center space-x-8">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <LucideLayoutGrid class="w-4 h-4 mr-1.5" />
              <span>{{ categoryDetail.total }} 个网站</span>
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <LucideEye class="w-4 h-4 mr-1.5" />
              <span>{{ categoryDetail.views }} 次浏览</span>
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <LucideBookmark class="w-4 h-4 mr-1.5" />
              <span>{{ categoryDetail.collects }} 次收藏</span>
            </div>
          </div>

          <!-- 子分类标签 -->
          <div class="mt-6 flex flex-wrap gap-2"
               :class="{ 'hidden': categoryDetail.children.length === 0 }"
          >
            <button
                @click="$router.push(`/category/${subCategory.other}`)"
              v-for="subCategory in categoryDetail.children"
              :key="subCategory.id"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                activeSubCategory === subCategory.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              ]"
            >
              {{ subCategory.title }}
              <span class="ml-1.5 text-xs text-gray-500 dark:text-gray-400">{{ subCategory.web_count_count }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="container mx-auto px-4 py-6">
      <!-- 筛选和排序 -->
      <div class="flex items-center flex-wrap gap-2 justify-between mb-6">
        <div class="flex items-center  space-x-4">
          <!-- 搜索框 -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索分类内网站..."
              class="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <LucideSearch class="absolute left-3 top-2 w-5 h-5 text-gray-400" />
          </div>

          <!-- 标签筛选 -->
          <!--<DropdownMenu>-->
          <!--  <DropdownMenuTrigger asChild>-->
          <!--    <Button variant="outline" size="sm" class="h-9">-->
          <!--      <LucideTag class="w-4 h-4 mr-2" />-->
          <!--      标签筛选-->
          <!--    </Button>-->
          <!--  </DropdownMenuTrigger>-->
          <!--  <DropdownMenuContent class="w-56">-->
          <!--    <div class="p-2">-->
          <!--      <div class="flex flex-wrap gap-1">-->
          <!--        <button-->
          <!--          v-for="tag in popularTags"-->
          <!--          :key="tag.id"-->
          <!--          :class="[-->
          <!--            'px-2 py-1 rounded text-xs font-medium transition-colors',-->
          <!--            selectedTags.includes(tag.id)-->
          <!--              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'-->
          <!--              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'-->
          <!--          ]"-->
          <!--          @click="toggleTag(tag.id)"-->
          <!--        >-->
          <!--          {{ tag.name }}-->
          <!--        </button>-->
          <!--      </div>-->
          <!--    </div>-->
          <!--  </DropdownMenuContent>-->
          <!--</DropdownMenu>-->
        </div>

        <!-- 排序方式 -->
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" class="h-9 rounded-lg">
              <LucideArrowUpDown class="w-4 h-4 mr-2" />
              {{ sortOptions[currentSort as SortOption].label }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuItem
              v-for="(option, key) in sortOptions"
              :key="key"
              :class="{ 'bg-gray-100 dark:bg-gray-700': currentSort === key }"
              @click="changeOptions(key)"
            >
              <component :is="option.icon" class="w-4 h-4 mr-2" />
              <span>{{ option.label }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- 网站列表 -->
      <div class="web-list">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
              v-for="website in categoryDetail.sites"
              :key="website.id"
              class="group bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
              @click="navigateToDetail(website.id)"
          >
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <img :src="website.icon" :alt="website.title" class="w-full" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-base font-medium text-gray-900 dark:text-white truncate">
                      {{ website.title }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {{ website.description }}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                          variant="ghost"
                          size="icon"
                          class="opacity-0 flex justify-center cursor-pointer group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 -mr-2"
                          @click.stop
                      >
                          <LucideMoreVertical class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-[160px]">
                      <DropdownMenuItem @click.stop="openWebsite(website.url)">
                        <LucideExternalLink class="w-4 h-4 mr-2" />
                        <span>访问网站</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem @click.stop="toggleFavorite(website.id)">
                        <LucideBookmarkPlus class="w-4 h-4 mr-2" />
                        <span>收藏网站</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div class="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                  <div class="flex items-center">
                    <LucideEye class="w-4 h-4 mr-1 " />
                    {{ website.views }}
                  </div>
                  <div class="flex flex-wrap gap-1">
                  <span
                      v-for="tag in website.tags"
                      :key="tag"
                      class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                  >
                    {{ tag.title }}
                  </span>
                    <span
                        v-if="website.tags.length > 2"
                        class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                    >
                    +{{ website.tags.length - 2 }}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载更多 -->
        <div class="mt-8 text-center" v-if="hasMore && total>0">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {
  LucideLayoutGrid,
  LucideEye,
  LucideBookmark,
  LucideSearch,
  LucideTag,
  LucideArrowUpDown,
  LucideMoreVertical,
  LucideExternalLink,
  LucideBookmarkPlus,
  LucideStar,
  LucideClock,
  LucideBarChart,
  LucideHeart
} from 'lucide-vue-next'
import {add_star, category_content} from "~/utils/api";
import {useCounter} from '~/store/counter'
const store = useCounter()
const route = useRoute()
const other = route.params.id
const categoryDetail = ref({})
const page = ref(1)
const limit = ref(24)
const total = ref(0)


// 热门标签
const popularTags = [
  { id: 1, name: '代码托管' },
  { id: 2, name: '版本控制' },
  { id: 3, name: '开源项目' },
  { id: 4, name: 'CI/CD' },
  { id: 5, name: '云服务' },
  { id: 6, name: '协作工具' },
  { id: 7, name: '开发框架' },
  { id: 8, name: '编程语言' }
]

// 排序选项类型
type SortOption =  'popular' | 'newest' | 'trending'

// 排序选项
const sortOptions = {
  popular: { label: '最受欢迎', icon: LucideHeart },
  newest: { label: '最新添加', icon: LucideClock },
  trending: { label: '最近热门', icon: LucideBarChart }
} as const

// 状态管理
const searchQuery = ref('')
const activeSubCategory = ref('')
const selectedTags = ref<number[]>([])
const currentSort = ref<SortOption>('popular')
const isLoading = ref(false)
const hasMore = ref(true)

const getCategories = async () => {
  const res:any = await category_content({
    page: page.value,
    limit: limit.value,
    other: other,
    search: searchQuery.value,
    type: currentSort.value,
  })
  categoryDetail.value = res.data
  total.value = res.data.total
}
await getCategories()

const changeOptions = (type:SortOption) => {
  currentSort.value = type
  getCategories()
}

// 模拟网站数据
const websites = ref([
  {
    id: 1,
    title: 'GitHub',
    description: '全球最大的代码托管平台，提供Git仓库托管服务',
    icon: 'https://github.com/favicon.ico',
    url: 'https://github.com',
    rating: 4.9,
    favorites: 9999,
    tags: ['代码托管', '版本控制', '开源社区']
  },
  {
    id: 2,
    title: 'VS Code',
    description: '微软开发的免费开源代码编辑器',
    icon: 'https://code.visualstudio.com/favicon.ico',
    url: 'https://code.visualstudio.com',
    rating: 4.8,
    favorites: 8888,
    tags: ['编辑器', 'IDE', '开源工具']
  },
  {
    id: 3,
    title: 'Stack Overflow',
    description: '全球最大的程序员问答社区',
    icon: 'https://stackoverflow.com/favicon.ico',
    url: 'https://stackoverflow.com',
    rating: 4.7,
    favorites: 7777,
    tags: ['问答社区', '技术交流', '编程学习']
  }
])

// 过滤网站列表
const filteredWebsites = computed(() => {
  return websites.value.filter(website => {
    // 搜索过滤
    if (searchQuery.value && !website.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    // 标签过滤
    if (selectedTags.value.length > 0) {
      const websiteTagIds = website.tags.map(tag => popularTags.find(t => t.name === tag)?.id)
      if (!selectedTags.value.some(id => websiteTagIds.includes(id))) {
        return false
      }
    }
    return true
  })
})

const router = useRouter()

// 切换标签
const toggleTag = (tagId: number) => {
  const index = selectedTags.value.indexOf(tagId)
  if (index === -1) {
    selectedTags.value.push(tagId)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// 跳转到详情页
const navigateToDetail = (websiteId: number | string) => {
  router.push(`/website/${websiteId}`)
}

// 打开网站
const openWebsite = (url: string) => {
  window.open(url, '_blank')
}

// 收藏网站
const toggleFavorite =async (website: any) => {
  const res:any = await add_star({
    id: website
  })
  if (res.code === 20000) {
    Message.success(res.message)
  }
}

// 加载更多
const loadMore = async () => {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    // TODO: 实现加载更多逻辑
    limit.value += 24
    await getCategories()
    //如果当前网站数量等于总数，说明没有更多了
    if (categoryDetail.value.sites.length === total.value) {
      hasMore.value = false
      Message.warning('没有更多了')
    }
  } finally {
    isLoading.value = false
  }
}
</script> 