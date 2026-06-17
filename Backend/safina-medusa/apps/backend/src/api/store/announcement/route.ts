import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ANNOUNCEMENT_MODULE } from "../../../modules/announcement"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(ANNOUNCEMENT_MODULE)
  const results = await service.listAnnouncements({ is_active: true })
  const announcement = results[0] || null

  res.json({
    text: announcement?.text || null,
    is_active: announcement?.is_active || false,
  })
}
