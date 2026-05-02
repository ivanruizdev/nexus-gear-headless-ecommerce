<!-- File: src/components/products/ProductModal.vue -->
<script setup lang="ts">
import type { Product } from '../home/FeaturedProductsSection.vue'

defineProps<{
  isOpen: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'addToCart', productId: string): void;
}>();
</script>

<template>
  <div v-show="isOpen" class="relative z-50" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        <div v-if="product" class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl flex flex-col md:flex-row">
          
          <button @click="emit('close')" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-white rounded-full p-1">
            <i class="fas fa-times text-xl"></i>
          </button>

          <!-- Image Section -->
          <div class="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center border-r border-slate-200 min-h-[300px]">
             <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="max-w-full h-auto object-contain" />
             <i v-else class="fas fa-box-open text-9xl text-slate-300"></i>
          </div>

          <!-- Content Section -->
          <div class="md:w-1/2 p-8 flex flex-col justify-center">
            <div class="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">{{ product.category }}</div>
            <h2 class="text-3xl font-extrabold text-slate-900 mb-4">{{ product.name }}</h2>
            <div class="text-3xl font-bold text-slate-900 mb-6">{{ product.formattedPrice }}</div>
            
            <p class="text-slate-600 mb-8 leading-relaxed">
              Experience the next level of performance with this Nexus certified gear. Designed for maximum efficiency and seamless integration into your Web 4.0 setup.
            </p>

            <div class="flex gap-4 mt-auto">
              <button @click="emit('addToCart', product.id)" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
                <i class="fas fa-cart-plus"></i> ADD TO CART
              </button>
              <button @click="emit('close')" class="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors">
                BACK
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>