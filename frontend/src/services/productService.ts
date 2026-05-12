// File: src/services/productService.ts
import api from './api';

export const productService = {
  async getProducts(params: any = {}) {
    // Forzamos a Aimeos a incluir las relaciones críticas
    const defaultParams = { 
      include: 'media,price,text', 
      ...params 
    };
    
    const response = await api.get('/product', { params: defaultParams });
    return response.data;
  },

  async getProductBySlug(slug: string) {
    const response = await api.get(`/product/${slug}`, {
      params: {
        include: 'media,text,price,stock'
      }
    });
    return response.data;
  }
};