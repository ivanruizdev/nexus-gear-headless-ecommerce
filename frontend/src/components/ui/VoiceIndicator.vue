<!-- File: src/components/ui/VoiceIndicator.vue -->
<script setup lang="ts">
defineProps<{
  isListening: boolean;
}>();
</script>

<template>
  <div 
    v-show="isListening"
    class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[90] bg-white border border-blue-200 shadow-lg rounded-full px-5 py-2.5 flex items-center gap-3 transition-all duration-300"
    role="status"
  >
    <!-- Pulsing Microphone Icon -->
    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse">
      <i class="fas fa-microphone"></i>
    </div>
    
    <!-- Status Text & Visualizer -->
    <div class="flex-1 min-w-0">
      <div class="text-xs font-bold text-slate-900 uppercase tracking-wider">Microphone</div>
      <div class="text-sm text-slate-500">Listening to your command...</div>
    </div>
    
    <!-- Simple CSS Audio Visualizer -->
    <div class="flex items-end gap-1 h-5 ml-2">
      <div class="w-1 bg-blue-500 rounded-t-sm animate-sound-wave" style="animation-delay: 0.1s;"></div>
      <div class="w-1 bg-blue-500 rounded-t-sm animate-sound-wave" style="animation-delay: 0.3s;"></div>
      <div class="w-1 bg-blue-500 rounded-t-sm animate-sound-wave" style="animation-delay: 0.2s;"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes sound-wave {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}
.animate-sound-wave {
  animation: sound-wave 0.8s infinite ease-in-out;
}
</style>