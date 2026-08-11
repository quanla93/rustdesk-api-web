<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <img src="@/assets/logo.png" alt="logo" class="auth-logo"/>
      <h1 class="auth-title">{{ T('OauthLogining') }}</h1>
      <p class="auth-subtitle">Review this device request before authorizing access.</p>
      <div class="auth-meta">
        <div class="auth-meta-row">
          <span class="auth-meta-label">{{ T('Device') }}</span>
          <span class="auth-meta-value">{{ oauthInfo.device_name }}</span>
        </div>
        <div class="auth-meta-row">
          <span class="auth-meta-label">ID</span>
          <span class="auth-meta-value">{{ oauthInfo.id }}</span>
        </div>
      </div>
      <div class="auth-button-stack">
        <el-button v-if="!resStatus" type="primary" size="large" @click="toConfirm">{{ T('ConfirmOauth') }}</el-button>
        <el-button size="large" @click="out">{{ T('Close') }}</el-button>
      </div>
      <p class="auth-note">{{ T('OauthCloseNote') }}</p>
    </el-card>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { info, confirm } from '@/api/oauth'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { T } from '@/utils/i18n'

  const oauthInfo = ref({})
  const route = useRoute()
  const router = useRouter()
  const code = route.params?.code
  if (!code) {
    // router.push('/')
  }
  const getInfo = async () => {
    const res = await info({ code }).catch(_ => false)
    if (res) {
      oauthInfo.value = res.data
    } else {
      // router.push('/')
    }
  }
  getInfo()
  const resStatus = ref(0)
  const toConfirm = async () => {
    const res = await confirm({ code }).catch(_ => false)
    if (res) {
      resStatus.value = 1
      ElMessage.success(T('OperationSuccessAndCloseAfter3Seconds'))
      setTimeout(_ => {
        out()
      }, 3000)
    }
  }
  const out = () => {
    window.close()
  }

</script>
