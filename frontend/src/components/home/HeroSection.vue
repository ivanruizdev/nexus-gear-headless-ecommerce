<script setup lang="ts">
// Lógica específica del Hero (ej. tracking de clics en "Explorar")
</script>

<template>
    <section class="hero" id="home">
        <div class="hero-bg"></div>
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title floating">
                    NEXUS <span class="gradient-text">GEAR</span>
                </h1>
                <div class="hero-subtitle">CONECTA TU EQUIPO</div>
                <p class="hero-description">
                    La plataforma definitiva para gamers, creadores y profesionales tech. 
                    Conecta todos tus dispositivos en un ecosistema inteligente con tecnología 
                    IA y control por voz. El futuro de tu setup comienza aquí.
                </p>
                
                <div class="hero-actions">
                    <button class="btn btn-primary" onclick="exploreProducts()">
                        <i class="fas fa-rocket"></i> EXPLORAR PRODUCTOS
                    </button>
                    <button class="btn btn-secondary" onclick="startVoiceAssistant()">
                        <i class="fas fa-microphone"></i> PRUEBA LA VOZ NEXUS
                    </button>
                </div>

                <!-- ESTADÍSTICAS DESTACADAS -->
                <div style="display: flex; justify-content: center; gap: 40px; margin-top: 50px; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; color: var(--primary); font-weight: bold;">500+</div>
                        <div style="color: var(--gray);">Productos Nexus</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; color: var(--primary); font-weight: bold;">15K+</div>
                        <div style="color: var(--gray);">Clientes Conectados</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; color: var(--primary); font-weight: bold;">4.9★</div>
                        <div style="color: var(--gray);">Valoración Media</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2.5rem; color: var(--primary); font-weight: bold;">24/7</div>
                        <div style="color: var(--gray);">Soporte Nexus AI</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>