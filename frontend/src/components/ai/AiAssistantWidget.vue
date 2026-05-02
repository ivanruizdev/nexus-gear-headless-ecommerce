<!-- File: src/components/ai/AiAssistantWidget.vue -->
<script setup lang="ts">
import { ref } from 'vue';

// 1. Define the message structure
export interface AiMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

// 2. Define props
defineProps<{
  isOpen: boolean;
  messages: AiMessage[];
  isListening?: boolean;
}>();

// 3. Define emits for parent communication
const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'close'): void;
  (e: 'startVoice'): void;
  (e: 'sendQuery', query: string): void;
}>();

// Local state for the text input
const textInput = ref('');

// Handler for sending text queries
const handleSend = () => {
  if (textInput.value.trim()) {
    emit('sendQuery', textInput.value);
    textInput.value = ''; // Clear input after sending
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    
    <!-- Chat Window -->
    <div 
      v-show="isOpen" 
      class="bg-surface-card w-80 sm:w-[22rem] rounded-2xl shadow-2xl border border-brand-accent/20 overflow-hidden mb-4 transition-all transform origin-bottom-right flex flex-col"
      style="height: 550px; max-height: calc(100vh - 120px);"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-brand-accent to-brand-primary px-5 py-4 flex justify-between items-center text-white shadow-sm z-10">
        <div class="flex items-center gap-2 font-bold font-orbitron tracking-wide">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          <span>NEXUS ASSISTANT</span>
        </div>
        <button 
          @click="emit('close')" 
          class="text-white/80 hover:text-white hover:rotate-90 transition-all rounded-full p-1"
          aria-label="Close Assistant"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 bg-surface-base space-y-4">
        <!-- Empty State / Welcome -->
        <div v-if="messages.length === 0" class="text-center text-text-muted my-10">
          <div class="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-accent/20 shadow-[0_0_15px_rgba(123,44,191,0.15)]">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <p class="font-bold text-text-main text-lg">How can I help you today?</p>
          <p class="text-sm mt-2 max-w-[200px] mx-auto">Try asking for recommendations or use Web 4.0 voice commands.</p>
        </div>

        <!-- Render Messages -->
        <div 
          v-for="msg in messages" 
          :key="msg.id"
          class="flex w-full"
          :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm"
            :class="msg.sender === 'user' 
              ? 'bg-brand-primary text-white rounded-br-none' 
              : 'bg-surface-card border border-black/5 text-text-main rounded-bl-none'"
          >
            {{ msg.text }}
          </div>
        </div>
        
        <!-- Listening / Typing Indicator -->
        <div v-if="isListening" class="flex justify-start">
          <div class="bg-surface-card border border-brand-accent/20 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1.5 items-center">
            <span class="w-2.5 h-2.5 bg-brand-accent rounded-full animate-bounce"></span>
            <span class="w-2.5 h-2.5 bg-brand-accent rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
            <span class="w-2.5 h-2.5 bg-brand-accent rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-surface-card border-t border-black/5">
        <div class="flex gap-2 items-center">
          
          <!-- Voice Button (Web 4.0) -->
          <button 
            @click="emit('startVoice')"
            class="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-colors border"
            :class="isListening ? 'bg-status-error/10 text-status-error border-status-error/30 animate-pulse' : 'bg-surface-base text-brand-accent border-black/5 hover:bg-brand-accent/10 hover:border-brand-accent/30'"
            :title="isListening ? 'Stop listening' : 'Start voice command'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          </button>
          
          <!-- Text Input -->
          <input 
            type="text" 
            v-model="textInput"
            @keyup.enter="handleSend"
            placeholder="Ask Nexus Assistant..." 
            class="flex-1 bg-surface-base border border-black/5 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-accent/50 outline-none text-text-main"
            :disabled="isListening"
          />
          
          <!-- Send Button -->
          <button 
            @click="handleSend"
            class="w-10 h-10 flex-shrink-0 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            :disabled="!textInput.trim() || isListening"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Action Button (FAB) -->
    <button 
      @click="emit('toggle')"
      class="w-14 h-14 bg-brand-accent text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center relative z-20"
      aria-label="Toggle AI Assistant"
    >
      <svg v-if="isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      
      <!-- Ping effect when closed to draw attention to the Web 4.0 feature -->
      <span v-if="!isOpen" class="absolute inset-0 rounded-full border-2 border-brand-accent animate-ping opacity-75"></span>
    </button>
    
  </div>
</template>