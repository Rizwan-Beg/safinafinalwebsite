import { MedusaService } from "@medusajs/framework/utils"
import { Conversation } from "./models/conversation"
import { Message } from "./models/message"

class ChatbotModuleService extends MedusaService({
  Conversation,
  Message,
}) {}

export default ChatbotModuleService
