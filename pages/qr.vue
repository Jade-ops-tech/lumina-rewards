<script setup>
import { X, Star, RefreshCw, TrendingUp, ArrowLeft, Database } from 'lucide-vue-next'

const countdown = ref(45)
const { data: user } = await useFetch('/api/user')
const isScanning = ref(false)

const simulateScan = async () => {
  if (isScanning.value) return
  isScanning.value = true
  try {
    await $fetch('/api/scan', { method: 'POST' })
    navigateTo('/success')
  } catch (err) {
    console.error(err)
    isScanning.value = false
  }
}
let countdownInterval

onMounted(() => {
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) countdown.value = 45
  }, 1000)
})

onUnmounted(() => {
  clearInterval(countdownInterval)
})
</script>

<template>
  <div class="screen qr-theme active">
    <header class="minimal-header">
      <button class="icon-btn" @click="navigateTo('/')"><X /></button>
      <h1>Lumina 奖励</h1>
      <div style="width: 24px;"></div>
    </header>
    <main class="qr-content align-center">
      <h2 class="qr-title fade-in-up">我的会员码</h2>
      <p class="qr-subtitle fade-in-up" style="animation-delay: 0.1s">向工作人员出示此二维码兑换积分</p>

      <div class="qr-container bounce-in" style="animation-delay: 0.2s">
        <div class="qr-code-placeholder">
          <!-- In a real app, this would be an actual QR code image -->
          <div class="qr-corner top-left"></div>
          <div class="qr-corner top-right"></div>
          <div class="qr-corner bottom-left"></div>
          <div class="qr-corner bottom-right"></div>
          <div class="qr-center-icon-wrapper">
            <Star class="qr-center-icon" />
          </div>
        </div>
      </div>
      
      <div class="refresh-badge fade-in-up" style="animation-delay: 0.3s">
        <RefreshCw class="sm-icon spin-slow" /> 刷新倒计时 <span>{{ countdown }}</span>秒
      </div>

      <button 
        class="primary-action-btn slide-up mt-auto" 
        style="animation-delay: 0.35s; width: 100%; justify-content: center; margin-bottom: 12px; border-color: var(--primary);" 
        @click="simulateScan"
      >
        <Database class="btn-icon" style="background-color: var(--primary); color: white; width: 32px; height: 32px;" />
        <span style="font-weight: 600;">模拟店员扫码 (+50分)</span>
      </button>

      <div class="balance-pill slide-up" style="animation-delay: 0.4s">
        <div class="balance-info">
          <div class="balance-lbl">总余额</div>
          <div class="balance-val">{{ user?.points ?? 0 }} <span class="pts-label">积分</span></div>
        </div>
        <div class="balance-chart">
          <TrendingUp class="sm-icon" /> 实时同步
        </div>
      </div>

      <button 
        class="text-link mt-auto fade-in-up" 
        style="animation-delay: 0.5s" 
        @click="navigateTo('/')"
      >
        <ArrowLeft /> 返回首页
      </button>
    </main>
  </div>
</template>
