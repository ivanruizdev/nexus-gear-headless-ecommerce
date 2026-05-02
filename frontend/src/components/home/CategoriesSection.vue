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
  <section class="bg-slate-50 py-16" id="categories">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          EXPLORE <span class="text-blue-600">CATEGORIES</span>
        </h2>
        <p class="text-slate-600 mt-2 text-lg">Find the perfect gear for every part of your setup</p>
      </div>
      
      <!-- Grid using Tailwind v4 utility classes for a light, high-conversion look -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        
        <div 
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
          @click="selectCategory('audio')"
        >
          <div class="text-4xl text-slate-700 group-hover:text-blue-600 mb-4 transition-colors">
            <i class="fas fa-headphones"></i>
          </div>
          <div class="font-bold text-slate-900">Audio Nexus</div>
          <div class="text-sm text-slate-500 mt-1">85 products</div>
        </div>
        
        <div 
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
          @click="selectCategory('peripherals')"
        >
          <div class="text-4xl text-slate-700 group-hover:text-blue-600 mb-4 transition-colors">
            <i class="fas fa-keyboard"></i>
          </div>
          <div class="font-bold text-slate-900">Peripherals</div>
          <div class="text-sm text-slate-500 mt-1">120 products</div>
        </div>
        
        <div 
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
          @click="selectCategory('visual')"
        >
          <div class="text-4xl text-slate-700 group-hover:text-blue-600 mb-4 transition-colors">
            <i class="fas fa-desktop"></i>
          </div>
          <div class="font-bold text-slate-900">Visual Gear</div>
          <div class="text-sm text-slate-500 mt-1">65 products</div>
        </div>
        
        <div 
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
          @click="selectCategory('connection')"
        >
          <div class="text-4xl text-slate-700 group-hover:text-blue-600 mb-4 transition-colors">
            <i class="fas fa-plug"></i>
          </div>
          <div class="font-bold text-slate-900">Connection</div>
          <div class="text-sm text-slate-500 mt-1">45 products</div>
        </div>
        
        <div 
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
          @click="selectCategory('gaming')"
        >
          <div class="text-4xl text-slate-700 group-hover:text-blue-600 mb-4 transition-colors">
            <i class="fas fa-gamepad"></i>
          </div>
          <div class="font-bold text-slate-900">Gaming Pro</div>
          <div class="text-sm text-slate-500 mt-1">95 products</div>
        </div>
        
        <div 
          class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
          @click="selectCategory('streaming')"
        >
          <div class="text-4xl text-slate-700 group-hover:text-blue-600 mb-4 transition-colors">
            <i class="fas fa-video"></i>
          </div>
          <div class="font-bold text-slate-900">Streaming</div>
          <div class="text-sm text-slate-500 mt-1">70 products</div>
        </div>

      </div>
    </div>
  </section>
</template>