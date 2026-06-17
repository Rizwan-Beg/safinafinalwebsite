import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CHATBOT_MODULE } from "../../../modules/chatbot"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const chatbotService = req.scope.resolve(CHATBOT_MODULE)

  // Fetch all conversations with their messages, ordered by creation (mocking ordering since base MedusaService might not support order directly in list, we'll sort in memory or rely on default)
  const conversations = await chatbotService.listConversations({}, {
    relations: ["messages"]
  })

  return res.json({ conversations })
}
