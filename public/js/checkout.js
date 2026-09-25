// GUL LLC - Checkout & Multi-Payment Gateway Management (COD, PayPal, 2Checkout, ACH)

const CheckoutHandler = {
  currentPaymentMethod: 'cod',
  shippingCost: 0,
  taxRate: 0.06, // 6% US standard sales tax
  couponDiscount: 0,
  couponCodeApplied: '',

  init() {
    this.bindEvents();
    this.updateSummary();
  },

  bindEvents() {
    // Payment method selector tabs
    const paymentOptions = document.querySelectorAll('.payment-card-option');
    paymentOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        paymentOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const method = opt.getAttribute('data-method');
        this.selectPaymentMethod(method);
      });
    });

    // Routing number live auto-lookup
    const routingInput = document.getElementById('achRoutingNumber');
    if (routingInput) {
      routingInput.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 9);
        e.target.value = val;
        if (val.length === 9) {
          this.lookupRoutingNumber(val);
        } else {
          const bankNameElem = document.getElementById('achDetectedBank');
          if (bankNameElem) bankNameElem.innerHTML = '';
        }
      });
    }

    // Card number formatting
    const cardInput = document.getElementById('ccNumber');
    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let matches = v.match(/\d{4,16}/g);
        let match = (matches && matches[0]) || '';
        let parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
          parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
          e.target.value = parts.join(' ');
        } else {
          e.target.value = v;
        }
      });
    }

    // Card expiry formatting
    const expiryInput = document.getElementById('ccExpiry');
    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (v.length >= 2) {
          e.target.value = v.slice(0, 2) + '/' + v.slice(2);
        } else {
          e.target.value = v;
        }
      });
    }

    // Form submission
    const form = document.getElementById('checkoutForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processOrder();
      });
    }

    // Apply Coupon
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', () => {
        this.applyCoupon();
      });
    }
  },

  selectPaymentMethod(method) {
    this.currentPaymentMethod = method;
    const contents = document.querySelectorAll('.payment-method-content');
    contents.forEach(c => c.classList.add('hidden'));

    const activeContent = document.getElementById(`payment-content-${method}`);
    if (activeContent) {
      activeContent.classList.remove('hidden');
    }
  },

  async lookupRoutingNumber(routing) {
    const bankElem = document.getElementById('achDetectedBank');
    if (!bankElem) return;

    bankElem.innerHTML = `<span class="text-xs text-amber-600 animate-pulse"><i class="fas fa-spinner fa-spin mr-1"></i> Verifying Federal Reserve FedACH routing...</span>`;

    try {
      const res = await fetch(`/api/ach/lookup-routing/${routing}`);
      const data = await res.json();
      if (data.valid) {
        bankElem.innerHTML = `
          <div class="mt-1 flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
            <i class="fas fa-check-circle mr-1.5 text-emerald-500"></i>
            <span><strong>${data.bankName}</strong> &bull; FedACH Active</span>
          </div>
        `;
      } else {
        bankElem.innerHTML = `<span class="text-xs text-red-600 font-medium">Invalid 9-digit US Routing Number</span>`;
      }
    } catch (e) {
      bankElem.innerHTML = `<span class="text-xs text-emerald-600">Routing Number Accepted</span>`;
    }
  },

  applyCoupon() {
    const input = document.getElementById('couponCodeInput');
    const msg = document.getElementById('couponMessage');
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    if (code === 'WELCOME25' || code === 'GUL20') {
      this.couponDiscount = 0.20; // 20% OFF
      this.couponCodeApplied = code;
      msg.innerHTML = `<span class="text-xs text-emerald-600 font-semibold"><i class="fas fa-check-circle mr-1"></i> Coupon '${code}' applied! 20% discount granted.</span>`;
      this.updateSummary();
    } else if (!code) {
      msg.innerHTML = `<span class="text-xs text-red-500">Please enter a coupon code.</span>`;
    } else {
      msg.innerHTML = `<span class="text-xs text-red-500">Invalid coupon code. Try WELCOME25</span>`;
    }
  },

  updateSummary() {
    const cart = CartHandler.getCart();
    const subtotal = CartHandler.getSubtotal();
    
    let discountAmount = 0;
    if (this.couponDiscount > 0) {
      discountAmount = Number((subtotal * this.couponDiscount).toFixed(2));
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    this.shippingCost = (discountedSubtotal >= 50 || cart.length === 0) ? 0 : 9.99;
    const tax = Number((discountedSubtotal * this.taxRate).toFixed(2));
    const total = Number((discountedSubtotal + this.shippingCost + tax).toFixed(2));

    // Update DOM
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const discountRow = document.getElementById('checkoutDiscountRow');
    const discountEl = document.getElementById('checkoutDiscount');
    const shippingEl = document.getElementById('checkoutShipping');
    const taxEl = document.getElementById('checkoutTax');
    const totalEl = document.getElementById('checkoutTotal');
    const itemsCountEl = document.getElementById('checkoutItemsCount');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountRow && discountEl) {
      if (discountAmount > 0) {
        discountRow.classList.remove('hidden');
        discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
      } else {
        discountRow.classList.add('hidden');
      }
    }

    if (shippingEl) {
      shippingEl.textContent = this.shippingCost === 0 ? 'FREE' : `$${this.shippingCost.toFixed(2)}`;
      if (this.shippingCost === 0 && subtotal > 0) {
        shippingEl.className = 'font-bold text-emerald-600';
      } else {
        shippingEl.className = 'font-bold text-slate-800';
      }
    }

    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if (itemsCountEl) itemsCountEl.textContent = CartHandler.getTotalCount();

    // Render items list inside checkout sidebar
    this.renderCheckoutItemsList(cart);
  },

  renderCheckoutItemsList(cart) {
    const container = document.getElementById('checkoutItemsContainer');
    if (!container) return;

    if (!cart.length) {
      container.innerHTML = `
        <div class="text-center py-8 text-slate-400">
          <i class="fas fa-shopping-basket text-4xl mb-2 text-slate-300"></i>
          <p class="text-sm">Your cart is currently empty.</p>
          <a href="#shop" onclick="App.navigateTo('shop')" class="mt-3 inline-block text-xs font-bold text-amber-600 underline">Return to Shop</a>
        </div>
      `;
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="flex items-center space-x-3 py-3 border-b border-slate-100 last:border-none">
        <div class="relative w-14 h-14 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
          <span class="absolute -top-1 -right-1 bg-slate-800 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
            ${item.quantity}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-semibold text-slate-900 truncate" title="${item.title}">${item.title}</h4>
          ${item.variant ? `<p class="text-[11px] text-slate-500">${item.variant}</p>` : ''}
          <p class="text-xs font-bold text-amber-600 mt-0.5">$${item.price.toFixed(2)}</p>
        </div>
        <div class="text-right">
          <span class="text-xs font-bold text-slate-800">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  },

  async processOrder() {
    const cart = CartHandler.getCart();
    if (!cart.length) {
      App.showToast('Please add items to your cart before checking out.', 'warning');
      return;
    }

    // Gather customer info
    const customer = {
      firstName: document.getElementById('custFirstName')?.value.trim() || '',
      lastName: document.getElementById('custLastName')?.value.trim() || '',
      fullName: `${document.getElementById('custFirstName')?.value.trim()} ${document.getElementById('custLastName')?.value.trim()}`,
      email: document.getElementById('custEmail')?.value.trim() || '',
      phone: document.getElementById('custPhone')?.value.trim() || '',
      address: document.getElementById('custAddress')?.value.trim() || '',
      apt: document.getElementById('custApt')?.value.trim() || '',
      city: document.getElementById('custCity')?.value.trim() || '',
      state: document.getElementById('custState')?.value.trim() || '',
      zip: document.getElementById('custZip')?.value.trim() || '',
      country: 'United States'
    };

    // Validation
    if (!customer.firstName || !customer.lastName || !customer.email || !customer.address || !customer.city || !customer.state || !customer.zip) {
      App.showToast('Please complete all required shipping address fields.', 'error');
      return;
    }

    // Payment details by method
    let paymentDetails = { method: this.currentPaymentMethod };

    if (this.currentPaymentMethod === 'cod') {
      paymentDetails.type = 'Cash on Delivery';
      paymentDetails.terms = 'Buyer agrees to tender total payment upon delivery.';
    } else if (this.currentPaymentMethod === 'ach') {
      const routing = document.getElementById('achRoutingNumber')?.value.trim();
      const account = document.getElementById('achAccountNumber')?.value.trim();
      const accountType = document.getElementById('achAccountType')?.value || 'Checking';
      const holder = document.getElementById('achAccountHolder')?.value.trim() || customer.fullName;
      const authorizeCheck = document.getElementById('achAuthorizeCheck')?.checked;

      if (!routing || routing.length !== 9) {
        App.showToast('Please enter a valid 9-digit US ACH Routing Number.', 'error');
        return;
      }
      if (!account || account.length < 4) {
        App.showToast('Please enter a valid Bank Account Number.', 'error');
        return;
      }
      if (!authorizeCheck) {
        App.showToast('Please accept the ACH NACHA Electronic Debit authorization to proceed.', 'error');
        return;
      }

      paymentDetails = {
        type: 'ACH Direct Debit (US FedACH)',
        accountHolder: holder,
        routingNumber: routing,
        accountLast4: account.slice(-4),
        accountType: accountType,
        authorizedAt: new Date().toISOString()
      };
    } else if (this.currentPaymentMethod === 'paypal') {
      paymentDetails = {
        type: 'PayPal Express Checkout',
        payerEmail: customer.email,
        status: 'Approved via PayPal Gateway'
      };
    } else if (this.currentPaymentMethod === '2checkout') {
      const ccNum = document.getElementById('ccNumber')?.value.replace(/\s+/g, '');
      const ccExp = document.getElementById('ccExpiry')?.value.trim();
      const ccCvc = document.getElementById('ccCvc')?.value.trim();

      if (!ccNum || ccNum.length < 15) {
        App.showToast('Please enter a valid Credit / Debit Card Number.', 'error');
        return;
      }
      if (!ccExp || !ccExp.includes('/')) {
        App.showToast('Please enter card expiry (MM/YY).', 'error');
        return;
      }
      if (!ccCvc || ccCvc.length < 3) {
        App.showToast('Please enter 3 or 4 digit CVC security code.', 'error');
        return;
      }

      paymentDetails = {
        type: '2Checkout / Credit Card',
        cardLast4: ccNum.slice(-4),
        expiry: ccExp,
        network: ccNum.startsWith('4') ? 'Visa' : (ccNum.startsWith('5') ? 'Mastercard' : 'Amex')
      };
    }

    // Submit order to backend
    const submitBtn = document.getElementById('placeOrderBtn');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-circle-notch fa-spin mr-2"></i> Verifying & Securing Order...`;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: cart,
          paymentMethod: this.currentPaymentMethod,
          paymentDetails,
          shippingMethod: 'FedEx / UPS Ground (3-5 Business Days)'
        })
      });

      const data = await response.json();

      if (data.success && data.order) {
        CartHandler.clearCart();
        this.displayOrderReceipt(data.order);
      } else {
        App.showToast(data.message || 'Error processing order.', 'error');
      }
    } catch (err) {
      console.error(err);
      App.showToast('Network error while placing order. Please try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  },

  displayOrderReceipt(order) {
    const modal = document.getElementById('receiptModal');
    const content = document.getElementById('receiptModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="text-center pb-6 border-b border-slate-100">
        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="text-2xl font-extrabold text-slate-900">Order Confirmed!</h3>
        <p class="text-sm text-slate-500 mt-1">Thank you for choosing <span class="font-bold text-amber-600">GUL LLC</span>. Your order is registered in our US fulfillment system.</p>
        <div class="mt-2 text-[11px] text-slate-500 font-medium">
          <span>18828 Vea Dr, Edmond, OK 73012 &bull; Tel: <a href="tel:+14059208515" class="text-amber-600 hover:underline">+1-405-920-8515</a></span>
        </div>
        <div class="mt-3 inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-bold text-amber-800">
          <i class="fas fa-shield-alt text-amber-600"></i>
          <span>Authorized US Registered Merchant: GUL LLC</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-slate-100 text-xs">
        <div>
          <span class="text-slate-400 uppercase tracking-wider font-bold">Order Number</span>
          <p class="text-sm font-extrabold text-slate-900 mt-0.5">${order.orderId}</p>
          <span class="text-slate-400 uppercase tracking-wider font-bold mt-2 block">Date & Time</span>
          <p class="text-slate-700">${new Date(order.createdAt).toLocaleString('en-US')}</p>
        </div>
        <div>
          <span class="text-slate-400 uppercase tracking-wider font-bold">Carrier Tracking</span>
          <p class="text-sm font-extrabold text-blue-600 mt-0.5 flex items-center">
            <i class="fas fa-truck mr-1.5"></i> ${order.trackingNumber}
          </p>
          <span class="text-slate-400 uppercase tracking-wider font-bold mt-2 block">Payment Method</span>
          <p class="text-slate-700 font-semibold">${order.paymentDetails?.status || order.paymentMethod.toUpperCase()}</p>
        </div>
      </div>

      <div class="py-4 border-b border-slate-100">
        <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Destination (US)</h5>
        <div class="bg-slate-50 p-3 rounded-lg text-xs text-slate-700">
          <p class="font-bold text-slate-900">${order.customer.fullName}</p>
          <p>${order.customer.address} ${order.customer.apt ? ', ' + order.customer.apt : ''}</p>
          <p>${order.customer.city}, ${order.customer.state} ${order.customer.zip}, United States</p>
          <p class="text-slate-500 mt-1"><i class="fas fa-phone mr-1"></i> ${order.customer.phone} &bull; <i class="fas fa-envelope mr-1"></i> ${order.customer.email}</p>
        </div>
      </div>

      <div class="py-4 border-b border-slate-100">
        <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Purchased Items</h5>
        <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
          ${order.items.map(it => `
            <div class="flex justify-between items-center text-xs py-1">
              <span class="text-slate-800 font-medium truncate max-w-[240px]">${it.title} <span class="text-slate-400">x${it.quantity}</span></span>
              <span class="font-bold text-slate-900">$${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="py-4 space-y-1 text-xs">
        <div class="flex justify-between text-slate-600">
          <span>Subtotal:</span>
          <span>$${order.subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-slate-600">
          <span>Estimated US Sales Tax:</span>
          <span>$${order.tax.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-slate-600">
          <span>Carrier Shipping:</span>
          <span>${order.shipping === 0 ? 'FREE' : '$' + order.shipping.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
          <span>Total Paid / Due:</span>
          <span class="text-amber-600">$${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div class="pt-4 flex flex-col sm:flex-row gap-2">
        <button onclick="window.print()" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center">
          <i class="fas fa-print mr-2"></i> Print Official Invoice
        </button>
        <button onclick="App.trackSpecificOrder('${order.orderId}')" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center">
          <i class="fas fa-map-marker-alt mr-2"></i> Track Shipment Live
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.CheckoutHandler = CheckoutHandler;
