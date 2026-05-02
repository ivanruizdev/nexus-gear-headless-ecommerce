<!-- File: src/components/home/PricingPlansSection.vue -->
<script setup lang="ts">
// Define the events this component emits to the parent view
const emit = defineEmits<{
  (e: 'selectPlan', planId: string): void
}>()

const handlePlanSelection = (planId: string) => {
  emit('selectPlan', planId)
}

import CategoriesSection from './components/home/CategoriesSection.vue'
import FeaturedProductsSection from './components/home/FeaturedProductsSection.vue'
import FeaturesSection from './components/home/FeaturesSection.vue'
import PricingPlansSection from './components/home/PricingPlansSection.vue'

// ... existing state and methods ...

const handlePlanSelection = (planId: string) => {
  console.log(`Delegating registration for plan [${planId}] to Aimeos API...`)
  // TODO: Trigger modal or redirect to Aimeos checkout/registration endpoint
}

</script>

<template>
  <section class="bg-white py-20 border-t border-slate-200" id="users">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          NEXUS <span class="text-blue-600">COMMUNITY</span>
        </h2>
        <p class="text-slate-600 mt-2 text-lg">Connect with other users and unlock exclusive features</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <!-- Starter Plan -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col hover:shadow-lg transition-shadow">
          <div class="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full w-max mb-4">
            FREE
          </div>
          <div class="text-4xl text-slate-400 mb-4"><i class="fas fa-user"></i></div>
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Nexus Starter</h3>
          <p class="text-slate-500 mb-6 min-h-[3rem]">Perfect to start your tech journey.</p>
          
          <ul class="space-y-3 mb-8 flex-1 text-slate-700">
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Full catalog access</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Basic AI Assistant</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Purchases and tracking</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Email support</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> 1 saved setup</li>
          </ul>
          
          <button 
            class="w-full bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors mt-auto"
            @click="handlePlanSelection('starter')"
          >
            JOIN FOR FREE
          </button>
        </div>
        
        <!-- Pro Plan (Highlighted) -->
        <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-600 p-8 flex flex-col relative transform md:-translate-y-4">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div class="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full w-max mb-4 mt-2">
            PRO
          </div>
          <div class="text-4xl text-blue-600 mb-4"><i class="fas fa-user-tie"></i></div>
          <h3 class="text-2xl font-bold text-slate-900 mb-2">Nexus Pro</h3>
          <p class="text-slate-500 mb-6 min-h-[3rem]">For gamers and serious creators.</p>
          
          <div class="text-3xl font-extrabold text-slate-900 mb-6">$9.99<span class="text-base font-normal text-slate-500">/mo</span></div>
          
          <ul class="space-y-3 mb-8 flex-1 text-slate-700">
            <li class="flex items-center gap-2 font-semibold"><i class="fas fa-plus text-blue-600"></i> Everything in Starter</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600"></i> Advanced AI Assistant</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600"></i> Exclusive discounts (10-15%)</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600"></i> 24/7 Priority support</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600"></i> 5 custom setups</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-blue-600"></i> Premium configurations</li>
          </ul>
          
          <button 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-auto shadow-md"
            @click="handlePlanSelection('pro')"
          >
            SELECT PRO
          </button>
        </div>
        
        <!-- Elite Plan -->
        <div class="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 flex flex-col relative overflow-hidden group">
          <!-- Subtle background glow for premium feel -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div class="inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full w-max mb-4 relative z-10">
            PREMIUM
          </div>
          <div class="text-4xl text-purple-400 mb-4 relative z-10"><i class="fas fa-crown"></i></div>
          <h3 class="text-2xl font-bold text-white mb-2 relative z-10">Nexus Elite</h3>
          <p class="text-slate-400 mb-6 min-h-[3rem] relative z-10">The ultimate tech experience.</p>
          
          <div class="text-3xl font-extrabold text-white mb-6 relative z-10">$19.99<span class="text-base font-normal text-slate-500">/mo</span></div>
          
          <ul class="space-y-3 mb-8 flex-1 text-slate-300 relative z-10">
            <li class="flex items-center gap-2 text-white font-semibold"><i class="fas fa-plus text-purple-400"></i> Everything in Pro</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-purple-400"></i> Custom Predictive AI</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-purple-400"></i> Elite discounts (20-30%)</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-purple-400"></i> Setup concierge</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-purple-400"></i> Unlimited setups</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-purple-400"></i> Free shipping</li>
          </ul>
          
          <button 
            class="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-auto shadow-lg relative z-10"
            @click="handlePlanSelection('elite')"
          >
            SELECT ELITE
          </button>
        </div>

      </div>
    </div>
  </section>
</template>