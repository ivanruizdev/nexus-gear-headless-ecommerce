<script setup lang="ts">
// Aquí Alan conectará la tienda (Pinia) para que el número del carrito sea dinámico
</script>

<template>
    <header>
        <div class="container header-container">
            <!-- LOGO -->
            <div class="logo">
                <i class="fas fa-link logo-icon"></i>
                <div>
                    <div class="logo-text">NEXUS GEAR</div>
                    <div class="logo-subtitle">CONECTA TU EQUIPO</div>
                </div>
            </div>

            <!-- MENÚ DE NAVEGACIÓN -->
            <nav class="nav-menu">
                <div class="nav-item">
                    <a href="#home" class="nav-link active">
                        <i class="fas fa-home"></i> Inicio
                    </a>
                </div>
                <div class="nav-item">
                    <a href="#products" class="nav-link">
                        <i class="fas fa-microchip"></i> Productos
                    </a>
                </div>
                <div class="nav-item">
                    <a href="#categories" class="nav-link">
                        <i class="fas fa-th"></i> Categorías
                    </a>
                </div>
                <div class="nav-item">
                    <a href="#features" class="nav-link">
                        <i class="fas fa-star"></i> Nexus Features
                    </a>
                </div>
                <div class="nav-item">
                    <a href="#users" class="nav-link">
                        <i class="fas fa-users"></i> Comunidad
                    </a>
                </div>
            </nav>

            <!-- CONTROLES DE USUARIO -->
            <div class="user-controls">
                <!-- BUSCADOR -->
                <div class="user-icon" onclick="toggleSearch()">
                    <i class="fas fa-search"></i>
                </div>
                
                <!-- CARRITO -->
                <div class="user-icon cart-icon" onclick="openCart()">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-count">0</span>
                </div>
                
                <!-- PERFIL DE USUARIO -->
                <div class="user-icon" onclick="toggleUserMenu()">
                    <i class="fas fa-user"></i>
                </div>
                
                <!-- CONTROL POR VOZ -->
                <div class="user-icon" onclick="startVoiceAssistant()" style="background: rgba(123, 44, 191, 0.08); border-color: rgba(123, 44, 191, 0.2);">
                    <i class="fas fa-microphone"></i>
                </div>
            </div>
        </div>
    </header>
</template>