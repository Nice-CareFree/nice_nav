<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 移动端顶部导航 -->
    <div class="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b dark:border-gray-700 md:hidden">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              @click="toggleSidebar"
            >
              <LucideMenu class="w-5 h-5" />
            </Button>
            <img @click="$router.push('/')" :src="store.setting?.image" alt="Logo" class="cursor-pointer w-8 h-8 rounded-lg ml-3" />
            <span class="ml-3 text-lg font-medium">{{ store.setting?.title}}</span>
          </div>
          <div class="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
            >
              <LucideSearch class="w-5 h-5" />
            </Button>
            <Button
                v-if="!token"
              variant="ghost" 
              size="sm"
              @click="navigateTo('/auth/login')"
            >
              登录
            </Button>
            <a-popover>
              <a-avatar v-if="token">
                <img
                    alt="avatar"
                    :src="user_info.avatar"
                />
              </a-avatar>
              <template #content>
                <ul class="space-y-2">
                  <li>
                    <NuxtLink to="/user"
                              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                           fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                      <span class="ml-3">个人中心</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/user/favorites"
                              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                           fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
                        </path>
                        <path
                            d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
                        </path>
                      </svg>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                          我的收藏
                        </span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/user/profile"
                              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                           fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"></path>
                      </svg>
                      <span class="flex-1 ml-3 whitespace-nowrap">
                          个人设置
                        </span>
                    </NuxtLink>
                  </li>
                  <li>
                    <div @click="logout"
                         class="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                           fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                              clip-rule="evenodd"></path>
                      </svg>
                      <span class="flex-1 ml-3 whitespace-nowrap">退出登录</span>
                    </div>
                  </li>
                </ul>
              </template>
            </a-popover>


          </div>
        </div>
      </div>
    </div>

    <!-- 页面布局 -->
    <div class="flex min-h-screen pt-[56px] md:pt-0">
      <!-- 移动端侧边栏 -->
      <div
        v-show="isSidebarOpen"
        class="fixed inset-0 z-50 md:hidden"
      >
        <!-- 遮罩层 -->
        <div 
          class="absolute inset-0 bg-black/30"
          @click="closeSidebar"
        ></div>

        <!-- 侧边栏内容 -->
        <div 
          class="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transform transition-transform duration-300 ease-in-out"
          :class="[
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          ]"
        >
          <!-- 移动端侧边栏头部 -->
          <div class="flex items-center h-14 px-4 border-b dark:border-gray-700">
            <div class="flex items-center">
              <img @click="$router.push('/')" :src="store.setting?.image" alt="Logo" class="cursor-pointer w-8 h-8 rounded-lg" />
              <span class="ml-3 text-lg font-medium">{{ store.setting?.title}}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              class="ml-auto"
              @click="closeSidebar"
            >
              <LucideX class="w-5 h-5" />
            </Button>
          </div>

          <!-- 移动端侧边栏内容 -->
          <div class="flex flex-col h-[calc(100%-3.5rem)]">
            <div class="flex-1 overflow-y-auto p-3">
              <div class="flex">
                <a-menu :collapsed="isCollapsed" breakpoint="xl">
                  <recursive-menu :menu-data="CategoryList" />
                </a-menu>
              </div>
            </div>

            <!-- 移动端底部功能区 -->
            <div class="border-t dark:border-gray-700">
              <div class="p-3 space-y-1">
                <button 
                  class="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  @click="toggleTheme"
                >
                  <LucideSun v-if="isDark" class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-3" />
                  <LucideMoon v-else class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-3" />
                  <span>{{ isDark ? '浅色模式' : '深色模式' }}</span>
                </button>
                <button 
                  class="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <LucideHelpCircle class="w-4 h-4 text-gray-500 dark:text-gray-400 mr-3" />
                  <span>帮助</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PC端侧边栏 -->
      <div
        class="hidden md:block fixed top-0 bottom-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ease-in-out z-30"
        :class="[
          isCollapsed ? 'w-16' : 'w-64'
        ]"
      >
        <!-- PC端侧边栏头部 -->
        <div class="flex items-center h-14 px-4 border-b dark:border-gray-700">
          <div class="flex items-center">
            <img @click="$router.push('/')" :src="store.setting?.image" alt="Logo" class="cursor-pointer w-8 h-8 rounded-lg" />
            <span 
              class="ml-3 text-lg font-medium whitespace-nowrap transition-all duration-300 origin-left"
              :class="[
                isCollapsed ? 'w-0 opacity-0 scale-x-0' : 'w-auto opacity-100 scale-x-100'
              ]"
            >
              {{ store.setting?.title}}
            </span>
          </div>
        </div>

        <!-- PC端侧边栏内容 -->
        <div class="flex flex-col h-[calc(100%-3.5rem)]">
          <div class="flex-1 overflow-y-auto p-3">
            <div class="flex">
              <a-menu :collapsed="isCollapsed" breakpoint="xl">
                <recursive-menu :menu-data="CategoryList" />
              </a-menu>
            </div>
          </div>

          <!-- PC端底部功能区 -->
          <div class="border-t dark:border-gray-700">
            <div class="p-3 space-y-1">
              <button 
                class="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                @click="toggleTheme"
              >
                <LucideSun v-if="isDark" class="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" :class="isCollapsed ? '' : 'mr-3'" />
                <LucideMoon v-else class="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" :class="isCollapsed ? '' : 'mr-3'" />
                <span 
                  class="whitespace-nowrap transition-all duration-300 origin-left"
                  :class="[
                    isCollapsed ? 'w-0 opacity-0 scale-x-0' : 'w-auto opacity-100 scale-x-100'
                  ]"
                >
                  {{ isDark ? '浅色模式' : '深色模式' }}
                </span>
              </button>
              <button 
                class="w-full flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <LucideHelpCircle class="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" :class="isCollapsed ? '' : 'mr-3'" />
                <span 
                  class="whitespace-nowrap transition-all duration-300 origin-left"
                  :class="[
                    isCollapsed ? 'w-0 opacity-0 scale-x-0' : 'w-auto opacity-100 scale-x-100'
                  ]"
                >
                  帮助
                </span>
              </button>
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
      </div>

      <!-- 主要内容区域 -->
      <div 
        class="flex-1 min-w-0 transition-all duration-300 ease-in-out"
        :class="{
          'md:ml-[64px]': isCollapsed,
          'md:ml-64': !isCollapsed
        }"
      >
        <!-- 桌面端顶部导航 -->
        <div class="sticky top-0 z-20 bg-white dark:bg-gray-800 dark:border-gray-700 hidden md:block">
          <div class="h-14 px-4 border-b flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                class="text-gray-500"
                @click="openSearch"
              >
                <LucideSearch class="w-4 h-4 mr-2" />
                搜索站内资源...
              </Button>
            </div>
            <div class="flex items-center space-x-4">
          

              <!-- 未登录状态 -->
              <template v-if="!token">
                <Button 
                  variant="ghost" 
                  size="sm"
                  @click="navigateTo('/auth/login')"
                >
                  <LucideUser class="w-4 h-4" />
                  登录
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  @click="navigateTo('/auth/register')"
                >
                  免费注册
                </Button>
              </template>
              <a-popover>
                <a-avatar v-if="token">
                  <img
                      alt="avatar"
                      :src="user_info.avatar"
                  />
                </a-avatar>
                <template #content>
                  <ul class="space-y-2">
                    <li>
                      <NuxtLink to="/user"
                         class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span class="ml-3">个人中心</span>
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/user/favorites"
                         class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
                          </path>
                          <path
                              d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
                          </path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                          我的收藏
                        </span>
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/user/profile"
                         class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">
                          个人设置
                        </span>
                      </NuxtLink>
                    </li>
                    <li>
                      <div @click="logout"
                         class="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">退出登录</span>
                      </div>
                    </li>
                  </ul>
                </template>
              </a-popover>
            </div>
          </div>
        </div>

        <slot />
      </div>
    </div>

    <!-- 添加搜索弹窗组件 -->
    <SearchDialog v-model:open="showSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { SearchDialog } from '@/components/search'
import { Sidebar } from '@/components/sidebar'
import {
  LucideMenu,
  LucideX,
  LucideSearch,
  LucideUser,
  LucideSun,
  LucideMoon,
  LucideSettings,
  LucideHelpCircle,
  LucideChevronsLeft,
  LucideHome,
  LucideLayoutGrid,
  LucideBookmark,
  LucideHeart,
  LucideHistory,
  LucideSettings2
} from 'lucide-vue-next'
import {child_cate, get_config} from "~/utils/api";
import {useCounter} from '~/store/counter'
const store = useCounter()
const route = useRoute()
const isLoggedIn = ref(false)
const isDark = ref(false)
const isSidebarOpen = ref(false)
const isCollapsed = ref(false)
const showSearch = ref(false)
const token = useCookie('token')
const user_info = useCookie('user_info')
useHead({
  title: store.setting?.title + ' - ' + store.setting?.web_other,
  meta: [
    { name: 'description', content: store.setting?.web_description},
    { name: 'keywords', content: store.setting?.web_keyword}
  ]
})
// 菜单项
const get_configs = async () => {
  const res:any = await get_config()
  store.setting = res.data.logo
}
await get_configs()

const CategoryList = ref([])
const getCategory = async () =>{
  const res:any = await child_cate()
  CategoryList.value = res.data
}
await getCategory()

// 初始化主题
onMounted(() => {
  // 从 localStorage 读取主题设置
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark' || 
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  // 应用主题
  updateTheme(isDark.value)

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
      updateTheme(e.matches)
    }
  })
})

const logout = () => {
  token.value = ''
  user_info.value = ''
  navigateTo('/auth/login')
}

// 监听主题变化
watch(isDark, (newValue) => {
  updateTheme(newValue)
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
})

// 更新主题
const updateTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// 关闭侧边栏
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// 切换收缩状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 打开搜索弹窗
const openSearch = () => {
  showSearch.value = true
}
</script> 