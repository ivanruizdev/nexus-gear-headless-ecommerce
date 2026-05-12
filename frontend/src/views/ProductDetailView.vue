<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Recibimos el slug desde la URL gracias a 'props: true' en el router
const props = defineProps<{
  slug: string
}>()

const quantity = ref(1)

// Mock Data: En el futuro, esto vendrá de useProductStore (Pinia) llamando a Aimeos
const product = ref({
  id: 'p-101',
  name: 'Nexus Quantum Display 32"',
  category: 'Visual',
  price: 449.99,
  formattedPrice: '$449.99',
  description: 'Eleva tu productividad al siguiente nivel con el panel IPS de última generación. Resolución 4K nativa, 144Hz de refresco y una precisión de color del 99% sRGB diseñada para creadores y profesionales del futuro.',
  features: [
    'Resolución 4K Ultra HD (3840 x 2160)',
    'Tasa de refresco de 144Hz',
    'HDR10 + Certificación VESA',
    'Conectividad USB-C con carga de 65W'
  ],
  specs: {
    'Panel': 'IPS de 10 bits',
    'Brillo': '400 nits',
    'Contraste': '1000:1',
    'Tiempo de respuesta': '1ms GTG'
  },
  images: [
    'https://via.placeholder.com/600x600/f3f4f6/94a3b8?text=Nexus+Quantum+Main',
    'https://via.placeholder.com/600x600/f3f4f6/94a3b8?text=Angle+View',
    'https://via.placeholder.com/600x600/f3f4f6/94a3b8?text=Ports'
  ]
})

const activeImage = ref(product.value.images[0])
</script>

<template>
  <div class="bg-white min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <nav class="flex mb-8 text-sm font-bold uppercase tracking-widest text-gray-400">
        <RouterLink to="/" class="hover:text-teal-500">Inicio</RouterLink>
        <span class="mx-2">/</span>
        <RouterLink to="/catalog" class="hover:text-teal-500">Catálogo</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        <div class="space-y-4">
          <div class="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
            <img :src="activeImage" :alt="product.name" class="w-full h-full object-contain p-8" />
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button 
              v-for="img in product.images" 
              :key="img"
              @click="activeImage = img"
              class="aspect-square rounded-2xl border-2 overflow-hidden bg-gray-50 transition-all"
              :class="activeImage === img ? 'border-teal-500 shadow-md' : 'border-transparent hover:border-gray-200'"
            >
              <img :src="img" class="w-full h-full object-cover p-2" />
            </button>
          </div>
        </div>

        <div class="flex flex-col">
          <span class="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-xs font-black uppercase tracking-widest rounded-full self-start mb-4">
            {{ product.category }}
          </span>
          
          <h1 class="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-tight">
            {{ product.name }}
          </h1>
          
          <div class="text-3xl font-black text-gray-900 mb-6">
            {{ product.formattedPrice }}
          </div>

          <p class="text-gray-500 leading-relaxed mb-8 text-lg">
            {{ product.description }}
          </p>

          <ul class="space-y-3 mb-10">
            <li v-for="feat in product.features" :key="feat" class="flex items-center text-sm font-bold text-gray-700">
              <svg class="w-5 h-5 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              {{ feat }}
            </li>
          </ul>

          <div class="flex flex-col sm:flex-row gap-4 mb-10">
            <div class="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-gray-50">
              <button @click="quantity > 1 && quantity--" class="w-12 h-12 flex items-center justify-center font-bold text-gray-500 hover:text-teal-600">-</button>
              <span class="w-12 text-center font-black text-gray-900">{{ quantity }}</span>
              <button @click="quantity++" class="w-12 h-12 flex items-center justify-center font-bold text-gray-500 hover:text-teal-600">+</button>
            </div>
            
            <button class="grow bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-teal-500/20 transform transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-tighter">
              Añadir al Carrito
            </button>
          </div>

          <div class="border-t border-gray-100 pt-8">
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Especificaciones Técnicas</h3>
            <div class="grid grid-cols-2 gap-x-8 gap-y-4">
              <div v-for="(value, key) in product.specs" :key="key" class="flex flex-col border-b border-gray-50 pb-2">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ key }}</span>
                <span class="text-sm font-bold text-gray-700">{{ value }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>