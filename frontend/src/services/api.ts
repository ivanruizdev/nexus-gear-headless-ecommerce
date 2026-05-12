// File: src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // URL base de tu instancia de Aimeos
  // En desarrollo local con Docker, suele ser la IP del host o un dominio local
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/jsonapi',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejo de errores global (opcional pero recomendado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;