<!-- File: src/components/cart/CartDrawer.vue -->
<script setup lang="ts">
// 1. Define types based on expected Aimeos JSON:API structure
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  formattedPrice: string;
  quantity: number;
  imageUrl: string;
}

export interface CartTotals {
  count: number;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
}

// 2. Define props (dumb component relies on parent for state)
const props = defineProps<{
  isOpen: boolean;
  items: CartItem[];
  totals: CartTotals;
  membershipPlan?: string;
}>();

// 3. Define events to communicate user actions to the parent
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'clearCart'): void;
  (e: 'checkout'): void;
  (e: 'updateQuantity', itemId: string, newQuantity: number): void;
  (e: 'removeItem', itemId: string): void;
}>();
</script>

<template>
  <!-- Main Wrapper -->
  <div v-show="isOpen" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    
    <!-- Background overlay -->
    <div 
      class="fixed inset-0 bg-text-main/60 backdrop-blur-sm transition-opacity"
      @click="emit('close')"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <!-- Slide-over panel -->
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          
          <div 
            class="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-in-out"
            :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
          >
            <div class="flex h-full flex-col bg-surface-card shadow-2xl border-l border-black/5">
              
              <!-- Header -->
              <div class="flex items-center justify-between px-6 py-5 border-b border-black/5">
                <h2 class="text-xl font-bold text-text-main flex items-center gap-2 font-orbitron" id="slide-over-title">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  YOUR CART
                </h2>
                <button 
                  type="button" 
                  class="rounded-full bg-surface-card text-text-muted hover:text-text-main hover:bg-surface-base p-2 transition-colors"
                  @click="emit('close')"
                >
                  <span class="sr-only">Close panel</span>
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <!-- Body: Cart Items -->
              <div class="flex-1 overflow-y-auto px-6 py-6 bg-surface-base/50">
                <!-- Empty State -->
                <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-full text-center text-text-muted">
                  <svg class="w-20 h-20 mb-4 text-black/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                  <p class="text-lg font-bold text-text-main">Your cart is empty</p>
                  <p class="text-sm mt-2 max-w-[250px]">Explore our products and build your ultimate setup.</p>
                </div>

                <!-- Items List -->
                <ul v-else role="list" class="-my-6 divide-y divide-black/5">
                  <li v-for="item in items" :key="item.id" class="flex py-6">
                    
                    <!-- Image -->
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-black/5 bg-surface-base p-2 flex items-center justify-center">
                      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="h-full w-full object-contain object-center mix-blend-multiply" />
                      <svg v-else class="w-8 h-8 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>

                    <!-- Details -->
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-bold text-text-main">
                          <h3>{{ item.name }}</h3>
                          <p class="ml-4 text-brand-primary">{{ item.formattedPrice }}</p>
                        </div>
                      </div>
                      
                      <div class="flex flex-1 items-end justify-between text-sm mt-4">
                        <!-- Quantity Controls -->
                        <div class="flex items-center border border-black/10 rounded-lg bg-surface-card">
                          <button 
                            class="px-3 py-1.5 text-text-muted hover:bg-surface-base transition-colors rounded-l-lg disabled:opacity-50"
                            @click="emit('updateQuantity', item.id, item.quantity - 1)"
                            :disabled="item.quantity <= 1"
                          >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
                          </button>
                          <span class="px-3 py-1.5 text-text-main font-bold border-x border-black/10 min-w-[2.5rem] text-center">{{ item.quantity }}</span>
                          <button 
                            class="px-3 py-1.5 text-text-muted hover:bg-surface-base transition-colors rounded-r-lg"
                            @click="emit('updateQuantity', item.id, item.quantity + 1)"
                          >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                          </button>
                        </div>

                        <!-- Remove Action -->
                        <button 
                          type="button" 
                          class="font-bold text-status-error hover:text-red-700 transition-colors flex items-center gap-1"
                          @click="emit('removeItem', item.id)"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Footer: Summary & Actions -->
              <div class="border-t border-black/5 bg-surface-card px-6 py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm text-text-muted font-medium">
                    <p>Products ({{ totals.count }})</p>
                    <p class="text-text-main">{{ totals.subtotal }}</p>
                  </div>
                  <div class="flex justify-between text-sm text-text-muted font-medium">
                    <p>Tax (16%)</p>
                    <p class="text-text-main">{{ totals.tax }}</p>
                  </div>
                  <div class="flex justify-between text-sm text-status-success font-bold">
                    <p class="flex items-center gap-2">
                      Membership Discount
                      <span v-if="membershipPlan" class="uppercase text-[0.65rem] bg-status-success/20 text-status-success px-1.5 py-0.5 rounded-full border border-status-success/30">
                        {{ membershipPlan }}
                      </span>
                    </p>
                    <p>-{{ totals.discount }}</p>
                  </div>
                  <div class="flex justify-between items-center text-xl font-extrabold text-text-main pt-4 border-t border-black/5 mt-2">
                    <p class="font-orbitron">TOTAL</p>
                    <p class="text-brand-primary">{{ totals.total }}</p>
                  </div>
                </div>

                <div class="flex flex-col gap-3">
                  <!-- High Conversion Primary Button -->
                  <button 
                    class="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-4 text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide"
                    :disabled="items.length === 0"
                    @click="emit('checkout')"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    SECURE CHECKOUT
                  </button>
                  
                  <!-- Ghost Button for clearing -->
                  <button 
                    class="w-full flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-transparent px-6 py-3 text-sm font-bold text-text-muted hover:text-text-main hover:bg-surface-base transition-colors disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide"
                    :disabled="items.length === 0"
                    @click="emit('clearCart')"
                  >
                    EMPTY CART
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>