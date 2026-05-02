<!-- File: src/components/home/FeaturesSection.vue -->
<script setup lang="ts">
// This is a purely presentational component.
// No props or emits are required for static marketing content.
</script>

<template>
  <section class="bg-slate-50 py-16 border-t border-slate-200" id="features">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          NEXUS <span class="text-blue-600">FEATURES</span>
        </h2>
        <p class="text-slate-600 mt-2 text-lg">Discover the technologies that make Nexus Gear unique</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Feature 1: Nexus AI Assistant -->
        <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">
            <i class="fas fa-robot"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-xl mb-3">Nexus AI Assistant</h3>
          <p class="text-slate-600 leading-relaxed">
            Intelligent assistant that learns your habits and suggests products, custom configurations, and personalized offers.
          </p>
        </div>
        
        <!-- Feature 2: Voice Control -->
        <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">
            <i class="fas fa-microphone"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-xl mb-3">Voice Control</h3>
          <p class="text-slate-600 leading-relaxed">
            Navigate, search, and buy using voice commands. Compatible with multiple languages and regional dialects.
          </p>
        </div>
        
        <!-- Feature 3: Sync Ecosystem -->
        <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">
            <i class="fas fa-sync-alt"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-xl mb-3">Sync Ecosystem</h3>
          <p class="text-slate-600 leading-relaxed">
            All Nexus products connect seamlessly to each other, creating a unified and synchronized setup environment.
          </p>
        </div>
        
        <!-- Feature 4: Setup Optimizer -->
        <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">
            <i class="fas fa-bolt"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-xl mb-3">Setup Optimizer</h3>
          <p class="text-slate-600 leading-relaxed">
            Analyzes your current setup and suggests targeted improvements based on performance, aesthetics, and budget.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>