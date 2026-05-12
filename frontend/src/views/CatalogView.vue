<script setup lang="ts">
import { ref } from 'vue'
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection.vue'

// Estado local temporal para filtros
const activeCategory = ref('all')
const priceRange = ref(500)

const categories = [
  { name: 'Todos', slug: 'all' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Conectividad', slug: 'connectivity' },
  { name: 'Periféricos', slug: 'peripherals' }
]
</script>

<template>
  <div class="bg-surface-base min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col lg:flex-row gap-8">
        
        <aside class="w-full lg:w-64 shrink-0">
          <div class="bg-white rounded-3xl p-6 border border-black/5 sticky top-24">
            <h2 class="text-lg font-black text-gray-900 mb-6 uppercase tracking-tighter">Filtros</h2>
            
            <div class="mb-8">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categoría</h3>
              <div class="space-y-2">
                <button 
                  v-for="cat in categories" 
                  :key="cat.slug"
                  @click="activeCategory = cat.slug"
                  class="block w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors"
                  :class="activeCategory === cat.slug ? 'bg-teal-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'"
                >
                  {{ cat.name }}
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Precio Máximo</h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                v-model="priceRange"
                class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div class="flex justify-between mt-2 text-sm font-bold text-gray-900">
                <span>$0</span>
                <span>${{ priceRange }}</span>
              </div>
            </div>
          </div>
        </aside>

        <div class="grow">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-2xl font-black text-gray-900 uppercase tracking-tighter">
              Explora el <span class="text-teal-500">Catálogo</span>
            </h1>
            <span class="text-sm font-bold text-gray-400 uppercase">24 Productos encontrados</span>
          </div>

          <FeaturedProductsSection :products="[]" :is-loading="false" />
        </div>

      </div>
    </div>
  </div>
</template>