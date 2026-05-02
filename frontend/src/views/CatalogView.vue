<!-- File: src/views/CatalogView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
// In a real scenario, we will import the Pinia store here
// import { useCatalogStore } from '../stores/catalog'

// Temporary local state for layout building
const isLoading = ref(true)

// Simulate network request for layout demonstration
setTimeout(() => {
  isLoading.value = false
}, 1500)
</script>

<template>
  <div class="bg-surface-base min-h-screen pt-8 pb-20">
    
    <!-- Page Header -->
    <div class="bg-white border-b border-black/5 py-8 mb-8 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-text-main font-orbitron tracking-tight">NEXUS <span class="text-brand-primary">CATALOG</span></h1>
          <p class="text-text-muted text-sm mt-1">Explore our entire collection of Web 4.0 ready gear.</p>
        </div>
        
        <!-- Quick Sorting (Placeholder) -->
        <div class="flex items-center gap-3">
          <label for="sort" class="text-xs font-bold text-text-muted uppercase tracking-wider">Sort by</label>
          <select id="sort" class="bg-surface-base border border-black/10 rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-primary/30">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar: Filters (Skeleton) -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <div class="bg-surface-card rounded-2xl border border-black/5 p-6 shadow-sm sticky top-24">
            <div class="flex items-center gap-2 mb-6 border-b border-black/5 pb-4">
              <svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h3 class="font-bold text-text-main uppercase tracking-wider">Filters</h3>
            </div>
            
            <!-- Category Filter Skeleton -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-text-main mb-3">Categories</h4>
              <div class="space-y-2">
                <div v-for="i in 5" :key="i" class="flex items-center gap-3">
                  <div class="w-4 h-4 rounded border border-black/20 bg-surface-base"></div>
                  <div class="h-4 bg-black/5 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            <!-- Price Filter Skeleton -->
            <div>
              <h4 class="text-sm font-bold text-text-main mb-3">Price Range</h4>
              <div class="h-2 bg-black/10 rounded-full w-full mb-4"></div>
              <div class="flex justify-between">
                <div class="h-6 bg-black/5 rounded w-16"></div>
                <div class="h-6 bg-black/5 rounded w-16"></div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <main class="flex-1">
          <!-- Loading State -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-surface-card rounded-2xl border border-black/5 p-4 animate-pulse">
              <div class="bg-black/5 aspect-square rounded-xl mb-4"></div>
              <div class="h-5 bg-black/10 rounded w-3/4 mb-3"></div>
              <div class="h-6 bg-brand-primary/20 rounded w-1/3 mb-6"></div>
              <div class="h-10 bg-black/5 rounded-xl w-full"></div>
            </div>
          </div>

          <!-- Empty/Ready State (To be replaced by actual products component later) -->
          <div v-else class="text-center py-20 bg-surface-card rounded-2xl border border-black/5 shadow-sm">
            <svg class="w-16 h-16 text-black/10 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 class="text-lg font-bold text-text-main mb-2">Catalog Ready</h3>
            <p class="text-text-muted text-sm">Waiting for Pinia integration to load products from Aimeos.</p>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>