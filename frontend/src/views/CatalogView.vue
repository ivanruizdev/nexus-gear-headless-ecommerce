<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product' // 1. Importar el Store
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection.vue'

// 2. Inicializar el Store
const productStore = useProductStore()

const activeCategory = ref('all')
const priceRange = ref(500)

const categories = [
  { name: 'Todos', slug: 'all' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Conectividad', slug: 'connectivity' },
  { name: 'Periféricos', slug: 'peripherals' }
]

// 3. Disparar la petición a Aimeos en cuanto la vista se monta en pantalla
onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="grow">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-2xl font-black text-gray-900 uppercase tracking-tighter">
              Explora el <span class="text-teal-500">Catálogo</span>
            </h1>
            <span class="text-sm font-bold text-gray-400 uppercase">
              {{ productStore.products.length }} Productos encontrados
            </span>
          </div>

          <div v-if="productStore.error" class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-bold">
            {{ productStore.error }}
          </div>

          <FeaturedProductsSection 
            :products="productStore.products" 
            :is-loading="productStore.isLoading" 
          />
        </div>

  </template>