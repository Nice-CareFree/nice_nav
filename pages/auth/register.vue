<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="/logo.png" alt="Logo" class="mx-auto h-12 w-12 rounded-lg" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">注册账号</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          已有账号？
          <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            立即登录
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md space-y-4">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="用户名"
            />
          </div>
          <div class="relative">
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
            <a-button type="primary"
                      @click="sendCodeDialog"
                      :loading="sendCodeLoading"
                      :disabled="sendCodeDisabled"
                      class="!rounded-md !absolute top-[1px] right-[1px] z-10"
                      size="large">
              {{ sendCodeText }}
            </a-button>
            <a-modal v-model:visible="codeDialog"
                     title="发送验证码"
                     @ok="sendCodeVerify"
                     ok-text="发送"
                     cancel-text="取消">
              <div class="flex">
                <a-input v-model="codeImage" placeholder="请输入验证码" />
                <img :src="captcha_image" @click="getCaptcha" class="cursor-pointer h-10" />
              </div>

            </a-modal>
          </div>
          <!--验证码-->
          <div>
            <label for="code" class="sr-only">验证码</label>
            <input
              id="code"
              v-model="code"
              name="code"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="验证码"
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
          <div>
            <label for="confirmPassword" class="sr-only">确认密码</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
              placeholder="确认密码"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="agree-terms"
            v-model="agreeTerms"
            name="agree-terms"
            type="checkbox"
            required
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            我已阅读并同意
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">服务条款</a>
            和
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">隐私政策</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class=" inset-y-0 flex items-center pl-3">
              <LucideUserPlus class="h-5 w-5 mr-2" />
            </span>
            注册
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
        <!--        或使用以下方式注册-->
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
import { LucideUserPlus, LucideGithub } from 'lucide-vue-next'
import { LucideWechat, LucideQq } from '@/components/icons'
import {captcha, register_email, send_email, send_email_verify} from "~/utils/api";

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const code = ref('')
definePageMeta({
  middleware: ['no-login']
})
const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      Message.warning('两次密码输入不一致')
      return
    }

    const res:any = await register_email({
      username: username.value,
      email: email.value,
      password: password.value,
      code: code.value
    })
    if (res.code == 20000) {
      Message.success('注册成功')
      // 注册成功后跳转到登录页
      router.push('/auth/login')
    }

  } catch (error) {
    console.error('注册失败：', error)
  }
}

const captcha_image = ref('')
const captcha_key = ref('')
const getCaptcha = async () => {
  const res:any = await captcha()
  captcha_image.value = res.data.captcha_image
  captcha_key.value = res.data.captcha_id
}
await getCaptcha()

const codeDialog = ref(false)
const sendCodeDialog = () => {
  if (!email.value) {
    Message.warning('请输入邮箱地址')
    return
  }
  codeDialog.value = true
}

const codeImage = ref('')
const sendCodeVerify = async () => {
  if (!codeImage.value) {
    Message.warning('请输入验证码')
    return
  }
  try {
    const res:any = await send_email_verify({
      email: email.value,
      captcha_key: captcha_key.value,
      captcha_code: codeImage.value
    })
    if (res.code == 20000) {
      codeDialog.value = false
      sendCode()
    }
  } catch (error) {
    codeDialog.value = true
  }
}

// 发送验证码
const sendCodeText = ref('发送验证码')
const sendCodeLoading = ref(false)
const sendCodeDisabled = ref(false)
const sendCode = async () => {
  if (!email.value) {
    Message.warning('请输入邮箱地址')
    return
  }
  try {
    sendCodeLoading.value = true
    const res:any = await send_email({
      email: email.value
    })
    if (res.code == 20000) {
      Message.success('验证码发送成功')
      let count = 60
      sendCodeText.value = `${count} 秒后重新发送`
      sendCodeDisabled.value = true
      const timer = setInterval(() => {
        count--
        sendCodeText.value = `${count} 秒后重新发送`
        if (count <= 0) {
          clearInterval(timer)
          sendCodeText.value = '发送验证码'
          sendCodeDisabled.value = false
          sendCodeLoading.value = false
        }
      }, 1000)
    } else {
      Message.error(res.message)
    }
  } catch (error) {
    console.error('发送验证码失败：', error)
    sendCodeDisabled.value = false
    sendCodeLoading.value = false
  }
}


</script> 