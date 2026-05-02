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
    
    <!-- Chat Window (Shows only when open) -->
    <div 
      v-show="isOpen" 
      class="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-4 transition-all transform origin-bottom-right flex flex-col"
      style="height: 500px; max-height: calc(100vh - 120px);"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex justify-between items-center text-white">
        <div class="flex items-center gap-2 font-bold">
          <i class="fas fa-robot text-xl"></i>
          <span>Nexus Assistant</span>
        </div>
        <button 
          @click="emit('close')" 
          class="text-white/80 hover:text-white transition-colors"
          aria-label="Close Assistant"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        <!-- Empty State / Welcome -->
        <div v-if="messages.length === 0" class="text-center text-slate-500 my-8">
          <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
            <i class="fas fa-sparkles"></i>
          </div>
          <p class="font-medium text-slate-700">How can I help you optimize your setup today?</p>
          <p class="text-sm mt-1">Try asking for recommendations or use voice commands.</p>
        </div>

        <!-- Render Messages -->
        <div 
          v-for="msg in messages" 
          :key="msg.id"
          class="flex w-full"
          :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div 
            class="max-w-[80%] rounded-2xl px-4 py-2 shadow-sm text-sm"
            :class="msg.sender === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'"
          >
            {{ msg.text }}
          </div>
        </div>
        
        <!-- Listening Indicator -->
        <div v-if="isListening" class="flex justify-start">
          <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1 items-center">
            <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
            <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
            <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-3 bg-white border-t border-slate-200">
        <div class="flex gap-2">
          <!-- Voice Button -->
          <button 
            @click="emit('startVoice')"
            class="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-colors"
            :class="isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-blue-600 hover:bg-blue-50'"
            :title="isListening ? 'Stop listening' : 'Start voice command'"
          >
            <i class="fas fa-microphone"></i>
          </button>
          
          <!-- Text Input -->
          <input 
            type="text" 
            v-model="textInput"
            @keyup.enter="handleSend"
            placeholder="Type your request..." 
            class="flex-1 bg-slate-100 border-none rounded-full px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
            :disabled="isListening"
          />
          
          <!-- Send Button -->
          <button 
            @click="handleSend"
            class="w-10 h-10 flex-shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!textInput.trim() || isListening"
          >
            <i class="fas fa-paper-plane text-sm"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Action Button (FAB) -->
    <button 
      @click="emit('toggle')"
      class="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center text-2xl relative"
      aria-label="Toggle AI Assistant"
    >
      <i :class="isOpen ? 'fas fa-times text-xl' : 'fas fa-robot'"></i>
      <!-- Pulse effect when closed to draw attention -->
      <span v-if="!isOpen" class="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-75"></span>
    </button>
    
  </div>
</template>