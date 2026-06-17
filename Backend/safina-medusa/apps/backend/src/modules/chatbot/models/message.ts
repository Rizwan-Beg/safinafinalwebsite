import { model } from "@medusajs/framework/utils"
import { Conversation } from "./conversation"

export const Message = model.define("message", {
  id: model.id().primaryKey(),
  sender_type: model.enum(["user", "bot", "human_agent"]),
  content: model.text(),
  conversation: model.belongsTo(() => Conversation, {
    mappedBy: "messages",
  }),
})
