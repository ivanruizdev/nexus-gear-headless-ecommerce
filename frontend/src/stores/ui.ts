// File: src/stores/ui.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // Global UI State
  const isCartOpen = ref(false)
  const isProfileOpen = ref(false)
  const isAiOpen = ref(false)
  const isProductModalOpen = ref(false)
  const isConnecting = ref(false) // Used for GlobalLoader
  const isListening = ref(false)  // Used for VoiceIndicator

  // Actions
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
    // Ensure mutually exclusive overlays
    if (isCartOpen.value) {
      isProfileOpen.value = false
      isAiOpen.value = false
    }
  }

  const toggleProfile = () => {
    isProfileOpen.value = !isProfileOpen.value
    if (isProfileOpen.value) {
      isCartOpen.value = false
      isAiOpen.value = false
    }
  }

  const toggleAiAssistant = () => {
    isAiOpen.value = !isAiOpen.value
    if (isAiOpen.value) {
      isCartOpen.value = false
      isProfileOpen.value = false
    }
  }

  const openProductModal = () => {
    isProductModalOpen.value = true
  }

  const closeAllModals = () => {
    isCartOpen.value = false
    isProfileOpen.value = false
    isAiOpen.value = false
    isProductModalOpen.value = false
  }

  const setConnecting = (status: boolean) => {
    isConnecting.value = status
  }

  const setListening = (status: boolean) => {
    isListening.value = status
  }

  return {
    // State
    isCartOpen,
    isProfileOpen,
    isAiOpen,
    isProductModalOpen,
    isConnecting,
    isListening,
    // Actions
    toggleCart,
    toggleProfile,
    toggleAiAssistant,
    openProductModal,
    closeAllModals,
    setConnecting,
    setListening
  }
})