import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { FAVORITE_MODULE } from "../../../modules/favorite"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(FAVORITE_MODULE)
  const favorites = await service.listFavorites({}, {
    order: { id: "DESC" }
  })
  
  res.json({ favorites })
}
