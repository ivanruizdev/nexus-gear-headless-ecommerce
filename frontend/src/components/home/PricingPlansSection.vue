<!-- File: src/components/home/PricingPlansSection.vue -->
<script setup lang="ts">
// Define the events this component emits to the parent view
const emit = defineEmits<{
  (e: 'selectPlan', planId: string): void
}>()

const handlePlanSelection = (planId: string) => {
  console.log(`Delegating registration for plan [${planId}] to Aimeos API...`)
  emit('selectPlan', planId)
}
</script>

<template>
  <section class="bg-surface-base py-20 border-t border-black/5" id="users">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-orbitron">
          NEXUS <span class="text-brand-secondary">COMMUNITY</span>
        </h2>
        <p class="text-text-muted mt-4 text-lg max-w-2xl mx-auto">
          Connect with other users and unlock exclusive features tailored to your setup.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <!-- Starter Plan -->
        <div class="bg-surface-card rounded-2xl shadow-sm border border-black/10 p-8 flex flex-col hover:shadow-md transition-shadow">
          <div class="inline-block bg-black/5 text-text-muted text-xs font-bold px-3 py-1 rounded-full w-max mb-4 uppercase tracking-wider">
            Free
          </div>
          <!-- User Icon -->
          <div class="text-black/20 mb-4 h-10 w-10">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <h3 class="text-2xl font-bold text-text-main mb-2">Nexus Starter</h3>
          <p class="text-text-muted mb-6 min-h-[3rem] text-sm">Perfect to start your tech journey.</p>
          
          <ul class="space-y-4 mb-8 flex-1 text-text-main text-sm">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-status-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Full catalog access
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-status-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Basic AI Assistant
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-status-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              1 saved setup
            </li>
          </ul>
          
          <button 
            class="w-full bg-white border-2 border-black/10 hover:border-brand-primary hover:text-brand-primary text-text-main font-bold py-3 px-4 rounded-xl transition-colors mt-auto"
            @click="handlePlanSelection('starter')"
          >
            JOIN FOR FREE
          </button>
        </div>
        
        <!-- Pro Plan (Highlighted) -->
        <div class="bg-surface-card rounded-2xl shadow-xl border-2 border-brand-secondary p-8 flex flex-col relative transform md:-translate-y-4">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-secondary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div class="inline-block bg-brand-secondary/10 text-brand-secondary text-xs font-bold px-3 py-1 rounded-full w-max mb-4 mt-2 uppercase tracking-wider">
            Pro
          </div>
          <!-- User Tie Icon -->
          <div class="text-brand-secondary mb-4 h-10 w-10">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6 9.49c-.83-.4-2.22-.98-3.41-1.36L12 17.5 9.41 11.13C8.22 11.51 6.83 12.09 6 12.49V21h12v-8.51zM11 19h2v-5.22l-1-2.9-1 2.9V19z"/></svg>
          </div>
          <h3 class="text-2xl font-bold text-text-main mb-2">Nexus Pro</h3>
          <p class="text-text-muted mb-6 min-h-[3rem] text-sm">For gamers and serious creators.</p>
          
          <div class="text-4xl font-extrabold text-text-main mb-6">$9.99<span class="text-base font-normal text-text-muted">/mo</span></div>
          
          <ul class="space-y-4 mb-8 flex-1 text-text-main text-sm">
            <li class="flex items-start gap-3 font-semibold">
              <svg class="w-5 h-5 text-brand-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              Everything in Starter
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Advanced AI Assistant
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Exclusive discounts (10-15%)
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              5 custom setups
            </li>
          </ul>
          
          <button 
            class="w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-4 rounded-xl transition-colors mt-auto shadow-md"
            @click="handlePlanSelection('pro')"
          >
            SELECT PRO
          </button>
        </div>
        
        <!-- Elite Plan -->
        <div class="bg-text-main rounded-2xl shadow-lg border border-black p-8 flex flex-col relative overflow-hidden group">
          <!-- Subtle background glow for premium feel -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-brand-accent rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          
          <div class="inline-block bg-brand-accent/20 text-brand-accent border border-brand-accent/30 text-xs font-bold px-3 py-1 rounded-full w-max mb-4 relative z-10 uppercase tracking-wider">
            Premium
          </div>
          <!-- Crown Icon -->
          <div class="text-brand-accent mb-4 h-10 w-10 relative z-10">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M5 16h14l-1.5-9-3 3-2.5-5-2.5 5-3-3L5 16zm14 2H5v2h14v-2z"/></svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2 relative z-10">Nexus Elite</h3>
          <p class="text-gray-400 mb-6 min-h-[3rem] text-sm relative z-10">The ultimate tech experience.</p>
          
          <div class="text-4xl font-extrabold text-white mb-6 relative z-10">$19.99<span class="text-base font-normal text-gray-400">/mo</span></div>
          
          <ul class="space-y-4 mb-8 flex-1 text-gray-300 text-sm relative z-10">
            <li class="flex items-start gap-3 text-white font-semibold">
              <svg class="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              Everything in Pro
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Predictive AI & Concierge
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Elite discounts (20-30%)
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Unlimited setups & Free shipping
            </li>
          </ul>
          
          <button 
            class="w-full bg-gradient-to-r from-brand-accent to-pink-500 hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition-opacity mt-auto shadow-lg relative z-10"
            @click="handlePlanSelection('elite')"
          >
            SELECT ELITE
          </button>
        </div>

      </div>
    </div>
  </section>
</template>