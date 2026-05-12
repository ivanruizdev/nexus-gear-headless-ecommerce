// File: src/stores/product.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '@/services/productService'

// Importamos la interfaz que ya habías definido para mantener el tipado estricto
import type { Product } from '@/components/home/FeaturedProductsSection.vue'

export const useProductStore = defineStore('product', () => {
  // Estado Reactivo (State)
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Acción para obtener el catálogo (Actions)
  const fetchProducts = async (params = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.getProducts(params)
      
      // TRADUCCIÓN JSON:API -> DUMB FRONTEND
      // Aimeos devuelve los datos dentro de un arreglo 'data', y cada item tiene 'attributes'
      products.value = response.data.map((item: any): Product => {
        const attrs = item.attributes
        return {
          id: item.id,
          // Nota: Las claves exactas (ej. 'product.label') dependen de la configuración de tu Aimeos.
          // Estas son las más comunes por defecto, pero podrías necesitar ajustarlas.
          name: attrs['product.label'] || 'Producto sin nombre',
          price: parseFloat(attrs['price.value'] || '0'),
          formattedPrice: `$${parseFloat(attrs['price.value'] || '0').toFixed(2)}`,
          category: attrs['product.type'] || 'General',
          imageUrl: attrs['media.url'] || '' // Aimeos suele mandar esto si incluyes 'include=media'
        }
      })
    } catch (e: any) {
      console.error('Error fetching catalog:', e)
      error.value = 'No se pudo cargar el catálogo. Intenta de nuevo más tarde.'
    } finally {
      isLoading.value = false
    }
  }

  return { 
    products, 
    currentProduct, 
    isLoading, 
    error, 
    fetchProducts 
  }
})