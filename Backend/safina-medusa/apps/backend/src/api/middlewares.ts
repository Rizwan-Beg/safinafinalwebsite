import { defineMiddlewares } from "@medusajs/framework/http"
import cors from "cors"

const parseCorsOrigins = (envVar?: string, defaults: string[] = []) => {
  if (!envVar) return defaults
  return envVar.split(",").map((s) => s.trim()).filter(Boolean)
}

const storeCorsOrigins = parseCorsOrigins(process.env.STORE_CORS, [
  "http://localhost:3000",
  "http://localhost:3001",
])

const adminCorsOrigins = parseCorsOrigins(process.env.ADMIN_CORS, [
  "http://localhost:9000",
  "http://127.0.0.1:9000",
])

const storeCorsOptions = {
  origin: storeCorsOrigins,
  credentials: true,
}

import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

const cspMiddleware = (req: MedusaRequest, res: MedusaResponse, next: any) => {
  // Override strict CSP to allow Cloudinary images to load in the dashboard
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob: 'unsafe-inline';"
  )
  next()
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/*",
      middlewares: [cspMiddleware],
    },
    {
      matcher: "/store/chat*",
      middlewares: [cors(storeCorsOptions)],
    },
    {
      matcher: "/store/hero-slider*",
      middlewares: [cors(storeCorsOptions)],
    },
    {
      matcher: "/store/announcement*",
      middlewares: [cors(storeCorsOptions)],
    },
    {
      matcher: "/store/blogs*",
      middlewares: [cors(storeCorsOptions)],
    },
    {
      method: ["POST"],
      matcher: "/admin/uploads",
      bodyParser: { sizeLimit: "50mb" },
    },
    {
      matcher: "/admin*",
      middlewares: [cors({ origin: adminCorsOrigins, credentials: true })],
    },
  ],
})
