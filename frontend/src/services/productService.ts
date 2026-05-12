// File: src/services/productService.ts
import api from './api';

export const productService = {
  // Obtener lista de productos con filtros opcionales
  async getProducts(params = {}) {
    // Aimeos usa parámetros como ?filter[f_search]=... o ?include=media,text,price
    const response = await api.get('/product', { params });
    return response.data;
  },

  // Obtener un solo producto por su ID o código
  async getProductBySlug(slug: string) {
    const response = await api.get(`/product/${slug}`, {
      params: {
        include: 'media,text,price,stock' // Pedimos datos extra que Aimeos no envía por defecto
      }
    });
    return response.data;
  }
};