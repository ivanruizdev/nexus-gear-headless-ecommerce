// File: src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView 
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    // Ruta dinámica para categorías específicas
    path: '/category/:slug',
    name: 'category',
    component: () => import('../views/CategoryView.vue'),
    props: true // Permite pasar el slug como prop al componente
  },
  {
    // Ruta dinámica para el detalle del producto
    path: '/product/:slug',
    name: 'product-detail',
    component: () => import('../views/ProductDetailView.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

export default router
