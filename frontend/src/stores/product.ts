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

        // Extraer URL de la Imagen
        const mediaItem = findRelation('media')
        const imageUrl = mediaItem ? mediaItem.attributes['media.url'] : ''

        // Extraer Título (Aimeos a veces deja 'product.label' vacío y usa la relación 'text')
        const textItem = findRelation('text')
        const title = attrs['product.label'] || (textItem ? textItem.attributes['text.content'] : `Nexus Gear #${item.id}`)

        return {
          id: item.id,
          name: title,
          price: priceValue,
          formattedPrice: `$${priceValue.toFixed(2)}`,
          category: attrs['product.type'] || 'General',
          imageUrl: imageUrl
        }
      })
    } catch (e: any) {
      console.error('Error fetching catalog:', e)
      error.value = 'No se pudo cargar el catálogo. Intenta de nuevo más tarde.'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * searchByVoice - Receives raw voice transcript, cleans filler words,
   * and fetches matching products from the Aimeos API using f[search].
   */
  const searchByVoice = async (text: string) => {
    // Remove common Spanish filler words before sending to the API
    const fillerWords = ['busca', 'buscar', 'necesito', 'quiero', 'muéstrame', 'dame', 'encuentra', 'ver']
    const pattern = new RegExp(`\\b(${fillerWords.join('|')})\\b`, 'gi')
    const cleanText = text.replace(pattern, '').trim()

    if (!cleanText) return

    // Call fetchProducts with Aimeos full-text search parameter
    await fetchProducts({ 'f[search]': cleanText })
  }

  return { products, currentProduct, isLoading, error, fetchProducts, searchByVoice }
})
