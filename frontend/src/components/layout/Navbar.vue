<!-- File: src/components/layout/Navbar.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Temporary local state (to be moved to Pinia later)
const cartItemCount = ref(0)
const isSearchOpen = ref(false)

// Action Handlers
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  console.log('Search toggled')
}

const openCart = () => {
  console.log('Emitting open cart event')
  // We will emit this to App.vue or trigger Pinia later
}

const toggleUserMenu = () => {
  console.log('Toggling user profile menu')
}

const startVoiceAssistant = () => {
  console.log('Starting Web 4.0 Voice Assistant')
}
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        
        <!-- LOGO -->
        <RouterLink to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <!-- Inline SVG replacing FontAwesome link icon -->
          <svg class="w-8 h-8 text-brand-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <div class="flex flex-col">
            <span class="font-orbitron text-2xl font-extrabold text-gradient tracking-wide">NEXUS GEAR</span>
            <span class="text-[0.65rem] text-brand-secondary font-bold tracking-[0.2em] leading-none">CONECTA TU EQUIPO</span>
          </div>
        </RouterLink>

        <!-- MAIN NAVIGATION -->
        <nav class="hidden md:flex gap-2 lg:gap-6">
          <RouterLink to="/" class="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-text-main hover:text-brand-primary hover:bg-brand-primary/10 transition-all">
            Inicio
          </RouterLink>
          <RouterLink to="/catalog" class="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-text-main hover:text-brand-primary hover:bg-brand-primary/10 transition-all">
            Productos
          </RouterLink>
          <RouterLink to="/categories" class="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-text-main hover:text-brand-primary hover:bg-brand-primary/10 transition-all">
            Categorías
          </RouterLink>
          <RouterLink to="/community" class="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-text-main hover:text-brand-primary hover:bg-brand-primary/10 transition-all">
            Comunidad
          </RouterLink>
        </nav>

        <!-- USER CONTROLS -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button @click="toggleSearch" class="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary/10 text-text-main border border-brand-primary/20 hover:bg-brand-primary/20 hover:text-brand-primary hover:scale-105 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          
          <!-- Cart -->
          <button @click="openCart" class="relative w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary/10 text-text-main border border-brand-primary/20 hover:bg-brand-primary/20 hover:text-brand-primary hover:scale-105 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span v-if="cartItemCount > 0" class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-brand-accent text-white text-[0.65rem] font-bold rounded-full shadow-[0_0_8px_rgba(123,44,191,0.5)]">
              {{ cartItemCount }}
            </span>
          </button>
          
          <!-- Profile -->
          <button @click="toggleUserMenu" class="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary/10 text-text-main border border-brand-primary/20 hover:bg-brand-primary/20 hover:text-brand-primary hover:scale-105 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
          
          <!-- Voice Assistant (Web 4.0 Focus) -->
          <button @click="startVoiceAssistant" class="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10 text-text-main border border-brand-accent/30 hover:bg-brand-accent/20 hover:text-brand-accent hover:scale-105 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>