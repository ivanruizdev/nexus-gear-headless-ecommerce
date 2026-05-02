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
  <section class="bg-white py-16" id="products">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          FEATURED <span class="text-blue-600">GEAR</span>
        </h2>
        <p class="text-slate-600 mt-2 text-lg">The most wanted products from the Nexus community</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="text-center py-20 text-slate-500">
        <p>No featured products available at the moment.</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-lg hover:border-blue-300 flex flex-col group"
        >
          <!-- Product Image Area -->
          <div 
            class="relative aspect-square bg-slate-100 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
            @click="emit('viewProduct', product.id)"
          >
            <!-- Fallback icon if no image (replace with actual img tag when Aimeos images are ready) -->
            <img 
              v-if="product.imageUrl" 
              :src="product.imageUrl" 
              :alt="product.name"
              class="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <i v-else class="fas fa-box text-6xl text-slate-300"></i>
            
            <div class="absolute top-3 left-3">
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide">
                {{ product.category }}
              </span>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="p-5 flex flex-col flex-grow">
            <h3 
              class="font-bold text-slate-900 text-lg mb-1 cursor-pointer hover:text-blue-600 transition-colors"
              @click="emit('viewProduct', product.id)"
            >
              {{ product.name }}
            </h3>
            <div class="text-xl font-extrabold text-slate-900 mt-auto mb-4">
              {{ product.formattedPrice }}
            </div>
            
            <button 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              @click="emit('addToCart', product.id)"
            >
              <i class="fas fa-cart-plus"></i> ADD TO CART
            </button>
          </div>
        </div>
      </div>
      
      <!-- View All Action -->
      <div class="text-center mt-12">
        <button 
          class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-8 rounded-lg border border-slate-300 transition-colors inline-flex items-center gap-2"
          @click="emit('viewAll')"
        >
          <i class="fas fa-eye"></i> VIEW ALL PRODUCTS
        </button>
      </div>
    </div>
  </section>
</template>