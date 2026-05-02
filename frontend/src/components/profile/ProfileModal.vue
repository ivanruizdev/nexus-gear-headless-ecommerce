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
  <!-- Overlay and Modal Container -->
  <div v-show="isOpen" class="relative z-50" aria-labelledby="profile-modal-title" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      @click="emit('close')"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        
        <!-- Modal Panel -->
        <div class="relative transform overflow-hidden rounded-2xl bg-slate-50 text-left shadow-2xl transition-all sm:my-8 w-full max-w-5xl">
          
          <!-- Profile Cover & Hero -->
          <div class="bg-slate-800 relative pb-16">
            <button 
              @click="emit('close')" 
              class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 bg-slate-900/50 rounded-full"
            >
              <i class="fas fa-times"></i>
            </button>
            
            <div class="px-8 pt-10 flex flex-col md:flex-row items-center gap-6">
              <!-- Avatar -->
              <div class="relative">
                <div class="h-24 w-24 rounded-full border-4 border-slate-50 bg-slate-200 flex items-center justify-center overflow-hidden shadow-lg">
                  <img v-if="formData.avatarUrl" :src="formData.avatarUrl" alt="Avatar" class="h-full w-full object-cover" />
                  <span v-else class="text-3xl font-bold text-slate-500">{{ formData.name.charAt(0) || 'N' }}</span>
                </div>
                <button 
                  @click="emit('uploadPhoto')"
                  class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 text-xs shadow hover:bg-blue-700 transition-colors"
                  title="Change photo"
                >
                  <i class="fas fa-camera"></i>
                </button>
              </div>
              
              <!-- Info -->
              <div class="text-center md:text-left text-white">
                <h2 class="text-2xl font-bold">{{ formData.name || 'Nexus Guest' }}</h2>
                <p class="text-slate-300">{{ formData.email }}</p>
                <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <span class="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    <i class="fas fa-bolt mr-1"></i> {{ formData.plan }}
                  </span>
                  <span class="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    <i class="fas fa-shield-alt mr-1"></i> Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 relative -mt-8">
            
            <!-- Left Column: Forms -->
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Personal Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" v-model="formData.name" class="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" v-model="formData.email" class="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input type="tel" v-model="formData.phone" class="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">Membership Plan</label>
                    <select v-model="formData.plan" class="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50" disabled>
                      <option value="Starter">Nexus Starter</option>
                      <option value="Pro">Nexus Pro</option>
                      <option value="Elite">Nexus Elite</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Shipping Address</label>
                    <input type="text" v-model="formData.address" placeholder="Add a primary shipping address" class="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1">About Your Setup</label>
                    <textarea v-model="formData.bio" rows="3" placeholder="Tell us about your tech stack..." class="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                  </div>
                </div>
                
                <div class="mt-6 flex gap-3">
                  <button @click="handleSave" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
                    <i class="fas fa-save"></i> Save Changes
                  </button>
                  <button @click="emit('removePhoto')" class="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
                    <i class="fas fa-trash"></i> Remove Photo
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Column: Stats & Quick Actions -->
            <div class="space-y-6">
              
              <!-- Account Summary -->
              <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Account Summary</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div class="text-2xl font-extrabold text-blue-600">{{ stats.cartItems }}</div>
                    <div class="text-xs text-slate-500 font-medium mt-1">Cart Items</div>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div class="text-2xl font-extrabold text-blue-600">{{ stats.cartValue }}</div>
                    <div class="text-xs text-slate-500 font-medium mt-1">Cart Value</div>
                  </div>
                  <div class="col-span-2 bg-slate-50 p-4 rounded-lg text-center border border-slate-100">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-xs text-slate-500 font-medium">Setup Completion</span>
                      <span class="text-sm font-bold text-slate-900">{{ stats.setupCompletion }}</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2">
                      <div class="bg-green-500 h-2 rounded-full" :style="{ width: stats.setupCompletion }"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Quick Actions</h3>
                <div class="space-y-3">
                  <button @click="emit('viewCart'); emit('close');" class="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors flex justify-between items-center">
                    <span class="flex items-center gap-2"><i class="fas fa-shopping-cart text-slate-400"></i> View Cart</span>
                    <i class="fas fa-chevron-right text-xs text-slate-400"></i>
                  </button>
                  <button @click="emit('viewOrders'); emit('close');" class="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors flex justify-between items-center">
                    <span class="flex items-center gap-2"><i class="fas fa-box text-slate-400"></i> My Orders</span>
                    <i class="fas fa-chevron-right text-xs text-slate-400"></i>
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