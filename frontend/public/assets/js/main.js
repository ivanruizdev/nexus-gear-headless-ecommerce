// ===== DATOS DE LA APLICACIÓN =====
        const productos = [
            {
                id: 1,
                nombre: "Nexus Link Pro",
                precio: 159.99,
                imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                categoria: "Audio",
                destacado: true,
                descuento: 15
            },
            {
                id: 2,
                nombre: "Nexus Mech X9",
                precio: 99.00,
                imagen: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop",
                categoria: "Periféricos",
                destacado: true,
                nuevo: true
            },
            {
                id: 3,
                nombre: "Nexus Quantum Display",
                precio: 449.99,
                imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
                categoria: "Visual",
                destacado: true
            },
            {
                id: 4,
                nombre: "Nexus Pulse Mouse",
                precio: 69.99,
                imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
                categoria: "Periféricos",
                destacado: true,
                descuento: 10
            },
            {
                id: 5,
                nombre: "Nexus Vision Cam",
                precio: 139.99,
                imagen: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
                categoria: "Visual",
                destacado: true,
                nuevo: true
            },
            {
                id: 6,
                nombre: "Nexus Fusion Dock",
                precio: 55.50,
                imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
                categoria: "Conexión",
                destacado: true
            }
        ];

        function generateUUID() {
            if (window.crypto && typeof window.crypto.randomUUID === 'function') {
                return window.crypto.randomUUID();
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        function initializeProductUUIDs() {
            const savedMap = JSON.parse(localStorage.getItem('nexusProductUUIDMap')) || {};
            productos.forEach(producto => {
                if (!savedMap[producto.id]) {
                    savedMap[producto.id] = generateUUID();
                }
                producto.uuid = savedMap[producto.id];
            });
            localStorage.setItem('nexusProductUUIDMap', JSON.stringify(savedMap));
        }

        initializeProductUUIDs();

        // ===== ESTADO DE LA APLICACIÓN =====
        let carrito = JSON.parse(localStorage.getItem('nexusCart')) || [];
        let usuarioActual = JSON.parse(localStorage.getItem('nexusUser')) || { tipo: 'guest', nombre: 'Invitado Nexus', email: 'guest@nexusgear.com', telefono: '', direccion: '', bio: '', fecha: new Date().toISOString(), uuid: generateUUID() };
        if (!usuarioActual.uuid) {
            usuarioActual.uuid = generateUUID();
            localStorage.setItem('nexusUser', JSON.stringify(usuarioActual));
        }
        let pedidos = JSON.parse(localStorage.getItem('nexusOrders')) || [];
        let aiVisible = false;
        let voiceRecognition = null;
        let voiceOverlayRef = null;
        let categoriaActual = 'todas';
        let terminoBusqueda = '';
        let comportamientoUsuario = JSON.parse(localStorage.getItem('nexusBehavior')) || {
            searches: [],
            categoryClicks: [],
            viewedProducts: [],
            cartAdds: [],
            profileSnapshots: []
        };

        // ===== INICIALIZACIÓN =====
        document.addEventListener('DOMContentLoaded', function() {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                document.getElementById('loadingBar').style.width = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        document.getElementById('loading').classList.add('hidden');
                        showWelcomeMessage();
                        loadFeaturedProducts();
                        renderRecommendedProducts();
                        updateAIRecommendations();
                        renderCart();
                    }, 300);
                }
            }, 100);

            setupEventListeners();
        });

        function setupEventListeners() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            setTimeout(() => {
                if (!sessionStorage.getItem('assistantShown')) {
                    toggleAssistant();
                    sessionStorage.setItem('assistantShown', 'true');
                }
            }, 5000);

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeCart();
                }
            });
        }

        function normalizeText(value) {
            return (value || '')
                .toString()
                .normalize('NFD')
                .replace(/[̀-ͯ]/g, '')
                .toLowerCase();
        }

        function mapCategory(category) {
            const normalized = normalizeText(category);
            const aliases = {
                'audio': 'audio',
                'perifericos': 'perifericos',
                'visual': 'visual',
                'conexion': 'conexion',
                'gaming': 'gaming',
                'streaming': 'streaming'
            };

            if (aliases[normalized]) return aliases[normalized];

            if (normalized.includes('perifer')) return 'perifericos';
            if (normalized.includes('conex')) return 'conexion';
            if (normalized.includes('audio')) return 'audio';
            if (normalized.includes('visual')) return 'visual';
            return normalized;
        }

        function getProductFilterTags(producto) {
            const baseTags = [mapCategory(producto.categoria), normalizeText(producto.nombre)];
            const extraTags = {
                1: ['gaming', 'streaming', 'auriculares', 'headset', 'microfono'],
                2: ['gaming', 'teclado', 'mecanico', 'productividad'],
                3: ['gaming', 'monitor', 'pantalla', 'streaming', 'creador'],
                4: ['gaming', 'mouse', 'raton', 'perifericos'],
                5: ['streaming', 'camara', 'webcam', 'creador', 'visual'],
                6: ['dock', 'hub', 'usb-c', 'conexion', 'oficina']
            };
            return [...baseTags, ...(extraTags[producto.id] || [])];
        }

        function productMatchesCategory(producto, categoria) {
            if (!categoria || categoria === 'todas') return true;
            const mappedCategory = mapCategory(producto.categoria);
            const tags = getProductFilterTags(producto);
            return mappedCategory === categoria || tags.includes(categoria);
        }

        function productMatchesSearch(producto, searchTerm) {
            if (!searchTerm) return true;
            const query = normalizeText(searchTerm);
            const details = getProductDetails(producto);
            const searchable = [
                producto.nombre,
                producto.categoria,
                details.descripcion,
                ...Object.keys(details.specs || {}),
                ...Object.values(details.specs || {}),
                ...(details.chips || []),
                ...(details.features || []),
                ...getProductFilterTags(producto)
            ].map(normalizeText).join(' ');

            if (searchable.includes(query)) return true;

            const stopWords = ['quiero','ver','buscar','busco','cosas','producto','productos','de','del','la','el','los','las','para','ir','a','seccion','seccion','mostrar','muestrame','dame','todo','todos','todas'];
            const tokens = query
                .split(/\s+/)
                .map(token => token.trim())
                .filter(token => token.length >= 3 && !stopWords.includes(token));

            if (!tokens.length) return false;
            return tokens.some(token => searchable.includes(token));
        }

        function getSearchableSections() {
            return [
                { id: 'home', label: 'Inicio', keywords: ['inicio', 'home', 'principal', 'portada'] },
                { id: 'products', label: 'Productos', keywords: ['productos', 'catalogo', 'tienda', 'gear', 'articulos'] },
                { id: 'categories', label: 'Categorías', keywords: ['categorias', 'categoria', 'familias', 'tipos'] },
                { id: 'recommendations', label: 'Recomendaciones IA', keywords: ['recomendaciones', 'recomendados', 'ia', 'inteligencia artificial', 'para ti', 'sugerencias'] },
                { id: 'features', label: 'Nexus Features', keywords: ['features', 'funciones', 'caracteristicas', 'nexus features', 'asistente', 'voz'] },
                { id: 'users', label: 'Comunidad y membresías', keywords: ['comunidad', 'membresia', 'membresias', 'planes', 'starter', 'pro', 'elite'] }
            ];
        }

        function resolveSearchIntent(rawTerm) {
            const query = normalizeText(rawTerm).trim();
            if (!query) return { type: 'empty' };

            if (['carrito', 'cart', 'compras'].some(word => query.includes(word))) {
                return { type: 'action', action: 'cart', label: 'Carrito' };
            }
            if (['perfil', 'cuenta', 'usuario', 'mi cuenta'].some(word => query.includes(word))) {
                return { type: 'action', action: 'profile', label: 'Perfil' };
            }

            const productMatch = productos.find(producto => {
                const productName = normalizeText(producto.nombre);
                return query === productName || productName.includes(query) || query.includes(productName);
            });
            if (productMatch) return { type: 'product', product: productMatch };

            const categories = ['audio', 'perifericos', 'visual', 'conexion', 'gaming', 'streaming'];
            const categoryAliases = {
                audio: ['audio', 'audifonos', 'auriculares', 'headset', 'sonido', 'microfono'],
                perifericos: ['perifericos', 'teclado', 'mouse', 'raton', 'mecanico'],
                visual: ['visual', 'monitor', 'pantalla', 'display', 'camara', 'webcam'],
                conexion: ['conexion', 'usb', 'usb-c', 'dock', 'hub', 'adaptador', 'cable'],
                gaming: ['gaming', 'gamer', 'juegos', 'game', 'consola'],
                streaming: ['streaming', 'stream', 'creador', 'contenido', 'video']
            };
            for (const category of categories) {
                if ((categoryAliases[category] || []).some(word => query.includes(word))) {
                    return { type: 'category', category, label: category };
                }
            }

            const section = getSearchableSections().find(item =>
                item.keywords.some(keyword => query === normalizeText(keyword) || query.includes(normalizeText(keyword)))
            );
            if (section) return { type: 'section', section };

            return { type: 'general' };
        }

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (!section) return false;
            window.scrollTo({ top: section.offsetTop - 90, behavior: 'smooth' });
            return true;
        }


        function saveBehavior() {
            localStorage.setItem('nexusBehavior', JSON.stringify(comportamientoUsuario));
        }

        function pushLimited(arrayRef, value, limit = 20) {
            if (!value && value !== 0) return;
            arrayRef.unshift(value);
            if (arrayRef.length > limit) arrayRef.length = limit;
        }

        function trackBehavior(type, payload) {
            if (!comportamientoUsuario[type]) comportamientoUsuario[type] = [];
            pushLimited(comportamientoUsuario[type], payload);
            saveBehavior();
        }

        function getProfileTags() {
            const tags = [];
            const plan = normalizeText(usuarioActual.tipo || 'guest');
            const bio = normalizeText(usuarioActual.bio || '');
            const address = normalizeText(usuarioActual.direccion || '');

            if (plan.includes('starter') || plan.includes('guest')) tags.push('conexion', 'perifericos');
            if (plan.includes('pro')) tags.push('gaming', 'audio', 'perifericos');
            if (plan.includes('elite')) tags.push('visual', 'audio', 'streaming');
            if (bio.includes('stream')) tags.push('streaming', 'visual');
            if (bio.includes('gaming') || bio.includes('gamer')) tags.push('gaming', 'audio', 'perifericos');
            if (bio.includes('trabajo') || bio.includes('productividad') || bio.includes('oficina')) tags.push('conexion', 'perifericos');
            if (bio.includes('contenido') || bio.includes('creador')) tags.push('visual', 'streaming');
            if (address.includes('oficina') || address.includes('estudio')) tags.push('conexion');
            return tags;
        }

        function explainRecommendation(producto) {
            const reasons = [];
            const tags = getProductFilterTags(producto);
            const searches = (comportamientoUsuario.searches || []).map(normalizeText);
            const categoryClicks = (comportamientoUsuario.categoryClicks || []).map(normalizeText);
            const profileTags = getProfileTags();
            const viewedIds = comportamientoUsuario.viewedProducts || [];
            const cartIds = comportamientoUsuario.cartAdds || [];

            if (searches.some(search => search && tags.some(tag => tag.includes(search) || search.includes(tag)))) {
                reasons.push('coincide con tus búsquedas recientes');
            }
            if (categoryClicks.some(cat => tags.includes(cat))) {
                reasons.push('se relaciona con categorías que visitaste');
            }
            if (profileTags.some(tag => tags.includes(tag))) {
                reasons.push('encaja con tu perfil de uso');
            }
            if (viewedIds.includes(producto.id)) {
                reasons.push('ya lo revisaste antes');
            }
            if (cartIds.some(id => id !== producto.id && mapCategory((productos.find(p => p.id === id) || {}).categoria) === mapCategory(producto.categoria))) {
                reasons.push('combina con artículos de tu carrito');
            }

            return reasons.slice(0,2).join(' y ') || 'puede complementar tu setup actual';
        }

        function scoreProduct(producto) {
            let score = 0;
            const tags = getProductFilterTags(producto);
            const searches = (comportamientoUsuario.searches || []).map(normalizeText);
            const categoryClicks = (comportamientoUsuario.categoryClicks || []).map(normalizeText);
            const viewedIds = comportamientoUsuario.viewedProducts || [];
            const cartIds = comportamientoUsuario.cartAdds || [];
            const profileTags = getProfileTags();

            searches.forEach((search, idx) => {
                if (search && tags.some(tag => tag.includes(search) || search.includes(tag))) {
                    score += Math.max(8 - idx, 2);
                }
            });

            categoryClicks.forEach((cat, idx) => {
                if (tags.includes(cat)) score += Math.max(7 - idx, 2);
            });

            profileTags.forEach(tag => {
                if (tags.includes(tag)) score += 5;
            });

            viewedIds.forEach((id, idx) => {
                const viewedProduct = productos.find(p => p.id === id);
                if (!viewedProduct) return;
                const viewedCategory = mapCategory(viewedProduct.categoria);
                if (viewedCategory === mapCategory(producto.categoria) && id !== producto.id) {
                    score += Math.max(6 - idx, 1);
                }
            });

            cartIds.forEach((id, idx) => {
                const cartProduct = productos.find(p => p.id === id);
                if (!cartProduct) return;
                const cartCategory = mapCategory(cartProduct.categoria);
                if (cartCategory === mapCategory(producto.categoria) && id !== producto.id) {
                    score += Math.max(9 - idx, 3);
                }
            });

            if (producto.descuento) score += 2;
            if (producto.nuevo) score += 1;
            if (producto.id === viewedIds[0]) score += 3;

            return score;
        }

        function getPersonalizedRecommendations(limit = 3) {
            const sorted = [...productos]
                .filter(producto => producto.destacado)
                .map(producto => ({ producto, score: scoreProduct(producto) }))
                .sort((a, b) => b.score - a.score || a.producto.precio - b.producto.precio)
                .slice(0, limit)
                .map(item => item.producto);
            return sorted;
        }

        function renderRecommendedProducts() {
            const container = document.getElementById('recommendedProducts');
            const note = document.getElementById('recommendationNote');
            if (!container || !note) return;

            const recommendations = getPersonalizedRecommendations(3);
            if (!recommendations.length) {
                container.innerHTML = '';
                note.textContent = 'Explora la página para que la IA pueda generar mejores sugerencias.';
                return;
            }

            const hasBehavior = (comportamientoUsuario.searches || []).length || (comportamientoUsuario.categoryClicks || []).length || (comportamientoUsuario.viewedProducts || []).length || (comportamientoUsuario.cartAdds || []).length;
            note.textContent = hasBehavior
                ? 'Estas sugerencias cambian automáticamente según tu perfil, tus búsquedas recientes y la forma en que navegas dentro de la tienda.'
                : 'Estas son sugerencias iniciales. Mientras más interactúes con la tienda, más precisas se volverán.';

            container.innerHTML = recommendations.map(producto => {
                const precioFinal = producto.descuento ? (producto.precio * (1 - producto.descuento/100)).toFixed(2) : producto.precio.toFixed(2);
                return `
                    <div class="product-card">
                        ${producto.descuento ? `<div class="discount-badge">-${producto.descuento}%</div>` : ''}
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop';">
                        <div class="product-info">
                            <div class="product-category">${producto.categoria}</div>
                            <div class="product-name">${producto.nombre}</div>
                            <div class="product-price">${producto.descuento ? `<span style="text-decoration: line-through; color: var(--gray); font-size: 1rem; margin-right: 10px;">$${producto.precio.toFixed(2)}</span>` : ''}$${precioFinal}</div>
                            <div class="why-recommended"><i class="fas fa-wand-magic-sparkles"></i> Te lo sugerimos porque ${explainRecommendation(producto)}.</div>
                            <div class="product-actions" style="margin-top: 14px;">
                                <button class="btn btn-primary btn-small" onclick="addToCart(${producto.id})"><i class="fas fa-cart-plus"></i> Añadir</button>
                                <button class="btn btn-secondary btn-small" onclick="viewProduct(${producto.id})"><i class="fas fa-eye"></i> Ver</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateAIRecommendations() {
            const recommendations = getPersonalizedRecommendations(2);
            const aiMessage = document.getElementById('aiMessage');
            if (!aiMessage || !recommendations.length) return;
            aiMessage.innerHTML = `Te recomiendo <strong>${recommendations[0].nombre}</strong>${recommendations[1] ? ` y <strong>${recommendations[1].nombre}</strong>` : ''} porque coinciden con tu perfil y tu navegación reciente.`;
        }

        function getFilteredProducts() {
            return productos.filter(producto => {
                const matchesCategory = productMatchesCategory(producto, categoriaActual);
                const matchesSearch = productMatchesSearch(producto, terminoBusqueda);
                return producto.destacado && matchesCategory && matchesSearch;
            });
        }

        function renderProductsList(productsToRender) {
            const container = document.getElementById('featuredProducts');
            if (!container) return;
            container.innerHTML = '';

            if (!productsToRender.length) {
                container.innerHTML = `
                    <div style="grid-column: 1 / -1; background: white; border: 1px solid var(--border-light); border-radius: 18px; padding: 40px; text-align: center; box-shadow: var(--shadow-sm);">
                        <i class="fas fa-search" style="font-size: 2.5rem; color: var(--secondary); margin-bottom: 15px;"></i>
                        <h3 style="margin-bottom: 10px; color: var(--light);">No encontramos productos</h3>
                        <p style="color: var(--gray); line-height: 1.6;">Prueba con otra categoría o escribe otra palabra en el buscador.</p>
                        <button class="btn btn-secondary" style="margin-top: 20px;" onclick="clearFilters()">
                            <i class="fas fa-rotate-left"></i> Limpiar filtros
                        </button>
                    </div>
                `;
                updateSearchUI();
                return;
            }
            
            productsToRender.forEach(producto => {
                const card = document.createElement('div');
                card.className = 'product-card';
                
                let badges = '';
                if (producto.descuento) {
                    badges += `<div class="discount-badge">-${producto.descuento}%</div>`;
                }
                if (producto.nuevo) {
                    badges += `<div class="discount-badge new-badge" style="left: auto; right: 15px; top: 15px;">NUEVO</div>`;
                }
                
                const precioFinal = producto.descuento 
                    ? (producto.precio * (1 - producto.descuento/100)).toFixed(2)
                    : producto.precio.toFixed(2);
                
                card.innerHTML = `
                    ${badges}
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop';">
                    <div class="product-info">
                        <div class="product-category">${producto.categoria}</div>
                        <div class="product-name">${producto.nombre}</div>
                        <div class="product-price">
                            ${producto.descuento ? `<span style="text-decoration: line-through; color: var(--gray); font-size: 1rem; margin-right: 10px;">$${producto.precio.toFixed(2)}</span>` : ''}
                            $${precioFinal}
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary btn-small" onclick="addToCart(${producto.id})">
                                <i class="fas fa-cart-plus"></i> Añadir
                            </button>
                            <button class="btn btn-secondary btn-small" onclick="viewProduct(${producto.id})">
                                <i class="fas fa-eye"></i> Ver
                            </button>
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            });

            updateSearchUI();
        }

        function loadFeaturedProducts() {
            renderProductsList(getFilteredProducts());
        }

        function updateSearchUI() {
            const input = document.querySelector('#searchBar input');
            if (input && input.value !== terminoBusqueda) {
                input.value = terminoBusqueda;
            }

            document.querySelectorAll('.category-card').forEach(card => {
                const cardCategory = card.getAttribute('data-category') || 'todas';
                if (cardCategory === categoriaActual) {
                    card.style.borderColor = 'var(--primary)';
                    card.style.boxShadow = 'var(--shadow-md), var(--neon-glow)';
                    card.style.transform = 'translateY(-10px)';
                } else {
                    card.style.borderColor = 'var(--border-light)';
                    card.style.boxShadow = 'var(--shadow-sm)';
                    card.style.transform = '';
                }
            });
        }

        function applyFilters(showMessage = false) {
            loadFeaturedProducts();
            if (showMessage) {
                const results = getFilteredProducts().length;
                const categoryLabel = categoriaActual === 'todas' ? 'todas las categorías' : categoriaActual;
                const searchLabel = terminoBusqueda ? ` y búsqueda "${terminoBusqueda}"` : '';
                showNotification(`${results} producto(s) encontrados en ${categoryLabel}${searchLabel}`, 'info');
            }
        }

        function clearFilters() {
            categoriaActual = 'todas';
            terminoBusqueda = '';
            const existingSearch = document.getElementById('searchBar');
            if (existingSearch) {
                const input = existingSearch.querySelector('input');
                if (input) input.value = '';
            }
            loadFeaturedProducts();
            renderRecommendedProducts();
            updateAIRecommendations();
            showNotification('Filtros limpiados correctamente', 'info');
        }

        function addToCart(productId) {
            const producto = productos.find(p => p.id === productId);
            const existing = carrito.find(item => item.id === productId);
            const MAX_PRODUCTOS_DISTINTOS = 10;

            if (!producto) {
                showNotification('No se pudo agregar el producto seleccionado.', 'error');
                return;
            }

            if (existing) {
                existing.cantidad++;
            } else {
                if (carrito.length >= MAX_PRODUCTOS_DISTINTOS) {
                    showNotification('Solo puedes tener hasta 10 productos distintos en el carrito.', 'error');
                    openCart();
                    return;
                }

                carrito.push({
                    ...producto,
                    cantidad: 1
                });
            }

            trackBehavior('cartAdds', producto.id);
            saveCart();
            renderRecommendedProducts();
            updateAIRecommendations();
            showNotification(`${producto.nombre} añadido al carrito`, 'success');
        }

        function updateCartCount() {
            const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            const cartCountEl = document.querySelector('.cart-count');
            if (cartCountEl) cartCountEl.textContent = total;
            const productsCountEl = document.getElementById('cartProductsCount');
            if (productsCountEl) productsCountEl.textContent = total;
        }

        function getProductUnitPrice(producto) {
            return producto.descuento
                ? producto.precio * (1 - producto.descuento / 100)
                : producto.precio;
        }

        function getMembershipDiscountRate() {
            const plan = normalizeText(usuarioActual.tipo || 'guest');
            if (plan.includes('elite')) return 0.12;
            if (plan.includes('pro')) return 0.08;
            if (plan.includes('starter')) return 0.04;
            return 0;
        }

        function getMembershipLabel() {
            const plan = normalizeText(usuarioActual.tipo || 'guest');
            if (plan.includes('elite')) return 'Descuento membresía Elite (12%)';
            if (plan.includes('pro')) return 'Descuento membresía Pro (8%)';
            if (plan.includes('starter')) return 'Descuento membresía Starter (4%)';
            return 'Descuento membresía';
        }

        function calculateCartTotals() {
            const subtotal = carrito.reduce((sum, item) => sum + (getProductUnitPrice(item) * item.cantidad), 0);
            const tax = subtotal * 0.16;
            const discountRate = getMembershipDiscountRate();
            const discount = (subtotal + tax) * discountRate;
            const total = Math.max((subtotal + tax) - discount, 0);

            return {
                subtotal,
                tax,
                discountRate,
                discount,
                total
            };
        }

        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const subtotalEl = document.getElementById('cartSubtotal');
            const taxEl = document.getElementById('cartTax');
            const discountEl = document.getElementById('cartDiscount');
            const discountLabelEl = document.getElementById('cartDiscountLabel');
            const totalEl = document.getElementById('cartTotal');
            if (!cartItems || !subtotalEl || !totalEl || !taxEl || !discountEl || !discountLabelEl) return;

            if (!carrito.length) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--gray); margin-bottom: 15px;"></i>
                        <p>Tu carrito está vacío.</p>
                        <p style="font-size: 0.9rem; color: var(--gray); margin-top: 8px;">Agrega productos desde la sección destacada.</p>
                    </div>
                `;
                subtotalEl.textContent = '$0.00';
                taxEl.textContent = '$0.00';
                discountEl.textContent = '-$0.00';
                discountLabelEl.textContent = getMembershipLabel();
                totalEl.textContent = '$0.00';
                updateCartCount();
                return;
            }

            cartItems.innerHTML = carrito.map(item => {
                const precioUnitario = getProductUnitPrice(item);

                return `
                    <div class="cart-item">
                        <img src="${item.imagen}" alt="${item.nombre}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop';">
                        <div style="flex: 1;">
                            <div class="cart-item-name">${item.nombre}</div>
                            <div class="cart-item-meta">${item.categoria}</div>
                            <div class="cart-item-price">$${precioUnitario.toFixed(2)} c/u</div>
                            <div class="cart-item-controls">
                                <button class="btn btn-secondary btn-small" onclick="changeCartQuantity(${item.id}, -1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span style="min-width: 30px; text-align: center; font-weight: 700;">${item.cantidad}</span>
                                <button class="btn btn-secondary btn-small" onclick="changeCartQuantity(${item.id}, 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="btn btn-secondary btn-small" onclick="removeFromCart(${item.id})" style="margin-left: auto;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            const totals = calculateCartTotals();
            subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
            taxEl.textContent = `$${totals.tax.toFixed(2)}`;
            discountLabelEl.textContent = getMembershipLabel();
            discountEl.textContent = `-$${totals.discount.toFixed(2)}`;
            totalEl.textContent = `$${totals.total.toFixed(2)}`;
            updateCartCount();
        }

        function saveCart() {
            localStorage.setItem('nexusCart', JSON.stringify(carrito));
            renderCart();
            fillProfileData();
        }

        function openCart() {
            renderCart();
            const drawer = document.getElementById('cartDrawer');
            const overlay = document.getElementById('cartOverlay');
            if (drawer) drawer.classList.add('open');
            if (overlay) overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        function closeCart() {
            const drawer = document.getElementById('cartDrawer');
            const overlay = document.getElementById('cartOverlay');
            if (drawer) drawer.classList.remove('open');
            if (overlay) overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }

        function changeCartQuantity(productId, change) {
            const item = carrito.find(producto => producto.id === productId);
            if (!item) return;

            item.cantidad += change;

            if (item.cantidad <= 0) {
                carrito = carrito.filter(producto => producto.id !== productId);
            }

            saveCart();
        }

        function removeFromCart(productId) {
            const producto = carrito.find(item => item.id === productId);
            carrito = carrito.filter(item => item.id !== productId);
            saveCart();
            if (producto) {
                showNotification(`${producto.nombre} eliminado del carrito`, 'info');
            }
        }

        function clearCart() {
            carrito = [];
            saveCart();
            showNotification('Carrito vaciado correctamente', 'info');
        }

        function checkoutCart() {
            if (!carrito.length) {
                showNotification('Tu carrito está vacío', 'error');
                return;
            }

            if (!usuarioActual.nombre || !usuarioActual.email || !usuarioActual.direccion) {
                showNotification('Completa nombre, correo y dirección en tu perfil antes de finalizar la compra.', 'info');
                closeCart();
                viewProfile();
                const addressInput = document.getElementById('profileAddressInput');
                if (addressInput) setTimeout(() => addressInput.focus(), 250);
                return;
            }

            const nuevoPedido = buildOrderFromCart();
            pedidos.push(nuevoPedido);
            saveOrders();
            syncCurrentUserRecord();
            carrito = [];
            saveCart();
            closeCart();
            fillProfileData();
            showNotification(`Pedido ${nuevoPedido.id} creado por $${nuevoPedido.total.toFixed(2)} con impuestos y descuento aplicados.`, 'success');
            viewOrders();
        }

        function toggleAssistant() {
            const assistant = document.getElementById('aiAssistant');
            aiVisible = !aiVisible;
            if (aiVisible) assistant.classList.add('visible');
            else assistant.classList.remove('visible');
        }

        function showVoiceStatus(title = 'Escuchando...', message = 'Habla ahora. Estoy detectando tu voz.', state = 'listening') {
            const pill = document.getElementById('voiceStatusPill');
            const titleEl = document.getElementById('voiceStatusTitle');
            const textEl = document.getElementById('voiceStatusText');
            const iconEl = document.getElementById('voiceStatusIcon');
            const levelEl = document.getElementById('voiceLevel');
            if (!pill || !titleEl || !textEl || !iconEl) return;

            pill.className = `voice-status-pill visible ${state === 'listening' ? 'listening' : ''}`;
            titleEl.textContent = title;
            textEl.textContent = message;

            const icons = {
                listening: 'fa-microphone',
                detected: 'fa-comment-dots',
                success: 'fa-check-circle',
                error: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };
            iconEl.innerHTML = `<i class="fas ${icons[state] || icons.info}"></i>`;
            if (levelEl) levelEl.style.display = state === 'listening' ? 'block' : 'none';
        }

        function updateVoiceStatus(title, message, state = 'info') {
            showVoiceStatus(title, message, state);
        }

        function hideVoiceStatus(delay = 1800) {
            setTimeout(() => {
                const pill = document.getElementById('voiceStatusPill');
                if (pill) pill.classList.remove('visible', 'listening');
            }, delay);
        }

        function showVoiceOverlay(message = 'Escuchando...') {
            showVoiceStatus('Escuchando...', message, 'listening');
        }

        function updateVoiceOverlay(message) {
            updateVoiceStatus('Voz detectada', message, 'detected');
        }

        function hideVoiceOverlay() {
            hideVoiceStatus();
            voiceOverlayRef = null;
        }

        function normalizeVoiceText(texto) {
            return (texto || '')
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .trim();
        }

        function matchProductByVoice(query) {
            const normalizedQuery = normalizeVoiceText(query);
            if (!normalizedQuery) return null;
            return productos.find(producto => normalizeVoiceText(producto.nombre).includes(normalizedQuery))
                || productos.find(producto => normalizedQuery.includes(normalizeVoiceText(producto.nombre)));
        }

        function mapVoiceCategory(rawCommand) {
            const command = normalizeVoiceText(rawCommand);
            const categoryMap = [
                { keys: ['audio', 'auriculares', 'headphones'], value: 'audio' },
                { keys: ['perifericos', 'teclado', 'mouse'], value: 'perifericos' },
                { keys: ['visual', 'monitor', 'pantalla', 'camara'], value: 'visual' },
                { keys: ['conexion', 'dock', 'usb', 'usb c', 'hub'], value: 'conexion' },
                { keys: ['gaming', 'gamer', 'juegos'], value: 'gaming' },
                { keys: ['streaming', 'cam', 'webcam'], value: 'streaming' }
            ];
            const match = categoryMap.find(item => item.keys.some(key => command.includes(key)));
            return match ? match.value : null;
        }

        function executeVoiceSearch(query) {
            terminoBusqueda = query.trim();
            if (!terminoBusqueda) {
                showNotification('Di qué producto quieres buscar', 'info');
                return false;
            }
            trackBehavior('searches', terminoBusqueda);
            const searchBar = document.getElementById('searchBar');
            if (!searchBar) toggleSearch();
            const input = document.querySelector('#searchBar input');
            if (input) input.value = terminoBusqueda;
            applyFilters(true);
            renderRecommendedProducts();
            updateAIRecommendations();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
            showNotification(`Búsqueda por voz: ${terminoBusqueda}`, 'success');
            return true;
        }

        function processVoiceCommand(rawCommand) {
            const command = normalizeVoiceText(rawCommand);
            if (!command) return false;

            if (command.includes('ayuda') || command.includes('comandos')) {
                document.getElementById('aiMessage').textContent = 'Puedes decir: buscar audio, abrir carrito, abrir perfil, ver monitor, añadir teclado, ir a productos o recomendaciones.';
                if (!aiVisible) toggleAssistant();
                showNotification('Comandos de voz disponibles mostrados', 'info');
                return true;
            }

            if (command.includes('abrir carrito') || command.includes('ver carrito')) {
                openCart();
                showNotification('Abriendo carrito', 'success');
                return true;
            }

            if (command.includes('cerrar carrito')) {
                closeCart();
                showNotification('Carrito cerrado', 'info');
                return true;
            }

            if (command.includes('abrir perfil') || command.includes('mi perfil') || command.includes('ver perfil')) {
                viewProfile();
                showNotification('Abriendo perfil', 'success');
                return true;
            }

            if (command.includes('cerrar perfil')) {
                closeProfile();
                showNotification('Perfil cerrado', 'info');
                return true;
            }

            if (command.includes('inicio')) {
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                showNotification('Yendo a inicio', 'success');
                return true;
            }

            if (command.includes('productos')) {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                showNotification('Yendo a productos', 'success');
                return true;
            }

            if (command.includes('categorias')) {
                document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
                showNotification('Yendo a categorías', 'success');
                return true;
            }

            if (command.includes('comunidad')) {
                document.getElementById('users').scrollIntoView({ behavior: 'smooth' });
                showNotification('Yendo a comunidad', 'success');
                return true;
            }

            if (command.includes('features') || command.includes('funciones')) {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                showNotification('Yendo a Nexus Features', 'success');
                return true;
            }

            if (command.includes('recomendaciones') || command.includes('recomendacion')) {
                const recomendaciones = getPersonalizedRecommendations(2);
                const msg = recomendaciones.length
                    ? `Según tu navegación te recomiendo ${recomendaciones.map(p => p.nombre).join(' y ')}.`
                    : 'Aún necesito más interacción para darte recomendaciones más precisas.';
                document.getElementById('aiMessage').textContent = msg;
                if (!aiVisible) toggleAssistant();
                renderRecommendedProducts();
                showNotification('Mostrando recomendaciones IA', 'success');
                return true;
            }

            if (command.includes('limpiar filtros') || command.includes('quitar filtros') || command.includes('mostrar todos')) {
                clearFilters();
                showNotification('Filtros eliminados', 'success');
                return true;
            }

            const category = mapVoiceCategory(command);
            if (command.includes('categoria') || command.includes('filtra') || command.includes('mostrar')) {
                if (category) {
                    categoriaActual = category;
                    applyFilters(true);
                    renderRecommendedProducts();
                    updateAIRecommendations();
                    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    showNotification(`Filtrando por ${category}`, 'success');
                    return true;
                }
            }

            if (command.startsWith('buscar ')) {
                return executeVoiceSearch(command.replace(/^buscar\s+/, ''));
            }

            if (command.includes('buscar')) {
                const query = command.split('buscar').pop().trim();
                return executeVoiceSearch(query);
            }

            if (command.startsWith('ver ')) {
                const query = command.replace(/^ver\s+/, '');
                const product = matchProductByVoice(query);
                if (product) {
                    viewProduct(product.id);
                    showNotification(`Abriendo ${product.nombre}`, 'success');
                    return true;
                }
            }

            if (command.startsWith('abrir producto ')) {
                const query = command.replace(/^abrir producto\s+/, '');
                const product = matchProductByVoice(query);
                if (product) {
                    viewProduct(product.id);
                    showNotification(`Abriendo ${product.nombre}`, 'success');
                    return true;
                }
            }

            if (command.startsWith('anadir ') || command.startsWith('agregar ')) {
                const query = command.replace(/^(anadir|agregar)\s+/, '');
                const product = matchProductByVoice(query);
                if (product) {
                    addToCart(product.id);
                    showNotification(`${product.nombre} añadido al carrito por voz`, 'success');
                    return true;
                }
            }

            if (command.includes('cerrar producto') || command.includes('cerrar detalle')) {
                closeProductModal();
                showNotification('Detalle del producto cerrado', 'info');
                return true;
            }

            if (category) {
                return executeVoiceSearch(category);
            }

            return false;
        }

        function startVoiceAssistant() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                showNotification('Tu navegador no soporta reconocimiento de voz. Usa Chrome, Edge u Opera actualizado.', 'error');
                return;
            }

            if (voiceRecognition) {
                try { voiceRecognition.stop(); } catch (error) {}
                voiceRecognition = null;
                updateVoiceStatus('Micrófono detenido', 'Se canceló la escucha.', 'info');
                hideVoiceStatus(1400);
                showNotification('Micrófono detenido', 'info');
                return;
            }

            voiceRecognition = new SpeechRecognition();
            voiceRecognition.lang = 'es-MX';
            voiceRecognition.interimResults = true;
            voiceRecognition.maxAlternatives = 1;

            showVoiceStatus('Escuchando...', 'Habla ahora. Si detecto algo, aparecerá aquí.', 'listening');
            showNotification('Micrófono activado', 'info');

            voiceRecognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i]?.[0]?.transcript || '';
                    if (event.results[i].isFinal) finalTranscript += transcript;
                    else interimTranscript += transcript;
                }

                if (interimTranscript.trim()) {
                    updateVoiceStatus('Detectando voz...', `Escuché: "${interimTranscript.trim()}"`, 'detected');
                }

                if (finalTranscript.trim()) {
                    const finalText = finalTranscript.trim();
                    updateVoiceStatus('Comando recibido', `Detectado: "${finalText}"`, 'detected');
                    const executed = processVoiceCommand(finalText);
                    if (executed) {
                        updateVoiceStatus('Comando ejecutado', `Listo: "${finalText}"`, 'success');
                        hideVoiceStatus(2200);
                    } else {
                        updateVoiceStatus('No encontré resultado', `No existe o no entendí: "${finalText}"`, 'error');
                        showNotification(`No encontré nada para: "${finalText}"`, 'error');
                        hideVoiceStatus(3000);
                    }
                }
            };

            voiceRecognition.onerror = (event) => {
                const messages = {
                    'no-speech': 'No detecté voz. Intenta hablar un poco más fuerte.',
                    'audio-capture': 'No pude acceder al micrófono.',
                    'not-allowed': 'Debes permitir el uso del micrófono en el navegador.',
                    'network': 'Hubo un problema de red con el reconocimiento de voz.'
                };
                const msg = messages[event.error] || 'Error en el reconocimiento de voz.';
                updateVoiceStatus('Problema con el micrófono', msg, 'error');
                showNotification(msg, 'error');
                hideVoiceStatus(3500);
            };

            voiceRecognition.onend = () => {
                voiceRecognition = null;
                const pill = document.getElementById('voiceStatusPill');
                if (pill && pill.classList.contains('listening')) {
                    updateVoiceStatus('Micrófono detenido', 'No se detectó una frase final.', 'info');
                    hideVoiceStatus(2000);
                }
            };

            voiceRecognition.start();
        }

        function askAI(pregunta) {
            const recomendaciones = getPersonalizedRecommendations(2);
            const recomendadosTexto = recomendaciones.map(p => p.nombre).join(' y ');
            const respuestas = {
                'productos recomendados': recomendaciones.length
                    ? `Según tu perfil y tu navegación reciente te recomiendo ${recomendadosTexto}.`
                    : 'Aún necesito más interacción para darte recomendaciones personalizadas.',
                'descuento': 'Usa el código NEXUS15 para 15% de descuento en tu primera compra.',
                'ayuda': 'Puedo ayudarte a buscar productos, aplicar descuentos y recomendarte gear según tu perfil y navegación.'
            };
            const respuesta = respuestas[(pregunta || '').toLowerCase()] || 'Puedo ayudarte con productos, descuentos o recomendaciones personalizadas. ¿Qué te gustaría explorar?';
            document.getElementById('aiMessage').textContent = respuesta;
            if (!aiVisible) toggleAssistant();
        }



        function getUserPlanLabel(tipo) {
            const plans = {
                guest: 'Invitado',
                starter: 'Nexus Starter',
                pro: 'Nexus Pro',
                elite: 'Nexus Elite'
            };
            return plans[tipo] || 'Nexus Starter';
        }

        function getProfileInitials(nombre) {
            return (nombre || 'Nexus Gear')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map(parte => parte.charAt(0).toUpperCase())
                .join('');
        }

        function getCartSummary() {
            const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            const totalImporte = carrito.reduce((sum, item) => sum + (getProductUnitPrice(item) * item.cantidad), 0);
            return { totalProductos, totalImporte };
        }

        function formatMemberSince(fecha) {
            const value = fecha ? new Date(fecha) : new Date();
            return `Miembro desde ${value.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}`;
        }

        function saveOrders() {
            localStorage.setItem('nexusOrders', JSON.stringify(pedidos));
        }

        function getOrderStatusConfig(status) {
            const statuses = {
                confirmado: { label: 'Confirmado', color: 'var(--secondary)', detail: 'Tu compra fue confirmada y está en validación de pago.', icon: 'receipt' },
                preparando: { label: 'Preparando', color: 'var(--warning)', detail: 'Estamos preparando tus productos para el envío.', icon: 'box-open' },
                enviado: { label: 'Enviado', color: 'var(--primary)', detail: 'Tu pedido ya va en camino hacia tu dirección registrada.', icon: 'truck' },
                entregado: { label: 'Entregado', color: 'var(--success)', detail: 'El pedido fue entregado correctamente.', icon: 'check-circle' }
            };
            return statuses[status] || statuses.confirmado;
        }

        function estimateDeliveryDate(orderDate, status) {
            const baseDate = new Date(orderDate);
            const extraDays = status === 'confirmado' ? 5 : status === 'preparando' ? 3 : status === 'enviado' ? 1 : 0;
            baseDate.setDate(baseDate.getDate() + extraDays);
            return baseDate.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        function getCurrentOrderStatus() {
            const hour = new Date().getHours();
            if (hour < 10) return 'confirmado';
            if (hour < 15) return 'preparando';
            return 'enviado';
        }

        function buildOrderFromCart() {
            const createdAt = new Date().toISOString();
            const status = getCurrentOrderStatus();
            const totals = calculateCartTotals();
            const transactionUUID = generateUUID();
            return {
                id: `NG-${Date.now().toString().slice(-6)}`,
                uuid: transactionUUID,
                transactionUUID,
                fecha: createdAt,
                estado: status,
                subtotal: totals.subtotal,
                impuestos: totals.tax,
                descuentoMembresia: totals.discount,
                porcentajeDescuento: totals.discountRate,
                planMembresia: usuarioActual.tipo || 'guest',
                total: totals.total,
                productos: carrito.map(item => ({
                    id: item.id,
                    uuid: item.uuid || (productos.find(p => p.id === item.id) || {}).uuid || generateUUID(),
                    nombre: item.nombre,
                    categoria: item.categoria,
                    cantidad: item.cantidad,
                    precio: getProductUnitPrice(item),
                    imagen: item.imagen
                })),
                direccionEnvio: usuarioActual.direccion || 'Dirección pendiente de actualizar',
                destinatario: usuarioActual.nombre || 'Invitado Nexus',
                seguimiento: `NX-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
            };
        }

        function renderOrdersInProfile() {
            const ordersList = document.getElementById('profileOrdersList');
            if (!ordersList) return;

            if (!pedidos.length) {
                ordersList.innerHTML = `
                    <li>
                        <div>
                            <strong>No hay pedidos todavía</strong>
                            <small>Cuando finalices una compra, aquí verás tu historial y el estado de envío.</small>
                        </div>
                        <span class="profile-mini-tag">0 pedidos</span>
                    </li>
                `;
                return;
            }

            ordersList.innerHTML = pedidos.slice().reverse().map(order => {
                const status = getOrderStatusConfig(order.estado);
                const productsSummary = order.productos.map(product => `${product.nombre} x${product.cantidad}`).join(', ');
                return `
                    <li style="display:block;">
                        <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start; flex-wrap:wrap;">
                            <div style="min-width:220px; flex:1;">
                                <strong>Pedido ${order.id}</strong>
                                <small>${new Date(order.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</small>
                                <small><strong>Productos:</strong> ${productsSummary}</small>
                                <small><strong>Envío a:</strong> ${order.direccionEnvio}</small>
                                <small><strong>Guía:</strong> ${order.seguimiento}</small>
                                <small>${status.detail}</small>
                                <small><strong>Entrega estimada:</strong> ${estimateDeliveryDate(order.fecha, order.estado)}</small>
                            </div>
                            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:10px;">
                                <span class="profile-mini-tag" style="background:${status.color}; color:white;">
                                    <i class="fas fa-${status.icon}"></i> ${status.label}
                                </span>
                                <strong style="color:var(--primary); font-size:1.05rem;">$${Number(order.total).toFixed(2)}</strong>
                            </div>
                        </div>
                    </li>
                `;
            }).join('');
        }

        function fillProfileData() {
            const name = usuarioActual.nombre || 'Invitado Nexus';
            const email = usuarioActual.email || 'guest@nexusgear.com';
            const plan = getUserPlanLabel(usuarioActual.tipo || 'guest');
            const { totalProductos, totalImporte } = getCartSummary();
            const avatar = document.getElementById('profileAvatar');
            const heroName = document.getElementById('profileHeroName');
            const heroEmail = document.getElementById('profileHeroEmail');
            const heroMember = document.getElementById('profileHeroMemberSince');
            const heroPlan = document.getElementById('profileHeroPlan');
            const heroLevel = document.getElementById('profileHeroLevel');
            const nameInput = document.getElementById('profileNameInput');
            const emailInput = document.getElementById('profileEmailInput');
            const phoneInput = document.getElementById('profilePhoneInput');
            const planInput = document.getElementById('profilePlanInput');
            const addressInput = document.getElementById('profileAddressInput');
            const bioInput = document.getElementById('profileBioInput');
            const statProducts = document.getElementById('profileStatProducts');
            const statAmount = document.getElementById('profileStatAmount');
            const statMember = document.getElementById('profileStatMember');
            const activityList = document.getElementById('profileActivityList');
            const ordersList = document.getElementById('profileOrdersList');
            const recentOrder = pedidos.length ? pedidos[pedidos.length - 1] : null;

            if (avatar) renderProfileAvatarElement(avatar, name);
            if (heroName) heroName.textContent = name;
            if (heroEmail) heroEmail.textContent = email;
            if (heroMember) heroMember.textContent = formatMemberSince(usuarioActual.fecha);
            if (heroPlan) heroPlan.textContent = plan;
            if (heroLevel) heroLevel.textContent = totalProductos >= 5 ? 'Nivel Pro Builder' : 'Nivel Explorer';
            if (nameInput) nameInput.value = name;
            if (emailInput) emailInput.value = email;
            if (phoneInput) phoneInput.value = usuarioActual.telefono || '';
            if (planInput) planInput.value = usuarioActual.tipo === 'guest' ? 'starter' : (usuarioActual.tipo || 'starter');
            if (addressInput) addressInput.value = usuarioActual.direccion || '';
            if (bioInput) bioInput.value = usuarioActual.bio || '';
            if (statProducts) statProducts.textContent = totalProductos;
            if (statAmount) statAmount.textContent = `$${totalImporte.toFixed(2)}`;
            if (statMember) statMember.textContent = plan.replace('Nexus ', '');

            if (activityList) {
                const activityItems = [
                    { title: 'Perfil listo para editar', desc: 'Actualiza tus datos y guarda tu dirección de envío.', tag: 'Perfil' },
                    { title: `${totalProductos} producto(s) en carrito`, desc: 'Tu selección actual se guarda automáticamente.', tag: 'Carrito' },
                    { title: `Plan activo: ${plan}`, desc: 'Puedes cambiarlo desde esta misma pantalla.', tag: 'Plan' }
                ];

                if (recentOrder) {
                    const status = getOrderStatusConfig(recentOrder.estado);
                    activityItems.unshift({
                        title: `Último pedido ${recentOrder.id}`,
                        desc: `${status.label}. Total: $${Number(recentOrder.total).toFixed(2)}.`,
                        tag: status.label
                    });
                }

                activityList.innerHTML = activityItems.map(item => `
                    <li>
                        <div>
                            <strong>${item.title}</strong>
                            <small>${item.desc}</small>
                        </div>
                        <span class="profile-mini-tag">${item.tag}</span>
                    </li>
                `).join('');
            }

            if (ordersList) {
                renderOrdersInProfile();
            }
        }

        function viewProfile() {
            fillProfileData();
            const modal = document.getElementById('profileModal');
            const overlay = document.getElementById('profileOverlay');
            const menu = document.getElementById('userMenu');
            if (menu) menu.remove();
            if (modal) modal.classList.add('open');
            if (overlay) overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        function closeProfile() {
            const modal = document.getElementById('profileModal');
            const overlay = document.getElementById('profileOverlay');
            if (modal) modal.classList.remove('open');
            if (overlay) overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }

        function saveProfile() {
            const name = document.getElementById('profileNameInput')?.value.trim();
            const email = document.getElementById('profileEmailInput')?.value.trim();
            const phone = document.getElementById('profilePhoneInput')?.value.trim();
            const plan = document.getElementById('profilePlanInput')?.value || 'starter';
            const address = document.getElementById('profileAddressInput')?.value.trim();
            const bio = document.getElementById('profileBioInput')?.value.trim();

            if (!name) {
                showNotification('Escribe un nombre para guardar tu perfil', 'error');
                return;
            }

            if (!email || !email.includes('@')) {
                showNotification('Agrega un correo válido para guardar', 'error');
                return;
            }

            usuarioActual = {
                ...usuarioActual,
                nombre: name,
                email,
                telefono: phone,
                tipo: plan,
                direccion: address,
                bio,
                fecha: usuarioActual.fecha || new Date().toISOString()
            };

            localStorage.setItem('nexusUser', JSON.stringify(usuarioActual));
            syncCurrentUserRecord();
            trackBehavior('profileSnapshots', {
                tipo: usuarioActual.tipo,
                bio: usuarioActual.bio,
                direccion: usuarioActual.direccion
            });
            fillProfileData();
            renderRecommendedProducts();
            updateAIRecommendations();
            showNotification('Perfil actualizado correctamente', 'success');
        }

        function viewOrders() {
            viewProfile();
            setTimeout(() => {
                const ordersSection = document.getElementById('profileOrdersList');
                if (ordersSection) {
                    ordersSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    ordersSection.style.boxShadow = '0 0 0 3px rgba(0,179,119,0.12)';
                    setTimeout(() => { ordersSection.style.boxShadow = ''; }, 1600);
                }
            }, 220);

            if (pedidos.length) {
                const latestOrder = pedidos[pedidos.length - 1];
                const status = getOrderStatusConfig(latestOrder.estado);
                showNotification(`Último pedido ${latestOrder.id}: ${status.label}`, 'info');
            } else {
                showNotification('Todavía no tienes pedidos registrados.', 'info');
            }
        }


        function getRegisteredUsers(){try{return JSON.parse(localStorage.getItem('nexusUsers'))||[]}catch(error){return[]}}
        function saveRegisteredUsers(users){localStorage.setItem('nexusUsers',JSON.stringify(users))}
        function encodeDemoPassword(password){return btoa(unescape(encodeURIComponent(password||'')))}
        function normalizeEmail(email){return(email||'').trim().toLowerCase()}
        function syncCurrentUserRecord(){if(!usuarioActual||usuarioActual.tipo==='guest'||!usuarioActual.email)return;const users=getRegisteredUsers();const email=normalizeEmail(usuarioActual.email);const index=users.findIndex(user=>normalizeEmail(user.email)===email||user.uuid===usuarioActual.uuid);const existing=index>=0?users[index]:{};const updated={...existing,...usuarioActual,email,updatedAt:new Date().toISOString()};if(index>=0)users[index]=updated;else users.push(updated);saveRegisteredUsers(users)}
        function closeAuthModal(){const modal=document.getElementById('authModal');if(modal)modal.remove()}
        function switchAuthTab(tab){document.querySelectorAll('.auth-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.tab===tab));document.querySelectorAll('.auth-form').forEach(form=>form.classList.toggle('active',form.dataset.form===tab))}
        function openAuthModal(mode='register',plan='starter'){closeAuthModal();const users=getRegisteredUsers();const modal=document.createElement('div');modal.id='authModal';modal.className='auth-overlay';modal.innerHTML=`
                <div class="auth-card" onclick="event.stopPropagation()">
                    <div class="auth-brand"><div><div class="logo" style="margin-bottom:20px;"><i class="fas fa-link logo-icon"></i><div><div class="logo-text">NEXUS GEAR</div><div class="logo-subtitle">CUENTA PERSONAL</div></div></div><h2>Tu perfil guarda todo</h2><p>Regístrate para conservar tus datos, membresía, carrito, pedidos y preferencias dentro de esta demo.</p></div><ul class="auth-benefits"><li><i class="fas fa-id-card"></i> Perfil editable con UUID de usuario</li><li><i class="fas fa-box"></i> Pedidos e historial persistente</li><li><i class="fas fa-percent"></i> Descuentos por membresía</li><li><i class="fas fa-robot"></i> Recomendaciones más personalizadas</li></ul><p style="font-size:.82rem;">Cuentas guardadas en este navegador: <strong>${users.length}</strong></p></div>
                    <div class="auth-content"><button class="auth-close" onclick="closeAuthModal()"><i class="fas fa-times"></i></button><div class="auth-tabs"><button class="auth-tab ${mode==='register'?'active':''}" data-tab="register" onclick="switchAuthTab('register')">Registrarse</button><button class="auth-tab ${mode==='login'?'active':''}" data-tab="login" onclick="switchAuthTab('login')">Iniciar sesión</button></div>
                        <form class="auth-form ${mode==='register'?'active':''}" data-form="register" onsubmit="submitRegister(event)"><div class="auth-form-grid"><div class="auth-field"><label>Nombre completo</label><input id="authRegisterName" type="text" placeholder="Ej. Gamer Pro" required></div><div class="auth-field"><label>Correo electrónico</label><input id="authRegisterEmail" type="email" placeholder="correo@ejemplo.com" required></div><div class="auth-field"><label>Contraseña</label><input id="authRegisterPassword" type="password" minlength="6" placeholder="Mínimo 6 caracteres" required></div><div class="auth-field"><label>Teléfono</label><input id="authRegisterPhone" type="tel" placeholder="Opcional"></div><div class="auth-field"><label>Membresía</label><select id="authRegisterPlan"><option value="starter">Nexus Starter</option><option value="pro">Nexus Pro</option><option value="elite">Nexus Elite</option></select></div><div class="auth-field"><label>Interés principal</label><select id="authRegisterInterest"><option value="gaming">Gaming</option><option value="streaming">Streaming</option><option value="audio">Audio</option><option value="visual">Visual / Monitores</option><option value="conexion">Conectividad</option></select></div><div class="auth-field full"><label>Dirección de envío</label><textarea id="authRegisterAddress" rows="2" placeholder="Calle, número, colonia, ciudad"></textarea></div></div><button class="btn btn-primary btn-full" type="submit" style="margin-top:18px;">Crear cuenta</button><div class="auth-note">Esta demo guarda usuarios en <strong>localStorage</strong>. Cuando montes backend, estos datos se moverán a tu base de datos.</div></form>
                        <form class="auth-form ${mode==='login'?'active':''}" data-form="login" onsubmit="submitLogin(event)"><div class="auth-form-grid"><div class="auth-field full"><label>Correo electrónico</label><input id="authLoginEmail" type="email" placeholder="correo@ejemplo.com" required></div><div class="auth-field full"><label>Contraseña</label><input id="authLoginPassword" type="password" placeholder="Tu contraseña" required></div></div><button class="btn btn-primary btn-full" type="submit" style="margin-top:18px;">Entrar a mi cuenta</button><button class="btn btn-secondary btn-full" type="button" onclick="loadDemoAccount()" style="margin-top:10px;">Usar cuenta demo</button><div class="auth-note">Al iniciar sesión se restauran tus datos guardados: nombre, correo, plan, teléfono, dirección, UUID y preferencias.</div></form>
                    </div>
                </div>`;modal.addEventListener('click',closeAuthModal);document.body.appendChild(modal);const planInput=document.getElementById('authRegisterPlan');if(planInput)planInput.value=plan||'starter';setTimeout(()=>{const input=mode==='login'?document.getElementById('authLoginEmail'):document.getElementById('authRegisterName');if(input)input.focus()},60)}
        function submitRegister(event){event.preventDefault();const nombre=document.getElementById('authRegisterName').value.trim();const email=normalizeEmail(document.getElementById('authRegisterEmail').value);const password=document.getElementById('authRegisterPassword').value;const telefono=document.getElementById('authRegisterPhone').value.trim();const tipo=document.getElementById('authRegisterPlan').value;const interes=document.getElementById('authRegisterInterest').value;const direccion=document.getElementById('authRegisterAddress').value.trim();if(!nombre||!email||!email.includes('@')){showNotification('Completa nombre y correo válido.','error');return}if(!password||password.length<6){showNotification('La contraseña debe tener mínimo 6 caracteres.','error');return}const users=getRegisteredUsers();if(users.some(user=>normalizeEmail(user.email)===email)){showNotification('Ese correo ya está registrado. Inicia sesión.','error');switchAuthTab('login');const loginEmail=document.getElementById('authLoginEmail');if(loginEmail)loginEmail.value=email;return}usuarioActual={tipo,nombre,email,telefono,direccion,bio:`Usuario interesado en ${interes} dentro de Nexus Gear.`,fecha:new Date().toISOString(),uuid:generateUUID(),passwordDemo:encodeDemoPassword(password),interesPrincipal:interes};users.push({...usuarioActual,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});saveRegisteredUsers(users);localStorage.setItem('nexusUser',JSON.stringify(usuarioActual));trackBehavior('profileSnapshots',{tipo,bio:usuarioActual.bio,direccion,interes});fillProfileData();renderRecommendedProducts();updateAIRecommendations();closeAuthModal();const menu=document.getElementById('userMenu');if(menu)menu.remove();showNotification(`Cuenta creada. Bienvenido ${nombre}.`,'success');viewProfile()}
        function submitLogin(event){event.preventDefault();const email=normalizeEmail(document.getElementById('authLoginEmail').value);const password=document.getElementById('authLoginPassword').value;const users=getRegisteredUsers();const user=users.find(item=>normalizeEmail(item.email)===email);if(!user||user.passwordDemo!==encodeDemoPassword(password)){showNotification('Correo o contraseña incorrectos.','error');return}usuarioActual={...user,email};localStorage.setItem('nexusUser',JSON.stringify(usuarioActual));fillProfileData();renderRecommendedProducts();updateAIRecommendations();closeAuthModal();const menu=document.getElementById('userMenu');if(menu)menu.remove();showNotification(`Sesión iniciada. Hola, ${usuarioActual.nombre}.`,'success');viewProfile()}
        function loadDemoAccount(){const users=getRegisteredUsers();let demo=users.find(user=>normalizeEmail(user.email)==='demo@nexusgear.com');if(!demo){demo={tipo:'pro',nombre:'Gamer Pro',email:'demo@nexusgear.com',telefono:'555-000-2026',direccion:'Av. Nexus 404, Ciudad Demo',bio:'Cuenta demo para probar perfil, carrito, descuentos y pedidos.',fecha:new Date().toISOString(),uuid:generateUUID(),passwordDemo:encodeDemoPassword('demo123'),interesPrincipal:'gaming',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};users.push(demo);saveRegisteredUsers(users)}usuarioActual={...demo};localStorage.setItem('nexusUser',JSON.stringify(usuarioActual));fillProfileData();renderRecommendedProducts();updateAIRecommendations();closeAuthModal();showNotification('Cuenta demo cargada. Contraseña demo: demo123','success');viewProfile()}

        function toggleUserMenu() {
            const existingMenu = document.getElementById('userMenu');
            if (existingMenu) {
                existingMenu.remove();
                return;
            }
            showNotification(`Bienvenido ${usuarioActual.nombre || 'usuario'}!`, 'info');
            const menu = document.createElement('div');
            menu.innerHTML = `
                <div style="position: fixed; top: 80px; right: 20px; background: white; 
                            border-radius: 10px; padding: 20px; border: 1px solid var(--border-light);
                            box-shadow: var(--shadow-md); z-index: 1000; min-width: 200px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div class="menu-avatar">${getUserAvatarMarkup(usuarioActual)}</div>
                        <div style="font-size: 1.2rem; color: var(--primary); margin-bottom: 5px;">${usuarioActual.nombre || 'Invitado'}</div>
                        <div style="font-size: 0.8rem; color: var(--gray);">${usuarioActual.tipo === 'guest' ? 'Usuario no registrado' : 'Nexus ' + usuarioActual.tipo}</div>
                        <div style="font-size: 0.72rem; color: var(--gray); margin-top: 6px; word-break: break-all;">UUID usuario demo: ${usuarioActual.uuid || 'pendiente'}</div>
                    </div>
                    <div style="border-top: 1px solid var(--border-light); padding-top: 15px;">
                        ${usuarioActual.tipo === 'guest' ? 
                            `<button class="btn btn-primary btn-full" onclick="registerUser('starter')" style="margin-bottom: 10px;">Registrarse</button>
                             <button class="btn btn-secondary btn-full" onclick="loginUser()">Iniciar sesión</button>
                             <button class="btn btn-secondary btn-full" onclick="loadDemoAccount()" style="margin-top: 10px;">Cuenta demo</button>` :
                            `<button class="btn btn-secondary btn-full" onclick="viewProfile()" style="margin-bottom: 10px;">Mi perfil</button>
                             <button class="btn btn-secondary btn-full" onclick="viewOrders()" style="margin-bottom: 10px;">Mis pedidos</button>
                             <button class="btn btn-secondary btn-full" onclick="logoutUser()">Cerrar sesión</button>`
                        }
                    </div>
                </div>
            `;
            menu.id = 'userMenu';
            document.body.appendChild(menu);
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(e) {
                    if (!e.target.closest('#userMenu') && !e.target.closest('.user-icon')) {
                        document.body.removeChild(menu);
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 100);
        }

        function registerUser(tipo = 'starter') {
            openAuthModal('register', tipo);
            const menu = document.getElementById('userMenu');
            if (menu) menu.remove();
        }

        function loginUser() {
            openAuthModal('login');
            const menu = document.getElementById('userMenu');
            if (menu) menu.remove();
        }

        function logoutUser() {
            syncCurrentUserRecord();
            usuarioActual = { tipo: 'guest', nombre: 'Invitado', email: '', telefono: '', direccion: '', bio: '', fecha: new Date().toISOString(), uuid: generateUUID() };
            localStorage.setItem('nexusUser', JSON.stringify(usuarioActual));
            closeProfile();
            renderRecommendedProducts();
            updateAIRecommendations();
            showNotification('Sesión cerrada correctamente', 'info');
            const menu = document.getElementById('userMenu');
            if (menu) menu.remove();
        }
        function exploreProducts() { document.getElementById('products').scrollIntoView({ behavior: 'smooth' }); showNotification('Explorando productos destacados...', 'info'); }
        function viewAllProducts() {
            categoriaActual = 'todas';
            terminoBusqueda = '';
            loadFeaturedProducts();
            showNotification('Mostrando todos los productos destacados', 'info');
        }
        function filterCategory(categoria) {
            categoriaActual = categoriaActual === categoria ? 'todas' : categoria;
            if (categoriaActual !== 'todas') trackBehavior('categoryClicks', categoriaActual);
            applyFilters(true);
            renderRecommendedProducts();
            updateAIRecommendations();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        function getProductDetails(producto) {
            const detalles = {
                1: {
                    descripcion: 'Auriculares premium diseñados para gaming, música y trabajo híbrido. Ofrecen sonido envolvente nítido, conexión estable y gran comodidad para sesiones largas.',
                    chips: ['Audio inmersivo', 'Bluetooth 5.3', 'Batería 40 h'],
                    specs: {
                        'Conectividad': 'Bluetooth 5.3 / USB-C',
                        'Autonomía': 'Hasta 40 horas',
                        'Micrófono': 'Dual con cancelación de ruido',
                        'Peso': '265 g',
                        'Compatibilidad': 'PC, consola y móvil'
                    },
                    features: [
                        'Drivers de alta precisión para graves profundos y voces claras.',
                        'Modo baja latencia para juegos competitivos.',
                        'Almohadillas de espuma viscoelástica para mayor confort.'
                    ]
                },
                2: {
                    descripcion: 'Teclado mecánico compacto orientado a productividad y gaming. Su respuesta rápida y su construcción robusta lo vuelven ideal para setups modernos.',
                    chips: ['Switches táctiles', 'RGB dinámico', 'Anti-ghosting'],
                    specs: {
                        'Formato': 'TKL compacto',
                        'Switches': 'Mecánicos táctiles Nexus Red',
                        'Iluminación': 'RGB por tecla',
                        'Conexión': 'USB-C desmontable',
                        'Material': 'Aluminio y ABS reforzado'
                    },
                    features: [
                        'Tiempo de respuesta optimizado para escritura y juego.',
                        'Estructura resistente con acabado premium.',
                        'Perfiles de iluminación personalizables.'
                    ]
                },
                3: {
                    descripcion: 'Monitor de alto rendimiento pensado para creadores y gamers. Combina fluidez, color vibrante y gran definición para un setup visual de primer nivel.',
                    chips: ['QHD+', '165 Hz', 'HDR Ready'],
                    specs: {
                        'Tamaño': '27 pulgadas',
                        'Resolución': '2560 x 1440',
                        'Frecuencia': '165 Hz',
                        'Tiempo de respuesta': '1 ms MPRT',
                        'Puertos': 'HDMI, DisplayPort, USB'
                    },
                    features: [
                        'Excelente fidelidad de color para edición y streaming.',
                        'Alta tasa de refresco para una experiencia suave.',
                        'Diseño de marco delgado ideal para setups duales.'
                    ]
                },
                4: {
                    descripcion: 'Mouse ergonómico y preciso para largas jornadas de trabajo o sesiones gaming. Ligero, cómodo y con sensor optimizado para movimientos rápidos.',
                    chips: ['Sensor 26K DPI', 'Ultraligero', 'Carga rápida'],
                    specs: {
                        'Sensor': 'Óptico 26,000 DPI',
                        'Botones': '6 programables',
                        'Peso': '59 g',
                        'Conexión': '2.4 GHz / USB-C',
                        'Autonomía': 'Hasta 70 horas'
                    },
                    features: [
                        'Deslizamiento suave con gran precisión.',
                        'Diseño curvo que reduce la fatiga.',
                        'Ideal para shooters, MOBA y productividad.'
                    ]
                },
                5: {
                    descripcion: 'Cámara pensada para streaming, videollamadas y creación de contenido. Ofrece imagen clara, enfoque rápido y excelente desempeño en interiores.',
                    chips: ['Full HD', 'Autoenfoque', 'Streaming ready'],
                    specs: {
                        'Resolución': '1080p a 60 fps',
                        'Enfoque': 'Automático inteligente',
                        'Micrófonos': 'Estéreo integrados',
                        'Montaje': 'Clip universal',
                        'Compatibilidad': 'Windows, macOS, OBS'
                    },
                    features: [
                        'Imagen nítida incluso con iluminación media.',
                        'Fácil instalación y configuración rápida.',
                        'Perfecta para videollamadas, clases y streams.'
                    ]
                },
                6: {
                    descripcion: 'Dock de conexión múltiple para expandir puertos y centralizar tu escritorio. Ideal para laptops, tablets y setups minimalistas.',
                    chips: ['7 en 1', 'USB-C', 'Carga pass-through'],
                    specs: {
                        'Entradas': 'USB-C principal',
                        'Puertos': 'HDMI, USB 3.0, SD, microSD, PD',
                        'Salida de video': '4K a 60 Hz',
                        'Carga': 'Hasta 100 W pass-through',
                        'Uso recomendado': 'Oficina, estudio y home setup'
                    },
                    features: [
                        'Convierte un solo puerto en una estación completa.',
                        'Construcción compacta y fácil de transportar.',
                        'Excelente opción para laptops con pocos puertos.'
                    ]
                }
            };

            const detalleBase = detalles[producto.id] || {
                descripcion: 'Producto Nexus diseñado para integrarse a un setup moderno con estilo, rendimiento y conectividad avanzada.',
                chips: ['Edición Nexus', 'Rendimiento premium', 'Setup ready'],
                specs: {
                    'Categoría': producto.categoria,
                    'Modelo': producto.nombre,
                    'Compatibilidad': 'Universal',
                    'Garantía': '12 meses',
                    'Disponibilidad': 'En stock'
                },
                features: [
                    'Diseño moderno enfocado en rendimiento.',
                    'Construcción pensada para uso diario.',
                    'Integración sencilla con otros dispositivos.'
                ]
            };

            return {
                ...detalleBase,
                specs: {
                    ...detalleBase.specs,
                    'UUID Producto': producto.uuid
                }
            };
        }

        function viewProduct(id) {
            const producto = productos.find(p => p.id === id);
            if (!producto) return;
            trackBehavior('viewedProducts', id);
            renderRecommendedProducts();
            updateAIRecommendations();

            const detalle = getProductDetails(producto);
            const precioFinal = producto.descuento
                ? (producto.precio * (1 - producto.descuento / 100)).toFixed(2)
                : producto.precio.toFixed(2);

            document.getElementById('productModalImage').src = producto.imagen;
            document.getElementById('productModalImage').alt = producto.nombre;
            document.getElementById('productModalCategory').textContent = producto.categoria;
            document.getElementById('productModalTitle').textContent = producto.nombre;
            document.getElementById('productModalDescription').textContent = detalle.descripcion;
            document.getElementById('productModalPrice').innerHTML = producto.descuento
                ? `<span style="text-decoration: line-through; color: var(--gray); font-size: 1rem; margin-right: 10px; font-weight: 500;">$${producto.precio.toFixed(2)}</span>$${precioFinal}`
                : `$${precioFinal}`;

            document.getElementById('productModalChips').innerHTML = detalle.chips
                .map(chip => `<span class="product-chip">${chip}</span>`)
                .join('');

            document.getElementById('productModalSpecs').innerHTML = Object.entries(detalle.specs)
                .map(([label, value]) => `
                    <div class="product-spec-item">
                        <span class="product-spec-label">${label}</span>
                        <span class="product-spec-value">${value}</span>
                    </div>
                `)
                .join('');

            document.getElementById('productModalFeatures').innerHTML = detalle.features
                .map(item => `<li><i class="fas fa-check-circle"></i><span>${item}</span></li>`)
                .join('');

            document.getElementById('productModalAddBtn').onclick = () => {
                addToCart(producto.id);
                closeProductModal();
            };

            document.getElementById('productModalOverlay').classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        function closeProductModal(event) {
            if (event && event.target && event.target.id !== 'productModalOverlay') return;
            document.getElementById('productModalOverlay').classList.remove('visible');
            document.body.style.overflow = '';
        }

        function toggleSearch() {
            const existingSearch = document.getElementById('searchBar');
            if (existingSearch) {
                existingSearch.remove();
                return;
            }
            const searchBar = document.createElement('div');
            searchBar.innerHTML = `
                <div style="position: fixed; top: 80px; left: 50%; transform: translateX(-50%); 
                            background: white; padding: 15px; border-radius: 12px;
                            border: 1px solid var(--border-light); box-shadow: var(--shadow-md);
                            z-index: 1000; width: 90%; max-width: 640px; display: flex; gap: 10px; align-items: center;">
                    <input type="text" placeholder="Buscar por nombre, categoría o especificación..." value="${terminoBusqueda}" style="flex: 1; padding: 12px 15px;
                            border-radius: 8px; border: 1px solid rgba(0,179,119,0.3); background: white;
                            color: var(--light); font-family: 'Exo 2', sans-serif; outline: none;">
                    <button class="btn btn-primary btn-small" onclick="performSearch()">
                        <i class="fas fa-search"></i> Buscar
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="clearFilters()">
                        <i class="fas fa-filter-circle-xmark"></i>
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="document.getElementById('searchBar').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            searchBar.id = 'searchBar';
            document.body.appendChild(searchBar);
            const input = searchBar.querySelector('input');
            input.addEventListener('input', function() {
                terminoBusqueda = this.value.trim();
                applyFilters(false);
            });
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') performSearch();
            });
            setTimeout(() => { input.focus(); }, 100);
        }
        function performSearch() {
            const input = document.querySelector('#searchBar input');
            terminoBusqueda = input ? input.value.trim() : terminoBusqueda;
            const intent = resolveSearchIntent(terminoBusqueda);

            if (terminoBusqueda) trackBehavior('searches', terminoBusqueda);

            if (intent.type === 'empty') {
                showNotification('Escribe una palabra para buscar productos o secciones.', 'info');
                return;
            }

            if (intent.type === 'action' && intent.action === 'cart') {
                openCart();
                showNotification('Abriendo carrito', 'info');
                return;
            }

            if (intent.type === 'action' && intent.action === 'profile') {
                openProfile();
                showNotification('Abriendo perfil', 'info');
                return;
            }

            if (intent.type === 'product') {
                categoriaActual = 'todas';
                terminoBusqueda = intent.product.nombre;
                applyFilters(false);
                scrollToSection('products');
                setTimeout(() => viewProduct(intent.product.id), 450);
                showNotification(`Abriendo ${intent.product.nombre}`, 'success');
                return;
            }

            if (intent.type === 'category') {
                categoriaActual = intent.category;
                terminoBusqueda = '';
                trackBehavior('categoryClicks', categoriaActual);
                applyFilters(false);
                renderRecommendedProducts();
                updateAIRecommendations();
                scrollToSection('products');
                const results = getFilteredProducts().length;
                showNotification(`${results} producto(s) encontrados en ${intent.label}`, 'success');
                return;
            }

            if (intent.type === 'section') {
                categoriaActual = 'todas';
                terminoBusqueda = '';
                applyFilters(false);
                scrollToSection(intent.section.id);
                showNotification(`Te llevé a ${intent.section.label}`, 'success');
                return;
            }

            applyFilters(true);
            renderRecommendedProducts();
            updateAIRecommendations();
            scrollToSection('products');
        }
        function showNotification(mensaje, tipo = 'info') {
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; background: ${tipo === 'success' ? 'var(--success)' : tipo === 'error' ? 'var(--error)' : 'var(--secondary)'}; 
                            color: white; padding: 15px 25px; border-radius: 10px;
                            box-shadow: var(--shadow-md); z-index: 2000; transform: translateX(150%);
                            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                        <div>${mensaje}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => { notification.querySelector('div').style.transform = 'translateX(0)'; }, 10);
            setTimeout(() => {
                notification.querySelector('div').style.transform = 'translateX(150%)';
                setTimeout(() => { document.body.removeChild(notification); }, 500);
            }, 3000);
        }
        function showWelcomeMessage() {
            if (!sessionStorage.getItem('welcomeShown')) {
                setTimeout(() => {
                    showNotification('¡Bienvenido a Nexus Gear! Conecta tu equipo al futuro.', 'success');
                    sessionStorage.setItem('welcomeShown', 'true');
                }, 1000);
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modal = document.getElementById('productModalOverlay');
                if (modal && modal.classList.contains('visible')) {
                    closeProductModal();
                }
                const profileModal = document.getElementById('profileModal');
                if (profileModal && profileModal.classList.contains('open')) {
                    closeProfile();
                }
                if (voiceRecognition) {
                    try { voiceRecognition.stop(); } catch (error) {}
                    voiceRecognition = null;
                    hideVoiceOverlay();
                }
            }
        });

        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = 'var(--shadow-sm)';
            }
        });
    </script>
<script>
// ===== VALIDACIONES REALES DE REGISTRO / LOGIN =====
function sanitizeText(value){return(value||'').trim().replace(/[<>]/g,'')}
function isValidEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)}
function isValidPhone(phone){return /^\d{10}$/.test(phone)}
function validateStrongPassword(password){return {
    ok: password.length>=8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
    min: password.length>=8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
}}
function passwordErrorMessage(password){
    const checks=validateStrongPassword(password);
    const missing=[];
    if(!checks.min)missing.push('mínimo 8 caracteres');
    if(!checks.lower)missing.push('una letra minúscula');
    if(!checks.upper)missing.push('una letra mayúscula');
    if(!checks.number)missing.push('un número');
    if(!checks.special)missing.push('un carácter especial');
    return 'La contraseña debe incluir: '+missing.join(', ')+'.';
}

openAuthModal = function(mode='register',plan='starter'){
    closeAuthModal();
    const users=getRegisteredUsers();
    const modal=document.createElement('div');
    modal.id='authModal';
    modal.className='auth-overlay';
    modal.innerHTML=`
        <div class="auth-card" onclick="event.stopPropagation()">
            <div class="auth-brand">
                <div>
                    <div class="logo" style="margin-bottom:20px;">
                        <i class="fas fa-link logo-icon"></i>
                        <div><div class="logo-text">NEXUS GEAR</div><div class="logo-subtitle">CUENTA PERSONAL</div></div>
                    </div>
                    <h2>Tu perfil guarda todo</h2>
                    <p>Regístrate para conservar tus datos, membresía, carrito, pedidos y preferencias dentro de esta demo.</p>
                </div>
                <ul class="auth-benefits">
                    <li><i class="fas fa-id-card"></i> Perfil editable con UUID de usuario</li>
                    <li><i class="fas fa-shield-alt"></i> Validación de correo, teléfono y contraseña</li>
                    <li><i class="fas fa-percent"></i> Descuentos por membresía</li>
                    <li><i class="fas fa-robot"></i> Recomendaciones más personalizadas</li>
                </ul>
                <p style="font-size:.82rem;">Cuentas guardadas en este navegador: <strong>${users.length}</strong></p>
            </div>
            <div class="auth-content">
                <button class="auth-close" onclick="closeAuthModal()"><i class="fas fa-times"></i></button>
                <div class="auth-tabs">
                    <button class="auth-tab ${mode==='register'?'active':''}" data-tab="register" onclick="switchAuthTab('register')">Registrarse</button>
                    <button class="auth-tab ${mode==='login'?'active':''}" data-tab="login" onclick="switchAuthTab('login')">Iniciar sesión</button>
                </div>
                <form class="auth-form ${mode==='register'?'active':''}" data-form="register" onsubmit="submitRegister(event)">
                    <div class="auth-form-grid">
                        <div class="auth-field"><label>Nombre completo</label><input id="authRegisterName" type="text" placeholder="Ej. Gamer Pro" required></div>
                        <div class="auth-field"><label>Correo electrónico</label><input id="authRegisterEmail" type="email" placeholder="correo@ejemplo.com" required></div>
                        <div class="auth-field"><label>Contraseña</label><input id="authRegisterPassword" type="password" minlength="8" placeholder="Ej. Nexus2026!" required><small style="color:var(--gray);font-size:.75rem;line-height:1.35;display:block;margin-top:6px;">Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.</small></div>
                        <div class="auth-field"><label>Confirmar contraseña</label><input id="authRegisterPasswordConfirm" type="password" minlength="8" placeholder="Repite tu contraseña" required></div>
                        <div class="auth-field"><label>Teléfono</label><input id="authRegisterPhone" type="tel" maxlength="10" inputmode="numeric" placeholder="10 dígitos" required oninput="this.value=this.value.replace(/\D/g,'').slice(0,10)"></div>
                        <div class="auth-field"><label>Membresía</label><select id="authRegisterPlan"><option value="starter">Nexus Starter</option><option value="pro">Nexus Pro</option><option value="elite">Nexus Elite</option></select></div>
                        <div class="auth-field"><label>Interés principal</label><select id="authRegisterInterest"><option value="gaming">Gaming</option><option value="streaming">Streaming</option><option value="audio">Audio</option><option value="visual">Visual / Monitores</option><option value="conexion">Conectividad</option></select></div>
                        <div class="auth-field full"><label>Dirección de envío</label><textarea id="authRegisterAddress" rows="2" placeholder="Calle, número, colonia, ciudad" required></textarea></div>
                    </div>
                    <button class="btn btn-primary btn-full" type="submit" style="margin-top:18px;">Crear cuenta</button>
                    <div class="auth-note">Esta demo valida teléfono, correo y contraseña antes de guardar la cuenta en <strong>localStorage</strong>.</div>
                </form>
                <form class="auth-form ${mode==='login'?'active':''}" data-form="login" onsubmit="submitLogin(event)">
                    <div class="auth-form-grid">
                        <div class="auth-field full"><label>Correo electrónico</label><input id="authLoginEmail" type="email" placeholder="correo@ejemplo.com" required></div>
                        <div class="auth-field full"><label>Contraseña</label><input id="authLoginPassword" type="password" placeholder="Tu contraseña" required></div>
                    </div>
                    <button class="btn btn-primary btn-full" type="submit" style="margin-top:18px;">Entrar a mi cuenta</button>
                    <button class="btn btn-secondary btn-full" type="button" onclick="loadDemoAccount()" style="margin-top:10px;">Usar cuenta demo</button>
                    <div class="auth-note">Al iniciar sesión se restauran tus datos guardados: nombre, correo, plan, teléfono, dirección, UUID y preferencias.</div>
                </form>
            </div>
        </div>`;
    modal.addEventListener('click',closeAuthModal);
    document.body.appendChild(modal);
    const planInput=document.getElementById('authRegisterPlan');
    if(planInput)planInput.value=plan||'starter';
    setTimeout(()=>{const input=mode==='login'?document.getElementById('authLoginEmail'):document.getElementById('authRegisterName');if(input)input.focus()},60);
}

submitRegister = function(event){
    event.preventDefault();
    const nombre=sanitizeText(document.getElementById('authRegisterName').value);
    const email=normalizeEmail(document.getElementById('authRegisterEmail').value);
    const password=document.getElementById('authRegisterPassword').value;
    const passwordConfirm=document.getElementById('authRegisterPasswordConfirm').value;
    const telefono=document.getElementById('authRegisterPhone').value.replace(/\D/g,'');
    const tipo=document.getElementById('authRegisterPlan').value;
    const interes=document.getElementById('authRegisterInterest').value;
    const direccion=sanitizeText(document.getElementById('authRegisterAddress').value);
    if(nombre.length<3){showNotification('Escribe un nombre válido de al menos 3 caracteres.','error');return}
    if(!isValidEmail(email)){showNotification('Escribe un correo válido. Ejemplo: usuario@dominio.com','error');return}
    if(!isValidPhone(telefono)){showNotification('El teléfono debe tener exactamente 10 dígitos y solo números.','error');return}
    const passwordChecks=validateStrongPassword(password);
    if(!passwordChecks.ok){showNotification(passwordErrorMessage(password),'error');return}
    if(password!==passwordConfirm){showNotification('Las contraseñas no coinciden.','error');return}
    if(direccion.length<8){showNotification('Escribe una dirección de envío más completa.','error');return}
    const users=getRegisteredUsers();
    if(users.some(user=>normalizeEmail(user.email)===email)){
        showNotification('Ese correo ya está registrado. Inicia sesión.','error');
        switchAuthTab('login');
        const loginEmail=document.getElementById('authLoginEmail');
        if(loginEmail)loginEmail.value=email;
        return;
    }
    usuarioActual={tipo,nombre,email,telefono,direccion,bio:`Usuario interesado en ${interes} dentro de Nexus Gear.`,fecha:new Date().toISOString(),uuid:generateUUID(),passwordDemo:encodeDemoPassword(password),interesPrincipal:interes};
    users.push({...usuarioActual,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    saveRegisteredUsers(users);
    localStorage.setItem('nexusUser',JSON.stringify(usuarioActual));
    trackBehavior('profileSnapshots',{tipo,bio:usuarioActual.bio,direccion,interes});
    fillProfileData();
    renderRecommendedProducts();
    updateAIRecommendations();
    closeAuthModal();
    const menu=document.getElementById('userMenu');
    if(menu)menu.remove();
    showNotification(`Cuenta creada. Bienvenido ${nombre}.`,'success');
    viewProfile();
}

loadDemoAccount = function(){
    const users=getRegisteredUsers();
    let demo=users.find(user=>normalizeEmail(user.email)==='demo@nexusgear.com');
    if(!demo){
        demo={tipo:'pro',nombre:'Gamer Pro',email:'demo@nexusgear.com',telefono:'5550002026',direccion:'Av. Nexus 404, Ciudad Demo',bio:'Cuenta demo para probar perfil, carrito, descuentos y pedidos.',fecha:new Date().toISOString(),uuid:generateUUID(),passwordDemo:encodeDemoPassword('Demo2026!'),interesPrincipal:'gaming',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
        users.push(demo);
        saveRegisteredUsers(users);
    }
    usuarioActual={...demo};
    localStorage.setItem('nexusUser',JSON.stringify(usuarioActual));
    fillProfileData();
    renderRecommendedProducts();
    updateAIRecommendations();
    closeAuthModal();
    showNotification('Cuenta demo cargada. Contraseña demo: Demo2026!','success');
    viewProfile();
}
</script>

<script>
// ===== MEJORAS EXTRA: VALIDACIÓN EN PERFIL + OJO PARA CONTRASEÑAS =====
(function(){
    const extraStyle = document.createElement('style');
    extraStyle.textContent = `
        .password-wrapper-nexus{position:relative;width:100%;}
        .password-wrapper-nexus input{width:100%;padding-right:48px!important;}
        .password-toggle-nexus{
            position:absolute;right:12px;top:50%;transform:translateY(-50%);
            width:34px;height:34px;border:none;border-radius:50%;
            background:rgba(0,179,119,.08);color:var(--secondary);
            display:flex;align-items:center;justify-content:center;cursor:pointer;
            transition:all .25s ease;
        }
        .password-toggle-nexus:hover{background:rgba(0,179,119,.18);color:var(--primary);}
        .field-error-nexus{border-color:var(--error)!important;box-shadow:0 0 0 3px rgba(220,53,69,.12)!important;}
        .profile-validation-note{
            margin-top:10px;font-size:.8rem;color:var(--gray);line-height:1.45;
            background:#f8f9fa;border:1px solid var(--border-light);border-radius:12px;padding:10px 12px;
        }
    `;
    document.head.appendChild(extraStyle);

    function markFieldError(input){
        if(!input) return;
        input.classList.add('field-error-nexus');
        setTimeout(()=>input.classList.remove('field-error-nexus'),2500);
        input.focus();
    }

    function enhancePasswordFields(){
        const passwordIds = ['authRegisterPassword','authRegisterPasswordConfirm','authLoginPassword'];
        passwordIds.forEach(id=>{
            const input = document.getElementById(id);
            if(!input || input.closest('.password-wrapper-nexus')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'password-wrapper-nexus';
            input.parentNode.insertBefore(wrapper,input);
            wrapper.appendChild(input);
            const btn = document.createElement('button');
            btn.type='button';
            btn.className='password-toggle-nexus';
            btn.setAttribute('aria-label','Mostrar u ocultar contraseña');
            btn.innerHTML='<i class="fas fa-eye"></i>';
            btn.onclick=function(){
                const isHidden = input.type === 'password';
                input.type = isHidden ? 'text' : 'password';
                btn.innerHTML = isHidden ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
            };
            wrapper.appendChild(btn);
        });
    }

    function enhanceProfileValidation(){
        const phone = document.getElementById('profilePhoneInput');
        if(phone){
            phone.setAttribute('maxlength','10');
            phone.setAttribute('inputmode','numeric');
            phone.placeholder='10 dígitos';
            phone.oninput=function(){this.value=this.value.replace(/\D/g,'').slice(0,10)};
        }

        const email = document.getElementById('profileEmailInput');
        if(email) email.setAttribute('type','email');

        const address = document.getElementById('profileAddressInput');
        if(address) address.setAttribute('minlength','8');

        const panel = document.querySelector('#profileModal .profile-section, #profileModal .profile-card, #profileModal');
        const formArea = document.getElementById('profilePhoneInput')?.closest('.profile-section') || document.getElementById('profilePhoneInput')?.closest('div');
        if(formArea && !document.getElementById('profileValidationNote')){
            const note = document.createElement('div');
            note.id = 'profileValidationNote';
            note.className = 'profile-validation-note';
            note.innerHTML = '<strong>Validación activa:</strong> nombre mínimo 3 caracteres, correo válido, teléfono de 10 dígitos y dirección completa.';
            const bio = document.getElementById('profileBioInput');
            if(bio && bio.parentNode) bio.parentNode.appendChild(note);
            else formArea.appendChild(note);
        }
    }

    const originalOpenAuthModal = window.openAuthModal;
    if(typeof originalOpenAuthModal === 'function'){
        window.openAuthModal = function(mode='register', plan='starter'){
            originalOpenAuthModal(mode, plan);
            setTimeout(enhancePasswordFields, 50);
        };
    }

    const originalSwitchAuthTab = window.switchAuthTab;
    if(typeof originalSwitchAuthTab === 'function'){
        window.switchAuthTab = function(tab){
            originalSwitchAuthTab(tab);
            setTimeout(enhancePasswordFields, 50);
        };
    }

    const originalViewProfile = window.viewProfile;
    if(typeof originalViewProfile === 'function'){
        window.viewProfile = function(...args){
            originalViewProfile.apply(this,args);
            setTimeout(enhanceProfileValidation, 80);
        };
    }

    window.saveProfile = function(){
        const nameInput = document.getElementById('profileNameInput');
        const emailInput = document.getElementById('profileEmailInput');
        const phoneInput = document.getElementById('profilePhoneInput');
        const planInput = document.getElementById('profilePlanInput');
        const addressInput = document.getElementById('profileAddressInput');
        const bioInput = document.getElementById('profileBioInput');

        const name = sanitizeText(nameInput?.value || '');
        const email = normalizeEmail(emailInput?.value || '');
        const phone = (phoneInput?.value || '').replace(/\D/g,'');
        const plan = planInput?.value || 'starter';
        const address = sanitizeText(addressInput?.value || '');
        const bio = sanitizeText(bioInput?.value || '');

        if(name.length < 3){
            showNotification('El nombre debe tener al menos 3 caracteres.','error');
            markFieldError(nameInput);
            return;
        }
        if(!isValidEmail(email)){
            showNotification('Escribe un correo válido. Ejemplo: usuario@dominio.com','error');
            markFieldError(emailInput);
            return;
        }
        if(!isValidPhone(phone)){
            showNotification('El teléfono debe tener exactamente 10 dígitos y solo números.','error');
            markFieldError(phoneInput);
            return;
        }
        if(address.length < 8){
            showNotification('Escribe una dirección de envío más completa.','error');
            markFieldError(addressInput);
            return;
        }

        const previousEmail = normalizeEmail(usuarioActual.email || '');
        const users = getRegisteredUsers ? getRegisteredUsers() : [];
        const duplicatedEmail = users.some(user => normalizeEmail(user.email) === email && normalizeEmail(user.email) !== previousEmail && user.uuid !== usuarioActual.uuid);
        if(duplicatedEmail){
            showNotification('Ese correo ya pertenece a otra cuenta registrada.','error');
            markFieldError(emailInput);
            return;
        }

        usuarioActual = {
            ...usuarioActual,
            nombre: name,
            email,
            telefono: phone,
            tipo: plan,
            direccion: address,
            bio,
            fecha: usuarioActual.fecha || new Date().toISOString(),
            uuid: usuarioActual.uuid || generateUUID()
        };

        localStorage.setItem('nexusUser', JSON.stringify(usuarioActual));

        if(typeof saveRegisteredUsers === 'function'){
            const updatedUsers = users.map(user => {
                if(user.uuid === usuarioActual.uuid || normalizeEmail(user.email) === previousEmail){
                    return {...user, ...usuarioActual, updatedAt:new Date().toISOString()};
                }
                return user;
            });
            if(!updatedUsers.some(user => user.uuid === usuarioActual.uuid)){
                updatedUsers.push({...usuarioActual, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString()});
            }
            saveRegisteredUsers(updatedUsers);
        }

        if(typeof fillProfileData === 'function') fillProfileData();
        if(typeof updateCartCount === 'function') updateCartCount();
        if(typeof renderRecommendedProducts === 'function') renderRecommendedProducts();
        if(typeof updateAIRecommendations === 'function') updateAIRecommendations();
        enhanceProfileValidation();
        showNotification('Perfil actualizado con validaciones correctas.','success');
    };

    document.addEventListener('DOMContentLoaded', function(){
        setTimeout(enhancePasswordFields, 100);
        setTimeout(enhanceProfileValidation, 100);
    });
})();
</script>


<script>
// ===== FOTO DE PERFIL REAL CON LOCALSTORAGE =====
(function(){
    window.getUserAvatarMarkup = function(user){
        const name = (user && user.nombre) ? user.nombre : 'Invitado';
        const photo = user && user.fotoPerfil;
        if(photo){
            return `<img src="${photo}" alt="Foto de perfil">`;
        }
        const initials = (typeof getProfileInitials === 'function') ? getProfileInitials(name) : name.trim().slice(0,2).toUpperCase();
        return initials;
    };

    window.renderProfileAvatarElement = function(avatar, name){
        if(!avatar) return;
        const photo = usuarioActual && usuarioActual.fotoPerfil;
        if(photo){
            avatar.innerHTML = `<img src="${photo}" alt="Foto de perfil de ${name || 'usuario'}">`;
        } else {
            avatar.textContent = (typeof getProfileInitials === 'function') ? getProfileInitials(name || 'Invitado') : 'NG';
        }
    };

    function persistUserPhoto(dataUrl){
        usuarioActual = {
            ...usuarioActual,
            fotoPerfil: dataUrl || '',
            uuid: usuarioActual.uuid || (typeof generateUUID === 'function' ? generateUUID() : String(Date.now()))
        };
        localStorage.setItem('nexusUser', JSON.stringify(usuarioActual));

        if(typeof getRegisteredUsers === 'function' && typeof saveRegisteredUsers === 'function'){
            const currentEmail = typeof normalizeEmail === 'function' ? normalizeEmail(usuarioActual.email || '') : (usuarioActual.email || '').toLowerCase();
            const users = getRegisteredUsers();
            const updated = users.map(user => {
                const userEmail = typeof normalizeEmail === 'function' ? normalizeEmail(user.email || '') : (user.email || '').toLowerCase();
                if((usuarioActual.uuid && user.uuid === usuarioActual.uuid) || (currentEmail && userEmail === currentEmail)){
                    return {...user, fotoPerfil: dataUrl || '', updatedAt: new Date().toISOString()};
                }
                return user;
            });
            saveRegisteredUsers(updated);
        }

        if(typeof fillProfileData === 'function') fillProfileData();
    }

    window.triggerProfilePhotoUpload = function(){
        const input = document.getElementById('profilePhotoInput');
        if(input) input.click();
    };

    window.handleProfilePhotoUpload = function(event){
        const file = event.target.files && event.target.files[0];
        if(!file) return;
        const allowed = ['image/jpeg','image/png','image/webp'];
        if(!allowed.includes(file.type)){
            showNotification('Formato no válido. Usa JPG, PNG o WEBP.','error');
            event.target.value = '';
            return;
        }
        if(file.size > 900 * 1024){
            showNotification('La imagen es muy pesada. Usa una menor a 900 KB.','error');
            event.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(){
            persistUserPhoto(reader.result);
            showNotification('Foto de perfil actualizada correctamente.','success');
        };
        reader.onerror = function(){
            showNotification('No se pudo cargar la imagen. Intenta con otra.','error');
        };
        reader.readAsDataURL(file);
    };

    window.removeProfilePhoto = function(){
        persistUserPhoto('');
        const input = document.getElementById('profilePhotoInput');
        if(input) input.value = '';
        showNotification('Foto de perfil eliminada.','info');
    };

    const originalFillProfileDataPhoto = window.fillProfileData;
    if(typeof originalFillProfileDataPhoto === 'function'){
        window.fillProfileData = function(...args){
            const result = originalFillProfileDataPhoto.apply(this,args);
            const avatar = document.getElementById('profileAvatar');
            const name = usuarioActual.nombre || 'Invitado Nexus';
            renderProfileAvatarElement(avatar, name);
            return result;
        };
    }
})();
</script>

</body>
</html>
<script>
// ===== VALIDACIÓN FINAL DE NOMBRE REAL EN REGISTRO Y PERFIL =====
(function(){
    function normalizeNameForValidation(value){
        return (value || '').trim().replace(/\s+/g,' ');
    }
    window.isValidFullNameNexus = function(value){
        const name = normalizeNameForValidation(value);
        const lettersOnly = name.replace(/\s/g,'');
        const allowedPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/;
        return {
            ok: name.length >= 3 && name.length <= 60 && allowedPattern.test(name) && /[A-Za-zÁÉÍÓÚáéíóúÑñÜü]/.test(name) && lettersOnly.length >= 3,
            value: name
        };
    };
    function nameErrorMessage(){
        return 'Escribe un nombre válido: solo letras, espacios y acentos. No se permiten números ni símbolos.';
    }
    function markFieldErrorNexus(input){
        if(!input) return;
        input.classList.add('field-error-nexus');
        setTimeout(()=>input.classList.remove('field-error-nexus'),2500);
        input.focus();
    }
    const previousSubmitRegister = window.submitRegister;
    window.submitRegister = function(event){
        if(event) event.preventDefault();
        const nameInput = document.getElementById('authRegisterName');
        const nameCheck = window.isValidFullNameNexus(nameInput?.value || '');
        if(!nameCheck.ok){
            showNotification(nameErrorMessage(),'error');
            markFieldErrorNexus(nameInput);
            return;
        }
        if(nameInput) nameInput.value = nameCheck.value;
        return previousSubmitRegister.call(this,event);
    };
    const previousSaveProfile = window.saveProfile;
    window.saveProfile = function(){
        const nameInput = document.getElementById('profileNameInput');
        const nameCheck = window.isValidFullNameNexus(nameInput?.value || '');
        if(!nameCheck.ok){
            showNotification(nameErrorMessage(),'error');
            markFieldErrorNexus(nameInput);
            return;
        }
        if(nameInput) nameInput.value = nameCheck.value;
        return previousSaveProfile.call(this);
    };
    document.addEventListener('input', function(e){
        if(e.target && (e.target.id === 'authRegisterName' || e.target.id === 'profileNameInput')){
            e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g,'').replace(/\s{2,}/g,' ');
        }
    });
})();