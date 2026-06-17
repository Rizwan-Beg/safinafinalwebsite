import { model } from "@medusajs/framework/utils"

export const Announcement = model.define("announcement", {
  id: model.id().primaryKey(),
  text: model.text().default("🎉 40% OFF on Christmas Collection 🎉"),
  is_active: model.boolean().default(true),
})
