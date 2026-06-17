# Safina Carpets: Platform Audit & Production Readiness Report

This document contains a comprehensive analysis of the Safina Carpets web platform. It identifies architectural, security, UX, and performance limitations in the current development setup and outlines the mandatory steps required to transition this project into a secure, scalable, and customer-ready commercial platform.

---

## 1. Architecture & Deployment Readiness

> [!WARNING]
> **Critical Issue:** The platform is currently running on development servers (`npm run dev`, `uvicorn --reload`) across four separate ports. This is highly unstable and unoptimized for a live environment.

*   **Current State:** The system relies on a Next.js frontend, a Medusa JS backend, and two separate Python FastAPI backends (Chatbot & Visualizer) running via a `run_all.sh` shell script.
*   **Production Risks:** Development servers are single-threaded, leak memory over time, and do not auto-restart on crashes. CORS is currently hardcoded to `localhost`.
*   **Required Actions:**
    *   **Dockerization:** Containerize all 4 services using `docker-compose`.
    *   **Reverse Proxy:** Introduce Nginx or Caddy to route traffic (e.g., `safinacarpets.com` $\rightarrow$ Next.js, `api.safinacarpets.com` $\rightarrow$ Medusa/Python) and handle SSL/HTTPS.
    *   **Production Builds:** Compile Next.js (`npm run build`) and Medusa, and run Python via production WSGI servers like `gunicorn`.

## 2. Security & Session Management

> [!CAUTION]
> **Critical Risk:** Security secrets and payment keys are currently using default/development values.

*   **Secrets Management:** The Medusa `.env` file uses `"supersecret"` for `JWT_SECRET` and `COOKIE_SECRET`. If deployed, anyone could forge an admin or customer session.
*   **CORS Policies:** CORS is overly permissive (`http://localhost:*`). This must be strictly limited to your production domain to prevent Cross-Site Request Forgery (CSRF).
*   **Auth Flow:** Authentication heavily relies on client-side Contexts. Moving session tokens to `HttpOnly` cookies will prevent Cross-Site Scripting (XSS) attacks from stealing user sessions.
*   **Required Actions:** Rotate all Razorpay, Brevo, and JWT secrets. Enforce strict CORS. Migrate local storage session logic to secure cookies.

## 3. Payment Flow & Checkout (Razorpay)

> [!IMPORTANT]
> **Data Integrity Risk:** The checkout flow must be bulletproof to prevent revenue loss.

*   **Current State:** `CheckoutNew.jsx` initializes Razorpay. While a backend route is used to verify payment, the architecture must ensure the client cannot dictate the price.
*   **Vulnerability Check:** If the frontend passes an amount to the backend to create the Razorpay order, a malicious user can intercept the request and change the price of a \$1,000 rug to \$1.
*   **Required Actions:** Ensure `POST /store/razorpay-order` strictly calculates the total from the Medusa Server-Side Cart ID. **Never trust the client's `amount` payload.** 

## 4. Performance & SEO (Search Engine Optimization)

> [!TIP]
> **Commercial Growth:** Luxury e-commerce relies heavily on visual performance and high Google rankings.

*   **Client-Side Rendering (CSR):** The Next.js frontend currently fetches product catalogs and layouts using `useEffect` on the client. 
*   **SEO Limitations:** `layout.tsx` has static metadata. Crawlers will not see individual rug names, descriptions, or images when indexing your site.
*   **Required Actions:**
    *   **Server-Side Rendering (SSR):** Refactor the catalog and product details pages (`/purchase/[productId]`) to use Next.js App Router Server Components. This guarantees instant page loads and perfect SEO.
    *   **Dynamic Meta Tags:** Implement `generateMetadata` for dynamic OpenGraph tags so rugs look beautiful when shared on iMessage, WhatsApp, or Instagram.
    *   **Image Optimization:** Ensure all heavy rug assets use Next.js `<Image>` for WebP/AVIF compression.

## 5. Booking System & AI Chatbot

*   **Booking System:** Successfully migrated to a dedicated `/appointment` route. The data correctly flows to the Medusa admin. **Improvement:** Connect the Medusa admin status updates (e.g., changing status to "Confirmed") to the Brevo email API to automatically email the customer their Zoom/Meet link.
*   **AI Chatbot:** The Python FastAPI chatbot connects to Groq APIs. 
*   **Risk:** Without rate limiting, a malicious bot could spam the chat widget, rapidly consuming your Groq API credits.
*   **Required Actions:** Add IP-based rate limiting to `Backend/chatbot` (e.g., max 20 messages per minute per IP).

## 6. Codebase Cleanup

*   **Current State:** The repository contains massive amounts of dead code (~1.26 GB), including `Archived_Legacy`, `Frontend/website`, and unused `src/` folders.
*   **Impact:** Slows down deployments, clutters IDE searches, and creates technical debt.
*   **Required Actions:** Permanently delete archived directories before preparing the final production build.

---

### Next Steps for Implementation

To transform this into a production-ready application, we should execute these phases sequentially:

1. **Phase 1: Code Cleanup & Security Check** (Delete dead code, rotate secrets, audit Razorpay server logic).
2. **Phase 2: SEO & Performance Rewrite** (Move catalog fetching to Server Components, add dynamic metadata).
3. **Phase 3: Production Infrastructure** (Write Dockerfiles, configure Nginx, and prepare for cloud deployment like AWS/Vercel/DigitalOcean).

Please review these findings. Let me know which phase or specific issue you would like me to tackle first!
