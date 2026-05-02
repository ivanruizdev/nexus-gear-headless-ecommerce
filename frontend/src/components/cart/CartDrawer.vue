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
  membershipPlan?: string; // e.g., 'starter', 'pro', 'elite'
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
  <!-- Main Wrapper: Render only if isOpen is true, or handle transitions -->
  <div v-show="isOpen" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    
    <!-- Background overlay, click to close -->
    <div 
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      @click="emit('close')"
    ></div>

    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <!-- Slide-over panel, positioned to the right -->
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          
          <div 
            class="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-in-out"
            :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
          >
            <div class="flex h-full flex-col bg-white shadow-2xl">
              
              <!-- Header -->
              <div class="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2" id="slide-over-title">
                  <i class="fas fa-shopping-cart text-blue-600"></i> Your Cart
                </h2>
                <button 
                  type="button" 
                  class="rounded-md bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 transition-colors"
                  @click="emit('close')"
                >
                  <span class="sr-only">Close panel</span>
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>

              <!-- Body: Cart Items -->
              <div class="flex-1 overflow-y-auto px-6 py-6">
                <!-- Empty State -->
                <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-full text-center text-slate-500">
                  <i class="fas fa-box-open text-6xl mb-4 text-slate-300"></i>
                  <p class="text-lg font-medium">Your cart is empty</p>
                  <p class="text-sm mt-1">Explore our products and add them to your setup.</p>
                </div>

                <!-- Items List -->
                <ul v-else role="list" class="-my-6 divide-y divide-slate-200">
                  <li v-for="item in items" :key="item.id" class="flex py-6">
                    
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-2 flex items-center justify-center">
                      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="h-full w-full object-contain object-center" />
                      <i v-else class="fas fa-image text-3xl text-slate-300"></i>
                    </div>

                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-bold text-slate-900">
                          <h3>{{ item.name }}</h3>
                          <p class="ml-4">{{ item.formattedPrice }}</p>
                        </div>
                      </div>
                      
                      <div class="flex flex-1 items-end justify-between text-sm mt-2">
                        <!-- Quantity Controls -->
                        <div class="flex items-center border border-slate-300 rounded-md">
                          <button 
                            class="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                            @click="emit('updateQuantity', item.id, item.quantity - 1)"
                            :disabled="item.quantity <= 1"
                          >
                            <i class="fas fa-minus text-xs"></i>
                          </button>
                          <span class="px-3 py-1 text-slate-900 font-semibold border-x border-slate-300">{{ item.quantity }}</span>
                          <button 
                            class="px-3 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                            @click="emit('updateQuantity', item.id, item.quantity + 1)"
                          >
                            <i class="fas fa-plus text-xs"></i>
                          </button>
                        </div>

                        <button 
                          type="button" 
                          class="font-medium text-red-500 hover:text-red-700 transition-colors"
                          @click="emit('removeItem', item.id)"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Footer: Summary & Actions -->
              <div class="border-t border-slate-200 bg-slate-50 px-6 py-6">
                
                <div class="space-y-2 mb-6">
                  <div class="flex justify-between text-sm text-slate-600">
                    <p>Products ({{ totals.count }})</p>
                    <p>{{ totals.subtotal }}</p>
                  </div>
                  <div class="flex justify-between text-sm text-slate-600">
                    <p>Tax (16%)</p>
                    <p>{{ totals.tax }}</p>
                  </div>
                  <div class="flex justify-between text-sm text-green-600 font-medium">
                    <p>Membership Discount <span class="uppercase text-xs bg-green-100 px-1.5 py-0.5 rounded ml-1">{{ membershipPlan }}</span></p>
                    <p>-{{ totals.discount }}</p>
                  </div>
                  <div class="flex justify-between text-lg font-extrabold text-slate-900 pt-3 border-t border-slate-200 mt-3">
                    <p>Total</p>
                    <p>{{ totals.total }}</p>
                  </div>
                </div>

                <div class="flex flex-col gap-3">
                  <button 
                    class="w-full flex items-center justify-center gap-2 rounded-xl border border-transparent bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                    :disabled="items.length === 0"
                    @click="emit('checkout')"
                  >
                    <i class="fas fa-credit-card"></i> CHECKOUT
                  </button>
                  <button 
                    class="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors disabled:text-slate-300 disabled:border-slate-200 disabled:cursor-not-allowed"
                    :disabled="items.length === 0"
                    @click="emit('clearCart')"
                  >
                    <i class="fas fa-trash"></i> EMPTY CART
                  </button>
                </div>
                
                <div class="mt-4 flex justify-center text-center text-sm text-slate-500">
                  <p>
                    or 
                    <button type="button" class="font-bold text-blue-600 hover:text-blue-500" @click="emit('close')">
                      Continue Shopping <span aria-hidden="true">&rarr;</span>
                    </button>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>