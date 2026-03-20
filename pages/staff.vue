<script setup>
import { ref, computed } from 'vue'
import { X, User, Target, Check, Coffee, ShoppingBag, CupSoda, Utensils, ShieldCheck, ArrowRight } from 'lucide-vue-next'

const { data: user, refresh } = await useFetch('/api/user')

const rewards = [
  { id: 1, name: '免费咖啡', cost: '50 积分', icon: Coffee },
  { id: 2, name: '新鲜松饼', cost: '75 积分', icon: ShoppingBag },
  { id: 3, name: '环保保温杯', cost: '150 积分', icon: CupSoda },
  { id: 4, name: '午餐套餐', cost: '200 积分', icon: Utensils, insufficient: true }
]

const selectedReward = ref(1)

const selectReward = (id, insufficient) => {
  if (insufficient) return
  selectedReward.value = id
}

const isRedeeming = ref(false)
const redeemReward = async () => {
  const reward = rewards.find(r => r.id === selectedReward.value)
  if (!reward || isRedeeming.value) return
  
  const costNumber = parseInt(reward.cost)
  if ((user.value?.points ?? 0) < costNumber) {
    alert('积分不足！')
    return
  }

  isRedeeming.value = true
  try {
    await $fetch('/api/redeem', {
      method: 'POST',
      body: { cost: costNumber }
    })
    alert(`成功兑换 ${reward.name}，扣除 ${costNumber} 积分！`)
    await refresh()
  } catch (err) {
    alert(err.message || '兑换失败')
  } finally {
    isRedeeming.value = false
  }
}
</script>

<template>
  <div class="screen staff-theme active">
    <header class="staff-header">
      <button class="icon-btn" @click="navigateTo('/')"><X /></button>
      <h1>Lumina 奖励</h1>
      <span class="staff-badge">员工后台</span>
    </header>
    
    <main class="staff-content">
      <div class="user-profile-card slide-up">
        <div class="user-avatar">
          <User />
          <div class="status-dot"></div>
        </div>
        <div class="user-info">
          <h2>李雷</h2>
          <div class="user-balance"><Target class="sm-icon" /> 余额: {{ user?.points ?? 0 }} 积分</div>
        </div>
      </div>

      <div class="section-header-staff slide-up" style="animation-delay: 0.1s">
        <h3>选择奖励</h3>
        <span class="tap-hint">点击选择奖品</span>
      </div>

      <div class="rewards-grid slide-up" style="animation-delay: 0.2s">
        <div 
          v-for="reward in rewards" 
          :key="reward.id"
          class="reward-item"
          :class="{ selected: selectedReward === reward.id, insufficient: (user?.points || 0) < parseInt(reward.cost) }"
          @click="selectReward(reward.id, (user?.points || 0) < parseInt(reward.cost))"
        >
          <div v-if="selectedReward === reward.id" class="check-badge">
            <Check />
          </div>
          <div class="reward-icon">
            <component :is="reward.icon" />
          </div>
          <div class="reward-name">{{ reward.name }}</div>
          <div class="reward-cost" :class="{ error: reward.insufficient }">{{ reward.cost }}</div>
          <div v-if="reward.insufficient" class="insufficient-text">余额不足</div>
        </div>
      </div>

      <div class="manual-deduction slide-up" style="animation-delay: 0.3s">
        <h3>手动扣减</h3>
        <div class="input-group">
          <label>需扣减的积分</label>
          <div class="input-wrapper">
            <input type="number" placeholder="0" class="styled-input">
            <span class="input-suffix">积分</span>
          </div>
          <div class="input-hint">用于自定义奖励或部分兑换</div>
        </div>
      </div>

      <div class="staff-footer slide-up" style="animation-delay: 0.4s">
        <div class="audit-notice">
          <ShieldCheck />
          <p>仅限授权员工访问。<br>所有交易均已记录以便审计。</p>
        </div>
        <button class="primary-btn w-full" @click="redeemReward" :disabled="isRedeeming">
          {{ isRedeeming ? '处理中...' : '确认兑换' }} <ArrowRight />
        </button>
      </div>
    </main>
  </div>
</template>
