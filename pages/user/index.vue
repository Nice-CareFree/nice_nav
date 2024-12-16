<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- 个人中心头部 -->
    <div class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:space-x-6">
          <!-- 头像区域 -->
          <div class="relative group">
            <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
              <!--<img-->
              <!--  :src="user_info.avatar"-->
              <!--  :alt="user_info.username"-->
              <!--  class="w-full h-full object-cover"-->
              <!--/>-->
              <!--<a-avatar trigger-type="mask" :size="90">-->
              <!--  <img-->
              <!--      alt="avatar"-->
              <!--      :src="user_info.avatar"-->
              <!--  />-->
              <!--  <template #trigger-icon>-->
              <!--    <IconUpload />-->
              <!--  </template>-->
              <!--</a-avatar>-->
              <a-upload
                  :action="actions"
                  :show-file-list="false"
                  :headers="{ 'Authorization': 'Bearer ' + token }"
                  @before-upload="beforeUpload"
                  @success="picSuccess"
                  draggable
              >
                <template #upload-button>
                  <a-avatar trigger-type="mask" :size="90" class="info-avatar">
                    <template #trigger-icon>
                      <icon-camera />
                    </template>
                    <img  class="rounded-full" :src="user_info.avatar" />
                  </a-avatar>
                </template>
              </a-upload>
            </div>

          </div>

          <!-- 用户信息 -->
          <div class="mt-4 md:mt-0">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ user_info.username }}
            </h1>
            <p class="mt-1 text-gray-500 dark:text-gray-400">{{ user_info.email }}</p>
            <div class="mt-2 flex items-center space-x-4">
              <div class="text-sm">
                <span class="text-gray-500 dark:text-gray-400">注册时间：</span>
                <span class="text-gray-900 dark:text-white">
                  {{ user_info.created_at }}
                </span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500 dark:text-gray-400">收藏数量：</span>
                <span class="text-gray-900 dark:text-white">
                  {{userStarCount}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能导航 -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 个人资料卡片 -->
        <NuxtLink 
          to="/user/profile"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <LucideUser class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">个人资料</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">修改个人信息和账号设置</p>
              </div>
            </div>
            <LucideChevronsRight class="w-5 h-5 text-gray-400" />
          </div>
        </NuxtLink>

        <!-- 收藏管理卡片 -->
        <NuxtLink 
          to="/user/favorites"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <LucideBookmark class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">我的收藏</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">管理收藏的网站和资源</p>
              </div>
            </div>
            <LucideChevronsRight class="w-5 h-5 text-gray-400" />
          </div>
        </NuxtLink>

        <!-- 安全设置卡片 -->
        <NuxtLink 
          to="/user/security"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <LucideShieldCheck class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">安全设置</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">修改密码和安全选项</p>
              </div>
            </div>
            <LucideChevronsRight class="w-5 h-5 text-gray-400" />
          </div>
        </NuxtLink>
      </div>

      <!-- 最近收藏 -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">最近收藏</h2>
          <NuxtLink 
            to="/user/favorites"
            class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            查看全部
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
              :to="`/website/${item.id}`"
              v-for="item in userStar" :key="item.web.id" class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <img :src="item.web.icon" :alt="item.web.title" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-base font-medium text-gray-900 dark:text-white truncate">{{ item.web?.title }}</h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ item.web?.description }}</p>
                <div class="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <LucideClock class="w-4 h-4 mr-1" />
                  {{ item.web.created_at }}
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LucideCamera,
  LucideUser,
  LucideBookmark,
  LucideShieldCheck,
  LucideChevronsRight,
  LucideClock
} from 'lucide-vue-next'
import {get_user_info, get_user_star} from "~/utils/api";

const token = useCookie('token')
const user_info = useCookie('user_info') as any
definePageMeta({
  middleware: ['in-login']
})

const getUser = async () => {
  const res:any = await get_user_info()
  user_info.value = res.data
}

const userStar = ref([])
const userStarCount = ref(0)
const getUserStar = async () => {
  const res:any = await get_user_star({
    page: 1,
    limit: 6
  })
  userStar.value = res.data.star
  userStarCount.value = res.data.total
}


if (token.value) {
  getUser()
  getUserStar()
}

const actions = "/api/users/upload_avatar";
const beforeUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 15;

  if (!isJPG && !isPNG) {
    Message.error("上传图片只能是 JPG/PNG 格式!");
    return false;
  }
  if (!isLt2M) {
    Message.error("上传图片大小不能超过 15MB!");
    return false;
  }
  return true;
};

const picSuccess = (currentFile: any) => {
  // 获取currentFile里的response的data值
  Message.success("上传成功!");
  getUser()
};


</script> 