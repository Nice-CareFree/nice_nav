<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="/logo.png" alt="Logo" class="mx-auto h-12 w-12 rounded-lg" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">登录账号</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          还没有账号？
          <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            立即注册
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">邮箱地址</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="邮箱地址"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="密码"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              记住我
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/auth/reset-password" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              忘记密码？
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class="mr-2 inset-y-0 flex items-center pl-3">
              <LucideLock class="h-5 w-5" />
            </span>
            登录
          </button>
        </div>

        <!-- 第三方登录 -->
        <!--<div class="mt-6">-->
        <!--  <div class="relative">-->
        <!--    <div class="absolute inset-0 flex items-center">-->
        <!--      <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>-->
        <!--    </div>-->
        <!--    <div class="relative flex justify-center text-sm">-->
        <!--      <span class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">-->
        <!--        或使用以下方式登录-->
        <!--      </span>-->
        <!--    </div>-->
        <!--  </div>-->

        <!--  <div class="mt-6 grid grid-cols-3 gap-3">-->
        <!--    <button-->
        <!--      type="button"-->
        <!--      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"-->
        <!--    >-->
        <!--      <LucideGithub class="h-5 w-5" />-->
        <!--    </button>-->
        <!--    <button-->
        <!--      type="button"-->
        <!--      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"-->
        <!--    >-->
        <!--      <LucideWechat class="h-5 w-5" />-->
        <!--    </button>-->
        <!--    <button-->
        <!--      type="button"-->
        <!--      class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"-->
        <!--    >-->
        <!--      <LucideQq class="h-5 w-5" />-->
        <!--    </button>-->
        <!--  </div>-->
        <!--</div>-->
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LucideLock, LucideGithub } from 'lucide-vue-next'
import { LucideWechat, LucideQq } from '@/components/icons'
import {login} from "~/utils/api";

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const token = useCookie('token', {maxAge: 60 * 60 * 24 * 2})
const user_info = useCookie('user_info', {maxAge: 60 * 60 * 24 * 2})
definePageMeta({
  middleware: ['no-login']
})
const handleLogin = async () => {
  try {
    // TODO: 实现登录逻辑
    const res:any = await login({
      email: email.value,
      password: password.value
    })
    if (res.code == 20000) {
      // 保存token
      token.value = res.data.token.access_token
      user_info.value = res.data.userInfo
      // 登录成功后跳转
      router.push('/')
      Message.success('登录成功')
    }


  } catch (error) {
    console.error('登录失败：', error)
  }
}
</script> 