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
  <section class="bg-blue-50/50 py-16 border-t border-slate-200" id="recommendations">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
          <i class="fas fa-sparkles"></i> Custom AI
        </div>
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          RECOMMENDED <span class="text-blue-600">FOR YOU</span>
        </h2>
        <p class="text-slate-600 mt-2 text-lg">Suggestions based on your profile, searches, and cart items.</p>
        
        <p v-if="recommendedProducts.length === 0" class="text-sm text-slate-500 mt-4 bg-white inline-block px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          We are still learning your preferences. Explore products to refine your recommendations.
        </p>
      </div>

      <!-- Reuse the same grid logic from FeaturedProducts, or a carousel -->
      <div v-if="recommendedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         <!-- Card implementation similar to FeaturedProducts... -->
         <div v-for="product in recommendedProducts" :key="product.id" class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-lg hover:border-blue-300 flex flex-col group">
            <div class="relative aspect-square bg-slate-100 p-6 flex items-center justify-center cursor-pointer overflow-hidden" @click="emit('viewProduct', product.id)">
              <i class="fas fa-box text-6xl text-slate-300"></i>
            </div>
            <div class="p-5 flex flex-col flex-grow">
              <h3 class="font-bold text-slate-900 text-lg mb-1">{{ product.name }}</h3>
              <div class="text-xl font-extrabold text-slate-900 mt-auto mb-4">{{ product.formattedPrice }}</div>
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2" @click="emit('addToCart', product.id)">
                <i class="fas fa-cart-plus"></i> ADD
              </button>
            </div>
         </div>
      </div>
    </div>
  </section>
</template>