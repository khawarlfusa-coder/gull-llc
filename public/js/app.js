// GUL LLC - Main Application Script

const CartHandler = {
  cart: [],

  init() {
    const saved = localStorage.getItem('GUL_CART');
    if (saved) {
      try {
        this.cart = JSON.parse(saved);
      } catch (e) {
        this.cart = [];
      }
    }
    this.updateUI();
  },

  save() {
    localStorage.setItem('GUL_CART', JSON.stringify(this.cart));
    this.updateUI();
  },

  getCart() {
    return this.cart;
  },

  addItem(product, variant = '', quantity = 1) {
    const existing = this.cart.find(item => item.id === product.id && item.variant === variant);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        variant: variant || (product.variants?.[0]?.options?.[0] || ''),
        quantity: quantity
      });
    }
    this.save();
    App.showToast(`Added "${product.title.slice(0, 30)}..." to cart!`, 'success');
    this.openDrawer();
  },

  updateQuantity(id, variant, delta) {
    const item = this.cart.find(it => it.id === id && it.variant === variant);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter(it => !(it.id === id && it.variant === variant));
      }
      this.save();
    }
  },

  removeItem(id, variant) {
    this.cart = this.cart.filter(it => !(it.id === id && it.variant === variant));
    this.save();
    App.showToast('Item removed from cart.', 'info');
  },

  clearCart() {
    this.cart = [];
    this.save();
  },

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getTotalCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  updateUI() {
    const count = this.getTotalCount();
    const subtotal = this.getSubtotal();

    // Badges in header
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    });

    // Subtotal displays
    document.querySelectorAll('.cart-subtotal-val').forEach(el => {
      el.textContent = `$${subtotal.toFixed(2)}`;
    });

    // Drawer items container
    const drawerContainer = document.getElementById('cartDrawerItems');
    if (drawerContainer) {
      if (this.cart.length === 0) {
        drawerContainer.innerHTML = `
          <div class="text-center py-16 px-4">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 text-2xl">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <p class="text-slate-500 font-medium text-sm">Your shopping cart is empty.</p>
            <p class="text-slate-400 text-xs mt-1">Discover curated furniture and home decor today.</p>
            <button onclick="CartHandler.closeDrawer(); App.navigateTo('shop')" class="mt-4 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shadow-sm">
              Start Shopping
            </button>
          </div>
        `;
      } else {
        drawerContainer.innerHTML = this.cart.map(item => `
          <div class="flex items-center space-x-3 py-3 border-b border-slate-100">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0">
            <div class="flex-1 min-w-0">
              <h5 class="text-xs font-semibold text-slate-900 truncate" title="${item.title}">${item.title}</h5>
              ${item.variant ? `<p class="text-[11px] text-slate-400 mt-0.5">${item.variant}</p>` : ''}
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button onclick="CartHandler.updateQuantity('${item.id}', '${item.variant}', -1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-200 text-xs font-bold">-</button>
                  <span class="w-7 text-center text-xs font-bold text-slate-800">${item.quantity}</span>
                  <button onclick="CartHandler.updateQuantity('${item.id}', '${item.variant}', 1)" class="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-200 text-xs font-bold">+</button>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-slate-900">$${(item.price * item.quantity).toFixed(2)}</span>
                  <button onclick="CartHandler.removeItem('${item.id}', '${item.variant}')" class="block text-[11px] text-red-500 hover:text-red-700 ml-auto mt-0.5">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Shipping progress threshold ($50)
    const progressBar = document.getElementById('freeShippingBar');
    const progressText = document.getElementById('freeShippingText');
    if (progressBar && progressText) {
      const freeThreshold = 50;
      if (subtotal >= freeThreshold) {
        progressBar.style.width = '100%';
        progressBar.className = 'h-full bg-emerald-500 rounded-full transition-all duration-300';
        progressText.innerHTML = `<span class="text-emerald-600 font-bold"><i class="fas fa-check-circle mr-1"></i> You have unlocked FREE Express US Delivery!</span>`;
      } else {
        const percent = Math.min(100, (subtotal / freeThreshold) * 100);
        const remaining = (freeThreshold - subtotal).toFixed(2);
        progressBar.style.width = `${percent}%`;
        progressBar.className = 'h-full bg-amber-500 rounded-full transition-all duration-300';
        progressText.innerHTML = `Add <span class="font-bold text-slate-800">$${remaining}</span> more for <span class="font-bold text-amber-600">FREE US Shipping</span>`;
      }
    }

    if (window.CheckoutHandler) {
      CheckoutHandler.updateSummary();
    }
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartDrawerContent');
    if (drawer && content) {
      drawer.classList.remove('invisible', 'opacity-0');
      drawer.classList.add('visible', 'opacity-100');
      content.classList.remove('translate-x-full');
      content.classList.add('translate-x-0');
      document.body.classList.add('overflow-hidden');
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartDrawerContent');
    if (drawer && content) {
      content.classList.remove('translate-x-0');
      content.classList.add('translate-x-full');
      setTimeout(() => {
        drawer.classList.remove('visible', 'opacity-100');
        drawer.classList.add('invisible', 'opacity-0');
        document.body.classList.remove('overflow-hidden');
      }, 250);
    }
  }
};

const App = {
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  activeQuickviewProduct: null,

  init() {
    CartHandler.init();
    this.renderProducts();
    this.renderCategoriesNav();
    this.bindEvents();
    this.handleRouting();
    if (window.AdminSettingsHandler) {
      AdminSettingsHandler.init();
    }
  },

  bindEvents() {
    // Search input in header
    const searchInputs = document.querySelectorAll('.header-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        this.renderProducts();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.navigateTo('shop');
        }
      });
    });

    // Hash change routing
    window.addEventListener('hashchange', () => {
      this.handleRouting();
    });

    // Quickview modal backdrop click
    const quickviewBackdrop = document.getElementById('quickviewModal');
    if (quickviewBackdrop) {
      quickviewBackdrop.addEventListener('click', (e) => {
        if (e.target === quickviewBackdrop) this.closeQuickview();
      });
    }

    // Receipt modal backdrop click
    const receiptModal = document.getElementById('receiptModal');
    if (receiptModal) {
      receiptModal.addEventListener('click', (e) => {
        if (e.target === receiptModal) this.closeReceiptModal();
      });
    }

    // Order Tracking Form
    const trackForm = document.getElementById('orderTrackForm');
    if (trackForm) {
      trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('trackOrderInput')?.value.trim();
        if (input) this.trackOrder(input);
      });
    }

    // Contact Form
    const contactForm = document.getElementById('contactUsForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        App.showToast('Thank you! Your message was sent to GUL LLC US Support. We will reply within 24 hours.', 'success');
        contactForm.reset();
      });
    }
  },

  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validViews = ['home', 'shop', 'checkout', 'about', 'contact', 'track-order', 'privacy', 'terms', 'returns', 'shipping'];
    const activeView = validViews.includes(hash) ? hash : 'home';

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    // Show active view section
    const targetSection = document.getElementById(`view-${activeView}`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Sync active nav states
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkHash = link.getAttribute('href')?.replace('#', '');
      if (linkHash === activeView) {
        link.classList.add('text-amber-600', 'font-bold');
      } else {
        link.classList.remove('text-amber-600', 'font-bold');
      }
    });

    if (activeView === 'checkout') {
      if (window.CheckoutHandler) {
        CheckoutHandler.updateSummary();
      }
    }
  },

  navigateTo(viewName) {
    window.location.hash = viewName;
  },

  setCategory(slug) {
    this.currentCategory = slug;
    document.querySelectorAll('.category-tab').forEach(tab => {
      if (tab.getAttribute('data-category') === slug) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    this.renderProducts();
  },

  setSort(sortValue) {
    this.sortBy = sortValue;
    this.renderProducts();
  },

  filterProducts() {
    let list = [...PRODUCTS];

    if (this.currentCategory !== 'all') {
      list = list.filter(p => p.categorySlug === this.currentCategory);
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (this.sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  },

  renderProducts() {
    const list = this.filterProducts();

    // Home page grid
    const homeContainer = document.getElementById('homeProductsGrid');
    if (homeContainer) {
      homeContainer.innerHTML = list.slice(0, 12).map(p => this.createProductCardHtml(p)).join('');
    }

    // Shop page grid
    const shopContainer = document.getElementById('shopProductsGrid');
    const shopCount = document.getElementById('shopProductsCount');
    if (shopContainer) {
      if (list.length === 0) {
        shopContainer.innerHTML = `
          <div class="col-span-full text-center py-16 text-slate-400">
            <i class="fas fa-search text-4xl mb-3 text-slate-300"></i>
            <h4 class="text-base font-bold text-slate-700">No matching products found</h4>
            <p class="text-xs text-slate-500 mt-1">Try resetting filters or searching for another keyword.</p>
            <button onclick="App.setCategory('all'); document.querySelectorAll('.header-search-input').forEach(i=>i.value=''); App.searchQuery='';" class="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold">
              View All Products
            </button>
          </div>
        `;
      } else {
        shopContainer.innerHTML = list.map(p => this.createProductCardHtml(p)).join('');
      }
    }
    if (shopCount) {
      shopCount.textContent = `Showing ${list.length} results`;
    }
  },

  createProductCardHtml(p) {
    const discount = p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    return `
      <div class="product-card bg-white rounded-xl overflow-hidden flex flex-col group relative">
        <!-- Badge -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
          ${p.badge ? `<span class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md ${p.badge.includes('Save') || p.badge.includes('%') ? 'badge-save' : 'badge-gold'} shadow-sm">${p.badge}</span>` : ''}
          ${discount > 0 && !p.badge?.includes('%') ? `<span class="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded shadow-sm">-${discount}%</span>` : ''}
        </div>

        <!-- Wishlist Icon -->
        <button onclick="App.showToast('Saved to wishlist!', 'info')" class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-red-500 flex items-center justify-center transition shadow-sm">
          <i class="far fa-heart text-xs"></i>
        </button>

        <!-- Image Container -->
        <div class="product-image-container cursor-pointer" onclick="App.openQuickview('${p.id}')">
          <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80'">
          
          <!-- Quickview Button Overlay -->
          <div class="absolute inset-x-3 bottom-3 z-10 quickview-btn">
            <button onclick="event.stopPropagation(); App.openQuickview('${p.id}')" class="w-full bg-slate-900/95 hover:bg-amber-600 text-white font-bold py-2 px-3 rounded-lg text-xs transition duration-200 flex items-center justify-center shadow-lg backdrop-blur-sm">
              <i class="far fa-eye mr-1.5"></i> Quick View
            </button>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-4 flex-1 flex flex-col">
          <span class="text-[11px] font-semibold text-amber-600 uppercase tracking-wider mb-1">${p.category}</span>
          <h3 class="text-sm font-bold text-slate-800 line-clamp-2 hover:text-amber-600 cursor-pointer transition mb-2" onclick="App.openQuickview('${p.id}')" title="${p.title}">
            ${p.title}
          </h3>

          <!-- Rating -->
          <div class="flex items-center space-x-1.5 mb-3">
            <div class="flex text-amber-400 text-xs">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <span class="text-[11px] text-slate-400 font-medium">(${p.reviewsCount})</span>
          </div>

          <!-- Price & Action -->
          <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-base font-extrabold text-slate-900">$${p.price.toFixed(2)}</span>
              ${p.originalPrice > p.price ? `<span class="text-xs text-slate-400 line-through ml-1.5">$${p.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button onclick="CartHandler.addItem(PRODUCTS.find(x=>x.id==='${p.id}'))" class="w-9 h-9 rounded-lg bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white flex items-center justify-center transition shadow-sm font-bold" title="Add to Cart">
              <i class="fas fa-plus text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderCategoriesNav() {
    const list = CATEGORIES;
    const navContainers = document.querySelectorAll('.categories-list-container');
    navContainers.forEach(c => {
      c.innerHTML = list.map(cat => `
        <button onclick="App.setCategory('${cat.slug}'); App.navigateTo('shop')" class="text-xs font-semibold text-slate-600 hover:text-amber-600 transition flex items-center justify-between py-1.5">
          <span>${cat.name}</span>
          <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-mono">${cat.count}</span>
        </button>
      `).join('');
    });
  },

  openQuickview(productId) {
    const p = PRODUCTS.find(x => x.id === productId);
    if (!p) return;
    this.activeQuickviewProduct = p;

    const modal = document.getElementById('quickviewModal');
    const content = document.getElementById('quickviewModalContent');
    if (!modal || !content) return;

    const discount = p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <!-- Image & Gallery -->
        <div class="space-y-3">
          <div class="w-full h-80 md:h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
          </div>
          <div class="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <i class="fas fa-shield-alt text-amber-600 text-base"></i>
            <span><strong>Walmart Verified US Merchant:</strong> Guaranteed authentic product backed by GUL LLC Delaware.</span>
          </div>
        </div>

        <!-- Details -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">${p.category}</span>
            <span class="text-xs font-mono text-slate-400">SKU: ${p.sku}</span>
          </div>

          <h2 class="text-xl font-bold text-slate-900 mt-2 leading-snug">${p.title}</h2>

          <!-- Ratings & Reviews -->
          <div class="flex items-center space-x-2 mt-2">
            <div class="flex text-amber-400 text-sm">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <span class="text-xs font-bold text-slate-700">${p.rating}</span>
            <span class="text-xs text-slate-400">(${p.reviewsCount} customer reviews)</span>
            <span class="text-xs text-emerald-600 font-bold ml-2"><i class="fas fa-check-circle mr-1"></i> In Stock</span>
          </div>

          <!-- Price -->
          <div class="mt-4 p-3 bg-slate-50 rounded-xl flex items-baseline space-x-3 border border-slate-100">
            <span class="text-3xl font-extrabold text-slate-900">$${p.price.toFixed(2)}</span>
            ${p.originalPrice > p.price ? `
              <span class="text-base text-slate-400 line-through">$${p.originalPrice.toFixed(2)}</span>
              <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Save ${(p.originalPrice - p.price).toFixed(2)} (${discount}%)</span>
            ` : ''}
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-600 mt-4 leading-relaxed">${p.description}</p>

          <!-- Key Highlights -->
          <div class="mt-4">
            <h5 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Highlights & Features</h5>
            <ul class="text-xs text-slate-600 space-y-1">
              ${(p.features || []).map(f => `
                <li class="flex items-start">
                  <i class="fas fa-check text-amber-600 mt-1 mr-2 flex-shrink-0 text-[10px]"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Variants Selection -->
          ${p.variants && p.variants.length ? `
            <div class="mt-4">
              <label class="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">${p.variants[0].name}</label>
              <div class="flex flex-wrap gap-2" id="quickviewVariants">
                ${p.variants[0].options.map((opt, idx) => `
                  <button type="button" class="variant-pill px-3 py-1.5 border ${idx === 0 ? 'border-amber-600 bg-amber-50 text-amber-800 font-bold' : 'border-slate-300 text-slate-700'} rounded-lg text-xs hover:border-amber-600 transition" onclick="App.selectVariant(this)">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Quantity & Add to Cart -->
          <div class="mt-6 pt-4 border-t border-slate-200 flex items-center space-x-3">
            <div class="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
              <button onclick="App.adjustQuickviewQty(-1)" class="w-9 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold">-</button>
              <input type="text" id="quickviewQty" value="1" readonly class="w-10 text-center text-xs font-bold text-slate-800 border-none">
              <button onclick="App.adjustQuickviewQty(1)" class="w-9 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold">+</button>
            </div>
            <button onclick="App.addActiveQuickviewToCart()" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg text-xs transition duration-200 shadow-md flex items-center justify-center space-x-2">
              <i class="fas fa-shopping-cart"></i>
              <span>Add to Cart &bull; $${p.price.toFixed(2)}</span>
            </button>
          </div>

          <!-- Walmart Logistics badge -->
          <div class="mt-4 text-[11px] text-slate-500 flex items-center space-x-4">
            <span><i class="fas fa-shipping-fast text-emerald-600 mr-1"></i> Ships in 24h</span>
            <span><i class="fas fa-undo text-blue-600 mr-1"></i> 30-Day Return Policy</span>
            <span><i class="fas fa-lock text-slate-700 mr-1"></i> 256-Bit SSL Secure</span>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  },

  closeQuickview() {
    const modal = document.getElementById('quickviewModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }
  },

  closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      this.navigateTo('home');
    }
  },

  selectVariant(btn) {
    document.querySelectorAll('#quickviewVariants .variant-pill').forEach(b => {
      b.className = 'variant-pill px-3 py-1.5 border border-slate-300 text-slate-700 rounded-lg text-xs hover:border-amber-600 transition';
    });
    btn.className = 'variant-pill px-3 py-1.5 border border-amber-600 bg-amber-50 text-amber-800 font-bold rounded-lg text-xs';
  },

  adjustQuickviewQty(delta) {
    const input = document.getElementById('quickviewQty');
    if (input) {
      let val = parseInt(input.value) || 1;
      val = Math.max(1, val + delta);
      input.value = val;
    }
  },

  addActiveQuickviewToCart() {
    if (!this.activeQuickviewProduct) return;
    const qty = parseInt(document.getElementById('quickviewQty')?.value) || 1;
    const selectedVariant = document.querySelector('#quickviewVariants .font-bold')?.textContent?.trim() || '';
    CartHandler.addItem(this.activeQuickviewProduct, selectedVariant, qty);
    this.closeQuickview();
  },

  async trackOrder(orderQuery) {
    const resultContainer = document.getElementById('trackOrderResult');
    if (!resultContainer) return;

    resultContainer.innerHTML = `
      <div class="text-center py-8 text-amber-600">
        <i class="fas fa-circle-notch fa-spin text-3xl mb-2"></i>
        <p class="text-xs font-semibold">Communicating with GUL LLC Fulfillment System...</p>
      </div>
    `;

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderQuery)}`);
      const data = await res.json();

      if (data.success && data.order) {
        const o = data.order;
        resultContainer.innerHTML = `
          <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-left">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 gap-2">
              <div>
                <span class="text-xs text-slate-400 font-bold uppercase">Order Reference</span>
                <h4 class="text-lg font-extrabold text-slate-900">${o.orderId}</h4>
              </div>
              <div class="text-right">
                <span class="px-3 py-1 rounded-full text-xs font-bold ${o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                  ${o.status}
                </span>
                <p class="text-xs text-slate-500 mt-1">Carrier: <strong class="text-slate-800">${o.shippingMethod || 'FedEx'}</strong></p>
              </div>
            </div>

            <!-- Timeline -->
            <div class="py-6">
              <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Shipment Milestones</h5>
              <div class="space-y-4">
                ${(o.timeline || []).map((step, idx) => `
                  <div class="flex items-start space-x-3">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${step.completed ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-500'}">
                      ${step.completed ? '<i class="fas fa-check"></i>' : (idx + 1)}
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-slate-900">${step.status}</span>
                        <span class="text-[11px] text-slate-400">${step.time}</span>
                      </div>
                      ${step.note ? `<p class="text-xs text-slate-500 mt-0.5">${step.note}</p>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Tracking number badge -->
            <div class="bg-slate-50 p-4 rounded-lg flex items-center justify-between text-xs">
              <div>
                <span class="text-slate-400 block font-semibold">Carrier Tracking Code</span>
                <span class="font-mono font-bold text-slate-800 text-sm">${o.trackingNumber}</span>
              </div>
              <a href="https://www.fedex.com" target="_blank" class="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-bold hover:bg-amber-600 transition">
                FedEx Portal <i class="fas fa-external-link-alt ml-1 text-[10px]"></i>
              </a>
            </div>
          </div>
        `;
      } else {
        resultContainer.innerHTML = `
          <div class="p-6 bg-red-50 border border-red-200 rounded-xl text-center text-xs text-red-700">
            <i class="fas fa-exclamation-triangle text-2xl text-red-500 mb-2"></i>
            <p class="font-bold">${data.message || 'No order found.'}</p>
            <p class="text-slate-500 mt-1">Try testing with demo Order ID: <strong>GUL-948102</strong></p>
          </div>
        `;
      }
    } catch (e) {
      resultContainer.innerHTML = `<div class="p-4 text-xs text-red-600">Failed to track order. Please check network.</div>`;
    }
  },

  trackSpecificOrder(orderId) {
    this.closeReceiptModal();
    this.navigateTo('track-order');
    const input = document.getElementById('trackOrderInput');
    if (input) {
      input.value = orderId;
      this.trackOrder(orderId);
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const colors = {
      success: 'bg-emerald-800 text-white border-emerald-900',
      error: 'bg-red-800 text-white border-red-900',
      warning: 'bg-amber-700 text-white border-amber-800',
      info: 'bg-slate-900 text-white border-slate-950'
    };

    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };

    toast.className = `flex items-center space-x-2.5 px-4 py-3 rounded-lg shadow-xl text-xs font-medium border ${colors[type] || colors.info} transform transition duration-300 translate-y-2 opacity-0`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info} text-sm"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('-translate-y-2', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

window.App = App;
window.CartHandler = CartHandler;

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
