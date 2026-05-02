<script setup lang="ts">

import { ref } from 'vue'
// 1. Importing our extracted components
import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/home/HeroSection.vue'

import CategoriesSection from './components/home/CategoriesSection.vue'
import FeaturedProductsSection from './components/home/FeaturedProductsSection.vue'
import FeaturesSection from './components/home/FeaturesSection.vue'
import PricingPlansSection from './components/home/PricingPlansSection.vue'
import FooterSection from './components/layout/FooterSection.vue'


import CartDrawer from './components/cart/CartDrawer.vue'
import type { CartItem, CartTotals } from './components/cart/CartDrawer.vue'

import CategoriesSection from './components/home/CategoriesSection.vue'
import FeaturedProductsSection, { type Product } from './components/home/FeaturedProductsSection.vue'


import './assets/css/style.css'

// 3. Dummy handlers to prevent Vue compilation errors. 
// TODO: Replace these with actual calls to the Aimeos JSON:API
const filterCategory = (category: string) => { console.log(`Filtering by: ${category}`) }
const viewAllProducts = () => { console.log('Viewing all products') }
const registerUser = (plan: string) => { console.log(`Registering plan: ${plan}`) }
const openCart = () => { console.log('Opening cart') }
const closeCart = () => { console.log('Closing cart') }
const clearCart = () => { console.log('Clearing cart') }
const checkoutCart = () => { console.log('Proceeding to checkout via Aimeos') }
const closeProfile = () => { console.log('Closing profile') }
const triggerProfilePhotoUpload = () => { console.log('Triggering photo upload') }
const handleProfilePhotoUpload = (event: Event) => { console.log('Handling photo upload', event) }
const removeProfilePhoto = () => { console.log('Removing photo') }
const saveProfile = () => { console.log('Saving profile data to Aimeos') }
const viewOrders = () => { console.log('Fetching orders from Aimeos') }
const showNotification = (msg: string, type: string) => { console.log(`Notification [${type}]: ${msg}`) }
const toggleAssistant = () => { console.log('Toggling Nexus AI Assistant') }
const askAI = (query: string) => { console.log(`Asking AI: ${query}`) }
const startVoiceAssistant = () => { console.log('Activating Web Speech API') }
const closeProductModal = (event?: Event) => { console.log('Closing product modal') }
import CategoriesSection from './components/home/CategoriesSection.vue'

// This handler will eventually construct the URL or payload 
// to ask Aimeos JSON:API for the filtered products
const handleCategoryFilter = (categorySlug: string) => {
  console.log(`Preparing to fetch [${categorySlug}] products from Aimeos API...`)
  // TODO: Call Aimeos API



// Dummy state. Later, this will be populated by fetching from Aimeos JSON:API
const isLoadingProducts = ref(false)
const featuredProducts = ref<Product[]>([
  { id: '1', name: 'Nexus Quantum Display', price: 449.99, formattedPrice: '$449.99', imageUrl: '', category: 'Visual' },
  { id: '2', name: 'Nexus Pulse Mouse', price: 62.99, formattedPrice: '$62.99', imageUrl: '', category: 'Peripherals' },
  { id: '3', name: 'Nexus Link Pro', price: 135.99, formattedPrice: '$135.99', imageUrl: '', category: 'Audio' },
  { id: '4', name: 'Nexus Mech X9', price: 99.00, formattedPrice: '$99.00', imageUrl: '', category: 'Peripherals' }
])

const handleAddToCart = (productId: string) => {
  console.log(`Adding product [${productId}] to cart via Aimeos API...`)
}

const handleViewProduct = (productId: string) => {
  console.log(`Navigating to detail view for product [${productId}]...`)
}

const handleViewAllProducts = () => {
  console.log('Navigating to full catalog...')
}



const handlePlanSelection = (planId: string) => {
  console.log(`Delegating registration for plan [${planId}] to Aimeos API...`)
  // TODO: Trigger modal or redirect to Aimeos checkout/registration endpoint
}


// Dummy state. This will be managed by a store (Pinia) or fetched from Aimeos
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

const handleOpenCart = () => { isCartOpen.value = true }
const handleCloseCart = () => { isCartOpen.value = false }

const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
  console.log(`Delegating update to Aimeos: Item ${itemId} to qty ${newQuantity}`)
  // TODO: Call Aimeos API and update local state
}

const handleRemoveItem = (itemId: string) => {
  console.log(`Delegating removal to Aimeos: Item ${itemId}`)
  // TODO: Call Aimeos API
}

const handleClearCart = () => {
  console.log('Clearing cart via Aimeos...')
}

const handleCheckout = () => {
  console.log('Redirecting to checkout flow...')
}

</script>

<template>
<div class="min-h-screen flex flex-col"></div>    
  <main>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Hero Section Component -->
    <HeroSection />

    <CategoriesSection @filter-selected="handleCategoryFilter" />

    <FeaturedProductsSection 
      :products="featuredProducts" 
      :is-loading="isLoadingProducts"
      @add-to-cart="handleAddToCart"
      @view-product="handleViewProduct"
      @view-all="handleViewAllProducts"
    />

    <FeaturesSection />

    <PricingPlansSection @select-plan="handlePlanSelection" />

    <!-- Loading Screen -->
    <div class="loading" id="loading">
        <div class="text-center">
            <div class="logo text-5xl mb-8">
                <i class="fas fa-link logo-icon"></i>
                <span class="logo-text">NEXUS GEAR</span>
            </div>
            <div class="text-primary text-2xl mb-5">CONNECTING...</div>
            <div class="w-48 h-1 bg-black/10 mx-auto rounded overflow-hidden">
                <div id="loadingBar" class="w-0 h-full bg-primary transition-all duration-300"></div>
            </div>
        </div>
    </div>

    <!-- Small Voice Recognition Indicator -->
    <div class="voice-status-pill" id="voiceStatusPill">
        <div class="voice-status-icon" id="voiceStatusIcon"><i class="fas fa-microphone"></i></div>
        <div class="flex-1 min-w-0">
            <div class="voice-status-title" id="voiceStatusTitle">Microphone</div>
            <div class="voice-status-text" id="voiceStatusText">Listening...</div>
            <div class="voice-level" id="voiceLevel"><div class="voice-level-bar"></div></div>
        </div>
    </div>

    <!-- Personalized Recommendations Section -->
    <section class="recommendations" id="recommendations">
        <div class="container mx-auto">
            <div class="section-header">
                <div class="mini-badge"><i class="fas fa-sparkles"></i> Custom AI</div>
                <h2 class="section-title">RECOMMENDED <span class="gradient-text">FOR YOU</span></h2>
                <p class="section-subtitle">Suggestions based on your profile, searches, and cart items.</p>
                <p class="recommendation-note" id="recommendationNote">We are still learning your preferences. Explore products to refine your recommendations.</p>
            </div>
            <div class="products-grid" id="recommendedProducts"></div>
        </div>
    </section>

    

    <!-- User Types / Community Section -->
    <section class="user-types" id="users">
        <div class="container mx-auto">
            <div class="section-header">
                <h2 class="section-title">NEXUS <span class="gradient-text">COMMUNITY</span></h2>
                <p class="section-subtitle">Connect with other users based on your needs</p>
            </div>
            
            <div class="user-types-container">
                <!-- Basic User -->
                <div class="user-type-card">
                    <div class="user-type-badge">FREE</div>
                    <div class="user-type-icon"><i class="fas fa-user"></i></div>
                    <div class="user-type-name">Nexus Starter</div>
                    <p class="text-gray-500 mb-5">Perfect to start your tech journey</p>
                    
                    <ul class="user-type-features">
                        <li><i class="fas fa-check"></i> Full catalog access</li>
                        <li><i class="fas fa-check"></i> Basic AI Assistant</li>
                        <li><i class="fas fa-check"></i> Purchases and tracking</li>
                        <li><i class="fas fa-check"></i> Email support</li>
                        <li><i class="fas fa-check"></i> 1 saved setup</li>
                    </ul>
                    
                    <button class="btn btn-secondary btn-full" @click="registerUser('starter')">
                        JOIN FOR FREE
                    </button>
                </div>
                
                <!-- Pro User -->
                <div class="user-type-card">
                    <div class="user-type-badge bg-secondary">PRO</div>
                    <div class="user-type-icon"><i class="fas fa-user-tie"></i></div>
                    <div class="user-type-name">Nexus Pro</div>
                    <p class="text-gray-500 mb-5">For gamers and serious creators</p>
                    
                    <ul class="user-type-features">
                        <li><i class="fas fa-check"></i> Everything in Starter +</li>
                        <li><i class="fas fa-check"></i> Advanced AI Assistant</li>
                        <li><i class="fas fa-check"></i> Exclusive discounts (10-15%)</li>
                        <li><i class="fas fa-check"></i> 24/7 Priority support</li>
                        <li><i class="fas fa-check"></i> 5 custom setups</li>
                        <li><i class="fas fa-check"></i> Premium configurations</li>
                    </ul>
                    
                    <button class="btn btn-primary btn-full" @click="registerUser('pro')">
                        $9.99/MONTH
                    </button>
                </div>
                
                <!-- Premium User -->
                <div class="user-type-card premium">
                    <div class="user-type-badge bg-accent">PREMIUM</div>
                    <div class="user-type-icon"><i class="fas fa-crown"></i></div>
                    <div class="user-type-name">Nexus Elite</div>
                    <p class="text-gray-500 mb-5">Ultimate tech experience</p>
                    
                    <ul class="user-type-features">
                        <li><i class="fas fa-check"></i> Everything in Pro +</li>
                        <li><i class="fas fa-check"></i> Custom AI</li>
                        <li><i class="fas fa-check"></i> Elite discounts (20-30%)</li>
                        <li><i class="fas fa-check"></i> Setup concierge</li>
                        <li><i class="fas fa-check"></i> Unlimited setups</li>
                        <li><i class="fas fa-check"></i> Free shipping</li>
                        <li><i class="fas fa-check"></i> Exclusive beta features</li>
                    </ul>
                    
                    <button class="btn btn-primary btn-full bg-gradient-to-tr from-accent to-pink-500" @click="registerUser('elite')">
                        $19.99/MONTH
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- User Profile Modal -->
    <div class="profile-overlay" id="profileOverlay" @click="closeProfile"></div>
    <section class="profile-modal" id="profileModal" aria-hidden="true">
        <!-- Profile logic omitted for brevity, but events converted to @click/@change -->
        <div class="profile-cover">
            <button class="profile-close" @click="closeProfile"><i class="fas fa-times"></i></button>
            <div class="profile-hero">
                <div class="profile-avatar-wrapper">
                    <div class="profile-avatar" id="profileAvatar">NG</div>
                    <button type="button" class="profile-photo-btn" @click="triggerProfilePhotoUpload" title="Change profile photo">
                        <i class="fas fa-camera"></i>
                    </button>
                    <input type="file" id="profilePhotoInput" accept="image/png,image/jpeg,image/webp" class="hidden" @change="handleProfilePhotoUpload">
                </div>
                <div class="profile-hero-info">
                    <h2 id="profileHeroName">Nexus Guest</h2>
                    <p id="profileHeroEmail">guest@nexusgear.com</p>
                    <div class="profile-photo-actions">
                        <button type="button" class="btn btn-secondary btn-small" @click="triggerProfilePhotoUpload"><i class="fas fa-image"></i> Upload</button>
                        <button type="button" class="btn btn-secondary btn-small" @click="removeProfilePhoto"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Internal Profile Forms & Actions -->
        <div class="profile-content">
             <div class="profile-actions-bar mt-5">
                 <button class="btn btn-primary" @click="saveProfile"><i class="fas fa-save"></i> Save Changes</button>
                 <button class="btn btn-secondary" @click="closeProfile"><i class="fas fa-arrow-left"></i> Close</button>
             </div>
        </div>
    </section>

    <!-- AI Assistant -->
    <div class="ai-assistant" id="aiAssistant">
        <div class="ai-header">
            <div class="ai-title"><i class="fas fa-robot"></i><span>Nexus Assistant</span></div>
            <button class="ai-close" @click="toggleAssistant"><i class="fas fa-times"></i></button>
        </div>
        <div class="ai-message" id="aiMessage">
            Hello! I am Nexus, your personal assistant. How can I help you today?
        </div>
        <div class="ai-actions">
            <button class="btn btn-primary btn-small" @click="askAI('recommended products')">
                <i class="fas fa-thumbs-up"></i> Recommendations
            </button>
            <button class="btn btn-secondary btn-small" @click="startVoiceAssistant">
                <i class="fas fa-microphone"></i> Speak
            </button>
        </div>
    </div>

    <!-- Product Modal -->
    <div class="product-modal-overlay" id="productModalOverlay" @click="closeProductModal">
        <div class="product-modal" role="dialog" aria-modal="true">
            <div class="product-modal-grid">
                <div class="product-modal-content">
                    <button class="product-modal-close" @click="closeProductModal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="product-modal-actions mt-5">
                        <button class="btn btn-primary" id="productModalAddBtn">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary" @click="closeProductModal">
                            <i class="fas fa-arrow-left"></i> Keep browsing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </main>

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

  <FooterSection />
</div>
</template>