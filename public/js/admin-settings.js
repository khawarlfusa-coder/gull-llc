// GUL LLC - Payment & ACH Gateway Settings Manager

const AdminSettingsHandler = {
  currentSettings: null,

  async init() {
    await this.loadSettings();
    this.bindEvents();
  },

  async loadSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        this.currentSettings = data.settings;
        this.populateForm();
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
    }
  },

  populateForm() {
    if (!this.currentSettings) return;

    // Company
    const comp = this.currentSettings.company || {};
    if (document.getElementById('setCompanyName')) document.getElementById('setCompanyName').value = comp.name || 'GUL LLC';
    if (document.getElementById('setCompanyPhone')) document.getElementById('setCompanyPhone').value = comp.phone || '';
    if (document.getElementById('setCompanyEmail')) document.getElementById('setCompanyEmail').value = comp.email || '';
    if (document.getElementById('setCompanyAddress')) document.getElementById('setCompanyAddress').value = comp.address || '';

    // Payments
    const pay = this.currentSettings.payment || {};
    
    // COD
    if (document.getElementById('toggleCod')) {
      document.getElementById('toggleCod').checked = pay.cod?.enabled ?? true;
    }

    // PayPal
    if (document.getElementById('setPaypalClientId')) {
      document.getElementById('setPaypalClientId').value = pay.paypal?.clientId || '';
    }
    if (document.getElementById('togglePaypal')) {
      document.getElementById('togglePaypal').checked = pay.paypal?.enabled ?? true;
    }

    // 2Checkout
    if (document.getElementById('set2coMerchantCode')) {
      document.getElementById('set2coMerchantCode').value = pay.twoCheckout?.merchantCode || '';
    }
    if (document.getElementById('set2coPublishableKey')) {
      document.getElementById('set2coPublishableKey').value = pay.twoCheckout?.publishableKey || '';
    }

    // ACH Direct Debit
    const ach = pay.ach || {};
    if (document.getElementById('toggleAch')) {
      document.getElementById('toggleAch').checked = ach.enabled ?? true;
    }
    if (document.getElementById('setAchBankName')) {
      document.getElementById('setAchBankName').value = ach.bankName || 'JPMorgan Chase Bank, N.A.';
    }
    if (document.getElementById('setAchRoutingNumber')) {
      document.getElementById('setAchRoutingNumber').value = ach.routingNumber || '021000021';
    }
    if (document.getElementById('setAchAccountHolder')) {
      document.getElementById('setAchAccountHolder').value = ach.accountHolder || 'GUL LLC';
    }
    if (document.getElementById('setStripeAchPub')) {
      document.getElementById('setStripeAchPub').value = ach.stripePublishableKey || '';
    }
    if (document.getElementById('setStripeAchSec')) {
      document.getElementById('setStripeAchSec').value = ach.stripeSecretKey || '';
    }
  },

  bindEvents() {
    const form = document.getElementById('adminSettingsForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.saveSettings();
      });
    }
  },

  async saveSettings() {
    const payload = {
      company: {
        name: document.getElementById('setCompanyName')?.value.trim() || 'GUL LLC',
        phone: document.getElementById('setCompanyPhone')?.value.trim() || '',
        email: document.getElementById('setCompanyEmail')?.value.trim() || '',
        address: document.getElementById('setCompanyAddress')?.value.trim() || ''
      },
      payment: {
        cod: {
          enabled: document.getElementById('toggleCod')?.checked ?? true,
          label: 'Cash on Delivery (COD)'
        },
        paypal: {
          enabled: document.getElementById('togglePaypal')?.checked ?? true,
          clientId: document.getElementById('setPaypalClientId')?.value.trim() || ''
        },
        twoCheckout: {
          enabled: document.getElementById('toggle2co')?.checked ?? true,
          merchantCode: document.getElementById('set2coMerchantCode')?.value.trim() || '',
          publishableKey: document.getElementById('set2coPublishableKey')?.value.trim() || ''
        },
        ach: {
          enabled: document.getElementById('toggleAch')?.checked ?? true,
          bankName: document.getElementById('setAchBankName')?.value.trim() || '',
          routingNumber: document.getElementById('setAchRoutingNumber')?.value.trim() || '',
          accountHolder: document.getElementById('setAchAccountHolder')?.value.trim() || '',
          stripePublishableKey: document.getElementById('setStripeAchPub')?.value.trim() || '',
          stripeSecretKey: document.getElementById('setStripeAchSec')?.value.trim() || ''
        }
      }
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        App.showToast('Payment & ACH settings updated successfully!', 'success');
        this.closeModal();
      } else {
        App.showToast('Failed to update settings.', 'error');
      }
    } catch (e) {
      console.error(e);
      App.showToast('Network error while saving settings.', 'error');
    }
  },

  openModal() {
    const modal = document.getElementById('adminSettingsModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      this.loadSettings();
    }
  },

  closeModal() {
    const modal = document.getElementById('adminSettingsModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
};

window.AdminSettingsHandler = AdminSettingsHandler;
