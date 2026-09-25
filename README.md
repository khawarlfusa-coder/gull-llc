# GUL LLC – Official Storefront & Merchant Operations

A high-converting, Walmart Marketplace Seller Approval-ready e-commerce platform built for **GUL LLC** (Edmond, OK, USA). 

Replicated from the architecture and product catalog of `rmventures.shop`, featuring over 30+ curated products across 5 home & lifestyle categories, complete with domestic shipping timelines, 30-day return policy, real-time shipment milestone tracking, and multi-channel payment integrations.

---

## 🌟 Key Features

### 🛍️ Public Storefront (`/`)
- **Brand Identity:** GUL LLC – *"Quality You Can Trust"*
- **Product Catalog (30+ items):**
  - **Home & Living:** Sectional couches, glass coffee table suites, solid wood credenzas, Italian leather sofas.
  - **Home Decor:** Bohemian runners, coastal mats, botanical tablecloths, luxury silk flower arrangements.
  - **Lighting:** RGB corner floor lamps, 3-ring chandeliers, minimalist aisle lamps, lunar mood lamps.
  - **Organizers:** Stackable clear sneaker boxes, 4-drawer makeup storage, acrylic pantry organizers.
  - **Home Fragrance:** Ceramic backflow dragon censers, ultrasonic cool mist diffusers, essential aroma oils.
- **Walmart Marketplace Compliance Pages:**
  - 30-Day Return & Refund Policy (`#returns`)
  - Domestic US Shipping Policy (`#shipping`)
  - Corporate Profile & Mission (`#about`)
  - Customer Service & Contact Center (`#contact`)
  - Terms of Service (`#terms`) & Privacy Policy (`#privacy`)
- **Interactive Tracking Portal:** Live milestone tracker by Order ID or email (`#track-order`).
- **Cart & Checkout:** Dynamic slide-out cart drawer, coupon discount support (`WELCOME25`), and US address validation.

### 💳 Supported Payment Gateways
- **ACH Direct Debit / US Bank Transfer:** FedACH 9-digit routing verification with NACHA electronic debit compliance.
- **PayPal Express:** Express checkout and Pay in 4 installment option.
- **2Checkout / Credit & Debit Cards:** Visa, Mastercard, American Express, and Discover validation.
- **Cash on Delivery (COD):** Pay-on-arrival with zero upfront surcharge.

### 🔐 Dedicated Private Admin Portal (`/admin`)
*(Protected behind merchant login credentials)*
- **Payment & ACH Configuration:** Configure Bank Name, Routing Number, Stripe ACH keys, PayPal Client ID, 2Checkout credentials, and COD toggles.
- **Customer Orders Management:** View placed orders, update carrier tracking numbers, and modify order fulfillment stages.
- **Company Profile:** Update registered address, support phone, and business email.
- **ACH Technical Guide:** Step-by-step documentation for ACH integration.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Installation
```bash
git clone https://github.com/khawarlfusa-coder/gull-llc.git
cd gull-llc
npm install
```

### 3. Run Locally
```bash
npm start
```
- **Public Storefront:** Open [http://localhost:3000](http://localhost:3000)
- **Merchant Backend Portal:** Open [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Default Username:** `admin`
  - **Default Password:** `guladmin2026`

---

## 🌐 1-Click Cloud Deployment (Render / Vercel)

### Deploy on Render.com:
1. Connect this GitHub repository `gull-llc` on [Render.com](https://render.com).
2. Set **Build Command:** `npm install`
3. Set **Start Command:** `node server.js`
4. Render will provide a live HTTPS URL. You can connect your custom domain `gulllc.com`.

---

## 📄 License
Commercial proprietary software developed for GUL LLC. All rights reserved.
