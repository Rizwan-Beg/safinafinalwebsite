import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ANNOUNCEMENT_MODULE } from "../../../modules/announcement"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(ANNOUNCEMENT_MODULE)
  const results = await service.listAnnouncements()
  const announcement = results[0] || null
  res.json({ announcement })
}

export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(ANNOUNCEMENT_MODULE)
  const { text, is_active } = req.body as { text?: string; is_active?: boolean }

  // Get existing or create first record
  let results = await service.listAnnouncements()
  let announcement = results[0]

  if (!announcement) {
    announcement = await service.createAnnouncements({
      text: text ?? "🎉 40% OFF on Christmas Collection 🎉",
      is_active: is_active ?? true,
    })
  } else {
    const updateData: any = { id: announcement.id }
    if (text !== undefined) updateData.text = text
    if (is_active !== undefined) updateData.is_active = is_active
    announcement = await service.updateAnnouncements(updateData)
  }

  res.json({ announcement })
}
