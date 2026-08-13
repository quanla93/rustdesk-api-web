<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">
        <img src="@/assets/logo.png" alt="logo" />
        RustDesk
      </h1>
      <p class="auth-subtitle">RustDesk Console</p>

      <el-form v-if="!disablePwd" label-position="top" class="auth-form">
        <el-form-item>
          <el-input v-model="form.username" type="username" :placeholder="T('Username')" class="auth-input">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.password" type="password" @keyup.enter.native="login" show-password
                    :placeholder="T('Password')" class="auth-input">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="captchaCode">
          <el-input v-model="form.captcha" @keyup.enter.native="login" :placeholder="T('Captcha')" class="auth-input captcha-input">
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
            <template #append>
              <img :src="captchaCode.b64" @click="loadCaptcha" class="captcha" alt="captcha"/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <div class="auth-button-stack">
            <el-button @click="login" type="primary">{{ T('Login') }}</el-button>
            <el-button v-if="allowRegister" @click="register">{{ T('Register') }}</el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="auth-divider" v-if="options.length > 0 && !disablePwd">
        <span>{{ T('or login in with') }}</span>
      </div>

      <div class="auth-provider-list">
        <div v-for="(option, index) in options" :key="index">
          <el-button @click="handleOIDCLogin(option.name)" class="auth-provider-button">
            <img :src="getProviderImage(option.name)" alt="provider" class="auth-provider-icon"/>
            <span>{{ T(option.name) }}</span>
          </el-button>
        </div>
      </div>

      <div class="auth-footer">
        <a href="https://rustdesk.com" target="_blank" rel="noopener noreferrer">
          <el-icon style="vertical-align: middle; margin-right: 4px"><Monitor /></el-icon>
          rustdesk.com
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted, ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { ElMessage } from 'element-plus'
  import { T } from '@/utils/i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { loginOptions, captcha } from '@/api/login'
  import { getCode, removeCode } from '@/utils/auth'
  import { User, Lock, Key, Monitor } from '@element-plus/icons-vue'

  const oauthInfo = ref({})
  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()
  const options = reactive([]) // 存储 OIDC 登录选项

  let platform = window.navigator.platform
  if (navigator.platform.indexOf('Mac') === 0) {
    platform = 'mac'
  } else if (navigator.platform.indexOf('Win') === 0) {
    platform = 'windows'
  } else if (navigator.platform.indexOf('Linux armv') === 0) {
    platform = 'android'
  } else if (navigator.platform.indexOf('Linux') === 0) {
    platform = 'linux'
  }
  const userAgent = navigator.userAgent
  let browser = 'Unknown Browser'
  if (/chrome|crios/i.test(userAgent)) browser = 'Chrome'
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox'
  else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari'
  else if (/edg/i.test(userAgent)) browser = 'Edge'

  const form = reactive({
    username: '',
    password: '',
    platform: platform,
    captcha: '',
    captcha_id: ''
  })

  const captchaCode = ref('')
  const redirect = route.query?.redirect
  const login = async () => {
    const res = await userStore.login(form).catch(e => e)
    if (!res.code) {
      ElMessage.success(T('LoginSuccess'))
      router.push({ path: redirect || '/', replace: true })
      return
    }
    if (res.code === 110) {
      // need captcha
      loadCaptcha()
    }
  }

  const loadCaptcha = async () => {
    const captchaRes = await captcha().catch(_ => false)
    console.log(captchaRes)
    captchaCode.value = captchaRes.data.captcha
    form.captcha_id = captchaRes.data.captcha.id
  }

  const handleOIDCLogin = (provider) => {
    userStore.oidc(provider, platform, browser)
  }

  import googleImage from '@/assets/google.png'
  import githubImage from '@/assets/github.png'
  import oidcImage from '@/assets/oidc.png'
  import webauthImage from '@/assets/webauth.png'
  import defaultImage from '@/assets/oidc.png'

  const providerImageMap = {
    google: googleImage,
    github: githubImage,
    oidc: oidcImage,
    // WebAuth: webauthImage,
    default: defaultImage,
  }

  const getProviderImage = (provider) => {
    return providerImageMap[provider.toLowerCase()] || providerImageMap.default
  }

  const allowRegister = ref(false)
  const disablePwd = ref(false)
  const loadLoginOptions = async () => {
    try {
      const res = await loginOptions().catch(_ => false)
      if (!res || !res.data) return console.error('No valid response received')
      res.data.ops.map(option => (options.push({ name: option }))) // 创建新的对象数组
      if (res.data.auto_oidc) {
        // 如果有自动OIDC登录选项，直接调用第一个
        handleOIDCLogin(res.data.ops[0])
      }
      disablePwd.value = res.data.disable_pwd
      allowRegister.value = res.data.register
      if (res.data.need_captcha) {
        loadCaptcha()
      }
    } catch (error) {
      console.error('Error loading login options:', error.message)
    }
  }

  onMounted(async () => {
    const code = getCode()
    if (code) {
      // 如果code存在，进行query获取user info
      const res = await userStore.query(code)
      if (res) {
        // 删除code，确保跳转之前对code进行清楚
        removeCode()
        ElMessage.success(T('LoginSuccess'))
        router.push({ path: redirect || '/', replace: true })
      }
    } else {
      // 如果code不存在, 现实登陆页面
      loadLoginOptions() // 组件挂载后调用登录选项加载函数
    }
  })

  const register = () => {
    router.push('/register')
  }
</script>

<style scoped lang="scss">
.captcha-input {
  :deep(.el-input-group__append) {
    border-radius: 0 var(--app-radius-sm) var(--app-radius-sm) 0;
    padding: 0;
    overflow: hidden;
    border-color: rgba(148, 163, 184, 0.24);
    background: transparent;
  }

  .captcha {
    cursor: pointer;
    width: 150px;
    height: 42px;
    object-fit: cover;
  }
}
</style>
