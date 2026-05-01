<script setup lang="ts">
// 1. Importamos nuestros nuevos componentes
import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/home/HeroSection.vue'

// 2. Importamos los estilos globales (que separamos anteriormente)
import './assets/css/style.css'
</script>

<template>
  <!-- Pega aquí TODO el contenido de tu nexxuz_Final.html que estaba 
       dentro del <body> (Carga, Header, Hero, Categorías, Footer, etc.) -->

  <!-- PANTALLA DE CARGA -->
    <div class="loading" id="loading">
        <div style="text-align: center;">
            <div class="logo" style="font-size: 3rem; margin-bottom: 30px;">
                <i class="fas fa-link logo-icon"></i>
                <span class="logo-text">NEXUS GEAR</span>
            </div>
            <div style="color: var(--primary); font-size: 1.5rem; margin-bottom: 20px;">CONECTANDO...</div>
            <div style="width: 200px; height: 3px; background: rgba(0,0,0,0.1); margin: 0 auto; border-radius: 3px; overflow: hidden;">
                <div id="loadingBar" style="width: 0%; height: 100%; background: var(--primary); transition: width 0.3s;"></div>
            </div>
        </div>
    </div>


    <!-- INDICADOR PEQUEÑO DE RECONOCIMIENTO DE VOZ -->
    <div class="voice-status-pill" id="voiceStatusPill">
        <div class="voice-status-icon" id="voiceStatusIcon"><i class="fas fa-microphone"></i></div>
        <div style="flex:1; min-width:0;">
            <div class="voice-status-title" id="voiceStatusTitle">Micrófono</div>
            <div class="voice-status-text" id="voiceStatusText">Listo para escuchar.</div>
            <div class="voice-level" id="voiceLevel"><div class="voice-level-bar"></div></div>
        </div>
    </div>

    <!-- SECCIÓN DE CATEGORÍAS -->
    <section class="categories" id="categories">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">EXPLORA <span class="gradient-text">CATEGORÍAS</span></h2>
                <p class="section-subtitle">Encuentra el gear perfecto para cada parte de tu setup</p>
            </div>
            
            <div class="categories-grid">
                <div class="category-card" data-category="audio" onclick="filterCategory('audio')">
                    <div class="category-icon">
                        <i class="fas fa-headphones"></i>
                    </div>
                    <div class="category-name">Audio Nexus</div>
                    <div class="category-count">85 productos</div>
                </div>
                
                <div class="category-card" data-category="perifericos" onclick="filterCategory('perifericos')">
                    <div class="category-icon">
                        <i class="fas fa-keyboard"></i>
                    </div>
                    <div class="category-name">Periféricos</div>
                    <div class="category-count">120 productos</div>
                </div>
                
                <div class="category-card" data-category="visual" onclick="filterCategory('visual')">
                    <div class="category-icon">
                        <i class="fas fa-desktop"></i>
                    </div>
                    <div class="category-name">Visual Gear</div>
                    <div class="category-count">65 productos</div>
                </div>
                
                <div class="category-card" data-category="conexion" onclick="filterCategory('conexion')">
                    <div class="category-icon">
                        <i class="fas fa-plug"></i>
                    </div>
                    <div class="category-name">Conexión</div>
                    <div class="category-count">45 productos</div>
                </div>
                
                <div class="category-card" data-category="gaming" onclick="filterCategory('gaming')">
                    <div class="category-icon">
                        <i class="fas fa-gamepad"></i>
                    </div>
                    <div class="category-name">Gaming Pro</div>
                    <div class="category-count">95 productos</div>
                </div>
                
                <div class="category-card" data-category="streaming" onclick="filterCategory('streaming')">
                    <div class="category-icon">
                        <i class="fas fa-video"></i>
                    </div>
                    <div class="category-name">Streaming</div>
                    <div class="category-count">70 productos</div>
                </div>
            </div>
        </div>
    </section>


    <!-- SECCIÓN RECOMENDACIONES PERSONALIZADAS -->
    <section class="recommendations" id="recommendations">
        <div class="container">
            <div class="section-header">
                <div class="mini-badge"><i class="fas fa-sparkles"></i> IA personalizada</div>
                <h2 class="section-title">RECOMENDADO <span class="gradient-text">PARA TI</span></h2>
                <p class="section-subtitle">Sugerencias basadas en tu perfil, tus búsquedas, categorías visitadas y productos que has visto o añadido.</p>
                <p class="recommendation-note" id="recommendationNote">Aún estamos conociendo tus gustos. Explora productos, usa el buscador o agrega artículos al carrito para refinar tus recomendaciones.</p>
            </div>
            <div class="products-grid" id="recommendedProducts"></div>
        </div>
    </section>

    <!-- SECCIÓN PRODUCTOS DESTACADOS -->
    <section class="featured-products" id="products">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">GEAR <span class="gradient-text">DESTACADO</span></h2>
                <p class="section-subtitle">Los productos más buscados de la comunidad Nexus</p>
            </div>
            
            <div class="products-grid" id="featuredProducts">
                <!-- Productos se cargan dinámicamente -->
            </div>
            
            <div style="text-align: center; margin-top: 50px;">
                <button class="btn btn-secondary" onclick="viewAllProducts()">
                    <i class="fas fa-eye"></i> VER TODOS LOS PRODUCTOS
                </button>
            </div>
        </div>
    </section>

    <!-- SECCIÓN FUNCIONALIDADES NEXUS -->
    <section class="features" id="features">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">NEXUS <span class="gradient-text">FEATURES</span></h2>
                <p class="section-subtitle">Descubre las tecnologías que hacen único a Nexus Gear</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="feature-title">Nexus AI Assistant</div>
                    <div class="feature-description">
                        Asistente inteligente que aprende de tus hábitos y sugiere productos, configuraciones y ofertas personalizadas.
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-microphone"></i>
                    </div>
                    <div class="feature-title">Control por Voz</div>
                    <div class="feature-description">
                        Navega, busca y compra usando comandos de voz. Compatible con múltiples idiomas y dialectos.
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <div class="feature-title">Sync Ecosystem</div>
                    <div class="feature-description">
                        Todos los productos Nexus se conectan entre sí, creando un ecosistema unificado y sincronizado.
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="feature-title">Setup Optimizer</div>
                    <div class="feature-description">
                        Analiza tu setup actual y sugiere mejoras basadas en rendimiento, estética y presupuesto.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECCIÓN TIPOS DE USUARIO -->
    <section class="user-types" id="users">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">COMUNIDAD <span class="gradient-text">NEXUS</span></h2>
                <p class="section-subtitle">Conecta con otros usuarios según tus intereses y necesidades</p>
            </div>
            
            <div class="user-types-container">
                <!-- USUARIO BÁSICO -->
                <div class="user-type-card">
                    <div class="user-type-badge">GRATIS</div>
                    <div class="user-type-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-type-name">Nexus Starter</div>
                    <p style="color: var(--gray); margin-bottom: 20px;">Perfecto para comenzar tu viaje tech</p>
                    
                    <ul class="user-type-features">
                        <li><i class="fas fa-check"></i> Acceso a catálogo completo</li>
                        <li><i class="fas fa-check"></i> Asistente AI básico</li>
                        <li><i class="fas fa-check"></i> Compras y seguimiento</li>
                        <li><i class="fas fa-check"></i> Soporte por email</li>
                        <li><i class="fas fa-check"></i> 1 setup guardado</li>
                    </ul>
                    
                    <button class="btn btn-secondary btn-full" onclick="registerUser('starter')">
                        UNIRSE GRATIS
                    </button>
                </div>
                
                <!-- USUARIO PRO -->
                <div class="user-type-card">
                    <div class="user-type-badge" style="background: var(--secondary);">PRO</div>
                    <div class="user-type-icon">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="user-type-name">Nexus Pro</div>
                    <p style="color: var(--gray); margin-bottom: 20px;">Para gamers y creadores serios</p>
                    
                    <ul class="user-type-features">
                        <li><i class="fas fa-check"></i> Todo lo de Starter +</li>
                        <li><i class="fas fa-check"></i> AI Assistant avanzado</li>
                        <li><i class="fas fa-check"></i> Descuentos exclusivos (10-15%)</li>
                        <li><i class="fas fa-check"></i> Soporte prioritario 24/7</li>
                        <li><i class="fas fa-check"></i> 5 setups personalizados</li>
                        <li><i class="fas fa-check"></i> Configuraciones premium</li>
                    </ul>
                    
                    <button class="btn btn-primary btn-full" onclick="registerUser('pro')">
                        $9.99/MES
                    </button>
                </div>
                
                <!-- USUARIO PREMIUM -->
                <div class="user-type-card premium">
                    <div class="user-type-badge" style="background: var(--accent);">PREMIUM</div>
                    <div class="user-type-icon">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="user-type-name">Nexus Elite</div>
                    <p style="color: var(--gray); margin-bottom: 20px;">Experiencia tech definitiva</p>
                    
                    <ul class="user-type-features">
                        <li><i class="fas fa-check"></i> Todo lo de Pro +</li>
                        <li><i class="fas fa-check"></i> AI personalizada</li>
                        <li><i class="fas fa-check"></i> Descuentos elite (20-30%)</li>
                        <li><i class="fas fa-check"></i> Setup concierge</li>
                        <li><i class="fas fa-check"></i> Setup ilimitados</li>
                        <li><i class="fas fa-check"></i> Envío gratis en todo</li>
                        <li><i class="fas fa-check"></i> Beta features exclusivas</li>
                    </ul>
                    
                    <button class="btn btn-primary btn-full" style="background: linear-gradient(45deg, var(--accent), #ff00cc);" onclick="registerUser('elite')">
                        $19.99/MES
                    </button>
                </div>
            </div>
        </div>
    </section>


    <!-- CARRITO -->
    <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
    <aside class="cart-drawer" id="cartDrawer">
        <div class="cart-header">
            <div class="cart-title"><i class="fas fa-shopping-cart"></i> Tu carrito</div>
            <button class="btn btn-secondary btn-small" onclick="closeCart()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="cart-body" id="cartItems"></div>
        <div class="cart-footer">
            <div class="cart-summary-row">
                <span>Productos</span>
                <span id="cartProductsCount">0</span>
            </div>
            <div class="cart-summary-row">
                <span>Subtotal</span>
                <span id="cartSubtotal">$0.00</span>
            </div>
            <div class="cart-summary-row">
                <span>IVA (16%)</span>
                <span id="cartTax">$0.00</span>
            </div>
            <div class="cart-summary-row">
                <span id="cartDiscountLabel">Descuento membresía</span>
                <span id="cartDiscount">-$0.00</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total</span>
                <span id="cartTotal">$0.00</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-secondary btn-full" onclick="clearCart()">
                    <i class="fas fa-trash"></i> Vaciar carrito
                </button>
                <button class="btn btn-primary btn-full" onclick="checkoutCart()">
                    <i class="fas fa-credit-card"></i> Finalizar compra
                </button>
            </div>
        </div>
    </aside>



    <!-- PERFIL DE USUARIO -->
    <div class="profile-overlay" id="profileOverlay" onclick="closeProfile()"></div>
    <section class="profile-modal" id="profileModal" aria-hidden="true">
        <div class="profile-cover">
            <button class="profile-close" onclick="closeProfile()">
                <i class="fas fa-times"></i>
            </button>
            <div class="profile-hero">
                <div class="profile-avatar-wrapper">
                    <div class="profile-avatar" id="profileAvatar">NG</div>
                    <button type="button" class="profile-photo-btn" onclick="triggerProfilePhotoUpload()" title="Cambiar foto de perfil">
                        <i class="fas fa-camera"></i>
                    </button>
                    <input type="file" id="profilePhotoInput" accept="image/png,image/jpeg,image/webp" style="display:none" onchange="handleProfilePhotoUpload(event)">
                </div>
                <div class="profile-hero-info">
                    <h2 id="profileHeroName">Invitado Nexus</h2>
                    <p id="profileHeroEmail">guest@nexusgear.com</p>
                    <p id="profileHeroMemberSince">Miembro desde hoy</p>
                    <div class="profile-badges">
                        <span class="profile-badge"><i class="fas fa-bolt"></i> <span id="profileHeroPlan">Nexus Starter</span></span>
                        <span class="profile-badge"><i class="fas fa-shield-alt"></i> Perfil verificado</span>
                        <span class="profile-badge"><i class="fas fa-star"></i> <span id="profileHeroLevel">Nivel Explorer</span></span>
                    </div>
                    <div class="profile-photo-actions">
                        <button type="button" class="btn btn-secondary btn-small" onclick="triggerProfilePhotoUpload()"><i class="fas fa-image"></i> Subir foto</button>
                        <button type="button" class="btn btn-secondary btn-small" onclick="removeProfilePhoto()"><i class="fas fa-trash"></i> Quitar foto</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-content">
            <div>
                <div class="profile-card">
                    <h3>Información personal</h3>
                    <div class="profile-form-grid">
                        <div class="profile-field">
                            <label for="profileNameInput">Nombre</label>
                            <input type="text" id="profileNameInput" placeholder="Tu nombre">
                        </div>
                        <div class="profile-field">
                            <label for="profileEmailInput">Correo</label>
                            <input type="email" id="profileEmailInput" placeholder="tucorreo@nexusgear.com">
                        </div>
                        <div class="profile-field">
                            <label for="profilePhoneInput">Teléfono</label>
                            <input type="tel" id="profilePhoneInput" placeholder="Tu teléfono">
                        </div>
                        <div class="profile-field">
                            <label for="profilePlanInput">Plan</label>
                            <select id="profilePlanInput">
                                <option value="starter">Nexus Starter</option>
                                <option value="pro">Nexus Pro</option>
                                <option value="elite">Nexus Elite</option>
                            </select>
                        </div>
                        <div class="profile-field full">
                            <label for="profileAddressInput">Dirección de envío</label>
                            <input type="text" id="profileAddressInput" placeholder="Agrega una dirección para tus compras">
                        </div>
                        <div class="profile-field full">
                            <label for="profileBioInput">Sobre ti</label>
                            <textarea id="profileBioInput" placeholder="Cuéntanos un poco de tu setup o tus gustos tech..."></textarea>
                        </div>
                    </div>
                    <div class="profile-actions-bar">
                        <button class="btn btn-primary" onclick="saveProfile()">
                            <i class="fas fa-save"></i> Guardar cambios
                        </button>
                        <button class="btn btn-secondary" onclick="closeProfile()">
                            <i class="fas fa-arrow-left"></i> Cerrar perfil
                        </button>
                    </div>
                </div>

                <div class="profile-card" style="margin-top: 22px;">
                    <h3>Actividad reciente</h3>
                    <ul class="profile-list" id="profileActivityList">
                        <li>
                            <div>
                                <strong>Tu cuenta está lista</strong>
                                <small>Completa tu perfil para personalizar recomendaciones.</small>
                            </div>
                            <span class="profile-mini-tag">Nuevo</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <div class="profile-card">
                    <h3>Resumen de tu cuenta</h3>
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <div class="value" id="profileStatProducts">0</div>
                            <div class="label">Productos en carrito</div>
                        </div>
                        <div class="profile-stat">
                            <div class="value" id="profileStatAmount">$0</div>
                            <div class="label">Valor de carrito</div>
                        </div>
                        <div class="profile-stat">
                            <div class="value" id="profileStatMember">Starter</div>
                            <div class="label">Membresía actual</div>
                        </div>
                        <div class="profile-stat">
                            <div class="value" id="profileStatSetup">82%</div>
                            <div class="label">Setup completado</div>
                        </div>
                    </div>
                </div>

                <div class="profile-card" style="margin-top: 22px;">
                    <h3>Accesos rápidos</h3>
                    <div class="profile-actions-bar">
                        <button class="btn btn-secondary btn-full" onclick="openCart(); closeProfile();">
                            <i class="fas fa-shopping-cart"></i> Ver carrito
                        </button>
                        <button class="btn btn-secondary btn-full" onclick="viewOrders()">
                            <i class="fas fa-box"></i> Mis pedidos
                        </button>
                        <button class="btn btn-secondary btn-full" onclick="showNotification('Próximamente podrás configurar métodos de pago.', 'info')">
                            <i class="fas fa-credit-card"></i> Métodos de pago
                        </button>
                    </div>
                </div>

                <div class="profile-card" style="margin-top: 22px;">
                    <h3>Estado de pedidos</h3>
                    <ul class="profile-list" id="profileOrdersList">
                        <li>
                            <div>
                                <strong>No hay pedidos todavía</strong>
                                <small>Cuando finalices una compra aparecerá aquí.</small>
                            </div>
                            <span class="profile-mini-tag">0 pedidos</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- ASISTENTE DE IA -->
    <div class="ai-assistant" id="aiAssistant">
        <div class="ai-header">
            <div class="ai-title">
                <i class="fas fa-robot"></i>
                <span>Nexus Assistant</span>
            </div>
            <button class="ai-close" onclick="toggleAssistant()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="ai-message" id="aiMessage">
            ¡Hola! Soy Nexus, tu asistente personal. ¿En qué puedo ayudarte hoy? Puedo buscar productos, recomendarte gear o aplicar descuentos.
        </div>
        <div class="ai-actions">
            <button class="btn btn-primary btn-small" onclick="askAI('productos recomendados')">
                <i class="fas fa-thumbs-up"></i> Recomendaciones
            </button>
            <button class="btn btn-secondary btn-small" onclick="startVoiceAssistant()">
                <i class="fas fa-microphone"></i> Hablar
            </button>
        </div>
    </div>

    <!-- FOOTER -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-column">
                    <h4>NEXUS GEAR</h4>
                    <p style="color: var(--gray); line-height: 1.6; margin-bottom: 20px;">
                        Conectando tu equipo al futuro desde 2023. Tecnología, innovación y comunidad.
                    </p>
                    <div style="display: flex; gap: 15px; margin-top: 20px;">
                        <a href="#" style="color: var(--gray); font-size: 1.2rem;"><i class="fab fa-twitter"></i></a>
                        <a href="#" style="color: var(--gray); font-size: 1.2rem;"><i class="fab fa-instagram"></i></a>
                        <a href="#" style="color: var(--gray); font-size: 1.2rem;"><i class="fab fa-discord"></i></a>
                        <a href="#" style="color: var(--gray); font-size: 1.2rem;"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <div class="footer-column">
                    <h4>NAVEGACIÓN</h4>
                    <ul class="footer-links">
                        <li><a href="#home">Inicio</a></li>
                        <li><a href="#products">Productos</a></li>
                        <li><a href="#categories">Categorías</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#users">Comunidad</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h4>SOPORTE</h4>
                    <ul class="footer-links">
                        <li><a href="#">Centro de ayuda</a></li>
                        <li><a href="#">Estado del sistema</a></li>
                        <li><a href="#">Guías de setup</a></li>
                        <li><a href="#">Contactar soporte</a></li>
                        <li><a href="#">Política de devoluciones</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h4>LEGAL</h4>
                    <ul class="footer-links">
                        <li><a href="#">Términos de servicio</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                        <li><a href="#">Aviso legal</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 Nexus Gear. Todos los derechos reservados. | "Conecta tu equipo"</p>
                <p style="margin-top: 10px; font-size: 0.8rem;">
                    <i class="fas fa-bolt" style="color: var(--primary);"></i> Tecnología Web 4.0 | 
                    <i class="fas fa-brain" style="color: var(--secondary);"></i> IA Integrada | 
                    <i class="fas fa-microphone" style="color: var(--accent);"></i> Control por Voz
                </p>
            </div>
        </div>
    </footer>


    <!-- MODAL DE PRODUCTO -->
    <div class="product-modal-overlay" id="productModalOverlay" onclick="closeProductModal(event)">
        <div class="product-modal" role="dialog" aria-modal="true" aria-labelledby="productModalTitle">
            <div class="product-modal-grid">
                <div class="product-modal-media">
                    <img id="productModalImage" src="" alt="Vista del producto">
                </div>
                <div class="product-modal-content">
                    <div class="product-modal-top">
                        <div>
                            <div class="product-modal-category" id="productModalCategory"></div>
                            <h2 class="product-modal-title" id="productModalTitle"></h2>
                        </div>
                        <button class="product-modal-close" onclick="closeProductModal()" aria-label="Cerrar detalle del producto">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="product-modal-price" id="productModalPrice"></div>
                    <p class="product-modal-description" id="productModalDescription"></p>
                    <div class="product-modal-chips" id="productModalChips"></div>
                    <div class="product-specs" id="productModalSpecs"></div>
                    <ul class="product-feature-list" id="productModalFeatures"></ul>
                    <div class="product-modal-actions">
                        <button class="btn btn-primary" id="productModalAddBtn">
                            <i class="fas fa-cart-plus"></i> Añadir al carrito
                        </button>
                        <button class="btn btn-secondary" onclick="closeProductModal()">
                            <i class="fas fa-arrow-left"></i> Seguir viendo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
  <div class="loading" id="loading">
      <!-- ... contenido de carga ... -->
  </div>
  <Navbar />

  <main>
    <HeroSection />
  </main>

  <header>
      <!-- ... tu header ... -->
  </header>
  
  <section class="hero" id="home">
      <!-- ... tu hero ... -->
  </section>
  
  <!-- Pega el resto de tus secciones estáticas aquí -->
  
  <footer>
      <!-- ... tu footer ... -->
  </footer>
</template>