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
    <div class="fixed inset-0 bg-text-main/60 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        <div v-if="product" class="relative transform overflow-hidden rounded-3xl bg-surface-card text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl flex flex-col md:flex-row border border-black/5">
          
          <button @click="emit('close')" class="absolute top-4 right-4 text-text-muted hover:text-brand-primary hover:rotate-90 transition-all z-10 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm border border-black/5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <!-- Image Section -->
          <div class="md:w-1/2 bg-surface-base p-10 flex items-center justify-center border-r border-black/5 min-h-[300px] relative">
             <!-- Decorative background glow -->
             <div class="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent pointer-events-none"></div>
             
             <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="max-w-full h-auto object-contain relative z-10 mix-blend-multiply drop-shadow-md" />
             <svg v-else class="w-32 h-32 text-black/10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>

          <!-- Content Section -->
          <div class="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <div class="text-xs font-bold text-brand-secondary uppercase tracking-widest mb-3 bg-brand-secondary/10 w-max px-3 py-1 rounded-full border border-brand-secondary/20">
              {{ product.category }}
            </div>
            <h2 class="text-3xl font-extrabold text-text-main mb-4 font-orbitron leading-tight">{{ product.name }}</h2>
            <div class="text-4xl font-black text-brand-primary mb-6 tracking-tight">{{ product.formattedPrice }}</div>
            
            <p class="text-text-muted mb-8 leading-relaxed text-sm">
              Experience the next level of performance with this Nexus certified gear. Designed for maximum efficiency and seamless integration into your Web 4.0 setup.
            </p>

            <div class="flex gap-4 mt-auto">
              <button @click="emit('addToCart', product.id)" class="flex-1 bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg hover:-translate-y-0.5 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-wide text-sm">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                ADD TO CART
              </button>
              <button @click="emit('close')" class="bg-white border-2 border-black/10 hover:border-black/20 hover:bg-surface-base text-text-main font-bold py-3.5 px-6 rounded-xl transition-colors uppercase tracking-wide text-sm">
                BACK
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>