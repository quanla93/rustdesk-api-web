<template>
  <div class="auth-page">
    <div class="auth-card">
      <img src="@/assets/logo.png" alt="logo" class="auth-logo"/>
      <h1 class="auth-title">{{ T('Register') }}</h1>
      <p class="auth-subtitle">Create an account for RustDesk API Admin access.</p>

      <el-form ref="f" :model="form" label-position="top" class="auth-form" :rules="rules">
        <el-form-item :label="T('Username')" prop="username">
          <el-input v-model="form.username" class="auth-input"></el-input>
        </el-form-item>

        <el-form-item :label="T('Email')" prop="email">
          <el-input v-model="form.email" class="auth-input"></el-input>
        </el-form-item>

        <el-form-item :label="T('Password')" prop="password">
          <el-input v-model="form.password" type="password" show-password
                    class="auth-input"></el-input>
        </el-form-item>
        <el-form-item :label="T('ConfirmPassword')" prop="confirm_password">
          <el-input v-model="form.confirm_password" type="password" @keyup.enter.native="submit" show-password
                    class="auth-input"></el-input>
        </el-form-item>
        <el-form-item label="">
          <div class="auth-button-stack">
            <el-button @click="submit" type="primary">{{ T('Submit') }}</el-button>
            <el-button @click="toLogin">{{ T('ToLogin') }}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { T } from '@/utils/i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { register } from '@/api/user'
  import { useUserStore } from '@/store/user'
  import { useAppStore } from '@/store/app'

  const router = useRouter()
  const userStore = useUserStore()
  const form = reactive({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const rules = {
    username: [
      { required: true, message: T('ParamRequired', { param: T('Username') }), trigger: 'blur' },
    ],
    // email: [
    //   { required: true, message: T('ParamRequired', { param: T('Email') }), trigger: 'blur' },
    // ],
    password: [
      { required: true, message: T('ParamRequired', { param: T('Password') }), trigger: 'blur' },
    ],
    confirm_password: [
      { required: true, message: T('ParamRequired', { param: T('ConfirmPassword') }), trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== form.password) {
            callback(new Error(T('PasswordNotMatchConfirmPassword')))
          } else {
            callback()
          }
        }, trigger: 'blur',
      },
    ],
  }
  const f = ref(null)
  const submit = async () => {
    const v = await f.value.validate().catch(_ => false)
    if (!v) {
      return
    }
    const res = await register(form).catch(_ => false)
    if (!res) {
      return
    }
    userStore.saveUserData(res.data)
    useAppStore().loadConfig()
    ElMessage.success('Submit')
    router.push('/')
  }
  const toLogin = () => {
    router.push('/login')

  }
</script>
