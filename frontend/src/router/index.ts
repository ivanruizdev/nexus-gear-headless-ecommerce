// File: src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Define the routes for the SPA
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // Eagerly loaded for the landing page to prevent layout shifts
    component: HomeView,
  },
  {
    path: '/catalog',
    name: 'catalog',
    // Lazy-loaded route: chunk is only requested when the user visits /catalog
    component: () => import('../views/CatalogView.vue'),
  },
  {
    // Catch-all fallback for 404s
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // FIX: Pass the defined routes array instead of an empty array []
  routes,
  // Ensure the page scrolls to the top when navigating to a new route
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
