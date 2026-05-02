<!-- File: src/components/home/FeaturesSection.vue -->
<script setup lang="ts">
// Purely presentational component.
</script>

<template>
  <section class="bg-surface-card py-20 border-t border-black/5" id="features">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-orbitron">
          NEXUS <span class="text-brand-primary">FEATURES</span>
        </h2>
        <p class="text-text-muted mt-4 text-lg max-w-2xl mx-auto">
          Discover the technologies that make Nexus Gear a true Web 4.0 ecosystem.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Feature 1: Nexus AI Assistant -->
        <div class="bg-surface-base p-8 rounded-2xl border border-black/5 hover:border-brand-primary/30 hover:shadow-md transition-all group">
          <div class="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <!-- Robot SVG -->
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="font-bold text-text-main text-xl mb-3">Nexus AI Assistant</h3>
          <p class="text-text-muted text-sm leading-relaxed">
            Intelligent assistant that learns your habits and suggests products, custom configurations, and personalized offers.
          </p>
        </div>
        
        <!-- Feature 2: Voice Control -->
        <div class="bg-surface-base p-8 rounded-2xl border border-black/5 hover:border-brand-primary/30 hover:shadow-md transition-all group">
          <div class="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <!-- Microphone SVG -->
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          </div>
          <h3 class="font-bold text-text-main text-xl mb-3">Voice Control</h3>
          <p class="text-text-muted text-sm leading-relaxed">
            Navigate, search, and buy using voice commands. Experience the true frictionless shopping of Web 4.0.
          </p>
        </div>
        
        <!-- Feature 3: Sync Ecosystem -->
        <div class="bg-surface-base p-8 rounded-2xl border border-black/5 hover:border-brand-primary/30 hover:shadow-md transition-all group">
          <div class="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <!-- Sync/Refresh SVG -->
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </div>
          <h3 class="font-bold text-text-main text-xl mb-3">Sync Ecosystem</h3>
          <p class="text-text-muted text-sm leading-relaxed">
            All Nexus products connect seamlessly to each other, creating a unified and synchronized setup environment.
          </p>
        </div>
        
        <!-- Feature 4: Setup Optimizer -->
        <div class="bg-surface-base p-8 rounded-2xl border border-black/5 hover:border-brand-primary/30 hover:shadow-md transition-all group">
          <div class="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <!-- Bolt/Lightning SVG -->
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 class="font-bold text-text-main text-xl mb-3">Setup Optimizer</h3>
          <p class="text-text-muted text-sm leading-relaxed">
            Analyzes your current setup and suggests targeted improvements based on performance, aesthetics, and budget.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>