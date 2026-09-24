/**
 * VERONA ATELIER - Main Application Logic
 * Premium Modern Furniture Catalogue Website
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentRoute: { view: 'home', categoryId: null, subcategoryId: 'all', productId: null },
    activeProduct: null,
    selectedColor: null,
    selectedSize: null,
    activeSubcategory: 'all',
    priceFilter: 'all',
    materialFilter: 'all',
    sortBy: 'featured'
  };

  // DOM Elements
  const elements = {
    // Views
    homeView: document.getElementById('homeView'),
    catalogView: document.getElementById('catalogView'),
    productDetailsView: document.getElementById('productDetailsView'),
    
    // Catalog View Elements
    catalogBreadcrumbs: document.getElementById('catalogBreadcrumbs'),
    catalogHeroBanner: document.getElementById('catalogHeroBanner'),
    catalogTitle: document.getElementById('catalogTitle'),
    catalogDesc: document.getElementById('catalogDesc'),
    catalogBannerImg: document.getElementById('catalogBannerImg'),
    subcategoriesList: document.getElementById('subcategoriesList'),
    catalogProductCount: document.getElementById('catalogProductCount'),
    catalogProductGrid: document.getElementById('catalogProductGrid'),
    priceFilterSelect: document.getElementById('priceFilterSelect'),
    materialFilterSelect: document.getElementById('materialFilterSelect'),
    sortSelect: document.getElementById('sortSelect'),

    // Product Details Elements
    detailBreadcrumbs: document.getElementById('detailBreadcrumbs'),
    mainProductImg: document.getElementById('mainProductImg'),
    thumbnailsStrip: document.getElementById('thumbnailsStrip'),
    detailStockBadge: document.getElementById('detailStockBadge'),
    detailTitle: document.getElementById('detailTitle'),
    detailRatingStars: document.getElementById('detailRatingStars'),
    detailRatingScore: document.getElementById('detailRatingScore'),
    detailReviewCount: document.getElementById('detailReviewCount'),
    detailPrice: document.getElementById('detailPrice'),
    detailOriginalPrice: document.getElementById('detailOriginalPrice'),
    detailSaveBadge: document.getElementById('detailSaveBadge'),
    colorSwatchesContainer: document.getElementById('colorSwatchesContainer'),
    currentColorLabel: document.getElementById('currentColorLabel'),
    sizePillsContainer: document.getElementById('sizePillsContainer'),
    currentSizeLabel: document.getElementById('currentSizeLabel'),
    detailMaterialVal: document.getElementById('detailMaterialVal'),
    detailDimensionsVal: document.getElementById('detailDimensionsVal'),
    detailWarrantyVal: document.getElementById('detailWarrantyVal'),
    detailDescription: document.getElementById('detailDescription'),
    detailFeaturesList: document.getElementById('detailFeaturesList'),
    detailSpecsTable: document.getElementById('detailSpecsTable'),
    relatedProductsGrid: document.getElementById('relatedProductsGrid'),
    pincodeInput: document.getElementById('pincodeInput'),
    pincodeBtn: document.getElementById('pincodeBtn'),
    pincodeResponse: document.getElementById('pincodeResponse'),

    // Search Modal
    searchModal: document.getElementById('searchModal'),
    searchModalClose: document.getElementById('searchModalClose'),
    searchInput: document.getElementById('searchInput'),
    searchResultsList: document.getElementById('searchResultsList'),

    // Mobile Menu Drawer
    mobileMenuDrawer: document.getElementById('mobileMenuDrawer'),
    mobileMenuBackdrop: document.getElementById('mobileMenuBackdrop'),
    mobileMenuClose: document.getElementById('mobileMenuClose'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
  };

  // ==========================================================================
  // INITIALIZATION & ROUTING
  // ==========================================================================
  function init() {
    setupEventListeners();
    handleRoute();
    renderHomeCategories();
  }

  function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const parts = hash.split('/');

    if (parts[0] === 'category') {
      const categoryId = parts[1] || 'beds';
      const subcategoryId = parts[2] || 'all';
      showCatalogView(categoryId, subcategoryId);
    } else if (parts[0] === 'product') {
      const productId = parts[1];
      showProductDetailsView(productId);
    } else {
      showHomeView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  // ==========================================================================
  // VIEW SWITCHING
  // ==========================================================================
  function showHomeView() {
    state.currentRoute = { view: 'home', categoryId: null, subcategoryId: 'all', productId: null };
    elements.homeView.style.display = 'block';
    elements.catalogView.classList.remove('active');
    elements.productDetailsView.classList.remove('active');
    updateNavLinksActive(null);
  }

  function showCatalogView(categoryId, subcategoryId = 'all') {
    const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
    state.currentRoute = { view: 'category', categoryId: category.id, subcategoryId: subcategoryId, productId: null };
    state.activeSubcategory = subcategoryId;

    elements.homeView.style.display = 'none';
    elements.productDetailsView.classList.remove('active');
    elements.catalogView.classList.add('active');

    updateNavLinksActive(category.id);
    renderCatalogHeader(category);
    renderSubcategoryTabs(category, subcategoryId);
    renderCatalogProducts();
  }

  function showProductDetailsView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      showHomeView();
      return;
    }

    state.activeProduct = product;
    state.selectedColor = product.colors && product.colors.length > 0 ? product.colors[0].name : null;
    state.selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    state.currentRoute = { view: 'product', categoryId: product.category, subcategoryId: null, productId: product.id };

    elements.homeView.style.display = 'none';
    elements.catalogView.classList.remove('active');
    elements.productDetailsView.classList.add('active');

    renderProductDetails(product);
  }

  function updateNavLinksActive(categoryId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const cat = link.getAttribute('data-cat');
      if (cat && cat === categoryId) {
        link.classList.add('active');
      } else if (!categoryId && link.getAttribute('href') === '#home') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // HOME PAGE RENDERING
  // ==========================================================================
  function renderHomeCategories() {
    const grid = document.getElementById('homeCategoryGrid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(cat => {
      const productCount = PRODUCTS.filter(p => p.category === cat.id).length;
      return `
        <div class="category-card" onclick="window.location.hash = 'category/${cat.id}/all'">
          <div class="category-thumb-wrap">
            <img src="${cat.image}" alt="${cat.name}" class="category-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80';" />
            <span class="category-badge-chip">${productCount} Models</span>
          </div>
          <div class="category-body">
            <div>
              <h3 class="category-name">${cat.name}</h3>
              <p class="category-tagline">${cat.tagline}</p>
            </div>
            <span class="category-footer-link">
              Explore Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // CATALOG RENDERING
  // ==========================================================================
  function renderCatalogHeader(category) {
    elements.catalogTitle.textContent = category.name.toUpperCase();
    elements.catalogDesc.textContent = category.description;
    elements.catalogBannerImg.src = category.image;

    // Breadcrumbs
    elements.catalogBreadcrumbs.innerHTML = `
      <a href="#home">Home</a>
      <span>/</span>
      <span>Furniture</span>
      <span>/</span>
      <span class="current">${category.name}</span>
    `;
  }

  function renderSubcategoryTabs(category, activeSubId) {
    elements.subcategoriesList.innerHTML = category.subcategories.map(sub => {
      const isActive = sub.id === activeSubId ? 'active' : '';
      return `
        <button class="subcat-pill ${isActive}" data-subid="${sub.id}">
          ${sub.name}
        </button>
      `;
    }).join('');

    // Attach click events
    elements.subcategoriesList.querySelectorAll('.subcat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.getAttribute('data-subid');
        navigateTo(`category/${category.id}/${subId}`);
      });
    });
  }

  function renderCatalogProducts() {
    const { categoryId, subcategoryId } = state.currentRoute;
    if (!categoryId) return;

    // Filter by category
    let list = PRODUCTS.filter(p => p.category === categoryId);

    // Filter by subcategory
    if (subcategoryId && subcategoryId !== 'all') {
      list = list.filter(p => p.subcategories && p.subcategories.includes(subcategoryId));
    }

    // Filter by price
    if (state.priceFilter !== 'all') {
      if (state.priceFilter === 'under-30k') list = list.filter(p => p.price < 30000);
      else if (state.priceFilter === '30k-50k') list = list.filter(p => p.price >= 30000 && p.price <= 50000);
      else if (state.priceFilter === 'above-50k') list = list.filter(p => p.price > 50000);
    }

    // Filter by material
    if (state.materialFilter !== 'all') {
      list = list.filter(p => p.material.toLowerCase().includes(state.materialFilter.toLowerCase()));
    }

    // Sorting
    if (state.sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    // Update count badge
    elements.catalogProductCount.textContent = `Showing ${list.length} Designs`;

    // Render Product Cards
    if (list.length === 0) {
      elements.catalogProductGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3>No matching furniture found</h3>
          <p>Try resetting the price or material filters to explore our full collection.</p>
          <button class="btn-primary" onclick="resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    elements.catalogProductGrid.innerHTML = list.map(product => createProductCardHTML(product)).join('');
  }

  window.resetFilters = function () {
    state.priceFilter = 'all';
    state.materialFilter = 'all';
    elements.priceFilterSelect.value = 'all';
    elements.materialFilterSelect.value = 'all';
    renderCatalogProducts();
  };

  /**
   * Product Card HTML:
   * Keep ONLY "View Details" as the product action.
   * Clicking "View Details" or the card opens that product's existing Product Details page.
   */
  function createProductCardHTML(product) {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card-img-wrap" onclick="window.location.hash = 'product/${product.id}'">
          <img src="${product.primaryImage}" alt="${product.name}" class="product-card-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80';" />
          ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-card-body">
          <span class="product-material-tag">${product.material.split('&')[0].trim()}</span>
          <h4 class="product-card-title" onclick="window.location.hash = 'product/${product.id}'">${product.name}</h4>
          
          <div class="product-rating-row">
            <span class="stars-icon">★</span>
            <strong>${product.rating}</strong>
            <span>(${product.reviewsCount} reviews)</span>
          </div>

          <div class="product-price-row">
            <span class="price-current">${formatCurrency(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
            ${discount > 0 ? `<span class="price-discount-tag">${discount}% OFF</span>` : ''}
          </div>

          <div class="product-card-actions">
            <button class="btn-view-details" onclick="window.location.hash = 'product/${product.id}'">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // PRODUCT DETAILS RENDERING
  // ==========================================================================
  function renderProductDetails(product) {
    const category = CATEGORIES.find(c => c.id === product.category);
    const categoryName = category ? category.name : 'Catalogue';

    // Breadcrumbs
    elements.detailBreadcrumbs.innerHTML = `
      <a href="#home">Home</a>
      <span>/</span>
      <a href="#category/${product.category}/all">${categoryName}</a>
      <span>/</span>
      <span class="current">${product.name}</span>
    `;

    // Images
    elements.mainProductImg.src = product.primaryImage;
    elements.mainProductImg.alt = product.name;

    const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.primaryImage];
    elements.thumbnailsStrip.innerHTML = gallery.map((imgUrl, idx) => `
      <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-img="${imgUrl}">
        <img src="${imgUrl}" alt="${product.name} angle ${idx + 1}" loading="lazy" />
      </button>
    `).join('');

    elements.thumbnailsStrip.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        elements.thumbnailsStrip.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        elements.mainProductImg.src = btn.getAttribute('data-img');
      });
    });

    // Badges & Stock
    elements.detailStockBadge.innerHTML = `
      <span class="stock-pill">
        <span class="stock-indicator-dot"></span>
        ${product.availability} (${product.stockCount || 5} Units Available)
      </span>
    `;

    // Title & Rating
    elements.detailTitle.textContent = product.name;
    elements.detailRatingScore.textContent = product.rating;
    elements.detailReviewCount.textContent = `(${product.reviewsCount} Customer Reviews)`;

    // Price
    elements.detailPrice.textContent = formatCurrency(product.price);
    if (product.originalPrice) {
      elements.detailOriginalPrice.textContent = formatCurrency(product.originalPrice);
      elements.detailOriginalPrice.style.display = 'inline';
      const savings = product.originalPrice - product.price;
      elements.detailSaveBadge.textContent = `Save ${formatCurrency(savings)} (${Math.round((savings / product.originalPrice) * 100)}% OFF)`;
      elements.detailSaveBadge.style.display = 'inline-block';
    } else {
      elements.detailOriginalPrice.style.display = 'none';
      elements.detailSaveBadge.style.display = 'none';
    }

    // Color Swatches
    if (product.colors && product.colors.length > 0) {
      elements.currentColorLabel.textContent = state.selectedColor;
      elements.colorSwatchesContainer.innerHTML = product.colors.map((c, idx) => `
        <button class="color-swatch-btn ${idx === 0 ? 'active' : ''}" data-color="${c.name}">
          <span class="swatch-circle" style="background-color: ${c.hex}"></span>
          <span>${c.name}</span>
        </button>
      `).join('');

      elements.colorSwatchesContainer.querySelectorAll('.color-swatch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.colorSwatchesContainer.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.selectedColor = btn.getAttribute('data-color');
          elements.currentColorLabel.textContent = state.selectedColor;
        });
      });
    } else {
      elements.colorSwatchesContainer.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-secondary);">Standard Atelier Finish</span>';
      elements.currentColorLabel.textContent = 'Natural';
    }

    // Size Pills
    if (product.sizes && product.sizes.length > 0) {
      elements.currentSizeLabel.textContent = state.selectedSize;
      elements.sizePillsContainer.innerHTML = product.sizes.map((s, idx) => `
        <button class="size-pill-btn ${idx === 0 ? 'active' : ''}" data-size="${s}">
          ${s}
        </button>
      `).join('');

      elements.sizePillsContainer.querySelectorAll('.size-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          elements.sizePillsContainer.querySelectorAll('.size-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.selectedSize = btn.getAttribute('data-size');
          elements.currentSizeLabel.textContent = state.selectedSize;
        });
      });
    } else {
      elements.sizePillsContainer.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-secondary);">Standard Dimension</span>';
      elements.currentSizeLabel.textContent = 'Standard';
    }

    // Highlight Grid
    elements.detailMaterialVal.textContent = product.material;
    elements.detailDimensionsVal.textContent = product.dimensions;
    elements.detailWarrantyVal.textContent = product.warranty || '10 Years Structural';

    // Description & Features
    elements.detailDescription.textContent = product.description;
    if (product.features && product.features.length > 0) {
      elements.detailFeaturesList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    } else {
      elements.detailFeaturesList.innerHTML = '<li>Premium craftsmanship with hand-rubbed protective finish</li>';
    }

    // Specifications Table
    if (product.specs) {
      elements.detailSpecsTable.innerHTML = Object.entries(product.specs).map(([key, val]) => `
        <tr>
          <td>${key}</td>
          <td>${val}</td>
        </tr>
      `).join('');
    } else {
      elements.detailSpecsTable.innerHTML = `
        <tr><td>Material</td><td>${product.material}</td></tr>
        <tr><td>Dimensions</td><td>${product.dimensions}</td></tr>
      `;
    }

    // Related Products (Same category, excluding current)
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    elements.relatedProductsGrid.innerHTML = related.map(p => createProductCardHTML(p)).join('');
  }

  // ==========================================================================
  // LIVE SEARCH
  // ==========================================================================
  function openSearchModal() {
    elements.searchModal.classList.add('active');
    elements.searchInput.value = '';
    elements.searchInput.focus();
    renderSearchResults('');
    document.body.style.overflow = 'hidden';
  }

  function closeSearchModal() {
    elements.searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderSearchResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      elements.searchResultsList.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-secondary); font-size: 0.88rem;">
          Search across our curated collection of beds, sofas, dining, and more.
        </div>
      `;
      return;
    }

    const matches = PRODUCTS.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.subcategories && p.subcategories.some(s => s.toLowerCase().includes(q)))
      );
    });

    if (matches.length === 0) {
      elements.searchResultsList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <h4 style="font-size: 1.1rem; margin-bottom: 0.4rem;">No matching furniture for "${query}"</h4>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">Try searching for "bed", "sofa", "dining", or "wardrobe".</p>
        </div>
      `;
      return;
    }

    elements.searchResultsList.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="closeSearchModal(); window.location.hash = 'product/${p.id}';">
        <img src="${p.primaryImage}" alt="${p.name}" class="search-result-thumb" />
        <div style="flex-grow: 1;">
          <h4 style="font-size: 1rem; font-weight: 600; font-family: var(--font-serif);">${p.name}</h4>
          <div style="font-size: 0.76rem; color: var(--accent-gold-hover); text-transform: uppercase;">${p.category} • ${p.material.split('&')[0]}</div>
        </div>
        <div style="font-size: 1rem; font-weight: 700;">${formatCurrency(p.price)}</div>
      </div>
    `).join('');
  }

  window.closeSearchModal = closeSearchModal;

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // Hash Routing
    window.addEventListener('hashchange', handleRoute);

    // Navbar Scroll Shadow
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Search Trigger Buttons
    document.querySelectorAll('[data-search-trigger]').forEach(btn => {
      btn.addEventListener('click', openSearchModal);
    });
    if (elements.searchModalClose) {
      elements.searchModalClose.addEventListener('click', closeSearchModal);
    }
    if (elements.searchModal) {
      elements.searchModal.addEventListener('click', (e) => {
        if (e.target === elements.searchModal) closeSearchModal();
      });
    }
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
      });
    }

    // Search Tag Chips
    document.querySelectorAll('.search-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const tag = chip.getAttribute('data-tag');
        if (elements.searchInput) {
          elements.searchInput.value = tag;
          renderSearchResults(tag);
        }
      });
    });

    // Mobile Menu Triggers
    if (elements.mobileMenuBtn && elements.mobileMenuDrawer) {
      elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mobileMenuDrawer.classList.add('active');
        if (elements.mobileMenuBackdrop) elements.mobileMenuBackdrop.classList.add('active');
      });
    }
    if (elements.mobileMenuClose && elements.mobileMenuDrawer) {
      elements.mobileMenuClose.addEventListener('click', () => {
        elements.mobileMenuDrawer.classList.remove('active');
        if (elements.mobileMenuBackdrop) elements.mobileMenuBackdrop.classList.remove('active');
      });
    }
    if (elements.mobileMenuBackdrop && elements.mobileMenuDrawer) {
      elements.mobileMenuBackdrop.addEventListener('click', () => {
        elements.mobileMenuDrawer.classList.remove('active');
        elements.mobileMenuBackdrop.classList.remove('active');
      });
    }
    document.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        if (elements.mobileMenuDrawer) elements.mobileMenuDrawer.classList.remove('active');
        if (elements.mobileMenuBackdrop) elements.mobileMenuBackdrop.classList.remove('active');
      });
    });

    // Pincode Checker
    if (elements.pincodeBtn && elements.pincodeInput) {
      elements.pincodeBtn.addEventListener('click', () => {
        const pin = elements.pincodeInput.value.trim();
        if (pin.length >= 6) {
          elements.pincodeResponse.textContent = `✓ Delivery available to ${pin} within 3-5 days. Free White-Glove assembly included.`;
          elements.pincodeResponse.style.display = 'block';
          elements.pincodeResponse.style.color = '#2E7D32';
        } else {
          elements.pincodeResponse.textContent = 'Please enter a valid 6-digit Indian PIN code.';
          elements.pincodeResponse.style.display = 'block';
          elements.pincodeResponse.style.color = '#E63946';
        }
      });
    }

    // Accordions
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        const isOpen = content.classList.contains('open');
        document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
        if (!isOpen) {
          content.classList.add('open');
        }
      });
    });

    // Filters in Catalog
    if (elements.priceFilterSelect) {
      elements.priceFilterSelect.addEventListener('change', (e) => {
        state.priceFilter = e.target.value;
        renderCatalogProducts();
      });
    }

    if (elements.materialFilterSelect) {
      elements.materialFilterSelect.addEventListener('change', (e) => {
        state.materialFilter = e.target.value;
        renderCatalogProducts();
      });
    }

    if (elements.sortSelect) {
      elements.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderCatalogProducts();
      });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for subscribing to Verona Atelier exclusives.');
        newsletterForm.reset();
      });
    }

    // Keyboard Shortcuts (e.g. '/' opens search)
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape') {
        closeSearchModal();
        if (elements.mobileMenuDrawer) {
          elements.mobileMenuDrawer.classList.remove('active');
          if (elements.mobileMenuBackdrop) elements.mobileMenuBackdrop.classList.remove('active');
        }
      }
    });
  }

  // Launch app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
