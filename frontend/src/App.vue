<script setup lang="ts">
// 1. Importing our extracted components
import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/home/HeroSection.vue'

// 2. Importing global styles
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
</script>

<template>
  <main>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Hero Section Component -->
    <HeroSection />

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

    <!-- Categories Section -->
    <section class="categories" id="categories">
        <div class="container mx-auto">
            <div class="section-header">
                <h2 class="section-title">EXPLORE <span class="gradient-text">CATEGORIES</span></h2>
                <p class="section-subtitle">Find the perfect gear for every part of your setup</p>
            </div>
            
            <div class="categories-grid">
                <div class="category-card" data-category="audio" @click="filterCategory('audio')">
                    <div class="category-icon"><i class="fas fa-headphones"></i></div>
                    <div class="category-name">Audio Nexus</div>
                    <div class="category-count">85 products</div>
                </div>
                
                <div class="category-card" data-category="peripherals" @click="filterCategory('peripherals')">
                    <div class="category-icon"><i class="fas fa-keyboard"></i></div>
                    <div class="category-name">Peripherals</div>
                    <div class="category-count">120 products</div>
                </div>
                
                <div class="category-card" data-category="visual" @click="filterCategory('visual')">
                    <div class="category-icon"><i class="fas fa-desktop"></i></div>
                    <div class="category-name">Visual Gear</div>
                    <div class="category-count">65 products</div>
                </div>
                
                <div class="category-card" data-category="connection" @click="filterCategory('connection')">
                    <div class="category-icon"><i class="fas fa-plug"></i></div>
                    <div class="category-name">Connection</div>
                    <div class="category-count">45 products</div>
                </div>
                
                <div class="category-card" data-category="gaming" @click="filterCategory('gaming')">
                    <div class="category-icon"><i class="fas fa-gamepad"></i></div>
                    <div class="category-name">Gaming Pro</div>
                    <div class="category-count">95 products</div>
                </div>
                
                <div class="category-card" data-category="streaming" @click="filterCategory('streaming')">
                    <div class="category-icon"><i class="fas fa-video"></i></div>
                    <div class="category-name">Streaming</div>
                    <div class="category-count">70 products</div>
                </div>
            </div>
        </div>
    </section>

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

    <!-- Featured Products Section -->
    <section class="featured-products" id="products">
        <div class="container mx-auto">
            <div class="section-header">
                <h2 class="section-title">FEATURED <span class="gradient-text">GEAR</span></h2>
                <p class="section-subtitle">The most wanted products from the Nexus community</p>
            </div>
            
            <div class="products-grid" id="featuredProducts">
                <!-- Products loaded dynamically from Aimeos JSON:API -->
            </div>
            
            <div class="text-center mt-12">
                <button class="btn btn-secondary" @click="viewAllProducts">
                    <i class="fas fa-eye"></i> VIEW ALL PRODUCTS
                </button>
            </div>
        </div>
    </section>

    <!-- Nexus Features Section -->
    <section class="features" id="features">
        <div class="container mx-auto">
            <div class="section-header">
                <h2 class="section-title">NEXUS <span class="gradient-text">FEATURES</span></h2>
                <p class="section-subtitle">Discover the technologies that make Nexus Gear unique</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-robot"></i></div>
                    <div class="feature-title">Nexus AI Assistant</div>
                    <div class="feature-description">Intelligent assistant that learns your habits and suggests products and setups.</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-microphone"></i></div>
                    <div class="feature-title">Voice Control</div>
                    <div class="feature-description">Navigate, search, and buy using voice commands.</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-sync-alt"></i></div>
                    <div class="feature-title">Sync Ecosystem</div>
                    <div class="feature-description">All Nexus products connect seamlessly, creating a unified setup.</div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-bolt"></i></div>
                    <div class="feature-title">Setup Optimizer</div>
                    <div class="feature-description">Analyzes your current setup and suggests performance improvements.</div>
                </div>
            </div>
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

    <!-- Cart Drawer -->
    <div class="cart-overlay" id="cartOverlay" @click="closeCart"></div>
    <aside class="cart-drawer" id="cartDrawer">
        <div class="cart-header">
            <div class="cart-title"><i class="fas fa-shopping-cart"></i> Your Cart</div>
            <button class="btn btn-secondary btn-small" @click="closeCart">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="cart-body" id="cartItems"></div>
        <div class="cart-footer">
            <div class="cart-summary-row">
                <span>Products</span>
                <span id="cartProductsCount">0</span>
            </div>
            <div class="cart-summary-row">
                <span>Subtotal</span>
                <span id="cartSubtotal">$0.00</span>
            </div>
            <div class="cart-summary-row">
                <span>Tax (16%)</span>
                <span id="cartTax">$0.00</span>
            </div>
            <div class="cart-summary-row">
                <span id="cartDiscountLabel">Membership Discount</span>
                <span id="cartDiscount">-$0.00</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total</span>
                <span id="cartTotal">$0.00</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-secondary btn-full" @click="clearCart">
                    <i class="fas fa-trash"></i> Empty Cart
                </button>
                <button class="btn btn-primary btn-full" @click="checkoutCart">
                    <i class="fas fa-credit-card"></i> Checkout
                </button>
            </div>
        </div>
    </aside>

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

  <!-- Footer -->
  <footer>
    <div class="container mx-auto">
        <div class="footer-bottom">
            <p>&copy; 2026 Nexus Gear. All rights reserved. | "Connect your gear"</p>
        </div>
    </div>
  </footer>
</template>