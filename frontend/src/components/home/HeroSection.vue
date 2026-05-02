<!-- File: src/components/home/HeroSection.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Emits for the Voice Assistant interaction (Web 4.0)
const emit = defineEmits<{
  (e: 'start-voice'): void
}>()

const handleVoiceActivation = () => {
  console.log('Hero: Triggering voice assistant overlay')
  emit('start-voice')
}
</script>

<template>
  <section class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-surface-base">
    
    <!-- Background abstract decorative elements -->
    <div class="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/20 blur-3xl"></div>
      <div class="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-brand-secondary/10 blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      
      <!-- Subtitle -->
      <h2 class="text-sm md:text-base font-bold tracking-[0.2em] text-brand-secondary uppercase mb-4">
        Next-Generation Setup
      </h2>
      
      <!-- Main Title -->
      <h1 class="font-orbitron text-5xl md:text-7xl font-black mb-6 tracking-tight text-text-main">
        CONNECT YOUR <br class="hidden md:block" />
        <span class="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
          GEAR TO THE FUTURE
        </span>
      </h1>
      
      <!-- Description -->
      <p class="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text-muted leading-relaxed">
        The ultimate platform for gamers, creators, and tech professionals. 
        Experience a smart ecosystem with predictive recommendations and Web 4.0 voice control.
      </p>
      
      <!-- High-Conversion Actions -->
      <div class="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <!-- Primary CTA: Catalog -->
        <RouterLink 
          to="/catalog" 
          class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide text-sm"
        >
          Explore Products
        </RouterLink>
        
        <!-- Secondary CTA: Voice Assistant (Accent color) -->
        <button 
          @click="handleVoiceActivation"
          class="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-main border border-black/10 font-bold rounded-full shadow-md hover:shadow-lg hover:border-brand-accent/50 hover:text-brand-accent transition-all duration-300 uppercase tracking-wide text-sm group"
        >
          <svg class="w-5 h-5 text-brand-accent group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Try Nexus Voice
        </button>
      </div>

      <!-- Trust Indicators / Stats -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-black/5 pt-10">
        <div class="flex flex-col items-center">
          <span class="text-3xl font-orbitron font-bold text-brand-primary">500+</span>
          <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Premium Items</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-orbitron font-bold text-brand-primary">15K+</span>
          <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Connected Users</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="flex items-center text-3xl font-orbitron font-bold text-brand-primary">
            4.9
            <svg class="w-6 h-6 text-brand-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
          <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Nexus Rating</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-orbitron font-bold text-brand-primary">24/7</span>
          <span class="text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">AI Support</span>
        </div>
      </div>

    </div>
  </section>
</template>