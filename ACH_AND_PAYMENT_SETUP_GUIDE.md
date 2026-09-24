# GUL LLC – ACH, PayPal, 2Checkout & Payment Backend Complete Setup Guide
*(Urdu + English Roman Guide for Store Owner)*

Yeh guide aapko step-by-step sikhata hai ke aap **GUL LLC** website par apna **ACH Direct Debit**, **PayPal**, **2Checkout**, aur **Cash on Delivery** backend kese integrate aur live karenge, aur Walmart Marketplace approval ke liye website ko kese present karenge.

---

## 1. ACH (Automated Clearing House) Kya Hai aur Walmart Reviewers Ke Liye Kyun Zaroori Hai?

**ACH Direct Debit** America (USA) ka official electronic bank-to-bank transfer system hai jo **Federal Reserve** aur **NACHA** (National Automated Clearing House Association) ke zariye chalaya jata hai.

### Walmart Approval ke liye ACH ka faida:
1. Walmart Marketplace reviewers jab dekhte hain ke website par US domestic payment methods jaise **ACH Bank Transfer** aur **Credit Cards** enabled hain, to unhein yaqeen hota hai ke company aik legitimate **US Business Entity (GUL LLC)** hai jiska registered US bank account mojood hai.
2. US customers ke paas direct checking/savings account se pay karne ka option hota hai (low fees, high transaction limits).

---

## 2. Real ACH Backend Kese Lagayein? (3 Best Methods)

### Method A: Stripe ACH Direct Debit (Sab se aasan aur popular tareeqa)
Stripe US accounts ke andar built-in ACH support deta hai jisme customer **Plaid** ke zariye apna Chase, Bank of America, Wells Fargo ya koi bhi US bank account select karta hai.

#### Steps:
1. **Stripe US Account banayein:**
   - [Stripe Dashboard](https://dashboard.stripe.com) me login karein (GUL LLC ki details ke sath).
2. **ACH Payment Method Enable karein:**
   - Stripe Dashboard &rarr; **Settings** &rarr; **Payment Methods**.
   - **US Bank Account (ACH Direct Debit)** ko find karein aur **Turn On / Enable** par click karein.
   - Financial Connections (Plaid) ko enable karein taake customer ko routing/account number manual daalne ke bajaye instant bank login ka option miley.
3. **API Keys Hasil karein:**
   - Stripe Dashboard &rarr; **Developers** &rarr; **API Keys**.
   - `Publishable key` (`pk_live_...`)
   - `Secret key` (`sk_live_...`)
4. **GUL LLC Backend me lagayein:**
   - GUL LLC website open karein aur top right par **"Payment & ACH Settings"** button par click karein.
   - Apni Stripe ACH Publishable key aur Secret key enter karein aur **Save** par click karein.
   - Ya backend file `gul-llc/data/settings.json` me directly update karein:
     ```json
     "ach": {
       "enabled": true,
       "provider": "stripe_dwolla",
       "bankName": "JPMorgan Chase Bank, N.A.",
       "accountHolder": "GUL LLC",
       "routingNumber": "021000021",
       "stripePublishableKey": "pk_live_YOUR_STRIPE_KEY",
       "stripeSecretKey": "sk_live_YOUR_STRIPE_KEY"
     }
     ```

#### Backend Node.js Code for Stripe ACH PaymentIntent:
```javascript
// Example Stripe ACH Endpoint (server.js me add kiya ja sakta hai)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-ach-payment-intent', async (req, res) => {
  const { amount, customerEmail } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency: 'usd',
      payment_method_types: ['us_bank_account'],
      payment_method_options: {
        us_bank_account: {
          financial_connections: {
            permissions: ['payment_method', 'balances'],
          },
        },
      },
      receipt_email: customerEmail,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

### Method B: Dwolla ACH API (Dedicated B2B & Wholesale ACH)
Agar aap high-ticket furniture ya B2B wholesale transactions handle kar rahe hain:
1. [Dwolla.com](https://www.dwolla.com) par business account open karein.
2. Dwolla aapke GUL LLC business bank account (e.g. Mercury, Relay, Chase) ke sath direct NACHA origination link karta hai.
3. Dwolla API Key aur Secret ko backend me store karein.

---

### Method C: Manual FedACH Direct Deposit / Bank Wire
Agar aap automated payment gateway use nahi karna chahte balki direct ACH/Wire lena chahte hain:
- Customers checkout par apna 9-digit Routing Number aur Account Number provide karte hain.
- Website par automatically Federal Reserve Routing Check hota hai (Chase, BoA, Wells Fargo auto-detect hota hai).
- Order place hone par system customer ko GUL LLC ki ACH Receiving Instructions provide karta hai.

---

## 3. PayPal Integration Kese Lagayein?

1. [developer.paypal.com](https://developer.paypal.com) par jayein aur GUL LLC business account se login karein.
2. **Apps & Credentials** par click karein aur **Create App** par click karein.
3. App name: `GUL LLC Storefront`.
4. Aapko **Client ID** aur **Secret** mil jayega.
5. GUL LLC website par **"Payment & ACH Settings"** modal open karein aur apna **PayPal Client ID** paste kar dein.
6. Frontend automatically PayPal Smart Buttons enable kar dega.

---

## 4. 2Checkout / Verifone Integration Kese Lagayein?

1. [2checkout.com](https://www.2checkout.com) par register karein.
2. Dashboard &rarr; **Integrations** &rarr; **Webhooks & API**.
3. **Merchant Code** aur **Publishable Key / Secret Word** copy karein.
4. GUL LLC website ke settings modal me enter karein.
5. Visa, MasterCard, American Express aur Discover cards seamlessly process honge.

---

## 5. Cash on Delivery (COD) Kese Kaam Karta Hai?

- COD US market me standard inspection-on-delivery ke tor par use hota hai.
- Customer checkout par COD select karta hai, koi upfront credit card detail nahi maangi jati.
- Order generate hota hai, status `"Pending (Cash on Delivery)"` ban jata hai, aur fulfillment center ko packaging notification chali jati hai.
- Carrier delivery ke waqt payment collect karta hai.

---

## 6. Website Ko Run Kese Karein (Local & Online Hosting)?

### Locally Run Karne Ka Tareeqa:
1. Terminal / PowerShell open karein:
   ```bash
   cd C:\Users\USER\.gemini\antigravity\scratch\gul-llc
   npm install
   npm start
   ```
2. Browser me open karein: `http://localhost:3000`

### 1-Click Online Free Hosting (Vercel / Render / Netlify):
1. **GitHub par push karein:**
   - GitHub par naya repository banayein: `gul-llc-store`
   - Files push karein.
2. **Render.com / Vercel:**
   - [Render.com](https://render.com) par jayein &rarr; New Web Service &rarr; Connect Repo.
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Aapko free live URL mil jayega (e.g. `https://gul-llc.onrender.com`), jise aap custom domain `gulllc.com` ke sath connect kar sakte hain!
