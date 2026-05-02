<!-- File: src/views/HomeView.vue -->
<script setup lang="ts">
import { ref } from 'vue'

// Home Sections
import HeroSection from '../components/home/HeroSection.vue'
import CategoriesSection from '../components/home/CategoriesSection.vue'
import FeaturedProductsSection, { type Product } from '../components/home/FeaturedProductsSection.vue'
import RecommendationsSection from '../components/home/RecommendationsSection.vue'
import FeaturesSection from '../components/home/FeaturesSection.vue'
import PricingPlansSection from '../components/home/PricingPlansSection.vue'

// Page Local State
const isLoadingProducts = ref(false)
const featuredProducts = ref<Product[]>([
  { id: '1', name: 'Nexus Quantum Display', price: 449.99, formattedPrice: '$449.99', imageUrl: '', category: 'Visual' },
  { id: '2', name: 'Nexus Pulse Mouse', price: 62.99, formattedPrice: '$62.99', imageUrl: '', category: 'Peripherals' }
])

// Event Handlers for Home View
const handleCategoryFilter = (categorySlug: string) => {
  console.log(`Fetching [${categorySlug}] from Aimeos...`)
}
</script>

<template>
  <div class="home-view">
    <HeroSection />
    
    <CategoriesSection @filter-selected="handleCategoryFilter" />
    
    <FeaturedProductsSection 
      :products="featuredProducts" 
      :is-loading="isLoadingProducts"
    />
    
    <RecommendationsSection :recommended-products="[]" />
    
    <FeaturesSection />
    
    <PricingPlansSection />
  </div>
</template>