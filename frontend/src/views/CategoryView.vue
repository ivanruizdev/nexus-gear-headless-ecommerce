<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection.vue'

// Recibimos el slug de la categoría desde la URL
const props = defineProps<{
  slug: string
}>()

// Mock Data: Información dinámica basada en el slug de la URL
// En la Fase 3, esto se consultará directamente a Aimeos vía Pinia
const categoryData = computed(() => {
  const categories: Record<string, { name: string, description: string, color: string }> = {
    'audio': { 
      name: 'Audio Profesional', 
      description: 'Monitores de estudio, auriculares de alta fidelidad y micrófonos de condensador para creadores exigentes.',
      color: 'bg-indigo-50 text-indigo-600'
    },
    'connectivity': { 
      name: 'Conectividad', 
      description: 'Hubs Thunderbolt, cables trenzados y routers de latencia cero para mantener tu ecosistema fluyendo.',
      color: 'bg-blue-50 text-blue-600'
    },
    'keyboards': { 
      name: 'Teclados y Switches', 
      description: 'Domina cada pulsación con nuestra selección de teclados mecánicos, switches custom y keycaps PBT.',
      color: 'bg-rose-50 text-rose-600'
    },
    'productivity': { 
      name: 'Productividad', 
      description: 'Monitores ultrawide, brazos ergonómicos y accesorios diseñados para optimizar tu espacio de trabajo.',
      color: 'bg-emerald-50 text-emerald-600'
    }
  }
  
  // Fallback por si la categoría no está en el diccionario temporal
  return categories[props.slug] || { 
    name: 'Categoría', 
    description: 'Explora nuestra selección premium de productos para tu setup.',
    color: 'bg-teal-50 text-teal-600'
  }
})
</script>

<template>
  <div class="bg-surface-base min-h-screen pb-12">
    
    <div class="bg-white border-b border-gray-100 pt-12 pb-16 mb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <nav class="flex justify-center mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
          <RouterLink to="/" class="hover:text-teal-500">Inicio</RouterLink>
          <span class="mx-2">/</span>
          <RouterLink to="/catalog" class="hover:text-teal-500">Catálogo</RouterLink>
          <span class="mx-2">/</span>
          <span class="text-gray-900">{{ categoryData.name }}</span>
        </nav>

        <div 
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          :class="categoryData.color"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
          {{ categoryData.name }}
        </h1>
        <p class="text-lg text-gray-500 max-w-2xl mx-auto">
          {{ categoryData.description }}
        </p>

      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-black text-gray-900 uppercase tracking-tighter">
          Resultados de <span class="text-teal-500">{{ categoryData.name }}</span>
        </h2>
        
        <select class="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:border-teal-500 cursor-pointer">
          <option>Más recientes</option>
          <option>Precio: Menor a Mayor</option>
          <option>Precio: Mayor a Menor</option>
        </select>
      </div>

      <FeaturedProductsSection :products="[]" :is-loading="false" />
    </div>

  </div>
</template>