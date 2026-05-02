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
    class="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center transition-opacity duration-300"
    role="alert" 
    aria-busy="true"
  >
    <div class="text-center">
      <div class="text-5xl text-slate-900 mb-8 font-extrabold tracking-tight flex items-center justify-center gap-3">
        <i class="fas fa-link text-blue-600"></i>
        <span>NEXUS GEAR</span>
      </div>
      
      <div class="text-blue-600 text-xl font-bold mb-5 tracking-widest animate-pulse">
        CONNECTING...
      </div>
      
      <!-- Progress Bar Container -->
      <div class="w-64 h-1.5 bg-slate-200 mx-auto rounded-full overflow-hidden">
        <!-- Indeterminate loading animation -->
        <div class="h-full bg-blue-600 rounded-full animate-progress-indeterminate"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add a custom animation for the indeterminate progress bar in your global CSS or here */
@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); width: 50%; }
  100% { transform: translateX(200%); width: 50%; }
}
.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s infinite linear;
}
</style>