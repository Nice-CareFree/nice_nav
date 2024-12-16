<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- 页面头部 -->
    <div class="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center space-x-4">
          <NuxtLink 
            to="/user"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <LucideArrowLeft class="w-5 h-5" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">个人资料</h1>
        </div>
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="container mx-auto px-4 py-6">
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 头像上传 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">头像设置</h2>
            <div class="flex items-center space-x-6">
              <div class="relative group">
                <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                  <a-upload
                      :action="actions"
                      :show-file-list="false"
                      :headers="{ 'Authorization': 'Bearer ' + token }"
                      @before-upload="beforeUpload"
                      @success="picSuccess"
                      draggable
                      accept=".png,.jpg,.jpeg"
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
              <div class="flex-1">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  用户名：{{ user_info.username }}
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  支持 jpg、png、gif 格式，文件大小不超过 2MB
                </p>
                <div class="flex items-center space-x-2">

                  <Button 
                    v-if="avatar"
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    @click="removeAvatar"
                  >
                    <LucideTrash class="w-4 h-4 mr-2" />
                    移除
                  </Button>
                </div>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onFileChange"
                />
              </div>
            </div>
          </div>

          <!-- 基本信息 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">基本信息</h2>
            <div class="space-y-4">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  用户名
                </label>
                <div class="relative">
                  <input
                    id="username"
                    v-model="form.username"
                    type="text"
                    required
                    class="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-500 dark:placeholder-gray-400 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.username }"
                    placeholder="请输入用户名"
                  />
                  <div v-if="errors.username" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LucideAlertCircle class="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <p v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  邮箱地址
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LucideMail class="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    disabled
                    required
                    class="block w-full pl-10 pr-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-500 dark:placeholder-gray-400 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
                    placeholder="请输入邮箱地址"
                  />
                  <a-button type="primary"
                            @click="sendCodeDialog"

                            class="!rounded-md !absolute top-[1px] right-[1px] z-10"
                            size="large">
                    更换邮箱地址
                  </a-button>
                  <a-modal v-model:visible="codeDialog"
                           title="更换邮箱"
                           @ok="changeEmail"
                           ok-text="更换"
                           cancel-text="取消">
                    <div class="flex flex-col gap-2">
                      <a-input v-model="email" placeholder="请输入新的邮箱地址" />
                      <div class="flex">
                        <a-input v-model="code" placeholder="请输入短信验证码" />
                        <a-button
                          type="primary"
                          :loading="sendCodeLoading"
                          :disabled="sendCodeDisabled"
                          @click="codeDialogTwo=true"
                        >
                          {{ sendCodeText }}
                        </a-button>
                      </div>
                      <a-modal v-model:visible="codeDialogTwo"
                               title="请输入验证码"
                               @ok="sendCodeVerify"
                               ok-text="确定"
                               cancel-text="取消">
                        <div class="flex">
                          <a-input v-model="codeImage" placeholder="请输入验证码" />
                          <img :src="captcha_image" @click="getCaptcha" class="cursor-pointer h-8" />
                        </div>
                      </a-modal>

                    </div>

                  </a-modal>
                  <div v-if="errors.email" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LucideAlertCircle class="w-5 h-5 text-red-500" />
                  </div>
                </div>
                <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
              </div>

              <div>
                <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  个人简介
                </label>
                <div class="relative">
                  <textarea
                    id="bio"
                    v-model="form.description"
                    rows="4"
                    class="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-500 dark:placeholder-gray-400 transition-colors resize-none"
                    :class="{ 'border-red-500 focus:ring-red-500': errors.bio }"
                    placeholder="介绍一下你自己..."
                  ></textarea>
                  <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                    {{ form.description?.length }}/200
                  </div>
                </div>
                <p v-if="errors.bio" class="mt-1 text-sm text-red-500">{{ errors.bio }}</p>
              </div>
            </div>
          </div>

          <!-- 通知设置 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">通知设置</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">邮件通知</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">接收网站更新和重要通知</p>
                </div>
                <button
                  type="button"
                  :class="[
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
                    form.emailNotification ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  ]"
                  @click="form.emailNotification = !form.emailNotification"
                >
                  <span
                    :class="[
                      'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      form.emailNotification ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  >
                    <span
                      :class="[
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                        form.emailNotification ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                      ]"
                      aria-hidden="true"
                    >
                      <LucideX class="h-3 w-3 text-gray-400" />
                    </span>
                    <span
                      :class="[
                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                        form.emailNotification ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                      ]"
                      aria-hidden="true"
                    >
                      <LucideCheck class="h-3 w-3 text-blue-600" />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- 提交按钮 -->
          <div class="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              @click="navigateTo('/user')"
            >
              取消
            </Button>
            <Button 
              type="submit"
              :loading="isSubmitting"
            >
              {{ isSubmitting ? '保存中...' : '保存修改' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  LucideArrowLeft, 
  LucideCamera, 
  LucideUpload,
  LucideTrash,
  LucideMail,
  LucideGlobe,
  LucideAlertCircle,
  LucideCheck,
  LucideX
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {captcha, change_email, get_user_info, send_email, send_email_verify, update_user_info} from "~/utils/api";

definePageMeta({
  middleware: ['in-login']
})
const token = useCookie('token')
const user_info = useCookie('user_info') as any
const fileInput = ref<HTMLInputElement | null>(null)
const avatar = ref<string | null>(null)
const isSubmitting = ref(false)
const form = ref({})

const getUser = async () => {
  const res:any = await get_user_info()
  user_info.value = res.data
  form.value = res.data
}
await getUser()

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

const errors = ref({
  username: '',
  email: '',
  description: '',
})

const handleAvatarUpload = () => {
  fileInput.value?.click()
}

const removeAvatar = () => {
  avatar.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    if (file.size > 2 * 1024 * 1024) {
      alert('文件大小不能超过 2MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      avatar.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const validateForm = () => {
  let isValid = true
  errors.value = {
    username: '',
    email: '',
    description: '',
  }

  // 用户名验证
  if (!form.value.username) {
    errors.value.username = '请输入用户名'
    isValid = false
  } else if (form.value.username.length < 2) {
    errors.value.username = '用户名至少需要2个字符'
    isValid = false
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    errors.value.email = '请输入邮箱地址'
    isValid = false
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = '请输入有效的邮箱地址'
    isValid = false
  }

  // 个人简介验证
  if (form.value.description && form.value.description.length > 200) {
    errors.value.description = '个人简介不能超过200个字符'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isSubmitting.value = true
    // TODO: 实现保存个人资料的逻辑
    const res:any = await update_user_info({
      username: form.value.username,
      description: form.value.description,
    })
    Message.success('保存成功')
    getUser()

  } catch (error) {
    console.error('保存失败：', error)
  } finally {
    isSubmitting.value = false
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
const email = ref('')
const code = ref('')
const codeDialogTwo = ref(false)
const codeDialog = ref(false)
const sendCodeDialog = () => {
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
      codeDialogTwo.value = false
      sendCode()
    }
  } catch (error) {
    codeDialogTwo.value = true
  }
}

const changeEmail = async () => {
  try {
    const res:any = await change_email({
      email: email.value,
      code: code.value
    })
    if (res.code == 20000) {
      Message.success('邮箱修改成功')
      codeDialog.value = false
      getUser()
    }
  } catch (error) {
    console.error('邮箱修改失败：', error)
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