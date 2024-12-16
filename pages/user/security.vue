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
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">安全设置</h1>
        </div>
      </div>
    </div>

    <!-- 设置内容 -->
    <div class="container mx-auto px-4 py-6">
      <div class="max-w-2xl mx-auto space-y-6">
        <!-- 密码修改 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-medium text-gray-900 dark:text-white">密码修改</h2>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">定期更换密码可以提高账号安全性</p>
            </div>
            <Button 
              variant="outline"
              size="sm"
              @click="showPasswordForm = !showPasswordForm"
            >
              <LucideKey class="w-4 h-4 mr-2" />
              修改密码
            </Button>
          </div>

          <!-- 修改密码表单 -->
          <form  @submit.prevent="handlePasswordChange" class="space-y-4">
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                当前密码
              </label>
              <div class="relative">
                <input
                  id="currentPassword"
                  v-model="passwordForm.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  required
                  class="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-500 dark:placeholder-gray-400 transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.currentPassword }"
                  placeholder="请输入当前密码"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <LucideEye v-if="showCurrentPassword" class="w-5 h-5 text-gray-400" />
                  <LucideEyeOff v-else class="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p v-if="errors.currentPassword" class="mt-1 text-sm text-red-500">{{ errors.currentPassword }}</p>
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                新密码
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="passwordForm.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  class="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-500 dark:placeholder-gray-400 transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.newPassword }"
                  placeholder="请输入新密码"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  @click="showNewPassword = !showNewPassword"
                >
                  <LucideEye v-if="showNewPassword" class="w-5 h-5 text-gray-400" />
                  <LucideEyeOff v-else class="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p v-if="errors.newPassword" class="mt-1 text-sm text-red-500">{{ errors.newPassword }}</p>
              <!-- 密码强度指示器 -->
              <div v-if="passwordForm.newPassword" class="mt-2">
                <div class="flex items-center space-x-2">
                  <div class="text-xs text-gray-500 dark:text-gray-400">密码强度：</div>
                  <div class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      class="h-full transition-all duration-300"
                      :class="[
                        passwordStrength === 'weak' ? 'w-1/3 bg-red-500' :
                        passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' :
                        'w-full bg-green-500'
                      ]"
                    ></div>
                  </div>
                  <div class="text-xs" :class="[
                    passwordStrength === 'weak' ? 'text-red-500' :
                    passwordStrength === 'medium' ? 'text-yellow-500' :
                    'text-green-500'
                  ]">
                    {{ passwordStrength === 'weak' ? '弱' :
                       passwordStrength === 'medium' ? '中' : '强'
                    }}
                  </div>
                </div>
                <ul class="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <li class="flex items-center">
                    <LucideCheck 
                      class="w-3 h-3 mr-1"
                      :class="hasMinLength ? 'text-green-500' : 'text-gray-400'"
                    />
                    至少8个字符
                  </li>
                  <li class="flex items-center">
                    <LucideCheck 
                      class="w-3 h-3 mr-1"
                      :class="hasNumber ? 'text-green-500' : 'text-gray-400'"
                    />
                    包含数字
                  </li>
                  <li class="flex items-center">
                    <LucideCheck 
                      class="w-3 h-3 mr-1"
                      :class="hasLetter ? 'text-green-500' : 'text-gray-400'"
                    />
                    包含字母
                  </li>
                  <li class="flex items-center">
                    <LucideCheck 
                      class="w-3 h-3 mr-1"
                      :class="hasSpecialChar ? 'text-green-500' : 'text-gray-400'"
                    />
                    包含特殊字符
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                确认新密码
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="passwordForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="block w-full px-4 py-2.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-500 dark:placeholder-gray-400 transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.confirmPassword }"
                  placeholder="请再次输入新密码"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <LucideEye v-if="showConfirmPassword" class="w-5 h-5 text-gray-400" />
                  <LucideEyeOff v-else class="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500">{{ errors.confirmPassword }}</p>
            </div>

            <div class="flex justify-end space-x-4 mt-6">
              <Button 
                type="submit"
                :loading="isSubmitting"
              >
                {{ isSubmitting ? '保存中...' : '保存修改' }}
              </Button>
            </div>
          </form>
        </div>

        <!-- 安全验证 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">安全验证</h2>
          
          <!-- 邮箱验证 -->
          <div class="flex items-center justify-between py-4 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <LucideMail class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">邮箱验证</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ securityInfo.email || '未绑定邮箱' }}
                </p>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              @click="$router.push('/user/profile')"
            >
              {{ securityInfo.email ? '修改' : '绑定' }}
            </Button>
          </div>

          <!--&lt;!&ndash; 手机验证 &ndash;&gt;-->
          <!--<div class="flex items-center justify-between py-4 border-b dark:border-gray-700">-->
          <!--  <div class="flex items-center space-x-3">-->
          <!--    <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">-->
          <!--      <LucideSmartphone class="w-5 h-5 text-green-600 dark:text-green-400" />-->
          <!--    </div>-->
          <!--    <div>-->
          <!--      <h3 class="text-sm font-medium text-gray-900 dark:text-white">手机验证</h3>-->
          <!--      <p class="text-sm text-gray-500 dark:text-gray-400">-->
          <!--        {{ securityInfo.phone ? `${securityInfo.phone.slice(0, 3)}****${securityInfo.phone.slice(-4)}` : '未绑定手机' }}-->
          <!--      </p>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--  <Button -->
          <!--    variant="outline"-->
          <!--    size="sm"-->
          <!--  >-->
          <!--    {{ securityInfo.phone ? '修改' : '绑定' }}-->
          <!--  </Button>-->
          <!--</div>-->

          <!--&lt;!&ndash; 两步验证 &ndash;&gt;-->
          <!--<div class="flex items-center justify-between py-4">-->
          <!--  <div class="flex items-center space-x-3">-->
          <!--    <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">-->
          <!--      <LucideShieldCheck class="w-5 h-5 text-purple-600 dark:text-purple-400" />-->
          <!--    </div>-->
          <!--    <div>-->
          <!--      <h3 class="text-sm font-medium text-gray-900 dark:text-white">两步验证</h3>-->
          <!--      <p class="text-sm text-gray-500 dark:text-gray-400">-->
          <!--        {{ securityInfo.twoFactor ? '已开启' : '未开启' }}-->
          <!--      </p>-->
          <!--    </div>-->
          <!--  </div>-->
          <!--  <Button -->
          <!--    variant="outline"-->
          <!--    size="sm"-->
          <!--  >-->
          <!--    {{ securityInfo.twoFactor ? '关闭' : '开启' }}-->
          <!--  </Button>-->
          <!--</div>-->
        </div>

        <!-- 登录记录 -->
        <!--<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">-->
        <!--  <div class="flex items-center justify-between mb-6">-->
        <!--    <div>-->
        <!--      <h2 class="text-lg font-medium text-gray-900 dark:text-white">登录记录</h2>-->
        <!--      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">最近30天的登录记录</p>-->
        <!--    </div>-->
        <!--    <Button -->
        <!--      variant="ghost"-->
        <!--      size="sm"-->
        <!--    >-->
        <!--      <LucideRefreshCw class="w-4 h-4 mr-2" />-->
        <!--      刷新-->
        <!--    </Button>-->
        <!--  </div>-->

        <!--  <div class="space-y-4">-->
        <!--    <div v-for="record in loginRecords" :key="record.id" class="flex items-start justify-between">-->
        <!--      <div class="flex items-start space-x-3">-->
        <!--        <div class="mt-1">-->
        <!--          <LucideMonitor v-if="record.device === 'desktop'" class="w-5 h-5 text-gray-400" />-->
        <!--          <LucideSmartphone v-else class="w-5 h-5 text-gray-400" />-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <div class="text-sm font-medium text-gray-900 dark:text-white">-->
        <!--            {{ record.location }}-->
        <!--          </div>-->
        <!--          <div class="text-sm text-gray-500 dark:text-gray-400">-->
        <!--            {{ record.browser }} · {{ record.device === 'desktop' ? '电脑' : '手机' }}-->
        <!--          </div>-->
        <!--          <div class="mt-1 text-xs text-gray-400">-->
        <!--            {{ record.time }}-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="text-xs text-gray-400">-->
        <!--        {{ record.ip }}-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  LucideArrowLeft,
  LucideKey,
  LucideEye,
  LucideEyeOff,
  LucideCheck,
  LucideMail,
  LucideSmartphone,
  LucideShieldCheck,
  LucideMonitor,
  LucideRefreshCw
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {change_password, get_user_info} from "~/utils/api";

definePageMeta({
  middleware: ['in-login']
})
// 密码修改表单
const showPasswordForm = ref(false)
const isSubmitting = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const token = useCookie('token')
const user_info = useCookie('user_info') as any
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})



// 密码强度检查
const hasMinLength = computed(() => passwordForm.value.newPassword.length >= 8)
const hasNumber = computed(() => /\d/.test(passwordForm.value.newPassword))
const hasLetter = computed(() => /[a-zA-Z]/.test(passwordForm.value.newPassword))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.value.newPassword))

const passwordStrength = computed(() => {
  const score = [hasMinLength.value, hasNumber.value, hasLetter.value, hasSpecialChar.value]
    .filter(Boolean).length
  if (score <= 2) return 'weak'
  if (score === 3) return 'medium'
  return 'strong'
})

// 安全信息
const securityInfo = ref({
  email: '',
  phone: '13800138000',
  twoFactor: false
})

const getUser = async () => {
  const res:any = await get_user_info()
  user_info.value = res.data
  securityInfo.value.email = res.data.email
}
await getUser()

// 登录记录
const loginRecords = ref([
  {
    id: 1,
    device: 'desktop',
    browser: 'Chrome',
    location: '中国，广东省，深圳市',
    ip: '192.168.1.1',
    time: '2024-01-15 14:30:00'
  },
  {
    id: 2,
    device: 'mobile',
    browser: 'Safari',
    location: '中国，广东省，广州市',
    ip: '192.168.1.2',
    time: '2024-01-14 10:15:00'
  },
  {
    id: 3,
    device: 'desktop',
    browser: 'Firefox',
    location: '中国，广东省，深圳市',
    ip: '192.168.1.3',
    time: '2024-01-13 18:45:00'
  }
])

// 表单验证
const validatePasswordForm = () => {
  let isValid = true
  errors.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  if (!passwordForm.value.currentPassword) {
    errors.value.currentPassword = '请输入当前密码'
    isValid = false
  }

  if (!passwordForm.value.newPassword) {
    errors.value.newPassword = '请输入新密码'
    isValid = false
  } else if (passwordForm.value.newPassword.length < 8) {
    errors.value.newPassword = '密码长度至少为8个字符'
    isValid = false
  } else if (passwordForm.value.newPassword === passwordForm.value.currentPassword) {
    errors.value.newPassword = '新密码不能与当前密码相同'
    isValid = false
  }

  if (!passwordForm.value.confirmPassword) {
    errors.value.confirmPassword = '请确认新密码'
    isValid = false
  } else if (passwordForm.value.confirmPassword !== passwordForm.value.newPassword) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    isValid = false
  }

  return isValid
}

// 提交密码修改
const handlePasswordChange = async () => {
  if (!validatePasswordForm()) return

  try {
    isSubmitting.value = true
    // TODO: 实现密码修改逻辑
    const res:any = await change_password({
      current_password: passwordForm.value.currentPassword,
      new_password: passwordForm.value.newPassword,
      confirm_password: passwordForm.value.confirmPassword
    })
    if (res.code === 20000) {
      // 重置表单
      showPasswordForm.value = false
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  } catch (error) {
    console.error('修改失败：', error)
  } finally {
    isSubmitting.value = false
  }
}
</script> 