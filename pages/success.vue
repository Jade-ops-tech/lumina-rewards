<script setup>
import { Menu, Check, Sparkles, Calendar, Zap, ArrowRight } from 'lucide-vue-next'
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div class="screen success-theme active">
    <header class="minimal-header">
      <button class="icon-btn"><Menu /></button>
      <h1>Lumina 奖励</h1>
      <div style="width: 24px;"></div>
    </header>
    <main class="center-content align-center">
      <div class="success-icon-large pulse-animation">
        <Check class="success-color" :stroke-width="3" />
      </div>
      <div class="success-text fade-in-up">活动扫描成功</div>
      <div class="success-points fade-in-up" style="animation-delay: 0.1s">+50</div>
      <div class="success-subtitle fade-in-up" style="animation-delay: 0.2s">积分已存入！</div>

      <div class="status-card fade-in-up" style="animation-delay: 0.3s">
        <div class="status-label">更新后的总余额</div>
        <div class="status-value">{{ user?.points ?? 0 }} <span class="pts-label">积分</span></div>
        <div class="status-progress-box">
          <Sparkles class="sm-icon" />
          <span>距离下一个奖励仅差 <strong>20 积分</strong>！</span>
        </div>
      </div>

      <div class="details-grid fade-in-up" style="animation-delay: 0.4s">
        <div class="detail-item">
          <Calendar class="detail-icon" />
          <div class="detail-contents">
            <div class="detail-lbl">日期</div>
            <div class="detail-val">2023年10月24日</div>
          </div>
        </div>
        <div class="detail-item">
          <Zap class="detail-icon" />
          <div class="detail-contents">
            <div class="detail-lbl">类型</div>
            <div class="detail-val">环保奖励</div>
          </div>
        </div>
      </div>

      <button 
        class="primary-btn mt-auto bounce-in" 
        style="animation-delay: 0.5s" 
        @click="navigateTo('/')"
      >
        返回首页 <ArrowRight />
      </button>
      <div class="footer-note fade-in">积分已自动存入您的钱包</div>
    </main>
  </div>
</template>
