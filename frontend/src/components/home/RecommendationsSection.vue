<!-- File: src/components/home/RecommendationsSection.vue -->
<script setup lang="ts">
import type { Product } from './FeaturedProductsSection.vue'

defineProps<{
  recommendedProducts: Product[];
}>();

const emit = defineEmits<{
  (e: 'viewProduct', productId: string): void;
  (e: 'addToCart', productId: string): void;
}>();
</script>

<template>
  <section class="bg-gradient-to-b from-brand-secondary/5 to-surface-card py-20 border-t border-black/5" id="recommendations">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- AI Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
          Custom AI
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-orbitron">
          RECOMMENDED <span class="text-brand-accent">FOR YOU</span>
        </h2>
        <p class="text-text-muted mt-4 text-lg max-w-2xl mx-auto">
          Suggestions tailored to your current setup, search history, and cart.
        </p>
      </div>

      <!-- Empty State (AI Analyzing) -->
      <div v-if="recommendedProducts.length === 0" class="max-w-3xl mx-auto text-center py-16 bg-surface-base rounded-3xl border border-black/5 shadow-inner">
        <div class="w-16 h-16 mx-auto bg-brand-accent/10 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-brand-accent animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-text-main mb-2">Analyzing Profile Data...</h3>
        <p class="text-text-muted text-sm px-6 max-w-md mx-auto">
          Nexus AI is still learning your preferences. Explore more products or build your setup to generate hyper-personalized gear recommendations.
        </p>
      </div>

      <!-- Recommendation Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         <div v-for="product in recommendedProducts" :key="product.id" class="bg-surface-card rounded-2xl shadow-sm border border-brand-accent/20 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col group relative">
            
            <!-- AI Badge -->
            <div class="absolute top-0 right-0 bg-brand-accent text-white text-[0.65rem] font-bold px-3 py-1 rounded-bl-lg z-10 uppercase tracking-widest shadow-md">
              98% Match
            </div>

            <!-- Image Area -->
            <div class="relative aspect-square bg-black/5 p-6 flex items-center justify-center cursor-pointer overflow-hidden" @click="emit('viewProduct', product.id)">
              <svg v-if="!product.imageUrl" class="w-16 h-16 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            
            <!-- Info Area -->
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="font-bold text-text-main text-lg mb-1 cursor-pointer hover:text-brand-accent transition-colors" @click="emit('viewProduct', product.id)">{{ product.name }}</h3>
              <div class="text-xl font-extrabold text-brand-accent mt-auto mb-4">{{ product.formattedPrice }}</div>
              
              <button class="w-full bg-brand-accent hover:bg-brand-primary text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2" @click="emit('addToCart', product.id)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                QUICK ADD
              </button>
            </div>
         </div>
      </div>
      
    </div>
  </section>
</template>