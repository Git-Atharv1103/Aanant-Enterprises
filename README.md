# Aanant Enterprises — Infinite Solutions
### Official Industrial Manufacturing Website & B2B RFQ Portal

A production-ready web platform for **Aanant Enterprises**, an industrial manufacturing company specializing in precision **CNC Machining** and **Laser Manufacturing** based in Pune, Maharashtra, India.

---

## 🏭 Company Information

- **Company Name:** Aanant Enterprises
- **Tagline:** Infinite Solutions
- **Operational Facility:**
  Krushiraj Building, S. No. 137/1/2, Sinhgad Road,
  Opp. Ganesh Mangal Karyalay, Pandurang Industrial Area,
  Nanded Phata, Pune – 411041, Maharashtra, India.
- **GSTIN:** `27CMRPK4719F1ZP`
- **Contact Numbers:** `+91 7387417382` / `+91 9049397967`
- **Email:** [aanantenterprises03@gmail.com](mailto:aanantenterprises03@gmail.com)
- **Instagram:** [@aanantenterprises03](https://www.instagram.com/aanantenterprises03/)

---

## 🚀 Key Website Features

1. **Homepage & Hero Showcase**
   - High-impact industrial hero section with clean engineering grid aesthetics.
   - Primary, secondary, and tertiary CTAs (*Explore Our Products*, *Request a Quote*, *Contact Our Team*).
   - Real industrial photography covering CNC machining centers and fiber laser cutting.

2. **Manufacturing Capabilities**
   - **Section A: CNC Machining:** Subtractive precision machining, component manufacturing, custom part production, repeat production batches.
   - **Section B: Laser Manufacturing:** High-speed fiber laser cutting, sheet-metal profiling, design-based part production directly from DXF / DWG files.
   - Transparent engineering policy clarifying that machine specifications, thicknesses, and tolerances are verified directly against customer drawings.

3. **Product Catalogue & Search**
   - Full search by product name, keywords, and material.
   - Filter pills for confirmed categories:
     - *CNC Machined Components*
     - *Laser-Cut Metal Components*
     - *Custom Metal Fabrication*
     - *Precision Industrial Parts*
     - *Custom-Made Components*
     - *Other Manufactured Products*
   - Interactive modal showing full technical specifications, material options, industrial applications, and direct quote pre-filling.

4. **Product & Manufacturing Gallery**
   - Filterable portfolio (*Finished Products*, *CNC Machining*, *Laser Cutting*, *Manufacturing Work*, *Custom Components*).
   - Interactive full-screen Lightbox with zoom and previous/next navigation.

5. **Request a Quote (RFQ) System**
   - Comprehensive industrial RFQ form: customer details, component name, manufacturing process, quantity, target delivery date, and additional instructions.
   - Secure reference image & technical CAD drawing upload (PDF, JPG, PNG, DXF, DWG, STEP up to 15MB).
   - Unique Reference Tracking ID generation (e.g., `AE-RFQ-YYYYMMDD-XXXX`).
   - One-click WhatsApp follow-up link pre-filled with the submitted RFQ reference ID.
   - Dual-persistence: saved to backend `quotes.json` with fail-safe browser `localStorage` audit log.

6. **Contact & B2B Inquiries**
   - Clickable phone numbers, official email, Google Maps directions, and general business enquiry form.
   - Universal floating WhatsApp button with pre-configured messages.

---

## 🎨 Brand Design Tokens

| Token | Hex Code | Purpose |
|---|---|---|
| **Primary Navy Blue** | `#172554` | Primary brand elements, headers, cards |
| **Deep Navy** | `#0B1228` | Hero section, footer, capabilities backdrop |
| **Electric Blue** | `#2563EB` | Technical highlights, active accents |
| **Bright Orange** | `#FF6A00` | CTAs, buttons, primary brand identity |
| **Metallic Gold** | `#F5A623` | Gradient highlights, quality badges |
| **Light Grey** | `#F3F5F8` | Information and catalogue backgrounds |
| **Dark Text** | `#182230` | High-contrast typography |

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, Nodemailer, CORS
- **Storage:** Local secure JSON records (`server/data/quotes.json`, `server/data/enquiries.json`) and uploaded technical drawings in `server/data/uploads/`

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root (sample provided in `.env.example`):
```env
PORT=5000
NOTIFICATION_EMAIL=aanantenterprises03@gmail.com
# Optional SMTP for automated email forwarding:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

### 4. Running the Development Server
To run both backend API and Vite frontend concurrently:
```bash
npm run dev
```

Or run individually:
```bash
npm run server   # Starts Express API on port 5000
npm run dev:web  # Starts Vite frontend on port 5173
```

### 5. Production Build
```bash
npm run build
```
This compiles TypeScript and builds optimized static assets into the `dist/` folder.

---

## 🌐 Public Deployment Guide

### Option 1: Full-Stack Deployment (Render / Railway / VPS / EC2)
1. Push repository to GitHub or your Git provider.
2. Connect to [Render](https://render.com) or [Railway](https://railway.app):
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start` (or `node server/server.js`)
   - **Environment Variables:** Set `PORT=5000`, `NOTIFICATION_EMAIL=aanantenterprises03@gmail.com`.
3. The Express backend will serve both the `/api/*` endpoints and the static frontend from `dist/` on a public HTTPS URL that runs 24/7 independently of any laptop.

### Option 2: Static Hosting (Vercel / Netlify / Cloudflare Pages)
1. Connect your repository to **Vercel** or **Netlify**.
2. Settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. All catalogue views, product specifications, gallery lightboxes, WhatsApp links, and client-side quotation logging will run instantly on global edge CDNs with high-speed HTTPS.

---

## 📄 License & Confidentiality
&copy; Aanant Enterprises. All rights reserved. Precision CNC & Laser Manufacturing.
