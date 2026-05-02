<!-- File: src/App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import './assets/css/style.css'

// Layout & UI (Global Components only)
import Navbar from './components/layout/Navbar.vue'
import FooterSection from './components/layout/FooterSection.vue'
import GlobalLoader from './components/ui/GlobalLoader.vue'
import VoiceIndicator from './components/ui/VoiceIndicator.vue'

// Overlays & Modals
import ProductModal from './components/products/ProductModal.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
import AiAssistantWidget from './components/ai/AiAssistantWidget.vue'
import ProfileModal from './components/profile/ProfileModal.vue'

// Global UI State
const isConnecting = ref(false)
const isListening = ref(false)

// Modals State (To be moved to Pinia store: uiStore)
const isCartOpen = ref(false)
const isProfileOpen = ref(false)
const isAiOpen = ref(false)
const isProductModalOpen = ref(false)

// Event Handlers for Global UI
const handleToggleAi = () => { isAiOpen.value = !isAiOpen.value }
const handleCloseCart = () => { isCartOpen.value = false }
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- HEADER -->
    <Navbar />

    <!-- DYNAMIC ROUTER CONTENT -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- FOOTER -->
    <FooterSection />

    <!-- GLOBAL OVERLAYS & MODALS -->
    <ProductModal 
      :is-open="isProductModalOpen" 
      :product="null" 
      @close="isProductModalOpen = false" 
    />

    <CartDrawer 
      :is-open="isCartOpen"
      :items="[]"
      :totals="{ count: 0, subtotal: '$0', tax: '$0', discount: '$0', total: '$0' }"
      membership-plan="pro"
      @close="handleCloseCart"
    />

    <ProfileModal 
      :is-open="isProfileOpen"
      :profile="{}"
      :stats="{}"
      @close="isProfileOpen = false"
    />

    <AiAssistantWidget 
      :is-open="isAiOpen"
      :is-listening="isListening"
      :messages="[]"
      @toggle="handleToggleAi"
      @close="isAiOpen = false"
    />

    <VoiceIndicator :is-listening="isListening" />
    <GlobalLoader :is-loading="isConnecting" />
  </div>
</template>