<!-- File: src/components/layout/FooterSection.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

// Dynamically compute the current year for the copyright notice
const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="bg-surface-base border-t border-black/5 pt-16 pb-8 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <!-- Nexus Gear Brand Column -->
        <div class="col-span-1 md:col-span-1">
          <h4 class="text-xl font-extrabold text-text-main mb-4 tracking-tight font-orbitron">
            NEXUS <span class="text-brand-primary">GEAR</span>
          </h4>
          <p class="text-text-muted leading-relaxed mb-6 text-sm">
            Connecting your equipment to the future. Technology, innovation, and community for the Web 4.0 era.
          </p>
          <div class="flex gap-4">
            <!-- Social SVGs (Placeholders for X/Twitter, Instagram, Discord, YouTube) -->
            <a href="#" class="text-text-muted hover:text-brand-primary transition-colors hover:-translate-y-1" aria-label="Social Network 1">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="text-text-muted hover:text-brand-primary transition-colors hover:-translate-y-1" aria-label="Social Network 2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" class="text-text-muted hover:text-brand-primary transition-colors hover:-translate-y-1" aria-label="Social Network 3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            <a href="#" class="text-text-muted hover:text-brand-primary transition-colors hover:-translate-y-1" aria-label="Social Network 4">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 001.94-2C23 15.87 23 12 23 12s0-3.87-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
          </div>
        </div>

        <!-- Navigation Column -->
        <div>
          <h4 class="text-xs font-bold text-text-main mb-4 uppercase tracking-widest">Navigation</h4>
          <ul class="space-y-3">
            <li><RouterLink to="/" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Home</RouterLink></li>
            <li><RouterLink to="/catalog" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Products</RouterLink></li>
            <li><RouterLink to="/categories" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Categories</RouterLink></li>
            <li><RouterLink to="/community" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Community</RouterLink></li>
          </ul>
        </div>

        <!-- Support Column -->
        <div>
          <h4 class="text-xs font-bold text-text-main mb-4 uppercase tracking-widest">Support</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Help Center</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">System Status</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Setup Guides</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Contact Support</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Return Policy</a></li>
          </ul>
        </div>

        <!-- Legal Column -->
        <div>
          <h4 class="text-xs font-bold text-text-main mb-4 uppercase tracking-widest">Legal</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Cookies</a></li>
            <li><a href="#" class="text-sm text-text-muted hover:text-brand-primary transition-colors">Legal Notice</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
        <p>&copy; {{ currentYear }} Nexus Gear. All rights reserved. | "Connect your gear"</p>
        
        <div class="flex flex-wrap justify-center items-center gap-6 font-bold uppercase tracking-wider">
          <!-- Web 4.0 Indicators -->
          <span class="flex items-center gap-1.5 text-brand-secondary">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Web 4.0 Tech
          </span>
          <span class="flex items-center gap-1.5 text-brand-accent">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
            Integrated AI
          </span>
          <span class="flex items-center gap-1.5 text-status-warning">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
            Voice Control
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>