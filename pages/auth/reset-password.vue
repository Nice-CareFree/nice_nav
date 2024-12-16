<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="/logo.png" alt="Logo" class="mx-auto h-12 w-12 rounded-lg" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">重置密码</h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          记起密码了？
          <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            返回登录
          </NuxtLink>
        </p>
      </div>

      <!-- 步骤指示器 -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="relative z-0 inline-flex shadow-sm rounded-md -space-x-px">
            <button
              type="button"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-l-md focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                currentStep === 1
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              ]"
            >
              1. 验证邮箱
            </button>
            <button
              type="button"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                currentStep === 2
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              ]"
            >
              2. 重置密码
            </button>
            <button
              type="button"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-r-md focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                currentStep === 3
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              ]"
            >
              3. 完成
            </button>
          </span>
        </div>
      </div>

      <!-- 步骤1：验证邮箱 -->
      <form v-if="currentStep === 1" class="mt-8 space-y-6" @submit.prevent="handleVerifyEmail">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            邮箱地址
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="请输入注册时使用的邮箱地址"
            />
          </div>
        </div>
        <!--验证码-->
        <div class="relative">
          <label for="verificationCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            验证码
          </label>
          <div class="mt-1">
            <input
              id="verificationCode"
              v-model="verificationCode"
              name="verificationCode"
              type="text"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="请输入邮箱收到的验证码"
            />
          </div>
          <a-button type="primary"
                    @click="sendCodeDialog"
                    :loading="sendCodeLoading"
                    :disabled="sendCodeDisabled"
                    class="!rounded-md !absolute top-[25px] right-[1px] z-10"
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
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            验证进行下一步
          </button>
        </div>
      </form>

      <!-- 步骤2：重置密码 -->
      <form v-if="currentStep === 2" class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="space-y-4">
          <div>
            <label for="verificationCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              验证码
            </label>
            <div class="mt-1">
              <input
                id="verificationCode"
                v-model="verificationCode"
                name="verificationCode"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="请输入邮箱收到的验证码"
              />
            </div>
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              新密码
            </label>
            <div class="mt-1">
              <input
                id="newPassword"
                v-model="newPassword"
                name="newPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="请输入新密码"
              />
            </div>
          </div>

          <div>
            <label for="confirmNewPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              确认新密码
            </label>
            <div class="mt-1">
              <input
                id="confirmNewPassword"
                v-model="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="请再次输入新密码"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            重置密码
          </button>
        </div>
      </form>

      <!-- 步骤3：完成 -->
      <div v-if="currentStep === 3" class="mt-8 text-center">
        <div class="rounded-full bg-green-100 dark:bg-green-900 p-3 mx-auto w-16 h-16">
          <LucideCheck class="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 class="mt-4 text-xl font-medium text-gray-900 dark:text-white">密码重置成功</h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          您的密码已经重置成功，请使用新密码登录。
        </p>
        <div class="mt-6">
          <button
            type="button"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="router.push('/auth/login')"
          >
            返回登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LucideCheck } from 'lucide-vue-next'
import {captcha, reset_password, send_email, send_email_verify} from "~/utils/api";

const router = useRouter()

const currentStep = ref(1)
const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const handleVerifyEmail = async () => {
  try {
    // TODO: 实现发送验证码逻辑
    console.log('发送验证码到邮箱：', email.value)
    currentStep.value = 2
  } catch (error) {
    console.error('发送验证码失败：', error)
  }
}

const handleResetPassword = async () => {
  try {
    if (newPassword.value !== confirmNewPassword.value) {
      alert('两次输入的密码不一致')
      return
    }

    // TODO: 实现重置密码逻辑
    const res:any = await reset_password({
      email: email.value,
      code: verificationCode.value,
      password: newPassword.value
    })
    if (res.code == 20000) {
      currentStep.value = 3
      Message.success('密码重置成功')
    }
    
  } catch (error) {
    console.error('重置密码失败：', error)
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