// File: src/stores/product.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '@/services/productService'
import type { Product } from '@/components/home/FeaturedProductsSection.vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async (params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.getProducts(params)
      
      const items = response.data || []
      // Aimeos envía las relaciones (precios, imágenes) en este arreglo 'included'
      const included = response.included || []

      products.value = items.map((item: any): Product => {
        const attrs = item.attributes || {}

        // 🧠 FUNCIÓN HELPER: Busca relaciones en el arreglo 'included'
        const findRelation = (type: string) => {
          const relationData = item.relationships?.[type]?.data;
          if (!relationData) return null;
          
          // Puede ser un arreglo de relaciones o un solo objeto
          const id = Array.isArray(relationData) ? relationData[0]?.id : relationData.id;
          return included.find((inc: any) => inc.type === type && inc.id === id);
        }

        // Extraer Precio real
        const priceItem = findRelation('price')
        const priceValue = priceItem ? parseFloat(priceItem.attributes['price.value'] || '0') : 0

        // ----------------------------------------------------
        // LÓGICA REPARADA PARA LA IMAGEN HEADLESS
        // ----------------------------------------------------
        const mediaItem = findRelation('media')
        let rawImageUrl = mediaItem ? mediaItem.attributes['media.url'] : ''
        
        const backendBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace('/jsonapi', '')

        if (rawImageUrl && !rawImageUrl.startsWith('http')) {
          // 1. Asegurarnos de que empiece con slash "/"
          rawImageUrl = rawImageUrl.startsWith('/') ? rawImageUrl : `/${rawImageUrl}`
          
          // 2. EL PUENTE MÁGICO: Si la ruta no incluye la carpeta 'aimeos', se la agregamos
          if (!rawImageUrl.startsWith('/aimeos/')) {
            rawImageUrl = `/aimeos${rawImageUrl}`
          }
          
          // 3. Ensamblar la URL completa
          rawImageUrl = `${backendBaseUrl}${rawImageUrl}`
        }
        // ----------------------------------------------------

        const textItem = findRelation('text')
        const title = attrs['product.label'] || (textItem ? textItem.attributes['text.content'] : `Nexus Gear #${item.id}`)

        return {
          id: item.id,
          name: title,
          price: priceValue,
          formattedPrice: `$${priceValue.toFixed(2)}`,
          category: attrs['product.type'] || 'General',
          imageUrl: rawImageUrl
        }
      })
    } catch (e: any) {
      console.error('Error fetching catalog:', e)
      error.value = 'No se pudo cargar el catálogo. Intenta de nuevo más tarde.'
    } finally {
      isLoading.value = false
    }
  }

  return { products, currentProduct, isLoading, error, fetchProducts }
})