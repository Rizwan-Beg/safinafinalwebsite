# Safina Carpets Project

This repository contains the complete codebase for the Safina Carpets project, featuring a modern e-commerce stack with MedusaJS, Next.js, and AI-powered services.

## Quick Start (All Servers)

To start all primary servers (Backend, Frontend, and AI services) at once, use the provided bash script from the root directory:

```bash
chmod +x run_all.sh
./run_all.sh
```

To stop the servers, press `Ctrl+C` in your terminal.

---

## Primary Stack (Modern)

### 1. MedusaJS Backend
**Path:** `Backend/safina-medusa/apps/backend`
**Port:** `9000`
**Admin URL:** `http://localhost:9000/app`
```bash
cd Backend/safina-medusa/apps/backend
npm run dev
```

### 2. Next.js App Router Storefront
**Path:** `Frontend/next-storefront`
**Port:** `3000`
```bash
cd Frontend/next-storefront
npm run dev
```

### 3. AI Visualizer (FastAPI)
**Path:** `Backend/visualizer`
**Port:** `8000`
```bash
cd Backend/visualizer
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### 4. AI Chatbot (FastAPI)
**Path:** `Backend/chatbot`
**Port:** `8001`
```bash
cd Backend/chatbot
source venv/bin/activate
uvicorn app.main:app --reload --port 8001
```

---

## AI Services

### Visualizer
- **Purpose:** Processes images to provide visualizations (e.g., placing carpets in rooms).
- **Tech:** Google Gemini (Generative AI), FastAPI, Pillow.

### Chatbot
- **Purpose:** AI assistant for customer queries and product discovery.
- **Tech:** LangChain, LangGraph, HuggingFace Embeddings, ChromaDB, FastAPI.

---

## Troubleshooting

If you encounter an **"Address already in use"** error, you can clear background processes:

```bash
# Kill all Node and Python processes
killall node
killall python3
```
*Note: This will stop all Node/Python apps running on your system.*

---

## Tech Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS / Vanilla CSS
- **Components:** Radix UI / Shadcn UI
- **State Management:** Zustand, React Query

### Backend
- **E-commerce Engine:** MedusaJS (Node.js)
- **Database:** PostgreSQL (Medusa), Redis (Event Bus)
- **AI Backend:** FastAPI (Python)

### AI & Data
- **Models:** Google Gemini, HuggingFace
- **Vector DB:** ChromaDB
- **Orchestration:** LangChain, LangGraph

---

## Legacy / Archived Components

The following components are part of the original stack and are maintained in the repository for reference or specific use cases:

- **Legacy Website (Vite):** `Frontend/website` (Port 5173)
- **Legacy Admin (Vite):** `Frontend/admin` (Port 5175)
- **Legacy Backend (Node/Express):** `Backend/website` (Port 5000)
- **Legacy Visualizer (Vite):** `Frontend/visualizer` (Port 5174)
