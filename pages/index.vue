<script setup>
import { Menu, Bell, Sparkles, QrCode, ChevronRight, Gift, Zap, ShoppingBag, Leaf, Coffee } from 'lucide-vue-next'
const { data: user } = await useFetch('/api/user')
</script>

<template>
  <div class="screen active">
    <!-- Home Dashboard -->
    <header>
      <button class="icon-btn"><Menu /></button>
      <h1>Lumina 奖励</h1>
      <button class="icon-btn"><Bell /></button>
    </header>
    
    <main>
      <!-- Points Card -->
      <div class="points-card bounce-in">
        <div class="card-label">当前积分</div>
        <div class="card-value">{{ user?.points ?? 0 }} <span class="lum-label">LUM</span></div>
        <div class="card-badge">
          <Sparkles class="sm-icon" /> 等级：白银会员
        </div>
      </div>

      <!-- Primary Action -->
      <button 
        class="primary-action-btn slide-up" 
        style="animation-delay: 0.1s" 
        @click="navigateTo('/qr')"
      >
        <div class="btn-icon"><QrCode /></div>
        <div class="btn-text">
          <div class="btn-title">扫码获取积分</div>
          <div class="btn-subtitle">在Lumina网点即刻赚取积分</div>
        </div>
        <ChevronRight class="chevron" />
      </button>

      <!-- Stats Summary -->
      <div class="stats-grid slide-up" style="animation-delay: 0.2s">
        <div class="stat-card">
          <Gift class="stat-icon blue" />
          <div class="stat-info">
            <div class="stat-label">可用福利</div>
            <div class="stat-value">4 个奖励</div>
          </div>
        </div>
        <div class="stat-card">
          <Zap class="stat-icon green" />
          <div class="stat-info">
            <div class="stat-label">本周获取</div>
            <div class="stat-value">+45 积分</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="section-header slide-up" style="animation-delay: 0.3s">
        <h2>近期活动</h2>
        <a href="#" class="view-all">查看全部</a>
      </div>
      <div class="activity-list slide-up" style="animation-delay: 0.4s">
        <div class="activity-item">
          <div class="activity-icon"><ShoppingBag /></div>
          <div class="activity-details">
            <div class="activity-title">市中心精品店</div>
            <div class="activity-date">10月24日 • 消费奖励</div>
          </div>
          <div class="activity-points success">+15</div>
        </div>
        <div class="activity-item">
          <div class="activity-icon"><Leaf /></div>
          <div class="activity-details">
            <div class="activity-title">环保挑战奖励</div>
            <div class="activity-date">10月22日 • 特别活动</div>
          </div>
          <div class="activity-points success">+25</div>
        </div>
        <div class="activity-item">
          <div class="activity-icon"><Coffee /></div>
          <div class="activity-details">
            <div class="activity-title">天际咖啡馆</div>
            <div class="activity-date">10月20日 • 午餐促销</div>
          </div>
          <div class="activity-points success">+10</div>
        </div>
      </div>

      <!-- Promo Banner -->
      <div class="promo-banner slide-up" style="animation-delay: 0.5s">
        <div class="promo-content">
          <div class="promo-badge">限时优惠</div>
          <h3 class="promo-title">周末餐饮双倍积分</h3>
          <button class="promo-btn">探索门店</button>
        </div>
        <div class="promo-bg-decoration"></div>
      </div>
    </main>
  </div>
</template>
