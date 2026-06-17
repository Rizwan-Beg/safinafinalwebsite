import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CHATBOT_MODULE } from "../../../../modules/chatbot"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const chatbotService = req.scope.resolve(CHATBOT_MODULE)
  const { session_id, customer_id, customer_name } = req.body as any

  let conversations = await chatbotService.listConversations({
    session_id
  })
  
  let conversation = conversations[0]
  if (!conversation) {
    conversation = await chatbotService.createConversations({
      session_id,
      customer_id: customer_id || null,
      customer_name: customer_name || null,
      status: "agent_active"
    })
  } else {
    await chatbotService.updateConversations({
      id: conversation.id,
      status: "agent_active"
    })
  }

  return res.json({ success: true, status: "agent_active" })
}
