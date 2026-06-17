#!/bin/bash

echo "Starting all Safina Carpets servers (Vite Frontend + MedusaJS + AI Stack)..."

# Ensure we are in the script's directory
cd "$(dirname "$0")"

# Start Medusa Backend (Port 9000 by default)
echo "Starting Medusa.js Backend..."
(cd Backend/safina-medusa/apps/backend && npm run dev) &

# Start Next.js Frontend (Port 3000 by default)
echo "Starting Next.js App Router Storefront..."
(cd Frontend/next-storefront && npm run dev) &


# Start Backend Visualizer
echo "Starting Backend Visualizer (AI)..."
(
  cd Backend/visualizer
  source venv/bin/activate
  uvicorn main:app --reload --port 8000
) &

# Start Backend Chatbot
echo "Starting Backend Chatbot (AI)..."
(
  cd Backend/chatbot
  source venv/bin/activate
  uvicorn app.main:app --reload --port 8001
) &

echo "All servers are starting in the background. Press Ctrl+C to stop all."

# Wait for all background jobs to finish
wait
