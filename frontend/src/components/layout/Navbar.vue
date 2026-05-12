<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/ui' // Importamos el gestor de estado global

const uiStore = useUiStore()

// Definimos los enlaces para mantener el template limpio
const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Productos', path: '/catalog' },
  { name: 'Categorías', path: '/categories' },
  { name: 'Comunidad', path: '/community' }
]
</script>

<template>
  <nav class="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-black text-gray-900 tracking-tighter leading-none">NEXUS <span class="text-teal-500">GEAR</span></span>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conecta tu equipo</span>
          </div>
        </RouterLink>

        <div class="hidden md:flex items-center gap-8">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            class="text-sm font-bold text-gray-600 hover:text-teal-500 transition-colors uppercase tracking-wide"
            active-class="text-teal-600"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          
          <button class="p-2.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>

          <button 
            @click="uiStore.toggleCart()"
            class="relative p-2.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span class="absolute top-1 right-1 w-4 h-4 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>

          <button 
            @click="uiStore.toggleProfile()"
            class="p-2.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </button>

          <button 
            @click="uiStore.toggleAiAssistant()"
            class="p-2.5 bg-gray-50 text-gray-400 hover:bg-teal-500 hover:text-white rounded-full transition-all"
            :class="{ 'bg-teal-500 text-white animate-pulse': uiStore.isListening }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          </button>

        </div>
      </div>
    </div>
  </nav>
</template>