<!-- File: src/components/home/CategoriesSection.vue -->
<script setup lang="ts">
// We define the events this component can emit to its parent
const emit = defineEmits<{
  (e: 'filterSelected', categorySlug: string): void
}>()

// Dumb function that just passes the action up to the parent view
const selectCategory = (categorySlug: string) => {
  emit('filterSelected', categorySlug)
}
</script>

<template>
  <section class="bg-surface-card py-20" id="categories">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-orbitron">
          EXPLORE <span class="text-brand-primary">CATEGORIES</span>
        </h2>
        <p class="text-text-muted mt-4 text-lg">Find the perfect gear for every part of your setup</p>
      </div>
      
      <!-- Grid using Tailwind v4 utility classes for a light, high-conversion look -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        
        <div 
          class="bg-surface-base rounded-2xl border border-black/5 p-8 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 group"
          @click="selectCategory('audio')"
        >
          <div class="text-black/30 group-hover:text-brand-primary mb-4 transition-colors flex justify-center">
            <!-- Headphones SVG -->
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
          </div>
          <div class="font-bold text-text-main text-lg group-hover:text-brand-primary transition-colors">Audio Nexus</div>
          <div class="text-xs text-text-muted mt-2 font-medium uppercase tracking-wider">85 products</div>
        </div>
        
        <div 
          class="bg-surface-base rounded-2xl border border-black/5 p-8 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 group"
          @click="selectCategory('peripherals')"
        >
          <div class="text-black/30 group-hover:text-brand-primary mb-4 transition-colors flex justify-center">
            <!-- Keyboard SVG -->
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <div class="font-bold text-text-main text-lg group-hover:text-brand-primary transition-colors">Peripherals</div>
          <div class="text-xs text-text-muted mt-2 font-medium uppercase tracking-wider">120 products</div>
        </div>
        
        <div 
          class="bg-surface-base rounded-2xl border border-black/5 p-8 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 group"
          @click="selectCategory('visual')"
        >
          <div class="text-black/30 group-hover:text-brand-primary mb-4 transition-colors flex justify-center">
            <!-- Monitor SVG -->
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <div class="font-bold text-text-main text-lg group-hover:text-brand-primary transition-colors">Visual Gear</div>
          <div class="text-xs text-text-muted mt-2 font-medium uppercase tracking-wider">65 products</div>
        </div>
        
        <div 
          class="bg-surface-base rounded-2xl border border-black/5 p-8 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 group"
          @click="selectCategory('connection')"
        >
          <div class="text-black/30 group-hover:text-brand-primary mb-4 transition-colors flex justify-center">
            <!-- Plug SVG -->
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div class="font-bold text-text-main text-lg group-hover:text-brand-primary transition-colors">Connection</div>
          <div class="text-xs text-text-muted mt-2 font-medium uppercase tracking-wider">45 products</div>
        </div>
        
        <div 
          class="bg-surface-base rounded-2xl border border-black/5 p-8 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 group"
          @click="selectCategory('gaming')"
        >
          <div class="text-black/30 group-hover:text-brand-primary mb-4 transition-colors flex justify-center">
            <!-- Gamepad SVG -->
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div class="font-bold text-text-main text-lg group-hover:text-brand-primary transition-colors">Gaming Pro</div>
          <div class="text-xs text-text-muted mt-2 font-medium uppercase tracking-wider">95 products</div>
        </div>
        
        <div 
          class="bg-surface-base rounded-2xl border border-black/5 p-8 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/30 group"
          @click="selectCategory('streaming')"
        >
          <div class="text-black/30 group-hover:text-brand-primary mb-4 transition-colors flex justify-center">
            <!-- Video/Camera SVG -->
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </div>
          <div class="font-bold text-text-main text-lg group-hover:text-brand-primary transition-colors">Streaming</div>
          <div class="text-xs text-text-muted mt-2 font-medium uppercase tracking-wider">70 products</div>
        </div>

      </div>
    </div>
  </section>
</template>