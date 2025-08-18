<script setup>
import { ElButton, ElInput } from 'element-plus'
import 'element-plus/dist/index.css'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const password = ref('')
const error = ref(false)
const API_BASE = `${window.location.protocol}//${window.location.hostname}:8888`
const router = useRouter()

async function login() {
  error.value = false
  try {
    const res = await fetch(`${API_BASE}/weblogin/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })
    const data = await res.json()
    if (data.success) {
      localStorage.setItem('cookie', data.cookie)
      router.push('/dirishere')
    } else {
      error.value = true
    }
  } catch (e) {
    error.value = true
  }
}
</script>

<template>
<div>
  <h2>登录</h2>
  <el-input
    v-model="password"
    placeholder="请输入密码"
    show-password
    style="width: 300px; margin-bottom: 24px;"
  />
  <el-button type="primary" @click="login">登录</el-button>
  <div v-if="error" style="color: red; margin-top: 10px;">密码错误，请重试。</div>
</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
