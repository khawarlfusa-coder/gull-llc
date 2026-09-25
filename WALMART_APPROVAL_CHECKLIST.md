# Walmart Marketplace Seller Approval – Verification & Presentation Checklist
*Prepared for: GUL LLC*

Walmart Marketplace applications are manually reviewed by Walmart Trust & Safety and Merchant Onboarding teams. Below is the exact checklist and blueprint to ensure **GUL LLC** gets approved without friction.

---

## 1. Company Information Matching (Crucial Rule)
Walmart verifies that the details on your application form match **100% identically** with your official website and IRS / State documentation:

| Field | Must Match Exactly On: | GUL LLC Default Config |
|---|---|---|
| **Legal Business Name** | IRS CP575 / 147C, Bank Statement, Website Header & Footer | **GUL LLC** |
| **Business Address** | State Filing / Registered Agent / Utility Bill | **18828 Vea Dr, Edmond, OK 73012** |
| **Phone Number** | Official Business Line (US Number) | **+1-405-920-8515** |
| **Support Email** | Domain-branded email (Avoid `@gmail.com`) | **support@gulllc.com** |

> **Pro Tip:** In the GUL LLC website, you can change the address, phone, and email at any time inside the private **Admin Dashboard (`/admin`)** or by editing `data/settings.json`.

---

## 2. Mandatory Policies Required by Walmart Reviewers

Walmart auditors will click and inspect every policy page on your website. GUL LLC comes with complete, pre-configured Walmart-standard policies:

1. **30-Day Return & Refund Policy (`#returns`):**
   - Walmart mandates a minimum 30-day return window.
   - GUL LLC clearly details condition of returns, pre-paid labels, US return address, and 3-5 business days refund processing.
2. **Shipping & Delivery Policy (`#shipping`):**
   - Must specify handling time (1-2 days) and transit time (3-5 days).
   - Must state approved US carriers (FedEx, UPS, USPS).
   - Must state shipping thresholds (e.g. Free US Shipping over $50).
3. **Contact Us Page (`#contact`):**
   - Shows physical US headquarters address, customer support telephone, response time, and contact inquiry form.
4. **About Us Page (`#about`):**
   - Introduces GUL LLC as an established US home goods, furniture, lighting, and decor retailer.
5. **Privacy Policy (`#privacy`) & Terms and Conditions (`#terms`):**
   - Full legal coverage complying with US e-commerce regulations.

---

## 3. Product Catalog & Category Presentation

Walmart reviewers want to see an active, professional e-commerce catalog with realistic products and transparent pricing:

- **Catalog Scope:** Over 30 products matching `rmventures.shop`'s core categories:
  - Home & Living (Living room table suites, sectionals, sideboards, marble tables)
  - Home Decor (Bohemian runners, beach mats, botanical tablecloths, silk roses, event centerpieces)
  - Lighting (RGB corner floor lamps, wave pendant chandeliers, modern ceiling flush mounts)
  - Organizers (Drop-front shoe box systems, vanity acrylic cases, kitchen pantry bins)
  - Home Fragrance (Ceramic backflow censers, ultrasonic cool mist diffusers, essential oils)
- **Product Details:** Every product card includes high-definition imagery, star ratings, realistic reviews, SKU codes, and clear specifications.
- **Stock Status:** Marked as "In Stock" with domestic US dispatch (ships within 24 hours).

---

## 4. Operational Cart, Checkout & Payment Gateways

Walmart testers will add an item to the cart and proceed to the checkout screen to verify that the store is functionally operational:

1. **Shopping Cart Drawer:** Real-time quantity adjustments, free shipping progress bar, and coupon system (`WELCOME25`).
2. **US Address Form:** Standard US fields (Street, Apt/Suite, City, State, 5-digit ZIP).
3. **Multiple Payment Gateways:**
   - **ACH Direct Debit:** FedACH 9-digit routing verification with NACHA electronic debit compliance.
   - **PayPal:** Express checkout button.
   - **2Checkout / Credit Card:** Full card validation (Visa, Mastercard, Amex, Discover).
   - **Cash on Delivery (COD):** Option for pay-on-arrival.
4. **Order Confirmation & Invoicing:** Instant Walmart-compliant invoice generation with printable receipt and carrier tracking code (e.g. `FEDEX-782910481920`).

---

## 5. Live Order Tracking Portal

Walmart places heavy weight on seller post-purchase customer experience:
- On GUL LLC, customers and reviewers can click **"Track Order"** and enter an Order ID (e.g. `GUL-948102`) to view interactive shipment milestone tracking from warehouse packaging to FedEx/UPS out-for-delivery!

---

## 6. Submission to Walmart Seller Center

When filling out the Walmart Marketplace Seller Application:
1. Under **"Primary Website / eCommerce URL"**, enter your deployed URL (e.g., `https://gulllc.com` or your Render/Vercel URL).
2. Under **"Product Categories You Sell"**, select:
   - *Home & Home Improvement*
   - *Furniture & Home Decor*
   - *Lighting & Storage*
3. When asked about **Shipping & Fulfillment**, select **Self-Fulfilled / 3PL (FedEx / UPS Ground 3-5 Days)**.
4. Provide the exact business address and phone number displayed on the GUL LLC storefront.
