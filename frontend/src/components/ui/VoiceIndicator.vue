<!-- File: src/components/ui/VoiceIndicator.vue -->
<script setup lang="ts">
defineProps<{
  isListening: boolean;
}>();
</script>

<template>
  <div 
    v-show="isListening"
    class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[90] bg-surface-card border border-brand-accent/30 shadow-lg rounded-full px-5 py-2.5 flex items-center gap-3 transition-all duration-300"
    role="status"
  >
    <!-- Pulsing Microphone Icon (Brand Accent for Web 4.0 logic) -->
    <div class="w-8 h-8 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center animate-pulse">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
    </div>
    
    <!-- Status Text & Visualizer -->
    <div class="flex-1 min-w-0">
      <div class="text-[0.65rem] font-bold text-text-main uppercase tracking-widest font-orbitron">Nexus Voice</div>
      <div class="text-xs text-text-muted">Listening to your command...</div>
    </div>
    
    <!-- Simple CSS Audio Visualizer -->
    <div class="flex items-end gap-1 h-5 ml-2">
      <div class="w-1 bg-brand-accent rounded-t-sm animate-sound-wave" style="animation-delay: 0.1s;"></div>
      <div class="w-1 bg-brand-accent rounded-t-sm animate-sound-wave" style="animation-delay: 0.3s;"></div>
      <div class="w-1 bg-brand-accent rounded-t-sm animate-sound-wave" style="animation-delay: 0.2s;"></div>
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