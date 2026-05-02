<!-- File: src/components/ui/GlobalLoader.vue -->
<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <!-- Full screen overlay, high z-index to cover everything -->
  <div 
    v-if="isLoading" 
    class="fixed inset-0 z-[100] bg-surface-base flex flex-col items-center justify-center transition-opacity duration-300"
    role="alert" 
    aria-busy="true"
  >
    <div class="text-center flex flex-col items-center">
      
      <!-- Logo & Brand Name -->
      <div class="text-4xl md:text-5xl text-text-main mb-8 font-extrabold tracking-tight flex items-center justify-center gap-3 font-orbitron">
        <svg class="w-10 h-10 text-brand-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>NEXUS <span class="text-brand-primary">GEAR</span></span>
      </div>
      
      <!-- Subtitle -->
      <div class="text-brand-secondary text-sm font-bold mb-5 tracking-[0.3em] uppercase animate-pulse">
        Synchronizing ecosystem...
      </div>
      
      <!-- Progress Bar Container -->
      <div class="w-64 h-1.5 bg-black/10 mx-auto rounded-full overflow-hidden relative">
        <!-- Indeterminate loading animation -->
        <div class="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full animate-progress-indeterminate"></div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); width: 50%; }
  100% { transform: translateX(200%); width: 50%; }
}
.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s infinite linear;
}
</style>