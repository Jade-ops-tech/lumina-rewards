<script setup>
import { Home, Scan, User } from 'lucide-vue-next'

useHead({
  title: 'Lumina Rewards',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

const route = useRoute()

const navigateToPage = (screen) => {
  navigateTo(`/${screen === 'home' ? '' : screen}`)
}
</script>

<template>
  <div id="device-mockup">
    <div id="app-container">
      <NuxtPage />

    <!-- Bottom Navigation -->
    <nav class="bottom-nav" v-if="['/', '/success', '/staff'].includes(route.path)">
      <div 
        class="nav-item" 
        :class="{ active: route.path === '/' || route.path === '/success' }"
        @click="navigateToPage('home')"
      >
        <div class="nav-icon-wrapper"><Home /></div>
        <span>首页</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: route.path === '/qr' }"
        @click="navigateToPage('qr')"
      >
        <div class="nav-icon-wrapper"><Scan /></div>
        <span>扫码</span>
      </div>
      <div 
        class="nav-item" 
        :class="{ active: route.path === '/staff' }"
        @click="navigateToPage('staff')"
      >
        <div class="nav-icon-wrapper"><User /></div>
        <span>我的</span>
      </div>
      </nav>
    </div>
  </div>
</template>
