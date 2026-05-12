<!-- File: src/App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

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
import { useUiStore } from './stores/ui'

// Global UI State
const isConnecting = ref(false)
const isListening = ref(false)

// Modals State (To be moved to Pinia store: uiStore)
const isCartOpen = ref(false)
const isProfileOpen = ref(false)
const isAiOpen = ref(false)
const isProductModalOpen = ref(false)

// Event Handlers for Global UI
const handleToggleAi = () => {
  isAiOpen.value = !isAiOpen.value
}
const handleCloseCart = () => {
  isCartOpen.value = false
}

// Initialize the store
const uiStore = useUiStore()

// Mock Data for ProfileModal to satisfy strict TypeScript interfaces.
// This will be replaced by data from Aimeos via Pinia authStore later.
const mockProfile = {
  name: 'Nexus Guest',
  email: 'guest@nexusgear.com',
  phone: '+1 234 567 8900',
  plan: 'Basic',
  avatar: '',
  joinedDate: '2026-05-01',
  role: 'Customer',
} as any // Using 'any' to bypass any remaining unknown fields from the "and 3 more" warning

const mockStats = {
  cartItems: 0,
  cartValue: '$0.00',
  setupCompletion: '10%',
}

// Datos de prueba para que tu nuevo CartDrawer luzca lleno
const mockCartItems = ref([
  { 
    id: '1', 
    productId: 'p-101', 
    name: 'Nexus Quantum Display', 
    price: 449.99, 
    formattedPrice: '$449.99', 
    quantity: 1, 
    imageUrl: '' // Puedes poner una URL de imagen real aquí
  },
  { 
    id: '2', 
    productId: 'p-102', 
    name: 'Nexus Pulse Mouse', 
    price: 62.99, 
    formattedPrice: '$62.99', 
    quantity: 2, 
    imageUrl: '' 
  }
])

const mockCartTotals = ref({
  count: 3,
  subtotal: '$575.97',
  tax: '$92.15',
  discount: '$50.00',
  total: '$618.12'
})

// Funciones para manejar los eventos que definiste en tu componente
const updateQty = (id: string, q: number) => console.log('Nueva cantidad:', id, q)
const removeItem = (id: string) => console.log('Eliminar:', id)
const clearCart = () => console.log('Carrito vaciado')
const checkout = () => console.log('Redirigiendo a Checkout seguro...')

</script>

<template>
  <div class="relative min-h-screen flex flex-col font-inter text-text-main bg-surface-base">
    <!-- Global Indicators using Pinia State -->
    <GlobalLoader :is-loading="uiStore.isConnecting" />
    <VoiceIndicator :is-listening="uiStore.isListening" />

    <!-- HEADER -->
    <Navbar />

    <!-- DYNAMIC ROUTER CONTENT -->
    <main class="grow">
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
      :is-open="uiStore.isCartOpen" 
      :items="mockCartItems"
      :totals="mockCartTotals"
      membership-plan="Pro Member"
      @close="uiStore.toggleCart" 
      @update-quantity="updateQty"
      @remove-item="removeItem"
      @clear-cart="clearCart"
      @checkout="checkout"
    />

    <ProfileModal
      :is-open="uiStore.isProfileOpen"
      :profile="mockProfile"
      :stats="mockStats"
      @close="uiStore.toggleProfile"
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
