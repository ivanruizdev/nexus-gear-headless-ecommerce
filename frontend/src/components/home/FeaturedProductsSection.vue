<!-- File: src/components/home/FeaturedProductsSection.vue -->
<script setup lang="ts">
// 1. Define the shape of our product data based on expected Aimeos JSON:API structure
export interface Product {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  imageUrl: string;
  category: string;
}

// 2. Define props to receive data from the parent component (keeping this component "dumb")
defineProps<{
  products: Product[];
  isLoading?: boolean;
}>();

// 3. Define events to notify the parent when a user interacts
const emit = defineEmits<{
  (e: 'addToCart', productId: string): void;
  (e: 'viewProduct', productId: string): void;
  (e: 'viewAll'): void;
}>();
</script>

<template>
  <section class="bg-surface-base py-16" id="products">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-orbitron">
          FEATURED <span class="text-brand-primary">GEAR</span>
        </h2>
        <p class="text-text-muted mt-4 text-lg">The most wanted products from the Nexus community</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <!-- SVG Spinner -->
        <svg class="animate-spin h-12 w-12 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="text-center py-20 text-text-muted">
        <p>No featured products available at the moment.</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="bg-surface-card rounded-2xl shadow-sm border border-black/5 overflow-hidden transition-all hover:shadow-md hover:border-brand-primary/30 flex flex-col group"
        >
          <!-- Product Image Area -->
          <div 
            class="relative aspect-square bg-black/5 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
            @click="emit('viewProduct', product.id)"
          >
            <!-- Image / Fallback -->
            <img 
              v-if="product.imageUrl" 
              :src="product.imageUrl" 
              :alt="product.name"
              class="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <svg v-else class="w-16 h-16 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            
            <div class="absolute top-3 left-3">
              <span class="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {{ product.category }}
              </span>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="p-5 flex flex-col flex-grow">
            <h3 
              class="font-bold text-text-main text-lg mb-1 cursor-pointer hover:text-brand-primary transition-colors"
              @click="emit('viewProduct', product.id)"
            >
              {{ product.name }}
            </h3>
            <div class="text-xl font-extrabold text-brand-primary mt-auto mb-4">
              {{ product.formattedPrice }}
            </div>
            
            <!-- High Conversion Add to Cart -->
            <button 
              class="w-full bg-white border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
              @click="emit('addToCart', product.id)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      
      <!-- View All Action -->
      <div class="text-center mt-12">
        <button 
          class="bg-white hover:bg-surface-base text-text-main font-semibold py-3 px-8 rounded-full border border-black/10 hover:border-black/20 transition-colors inline-flex items-center gap-2 shadow-sm"
          @click="emit('viewAll')"
        >
          VIEW ALL PRODUCTS
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>