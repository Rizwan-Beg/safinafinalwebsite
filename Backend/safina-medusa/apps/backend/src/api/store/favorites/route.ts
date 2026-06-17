import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { FAVORITE_MODULE } from "../../../modules/favorite"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(FAVORITE_MODULE)
  const customer_id = req.query.customer_id as string

  if (!customer_id) {
    return res.status(400).json({ error: "Missing customer_id" })
  }

  const favorites = await service.listFavorites({ customer_id })
  res.json({ favorites })
}

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(FAVORITE_MODULE)
  const { customer_id, customer_name, customer_email, product_id, product_handle, product_title, product_thumbnail } = req.body as any

  if (!customer_id || !product_id) {
    return res.status(400).json({ error: "Missing customer_id or product_id" })
  }

  // Check if already exists
  const existing = await service.listFavorites({ customer_id, product_id })
  if (existing.length > 0) {
    return res.json({ favorite: existing[0] })
  }

  const favorite = await service.createFavorites({
    customer_id,
    customer_name: customer_name || null,
    customer_email: customer_email || null,
    product_id,
    product_handle: product_handle || "",
    product_title: product_title || "Unknown Product",
    product_thumbnail: product_thumbnail || null,
  })

  res.json({ favorite })
}

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(FAVORITE_MODULE)
  const customer_id = req.query.customer_id as string
  const product_id = req.query.product_id as string

  if (!customer_id || !product_id) {
    return res.status(400).json({ error: "Missing customer_id or product_id" })
  }

  const existing = await service.listFavorites({ customer_id, product_id })
  
  for (const fav of existing) {
    await service.deleteFavorites(fav.id)
  }

  res.json({ success: true })
}
