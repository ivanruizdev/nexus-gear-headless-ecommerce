<script setup lang="ts">
import { computed } from 'vue';

// Dynamically compute the current year for the copyright notice
const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <!-- Nexus Gear Brand Column -->
        <div class="col-span-1 md:col-span-1">
          <h4 class="text-lg font-extrabold text-slate-900 mb-4 tracking-tight">NEXUS GEAR</h4>
          <p class="text-slate-600 leading-relaxed mb-6">
            Connecting your equipment to the future. Technology, innovation, and community.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-slate-400 hover:text-blue-600 transition-colors text-xl" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-slate-400 hover:text-blue-600 transition-colors text-xl" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-slate-400 hover:text-blue-600 transition-colors text-xl" aria-label="Discord">
              <i class="fab fa-discord"></i>
            </a>
            <a href="#" class="text-slate-400 hover:text-blue-600 transition-colors text-xl" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <!-- Navigation Column -->
        <div>
          <h4 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Navigation</h4>
          <ul class="space-y-3">
            <li><a href="#home" class="text-slate-600 hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="#products" class="text-slate-600 hover:text-blue-600 transition-colors">Products</a></li>
            <li><a href="#categories" class="text-slate-600 hover:text-blue-600 transition-colors">Categories</a></li>
            <li><a href="#features" class="text-slate-600 hover:text-blue-600 transition-colors">Features</a></li>
            <li><a href="#users" class="text-slate-600 hover:text-blue-600 transition-colors">Community</a></li>
          </ul>
        </div>

        <!-- Support Column -->
        <div>
          <h4 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Support</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Help Center</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">System Status</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Setup Guides</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Contact Support</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Return Policy</a></li>
          </ul>
        </div>

        <!-- Legal Column -->
        <div>
          <h4 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Legal</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Cookies</a></li>
            <li><a href="#" class="text-slate-600 hover:text-blue-600 transition-colors">Legal Notice</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>&copy; {{ currentYear }} Nexus Gear. All rights reserved. | "Connect your gear"</p>
        <div class="flex flex-wrap justify-center items-center gap-4 font-medium">
          <span class="flex items-center gap-1"><i class="fas fa-bolt text-blue-500"></i> Web 4.0 Tech</span>
          <span class="flex items-center gap-1"><i class="fas fa-brain text-purple-500"></i> Integrated AI</span>
          <span class="flex items-center gap-1"><i class="fas fa-microphone text-pink-500"></i> Voice Control</span>
        </div>
      </div>
    </div>
  </footer>
</template>