<!-- File: src/components/profile/ProfileModal.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';

// 1. Define data interfaces expected from Aimeos
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  plan: string;
  address: string;
  bio: string;
  avatarUrl?: string;
  memberSince: string;
}

// 2. Define props
const props = defineProps<{
  isOpen: boolean;
  profile: UserProfile;
  stats: {
    cartItems: number;
    cartValue: string;
    setupCompletion: string;
  };
}>();

// 3. Define emits for parent communication
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', updatedProfile: UserProfile): void;
  (e: 'uploadPhoto'): void;
  (e: 'removePhoto'): void;
  (e: 'viewCart'): void;
  (e: 'viewOrders'): void;
}>();

// 4. Local reactive copy of the profile for form editing
const formData = ref<UserProfile>({ ...props.profile });

// Sync local form data if the parent updates the profile prop
watch(() => props.profile, (newVal) => {
  formData.value = { ...newVal };
}, { deep: true });

const handleSave = () => {
  emit('save', formData.value);
};
</script>

<template>
  <div v-show="isOpen" class="relative z-50" aria-labelledby="profile-modal-title" role="dialog" aria-modal="true">
    
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-text-main/70 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        <!-- Modal Panel -->
        <div class="relative transform overflow-hidden rounded-3xl bg-surface-base text-left shadow-2xl transition-all sm:my-8 w-full max-w-5xl border border-black/5">
          
          <!-- Profile Cover & Hero -->
          <div class="bg-gradient-to-r from-brand-secondary to-brand-primary relative pb-16">
            <!-- Decorative overlay -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-30"></div>

            <button @click="emit('close')" class="absolute top-4 right-4 text-white/70 hover:text-white hover:rotate-90 transition-all p-2 bg-black/20 rounded-full backdrop-blur-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <div class="px-8 pt-10 flex flex-col md:flex-row items-center gap-6 relative z-10">
              <!-- Avatar -->
              <div class="relative">
                <div class="h-24 w-24 rounded-full border-4 border-white bg-surface-base flex items-center justify-center overflow-hidden shadow-xl">
                  <img v-if="formData.avatarUrl" :src="formData.avatarUrl" alt="Avatar" class="h-full w-full object-cover" />
                  <span v-else class="text-4xl font-extrabold text-black/20 font-orbitron">{{ formData.name.charAt(0) || 'N' }}</span>
                </div>
                <button 
                  @click="emit('uploadPhoto')"
                  class="absolute bottom-0 right-0 bg-brand-accent text-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform border-2 border-white"
                  title="Change photo"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </button>
              </div>
              
              <!-- Info -->
              <div class="text-center md:text-left text-white">
                <h2 class="text-3xl font-bold font-orbitron tracking-wide">{{ formData.name || 'Nexus Guest' }}</h2>
                <p class="text-white/80 mt-1">{{ formData.email }}</p>
                <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <span class="bg-white/20 border border-white/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    {{ formData.plan }}
                  </span>
                  <span class="bg-status-success/90 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative -mt-8 z-20">
            
            <!-- Left Column: Forms -->
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-surface-card p-8 rounded-2xl shadow-sm border border-black/5">
                <h3 class="text-xl font-bold text-text-main mb-6 border-b border-black/5 pb-4 font-orbitron">Personal Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Full Name</label>
                    <input type="text" v-model="formData.name" class="w-full px-4 py-3 bg-surface-base border border-black/10 rounded-xl focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary outline-none transition-all text-sm text-text-main font-medium" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Email</label>
                    <input type="email" v-model="formData.email" class="w-full px-4 py-3 bg-surface-base border border-black/10 rounded-xl focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary outline-none transition-all text-sm text-text-main font-medium" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Phone</label>
                    <input type="tel" v-model="formData.phone" class="w-full px-4 py-3 bg-surface-base border border-black/10 rounded-xl focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary outline-none transition-all text-sm text-text-main font-medium" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Membership Plan</label>
                    <select v-model="formData.plan" class="w-full px-4 py-3 bg-black/5 border border-transparent rounded-xl focus:outline-none text-sm text-text-muted font-bold cursor-not-allowed" disabled>
                      <option value="Starter">Nexus Starter</option>
                      <option value="Pro">Nexus Pro</option>
                      <option value="Elite">Nexus Elite</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Shipping Address</label>
                    <input type="text" v-model="formData.address" placeholder="Add a primary shipping address" class="w-full px-4 py-3 bg-surface-base border border-black/10 rounded-xl focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary outline-none transition-all text-sm text-text-main font-medium" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">About Your Setup</label>
                    <textarea v-model="formData.bio" rows="3" placeholder="Tell us about your tech stack..." class="w-full px-4 py-3 bg-surface-base border border-black/10 rounded-xl focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary outline-none transition-all text-sm text-text-main font-medium resize-none"></textarea>
                  </div>
                </div>
                
                <div class="mt-8 flex flex-wrap gap-4">
                  <button @click="handleSave" class="bg-brand-primary hover:bg-brand-secondary hover:-translate-y-0.5 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center gap-2 text-sm uppercase tracking-wide">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
                    Save Changes
                  </button>
                  <button @click="emit('removePhoto')" class="bg-white border-2 border-black/5 text-status-error hover:bg-status-error/10 hover:border-status-error/20 font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 text-sm uppercase tracking-wide">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Column: Stats & Quick Actions -->
            <div class="space-y-6">
              
              <!-- Account Summary -->
              <div class="bg-surface-card p-6 rounded-2xl shadow-sm border border-black/5">
                <h3 class="text-lg font-bold text-text-main mb-4 border-b border-black/5 pb-3 font-orbitron">Account Summary</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-surface-base p-4 rounded-xl text-center border border-black/5">
                    <div class="text-3xl font-black text-brand-secondary">{{ stats.cartItems }}</div>
                    <div class="text-[0.65rem] text-text-muted font-bold mt-1 uppercase tracking-widest">Cart Items</div>
                  </div>
                  <div class="bg-surface-base p-4 rounded-xl text-center border border-black/5">
                    <div class="text-2xl font-black text-brand-secondary mt-1">{{ stats.cartValue }}</div>
                    <div class="text-[0.65rem] text-text-muted font-bold mt-1 uppercase tracking-widest">Cart Value</div>
                  </div>
                  <div class="col-span-2 bg-surface-base p-5 rounded-xl border border-black/5">
                    <div class="flex justify-between items-center mb-3">
                      <span class="text-[0.65rem] text-text-muted font-bold uppercase tracking-widest">Setup Completion</span>
                      <span class="text-sm font-black text-brand-primary">{{ stats.setupCompletion }}</span>
                    </div>
                    <div class="w-full bg-black/10 rounded-full h-2.5 overflow-hidden">
                      <div class="bg-gradient-to-r from-brand-secondary to-brand-primary h-full rounded-full" :style="{ width: stats.setupCompletion }"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="bg-surface-card p-6 rounded-2xl shadow-sm border border-black/5">
                <h3 class="text-lg font-bold text-text-main mb-4 border-b border-black/5 pb-3 font-orbitron">Quick Actions</h3>
                <div class="space-y-3">
                  <button @click="emit('viewCart'); emit('close');" class="w-full bg-surface-base hover:bg-black/5 border border-black/5 text-text-main font-bold py-3.5 px-4 rounded-xl transition-colors flex justify-between items-center group">
                    <span class="flex items-center gap-3 text-sm">
                      <svg class="w-5 h-5 text-brand-secondary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                      View Cart
                    </span>
                    <svg class="w-4 h-4 text-black/20 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                  <button @click="emit('viewOrders'); emit('close');" class="w-full bg-surface-base hover:bg-black/5 border border-black/5 text-text-main font-bold py-3.5 px-4 rounded-xl transition-colors flex justify-between items-center group">
                    <span class="flex items-center gap-3 text-sm">
                      <svg class="w-5 h-5 text-brand-secondary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                      My Orders
                    </span>
                    <svg class="w-4 h-4 text-black/20 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>