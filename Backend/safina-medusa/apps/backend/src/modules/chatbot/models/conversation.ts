import { model } from "@medusajs/framework/utils"

export const Conversation = model.define("conversation", {
  id: model.id().primaryKey(),
  session_id: model.text().unique(),
  customer_id: model.text().nullable(),
  customer_name: model.text().nullable(),
  status: model.enum(["bot_active", "agent_active", "closed"]).default("bot_active"),
  messages: model.hasMany(() => require("./message").Message, {
    mappedBy: "conversation",
  }),
})
