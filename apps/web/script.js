/* ==========================================================
   Wa-Vibe Fashion — E-Commerce JavaScript
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Data ----------
  const products = [
    { id: 1, name: 'เดรสยาวแขนยาว ลายดอกไม้', category: 'dresses', type: 'sale', price: 1290, originalPrice: 1590, colors: ['น้ำตาล','เขียว','ม่วง'], rating: 4.5, reviews: 24, badge: 'new', bg: 'linear-gradient(135deg, #f5e6d3, #e8d5c4)', icon: 'fas fa-vest', desc: 'เดรสยาวแขนยาว ผ้าฝ้ายผสม ดีไซน์ลายดอกไม้ ใส่สบาย เหมาะสำหรับทุกโอกาส' },
    { id: 2, name: 'ชุดเดรสรายอ สีน้ำเงินกรม', category: 'dresses', type: 'rental', price: 399, deposit: 500, colors: ['น้ำเงิน','ชมพูเข้ม'], rating: 5, reviews: 42, badge: 'hot', bg: 'linear-gradient(135deg, #e6f0e8, #d4e4d7)', icon: 'fas fa-vest', desc: 'ชุดเดรสสีน้ำเงินกรม ตัดเย็บประณีต สำหรับงานรายอและโอกาสพิเศษ' },
    { id: 3, name: 'ฮิญาบสำเร็จรูป ผ้าชีฟอง', category: 'hijab', type: 'sale', price: 390, colors: ['ครีม','ดำ','น้ำตาล','ขาว'], rating: 4, reviews: 18, badge: 'new', bg: 'linear-gradient(135deg, #f0e6f5, #e0d4ec)', icon: 'fas fa-head-side-coverage', desc: 'ฮิญาบสำเร็จรูป ผ้าชีฟองเนื้อนุ่ม สวมใส่ง่าย ไม่ต้อง_pins' },
    { id: 4, name: 'เข็มกลัดหัวใจ ประดับเพชร', category: 'accessories', type: 'sale', price: 590, colors: [], rating: 5, reviews: 36, badge: null, bg: 'linear-gradient(135deg, #fce4ec, #f8d0dc)', icon: 'fas fa-gem', desc: 'เข็มกลัดดีไซน์หัวใจ ประดับเพชร CZ ประกายสวยงาม' },
    { id: 5, name: 'ชุดราตรีลูกไม้ งานแต่ง', category: 'dresses', type: 'rental', price: 499, deposit: 800, colors: ['ชมพู','น้ำตาล','เขียว'], rating: 4.5, reviews: 31, badge: 'hot', bg: 'linear-gradient(135deg, #fce4ec, #f0c4d4)', icon: 'fas fa-vest', desc: 'ชุดราตรีลูกไม้ สำหรับงานแต่งและงานเลี้ยง ตัดเย็บประณีต' },
    { id: 6, name: 'ผ้าคลุมสแครชเนื้อนุ่ม', category: 'hijab', type: 'sale', price: 290, originalPrice: 360, colors: ['ครีม','เขียว','ม่วง'], rating: 4, reviews: 15, badge: 'sale', bg: 'linear-gradient(135deg, #e6f0e8, #c4dcc8)', icon: 'fas fa-head-side-coverage', desc: 'ผ้าคลุมสแครช เนื้อนุ่มลื่น ไม่ยับ ใส่สบายทุกวัน' },
    { id: 7, name: 'ชุดอามีร่า สีน้ำผึ้ง', category: 'dresses', type: 'rental', price: 350, deposit: 400, colors: [], rating: 4, reviews: 12, badge: null, bg: 'linear-gradient(135deg, #f5e6d3, #e0c8a8)', icon: 'fas fa-vest', desc: 'ชุดอามีร่า สีน้ำผึ้ง สไตล์เรียบหรู ใส่ได้ทุกโอกาส' },
    { id: 8, name: 'ต่างหูมุก ดีไซน์หรู', category: 'accessories', type: 'sale', price: 450, colors: [], rating: 4.5, reviews: 22, badge: null, bg: 'linear-gradient(135deg, #fce4ec, #f5d5de)', icon: 'fas fa-ring', desc: 'ต่างหูมุกน้ำจืด ดีไซน์หรูหรา เหมาะสำหรับเป็นของขวัญ' }
  ];

  // ---------- State ----------
  let cart = [];
  let wishlistCount = 0;
  let currentSlide = 0;
  let slideInterval;

  // ---------- DOM Elements ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---------- Hero Slider ----------
  const heroSlides = $$('.hero-slide');
  const heroDots = $$('.dot');
  const heroPrev = $('#heroPrev');
  const heroNext = $('#heroNext');

  function goToSlide(index) {
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
    heroDots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  if (heroNext) heroNext.addEventListener('click', () => { nextSlide(); resetSlider(); });
  if (heroPrev) heroPrev.addEventListener('click', () => { prevSlide(); resetSlider(); });
  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      resetSlider();
    });
  });
  startSlider();

  // ---------- Mobile Nav ----------
  const mobileMenuBtn = $('#mobileMenuBtn');
  const mobileNav = $('#mobileNav');
  const mobileNavOverlay = $('#mobileNavOverlay');
  const mobileNavClose = $('#mobileNavClose');

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  $$('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ---------- Search ----------
  const searchToggle = $('#searchToggle');
  const searchOverlay = $('#searchOverlay');
  const searchClose = $('#searchClose');
  const searchInput = $('#searchInput');

  if (searchToggle) searchToggle.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
      setTimeout(() => searchInput.focus(), 200);
    }
  });
  if (searchClose) searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
  });

  // ---------- Filter Tabs ----------
  const filterTabs = $$('.filter-tab');
  const productCards = $$('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      let count = 0;

      productCards.forEach(card => {
        const type = card.dataset.type;
        const category = card.dataset.category;
        let show = false;

        if (filter === 'all') show = true;
        else if (filter === 'sale') show = type === 'sale';
        else if (filter === 'rental') show = type === 'rental';
        else show = category === filter;

        card.style.display = show ? '' : 'none';
        if (show) count++;
      });

      const resultEl = $('.result-count');
      if (resultEl) resultEl.innerHTML = `แสดง <strong>${count}</strong> สินค้า`;
    });
  });

  // ---------- Cart ----------
  const cartBtn = $('#cartBtn');
  const cartSidebar = $('#cartSidebar');
  const cartOverlay = $('#cartOverlay');
  const cartClose = $('#cartClose');
  const cartItems = $('#cartItems');
  const cartSummary = $('#cartSummary');
  const cartBadge = $('#cartBadge');
  const continueShopping = $('#continueShopping');

  function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (continueShopping) continueShopping.addEventListener('click', closeCart);

  function renderCart() {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>ตะกร้าว่างเปล่า</p>
          <span>เลือกสินค้าที่ถูกใจได้เลย!</span>
        </div>`;
      cartSummary.style.display = 'none';
      cartBadge.textContent = '0';
      return;
    }

    let subtotal = 0;
    let html = '';

    cart.forEach((item, idx) => {
      const total = item.price * item.qty;
      subtotal += total;
      html += `
        <div class="cart-item">
          <div class="cart-item-img">
            <div style="background: ${item.bg};"><i class="${item.icon}"></i></div>
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-type">${item.type === 'rental' ? 'เช่า' : 'ซื้อขาด'} — ฿${item.price.toLocaleString()}${item.type === 'rental' ? '/วัน' : ''}</div>
            <div class="cart-item-bottom">
              <div class="cart-qty">
                <button data-idx="${idx}" data-action="minus">-</button>
                <span>${item.qty}</span>
                <button data-idx="${idx}" data-action="plus">+</button>
              </div>
              <span class="cart-item-price">฿${total.toLocaleString()}</span>
            </div>
          </div>
          <button class="cart-item-remove" data-idx="${idx}" data-action="remove"><i class="fas fa-trash-alt"></i></button>
        </div>`;
    });

    cartItems.innerHTML = html;
    cartSummary.style.display = 'block';
    cartBadge.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

    const shipping = subtotal >= 1500 ? 0 : 80;
    $('#cartSubtotal').textContent = `฿${subtotal.toLocaleString()}`;
    $('#cartShipping').textContent = shipping === 0 ? 'ฟรี' : `฿${shipping}`;
    $('#cartTotal').textContent = `฿${(subtotal + shipping).toLocaleString()}`;

    // Qty and remove events
    cartItems.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.idx);
        const action = btn.dataset.action;
        if (action === 'plus') cart[idx].qty++;
        else if (action === 'minus') {
          cart[idx].qty--;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        } else if (action === 'remove') {
          cart.splice(idx, 1);
        }
        renderCart();
      });
    });
  }

  function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
        bg: product.bg,
        icon: product.icon,
        qty: 1
      });
    }
    renderCart();
    showToast(`${product.name} เพิ่มลงตะกร้าแล้ว`, 'success');
    openCart();
  }

  // Add to cart buttons
  $$('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });

  // ---------- Rental Modal ----------
  const rentalModalOverlay = $('#rentalModalOverlay');
  const rentalModal = $('#rentalModal');
  const rentalModalClose = $('#rentalModalClose');
  const rentalProductName = $('#rentalProductName');
  const rentalStart = $('#rentalStart');
  const rentalEnd = $('#rentalEnd');
  const rentalSummaryEl = $('#rentalSummary');
  const confirmRental = $('#confirmRental');
  let currentRentalProduct = null;

  function openRentalModal(product) {
    currentRentalProduct = product;
    rentalProductName.textContent = product.name;
    rentalStart.value = '';
    rentalEnd.value = '';
    rentalSummaryEl.style.display = 'none';
    confirmRental.disabled = true;
    rentalModalOverlay.classList.add('active');
    rentalModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const today = new Date().toISOString().split('T')[0];
    rentalStart.min = today;
    rentalEnd.min = today;
  }

  function closeRentalModal() {
    rentalModalOverlay.classList.remove('active');
    rentalModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (rentalModalClose) rentalModalClose.addEventListener('click', closeRentalModal);
  if (rentalModalOverlay) rentalModalOverlay.addEventListener('click', closeRentalModal);

  function updateRentalSummary() {
    if (!currentRentalProduct) return;
    const start = rentalStart.value;
    const end = rentalEnd.value;
    if (!start || !end) {
      rentalSummaryEl.style.display = 'none';
      confirmRental.disabled = true;
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      rentalSummaryEl.style.display = 'none';
      confirmRental.disabled = true;
      return;
    }

    const fee = currentRentalProduct.price * diffDays;
    const deposit = currentRentalProduct.deposit || 0;
    const total = fee + deposit;

    $('#rentalDays').textContent = `${diffDays} วัน`;
    $('#rentalFee').textContent = `฿${fee.toLocaleString()}`;
    $('#rentalDeposit').textContent = `฿${deposit.toLocaleString()}`;
    $('#rentalTotalAmount').textContent = `฿${total.toLocaleString()}`;
    rentalSummaryEl.style.display = 'block';
    confirmRental.disabled = false;
  }

  if (rentalStart) rentalStart.addEventListener('change', () => {
    if (rentalStart.value) rentalEnd.min = rentalStart.value;
    updateRentalSummary();
  });
  if (rentalEnd) rentalEnd.addEventListener('change', updateRentalSummary);

  if (confirmRental) confirmRental.addEventListener('click', () => {
    if (!currentRentalProduct) return;
    addToCart(currentRentalProduct);
    closeRentalModal();
  });

  // Rent buttons
  $$('.btn-rent').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) openRentalModal(product);
    });
  });

  // ---------- User Modal ----------
  const userBtn = $('#userBtn');
  const userModalOverlay = $('#userModalOverlay');
  const userModal = $('#userModal');
  const modalClose = $('#modalClose');
  const authTabs = $$('.auth-tab');
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');

  function openUserModal() {
    userModalOverlay.classList.add('active');
    userModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeUserModal() {
    userModalOverlay.classList.remove('active');
    userModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (userBtn) userBtn.addEventListener('click', openUserModal);
  if (modalClose) modalClose.addEventListener('click', closeUserModal);
  if (userModalOverlay) userModalOverlay.addEventListener('click', closeUserModal);

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'login') {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
      } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
      }
    });
  });

  // Toggle password visibility
  $$('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Form submissions
  if (loginForm) loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('เข้าสู่ระบบสำเร็จ!', 'success');
    closeUserModal();
  });

  if (registerForm) registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = $('#regPassword').value;
    const cpw = $('#regConfirmPassword').value;
    if (pw !== cpw) {
      showToast('รหัสผ่านไม่ตรงกัน', 'error');
      return;
    }
    showToast('สมัครสมาชิกสำเร็จ!', 'success');
    closeUserModal();
  });

  // Contact form
  const contactForm = $('#contactForm');
  if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
    contactForm.reset();
  });

  // ---------- Quick View ----------
  const quickViewOverlay = $('#quickViewOverlay');
  const quickViewModal = $('#quickViewModal');
  const quickViewClose = $('#quickViewClose');
  const quickViewBody = $('#quickViewBody');

  function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const isRental = product.type === 'rental';
    const priceHtml = isRental
      ? `<div class="product-prices-rental">
           <div class="price-rental"><span class="price-label">เช่า</span><span class="price-current">฿${product.price.toLocaleString()}</span><span class="price-unit">/วัน</span></div>
           <div class="price-deposit"><span class="price-label">มัดจำ</span><span class="price-deposit-val">฿${(product.deposit || 0).toLocaleString()}</span></div>
         </div>`
      : `<div class="product-price">
           <span class="price-current">฿${product.price.toLocaleString()}</span>
           ${product.originalPrice ? `<span class="price-original">฿${product.originalPrice.toLocaleString()}</span>` : ''}
         </div>`;

    const colorsHtml = product.colors.length > 0
      ? `<div class="product-colors">${product.colors.map(c => `<span class="color-dot" style="background:#d4a574;" title="${c}"></span>`).join('')}</div>`
      : '';

    const sizes = ['S', 'M', 'L', 'XL'];

    quickViewBody.innerHTML = `
      <div class="qv-img" style="background: ${product.bg};"><i class="${product.icon}"></i></div>
      <div class="qv-info">
        <span class="product-category">${product.category === 'dresses' ? 'ชุดเดريس' : product.category === 'hijab' ? 'ผ้าคลุมฮิญาบ' : 'เครื่องประดับ'}</span>
        <h2>${product.name}</h2>
        <div class="product-rating">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
          <span>(${product.reviews} รีวิว)</span>
        </div>
        ${priceHtml}
        <p class="qv-desc">${product.desc}</p>
        ${colorsHtml ? `<div><strong style="font-size:13px;">สี:</strong> ${colorsHtml}</div>` : ''}
        <div class="qv-specs">
          <dl>
            <dt>ไซส์</dt>
            <dd>${sizes.map(s => `<span style="display:inline-block;padding:4px 12px;margin-right:6px;border:1px solid #ddd;border-radius:6px;font-size:13px;cursor:pointer;">${s}</span>`).join('')}</dd>
            <dt>สถานะ</dt>
            <dd>${product.type === 'sale' ? 'ซื้อขาด' : 'ให้เช่า'}</dd>
          </dl>
        </div>
        <div style="display:flex;gap:10px;margin-top:8px;">
          ${isRental
            ? `<button class="btn btn-rent btn-full" onclick="document.querySelector('.btn-rent[data-id=\\'${product.id}\\']')?.click(); document.querySelector('#quickViewClose')?.click();"><i class="fas fa-calendar-check"></i> เลือกวันเช่า</button>`
            : `<button class="btn btn-add-cart btn-full" onclick="document.querySelector('.btn-add-cart[data-id=\\'${product.id}\\']')?.click(); document.querySelector('#quickViewClose')?.click();"><i class="fas fa-shopping-bag"></i> เพิ่มลงตะกร้า</button>`
          }
        </div>
      </div>`;

    quickViewOverlay.classList.add('active');
    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    quickViewOverlay.classList.remove('active');
    quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (quickViewClose) quickViewClose.addEventListener('click', closeQuickView);
  if (quickViewOverlay) quickViewOverlay.addEventListener('click', closeQuickView);

  $$('.action-btn[aria-label="Quick view"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = parseInt(card.querySelector('[data-id]').dataset.id);
      openQuickView(id);
    });
  });

  // ---------- Wishlist ----------
  const wishlistBtn = $('#wishlistBtn');
  const wishlistBadge = $('#wishlistBadge');
  $$('.action-btn[aria-label="Add to wishlist"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        icon.style.color = '#d45d5d';
        wishlistCount++;
        showToast('เพิ่มในรายการโปรดแล้ว', 'success');
      } else {
        icon.classList.replace('fas', 'far');
        icon.style.color = '';
        wishlistCount--;
      }
      wishlistBadge.textContent = wishlistCount;
    });
  });

  // ---------- Back to Top ----------
  const backToTop = $('#backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  if (backToTop) backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Header scroll shadow ----------
  const header = $('#header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // ---------- Toast ----------
  const toastContainer = $('#toastContainer');
  function showToast(message, type = '') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ---------- Smooth scroll for nav links ----------
  $$('.nav-link, .mobile-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        // Update active states
        $$('.nav-link').forEach(n => n.classList.remove('active'));
        $$('.mobile-link').forEach(n => n.classList.remove('active'));
        $$('.nav-link, .mobile-link').forEach(n => {
          if (n.getAttribute('href') === href) n.classList.add('active');
        });
      }
    });
  });

  // ---------- Intersection Observer for active nav ----------
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));

});
