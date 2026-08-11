<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <img src="@/assets/logo.png" alt="logo" class="auth-logo"/>
      <h1 class="auth-title">{{ T('OauthBinding') }}</h1>
      <p class="auth-subtitle">Confirm that this third-party identity should be bound to your account.</p>
      <div class="auth-meta">
        <div class="auth-meta-row">
          <span class="auth-meta-label">{{ T('Op') }}</span>
          <span class="auth-meta-value">{{ oauthInfo.op }}</span>
        </div>
        <div class="auth-meta-row">
          <span class="auth-meta-label">{{ T('ThirdName') }}</span>
          <span class="auth-meta-value">{{ oauthInfo.third_name }}</span>
        </div>
      </div>
      <div class="auth-button-stack">
        <el-button v-if="!resStatus" type="primary" size="large" @click="toConfirm">{{ T('Bind') }}</el-button>
        <el-button size="large" @click="out">{{ T('Close') }}</el-button>
      </div>
      <p class="auth-note">{{ T('OauthCloseNote') }}</p>
    </el-card>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { info, confirm, bindConfirm } from '@/api/oauth'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { T } from '@/utils/i18n'

  const oauthInfo = ref({})
  const route = useRoute()
  const router = useRouter()
  const code = route.params?.code
  if (!code) {
    router.push('/')
  }
  const getInfo = async () => {
    const res = await info({ code }).catch(_ => false)
    if (res) {
      oauthInfo.value = res.data
    } else {
      router.push('/')
    }
  }
  getInfo()
  const resStatus = ref(0)
  const toConfirm = async () => {
    const res = await bindConfirm({ code }).catch(_ => false)
    if (res) {
      resStatus.value = 1
      if (res.data.device_type === 'webadmin') {
        ElMessage.success(T('OperationSuccess'))
        //后台登录
        router.push('/')
      } else {
        ElMessage.success(T('OperationSuccessAndCloseAfter3Seconds'))
        setTimeout(_ => {
          out()
        }, 3000)
      }

    }
  }
  const out = () => {
    window.close()
  }
</script>
