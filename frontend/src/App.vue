<script setup lang="ts">
// ==========================================
// 1. VUE IMPORTS
// ==========================================
import { ref } from 'vue'

// ==========================================
// 2. STYLES
// ==========================================
import './assets/css/style.css'

// ==========================================
// 3. COMPONENT & TYPE IMPORTS
// ==========================================
// Layout & UI
import Navbar from './components/layout/Navbar.vue'
import FooterSection from './components/layout/FooterSection.vue'
import GlobalLoader from './components/ui/GlobalLoader.vue'
import VoiceIndicator from './components/ui/VoiceIndicator.vue'

// Home Sections
import HeroSection from './components/home/HeroSection.vue'
import CategoriesSection from './components/home/CategoriesSection.vue'
import FeaturedProductsSection, { type Product } from './components/home/FeaturedProductsSection.vue'
import RecommendationsSection from './components/home/RecommendationsSection.vue'
import FeaturesSection from './components/home/FeaturesSection.vue'
import PricingPlansSection from './components/home/PricingPlansSection.vue'

// Overlays & Modals
import ProductModal from './components/products/ProductModal.vue'
import CartDrawer, { type CartItem, type CartTotals } from './components/cart/CartDrawer.vue'
import AiAssistantWidget, { type AiMessage } from './components/ai/AiAssistantWidget.vue'
import ProfileModal, { type UserProfile } from './components/profile/ProfileModal.vue'

// ==========================================
// 4. DUMMY STATE (To be replaced by Pinia/Aimeos)
// ==========================================
// Global UI State
const isConnecting = ref(false)

// Products State
const isLoadingProducts = ref(false)
const featuredProducts = ref<Product[]>([
  { id: '1', name: 'Nexus Quantum Display', price: 449.99, formattedPrice: '$449.99', imageUrl: '', category: 'Visual' },
  { id: '2', name: 'Nexus Pulse Mouse', price: 62.99, formattedPrice: '$62.99', imageUrl: '', category: 'Peripherals' },
  { id: '3', name: 'Nexus Link Pro', price: 135.99, formattedPrice: '$135.99', imageUrl: '', category: 'Audio' },
  { id: '4', name: 'Nexus Mech X9', price: 99.00, formattedPrice: '$99.00', imageUrl: '', category: 'Peripherals' }
])

// Cart State
const isCartOpen = ref(false)
const userMembership = ref('pro') // 'starter', 'pro', 'elite'
const dummyCartItems = ref<CartItem[]>([
  { id: 'item_1', productId: 'p_1', name: 'Nexus Quantum Display', price: 449.99, formattedPrice: '$449.99', quantity: 1, imageUrl: '' }
])
const dummyTotals = ref<CartTotals>({
  count: 1,
  subtotal: '$449.99',
  tax: '$72.00',
  discount: '$45.00',
  total: '$476.99'
})

// AI Assistant State
const isAiOpen = ref(false)
const isListening = ref(false)
const chatMessages = ref<AiMessage[]>([
  { id: '1', sender: 'ai', text: 'Hello! I am Nexus. I can recommend gear based on your current setup.' }
])

// Profile State
const isProfileOpen = ref(false)
const dummyProfile = ref<UserProfile>({
  name: 'Ivan',
  email: 'ivan@nexusgear.com',
  phone: '+52 555 123 4567',
  plan: 'Pro',
  address: '',
  bio: 'Systems Engineering student building the ultimate setup.',
  memberSince: '2026-02-01'
})
const dummyStats = ref({
  cartItems: 3,
  cartValue: '$647.98',
  setupCompletion: '82%'
})

// ==========================================
// 5. EVENT HANDLERS (Aimeos JSON:API integrations go here)
// ==========================================
// Home Handlers
const handleCategoryFilter = (categorySlug: string) => {
  console.log(`Preparing to fetch [${categorySlug}] products from Aimeos API...`)
}
const handleViewAllProducts = () => {
  console.log('Navigating to full catalog...')
}
const handleAddToCart = (productId: string) => {
  console.log(`Adding product [${productId}] to cart via Aimeos API...`)
}
const handleViewProduct = (productId: string) => {
  console.log(`Navigating to detail view for product [${productId}]...`)
}
const handlePlanSelection = (planId: string) => {
  console.log(`Delegating registration for plan [${planId}] to Aimeos API...`)
}

// Cart Handlers
const handleOpenCart = () => { isCartOpen.value = true }
const handleCloseCart = () => { isCartOpen.value = false }
const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
  console.log(`Delegating update to Aimeos: Item ${itemId} to qty ${newQuantity}`)
}
const handleRemoveItem = (itemId: string) => {
  console.log(`Delegating removal to Aimeos: Item ${itemId}`)
}
const handleClearCart = () => {
  console.log('Clearing cart via Aimeos...')
}
const handleCheckout = () => {
  console.log('Redirecting to checkout flow...')
}

// Product Modal Handlers
const closeProductModal = () => {
  console.log('Closing product modal...')
}

// AI Assistant Handlers
const handleToggleAi = () => { isAiOpen.value = !isAiOpen.value }
const handleCloseAi = () => { isAiOpen.value = false }
const handleStartVoice = () => {
  console.log('Requesting microphone access and starting Web Speech API...')
  isListening.value = !isListening.value
}
const handleSendQuery = (query: string) => {
  chatMessages.value.push({ id: Date.now().toString(), sender: 'user', text: query })
  console.log(`Sending NLP query to backend: "${query}"`)
}

// Profile Handlers
const handleSaveProfile = (updatedProfile: UserProfile) => {
  console.log('Sending profile updates to Aimeos JSON:API:', updatedProfile)
  dummyProfile.value = { ...updatedProfile }
  isProfileOpen.value = false
}
</script>

<!-- File: src/App.vue (Template Section Only) -->
<template>
  <!-- Main Application Wrapper -->
  <div class="min-h-screen flex flex-col relative">
    
    <!-- HEADER -->
    <Navbar />

    <!-- MAIN CONTENT -->
    <main class="flex-grow">
      <HeroSection />
      
      <CategoriesSection @filter-selected="handleCategoryFilter" />
      
      <FeaturedProductsSection 
        :products="featuredProducts" 
        :is-loading="isLoadingProducts"
        @add-to-cart="handleAddToCart"
        @view-product="handleViewProduct"
        @view-all="handleViewAllProducts"
      />
      
      <RecommendationsSection 
        :recommended-products="[]" 
        @view-product="handleViewProduct"
        @add-to-cart="handleAddToCart"
      />
      
      <FeaturesSection />
      
      <PricingPlansSection @select-plan="handlePlanSelection" />
    </main>

    <!-- FOOTER -->
    <FooterSection />

    <!-- OVERLAYS, MODALS & FLOATING UI -->
    <!-- Grouped at the root level to prevent z-index or overflow clipping issues -->
    
    <ProductModal 
      :is-open="false" 
      :product="null" 
      @close="closeProductModal" 
      @add-to-cart="handleAddToCart" 
    />

    <CartDrawer 
      :is-open="isCartOpen"
      :items="dummyCartItems"
      :totals="dummyTotals"
      :membership-plan="userMembership"
      @close="handleCloseCart"
      @clear-cart="handleClearCart"
      @checkout="handleCheckout"
      @update-quantity="handleUpdateQuantity"
      @remove-item="handleRemoveItem"
    />

    <ProfileModal 
      :is-open="isProfileOpen"
      :profile="dummyProfile"
      :stats="dummyStats"
      @close="isProfileOpen = false"
      @save="handleSaveProfile"
      @upload-photo="console.log('Triggering file input')"
      @remove-photo="dummyProfile.avatarUrl = ''"
      @view-cart="console.log('Opening cart drawer...')"
      @view-orders="console.log('Navigating to orders view...')"
    />

    <AiAssistantWidget 
      :is-open="isAiOpen"
      :is-listening="isListening"
      :messages="chatMessages"
      @toggle="handleToggleAi"
      @close="handleCloseAi"
      @start-voice="handleStartVoice"
      @send-query="handleSendQuery"
    />

    <VoiceIndicator :is-listening="isListening" />
    
    <GlobalLoader :is-loading="isConnecting" />

  </div>
</template>