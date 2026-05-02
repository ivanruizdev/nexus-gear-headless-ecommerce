<!-- File: src/views/NotFoundView.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="min-h-[70vh] bg-surface-base flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
    <div class="text-center max-w-lg mx-auto">
      
      <!-- Thematic 404 SVG (Broken Connection) -->
      <div class="flex justify-center mb-8">
        <div class="relative">
          <svg class="w-32 h-32 text-black/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <svg class="w-12 h-12 text-status-error absolute bottom-0 right-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <h1 class="text-6xl font-black text-brand-primary font-orbitron tracking-tight mb-2">404</h1>
      <h2 class="text-2xl font-bold text-text-main mb-4 uppercase tracking-wider">Connection Lost</h2>
      
      <p class="text-text-muted mb-10 text-base leading-relaxed">
        The hardware or page you are looking for has been disconnected from the Nexus network. It might have been moved or no longer exists.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink 
          to="/" 
          class="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return Home
        </RouterLink>
        
        <RouterLink 
          to="/catalog" 
          class="bg-white border-2 border-black/10 hover:border-black/20 hover:bg-surface-base text-text-main font-bold py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Browse Catalog
        </RouterLink>
      </div>

    </div>
  </main>
</template>